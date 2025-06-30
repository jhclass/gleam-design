"use client";
import VisitorChart from "@/component/admin/dashboard/VisitorChart";
import visitor from "@/data/visitor.json";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [winSize, setWinSize] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const viewportSizeFunc = () => {
    const viewportSize = window.innerWidth;
    setWinSize(viewportSize);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      viewportSizeFunc();
      window.addEventListener("resize", viewportSizeFunc);
      return () => {
        window.removeEventListener("resize", viewportSizeFunc);
      };
    }
  }, []);
  useEffect(() => {
    if (winSize > 767) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [winSize]);

  return (
    <>
      <div className="dashboardWrAP w-full p-4 flex justify-center items-center flex-col">
        <div className="w-full md:w-[80%] lg:w-[60%]">
          <h2 className="w-full py-8 text-[1.5rem] text-center">
            관리자 대시보드
          </h2>
          <div>
            <h3 className="text-[1rem] text-center py-2">일간 방문자</h3>
            <VisitorChart data={visitor} isMobile={isMobile} />
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
