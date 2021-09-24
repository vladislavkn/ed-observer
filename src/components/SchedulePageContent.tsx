import { Schedule } from "../types";
import AppErrorFallback from "./AppErrorFallback";
import AppLoadingFallback from "./AppLoadingFallback";
import ScheduleDayCard from "./ScheduleDayCard";

const SchedulePageContent: React.FC<{
  isLoading: boolean;
  schedule: Schedule | null;
  error: Error | null;
}> = (props) => {
  const { isLoading, error, schedule } = props;

  if (error)
    return (
      <div className="col mb-4">
        <AppErrorFallback message={error.message} />
      </div>
    );

  if (isLoading || !schedule)
    return (
      <div className="col mb-4">
        <AppLoadingFallback />
      </div>
    );

  return (
    <>
      {schedule.map((day) => (
        <div
          className="col-12 col-md-6 col-lg-4 mb-4"
          key={day.date.toString()}
        >
          <ScheduleDayCard day={day} />
        </div>
      ))}
    </>
  );
};

export default SchedulePageContent;
