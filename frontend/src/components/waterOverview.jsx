import { ChevronDown, ChevronUp } from "lucide-react";
import { WaterlineChart } from "./Charts/WaterLineChart";
import { useState ,useContext} from "react";
import {userData,currentYearData, currentMonthData, currentWeekData,previousDayData,previousDaySavedData,userSavedData,currentSavedMonthData,currentSavedWeekData,currentSavedYearData } from './data/waterData'
import Lchart from './Charts/Lchart'
import { useEffect } from "react"; // Import useEffect
import {findMaxTotal, findMinTotal,sumAllTotal,findMaxDiff, findMinDiff,sumAllDiff,modifyData} from "./data/analysis";
import useAutoCycleOptions from "../hooks/useAutoCycleOptions";
import { ThemeContext } from "./contexts/context";


const WaterOverview = () => {

    // For automatically changing the selected filter
    const options = ["Current day", "Previous day", "Current week", "Current month", "Current year"];
    const intervalTime = 60000; // 1 minute in milliseconds
    const autoSelectedOption = useAutoCycleOptions(options, intervalTime);
    const {Season}=useContext(ThemeContext);
    useEffect(() => {
        setSelectedOption(autoSelectedOption);
        handleFilterChange();
    }, [autoSelectedOption])

    const [selectedOption, setSelectedOption] = useState("Current day");
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(10000000000);
    const [total, setTotal] = useState(0);
    const [smax, setsMax] = useState(0);
    const [smin, setsMin] = useState(10000000000);
    const [stotal, setsTotal] = useState(0);


   const [UserData,setUserData]= useState({
        labels:userData.map((data)=>data.timedate),
        datasets:[{
            label:"Usage",
            data:userData.map((data)=>data.total),
            backgroundColor: 'blue',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
        },
        { //second bar chart showing water conserved
            label:"Conserved",
            data:userData.map((SavedData)=>SavedData.litres),
            backgroundColor: 'green',
            pointBorderColor: 'pink',
            pointBorderWidth: 4,
            tension: 0.4,
            type :'bar',
        },
        ],
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
                    modifyData(previousDayData,previousDaySavedData,Season);
                    newUserData = mapToChartData(previousDayData,previousDaySavedData);
                    setMax(findMaxTotal(previousDayData));
                    setMin(findMinTotal(previousDayData));
                    setTotal(sumAllTotal(previousDayData));
                    setsMax(findMaxDiff(previousDaySavedData));
                    setsMin(findMinDiff(previousDaySavedData));
                    setsTotal(sumAllDiff(previousDaySavedData));
                    //console.log("previous day data"+previousDayData)
                    break;
                case 'Current week':
                    modifyData(currentWeekData,currentSavedWeekData,Season);
                    newUserData = mapToChartData(currentWeekData,currentSavedWeekData);
                    setMax(findMaxTotal(currentWeekData));
                    setMin(findMinTotal(currentWeekData));
                    setTotal(sumAllTotal(currentWeekData));
                    setsMax(findMaxDiff(currentSavedWeekData));
                    setsMin(findMinDiff(currentSavedWeekData));
                    setsTotal(sumAllDiff(currentSavedWeekData));
                   // console.log("week data"+currentWeekData)
                    break;
                case 'Current month':
                    modifyData(currentMonthData,currentSavedMonthData,Season);
                    
                    newUserData = mapToChartData(currentMonthData,currentSavedMonthData);
                    setMax(findMaxTotal(currentMonthData));
                    setMin(findMinTotal(currentMonthData));
                    setTotal(sumAllTotal(currentMonthData));
                    setsMax(findMaxDiff(currentSavedMonthData));
                    setsMin(findMinDiff(currentSavedMonthData));
                    setsTotal(sumAllDiff(currentSavedMonthData));
                    
                   
                    
                    break;
                case 'Current year':
                    newUserData = mapToChartData(currentYearData,currentSavedYearData);
                    setMax(findMaxTotal(currentYearData));
                    setMin(findMinTotal(currentYearData));
                    setTotal(sumAllTotal(currentYearData));
                    setsMax(findMaxDiff(currentSavedYearData));
                    setsMin(findMinDiff(currentSavedYearData));
                    setsTotal(sumAllDiff(currentSavedYearData));
                    break;
                default: // 'current'
                    newUserData = mapToChartData(userData,userSavedData);
                    setMax(findMaxTotal(userData));
                    setMin(findMinTotal(userData));
                    setTotal(sumAllTotal(userData));
                    setsMax(findMaxDiff(userSavedData));
                    setsMin(findMinDiff(userSavedData));
                    setsTotal(sumAllDiff(userSavedData));
                    break;
            }
        
            setUserData(newUserData);
        };
        function modifyData(modifiedUserData,modifiedUserSavedData,season){
            // let modifiedUserData;
            // let modifiedUserSavedData;
            
            // Modify data based on the season
            if (season === "summer") {
                // Example: increase usage by 20% and decrease conservation by 10% for summer
                modifiedUserData = userData.map(data => ({ ...data, total: data.total * 1.2 }));
                modifiedUserSavedData = userSavedData.map(data => ({ ...data, difference: data.difference * 0.9 }));
            } if (season === "winter") {
                // Example: decreas usage by 20% and increase conservation by 10% for winter
                modifiedUserData = userData.map(data => ({ ...data, total: data.total * 0.9 }));
                modifiedUserSavedData = userSavedData.map(data => ({ ...data, difference: data.difference * 1.2 }));
             } else {
                // If season is not summer, use original data
                // modifiedUserData = userData;
                // modifiedUserSavedData = userSavedData;
            }
        
        }
        const mapToChartData = (data,SavedData) => {
            return {
                labels: data.map((dataItem) => dataItem.timedate),
                datasets: [{
                    label: "Usage",
                    data: data.map((dataItem) => dataItem.total),
                    backgroundColor: 'blue',
                    pointBorderColor: 'transparent',
                    pointBorderWidth: 4,
                },
                { //second bar chart showing water conserved
                    label:"Conserved",
                    data:SavedData.map((SavedDataitem)=>SavedDataitem.difference),
                    backgroundColor: 'rgba(144, 238, 144, 0.5)',
                    pointBorderColor: 'solid',
                    pointBorderWidth: 4,
                    tension: 0.4,
                    type :'bar',
                },],
            };
        };

     // This effect depends on selectedOption, so it reruns when selectedOption changes
    return (

        <div className="w-auto rounded-lg bg-white p-6 h-full">
            {/* 1  */}
            <div data-testid="wtr1" className="flex flex-col justify-between gap-8 sm:flex-row">
                <div className="font-semibold text-2xl">Water Usage & Conservation</div>
                <select name="filters"
                    id="waterOverviewFilter"
                    className="flex border rounded-lg py-1 px-2"
                    value={selectedOption}
                    onChange={handleFilterChange}
                >
                    {options.map((option) => (<option key={option} value={option}>{option}</option>))}
                </select>
            </div>

            {/* 2 */}
            <div className="flex flex-col py-8 gap-16 lg:flex-row ">
                <div className="flex md:flex-col gap-8 ">
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold flex gap-2 items-center"><div className="rounded-full w-3 h-3 bg-green-100"></div>Total Conserved</div>
                        <div className="text-6xl">{stotal}L</div>
                        <div className="flex gap-4">
                            <div className="flex gap-1 items-center text-sm">MIN <span className=" flex items-center font-semibold text-[#e60202]">{smin}L <ChevronDown size={'20px'} /></span></div>
                            <div className="flex gap-1 items-center text-sm">MAX <span className=" flex items-center font-semibold text-[#009933]">{smax}L <ChevronUp size={'20px'}/></span></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-semibold flex gap-2 items-center"><div className="rounded-full w-3 h-3 bg-blue-900"></div>Total Usage</div>
                        <div className="text-6xl">{total}L</div>
                        <div className="flex gap-4">
                            <div className="flex gap-1 items-center text-sm">MIN <span className=" flex items-center font-semibold text-[#009933]">{min}L<ChevronDown size={'20px'}/></span></div>
                            <div className="flex gap-1 items-center text-sm">MAX <span className=" flex items-center font-semibold text-[#e60202]">{max}L  <ChevronUp size={'20px'}/></span></div>
                        </div>
                    </div>
                </div>
                <div className="w-full "> 
                   <Lchart chartData={UserData} /> 
                </div>
            </div>
        </div>
    );
};

//Lchart chartData={UserData}

export default WaterOverview;