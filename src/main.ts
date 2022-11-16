import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import axios from 'axios'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpFromBracket,
  faXmark,
  faCircleXmark,
  faMagnifyingGlass,
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
  fasStar,
  faCircleXmark,
  faXmark,
  faMagnifyingGlass
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
