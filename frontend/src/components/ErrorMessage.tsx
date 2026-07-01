export function ErrorMessage({ message }: { message: string }) {
  return <div className="state-box error">Ошибка: {message}</div>;
}
