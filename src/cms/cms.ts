import CMS from "netlify-cms-app";
import withEmotion from "./with-emotion";
// @ts-ignore
import { ko } from "netlify-cms-locales";

import { CategoryControl, CategoryPreview } from "../widgets/Category";
import {
  ImagesWidgetControl,
  ImagesWidgetPreview,
} from "../widgets/ImagesWidget";
import GeneralPreview from "./preview-templates/GeneralPreview";
CMS.registerLocale("ko", ko);

CMS.registerPreviewTemplate("general", withEmotion("general", GeneralPreview));

CMS.registerWidget(
  "category",
  // @ts-ignore
  CategoryControl,
  CategoryPreview
);
CMS.registerWidget(
  "images",
  // @ts-ignore
  ImagesWidgetControl,
  ImagesWidgetPreview
);
