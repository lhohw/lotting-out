import CMS from "netlify-cms-app";
import withEmotion from "./with-emotion";
import HeaderPreview from "./preview-templates/HeaderPreview";

CMS.registerPreviewTemplate("general", withEmotion("header", HeaderPreview));
