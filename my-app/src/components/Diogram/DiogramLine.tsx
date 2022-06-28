import React, {useEffect, useState} from 'react';
import Chart from "react-apexcharts";
import {productDataMocks} from "../../mockdata/productData";
import axios from "axios";
import Cookies from "js-cookie";

const DiogramLine = () => {

  const [salesProduct, setSalesProduct] = useState()

// @ts-ignore
  const mySalesProduct = async () => {
    const allSaleProducts = axios.get('http://localhost:5100/sellProduct/mySellProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
    try {
      await allSaleProducts.then((res) => setSalesProduct(res.data))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    mySalesProduct()
  }, [])

  const priceProductInDay =
    // @ts-ignore
    salesProduct && salesProduct?.length
      ?
      // @ts-ignore
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