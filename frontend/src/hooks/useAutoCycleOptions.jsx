import { useState, useEffect } from 'react';

function useAutoCycleOptions(options, intervalTime) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
        }, intervalTime);

        return () => {
            clearInterval(intervalId);
        };
    }, [options, intervalTime]);

    return options[currentIndex];
}

export default useAutoCycleOptions;