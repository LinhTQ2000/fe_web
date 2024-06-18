import AccreditationTemplate from '~/modules/mmsx/features/accreditation-template'
import AccreditationTemplateDetail from '~/modules/mmsx/features/accreditation-template/detail'
import AccreditationTemplateForm from '~/modules/mmsx/features/accreditation-template/form'
import AreaDefine from '~/modules/mmsx/features/area'
import AreaDetail from '~/modules/mmsx/features/area/detail'
import AreaForm from '~/modules/mmsx/features/area/form'
import ArticleDevice from '~/modules/mmsx/features/article-device'
import ArticleDeviceDetail from '~/modules/mmsx/features/article-device/detail'
import ArticleDeviceForm from '~/modules/mmsx/features/article-device/form'
import TemplateChecklistDetail from '~/modules/mmsx/features/checklist-template/detail'
import TemplateChecklistForm from '~/modules/mmsx/features/checklist-template/form'
import TemplateChecklist from '~/modules/mmsx/features/checklist-template/list'
import Dashboard from '~/modules/mmsx/features/dashboard'
import DeviceGroup from '~/modules/mmsx/features/device-group'
import DeviceGroupDetail from '~/modules/mmsx/features/device-group/detail'
import DeviceGroupForm from '~/modules/mmsx/features/device-group/form'
import DeviceName from '~/modules/mmsx/features/device-name'
import DeviceNameDetail from '~/modules/mmsx/features/device-name/detail'
import DeviceNameForm from '~/modules/mmsx/features/device-name/form'
import DeviceType from '~/modules/mmsx/features/device-type'
import DeviceTypeDetail from '~/modules/mmsx/features/device-type/detail'
import DeviceTypeForm from '~/modules/mmsx/features/device-type/form'
import ErrorType from '~/modules/mmsx/features/error-type'
import ErrorTypeDetail from '~/modules/mmsx/features/error-type/detail'
import ErrorTypeForm from '~/modules/mmsx/features/error-type/form'
import DefineInstallationTemplateDetail from '~/modules/mmsx/features/installation-template/detail'
import DefineInstallationTemplateForm from '~/modules/mmsx/features/installation-template/form'
import DefineInstallationTemplate from '~/modules/mmsx/features/installation-template/list'
import MaintenanceAttribute from '~/modules/mmsx/features/maintenance-attribute'
import MaintenanceAttributeDetail from '~/modules/mmsx/features/maintenance-attribute/detail'
import MaintenanceAttributeForm from '~/modules/mmsx/features/maintenance-attribute/form'
import MaintenanceTemplate from '~/modules/mmsx/features/maintenance-template'
import MaintenanceTemplateDetail from '~/modules/mmsx/features/maintenance-template/detail'
import MaintenanceTemplateForm from '~/modules/mmsx/features/maintenance-template/form'
import OperationIndex from '~/modules/mmsx/features/operation-index'
import operationIndexDetail from '~/modules/mmsx/features/operation-index/detail'
import OperationIndexForm from '~/modules/mmsx/features/operation-index/form'
import DefineVendorDetail from '~/modules/mmsx/features/vendor/detail'
import DefineVendorForm from '~/modules/mmsx/features/vendor/form'
import DefineVendor from '~/modules/mmsx/features/vendor/list'
import { ROUTE as ROUTEDB } from '~/modules/mmsx/routes/config'

import { FUNCTION_CODE } from '../constants/functionCode'
import AttributeType from '../features/attribute-type'
import AttributeTypeDetail from '../features/attribute-type/detail'
import AttributeTypeForm from '../features/attribute-type/form'
import ContingencyPlanDetail from '../features/contingency-plan/detail'
import ContingencyPlanForm from '../features/contingency-plan/form'
import ContingencyPlanList from '../features/contingency-plan/list'
import DeviceAssignDetail from '../features/device-assign/detail'
import DeviceAssignForm from '../features/device-assign/form'
import DeviceAssign from '../features/device-assign/list'
import DeviceMaintenanceReport from '../features/device-maintenance-report'
import RequestDeviceDetail from '../features/device-request/detail'
import RequestDeviceForm from '../features/device-request/form'
import RequestDeviceList from '../features/device-request/list'
import ReturnDeviceForm from '../features/device-request/return-form'
import DeviceStatusReport from '../features/device-status-report'
import DeviceStatusReportDetail from '../features/device-status-report/detail'
import DeviceStatusDetail from '../features/device-status/detail'
import DetailOfStatusDevice from '../features/device-status/detail-of-status'
import DeviceStatusForm from '../features/device-status/form'
import DeviceStatus from '../features/device-status/list'
import DeviceSynthesisReport from '../features/device-synthesis-report'
import DefineDeviceDetail from '../features/device/detail'
import DefineDeviceForm from '../features/device/form'
import DefineDevice from '../features/device/list'
import InvestMentDeviceReport from '../features/investment-device-report'
import jobConfiguration from '../features/job-setting'
import JobAssign from '../features/job/assign'
import JobDetail from '../features/job/detail'
import Job from '../features/job/list'
import MaintenancePlanDetail from '../features/maintenance-plan/detail'
import MaintenancePlanForm from '../features/maintenance-plan/form'
import MaintenancePlanDetailJob from '../features/maintenance-plan/job-detail'
import MaintenancePlanList from '../features/maintenance-plan/list'
import GanttChartView from '../features/maintenance-plan/list/grant-chart'
import MaintenanceTeamDetail from '../features/maintenance-team/detail'
import MaintenanceTeamForm from '../features/maintenance-team/form'
import MaintenanceTeam from '../features/maintenance-team/list'
import OperationValue from '../features/operation-value'
import OperationValueDetail from '../features/operation-value/detail'
import OperationValueForm from '../features/operation-value/form'
import RepairRequestDetail from '../features/repair-request/detail'
import RepairRequestList from '../features/repair-request/list'
import SignatureConfiguration from '../features/signature-configuration'
import SuppliesCategoryDetail from '../features/supplies-category/detail'
import SuppliesCategoryForm from '../features/supplies-category/form'
import SuppliesCategory from '../features/supplies-category/list'
import SuppliesRequestDetail from '../features/supplies-request/detail'
import SuppliesRequestForm from '../features/supplies-request/form'
import SuppliesRequest from '../features/supplies-request/list'
import SuppliesReturnDetail from '../features/supplies-request/return-detail'
import SuppliesReturnForm from '../features/supplies-request/return-form'
import DefineSuppliesDetail from '../features/supplies/detail'
import DefineSuppliesForm from '../features/supplies/form'
import DefineSupplies from '../features/supplies/list'
import TransferRequestDetail from '../features/transfer-request/detail'
import TransferRequestForm from '../features/transfer-request/form'
import TransferRequestList from '../features/transfer-request/list'
import TransferTicketReport from '../features/transfer-ticket-report'
import TransferTicketReportDetail from '../features/transfer-ticket-report/detail'
import TransferTicketDetail from '../features/transfer-ticket/detail'
import TransferTicketForm from '../features/transfer-ticket/form'
import TransferTicketList from '../features/transfer-ticket/list'
import DeviceInventoryDetail from '../features/update-device-inventory-ticket/detail'
import DeviceInventoryForm from '../features/update-device-inventory-ticket/form'
import DeviceInventory from '../features/update-device-inventory-ticket/list'
import SuppliesInventoryDetail from '../features/update-supplies-inventory-ticket/detail'
import SuppliesInventoryForm from '../features/update-supplies-inventory-ticket/form'
import SuppliesInventory from '../features/update-supplies-inventory-ticket/list'
import WarehouseDefine from '../features/warehouse'
import WarehouseExportManagementDetail from '../features/warehouse-export-request/detail'
import WarehouseExportManagementForm from '../features/warehouse-export-request/form'
import WarehouseExportManagementList from '../features/warehouse-export-request/list'
import WarehouseExportTicket from '../features/warehouse-export-ticket'
import WarehouseExportTicketDetail from '../features/warehouse-export-ticket/detail'
import WarehouseExportTicketForm from '../features/warehouse-export-ticket/form'
import WarehouseImportRequest from '../features/warehouse-import-request'
import WarehouseImportRequestDetail from '../features/warehouse-import-request/detail'
import WarehouseImportRequestForm from '../features/warehouse-import-request/form'
import WarehouseImportManagementDetail from '../features/warehouse-import-ticket/detail'
import WarehouseImportManagementForm from '../features/warehouse-import-ticket/form'
import WarehouseImportManagementList from '../features/warehouse-import-ticket/list'
import WarehouseInventoryDetail from '../features/warehouse-inventory/detail'
import WarehouseInventory from '../features/warehouse-inventory/list'
import WarehouseDefineDetail from '../features/warehouse/detail'
import WarehouseDefineForm from '../features/warehouse/form'
import WarningMaintenanceTypeDetail from '../features/warning/detail/maintenance-type'
import WarningSystem from '../features/warning/list'
import { ROUTE } from './config'
const routes = [
  {
    name: ROUTE.DASHBOARD.TITLE,
    path: ROUTE.DASHBOARD.PATH,
    component: Dashboard,
    icon: 'home',
    isInSidebar: true,
  },
  {
    name: ROUTE.DEVICE_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEVICE_LIST.LIST.TITLE,
        path: ROUTE.DEVICE_LIST.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE,
        component: DefineDevice,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_LIST.CREATE.TITLE,
            path: ROUTE.DEVICE_LIST.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_DEVICE,
            component: DefineDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_LIST.DETAIL.TITLE,
            path: ROUTE.DEVICE_LIST.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE,
            component: DefineDeviceDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_LIST.EDIT.TITLE,
            path: ROUTE.DEVICE_LIST.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE,
            component: DefineDeviceForm,
          },
        ],
      },
      {
        name: ROUTEDB.DEVICE_GROUP.LIST.TITLE,
        path: ROUTEDB.DEVICE_GROUP.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE_GROUP,
        component: DeviceGroup,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.DEVICE_GROUP.CREATE.TITLE,
            path: ROUTEDB.DEVICE_GROUP.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_DEVICE_GROUP,
            component: DeviceGroupForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEVICE_GROUP.DETAIL.TITLE,
            path: ROUTEDB.DEVICE_GROUP.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_GROUP,
            component: DeviceGroupDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEVICE_GROUP.EDIT.TITLE,
            path: ROUTEDB.DEVICE_GROUP.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_GROUP,
            component: DeviceGroupForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.REQUEST_DEVICE.LIST.TITLE,
        path: ROUTE.REQUEST_DEVICE.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE_REQUEST,
        component: RequestDeviceList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.REQUEST_DEVICE.CREATE.TITLE,
            path: ROUTE.REQUEST_DEVICE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_GRANT_DEVICE_REQUEST_TICKET,
            component: RequestDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.DETAIL.TITLE,
            path: ROUTE.REQUEST_DEVICE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_REQUEST_TICKET,
            component: RequestDeviceDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.EDIT.TITLE,
            path: ROUTE.REQUEST_DEVICE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET,
            component: RequestDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.RETURN_CREATE.TITLE,
            path: ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH,
            code: FUNCTION_CODE.CREATE_RETURN_DEVICE_REQUEST_TICKET,
            component: ReturnDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.RETURN_EDIT.TITLE,
            path: ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_REQUEST_TICKET,
            component: ReturnDeviceForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
        path: ROUTE.DEVICE_ASSIGN.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE_ASSIGNMENT,
        component: DeviceAssign,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_ASSIGN.CREATE.TITLE,
            path: ROUTE.DEVICE_ASSIGN.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_DEVICE_ASSIGNMENT,
            component: DeviceAssignForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_ASSIGN.DETAIL.TITLE,
            path: ROUTE.DEVICE_ASSIGN.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_ASSIGNMENT,
            component: DeviceAssignDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_ASSIGN.EDIT.TITLE,
            path: ROUTE.DEVICE_ASSIGN.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_ASSIGNMENT,
            component: DeviceAssignForm,
          },
          {
            name: ROUTE.DEVICE_ASSIGN.REASSIGN.TITLE,
            path: ROUTE.DEVICE_ASSIGN.REASSIGN.PATH,
            component: DeviceAssignForm,
          },
        ],
      },
      {
        name: ROUTE.DEVICE_STATUS.LIST.TITLE,
        path: ROUTE.DEVICE_STATUS.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE_STATUS,
        component: DeviceStatus,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_STATUS.CREATE.TITLE,
            path: ROUTE.DEVICE_STATUS.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_DEVICE_STATUS,
            component: DeviceStatusForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_STATUS.DETAIL.TITLE,
            path: ROUTE.DEVICE_STATUS.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_STATUS,
            component: DeviceStatusDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_STATUS.ACTION_DETAIL.TITLE,
            path: ROUTE.DEVICE_STATUS.ACTION_DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_STATUS,
            component: DetailOfStatusDevice,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_STATUS.EDIT.TITLE,
            path: ROUTE.DEVICE_STATUS.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_STATUS,
            component: DeviceStatusForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.SUPPLY_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
        path: ROUTE.DEFINE_SUPPLIES.LIST.PATH,
        code: FUNCTION_CODE.LIST_SUPPLY,
        component: DefineSupplies,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_SUPPLIES.CREATE.TITLE,
            path: ROUTE.DEFINE_SUPPLIES.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_SUPPLY,
            component: DefineSuppliesForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_SUPPLIES.DETAIL.TITLE,
            path: ROUTE.DEFINE_SUPPLIES.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_SUPPLY,
            component: DefineSuppliesDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_SUPPLIES.EDIT.TITLE,
            path: ROUTE.DEFINE_SUPPLIES.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_SUPPLY,
            component: DefineSuppliesForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SUPPLIES_REQUEST.TITLE,
        path: ROUTE.SUPPLIES_REQUEST.LIST.PATH,
        code: FUNCTION_CODE.LIST_SUPPLY_REQUEST,
        component: SuppliesRequest,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SUPPLIES_REQUEST.CREATE.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_SUPPLY_REQUEST_TICKET,
            component: SuppliesRequestForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.DETAIL.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_SUPPLY_REQUEST_TICKET,
            component: SuppliesRequestDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.EDIT.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_SUPPLY_REQUEST_TICKET,
            component: SuppliesRequestForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.RETURN_CREATE.PATH,
            code: FUNCTION_CODE.CREATE_SUPPLY_REQUEST_TICKET,
            component: SuppliesReturnForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.RETURN_DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_SUPPLY_REQUEST_TICKET,
            component: SuppliesReturnDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.RETURN_EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_SUPPLY_REQUEST_TICKET,
            component: SuppliesReturnForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.PLAN.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.MAINTENANCE_PLAN.LIST.TITLE,
        path: ROUTE.MAINTENANCE_PLAN.LIST.PATH,
        code: FUNCTION_CODE.LIST_MAINTENANCE_PLAN,
        component: MaintenancePlanList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MAINTENANCE_PLAN.CREATE.TITLE,
            path: ROUTE.MAINTENANCE_PLAN.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_MAINTENANCE_PLAN,
            component: MaintenancePlanForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MAINTENANCE_PLAN.DETAIL.TITLE,
            path: ROUTE.MAINTENANCE_PLAN.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_MAINTENANCE_PLAN,
            component: MaintenancePlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.MAINTENANCE_PLAN.EDIT.TITLE,
            path: ROUTE.MAINTENANCE_PLAN.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_MAINTENANCE_PLAN,
            component: MaintenancePlanForm,
          },
          {
            name: ROUTE.MAINTENANCE_PLAN.GANNT_CHART.TITLE,
            path: ROUTE.MAINTENANCE_PLAN.GANNT_CHART.PATH,
            code: FUNCTION_CODE.GANTT_CHART_PLAN,
            component: GanttChartView,
          },
          {
            name: ROUTE.MAINTENANCE_PLAN.DETAIL_JOB.TITLE,
            path: ROUTE.MAINTENANCE_PLAN.DETAIL_JOB.PATH,
            code: FUNCTION_CODE.GENERATE_JOB_FOR_PLAN,
            component: MaintenancePlanDetailJob,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.CONTINGENCY_PLAN.TITLE,
        path: ROUTE.CONTINGENCY_PLAN.LIST.PATH,
        code: FUNCTION_CODE.LIST_PLAN,
        component: ContingencyPlanList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONTINGENCY_PLAN.CREATE.TITLE,
            path: ROUTE.CONTINGENCY_PLAN.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_PLAN,
            component: ContingencyPlanForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONTINGENCY_PLAN.DETAIL.TITLE,
            path: ROUTE.CONTINGENCY_PLAN.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_PLAN,
            component: ContingencyPlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONTINGENCY_PLAN.EDIT.TITLE,
            path: ROUTE.CONTINGENCY_PLAN.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_PLAN,
            component: ContingencyPlanForm,
          },
        ],
      },

      // MinhNA note: Kế hoạch công việc, Kế hoạch vật tư
    ],
  },
  {
    name: ROUTE.TEMPLATE_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTEDB.TEMPLATE_CHECKLIST.LIST.TITLE,
        path: ROUTEDB.TEMPLATE_CHECKLIST.LIST.PATH,
        code: FUNCTION_CODE.LIST_CHECKLIST_TEMPLATE,
        component: TemplateChecklist,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.TEMPLATE_CHECKLIST.CREATE.TITLE,
            path: ROUTEDB.TEMPLATE_CHECKLIST.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_CHECKLIST_TEMPLATE,
            component: TemplateChecklistForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.TEMPLATE_CHECKLIST.DETAIL.TITLE,
            path: ROUTEDB.TEMPLATE_CHECKLIST.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_CHECKLIST_TEMPLATE,
            component: TemplateChecklistDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.TEMPLATE_CHECKLIST.EDIT.TITLE,
            path: ROUTEDB.TEMPLATE_CHECKLIST.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_CHECKLIST_TEMPLATE,
            component: TemplateChecklistForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.INSTALLATION_TEMPLATE.LIST.TITLE,
        path: ROUTEDB.INSTALLATION_TEMPLATE.LIST.PATH,
        code: FUNCTION_CODE.LIST_INSTALLATION_TEMPLATE,
        component: DefineInstallationTemplate,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.INSTALLATION_TEMPLATE.CREATE.TITLE,
            path: ROUTEDB.INSTALLATION_TEMPLATE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_INSTALLATION_TEMPLATE,
            component: DefineInstallationTemplateForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.INSTALLATION_TEMPLATE.DETAIL.TITLE,
            path: ROUTEDB.INSTALLATION_TEMPLATE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_INSTALLATION_TEMPLATE,
            component: DefineInstallationTemplateDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.INSTALLATION_TEMPLATE.EDIT.TITLE,
            path: ROUTEDB.INSTALLATION_TEMPLATE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_INSTALLATION_TEMPLATE,
            component: DefineInstallationTemplateForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.ACCREDITATION_TEMPLATE.LIST.TITLE,
        path: ROUTEDB.ACCREDITATION_TEMPLATE.LIST.PATH,
        code: FUNCTION_CODE.LIST_ACCREDITATION_TEMPLATE,
        component: AccreditationTemplate,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.ACCREDITATION_TEMPLATE.CREATE.TITLE,
            path: ROUTEDB.ACCREDITATION_TEMPLATE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_ACCREDITATION_TEMPLATE,
            component: AccreditationTemplateForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ACCREDITATION_TEMPLATE.DETAIL.TITLE,
            path: ROUTEDB.ACCREDITATION_TEMPLATE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_ACCREDITATION_TEMPLATE,
            component: AccreditationTemplateDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ACCREDITATION_TEMPLATE.EDIT.TITLE,
            path: ROUTEDB.ACCREDITATION_TEMPLATE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_ACCREDITATION_TEMPLATE,
            component: AccreditationTemplateForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.MAINTENANCE_TEMPLATE.LIST.TITLE,
        path: ROUTEDB.MAINTENANCE_TEMPLATE.LIST.PATH,
        code: FUNCTION_CODE.LIST_MAINTENANCE_TEMPLATE,
        component: MaintenanceTemplate,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.MAINTENANCE_TEMPLATE.CREATE.TITLE,
            path: ROUTEDB.MAINTENANCE_TEMPLATE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_MAINTENANCE_TEMPLATE,
            component: MaintenanceTemplateForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.MAINTENANCE_TEMPLATE.DETAIL.TITLE,
            path: ROUTEDB.MAINTENANCE_TEMPLATE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_MAINTENANCE_TEMPLATE,
            component: MaintenanceTemplateDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.MAINTENANCE_TEMPLATE.EDIT.TITLE,
            path: ROUTEDB.MAINTENANCE_TEMPLATE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_MAINTENANCE_TEMPLATE,
            component: MaintenanceTemplateForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.MAINTENANCE.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.JOB.LIST.TITLE,
        path: ROUTE.JOB.LIST.PATH,
        code: FUNCTION_CODE.LIST_JOB,
        icon: 'plan',
        component: Job,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.JOB.DETAIL.TITLE,
            path: ROUTE.JOB.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_JOB,
            component: JobDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.JOB.ASSIGN.TITLE,
            path: ROUTE.JOB.ASSIGN.PATH,
            code: FUNCTION_CODE.ASSIGNMENT_JOB,
            component: JobAssign,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.REPAIR_REQUEST.LIST.TITLE,
        path: ROUTE.REPAIR_REQUEST.LIST.PATH,
        component: RepairRequestList,
        code: FUNCTION_CODE.LIST_REPAIR_REQUEST,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.REPAIR_REQUEST.DETAIL.TITLE,
            path: ROUTE.REPAIR_REQUEST.DETAIL.PATH,
            component: RepairRequestDetail,
            code: FUNCTION_CODE.DETAIL_REPAIR_REQUEST,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WARNING_SYSTEM.LIST.TITLE,
        path: ROUTE.WARNING_SYSTEM.LIST.PATH,
        component: WarningSystem,
        code: FUNCTION_CODE.LIST_WARNING,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WARNING_SYSTEM.DETAIL.TITLE,
            path: ROUTE.WARNING_SYSTEM.DETAIL.PATH,
            component: WarningMaintenanceTypeDetail,
            code: FUNCTION_CODE.DETAIL_WARNING,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.MAINTENANCE_TEAM.LIST.TITLE,
        path: ROUTEDB.MAINTENANCE_TEAM.LIST.PATH,
        code: FUNCTION_CODE.LIST_MAINTENANCE_TEAM,
        component: MaintenanceTeam,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.MAINTENANCE_TEAM.CREATE.TITLE,
            path: ROUTEDB.MAINTENANCE_TEAM.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_MAINTENANCE_TEAM,
            component: MaintenanceTeamForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.MAINTENANCE_TEAM.DETAIL.TITLE,
            path: ROUTEDB.MAINTENANCE_TEAM.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_MAINTENANCE_TEAM,
            component: MaintenanceTeamDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.MAINTENANCE_TEAM.EDIT.TITLE,
            path: ROUTEDB.MAINTENANCE_TEAM.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_MAINTENANCE_TEAM,
            component: MaintenanceTeamForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.ORGANIZATION.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTEDB.AREA.LIST.TITLE,
        path: ROUTEDB.AREA.LIST.PATH,
        code: FUNCTION_CODE.LIST_AREA,
        component: AreaDefine,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.AREA.DETAIL.TITLE,
            path: ROUTEDB.AREA.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_AREA,
            component: AreaDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.AREA.CREATE.TITLE,
            path: ROUTEDB.AREA.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_AREA,
            component: AreaForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.AREA.EDIT.TITLE,
            path: ROUTEDB.AREA.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_AREA,
            component: AreaForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.OPERATION_VALUE.LIST.TITLE,
        path: ROUTE.OPERATION_VALUE.LIST.PATH,
        code: FUNCTION_CODE.LIST_OPERATION_VALUE,
        component: OperationValue,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.OPERATION_VALUE.CREATE.TITLE,
            path: ROUTE.OPERATION_VALUE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_OPERATION_VALUE,
            component: OperationValueForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.OPERATION_VALUE.DETAIL.TITLE,
            path: ROUTE.OPERATION_VALUE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_OPERATION_VALUE,
            component: OperationValueDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.OPERATION_VALUE.EDIT.TITLE,
            path: ROUTE.OPERATION_VALUE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_OPERATION_VALUE,
            component: OperationValueForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.WAREHOUSE.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_DEFINE.LIST.TITLE,
        path: ROUTE.WAREHOUSE_DEFINE.LIST.PATH,
        component: WarehouseDefine,
        code: FUNCTION_CODE.LIST_WAREHOUSE,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_DEFINE.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_DEFINE.CREATE.PATH,
            component: WarehouseDefineForm,
            code: FUNCTION_CODE.CREATE_WAREHOUSE,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_DEFINE.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_DEFINE.DETAIL.PATH,
            component: WarehouseDefineDetail,
            code: FUNCTION_CODE.DETAIL_WAREHOUSE,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_DEFINE.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_DEFINE.EDIT.PATH,
            component: WarehouseDefineForm,
            code: FUNCTION_CODE.UPDATE_WAREHOUSE,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.TRANSFER_REQUEST.LIST.TITLE,
        path: ROUTE.TRANSFER_REQUEST.LIST.PATH,
        component: TransferRequestList,
        code: FUNCTION_CODE.LIST_TRANSFER_REQUEST,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.TRANSFER_REQUEST.CREATE.TITLE,
            path: ROUTE.TRANSFER_REQUEST.CREATE.PATH,
            component: TransferRequestForm,
            code: FUNCTION_CODE.CREATE_TRANSFER_REQUEST,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSFER_REQUEST.DETAIL.TITLE,
            path: ROUTE.TRANSFER_REQUEST.DETAIL.PATH,
            component: TransferRequestDetail,
            code: FUNCTION_CODE.DETAIL_TRANSFER_REQUEST,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSFER_REQUEST.EDIT.TITLE,
            path: ROUTE.TRANSFER_REQUEST.EDIT.PATH,
            component: TransferRequestForm,
            code: FUNCTION_CODE.UPDATE_TRANSFER_REQUEST,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.TRANSFER_TICKET.LIST.TITLE,
        path: ROUTE.TRANSFER_TICKET.LIST.PATH,
        component: TransferTicketList,
        code: FUNCTION_CODE.LIST_TRANSFER_TICKET,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.TRANSFER_TICKET.CREATE.TITLE,
            path: ROUTE.TRANSFER_TICKET.CREATE.PATH,
            component: TransferTicketForm,
            code: FUNCTION_CODE.CREATE_TRANSFER_TICKET,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSFER_TICKET.DETAIL.TITLE,
            path: ROUTE.TRANSFER_TICKET.DETAIL.PATH,
            component: TransferTicketDetail,
            code: FUNCTION_CODE.DETAIL_TRANSFER_TICKET,
            isInSidebar: false,
          },
          {
            name: ROUTE.TRANSFER_TICKET.EDIT.TITLE,
            path: ROUTE.TRANSFER_TICKET.EDIT.PATH,
            component: TransferTicketForm,
            code: FUNCTION_CODE.UPDATE_TRANSFER_TICKET,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.TITLE,
        path: ROUTE.WAREHOUSE_IMPORT_REQUEST.LIST.PATH,
        component: WarehouseImportRequest,
        code: FUNCTION_CODE.LIST_WAREHOUSE_IMPORT_REQUEST,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_IMPORT_REQUEST.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_REQUEST.CREATE.PATH,
            component: WarehouseImportRequestForm,
            code: FUNCTION_CODE.CREATE_WAREHOUSE_IMPORT_REQUEST,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_REQUEST.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_REQUEST.DETAIL.PATH,
            component: WarehouseImportRequestDetail,
            code: FUNCTION_CODE.DETAIL_WAREHOUSE_IMPORT_REQUEST,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_REQUEST.EDIT.PATH,
            component: WarehouseImportRequestForm,
            code: FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT_REQUEST,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.TITLE,
        path: ROUTE.WAREHOUSE_IMPORT_TICKET.LIST.PATH,
        component: WarehouseImportManagementList,
        code: FUNCTION_CODE.LIST_WAREHOUSE_IMPORT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_TICKET.CREATE.PATH,
            component: WarehouseImportManagementForm,
            code: FUNCTION_CODE.CREATE_WAREHOUSE_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.PATH,
            component: WarehouseImportManagementDetail,
            code: FUNCTION_CODE.DETAIL_WAREHOUSE_IMPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_TICKET.EDIT.PATH,
            component: WarehouseImportManagementForm,
            code: FUNCTION_CODE.UPDATE_WAREHOUSE_IMPORT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_REQUEST.LIST.PATH,
        component: WarehouseExportManagementList,
        code: FUNCTION_CODE.LIST_WAREHOUSE_EXPORT_REQUEST,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_REQUEST.CREATE.PATH,
            component: WarehouseExportManagementForm,
            code: FUNCTION_CODE.CREATE_WAREHOUSE_EXPORT_REQUEST,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_REQUEST.DETAIL.PATH,
            component: WarehouseExportManagementDetail,
            code: FUNCTION_CODE.DETAIL_WAREHOUSE_EXPORT_REQUEST,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_REQUEST.EDIT.PATH,
            component: WarehouseExportManagementForm,
            code: FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT_REQUEST,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_TICKET.LIST.PATH,
        component: WarehouseExportTicket,
        code: FUNCTION_CODE.LIST_WAREHOUSE_EXPORT,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_TICKET.CREATE.PATH,
            component: WarehouseExportTicketForm,
            code: FUNCTION_CODE.CREATE_WAREHOUSE_EXPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.PATH,
            component: WarehouseExportTicketDetail,
            code: FUNCTION_CODE.DETAIL_WAREHOUSE_EXPORT,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_TICKET.EDIT.PATH,
            component: WarehouseExportTicketForm,
            code: FUNCTION_CODE.UPDATE_WAREHOUSE_EXPORT,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_INVENTORY.LIST.TITLE,
        path: ROUTE.WAREHOUSE_INVENTORY.LIST.PATH,
        component: WarehouseInventory,
        // code: FUNCTION_CODE.LIST_WAREHOUSE_INVENTORY,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_INVENTORY.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_INVENTORY.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_INVENTORY_DEVICE_GROUP,
            component: WarehouseInventoryDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEVICE_INVENTORY.LIST.TITLE,
        path: ROUTE.DEVICE_INVENTORY.LIST.PATH,
        component: DeviceInventory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_INVENTORY.CREATE.TITLE,
            path: ROUTE.DEVICE_INVENTORY.CREATE.PATH,
            component: DeviceInventoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_INVENTORY.DETAIL.TITLE,
            path: ROUTE.DEVICE_INVENTORY.DETAIL.PATH,
            component: DeviceInventoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_INVENTORY.EDIT.TITLE,
            path: ROUTE.DEVICE_INVENTORY.EDIT.PATH,
            component: DeviceInventoryForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SUPPLIES_INVENTORY.LIST.TITLE,
        path: ROUTE.SUPPLIES_INVENTORY.LIST.PATH,
        component: SuppliesInventory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SUPPLIES_INVENTORY.CREATE.TITLE,
            path: ROUTE.SUPPLIES_INVENTORY.CREATE.PATH,
            component: SuppliesInventoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_INVENTORY.DETAIL.TITLE,
            path: ROUTE.SUPPLIES_INVENTORY.DETAIL.PATH,
            component: SuppliesInventoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_INVENTORY.EDIT.TITLE,
            path: ROUTE.SUPPLIES_INVENTORY.EDIT.PATH,
            component: SuppliesInventoryForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },

  {
    name: ROUTE.REPORT.TITLE,
    icon: 'key',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEVICE_SYNTHESIS_REPORT.LIST.TITLE,
        path: ROUTE.DEVICE_SYNTHESIS_REPORT.LIST.PATH,
        code: FUNCTION_CODE.REPORT_LIST_DEVICE_SYNTHESIS,
        component: DeviceSynthesisReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.DEVICE_STATUS_REPORT.LIST.TITLE,
        path: ROUTE.DEVICE_STATUS_REPORT.LIST.PATH,
        code: FUNCTION_CODE.SYNTHESIS_REPORT_DEVICE_STATUS,
        component: DeviceStatusReport,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_STATUS_REPORT.DETAIL.TITLE,
            path: ROUTE.DEVICE_STATUS_REPORT.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_REPORT_DEVICE_STATUS,
            component: DeviceStatusReportDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEVICE_MAINTENANCE_REPORT.LIST.TITLE,
        path: ROUTE.DEVICE_MAINTENANCE_REPORT.LIST.PATH,
        code: FUNCTION_CODE.REPORT_LIST_DEVICE_MAINTENANCE_PERMISSION,
        component: DeviceMaintenanceReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.TRANSFER_TICKET_REPORT.LIST.TITLE,
        path: ROUTE.TRANSFER_TICKET_REPORT.LIST.PATH,
        code: FUNCTION_CODE.REPORT_LIST_DEVICE_TRANSFER,
        component: TransferTicketReport,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.TRANSFER_TICKET_REPORT.DETAIL.TITLE,
            path: ROUTE.TRANSFER_TICKET_REPORT.DETAIL.PATH,
            code: FUNCTION_CODE.REPORT_DETAIL_DEVICE_TRANSFER,
            component: TransferTicketReportDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.INVESTMENT_DEVICE_REPORT.LIST.TITLE,
        path: ROUTE.INVESTMENT_DEVICE_REPORT.LIST.PATH,
        code: FUNCTION_CODE.REPORT_NEW_INVESTMENT_DEVICE,
        component: InvestMentDeviceReport,
        isInSidebar: true,
      },
    ],
  },
  {
    name: ROUTE.SETTING.TITLE,
    icon: 'setting',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.SIGNATURE_CONFIGURATION.TITLE,
        path: ROUTE.SIGNATURE_CONFIGURATION.PATH,
        component: SignatureConfiguration,
        isInSidebar: true,
      },
      {
        name: ROUTE.NOTIFICATION_SETTING.TITLE,
        path: ROUTE.NOTIFICATION_SETTING.PATH,
        component: jobConfiguration,
        isInSidebar: true,
      },
      {
        name: ROUTEDB.OPERATION_INDEX.LIST.TITLE,
        path: ROUTEDB.OPERATION_INDEX.LIST.PATH,
        // code: FUNCTION_CODE.LIST_OPERATION_INDEX,
        component: OperationIndex,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.OPERATION_INDEX.CREATE.TITLE,
            path: ROUTEDB.OPERATION_INDEX.CREATE.PATH,
            // code: FUNCTION_CODE.CREATE_OPERATION_INDEX,
            component: OperationIndexForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.OPERATION_INDEX.DETAIL.TITLE,
            path: ROUTEDB.OPERATION_INDEX.DETAIL.PATH,
            // code: FUNCTION_CODE.DETAIL_OPERATION_INDEX,
            component: operationIndexDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.OPERATION_INDEX.EDIT.TITLE,
            path: ROUTEDB.OPERATION_INDEX.EDIT.PATH,
            // code: FUNCTION_CODE.UPDATE_OPERATION_INDEX,
            component: OperationIndexForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.ARTICLE_DEVICE.LIST.TITLE,
        path: ROUTEDB.ARTICLE_DEVICE.LIST.PATH,
        code: FUNCTION_CODE.LIST_ARTICLE_DEVICE_GROUP,
        component: ArticleDevice,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.ARTICLE_DEVICE.CREATE.TITLE,
            path: ROUTEDB.ARTICLE_DEVICE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_ARTICLE_DEVICE_GROUP,
            component: ArticleDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ARTICLE_DEVICE.DETAIL.TITLE,
            path: ROUTEDB.ARTICLE_DEVICE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_ARTICLE_DEVICE_GROUP,
            component: ArticleDeviceDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ARTICLE_DEVICE.EDIT.TITLE,
            path: ROUTEDB.ARTICLE_DEVICE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_ARTICLE_DEVICE_GROUP,
            component: ArticleDeviceForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.DEVICE_TYPE.LIST.TITLE,
        path: ROUTEDB.DEVICE_TYPE.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE_TYPE,
        component: DeviceType,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.DEVICE_TYPE.CREATE.TITLE,
            path: ROUTEDB.DEVICE_TYPE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_DEVICE_TYPE,
            component: DeviceTypeForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEVICE_TYPE.DETAIL.TITLE,
            path: ROUTEDB.DEVICE_TYPE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_TYPE,
            component: DeviceTypeDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEVICE_TYPE.EDIT.TITLE,
            path: ROUTEDB.DEVICE_TYPE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_TYPE,
            component: DeviceTypeForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.DEVICE_NAME.LIST.TITLE,
        path: ROUTEDB.DEVICE_NAME.LIST.PATH,
        code: FUNCTION_CODE.LIST_DEVICE_NAME,
        component: DeviceName,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.DEVICE_NAME.CREATE.TITLE,
            path: ROUTEDB.DEVICE_NAME.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_DEVICE_NAME,
            component: DeviceNameForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEVICE_NAME.DETAIL.TITLE,
            path: ROUTEDB.DEVICE_NAME.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_DEVICE_NAME,
            component: DeviceNameDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEVICE_NAME.EDIT.TITLE,
            path: ROUTEDB.DEVICE_NAME.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_DEVICE_NAME,
            component: DeviceNameForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.SUPPLIES_CATEGORY.LIST.TITLE,
        path: ROUTEDB.SUPPLIES_CATEGORY.LIST.PATH,
        code: FUNCTION_CODE.LIST_SUPPLY_GROUP,
        component: SuppliesCategory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.SUPPLIES_CATEGORY.CREATE.TITLE,
            path: ROUTEDB.SUPPLIES_CATEGORY.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_SUPPLY_GROUP,
            component: SuppliesCategoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.SUPPLIES_CATEGORY.DETAIL.TITLE,
            path: ROUTEDB.SUPPLIES_CATEGORY.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_SUPPLY_GROUP,
            component: SuppliesCategoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.SUPPLIES_CATEGORY.EDIT.TITLE,
            path: ROUTEDB.SUPPLIES_CATEGORY.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_SUPPLY_GROUP,
            component: SuppliesCategoryForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.DEFINE_VENDOR.LIST.TITLE,
        path: ROUTEDB.DEFINE_VENDOR.LIST.PATH,
        code: FUNCTION_CODE.LIST_VENDOR,
        component: DefineVendor,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.DEFINE_VENDOR.DETAIL.TITLE,
            path: ROUTEDB.DEFINE_VENDOR.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_VENDOR,
            component: DefineVendorDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEFINE_VENDOR.CREATE.TITLE,
            path: ROUTEDB.DEFINE_VENDOR.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_VENDOR,
            component: DefineVendorForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.DEFINE_VENDOR.EDIT.TITLE,
            path: ROUTEDB.DEFINE_VENDOR.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_VENDOR,
            component: DefineVendorForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.ERROR_TYPE.LIST.TITLE,
        path: ROUTEDB.ERROR_TYPE.LIST.PATH,
        code: FUNCTION_CODE.LIST_ERROR_TYPE,
        component: ErrorType,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.ERROR_TYPE.CREATE.TITLE,
            path: ROUTEDB.ERROR_TYPE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_ERROR_TYPE,
            component: ErrorTypeForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ERROR_TYPE.DETAIL.TITLE,
            path: ROUTEDB.ERROR_TYPE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_ERROR_TYPE,
            component: ErrorTypeDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ERROR_TYPE.EDIT.TITLE,
            path: ROUTEDB.ERROR_TYPE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_ERROR_TYPE,
            component: ErrorTypeForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.ATTRIBUTE_TYPE.LIST.TITLE,
        path: ROUTEDB.ATTRIBUTE_TYPE.LIST.PATH,
        code: FUNCTION_CODE.LIST_ATTRIBUTE_TYPE,
        component: AttributeType,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.ATTRIBUTE_TYPE.CREATE.TITLE,
            path: ROUTEDB.ATTRIBUTE_TYPE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_ATTRIBUTE_TYPE,
            component: AttributeTypeForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ATTRIBUTE_TYPE.DETAIL.TITLE,
            path: ROUTEDB.ATTRIBUTE_TYPE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_ATTRIBUTE_TYPE,
            component: AttributeTypeDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.ATTRIBUTE_TYPE.EDIT.TITLE,
            path: ROUTEDB.ATTRIBUTE_TYPE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_ATTRIBUTE_TYPE,
            component: AttributeTypeForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTEDB.MAINTENANCE_ATTRIBUTE.LIST.TITLE,
        path: ROUTEDB.MAINTENANCE_ATTRIBUTE.LIST.PATH,
        code: FUNCTION_CODE.LIST_MAINTENANCE_ATTRIBUTE,
        component: MaintenanceAttribute,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTEDB.MAINTENANCE_ATTRIBUTE.CREATE.TITLE,
            path: ROUTEDB.MAINTENANCE_ATTRIBUTE.CREATE.PATH,
            code: FUNCTION_CODE.CREATE_MAINTENANCE_ATTRIBUTE,
            component: MaintenanceAttributeForm,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.MAINTENANCE_ATTRIBUTE.DETAIL.TITLE,
            path: ROUTEDB.MAINTENANCE_ATTRIBUTE.DETAIL.PATH,
            code: FUNCTION_CODE.DETAIL_MAINTENANCE_ATTRIBUTE,
            component: MaintenanceAttributeDetail,
            isInSidebar: false,
          },
          {
            name: ROUTEDB.MAINTENANCE_ATTRIBUTE.EDIT.TITLE,
            path: ROUTEDB.MAINTENANCE_ATTRIBUTE.EDIT.PATH,
            code: FUNCTION_CODE.UPDATE_MAINTENANCE_ATTRIBUTE,
            component: MaintenanceAttributeForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
