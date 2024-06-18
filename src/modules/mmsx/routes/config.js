export const ROUTE = {
  DASHBOARD: {
    PATH: '/mmsx',
    TITLE: 'dashboard',
  },
  DEVICE_MANAGEMENT: {
    PATH: '/wmsx/device-management',
    TITLE: 'deviceManagement',
  },
  SUPPLY_MANAGEMENT: {
    TITLE: 'supplyManagement',
  },
  TEMPLATE_MANAGEMENT: {
    TITLE: 'templateManagement',
  },
  ORGANIZATION: {
    TITLE: 'organization',
  },
  REQUEST_DEVICE: {
    LIST: {
      PATH: '/mmsx/device-request',
      TITLE: 'requestDevice',
    },
    CREATE: {
      PATH: '/mmsx/device-request/create',
      TITLE: 'createRequestDevice',
    },
    DETAIL: {
      PATH: '/mmsx/device-request/:id/detail',
      TITLE: 'viewDetailRequestDevice',
    },
    EDIT: {
      PATH: '/mmsx/device-request/:id/edit',
      TITLE: 'updateRequestDevice',
    },
    RETURN_CREATE: {
      PATH: '/mmsx/device-request/return/create',
      TITLE: 'createReturnDevice',
    },
    RETURN_EDIT: {
      PATH: '/mmsx/device-request/return/:id/edit',
      TITLE: 'updateReturnDevice',
    },
  },
  SERIAL_DEVICE_MANAGEMENT: {
    PATH: '/wmsx/serial-device-management',
    TITLE: 'serialDeviceManagement',
  },
  SETTING: {
    TITLE: 'setting',
  },
  WAREHOUSE: {
    TITLE: 'warehouse',
  },
  WAREHOUSE_DEFINE: {
    LIST: {
      PATH: '/mmsx/warehouse-define',
      TITLE: 'warehouseDefine',
    },
    CREATE: {
      PATH: '/mmsx/warehouse-define/create',
      TITLE: 'warehouseDefineCreate',
    },
    DETAIL: {
      PATH: '/mmsx/warehouse-define/:id/detail',
      TITLE: 'warehouseDefineDetail',
    },
    EDIT: {
      PATH: '/mmsx/warehouse-define/:id/edit',
      TITLE: 'warehouseDefineEdit',
    },
  },
  WAREHOUSE_INVENTORY: {
    LIST: {
      PATH: '/mmsx/warehouse-inventory',
      TITLE: 'warehouseInventory',
    },
    DETAIL: {
      PATH: '/mmsx/warehouse-inventory/:id/:warehouseId/detail/:deviceGroupId',
      TITLE: 'warehouseInventoryDetail',
    },
  },
  DEVICE_SERIAL_MANAGEMENT: {
    PATH: '/wmsx/device-serial-management',
    TITLE: 'deviceSerialManagement',
  },
  DEVICE_LIST: {
    LIST: {
      PATH: '/mmsx/device-define',
      TITLE: 'deviceList',
    },
    CREATE: {
      PATH: '/mmsx/device-define/create',
      TITLE: 'deviceCreate',
    },
    DETAIL: {
      PATH: '/mmsx/device-define/:id/detail',
      TITLE: 'deviceDetail',
    },
    EDIT: {
      PATH: '/mmsx/device-define/:id/edit',
      TITLE: 'deviceEdit',
    },
  },
  DEVICE_ASSIGN: {
    LIST: {
      PATH: '/mmsx/device-assign',
      TITLE: 'deviceAssign',
    },
    CREATE: {
      PATH: '/mmsx/device-assign/create',
      TITLE: 'deviceAssignCreate',
    },
    DETAIL: {
      PATH: '/mmsx/device-assign/:id/detail',
      TITLE: 'deviceAssignDetail',
    },
    EDIT: {
      PATH: '/mmsx/device-assign/:id/edit',
      TITLE: 'deviceAssignEdit',
    },
    REASSIGN: {
      PATH: '/mmsx/device-assign/:id/reassign',
      TITLE: 'deviceReassign',
    },
  },
  DATABASE: {
    PATH: '/mmsx/database',
    TITLE: 'database',
  },
  MAINTENANCE: {
    PATH: '/mmsx/maintenance',
    TITLE: 'maintenanceAndJob',
  },
  PLAN: {
    PATH: '/mmsx/plan',
    TITLE: 'planManagement',
  },
  REPORT: {
    PATH: '/mmsx/report',
    TITLE: 'report',
  },
  DEVICE_STATUS: {
    LIST: {
      PATH: '/mmsx/device-status',
      TITLE: 'deviceStatus',
    },
    DETAIL: {
      PATH: '/mmsx/device-status/:id/detail',
      TITLE: 'listDeviceStatusDetail',
    },
    ACTION_DETAIL: {
      PATH: '/mmsx/device-status/:id/action-detail/:accessId',
      TITLE: 'deviceStatusDetail',
    },
    CREATE: {
      PATH: '/mmsx/device-status/:id/create',
      TITLE: 'deviceStatusCreate',
    },
    EDIT: {
      PATH: '/mmsx/device-status/:id/edit/:accessId',
      TITLE: 'deviceStatusEdit',
    },
  },
  WARNING_SYSTEM: {
    LIST: {
      PATH: '/mmsx/warnings',
      TITLE: 'warningList',
    },
    DETAIL: {
      PATH: '/mmsx/warnings/:id',
      TITLE: 'warningListMaintenanceTypeDetail',
      // MAINTENANCE_TYPE: {
      //   PATH: '/mmsx/warning-system/:id/warning-maintenance',
      //   TITLE: 'warningListMaintenanceTypeDetail',
      // },
      // CHECKLIST: {
      //   PATH: '/mmsx/warning-system/:id/warning-checklist',
      //   TITLE: 'warningListChecklistDetail',
      // },
      // ACCREDITATION: {
      //   PATH: '/mmsx/warning-system/:id/warning-accreditation',
      //   TITLE: 'warningListAccreditationDetail',
      // },
    },
  },
  DEFINE_SUPPLIES: {
    LIST: {
      PATH: '/mmsx/define-supplies',
      TITLE: 'supplies',
    },
    CREATE: {
      PATH: '/mmsx/define-supplies/create',
      TITLE: 'suppliesCreate',
    },
    EDIT: {
      PATH: '/mmsx/define-supplies/:id/edit',
      TITLE: 'suppliesEdit',
    },
    DETAIL: {
      PATH: '/mmsx/define-supplies/:id/detail',
      TITLE: 'suppliesDetail',
    },
  },
  MAINTAIN_REQUEST: {
    LIST: {
      PATH: '/mmsx/maintain-request',
      TITLE: 'maintainRequest',
    },
    DETAIL: {
      PATH: '/mmsx/maintain-request/:id/detail',
      TITLE: 'maintainRequestDetail',
    },
  },
  JOB: {
    LIST: {
      PATH: '/mmsx/job',
      TITLE: 'jobManagement',
    },
    DETAIL: {
      PATH: '/mmsx/job/:id/detail',
      TITLE: 'jobDetail',
    },
    ASSIGN: {
      PATH: '/mmsx/job/:id/assign',
      TITLE: 'jobAssign',
    },
  },
  MAINTENANCE_PLAN: {
    LIST: {
      PATH: '/mmsx/plans',
      TITLE: 'maintenancePlan',
    },
    CREATE: {
      PATH: '/mmsx/plans/create',
      TITLE: 'maintenancePlanCreate',
    },
    EDIT: {
      PATH: '/mmsx/plans/:id/edit',
      TITLE: 'maintenancePlanEdit',
    },
    DETAIL: {
      PATH: '/mmsx/plans/:id/detail',
      TITLE: 'maintenancePlanDetail',
    },
    GANNT_CHART: {
      PATH: '/mmsx/plans/:id/gantt-chart',
      TITLE: 'ganttChart',
    },
    DETAIL_JOB: {
      PATH: '/mmsx/plans/:id/detail/:deviceId/job',
      TITLE: 'maintenancePlanDetailJob',
    },
  },
  CONTINGENCY_PLAN: {
    TITLE: 'contingencyPlan',
    LIST: {
      PATH: '/mmsx/contingency-plan',
      TITLE: 'contingencyPlanList',
    },
    CREATE: {
      PATH: '/mmsx/contingency-plan/create',
      TITLE: 'contingencyPlanSupplyCreate',
    },
    EDIT: {
      PATH: '/mmsx/contingency-plan/:id/edit',
      TITLE: 'contingencyPlanSupplyEdit',
    },
    DETAIL: {
      PATH: '/mmsx/contingency-plan/:id/detail',
      TITLE: 'contingencyPlanSupplyDetail',
    },
  },
  MAINTENANCE_PROGRESS: {
    LIST: {
      PATH: '/mmsx/maintenance-progress',
      TITLE: 'maintainanceProgress',
    },
    DETAIL: {
      PATH: '/mmsx/maintenance-progress/:id/detail',
      TITLE: 'maintainanceProgressDetail',
    },
  },
  DEFECT_LIST: {
    LIST: {
      PATH: '/mmsx/defect-list',
      TITLE: 'defectList',
    },
    CREATE: {
      PATH: '/mmsx/defect-list/create',
      TITLE: 'defectListCreate',
    },
    EDIT: {
      PATH: '/mmsx/defect-list/:id/edit',
      TITLE: 'defectListEdit',
    },
    DETAIL: {
      PATH: '/mmsx/defect-list/:id/detail',
      TITLE: 'defectListDetail',
    },
  },
  SUPPLIES_REQUEST: {
    TITLE: 'suppliesRequestTitle',
    LIST: {
      PATH: '/mmsx/supplies-request',
      TITLE: 'suppliesRequest',
    },
    CREATE: {
      PATH: '/mmsx/supplies-request/create',
      TITLE: 'suppliesRequestCreate',
    },
    EDIT: {
      PATH: '/mmsx/supplies-request/:id/edit',
      TITLE: 'suppliesRequestEdit',
    },
    DETAIL: {
      PATH: '/mmsx/supplies-request/:id/detail',
      TITLE: 'suppliesRequestDetail',
    },
    RETURN_CREATE: {
      PATH: '/mmsx/supplies-request/return-create',
      TITLE: 'suppliesReturnCreate',
    },
    RETURN_EDIT: {
      PATH: '/mmsx/supplies-request/:id/return-edit',
      TITLE: 'suppliesReturnEdit',
    },
    RETURN_DETAIL: {
      PATH: '/mmsx/supplies-request/:id/return-detail',
      TITLE: 'suppliesReturnDetail',
    },
  },
  DEVICE_STATUS_REPORT: {
    LIST: {
      PATH: '/mmsx/device-status-report',
      TITLE: 'deviceStatusReport',
    },
    STATISTICAL: {
      PATH: '/mmsx/device-status-report',
      TITLE: 'deviceStatistical',
    },
    DETAIL: {
      PATH: '/mmsx/device-status-repor/:id/detail',
      TITLE: 'deviceStatusReportDetail',
    },
  },
  DEFINE_UNIT: {
    LIST: {
      PATH: '/mmsx/define-unit',
      TITLE: 'defineUnit',
    },
    CREATE: {
      PATH: '/mmsx/define-unit/create',
      TITLE: 'defineUnitCreate',
    },
    EDIT: {
      PATH: '/mmsx/define-unit/:id/edit',
      TITLE: 'defineUnitEdit',
    },
    DETAIL: {
      PATH: '/mmsx/define-unit/:id/detail',
      TITLE: 'defineUnitDetail',
    },
  },
  TRANSFER_REQUEST: {
    LIST: {
      PATH: '/mmsx/transfer-request',
      TITLE: 'transferRequest',
    },
    CREATE: {
      PATH: '/mmsx/transfer-request/create',
      TITLE: 'transferRequestCreate',
    },
    EDIT: {
      PATH: '/mmsx/transfer-request/:id/edit',
      TITLE: 'transferRequestEdit',
    },
    DETAIL: {
      PATH: '/mmsx/transfer-request/:id/detail',
      TITLE: 'transferRequestDetail',
    },
  },
  TRANSFER_TICKET: {
    LIST: {
      PATH: '/mmsx/transfer-ticket',
      TITLE: 'transferTicket',
    },
    CREATE: {
      PATH: '/mmsx/transfer-ticket/create',
      TITLE: 'transferTicketCreate',
    },
    EDIT: {
      PATH: '/mmsx/transfer-ticket/:id/edit',
      TITLE: 'transferTicketEdit',
    },
    DETAIL: {
      PATH: '/mmsx/transfer-ticket/:id/detail',
      TITLE: 'transferTicketDetail',
    },
  },
  REPAIR_REQUEST: {
    LIST: {
      PATH: '/mmsx/repair-request',
      TITLE: 'repairRequest',
    },
    CREATE: {
      PATH: '/mmsx/repair-request/create',
      TITLE: 'repairRequestCreate',
    },
    EDIT: {
      PATH: '/mmsx/repair-request/:id/edit',
      TITLE: 'repairRequestEdit',
    },
    DETAIL: {
      PATH: '/mmsx/repair-request/:id/detail',
      TITLE: 'repairRequestDetail',
    },
  },
  WAREHOUSE_IMPORT_TICKET: {
    LIST: {
      PATH: '/mmsx/warehouse-import-ticket',
      TITLE: 'warehouseImportManagement',
    },
    CREATE: {
      PATH: '/mmsx/warehouse-import-ticket/create',
      TITLE: 'warehouseImportManagementCreate',
    },
    EDIT: {
      PATH: '/mmsx/warehouse-import-ticket/:id/edit',
      TITLE: 'warehouseImportManagementEdit',
    },
    DETAIL: {
      PATH: '/mmsx/warehouse-import-ticket/:id/detail',
      TITLE: 'warehouseImportManagementDetail',
    },
  },
  WAREHOUSE_IMPORT_REQUEST: {
    LIST: {
      PATH: '/mmsx/warehouse-import-request',
      TITLE: 'warehouseImportRequest',
    },
    CREATE: {
      PATH: '/mmsx/warehouse-import-request/create',
      TITLE: 'warehouseImportRequestCreate',
    },
    EDIT: {
      PATH: '/mmsx/warehouse-import-request/:id/edit',
      TITLE: 'warehouseImportRequestEdit',
    },
    DETAIL: {
      PATH: '/mmsx/warehouse-import-request/:id/detail',
      TITLE: 'warehouseImportRequestDetail',
    },
  },
  WAREHOUSE_EXPORT_REQUEST: {
    LIST: {
      PATH: '/mmsx/warehouse-export-request',
      TITLE: 'warehouseExportManagement',
    },
    CREATE: {
      PATH: '/mmsx/warehouse-export-request/create',
      TITLE: 'warehouseExportManagementCreate',
    },
    EDIT: {
      PATH: '/mmsx/warehouse-export-request/:id/edit',
      TITLE: 'warehouseExportManagementEdit',
    },
    DETAIL: {
      PATH: '/mmsx/warehouse-export-request/:id/detail',
      TITLE: 'warehouseExportManagementDetail',
    },
  },
  SIGNATURE_CONFIGURATION: {
    PATH: '/mmsx/signature-configuration',
    TITLE: 'signatureConfiguration',
  },
  NOTIFICATION_SETTING: {
    PATH: '/mmsx/job-configuration',
    TITLE: 'jobConfiguration',
  },
  DEVICE_MAINTENANCE_REPORT: {
    LIST: {
      PATH: '/mmsx/device-maintenance-report',
      TITLE: 'deviceMaintenanceReport',
    },
  },
  DEVICE_SYNTHESIS_REPORT: {
    LIST: {
      PATH: '/mmsx/device-synthesis-report',
      TITLE: 'deviceSynthesisReport',
    },
  },
  TRANSFER_TICKET_REPORT: {
    LIST: {
      PATH: '/mmsx/transfer-ticket-report',
      TITLE: 'transferTicketReport',
    },
    DETAIL: {
      PATH: '/mmsx/transfer-ticket-report/:toFactoryId/detail/:fromFactoryId',
      TITLE: 'transferTicketReportDetail',
    },
  },
  DEVICE_INVENTORY: {
    LIST: {
      PATH: '/mmsx/device-inventory',
      TITLE: 'deviceInventory',
    },
    CREATE: {
      PATH: '/mmsx/device-inventory/create',
      TITLE: 'deviceInventoryCreate',
    },
    EDIT: {
      PATH: '/mmsx/device-inventory/:id/edit',
      TITLE: 'deviceInventoryEdit',
    },
    DETAIL: {
      PATH: '/mmsx/device-inventory/:id/detail',
      TITLE: 'deviceInventoryDetail',
    },
  },
  SUPPLIES_INVENTORY: {
    LIST: {
      PATH: '/mmsx/supplies-inventory',
      TITLE: 'suppliesInventory',
    },
    CREATE: {
      PATH: '/mmsx/supplies-inventory/create',
      TITLE: 'suppliesInventoryCreate',
    },
    EDIT: {
      PATH: '/mmsx/supplies-inventory/:id/edit',
      TITLE: 'suppliesInventoryEdit',
    },
    DETAIL: {
      PATH: '/mmsx/supplies-inventory/:id/detail',
      TITLE: 'suppliesInventoryDetail',
    },
  },
  OPERATION_VALUE: {
    LIST: {
      PATH: '/mmsx/operation-value',
      TITLE: 'operationValue',
    },
    CREATE: {
      PATH: '/mmsx/operation-value/create',
      TITLE: 'operationValueCreate',
    },
    EDIT: {
      PATH: '/mmsx/operation-value/:id/edit/:factoryId/:startDate/:endDate',
      TITLE: 'operationValueEdit',
    },
    DETAIL: {
      PATH: '/mmsx/operation-value/:id/detail/:factoryId/:startDate/:endDate',
      TITLE: 'operationValueDetail',
    },
  },
  INVESTMENT_DEVICE_REPORT: {
    LIST: {
      PATH: '/mmsx/investment-device-report',
      TITLE: 'investmentDevice',
    },
  },
  WAREHOUSE_EXPORT_TICKET: {
    LIST: {
      PATH: '/mmsx/warehouse-export-ticket',
      TITLE: 'warehouseExportTicket',
    },
    CREATE: {
      PATH: '/mmsx/warehouse-export-ticket/create',
      TITLE: 'warehouseExportTicketCreate',
    },
    EDIT: {
      PATH: '/mmsx/warehouse-export-ticket/:id/edit',
      TITLE: 'warehouseExportTicketEdit',
    },
    DETAIL: {
      PATH: '/mmsx/warehouse-export-ticket/:id/detail',
      TITLE: 'warehouseExportTicketDetail',
    },
  },
  ITEM_GROUP: {
    LIST: {
      PATH: '/mmsx/database/item-group-setting',
      TITLE: 'itemGroupDefine',
    },
    CREATE: {
      PATH: '/mmsx/database/item-group-setting/create',
      TITLE: 'itemGroupCreate',
    },
    DETAIL: {
      PATH: '/mmsx/database/item-group-setting/:id/detail',
      TITLE: 'itemGroupDetail',
    },
    EDIT: {
      PATH: '/mmsx/database/item-group-setting/:id/edit',
      TITLE: 'itemGroupEdit',
    },
  },
  ITEM_TYPE: {
    LIST: {
      PATH: '/mmsx/database/item-type-setting',
      TITLE: 'itemTypeSetting',
    },
    CREATE: {
      PATH: '/mmsx/database/item-type-setting/create',
      TITLE: 'itemTypeCreate',
    },
    DETAIL: {
      PATH: '/mmsx/database/item-type-setting/:id/detail',
      TITLE: 'itemTypeDetail',
    },
    EDIT: {
      PATH: '/mmsx/database/item-type-setting/:id/edit',
      TITLE: 'itemTypeEdit',
    },
  },
  DEFINE_ITEM: {
    LIST: {
      PATH: '/mmsx/database/define-item',
      TITLE: 'defineItem',
    },
    CREATE: {
      PATH: '/mmsx/database/define-item/create',
      TITLE: 'defineItemCreate',
    },
    DETAIL: {
      PATH: '/mmsx/database/define-item/:id/detail',
      TITLE: 'defineItemDetail',
    },
    EDIT: {
      PATH: '/mmsx/database/define-item/:id/edit',
      TITLE: 'defineItemEdit',
    },
  },
  DEFINE_COMPANY: {
    LIST: {
      PATH: '/mmsx/database/define-company',
      TITLE: 'defineCompany',
    },
    CREATE: {
      PATH: '/mmsx/database/define-company/create',
      TITLE: 'defineCompanyCreate',
    },
    DETAIL: {
      PATH: '/mmsx/database/define-company/:id/detail',
      TITLE: 'defineCompanyDetail',
    },
    EDIT: {
      PATH: '/mmsx/database/define-company/:id/edit',
      TITLE: 'defineCompanyEdit',
    },
  },
  ITEM_UNIT: {
    LIST: {
      PATH: '/mmsx/define-unit',
      TITLE: 'itemUnitDefine',
    },
    CREATE: {
      PATH: '/mmsx/define-unit/create',
      TITLE: 'itemUnitCreate',
    },
    DETAIL: {
      PATH: '/mmsx/define-unit/:id/detail',
      TITLE: 'itemUnitDetail',
    },
    EDIT: {
      PATH: '/mmsx/define-unit/:id/edit',
      TITLE: 'itemUnitEdit',
    },
  },
  SALE_ORDER: {
    LIST: {
      PATH: '/mmsx/database/sale-orders',
      TITLE: 'saleOrderDefine',
    },
    CREATE: {
      PATH: '/mmsx/database/sale-orders/create',
      TITLE: 'saleOrderCreate',
    },
    DETAILS: {
      PATH: '/mmsx/database/sale-orders/:id/detail',
      TITLE: 'saleOrderDetails',
    },
    EDIT: {
      PATH: '/mmsx/database/sale-orders/:id/edit',
      TITLE: 'saleOrderEdit',
    },
  },
  PURCHASED_ORDER: {
    LIST: {
      PATH: '/mmsx/database/purchased-order',
      TITLE: 'purchasedOrder',
    },
    CREATE: {
      PATH: '/mmsx/database/purchased-order/create',
      TITLE: 'purchasedOrderCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/purchased-order/:id/edit',
      TITLE: 'purchasedOrderEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/purchased-order/:id/detail',
      TITLE: 'purchasedOrderDetail',
    },
  },
  SUPPLIES_CATEGORY: {
    LIST: {
      PATH: '/mmsx/database/supplies-category',
      TITLE: 'suppliesCategory',
    },
    CREATE: {
      PATH: '/mmsx/database/supplies-category/create',
      TITLE: 'suppliesCategoryCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/supplies-category/:id/edit',
      TITLE: 'suppliesCategoryEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/supplies-category/:id/detail',
      TITLE: 'suppliesCategoryDetail',
    },
  },
  MAINTENANCE_TEAM: {
    LIST: {
      PATH: '/mmsx/database/maintenance-team',
      TITLE: 'maintenanceTeam',
    },
    CREATE: {
      PATH: '/mmsx/database/maintenance-team/create',
      TITLE: 'maintenanceTeamCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/maintenance-team/:id/edit',
      TITLE: 'maintenanceTeamEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/maintenance-team/:id/detail',
      TITLE: 'maintenanceTeamDetail',
    },
  },
  DEVICE_TYPE: {
    LIST: {
      PATH: '/mmsx/database/device-type',
      TITLE: 'deviceType',
    },
    CREATE: {
      PATH: '/mmsx/database/device-type/create',
      TITLE: 'deviceTypeCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/device-type/:id/edit',
      TITLE: 'deviceTypeEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/device-type/:id/detail',
      TITLE: 'deviceTypeDetail',
    },
  },
  DEVICE_NAME: {
    LIST: {
      PATH: '/mmsx/database/device-name',
      TITLE: 'deviceName',
    },
    CREATE: {
      PATH: '/mmsx/database/device-name/create',
      TITLE: 'deviceNameCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/device-name/:id/edit',
      TITLE: 'deviceNameEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/device-name/:id/detail',
      TITLE: 'deviceNameDetail',
    },
  },
  ARTICLE_DEVICE: {
    LIST: {
      PATH: '/mmsx/database/article-device',
      TITLE: 'articleDevice',
    },
    CREATE: {
      PATH: '/mmsx/database/article-device/create',
      TITLE: 'articleDeviceCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/article-device/:id/edit',
      TITLE: 'articleDeviceEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/article-device/:id/detail',
      TITLE: 'articleDeviceDetail',
    },
  },
  AREA: {
    LIST: {
      PATH: '/mmsx/database/area',
      TITLE: 'area',
    },
    DETAIL: {
      PATH: '/mmsx/database/area/:id/detail',
      TITLE: 'areaDetail',
    },
    CREATE: {
      PATH: '/mmsx/database/area/create',
      TITLE: 'areaCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/area/:id/edit',
      TITLE: 'areaEdit',
    },
  },
  DEFINE_VENDOR: {
    LIST: {
      PATH: '/mmsx/database/define-vendor',
      TITLE: 'defineVendor',
    },
    DETAIL: {
      PATH: '/mmsx/database/define-vendor/:id/detail',
      TITLE: 'defineVendorDetail',
    },
    CREATE: {
      PATH: '/mmsx/database/define-vendor/create',
      TITLE: 'defineVendorCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/define-vendor/:id/edit',
      TITLE: 'defineVendorEdit',
    },
  },
  TEMPLATE_CHECKLIST: {
    LIST: {
      PATH: '/mmsx/database/template-checklist',
      TITLE: 'templateChecklist',
    },
    CREATE: {
      PATH: '/mmsx/database/template-checklist/create',
      TITLE: 'templateChecklistCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/template-checklist/:id/edit',
      TITLE: 'templateChecklistEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/template-checklist/:id/detail',
      TITLE: 'templateChecklistDetail',
    },
  },
  ERROR_TYPE: {
    LIST: {
      PATH: '/mmsx/database/error-type',
      TITLE: 'errorType',
    },
    CREATE: {
      PATH: '/mmsx/database/error-type/create',
      TITLE: 'errorTypeCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/error-type/:id/edit',
      TITLE: 'errorTypeEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/error-type/:id/detail',
      TITLE: 'errorTypeDetail',
    },
  },
  ATTRIBUTE_TYPE: {
    LIST: {
      PATH: '/mmsx/database/attribute-type',
      TITLE: 'attributeType',
    },
    CREATE: {
      PATH: '/mmsx/database/attribute-type/create',
      TITLE: 'attributeTypeCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/attribute-type/:id/edit',
      TITLE: 'attributeTypeEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/attribute-type/:id/detail',
      TITLE: 'attributeTypeDetail',
    },
  },
  DEVICE_GROUP: {
    LIST: {
      PATH: '/mmsx/database/device-group',
      TITLE: 'deviceGroup',
    },
    CREATE: {
      PATH: '/mmsx/database/device-group/create',
      TITLE: 'deviceGroupCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/device-group/:id/edit',
      TITLE: 'deviceGroupEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/device-group/:id/detail',
      TITLE: 'deviceGroupDetail',
    },
  },
  INSTALLATION_TEMPLATE: {
    LIST: {
      PATH: '/mmsx/database/define-installation-template',
      TITLE: 'templateInstall',
    },
    CREATE: {
      PATH: '/mmsx/database/define-installation-template/create',
      TITLE: 'templateInstallCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/define-installation-template/:id/edit',
      TITLE: 'templateInstallEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/define-installation-template/:id/detail',
      TITLE: 'templateInstallDetail',
    },
  },
  ACCREDITATION_TEMPLATE: {
    LIST: {
      PATH: '/mmsx/database/accreditation-template',
      TITLE: 'accreditationTemplate',
    },
    CREATE: {
      PATH: '/mmsx/database/accreditation-template/create',
      TITLE: 'accreditationTemplateCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/accreditation-template/:id/edit',
      TITLE: 'accreditationTemplateEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/accreditation-template/:id/detail',
      TITLE: 'accreditationTemplateDetail',
    },
  },
  MAINTENANCE_TEMPLATE: {
    LIST: {
      PATH: '/mmsx/database/maintenance-template',
      TITLE: 'maintenanceTemplate',
    },
    CREATE: {
      PATH: '/mmsx/database/maintenance-template/create',
      TITLE: 'maintenanceTemplateCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/maintenance-template/:id/edit',
      TITLE: 'maintenanceTemplateEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/maintenance-template/:id/detail',
      TITLE: 'maintenanceTemplateDetail',
    },
  },
  MAINTENANCE_ATTRIBUTE: {
    LIST: {
      PATH: '/mmsx/database/maintenance-attribute',
      TITLE: 'maintenanceAttribute',
    },
    CREATE: {
      PATH: '/mmsx/database/maintenance-attribute/create',
      TITLE: 'maintenanceAttributeCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/maintenance-attribute/:id/edit',
      TITLE: 'maintenanceAttributeEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/maintenance-attribute/:id/detail',
      TITLE: 'maintenanceAttributeDetail',
    },
  },
  OPERATION_INDEX: {
    LIST: {
      PATH: '/mmsx/database/operation-index',
      TITLE: 'operationIndex',
    },
    CREATE: {
      PATH: '/mmsx/database/operation-index/create',
      TITLE: 'operationIndexCreate',
    },
    EDIT: {
      PATH: '/mmsx/database/operation-index/:id/edit',
      TITLE: 'operationIndexEdit',
    },
    DETAIL: {
      PATH: '/mmsx/database/operation-index/:id/detail',
      TITLE: 'operationIndexDetail',
    },
  },
}
