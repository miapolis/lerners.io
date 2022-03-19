import React from "react";
import { useQuery } from "react-query";

interface ElapsedState {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Presence {
  editing: string;
  workspace?: string;
  large_image_url: string;
  is_idling: boolean;
  start_timestamp: number;
}

export const Presence: React.FC = () => {
  const [elapsed, setElapsed] = React.useState<ElapsedState>();

  const { status, data, error, isFetching } = useQuery(
    "presence",
    async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/presence`
      );
      return await response.json();
    },
    { refetchInterval: 10000 }
  );

  const dataRef = React.useRef(data);
  React.useEffect(() => {
    dataRef.current = data;
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (dataRef.current && !error) {
        setElapsed(elapsedFromTimestamp(dataRef.current.start_timestamp));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md w-full h-auto bg-gray-200 dark:bg-slate-800 rounded-lg drop-shadow-md p-4">
      <h1 className="text-black dark:text-white text-lg mb-2">
        Currently Editing
      </h1>
      <div className="flex flex-row">
        <div className="relative w-[100px] h-[100px]">
          <img
            className="rounded-xl drop-shadow-md"
            alt="Language icon"
            width={100}
            height={100}
            src={
              data && !error
                ? data.large_image_url
                : "https://cdn.discordapp.com/app-assets/383226320970055681/565945769320775680.png"
            }
          />
          <div className="absolute rounded-[50%] bottom-[-10px] right-[-10px] flex items-center justify-center w-[38px] h-[38px] bg-gray-200 dark:bg-slate-800">
            <img
              className="rounded-[50%] drop-shadow-md"
              width={30}
              height={30}
              src="https://cdn.discordapp.com/app-assets/383226320970055681/565945770067623946.png"
            />
          </div>
        </div>
        <div className="text-black dark:text-white flex flex-1 flex-col ml-3 h-[100px]">
          {data && !error ? (
            <>
              {!data.is_idling ? (
                <div>
                  Editing: <b>{data.editing}</b>
                </div>
              ) : (
                <div>Idling</div>
              )}
              {data.workspace ? (
                <div>
                  Workspace: <b>{data.workspace}</b>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <div>Offline</div>
          )}
          {elapsed && data ? (
            <div>{`${formatFullTime(elapsed)} elapsed`}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const elapsedFromTimestamp = (timestamp: number): ElapsedState => {
  const now = new Date();
  const utc = new Date(now.toUTCString());
  const currentTimestamp = utc.getTime() / 1000;
  const elapsed = currentTimestamp - timestamp / 1000;

  const hours = ~~(elapsed / 3600);
  const minutes = ~~((elapsed % 3600) / 60);
  const seconds = ~~elapsed % 60;

  return {
    seconds,
    minutes,
    hours,
  };
};

const formatFullTime = (e: ElapsedState): string => {
  const hrs = formatTimePart(e.hours);
  const min = formatTimePart(e.minutes, true);
  const sec = formatTimePart(e.seconds, true, true);

  return `${hrs}${min}${sec}`;
};

const formatTimePart = (v: number, show = false, last = false) => {
  return v > 0 || show ? `${formatTimeValue(v)}${!last ? ":" : ""}` : "";
};

const formatTimeValue = (v: number): string => {
  return `${v < 10 ? "0" : ""}${v}`;
};
