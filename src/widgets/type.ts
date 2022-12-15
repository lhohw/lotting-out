export type WidgetProps<T = any> = {
  hasActiveStyle: boolean;
  mediaPaths: any;
  value: T;
  field: Map<string, any>;
  onChange: (value: T) => void;
  forID: string;
  classNameWrapper: string;
};

export type ImageProps = {
  title: string;
  alt: string;
  image: string;
};

export type SelectKeys = "subInfo" | "images" | "markdown";
