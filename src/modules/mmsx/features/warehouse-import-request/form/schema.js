import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import { WAREHOUSE_IMPORT_REQUEST_TYPE } from '~/modules/mmsx/constants'

export const validateSchema = (t, type) => {
  let validateFormCode = {}
  switch (type) {
    case WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST:
      validateFormCode = {
        deviceRequest: Yup.object()
          .nullable()
          .required(t('general:form.required')),
      }
      break

    case WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST:
      validateFormCode = {
        supplyRequest: Yup.object()
          .nullable()
          .required(t('general:form.required')),
      }
      break

    case WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET:
      validateFormCode = {
        transferTicket: Yup.object()
          .nullable()
          .required(t('general:form.required')),
      }
      break

    default:
      break
  }
  const toFactory = [
    WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
    WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
  ].includes(type)
    ? {
        toFactory: Yup.object().nullable().required(t('general:form.required')),
      }
    : {}

  return Yup.object().shape({
    ...validateFormCode,
    ...toFactory,
    name: Yup.string().required(t('general:form.required')),
    requestType: Yup.number().nullable().required(t('general:form.required')),
    importDate: Yup.date().nullable().required(t('general:form.required')),
    warehouse: Yup.object().nullable().required(t('general:form.required')),
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
              [
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
              ].includes(type) &&
              !value
            ) {
              return context.createError({
                message: t('general:form.required'),
              })
            }
            if (
              type === WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST &&
              value &&
              context.parent?.remainQuantity !== null &&
              +value > +context.parent?.remainQuantity
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
              [
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
              ].includes(type) &&
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
              [
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
              ].includes(type) &&
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
              [
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
              ].includes(type) &&
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
                WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET,
                WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
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
                WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
                WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET,
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
