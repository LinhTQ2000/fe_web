import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    formType: Yup.number().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        role: Yup.string().required(t('general:form.required')),
        name: Yup.string().required(t('general:form.required')),
      }),
    ),
  })
