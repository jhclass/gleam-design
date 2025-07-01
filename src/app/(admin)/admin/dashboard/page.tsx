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
    const tabBtns = document.querySelectorAll<HTMLElement>('[role="tabBtn"]');
    const tabContents = document.querySelectorAll<HTMLElement>(
      '[role="tabContent"]'
    );
    tabBtns.forEach(function (tabBtn, i) {
      tabBtn.addEventListener("click", function () {
        tabBtns.forEach((t, j) => {
          const selected = i === j;
          t.setAttribute("aria-selected", String(selected));
          t.setAttribute("tabIndex", selected ? "0" : "-1");
          t.classList.remove("active");
        });
        tabContents.forEach(function (el) {
          el.classList.remove("active");
        });
        tabBtn.classList.add("active");
        tabContents[i].classList.add("active");
      });
      //키로 탭버튼 이동
      tabBtn.addEventListener("keydown", function (e: KeyboardEvent) {
        e.preventDefault();
        if (e.key === "Enter") {
          tabBtn.click();
        }
        const length = tabBtns.length;
        if (e.key === "ArrowRight") {
          tabBtns[(i + 1) % length].focus();
        } else if (e.key === "ArrowLeft") {
          tabBtns[(i - 1) % length].focus();
        }
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
              <button
                className="active"
                role="tabBtn"
                aria-selected="true"
                aria-controls="tabCon1"
                id="tabBtn1"
                tabIndex={0}
              >
                일간
              </button>
              <button
                role="tabBtn"
                aria-selected="false"
                aria-controls="tabCon2"
                id="tabBtn2"
                tabIndex={-1}
              >
                주간
              </button>
              <button
                role="tabBtn"
                aria-selected="false"
                aria-controls="tabCon3"
                tabIndex={-1}
                id="tabBtn3"
              >
                월간
              </button>
            </div>
            <div className="visitorsContentWrap w-full">
              <div
                className="mb-24 active"
                role="tabContent"
                aria-labelledby="tabBtn1"
                id="tabCon1"
              >
                <VisitorChart data={visitor} isMobile={isMobile} />1
              </div>
              <div
                className="mb-24"
                role="tabContent"
                id="tabCon2"
                aria-labelledby="tabBtn2"
              >
                <VisitorChart data={visitor} isMobile={isMobile} />2
              </div>
              <div
                className="mb-24"
                role="tabContent"
                aria-labelledby="tabBtn3"
              >
                <VisitorChart data={visitor} isMobile={isMobile} />3
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
