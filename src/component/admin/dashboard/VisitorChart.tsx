import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { themeColor } from "@/css/themeColor";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface VisitorData {
  hour: number;
  count: number;
  validCount: number;
}
export default function VisitorChart({
  data,
  isMobile,
}: {
  data: VisitorData[];
  isMobile: boolean;
}) {
  const now = new Date();
  const currentHour = now.getHours();

  const mobileRange = useMemo(() => {
    return {
      min: Math.max(0, currentHour - 5),
      max: currentHour,
    };
  }, [currentHour]);
  const maxCountHour = useMemo(() => {
    return data.reduce((acc, cur) => (cur.count > acc.count ? cur : acc)).hour;
  }, [data]);
  const totalCount = useMemo(() => {
    return data.reduce((acc, cur) => acc + cur.count, 0);
  }, [data]);
  const totalValidCount = data.reduce((acc, cur) => acc + cur.validCount, 0);
  const validateRate = (totalValidCount / totalCount) * 100;
  const aroundValidateRate = validateRate.toFixed(2);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
    colors: [themeColor.primary, themeColor.accentRed, themeColor.accentYellow],
    chart: {
      fontFamily: "Pretendard, sans-serif",
      type: "line",
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: [1, 1, 1],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.75,
        opacityTo: 0.8,
      },
    },
    markers: {
      size: 3,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
      discrete: [
        {
          seriesIndex: 2,
          dataPointIndex: data.findIndex((item) => item.hour === maxCountHour),
          size: 6,
          fillColor: themeColor.accentYellow,
          strokeColor: "#fff",
        },
      ],
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
      min: isMobile ? mobileRange.min : undefined,
      max: isMobile ? mobileRange.max : undefined,
      tickAmount: isMobile ? 5 : 23,
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
      name: "유효방문자 수(활동)",
      type: "bar",
      data: data?.map((item) => {
        return {
          x: Number(item.hour) || 0,
          y: item.validCount || 0,
        };
      }),
    },
    {
      name: "기타방문자 수(비활동)",
      type: "bar",
      data: data?.map((item) => {
        return {
          x: Number(item.hour) || 0,
          y: item.count - item.validCount || 0,
        };
      }),
    },
    {
      name: "전체 방문자 수",
      type: "line",

      data: data.map((item) => {
        return {
          x: Number(item.hour) || 0,
          y: item.count || 0,
        };
      }),
    },
  ];
  return (
    <>
      <div>
        <div className="text-center mb-2 flex items-center justify-center gap-5 md:gap-10">
          <div className="text-[0.9rem] md:text-[1rem]">
            총 방문자 : <span className="font-semibold">{totalCount}명</span>
          </div>
          <div className="text-[0.9rem] md:text-[1rem]">
            유효 방문자 :{" "}
            <span className="font-semibold">{totalValidCount}명</span>
            <span>({aroundValidateRate}%)</span>
          </div>
        </div>
        <ReactApexChart
          type="line"
          options={options}
          series={series}
          height={350}
        />
      </div>
    </>
  );
}
