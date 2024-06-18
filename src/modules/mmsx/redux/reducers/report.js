import {
  MMSX_INVESTMENT_DEVICE_REPORT_FAIL,
  MMSX_INVESTMENT_DEVICE_REPORT_START,
  MMSX_INVESTMENT_DEVICE_REPORT_SUCCESS,
  MMSX_REPORT_DEVICE_MAINTENANCE_FAIL,
  MMSX_REPORT_DEVICE_MAINTENANCE_START,
  MMSX_REPORT_DEVICE_MAINTENANCE_SUCCESS,
  MMSX_REPORT_DEVICE_SYNTHESIS_FAIL,
  MMSX_REPORT_DEVICE_SYNTHESIS_START,
  MMSX_REPORT_DEVICE_SYNTHESIS_SUCCESS,
  MMSX_REPORT_MAINTENANCE_PLAN_FAIL,
  MMSX_REPORT_MAINTENANCE_PLAN_START,
  MMSX_REPORT_MAINTENANCE_PLAN_SUCCESS,
  MMSX_TRANSFER_TICKET_REPORT_DETAIL_FAIL,
  MMSX_TRANSFER_TICKET_REPORT_DETAIL_START,
  MMSX_TRANSFER_TICKET_REPORT_DETAIL_SUCCESS,
  MMSX_TRANSFER_TICKET_REPORT_FAIL,
  MMSX_TRANSFER_TICKET_REPORT_START,
  MMSX_TRANSFER_TICKET_REPORT_SUCCESS,
} from '../actions/report'

const initState = {
  isLoading: false,
  maintenancePlanList: [],
  deviceMaintenances: [],
  totalDeviceMaintenance: null,
  deviceSynthesis: [],
  totalDevice: null,
  transferTickets: [],
  totalTransferTicket: null,
  transferTicketDetail: [],
  totalTransferTicketDetail: null,
  investmentDevice: [],
  totalInvestment: null,
}

export default function report(state = initState, action) {
  switch (action.type) {
    case MMSX_REPORT_MAINTENANCE_PLAN_START:
    case MMSX_REPORT_DEVICE_MAINTENANCE_START:
    case MMSX_REPORT_DEVICE_SYNTHESIS_START:
    case MMSX_TRANSFER_TICKET_REPORT_START:
    case MMSX_TRANSFER_TICKET_REPORT_DETAIL_START:
    case MMSX_INVESTMENT_DEVICE_REPORT_START:
      return {
        ...state,
        isLoading: true,
      }
    case MMSX_REPORT_MAINTENANCE_PLAN_FAIL:
    case MMSX_REPORT_DEVICE_MAINTENANCE_FAIL:
    case MMSX_REPORT_DEVICE_SYNTHESIS_FAIL:
    case MMSX_TRANSFER_TICKET_REPORT_FAIL:
    case MMSX_TRANSFER_TICKET_REPORT_DETAIL_FAIL:
    case MMSX_INVESTMENT_DEVICE_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case MMSX_REPORT_MAINTENANCE_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        maintenancePlanList: action.payload,
      }
    case MMSX_REPORT_DEVICE_MAINTENANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceMaintenances: action.payload.items,
        totalDeviceMaintenance: action.payload.meta.total,
      }
    case MMSX_REPORT_DEVICE_SYNTHESIS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deviceSynthesis: action.payload.items,
        totalDevice: action.payload.meta.total,
      }
    case MMSX_TRANSFER_TICKET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferTickets: action.payload.items,
        totalTransferTicket: action.payload.meta.total,
      }
    case MMSX_TRANSFER_TICKET_REPORT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transferTicketDetail: action.payload.items,
        totalTransferTicketDetail: action.payload.meta.total,
      }
    case MMSX_INVESTMENT_DEVICE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        investmentDevice: action.payload.items,
        totalInvestment: action.payload.meta.total,
      }
    default:
      return state
  }
}
