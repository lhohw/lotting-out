import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import type { InfoProps } from "../components/Info";
import type { CategoryMenu } from "../components/Category";
import React, { useCallback, useMemo, useEffect } from "react";
import { graphql, Script } from "gatsby";
import { useRecoilState } from "recoil";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeaderContainer from "../containers/HeaderContainer";
import SliderContainer from "../containers/SliderContainer";
import Category from "../components/Category";
import Footer, { FooterProps } from "../components/Footer";
import ControlButtonContainer from "../containers/ControlButtonContainer";
import Loading from "../components/Loading";
import { deviceState as ds, DeviceState } from "../recoil/deviceDetect";
import { checkTouch, checkMobile } from "../utils";

export type IndexPageData = {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            title: string;
            title_en: string;
            info: InfoProps["data"][number];
            priority: number;
          };
        };
      }[];
    };
    settingJson: {
      id: string;
      slider: {
        images: PreviewCompatibleImageData[];
      };
      logo: PreviewCompatibleImageData;
      short: string;
      apartment: string;
    } & FooterProps;
  };
};
const IndexPage = ({ data }: IndexPageData) => {
  const findImage = useCallback(
    (info: InfoProps["data"][number]): PreviewCompatibleImageData["image"] => {
      if (info.type === "images") return info.images[0].image;
      if (info.type === "subInfo") {
        for (let i = 0; i < info.sub.length; i++) {
          const image = findImage(info.sub[i]);
          if (image) return image;
        }
      }
      return "";
    },
    []
  );
  const menu: CategoryMenu[] = useMemo(
    () =>
      data.allMdx.edges
        .map((edge) => {
          const { title, title_en, info, priority } = edge.node.frontmatter;
          return { title, title_en, thumbnail: findImage(info), priority };
        })
        .sort((a, b) => a.priority - b.priority),
    [data.allMdx.edges, findImage]
  );
  const [deviceState, setDeviceState] = useRecoilState<DeviceState>(ds);

  useEffect(() => {
    if (deviceState.isInitialized) return;
    const windowWith = globalThis as typeof globalThis & {
      opera: string;
      navigator: {
        userAgentData?: {
          mobile: boolean;
        };
      };
    };
    const isMobile =
      checkMobile(
        windowWith.navigator.userAgent ||
          windowWith.navigator.vendor ||
          windowWith.opera
      ) || Boolean(windowWith.navigator.userAgentData?.mobile);
    const isTouch =
      checkTouch(
        windowWith.navigator.userAgent ||
          windowWith.navigator.vendor ||
          windowWith.opera
      ) || Boolean(windowWith.navigator.userAgentData?.mobile);

    setDeviceState({
      isInitialized: true,
      isMobile,
      isTouch,
    });
  }, [deviceState, setDeviceState]);

  const {
    logo,
    slider: { images: imageInfos },
    apartment,
    short,
    ...rest
  } = data.settingJson;

  return (
    <Layout>
      {!deviceState.isInitialized ? (
        <Loading isLoading />
      ) : (
        <React.Fragment>
          (<HeaderContainer menu={menu} logo={logo} />
          <SliderContainer
            imageInfos={imageInfos}
            apartment={apartment}
            short={short}
          />
          <Category menu={menu} logo={logo} />
          <Footer {...rest} />
          <ControlButtonContainer phoneNumber={rest.phoneNumber} />
          <Loading />)
        </React.Fragment>
      )}
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
        integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
        crossOrigin="anonymous"
      ></Script>
    </Layout>
  );
};

export const query = graphql`
  query settingAndMdx {
    allMdx(filter: { frontmatter: { templateKey: { eq: "category" } } }) {
      edges {
        node {
          id
          frontmatter {
            info {
              body
              sub {
                type
                title
                body
                images {
                  image {
                    childImageSharp {
                      gatsbyImageData(width: 350)
                    }
                  }
                  alt
                  title
                }
                sub {
                  type
                  title
                  body
                  images {
                    image {
                      childImageSharp {
                        gatsbyImageData(width: 350)
                      }
                    }
                    alt
                    title
                  }
                }
              }
              type
              images {
                image {
                  childImageSharp {
                    gatsbyImageData(width: 350)
                  }
                }
                alt
                title
              }
            }
            title
            title_en
            priority
          }
        }
      }
    }
    settingJson(type: { eq: "setting" }) {
      id
      logo {
        image {
          childImageSharp {
            gatsbyImageData(width: 100)
          }
        }
        alt
        title
      }
      phoneNumber
      slider {
        images {
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          alt
          title
        }
      }
      name
      email
      corporate
      apartment
      short
      address
    }
  }
`;

export const Head = () => (
  <>
    <link
      rel="preconnect"
      href="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
    />
    <link
      rel="preload"
      as="image"
      href="data:image/svg+xml;charset=utf-8,%3Csvg height='2832' width='4000' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E"
    />
    <Seo title="Home Page" />
  </>
);

export default IndexPage;
