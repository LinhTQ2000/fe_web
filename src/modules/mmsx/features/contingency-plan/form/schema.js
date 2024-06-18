import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateSchema = (t, totalAmount) => {
  return Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    time: Yup.array().nullable().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
    checklist: Yup.array().of(
      Yup.object()
        .shape({})
        .test('name', _, (value, context) => {
          // validate 2% totalAmount
          if (
            value?.totalCostConfirmed &&
            totalAmount &&
            value?.totalCostConfirmed > (totalAmount * 2) / 100
          ) {
            return context.createError({
              message: t('general:form.maxNumber', {
                max: (totalAmount * 2) / 100,
              }),
              path: `${context.path}.totalCostConfirmed`,
            })
          }
          // validate 1,24% totalAmount
          if (
            value?.otherTotalCostConfirmed &&
            totalAmount &&
            value?.otherTotalCostConfirmed > (totalAmount * 1.24) / 100
          ) {
            return context.createError({
              message: t('general:form.maxNumber', {
                max: (totalAmount * 1.24) / 100,
              }),
              path: `${context.path}.otherTotalCostConfirmed`,
            })
          }
          return true
        }),
    ),
    items: Yup.array().of(
      Yup.object().shape({
        supplyGroup: Yup.object()
          .nullable()
          .required(t('general:form.required')),
        supply: Yup.object().nullable().required(t('general:form.required')),
        proposalQuantity: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            }),
          )
          .required(t('general:form.required')),
      }),
    ),
  })
}
