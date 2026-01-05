import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration: number = 800) {
  const [value, setValue] = useState(target);
  const startValueRef = useRef(target);

  useEffect(() => {
    const startValue = startValueRef.current;
    const endValue = target;

    if (startValue === endValue) return;

    const diff = endValue - startValue;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(startValue + diff * progress);

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    startValueRef.current = target; // update start
  }, [target, duration]);

  return value;
}
