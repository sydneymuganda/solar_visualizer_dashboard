import React, { useState } from 'react';
import EnergyHistoryComparison from '../components/Charts/historyChart';
import useAutoNavigate from '../hooks/useAutoNavigate';
import WaterConsumptionComparison from '../components/Charts/Waterhistory';
function Statistics() {

    // Custom hook - after 5 minutes of mouse idle go to the assigned page
    useAutoNavigate('/historic-water');

    const[selectedYearGeneration, setSelectedYearGeneration] = useState("overall");
    const[selectedYearConsumption, setSelectedYearConsumption] = useState("overall");
  return (
    <div className="grid gap-4 row-span-2 lg:h-[calc(100vh-64px)] p-5">
        {/* Row 1 */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-4 '>
            <div className='col-span-3 rounded-lg bg-white p-6'>
                <div className='flex items-center justify-between pb-2'>
                    <h1 className="font-semibold text-2xl">Historical Energy Generation (kWh)</h1>
                    <select value={selectedYearGeneration} onChange={(e) => setSelectedYearGeneration(e.target.value)} className='border rounded-lg py-1 px-2'>
                        <option value="overall">Overall</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            
            <EnergyHistoryComparison year={selectedYearGeneration} type={"Gen"}/>
            </div>
            {/* Chart Metrics Box */}
            <div className='col-span-1 rounded-lg bg-white p-6 order-first lg:order-last content-end flex flex-col gap-4'>
                <h3 className="font-semibold text-2xl">Historical Energy Generation Chart Metrics Explained</h3>
                <p>
                    This chart visually displays solar energy generation data for different years, offering insights into its historical growth and fluctuations. The y-axis represents solar energy production, while the x-axis shows the timeline. Compare and analyze annual solar generation trends to understand the evolution of solar energy over time.
                </p>
            </div>
        </div>
        {/* Row 2 */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
            {/* Chart Metrics Box */}
            <div className='col-span-1 rounded-lg bg-white p-6 content-end flex flex-col gap-4'>
                <h3 className="font-semibold text-2xl">Historical Energy Consumption Chart Metrics Explained</h3>
                <p>
                    This chart visually represents historical solar energy consumption data for different years, providing insights into consumption patterns and changes over time. The y-axis reflects solar energy consumption, and the x-axis displays the timeline. Analyze annual solar consumption trends to gain a deeper understanding of how solar energy usage has evolved over the years.
                </p>
            </div>
            <div className='col-span-3 rounded-lg bg-white p-6'>
                <div className='flex items-center justify-between pb-2'>
                    <h1 className="font-semibold text-2xl">Historical Energy Consumption (kWh)</h1>
                    <select value={selectedYearConsumption} onChange={(e) => setSelectedYearConsumption(e.target.value)} className='border rounded-lg py-1 px-2'>
                        <option value="overall">Overall</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            <EnergyHistoryComparison year={selectedYearConsumption} type={"Con"}/>
            {/* <WaterConsumptionComparison /> */}
            </div>
        </div>
    </div>
  );
}

export default Statistics;
