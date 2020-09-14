import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// MCHT API
export function fetchSearchMchtList(data) {
  const url = '/v1/org-mcht/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchMchtDetail(data) {
  const url = '/v1/org-mcht/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function createMcht(data) {
  const url = '/v1/org-mcht'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function editMcht(data) {
  const url = '/v1/org-mcht'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function regExcelMcht(data) {
  const url = '/v1/org-mcht/mass'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}
