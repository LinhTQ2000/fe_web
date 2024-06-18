import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    time: Yup.array().nullable().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
  })
}
