import { useState } from "react";
import { useCreateTicket } from "../hooks/useTickets";
import type { Priority } from "../types";

export function CreateTicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const mutation = useCreateTicket();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(
      { title, description: description || undefined, priority },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setPriority("normal");
        },
      },
    );
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Новая заявка</h3>
      <input
        type="text"
        placeholder="Заголовок (3–120 символов)"
        value={title}
        minLength={3}
        maxLength={120}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Описание (необязательно, до 1000 символов)"
        value={description}
        maxLength={1000}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Низкий</option>
        <option value="normal">Обычный</option>
        <option value="high">Высокий</option>
      </select>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Создание…" : "Создать заявку"}
      </button>
      {mutation.isError && (
        <div className="inline-error">{(mutation.error as Error).message}</div>
      )}
    </form>
  );
}
