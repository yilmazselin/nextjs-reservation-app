import { useTranslation } from "next-i18next"
import { Formik } from "formik"
import { Input, SelectBox } from "../Form"
import Button from "../Buttons/Button"
import Loader from "../common/Loader"
import { SignupSchema, initialValues, sleep } from "./SignupFormHelper"
import { localeOptions } from "../../utils/constant"

function SignupForm({ onSubmit }) {
  const { t } = useTranslation("auth")

  const handleSubmit = async (values) => {
    await sleep(500)
    onSubmit(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {({
        handleChange,
        values,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
      }) => (
        <form autoComplete="off">
          <Input
            error={touched.email ? errors.email : null}
            id="email"
            label={t("common:labels.email")}
            marginBottom={40}
            name="email"
            onChange={handleChange}
            type="email"
            value={values.email}
          />
          <Input
            error={touched.password ? errors.password : null}
            id="password"
            label={t("common:labels.password")}
            marginBottom={45}
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
          />
          <SelectBox
            defaultValue={values.locale}
            id="locale"
            label={t("common:labels.locale")}
            marginBottom={35}
            name="locale"
            onChange={handleChange}
            options={localeOptions}
          />
          <Button
            color="primary"
            disabled={
              isSubmitting ? isSubmitting : !values.password && !values.email
            }
            onClick={handleSubmit}
            role="submit-button"
            type="submit"
          >
            {!isSubmitting ? t("auth:signup-button") : <Loader />}
          </Button>
        </form>
      )}
    </Formik>
  )
}
export default SignupForm
