export function EmptyState({
  message = "Заявок пока нет",
}: {
  message?: string;
}) {
  return <div className="state-box empty">{message}</div>;
}
