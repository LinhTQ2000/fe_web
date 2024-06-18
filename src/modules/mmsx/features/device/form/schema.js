import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const deviceSchema = (t) =>
  Yup.object().shape({
    identificationNo: Yup.string()
      .nullable()
      .required(t('general:form.required')),
    serial: Yup.string().required(t('general:form.required')),
    status: Yup.number().nullable().required(t('general:form.required')),
    deviceGroup: Yup.object().nullable().required(t('general:form.required')),
    deviceName: Yup.object().nullable().required(t('general:form.required')),
    factory: Yup.object().nullable().required(t('general:form.required')),
    creationDate: Yup.date().nullable().required(t('general:form.required')),
    initMaintenanceDate: Yup.date()
      .nullable()
      .required(t('general:form.required')),
    model: Yup.string().required(t('general:form.required')),
    producer: Yup.string().required(t('general:form.required')),
    type: Yup.number().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        supply: Yup.object().nullable().required(t('general:form.required')),
        quantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.QUANTITY.MIN,
            }),
          ),
      }),
    ),
  })
