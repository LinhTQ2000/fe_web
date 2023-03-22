import { useCallback, useMemo } from 'react'

import { isEqual, isNull } from 'lodash'
import { useHistory, useLocation } from 'react-router-dom'

import qs from '~/utils/qs'

import { ROWS_PER_PAGE_OPTIONS } from '../constants'

export const useQueryState = (initialQuery = {}, { prefix = '' } = {}) => {
  const history = useHistory()
  const { pathname, search } = useLocation()

  const pf = typeof prefix === 'string' ? prefix.trim() : ''
  const $page = `${pf}page`
  const $pageSize = `${pf}pageSize`
  const $sort = `${pf}sort`
  const $filters = `${pf}filters`
  const $quickFilters = `${pf}quickFilters`
  const $keyword = `${pf}keyword`

  const isJsonString = (str) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  const jsonParse = (str, fallbackOutput) => {
    if (isJsonString(str)) return JSON.parse(str)
    return fallbackOutput
  }

  const query = useMemo(() => {
    const locationQuery = qs.parse(search)
    return {
      page: locationQuery[$page] || 1,
      pageSize: ROWS_PER_PAGE_OPTIONS.includes(locationQuery[$pageSize])
        ? locationQuery[$pageSize]
        : ROWS_PER_PAGE_OPTIONS[1],
      sort: jsonParse(locationQuery[$sort], null) || null,
      filters: jsonParse(locationQuery[$filters], {}) || {},
      quickFilters: jsonParse(locationQuery[$quickFilters], {}) || {},
      keyword: locationQuery[$keyword]?.toString() || '',
    }
  }, [search, prefix])

  const updateUrl = useCallback(
    (obj = {}) => {
      const convertedObj = { ...obj }
      const keys = [$sort, $filters, $quickFilters]

      keys.forEach((key) => {
        if (isNull(obj[key]) || isEqual(obj[key], {})) {
          convertedObj[key] = null
        } else if (convertedObj[key] !== undefined) {
          convertedObj[key] = JSON.stringify(obj[key])
        }
      })

      const newSearch = qs.add(search, convertedObj, {
        skipNull: true,
        skipEmptyString: true,
      })
      history.push(`${pathname}?${newSearch}`)
    },
    [pathname, search, prefix],
  )
  const setPage = useCallback(
    (payload) => updateUrl({ [$page]: payload }),
    [updateUrl, prefix],
  )
  const setPageSize = useCallback(
    (payload) => updateUrl({ [$pageSize]: payload, [$page]: 1 }),
    [updateUrl, prefix],
  )
  const setSort = useCallback(
    (payload) => updateUrl({ [$sort]: payload, [$page]: 1 }),
    [updateUrl, prefix],
  )
  const setFilters = useCallback(
    (payload) => updateUrl({ [$filters]: payload, [$page]: 1 }),
    [updateUrl, prefix],
  )
  const setQuickFilters = useCallback(
    (payload) => updateUrl({ [$quickFilters]: payload, [$page]: 1 }),
    [updateUrl, prefix],
  )
  const setKeyword = useCallback(
    (payload) => updateUrl({ [$keyword]: payload, [$page]: 1 }),
    [updateUrl, prefix],
  )

  const withSearch = useCallback(
    (path = '', { omitPrefixKeys = false } = {}) => {
      let newSearch = search

      if (omitPrefixKeys) {
        newSearch = qs.omit(search, [
          $page,
          $pageSize,
          $sort,
          $filters,
          $quickFilters,
          $keyword,
        ])
      }

      return `${path}${newSearch}`
    },
    [search, prefix],
  )

  return {
    ...initialQuery,
    ...query,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
    setQuickFilters,
    withSearch,
  }
}
