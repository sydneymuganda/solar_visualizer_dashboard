const generateHourlyData = () => {
    return Array.from({ length: 24 }, (_, hour) => ({
        timedate: `${hour.toString().padStart(2, '0')}:00`,
        incomer: Math.floor(Math.random() * 500) + 1,
        solar:Math.floor(Math.random() * 250) + 1,
        powerConsumed:(Math.floor(Math.random() * 500) + 1)+Math.floor(Math.random() * 250) + 1
    }));
}
const generateMonthlyData = () => {
    //api request
    //if failed return randomised data

    return Array.from({ length:30 }, (_, w) => ({
        timedate: `day ${(w+1).toString()}`,
        incomer: Math.floor(Math.random() * 14000) + 1,
        solar:Math.floor(Math.random() * 7000) + 1,
        powerConsumed:(Math.floor(Math.random() * 6000) + 1)+Math.floor(Math.random() * 3000) + 1
    }));
}

const generateWeeklyyData = () => {
    return Array.from({ length: 7 }, (_, w) => ({
        timedate: days[w],
        incomer: Math.floor(Math.random() * 5000) + 1,
        solar:Math.floor(Math.random() * 3000) + 1,
        powerConsumed:(Math.floor(Math.random() * 15000) + 1)+Math.floor(Math.random() * 8000) + 1
    }));
}
const generateYearlyData = () => {
    return Array.from({ length: 12 }, (_, w) => ({
        timedate: months[w],
        incomer: Math.floor(Math.random() * 50000) + 1,
        solar:Math.floor(Math.random() * 20000) + 1,
        powerConsumed:(Math.floor(Math.random() * 50000) + 1)+Math.floor(Math.random() * 20000) + 1
    }));
}

const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ];
const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
export const userData = generateHourlyData();
export const previousDayData = generateHourlyData();


export const currentWeekData =generateWeeklyyData();

export const currentMonthData =generateMonthlyData();

export const currentYearData = generateYearlyData();