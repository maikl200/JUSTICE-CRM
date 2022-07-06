import React, {FC, useEffect} from 'react';
import Chart from "react-apexcharts";
import {TypeProduct} from '../../types/types'

import {useTypedSelector} from "../../utils/useTypedSelector";
import {useAction} from "../../utils/useAction";


const DiogramLine: FC = () => {

  const salesProduct = useTypedSelector(state => state.sellProductReducer)
  const {fetchSellProducts} = useAction()

  useEffect(() => {
    fetchSellProducts()
  }, [])

  const priceProductInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((product: TypeProduct) => product.price)
      :
      ['You havent earned a single ']

  // @ts-ignore
  const totalCount = priceProductInDay && priceProductInDay.reduce(function (prev: number, next: number) {
    return prev + next
  })

  return (
    <div>
      <Chart
        type='line'
        width={480}
        height={140}
        series={[
          //@ts-ignore
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