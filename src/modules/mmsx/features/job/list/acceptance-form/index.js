import { Grid, InputAdornment, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Status from '~/components/Status'
import {
  JOB_STATUS_LIST,
  JOB_STATUS_MAP,
  JOB_TYPE,
  JOB_TYPE_MAP,
} from '~/modules/mmsx/constants'
import useJob from '~/modules/mmsx/redux/hooks/useJob'

import ItemSettingTable from '../../detail/item-setting-table'
import SupplyTable from '../../detail/supply-table'

function AcceptanceForm() {
  const { t } = useTranslation(['mmsx'])

  const {
    data: { jobDetail },
  } = useJob()

  return (
    <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 11, xs: 12 }}>
      <Grid item xs={12}>
        <Typography variant="h3" mt={1}>
          {t('job.detail.maintenanceInformation.title')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LV
          label={t('job.status')}
          value={
            jobDetail?.isOverdue ? (
              <Typography
                component="span"
                sx={{
                  display: 'inline-block',
                  color: 'error',
                }}
                variant="contained"
              >
                {`${t(JOB_STATUS_MAP[jobDetail?.status])} - ${t(
                  'common.statusList.overdue',
                )}`}
              </Typography>
            ) : (
              <Status options={JOB_STATUS_LIST} value={jobDetail?.status} />
            )
          }
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LV label={t('job.detail.workCode')} value={jobDetail?.code} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LV
          label={t('job.detail.workType')}
          value={t(JOB_TYPE_MAP[jobDetail?.type])}
        />
      </Grid>
      <Grid item xs={12}>
        <LV
          label={t('job.detail.description')}
          value={jobDetail?.description}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" mt={1}>
          {t('job.detail.deviceInformation.title')}
        </Typography>
      </Grid>
      <Grid item lg={6} xs={12}>
        <LV label={t('job.detail.serial')} value={jobDetail?.device?.serial} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LV
          label={t('job.detail.deviceName')}
          value={jobDetail?.device?.name}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LV
          label={t('job.detail.deviceInformation.factory')}
          value={jobDetail?.device?.factory?.name}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <LV
          label={t('job.detail.deviceInformation.area')}
          value={jobDetail?.device?.area?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" mt={1}>
          {t('job.detail.maintenanceInformation.maintenanceTime')}
        </Typography>
      </Grid>
      {![JOB_TYPE.INSTALL].includes(jobDetail?.type) && (
        <Grid item lg={6} xs={12}>
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
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        </Grid>
      )}
      <Grid item lg={6} xs={12}>
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
          allow={TEXTFIELD_ALLOW.NUMERIC}
          required
        />
      </Grid>
      {[
        JOB_TYPE.ACCREDITATION,
        JOB_TYPE.INSTALL,
        JOB_TYPE.PERIOD_CHECK,
      ].includes(jobDetail?.type) && (
        <>
          <Grid item xs={12}>
            <ItemSettingTable />
          </Grid>
          <Grid item xs={12}>
            <LV
              label={t('job.detail.result')}
              value={
                jobDetail?.result?.result
                  ? t('jobList.checklistDetail.pass')
                  : t('jobList.checklistDetail.fail')
              }
              mt={4 / 3}
            />
          </Grid>
        </>
      )}
      {/* Table */}
      {[JOB_TYPE.SCHEDULE_MAINTAIN, JOB_TYPE.REQUEST].includes(
        jobDetail?.type,
      ) && (
        <Grid item xs={12}>
          <SupplyTable />
        </Grid>
      )}
    </Grid>
  )
}

export default AcceptanceForm
