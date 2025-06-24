"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
interface IColor {
  firstColor: string;
  secondColor: string;
}
export default function SectionTopAnimation({
  firstColor,
  secondColor,
}: IColor) {
  //선색상 지정

  const [screenWidth, setScreenWidth] = useState(1200);
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <div className="absolute -top-10 left-0 w-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${screenWidth} 150`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        opacity={0.5}
      >
        {/* 첫 번째 파동 (왼쪽 → 오른쪽) */}
        <motion.path
          d={`M0 50 Q ${screenWidth * 0.1} 50, ${screenWidth * 0.2} 100 T ${
            screenWidth * 0.4
          } 100 T ${screenWidth * 0.6} 100 T ${
            screenWidth * 0.8
          } 100 T ${screenWidth} 100`}
          stroke={firstColor}
          strokeWidth="4"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* 두 번째 파동 (오른쪽 → 왼쪽) */}
        <motion.path
          d={`M${screenWidth} 50 Q ${screenWidth * 0.9} 150, ${
            screenWidth * 0.8
          } 100 T ${screenWidth * 0.6} 100 T ${screenWidth * 0.4} 100 T ${
            screenWidth * 0.2
          } 100 T 0 100`}
          stroke={secondColor}
          strokeWidth="4"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
}
