import { useRef } from 'react'

import { useTheme } from '@emotion/react'
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import Icon from 'src/components/icon'

import { ListMenuStyled } from './style'

function GlobalMenu({ routes }) {
  const theme = useTheme()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const popoverAnchor = useRef([])

  const isActive = (path = '') =>
    pathname === path ||
    pathname === `${path}/` ||
    (path.split('/').length > 2 && pathname.includes(`${path}/`))

  return (
    <>
      <ListMenuStyled component="div">
        {routes.map((route, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton
                ref={(el) => (popoverAnchor.current[index] = el)}
                {...(route.path
                  ? {
                      component: Link,
                      to: route.path,
                    }
                  : {})}
                sx={{
                  mt: '8px',
                  pr: '10px',
                }}
                className={clsx({
                  active: isActive(route.path),
                })}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'unset',
                    mr: '10px',
                  }}
                >
                  <Icon name={route.icon} fill={theme.palette.text.main} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h5"
                      color="text.main"
                      noWrap
                      sx={{ fontWeight: 400 }}
                    >
                      {t(`menu.${route.name}`)}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </ListMenuStyled>
      <Divider />
    </>
  )
}

export default GlobalMenu
