import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";

export type ItemProps = {
  title: string;
  info: string;
};
const Item = ({ title, info }: ItemProps) => {
  const colors = useColors();
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
        `}
      >
        <h4
          css={css`
            font-family: "Playfair Display", "Nanum Gothic";
            font-size: 20px;
            color: ${colors.gold};
            letter-spacing: 0.07rem;
            margin-top: 0;
            margin-bottom: 16px;
            line-height: 1.4;
          `}
        >
          {title}
        </h4>
        <ul
          css={css`
            line-height: 1.8;
            font-family: "Roboto", "Nanum Gothic";
            font-size: 10px;
            color: #999;
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
  | "corporate"
  | "name"
  | "apartment"
  | "address"
  | "phoneNumber"
  | "declaration"
  | "RN"
  | "email",
  string
>;
const Footer = ({
  corporate,
  name,
  apartment,
  address,
  phoneNumber,
  declaration,
  RN,
  email,
}: FooterProps) => {
  const colors = useColors();
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
            <Item
              title="Infomation"
              info={`
            아파트명: ${apartment}\n
            회사명: ${corporate}\n
            대표자: ${name}\n
            사업자등록번호: ${RN}\n
            통신판매업신고: ${declaration}
            `}
            />
            <Item title="Come visit us" info={address} />
            <Item
              title="Contact Us"
              info={`
            E-mail. ${email}\n
            Call. ${phoneNumber}`}
            />
          </div>
        </div>
      </div>
      <span
        css={css`
          margin: 0.8rem 0 1rem 6.35rem;
          font-weight: 600;
          font-size: 0.8rem;
          color: #555555;
          cursor: pointer;
          &:hover {
            color: white;
          }
          @media (max-width: 768px) {
            margin-left: 3.5rem;
          }
        `}
      >
        COPYRIGHT INFORMATION GOES HERE ©
      </span>
    </footer>
  );
};

export default Footer;
