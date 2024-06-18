import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    unit: Yup.string().required(t('general:form.required')),
    factories: Yup.array().min(1, t('general:form.required')),
    items: Yup.array().of(
      Yup.object()
        .shape({
          name: Yup.string()
            .required(t('general:form.required'))
            .max(
              TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
              t('general:form.maxLength', {
                max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
              }),
            ),
        })
        .test('name', '', (value, context) => {
          if (
            context?.parent?.some(
              (item) => item?.name === value?.name && item?.id !== value.id,
            )
          ) {
            return context.createError({
              message: t('operationIndex.alertTitle'),
              path: `${context.path}.name`,
            })
          }
          return true
        }),
    ),
  })
