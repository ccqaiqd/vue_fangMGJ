// import network from '@/network/network' 错误
import { request } from './network'

// 请求商品详情页数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    },
  })
}
