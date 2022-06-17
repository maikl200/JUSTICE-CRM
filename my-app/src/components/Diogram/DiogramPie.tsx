import React from 'react';

import Chart from 'react-apexcharts'
import {productDataMocks} from "../../mockdata/productData";

const DiogramPie = () => {
  const productsInDay = productDataMocks.filter(product => product.lastSale === '05.07.2021')
  const productsCategoryInDay = productsInDay.map(product => product.productCategory)
  const productsCountInDay = productsInDay.map(product => product.soldItems)

  return (
    <div>
      {/*todo Доделай график pie (смотри на макет)*/}
      <Chart
        type='pie'
        width={350}
        height={350}
        /*@ts-ignore*/
        series={[...productsCountInDay]}
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
          // labels: ['Auto goods', 'Auto goods', 'Auto goods', 'Auto goods'],
          labels: [...productsCategoryInDay],
          colors: ['#5B6ACD', '#5182E7', '#F4AE43', '#1CAF7F']
        }}
      >
      </Chart>
    </div>
  );
};

export default DiogramPie;