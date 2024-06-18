import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const validateSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('general:form.required')),
    symbol: Yup.string()
      .required(t('general:form.required'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.SYMBOL.MIN,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.SYMBOL.MIN,
        }),
      ),
    deviceType: Yup.object().nullable().required(t('general:form.required')),
    deviceCategory: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    maintenanceProperty: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    accreditationTemplate: Yup.object()
      .nullable()
      .test('name', _, (value, context) => {
        if (!value && context.parent.isAccreditation) {
          return context.createError({
            message: t('general:form.required'),
            path: context.path,
          })
        }
        return true
      }),
    installationTemplate: Yup.object()
      .nullable()
      .test('name', _, (value, context) => {
        if (!value && context.parent.isSetup) {
          return context.createError({
            message: t('general:form.required'),
            path: context.path,
          })
        }
        return true
      }),
    errorType: Yup.array().min(1, t('general:form.required')),
    attributeType: Yup.array().min(1, t('general:form.required')),
    frequency: Yup.number().nullable().required(t('general:form.required')),
    itemInfo: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .required(t('general:form.required')),
        supply: Yup.object().nullable().required(t('general:form.required')),
        usageTime: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          ),
      }),
    ),
    itemMaintane: Yup.array().of(
      Yup.object().shape({
        frequency: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .required(t('general:form.required')),
        mtbf: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .required(t('general:form.required')),
        mttr: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .required(t('general:form.required')),
        mtta: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .required(t('general:form.required')),
        mttf: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .required(t('general:form.required')),
      }),
    ),
  })
