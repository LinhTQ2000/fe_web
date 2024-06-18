import { FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import Dialog from '~/components/Dialog'

import QuickAssignForm from '../list/quick-assign-form'

export default function DialogQuickAssign({
  open,
  onCancel,
  onSubmit,
  renderDeps,
  renderFooter,
  quickAssignValues,
}) {
  const { t } = useTranslation(['mmsx'])
  return (
    <Dialog
      open={open}
      title={t('job.quickAssign')}
      onCancel={onCancel}
      noBorderBottom
      formikProps={{
        initialValues: { items: quickAssignValues },
        onSubmit: onSubmit,
        validationSchema: Yup.object().shape({
          items: Yup.array().of(
            Yup.object().shape({
              assign: Yup.object()
                .nullable()
                .required(t('general:form.required')),
              plan: Yup.array()
                .nullable()
                .required(t('general:form.required'))
                .test('name', _, (value, context) => {
                  if (value && value?.some((item) => !item)) {
                    return context.createError({
                      message: t('general:form.required'),
                    })
                  }
                  return true
                }),
            }),
          ),
        }),
        enableReinitialize: true,
      }}
      maxWidth="xl"
      renderFooter={renderFooter}
      renderDeps={renderDeps}
    >
      <FieldArray name="items" render={() => <QuickAssignForm />} />
    </Dialog>
  )
}
