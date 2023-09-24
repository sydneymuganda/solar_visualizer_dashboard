
export const userData=[
{
    timedate:'00:00',
    total:3
},

{ timedate:'01:00',
total:5},

{

    timedate:'02:00',
    total:10
},

{
    timedate:'03:00',
    total:9
},

{
    timedate:'04:00',
    total:2
},

{
    timedate:'05:00',
    total:23
},

{ 
    timedate:'06:00',
total:3
},
{
    timedate:'07:00',
    total:31
},
{
    timedate:'08:00',
    total:36
},
{
    timedate:'09:00',
    total:45
},
{
    timedate:'10:00',
    total:20
},
{
    timedate:'11:00',
    total:3
},

{
    timedate:'12:00',
    total:3
},

{ timedate:'13:00',
total:5},

{

    timedate:'14:00',
    total:10
},

{
    timedate:'15:00',
    total:9
},

{
    timedate:'16:00',
    total:2
},

{
    timedate:'17:00',
    total:23
},

{ 
    timedate:'18:00',
total:3
},
{
    timedate:'19:00',
    total:31
},
{
    timedate:'20:00',
    total:36
},
{
    timedate:'21:00',
    total:45
},
{
    timedate:'22:00',
    total:20
},
{
    timedate:'23:00',
    total:3
},
{
    timedate:'24:00',
    total:3
},

];

export const userSavedData=[
    {
        timedate:'00:00',
        difference:1
    },
    
    { timedate:'01:00',
    difference:2},
    
    {
    
        timedate:'02:00',
        difference:1
    },
    
    {
        timedate:'03:00',
        difference:4
    },
    
    {
        timedate:'04:00',
        difference:1
    },
    
    {
        timedate:'05:00',
        difference:3
    },
    
    { 
        timedate:'06:00',
    difference:0
    },
    {
        timedate:'07:00',
        difference:3
    },
    {
        timedate:'08:00',
        difference:6
    },
    {
        timedate:'09:00',
        difference:5
    },
    {
        timedate:'10:00',
        difference:0
    },
    {
        timedate:'11:00',
        difference:0
    },
    
    {
        timedate:'12:00',
        difference:0
    },
    
    { timedate:'13:00',
    difference:1},
    
    {
    
        timedate:'14:00',
        difference:1
    },
    
    {
        timedate:'15:00',
        difference:0
    },
    
    {
        timedate:'16:00',
        difference:1
    },
    
    {
        timedate:'17:00',
        difference:3
    },
    
    { 
        timedate:'18:00',
    difference:0
    },
    {
        timedate:'19:00',
        difference:6
    },
    {
        timedate:'20:00',
        difference:3
    },
    {
        timedate:'21:00',
        difference:5
    },
    {
        timedate:'22:00',
        difference:0
    },
    {
        timedate:'23:00',
        difference:1
    },
    {
        timedate:'24:00',
        difference:0
    },
    
    ];
const generateHourlyData = () => {
    return Array.from({ length: 24 }, (_, hour) => ({
        timedate: `${hour.toString().padStart(2, '0')}:00`,
        total: Math.floor(Math.random() * 50) + 10
    }));
}
const generateSavedHourlyData = () => {
    return Array.from({ length: 24 }, (_, hour) => ({
        timedate: `${hour.toString().padStart(2, '0')}:00`,
        difference: Math.floor(Math.random() * 10) 
    }));
}

const generateWeeklyData = () => {
    return Array.from({ length: 30 }, (_, m) => ({
        timedate: m+1,
        total: Math.floor(Math.random() * 200) + 601
    }));
}
const generateWeeklySavedData = () => {
    return Array.from({ length: 30 }, (_, m) => ({
        timedate: m+1,
        difference: Math.floor(Math.random() * 200) 
    }));
}

const generateMonthlylyData = () => {
    return Array.from({ length: 12 }, (_, m) => ({
        timedate: months[m],
        total: Math.floor(Math.random() * 201) + 500
    }));
}
const generateMonthlylySavedData = () => {
    return Array.from({ length: 12 }, (_, m) => ({
        timedate: months[m],
        difference: Math.floor(Math.random() * 101) + 30
    }));
}
const generateDailyData = () => {
    return Array.from({ length: 7 }, (_, m) => ({
        timedate: days[m],
        total: Math.floor(Math.random() * 101) + 400
    }));
}
const generateDailySavedData = () => {
    return Array.from({ length: 12 }, (_, m) => ({
        timedate: months[m],
        difference: Math.floor(Math.random() * 101) + 10
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
export const previousDayData = generateHourlyData();

export const previousDaySavedData = generateSavedHourlyData();

export const currentWeekData =generateDailyData(); 
export const currentSavedWeekData = generateDailySavedData();

export const currentMonthData = generateWeeklyData();  // Assuming 30 days in the current month 


export const currentSavedMonthData = generateWeeklySavedData();  // Assuming 30 days in the current month


export const currentYearData = generateMonthlylyData();
export const currentSavedYearData =generateMonthlylySavedData();