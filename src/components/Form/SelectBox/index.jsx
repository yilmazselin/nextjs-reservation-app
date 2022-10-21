import { memo } from "react"
import { useTranslation } from "next-i18next"
import styled from "styled-components"
import { font } from "../../../utils/helper"
import { colors, fontSize, fontWeight } from "../../../utils/styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props) => props.marginBottom}px;
  overflow: hidden;
`

const Label = styled.label`
  ${font({
    size: fontSize.md,
    weight: fontWeight.regular,
    color: colors.gray
  })}
  margin-bottom:10px;
  font-size: 13px;
`

const Select = styled.select`
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.gray};
  padding-bottom: 8px;
  margin-left: -5px;
  width: calc(100% + 5px);
  ${font({
    size: fontSize.md,
    weight: fontWeight.semiBold,
    color: colors.dark
  })};
`

function SelectBox({
  id,
  label,
  name,
  marginBottom,
  options,
  onChange,
  defaultValue
}) {
  const { t } = useTranslation("common")

  return (
    <Container marginBottom={marginBottom}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        data-testid="select"
        defaultValue={defaultValue}
        id={id}
        name={name}
        onChange={onChange}
      >
        {options
          ? options.map((x) => <option data-testid="select-option" key={x.id} value={x.key}>
            {t(`common:languages.${x.key}`)}
          </option>)
          : null}
      </Select>
    </Container>
  )
}

export default memo(SelectBox)
