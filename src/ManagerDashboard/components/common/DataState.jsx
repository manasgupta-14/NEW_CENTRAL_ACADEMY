import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

// Data aane tak spinner, fail hone par retry. Page me: if (!data) return <DataState ... />
export default function DataState({ loading, error, onRetry }) {
  if (loading && !error) return <LoadingState />;
  return <ErrorState message={error} onRetry={onRetry} />;
}
