import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { useQueryState } from '~/common/hooks/useQueryState'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import HotKeys from '~/components/HotKeys'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import useMaintenanceTeam from '~/modules/mmsx/redux/hooks/useMaintenanceTeam'
import { searchAreaApi } from '~/modules/mmsx/redux/sagas/area/search'
import { searchDeviceGroupApi } from '~/modules/mmsx/redux/sagas/device-group/search'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import { validateSchema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  memberName: null,
  role: null,
  area: [],
  deviceGroup: [],
}

const MaintenanceTeamForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { withSearch } = useQueryState()

  const {
    data: { maintenanceTeamDetail, isLoading },
    actions,
  } = useMaintenanceTeam()

  const MODE_MAP = {
    [ROUTE.MAINTENANCE_TEAM.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MAINTENANCE_TEAM.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(withSearch(ROUTE.MAINTENANCE_TEAM.LIST.PATH))
  }

  const initialValues = {
    code: maintenanceTeamDetail?.code || '',
    name: maintenanceTeamDetail?.name || '',
    description: maintenanceTeamDetail?.description || '',
    factory: maintenanceTeamDetail?.factory || null,
    areas: maintenanceTeamDetail?.areas || [],
    deviceGroups: maintenanceTeamDetail?.deviceGroups || [],
    items: maintenanceTeamDetail?.members?.map((i) => ({
      id: i?.userId,
      memberName: { ...i, id: i?.userId },
      area: i?.areas,
      deviceGroup: i?.deviceGroups,
      ...i,
    })) || [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getDetailMaintenanceTeamStart(id)
    }
    return () => {
      if (isUpdate) actions.resetMaintenanceTeam()
    }
  }, [id])

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      factoryId: values?.factory?.id,
      areaIds: map(values?.areas, 'id'),
      deviceGroupIds: map(values?.deviceGroups, 'id'),
      members: values.items?.map((item) => ({
        userId: item.memberName?.id || item.memberName?.userId,
        role: item.role,
        areaIds: item?.area?.map((i) => i?.id),
        deviceGroupIds: item?.deviceGroup?.map((i) => i?.id),
      })),
    }

    if (!isUpdate) {
      actions.createMaintenanceTeamStart(convertValues, (data) =>
        history.push(
          ROUTE.MAINTENANCE_TEAM.DETAIL.PATH.replace(':id', data?.id),
        ),
      )
    } else {
      actions.updateMaintenanceTeamStart({ ...convertValues, id }, () =>
        history.push(ROUTE.MAINTENANCE_TEAM.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.MAINTENANCE_TEAM.LIST.PATH),
        title: ROUTE.MAINTENANCE_TEAM.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_TEAM.CREATE.PATH,
          title: ROUTE.MAINTENANCE_TEAM.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_TEAM.EDIT.PATH,
          title: ROUTE.MAINTENANCE_TEAM.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MAINTENANCE_TEAM.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MAINTENANCE_TEAM.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <HotKeys
              handlers={{
                onBack: backToList,
                onReset: handleReset,
              }}
            />
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <>
                      <Grid item xs={12}>
                        <LabelValue label={t('common.status')}>
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={maintenanceTeamDetail?.active}
                          />
                        </LabelValue>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          name="code"
                          label={t('maintenanceTeam.team.code')}
                          placeholder={t('maintenanceTeam.team.code')}
                          disabled
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="name"
                      label={t('maintenanceTeam.team.name')}
                      placeholder={t('maintenanceTeam.team.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="factory"
                      label={t('maintenanceTeam.factory')}
                      placeholder={t('maintenanceTeam.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={() => {
                        setFieldValue('deviceGroups', [])
                        setFieldValue('areas', [])
                        setFieldValue('items', initialValues.items)
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="deviceGroups"
                      label={t('maintenanceTeam.team.deviceGroup')}
                      placeholder={t('maintenanceTeam.team.deviceGroup')}
                      asyncRequest={(s) =>
                        searchDeviceGroupApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                            factoryId: values?.factory?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      asyncRequestDeps={values?.factory}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="areas"
                      label={t('maintenanceTeam.team.area')}
                      placeholder={t('maintenanceTeam.team.area')}
                      asyncRequest={(s) =>
                        searchAreaApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            active: ACTIVE_STATUS.ACTIVE,
                            factoryId: values?.factory?.id,
                          }),
                        })
                      }
                      asyncRequestDeps={values?.factory}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('maintenanceTeam.team.description')}
                      placeholder={t('maintenanceTeam.team.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box mt={3}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemsSettingTable
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
                    mode={mode}
                    factoryId={values?.factory?.id}
                    deviceGroups={values?.deviceGroups}
                    areas={values?.areas}
                  />
                )}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default MaintenanceTeamForm
