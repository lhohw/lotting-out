import React, { useRef, useCallback } from "react";
import { css } from "@emotion/react";
import { RiHealthBookFill } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import { StaticImage } from "gatsby-plugin-image";
import ControlButton from "../components/ControlButton";
import Modal from "../components/Modal";
import useModal from "../utils/hooks/useModal";
import useDeviceDetect from "../utils/hooks/useDeviceDetect";
import DarkModeButton from "../components/DarkModeButton";

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
  const { isMobile, isTouch, common } = useDeviceDetect();

  const callBtn = useRef<HTMLButtonElement>(null!);
  const { showModal } = useModal();

  const chatChannel = useCallback(() => {
    const windowWithKakao = globalThis as typeof globalThis & KakaoVariable;
    if (!process.env.GATSBY_KAKAO_KEY || !windowWithKakao.Kakao) return;

    const { Kakao } = windowWithKakao;
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.GATSBY_KAKAO_KEY);
    }
    if (Kakao.Channel && process.env.GATSBY_KAKAO_CHANNEL_ID) {
      Kakao.Channel.chat({
        channelPublicId: process.env.GATSBY_KAKAO_CHANNEL_ID,
      });
      return;
    }
  }, []);
  const call = useCallback(() => {
    if (!isMobile) {
      showModal({
        focus: () => callBtn.current.focus(),
        title: "이용 불가",
        // content: `전화 상담을 연결할 수 없는 기기입니다.\n상담을 원하실 경우 다음 번호로 연락 바랍니다.\n${phoneNumber}`,
        // @ts-ignore
        content: `${window.navigator.userAgent}\n${window.navigator.userAgentData}\nisMobile: ${isMobile}\nisTouch: ${isTouch}\ncommon: ${common}\norientation: ${window.screen.orientation}`,
      });
      return;
    }
    return (document.location.href = `tel:+82-${phoneNumber}`);
  }, [isMobile, phoneNumber, showModal, isTouch, common]);
  return (
    <React.Fragment>
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
        <DarkModeButton />
        <ControlButton
          isLink
          to="info/register"
          type="icon"
          Icon={RiHealthBookFill}
          title="관심고객등록"
        />
        <ControlButton
          type="component"
          css={css`
            & > span:nth-of-type(1) {
              background-color: yellow;
            }
          `}
          Component={
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
              placeholder="blurred"
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
      <Modal />
    </React.Fragment>
  );
};

export default ControlButtonContainer;
