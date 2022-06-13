import React from 'react';
import Chart from "react-apexcharts";

const DiogramLine = () => {
  return (
    <div>
      <Chart
        type='line'
        width={340}
        height={140}
        series={[
          {
            name: "earned",
            data: [10, 41, 35, 51, 49, 62]
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
          noData: {
            text: 'No Data',
            align: 'center',
          },
          xaxis: {
            labels: {
              formatter: () => ''
            },
            title: {
              text: '$106,000',
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