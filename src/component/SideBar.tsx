"use client";
import { scrollToTop } from "../../utils/sum";
export default function SideBar() {
  return (
    <aside className="bg-[#0D37AA] rounded-lg fixed bottom-20 right-4 z-50 shadow-md">
      <ul className="space-y-2">
        <li className="p-2 text-gray-300 text-4xl lg:text-5xl flex justify-center items-center hover:bg-[#214DC5] hover:text-[#000000] hover:cursor-pointer rounded">
          <span className="xi-kakaotalk"></span>
        </li>
        <li
          className="p-2 text-gray-300 text-3xl lg:text-5xl flex justify-center items-center hover:bg-[#214DC5] hover:text-[#000000] hover:cursor-pointer rounded"
          onClick={scrollToTop}
        >
          <span className="xi-angle-up"></span>
        </li>
      </ul>
    </aside>
  );
}
