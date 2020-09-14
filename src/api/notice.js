import request from './config/axios'
import { objectToParam } from '@/utils/objectKey'

// NOTICE API
export function fetchNoticeList(data) {
  const url = '/demo2/v1/api/notice' + objectToParam(data)
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function insertNotice(data) {
  const url = '/demo2/v1/api/notice'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, data, config)
}

export function fetchNoticeDetail(data) {
  const url = '/demo2/v1/api/notice/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}

export function editNotice(data) {
  const url = '/demo2/v1/api/notice/' + data.id
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.put(url, data, config)
}

export function deleteNotice(data) {
  const url = '/demo2/v1/api/notice/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.delete(url, config)
}
