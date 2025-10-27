import{a as q}from"./chunk-WUC4B62V.js";import{Ba as s,Ca as k,Da as I,Ia as L,Ja as W,Ka as z,Ma as l,Na as b,Oa as C,Pa as d,S,U as _,W as p,Wa as v,X as o,Z as m,_ as u,_a as B,ca as g,fa as c,ja as f,kb as N,lb as y,ma as E,na as F,oa as r,ob as R,pa as a,qa as A,t as M,ua as x,w as P,x as O,yb as j}from"./chunk-UAILVIBX.js";var $=e=>["/admin/edit",e],K=e=>({key:e}),G=()=>["/admin/moderate"],J=(e,t)=>({api_key:e,workspace:t}),h=()=>["/showcase-ws"],Q=(e,t,n)=>({workspace:e,api_key:t,admin_key:n}),V=(e,t,n)=>({workspace:e,api_key:t,lang:"nl",admin_key:n}),X=(e,t,n)=>({workspace:e,api_key:t,lang:"he",admin_key:n}),Y=(e,t,n)=>({workspace:e,api_key:t,lang:"ar",admin_key:n}),Z=()=>["/"],nn=(e,t)=>({workspace:e,api_key:t,automatic:"true"});function en(e,t){if(e&1&&(r(0,"div",0)(1,"div",1)(2,"div")(3,"h2"),s(4),a(),r(5,"small"),s(6),a()(),r(7,"a",2),s(8,"Settings"),a()(),r(9,"div",3)(10,"a",4),s(11,"Moderate Workspace"),a()(),r(12,"div",3)(13,"a",4),s(14,"Workshop Big Screen"),a(),r(15,"a",4),s(16,"(NL)"),a(),r(17,"a",4),s(18,"(HE)"),a(),r(19,"a",4),s(20,"(AR)"),a()(),r(21,"div",3)(22,"a",5),s(23,"Ingest (Regular)"),a(),r(24,"a",5),s(25,"(NL)"),a(),r(26,"a",5),s(27,"(HE)"),a(),r(28,"a",5),s(29,"(AR)"),a()(),r(30,"div",3)(31,"a",5),s(32,"Ingest (Workshop)"),a(),r(33,"a",5),s(34,"(NL)"),a(),r(35,"a",5),s(36,"(HE)"),a(),r(37,"a",5),s(38,"(AR)"),a()(),r(39,"div",3)(40,"a",4),s(41,"Ingest (Automatic)"),a()()()),e&2){let n=x(),i=z(0);o(4),k(i.metadata.source),o(2),I("ID: ",i.id,""),o(),c("routerLink",b(24,$,i.id))("queryParams",b(26,K,i.keys.admin)),o(3),c("routerLink",l(28,G))("queryParams",C(29,J,i.keys.admin,i.id)),o(3),c("routerLink",l(32,h))("queryParams",d(33,Q,i.id,i.keys.collaborate,i.keys.admin)),o(2),c("routerLink",l(37,h))("queryParams",d(38,V,i.id,i.keys.collaborate,i.keys.admin)),o(2),c("routerLink",l(42,h))("queryParams",d(43,X,i.id,i.keys.collaborate,i.keys.admin)),o(2),c("routerLink",l(47,h))("queryParams",d(48,Y,i.id,i.keys.collaborate,i.keys.admin)),o(3),c("href","/"+n.ingestSuffix(),p),o(2),c("href","/nl/"+n.ingestSuffix(),p),o(2),c("href","/he/"+n.ingestSuffix(),p),o(2),c("href","/ar/"+n.ingestSuffix(),p),o(3),c("href","/"+n.ingestSuffixWorkshop(),p),o(2),c("href","/nl/"+n.ingestSuffixWorkshop(),p),o(2),c("href","/he/"+n.ingestSuffixWorkshop(),p),o(2),c("href","/ar/"+n.ingestSuffixWorkshop(),p),o(3),c("routerLink",l(52,Z))("queryParams",C(53,nn,i.id,i.keys.collaborate))}}var w=class e{workspace=S();ingestSuffix=v(()=>{let t=this.workspace();return t&&t.id&&t.keys?`?workspace=${t.id}&api_key=${t.keys.collaborate}`:""});ingestSuffixWorkshop=v(()=>this.ingestSuffix()+"&ws=true");static \u0275fac=function(n){return new(n||e)};static \u0275cmp=u({type:e,selectors:[["app-workspace-item"]],inputs:{workspace:[1,"workspace"]},decls:2,vars:2,consts:[[1,"workspace-item"],[1,"workspace-header"],[1,"settings-btn",3,"routerLink","queryParams"],[1,"links"],[3,"routerLink","queryParams"],[3,"href"]],template:function(n,i){if(n&1&&(L(0),g(1,en,42,56,"div",0)),n&2){let U=W(i.workspace());o(),f(U?1:-1)}},dependencies:[y],styles:[`

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
.workspace-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.workspace-header[_ngcontent-%COMP%]   .settings-btn[_ngcontent-%COMP%] {
  padding: 0.5rem 1rem;
  background-color: #E7CBFF;
  color: #4E02B2;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.workspace-header[_ngcontent-%COMP%]   .settings-btn[_ngcontent-%COMP%]:hover {
  background-color: #B969FF;
  color: white;
}
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
}`]})};var tn=(e,t)=>t.id;function on(e,t){if(e&1&&(r(0,"div",3),s(1),a()),e&2){let n=x();o(),k(n.successMessage())}}function rn(e,t){if(e&1&&A(0,"app-workspace-item",5),e&2){let n=t.$implicit;c("workspace",n)}}var T=class e{constructor(t,n,i){this.adminApi=t;this.auth=n;this.router=i}workspaces=_([]);successMessage=_(null);ngOnInit(){let t=this.router.getCurrentNavigation();t?.extras?.state?.message&&(this.successMessage.set(t.extras.state.message),setTimeout(()=>this.successMessage.set(null),5e3)),this.auth.user.pipe(M(n=>!!n),P(1),O(0)).subscribe(()=>{console.log("AUTH TOKEN:",this.auth.token()),this.adminApi.listWorkspaces().subscribe(n=>{console.log("Workspaces:",n),this.workspaces.set(n)})})}static \u0275fac=function(n){return new(n||e)(m(q),m(j),m(N))};static \u0275cmp=u({type:e,selectors:[["app-admin"]],decls:10,vars:1,consts:[[1,"admin-container"],[1,"admin-header"],["routerLink","/admin/new",1,"create-workspace-btn"],[1,"success-message"],[1,"workspaces-list"],[3,"workspace"]],template:function(n,i){n&1&&(r(0,"div",0)(1,"div",1)(2,"h1"),s(3,"Workspace Administration"),a(),r(4,"a",2),s(5,"Create New Workspace"),a()(),g(6,on,2,1,"div",3),r(7,"div",4),E(8,rn,1,1,"app-workspace-item",5,tn),a()()),n&2&&(o(6),f(i.successMessage()?6:-1),o(2),F(i.workspaces()))},dependencies:[w,R,y,B],styles:[`

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
}
.admin-container[_ngcontent-%COMP%] {
  width: 100%;
}
.admin-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.admin-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  color: #4E02B2;
  font-size: 2rem;
  margin: 0;
}
.admin-header[_ngcontent-%COMP%]   .create-workspace-btn[_ngcontent-%COMP%] {
  padding: 0.75rem 1.5rem;
  background-color: #4E02B2;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
}
.admin-header[_ngcontent-%COMP%]   .create-workspace-btn[_ngcontent-%COMP%]:hover {
  background-color: #B969FF;
}
.success-message[_ngcontent-%COMP%] {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #81c784;
}
.workspaces-list[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  gap: 16px;
  width: 100%;
}`]})};export{T as AdminComponent};
/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/
