import * as axios from 'axios'

const BASE_URL = 'http://api.sifawear.ml'

export function upload (formData) {
  const url = `${BASE_URL}/image/v1/products/images/create/`
<<<<<<< HEAD
  return axios.post(url, formData)
=======
  console.log(formData.length)
  return axios.patch(url, formData)
>>>>>>> 871da1f3eee43e1a89c37aaf6c74aae004fe4d0e
  // get data
    .then(res => res.data)
}
