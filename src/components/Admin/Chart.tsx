// import  { useEffect, useRef } from 'react';
// import { Line } from 'react-chartjs-2';


// const data = {
//  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//  datasets: [
//     {
//       label: 'UV',
//       data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
//       fill: false,
//       backgroundColor: 'rgba(136, 165, 213, 0.2)',
//       borderColor: 'rgba(136, 165, 213, 1)',
//     },
//     {
//       label: 'PV',
//       data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
//       fill: false,
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//     },
//  ],
// };

// const options = {
//  scales: {
//     y: {
//       beginAtZero: true,
//     },
//  },
// };

// const Chart = () => {
//  const chartRef = useRef(null);

//  useEffect(() => {
//     // Create the chart when the component mounts
//     const chartInstance  = new Line(chartRef.current, {
//       data: data,
//       options: options,
//     });

//     // Clean up the chart instance when the component unmounts
//     return () => {
//       chartInstance.destroy();
//     };
//  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

//  return <canvas ref={chartRef} />;
// };

// export default Chart;
