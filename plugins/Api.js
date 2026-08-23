import conf from '../config.js'
export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL(`${conf.baseURL}/api`);

  // Inject to context as $api
  inject('Api', api)

}