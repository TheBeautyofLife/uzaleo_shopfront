import * as axios from 'axios'

const BASE_URL = 'https://api.imgbb.com/1'

export function upload (formData) {
  const url = `${BASE_URL}/upload?key=${process.env.VUE_APP_IMGBBKEY}`
  return axios.post(url, formData)
  // get data
    .then(res => res.data.data)
}
