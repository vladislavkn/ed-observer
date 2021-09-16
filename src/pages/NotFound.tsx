import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="container my-4">
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div
        style={{ width: 300 }}
        className="py-3 px-1 mb-3 bg-light rounded d-flex align-items-center justify-content-center flex-column"
      >
        <i className="bi bi-question-lg fs-1 mb-3"></i>
        <h5>Как вы сюда попали?</h5>
      </div>
      <div>
        <Link
          to="/"
          style={{ width: 300 }}
          className="btn btn-outline-secondary"
        >
          На главную
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
