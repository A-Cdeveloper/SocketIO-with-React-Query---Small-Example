import { Ban } from "lucide-react";

type ErrorResultsProps = {
  message: string;
};

const ErrorResults = ({ message }: ErrorResultsProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-[80vh]"
      role="alert"
      aria-live="assertive"
      data-testid="error-results"
    >
      <Ban
        className="h-12 w-12 text-destructive dark:text-destructive mb-4"
        aria-hidden="true"
        data-testid="error-icon"
      />
      <h3 className="text-lg font-semibold mb-2" data-testid="error-message">
        {message}
      </h3>
    </div>
  );
};

export default ErrorResults;
