import React from 'react';
import { SecondsToMinutes } from '../utils/secondsToMinutes';

interface TimerProps {
  text: number;
}

export default function Timer({ text }: TimerProps): JSX.Element {
  return <div className="timer">{SecondsToMinutes(text)}</div>;
}
