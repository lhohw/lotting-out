import CMS from "netlify-cms-app";
import withEmotion from "./with-emotion";
// @ts-ignore
import { ko } from "netlify-cms-locales";

import * as CategoryWidget from "../widgets/Category";
import * as ImagesWidget from "../widgets/ImagesWidget";
import GeneralPreview from "./preview-templates/GeneralPreview";
import CategoryPreview from "./preview-templates/CategoryPreview";

CMS.registerLocale("ko", ko);

CMS.registerPreviewTemplate("general", withEmotion("general", GeneralPreview));
CMS.registerPreviewTemplate(
  "category",
  withEmotion("category", CategoryPreview)
);

CMS.registerWidget(
  "category",
  // @ts-ignore
  CategoryWidget.CategoryControl,
  CategoryWidget.CategoryPreview
);
CMS.registerWidget(
  "images",
  // @ts-ignore
  ImagesWidget.ImagesWidgetControl,
  ImagesWidget.ImagesWidgetPreview
);
