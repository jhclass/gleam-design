import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface VisitorData {
  hour: number;
  count: number;
}
export default function VisitorChart({
  data,
  isMobile,
}: {
  data: VisitorData[];
  isMobile: boolean;
}) {
  console.log(data);
  const now = new Date();
  const currentHour = now.getHours();
  console.log(typeof currentHour);
  const newMericData = data.map((item) => ({
    x: Number(item.hour),
    y: item.count,
  }));
  console.log(typeof newMericData);
  const maxCountHour = useMemo(() => {
    return data.reduce((acc, cur) => (cur.count > acc.count ? cur : acc)).hour;
  }, [data]);
  const totalCount = useMemo(() => {
    return data.reduce((acc, cur) => acc + cur.count, 0);
  }, [data]);
  console.log(totalCount, "totalCount");
  console.log(maxCountHour, "maxCounterHour");
  const filterData = useMemo(() => {
    if (!isMobile) return data;
    return data.filter(
      (d) => d.hour >= currentHour - 1 && d.hour <= currentHour + 1
    );
  }, [currentHour, data, isMobile]);
  console.log(filterData, "filterData");
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Pretendard, sans-serif",
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
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
      enabled: true,
      x: {
        formatter: (val: number) => `${val} 시`,
      },
    },
    xaxis: {
      type: "numeric",
      tickAmount: isMobile ? 2 : 23,
      labels: {
        formatter: (val: number | string) => `${Math.round(Number(val))}시`,
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val}명`,
      },
    },
  };
  const series = [
    {
      name: "방문자 수",
      data: filterData?.map((item) => {
        return {
          x: Number(item.hour) || 0,
          y: item.count || 0,
          fillColor: item.hour === maxCountHour ? "#FF4560" : "#4e81ef",
        };
      }),
    },
  ];
  return (
    <>
      <div>
        <div className="text-center mb-2">
          총 방문자 : <span className="font-semibold">{totalCount}명</span>
        </div>
        <ReactApexChart
          type="bar"
          options={options}
          series={series}
          height={350}
        />
      </div>
    </>
  );
}
