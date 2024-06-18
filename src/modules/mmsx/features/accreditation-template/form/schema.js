import * as Yup from 'yup'

import { MAX_NUMBER_OF_FILE } from '~/common/constants'

export const validateSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    periodic: Yup.number().nullable().required(t('general:form.required')),
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
          description: Yup.string()
            .nullable()
            .required(t('general:form.required')),
        })
        .test('name', '', (value, context) => {
          if (
            context?.parent?.some(
              (item) => item?.title === value?.title && item?.id !== value.id,
            )
          ) {
            return context.createError({
              message: t('accreditationTemplate.alertTitle'),
              path: `${context.path}.title`,
            })
          }
          return true
        }),
    ),
  })
