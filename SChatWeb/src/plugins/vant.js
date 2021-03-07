import Vue from 'vue'
// import 'vant/lib/button/style'
// import 'vant/lib/tabbar/style'
import 'vant/lib/index.css'

import { 
  Button,
  Tabbar,
  TabbarItem,
  IndexBar,
  IndexAnchor,
  Cell,
  CellGroup,
  Icon,
  Search,
  Field,
  ActionSheet,
  Popover
} from 'vant'

Vue.use(ActionSheet)
Vue.use(Field)
Vue.use(Popover)
Vue.use(Search)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(CellGroup)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)