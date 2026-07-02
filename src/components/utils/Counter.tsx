import { useEffect, useState } from 'react';

interface CounterProps {
    end: string;
    duration: number;
    isVisible: boolean;
}

export const Counter = ({ end, duration, isVisible }: CounterProps) => {
    const [count, setCount] = useState(0);

    const target = Number(end.replace(/\D/g, ''));

    const prefix = end.match(/^[^\d]+/)?.[0] ?? '';
    const suffix = end.match(/[^\d]+$/)?.[0] ?? '';

    useEffect(() => {
        if (!isVisible || Number.isNaN(target)) return;

        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [target, duration, isVisible]);

    return (
        <span>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};
