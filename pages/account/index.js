import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Container from "../../src/components/Container";
import Layout from "../../src/components/Layout";
import { colors, fontSize, fontWeight } from "../../src/utils/styles";
import Text from "../../src/components/common/Text";
import UserCard from "../../src/components/Account/UserCard";
import TabBar from "../../src/components/common/TabBar";
import { SelectBox } from "../../src/components/Form";
import Button from "../../src/components/Buttons/Button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { localeOptions } from "../../src/utils/constant";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SubContainer = styled.div`
  height: calc(100vh - 104px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
`;

function Account() {
  const { t } = useTranslation("account");
  const router = useRouter();
  const { data } = useSession();

  const changeLocale = (e) => {
    const locale = e.target.value;
    router.push("/", "/account", { locale });
  };

  return (
    <Layout>
      <Container>
        <SubContainer>
          <Text
            color={colors.dark}
            fontSize={fontSize.xl}
            fontWeight={fontWeight.semiBold}
            params={{
              marginTop: 92,
            }}
          >
            {t("account:title")}
          </Text>
          <div>
            <UserCard currentLocale={router?.locale} data={data} />
            <SelectBox
              defaultValue={router?.locale}
              id="locale"
              label={t("common:labels.locale")}
              marginBottom={35}
              name="locale"
              onChange={changeLocale}
              options={localeOptions}
            />
          </div>
          <Button
            color="outline-primary"
            disabled={false}
            onClick={() => signOut()}
            role="signout-button"
            type="button"
          >
            {t("account:logout")}
          </Button>
        </SubContainer>
      </Container>
      <TabBar />
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["account", "common"])),
  },
});

export default Account;
