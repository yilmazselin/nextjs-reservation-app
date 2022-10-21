import { css } from "styled-components"
import { colors, fontSize, fontWeight } from "./styles"

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

export const containerWidths = {
  sm: "540px",
  md: "720px",
  lg: "960px",
  xl: "1140px",
  xxl: "1320px"
}

export const responsive = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}px) {
        ${css(...args)};
      }
    `

    return accumulator
  },
  {}
)

export const font = ({ size, weight, color }) => `
  color: ${color
    ? color
    : colors.black};
  font-size: ${size
    ? size
    : fontSize.nm}px;
  font-family: "NunitoSans-${weight
    ? weight
    : fontWeight.medium}","sans-serif";
`
