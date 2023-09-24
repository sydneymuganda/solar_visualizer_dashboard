import { useEffect, useRef } from 'react';

const useAutoNavigate = (nextPageUrl) => {

    const idleTimeout = 5 * 60 * 1000; // 5 minutes
    const mouseIdleTimeoutRef = useRef(null);

    const resetMouseIdleTimer = () => {
        if (mouseIdleTimeoutRef.current) {
            clearTimeout(mouseIdleTimeoutRef.current);
        }
        mouseIdleTimeoutRef.current = setTimeout(() => {
            window.location.href = nextPageUrl;
        }, idleTimeout);
    };

    const handleMouseMove = () => {
        resetMouseIdleTimer();
    };

    useEffect(() => {
        resetMouseIdleTimer();
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (mouseIdleTimeoutRef.current) {
                clearTimeout(mouseIdleTimeoutRef.current);
            }
        };
    }, [nextPageUrl]);

    return resetMouseIdleTimer;
}

export default useAutoNavigate;