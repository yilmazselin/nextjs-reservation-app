import styled, { css } from "styled-components"
import { font } from "../../utils/helper"
import { colors, fontSize, fontWeight } from "../../utils/styles"

const COLOR = {
  primary: css`
    color: #fff;
    background-color: ${colors.red};
  `,
  "outline-primary": css`
    color: ${colors.red};
    background-color: ${colors.white};
    border: 1px solid ${colors.red};
  `,
  secondary: css``
}

const DISABLED = css`
  cursor: default;
  background-color: ${colors.disabled};
  color: ${colors.white};
`

const Button = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${font({
    size: fontSize.nm,
    weight: fontWeight.bold,
    color: colors.white
  })};
  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED};
`

export default Button
