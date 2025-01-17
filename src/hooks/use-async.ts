import { useState, use, useMemo, useTransition, startTransition } from "react";

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  deps: any[] = []
) {
  const [fetching, setFetching] = useState(false);
  const promise = useMemo(asyncFunction, [...deps, fetching]);
  const value = use(promise);
  const refetch = () => setFetching((f) => !f);

  // const refetch = () => startTransition(() => setFetching((f) => !f));

  return { refetch, value };
}

const globalCache = new Map();

export function cache<T>(asyncFunction: () => Promise<T>): () => Promise<T>;
export function cache<T, A>(
  asyncFunction: (props: A) => Promise<T>
): (props: A) => Promise<T>;
export function cache<T, A>(
  asyncFunction: (props: A) => Promise<T>
): (props: A) => Promise<T> {
  const globalKey = Math.random().toString(36).slice(2);

  const cachedFunction = (props: A) => {
    const localKey = `${globalKey}:${JSON.stringify(props)}`;
    if (globalCache.has(localKey)) {
      // console.log("Cache hit", localKey);
      return globalCache.get(localKey);
    }
    // console.log("Cache miss", localKey);
    const promise = asyncFunction(props);
    globalCache.set(localKey, promise);
    promise.then(() => {
      setTimeout(() => {
        globalCache.delete(localKey);
      }, 2000);
    });
    return promise;
  };

  return cachedFunction;
}

export function useAsyncAction<P>(asyncFunction: (params: P) => Promise<void>) {
  const [pending, setPending] = useState(false);
  // const [pending, startTransition] = useTransition();

  function execute(params: P) {
    setPending(true);
    return asyncFunction(params).then(() => setPending(false));
  }

  // function execute(params: P) {
  //   return startTransition(() => asyncFunction(params));
  // }

  const status = pending ? "pending" : "idle";

  return { execute, status };
}
