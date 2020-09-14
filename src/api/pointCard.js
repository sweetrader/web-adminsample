import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// Point Card Base API
export function fetchSearchPointCardList(data) {
  const url = '/v1/point-card/mng/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchPointCardDetail(data) {
  const url = '/v1/point-card/mng/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function createPointCard(data) {
  const url = '/v1/point-card/mng'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function editPointCard(data) {
  const url = '/v1/point-card/mng'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}
