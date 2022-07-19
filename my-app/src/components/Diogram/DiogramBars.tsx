import React, {FC, useEffect} from 'react';
// import Chart from "react-apexcharts";
//
// import {useTypedSelector} from "../../hooks/useTypedSelector";
// import {useAction} from "../../hooks/useAction";
//
//
// const DiogramBars: FC = () => {
//
//   const salesProduct = useTypedSelector(state => state.sellProduct)
//   const {fetchSellProduct} = useAction()
//
//   useEffect(() => {
//     fetchSellProduct()
//   }, [])
//
//   const salesProductInDay =
//     salesProduct?.map((item) => item.soldItems || 0)
//
//
//   return (
//     <div>
//       <Chart
//         type='bar'
//         width={920}
//         height={480}
//         series={[{
//           name: 'sales',
//           data: salesProductInDay,
//           color: salesProductInDay ? '#5B6ACD' : '#b1b4b9'
//         }, {
//           name: '',
//           data: salesProductInDay.map(() => -30),
//           color: '#EFF1FF'
//         }]
//         }
//         options={{
//           grid: {
//             show: true,
//             borderColor: '#E8EBEF66',
//           },
//           noData: {
//             text: 'No Data',
//             align: 'center',
//           },
//           tooltip: {
//             enabledOnSeries: [0],
//           },
//           chart: {
//             type: 'bar',
//             stacked: true,
//             toolbar: {
//               show: false
//             },
//             zoom: {
//               enabled: false
//             }
//           },
//           legend: {
//             show: false
//           },
//           dataLabels: {
//             enabled: false
//           },
//           yaxis: {
//             forceNiceScale: true,
//             axisBorder: {
//               show: true,
//               color: '#E8EBEF66',
//             },
//             labels: {
//               formatter: (val) => {
//                 return `${val}`
//               },
//             }
//
//           },
//           title: {
//             text: 'Sales Overview',
//             align: 'left',
//             offsetX: 25,
//             offsetY: 20,
//             style: {
//               fontSize: '18px',
//               fontFamily: 'Inter'
//             }
//           },
//           subtitle: {
//             text: 'Graph sales for all days',
//             align: 'left',
//             offsetX: 25,
//             offsetY: 45,
//             floating: false,
//             style: {
//               fontSize: '12px',
//               fontWeight: 'normal',
//               fontFamily: 'Inter',
//               color: '#9699a2'
//             },
//           },
//           xaxis: {
//             axisBorder: {
//               show: true,
//               color: '#E8EBEF66',
//             },
//             axisTicks: {
//               show: false,
//             },
//             categories:
//               salesProductInDay ? [
//                 'Mon',
//                 'Tue',
//                 'Wed',
//                 'Thu',
//                 'Fri',
//                 'Sat',
//                 'Sun',
//               ] : ['No sales'],
//           },
//         }}
//       >
//       </Chart>
//     </div>
//   );
// };
//
// export default DiogramBars;