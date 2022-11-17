<template>
  <div>
    <NavBar class="center"><div slot="center">购物街</div></NavBar>
    <HomeSwiper
      :banners="banners"
      class="lunbo"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <FeatureView></FeatureView>
    <TabControl
      class="tabControl"
      :titles="['流行', '新款', '精品']"></TabControl>
    <GoodsList :goods="goods.pop"></GoodsList>
    <ul>
      <li>站位1</li>
      <li>站位2</li>
      <li>站位3</li>
      <li>站位4</li>
      <li>站位5</li>
      <li>站位6</li>
      <li>站位7</li>
      <li>站位8</li>
      <li>站位9</li>
      <li>站位10</li>
      <li>站位11</li>
      <li>站位12</li>
      <li>站位13</li>
      <li>站位14</li>
      <li>站位15</li>
      <li>站位16</li>
      <li>站位17</li>
      <li>站位18</li>
      <li>站位19</li>
      <li>站位20</li>
      <li>站位21</li>
      <li>站位22</li>
      <li>站位23</li>
      <li>站位24</li>
      <li>站位25</li>
      <li>站位26</li>
      <li>站位27</li>
      <li>站位28</li>
      <li>站位29</li>
      <li>站位30</li>
      <li>站位31</li>
      <li>站位32</li>
      <li>站位33</li>
      <li>站位34</li>
      <li>站位35</li>
      <li>站位36</li>
      <li>站位37</li>
      <li>站位38</li>
      <li>站位39</li>
      <li>站位40</li>
      <li>站位41</li>
      <li>站位42</li>
      <li>站位43</li>
      <li>站位44</li>
      <li>站位45</li>
      <li>站位46</li>
      <li>站位47</li>
      <li>站位48</li>
      <li>站位49</li>
      <li>站位50</li>
      <li>站位51</li>
      <li>站位52</li>
      <li>站位53</li>
      <li>站位54</li>
      <li>站位55</li>
      <li>站位56</li>
      <li>站位57</li>
      <li>站位58</li>
      <li>站位59</li>
      <li>站位60</li>
      <li>站位61</li>
      <li>站位62</li>
      <li>站位63</li>
      <li>站位64</li>
      <li>站位65</li>
      <li>站位66</li>
      <li>站位67</li>
      <li>站位68</li>
      <li>站位69</li>
      <li>站位70</li>
      <li>站位71</li>
      <li>站位72</li>
      <li>站位73</li>
      <li>站位74</li>
      <li>站位75</li>
      <li>站位76</li>
      <li>站位77</li>
      <li>站位78</li>
      <li>站位79</li>
      <li>站位80</li>
      <li>站位81</li>
      <li>站位82</li>
      <li>站位83</li>
      <li>站位84</li>
      <li>站位85</li>
      <li>站位86</li>
      <li>站位87</li>
      <li>站位88</li>
      <li>站位89</li>
      <li>站位90</li>
      <li>站位91</li>
      <li>站位92</li>
      <li>站位93</li>
      <li>站位94</li>
      <li>站位95</li>
      <li>站位96</li>
      <li>站位97</li>
      <li>站位98</li>
      <li>站位99</li>
      <li>站位100</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from '@/views/home/childComps/HomeSwiper'
  import RecommendView from '@/views/home/childComps/RecommendView'
  import FeatureView from '@/views/home/childComps/FeatureView'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import { getHomeMultidata, getHomeGoods } from '@/network/home'

  export default {
    name: 'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        // 首页下拉商品数据模型设计
        goods: {
          pop: { page: 1, list: [] },
          new: { page: 1, list: [] },
          sell: { page: 1, list: [] },
        },
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
    },
    created() {
      getHomeMultidata().then(res => {
        console.log('res~~~', res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
      // 请求不同分页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      getHomeGoods(type) {
        let page = this.goods[type].page
        getHomeGoods(type, page).then(res => {
          console.log(`商品列表数据${type}`, res.data)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
    },
  }
</script>

<style scoped>
  .center {
    /* 使用定义好的常量 */
    background-color: var(--color-tint);
    color: white;
    /* 阻止导航栏随着滚动而滚动 用 fixed 定位 */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .lunbo {
    padding-top: 44px;
  }
  .tabControl {
    position: sticky;
    top: 44px;
  }
</style>
