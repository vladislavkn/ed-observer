import { useDispatch } from "react-redux";
import { useTooltip } from "../hooks/tooltip";
import { useAppSelector } from "../store";
import { selectUser, signOut } from "../store/auth";
import { selectIsPreview, togglePreview } from "../store/editor";
import { saveHomeworks } from "../store/schedule";

const EditPagePanel: React.FC = () => {
  const user = useAppSelector(selectUser);
  const preview = useAppSelector(selectIsPreview);
  const dispatch = useDispatch();
  const logoutTooltipRef = useTooltip<HTMLButtonElement>({
    title: "Выйти из аккаунта",
  });

  if (!user) return null;

  const onSave = () => dispatch(saveHomeworks());
  const onLogOut = () => dispatch(signOut());
  const handleTogglePreview = () => dispatch(togglePreview());

  return (
    <div className="mb-4 card shadow-sm">
      <div className="card-body d-flex justify-content-between flex-column flex-sm-row align-items-stretch">
        <div className="d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-baseline">
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
        </div>
        <div className="d-grid gap-2 d-lg-block">
          <button className="btn btn-primary me-lg-2" onClick={onSave}>
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
