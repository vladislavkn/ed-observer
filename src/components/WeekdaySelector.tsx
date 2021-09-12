import { addDays, subDays } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { formatDayAndMonth } from "../utils";

const WeekdaySelector: React.FC<{
  value: Date;
  onChange: Dispatch<SetStateAction<Date>>;
}> = ({ value, onChange }) => {
  const handleNext = () => onChange((prev) => addDays(prev, 7));
  const handlePrev = () => onChange((prev) => subDays(prev, 7));

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h6>
        {formatDayAndMonth(value)} - {formatDayAndMonth(addDays(value, 6))}
      </h6>
      <div className="btn-group btn-group-lg " role="group">
        <button type="button" className="btn btn-light" onClick={handlePrev}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <button type="button" className="btn btn-light" onClick={handleNext}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default WeekdaySelector;
