import { useState, useEffect } from "react";

export default function SaleTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex gap-2 text-sm">
      <div className="sale-time">
        <div className="text-xs">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-[10px]">DAYS</div>
      </div>
      <div className="sale-time">
        <div className="text-xs">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-[10px]">HOURS</div>
      </div>
      <div className="sale-time">
        <div className="text-xs">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-[10px]">MINS</div>
      </div>
      <div className="sale-time">
        <div className="text-xs">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-[10px]">SECS</div>
      </div>
    </div>
  );
}
