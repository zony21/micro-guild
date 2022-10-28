import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  serviceDomain: '2nsyft9h4i',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS,
})