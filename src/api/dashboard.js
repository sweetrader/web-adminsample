import request from './config/axios'

// Dashboard API
export function fetchSearchStatisticData() {
  const url = '/v1/statistic/dashboard/list'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
