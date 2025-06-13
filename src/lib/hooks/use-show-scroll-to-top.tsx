import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";

export default function useShowScrollToTop({
  showScrollToTopButton,
  hideScrollToTopButton,
}: {
  showScrollToTopButton: () => void;
  hideScrollToTopButton: () => void;
}) {
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      hideScrollToTopButton();
    } else {
      showScrollToTopButton();
    }
  }, [entry]);
  return {
    ref,
  };
}
