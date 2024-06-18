import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateSchema = (t) => {
  return Yup.object().shape({
    stopTime: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
        }),
      ),
    executionTime: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
        }),
      ),
  })
}
