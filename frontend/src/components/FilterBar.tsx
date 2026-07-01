import type { TicketListParams, Status, Priority } from "../types";

interface Props {
  params: TicketListParams;
  onChange: (params: TicketListParams) => void;
  searchInput: string;
  onSearchChange: (value: string) => void;
}

export function FilterBar({
  params,
  onChange,
  searchInput,
  onSearchChange,
}: Props) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Поиск по заголовку или описанию…"
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={params.status ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            status: (e.target.value || undefined) as Status | undefined,
            page: 1,
          })
        }
      >
        <option value="">Все статусы</option>
        <option value="new">Новая</option>
        <option value="in_progress">В работе</option>
        <option value="done">Готово</option>
      </select>

      <select
        value={params.priority ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            priority: (e.target.value || undefined) as Priority | undefined,
            page: 1,
          })
        }
      >
        <option value="">Все приоритеты</option>
        <option value="low">Низкий</option>
        <option value="normal">Обычный</option>
        <option value="high">Высокий</option>
      </select>

      <select
        value={params.sort_by ?? "created_at"}
        onChange={(e) =>
          onChange({
            ...params,
            sort_by: e.target.value as "created_at" | "priority",
          })
        }
      >
        <option value="created_at">По дате создания</option>
        <option value="priority">По приоритету</option>
      </select>

      <select
        value={params.order ?? "desc"}
        onChange={(e) =>
          onChange({ ...params, order: e.target.value as "asc" | "desc" })
        }
      >
        <option value="desc">По убыванию</option>
        <option value="asc">По возрастанию</option>
      </select>
    </div>
  );
}
