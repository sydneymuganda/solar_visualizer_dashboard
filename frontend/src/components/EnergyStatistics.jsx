import useAutoCycleOptions from "../hooks/useAutoCycleOptions";
import { useState } from "react";
import { useEffect } from "react"; // Import useEffect
import { currentMonthData, currentWeekData, currentYearData, userData, previousDayData} from "./data/solarData";
import {Totalconsumed,findAllConsumed,findAllGenerated} from "./data/analysis";
import{LightbulbIcon} from 'lucide-react';
const EnergyStatistics = () => {
    const options = ["current day", "previous day", "current week", "current month", "current year"];
    const intervalTime = 60000; // 1 minute in milliseconds
    const autoSelectedOption = useAutoCycleOptions(options, intervalTime);
    const [selectedOption, setSelectedOption] = useState("current day");
    const [solarrate, setsolarRate] = useState(0);
    const [goal, setGoal] = useState(0);
    const [incomerRate, setincomerRate] = useState(0);
    const [period, setPeriod] = useState("daily");
    useEffect(() => {
        setSelectedOption(autoSelectedOption);
        handleFilterChange();
    }, [autoSelectedOption])
    
    const [isOn, setIsOn] = useState(false);
    const [isOn2, setIsOn2] = useState(false);
    
    useEffect(() => {
        const toggleLight = () => {
        setIsOn(prevIsOn => !prevIsOn);
      // Set the next interval with a random time (e.g., between 3s and 9s)
      const randomTime = (Math.random() * 6000) + 3000;
      setTimeout(toggleLight, randomTime);
    };
    const initialRandomTime = (Math.random() * 6000) + 3000;
    const timeoutId = setTimeout(toggleLight, initialRandomTime); ; // Initial toggle
    
        return () => clearInterval(timeoutId);
    }, []);

    useEffect(() => {
        const toggleLight2 = () => {
        setIsOn2(prevIsOn2 => !prevIsOn2);
      // Set the next interval with a random time (e.g., between 3s and 9s)
      const randomTime2 = (Math.random() * 6000) + 3000;
      setTimeout(toggleLight2, randomTime2);
    };
    const initialRandomTime2 = (Math.random() * 6000) + 3000;
    const timeoutId2 = setTimeout(toggleLight2, initialRandomTime2); ; // Initial toggle
    
        return () => clearInterval(timeoutId2);
    }, []);

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
                setsolarRate((findAllConsumed(previousDayData))/24);
                console.log(solarrate)
                setincomerRate((findAllGenerated(previousDayData))/24);
                setGoal(220);
                break;
            case 'current week':
                setPeriod("weekly");
                setsolarRate((findAllConsumed(currentWeekData))/7);
                setincomerRate((findAllGenerated(currentWeekData))/7);
                setGoal(6500);
                break;
            case 'current month':
                setPeriod("monthly");
                setsolarRate((findAllConsumed(currentMonthData))/30);
                setincomerRate((findAllGenerated(currentMonthData))/30);
                setGoal(1200);
                break;
            case 'current year':
                //console.log("here");
                setPeriod("yearly");
                
                //console.log(period);
                setsolarRate((findAllConsumed(currentYearData)/1));
                setincomerRate((findAllGenerated(currentYearData)/1));
                setGoal(180000);
                break
               
            default: // 'current'
            setPeriod("daily");
            setsolarRate((findAllConsumed(userData))/24);
            setincomerRate((findAllGenerated(userData))/24);
            setGoal(220);
                break;
        }
    
        
    };
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between">
                <div className="font-semibold text-2xl">Energy Statistics</div>
                <select name="filters" id="stats" className="flex border rounded-lg py-1 px-2"
                value={selectedOption}
                onChange={handleFilterChange}
                >
                    {options.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>
            <div className="flex w-full h-1/2 items-center">
            <StatisticBox title={'Total '+period+' Energy '} value={parseFloat((solarrate+incomerRate)).toFixed(1)} unit='kWh'/>
            <StatisticBox title={'Total '+period+' Solar Energy '} value={parseFloat(solarrate).toFixed(1)} unit='kWh'/>
            <StatisticBox title={'Total '+period+' Eskom Energy'} value={parseFloat(incomerRate).toFixed(1)} unit='kWh'/>
            <StatisticBox title={'first floor status'} value={<LightbulbIcon color={isOn ? 'yellow' : 'grey'} size={48} /> } unit='' />
            </div>
            <div className="flex w-full h-1/2 items-center">
                <StatisticBox title={'Greenstar '+period+' Energy Goal'} value={goal} unit='kWh'/>
                <StatisticBox title={period+' cost of Saved Energy '} value={parseFloat(solarrate*0.3).toFixed(1)} unit='R'/>
                <StatisticBox title={period+' cost of Eskom Energy '} value={parseFloat(incomerRate*0.3).toFixed(1)} unit='R'/>
                <StatisticBox title={'second floor status'} value={<LightbulbIcon color={isOn2 ? 'yellow' : 'grey'} size={48} /> } unit='' />
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
                {unit === 'kWh' && <p className="font-semibold">kWh</p> }
                {unit === 'kVA' && <p className="font-semibold">kVA</p> }
            </div>
            {status &&  <div class={`status-text ${status}`}>{<LightbulbIcon /> } </div>}
            
        </div>
    )
};

export default EnergyStatistics;