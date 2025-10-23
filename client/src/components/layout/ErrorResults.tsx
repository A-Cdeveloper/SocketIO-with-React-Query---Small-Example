import { Ban } from "lucide-react";

type ErrorResultsProps = {
  message: string;
};

const ErrorResults = ({ message }: ErrorResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center  h-[80vh]">
      <Ban className="h-12 w-12 text-destructive dark:text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">{message}</h3>{" "}
    </div>
  );
};

export default ErrorResults;
