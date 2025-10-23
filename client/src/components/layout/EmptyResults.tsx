import { MessageSquareX } from "lucide-react";

type EmptyResultsProps = {
  type: "cars" | "users";
  message: string;
};

const EmptyResults = ({ type, message }: EmptyResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center  h-[80vh]">
      <MessageSquareX className="h-12 w-12 text-destructive dark:text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        No {type === "cars" ? "cars" : "users"} available
      </h3>{" "}
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyResults;
