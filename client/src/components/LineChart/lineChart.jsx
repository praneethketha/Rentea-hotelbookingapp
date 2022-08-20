import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const LineChart = ({ label, data, labels, main_label }) => {
  return (
    <Line
      data={{
        labels: label,
        datasets: [
          {
            label: labels[0],
            data: data[1],
            backgroundColor: "#333)",
            borderColor: "rgba(0,0,0,0.2)",
            yAxisID: "y",
          },
          {
            label: labels[1],
            data: data[0],
            backgroundColor: "#ff6d1b",
            borderColor: "rgba(255, 109, 27,0.5)",
            yAxisID: "y1",
          },
        ],
      }}
      height={500}
      width={600}
      options={{
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
          },
          x: {
            ticks: {
              maxRotation: 90,
              minRotation: 90,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        stacked: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: main_label,
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      }}
    />
  );
};
export default LineChart;
