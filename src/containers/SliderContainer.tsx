import type { SliderState } from "../recoil/slider/atom";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { sliderState } from "../recoil/slider";
import Slider from "../components/Slider";
import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";

export type SliderData = {
  imageInfos: PreviewCompatibleImageData[];
};
const SliderContainer = ({ imageInfos }: SliderData) => {
  const [state, setState] = useRecoilState<SliderState>(sliderState);

  const handleIndex = useCallback(
    (idx: number) => {
      setState({
        ...state,
        idx: Math.min(Math.max(0, idx), imageInfos.length - 1),
      });
    },
    [imageInfos.length, setState, state]
  );

  return (
    <Slider idx={state.idx} imageInfos={imageInfos} handleIndex={handleIndex} />
  );
};

export default SliderContainer;
