import React, {useEffect} from 'react';

import Chart from 'react-apexcharts'
import {TypeProduct} from '../../types/types'

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";

const DiogramPie = () => {

  const salesProduct = useTypedSelector(state => state.sellProduct)
  const {fetchSellProducts} = useAction()

  useEffect(() => {
    fetchSellProducts()
  }, [])

  const productsCategoryInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((product: TypeProduct) => product.productCategory)
      :
      null


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
          labels: productsCategoryInDay?.length ? productsCategoryInDay : ['No sales'],
          colors: productsCategoryInDay?.length ? ['#5B6ACD', '#5182E7', '#F4AE43', '#1CAF7F'] : ['#b1b4b9']
        }}
      >
      </Chart>
    </div>
  );
};

export default DiogramPie;