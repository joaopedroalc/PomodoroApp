import React, { useState } from 'react';
import useInterval from 'use-interval';
import { SecondsToTime } from '../utils/secondsToTime';

interface PomodoroTimerProps {
  defaultPomodoroTime: number;
}

export default function PomodoroTimer({
  defaultPomodoroTime,
}: PomodoroTimerProps): JSX.Element {
  const [mainTime, setMainTime] = useState(defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div>
      <h1>Ola mundo</h1>
      <p>{SecondsToTime(mainTime)}</p>
    </div>
  );
}
