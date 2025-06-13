import { transferMoneys } from "@/lib/server/fn/money";
import { useMoneyState } from "@/lib/stores/money-state";
import { useTransferState } from "@/lib/stores/transfer-state";
import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import _ from "lodash";
import { Loader2, RotateCw, Send, X } from "lucide-react";
import { toast } from "sonner";
import ActionConfirmDialog from "./ActionConfirmDialog";
import Amount from "./Amount";
import MoneyTransferCard from "./MoneyTransferCard";
import { Button } from "./ui/button";

export default function TotalMoneyBar() {
  const { queryClient, user } = useRouteContext({ from: "__root__" });
  const { total } = useMoneyState();
  const { sender, receivers, selectForTransfer, reset, cancel } = useTransferState();
  const fees = _.sum(receivers?.map((r) => r.fee ?? 0));
  const cashIns = _.sum(receivers?.map((r) => r.cashIn ?? 0));
  const invalid = (sender?.amount ?? 0) - fees - cashIns < 0;
  const handleTransfer = useMutation({
    mutationKey: ["transfer-moneys", user?.id ?? "no-user"],
    mutationFn: async () => {
      if (!sender) {
        throw new Error("No sender");
      }
      if (!receivers) {
        throw new Error("No receivers");
      }
      if (!receivers.some((r) => (r.cashIn as number) > 0)) {
        throw new Error("No receivers with cashIn amount greater than 0");
      }
      return transferMoneys({
        data: {
          receivers,
          sender: {
            ...sender,
            reason: `Transfered funds to: [${receivers.map((r) => `${r.name}: ${r.cashIn}`).join(", ")}]`,
          },
          totalMoney: total,
        },
      });
    },
    onSuccess: async () => {
      toast.success("Transferred Succesfully");
      await queryClient.invalidateQueries({
        queryKey: ["moneys", user?.id ?? "no-user"],
      });
      cancel();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <div
      className={`bg-background w-full rounded-b-3xl p-4 text-center shadow-xl dark:bg-neutral-900`}
    >
      {sender ? (
        <>
          <MoneyTransferCard
            invalid={invalid}
            totalCashins={cashIns}
            totalFees={fees}
            action={reset}
            sender={sender}
          />
          {!receivers?.length ? null : (
            <>
              <p className="text-muted-foreground mt-4 border-t border-dashed pt-4">
                Receivers
              </p>
              <div className="mt-2 flex flex-col gap-4">
                {receivers.map((r) => (
                  <MoneyTransferCard
                    invalid={invalid}
                    totalCashins={cashIns}
                    totalFees={fees}
                    key={r.id}
                    receiver={r}
                    action={() => selectForTransfer(r)}
                  />
                ))}
                <ActionConfirmDialog
                  confirm={handleTransfer.mutate}
                  title="Transferring"
                  desc="Are you sure to transfer funds?"
                >
                  <Button
                    disabled={
                      invalid ||
                      handleTransfer.isPending ||
                      !receivers.some((r) => (r.cashIn as number) > 0)
                    }
                    variant={"ghost"}
                  >
                    {handleTransfer.isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Send />
                    )}
                    Transfer
                  </Button>
                </ActionConfirmDialog>
              </div>
            </>
          )}
          <div className="mt-2 flex gap-2">
            <Button
              disabled={invalid || handleTransfer.isPending}
              onClick={cancel}
              variant={"destructive"}
              className="flex-1"
            >
              <X /> Cancel
            </Button>
            {cashIns || fees ? (
              <Button onClick={reset} variant={"ghost"} size={"icon"}>
                <RotateCw />
              </Button>
            ) : null}
          </div>
        </>
      ) : (
        <div className="space-y-1">
          <p className="text-muted-foreground">Total Money</p>
          <Amount
            className="mx-auto truncate text-4xl font-bold"
            amount={total}
            settings={{ sign: true }}
          />
        </div>
      )}
    </div>
  );
}
