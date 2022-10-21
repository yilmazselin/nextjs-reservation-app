import { useTranslation } from "next-i18next"
import React, { memo } from "react"
import styled from "styled-components"
import Text from "../../common/Text"
import { colors, fontSize, fontWeight, padding } from "../../../utils/styles"

const Container = styled.div`
  border-bottom: 1px solid ${colors.light};
  padding-bottom: ${padding.xs}px;
  margin-bottom: ${padding.md}px;
`
const textStyle = {
  fontSize: fontSize.nm,
  color: colors.dark,
  fontWeight: fontWeight.semiBold,
  params: {
    letterSpacing: "0.4px",
    marginBottom: padding.sm
  }
}

function UserCard({ currentLocale, data }) {
  const { t } = useTranslation("account")

  return (
    <Container>
      <Text {...textStyle}>
        {t("account:email")}: {data?.user.email}
      </Text>
      <Text {...textStyle}>
        {t("account:password")}: {data?.user.password}
      </Text>
      <Text {...textStyle}>
        {t("account:locale")}: {currentLocale}
      </Text>
    </Container>
  )
}

export default memo(UserCard)
