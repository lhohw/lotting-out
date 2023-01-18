import React, { useMemo } from "react";
import { css } from "@emotion/react";
import colors from "../constants/colors";

export type ItemProps = {
  title: string;
  info: string;
};
const Item = ({ title, info }: ItemProps) => {
  return (
    <div
      css={css`
        padding-left: 40px;
        flex: 1;
        display: flex;
        flex-direction: row;

        @media (max-width: 768px) {
          padding-left: 0;
        }
      `}
    >
      <div
        css={css`
          width: 1px;
          height: 100%;
          border: none;
          border-left: 1px solid #858585;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
          padding-left: 30px;
          font-family: "Nanum Gothic";
          font-display: swap;
        `}
      >
        <h3
          css={css`
            font-size: 20px;
            color: ${colors.gold};
            letter-spacing: 0.07rem;
            margin-top: 0;
            margin-bottom: 16px;
            line-height: 1.4;
          `}
        >
          {title}
        </h3>
        <ul
          css={css`
            line-height: 1.8;
            font-size: 10px;
            color: #a2a2a2;
            letter-spacing: 0.15em;
            margin-bottom: 0;

            @media (max-width: 768px) {
              padding-bottom: 30px;
            }
          `}
        >
          {info.split("\n").map((i, idx) => (
            <li
              key={idx}
              css={css`
                margin: 0.3rem 0;
                padding: 0;
              `}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export type FooterProps = Record<
  "corporate" | "name" | "address" | "phoneNumber" | "email",
  string
>;

const Footer = ({
  corporate,
  name,
  address,
  phoneNumber,
  email,
}: FooterProps) => {
  const data = useMemo(
    () => [
      {
        title: "Infomation",
        info: `
        회사명: ${corporate}\n
        대표자: ${name}\n
        `,
      },
      {
        title: "Come visit us",
        info: address,
      },
      {
        title: "Contact Us",
        info: `
    E-mail. ${email}\n
    Call. ${phoneNumber}`,
      },
    ],
    [address, corporate, email, name, phoneNumber]
  );
  return (
    <footer
      css={css`
        background-color: ${colors.dark};
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      <div
        css={css`
          padding-top: 2rem;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              width: 100%;
              padding: 0 30px;
              @media (max-width: 768px) {
                flex-direction: column;
              }
            `}
          >
            {data.map(({ title, info }) => (
              <Item key={title} title={title} info={info} />
            ))}
          </div>
        </div>
      </div>
      <span
        css={css`
          margin: 1.1rem 0 1.1rem 6.35rem;
          font-weight: 600;
          font-size: 0.8rem;
          color: ${colors.widgetBorder};
          cursor: pointer;
          @media (max-width: 768px) {
            margin-left: 3.5rem;
            font-size: 0.6rem;
          }
        `}
      >
        COPYRIGHT INFORMATION GOES HERE ©
      </span>
    </footer>
  );
};

export default React.memo(Footer);
