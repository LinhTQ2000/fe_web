import * as Yup from 'yup'


export const validateSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    unit: Yup.object().nullable().required(t('general:form.required')),
  })