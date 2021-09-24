import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { fetchSchedule, selectMonday } from "../store/schedule";

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const mondayDate = useAppSelector(selectMonday);

  const revalidate = () => {
    if (!mondayDate) return;
    dispatch(fetchSchedule("ИНБО-01-21"));
  };

  return (
    <footer className="bg-white ">
      <div className="container py-4">
        <div className="justify-content-center align-items-center d-flex mb-2">
          <button
            type="button"
            className="btn btn-light me-2"
            onClick={revalidate}
          >
            <i className="bi bi-arrow-repeat"></i>
            {" Обновить"}
          </button>
          <p className="mb-0">
            <a href="https://t.me/Soup_master">По всем вопросам</a> |
            {" " + new Date().getFullYear()}
          </p>
        </div>
        <div className="justify-content-center align-items-center d-flex">
          <p className="mb-0 text-center">
            <strong>Внимание! Не является официальным источником данных</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
