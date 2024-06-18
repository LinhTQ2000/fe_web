import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import Dialog from '~/components/Dialog'
import { JOB_TYPE } from '~/modules/mmsx/constants'

import UpdateTimeForm from '../list/update-time-form'

export default function DialogUpdateTime({
  open,
  onCancel,
  onSubmit,
  tempItem,
}) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('job.updateTime')}
      onCancel={onCancel}
      cancelLabel={t('general:common.cancel')}
      submitLabel={t('general:common.accept')}
      noBorderBottom
      formikProps={{
        initialValues: { reason: '', stopTime: null, executionTime: null },
        validationSchema: Yup.object().shape({
          ...(![JOB_TYPE.INSTALL].includes(tempItem?.type)
            ? {
                stopTime: Yup.number()
                  .nullable()
                  .min(
                    NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
                    t('general:form.minNumber', {
                      min: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
                    }),
                  )
                  .max(
                    NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
                    t('general:form.maxNumber', {
                      max: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
                    }),
                  ),
              }
            : {}),
          executionTime: Yup.number()
            .nullable()
            .required(t('general:form.required'))
            .min(
              NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
              t('general:form.minNumber', {
                min: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MIN,
              }),
            )
            .max(
              NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
              t('general:form.maxNumber', {
                max: NUMBER_FIELD_REQUIRED_SIZE.TIME_QUANTITY.MAX,
              }),
            ),
        }),
        onSubmit: onSubmit,
        enableReinitialize: true,
      }}
      renderDeps={tempItem}
    >
      <UpdateTimeForm tempItem={tempItem} />
    </Dialog>
  )
}
