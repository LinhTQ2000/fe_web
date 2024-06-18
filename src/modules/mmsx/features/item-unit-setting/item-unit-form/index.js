import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
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
import { SOURCE_MANAGE_ENUM } from '~/modules/database/constants'
import useItemUnit from '~/modules/database/redux/hooks/useItemUnit'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/mmsx/constants'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { itemUnitSchema } from './schema'

function ItemUnitForm() {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const params = useParams()
  const { withSearch } = useQueryState()
  const {
    data: { isLoading, itemUnitDetails },
    actions,
  } = useItemUnit()
  const initialValues = isEmpty(itemUnitDetails)
    ? {
        code: '',
        name: '',
        description: '',
      }
    : pick(itemUnitDetails, ['code', 'name', 'description'])

  const MODE_MAP = {
    [ROUTE.ITEM_UNIT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ITEM_UNIT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const { t } = useTranslation(['database'])

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getItemUnitDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetItemUnitDetailsState()
    }
  }, [params?.id])

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: withSearch(ROUTE.ITEM_UNIT.LIST.PATH),
        title: ROUTE.ITEM_UNIT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ITEM_UNIT.CREATE.PATH,
          title: ROUTE.ITEM_UNIT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ITEM_UNIT.EDIT.PATH,
          title: ROUTE.ITEM_UNIT.EDIT.TITLE,
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
        return ROUTE.ITEM_UNIT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ITEM_UNIT.EDIT.TITLE
      default:
        break
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
    }
  }

  const backToList = () => {
    history.push(withSearch(ROUTE.ITEM_UNIT.LIST.PATH))
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createItemUnit(values, (data) =>
        history.push(ROUTE.ITEM_UNIT.DETAIL.PATH.replace(':id', data?.id)),
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      const paramUpdate = {
        id,
        ...values,
      }
      actions.updateItemUnit(paramUpdate, () =>
        history.push(ROUTE.ITEM_UNIT.DETAIL.PATH.replace(':id', id)),
      )
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={itemUnitSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset }) => (
              <Form>
                <HotKeys
                  handlers={{
                    onBack: backToList,
                    onReset: handleReset,
                  }}
                />
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>{t('general:common.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={itemUnitDetails?.active}
                          />
                        }
                      />
                    </Grid>
                  )}
                  {isUpdate && (
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('itemUnitDefine.code')}
                        name="code"
                        placeholder={t('itemUnitDefine.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('itemUnitDefine.name')}
                      placeholder={t('itemUnitDefine.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      disabled={
                        itemUnitDetails?.manageBy === SOURCE_MANAGE_ENUM.WFX &&
                        isUpdate
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('itemUnitDefine.description')}
                      placeholder={t('itemUnitDefine.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ItemUnitForm
