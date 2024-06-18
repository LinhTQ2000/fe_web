import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    supplyRequest: Yup.object().nullable().required(t('general:form.required')),
    name: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        supply: Yup.object().nullable().required(t('general:form.required')),
        returnQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required')),
      }),
    ),
  })
}
