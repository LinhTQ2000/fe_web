import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        updatedWarehouse: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        updatedArea: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        updatedStatus: Yup.number()
          .nullable()
          .required(t('general:form.required')),
      }),
    ),
  })
}
