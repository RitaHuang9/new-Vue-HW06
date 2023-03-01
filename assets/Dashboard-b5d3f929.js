import{_ as u,a as l,o as a,c as n,d as t,F as c,e as p,t as i}from"./index-573c7d60.js";import{p as m}from"./productModal-723e2ada.js";const _={data(){return{url:"https://vue3-course-api.hexschool.io/v2/",api_path:"rita009",products:{},page:{},tempProduct:{imagesUrl:[]},tempUploadImg:{},isNew:!1}},methods:{checkLogin(){l.post(`${this.url}api/user/check`).then(()=>{this.getProduct(),console.log("有登入")}).catch(o=>{alert(o.data.message),that.$router.push({name:"login"})})},getProduct(o=1){l.get(`${this.url}api/${this.api_path}/admin/products/?page=${o}`).then(e=>{this.products=e.data.products,this.page=e.data.pagination,console.log("取得產品列表",this.products)}).catch(e=>{alert(e.data.message)})},openModal(o,e){this.isNew=!1,this.tempProduct={...e},console.log("編輯當前資料",this.tempProduct),this.$router.push(`dashboardProduct-detail/${this.tempProduct.id}`)}},components:{productModals:m},mounted(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/,"$1");l.defaults.headers.common.Authorization=o,this.checkLogin()}},g={class:"text-end mt-4"},b={class:"table mt-4"},k=t("thead",null,[t("tr",null,[t("th",{width:"120"},"分類"),t("th",null,"產品名稱"),t("th",{width:"120"},"原價"),t("th",{width:"120"},"售價"),t("th",{width:"100"},"是否啟用"),t("th",{width:"120"},"編輯")])],-1),$={class:"text-end"},f={class:"text-end"},y={key:0,class:"text-success"},x={key:1},v={class:"btn-group"},w=["onClick"],P=["onClick"];function C(o,e,M,B,r,d){return a(),n(c,null,[t("div",g,[t("button",{class:"btn btn-primary",onClick:e[0]||(e[0]=s=>d.openModal("add",o.product))}," 建立新的產品 ")]),t("table",b,[k,t("tbody",null,[(a(!0),n(c,null,p(r.products,s=>(a(),n("tr",{key:s.id},[t("td",null,i(s.category),1),t("td",null,i(s.title),1),t("td",$,i(s.origin_price),1),t("td",f,i(s.price),1),t("td",null,[s.is_enabled?(a(),n("span",y,"啟用")):(a(),n("span",x,"未啟用"))]),t("td",null,[t("div",v,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:h=>d.openModal("edit",s)}," 編輯 ",8,w),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:h=>d.openModal("delete",s)}," 刪除 ",8,P)])])]))),128))])])],64)}const D=u(_,[["render",C]]);export{D as default};
