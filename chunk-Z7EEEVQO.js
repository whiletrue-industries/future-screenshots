import{a as U}from"./chunk-EWDOVGIN.js";import{Aa as p,Ba as A,Ca as F,Ha as O,Ia as I,Ja as W,La as l,Ma as g,Na as m,R as _,T as v,Ua as x,V as c,W as o,Y as k,Z as d,ba as S,ea as r,ia as C,ib as L,la as b,ma as P,na as a,oa as s,pa as E,t as y,ta as M,ub as z,w as h,x as w}from"./chunk-IZ5JQW3W.js";var j=()=>["/admin/moderate"],R=(i,n)=>({api_key:i,workspace:n}),u=()=>["/showcase-ws"],B=(i,n,e)=>({workspace:i,api_key:n,admin_key:e}),H=(i,n,e)=>({workspace:i,api_key:n,lang:"nl",admin_key:e}),$=(i,n,e)=>({workspace:i,api_key:n,lang:"he",admin_key:e}),K=(i,n,e)=>({workspace:i,api_key:n,lang:"ar",admin_key:e}),G=()=>["/"],J=(i,n)=>({workspace:i,api_key:n,automatic:"true"});function Q(i,n){if(i&1&&(a(0,"div",0)(1,"h2"),p(2),s(),a(3,"small"),p(4),s(),a(5,"div",1)(6,"a",2),p(7,"Moderate Workspace"),s()(),a(8,"div",1)(9,"a",2),p(10,"Workshop Big Screen"),s(),a(11,"a",2),p(12,"(NL)"),s(),a(13,"a",2),p(14,"(HE)"),s(),a(15,"a",2),p(16,"(AR)"),s()(),a(17,"div",1)(18,"a",3),p(19,"Ingest (Regular)"),s(),a(20,"a",3),p(21,"(NL)"),s(),a(22,"a",3),p(23,"(HE)"),s(),a(24,"a",3),p(25,"(AR)"),s()(),a(26,"div",1)(27,"a",3),p(28,"Ingest (Workshop)"),s(),a(29,"a",3),p(30,"(NL)"),s(),a(31,"a",3),p(32,"(HE)"),s(),a(33,"a",3),p(34,"(AR)"),s()(),a(35,"div",1)(36,"a",2),p(37,"Ingest (Automatic)"),s()()()),i&2){let e=M(),t=W(0);o(2),A(t.metadata.source),o(2),F("ID: ",t.id,""),o(2),r("routerLink",l(22,j))("queryParams",g(23,R,t.keys.admin,t.id)),o(3),r("routerLink",l(26,u))("queryParams",m(27,B,t.id,t.keys.collaborate,t.keys.admin)),o(2),r("routerLink",l(31,u))("queryParams",m(32,H,t.id,t.keys.collaborate,t.keys.admin)),o(2),r("routerLink",l(36,u))("queryParams",m(37,$,t.id,t.keys.collaborate,t.keys.admin)),o(2),r("routerLink",l(41,u))("queryParams",m(42,K,t.id,t.keys.collaborate,t.keys.admin)),o(3),r("href","/"+e.ingestSuffix(),c),o(2),r("href","/nl/"+e.ingestSuffix(),c),o(2),r("href","/he/"+e.ingestSuffix(),c),o(2),r("href","/ar/"+e.ingestSuffix(),c),o(3),r("href","/"+e.ingestSuffixWorkshop(),c),o(2),r("href","/nl/"+e.ingestSuffixWorkshop(),c),o(2),r("href","/he/"+e.ingestSuffixWorkshop(),c),o(2),r("href","/ar/"+e.ingestSuffixWorkshop(),c),o(3),r("routerLink",l(46,G))("queryParams",g(47,J,t.id,t.keys.collaborate))}}var f=class i{workspace=_();ingestSuffix=x(()=>{let n=this.workspace();return n&&n.id&&n.keys?`?workspace=${n.id}&api_key=${n.keys.collaborate}`:""});ingestSuffixWorkshop=x(()=>this.ingestSuffix()+"&ws=true");static \u0275fac=function(e){return new(e||i)};static \u0275cmp=d({type:i,selectors:[["app-workspace-item"]],inputs:{workspace:[1,"workspace"]},decls:2,vars:2,consts:[[1,"workspace-item"],[1,"links"],[3,"routerLink","queryParams"],[3,"href"]],template:function(e,t){if(e&1&&(O(0),S(1,Q,38,50,"div",0)),e&2){let q=I(t.workspace());o(),C(q?1:-1)}},dependencies:[L],styles:[`

h2[_ngcontent-%COMP%] {
  margin: 0;
}
small[_ngcontent-%COMP%] {
  display: block;
}
.links[_ngcontent-%COMP%] {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px 24px;
}`]})};var V=(i,n)=>n.id;function X(i,n){if(i&1&&E(0,"app-workspace-item",0),i&2){let e=n.$implicit;r("workspace",e)}}var N=class i{constructor(n,e){this.adminApi=n;this.auth=e;this.auth.user.pipe(y(t=>!!t),h(1),w(0)).subscribe(()=>{console.log("AUTH TOKEN:",this.auth.token()),this.adminApi.listWorkspaces().subscribe(t=>{console.log("Workspaces:",t),this.workspaces.set(t)})})}workspaces=v([]);static \u0275fac=function(e){return new(e||i)(k(U),k(z))};static \u0275cmp=d({type:i,selectors:[["app-admin"]],decls:2,vars:0,consts:[[3,"workspace"]],template:function(e,t){e&1&&b(0,X,1,1,"app-workspace-item",0,V),e&2&&P(t.workspaces())},dependencies:[f],styles:[`

.font-sans[_ngcontent-%COMP%] {
  font-family: "Source Sans 3", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.buttons[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
  flex-flow: column;
  padding: 8px 0;
  gap: 4px;
}
.buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  gap: 8px;
}
.buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]    > .button[_ngcontent-%COMP%] {
  flex: 1 1 auto;
}
.buttons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {
  height: 32px;
  padding: 0px 8px;
  display: flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  leading-trim: both;
  text-edge: cap;
  font-family: "Source Sans 3", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  text-transform: uppercase;
  font-weight: 400;
  border: 1px solid rgba(78, 2, 178, 0.5);
  background: #FBF5F6;
  color: #4E02B2;
  cursor: pointer;
}
.buttons[_ngcontent-%COMP%]   .button.primary[_ngcontent-%COMP%] {
  border: 1px solid #F1E5F3;
  background: #4E02B2;
  color: white;
  font-weight: 700;
}
.buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
[_nghost-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  width: 100%;
  height: 100%;
  overflow: auto;
}`]})};export{N as AdminComponent};
/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/
