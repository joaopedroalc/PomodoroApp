import React, { useCallback, useEffect, useState } from 'react';
import useInterval from 'use-interval';
import { SecondsToTime } from '../utils/secondsToTime';
import Button from './Button';
import Timer from './Timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartPomodoro = new Audio(bellStart);

const audioStopPomodoro = new Audio(bellFinish);

interface PomodoroTimerProps {
  PomodoroTime: number;
  shortResetTime: number;
  longResetTime: number;
  cycles: number;
}

export default function PomodoroTimer({
  PomodoroTime,
  shortResetTime,
  longResetTime,
  cycles,
}: PomodoroTimerProps): JSX.Element {
  const [mainTime, setMainTime] = useState(PomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [cyclesCountManager, setCyclesCountManager] = useState(
    new Array(cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);

  const [fullWorkingTime, setFullWorkingTime] = useState(0);

  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const startPomodoroTimer = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResetTimer(false);
    setMainTime(PomodoroTime);
    audioStartPomodoro.play();
  }, [setTimeCounting, setWorking, setResetTimer, setMainTime, PomodoroTime]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const resetPomodoroTimer = useCallback(
    (Long: boolean) => {
      setTimeCounting(false);
      setWorking(false);
      setResetTimer(true);
      setMainTime(0);

      if (Long) {
        setMainTime(longResetTime);
      } else {
        setMainTime(shortResetTime);
      }

      audioStopPomodoro.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResetTimer,
      setMainTime,
      longResetTime,
      shortResetTime,
    ],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');

    if (resetTimer) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesCountManager.length > 0) {
      resetPomodoroTimer(false);
      cyclesCountManager.pop();
    } else if (working && cyclesCountManager.length <= 0) {
      resetPomodoroTimer(true);
      setCyclesCountManager(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);

    if (resetTimer) startPomodoroTimer();
  }, [
    working,
    resetTimer,
    mainTime,
    cyclesCountManager,
    resetPomodoroTimer,
    setCyclesCountManager,
    completedCycles,
    setCompletedCycles,
    numberOfPomodoros,
    setNumberOfPomodoros,
    startPomodoroTimer,
    cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer text={mainTime} />
      <div className="controls">
        <Button
          text="Start Pomodoro"
          handleClick={startPomodoroTimer}
          className="button"
        />
        <Button
          text="Reset"
          handleClick={() => resetPomodoroTimer(false)}
          className="button"
        />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          handleClick={() => setTimeCounting(!timeCounting)}
          className={!working && !resetTimer ? 'hidden' : ''}
        />
      </div>

      <div className="details">
        <p>Ciclos concluídos : {completedCycles}</p>

        <p>Horas Trabalhadas : {SecondsToTime(fullWorkingTime)}</p>

        <p>Pomodoros concluídos : {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
