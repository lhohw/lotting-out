import React, { PureComponent } from "react";
import { ImagesControl } from "./Images";
import produce from "immer";
import type { WidgetProps, ImageProps } from "./type";

export type ImagesWidgetState = {
  images: ImageProps[];
};
class ImagesWidgetControl extends PureComponent<
  WidgetProps,
  ImagesWidgetState
> {
  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      images: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  componentDidMount(): void {
    if (this.props.value) {
      const nextState = JSON.parse(this.props.value);
      this.setState(nextState);
    }
  }
  shouldComponentUpdate(
    nextProps: Readonly<WidgetProps>,
    nextState: Readonly<ImagesWidgetState>
  ): boolean {
    const { classNameWrapper, hasActiveStyle, mediaPaths } = this.props;
    return (
      this.state !== nextState ||
      classNameWrapper !== nextProps.classNameWrapper ||
      hasActiveStyle !== nextProps.hasActiveStyle ||
      mediaPaths !== nextProps.mediaPaths
    );
  }
  onChange<T>(e: T, key: string) {
    const nextState = produce(this.state, (draft) => {
      const splitted = key.split("|");
      splitted.forEach((k, i) => {
        if (k.trim() === "") return;
        if (i === splitted.length - 1) {
          // @ts-ignore
          draft[k] = e;
          return;
        }
        // @ts-ignore
        if (!draft[k]) draft[k] = {};
        // @ts-ignore
        draft = draft[k];
      });
    });
    this.props.onChange(JSON.stringify(nextState));
    this.setState(nextState);
  }
  onRemove(key: string) {
    const nextState = produce(this.state, (draft) => {
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
    this.props.onChange(JSON.stringify(nextState));
    this.setState(nextState);
  }
  render() {
    const { onChange, onRemove } = this;
    return (
      <ImagesControl
        widgetProps={this.props}
        value={this.state.images}
        onChange={onChange}
        onRemove={onRemove}
        defaultKey="images"
      />
    );
  }
}

class ImagesWidgetPreview extends PureComponent {
  render() {
    return <div>images</div>;
  }
}

export { ImagesWidgetControl, ImagesWidgetPreview };
