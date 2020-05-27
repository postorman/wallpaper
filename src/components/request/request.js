import store from '../../store'
const baseUrl = 'http://wall.dreamnight.xyz';
const token = store.getters.getToken

const httpRequest = (opts) => {
  let httpDefaultOpts = {
    url: baseUrl + opts.url,
    data: opts.data,
    method: opts.method,
    header: opts.method == 'get' ? {
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    dataType: 'json',
  }
  let promise = new Promise(function (resolve, reject) {
    uni.request(httpDefaultOpts).then(
      (res) => {
        resolve(res[1])
      }
    ).catch(
      (response) => {
        reject(response)
      }
    )
  })
  return promise
};
//带Token请求
const httpTokenRequest = (opts) => {
  let httpDefaultOpts = {
    url: baseUrl + opts.url,
    data: opts.data,
    method: opts.method,
    header: opts.method == 'get' ? {
      'token': token,
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
        'token': token,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    dataType: 'json',
  }
  console.log(httpDefaultOpts)
  let promise = new Promise(function (resolve, reject) {
    uni.request(httpDefaultOpts).then(
      (res) => {
        resolve(res[1])
      }
    ).catch(
      (response) => {
        reject(response)
      }
    )
  })
  return promise
};

export default {
  baseUrl,
  httpRequest,
  httpTokenRequest
}