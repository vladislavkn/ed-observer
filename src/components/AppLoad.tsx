import { useEffect, useState } from "react";
import { isEmpty } from "../utils";
import AppEmptyFallback from "./AppEmptyFallback";
import AppErrorFallback from "./AppErrorfallback";
import AppLoadingFallback from "./AppLoadingFallback";

type AppLoadProps<T extends object | Array<any>> = {
  fetcher: () => Promise<T>;
  children: (data: T) => React.ReactNode;
  errorFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
};

function AppLoad<T extends object | Array<any>>(props: AppLoadProps<T>) {
  const {
    fetcher,
    children,
    errorFallback = <AppErrorFallback />,
    emptyFallback = <AppEmptyFallback />,
    loadingFallback = <AppLoadingFallback />,
  } = props;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetcher()
      .then((data: any) => {
        setData(data);
        setError(null);
      })
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }, [fetcher]);

  let rendered;
  if (error) rendered = errorFallback;
  else if (isLoading) rendered = loadingFallback;
  else if (data && !isEmpty(data)) rendered = children(data);
  else rendered = emptyFallback;

  return <>{rendered}</>;
}

export default AppLoad;
