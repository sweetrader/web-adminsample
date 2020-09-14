import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// MNG API
export function fetchSearchMngList(data) {
  const url = '/v1/user/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchMngDetail(data) {
  const url = '/v1/user/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchDuplMngId(data) {
  const url = '/v1/user/check/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function createMng(data) {
  const url = '/v1/user'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function editMng(data) {
  const url = '/v1/user'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}
