import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// Point Card Trx API
export function fetchSearchPointCardTrxList(data) {
  const url = '/v1/point-card/his/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchPointCardTrxDetail(data) {
  const url = '/v1/point-card/his/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
