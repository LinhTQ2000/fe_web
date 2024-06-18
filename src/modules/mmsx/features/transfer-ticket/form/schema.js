import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    transferDay: Yup.date().nullable().required(t('general:form.required')),
    transferRequest: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        device: Yup.object().nullable().required(t('general:form.required')),
        deviceGroup: Yup.object()
          .nullable()
          .required(t('general:form.required')),
      }),
    ),
  })
}
