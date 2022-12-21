import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import type { RegisterProps } from "../components/Register";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Register from "../components/Register";
import produce from "immer";

export type RegisterContainerProps = {
  backgroundImage: PreviewCompatibleImageData;
};
export type RegisterContainerState = RegisterProps["state"];
export type RegisterContainerData = {
  settingJson: {
    questions: {
      questions: RegisterProps["questions"];
    };
    info: RegisterProps["info"];
  };
};

const RegisterContainer = ({ backgroundImage }: RegisterContainerProps) => {
  const { settingJson } = useStaticQuery<RegisterContainerData>(graphql`
    {
      settingJson(type: { eq: "questions" }) {
        questions {
          questions {
            question
            answers
          }
        }
        info {
          name
          title
        }
      }
    }
  `);
  const {
    questions: { questions },
    info,
  } = settingJson;
  const initialState: RegisterContainerState = useMemo(
    () => ({
      value: {
        ...info.reduce(
          (d, { name }) => ({ ...d, [name]: "" }),
          {} as RegisterContainerState["value"]
        ),
        ...questions.reduce((d, _, i) => ({ ...d, [i.toString()]: "" }), {}),
      },
      agreement: {
        marketing: false,
        termsAndConditions: false,
      },
    }),
    [info, questions]
  );

  const [state, setState] = useState<RegisterContainerState>(initialState);
  useEffect(() => {
    return () => {
      setState(initialState);
    };
  }, [initialState, setState]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      const nextState = produce(state, (draft) => {
        draft.value[e.target.name] = e.target.value;
      });
      setState(nextState);
    },
    [state, setState]
  );

  const onSubmit = useCallback(() => {
    if (!state.agreement.marketing) {
      alert("마케팅 수신 동의 필수");
      return;
    }
    if (!state.agreement.termsAndConditions) {
      alert("이용 약관 동의 필수");
      return;
    }
    const answers = Object.entries(state.value).reduce(
      (ans, [key, value]) => ({
        ...ans,
        [!isNaN(parseInt(key)) ? questions[+key].question : key]: value,
      }),
      {}
    );
    alert(JSON.stringify(answers));
  }, [state, questions]);

  const onClick = useCallback(
    (title: keyof RegisterContainerState["agreement"]) => {
      const nextState = produce(state, (draft) => {
        draft.agreement[title] = !draft.agreement[title];
      });
      setState(nextState);
    },
    [state]
  );
  return (
    <Register
      info={info}
      state={state}
      questions={questions}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      backgroundImage={backgroundImage}
    />
  );
};

export default RegisterContainer;
