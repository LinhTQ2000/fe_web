import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Avatar from '~/components/Avatar'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { ROUTE } from '~/modules/configuration/routes/config'
import { ROUTE as ROUTEDATABASE } from '~/modules/database/routes/config'
import { ROUTE as ROUTEMMS } from '~/modules/mmsx/routes/config'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'
import { matchPathList } from '~/utils/route'

import Notification from '../Notification'
import PageSetting from './PageSetting'
import style from './style'

const Toolbar = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { pathname } = useLocation()
  const { actions } = useAuth()
  const classes = useClasses(style)
  const {
    data: { userInfo },
  } = useUserInfo()
  const { actions: notiActions } = useNotification()
  const paths = [
    ROUTEMMS.DASHBOARD.PATH,
    ROUTE.CONFIGURATION.PATH,
    ROUTEDATABASE.DATABASE.PATH,
  ]

  const match = matchPathList(pathname, paths)

  const options = [
    {
      label: t('page.userInfo'),
      icon: <Icon name="user" size={18} />,
      onClick: () =>
        history.push(
          ROUTE.USER_MANAGEMENT.DETAIL.PATH.replace(':id', userInfo?.id),
        ),
    },
    {
      label: t('page.logout'),
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => {
        actions.logout()
        notiActions.resetNotificationState()
      },
    },
  ]

  const renderButtonDropdown = (even) => {
    return (
      <Tooltip title={userInfo?.fullName || userInfo?.userName}>
        <IconButton
          sx={{
            width: 40,
            minWidth: 40,
            height: 40,
          }}
          color="grayEE"
          onClick={even.onClick}
        >
          <Avatar
            src=""
            name={userInfo?.fullName || userInfo?.userName}
            variant="square"
          />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Box className={classes.root}>
      {match && <PageSetting />}
      <Notification />
      {/*@ToDo: hidden language switcher */}
      <LanguageSwitcher />
      <Dropdown
        options={options}
        color="grayEE"
        icon="user"
        handleMenuItemClick={(opt) => opt.onClick()}
        sx={{
          width: 40,
          minWidth: 40,
          height: 40,
        }}
        renderButton={(even) => renderButtonDropdown(even)}
      />
    </Box>
  )
}

export default Toolbar
