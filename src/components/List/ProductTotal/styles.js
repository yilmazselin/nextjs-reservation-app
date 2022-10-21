import styled from "styled-components";
import { colors, fontSize, fontWeight, padding } from "../../../utils/styles";

export const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 33px;
`;

export const styles = {
  bigTitleStyle: {
    color: colors.zero,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.lg,
    params: {
      marginBottom: padding.md,
    },
  },
  secondaryTextStyle: {
    color: colors.zero,
    fontWeight: fontWeight.regular,
    fontSize: fontSize.nm,
    params: {
      marginBottom: padding.sm,
    },
  },
  subTitleStyle: {
    color: colors.zero,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    params: {
      marginTop: padding.md,
    },
  },
};
