import { addDays, subDays } from "date-fns";
import { useState } from "react";
import weekdaysApi from "../api/weekdaysApi";
import AppEmptyFallback from "../components/AppEmptyFallback";
import AppLoad from "../components/AppLoad";
import AppLoadingFallback from "../components/AppLoadingFallback";
import WeekdayCard from "../components/WeekdayCard";
import { Weekday } from "../types";
import { formatDayAndMonth, getMonday } from "../utils";

const WeekdaysPage: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(getMonday(new Date()));

  const handleNext = () => setCurrentDay((prev) => addDays(prev, 7));
  const handlePrev = () => setCurrentDay((prev) => subDays(prev, 7));

  return (
    <div className="container pt-3 pb-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>
          {formatDayAndMonth(currentDay)} -{" "}
          {formatDayAndMonth(addDays(currentDay, 6))}
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
      <div className="row">
        <AppLoad<Weekday[]>
          fetcher={() => weekdaysApi.getWeek(currentDay, "ИНБО-01-21")}
          emptyFallback={
            <div className="col">
              <AppEmptyFallback />
            </div>
          }
          loadingFallback={
            <div className="col">
              <AppLoadingFallback />
            </div>
          }
        >
          {(days) =>
            days.map((day) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={day.id}>
                <WeekdayCard weekday={day} />
              </div>
            ))
          }
        </AppLoad>
      </div>
    </div>
  );
};

export default WeekdaysPage;
