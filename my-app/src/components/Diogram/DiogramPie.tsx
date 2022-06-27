import React from 'react';

import Chart from 'react-apexcharts'
import {productDataMocks} from "../../mockdata/productData";
import axios from "axios";

const DiogramPie = () => {

  // @ts-ignore
  const salesProduct = axios.get('http://localhost:3001/salesProduct/salesProduct')
    .then(() => {
      return salesProduct
    })
    .catch(() => {
      console.log('false')
    })

  const productsCategoryInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((product: { productCategory: string; }) => product.productCategory)
      :
      productDataMocks?.map(product => product.productCategory)

  const salesProductInDay =
    salesProduct && salesProduct?.length
      ?
      salesProduct?.map((item: any) => item.soldItems)
      :
      productDataMocks?.map(product => product.soldItems)

  return (
    <div>
      <Chart
        type='pie'
        width={350}
        height={262}
        series={salesProductInDay?.length && salesProductInDay}
        options={{
          dataLabels: {
            enabled: false
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
          colors: ['#5B6ACD', '#5182E7', '#F4AE43', '#1CAF7F']
        }}
      >
      </Chart>
    </div>
  );
};

export default DiogramPie;