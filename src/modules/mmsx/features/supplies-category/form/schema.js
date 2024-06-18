import * as Yup from 'yup'

export const validateSchema = (t) =>
  Yup.object().shape({
    // code: Yup.string()
    //   .required(t('general:form.required'))
    //   .min(
    //     TEXTFIELD_REQUIRED_LENGTH.CODE.MIN,
    //     t('general:form.minLength', {
    //       min: TEXTFIELD_REQUIRED_LENGTH.CODE.MIN,
    //     }),
    //   ),
    name: Yup.string().required(t('general:form.required')),
  })
