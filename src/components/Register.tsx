import type { Question as QuestionType } from "../widgets/Question";
import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";
import Input from "./Input";
import Question from "./Question";
import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";
import Agreement from "./Agreement";
import Modal from "./Modal";
import useDeviceDetect from "../utils/hooks/useDeviceDetect";

export type Value = {
  [key: string]: string;
};
export type Info = {
  title: string;
  name: string;
};
export type RegisterProps = {
  info: Info[];
  state: {
    value: Value;
    agreement: Record<"marketing" | "termsAndConditions", boolean>;
  };
  backgroundImage: PreviewCompatibleImageData;
  questions: QuestionType[];
  submitButtonRef: React.RefObject<HTMLButtonElement>;
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick: (title: keyof RegisterProps["state"]["agreement"]) => void;
  checkValidity: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Register = ({
  info,
  state,
  questions,
  backgroundImage,
  submitButtonRef,
  onChange,
  onSubmit,
  onClick,
  checkValidity,
}: RegisterProps) => {
  const colors = useColors();
  const { isTouch } = useDeviceDetect();
  const { value, agreement } = state;
  return (
    <React.Fragment>
      <div
        css={css`
          display: flex;
          width: 100%;
          flex-direction: column;
          position: relative;
        `}
      >
        <PreviewCompatibleImage
          aria-hidden={true}
          css={css`
            position: absolute;
          `}
          imageInfo={backgroundImage}
        />
        <div
          css={css`
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 100%;
            z-index: 1;
          `}
        >
          <div
            css={css`
              display: flex;
              flex: 1;
              flex-direction: column;
              max-width: min(100%, 500px);
              margin: 0 auto;
              overflow-x: hidden;
            `}
          >
            <h1
              css={css`
                color: ${colors.main};
                text-shadow: 1px 1px 3px ${colors.gold};
                font-size: 2.2rem;
                margin-left: 1.5rem;
                margin-right: 0;
                padding: 0;
                @media (max-width: 600px) {
                  margin: 2.5rem auto 1.5rem auto;
                }
              `}
            >
              Find Out More
            </h1>
            <form
              css={css`
                display: flex;
                flex-direction: column;
                border-radius: 8px;
                padding: 0.5rem;
                margin-bottom: 2rem;
              `}
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
              onChange={onChange}
            >
              {info.map(({ name, title }) => (
                <Input
                  key={name}
                  title={title}
                  name={name}
                  value={value[name]}
                  placeholder={
                    name === "phoneNumber" ? "숫자만 입력해 주세요" : ""
                  }
                  onChange={checkValidity}
                  inputMode={
                    name === "name"
                      ? "text"
                      : name === "email"
                      ? "email"
                      : name === "phoneNumber"
                      ? "tel"
                      : undefined
                  }
                />
              ))}
              {questions.map(({ question, answers }, idx) => (
                <Question
                  key={question}
                  value={value[idx]}
                  question={question}
                  name={idx.toString()}
                  answers={answers}
                />
              ))}
              <Agreement
                css={css`
                  margin: 1.5rem 0 0.8rem 0;
                  border-radius: 8px;
                `}
                size={30}
                checked={agreement.marketing}
                onClick={() => onClick("marketing")}
                title="마케팅 수신 동의"
                content="<상품정보 제공, 이벤트 안내, 고객혜택 등 다양한 정보를 제공합니다.>"
              />
              <Agreement
                css={css`
                  border-radius: 8px;
                `}
                size={30}
                checked={agreement.termsAndConditions}
                onClick={() => onClick("termsAndConditions")}
                title="개인정보 수집 및 이용 동의"
                content={`관심고객등록 개인정보 수집동의 내용 공유드립니다.
              < 개인정보 수집 및 이용에 대한 안내 >
              '주식회사 트레이서', '주식회사 미래개발2', ‘주식회사 미래인' (이하 회사) 은 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다. 회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              고객님은 개인정보 수집 및 이용 동의에 거부하실 수 있습니다. 다만, 필수항목 동의를 거부하실 경우 관심고객등록이 제한됩니다.
              1. 수집/이용 목적 : 예약,문의 등 고객요청 처리 및 결과 회신
              2. 수집하는 항목 : 이름, 연락처 등
              3. 보유 / 이용 기간 : 분양 종료 후 즉시 파기
              4. 동의를 거부할 수 있으며, 거부시 이용이 제한될 수 있습니다.

              *개인정보 수집 및 이용 동의서*
              갤러리 및 견본주택 방문 안내와 방문 예약등 문의 사항을 위하여 아래와 같이 개인정보 수집 및 이용하고자 합니다.
              
              1. 개인정보의 수집/이용목적
              -수집한 개인정보는 본인확인 및 "주소문자전송","방문예약","문의사항안내" 등의 요청사항 처리를 위해 활용합니다.
              2. 수집하려는 개인정보의 항목
              -수집하는 개인정보의 항목: 이름, 연락처 등
              3. 개인정보의 보유 및 이용기간
              -수집한 개인정보는 수집 및 이용목적이 달성된 후에는 해당정보를 파기합니다.
              4. 개인정보 제공 및 공유
              -신청자가 제공한 모든 정보는 상기 목적에 필요한 용도 이외로는 사용되지 않으며 이용목적이 변경될 시에는 사전 동의를 구할 것입니다.
              5. 개인정보의 수집,이용에 관한 동의 거부
              -개인정보 수집,이용 동의를 거부할 수 있으나, 동의하지 않을 경우에는 "주소문자전송","방문예약","문의사항안내" 등의 제공이 제한 될 수 있습니다.
              
              <개인정보 제 3자 제공 동의>
              다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
              
              1. 개인정보를 제공받는 자 : '주식회사 트레이서', '주식회사 미래개발2', ‘주식회사 미래인'
              2. 제공받는 자의 개인정보 이용목적 : 이벤트 등 업무 제휴 및 신규 분양 예정 상품 안내
              3. 제공하는 개인정보 항목 : 성명, 주소, 이메일, 전화번호 등
              4. 제공받는 자의 보유 및 이용기간 : 이용목적 달성 혹은 개인정보 제3자 제공 철회 시까지`}
              />
              <button
                ref={submitButtonRef}
                type="submit"
                aria-haspopup="dialog"
                css={css`
                  margin-top: 1rem;
                  padding: 0.8rem 0;
                  font-size: 0.9rem;
                  background-color: ${colors.dark + "dd"};
                  color: #fefefedd;
                  border-radius: 8px;
                  border: 2px solid ${colors.widgetBorder};
                  transition: all 0.3s ease-in-out;
                  cursor: pointer;
                  ${!isTouch
                    ? `
                    &:hover {
                      color: ${colors.gold};
                      border-color: ${colors.gold};
                      font-weight: bold;
                    }
                    `
                    : `
                      color: ${colors.gold};
                      border-color: ${colors.gold};
                    `}
                `}
              >
                제출
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal />
    </React.Fragment>
  );
};

export default Register;
