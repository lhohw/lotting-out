import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import React, { useCallback, useEffect, useMemo } from "react";
import Register from "../components/Register";
import { registerState, RegisterState } from "../recoil/register";
import { useRecoilState } from "recoil";
import produce from "immer";

export type RegisterContainerProps = {
  backgroundImage: PreviewCompatibleImageData;
};
const RegisterContainer = ({ backgroundImage }: RegisterContainerProps) => {
  const [state, setState] = useRecoilState<RegisterState>(registerState);
  useEffect(() => {
    return () => {
      setState({
        name: "",
        phoneNumber: "",
        email: "",
        priority: "",
        intention: "",
        purpose: "",
      });
    };
  }, [setState]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      const nextState = produce(state, (draft) => {
        draft[e.target.name as keyof RegisterState] = e.target.value;
      });
      setState(nextState);
    },
    [setState, state]
  );
  const onSubmit = useCallback(() => {
    alert("제출하시겠습니까 ?");
  }, []);
  const keys: {
    title: string;
    name: keyof RegisterState;
  }[] = useMemo(
    () => [
      {
        title: "이름",
        name: "name",
      },
      {
        title: "연락처",
        name: "phoneNumber",
      },
      {
        title: "이메일",
        name: "email",
      },
    ],
    []
  );
  const questions: {
    title: string;
    name: keyof RegisterState;
    keys: string[];
  }[] = useMemo(
    () => [
      {
        title: "단독주택 거주 시 가장 선호하는 사항은 무엇입니까?",
        name: "priority",
        keys: [
          "인프라 가까운 곳",
          "단지내 커뮤니티 가까운 곳",
          "조용한 곳",
          "공원이 가까운 곳",
          "상관없음",
        ],
      },
      {
        title:
          "귀하는 힐스테이트 양주옥정 파티오포레에 청약 할 의사가 있으십니까?",
        name: "intention",
        keys: ["있다", "고려해보겠다", "없다"],
      },
      {
        title: "계약의 의사가 있으시다면 목적은 무엇입니까?",
        name: "purpose",
        keys: ["실거주", "투자+실거주", "투자", "증여"],
      },
    ],
    []
  );
  return (
    <Register
      keys={keys}
      value={state}
      questions={questions}
      onChange={onChange}
      onSubmit={onSubmit}
      backgroundImage={backgroundImage}
    />
  );
};

export default RegisterContainer;
