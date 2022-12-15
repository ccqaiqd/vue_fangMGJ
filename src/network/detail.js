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

// 请求详情页底部推荐瀑布流数据
export function getRecommend() {
	return request({
		url: '/recommend'
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

// 店铺信息整合
export class Shop {
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.cSells;
		this.score = shopInfo.score;
		this.goodsCount = shopInfo.cGoods
	}
}
// 商品参数信息
export class GoodsParam {
	constructor(info, rule) {
		// 注: images可能没有值(某些商品有值, 某些没有值)
		this.image = info.images ? info.images[0] : '';
		this.infos = info.set;
		this.sizes = rule.tables;
	}
}
