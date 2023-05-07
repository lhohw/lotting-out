import type { CreateWebpackConfigArgs } from "gatsby";

export const onCreateWebpackConfig = ({
  getConfig,
  actions,
}: CreateWebpackConfigArgs) => {
  if (getConfig().mode === "production") {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};
