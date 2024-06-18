import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    type: Yup.number().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        beforeDate: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .min(
            0,
            t('general:form.minNumber', {
              min: 0,
            }),
          ),
      }),
    ),
  })
