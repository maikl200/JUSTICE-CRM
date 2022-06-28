import React, {useEffect, useState} from 'react';

import Chart from 'react-apexcharts'
import {productDataMocks} from "../../mockdata/productData";
import axios from "axios";
import Cookies from "js-cookie";

const DiogramPie = () => {

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

  const productsCategoryInDay =
    // @ts-ignore
    salesProduct && salesProduct?.length
      ?
      // @ts-ignore
      salesProduct?.map((product: { productCategory: string; }) => product.productCategory)
      :
      productDataMocks?.map(product => product.productCategory)

  const salesProductInDay =
    // @ts-ignore
    salesProduct && salesProduct?.length
      ?
      // @ts-ignore
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