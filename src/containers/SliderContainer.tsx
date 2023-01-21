import type { SliderState } from "../recoil/slider/atom";
import React, { useCallback, useRef, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { sliderState } from "../recoil/slider";
import Slider, { SliderProps } from "../components/Slider";
import produce from "immer";
import { HeaderState, headerState as hs } from "../recoil/header";
import useDeviceDetect from "../utils/hooks/useDeviceDetect";

export type SliderData = {
  imageInfos: SliderProps["imageInfos"];
  apartment: SliderProps["apartment"];
  short: SliderProps["short"];
  isPreview?: boolean;
};
const SliderContainer = ({
  imageInfos,
  apartment,
  short,
  isPreview = false,
}: SliderData) => {
  const { isMobile } = useDeviceDetect();
  const [state, setState] = useRecoilState<SliderState>(sliderState);
  const [headerState, setHeaderState] = useRecoilState<HeaderState>(hs);

  const timer = useRef(Date.now());
  const flag = useRef(1);
  const prev = useRef(0);
  const prevTouchX = useRef(0);
  const prevTouchY = useRef(0);
  const slider = useRef<HTMLDivElement>(null!);
  const wrapper = useRef<HTMLDivElement>(null!);
  const threshold = useMemo(() => 50, []);

  const handleIndex = useCallback<SliderProps["handleIndex"]>(
    (idx) => {
      slider.current.style.transition = "transform 0.4s ease-in-out";
      const nextState = produce(state, (draft) => {
        const nextIdx = Math.min(Math.max(0, idx), imageInfos.length - 1);
        draft.idx = nextIdx;
        prev.current =
          -wrapper.current.getClientRects()[0].width * (nextIdx + 1);
      });
      setState(nextState);
    },
    [imageInfos.length, setState, state]
  );
  const getTransform = useCallback((target: HTMLElement) => {
    const transform = target.style.transform;
    return -transform.match(/\d+/)![0];
  }, []);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (timer.current + 1000 / 60 > Date.now()) return;
      const width = wrapper.current.getClientRects()[0].width;
      const x = getTransform(slider.current);
      let nextX = x + (e.movementX / 3) * 2;
      if (state.idx === 0) {
        if (flag.current === 1) {
          if (nextX >= -width + threshold) {
            nextX -= width * imageInfos.length;
            flag.current = -1;
          }
        } else if (
          flag.current === -1 &&
          nextX <= -width * imageInfos.length - (width - threshold)
        ) {
          nextX += width * imageInfos.length;
          flag.current = 1;
        }
      } else if (state.idx === imageInfos.length - 1) {
        if (flag.current === 1) {
          if (nextX <= -width * imageInfos.length - threshold) {
            nextX += width * imageInfos.length;
            flag.current = -1;
          }
        } else if (flag.current === -1 && nextX >= -threshold) {
          nextX -= width * imageInfos.length;
          flag.current = 1;
        }
      }
      slider.current.style.transform = `translateX(${nextX}px)`;
      timer.current = Date.now();
    },
    [getTransform, imageInfos.length, state.idx, threshold]
  );
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (timer.current + 1000 / 60 > Date.now()) return;
      const width = wrapper.current.getClientRects()[0].width;
      const x = getTransform(slider.current);
      const y = prevTouchY.current || e.touches[0].pageY;
      let nextX = x + (e.touches[0].pageX - prevTouchX.current);

      const dy = e.touches[0].pageY - y;
      const dx = nextX - x;
      prevTouchY.current = y + dy;
      if (Math.abs(dx) < 5 || Math.abs(dy) >= 3) {
        prevTouchX.current = e.touches[0].pageX;
        timer.current = Date.now();
        return;
      }
      if (state.idx === 0) {
        if (flag.current === 1) {
          if (nextX >= -width + threshold) {
            nextX -= width * imageInfos.length;
            flag.current = -1;
          }
        } else if (
          flag.current === -1 &&
          nextX <= -width * imageInfos.length - (width - threshold)
        ) {
          nextX += width * imageInfos.length;
          flag.current = 1;
        }
      } else if (state.idx === imageInfos.length - 1) {
        if (flag.current === 1) {
          if (nextX <= -width * imageInfos.length - threshold) {
            nextX += width * imageInfos.length;
            flag.current = -1;
          }
        } else if (flag.current === -1 && nextX >= -threshold) {
          nextX -= width * imageInfos.length;
          flag.current = 1;
        }
      }
      slider.current.style.transform = `translateX(${nextX}px)`;
      prevTouchX.current = e.touches[0].pageX;
      timer.current = Date.now();
    },
    [getTransform, state.idx, imageInfos.length, threshold]
  );
  const onTouchStart = useCallback<SliderProps["onTouchStart"]>(
    (e) => {
      if (headerState.isOpen) setHeaderState({ ...headerState, isOpen: false });
      const target = e.target as HTMLElement;
      if (!target || target.tagName !== "DIV") return;
      prevTouchX.current = e.touches[0].pageX;
      prev.current =
        -wrapper.current.getClientRects()[0].width * (state.idx + 1);
      slider.current.style.transition = "none";
      wrapper.current.addEventListener("touchmove", onTouchMove);
    },
    [onTouchMove, state.idx, headerState, setHeaderState]
  );
  const onTouchEnd = useCallback<SliderProps["onTouchEnd"]>(() => {
    const prevX = prev.current;
    const width = wrapper.current.getClientRects()[0].width;
    wrapper.current.removeEventListener("touchmove", onTouchMove);

    const x = getTransform(slider.current);
    const gap = prevX - x;
    if (gap === 0) return;

    let nextIdx = Math.round((-x - width) / width);
    if (Math.abs(gap) >= threshold) {
      const sign = gap > 0 ? 1 : -1;
      if (state.idx === 0) {
        if (gap > width) nextIdx = imageInfos.length - 1;
        else nextIdx++;
      } else if (state.idx === imageInfos.length - 1) {
        if (gap < -width) nextIdx = 0;
        else nextIdx--;
      } else nextIdx += sign;
    }
    slider.current.style.transform = `translateX(${-width * (nextIdx + 1)}px)`;
    slider.current.style.transition = "transform 0.4s ease-in-out";
    flag.current = 1;
    prev.current = -width * (nextIdx + 1);
    handleIndex(nextIdx);
  }, [
    getTransform,
    handleIndex,
    imageInfos.length,
    onTouchMove,
    state.idx,
    threshold,
  ]);

  const onMouseDown = useCallback<SliderProps["onMouseDown"]>(
    (e) => {
      const target = e.target as HTMLElement;
      if (!target || target.tagName !== "DIV") return;
      prev.current =
        (state.idx + 1) * -wrapper.current.getClientRects()[0].width;
      wrapper.current.style.cursor = "grab";
      slider.current.style.transition = "none";
      wrapper.current.addEventListener("mousemove", onMove);
    },
    [onMove, state.idx]
  );
  const onMouseUp = useCallback<SliderProps["onMouseUp"]>(() => {
    const prevX = prev.current;
    const width = wrapper.current.getClientRects()[0].width;
    wrapper.current.style.cursor = "default";
    wrapper.current.removeEventListener("mousemove", onMove);
    const x = getTransform(slider.current);
    const gap = prevX - x;
    if (gap === 0) return;

    let nextIdx = Math.round((-x - width) / width);
    if (Math.abs(gap) >= threshold) {
      const sign = gap > 0 ? 1 : -1;
      if (state.idx === 0) {
        if (gap > width) nextIdx = imageInfos.length - 1;
        else nextIdx++;
      } else if (state.idx === imageInfos.length - 1) {
        if (gap < -width) nextIdx = 0;
        else nextIdx--;
      } else nextIdx += sign;
    }
    slider.current.style.transform = `translateX(${-width * (nextIdx + 1)}px)`;
    slider.current.style.transition = "transform 0.4s ease-in-out";
    flag.current = 1;
    prev.current = -width * (nextIdx + 1);
    handleIndex(nextIdx);
  }, [
    onMove,
    getTransform,
    threshold,
    handleIndex,
    state.idx,
    imageInfos.length,
  ]);

  const onSelect = useCallback<SliderProps["onSelect"]>(
    (e) => e.preventDefault(),
    []
  );
  useEffect(() => {
    prev.current = -wrapper?.current.getClientRects()[0].width || 0;
    setState({ ...state, idx: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const onResize = () => {
      slider.current.style.transition = "none";
      const { width } = wrapper.current.getClientRects()[0];
      slider.current.style.width = `${width * (imageInfos.length + 2)}px`;
      const nextX = -width * (state.idx + 1);
      slider.current.style.transform = `translateX(${nextX}px)`;
      prev.current = nextX;
    };
    if (!isMobile) window.addEventListener("resize", onResize);
    const resizer = document.querySelector(".Resizer.vertical");
    const onResizerPush = () => {
      window.addEventListener("mousemove", onResize);
    };
    const onResizerPull = () => {
      window.removeEventListener("mousemove", onResize);
    };
    if (isPreview && resizer) {
      resizer.addEventListener("mousedown", onResizerPush);
      resizer.addEventListener("mouseup", onResizerPull);
    }
    return () => {
      if (!isMobile) window.removeEventListener("resize", onResize);
      if (isPreview && resizer) {
        resizer.removeEventListener("mousedown", onResizerPush);
        resizer.removeEventListener("mouseup", onResizerPull);
      }
    };
  }, [state.idx, imageInfos.length, isMobile, isPreview]);
  return (
    <Slider
      slider={slider}
      wrapper={wrapper}
      apartment={apartment}
      short={short}
      idx={state.idx}
      imageInfos={imageInfos}
      handleIndex={handleIndex}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onSelect={onSelect}
    />
  );
};

export default SliderContainer;
