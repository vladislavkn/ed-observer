import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppErrorFallback from "../components/AppErrorFallback";
import AppLoadingFallback from "../components/AppLoadingFallback";
import EditPagePanel from "../components/EditPagePanel";
import ScheduleDayCard from "../components/ScheduleDayCard";
import WeekdaySelector from "../components/WeekdaySelector";
import { useAppSelector } from "../store";
import {
  fetchHomework,
  fetchSchedule,
  selectScheduleState,
} from "../store/schedule";
import { getMonday } from "../utils";

const WeekdaysPage: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(getMonday(new Date()));
  const dispatch = useDispatch();
  const { schedule, isLoading, error, commonSchedule } =
    useAppSelector(selectScheduleState);

  useEffect(() => {
    if (commonSchedule) return;
    dispatch(fetchSchedule("ИНБО-01-21"));
  }, [dispatch, commonSchedule]);

  useEffect(() => {
    if (!commonSchedule) return;
    dispatch(
      fetchHomework({
        groupName: "",
        date: currentDay,
        commonSchedule,
      })
    );
  }, [dispatch, currentDay, commonSchedule]);

  return (
    <>
      <EditPagePanel />
      <WeekdaySelector
        value={currentDay}
        onChange={(value) => setCurrentDay(value)}
      />
      <div className="row" style={{ marginBottom: "-1.5rem" }}>
        {error && (
          <div className="col mb-4">
            <AppErrorFallback message={error.message} />
          </div>
        )}
        {isLoading && (
          <div className="col mb-4">
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
