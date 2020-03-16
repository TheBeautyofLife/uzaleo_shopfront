import * as axios from 'axios'

const BASE_URL = 'http://api.sifawear.ml'

export function upload (formData) {
  const url = `${BASE_URL}/image/v1/products/images/create/`
  return axios.post(url, formData)
  // get data
    .then(res => res.data.data)
}
