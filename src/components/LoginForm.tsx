import { useState, FormEventHandler } from "react";

const LoginForm: React.FC<{
  onSubmit: (email: string, password: string) => void;
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <h5 className="card-title mb-3">Представьтесь для редактирования</h5>
      <div className="mb-3">
        <label htmlFor="email-field" className="form-label">
          Почта
        </label>
        <input
          type="email"
          className="form-control"
          id="email-field"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password-field" className="form-label">
          Пароль
        </label>
        <input
          type="password"
          className="form-control"
          id="password-field"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
