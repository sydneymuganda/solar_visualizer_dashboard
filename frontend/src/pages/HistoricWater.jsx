import React, { useState } from 'react';
import EnergyHistoryComparison from '../components/Charts/historyChart';
import useAutoNavigate from '../hooks/useAutoNavigate';
import WaterConsumptionComparison from '../components/Charts/Waterhistory';
function HistoricWater() {

    // Custom hook - after 5 minutes of mouse idle go to the assigned page
    useAutoNavigate('/');

    const[selectedYearGeneration, setSelectedYearGeneration] = useState("overall");
    const[selectedYearConsumption, setSelectedYearConsumption] = useState("overall");
    return (
        <div className="grid gap-4 row-span-2 lg:h-[calc(100vh-64px)] p-5">
            {/* Row 1 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-4 '>
                <div className='col-span-3 rounded-lg bg-white p-6'>
                    <div className='flex items-center justify-between pb-2'>
                        <h1 className="font-semibold text-2xl">Historical Water Conservation (Litres)</h1>
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
                    <h3 className="font-semibold text-2xl">Historical Water Conservation Chart Metrics Explained</h3>
                    <p>
                        This chart visually illustrates historical water conservation data for different years, providing insights into conservation efforts and trends over time. The y-axis represents water conservation measures, while the x-axis displays the timeline. Examine annual water conservation trends to gain a better understanding of how efforts to preserve water resources have evolved over the years.
                    </p>
                </div>
            </div>
            {/* Row 2 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
                {/* Chart Metrics Box */}
                <div className='col-span-1 rounded-lg bg-white p-6 content-end flex flex-col gap-4'>
                    <h3 className="font-semibold text-2xl">Historical Water Usage Chart Metrics Explained</h3>
                    <p>
                        This chart visually presents historical water usage data for various years, offering insights into consumption patterns and trends over time. The y-axis represents water consumption, and the x-axis displays the timeline. Explore annual water usage trends to understand how water consumption has changed and evolved throughout the years.
                    </p>
                </div>
                <div className='col-span-3 rounded-lg bg-white p-6'>
                    <div className='flex items-center justify-between pb-2'>
                        <h1 className="font-semibold text-2xl">Historical Water Usage (Litres)</h1>
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

export default HistoricWater;
