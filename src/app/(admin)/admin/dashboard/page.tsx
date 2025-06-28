"use client";
import VisitorChart from "@/component/admin/dashboard/VisitorChart";
import visitor from "@/data/visitor.json";
export default function AdminDashboard() {
  return (
    <>
      <div className="dashboardWrAP w-full p-4 flex justify-center items-center flex-col">
        <div className="w-full md:w-[80%] lg:w-[60%]">
          <h2 className="w-full py-8 text-[1.5rem] text-center">
            관리자 대시보드
          </h2>
          <VisitorChart data={visitor} />
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
