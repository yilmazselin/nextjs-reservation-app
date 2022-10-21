import React, { memo } from "react";
import Image from "next/image";
import { colors, padding } from "../../../utils/styles";
import Icon from "../../common/Icon";
import Text from "../../common/Text";
import { useTranslation } from "next-i18next";
import {
  Container,
  SubContainer,
  ProductImageWrapper,
  Row,
  PriceWrapper,
  ProductInfoWrapper,
  AddBasket,
  styles,
} from "./styles";
import { useDispatch } from "react-redux";
import { setBasketData } from "../../../redux/product/productSlice";
import { useState } from "react";

function ProductCard({
  id,
  name,
  description,
  rate,
  distance,
  price,
  currency,
  image,
}) {
  const [added, setAdded] = useState(false);

  const { t } = useTranslation("list");
  const dispatch = useDispatch();

  const addBasket = (number) => {
    setAdded(!added);

    let addedProduct = {
      id,
      price: price * number,
    };

    dispatch(setBasketData(addedProduct));
  };

  return (
    <Container>
      <SubContainer>
        <ProductImageWrapper>
          <Image width={75} height={75} loading="lazy" src={image} />
        </ProductImageWrapper>
        <ProductInfoWrapper>
          <Text {...styles.productTitleStyle}>{name}</Text>
          <Text {...styles.productSubTitleStyle}>{description}</Text>
          <Row>
            <Row>
              <Icon
                icon="star"
                size={14}
                style={{ marginRight: padding.xs / 2 }}
                color={colors.yellow}
              />
              <Text {...styles.smallTextStyle}>{rate}</Text>
            </Row>
            <Row>
              <Icon
                icon="location"
                size={14}
                style={{ marginRight: padding.xs / 2 }}
                color={colors.green}
              />
              <Text {...styles.smallTextStyle}>{distance}</Text>
            </Row>
          </Row>
          <PriceWrapper>
            <Text {...styles.smallTextStyle}>
              {t("list:price")} {price} {currency}
            </Text>
          </PriceWrapper>
        </ProductInfoWrapper>
      </SubContainer>
      {!added ? (
        <AddBasket data-testid="add-basket" onClick={() => addBasket(1)}>
          <Icon icon="plus" size={20} color={colors.blue} />
          <Text {...styles.buttonTextStyle}>{t("list:addBasket")}</Text>
        </AddBasket>
      ) : (
        <AddBasket data-testid="remove-basket" onClick={() => addBasket(-1)}>
          <Icon icon="plus" size={20} color={colors.red} />
          <Text {...styles.buttonTextStyle} color={colors.red}>
            {t("list:removeBasket")}
          </Text>
        </AddBasket>
      )}
    </Container>
  );
}

export default memo(ProductCard);
