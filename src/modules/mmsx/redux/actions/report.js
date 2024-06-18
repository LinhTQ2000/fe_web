export const MMSX_REPORT_MAINTENANCE_PLAN_START =
  'MMSX_REPORT_MAINTENANCE_PLAN_START'
export const MMSX_REPORT_MAINTENANCE_PLAN_SUCCESS =
  'MMSX_REPORT_MAINTENANCE_PLAN_SUCCESS'
export const MMSX_REPORT_MAINTENANCE_PLAN_FAIL =
  'MMSX_REPORT_MAINTENANCE_PLAN_FAIL'

export const MMSX_REPORT_DEVICE_MAINTENANCE_START =
  'MMSX_REPORT_DEVICE_MAINTENANCE_START'
export const MMSX_REPORT_DEVICE_MAINTENANCE_SUCCESS =
  'MMSX_REPORT_DEVICE_MAINTENANCE_SUCCESS'
export const MMSX_REPORT_DEVICE_MAINTENANCE_FAIL =
  'MMSX_REPORT_DEVICE_MAINTENANCE_FAIL'

export const MMSX_REPORT_DEVICE_SYNTHESIS_START =
  'MMSX_REPORT_DEVICE_SYNTHESIS_START'
export const MMSX_REPORT_DEVICE_SYNTHESIS_SUCCESS =
  'MMSX_REPORT_DEVICE_SYNTHESIS_SUCCESS'
export const MMSX_REPORT_DEVICE_SYNTHESIS_FAIL =
  'MMSX_REPORT_DEVICE_SYNTHESIS_FAIL'

export const MMSX_TRANSFER_TICKET_REPORT_START =
  'MMSX_TRANSFER_TICKET_REPORT_START'
export const MMSX_TRANSFER_TICKET_REPORT_SUCCESS =
  'MMSX_TRANSFER_TICKET_REPORT_SUCCESS'
export const MMSX_TRANSFER_TICKET_REPORT_FAIL =
  'MMSX_TRANSFER_TICKET_REPORT_FAIL'

export const MMSX_TRANSFER_TICKET_REPORT_DETAIL_START =
  'MMSX_TRANSFER_TICKET_REPORT_DETAIL_START'
export const MMSX_TRANSFER_TICKET_REPORT_DETAIL_SUCCESS =
  'MMSX_TRANSFER_TICKET_REPORT_DETAIL_SUCCESS'
export const MMSX_TRANSFER_TICKET_REPORT_DETAIL_FAIL =
  'MMSX_TRANSFER_TICKET_REPORT_DETAIL_FAIL'

export const MMSX_INVESTMENT_DEVICE_REPORT_START =
  'MMSX_INVESTMENT_DEVICE_REPORT_START'
export const MMSX_INVESTMENT_DEVICE_REPORT_SUCCESS =
  'MMSX_INVESTMENT_DEVICE_REPORT_SUCCESS'
export const MMSX_INVESTMENT_DEVICE_REPORT_FAIL =
  'MMSX_INVESTMENT_DEVICE_REPORT_FAIL'

export function reportMaintenancePlan(payload, onSuccess, onError) {
  return {
    type: MMSX_REPORT_MAINTENANCE_PLAN_START,
    payload,
    onSuccess,
    onError,
  }
}

export function reportMaintenancePlanSuccess(payload) {
  return {
    type: MMSX_REPORT_MAINTENANCE_PLAN_SUCCESS,
    payload,
  }
}

export function reportMaintenancePlanFail() {
  return {
    type: MMSX_REPORT_MAINTENANCE_PLAN_FAIL,
  }
}

export function reportDeviceMaintenance(payload, onSuccess, onError) {
  return {
    type: MMSX_REPORT_DEVICE_MAINTENANCE_START,
    payload,
    onSuccess,
    onError,
  }
}

export function reportDeviceMaintenanceSuccess(payload) {
  return {
    type: MMSX_REPORT_DEVICE_MAINTENANCE_SUCCESS,
    payload,
  }
}

export function reportDeviceMaintenanceFail() {
  return {
    type: MMSX_REPORT_DEVICE_MAINTENANCE_FAIL,
  }
}

export function reportDeviceSynthesis(payload, onSuccess, onError) {
  return {
    type: MMSX_REPORT_DEVICE_SYNTHESIS_START,
    payload,
    onSuccess,
    onError,
  }
}

export function reportDeviceSynthesisSuccess(payload) {
  return {
    type: MMSX_REPORT_DEVICE_SYNTHESIS_SUCCESS,
    payload,
  }
}

export function reportDeviceSynthesisFail() {
  return {
    type: MMSX_REPORT_DEVICE_SYNTHESIS_FAIL,
  }
}

export function reportTransferTicket(payload, onSuccess, onError) {
  return {
    type: MMSX_TRANSFER_TICKET_REPORT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function reportTransferTicketSuccess(payload) {
  return {
    type: MMSX_TRANSFER_TICKET_REPORT_SUCCESS,
    payload,
  }
}

export function reportTransferTicketFail() {
  return {
    type: MMSX_TRANSFER_TICKET_REPORT_FAIL,
  }
}

export function reportTransferTicketDetail(payload, onSuccess, onError) {
  return {
    type: MMSX_TRANSFER_TICKET_REPORT_DETAIL_START,
    payload,
    onSuccess,
    onError,
  }
}

export function reportTransferTicketDetailSuccess(payload) {
  return {
    type: MMSX_TRANSFER_TICKET_REPORT_DETAIL_SUCCESS,
    payload,
  }
}

export function reportTransferTicketDetailFail() {
  return {
    type: MMSX_TRANSFER_TICKET_REPORT_DETAIL_FAIL,
  }
}

export function investmentDeviceReport(payload, onSuccess, onError) {
  return {
    type: MMSX_INVESTMENT_DEVICE_REPORT_START,
    payload,
    onSuccess,
    onError,
  }
}

export function investmentDeviceReportSuccess(payload) {
  return {
    type: MMSX_INVESTMENT_DEVICE_REPORT_SUCCESS,
    payload,
  }
}

export function investmentDeviceReportFail() {
  return {
    type: MMSX_INVESTMENT_DEVICE_REPORT_FAIL,
  }
}

export default {
  reportMaintenancePlan,
  reportMaintenancePlanSuccess,
  reportMaintenancePlanFail,
  reportDeviceMaintenance,
  reportDeviceMaintenanceSuccess,
  reportDeviceMaintenanceFail,
  reportDeviceSynthesis,
  reportDeviceSynthesisSuccess,
  reportDeviceSynthesisFail,
  reportTransferTicket,
  reportTransferTicketSuccess,
  reportTransferTicketFail,
  reportTransferTicketDetail,
  reportTransferTicketDetailSuccess,
  reportTransferTicketDetailFail,
  investmentDeviceReport,
  investmentDeviceReportSuccess,
  investmentDeviceReportFail,
}
