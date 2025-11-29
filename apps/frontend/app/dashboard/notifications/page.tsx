"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCircle, Info, TriangleAlert } from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth-context";

type NotificationType = "info" | "warning" | "action";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "New NGO registration pending",
    message: "GreenFuture Foundation submitted compliance documents for verification.",
    timestamp: "Today, 10:15 AM",
    type: "action",
    read: false,
  },
  {
    id: "2",
    title: "CSR report upload",
    message: "Acme Industries added quarterly CSR impact report to the repository.",
    timestamp: "Yesterday, 6:42 PM",
    type: "info",
    read: false,
  },
  {
    id: "3",
    title: "System maintenance",
    message: "Platform updates scheduled for Sunday 11:00 PM IST. No downtime expected.",
    timestamp: "2 days ago",
    type: "warning",
    read: true,
  },
];

function NotificationBadge({ type }: { type: NotificationType }) {
  switch (type) {
    case "action":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
          <CheckCircle className="h-3 w-3" /> Action required
        </span>
      );
    case "warning":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
          <TriangleAlert className="h-3 w-3" /> System notice
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
          <Info className="h-3 w-3" /> Update
        </span>
      );
  }
}

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { unreadNotifications, markNotificationRead, resetNotifications, syncNotificationsCount } = useAuth();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 550);
    return () => window.clearTimeout(timer);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((notification) => !notification.read).length, [notifications]);

  useEffect(() => {
    if (!loading && unreadCount !== unreadNotifications) {
      syncNotificationsCount(unreadCount);
    }
  }, [loading, unreadCount, unreadNotifications, syncNotificationsCount]);

  const markAllRead = () => {
    if (unreadCount === 0) {
      return;
    }
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    resetNotifications();
  };

  const toggleRead = (id: string) => {
    const target = notifications.find((notification) => notification.id === id);
    if (!target || target.read) {
      return;
    }

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
    markNotificationRead(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonText lines={2} className="w-64" />
        <SkeletonCard className="h-[260px]" />
        <SkeletonCard className="h-[260px]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Notifications"
        subtitle="System and platform activity updates."
        action={
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="hidden items-center gap-1 rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600 sm:inline-flex">
              {unreadCount} unread
            </span>
            <Button variant="outline" size="sm" disabled={unreadCount === 0} onClick={markAllRead}>
              Mark all as read
            </Button>
          </div>
        }
      />

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 py-16 text-center text-slate-500">
          <Bell className="h-10 w-10 text-slate-400" />
          <p className="mt-4 text-sm font-semibold">Everything is up to date.</p>
          <p className="mt-1 text-xs">We will let you know when new activity arrives.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-emerald-200/70 hover:shadow"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                    <NotificationBadge type={notification.type} />
                  </div>
                  <p className="text-sm text-slate-600">{notification.message}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400">{notification.timestamp}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    disabled={notification.read}
                    onClick={() => toggleRead(notification.id)}
                  >
                    {notification.read ? "Read" : "Mark read"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
