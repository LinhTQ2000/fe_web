/* eslint-disable no-param-reassign */
import { useRef, useState } from 'react'

import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  // Link as MuiLink,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isEmpty, isNil } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
import { format } from 'react-string-format'
import TruncateMarkup from 'react-truncate-markup'

import {
  FILE_TYPE,
  HTTP_STATUS_CODE,
  IMPORT_EXPORT_DATE_FORMAT,
  IMPORT_EXPORT_MODE,
  IMPORT_EXPORT_MODE_OPTIONS,
  IMPORT_SETTING,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import Dialog from '~/components/Dialog'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import { convertUtcDateTimeToLocalTz } from '~/utils'
import { downloadFile, formatFileSize, isValidFileType } from '~/utils/file'
import addNotification from '~/utils/toast'

import Button from '../Button'

const ImportExport = ({
  name,
  // onDownloadTemplate,
  onImport,
  onExport,
  onRefresh,
  disabled,
  title,
  ...props
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const [importing, setImporting] = useState(false)
  const [openImport, setOpenImport] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importResult, setImportResult] = useState(null)
  const [importError, setImportError] = useState(null)
  const [exportWarning, setExportWarning] = useState(null)

  const inputFileRef = useRef()

  let mode

  if (onImport && onExport) mode = IMPORT_EXPORT_MODE.BOTH
  else if (onImport) mode = IMPORT_EXPORT_MODE.IMPORT_ONLY
  else if (onExport) mode = IMPORT_EXPORT_MODE.EXPORT_ONLY

  const { FILE_SIZE_LIMIT, NUMBER_OF_FILE } = IMPORT_SETTING
  const { XLSX } = FILE_TYPE

  const validateFileInput = (files) => {
    const file = files[0]

    if (files.length > NUMBER_OF_FILE)
      setImportError(
        `${t('fileUpload.error.invalidNumberOfFiles')} ${NUMBER_OF_FILE}`,
      )
    else if (files.length === NUMBER_OF_FILE) {
      const { name, size } = file

      const msg = []

      if (size <= 0 || size > FILE_SIZE_LIMIT)
        msg.push(
          `${t('fileUpload.error.invalidSize')} ${formatFileSize(
            FILE_SIZE_LIMIT,
          )}.`,
        )

      if (!isValidFileType(name, XLSX.EXT)) {
        msg.push(`${t('fileUpload.error.invalidType')} ${XLSX.NAME}.`)
      }

      setImportError(msg.join('\n').trim())
    }
  }

  const onFileChange = (event) => {
    const files = event.target.files

    validateFileInput(files)

    return setImportFile(files[0])
  }

  const onDropFile = (event) => {
    event.preventDefault()

    const files = event.dataTransfer.files

    validateFileInput(files)

    return setImportFile(files[0])
  }

  const onSubmit = async () => {
    setImporting(true)

    try {
      const res = await onImport(importFile)
      if (res.statusCode === 200) {
        setOpenImport(false)
        setImportResult(res.data)
      } else if (res.statusCode === 400) {
        res?.data?.dataError
          ? setImportError(
              `${t('fileUpload.error.lineError')} ${res?.data?.dataError
                ?.map((e) => e?.line)
                .join(', ')}`,
            )
          : setImportError(res.message)
      } else {
        setImportError(res.message)
      }
    } catch (err) {
      setImportError(err)
    } finally {
      setImporting(false)
    }
  }

  const onResultCancel = () => {
    resetImportState()
    onRefresh && onRefresh()
    setOpenImport && setOpenImport(false)
  }

  const onImportCancel = () => {
    resetImportState()
    setOpenImport && setOpenImport(false)
  }

  const onClickDropzone = () => {
    if (!importFile) inputFileRef.current.click()
  }

  // const onImportAgain = () => {
  //   resetImportState()
  //   onRefresh && onRefresh()
  //   setOpenImport && setOpenImport(false)
  // }

  /**
   * Convert raw int array in json response to JS Uint8Array
   * @param rawArr
   * @param fileName
   * @return {Promise<void>}
   */
  const downloadInt8Arr = async (rawArr, fileName) => {
    const uint8Arr = new Uint8Array(rawArr)

    await downloadFile(uint8Arr, fileName, XLSX.MIME_TYPE, [XLSX.EXT])
  }

  // const onDownloadLog = async () => {
  //   await downloadInt8Arr(
  //     importResult.log.data,
  //     format(
  //       IMPORT_SETTING.FILE_NAME,
  //       t('import.prefix.importLog'),
  //       name,
  //       '_' +
  //         convertUtcDateTimeToLocalTz(new Date(), IMPORT_EXPORT_DATE_FORMAT),
  //     ),
  //   )
  // }

  // const onClickDownloadTemplate = async () => {
  //   let res

  //   try {
  //     res = await onDownloadTemplate()
  //   } catch (err) {
  //     addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
  //   }

  //   if (!res) {
  //     addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
  //     return
  //   }

  //   if (res.statusCode === 200) {
  //     const rawArr = res.data.data

  //     await downloadInt8Arr(
  //       rawArr,
  //       format(
  //         IMPORT_SETTING.FILE_NAME,
  //         t('import.prefix.importTemplate'),
  //         name,
  //         '',
  //       ),
  //     )
  //   } else {
  //     addNotification(res.message, NOTIFICATION_TYPE.ERROR)
  //   }
  // }

  const onClickExport = async () => {
    let res

    try {
      res = await onExport()
    } catch (err) {
      addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
    }

    if (!res) {
      addNotification(t('toast.defaultError'), NOTIFICATION_TYPE.ERROR)
      return
    }

    const { message, statusCode, data } = res

    if (statusCode === HTTP_STATUS_CODE.SUCCESS) {
      const rawArr = data.data

      await downloadInt8Arr(
        rawArr,
        `${name}_${convertUtcDateTimeToLocalTz(
          new Date(),
          IMPORT_EXPORT_DATE_FORMAT,
        )}`,
      )

      addNotification(message, NOTIFICATION_TYPE.SUCCESS)
    } else if (statusCode === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
      setExportWarning(message)
    } else {
      addNotification(message, NOTIFICATION_TYPE.ERROR)
    }
  }

  const resetImportState = () => {
    setImportFile(null)
    setImportError(null)
    setImportResult(null)
    setImporting(false)
  }

  const isSubmitDisabled = () =>
    isNil(importFile) || !isEmpty(importError) || importing

  const getColor = (prevColor) =>
    isEmpty(importError) ? prevColor : theme.palette.error.main

  const handleMenuItemClick = (option) => {
    switch (option) {
      case IMPORT_EXPORT_MODE.IMPORT_ONLY:
        setOpenImport(true)
        break
      case IMPORT_EXPORT_MODE.EXPORT_ONLY:
        onClickExport()
        break
      default:
        break
    }
  }

  const Dropzone = () => (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      rowSpacing={4 / 3}
    >
      <Grid item>
        <Icon name="importXlsx" size="auto" />
        <input
          type="file"
          hidden
          accept={FILE_TYPE.XLSX.EXT}
          onChange={onFileChange}
          ref={inputFileRef}
        />
      </Grid>
      <Grid item>
        <Typography component="div">
          {t('import.stepUploadData.description')}
        </Typography>
        <Typography component="span">
          {t('import.stepUploadData.support')}
        </Typography>
        <Typography
          color={theme.palette.primary.main}
          variant="h5"
          component="span"
        >
          {t('import.stepUploadData.fileType')}
        </Typography>
      </Grid>
    </Grid>
  )

  const FileInfo = () => (
    <Grid container flexDirection="column" minHeight={138}>
      <Grid item flex={1}>
        <Grid container columnSpacing={2}>
          <Grid item>
            <Icon
              name="paper"
              size="100%"
              fill={getColor(theme.palette.primary.main)}
            />
          </Grid>
          <Grid item flex={1}>
            <TruncateMarkup lines={1} ellipsis={() => '...'}>
              <Typography color={getColor(theme.palette.text.main)}>
                {importFile?.name}
              </Typography>
            </TruncateMarkup>

            <Typography color={theme.palette.grayF4.contrastText}>
              {formatFileSize(importFile?.size)}
            </Typography>
          </Grid>
          <Grid item alignSelf="center">
            <IconButton onClick={resetImportState} disabled={importing}>
              <Icon name="delete" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {!isEmpty(importError) && (
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
            color={theme.palette.subText.main}
          >
            {importError}
          </Typography>
        )}
        {importing && (
          <Box textAlign="center">
            <CircularProgress color="primary" />
          </Box>
        )}
      </Grid>
    </Grid>
  )

  const ResultDialog = () => (
    <Dialog
      open={!isNil(importResult)}
      title={t('import.title')}
      // onCancel={onResultCancel}
      // cancelLabel={t('actionBar.closeNotification')}
      onSubmit={onResultCancel}
      submitLabel={t('actionBar.closeNotification')}
      disableBackdropClick={true}
    >
      <Box textAlign="center" p={1}>
        <Box mb={1}>
          {format(
            t('import.result'),
            <Typography
              color={theme.palette.success.main}
              variant="h5"
              component="span"
            >
              {(importResult?.dataSuccess?.nMatched || 0) +
                (importResult?.dataSuccess?.nUpserted || 0)}
            </Typography>,
            <Typography
              color={theme.palette.error.main}
              variant="h5"
              component="span"
            >
              {importResult?.dataError?.length ||
                importResult?.resultError?.length ||
                0}
            </Typography>,
          )}
        </Box>
        {/* <MuiLink
          onClick={onDownloadLog}
          variant="h5"
          component={Link}
          underline="none"
        >
          {t('import.log')}
        </MuiLink> */}
      </Box>
    </Dialog>
  )

  const ImportDialog = () => (
    <Dialog
      open={openImport}
      maxWidth="sm"
      fullWidth={true}
      title={t('import.title')}
      onCancel={onImportCancel}
      cancelLabel={t('actionBar.cancel')}
      cancelProps={{
        disabled: importing,
      }}
      onSubmit={onSubmit}
      submitLabel={t('actionBar.import')}
      submitProps={{
        disabled: isSubmitDisabled(),
      }}
      {...props}
      sx={{
        '.MuiDialogContent-root': {
          py: 0,
        },
      }}
      disableBackdropClick={true}
    >
      <Grid container columnSpacing={12 / 3} position="relative">
        {/* <Icon
          name="collapse"
          size="auto"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
          }}
        /> */}
        {/* <Grid
          item
          xs={6}
          md={6}
          lg={6}
          pt={2}
          borderRight={1}
          borderColor={theme.palette.divider}
        >
          <Typography variant="h5">
            {t('import.stepDownloadTemplate.title')}
          </Typography>
          <Button
            icon="downloadAlt"
            sx={{ my: 2, ml: 0, mr: 1 }}
            onClick={onClickDownloadTemplate}
          >
            {t('import.downloadTemplate')}
          </Button>
          <Typography component="span">
            {t('import.stepDownloadTemplate.description')}
          </Typography>
        </Grid> */}
        <Grid item xs={12} md={12} lg={12} pt={2}>
          <Typography variant="h5">
            {t('import.stepUploadData.title')}
          </Typography>

          {isNil(importFile) ? (
            <Box
              onClick={onClickDropzone}
              onDrop={onDropFile}
              onDragEnter={(event) => {
                event.currentTarget.style.border = `1px dashed ${theme.palette.primary.main}`
              }}
              onDragOver={(event) => {
                event.preventDefault()
              }}
              onDragLeave={(event) => {
                event.currentTarget.style.border = ''
              }}
              sx={{
                my: 3,
                bgcolor: theme.palette.grayF5.main,
                borderRadius: 1,
                border: 1,
                borderColor: getColor(theme.palette.grayF5.main),
                cursor: 'pointer',
                '&:hover': {
                  border: `1px dashed ${theme.palette.primary.main}`,
                },
              }}
            >
              <Box sx={{ p: 3, pointerEvents: 'none' }}>
                <Dropzone />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                my: 3,
                py: 3,
                px: 5,
                bgcolor: theme.palette.grayF5.main,
                borderRadius: 1,
                border: 1,
                borderColor: getColor(theme.palette.grayF5.main),
              }}
            >
              <FileInfo />
            </Box>
          )}
        </Grid>
      </Grid>
    </Dialog>
  )

  const ImportExportDropdown = () => (
    <Dropdown
      icon="download"
      title={t('importExportMenu.importExport')}
      options={IMPORT_EXPORT_MODE_OPTIONS}
      handleMenuItemClick={(option) => handleMenuItemClick(option.value)}
      getOptionLabel={(option) => t(option.text) || ''}
      variant="outlined"
      disabled={disabled}
    />
  )

  const ImportButton = () => (
    <Button
      variant="outlined"
      icon="upload"
      onClick={() => handleMenuItemClick(mode)}
      disabled={disabled}
    >
      {title || t('importExportMenu.import')}
    </Button>
  )

  const ExportButton = () => (
    <Button
      variant="outlined"
      icon="downloadAlt"
      onClick={() => handleMenuItemClick(mode)}
      disabled={disabled}
    >
      {title || t('importExportMenu.export')}
    </Button>
  )

  const ExportWarningDialog = () => (
    <Dialog
      title={t('importExportMenu.export')}
      open={!isEmpty(exportWarning)}
      onCancel={() => setExportWarning(null)}
    >
      <Typography>{exportWarning}</Typography>
    </Dialog>
  )

  switch (mode) {
    case IMPORT_EXPORT_MODE.BOTH:
      return (
        <>
          <ImportExportDropdown />
          <ImportDialog />
          <ResultDialog />
          <ExportWarningDialog />
        </>
      )
    case IMPORT_EXPORT_MODE.IMPORT_ONLY:
      return (
        <>
          <ImportButton />
          <ImportDialog />
          <ResultDialog />
        </>
      )
    case IMPORT_EXPORT_MODE.EXPORT_ONLY:
      return (
        <>
          <ExportButton />
          <ExportWarningDialog />
        </>
      )
    default:
      return null
  }
}

ImportExport.defaultProps = {
  disabled: false,
  title: '',
}

ImportExport.propTypes = {
  name: PropTypes.string,
  onDownloadTemplate: PropTypes.func,
  onImport: PropTypes.func,
  onExport: PropTypes.func,
  onRefresh: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
}

export default ImportExport
