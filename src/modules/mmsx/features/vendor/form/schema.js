import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const validateSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    phone: phoneSchema(t).required(t('general:form.required')),
  })
