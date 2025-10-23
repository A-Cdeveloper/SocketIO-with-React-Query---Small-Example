import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  hasNextPage: boolean,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean
) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return loadMoreRef;
};
