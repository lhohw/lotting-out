import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import type { SliderState } from "../recoil/slider/atom";
import React, { useCallback, useRef, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { sliderState } from "../recoil/slider";
import Slider from "../components/Slider";
import produce from "immer";

export type SliderData = {
  imageInfos: PreviewCompatibleImageData[];
  apartment: string;
  short: string;
};
const SliderContainer = ({ imageInfos, apartment, short }: SliderData) => {
  const [state, setState] = useRecoilState<SliderState>(sliderState);

  const timer = useRef(Date.now());
  const flag = useRef(1);
  const prev = useRef(0);
  const slider = useRef<HTMLDivElement>(null!);
  const wrapper = useRef<HTMLDivElement>(null!);
  const threshold = useMemo(() => 100, []);

  const handleIndex = useCallback(
    (idx: number) => {
      slider.current.style.transition = "transform 0.4s ease-in-out";
      const nextState = produce(state, (draft) => {
        const nextIdx = Math.min(Math.max(0, idx), imageInfos.length - 1);
        draft.idx = nextIdx;
        prev.current = -wrapper.current.clientWidth * (nextIdx + 1);
      });
      setState(nextState);
    },
    [imageInfos.length, setState, state]
  );
  const getTransform = useCallback((target: HTMLElement) => {
    const transform = target.style.transform;
    let x = -transform.match(/\d+/)![0];
    if (transform.endsWith("vw)")) x *= wrapper.current.clientWidth / 100;
    return x;
  }, []);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (timer.current + 1000 / 60 > Date.now()) return;
      const width = wrapper.current.clientWidth;
      const x = getTransform(slider.current);
      let nextX = x + (e.movementX / 3) * 2;
      // let nextX = x + e.movementX * 2;
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

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.tagName !== "DIV") return;
      prev.current = (state.idx + 1) * -wrapper.current.clientWidth;
      wrapper.current.style.cursor = "grab";
      slider.current.style.transition = "none";
      wrapper.current.addEventListener("mousemove", onMove);
    },
    [onMove, state.idx]
  );
  const onMouseUp = useCallback(() => {
    const prevX = prev.current;
    const width = wrapper.current.clientWidth;
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

  const onSelectStart = useCallback((e: Event) => e.preventDefault(), []);
  useEffect(() => {
    prev.current = -wrapper?.current.clientWidth || 0;
  }, []);
  useEffect(() => {
    if (!wrapper?.current) return;
    if (!slider?.current) return;
    const onResize = (e: UIEvent) => {
      const target = e.target as EventTarget & { innerWidth: number };
      slider.current.style.transition = "none";
      slider.current.style.width = `${
        target.innerWidth * (imageInfos.length + 2)
      }px`;
      const nextX = -target.innerWidth * (state.idx + 1);
      slider.current.style.transform = `translateX(${nextX}px)`;
      prev.current = nextX;
    };
    const wp = wrapper.current;
    wp.addEventListener("mousedown", onMouseDown);
    wp.addEventListener("mouseup", onMouseUp);
    wp.addEventListener("mouseleave", onMouseUp);
    wp.addEventListener("selectstart", onSelectStart);
    window.addEventListener("resize", onResize);
    return () => {
      wp.removeEventListener("mousedown", onMouseDown);
      wp.removeEventListener("mouseup", onMouseUp);
      wp.removeEventListener("mouseleave", onMouseUp);
      wp.removeEventListener("selectstart", onSelectStart);
      window.removeEventListener("resize", onResize);
    };
  }, [onMouseDown, onMouseUp, onSelectStart, state.idx, imageInfos.length]);
  return (
    <Slider
      slider={slider}
      wrapper={wrapper}
      apartment={apartment}
      short={short}
      idx={state.idx}
      imageInfos={imageInfos}
      handleIndex={handleIndex}
    />
  );
};

export default SliderContainer;
