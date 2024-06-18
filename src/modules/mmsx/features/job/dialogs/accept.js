import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'

import AcceptanceForm from '../list/acceptance-form'
import { validateSchema } from '../list/acceptance-form/schema'

export default function DialogAccept({
  open,
  onCancel,
  onSubmit,
  renderDeps,
  renderFooter,
}) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('job.acceptance')}
      onCancel={onCancel}
      submitLabel={t('general:common.save')}
      noBorderBottom
      formikProps={{
        initialValues: {
          stopTime: renderDeps?.stopTime,
          executionTime: renderDeps?.executionTime,
        },
        onSubmit: onSubmit,
        validationSchema: validateSchema(t),
        enableReinitialize: true,
      }}
      renderDeps={renderDeps}
      maxWidth="xl"
      renderFooter={renderFooter}
    >
      <AcceptanceForm />
    </Dialog>
  )
}
