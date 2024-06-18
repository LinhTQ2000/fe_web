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
    supplyGroup: Yup.object().nullable().required(t('general:form.required')),
    price: Yup.number().nullable().required(t('general:form.required')),
    itemUnit: Yup.object().nullable().required(t('general:form.required')),
    supplyType: Yup.object().nullable().required(t('general:form.required')),
  })
}
