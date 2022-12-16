import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import './assets/main.css'

/* import fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpFromBracket,
  faXmark,
  faCircleXmark,
  faMagnifyingGlass,
  faCircleCheck,
  faStar as fasStar,
  faHeart as fasHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as farHeart,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(
  faTwitter,
  faArrowUpFromBracket,
  farHeart,
  fasHeart,
  farStar,
  fasStar,faCircleCheck,
  faCircleXmark,
  faXmark,
  faMagnifyingGlass
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('vueLoading', loading)
app.use(createPinia())
app.use(router)

app.mount('#app')
