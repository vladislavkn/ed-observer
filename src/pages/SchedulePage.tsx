import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditPagePanel from "../components/EditPagePanel";
import SchedulePageContent from "../components/SchedulePageContent";
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
        <SchedulePageContent
          error={error}
          isLoading={isLoading}
          schedule={schedule}
        />
      </div>
    </>
  );
};

export default WeekdaysPage;
