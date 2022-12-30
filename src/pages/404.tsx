import React from "react";
import { css } from "@emotion/react";
import { Link, HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { useColors } from "../recoil/theme";

const NotFoundPage: React.FC<PageProps> = () => {
  const colors = useColors();
  return (
    <Layout>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        `}
      >
        <div
          css={css`
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 2px solid ${colors.main};
            border-radius: 8px;
          `}
        >
          <h1
            css={css`
              color: ${colors.sub};
              padding: 0;
              margin: 0;
              margin-bottom: 2rem;
            `}
          >
            Page Not Found
          </h1>
          <p
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 1.05rem;
              margin-bottom: 2rem;
              & > span {
                margin-bottom: 1rem;
              }
            `}
          >
            <span>관련된 페이지를 찾을 수 없습니다 😔</span>
            <span>메인 화면으로 돌아가시려면 아래 버튼을 눌러주세요</span>
          </p>
          <Link
            to="/"
            css={css`
              font-size: 1.3rem;
              font-weight: 600;
              transition: color 0.25s ease-in-out;
              &:hover {
                color: ${colors.gold};
              }
            `}
          >
            🏠 Go home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
