import { useCallback, useEffect, useState } from "react";
import { useManagerSession } from "./useManagerSession";

// fetcher(arg) ek stable function hona chahiye (managerApi.xyz). reload() se data dobara aata hai, screen blink nahi hoti.
export function useManagerData(fetcher, arg) {
  const { logout } = useManagerSession();
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher(arg)
      .then((data) => !cancelled && setState({ data, error: "", loading: false }))
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) return logout(); // session khatam -> login par bhej do
        setState((s) => ({ ...s, error: err.message, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, arg, tick, logout]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, reload };
}
