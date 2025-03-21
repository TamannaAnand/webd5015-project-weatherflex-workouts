// import { generateYAxis } from '@/app/lib/utils';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartLine } from "@fortawesome/free-solid-svg-icons";
// import { fetchRevenue } from '@/app/lib/data';
// import { useEffect, useState } from 'react';

// export default function RevenueChart() {
//   const [revenue, setRevenue] = useState([]);

//   useEffect(() => {
//     const doFetch = async () => {
//       const response = await fetchRevenue();

//       setRevenue(response);
//     }

//     doFetch()
//   }, [])

//   const chartHeight = 350; // Reduced chart height

//   const { yAxisLabels, topLabel } = generateYAxis(revenue);

//   if (!revenue || revenue.length === 0) {
//     return <p className="mt-4 text-gray-400">No data available.</p>;
//   }

//   return (
//     <div className="w-full">
//       <h2 className="mb-4 text-xl md:text-2xl">Monthly Workout Progress</h2>

//       <div className="rounded-xl bg-gray-50 p-4 w-full">
//         <div className="flex flex-wrap justify-center gap-2 p-4 items-end">
//           <div
//             className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
//             style={{ height: `${chartHeight}px` }}
//           >
//             {yAxisLabels.map((label) => (
//               <p key={label}>{label}</p>
//             ))}
//           </div>

//           {revenue.map((month) => (
//             <div key={month.month} className="flex flex-col items-center gap-1">
//               <div
//                 className="w-full rounded-md bg-blue-300"
//                 style={{
//                   height: `${(chartHeight / topLabel) * month.revenue}px`,
//                   width: '3rem', // Adjust the width to make the bars skinnier
//                 }}
//               ></div>
//               <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
//                 {month.month}
//               </p>
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center pb-2 pt-6">
//           <FontAwesomeIcon className="h-5 w-5 text-gray-500" icon={faChartLine} />
//           <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
//         </div>
//       </div>
//     </div>
//   );
// }
