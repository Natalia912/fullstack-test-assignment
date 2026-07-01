import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, login, loginError, logout } = useAuthContext();

  if (loggedIn) {
    return (
      <div className="login-box">
        <span>Вы вошли как администратор</span>
        <button onClick={logout}>Выйти</button>
      </div>
    );
  }

  return (
    <form
      className="login-box"
      onSubmit={(e) => {
        e.preventDefault();
        login({ username, password });
      }}
    >
      <input
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
      {loginError && (
        <div className="inline-error">Неверный логин или пароль</div>
      )}
    </form>
  );
}
