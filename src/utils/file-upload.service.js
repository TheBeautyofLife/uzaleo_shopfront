import * as axios from 'axios'

const BASE_URL = 'http://api.sifawear.ml'

export function upload (formData) {
  const url = `${BASE_URL}/image/v1/products/images/create/`
  console.log(formData.length)
  return axios.patch(url, formData)
  // get data
    .then(res => res.data)
}
