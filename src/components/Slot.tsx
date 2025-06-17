import { cn } from "@/lib/utils"
import type { SlotProps } from "input-otp"

export default function Slot(props: SlotProps) {
	return (
		<div
			className={cn(
				"-ms-px relative flex size-9 items-center justify-center border border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-3xl last:rounded-e-3xl",
				{ "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
			)}
		>
			{props.char !== null && <div>{props.char}</div>}
		</div>
	)
}
