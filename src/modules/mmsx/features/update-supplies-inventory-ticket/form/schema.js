import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        supply: Yup.object().nullable().required(t('general:form.required')),
        warehouse: Yup.object().nullable().required(t('general:form.required')),
        updatedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required')),
      }),
    ),
  })
}
