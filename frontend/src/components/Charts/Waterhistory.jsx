import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import LChart from '../Charts/Lchart'

// This is just a mock function. Replace it with your API call to get water consumption data.
const fetchDataForYear = async (year) => {
    return new Array(12).fill(null).map((_, index) => ({
        month: index + 1,
        value: Math.floor(Math.random() * 500) + 1, // random water consumption data for simplicity
    }));
};

function WaterConsumptionComparison({year, type}) {

    const [data2021, setData2021] = useState([]);
    const [data2020, setData2020] = useState([]);

    useEffect(() => {
        if (year === '2021' || year === 'overall') {
            fetchDataForYear(2021).then((data) => {
                setData2021(data);
            });
        }
        if (year === '2020' || year === 'overall') {
            fetchDataForYear(2020).then((data) => {
                setData2020(data);
            });
        }
    }, [year]);

    let chartData;
    if (type === "Gen") {
        chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: '2021',
                    data: data2021.map((d) => d.value),
                    backgroundColor: 'rgb(141,191,196)',
                    fill: true,
                    borderColor: 'rgb(141,191,196)',
                    borderWidth: 1,
                    hidden: year !== '2021' && year !== 'overall',
                },
                {
                    label: '2020',
                    data: data2020.map((d) => d.value),
                    fill: true,
                    backgroundColor: 'rgb(94, 127, 130)',
                    borderColor: 'rgb(94, 127, 130)',
                    borderWidth: 1,
                    hidden: year !== '2020' && year !== 'overall',
                },
            ],
        };
    } else {
        chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: '2021',
                    data: data2021.map((d) => d.value),
                    backgroundColor: 'rgb(255,133,113)',
                    fill: true,
                    borderColor: 'rgb(255,133,113)',
                    borderWidth: 1,
                    hidden: year !== '2021' && year !== 'overall',
                },
                {
                    label: '2020',
                    data: data2020.map((d) => d.value),
                    fill: true,
                    backgroundColor: 'rgb(161, 79, 66)',
                    borderColor: 'rgb(161, 79, 66)',
                    borderWidth: 1,
                    hidden: year !== '2020' && year !== 'overall',
                },
            ],
        };
    };

    return (
        <div className="water-consumption-container">
            <div style={{ width: '100%', height: '300px'}}>
                <Line data={chartData} options={{ maintainAspectRatio: false }}/>
            </div>
        </div>
    );
}

export default WaterConsumptionComparison;
