import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import { WAREHOUSE_EXPORT_REQUEST_TYPE } from '~/modules/mmsx/constants'

export const validateSchema = (t, type) => {
  return Yup.object().shape({
    warehouseExportRequest: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    requestType: Yup.number().nullable().required(t('general:form.required')),
    exportDate: Yup.date().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .nullable()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MAX,
            }),
          )
          .test('name', '', (value, context) => {
            if (
              type === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            if (
              type === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST &&
              value &&
              context.parent?.supply?.remainQuantity !== null &&
              +value > +context.parent?.supply?.remainQuantity
            ) {
              return context.createError({
                message: t('warehouseImportRequest.validQuantity'),
              })
            }
            return true
          }),
        supply: Yup.object()
          .nullable()
          .test('name', '', (value, context) => {
            if (
              type === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            return true
          }),
        supplyType: Yup.object()
          .nullable()
          .test('name', '', (value, context) => {
            if (
              type === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            return true
          }),
        supplyGroup: Yup.object()
          .nullable()
          .test('name', '', (value, context) => {
            if (
              type === WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            return true
          }),
        deviceGroup: Yup.object()
          .nullable()
          .test('name', '', (value, context) => {
            if (
              [
                WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
                WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET,
              ].includes(type) &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            return true
          }),
        device: Yup.object()
          .nullable()
          .test('name', '', (value, context) => {
            if (
              [
                WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
                WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET,
              ].includes(type) &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            return true
          }),
      }),
    ),
  })
}
