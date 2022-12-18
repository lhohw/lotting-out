import type { WidgetProps, SelectKeys, ImageProps } from "./type";

import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import produce from "immer";
import { SelectControl } from "./Select";
import { SubInfoControl } from "./SubInfo";
import { ImagesControl } from "./Images";
import { MDXControl } from "./MDX";

export type CategoryControlState = {
  type: SelectKeys | "";
  images: ImageProps[];
  markdown: "";
  sub: CategoryControlState;
  title?: string;
}[];
class CategoryControl extends PureComponent<WidgetProps, CategoryControlState> {
  constructor(props: WidgetProps) {
    super(props);
    this.state = [
      {
        type: "",
        images: [],
        markdown: "",
        sub: [],
      },
    ];
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  componentDidMount(): void {
    if (this.props.value) this.setState([this.props.value.toJS()]);
  }
  shouldComponentUpdate(
    nextProps: Readonly<WidgetProps>,
    nextState: Readonly<CategoryControlState>
  ): boolean {
    return (
      this.props.value !== nextProps.value ||
      this.props.classNameWrapper !== nextProps.classNameWrapper ||
      this.props.hasActiveStyle !== nextProps.hasActiveStyle ||
      this.props.mediaPaths !== nextProps.mediaPaths ||
      this.state !== nextState
    );
  }
  onChange<T>(e: T, key: string) {
    const nextState = produce(this.state[0], (draft) => {
      const splitted = key.split("|");
      splitted.forEach((k, i) => {
        if (k.trim() === "") return;
        if (i === splitted.length - 1) {
          // @ts-ignore
          draft[k] = k === "type" && draft[k] === e ? "" : e;
          return;
        }
        // @ts-ignore
        if (!draft[k]) draft[k] = {};
        // @ts-ignore
        draft = draft[k];
      });
    });
    this.props.onChange(nextState);
    this.setState([nextState]);
  }
  onRemove(key: string) {
    const nextState = produce(this.state[0], (draft) => {
      const splitted = key.split("|");
      splitted.forEach((k, i) => {
        if (k.trim() === "") return;
        if (i === splitted.length - 1) {
          // @ts-ignore
          draft.splice(k, 1);
          return;
        }
        // @ts-ignore
        draft = draft[k];
      });
    });
    this.props.onChange(nextState);
    this.setState([nextState]);
  }
  render() {
    const { type, images } = this.state[0];
    const { onChange, onRemove } = this;
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          position: relative;
        `}
      >
        <SelectControl value={type} defaultKey="" onChange={onChange} />
        {type === "subInfo" ? (
          <SubInfoControl
            defaultKey="sub"
            value={this.state[0].sub}
            widgetProps={this.props}
            onChange={onChange}
            onRemove={onRemove}
          />
        ) : type === "images" ? (
          <ImagesControl
            defaultKey="images"
            value={images}
            widgetProps={this.props}
            onChange={onChange}
            onRemove={onRemove}
          />
        ) : type === "markdown" ? (
          <MDXControl
            defaultKey=""
            onChange={onChange}
            value={this.state[0].markdown}
            widgetProps={this.props}
          />
        ) : null}
      </div>
    );
  }
}

const CategoryPreview = () => {
  return <div />;
};

export { CategoryControl, CategoryPreview };
