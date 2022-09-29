import React, { useEffect, useState } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const [timeNow, setTimeNow] = useState(Date.now());

  useEffect(() => {
    //interval to update time every second
    const interval = setInterval(() => setTimeNow(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  //function to calculate and display remaining time
  function updateTimer() {
    let expirationTimer = expiryDate - timeNow;
    if(expirationTimer <= 0){
        return "EXPIRED";
    }
    const timerHours = parseInt(expirationTimer / (1000 * 60 * 60));
    const timerMinutes = parseInt((expirationTimer / (1000 * 60)) % 60);
    const timerSeconds = parseInt((expirationTimer / 1000) % 60);

    return `${timerHours < 10 ? "0" + timerHours : timerHours}h ${
      timerMinutes < 10 ? "0" + timerMinutes : timerMinutes
    }m ${timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}s`;
  }

  return (
    <>{expiryDate && <div className="de_countdown">{updateTimer()}</div>}</>
  );
};

export default CountdownTimer;
