import { useState, use, useMemo } from "react";

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  deps: any[] = []
) {
  const [fetching, setFetching] = useState(false);
  const value = use(useMemo(asyncFunction, [...deps, fetching]));
  const refetch = () => setFetching((f) => !f);
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
      }, 1000);
    });
    return promise;
  };

  return cachedFunction;
}

export function useAsyncAction<P>(asyncFunction: (params: P) => Promise<void>) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<Error | null>(null);

  function execute(params: P) {
    setStatus("pending");
    setError(null);
    return asyncFunction(params)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }

  return { execute, status, error };
}
