import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().nullable().required(t('general:form.required')),
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        supply: Yup.object().nullable().required(t('general:form.required')),
        quantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          ),
      }),
    ),
  })
}
