import type { WidgetProps, SelectKeys, ImageProps } from "./type";
import type { PreviewTemplateComponentProps } from "netlify-cms-core";

import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import produce from "immer";
import { SelectControl } from "./Select";
import { SubInfoControl } from "./SubInfo";
import { ImagesControl } from "./Images";
import { MDXControl } from "./MDX";
import Category from "../pages/info/{mdx.frontmatter__title_en}";

export type CategoryControlState = {
  type: SelectKeys | "";
  images: ImageProps[];
  body: string;
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
        body: "",
        sub: [],
      },
    ];
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  componentDidMount(): void {
    if (this.props.value && "toJS" in this.props.value)
      this.setState([this.props.value.toJS()]);
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
            value={this.state[0].body}
            widgetProps={this.props}
          />
        ) : null}
      </div>
    );
  }
}

const CategoryPreview = ({
  entry,
  getAsset,
}: PreviewTemplateComponentProps) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <Category
      data={{
        mdx: {
          frontmatter: {
            ...data,
          },
        },
        settingJson: {
          questions: {
            questions: [
              {
                question: "Temporary Question1",
                answers: [
                  "인프라 가까운 곳",
                  "단지내 커뮤니티 가까운 곳",
                  "조용한 곳",
                  "공원이 가까운 곳",
                  "상관없음",
                ],
              },
              {
                question: "Temporary Question2",
                answers: ["있다", "고려해보겠다", "없다"],
              },
              {
                question: "Temporary Question3",
                answers: ["실거주", "투자+실거주", "투자", "증여"],
              },
            ],
          },
          info: [
            {
              name: "name",
              title: "Temporary name",
            },
            {
              name: "phoneNumber",
              title: "Temporary phone",
            },
            {
              name: "email",
              title: "Temporary email",
            },
          ],
        },
      }}
      isPreview={true}
      getAsset={getAsset}
    />
  );
};

export { CategoryControl, CategoryPreview };
