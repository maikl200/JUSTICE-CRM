import React from 'react';
import Chart from "react-apexcharts";
import {productDataMocks} from '../../mockdata/productData'

const DiogramBars = () => {

  return (
    <div>
      <Chart
        type='bar'
        width={1045}
        height={480}
        series={[{
          name: 'sales',
          data: productDataMocks.map((item) => item.soldItems),
          color: '#5B6ACD'
        }, {
          name: '',
          data: [-200, -200, -200, -200, -200, -200],
          color: '#EFF1FF'
        }]
        }
        options={{
          grid: {
            show: true,
            borderColor: '#E8EBEF66',
          },
          tooltip: {
            enabledOnSeries: [0],
          },

          noData: {
            text: 'No Data',
            align: 'center',
          },
          chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          yaxis: {
            forceNiceScale: true,
            axisBorder: {
              show: true,
              color: '#E8EBEF66',
            },
            labels: {
              formatter: (val) => {
                return `${val}К`
              },
            }

          },
          title: {
            text: 'Sales Overview',
            align: 'left',
            offsetX: 25,
            offsetY: 20,
            style: {
              fontSize: '18px',
              fontFamily: 'Inter'
            }
          },
          subtitle: {
            text: 'Graph sales for all days',
            align: 'left',
            offsetX: 25,
            offsetY: 45,
            floating: false,
            style: {
              fontSize: '12px',
              fontWeight: 'normal',
              fontFamily: 'Inter',
              color: '#9699a2'
            },
          },
          xaxis: {
            axisBorder: {
              show: true,
              color: '#E8EBEF66',
            },
            axisTicks: {
              show: false,
            },
            categories: [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
            ],
          },
        }}
      >
      </Chart>
    </div>
  );
};

export default DiogramBars;