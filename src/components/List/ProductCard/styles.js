import styled from "styled-components";
import { colors, fontSize, fontWeight, padding } from "../../../utils/styles";

export const Container = styled.div`
  border-bottom: 1px solid #f1f3f5;
  padding-top: ${padding.sm}px;
  padding-bottom: ${padding.sm}px;
`;

export const SubContainer = styled.div`
  display: flex;
`;

export const ProductImageWrapper = styled.div`
  height: 75px;
  position: relative;
  display: inline-block;
  border-radius: 12px;
  filter: drop-shadow(0px 10px 15px #c8c9cd);
  img {
    display: block;
    width: auto;
    border-radius: 12px;
  }
  &:after {
    content: "";
    border-radius: 12px;
    position: absolute;
    left: 0%;
    top: 0px;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 41.03%,
      rgba(0, 0, 0, 0) 41.03%,
      rgba(0, 0, 0, 0.8) 84.62%
    );
  }
`;

export const ProductInfoWrapper = styled.div`
  margin-left: ${padding.sm}px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;

  &:nth-child(2) {
    margin-left: ${padding.md}px;
  }
`;
export const PriceWrapper = styled.div`
  margin-top: ${padding.xs + 2}px;
`;

export const AddBasket = styled.button`
  margin-top: ${padding.xs + 2}px;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const styles = {
  buttonTextStyle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.blue,
    params: {
      letterSpacing: "0.1px",
      marginLeft: padding.xs,
      textTransform: "uppercase",
    },
  },
  smallTextStyle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    color: colors.dark,
    params: {
      letterSpacing: "0.1px",
    },
  },
  productSubTitleStyle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    color: colors.gray,
    params: {
      letterSpacing: "0.1px",
      marginTop: padding.xs + 2,
      marginBottom: padding.xs + 2,
    },
  },
  productTitleStyle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semiBold,
    color: colors.dark,
    params: {
      letterSpacing: "0.1px",
    },
  },
};
