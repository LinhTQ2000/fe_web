import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
    deviceGroup: Yup.array().min(1, t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number().nullable().required(t('general:form.required')),
      }),
    ),
  })
}
