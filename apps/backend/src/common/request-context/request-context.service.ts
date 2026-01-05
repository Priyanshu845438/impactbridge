import { AsyncLocalStorage } from 'node:async_hooks';

type RequestContextStore = {
  actorId: string | null;
};

const storage = new AsyncLocalStorage<RequestContextStore>();

export class RequestContextService {
  static runWithActor<T>(actorId: string | null, callback: () => T): T {
    return storage.run({ actorId }, callback);
  }

  static setActorId(actorId: string | null) {
    const store = storage.getStore();
    if (store) {
      store.actorId = actorId;
    } else {
      storage.enterWith({ actorId });
    }
  }

  static getActorId(): string | null {
    return storage.getStore()?.actorId ?? null;
  }

  static clear() {
    const store = storage.getStore();
    if (store) {
      store.actorId = null;
    }
  }
}
