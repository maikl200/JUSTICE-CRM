import React from 'react';
import Chart from "react-apexcharts";
import {productDataMocks} from "../../mockdata/productData";
import axios from "axios";

const DiogramLine = () => {

  // @ts-ignore
  const salesProduct = axios.get('http://localhost:5100/salesProduct/salesProduct')
    .then(() => {
      return salesProduct
    })
    .catch(() => {
      console.log('false')
    })

  const priceProductInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((product: any) => product.price)
      :
      productDataMocks?.map(product => product.price)

  const totalCount = priceProductInDay && priceProductInDay.reduce(function (prev: any, next: any) {
    return prev + next
  })

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