import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { first } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TABLE_VIEW_LIMIT } from '~/common/constants'
import LabelValue from '~/components/LabelValue'
import Tabs from '~/components/Tabs'
import { JOB_TYPE } from '~/modules/mmsx/constants'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import { convertUtcDateToLocalTz } from '~/utils'

import TableHistory from '../history-table'

const MaintainTable = (props) => {
  const { values, deviceId } = props
  const { t } = useTranslation(['mmsx'])

  const {
    data: { maintenanceInfo },
    actions,
  } = useDefineDevice()

  const {
    data: { deviceDetail },
  } = useDefineDevice()

  useEffect(() => {
    if (deviceId) {
      const params = {
        limit: TABLE_VIEW_LIMIT,
        id: deviceId,
      }
      actions.getDeviceMaintenanceInfo(params)
    }
  }, [deviceId])

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.tableMaintenance.installTemplate')}
                value={values?.installationTemplate?.name}
              />
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.tableMaintenance.maintenanceTemplate')}
                value={values?.maintenanceTemplate?.name}
              />
            </Grid> */}
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.tableMaintenance.accrediationTemplate')}
                value={values?.accreditationTemplate?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.lastAccreditationDate')}
                value={convertUtcDateToLocalTz(
                  deviceDetail?.lastAccreditationDate,
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.lastMaintenanceDate')}
                value={convertUtcDateToLocalTz(
                  deviceDetail?.lastMaintenanceDate,
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.maintenanceDate')}
                value={convertUtcDateToLocalTz(
                  first(maintenanceInfo)?.planDate,
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.mtbfDate')}
                value={convertUtcDateToLocalTz(
                  first(maintenanceInfo)?.planDateByMtbf,
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.mttfDate')}
                value={convertUtcDateToLocalTz(
                  first(maintenanceInfo)?.planDateByMttf,
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.form.mttr')}
                value={
                  first(maintenanceInfo)?.mttr
                    ? `${first(maintenanceInfo)?.mttr} ${t('general:minutes')}`
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('deviceList.form.mtta')}
                value={
                  first(maintenanceInfo)?.mtta
                    ? `${first(maintenanceInfo)?.mtta} ${t('general:minutes')}`
                    : null
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Tabs
          list={[
            t('deviceList.tableMaintenance.checkList'),
            t('deviceList.tableMaintenance.installation'),
            t('deviceList.tableMaintenance.accrediation'),
            t('deviceList.tableMaintenance.maintain'),
            t('deviceList.tableMaintenance.jobRepair'),
          ]}
          sx={{ mt: 3 }}
        >
          <TableHistory deviceId={deviceId} type={JOB_TYPE.PERIOD_CHECK} />
          <TableHistory deviceId={deviceId} type={JOB_TYPE.INSTALL} />
          <TableHistory deviceId={deviceId} type={JOB_TYPE.ACCREDITATION} />
          <TableHistory deviceId={deviceId} type={JOB_TYPE.SCHEDULE_MAINTAIN} />
          <TableHistory deviceId={deviceId} type={JOB_TYPE.REQUEST} />
        </Tabs>
      </Grid>
    </>
  )
}

MaintainTable.defaultProps = {
  accessoriesMaintenanceInformation: [],
  mode: '',
  deviceDetail: {},
}

MaintainTable.propTypes = {
  accessoriesMaintenanceInformation: PropTypes.array,
  mode: PropTypes.string,
  deviceDetail: PropTypes.shape(),
}

export default MaintainTable
