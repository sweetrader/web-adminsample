import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// Point Card Trx API
export function fetchSearchPointCardIsuList(data) {
  const url = '/v1/point-card/isu/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
