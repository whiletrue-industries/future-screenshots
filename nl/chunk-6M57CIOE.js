import{B as ac,C as yu,D as lc,a as Re,d as ei,x as rc,z as oc}from"./chunk-BXZUCJES.js";import{$ as ti,$a as jl,Aa as dr,B as Gl,Ba as an,C as Wl,Ca as Gi,Da as Ce,Fa as re,G as Xl,Ga as Kl,I as ki,Ia as Wi,Ja as Xi,Jb as tc,Ka as ht,La as yt,Ma as he,Mb as ec,N as Qn,Na as Pe,Qa as Bn,Qb as nc,R as ge,Sb as ic,Ta as ie,Ua as St,Xa as ws,Xb as sc,Y as Yt,Ya as Cs,Z as qt,Za as As,_ as Ke,_a as Jl,a as zt,b as mn,bb as Fe,ca as Yl,cb as fr,db as Ps,e as _u,f as vi,fa as zi,g as Q,ga as Es,ha as we,i as Un,ia as Vi,ja as Ft,na as ql,oa as Zl,q as Hl,qa as Pt,r as kl,sa as Sn,t as zl,ta as $l,ua as on,vb as Ql,x as gn,y as Vl,ya as Ge,yb as _e,z as ur,zb as ln}from"./chunk-NCFHF4AV.js";var cc=_u(yu());var xu=["qrcode"],pr=class s{constructor(t,e){this.el=t;this.platform=e;}url=we("");small=we(!1);codeSize=Ft(0);transform=_e(()=>`scale(${this.scale()})`);scale=_e(()=>{let t=this.mainEl();if(!t)return 1;let e=t.clientHeight/2/this.codeSize();return this.small()?e/5:e;});mainEl=Ft(null);qrCodeEl;ngAfterViewInit(){return Q(this,null,function*(){if(this.platform.browser()){this.mainEl.set(this.el.nativeElement);try{yield cc.default.toCanvas(this.qrCodeEl.nativeElement,this.url(),{scale:16,color:{light:"#FFFDF6",dark:"#4E02B2"}}),this.codeSize.set(this.qrCodeEl.nativeElement.height);}catch(t){console.error("Error generating QR code:",t);}}});}static ɵfac=function(e){return new(e||s)(Sn(Vi),Sn(ei));};static ɵcmp=on({type:s,selectors:[["app-qrcode"]],viewQuery:function(e,n){if(e&1&&ws(xu,7),e&2){let i;Cs(i=As())&&(n.qrCodeEl=i.first);}},inputs:{url:[1,"url"],small:[1,"small"]},decls:3,vars:4,consts:[["qrcode",""],[1,"qr-container"],[1,"qrcode"]],template:function(e,n){e&1&&(ht(0,"div",1),he(1,"canvas",2,0),yt()),e&2&&(Ce("small",n.small()),Pt(),Gi("transform",n.transform()));},styles:[`

[_nghost-%COMP%] {
  position: absolute;
  z-index: 2001;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
[_nghost-%COMP%]   .qr-container[_ngcontent-%COMP%] {
  display: flex;
  position: relative;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}
[_nghost-%COMP%]   .qr-container[_ngcontent-%COMP%]   .qrcode[_ngcontent-%COMP%] {
  transition: all 0.5s ease-in-out;
  transform-origin: center center;
  pointer-events: auto;
  cursor: pointer;
}
[_nghost-%COMP%]   .qr-container.small[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 20px;
  left: 20px;
  pointer-events: none;
}
[_nghost-%COMP%]   .qr-container.small[_ngcontent-%COMP%]   .qrcode[_ngcontent-%COMP%] {
  transform-origin: bottom left;
  pointer-events: auto;
  cursor: pointer;
}`]});};function bu(s,t){if(s&1){let e=Pe();ht(0,"div",1),ie("click",function(i){Yt(e);let r=St();return qt(r.onOverlayClick(i));}),ht(1,"div",2)(2,"button",3),ie("click",function(){Yt(e);let i=St();return qt(i.onClose());}),Ke(),ht(3,"svg",4),he(4,"path",5),yt()(),ti(),he(5,"iframe",6),yt()();}if(s&2){let e=St();Pt(5),an("src",e.iframeUrl(),Zl);}}var mr=class s{isOpen=we(!1);itemId=we(null);itemKey=we(null);workspaceId=we("");apiKey=we("");adminKey=we("");lang=we("");close=Es();metadataUpdated=Es();iframeUrl=Ft(null);platform=ge(ei);sanitizer=ge(ec);pollInterval;lastMetadata=new Map();constructor(){ln(()=>{let t=this.itemId(),e=this.itemKey(),n=this.workspaceId(),i=this.apiKey(),r=this.adminKey(),o=this.lang();if(t&&n){let a=r&&r!=="ADMIN_KEY_NOT_SET",c=e&&e!=="";if(!a&&!c){console.log("[SIDEBAR] No edit authorization (no admin_key or item_key), not loading iframe"),this.iframeUrl.set(null),this.stopPolling();return;}let l=new URLSearchParams({workspace:n,"item-id":t,sidebar:"true"});a&&l.set("api_key",r),c&&l.set("key",e);let h=o?`${o}/`:"",u=this.platform.browser()?window.location.host:"",d=u.startsWith("localhost")?`http://${u}/props?${l.toString()}`:`https://mapfutur.es/${h}props?${l.toString()}`,p=this.sanitizer.bypassSecurityTrustResourceUrl(d);this.iframeUrl.set(p),console.log("[SIDEBAR] Loading iframe with URL:",d),this.startPolling();}else this.iframeUrl.set(null),this.stopPolling();}),ln(()=>{this.isOpen()||this.stopPolling();});}startPolling(){}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null);}checkMetadataUpdates(){return Q(this,null,function*(){let t=this.itemId(),e=this.workspaceId(),n=this.adminKey();if(!(!t||!e||!n))try{let i=new URLSearchParams({workspace:e,api_key:n}),r=yield fetch(`https://api-qjzuw7ypfq-ez.a.run.app/items?${i.toString()}`);if(!r.ok){console.error("Failed to fetch items:",r.statusText);return;}let a=(yield r.json()).find(c=>c._id===t);if(a){let c={favorable_future:a.favorable_future,plausibility:a.plausibility},l=this.lastMetadata.get(t);l&&(l.favorable_future!==c.favorable_future||l.plausibility!==c.plausibility)&&(console.log("[SIDEBAR] Metadata changed for item",t,c),this.metadataUpdated.emit({itemId:t,metadata:c})),this.lastMetadata.set(t,c);}}catch(i){console.error("Error checking metadata updates:",i);}});}onClose(){this.close.emit();}onOverlayClick(t){t.target===t.currentTarget&&this.onClose();}ngOnDestroy(){this.stopPolling();}static ɵfac=function(e){return new(e||s)();};static ɵcmp=on({type:s,selectors:[["app-evaluation-sidebar"]],inputs:{isOpen:[1,"isOpen"],itemId:[1,"itemId"],itemKey:[1,"itemKey"],workspaceId:[1,"workspaceId"],apiKey:[1,"apiKey"],adminKey:[1,"adminKey"],lang:[1,"lang"]},outputs:{close:"close",metadataUpdated:"metadataUpdated"},decls:1,vars:1,consts:[[1,"sidebar-overlay"],[1,"sidebar-overlay",3,"click"],[1,"sidebar-container"],["title","Close (Esc)",1,"close-button",3,"click"],["viewBox","0 0 24 24",1,"close-icon"],["d","M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z","fill","currentColor"],["title","Item Evaluation","sandbox","allow-scripts allow-forms allow-popups allow-same-origin",1,"evaluation-iframe",3,"src"]],template:function(e,n){e&1&&Ge(0,bu,6,1,"div",0),e&2&&re(n.isOpen()&&n.iframeUrl()?0:-1);},styles:[`

.sidebar-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}
.sidebar-container[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: _ngcontent-%COMP%_slideIn 0.3s ease-out;
}
@keyframes _ngcontent-%COMP%_slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.close-button[_ngcontent-%COMP%] {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}
.close-button[_ngcontent-%COMP%]:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.close-button[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
.close-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  color: #333;
}
.evaluation-iframe[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  border: none;
  flex: 1;
}
@media (max-width: 768px) {
  .sidebar-container[_ngcontent-%COMP%] {
    max-width: 100%;
  }
}`]});};var gr=class s{_metadata;_currentPosition;_targetPosition;_mesh=null;_animationState;_animationStartTime=0;_properties=new Map();constructor(t,e={x:0,y:0,z:0}){this._metadata=zt({},t),this._currentPosition=zt({},e),this._targetPosition=zt({},e),this._animationState="spawning";}get id(){return this._metadata.id;}get url(){return this._metadata.url;}get thumbnailUrl(){return this._metadata.thumbnail_url||this._metadata.url;}get enhancedUrl(){return this._metadata.enhanced_url||this._metadata.url;}get metadata(){return zt({},this._metadata);}get currentPosition(){return zt({},this._currentPosition);}get targetPosition(){return zt({},this._targetPosition);}get mesh(){return this._mesh;}get animationState(){return this._animationState;}get animationStartTime(){return this._animationStartTime;}setCurrentPosition(t){this._currentPosition=zt({},t);}setTargetPosition(t){this._targetPosition=zt({},t);}setMesh(t){this._mesh=t;}setAnimationState(t){this._animationState=t,this._animationStartTime=performance.now();}isAtTarget(t=.1){let e=this._currentPosition.x-this._targetPosition.x,n=this._currentPosition.y-this._targetPosition.y,i=this._currentPosition.z-this._targetPosition.z;return Math.sqrt(e*e+n*n+i*i)<=t;}getAnimationProgress(t){let e=performance.now()-this._animationStartTime;return Math.min(1,Math.max(0,e/t));}lerpToTarget(t){let e=this._currentPosition,n=this._targetPosition;return{x:e.x+(n.x-e.x)*t,y:e.y+(n.y-e.y)*t,z:e.z+(n.z-e.z)*t};}setProperty(t,e){this._properties.set(t,e);}getProperty(t){return this._properties.get(t);}hasProperty(t){return this._properties.has(t);}removeProperty(t){return this._properties.delete(t);}updateMetadata(t){this._metadata=zt(zt({},this._metadata),t);}distanceTo(t){let e=this._currentPosition.x-t._currentPosition.x,n=this._currentPosition.y-t._currentPosition.y,i=this._currentPosition.z-t._currentPosition.z;return Math.sqrt(e*e+n*n+i*i);}clone(){let t=new s(this._metadata,this._currentPosition);return t._targetPosition=zt({},this._targetPosition),t._animationState=this._animationState,t._animationStartTime=this._animationStartTime,t._mesh=this._mesh,this._properties.forEach((e,n)=>{t._properties.set(n,e);}),t;}dispose(){this._mesh=null,this._properties.clear();}toString(){return`PhotoData(id: ${this.id}, pos: (${this._currentPosition.x.toFixed(1)}, ${this._currentPosition.y.toFixed(1)}, ${this._currentPosition.z.toFixed(1)}), state: ${this._animationState})`;}};function hc(){let s=1;return()=>(s=(1664525*s+1013904223)%4294967296)/4294967296;}function uc(s){return typeof s=="object"&&"length"in s?s:Array.from(s);}function dc(s,t){let e=s.length,n,i;for(;e;)i=t()*e--|0,n=s[e],s[e]=s[i],s[i]=n;return s;}function fc(s,t){for(var e=0,n=(s=dc(Array.from(s),t)).length,i=[],r,o;e<n;)r=s[e],o&&pc(o,r)?++e:(o=Su(i=Mu(i,r)),e=0);return o;}function Mu(s,t){var e,n;if(ya(t,s))return[t];for(e=0;e<s.length;++e)if(_r(t,s[e])&&ya(Is(s[e],t),s))return[s[e],t];for(e=0;e<s.length-1;++e)for(n=e+1;n<s.length;++n)if(_r(Is(s[e],s[n]),t)&&_r(Is(s[e],t),s[n])&&_r(Is(s[n],t),s[e])&&ya(mc(s[e],s[n],t),s))return[s[e],s[n],t];throw new Error();}function _r(s,t){var e=s.r-t.r,n=t.x-s.x,i=t.y-s.y;return e<0||e*e<n*n+i*i;}function pc(s,t){var e=s.r-t.r+Math.max(s.r,t.r,1)*1e-9,n=t.x-s.x,i=t.y-s.y;return e>0&&e*e>n*n+i*i;}function ya(s,t){for(var e=0;e<t.length;++e)if(!pc(s,t[e]))return!1;return!0;}function Su(s){switch(s.length){case 1:return Tu(s[0]);case 2:return Is(s[0],s[1]);case 3:return mc(s[0],s[1],s[2]);}}function Tu(s){return{x:s.x,y:s.y,r:s.r};}function Is(s,t){var e=s.x,n=s.y,i=s.r,r=t.x,o=t.y,a=t.r,c=r-e,l=o-n,h=a-i,u=Math.sqrt(c*c+l*l);return{x:(e+r+c/u*h)/2,y:(n+o+l/u*h)/2,r:(u+i+a)/2};}function mc(s,t,e){var n=s.x,i=s.y,r=s.r,o=t.x,a=t.y,c=t.r,l=e.x,h=e.y,u=e.r,d=n-o,p=n-l,g=i-a,_=i-h,m=c-r,f=u-r,T=n*n+i*i-r*r,S=T-o*o-a*a+c*c,x=T-l*l-h*h+u*u,C=p*g-d*_,A=(g*x-_*S)/(C*2)-n,R=(_*m-g*f)/C,O=(p*S-d*x)/(C*2)-i,M=(d*f-p*m)/C,b=R*R+M*M-1,w=2*(r+A*R+O*M),z=A*A+O*O-r*r,H=-(Math.abs(b)>1e-6?(w+Math.sqrt(w*w-4*b*z))/(2*b):z/w);return{x:n+A+R*H,y:i+O+M*H,r:H};}function gc(s,t,e){var n=s.x-t.x,i,r,o=s.y-t.y,a,c,l=n*n+o*o;l?(r=t.r+e.r,r*=r,c=s.r+e.r,c*=c,r>c?(i=(l+c-r)/(2*l),a=Math.sqrt(Math.max(0,c/l-i*i)),e.x=s.x-i*n-a*o,e.y=s.y-i*o+a*n):(i=(l+r-c)/(2*l),a=Math.sqrt(Math.max(0,r/l-i*i)),e.x=t.x+i*n-a*o,e.y=t.y+i*o+a*n)):(e.x=t.x+e.r,e.y=t.y);}function _c(s,t){var e=s.r+t.r-1e-6,n=t.x-s.x,i=t.y-s.y;return e>0&&e*e>n*n+i*i;}function yc(s){var t=s._,e=s.next._,n=t.r+e.r,i=(t.x*e.r+e.x*t.r)/n,r=(t.y*e.r+e.y*t.r)/n;return i*i+r*r;}function yr(s){this._=s,this.next=null,this.previous=null;}function Eu(s,t){if(!(r=(s=uc(s)).length))return 0;var e,n,i,r,o,a,c,l,h,u,d;if(e=s[0],e.x=0,e.y=0,!(r>1))return e.r;if(n=s[1],e.x=-n.r,n.x=e.r,n.y=0,!(r>2))return e.r+n.r;gc(n,e,i=s[2]),e=new yr(e),n=new yr(n),i=new yr(i),e.next=i.previous=n,n.next=e.previous=i,i.next=n.previous=e;t:for(c=3;c<r;++c){gc(e._,n._,i=s[c]),i=new yr(i),l=n.next,h=e.previous,u=n._.r,d=e._.r;do if(u<=d){if(_c(l._,i._)){n=l,e.next=n,n.previous=e,--c;continue t;}u+=l._.r,l=l.next;}else{if(_c(h._,i._)){e=h,e.next=n,n.previous=e,--c;continue t;}d+=h._.r,h=h.previous;}while(l!==h.next);for(i.previous=e,i.next=n,e.next=n.previous=n=i,o=yc(e);(i=i.next)!==n;)(a=yc(i))<o&&(e=i,o=a);n=e.next;}for(e=[n._],i=n;(i=i.next)!==n;)e.push(i._);for(i=fc(e,t),c=0;c<r;++c)e=s[c],e.x-=i.x,e.y-=i.y;return i.r;}function va(s){return Eu(s,hc()),s;}var Tn=class{isInitialized=!1;photos=[];initialize(t){return Q(this,null,function*(){this.isInitialized=!0;});}dispose(){return Q(this,null,function*(){this.photos=[],this.isInitialized=!1;});}addPhoto(t){this.photos.push(t);}removePhoto(t){let e=this.photos.findIndex(n=>n.id===t);return e>=0?(this.photos.splice(e,1),!0):!1;}getPhotos(){return[...this.photos];}getPhoto(t){return this.photos.find(e=>e.id===t);}requiresFullRecalculationOnAdd(){return!1;}calculateLayoutBounds(t,e,n){let i=t.filter(u=>u!==null);if(i.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let r=e*.5,o=n*.5,a=1/0,c=-1/0,l=1/0,h=-1/0;for(let u of i)a=Math.min(a,u.x-r),c=Math.max(c,u.x+r),l=Math.min(l,u.y-o),h=Math.max(h,u.y+o);return{minX:a,maxX:c,minY:l,maxY:h};}validateInitialized(){if(!this.isInitialized)throw new Error(`${this.getConfiguration().name} layout strategy is not initialized`);}};var Nt={PHOTO_WIDTH:530,PHOTO_HEIGHT:1e3,SPACING_X:250,SPACING_Y:30,MAX_TEXTURE_DIMENSION:200,MAX_TEXTURE_DIMENSION_MOBILE:150};var ni=class s extends Tn{photoWidth;photoHeight;spacingX;spacingY;photoRadius;groupBuffer;photoBuffer;groupByFn;photoGroups=new Map();groupPositions=new Map();hexPositionCache=new Map();constructor(t={}){super(),this.photoWidth=t.photoWidth??Nt.PHOTO_WIDTH,this.photoHeight=t.photoHeight??Nt.PHOTO_HEIGHT,this.spacingX=t.spacingX??Nt.SPACING_X,this.spacingY=t.spacingY??Nt.SPACING_Y,this.groupBuffer=t.groupBuffer??2e3,this.photoBuffer=t.photoBuffer??50,this.groupByFn=t.groupBy??this.defaultGroupBy.bind(this),this.photoRadius=Math.sqrt(this.photoWidth**2+this.photoHeight**2)/2+this.photoBuffer;}calculateEvaluationScore(t){let e=t.metadata.plausibility,n=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future;if(typeof e!="number"||!isFinite(e)||!n||typeof n!="string")return 0;let i=e/100,r=n.toLowerCase().trim(),o=r==="favor"||r==="favorable"||r==="prefer"||r==="preferred",a=1-i,c=o?a:-a;return isFinite(c)?c:0;}getConfiguration(){return{name:"circle-packing",displayName:"Circle Packing Layout",description:"Groups photos by author in hierarchical circle packing arrangement",supportsInteraction:!1,requiresWebService:!1,settings:{photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY,groupBuffer:this.groupBuffer,photoBuffer:this.photoBuffer}};}addPhoto(t){let e=this.getGroupId(t);this.photoGroups.has(e)||this.photoGroups.set(e,[]),this.photoGroups.get(e).push(t);}removePhoto(t){for(let[e,n]of this.photoGroups.entries()){let i=n.findIndex(r=>r.id===t);if(i!==-1)return n.splice(i,1),n.length===0&&this.photoGroups.delete(e),this.recalculateLayout(),!0;}return!1;}getPositionForPhoto(t,e){return Q(this,null,function*(){return this.regroupAllPhotos(e),this.getPositionForPhotoOptimized(t);});}getPositionForPhotoOptimized(t){return Q(this,null,function*(){let e=this.getGroupId(t),n=this.groupPositions.get(e);if(!n)return console.warn(`No group position found for photo ${t.id} in group ${e}`),null;let i=this.photoGroups.get(e)||[],r=i.findIndex(a=>a.id===t.id);if(r===-1)return console.warn(`Photo ${t.id} not found in group ${e}`),null;let o=this.computeHexPositions(i.length)[r]??{x:0,y:0};return{x:n.x+o.x,y:n.y+o.y,metadata:{groupId:e,groupSize:i.length,photoIndex:r,groupPosition:{x:n.x,y:n.y,radius:n.radius},circlePackKey:`circle-pack-${e}-${r}`,renderOrder:r}};});}calculateAllPositions(t){return Q(this,null,function*(){this.photoGroups.clear();for(let n of t){let i=this.getGroupId(n);this.photoGroups.has(i)||this.photoGroups.set(i,[]),this.photoGroups.get(i).push(n);}for(let n of this.photoGroups.values())n.sort((i,r)=>{let o=this.calculateEvaluationScore(i);return this.calculateEvaluationScore(r)-o;});this.recalculateLayout();let e=[];for(let n of t){let i=yield this.getPositionForPhotoOptimized(n);e.push(i);}return e;});}getGroupId(t){return this.groupByFn(t);}defaultGroupBy(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_circle_pack_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_circle_pack_group_id",n)),`random:${n}`;}regroupAllPhotos(t){this.photoGroups.clear();for(let e of t){let n=this.getGroupId(e);this.photoGroups.has(n)||this.photoGroups.set(n,[]),this.photoGroups.get(n).push(e);}for(let[e,n]of this.photoGroups.entries())n.sort((i,r)=>{let o=this.calculateEvaluationScore(i);return this.calculateEvaluationScore(r)-o;});this.recalculateLayout();}recalculateLayout(){let e=Array.from(this.photoGroups.entries()).sort(([i,r],[o,a])=>a.length!==r.length?a.length-r.length:i.localeCompare(o)).map(([i,r])=>{let o=this.calculateGroupRadius(r.length);return{id:i,radius:o,x:0,y:0};}),n=this.packCircles(e,this.groupBuffer);this.groupPositions.clear();for(let i of n){if(!isFinite(i.x)||!isFinite(i.y)||!isFinite(i.radius)){this.groupPositions.set(i.id,{x:0,y:0,radius:i.radius||1e3});continue;}this.groupPositions.set(i.id,{x:i.x,y:i.y,radius:i.radius});}}computeHexPositions(t){if(t<=0)return[];let e=this.hexPositionCache.get(t);if(e)return e;let n=this.photoWidth+this.photoBuffer,i=this.photoHeight+this.photoBuffer,r=Math.ceil(Math.sqrt(t/3))+2,o=[];for(let c=-r;c<=r;c++)for(let l=-r;l<=r;l++){let h=l*n+Math.abs(c)%2*(n/2),u=c*i;o.push({x:h,y:u,distSq:h*h+u*u});}o.sort((c,l)=>c.distSq-l.distSq||c.x-l.x||c.y-l.y);let a=o.slice(0,t).map(({x:c,y:l})=>({x:c,y:l}));return this.hexPositionCache.set(t,a),a;}calculateGroupRadius(t){if(t<=0)return this.photoRadius;let n=this.computeHexPositions(t).reduce((i,r)=>Math.max(i,r.x*r.x+r.y*r.y),0);return Math.sqrt(n)+this.photoRadius;}packCircles(t,e=0){if(t.length===0)return[];let n=t.map(i=>mn(zt({},i),{r:i.radius+e/2}));return va(n),t.map((i,r)=>mn(zt({},i),{x:n[r].x??0,y:n[r].y??0}));}getLayoutBounds(){return Q(this,null,function*(){if(this.groupPositions.size===0)return{width:this.photoWidth*2,height:this.photoHeight*2};let t=1/0,e=-1/0,n=1/0,i=-1/0;for(let r of this.groupPositions.values()){let o=r.x-r.radius,a=r.x+r.radius,c=r.y-r.radius,l=r.y+r.radius;t=Math.min(t,o),e=Math.max(e,a),n=Math.min(n,c),i=Math.max(i,l);}return{width:e-t+this.groupBuffer*2,height:i-n+this.groupBuffer*2};});}dispose(){return Q(this,null,function*(){for(let t of this.photoGroups.values())for(let e of t)e.setProperty("_circle_pack_group_id",void 0);this.photoGroups.clear(),this.groupPositions.clear(),this.hexPositionCache.clear(),yield vi(s.prototype,this,"dispose").call(this);});}requiresFullRecalculationOnAdd(){return!0;}getPackingInfo(){let t=Array.from(this.photoGroups.entries()).map(([e,n])=>({groupId:e,photoCount:n.length,position:this.groupPositions.get(e)||{x:0,y:0,radius:0}}));return{totalGroups:this.photoGroups.size,totalPhotos:Array.from(this.photoGroups.values()).reduce((e,n)=>e+n.length,0),groups:t};}};var wu=6,Cu=.9,vc=1.122,xc=1.1,vr=class extends Tn{photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;positionCache=new Map();themeLabelCache=new Map();subThemeLabelCache=new Map();useCirclePacking;innerCirclePacking;constructor(t={}){super(),this.photoWidth=t.photoWidth??Nt.PHOTO_WIDTH,this.photoHeight=t.photoHeight??Nt.PHOTO_HEIGHT,this.spacingX=t.spacingX??Nt.SPACING_X,this.spacingY=t.spacingY??Nt.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY,this.useCirclePacking=t.useCirclePacking??!0,this.useCirclePacking?this.innerCirclePacking=new ni({photoWidth:this.photoWidth,photoHeight:this.photoHeight,photoBuffer:Math.round(Math.min(this.spacingX,this.spacingY)/2),groupBuffer:Math.max(this.cellW,this.cellH)*2,groupBy:e=>this.primaryTopicFor(e)}):this.innerCirclePacking=null;}getConfiguration(){return{name:"tsne",displayName:"Thematic Layout",description:"Groups photos by taxonomy theme and sub-topic",supportsInteraction:!1,requiresWebService:!1,settings:{}};}getPositionForPhoto(t,e){return Q(this,null,function*(){let n=this.positionCache.get(t.id);return n?{x:n.x,y:n.y,gridKey:`taxonomy-${t.id}`}:null;});}calculateAllPositions(t){return Q(this,null,function*(){return this.useCirclePacking&&this.innerCirclePacking?this.calculateCirclePackingPositions(t):this.calculateForceDirectedPositions(t);});}calculateCirclePackingPositions(t){return Q(this,null,function*(){let e=this.innerCirclePacking,n=yield e.calculateAllPositions(t),{groups:i}=e.getPackingInfo();this.subThemeLabelCache.clear();let r=new Map();for(let o of i){this.subThemeLabelCache.set(o.groupId,{id:o.groupId,worldX:o.position.x,worldY:o.position.y,itemCount:o.photoCount});let a=o.groupId.split("/")[0]||"__unthemed",c=r.get(a)??{sumX:0,sumY:0,n:0,total:0};c.sumX+=o.position.x,c.sumY+=o.position.y,c.n++,c.total+=o.photoCount,r.set(a,c);}this.themeLabelCache.clear();for(let[o,a]of r)this.themeLabelCache.set(o,{id:o,worldX:a.sumX/a.n,worldY:a.sumY/a.n,itemCount:a.total});this.positionCache.clear();for(let o=0;o<t.length;o++){let a=n[o];a&&this.positionCache.set(t[o].id,{x:a.x,y:a.y});}return n;});}calculateForceDirectedPositions(t){return Q(this,null,function*(){let e=t.map(c=>this.createNode(c)),{themeNodes:n,subThemeNodes:i,themeGroups:r,subThemeGroups:o}=this.createLabelNodes(e);this.linkPhotosToLabelNodes(e,n,i),this.layoutThemeNodes(n),this.layoutSubThemeNodes(n,i,o),this.layoutPhotosAsHexbin(o),this.flattenPhotosToGlobalHexGrid(e,i),this.centerAllNodes(e,n,i),this.positionCache.clear(),this.themeLabelCache.clear(),this.subThemeLabelCache.clear();for(let c of n)this.themeLabelCache.set(c.id,{id:c.id,worldX:c.x,worldY:c.y,itemCount:c.itemCount});for(let c of i)this.subThemeLabelCache.set(c.id,{id:c.id,worldX:c.x,worldY:c.y,itemCount:c.itemCount});return e.map(c=>{let l={x:c.x,y:c.y};return this.positionCache.set(c.photo.id,l),{x:l.x,y:l.y,gridKey:`taxonomy-${c.photo.id}`};});});}getThemeLabelNodes(){return[...this.themeLabelCache.values()];}getSubThemeLabelNodes(){return[...this.subThemeLabelCache.values()];}getWorldPositionForId(t){return this.positionCache.get(t)??null;}getClustersWithWorldCoords(){return[];}createNode(t){let e=this.extractTopics(t),n=new Set([...e].map(h=>h.split("/")[0])),i=[...e][0]??null,r=i?i.split("/")[0]:null,o=this.hashToUnit(r??"unthemed")*Math.PI*2,a=Math.max(this.cellW,this.cellH)*1.8,c=Math.max(this.cellW,this.cellH)*(.4+this.hashToUnit(t.id+"-r")*.8),l=this.hashToUnit(t.id+"-a")*Math.PI*2;return{photo:t,topics:e,themes:n,primaryTopic:i,primaryTheme:r,themeNodes:[],subThemeNodes:[],x:Math.cos(o)*a+Math.cos(l)*c,y:Math.sin(o)*a+Math.sin(l)*c,vx:0,vy:0};}primaryTopicFor(t){let[e]=this.extractTopics(t);return e??"__untopiced";}extractTopics(t){let e=t.metadata.topics,n=Array.isArray(e)?e:[];return new Set(n.map(i=>String(i||"").trim()).filter(i=>i.length>0));}centerAllNodes(t,e,n){let i=[...t,...e,...n];if(i.length===0)return;let r=1/0,o=1/0,a=-1/0,c=-1/0;for(let u of i)u.x<r&&(r=u.x),u.y<o&&(o=u.y),u.x>a&&(a=u.x),u.y>c&&(c=u.y);let l=(r+a)/2,h=(o+c)/2;for(let u of i)u.x-=l,u.y-=h;}createLabelNodes(t){let e=new Map(),n=new Map(),i=new Map(),r=new Map();for(let c of t){let l=c.primaryTheme??"__unthemed",h=c.primaryTopic??`${l}/__untopiced`;e.set(l,(e.get(l)??0)+1),n.set(h,(n.get(h)??0)+1),i.has(l)||i.set(l,[]),r.has(h)||r.set(h,[]),i.get(l).push(c),r.get(h).push(c);}let o=[...e.entries()].map(([c,l])=>({id:c,themeId:c,itemCount:l,x:0,y:0,vx:0,vy:0})),a=[...n.entries()].map(([c,l])=>{let h=c.split("/")[0]||"__unthemed";return{id:c,themeId:h,itemCount:l,x:0,y:0,vx:0,vy:0};});return{themeNodes:o,subThemeNodes:a,themeGroups:i,subThemeGroups:r};}layoutThemeNodes(t){let e=Math.max(this.cellW,this.cellH)*wu,n=[...t].sort((r,o)=>o.itemCount-r.itemCount||r.id.localeCompare(o.id)),i=this.generateHexSpiralCoords(n.length);for(let r=0;r<n.length;r++){let o=i[r];n[r].x=(o.q+o.r*.5)*e,n[r].y=o.r*e*.9;}}layoutSubThemeNodes(t,e,n){let i=new Map(t.map(c=>[c.id,c])),r=new Map();for(let c of e){let l=c.themeId??"__unthemed";r.has(l)||r.set(l,[]),r.get(l).push(c);}let o=Math.max(this.cellW,this.cellH)*.65,a=Math.max(this.cellW,this.cellH)*Cu;for(let[c,l]of r.entries()){let h=i.get(c);if(!h)continue;let u=[],d=[...l].sort((p,g)=>g.itemCount-p.itemCount||p.id.localeCompare(g.id));for(let p of d){let g=(n.get(p.id)?.length??p.itemCount)+1,m=(this.hexRingsForCount(g)+1)*o,f=this.findNonOverlappingPlacement(h.x,h.y,m,u,a,p.id);p.x=f.x,p.y=f.y,u.push({x:p.x,y:p.y,radius:m});}}}layoutPhotosAsHexbin(t){let e=this.cellW*vc,n=this.cellH*xc;for(let[i,r]of t.entries()){if(r.length===0)continue;let o=r[0].subThemeNodes[0]??r[0].themeNodes[0]??null;if(!o)continue;let a=[...r].sort((l,h)=>l.photo.id.localeCompare(h.photo.id)),c=this.generateHexSpiralCoords(a.length+1).slice(1);for(let l=0;l<a.length;l++){let h=c[l];a[l].x=o.x+(h.q+h.r*.5)*e,a[l].y=o.y+h.r*n;}}}flattenPhotosToGlobalHexGrid(t,e){let n=this.cellW*vc,i=this.cellH*xc,r=new Set();for(let a of e){let c=this.roundAxial(a.x/n-a.y/i*.5,a.y/i);r.add(this.hexKey(c.q,c.r));}let o=[...t].sort((a,c)=>{let l=(a.primaryTopic??"").localeCompare(c.primaryTopic??"");return l!==0?l:a.photo.id.localeCompare(c.photo.id);});for(let a of o){let c=this.roundAxial(a.x/n-a.y/i*.5,a.y/i),l=this.findNearestFreeHex(c.q,c.r,r);a.x=(l.q+l.r*.5)*n,a.y=l.r*i,r.add(this.hexKey(l.q,l.r));}}findNonOverlappingPlacement(t,e,n,i,r,o){if(i.length===0)return{x:t,y:e};let a=Math.max(this.cellW,this.cellH)*1.1,c=this.hashToUnit(`placement-${o}`)*Math.PI*2;for(let l=1;l<80;l++){let h=Math.max(6,l*12),u=l*a;for(let d=0;d<h;d++){let p=c+Math.PI*2*d/h,g=t+Math.cos(p)*u,_=e+Math.sin(p)*u;if(!i.some(f=>{let T=g-f.x,S=_-f.y,x=n+f.radius+r;return T*T+S*S<x*x;}))return{x:g,y:_};}}return{x:t,y:e};}hexRingsForCount(t){if(t<=1)return 0;let e=0,n=1;for(;n<t;)e+=1,n+=e*6;return e;}findNearestFreeHex(t,e,n){for(let i of this.generateHexSpiralCoords(2e3)){let r={q:t+i.q,r:e+i.r};if(!n.has(this.hexKey(r.q,r.r)))return r;}return{q:t,r:e};}roundAxial(t,e){let n=t,i=e,r=-n-i,o=Math.round(n),a=Math.round(r),c=Math.round(i),l=Math.abs(o-n),h=Math.abs(a-r),u=Math.abs(c-i);return l>h&&l>u?o=-a-c:h>u?a=-o-c:c=-o-a,{q:o,r:c};}hexKey(t,e){return`${t},${e}`;}generateHexSpiralCoords(t){if(t<=0)return[];let e=[{q:0,r:0}];if(t===1)return e;let n=[{dq:1,dr:0},{dq:1,dr:-1},{dq:0,dr:-1},{dq:-1,dr:0},{dq:-1,dr:1},{dq:0,dr:1}],i=1;for(;e.length<t;){let r=-i,o=i;for(let a=0;a<n.length&&e.length<t;a++){let{dq:c,dr:l}=n[a];for(let h=0;h<i&&e.length<t;h++)e.push({q:r,r:o}),r+=c,o+=l;}i+=1;}return e;}linkPhotosToLabelNodes(t,e,n){let i=new Map(e.map(o=>[o.id,o])),r=new Map(n.map(o=>[o.id,o]));for(let o of t)o.themeNodes=[...o.themes].map(a=>i.get(a)).filter(a=>!!a),o.subThemeNodes=[...o.topics].map(a=>r.get(a)).filter(a=>!!a);}hashToUnit(t){let e=2166136261;for(let i=0;i<t.length;i++)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967295;}};var xr=class s extends Tn{svgElement=null;svgContainer=null;hotspots=[];photoPositions=new Map();draggedPhoto=null;isDragging=!1;hotspotPhotoCount=new Map();photoHotspotMap=new Map();photoSizes=new Map();batchPositionedPhotos=new Map();MAX_OVERLAP_PERCENT=10;PHOTO_WIDTH=120;PHOTO_HEIGHT=120;hotspotSlots=new Map();options={svgPath:"/showcase-bg.svg",centerX:0,centerY:0,circleRadius:2e4,radiusVariation:4e3,useProportionalLayout:!0,svgOffsetX:0,svgOffsetY:0,onHotspotDrop:()=>Q(null,null,function*(){})};constructor(t){super(),t&&(this.options=zt(zt({},this.options),t));}calculateEvaluationRotationDeg(t){let e=t.metadata.plausibility,n=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future;if(typeof e!="number"||!isFinite(e)||!n||typeof n!="string")return 0;let r=(1-e/100)*32,o=n.toLowerCase().trim(),c=o==="favor"||o==="favorable"||o==="prefer"||o==="preferred"?r:-r;return isFinite(c)?c:0;}calculateEvaluationScore(t){return this.calculateEvaluationRotationDeg(t)/32;}getConfiguration(){return{name:"svg-background",displayName:"SVG Background",description:"Interactive layout with SVG background and proportional group-based circle slicing",supportsInteraction:!0,requiresWebService:!1,settings:{svgPath:this.options.svgPath,centerX:this.options.centerX,centerY:this.options.centerY,circleRadius:this.options.circleRadius,radiusVariation:this.options.radiusVariation,useProportionalLayout:this.options.useProportionalLayout}};}getSvgBounds(){return{minX:this.options.svgOffsetX-this.options.circleRadius,maxX:this.options.svgOffsetX+this.options.circleRadius,minY:this.options.svgOffsetY-this.options.circleRadius,maxY:this.options.svgOffsetY+this.options.circleRadius};}initialize(t){return Q(this,null,function*(){yield vi(s.prototype,this,"initialize").call(this,t),t&&(this.options=zt(zt({},this.options),t)),yield this.loadSvgBackground(),this.extractHotspots();});}dispose(){return Q(this,null,function*(){yield vi(s.prototype,this,"dispose").call(this),this.svgContainer&&this.svgContainer.parentNode&&this.svgContainer.parentNode.removeChild(this.svgContainer),this.svgContainer=null,this.svgElement=null,this.hotspots=[],this.photoPositions.clear(),this.draggedPhoto=null,this.isDragging=!1,this.hotspotPhotoCount.clear(),this.photoHotspotMap.clear(),this.photoSizes.clear();});}loadSvgBackground(){return Q(this,null,function*(){if(!(typeof fetch>"u"||typeof document>"u"))try{let t=yield fetch(this.options.svgPath);if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);let e=yield t.text(),i=new DOMParser().parseFromString(e,"image/svg+xml");this.svgElement=i.documentElement;}catch(t){throw console.error("\u274C Failed to load SVG background:",t),new Error(`Failed to load SVG background from ${this.options.svgPath}`);}});}extractHotspots(){if(!(typeof document>"u")){if(!this.svgElement){console.warn("SVG element not loaded, cannot extract hotspots");return;}this.hotspots=[],this.svgContainer||(this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.visibility="hidden",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.top="-9999px",this.svgContainer.style.left="-9999px",document.body.appendChild(this.svgContainer)),this.svgContainer.appendChild(this.svgElement);try{this.svgElement.querySelectorAll('[id^="s-"]').forEach(e=>{let n=e,i=n.id,r=this.parseGroupIdMetadata(i);if(!r)return;let o=n.querySelector('[id^="hit"]');if(!o){console.warn(`No hit element found in group ${i}`);return;}let a=Array.from(o.querySelectorAll("path")).find(h=>h.id.startsWith(r.transition_bar_position));if(!a){console.warn(`No path element found starting with '${r.transition_bar_position}' in hit element of group ${i}`);return;}let c=a.getBBox();(c.width===0||c.height===0)&&console.error(`[SVG-HOTSPOT] ZERO-SIZE bbox at initialization for ${i}:`,{elementId:a.id,elementTag:a.tagName,bbox:{x:c.x,y:c.y,width:c.width,height:c.height},inDOM:document.contains(a),parentId:a.parentElement?.id,svg:this.svgElement?"exists":"null"});let l={id:o.id,bounds:{x:c.x,y:c.y,width:c.width,height:c.height},parentGroupId:i,transitionBarPosition:r.transition_bar_position,element:a};this.hotspots.push(l);});}catch(t){console.error("[HOTSPOT-EXTRACT] Error extracting hotspots:",t);}}}getPositionForPhoto(t,e,n){return Q(this,null,function*(){let i=n?.enableAutoPositioning??!1;this.validateInitialized();let r=t.metadata.width||this.PHOTO_WIDTH,o=t.metadata.height||this.PHOTO_HEIGHT;this.photoSizes.set(t.id,{width:r,height:o});let a=this.photoPositions.get(t.id);if(a)return a;let c,l=t.metadata.layout_x,h=t.metadata.layout_y;if(typeof l=="number"&&typeof h=="number"){let{x:u,y:d}=this.normalizedToWorld(l,h);c={x:u,y:d,metadata:{layoutType:"restored-normalized",layout_x:l,layout_y:h,circleRadius:this.options.circleRadius}};}else if(i){let u=this.getAutoPositionFromMetadata(t);if(u){let d=u.auto_x*this.options.circleRadius+this.options.svgOffsetX,p=u.auto_y*this.options.circleRadius+this.options.svgOffsetY;c={x:d,y:p,metadata:{layoutType:"auto-positioned",auto_x:u.auto_x,auto_y:u.auto_y,circleRadius:this.options.circleRadius,svgOffsetX:this.options.svgOffsetX,svgOffsetY:this.options.svgOffsetY}};}else c=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition();}else c=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition();return this.photoPositions.set(t.id,c),c;});}calculateAllPositions(t,e){return Q(this,null,function*(){let n=e?.enableAutoPositioning??!1;this.validateInitialized(),this.hotspotPhotoCount.clear(),this.batchPositionedPhotos.clear();let i=new Map();for(let[o,a]of this.photoPositions.entries())(a.metadata?.layoutType==="free-dragged"||a.metadata?.layoutType==="dragging")&&i.set(o,a);this.photoPositions.clear();for(let[o,a]of i.entries())this.photoPositions.set(o,a);let r=[];for(let o of t){let a=yield this.getPositionForPhoto(o,t,{enableAutoPositioning:n});r.push(a);}return r;});}generateRandomCircularPosition(){let t=Math.random()*2*Math.PI,e=(Math.random()-.5)*2*this.options.radiusVariation,n=this.options.circleRadius+e,i=this.options.centerX+Math.cos(t)*n,r=this.options.centerY+Math.sin(t)*n;return{x:i,y:r,metadata:{angle:t,radius:n,layoutType:"circular"}};}generateProportionalCircularPosition(t,e){let n=this.getPhotoGroupId(t),i=this.groupPhotosByGroupId(e),o=this.calculateGroupSlices(i).get(n);if(!o)return this.generateRandomCircularPosition();let a=i.get(n)||[],c=a.findIndex(A=>A.id===t.id),l=a.length,u=(o.endAngle-o.startAngle)*(1-.5),d=(o.startAngle+o.endAngle)/2,p;if(l===1)p=d;else{let A=u/l;p=d-u/2+(c+.5)*A;}let g=this.hashCode(t.id)/2147483647,_=this.options.radiusVariation*.8,m=g*_,f=Math.min(l/10,.5),T=(c/l-.5)*f*this.options.radiusVariation*.3,S=this.options.circleRadius+m+T,x=this.options.centerX+Math.cos(p)*S*.75,C=this.options.centerY+Math.sin(p)*S;if(x<this.options.centerX){let A=this.options.centerX-x;x=this.options.centerX+A-.4*this.options.circleRadius;}else x=x-this.options.circleRadius+.4*this.options.circleRadius;return{x,y:C,metadata:{angle:p,radius:S,groupId:n,groupSlice:o,photoIndex:c,totalInGroup:l,radiusVariation:m,packingVariation:T,layoutType:"proportional-circular"}};}getPhotoGroupId(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_svg_background_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_svg_background_group_id",n)),`random:${n}`;}groupPhotosByGroupId(t){let e=new Map();for(let n of t){let i=this.getPhotoGroupId(n);e.has(i)||e.set(i,[]),e.get(i).push(n);}return e;}calculateGroupSlices(t){let e=Array.from(t.values()).reduce((a,c)=>a+c.length,0),n=new Map();if(e===0)return n;let i=Array.from(t.entries()).sort(([a,c],[l,h])=>h.length!==c.length?h.length-c.length:a.localeCompare(l)),r=0,o=2*Math.PI;for(let[a,c]of i){let l=c.length,h=l/e,u=l/e*o,d=r+u;n.set(a,{startAngle:r,endAngle:d,size:l}),r=d;}return n;}hashCode(t){let e=0;if(t.length===0)return e;for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);e=(e<<5)-e+i,e=e&e;}return e;}getDropZones(){return this.hotspots.map(t=>({id:t.id,bounds:t.bounds,hotspot:t,acceptsPhoto:()=>!0,onPhotoDrop:e=>Q(this,null,function*(){})}));}onPhotoDragStart(t,e){return this.draggedPhoto=t,this.isDragging=!0,!0;}onPhotoDragMove(t,e){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return;let{layout_x:n,layout_y:i}=this.worldToNormalized(e.x,e.y),r={x:e.x,y:e.y,metadata:{layoutType:"dragging",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};this.photoPositions.set(t.id,r);}onPhotoDragEnd(t,e){return Q(this,null,function*(){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return!1;if(this.isDragging=!1,this.draggedPhoto=null,this.isOutOfBounds(e))return this.photoPositions.delete(t.id),!1;let{layout_x:n,layout_y:i}=this.worldToNormalized(e.x,e.y),r={x:e.x,y:e.y,metadata:{layoutType:"free-dragged",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};return this.photoPositions.set(t.id,r),t.updateMetadata({layout_x:n,layout_y:i}),!0;});}isOutOfBounds(t){let e=t.x-this.options.svgOffsetX,n=t.y-this.options.svgOffsetY;return Math.sqrt(e*e+n*n)>this.options.circleRadius;}getSvgElement(){return this.svgElement;}getHotspots(){return[...this.hotspots];}getPhotoPosition(t){return this.photoPositions.get(t)||null;}setPhotoPosition(t,e){this.photoPositions.set(t,e);}getAutoPositionFromMetadata(t){let e=t.metadata,n=e.plausibility,i=this.normalizeFavorableFuture(e._svgZoneFavorableFuture||e.favorable_future),r=this.normalizeTransitionBar(e.transition_bar_position),o=this.normalizePlausibility(n);if(!r&&o!==null&&i&&(r="during"),o===null||!i||!r)return null;for(let a of this.hotspots){let c=a.parentGroupId;if(!c.startsWith("s-"))continue;let l=this.parseGroupIdMetadata(c);if(!l)continue;let h=this.normalizeFavorableFuture(l.favorable_future),u=this.normalizeTransitionBar(l.transition_bar_position),d=this.normalizePlausibility(l.plausibility);if(d!==null&&d===o&&h===i&&u===r){this.photoHotspotMap.set(t.id,a);let p=a.element?.id||"path",g=`${c}:${u}:${p}`,_=this.hotspotPhotoCount.get(g)||0;return this.hotspotPhotoCount.set(g,_+1),this.distributePhotoInHotspot(a,_);}}return null;}distributePhotoInHotspot(t,e){let n=this.getSvgViewBox();if(!n)return console.warn("No SVG viewBox found, using default distribution"),{auto_x:0,auto_y:0};let i=this.getSlotsForHotspot(t,n);if(i.length===0){console.warn(`[AUTO-POS] No valid positions found in path for ${t.parentGroupId} (bounds=${t.bounds.width.toFixed(1)}x${t.bounds.height.toFixed(1)}), using center`);let d=t.bounds.x+t.bounds.width/2,p=t.bounds.y+t.bounds.height/2,g=(d-n.width/2)/(n.width/2),_=-((p-n.height/2)/(n.height/2));return{auto_x:g,auto_y:_};}let r=i,o=t.element?.id||"path",a=`${t.parentGroupId}:${t.transitionBarPosition}:${o}`;this.batchPositionedPhotos.has(a)||this.batchPositionedPhotos.set(a,[]);let c=this.batchPositionedPhotos.get(a),l=12,h=d=>c.some(p=>Math.sqrt(Math.pow(d.svgX-p.svgX,2)+Math.pow(d.svgY-p.svgY,2))<l),u={normalizedX:0,normalizedY:0,overlap:Number.POSITIVE_INFINITY,displacement:Number.POSITIVE_INFINITY,spacing:-1,svgX:0,svgY:0};for(let d=0;d<r.length;d++){let p=r[d];if(h(p))continue;let g=(p.svgX-n.width/2)/(n.width/2),_=-((p.svgY-n.height/2)/(n.height/2)),m=this.resolveOverlapByNudging(g,_,t,n),f=this.getMinDistanceToExistingPhotos(m.normalizedX,m.normalizedY,t),T=this.normalizedToSvg(m.normalizedX,m.normalizedY,n);if((m.overlap<u.overlap||m.overlap===u.overlap&&m.displacement<u.displacement||m.overlap===u.overlap&&m.displacement===u.displacement&&f>u.spacing)&&(u={normalizedX:m.normalizedX,normalizedY:m.normalizedY,overlap:m.overlap,displacement:m.displacement,spacing:f,svgX:T.svgX,svgY:T.svgY},u.overlap===0&&u.displacement<=Math.max(2,Math.min(n.width,n.height)*.01)))break;}if(!isFinite(u.overlap)){let d=c.length%r.length,p=r[d],g=(p.svgX-n.width/2)/(n.width/2),_=-((p.svgY-n.height/2)/(n.height/2)),m=this.resolveOverlapByNudging(g,_,t,n),f=this.normalizedToSvg(m.normalizedX,m.normalizedY,n);u={normalizedX:m.normalizedX,normalizedY:m.normalizedY,overlap:m.overlap,displacement:m.displacement,spacing:this.getMinDistanceToExistingPhotos(m.normalizedX,m.normalizedY,t),svgX:f.svgX,svgY:f.svgY};}return c.push({svgX:u.svgX,svgY:u.svgY}),{auto_x:u.normalizedX,auto_y:u.normalizedY};}isPointInHotspot(t,e,n){try{let i=t.bounds;if(!i||i.width===0||i.height===0||!(e>=i.x&&e<=i.x+i.width&&n>=i.y&&n<=i.y+i.height))return!1;let o=t.element;if(o&&typeof o.isPointInFill=="function"){let a=(o.ownerSVGElement||this.svgElement)?.createSVGPoint();if(a)return a.x=e,a.y=n,o.isPointInFill(a);}return!0;}catch(i){return console.error("[PATH-CHECK] Error checking point with bounds:",i),!1;}}getPositionForRejectedPhoto(t,e){if(!this.svgElement)return null;let n=this.getSvgViewBox();if(!n)return null;let i=Math.min(n.width,n.height)*.2,r=-n.width/2+i/2,o=n.height/2-i/2,a=[];for(let u of e)if(u.metadata._private_moderation===0){let p=this.photoPositions.get(u.id);if(p){let g=this.photoSizes.get(u.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},_=Math.max(g.width,g.height)/2;a.push({x:p.x,y:p.y,radius:_});}}let c=this.photoSizes.get(t.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},l=Math.max(c.width,c.height)/2,h;return a.length===0?h={x:r,y:o}:h=this.findCirclePackPosition(l,a,r,o,i/2),{x:h.x,y:h.y,metadata:{layoutType:"rejected-packed",circleRadius:this.options.circleRadius,isRejected:!0}};}getMinDistanceToExistingPhotos(t,e,n){let i=this.options.circleRadius,r=t*i,o=e*i,a=Number.MAX_VALUE;for(let[c,l]of this.photoHotspotMap.entries())if(l.parentGroupId===n.parentGroupId){let h=this.photoPositions.get(c);if(h){let u=h.x,d=h.y,p=Math.sqrt(Math.pow(r-u,2)+Math.pow(o-d,2));a=Math.min(a,p);}}return a;}getPhotoSizeInSvg(t){let e=this.PHOTO_WIDTH/this.options.circleRadius*(t.width/2),n=this.PHOTO_HEIGHT/this.options.circleRadius*(t.height/2);return{w:e,h:n};}seededShuffle(t,e){let n=e>>>0,i=()=>(n=n*1664525+1013904223>>>0,n/4294967296),r=t.slice();for(let o=r.length-1;o>0;o--){let a=Math.floor(i()*(o+1));[r[o],r[a]]=[r[a],r[o]];}return r;}getSlotsForHotspot(t,e){let n=t.element?.id||"path",i=`${t.parentGroupId}:${t.transitionBarPosition}:${n}`,r=this.hotspotSlots.get(i);if(r&&r.length>0)return r;let o=Math.min(t.bounds.width,t.bounds.height)*.02,a=15,c=15,l=[],h=0;for(let p=t.bounds.y+o;p<=t.bounds.y+t.bounds.height-o;p+=c){let g=h%2===1?a*.5:0;for(let _=t.bounds.x+o+g;_<=t.bounds.x+t.bounds.width-o;_+=a)this.isPointInHotspot(t,_,p)&&l.push({svgX:_,svgY:p});h++;}let u=Math.abs(this.hashCode(i)),d=this.seededShuffle(l,u);return this.hotspotSlots.set(i,d),d;}overlapsHeaderElement(t,e,n){if(typeof document>"u"||!this.svgElement)return!1;let i=this.PHOTO_WIDTH/this.options.circleRadius*(n.width/2),r=this.PHOTO_HEIGHT/this.options.circleRadius*(n.height/2),o=t-i/2,a=t+i/2,c=e-r/2,l=e+r/2,h=Array.from(this.svgElement.querySelectorAll('[id^="header"]'));for(let u of h)if(u instanceof SVGGraphicsElement)try{let d=u.getBBox(),p=15;if(!(a<d.x-p||o>d.x+d.width+p||l<d.y-p||c>d.y+d.height+p))return!0;let _=u.querySelectorAll("*");for(let m of _)if(m instanceof SVGGraphicsElement)try{let f=m.getBBox();if(!(a<f.x-p||o>f.x+f.width+p||l<f.y-p||c>f.y+f.height+p))return!0;}catch{continue;}}catch{continue;}return!1;}normalizedToSvg(t,e,n){let i=n.width/2+t*(n.width/2),r=n.height/2-e*(n.height/2);return{svgX:i,svgY:r};}resolveOverlapByNudging(t,e,n,i){let r=this.calculateOverlapWithExistingPhotos(t,e,n);if(r===0)return{normalizedX:t,normalizedY:e,overlap:0,displacement:0};let o=this.normalizedToSvg(t,e,i),a=Math.max(Math.min(i.width,i.height)*.01,2),c=Math.min(i.width,i.height)*.2,l={normalizedX:t,normalizedY:e,overlap:r,displacement:0};for(let h=a;h<=c;h+=a)for(let d=0;d<16;d++){let p=d/16*2*Math.PI,g=o.svgX+Math.cos(p)*h,_=o.svgY+Math.sin(p)*h;if(!this.isPointInHotspot(n,g,_)||this.overlapsHeaderElement(g,_,i))continue;let m=(g-i.width/2)/(i.width/2),f=-((_-i.height/2)/(i.height/2)),T=this.calculateOverlapWithExistingPhotos(m,f,n);if(T===0)return{normalizedX:m,normalizedY:f,overlap:0,displacement:h};(T<l.overlap||T===l.overlap&&h<l.displacement)&&(l={normalizedX:m,normalizedY:f,overlap:T,displacement:h});}return l;}findCirclePackPosition(t,e,n,i,r){let a={x:n,y:i},c=1/0;for(let l of e){let h=[0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI,Math.PI*5/4,Math.PI*3/2,Math.PI*7/4];for(let u of h){let d=l.radius+t+50,p=l.x+Math.cos(u)*d,g=l.y+Math.sin(u)*d;if(!e.some(m=>{let f=p-m.x,T=g-m.y;return Math.sqrt(f*f+T*T)<t+m.radius+50;})){let m=Math.sqrt(Math.pow(p-n,2)+Math.pow(g-i,2));m<r&&m<c&&(c=m,a={x:p,y:g});}}}return a;}calculateOverlapWithExistingPhotos(t,e,n){let i=[];for(let[a,c]of this.photoPositions.entries())if(this.photoHotspotMap.get(a)===n){let l=this.photoSizes.get(a)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT};i.push({x:c.x,y:c.y,width:l.width,height:l.height});}if(i.length===0)return 0;let r={width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},o=0;for(let a=0;a<i.length;a++){let c=i[a],l=this.calculateRectangleOverlapPercent(t*this.options.circleRadius,e*this.options.circleRadius,r.width,r.height,c.x,c.y,c.width,c.height);o=Math.max(o,l);}return o;}calculateRectangleOverlapPercent(t,e,n,i,r,o,a,c){let l=t-n/2,h=t+n/2,u=e-i/2,d=e+i/2,p=r-a/2,g=r+a/2,_=o-c/2,m=o+c/2,f=Math.max(l,p),T=Math.min(h,g),S=Math.max(u,_),x=Math.min(d,m);if(T<=f||x<=S)return 0;let C=T-f,A=x-S,R=C*A,O=n*i;return R/O*100;}worldToNormalized(t,e){return{layout_x:Math.max(-1,Math.min(1,(t-(this.options.svgOffsetX||0))/this.options.circleRadius)),layout_y:Math.max(-1,Math.min(1,(e-(this.options.svgOffsetY||0))/this.options.circleRadius))};}normalizedToWorld(t,e){return{x:t*this.options.circleRadius+(this.options.svgOffsetX||0),y:e*this.options.circleRadius+(this.options.svgOffsetY||0)};}parseGroupIdMetadata(t){try{let n=t.substring(2).split(","),i,r,o;for(let a of n){let[c,l]=a.split("=");c==="plausibility"?i=parseInt(l,10):c==="favorable_future"?r=l:c==="transition_bar_position"&&(o=l);}if(i!==void 0&&r!==void 0&&o!==void 0)return{plausibility:i,favorable_future:r,transition_bar_position:o};}catch(e){console.warn(`Failed to parse group ID metadata: ${t}`,e);}return null;}normalizeFavorableFuture(t){if(!t)return"";let e=t.toLowerCase().trim();return e.includes("prevent")?"prevent":e.includes("prefer")?"prefer":e.includes("uncertain")?"uncertain":e;}normalizeTransitionBar(t){if(!t)return"";let e=t.toLowerCase().trim();return e.startsWith("bef")?"before":e.startsWith("dur")?"during":e.startsWith("aft")||e.startsWith("acher")?"after":e.includes("unclear")?"during":e;}normalizePlausibility(t){if(t==null)return null;let e=typeof t=="number"?t:parseFloat(String(t));if(Number.isNaN(e))return null;let n=[0,25,50,75,100],i=n[0],r=Math.abs(e-n[0]);for(let o=1;o<n.length;o++){let a=Math.abs(e-n[o]);a<r&&(r=a,i=n[o]);}return i;}getSvgViewBox(){if(typeof document>"u"||!this.svgElement)return null;let t=this.svgElement.getAttribute("viewBox");if(!t){let n=parseFloat(this.svgElement.getAttribute("width")||"800"),i=parseFloat(this.svgElement.getAttribute("height")||"800");return{x:0,y:0,width:n,height:i};}let e=t.split(/\s+/);return e.length===4?{x:parseFloat(e[0]),y:parseFloat(e[1]),width:parseFloat(e[2]),height:parseFloat(e[3])}:null;}updatePhotoAfterHotspotDrop(t,e,n){let{layout_x:i,layout_y:r}=this.worldToNormalized(e.x,e.y),o={x:e.x,y:e.y,metadata:{layoutType:"hotspot-drop",layout_x:i,layout_y:r,circleRadius:this.options.circleRadius,hotspotData:n}};this.photoPositions.set(t,o);}};var br=class s extends Tn{constructor(e,n="https://storage.googleapis.com/chronomaps3-eu",i={}){super();this.workspaceId=e;this.baseUrl=n;this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.photoWidth=i.photoWidth??Nt.PHOTO_WIDTH,this.photoHeight=i.photoHeight??Nt.PHOTO_HEIGHT,this.spacingX=i.spacingX??Nt.SPACING_X,this.spacingY=i.spacingY??Nt.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY;}workspaceConfigUrl;tsneConfigUrl=null;tsneData=null;currentStateHash=null;currentSetId=null;isLoading=!1;loadPromise=null;photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;initialize(){return Q(this,null,function*(){yield vi(s.prototype,this,"initialize").call(this),yield this.forceRefresh();});}getConfiguration(){return{name:"tsne-grid",displayName:"TSNE Layout",description:"Positions photos on the server-precalculated t-SNE grid",supportsInteraction:!1,requiresWebService:!0,settings:{workspaceId:this.workspaceId,baseUrl:this.baseUrl,photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY}};}forceRefresh(){return Q(this,null,function*(){this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData();});}fetchWorkspaceConfig(){return Q(this,null,function*(){try{let e=yield fetch(this.workspaceConfigUrl);if(!e.ok)throw new Error(`Failed to fetch workspace config: ${e.status} ${e.statusText}`);let n=yield e.json();if(typeof n.set_id!="number")throw new Error("Invalid workspace config: missing or invalid set_id: "+n.set_id+" "+typeof n.set_id);if(!n.state_hash||typeof n.state_hash!="string")throw new Error("Invalid workspace config: missing or invalid state_hash: "+n.state_hash);return{set_id:n.set_id,state_hash:n.state_hash};}catch(e){throw console.error("Error fetching workspace configuration:",e),e;}});}fetchTsneData(){return Q(this,null,function*(){if(this.tsneData||this.isLoading)return this.loadPromise||Promise.resolve();this.isLoading=!0,this.loadPromise=this.doFetchTsneData();try{yield this.loadPromise;}finally{this.isLoading=!1;}});}doFetchTsneData(){return Q(this,null,function*(){try{let e=yield this.fetchWorkspaceConfig();if(this.currentStateHash===e.state_hash&&this.tsneData)return;yield this.loadSet(e);}catch(e){throw console.error("Error fetching TSNE configuration:",e),e;}});}loadSet(e){return Q(this,null,function*(){let n=`${this.baseUrl}/tiles/${this.workspaceId}/${e.set_id}/config.json`,i=yield fetch(n);if(!i.ok)throw new Error(`Failed to fetch TSNE config: ${i.status} ${i.statusText}`);let r=yield i.json();this.tsneData=this.validateTsneConfig(r),this.currentStateHash=e.state_hash,this.currentSetId=e.set_id,this.tsneConfigUrl=n;});}refreshIfChanged(){return Q(this,null,function*(){if(this.isLoading)return!1;try{let e=yield this.fetchWorkspaceConfig();if(this.currentStateHash===e.state_hash&&this.tsneData)return!1;this.isLoading=!0;try{yield this.loadSet(e);}finally{this.isLoading=!1;}return!0;}catch(e){return console.error("Error checking for a new TSNE set:",e),!1;}});}validateTsneConfig(e){if(!e||typeof e!="object")throw new Error("Invalid TSNE config: not an object");if(!Array.isArray(e.dim)||e.dim.length!==2)throw new Error("Invalid TSNE config: dim must be an array of 2 numbers");if(!Array.isArray(e.grid))throw new Error("Invalid TSNE config: grid must be an array");for(let n=0;n<e.grid.length;n++){let i=e.grid[n];if(!i||typeof i!="object")throw new Error(`Invalid TSNE config: grid item ${n} is not an object`);if(!Array.isArray(i.pos)||i.pos.length!==2)throw new Error(`Invalid TSNE config: grid item ${n} pos must be an array of 2 numbers`);if(typeof i.id!="string")throw new Error(`Invalid TSNE config: grid item ${n} id must be a string`);}return{dim:e.dim,grid:e.grid,padding_ratio:e.padding_ratio||.5,conversion_ratio:e.conversion_ratio||[1,1],cell_ratios:e.cell_ratios||[1,1],clusters:Array.isArray(e.clusters)?e.clusters:[]};}getPositionForPhoto(e){return Q(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n=this.tsneData.grid.find(o=>o.id===e.id);if(!n)return null;let i=this.convertTsneToWorldCoordinates(n.pos,this.tsneData.dim),r=n.metadata?.rotate;return{x:i.x,y:i.y,gridKey:`tsne-${n.pos[0]}-${n.pos[1]}`,metadata:{tsnePosition:n.pos,_tsneRotateDeg:typeof r=="number"?r:void 0}};});}calculateAllPositions(e){return Q(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n=[];for(let i of e)n.push(yield this.getPositionForPhoto(i));return n;});}fetchLayoutData(e){return Hl(this.getAllPositionsAsMap(e));}convertTsneToWorldCoordinates(e,n){let[i,r]=e,[o,a]=n,c=(o-1)*this.cellW/2+this.cellW/4,l=(a-1)*this.cellH/2,h=i*this.cellW-c,u=l-r*this.cellH;return{x:h,y:u};}getAllPositionsAsMap(e){return Q(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n={};for(let i of e)n[i.id]=yield this.getPositionForPhoto(i);return n;});}getLayoutBounds(){return Q(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)return{width:this.cellW*10,height:this.cellH*10};let[e,n]=this.tsneData.dim,i=e*this.cellW+this.cellW/2,r=n*this.cellH;return{width:i,height:r};});}setWorkspaceId(e){return Q(this,null,function*(){this.workspaceId!==e&&(this.workspaceId=e,this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData());});}getWorkspaceId(){return this.workspaceId;}getTsneInfo(){return this.tsneData?{workspaceId:this.workspaceId,gridSize:this.tsneData.dim,itemCount:this.tsneData.grid.length,workspaceConfigUrl:this.workspaceConfigUrl,tsneConfigUrl:this.tsneConfigUrl||"not set",setId:this.currentSetId||-1,stateHash:this.currentStateHash||"not set"}:null;}getWorldPositionForId(e){if(!this.tsneData)return null;let n=this.tsneData.grid.find(i=>i.id===e);return n?this.convertTsneToWorldCoordinates(n.pos,this.tsneData.dim):null;}getClustersWithWorldCoords(){if(!this.tsneData||!this.tsneData.clusters)return[];let e=this.tsneData.dim;return this.tsneData.clusters.map(n=>{let[[i,r],[o,a]]=n.bounds,c=this.convertTsneToWorldCoordinates([(i+o)/2,(r+a)/2],e);return{title:n.title,centerX:c.x,centerY:c.y,width:Math.abs(o-i)*this.cellW,height:Math.abs(a-r)*this.cellH,averageRotation:n.average_rotation??0};});}};var se={LAYOUT_TRANSITION_DURATION:.54,LAYOUT_STAGGER_DELAY:.014,NEW_PHOTO_ANIMATION_DURATION:3,MAX_NEW_PHOTO_DELAY:1500,CAMERA_BOUNDS_UPDATE_DEBOUNCE:100,GRID_SPIRAL_ANIMATION_DURATION:1100,NEW_PHOTO_STAGGER_DELAY:6500,API_POLLING_INTERVAL:3e4,QR_SHRINK_DELAY:1e4,INITIAL_POLLING_DELAY:1e3,ITEM_STALE_TIMEOUT:18e5,NOW_RECHECK_INTERVAL:3e5,OPACITY_FADE_DURATION:.4,INVISIBLE_POSITION_TRANSITION_DURATION:.4,CAMERA_BOUNDS_ANIMATION_DURATION:3,DEMO_ZOOM_IN_DURATION:2.6,DEMO_ROLL_TO_ITEM:!1,DEMO_HOLD_DURATION:4,DEMO_ZOOM_OUT_DURATION:1.6,DEMO_PAUSE_DURATION:1.2,DEMO_FOCUS_FILL_RATIO:.62,DEMO_DECORATION_HEADROOM:.45,DEMO_EXIT_ROLL_DURATION:.4,DEMO_EXIT_GRACE_PERIOD:500,DEMO_DIM_TRANSITION_DURATION:.8};var Mr=class s{photos=new Map();layoutStrategy=null;renderer=null;enableSvgAutoPositioning=!1;isDragEnabled=!1;isDragAllEnabled=!1;userAuthorId=null;svgVisible=!1;svgStrategy=null;photoAddedSubject=new Un();photoRemovedSubject=new Un();layoutChangedSubject=new Un();photoAdded$=this.photoAddedSubject.asObservable();photoRemoved$=this.photoRemovedSubject.asObservable();layoutChanged$=this.layoutChangedSubject.asObservable();constructor(){}initialize(t,e){return Q(this,null,function*(){this.layoutStrategy=t,this.renderer=e,yield this.layoutStrategy.initialize();});}addPhoto(t){return Q(this,null,function*(){if(this.photos.has(t.id))return this.photos.get(t.id);if(!this.layoutStrategy||!this.renderer)throw new Error("Repository not initialized");let e=new gr(t,{x:0,y:0,z:0});this.photos.set(t.id,e),this.layoutStrategy.addPhoto(e);let n=!1;if(this.layoutStrategy.requiresFullRecalculationOnAdd()){let r=Array.from(this.photos.values()),o=yield this.layoutStrategy.calculateAllPositions(r),a=this.layoutStrategy.getConfiguration().name;this.shouldApplyDragOverrides(a)&&r.forEach((l,h)=>{let u=this.getDragPositionOverride(l);u&&(o[h]=u);});let c=[];r.forEach((l,h)=>{let u=o[h];if(u&&u.x!==void 0&&u.y!==void 0){let d={x:u.x,y:u.y,z:0};if(l.setProperty("opacity",1),l.setTargetPosition(d),l.mesh&&l.id!==e.id){let p=l.currentPosition,g=l.getProperty("opacity")||1;c.push(this.animateToPositionWithOpacityUpdate(l,p,d,g,1,se.LAYOUT_TRANSITION_DURATION));}u.metadata&&l.updateMetadata(u.metadata),u.gridKey&&l.setProperty("gridKey",u.gridKey),l.id===e.id&&(n=!0);}else{let d={x:0,y:0,z:0};if(l.setProperty("opacity",0),l.setTargetPosition(d),l.mesh&&l.id!==e.id){let p=l.currentPosition,g=l.getProperty("opacity")||1;c.push(this.animateToPositionWithOpacityUpdate(l,p,d,g,0,se.LAYOUT_TRANSITION_DURATION));}}}),c.length>0&&(yield Promise.all(c));}else{let r=this.getDragPositionOverride(e);r||(r=yield this.layoutStrategy.getPositionForPhoto(e,Array.from(this.photos.values()))),n=!!(r&&r.x!==void 0&&r.y!==void 0),n&&r?(e.setProperty("opacity",1),e.setTargetPosition({x:r.x,y:r.y,z:0}),r.metadata&&e.updateMetadata(r.metadata),r.gridKey&&e.setProperty("gridKey",r.gridKey)):(e.setProperty("opacity",0),e.setTargetPosition({x:0,y:0,z:0}));}let i=yield this.renderer.createPhotoMesh(e);return e.setMesh(i),this.renderer.setMeshPhotoId(i,e.id),this.renderer.setMeshPhotoData(i,e),this.setupHoverDetectionForPhoto(e),this.svgVisible&&this.setupDragForPhoto(e),n?(e.setCurrentPosition(e.targetPosition),this.renderer.updateMeshPosition(i,e.targetPosition),e.setAnimationState("positioned"),i.material&&"opacity"in i.material&&(i.material.opacity=e.getProperty("opacity")??1,i.material.transparent=!0)):i.material&&"opacity"in i.material&&(i.material.opacity=0,i.material.transparent=!0),n&&this.updateCamera(),this.photoAddedSubject.next(e),e;});}removePhoto(t){let e=this.photos.get(t);return e?(e.mesh&&this.renderer&&this.renderer.removeMesh(e.mesh),this.layoutStrategy&&this.layoutStrategy.removePhoto(t),e.dispose(),this.photos.delete(t),this.updateCamera(),this.photoRemovedSubject.next(t),!0):!1;}getPhoto(t){return this.photos.get(t);}getAllPhotos(){return Array.from(this.photos.values());}getPhotoById(t){return this.photos.get(t);}getLayoutStrategy(){return this.layoutStrategy;}getVisiblePhotos(){return this.getAllPhotos().filter(t=>(t.getProperty("opacity")??1)>0);}setLayoutStrategy(t){return Q(this,null,function*(){if(!this.layoutStrategy||!this.renderer)throw new Error("PhotoDataRepository not initialized");let e=this.layoutStrategy.getConfiguration().name,n=t.getConfiguration().name;yield t.initialize();let i=Array.from(this.photos.values());for(let c of i)t.addPhoto(c);let r=yield t.calculateAllPositions(i,{enableAutoPositioning:this.enableSvgAutoPositioning});this.shouldApplyDragOverrides(n)&&i.forEach((c,l)=>{let h=this.getDragPositionOverride(c);h&&(r[l]=h);}),this.layoutStrategy=t,i.forEach((c,l)=>{let h=r[l];h!==null?(c.setProperty("opacity",1),c.setTargetPosition({x:h.x,y:h.y,z:c.targetPosition.z}),h.metadata&&c.updateMetadata(h.metadata),h.gridKey&&c.setProperty("gridKey",h.gridKey)):n==="svg-background"?c.setProperty("opacity",1):(c.setProperty("opacity",0),c.setTargetPosition({x:0,y:0,z:0}));});let o=i.map((c,l)=>Q(this,null,function*(){let u=r[l]!==null,d=l*se.LAYOUT_STAGGER_DELAY;d>0&&(yield new Promise(g=>setTimeout(g,d*1e3)));let p=c.mesh?.material&&"opacity"in c.mesh.material?c.mesh.material.opacity:1;if(u){if(c.mesh){let g={x:c.mesh.position.x,y:c.mesh.position.y,z:c.mesh.position.z};return this.animateToPositionWithOpacityUpdate(c,g,c.targetPosition,p,1,se.LAYOUT_TRANSITION_DURATION);}}else{if(n==="svg-background")return Promise.resolve();if(c.mesh){let g={x:c.mesh.position.x,y:c.mesh.position.y,z:c.mesh.position.z};return this.animateToPositionWithOpacityUpdate(c,g,{x:0,y:0,z:0},p,0,se.INVISIBLE_POSITION_TRANSITION_DURATION);}}})),a=this.updateCamera({animate:!0,force:!0});if(yield Promise.all([Promise.all(o.filter(Boolean)),a]),this.svgVisible)for(let c of i)c.mesh&&(this.renderer.setMeshPhotoId(c.mesh,c.id),this.renderer.setMeshPhotoData(c.mesh,c),this.setupDragForPhoto(c));else this.renderer.disableAllDragging();this.layoutChangedSubject.next();});}setSvgAutoPositioningEnabled(t){this.enableSvgAutoPositioning=t;}shouldApplyDragOverrides(t){return this.svgVisible&&(t==="svg-background"||t==="circle-packing");}setDragEnabled(t){this.isDragEnabled=t,this.svgVisible&&this.refreshDragPermissions();}setDragAllEnabled(t){this.isDragAllEnabled=t,this.svgVisible&&this.refreshDragPermissions();}setUserAuthorId(t){this.userAuthorId=t,this.svgVisible&&this.refreshDragPermissions();}updateDragPermissions(t,e){this.isDragAllEnabled=t,this.userAuthorId=e,this.svgVisible&&this.refreshDragPermissions();}canDragPhoto(t){return!!(this.isDragEnabled||this.isDragAllEnabled||this.userAuthorId&&t.metadata.author_id===this.userAuthorId);}refreshDragPermissions(){this.renderer&&this.photos.forEach(t=>{t.mesh&&(this.canDragPhoto(t)?this.renderer.restoreDragForMesh(t.mesh)||this.renderer.enableDragForMesh(t.mesh,n=>{t.setCurrentPosition(n),t.setTargetPosition(n);}):this.renderer.disableDragForMesh(t.mesh));});}setSvgVisible(t,e){this.svgVisible=t,this.svgStrategy=t&&e?e:null;}refreshLayout(){return Q(this,null,function*(){if(!this.layoutStrategy){console.warn("Layout strategy not initialized");return;}let t=Array.from(this.photos.values()),e=yield this.layoutStrategy.calculateAllPositions(t,{enableAutoPositioning:this.enableSvgAutoPositioning});t.forEach((r,o)=>{let a=this.getDragPositionOverride(r);a&&(e[o]=a);}),t.forEach((r,o)=>{let a=e[o];a!==null?(r.setProperty("opacity",1),r.setTargetPosition({x:a.x,y:a.y,z:r.targetPosition.z}),a.metadata&&r.updateMetadata(a.metadata),a.gridKey&&r.setProperty("gridKey",a.gridKey)):(r.setProperty("opacity",0),r.setTargetPosition({x:0,y:0,z:0}));});let n=t.map((r,o)=>Q(this,null,function*(){let a=e[o],c=o*se.LAYOUT_STAGGER_DELAY;c>0&&(yield new Promise(u=>setTimeout(u,c*1e3)));let l=a!==null,h=r.mesh?.material&&"opacity"in r.mesh.material?r.mesh.material.opacity:1;if(l){if(r.mesh){let u={x:r.mesh.position.x,y:r.mesh.position.y,z:r.mesh.position.z};return this.animateToPositionWithOpacityUpdate(r,u,r.targetPosition,h,1,se.LAYOUT_TRANSITION_DURATION);}}else if(r.mesh){let u={x:r.mesh.position.x,y:r.mesh.position.y,z:r.mesh.position.z};return this.animateToPositionWithOpacityUpdate(r,u,{x:0,y:0,z:0},h,0,se.INVISIBLE_POSITION_TRANSITION_DURATION);}})),i=this.updateCamera({animate:!0,force:!0});yield Promise.all([Promise.all(n.filter(Boolean)),i]),this.layoutChangedSubject.next();});}get photoAdded(){return this.photoAdded$;}get photoRemoved(){return this.photoRemoved$;}get layoutChanged(){return this.layoutChanged$;}dispose(){this.photos.forEach(t=>{t.mesh&&this.renderer&&this.renderer.removeMesh(t.mesh),t.dispose();}),this.photos.clear(),this.layoutStrategy&&this.layoutStrategy.dispose(),this.photoAddedSubject.complete(),this.photoRemovedSubject.complete(),this.layoutChangedSubject.complete();}computeSceneBounds(){let e=this.getVisiblePhotos().map(i=>({x:i.targetPosition.x,y:i.targetPosition.y})),n=this.calculateBounds(e);if(this.svgVisible&&this.svgStrategy){let i=this.svgStrategy.getSvgBounds();n={minX:Math.min(n.minX,i.minX),maxX:Math.max(n.maxX,i.maxX),minY:Math.min(n.minY,i.minY),maxY:Math.max(n.maxY,i.maxY)};}return n;}updateCamera(t){if(!this.renderer)return Promise.resolve();let e=this.computeSceneBounds();return this.renderer.setSceneBounds(e,{animate:t?.animate??!1,force:t?.force??!1});}animateToPositionWithUpdate(t,e,n,i){return Q(this,null,function*(){t.mesh&&(yield this.renderer.animateToPosition(t.mesh,e,n,i),t.setCurrentPosition(n));});}animateToPositionWithOpacityUpdate(t,e,n,i,r,o){return Q(this,null,function*(){t.mesh&&(yield this.renderer.animatePositionAndOpacity(t.mesh,e,n,i,r,o),t.setCurrentPosition(n),t.setProperty("opacity",r));});}setupDragForPhoto(t){if(!(!t.mesh||!this.renderer||!this.layoutStrategy)){if(!this.canDragPhoto(t)){this.setupHoverDetectionForPhoto(t);return;}this.renderer.setLayoutStrategy(this.svgStrategy||this.layoutStrategy),this.renderer.setMeshPhotoData(t.mesh,t),this.renderer.enableDragForMesh(t.mesh,e=>{t.setCurrentPosition(e),t.setTargetPosition(e);});}}getDragPositionOverride(t){if(!this.svgVisible||!this.svgStrategy)return null;let e=t.metadata.layout_x,n=t.metadata.layout_y;if(typeof e=="number"&&typeof n=="number"){let{x:i,y:r}=this.svgStrategy.normalizedToWorld(e,n);return{x:i,y:r,metadata:{layoutType:"restored-normalized",layout_x:e,layout_y:n}};}return null;}setupHoverDetectionForPhoto(t){!t.mesh||!this.renderer||this.renderer.enableHoverForMesh(t.mesh);}calculateBounds(t){if(t.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let e=Nt.PHOTO_WIDTH/2,n=Nt.PHOTO_HEIGHT/2,i=t[0].x-e,r=t[0].x+e,o=t[0].y-n,a=t[0].y+n;for(let c of t)i=Math.min(i,c.x-e),r=Math.max(r,c.x+e),o=Math.min(o,c.y-n),a=Math.max(a,c.y+n);return{minX:i,maxX:r,minY:o,maxY:a};}static ɵfac=function(e){return new(e||s)();};static ɵprov=Qn({token:s,factory:s.ɵfac,providedIn:"root"});};var po="179";var Vc=0,$a=1,Gc=2;var Ka=1,Wc=2,Rn=3,qn=0,Ye=1,In=2,Kn=0,Ei=1,Ja=2,ja=3,Qa=4,Xc=5,hi=100,Yc=101,qc=102,Zc=103,$c=104,Kc=200,Jc=201,jc=202,Qc=203,Gr=204,Wr=205,th=206,eh=207,nh=208,ih=209,sh=210,rh=211,oh=212,ah=213,lh=214,mo=0,go=1,_o=2,wi=3,yo=4,vo=5,xo=6,bo=7,tl=0,ch=1,hh=2,Jn=0,uh=1,dh=2,fh=3,ph=4,mh=5,gh=6,_h=7;var za=300,Oi=301,Di=302,Mo=303,So=304,tr=306,Xr=1e3,En=1001,Yr=1002,un=1003,yh=1004;var er=1005;var Xe=1006,To=1007;var On=1008;var Dn=1009,el=1010,nl=1011,ms=1012,Eo=1013,mi=1014,Ln=1015,gs=1016,wo=1017,Co=1018,_s=1020,il=35902,sl=1021,rl=1022,fn=1023,as=1026,ys=1027,ol=1028,Ao=1029,al=1030,Po=1031;var Ro=1033,nr=33776,ir=33777,sr=33778,rr=33779,Io=35840,Oo=35841,Do=35842,Lo=35843,Fo=36196,No=37492,Uo=37496,Bo=37808,Ho=37809,ko=37810,zo=37811,Vo=37812,Go=37813,Wo=37814,Xo=37815,Yo=37816,qo=37817,Zo=37818,$o=37819,Ko=37820,Jo=37821,or=36492,jo=36494,Qo=36495,ll=36283,ta=36284,ea=36285,na=36286;var Bs=2300,qr=2301,zr=2302,Va=2400,Ga=2401,Wa=2402;var vh=3200,xh=3201;var bh=0,Mh=1,jn="",Ie="srgb",Ci="srgb-linear",Hs="linear",oe="srgb";var Ti=7680;var Xa=519,Sh=512,Th=513,Eh=514,cl=515,wh=516,Ch=517,Ah=518,Ph=519,Ya=35044;var hl="300 es",xn=2e3,ks=2001;var Zn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e);}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1;}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1);}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null;}}},Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mc=1234567,Ns=Math.PI/180,ls=180/Math.PI;function vs(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[s&255]+Be[s>>8&255]+Be[s>>16&255]+Be[s>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase();}function Zt(s,t,e){return Math.max(t,Math.min(e,s));}function ul(s,t){return(s%t+t)%t;}function Au(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t);}function Pu(s,t,e){return s!==t?(e-s)/(t-s):0;}function Us(s,t,e){return(1-e)*s+e*t;}function Ru(s,t,e,n){return Us(s,t,1-Math.exp(-e*n));}function Iu(s,t=1){return t-Math.abs(ul(s,t*2)-t);}function Ou(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s));}function Du(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10));}function Lu(s,t){return s+Math.floor(Math.random()*(t-s+1));}function Fu(s,t){return s+Math.random()*(t-s);}function Nu(s){return s*(.5-Math.random());}function Uu(s){s!==void 0&&(Mc=s);let t=Mc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296;}function Bu(s){return s*Ns;}function Hu(s){return s*ls;}function ku(s){return(s&s-1)===0&&s!==0;}function zu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2));}function Vu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2));}function Gu(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*p,a*l);break;case"YXY":s.set(c*p,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i);}}function rs(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.");}}function We(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.");}}var jt={DEG2RAD:Ns,RAD2DEG:ls,generateUUID:vs,clamp:Zt,euclideanModulo:ul,mapLinear:Au,inverseLerp:Pu,lerp:Us,damp:Ru,pingpong:Iu,smoothstep:Ou,smootherstep:Du,randInt:Lu,randFloat:Fu,randFloatSpread:Nu,seededRandom:Uu,degToRad:Bu,radToDeg:Hu,isPowerOfTwo:ku,ceilPowerOfTwo:zu,floorPowerOfTwo:Vu,setQuaternionFromProperEuler:Gu,normalize:We,denormalize:rs},$t=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e;}get width(){return this.x;}set width(t){this.x=t;}get height(){return this.y;}set height(t){this.y=t;}set(t,e){return this.x=t,this.y=e,this;}setScalar(t){return this.x=t,this.y=t,this;}setX(t){return this.x=t,this;}setY(t){return this.y=t,this;}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t);}return this;}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t);}}clone(){return new this.constructor(this.x,this.y);}copy(t){return this.x=t.x,this.y=t.y,this;}add(t){return this.x+=t.x,this.y+=t.y,this;}addScalar(t){return this.x+=t,this.y+=t,this;}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this;}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this;}sub(t){return this.x-=t.x,this.y-=t.y,this;}subScalar(t){return this.x-=t,this.y-=t,this;}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this;}multiply(t){return this.x*=t.x,this.y*=t.y,this;}multiplyScalar(t){return this.x*=t,this.y*=t,this;}divide(t){return this.x/=t.x,this.y/=t.y,this;}divideScalar(t){return this.multiplyScalar(1/t);}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this;}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this;}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this;}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this;}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this;}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e));}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this;}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this;}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this;}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this;}negate(){return this.x=-this.x,this.y=-this.y,this;}dot(t){return this.x*t.x+this.y*t.y;}cross(t){return this.x*t.y-this.y*t.x;}lengthSq(){return this.x*this.x+this.y*this.y;}length(){return Math.sqrt(this.x*this.x+this.y*this.y);}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y);}normalize(){return this.divideScalar(this.length()||1);}angle(){return Math.atan2(-this.y,-this.x)+Math.PI;}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Zt(n,-1,1));}distanceTo(t){return Math.sqrt(this.distanceToSquared(t));}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n;}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y);}setLength(t){return this.normalize().multiplyScalar(t);}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this;}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this;}equals(t){return t.x===this.x&&t.y===this.y;}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this;}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t;}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this;}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this;}random(){return this.x=Math.random(),this.y=Math.random(),this;}*[Symbol.iterator](){yield this.x,yield this.y;}},$n=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i;}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return;}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return;}if(u!==_||c!==d||l!==p||h!==g){let m=1-a,f=c*d+l*p+h*g+u*_,T=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){let C=Math.sqrt(S),A=Math.atan2(C,f*T);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C;}let x=a*T;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C;}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*p-l*d,t[e+1]=c*g+h*d+l*u-a*p,t[e+2]=l*g+h*p+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*p,t;}get x(){return this._x;}set x(t){this._x=t,this._onChangeCallback();}get y(){return this._y;}set y(t){this._y=t,this._onChangeCallback();}get z(){return this._z;}set z(t){this._z=t,this._onChangeCallback();}get w(){return this._w;}set w(t){this._w=t,this._onChangeCallback();}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this;}clone(){return new this.constructor(this._x,this._y,this._z,this._w);}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this;}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),p=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o);}return e===!0&&this._onChangeCallback(),this;}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this;}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-i)*p;}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+l)/p;}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+h)/p;}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p;}return this._onChangeCallback(),this;}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize();}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)));}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this;}identity(){return this.set(0,0,0,1);}invert(){return this.conjugate();}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this;}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w;}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w;}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w);}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this;}multiply(t){return this.multiplyQuaternions(this,t);}premultiply(t){return this.multiplyQuaternions(t,this);}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this;}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this;}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this;}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n);}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e));}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w;}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this;}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t;}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this;}toJSON(){return this.toArray();}_onChange(t){return this._onChangeCallback=t,this;}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w;}},N=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n;}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this;}setScalar(t){return this.x=t,this.y=t,this.z=t,this;}setX(t){return this.x=t,this;}setY(t){return this.y=t,this;}setZ(t){return this.z=t,this;}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t);}return this;}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t);}}clone(){return new this.constructor(this.x,this.y,this.z);}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this;}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this;}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this;}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this;}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this;}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this;}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this;}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this;}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this;}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this;}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this;}applyEuler(t){return this.applyQuaternion(Sc.setFromEuler(t));}applyAxisAngle(t,e){return this.applyQuaternion(Sc.setFromAxisAngle(t,e));}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this;}applyNormalMatrix(t){return this.applyMatrix3(t).normalize();}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this;}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this;}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize();}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this;}divideScalar(t){return this.multiplyScalar(1/t);}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this;}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this;}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this;}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this;}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e));}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this;}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this;}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this;}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this;}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this;}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z;}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z;}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z);}normalize(){return this.divideScalar(this.length()||1);}setLength(t){return this.normalize().multiplyScalar(t);}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this;}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this;}cross(t){return this.crossVectors(this,t);}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this;}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n);}projectOnPlane(t){return xa.copy(this).projectOnVector(t),this.sub(xa);}reflect(t){return this.sub(xa.copy(t).multiplyScalar(2*this.dot(t)));}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Zt(n,-1,1));}distanceTo(t){return Math.sqrt(this.distanceToSquared(t));}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i;}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z);}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta);}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this;}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y);}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this;}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this;}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this;}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4);}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3);}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this;}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this;}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z;}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this;}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t;}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this;}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this;}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this;}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z;}},xa=new N(),Sc=new $n(),Ht=class s{constructor(t,e,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l);}set(t,e,n,i,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this;}identity(){return this.set(1,0,0,0,1,0,0,0,1),this;}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this;}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this;}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this;}multiply(t){return this.multiplyMatrices(this,t);}premultiply(t){return this.multiplyMatrices(t,this);}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],T=i[1],S=i[4],x=i[7],C=i[2],A=i[5],R=i[8];return r[0]=o*_+a*T+c*C,r[3]=o*m+a*S+c*A,r[6]=o*f+a*x+c*R,r[1]=l*_+h*T+u*C,r[4]=l*m+h*S+u*A,r[7]=l*f+h*x+u*R,r[2]=d*_+p*T+g*C,r[5]=d*m+p*S+g*A,r[8]=d*f+p*x+g*R,this;}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this;}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c;}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this;}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this;}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose();}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this;}setUvTransform(t,e,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this;}scale(t,e){return this.premultiply(ba.makeScale(t,e)),this;}rotate(t){return this.premultiply(ba.makeRotation(-t)),this;}translate(t,e){return this.premultiply(ba.makeTranslation(t,e)),this;}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this;}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this;}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this;}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0;}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this;}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t;}clone(){return new this.constructor().fromArray(this.elements);}},ba=new Ht();function dl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1;}function cs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s);}function Rh(){let s=cs("canvas");return s.style.display="block",s;}var Tc={};function Ai(s){s in Tc||(Tc[s]=!0,console.warn(s));}function Ih(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n();}}setTimeout(r,e);});}var Ec=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wu(){let s={enabled:!0,workingColorSpace:Ci,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===oe&&(i.r=Yn(i.r),i.g=Yn(i.g),i.b=Yn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===oe&&(i.r=os(i.r),i.g=os(i.g),i.b=os(i.b))),i;},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r);},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace);},getPrimaries:function(i){return this.spaces[i].primaries;},getTransfer:function(i){return i===jn?Hs:this.spaces[i].transfer;},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients);},define:function(i){Object.assign(this.spaces,i);},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ);},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;},fromWorkingColorSpace:function(i,r){return Ai("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r);},toWorkingColorSpace:function(i,r){return Ai("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r);}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ci]:{primaries:t,whitePoint:n,transfer:Hs,toXYZ:Ec,fromXYZ:wc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:oe,toXYZ:Ec,fromXYZ:wc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),s;}var Jt=Wu();function Yn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4);}function os(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055;}var Yi,Zr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Yi===void 0&&(Yi=cs("canvas")),Yi.width=t.width,Yi.height=t.height;let i=Yi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Yi;}return n.toDataURL(e);}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=cs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Yn(r[o]/255)*255;return n.putImageData(i,0,0),e;}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yn(e[n]/255)*255):e[n]=Yn(e[n]);return{data:e,width:t.width,height:t.height};}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t;}},Xu=0,hs=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=vs(),this.data=t,this.dataReady=!0,this.version=0;}getSize(t){let e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t;}set needsUpdate(t){t===!0&&this.version++;}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ma(i[o].image)):r.push(Ma(i[o]));}else r=Ma(i);n.url=r;}return e||(t.images[this.uuid]=n),n;}};function Ma(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zr.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{});}var Yu=0,Sa=new N(),nn=(()=>{class s extends Zn{constructor(e=s.DEFAULT_IMAGE,n=s.DEFAULT_MAPPING,i=En,r=En,o=Xe,a=On,c=fn,l=Dn,h=s.DEFAULT_ANISOTROPY,u=jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=vs(),this.name="",this.source=new hs(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=a,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht(),this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0;}get width(){return this.source.getSize(Sa).x;}get height(){return this.source.getSize(Sa).y;}get depth(){return this.source.getSize(Sa).z;}get image(){return this.source.data;}set image(e=null){this.source.data=e;}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y);}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n});}clearUpdateRanges(){this.updateRanges.length=0;}clone(){return new this.constructor().copy(this);}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this;}setValues(e){for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue;}let r=this[n];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue;}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i;}}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i;}dispose(){this.dispatchEvent({type:"dispose"});}transformUv(e){if(this.mapping!==za)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xr:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break;}if(e.y<0||e.y>1)switch(this.wrapT){case Xr:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break;}return this.flipY&&(e.y=1-e.y),e;}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0);}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++;}}return s.DEFAULT_IMAGE=null,s.DEFAULT_MAPPING=za,s.DEFAULT_ANISOTROPY=1,s;})(),Se=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i;}get width(){return this.z;}set width(t){this.z=t;}get height(){return this.w;}set height(t){this.w=t;}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this;}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this;}setX(t){return this.x=t,this;}setY(t){return this.y=t,this;}setZ(t){return this.z=t,this;}setW(t){return this.w=t,this;}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t);}return this;}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t);}}clone(){return new this.constructor(this.x,this.y,this.z,this.w);}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this;}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this;}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this;}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this;}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this;}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this;}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this;}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this;}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this;}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this;}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this;}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this;}divideScalar(t){return this.multiplyScalar(1/t);}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this;}setAxisAngleFromRotationMatrix(t){let e,n,i,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(l+1)/2,x=(p+1)/2,C=(f+1)/2,A=(h+d)/4,R=(u+_)/4,O=(g+m)/4;return S>x&&S>C?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=A/n,r=R/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=O/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=O/r),this.set(n,i,r,e),this;}let T=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-_)/T,this.z=(d-h)/T,this.w=Math.acos((l+p+f-1)/2),this;}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this;}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this;}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this;}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this;}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this;}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e));}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this;}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this;}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this;}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this;}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this;}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w;}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w;}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w);}normalize(){return this.divideScalar(this.length()||1);}setLength(t){return this.normalize().multiplyScalar(t);}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this;}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this;}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w;}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this;}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t;}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this;}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this;}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w;}},$r=class extends Zn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);let i={width:t,height:e,depth:n.depth},r=new nn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview;}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e);}get texture(){return this.textures[0];}set texture(t){this.textures[0]=t;}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t;}get depthTexture(){return this._depthTexture;}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose();}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e);}clone(){return new this.constructor().copy(this);}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new hs(i);}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this;}dispose(){this.dispatchEvent({type:"dispose"});}},Cn=class extends $r{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0;}},zs=class extends nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set();}addLayerUpdate(t){this.layerUpdates.add(t);}clearLayerUpdates(){this.layerUpdates.clear();}};var Kr=class extends nn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1;}};var An=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e;}set(t,e){return this.min.copy(t),this.max.copy(e),this;}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this;}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this;}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this;}setFromCenterAndSize(t,e){let n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this;}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e);}clone(){return new this.constructor().copy(this);}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this;}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this;}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z;}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5);}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min);}expandByPoint(t){return this.min.min(t),this.max.max(t),this;}expandByVector(t){return this.min.sub(t),this.max.add(t),this;}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this;}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,_n):_n.fromBufferAttribute(r,o),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Sr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sr.copy(n.boundingBox)),Sr.applyMatrix4(t.matrixWorld),this.union(Sr);}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this;}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z;}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z;}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z));}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z;}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius;}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant;}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),Tr.subVectors(this.max,Os),qi.subVectors(t.a,Os),Zi.subVectors(t.b,Os),$i.subVectors(t.c,Os),ii.subVectors(Zi,qi),si.subVectors($i,Zi),xi.subVectors(qi,$i);let e=[0,-ii.z,ii.y,0,-si.z,si.y,0,-xi.z,xi.y,ii.z,0,-ii.x,si.z,0,-si.x,xi.z,0,-xi.x,-ii.y,ii.x,0,-si.y,si.x,0,-xi.y,xi.x,0];return!Ta(e,qi,Zi,$i,Tr)||(e=[1,0,0,0,1,0,0,0,1],!Ta(e,qi,Zi,$i,Tr))?!1:(Er.crossVectors(ii,si),e=[Er.x,Er.y,Er.z],Ta(e,qi,Zi,$i,Tr));}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max);}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t);}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t;}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this;}union(t){return this.min.min(t.min),this.max.max(t.max),this;}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this);}translate(t){return this.min.add(t),this.max.add(t),this;}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max);}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()};}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this;}},kn=[new N(),new N(),new N(),new N(),new N(),new N(),new N(),new N()],_n=new N(),Sr=new An(),qi=new N(),Zi=new N(),$i=new N(),ii=new N(),si=new N(),xi=new N(),Os=new N(),Tr=new N(),Er=new N(),bi=new N();function Ta(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){bi.fromArray(s,r);let a=i.x*Math.abs(bi.x)+i.y*Math.abs(bi.y)+i.z*Math.abs(bi.z),c=t.dot(bi),l=e.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1;}return!0;}var qu=new An(),Ds=new N(),Ea=new N(),us=class{constructor(t=new N(),e=-1){this.isSphere=!0,this.center=t,this.radius=e;}set(t,e){return this.center.copy(t),this.radius=e,this;}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):qu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this;}copy(t){return this.center.copy(t.center),this.radius=t.radius,this;}isEmpty(){return this.radius<0;}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this;}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius;}distanceToPoint(t){return t.distanceTo(this.center)-this.radius;}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e;}intersectsBox(t){return t.intersectsSphere(this);}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius;}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e;}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t);}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this;}translate(t){return this.center.add(t),this;}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);let e=Ds.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ds,i/n),this.radius+=i;}return this;}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(Ea)),this.expandByPoint(Ds.copy(t.center).sub(Ea))),this);}equals(t){return t.center.equals(this.center)&&t.radius===this.radius;}clone(){return new this.constructor().copy(this);}toJSON(){return{radius:this.radius,center:this.center.toArray()};}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this;}},zn=new N(),wa=new N(),wr=new N(),ri=new N(),Ca=new N(),Cr=new N(),Aa=new N(),Vs=class{constructor(t=new N(),e=new N(0,0,-1)){this.origin=t,this.direction=e;}set(t,e){return this.origin.copy(t),this.direction.copy(e),this;}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this;}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t);}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this;}recast(t){return this.origin.copy(this.at(t,zn)),this;}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n);}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t));}distanceSqToPoint(t){let e=zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zn.copy(this.origin).addScaledVector(this.direction,e),zn.distanceToSquared(t));}distanceSqToSegment(t,e,n,i){wa.copy(t).add(e).multiplyScalar(.5),wr.copy(e).sub(t).normalize(),ri.copy(this.origin).sub(wa);let r=t.distanceTo(e)*.5,o=-this.direction.dot(wr),a=ri.dot(this.direction),c=-ri.dot(wr),l=ri.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0){if(u=o*c-a,d=o*a-c,g=r*h,u>=0){if(d>=-g){if(d<=g){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l;}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;}else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;}else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);}else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(wa).addScaledVector(wr,d),p;}intersectSphere(t,e){zn.subVectors(t.center,this.origin);let n=zn.dot(this.direction),i=zn.dot(zn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e);}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius;}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null;}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e);}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0;}intersectBox(t,e){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e);}intersectsBox(t){return this.intersectBox(t,zn)!==null;}intersectTriangle(t,e,n,i,r){Ca.subVectors(e,t),Cr.subVectors(n,t),Aa.crossVectors(Ca,Cr);let o=this.direction.dot(Aa),a;if(o>0){if(i)return null;a=1;}else if(o<0)a=-1,o=-o;else return null;ri.subVectors(this.origin,t);let c=a*this.direction.dot(Cr.crossVectors(ri,Cr));if(c<0)return null;let l=a*this.direction.dot(Ca.cross(ri));if(l<0||c+l>o)return null;let h=-a*ri.dot(Aa);return h<0?null:this.at(h/o,r);}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this;}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction);}clone(){return new this.constructor().copy(this);}},Me=class s{constructor(t,e,n,i,r,o,a,c,l,h,u,d,p,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,u,d,p,g,_,m);}set(t,e,n,i,r,o,a,c,l,h,u,d,p,g,_,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this;}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this;}clone(){return new s().fromArray(this.elements);}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this;}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this;}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this;}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this;}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this;}extractRotation(t){let e=this.elements,n=t.elements,i=1/Ki.setFromMatrixColumn(t,0).length(),r=1/Ki.setFromMatrixColumn(t,1).length(),o=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this;}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+p*l,e[10]=o*c;}else if(t.order==="YXZ"){let d=c*h,p=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*c;}else if(t.order==="ZXY"){let d=c*h,p=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c;}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-p,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c;}else if(t.order==="YZX"){let d=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+g,e[10]=d-_*u;}else if(t.order==="XZY"){let d=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+d;}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this;}makeRotationFromQuaternion(t){return this.compose(Zu,t,$u);}lookAt(t,e,n){let i=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),oi.crossVectors(n,Je),oi.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),oi.crossVectors(n,Je)),oi.normalize(),Ar.crossVectors(Je,oi),i[0]=oi.x,i[4]=Ar.x,i[8]=Je.x,i[1]=oi.y,i[5]=Ar.y,i[9]=Je.y,i[2]=oi.z,i[6]=Ar.z,i[10]=Je.z,this;}multiply(t){return this.multiplyMatrices(this,t);}premultiply(t){return this.multiplyMatrices(t,this);}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],T=n[3],S=n[7],x=n[11],C=n[15],A=i[0],R=i[4],O=i[8],M=i[12],b=i[1],w=i[5],z=i[9],H=i[13],X=i[2],Z=i[6],Y=i[10],$=i[14],k=i[3],ot=i[7],dt=i[11],Et=i[15];return r[0]=o*A+a*b+c*X+l*k,r[4]=o*R+a*w+c*Z+l*ot,r[8]=o*O+a*z+c*Y+l*dt,r[12]=o*M+a*H+c*$+l*Et,r[1]=h*A+u*b+d*X+p*k,r[5]=h*R+u*w+d*Z+p*ot,r[9]=h*O+u*z+d*Y+p*dt,r[13]=h*M+u*H+d*$+p*Et,r[2]=g*A+_*b+m*X+f*k,r[6]=g*R+_*w+m*Z+f*ot,r[10]=g*O+_*z+m*Y+f*dt,r[14]=g*M+_*H+m*$+f*Et,r[3]=T*A+S*b+x*X+C*k,r[7]=T*R+S*w+x*Z+C*ot,r[11]=T*O+S*z+x*Y+C*dt,r[15]=T*M+S*H+x*$+C*Et,this;}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this;}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*p-n*c*p)+_*(+e*c*p-e*l*d+r*o*d-i*o*p+i*l*h-r*c*h)+m*(+e*l*u-e*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h);}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this;}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this;}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],T=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,S=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,x=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,C=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,A=e*T+n*S+i*x+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return t[0]=T*R,t[1]=(_*d*r-u*m*r-_*i*p+n*m*p+u*i*f-n*d*f)*R,t[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*f+n*c*f)*R,t[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*p-n*c*p)*R,t[4]=S*R,t[5]=(h*m*r-g*d*r+g*i*p-e*m*p-h*i*f+e*d*f)*R,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*f-e*c*f)*R,t[7]=(o*d*r-h*c*r+h*i*l-e*d*l-o*i*p+e*c*p)*R,t[8]=x*R,t[9]=(g*u*r-h*_*r-g*n*p+e*_*p+h*n*f-e*u*f)*R,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*f+e*a*f)*R,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*p-e*a*p)*R,t[12]=C*R,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*m+e*u*m)*R,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*m-e*a*m)*R,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*R,this;}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this;}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i));}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this;}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this;}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this;}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this;}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this;}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this;}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this;}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,T=c*l,S=c*h,x=c*u,C=n.x,A=n.y,R=n.z;return i[0]=(1-(_+f))*C,i[1]=(p+x)*C,i[2]=(g-S)*C,i[3]=0,i[4]=(p-x)*A,i[5]=(1-(d+f))*A,i[6]=(m+T)*A,i[7]=0,i[8]=(g+S)*R,i[9]=(m-T)*R,i[10]=(1-(d+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this;}decompose(t,e,n){let i=this.elements,r=Ki.set(i[0],i[1],i[2]).length(),o=Ki.set(i[4],i[5],i[6]).length(),a=Ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],yn.copy(this);let l=1/r,h=1/o,u=1/a;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,e.setFromRotationMatrix(yn),n.x=r,n.y=o,n.z=a,this;}makePerspective(t,e,n,i,r,o,a=xn,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),p=(n+i)/(n-i),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===xn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===ks)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this;}makeOrthographic(t,e,n,i,r,o,a=xn,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),p=-(n+i)/(n-i),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===xn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===ks)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this;}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0;}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this;}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t;}},Ki=new N(),yn=new Me(),Zu=new N(0,0,0),$u=new N(1,1,1),oi=new N(),Ar=new N(),Je=new N(),Cc=new Me(),Ac=new $n(),Pi=(()=>{class s{constructor(e=0,n=0,i=0,r=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r;}get x(){return this._x;}set x(e){this._x=e,this._onChangeCallback();}get y(){return this._y;}set y(e){this._y=e,this._onChangeCallback();}get z(){return this._z;}set z(e){this._z=e,this._onChangeCallback();}get order(){return this._order;}set order(e){this._order=e,this._onChangeCallback();}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this;}clone(){return new this.constructor(this._x,this._y,this._z,this._order);}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this;}setFromRotationMatrix(e,n=this._order,i=!0){let r=e.elements,o=r[0],a=r[4],c=r[8],l=r[1],h=r[5],u=r[9],d=r[2],p=r[6],g=r[10];switch(n){case"XYZ":this._y=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n);}return this._order=n,i===!0&&this._onChangeCallback(),this;}setFromQuaternion(e,n,i){return Cc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cc,n,i);}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n);}reorder(e){return Ac.setFromEuler(this),this.setFromQuaternion(Ac,e);}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order;}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this;}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e;}_onChange(e){return this._onChangeCallback=e,this;}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order;}}return s.DEFAULT_ORDER="XYZ",s;})(),ds=class{constructor(){this.mask=1;}set(t){this.mask=(1<<t|0)>>>0;}enable(t){this.mask|=1<<t|0;}enableAll(){this.mask=-1;}toggle(t){this.mask^=1<<t|0;}disable(t){this.mask&=~(1<<t|0);}disableAll(){this.mask=0;}test(t){return(this.mask&t.mask)!==0;}isEnabled(t){return(this.mask&(1<<t|0))!==0;}},Ku=0,Pc=new N(),Ji=new $n(),Vn=new Me(),Pr=new N(),Ls=new N(),Ju=new N(),ju=new $n(),Rc=new N(1,0,0),Ic=new N(0,1,0),Oc=new N(0,0,1),Dc={type:"added"},Qu={type:"removed"},ji={type:"childadded",child:null},Pa={type:"childremoved",child:null},gi=(()=>{class s extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new N(),n=new Pi(),i=new $n(),r=new N(1,1,1);function o(){i.setFromEuler(n,!1);}function a(){n.setFromQuaternion(i,void 0,!1);}n._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Me()},normalMatrix:{value:new Ht()}}),this.matrix=new Me(),this.matrixWorld=new Me(),this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ds(),this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={};}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale);}applyQuaternion(e){return this.quaternion.premultiply(e),this;}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n);}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0);}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e);}setRotationFromQuaternion(e){this.quaternion.copy(e);}rotateOnAxis(e,n){return Ji.setFromAxisAngle(e,n),this.quaternion.multiply(Ji),this;}rotateOnWorldAxis(e,n){return Ji.setFromAxisAngle(e,n),this.quaternion.premultiply(Ji),this;}rotateX(e){return this.rotateOnAxis(Rc,e);}rotateY(e){return this.rotateOnAxis(Ic,e);}rotateZ(e){return this.rotateOnAxis(Oc,e);}translateOnAxis(e,n){return Pc.copy(e).applyQuaternion(this.quaternion),this.position.add(Pc.multiplyScalar(n)),this;}translateX(e){return this.translateOnAxis(Rc,e);}translateY(e){return this.translateOnAxis(Ic,e);}translateZ(e){return this.translateOnAxis(Oc,e);}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld);}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert());}lookAt(e,n,i){e.isVector3?Pr.copy(e):Pr.set(e,n,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Ls,Pr,this.up):Vn.lookAt(Pr,Ls,this.up),this.quaternion.setFromRotationMatrix(Vn),r&&(Vn.extractRotation(r.matrixWorld),Ji.setFromRotationMatrix(Vn),this.quaternion.premultiply(Ji.invert()));}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this;}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dc),ji.child=e,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this);}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this;}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Qu),Pa.child=e,this.dispatchEvent(Pa),Pa.child=null),this;}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this;}clear(){return this.remove(...this.children);}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dc),ji.child=e,this.dispatchEvent(ji),ji.child=null,this;}getObjectById(e){return this.getObjectByProperty("id",e);}getObjectByName(e){return this.getObjectByProperty("name",e);}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a;}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].getObjectsByProperty(e,n,i);return i;}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld);}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,e,Ju),e;}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,ju,e),e;}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize();}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e);}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e);}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e));}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0;}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e);}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0);}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>mn(zt({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>zt({},c)),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid;}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){let d=l[h];o(e.shapes,d);}else o(e.shapes,l);}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,h=this.material.length;l<h;l++)c.push(o(e.materials,this.material[l]));r.material=c;}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object);}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];r.animations.push(o(e.animations,l));}}if(n){let c=a(e.geometries),l=a(e.materials),h=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),g=a(e.animations),_=a(e.nodes);c.length>0&&(i.geometries=c),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_);}return i.object=r,i;function a(c){let l=[];for(let h in c){let u=c[h];delete u.metadata,l.push(u);}return l;}}clone(e){return new this.constructor().copy(this,e);}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone());}return this;}}return s.DEFAULT_UP=new N(0,1,0),s.DEFAULT_MATRIX_AUTO_UPDATE=!0,s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,s;})(),vn=new N(),Gn=new N(),Ra=new N(),Wn=new N(),Qi=new N(),ts=new N(),Lc=new N(),Ia=new N(),Oa=new N(),Da=new N(),La=new Se(),Fa=new Se(),Na=new Se(),ci=class s{constructor(t=new N(),e=new N(),n=new N()){this.a=t,this.b=e,this.c=n;}static getNormal(t,e,n,i){i.subVectors(n,e),vn.subVectors(t,e),i.cross(vn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0);}static getBarycoord(t,e,n,i,r){vn.subVectors(i,e),Gn.subVectors(n,e),Ra.subVectors(t,e);let o=vn.dot(vn),a=vn.dot(Gn),c=vn.dot(Ra),l=Gn.dot(Gn),h=Gn.dot(Ra),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p);}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1;}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,Wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Wn.x),c.addScaledVector(o,Wn.y),c.addScaledVector(a,Wn.z),c);}static getInterpolatedAttribute(t,e,n,i,r,o){return La.setScalar(0),Fa.setScalar(0),Na.setScalar(0),La.fromBufferAttribute(t,e),Fa.fromBufferAttribute(t,n),Na.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(La,r.x),o.addScaledVector(Fa,r.y),o.addScaledVector(Na,r.z),o;}static isFrontFacing(t,e,n,i){return vn.subVectors(n,e),Gn.subVectors(t,e),vn.cross(Gn).dot(i)<0;}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this;}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this;}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this;}clone(){return new this.constructor().copy(this);}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this;}getArea(){return vn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),vn.cross(Gn).length()*.5;}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3);}getNormal(t){return s.getNormal(this.a,this.b,this.c,t);}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c);}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e);}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r);}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c);}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t);}intersectsBox(t){return t.intersectsTriangle(this);}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Qi.subVectors(i,n),ts.subVectors(r,n),Ia.subVectors(t,n);let c=Qi.dot(Ia),l=ts.dot(Ia);if(c<=0&&l<=0)return e.copy(n);Oa.subVectors(t,i);let h=Qi.dot(Oa),u=ts.dot(Oa);if(h>=0&&u<=h)return e.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Qi,o);Da.subVectors(t,r);let p=Qi.dot(Da),g=ts.dot(Da);if(g>=0&&p<=g)return e.copy(r);let _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ts,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Lc.subVectors(r,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Lc,a);let f=1/(m+_+d);return o=_*f,a=d*f,e.copy(n).addScaledVector(Qi,o).addScaledVector(ts,a);}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c);}},Oh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function Ua(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s;}var te=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n);}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i);}else this.setRGB(t,e,n);return this;}setScalar(t){return this.r=t,this.g=t,this.b=t,this;}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this;}setRGB(t,e,n,i=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,i),this;}setHSL(t,e,n,i=Jt.workingColorSpace){if(t=ul(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ua(o,r,t+1/3),this.g=Ua(o,r,t),this.b=Ua(o,r,t-1/3);}return Jt.colorSpaceToWorking(this,i),this;}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.");}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t);}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t);}else if(t&&t.length>0)return this.setColorName(t,e);return this;}setColorName(t,e=Ie){let n=Oh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this;}clone(){return new this.constructor(this.r,this.g,this.b);}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this;}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this;}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this;}convertSRGBToLinear(){return this.copySRGBToLinear(this),this;}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this;}getHex(t=Ie){return Jt.workingToColorSpace(He.copy(this),t),Math.round(Zt(He.r*255,0,255))*65536+Math.round(Zt(He.g*255,0,255))*256+Math.round(Zt(He.b*255,0,255));}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6);}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(He.copy(this),e);let n=He.r,i=He.g,r=He.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break;}c/=6;}return t.h=c,t.s=l,t.l=h,t;}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t;}getStyle(t=Ie){Jt.workingToColorSpace(He.copy(this),t);let e=He.r,n=He.g,i=He.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`;}offsetHSL(t,e,n){return this.getHSL(ai),this.setHSL(ai.h+t,ai.s+e,ai.l+n);}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this;}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this;}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this;}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this;}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this;}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this;}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this;}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this;}lerpHSL(t,e){this.getHSL(ai),t.getHSL(Rr);let n=Us(ai.h,Rr.h,e),i=Us(ai.s,Rr.s,e),r=Us(ai.l,Rr.l,e);return this.setHSL(n,i,r),this;}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this;}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this;}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b;}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this;}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t;}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this;}toJSON(){return this.getHex();}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b;}},He=new te();te.NAMES=Oh;var td=0,tn=class extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=vs(),this.name="",this.type="Material",this.blending=Ei,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gr,this.blendDst=Wr,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=wi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0;}get alphaTest(){return this._alphaTest;}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t;}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString();}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue;}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue;}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n;}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gr&&(n.blendSrc=this.blendSrc),this.blendDst!==Wr&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c);}return o;}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o);}return n;}clone(){return new this.constructor().copy(this);}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone();}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this;}dispose(){this.dispatchEvent({type:"dispose"});}set needsUpdate(t){t===!0&&this.version++;}},dn=class extends tn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi(),this.combine=tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t);}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this;}};var Ae=new N(),Ir=new $t(),ed=0,Qe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ed++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ya,this.updateRanges=[],this.gpuType=Ln,this.version=0;}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++;}setUsage(t){return this.usage=t,this;}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e});}clearUpdateRanges(){this.updateRanges.length=0;}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this;}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this;}copyArray(t){return this.array.set(t),this;}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ir.fromBufferAttribute(this,e),Ir.applyMatrix3(t),this.setXY(e,Ir.x,Ir.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this;}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this;}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this;}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this;}set(t,e=0){return this.array.set(t,e),this;}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rs(n,this.array)),n;}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this;}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rs(e,this.array)),e;}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this;}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rs(e,this.array)),e;}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this;}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rs(e,this.array)),e;}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this;}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rs(e,this.array)),e;}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this;}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this;}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this;}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this;}onUpload(t){return this.onUploadCallback=t,this;}clone(){return new this.constructor(this.array,this.itemSize).copy(this);}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ya&&(t.usage=this.usage),t;}};var Gs=class extends Qe{constructor(t,e,n){super(new Uint16Array(t),e,n);}};var Ws=class extends Qe{constructor(t,e,n){super(new Uint32Array(t),e,n);}};var wn=class extends Qe{constructor(t,e,n){super(new Float32Array(t),e,n);}},nd=0,cn=new Me(),Ba=new gi(),es=new N(),je=new An(),Fs=new An(),Ne=new N(),ui=class s extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={};}getIndex(){return this.index;}setIndex(t){return Array.isArray(t)?this.index=new(dl(t)?Ws:Gs)(t,1):this.index=t,this;}setIndirect(t){return this.indirect=t,this;}getIndirect(){return this.indirect;}getAttribute(t){return this.attributes[t];}setAttribute(t,e){return this.attributes[t]=e,this;}deleteAttribute(t){return delete this.attributes[t],this;}hasAttribute(t){return this.attributes[t]!==void 0;}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n});}clearGroups(){this.groups=[];}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e;}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0;}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this;}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this;}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this;}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this;}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this;}translate(t,e,n){return cn.makeTranslation(t,e,n),this.applyMatrix4(cn),this;}scale(t,e,n){return cn.makeScale(t,e,n),this.applyMatrix4(cn),this;}lookAt(t){return Ba.lookAt(t),Ba.updateMatrix(),this.applyMatrix4(Ba.matrix),this;}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this;}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0);}this.setAttribute("position",new wn(n,3));}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0);}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0;}return this;}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An());let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return;}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max));}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this);}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new us());let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N(),1/0);return;}if(t){let n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Fs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(je.min,Fs.min),je.expandByPoint(Ne),Ne.addVectors(je.max,Fs.max),je.expandByPoint(Ne)):(je.expandByPoint(Fs.min),je.expandByPoint(Fs.max));}je.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ne.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ne));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ne.fromBufferAttribute(a,l),c&&(es.fromBufferAttribute(t,l),Ne.add(es)),i=Math.max(i,n.distanceToSquared(Ne));}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this);}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return;}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let O=0;O<n.count;O++)a[O]=new N(),c[O]=new N();let l=new N(),h=new N(),u=new N(),d=new $t(),p=new $t(),g=new $t(),_=new N(),m=new N();function f(O,M,b){l.fromBufferAttribute(n,O),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,O),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),p.sub(d),g.sub(d);let w=1/(p.x*g.y-g.x*p.y);isFinite(w)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(w),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(w),a[O].add(_),a[M].add(_),a[b].add(_),c[O].add(m),c[M].add(m),c[b].add(m));}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let O=0,M=T.length;O<M;++O){let b=T[O],w=b.start,z=b.count;for(let H=w,X=w+z;H<X;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2));}let S=new N(),x=new N(),C=new N(),A=new N();function R(O){C.fromBufferAttribute(i,O),A.copy(C);let M=a[O];S.copy(M),S.sub(C.multiplyScalar(C.dot(M))).normalize(),x.crossVectors(A,M);let w=x.dot(c[O])<0?-1:1;o.setXYZW(O,S.x,S.y,S.z,w);}for(let O=0,M=T.length;O<M;++O){let b=T[O],w=b.start,z=b.count;for(let H=w,X=w+z;H<X;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2));}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new N(),r=new N(),o=new N(),a=new N(),c=new N(),l=new N(),h=new N(),u=new N();if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z);}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0;}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z);}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++];}return new Qe(d,h,u);}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s(),n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=t(c,n);e.setAttribute(a,l);}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=t(d,n);c.push(p);}e.morphAttributes[a]=c;}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex);}return e;}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t;}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data);}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(t.data));}h.length>0&&(i[c]=h,r=!0);}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t;}clone(){return new this.constructor().copy(this);}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(e));}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h;}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex);}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this;}dispose(){this.dispatchEvent({type:"dispose"});}},Fc=new Me(),Mi=new Vs(),Or=new us(),Nc=new N(),Dr=new N(),Lr=new N(),Fr=new N(),Ha=new N(),Nr=new N(),Uc=new N(),Ur=new N(),Ue=class extends gi{constructor(t=new ui(),e=new dn()){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets();}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this;}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r;}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Nr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Ha.fromBufferAttribute(u,t),o?Nr.addScaledVector(Ha,h):Nr.addScaledVector(Ha.sub(e),h));}e.add(Nr);}return e;}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(Or.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Or,Nc)===null||Mi.origin.distanceToSquared(Nc)>(t.far-t.near)**2))&&(Fc.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(Fc),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)));}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null){if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,C=S;x<C;x+=3){let A=a.getX(x),R=a.getX(x+1),O=a.getX(x+2);i=Br(this,f,t,n,l,h,u,A,R,O),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i));}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let T=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);i=Br(this,o,t,n,l,h,u,T,S,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i));}}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,C=S;x<C;x+=3){let A=x,R=x+1,O=x+2;i=Br(this,f,t,n,l,h,u,A,R,O),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i));}}else{let g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let T=m,S=m+1,x=m+2;i=Br(this,o,t,n,l,h,u,T,S,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i));}}}};function id(s,t,e,n,i,r,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===qn,a),c===null)return null;Ur.copy(a),Ur.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Ur);return l<e.near||l>e.far?null:{distance:l,point:Ur.clone(),object:s};}function Br(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,Dr),s.getVertexPosition(c,Lr),s.getVertexPosition(l,Fr);let h=id(s,t,e,n,Dr,Lr,Fr,Uc);if(h){let u=new N();ci.getBarycoord(Uc,Dr,Lr,Fr,u),i&&(h.uv=ci.getInterpolatedAttribute(i,a,c,l,u,new $t())),r&&(h.uv1=ci.getInterpolatedAttribute(r,a,c,l,u,new $t())),o&&(h.normal=ci.getInterpolatedAttribute(o,a,c,l,u,new N()),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new N(),materialIndex:0};ci.getNormal(Dr,Lr,Fr,d.normal),h.face=d,h.barycoord=u;}return h;}var fs=class s extends ui{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new wn(l,3)),this.setAttribute("normal",new wn(h,3)),this.setAttribute("uv",new wn(u,2));function g(_,m,f,T,S,x,C,A,R,O,M){let b=x/R,w=C/O,z=x/2,H=C/2,X=A/2,Z=R+1,Y=O+1,$=0,k=0,ot=new N();for(let dt=0;dt<Y;dt++){let Et=dt*w-H;for(let Gt=0;Gt<Z;Gt++){let pe=Gt*b-z;ot[_]=pe*T,ot[m]=Et*S,ot[f]=X,l.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[f]=A>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(Gt/R),u.push(1-dt/O),$+=1;}}for(let dt=0;dt<O;dt++)for(let Et=0;Et<R;Et++){let Gt=d+Et+Z*dt,pe=d+Et+Z*(dt+1),le=d+(Et+1)+Z*(dt+1),W=d+(Et+1)+Z*dt;c.push(Gt,pe,W),c.push(pe,le,W),k+=6;}a.addGroup(p,k,M),p+=k,d+=$;}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this;}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments);}};function Li(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i;}}return t;}function ze(s){let t={};for(let e=0;e<s.length;e++){let n=Li(s[e]);for(let i in n)t[i]=n[i];}return t;}function sd(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t;}function fl(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace;}var Dh={clone:Li,merge:ze},rd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends tn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rd,this.fragmentShader=od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t);}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Li(t.uniforms),this.uniformsGroups=sd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this;}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o};}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e;}},Xs=class extends gi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me(),this.projectionMatrix=new Me(),this.projectionMatrixInverse=new Me(),this.coordinateSystem=xn,this._reversedDepth=!1;}get reversedDepth(){return this._reversedDepth;}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this;}getWorldDirection(t){return super.getWorldDirection(t).negate();}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert();}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert();}clone(){return new this.constructor().copy(this);}},li=new N(),Bc=new $t(),Hc=new $t(),ke=class extends Xs{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix();}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this;}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ls*2*Math.atan(e),this.updateProjectionMatrix();}getFocalLength(){let t=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/t;}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom);}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1);}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1);}getViewBounds(t,e,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(li.x,li.y).multiplyScalar(-t/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-t/li.z);}getViewSize(t,e){return this.getViewBounds(t,Bc,Hc),e.subVectors(Hc,Bc);}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix();}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix();}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l;}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert();}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e;}},ns=-90,is=1,Jr=class extends gi{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new ke(ns,is,t,e);i.layers=this.layers,this.add(i);let r=new ke(ns,is,t,e);r.layers=this.layers,this.add(r);let o=new ke(ns,is,t,e);o.layers=this.layers,this.add(o);let a=new ke(ns,is,t,e);a.layers=this.layers,this.add(a);let c=new ke(ns,is,t,e);c.layers=this.layers,this.add(c);let l=new ke(ns,is,t,e);l.layers=this.layers,this.add(l);}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ks)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld();}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0;}},Ys=class extends nn{constructor(t=[],e=Oi,n,i,r,o,a,c,l,h){super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1;}get images(){return this.image;}set images(t){this.image=t;}},jr=class extends Cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ys(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0;}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new fs(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Kn});r.uniforms.tEquirect.value=e;let o=new Ue(i,r),a=e.minFilter;return e.minFilter===On&&(e.minFilter=Xe),new Jr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this;}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r);}},Xn=class extends gi{constructor(){super(),this.isGroup=!0,this.type="Group";}},ad={type:"move"},ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null;}getHandSpace(){return this._hand===null&&(this._hand=new Xn(),this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand;}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xn(),this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N(),this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N()),this._targetRay;}getGripSpace(){return this._grip===null&&(this._grip=new Xn(),this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N(),this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N()),this._grip;}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this;}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n);}return this.dispatchEvent({type:"connected",data:t}),this;}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this;}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null;}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}));}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ad)));}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this;}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Xn();n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n);}return t.joints[e.jointName];}};var qs=class extends gi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pi(),this.environmentIntensity=1,this.environmentRotation=new Pi(),this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}));}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this;}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e;}};var ka=new N(),ld=new N(),cd=new Ht(),hn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e;}set(t,e){return this.normal.copy(t),this.constant=e,this;}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this;}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this;}setFromCoplanarPoints(t,e,n){let i=ka.subVectors(n,e).cross(ld.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this;}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this;}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this;}negate(){return this.constant*=-1,this.normal.negate(),this;}distanceToPoint(t){return this.normal.dot(t)+this.constant;}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius;}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t));}intersectLine(t,e){let n=t.delta(ka),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r);}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0;}intersectsBox(t){return t.intersectsPlane(this);}intersectsSphere(t){return t.intersectsPlane(this);}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant);}applyMatrix4(t,e){let n=e||cd.getNormalMatrix(t),i=this.coplanarPoint(ka).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this;}translate(t){return this.constant-=t.dot(this.normal),this;}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant;}clone(){return new this.constructor().copy(this);}},Si=new us(),hd=new $t(.5,.5),Hr=new N(),Ri=class{constructor(t=new hn(),e=new hn(),n=new hn(),i=new hn(),r=new hn(),o=new hn()){this.planes=[t,e,n,i,r,o];}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this;}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this;}setFromProjectionMatrix(t,e=xn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],T=r[12],S=r[13],x=r[14],C=r[15];if(i[0].setComponents(l-o,p-h,f-g,C-T).normalize(),i[1].setComponents(l+o,p+h,f+g,C+T).normalize(),i[2].setComponents(l+a,p+u,f+_,C+S).normalize(),i[3].setComponents(l-a,p-u,f-_,C-S).normalize(),n)i[4].setComponents(c,d,m,x).normalize(),i[5].setComponents(l-c,p-d,f-m,C-x).normalize();else if(i[4].setComponents(l-c,p-d,f-m,C-x).normalize(),e===xn)i[5].setComponents(l+c,p+d,f+m,C+x).normalize();else if(e===ks)i[5].setComponents(c,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this;}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);}return this.intersectsSphere(Si);}intersectsSprite(t){Si.center.set(0,0,0);let e=hd.distanceTo(t.center);return Si.radius=.7071067811865476+e,Si.applyMatrix4(t.matrixWorld),this.intersectsSphere(Si);}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0;}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Hr.x=i.normal.x>0?t.max.x:t.min.x,Hr.y=i.normal.y>0?t.max.y:t.min.y,Hr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Hr)<0)return!1;}return!0;}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0;}clone(){return new this.constructor().copy(this);}};var di=class extends nn{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0;}},Zs=class extends nn{constructor(t,e,n=mi,i,r,o,a=un,c=un,l,h=as,u=1){if(h!==as&&h!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null;}copy(t){return super.copy(t),this.source=new hs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this;}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e;}};var Pn=class s extends ui{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let T=f*d-o;for(let S=0;S<l;S++){let x=S*u-r;g.push(x,-T,0),_.push(0,0,1),m.push(S/a),m.push(1-f/c);}}for(let f=0;f<c;f++)for(let T=0;T<a;T++){let S=T+l*f,x=T+l*(f+1),C=T+1+l*(f+1),A=T+1+l*f;p.push(S,x,A),p.push(x,C,A);}this.setIndex(p),this.setAttribute("position",new wn(g,3)),this.setAttribute("normal",new wn(_,3)),this.setAttribute("uv",new wn(m,2));}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this;}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments);}};var Qr=class extends tn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t);}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this;}},to=class extends tn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t);}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this;}};function kr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s);}function ud(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView);}var Ii=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={};}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1);}if(n===a)break;if(r=i,i=e[++n],t<i)break e;}o=e.length;break n;}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break e;}o=n,n=0;break n;}break t;}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1;}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1);}this._cachedIndex=n,this.intervalChanged_(n,r,i);}return this.interpolate_(n,r,t,i);}getSettings_(){return this.settings||this.DefaultSettings_;}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e;}interpolate_(){throw new Error("call to abstract method");}intervalChanged_(){}},eo=class extends Ii{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Va,endingEnd:Va};}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ga:r=t,a=2*e-n;break;case Wa:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n;}if(c===void 0)switch(this.getSettings_().endingEnd){case Ga:o=t,c=2*n-e;break;case Wa:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e;}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h;}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(i-e),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,T=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,S=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let C=0;C!==a;++C)r[C]=f*o[h+C]+T*o[l+C]+S*o[c+C]+x*o[u+C];return r;}},no=class extends Ii{constructor(t,e,n,i){super(t,e,n,i);}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r;}},io=class extends Ii{constructor(t,e,n,i){super(t,e,n,i);}interpolate_(t){return this.copySampleValue_(t-1);}},en=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=kr(e,this.TimeBufferType),this.values=kr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation);}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:kr(t.times,Array),values:kr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i);}return n.type=t.ValueTypeName,n;}InterpolantFactoryMethodDiscrete(t){return new io(this.times,this.values,this.getValueSize(),t);}InterpolantFactoryMethodLinear(t){return new no(this.times,this.values,this.getValueSize(),t);}InterpolantFactoryMethodSmooth(t){return new eo(this.times,this.values,this.getValueSize(),t);}setInterpolation(t){let e;switch(t){case Bs:e=this.InterpolantFactoryMethodDiscrete;break;case qr:e=this.InterpolantFactoryMethodLinear;break;case zr:e=this.InterpolantFactoryMethodSmooth;break;}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this;}return this.createInterpolant=e,this;}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return qr;case this.InterpolantFactoryMethodSmooth:return zr;}}getValueSize(){return this.values.length/this.times.length;}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;}return this;}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;}return this;}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a);}return this;}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break;}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break;}o=c;}if(i!==void 0&&ud(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break;}}return t;}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===zr,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[d+g]||_!==e[p+g]){c=!0;break;}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p];}++o;}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o;}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this;}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i;}};en.prototype.ValueTypeName="";en.prototype.TimeBufferType=Float32Array;en.prototype.ValueBufferType=Float32Array;en.prototype.DefaultInterpolation=qr;var fi=class extends en{constructor(t,e,n){super(t,e,n);}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=Bs;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends en{constructor(t,e,n,i){super(t,e,n,i);}};so.prototype.ValueTypeName="color";var ro=class extends en{constructor(t,e,n,i){super(t,e,n,i);}};ro.prototype.ValueTypeName="number";var oo=class extends Ii{constructor(t,e,n,i){super(t,e,n,i);}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e),l=t*a;for(let h=l+a;l!==h;l+=4)$n.slerpFlat(r,0,o,l-a,o,l,c);return r;}},$s=class extends en{constructor(t,e,n,i){super(t,e,n,i);}InterpolantFactoryMethodLinear(t){return new oo(this.times,this.values,this.getValueSize(),t);}};$s.prototype.ValueTypeName="quaternion";$s.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends en{constructor(t,e,n){super(t,e,n);}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=Bs;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends en{constructor(t,e,n,i){super(t,e,n,i);}};ao.prototype.ValueTypeName="vector";var Vr={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t);},get:function(s){if(this.enabled!==!1)return this.files[s];},remove:function(s){delete this.files[s];},clear:function(){this.files={};}},lo=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController(),this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0;},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad());},this.itemError=function(h){i.onError!==void 0&&i.onError(h);},this.resolveURL=function(h){return c?c(h):h;},this.setURLModifier=function(h){return c=h,this;},this.addHandler=function(h,u){return l.push(h,u),this;},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this;},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g;}return null;},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController(),this;};}},Lh=new lo(),pl=(()=>{class s{constructor(e){this.manager=e!==void 0?e:Lh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={};}load(){}loadAsync(e,n){let i=this;return new Promise(function(r,o){i.load(e,r,n,o);});}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this;}setWithCredentials(e){return this.withCredentials=e,this;}setPath(e){return this.path=e,this;}setResourcePath(e){return this.resourcePath=e,this;}setRequestHeader(e){return this.requestHeader=e,this;}abort(){return this;}}return s.DEFAULT_MATERIAL_NAME="__DEFAULT",s;})();var ss=new WeakMap(),co=class extends pl{constructor(t){super(t);}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Vr.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t);},0);else{let u=ss.get(o);u===void 0&&(u=[],ss.set(o,u)),u.push({onLoad:e,onError:i});}return o;}let a=cs("img");function c(){h(),e&&e(this);let u=ss.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this);}ss.delete(this),r.manager.itemEnd(t);}function l(u){h(),i&&i(u),Vr.remove(`image:${t}`);let d=ss.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u);}ss.delete(this),r.manager.itemError(t),r.manager.itemEnd(t);}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1);}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Vr.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a;}};var Ks=class extends pl{constructor(t){super(t);}load(t,e,n,i){let r=new nn(),o=new co(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r);},n,i),r;}},ho=class extends gi{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e;}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this;}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e;}};var uo=class extends Xs{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix();}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this;}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix();}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix();}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height;}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert();}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e;}};var Js=class extends ho{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight";}};var fo=class extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t;}},js=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1;}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0;}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1;}getElapsedTime(){return this.getDelta(),this.elapsedTime;}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t;}return t;}};var ml="\\[\\]\\.:\\/",dd=new RegExp("["+ml+"]","g"),gl="[^"+ml+"]",fd="[^"+ml.replace("\\.","")+"]",pd=/((?:WC+[\/:])*)/.source.replace("WC",gl),md=/(WCOD+)?/.source.replace("WCOD",fd),gd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gl),_d=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gl),yd=new RegExp("^"+pd+md+gd+_d+"$"),vd=["material","materials","bones","map"],qa=class{constructor(t,e,n){let i=n||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i);}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e);}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e);}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind();}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind();}},be=(()=>{class s{constructor(e,n,i){this.path=n,this.parsedPath=i||s.parseTrackName(n),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound;}static create(e,n,i){return e&&e.isAnimationObjectGroup?new s.Composite(e,n,i):new s(e,n,i);}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(dd,"");}static parseTrackName(e){let n=yd.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=i.nodeName.substring(r+1);vd.indexOf(o)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=o);}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i;}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i;}if(e.children){let i=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===n||c.uuid===n)return c;let l=i(c.children);if(l)return l;}return null;},r=i(e.children);if(r)return r;}return null;}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName];}_getValue_array(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)e[n++]=i[r];}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex];}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n);}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n];}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0;}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0;}_setValue_array(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];this.targetObject.needsUpdate=!0;}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0;}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n];}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0;}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0;}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n);}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0;}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0;}_getValue_unbound(e,n){this.bind(),this.getValue(e,n);}_setValue_unbound(e,n){this.bind(),this.setValue(e,n);}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,r=n.propertyName,o=n.propertyIndex;if(e||(e=s.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return;}if(i){let h=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return;}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return;}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return;}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break;}break;case"map":if("map"in e){e=e.map;break;}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return;}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return;}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return;}e=e[i];}if(h!==void 0){if(e[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return;}e=e[h];}}let a=e[r];if(a===void 0){let h=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",e);return;}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return;}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return;}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o]);}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o;}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c];}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound;}}return s.Composite=qa,s;})();be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nv=new Float32Array(1);var kc=new Me(),Qs=class{constructor(t,e,n=0,i=1/0){this.ray=new Vs(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ds(),this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}};}set(t,e){this.ray.set(t,e);}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type);}setFromXRController(t){return kc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kc),this;}intersectObject(t,e=!0,n=[]){return Za(t,this,n,e),n.sort(zc),n;}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Za(t[i],this,n,e);return n.sort(zc),n;}};function zc(s,t){return s.distance-t.distance;}function Za(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Za(r[o],t,e,!0);}}function _l(s,t,e,n){let i=xd(n);switch(e){case sl:return s*t;case ol:return s*t/i.components*i.byteLength;case Ao:return s*t/i.components*i.byteLength;case al:return s*t*2/i.components*i.byteLength;case Po:return s*t*2/i.components*i.byteLength;case rl:return s*t*3/i.components*i.byteLength;case fn:return s*t*4/i.components*i.byteLength;case Ro:return s*t*4/i.components*i.byteLength;case nr:case ir:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case sr:case rr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Oo:case Lo:return Math.max(s,16)*Math.max(t,8)/4;case Io:case Do:return Math.max(s,8)*Math.max(t,8)/2;case Fo:case No:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Uo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ko:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case zo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Go:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Yo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case qo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case $o:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ko:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case or:case jo:case Qo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ll:case ta:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ea:case na:return Math.ceil(s/4)*Math.ceil(t/4)*16;}throw new Error(`Unable to determine texture byte length for ${e} format.`);}function xd(s){switch(s){case Dn:case el:return{byteLength:1,components:1};case ms:case nl:case gs:return{byteLength:2,components:1};case wo:case Co:return{byteLength:2,components:4};case mi:case Eo:case Ln:return{byteLength:4,components:1};case il:return{byteLength:4,components:3};}throw new Error(`Unknown texture type ${s}.`);}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:po}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=po);function su(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i);}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0);},stop:function(){s.cancelAnimationFrame(n),t=!1;},setAnimationLoop:function(r){e=r;},setContext:function(r){s=r;}};}function bd(s){let t=new WeakMap();function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=s.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=s.SHORT;else if(l instanceof Uint32Array)p=s.UNSIGNED_INT;else if(l instanceof Int32Array)p=s.INT;else if(l instanceof Int8Array)p=s.BYTE;else if(l instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u};}function n(a,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_);}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let _=u[p];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count);}c.clearUpdateRanges();}c.onUploadCallback();}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a);}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a));}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return;}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version;}}return{get:i,remove:r,update:o};}var Md=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Td=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ad=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Id=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Od=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ld=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Xd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$d=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_f=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,If=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Of=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Df=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ff=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$f=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,up=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_p=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ip=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Up=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Md,alphahash_pars_fragment:Sd,alphamap_fragment:Td,alphamap_pars_fragment:Ed,alphatest_fragment:wd,alphatest_pars_fragment:Cd,aomap_fragment:Ad,aomap_pars_fragment:Pd,batching_pars_vertex:Rd,batching_vertex:Id,begin_vertex:Od,beginnormal_vertex:Dd,bsdfs:Ld,iridescence_fragment:Fd,bumpmap_pars_fragment:Nd,clipping_planes_fragment:Ud,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:Hd,clipping_planes_vertex:kd,color_fragment:zd,color_pars_fragment:Vd,color_pars_vertex:Gd,color_vertex:Wd,common:Xd,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:qd,displacementmap_pars_vertex:Zd,displacementmap_vertex:$d,emissivemap_fragment:Kd,emissivemap_pars_fragment:Jd,colorspace_fragment:jd,colorspace_pars_fragment:Qd,envmap_fragment:tf,envmap_common_pars_fragment:ef,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:mf,envmap_vertex:rf,fog_vertex:of,fog_pars_vertex:af,fog_fragment:lf,fog_pars_fragment:cf,gradientmap_pars_fragment:hf,lightmap_pars_fragment:uf,lights_lambert_fragment:df,lights_lambert_pars_fragment:ff,lights_pars_begin:pf,lights_toon_fragment:gf,lights_toon_pars_fragment:_f,lights_phong_fragment:yf,lights_phong_pars_fragment:vf,lights_physical_fragment:xf,lights_physical_pars_fragment:bf,lights_fragment_begin:Mf,lights_fragment_maps:Sf,lights_fragment_end:Tf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:wf,logdepthbuf_pars_vertex:Cf,logdepthbuf_vertex:Af,map_fragment:Pf,map_pars_fragment:Rf,map_particle_fragment:If,map_particle_pars_fragment:Of,metalnessmap_fragment:Df,metalnessmap_pars_fragment:Lf,morphinstance_vertex:Ff,morphcolor_vertex:Nf,morphnormal_vertex:Uf,morphtarget_pars_vertex:Bf,morphtarget_vertex:Hf,normal_fragment_begin:kf,normal_fragment_maps:zf,normal_pars_fragment:Vf,normal_pars_vertex:Gf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:Yf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:Zf,iridescence_pars_fragment:$f,opaque_fragment:Kf,packing:Jf,premultiplied_alpha_fragment:jf,project_vertex:Qf,dithering_fragment:tp,dithering_pars_fragment:ep,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:sp,shadowmap_pars_vertex:rp,shadowmap_vertex:op,shadowmask_pars_fragment:ap,skinbase_vertex:lp,skinning_pars_vertex:cp,skinning_vertex:hp,skinnormal_vertex:up,specularmap_fragment:dp,specularmap_pars_fragment:fp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:_p,uv_pars_fragment:yp,uv_pars_vertex:vp,uv_vertex:xp,worldpos_vertex:bp,background_vert:Mp,background_frag:Sp,backgroundCube_vert:Tp,backgroundCube_frag:Ep,cube_vert:wp,cube_frag:Cp,depth_vert:Ap,depth_frag:Pp,distanceRGBA_vert:Rp,distanceRGBA_frag:Ip,equirect_vert:Op,equirect_frag:Dp,linedashed_vert:Lp,linedashed_frag:Fp,meshbasic_vert:Np,meshbasic_frag:Up,meshlambert_vert:Bp,meshlambert_frag:Hp,meshmatcap_vert:kp,meshmatcap_frag:zp,meshnormal_vert:Vp,meshnormal_frag:Gp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:Yp,meshphysical_frag:qp,meshtoon_vert:Zp,meshtoon_frag:$p,points_vert:Kp,points_frag:Jp,shadow_vert:jp,shadow_frag:Qp,sprite_vert:tm,sprite_frag:em},rt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht()},alphaMap:{value:null},alphaMapTransform:{value:new Ht()},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht()}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht()},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht()}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht()}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht()},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht()},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht()},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht()}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht()}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht()}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht()},alphaTest:{value:0},uvTransform:{value:new Ht()}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht()},alphaMap:{value:null},alphaMapTransform:{value:new Ht()},alphaTest:{value:0}}},Fn={basic:{uniforms:ze([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:ze([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new te(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:ze([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:ze([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:ze([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new te(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:ze([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:ze([rt.points,rt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:ze([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:ze([rt.common,rt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:ze([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:ze([rt.sprite,rt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht()},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht()}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:ze([rt.common,rt.displacementmap,{referencePosition:{value:new N()},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:ze([rt.lights,rt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};Fn.physical={uniforms:ze([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht()},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht()},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht()},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht()},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht()},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht()},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht()},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht()},transmissionSamplerSize:{value:new $t()},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht()},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht()},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht()},anisotropyVector:{value:new $t()},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht()}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var ia={r:0,b:0,g:0},Fi=new Pi(),nm=new Me();function im(s,t,e,n,i,r,o){let a=new te(0),c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x;}function _(S){let x=!1,C=g(S);C===null?f(a,c):C&&C.isColor&&(f(C,1),x=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil));}function m(S,x){let C=g(x);C&&(C.isCubeTexture||C.mapping===tr)?(h===void 0&&(h=new Ue(new fs(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Li(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,R,O){this.matrixWorld.copyPosition(O.matrixWorld);},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value;}}),i.update(h)),Fi.copy(x.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(nm.makeRotationFromEuler(Fi)),h.material.toneMapped=Jt.getTransfer(C.colorSpace)!==oe,(u!==C||d!==C.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,p=s.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Ue(new Pn(2,2),new bn({name:"BackgroundMaterial",uniforms:Li(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value;}}),i.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(C.colorSpace)!==oe,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,u=C,d=C.version,p=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null));}function f(S,x){S.getRGB(ia,fl(s)),n.buffers.color.setClear(ia.r,ia.g,ia.b,x,o);}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0);}return{getClearColor:function(){return a;},setClearColor:function(S,x=1){a.set(S),c=x,f(a,c);},getClearAlpha:function(){return c;},setClearAlpha:function(S){c=S,f(a,c);},render:_,addToRenderList:m,dispose:T};}function sm(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(b,w,z,H,X){let Z=!1,Y=u(H,z,w);r!==Y&&(r=Y,l(r.object)),Z=p(b,H,z,X),Z&&g(b,H,z,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(b,w,z,H),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer));}function c(){return s.createVertexArray();}function l(b){return s.bindVertexArray(b);}function h(b){return s.deleteVertexArray(b);}function u(b,w,z){let H=z.wireframe===!0,X=n[b.id];X===void 0&&(X={},n[b.id]=X);let Z=X[w.id];Z===void 0&&(Z={},X[w.id]=Z);let Y=Z[H];return Y===void 0&&(Y=d(c()),Z[H]=Y),Y;}function d(b){let w=[],z=[],H=[];for(let X=0;X<e;X++)w[X]=0,z[X]=0,H[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:z,attributeDivisors:H,object:b,attributes:{},index:null};}function p(b,w,z,H){let X=r.attributes,Z=w.attributes,Y=0,$=z.getAttributes();for(let k in $)if($[k].location>=0){let dt=X[k],Et=Z[k];if(Et===void 0&&(k==="instanceMatrix"&&b.instanceMatrix&&(Et=b.instanceMatrix),k==="instanceColor"&&b.instanceColor&&(Et=b.instanceColor)),dt===void 0||dt.attribute!==Et||Et&&dt.data!==Et.data)return!0;Y++;}return r.attributesNum!==Y||r.index!==H;}function g(b,w,z,H){let X={},Z=w.attributes,Y=0,$=z.getAttributes();for(let k in $)if($[k].location>=0){let dt=Z[k];dt===void 0&&(k==="instanceMatrix"&&b.instanceMatrix&&(dt=b.instanceMatrix),k==="instanceColor"&&b.instanceColor&&(dt=b.instanceColor));let Et={};Et.attribute=dt,dt&&dt.data&&(Et.data=dt.data),X[k]=Et,Y++;}r.attributes=X,r.attributesNum=Y,r.index=H;}function _(){let b=r.newAttributes;for(let w=0,z=b.length;w<z;w++)b[w]=0;}function m(b){f(b,0);}function f(b,w){let z=r.newAttributes,H=r.enabledAttributes,X=r.attributeDivisors;z[b]=1,H[b]===0&&(s.enableVertexAttribArray(b),H[b]=1),X[b]!==w&&(s.vertexAttribDivisor(b,w),X[b]=w);}function T(){let b=r.newAttributes,w=r.enabledAttributes;for(let z=0,H=w.length;z<H;z++)w[z]!==b[z]&&(s.disableVertexAttribArray(z),w[z]=0);}function S(b,w,z,H,X,Z,Y){Y===!0?s.vertexAttribIPointer(b,w,z,X,Z):s.vertexAttribPointer(b,w,z,H,X,Z);}function x(b,w,z,H){_();let X=H.attributes,Z=z.getAttributes(),Y=w.defaultAttributeValues;for(let $ in Z){let k=Z[$];if(k.location>=0){let ot=X[$];if(ot===void 0&&($==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),$==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor)),ot!==void 0){let dt=ot.normalized,Et=ot.itemSize,Gt=t.get(ot);if(Gt===void 0)continue;let pe=Gt.buffer,le=Gt.type,W=Gt.bytesPerElement,at=le===s.INT||le===s.UNSIGNED_INT||ot.gpuType===Eo;if(ot.isInterleavedBufferAttribute){let it=ot.data,Rt=it.stride,It=ot.offset;if(it.isInstancedInterleavedBuffer){for(let Ut=0;Ut<k.locationSize;Ut++)f(k.location+Ut,it.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=it.meshPerAttribute*it.count);}else for(let Ut=0;Ut<k.locationSize;Ut++)m(k.location+Ut);s.bindBuffer(s.ARRAY_BUFFER,pe);for(let Ut=0;Ut<k.locationSize;Ut++)S(k.location+Ut,Et/k.locationSize,le,dt,Rt*W,(It+Et/k.locationSize*Ut)*W,at);}else{if(ot.isInstancedBufferAttribute){for(let it=0;it<k.locationSize;it++)f(k.location+it,ot.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ot.meshPerAttribute*ot.count);}else for(let it=0;it<k.locationSize;it++)m(k.location+it);s.bindBuffer(s.ARRAY_BUFFER,pe);for(let it=0;it<k.locationSize;it++)S(k.location+it,Et/k.locationSize,le,dt,Et*W,Et/k.locationSize*it*W,at);}}else if(Y!==void 0){let dt=Y[$];if(dt!==void 0)switch(dt.length){case 2:s.vertexAttrib2fv(k.location,dt);break;case 3:s.vertexAttrib3fv(k.location,dt);break;case 4:s.vertexAttrib4fv(k.location,dt);break;default:s.vertexAttrib1fv(k.location,dt);}}}}T();}function C(){O();for(let b in n){let w=n[b];for(let z in w){let H=w[z];for(let X in H)h(H[X].object),delete H[X];delete w[z];}delete n[b];}}function A(b){if(n[b.id]===void 0)return;let w=n[b.id];for(let z in w){let H=w[z];for(let X in H)h(H[X].object),delete H[X];delete w[z];}delete n[b.id];}function R(b){for(let w in n){let z=n[w];if(z[b.id]===void 0)continue;let H=z[b.id];for(let X in H)h(H[X].object),delete H[X];delete z[b.id];}}function O(){M(),o=!0,r!==i&&(r=i,l(r.object));}function M(){i.geometry=null,i.program=null,i.wireframe=!1;}return{setup:a,reset:O,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T};}function rm(s,t,e){let n;function i(l){n=l;}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1);}function o(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u));}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1);}function c(l,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1);}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c;}function om(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);}else i=0;return i;}function o(R){return!(R!==fn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT));}function a(R){let O=R===gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Dn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ln&&!O);}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump";}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp";}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),T=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:C,maxSamples:A};}function am(s){let t=this,e=null,n=0,i=!1,r=!1,o=new hn(),a=new Ht(),c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p;},this.beginShadows=function(){r=!0,h(null);},this.endShadows=function(){r=!1;},this.setGlobalState=function(u,d){e=h(u,d,0);},this.setState=function(u,d,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let T=r?0:n,S=T*4,x=f.clippingState||null;c.value=x,x=h(g,d,S,p);for(let C=0;C!==S;++C)x[C]=e[C];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T;}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0;}function h(u,d,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let f=p+_*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,x=p;S!==_;++S,x+=4)o.copy(u[S]).applyMatrix4(T,a),o.normal.toArray(m,x),m[x+3]=o.constant;}c.value=m,c.needsUpdate=!0;}return t.numPlanes=_,t.numIntersection=0,m;}}function lm(s){let t=new WeakMap();function e(o,a){return a===Mo?o.mapping=Oi:a===So&&(o.mapping=Di),o;}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Mo||a===So)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping);}else{let c=o.image;if(c&&c.height>0){let l=new jr(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping);}else return null;}}return o;}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose());}function r(){t=new WeakMap();}return{get:n,dispose:r};}var bs=4,Fh=[.125,.215,.35,.446,.526,.582],Bi=20,yl=new uo(),Nh=new te(),vl=null,xl=0,bl=0,Ml=!1,Ui=(1+Math.sqrt(5))/2,xs=1/Ui,Uh=[new N(-Ui,xs,0),new N(Ui,xs,0),new N(-xs,0,Ui),new N(xs,0,Ui),new N(0,Ui,-xs),new N(0,Ui,xs),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],cm=new N(),oa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial);}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=cm}=r;vl=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),bl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c;}fromEquirectangular(t,e=null){return this._fromTexture(t,e);}fromCubemap(t,e=null){return this._fromTexture(t,e);}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial));}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hh(),this._compileMaterial(this._equirectMaterial));}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose();}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax);}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose();}_cleanup(t){this._renderer.setRenderTarget(vl,xl,bl),this._renderer.xr.enabled=Ml,t.scissorTest=!1,sa(t,0,0,t.width,t.height);}_fromTexture(t,e){t.mapping===Oi||t.mapping===Di?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vl=this._renderer.getRenderTarget(),xl=this._renderer.getActiveCubeFace(),bl=this._renderer.getActiveMipmapLevel(),Ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n;}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:gs,format:fn,colorSpace:Ci,depthBuffer:!1},i=Bh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hm(r)),this._blurMaterial=um(r,t,e);}return i;}_compileMaterial(t){let e=new Ue(this._lodPlanes[0],t);this._renderer.compile(e,yl);}_sceneToCubeUV(t,e,n,i,r){let c=new ke(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Nh),u.toneMapping=Jn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let _=new dn({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),m=new Ue(new fs(),_),f=!1,T=t.background;T?T.isColor&&(_.color.copy(T),t.background=null,f=!0):(_.color.copy(Nh),f=!0);for(let S=0;S<6;S++){let x=S%3;x===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):x===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));let C=this._cubeSize;sa(i,x*C,S>2?C:0,C,C),u.setRenderTarget(i),f&&u.render(m,c),u.render(t,c);}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=T;}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Oi||t.mapping===Di;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hh());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ue(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;sa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,yl);}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Uh[(i-r-1)%Uh.length];this._blur(t,r-1,r,o,a);}e.autoClear=n;}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r);}_halfBlur(t,e,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ue(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Bi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Bi;m>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);let f=[],T=0;for(let R=0;R<Bi;++R){let O=R/_,M=Math.exp(-O*O/2);f.push(M),R===0?T+=M:R<m&&(T+=2*M);}for(let R=0;R<f.length;R++)f[R]=f[R]/T;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;let x=this._sizeLods[i],C=3*x*(i>S-bs?i-S+bs:0),A=4*(this._cubeSize-x);sa(e,C,A,3*x,2*x),c.setRenderTarget(e),c.render(u,yl);}};function hm(s){let t=[],e=[],n=[],i=s,r=s-bs+1+Fh.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let c=1/a;o>s-bs?c=Fh[o-s+bs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,T=new Float32Array(_*g*p),S=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let A=0;A<p;A++){let R=A%3*2/3-1,O=A>2?0:-1,M=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];T.set(M,_*g*A),S.set(d,m*g*A);let b=[A,A,A,A,A,A];x.set(b,f*g*A);}let C=new ui();C.setAttribute("position",new Qe(T,_)),C.setAttribute("uv",new Qe(S,m)),C.setAttribute("faceIndex",new Qe(x,f)),t.push(C),i>bs&&i--;}return{lodPlanes:t,sizeLods:e,sigmas:n};}function Bh(s,t,e){let n=new Cn(s,t,e);return n.texture.mapping=tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n;}function sa(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i);}function um(s,t,e){let n=new Float32Array(Bi),i=new N(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1});}function Hh(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1});}function kh(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1});}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;}function dm(s){let t=new WeakMap(),e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Mo||c===So,h=c===Oi||c===Di;if(l||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new oa(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new oa(s)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null;}}}return a;}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l;}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose());}function o(){t=new WeakMap(),e!==null&&(e.dispose(),e=null);}return{get:n,dispose:o};}function fm(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n);}return t[n]=i,i;}return{has:function(n){return e(n)!==null;},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent");},get:function(n){let i=e(n);return i===null&&Ai("THREE.WebGLRenderer: "+n+" extension not supported."),i;}};}function pm(s,t,e,n){let i={},r=new WeakMap();function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--;}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d;}function c(u){let d=u.attributes;for(let p in d)t.update(d[p],s.ARRAY_BUFFER);}function l(u){let d=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let T=p.array;_=p.version;for(let S=0,x=T.length;S<x;S+=3){let C=T[S+0],A=T[S+1],R=T[S+2];d.push(C,A,A,R,R,C);}}else if(g!==void 0){let T=g.array;_=g.version;for(let S=0,x=T.length/3-1;S<x;S+=3){let C=S+0,A=S+1,R=S+2;d.push(C,A,A,R,R,C);}}else return;let m=new(dl(d)?Ws:Gs)(d,1);m.version=_;let f=r.get(u);f&&t.remove(f),r.set(u,m);}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u);}else l(u);return r.get(u);}return{get:a,update:c,getWireframeAttribute:h};}function mm(s,t,e){let n;function i(d){n=d;}let r,o;function a(d){r=d.type,o=d.bytesPerElement;}function c(d,p){s.drawElements(n,p,r,d*o),e.update(p,n,1);}function l(d,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,d*o,g),e.update(p,n,g));}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1);}function u(d,p,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let T=0;T<g;T++)f+=p[T]*_[T];e.update(f,n,1);}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u;}function gm(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break;}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0;}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n};}function _m(s,t,e){let n=new WeakMap(),i=new Se();function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){O.dispose(),n.delete(a),a.removeEventListener("dispose",b);};var p=b;d!==void 0&&d.texture.dispose();let g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,A=1;C>t.maxTextureSize&&(A=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);let R=new Float32Array(C*A*4*u),O=new zs(R,C,A,u);O.type=Ln,O.needsUpdate=!0;let M=x*4;for(let w=0;w<u;w++){let z=f[w],H=T[w],X=S[w],Z=C*A*4*w;for(let Y=0;Y<z.count;Y++){let $=Y*M;g===!0&&(i.fromBufferAttribute(z,Y),R[Z+$+0]=i.x,R[Z+$+1]=i.y,R[Z+$+2]=i.z,R[Z+$+3]=0),_===!0&&(i.fromBufferAttribute(H,Y),R[Z+$+4]=i.x,R[Z+$+5]=i.y,R[Z+$+6]=i.z,R[Z+$+7]=0),m===!0&&(i.fromBufferAttribute(X,Y),R[Z+$+8]=i.x,R[Z+$+9]=i.y,R[Z+$+10]=i.z,R[Z+$+11]=X.itemSize===4?i.w:1);}}d={count:u,texture:O,size:new $t(C,A)},n.set(a,d),a.addEventListener("dispose",b);}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l);}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size);}return{update:r};}function ym(s,t,e,n){let i=new WeakMap();function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l));}return u;}function o(){i=new WeakMap();}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor);}return{update:r,dispose:o};}var ru=new nn(),zh=new Zs(1,1),ou=new zs(),au=new Kr(),lu=new Ys(),Vh=[],Gh=[],Wh=new Float32Array(16),Xh=new Float32Array(9),Yh=new Float32Array(4);function Ss(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Vh[i];if(r===void 0&&(r=new Float32Array(i),Vh[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a);}return r;}function Oe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0;}function De(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e];}function la(s,t){let e=Gh[t];e===void 0&&(e=new Int32Array(t),Gh[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e;}function vm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t);}function xm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;s.uniform2fv(this.addr,t),De(e,t);}}function bm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Oe(e,t))return;s.uniform3fv(this.addr,t),De(e,t);}}function Mm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;s.uniform4fv(this.addr,t),De(e,t);}}function Sm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),De(e,t);}else{if(Oe(e,n))return;Yh.set(n),s.uniformMatrix2fv(this.addr,!1,Yh),De(e,n);}}function Tm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),De(e,t);}else{if(Oe(e,n))return;Xh.set(n),s.uniformMatrix3fv(this.addr,!1,Xh),De(e,n);}}function Em(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),De(e,t);}else{if(Oe(e,n))return;Wh.set(n),s.uniformMatrix4fv(this.addr,!1,Wh),De(e,n);}}function wm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t);}function Cm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;s.uniform2iv(this.addr,t),De(e,t);}}function Am(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;s.uniform3iv(this.addr,t),De(e,t);}}function Pm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;s.uniform4iv(this.addr,t),De(e,t);}}function Rm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t);}function Im(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;s.uniform2uiv(this.addr,t),De(e,t);}}function Om(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;s.uniform3uiv(this.addr,t),De(e,t);}}function Dm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;s.uniform4uiv(this.addr,t),De(e,t);}}function Lm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(zh.compareFunction=cl,r=zh):r=ru,e.setTexture2D(t||r,i);}function Fm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||au,i);}function Nm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||lu,i);}function Um(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ou,i);}function Bm(s){switch(s){case 5126:return vm;case 35664:return xm;case 35665:return bm;case 35666:return Mm;case 35674:return Sm;case 35675:return Tm;case 35676:return Em;case 5124:case 35670:return wm;case 35667:case 35671:return Cm;case 35668:case 35672:return Am;case 35669:case 35673:return Pm;case 5125:return Rm;case 36294:return Im;case 36295:return Om;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Lm;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Um;}}function Hm(s,t){s.uniform1fv(this.addr,t);}function km(s,t){let e=Ss(t,this.size,2);s.uniform2fv(this.addr,e);}function zm(s,t){let e=Ss(t,this.size,3);s.uniform3fv(this.addr,e);}function Vm(s,t){let e=Ss(t,this.size,4);s.uniform4fv(this.addr,e);}function Gm(s,t){let e=Ss(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e);}function Wm(s,t){let e=Ss(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e);}function Xm(s,t){let e=Ss(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e);}function Ym(s,t){s.uniform1iv(this.addr,t);}function qm(s,t){s.uniform2iv(this.addr,t);}function Zm(s,t){s.uniform3iv(this.addr,t);}function $m(s,t){s.uniform4iv(this.addr,t);}function Km(s,t){s.uniform1uiv(this.addr,t);}function Jm(s,t){s.uniform2uiv(this.addr,t);}function jm(s,t){s.uniform3uiv(this.addr,t);}function Qm(s,t){s.uniform4uiv(this.addr,t);}function tg(s,t,e){let n=this.cache,i=t.length,r=la(e,i);Oe(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ru,r[o]);}function eg(s,t,e){let n=this.cache,i=t.length,r=la(e,i);Oe(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||au,r[o]);}function ng(s,t,e){let n=this.cache,i=t.length,r=la(e,i);Oe(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||lu,r[o]);}function ig(s,t,e){let n=this.cache,i=t.length,r=la(e,i);Oe(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||ou,r[o]);}function sg(s){switch(s){case 5126:return Hm;case 35664:return km;case 35665:return zm;case 35666:return Vm;case 35674:return Gm;case 35675:return Wm;case 35676:return Xm;case 5124:case 35670:return Ym;case 35667:case 35671:return qm;case 35668:case 35672:return Zm;case 35669:case 35673:return $m;case 5125:return Km;case 36294:return Jm;case 36295:return jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return tg;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig;}}var Tl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bm(e.type);}},El=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=sg(e.type);}},wl=class{constructor(t){this.id=t,this.seq=[],this.map={};}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n);}}},Sl=/(\w+)(\])?(\[|\.)?/g;function qh(s,t){s.seq.push(t),s.map[t.id]=t;}function rg(s,t,e){let n=s.name,i=n.length;for(Sl.lastIndex=0;;){let r=Sl.exec(n),o=Sl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){qh(e,l===void 0?new Tl(a,s,t):new El(a,s,t));break;}else{let u=e.map[a];u===void 0&&(u=new wl(a),qh(e,u)),e=u;}}}var Ms=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);rg(r,o,this);}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i);}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i);}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i);}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o);}return n;}};function Zh(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n;}var og=37297,ag=0;function lg(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`);}return n.join(`
`);}var $h=new Ht();function cg(s){Jt._getMatrix($h,Jt.workingColorSpace,s);let t=`mat3( ${$h.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(s)){case Hs:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"];}}function Kh(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+lg(s.getShaderSource(t),a);}else return r;}function hg(s,t){let e=cg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`);}function ug(s,t){let e;switch(t){case uh:e="Linear";break;case dh:e="Reinhard";break;case fh:e="Cineon";break;case ph:e="ACESFilmic";break;case gh:e="AgX";break;case _h:e="Neutral";break;case mh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear";}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }";}var ra=new N();function dg(){Jt.getLuminanceCoefficients(ra);let s=ra.x.toFixed(4),t=ra.y.toFixed(4),e=ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`);}function fg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`);}function pg(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n);}return t.join(`
`);}function mg(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a};}return e;}function ar(s){return s!=="";}function Jh(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows);}function jh(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection);}var gg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(s){return s.replace(gg,yg);}var _g=new Map();function yg(s,t){let e=Vt[t];if(e===void 0){let n=_g.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">");}return Cl(e);}var vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qh(s){return s.replace(vg,xg);}function xg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i;}function tu(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t;}function bg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ka?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Wc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t;}function Mg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Oi:case Di:t="ENVMAP_TYPE_CUBE";break;case tr:t="ENVMAP_TYPE_CUBE_UV";break;}return t;}function Sg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Di:t="ENVMAP_MODE_REFRACTION";break;}return t;}function Tg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case tl:t="ENVMAP_BLENDING_MULTIPLY";break;case ch:t="ENVMAP_BLENDING_MIX";break;case hh:t="ENVMAP_BLENDING_ADD";break;}return t;}function Eg(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e};}function wg(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=bg(e),l=Mg(e),h=Sg(e),u=Tg(e),d=Eg(e),p=fg(e),g=pg(r),_=i.createProgram(),m,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),f.length>0&&(f+=`
`)):(m=[tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),f=[tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?ug("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,hg("linearToOutputTexel",e.outputColorSpace),dg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),o=Cl(o),o=Jh(o,e),o=jh(o,e),a=Cl(a),a=Jh(a,e),a=jh(a,e),o=Qh(o),a=Qh(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=T+m+o,x=T+f+a,C=Zh(i,i.VERTEX_SHADER,S),A=Zh(i,i.FRAGMENT_SHADER,x);i.attachShader(_,C),i.attachShader(_,A),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(w){if(s.debug.checkShaderErrors){let z=i.getProgramInfoLog(_)||"",H=i.getShaderInfoLog(C)||"",X=i.getShaderInfoLog(A)||"",Z=z.trim(),Y=H.trim(),$=X.trim(),k=!0,ot=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1){if(k=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,A);else{let dt=Kh(i,C,"vertex"),Et=Kh(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+Z+`
`+dt+`
`+Et);}}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(Y===""||$==="")&&(ot=!1);ot&&(w.diagnostics={runnable:k,programLog:Z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:$,prefix:f}});}i.deleteShader(C),i.deleteShader(A),O=new Ms(i,_),M=mg(i,_);}let O;this.getUniforms=function(){return O===void 0&&R(this),O;};let M;this.getAttributes=function(){return M===void 0&&R(this),M;};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(_,og)),b;},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0;},this.type=e.shaderType,this.name=e.shaderName,this.id=ag++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=A,this;}var Cg=0,Al=class{constructor(){this.shaderCache=new Map(),this.materialCache=new Map();}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this;}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this;}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id;}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id;}dispose(){this.shaderCache.clear(),this.materialCache.clear();}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set(),e.set(t,n)),n;}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Pl(t),e.set(t,n)),n;}},Pl=class{constructor(t){this.id=Cg++,this.code=t,this.usedTimes=0;}};function Ag(s,t,e,n,i,r,o){let a=new ds(),c=new Al(),l=new Set(),h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`;}function m(M,b,w,z,H){let X=z.fog,Z=H.geometry,Y=M.isMeshStandardMaterial?z.environment:null,$=(M.isMeshStandardMaterial?e:t).get(M.envMap||Y),k=$&&$.mapping===tr?$.image.height:null,ot=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let dt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Et=dt!==void 0?dt.length:0,Gt=0;Z.morphAttributes.position!==void 0&&(Gt=1),Z.morphAttributes.normal!==void 0&&(Gt=2),Z.morphAttributes.color!==void 0&&(Gt=3);let pe,le,W,at;if(ot){let ne=Fn[ot];pe=ne.vertexShader,le=ne.fragmentShader;}else pe=M.vertexShader,le=M.fragmentShader,c.update(M),W=c.getVertexShaderID(M),at=c.getFragmentShaderID(M);let it=s.getRenderTarget(),Rt=s.state.buffers.depth.getReversed(),It=H.isInstancedMesh===!0,Ut=H.isBatchedMesh===!0,Te=!!M.map,Kt=!!M.matcap,P=!!$,ue=!!M.aoMap,Ct=!!M.lightMap,ee=!!M.bumpMap,Tt=!!M.normalMap,me=!!M.displacementMap,mt=!!M.emissiveMap,Wt=!!M.metalnessMap,Le=!!M.roughnessMap,Ee=M.anisotropy>0,E=M.clearcoat>0,y=M.dispersion>0,F=M.iridescence>0,G=M.sheen>0,K=M.transmission>0,V=Ee&&!!M.anisotropyMap,Mt=E&&!!M.clearcoatMap,nt=E&&!!M.clearcoatNormalMap,vt=E&&!!M.clearcoatRoughnessMap,xt=F&&!!M.iridescenceMap,tt=F&&!!M.iridescenceThicknessMap,ut=G&&!!M.sheenColorMap,Dt=G&&!!M.sheenRoughnessMap,bt=!!M.specularMap,lt=!!M.specularColorMap,kt=!!M.specularIntensityMap,I=K&&!!M.transmissionMap,et=K&&!!M.thicknessMap,st=!!M.gradientMap,pt=!!M.alphaMap,J=M.alphaTest>0,q=!!M.alphaHash,_t=!!M.extensions,Bt=Jn;M.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Bt=s.toneMapping);let de={shaderID:ot,shaderType:M.type,shaderName:M.name,vertexShader:pe,fragmentShader:le,defines:M.defines,customVertexShaderID:W,customFragmentShaderID:at,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ut,batchingColor:Ut&&H._colorsTexture!==null,instancing:It,instancingColor:It&&H.instanceColor!==null,instancingMorph:It&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:it===null?s.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Ci,alphaToCoverage:!!M.alphaToCoverage,map:Te,matcap:Kt,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:k,aoMap:ue,lightMap:Ct,bumpMap:ee,normalMap:Tt,displacementMap:d&&me,emissiveMap:mt,normalMapObjectSpace:Tt&&M.normalMapType===Mh,normalMapTangentSpace:Tt&&M.normalMapType===bh,metalnessMap:Wt,roughnessMap:Le,anisotropy:Ee,anisotropyMap:V,clearcoat:E,clearcoatMap:Mt,clearcoatNormalMap:nt,clearcoatRoughnessMap:vt,dispersion:y,iridescence:F,iridescenceMap:xt,iridescenceThicknessMap:tt,sheen:G,sheenColorMap:ut,sheenRoughnessMap:Dt,specularMap:bt,specularColorMap:lt,specularIntensityMap:kt,transmission:K,transmissionMap:I,thicknessMap:et,gradientMap:st,opaque:M.transparent===!1&&M.blending===Ei&&M.alphaToCoverage===!1,alphaMap:pt,alphaTest:J,alphaHash:q,combine:M.combine,mapUv:Te&&_(M.map.channel),aoMapUv:ue&&_(M.aoMap.channel),lightMapUv:Ct&&_(M.lightMap.channel),bumpMapUv:ee&&_(M.bumpMap.channel),normalMapUv:Tt&&_(M.normalMap.channel),displacementMapUv:me&&_(M.displacementMap.channel),emissiveMapUv:mt&&_(M.emissiveMap.channel),metalnessMapUv:Wt&&_(M.metalnessMap.channel),roughnessMapUv:Le&&_(M.roughnessMap.channel),anisotropyMapUv:V&&_(M.anisotropyMap.channel),clearcoatMapUv:Mt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(M.sheenRoughnessMap.channel),specularMapUv:bt&&_(M.specularMap.channel),specularColorMapUv:lt&&_(M.specularColorMap.channel),specularIntensityMapUv:kt&&_(M.specularIntensityMap.channel),transmissionMapUv:I&&_(M.transmissionMap.channel),thicknessMapUv:et&&_(M.thicknessMap.channel),alphaMapUv:pt&&_(M.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Tt||Ee),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(Te||pt),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Rt,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Gt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&w.length>0,shadowMapType:s.shadowMap.type,toneMapping:Bt,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&Jt.getTransfer(M.map.colorSpace)===oe,decodeVideoTextureEmissive:mt&&M.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(M.emissiveMap.colorSpace)===oe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===In,flipSided:M.side===Ye,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:_t&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&M.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return de.vertexUv1s=l.has(1),de.vertexUv2s=l.has(2),de.vertexUv3s=l.has(3),l.clear(),de;}function f(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let w in M.defines)b.push(w),b.push(M.defines[w]);return M.isRawShaderMaterial===!1&&(T(b,M),S(b,M),b.push(s.outputColorSpace)),b.push(M.customProgramCacheKey),b.join();}function T(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking);}function S(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),M.push(a.mask);}function x(M){let b=g[M.type],w;if(b){let z=Fn[b];w=Dh.clone(z.uniforms);}else w=M.uniforms;return w;}function C(M,b){let w;for(let z=0,H=h.length;z<H;z++){let X=h[z];if(X.cacheKey===b){w=X,++w.usedTimes;break;}}return w===void 0&&(w=new wg(s,b,M,r),h.push(w)),w;}function A(M){if(--M.usedTimes===0){let b=h.indexOf(M);h[b]=h[h.length-1],h.pop(),M.destroy();}}function R(M){c.remove(M);}function O(){c.dispose();}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:O};}function Pg(){let s=new WeakMap();function t(o){return s.has(o);}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a;}function n(o){s.delete(o);}function i(o,a,c){s.get(o)[a]=c;}function r(){s=new WeakMap();}return{has:t,get:e,remove:n,update:i,dispose:r};}function Rg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id;}function eu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id;}function nu(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0;}function o(u,d,p,g,_,m){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f;}function a(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f);}function c(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f);}function l(u,d){e.length>1&&e.sort(u||Rg),n.length>1&&n.sort(d||eu),i.length>1&&i.sort(d||eu);}function h(){for(let u=t,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null;}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l};}function Ig(){let s=new WeakMap();function t(n,i){let r=s.get(n),o;return r===void 0?(o=new nu(),s.set(n,[o])):i>=r.length?(o=new nu(),r.push(o)):o=r[i],o;}function e(){s=new WeakMap();}return{get:t,dispose:e};}function Og(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N(),color:new te()};break;case"SpotLight":e={position:new N(),direction:new N(),color:new te(),distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N(),color:new te(),distance:0,decay:0};break;case"HemisphereLight":e={direction:new N(),skyColor:new te(),groundColor:new te()};break;case"RectAreaLight":e={color:new te(),position:new N(),halfWidth:new N(),halfHeight:new N()};break;}return s[t.id]=e,e;}};}function Dg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t()};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t()};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t(),shadowCameraNear:1,shadowCameraFar:1e3};break;}return s[t.id]=e,e;}};}var Lg=0;function Fg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0);}function Ng(s){let t=new Og(),e=Dg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N());let i=new N(),r=new Me(),o=new Me();function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,T=0,S=0,x=0,C=0,A=0,R=0;l.sort(Fg);for(let M=0,b=l.length;M<b;M++){let w=l[M],z=w.color,H=w.intensity,X=w.distance,Z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=z.r*H,u+=z.g*H,d+=z.b*H;else if(w.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(w.sh.coefficients[Y],H);R++;}else if(w.isDirectionalLight){let Y=t.get(w);if(Y.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let $=w.shadow,k=e.get(w);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.directionalShadow[p]=k,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=w.shadow.matrix,T++;}n.directional[p]=Y,p++;}else if(w.isSpotLight){let Y=t.get(w);Y.position.setFromMatrixPosition(w.matrixWorld),Y.color.copy(z).multiplyScalar(H),Y.distance=X,Y.coneCos=Math.cos(w.angle),Y.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),Y.decay=w.decay,n.spot[_]=Y;let $=w.shadow;if(w.map&&(n.spotLightMap[C]=w.map,C++,$.updateMatrices(w),w.castShadow&&A++),n.spotLightMatrix[_]=$.matrix,w.castShadow){let k=e.get(w);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=Z,x++;}_++;}else if(w.isRectAreaLight){let Y=t.get(w);Y.color.copy(z).multiplyScalar(H),Y.halfWidth.set(w.width*.5,0,0),Y.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=Y,m++;}else if(w.isPointLight){let Y=t.get(w);if(Y.color.copy(w.color).multiplyScalar(w.intensity),Y.distance=w.distance,Y.decay=w.decay,w.castShadow){let $=w.shadow,k=e.get(w);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,k.shadowCameraNear=$.camera.near,k.shadowCameraFar=$.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=w.shadow.matrix,S++;}n.point[g]=Y,g++;}else if(w.isHemisphereLight){let Y=t.get(w);Y.skyColor.copy(w.color).multiplyScalar(H),Y.groundColor.copy(w.groundColor).multiplyScalar(H),n.hemi[f]=Y,f++;}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let O=n.hash;(O.directionalLength!==p||O.pointLength!==g||O.spotLength!==_||O.rectAreaLength!==m||O.hemiLength!==f||O.numDirectionalShadows!==T||O.numPointShadows!==S||O.numSpotShadows!==x||O.numSpotMaps!==C||O.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,O.directionalLength=p,O.pointLength=g,O.spotLength=_,O.rectAreaLength=m,O.hemiLength=f,O.numDirectionalShadows=T,O.numPointShadows=S,O.numSpotShadows=x,O.numSpotMaps=C,O.numLightProbes=R,n.version=Lg++);}function c(l,h){let u=0,d=0,p=0,g=0,_=0,m=h.matrixWorldInverse;for(let f=0,T=l.length;f<T;f++){let S=l[f];if(S.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++;}else if(S.isSpotLight){let x=n.spot[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++;}else if(S.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++;}else if(S.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),d++;}else if(S.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),_++;}}}return{setup:a,setupView:c,state:n};}function iu(s){let t=new Ng(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0;}function r(h){e.push(h);}function o(h){n.push(h);}function a(){t.setup(e);}function c(h){t.setupView(e,h);}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o};}function Ug(s){let t=new WeakMap();function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new iu(s),t.set(i,[a])):r>=o.length?(a=new iu(s),o.push(a)):a=o[r],a;}function n(){t=new WeakMap();}return{get:e,dispose:n};}var Bg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kg(s,t,e){let n=new Ri(),i=new $t(),r=new $t(),o=new Se(),a=new Qr({depthPacking:xh}),c=new to(),l={},h=e.maxTextureSize,u={[qn]:Ye,[Ye]:qn,[In]:In},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t()},radius:{value:4}},vertexShader:Bg,fragmentShader:Hg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new ui();g.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ue(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ka;let f=this.type;this.render=function(A,R,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=s.getRenderTarget(),b=s.getActiveCubeFace(),w=s.getActiveMipmapLevel(),z=s.state;z.setBlending(Kn),z.buffers.depth.getReversed()?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let H=f!==Rn&&this.type===Rn,X=f===Rn&&this.type!==Rn;for(let Z=0,Y=A.length;Z<Y;Z++){let $=A[Z],k=$.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue;}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);let ot=k.getFrameExtents();if(i.multiply(ot),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ot.x),i.x=r.x*ot.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ot.y),i.y=r.y*ot.y,k.mapSize.y=r.y)),k.map===null||H===!0||X===!0){let Et=this.type!==Rn?{minFilter:un,magFilter:un}:{};k.map!==null&&k.map.dispose(),k.map=new Cn(i.x,i.y,Et),k.map.texture.name=$.name+".shadowMap",k.camera.updateProjectionMatrix();}s.setRenderTarget(k.map),s.clear();let dt=k.getViewportCount();for(let Et=0;Et<dt;Et++){let Gt=k.getViewport(Et);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),z.viewport(o),k.updateMatrices($,Et),n=k.getFrustum(),x(R,O,k.camera,$,this.type);}k.isPointLightShadow!==!0&&this.type===Rn&&T(k,O),k.needsUpdate=!1;}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,b,w);};function T(A,R){let O=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Cn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,O,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,O,p,_,null);}function S(A,R,O,M){let b=null,w=O.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)b=w;else if(b=O.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let z=b.uuid,H=R.uuid,X=l[z];X===void 0&&(X={},l[z]=X);let Z=X[H];Z===void 0&&(Z=b.clone(),X[H]=Z,R.addEventListener("dispose",C)),b=Z;}if(b.visible=R.visible,b.wireframe=R.wireframe,M===Rn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,O.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let z=s.properties.get(b);z.light=O;}return b;}function x(A,R,O,M,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Rn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,A.matrixWorld);let H=t.update(A),X=A.material;if(Array.isArray(X)){let Z=H.groups;for(let Y=0,$=Z.length;Y<$;Y++){let k=Z[Y],ot=X[k.materialIndex];if(ot&&ot.visible){let dt=S(A,ot,M,b);A.onBeforeShadow(s,A,R,O,H,dt,k),s.renderBufferDirect(O,null,H,dt,A,k),A.onAfterShadow(s,A,R,O,H,dt,k);}}}else if(X.visible){let Z=S(A,X,M,b);A.onBeforeShadow(s,A,R,O,H,Z,null),s.renderBufferDirect(O,null,H,Z,A,null),A.onAfterShadow(s,A,R,O,H,Z,null);}}let z=A.children;for(let H=0,X=z.length;H<X;H++)x(z[H],R,O,M,b);}function C(A){A.target.removeEventListener("dispose",C);for(let O in l){let M=l[O],b=A.target.uuid;b in M&&(M[b].dispose(),delete M[b]);}}}var zg={[mo]:go,[_o]:xo,[yo]:bo,[wi]:vo,[go]:mo,[xo]:_o,[bo]:yo,[vo]:wi};function Vg(s,t){function e(){let I=!1,et=new Se(),st=null,pt=new Se(0,0,0,0);return{setMask:function(J){st!==J&&!I&&(s.colorMask(J,J,J,J),st=J);},setLocked:function(J){I=J;},setClear:function(J,q,_t,Bt,de){de===!0&&(J*=Bt,q*=Bt,_t*=Bt),et.set(J,q,_t,Bt),pt.equals(et)===!1&&(s.clearColor(J,q,_t,Bt),pt.copy(et));},reset:function(){I=!1,st=null,pt.set(-1,0,0,0);}};}function n(){let I=!1,et=!1,st=null,pt=null,J=null;return{setReversed:function(q){if(et!==q){let _t=t.get("EXT_clip_control");q?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),et=q;let Bt=J;J=null,this.setClear(Bt);}},getReversed:function(){return et;},setTest:function(q){q?it(s.DEPTH_TEST):Rt(s.DEPTH_TEST);},setMask:function(q){st!==q&&!I&&(s.depthMask(q),st=q);},setFunc:function(q){if(et&&(q=zg[q]),pt!==q){switch(q){case mo:s.depthFunc(s.NEVER);break;case go:s.depthFunc(s.ALWAYS);break;case _o:s.depthFunc(s.LESS);break;case wi:s.depthFunc(s.LEQUAL);break;case yo:s.depthFunc(s.EQUAL);break;case vo:s.depthFunc(s.GEQUAL);break;case xo:s.depthFunc(s.GREATER);break;case bo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL);}pt=q;}},setLocked:function(q){I=q;},setClear:function(q){J!==q&&(et&&(q=1-q),s.clearDepth(q),J=q);},reset:function(){I=!1,st=null,pt=null,J=null,et=!1;}};}function i(){let I=!1,et=null,st=null,pt=null,J=null,q=null,_t=null,Bt=null,de=null;return{setTest:function(ne){I||(ne?it(s.STENCIL_TEST):Rt(s.STENCIL_TEST));},setMask:function(ne){et!==ne&&!I&&(s.stencilMask(ne),et=ne);},setFunc:function(ne,Nn,Mn){(st!==ne||pt!==Nn||J!==Mn)&&(s.stencilFunc(ne,Nn,Mn),st=ne,pt=Nn,J=Mn);},setOp:function(ne,Nn,Mn){(q!==ne||_t!==Nn||Bt!==Mn)&&(s.stencilOp(ne,Nn,Mn),q=ne,_t=Nn,Bt=Mn);},setLocked:function(ne){I=ne;},setClear:function(ne){de!==ne&&(s.clearStencil(ne),de=ne);},reset:function(){I=!1,et=null,st=null,pt=null,J=null,q=null,_t=null,Bt=null,de=null;}};}let r=new e(),o=new n(),a=new i(),c=new WeakMap(),l=new WeakMap(),h={},u={},d=new WeakMap(),p=[],g=null,_=!1,m=null,f=null,T=null,S=null,x=null,C=null,A=null,R=new te(0,0,0),O=0,M=!1,b=null,w=null,z=null,H=null,X=null,Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,$=0,k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(k)[1]),Y=$>=1):k.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),Y=$>=2);let ot=null,dt={},Et=s.getParameter(s.SCISSOR_BOX),Gt=s.getParameter(s.VIEWPORT),pe=new Se().fromArray(Et),le=new Se().fromArray(Gt);function W(I,et,st,pt){let J=new Uint8Array(4),q=s.createTexture();s.bindTexture(I,q),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let _t=0;_t<st;_t++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(et,0,s.RGBA,1,1,pt,0,s.RGBA,s.UNSIGNED_BYTE,J):s.texImage2D(et+_t,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,J);return q;}let at={};at[s.TEXTURE_2D]=W(s.TEXTURE_2D,s.TEXTURE_2D,1),at[s.TEXTURE_CUBE_MAP]=W(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[s.TEXTURE_2D_ARRAY]=W(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),at[s.TEXTURE_3D]=W(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(s.DEPTH_TEST),o.setFunc(wi),ee(!1),Tt($a),it(s.CULL_FACE),ue(Kn);function it(I){h[I]!==!0&&(s.enable(I),h[I]=!0);}function Rt(I){h[I]!==!1&&(s.disable(I),h[I]=!1);}function It(I,et){return u[I]!==et?(s.bindFramebuffer(I,et),u[I]=et,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=et),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=et),!0):!1;}function Ut(I,et){let st=p,pt=!1;if(I){st=d.get(et),st===void 0&&(st=[],d.set(et,st));let J=I.textures;if(st.length!==J.length||st[0]!==s.COLOR_ATTACHMENT0){for(let q=0,_t=J.length;q<_t;q++)st[q]=s.COLOR_ATTACHMENT0+q;st.length=J.length,pt=!0;}}else st[0]!==s.BACK&&(st[0]=s.BACK,pt=!0);pt&&s.drawBuffers(st);}function Te(I){return g!==I?(s.useProgram(I),g=I,!0):!1;}let Kt={[hi]:s.FUNC_ADD,[Yc]:s.FUNC_SUBTRACT,[qc]:s.FUNC_REVERSE_SUBTRACT};Kt[Zc]=s.MIN,Kt[$c]=s.MAX;let P={[Kc]:s.ZERO,[Jc]:s.ONE,[jc]:s.SRC_COLOR,[Gr]:s.SRC_ALPHA,[sh]:s.SRC_ALPHA_SATURATE,[nh]:s.DST_COLOR,[th]:s.DST_ALPHA,[Qc]:s.ONE_MINUS_SRC_COLOR,[Wr]:s.ONE_MINUS_SRC_ALPHA,[ih]:s.ONE_MINUS_DST_COLOR,[eh]:s.ONE_MINUS_DST_ALPHA,[rh]:s.CONSTANT_COLOR,[oh]:s.ONE_MINUS_CONSTANT_COLOR,[ah]:s.CONSTANT_ALPHA,[lh]:s.ONE_MINUS_CONSTANT_ALPHA};function ue(I,et,st,pt,J,q,_t,Bt,de,ne){if(I===Kn){_===!0&&(Rt(s.BLEND),_=!1);return;}if(_===!1&&(it(s.BLEND),_=!0),I!==Xc){if(I!==m||ne!==M){if((f!==hi||x!==hi)&&(s.blendEquation(s.FUNC_ADD),f=hi,x=hi),ne)switch(I){case Ei:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ja:s.blendFunc(s.ONE,s.ONE);break;case ja:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Qa:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break;}else switch(I){case Ei:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ja:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ja:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break;}T=null,S=null,C=null,A=null,R.set(0,0,0),O=0,m=I,M=ne;}return;}J=J||et,q=q||st,_t=_t||pt,(et!==f||J!==x)&&(s.blendEquationSeparate(Kt[et],Kt[J]),f=et,x=J),(st!==T||pt!==S||q!==C||_t!==A)&&(s.blendFuncSeparate(P[st],P[pt],P[q],P[_t]),T=st,S=pt,C=q,A=_t),(Bt.equals(R)===!1||de!==O)&&(s.blendColor(Bt.r,Bt.g,Bt.b,de),R.copy(Bt),O=de),m=I,M=!1;}function Ct(I,et){I.side===In?Rt(s.CULL_FACE):it(s.CULL_FACE);let st=I.side===Ye;et&&(st=!st),ee(st),I.blending===Ei&&I.transparent===!1?ue(Kn):ue(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let pt=I.stencilWrite;a.setTest(pt),pt&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),mt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?it(s.SAMPLE_ALPHA_TO_COVERAGE):Rt(s.SAMPLE_ALPHA_TO_COVERAGE);}function ee(I){b!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),b=I);}function Tt(I){I!==Vc?(it(s.CULL_FACE),I!==w&&(I===$a?s.cullFace(s.BACK):I===Gc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Rt(s.CULL_FACE),w=I;}function me(I){I!==z&&(Y&&s.lineWidth(I),z=I);}function mt(I,et,st){I?(it(s.POLYGON_OFFSET_FILL),(H!==et||X!==st)&&(s.polygonOffset(et,st),H=et,X=st)):Rt(s.POLYGON_OFFSET_FILL);}function Wt(I){I?it(s.SCISSOR_TEST):Rt(s.SCISSOR_TEST);}function Le(I){I===void 0&&(I=s.TEXTURE0+Z-1),ot!==I&&(s.activeTexture(I),ot=I);}function Ee(I,et,st){st===void 0&&(ot===null?st=s.TEXTURE0+Z-1:st=ot);let pt=dt[st];pt===void 0&&(pt={type:void 0,texture:void 0},dt[st]=pt),(pt.type!==I||pt.texture!==et)&&(ot!==st&&(s.activeTexture(st),ot=st),s.bindTexture(I,et||at[I]),pt.type=I,pt.texture=et);}function E(){let I=dt[ot];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0);}function y(){try{s.compressedTexImage2D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function F(){try{s.compressedTexImage3D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function G(){try{s.texSubImage2D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function K(){try{s.texSubImage3D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function V(){try{s.compressedTexSubImage2D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function Mt(){try{s.compressedTexSubImage3D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function nt(){try{s.texStorage2D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function vt(){try{s.texStorage3D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function xt(){try{s.texImage2D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function tt(){try{s.texImage3D(...arguments);}catch(I){console.error("THREE.WebGLState:",I);}}function ut(I){pe.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),pe.copy(I));}function Dt(I){le.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),le.copy(I));}function bt(I,et){let st=l.get(et);st===void 0&&(st=new WeakMap(),l.set(et,st));let pt=st.get(I);pt===void 0&&(pt=s.getUniformBlockIndex(et,I.name),st.set(I,pt));}function lt(I,et){let pt=l.get(et).get(I);c.get(et)!==pt&&(s.uniformBlockBinding(et,pt,I.__bindingPointIndex),c.set(et,pt));}function kt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ot=null,dt={},u={},d=new WeakMap(),p=[],g=null,_=!1,m=null,f=null,T=null,S=null,x=null,C=null,A=null,R=new te(0,0,0),O=0,M=!1,b=null,w=null,z=null,H=null,X=null,pe.set(0,0,s.canvas.width,s.canvas.height),le.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset();}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:Rt,bindFramebuffer:It,drawBuffers:Ut,useProgram:Te,setBlending:ue,setMaterial:Ct,setFlipSided:ee,setCullFace:Tt,setLineWidth:me,setPolygonOffset:mt,setScissorTest:Wt,activeTexture:Le,bindTexture:Ee,unbindTexture:E,compressedTexImage2D:y,compressedTexImage3D:F,texImage2D:xt,texImage3D:tt,updateUBOMapping:bt,uniformBlockBinding:lt,texStorage2D:nt,texStorage3D:vt,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:V,compressedTexSubImage3D:Mt,scissor:ut,viewport:Dt,reset:kt};}function Gg(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $t(),h=new WeakMap(),u,d=new WeakMap(),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null;}catch{}function g(E,y){return p?new OffscreenCanvas(E,y):cs("canvas");}function _(E,y,F){let G=1,K=Ee(E);if((K.width>F||K.height>F)&&(G=F/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let V=Math.floor(G*K.width),Mt=Math.floor(G*K.height);u===void 0&&(u=g(V,Mt));let nt=y?g(V,Mt):u;return nt.width=V,nt.height=Mt,nt.getContext("2d").drawImage(E,0,0,V,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+V+"x"+Mt+")."),nt;}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E;}function m(E){return E.generateMipmaps;}function f(E){s.generateMipmap(E);}function T(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D;}function S(E,y,F,G,K=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'");}let V=y;if(y===s.RED&&(F===s.FLOAT&&(V=s.R32F),F===s.HALF_FLOAT&&(V=s.R16F),F===s.UNSIGNED_BYTE&&(V=s.R8)),y===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(V=s.R8UI),F===s.UNSIGNED_SHORT&&(V=s.R16UI),F===s.UNSIGNED_INT&&(V=s.R32UI),F===s.BYTE&&(V=s.R8I),F===s.SHORT&&(V=s.R16I),F===s.INT&&(V=s.R32I)),y===s.RG&&(F===s.FLOAT&&(V=s.RG32F),F===s.HALF_FLOAT&&(V=s.RG16F),F===s.UNSIGNED_BYTE&&(V=s.RG8)),y===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(V=s.RG8UI),F===s.UNSIGNED_SHORT&&(V=s.RG16UI),F===s.UNSIGNED_INT&&(V=s.RG32UI),F===s.BYTE&&(V=s.RG8I),F===s.SHORT&&(V=s.RG16I),F===s.INT&&(V=s.RG32I)),y===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(V=s.RGB8UI),F===s.UNSIGNED_SHORT&&(V=s.RGB16UI),F===s.UNSIGNED_INT&&(V=s.RGB32UI),F===s.BYTE&&(V=s.RGB8I),F===s.SHORT&&(V=s.RGB16I),F===s.INT&&(V=s.RGB32I)),y===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(V=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(V=s.RGBA16UI),F===s.UNSIGNED_INT&&(V=s.RGBA32UI),F===s.BYTE&&(V=s.RGBA8I),F===s.SHORT&&(V=s.RGBA16I),F===s.INT&&(V=s.RGBA32I)),y===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(V=s.RGB9_E5),y===s.RGBA){let Mt=K?Hs:Jt.getTransfer(G);F===s.FLOAT&&(V=s.RGBA32F),F===s.HALF_FLOAT&&(V=s.RGBA16F),F===s.UNSIGNED_BYTE&&(V=Mt===oe?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(V=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(V=s.RGB5_A1);}return(V===s.R16F||V===s.R32F||V===s.RG16F||V===s.RG32F||V===s.RGBA16F||V===s.RGBA32F)&&t.get("EXT_color_buffer_float"),V;}function x(E,y){let F;return E?y===null||y===mi||y===_s?F=s.DEPTH24_STENCIL8:y===Ln?F=s.DEPTH32F_STENCIL8:y===ms&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===mi||y===_s?F=s.DEPTH_COMPONENT24:y===Ln?F=s.DEPTH_COMPONENT32F:y===ms&&(F=s.DEPTH_COMPONENT16),F;}function C(E,y){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==un&&E.minFilter!==Xe?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1;}function A(E){let y=E.target;y.removeEventListener("dispose",A),O(y),y.isVideoTexture&&h.delete(y);}function R(E){let y=E.target;y.removeEventListener("dispose",R),b(y);}function O(E){let y=n.get(E);if(y.__webglInit===void 0)return;let F=E.source,G=d.get(F);if(G){let K=G[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&M(E),Object.keys(G).length===0&&d.delete(F);}n.remove(E);}function M(E){let y=n.get(E);s.deleteTexture(y.__webglTexture);let F=E.source,G=d.get(F);delete G[y.__cacheKey],o.memory.textures--;}function b(E){let y=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(y.__webglFramebuffer[G]))for(let K=0;K<y.__webglFramebuffer[G].length;K++)s.deleteFramebuffer(y.__webglFramebuffer[G][K]);else s.deleteFramebuffer(y.__webglFramebuffer[G]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[G]);}else{if(Array.isArray(y.__webglFramebuffer))for(let G=0;G<y.__webglFramebuffer.length;G++)s.deleteFramebuffer(y.__webglFramebuffer[G]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let G=0;G<y.__webglColorRenderbuffer.length;G++)y.__webglColorRenderbuffer[G]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[G]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer);}let F=E.textures;for(let G=0,K=F.length;G<K;G++){let V=n.get(F[G]);V.__webglTexture&&(s.deleteTexture(V.__webglTexture),o.memory.textures--),n.remove(F[G]);}n.remove(E);}let w=0;function z(){w=0;}function H(){let E=w;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),w+=1,E;}function X(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join();}function Z(E,y){let F=n.get(E);if(E.isVideoTexture&&Wt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&F.__version!==E.version){let G=E.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(F,E,y);return;}}else E.isExternalTexture&&(F.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+y);}function Y(E,y){let F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){at(F,E,y);return;}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+y);}function $(E,y){let F=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){at(F,E,y);return;}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+y);}function k(E,y){let F=n.get(E);if(E.version>0&&F.__version!==E.version){it(F,E,y);return;}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+y);}let ot={[Xr]:s.REPEAT,[En]:s.CLAMP_TO_EDGE,[Yr]:s.MIRRORED_REPEAT},dt={[un]:s.NEAREST,[yh]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[Xe]:s.LINEAR,[To]:s.LINEAR_MIPMAP_NEAREST,[On]:s.LINEAR_MIPMAP_LINEAR},Et={[Sh]:s.NEVER,[Ph]:s.ALWAYS,[Th]:s.LESS,[cl]:s.LEQUAL,[Eh]:s.EQUAL,[Ah]:s.GEQUAL,[wh]:s.GREATER,[Ch]:s.NOTEQUAL};function Gt(E,y){if(y.type===Ln&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Xe||y.magFilter===To||y.magFilter===er||y.magFilter===On||y.minFilter===Xe||y.minFilter===To||y.minFilter===er||y.minFilter===On)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,ot[y.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,ot[y.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,ot[y.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,dt[y.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,dt[y.minFilter]),y.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,Et[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===un||y.minFilter!==er&&y.minFilter!==On||y.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy;}}}function pe(E,y){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",A));let G=y.source,K=d.get(G);K===void 0&&(K={},d.set(G,K));let V=X(y);if(V!==E.__cacheKey){K[V]===void 0&&(K[V]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[V].usedTimes++;let Mt=K[E.__cacheKey];Mt!==void 0&&(K[E.__cacheKey].usedTimes--,Mt.usedTimes===0&&M(y)),E.__cacheKey=V,E.__webglTexture=K[V].texture;}return F;}function le(E,y,F){return Math.floor(Math.floor(E/F)/y);}function W(E,y,F,G){let V=E.updateRanges;if(V.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,F,G,y.data);else{V.sort((tt,ut)=>tt.start-ut.start);let Mt=0;for(let tt=1;tt<V.length;tt++){let ut=V[Mt],Dt=V[tt],bt=ut.start+ut.count,lt=le(Dt.start,y.width,4),kt=le(ut.start,y.width,4);Dt.start<=bt+1&&lt===kt&&le(Dt.start+Dt.count-1,y.width,4)===lt?ut.count=Math.max(ut.count,Dt.start+Dt.count-ut.start):(++Mt,V[Mt]=Dt);}V.length=Mt+1;let nt=s.getParameter(s.UNPACK_ROW_LENGTH),vt=s.getParameter(s.UNPACK_SKIP_PIXELS),xt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let tt=0,ut=V.length;tt<ut;tt++){let Dt=V[tt],bt=Math.floor(Dt.start/4),lt=Math.ceil(Dt.count/4),kt=bt%y.width,I=Math.floor(bt/y.width),et=lt,st=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,kt),s.pixelStorei(s.UNPACK_SKIP_ROWS,I),e.texSubImage2D(s.TEXTURE_2D,0,kt,I,et,st,F,G,y.data);}E.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,nt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,vt),s.pixelStorei(s.UNPACK_SKIP_ROWS,xt);}}function at(E,y,F){let G=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(G=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(G=s.TEXTURE_3D);let K=pe(E,y),V=y.source;e.bindTexture(G,E.__webglTexture,s.TEXTURE0+F);let Mt=n.get(V);if(V.version!==Mt.__version||K===!0){e.activeTexture(s.TEXTURE0+F);let nt=Jt.getPrimaries(Jt.workingColorSpace),vt=y.colorSpace===jn?null:Jt.getPrimaries(y.colorSpace),xt=y.colorSpace===jn||nt===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let tt=_(y.image,!1,i.maxTextureSize);tt=Le(y,tt);let ut=r.convert(y.format,y.colorSpace),Dt=r.convert(y.type),bt=S(y.internalFormat,ut,Dt,y.colorSpace,y.isVideoTexture);Gt(G,y);let lt,kt=y.mipmaps,I=y.isVideoTexture!==!0,et=Mt.__version===void 0||K===!0,st=V.dataReady,pt=C(y,tt);if(y.isDepthTexture)bt=x(y.format===ys,y.type),et&&(I?e.texStorage2D(s.TEXTURE_2D,1,bt,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,bt,tt.width,tt.height,0,ut,Dt,null));else if(y.isDataTexture){if(kt.length>0){I&&et&&e.texStorage2D(s.TEXTURE_2D,pt,bt,kt[0].width,kt[0].height);for(let J=0,q=kt.length;J<q;J++)lt=kt[J],I?st&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,lt.width,lt.height,ut,Dt,lt.data):e.texImage2D(s.TEXTURE_2D,J,bt,lt.width,lt.height,0,ut,Dt,lt.data);y.generateMipmaps=!1;}else I?(et&&e.texStorage2D(s.TEXTURE_2D,pt,bt,tt.width,tt.height),st&&W(y,tt,ut,Dt)):e.texImage2D(s.TEXTURE_2D,0,bt,tt.width,tt.height,0,ut,Dt,tt.data);}else if(y.isCompressedTexture){if(y.isCompressedArrayTexture){I&&et&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,bt,kt[0].width,kt[0].height,tt.depth);for(let J=0,q=kt.length;J<q;J++)if(lt=kt[J],y.format!==fn){if(ut!==null){if(I){if(st)if(y.layerUpdates.size>0){let _t=_l(lt.width,lt.height,y.format,y.type);for(let Bt of y.layerUpdates){let de=lt.data.subarray(Bt*_t/lt.data.BYTES_PER_ELEMENT,(Bt+1)*_t/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,Bt,lt.width,lt.height,1,ut,de);}y.clearLayerUpdates();}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,tt.depth,ut,lt.data);}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,bt,lt.width,lt.height,tt.depth,0,lt.data,0,0);}else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");}else I?st&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,tt.depth,ut,Dt,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,bt,lt.width,lt.height,tt.depth,0,ut,Dt,lt.data);}else{I&&et&&e.texStorage2D(s.TEXTURE_2D,pt,bt,kt[0].width,kt[0].height);for(let J=0,q=kt.length;J<q;J++)lt=kt[J],y.format!==fn?ut!==null?I?st&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,J,bt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?st&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,lt.width,lt.height,ut,Dt,lt.data):e.texImage2D(s.TEXTURE_2D,J,bt,lt.width,lt.height,0,ut,Dt,lt.data);}}else if(y.isDataArrayTexture){if(I){if(et&&e.texStorage3D(s.TEXTURE_2D_ARRAY,pt,bt,tt.width,tt.height,tt.depth),st)if(y.layerUpdates.size>0){let J=_l(tt.width,tt.height,y.format,y.type);for(let q of y.layerUpdates){let _t=tt.data.subarray(q*J/tt.data.BYTES_PER_ELEMENT,(q+1)*J/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,tt.width,tt.height,1,ut,Dt,_t);}y.clearLayerUpdates();}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,Dt,tt.data);}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,bt,tt.width,tt.height,tt.depth,0,ut,Dt,tt.data);}else if(y.isData3DTexture)I?(et&&e.texStorage3D(s.TEXTURE_3D,pt,bt,tt.width,tt.height,tt.depth),st&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,Dt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,bt,tt.width,tt.height,tt.depth,0,ut,Dt,tt.data);else if(y.isFramebufferTexture){if(et)if(I)e.texStorage2D(s.TEXTURE_2D,pt,bt,tt.width,tt.height);else{let J=tt.width,q=tt.height;for(let _t=0;_t<pt;_t++)e.texImage2D(s.TEXTURE_2D,_t,bt,J,q,0,ut,Dt,null),J>>=1,q>>=1;}}else if(kt.length>0){if(I&&et){let J=Ee(kt[0]);e.texStorage2D(s.TEXTURE_2D,pt,bt,J.width,J.height);}for(let J=0,q=kt.length;J<q;J++)lt=kt[J],I?st&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ut,Dt,lt):e.texImage2D(s.TEXTURE_2D,J,bt,ut,Dt,lt);y.generateMipmaps=!1;}else if(I){if(et){let J=Ee(tt);e.texStorage2D(s.TEXTURE_2D,pt,bt,J.width,J.height);}st&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut,Dt,tt);}else e.texImage2D(s.TEXTURE_2D,0,bt,ut,Dt,tt);m(y)&&f(G),Mt.__version=V.version,y.onUpdate&&y.onUpdate(y);}E.__version=y.version;}function it(E,y,F){if(y.image.length!==6)return;let G=pe(E,y),K=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+F);let V=n.get(K);if(K.version!==V.__version||G===!0){e.activeTexture(s.TEXTURE0+F);let Mt=Jt.getPrimaries(Jt.workingColorSpace),nt=y.colorSpace===jn?null:Jt.getPrimaries(y.colorSpace),vt=y.colorSpace===jn||Mt===nt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let xt=y.isCompressedTexture||y.image[0].isCompressedTexture,tt=y.image[0]&&y.image[0].isDataTexture,ut=[];for(let q=0;q<6;q++)!xt&&!tt?ut[q]=_(y.image[q],!0,i.maxCubemapSize):ut[q]=tt?y.image[q].image:y.image[q],ut[q]=Le(y,ut[q]);let Dt=ut[0],bt=r.convert(y.format,y.colorSpace),lt=r.convert(y.type),kt=S(y.internalFormat,bt,lt,y.colorSpace),I=y.isVideoTexture!==!0,et=V.__version===void 0||G===!0,st=K.dataReady,pt=C(y,Dt);Gt(s.TEXTURE_CUBE_MAP,y);let J;if(xt){I&&et&&e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,kt,Dt.width,Dt.height);for(let q=0;q<6;q++){J=ut[q].mipmaps;for(let _t=0;_t<J.length;_t++){let Bt=J[_t];y.format!==fn?bt!==null?I?st&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t,0,0,Bt.width,Bt.height,bt,Bt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t,kt,Bt.width,Bt.height,0,Bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t,0,0,Bt.width,Bt.height,bt,lt,Bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t,kt,Bt.width,Bt.height,0,bt,lt,Bt.data);}}}else{if(J=y.mipmaps,I&&et){J.length>0&&pt++;let q=Ee(ut[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,pt,kt,q.width,q.height);}for(let q=0;q<6;q++)if(tt){I?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ut[q].width,ut[q].height,bt,lt,ut[q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,kt,ut[q].width,ut[q].height,0,bt,lt,ut[q].data);for(let _t=0;_t<J.length;_t++){let de=J[_t].image[q].image;I?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t+1,0,0,de.width,de.height,bt,lt,de.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t+1,kt,de.width,de.height,0,bt,lt,de.data);}}else{I?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,bt,lt,ut[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,kt,bt,lt,ut[q]);for(let _t=0;_t<J.length;_t++){let Bt=J[_t];I?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t+1,0,0,bt,lt,Bt.image[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,_t+1,kt,bt,lt,Bt.image[q]);}}}m(y)&&f(s.TEXTURE_CUBE_MAP),V.__version=K.version,y.onUpdate&&y.onUpdate(y);}E.__version=y.version;}function Rt(E,y,F,G,K,V){let Mt=r.convert(F.format,F.colorSpace),nt=r.convert(F.type),vt=S(F.internalFormat,Mt,nt,F.colorSpace),xt=n.get(y),tt=n.get(F);if(tt.__renderTarget=y,!xt.__hasExternalTextures){let ut=Math.max(1,y.width>>V),Dt=Math.max(1,y.height>>V);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?e.texImage3D(K,V,vt,ut,Dt,y.depth,0,Mt,nt,null):e.texImage2D(K,V,vt,ut,Dt,0,Mt,nt,null);}e.bindFramebuffer(s.FRAMEBUFFER,E),mt(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,G,K,tt.__webglTexture,0,me(y)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,G,K,tt.__webglTexture,V),e.bindFramebuffer(s.FRAMEBUFFER,null);}function It(E,y,F){if(s.bindRenderbuffer(s.RENDERBUFFER,E),y.depthBuffer){let G=y.depthTexture,K=G&&G.isDepthTexture?G.type:null,V=x(y.stencilBuffer,K),Mt=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,nt=me(y);mt(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,nt,V,y.width,y.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,nt,V,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,V,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,E);}else{let G=y.textures;for(let K=0;K<G.length;K++){let V=G[K],Mt=r.convert(V.format,V.colorSpace),nt=r.convert(V.type),vt=S(V.internalFormat,Mt,nt,V.colorSpace),xt=me(y);F&&mt(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,xt,vt,y.width,y.height):mt(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xt,vt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,vt,y.width,y.height);}}s.bindRenderbuffer(s.RENDERBUFFER,null);}function Ut(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=n.get(y.depthTexture);G.__renderTarget=y,(!G.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z(y.depthTexture,0);let K=G.__webglTexture,V=me(y);if(y.depthTexture.format===as)mt(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0);else if(y.depthTexture.format===ys)mt(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format");}function Te(E){let y=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){let G=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),G){let K=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,G.removeEventListener("dispose",K);};G.addEventListener("dispose",K),y.__depthDisposeCallback=K;}y.__boundDepthTexture=G;}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let G=E.texture.mipmaps;G&&G.length>0?Ut(y.__webglFramebuffer[0],E):Ut(y.__webglFramebuffer,E);}else if(F){y.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[G]),y.__webglDepthbuffer[G]===void 0)y.__webglDepthbuffer[G]=s.createRenderbuffer(),It(y.__webglDepthbuffer[G],E,!1);else{let K=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=y.__webglDepthbuffer[G];s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,V);}}else{let G=E.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),It(y.__webglDepthbuffer,E,!1);else{let K=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,V);}}e.bindFramebuffer(s.FRAMEBUFFER,null);}function Kt(E,y,F){let G=n.get(E);y!==void 0&&Rt(G.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Te(E);}function P(E){let y=E.texture,F=n.get(E),G=n.get(y);E.addEventListener("dispose",R);let K=E.textures,V=E.isWebGLCubeRenderTarget===!0,Mt=K.length>1;if(Mt||(G.__webglTexture===void 0&&(G.__webglTexture=s.createTexture()),G.__version=y.version,o.memory.textures++),V){F.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[nt]=[];for(let vt=0;vt<y.mipmaps.length;vt++)F.__webglFramebuffer[nt][vt]=s.createFramebuffer();}else F.__webglFramebuffer[nt]=s.createFramebuffer();}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let nt=0;nt<y.mipmaps.length;nt++)F.__webglFramebuffer[nt]=s.createFramebuffer();}else F.__webglFramebuffer=s.createFramebuffer();if(Mt)for(let nt=0,vt=K.length;nt<vt;nt++){let xt=n.get(K[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=s.createTexture(),o.memory.textures++);}if(E.samples>0&&mt(E)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let nt=0;nt<K.length;nt++){let vt=K[nt];F.__webglColorRenderbuffer[nt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[nt]);let xt=r.convert(vt.format,vt.colorSpace),tt=r.convert(vt.type),ut=S(vt.internalFormat,xt,tt,vt.colorSpace,E.isXRRenderTarget===!0),Dt=me(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,ut,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+nt,s.RENDERBUFFER,F.__webglColorRenderbuffer[nt]);}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),It(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null);}}if(V){e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture),Gt(s.TEXTURE_CUBE_MAP,y);for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0)for(let vt=0;vt<y.mipmaps.length;vt++)Rt(F.__webglFramebuffer[nt][vt],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt);else Rt(F.__webglFramebuffer[nt],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(y)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture();}else if(Mt){for(let nt=0,vt=K.length;nt<vt;nt++){let xt=K[nt],tt=n.get(xt),ut=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ut=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,tt.__webglTexture),Gt(ut,xt),Rt(F.__webglFramebuffer,E,xt,s.COLOR_ATTACHMENT0+nt,ut,0),m(xt)&&f(ut);}e.unbindTexture();}else{let nt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(nt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(nt,G.__webglTexture),Gt(nt,y),y.mipmaps&&y.mipmaps.length>0)for(let vt=0;vt<y.mipmaps.length;vt++)Rt(F.__webglFramebuffer[vt],E,y,s.COLOR_ATTACHMENT0,nt,vt);else Rt(F.__webglFramebuffer,E,y,s.COLOR_ATTACHMENT0,nt,0);m(y)&&f(nt),e.unbindTexture();}E.depthBuffer&&Te(E);}function ue(E){let y=E.textures;for(let F=0,G=y.length;F<G;F++){let K=y[F];if(m(K)){let V=T(E),Mt=n.get(K).__webglTexture;e.bindTexture(V,Mt),f(V),e.unbindTexture();}}}let Ct=[],ee=[];function Tt(E){if(E.samples>0){if(mt(E)===!1){let y=E.textures,F=E.width,G=E.height,K=s.COLOR_BUFFER_BIT,V=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=n.get(E),nt=y.length>1;if(nt)for(let xt=0;xt<y.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer);let vt=E.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let xt=0;xt<y.length;xt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),nt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[xt]);let tt=n.get(y[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,tt,0);}s.blitFramebuffer(0,0,F,G,0,0,F,G,K,s.NEAREST),c===!0&&(Ct.length=0,ee.length=0,Ct.push(s.COLOR_ATTACHMENT0+xt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ct.push(V),ee.push(V),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ee)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ct));}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<y.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[xt]);let tt=n.get(y[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,tt,0);}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer);}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let y=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y]);}}}function me(E){return Math.min(i.maxSamples,E.samples);}function mt(E){let y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1;}function Wt(E){let y=o.render.frame;h.get(E)!==y&&(h.set(E,y),E.update());}function Le(E,y){let F=E.colorSpace,G=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==Ci&&F!==jn&&(Jt.getTransfer(F)===oe?(G!==fn||K!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y;}function Ee(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l;}this.allocateTextureUnit=H,this.resetTextureUnits=z,this.setTexture2D=Z,this.setTexture2DArray=Y,this.setTexture3D=$,this.setTextureCube=k,this.rebindTextures=Kt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=mt;}function Wg(s,t){function e(n,i=jn){let r,o=Jt.getTransfer(i);if(n===Dn)return s.UNSIGNED_BYTE;if(n===wo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Co)return s.UNSIGNED_SHORT_5_5_5_1;if(n===il)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===el)return s.BYTE;if(n===nl)return s.SHORT;if(n===ms)return s.UNSIGNED_SHORT;if(n===Eo)return s.INT;if(n===mi)return s.UNSIGNED_INT;if(n===Ln)return s.FLOAT;if(n===gs)return s.HALF_FLOAT;if(n===sl)return s.ALPHA;if(n===rl)return s.RGB;if(n===fn)return s.RGBA;if(n===as)return s.DEPTH_COMPONENT;if(n===ys)return s.DEPTH_STENCIL;if(n===ol)return s.RED;if(n===Ao)return s.RED_INTEGER;if(n===al)return s.RG;if(n===Po)return s.RG_INTEGER;if(n===Ro)return s.RGBA_INTEGER;if(n===nr||n===ir||n===sr||n===rr)if(o===oe){if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;}else return null;}else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;}else return null;if(n===Io||n===Oo||n===Do||n===Lo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Do)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;}else return null;if(n===Fo||n===No||n===Uo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Fo||n===No)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Uo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;}else return null;if(n===Bo||n===Ho||n===ko||n===zo||n===Vo||n===Go||n===Wo||n===Xo||n===Yo||n===qo||n===Zo||n===$o||n===Ko||n===Jo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Bo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ho)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Vo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$o)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ko)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR;}else return null;if(n===or||n===jo||n===Qo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===or)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;}else return null;if(n===ll||n===ta||n===ea||n===na)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===or)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ta)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===na)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;}else return null;return n===_s?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null;}return{convert:e};}var aa=class extends nn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0;}},Xg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Rl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0;}init(t,e){if(this.texture===null){let n=new aa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n;}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new bn({vertexShader:Xg,fragmentShader:Yg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ue(new Pn(20,20),n);}return this.mesh;}reset(){this.texture=null,this.mesh=null;}getDepthTexture(){return this.texture;}},Il=class extends Zn{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,_=new Rl(),m={},f=e.getContextAttributes(),T=null,S=null,x=[],C=[],A=new $t(),R=null,O=new ke();O.viewport=new Se();let M=new ke();M.viewport=new Se();let b=[O,M],w=new fo(),z=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let at=x[W];return at===void 0&&(at=new ps(),x[W]=at),at.getTargetRaySpace();},this.getControllerGrip=function(W){let at=x[W];return at===void 0&&(at=new ps(),x[W]=at),at.getGripSpace();},this.getHand=function(W){let at=x[W];return at===void 0&&(at=new ps(),x[W]=at),at.getHandSpace();};function X(W){let at=C.indexOf(W.inputSource);if(at===-1)return;let it=x[at];it!==void 0&&(it.update(W.inputSource,W.frame,l||o),it.dispatchEvent({type:W.type,data:W.inputSource}));}function Z(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",Y);for(let W=0;W<x.length;W++){let at=C[W];at!==null&&(C[W]=null,x[W].disconnect(at));}z=null,H=null,_.reset();for(let W in m)delete m[W];t.setRenderTarget(T),p=null,d=null,u=null,i=null,S=null,le.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"});}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");},this.getReferenceSpace=function(){return l||o;},this.setReferenceSpace=function(W){l=W;},this.getBaseLayer=function(){return d!==null?d:p;},this.getBinding=function(){return u;},this.getFrame=function(){return g;},this.getSession=function(){return i;},this.setSession=function(W){return Q(this,null,function*(){if(i=W,i!==null){if(T=t.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&(yield e.makeXRCompatible()),R=t.getPixelRatio(),t.getSize(A),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(i,e)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,Rt=null,It=null;f.depth&&(It=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=f.stencil?ys:as,Rt=f.stencil?_s:mi);let Ut={colorFormat:e.RGBA8,depthFormat:It,scaleFactor:r};d=u.createProjectionLayer(Ut),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new Cn(d.textureWidth,d.textureHeight,{format:fn,type:Dn,depthTexture:new Zs(d.textureWidth,d.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1});}else{let it={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,it),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Cn(p.framebufferWidth,p.framebufferHeight,{format:fn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1});}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=yield i.requestReferenceSpace(a),le.setContext(i),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"});}});},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode;},this.getDepthTexture=function(){return _.getDepthTexture();};function Y(W){for(let at=0;at<W.removed.length;at++){let it=W.removed[at],Rt=C.indexOf(it);Rt>=0&&(C[Rt]=null,x[Rt].disconnect(it));}for(let at=0;at<W.added.length;at++){let it=W.added[at],Rt=C.indexOf(it);if(Rt===-1){for(let Ut=0;Ut<x.length;Ut++)if(Ut>=C.length){C.push(it),Rt=Ut;break;}else if(C[Ut]===null){C[Ut]=it,Rt=Ut;break;}if(Rt===-1)break;}let It=x[Rt];It&&It.connect(it);}}let $=new N(),k=new N();function ot(W,at,it){$.setFromMatrixPosition(at.matrixWorld),k.setFromMatrixPosition(it.matrixWorld);let Rt=$.distanceTo(k),It=at.projectionMatrix.elements,Ut=it.projectionMatrix.elements,Te=It[14]/(It[10]-1),Kt=It[14]/(It[10]+1),P=(It[9]+1)/It[5],ue=(It[9]-1)/It[5],Ct=(It[8]-1)/It[0],ee=(Ut[8]+1)/Ut[0],Tt=Te*Ct,me=Te*ee,mt=Rt/(-Ct+ee),Wt=mt*-Ct;if(at.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Wt),W.translateZ(mt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),It[10]===-1)W.projectionMatrix.copy(at.projectionMatrix),W.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let Le=Te+mt,Ee=Kt+mt,E=Tt-Wt,y=me+(Rt-Wt),F=P*Kt/Ee*Le,G=ue*Kt/Ee*Le;W.projectionMatrix.makePerspective(E,y,F,G,Le,Ee),W.projectionMatrixInverse.copy(W.projectionMatrix).invert();}}function dt(W,at){at===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(at.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert();}this.updateCamera=function(W){if(i===null)return;let at=W.near,it=W.far;_.texture!==null&&(_.depthNear>0&&(at=_.depthNear),_.depthFar>0&&(it=_.depthFar)),w.near=M.near=O.near=at,w.far=M.far=O.far=it,(z!==w.near||H!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),z=w.near,H=w.far),w.layers.mask=W.layers.mask|6,O.layers.mask=w.layers.mask&3,M.layers.mask=w.layers.mask&5;let Rt=W.parent,It=w.cameras;dt(w,Rt);for(let Ut=0;Ut<It.length;Ut++)dt(It[Ut],Rt);It.length===2?ot(w,O,M):w.projectionMatrix.copy(O.projectionMatrix),Et(W,w,Rt);};function Et(W,at,it){it===null?W.matrix.copy(at.matrixWorld):(W.matrix.copy(it.matrixWorld),W.matrix.invert(),W.matrix.multiply(at.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(at.projectionMatrix),W.projectionMatrixInverse.copy(at.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ls*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1);}this.getCamera=function(){return w;},this.getFoveation=function(){if(!(d===null&&p===null))return c;},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W);},this.hasDepthSensing=function(){return _.texture!==null;},this.getDepthSensingMesh=function(){return _.getMesh(w);},this.getCameraTexture=function(W){return m[W];};let Gt=null;function pe(W,at){if(h=at.getViewerPose(l||o),g=at,h!==null){let it=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Rt=!1;it.length!==w.cameras.length&&(w.cameras.length=0,Rt=!0);for(let Kt=0;Kt<it.length;Kt++){let P=it[Kt],ue=null;if(p!==null)ue=p.getViewport(P);else{let ee=u.getViewSubImage(d,P);ue=ee.viewport,Kt===0&&(t.setRenderTargetTextures(S,ee.colorTexture,ee.depthStencilTexture),t.setRenderTarget(S));}let Ct=b[Kt];Ct===void 0&&(Ct=new ke(),Ct.layers.enable(Kt),Ct.viewport=new Se(),b[Kt]=Ct),Ct.matrix.fromArray(P.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(P.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(ue.x,ue.y,ue.width,ue.height),Kt===0&&(w.matrix.copy(Ct.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),Rt===!0&&w.cameras.push(Ct);}let It=i.enabledFeatures;if(It&&It.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){let Kt=u.getDepthInformation(it[0]);Kt&&Kt.isValid&&Kt.texture&&_.init(Kt,i.renderState);}if(It&&It.includes("camera-access")&&(t.state.unbindTexture(),u))for(let Kt=0;Kt<it.length;Kt++){let P=it[Kt].camera;if(P){let ue=m[P];ue||(ue=new aa(),m[P]=ue);let Ct=u.getCameraImage(P);ue.sourceTexture=Ct;}}}for(let it=0;it<x.length;it++){let Rt=C[it],It=x[it];Rt!==null&&It!==void 0&&It.update(Rt,at,l||o);}Gt&&Gt(W,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null;}let le=new su();le.setAnimationLoop(pe),this.setAnimationLoop=function(W){Gt=W;},this.dispose=function(){};}},Ni=new Pi(),qg=new Me();function Zg(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix);}function n(m,f){f.color.getRGB(m.fogColor.value,fl(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density);}function i(m,f,T,S,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,T,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1);}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ye&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ye&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let T=t.get(f),S=T.envMap,x=T.envMapRotation;S&&(m.envMap.value=S,Ni.copy(x),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),m.envMapRotation.value.setFromMatrix4(qg.makeRotationFromEuler(Ni)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform));}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform));}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale;}function c(m,f,T,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4);}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap);}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity);}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ye&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform));}function g(m,f){f.matcap&&(m.matcap.value=f.matcap);}function _(m,f){let T=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far;}return{refreshFogUniforms:n,refreshMaterialUniforms:i};}function $g(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,S){let x=S.program;n.uniformBlockBinding(T,x);}function l(T,S){let x=i[T.id];x===void 0&&(g(T),x=h(T),i[T.id]=x,T.addEventListener("dispose",m));let C=S.program;n.updateUBOMapping(T,C);let A=t.render.frame;r[T.id]!==A&&(d(T),r[T.id]=A);}function h(T){let S=u();T.__bindingPointIndex=S;let x=s.createBuffer(),C=T.__size,A=T.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,x),x;}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0;}function d(T){let S=i[T.id],x=T.uniforms,C=T.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let A=0,R=x.length;A<R;A++){let O=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,b=O.length;M<b;M++){let w=O[M];if(p(w,A,M,C)===!0){let z=w.__offset,H=Array.isArray(w.value)?w.value:[w.value],X=0;for(let Z=0;Z<H.length;Z++){let Y=H[Z],$=_(Y);typeof Y=="number"||typeof Y=="boolean"?(w.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,z+X,w.__data)):Y.isMatrix3?(w.__data[0]=Y.elements[0],w.__data[1]=Y.elements[1],w.__data[2]=Y.elements[2],w.__data[3]=0,w.__data[4]=Y.elements[3],w.__data[5]=Y.elements[4],w.__data[6]=Y.elements[5],w.__data[7]=0,w.__data[8]=Y.elements[6],w.__data[9]=Y.elements[7],w.__data[10]=Y.elements[8],w.__data[11]=0):(Y.toArray(w.__data,X),X+=$.storage/Float32Array.BYTES_PER_ELEMENT);}s.bufferSubData(s.UNIFORM_BUFFER,z,w.__data);}}}s.bindBuffer(s.UNIFORM_BUFFER,null);}function p(T,S,x,C){let A=T.value,R=S+"_"+x;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{let O=C[R];if(typeof A=="number"||typeof A=="boolean"){if(O!==A)return C[R]=A,!0;}else if(O.equals(A)===!1)return O.copy(A),!0;}return!1;}function g(T){let S=T.uniforms,x=0,C=16;for(let R=0,O=S.length;R<O;R++){let M=Array.isArray(S[R])?S[R]:[S[R]];for(let b=0,w=M.length;b<w;b++){let z=M[b],H=Array.isArray(z.value)?z.value:[z.value];for(let X=0,Z=H.length;X<Z;X++){let Y=H[X],$=_(Y),k=x%C,ot=k%$.boundary,dt=k+ot;x+=ot,dt!==0&&C-dt<$.storage&&(x+=C-dt),z.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=$.storage;}}}let A=x%C;return A>0&&(x+=C-A),T.__size=x,T.__cache={},this;}function _(T){let S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S;}function m(T){let S=T.target;S.removeEventListener("dispose",m);let x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id];}function f(){for(let T in i)s.deleteBuffer(i[T]);o=[],i={},r={};}return{bind:c,update:l,dispose:f};}var lr=class{constructor(t={}){let{canvas:e=Rh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha;}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,f=null,T=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,C=!1;this._outputColorSpace=Ie;let A=0,R=0,O=null,M=-1,b=null,w=new Se(),z=new Se(),H=null,X=new te(0),Z=0,Y=e.width,$=e.height,k=1,ot=null,dt=null,Et=new Se(0,0,Y,$),Gt=new Se(0,0,Y,$),pe=!1,le=new Ri(),W=!1,at=!1,it=new Me(),Rt=new N(),It=new Se(),Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Kt(){return O===null?k:1;}let P=n;function ue(v,D){return e.getContext(v,D);}try{let v={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${po}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",J,!1),P===null){let D="webgl2";if(P=ue(D,v),P===null)throw ue(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.");}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v;}let Ct,ee,Tt,me,mt,Wt,Le,Ee,E,y,F,G,K,V,Mt,nt,vt,xt,tt,ut,Dt,bt,lt,kt;function I(){Ct=new fm(P),Ct.init(),bt=new Wg(P,Ct),ee=new om(P,Ct,t,bt),Tt=new Vg(P,Ct),ee.reversedDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),me=new gm(P),mt=new Pg(),Wt=new Gg(P,Ct,Tt,mt,ee,bt,me),Le=new lm(x),Ee=new dm(x),E=new bd(P),lt=new sm(P,E),y=new pm(P,E,me,lt),F=new ym(P,y,E,me),tt=new _m(P,ee,Wt),nt=new am(mt),G=new Ag(x,Le,Ee,Ct,ee,lt,nt),K=new Zg(x,mt),V=new Ig(),Mt=new Ug(Ct),xt=new im(x,Le,Ee,Tt,F,p,c),vt=new kg(x,F,ee),kt=new $g(P,me,ee,Tt),ut=new rm(P,Ct,me),Dt=new mm(P,Ct,me),me.programs=G.programs,x.capabilities=ee,x.extensions=Ct,x.properties=mt,x.renderLists=V,x.shadowMap=vt,x.state=Tt,x.info=me;}I();let et=new Il(x,P);this.xr=et,this.getContext=function(){return P;},this.getContextAttributes=function(){return P.getContextAttributes();},this.forceContextLoss=function(){let v=Ct.get("WEBGL_lose_context");v&&v.loseContext();},this.forceContextRestore=function(){let v=Ct.get("WEBGL_lose_context");v&&v.restoreContext();},this.getPixelRatio=function(){return k;},this.setPixelRatio=function(v){v!==void 0&&(k=v,this.setSize(Y,$,!1));},this.getSize=function(v){return v.set(Y,$);},this.setSize=function(v,D,U=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return;}Y=v,$=D,e.width=Math.floor(v*k),e.height=Math.floor(D*k),U===!0&&(e.style.width=v+"px",e.style.height=D+"px"),this.setViewport(0,0,v,D);},this.getDrawingBufferSize=function(v){return v.set(Y*k,$*k).floor();},this.setDrawingBufferSize=function(v,D,U){Y=v,$=D,k=U,e.width=Math.floor(v*U),e.height=Math.floor(D*U),this.setViewport(0,0,v,D);},this.getCurrentViewport=function(v){return v.copy(w);},this.getViewport=function(v){return v.copy(Et);},this.setViewport=function(v,D,U,B){v.isVector4?Et.set(v.x,v.y,v.z,v.w):Et.set(v,D,U,B),Tt.viewport(w.copy(Et).multiplyScalar(k).round());},this.getScissor=function(v){return v.copy(Gt);},this.setScissor=function(v,D,U,B){v.isVector4?Gt.set(v.x,v.y,v.z,v.w):Gt.set(v,D,U,B),Tt.scissor(z.copy(Gt).multiplyScalar(k).round());},this.getScissorTest=function(){return pe;},this.setScissorTest=function(v){Tt.setScissorTest(pe=v);},this.setOpaqueSort=function(v){ot=v;},this.setTransparentSort=function(v){dt=v;},this.getClearColor=function(v){return v.copy(xt.getClearColor());},this.setClearColor=function(){xt.setClearColor(...arguments);},this.getClearAlpha=function(){return xt.getClearAlpha();},this.setClearAlpha=function(){xt.setClearAlpha(...arguments);},this.clear=function(v=!0,D=!0,U=!0){let B=0;if(v){let L=!1;if(O!==null){let j=O.texture.format;L=j===Ro||j===Po||j===Ao;}if(L){let j=O.texture.type,ct=j===Dn||j===mi||j===ms||j===_s||j===wo||j===Co,gt=xt.getClearColor(),ft=xt.getClearAlpha(),Ot=gt.r,Lt=gt.g,wt=gt.b;ct?(g[0]=Ot,g[1]=Lt,g[2]=wt,g[3]=ft,P.clearBufferuiv(P.COLOR,0,g)):(_[0]=Ot,_[1]=Lt,_[2]=wt,_[3]=ft,P.clearBufferiv(P.COLOR,0,_));}else B|=P.COLOR_BUFFER_BIT;}D&&(B|=P.DEPTH_BUFFER_BIT),U&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(B);},this.clearColor=function(){this.clear(!0,!1,!1);},this.clearDepth=function(){this.clear(!1,!0,!1);},this.clearStencil=function(){this.clear(!1,!1,!0);},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",J,!1),xt.dispose(),V.dispose(),Mt.dispose(),mt.dispose(),Le.dispose(),Ee.dispose(),F.dispose(),lt.dispose(),kt.dispose(),G.dispose(),et.dispose(),et.removeEventListener("sessionstart",Mn),et.removeEventListener("sessionend",Dl),_i.stop();};function st(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0;}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let v=me.autoReset,D=vt.enabled,U=vt.autoUpdate,B=vt.needsUpdate,L=vt.type;I(),me.autoReset=v,vt.enabled=D,vt.autoUpdate=U,vt.needsUpdate=B,vt.type=L;}function J(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage);}function q(v){let D=v.target;D.removeEventListener("dispose",q),_t(D);}function _t(v){Bt(v),mt.remove(v);}function Bt(v){let D=mt.get(v).programs;D!==void 0&&(D.forEach(function(U){G.releaseProgram(U);}),v.isShaderMaterial&&G.releaseShaderCache(v));}this.renderBufferDirect=function(v,D,U,B,L,j){D===null&&(D=Ut);let ct=L.isMesh&&L.matrixWorld.determinant()<0,gt=uu(v,D,U,B,L);Tt.setMaterial(B,ct);let ft=U.index,Ot=1;if(B.wireframe===!0){if(ft=y.getWireframeAttribute(U),ft===void 0)return;Ot=2;}let Lt=U.drawRange,wt=U.attributes.position,Xt=Lt.start*Ot,ae=(Lt.start+Lt.count)*Ot;j!==null&&(Xt=Math.max(Xt,j.start*Ot),ae=Math.min(ae,(j.start+j.count)*Ot)),ft!==null?(Xt=Math.max(Xt,0),ae=Math.min(ae,ft.count)):wt!=null&&(Xt=Math.max(Xt,0),ae=Math.min(ae,wt.count));let xe=ae-Xt;if(xe<0||xe===1/0)return;lt.setup(L,B,gt,U,ft);let fe,ce=ut;if(ft!==null&&(fe=E.get(ft),ce=Dt,ce.setIndex(fe)),L.isMesh)B.wireframe===!0?(Tt.setLineWidth(B.wireframeLinewidth*Kt()),ce.setMode(P.LINES)):ce.setMode(P.TRIANGLES);else if(L.isLine){let At=B.linewidth;At===void 0&&(At=1),Tt.setLineWidth(At*Kt()),L.isLineSegments?ce.setMode(P.LINES):L.isLineLoop?ce.setMode(P.LINE_LOOP):ce.setMode(P.LINE_STRIP);}else L.isPoints?ce.setMode(P.POINTS):L.isSprite&&ce.setMode(P.TRIANGLES);if(L.isBatchedMesh){if(L._multiDrawInstances!==null)Ai("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ct.get("WEBGL_multi_draw"))ce.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let At=L._multiDrawStarts,ye=L._multiDrawCounts,Qt=L._multiDrawCount,Ze=ft?E.get(ft).bytesPerElement:1,Hi=mt.get(B).currentProgram.getUniforms();for(let $e=0;$e<Qt;$e++)Hi.setValue(P,"_gl_DrawID",$e),ce.render(At[$e]/Ze,ye[$e]);}}else if(L.isInstancedMesh)ce.renderInstances(Xt,xe,L.count);else if(U.isInstancedBufferGeometry){let At=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,ye=Math.min(U.instanceCount,At);ce.renderInstances(Xt,xe,ye);}else ce.render(Xt,xe);};function de(v,D,U){v.transparent===!0&&v.side===In&&v.forceSinglePass===!1?(v.side=Ye,v.needsUpdate=!0,hr(v,D,U),v.side=qn,v.needsUpdate=!0,hr(v,D,U),v.side=In):hr(v,D,U);}this.compile=function(v,D,U=null){U===null&&(U=v),f=Mt.get(U),f.init(D),S.push(f),U.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L));}),v!==U&&v.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L));}),f.setupLights();let B=new Set();return v.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let j=L.material;if(j)if(Array.isArray(j))for(let ct=0;ct<j.length;ct++){let gt=j[ct];de(gt,U,L),B.add(gt);}else de(j,U,L),B.add(j);}),f=S.pop(),B;},this.compileAsync=function(v,D,U=null){let B=this.compile(v,D,U);return new Promise(L=>{function j(){if(B.forEach(function(ct){mt.get(ct).currentProgram.isReady()&&B.delete(ct);}),B.size===0){L(v);return;}setTimeout(j,10);}Ct.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10);});};let ne=null;function Nn(v){ne&&ne(v);}function Mn(){_i.stop();}function Dl(){_i.start();}let _i=new su();_i.setAnimationLoop(Nn),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(v){ne=v,et.setAnimationLoop(v),v===null?_i.stop():_i.start();},et.addEventListener("sessionstart",Mn),et.addEventListener("sessionend",Dl),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return;}if(C===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(D),D=et.getCamera()),v.isScene===!0&&v.onBeforeRender(x,v,D,O),f=Mt.get(v,S.length),f.init(D),S.push(f),it.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),le.setFromProjectionMatrix(it,xn,D.reversedDepth),at=this.localClippingEnabled,W=nt.init(this.clippingPlanes,at),m=V.get(v,T.length),m.init(),T.push(m),et.enabled===!0&&et.isPresenting===!0){let j=x.xr.getDepthSensingMesh();j!==null&&ga(j,D,-1/0,x.sortObjects);}ga(v,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ot,dt),Te=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Te&&xt.addToRenderList(m,v),this.info.render.frame++,W===!0&&nt.beginShadows();let U=f.state.shadowsArray;vt.render(U,v,D),W===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=m.opaque,L=m.transmissive;if(f.setupLights(),D.isArrayCamera){let j=D.cameras;if(L.length>0)for(let ct=0,gt=j.length;ct<gt;ct++){let ft=j[ct];Fl(B,L,v,ft);}Te&&xt.render(v);for(let ct=0,gt=j.length;ct<gt;ct++){let ft=j[ct];Ll(m,v,ft,ft.viewport);}}else L.length>0&&Fl(B,L,v,D),Te&&xt.render(v),Ll(m,v,D);O!==null&&R===0&&(Wt.updateMultisampleRenderTarget(O),Wt.updateRenderTargetMipmap(O)),v.isScene===!0&&v.onAfterRender(x,v,D),lt.resetDefaultState(),M=-1,b=null,S.pop(),S.length>0?(f=S[S.length-1],W===!0&&nt.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,T.pop(),T.length>0?m=T[T.length-1]:m=null;};function ga(v,D,U,B){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)U=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)f.pushLight(v),v.castShadow&&f.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||le.intersectsSprite(v)){B&&It.setFromMatrixPosition(v.matrixWorld).applyMatrix4(it);let ct=F.update(v),gt=v.material;gt.visible&&m.push(v,ct,gt,U,It.z,null);}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||le.intersectsObject(v))){let ct=F.update(v),gt=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),It.copy(v.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),It.copy(ct.boundingSphere.center)),It.applyMatrix4(v.matrixWorld).applyMatrix4(it)),Array.isArray(gt)){let ft=ct.groups;for(let Ot=0,Lt=ft.length;Ot<Lt;Ot++){let wt=ft[Ot],Xt=gt[wt.materialIndex];Xt&&Xt.visible&&m.push(v,ct,Xt,U,It.z,wt);}}else gt.visible&&m.push(v,ct,gt,U,It.z,null);}}let j=v.children;for(let ct=0,gt=j.length;ct<gt;ct++)ga(j[ct],D,U,B);}function Ll(v,D,U,B){let L=v.opaque,j=v.transmissive,ct=v.transparent;f.setupLightsView(U),W===!0&&nt.setGlobalState(x.clippingPlanes,U),B&&Tt.viewport(w.copy(B)),L.length>0&&cr(L,D,U),j.length>0&&cr(j,D,U),ct.length>0&&cr(ct,D,U),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1);}function Fl(v,D,U,B){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[B.id]===void 0&&(f.state.transmissionRenderTarget[B.id]=new Cn(1,1,{generateMipmaps:!0,type:Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float")?gs:Dn,minFilter:On,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let j=f.state.transmissionRenderTarget[B.id],ct=B.viewport||w;j.setSize(ct.z*x.transmissionResolutionScale,ct.w*x.transmissionResolutionScale);let gt=x.getRenderTarget(),ft=x.getActiveCubeFace(),Ot=x.getActiveMipmapLevel();x.setRenderTarget(j),x.getClearColor(X),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),Te&&xt.render(U);let Lt=x.toneMapping;x.toneMapping=Jn;let wt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),f.setupLightsView(B),W===!0&&nt.setGlobalState(x.clippingPlanes,B),cr(v,U,B),Wt.updateMultisampleRenderTarget(j),Wt.updateRenderTargetMipmap(j),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let ae=0,xe=D.length;ae<xe;ae++){let fe=D[ae],ce=fe.object,At=fe.geometry,ye=fe.material,Qt=fe.group;if(ye.side===In&&ce.layers.test(B.layers)){let Ze=ye.side;ye.side=Ye,ye.needsUpdate=!0,Nl(ce,U,B,At,ye,Qt),ye.side=Ze,ye.needsUpdate=!0,Xt=!0;}}Xt===!0&&(Wt.updateMultisampleRenderTarget(j),Wt.updateRenderTargetMipmap(j));}x.setRenderTarget(gt,ft,Ot),x.setClearColor(X,Z),wt!==void 0&&(B.viewport=wt),x.toneMapping=Lt;}function cr(v,D,U){let B=D.isScene===!0?D.overrideMaterial:null;for(let L=0,j=v.length;L<j;L++){let ct=v[L],gt=ct.object,ft=ct.geometry,Ot=ct.group,Lt=ct.material;Lt.allowOverride===!0&&B!==null&&(Lt=B),gt.layers.test(U.layers)&&Nl(gt,D,U,ft,Lt,Ot);}}function Nl(v,D,U,B,L,j){v.onBeforeRender(x,D,U,B,L,j),v.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),L.onBeforeRender(x,D,U,B,v,j),L.transparent===!0&&L.side===In&&L.forceSinglePass===!1?(L.side=Ye,L.needsUpdate=!0,x.renderBufferDirect(U,D,B,L,v,j),L.side=qn,L.needsUpdate=!0,x.renderBufferDirect(U,D,B,L,v,j),L.side=In):x.renderBufferDirect(U,D,B,L,v,j),v.onAfterRender(x,D,U,B,L,j);}function hr(v,D,U){D.isScene!==!0&&(D=Ut);let B=mt.get(v),L=f.state.lights,j=f.state.shadowsArray,ct=L.state.version,gt=G.getParameters(v,L.state,j,D,U),ft=G.getProgramCacheKey(gt),Ot=B.programs;B.environment=v.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(v.isMeshStandardMaterial?Ee:Le).get(v.envMap||B.environment),B.envMapRotation=B.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Ot===void 0&&(v.addEventListener("dispose",q),Ot=new Map(),B.programs=Ot);let Lt=Ot.get(ft);if(Lt!==void 0){if(B.currentProgram===Lt&&B.lightsStateVersion===ct)return Bl(v,gt),Lt;}else gt.uniforms=G.getUniforms(v),v.onBeforeCompile(gt,x),Lt=G.acquireProgram(gt,ft),Ot.set(ft,Lt),B.uniforms=gt.uniforms;let wt=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(wt.clippingPlanes=nt.uniform),Bl(v,gt),B.needsLights=fu(v),B.lightsStateVersion=ct,B.needsLights&&(wt.ambientLightColor.value=L.state.ambient,wt.lightProbe.value=L.state.probe,wt.directionalLights.value=L.state.directional,wt.directionalLightShadows.value=L.state.directionalShadow,wt.spotLights.value=L.state.spot,wt.spotLightShadows.value=L.state.spotShadow,wt.rectAreaLights.value=L.state.rectArea,wt.ltc_1.value=L.state.rectAreaLTC1,wt.ltc_2.value=L.state.rectAreaLTC2,wt.pointLights.value=L.state.point,wt.pointLightShadows.value=L.state.pointShadow,wt.hemisphereLights.value=L.state.hemi,wt.directionalShadowMap.value=L.state.directionalShadowMap,wt.directionalShadowMatrix.value=L.state.directionalShadowMatrix,wt.spotShadowMap.value=L.state.spotShadowMap,wt.spotLightMatrix.value=L.state.spotLightMatrix,wt.spotLightMap.value=L.state.spotLightMap,wt.pointShadowMap.value=L.state.pointShadowMap,wt.pointShadowMatrix.value=L.state.pointShadowMatrix),B.currentProgram=Lt,B.uniformsList=null,Lt;}function Ul(v){if(v.uniformsList===null){let D=v.currentProgram.getUniforms();v.uniformsList=Ms.seqWithValue(D.seq,v.uniforms);}return v.uniformsList;}function Bl(v,D){let U=mt.get(v);U.outputColorSpace=D.outputColorSpace,U.batching=D.batching,U.batchingColor=D.batchingColor,U.instancing=D.instancing,U.instancingColor=D.instancingColor,U.instancingMorph=D.instancingMorph,U.skinning=D.skinning,U.morphTargets=D.morphTargets,U.morphNormals=D.morphNormals,U.morphColors=D.morphColors,U.morphTargetsCount=D.morphTargetsCount,U.numClippingPlanes=D.numClippingPlanes,U.numIntersection=D.numClipIntersection,U.vertexAlphas=D.vertexAlphas,U.vertexTangents=D.vertexTangents,U.toneMapping=D.toneMapping;}function uu(v,D,U,B,L){D.isScene!==!0&&(D=Ut),Wt.resetTextureUnits();let j=D.fog,ct=B.isMeshStandardMaterial?D.environment:null,gt=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ci,ft=(B.isMeshStandardMaterial?Ee:Le).get(B.envMap||ct),Ot=B.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,Lt=!!U.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),wt=!!U.morphAttributes.position,Xt=!!U.morphAttributes.normal,ae=!!U.morphAttributes.color,xe=Jn;B.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(xe=x.toneMapping);let fe=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ce=fe!==void 0?fe.length:0,At=mt.get(B),ye=f.state.lights;if(W===!0&&(at===!0||v!==b)){let Ve=v===b&&B.id===M;nt.setState(B,v,Ve);}let Qt=!1;B.version===At.__version?(At.needsLights&&At.lightsStateVersion!==ye.state.version||At.outputColorSpace!==gt||L.isBatchedMesh&&At.batching===!1||!L.isBatchedMesh&&At.batching===!0||L.isBatchedMesh&&At.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&At.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&At.instancing===!1||!L.isInstancedMesh&&At.instancing===!0||L.isSkinnedMesh&&At.skinning===!1||!L.isSkinnedMesh&&At.skinning===!0||L.isInstancedMesh&&At.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&At.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&At.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&At.instancingMorph===!1&&L.morphTexture!==null||At.envMap!==ft||B.fog===!0&&At.fog!==j||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==nt.numPlanes||At.numIntersection!==nt.numIntersection)||At.vertexAlphas!==Ot||At.vertexTangents!==Lt||At.morphTargets!==wt||At.morphNormals!==Xt||At.morphColors!==ae||At.toneMapping!==xe||At.morphTargetsCount!==ce)&&(Qt=!0):(Qt=!0,At.__version=B.version);let Ze=At.currentProgram;Qt===!0&&(Ze=hr(B,D,L));let Hi=!1,$e=!1,Ts=!1,ve=Ze.getUniforms(),sn=At.uniforms;if(Tt.useProgram(Ze.program)&&(Hi=!0,$e=!0,Ts=!0),B.id!==M&&(M=B.id,$e=!0),Hi||b!==v){Tt.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ve.setValue(P,"projectionMatrix",v.projectionMatrix),ve.setValue(P,"viewMatrix",v.matrixWorldInverse);let qe=ve.map.cameraPosition;qe!==void 0&&qe.setValue(P,Rt.setFromMatrixPosition(v.matrixWorld)),ee.logarithmicDepthBuffer&&ve.setValue(P,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ve.setValue(P,"isOrthographic",v.isOrthographicCamera===!0),b!==v&&(b=v,$e=!0,Ts=!0);}if(L.isSkinnedMesh){ve.setOptional(P,L,"bindMatrix"),ve.setOptional(P,L,"bindMatrixInverse");let Ve=L.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),ve.setValue(P,"boneTexture",Ve.boneTexture,Wt));}L.isBatchedMesh&&(ve.setOptional(P,L,"batchingTexture"),ve.setValue(P,"batchingTexture",L._matricesTexture,Wt),ve.setOptional(P,L,"batchingIdTexture"),ve.setValue(P,"batchingIdTexture",L._indirectTexture,Wt),ve.setOptional(P,L,"batchingColorTexture"),L._colorsTexture!==null&&ve.setValue(P,"batchingColorTexture",L._colorsTexture,Wt));let rn=U.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&tt.update(L,U,Ze),($e||At.receiveShadow!==L.receiveShadow)&&(At.receiveShadow=L.receiveShadow,ve.setValue(P,"receiveShadow",L.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(sn.envMap.value=ft,sn.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(sn.envMapIntensity.value=D.environmentIntensity),$e&&(ve.setValue(P,"toneMappingExposure",x.toneMappingExposure),At.needsLights&&du(sn,Ts),j&&B.fog===!0&&K.refreshFogUniforms(sn,j),K.refreshMaterialUniforms(sn,B,k,$,f.state.transmissionRenderTarget[v.id]),Ms.upload(P,Ul(At),sn,Wt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ms.upload(P,Ul(At),sn,Wt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ve.setValue(P,"center",L.center),ve.setValue(P,"modelViewMatrix",L.modelViewMatrix),ve.setValue(P,"normalMatrix",L.normalMatrix),ve.setValue(P,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let Ve=B.uniformsGroups;for(let qe=0,_a=Ve.length;qe<_a;qe++){let yi=Ve[qe];kt.update(yi,Ze),kt.bind(yi,Ze);}}return Ze;}function du(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D;}function fu(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0;}this.getActiveCubeFace=function(){return A;},this.getActiveMipmapLevel=function(){return R;},this.getRenderTarget=function(){return O;},this.setRenderTargetTextures=function(v,D,U){let B=mt.get(v);B.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),mt.get(v.texture).__webglTexture=D,mt.get(v.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:U,B.__hasExternalTextures=!0;},this.setRenderTargetFramebuffer=function(v,D){let U=mt.get(v);U.__webglFramebuffer=D,U.__useDefaultFramebuffer=D===void 0;};let pu=P.createFramebuffer();this.setRenderTarget=function(v,D=0,U=0){O=v,A=D,R=U;let B=!0,L=null,j=!1,ct=!1;if(v){let ft=mt.get(v);if(ft.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(P.FRAMEBUFFER,null),B=!1;else if(ft.__webglFramebuffer===void 0)Wt.setupRenderTarget(v);else if(ft.__hasExternalTextures)Wt.rebindTextures(v,mt.get(v.texture).__webglTexture,mt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let wt=v.depthTexture;if(ft.__boundDepthTexture!==wt){if(wt!==null&&mt.has(wt)&&(v.width!==wt.image.width||v.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Wt.setupDepthRenderbuffer(v);}}let Ot=v.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(ct=!0);let Lt=mt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Lt[D])?L=Lt[D][U]:L=Lt[D],j=!0):v.samples>0&&Wt.useMultisampledRTT(v)===!1?L=mt.get(v).__webglMultisampledFramebuffer:Array.isArray(Lt)?L=Lt[U]:L=Lt,w.copy(v.viewport),z.copy(v.scissor),H=v.scissorTest;}else w.copy(Et).multiplyScalar(k).floor(),z.copy(Gt).multiplyScalar(k).floor(),H=pe;if(U!==0&&(L=pu),Tt.bindFramebuffer(P.FRAMEBUFFER,L)&&B&&Tt.drawBuffers(v,L),Tt.viewport(w),Tt.scissor(z),Tt.setScissorTest(H),j){let ft=mt.get(v.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,ft.__webglTexture,U);}else if(ct){let ft=D;for(let Ot=0;Ot<v.textures.length;Ot++){let Lt=mt.get(v.textures[Ot]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ot,Lt.__webglTexture,U,ft);}}else if(v!==null&&U!==0){let ft=mt.get(v.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ft.__webglTexture,U);}M=-1;},this.readRenderTargetPixels=function(v,D,U,B,L,j,ct,gt=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return;}let ft=mt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft){Tt.bindFramebuffer(P.FRAMEBUFFER,ft);try{let Ot=v.textures[gt],Lt=Ot.format,wt=Ot.type;if(!ee.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return;}if(!ee.textureTypeReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return;}D>=0&&D<=v.width-B&&U>=0&&U<=v.height-L&&(v.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(D,U,B,L,bt.convert(Lt),bt.convert(wt),j));}finally{let Ot=O!==null?mt.get(O).__webglFramebuffer:null;Tt.bindFramebuffer(P.FRAMEBUFFER,Ot);}}},this.readRenderTargetPixelsAsync=function(v,D,U,B,L,j,ct,gt=0){return Q(this,null,function*(){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=mt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft)if(D>=0&&D<=v.width-B&&U>=0&&U<=v.height-L){Tt.bindFramebuffer(P.FRAMEBUFFER,ft);let Ot=v.textures[gt],Lt=Ot.format,wt=Ot.type;if(!ee.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ee.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Xt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.bufferData(P.PIXEL_PACK_BUFFER,j.byteLength,P.STREAM_READ),v.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(D,U,B,L,bt.convert(Lt),bt.convert(wt),0);let ae=O!==null?mt.get(O).__webglFramebuffer:null;Tt.bindFramebuffer(P.FRAMEBUFFER,ae);let xe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),yield Ih(P,xe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,j),P.deleteBuffer(Xt),P.deleteSync(xe),j;}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");});},this.copyFramebufferToTexture=function(v,D=null,U=0){let B=Math.pow(2,-U),L=Math.floor(v.image.width*B),j=Math.floor(v.image.height*B),ct=D!==null?D.x:0,gt=D!==null?D.y:0;Wt.setTexture2D(v,0),P.copyTexSubImage2D(P.TEXTURE_2D,U,0,0,ct,gt,L,j),Tt.unbindTexture();};let mu=P.createFramebuffer(),gu=P.createFramebuffer();this.copyTextureToTexture=function(v,D,U=null,B=null,L=0,j=null){j===null&&(L!==0?(Ai("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=L,L=0):j=0);let ct,gt,ft,Ot,Lt,wt,Xt,ae,xe,fe=v.isCompressedTexture?v.mipmaps[j]:v.image;if(U!==null)ct=U.max.x-U.min.x,gt=U.max.y-U.min.y,ft=U.isBox3?U.max.z-U.min.z:1,Ot=U.min.x,Lt=U.min.y,wt=U.isBox3?U.min.z:0;else{let rn=Math.pow(2,-L);ct=Math.floor(fe.width*rn),gt=Math.floor(fe.height*rn),v.isDataArrayTexture?ft=fe.depth:v.isData3DTexture?ft=Math.floor(fe.depth*rn):ft=1,Ot=0,Lt=0,wt=0;}B!==null?(Xt=B.x,ae=B.y,xe=B.z):(Xt=0,ae=0,xe=0);let ce=bt.convert(D.format),At=bt.convert(D.type),ye;D.isData3DTexture?(Wt.setTexture3D(D,0),ye=P.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Wt.setTexture2DArray(D,0),ye=P.TEXTURE_2D_ARRAY):(Wt.setTexture2D(D,0),ye=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);let Qt=P.getParameter(P.UNPACK_ROW_LENGTH),Ze=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Hi=P.getParameter(P.UNPACK_SKIP_PIXELS),$e=P.getParameter(P.UNPACK_SKIP_ROWS),Ts=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,fe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ot),P.pixelStorei(P.UNPACK_SKIP_ROWS,Lt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,wt);let ve=v.isDataArrayTexture||v.isData3DTexture,sn=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){let rn=mt.get(v),Ve=mt.get(D),qe=mt.get(rn.__renderTarget),_a=mt.get(Ve.__renderTarget);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,qe.__webglFramebuffer),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,_a.__webglFramebuffer);for(let yi=0;yi<ft;yi++)ve&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,mt.get(v).__webglTexture,L,wt+yi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,mt.get(D).__webglTexture,j,xe+yi)),P.blitFramebuffer(Ot,Lt,ct,gt,Xt,ae,ct,gt,P.DEPTH_BUFFER_BIT,P.NEAREST);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null);}else if(L!==0||v.isRenderTargetTexture||mt.has(v)){let rn=mt.get(v),Ve=mt.get(D);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,mu),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,gu);for(let qe=0;qe<ft;qe++)ve?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,rn.__webglTexture,L,wt+qe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,rn.__webglTexture,L),sn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ve.__webglTexture,j,xe+qe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ve.__webglTexture,j),L!==0?P.blitFramebuffer(Ot,Lt,ct,gt,Xt,ae,ct,gt,P.COLOR_BUFFER_BIT,P.NEAREST):sn?P.copyTexSubImage3D(ye,j,Xt,ae,xe+qe,Ot,Lt,ct,gt):P.copyTexSubImage2D(ye,j,Xt,ae,Ot,Lt,ct,gt);Tt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null);}else sn?v.isDataTexture||v.isData3DTexture?P.texSubImage3D(ye,j,Xt,ae,xe,ct,gt,ft,ce,At,fe.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(ye,j,Xt,ae,xe,ct,gt,ft,ce,fe.data):P.texSubImage3D(ye,j,Xt,ae,xe,ct,gt,ft,ce,At,fe):v.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,j,Xt,ae,ct,gt,ce,At,fe.data):v.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,j,Xt,ae,fe.width,fe.height,ce,fe.data):P.texSubImage2D(P.TEXTURE_2D,j,Xt,ae,ct,gt,ce,At,fe);P.pixelStorei(P.UNPACK_ROW_LENGTH,Qt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ze),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Hi),P.pixelStorei(P.UNPACK_SKIP_ROWS,$e),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ts),j===0&&D.generateMipmaps&&P.generateMipmap(ye),Tt.unbindTexture();},this.copyTextureToTexture3D=function(v,D,U=null,B=null,L=0){return Ai('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,D,U,B,L);},this.initRenderTarget=function(v){mt.get(v).__webglFramebuffer===void 0&&Wt.setupRenderTarget(v);},this.initTexture=function(v){v.isCubeTexture?Wt.setTextureCube(v,0):v.isData3DTexture?Wt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Wt.setTexture2DArray(v,0):Wt.setTexture2D(v,0),Tt.unbindTexture();},this.resetState=function(){A=0,R=0,O=null,Tt.reset(),lt.reset();},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}));}get coordinateSystem(){return xn;}get outputColorSpace(){return this._outputColorSpace;}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace();}};var ca=class s{config={radius:800,magnification:2,distortion:.3};constructor(){}setConfig(t){this.config=zt(zt({},this.config),t);}getConfig(){return zt({},this.config);}calculateEffect(t,e,n=1e3,i=1080){let r=t.x-e.x,o=t.y-e.y,a=Math.sqrt(r*r+o*o);if(a>this.config.radius)return null;let c=a/this.config.radius,l=1-Math.pow(c,3),h=1;if(this.config.maxHeight!==void 0&&this.config.cameraZ!==void 0&&this.config.fov!==void 0){let f=this.config.maxHeight/100*i,T=this.config.fov*Math.PI/180,S=2*Math.tan(T/2)*this.config.cameraZ,x=i/S,C=n*x;h=1+(f/C-1)*l;}else h=1+(this.config.magnification-1)*l;let u=this.config.distortion*l,d=Math.atan2(o,r),p=a*u,g=new $t(Math.cos(d)*p,Math.sin(d)*p),_=Math.floor(l*1e3)+1e3;return{scale:h,positionOffset:g,renderOrder:_};}static ɵfac=function(e){return new(e||s)();};static ɵprov=Qn({token:s,factory:s.ɵfac,providedIn:"root"});};var pn=class s{PHOTO_W;PHOTO_H;FOV_DEG;CAM_MARGIN;DEFAULT_COMPOSITION_MARGIN_RATIO=.1;MAX_COMPOSITION_MARGIN_RATIO=.3;CAM_DAMP;ANISO;BG;FISHEYE_SCALE_DAMPING=5;FISHEYE_RENDER_ORDER_BASE=1e6;static SVG_TARGET_RESOLUTION=4e3;static SVG_HOVER_OVERLAY_RESOLUTION=1024;container=null;renderer;overlayRenderer=null;static DEMO_DIM_BLUR_PX=8;static DEMO_DIM_OPACITY=.75;static DEMO_FOCUS_RENDER_ORDER=1e3;demoFocusPhotoId=null;scene;camera;root;clock;texLoader;rafRunning=!1;activeTweens=[];contentBounds={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};bounds={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};targetCamZ=1200;zSpawn=700;isInitialized=!1;destroy$=new Un();textureCache=new Map();loadingTextures=new Map();highResTextureCache=new Map();loadingHighResTextures=new Map();maxTextureSize=4096;svgBackgroundPlane;svgBackgroundTexture;svgBackgroundOptions;raycaster=new Qs();mouse=new $t();hasUserInteracted=!1;isDragging=!1;draggedMesh=null;dragPlane=new hn();dragOffset=new N();dragCallbacks=new Map();hoverOnlyMeshes=new Set();meshToPhotoId=new Map();photoIdToMesh=new Map();meshToPhotoData=new Map();currentLayoutStrategy=null;layoutStrategyRef=null;lastTouchDistance=0;touchStartDistance=0;touchPanStart={x:0,y:0};isTwoFingerGesture=!1;svgContainer=null;svgHoverOverlayElement=null;svgHoverOverlayGroups=new Map();svgHoverOverlayCanvas=null;svgHoverOverlayContext=null;svgHoverOverlayTexture;svgHoverOverlayPlane;activeHoverGroupId=null;hoverOverlayRenderToken=0;svgHoverOverlayCachedImages=new Map();svgHoverOverlayPendingImage=null;onDragCompleteCallback;onPhotoClickCallback;onBackgroundClickCallback;mouseDownPosition=new $t();clickThreshold=5;FALLBACK_MOUSE_MOVEMENT=1e3;hoveredMesh=null;wasFisheyeEnabled=!1;userControlEnabled=!0;targetCamX=0;targetCamY=0;computedMinCamZ=300;computedMaxCamZ=5e4;isPanning=!1;panStartMouse=new $t();panStartCameraPos=new N();cameraMode="auto-fit";camRoll=0;camMoveTweenId=0;camRollTweenId=0;lastMousePos=new $t();lastClientX=null;lastClientY=null;meshToUrl=new Map();meshToEnhancedUrl=new Map();highResActive=new Set();lodAccumTime=0;fisheyeService;fisheyeEnabled=!1;fisheyeEnabledSignal=!1;fisheyeResumeOnPointer=!1;frustum=new Ri();frustumMatrix=new Me();lastRenderTime=0;isSceneIdle=!1;idleCheckInterval=0;IDLE_THRESHOLD=.001;IDLE_CHECK_INTERVAL=.1;visibleMeshCount=0;totalMeshCount=0;cullingLogCounter=0;performanceMonitoring=!1;frameCount=0;lastFpsUpdate=0;currentFps=0;renderCount=0;skippedFrames=0;frameCallbacks=new Set();fisheyeAnimationLock=!1;fisheyeAffectedMeshes=new Set();topFisheyeMesh=null;thematicFisheyeEffectsEnabled=!1;layoutRotationOverrideEnabled=!1;fisheyeLastDeltaTime=1/60;fisheyePointerActive=!1;taxonomyEffectBaseOpacity=new Map();taxonomyHoverFocus=null;fisheyeFocusPoint=new N();permalinkTargetId=null;highResPriorityId=null;meshOriginalStates=new Map();hoveredItemSignal=Ft(!1);INTERACTIVE_OPACITY_THRESHOLD=.99;rotationSpeedMultiplier=1;panSensitivityMultiplier=1;dofStrength=0;dofPass=null;platformService=ge(ei);constructor(){this.fisheyeService=new ca();let t={};this.PHOTO_W=t.photoWidth??Nt.PHOTO_WIDTH,this.PHOTO_H=t.photoHeight??Nt.PHOTO_HEIGHT,this.FOV_DEG=t.fovDeg??45,this.CAM_MARGIN=t.cameraMargin??300,this.CAM_DAMP=t.cameraDamp??.1*1e4,this.ANISO=t.anisotropy??(this.platformService.isMobile?2:4),this.BG=t.background??16776694;}initialize(t,e){return Q(this,null,function*(){if(this.isInitialized)throw new Error("ThreeRendererService is already initialized");this.container=t,e&&e.svgBackground&&(this.svgBackgroundOptions=e.svgBackground),yield this.initializeThreeJS(),this.isInitialized=!0;});}createPhotoMesh(t){return Q(this,null,function*(){if(!this.isInitialized)throw new Error("ThreeRendererService not initialized");let e=yield this.loadTexture(t.url),n=new dn({map:e,transparent:!0,opacity:1}),i=new Pn(this.PHOTO_W,this.PHOTO_H),r=new Ue(i,n),o=t.currentPosition;r.position.set(o.x,o.y,o.z);let a=t.metadata.renderOrder;r.renderOrder=a!==void 0?a:0;let c=this.calculatePhotoRotation(t);return r.rotation.z=c,this.root.add(r),t.setMesh(r),this.meshToPhotoData.set(r,t),this.meshToUrl.set(r,t.url),this.meshToEnhancedUrl.set(r,t.enhancedUrl),r;});}updatePhotoMesh(t){if(!t.mesh)return;let e=t.currentPosition;t.mesh.position.set(e.x,e.y,e.z);let n=t.metadata.renderOrder;t.mesh.renderOrder=n!==void 0?n:0;let i=this.calculatePhotoRotation(t);t.mesh.rotation.z=i;}removePhotoMesh(t){if(!t.mesh)return;this.root.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material instanceof tn&&t.mesh.material.dispose(),this.meshToPhotoData.delete(t.mesh),this.meshToUrl.delete(t.mesh),this.meshToEnhancedUrl.delete(t.mesh);let e=this.meshToPhotoId.get(t.mesh);e&&this.photoIdToMesh.delete(e),this.meshToPhotoId.delete(t.mesh),this.dragCallbacks.delete(t.mesh),this.highResActive.delete(t.mesh),this.topFisheyeMesh===t.mesh&&(this.topFisheyeMesh=null),this.fisheyeAffectedMeshes.delete(t.mesh),this.taxonomyEffectBaseOpacity.delete(t.mesh),t.setMesh(null);}updateMeshPosition(t,e){t.position.set(e.x,e.y,e.z);}upgradeToHighResTexture(t,e){return Q(this,null,function*(){try{let n=yield this.loadHighResTexture(e);if(t.material instanceof dn){let i=t.material.map;i&&!this.highResTextureCache.has(e)&&i.dispose(),t.material.map=n,t.material.needsUpdate=!0,this.wakeUpRenderLoop();}}catch(n){console.warn("Failed to upgrade to high-res texture, keeping low-res:",n);}});}downgradeToLowResTexture(t,e){return Q(this,null,function*(){try{let n=yield this.loadTexture(e);t.material instanceof dn&&(t.material.map=n,t.material.needsUpdate=!0);}catch(n){console.warn("Failed to downgrade to low-res texture:",n);}});}removeMesh(t){this.root.remove(t),this.meshToUrl.delete(t),this.highResActive.delete(t),this.dragCallbacks.delete(t),this.hoverOnlyMeshes.delete(t),t.geometry.dispose(),t.material instanceof tn&&t.material.dispose();}animateToPosition(t,e,n,i){return new Promise(r=>{let o=this.makeTween(i,a=>{let c=this.easeOutCubic(a),l=this.easeInOutCubic(a),h=this.lerp(e.x,n.x,c),u=this.lerp(e.y,n.y,c),d=this.lerp(e.z,n.z,l);t.position.set(h,u,d),a>=1&&(t.position.set(n.x,n.y,n.z),r());});this.addTween(o);});}animateOpacity(t,e,n,i){return new Promise(r=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let o=this.makeTween(i,a=>{let c=this.easeOutCubic(a),l=this.lerp(e,n,c);t.material&&"opacity"in t.material&&(t.material.opacity=l),a>=1&&(t.material&&"opacity"in t.material&&(t.material.opacity=n),r());});this.addTween(o);});}animatePositionAndOpacity(t,e,n,i,r,o){return new Promise(a=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let c=this.makeTween(o,l=>{let h=this.easeOutCubic(l),u=this.easeInOutCubic(l),d=this.lerp(e.x,n.x,h),p=this.lerp(e.y,n.y,h),g=this.lerp(e.z,n.z,u);t.position.set(d,p,g);let _=this.lerp(i,r,h);t.material&&"opacity"in t.material&&(t.material.opacity=_),l>=1&&(t.position.set(n.x,n.y,n.z),t.material&&"opacity"in t.material&&(t.material.opacity=r),a());});this.addTween(c);});}setSceneBounds(t,e){if(this.contentBounds=zt({},t),this.bounds=this.expandBoundsForCompositionMargin(t,this.MAX_COMPOSITION_MARGIN_RATIO),this.recomputeZoomLimits(),!(this.cameraMode==="auto-fit"||e?.force))return this.clampCameraToBounds(),Promise.resolve();this.cameraMode="auto-fit";let i=(t.minX+t.maxX)*.5,r=(t.minY+t.maxY)*.5,o=this.expandBoundsForCompositionMargin(t,this.DEFAULT_COMPOSITION_MARGIN_RATIO),a=this.computeFitZWithMargin(o,jt.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN);if(e?.animate){let c=this.targetCamX,l=this.targetCamY,h=this.targetCamZ,u=e.duration??2.4,d=++this.camMoveTweenId;return Math.abs(a-h)<.01&&Math.abs(i-c)<.01&&Math.abs(r-l)<.01?Promise.resolve():new Promise(p=>{let g=this.makeTween(u,_=>{let m=this.easeOutCubic(_);this.targetCamX=this.lerp(c,i,m),this.targetCamY=this.lerp(l,r,m),this.targetCamZ=this.lerp(h,a,m),_>=1&&(this.targetCamX=i,this.targetCamY=r,this.targetCamZ=a,p());});this.addTween(this.supersedable(g,()=>d===this.camMoveTweenId,p));});}else return this.targetCamX=i,this.targetCamY=r,this.targetCamZ=a,Promise.resolve();}expandBoundsForCompositionMargin(t,e){let n=Math.max(1,t.maxX-t.minX),i=Math.max(1,t.maxY-t.minY),r=n*e,o=i*e;return{minX:t.minX-r,maxX:t.maxX+r,minY:t.minY-o,maxY:t.maxY+o};}recomputeZoomLimits(){if(!this.camera||!this.container||this.container.clientWidth===0||this.container.clientHeight===0)return;let t=jt.degToRad(this.camera.fov),e=this.container.clientWidth/this.container.clientHeight;this.computedMaxCamZ=this.computeFitZWithMargin(this.bounds,t,e,this.CAM_MARGIN);let n={minX:-this.PHOTO_W/2,maxX:this.PHOTO_W/2,minY:-this.PHOTO_H/2,maxY:this.PHOTO_H/2};this.computedMinCamZ=this.computeFitZWithMargin(n,t,e,0),this.computedMinCamZ>this.computedMaxCamZ&&(this.computedMinCamZ=this.computedMaxCamZ);let i=this.computedMaxCamZ*2;this.camera.far<i&&(this.camera.far=i,this.camera.updateProjectionMatrix());}setUserControlEnabled(t){this.userControlEnabled=t;}setCameraMode(t){this.cameraMode=t,t==="auto-fit"&&this.setSceneBounds(this.contentBounds,{force:!0});}resetCameraView(t=!0,e=.5){return this.setSceneBounds(this.contentBounds,{animate:t,force:!0,duration:e});}getCameraRoll(){return this.camRoll;}setCameraRoll(t){this.camRoll=t,this.wakeUpRenderLoop();}animateCameraRoll(t,e){let n=this.camRoll,i=++this.camRollTweenId;return e<=.01||Math.abs(t-n)<1e-4?(this.setCameraRoll(t),Promise.resolve()):new Promise(r=>{let o=this.makeTween(e,a=>{let c=this.easeInOutCubic(a);this.camRoll=this.lerp(n,t,c),a>=1&&(this.camRoll=t,r());});this.addTween(this.supersedable(o,()=>i===this.camRollTweenId,r));});}supersedable(t,e,n){return i=>e()?t(i):(n(),!0);}zoomAtPoint(t,e,n){if(!this.userControlEnabled)return;this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let i=this.container.getBoundingClientRect(),r=(e-i.left)/i.width*2-1,o=-((n-i.top)/i.height)*2+1,a=this.projectScreenToWorld(r,o,this.targetCamX,this.targetCamY,this.targetCamZ),c=jt.clamp(this.targetCamZ*t,this.computedMinCamZ,this.computedMaxCamZ);this.targetCamZ=c;let l=this.projectScreenToWorld(r,o,this.targetCamX,this.targetCamY,this.targetCamZ);this.targetCamX+=a.x-l.x,this.targetCamY+=a.y-l.y,this.clampCameraToBounds(),this.wakeUpRenderLoop();}wakeUpRenderLoop(){this.isSceneIdle=!1;}calculatePhotoRotation(t){let e=t.metadata;if(this.layoutRotationOverrideEnabled){let g=e._tsneRotateDeg;if(typeof g=="number")return jt.degToRad(g);}let n=e.plausibility,i=e._svgZoneFavorableFuture||e.favorable_future;if(n==null||!i)return this.getStableRandomRotation(t.id);let r=n/100,a=jt.degToRad(32),c=(1-r)*a,l=i.toLowerCase().trim(),h=l==="favor"||l==="favorable"||l==="prefer"||l==="preferred"||l==="mostly prefer"||l==="prefer-ish"||l==="yes",u=l==="prevent"||l==="prevented"||l==="unfavorable"||l==="mostly prevent"||l==="prevent-ish"||l==="no";return l==="uncertain"||l==="unsure"?0:!h&&!u?(console.warn("[ROTATION] Unknown favorable_future value:",i,"for photo:",t.id),this.getStableRandomRotation(t.id)):h?c:-c;}calculateEvaluationRotation(t){let e=t.metadata,n=e.plausibility,i=e._svgZoneFavorableFuture||e.favorable_future;if(n==null||!i)return this.getStableRandomRotation(t.id);let r=n/100,a=jt.degToRad(32),c=(1-r)*a,l=i.toLowerCase().trim(),h=l==="favor"||l==="favorable"||l==="prefer"||l==="preferred"||l==="mostly prefer"||l==="prefer-ish";return!h&&!(l==="prevent"||l==="prevented"||l==="unfavorable"||l==="mostly prevent"||l==="prevent-ish")?this.getStableRandomRotation(t.id):h?c:-c;}getStableRandomRotation(t){let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e=e&e;let n=Math.abs(e)%3-1;return jt.degToRad(n);}projectScreenToWorld(t,e,n,i,r){let o=jt.degToRad(this.camera.fov),a=2*Math.tan(o/2)*r,c=a*this.camera.aspect,l=n+t*c/2,h=i+e*a/2;return new N(l,h,0);}panCamera(t,e){if(!this.userControlEnabled)return;this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let n=this.container.getBoundingClientRect(),i=t/n.width*2*this.getVisibleWidth(),r=e/n.height*2*this.getVisibleHeight(),o=this.panSensitivityMultiplier;this.targetCamX-=i*o,this.targetCamY+=r*o,this.clampCameraToBounds();}getVisibleWidth(){let t=jt.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ*this.camera.aspect/2;}getVisibleWidthAtDepth(t){let e=jt.degToRad(this.camera.fov);return 2*Math.tan(e/2)*t*this.camera.aspect/2;}getVisibleHeight(){let t=jt.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ/2;}clampCameraToBounds(){if(!Number.isFinite(this.bounds.minX)||!Number.isFinite(this.bounds.maxX)||!Number.isFinite(this.bounds.minY)||!Number.isFinite(this.bounds.maxY))return;this.targetCamZ=jt.clamp(this.targetCamZ,this.computedMinCamZ,this.computedMaxCamZ);let t=this.getVisibleWidth(),e=this.getVisibleHeight(),n=this.CAM_MARGIN*.5,i=this.bounds.minX-this.CAM_MARGIN+t,r=this.bounds.maxX+this.CAM_MARGIN-t,o=this.bounds.minY-this.CAM_MARGIN+e,a=this.bounds.maxY+this.CAM_MARGIN-e,c=i>r?(this.bounds.minX+this.bounds.maxX)*.5:jt.clamp(this.targetCamX,i,r),l=o>a?(this.bounds.minY+this.bounds.maxY)*.5:jt.clamp(this.targetCamY,o,a),h=i-n,u=r+n,d=o-n,p=a+n,g=this.targetCamX<h||this.targetCamX>u,_=this.targetCamY<d||this.targetCamY>p,m=.25;g&&(this.targetCamX=this.lerp(this.targetCamX,c,m)),_&&(this.targetCamY=this.lerp(this.targetCamY,l,m));}screenToWorld(t,e,n){let i=new N(t,e,.5);i.unproject(this.camera);let r=i.sub(this.camera.position).normalize(),o=(n-this.camera.position.z)/r.z;return this.camera.position.clone().add(r.multiplyScalar(o));}getCameraSpawnZ(){return this.camera.position.z-this.zSpawn;}getTargetCameraZ(){return this.targetCamZ;}worldToScreen(t,e){if(!this.camera||!this.container||!this.isInitialized)return null;let n=new N(t,e,0);n.project(this.camera);let i=this.container.getBoundingClientRect();return{x:(n.x*.5+.5)*i.width,y:(-n.y*.5+.5)*i.height};}addFrameCallback(t){return this.frameCallbacks.add(t),()=>this.frameCallbacks.delete(t);}focusOnItemFromShowOnMap(t,e,n){return Q(this,null,function*(){this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=!1;let i=n&&n.mesh?this.computeFocusZForItem(n,.5,!0):jt.clamp(this.targetCamZ*.25,this.computedMinCamZ,this.computedMaxCamZ);yield this.animateCameraToZoomLevel(t,e,i,1.25);});}computeFocusZForItem(t,e,n){let i=this.PHOTO_H;if(n&&t.mesh){let a=new An().setFromObject(t.mesh);i=a.max.y-a.min.y;}let r=jt.degToRad(this.FOV_DEG),o=i/(2*Math.max(.01,e)*Math.tan(r/2));return jt.clamp(o,this.computedMinCamZ,this.computedMaxCamZ);}computeFocusFrame(t,e,n){let i=t.mesh;if(!i)return null;let r=i.geometry;r.boundingBox||r.computeBoundingBox();let o=r.boundingBox,a=(o.max.x-o.min.x)*n;i.updateMatrixWorld(!0);let c=[[o.min.x,o.min.y],[o.max.x,o.min.y],[o.max.x,o.max.y+a],[o.min.x,o.max.y+a]].map(([f,T])=>new N(f,T,0).applyMatrix4(i.matrixWorld)),l=1/0,h=-1/0,u=1/0,d=-1/0;for(let f of c)l=Math.min(l,f.x),h=Math.max(h,f.x),u=Math.min(u,f.y),d=Math.max(d,f.y);let p=Math.tan(jt.degToRad(this.FOV_DEG)/2),g=Math.max(.01,e),_=(d-u)/(2*g*p),m=(h-l)/(2*g*p*this.camera.aspect);return{x:(l+h)/2,y:(u+d)/2,z:jt.clamp(Math.max(_,m),this.computedMinCamZ,this.computedMaxCamZ)};}focusCameraOn(t,e,n,i){return this.cameraMode="user-controlled",this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=!1,this.animateCameraToZoomLevel(t,e,n,i);}animateCameraToZoomLevel(t,e,n,i){let r=++this.camMoveTweenId;return new Promise(o=>{let a=this.targetCamX,c=this.targetCamY,l=this.targetCamZ,h=jt.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);if(i<=.01){this.targetCamX=t,this.targetCamY=e,this.targetCamZ=h,o();return;}let u=this.makeTween(i,d=>{let p=this.easeInOutCubic(d);this.targetCamX=this.lerp(a,t,p),this.targetCamY=this.lerp(c,e,p),this.targetCamZ=this.lerp(l,h,p),d>=1&&(this.targetCamX=t,this.targetCamY=e,this.targetCamZ=h,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal,o());});this.addTween(this.supersedable(u,()=>r===this.camMoveTweenId,o));});}getCurrentBounds(){return zt({},this.bounds);}enableFisheyeEffect(t){this.fisheyeEnabled=t,this.fisheyeEnabledSignal=t,t||this.resetAllFisheyeEffects();}setThematicFisheyeEffectsEnabled(t){this.thematicFisheyeEffectsEnabled=t,t||this.resetFisheyeTaxonomyOpacityDimming();}setLayoutRotationOverrideEnabled(t){this.layoutRotationOverrideEnabled!==t&&(this.layoutRotationOverrideEnabled=t,this.meshToPhotoData.forEach((e,n)=>{n.rotation.z=this.calculatePhotoRotation(e),n.userData.originalRotation!==void 0&&(n.userData.originalRotation=n.rotation.z);}),this.wakeUpRenderLoop());}enablePerformanceMonitoring(t){this.performanceMonitoring=t,t&&(this.frameCount=0,this.renderCount=0,this.skippedFrames=0,this.lastFpsUpdate=performance.now());}getPerformanceMetrics(){return{fps:this.currentFps,visibleMeshes:this.visibleMeshCount,totalMeshes:this.totalMeshCount,isIdle:this.isSceneIdle,isMonitoring:this.performanceMonitoring};}isFisheyeEnabled(){return this.fisheyeEnabled;}isFisheyeAffectingAnyMesh(){return this.fisheyeEnabled&&this.hasUserInteracted&&this.fisheyeAffectedMeshes.size>0;}isDraggingItem(){return this.isDragging;}isHoveringItem(){return this.hoveredItemSignal;}setFisheyeConfig(t){this.fisheyeService.setConfig(mn(zt({},t),{cameraZ:t.cameraZ??this.targetCamZ,fov:t.fov??this.FOV_DEG}));}getFisheyeConfig(){return this.fisheyeService.getConfig();}addTween(t){this.activeTweens.push(t),this.isSceneIdle=!1;}runTween(t){return new Promise(e=>{this.activeTweens.push(n=>t(n)?(e(),!0):!1);});}makeTween(t,e){let n=0;return i=>{n+=i;let r=this.clamp01(n/t);return e(r),r>=1;};}expandBounds(t,e,n,i){let r=n*.5,o=i*.5;this.bounds.minX=Math.min(this.bounds.minX,t-r),this.bounds.maxX=Math.max(this.bounds.maxX,t+r),this.bounds.minY=Math.min(this.bounds.minY,e-o),this.bounds.maxY=Math.max(this.bounds.maxY,e+o);}easeOutCubic(t){return t=this.clamp01(t),1-Math.pow(1-t,2);}easeInOutCubic(t){return t=this.clamp01(t),t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}easeOutBack(t,e=1.70158){return t=this.clamp01(t),1+(e+1)*Math.pow(t-1,3)+e*Math.pow(t-1,2);}lerp(t,e,n){return jt.lerp(t,e,n);}damp(t,e,n,i){return jt.lerp(t,e,1-Math.exp(-n*i));}disableFisheyeForZoom(){this.fisheyeEnabled&&(this.fisheyeEnabled=!1,this.resetAllFisheyeEffects());}reEnableFisheyeAfterZoom(){this.fisheyeEnabledSignal&&(this.fisheyeEnabled=!0,this.fisheyeResumeOnPointer=!1);}applyFisheyeEffect(){let t=this.container?.clientHeight??window.innerHeight;if(this.fisheyeService.setConfig({cameraZ:this.targetCamZ,fov:this.FOV_DEG,viewportHeight:t}),!this.fisheyeEnabled){this.topFisheyeMesh=null,this.resetFisheyeTaxonomyOpacityDimming();return;}let e=this.screenToWorld(this.mouse.x,this.mouse.y,0);this.fisheyeFocusPoint.set(e.x,e.y,0);let n=new Set(this.fisheyeAffectedMeshes);this.fisheyeAffectedMeshes.clear();let i=this.fisheyeService.getConfig();if(i.maxHeight!==void 0&&t>0){let c=this.FOV_DEG*Math.PI/180,l=2*Math.tan(c/2)*this.targetCamZ,h=t/Math.max(1,l);if(this.PHOTO_H*h/t*100>=i.maxHeight){for(let p of n){let g=this.meshToPhotoData.get(p);if(g&&g.currentPosition)p.position.set(g.currentPosition.x,g.currentPosition.y,g.currentPosition.z);else if(this.meshOriginalStates.has(p)){let _=this.meshOriginalStates.get(p);p.position.copy(_.position);}p.scale.set(1,1,1),this.restoreBaseRenderOrder(p,g),p.userData.originalRotation!==void 0&&(p.rotation.z=p.userData.originalRotation,p.userData.originalRotation=void 0),p.userData.shadowMesh&&(this.scene.remove(p.userData.shadowMesh),p.userData.shadowMesh=null);}this.topFisheyeMesh=null,this.resetFisheyeTaxonomyOpacityDimming();return;}}let r=i.radius*i.radius,o=null,a=-1/0;this.root.children.forEach(c=>{let l=c;if(!l.isMesh)return;if(!this.isMeshInteractive(l)){if(n.has(l)){let f=this.meshToPhotoData.get(l);f&&f.currentPosition?l.position.set(f.currentPosition.x,f.currentPosition.y,f.currentPosition.z):this.meshOriginalStates.has(l)&&l.position.copy(this.meshOriginalStates.get(l).position),l.scale.set(1,1,1),this.restoreBaseRenderOrder(l,f),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null);}return;}let h=this.meshToPhotoData.get(l);if(h&&h.animationState==="hidden"){n.has(l)&&(l.position.set(h.currentPosition.x,h.currentPosition.y,h.currentPosition.z),l.scale.set(1,1,1),this.restoreBaseRenderOrder(l,h),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null));return;}let u=l.position.clone(),d=this.PHOTO_H;h?(u=new N(h.currentPosition.x,h.currentPosition.y,h.currentPosition.z),h.height&&(d=h.height)):(this.meshOriginalStates.has(l)||this.meshOriginalStates.set(l,{position:l.position.clone(),scale:l.scale.clone(),renderOrder:l.renderOrder}),u=this.meshOriginalStates.get(l).position.clone());let p=u.x-this.fisheyeFocusPoint.x,g=u.y-this.fisheyeFocusPoint.y;if(p*p+g*g>r){n.has(l)&&(l.scale.set(1,1,1),l.position.copy(u),this.restoreBaseRenderOrder(l,h),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),this.draggedMesh===l&&l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null));return;}let m=this.fisheyeService.calculateEffect(u,this.fisheyeFocusPoint,d,t);if(m){if(this.fisheyeAffectedMeshes.add(l),l.userData.originalRotation||(l.userData.originalRotation=l.rotation.z),h){let x=this.calculateEvaluationRotation(h);l.rotation.z=x;}let f=m.scale;if(this.isDragging&&this.draggedMesh===l){if(f=1,l.userData.shadowMesh){let x=l.userData.shadowMesh;x.position.set(u.x+m.positionOffset.x+20,u.y+m.positionOffset.y-30,u.z-1),x.scale.set(f,f,1),x.renderOrder=this.FISHEYE_RENDER_ORDER_BASE+m.renderOrder-1;}else{let x=new Pn(1,1),C=new dn({color:0,transparent:!0,opacity:.3,depthWrite:!1}),A=new Ue(x,C);A.scale.set(l.scale.x,l.scale.y,1),A.position.set(l.position.x+20,l.position.y-30,l.position.z-1),A.renderOrder=this.FISHEYE_RENDER_ORDER_BASE+m.renderOrder-1,this.scene.add(A),l.userData.shadowMesh=A;}}else l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null);let T=l.scale.x,S=this.damp(T,f,this.FISHEYE_SCALE_DAMPING,this.fisheyeLastDeltaTime);l.scale.set(S,S,1),l.position.set(u.x+m.positionOffset.x,u.y+m.positionOffset.y,u.z),m.renderOrder>a&&(a=m.renderOrder,o=l),l.renderOrder=this.FISHEYE_RENDER_ORDER_BASE+m.renderOrder;}else n.has(l)&&(l.scale.set(1,1,1),l.position.copy(u),this.restoreBaseRenderOrder(l,h),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null));}),this.topFisheyeMesh=o,this.applyFisheyeTaxonomyOpacityDimming(o);}getMeshOpacity(t){let e=t.material;if(Array.isArray(e)){for(let n of e)if(n.opacity!==void 0)return n.opacity;return 1;}return e.opacity!==void 0?e.opacity:1;}setMeshOpacity(t,e){let n=jt.clamp(e,0,1),i=t.material;if(Array.isArray(i)){for(let r of i)r.opacity!==void 0&&(r.opacity=n,r.transparent=n<1,r.needsUpdate=!0);return;}i.opacity!==void 0&&(i.opacity=n,i.transparent=n<1,i.needsUpdate=!0);}getMeshTaxonomy(t){let n=this.meshToPhotoData.get(t)?.metadata?.topics??[],i=Array.isArray(n)?n.filter(a=>typeof a=="string"&&a.trim().length>0):[],r=new Set(i),o=new Set();for(let a of i){let c=a.split("/")[0];c&&o.add(c);}return{topics:r,themes:o,orderedTopics:i};}setsIntersect(t,e){if(t.size===0||e.size===0)return!1;for(let n of t)if(e.has(n))return!0;return!1;}getTaxonomyAnchorMesh(t){if(!t)return null;let e=this.getMeshTaxonomy(t);if(e.topics.size>0||e.themes.size>0)return t;let n=null,i=-1/0;for(let r of this.fisheyeAffectedMeshes){let o=this.getMeshTaxonomy(r);o.topics.size===0&&o.themes.size===0||r.renderOrder>i&&(i=r.renderOrder,n=r);}return n;}getActiveFisheyeTaxonomyFocus(){if(!this.thematicFisheyeEffectsEnabled||!this.fisheyeEnabled||!this.topFisheyeMesh)return null;let t=this.getTaxonomyAnchorMesh(this.topFisheyeMesh);if(!t)return null;let n=this.getMeshTaxonomy(t).orderedTopics[0]??null,i=n&&n.split("/")[0]||null;return!n&&!i?null:{topMesh:this.topFisheyeMesh,topicId:n,themeId:i};}getTaxonomyHoverDimFactor(t,e){let n=this.getMeshTaxonomy(t),i=!!e.topicId&&n.topics.has(e.topicId),r=!!e.themeId&&n.themes.has(e.themeId);return e.topicId?i?1:r?.4:.1:e.themeId?r?1:.1:1;}getFisheyeTaxonomyDimFactor(t,e){if(t===e.topMesh)return 1;let n=this.getMeshTaxonomy(t),i=!!e.topicId&&n.topics.has(e.topicId),r=!!e.themeId&&n.themes.has(e.themeId);return i?1:r?.4:.1;}refreshTaxonomyOpacityEffects(){let t=this.taxonomyHoverFocus,e=this.getActiveFisheyeTaxonomyFocus();if(!(!!t||!!e)){for(let[i,r]of this.taxonomyEffectBaseOpacity.entries())this.setMeshOpacity(i,r);this.taxonomyEffectBaseOpacity.clear();return;}if(this.taxonomyEffectBaseOpacity.size===0)for(let i of this.root.children){let r=i;r.isMesh&&this.taxonomyEffectBaseOpacity.set(r,this.getMeshOpacity(r));}for(let i of this.root.children){let r=i;if(!r.isMesh)continue;let o=this.taxonomyEffectBaseOpacity.get(r)??this.getMeshOpacity(r);this.taxonomyEffectBaseOpacity.set(r,o);let a=1;t&&(a=Math.min(a,this.getTaxonomyHoverDimFactor(r,t))),e&&(a=Math.min(a,this.getFisheyeTaxonomyDimFactor(r,e))),this.setMeshOpacity(r,o*a);}}applyFisheyeTaxonomyOpacityDimming(t){this.topFisheyeMesh=t,this.refreshTaxonomyOpacityEffects();}resetFisheyeTaxonomyOpacityDimming(){this.refreshTaxonomyOpacityEffects();}getTopFisheyeTaxonomyIds(){if(!this.thematicFisheyeEffectsEnabled||!this.fisheyeEnabled||!this.topFisheyeMesh)return null;let t=this.getTaxonomyAnchorMesh(this.topFisheyeMesh);if(!t)return null;let n=this.getMeshTaxonomy(t).orderedTopics[0]??null;return n?{themeId:n.split("/")[0]||null,topicId:n}:null;}setTaxonomyHoverOpacityFocus(t){if(!t||!t.topicId&&!t.themeId){this.resetTaxonomyHoverOpacityFocus();return;}let e=t.topicId??null,n=t.themeId??(e&&e.split("/")[0]||null);this.taxonomyHoverFocus={topicId:e,themeId:n},this.refreshTaxonomyOpacityEffects();}resetTaxonomyHoverOpacityFocus(){this.taxonomyHoverFocus=null,this.refreshTaxonomyOpacityEffects();}isMeshInteractive(t){return this.getMeshOpacity(t)>=this.INTERACTIVE_OPACITY_THRESHOLD;}getFirstInteractiveIntersection(t){return t.find(n=>this.isMeshInteractive(n.object))??null;}resetAllFisheyeEffects(){this.fisheyeAffectedMeshes.forEach(t=>{let e=this.meshToPhotoData.get(t);if(e&&e.currentPosition)t.position.set(e.currentPosition.x,e.currentPosition.y,e.currentPosition.z);else if(this.meshOriginalStates.has(t)){let n=this.meshOriginalStates.get(t);t.position.copy(n.position);}t.scale.set(1,1,1),this.restoreBaseRenderOrder(t,e),t.userData.originalRotation!==void 0&&(t.rotation.z=t.userData.originalRotation,t.userData.originalRotation=void 0);}),this.fisheyeAffectedMeshes.clear(),this.topFisheyeMesh=null,this.resetFisheyeTaxonomyOpacityDimming(),this.clearOverlayRenderer();}resetInteractionVisualState(){this.setSvgHoverOverlayHotspot(null),this.resetTaxonomyHoverOpacityFocus(),(this.fisheyeAffectedMeshes.size>0||this.topFisheyeMesh)&&this.resetAllFisheyeEffects();}restoreBaseRenderOrder(t,e){if(e){let n=e.metadata.renderOrder;t.renderOrder=n!==void 0?n:0;return;}if(this.meshOriginalStates.has(t)){t.renderOrder=this.meshOriginalStates.get(t).renderOrder;return;}t.renderOrder=0;}renderScene(){let t=this.getDemoFocusMesh();if(t){this.renderDemoFocus(t);return;}let e=this.topFisheyeMesh;if(!!!(this.fisheyeEnabled&&e&&e.visible&&this.fisheyeAffectedMeshes.has(e))){this.renderer.render(this.scene,this.camera),this.clearOverlayRenderer();return;}if(this.ensureOverlayRenderer(),!this.overlayRenderer||!e){this.renderer.render(this.scene,this.camera);return;}let i=e.visible;e.visible=!1,this.renderer.render(this.scene,this.camera),e.visible=i;let r=this.root.children,o=r.map(a=>a.visible);for(let a=0;a<r.length;a++)r[a].visible=r[a]===e;this.overlayRenderer.clear(),this.overlayRenderer.render(this.scene,this.camera);for(let a=0;a<r.length;a++)r[a].visible=o[a];}renderDemoFocus(t){if(this.ensureOverlayRenderer(),!this.overlayRenderer){this.renderer.render(this.scene,this.camera);return;}let e=this.svgBackgroundPlane,n=e?.visible??!1;t.visible=!1,e&&(e.visible=!1),this.renderer.render(this.scene,this.camera),t.visible=!0,e&&(e.visible=n);let i=this.root.children,r=i.map(o=>o.visible);for(let o=0;o<i.length;o++)i[o].visible=i[o]===t;this.overlayRenderer.clear(),this.overlayRenderer.render(this.scene,this.camera);for(let o=0;o<i.length;o++)i[o].visible=r[o];}ensureOverlayRenderer(){if(this.overlayRenderer||!this.container)return;this.overlayRenderer=new lr({antialias:!1,alpha:!0}),this.overlayRenderer.outputColorSpace=Ie,this.overlayRenderer.setPixelRatio(this.renderer.getPixelRatio()),this.overlayRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.overlayRenderer.setClearColor(0,0);let t=this.overlayRenderer.domElement;t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.pointerEvents="none",t.style.touchAction="none",t.style.zIndex="60",(this.container.parentElement??this.container).appendChild(t);}clearOverlayRenderer(){this.overlayRenderer&&this.overlayRenderer.clear();}disposeOverlayRenderer(){if(!this.overlayRenderer)return;let t=this.overlayRenderer.domElement;t.parentElement?.removeChild(t),this.overlayRenderer.dispose(),this.overlayRenderer=null;}setSvgBackground(t,e){this.svgBackgroundPlane&&(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof tn&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0),this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&this.svgContainer.remove(),this.svgBackgroundOptions={enabled:!0,svgElement:t,scale:e?.scale??1,offsetX:e?.offsetX??0,offsetY:e?.offsetY??0,radius:e?.radius,desiredOpacity:e?.desiredOpacity??1},this.createSvgDomContainer(t),this.setupSvgBackground(this.svgBackgroundOptions);}cleanupDragState(){this.isDragging&&this.draggedMesh&&(this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.setSvgHoverOverlayHotspot(null),this.setCanvasCursor("default"));}setCanvasCursor(t){this.container&&(this.container.style.cursor=t),this.renderer?.domElement&&(this.renderer.domElement.style.cursor=t);}enableDragForMesh(t,e){this.dragCallbacks.set(t,e),this.hoverOnlyMeshes.delete(t);}restoreDragForMesh(t){return this.dragCallbacks.has(t)?(this.hoverOnlyMeshes.delete(t),!0):!1;}enableHoverForMesh(t){this.hoverOnlyMeshes.add(t);}disableDragForMesh(t){this.hoverOnlyMeshes.add(t);}setMeshPhotoId(t,e){this.meshToPhotoId.set(t,e),this.photoIdToMesh.set(e,t);}setPermalinkTarget(t){this.permalinkTargetId=t;}setHighResPriorityId(t){this.highResPriorityId=t;}setDemoFocusPhotoId(t){if(t===this.demoFocusPhotoId)return;let e=this.demoFocusPhotoId?this.photoIdToMesh.get(this.demoFocusPhotoId):void 0;e&&this.restoreBaseRenderOrder(e,this.meshToPhotoData.get(e)),this.demoFocusPhotoId=t;let n=t?this.photoIdToMesh.get(t):void 0;n&&(n.renderOrder=s.DEMO_FOCUS_RENDER_ORDER),this.applyDemoDimming(!!t),this.isSceneIdle=!1;}applyDemoDimming(t){let e=this.renderer?.domElement;if(!e)return;let n=se.DEMO_DIM_TRANSITION_DURATION;e.style.transition=`filter ${n}s ease, opacity ${n}s ease`,e.style.filter=t?`blur(${s.DEMO_DIM_BLUR_PX}px)`:"",e.style.opacity=t?String(s.DEMO_DIM_OPACITY):"";}getDemoFocusMesh(){if(!this.demoFocusPhotoId)return null;let t=this.photoIdToMesh.get(this.demoFocusPhotoId);return t&&t.visible?t:null;}getPhotoScreenFrame(t){let e=this.photoIdToMesh.get(t);if(!e||!this.camera||!this.container||!this.isInitialized)return null;let n=e.geometry;n.boundingBox||n.computeBoundingBox();let i=n.boundingBox,r=this.container.getBoundingClientRect(),o=(h,u)=>{let d=new N(h,u,0).applyMatrix4(e.matrixWorld).project(this.camera);return{x:(d.x*.5+.5)*r.width,y:(-d.y*.5+.5)*r.height};},a=o(i.min.x,i.max.y),c=o(i.max.x,i.max.y),l=o(i.min.x,i.min.y);return{x:a.x,y:a.y,width:Math.hypot(c.x-a.x,c.y-a.y),height:Math.hypot(l.x-a.x,l.y-a.y),rotation:Math.atan2(c.y-a.y,c.x-a.x)};}setLayoutStrategy(t){this.currentLayoutStrategy=t;}setDragCompleteCallback(t){this.onDragCompleteCallback=t;}setPhotoClickCallback(t){this.onPhotoClickCallback=t;}setBackgroundClickCallback(t){this.onBackgroundClickCallback=t;}setLayoutStrategyReference(t){this.layoutStrategyRef=t;}setMeshPhotoData(t,e){this.meshToPhotoData.set(t,e);}findPhotoIdForMesh(t){return this.meshToPhotoId.get(t)||null;}isInteractiveLayout(){return this.svgBackgroundOptions?.enabled||!1;}createSvgDomContainer(t){if(!this.container)return;this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.top="0",this.svgContainer.style.left="0",this.svgContainer.style.width="100%",this.svgContainer.style.height="100%",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.zIndex="1",this.svgContainer.style.opacity="0";let e=t.cloneNode(!0);e.style.width="100%",e.style.height="100%",e.style.position="absolute",this.svgContainer.appendChild(e),this.container.appendChild(this.svgContainer),this.createSvgHoverOverlay();}getSvgDimensions(t){let e=parseInt(t.getAttribute("width")||"",10),n=parseInt(t.getAttribute("height")||"",10);return{width:Number.isFinite(e)&&e>0?e:this.container?.clientWidth??0,height:Number.isFinite(n)&&n>0?n:this.container?.clientHeight??0};}createSvgHoverOverlay(){return Q(this,null,function*(){if(!(!this.container||!this.scene)){this.disposeSvgHoverOverlay();try{let t=yield fetch("/showcase-bg-hover.svg");if(!t.ok)return;let e=yield t.text(),r=new DOMParser().parseFromString(e,"image/svg+xml").documentElement;r.querySelectorAll('[id^="s-"]').forEach(f=>{let T=f;T.style.visibility="hidden",this.svgHoverOverlayGroups.set(T.id,T);}),this.svgHoverOverlayElement=r;let{width:a,height:c}=this.getSvgDimensions(r),l=s.SVG_HOVER_OVERLAY_RESOLUTION,h=document.createElement("canvas");h.width=l,h.height=l;let u=h.getContext("2d");if(!u)return;this.svgHoverOverlayCanvas=h,this.svgHoverOverlayContext=u,this.svgHoverOverlayTexture=new di(h),this.svgHoverOverlayTexture.colorSpace=Ie,this.svgHoverOverlayTexture.needsUpdate=!0;let d=this.svgBackgroundOptions?.radius||2e4,p=new Pn(d*2,d*2),g=new dn({map:this.svgHoverOverlayTexture,transparent:!0,opacity:0,depthWrite:!1});this.svgHoverOverlayPlane=new Ue(p,g),this.svgHoverOverlayPlane.position.set(0,0,-.95),this.svgHoverOverlayPlane.renderOrder=-999,this.svgBackgroundOptions?.offsetX&&(this.svgHoverOverlayPlane.position.x+=this.svgBackgroundOptions.offsetX),this.svgBackgroundOptions?.offsetY&&(this.svgHoverOverlayPlane.position.y+=this.svgBackgroundOptions.offsetY),this.svgBackgroundOptions?.scale&&this.svgHoverOverlayPlane.scale.setScalar(this.svgBackgroundOptions.scale),this.scene.add(this.svgHoverOverlayPlane);let _=l/a,m=l/c;u.setTransform(1,0,0,1,0,0),u.clearRect(0,0,h.width,h.height),u.setTransform(_,0,0,m,0,0),this.svgHoverOverlayCachedImages.set(null,u.getImageData(0,0,h.width,h.height)),this.svgHoverOverlayTexture.needsUpdate=!0;}catch{}}});}disposeSvgHoverOverlay(){this.svgHoverOverlayPlane&&(this.scene.remove(this.svgHoverOverlayPlane),this.svgHoverOverlayPlane.geometry.dispose(),this.svgHoverOverlayPlane.material instanceof tn&&this.svgHoverOverlayPlane.material.dispose(),this.svgHoverOverlayPlane=void 0),this.svgHoverOverlayTexture&&(this.svgHoverOverlayTexture.dispose(),this.svgHoverOverlayTexture=void 0),this.svgHoverOverlayCanvas=null,this.svgHoverOverlayContext=null,this.svgHoverOverlayElement=null,this.svgHoverOverlayGroups.clear(),this.activeHoverGroupId=null,this.hoverOverlayRenderToken++,this.svgHoverOverlayCachedImages.clear(),this.svgHoverOverlayPendingImage&&(this.svgHoverOverlayPendingImage.onload=null,this.svgHoverOverlayPendingImage.onerror=null,this.svgHoverOverlayPendingImage=null);}renderSvgHoverOverlayTexture(t){return Q(this,null,function*(){if(!this.svgHoverOverlayElement||!this.svgHoverOverlayCanvas||!this.svgHoverOverlayContext||!this.svgHoverOverlayTexture)return;let e=this.svgHoverOverlayCachedImages.get(t);if(e){this.svgHoverOverlayContext.putImageData(e,0,0),this.svgHoverOverlayTexture.needsUpdate=!0;return;}if(!this.container)return;this.svgHoverOverlayPendingImage&&(this.svgHoverOverlayPendingImage.onload=null,this.svgHoverOverlayPendingImage.onerror=null,this.svgHoverOverlayPendingImage=null);let n=++this.hoverOverlayRenderToken,i=new XMLSerializer().serializeToString(this.svgHoverOverlayElement),r=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),o=URL.createObjectURL(r),a=new Image();this.svgHoverOverlayPendingImage=a;try{if(yield new Promise((d,p)=>{a.onload=()=>d(),a.onerror=g=>p(g),a.src=o;}),n!==this.hoverOverlayRenderToken||!this.container||!this.svgHoverOverlayCanvas||!this.svgHoverOverlayContext||!this.svgHoverOverlayTexture)return;let{width:c,height:l}=this.getSvgDimensions(this.svgHoverOverlayElement),h=this.svgHoverOverlayCanvas.width/c,u=this.svgHoverOverlayCanvas.height/l;this.svgHoverOverlayContext.setTransform(1,0,0,1,0,0),this.svgHoverOverlayContext.clearRect(0,0,this.svgHoverOverlayCanvas.width,this.svgHoverOverlayCanvas.height),this.svgHoverOverlayContext.setTransform(h,0,0,u,0,0),this.svgHoverOverlayContext.drawImage(a,0,0,c,l),this.svgHoverOverlayContext.setTransform(1,0,0,1,0,0),this.svgHoverOverlayCachedImages.set(t,this.svgHoverOverlayContext.getImageData(0,0,this.svgHoverOverlayCanvas.width,this.svgHoverOverlayCanvas.height)),this.svgHoverOverlayTexture.needsUpdate=!0;}catch{}finally{URL.revokeObjectURL(o),this.svgHoverOverlayPendingImage===a&&(this.svgHoverOverlayPendingImage=null);}});}setSvgHoverOverlayHotspot(t){if(!this.svgHoverOverlayElement||!this.svgHoverOverlayPlane)return;let e=this.svgHoverOverlayPlane.material;if(t===this.activeHoverGroupId)return;if(!t){if(this.activeHoverGroupId){let i=this.svgHoverOverlayGroups.get(this.activeHoverGroupId);i&&(i.style.visibility="hidden");}this.activeHoverGroupId=null,e.opacity=0,e.needsUpdate=!0,this.renderSvgHoverOverlayTexture(null);return;}let n=this.svgHoverOverlayGroups.get(t);if(!n){this.setSvgHoverOverlayHotspot(null);return;}if(this.activeHoverGroupId&&this.activeHoverGroupId!==t){let i=this.svgHoverOverlayGroups.get(this.activeHoverGroupId);i&&(i.style.visibility="hidden");}n.style.visibility="visible",this.activeHoverGroupId=t,e.opacity=1,e.needsUpdate=!0,this.renderSvgHoverOverlayTexture(t);}animateMaterialOpacity(t,e,n=600){let i=t.opacity??1,r=performance.now(),o=a=>{let c=Math.min(1,(a-r)/n),l=c*(2-c);t.opacity=i+(e-i)*l,t.needsUpdate=!0,c<1&&requestAnimationFrame(o);};requestAnimationFrame(o);}calculatePreviewRotation(t,e){let n=e.plausibility,i=e.favorable_future;if(n===void 0||!i)return this.draggedMesh?.userData.previewOriginalRotation||0;let o=(1-n/100)*32,a=i.toLowerCase().trim(),l=a==="favor"||a==="favorable"||a==="prefer"||a==="preferred"?o:-o;return jt.degToRad(l);}parseHotspotGroupId(t){if(!t||!t.startsWith("s-"))return null;try{let n=t.substring(2).split(","),i={};for(let r of n){let[o,a]=r.split("=");if(o&&a){let c=a.trim(),l=parseInt(c,10),h=!isNaN(l)&&l.toString()===c?l:c;i[o.trim()]=h;}}return Object.keys(i).length>0?i:null;}catch(e){return console.warn("Failed to parse hotspot group ID:",t,e),null;}}findHotspotMatchAtMeshPosition(t,e){let n=new N();return t.getWorldPosition(n),this.findHotspotMatchAtWorldPosition(n.x,n.y);}findHotspotMatchAtWorldPosition(t,e){if(!this.svgContainer)return null;let n=this.svgContainer.querySelector("svg");if(!n)return null;let i=this.svgBackgroundOptions?.offsetX||0,r=this.svgBackgroundOptions?.offsetY||0,o=this.svgBackgroundOptions?.radius||15e3,a=(t-i+o)/(2*o),c=(o-(e-r))/(2*o),l=n.viewBox.baseVal;if(!l||l.width===0||l.height===0)return null;let h=l.x+a*l.width,u=l.y+c*l.height;return!isFinite(h)||!isFinite(u)?null:this.findHotspotMatchAtSvgCoordinates(n,h,u);}findHotspotMatchAtSvgCoordinates(t,e,n){let i=t.querySelectorAll('[id^="hit"]');for(let r of i){let o=r,a=t.createSVGPoint();a.x=e,a.y=n;let c=!1;if("isPointInFill"in r&&typeof r.isPointInFill=="function")try{c=r.isPointInFill(a);}catch{let h=o.getBBox();c=e>=h.x&&e<=h.x+h.width&&n>=h.y&&n<=h.y+h.height;}else{let l=o.getBBox();c=e>=l.x&&e<=l.x+l.width&&n>=l.y&&n<=l.y+l.height;}if(c){let l=r.parentElement?.closest('g[id^="s-"]')||r.parentElement?.closest("g");if(l&&l.id){let h=this.parseHotspotGroupId(l.id);return h?{groupId:l.id,hotspotData:h}:{groupId:l.id,hotspotData:{hotspot:l.id}};}}}return null;}findHotspotAtMeshPosition(t,e){let n=this.findHotspotMatchAtMeshPosition(t,e);return n?n.hotspotData:null;}isPositionOutOfCanvas(t){if(!this.svgBackgroundOptions?.radius)return!1;let e=this.svgBackgroundOptions.offsetX??0,n=this.svgBackgroundOptions.offsetY??0,i=this.svgBackgroundOptions.radius,r=t.x-e,o=t.y-n;return Math.sqrt(r*r+o*o)>i;}disableAllDragging(){this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null;}setupDragAndDrop(){if(!this.container){console.warn("Container not available for drag setup");return;}let t=this.renderer.domElement;t.addEventListener("mousedown",e=>{this.updateMousePosition(e),this.onMouseDown(e);}),t.addEventListener("mousemove",e=>{this.updateMousePosition(e),this.fisheyePointerActive=!0,this.onMouseMove(e);}),t.addEventListener("mouseup",e=>{this.updateMousePosition(e),this.onMouseUp();}),t.addEventListener("mouseleave",()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.resetInteractionVisualState();}),t.addEventListener("touchcancel",()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.isTwoFingerGesture=!1,this.lastTouchDistance=0,this.resetInteractionVisualState();}),t.addEventListener("wheel",e=>{this.onMouseWheel(e);},{passive:!1}),t.addEventListener("dblclick",e=>{this.onDoubleClick(e);}),t.addEventListener("touchstart",e=>{if(e.preventDefault(),this.fisheyePointerActive=!0,e.touches.length===1){this.isTwoFingerGesture=!1,this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousedown",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseDown(n);}else if(e.touches.length===2){this.isTwoFingerGesture=!0,this.isDragging&&this.cleanupDragState();let n=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(n*n+i*i),this.touchStartDistance=this.lastTouchDistance,this.touchPanStart.x=(e.touches[0].clientX+e.touches[1].clientX)/2,this.touchPanStart.y=(e.touches[0].clientY+e.touches[1].clientY)/2,this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();}},{passive:!1}),t.addEventListener("touchmove",e=>{if(e.preventDefault(),this.fisheyePointerActive=!0,e.touches.length===1&&!this.isTwoFingerGesture){this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousemove",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseMove(n);}else if(e.touches.length===2){this.isTwoFingerGesture=!0;let n=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY,r=Math.sqrt(n*n+i*i);if(this.lastTouchDistance>0){let h=this.lastTouchDistance/r,u=(e.touches[0].clientX+e.touches[1].clientX)/2,d=(e.touches[0].clientY+e.touches[1].clientY)/2;this.zoomAtPoint(h,u,d);}let o=(e.touches[0].clientX+e.touches[1].clientX)/2,a=(e.touches[0].clientY+e.touches[1].clientY)/2,c=o-this.touchPanStart.x,l=a-this.touchPanStart.y;this.panCamera(c,l),this.lastTouchDistance=r,this.touchPanStart.x=o,this.touchPanStart.y=a;}},{passive:!1}),t.addEventListener("touchend",e=>{this.fisheyePointerActive=e.touches.length>0,e.touches.length===0?(this.isTwoFingerGesture&&this.reEnableFisheyeAfterZoom(),this.isTwoFingerGesture=!1,this.lastTouchDistance=0,this.resetAllFisheyeEffects(),this.onMouseUp()):e.touches.length===1&&(this.isTwoFingerGesture=!1,this.lastTouchDistance=0);}),gn(window,"keydown").pipe(ki(this.destroy$)).subscribe(e=>this.onKeyDown(e)),gn(window,"mouseup").pipe(ki(this.destroy$)).subscribe(()=>{this.isDragging&&this.cleanupDragState();}),gn(window,"touchend").pipe(ki(this.destroy$)).subscribe(()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.resetAllFisheyeEffects();}),gn(window,"blur").pipe(ki(this.destroy$)).subscribe(()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.resetInteractionVisualState();});}updateMousePosition(t){if(!this.container)return;this.hasUserInteracted=!0,this.fisheyePointerActive=!0;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY;}updateMousePositionFromTouch(t){if(!this.container)return;this.hasUserInteracted=!0,this.fisheyePointerActive=!0;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY;}onMouseDown(t){this.mouseDownPosition.set(t.clientX,t.clientY),this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1),n=this.getFirstInteractiveIntersection(e);if(n){let i=n.object;if(this.dragCallbacks.has(i)&&!this.hoverOnlyMeshes.has(i)){this.isDragging=!0,this.draggedMesh=i,this.wasFisheyeEnabled=this.fisheyeEnabled,this.fisheyeEnabled&&(this.fisheyeEnabled=!1,this.resetAllFisheyeEffects());let o=new N();this.camera.getWorldDirection(o),this.dragPlane.setFromNormalAndCoplanarPoint(o,i.position);let a=new N();if(this.raycaster.ray.intersectPlane(this.dragPlane,a),this.dragOffset.copy(a).sub(i.position),this.setCanvasCursor("grabbing"),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragStart){let c=this.meshToPhotoData.get(i);if(c){let l={x:i.position.x,y:i.position.y,z:i.position.z};this.currentLayoutStrategy.onPhotoDragStart(c,l);}}return;}}this.userControlEnabled&&(this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.isPanning=!0,this.panStartMouse.set(t.clientX,t.clientY),this.panStartCameraPos.set(this.targetCamX,this.targetCamY,this.targetCamZ),this.setCanvasCursor("grabbing"));}onMouseMove(t){if(!this.fisheyeAnimationLock&&this.fisheyeResumeOnPointer&&(this.fisheyeResumeOnPointer=!1,this.fisheyeEnabledSignal&&(this.fisheyeEnabled=!0)),this.isDragging&&this.draggedMesh){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new N();if(this.raycaster.ray.intersectPlane(this.dragPlane,e)){let n=e.sub(this.dragOffset);this.draggedMesh.position.copy(n);let i=this.findPhotoIdForMesh(this.draggedMesh);if(i){let o=this.findHotspotMatchAtMeshPosition(this.draggedMesh,i);if(o&&this.draggedMesh){let a=this.meshToPhotoData.get(this.draggedMesh);a&&(this.draggedMesh.userData.previewOriginalRotation===void 0&&(this.draggedMesh.userData.previewOriginalRotation=this.draggedMesh.rotation.z),this.draggedMesh.rotation.z=this.calculatePreviewRotation(a,o.hotspotData)),this.setSvgHoverOverlayHotspot(o.groupId);}else this.draggedMesh?.userData.previewOriginalRotation!==void 0&&(this.draggedMesh.rotation.z=this.draggedMesh.userData.previewOriginalRotation,this.setSvgHoverOverlayHotspot(null));}let r=this.dragCallbacks.get(this.draggedMesh);if(r&&r({x:n.x,y:n.y,z:n.z}),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragMove){let o=this.meshToPhotoData.get(this.draggedMesh);if(o){let a={x:n.x,y:n.y,z:n.z};this.currentLayoutStrategy.onPhotoDragMove(o,a);}}}}else if(this.isPanning){let e=t.clientX-this.panStartMouse.x,n=t.clientY-this.panStartMouse.y;this.panCamera(e,n),this.panStartMouse.set(t.clientX,t.clientY);}else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1),n=this.getFirstInteractiveIntersection(e),i=!1;if(n){let r=n.object,o=this.dragCallbacks.has(r)&&!this.hoverOnlyMeshes.has(r),a=this.hoverOnlyMeshes.has(r);(o||a)&&(this.setCanvasCursor(o?"grab":"pointer"),i=!0,this.hoveredMesh!==r&&(this.hoveredMesh=r,this.hoveredItemSignal.set(!0)));}else this.hoveredMesh&&(this.hoveredMesh=null,this.hoveredItemSignal.set(!1));if(this.isInteractiveLayout()){let r=this.screenToWorld(this.mouse.x,this.mouse.y,0),o=this.findHotspotMatchAtWorldPosition(r.x,r.y);this.setSvgHoverOverlayHotspot(o?.groupId??null),!i&&o?this.setCanvasCursor("pointer"):i||this.setCanvasCursor("default");}else this.setSvgHoverOverlayHotspot(null);this.applyFisheyeEffect();}}onMouseUp(){let e=(this.lastClientX!==null&&this.lastClientY!==null?Math.sqrt((this.lastClientX-this.mouseDownPosition.x)*(this.lastClientX-this.mouseDownPosition.x)+(this.lastClientY-this.mouseDownPosition.y)*(this.lastClientY-this.mouseDownPosition.y)):this.FALLBACK_MOUSE_MOVEMENT)<this.clickThreshold;if(this.isDragging&&this.draggedMesh){let n=this.draggedMesh;if(n.userData.previewOriginalRotation!==void 0&&delete n.userData.previewOriginalRotation,this.isDragging=!1,e){let i=this.findPhotoIdForMesh(n);if(i&&this.onPhotoClickCallback){this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0),this.onPhotoClickCallback(i);return;}}if(this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragEnd){let i=this.meshToPhotoData.get(n);if(i){let r={x:n.position.x,y:n.position.y,z:n.position.z};this.currentLayoutStrategy.onPhotoDragEnd(i,r);}}if(this.isInteractiveLayout()&&this.onDragCompleteCallback){let i=this.findPhotoIdForMesh(n);if(i){let r={x:n.position.x,y:n.position.y,z:n.position.z},o=this.isPositionOutOfCanvas(n.position);o&&(n.rotation.z=0);let a=o?null:this.findHotspotAtMeshPosition(n,i);this.onDragCompleteCallback(i,{position:r,isOutOfBounds:o,hotspotData:a}).catch(c=>{console.error("[DRAG] Error in drag complete callback:",c);});}}this.draggedMesh=null,this.hoveredMesh=null,this.hoveredItemSignal.set(!1),this.setSvgHoverOverlayHotspot(null),this.setCanvasCursor("default"),this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0);}else if(this.isPanning&&(this.isPanning=!1,this.setCanvasCursor("default")),e){this.raycaster.setFromCamera(this.mouse,this.camera);let n=this.raycaster.intersectObjects(this.root.children,!1),i=this.getFirstInteractiveIntersection(n);if(i){let r=i.object,o=this.findPhotoIdForMesh(r);o&&this.onPhotoClickCallback?this.onPhotoClickCallback(o):!o&&this.onBackgroundClickCallback&&this.onBackgroundClickCallback();}else this.onBackgroundClickCallback&&this.onBackgroundClickCallback();}}onMouseWheel(t){if(!this.userControlEnabled)return;t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=t.deltaMode===0,n=t.deltaY,i=e?n*.01:n,r=1.125,o=i>0?r:1/r;this.zoomAtPoint(o,t.clientX,t.clientY),this.reEnableFisheyeAfterZoom();}onDoubleClick(t){return Q(this,null,function*(){if(!this.userControlEnabled)return;t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=t.shiftKey?2.2:.45;yield this.animatedZoomAtPoint(e,t.clientX,t.clientY,.4),this.reEnableFisheyeAfterZoom();});}onKeyDown(t){if(!this.userControlEnabled)return;let e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||e.isContentEditable))return;let n=50;switch(t.key){case"ArrowUp":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(0,n);break;case"ArrowDown":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(0,-n);break;case"ArrowLeft":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(n,0);break;case"ArrowRight":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(-n,0);break;case"+":case"=":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let i=this.container.clientWidth/2,r=this.container.clientHeight/2;this.zoomAtPoint(.9,i,r);break;case"-":case"_":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let o=this.container.clientWidth/2,a=this.container.clientHeight/2;this.zoomAtPoint(1.1,o,a);break;case"r":case"R":t.preventDefault(),this.resetCameraView(!0);break;}}removeSvgBackground(){if(this.svgBackgroundPlane){let t=this.svgBackgroundPlane.material,e=t.opacity??1,n=performance.now(),i=400,r=o=>{let a=Math.min(1,(o-n)/i),c=1-a*(2-a);t.opacity=e*c,t.needsUpdate=!0,a<1?requestAnimationFrame(r):(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof tn&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0);};requestAnimationFrame(r);}this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&(this.svgContainer.remove(),this.svgContainer=null),this.disposeSvgHoverOverlay(),this.svgBackgroundOptions=void 0;}setPhotoOpacity(t,e){let n=this.photoIdToMesh.get(t);n&&n.material&&"opacity"in n.material&&(n.material.opacity=e,n.material.transparent=!0,n.material.needsUpdate=!0);}setPhotoZIndex(t,e){let n=this.photoIdToMesh.get(t);n&&(n.renderOrder=e);}dispose(){this.isInitialized&&(this.destroy$.next(),this.destroy$.complete(),this.destroy$=new Un(),this.textureCache.forEach(t=>t.dispose()),this.textureCache.clear(),this.loadingTextures.clear(),this.highResTextureCache.forEach(t=>t.dispose()),this.highResTextureCache.clear(),this.loadingHighResTextures.clear(),this.removeSvgBackground(),this.renderer&&this.container?.contains(this.renderer.domElement)&&this.container.removeChild(this.renderer.domElement),this.disposeOverlayRenderer(),this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.hoveredItemSignal.set(!1),this.renderer?.dispose(),this.scene?.clear(),this.meshToUrl.clear(),this.meshToEnhancedUrl.clear(),this.highResActive.clear(),this.rafRunning=!1,this.isInitialized=!1,this.container=null);}initializeThreeJS(){return Q(this,null,function*(){let t=this.platformService.isMobile?Math.min(1.5,window.devicePixelRatio||1):Math.min(2,window.devicePixelRatio||1);this.renderer=new lr({antialias:!0,alpha:!0}),this.renderer.outputColorSpace=Ie,this.renderer.setPixelRatio(t),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight);let e=this.renderer.getContext();this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.renderer.domElement.addEventListener("webglcontextlost",r=>{console.error("[THREE_RENDERER] WebGL context lost:",r),r.preventDefault();},!1),this.renderer.domElement.style.touchAction="none",this.renderer.domElement.style.position="relative",this.renderer.domElement.style.zIndex="10",this.container.appendChild(this.renderer.domElement),this.setupDragAndDrop(),this.scene=new qs(),this.scene.background=null,this.svgBackgroundOptions?.enabled&&this.setupSvgBackground(this.svgBackgroundOptions);let i=this.container.clientWidth/this.container.clientHeight;this.camera=new ke(this.FOV_DEG,i,.1,1e5),this.targetCamZ=this.computeFitZWithMargin({minX:-this.PHOTO_W,maxX:this.PHOTO_W,minY:-this.PHOTO_H,maxY:this.PHOTO_H},jt.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN),this.zSpawn=this.targetCamZ/2,this.camera.position.set(0,0,this.targetCamZ),this.camera.lookAt(0,0,0),this.root=new Xn(),this.scene.add(this.root),this.scene.add(new Js(16777215,1)),this.texLoader=new Ks(),this.texLoader.setCrossOrigin("anonymous"),gn(window,"resize").pipe(ki(this.destroy$)).subscribe(()=>this.onResize()),this.clock=new js(),this.startRenderLoop();});}startRenderLoop(){if(this.rafRunning)return;this.rafRunning=!0;let t=()=>{if(!this.rafRunning)return;let e=this.clock.getDelta();this.fisheyeLastDeltaTime=e,this.activeTweens=this.activeTweens.filter(g=>!g(e)),this.clampCameraToBounds();let n=this.camera.position.x,i=this.camera.position.y,r=this.camera.position.z;this.camera.position.x=this.damp(this.camera.position.x,this.targetCamX,this.CAM_DAMP,e),this.camera.position.y=this.damp(this.camera.position.y,this.targetCamY,this.CAM_DAMP,e),this.camera.position.z=this.damp(this.camera.position.z,this.targetCamZ,this.CAM_DAMP,e),this.camera.up.set(-Math.sin(this.camRoll),Math.cos(this.camRoll),0),this.camera.lookAt(this.targetCamX,this.targetCamY,0);let a=Math.abs(this.camera.position.x-n)>this.IDLE_THRESHOLD||Math.abs(this.camera.position.y-i)>this.IDLE_THRESHOLD||Math.abs(this.camera.position.z-r)>this.IDLE_THRESHOLD||this.activeTweens.length>0||this.isDragging||this.isPanning;this.idleCheckInterval+=e,a||this.idleCheckInterval>=this.IDLE_CHECK_INTERVAL?(this.updateFrustum(),this.applyFrustumCulling(),this.idleCheckInterval=0,this.isSceneIdle=!1):this.isSceneIdle||(this.isSceneIdle=!0);let c=!1,l=!1;this.fisheyeEnabled&&this.fisheyePointerActive?(this.applyFisheyeEffect(),c=!0):(this.fisheyeAffectedMeshes.size>0||this.topFisheyeMesh)&&(this.resetAllFisheyeEffects(),l=!0),this.frameCount++;let h=performance.now();if(this.performanceMonitoring&&h-this.lastFpsUpdate>=1e3){this.currentFps=this.frameCount;let g=(this.skippedFrames/this.frameCount*100).toFixed(1);this.frameCount=0,this.renderCount=0,this.skippedFrames=0,this.lastFpsUpdate=h;}let u=!this.isSceneIdle||c||l;u?(this.renderScene(),this.performanceMonitoring&&this.renderCount++):this.performanceMonitoring&&this.skippedFrames++,this.lodAccumTime+=e;let p=this.platformService.isMobile?.5:this.hoveredMesh?.05:.2;this.lodAccumTime>=p&&(this.lodAccumTime=0,this.runLodPass()),u&&this.frameCallbacks.size>0&&this.frameCallbacks.forEach(g=>g()),requestAnimationFrame(t);};requestAnimationFrame(t);}onResize=()=>{if(!this.container||!this.isInitialized)return;let t=this.container.clientWidth,e=this.container.clientHeight;this.renderer.setSize(t,e),this.overlayRenderer?.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.recomputeZoomLimits(),this.cameraMode==="auto-fit"&&(this.targetCamX=(this.bounds.minX+this.bounds.maxX)*.5,this.targetCamY=(this.bounds.minY+this.bounds.maxY)*.5,this.targetCamZ=this.computedMaxCamZ);};loadTexture(t){return Q(this,null,function*(){if(this.textureCache.has(t))return this.textureCache.get(t);if(this.loadingTextures.has(t))return this.loadingTextures.get(t);let e=this.loadAndDownscaleImage(t).then(n=>{try{return this.configureTexture(n),this.textureCache.set(t,n),this.loadingTextures.delete(t),n;}catch(i){throw console.error("[THREE_RENDERER] Error configuring texture:",t,i),this.loadingTextures.delete(t),n.dispose(),i;}}).catch(n=>{throw console.error("[THREE_RENDERER] Failed to load texture:",t,n),this.loadingTextures.delete(t),n;});return this.loadingTextures.set(t,e),e;});}loadHighResTexture(t){return Q(this,null,function*(){if(this.highResTextureCache.has(t))return this.highResTextureCache.get(t);if(this.loadingHighResTextures.has(t))return this.loadingHighResTextures.get(t);let e=this.loadFullResolutionImage(t).then(n=>{try{return this.configureTexture(n),this.highResTextureCache.set(t,n),this.loadingHighResTextures.delete(t),n;}catch(i){throw console.error("[THREE_RENDERER] Error configuring high-res texture:",t,i),this.loadingHighResTextures.delete(t),n.dispose(),i;}}).catch(n=>{throw console.error("[THREE_RENDERER] Failed to load high-res texture:",t,n),this.loadingHighResTextures.delete(t),n;});return this.loadingHighResTextures.set(t,e),e;});}loadFullResolutionImage(t){return Q(this,null,function*(){return new Promise((e,n)=>{let i=new Image();i.crossOrigin="anonymous",i.onload=()=>{try{let{width:r,height:o}=i;if(!r||!o||r<=0||o<=0){n(new Error(`Invalid image dimensions: ${r}x${o}`));return;}if(r>this.maxTextureSize||o>this.maxTextureSize||this.platformService.isMobile){let c=Math.min(this.maxTextureSize,1024),l=this.platformService.isMobile?c:this.maxTextureSize;console.warn(`[THREE_RENDERER] Processing image for high-res: ${r}x${o}, target max: ${l}`);let h=r/o,u,d;if(r>o?(u=Math.min(l,r),d=u/h):(d=Math.min(l,o),u=d*h),u=Math.max(1,Math.floor(u)),d=Math.max(1,Math.floor(d)),u>this.maxTextureSize||d>this.maxTextureSize){n(new Error(`Calculated dimensions exceed max texture size: ${u}x${d}`));return;}let p=document.createElement("canvas"),g=p.getContext("2d",{willReadFrequently:!1,alpha:!0});if(!g){n(new Error("Could not get 2D context from canvas"));return;}p.width=u,p.height=d,g.clearRect(0,0,p.width,p.height);try{g.drawImage(i,0,0,p.width,p.height);}catch(m){n(new Error(`Failed to draw image to canvas: ${m}`));return;}try{let m=g.getImageData(0,0,1,1);if(!m||!m.data||m.data.length===0){n(new Error("Canvas has no valid image data"));return;}}catch(m){n(new Error(`Cannot read canvas data: ${m}`));return;}let _=new di(p);this.configureTexture(_),e(_);return;}let a=new nn(i);this.configureTexture(a),e(a);}catch(r){n(r);}},i.onerror=()=>{n(new Error(`Failed to load full-res image: ${t}`));},i.src=t;});});}configureTexture(t){if(!t)return;let e=t.image,n=e?.width??e?.naturalWidth??0,i=e?.height??e?.naturalHeight??0,r=n>0&&i>0&&this.isPowerOfTwo(n)&&this.isPowerOfTwo(i),o=this.platformService.isMobile;t.colorSpace=Ie,t.wrapS=t.wrapT=En,t.magFilter=Xe,t.anisotropy=o?1:this.ANISO,t.generateMipmaps=o?!1:r,t.minFilter=o?Xe:r?On:Xe,t.needsUpdate=!0;}isPowerOfTwo(t){return(t&t-1)===0&&t!==0;}loadAndDownscaleImage(t){return Q(this,null,function*(){let e=this.platformService.isMobile?Nt.MAX_TEXTURE_DIMENSION_MOBILE:Nt.MAX_TEXTURE_DIMENSION;return new Promise((n,i)=>{let r=new Image();r.crossOrigin="anonymous",r.onload=()=>{try{let{width:o,height:a}=r;if(!o||!a||o<=0||a<=0){i(new Error(`Invalid image dimensions: ${o}x${a}`));return;}if(o<=e&&a<=e){if(o>this.maxTextureSize||a>this.maxTextureSize){i(new Error(`Image too large even for no-downscale path: ${o}x${a}`));return;}let g=new nn(r);this.configureTexture(g),n(g);return;}let c=o/a,l,h;if(o>a?(l=Math.min(e,o),h=l/c):(h=Math.min(e,a),l=h*c),l=Math.max(1,Math.floor(l)),h=Math.max(1,Math.floor(h)),l>this.maxTextureSize||h>this.maxTextureSize){i(new Error(`Calculated dimensions exceed max texture size: ${l}x${h}`));return;}let u=document.createElement("canvas"),d=u.getContext("2d",{willReadFrequently:!1,alpha:!0});if(!d){i(new Error("Could not get 2D context from canvas"));return;}u.width=l,u.height=h,d.clearRect(0,0,u.width,u.height);try{d.drawImage(r,0,0,u.width,u.height);}catch(g){i(new Error(`Failed to draw image to canvas: ${g}`));return;}let p=new di(u);this.configureTexture(p),n(p);}catch(o){i(o);}},r.onerror=()=>{i(new Error(`Failed to load image: ${t}`));},r.src=t;});});}setupSvgBackground(t){if(!t.svgElement){console.warn("\u274C No SVG element provided to setupSvgBackground");return;}let e=new XMLSerializer().serializeToString(t.svgElement),n=document.createElement("canvas"),i=n.getContext("2d"),{width:r,height:o}=this.getSvgDimensions(t.svgElement),a=s.SVG_TARGET_RESOLUTION,c=a/r,l=a/o;n.width=a,n.height=a;let h=new Image();h.onload=()=>{i.clearRect(0,0,n.width,n.height),i.scale(c,l),i.drawImage(h,0,0,r,o),this.svgBackgroundTexture=new di(n),this.svgBackgroundTexture.colorSpace=Ie,this.svgBackgroundTexture.needsUpdate=!0;let p=t.radius||2e4,g=new Pn(p*2,p*2),_=t.desiredOpacity??1,m=new dn({map:this.svgBackgroundTexture,transparent:!0,opacity:0,depthWrite:!1});this.svgBackgroundPlane=new Ue(g,m),this.svgBackgroundPlane.position.set(0,0,-1),this.svgBackgroundPlane.renderOrder=-1e3,t.offsetX&&(this.svgBackgroundPlane.position.x+=t.offsetX),t.offsetY&&(this.svgBackgroundPlane.position.y+=t.offsetY),t.scale&&this.svgBackgroundPlane.scale.setScalar(t.scale),this.scene.add(this.svgBackgroundPlane),this.animateMaterialOpacity(m,_,650);},h.onerror=p=>{console.error("\u274C Failed to load SVG image:",p);};let u=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(u);h.src=d;}computeFitZWithMargin(t,e,n,i){let r=t.maxX-t.minX,o=t.maxY-t.minY,a=r+2*i,l=(o+2*i)*.5/Math.tan(e*.5),h=2*Math.atan(Math.tan(e*.5)*n),u=a*.5/Math.tan(h*.5);return Math.max(l,u)*1.1;}clamp01(t){return Math.max(0,Math.min(1,t));}zoomAtCenter(t){if(!this.container)return Promise.resolve();this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=this.container.getBoundingClientRect(),n=e.left+e.width/2,i=e.top+e.height/2;return this.animatedZoomAtPoint(t,n,i,.3).then(()=>{this.reEnableFisheyeAfterZoom();});}focusOnPosition(t,e,n=800){this.cameraMode="user-controlled",this.targetCamX=t,this.targetCamY=e,this.targetCamZ=jt.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);}focusOnPositionAnimated(t,e,n=800,i=1){let r=++this.camMoveTweenId;return new Promise(o=>{this.cameraMode="user-controlled";let a=this.targetCamX,c=this.targetCamY,l=this.targetCamZ,h=jt.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);if(i<=.01){this.targetCamX=t,this.targetCamY=e,this.targetCamZ=h,o();return;}let u=.7,d=!1,p=this.makeTween(i,g=>{let _=this.easeOutCubic(g);this.targetCamX=this.lerp(a,t,_),this.targetCamY=this.lerp(c,e,_),this.targetCamZ=this.lerp(l,h,_),!d&&g>=u&&(d=!0,this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal),g>=1&&(this.targetCamX=t,this.targetCamY=e,this.targetCamZ=h,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal,o());});this.addTween(this.supersedable(p,()=>r===this.camMoveTweenId,o));});}animatedZoomAtPoint(t,e,n,i){if(!this.userControlEnabled)return Promise.resolve();this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let r=this.targetCamZ,o=this.targetCamX,a=this.targetCamY,c=jt.clamp(r*t,this.computedMinCamZ,this.computedMaxCamZ),l=this.container.getBoundingClientRect(),h=(e-l.left)/l.width*2-1,u=-((n-l.top)/l.height)*2+1,d=this.projectScreenToWorld(h,u,o,a,r),p=this.projectScreenToWorld(h,u,o,a,c),g=o+(d.x-p.x),_=a+(d.y-p.y);return this.runTween(this.makeTween(i,m=>{this.targetCamZ=jt.lerp(r,c,m),this.targetCamX=jt.lerp(o,g,m),this.targetCamY=jt.lerp(a,_,m);}));}updateFrustum(){this.camera.updateMatrixWorld(),this.frustumMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.frustumMatrix);}applyFrustumCulling(){this.visibleMeshCount=0,this.totalMeshCount=0;for(let t of this.root.children){let e=t;if(this.totalMeshCount++,e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),e.geometry.boundingSphere){e.updateMatrixWorld();let n=e.geometry.boundingSphere.clone();n.applyMatrix4(e.matrixWorld);let i=this.frustum.intersectsSphere(n);e.visible!==i&&(e.visible=i),i&&this.visibleMeshCount++;}}this.cullingLogCounter++,this.performanceMonitoring&&this.cullingLogCounter>=100&&(this.cullingLogCounter=0);}runLodPass(){if(!this.container)return;let t=1,e=0;for(let n of this.root.children){let i=n;if(!i.visible)continue;let r=this.meshToUrl.get(i);if(!r)continue;let o=this.meshToEnhancedUrl.get(i)||r,a=this.highResActive.has(i),c=Math.max(.001,Math.abs(i.position.z-this.camera.position.z)),l=this.getVisibleWidthAtDepth(c)*2,h=this.container.clientWidth/Math.max(1,l),u=this.PHOTO_W*h,d=this.PHOTO_H*h,p=this.container.clientWidth||1,g=this.container.clientHeight||1,_=u>=p*.3||d>=g*.3,m=this.findPhotoIdForMesh(i),f=this.permalinkTargetId!==null&&m===this.permalinkTargetId,T=this.highResPriorityId!==null&&m===this.highResPriorityId;if(!(f||T||this.fisheyeAffectedMeshes.has(i)||_)){a&&this.downgradeToLowResTexture(i,r).then(()=>this.highResActive.delete(i)).catch(()=>{});continue;}!a&&u>=t?this.upgradeToHighResTexture(i,o).then(()=>{this.highResActive.add(i);}).catch(()=>{}):a&&u<=e&&this.downgradeToLowResTexture(i,r).then(()=>{this.highResActive.delete(i);}).catch(()=>{});}}updateCameraFov(t){this.camera&&this.camera.isPerspectiveCamera&&(this.camera.fov=t,this.camera.updateProjectionMatrix());}getCurrentZoomLevel(){return this.computedMaxCamZ/this.targetCamZ;}updateCameraZoom(t){this.camera&&(this.camera.zoom=t,this.camera.updateProjectionMatrix?.());}setRotationSpeed(t){this.rotationSpeedMultiplier=t;}setPanSensitivity(t){this.panSensitivityMultiplier=t;}setDepthOfField(t){if(!this.dofPass){this.dofStrength=t;return;}if(this.dofStrength=t,t>0){let n=t/100*15;this.dofPass.uniforms.focalDepth.value=5e3,this.dofPass.uniforms.bokeh.value=!0,this.dofPass.uniforms.maxblur.value=n;}}disableDepthOfField(){this.dofStrength=0,this.dofPass&&(this.dofPass.uniforms.bokeh.value=!1);}static ɵfac=function(e){return new(e||s)();};static ɵprov=Qn({token:s,factory:s.ɵfac,providedIn:"root"});};var ha=class s{renderer=ge(pn);photoRepository=null;active=Ft(!1);focusedPhotoId=Ft(null);highlightedPhotoId=Ft(null);focusArrived=Ft(!1);queue=[];runId=0;exitAllowedAt=0;attach(t){this.photoRepository=t;}detach(){this.photoRepository=null;}start(){this.active()||(this.runId++,this.exitAllowedAt=Date.now()+se.DEMO_EXIT_GRACE_PERIOD,this.active.set(!0),this.runLoop(this.runId));}stop(){this.active()&&(this.runId++,this.active.set(!1),this.focusedPhotoId.set(null),this.queue=[],this.renderer.setHighResPriorityId(null),this.highlight(null),this.renderer.animateCameraRoll(0,se.DEMO_EXIT_ROLL_DURATION),this.renderer.resetCameraView(!0));}toggle(){this.active()?this.stop():this.start();}canExitByPointer(){return this.active()&&Date.now()>=this.exitAllowedAt;}enqueueNewPhoto(t){!this.active()||this.queue.includes(t)||this.queue.push(t);}runLoop(t){return Q(this,null,function*(){for(;this.isCurrentRun(t);){let e=this.pickNext();if(e&&(yield this.focusOn(e,t)),!this.isCurrentRun(t))break;yield this.sleep(se.DEMO_PAUSE_DURATION*1e3);}});}pickNext(){let t=this.photoRepository;if(!t)return null;for(let r=this.queue.length;r>0;r--){let o=this.queue.shift();if(!o)break;let a=t.getPhoto(o);if(a){if(this.isFocusable(a))return a;this.queue.push(o);}}let e=t.getVisiblePhotos().filter(r=>this.isFocusable(r));if(e.length===0)return null;let n=this.focusedPhotoId(),i=e.length>1?e.filter(r=>r.id!==n):e;return i[Math.floor(Math.random()*i.length)];}focusOn(t,e){return Q(this,null,function*(){let n=t.id;this.focusedPhotoId.set(n),this.renderer.setHighResPriorityId(n);let i=t.mesh;i&&this.renderer.upgradeToHighResTexture(i,t.enhancedUrl).catch(()=>{});try{let r=this.focusTarget(n);if(!r)return;this.highlight(n);let o=se.DEMO_ROLL_TO_ITEM,a=o?{x:r.x,y:r.y,z:this.renderer.computeFocusZForItem(r.photo,se.DEMO_FOCUS_FILL_RATIO,!1)}:this.renderer.computeFocusFrame(r.photo,se.DEMO_FOCUS_FILL_RATIO,se.DEMO_DECORATION_HEADROOM);if(!a||(yield Promise.all([o?this.renderer.animateCameraRoll(r.roll,se.DEMO_ZOOM_IN_DURATION):Promise.resolve(),this.renderer.focusCameraOn(a.x,a.y,a.z,se.DEMO_ZOOM_IN_DURATION)]),!this.isCurrentRun(e))||(this.focusArrived.set(!0),yield this.sleep(se.DEMO_HOLD_DURATION*1e3),!this.isCurrentRun(e)))return;this.highlight(null),yield Promise.all([this.renderer.animateCameraRoll(0,se.DEMO_ZOOM_OUT_DURATION),this.renderer.resetCameraView(!0,se.DEMO_ZOOM_OUT_DURATION)]);}finally{this.isCurrentRun(e)&&(this.renderer.setHighResPriorityId(null),this.highlight(null),this.focusedPhotoId.set(null));}});}focusTarget(t){let e=this.photoRepository?.getPhoto(t);if(!e||!e.mesh||!this.isFocusable(e))return null;let n=e.mesh.userData.originalRotation??e.mesh.rotation.z;return{photo:e,x:e.mesh.position.x,y:e.mesh.position.y,roll:n};}isFocusable(t){let e=t.getProperty("opacity")??1;return!!t.mesh&&e>0&&t.animationState==="positioned";}highlight(t){this.focusArrived.set(!1),this.highlightedPhotoId.set(t),this.renderer.setDemoFocusPhotoId(t);}isCurrentRun(t){return this.active()&&this.runId===t;}sleep(t){return new Promise(e=>setTimeout(e,t));}static ɵfac=function(e){return new(e||s)();};static ɵprov=Qn({token:s,factory:s.ɵfac,providedIn:"root"});};function ua(s){return s==null||s==="";}function da(s){let t=ua(s.favorable_future)?s.ai_favorable_future:s.favorable_future,e=ua(s.plausibility)?s.ai_plausibility:s.plausibility;return{favorable_future:ua(t)?null:String(t),plausibility:ua(e)||!isFinite(Number(e))?null:Number(e)};}var Jg=(s,t)=>t.id;function jg(s,t){if(s&1){let e=Pe();ht(0,"div",2),ie("mouseenter",function(){let i=Yt(e).$implicit,r=St();return qt(r.onLabelEnter(i));})("mouseleave",function(){Yt(e);let i=St();return qt(i.onLabelLeave());})("focus",function(){let i=Yt(e).$implicit,r=St();return qt(r.onLabelEnter(i));})("blur",function(){Yt(e);let i=St();return qt(i.onLabelLeave());}),ht(1,"span",3),Fe(2),yt()();}if(s&2){let e=t.$implicit;dr("aria-label",e.name),Pt(2),fr(e.name);}}var fa=class s{static MIN_ITEMS_FOR_LABEL=2;static CULLING_INTERVAL_MS=120;themeLabels=we([]);subThemeLabels=we([]);zoomLevel=we(1);labelHover=Es();static ZOOM_THRESHOLD=1.35;static MIN_FONT=11;static MAX_FONT=18;rendererService=ge(pn);ngZone=ge(zi);el=ge(Vi);unregisterFrameCb=null;cachedLabelEls=[];cachedFontSizes=[];lastCullingAt=0;constructor(){ln(()=>{let t=this.getVisibleLabels();this.cachedFontSizes=this.computeFontSizes(t),Promise.resolve().then(()=>this.refreshLabelCache());});}ngOnInit(){this.ngZone.runOutsideAngular(()=>{this.unregisterFrameCb=this.rendererService.addFrameCallback(()=>{this.updateLabelPositions();});});}ngOnDestroy(){this.unregisterFrameCb?.(),this.cachedLabelEls=[];}get activeLabels(){return this.getVisibleLabels();}getVisibleLabels(){return this.subThemeLabels().filter(t=>t.itemCount>=s.MIN_ITEMS_FOR_LABEL);}onLabelEnter(t){this.labelHover.emit({id:t.id,level:"sub-theme"});}onLabelLeave(){this.labelHover.emit(null);}refreshLabelCache(){let t=this.el.nativeElement;this.cachedLabelEls=Array.from(t.querySelectorAll(".cluster-label"));for(let e=0;e<this.cachedLabelEls.length;e++){let n=this.cachedFontSizes[e];n!=null&&this.cachedLabelEls[e].style.setProperty("--label-font-size",`${n}px`);}this.lastCullingAt=0,this.updateLabelPositions();}computeFontSizes(t){if(t.length===0)return[];let e=t.map(c=>c.itemCount),n=Math.max(...e),i=Math.min(...e),r=n-i,{MIN_FONT:o,MAX_FONT:a}=s;return t.map(c=>{let l=r>0?Math.sqrt((c.itemCount-i)/r):1;return Math.round(o+l*(a-o));});}updateLabelPositions(){let t=this.activeLabels,e=this.cachedLabelEls;if(e.length===0)return;let n=[];for(let l=0;l<e.length;l++){let h=t[l];if(!h)continue;let u=this.rendererService.worldToScreen(h.worldX,h.worldY);u?n.push({el:e[l],x:u.x,y:u.y,visible:!0,itemCount:h.itemCount}):e[l].style.display="none";}n.sort((l,h)=>h.itemCount-l.itemCount);for(let l of n)l.el.style.transform=`translate(-50%, -50%) translate(${l.x}px, ${l.y}px)`,l.el.style.display="";let i=performance.now();if(i-this.lastCullingAt<s.CULLING_INTERVAL_MS)return;this.lastCullingAt=i;let r=8,o=[],a=window.innerWidth,c=window.innerHeight;for(let l of n){let h=l.el.getBoundingClientRect();if(h.width===0&&h.height===0)continue;let u=h.left-r,d=h.top-r,p=h.right+r,g=h.bottom+r,_=p<0||u>a||g<0||d>c,m=o.some(f=>!(p<f.x1||u>f.x2||g<f.y1||d>f.y2));_||m?(l.el.style.opacity="0",l.el.style.pointerEvents="none"):(l.el.style.opacity="1",l.el.style.pointerEvents="auto",o.push({x1:u,y1:d,x2:p,y2:g}));}}static ɵfac=function(e){return new(e||s)();};static ɵcmp=on({type:s,selectors:[["app-taxonomy-clusters-overlay"]],inputs:{themeLabels:[1,"themeLabels"],subThemeLabels:[1,"subThemeLabels"],zoomLevel:[1,"zoomLevel"]},outputs:{labelHover:"labelHover"},decls:3,vars:0,consts:[[1,"cluster-labels-container"],["role","button","tabindex","0",1,"cluster-label","sub-theme"],["role","button","tabindex","0",1,"cluster-label","sub-theme",3,"mouseenter","mouseleave","focus","blur"],[1,"cluster-label-text"]],template:function(e,n){e&1&&(ht(0,"div",0),Wi(1,jg,3,2,"div",1,Jg),yt()),e&2&&(Pt(),Xi(n.activeLabels));},styles:[`

[_nghost-%COMP%] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 50;
  font-family: var(--showcase-font-family, "Readex Pro", "Miriam Libre", "Source Sans 3", sans-serif);
}
.cluster-labels-container[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.cluster-label[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%) translate(-9999px, -9999px);
  transition: opacity 0.4s ease;
  pointer-events: auto;
}
.cluster-label-text[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 253, 246, 0.72);
  border: 1px solid rgba(241, 229, 243, 0.9);
  border-radius: 20px;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: #4E02B2;
  font-size: var(--label-font-size, 13px);
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-transform: uppercase;
  pointer-events: auto;
  -webkit-user-select: none;
  user-select: none;
}
.cluster-label.sub-theme[_ngcontent-%COMP%]   .cluster-label-text[_ngcontent-%COMP%] {
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(255, 253, 246, 0.55);
  border-color: rgba(241, 229, 243, 0.6);
  text-transform: none;
  letter-spacing: 0;
}
.cluster-label[_ngcontent-%COMP%]:hover   .cluster-label-text[_ngcontent-%COMP%], 
.cluster-label[_ngcontent-%COMP%]:focus-visible   .cluster-label-text[_ngcontent-%COMP%], 
.cluster-label[_ngcontent-%COMP%]:focus-within   .cluster-label-text[_ngcontent-%COMP%] {
  background: #4E02B2;
  border-color: #4E02B2;
  color: #fffdf6;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
}`],changeDetection:0});};var Qg=(s,t)=>t.id;function t_(s,t){if(s&1&&(ht(0,"div",2),Fe(1),yt()),s&2){let e=t.$implicit,n=St();Ce("prevent",n.isPrevent(e)),Pt(),fr(e.name);}}var pa=class s{labels=we([]);static MIN_FONT=8;static MAX_FONT=120;static SCALE_PROBE_WORLD_UNITS=1e3;static EM_PER_CHARACTER=.75;rendererService=ge(pn);ngZone=ge(zi);el=ge(Vi);unregisterFrameCb=null;cachedLabelEls=[];constructor(){ln(()=>{this.labels(),Promise.resolve().then(()=>this.refreshLabelCache());});}ngOnInit(){this.ngZone.runOutsideAngular(()=>{this.unregisterFrameCb=this.rendererService.addFrameCallback(()=>{this.updateLabelPositions();});});}ngOnDestroy(){this.unregisterFrameCb?.(),this.cachedLabelEls=[];}isPrevent(t){return t.rotationDeg<=0;}refreshLabelCache(){let t=this.el.nativeElement;this.cachedLabelEls=Array.from(t.querySelectorAll(".tsne-cluster-label")),this.updateLabelPositions();}updateLabelPositions(){let t=this.labels(),e=this.cachedLabelEls;if(e.length===0)return;let n=this.getWorldToScreenScale();if(n===null)return;let i=window.innerWidth,r=window.innerHeight,{MIN_FONT:o,MAX_FONT:a,EM_PER_CHARACTER:c}=s;for(let l=0;l<e.length;l++){let h=t[l],u=e[l];if(!h)continue;let d=this.rendererService.worldToScreen(h.worldX,h.worldY);if(!d||d.x<0||d.x>i||d.y<0||d.y>r){u.style.opacity="0";continue;}let p=Math.max(1,h.name.length),g=Math.min(a,Math.max(o,h.worldWidth/(p*c)*n));u.style.setProperty("--label-font-size",`${g}px`),u.style.transform=`translate(-50%, -50%) translate(${d.x}px, ${d.y}px) rotate(${-h.rotationDeg*2}deg)`,u.style.opacity="1";}}getWorldToScreenScale(){let t=s.SCALE_PROBE_WORLD_UNITS,e=this.rendererService.worldToScreen(0,0),n=this.rendererService.worldToScreen(t,0);return!e||!n?null:Math.abs(n.x-e.x)/t;}static ɵfac=function(e){return new(e||s)();};static ɵcmp=on({type:s,selectors:[["app-tsne-clusters-overlay"]],inputs:{labels:[1,"labels"]},decls:3,vars:0,consts:[["aria-hidden","true",1,"tsne-cluster-labels-container"],[1,"tsne-cluster-label",3,"prevent"],[1,"tsne-cluster-label"]],template:function(e,n){e&1&&(ht(0,"div",0),Wi(1,t_,2,3,"div",1,Qg),yt()),e&2&&(Pt(),Xi(n.labels()));},styles:[`

.font-sans[_ngcontent-%COMP%] {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
}
.background-image[_ngcontent-%COMP%] {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.message[_ngcontent-%COMP%] {
  font-size: 18px;
  padding: 16px 24px;
  max-width: calc(100% - 32px);
  transition: border-radius 0.3s ease-in-out;
  z-index: 1;
}
.message[_ngcontent-%COMP%]     * {
  margin: 0;
}
.message[_ngcontent-%COMP%]     * a {
  color: inherit;
}
.message.ai[_ngcontent-%COMP%] {
  background-color: #E7CBFF;
  color: #4E02B2;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  border-radius: 32px 32px 32px 2px;
  align-self: flex-start;
  animation: _ngcontent-%COMP%_fadeInLeft 0.08s ease-out;
}
.message.human[_ngcontent-%COMP%] {
  background-color: #4E02B2;
  color: #FFFFFF;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  border-radius: 32px 32px 2px 32px;
  align-self: flex-end;
  animation: _ngcontent-%COMP%_fadeInRight 0.08s ease-out;
  margin-bottom: 4px;
}
.message.part[_ngcontent-%COMP%] {
  border-radius: 32px;
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
  gap: 4px;
}
.buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]    > .button[_ngcontent-%COMP%] {
  flex: 1 1 auto;
}
.buttons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {
  height: 52px;
  padding: 0px 8px;
  display: flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  font-size: 16px;
  line-height: normal;
  font-weight: 400;
  border: 1px solid #E7CBFF;
  background: #FBF5F6;
  color: #4E02B2;
  cursor: pointer;
}
.buttons[_ngcontent-%COMP%]   .button.primary[_ngcontent-%COMP%] {
  border: 1px solid #4E02B2;
  background: #4E02B2;
  color: #FFFFFF;
  font-weight: 700;
}
.buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
@keyframes _ngcontent-%COMP%_fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInUp2 {
  from {
    transform: translateY(200%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
[_nghost-%COMP%] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 50;
}
.tsne-cluster-labels-container[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.tsne-cluster-label[_ngcontent-%COMP%] {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%) translate(-9999px, -9999px);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  font-style: italic;
  font-weight: 400;
  font-size: var(--label-font-size, 16px);
  line-height: 1;
  color: #0030CC;
  text-shadow:
    -0.12em -0.12em 0.12em #FFFDF6,
    0.12em -0.12em 0.12em #FFFDF6,
    -0.12em 0.12em 0.12em #FFFDF6,
    0.12em 0.12em 0.12em #FFFDF6,
    0 0 0.24em #FFFDF6;
}
.tsne-cluster-label.prevent[_ngcontent-%COMP%] {
  color: #B50F0F;
}`],changeDetection:0});};var e_=["anchor"];function n_(s,t){s&1&&(ht(0,"span",18),Bn(1,1),yt());}function i_(s,t){s&1&&(ht(0,"span",18),Bn(1,2),yt());}function s_(s,t){s&1&&(ht(0,"span",19),Bn(1,3),yt());}function r_(s,t){if(s&1&&(ht(0,"div",17),Ge(1,n_,2,0,"span",18)(2,i_,2,0,"span",18)(3,s_,2,0,"span",19),yt()),s&2){let e=St();Ce("ish",e.isIsh()),Pt(),re(t==="prefer"?1:2),Pt(2),re(e.isIsh()?3:-1);}}function o_(s,t){s&1&&(ht(0,"div",15),Bn(1,4),yt());}function a_(s,t){s&1&&(ht(0,"div",15),Bn(1,5),yt());}function l_(s,t){s&1&&(ht(0,"div",15),Bn(1,6),yt());}function c_(s,t){s&1&&(ht(0,"div",15),Bn(1,7),yt());}function h_(s,t){s&1&&(ht(0,"div",15),Bn(1,8),yt());}function u_(s,t){if(s&1&&he(0,"img",20),s&2){let e=t.$implicit,n=t.$index,i=St();Gi("--clip-index",n)("--clip-tilt",i.tilt().clips[n]+"deg"),an("src","/img-pin-"+e+"-v.svg",ql);}}function d_(s,t){let e=2166136261;for(let i=0;i<s.length;i++)e=Math.imul(e^s.charCodeAt(i),16777619)>>>0;let n=[];for(let i=0;i<t;i++)e=Math.imul(e^e>>>15,2246822507)>>>0,e=Math.imul(e^e>>>13,3266489909)>>>0,n.push((e>>>8)/16777215*2-1);return n;}function f_(s){if(typeof s!="string")return null;let t=s.toLowerCase().trim(),e=t.startsWith("mostly")||t.endsWith("-ish");return /prevent|unfavo/.test(t)||t==="no"?e?"prevent-ish":"prevent":/prefer|favor/.test(t)||t==="yes"?e?"prefer-ish":"prefer":null;}function p_(s){let t=typeof s=="string"?Number(s):s;return typeof t!="number"||!isFinite(t)?null:t>=90?100:t>=70?75:t>=40?50:t>=10?25:0;}var ma=class s{photo=we(null);arrived=we(!1);favorability=_e(()=>f_(this.photo()?.metadata.favorable_future));plausibility=_e(()=>p_(this.photo()?.metadata.plausibility));side=_e(()=>{let t=this.favorability();return t?t.startsWith("prefer")?"prefer":"prevent":null;});clips=_e(()=>{switch(this.favorability()){case"prefer":return["prefer"];case"prefer-ish":return["prefer","prevent"];case"prevent":return["prevent"];case"prevent-ish":return["prevent","prefer"];default:return[];}});isIsh=_e(()=>this.favorability()?.endsWith("-ish")??!1);static MAX_TILT_DEG=3;tilt=_e(()=>{let t=this.photo()?.id??"",[e,...n]=d_(t,3).map(i=>i*s.MAX_TILT_DEG);return{string:e,clips:n};});anchor=$l.required("anchor");rendererService=ge(pn);ngZone=ge(zi);unregisterFrameCb=null;ngOnInit(){this.ngZone.runOutsideAngular(()=>{this.unregisterFrameCb=this.rendererService.addFrameCallback(()=>this.follow());});}ngOnDestroy(){this.unregisterFrameCb?.();}follow(){let t=this.anchor().nativeElement,e=this.photo(),n=e?this.rendererService.getPhotoScreenFrame(e.id):null;if(!n){t.style.visibility="hidden";return;}t.style.visibility="visible",t.style.transform=`translate(${n.x}px, ${n.y}px) rotate(${n.rotation}rad)`,t.style.setProperty("--w",`${n.width}px`);}static ɵfac=function(e){return new(e||s)();};static ɵcmp=on({type:s,selectors:[["app-demo-focus-overlay"]],viewQuery:function(e,n){e&1&&Jl(n.anchor,e_,5),e&2&&jl();},inputs:{photo:[1,"photo"],arrived:[1,"arrived"]},decls:14,vars:12,consts:()=>{let t;t="Gewenst";let e;e="Gevreesd";let n;n="(deels)";let i;i="Verwacht";let r;r="Waarschijnlijk";let o;o="Geloofwaardig";let a;a="Voorstelbaar";let c;return c="Absurd",[["anchor",""],t,e,n,i,r,o,a,c,["aria-hidden","true",1,"demo-focus"],[1,"anchor"],[1,"string-frame"],[1,"string"],[1,"labels"],[1,"favorability",3,"ish"],[1,"plausibility"],["alt","",1,"clip",3,"src","--clip-index","--clip-tilt"],[1,"favorability"],[1,"side"],[1,"ish"],["alt","",1,"clip",3,"src"]];},template:function(e,n){if(e&1&&(ht(0,"div",9)(1,"div",10,0)(3,"div",11),he(4,"div",12),ht(5,"div",13),Ge(6,r_,4,4,"div",14)(7,o_,2,0,"div",15)(8,a_,2,0,"div",15)(9,l_,2,0,"div",15)(10,c_,2,0,"div",15)(11,h_,2,0,"div",15),yt()(),Wi(12,u_,1,5,"img",16,Kl),yt()()),e&2){let i,r;Ce("visible",!!n.photo()&&n.arrived())("prefer",n.side()==="prefer")("prevent",n.side()==="prevent"),Pt(3),Gi("--string-tilt",n.tilt().string+"deg"),Pt(2),Gi("--clip-count",n.clips().length),Pt(),re((i=n.side())?6:-1,i),Pt(),re((r=n.plausibility())===100?7:r===75?8:r===50?9:r===25?10:r===0?11:-1),Pt(5),Xi(n.clips());}},styles:[`

.font-sans[_ngcontent-%COMP%] {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
}
.background-image[_ngcontent-%COMP%] {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.message[_ngcontent-%COMP%] {
  font-size: 18px;
  padding: 16px 24px;
  max-width: calc(100% - 32px);
  transition: border-radius 0.3s ease-in-out;
  z-index: 1;
}
.message[_ngcontent-%COMP%]     * {
  margin: 0;
}
.message[_ngcontent-%COMP%]     * a {
  color: inherit;
}
.message.ai[_ngcontent-%COMP%] {
  background-color: #E7CBFF;
  color: #4E02B2;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  border-radius: 32px 32px 32px 2px;
  align-self: flex-start;
  animation: _ngcontent-%COMP%_fadeInLeft 0.08s ease-out;
}
.message.human[_ngcontent-%COMP%] {
  background-color: #4E02B2;
  color: #FFFFFF;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  border-radius: 32px 32px 2px 32px;
  align-self: flex-end;
  animation: _ngcontent-%COMP%_fadeInRight 0.08s ease-out;
  margin-bottom: 4px;
}
.message.part[_ngcontent-%COMP%] {
  border-radius: 32px;
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
  gap: 4px;
}
.buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]    > .button[_ngcontent-%COMP%] {
  flex: 1 1 auto;
}
.buttons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {
  height: 52px;
  padding: 0px 8px;
  display: flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  font-size: 16px;
  line-height: normal;
  font-weight: 400;
  border: 1px solid #E7CBFF;
  background: #FBF5F6;
  color: #4E02B2;
  cursor: pointer;
}
.buttons[_ngcontent-%COMP%]   .button.primary[_ngcontent-%COMP%] {
  border: 1px solid #4E02B2;
  background: #4E02B2;
  color: #FFFFFF;
  font-weight: 700;
}
.buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
@keyframes _ngcontent-%COMP%_fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInUp2 {
  from {
    transform: translateY(200%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
[_nghost-%COMP%] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 70;
  font-family: var(--showcase-font-family, "Readex Pro", "Miriam Libre", "Source Sans 3", sans-serif);
}
.demo-focus[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  --string-color: #8F8F8F;
  --other-color: #8F8F8F;
}
.demo-focus.prefer[_ngcontent-%COMP%] {
  --string-color: #698CFF;
  --other-color: #F73C3C;
}
.demo-focus.prevent[_ngcontent-%COMP%] {
  --string-color: #F73C3C;
  --other-color: #698CFF;
}
.demo-focus.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
.anchor[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  transform-origin: 0 0;
  visibility: hidden;
  direction: ltr;
  --w: 0px;
}
.string-frame[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  transform-origin: calc(var(--w) * 0.1155) 0;
  transform: rotate(var(--string-tilt, 0deg));
}
.string[_ngcontent-%COMP%] {
  position: absolute;
  left: -100vmax;
  width: 200vmax;
  height: max(1.5px, calc(var(--w) * 0.009));
  top: 0;
  transform: translateY(-50%);
  background: var(--string-color);
}
.clip[_ngcontent-%COMP%] {
  position: absolute;
  height: calc(var(--w) * 0.5);
  width: auto;
  left: calc(var(--w) * (0.04 + 0.17 * var(--clip-index, 0)));
  top: calc(var(--w) * -0.33);
  transform-origin: 50% 66%;
  transform: rotate(var(--clip-tilt, 0deg));
}
.labels[_ngcontent-%COMP%] {
  position: absolute;
  left: calc(var(--w) * (0.07 + 0.17 * var(--clip-count, 0)));
  bottom: calc(var(--w) * 0.06);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--w) * 0.03);
  white-space: nowrap;
  line-height: 1.15;
  text-align: left;
}
.favorability[_ngcontent-%COMP%] {
  display: inline-flex;
  overflow: hidden;
  border-radius: calc(var(--w) * 0.02);
  font-size: calc(var(--w) * 0.1);
  font-weight: 400;
  color: #FFFFFF;
}
.favorability[_ngcontent-%COMP%]   .side[_ngcontent-%COMP%], 
.favorability[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%] {
  padding: calc(var(--w) * 0.01) calc(var(--w) * 0.035);
}
.favorability[_ngcontent-%COMP%]   .side[_ngcontent-%COMP%] {
  background: var(--string-color);
}
.favorability[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%] {
  background: var(--other-color);
  padding-left: calc(var(--w) * 0.015);
}
.favorability.ish[_ngcontent-%COMP%]   .side[_ngcontent-%COMP%] {
  padding-right: calc(var(--w) * 0.015);
}
.plausibility[_ngcontent-%COMP%] {
  font-size: calc(var(--w) * 0.1);
  font-weight: 400;
  color: var(--string-color);
}
.demo-focus.visible[_ngcontent-%COMP%]   .string[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_demo-wipe-in 1.2s ease-in-out both;
}
.demo-focus.visible[_ngcontent-%COMP%]   .plausibility[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_demo-fade-in 0.3s ease-out 0.6s both;
}
.demo-focus.visible[_ngcontent-%COMP%]   .clip[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_demo-clip-drop 0.3s cubic-bezier(0.2, 0.9, 0.3, 1) both;
  animation-delay: calc(1s + var(--clip-index, 0) * 0.1s);
}
.demo-focus.visible[_ngcontent-%COMP%]   .favorability[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_demo-fade-in 0.3s ease-out 1.3s both;
}
@keyframes _ngcontent-%COMP%_demo-clip-drop {
  from {
    opacity: 0;
    transform: rotate(var(--clip-tilt, 0deg)) translateY(-250%);
  }
  30% {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(var(--clip-tilt, 0deg));
  }
}
@keyframes _ngcontent-%COMP%_demo-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes _ngcontent-%COMP%_demo-wipe-in {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}`],changeDetection:0});};var m_=["container"],g_=["titleElement"];function __(s,t){s&1&&(ht(0,"div",3),he(1,"div",15),yt());}function y_(s,t){if(s&1){let e=Pe();ht(0,"app-qrcode",16),ie("click",function(){Yt(e);let i=St();return qt(i.toggleQrSize());}),yt();}if(s&2){let e=St();an("small",e.qrSmall())("url",e.qrUrl());}}function v_(s,t){if(s&1){let e=Pe();ht(0,"app-evaluation-sidebar",17),ie("close",function(){Yt(e);let i=St();return qt(i.onSidebarClose());})("metadataUpdated",function(i){Yt(e);let r=St();return qt(r.onMetadataUpdated(i));}),yt();}if(s&2){let e=St();an("isOpen",e.sidebarOpen()&&e.canEditSelectedItem())("itemId",e.selectedItemId())("itemKey",e.selectedItemKey())("workspaceId",e.workspace())("apiKey",e.api_key())("adminKey",e.admin_key())("lang",e.lang());}}function x_(s,t){if(s&1){let e=Pe();ht(0,"div",18)(1,"app-filters-bar",19),ie("filtersChange",function(i){Yt(e);let r=St();return qt(r.onFiltersChange(i));})("filtersCommit",function(i){Yt(e);let r=St();return qt(r.onFiltersChange(i));}),yt()();}if(s&2){let e=St();Ce("open",e.filtersBarOpen()),Pt(),an("counts",e.filterCounts())("totalCount",e.totalPhotoCount())("filteredCount",e.totalPhotoCount())("showViewToggle",!1)("showOrderBy",!1)("initialState",e.currentFilters())("topicTree",e.taxonomyService.topicTree());}}function b_(s,t){if(s&1){let e=Pe();ht(0,"a",20),he(1,"img",21),yt(),ht(2,"button",22),ie("click",function(){Yt(e);let i=St();return qt(i.goBack());}),Ke(),ht(3,"svg",23),he(4,"path",24),yt()();}}function M_(s,t){if(s&1&&Fe(0),s&2){let e=St(2);Ps(" \u2756 ",e.workspaceTitle(),"");}}function S_(s,t){if(s&1&&(ht(0,"div",25,1),Fe(2),Ge(3,M_,1,1),yt()),s&2){let e=St();Ce("needs-animation",e.titleNeedsAnimation()),Pt(2),Ps(" ",e.workspaceTitle(),""),Pt(),re(e.titleNeedsAnimation()?3:-1);}}function T_(s,t){if(s&1){let e=Pe();ht(0,"button",44),ie("click",function(){Yt(e);let i=St(3);return qt(i.clearSearch());}),Fe(1," \xD7 "),yt();}}function E_(s,t){if(s&1){let e=Pe();ht(0,"div",32)(1,"input",42),ie("input",function(i){Yt(e);let r=St(2);return qt(r.onSearchInput(i));})("keydown.escape",function(){Yt(e);let i=St(2);return qt(i.clearSearch());}),yt(),Ge(2,T_,2,0,"button",43),yt();}if(s&2){let e=St(2);Pt(),an("value",e.searchText()),Pt(),re(e.searchText()?2:-1);}}function w_(s,t){if(s&1){let e=Pe();ht(0,"button",53),ie("click",function(){Yt(e);let i=St(3);return qt(i.enableDragAllMode());}),Ke(),ht(1,"svg",23),he(2,"path",54),yt()();}}function C_(s,t){if(s&1){let e=Pe();ht(0,"button",45),ie("click",function(){Yt(e);let i=St(2);return qt(i.toggleDemoMode());}),Ke(),ht(1,"svg",23),he(2,"circle",46)(3,"circle",47)(4,"circle",48)(5,"circle",49),yt()(),Ge(6,w_,3,0,"button",50),ti(),ht(7,"button",51),ie("click",function(){Yt(e);let i=St(2);return qt(i.toggleFiltersBar());}),Ke(),ht(8,"svg",23),he(9,"path",52),yt()();}if(s&2){let e=St(2);Ce("active",e.demoMode.active()),Pt(6),re(e.dragAllActive()?-1:6),Pt(),Ce("active",e.filtersBarOpen());}}function A_(s,t){if(s&1){let e=Pe();ht(0,"div",26)(1,"div",27)(2,"div",28)(3,"button",29),ie("click",function(){Yt(e);let i=St();return qt(i.searchActive.set(!i.searchActive()));}),Ke(),ht(4,"svg",23),he(5,"circle",30)(6,"path",31),yt()(),Ge(7,E_,3,2,"div",32),yt(),ti(),ht(8,"button",33),ie("click",function(){Yt(e);let i=St();return qt(i.zoomIn());}),Ke(),ht(9,"svg",23),he(10,"path",34),yt()(),ti(),ht(11,"button",35),ie("click",function(){Yt(e);let i=St();return qt(i.zoomOut());}),Ke(),ht(12,"svg",23),he(13,"path",36),yt()(),ti(),ht(14,"button",37),ie("click",function(){Yt(e);let i=St();return qt(i.resetView());}),Ke(),ht(15,"svg",23),he(16,"path",38)(17,"path",39)(18,"path",40)(19,"path",41),yt()()(),Ge(20,C_,10,5),yt();}if(s&2){let e=St();Ce("sidebar-open",e.sidebarOpen()),Pt(3),Ce("active",e.searchActive()),Pt(4),re(e.searchActive()?7:-1),Pt(13),re(e.isAdmin()?20:-1);}}function P_(s,t){if(s&1&&(ht(0,"span",77),Fe(1,"\u25B2"),yt()),s&2){let e=St(3);Ce("open",e.dragAllControlsOpen());}}function R_(s,t){if(s&1){let e=Pe();ht(0,"span",75),ie("click",function(i){Yt(e);let r=St(2);return qt(r.isAdmin()?r.toggleDragAllControls(i):null);}),Fe(1),Ge(2,P_,2,2,"span",76),yt();}if(s&2){let e=St(2);Ce("admin",e.isAdmin())("breathing",e.dragAllActive()),dr("aria-label","Drag mode active, "+e.dragAllRemainingFormatted()+" remaining"),Pt(),Ps(" ",e.dragAllRemainingFormatted()," "),Pt(),re(e.isAdmin()?2:-1);}}function I_(s,t){if(s&1){let e=Pe();ht(0,"div",78),ie("click",function(i){return Yt(e),qt(i.stopPropagation());}),ht(1,"button",79),ie("click",function(){Yt(e);let i=St(2);return qt(i.adjustDragAllTime(-1));}),Fe(2,"\u22121m"),yt(),ht(3,"button",80),ie("click",function(){Yt(e);let i=St(2);return qt(i.adjustDragAllTime(1));}),Fe(4,"+1m"),yt(),ht(5,"button",81),ie("click",function(){Yt(e);let i=St(2);return qt(i.adjustDragAllTime(5));}),Fe(6,"+5m"),yt(),ht(7,"button",82),ie("click",function(){Yt(e);let i=St(2);return qt(i.disableDragAllMode());}),Ke(),ht(8,"svg",64),he(9,"path",83),yt(),Fe(10," Stop "),yt()();}}function O_(s,t){if(s&1){let e=Pe();ht(0,"div",9)(1,"div",55),he(2,"div",56),ht(3,"div",57)(4,"button",58),ie("click",function(){Yt(e);let i=St();return qt(i.switchToSvgLayout());}),ht(5,"div",59),he(6,"img",60),ht(7,"span",61),Fe(8,"Futures Cone"),yt(),Ge(9,R_,3,7,"span",62),yt()(),ht(10,"button",63),ie("click",function(){Yt(e);let i=St();return qt(i.switchToTsneGridLayout());}),ht(11,"div",59),Ke(),ht(12,"svg",64),he(13,"circle",65)(14,"circle",66)(15,"circle",67)(16,"circle",68)(17,"circle",69)(18,"circle",70)(19,"circle",71),yt(),ti(),ht(20,"span",61),Fe(21,"Topics Map"),yt()()(),ht(22,"button",72),ie("click",function(){Yt(e);let i=St();return qt(i.switchToCirclePackingLayout());}),ht(23,"div",59),he(24,"img",73),ht(25,"span",61),Fe(26,"Author Clusters"),yt()()()(),Ge(27,I_,11,0,"div",74),yt()();}if(s&2){let e=St();Pt(4),Ce("active",e.currentLayout()==="svg"),Pt(5),re(e.dragAllActive()?9:-1),Pt(),Ce("active",e.currentLayout()==="tsne-grid"),Pt(12),Ce("active",e.currentLayout()==="circle-packing"),Pt(5),re(e.dragAllActive()&&e.isAdmin()&&e.dragAllControlsOpen()?27:-1);}}function D_(s,t){if(s&1){let e=Pe();ht(0,"button",84),ie("click",function(){Yt(e);let i=St();return qt(i.onDemoExitTap());}),yt();}}function L_(s,t){if(s&1&&he(0,"app-demo-focus-overlay",11),s&2){let e=St();an("photo",e.demoHighlightedPhoto())("arrived",e.demoMode.focusArrived());}}function F_(s,t){if(s&1){let e=Pe();ht(0,"app-taxonomy-clusters-overlay",85),ie("labelHover",function(i){Yt(e);let r=St();return qt(r.onTaxonomyLabelHover(i));}),yt();}if(s&2){let e=St();an("themeLabels",e.taxonomyThemeLabels())("subThemeLabels",e.taxonomySubThemeLabels())("zoomLevel",e.currentZoomLevel());}}function N_(s,t){if(s&1&&he(0,"app-tsne-clusters-overlay",13),s&2){let e=St();an("labels",e.tsneClusterLabels());}}function U_(s,t){if(s&1&&(ht(0,"div",14),Fe(1),yt()),s&2){let e=St();Pt(),Ps(" ",e.fisheyeTaxonomyFocusLabel()," ");}}var B_=["tsne","tsne-grid","svg","circle-packing"],H_=5,k_="layout_x,layout_y,plausibility,favorable_future,transition_bar_position",hu=class s{constructor(t,e,n,i,r,o){this.route=t;this.changeDetectorRef=e;this.apiService=n;this.http=i;this.platform=r;this.rendererService=o;this.activatedRoute=t,this.photoRepository=new Mr(),ln(()=>{let d=this.searchText();this.photoRepository.getAllPhotos().length>0&&setTimeout(()=>this.applySearchFilter(),50);}),ln(()=>{let d=this.currentFilters();this.isAdmin()&&this.photoRepository&&this.photoRepository.getAllPhotos().length>0&&setTimeout(()=>this.applyFilters(),50);}),this.loop.pipe(Xl(),Re(this.destroyRef)).subscribe(d=>Q(this,null,function*(){let p=d.filter(g=>this.isRejectedItem(g)).map(g=>g?._id).filter(g=>typeof g=="string");for(let g of p)this.loadedPhotoIds.has(g)&&(this.photoRepository.removePhoto(g),this.loadedPhotoIds.delete(g));if(d=d.filter(g=>!this.isRejectedItem(g)),d=d.sort((g,_)=>{let m=typeof g?.created_at=="string"?g.created_at:"",f=typeof _?.created_at=="string"?_.created_at:"";return m.localeCompare(f);}),this.lastCreatedAt==="0"&&d.length>0){let g=d.map(S=>Q(this,null,function*(){let x=S._id,A=S.screenshot_url||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=";S.screenshot_url||console.warn("[SHOWCASE_WS] Missing screenshot_url for item",x,"using placeholder image");let R=this.deriveThumbnailUrl(A),O=this.deriveEnhancedUrl(A),M=da(S),b=S.transition_bar_position||this.getDefaultTransitionBarPosition(zt(zt({},S),M)),w=mn(zt({},S),{id:x,url:R,created_at:S.created_at,screenshot_url:A,thumbnail_url:R,enhanced_url:O,layout_x:S.layout_x,layout_y:S.layout_y,plausibility:M.plausibility,favorable_future:M.favorable_future,transition_bar_position:b,item_key:S._key??S.item_key??S._key});try{yield this.photoRepository.addPhoto(w),this.loadedPhotoIds.add(x);}catch(z){console.error("Error loading photo immediately:",z);}}));yield Promise.all(g),this.searchIndex.clear(),this.resolveUserAuthorId(d),this.qrSmall.set(!0),this.isLoading.set(!1);let _=this.currentLayout()==="tsne"||this.currentLayout()==="tsne-grid";if(this.currentLayout()!=="circle-packing"&&(!this.initialLayoutPreparedBeforeLoad||_))try{switch(this.currentLayout()){case"tsne":yield this.switchToTsneLayout();break;case"tsne-grid":yield this.switchToTsneGridLayout();break;case"svg":yield this.switchToSvgLayout();break;}}catch(S){console.error("Error switching initial layout:",S);}setTimeout(()=>{this.isLayoutLoading.set(!1);},2e3),this.searchText()&&this.applySearchFilter();let f=this.focusItemId();f&&(this.rendererService.setCameraMode("user-controlled"),this.focusOnItem(f,{animateFromFull:!0,fromShowOnMap:!0})),this.autoStartDemoMode&&(this.autoStartDemoMode=!1,this.startDemoMode());let T=d[d.length-1];this.lastCreatedAt=T.created_at,this.lastFetchedAt=this.computeMaxTimestamp(d);}else{let g=d.filter(f=>{let T=f.created_at;return T&&T>this.lastCreatedAt;});if(g.length>0){let f=g.map(T=>Q(this,null,function*(){let S=T._id,C=T.screenshot_url||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=";T.screenshot_url||console.warn("[SHOWCASE_WS] Missing screenshot_url for item",S,"using placeholder image");let A=this.deriveThumbnailUrl(C),R=this.deriveEnhancedUrl(C),O=da(T),M=T.transition_bar_position||this.getDefaultTransitionBarPosition(zt(zt({},T),O)),b=mn(zt({},T),{id:S,url:A,created_at:T.created_at,screenshot_url:C,thumbnail_url:A,enhanced_url:R,plausibility:O.plausibility,favorable_future:O.favorable_future,transition_bar_position:M,item_key:T._key??T.item_key??T._key});try{yield this.photoRepository.addPhoto(b),this.loadedPhotoIds.add(S),this.lastCreatedAt=T.created_at;}catch(w){console.error("Error adding photo to queue:",w);}}));yield Promise.all(f),this.searchIndex.clear();}d.length>0&&(this.lastFetchedAt=this.computeMaxTimestamp(d));let _=["layout_x","layout_y","plausibility","favorable_future","transition_bar_position"],m=!1;for(let f of d){let T=f._id;if(!this.loadedPhotoIds.has(T))continue;let S=this.photoRepository.getPhoto(T);if(!S)continue;let x=zt(zt({},f),da(f)),C={},A=!1;for(let R of _){let O=x[R]??(R==="transition_bar_position"?this.getDefaultTransitionBarPosition(x):void 0);S.metadata[R]!==O&&(C[R]=O,A=!0);}A&&(S.updateMetadata(C),m=!0,(C.layout_x!==void 0||C.layout_y!==void 0)&&this.currentLayout()==="svg"&&this.repositionPhoto(S));}m&&this.searchIndex.clear();}yield this.refreshTsneGridIfChanged(),(yield this.shouldKeepPolling())?setTimeout(()=>{this.getItems(this.lastFetchedAt||void 0).pipe(Re(this.destroyRef)).subscribe(g=>{this.loop.next(g);});},se.API_POLLING_INTERVAL):this.isPollingActive.set(!1);}));let a=this.activatedRoute.snapshot.queryParams;this.workspace.set(a.workspace||"WORKSPACE_NOT_SET"),this.api_key.set(a.api_key||"API_KEY_NOT_SET"),this.admin_key.set(a.admin_key||"ADMIN_KEY_NOT_SET"),this.lang.set(a.lang?a.lang+"/":"");let c=a.key||"";this.userItemKey.set(c);let l=this.admin_key(),h=l!==""&&l!=="ADMIN_KEY_NOT_SET";if(this.photoRepository.setDragEnabled(h),ln(()=>{this.photoRepository.updateDragPermissions(this.dragAllActive(),this.userAuthorId());}),this.platform.browser()){let d=this.parseHashState();d.itemId&&this.focusItemId.set(d.itemId),typeof d.search=="string"&&(this.searchText.set(d.search),this.searchActive.set(d.search.trim().length>0)),d.view&&this.currentLayout.set(d.view);}this.focusItemId()&&this.currentLayout()==="circle-packing"&&(this.currentLayout.set("svg"),this.enableSvgAutoPositioning.set(!0)),this.workspace()!=="WORKSPACE_NOT_SET"&&this.fetchWorkspaceData(),(a.fisheye==="1"||a.fisheye==="true")&&this.fisheyeEnabled.set(!0),this.autoStartDemoMode=a.loop==="true"||a.loop==="1",n.updateFromRoute(this.activatedRoute.snapshot);let u=this.resolveAuthToken();u&&n.api_key.set(u);}container;titleElement;router=ge(ic);destroyRef=ge(Yl);taxonomyService=ge(lc);photoRepository;activatedRoute;loop=new Un();lastCreatedAt="0";lastFetchedAt="";isPollingActive=Ft(!0);nowTargetService=ge(oc);nowVerdict=null;nowCheckedAt=0;tsneGridStrategy=null;qrSmall=Ft(!1);workspace=Ft("");workspaceTitle=Ft("");api_key=Ft("");admin_key=Ft("");lang=Ft("");allowAdditionalContributions=Ft(!0);currentLayout=Ft("circle-packing");demoMode=ge(ha);demoHighlightedPhoto=_e(()=>{let t=this.demoMode.highlightedPhotoId();return t?this.photoRepository.getPhoto(t)??null:null;});fisheyeWasEnabled=!1;autoStartDemoMode=!1;enableSvgAutoPositioning=Ft(!0);fisheyeEnabled=Ft(!1);currentZoomLevel=Ft(1);fisheyeTaxonomyFocusLabel=Ft(null);taxonomyThemeLabels=Ft([]);taxonomySubThemeLabels=Ft([]);currentTsneStrategy=null;tsneClusterLabels=Ft([]);sidebarOpen=Ft(!1);selectedItemId=Ft(null);focusItemId=Ft(null);userItemKey=Ft("");userAuthorId=Ft(null);dragAllUntil=Ft(null);dragAllActive=_e(()=>{let t=this.dragAllUntil();return t?t.getTime()>Date.now():!1;});dragAllRemainingSeconds=Ft(0);dragAllRemainingFormatted=_e(()=>{let t=this.dragAllRemainingSeconds(),e=Math.floor(t/60),n=t%60;return`${e}:${n.toString().padStart(2,"0")}`;});dragAllControlsOpen=Ft(!1);dragModeDefaultLayoutApplied=!1;isApplyingHashState=!1;initialLayoutPreparedBeforeLoad=!1;selectedItemKey=_e(()=>{let t=this.selectedItemId();return t&&this.photoRepository.getPhoto(t)?.metadata?.item_key||null;});isAdmin=_e(()=>this.admin_key()!==""&&this.admin_key()!=="ADMIN_KEY_NOT_SET");canEditSelectedItem=_e(()=>this.isAdmin()||this.selectedItemKey()!==null&&this.selectedItemKey()!=="");filterCounts=_e(()=>{if(!this.photoRepository)return{status:new Map(),author:new Map(),preference:new Map(),potential:new Map(),type:new Map(),topic:new Map()};let t=this.photoRepository.getAllPhotos(),e=new Map(),n=new Map(),i=new Map(),r=new Map(),o=new Map(),a=new Map();return t.forEach(c=>{let l=c.metadata,h=l._private_moderation,u="pending";h===0?u="banned":h===1?u="flagged":h===3?u="not-flagged":h===4?u="approved":h===5&&(u="highlighted"),e.set(u,(e.get(u)||0)+1);let d=l.author_id||"unknown";n.set(d,(n.get(d)||0)+1);let p=l.favorable_future;p&&i.set(p,(i.get(p)||0)+1);let g=l.plausibility;if(g!=null){let f=String(g);r.set(f,(r.get(f)||0)+1);}let _=l.screenshot_type;_&&o.set(_,(o.get(_)||0)+1);let m=l.topics||[];if(m.length===0)a.set("none",(a.get("none")||0)+1);else{let f=new Set();m.forEach(T=>{a.set(T,(a.get(T)||0)+1),f.add(T.split("/")[0]);}),f.forEach(T=>a.set(T,(a.get(T)||0)+1));}}),{status:e,author:n,preference:i,potential:r,type:o,topic:a};});totalPhotoCount=_e(()=>this.photoRepository?this.photoRepository.getAllPhotos().length:0);fisheyeSettings=Ft({enabled:!0,maxMagnification:10,radius:700,maxHeight:50});searchText=Ft("");searchActive=Ft(!1);searchIndex=new Map();filtersBarOpen=Ft(!1);currentFilters=Ft({status:["new","flagged","not-flagged","approved","highlighted","rejected"],author:"all",preference:["prefer","mostly prefer","uncertain","mostly prevent","prevent","none"],potential:["100","75","50","25","0","none"],type:"all",topic:[],search:"",orderBy:"date"});topicInitEffect=ln(()=>{let t=this.taxonomyService.allSubThemeIds();t.length>0&&this.currentFilters().topic.length===0&&this.currentFilters.update(e=>mn(zt({},e),{topic:t}));});resolveAuthToken(){let t=this.admin_key();if(t&&t!=="ADMIN_KEY_NOT_SET")return t;let e=this.api_key();return e&&e!=="API_KEY_NOT_SET"?e:null;}getSearchableText(t){let e=this.searchIndex.get(t.metadata.id);if(e)return e;let n=[],i=o=>{if(o==null)return;let a=typeof o;a==="string"||a==="number"||a==="boolean"?n.push(String(o)):Array.isArray(o)?o.forEach(i):a==="object"&&Object.values(o).forEach(i);};i(t.metadata);let r=n.join(" ").toLowerCase();return this.searchIndex.set(t.metadata.id,r),r;}isLoading=Ft(!0);isLayoutLoading=Ft(!0);viewInitialized=Ft(!1);titleNeedsAnimation=Ft(!1);isDragging=_e(()=>this.rendererService.isDraggingItem());isHoveringItem=_e(()=>this.rendererService.isHoveringItem()());loadedPhotoIds=new Set();layoutChangeInProgress=!1;svgBackgroundStrategy=null;circlePackingForSvg=null;svgCircleRadius=15e3;qrUrl=_e(()=>`https://mapfutur.es/${this.lang()}prescan?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`);isMobile=_e(()=>this.platform.isMobile);startDemoMode(){this.demoMode.active()||(this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.dragAllControlsOpen.set(!1),this.searchActive.set(!1),this.filtersBarOpen.set(!1),this.fisheyeWasEnabled=this.fisheyeEnabled(),this.fisheyeWasEnabled&&this.toggleFisheyeEffect(),this.rendererService.setCameraMode("user-controlled"),this.rendererService.setUserControlEnabled(!1),this.demoMode.start(),this.updateLoopQueryParam(!0));}stopDemoMode(){this.demoMode.active()&&(this.demoMode.stop(),this.rendererService.setUserControlEnabled(!0),this.fisheyeWasEnabled&&(this.toggleFisheyeEffect(),this.fisheyeWasEnabled=!1),this.updateLoopQueryParam(!1));}updateLoopQueryParam(t){if(!this.platform.browser())return;let e=new URL(window.location.href);t?e.searchParams.set("loop","true"):e.searchParams.delete("loop"),e.href!==window.location.href&&window.history.replaceState(window.history.state,"",e.href);}toggleDemoMode(){this.demoMode.active()?this.stopDemoMode():this.startDemoMode();}onDemoExitTap(){this.demoMode.canExitByPointer()&&this.stopDemoMode();}toggleQrSize(){this.qrSmall.set(!this.qrSmall());}enableDragAllMode(t=H_){let e=this.workspace(),n=this.admin_key();if(!e||e==="WORKSPACE_NOT_SET"||!n||n==="ADMIN_KEY_NOT_SET")return;let i=t*60;this.apiService.setTemporaryCollaboration(e,n,i,k_).pipe(Re(this.destroyRef)).subscribe({next:r=>{this.dragAllUntil.set(new Date(Date.now()+r.ttl*1e3));},error:r=>console.error("[DRAG_ALL] Error enabling temporary collaboration:",r)});}disableDragAllMode(){let t=this.workspace(),e=this.admin_key();!t||t==="WORKSPACE_NOT_SET"||!e||e==="ADMIN_KEY_NOT_SET"||this.apiService.deleteTemporaryCollaboration(t,e).pipe(Re(this.destroyRef)).subscribe({next:()=>{this.dragAllUntil.set(null),this.dragAllControlsOpen.set(!1);},error:n=>console.error("[DRAG_ALL] Error disabling temporary collaboration:",n)});}toggleDragAllControls(t){t&&(t.stopPropagation(),t.preventDefault()),this.dragAllControlsOpen.update(e=>!e);}closeDragAllControls(){this.dragAllControlsOpen.set(!1);}adjustDragAllTime(t){let e=this.workspace(),n=this.admin_key();if(!e||e==="WORKSPACE_NOT_SET"||!n||n==="ADMIN_KEY_NOT_SET")return;let i=t*60;this.apiService.setTemporaryCollaboration(e,n,i).pipe(Re(this.destroyRef)).subscribe({next:r=>{r.ttl<=0?(this.dragAllUntil.set(null),this.dragAllControlsOpen.set(!1)):this.dragAllUntil.set(new Date(Date.now()+r.ttl*1e3));},error:r=>console.error("[DRAG_ALL] Error adjusting temporary collaboration:",r)});}toggleFisheyeEffect(){let t=!this.fisheyeEnabled();if(this.fisheyeEnabled.set(t),this.rendererService.resetTaxonomyHoverOpacityFocus(),this.rendererService.enableFisheyeEffect(t),this.syncThematicFisheyeEffects(),t){let e=this.fisheyeSettings();this.rendererService.setFisheyeConfig({magnification:e.maxMagnification,radius:e.radius,maxHeight:e.maxHeight,viewportHeight:window.innerHeight});}}toggleSvgAutoPositioning(){return Q(this,null,function*(){if(this.layoutChangeInProgress){console.warn("[TOGGLE] Layout change in progress, ignoring auto-position toggle");return;}let e=!this.enableSvgAutoPositioning();if(this.enableSvgAutoPositioning.set(e),this.photoRepository.setSvgAutoPositioningEnabled(e),this.currentLayout()==="svg"){this.layoutChangeInProgress=!0;try{yield this.applySvgLayoutMode(e);}finally{this.layoutChangeInProgress=!1;}}});}applySvgLayoutMode(t){return Q(this,null,function*(){if(!this.svgBackgroundStrategy||!this.circlePackingForSvg){console.warn("[SVG] Strategies not initialized; run switchToSvgLayout first");return;}let e=t?this.svgBackgroundStrategy:this.circlePackingForSvg;yield this.photoRepository.setLayoutStrategy(e),this.rendererService.setLayoutStrategyReference(e);});}getDefaultTransitionBarPosition(t){if(t.transition_bar_position)return t.transition_bar_position;let e=["before","during","after"],n=0,i=t._id||"";for(let o=0;o<i.length;o++){let a=i.charCodeAt(o);n=(n<<5)-n+a,n=n&n;}let r=Math.abs(n)%3;return e[r];}deriveThumbnailUrl(t){return t.replace(/screenshot\.jpeg$/,"screenshot.thumbnail.jpeg");}deriveEnhancedUrl(t){return t.replace(/screenshot\.jpeg$/,"screenshot.enhanced.jpeg");}repositionPhoto(t){return Q(this,null,function*(){let e=this.photoRepository.getLayoutStrategy();if(!e)return;let n=this.photoRepository.getAllPhotos(),i=this.enableSvgAutoPositioning(),r=yield e.getPositionForPhoto(t,n,{enableAutoPositioning:i});if(!r||!t.mesh)return;let o={x:r.x,y:r.y,z:0};t.setTargetPosition(o);let a=t.mesh,c=a.position.x-o.x,l=a.position.y-o.y;if(Math.sqrt(c*c+l*l)>1){let h={x:a.position.x,y:a.position.y,z:a.position.z};yield this.rendererService.animateToPosition(a,h,o,.5),t.setCurrentPosition(o);}});}recalculateClusterLayout(t){return Q(this,null,function*(){if(!t)return;let n=this.photoRepository.getAllPhotos().filter(i=>i.metadata.author_id===t);n.length!==0&&(yield Promise.all(n.map(i=>this.repositionPhoto(i))));});}resolveUserAuthorId(t){let e=this.userItemKey();if(!e||this.userAuthorId())return;let n=t.find(i=>i._key&&i._key===e||i.item_key&&i.item_key===e);n?.author_id&&this.userAuthorId.set(n.author_id);}fetchWorkspaceData(){let t=this.workspace();if(!t||t==="WORKSPACE_NOT_SET")return;let e=this.resolveAuthToken()??void 0;this.apiService.fetchWorkspaceRaw(t,e).pipe(Re(this.destroyRef)).subscribe({next:n=>{if(!n)return;let i=n.source||n.title||"";this.workspaceTitle.set(i);let r=n.collaborate!==!1;this.allowAdditionalContributions.set(r);let o=n.temporary_collaboration_ttl;typeof o=="number"&&o>0?(this.dragAllUntil.set(new Date(Date.now()+o*1e3)),this.dragModeDefaultLayoutApplied||(this.dragModeDefaultLayoutApplied=!0,this.currentLayout()!=="svg"&&(this.isLoading()?this.currentLayout.set("svg"):this.switchToSvgLayout()))):(this.dragAllUntil.set(null),this.dragAllControlsOpen.set(!1),this.dragModeDefaultLayoutApplied=!1);}});}shouldKeepPolling(){return Q(this,null,function*(){let t=Date.parse(this.lastFetchedAt);return Number.isNaN(t)||Date.now()-t>se.ITEM_STALE_TIMEOUT?this.isNowWorkspace():!0;});}isNowWorkspace(){return Q(this,null,function*(){if(Date.now()-this.nowCheckedAt>=se.NOW_RECHECK_INTERVAL)try{let t=yield zl(this.nowTargetService.fetch());this.nowVerdict=!!t&&t.workspace_id===this.workspace()&&!rc(t,Date.now()),this.nowCheckedAt=Date.now();}catch(t){console.error("Error checking the /#now target:",t);}return this.nowVerdict??!0;});}refreshTsneGridIfChanged(){return Q(this,null,function*(){let t=this.tsneGridStrategy;!t||this.currentLayout()!=="tsne-grid"||this.layoutChangeInProgress||(yield t.refreshIfChanged())&&(this.tsneGridStrategy!==t||this.currentLayout()!=="tsne-grid"||(yield this.photoRepository.refreshLayout(),this.updateTsneClusterLabels(t)));});}getItems(t){let e={},n=this.resolveAuthToken();n&&(e.headers={Authorization:n});let i=`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`;return t&&(i+=`&filters=${encodeURIComponent("updated_at>"+t)}`),this.http.get(i,e).pipe(Wl(r=>(console.error("Error loading items:",r),kl([]))));}computeMaxTimestamp(t){let e=this.lastFetchedAt;for(let n of t){let i=n?.created_at,r=n?.updated_at;typeof i=="string"&&i>e&&(e=i),typeof r=="string"&&r>e&&(e=r);}return e;}isRejectedItem(t){return!t||typeof t!="object"?!1:t._private_moderation===0?!0:(typeof t.status=="string"?t.status.toLowerCase().trim():"")==="rejected";}ngAfterViewInit(){return Q(this,null,function*(){this.taxonomyService.fetch(),this.platform.browser()&&(gn(window,"message").pipe(Re(this.destroyRef)).subscribe(t=>{let e=t.data;if(!(!e||typeof e!="object")&&e.type==="show-on-map"){let n=typeof e.itemId=="string"?e.itemId:null;if(!n)return;this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.focusOnItem(n,{animateFromFull:!0,fromShowOnMap:!0});}}),gn(window,"hashchange").pipe(Re(this.destroyRef)).subscribe(()=>this.applyHashStateFromUrl()),gn(window,"resize").pipe(Re(this.destroyRef)).subscribe(()=>this.measureTitle()),gn(window,"keydown").pipe(Re(this.destroyRef)).subscribe(t=>this.onKeyDown(t)),this.measureTitle(),yield this.initialize(this.container.nativeElement),this.viewInitialized.set(!0));});}onKeyDown(t){if(t.key==="Escape"&&this.demoMode.active()){t.preventDefault(),this.stopDemoMode();return;}if(t.key==="p"||t.key==="P"){let e=this.rendererService.getPerformanceMetrics();this.rendererService.enablePerformanceMonitoring(!e.isMonitoring);}}measureTitle(){this.titleElement&&setTimeout(()=>{let t=this.titleElement?.nativeElement;if(t){let e=t.scrollWidth>t.clientWidth;this.titleNeedsAnimation.set(e);}},0);}initialize(t){return Q(this,null,function*(){yield this.rendererService.initialize(t,{photoWidth:Nt.PHOTO_WIDTH,photoHeight:Nt.PHOTO_HEIGHT}),this.rendererService.setPhotoClickCallback(r=>{this.onPhotoClick(r);}),this.rendererService.setBackgroundClickCallback(()=>{this.onBackgroundClick();});let e=this.fisheyeSettings();this.fisheyeEnabled.set(e.enabled),e.enabled&&(this.rendererService.enableFisheyeEffect(!0),this.syncThematicFisheyeEffects(),this.rendererService.setFisheyeConfig({magnification:e.maxMagnification,radius:e.radius,maxHeight:e.maxHeight,viewportHeight:window.innerHeight}));let n=this.activatedRoute.snapshot.queryParams;if((n.fisheye==="0"||n.fisheye==="false")&&(this.rendererService.enableFisheyeEffect(!1),this.syncThematicFisheyeEffects()),(n.perf==="1"||n.perf==="true")&&this.rendererService.enablePerformanceMonitoring(!0),n.fisheye_radius){let r=parseFloat(n.fisheye_radius);isNaN(r)||this.rendererService.setFisheyeConfig({radius:r});}if(n.fisheye_magnification){let r=parseFloat(n.fisheye_magnification);isNaN(r)||this.rendererService.setFisheyeConfig({magnification:r});}if(n.fisheye_distortion){let r=parseFloat(n.fisheye_distortion);isNaN(r)||this.rendererService.setFisheyeConfig({distortion:r});}let i=new ni({photoWidth:Nt.PHOTO_WIDTH,photoHeight:Nt.PHOTO_HEIGHT,spacingX:Nt.SPACING_X,spacingY:Nt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()});if(yield this.photoRepository.initialize(i,this.rendererService),this.demoMode.attach(this.photoRepository),this.photoRepository.photoAdded$.pipe(Re(this.destroyRef)).subscribe(r=>{this.demoMode.enqueueNewPhoto(r.id);}),this.photoRepository.photoRemoved$.pipe(Re(this.destroyRef)).subscribe(r=>{}),this.photoRepository.layoutChanged$.pipe(Re(this.destroyRef)).subscribe(()=>{}),ur(500).pipe(Re(this.destroyRef)).subscribe(()=>{this.currentZoomLevel.set(this.rendererService.getCurrentZoomLevel()),this.syncThematicFisheyeEffects(),this.updateFisheyeTaxonomyFocusLabel();}),ur(1e3).pipe(Re(this.destroyRef)).subscribe(()=>{let r=this.dragAllUntil();if(r){let o=Math.max(0,Math.ceil((r.getTime()-Date.now())/1e3));this.dragAllRemainingSeconds.set(o),o===0&&this.dragAllUntil.set(null);}}),ur(se.API_POLLING_INTERVAL).pipe(Gl(()=>this.isPollingActive()),Re(this.destroyRef)).subscribe(()=>{this.workspace()!=="WORKSPACE_NOT_SET"&&this.fetchWorkspaceData();}),this.platform.browser()){if(this.currentLayout()!=="circle-packing")try{this.currentLayout()==="tsne"?yield this.switchToTsneLayout():this.currentLayout()==="tsne-grid"?yield this.switchToTsneGridLayout():this.currentLayout()==="svg"&&(yield this.switchToSvgLayout()),this.initialLayoutPreparedBeforeLoad=!0;}catch(r){console.error("Error preparing initial layout before load:",r),this.initialLayoutPreparedBeforeLoad=!1;}Vl(se.INITIAL_POLLING_DELAY).pipe(Re(this.destroyRef)).subscribe(()=>{this.getItems().pipe(Re(this.destroyRef)).subscribe(r=>{this.loop.next(r);});});}});}updateFisheyeTaxonomyFocusLabel(){if(this.currentLayout()!=="tsne"||!this.fisheyeEnabled()){this.fisheyeTaxonomyFocusLabel.set(null);return;}let t=this.rendererService.getTopFisheyeTaxonomyIds();if(!t){this.fisheyeTaxonomyFocusLabel.set(null);return;}let e=t.topicId?this.taxonomyService.resolveTopic(t.topicId):t.themeId?this.taxonomyService.resolveThemeName(t.themeId):null;this.fisheyeTaxonomyFocusLabel.set(e??null);}syncThematicFisheyeEffects(){this.rendererService.setThematicFisheyeEffectsEnabled(this.currentLayout()==="tsne"&&this.fisheyeEnabled());}switchToTsneLayout(){return Q(this,null,function*(){if(!this.layoutChangeInProgress){if(!this.workspace()){console.error("Workspace not set");return;}this.layoutChangeInProgress=!0;try{this.currentLayout.set("tsne"),this.updateHashState({view:"tsne"}),this.syncThematicFisheyeEffects(),this.clearTsneGridState();let t=new vr({photoWidth:Nt.PHOTO_WIDTH,photoHeight:Nt.PHOTO_HEIGHT,spacingX:Nt.SPACING_X,spacingY:Nt.SPACING_Y});yield t.initialize(),this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),yield this.photoRepository.setLayoutStrategy(t),this.currentTsneStrategy=t,this.computeTaxonomyLabels(t);}catch(t){console.error("Error switching to TSNE layout:",t);}finally{this.layoutChangeInProgress=!1;}}});}switchToTsneGridLayout(){return Q(this,null,function*(){if(!this.layoutChangeInProgress){if(!this.workspace()){console.error("Workspace not set");return;}this.layoutChangeInProgress=!0;try{this.currentLayout.set("tsne-grid"),this.updateHashState({view:"tsne-grid"}),this.syncThematicFisheyeEffects(),this.clearTaxonomyOverlayState();let t=new br(this.workspace(),void 0,{photoWidth:Nt.PHOTO_WIDTH,photoHeight:Nt.PHOTO_HEIGHT,spacingX:Nt.SPACING_X,spacingY:Nt.SPACING_Y});yield t.initialize(),this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),this.rendererService.setLayoutRotationOverrideEnabled(!0),yield this.photoRepository.setLayoutStrategy(t),this.tsneGridStrategy=t,this.updateTsneClusterLabels(t);}catch(t){console.error("Error switching to TSNE layout:",t);}finally{this.layoutChangeInProgress=!1;}}});}updateTsneClusterLabels(t){this.tsneClusterLabels.set(t.getClustersWithWorldCoords().map((e,n)=>({id:`tsne-cluster-${n}`,name:this.taxonomyService.localizeName(e.title),worldX:e.centerX,worldY:e.centerY,worldWidth:e.width,rotationDeg:e.averageRotation})));}clearTsneGridState(){this.tsneGridStrategy=null,this.tsneClusterLabels.set([]),this.rendererService.setLayoutRotationOverrideEnabled(!1);}clearTaxonomyOverlayState(){this.currentTsneStrategy=null,this.taxonomyThemeLabels.set([]),this.taxonomySubThemeLabels.set([]),this.rendererService.resetTaxonomyHoverOpacityFocus();}computeTaxonomyLabels(t){let e=t.getSubThemeLabelNodes().map(i=>{let r=this.taxonomyService.resolveTopic(i.id),o=r.includes(">")&&r.split(">").pop()?.trim()||r;return{id:i.id,name:o,worldX:i.worldX,worldY:i.worldY,itemCount:i.itemCount};});e.length===0&&(e=t.getClustersWithWorldCoords().map((r,o)=>({id:`cluster-${o}`,name:this.taxonomyService.localizeName(r.title),worldX:r.centerX,worldY:r.centerY,itemCount:1}))),this.taxonomySubThemeLabels.set(e);let n=t.getThemeLabelNodes().map(i=>({id:i.id,name:this.taxonomyService.resolveThemeName(i.id),worldX:i.worldX,worldY:i.worldY,itemCount:i.itemCount}));this.taxonomyThemeLabels.set(n);}onTaxonomyLabelHover(t){if(!t||this.currentLayout()!=="tsne"){this.rendererService.resetTaxonomyHoverOpacityFocus();return;}if(t.level==="sub-theme"){this.rendererService.setTaxonomyHoverOpacityFocus({topicId:t.id});return;}this.rendererService.setTaxonomyHoverOpacityFocus({themeId:t.id});}switchToSvgLayout(){return Q(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("svg"),this.updateHashState({view:"svg"}),this.syncThematicFisheyeEffects(),this.clearTaxonomyOverlayState(),this.clearTsneGridState();let e=this.activatedRoute.snapshot.queryParams.svg||"/showcase-bg.svg",n=-this.svgCircleRadius*1.6,i=0;this.svgBackgroundStrategy=new xr({svgPath:e,centerX:0,centerY:0,circleRadius:this.svgCircleRadius,radiusVariation:0,svgOffsetX:n,svgOffsetY:i}),yield this.svgBackgroundStrategy.initialize(),this.circlePackingForSvg=new ni({photoWidth:Nt.PHOTO_WIDTH,photoHeight:Nt.PHOTO_HEIGHT,spacingX:Nt.SPACING_X,spacingY:Nt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()}),this.rendererService.setDragCompleteCallback((h,u)=>Q(this,[h,u],function*(o,{position:a,isOutOfBounds:c,hotspotData:l}){let d=this.photoRepository.getPhotoById(o);if(!d){console.warn("[DRAG] Photo not found:",o);return;}let p=d.metadata.author_id,g={layout_x:d.metadata.layout_x,layout_y:d.metadata.layout_y};l&&Object.keys(l).forEach(w=>{g[w]=d.metadata[w];});let _={};if(c)d.updateMetadata({layout_x:void 0,layout_y:void 0}),_.layout_x=null,_.layout_y=null;else{let{layout_x:w,layout_y:z}=this.svgBackgroundStrategy.worldToNormalized(a.x,a.y);d.updateMetadata({layout_x:w,layout_y:z}),_.layout_x=w,_.layout_y=z,l&&(d.updateMetadata(l),Object.assign(_,l));}let m=this.workspace(),f=this.admin_key(),T=this.api_key(),S=d.metadata.item_key,x=this.userItemKey(),C=f&&f!=="ADMIN_KEY_NOT_SET",A=T&&T!=="API_KEY_NOT_SET",R=this.dragAllActive(),O=!C&&!R&&(S||x)||void 0,M=m&&m!=="WORKSPACE_NOT_SET"&&(C||A||!!O),b=!1;if(M)try{yield new Promise((w,z)=>{this.apiService.updateProperties(_,o,O).subscribe({next:()=>w(),error:H=>{console.error("[DRAG] Error saving to API:",H),z(H);}});}),b=!0;}catch(w){console.error("[DRAG] Error saving to API:",w);}if(!b){M||console.warn("[DRAG] Skipping save due to missing authorization context",{hasAdminKey:C,hasApiKey:A,hasItemKey:!!O}),d.updateMetadata(g);let w=g.layout_x,z=g.layout_y;if(this.svgBackgroundStrategy&&typeof w=="number"&&typeof z=="number"){let H=this.svgBackgroundStrategy.normalizedToWorld(w,z),X={x:H.x,y:H.y,z:0};d.setTargetPosition(X),d.setCurrentPosition(X),d.mesh&&d.mesh.position.set(X.x,X.y,X.z);}else yield this.repositionPhoto(d);return;}if(this.currentLayout()!=="svg"){yield this.recalculateClusterLayout(p);let w=d.metadata.author_id;w&&w!==p&&(yield this.recalculateClusterLayout(w));}c&&(yield this.repositionPhoto(d));}));let r=this.svgBackgroundStrategy.getSvgElement();r?(this.rendererService.setSvgBackground(r,{scale:1,offsetX:n,offsetY:0,radius:this.svgCircleRadius,desiredOpacity:1}),this.rendererService.setLayoutStrategyReference(this.svgBackgroundStrategy)):console.warn("\u274C SVG element is null, cannot set background"),this.photoRepository.setSvgVisible(!0,this.svgBackgroundStrategy),this.photoRepository.setSvgAutoPositioningEnabled(this.enableSvgAutoPositioning()),yield this.applySvgLayoutMode(this.enableSvgAutoPositioning());}catch(t){console.error("Error switching to SVG layout:",t);}finally{this.layoutChangeInProgress=!1;}}});}switchToCirclePackingLayout(){return Q(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("circle-packing"),this.updateHashState({view:"circle-packing"}),this.syncThematicFisheyeEffects(),this.clearTaxonomyOverlayState(),this.clearTsneGridState();let t=new ni({photoWidth:Nt.PHOTO_WIDTH,photoHeight:Nt.PHOTO_HEIGHT,spacingX:Nt.SPACING_X,spacingY:Nt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()});this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),yield this.photoRepository.setLayoutStrategy(t);}catch(t){console.error("Error switching to Circle Packing layout:",t);}finally{this.layoutChangeInProgress=!1;}}});}getLayoutIndicatorTransform(){return`translateX(${(this.currentLayout()==="svg"?0:1)*108}px)`;}resetView(){this.rendererService.resetCameraView(!0);}zoomIn(){this.rendererService.zoomAtCenter(.65);}zoomOut(){this.rendererService.zoomAtCenter(1.5);}onSearchInput(t){let e=t.target;this.searchText.set(e.value);}clearSearch(){this.searchText.set(""),this.searchActive.set(!1);}updateSearchHash(){let t=this.searchText();this.updateHashState({search:t||null});}applySearchFilter(){let t=this.searchText().toLowerCase().trim(),e=this.photoRepository.getAllPhotos();if(this.updateSearchHash(),!t){let r=0;this.searchIndex.clear(),e.forEach(o=>{this.rendererService.setPhotoOpacity(o.metadata.id,1),this.rendererService.setPhotoZIndex(o.metadata.id,0),r++;});return;}let n=0,i=0;e.forEach(r=>{this.getSearchableText(r).includes(t)?(this.rendererService.setPhotoOpacity(r.metadata.id,1),this.rendererService.setPhotoZIndex(r.metadata.id,100),n++):(this.rendererService.setPhotoOpacity(r.metadata.id,.2),this.rendererService.setPhotoZIndex(r.metadata.id,-100),i++);});}goBack(){this.router.navigate(["/"],{queryParamsHandling:"preserve"});}toggleFiltersBar(){this.filtersBarOpen.set(!this.filtersBarOpen());}onFiltersChange(t){this.currentFilters.set(t);}applyFilters(){if(!this.photoRepository)return;if(!this.isAdmin()){this.photoRepository.getAllPhotos().forEach(i=>{this.rendererService.setPhotoOpacity(i.metadata.id,1),this.rendererService.setPhotoZIndex(i.metadata.id,0);});return;}let t=this.currentFilters();this.photoRepository.getAllPhotos().forEach(n=>{if(!n.mesh)return;this.photoMatchesFilters(n,t)?(this.rendererService.setPhotoOpacity(n.metadata.id,1),this.rendererService.setPhotoZIndex(n.metadata.id,0)):(this.rendererService.setPhotoOpacity(n.metadata.id,.2),this.rendererService.setPhotoZIndex(n.metadata.id,-100));});}photoMatchesFilters(t,e){let n=t.metadata;if(e.status.length>0&&e.status.length<6){let i=n._private_moderation;if(!this.matchesStatusFilter(i,e.status))return!1;}if(e.author!=="all"&&n.author_id!==e.author)return!1;if(e.preference.length>0&&e.preference.length<6){let i=n.favorable_future||n._svgZoneFavorableFuture;if(!this.matchesPreferenceFilter(i,e.preference))return!1;}if(e.potential.length>0&&e.potential.length<6){let i=n.plausibility;if(!this.matchesPotentialFilter(i,e.potential))return!1;}if(e.type!=="all"&&n.screenshot_type!==e.type)return!1;if(e.topic&&e.topic.length>0){let i=n.topics||[];if(i.length>0&&!i.some(o=>e.topic.includes(o)))return!1;}return!(e.search&&!this.getSearchableText(t).includes(e.search.toLowerCase().trim()));}matchesStatusFilter(t,e){if(e.length===0)return!0;let n={new:2,flagged:1,"not-flagged":3,approved:4,highlighted:5,rejected:0};for(let i of e){let r=n[i];if(r!=null){if(i==="new"){if(t==null||t===2)return!0;}else if(t===r)return!0;}}return!1;}matchesPreferenceFilter(t,e){if(e.length===0||e.length===6)return!0;if(!t)return e.includes("none");let n=t.toLowerCase().trim(),r={prefer:"prefer",favor:"prefer",favorable:"prefer",preferred:"prefer","mostly prefer":"mostly prefer",uncertain:"uncertain","mostly prevent":"mostly prevent",prevent:"prevent",unfavorable:"prevent"}[n];return r?e.includes(r):!1;}matchesPotentialFilter(t,e){if(e.length===0||e.length===6)return!0;if(typeof t!="number"||!isFinite(t))return e.includes("none");let n;return t>=90?n="100":t>=70?n="75":t>=40?n="50":t>=10?n="25":n="0",e.includes(n);}onSettingsChange(t){this.fisheyeSettings.set(t),this.fisheyeEnabled.set(t.enabled),this.rendererService.enableFisheyeEffect(t.enabled),this.syncThematicFisheyeEffects(),this.rendererService.setFisheyeConfig({magnification:t.maxMagnification,radius:t.radius,maxHeight:t.maxHeight,viewportHeight:window.innerHeight});}onPhotoClick(t){this.updateHashState({itemId:t}),this.updateActiveItemZIndex(),this.isAdmin()?(this.selectedItemId.set(t),this.sidebarOpen.set(!0)):this.focusOnItem(t,{animateFromFull:!0,fromShowOnMap:!0});}focusOnItem(t,e){return Q(this,null,function*(){this.rendererService.setPermalinkTarget(t),this.rendererService.setCameraMode("user-controlled");let n=0;for(;n<this.MAX_FOCUS_ATTEMPTS;){let i=this.photoRepository.getPhoto(t);if(i&&i.mesh&&i.animationState==="positioned"){let r=i.mesh.position,o=e?.animateFromFull===!0;if(o&&e?.fromShowOnMap)yield this.rendererService.focusOnItemFromShowOnMap(r.x,r.y,i);else if(o){this.rendererService.setCameraMode("user-controlled");let a=this.rendererService.getCurrentBounds(),c=this.rendererService.computeFitZWithMargin(a,Math.PI*45/180,window.innerWidth/window.innerHeight,300);yield this.rendererService.focusOnPositionAnimated(r.x,r.y,c,1);let l=c*.5;yield this.rendererService.focusOnPositionAnimated(r.x,r.y,l,2);}else this.rendererService.focusOnPosition(r.x,r.y,this.DEFAULT_FOCUS_ZOOM);return;}yield new Promise(r=>setTimeout(r,this.FOCUS_RETRY_DELAY_MS)),n++;}console.warn("[SHOWCASE_WS] Could not find photo to focus on:",t);});}updateActiveItemZIndex(){let t=this.parseHashState().itemId??null;if(t){let e=this.photoRepository.getPhoto(t);e&&e.mesh&&(e.mesh.renderOrder=100);}else this.resetAllItemsZIndex();}resetAllItemsZIndex(){let t=this.photoRepository.getAllPhotos?.();t&&t.forEach(e=>{e.mesh&&(e.mesh.renderOrder=0);});}canEdit=_e(()=>this.isAdmin());MAX_FOCUS_ATTEMPTS=50;FOCUS_RETRY_DELAY_MS=100;DEFAULT_FOCUS_ZOOM=800;onBackgroundClick(){this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.updateHashState({itemId:null}),this.resetAllItemsZIndex();}onSidebarClose(){this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.updateHashState({itemId:null}),this.resetAllItemsZIndex();}parseHashState(){if(!this.platform.browser())return{};let t=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;if(!t)return{};if(!t.includes("=")){let a=this.normalizeLayout(t);return a?{view:a}:{itemId:t};}let e=new URLSearchParams(t),n=e.get("view")??e.get("layout"),i=this.normalizeLayout(n),r=e.get("item")??void 0,o=e.get("search")??void 0;return{view:i??void 0,itemId:r,search:o};}normalizeLayout(t){return t&&B_.includes(t)?t:null;}updateHashState(t){if(!this.platform.browser()||this.isApplyingHashState)return;let e=this.parseHashState(),n=new URLSearchParams(),i=t.view===void 0?e.view??this.currentLayout():t.view,r=t.itemId===void 0?e.itemId??null:t.itemId,o=t.search===void 0?e.search??null:t.search;i&&n.set("view",i),r&&r.trim().length>0&&n.set("item",r),o&&o.trim().length>0&&n.set("search",o);let a=n.toString(),c=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;a!==c&&(this.isApplyingHashState=!0,window.location.hash=a,this.isApplyingHashState=!1);}applyHashStateFromUrl(){if(!this.platform.browser()||this.isApplyingHashState)return;let t=this.parseHashState();typeof t.search=="string"&&t.search!==this.searchText()&&(this.searchText.set(t.search),this.searchActive.set(t.search.trim().length>0));let e=t.itemId??null;e!==this.focusItemId()&&this.focusItemId.set(e),t.view&&t.view!==this.currentLayout()&&(t.view==="tsne"?this.switchToTsneLayout():t.view==="tsne-grid"?this.switchToTsneGridLayout():t.view==="svg"?this.switchToSvgLayout():this.switchToCirclePackingLayout()),this.updateActiveItemZIndex();}onMetadataUpdated(t){return Q(this,null,function*(){let{itemId:e,metadata:n}=t,i=this.photoRepository.getPhoto(e);if(i&&(i.updateMetadata(n),this.currentLayout()==="svg"&&this.enableSvgAutoPositioning())){let r=i.metadata.author_id;r&&(yield this.recalculateClusterLayout(r));}});}ngOnDestroy(){this.demoMode.stop(),this.demoMode.detach(),this.rendererService.dispose();}static ɵfac=function(e){return new(e||s)(Sn(nc),Sn(Ql),Sn(sc),Sn(tc),Sn(ei),Sn(pn));};static ɵcmp=on({type:s,selectors:[["app-showcase-ws"]],viewQuery:function(e,n){if(e&1&&(ws(m_,7),ws(g_,5)),e&2){let i;Cs(i=As())&&(n.container=i.first),Cs(i=As())&&(n.titleElement=i.first);}},decls:15,vars:19,consts:[["container",""],["titleElement",""],[1,"container"],[1,"preloader"],[1,"hide-on-mobile","qr-clickable",3,"small","url"],[3,"isOpen","itemId","itemKey","workspaceId","apiKey","adminKey","lang"],[1,"filters-bar-container",3,"open"],[1,"workspace-title",3,"needs-animation"],[1,"zoom-controls",3,"sidebar-open"],[1,"layout-toggle-centered"],["type","button","aria-label","Exit demo mode",1,"demo-exit-layer"],[3,"photo","arrived"],[3,"themeLabels","subThemeLabels","zoomLevel"],[3,"labels"],["aria-live","polite",1,"fisheye-taxonomy-focus-label"],[1,"spinner"],[1,"hide-on-mobile","qr-clickable",3,"click","small","url"],[3,"close","metadataUpdated","isOpen","itemId","itemKey","workspaceId","apiKey","adminKey","lang"],[1,"filters-bar-container"],[3,"filtersChange","filtersCommit","counts","totalCount","filteredCount","showViewToggle","showOrderBy","initialState","topicTree"],["href","/","title","Back to Home",1,"logo-link","hide-on-mobile"],["src","/futures-map-logo.svg","alt","Futures Map",1,"logo-icon"],["title","Back to Home",1,"home-button","show-on-mobile",3,"click"],["viewBox","0 0 24 24",1,"button-icon"],["d","M11 20V7.83L5.41 13 4 11.59 12 3l8 8-1.41 1.41L13 7.83V20z","fill","currentColor"],[1,"workspace-title"],[1,"zoom-controls"],[1,"zoom-buttons"],[1,"search-section"],["title","Search",1,"zoom-button",3,"click"],["cx","11","cy","11","r","8","stroke","currentColor","stroke-width","2","fill","none"],["d","M21 21l-4.35-4.35","stroke","currentColor","stroke-width","2","stroke-linecap","round"],[1,"search-input-container"],["title","Zoom In (+)",1,"zoom-button","hide-on-mobile",3,"click"],["d","M12 5v14M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Zoom Out (-)",1,"zoom-button","hide-on-mobile",3,"click"],["d","M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Reset View (R)",1,"zoom-button",3,"click"],["d","M2 2l4 0 0 2 -2 0 0 2 -2 0 0 -4","fill","currentColor"],["d","M22 2l-4 0 0 2 2 0 0 2 2 0 0 -4","fill","currentColor"],["d","M2 22l4 0 0 -2 -2 0 0 -2 -2 0 0 4","fill","currentColor"],["d","M22 22l-4 0 0 -2 2 0 0 -2 2 0 0 4","fill","currentColor"],["type","text","placeholder","Search...",1,"search-input",3,"input","keydown.escape","value"],["title","Clear search",1,"search-clear"],["title","Clear search",1,"search-clear",3,"click"],["title","Start demo mode (Escape or tap to exit)",1,"showcase-toggle","hide-on-mobile",3,"click"],["cx","12","cy","8","r","2","fill","currentColor"],["cx","12","cy","16","r","2","fill","currentColor"],["cx","6","cy","12","r","2","fill","currentColor"],["cx","18","cy","12","r","2","fill","currentColor"],["title","Enable participant drag mode (15 min)",1,"drag-all-toggle","hide-on-mobile"],["title","Toggle Filters",1,"filter-toggle","hide-on-mobile",3,"click"],["d","M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04c-.83 0-1.3.95-.79 1.61z","fill","currentColor"],["title","Enable participant drag mode (15 min)",1,"drag-all-toggle","hide-on-mobile",3,"click"],["d","M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z","fill","currentColor"],[1,"layout-toggle"],[1,"toggle-background"],[1,"toggle-buttons"],["title","Futures Cone",1,"toggle-button","map-button",3,"click"],[1,"button-content"],["src","/icon-cone.svg","alt","",1,"button-icon"],[1,"button-label"],["role","status","aria-live","polite",1,"map-drag-counter",3,"admin","breathing"],["title","Topics Map",1,"toggle-button","tsne-button",3,"click"],["viewBox","0 0 24 24","aria-hidden","true",1,"button-icon"],["cx","6","cy","7","r","1.8","fill","currentColor"],["cx","11","cy","4.5","r","1.8","fill","currentColor"],["cx","9","cy","12","r","1.8","fill","currentColor"],["cx","16","cy","9","r","1.8","fill","currentColor"],["cx","5","cy","17","r","1.8","fill","currentColor"],["cx","13","cy","18","r","1.8","fill","currentColor"],["cx","19","cy","15","r","1.8","fill","currentColor"],["title","Author Clusters",1,"toggle-button","clusters-button",3,"click"],["src","/icon-clusters.svg","alt","",1,"button-icon"],["role","group","aria-label","Drag mode controls",1,"drag-all-controls-popup"],["role","status","aria-live","polite",1,"map-drag-counter",3,"click"],["aria-hidden","true",1,"counter-caret",3,"open"],["aria-hidden","true",1,"counter-caret"],["role","group","aria-label","Drag mode controls",1,"drag-all-controls-popup",3,"click"],["title","Remove 1 minute","aria-label","Remove 1 minute",1,"drag-time-btn",3,"click"],["title","Add 1 minute","aria-label","Add 1 minute",1,"drag-time-btn",3,"click"],["title","Add 5 minutes","aria-label","Add 5 minutes",1,"drag-time-btn",3,"click"],["title","Stop drag mode","aria-label","Stop drag mode",1,"drag-stop-btn",3,"click"],["d","M6 6h12v12H6z","fill","currentColor"],["type","button","aria-label","Exit demo mode",1,"demo-exit-layer",3,"click"],[3,"labelHover","themeLabels","subThemeLabels","zoomLevel"]],template:function(e,n){e&1&&(he(0,"div",2,0),Ge(2,__,2,0,"div",3)(3,y_,1,2,"app-qrcode",4)(4,v_,1,7,"app-evaluation-sidebar",5)(5,x_,2,9,"div",6)(6,b_,5,0)(7,S_,4,4,"div",7)(8,A_,21,6,"div",8)(9,O_,28,8,"div",9)(10,D_,1,0,"button",10)(11,L_,1,2,"app-demo-focus-overlay",11)(12,F_,1,3,"app-taxonomy-clusters-overlay",12)(13,N_,1,1,"app-tsne-clusters-overlay",13)(14,U_,2,1,"div",14)),e&2&&(Ce("dragging",n.isDragging())("hovering",n.isHoveringItem())("demo-mode",n.demoMode.active()),Pt(2),re(n.isLayoutLoading()?2:-1),Pt(),re(n.allowAdditionalContributions()?3:-1),Pt(),re(n.demoMode.active()?-1:4),Pt(),re(n.isAdmin()&&!n.isLoading()&&n.viewInitialized()&&!n.demoMode.active()?5:-1),Pt(),re(n.demoMode.active()?-1:6),Pt(),re(n.workspaceTitle()?7:-1),Pt(),re(n.demoMode.active()?-1:8),Pt(),re(n.demoMode.active()?-1:9),Pt(),re(n.demoMode.active()?10:-1),Pt(),re(n.demoMode.active()?11:-1),Pt(),re(n.currentLayout()==="tsne"?12:-1),Pt(),re(n.currentLayout()==="tsne-grid"?13:-1),Pt(),re(n.currentLayout()==="tsne"&&n.fisheyeEnabled()&&n.fisheyeTaxonomyFocusLabel()?14:-1));},dependencies:[pr,mr,ac,fa,pa,ma],styles:[`

.font-sans[_ngcontent-%COMP%] {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
}
.background-image[_ngcontent-%COMP%] {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.message[_ngcontent-%COMP%] {
  font-size: 18px;
  padding: 16px 24px;
  max-width: calc(100% - 32px);
  transition: border-radius 0.3s ease-in-out;
  z-index: 1;
}
.message[_ngcontent-%COMP%]     * {
  margin: 0;
}
.message[_ngcontent-%COMP%]     * a {
  color: inherit;
}
.message.ai[_ngcontent-%COMP%] {
  background-color: #E7CBFF;
  color: #4E02B2;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  border-radius: 32px 32px 32px 2px;
  align-self: flex-start;
  animation: _ngcontent-%COMP%_fadeInLeft 0.08s ease-out;
}
.message.human[_ngcontent-%COMP%] {
  background-color: #4E02B2;
  color: #FFFFFF;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  border-radius: 32px 32px 2px 32px;
  align-self: flex-end;
  animation: _ngcontent-%COMP%_fadeInRight 0.08s ease-out;
  margin-bottom: 4px;
}
.message.part[_ngcontent-%COMP%] {
  border-radius: 32px;
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
  gap: 4px;
}
.buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]    > .button[_ngcontent-%COMP%] {
  flex: 1 1 auto;
}
.buttons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {
  height: 52px;
  padding: 0px 8px;
  display: flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  font-size: 16px;
  line-height: normal;
  font-weight: 400;
  border: 1px solid #E7CBFF;
  background: #FBF5F6;
  color: #4E02B2;
  cursor: pointer;
}
.buttons[_ngcontent-%COMP%]   .button.primary[_ngcontent-%COMP%] {
  border: 1px solid #4E02B2;
  background: #4E02B2;
  color: #FFFFFF;
  font-weight: 700;
}
.buttons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
@keyframes _ngcontent-%COMP%_fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInUp2 {
  from {
    transform: translateY(200%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes _ngcontent-%COMP%_slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
[_nghost-%COMP%] {
  --showcase-font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: auto;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #FFFDF6;
  cursor: default;
  touch-action: none;
  pointer-events: auto;
}
[_nghost-%COMP%]   .container.hovering[_ngcontent-%COMP%] {
  cursor: grab;
}
[_nghost-%COMP%]   .container.hovering.dragging[_ngcontent-%COMP%] {
  cursor: grabbing;
}
[_nghost-%COMP%]   .container.fisheye-above-labels[_ngcontent-%COMP%] {
  z-index: 60;
}
[_nghost-%COMP%]   .container.demo-mode[_ngcontent-%COMP%] {
  cursor: none;
}
[_nghost-%COMP%]   .demo-exit-layer[_ngcontent-%COMP%] {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: none;
  z-index: 2500;
}
[_nghost-%COMP%]   .demo-exit-layer[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #4E02B2;
  outline-offset: -4px;
}
[_nghost-%COMP%]   .fisheye-taxonomy-focus-label[_ngcontent-%COMP%] {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: max(16px, env(safe-area-inset-bottom));
  max-width: min(52vw, 540px);
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(255, 253, 246, 0.88);
  border: 1px solid rgba(78, 2, 178, 0.22);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
  color: #4E02B2;
  font-family: var(--showcase-font-family);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.01em;
  z-index: 120;
  pointer-events: none;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
[_nghost-%COMP%]   .preloader[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  z-index: 2000;
  pointer-events: none;
}
[_nghost-%COMP%]   .preloader[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(78, 2, 178, 0.2);
  border-top: 4px solid #4E02B2;
  border-right: 4px solid #4E02B2;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 1s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
[_nghost-%COMP%]   .logo-link[_ngcontent-%COMP%] {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 176px;
  height: 176px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
[_nghost-%COMP%]   .logo-link[_ngcontent-%COMP%]   .logo-icon[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
[_nghost-%COMP%]   .home-button[_ngcontent-%COMP%] {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: all 0.2s ease;
  box-shadow: none;
}
[_nghost-%COMP%]   .home-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  color: #4E02B2;
}
[_nghost-%COMP%]   .home-button[_ngcontent-%COMP%]:hover {
  transform: scale(1.05);
}
[_nghost-%COMP%]   .home-button[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .home-button[_ngcontent-%COMP%] {
    top: 8px;
    left: 8px;
    width: 40px;
    height: 40px;
  }
  [_nghost-%COMP%]   .home-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
    width: 20px;
    height: 20px;
  }
}
[_nghost-%COMP%]   .logo[_ngcontent-%COMP%] {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 165px;
  height: 137px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/futures-map-logo-UYVZA7QU.svg");
  background-size: contain;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .logo[_ngcontent-%COMP%] {
    display: none;
  }
}
[_nghost-%COMP%]   .workspace-title[_ngcontent-%COMP%] {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--showcase-font-family);
  color: #9B90AA;
  font-size: 16px;
  font-weight: 400;
  z-index: 99;
  max-width: calc(100% - 40px);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px;
}
[_nghost-%COMP%]   .workspace-title.needs-animation[_ngcontent-%COMP%] {
  white-space: pre;
  overflow: visible;
  text-overflow: clip;
  animation: _ngcontent-%COMP%_scrollTitle 20s linear infinite;
  animation-delay: 2s;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .workspace-title[_ngcontent-%COMP%] {
    max-width: calc(100% - 40px);
    font-size: 14px;
    top: 10px;
  }
  [_nghost-%COMP%]   .workspace-title[_ngcontent-%COMP%]:active {
    overflow-x: auto;
    overflow-y: hidden;
    text-overflow: clip;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }
  [_nghost-%COMP%]   .workspace-title[_ngcontent-%COMP%]:active::-webkit-scrollbar {
    height: 2px;
  }
  [_nghost-%COMP%]   .workspace-title[_ngcontent-%COMP%]:active::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 1px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%] {
    bottom: 8px;
    gap: 8px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%] {
  position: relative;
  background: rgba(185, 105, 255, 0.05);
  border: 1px solid #F1E5F3;
  border-radius: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 4px;
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  display: flex;
  gap: 0;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%] {
    border-radius: 20px;
    padding: 3px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-buttons[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 0;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 141px;
  height: 47px;
  padding: 0 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 23.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #4E02B2;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.5;
  position: relative;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%] {
    min-width: 72px;
    height: 40px;
    padding: 0 8px;
    font-size: 12px;
    border-radius: 18px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: auto;
  white-space: nowrap;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .map-drag-counter[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(78, 2, 178, 0.12);
  color: #4E02B2;
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  box-shadow: inset 0 0 0 1px rgba(78, 2, 178, 0.15);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .map-drag-counter.admin[_ngcontent-%COMP%] {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .map-drag-counter[_ngcontent-%COMP%]   .counter-caret[_ngcontent-%COMP%] {
  margin-left: 6px;
  font-size: 9px;
  line-height: 1;
  opacity: 0.7;
  transform: rotate(0deg);
  transition: transform 0.18s ease;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .map-drag-counter[_ngcontent-%COMP%]   .counter-caret.open[_ngcontent-%COMP%] {
  transform: rotate(180deg);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .map-drag-counter.breathing[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_dragCounterBreathing 1.8s ease-in-out infinite;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .map-drag-counter[_ngcontent-%COMP%] {
    min-width: 44px;
    padding: 3px 8px;
    font-size: 11px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
    width: 16px;
    height: 16px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.active[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .button-label[_ngcontent-%COMP%] {
  pointer-events: none;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]:hover {
  opacity: 0.7;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.active[_ngcontent-%COMP%] {
  background: #FFFDF6;
  border: 1px solid #F1E5F3;
  opacity: 1;
  color: #4E02B2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.active[_ngcontent-%COMP%]   .map-drag-counter[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      rgba(78, 2, 178, 0.16),
      rgba(250, 181, 83, 0.18));
  box-shadow: inset 0 0 0 1px rgba(78, 2, 178, 0.18), 0 2px 6px rgba(78, 2, 178, 0.14);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.map-button[_ngcontent-%COMP%] {
  border-radius: 23.5px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.tsne-button[_ngcontent-%COMP%] {
  border-radius: 23.5px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.clusters-button[_ngcontent-%COMP%] {
  border-radius: 23.5px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  position: absolute;
  left: 25%;
  bottom: calc(100% + 10px);
  transform: translateX(-50%);
  background: rgba(255, 253, 246, 0.92);
  border: 1px solid #F1E5F3;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(78, 2, 178, 0.12);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  z-index: 1001;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -7px;
  width: 12px;
  height: 12px;
  transform: translateX(-50%) rotate(45deg);
  background: rgba(255, 253, 246, 0.92);
  border-right: 1px solid #F1E5F3;
  border-bottom: 1px solid #F1E5F3;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-time-btn[_ngcontent-%COMP%] {
  background: rgba(78, 2, 178, 0.08);
  border: 1px solid rgba(78, 2, 178, 0.14);
  color: #4E02B2;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-time-btn[_ngcontent-%COMP%]:hover {
  background: rgba(78, 2, 178, 0.14);
  box-shadow: 0 4px 10px rgba(78, 2, 178, 0.14);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-time-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.96);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-stop-btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #4E02B2;
  border: 1px solid #4E02B2;
  color: #fff;
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-stop-btn[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 14px;
  height: 14px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-stop-btn[_ngcontent-%COMP%]:hover {
  background: #5d15c8;
  box-shadow: 0 6px 14px rgba(78, 2, 178, 0.24);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%]   .drag-stop-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.96);
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .drag-all-controls-popup[_ngcontent-%COMP%] {
    gap: 6px;
    padding: 6px 8px;
    flex-wrap: wrap;
    justify-content: center;
    left: 50%;
  }
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%] {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1000;
  transition: right 0.3s ease-out;
  pointer-events: auto;
}
[_nghost-%COMP%]   .zoom-controls.sidebar-open[_ngcontent-%COMP%] {
  right: 520px;
}
@media (max-width: 768px) {
  [_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%] {
    top: 8px;
    right: 8px;
  }
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .zoom-buttons[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .zoom-button[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .zoom-button[_ngcontent-%COMP%]:hover {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .zoom-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  pointer-events: none;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .showcase-toggle[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .showcase-toggle[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .showcase-toggle[_ngcontent-%COMP%]:hover {
  color: #333;
  transform: scale(1.05);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .showcase-toggle.active[_ngcontent-%COMP%] {
  background: #4CAF50;
  color: white;
  box-shadow: 0 3px 12px rgba(76, 175, 80, 0.4);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .zoom-button.active[_ngcontent-%COMP%] {
  background: #698CFF;
  color: white;
  box-shadow: 0 3px 12px rgba(105, 140, 255, 0.4);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-input-container[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: _ngcontent-%COMP%_slideIn 0.2s ease;
  gap: 4px;
  width: 200px;
  position: absolute;
  right: 100%;
  top: 0;
  margin-right: 8px;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-input-container[_ngcontent-%COMP%]   .search-input[_ngcontent-%COMP%] {
  border: none;
  outline: none;
  padding: 4px;
  font-size: 14px;
  flex: 1;
  background: transparent;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-input-container[_ngcontent-%COMP%]   .search-clear[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  padding: 0 4px;
  color: #666;
  transition: color 0.2s ease;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   .search-input-container[_ngcontent-%COMP%]   .search-clear[_ngcontent-%COMP%]:hover {
  color: #333;
}
@keyframes _ngcontent-%COMP%_slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .filter-toggle[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .filter-toggle[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .filter-toggle[_ngcontent-%COMP%]:hover {
  color: #333;
  transform: scale(1.05);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}
[_nghost-%COMP%]   .zoom-controls[_ngcontent-%COMP%]   .filter-toggle.active[_ngcontent-%COMP%] {
  background: #FF9800;
  color: white;
  box-shadow: 0 3px 12px rgba(255, 152, 0, 0.4);
}
[_nghost-%COMP%]   .drag-all-toggle[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
[_nghost-%COMP%]   .drag-all-toggle[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}
[_nghost-%COMP%]   .drag-all-toggle[_ngcontent-%COMP%]:hover {
  color: #4E02B2;
  background: rgba(78, 2, 178, 0.06);
  transform: scale(1.05);
  box-shadow: 0 3px 12px rgba(78, 2, 178, 0.2);
}
[_nghost-%COMP%]   .drag-all-toggle[_ngcontent-%COMP%]:active {
  transform: scale(0.95);
}
[_nghost-%COMP%]   .filters-bar-container[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  transform: translateY(-100%);
  transition: transform 0.3s ease-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
}
[_nghost-%COMP%]   .filters-bar-container.open[_ngcontent-%COMP%] {
  transform: translateY(0);
}
@keyframes _ngcontent-%COMP%_dragCounterBreathing {
  0%, 100% {
    transform: scale(1);
    box-shadow: inset 0 0 0 1px rgba(78, 2, 178, 0.15), 0 0 0 0 rgba(78, 2, 178, 0.12);
  }
  50% {
    transform: scale(1.06);
    box-shadow: inset 0 0 0 1px rgba(78, 2, 178, 0.22), 0 0 0 10px rgba(78, 2, 178, 0.04);
  }
}
@keyframes _ngcontent-%COMP%_scrollTitle {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(calc(-50% - 100%));
  }
}
@media (max-width: 768px) {
  .hide-on-mobile[_ngcontent-%COMP%] {
    display: none !important;
  }
}`]});};export{hu as ShowcaseWsComponent};/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/