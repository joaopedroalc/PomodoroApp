import React from 'react';
import PomodoroTimer from './components/pomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        PomodoroTime={10}
        shortResetTime={2}
        longResetTime={5}
        cycles={4}
      />
    </div>
  );
}

export default App;
