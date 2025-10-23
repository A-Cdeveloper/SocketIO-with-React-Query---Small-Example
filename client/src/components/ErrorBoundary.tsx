import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorResults from "./layout/ErrorResults";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorResults
          message={this.state.error?.message || "Something went wrong"}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
