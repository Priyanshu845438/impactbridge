"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Clock3,
  Command,
  CornerDownLeft,
  Search,
  X,
} from "lucide-react";

import {
  GLOBAL_SEARCH_CATEGORIES,
  GLOBAL_SEARCH_DATA,
  type GlobalSearchRecord,
  type GlobalSearchType,
} from "@/lib/global-search-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SpotlightResult = {
  record: GlobalSearchRecord;
  highlightIndices: number[];
  context?: string;
};

type SpotlightGroup = {
  title: string;
  items: SpotlightResult[];
};

const RECENT_STORAGE_KEY = "impactbridge:global-search:recents";
const RECENT_LIMIT = 5;

type StoredRecent = {
  recordId: string;
  term: string;
  timestamp: number;
};

const TYPE_TONE: Record<GlobalSearchType, string> = {
  user: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200",
  ngo: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
  company: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200",
  programme: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
  document: "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-600/50 dark:bg-slate-800/60 dark:text-slate-100",
};

const CATEGORY_LABEL = GLOBAL_SEARCH_CATEGORIES.reduce<Record<GlobalSearchType, string>>(
  (acc, category) => {
    acc[category.type] = category.label;
    return acc;
  },
  {
    user: "Users",
    ngo: "NGOs",
    company: "Companies",
    programme: "Programmes",
    document: "Documents",
  },
);

function readStoredRecents(): StoredRecent[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as StoredRecent[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter((item) => typeof item?.recordId === "string")
      .slice(0, RECENT_LIMIT);
  } catch (error) {
    console.warn("Failed to parse recent searches", error);
    return [];
  }
}

function writeStoredRecents(entries: StoredRecent[]) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(entries.slice(0, RECENT_LIMIT)));
  } catch (error) {
    console.warn("Failed to persist recent searches", error);
  }
}

function fuzzyMatch(source: string, query: string): { score: number; indices: number[] } | null {
  const sourceLower = source.toLowerCase();
  const queryLower = query.toLowerCase();
  if (!queryLower.length) {
    return null;
  }

  const indices: number[] = [];
  let score = 0;
  let lastMatchIndex = -1;
  let searchFrom = 0;

  for (let i = 0; i < queryLower.length; i += 1) {
    const char = queryLower[i];
    const matchedIndex = sourceLower.indexOf(char, searchFrom);
    if (matchedIndex === -1) {
      return null;
    }
    indices.push(matchedIndex);

    const isConsecutive = lastMatchIndex !== -1 && matchedIndex === lastMatchIndex + 1;
    score += isConsecutive ? 5 : 3;
    score += Math.max(0, 3 - (matchedIndex - searchFrom));

    lastMatchIndex = matchedIndex;
    searchFrom = matchedIndex + 1;
  }

  if (indices.length) {
    const span = indices[indices.length - 1] - indices[0] - (indices.length - 1);
    score += Math.max(0, 6 - Math.max(0, span));
    score += Math.max(0, 4 - (sourceLower.length - queryLower.length));
  }

  return { score, indices };
}

function buildHighlightIndices(record: GlobalSearchRecord, query: string) {
  const labelMatch = fuzzyMatch(record.label, query);
  if (labelMatch) {
    return { score: labelMatch.score + 24, indices: labelMatch.indices };
  }

  const queryLower = query.toLowerCase();
  const labelLower = record.label.toLowerCase();
  const containsIndex = labelLower.indexOf(queryLower);
  if (containsIndex !== -1) {
    const indices = Array.from({ length: queryLower.length }, (_, idx) => containsIndex + idx);
    return { score: 20, indices };
  }

  let highestScore = -Infinity;
  const keywords = record.keywords ?? [];
  keywords.forEach((keyword) => {
    const match = fuzzyMatch(keyword, query);
    if (match && match.score > highestScore) {
      highestScore = match.score;
    }
  });

  if (highestScore > -Infinity) {
    return { score: highestScore + 10, indices: [] };
  }

  if (record.description) {
    const match = fuzzyMatch(record.description, query);
    if (match) {
      return { score: match.score + 8, indices: [] };
    }
  }

  return null;
}

function highlightLabel(label: string, indices: number[]) {
  if (!indices.length) {
    return label;
  }

  const sorted = Array.from(new Set(indices)).sort((a, b) => a - b);
  const segments: Array<{ text: string; highlight: boolean }> = [];
  let pointer = 0;

  sorted.forEach((matchIndex) => {
    if (matchIndex > pointer) {
      segments.push({ text: label.slice(pointer, matchIndex), highlight: false });
    }
    segments.push({ text: label[matchIndex] ?? "", highlight: true });
    pointer = matchIndex + 1;
  });

  if (pointer < label.length) {
    segments.push({ text: label.slice(pointer), highlight: false });
  }

  return segments.map((segment, index) => (
    <Fragment key={`${segment.text}-${index}`}>
      {segment.highlight ? (
        <mark className="rounded-sm bg-emerald-200/70 px-0.5 text-emerald-800 dark:bg-emerald-500/40 dark:text-emerald-100">
          {segment.text}
        </mark>
      ) : (
        segment.text
      )}
    </Fragment>
  ));
}

function computeGroups(query: string, recents: StoredRecent[]): SpotlightGroup[] {
  const trimmed = query.trim();
  if (!trimmed) {
    const groups: SpotlightGroup[] = [];

    const resolvedRecents: SpotlightResult[] = recents
      .map((item) => {
        const record = GLOBAL_SEARCH_DATA.find((entry) => entry.id === item.recordId);
        if (!record) {
          return null;
        }
        return {
          record,
          highlightIndices: [],
          context: item.term ? `Recent · ${item.term}` : "Recent search",
        } satisfies SpotlightResult;
      })
      .filter(Boolean) as SpotlightResult[];

    if (resolvedRecents.length) {
      groups.push({ title: "Recent", items: resolvedRecents });
    }

    GLOBAL_SEARCH_CATEGORIES.forEach((category) => {
      const items = GLOBAL_SEARCH_DATA.filter((record) => record.type === category.type)
        .slice(0, 5)
        .map<SpotlightResult>((record) => ({
          record,
          highlightIndices: [],
        }));
      if (items.length) {
        groups.push({ title: category.label, items });
      }
    });

    return groups;
  }

  const lowerQuery = trimmed.toLowerCase();
  const matches = GLOBAL_SEARCH_DATA.map((record) => {
    const scored = buildHighlightIndices(record, lowerQuery);
    if (!scored) {
      return null;
    }
    return {
      record,
      highlightIndices: scored.indices,
      score: scored.score,
    };
  })
    .filter(Boolean)
    .sort((a, b) => {
      if (b!.score !== a!.score) {
        return (b!.score ?? 0) - (a!.score ?? 0);
      }
      return a!.record.label.localeCompare(b!.record.label);
    }) as Array<{ record: GlobalSearchRecord; highlightIndices: number[]; score: number }>;

  const grouped = new Map<GlobalSearchType, SpotlightResult[]>();
  matches.forEach((match) => {
    if (!grouped.has(match.record.type)) {
      grouped.set(match.record.type, []);
    }
    grouped.get(match.record.type)!.push({
      record: match.record,
      highlightIndices: match.highlightIndices,
    });
  });

  return GLOBAL_SEARCH_CATEGORIES.map((category) => ({
    title: category.label,
    items: grouped.get(category.type) ?? [],
  })).filter((group) => group.items.length > 0);
}

export interface GlobalSearchSpotlightProps {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function GlobalSearchSpotlight({ open, onClose, initialQuery = "" }: GlobalSearchSpotlightProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [recents, setRecents] = useState<StoredRecent[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousOpenRef = useRef(open);

  useEffect(() => {
    if (open && !previousOpenRef.current) {
      setRecents(readStoredRecents());
      setQuery(initialQuery);
      setActiveIndex(0);
    }
    previousOpenRef.current = open;
  }, [open, initialQuery]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const groups = useMemo(() => computeGroups(query, recents), [query, recents]);

  const indexedGroups = useMemo(() => {
    let runningIndex = 0;
    return groups.map((group) => ({
      title: group.title,
      items: group.items.map((item) => ({
        ...item,
        globalIndex: runningIndex++,
      })),
    }));
  }, [groups]);

  const flatResults = useMemo(
    () => indexedGroups.flatMap((group) => group.items.map((item) => ({
      record: item.record,
      highlightIndices: item.highlightIndices,
      context: item.context,
      globalIndex: item.globalIndex,
      groupTitle: group.title,
    }))),
    [indexedGroups],
  );

  useEffect(() => {
    if (flatResults.length === 0) {
      setActiveIndex(0);
      return;
    }
    if (activeIndex >= flatResults.length) {
      setActiveIndex(flatResults.length - 1);
    }
  }, [activeIndex, flatResults.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const persistRecents = useCallback((record: GlobalSearchRecord, term: string) => {
    setRecents((prev) => {
      const filtered = prev.filter((item) => item.recordId !== record.id);
      const entry: StoredRecent = {
        recordId: record.id,
        term,
        timestamp: Date.now(),
      };
      const next = [entry, ...filtered].slice(0, RECENT_LIMIT);
      writeStoredRecents(next);
      return next;
    });
  }, []);

  const closeSpotlight = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  const handleSelect = useCallback(
    (record: GlobalSearchRecord) => {
      const term = query.trim().length ? query.trim() : record.label;
      persistRecents(record, term);
      closeSpotlight();
      router.push(record.href);
    },
    [closeSpotlight, persistRecents, query, router],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSpotlight();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => {
          if (flatResults.length === 0) {
            return 0;
          }
          return prev >= flatResults.length - 1 ? 0 : prev + 1;
        });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => {
          if (flatResults.length === 0) {
            return 0;
          }
          return prev <= 0 ? flatResults.length - 1 : prev - 1;
        });
        return;
      }

      if (event.key === "Enter") {
        const target = event.target as HTMLElement | null;
        if (target?.tagName === "TEXTAREA") {
          return;
        }
        if (flatResults.length && flatResults[activeIndex]) {
          event.preventDefault();
          handleSelect(flatResults[activeIndex].record);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, closeSpotlight, flatResults, handleSelect, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 py-16 sm:px-6">
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        aria-hidden
        onClick={closeSpotlight}
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        className="relative z-[81] w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl transition dark:border-slate-700/80 dark:bg-slate-950"
      >
        <div className="flex items-center gap-3 border-b border-slate-200/70 px-4 py-4 transition dark:border-slate-800/70 sm:px-6">
          <Search className="h-5 w-5 flex-shrink-0 text-slate-400 dark:text-slate-500" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search users, NGOs, programmes, documents…"
            className="flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <span className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:flex">
            <Command className="h-3.5 w-3.5" />
            K
          </span>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-2 py-5 sm:px-4">
          {indexedGroups.length ? (
            <div className="space-y-6">
              {indexedGroups.map((group) => (
                <div key={group.title}>
                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500">
                    {group.title}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => {
                      const isActive = activeIndex === item.globalIndex;
                      const record = item.record;
                      const Icon = record.icon;
                      return (
                        <li key={record.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIndex(item.globalIndex)}
                            onFocus={() => setActiveIndex(item.globalIndex)}
                            onClick={() => handleSelect(record)}
                            className={cn(
                              "flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition",
                              isActive
                                ? "border-emerald-300 bg-emerald-50/60 shadow-sm dark:border-emerald-400/60 dark:bg-emerald-500/10"
                                : "border-transparent bg-white hover:border-emerald-200 hover:bg-emerald-50 dark:bg-slate-950 dark:hover:border-emerald-400/50 dark:hover:bg-emerald-500/10",
                            )}
                          >
                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                              <Icon className="h-5 w-5" aria-hidden />
                            </span>
                            <div className="flex flex-1 flex-col gap-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                  {highlightLabel(record.label, item.highlightIndices)}
                                </p>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-[11px] font-semibold uppercase tracking-[0.14em]",
                                    TYPE_TONE[record.type],
                                  )}
                                >
                                  {CATEGORY_LABEL[record.type] ?? record.type}
                                </Badge>
                                {record.meta ? (
                                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
                                    {record.meta}
                                  </span>
                                ) : null}
                              </div>
                              {record.description ? (
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {record.description}
                                </p>
                              ) : null}
                              {item.context ? (
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                  {item.context}
                                </p>
                              ) : null}
                            </div>
                            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition group-hover:text-slate-400 dark:text-slate-600" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
              <Search className="mb-4 h-8 w-8 text-slate-300" aria-hidden />
              <p className="font-medium">No results yet</p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Try another keyword or explore categories to discover records.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/70 bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:border-slate-800/70 dark:bg-slate-950/60 dark:text-slate-500 sm:px-6">
          <div className="flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5" aria-hidden />
            <span>Recent queries are saved for quick access.</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 font-semibold uppercase tracking-[0.28em] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              <CornerDownLeft className="h-3.5 w-3.5" /> Enter
            </span>
            <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 font-semibold uppercase tracking-[0.28em] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Esc
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
