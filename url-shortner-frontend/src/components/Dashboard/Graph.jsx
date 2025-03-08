import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item, i) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);

  const data = {
    labels:
      graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
          graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
          graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
        borderColor: "#1D2327",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#94A3B8",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#94A3B8",
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        grid: {
          color: "#1E1E24",
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: "#F8FAFC",
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 14,
            weight: "600",
          },
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          color: "#94A3B8",
        },
        grid: {
          color: "#1E1E24",
        },
        title: {
          display: true,
          text: "Date",
          color: "#F8FAFC",
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 14,
            weight: "600",
          },
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options} />;
};

export default Graph;
