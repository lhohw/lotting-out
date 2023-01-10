import { useState, useEffect } from "react";

export type DeviceState = {
  isTouch: boolean;
  isMobile: boolean;
};
const useDeviceDetect = () => {
  const [deviceType, setDeviceType] = useState<DeviceState>({
    isTouch: false,
    isMobile: false,
  });
  useEffect(() => {
    let isTouch = false,
      isMobile = false;
    const { matchMedia } = window;
    const navigator = window.navigator as typeof window.navigator & {
      userAgentData: { isMobile: boolean };
    };
    const { userAgent } = navigator;
    if (navigator.userAgentData?.isMobile) {
      isTouch = isMobile = true;
      setDeviceType({ isTouch, isMobile });
      return;
    }
    isTouch = isMobile =
      navigator?.maxTouchPoints > 1 || matchMedia("(pointer: coarse)").matches;
    isTouch =
      isTouch ||
      !!userAgent.match(
        /BlackBerry|webOS|(i)?Phone|Mobile|Android|iPad|Touch|Windows Phone|IEMobile/i
      );
    if (matchMedia("(pointer: fine)").matches) isMobile = false;
    isMobile =
      isMobile ||
      !!userAgent.match(
        /BlackBerry|(i)?Phone|Mobile|Android|Windows Phone|IEMobile/i
      );
    if (!("ontouchstart" in document.documentElement))
      isTouch = isMobile = false;
    setDeviceType({ isTouch, isMobile });
  }, [setDeviceType]);
  return {
    ...deviceType,
  };
};

export default useDeviceDetect;
