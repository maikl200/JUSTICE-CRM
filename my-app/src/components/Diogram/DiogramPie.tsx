import React, {useEffect} from 'react';

import Chart from 'react-apexcharts'

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";

const DiogramPie = () => {

  const salesProduct = useTypedSelector(state => state.sellProduct)
  const {fetchSellProduct} = useAction()

  useEffect(() => {
    fetchSellProduct()
  }, [])


  const productsCategoryInDay =
    salesProduct?.map((product) => product.productCategory || 'no sales')

  const salesProductInDay =
    salesProduct?.map((item) => item.soldItems || 1)

  return (
    <div>
      <Chart
        type='pie'
        width={350}
        height={262}
        series={salesProductInDay}
        options={{
          dataLabels: {
            enabled: false
          },
          noData: {
            text: 'No Data',
            align: 'center',
          },
          title: {
            text: 'Sales schedule by day',
            align: 'left',
            offsetX: 25,
            offsetY: 5,
            margin: 50,
            floating: false,
            style: {
              fontSize: '18px',
              fontFamily: 'Inter',
            }
          },
          labels: productsCategoryInDay,
          colors: productsCategoryInDay?.length ? ['#5B6ACD', '#5182E7', '#F4AE43', '#1CAF7F'] : ['#b1b4b9']
        }}
      >
      </Chart>
    </div>
  );
};

export default DiogramPie;