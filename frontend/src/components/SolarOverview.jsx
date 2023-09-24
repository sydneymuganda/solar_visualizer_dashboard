import { ChevronDown, ChevronUp } from "lucide-react";
import fetchData from "../controller/solarToday";
import React, { useState, useEffect } from 'react';
import SolarBarChart from "./Charts/SolarBarChart";
import Bchart from "./Charts/Bchart";
import {userData,currentMonthData,currentWeekData,currentYearData,previousDayData} from './data/solarData'
import {findAllConsumed,findAllGenerated,findMaxConsumed,findMaxGenerated,findMinConsumed,findMinGenerated} from'./data/analysis';
import useAutoCycleOptions from "../hooks/useAutoCycleOptions";

const SolarOverview = () => {

    // Code for setting new values for solar data, date, request
    const[solarTwentyFour, setSolarTwentyFour] = useState([]);
    const[date, setDate] = useState("2023-12-05");
    const[request, setRequest] = useState("/thisYearSolarValues");

    const [changeChart, setChangeChart] = useState(true);
    useEffect(() =>{
        fetchData(date, request).then(data => setSolarTwentyFour(data));
    }, []);

    // For automatically changing the selected filter
    const options = ["Current day", "Previous day", "Current week", "Current month", "Current year"];
    const intervalTime = 60000; // 1 minute in milliseconds
    const autoSelectedOption = useAutoCycleOptions(options, intervalTime);
    // Updates data when filter changes from auto cycle
    useEffect(() => {
        setSelectedOption(autoSelectedOption);
        handleFilterChange();
    }, [autoSelectedOption]);

    const [selectedOption, setSelectedOption] = useState("Current day");
    const [cmax, setcMax] = useState(0);
    const [cmin, setcMin] = useState(10000000000);
    const [ctotal, setcTotal] = useState(0);
    const [gmax, setgMax] = useState(0);
    const [gmin, setgMin] = useState(10000000000);
    const [gtotal, setgTotal] = useState(0);

    const [UserData, setUserData]= useState({
        labels:userData.map((data)=>data.timedate),
        datasets:[{
            label:"solar power",
            data:userData.map((data)=>data.solar),
            backgroundColor: 'rgba(113, 175, 181, 0.8)',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
        },
        { //second bar consumption
            label:"Eskom power",
            data:userData.map((SavedData)=>SavedData.incomer),
            backgroundColor: 'rgba(255, 103, 77, 0.8)',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
        },],
    });

    const handleFilterChange = (e) => {

        let value;
        let newUserData = {};

        if (e) {
            value = e.target.value;
            setSelectedOption(e.target.value)
        } else {
            value = selectedOption;
        }

        switch (value) {
            case 'Previous day':
                newUserData = mapToChartData(previousDayData);
                setcMax(findMaxConsumed(previousDayData));
                setcMin(findMinConsumed(previousDayData));
                setcTotal(findAllConsumed(previousDayData));
                setgMax(findMaxGenerated(previousDayData));
                setgMin(findMinGenerated(previousDayData));
                setgTotal(findAllGenerated(previousDayData));
                break;
            case 'Current week':
                newUserData = mapToChartData(currentWeekData);
                setcMax(findMaxConsumed(currentWeekData));
                setcMin(findMinConsumed(currentWeekData));
                setcTotal(findAllConsumed(currentWeekData));
                setgMax(findMaxGenerated(currentWeekData));
                setgMin(findMinGenerated(currentWeekData));
                setgTotal(findAllGenerated(currentWeekData));
                break;
            case 'Current month':
                newUserData = mapToChartData(currentMonthData);
                setcMax(findMaxConsumed(currentMonthData));
                setcMin(findMinConsumed(currentMonthData));
                setcTotal(findAllConsumed(currentMonthData));
                setgMax(findMaxGenerated(currentMonthData));
                setgMin(findMinGenerated(currentMonthData));
                setgTotal(findAllGenerated(currentMonthData));
                break;
            case 'Current year':
                newUserData = mapToChartData(currentYearData);
                setcMax(findMaxConsumed(currentYearData));
                setcMin(findMinConsumed(currentYearData));
                setcTotal(findAllConsumed(currentYearData));
                setgMax(findMaxGenerated(currentYearData));
                setgMin(findMinGenerated(currentYearData));
                setgTotal(findAllGenerated(currentYearData));
                break;
            default: // 'current'
                newUserData = mapToChartData(userData);
                setcMax(findMaxConsumed(userData));
                setcMin(findMinConsumed(userData));
                setcTotal(findAllConsumed(userData));
                setgMax(findMaxGenerated(userData));
                setgMin(findMinGenerated(userData));
                setgTotal(findAllGenerated(userData));
                break;
        }
        setUserData(newUserData);
    };

    const mapToChartData = (data) => {
        return {
            labels: data.map((dataItem) => dataItem.timedate),
            datasets: [{
                label: "solar power",
                data: data.map((dataItem) => dataItem.solar),
                backgroundColor: 'rgba(113, 175, 181, 0.8)',
                pointBorderColor: 'transparent',
                pointBorderWidth: 4,
            },
            { //second bar consumption
                label:"Eskom power",
                data:data.map((Dataitem)=>Dataitem.incomer),
                backgroundColor: 'rgba(255, 103, 77, 0.8)',
                pointBorderColor: 'transparent',
                pointBorderWidth: 4,
            },],
        };
    };

    

    
    


    return (

        <div className="h-full rounded-lg bg-white p-6">
            <div className="flex flex-col justify-between gap-8 sm:flex-row">
                <div className="font-semibold text-2xl">Solar solar power & Eskom power</div>
                <select name="filters" id="solarOverviewFilter" className="flex border rounded-lg py-1 px-2"
                value={selectedOption}
                onChange={handleFilterChange}
                >
                {options.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>
            <div className="flex flex-col py-8 gap-16 lg:flex-row">
                <div className="flex md:flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold flex gap-2 items-center"><div className="rounded-full w-3 h-3 bg-primary"></div>Total solar power in kwh</div>
                        <div className="text-6xl">{Math.floor(gtotal/1000)}K</div>
                        <div className="flex gap-4">
                            <div className="flex gap-1 items-center text-sm">MIN <span className=" flex items-center font-semibold text-[#e60202]">{gmin}<ChevronDown size={'20px'} /></span></div>
                            <div className="flex gap-1 items-center text-sm">MAX <span className=" flex items-center font-semibold text-[#009933]">{gmax}<ChevronUp size={'20px'}/></span></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold flex gap-2 items-center"><div className="rounded-full w-3 h-3 bg-orange"></div>Total Eskom power in kwh</div>
                        <div className="text-6xl">{Math.floor(ctotal/1000)}K</div>
                        <div className="flex gap-4">
                            <div className="flex gap-1 items-center text-sm">MIN <span className=" flex items-center font-semibold text-[#009933]">{cmin}kwh <ChevronDown size={'20px'}/></span></div>
                            <div className="flex gap-1 items-center text-sm">MAX <span className=" flex items-center font-semibold text-[#e60202]">{cmax}kwh <ChevronUp size={'20px'}/></span></div>
                        </div>
                    </div>
                </div>
                <div className="w-full pr-8">
                    {!changeChart ? (
                        <>
                            <SolarBarChart chartData={solarTwentyFour} />
                            {setChangeChart(true)}
                        </>
                    ) : (
                        <Bchart chartData={UserData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SolarOverview;