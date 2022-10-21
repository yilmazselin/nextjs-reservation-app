import styled from "styled-components"
import { font } from "../../../utils/helper"

const Text = styled.p`
  ${(props) => `
    ${font({
    size: props.fontSize,
    weight: props.fontWeight,
    color: props.color
  })}
  `};
  ${(props) => ({ ...props.params })};
`

export default Text
