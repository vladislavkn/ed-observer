import { useDispatch } from "react-redux";
import { saveLessonHomeworks } from "../actions/schedule";
import { logout } from "../actions/user";
import { useUser } from "../hooks/user";

const EditPagePanel: React.FC = () => {
  const user = useUser();
  const dispatch = useDispatch();
  if (!user) return null;

  const onSave = () => dispatch(saveLessonHomeworks());
  const onLogOut = () => dispatch(logout());

  return (
    <div className="mb-4 card border-0 bg-light">
      <div className="card-body d-flex justify-content-between flex-column flex-sm-row align-items-stretch">
        <div className="d-flex align-items-center justify-content-center">
          <h5 className="card-title mb-4 mb-sm-0">
            {user?.email ?? "Dungeon master"}
          </h5>
        </div>
        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-primary me-md-2" onClick={onSave}>
            Сохранить измененния
          </button>
          <button className="btn btn-outline-primary" onClick={onLogOut}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPagePanel;
