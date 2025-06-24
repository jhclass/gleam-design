"use client";
import { sectionState } from "@/atoms/mainSection";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { usePathname, useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const sectionsOffsetTop = useRecoilValue(sectionState);
  //console.log(pathName.split("/")[1]);
  const gnb_list = [
    {
      list_name: "Portfolio",
    },
    {
      list_name: "Partnership",
    },
    {
      list_name: "99.99% 만족도",
    },
    {
      list_name: "Contact",
    },
  ];
  const admin_gnb_list = [
    {
      list_name: "Home(Dashboard)",
      path: "/admin/dashboard",
    },
    {
      list_name: "Contact List",
      path: "/admin/contact",
    },
    {
      list_name: "Board",
      path: "/admin/board",
    },
    {
      list_name: "SMS",
      path: "/admin/sms",
    },
    {
      list_name: "Login",
      path: "/admin/member/login",
    },
  ];
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const [isfixed, setIsFixed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleEvent = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleEvent);

    return () => window.removeEventListener("scroll", handleEvent);
  }, []);

  const scrollToSection = (index: number) => {
    const headerHeight = document.getElementById("header")?.offsetHeight || 0;

    if (window.scrollY > 50) {
      window.scrollTo({
        top: sectionsOffsetTop?.sections[index].top - headerHeight,
        behavior: "smooth",
      });
      setActiveNavIndex(index);
      setIsMobileNavOpen(false);
    } else {
      window.scrollTo({
        top: sectionsOffsetTop?.sections[index].top - headerHeight * 2,
        behavior: "smooth",
      });
      setActiveNavIndex(index);
      setIsMobileNavOpen(false);
    }
  };

  return (
    <header
      id="header"
      className={`bg-[#0D37AA] text-gray-200 p-4 w-full top-0 flex justify-between max-w-[1920px] mx-auto ${
        isfixed && `fixed z-50`
      }  `}
    >
      <h1
        className="text-xl font-bold cursor-pointer hover:text-white"
        onClick={() =>
          pathName.split("/")[1] === "admin"
            ? router.push("/admin/dashboard")
            : router.push("/")
        }
      >
        {pathName.split("/")[1] === "admin" ? "Admin" : "Gleam IT Design"}
      </h1>
      <ul id="pc-nav" className="hidden md:flex ml-10">
        {pathName.split("/")[1] !== "admin"
          ? gnb_list.map((list, index) => (
              <li
                key={index}
                className={`px-5 hover:text-white cursor-pointer font-bold ${
                  activeNavIndex == index ? "text-white" : "text-gray-400"
                }`}
                onClick={() => {
                  scrollToSection(index);
                }}
              >
                {list.list_name}
              </li>
            ))
          : admin_gnb_list.map((list, index) => (
              <li
                key={index}
                className={`px-5 hover:text-white cursor-pointer font-bold ${
                  activeNavIndex == index ? "text-white" : "text-gray-400"
                }`}
                onClick={() => {}}
              >
                {list.list_name}
              </li>
            ))}
      </ul>
      <div
        id="gnb-sm-area"
        className="flex justify-center items-center text-3xl sm:hidden w-10 h-10"
        onClick={() => setIsMobileNavOpen(true)}
      >
        <span className="xi-bars"></span>
      </div>
      <nav
        id="mobile-nav"
        className={`fixed top-0 left-0 w-full h-full z-[9999] bg-gray-700 sm:hidden transform transition-transform duration-300 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute top-5 right-5 w-10 h-10 flex justify-center items-center"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <span className="text-[2vh] underline">Close</span>
        </div>
        <ul id="mo-nav" className="flex flex-col ml-1 sm:hidden text-3xl mt-24">
          {pathName.split("/")[1] !== "admin"
            ? gnb_list.map((list, index) => (
                <li
                  key={index}
                  className={`p-5 hover:text-white cursor-pointer  font-bold ${
                    activeNavIndex == index ? "text-white" : "text-gray-400"
                  }`}
                  onClick={() => {
                    scrollToSection(index);
                  }}
                >
                  {list.list_name}
                </li>
              ))
            : admin_gnb_list.map((list, index) => (
                <li
                  key={index}
                  className={`p-5 hover:text-white cursor-pointer  font-bold ${
                    activeNavIndex == index ? "text-white" : "text-gray-400"
                  }`}
                  onClick={() => {
                    router.push(list.path);
                  }}
                >
                  {list.list_name}
                </li>
              ))}
        </ul>
      </nav>
    </header>
  );
}
