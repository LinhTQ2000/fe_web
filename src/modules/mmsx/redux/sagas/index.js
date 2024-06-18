import { all } from 'redux-saga/effects'

import watchActiveAccreditationTemplate from './accreditation-template/active'
import watchCreateAccreditationTemplate from './accreditation-template/create'
import watchGetAccreditationTemplateDetails from './accreditation-template/get-detail'
import watchInActiveAccreditationTemplate from './accreditation-template/in-active'
import watchSearchAccreditationTemplate from './accreditation-template/search'
import watchUpdateAccreditationTemplate from './accreditation-template/update'
import watchActiveArea from './area/active'
import watchCreateArea from './area/create'
import watchGetAreaDetails from './area/get-detail'
import watchInActiveArea from './area/in-active'
import watchSearchArea from './area/search'
import watchUpdateArea from './area/update'
import watchActiveArticleDevice from './article-device/active'
import watchCreateArticleDevice from './article-device/create'
import watchGetArticleDeviceDetails from './article-device/get-detail'
import watchInActiveArticleDevice from './article-device/in-active'
import watchSearchArticleDevice from './article-device/search'
import watchUpdateArticleDevice from './article-device/update'
import watchActiveAttributeType from './attribute-type/active'
import watchCreateAttributeType from './attribute-type/create-attribute-type'
import watchDeleteAttributeType from './attribute-type/delete-attribute-type'
import watchGetAttributeTypeDetail from './attribute-type/get-attribute-type-detail'
import watchInActiveAttributeType from './attribute-type/in-active'
import watchGetAttributeTypeList from './attribute-type/search-attribute-type-list'
import watchUpdateAttributeType from './attribute-type/update-attribute-type'
import watchValidateAttributeTypeCode from './attribute-type/validate-attribute-type'
import watchGetMaintenanceAttribute from './common/get-all-attribute-maintain'
import watchGetAllDevice from './common/get-all-device'
import watchGetAllSuppliesConfirm from './common/get-all-supplies-confirm'
import watchGetAllUser from './common/get-all-user'
import watchGetAllWorkCenter from './common/get-all-work-center'
import watchGetListMaintenanceTeam from './common/get-maintencance-list'
import watchGetMo from './common/get-mo-list'
import watchGetMoWorkCenter from './common/get-mo-work-center'
import watchGetResponsibleSubject from './common/get-responsible-subject'
import watchGetUsingDeviceAssign from './common/get-using-devide-assign'
import watchConfirmContingencyPlan from './contingency-plan/confirm-contingency-plan'
import watchCreateContingencyPlan from './contingency-plan/create-contingency-plan'
import watchDeleteContingencyPlan from './contingency-plan/delete-contingency-plan'
import watchGetContingencyPlanDetail from './contingency-plan/detail-contingency-plan'
import watchGetContingencyPlanList from './contingency-plan/get-contingency-plan-list'
import watchRejectContingencyPlan from './contingency-plan/reject-contingency-plan'
import watchUpdateContingencyPlan from './contingency-plan/update-contingency-plan'
import watchConfirmPlan from './create-plan-list/confirm'
import watchCreatePlan from './create-plan-list/create-plan'
import watchDeleteJobDraft from './create-plan-list/delete-job-draft'
import watchDeletePlan from './create-plan-list/delete-plan'
import watchDoGetPlanGanttChartData from './create-plan-list/gantt-chart'
import watchGetCreatePlanList from './create-plan-list/get-list'
import watchGetJobDraftList from './create-plan-list/get-list-type-job'
import watchGetPlanDetail from './create-plan-list/plans-detail'
import watchRejectPlan from './create-plan-list/reject'
import watchUpdateMakePlan from './create-plan-list/update'
import watchGetSummary from './dashboard'
import watchCreateDefect from './defect-list/create-defect'
import watchDeleteDefect from './defect-list/delete-defect'
import watchGetDefect from './defect-list/get-defect'
import watchSearchDefectList from './defect-list/search-defect-list'
import watchUpdateDefect from './defect-list/update-defect'
import watchConfirmDevice from './define-device/confirm-device-by-id'
import watchCreateDevice from './define-device/create-device'
import watchDeleteDevice from './define-device/delete-device-by-id'
import watchGetDeviceDetailById from './define-device/get-detail-by-id'
import watchGetDeviceFrequentError from './define-device/get-frequent-error'
import watchGetDeviceMaintenanceInfo from './define-device/get-maintenance-info'
import watchSearchDevice from './define-device/search-device-list'
import watchUpdateDevice from './define-device/update-device-by-id'
import watchActiveTemplateInstall from './define-installation-template/active'
import watchCreateTemplateInstall from './define-installation-template/create'
import watchGetTemplateInstall from './define-installation-template/get-detail'
import watchSearchTemplateInstall from './define-installation-template/get-list'
import watchInActiveTemplateInstall from './define-installation-template/in-active'
import watchUpdateTemplateInstall from './define-installation-template/update'
import watchCreateUnit from './define-unit/create-unit'
import watchDeleteUnit from './define-unit/delete-unit'
import watchGetUnitDetail from './define-unit/get-unit-detail'
import watchGetUnitList from './define-unit/search-unit-list'
import watchUpdateUnit from './define-unit/update-unit'
import watchActiveVendor from './define-vendor/active'
import watchCreateVendor from './define-vendor/create-vendor'
import watchDeleteVendor from './define-vendor/delete-vendor'
import watchGetVendorDetails from './define-vendor/get-vendor-details'
import watchImportVendor from './define-vendor/import-vendor'
import watchInActiveVendor from './define-vendor/in-active'
import watchSearchVendors from './define-vendor/search-vendors'
import watchUpdateVendor from './define-vendor/updata-vendor'
import watchConfirmDeviceAssign from './device-assign/confirm-assign'
import watchCreateDeviceAssign from './device-assign/create-assign'
import watchDeleteDeviceAssign from './device-assign/delete-assign'
import watchDetailDeviceAssign from './device-assign/detail-assign'
import watchGetDeviceRequest from './device-assign/get-device-request'
import watchGetLogTimeByMo from './device-assign/get-log-time'
import watchMaintainInfoDeviceAssign from './device-assign/get-maintain-info'
import watchMaintainRequestDeviceAssign from './device-assign/get-maintain-request'
import watchRejectDeviceAssign from './device-assign/reject-assign'
import watchSearchDeviceAssign from './device-assign/search-assign'
import watchUpdateDeviceAssign from './device-assign/update-assign'
import watchActiveDeviceGroup from './device-group/active'
import watchCreateDeviceGroup from './device-group/create'
import watchGetDeviceGroupDetails from './device-group/get-detail'
import watchInActiveDeviceGroup from './device-group/in-active'
import watchSearchDeviceGroup from './device-group/search'
import watchUpdateDeviceGroup from './device-group/update'
import watchConfirmDeviceInventory from './device-inventory/confirm-device-inventory'
import watchCreateDeviceInventory from './device-inventory/create-device-inventory'
import watchDeleteDeviceInventory from './device-inventory/delete-device-inventory'
import watchGetDeviceInventoryDetail from './device-inventory/get-device-inventory-detail'
import watchGetDeviceInventoryList from './device-inventory/get-device-inventory-list'
import watchRejectDeviceInventory from './device-inventory/reject-device-inventory'
import watchUpdateDeviceInventory from './device-inventory/update-device-inventory'
import watchActiveDeviceName from './device-name/active'
import watchCreateDeviceName from './device-name/create'
import watchGetdeviceNameDetail from './device-name/get-detail'
import watchInActiveDeviceName from './device-name/in-active'
import watchSearchDeviceName from './device-name/search'
import watchUpdateDeviceName from './device-name/update'
import watchGetDeviceStatistic from './device-status-report/get-device-statistic'
import watchGetDeviceStatus from './device-status-report/get-device-status'
import watchGetDeviceStatusDetail from './device-status-report/get-device-status-detail'
import watchCreateInfoData from './device-status/create-info-device-status'
import watchGetInfoData from './device-status/get-create-infor-form-data'
import watchGetDetailDeviceStatus from './device-status/get-detail-device-status'
import watchGetDetailOfDeviceStatus from './device-status/get-detail-of-status'
import watchGetListDeviceStatus from './device-status/get-list-device-status'
import watchUpdateInfoData from './device-status/update-info-device-status'
import watchActiveDeviceType from './device-type/active'
import watchCreateDeviceType from './device-type/create'
import watchGetDeviceTypeDetails from './device-type/get-detail'
import watchInActiveDeviceType from './device-type/in-active'
import watchSearchDeviceType from './device-type/search'
import watchUpdateDeviceType from './device-type/update'
import watchActiveErrorType from './error-type/active'
import watchCreateErrorType from './error-type/create'
import watchDeleteErrorType from './error-type/delete'
import watchGetErrorTypeDetails from './error-type/get-details'
import watchInActiveErrorType from './error-type/in-active'
import watchSearchErrorType from './error-type/search'
import watchUpdateErrorType from './error-type/update'
import watchCreateItemGroup from './item-group-setting/create-item-group'
import watchDeleteItemGroup from './item-group-setting/delete-item-group'
import watchGetItemGroupDetails from './item-group-setting/get-item-group-details'
import watchSearchItemGroups from './item-group-setting/search-item-groups'
import watchUpdateItemGroup from './item-group-setting/update-item-group'
import watchGenerateJobForPlan from './job-draft/job-draft-list'
import watchApprovedJob from './job/approved-job'
import watchAssignJob from './job/assign-job'
import watchDeleteJob from './job/delete-job'
import watchGetJobSupplies from './job/get-job-supplies'
import watchGetJobDetail from './job/job-detail'
import watchGetJobList from './job/job-list'
import watchNoteJobDetail from './job/note-job-detail'
import watchQuickAssignJob from './job/quick-assign-job'
import watchReworkJob from './job/rework'
import watchSearchJobList from './job/search-job'
import watchSearchJobHistoryDeviceList from './job/search-job-history-device'
import watchUpdateJobStatus from './job/update-job-status'
import watchUpdateTimeJob from './job/update-time'
import watchConfirmMaintainRequest from './maintain-request/confirm-maintain-request'
import watchGetMaintainRequestDetail from './maintain-request/get-maintain-request-detail'
import watchGetMaintainRequest from './maintain-request/get-maintain-request-list'
import watchRejectMaintainRequest from './maintain-request/reject-maintain-request'
import watchGetReportProgress from './maintainance-progress/get-maintainance-progress-list'
import watchGetDetailMaintainanceProgress from './maintainance-progress/get-maintenance-progress-detail'
import watchActiveMaintenanceAttribute from './maintenance-attribute/active'
import watchCreateMaintenanceAttribute from './maintenance-attribute/create'
import watchGetMaintenanceAttributeDetails from './maintenance-attribute/get-detail'
import watchInActiveMaintenanceAttribute from './maintenance-attribute/in-active'
import watchSearchMaintenanceAttribute from './maintenance-attribute/search'
import watchUpdateMaintenanceAttribute from './maintenance-attribute/update'
import watchChangeStatusMaintenancePlan from './maintenance-plan/change-status'
import watchCreateMaintenancePlan from './maintenance-plan/create'
import watchDeleteMaintenancePlan from './maintenance-plan/delete'
import watchGetDetailMaintenancePlan from './maintenance-plan/get-detail'
import watchSearchMaintenancePlan from './maintenance-plan/search'
import watchUpdateMaintenancePlan from './maintenance-plan/update'
import watchActiveMaintenanceTeam from './maintenance-team/active-maintenance-team'
import watchCreateMaintenanceTeam from './maintenance-team/create-maintenance-team'
import watchDeleteMaintenanceTeam from './maintenance-team/delete-maintenance-team'
import watchGetAllUserItDepartment from './maintenance-team/get-all-user-it-department'
import watchGetDetailMaintenanceTeam from './maintenance-team/get-maintenance-team-detail'
import watchGetMaintenanceTeams from './maintenance-team/get-maintenance-teams'
import watchGetMemberMaintenanceTeams from './maintenance-team/get-member'
import watchInActiveMaintenanceTeam from './maintenance-team/in-active-maintenance-team'
import watchUpdateMaintenanceTeam from './maintenance-team/update-maintenance-team'
import watchActiveMaintenanceTemplate from './maintenance-template/active'
import watchCreateMaintenanceTemplate from './maintenance-template/create'
import watchGetMaintenanceTemplateDetails from './maintenance-template/get-detail'
import watchInActiveMaintenanceTemplate from './maintenance-template/in-active'
import watchSearchMaintenanceTemplate from './maintenance-template/search'
import watchUpdateMaintenanceTemplate from './maintenance-template/update'
import watchActiveOperationIndex from './operation-index/active'
import watchCreateOperationIndex from './operation-index/create'
import watchGetOperationIndexDetails from './operation-index/get-detail'
import watchInActiveOperationIndex from './operation-index/in-active'
import watchSearchOperationIndex from './operation-index/search'
import watchUpdateOperationIndex from './operation-index/update'
import watchCreateOperationValue from './operation-value/create'
import watchgetOperationValueDetail from './operation-value/detail'
import watchUpdateOperationValue from './operation-value/edit'
import watchgetListOperationValue from './operation-value/get-list'
import watchGetPlanList from './plan-list/get-plan-list'
import watchChangeStatusRepairRequest from './repair-request/change-status-repair-request'
import watchCreateRepairRequest from './repair-request/create-repair-request'
import watchGetRepairRequestDetail from './repair-request/get-repair-request-detail'
import watchSearchRepairRequest from './repair-request/search-repair-request'
import watchUpdateRepairRequestDetail from './repair-request/update-repair-request-detail'
import watchGetDeviceMaintenance from './report/device-maintenance'
import watchGetDeviceSynthesis from './report/device-synthesis'
import watchGetInvestmentDeviceReport from './report/investment-device'
import watchReportMaintenancePlan from './report/report-maintenance-plan'
import watchReportTransferTicket from './report/report-transfer-ticket'
import watchReportTransferTicketDetail from './report/report-transfer-ticket-detail'
import watchChangeStatusRequestDevice from './request-device/change-status-request-device'
import watchCreateRequestDevice from './request-device/create-request-device'
import watchCreateRequestDeviceReturn from './request-device/create-request-device-return'
import watchDeleteRequestDevice from './request-device/delete-request-device'
import watchGetRequestDeviceDetail from './request-device/get-request-device-detail'
import watchSearchRequestDevice from './request-device/search-request-device'
import watchUpdateRequestDeviceDetail from './request-device/update-request-device-detail'
import watchCreateSettingNotiJob from './setting/create-job-noti'
import watchGetSignatureConfigurationDetails from './signature-configuration/get-signature-configuration-details'
import watchUpdateSignatureConfiguration from './signature-configuration/update-signature-configuration'
import watchActiveSupplyCategory from './supplies-category/active-supplies-category'
import watchConfirmSuppliesCategory from './supplies-category/confirm-supplies-category'
import watchCreateSuppliesCategory from './supplies-category/create-supplies-category'
import watchDeleteSuppliesCategory from './supplies-category/delete-supplies-category'
import watchGetAllConfirmSuppliesCategory from './supplies-category/get-all-confirm-supplies-category'
import watchGetSuppliesCategoryDetail from './supplies-category/get-supplies-category-detail'
import watchInActiveSupplyCategory from './supplies-category/in-active-supplies-category'
import watchSearchSuppliesCategory from './supplies-category/search-supplies-category'
import watchUpdateSuppliesCategory from './supplies-category/update-supplies-category'
import watchConfirmSuppliesInventory from './supplies-inventory/confirm-supplies-inventory'
import watchCreateSuppliesInventory from './supplies-inventory/create-supplies-inventory'
import watchDeleteSuppliesInventory from './supplies-inventory/delete-supplies-inventory'
import watchGetSuppliesInventoryDetail from './supplies-inventory/get-supplies-inventory-detail'
import watchGetSuppliesInventoryList from './supplies-inventory/get-supplies-inventory-list'
import watchRejectSuppliesInventory from './supplies-inventory/reject-supplies-inventory'
import watchUpdateSuppliesInventory from './supplies-inventory/update-supplies-inventory'
import watchConfirmSuppliesRequest from './supplies-request/confirm-supplies-request'
import watchCreateRequest from './supplies-request/create-request'
import watchDeleteSuppliesRequest from './supplies-request/delete-supplies-request'
import watchGetSuppliesRequestDetail from './supplies-request/get-supplies-request-detail'
import watchGetJobListSupplies from './supplies-request/get-supplies-request-job-list'
import watchGetSuppliesRequestList from './supplies-request/get-supplies-request-list'
import watchRejectSuppliesRequest from './supplies-request/reject-supplies-request'
import watchActiveSupply from './supplies/active'
import watchConfirmSupplies from './supplies/confirm-supplies'
import watchCreateSupplies from './supplies/create-supplies'
import watchDeleteSupplies from './supplies/delete-supplies'
import watchGetDetailSupplies from './supplies/get-supplies'
import watchInActiveSupply from './supplies/in-active'
import watchSearchSuppliesList from './supplies/search-supplies'
import watchUpdateSupplies from './supplies/update-supplies'
import watchSearchSupplyType from './supply-type/search-supply-type'
import watchActiveTemplateChecklist from './template-checklist/active'
import watchCreateTemplateChecklist from './template-checklist/create-template-checklist'
import watchGetTemplateChecklist from './template-checklist/get-template-checklist'
import watchInActiveTemplateChecklist from './template-checklist/in-active'
import watchSearchTemplateChecklist from './template-checklist/search-template-checklist'
import watchUpdateTemplateChecklist from './template-checklist/update-template-checklist'
import watchConfirmTransferRequest from './transfer-request/confirm-transfer-request'
import watchCreateTransferRequest from './transfer-request/create-transfer-request'
import watchDeleteTransferRequest from './transfer-request/delete-transfer-request'
import watchGetTransferRequestDetail from './transfer-request/get-transfer-request-detail'
import watchGetTransferRequestList from './transfer-request/get-transfer-request-list'
import watchRejectTransferRequest from './transfer-request/reject-transfer-request'
import watchUpdateTransferRequest from './transfer-request/update-transfer-request'
import watchConfirmTransferTicket from './transfer-ticket/confirm-transfer-ticket'
import watchCreateTransferTicket from './transfer-ticket/create-transfer-ticket'
import watchDeleteTransferTicket from './transfer-ticket/delete-transfer-ticket'
import watchGetTransferTicketDetail from './transfer-ticket/get-transfer-ticket-detail'
import watchGetTransferTicketList from './transfer-ticket/get-transfer-ticket-list'
import watchRejectTransferTicket from './transfer-ticket/reject-transfer-ticket'
import watchUpdateTransferTicket from './transfer-ticket/update-transfer-ticket'
import watchCreateWarehouseDefine from './warehouse-define/create'
import watchGetWarehouseDefineDetails from './warehouse-define/get-detail'
import watchSearchWarehouseDefine from './warehouse-define/search'
import watchUpdateWarehouseDefine from './warehouse-define/update'
import watchConfirmWarehouseExportManagement from './warehouse-export-management/confirm-warehouse-export'
import watchCreateWarehouseExportManagementRequest from './warehouse-export-management/create-warehouse-export'
import watchDeleteWarehouseExportManagement from './warehouse-export-management/delete-warehouse-export'
import watchGetWarehouseExportManagementDetail from './warehouse-export-management/get-warehouse-export-detail'
import watchGetWarehouseExportManagementList from './warehouse-export-management/get-warehouse-export-list'
import watchRejectWarehouseExportManagement from './warehouse-export-management/reject-warehouse-export'
import watchUpdateWarehouseExportManagementRequest from './warehouse-export-management/update'
import watchConfirmWarehouseExportTicket from './warehouse-export-ticket/confirm'
import watchCreateWarehouseExportTicket from './warehouse-export-ticket/create'
import watchDeleteWarehouseExportTicket from './warehouse-export-ticket/delete'
import watchGetWarehouseExportTicketDetails from './warehouse-export-ticket/get-detail'
import watchRejectWarehouseExportTicket from './warehouse-export-ticket/reject'
import watchSearchWarehouseExportTicket from './warehouse-export-ticket/search'
import watchUpdateWarehouseExportTicket from './warehouse-export-ticket/update'
import watchConfirmWarehouseImportManagement from './warehouse-import-management/confirm-warehouse-import'
import watchCreateWarehouseImportManagementRequest from './warehouse-import-management/create-warehouse-import'
import watchDeleteWarehouseImportManagement from './warehouse-import-management/delete-warehouse-import'
import watchGetWarehouseImportManagementDetail from './warehouse-import-management/get-warehouse-import-detail'
import watchGetWarehouseImportManagementList from './warehouse-import-management/get-warehouse-import-list'
import watchRejectWarehouseImportManagement from './warehouse-import-management/reject-warehouse-import'
import watchUpdateWarehouseImportManagement from './warehouse-import-management/update-warehouse-import'
import watchConfirmWarehouseImportRequest from './warehouse-import-request/confirm'
import watchCreateWarehouseImportRequest from './warehouse-import-request/create'
import watchDeleteWarehouseImportRequest from './warehouse-import-request/delete'
import watchGetWarehouseImportRequestDetails from './warehouse-import-request/get-detail'
import watchRejectWarehouseImportRequest from './warehouse-import-request/reject'
import watchSearchWarehouseImportRequest from './warehouse-import-request/search'
import watchUpdateWarehouseImportRequest from './warehouse-import-request/update'
import watchGetInventory from './warehouse-inventory/detail'
import watchGetInventoryWarehouseDeviceGroup from './warehouse-inventory/get-by-warehouse-device-group'
import watchSearchWarehouseInventory from './warehouse-inventory/search'
import watchConfirmWarning from './warning-system/confirm'
import watchGetWarningDetail from './warning-system/detail'
import watchGetWarningList from './warning-system/get-warning-list'
import watchRejectWarning from './warning-system/reject'
import watchSearchWarningList from './warning-system/search-warning'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //Common
    watchGetListMaintenanceTeam(),
    watchGetAllSuppliesConfirm(),
    watchGetMaintenanceAttribute(),
    watchGetResponsibleSubject(),
    watchGetMo(),
    watchGetMoWorkCenter(),

    // Dashboard
    watchGetSummary(),

    // management device
    watchCreateDeviceAssign(),
    watchDeleteDeviceAssign(),
    watchRejectDeviceAssign(),
    watchConfirmDeviceAssign(),
    watchDetailDeviceAssign(),
    watchGetDeviceRequest(),
    watchGetLogTimeByMo(),
    watchMaintainInfoDeviceAssign(),
    watchMaintainRequestDeviceAssign(),
    watchSearchDeviceAssign(),
    watchUpdateDeviceAssign(),
    watchGetAllDevice(),
    watchGetAllUser(),
    watchGetAllWorkCenter(),
    watchGetUsingDeviceAssign(),
    watchGetDeviceMaintenanceInfo(),
    watchGetDeviceFrequentError(),

    // Database
    watchConfirmDevice(),
    watchCreateDevice(),
    watchDeleteDevice(),
    watchGetDeviceDetailById(),
    watchSearchDevice(),
    watchUpdateDevice(),
    watchGetAttributeTypeList(),
    watchCreateAttributeType(),
    watchDeleteAttributeType(),
    watchGetAttributeTypeDetail(),
    watchUpdateAttributeType(),
    watchValidateAttributeTypeCode(),
    watchSearchTemplateInstall(),
    watchInActiveAttributeType(),
    watchActiveAttributeType(),

    //warning system
    watchConfirmWarning(),
    watchGetWarningDetail(),
    watchGetWarningList(),
    watchRejectWarning(),
    watchSearchWarningList(),

    //define supplies
    watchConfirmSupplies(),
    watchCreateSupplies(),
    watchDeleteSupplies(),
    watchGetDetailSupplies(),
    watchSearchSuppliesList(),
    watchUpdateSupplies(),
    watchActiveSupply(),
    watchInActiveSupply(),

    //maintenance-team
    watchCreateMaintenanceTeam(),
    watchDeleteMaintenanceTeam(),
    watchGetDetailMaintenanceTeam(),
    watchGetMaintenanceTeams(),
    watchUpdateMaintenanceTeam(),
    watchGetAllUserItDepartment(),
    watchActiveMaintenanceTeam(),
    watchInActiveMaintenanceTeam(),
    watchGetMemberMaintenanceTeams(),

    //supplies-category
    watchCreateSuppliesCategory(),
    watchDeleteSuppliesCategory(),
    watchGetSuppliesCategoryDetail(),
    watchSearchSuppliesCategory(),
    watchUpdateSuppliesCategory(),
    watchConfirmSuppliesCategory(),
    watchGetAllConfirmSuppliesCategory(),
    watchActiveSupplyCategory(),
    watchInActiveSupplyCategory(),

    // request-device
    watchChangeStatusRequestDevice(),
    watchDeleteRequestDevice(),
    watchGetRequestDeviceDetail(),
    watchSearchRequestDevice(),
    watchUpdateRequestDeviceDetail(),
    watchCreateRequestDevice(),
    watchCreateRequestDeviceReturn(),

    //maintain-request
    watchConfirmMaintainRequest(),
    watchGetMaintainRequestDetail(),
    watchGetMaintainRequest(),
    watchRejectMaintainRequest(),

    //job
    watchGetJobDetail(),
    watchGetJobList(),
    watchSearchJobList(),
    watchAssignJob(),
    watchDeleteJob(),
    watchUpdateJobStatus(),
    watchGetJobSupplies(),
    watchSearchJobHistoryDeviceList(),
    watchNoteJobDetail(),
    watchApprovedJob(),
    watchReworkJob(),
    watchQuickAssignJob(),
    watchUpdateTimeJob(),

    //create plan
    watchConfirmPlan(),
    watchCreatePlan(),
    watchDeletePlan(),
    watchDoGetPlanGanttChartData(),
    watchGetCreatePlanList(),
    watchGetPlanDetail(),
    watchRejectPlan(),
    watchUpdateMakePlan(),
    watchGetJobDraftList(),
    watchDeleteJobDraft(),

    //maintainance-progress
    watchGetReportProgress(),
    watchGetDetailMaintainanceProgress(),

    //plan-list
    watchGetPlanList(),
    // defect-list
    watchCreateDefect(),
    watchDeleteDefect(),
    watchGetDefect(),
    watchSearchDefectList(),
    watchUpdateDefect(),
    //supplies-request
    watchConfirmSuppliesRequest(),
    watchCreateRequest(),
    watchGetJobListSupplies(),
    watchDeleteSuppliesRequest(),
    watchGetSuppliesRequestDetail(),
    watchGetSuppliesRequestList(),
    watchRejectSuppliesRequest(),

    //deveice-status-report
    watchGetDeviceStatistic(),
    watchGetDeviceStatus(),
    watchGetDeviceStatusDetail(),

    //device-status
    watchGetListDeviceStatus(),
    watchGetDetailDeviceStatus(),
    watchGetInfoData(),
    watchCreateInfoData(),
    watchUpdateInfoData(),
    watchGetDetailOfDeviceStatus(),
    //job-darft
    watchGenerateJobForPlan(),
    // define unit
    watchCreateUnit(),
    watchDeleteUnit(),
    watchGetUnitDetail(),
    watchGetUnitList(),
    watchUpdateUnit(),

    // warehouse define
    watchCreateWarehouseDefine(),
    watchGetWarehouseDefineDetails(),
    watchSearchWarehouseDefine(),
    watchUpdateWarehouseDefine(),

    // warehouse export ticket
    watchCreateWarehouseExportTicket(),
    watchGetWarehouseExportTicketDetails(),
    watchSearchWarehouseExportTicket(),
    watchUpdateWarehouseExportTicket(),
    watchConfirmWarehouseExportTicket(),
    watchDeleteWarehouseExportTicket(),
    watchRejectWarehouseExportTicket(),

    // warehouse import request
    watchCreateWarehouseImportRequest(),
    watchGetWarehouseImportRequestDetails(),
    watchSearchWarehouseImportRequest(),
    watchUpdateWarehouseImportRequest(),
    watchConfirmWarehouseImportRequest(),
    watchDeleteWarehouseImportRequest(),
    watchRejectWarehouseImportRequest(),

    // transfer request
    watchConfirmTransferRequest(),
    watchCreateTransferRequest(),
    watchDeleteTransferRequest(),
    watchGetTransferRequestDetail(),
    watchGetTransferRequestList(),
    watchRejectTransferRequest(),
    watchUpdateTransferRequest(),
    // transfer ticket
    watchConfirmTransferTicket(),
    watchCreateTransferTicket(),
    watchDeleteTransferTicket(),
    watchGetTransferTicketList(),
    watchGetTransferTicketDetail(),
    watchRejectTransferTicket(),
    watchUpdateTransferTicket(),
    // warehouse import management
    watchConfirmWarehouseImportManagement(),
    watchCreateWarehouseImportManagementRequest(),
    watchDeleteWarehouseImportManagement(),
    watchGetWarehouseImportManagementDetail(),
    watchGetWarehouseImportManagementList(),
    watchRejectWarehouseImportManagement(),
    watchUpdateWarehouseImportManagement(),
    //warehouse export management
    watchConfirmWarehouseExportManagement(),
    watchCreateWarehouseExportManagementRequest(),
    watchDeleteWarehouseExportManagement(),
    watchGetWarehouseExportManagementDetail(),
    watchGetWarehouseExportManagementList(),
    watchRejectWarehouseExportManagement(),
    watchUpdateWarehouseExportManagementRequest(),
    // signature configuration
    watchGetSignatureConfigurationDetails(),
    watchUpdateSignatureConfiguration(),
    //repair request
    watchChangeStatusRepairRequest(),
    watchCreateRepairRequest(),
    watchGetRepairRequestDetail(),
    watchSearchRepairRequest(),
    watchUpdateRepairRequestDetail(),
    // contingency plan
    watchConfirmContingencyPlan(),
    watchCreateContingencyPlan(),
    watchGetContingencyPlanDetail(),
    watchGetContingencyPlanList(),
    watchUpdateContingencyPlan(),
    watchRejectContingencyPlan(),
    watchDeleteContingencyPlan(),

    // warehouse inventory
    watchSearchWarehouseInventory(),
    watchGetInventoryWarehouseDeviceGroup(),
    watchGetInventory(),

    // maintenance plan
    watchCreateMaintenancePlan(),
    watchSearchMaintenancePlan(),
    watchGetDetailMaintenancePlan(),
    watchUpdateMaintenancePlan(),
    watchDeleteMaintenancePlan(),
    watchChangeStatusMaintenancePlan(),

    // report
    watchReportMaintenancePlan(),
    watchGetDeviceMaintenance(),
    watchGetDeviceSynthesis(),
    watchReportTransferTicket(),
    watchReportTransferTicketDetail(),
    watchGetInvestmentDeviceReport(),

    // setting
    watchCreateSettingNotiJob(),

    //device-inventory
    watchGetDeviceInventoryList(),
    watchCreateDeviceInventory(),
    watchUpdateDeviceInventory(),
    watchGetDeviceInventoryDetail(),
    watchConfirmDeviceInventory(),
    watchDeleteDeviceInventory(),
    watchRejectDeviceInventory(),

    //supplies-inventory
    watchGetSuppliesInventoryList(),
    watchCreateSuppliesInventory(),
    watchUpdateSuppliesInventory(),
    watchGetSuppliesInventoryDetail(),
    watchConfirmSuppliesInventory(),
    watchDeleteSuppliesInventory(),
    watchRejectSuppliesInventory(),

    // supply type
    watchSearchSupplyType(),

    // operation value
    watchgetListOperationValue(),
    watchCreateOperationValue(),
    watchgetOperationValueDetail(),
    watchUpdateOperationValue(),

    // item-group-setting
    watchSearchItemGroups(),
    watchCreateItemGroup(),
    watchUpdateItemGroup(),
    watchDeleteItemGroup(),
    watchGetItemGroupDetails(),

    // area
    watchSearchArea(),
    watchGetAreaDetails(),
    watchActiveArea(),
    watchInActiveArea(),
    watchCreateArea(),
    watchUpdateArea(),

    // error type
    watchCreateErrorType(),
    watchDeleteErrorType(),
    watchGetErrorTypeDetails(),
    watchSearchErrorType(),
    watchUpdateErrorType(),
    watchInActiveErrorType(),
    watchActiveErrorType(),

    // device type
    watchSearchDeviceType(),
    watchGetDeviceTypeDetails(),
    watchActiveDeviceType(),
    watchInActiveDeviceType(),
    watchCreateDeviceType(),
    watchUpdateDeviceType(),

    // device name
    watchSearchDeviceName(),
    watchGetdeviceNameDetail(),
    watchActiveDeviceName(),
    watchInActiveDeviceName(),
    watchCreateDeviceName(),
    watchUpdateDeviceName(),

    //template-checklist
    watchCreateTemplateChecklist(),
    watchGetTemplateChecklist(),
    watchSearchTemplateChecklist(),
    watchUpdateTemplateChecklist(),
    watchActiveTemplateChecklist(),
    watchInActiveTemplateChecklist(),
    // device group
    watchSearchDeviceGroup(),
    watchGetDeviceGroupDetails(),
    watchActiveDeviceGroup(),
    watchInActiveDeviceGroup(),
    watchCreateDeviceGroup(),
    watchUpdateDeviceGroup(),

    // article device
    watchSearchArticleDevice(),
    watchGetArticleDeviceDetails(),
    watchActiveArticleDevice(),
    watchInActiveArticleDevice(),
    watchCreateArticleDevice(),
    watchUpdateArticleDevice(),

    // vendor
    watchCreateVendor(),
    watchDeleteVendor(),
    watchGetVendorDetails(),
    watchImportVendor(),
    watchSearchVendors(),
    watchUpdateVendor(),
    watchInActiveVendor(),
    watchActiveVendor(),

    //define-installation-templte
    watchCreateTemplateInstall(),
    watchGetTemplateInstall(),
    watchSearchTemplateInstall(),
    watchUpdateTemplateInstall(),
    watchActiveTemplateInstall(),
    watchInActiveTemplateInstall(),

    // AccreditationTemplate
    watchSearchAccreditationTemplate(),
    watchGetAccreditationTemplateDetails(),
    watchActiveAccreditationTemplate(),
    watchInActiveAccreditationTemplate(),
    watchCreateAccreditationTemplate(),
    watchUpdateAccreditationTemplate(),

    // MaintenanceTemplate
    watchSearchMaintenanceTemplate(),
    watchGetMaintenanceTemplateDetails(),
    watchActiveMaintenanceTemplate(),
    watchInActiveMaintenanceTemplate(),
    watchCreateMaintenanceTemplate(),
    watchUpdateMaintenanceTemplate(),

    // attribute maintenance
    watchSearchMaintenanceAttribute(),
    watchGetMaintenanceAttributeDetails(),
    watchActiveMaintenanceAttribute(),
    watchInActiveMaintenanceAttribute(),
    watchCreateMaintenanceAttribute(),
    watchUpdateMaintenanceAttribute(),

    // operation index
    watchCreateOperationIndex(),
    watchSearchOperationIndex(),
    watchUpdateOperationIndex(),
    watchGetOperationIndexDetails(),
    watchInActiveOperationIndex(),
    watchActiveOperationIndex(),
  ])
}
