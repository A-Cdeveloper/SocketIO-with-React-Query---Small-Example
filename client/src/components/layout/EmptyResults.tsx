import { MessageSquareX } from "lucide-react";

type EmptyResultsProps = {
  type: "cars" | "users";
  message: string;
};

const EmptyResults = ({ type, message }: EmptyResultsProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-[80vh]"
      role="status"
      aria-live="polite"
      data-testid="empty-results"
    >
      <MessageSquareX
        className="h-12 w-12 text-destructive dark:text-destructive mb-4"
        aria-hidden="true"
        data-testid="empty-icon"
      />
      <h3 className="text-lg font-semibold mb-2" data-testid="empty-title">
        No {type === "cars" ? "cars" : "users"} available
      </h3>
      <p
        className="text-gray-600 dark:text-gray-400"
        data-testid="empty-message"
      >
        {message}
      </p>
    </div>
  );
};

export default EmptyResults;
