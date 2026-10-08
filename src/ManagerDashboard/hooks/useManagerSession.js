import { useContext } from "react";
import { ManagerSessionContext } from "../context/ManagerSessionContext";

export function useManagerSession() {
  const ctx = useContext(ManagerSessionContext);
  if (!ctx) throw new Error("useManagerSession must be used inside ManagerSessionProvider");
  return ctx;
}
