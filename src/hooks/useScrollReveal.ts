import { useEffect, useState, useRef } from 'react';

export const useScrollReveal = (options = { threshold: 0.5 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [options]);

    return { ref, isVisible };
};
