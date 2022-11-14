// import network from '@/network/network' 错误
import { request } from "./network";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

