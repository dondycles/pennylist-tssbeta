"use client";

import useShowScrollToTop from "@/lib/hooks/use-show-scroll-to-top";
import TotalMoneyBar from "./TotalMoneyBar";
import { ScrollArea } from "./ui/scroll-area";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { useTransferState } from "@/lib/stores/transfer-state";

export default function Scrollable({
  children,
  hideTotalMoney = false,
  className,
  showScrollTop = false,
}: {
  children: React.ReactNode;
  hideTotalMoney?: boolean;
  className?: string;
  showScrollTop?: boolean;
}) {
  const top = useRef<HTMLDivElement>(null);
  const { sender } = useTransferState();
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { ref } = useShowScrollToTop({
    showScrollToTopButton: () => {
      if (!mounted) return;
      setShowScrollToTopButton(true);
    },
    hideScrollToTopButton: () => {
      if (!mounted) return;
      setShowScrollToTopButton(false);
    },
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={top}
      className={cn(
        "w-full flex-1 overflow-x-hidden overflow-y-auto",
        className
      )}
    >
      <ScrollArea className="h-full w-full">
        <div ref={ref} className="h-0 w-full" />
        <div className="mx-auto flex max-w-4xl flex-col gap-4 pb-40">
          {!hideTotalMoney ? <TotalMoneyBar /> : null}
          {children}
        </div>
        <Button
          hidden={!showScrollToTopButton || !showScrollTop || sender === null}
          asChild
          className="fixed bottom-5 left-1/2 z-100 -translate-x-1/2"
          size="icon"
          variant="secondary"
        >
          <a href="#top">
            <ArrowUp />
          </a>
        </Button>
      </ScrollArea>
    </div>
  );
}
