import { useEffect } from "react";
import { deviceState as ds } from "../recoil/deviceDetect";
import { useRecoilState } from "recoil";

import { checkTouch, checkMobile } from "../utils";

const useDeviceState = () => {
  const [{ isMobile, isTouch, isInitialized }, setDeviceState] =
    useRecoilState(ds);

  useEffect(() => {
    if (isInitialized) return;
    const windowWith = globalThis as typeof globalThis & {
      opera: string;
      navigator: {
        userAgentData?: {
          mobile: boolean;
        };
      };
    };
    const isMobile =
      checkMobile(
        windowWith.navigator.userAgent ||
          windowWith.navigator.vendor ||
          windowWith.opera
      ) || Boolean(windowWith.navigator.userAgentData?.mobile);
    const isTouch =
      checkTouch(
        windowWith.navigator.userAgent ||
          windowWith.navigator.vendor ||
          windowWith.opera
      ) || Boolean(windowWith.navigator.userAgentData?.mobile);

    setDeviceState({
      isInitialized: true,
      isMobile,
      isTouch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMobile,
    isTouch,
    isInitialized,
  };
};

export default useDeviceState;
