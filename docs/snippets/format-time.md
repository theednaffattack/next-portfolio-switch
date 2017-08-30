# Format Time
```javascript
  function formatTimer(time, units) {
    const totalSecondsPassed = time;
    const totalMinutesPassed = Math.floor(totalSecondsPassed/60);
    const hours = Math.floor(totalMinutesPassed/60);
    const minutes = totalMinutesPassed % 60;
    const seconds = totalSecondsPassed % 60;
  };
```