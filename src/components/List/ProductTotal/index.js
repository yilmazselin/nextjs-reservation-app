import { useTranslation } from "next-i18next";
import React from "react";
import Text from "../../common/Text";
import { Container, styles } from "./styles";

export default function ProductTotal({ basket }) {
  const { t } = useTranslation("list");
  return (
    <Container>
      <Text {...styles.bigTitleStyle}>{t("list:totalOfProducts")}:</Text>
      <Text data-testid="totalPriceProducts" {...styles.secondaryTextStyle}>
        {t("list:total")}: {basket?.total} {basket?.currency}
      </Text>
      <Text data-testid="taxes" {...styles.secondaryTextStyle}>
        {t("list:taxes")} + {t("list:shipping")}: {basket?.taxes}{" "}
        {basket?.currency}
      </Text>
      <Text {...styles.subTitleStyle}>
        {t("list:generalTotal")}: {basket?.generalTotal} {basket?.currency}
      </Text>
    </Container>
  );
}
