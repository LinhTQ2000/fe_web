import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateSchema = ({ t, attributes }) => {
  const schema = {
    toDate: Yup.date().nullable().required(t('general:form.required')),
    fromDate: Yup.date().nullable().required(t('general:form.required')),
    status: Yup.number().nullable().required(t('general:form.required')),
  }

  if (!isEmpty(attributes)) {
    attributes.forEach((att) => {
      schema[att.id] = Yup.number()
        // .required(t('general:form.required'))
        .min(
          NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
          t('general:form.minNumber', {
            min: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
          }),
        )
        .nullable()
    })
  }

  return Yup.object().shape({
    items: Yup.array().of(Yup.object().shape({ ...schema })),
  })
}
