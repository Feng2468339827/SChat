import { request } from './request'

export async function apiGet (url, params) {
  let options = {
    method: 'GET',
    params: params,
    url
  }
  return request(options)
}

export async function apiPost (url, params) {
  let options = {
    method: 'POST',
    data: params,
    url
  }
  return request(options)
}

export async function apiPut (url, params) {
  let options = {
    method: 'PUT',
    data: params,
    url
  }
  return request(options)
}

export async function apiDelete (url, params) {
  let options = {
    method: 'DELETE',
    data: params,
    url
  }
  return request(options)
}
