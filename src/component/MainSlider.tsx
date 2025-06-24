"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { motion } from "framer-motion";
export default function MainSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideList = [
    {
      id: 1,
      bigText: "1번 슬라이드",
      smallText: "1번 슬라이드 입니다.",
    },
    {
      id: 2,
      bigText: "2번 슬라이드",
      smallText: "2번 슬라이드 입니다.",
    },
    {
      id: 3,
      bigText: "3번 슬라이드",
      smallText: "3번 슬라이드 입니다.",
    },
  ];
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full h-screen max-h-[80vh] p-0 m-0"
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slideList.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center h-full bg-blue-500  text-white text-2xl font-bold"
          >
            {/* <div className="flex justify-center items-center h-full">
              {index + 1}번째 슬라이드 <br /> {index + 1}번째 슬라이드
            </div> */}
            <motion.div
              initial={{ opacity: 0, y: 180 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0, // ✅ 현재 활성화된 슬라이드에서만 나타남
                y: activeIndex === index ? 0 : 180, // ✅ 아래에서 위로 올라오는 애니메이션
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center h-full bg-blue-500  text-white text-2xl font-bold"
            >
              <h2 className="text-4xl font-bold px-4">{slide.bigText}</h2>
              <p className="mt-2 text-lg px-4">
                이 슬라이드는 {slide.smallText}번 슬라이드입니다.
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
