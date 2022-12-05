import { useTheme } from '@emotion/react'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Icon from 'src/components/icon'
import { routes } from 'src/modules/client/routers'

function GlobalMenu() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <List component="div">
        {routes.map((route, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton
                {...(route.path ? { component: Link, to: route.path } : {})}
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
      </List>
      <Divider />
    </>
  )
}

export default GlobalMenu
