import request from './config/axios'

export function login(username, password) {
  const url = '/auth/signin'
  const param = {
    username: username,
    password: password
  }
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, param, config)
}

export function getInfo() {
  const url = '/user/select'
  const param = {

  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.post(url, param, config)
}

export function getMcht(data) {
  const url = '/v1/org-mcht/' + data
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request.get(url, config)
}
