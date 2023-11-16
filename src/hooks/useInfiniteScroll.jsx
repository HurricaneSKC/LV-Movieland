import { useCallback, useEffect } from "react";

const useInfiniteScroll = ({ ref, loadMore }) => {
  const callBackFn = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        if (loadMore) loadMore();
      }
    },
    [loadMore]
  );

  const opts = {
    root: null,
    rootMargin: "100px",
    threshold: 1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFn, opts);
    const observedRef = ref.current;

    if (observedRef) observer.observe(observedRef);

    return () => {
      if (observedRef) observer.unobserve(observedRef);
    };
  }, [ref, callBackFn]);
};

export default useInfiniteScroll;

