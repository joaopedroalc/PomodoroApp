import React from 'react';
import PomodoroTimer from './components/pomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer defaultPomodoroTime={3601} />
    </div>
  );
}

export default App;
