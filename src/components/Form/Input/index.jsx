import { memo } from "react"
import styled from "styled-components"
import { font } from "../../../utils/helper"
import { colors, fontSize, fontWeight } from "../../../utils/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props) => props.marginBottom}px;
`
const Error = styled.p`
  position: absolute;
  bottom: -20px;
  ${font({
    size: fontSize.sm,
    weight: fontWeight.regular,
    color: colors.red
  })}
`

const Label = styled.label`
  ${font({
    size: fontSize.md,
    weight: fontWeight.regular,
    color: colors.gray
  })}
  order: 1;
  pointer-events: none;
  transform-origin: left top;
  transform: scale(1) translate3d(0, 22px, 0);
  transition: 200ms ease all;
  position: relative;
`

const StyledInput = styled.input`
  position: relative;
  border-radius: 0;
  display: flex;
  ${font({
    size: fontSize.md,
    weight: fontWeight.semiBold,
    color: colors.dark
  })}
  line-height: 24px;
  padding-bottom: 8px;
  outline: 0;
  border: 0;
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => (props.error
    ? colors.red
    : colors.disabled)};
  flex: 1 1 auto;
  order: 2;
  transition: all 0.2s ease;
  &:focus ~ ${Label},&:not(:placeholder-shown) ~ ${Label} {
    color: #77869e;
    transform: scale(0.8) translate3d(0, -8px, 0);
  }
  &:not(:placeholder-shown) {
    border-bottom-color: ${colors.gray};
  }
  &:focus {
    border-bottom-color: ${(props) => (props.error
    ? colors.red
    : colors.green)};
  }
`

function Input({
  value,
  id,
  type = "text",
  label,
  name,
  onChange,
  marginBottom,
  error
}) {
  return <Container marginBottom={marginBottom}>
    <StyledInput
      error={error}
      value={value}
      id={id}
      type={type}
      name={name}
      onChange={onChange}
      placeholder=" "
    />
    <Label htmlFor={id}>{label}</Label>
    {error && <Error data-testid={`${name}-error`}>{error}</Error>}
  </Container>
}

export default memo(Input)
