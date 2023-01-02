import type { WidgetProps } from "./type";
import type { PreviewTemplateComponentProps } from "netlify-cms-core";

import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { ButtonControl } from "./Button";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import Question from "../components/Question";
import colors from "../constants/colors";
import InputControl from "./Input";
import RemoveButton from "./RemoveButton";

export type Question = {
  question: string;
  answers: string[];
};
export type QuestionControlState = {
  questions: Question[];
};

class QuestionControl extends PureComponent<WidgetProps, QuestionControlState> {
  timer = 0;
  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      questions: [],
    };
    this.addQuestion = this.addQuestion.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  componentDidMount(): void {
    if (
      this.props.value &&
      "toJS" in this.props.value &&
      typeof this.props.value.toJS === "function"
    )
      this.setState(this.props.value.toJS());
  }
  shouldComponentUpdate(
    nextProps: Readonly<WidgetProps>,
    nextState: Readonly<QuestionControlState>
  ): boolean {
    return (
      this.props.classNameWrapper !== nextProps.classNameWrapper ||
      this.props.hasActiveStyle !== nextProps.hasActiveStyle ||
      this.state !== nextState
    );
  }
  addQuestion() {
    if (this.timer + 200 > Date.now()) return;
    const nextState: QuestionControlState = produce(this.state, (draft) => {
      draft.questions.push({
        question: "",
        answers: [],
      });
    });
    this.setState(nextState);
    this.props.onChange(nextState);
    this.timer = Date.now();
  }
  addAnswer(e: React.MouseEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      const form = e.currentTarget as HTMLFormElement;
      const { value: question } = form.firstChild
        ?.firstChild as HTMLInputElement;
      const { value: answer } = form.children[1].firstChild
        ?.firstChild as HTMLInputElement;
      if (!form.dataset.idx) throw new Error("form index is required");
      if (!answer.trim()) return;
      const { idx } = form.dataset;
      const nextState: QuestionControlState = produce(this.state, (draft) => {
        draft.questions[+idx].question = question;
        draft.questions[+idx].answers.push(answer);
      });
      this.setState(nextState);
      this.props.onChange(nextState);
    }
  }
  onRemove(type: "question" | "answer", idx: number, keyIdx?: number) {
    let nextState: QuestionControlState = { questions: [] };
    if (type === "question") {
      nextState = produce(this.state, (draft) => {
        draft.questions.splice(idx, 1);
      });
    } else {
      if (keyIdx === undefined) throw new Error("index is required");
      nextState = produce(this.state, (draft) => {
        draft.questions[idx].answers.splice(keyIdx, 1);
      });
    }
    this.setState(nextState);
    this.props.onChange(nextState);
  }
  render() {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <ButtonControl target="Question" onClick={this.addQuestion} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-top: 0.5rem;
          `}
        >
          {this.state.questions.map(({ answers }, i) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <form
              data-idx={i}
              key={uuidv4()}
              css={css`
                display: flex;
                flex-direction: column;
                border: 2px solid ${colors.main};
                border-radius: 5px;
                padding: 1rem;
                position: relative;
                & + & {
                  margin-top: 1rem;
                }
              `}
              onSubmit={(e) => e.preventDefault()}
              onClick={this.addAnswer}
            >
              <InputControl
                css={css`
                  height: 3rem;
                  margin-right: 1rem;
                `}
                placeholder="Question"
                value={this.state.questions[i].question || ""}
              />
              <div
                css={css`
                  position: relative;
                  display: flex;
                  flex: 1;
                  margin-right: 1rem;
                  margin-top: 0.5rem;
                `}
              >
                <InputControl placeholder="Answer" />
                <ButtonControl
                  css={css`
                    position: absolute;
                    height: 100%;
                    right: 0;
                    top: 0;
                    border-radius: 0 5px 5px 0;
                    padding: 0 0.5rem;
                    border: 1px solid ${colors.gold};
                    transition: color 0.25s ease-in-out;
                    &:hover {
                      color: ${colors.main};
                    }
                  `}
                  target="Answer"
                  onClick={() => null}
                />
              </div>
              <ul
                css={css`
                  display: flex;
                  flex-direction: column;
                  list-style: none;
                  padding: 0.5rem;
                `}
              >
                {answers.map((key, j) => (
                  <li
                    key={key}
                    css={css`
                      display: flex;
                      & + & {
                        margin-top: 0.5rem;
                      }
                    `}
                  >
                    <span
                      css={css`
                        position: relative;
                      `}
                    >
                      {`- ${key}`}
                      <RemoveButton
                        right={-25}
                        top={1}
                        size={10}
                        onClick={() => this.onRemove("answer", i, j)}
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <RemoveButton onClick={() => this.onRemove("question", i)} />
            </form>
          ))}
        </div>
      </div>
    );
  }
}

const QuestionPreview = ({ entry }: PreviewTemplateComponentProps) => {
  const { questions: data } = entry.getIn(["data"]).toJS() as {
    questions: QuestionControlState;
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {data.questions.map((question, idx) => (
        <Question
          key={idx}
          {...question}
          name={idx.toString()}
          value={""}
          isPreview
        />
      ))}
    </div>
  );
};

export { QuestionControl, QuestionPreview };
