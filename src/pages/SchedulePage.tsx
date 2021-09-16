import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllSchedule, fetchSchedule } from "../actions/schedule";
import AppErrorFallback from "../components/AppErrorFallback";
import AppLoadingFallback from "../components/AppLoadingFallback";
import EditPagePanel from "../components/EditPagePanel";
import ScheduleDayCard from "../components/ScheduleDayCard";
import WeekdaySelector from "../components/WeekdaySelector";
import { useScheduleState } from "../hooks/schedule";
import { getMonday } from "../utils";

const WeekdaysPage: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(getMonday(new Date()));
  const dispatch = useDispatch();
  const { schedule, loading, error, commonSchedule } = useScheduleState();

  useEffect(() => {
    if (!commonSchedule) dispatch(fetchAllSchedule("ИНБО-01-21", currentDay));
    else dispatch(fetchSchedule("ИНБО-01-21", currentDay));
  }, [dispatch, currentDay, commonSchedule]);

  return (
    <>
      <EditPagePanel />
      <WeekdaySelector
        value={currentDay}
        onChange={(value) => setCurrentDay(value)}
      />
      <div className="row">
        {error && (
          <div className="col">
            <AppErrorFallback message={error.message} />
          </div>
        )}
        {loading && (
          <div className="col">
            <AppLoadingFallback />
          </div>
        )}
        {schedule &&
          schedule.map((day) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={day.date.toString()}
            >
              <ScheduleDayCard day={day} />
            </div>
          ))}
      </div>
    </>
  );
};

export default WeekdaysPage;
