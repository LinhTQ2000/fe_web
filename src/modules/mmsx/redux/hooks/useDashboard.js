import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import dashboardActions from '../actions/dashboard'

export const useDashboard = () => {
  const data = useSelector((state) => get(state, 'mmsx.dashboard'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardItemSummary = () => {
  const data = useSelector((state) => get(state, 'mmsx.dashboard.summary'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardJobSummary = () => {
  const data = useSelector((state) => get(state, 'mmsx.dashboard.jobSummary'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardTransferSummary = () => {
  const data = useSelector((state) =>
    get(state, 'mmsx.dashboard.transferSummary'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
export const useDashboardMaintainanceJobStatus = () => {
  const data = useSelector((state) =>
    get(state, 'mmsx.dashboard.maintainanceJobStatus'),
  )

  const isLoading = useSelector((state) =>
    get(state, 'mmsx.dashboard.isLoadingJobStatus'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
    isLoading,
  }
}

export const useDashboardRequestStatus = () => {
  const data = useSelector((state) =>
    get(state, 'mmsx.dashboard.requestStatus'),
  )

  const isLoading = useSelector((state) =>
    get(state, 'mmsx.dashboard.isLoadingRequestStatus'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
    isLoading,
  }
}

export const useDashboardDeviceError = () => {
  const data = useSelector((state) => get(state, 'mmsx.dashboard.deviceError'))
  const isLoading = useSelector((state) =>
    get(state, 'mmsx.dashboard.isLoadingDeviceError'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
    isLoading,
  }
}

export const useDashboardDeviceStatus = () => {
  const data = useSelector((state) => get(state, 'mmsx.dashboard.deviceStatus'))
  const isLoading = useSelector((state) =>
    get(state, 'mmsx.dashboard.isLoadingDeviceStatus'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
    isLoading,
  }
}

export const useDashboardMttStatus = () => {
  const data = useSelector((state) => get(state, 'mmsx.dashboard.mttStatus'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardDeviceUsingStatus = () => {
  const data = useSelector((state) =>
    get(state, 'mmsx.dashboard.deviceUsingStatus'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardDeviceUseByArea = () => {
  const data = useSelector((state) =>
    get(state, 'mmsx.dashboard.deviceUseByArea'),
  )

  const isLoading = useSelector((state) =>
    get(state, 'mmsx.dashboard.isLoadingArea'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
    isLoading,
  }
}
