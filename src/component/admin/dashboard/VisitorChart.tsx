import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface VisitorData {
  hour: string;
  count: number;
}
export default function VisitorChart({ data }: { data: VisitorData[] }) {
  console.log(data);
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
    colors: ["#465FFF", "#9cB9ff"],
    chart: {
      fontFamily: "Pretendard, sans-serif",
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: [1, 1],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0.75,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {},
    tooltip: {
      x: {
        formatter: (val: unknown) => `${val as string} 시`,
      },
    },
    xaxis: { type: "category", categories: data.map((item) => item.hour) },
    yaxis: {},
  };
  const series = [
    {
      name: " 방문자 수",
      data: data.map((item) => {
        return {
          x: item.hour || "00",
          y: item.count || 0,
        };
      }),
    },
  ];
  return (
    <>
      <div>
        <ReactApexChart type="bar" options={options} series={series} />
      </div>
    </>
  );
}
