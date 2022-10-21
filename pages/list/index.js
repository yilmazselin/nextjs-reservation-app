import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "../../src/components/Container";
import Layout from "../../src/components/Layout";
import TabBar from "../../src/components/common/TabBar";
import ProductCard from "../../src/components/List/ProductCard";
import ProductTotal from "../../src/components/List/ProductTotal";
import { padding } from "../../src/utils/styles";
import { wrapper } from "../../src/redux/store";
import { useSelector } from "react-redux";
import {
  fetchProducts,
  product,
  basketData,
  productsData,
} from "../../src/redux/product/productSlice";
import styled from "styled-components";

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;
  }
  & > div {
    width: 100%;
    &:nth-child(2) {
      text-align: right;
      @media (max-width: 768px) {
        text-align: left;
      }
    }
  }
`;

function List(props) {
  const products = useSelector(productsData);
  const basket = useSelector(basketData);
  return (
    <Layout>
      <Container
        params={{
          marginTop: padding.md,
        }}
      >
        <SubContainer>
          <div>
            {products.map((x) => (
              <ProductCard
                id={x.id}
                name={x.name}
                description={x.description}
                rate={x.rate}
                distance={x.distance}
                price={x.price}
                currency={x.currency}
                image={x.image}
                key={x.id}
              />
            ))}
          </div>
          <ProductTotal basket={basket} />
        </SubContainer>
      </Container>
      <TabBar />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (props) => {
    await store.dispatch(fetchProducts());
    return {
      props: {
        ...(await serverSideTranslations(props.locale, ["list", "common"])),
      },
    };
  }
);

export default List;
