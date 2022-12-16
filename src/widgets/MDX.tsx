import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import CMS from "netlify-cms-app";
import { WidgetProps } from "./type";

export type MarkdownControlProps = {
  widgetProps: WidgetProps;
  value: string;
  defaultKey: string;
  onChange: (e: string, key: string) => void;
};
class MDXControl extends PureComponent<MarkdownControlProps> {
  shouldComponentUpdate(nextProps: Readonly<MarkdownControlProps>): boolean {
    const {
      value,
      widgetProps: { classNameWrapper, hasActiveStyle, mediaPaths },
    } = this.props;
    return (
      value !== nextProps.value ||
      classNameWrapper !== nextProps.widgetProps.classNameWrapper ||
      hasActiveStyle !== nextProps.widgetProps.hasActiveStyle ||
      mediaPaths !== nextProps.widgetProps.mediaPaths
    );
  }
  render() {
    const { widgetProps, value, onChange, defaultKey } = this.props;
    const MarkdownControl = CMS.getWidget("markdown")
      ?.control as unknown as React.FC<{
      value: string;
      onChange: (e: string) => void;
    }>;
    return (
      <MarkdownControl
        css={css`
          display: flex;
          flex: 1;
        `}
        {...widgetProps}
        value={value}
        onChange={(e) => {
          onChange(e, `${defaultKey}|body`);
        }}
      />
    );
  }
}

export { MDXControl };
