import React, {FC, useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import {typeProduct} from '../../types/types'

import axios from "axios";
import Cookies from "js-cookie";


const DiogramLine: FC = () => {

  const [salesProduct, setSalesProduct] = useState<any>()

  useEffect(() => {

    const allSaleProducts = axios.get('http://localhost:5100/sellProduct/mySellProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
    try {
      allSaleProducts.then((res) => setSalesProduct(res.data))
    } catch (e) {
      console.error(e)
    }

  }, [])

  const priceProductInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((product: typeProduct) => product.price)
      :
      ['You havent earned a single ']

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
            data: priceProductInDay?.length ? priceProductInDay : [0]
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