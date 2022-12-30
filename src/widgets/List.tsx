import type { WidgetProps } from "./type";
import type { PreviewTemplateComponentProps } from "netlify-cms-core";

import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import produce from "immer";
import { ButtonControl } from "./Button";
import InputControl from "./Input";
import RemoveButton from "./RemoveButton";
import colors from "../constants/colors";

export type ListControlState = {
  list: string[];
};

class ListControl extends PureComponent<WidgetProps, ListControlState> {
  input: InputControl = null!;
  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      list: [],
    };
    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  componentDidMount(): void {
    if (this.props.value) this.setState(this.props.value.toJS());
  }
  shouldComponentUpdate(
    nextProps: Readonly<WidgetProps>,
    nextState: Readonly<ListControlState>
  ): boolean {
    return this.state.list !== nextState?.list;
  }
  onClick(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (target.tagName !== "BUTTON") return;
    const { input } = this;
    if (!input) throw new Error("input is not defined");
    if (!input.state.value.trim()) return;
    const nextState = produce(this.state, (draft) => {
      draft.list.push(input.state.value);
    });
    input.setState({ value: "" });
    this.setState(nextState);
    this.props.onChange(nextState);
  }
  onRemove(idx: number) {
    const nextState = produce(this.state, (draft) => {
      draft.list.splice(idx, 1);
    });
    this.setState(nextState);
  }
  render() {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <form
          css={css`
            display: flex;
            position: relative;
            flex-direction: column;
          `}
          onSubmit={(e) => e.preventDefault()}
          onClick={this.onClick}
        >
          <InputControl
            ref={(ref) => (this.input = ref!)}
            css={css`
              width: 100%;
            `}
            placeholder="keyword"
          />
          <ButtonControl
            css={css`
              position: absolute;
              height: 100%;
              border-radius: 0 5px 5px 0;
              border: 1px solid ${colors.gold};
              right: 0;
              top: 0;
              &:hover {
                color: ${colors.gold};
              }
            `}
            target="keyword"
            onClick={() => null}
          />
        </form>
        <ul
          css={css`
            display: flex;
            flex-direction: row;
            padding: 1rem;
            flex-wrap: wrap;
            list-style: none;
          `}
        >
          {this.state.list.length
            ? this.state.list.map((keyword, i) => (
                <li
                  key={keyword}
                  css={css`
                    margin: 0.5rem 1rem;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  `}
                >
                  <span
                    css={css`
                      padding: 0.5rem 1rem;
                      border: 1px solid ${colors.gold};
                      border-radius: 5px;
                    `}
                  >
                    {keyword}
                  </span>
                  <RemoveButton
                    css={css`
                      position: relative;
                      margin-left: 0.5rem;
                    `}
                    size={15}
                    onClick={() => this.onRemove(i)}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}

const List = ({ list }: { list: string[] }) => (
  <ul
    css={css`
      display: flex;
      flex-direction: row;
      padding: 1rem;
      flex-wrap: wrap;
      list-style: none;
    `}
  >
    {list.length
      ? list.map((keyword: string) => (
          <li
            key={keyword}
            css={css`
              padding: 0.5rem 1rem;
              border-radius: 5px;
              border: 1px solid ${colors.gold};
              margin: 0.5rem;
            `}
          >
            {keyword}
          </li>
        ))
      : null}
  </ul>
);
const ListPreview = ({ entry }: PreviewTemplateComponentProps) => {
  const { list } = entry.getIn(["data"]).toJS();
  return <List list={list} />;
};

export { ListControl, ListPreview, List };
