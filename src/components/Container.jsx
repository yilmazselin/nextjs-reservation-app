import styled from "styled-components";
import { containerWidths, responsive } from "../utils/helper";

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  ${responsive.sm`
  max-width:${containerWidths.sm};
`}
  ${responsive.md`
  max-width:${containerWidths.md};
`}
${responsive.lg`
    max-width:${containerWidths.lg};
`}
${responsive.xl`
max-width:${containerWidths.xl};
`}
  ${responsive.xxl`
  max-width:${containerWidths.xxl};
`}
${(props) => props.params};
`;

export default Container;
