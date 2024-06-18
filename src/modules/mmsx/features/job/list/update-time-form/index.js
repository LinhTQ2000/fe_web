import { InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import { JOB_TYPE } from '~/modules/mmsx/constants'

function UpdateTimeForm({ tempItem }) {
  const { t } = useTranslation(['mmsx'])
  return (
    <>
      <LabelValue label={t('job.detail.workCode')} value={tempItem?.code} />
      <LabelValue
        label={t('job.performer')}
        value={tempItem?.assign?.username ?? tempItem?.assign?.name}
        sx={{ mt: 4 / 3 }}
      />
      {![JOB_TYPE.INSTALL].includes(tempItem?.type) && (
        <Field.TextField
          name="stopTime"
          label={t('job.detail.maintenanceInformation.stopTime')}
          placeholder={t('job.detail.maintenanceInformation.stopTime')}
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                {t('general:minutes')}
              </InputAdornment>
            ),
          }}
          sx={{ mt: 4 / 3 }}
        />
      )}
      <Field.TextField
        name="executionTime"
        label={t('job.detail.maintenanceInformation.maintenanceTime')}
        placeholder={t('job.detail.maintenanceInformation.maintenanceTime')}
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
              {t('general:minutes')}
            </InputAdornment>
          ),
        }}
        sx={{ mt: 4 / 3 }}
        required
      />
      <Field.TextField
        name="reason"
        label={t('job.note')}
        placeholder={t('job.note')}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.REASON.MAX,
        }}
        multiline
        sx={{ mt: 4 / 3 }}
        rows={3}
      />
    </>
  )
}

export default UpdateTimeForm
