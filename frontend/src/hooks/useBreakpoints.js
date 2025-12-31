import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../utils/constants";

const useBreakpoints = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: screenWidth < BREAKPOINTS.tablet,
    isTablet:
      screenWidth >= BREAKPOINTS.tablet && screenWidth < BREAKPOINTS.desktop, // >=768 <1024
    isDesktop: screenWidth >= BREAKPOINTS.desktop,
  };
};

export default useBreakpoints;
