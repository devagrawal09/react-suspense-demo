import { useState, useEffect } from "react";

export function useAsyncData<T>(
  asyncFunction: () => Promise<T>,
  deps: any[] = []
) {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  function execute() {
    setStatus("pending");
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(() => response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }

  useEffect(() => {
    execute();
  }, [...deps]);

  return { refetch: execute, status, value, error };
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
