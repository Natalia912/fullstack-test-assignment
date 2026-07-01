import type { Status } from "../types";
import { useUpdateTicketStatus } from "../hooks/useTickets";

const STATUS_LABELS: Record<Status, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Готово",
};

export function StatusSelect({ id, status }: { id: string; status: Status }) {
  const mutation = useUpdateTicketStatus();
  const isDone = status === "done";

  return (
    <div>
      <select
        value={status}
        disabled={isDone || mutation.isPending}
        onChange={(e) =>
          mutation.mutate({ id, payload: { status: e.target.value as Status } })
        }
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {mutation.isError && (
        <div className="inline-error">{(mutation.error as Error).message}</div>
      )}
    </div>
  );
}
