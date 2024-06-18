import React, { useState } from 'react'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Avatar } from '~/components/Avatar'
import Button from '~/components/Button'
import NoData from '~/components/NoData'
import { convertUtcDateTimeToLocalTz } from '~/utils'
const Activities = ({ data, sx }) => {
  const { t } = useTranslation('mmsx')
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()

  const getName = (item = {}) =>
    item.userName || item.username || t('general:common.system')
  return (
    <Paper
      sx={{
        mt: 2,
        p: 2,
        ...sx,
      }}
    >
      <Typography variant="h3">{t('common.activityReport')}</Typography>

      {!data.length ? (
        <NoData text={t('dataTable.noData')} />
      ) : (
        <List>
          {(data || [])
            .slice(0, expanded ? data?.length : 2)
            .map((item, index) => (
              <ListItem alignItems="flex-start" key={index} disableGutters>
                <ListItemAvatar>
                  <Avatar alt="" src="" name={getName(item)} />
                </ListItemAvatar>
                <ListItemText
                  color={theme.palette.text.main}
                  primary={
                    <>
                      <Typography
                        variant="h5"
                        component="span"
                        sx={{ mr: getName(item) ? 1 : 0 }}
                      >
                        {getName(item)}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {convertUtcDateTimeToLocalTz(item?.createdAt)}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      {typeof item?.content === 'function' ? (
                        item.content()
                      ) : (
                        <Typography>{item?.content}</Typography>
                      )}
                      {item?.reason && (
                        <Typography>
                          {t('common.message')}:{' '}
                          <span style={{ color: 'red' }}>{item?.reason}</span>
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      )}

      {data?.length > 2 && (
        <Button
          variant="text"
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
        >
          {t(expanded ? 'common.seeLess' : 'common.seeMore')}
        </Button>
      )}
    </Paper>
  )
}

Activities.defaultProps = {
  data: [],
  sx: {},
}

Activities.propTypes = {
  sx: PropTypes.shape(),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      username: PropTypes.string,
      userName: PropTypes.string,
    }),
  ),
}

export default Activities
