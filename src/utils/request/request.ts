import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'
import type { IFetchResult, IInterceptors, IParams, IRequestConfig } from './type'

/**
 *  axios 配置参考 https://www.axios-http.cn/docs/req_config
 */
const defaultConfig: CreateAxiosDefaults = {
  /** 超时 10s */
  timeout: 10000,
  /** 跨域请求是否携带 cookie */
  withCredentials: true,
}

export class Request {
  private instance: AxiosInstance

  constructor(config: CreateAxiosDefaults = {}, interceptors: IInterceptors = {}) {
    this.instance = axios.create({
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config.headers,
      },
    })

    // 自定义拦截器
    this.instance.interceptors.request.use(
      interceptors.requestInterceptor,
      interceptors.requestErrorInterceptor,
    )
    this.instance.interceptors.response.use(
      interceptors.responseInterceptor,
      interceptors.responseErrorInterceptor,
    )
  }

  /** get */
  get<T, P extends IParams = any>(
    url: string,
    params?: P,
    config?: IRequestConfig,
  ): IFetchResult<T> {
    return this.instance.request({
      url,
      params,
      method: 'get',
      ...config,
    })
  }

  /** post */
  post<T, P = any>(url: string, data?: P, config?: IRequestConfig): IFetchResult<T> {
    return this.instance.request({
      url,
      data,
      method: 'post',
      ...config,
    })
  }

  /** delete */
  delete<T, P = any>(url: string, data?: P, config?: IRequestConfig): IFetchResult<T> {
    return this.instance.request({
      url,
      data,
      method: 'delete',
      ...config,
    })
  }

  /** put */
  put<T, P = any>(url: string, data?: P, config?: IRequestConfig): IFetchResult<T> {
    return this.instance.request({
      url,
      data,
      method: 'put',
      ...config,
    })
  }
}
