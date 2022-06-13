import React from 'react';

import Chart from 'react-apexcharts'

const DiogramPie = () => {
  return (
    <div>
      {/*todo Доделай график pie (смотри на макет)*/}
      <Chart
        type='pie'
        width={350}
        height={350}
        series={[100, 200, 300, 400]}
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
          labels: ['Auto goods', 'Auto goods', 'Auto goods', 'Auto goods'],
          colors: ['#5B6ACD', '#5182E7', '#F4AE43', '#1CAF7F']
        }}
      >
      </Chart>
    </div>
  );
};

export default DiogramPie;