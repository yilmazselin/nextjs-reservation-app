import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import Text from "../../src/components/common/Text";
import Container from "../../src/components/Container";
import Layout from "../../src/components/Layout";
import { colors, fontSize, fontWeight } from "../../src/utils/styles";
import SignupForm from "../../src/components/signup/SignupForm";
import TabBar from "../../src/components/common/TabBar";
import styled from "styled-components";

const SubContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function Signup() {
  const { status } = useSession();
  const { t } = useTranslation("auth");

  useEffect(() => {
    if (status === "authenticated") {
      Router.replace("/");
    }
  }, [status]);

  if (status == "loading" || status == "authenticated") {
    return;
  }

  const handleSubmit = async (form) => {
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      locale: form.locale,
      callbackUrl: `${window.location.origin}/${form.locale}/account`,
      redirect: true,
    });
  };

  return (
    <Layout title="Tapu.com | Üyelik">
      <Container>
        <SubContainer>
          <Text
            color={colors.dark}
            fontSize={fontSize.xl}
            fontWeight={fontWeight.semiBold}
            params={{
              marginTop: 92,
              marginBottom: 40,
            }}
          >
            {t("auth:signup-title")}
          </Text>
          <SignupForm onSubmit={handleSubmit} />
        </SubContainer>
      </Container>
      <TabBar />
    </Layout>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["auth", "common"])),
  },
});

export default Signup;
