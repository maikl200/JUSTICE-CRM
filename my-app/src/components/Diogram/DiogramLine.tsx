import React, {FC, useEffect} from 'react';
import Chart from "react-apexcharts";

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../redux/store";
import {fetchSellProduct} from "../../redux/slices/sellProductSlice";


const DiogramLine: FC = () => {

  const {sellProduct} = useTypedSelector(state => state.sellProduct)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSellProduct())
  }, [])

  const priceProductInDay =
    sellProduct?.map((product) => product.price || 0)

  const totalCount = priceProductInDay && priceProductInDay.length && priceProductInDay.reduce((prev, next) => {
    return Number(prev) + Number(next)
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
            data: (priceProductInDay)
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
          noData: {
            text: 'No Data',
            align: 'center',
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