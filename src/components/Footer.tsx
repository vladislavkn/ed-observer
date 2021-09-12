import weekdaysApi from "../api/weekdaysApi";

const Footer: React.FC = () => {
  const revalidate = async () => {
    await weekdaysApi.revalidate("ИНБО-01-21");
    window.location.reload();
  };

  return (
    <footer className="border-top">
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
          <p className="mb-0">Кнышов Владислав | {new Date().getFullYear()}</p>
        </div>
        <div className="justify-content-center align-items-center d-flex">
          <p className="mb-0 text- center">
            <strong>Внимание! Не является официальным источником данных</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
