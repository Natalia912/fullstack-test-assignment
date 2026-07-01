import type { Ticket } from "../types";
import { StatusSelect } from "./StatusSelect";
import { DeleteButton } from "./DeleteButton";

const PRIORITY_LABELS = { low: "Низкий", normal: "Обычный", high: "Высокий" };

export function TicketTable({ tickets }: { tickets: Ticket[] }) {
  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Заголовок</th>
          <th>Описание</th>
          <th>Приоритет</th>
          <th>Статус</th>
          <th>Создана</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.id} className={t.status === "done" ? "row-done" : ""}>
            <td>{t.title}</td>
            <td className="truncate">{t.description || "—"}</td>
            <td>{PRIORITY_LABELS[t.priority]}</td>
            <td>
              <StatusSelect id={t.id} status={t.status} />
            </td>
            <td>{new Date(t.created_at).toLocaleString()}</td>
            <td>
              <DeleteButton id={t.id} status={t.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
