import{_ as f,a as n,r as b,o as d,c,b as $,d as t,F as u,e as y,t as r,f as M,g as h}from"./index-59c431a6.js";import{p as _}from"./productModal-ef45106d.js";const x={components:{productModal:_},data(){return{url:"https://vue3-course-api.hexschool.io/v2/",api_path:"rita009",products:{},tempProduct:{}}},methods:{getData(){n.get(`${this.url}api/${this.api_path}/products/all`).then(e=>{this.products=e.data.products,console.log("產品列表：",this.products)}).catch(e=>{alert(e.data.message)})},openModal(e){n.get(`${this.url}api/${this.api_path}/product/${e}`).then(a=>{this.tempProduct=a.data.product,this.$refs.productModal.openModal(),console.log("單一產品資訊：",this.tempProduct)}).catch(a=>{alert(a.data.message)})},addCart(e,a=1){const i={product_id:e,qty:a};n.post(`${this.url}api/${this.api_path}/cart`,{data:i}).then(s=>{this.$refs.productModal.closeModal(),console.log("加入購物車：",s.data.data)}).catch(s=>{alert(s.data.message)})},goProductDetail(e){this.$router.push(`product-detail/${e}`)}},components:{productModal:_},mounted(){this.getData()}},C={class:"table align-middle"},k=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),v={style:{width:"200px"}},P={style:{height:"100%"}},D=["src","alt"],N={class:"h5"},V={key:0,class:"h6"},B={class:"btn-group btn-group-sm"},w=["onClick"],F=t("i",{class:"fas fa-pulse"},null,-1),L=["onClick"],E=t("i",{class:"fas fa-pulse"},null,-1);function S(e,a,i,s,p,l){const m=b("product-modal");return d(),c(u,null,[$(m,{"temp-product":p.tempProduct,"add-cart":l.addCart,"open-modal":l.openModal,ref:"productModal"},null,8,["temp-product","add-cart","open-modal"]),t("table",C,[k,t("tbody",null,[(d(!0),c(u,null,y(p.products,o=>(d(),c("tr",{key:o.id},[t("td",v,[t("div",P,[t("img",{style:{width:"100%","max-height":"150px"},src:o.imageUrl,alt:o.title},null,8,D)])]),t("td",null,r(o.title),1),t("td",null,[t("div",N,r(o.price)+" 元",1),o.price!==o.origin_price?(d(),c("del",V,"原價 "+r(o.origin_price)+" 元",1)):M("",!0)]),t("td",null,[t("div",B,[t("button",{type:"button",class:"btn btn-outline-secondary",onClick:g=>l.goProductDetail(o.id)},[F,h(" 查看更多 ")],8,w),t("button",{type:"button",class:"btn btn-outline-danger",onClick:g=>l.addCart(o.id)},[E,h(" 加到購物車 ")],8,L)])])]))),128))])])],64)}const j=f(x,[["render",S]]);export{j as default};