// import network from '@/network/network' 错误
import { request } from './network'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}

// 请求首页分页列表数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    },
  })
}
