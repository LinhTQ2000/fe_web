import React, { useMemo } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { useYupValidationResolver } from '~/common/hooks/useYupValidationResolver'

export default function Form({
  defaultValues,
  children,
  onSubmit,
  validationSchema,
}) {
  const resolver = validationSchema
    ? typeof validationSchema === 'function'
      ? useYupValidationResolver(validationSchema())
      : useYupValidationResolver(validationSchema)
    : undefined
  const method = useForm({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
    resolver,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    values: defaultValues,
  })

  const { handleSubmit } = method

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>{children(method)}</form>
    </FormProvider>
  )
}
