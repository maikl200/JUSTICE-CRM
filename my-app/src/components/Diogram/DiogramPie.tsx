import React, {useEffect} from 'react';

import Chart from 'react-apexcharts'

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../redux/store";
import {fetchSellProduct} from "../../redux/asyncThunk/sellProductAsyncThunk";

const DiogramPie = () => {

  const {sellProduct} = useTypedSelector(state => state.sellProduct)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSellProduct())
  }, [])


  const productsCategoryInDay =
    sellProduct?.map((product) => product.productCategory || 'no sales')

  const salesProductInDay =
    sellProduct?.map((item) => item.soldItems || 1)

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