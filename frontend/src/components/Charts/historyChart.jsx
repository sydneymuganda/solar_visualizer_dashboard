import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LChart from '../Charts/Lchart'

const fetchDataForYear = async (year) => {
    // Mocking fetch logic here, you can replace with actual API call
    return new Array(12).fill(null).map((_, index) => ({
        month: index + 1,
        value: Math.floor(Math.random() * 500) + 1, // random data for simplicity
    }));
};

function EnergyHistoryComparison({year, type}) {
    // const [year, setYear] = useState('overall');
    const [data2021, setData2021] = useState([]);
    const [data2020, setData2020] = useState([]);
    const navigate = useNavigate();

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
        <div className="energy-history-container">
            <div style={{ width: '100%', height: '300px'}}>
                <LChart chartData={chartData} options={{ maintainAspectRatio: false }}/>
            </div>
        </div>
    );
}

export default EnergyHistoryComparison;
