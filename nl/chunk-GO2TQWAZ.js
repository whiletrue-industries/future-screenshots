import{b as B,c as j,d as R,e as z,f as N,g as $,h as D}from"./chunk-TPHK2LQT.js";import{a as q}from"./chunk-3IZBYQGP.js";import"./chunk-UAD4KZV2.js";import{Aa as T,Ba as i,Ca as a,Da as W,Ea as b,Ga as g,Ha as p,Oa as l,Pa as v,Qa as F,Ra as V,Sa as f,Ta as x,U as _,Ua as C,V as m,ea as u,ha as E,ia as r,jb as O,ka as k,la as K,pa as y,sa as c,ua as S,vb as A,wa as w,xa as L,za as I}from"./chunk-OGAAX4ED.js";var X=(d,o)=>o._id;function Y(d,o){if(d&1&&(i(0,"option",9),l(1),a()),d&2){let t=o.$implicit,e=o.$index;c("value",e),r(),v(t.name)}}function G(d,o){if(d&1&&(i(0,"div",10)(1,"a",12),l(2,"Index creation needed"),a()()),d&2){let t=p();r(),c("href",t.indexLink(),E)}}function H(d,o){if(d&1){let t=b();i(0,"div",15)(1,"input",28),C("ngModelChange",function(n){_(t);let s=p().$implicit;return x(s.future_scenario_tagline,n)||(s.future_scenario_tagline=n),m(n)}),a(),i(2,"button",20),g("click",function(){_(t);let n=p().$implicit,s=p(2);return m(s.setTagline(n))}),l(3,"OK"),a(),i(4,"button",20),g("click",function(){_(t);let n=p(3);return m(n.editTagline.set(!1))}),l(5,"X"),a()()}if(d&2){let t=p().$implicit;r(),f("ngModel",t.future_scenario_tagline)}}function J(d,o){if(d&1){let t=b();i(0,"div",30),g("click",function(){_(t);let n=p(4);return m(n.editTagline.set(!0))}),l(1),a()}if(d&2){let t=p(2).$implicit;r(),v(t.future_scenario_tagline)}}function Q(d,o){if(d&1){let t=b();i(0,"div",30),g("click",function(){_(t);let n=p(4);return m(n.editTagline.set(!0))}),i(1,"em"),l(2,"Add a tagline"),a()()}}function Z(d,o){if(d&1&&y(0,J,2,1,"div",29)(1,Q,3,0,"div",29),d&2){let t=p().$implicit;w(t.future_scenario_tagline?0:1)}}function ee(d,o){if(d&1&&(i(0,"div",17),l(1),a()),d&2){let t=p().$implicit,e=p(2);r(),v(e.LEVELS[t._private_moderation])}}function te(d,o){d&1&&(i(0,"div",17),l(1,"no moderation status"),a())}function ne(d,o){if(d&1){let t=b();i(0,"div",13),W(1,"img",14),y(2,H,6,1,"div",15)(3,Z,2,1),i(4,"div",16),y(5,ee,2,1,"div",17)(6,te,2,0,"div",17),i(7,"div",17),l(8),a(),i(9,"div",17),l(10),a(),i(11,"div",17),l(12),a(),i(13,"div",17),l(14),a()(),i(15,"div",18)(16,"div",19)(17,"button",20),g("click",function(){let n=_(t).$implicit,s=p(2);return m(s.reject(n._id))}),l(18,"NO"),a(),i(19,"button",20),g("click",function(){let n=_(t).$implicit,s=p(2);return m(s.approve(n._id))}),l(20,"YES"),a(),i(21,"button",20),g("click",function(){let n=_(t).$implicit,s=p(2);return m(s.highlight(n._id))}),l(22,"LIKE"),a()()(),i(23,"div",21)(24,"select",22),C("ngModelChange",function(n){let s=_(t).$implicit;return x(s.plausibility,n)||(s.plausibility=n),m(n)}),g("change",function(){let n=_(t).$implicit,s=p(2);return m(s.setPlausibility(n))}),i(25,"option",9),l(26,"Potential?"),a(),i(27,"option",9),l(28,"Projected"),a(),i(29,"option",9),l(30,"90"),a(),i(31,"option",9),l(32,"80"),a(),i(33,"option",9),l(34,"Probable"),a(),i(35,"option",9),l(36,"70"),a(),i(37,"option",9),l(38,"60"),a(),i(39,"option",9),l(40,"Plausible"),a(),i(41,"option",9),l(42,"40"),a(),i(43,"option",9),l(44,"30"),a(),i(45,"option",9),l(46,"Possible"),a(),i(47,"option",9),l(48,"20"),a(),i(49,"option",9),l(50,"10"),a(),i(51,"option",9),l(52,"Preposterous"),a()(),i(53,"select",22),C("ngModelChange",function(n){let s=_(t).$implicit;return x(s.favorable_future,n)||(s.favorable_future=n),m(n)}),g("change",function(){let n=_(t).$implicit,s=p(2);return m(s.setFavorable(n))}),i(54,"option",9),l(55,"Favorable?"),a(),i(56,"option",23),l(57,"Prefer"),a(),i(58,"option",24),l(59,"Mostly Prefer"),a(),i(60,"option",25),l(61,"Mostly Prevent"),a(),i(62,"option",26),l(63,"Prevent"),a(),i(64,"option",27),l(65,"Uncertain"),a()()()()}if(d&2){let t=o.$implicit,e=p(2);r(),c("src",t.screenshot_url,E),r(),w(e.editTagline()?2:3),r(3),w(t._private_moderation>=0?5:6),r(3),v(t.created_at==null?null:t.created_at.slice(0,19)),r(2),V("P&P: ",t.plausibility," / ",t.favorable_future,""),r(2),F("content certainty: ",t.content_certainty,""),r(2),F("transition certainty: ",t.transition_bar_certainty,""),r(3),S("primary",t._private_moderation===0),r(2),S("primary",t._private_moderation===4),r(2),S("primary",t._private_moderation===5),r(3),f("ngModel",t.plausibility),r(),c("value",null),r(2),c("value",100),r(2),c("value",90),r(2),c("value",80),r(2),c("value",75),r(2),c("value",70),r(2),c("value",60),r(2),c("value",50),r(2),c("value",40),r(2),c("value",30),r(2),c("value",25),r(2),c("value",20),r(2),c("value",10),r(2),c("value",0),r(2),f("ngModel",t.favorable_future),r(),c("value",null)}}function ie(d,o){if(d&1&&(i(0,"div",11),I(1,ne,66,31,"div",13,X),a()),d&2){let t=p();r(),T(t.items())}}var U=class d{constructor(o,t){this.route=o;this.api=t;this.route.queryParams.subscribe(e=>{this.apiKey.set(e.api_key||null),this.workspaceId.set(e.workspace||this.workspaceId())}),O(()=>{let e=this.workspaceId(),n=this.apiKey(),s=this.filter(),P=this.page();console.log("page",P,"filter",s.filter,"workspaceId",e,"apiKey",n),e&&n&&this.api.getItems(e,n,P,s.filter).subscribe(h=>{h["index-required"]?(this.indexLink.set(h["index-required"]||null),this.items.set([])):(this.indexLink.set(null),h=h.filter(M=>!!M?.screenshot_url),h.forEach(M=>{M.screenshot_url=this.fix_url(M.screenshot_url),M.favorable_future=this.fix_favorable_future(M.favorable_future)}),this.items.set(h))})}),O(()=>{let e=this.workspaceId(),n=this.apiKey();e&&n&&this.api.getWorkspace(e,n).subscribe(s=>{this.workspace.set(s)})}),O(()=>{let e=this.filter();this.page.set(0)})}FILTERS=[{name:"highlighted",filter:"metadata._private_moderation == 5"},{name:"approved",filter:"metadata._private_moderation == 4"},{name:"not-flagged",filter:"metadata._private_moderation == 3"},{name:"pending",filter:"metadata._private_moderation == 2"},{name:"flagged",filter:"metadata._private_moderation == 1"},{name:"rejected",filter:"metadata._private_moderation == 0"},{name:"all",filter:""}];workspaceId=u(null);workspace=u({});apiKey=u(null);page=u(0);filter=u(this.FILTERS[this.FILTERS.length-1]);editTagline=u(!1);items=u([]);indexLink=u(null);LEVELS=["banned","flagged","pending","not-flagged","approved","highlighted"];updateModeration(o,t){let e=this.workspaceId(),n=this.apiKey();e&&n?this.api.updateItemModeration(e,n,o,t).subscribe(s=>{console.log("item rejected",s),this.items.set(this.items().filter(P=>P._id!==o))}):console.error("workspaceId or apiKey is null")}reject(o){this.updateModeration(o,0)}approve(o){this.updateModeration(o,4)}highlight(o){this.updateModeration(o,5)}set _filter(o){this.filter.set(this.FILTERS[o])}get _filter(){return this.FILTERS.indexOf(this.filter())}fix_url(o){return o=o.replace("https://storage.googleapis.com/chronomaps3.firebasestorage.app/","https://storage.googleapis.com/chronomaps3-eu/"),o}fix_favorable_future(o){return o?(o=o.replace("preferred","prefer"),o==="yes"?"prefer":o==="no"?"prevent":o):"uncertain"}setPlausibility(o){let t=this.workspaceId(),e=this.apiKey();t&&e?(o.plausibility=parseInt(o.plausibility,10),this.api.updateItem(t,e,o._id,{plausibility:o.plausibility}).subscribe(n=>{console.log("item updated",n)})):console.error("workspaceId or apiKey is null")}setFavorable(o){let t=this.workspaceId(),e=this.apiKey();t&&e?this.api.updateItem(t,e,o._id,{favorable_future:o.favorable_future}).subscribe(n=>{console.log("item updated",n)}):console.error("workspaceId or apiKey is null")}setTagline(o){let t=this.workspaceId(),e=this.apiKey();t&&e&&this.api.updateItem(t,e,o._id,{future_scenario_tagline:o.future_scenario_tagline,future_scenario_description:o.future_scenario_tagline,embedding:null}).subscribe(n=>{console.log("item updated",n),this.editTagline.set(!1)})}static \u0275fac=function(t){return new(t||d)(k(A),k(q))};static \u0275cmp=K({type:d,selectors:[["app-moderate"]],decls:24,vars:9,consts:[[1,"creds"],[1,"input"],["type","text","placeholder","workspaceId",3,"ngModelChange","ngModel"],["type","text","placeholder","apiKey",3,"ngModelChange","ngModel"],[1,"pager"],[3,"click","disabled"],[1,"page-number"],[1,"filters"],[1,"filter",3,"ngModelChange","ngModel"],[3,"value"],[1,"index-link"],[1,"items"],["target","_blank",3,"href"],[1,"item"],[3,"src"],[1,"tagline-edit"],[1,"status"],[1,"status-text"],[1,"buttons"],[1,"button-row"],[1,"button",3,"click"],[1,"selects"],[3,"ngModelChange","change","ngModel"],["value","prefer"],["value","mostly prefer"],["value","mostly prevent"],["value","prevent"],["value","uncertain"],["type","text","placeholder","Tagline",3,"ngModelChange","ngModel"],[1,"tagline"],[1,"tagline",3,"click"]],template:function(t,e){if(t&1&&(i(0,"h1"),l(1),a(),i(2,"div",0)(3,"div",1)(4,"label"),l(5,"Workspace ID"),a(),i(6,"input",2),C("ngModelChange",function(s){return x(e.workspaceId,s)||(e.workspaceId=s),s}),a()(),i(7,"div",1)(8,"label"),l(9,"API Key"),a(),i(10,"input",3),C("ngModelChange",function(s){return x(e.apiKey,s)||(e.apiKey=s),s}),a()()(),i(11,"div",4)(12,"button",5),g("click",function(){return e.page.set(e.page()-1)}),l(13,"Prev Page"),a(),i(14,"div",6),l(15),a(),i(16,"button",5),g("click",function(){return e.page.set(e.page()+1)}),l(17,"Next Page"),a()(),i(18,"div",7)(19,"select",8),C("ngModelChange",function(s){return x(e._filter,s)||(e._filter=s),s}),I(20,Y,2,2,"option",9,L),a()(),y(22,G,3,1,"div",10)(23,ie,3,0,"div",11)),t&2){let n;r(),v((n=e.workspace())==null?null:n.source),r(5),f("ngModel",e.workspaceId),r(4),f("ngModel",e.apiKey),r(2),c("disabled",e.page()===0),r(3),V("Page ",e.page()+1," (",e.items().length," items)"),r(),c("disabled",!e.items().length),r(3),f("ngModel",e._filter),r(),T(e.FILTERS),r(2),w(e.indexLink()?22:23)}},dependencies:[D,N,$,B,z,j,R],styles:[`

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
  align-items: center;
  gap: 16px;
  padding: 16px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
[_nghost-%COMP%]   .creds[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  width: 100%;
}
[_nghost-%COMP%]   .creds[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  width: 40%;
}
[_nghost-%COMP%]   .creds[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 100%;
}
[_nghost-%COMP%]   .pager[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  gap: 16px;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 16px;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%] {
  width: 250px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Source Sans 3", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  border: 1px solid #4E02B2;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: #4E02B2;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .tagline[_ngcontent-%COMP%] {
  margin-top: auto;
  font-weight: 700;
  text-align: center;
  min-height: 50px;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .selects[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  width: 100%;
  overflow: hidden;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .selects[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  font-size: 11px;
  flex: 0 0 auto;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .tagline-edit[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  gap: 2px;
  width: 100%;
  overflow: hidden;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .tagline-edit[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  flex: 1 1 auto;
  width: 100%;
}
[_nghost-%COMP%]   .items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   .tagline-edit[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  flex: 0 0 auto;
}`]})};export{U as ModerateComponent};
/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/
