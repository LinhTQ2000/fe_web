import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    expectedTransferDay: Yup.date()
      .nullable()
      .required(t('general:form.required')),
    deviceRequest: Yup.object().nullable().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
    type: Yup.number().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        deviceGroup: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        quantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          ),
        // @TODO: linh.taquang wait cr
        // .test('name', '', (value, context) => {
        //   const quantity =
        //     listRequest?.find(
        //       (i) => i?.deviceGroupId === context?.parent?.deviceGroup,
        //     )?.quantity || 0
        //   if (value && quantity && value > quantity) {
        //     return context.createError({
        //       message: t('general:form.maxNumber', {
        //         max: quantity,
        //       }),
        //     })
        //   }
        //   return true
        // }),
      }),
    ),
  })
}
