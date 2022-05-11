import React from 'react';
import { SecondsToTime } from '../utils/secondsToTime';

interface TimerProps {
  text: number;
}

export default function Timer({ text }: TimerProps): JSX.Element {
  return <div className="timer">{SecondsToTime(text)}</div>;
}
