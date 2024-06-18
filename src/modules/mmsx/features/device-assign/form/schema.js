import * as Yup from 'yup'

export const validateSchema = (t) => {
  return Yup.object().shape({
    assignDate: Yup.date().nullable().required(t('general:form.required')),
    deviceRequest: Yup.object().nullable().required(t('general:form.required')),
  })
}
