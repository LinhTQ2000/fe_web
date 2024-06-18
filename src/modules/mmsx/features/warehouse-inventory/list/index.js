import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Guard from '~/components/Guard'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { FUNCTION_CODE } from '~/modules/mmsx/constants/functionCode'
import { ROUTE } from '~/modules/mmsx/routes/config'
import qs from '~/utils/qs'

import DeviceInventory from './device-inventory'
import SupplyInventory from './supply-inventory'
const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_INVENTORY.LIST.PATH,
    title: ROUTE.WAREHOUSE_INVENTORY.LIST.TITLE,
  },
]
function WarehouseInventory() {
  const { t } = useTranslation(['mmsx'])
  const [loading, setLoading] = useState(false)
  const { pathname, search } = useLocation()
  const history = useHistory()
  const { tab } = qs.parse(search)

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseInventory')}
      loading={loading}
    >
      <Tabs
        list={[
          t('warehouseInventory.deviceInventory.title'),
          t('warehouseInventory.supplyInventory.title'),
        ]}
        onChange={(tab) => {
          const newSearch = qs.add(search, {
            tab: tab,
          })
          history.push(`${pathname}?${newSearch}`)
        }}
        value={tab}
      >
        <Guard code={FUNCTION_CODE.LIST_INVENTORY_DEVICE_GROUP}>
          <DeviceInventory setLoading={setLoading} />
        </Guard>
        <Guard code={FUNCTION_CODE.LIST_INVENTORY_SUPPLY}>
          <SupplyInventory setLoading={setLoading} />
        </Guard>
      </Tabs>
    </Page>
  )
}

export default WarehouseInventory
