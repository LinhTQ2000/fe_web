import { combineReducers } from 'redux'

import accreditationTemplate from './accreditation-template'
import areaDefine from './area'
import articleDevice from './article-device'
import attributeType from './attribute-type'
import commonManagement from './common'
import contingencyPlan from './contingency-plan'
import createPlanList from './create-plan'
import dashboard from './dashboard'
import defectList from './defect-list'
import defineDevice from './define-device'
import defineInstallTemplate from './define-installation-template'
import supplies from './define-supplies'
import defineUnit from './define-unit'
import defineVendor from './define-vendor'
import deviceAssign from './device-assign'
import deviceGroup from './device-group'
import deviceInventory from './device-inventory'
import deviceName from './device-name'
import deviceStatus from './device-status'
import deviceStatusReport from './device-status-report'
import deviceType from './device-type'
import errorType from './error-type'
import itemGroupSetting from './item-group-setting'
import job from './job'
import jobDraftList from './job-draft'
import maintainRequest from './maintain-request'
import maintainanceProgress from './maintainance-progress'
import maintenanceAttribute from './maintenance-attribute'
import maintenancePlan from './maintenance-plan'
import maintenanceTeam from './maintenance-team'
import maintenanceTemplate from './maintenance-template'
import operationIndex from './operation-index'
import operationValue from './operation-value'
import planList from './plan-list'
import repairRequest from './repair-request'
import report from './report'
import requestDevice from './request-device'
import setting from './setting'
import signatureConfiguration from './signature-configuration'
import suppliesCategory from './supplies-category'
import suppliesInventory from './supplies-inventory'
import suppliesRequest from './supplies-request'
import supplyType from './supply-type'
import templateCheckList from './template-checklist'
import transferRequest from './transfer-request'
import transferTicket from './transfer-ticket'
import warehouseDefine from './warehouse-define'
import warehouseExportManagement from './warehouse-export-management'
import warehouseExportTicket from './warehouse-export-ticket'
import warehouseImportManagement from './warehouse-import-management'
import warehouseImportRequest from './warehouse-import-request'
import warehouseInventory from './warehouse-inventory'
import warningSystem from './warning-system'
export default combineReducers({
  commonManagement,
  dashboard,
  warningSystem,
  attributeType,
  defineDevice,
  deviceAssign,
  supplies,
  maintenanceTeam,
  suppliesCategory,
  maintainRequest,
  requestDevice,
  job,
  createPlanList,
  maintainanceProgress,
  planList,
  defectList,
  suppliesRequest,
  deviceStatusReport,
  deviceStatus,
  jobDraftList,
  defineUnit,
  warehouseDefine,
  warehouseInventory,
  transferRequest,
  transferTicket,
  repairRequest,
  warehouseImportManagement,
  warehouseExportManagement,
  signatureConfiguration,
  contingencyPlan,
  maintenancePlan,
  report,
  setting,
  deviceInventory,
  suppliesInventory,
  supplyType,
  operationValue,
  warehouseExportTicket,
  warehouseImportRequest,
  itemGroupSetting,
  templateCheckList,
  areaDefine,
  errorType,
  deviceType,
  defineVendor,
  articleDevice,
  maintenanceAttribute,
  deviceGroup,
  defineInstallTemplate,
  accreditationTemplate,
  maintenanceTemplate,
  deviceName,
  operationIndex,
})
