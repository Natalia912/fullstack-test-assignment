import { useDeleteTicket } from "../hooks/useTickets";
import type { Status } from "../types";
import { useAuthContext } from "../hooks/useAuthContext";

export function DeleteButton({ id, status }: { id: string; status: Status }) {
  const mutation = useDeleteTicket();
  const { loggedIn } = useAuthContext();

  if (!loggedIn) return null;

  return (
    <div>
      <button
        disabled={status === "done" || mutation.isPending}
        onClick={() => {
          if (confirm("Удалить заявку?")) mutation.mutate(id);
        }}
      >
        Удалить
      </button>
      {mutation.isError && (
        <div className="inline-error">{(mutation.error as Error).message}</div>
      )}
    </div>
  );
}
