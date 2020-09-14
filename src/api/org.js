import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// ORG API
export function fetchSearchOrgList(data) {
  const url = '/v1/org/list' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function fetchSearchOrgDetail(data) {
  const url = '/v1/org/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function createOrg(data) {
  const url = '/v1/org'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function editOrg(data) {
  const url = '/v1/org'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

