import CMS from "netlify-cms-app";
import withEmotion from "./with-emotion";
// @ts-ignore
import { ko } from "netlify-cms-locales";

import * as CategoryWidget from "../widgets/Category";
import * as ImagesWidget from "../widgets/ImagesWidget";
import GeneralPreview from "./preview-templates/GeneralPreview";
import * as QuestionWidget from "../widgets/Question";
import * as ListWidget from "../widgets/List";

CMS.registerLocale("ko", ko);

CMS.registerPreviewTemplate("general", withEmotion("general", GeneralPreview));

CMS.registerWidget(
  "category",
  // @ts-ignore
  CategoryWidget.CategoryControl,
  withEmotion("category", CategoryWidget.CategoryPreview)
);
CMS.registerWidget(
  "images",
  // @ts-ignore
  ImagesWidget.ImagesWidgetControl,
  ImagesWidget.ImagesWidgetPreview
);
CMS.registerWidget(
  "questions",
  // @ts-ignore
  QuestionWidget.QuestionControl,
  withEmotion("questions", QuestionWidget.QuestionPreview)
);
CMS.registerWidget(
  "customList",
  // @ts-ignore
  ListWidget.ListControl,
  withEmotion("customList", ListWidget.ListPreview)
);
