import * as Yup from 'yup'

export const errorTypeSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    priority: Yup.number().nullable().required(t('general:form.required')),
  })
}
