import { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../actions/user";
import { useUser } from "../hooks/user";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useUser();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password, () => history.push("/")));
  };

  if (user) return <Redirect to="/" />;

  return (
    <div className="row">
      <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card">
          <form className="card-body" onSubmit={handleSubmit}>
            <h5 className="card-title mb-3">
              Представьтесь для редактирования
            </h5>
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
