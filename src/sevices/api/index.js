import axios from 'axios'

const BASE_URL = process.env.REACT_APP_HOST

const HEADERS_MULTIPLE_PART = {
  'Content-Type': 'multipart/form-data; boundary=something',
}

export const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: 'application/json',
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })

  axios.interceptors.request.use(
    function (config) {
      // Làm gì đó trước khi request dược gửi đi
      return config
    },
    function (error) {
      // Làm gì đó với lỗi request
      return Promise.reject(error)
    },
  )

  // Thêm một bộ đón chặn response
  axios.interceptors.response.use(
    function (response) {
      // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
      // Làm gì đó với dữ liệu response
      return response
    },
    function (error) {
      // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
      // Làm gì đó với lỗi response
      return Promise.reject(error)
    },
  )
  return instance
}

export const createApi = (instance) => ({
  instance,

  post: (endpoint, params) =>
    instance
      .post(endpoint, params)
      .then(((response) => response, (err) => err.response || err))
      .catch(((response) => response, (err) => err.response || err)),
  get: (endpoint, params) =>
    instance.get(endpoint, {
      params: params,
    }),
  put: (endpoint, params) =>
    instance
      .put(endpoint, params)
      .then(((response) => response, (err) => err.response || err))
      .catch(((response) => response, (err) => err.response || err)),
  patch: (endpoint, params) =>
    instance
      .patch(endpoint, params)
      .then(((response) => response, (err) => err.response || err))
      .catch(((response) => response, (err) => err.response || err)),
  delete: (endpoint, params) =>
    instance
      .delete(endpoint, params)
      .then(((response) => response, (err) => err.response || err))
      .catch(((response) => response, (err) => err.response || err)),
  postMultiplePart: (endpoint, params) =>
    instance
      .post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      })
      .then(((response) => response, (err) => err.response || err))
      .catch(((response) => response, (err) => err.response || err)),

  putMultiplePart: (endpoint, params) =>
    instance
      .put(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      })
      .then(((response) => response, (err) => err.response || err))
      .catch(((response) => response, (err) => err.response || err)),
})

const instance = createInstance(BASE_URL)

const api = createApi(instance)

export { api }
