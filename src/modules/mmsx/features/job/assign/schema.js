import * as Yup from 'yup'

export const validateSchema = (t) =>
  Yup.object().shape({
    expectExecutionDate: Yup.array()
      .nullable()
      .required(t('general:form.required'))
      .test('name', _, (value, context) => {
        if (value && value?.some((item) => !item)) {
          return context.createError({
            message: t('general:form.required'),
            path: context.path,
          })
        }
        return true
      }),
    assignId: Yup.object().nullable().required(t('general:form.required')),
  })
