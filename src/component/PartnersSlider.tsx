import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function PartnersSlider() {
  //브라우저 사이즈 width 구분
  const useWindowWidth = () => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
  };
  const browserWidth = useWindowWidth();
  return (
    <div className={`w-[120%] ${browserWidth < 768 ? "ml-[0]" : "ml-[-10%]"}`}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView={browserWidth < 768 ? 3 : 5}
        loop={true}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"https://picsum.photos/300/200"}
            width={300}
            height={200}
            style={{ width: "100%", height: "auto" }}
            alt="슬라이더 이미지"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
