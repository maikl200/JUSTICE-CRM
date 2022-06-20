import React from 'react';
import Chart from "react-apexcharts";
import {productDataMocks} from '../../mockdata/productData'

const salesProduct = localStorage.getItem('salesProduct')
//@ts-ignore

const salesProductInDay =
  salesProduct && JSON.parse(salesProduct).length
    ?
    JSON.parse(salesProduct)?.map((item: any) => item.valueNumberProduct)
    :
    productDataMocks?.map(product => product.soldItems)


const DiogramBars = () => {

  return (
    <div>
      <Chart
        type='bar'
        width={920}
        height={480}
        series={[{
          name: 'sales',
          data: salesProductInDay?.length && salesProductInDay,
          color: '#5B6ACD'
        }, {
          name: '',
          data: [-40, -40, -40, -40, -40, -40, -40],
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
                return `${val}`
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