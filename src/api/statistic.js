import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// Statistic API
// Accu, Use
export function fetchSearchStatisticData(data) {
  const url = '/v1/statistic/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchStatisticWeekData(data) {
  const url = '/v1/statistic/week/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchStatisticWeekDetailData(data) {
  const url = '/v1/statistic/week/detail/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

// Cust
export function fetchSearchStatisticCustData(data) {
  const url = '/v1/statistic/cust/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
