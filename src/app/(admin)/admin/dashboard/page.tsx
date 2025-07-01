"use client";
import VisitorChart from "@/component/admin/dashboard/VisitorChart";
import visitor from "@/data/visitor.json";
import { useEffect, useState } from "react";
import "@/css/admin/dashboard.css";
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
  if (typeof document !== "undefined") {
    const visitorsTabBtn = document.querySelectorAll(".visitorsTabBtn > span");
    visitorsTabBtn.forEach(function (el, index) {
      el.addEventListener("click", function () {
        if (el.classList.contains("acitve")) return;
        document
          .querySelectorAll(".visitorsContentWrap > div")
          .forEach(function (el) {
            el.classList.remove("active");
          });
        visitorsTabBtn.forEach(function (el) {
          el.classList.remove("active");
        });
        visitorsTabBtn[index].classList.add("active");
        document
          .querySelectorAll(".visitorsContentWrap > div")
          [index].classList.add("active");
      });
    });
  }

  return (
    <>
      <div className="dashboardWrap w-full p-4 flex justify-center items-center flex-col">
        <div className="w-full md:w-[80%] lg:w-[60%]">
          <h2 className="w-full py-8 text-[1.5rem] text-center">
            관리자 대시보드
          </h2>
          <div className="visitorsWrap w-full">
            <div className="visitorsTabBtn flex justify-center items-center gap-20 py-10">
              <span className="active cursor-pointer">일간</span>
              <span>주간</span>
              <span>월간</span>
            </div>
            <div className="visitorsContentWrap w-full">
              <div className="mb-24 active">
                <VisitorChart data={visitor} isMobile={isMobile} />
              </div>
              <div className="mb-24">
                <VisitorChart data={visitor} isMobile={isMobile} />
              </div>
              <div className="mb-24">
                <VisitorChart data={visitor} isMobile={isMobile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
