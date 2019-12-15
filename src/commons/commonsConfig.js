const env = process.env.VUE_APP_BASE_API

export const BASE_URL = env === 'DEV' ? 'http://47.94.133.35:5500' : ''
