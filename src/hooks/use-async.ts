import { useState, useEffect } from "react";

export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  function execute() {
    setStatus("pending");
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }

  useEffect(() => {
    execute();
  }, []);

  return { refetch: execute, status, value, error };
}
