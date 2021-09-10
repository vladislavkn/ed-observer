const AppEmptyFallback: React.FC<{ message?: string }> = ({
  message = "Нет информации",
}) => (
  <div className="alert alert-secondary" role="alert">
    {message}
  </div>
);

export default AppEmptyFallback;
