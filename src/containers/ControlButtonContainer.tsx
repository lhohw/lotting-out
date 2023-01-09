import React, { useRef, useCallback } from "react";
import { css } from "@emotion/react";
import { RiHealthBookFill } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import { StaticImage } from "gatsby-plugin-image";
import { Script } from "gatsby";
import { useRecoilState } from "recoil";
import ControlButton from "../components/ControlButton";
import Modal, { ModalProps } from "../components/Modal";
import { ModalState, modalState as ms } from "../recoil/modal";
import useModal from "../utils/hooks/useModal";
import { isDesktop } from "react-device-detect";

export type KakaoVariable = {
  Kakao: {
    Channel: {
      chat: ({ channelPublicId }: { channelPublicId: string }) => void;
    };
    init: (key: string) => void;
    isInitialized: () => boolean;
  };
};
export type ControlButtonContainerProps = {
  phoneNumber: string;
};
const ControlButtonContainer = ({
  phoneNumber,
}: ControlButtonContainerProps) => {
  const callBtn = useRef<HTMLButtonElement>(null!);
  const { showModal, hideModal } = useModal();
  const [modalState] = useRecoilState<ModalState>(ms);

  const chatChannel = useCallback(() => {
    const windowWithKakao = globalThis as typeof globalThis & KakaoVariable;
    if (!process.env.GATSBY_KAKAO_KEY) {
      console.log("key is not defined");
      return;
    }
    if (!windowWithKakao.Kakao) {
      console.log("Kakao CDN is not loaded");
      return;
    }

    const { Kakao } = windowWithKakao;
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.GATSBY_KAKAO_KEY);
    }
    if (Kakao.Channel) {
      Kakao.Channel.chat({
        channelPublicId: "_vlXxcb",
      });
      return;
    }
    console.log("Kakao channel is not defined");
  }, []);
  const onModalButtonClick = useCallback<ModalProps["onClick"]>(
    (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "DIALOG" || target.tagName === "BUTTON") {
        hideModal();
        if (callBtn.current) setTimeout(() => callBtn.current.focus(), 32);
      }
    },
    [hideModal]
  );
  const onModalKeyDown = useCallback<ModalProps["onKeyDown"]>(
    (e) => {
      if (e.key === "Tab") {
        const target = e.target as HTMLElement;
        if (e.shiftKey && target.tagName === "DIV") {
          e.preventDefault();
          return;
        }
        if (
          !e.shiftKey &&
          target.tagName === "BUTTON" &&
          target.dataset.idx === (modalState.buttons.length - 1).toString()
        ) {
          e.preventDefault();
          return;
        }
      } else if (e.key === "Escape") {
        hideModal();
        if (callBtn.current) setTimeout(() => callBtn.current.focus(), 32);
      }
    },
    [modalState.buttons.length, hideModal, callBtn]
  );
  const call = useCallback(() => {
    if (isDesktop) {
      showModal({
        title: "이용 불가",
        content: `전화 상담을 연결할 수 없는 기기입니다.\n상담을 원하실 경우 다음 번호로 연락 바랍니다.\n${phoneNumber}`,
        buttons: ["확인"],
      });
      return;
    }
    return (document.location.href = `tel:+82-${phoneNumber}`);
  }, [phoneNumber, showModal]);
  return (
    <React.Fragment>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
      ></Script>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 0.3rem;
          position: fixed;
          right: 1rem;
          bottom: 3rem;
          z-index: 3;
          @media (max-width: 400px) {
            right: 0.1rem;
            bottom: 1rem;
          }
        `}
      >
        <ControlButton
          isLink
          to="info/register"
          type="icon"
          Icon={RiHealthBookFill}
          title="관심고객등록"
        />
        <ControlButton
          type="image"
          css={css`
            & > span:nth-of-type(1) {
              background-color: yellow;
            }
          `}
          ImageComponent={
            <StaticImage
              css={css`
                width: 100%;
                height: 100%;
                border-radius: 50%;
              `}
              loading="eager"
              objectFit="contain"
              src="../../static/img/chat.png"
              alt="카카오톡 채널 채팅하기 버튼"
              title="카카오톡 채널 채팅"
            />
          }
          title="카카오톡 문의"
          onClick={chatChannel}
        />
        <ControlButton
          refProp={callBtn}
          type="icon"
          Icon={BiPhoneCall}
          title="상담 문의"
          onClick={call}
        />
      </div>
      <Modal onClick={onModalButtonClick} onKeyDown={onModalKeyDown} />
    </React.Fragment>
  );
};

export default ControlButtonContainer;
