import React, {useEffect, useState} from 'react';

import Chart from 'react-apexcharts'
import {typeProduct} from '../../types/types'

import axios from "axios";
import Cookies from "js-cookie";

const DiogramPie = () => {

  const [salesProduct, setSalesProduct] = useState<typeProduct[]>()

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

  const productsCategoryInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((product: typeProduct) => product.productCategory)
      :
      null


  const salesProductInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((item: typeProduct) => item.soldItems)
      :
      []
  return (
    <div>
      <Chart
        type='pie'
        width={350}
        height={262}
        series={salesProductInDay?.length ? salesProductInDay : [1]}
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