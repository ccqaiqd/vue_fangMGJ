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

// 创建一个类  整合出一个对象 保存着商品基本的信息 方便组件的传递与使用
export class Goods {
	constructor(itemInfo, columns, services) {
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
}
