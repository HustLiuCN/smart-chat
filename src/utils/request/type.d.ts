import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export type IParams = Record<string, any> | URLSearchParams | null

export interface IRequestConfig extends AxiosRequestConfig {
  /** 忽略业务 status !== 200 */
  ignoreException?: boolean
  /** 其他业务方自定义的配置 */
  [key: string]: any
}

export interface IInterceptors {
  requestInterceptor?: (req: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestErrorInterceptor?: (error: AxiosError) => Promise<any>
  responseInterceptor?: (res: AxiosResponse) => any
  responseErrorInterceptor?: (error: AxiosError) => any
}

/** 封装后的请求结果 */
export type IFetchResult<T> = Promise<ISuccessResult<T>>
/** 接口返回统一格式 */
export type ISuccessResult<T> = {
  status?: number
  message?: string
  data: T
  fieldErrors?: any
  /** 针对 status === 200 判断封装一个 ok 字段方便业务方直接取用 */
  ok?: boolean
}
