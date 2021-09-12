import { useState } from "react";
import weekdaysApi from "../api/weekdaysApi";
import AppEmptyFallback from "../components/AppEmptyFallback";
import AppLoad from "../components/AppLoad";
import AppLoadingFallback from "../components/AppLoadingFallback";
import EditPagePanel from "../components/EditPagePanel";
import WeekdayCard from "../components/WeekdayCard";
import WeekdaySelector from "../components/WeekdaySelector";
import { Weekday } from "../types";
import { getMonday } from "../utils";

const WeekdaysPage: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(getMonday(new Date()));

  return (
    <div className="container my-4">
      <EditPagePanel />
      <WeekdaySelector
        value={currentDay}
        onChange={(value) => setCurrentDay(value)}
      />
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
