import { ROUTE } from '~/modules/mmsx/routes/config'

export const REQUEST_STATUS_DASHBOARD = [
  'waitForConfirmation',
  'inprogress',
  'completed',
]
export const JOB_HISTORY_DASHBOARD = [
  'maintenance',
  'suddenIncident',
  'otenCheck',
  'installation',
  'recognize',
]
export const PRIORITY_DASHBOARD = [
  '',
  'priority.trivial',
  'priority.minor',
  'priority.major',
  'priority.critical',
  'priority.blocker',
]
export const PIE_CHART_COLORS = [
  '#0761AD',
  '#FF9054',
  '#B2DF8A',
  '#7B61FF',
  '#FF0909',
]

export const LIMIT_INTERSECTION_OBSERVER = 5

export const ACTIVE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
}

export const AUTO_GENERATE_JOB_ON_SUNDAY = {
  NO: 0,
  YES: 1,
}

export const ACTIVE_STATUS_MAP = {
  [ACTIVE_STATUS.ACTIVE]: 'general:common.active',
  [ACTIVE_STATUS.INACTIVE]: 'general:common.inActive',
}

export const SUPPLY_TYPE = {
  SUPPLY: 0,
  ACCESSORY: 1,
  TOOLS: 2,
  STATIONERY: 3,
  OTHER: 4,
}

export const SUPPLY_TYPE_OPTIONS = [
  {
    id: SUPPLY_TYPE.SUPPLY,
    text: 'mmsx:general.supplies',
  },
  {
    id: SUPPLY_TYPE.ACCESSORY,
    text: 'mmsx:general.accessory',
  },
  {
    id: SUPPLY_TYPE.TOOLS,
    text: 'mmsx:general.tools',
  },
  {
    id: SUPPLY_TYPE.STATIONERY,
    text: 'mmsx:general.stationery',
  },
]

export const SUPPLY_TYPE_MAP = {
  [SUPPLY_TYPE.SUPPLY]: 'mmsx:general.supplies',
  [SUPPLY_TYPE.ACCESSORY]: 'mmsx:general.accessory',
  [SUPPLY_TYPE.TOOLS]: 'mmsx:general.tools',
  [SUPPLY_TYPE.STATIONERY]: 'mmsx:general.stationery',
}

export const ASSET_MAINTENANCE_TYPE = {
  DEVICE: 0,
  SUPPLY: 1,
}

export const ASSET_MAINTENANCE_TYPE_MAP = {
  [ASSET_MAINTENANCE_TYPE.DEVICE]: 'mmsx:general.device',
  [ASSET_MAINTENANCE_TYPE.SUPPLY]: 'mmsx:general.supplies',
}

export const JOB_TYPE_MAINTENANCE = {
  REPLACE: 0,
  MAINTENANCE: 1,
  BROKEN: 2,
}

export const JOB_TYPE_MAINTENANCE_MAP = {
  [JOB_TYPE_MAINTENANCE.REPLACE]: 'mmsx:general.replace',
  [JOB_TYPE_MAINTENANCE.MAINTENANCE]: 'mmsx:general.fixing',
  [JOB_TYPE_MAINTENANCE.BROKEN]: 'mmsx:general.broken',
}

export const ASSET_INVENTORY = {
  DEVICE_GROUP: 0,
  SUPPLY: 1,
}

export const ACTIVE_STATUS_OPTIONS = [
  {
    text: 'general:common.inActive',
    id: ACTIVE_STATUS.INACTIVE,
    color: 'pending',
  },
  {
    text: 'general:common.active',
    id: ACTIVE_STATUS.ACTIVE,
    color: 'confirmed',
  },
]

export const SUPPLIES_ACCESSORY = {
  ACCESSORY: 1,
  SUPPLIES: 0,
}

export const SUPPLIES_ACCESSORY_OPTION = [
  { value: 0, text: 'deviceList.type.supplies' },
  { value: 1, text: 'deviceList.type.accessory' },
]

export const SUPPLIES_ACCESSORY_OPTION_MAP = {
  [SUPPLIES_ACCESSORY.SUPPLIES]: 'general.supplies',
  [SUPPLIES_ACCESSORY.ACCESSORY]: 'general.accessory',
}

export const TYPE = {
  PASSFAIL: 0,
}

export const TYPE_MAP = {
  [TYPE.PASSFAIL]: 'checkType.passFail',
}

//dùng trong màn deviceList
export const TYPE_ITEM = {
  ACCESSORY: 1,
  SUPPLIES: 0,
  DEVICE: 2,
}

export const TYPE_ITEM_MAP = {
  [TYPE_ITEM.SUPPLIES]: 'deviceList.type.supplies',
  [TYPE_ITEM.ACCESSORY]: 'deviceList.type.accessory',
  [TYPE_ITEM.DEVICE]: 'deviceList.type.device',
}

export const WARNING_STATUS = {
  WAITING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  REJECTED: 4,
  RESOLVE: 5,
}

export const WARNING_STATUS_LIST = [
  {
    text: 'warningList.status.pending',
    id: WARNING_STATUS.WAITING,
    color: 'pending',
  },
  {
    text: 'warningList.status.confirmed',
    id: WARNING_STATUS.CONFIRMED,
    color: 'confirmed',
  },
  {
    text: 'warningList.status.rejected',
    id: WARNING_STATUS.REJECTED,
    color: 'rejected',
  },
  {
    text: 'warningList.status.inProgress',
    id: WARNING_STATUS.IN_PROGRESS,
    color: 'inProgress',
  },
  {
    text: 'warningList.status.completed',
    id: WARNING_STATUS.COMPLETED,
    color: 'completed',
  },
  {
    text: 'warningList.status.resolved',
    id: WARNING_STATUS.RESOLVE,
    color: 'completed',
  },
]

export const JOB_TYPE = {
  SCHEDULE_MAINTAIN: 0,
  REQUEST: 1,
  PERIOD_CHECK: 2,
  INSTALL: 3,
  ACCREDITATION: 4,
  MAINTENANCE: 5,
}

export const WARNING_TYPE = [
  {
    text: 'warningType.accreditation',
    value: JOB_TYPE.ACCREDITATION,
  },
  {
    text: 'warningType.maintenanceType',
    value: JOB_TYPE.SCHEDULE_MAINTAIN,
  },
  {
    text: 'warningType.checkList',
    value: JOB_TYPE.PERIOD_CHECK,
  },
]
export const WARNING_TYPE_OPTION = {
  ACCREDITATION: 4,
  MAINTENANCE_TYPE: 0,
  CHECKLIST: 2,
}

export const WARNING_TYPE_MAP = {
  [WARNING_TYPE_OPTION.ACCREDITATION]: 'warningType.accreditation',
  [WARNING_TYPE_OPTION.MAINTENANCE_TYPE]: 'warningType.maintenanceType',
  [WARNING_TYPE_OPTION.CHECKLIST]: 'warningType.checkList',
}

export const WARNING_PRIORITY_LEVEL = [
  {
    title: 'priority.blocker',
    value: 2,
  },
  {
    title: 'priority.major',
    value: 1,
  },
]
export const CHECKLIST_RESULT = [
  {
    title: 'fail',
    value: 0,
  },
  {
    title: 'pass',
    value: 1,
  },
]
export const CHECKLIST_CONCLUDE = [
  {
    title: 'replace',
    value: 0,
  },
  {
    title: 'continueMaintain',
    value: 1,
  },
]

export const WORK_TIME_DATA_SOURCE_TYPE = [
  {
    value: 0,
    text: 'deviceAssign.assign.mes',
  },
  {
    value: 1,
    text: 'deviceAssign.assign.input',
  },
  {
    value: 2,
    text: 'deviceAssign.assign.iot',
  },
]

export const DEVICE_ASSIGN_STATUS_OPTION = [
  {
    text: 'deviceAssign.status.unuse',
    id: 0,
    color: 'pending',
  },
  {
    text: 'deviceAssign.status.inuse',
    id: 1,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.inMaintaining',
    id: 2,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.inCrapping',
    id: 3,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.returned',
    id: 4,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.pending',
    id: 5,
    color: 'pending',
  },
]

export const DEVICE_ASSIGN_STATUS_VALUE = {
  UNUSE: 0,
  INUSE: 1,
  INMAINTAINING: 2,
  INCRAPPING: 3,
  RETURNED: 4,
  PENDING: 5,
}

export const DEVICE_CATEGORY_STATUS_OPTION = [
  {
    text: 'deviceCategory.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'deviceCategory.status.confirmed',
    id: 1,
    color: 'confirmed',
  },
]

export const DEVICE_CATEGORY_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const DEVICE_CATEGORY_STATUS_MAP = {
  [DEVICE_CATEGORY_STATUS.PENDING]: 'pending',
  [DEVICE_CATEGORY_STATUS.CONFIRMED]: 'confirmed',
}
export const ACTION_HISTORY = {
  CREATED: 0,
  UPDATED: 1,
  DELETE: 2,
  CONFIRM: 3,
  REJECT: 4,
}
export const ACTION_MAP = {
  [ACTION_HISTORY.CREATED]: 'created',
  [ACTION_HISTORY.UPDATED]: 'updated',
  [ACTION_HISTORY.DELETE]: 'delete',
  [ACTION_HISTORY.CONFIRM]: 'confirm',
  [ACTION_HISTORY.REJECT]: 'reject',
}

export const SUPPLIES_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SUPPLIES_STATUS_MAP = {
  [SUPPLIES_STATUS.PENDING]: 'pending',
  [SUPPLIES_STATUS.CONFIRMED]: 'confirmed',
}

export const PRE_FIX_CODE = '02'

export const MAINTENANCE_TEAM_TYPE = {
  OUTER: 0,
  INNER: 1,
}

export const MAINTENANCE_TEAM_TYPE_MAP = {
  [MAINTENANCE_TEAM_TYPE.OUTER]: 'maintenanceTeam.outer',
  [MAINTENANCE_TEAM_TYPE.INNER]: 'maintenanceTeam.inner',
}

export const MAINTENANCE_TEAM_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'maintenanceTeam.outer',
  },
  {
    id: 1,
    text: 'maintenanceTeam.inner',
  },
]

export const ROLE_ENUM = {
  LEADER: 0,
  MEMBER: 1,
}

export const ROLE_ENUM_MAP = {
  [ROLE_ENUM.LEADER]: 'maintenanceTeam.leader',
  [ROLE_ENUM.MEMBER]: 'maintenanceTeam.member',
}

export const ROLE_ENUM_OPTIONS = [
  {
    id: 0,
    text: 'maintenanceTeam.leader',
  },
  {
    id: 1,
    text: 'maintenanceTeam.member',
  },
]

export const SUPPLIES_CATEGORY_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SUPPLIES_CATEGORY_STATUS_MAP = {
  [SUPPLIES_CATEGORY_STATUS.PENDING]: 'suppliesCategory.status.pending',
  [SUPPLIES_CATEGORY_STATUS.CONFIRMED]: 'suppliesCategory.status.confirmed',
}

export const SUPPLIES_CATEGORY_STATUS_OPTIONS = [
  {
    text: 'suppliesCategory.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'suppliesCategory.status.confirmed',
    id: 1,
    color: 'confirmed',
  },
]

export const CHECK_TYPE = {
  PASSFAIL: 0,
}

export const CHECK_TYPE_MAP = {
  [CHECK_TYPE.PASSFAIL]: 'templateChecklist.checkType.passFail',
}

export const CHECK_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'templateChecklist.checkType.passFail',
  },
]

export const PRIORITY_LEVEL = {
  BLOCKER: 5,
  CRITICAL: 4,
  MAJOR: 3,
  MINOR: 2,
  TRIVIAL: 1,
}

export const PRIORITY_LEVEL_MAP = {
  [PRIORITY_LEVEL.BLOCKER]: 'priority.blocker',
  [PRIORITY_LEVEL.CRITICAL]: 'priority.critical',
  [PRIORITY_LEVEL.MAJOR]: 'priority.major',
  [PRIORITY_LEVEL.MINOR]: 'priority.minor',
  [PRIORITY_LEVEL.TRIVIAL]: 'priority.trivial',
}

export const PRIORITY_LEVEL_OPTIONS = [
  {
    title: 'priority.blocker',
    id: 5,
  },
  {
    title: 'priority.critical',
    id: 4,
  },
  {
    title: 'priority.major',
    id: 3,
  },
  {
    title: 'priority.minor',
    id: 2,
  },
  {
    title: 'priority.trivial',
    id: 1,
  },
]

export const DEVICE_REQUEST_STATUS = {
  WAITING_APPROVE: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  COMPLETED: 3,
}

//Request common
export const DEVICE_REQUEST_STATUS_OPTIONS = [
  {
    text: 'mmsx:general.waitingApprove',
    id: DEVICE_REQUEST_STATUS.WAITING_APPROVE,
    color: 'pending',
  },
  {
    text: 'mmsx:general.confirmed',
    id: DEVICE_REQUEST_STATUS.CONFIRMED,
    color: 'confirmed',
  },
  {
    text: 'mmsx:general.rejected',
    id: DEVICE_REQUEST_STATUS.REJECTED,
    color: 'rejected',
  },
  {
    text: 'mmsx:general.completed',
    id: DEVICE_REQUEST_STATUS.COMPLETED,
    color: 'completed',
  },
]

export const DEVICE_REQUEST_STATUS_MAP = {
  [DEVICE_REQUEST_STATUS.CONFIRMED]: 'mmsx:general.confirmed',
  [DEVICE_REQUEST_STATUS.REJECTED]: 'mmsx:general.rejected',
  [DEVICE_REQUEST_STATUS.COMPLETED]: 'mmsx:general.completed',
  [DEVICE_REQUEST_STATUS.WAITING_APPROVE]: 'mmsx:general.waitingApprove',
}

export const DEVICE_REQUEST_TICKET_STATUS_OPTION = [
  {
    text: 'requestDevice.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'requestDevice.status.awaitingITConfirmation',
    id: 1,
    color: 'active',
  },
  {
    text: 'requestDevice.status.awaitingAssigment',
    id: 2,
    color: 'inReceiving',
  },
  {
    text: 'requestDevice.status.assigned',
    id: 3,
    color: 'active',
  },
  {
    text: 'requestDevice.status.confirmed',
    id: 4,
    color: 'confirmed',
  },
  {
    text: 'requestDevice.status.rejected',
    id: 5,
    color: 'rejected',
  },
  {
    text: 'requestDevice.status.waittingExport',
    id: 6,
    color: 'exporting',
  },
]

export const DEVICE_REQUEST_TICKET_STATUS = {
  PENDING: 0,
  AWAITINGITCONFIRMATION: 1,
  AWAITINGASSIGNMENT: 2,
  ASSIGNED: 3,
  CONFIRMED: 4,
  REJECTED: 5,
  WAITTINGEXPORT: 6,
}

export const DEVICE_REQUEST_TICKET_STATUS_MAP = {
  [DEVICE_REQUEST_TICKET_STATUS.PENDING]: 'pending',
  [DEVICE_REQUEST_TICKET_STATUS.AWAITINGITCONFIRMATION]:
    'awaitingITConfirmation',
  [DEVICE_REQUEST_TICKET_STATUS.AWAITINGASSIGNMENT]: 'awaitingAssigment',
  [DEVICE_REQUEST_TICKET_STATUS.ASSIGNED]: 'assigned',
  [DEVICE_REQUEST_TICKET_STATUS.CONFIRMED]: 'confirmed',
  [DEVICE_REQUEST_TICKET_STATUS.REJECTED]: 'rejected',
  [DEVICE_REQUEST_TICKET_STATUS.WAITTINGEXPORT]: 'waittingExport',
}

//Here return

export const DEVICE_RETURN_TICKET_STATUS_OPTION = [
  {
    text: 'requestDevice.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'requestDevice.status.awaitingITConfirmation',
    id: 1,
    color: 'active',
  },
  {
    text: 'requestDevice.status.awaitingReturn',
    id: 2,
    color: 'inReceiving',
  },
  {
    text: 'requestDevice.status.returned',
    id: 3,
    color: 'received',
  },
  {
    text: 'requestDevice.status.rejected',
    id: 4,
    color: 'rejected',
  },
]

export const DEVICE_RETURN_TICKET_STATUS = {
  PENDING: 0,
  AWAITINGITCONFIRMATION: 1,
  AWAITINGRETURN: 2,
  RETURNED: 3,
  REJECTED: 4,
}

export const DEVICE_RETURN_TICKET_STATUS_MAP = {
  [DEVICE_RETURN_TICKET_STATUS.PENDING]: 'pending',
  [DEVICE_RETURN_TICKET_STATUS.AWAITINGITCONFIRMATION]:
    'awaitingITConfirmation',
  [DEVICE_RETURN_TICKET_STATUS.AWAITINGRETURN]: 'awaitingReturn',
  [DEVICE_RETURN_TICKET_STATUS.RETURNED]: 'returned',
  [DEVICE_RETURN_TICKET_STATUS.REJECTED]: 'rejected',
}

//Request-device
export const TYPE_REQUEST = {
  REQUEST: 0,
  RETURN: 1,
}

export const TYPE_REQUEST_MAP = {
  [TYPE_REQUEST.REQUEST]: 'requestDevice.request',
  [TYPE_REQUEST.RETURN]: 'requestDevice.return',
}

export const TYPE_REQUEST_OPTION = [
  {
    text: 'requestDevice.request',
    id: 0,
  },
  {
    text: 'requestDevice.return',
    id: 1,
  },
]

export const REQUEST_DEVICE_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
}

export const REQUEST_DEVICE_STATUS_MAP = {
  [REQUEST_DEVICE_STATUS.PENDING]: 'pending',
  [REQUEST_DEVICE_STATUS.CONFIRMED]: 'confirmed',
  [REQUEST_DEVICE_STATUS.REJECTED]: 'rejected',
}

export const MAINTAIN_STATUS = {
  PENDING: 1,
  CONFIRMED1: 2,
  CONFIRMED2: 3,
  NOT_EXCUTE: 4,
  REJECTED: 5,
  IN_PROGRESS: 6,
  EXECUTED: 7,
  COMPLETED: 8,
}

export const MAINTAIN_STATUS_MAP = {
  [MAINTAIN_STATUS.PENDING]: 'maintainRequestStatus.pending',
  [MAINTAIN_STATUS.CONFIRMED1]: 'maintainRequestStatus.confirmed1',
  [MAINTAIN_STATUS.CONFIRMED2]: 'maintainRequestStatus.confirmed2',
  [MAINTAIN_STATUS.NOT_EXCUTE]: 'maintainRequestStatus.notExcute',
  [MAINTAIN_STATUS.REJECTED]: 'maintainRequestStatus.rejected',
  [MAINTAIN_STATUS.IN_PROGRESS]: 'maintainRequestStatus.inProgress',
  [MAINTAIN_STATUS.EXECUTED]: 'maintainRequestStatus.executed',
  [MAINTAIN_STATUS.COMPLETED]: 'maintainRequestStatus.completed',
}

export const MAINTAIN_STATUS_OPTIONS = [
  {
    id: 1,
    text: 'maintainRequestStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'maintainRequestStatus.confirmed1',
    color: 'confirmed',
  },
  {
    id: 3,
    text: 'maintainRequestStatus.confirmed2',
    color: 'confirmed',
  },
  {
    id: 4,
    text: 'maintainRequestStatus.notExcute',
    color: 'notExcute',
  },
  {
    id: 5,
    text: 'maintainRequestStatus.rejected',
    color: 'rejected',
  },
  {
    id: 6,
    text: 'maintainRequestStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 7,
    text: 'maintainRequestStatus.executed',
    color: 'executed',
  },
  {
    id: 8,
    text: 'maintainRequestStatus.completed',
    color: 'completed',
  },
]

export const JOB_TYPE_MAP = {
  [JOB_TYPE.SCHEDULE_MAINTAIN]: 'workType.scheduleMaintain',
  [JOB_TYPE.REQUEST]: 'workType.request',
  [JOB_TYPE.PERIOD_CHECK]: 'workType.periodCheck',
  [JOB_TYPE.INSTALL]: 'workType.install',
  [JOB_TYPE.ACCREDITATION]: 'workType.accreditation',
  [JOB_TYPE.MAINTENANCE]: 'workType.accreditation',
}

export const JOB_TYPE_OPTIONS = [
  {
    text: 'workType.scheduleMaintain',
    id: 0,
  },
  {
    text: 'workType.request',
    id: 1,
  },
  {
    text: 'workType.periodCheck',
    id: 2,
  },
  {
    text: 'workType.install',
    id: 3,
  },
  {
    text: 'workType.accreditation',
    id: 4,
  },
]

export const JOB_TYPE_NOTI_OPTIONS = [
  {
    text: 'workType.scheduleMaintain',
    id: 0,
  },
  {
    text: 'workType.periodCheck',
    id: 2,
  },
  {
    text: 'workType.accreditation',
    id: 4,
  },
]

export const SETTING_TYPE_CREATE_JOB = {
  SKIP_SUNDAY: 0,
}

export const JOB_STATUS = {
  NON_ASSIGN: 0,
  WAIT_CONFIRM: 1,
  IN_PROGRESS: 2,
  REJECT: 3,
  COMPLETED: 4,
  RESOLVED: 5,
  OVERDUE: 6,
}

export const JOB_STATUS_MAP = {
  [JOB_STATUS.NON_ASSIGN]: 'common.statusList.nonAssign',
  [JOB_STATUS.WAIT_CONFIRM]: 'common.statusList.waitingToComfirm',
  [JOB_STATUS.IN_PROGRESS]: 'common.statusList.inProgress',
  [JOB_STATUS.REJECT]: 'common.statusList.reject',
  [JOB_STATUS.COMPLETED]: 'common.statusList.completed',
  [JOB_STATUS.RESOLVED]: 'common.statusList.resolved',
  [JOB_STATUS.OVERDUE]: 'common.statusList.overdue',
}

export const JOB_STATUS_LIST = [
  {
    text: 'common.statusList.nonAssign',
    id: JOB_STATUS.NON_ASSIGN,
    color: 'pending',
  },
  {
    text: 'common.statusList.waitingToComfirm',
    id: JOB_STATUS.WAIT_CONFIRM,
    color: 'pending',
  },
  {
    text: 'common.statusList.inProgress',
    id: JOB_STATUS.IN_PROGRESS,
    color: 'inProgress',
  },
  {
    text: 'common.statusList.reject',
    id: JOB_STATUS.REJECT,
    color: 'rejected',
  },
  {
    text: 'common.statusList.completed',
    id: JOB_STATUS.COMPLETED,
    color: 'completed',
  },
  {
    text: 'common.statusList.resolved',
    id: JOB_STATUS.RESOLVED,
    color: 'completed',
  },
]

export const OVERDUE_STATUS = {
  ALL: 0,
  YES: 1,
  NO: 2,
}

export const OVERDUE_STATUS_OPTIONS = [
  {
    id: OVERDUE_STATUS.ALL,
    text: 'common.statusList.all',
  },
  {
    id: OVERDUE_STATUS.YES,
    text: 'common.statusList.overdue',
  },
  {
    id: OVERDUE_STATUS.NO,
    text: 'common.statusList.notOverdue',
  },
]

export const MAINTAINANCE_STATUS_DASHBOARD_MAP = {
  [JOB_STATUS.COMPLETED]: 'dashboard.maintainanceProgress.completed',
  [JOB_STATUS.WAIT_CONFIRM]:
    'dashboard.maintainanceProgress.waitForConfirmation',
  [JOB_STATUS.IN_PROGRESS]: 'dashboard.maintainanceProgress.inprogress',
  [JOB_STATUS.RESOLVED]: 'dashboard.maintainanceProgress.resolved',
  [JOB_STATUS.OVERDUE]: 'common.statusList.outOfDate',
}

export const CREATE_PLAN_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
}
export const CREATE_PLAN_STATUS_OPTIONS = [
  {
    text: 'maintenancePlan.status.pending',
    id: CREATE_PLAN_STATUS.PENDING,
    color: 'pending',
  },
  {
    text: 'maintenancePlan.status.confirmed',
    id: CREATE_PLAN_STATUS.CONFIRMED,
    color: 'confirmed',
  },
  {
    text: 'maintenancePlan.status.rejected',
    id: CREATE_PLAN_STATUS.REJECTED,
    color: 'rejected',
  },
]
export const SUPPLY_REQUEST_TYPE = [
  { value: 1, text: 'suppliesRequest.type.returnRequest' },
  { value: 0, text: 'suppliesRequest.type.request' },
]

export const DEVICE_ASSIGN_STATUS = [
  {
    id: 0,
    text: 'deviceAssign.status.waitingConfirm',
    color: 'pending',
  },
  {
    id: 1,
    text: 'deviceAssign.status.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'deviceAssign.status.reject',
    color: 'rejected',
  },
  {
    id: 3,
    text: 'deviceAssign.status.completed',
    color: 'confirmed',
  },
]

export const DEVICE_ASSIGN_STATUS_ENUM = {
  WAIT_CONFIRM: 0,
  CONFIRMED: 1,
  REJECT: 2,
  COMPLETED: 3,
}

export const DEVICE_STATUS_ENUM = {
  ACTIVE: 0, // Đang hoạt động
  STOP: 1, // Dừng
  ERROR: 2, // Lỗi
  OFF: 3, // Tắt
}

export const ASSET_INVENTORY_ENUM = {
  DEVICE_GROUP: 0,
  SUPPLY: 1,
}

export const ASSET_INVENTORY_MAP = {
  [ASSET_INVENTORY_ENUM.DEVICE_GROUP]: 'general.deviceGroup',
  [ASSET_INVENTORY_ENUM.SUPPLY]: 'general.supply',
}

export const ASSET_INVENTORY_OPTIONS = [
  {
    text: 'general.deviceGroup',
    id: ASSET_INVENTORY_ENUM.DEVICE_GROUP,
  },
  {
    text: 'general.supply',
    id: ASSET_INVENTORY_ENUM.SUPPLY,
  },
]

export const DEVICE_STATUS_ENUM_MAP = {
  [DEVICE_STATUS_ENUM.ACTIVE]: 'deviceStatus.status.activating',
  [DEVICE_STATUS_ENUM.STOP]: 'deviceStatus.status.stop',
  [DEVICE_STATUS_ENUM.ERROR]: 'deviceStatus.status.error',
  [DEVICE_STATUS_ENUM.OFF]: 'deviceStatus.status.off',
}

export const DEVICE_STATUS_ENUM_OPTIONS = [
  {
    text: 'deviceStatus.status.activating',
    id: DEVICE_STATUS_ENUM.ACTIVE,
    color: 'confirmed',
  },
  {
    text: 'deviceStatus.status.stop',
    id: DEVICE_STATUS_ENUM.STOP,
    color: 'pending',
  },
  {
    text: 'deviceStatus.status.error',
    id: DEVICE_STATUS_ENUM.ERROR,
    color: 'rejected',
  },
  {
    text: 'deviceStatus.status.off',
    id: DEVICE_STATUS_ENUM.OFF,
    color: 'inProgress',
  },
]
export const GANTT_CHART_TYPE = {
  job: 'job',
  plan: 'plan',
}

export const TYPE_ENUM = {
  // DEFECTS: 0,
  DEVICE_GROUP: 0,
  CHECKLIST_TEMPLATE: 1,
  INSTALLATION_TEMPLATE: 2,
  ATTRIBUTE_TYPE: 3,
  MAINTENANCE_ATTRIBUTE: 4,
  SUPPLY_GROUP: 5,
  SUPPLY: 6,
  DEVICE: 7,
}

export const TYPE_ENUM_EXPORT = {
  // @TODO: <linh.taquang> add type number export
  COMPANY: 1,
  FACTORY: 2,
  OPERATION_VALUE: 28,
}

export const DEVICE_REQUEST_TYPE = {
  REQUEST: 0,
  RETURN: 1,
}

export const DEVICE_REQUEST_ACTION = {
  LEADER_APPROVE: 'leader-approve',
  ME_APPROVE: 'me-approve',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
}

export const DEVICE_STATUS = {
  USING: 0,
  PREVENTIVE: 2,
  BROKEN: 3,
  AWAIT_CLEARANCE: 4,
  ACTIVE: 5,
  STOP: 6,
}

export const DEVICE_STATUS_MAP = {
  [DEVICE_STATUS.USING]: 'general.using',
  [DEVICE_STATUS.PREVENTIVE]: 'general.preventive',
  [DEVICE_STATUS.BROKEN]: 'general.broken',
  [DEVICE_STATUS.AWAIT_CLEARANCE]: 'general.awaitClearance',
  [DEVICE_STATUS.ACTIVE]: 'general.active',
  [DEVICE_STATUS.STOP]: 'general.stop',
}

export const DEVICE_STATUS_OPTIONS = [
  {
    id: DEVICE_STATUS.USING,
    text: 'general.using',
  },
  {
    id: DEVICE_STATUS.PREVENTIVE,
    text: 'general.preventive',
  },
  {
    id: DEVICE_STATUS.BROKEN,
    text: 'general.broken',
  },
  {
    id: DEVICE_STATUS.AWAIT_CLEARANCE,
    text: 'general.awaitClearance',
  },
]

export const DEVICE_ACTIVE_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
}

export const DEVICE_ACTIVE_STATUS_MAP = {
  [DEVICE_ACTIVE_STATUS.INACTIVE]: 'deviceList.inactive',
  [DEVICE_ACTIVE_STATUS.ACTIVE]: 'deviceList.active',
}

export const DEVICE_ACTIVE_STATUS_OPTIONS = [
  {
    id: DEVICE_ACTIVE_STATUS.INACTIVE,
    text: 'deviceList.inactive',
  },
  {
    id: DEVICE_ACTIVE_STATUS.ACTIVE,
    text: 'deviceList.active',
  },
]

export const TRANSFER_REQUEST_TYPE = {
  RENT: 0,
  BUY: 1,
}

export const TRANSFER_REQUEST_TYPE_MAP = {
  [TRANSFER_REQUEST_TYPE.BUY]: 'general.requestBuy',
  [TRANSFER_REQUEST_TYPE.RENT]: 'general.requestRent',
}

export const TRANSFER_REQUEST_TYPE_OPTIONS = [
  {
    id: TRANSFER_REQUEST_TYPE.RENT,
    text: 'general.requestRent',
  },
  {
    id: TRANSFER_REQUEST_TYPE.BUY,
    text: 'general.requestBuy',
  },
]

export const ASSET_TYPE = {
  RENT: 0,
  BUY: 1,
}

export const ASSET_TYPE_MAP = {
  [ASSET_TYPE.BUY]: 'general.buy',
  [ASSET_TYPE.RENT]: 'general.rent',
}

export const ASSET_TYPE_OPTIONS = [
  {
    id: ASSET_TYPE.RENT,
    text: 'general.rent',
  },
  {
    id: ASSET_TYPE.BUY,
    text: 'general.buy',
  },
]

export const REQUEST_TYPE = {
  DEVICE_ASSIGN: 0,
  RETURN_SUPPLY: 1,
  BUY_SUPPLY: 2,
}

export const REQUEST_TYPE_MAP = {
  [REQUEST_TYPE.DEVICE_ASSIGN]: 'warehouseImportManagement.type.deviceAssign',
  [REQUEST_TYPE.RETURN_SUPPLY]:
    'warehouseImportManagement.type.requestReturnSupply',
  [REQUEST_TYPE.BUY_SUPPLY]: 'warehouseImportManagement.type.requestBuySupply',
}

export const REQUEST_TYPE_OPTIONS = [
  {
    id: REQUEST_TYPE.DEVICE_ASSIGN,
    text: 'warehouseImportManagement.type.deviceAssign',
  },
  {
    id: REQUEST_TYPE.RETURN_SUPPLY,
    text: 'warehouseImportManagement.type.requestReturnSupply',
  },
  {
    id: REQUEST_TYPE.BUY_SUPPLY,
    text: 'warehouseImportManagement.type.requestBuySupply',
  },
]

export const REQUEST_TYPE_SUPPY_OPTIONS = [
  {
    id: REQUEST_TYPE.RETURN_SUPPLY,
    text: 'warehouseImportManagement.type.requestReturnSupply',
  },
  {
    id: REQUEST_TYPE.BUY_SUPPLY,
    text: 'warehouseImportManagement.type.requestBuySupply',
  },
]

export const REQUEST_TYPE_DEVICE_OPTIONS = [
  {
    id: REQUEST_TYPE.DEVICE_ASSIGN,
    text: 'warehouseImportManagement.type.deviceAssign',
  },
]

export const WAREHOUSE_EXPORT_REQUEST_TYPE = {
  PROVIDE_SUPPLY_REQUEST: 0,
  DEVICE_RETURN_REQUEST: 1,
  TRANSFER_TICKET: 2,
}

export const WAREHOUSE_EXPORT_REQUEST_TYPE_MAP = {
  [WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST]:
    'warehouseExportManagement.type.requestReturnMaterial',
  [WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST]:
    'warehouseExportManagement.type.requestSupply',
  [WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET]:
    'warehouseExportManagement.type.transferRequest',
}

export const WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS = [
  {
    id: WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
    text: 'warehouseExportManagement.type.requestReturnMaterial',
  },
  {
    id: WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST,
    text: 'warehouseExportManagement.type.requestSupply',
  },
  {
    id: WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET,
    text: 'warehouseExportManagement.type.transferRequest',
  },
]

export const WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_DEVICE = [
  {
    id: WAREHOUSE_EXPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
    text: 'warehouseExportManagement.type.requestReturnMaterial',
  },
  {
    id: WAREHOUSE_EXPORT_REQUEST_TYPE.TRANSFER_TICKET,
    text: 'warehouseExportManagement.type.transferRequest',
  },
]

export const WAREHOUSE_EXPORT_REQUEST_TYPE_OPTIONS_SUPPLY = [
  {
    id: WAREHOUSE_EXPORT_REQUEST_TYPE.PROVIDE_SUPPLY_REQUEST,
    text: 'warehouseExportManagement.type.requestSupply',
  },
]

export const WAREHOUSE_IMPORT_REQUEST_TYPE = {
  DEVICE_RETURN_REQUEST: 0,
  SUPPLY_RETURN_REQUEST: 1,
  TRANSFER_TICKET: 2,
  SUPPLY_PURCHASE_REQUEST: 3,
  DEVICE_PURCHASE_REQUEST: 4,
}

export const WAREHOUSE_IMPORT_REQUEST_TYPE_MAP = {
  [WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST]:
    'mmsx:warehouseImportRequest.deviceReturnRequest',
  [WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST]:
    'mmsx:warehouseImportRequest.supplyReturnRequest',
  [WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET]:
    'mmsx:warehouseImportRequest.transferTicket',
  [WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST]:
    'mmsx:warehouseImportRequest.supplyPurchaseRequest',
  [WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST]:
    'mmsx:warehouseImportRequest.devicePurchaseRequest',
}

export const WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS = [
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
    text: 'mmsx:warehouseImportRequest.deviceReturnRequest',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
    text: 'mmsx:warehouseImportRequest.supplyReturnRequest',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET,
    text: 'mmsx:warehouseImportRequest.transferTicket',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
    text: 'mmsx:warehouseImportRequest.supplyPurchaseRequest',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
    text: 'mmsx:warehouseImportRequest.devicePurchaseRequest',
  },
]

export const WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_DEVICE = [
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_RETURN_REQUEST,
    text: 'mmsx:warehouseImportRequest.deviceReturnRequest',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.TRANSFER_TICKET,
    text: 'mmsx:warehouseImportRequest.transferTicket',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.DEVICE_PURCHASE_REQUEST,
    text: 'mmsx:warehouseImportRequest.devicePurchaseRequest',
  },
]

export const WAREHOUSE_IMPORT_REQUEST_TYPE_OPTIONS_SUPPLY = [
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_RETURN_REQUEST,
    text: 'mmsx:warehouseImportRequest.supplyReturnRequest',
  },
  {
    id: WAREHOUSE_IMPORT_REQUEST_TYPE.SUPPLY_PURCHASE_REQUEST,
    text: 'mmsx:warehouseImportRequest.supplyPurchaseRequest',
  },
]

export const REQUEST_TYPE_EXPORT = {
  PROVIDE_SUPPLY_REQUEST: 0,
  DEVICE_TRANSFER_REQUEST: 1,
  BORROW_TRANSFER_REQUEST: 2,
  RETURN_DEVICE_REQUEST: 3,
}

export const REQUEST_TYPE_EXPORT_MAP = {
  [REQUEST_TYPE_EXPORT.DEVICE_TRANSFER_REQUEST]:
    'warehouseExportManagement.type.transferRequest',
  [REQUEST_TYPE_EXPORT.BORROW_TRANSFER_REQUEST]:
    'warehouseExportManagement.type.borrowRequest',
  [REQUEST_TYPE_EXPORT.PROVIDE_SUPPLY_REQUEST]:
    'warehouseExportManagement.type.requestSupply',
  [REQUEST_TYPE_EXPORT.RETURN_DEVICE_REQUEST]:
    'warehouseExportManagement.type.requestReturnMaterial',
}

export const REQUEST_TYPE_EXPORT_OPTIONS = [
  {
    id: REQUEST_TYPE_EXPORT.DEVICE_TRANSFER_REQUEST,
    text: 'warehouseExportManagement.type.transferRequest',
  },
  {
    id: REQUEST_TYPE_EXPORT.BORROW_TRANSFER_REQUEST,
    text: 'warehouseExportManagement.type.borrowRequest',
  },
  {
    id: REQUEST_TYPE_EXPORT.PROVIDE_SUPPLY_REQUEST,
    text: 'warehouseExportManagement.type.requestSupply',
  },
  {
    id: REQUEST_TYPE_EXPORT.RETURN_DEVICE_REQUEST,
    text: 'warehouseExportManagement.type.requestReturnMaterial',
  },
]

export const REQUEST_TYPE_EXPORT_DEVICE_OPTIONS = [
  {
    id: REQUEST_TYPE_EXPORT.DEVICE_TRANSFER_REQUEST,
    text: 'warehouseExportManagement.type.transferRequest',
  },
  {
    id: REQUEST_TYPE_EXPORT.BORROW_TRANSFER_REQUEST,
    text: 'warehouseExportManagement.type.borrowRequest',
  },
  {
    id: REQUEST_TYPE_EXPORT.RETURN_DEVICE_REQUEST,
    text: 'warehouseExportManagement.type.requestReturnMaterial',
  },
]

export const REQUEST_TYPE_EXPORT_SUPPLY_OPTIONS = [
  {
    id: REQUEST_TYPE_EXPORT.PROVIDE_SUPPLY_REQUEST,
    text: 'warehouseExportManagement.type.requestSupply',
  },
]

export const SUPPLY_REQUEST_TYPE_ENUM = {
  PROVIDE: 0,
  RETURN: 1,
}

export const SUPPLY_REQUEST_TYPE_MAP = {
  [SUPPLY_REQUEST_TYPE_ENUM.PROVIDE]: 'suppliesRequest.type.request',
  [SUPPLY_REQUEST_TYPE_ENUM.RETURN]: 'suppliesRequest.type.returnRequest',
}

export const SUPPLY_REQUEST_STATUS_ENUM = {
  WAITING: 0,
  CONFIRM: 1,
  REJECT: 2,
  COMPLETED: 3,
  AWAIT_RETURN: 4,
}

export const SUPPLY_REQUEST_STATUS_OPTIONS = [
  {
    id: SUPPLY_REQUEST_STATUS_ENUM.WAITING,
    text: 'mmsx:general.waitingApprove',
    color: 'pending',
  },
  {
    id: SUPPLY_REQUEST_STATUS_ENUM.CONFIRM,
    text: 'mmsx:general.confirmed',
    color: 'completed',
  },
  {
    id: SUPPLY_REQUEST_STATUS_ENUM.COMPLETED,
    text: 'mmsx:general.completed',
    color: 'completed',
  },
  {
    id: SUPPLY_REQUEST_STATUS_ENUM.REJECT,
    text: 'mmsx:general.rejected',
    color: 'rejected',
  },
  {
    id: SUPPLY_REQUEST_STATUS_ENUM.AWAIT_RETURN,
    text: 'mmsx:general.awaitReturn',
    color: 'active',
  },
]

export const REPAIR_REQUEST_STATUS = {
  WAIT_APPROVE: 0,
  CONFIRMED: 1,
  REJECT: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  RESOLVED: 5,
}

export const REPAIR_REQUEST_STATUS_MAP = {
  [REPAIR_REQUEST_STATUS.WAIT_APPROVE]: 'repairRequest.status.waitingApprove',
  [REPAIR_REQUEST_STATUS.CONFIRMED]: 'repairRequest.status.confirmed',
  [REPAIR_REQUEST_STATUS.REJECT]: 'repairRequest.status.rejected',
  [REPAIR_REQUEST_STATUS.IN_PROGRESS]: 'repairRequest.status.inprogress',
  [REPAIR_REQUEST_STATUS.COMPLETED]: 'repairRequest.status.completed',
  [REPAIR_REQUEST_STATUS.RESOLVED]: 'repairRequest.status.resolved',
}

export const REPAIR_REQUEST_STATUS_OPTIONS = [
  {
    text: 'mmsx:general.waitingApprove',
    id: REPAIR_REQUEST_STATUS.WAIT_APPROVE,
    color: 'pending',
  },
  {
    text: 'mmsx:general.confirmed',
    id: REPAIR_REQUEST_STATUS.CONFIRMED,
    color: 'confirmed',
  },
  {
    text: 'mmsx:general.rejected',
    id: REPAIR_REQUEST_STATUS.REJECT,
    color: 'rejected',
  },
  {
    text: 'mmsx:general.inprogress',
    id: REPAIR_REQUEST_STATUS.IN_PROGRESS,
    color: 'inProgress',
  },
  {
    text: 'repairRequest.status.completed',
    id: REPAIR_REQUEST_STATUS.COMPLETED,
    color: 'completed',
  },
  {
    text: 'mmsx:general.resolved',
    id: REPAIR_REQUEST_STATUS.RESOLVED,
    color: 'completed',
  },
]

export const REPAIR_REQUEST_ACTION = {
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
}

export const REPAIR_REQUEST_PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
}

export const REPAIR_REQUEST_PRIORITY_MAP = {
  [REPAIR_REQUEST_PRIORITY.LOW]: 'repairRequest.priority.low',
  [REPAIR_REQUEST_PRIORITY.MEDIUM]: 'repairRequest.priority.medium',
  [REPAIR_REQUEST_PRIORITY.HIGH]: 'repairRequest.priority.high',
}

export const REPAIR_REQUEST_PRIORITY_OPTIONS = [
  {
    id: REPAIR_REQUEST_PRIORITY.LOW,
    text: 'repairRequest.priority.low',
  },
  {
    id: REPAIR_REQUEST_PRIORITY.MEDIUM,
    text: 'repairRequest.priority.medium',
  },
  {
    id: REPAIR_REQUEST_PRIORITY.HIGH,
    text: 'repairRequest.priority.high',
  },
]

// warehouse import request
export const WAREHOUSE_IMPORT_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  COMPLETED: 3,
}

export const WAREHOUSE_IMPORT_STATUS_MAP = {
  [WAREHOUSE_IMPORT_STATUS.PENDING]: 'warehouseImportManagement.status.pending',
  [WAREHOUSE_IMPORT_STATUS.CONFIRMED]:
    'warehouseImportManagement.status.confirmed',
  [WAREHOUSE_IMPORT_STATUS.REJECTED]:
    'warehouseImportManagement.status.rejected',
  [WAREHOUSE_IMPORT_STATUS.COMPLETED]:
    'warehouseImportManagement.status.completed',
}

export const WAREHOUSE_IMPORT_STATUS_OPTIONS = [
  {
    id: WAREHOUSE_IMPORT_STATUS.PENDING,
    text: 'warehouseImportManagement.status.pending',
    color: 'pending',
  },
  {
    id: WAREHOUSE_IMPORT_STATUS.CONFIRMED,
    text: 'warehouseImportManagement.status.confirmed',
    color: 'confirmed',
  },
  {
    id: WAREHOUSE_IMPORT_STATUS.REJECTED,
    text: 'warehouseImportManagement.status.rejected',
    color: 'rejected',
  },
  {
    id: WAREHOUSE_IMPORT_STATUS.COMPLETED,
    text: 'warehouseImportManagement.status.completed',
    color: 'completed',
  },
]

// warehouse import ticket
export const WAREHOUSE_IMPORT_TICKET_STATUS_OPTIONS = [
  {
    id: WAREHOUSE_IMPORT_STATUS.PENDING,
    text: 'warehouseImportManagement.status.pending',
    color: 'pending',
  },
  {
    id: WAREHOUSE_IMPORT_STATUS.CONFIRMED,
    text: 'warehouseImportManagement.status.confirmed',
    color: 'confirmed',
  },
  {
    id: WAREHOUSE_IMPORT_STATUS.REJECTED,
    text: 'warehouseImportManagement.status.rejected',
    color: 'rejected',
  },
]

// warehouse export
export const WAREHOUSE_EXPORT_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  COMPLETED: 3,
}

export const WAREHOUSE_EXPORT_STATUS_MAP = {
  [WAREHOUSE_EXPORT_STATUS.PENDING]: 'warehouseImportManagement.status.pending',
  [WAREHOUSE_EXPORT_STATUS.CONFIRMED]:
    'warehouseImportManagement.status.confirmed',
  [WAREHOUSE_EXPORT_STATUS.REJECTED]:
    'warehouseImportManagement.status.rejected',
  [WAREHOUSE_EXPORT_STATUS.COMPLETED]:
    'warehouseImportManagement.status.completed',
}

export const WAREHOUSE_EXPORT_STATUS_OPTIONS = [
  {
    id: WAREHOUSE_EXPORT_STATUS.PENDING,
    text: 'warehouseImportManagement.status.pending',
    color: 'pending',
  },
  {
    id: WAREHOUSE_EXPORT_STATUS.CONFIRMED,
    text: 'warehouseImportManagement.status.confirmed',
    color: 'confirmed',
  },
  {
    id: WAREHOUSE_EXPORT_STATUS.REJECTED,
    text: 'warehouseImportManagement.status.rejected',
    color: 'rejected',
  },
  {
    id: WAREHOUSE_EXPORT_STATUS.COMPLETED,
    text: 'warehouseImportManagement.status.completed',
    color: 'completed',
  },
]

// warehouse export ticket
export const WAREHOUSE_EXPORT_TICKET_STATUS_OPTIONS = [
  {
    id: WAREHOUSE_EXPORT_STATUS.PENDING,
    text: 'warehouseImportManagement.status.pending',
    color: 'pending',
  },
  {
    id: WAREHOUSE_EXPORT_STATUS.CONFIRMED,
    text: 'warehouseImportManagement.status.confirmed',
    color: 'confirmed',
  },
  {
    id: WAREHOUSE_EXPORT_STATUS.REJECTED,
    text: 'warehouseImportManagement.status.rejected',
    color: 'rejected',
  },
]

// transfer ticket
export const TRANSFER_TICKET_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  EXPORTING: 3,
  EXPORTED: 4,
  IMPORTING: 5,
  IMPORTED: 6,
  RETURNING: 7,
  COMPLETED: 8,
}

export const TRANSFER_TICKET_STATUS_MAP = {
  [TRANSFER_TICKET_STATUS.PENDING]: 'warehouseImportManagement.status.pending',
  [TRANSFER_TICKET_STATUS.CONFIRMED]:
    'warehouseImportManagement.status.confirmed',
  [TRANSFER_TICKET_STATUS.REJECTED]:
    'warehouseImportManagement.status.rejected',
  [TRANSFER_TICKET_STATUS.COMPLETED]:
    'warehouseImportManagement.status.completed',
  [TRANSFER_TICKET_STATUS.EXPORTING]:
    'warehouseImportManagement.status.exporting',
  [TRANSFER_TICKET_STATUS.IMPORTING]:
    'warehouseImportManagement.status.importing',
  [TRANSFER_TICKET_STATUS.EXPORTED]:
    'warehouseImportManagement.status.exported',
  [TRANSFER_TICKET_STATUS.RETURNING]:
    'warehouseImportManagement.status.returning',
}

export const TRANSFER_TICKET_STATUS_OPTIONS = [
  {
    id: TRANSFER_TICKET_STATUS.PENDING,
    text: 'warehouseImportManagement.status.pending',
    color: 'pending',
  },
  {
    id: TRANSFER_TICKET_STATUS.CONFIRMED,
    text: 'warehouseImportManagement.status.confirmed',
    color: 'confirmed',
  },
  {
    id: TRANSFER_TICKET_STATUS.REJECTED,
    text: 'warehouseImportManagement.status.rejected',
    color: 'rejected',
  },
  {
    id: TRANSFER_TICKET_STATUS.EXPORTING,
    text: 'warehouseImportManagement.status.exporting',
    color: 'pending',
  },
  {
    id: TRANSFER_TICKET_STATUS.EXPORTED,
    text: 'warehouseImportManagement.status.exported',
    color: 'pending',
  },
  {
    id: TRANSFER_TICKET_STATUS.IMPORTING,
    text: 'warehouseImportManagement.status.importing',
    color: 'pending',
  },
  {
    id: TRANSFER_TICKET_STATUS.IMPORTED,
    text: 'warehouseImportManagement.status.imported',
    color: 'pending',
  },
  {
    id: TRANSFER_TICKET_STATUS.RETURNING,
    text: 'warehouseImportManagement.status.returning',
    color: 'pending',
  },
  {
    id: TRANSFER_TICKET_STATUS.COMPLETED,
    text: 'warehouseImportManagement.status.completed',
    color: 'completed',
  },
]

export const ASSET_PROJECTION_TYPE = {
  SUPPLY: 0,
  DEVICE_GROUP: 1,
}

export const ASSET_PROJECTION_TYPE_MAP = {
  [ASSET_PROJECTION_TYPE.SUPPLY]: 'contingencyPlan.type.supply',
  [ASSET_PROJECTION_TYPE.DEVICE_GROUP]: 'contingencyPlan.type.device',
}

export const ASSET_PROJECTION_TYPE_OPTIONS = [
  {
    id: ASSET_PROJECTION_TYPE.SUPPLY,
    text: 'contingencyPlan.type.supply',
  },
  {
    id: ASSET_PROJECTION_TYPE.DEVICE_GROUP,
    text: 'contingencyPlan.type.device',
  },
]

export const ASSET_PROJECTION_STATUS = {
  AWAITING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
}

export const ASSET_PROJECTION_STATUS_MAP = {
  [ASSET_PROJECTION_STATUS.AWAITING]: 'contingencyPlan.status.awaiting',
  [ASSET_PROJECTION_STATUS.CONFIRMED]: 'contingencyPlan.status.confirmed',
  [ASSET_PROJECTION_STATUS.REJECTED]: 'contingencyPlan.status.rejected',
}

export const ASSET_PROJECTION_STATUS_OPTIONS = [
  {
    id: ASSET_PROJECTION_STATUS.AWAITING,
    text: 'contingencyPlan.status.awaiting',
    color: 'pending',
  },
  {
    id: ASSET_PROJECTION_STATUS.CONFIRMED,
    text: 'contingencyPlan.status.confirmed',
    color: 'confirmed',
  },
  {
    id: ASSET_PROJECTION_STATUS.REJECTED,
    text: 'contingencyPlan.status.rejected',
    color: 'rejected',
  },
]
export const JOB_REPORT_STATUS_ENUM = {
  UN_RESOLVE: 0,
  IN_PROGRESS: 1,
  RESOLVED: 2,
  NO_JOB: 3,
}

export const SPARE_PART_PLAN_STATUS = {
  WAITING: 0,
  CONFIRM: 1,
  REJECT: 2,
}

export const SPARE_PART_PLAN_STATUS_OPTION = [
  {
    id: SPARE_PART_PLAN_STATUS.WAITING,
    text: 'mmsx:general.waitingApprove',
    color: 'pending',
  },
  {
    id: SPARE_PART_PLAN_STATUS.CONFIRM,
    text: 'mmsx:general.confirmed',
    color: 'completed',
  },
  {
    id: SPARE_PART_PLAN_STATUS.REJECT,
    text: 'mmsx:general.rejected',
    color: 'rejected',
  },
]

export const REPORT_JOB_TYPE_ENUM = {
  PERIOD_MAINTENANCE: 0, // bảo trì
  MAINTENANCE: 1, // bảo dưỡng
}

export const REPORT_JOB_TYPE_OPTIONS = [
  {
    id: REPORT_JOB_TYPE_ENUM.PERIOD_MAINTENANCE,
    text: 'general.periodMaintenance',
  },
  {
    id: REPORT_JOB_TYPE_ENUM.MAINTENANCE,
    text: 'general.maintenance',
  },
]

export const SETTING_SIGNATURE_TYPE = {
  WAREHOUSE_IMPORT_TICKET: 0,
  WAREHOUSE_EXPORT_TICKET: 1,
  TRANSFER_TICKET: 2,
  SPARE_PART_PLAN: 3,
}

export const SETTING_SIGNATURE_TYPE_OPTIONS = [
  {
    id: SETTING_SIGNATURE_TYPE.WAREHOUSE_IMPORT_TICKET,
    text: 'signatureConfiguration.warehouseImportTicket',
  },
  {
    id: SETTING_SIGNATURE_TYPE.WAREHOUSE_EXPORT_TICKET,
    text: 'signatureConfiguration.warehouseExportTicket',
  },
  {
    id: SETTING_SIGNATURE_TYPE.TRANSFER_TICKET,
    text: 'signatureConfiguration.transferTicket',
  },
  {
    id: SETTING_SIGNATURE_TYPE.SPARE_PART_PLAN,
    text: 'signatureConfiguration.sparePartPlan',
  },
]

export const SETTING_JOB_PERIOD_ENUM = {
  ONE_DAY: 0,
  LESS_THAN_THREE_MONTH: 1,
  MORE_THAN_THREE_MONTH: 2,
  OTHER: 3,
}

export const SETTING_JOB_PERIOD_MAP = {
  [SETTING_JOB_PERIOD_ENUM.ONE_DAY]: 'general.oneDay',
  [SETTING_JOB_PERIOD_ENUM.LESS_THAN_THREE_MONTH]: 'general.lessThreeMonth',
  [SETTING_JOB_PERIOD_ENUM.MORE_THAN_THREE_MONTH]: 'general.moreThreeMonth',
  [SETTING_JOB_PERIOD_ENUM.OTHER]: 'general.orther',
}

export const UPDATE_INVENTORY_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
}

export const UPDATE_INVENTORY_STATUS_MAP = {
  [UPDATE_INVENTORY_STATUS.PENDING]: 'updateInventoryStatus.pending',
  [UPDATE_INVENTORY_STATUS.CONFIRMED]: 'updateInventoryStatus.confirmed',
  [UPDATE_INVENTORY_STATUS.REJECTED]: 'updateInventoryStatus.rejected',
}

export const UPDATE_INVENTORY_STATUS_OPTIONS = [
  {
    id: UPDATE_INVENTORY_STATUS.PENDING,
    text: 'updateInventoryStatus.pending',
    color: 'pending',
  },
  {
    id: UPDATE_INVENTORY_STATUS.CONFIRMED,
    text: 'updateInventoryStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: UPDATE_INVENTORY_STATUS.REJECTED,
    text: 'updateInventoryStatus.rejected',
    color: 'rejected',
  },
]

export const SOURCE_MANAGE_ENUM = {
  MMSX: 0,
  WFX: 1,
}

export const SOURCE_MANAGE_OPTIONS = [
  {
    text: 'database:general.manageBy.wfx',
    id: SOURCE_MANAGE_ENUM.WFX,
  },
  {
    text: 'database:general.manageBy.mmsx',
    id: SOURCE_MANAGE_ENUM.MMSX,
  },
]

export const DASHBOARD_CHART = {
  JOB_SPEED: 0,
  JOB_HISTORY: 1,
  DEVICE_ERROR: 2,
  DEVICE_USAGE: 3,
  DEVICE_STATUS: 4,
  JOB_SUMMARY: 5,
  TRANSFER_SUMMARY: 6,
}

export const MMSX_DASHBOARD_CHART_OPTION = [
  {
    id: DASHBOARD_CHART.JOB_SUMMARY,
    text: 'mmsx:dashboard.chart.jobSummary',
  },
  {
    id: DASHBOARD_CHART.JOB_SPEED,
    text: 'mmsx:dashboard.chart.maintainanceProgress',
  },
  {
    id: DASHBOARD_CHART.JOB_HISTORY,
    text: 'mmsx:dashboard.chart.requestStatus',
  },
  {
    id: DASHBOARD_CHART.DEVICE_USAGE,
    text: 'mmsx:dashboard.chart.deviceStatus',
  },
  {
    id: DASHBOARD_CHART.DEVICE_ERROR,
    text: 'mmsx:dashboard.chart.deviceError',
  },
  {
    id: DASHBOARD_CHART.TRANSFER_SUMMARY,
    text: 'mmsx:dashboard.transferRequest',
  },
  {
    id: DASHBOARD_CHART.DEVICE_STATUS,
    text: 'mmsx:dashboard.deviceUsingStatus.title',
  },
]

export const MMSX_DASHBOARD_CHART_OPTION_DEFAULT = [
  // {
  //   id: DASHBOARD_CHART.JOB_SUMMARY,
  //   text: 'mmsx:dashboard.chart.jobSummary',
  // },
  // {
  //   id: DASHBOARD_CHART.JOB_SPEED,
  //   text: 'mmsx:dashboard.chart.maintainanceProgress',
  // },
  // {
  //   id: DASHBOARD_CHART.JOB_HISTORY,
  //   text: 'mmsx:dashboard.chart.requestStatus',
  // },
  // {
  //   id: DASHBOARD_CHART.DEVICE_USAGE,
  //   text: 'mmsx:dashboard.chart.deviceStatus',
  // },
]

export const HISTORY_ACTION = {
  CREATE: 0,
  UPDATE: 1,
  DELETE: 2,
  CONFIRM: 3,
  REJECT: 4,
  UPDATE_TIME: 5,
}

export const FIELDS_LOG_HISTORY = {
  STATUS: 'status',
  NAME_OTHER: 'nameOther',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
  PRICE: 'price',
  AREA_ID: 'areaId',
  FACTORY_ID: 'factoryId',
  WAREHOUSE_ID: 'warehouseId',
  SUPPLY_GROUP_ID: 'supplyGroupId',
  SUPPLY_TYPE_ID: 'supplyTypeId',
  VENDOR_ID: 'vendorId',
  UNIT_ID: 'unitId',
  ORIGIN_FACTORY_ID: 'originFactoryId',
}

export const FIELDS_LOG_HISTORY_MAP = {
  [FIELDS_LOG_HISTORY.STATUS]: 'general:common.status',
  [FIELDS_LOG_HISTORY.NAME_OTHER]: 'mmsx:supplies.form.field.nameOther',
  [FIELDS_LOG_HISTORY.NAME]: 'mmsx:deviceList.name',
  [FIELDS_LOG_HISTORY.DESCRIPTION]: 'mmsx:ganttChart.description',
  [FIELDS_LOG_HISTORY.ACTIVE]: 'mmsx:deviceList.activeStatus',
  [FIELDS_LOG_HISTORY.PRICE]: 'mmsx:deviceList.price',
  [FIELDS_LOG_HISTORY.AREA_ID]: 'mmsx:deviceList.area',
  [FIELDS_LOG_HISTORY.FACTORY_ID]: 'mmsx:deviceList.factory',
  [FIELDS_LOG_HISTORY.WAREHOUSE_ID]: 'mmsx:deviceList.warehouse',
  [FIELDS_LOG_HISTORY.SUPPLY_GROUP_ID]: 'mmsx:supplies.form.field.categoryId',
  [FIELDS_LOG_HISTORY.SUPPLY_TYPE_ID]: 'mmsx:deviceList.supplyType',
  [FIELDS_LOG_HISTORY.VENDOR_ID]: 'mmsx:deviceList.vendor',
  [FIELDS_LOG_HISTORY.UNIT_ID]: 'mmsx:deviceList.unit',
  [FIELDS_LOG_HISTORY.ORIGIN_FACTORY_ID]: 'mmsx:deviceList.originFactory',
}

export const HISTORY_REASON_REF = {
  DEVICE_ASSIGNMENT: 'DeviceAssignment',
  WAREHOUSE_EXPORT: 'WarehouseExport',
  WAREHOUSE_IMPORT: 'WarehouseImport',
  UPDATE_INVENTORY: 'UpdateInventoryTicket',
  TRANSFER_TICKET: 'TransferTicket',
}

export const HISTORY_REASON_REF_MAP = {
  [HISTORY_REASON_REF.DEVICE_ASSIGNMENT]: 'mmsx:menu.deviceAssign',
  [HISTORY_REASON_REF.WAREHOUSE_EXPORT]:
    'mmsx:signatureConfiguration.warehouseExportTicket',
  [HISTORY_REASON_REF.WAREHOUSE_IMPORT]:
    'mmsx:signatureConfiguration.warehouseImportTicket',
  [HISTORY_REASON_REF.UPDATE_INVENTORY]: 'mmsx:menu.deviceInventory',
  [HISTORY_REASON_REF.TRANSFER_TICKET]: 'mmsx:menu.transferTicket',
}

export const HISTORY_REASON_REF_ROUTE = {
  [HISTORY_REASON_REF.DEVICE_ASSIGNMENT]: ROUTE.DEVICE_ASSIGN.DETAIL.PATH,
  [HISTORY_REASON_REF.WAREHOUSE_EXPORT]:
    ROUTE.WAREHOUSE_EXPORT_TICKET.DETAIL.PATH,
  [HISTORY_REASON_REF.WAREHOUSE_IMPORT]:
    ROUTE.WAREHOUSE_IMPORT_TICKET.DETAIL.PATH,
  [HISTORY_REASON_REF.UPDATE_INVENTORY]: ROUTE.DEVICE_INVENTORY.DETAIL.PATH,
  [HISTORY_REASON_REF.TRANSFER_TICKET]: ROUTE.TRANSFER_TICKET.DETAIL.PATH,
}

export const ORDER_TYPE = {
  IMPORT: 0,
  EXPORT: 1,
}

export const ORDER_TYPE_MAP = {
  [ORDER_TYPE.IMPORT]: 'orderType.import',
  [ORDER_TYPE.EXPORT]: 'orderType.export',
}

export const ORDER_TYPE_OPTIONS = [
  {
    id: 0,
    name: 'orderType.import',
  },
  {
    id: 1,
    name: 'orderType.export',
  },
]

export const ORDER_TYPE_ENUM = {
  PO: 1,
  PRO: 2,
  SO: 3,
  Transfer: 4,
}

export const ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}

export const ORDER_STATUS_MAP = {
  [ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
  [ORDER_STATUS.IN_PROGRESS]: 'orderStatus.inProgress',
  [ORDER_STATUS.APPROVED]: 'orderStatus.approved',
  [ORDER_STATUS.REJECTED]: 'orderStatus.rejected',
  [ORDER_STATUS.COMPLETED]: 'orderStatus.completed',
}

export const ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'orderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'orderStatus.approved',
    color: 'approved',
  },
  {
    id: 4,
    text: 'orderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'orderStatus.rejected',
    color: 'rejected',
  },
]

export const DEFAULT_ITEM_TYPE_ENUM = {
  MATERIAL: {
    id: 1,
    code: '00',
    name: 'itemType.material',
  },
  PRODUCT: {
    id: 2,
    code: '01',
    name: 'itemType.product',
  },
  SEMI: {
    id: 2,
    code: '02',
    name: 'itemType.semi',
  },
}

export const DEFAULT_ITEM_TYPES = {
  code: ['00', '04', '05', '06'],
}

export const ITEM_TYPES_TO_INT = {
  code: ['04', '06', '01', '02'],
}

export const DEFAULT_UNITS = [
  {
    id: 1,
    name: 'cm',
  },
  {
    id: 2,
    name: 'dm',
  },
  {
    id: 3,
    name: 'm',
  },
]

export const DEFAULT_UNITS_MAP = {
  1: 'cm',
  2: 'dm',
  3: 'm',
}

export const WEIGHT_UNITS = [
  {
    id: 1,
    name: 'g',
  },
  {
    id: 2,
    name: 'kg',
  },
  {
    id: 3,
    name: 'tấn',
  },
]

export const WEIGHT_UNITS_MAP = {
  1: 'g',
  2: 'kg',
  3: 'tấn',
}
export const ITEM_TYPE_PRODUCT = 2
export const SALE_ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SALE_ORDER_STATUS_MAP = {
  [SALE_ORDER_STATUS.PENDING]: 'orderStatus.pending',
  [SALE_ORDER_STATUS.CONFIRMED]: 'orderStatus.confirmed',
}

export const SALE_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'orderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'orderStatus.confirmed',
    color: 'confirmed',
  },
]

export const PURCHASED_ORDER_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  IN_PROGRESS: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
}

export const PURCHASED_ORDER_STATUS_MAP = {
  [PURCHASED_ORDER_STATUS.PENDING]: 'purchasedOrderStatus.pending',
  [PURCHASED_ORDER_STATUS.CONFIRMED]: 'purchasedOrderStatus.confirmed',
  [PURCHASED_ORDER_STATUS.IN_PROGRESS]: 'purchasedOrderStatus.inProgress',
  [PURCHASED_ORDER_STATUS.APPROVED]: 'purchasedOrderStatus.approved',
  [PURCHASED_ORDER_STATUS.COMPLETED]: 'purchasedOrderStatus.completed',
  [PURCHASED_ORDER_STATUS.REJECTED]: 'purchasedOrderStatus.rejected',
}

export const PURCHASED_ORDER_STATUS_OPTIONS = [
  {
    id: 0,
    text: 'purchasedOrderStatus.pending',
    color: 'pending',
  },
  {
    id: 1,
    text: 'purchasedOrderStatus.confirmed',
    color: 'confirmed',
  },
  {
    id: 2,
    text: 'purchasedOrderStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'purchasedOrderStatus.approved',
    color: 'approved',
  },
  {
    id: 4,
    text: 'purchasedOrderStatus.completed',
    color: 'completed',
  },
  {
    id: 5,
    text: 'purchasedOrderStatus.rejected',
    color: 'rejected',
  },
]
export const TYPE_ITEM_EXPORT = {
  ITEM_GROUP: 1,
  ITEM_TYPE: 2,
  ITEM_UNIT: 3,
}
export const TYPE_SALE_EXPORT = {
  CUSTOMER: 1,
  SALE_ORDER: 2,
}

export const ERROR_TYPE_PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
}

export const ERROR_TYPE_PRIORITY_MAP = {
  [ERROR_TYPE_PRIORITY.LOW]: 'errorType.low',
  [ERROR_TYPE_PRIORITY.MEDIUM]: 'errorType.medium',
  [ERROR_TYPE_PRIORITY.HIGH]: 'errorType.high',
}

export const ERROR_TYPE_PRIORITY_OPTION = [
  {
    id: 0,
    text: 'errorType.low',
    color: 'confirmed',
  },
  {
    id: 1,
    text: 'errorType.medium',
    color: 'inProgress',
  },
  {
    id: 2,
    text: 'errorType.high',
    color: 'rejected',
  },
]

export const OBLIGATORY_ENUM = {
  NO: 0,
  YES: 1,
}

export const MAINTENANCE_PERIOD_UNIT = {
  DAY: 0,
  MONTH: 1,
  YEAR: 2,
}

export const REPORT_TYPE = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  QUARTER: 3,
  YEAR: 4,
}

export const OPERATION_VALUE_TIME_OPTIONS = [
  {
    id: REPORT_TYPE.DAY,
    text: 'general:days',
  },
  {
    id: REPORT_TYPE.MONTH,
    text: 'general:months',
  },
  {
    id: REPORT_TYPE.QUARTER,
    text: 'general:quarters',
  },
]

export const OPERATION_VALUE_MONTH_OPTION = [
  {
    id: 0,
    text: 'general:month.jan',
  },
  {
    id: 1,
    text: 'general:month.feb',
  },
  {
    id: 2,
    text: 'general:month.mar',
  },
  {
    id: 3,
    text: 'general:month.apr',
  },
  {
    id: 4,
    text: 'general:month.may',
  },
  {
    id: 5,
    text: 'general:month.jun',
  },
  {
    id: 6,
    text: 'general:month.jul',
  },
  {
    id: 7,
    text: 'general:month.aug',
  },
  {
    id: 8,
    text: 'general:month.sep',
  },
  {
    id: 9,
    text: 'general:month.oct',
  },
  {
    id: 10,
    text: 'general:month.nov',
  },
  {
    id: 11,
    text: 'general:month.dec',
  },
]

export const OPERATION_VALUE_QUARTER_OPTIONS = [
  {
    id: 1,
    text: 'general:quarter.one',
  },
  {
    id: 2,
    text: 'general:quarter.two',
  },
  {
    id: 3,
    text: 'general:quarter.three',
  },
  {
    id: 4,
    text: 'general:quarter.four',
  },
]

export const MAINTENANCE_PERIOD_UNIT_OPTIONS = [
  {
    id: MAINTENANCE_PERIOD_UNIT.DAY,
    text: 'general:days',
  },
  {
    id: MAINTENANCE_PERIOD_UNIT.MONTH,
    text: 'general:months',
  },
  {
    id: MAINTENANCE_PERIOD_UNIT.YEAR,
    text: 'general:years',
  },
]

export const MAINTENANCE_PERIOD_UNIT_MAP = {
  [MAINTENANCE_PERIOD_UNIT.DAY]: 'general:days',
  [MAINTENANCE_PERIOD_UNIT.MONTH]: 'general:months',
  [MAINTENANCE_PERIOD_UNIT.YEAR]: 'general:years',
}

export const MAINTENANCE_JOB_TYPE = {
  CHECK: 0,
  MAINTENANCE: 1,
}

export const MAINTENANCE_JOB_TYPE_OPTIONS = [
  {
    id: MAINTENANCE_JOB_TYPE.CHECK,
    text: 'common.check',
  },
  {
    id: MAINTENANCE_JOB_TYPE.MAINTENANCE,
    text: 'common.maintenance',
  },
]

export const MAINTENANCE_JOB_TYPE_MAP = {
  [MAINTENANCE_JOB_TYPE.CHECK]: 'common.check',
  [MAINTENANCE_JOB_TYPE.MAINTENANCE]: 'common.maintenance',
}

export const IMPORT_TYPE = {
  DEVICE_GROUP: 0,
  CHECKLIST_TEMPLATE: 1,
  INSTALLATION_TEMPLATE: 2,
  ATTRIBUTE_TYPE: 3,
  MAINTENANCE_ATTRIBUTE: 4,
  SUPPLY_GROUP: 5,
  SUPPLY: 6,
  DEVICE: 7,
  UNIT: 8,
  MAINTENANCE_TEAM: 11,
  DEVICE_REQUEST: 12,
  AREA: 13,
  ERROR_TYPE: 14,
  VENDOR: 15,
  DEVICE_TYPE: 16,
  DEVICE_ASSIGNMENT: 17,
  ARTICLE_DEVICE_GROUP: 18,
  MAINTENANCE_TEMPLATE: 19,
  ACCREDITATION_TEMPLATE: 20,
  JOB: 21,
  WAREHOUSE: 22,
  INVENTORY_DEVICE_GROUP: 23,
  INVENTORY_SUPPLY: 24,
  DEVICE_INVENTORY: 25,
  DEVICE_NAME: 26,
}
