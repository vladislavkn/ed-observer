const AppErrorFallback: React.FC<{ message?: string }> = ({
  message = "Произошла ошибка",
}) => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
);

export default AppErrorFallback;
