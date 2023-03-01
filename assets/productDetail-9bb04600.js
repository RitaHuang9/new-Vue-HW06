import{_ as h,a as p,r as _,o as a,c as n,b as g,w as v,d as t,t as o,f as y,h as P,v as f,F as d,e as b,g as x}from"./index-573c7d60.js";const k={props:["productId"],data(){return{id:this.$route.params.productId,url:"https://vue3-course-api.hexschool.io/v2/",api_path:"rita009",tempProduct:{},qty:1}},methods:{getData(){p.get(`${this.url}api/${this.api_path}/product/${this.id}`).then(s=>{this.tempProduct=s.data.product,console.log("單一產品資訊：",this.tempProduct)}).catch(s=>{alert(s.data.message)})},addCart(s,r=1){const l={product_id:s,qty:r};p.post(`${this.url}api/${this.api_path}/cart`,{data:l}).then(i=>{console.log("加入購物車：",i.data.data)}).catch(i=>{alert(i.data.message)})}},mounted(){this.getData()}},C={class:"row pt-3"},w={class:"col-sm-6"},D=["src"],V={class:"col-sm-6"},q={class:"badge bg-primary rounded-pill ms-0"},N={class:"h5"},B={key:0,class:"h6"},F={class:"input-group"},I=["value"];function L(s,r,l,i,e,u){const m=_("router-link");return a(),n(d,null,[g(m,{to:{name:"productList"},type:"button",class:"nav-item"},{default:v(()=>[x(" 〈 返回產品列表")]),_:1}),t("div",C,[t("div",w,[t("img",{class:"img-fluid w-100",style:{"object-fit":"cover","max-height":"300px"},src:e.tempProduct.imageUrl,alt:""},null,8,D)]),t("div",V,[t("h2",null,o(e.tempProduct.title),1),t("span",q,o(e.tempProduct.category),1),t("p",null,"商品描述："+o(e.tempProduct.description),1),t("p",null,"商品內容："+o(e.tempProduct.content),1),t("div",N,o(e.tempProduct.price)+" 元",1),e.tempProduct.price!==e.tempProduct.origin_price?(a(),n("del",B,"原價 "+o(e.tempProduct.origin_price)+" 元",1)):y("",!0),t("div",null,[t("div",F,[P(t("select",{name:"",id:"",class:"form-control","onUpdate:modelValue":r[0]||(r[0]=c=>e.qty=c)},[(a(),n(d,null,b(20,c=>t("option",{value:c,key:c+"12344"},o(c),9,I)),64))],512),[[f,e.qty,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-primary",onClick:r[1]||(r[1]=c=>u.addCart(e.tempProduct.id,e.qty))}," 加入購物車 ")])])])])],64)}const U=h(k,[["render",L]]);export{U as default};
