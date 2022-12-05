import { Box } from '@mui/system'
import { PropTypes } from 'prop-types'
import { ReactComponent as Avtive } from 'src/assets/images/icons/active.svg'
import { ReactComponent as Add } from 'src/assets/images/icons/add.svg'
import { ReactComponent as ArrowBottom } from 'src/assets/images/icons/arrowBottom.svg'
import { ReactComponent as ArrowDown } from 'src/assets/images/icons/arrowDown.svg'
import { ReactComponent as ArrowLeft } from 'src/assets/images/icons/arrowLeft.svg'
import { ReactComponent as Assign } from 'src/assets/images/icons/assign.svg'
import { ReactComponent as Back } from 'src/assets/images/icons/back.svg'
import { ReactComponent as Bag } from 'src/assets/images/icons/bag.svg'
import { ReactComponent as Calendar } from 'src/assets/images/icons/calendar.svg'
import { ReactComponent as Cart } from 'src/assets/images/icons/cart.svg'
import { ReactComponent as Check } from 'src/assets/images/icons/check.svg'
import { ReactComponent as Clone } from 'src/assets/images/icons/clone.svg'
import { ReactComponent as Close } from 'src/assets/images/icons/close.svg'
import { ReactComponent as Collapse } from 'src/assets/images/icons/collapse.svg'
import { ReactComponent as Delete } from 'src/assets/images/icons/delete.svg'
import { ReactComponent as Download } from 'src/assets/images/icons/download.svg'
import { ReactComponent as DownloadAlt } from 'src/assets/images/icons/downloadAlt.svg'
import { ReactComponent as Edit } from 'src/assets/images/icons/edit.svg'
import { ReactComponent as Filter } from 'src/assets/images/icons/filter.svg'
import { ReactComponent as GanntChart } from 'src/assets/images/icons/gantt-chart.svg'
import { ReactComponent as ImagePlus } from 'src/assets/images/icons/imagePlus.svg'
import { ReactComponent as ImportXlsx } from 'src/assets/images/icons/importXlsx.svg'
import { ReactComponent as InActive } from 'src/assets/images/icons/inActive.svg'
import { ReactComponent as Invisible } from 'src/assets/images/icons/invisible.svg'
import { ReactComponent as Invoid } from 'src/assets/images/icons/invoid.svg'
import { ReactComponent as Lock } from 'src/assets/images/icons/keylock.svg'
import { ReactComponent as UnLock } from 'src/assets/images/icons/keyunlock.svg'
import { ReactComponent as ListView } from 'src/assets/images/icons/listView.svg'
import { ReactComponent as Notification } from 'src/assets/images/icons/notification.svg'
import { ReactComponent as Overdue } from 'src/assets/images/icons/overdue.svg'
import { ReactComponent as Paper } from 'src/assets/images/icons/paper.svg'
import { ReactComponent as QRWhite } from 'src/assets/images/icons/qr-white.svg'
import { ReactComponent as QR } from 'src/assets/images/icons/qr.svg'
import { ReactComponent as Remove } from 'src/assets/images/icons/remove.svg'
import { ReactComponent as Rhombus } from 'src/assets/images/icons/rhombus.svg'
import { ReactComponent as Save } from 'src/assets/images/icons/save.svg'
import { ReactComponent as Search } from 'src/assets/images/icons/search.svg'
import { ReactComponent as Setting } from 'src/assets/images/icons/setting.svg'
import { ReactComponent as Show } from 'src/assets/images/icons/show.svg'
import { ReactComponent as TableFilter } from 'src/assets/images/icons/tableFilter.svg'
import { ReactComponent as TableSetting } from 'src/assets/images/icons/tableSetting.svg'
import { ReactComponent as Tick } from 'src/assets/images/icons/tick.svg'
import { ReactComponent as Time } from 'src/assets/images/icons/time.svg'
import { ReactComponent as Upload } from 'src/assets/images/icons/upload.svg'
import { ReactComponent as User } from 'src/assets/images/icons/user.svg'
import { ReactComponent as Visible } from 'src/assets/images/icons/visible.svg'
// menu
import { ReactComponent as Chevron } from 'src/assets/images/menu/chevron.svg'
import { ReactComponent as Database } from 'src/assets/images/menu/database.svg'
import { ReactComponent as Drawer } from 'src/assets/images/menu/drawer.svg'
import { ReactComponent as Export } from 'src/assets/images/menu/export.svg'
import { ReactComponent as Home } from 'src/assets/images/menu/home.svg'
import { ReactComponent as Key } from 'src/assets/images/menu/key.svg'
import { ReactComponent as Keylock } from 'src/assets/images/menu/keylock.svg'
import { ReactComponent as Plan } from 'src/assets/images/menu/plan.svg'
import { ReactComponent as PrettyBag } from 'src/assets/images/menu/prettyBag.svg'
const icons = {
  add: <Add />,
  setting: <Setting />,
  close: <Close />,
  calendar: <Calendar />,
  notification: <Notification />,
  search: <Search />,
  back: <Back />,
  arrowLeft: <ArrowLeft />,
  tableSetting: <TableSetting />,
  tableFilter: <TableFilter />,
  check: <Check />,
  show: <Show />,
  invisible: <Invisible />,
  visible: <Visible />,
  edit: <Edit />,
  delete: <Delete />,
  tick: <Tick />,
  arrowDown: <ArrowDown />,
  download: <Download />,
  remove: <Remove />,
  user: <User />,
  arrowBottom: <ArrowBottom />,
  bag: <Bag />,
  cart: <Cart />,
  rhombus: <Rhombus />,
  invoid: <Invoid />,
  save: <Save />,
  upload: <Upload />,
  importXlsx: <ImportXlsx />,
  clone: <Clone />,
  downloadAlt: <DownloadAlt />,
  collapse: <Collapse />,
  paper: <Paper />,
  lock: <Lock />,
  unLock: <UnLock />,
  assign: <Assign />,
  overdue: <Overdue />,
  filter: <Filter />,
  listView: <ListView />,
  ganttChart: <GanntChart />,
  qr: <QR />,
  qrWhite: <QRWhite />,
  active: <Avtive />,
  inActive: <InActive />,
  time: <Time />,
  // menu
  drawer: <Drawer />,
  home: <Home />,
  database: <Database />,
  plan: <Plan />,
  key: <Key />,
  prettyBag: <PrettyBag />,
  export: <Export />,
  chevron: <Chevron />,
  keylock: <Keylock />,
  imagePlus: <ImagePlus />,
}

const Icon = ({ name, fill, size, sx, ...props }) => {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        svg: {
          width: '100%',
          height: '100%',
          path: { fill: fill },
        },
        ...(size
          ? {
              width: size,
              height: size,
            }
          : {}),
        ...sx,
      }}
      {...props}
    >
      {icons[name]}
    </Box>
  )
}

Icon.defaultProps = {
  name: '',
  size: 20,
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Icon
