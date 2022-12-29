import axios from 'axios'
import { ref } from 'vue'
import { isLoading } from '@/stores/Loading'

const dramaInfoRequest = axios.create({
  baseURL: 'http://localhost:3000/dramaInfo',
})

const loadingCount = ref(0)

const addLoading = () => {
  isLoading.value = true
  loadingCount.value++
}

const closeLoading = () => {
  setTimeout(() => {
    loadingCount.value--
    if (loadingCount.value == 0) {
      isLoading.value = false
    }
  })
}

dramaInfoRequest.interceptors.request.use(
  (config) => {
    // console.log('攔截請求')
    addLoading()
    // console.log(loadingCount.value)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

dramaInfoRequest.interceptors.response.use(
  (response) => {
    // console.log('攔截回應')
    closeLoading()
    // console.log(loadingCount.value, isLoading.value)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default dramaInfoRequest
