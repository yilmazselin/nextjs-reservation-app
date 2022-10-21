import styled from "styled-components";
import { useTranslation } from "next-i18next";
import React, { memo } from "react";
import Link from "next/link";
import { colors, fontSize, fontWeight, padding } from "../../../utils/styles";
import Icon from "../Icon";
import Text from "../Text";

const Container = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

function TabBar() {
  const { t } = useTranslation("common");

  return (
    <Container>
      <Link href="/list">
        <ButtonWrapper data-testid="tab-list">
          <Icon color="#4D4D4D" icon="list" size="18" />
          <Text
            color={colors.dark}
            fontSize={fontSize.sm}
            fontWeight={fontWeight.semiBold}
            params={{
              marginTop: padding.xs,
            }}
          >
            {t("common:tabbar.list")}
          </Text>
        </ButtonWrapper>
      </Link>

      <Link href="/account">
        <ButtonWrapper data-testid="tab-account">
          <Icon color="#4D4D4D" icon="person" size="18" />
          <Text
            color={colors.dark}
            fontSize={fontSize.sm}
            fontWeight={fontWeight.semiBold}
            params={{
              marginTop: padding.xs,
            }}
          >
            {t("common:tabbar.account")}
          </Text>
        </ButtonWrapper>
      </Link>
    </Container>
  );
}

export default memo(TabBar);
