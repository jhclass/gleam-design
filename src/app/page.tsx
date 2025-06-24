"use client";
import { sectionState } from "@/atoms/mainSection";
import SectionTopAnimation from "@/component/animation/SectionTopAnimation";
import Contact from "@/component/Contact";
import MainSlider from "@/component/MainSlider";
import Image from "next/image";
import PartnersSlider from "@/component/PartnersSlider";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

export default function Home() {
  const setSectionTop = useSetRecoilState(sectionState);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const updateSectionTops = () => {
      const newPositions = sectionRefs.current.map((section) =>
        section
          ? { top: section.getBoundingClientRect().top + window.scrollY }
          : { top: 0 }
      );

      setSectionTop({ sections: newPositions });
    };
    window.addEventListener("scroll", updateSectionTops);
    window.addEventListener("resize", updateSectionTops);

    updateSectionTops();

    return () => {
      window.removeEventListener("scroll", updateSectionTops);
      window.removeEventListener("resize", updateSectionTops);
    };
  }, [setSectionTop]);
  return (
    <>
      <MainSlider />
      <section
        id="main-section1"
        className="flex justify-center relative z-10"
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
      >
        {/* 배경에서 움직이는 SVG 파동 */}
        <SectionTopAnimation firstColor="#6B49CA" secondColor="#486AC7" />
        <div className="w-full  flex py-24 flex-col items-center relative z-20">
          <h2 className="px-2 text-center font-bold text-[3vh] md:text-[4vh]">
            글림디자인을 소개합니다.
          </h2>
          <span className="px-2 text-center mt-5">
            글림디자인이 하면 확실하게 다릅니다.
          </span>
          <div className="w-full mt-10">
            <Image
              src="/images/pexels-kaboompics-6224.jpg"
              alt="image"
              width={0}
              height={0}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      <section
        id="main-section2"
        className="flex justify-center relative z-10"
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
      >
        {/* 배경에서 움직이는 SVG 파동 */}
        <SectionTopAnimation firstColor="#6B49CA" secondColor="#486AC7" />
        <div className="w-full  flex py-24 flex-col items-center relative z-20">
          <h2 className="px-2 text-center font-bold text-[3vh] md:text-[4vh]">
            글림디자인은 믿고 맡길 수 있습니다.
          </h2>
          <span className="px-2 text-center mt-5">
            2017년 이후로 수 많은 파트너사 와 함께 하였습니다.
          </span>
          <div className="w-full mt-10">
            <PartnersSlider />
          </div>
        </div>
      </section>
      <section
        id="main-section3"
        className="flex justify-center relative z-10"
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
      >
        {/* 배경에서 움직이는 SVG 파동 */}
        <SectionTopAnimation firstColor="#6B49CA" secondColor="#486AC7" />
        <div className="w-full flex py-24 flex-col items-center relative z-20">
          <h2 className="px-2 text-center font-bold text-[3vh] md:text-[4vh]">
            평균 만족율 99% , 평점 4.99/5
          </h2>
          <span className="px-2 text-center mt-5">
            크몽, 스마트스토어(NAVER)
          </span>
          <div className="w-full mt-10">
            <Image
              src="/images/pexels-cottonbro-3171837.jpg"
              alt="image"
              width={0}
              height={0}
              className="w-full h-auto hidden md:block"
            />
          </div>
        </div>
      </section>
      <section
        id="main-section4"
        className="flex justify-center relative z-10"
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
      >
        {/* 배경에서 움직이는 SVG 파동 */}
        <SectionTopAnimation firstColor="#6B49CA" secondColor="#486AC7" />
        <div className="w-full lg:w-4/5  flex py-24 flex-col items-center relative z-20">
          <h2 className="px-2 text-center font-bold text-[3vh] md:text-[4vh]">
            Contact
          </h2>
          <span className="px-2 text-center mt-5">
            글림디자인은 고객사의 성공을 위해 함께 고민합니다. <br />
            편하게 문의주시기 바랍니다.
          </span>
          <Contact />
        </div>
      </section>
    </>
  );
}
