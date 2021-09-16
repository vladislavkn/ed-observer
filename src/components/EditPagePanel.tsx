import { useDispatch } from "react-redux";
import { setPreview } from "../actions/editor";
import { saveLessonHomeworks } from "../actions/schedule";
import { logout } from "../actions/user";
import { usePreview } from "../hooks/editor";
import { useTooltip } from "../hooks/tooltip";
import { useUser } from "../hooks/user";

const EditPagePanel: React.FC = () => {
  const user = useUser();
  const preview = usePreview();
  const dispatch = useDispatch();
  const logoutTooltipRef = useTooltip<HTMLButtonElement>({
    title: "Выйти из аккаунта",
  });

  if (!user) return null;

  const onSave = () => dispatch(saveLessonHomeworks());
  const onLogOut = () => dispatch(logout());
  const handleTogglePreview = () => dispatch(setPreview(!preview));

  return (
    <div className="mb-4 card border-0 bg-light">
      <div className="card-body d-flex justify-content-between flex-column flex-sm-row align-items-stretch">
        <div className="d-flex align-items-baseline justify-content-center">
          <h5 className="card-title mb-4 mb-sm-0 me-1">
            {user?.email ?? "Dungeon master"}
          </h5>
          <button
            className="btn btn-link"
            onClick={onLogOut}
            ref={logoutTooltipRef}
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
        <div className="d-grid gap-2 d-md-block">
          <button className="btn btn-primary me-md-2" onClick={onSave}>
            <i className="bi bi-save me-2"></i>
            Сохранить измененния
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleTogglePreview()}
          >
            <i className={`bi ${preview ? "bi-pencil" : "bi-eye"} me-2`}></i>
            {preview ? "Редактировать" : "Посмотреть превью"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPagePanel;
