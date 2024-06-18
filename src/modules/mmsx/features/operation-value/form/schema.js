import * as Yup from 'yup'

export const validateSchema = ({ t, operationIndexes }) => {
  const schema = {
    date: Yup.date().nullable().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
  }
  operationIndexes?.forEach((operationIndex) => {
    let parameterSchema = {}
    operationIndex?.parameters?.forEach((parameter) => {
      parameterSchema[parameter?.id] = Yup.number()
        .nullable()
        .required(t('general:form.required'))
        .min(
          0,
          t('general:form.minNumber', {
            min: 0,
          }),
        )
    })
    schema[operationIndex.id] = Yup.object().shape(parameterSchema)
  })
  return Yup.object().shape(schema)
}
