<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="NavBread">Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">Filter by</a>
                </div>
                <div class="accessory-result">
                <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
                        <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)">
                            <a href="javascript:void(0)" :class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                        </dd>
                        </dl>
                    </div>

                <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="item in goodsList">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="require('./../assets/img/'+item.productImage)" :key="require('./../assets/img/'+item.productImage)" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-show="loading">
                                <img src="./../assets/img/loading/loading-spinning-bubbles.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop()"></div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import '@/assets/css/base.css'
    import '@/assets/css/product.css'
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'
    import axios from 'axios'
    export default {
        data () {
            return {
                goodsList: [],
                priceFilter:[
                    {
                    startPrice: 0.00,
                    endPrice:100.00
                    },
                    {
                    startPrice: 100.00,
                    endPrice:500.00
                    },
                    {
                    startPrice: 500.00,
                    endPrice:1000.00
                    },
                    {
                    startPrice: 1000.00,
                    endPrice:2000.00
                    },
                    {
                    startPrice: 2000.00,
                    endPrice:'',
                    }
                ],
                priceChecked: 'all',
                filterBy:false,
                overLayFlag:false,
                sortFlag:true,
                page:1,
                pageSize:8,
                data: [],
                busy: false,
                loading: false
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread
        },
        mounted: function () {
            this.getGoodsList()
        },
        methods: {
            getGoodsList(flag){
                var self = this;
                let param = {
                    page:this.page,
                    pageSize:this.pageSize,
                    sort:this.sortFlag?1:-1,
                    priceLevel:this.priceChecked
                }
                this.loading = true;
                axios.get('/goods',{
                    params:param
                }).then((response)=>{
                    this.loading = false;
                    let res = response.data
                    if (res.status == 0) {
                        if(flag){
                            self.goodsList = self.goodsList.concat(res.result.list);
                            if (res.result.count == 0) {
                                this.busy = true;
                            }else{
                                this.busy = false;
                            }
                        }else {
                            self.goodsList = res.result.list
                        }
                    }else if (res.status == 1){
                        self.goodsList = []
                    }
                }
                ).catch(function (error) {
                    console.log(error);
                })
            },
            showFilterPop(){
                this.filterBy = true,
                this.overLayFlag = true
            },
            closePop(){
                this.filterBy = false,
                this.overLayFlag = false
            },
            setPriceFilter(index){
                this.priceChecked = index;
                console.log(this.priceChecked)
                this.page = 1;
                this.closePop(),
                this.getGoodsList()
                this.loadMore()
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag
                this.page = 1,
                this.getGoodsList(),
                this.loadMore()
            },
            loadMore(){
                this.busy = false;
                setTimeout(() => {
                    this.page = this.page + 1;
                    this.getGoodsList(true);
                    this.busy = false
                }, 2000);
            },
            addCart(productId){
                axios.post("/goods/addCart",{
                    productId: productId
                }).then((res)=>{
                    if(res.data.status == 0){
                        alert('success')
                    }else{
                        alert('msg:'+res.data.res)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
