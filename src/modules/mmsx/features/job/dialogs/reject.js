import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'

export default function DialogReject({ open, onCancel, onSubmit, tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('general:common.notify')}
      onCancel={onCancel}
      cancelLabel={t('general:common.no')}
      submitLabel={t('general:common.yes')}
      noBorderBottom
      formikProps={{
        initialValues: { reason: null },
        onSubmit: onSubmit,
        enableReinitialize: true,
      }}
      renderDeps={tempItem}
    >
      {t('general:common.confirmMessage.reject')}
      <LabelValue
        label={t('job.detail.workCode')}
        value={tempItem?.code}
        sx={{ mt: 4 / 3 }}
      />
      <Field.TextField
        name="reason"
        label={t('job.comment')}
        placeholder={t('job.comment')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.REASON.MAX,
        }}
        multiline
        rows={3}
      />
    </Dialog>
  )
}
