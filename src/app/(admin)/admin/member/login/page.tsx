"use client";
import { useEffect, useState } from "react";

export default function Login() {
  const [loginDocHeight, setLoginDocHeight] = useState<number>(0);
  useEffect(() => {
    let winHeight: number = 0;
    let headerHeight: number = 0;
    let footerHeight: number = 0;
    if (typeof window !== "undefined") {
      console.log(window.innerHeight);
      winHeight = window.innerHeight || 0;
    }
    if (typeof document !== "undefined") {
      console.log(
        document.querySelector("header")?.getBoundingClientRect().height
      );
      headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height || 0;
      footerHeight =
        document.querySelector("footer")?.getBoundingClientRect().height || 0;
    }
    const docHeight: number = winHeight - headerHeight - footerHeight;
    console.log(docHeight, "실제높이");
    setLoginDocHeight(docHeight);
  }, []);

  return (
    <>
      <div
        className={`w-full p-4 flex items-center justify-center`}
        style={{ height: loginDocHeight }}
      >
        <div className="w-full">
          <h2 className="text-[1.5rem] text-center">로그인</h2>
          <form className="w-full flex justify-center items-center flex-col mt-4">
            <input
              type="text"
              className="w-full md:w-[50%] lg:w-[400px] p-2 rounded-md"
            />
            <input
              type="text"
              className="w-full md:w-[50%] lg:w-[400px] p-2 mt-2 rounded-md"
            />
            <button className="w-full md:w-[50%] lg:w-[400px] p-2 mt-4 bg-[#0D37AA] text-white rounded-md">
              로그인
            </button>
            <div className="w-full flex justify-center items-center md:w-[50%] lg:w-[400px] p-2 mt-2">
              <span className="underline">회원가입 바로가기</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
