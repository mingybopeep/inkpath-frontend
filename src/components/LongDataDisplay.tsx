import React from 'react';
import './LongDataDisplay.scss';

import { Line } from 'react-chartjs-2';
import { Table } from './Table';
import { CSVLink } from 'react-csv';

interface Props {
    data: Data[];
}

export const LongDataDisplay: React.FC<Props> = ({ data }) => {

    //generating a chart-js friendly config
    const prepForLineChart = () => {
        if (data) {
            return {
                labels: data.map(row => row.date),
                datasets: [
                    {
                        label: data[0].symbol,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data.map(row => +row.rate),
                    }
                ]
            };
        }
    };
    //convering the data to a CSV friendly format 
    const toCSV = () => {
        if (data) {
            return data.map(row => {
                return [row.symbol, row.date, row.rate];
            });
        } else {
            return [['']]
        }
    }


    return (
        <section>
            <Line data={prepForLineChart()} />
            <Table data={data} />
            <CSVLink data={toCSV()}>EXPORT TO CSV</CSVLink>
        </section>
    )
}
