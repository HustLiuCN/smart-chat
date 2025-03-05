import { onMounted, ref } from 'vue'
import { set } from '@vueuse/core'
import type { IFetchResult } from './type'

export type IService<T, P extends any[]> = (...args: P) => IFetchResult<T>

interface IOptions<T, P> {
  /** 手动触发 */
  manual?: boolean
  /** callback */
  callback?: (result: T) => void
  /** 格式化结果 */
  format?: (result: T) => any
  /** 默认入参 */
  defaultParams?: P
  /** data 默认值 */
  defaultValue?: T
}

export function useRequest<T, P extends any[] = any[]>(
  service: IService<T, P>,
  options: IOptions<T, P> = {},
) {
  const { manual = true, callback, format, defaultValue } = options

  const data = ref<T | undefined>(defaultValue)
  const loading = ref<boolean>(false)

  async function run(...params: Parameters<typeof service>) {
    try {
      set(loading, true)
      const res = await service(...params)

      set(data, format ? format(res.data) : res.data)

      callback?.(res.data)
    } finally {
      set(loading, false)
    }
  }

  onMounted(() => {
    if (!manual) {
      const params: any[] = []
      // @ts-expect-error: 这里对类型输入无要求
      run(...params)
    }
  })

  return {
    run,
    data,
    loading,
  }
}
