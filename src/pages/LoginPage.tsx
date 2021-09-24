import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAppSelector } from "../store";
import { selectUser, signIn } from "../store/auth";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const handleSubmit = (email: string, password: string) => {
    dispatch(signIn({ email, password }));
  };

  if (user) return <Redirect to="/" />;

  return (
    <div className="row">
      <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card">
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
