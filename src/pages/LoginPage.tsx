const LoginPage: React.FC = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card">
            <form className="card-body">
              <h5 className="card-title mb-3">
                Введите пароль для редактрования
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
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
