import * as Yup from "yup"

export const initialValues = {
  email: "",
  password: "",
  locale: "tr"
}

export const SignupSchema = Yup.object().shape({
  email: Yup.string().
    required("Bu alan zorunludur.").
    email("E-posta adresi doğrulanamadı."),
  password: Yup.string().required("Bu alan zorunludur.")
})

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
