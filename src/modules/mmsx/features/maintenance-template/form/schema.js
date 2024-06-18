import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import {
  MAX_NUMBER_OF_FILE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import { MAINTENANCE_JOB_TYPE } from '~/modules/database/constants'

export const validateSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    files: Yup.array().test('name', _, (value, context) => {
      if (value.length > MAX_NUMBER_OF_FILE) {
        return context.createError()
      }
      return true
    }),
    items: Yup.array().of(
      Yup.object()
        .shape({
          title: Yup.string().required(t('general:form.required')),
          description: Yup.string(),
          type: Yup.number().nullable().required(t('general:form.required')),
          periodTime: Yup.number()
            .nullable()
            .required(t('general:form.required'))
            .min(
              NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_FLOAT.MIN,
              t('general:form.minNumber', {
                min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_FLOAT.MIN,
              }),
            ),
          checklistTemplate: Yup.object().nullable(),
        })
        .test('name', '', (value, context) => {
          if (
            context?.parent?.some(
              (item) => item?.title === value?.title && item?.id !== value.id,
            )
          ) {
            return context.createError({
              message: t('maintenanceTemplate.alertTitle'),
              path: `${context.path}.title`,
            })
          } else if (
            value?.type === MAINTENANCE_JOB_TYPE.CHECK &&
            isEmpty(value?.checklistTemplate)
          ) {
            return context.createError({
              message: t('general:form.required'),
              path: `${context.path}.checklistTemplate`,
            })
          }
          return true
        }),
    ),
  })
