import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Script } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export type KakaoVariable = {
  Kakao: {
    Channel: {
      chat: ({ channelPublicId }: { channelPublicId: string }) => void;
    };
    init: (key: string) => void;
    isInitialized: () => boolean;
  };
};
const KakaoChatButton = () => {
  const kakaoChatBtn = useRef<HTMLButtonElement>(null!);
  useEffect(() => {
    const { current } = kakaoChatBtn;
    const windowWithKakao = window as typeof window & KakaoVariable;
    const chatChannel = () => {
      if (!windowWithKakao.Kakao || !process.env.GATSBY_KAKAO_KEY) return;

      const { Kakao } = windowWithKakao;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.GATSBY_KAKAO_KEY);
      }
      if (Kakao.Channel && current) {
        Kakao.Channel.chat({
          channelPublicId: "_vlXxcb",
        });
      }
    };
    current?.addEventListener("click", chatChannel);
    return () => {
      current?.removeEventListener("click", chatChannel);
    };
  }, []);
  return (
    <React.Fragment>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
      ></Script>
      <button
        ref={kakaoChatBtn}
        css={css`
          position: fixed;
          z-index: 3;
          background-color: yellow;
          cursor: pointer;
          border-radius: 10px;
          border: none;
          width: 5rem;
          height: 5rem;
          right: 2.5rem;
          bottom: 12rem;
          transition: all 0.4s ease-in-out;
          @media (max-width: 992px) {
            width: 3rem;
            height: 3rem;
            right: 2rem;
            bottom: 10rem;
          }
          @media (max-width: 499px) {
            width: 2.6rem;
            height: 2.6rem;
            right: 1.2rem;
            bottom: 6.2rem;
          }
        `}
      >
        <StaticImage
          src="../../static/img/chat.png"
          alt="카카오톡 채널 채팅하기 버튼"
          title="카카오톡 채널 채팅"
        />
      </button>
    </React.Fragment>
  );
};

export default KakaoChatButton;
