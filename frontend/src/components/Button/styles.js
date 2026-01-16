import styled from 'styled-components';


export const Button = styled.button`
  border: ${(props) =>
    props.theme === "primary"
      ? "none"
      : "1px solid #fff"};

  background: ${(props) =>
    props.theme === "primary"
      ? "linear-gradient(180deg, #fe7e5d 0%, #ff6378 100%)"
      : "transparent"};

  font-size: 16px;
  color: #fff;
  padding: 16px 32px;
  width: fit-content;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.2s ease;

  /* 🔹 PRIMARY continua igual */
  &:hover {
    ${(props) =>
    props.theme === "primary" &&
    `
        opacity: 0.8;
      `}
  }

  &:active {
    ${(props) =>
    props.theme === "primary" &&
    `
        opacity: 0.5;
      `}
  }

  /* 🔹 SECONDARY (não primary) */
  &:hover {
    ${(props) =>
    props.theme !== "primary" &&
    `
        background: #fff;
        color: #181f36;
      `}
  }

  &:active {
    ${(props) =>
    props.theme !== "primary" &&
    `
        background: #e6e6e6;
        color: #181f36;
      `}
  }
`;

export default Button;