import type { CreateWebpackConfigArgs } from "gatsby";

import path from "path";
import { copyLibFiles } from "@builder.io/partytown/utils";

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

exports.onPreBuild = async () => {
  await copyLibFiles(path.join(__dirname, "static", "~partytown"));
};
