import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import colors from "../constants/colors";

export type QuestionInputProps = {
  placeholder: string;
  value?: string;
  className?: string;
};
export type QuestionInputState = {
  value: string;
};
class QuestionInput extends PureComponent<
  QuestionInputProps,
  QuestionInputState
> {
  state = {
    value: "",
  };
  componentDidMount() {
    if (this.props.value) this.setState({ value: this.props.value });
  }
  shouldComponentUpdate(
    nextProps: QuestionInputProps,
    nextState: { value: string }
  ) {
    return this.state !== nextState;
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };
  render(): React.ReactNode {
    const { placeholder, className } = this.props;
    return (
      <div
        className={className}
        css={css`
          display: flex;
          flex: 1;
          flex-direction: row;
          height: 2.5rem;
          border: 1px solid ${colors.gold};
          border-radius: 5px;
          align-items: center;
          margin-top: 0;
        `}
      >
        <input
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            padding: 1rem;
          `}
          placeholder={placeholder}
          onChange={this.onChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default QuestionInput;
