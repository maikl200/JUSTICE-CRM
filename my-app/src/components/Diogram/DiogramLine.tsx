import React from 'react';
import Chart from "react-apexcharts";
import {productDataMocks} from "../../mockdata/productData";

const salesProduct = localStorage.getItem('salesProduct')

const priceProductInDay =
  salesProduct && JSON.parse(salesProduct)?.length
    ?
    JSON.parse(salesProduct)?.map((product: any) => product.price)
    :
    productDataMocks?.map(product => product.price)

const totalCount = priceProductInDay && priceProductInDay.reduce(function (prev: any, next: any) {
  return prev + next
})

const DiogramLine = () => {

  return (
    <div>
      <Chart
        type='line'
        width={480}
        height={140}
        series={[
          {
            name: "earned",
            data: priceProductInDay
          }
        ]}
        options={{
          grid: {
            yaxis: {
              lines: {
                show: false,
              }
            }
          },
          yaxis: {
            labels: {
              show: false
            },
          },
          noData: {
            text: 'No Data',
            align: 'center',
          },
          xaxis: {
            labels: {
              formatter: () => ''
            },
            title: {
              text: `${totalCount}$`,
              style: {color: '#2b3844', fontSize: '24px', fontWeight: '600', fontFamily: 'Inter'}
            },
            axisBorder: {
              show: false
            },
          },
          chart: {
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },

          theme: {
            monochrome: {
              enabled: true,
              color: '#1CAF7F'
            }

          },
          tooltip: {
            y: {
              formatter: (val) => {
                return `$${val}`
              }
            }
          }
        }}
      >
      </Chart>
    </div>
  )
    ;
};

export default DiogramLine;