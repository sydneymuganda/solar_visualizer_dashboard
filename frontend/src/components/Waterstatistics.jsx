import useAutoCycleOptions from "../hooks/useAutoCycleOptions";
import { useState } from "react";
import { useEffect } from "react"; // Import useEffect
import { currentMonthData, currentWeekData, currentYearData, userData, previousDayData,previousDaySavedData,userSavedData,currentSavedMonthData,currentSavedWeekData,currentSavedYearData } from "./data/waterData";
import {sumAllTotal,sumAllDiff} from "./data/analysis";
const Waterstatistics = () => {
    
    const options = ["current day", "previous day", "current week", "current month", "current year"];
    const intervalTime = 60000; // 1 minute in milliseconds
    const autoSelectedOption = useAutoCycleOptions(options, intervalTime);
    const [selectedOption, setSelectedOption] = useState("current day");
    useEffect(() => {
        setSelectedOption(autoSelectedOption);
        handleFilterChange();
    }, [autoSelectedOption])

    const [rate, setRate] = useState(0);
    const [goal, setGoal] = useState(0);
    const [conservedrate, setconservedRate] = useState(0);
    const [period, setPeriod] = useState("daily");
    const handleFilterChange = (e) => {
        let value;
       
        
        if (e) {
            value = e.target.value;
            setSelectedOption(e.target.value)
        } else {
            value = selectedOption;
        }

        switch (value) {
            case 'previous day':
                setPeriod("daily");
                setRate(Math.floor((sumAllTotal(previousDayData))/24));
                setconservedRate(Math.floor((sumAllDiff(previousDaySavedData))/24));
                setGoal(20);
                break;
            case 'current week':
                setPeriod("weekly");
                setRate(Math.floor((sumAllTotal(currentWeekData))/7));
                setconservedRate(Math.floor((sumAllDiff(currentSavedWeekData))/7));
                setGoal(400);
                break;
            case 'current month':
                setPeriod("monthly");
                setRate(Math.floor((sumAllTotal(currentMonthData))/30));
                setconservedRate(Math.floor((sumAllDiff(currentSavedMonthData))/30));
                setGoal(1200);
                break;
            case 'current year':
                //console.log("here");
                setPeriod("yearly");
                
                //console.log(period);
                setRate(Math.floor((sumAllTotal(currentYearData))));
                setconservedRate(Math.floor((sumAllDiff(currentSavedYearData))));
                setGoal(14400);
                break
               
            default: // 'current'
            setPeriod("daily");
            setRate(Math.floor((sumAllTotal(userData))/24))
            setconservedRate(Math.floor((sumAllDiff(userSavedData))/24));
            setGoal(20);
                break;
        }
    
        
    };
    
        
        const [waterStatus, setWaterStatus] = useState("stopped");
        const [waterRate, setWaterRate] = useState(0);
    
        useEffect(() => {
            const changeStatus = () => {
                if (waterStatus === "running") {
                    setWaterStatus("stopped");
                    setWaterRate(0);
                } else {
                    setWaterStatus("running");
                    setWaterRate(Math.floor(Math.random() * 11)+1); // random number between 0 and 10
                }
            };
    
            // Set random intervals between 2s to 10s
            const intervalDuration = Math.floor(Math.random() * 8000) + 2000;
            const interval = setInterval(changeStatus, intervalDuration);
    
            return () => clearInterval(interval); // Clear the interval when the component is unmounted
        }, [waterStatus]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between">
                <div className="font-semibold text-2xl">water consumption</div>
                <select name="filters" id="stats" className="flex border rounded-lg py-1 px-2"
                value={selectedOption}
                onChange={handleFilterChange}
                >
                    {options.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>
            <div className="flex w-full h-1/2 items-center">
            <StatisticBox title={'average '+period+' usage (L)'} value={rate} unit='L'/>
            <StatisticBox title={'average '+period+' conserved (L)'} value={conservedrate} unit='L'/>
            
            <StatisticBox title='water status' value={waterRate } unit='l/min' status={waterStatus}/>
            </div>
            <div className="flex w-full h-1/2 items-center">
              <StatisticBox title=' Cost (R)' value={parseFloat((1000*rate*0.4).toFixed(1))} unit='R'/>
                
                
                <StatisticBox title='saved cost (R)' value={parseFloat((1000*conservedrate*0.4).toFixed(1))} unit='R'/>

                <StatisticBox title={'Greenstr ' + period+' goal'} value={goal} unit='L'/>

                
            </div>
            
        </div>
    );

};

const StatisticBox = ({title, value, unit,status}) => {
    return (
        <div className="flex flex-col w-1/3">
            <h2 className="font-semibold">{title}</h2>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl">{unit === 'R'&& 'R'}{value}</span>
                {unit === 'kL' && <p className="font-semibold">kL</p> }
                {unit === 'l/min' && <p className="font-semibold">l/min</p> }
                {unit === 'R/min' && <p className="font-semibold">R/min</p> }
                {unit === 'R' && <p className="font-semibold">R</p> }
            </div>
            {status &&  <div class={`status-text ${status}`}>{status}</div>}
        </div>
    )
};

export default Waterstatistics;