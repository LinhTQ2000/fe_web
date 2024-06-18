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
    transferTicket: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        deviceGroup: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        device: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })
}
