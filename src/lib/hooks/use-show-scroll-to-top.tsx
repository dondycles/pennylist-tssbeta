import { useIntersection } from "@mantine/hooks"
import { useEffect } from "react"

export default function useShowScrollToTop({
	showScrollToTopButton,
	hideScrollToTopButton,
}: {
	showScrollToTopButton: () => void
	hideScrollToTopButton: () => void
}) {
	const { ref, entry } = useIntersection({
		root: null,
		threshold: 1,
	})

	useEffect(() => {
		if (entry?.isIntersecting) {
			hideScrollToTopButton()
		} else {
			showScrollToTopButton()
		}
	}, [entry, hideScrollToTopButton, showScrollToTopButton])
	return {
		ref,
	}
}
