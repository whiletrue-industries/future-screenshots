import{a as we,d as Jn,v as Zl,w as su,x as $l}from"./chunk-JAQRBAZC.js";import{$a as Ts,A as Nl,Aa as zl,B as Ul,Ba as Re,Da as Ie,F as Bl,Fb as Gl,Ga as lr,H as Bi,Ha as cr,Ia as pt,Ib as Wl,Ja as It,Ka as pe,La as Ge,M as Hi,Mb as Xl,Ob as Yl,Q as Le,Ra as ne,Sa as Gt,Tb as ql,Va as bs,Wa as Ms,X as Yt,Xa as Ss,Y as qt,Z as Ze,Za as Te,_ as pn,_a as hr,a as Wt,b as Je,ba as Hl,e as iu,ea as or,f as gi,fa as xs,g as et,ga as De,ha as ki,i as Nn,ia as Nt,na as kl,pa as Vt,q as Ll,r as Dl,ra as bn,rb as Vl,sa as Mn,ub as Ne,vb as an,w as fn,wa as Ve,x as Fl,y as rr,ya as ar,za as Un}from"./chunk-IL7K2TLE.js";var Kl=iu(su());var ou=["qrcode"],ur=class r{constructor(t,e){this.el=t;this.platform=e}url=De("");small=De(!1);codeSize=Nt(0);transform=Ne(()=>`scale(${this.scale()})`);scale=Ne(()=>{let t=this.mainEl();if(!t)return 1;let e=t.clientHeight/2/this.codeSize();return this.small()?e/5:e});mainEl=Nt(null);qrCodeEl;ngAfterViewInit(){return et(this,null,function*(){if(this.platform.browser()){this.mainEl.set(this.el.nativeElement);try{yield Kl.default.toCanvas(this.qrCodeEl.nativeElement,this.url(),{scale:16,color:{light:"#FFFDF6",dark:"#4E02B2"}}),this.codeSize.set(this.qrCodeEl.nativeElement.height)}catch(t){console.error("Error generating QR code:",t)}}})}static \u0275fac=function(e){return new(e||r)(bn(ki),bn(Jn))};static \u0275cmp=Mn({type:r,selectors:[["app-qrcode"]],viewQuery:function(e,n){if(e&1&&bs(ou,7),e&2){let i;Ms(i=Ss())&&(n.qrCodeEl=i.first)}},inputs:{url:[1,"url"],small:[1,"small"]},decls:3,vars:4,consts:[["qrcode",""],[1,"qr-container"],[1,"qrcode"]],template:function(e,n){e&1&&(pt(0,"div",1),pe(1,"canvas",2,0),It()),e&2&&(Re("small",n.small()),Vt(),zl("transform",n.transform()))},styles:[`

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
}`]})};function au(r,t){if(r&1){let e=Ge();pt(0,"div",1),ne("click",function(i){Yt(e);let s=Gt();return qt(s.onOverlayClick(i))}),pt(1,"div",2)(2,"button",3),ne("click",function(){Yt(e);let i=Gt();return qt(i.onClose())}),Ze(),pt(3,"svg",4),pe(4,"path",5),It()(),pn(),pe(5,"iframe",6),It()()}if(r&2){let e=Gt();Vt(5),Un("src",e.iframeUrl(),kl)}}var fr=class r{isOpen=De(!1);itemId=De(null);itemKey=De(null);workspaceId=De("");apiKey=De("");adminKey=De("");lang=De("");close=xs();metadataUpdated=xs();iframeUrl=Nt(null);platform=Le(Jn);sanitizer=Le(Wl);pollInterval;lastMetadata=new Map;constructor(){an(()=>{let t=this.itemId(),e=this.itemKey(),n=this.workspaceId(),i=this.apiKey(),s=this.adminKey(),o=this.lang();if(t&&n){let a=s&&s!=="ADMIN_KEY_NOT_SET",c=e&&e!=="";if(!a&&!c){console.log("[SIDEBAR] No edit authorization (no admin_key or item_key), not loading iframe"),this.iframeUrl.set(null),this.stopPolling();return}let l=new URLSearchParams({workspace:n,"item-id":t,sidebar:"true"});a&&l.set("api_key",s),c&&l.set("key",e);let h=o?`${o}/`:"",u=this.platform.browser()?window.location.host:"",d=u.startsWith("localhost")?`http://${u}/props?${l.toString()}`:`https://mapfutur.es/${h}props?${l.toString()}`,p=this.sanitizer.bypassSecurityTrustResourceUrl(d);this.iframeUrl.set(p),console.log("[SIDEBAR] Loading iframe with URL:",d),this.startPolling()}else this.iframeUrl.set(null),this.stopPolling()}),an(()=>{this.isOpen()||this.stopPolling()})}startPolling(){}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}checkMetadataUpdates(){return et(this,null,function*(){let t=this.itemId(),e=this.workspaceId(),n=this.adminKey();if(!(!t||!e||!n))try{let i=new URLSearchParams({workspace:e,api_key:n}),s=yield fetch(`https://api-qjzuw7ypfq-ez.a.run.app/items?${i.toString()}`);if(!s.ok){console.error("Failed to fetch items:",s.statusText);return}let a=(yield s.json()).find(c=>c._id===t);if(a){let c={favorable_future:a.favorable_future,plausibility:a.plausibility},l=this.lastMetadata.get(t);l&&(l.favorable_future!==c.favorable_future||l.plausibility!==c.plausibility)&&(console.log("[SIDEBAR] Metadata changed for item",t,c),this.metadataUpdated.emit({itemId:t,metadata:c})),this.lastMetadata.set(t,c)}}catch(i){console.error("Error checking metadata updates:",i)}})}onClose(){this.close.emit()}onOverlayClick(t){t.target===t.currentTarget&&this.onClose()}ngOnDestroy(){this.stopPolling()}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=Mn({type:r,selectors:[["app-evaluation-sidebar"]],inputs:{isOpen:[1,"isOpen"],itemId:[1,"itemId"],itemKey:[1,"itemKey"],workspaceId:[1,"workspaceId"],apiKey:[1,"apiKey"],adminKey:[1,"adminKey"],lang:[1,"lang"]},outputs:{close:"close",metadataUpdated:"metadataUpdated"},decls:1,vars:1,consts:[[1,"sidebar-overlay"],[1,"sidebar-overlay",3,"click"],[1,"sidebar-container"],["title","Close (Esc)",1,"close-button",3,"click"],["viewBox","0 0 24 24",1,"close-icon"],["d","M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z","fill","currentColor"],["title","Item Evaluation","sandbox","allow-scripts allow-forms allow-popups allow-same-origin",1,"evaluation-iframe",3,"src"]],template:function(e,n){e&1&&Ve(0,au,6,1,"div",0),e&2&&Ie(n.isOpen()&&n.iframeUrl()?0:-1)},styles:[`

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
}`]})};var pr=class r{_metadata;_currentPosition;_targetPosition;_mesh=null;_animationState;_animationStartTime=0;_properties=new Map;constructor(t,e={x:0,y:0,z:0}){this._metadata=Wt({},t),this._currentPosition=Wt({},e),this._targetPosition=Wt({},e),this._animationState="spawning"}get id(){return this._metadata.id}get url(){return this._metadata.url}get thumbnailUrl(){return this._metadata.thumbnail_url||this._metadata.url}get enhancedUrl(){return this._metadata.enhanced_url||this._metadata.url}get metadata(){return Wt({},this._metadata)}get currentPosition(){return Wt({},this._currentPosition)}get targetPosition(){return Wt({},this._targetPosition)}get mesh(){return this._mesh}get animationState(){return this._animationState}get animationStartTime(){return this._animationStartTime}setCurrentPosition(t){this._currentPosition=Wt({},t)}setTargetPosition(t){this._targetPosition=Wt({},t)}setMesh(t){this._mesh=t}setAnimationState(t){this._animationState=t,this._animationStartTime=performance.now()}isAtTarget(t=.1){let e=this._currentPosition.x-this._targetPosition.x,n=this._currentPosition.y-this._targetPosition.y,i=this._currentPosition.z-this._targetPosition.z;return Math.sqrt(e*e+n*n+i*i)<=t}getAnimationProgress(t){let e=performance.now()-this._animationStartTime;return Math.min(1,Math.max(0,e/t))}lerpToTarget(t){let e=this._currentPosition,n=this._targetPosition;return{x:e.x+(n.x-e.x)*t,y:e.y+(n.y-e.y)*t,z:e.z+(n.z-e.z)*t}}setProperty(t,e){this._properties.set(t,e)}getProperty(t){return this._properties.get(t)}hasProperty(t){return this._properties.has(t)}removeProperty(t){return this._properties.delete(t)}updateMetadata(t){this._metadata=Wt(Wt({},this._metadata),t)}distanceTo(t){let e=this._currentPosition.x-t._currentPosition.x,n=this._currentPosition.y-t._currentPosition.y,i=this._currentPosition.z-t._currentPosition.z;return Math.sqrt(e*e+n*n+i*i)}clone(){let t=new r(this._metadata,this._currentPosition);return t._targetPosition=Wt({},this._targetPosition),t._animationState=this._animationState,t._animationStartTime=this._animationStartTime,t._mesh=this._mesh,this._properties.forEach((e,n)=>{t._properties.set(n,e)}),t}dispose(){this._mesh=null,this._properties.clear()}toString(){return`PhotoData(id: ${this.id}, pos: (${this._currentPosition.x.toFixed(1)}, ${this._currentPosition.y.toFixed(1)}, ${this._currentPosition.z.toFixed(1)}), state: ${this._animationState})`}};function Jl(){let r=1;return()=>(r=(1664525*r+1013904223)%4294967296)/4294967296}function jl(r){return typeof r=="object"&&"length"in r?r:Array.from(r)}function Ql(r,t){let e=r.length,n,i;for(;e;)i=t()*e--|0,n=r[e],r[e]=r[i],r[i]=n;return r}function tc(r,t){for(var e=0,n=(r=Ql(Array.from(r),t)).length,i=[],s,o;e<n;)s=r[e],o&&ec(o,s)?++e:(o=cu(i=lu(i,s)),e=0);return o}function lu(r,t){var e,n;if(da(t,r))return[t];for(e=0;e<r.length;++e)if(mr(t,r[e])&&da(ws(r[e],t),r))return[r[e],t];for(e=0;e<r.length-1;++e)for(n=e+1;n<r.length;++n)if(mr(ws(r[e],r[n]),t)&&mr(ws(r[e],t),r[n])&&mr(ws(r[n],t),r[e])&&da(nc(r[e],r[n],t),r))return[r[e],r[n],t];throw new Error}function mr(r,t){var e=r.r-t.r,n=t.x-r.x,i=t.y-r.y;return e<0||e*e<n*n+i*i}function ec(r,t){var e=r.r-t.r+Math.max(r.r,t.r,1)*1e-9,n=t.x-r.x,i=t.y-r.y;return e>0&&e*e>n*n+i*i}function da(r,t){for(var e=0;e<t.length;++e)if(!ec(r,t[e]))return!1;return!0}function cu(r){switch(r.length){case 1:return hu(r[0]);case 2:return ws(r[0],r[1]);case 3:return nc(r[0],r[1],r[2])}}function hu(r){return{x:r.x,y:r.y,r:r.r}}function ws(r,t){var e=r.x,n=r.y,i=r.r,s=t.x,o=t.y,a=t.r,c=s-e,l=o-n,h=a-i,u=Math.sqrt(c*c+l*l);return{x:(e+s+c/u*h)/2,y:(n+o+l/u*h)/2,r:(u+i+a)/2}}function nc(r,t,e){var n=r.x,i=r.y,s=r.r,o=t.x,a=t.y,c=t.r,l=e.x,h=e.y,u=e.r,d=n-o,p=n-l,g=i-a,y=i-h,m=c-s,f=u-s,w=n*n+i*i-s*s,S=w-o*o-a*a+c*c,x=w-l*l-h*h+u*u,C=p*g-d*y,A=(g*x-y*S)/(C*2)-n,R=(y*m-g*f)/C,D=(p*S-d*x)/(C*2)-i,M=(d*f-p*m)/C,b=R*R+M*M-1,E=2*(s+A*R+D*M),V=A*A+D*D-s*s,H=-(Math.abs(b)>1e-6?(E+Math.sqrt(E*E-4*b*V))/(2*b):V/E);return{x:n+A+R*H,y:i+D+M*H,r:H}}function ic(r,t,e){var n=r.x-t.x,i,s,o=r.y-t.y,a,c,l=n*n+o*o;l?(s=t.r+e.r,s*=s,c=r.r+e.r,c*=c,s>c?(i=(l+c-s)/(2*l),a=Math.sqrt(Math.max(0,c/l-i*i)),e.x=r.x-i*n-a*o,e.y=r.y-i*o+a*n):(i=(l+s-c)/(2*l),a=Math.sqrt(Math.max(0,s/l-i*i)),e.x=t.x+i*n-a*o,e.y=t.y+i*o+a*n)):(e.x=t.x+e.r,e.y=t.y)}function sc(r,t){var e=r.r+t.r-1e-6,n=t.x-r.x,i=t.y-r.y;return e>0&&e*e>n*n+i*i}function rc(r){var t=r._,e=r.next._,n=t.r+e.r,i=(t.x*e.r+e.x*t.r)/n,s=(t.y*e.r+e.y*t.r)/n;return i*i+s*s}function gr(r){this._=r,this.next=null,this.previous=null}function uu(r,t){if(!(s=(r=jl(r)).length))return 0;var e,n,i,s,o,a,c,l,h,u,d;if(e=r[0],e.x=0,e.y=0,!(s>1))return e.r;if(n=r[1],e.x=-n.r,n.x=e.r,n.y=0,!(s>2))return e.r+n.r;ic(n,e,i=r[2]),e=new gr(e),n=new gr(n),i=new gr(i),e.next=i.previous=n,n.next=e.previous=i,i.next=n.previous=e;t:for(c=3;c<s;++c){ic(e._,n._,i=r[c]),i=new gr(i),l=n.next,h=e.previous,u=n._.r,d=e._.r;do if(u<=d){if(sc(l._,i._)){n=l,e.next=n,n.previous=e,--c;continue t}u+=l._.r,l=l.next}else{if(sc(h._,i._)){e=h,e.next=n,n.previous=e,--c;continue t}d+=h._.r,h=h.previous}while(l!==h.next);for(i.previous=e,i.next=n,e.next=n.previous=n=i,o=rc(e);(i=i.next)!==n;)(a=rc(i))<o&&(e=i,o=a);n=e.next}for(e=[n._],i=n;(i=i.next)!==n;)e.push(i._);for(i=tc(e,t),c=0;c<s;++c)e=r[c],e.x-=i.x,e.y-=i.y;return i.r}function fa(r){return uu(r,Jl()),r}var Sn=class{isInitialized=!1;photos=[];initialize(t){return et(this,null,function*(){this.isInitialized=!0})}dispose(){return et(this,null,function*(){this.photos=[],this.isInitialized=!1})}addPhoto(t){this.photos.push(t)}removePhoto(t){let e=this.photos.findIndex(n=>n.id===t);return e>=0?(this.photos.splice(e,1),!0):!1}getPhotos(){return[...this.photos]}getPhoto(t){return this.photos.find(e=>e.id===t)}requiresFullRecalculationOnAdd(){return!1}calculateLayoutBounds(t,e,n){let i=t.filter(u=>u!==null);if(i.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let s=e*.5,o=n*.5,a=1/0,c=-1/0,l=1/0,h=-1/0;for(let u of i)a=Math.min(a,u.x-s),c=Math.max(c,u.x+s),l=Math.min(l,u.y-o),h=Math.max(h,u.y+o);return{minX:a,maxX:c,minY:l,maxY:h}}validateInitialized(){if(!this.isInitialized)throw new Error(`${this.getConfiguration().name} layout strategy is not initialized`)}};var Lt={PHOTO_WIDTH:530,PHOTO_HEIGHT:1e3,SPACING_X:250,SPACING_Y:30,MAX_TEXTURE_DIMENSION:200,MAX_TEXTURE_DIMENSION_MOBILE:150};var jn=class r extends Sn{photoWidth;photoHeight;spacingX;spacingY;photoRadius;groupBuffer;photoBuffer;groupByFn;photoGroups=new Map;groupPositions=new Map;hexPositionCache=new Map;constructor(t={}){super(),this.photoWidth=t.photoWidth??Lt.PHOTO_WIDTH,this.photoHeight=t.photoHeight??Lt.PHOTO_HEIGHT,this.spacingX=t.spacingX??Lt.SPACING_X,this.spacingY=t.spacingY??Lt.SPACING_Y,this.groupBuffer=t.groupBuffer??2e3,this.photoBuffer=t.photoBuffer??50,this.groupByFn=t.groupBy??this.defaultGroupBy.bind(this),this.photoRadius=Math.sqrt(this.photoWidth**2+this.photoHeight**2)/2+this.photoBuffer}calculateEvaluationScore(t){let e=t.metadata.plausibility,n=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future;if(typeof e!="number"||!isFinite(e)||!n||typeof n!="string")return 0;let i=e/100,s=n.toLowerCase().trim(),o=s==="favor"||s==="favorable"||s==="prefer"||s==="preferred",a=1-i,c=o?a:-a;return isFinite(c)?c:0}getConfiguration(){return{name:"circle-packing",displayName:"Circle Packing Layout",description:"Groups photos by author in hierarchical circle packing arrangement",supportsInteraction:!1,requiresWebService:!1,settings:{photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY,groupBuffer:this.groupBuffer,photoBuffer:this.photoBuffer}}}addPhoto(t){let e=this.getGroupId(t);this.photoGroups.has(e)||this.photoGroups.set(e,[]),this.photoGroups.get(e).push(t)}removePhoto(t){for(let[e,n]of this.photoGroups.entries()){let i=n.findIndex(s=>s.id===t);if(i!==-1)return n.splice(i,1),n.length===0&&this.photoGroups.delete(e),this.recalculateLayout(),!0}return!1}getPositionForPhoto(t,e){return et(this,null,function*(){return this.regroupAllPhotos(e),this.getPositionForPhotoOptimized(t)})}getPositionForPhotoOptimized(t){return et(this,null,function*(){let e=this.getGroupId(t),n=this.groupPositions.get(e);if(!n)return console.warn(`No group position found for photo ${t.id} in group ${e}`),null;let i=this.photoGroups.get(e)||[],s=i.findIndex(a=>a.id===t.id);if(s===-1)return console.warn(`Photo ${t.id} not found in group ${e}`),null;let o=this.computeHexPositions(i.length)[s]??{x:0,y:0};return{x:n.x+o.x,y:n.y+o.y,metadata:{groupId:e,groupSize:i.length,photoIndex:s,groupPosition:{x:n.x,y:n.y,radius:n.radius},circlePackKey:`circle-pack-${e}-${s}`,renderOrder:s}}})}calculateAllPositions(t){return et(this,null,function*(){this.photoGroups.clear();for(let n of t){let i=this.getGroupId(n);this.photoGroups.has(i)||this.photoGroups.set(i,[]),this.photoGroups.get(i).push(n)}for(let n of this.photoGroups.values())n.sort((i,s)=>{let o=this.calculateEvaluationScore(i);return this.calculateEvaluationScore(s)-o});this.recalculateLayout();let e=[];for(let n of t){let i=yield this.getPositionForPhotoOptimized(n);e.push(i)}return e})}getGroupId(t){return this.groupByFn(t)}defaultGroupBy(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_circle_pack_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_circle_pack_group_id",n)),`random:${n}`}regroupAllPhotos(t){this.photoGroups.clear();for(let e of t){let n=this.getGroupId(e);this.photoGroups.has(n)||this.photoGroups.set(n,[]),this.photoGroups.get(n).push(e)}for(let[e,n]of this.photoGroups.entries())n.sort((i,s)=>{let o=this.calculateEvaluationScore(i);return this.calculateEvaluationScore(s)-o});this.recalculateLayout()}recalculateLayout(){let e=Array.from(this.photoGroups.entries()).sort(([i,s],[o,a])=>a.length!==s.length?a.length-s.length:i.localeCompare(o)).map(([i,s])=>{let o=this.calculateGroupRadius(s.length);return{id:i,radius:o,x:0,y:0}}),n=this.packCircles(e,this.groupBuffer);this.groupPositions.clear();for(let i of n){if(!isFinite(i.x)||!isFinite(i.y)||!isFinite(i.radius)){this.groupPositions.set(i.id,{x:0,y:0,radius:i.radius||1e3});continue}this.groupPositions.set(i.id,{x:i.x,y:i.y,radius:i.radius})}}computeHexPositions(t){if(t<=0)return[];let e=this.hexPositionCache.get(t);if(e)return e;let n=this.photoWidth+this.photoBuffer,i=this.photoHeight+this.photoBuffer,s=Math.ceil(Math.sqrt(t/3))+2,o=[];for(let c=-s;c<=s;c++)for(let l=-s;l<=s;l++){let h=l*n+Math.abs(c)%2*(n/2),u=c*i;o.push({x:h,y:u,distSq:h*h+u*u})}o.sort((c,l)=>c.distSq-l.distSq||c.x-l.x||c.y-l.y);let a=o.slice(0,t).map(({x:c,y:l})=>({x:c,y:l}));return this.hexPositionCache.set(t,a),a}calculateGroupRadius(t){if(t<=0)return this.photoRadius;let n=this.computeHexPositions(t).reduce((i,s)=>Math.max(i,s.x*s.x+s.y*s.y),0);return Math.sqrt(n)+this.photoRadius}packCircles(t,e=0){if(t.length===0)return[];let n=t.map(i=>Je(Wt({},i),{r:i.radius+e/2}));return fa(n),t.map((i,s)=>Je(Wt({},i),{x:n[s].x??0,y:n[s].y??0}))}getLayoutBounds(){return et(this,null,function*(){if(this.groupPositions.size===0)return{width:this.photoWidth*2,height:this.photoHeight*2};let t=1/0,e=-1/0,n=1/0,i=-1/0;for(let s of this.groupPositions.values()){let o=s.x-s.radius,a=s.x+s.radius,c=s.y-s.radius,l=s.y+s.radius;t=Math.min(t,o),e=Math.max(e,a),n=Math.min(n,c),i=Math.max(i,l)}return{width:e-t+this.groupBuffer*2,height:i-n+this.groupBuffer*2}})}dispose(){return et(this,null,function*(){for(let t of this.photoGroups.values())for(let e of t)e.setProperty("_circle_pack_group_id",void 0);this.photoGroups.clear(),this.groupPositions.clear(),this.hexPositionCache.clear(),yield gi(r.prototype,this,"dispose").call(this)})}requiresFullRecalculationOnAdd(){return!0}getPackingInfo(){let t=Array.from(this.photoGroups.entries()).map(([e,n])=>({groupId:e,photoCount:n.length,position:this.groupPositions.get(e)||{x:0,y:0,radius:0}}));return{totalGroups:this.photoGroups.size,totalPhotos:Array.from(this.photoGroups.values()).reduce((e,n)=>e+n.length,0),groups:t}}};var du=6,fu=.9,oc=1.122,ac=1.1,yr=class extends Sn{photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;positionCache=new Map;themeLabelCache=new Map;subThemeLabelCache=new Map;useCirclePacking;innerCirclePacking;constructor(t={}){super(),this.photoWidth=t.photoWidth??Lt.PHOTO_WIDTH,this.photoHeight=t.photoHeight??Lt.PHOTO_HEIGHT,this.spacingX=t.spacingX??Lt.SPACING_X,this.spacingY=t.spacingY??Lt.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY,this.useCirclePacking=t.useCirclePacking??!0,this.useCirclePacking?this.innerCirclePacking=new jn({photoWidth:this.photoWidth,photoHeight:this.photoHeight,photoBuffer:Math.round(Math.min(this.spacingX,this.spacingY)/2),groupBuffer:Math.max(this.cellW,this.cellH)*2,groupBy:e=>this.primaryTopicFor(e)}):this.innerCirclePacking=null}getConfiguration(){return{name:"tsne",displayName:"Thematic Layout",description:"Groups photos by taxonomy theme and sub-topic",supportsInteraction:!1,requiresWebService:!1,settings:{}}}getPositionForPhoto(t,e){return et(this,null,function*(){let n=this.positionCache.get(t.id);return n?{x:n.x,y:n.y,gridKey:`taxonomy-${t.id}`}:null})}calculateAllPositions(t){return et(this,null,function*(){return this.useCirclePacking&&this.innerCirclePacking?this.calculateCirclePackingPositions(t):this.calculateForceDirectedPositions(t)})}calculateCirclePackingPositions(t){return et(this,null,function*(){let e=this.innerCirclePacking,n=yield e.calculateAllPositions(t),{groups:i}=e.getPackingInfo();this.subThemeLabelCache.clear();let s=new Map;for(let o of i){this.subThemeLabelCache.set(o.groupId,{id:o.groupId,worldX:o.position.x,worldY:o.position.y,itemCount:o.photoCount});let a=o.groupId.split("/")[0]||"__unthemed",c=s.get(a)??{sumX:0,sumY:0,n:0,total:0};c.sumX+=o.position.x,c.sumY+=o.position.y,c.n++,c.total+=o.photoCount,s.set(a,c)}this.themeLabelCache.clear();for(let[o,a]of s)this.themeLabelCache.set(o,{id:o,worldX:a.sumX/a.n,worldY:a.sumY/a.n,itemCount:a.total});this.positionCache.clear();for(let o=0;o<t.length;o++){let a=n[o];a&&this.positionCache.set(t[o].id,{x:a.x,y:a.y})}return n})}calculateForceDirectedPositions(t){return et(this,null,function*(){let e=t.map(c=>this.createNode(c)),{themeNodes:n,subThemeNodes:i,themeGroups:s,subThemeGroups:o}=this.createLabelNodes(e);this.linkPhotosToLabelNodes(e,n,i),this.layoutThemeNodes(n),this.layoutSubThemeNodes(n,i,o),this.layoutPhotosAsHexbin(o),this.flattenPhotosToGlobalHexGrid(e,i),this.centerAllNodes(e,n,i),this.positionCache.clear(),this.themeLabelCache.clear(),this.subThemeLabelCache.clear();for(let c of n)this.themeLabelCache.set(c.id,{id:c.id,worldX:c.x,worldY:c.y,itemCount:c.itemCount});for(let c of i)this.subThemeLabelCache.set(c.id,{id:c.id,worldX:c.x,worldY:c.y,itemCount:c.itemCount});return e.map(c=>{let l={x:c.x,y:c.y};return this.positionCache.set(c.photo.id,l),{x:l.x,y:l.y,gridKey:`taxonomy-${c.photo.id}`}})})}getThemeLabelNodes(){return[...this.themeLabelCache.values()]}getSubThemeLabelNodes(){return[...this.subThemeLabelCache.values()]}getWorldPositionForId(t){return this.positionCache.get(t)??null}getClustersWithWorldCoords(){return[]}createNode(t){let e=this.extractTopics(t),n=new Set([...e].map(h=>h.split("/")[0])),i=[...e][0]??null,s=i?i.split("/")[0]:null,o=this.hashToUnit(s??"unthemed")*Math.PI*2,a=Math.max(this.cellW,this.cellH)*1.8,c=Math.max(this.cellW,this.cellH)*(.4+this.hashToUnit(t.id+"-r")*.8),l=this.hashToUnit(t.id+"-a")*Math.PI*2;return{photo:t,topics:e,themes:n,primaryTopic:i,primaryTheme:s,themeNodes:[],subThemeNodes:[],x:Math.cos(o)*a+Math.cos(l)*c,y:Math.sin(o)*a+Math.sin(l)*c,vx:0,vy:0}}primaryTopicFor(t){let[e]=this.extractTopics(t);return e??"__untopiced"}extractTopics(t){let e=t.metadata.topics,n=Array.isArray(e)?e:[];return new Set(n.map(i=>String(i||"").trim()).filter(i=>i.length>0))}centerAllNodes(t,e,n){let i=[...t,...e,...n];if(i.length===0)return;let s=1/0,o=1/0,a=-1/0,c=-1/0;for(let u of i)u.x<s&&(s=u.x),u.y<o&&(o=u.y),u.x>a&&(a=u.x),u.y>c&&(c=u.y);let l=(s+a)/2,h=(o+c)/2;for(let u of i)u.x-=l,u.y-=h}createLabelNodes(t){let e=new Map,n=new Map,i=new Map,s=new Map;for(let c of t){let l=c.primaryTheme??"__unthemed",h=c.primaryTopic??`${l}/__untopiced`;e.set(l,(e.get(l)??0)+1),n.set(h,(n.get(h)??0)+1),i.has(l)||i.set(l,[]),s.has(h)||s.set(h,[]),i.get(l).push(c),s.get(h).push(c)}let o=[...e.entries()].map(([c,l])=>({id:c,themeId:c,itemCount:l,x:0,y:0,vx:0,vy:0})),a=[...n.entries()].map(([c,l])=>{let h=c.split("/")[0]||"__unthemed";return{id:c,themeId:h,itemCount:l,x:0,y:0,vx:0,vy:0}});return{themeNodes:o,subThemeNodes:a,themeGroups:i,subThemeGroups:s}}layoutThemeNodes(t){let e=Math.max(this.cellW,this.cellH)*du,n=[...t].sort((s,o)=>o.itemCount-s.itemCount||s.id.localeCompare(o.id)),i=this.generateHexSpiralCoords(n.length);for(let s=0;s<n.length;s++){let o=i[s];n[s].x=(o.q+o.r*.5)*e,n[s].y=o.r*e*.9}}layoutSubThemeNodes(t,e,n){let i=new Map(t.map(c=>[c.id,c])),s=new Map;for(let c of e){let l=c.themeId??"__unthemed";s.has(l)||s.set(l,[]),s.get(l).push(c)}let o=Math.max(this.cellW,this.cellH)*.65,a=Math.max(this.cellW,this.cellH)*fu;for(let[c,l]of s.entries()){let h=i.get(c);if(!h)continue;let u=[],d=[...l].sort((p,g)=>g.itemCount-p.itemCount||p.id.localeCompare(g.id));for(let p of d){let g=(n.get(p.id)?.length??p.itemCount)+1,m=(this.hexRingsForCount(g)+1)*o,f=this.findNonOverlappingPlacement(h.x,h.y,m,u,a,p.id);p.x=f.x,p.y=f.y,u.push({x:p.x,y:p.y,radius:m})}}}layoutPhotosAsHexbin(t){let e=this.cellW*oc,n=this.cellH*ac;for(let[i,s]of t.entries()){if(s.length===0)continue;let o=s[0].subThemeNodes[0]??s[0].themeNodes[0]??null;if(!o)continue;let a=[...s].sort((l,h)=>l.photo.id.localeCompare(h.photo.id)),c=this.generateHexSpiralCoords(a.length+1).slice(1);for(let l=0;l<a.length;l++){let h=c[l];a[l].x=o.x+(h.q+h.r*.5)*e,a[l].y=o.y+h.r*n}}}flattenPhotosToGlobalHexGrid(t,e){let n=this.cellW*oc,i=this.cellH*ac,s=new Set;for(let a of e){let c=this.roundAxial(a.x/n-a.y/i*.5,a.y/i);s.add(this.hexKey(c.q,c.r))}let o=[...t].sort((a,c)=>{let l=(a.primaryTopic??"").localeCompare(c.primaryTopic??"");return l!==0?l:a.photo.id.localeCompare(c.photo.id)});for(let a of o){let c=this.roundAxial(a.x/n-a.y/i*.5,a.y/i),l=this.findNearestFreeHex(c.q,c.r,s);a.x=(l.q+l.r*.5)*n,a.y=l.r*i,s.add(this.hexKey(l.q,l.r))}}findNonOverlappingPlacement(t,e,n,i,s,o){if(i.length===0)return{x:t,y:e};let a=Math.max(this.cellW,this.cellH)*1.1,c=this.hashToUnit(`placement-${o}`)*Math.PI*2;for(let l=1;l<80;l++){let h=Math.max(6,l*12),u=l*a;for(let d=0;d<h;d++){let p=c+Math.PI*2*d/h,g=t+Math.cos(p)*u,y=e+Math.sin(p)*u;if(!i.some(f=>{let w=g-f.x,S=y-f.y,x=n+f.radius+s;return w*w+S*S<x*x}))return{x:g,y}}}return{x:t,y:e}}hexRingsForCount(t){if(t<=1)return 0;let e=0,n=1;for(;n<t;)e+=1,n+=e*6;return e}findNearestFreeHex(t,e,n){for(let i of this.generateHexSpiralCoords(2e3)){let s={q:t+i.q,r:e+i.r};if(!n.has(this.hexKey(s.q,s.r)))return s}return{q:t,r:e}}roundAxial(t,e){let n=t,i=e,s=-n-i,o=Math.round(n),a=Math.round(s),c=Math.round(i),l=Math.abs(o-n),h=Math.abs(a-s),u=Math.abs(c-i);return l>h&&l>u?o=-a-c:h>u?a=-o-c:c=-o-a,{q:o,r:c}}hexKey(t,e){return`${t},${e}`}generateHexSpiralCoords(t){if(t<=0)return[];let e=[{q:0,r:0}];if(t===1)return e;let n=[{dq:1,dr:0},{dq:1,dr:-1},{dq:0,dr:-1},{dq:-1,dr:0},{dq:-1,dr:1},{dq:0,dr:1}],i=1;for(;e.length<t;){let s=-i,o=i;for(let a=0;a<n.length&&e.length<t;a++){let{dq:c,dr:l}=n[a];for(let h=0;h<i&&e.length<t;h++)e.push({q:s,r:o}),s+=c,o+=l}i+=1}return e}linkPhotosToLabelNodes(t,e,n){let i=new Map(e.map(o=>[o.id,o])),s=new Map(n.map(o=>[o.id,o]));for(let o of t)o.themeNodes=[...o.themes].map(a=>i.get(a)).filter(a=>!!a),o.subThemeNodes=[...o.topics].map(a=>s.get(a)).filter(a=>!!a)}hashToUnit(t){let e=2166136261;for(let i=0;i<t.length;i++)e^=t.charCodeAt(i),e=Math.imul(e,16777619);return(e>>>0)/4294967295}};var vr=class r extends Sn{svgElement=null;svgContainer=null;hotspots=[];photoPositions=new Map;draggedPhoto=null;isDragging=!1;hotspotPhotoCount=new Map;photoHotspotMap=new Map;photoSizes=new Map;batchPositionedPhotos=new Map;MAX_OVERLAP_PERCENT=10;PHOTO_WIDTH=120;PHOTO_HEIGHT=120;hotspotSlots=new Map;options={svgPath:"/showcase-bg.svg",centerX:0,centerY:0,circleRadius:2e4,radiusVariation:4e3,useProportionalLayout:!0,svgOffsetX:0,svgOffsetY:0,onHotspotDrop:()=>et(null,null,function*(){})};constructor(t){super(),t&&(this.options=Wt(Wt({},this.options),t))}calculateEvaluationRotationDeg(t){let e=t.metadata.plausibility,n=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future;if(typeof e!="number"||!isFinite(e)||!n||typeof n!="string")return 0;let s=(1-e/100)*32,o=n.toLowerCase().trim(),c=o==="favor"||o==="favorable"||o==="prefer"||o==="preferred"?s:-s;return isFinite(c)?c:0}calculateEvaluationScore(t){return this.calculateEvaluationRotationDeg(t)/32}getConfiguration(){return{name:"svg-background",displayName:"SVG Background",description:"Interactive layout with SVG background and proportional group-based circle slicing",supportsInteraction:!0,requiresWebService:!1,settings:{svgPath:this.options.svgPath,centerX:this.options.centerX,centerY:this.options.centerY,circleRadius:this.options.circleRadius,radiusVariation:this.options.radiusVariation,useProportionalLayout:this.options.useProportionalLayout}}}getSvgBounds(){return{minX:this.options.svgOffsetX-this.options.circleRadius,maxX:this.options.svgOffsetX+this.options.circleRadius,minY:this.options.svgOffsetY-this.options.circleRadius,maxY:this.options.svgOffsetY+this.options.circleRadius}}initialize(t){return et(this,null,function*(){yield gi(r.prototype,this,"initialize").call(this,t),t&&(this.options=Wt(Wt({},this.options),t)),yield this.loadSvgBackground(),this.extractHotspots()})}dispose(){return et(this,null,function*(){yield gi(r.prototype,this,"dispose").call(this),this.svgContainer&&this.svgContainer.parentNode&&this.svgContainer.parentNode.removeChild(this.svgContainer),this.svgContainer=null,this.svgElement=null,this.hotspots=[],this.photoPositions.clear(),this.draggedPhoto=null,this.isDragging=!1,this.hotspotPhotoCount.clear(),this.photoHotspotMap.clear(),this.photoSizes.clear()})}loadSvgBackground(){return et(this,null,function*(){if(!(typeof fetch>"u"||typeof document>"u"))try{let t=yield fetch(this.options.svgPath);if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);let e=yield t.text(),i=new DOMParser().parseFromString(e,"image/svg+xml");this.svgElement=i.documentElement}catch(t){throw console.error("\u274C Failed to load SVG background:",t),new Error(`Failed to load SVG background from ${this.options.svgPath}`)}})}extractHotspots(){if(!(typeof document>"u")){if(!this.svgElement){console.warn("SVG element not loaded, cannot extract hotspots");return}this.hotspots=[],this.svgContainer||(this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.visibility="hidden",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.top="-9999px",this.svgContainer.style.left="-9999px",document.body.appendChild(this.svgContainer)),this.svgContainer.appendChild(this.svgElement);try{this.svgElement.querySelectorAll('[id^="s-"]').forEach(e=>{let n=e,i=n.id,s=this.parseGroupIdMetadata(i);if(!s)return;let o=n.querySelector('[id^="hit"]');if(!o){console.warn(`No hit element found in group ${i}`);return}let a=Array.from(o.querySelectorAll("path")).find(h=>h.id.startsWith(s.transition_bar_position));if(!a){console.warn(`No path element found starting with '${s.transition_bar_position}' in hit element of group ${i}`);return}let c=a.getBBox();(c.width===0||c.height===0)&&console.error(`[SVG-HOTSPOT] ZERO-SIZE bbox at initialization for ${i}:`,{elementId:a.id,elementTag:a.tagName,bbox:{x:c.x,y:c.y,width:c.width,height:c.height},inDOM:document.contains(a),parentId:a.parentElement?.id,svg:this.svgElement?"exists":"null"});let l={id:o.id,bounds:{x:c.x,y:c.y,width:c.width,height:c.height},parentGroupId:i,transitionBarPosition:s.transition_bar_position,element:a};this.hotspots.push(l)})}catch(t){console.error("[HOTSPOT-EXTRACT] Error extracting hotspots:",t)}}}getPositionForPhoto(t,e,n){return et(this,null,function*(){let i=n?.enableAutoPositioning??!1;this.validateInitialized();let s=t.metadata.width||this.PHOTO_WIDTH,o=t.metadata.height||this.PHOTO_HEIGHT;this.photoSizes.set(t.id,{width:s,height:o});let a=this.photoPositions.get(t.id);if(a)return a;let c,l=t.metadata.layout_x,h=t.metadata.layout_y;if(typeof l=="number"&&typeof h=="number"){let{x:u,y:d}=this.normalizedToWorld(l,h);c={x:u,y:d,metadata:{layoutType:"restored-normalized",layout_x:l,layout_y:h,circleRadius:this.options.circleRadius}}}else if(i){let u=this.getAutoPositionFromMetadata(t);if(u){let d=u.auto_x*this.options.circleRadius+this.options.svgOffsetX,p=u.auto_y*this.options.circleRadius+this.options.svgOffsetY;c={x:d,y:p,metadata:{layoutType:"auto-positioned",auto_x:u.auto_x,auto_y:u.auto_y,circleRadius:this.options.circleRadius,svgOffsetX:this.options.svgOffsetX,svgOffsetY:this.options.svgOffsetY}}}else c=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition()}else c=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition();return this.photoPositions.set(t.id,c),c})}calculateAllPositions(t,e){return et(this,null,function*(){let n=e?.enableAutoPositioning??!1;this.validateInitialized(),this.hotspotPhotoCount.clear(),this.batchPositionedPhotos.clear();let i=new Map;for(let[o,a]of this.photoPositions.entries())(a.metadata?.layoutType==="free-dragged"||a.metadata?.layoutType==="dragging")&&i.set(o,a);this.photoPositions.clear();for(let[o,a]of i.entries())this.photoPositions.set(o,a);let s=[];for(let o of t){let a=yield this.getPositionForPhoto(o,t,{enableAutoPositioning:n});s.push(a)}return s})}generateRandomCircularPosition(){let t=Math.random()*2*Math.PI,e=(Math.random()-.5)*2*this.options.radiusVariation,n=this.options.circleRadius+e,i=this.options.centerX+Math.cos(t)*n,s=this.options.centerY+Math.sin(t)*n;return{x:i,y:s,metadata:{angle:t,radius:n,layoutType:"circular"}}}generateProportionalCircularPosition(t,e){let n=this.getPhotoGroupId(t),i=this.groupPhotosByGroupId(e),o=this.calculateGroupSlices(i).get(n);if(!o)return this.generateRandomCircularPosition();let a=i.get(n)||[],c=a.findIndex(A=>A.id===t.id),l=a.length,u=(o.endAngle-o.startAngle)*(1-.5),d=(o.startAngle+o.endAngle)/2,p;if(l===1)p=d;else{let A=u/l;p=d-u/2+(c+.5)*A}let g=this.hashCode(t.id)/2147483647,y=this.options.radiusVariation*.8,m=g*y,f=Math.min(l/10,.5),w=(c/l-.5)*f*this.options.radiusVariation*.3,S=this.options.circleRadius+m+w,x=this.options.centerX+Math.cos(p)*S*.75,C=this.options.centerY+Math.sin(p)*S;if(x<this.options.centerX){let A=this.options.centerX-x;x=this.options.centerX+A-.4*this.options.circleRadius}else x=x-this.options.circleRadius+.4*this.options.circleRadius;return{x,y:C,metadata:{angle:p,radius:S,groupId:n,groupSlice:o,photoIndex:c,totalInGroup:l,radiusVariation:m,packingVariation:w,layoutType:"proportional-circular"}}}getPhotoGroupId(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_svg_background_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_svg_background_group_id",n)),`random:${n}`}groupPhotosByGroupId(t){let e=new Map;for(let n of t){let i=this.getPhotoGroupId(n);e.has(i)||e.set(i,[]),e.get(i).push(n)}return e}calculateGroupSlices(t){let e=Array.from(t.values()).reduce((a,c)=>a+c.length,0),n=new Map;if(e===0)return n;let i=Array.from(t.entries()).sort(([a,c],[l,h])=>h.length!==c.length?h.length-c.length:a.localeCompare(l)),s=0,o=2*Math.PI;for(let[a,c]of i){let l=c.length,h=l/e,u=l/e*o,d=s+u;n.set(a,{startAngle:s,endAngle:d,size:l}),s=d}return n}hashCode(t){let e=0;if(t.length===0)return e;for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);e=(e<<5)-e+i,e=e&e}return e}getDropZones(){return this.hotspots.map(t=>({id:t.id,bounds:t.bounds,hotspot:t,acceptsPhoto:()=>!0,onPhotoDrop:e=>et(this,null,function*(){})}))}onPhotoDragStart(t,e){return this.draggedPhoto=t,this.isDragging=!0,!0}onPhotoDragMove(t,e){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return;let{layout_x:n,layout_y:i}=this.worldToNormalized(e.x,e.y),s={x:e.x,y:e.y,metadata:{layoutType:"dragging",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};this.photoPositions.set(t.id,s)}onPhotoDragEnd(t,e){return et(this,null,function*(){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return!1;if(this.isDragging=!1,this.draggedPhoto=null,this.isOutOfBounds(e))return this.photoPositions.delete(t.id),!1;let{layout_x:n,layout_y:i}=this.worldToNormalized(e.x,e.y),s={x:e.x,y:e.y,metadata:{layoutType:"free-dragged",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};return this.photoPositions.set(t.id,s),t.updateMetadata({layout_x:n,layout_y:i}),!0})}isOutOfBounds(t){let e=t.x-this.options.svgOffsetX,n=t.y-this.options.svgOffsetY;return Math.sqrt(e*e+n*n)>this.options.circleRadius}getSvgElement(){return this.svgElement}getHotspots(){return[...this.hotspots]}getPhotoPosition(t){return this.photoPositions.get(t)||null}setPhotoPosition(t,e){this.photoPositions.set(t,e)}getAutoPositionFromMetadata(t){let e=t.metadata,n=e.plausibility,i=this.normalizeFavorableFuture(e._svgZoneFavorableFuture||e.favorable_future),s=this.normalizeTransitionBar(e.transition_bar_position),o=this.normalizePlausibility(n);if(!s&&o!==null&&i&&(s="during"),o===null||!i||!s)return null;for(let a of this.hotspots){let c=a.parentGroupId;if(!c.startsWith("s-"))continue;let l=this.parseGroupIdMetadata(c);if(!l)continue;let h=this.normalizeFavorableFuture(l.favorable_future),u=this.normalizeTransitionBar(l.transition_bar_position),d=this.normalizePlausibility(l.plausibility);if(d!==null&&d===o&&h===i&&u===s){this.photoHotspotMap.set(t.id,a);let p=a.element?.id||"path",g=`${c}:${u}:${p}`,y=this.hotspotPhotoCount.get(g)||0;return this.hotspotPhotoCount.set(g,y+1),this.distributePhotoInHotspot(a,y)}}return null}distributePhotoInHotspot(t,e){let n=this.getSvgViewBox();if(!n)return console.warn("No SVG viewBox found, using default distribution"),{auto_x:0,auto_y:0};let i=this.getSlotsForHotspot(t,n);if(i.length===0){console.warn(`[AUTO-POS] No valid positions found in path for ${t.parentGroupId} (bounds=${t.bounds.width.toFixed(1)}x${t.bounds.height.toFixed(1)}), using center`);let d=t.bounds.x+t.bounds.width/2,p=t.bounds.y+t.bounds.height/2,g=(d-n.width/2)/(n.width/2),y=-((p-n.height/2)/(n.height/2));return{auto_x:g,auto_y:y}}let s=i,o=t.element?.id||"path",a=`${t.parentGroupId}:${t.transitionBarPosition}:${o}`;this.batchPositionedPhotos.has(a)||this.batchPositionedPhotos.set(a,[]);let c=this.batchPositionedPhotos.get(a),l=12,h=d=>c.some(p=>Math.sqrt(Math.pow(d.svgX-p.svgX,2)+Math.pow(d.svgY-p.svgY,2))<l),u={normalizedX:0,normalizedY:0,overlap:Number.POSITIVE_INFINITY,displacement:Number.POSITIVE_INFINITY,spacing:-1,svgX:0,svgY:0};for(let d=0;d<s.length;d++){let p=s[d];if(h(p))continue;let g=(p.svgX-n.width/2)/(n.width/2),y=-((p.svgY-n.height/2)/(n.height/2)),m=this.resolveOverlapByNudging(g,y,t,n),f=this.getMinDistanceToExistingPhotos(m.normalizedX,m.normalizedY,t),w=this.normalizedToSvg(m.normalizedX,m.normalizedY,n);if((m.overlap<u.overlap||m.overlap===u.overlap&&m.displacement<u.displacement||m.overlap===u.overlap&&m.displacement===u.displacement&&f>u.spacing)&&(u={normalizedX:m.normalizedX,normalizedY:m.normalizedY,overlap:m.overlap,displacement:m.displacement,spacing:f,svgX:w.svgX,svgY:w.svgY},u.overlap===0&&u.displacement<=Math.max(2,Math.min(n.width,n.height)*.01)))break}if(!isFinite(u.overlap)){let d=c.length%s.length,p=s[d],g=(p.svgX-n.width/2)/(n.width/2),y=-((p.svgY-n.height/2)/(n.height/2)),m=this.resolveOverlapByNudging(g,y,t,n),f=this.normalizedToSvg(m.normalizedX,m.normalizedY,n);u={normalizedX:m.normalizedX,normalizedY:m.normalizedY,overlap:m.overlap,displacement:m.displacement,spacing:this.getMinDistanceToExistingPhotos(m.normalizedX,m.normalizedY,t),svgX:f.svgX,svgY:f.svgY}}return c.push({svgX:u.svgX,svgY:u.svgY}),{auto_x:u.normalizedX,auto_y:u.normalizedY}}isPointInHotspot(t,e,n){try{let i=t.bounds;if(!i||i.width===0||i.height===0||!(e>=i.x&&e<=i.x+i.width&&n>=i.y&&n<=i.y+i.height))return!1;let o=t.element;if(o&&typeof o.isPointInFill=="function"){let a=(o.ownerSVGElement||this.svgElement)?.createSVGPoint();if(a)return a.x=e,a.y=n,o.isPointInFill(a)}return!0}catch(i){return console.error("[PATH-CHECK] Error checking point with bounds:",i),!1}}getPositionForRejectedPhoto(t,e){if(!this.svgElement)return null;let n=this.getSvgViewBox();if(!n)return null;let i=Math.min(n.width,n.height)*.2,s=-n.width/2+i/2,o=n.height/2-i/2,a=[];for(let u of e)if(u.metadata._private_moderation===0){let p=this.photoPositions.get(u.id);if(p){let g=this.photoSizes.get(u.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},y=Math.max(g.width,g.height)/2;a.push({x:p.x,y:p.y,radius:y})}}let c=this.photoSizes.get(t.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},l=Math.max(c.width,c.height)/2,h;return a.length===0?h={x:s,y:o}:h=this.findCirclePackPosition(l,a,s,o,i/2),{x:h.x,y:h.y,metadata:{layoutType:"rejected-packed",circleRadius:this.options.circleRadius,isRejected:!0}}}getMinDistanceToExistingPhotos(t,e,n){let i=this.options.circleRadius,s=t*i,o=e*i,a=Number.MAX_VALUE;for(let[c,l]of this.photoHotspotMap.entries())if(l.parentGroupId===n.parentGroupId){let h=this.photoPositions.get(c);if(h){let u=h.x,d=h.y,p=Math.sqrt(Math.pow(s-u,2)+Math.pow(o-d,2));a=Math.min(a,p)}}return a}getPhotoSizeInSvg(t){let e=this.PHOTO_WIDTH/this.options.circleRadius*(t.width/2),n=this.PHOTO_HEIGHT/this.options.circleRadius*(t.height/2);return{w:e,h:n}}seededShuffle(t,e){let n=e>>>0,i=()=>(n=n*1664525+1013904223>>>0,n/4294967296),s=t.slice();for(let o=s.length-1;o>0;o--){let a=Math.floor(i()*(o+1));[s[o],s[a]]=[s[a],s[o]]}return s}getSlotsForHotspot(t,e){let n=t.element?.id||"path",i=`${t.parentGroupId}:${t.transitionBarPosition}:${n}`,s=this.hotspotSlots.get(i);if(s&&s.length>0)return s;let o=Math.min(t.bounds.width,t.bounds.height)*.02,a=15,c=15,l=[],h=0;for(let p=t.bounds.y+o;p<=t.bounds.y+t.bounds.height-o;p+=c){let g=h%2===1?a*.5:0;for(let y=t.bounds.x+o+g;y<=t.bounds.x+t.bounds.width-o;y+=a)this.isPointInHotspot(t,y,p)&&l.push({svgX:y,svgY:p});h++}let u=Math.abs(this.hashCode(i)),d=this.seededShuffle(l,u);return this.hotspotSlots.set(i,d),d}overlapsHeaderElement(t,e,n){if(typeof document>"u"||!this.svgElement)return!1;let i=this.PHOTO_WIDTH/this.options.circleRadius*(n.width/2),s=this.PHOTO_HEIGHT/this.options.circleRadius*(n.height/2),o=t-i/2,a=t+i/2,c=e-s/2,l=e+s/2,h=Array.from(this.svgElement.querySelectorAll('[id^="header"]'));for(let u of h)if(u instanceof SVGGraphicsElement)try{let d=u.getBBox(),p=15;if(!(a<d.x-p||o>d.x+d.width+p||l<d.y-p||c>d.y+d.height+p))return!0;let y=u.querySelectorAll("*");for(let m of y)if(m instanceof SVGGraphicsElement)try{let f=m.getBBox();if(!(a<f.x-p||o>f.x+f.width+p||l<f.y-p||c>f.y+f.height+p))return!0}catch{continue}}catch{continue}return!1}normalizedToSvg(t,e,n){let i=n.width/2+t*(n.width/2),s=n.height/2-e*(n.height/2);return{svgX:i,svgY:s}}resolveOverlapByNudging(t,e,n,i){let s=this.calculateOverlapWithExistingPhotos(t,e,n);if(s===0)return{normalizedX:t,normalizedY:e,overlap:0,displacement:0};let o=this.normalizedToSvg(t,e,i),a=Math.max(Math.min(i.width,i.height)*.01,2),c=Math.min(i.width,i.height)*.2,l={normalizedX:t,normalizedY:e,overlap:s,displacement:0};for(let h=a;h<=c;h+=a)for(let d=0;d<16;d++){let p=d/16*2*Math.PI,g=o.svgX+Math.cos(p)*h,y=o.svgY+Math.sin(p)*h;if(!this.isPointInHotspot(n,g,y)||this.overlapsHeaderElement(g,y,i))continue;let m=(g-i.width/2)/(i.width/2),f=-((y-i.height/2)/(i.height/2)),w=this.calculateOverlapWithExistingPhotos(m,f,n);if(w===0)return{normalizedX:m,normalizedY:f,overlap:0,displacement:h};(w<l.overlap||w===l.overlap&&h<l.displacement)&&(l={normalizedX:m,normalizedY:f,overlap:w,displacement:h})}return l}findCirclePackPosition(t,e,n,i,s){let a={x:n,y:i},c=1/0;for(let l of e){let h=[0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI,Math.PI*5/4,Math.PI*3/2,Math.PI*7/4];for(let u of h){let d=l.radius+t+50,p=l.x+Math.cos(u)*d,g=l.y+Math.sin(u)*d;if(!e.some(m=>{let f=p-m.x,w=g-m.y;return Math.sqrt(f*f+w*w)<t+m.radius+50})){let m=Math.sqrt(Math.pow(p-n,2)+Math.pow(g-i,2));m<s&&m<c&&(c=m,a={x:p,y:g})}}}return a}calculateOverlapWithExistingPhotos(t,e,n){let i=[];for(let[a,c]of this.photoPositions.entries())if(this.photoHotspotMap.get(a)===n){let l=this.photoSizes.get(a)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT};i.push({x:c.x,y:c.y,width:l.width,height:l.height})}if(i.length===0)return 0;let s={width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},o=0;for(let a=0;a<i.length;a++){let c=i[a],l=this.calculateRectangleOverlapPercent(t*this.options.circleRadius,e*this.options.circleRadius,s.width,s.height,c.x,c.y,c.width,c.height);o=Math.max(o,l)}return o}calculateRectangleOverlapPercent(t,e,n,i,s,o,a,c){let l=t-n/2,h=t+n/2,u=e-i/2,d=e+i/2,p=s-a/2,g=s+a/2,y=o-c/2,m=o+c/2,f=Math.max(l,p),w=Math.min(h,g),S=Math.max(u,y),x=Math.min(d,m);if(w<=f||x<=S)return 0;let C=w-f,A=x-S,R=C*A,D=n*i;return R/D*100}worldToNormalized(t,e){return{layout_x:Math.max(-1,Math.min(1,(t-(this.options.svgOffsetX||0))/this.options.circleRadius)),layout_y:Math.max(-1,Math.min(1,(e-(this.options.svgOffsetY||0))/this.options.circleRadius))}}normalizedToWorld(t,e){return{x:t*this.options.circleRadius+(this.options.svgOffsetX||0),y:e*this.options.circleRadius+(this.options.svgOffsetY||0)}}parseGroupIdMetadata(t){try{let n=t.substring(2).split(","),i,s,o;for(let a of n){let[c,l]=a.split("=");c==="plausibility"?i=parseInt(l,10):c==="favorable_future"?s=l:c==="transition_bar_position"&&(o=l)}if(i!==void 0&&s!==void 0&&o!==void 0)return{plausibility:i,favorable_future:s,transition_bar_position:o}}catch(e){console.warn(`Failed to parse group ID metadata: ${t}`,e)}return null}normalizeFavorableFuture(t){if(!t)return"";let e=t.toLowerCase().trim();return e.includes("prevent")?"prevent":e.includes("prefer")?"prefer":e.includes("uncertain")?"uncertain":e}normalizeTransitionBar(t){if(!t)return"";let e=t.toLowerCase().trim();return e.startsWith("bef")?"before":e.startsWith("dur")?"during":e.startsWith("aft")||e.startsWith("acher")?"after":e.includes("unclear")?"during":e}normalizePlausibility(t){if(t==null)return null;let e=typeof t=="number"?t:parseFloat(String(t));if(Number.isNaN(e))return null;let n=[0,25,50,75,100],i=n[0],s=Math.abs(e-n[0]);for(let o=1;o<n.length;o++){let a=Math.abs(e-n[o]);a<s&&(s=a,i=n[o])}return i}getSvgViewBox(){if(typeof document>"u"||!this.svgElement)return null;let t=this.svgElement.getAttribute("viewBox");if(!t){let n=parseFloat(this.svgElement.getAttribute("width")||"800"),i=parseFloat(this.svgElement.getAttribute("height")||"800");return{x:0,y:0,width:n,height:i}}let e=t.split(/\s+/);return e.length===4?{x:parseFloat(e[0]),y:parseFloat(e[1]),width:parseFloat(e[2]),height:parseFloat(e[3])}:null}updatePhotoAfterHotspotDrop(t,e,n){let{layout_x:i,layout_y:s}=this.worldToNormalized(e.x,e.y),o={x:e.x,y:e.y,metadata:{layoutType:"hotspot-drop",layout_x:i,layout_y:s,circleRadius:this.options.circleRadius,hotspotData:n}};this.photoPositions.set(t,o)}};var _r=class r extends Sn{constructor(e,n="https://storage.googleapis.com/chronomaps3-eu",i={}){super();this.workspaceId=e;this.baseUrl=n;this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.photoWidth=i.photoWidth??Lt.PHOTO_WIDTH,this.photoHeight=i.photoHeight??Lt.PHOTO_HEIGHT,this.spacingX=i.spacingX??Lt.SPACING_X,this.spacingY=i.spacingY??Lt.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY}workspaceConfigUrl;tsneConfigUrl=null;tsneData=null;currentStateHash=null;currentSetId=null;isLoading=!1;loadPromise=null;photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;initialize(){return et(this,null,function*(){yield gi(r.prototype,this,"initialize").call(this),yield this.forceRefresh()})}getConfiguration(){return{name:"tsne-grid",displayName:"TSNE Layout",description:"Positions photos on the server-precalculated t-SNE grid",supportsInteraction:!1,requiresWebService:!0,settings:{workspaceId:this.workspaceId,baseUrl:this.baseUrl,photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY}}}forceRefresh(){return et(this,null,function*(){this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData()})}fetchWorkspaceConfig(){return et(this,null,function*(){try{let e=yield fetch(this.workspaceConfigUrl);if(!e.ok)throw new Error(`Failed to fetch workspace config: ${e.status} ${e.statusText}`);let n=yield e.json();if(typeof n.set_id!="number")throw new Error("Invalid workspace config: missing or invalid set_id: "+n.set_id+" "+typeof n.set_id);if(!n.state_hash||typeof n.state_hash!="string")throw new Error("Invalid workspace config: missing or invalid state_hash: "+n.state_hash);return{set_id:n.set_id,state_hash:n.state_hash}}catch(e){throw console.error("Error fetching workspace configuration:",e),e}})}fetchTsneData(){return et(this,null,function*(){if(this.tsneData||this.isLoading)return this.loadPromise||Promise.resolve();this.isLoading=!0,this.loadPromise=this.doFetchTsneData();try{yield this.loadPromise}finally{this.isLoading=!1}})}doFetchTsneData(){return et(this,null,function*(){try{let e=yield this.fetchWorkspaceConfig();if(this.currentStateHash===e.state_hash&&this.tsneData)return;this.currentStateHash=e.state_hash,this.currentSetId=e.set_id,this.tsneConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/${e.set_id}/config.json`;let n=yield fetch(this.tsneConfigUrl);if(!n.ok)throw new Error(`Failed to fetch TSNE config: ${n.status} ${n.statusText}`);let i=yield n.json();this.tsneData=this.validateTsneConfig(i)}catch(e){throw console.error("Error fetching TSNE configuration:",e),e}})}validateTsneConfig(e){if(!e||typeof e!="object")throw new Error("Invalid TSNE config: not an object");if(!Array.isArray(e.dim)||e.dim.length!==2)throw new Error("Invalid TSNE config: dim must be an array of 2 numbers");if(!Array.isArray(e.grid))throw new Error("Invalid TSNE config: grid must be an array");for(let n=0;n<e.grid.length;n++){let i=e.grid[n];if(!i||typeof i!="object")throw new Error(`Invalid TSNE config: grid item ${n} is not an object`);if(!Array.isArray(i.pos)||i.pos.length!==2)throw new Error(`Invalid TSNE config: grid item ${n} pos must be an array of 2 numbers`);if(typeof i.id!="string")throw new Error(`Invalid TSNE config: grid item ${n} id must be a string`)}return{dim:e.dim,grid:e.grid,padding_ratio:e.padding_ratio||.5,conversion_ratio:e.conversion_ratio||[1,1],cell_ratios:e.cell_ratios||[1,1],clusters:Array.isArray(e.clusters)?e.clusters:[]}}getPositionForPhoto(e){return et(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n=this.tsneData.grid.find(o=>o.id===e.id);if(!n)return null;let i=this.convertTsneToWorldCoordinates(n.pos,this.tsneData.dim),s=n.metadata?.rotate;return{x:i.x,y:i.y,gridKey:`tsne-${n.pos[0]}-${n.pos[1]}`,metadata:{tsnePosition:n.pos,_tsneRotateDeg:typeof s=="number"?s:void 0}}})}calculateAllPositions(e){return et(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n=[];for(let i of e)n.push(yield this.getPositionForPhoto(i));return n})}fetchLayoutData(e){return Ll(this.getAllPositionsAsMap(e))}convertTsneToWorldCoordinates(e,n){let[i,s]=e,[o,a]=n,c=(o-1)*this.cellW/2+this.cellW/4,l=(a-1)*this.cellH/2,h=i*this.cellW-c,u=l-s*this.cellH;return{x:h,y:u}}getAllPositionsAsMap(e){return et(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n={};for(let i of e)n[i.id]=yield this.getPositionForPhoto(i);return n})}getLayoutBounds(){return et(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)return{width:this.cellW*10,height:this.cellH*10};let[e,n]=this.tsneData.dim,i=e*this.cellW+this.cellW/2,s=n*this.cellH;return{width:i,height:s}})}setWorkspaceId(e){return et(this,null,function*(){this.workspaceId!==e&&(this.workspaceId=e,this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData())})}getWorkspaceId(){return this.workspaceId}getTsneInfo(){return this.tsneData?{workspaceId:this.workspaceId,gridSize:this.tsneData.dim,itemCount:this.tsneData.grid.length,workspaceConfigUrl:this.workspaceConfigUrl,tsneConfigUrl:this.tsneConfigUrl||"not set",setId:this.currentSetId||-1,stateHash:this.currentStateHash||"not set"}:null}getWorldPositionForId(e){if(!this.tsneData)return null;let n=this.tsneData.grid.find(i=>i.id===e);return n?this.convertTsneToWorldCoordinates(n.pos,this.tsneData.dim):null}getClustersWithWorldCoords(){if(!this.tsneData||!this.tsneData.clusters)return[];let e=this.tsneData.dim;return this.tsneData.clusters.map(n=>{let[[i,s],[o,a]]=n.bounds,c=this.convertTsneToWorldCoordinates([(i+o)/2,(s+a)/2],e);return{title:n.title,centerX:c.x,centerY:c.y,width:Math.abs(o-i)*this.cellW,height:Math.abs(a-s)*this.cellH,averageRotation:n.average_rotation??0}})}};var ue={LAYOUT_TRANSITION_DURATION:.54,LAYOUT_STAGGER_DELAY:.014,NEW_PHOTO_ANIMATION_DURATION:3,SHOWCASE_FORWARD_DURATION:.6,SHOWCASE_RETURN_DURATION:.6,NEW_PHOTO_ANIMATION_DELAY:5e3,SHOWCASE_INTERVAL:500,MAX_NEW_PHOTO_DELAY:1500,MAX_SHOWCASE_DURATION:5e3,CAMERA_BOUNDS_UPDATE_DEBOUNCE:100,GRID_SPIRAL_ANIMATION_DURATION:1100,NEW_PHOTO_STAGGER_DELAY:6500,API_POLLING_INTERVAL:3e4,QR_SHRINK_DELAY:1e4,INITIAL_POLLING_DELAY:1e3,INACTIVITY_TIMEOUT:36e5,OPACITY_FADE_DURATION:.4,INVISIBLE_POSITION_TRANSITION_DURATION:.4,CAMERA_BOUNDS_ANIMATION_DURATION:3};var xr=class r{photos=new Map;layoutStrategy=null;renderer=null;enableRandomShowcase=!1;enableSvgAutoPositioning=!1;isDragEnabled=!1;isDragAllEnabled=!1;userAuthorId=null;svgVisible=!1;svgStrategy=null;showcaseInterval=ue.SHOWCASE_INTERVAL;newPhotoAnimationDelay=ue.NEW_PHOTO_ANIMATION_DELAY;showcaseTimer=null;isShowcasing=!1;photoQueue=[];photoAddedSubject=new Nn;photoRemovedSubject=new Nn;layoutChangedSubject=new Nn;photoAdded$=this.photoAddedSubject.asObservable();photoRemoved$=this.photoRemovedSubject.asObservable();layoutChanged$=this.layoutChangedSubject.asObservable();constructor(){}initialize(i,s){return et(this,arguments,function*(t,e,n={}){this.layoutStrategy=t,this.renderer=e,this.enableRandomShowcase=n.enableRandomShowcase??!1,this.showcaseInterval=n.showcaseInterval??ue.SHOWCASE_INTERVAL,this.newPhotoAnimationDelay=n.newPhotoAnimationDelay??ue.NEW_PHOTO_ANIMATION_DELAY,yield this.layoutStrategy.initialize(),this.updateShowcaseLoop()})}addPhoto(t){return et(this,null,function*(){if(this.photos.has(t.id))return this.photos.get(t.id);if(!this.layoutStrategy||!this.renderer)throw new Error("Repository not initialized");let e=new pr(t,{x:0,y:0,z:0});this.photos.set(t.id,e),this.layoutStrategy.addPhoto(e);let n=!1;if(this.layoutStrategy.requiresFullRecalculationOnAdd()){let s=Array.from(this.photos.values()),o=yield this.layoutStrategy.calculateAllPositions(s),a=this.layoutStrategy.getConfiguration().name;this.shouldApplyDragOverrides(a)&&s.forEach((l,h)=>{let u=this.getDragPositionOverride(l);u&&(o[h]=u)});let c=[];s.forEach((l,h)=>{let u=o[h];if(u&&u.x!==void 0&&u.y!==void 0){let d={x:u.x,y:u.y,z:0};if(l.setProperty("opacity",1),l.setTargetPosition(d),l.mesh&&l.id!==e.id){let p=l.currentPosition,g=l.getProperty("opacity")||1;c.push(this.animateToPositionWithOpacityUpdate(l,p,d,g,1,ue.LAYOUT_TRANSITION_DURATION))}u.metadata&&l.updateMetadata(u.metadata),u.gridKey&&l.setProperty("gridKey",u.gridKey),l.id===e.id&&(n=!0)}else{let d={x:0,y:0,z:0};if(l.setProperty("opacity",0),l.setTargetPosition(d),l.mesh&&l.id!==e.id){let p=l.currentPosition,g=l.getProperty("opacity")||1;c.push(this.animateToPositionWithOpacityUpdate(l,p,d,g,0,ue.LAYOUT_TRANSITION_DURATION))}}}),c.length>0&&(yield Promise.all(c))}else{let s=this.getDragPositionOverride(e);s||(s=yield this.layoutStrategy.getPositionForPhoto(e,Array.from(this.photos.values()))),n=!!(s&&s.x!==void 0&&s.y!==void 0),n&&s?(e.setProperty("opacity",1),e.setTargetPosition({x:s.x,y:s.y,z:0}),s.metadata&&e.updateMetadata(s.metadata),s.gridKey&&e.setProperty("gridKey",s.gridKey)):(e.setProperty("opacity",0),e.setTargetPosition({x:0,y:0,z:0}))}let i=yield this.renderer.createPhotoMesh(e);return e.setMesh(i),this.renderer.setMeshPhotoId(i,e.id),this.renderer.setMeshPhotoData(i,e),this.setupHoverDetectionForPhoto(e),this.svgVisible&&this.setupDragForPhoto(e),n?(e.setCurrentPosition(e.targetPosition),this.renderer.updateMeshPosition(i,e.targetPosition),e.setAnimationState("positioned"),i.material&&"opacity"in i.material&&(i.material.opacity=e.getProperty("opacity")??1,i.material.transparent=!0)):i.material&&"opacity"in i.material&&(i.material.opacity=0,i.material.transparent=!0),n&&this.photoQueue.push(t.id),n&&this.updateCamera(),this.photoAddedSubject.next(e),e})}removePhoto(t){let e=this.photos.get(t);return e?(e.mesh&&this.renderer&&this.renderer.removeMesh(e.mesh),this.layoutStrategy&&this.layoutStrategy.removePhoto(t),e.dispose(),this.photos.delete(t),this.updateCamera(),this.photoRemovedSubject.next(t),!0):!1}getPhoto(t){return this.photos.get(t)}getAllPhotos(){return Array.from(this.photos.values())}getPhotoById(t){return this.photos.get(t)}getLayoutStrategy(){return this.layoutStrategy}getVisiblePhotos(){return this.getAllPhotos().filter(t=>(t.getProperty("opacity")??1)>0)}setLayoutStrategy(t){return et(this,null,function*(){if(!this.layoutStrategy||!this.renderer)throw new Error("PhotoDataRepository not initialized");let e=this.layoutStrategy.getConfiguration().name,n=t.getConfiguration().name;yield t.initialize();let i=Array.from(this.photos.values());for(let c of i)t.addPhoto(c);let s=yield t.calculateAllPositions(i,{enableAutoPositioning:this.enableSvgAutoPositioning});this.shouldApplyDragOverrides(n)&&i.forEach((c,l)=>{let h=this.getDragPositionOverride(c);h&&(s[l]=h)}),this.layoutStrategy=t,i.forEach((c,l)=>{let h=s[l];h!==null?(c.setProperty("opacity",1),c.setTargetPosition({x:h.x,y:h.y,z:c.targetPosition.z}),h.metadata&&c.updateMetadata(h.metadata),h.gridKey&&c.setProperty("gridKey",h.gridKey)):n==="svg-background"?c.setProperty("opacity",1):(c.setProperty("opacity",0),c.setTargetPosition({x:0,y:0,z:0}))});let o=i.map((c,l)=>et(this,null,function*(){let u=s[l]!==null,d=l*ue.LAYOUT_STAGGER_DELAY;d>0&&(yield new Promise(g=>setTimeout(g,d*1e3)));let p=c.mesh?.material&&"opacity"in c.mesh.material?c.mesh.material.opacity:1;if(u){if(c.mesh){let g={x:c.mesh.position.x,y:c.mesh.position.y,z:c.mesh.position.z};return this.animateToPositionWithOpacityUpdate(c,g,c.targetPosition,p,1,ue.LAYOUT_TRANSITION_DURATION)}}else{if(n==="svg-background")return Promise.resolve();if(c.mesh){let g={x:c.mesh.position.x,y:c.mesh.position.y,z:c.mesh.position.z};return this.animateToPositionWithOpacityUpdate(c,g,{x:0,y:0,z:0},p,0,ue.INVISIBLE_POSITION_TRANSITION_DURATION)}}})),a=this.updateCamera({animate:!0,force:!0});if(yield Promise.all([Promise.all(o.filter(Boolean)),a]),this.svgVisible)for(let c of i)c.mesh&&(this.renderer.setMeshPhotoId(c.mesh,c.id),this.renderer.setMeshPhotoData(c.mesh,c),this.setupDragForPhoto(c));else this.renderer.disableAllDragging();this.layoutChangedSubject.next()})}setRandomShowcaseEnabled(t){this.enableRandomShowcase=t,this.updateShowcaseLoop()}setSvgAutoPositioningEnabled(t){this.enableSvgAutoPositioning=t}shouldApplyDragOverrides(t){return this.svgVisible&&(t==="svg-background"||t==="circle-packing")}setDragEnabled(t){this.isDragEnabled=t,this.svgVisible&&this.refreshDragPermissions()}setDragAllEnabled(t){this.isDragAllEnabled=t,this.svgVisible&&this.refreshDragPermissions()}setUserAuthorId(t){this.userAuthorId=t,this.svgVisible&&this.refreshDragPermissions()}updateDragPermissions(t,e){this.isDragAllEnabled=t,this.userAuthorId=e,this.svgVisible&&this.refreshDragPermissions()}canDragPhoto(t){return!!(this.isDragEnabled||this.isDragAllEnabled||this.userAuthorId&&t.metadata.author_id===this.userAuthorId)}refreshDragPermissions(){this.renderer&&this.photos.forEach(t=>{t.mesh&&(this.canDragPhoto(t)?this.renderer.restoreDragForMesh(t.mesh)||this.renderer.enableDragForMesh(t.mesh,n=>{t.setCurrentPosition(n),t.setTargetPosition(n)}):this.renderer.disableDragForMesh(t.mesh))})}setSvgVisible(t,e){this.svgVisible=t,this.svgStrategy=t&&e?e:null}refreshLayout(){return et(this,null,function*(){if(!this.layoutStrategy){console.warn("Layout strategy not initialized");return}let t=Array.from(this.photos.values()),e=yield this.layoutStrategy.calculateAllPositions(t,{enableAutoPositioning:this.enableSvgAutoPositioning});t.forEach((s,o)=>{let a=this.getDragPositionOverride(s);a&&(e[o]=a)}),t.forEach((s,o)=>{let a=e[o];a!==null?(s.setProperty("opacity",1),s.setTargetPosition({x:a.x,y:a.y,z:s.targetPosition.z}),a.metadata&&s.updateMetadata(a.metadata),a.gridKey&&s.setProperty("gridKey",a.gridKey)):(s.setProperty("opacity",0),s.setTargetPosition({x:0,y:0,z:0}))});let n=t.map((s,o)=>et(this,null,function*(){let a=e[o],c=o*ue.LAYOUT_STAGGER_DELAY;c>0&&(yield new Promise(u=>setTimeout(u,c*1e3)));let l=a!==null,h=s.mesh?.material&&"opacity"in s.mesh.material?s.mesh.material.opacity:1;if(l){if(s.mesh){let u={x:s.mesh.position.x,y:s.mesh.position.y,z:s.mesh.position.z};return this.animateToPositionWithOpacityUpdate(s,u,s.targetPosition,h,1,ue.LAYOUT_TRANSITION_DURATION)}}else if(s.mesh){let u={x:s.mesh.position.x,y:s.mesh.position.y,z:s.mesh.position.z};return this.animateToPositionWithOpacityUpdate(s,u,{x:0,y:0,z:0},h,0,ue.INVISIBLE_POSITION_TRANSITION_DURATION)}})),i=this.updateCamera({animate:!0,force:!0});yield Promise.all([Promise.all(n.filter(Boolean)),i]),this.layoutChangedSubject.next()})}isRandomShowcaseEnabled(){return this.enableRandomShowcase}getQueueLength(){return this.photoQueue.length}clearQueue(){this.photoQueue=[]}getQueue(){return[...this.photoQueue]}showcasePhoto(t){return et(this,null,function*(){let e=this.photos.get(t);if(!(!e||!e.mesh||!this.renderer)&&!this.isShowcasing){this.isShowcasing=!0;try{yield this.renderer.upgradeToHighResTexture(e.mesh,e.url);let n=e.currentPosition.z,s={x:0,y:0,z:this.renderer.getCameraSpawnZ()-100},o={x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z};yield this.animateToPositionWithUpdate(e,o,s,ue.SHOWCASE_FORWARD_DURATION),yield new Promise(l=>setTimeout(l,Math.min(this.newPhotoAnimationDelay,ue.MAX_SHOWCASE_DURATION)));let a=Je(Wt({},e.targetPosition),{z:n}),c={x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z};yield this.animateToPositionWithUpdate(e,c,a,ue.SHOWCASE_RETURN_DURATION),e.setAnimationState("positioned"),yield this.renderer.downgradeToLowResTexture(e.mesh,e.url)}finally{this.isShowcasing=!1}}})}get photoAdded(){return this.photoAdded$}get photoRemoved(){return this.photoRemoved$}get layoutChanged(){return this.layoutChanged$}dispose(){this.showcaseTimer&&(clearTimeout(this.showcaseTimer),this.showcaseTimer=null),this.photos.forEach(t=>{t.mesh&&this.renderer&&this.renderer.removeMesh(t.mesh),t.dispose()}),this.photos.clear(),this.layoutStrategy&&this.layoutStrategy.dispose(),this.photoAddedSubject.complete(),this.photoRemovedSubject.complete(),this.layoutChangedSubject.complete()}animateNewPhoto(t){return et(this,null,function*(){if(!t.mesh||!this.renderer)return;t.setAnimationState("spawning");let n={x:0,y:0,z:this.renderer.getCameraSpawnZ()-100};t.setCurrentPosition(n),this.renderer.updateMeshPosition(t.mesh,n),yield new Promise(i=>setTimeout(i,Math.min(this.newPhotoAnimationDelay,ue.NEW_PHOTO_ANIMATION_DELAY))),t.setAnimationState("floating_back"),yield this.animateToPositionWithOpacityUpdate(t,n,t.targetPosition,0,1,ue.NEW_PHOTO_ANIMATION_DURATION),t.setAnimationState("positioned"),yield this.updateCamera({animate:!0})})}updateShowcaseLoop(){this.showcaseTimer&&(clearTimeout(this.showcaseTimer),this.showcaseTimer=null),this.enableRandomShowcase&&this.scheduleRandomShowcase()}scheduleRandomShowcase(){this.enableRandomShowcase&&(this.showcaseTimer=setTimeout(()=>et(this,null,function*(){if(this.isShowcasing){this.scheduleRandomShowcase();return}let t;if(this.photoQueue.length>0)t=this.photoQueue.shift();else{let e=this.getVisiblePhotos();e.length>0&&(t=e[Math.floor(Math.random()*e.length)].id)}t&&(yield this.showcasePhoto(t)),this.scheduleRandomShowcase()}),this.showcaseInterval))}computeSceneBounds(){let e=this.getVisiblePhotos().map(i=>({x:i.targetPosition.x,y:i.targetPosition.y})),n=this.calculateBounds(e);if(this.svgVisible&&this.svgStrategy){let i=this.svgStrategy.getSvgBounds();n={minX:Math.min(n.minX,i.minX),maxX:Math.max(n.maxX,i.maxX),minY:Math.min(n.minY,i.minY),maxY:Math.max(n.maxY,i.maxY)}}return n}updateCamera(t){if(!this.renderer)return Promise.resolve();let e=this.computeSceneBounds();return this.renderer.setSceneBounds(e,{animate:t?.animate??!1,force:t?.force??!1})}animateToPositionWithUpdate(t,e,n,i){return et(this,null,function*(){t.mesh&&(yield this.renderer.animateToPosition(t.mesh,e,n,i),t.setCurrentPosition(n))})}animateToPositionWithOpacityUpdate(t,e,n,i,s,o){return et(this,null,function*(){t.mesh&&(yield this.renderer.animatePositionAndOpacity(t.mesh,e,n,i,s,o),t.setCurrentPosition(n),t.setProperty("opacity",s))})}setupDragForPhoto(t){if(!(!t.mesh||!this.renderer||!this.layoutStrategy)){if(!this.canDragPhoto(t)){this.setupHoverDetectionForPhoto(t);return}this.renderer.setLayoutStrategy(this.svgStrategy||this.layoutStrategy),this.renderer.setMeshPhotoData(t.mesh,t),this.renderer.enableDragForMesh(t.mesh,e=>{t.setCurrentPosition(e),t.setTargetPosition(e)})}}getDragPositionOverride(t){if(!this.svgVisible||!this.svgStrategy)return null;let e=t.metadata.layout_x,n=t.metadata.layout_y;if(typeof e=="number"&&typeof n=="number"){let{x:i,y:s}=this.svgStrategy.normalizedToWorld(e,n);return{x:i,y:s,metadata:{layoutType:"restored-normalized",layout_x:e,layout_y:n}}}return null}setupHoverDetectionForPhoto(t){!t.mesh||!this.renderer||this.renderer.enableHoverForMesh(t.mesh)}calculateBounds(t){if(t.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let e=Lt.PHOTO_WIDTH/2,n=Lt.PHOTO_HEIGHT/2,i=t[0].x-e,s=t[0].x+e,o=t[0].y-n,a=t[0].y+n;for(let c of t)i=Math.min(i,c.x-e),s=Math.max(s,c.x+e),o=Math.min(o,c.y-n),a=Math.max(a,c.y+n);return{minX:i,maxX:s,minY:o,maxY:a}}static \u0275fac=function(e){return new(e||r)};static \u0275prov=Hi({token:r,factory:r.\u0275fac,providedIn:"root"})};var uo="179";var Ac=0,Ga=1,Pc=2;var Wa=1,Rc=2,Pn=3,Xn=0,Ye=1,Rn=2,Zn=0,Si=1,Xa=2,Ya=3,qa=4,Ic=5,oi=100,Oc=101,Lc=102,Dc=103,Fc=104,Nc=200,Uc=201,Bc=202,Hc=203,zr=204,Vr=205,kc=206,zc=207,Vc=208,Gc=209,Wc=210,Xc=211,Yc=212,qc=213,Zc=214,fo=0,po=1,mo=2,Ti=3,go=4,yo=5,vo=6,_o=7,Za=0,$c=1,Kc=2,$n=0,Jc=1,jc=2,Qc=3,th=4,eh=5,nh=6,ih=7;var Fa=300,Ri=301,Ii=302,xo=303,bo=304,Zs=306,Gr=1e3,Tn=1001,Wr=1002,hn=1003,sh=1004;var $s=1005;var Xe=1006,Mo=1007;var In=1008;var On=1009,$a=1010,Ka=1011,hs=1012,So=1013,ui=1014,Ln=1015,us=1016,To=1017,wo=1018,ds=1020,Ja=35902,ja=1021,Qa=1022,dn=1023,ns=1026,fs=1027,tl=1028,Eo=1029,el=1030,Co=1031;var Ao=1033,Ks=33776,Js=33777,js=33778,Qs=33779,Po=35840,Ro=35841,Io=35842,Oo=35843,Lo=36196,Do=37492,Fo=37496,No=37808,Uo=37809,Bo=37810,Ho=37811,ko=37812,zo=37813,Vo=37814,Go=37815,Wo=37816,Xo=37817,Yo=37818,qo=37819,Zo=37820,$o=37821,tr=36492,Ko=36494,Jo=36495,nl=36283,jo=36284,Qo=36285,ta=36286;var Os=2300,Xr=2301,Hr=2302,Na=2400,Ua=2401,Ba=2402;var rh=3200,oh=3201;var ah=0,lh=1,Kn="",Ee="srgb",wi="srgb-linear",Ls="linear",se="srgb";var Mi=7680;var Ha=519,ch=512,hh=513,uh=514,il=515,dh=516,fh=517,ph=518,mh=519,ka=35044;var sl="300 es",vn=2e3,Ds=2001;var Yn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lc=1234567,Rs=Math.PI/180,is=180/Math.PI;function ps(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[r&255]+Ue[r>>8&255]+Ue[r>>16&255]+Ue[r>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Zt(r,t,e){return Math.max(t,Math.min(e,r))}function rl(r,t){return(r%t+t)%t}function mu(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function gu(r,t,e){return r!==t?(e-r)/(t-r):0}function Is(r,t,e){return(1-e)*r+e*t}function yu(r,t,e,n){return Is(r,t,1-Math.exp(-e*n))}function vu(r,t=1){return t-Math.abs(rl(r,t*2)-t)}function _u(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function xu(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function bu(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Mu(r,t){return r+Math.random()*(t-r)}function Su(r){return r*(.5-Math.random())}function Tu(r){r!==void 0&&(lc=r);let t=lc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function wu(r){return r*Rs}function Eu(r){return r*is}function Cu(r){return(r&r-1)===0&&r!==0}function Au(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Pu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ru(r,t,e,n,i){let s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),p=s((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*g,c*p,a*l);break;case"YXY":r.set(c*p,a*h,c*g,a*l);break;case"ZYZ":r.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ts(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function We(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var ie={DEG2RAD:Rs,RAD2DEG:is,generateUUID:ps,clamp:Zt,euclideanModulo:rl,mapLinear:mu,inverseLerp:gu,lerp:Is,damp:yu,pingpong:vu,smoothstep:_u,smootherstep:xu,randInt:bu,randFloat:Mu,randFloatSpread:Su,seededRandom:Tu,degToRad:wu,radToDeg:Eu,isPowerOfTwo:Cu,ceilPowerOfTwo:Au,floorPowerOfTwo:Pu,setQuaternionFromProperEuler:Ru,normalize:We,denormalize:ts},$t=class r{constructor(t=0,e=0){r.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qn=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=s[o+0],p=s[o+1],g=s[o+2],y=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=y;return}if(u!==y||c!==d||l!==p||h!==g){let m=1-a,f=c*d+l*p+h*g+u*y,w=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){let C=Math.sqrt(S),A=Math.atan2(C,f*w);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}let x=a*w;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+y*x,m===1-a){let C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+h*u+c*p-l*d,t[e+1]=c*g+h*d+l*u-a*p,t[e+2]=l*g+h*p+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),p=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(o-i)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(s-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class r{constructor(t=0,e=0,n=0){r.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return pa.copy(this).projectOnVector(t),this.sub(pa)}reflect(t){return this.sub(pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},pa=new N,cc=new qn,Ut=class r{constructor(t,e,n,i,s,o,a,c,l){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],y=i[0],m=i[3],f=i[6],w=i[1],S=i[4],x=i[7],C=i[2],A=i[5],R=i[8];return s[0]=o*y+a*w+c*C,s[3]=o*m+a*S+c*A,s[6]=o*f+a*x+c*R,s[1]=l*y+h*w+u*C,s[4]=l*m+h*S+u*A,s[7]=l*f+h*x+u*R,s[2]=d*y+p*w+g*C,s[5]=d*m+p*S+g*A,s[8]=d*f+p*x+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*s,p=l*s-o*c,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=u*y,t[1]=(i*l-h*n)*y,t[2]=(a*n-i*o)*y,t[3]=d*y,t[4]=(h*e-i*c)*y,t[5]=(i*s-a*e)*y,t[6]=p*y,t[7]=(n*c-l*e)*y,t[8]=(o*e-n*s)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ma.makeScale(t,e)),this}rotate(t){return this.premultiply(ma.makeRotation(-t)),this}translate(t,e){return this.premultiply(ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ma=new Ut;function ol(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ss(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gh(){let r=ss("canvas");return r.style.display="block",r}var hc={};function Ei(r){r in hc||(hc[r]=!0,console.warn(r))}function yh(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}var uc=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dc=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Iu(){let r={enabled:!0,workingColorSpace:wi,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===se&&(i.r=Wn(i.r),i.g=Wn(i.g),i.b=Wn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===se&&(i.r=es(i.r),i.g=es(i.g),i.b=es(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Kn?Ls:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ei("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ei("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[wi]:{primaries:t,whitePoint:n,transfer:Ls,toXYZ:uc,fromXYZ:dc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:n,transfer:se,toXYZ:uc,fromXYZ:dc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),r}var Jt=Iu();function Wn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function es(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var zi,Yr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{zi===void 0&&(zi=ss("canvas")),zi.width=t.width,zi.height=t.height;let i=zi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=zi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ss("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Wn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wn(e[n]/255)*255):e[n]=Wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ou=0,rs=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=ps(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(ga(i[o].image)):s.push(ga(i[o]))}else s=ga(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function ga(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Yr.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Lu=0,ya=new N,sn=(()=>{class r extends Yn{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=Tn,s=Tn,o=Xe,a=In,c=dn,l=On,h=r.DEFAULT_ANISOTROPY,u=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=ps(),this.name="",this.source=new rs(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ya).x}get height(){return this.source.getSize(ya).y}get depth(){return this.source.getSize(ya).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fa)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gr:e.x=e.x-Math.floor(e.x);break;case Tn:e.x=e.x<0?0:1;break;case Wr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gr:e.y=e.y-Math.floor(e.y);break;case Tn:e.y=e.y<0?0:1;break;case Wr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}return r.DEFAULT_IMAGE=null,r.DEFAULT_MAPPING=Fa,r.DEFAULT_ANISOTROPY=1,r})(),xe=class r{constructor(t=0,e=0,n=0,i=1){r.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],y=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(l+1)/2,x=(p+1)/2,C=(f+1)/2,A=(h+d)/4,R=(u+y)/4,D=(g+m)/4;return S>x&&S>C?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=A/n,s=R/n):x>C?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=A/i,s=D/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=R/s,i=D/s),this.set(n,i,s,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-y)/w,this.z=(d-h)/w,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qr=class extends Yn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);let i={width:t,height:e,depth:n.depth},s=new sn(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new rs(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},En=class extends qr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Fs=class extends sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Zr=class extends sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mn):mn.fromBufferAttribute(s,o),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),br.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),br.copy(n.boundingBox)),br.applyMatrix4(t.matrixWorld),this.union(br)}let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),Mr.subVectors(this.max,Es),Vi.subVectors(t.a,Es),Gi.subVectors(t.b,Es),Wi.subVectors(t.c,Es),Qn.subVectors(Gi,Vi),ti.subVectors(Wi,Gi),vi.subVectors(Vi,Wi);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-vi.z,vi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,vi.z,0,-vi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-vi.y,vi.x,0];return!va(e,Vi,Gi,Wi,Mr)||(e=[1,0,0,0,1,0,0,0,1],!va(e,Vi,Gi,Wi,Mr))?!1:(Sr.crossVectors(Qn,ti),e=[Sr.x,Sr.y,Sr.z],va(e,Vi,Gi,Wi,Mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Bn=[new N,new N,new N,new N,new N,new N,new N,new N],mn=new N,br=new Cn,Vi=new N,Gi=new N,Wi=new N,Qn=new N,ti=new N,vi=new N,Es=new N,Mr=new N,Sr=new N,_i=new N;function va(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){_i.fromArray(r,s);let a=i.x*Math.abs(_i.x)+i.y*Math.abs(_i.y)+i.z*Math.abs(_i.z),c=t.dot(_i),l=e.dot(_i),h=n.dot(_i);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Du=new Cn,Cs=new N,_a=new N,os=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Du.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Cs.subVectors(t,this.center);let e=Cs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Cs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Cs.copy(t.center).add(_a)),this.expandByPoint(Cs.copy(t.center).sub(_a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Hn=new N,xa=new N,Tr=new N,ei=new N,ba=new N,wr=new N,Ma=new N,Ns=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Hn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hn.copy(this.origin).addScaledVector(this.direction,e),Hn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){xa.copy(t).add(e).multiplyScalar(.5),Tr.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(xa);let s=t.distanceTo(e)*.5,o=-this.direction.dot(Tr),a=ei.dot(this.direction),c=-ei.dot(Tr),l=ei.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=s*h,u>=0)if(d>=-g)if(d<=g){let y=1/h;u*=y,d*=y,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(xa).addScaledVector(Tr,d),p}intersectSphere(t,e){Hn.subVectors(t.center,this.origin);let n=Hn.dot(this.direction),i=Hn.dot(Hn)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Hn)!==null}intersectTriangle(t,e,n,i,s){ba.subVectors(e,t),wr.subVectors(n,t),Ma.crossVectors(ba,wr);let o=this.direction.dot(Ma),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ei.subVectors(this.origin,t);let c=a*this.direction.dot(wr.crossVectors(ei,wr));if(c<0)return null;let l=a*this.direction.dot(ba.cross(ei));if(l<0||c+l>o)return null;let h=-a*ei.dot(Ma);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},_e=class r{constructor(t,e,n,i,s,o,a,c,l,h,u,d,p,g,y,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,h,u,d,p,g,y,m)}set(t,e,n,i,s,o,a,c,l,h,u,d,p,g,y,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Xi.setFromMatrixColumn(t,0).length(),s=1/Xi.setFromMatrixColumn(t,1).length(),o=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,y=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=d-y*l,e[9]=-a*c,e[2]=y-d*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,p=c*u,g=l*h,y=l*u;e[0]=d+y*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=y+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,p=c*u,g=l*h,y=l*u;e[0]=d-y*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,y=a*u;e[0]=c*h,e[4]=g*l-p,e[8]=d*l+y,e[1]=c*u,e[5]=y*l+d,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,p=o*l,g=a*c,y=a*l;e[0]=c*h,e[4]=y-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+g,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*c,p=o*l,g=a*c,y=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+y,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Fu,t,Nu)}lookAt(t,e,n){let i=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),ni.crossVectors(n,je),ni.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),ni.crossVectors(n,je)),ni.normalize(),Er.crossVectors(je,ni),i[0]=ni.x,i[4]=Er.x,i[8]=je.x,i[1]=ni.y,i[5]=Er.y,i[9]=je.y,i[2]=ni.z,i[6]=Er.z,i[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],y=n[6],m=n[10],f=n[14],w=n[3],S=n[7],x=n[11],C=n[15],A=i[0],R=i[4],D=i[8],M=i[12],b=i[1],E=i[5],V=i[9],H=i[13],X=i[2],Z=i[6],Y=i[10],$=i[14],k=i[3],ot=i[7],ut=i[11],St=i[15];return s[0]=o*A+a*b+c*X+l*k,s[4]=o*R+a*E+c*Z+l*ot,s[8]=o*D+a*V+c*Y+l*ut,s[12]=o*M+a*H+c*$+l*St,s[1]=h*A+u*b+d*X+p*k,s[5]=h*R+u*E+d*Z+p*ot,s[9]=h*D+u*V+d*Y+p*ut,s[13]=h*M+u*H+d*$+p*St,s[2]=g*A+y*b+m*X+f*k,s[6]=g*R+y*E+m*Z+f*ot,s[10]=g*D+y*V+m*Y+f*ut,s[14]=g*M+y*H+m*$+f*St,s[3]=w*A+S*b+x*X+C*k,s[7]=w*R+S*E+x*Z+C*ot,s[11]=w*D+S*V+x*Y+C*ut,s[15]=w*M+S*H+x*$+C*St,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],y=t[7],m=t[11],f=t[15];return g*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*p-n*c*p)+y*(+e*c*p-e*l*d+s*o*d-i*o*p+i*l*h-s*c*h)+m*(+e*l*u-e*a*p-s*o*u+n*o*p+s*a*h-n*l*h)+f*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],y=t[13],m=t[14],f=t[15],w=u*m*l-y*d*l+y*c*p-a*m*p-u*c*f+a*d*f,S=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,x=h*y*l-g*u*l+g*a*p-o*y*p-h*a*f+o*u*f,C=g*u*c-h*y*c-g*a*d+o*y*d+h*a*m-o*u*m,A=e*w+n*S+i*x+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return t[0]=w*R,t[1]=(y*d*s-u*m*s-y*i*p+n*m*p+u*i*f-n*d*f)*R,t[2]=(a*m*s-y*c*s+y*i*l-n*m*l-a*i*f+n*c*f)*R,t[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*p-n*c*p)*R,t[4]=S*R,t[5]=(h*m*s-g*d*s+g*i*p-e*m*p-h*i*f+e*d*f)*R,t[6]=(g*c*s-o*m*s-g*i*l+e*m*l+o*i*f-e*c*f)*R,t[7]=(o*d*s-h*c*s+h*i*l-e*d*l-o*i*p+e*c*p)*R,t[8]=x*R,t[9]=(g*u*s-h*y*s-g*n*p+e*y*p+h*n*f-e*u*f)*R,t[10]=(o*y*s-g*a*s+g*n*l-e*y*l-o*n*f+e*a*f)*R,t[11]=(h*a*s-o*u*s-h*n*l+e*u*l+o*n*p-e*a*p)*R,t[12]=C*R,t[13]=(h*y*i-g*u*i+g*n*d-e*y*d-h*n*m+e*u*m)*R,t[14]=(g*a*i-o*y*i-g*n*c+e*y*c+o*n*m-e*a*m)*R,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*R,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,u=a+a,d=s*l,p=s*h,g=s*u,y=o*h,m=o*u,f=a*u,w=c*l,S=c*h,x=c*u,C=n.x,A=n.y,R=n.z;return i[0]=(1-(y+f))*C,i[1]=(p+x)*C,i[2]=(g-S)*C,i[3]=0,i[4]=(p-x)*A,i[5]=(1-(d+f))*A,i[6]=(m+w)*A,i[7]=0,i[8]=(g+S)*R,i[9]=(m-w)*R,i[10]=(1-(d+y))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=Xi.set(i[0],i[1],i[2]).length(),o=Xi.set(i[4],i[5],i[6]).length(),a=Xi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],gn.copy(this);let l=1/s,h=1/o,u=1/a;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=u,gn.elements[9]*=u,gn.elements[10]*=u,e.setFromRotationMatrix(gn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=vn,c=!1){let l=this.elements,h=2*s/(e-t),u=2*s/(n-i),d=(e+t)/(e-t),p=(n+i)/(n-i),g,y;if(c)g=s/(o-s),y=o*s/(o-s);else if(a===vn)g=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Ds)g=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=vn,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),p=-(n+i)/(n-i),g,y;if(c)g=1/(o-s),y=o/(o-s);else if(a===vn)g=-2/(o-s),y=-(o+s)/(o-s);else if(a===Ds)g=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new N,gn=new _e,Fu=new N(0,0,0),Nu=new N(1,1,1),ni=new N,Er=new N,je=new N,fc=new _e,pc=new qn,Ci=(()=>{class r{constructor(e=0,n=0,i=0,s=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,s=this._order){return this._x=e,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){let s=e.elements,o=s[0],a=s[4],c=s[8],l=s[1],h=s[5],u=s[9],d=s[2],p=s[6],g=s[10];switch(n){case"XYZ":this._y=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,g),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(c,g));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return fc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fc,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return pc.setFromEuler(this),this.setFromQuaternion(pc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return r.DEFAULT_ORDER="XYZ",r})(),as=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Uu=0,mc=new N,Yi=new qn,kn=new _e,Cr=new N,As=new N,Bu=new N,Hu=new qn,gc=new N(1,0,0),yc=new N(0,1,0),vc=new N(0,0,1),_c={type:"added"},ku={type:"removed"},qi={type:"childadded",child:null},Sa={type:"childremoved",child:null},di=(()=>{class r extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new N,n=new Ci,i=new qn,s=new N(1,1,1);function o(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new Ut}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new as,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Yi.setFromAxisAngle(e,n),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,n){return Yi.setFromAxisAngle(e,n),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(gc,e)}rotateY(e){return this.rotateOnAxis(yc,e)}rotateZ(e){return this.rotateOnAxis(vc,e)}translateOnAxis(e,n){return mc.copy(e).applyQuaternion(this.quaternion),this.position.add(mc.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(gc,e)}translateY(e){return this.translateOnAxis(yc,e)}translateZ(e){return this.translateOnAxis(vc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Cr.copy(e):Cr.set(e,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(As,Cr,this.up):kn.lookAt(Cr,As,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(kn),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_c),qi.child=e,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(ku),Sa.child=e,this.dispatchEvent(Sa),Sa.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_c),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,e,Bu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,Hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>Je(Wt({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>Wt({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(e.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){let d=l[h];o(e.shapes,d)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,h=this.material.length;l<h;l++)c.push(o(e.materials,this.material[l]));s.material=c}else s.material=o(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(e.animations,l))}}if(n){let c=a(e.geometries),l=a(e.materials),h=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),g=a(e.animations),y=a(e.nodes);c.length>0&&(i.geometries=c),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),y.length>0&&(i.nodes=y)}return i.object=s,i;function a(c){let l=[];for(let h in c){let u=c[h];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}}return r.DEFAULT_UP=new N(0,1,0),r.DEFAULT_MATRIX_AUTO_UPDATE=!0,r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,r})(),yn=new N,zn=new N,Ta=new N,Vn=new N,Zi=new N,$i=new N,xc=new N,wa=new N,Ea=new N,Ca=new N,Aa=new xe,Pa=new xe,Ra=new xe,ri=class r{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),yn.subVectors(t,e),i.cross(yn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){yn.subVectors(i,e),zn.subVectors(n,e),Ta.subVectors(t,e);let o=yn.dot(yn),a=yn.dot(zn),c=yn.dot(Ta),l=zn.dot(zn),h=zn.dot(Ta),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,Vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Vn.x),c.addScaledVector(o,Vn.y),c.addScaledVector(a,Vn.z),c)}static getInterpolatedAttribute(t,e,n,i,s,o){return Aa.setScalar(0),Pa.setScalar(0),Ra.setScalar(0),Aa.fromBufferAttribute(t,e),Pa.fromBufferAttribute(t,n),Ra.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Aa,s.x),o.addScaledVector(Pa,s.y),o.addScaledVector(Ra,s.z),o}static isFrontFacing(t,e,n,i){return yn.subVectors(n,e),zn.subVectors(t,e),yn.cross(zn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),yn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,a;Zi.subVectors(i,n),$i.subVectors(s,n),wa.subVectors(t,n);let c=Zi.dot(wa),l=$i.dot(wa);if(c<=0&&l<=0)return e.copy(n);Ea.subVectors(t,i);let h=Zi.dot(Ea),u=$i.dot(Ea);if(h>=0&&u<=h)return e.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Zi,o);Ca.subVectors(t,s);let p=Zi.dot(Ca),g=$i.dot(Ca);if(g>=0&&p<=g)return e.copy(s);let y=p*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector($i,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return xc.subVectors(s,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(xc,a);let f=1/(m+y+d);return o=y*f,a=d*f,e.copy(n).addScaledVector(Zi,o).addScaledVector($i,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Ia(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var Qt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Jt.workingColorSpace){if(t=rl(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Ia(o,s,t+1/3),this.g=Ia(o,s,t),this.b=Ia(o,s,t-1/3)}return Jt.colorSpaceToWorking(this,i),this}setStyle(t,e=Ee){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let n=vh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Jt.workingToColorSpace(Be.copy(this),t),Math.round(Zt(Be.r*255,0,255))*65536+Math.round(Zt(Be.g*255,0,255))*256+Math.round(Zt(Be.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Be.copy(this),e);let n=Be.r,i=Be.g,s=Be.b,o=Math.max(n,i,s),a=Math.min(n,i,s),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Ee){Jt.workingToColorSpace(Be.copy(this),t);let e=Be.r,n=Be.g,i=Be.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(Ar);let n=Is(ii.h,Ar.h,e),i=Is(ii.s,Ar.s,e),s=Is(ii.l,Ar.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Qt;Qt.NAMES=vh;var zu=0,en=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=Si,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zr,this.blendDst=Vr,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Ti,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zr&&(n.blendSrc=this.blendSrc),this.blendDst!==Vr&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ti&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ha&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},un=class extends en{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ci,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new N,Pr=new $t,Vu=0,tn=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ka,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Pr.fromBufferAttribute(this,e),Pr.applyMatrix3(t),this.setXY(e,Pr.x,Pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ts(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ts(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ts(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ts(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ts(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ka&&(t.usage=this.usage),t}};var Us=class extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Bs=class extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var wn=class extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Gu=0,ln=new _e,Oa=new di,Ki=new N,Qe=new Cn,Ps=new Cn,Oe=new N,ai=class r extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ol(t)?Bs:Us)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ut().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return Oa.lookAt(t),Oa.updateMatrix(),this.applyMatrix4(Oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new wn(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];Qe.setFromBufferAttribute(s),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let a=e[s];Ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(Qe.min,Ps.min),Qe.expandByPoint(Oe),Oe.addVectors(Qe.max,Ps.max),Qe.expandByPoint(Oe)):(Qe.expandByPoint(Ps.min),Qe.expandByPoint(Ps.max))}Qe.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Oe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Oe));if(e)for(let s=0,o=e.length;s<o;s++){let a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Oe.fromBufferAttribute(a,l),c&&(Ki.fromBufferAttribute(t,l),Oe.add(Ki)),i=Math.max(i,n.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new N,c[D]=new N;let l=new N,h=new N,u=new N,d=new $t,p=new $t,g=new $t,y=new N,m=new N;function f(D,M,b){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,b),d.fromBufferAttribute(s,D),p.fromBufferAttribute(s,M),g.fromBufferAttribute(s,b),h.sub(l),u.sub(l),p.sub(d),g.sub(d);let E=1/(p.x*g.y-g.x*p.y);isFinite(E)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(E),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(E),a[D].add(y),a[M].add(y),a[b].add(y),c[D].add(m),c[M].add(m),c[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let D=0,M=w.length;D<M;++D){let b=w[D],E=b.start,V=b.count;for(let H=E,X=E+V;H<X;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let S=new N,x=new N,C=new N,A=new N;function R(D){C.fromBufferAttribute(i,D),A.copy(C);let M=a[D];S.copy(M),S.sub(C.multiplyScalar(C.dot(M))).normalize(),x.crossVectors(A,M);let E=x.dot(c[D])<0?-1:1;o.setXYZW(D,S.x,S.y,S.z,E)}for(let D=0,M=w.length;D<M;++D){let b=w[D],E=b.start,V=b.count;for(let H=E,X=E+V;H<X;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new N,s=new N,o=new N,a=new N,c=new N,l=new N,h=new N,u=new N;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),y=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?p=c[y]*a.data.stride+a.offset:p=c[y]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new tn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=t(c,n);e.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=t(d,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(e))}let s=t.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bc=new _e,xi=new Ns,Rr=new os,Mc=new N,Ir=new N,Or=new N,Lr=new N,La=new N,Dr=new N,Sc=new N,Fr=new N,Fe=class extends di{constructor(t=new ai,e=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){Dr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=a[c],u=s[c];h!==0&&(La.fromBufferAttribute(u,t),o?Dr.addScaledVector(La,h):Dr.addScaledVector(La.sub(e),h))}e.add(Dr)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),xi.copy(t.ray).recast(t.near),!(Rr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(Rr,Mc)===null||xi.origin.distanceToSquared(Mc)>(t.far-t.near)**2))&&(bc.copy(s).invert(),xi.copy(t.ray).applyMatrix4(bc),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xi)))}_computeIntersections(t,e,n){let i,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=w,C=S;x<C;x+=3){let A=a.getX(x),R=a.getX(x+1),D=a.getX(x+2);i=Nr(this,f,t,n,l,h,u,A,R,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){let w=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);i=Nr(this,o,t,n,l,h,u,w,S,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=w,C=S;x<C;x+=3){let A=x,R=x+1,D=x+2;i=Nr(this,f,t,n,l,h,u,A,R,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){let w=m,S=m+1,x=m+2;i=Nr(this,o,t,n,l,h,u,w,S,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Wu(r,t,e,n,i,s,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===Xn,a),c===null)return null;Fr.copy(a),Fr.applyMatrix4(r.matrixWorld);let l=e.ray.origin.distanceTo(Fr);return l<e.near||l>e.far?null:{distance:l,point:Fr.clone(),object:r}}function Nr(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,Ir),r.getVertexPosition(c,Or),r.getVertexPosition(l,Lr);let h=Wu(r,t,e,n,Ir,Or,Lr,Sc);if(h){let u=new N;ri.getBarycoord(Sc,Ir,Or,Lr,u),i&&(h.uv=ri.getInterpolatedAttribute(i,a,c,l,u,new $t)),s&&(h.uv1=ri.getInterpolatedAttribute(s,a,c,l,u,new $t)),o&&(h.normal=ri.getInterpolatedAttribute(o,a,c,l,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new N,materialIndex:0};ri.getNormal(Ir,Or,Lr,d.normal),h.face=d,h.barycoord=u}return h}var ls=class r extends ai{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};let a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new wn(l,3)),this.setAttribute("normal",new wn(h,3)),this.setAttribute("uv",new wn(u,2));function g(y,m,f,w,S,x,C,A,R,D,M){let b=x/R,E=C/D,V=x/2,H=C/2,X=A/2,Z=R+1,Y=D+1,$=0,k=0,ot=new N;for(let ut=0;ut<Y;ut++){let St=ut*E-H;for(let kt=0;kt<Z;kt++){let de=kt*b-V;ot[y]=de*w,ot[m]=St*S,ot[f]=X,l.push(ot.x,ot.y,ot.z),ot[y]=0,ot[m]=0,ot[f]=A>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(kt/R),u.push(1-ut/D),$+=1}}for(let ut=0;ut<D;ut++)for(let St=0;St<R;St++){let kt=d+St+Z*ut,de=d+St+Z*(ut+1),oe=d+(St+1)+Z*(ut+1),W=d+(St+1)+Z*ut;c.push(kt,de,W),c.push(de,oe,W),k+=6}a.addGroup(p,k,M),p+=k,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Oi(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ke(r){let t={};for(let e=0;e<r.length;e++){let n=Oi(r[e]);for(let i in n)t[i]=n[i]}return t}function Xu(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function al(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}var _h={clone:Oi,merge:ke},Yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends en{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yu,this.fragmentShader=qu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Oi(t.uniforms),this.uniformsGroups=Xu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Hs=class extends di{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=vn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},si=new N,Tc=new $t,wc=new $t,He=class extends Hs{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return is*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(si.x,si.y).multiplyScalar(-t/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-t/si.z)}getViewSize(t,e){return this.getViewBounds(t,Tc,wc),e.subVectors(wc,Tc)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ji=-90,ji=1,$r=class extends di{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new He(Ji,ji,t,e);i.layers=this.layers,this.add(i);let s=new He(Ji,ji,t,e);s.layers=this.layers,this.add(s);let o=new He(Ji,ji,t,e);o.layers=this.layers,this.add(o);let a=new He(Ji,ji,t,e);a.layers=this.layers,this.add(a);let c=new He(Ji,ji,t,e);c.layers=this.layers,this.add(c);let l=new He(Ji,ji,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(let l of e)this.remove(l);if(t===vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ks=class extends sn{constructor(t=[],e=Ri,n,i,s,o,a,c,l,h){super(t,e,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Kr=class extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ks(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ls(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:Oi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Zn});s.uniforms.tEquirect.value=e;let o=new Fe(i,s),a=e.minFilter;return e.minFilter===In&&(e.minFilter=Xe),new $r(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}},Gn=class extends di{constructor(){super(),this.isGroup=!0,this.type="Group"}},Zu={type:"move"},cs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,n),f=this._getHandJoint(l,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Zu)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Gn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var zs=class extends di{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ci,this.environmentIntensity=1,this.environmentRotation=new Ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Da=new N,$u=new N,Ku=new Ut,cn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Da.subVectors(n,e).cross($u.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Da),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ku.getNormalMatrix(t),i=this.coplanarPoint(Da).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},bi=new os,Ju=new $t(.5,.5),Ur=new N,Ai=class{constructor(t=new cn,e=new cn,n=new cn,i=new cn,s=new cn,o=new cn){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vn,n=!1){let i=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],p=s[7],g=s[8],y=s[9],m=s[10],f=s[11],w=s[12],S=s[13],x=s[14],C=s[15];if(i[0].setComponents(l-o,p-h,f-g,C-w).normalize(),i[1].setComponents(l+o,p+h,f+g,C+w).normalize(),i[2].setComponents(l+a,p+u,f+y,C+S).normalize(),i[3].setComponents(l-a,p-u,f-y,C-S).normalize(),n)i[4].setComponents(c,d,m,x).normalize(),i[5].setComponents(l-c,p-d,f-m,C-x).normalize();else if(i[4].setComponents(l-c,p-d,f-m,C-x).normalize(),e===vn)i[5].setComponents(l+c,p+d,f+m,C+x).normalize();else if(e===Ds)i[5].setComponents(c,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(t){bi.center.set(0,0,0);let e=Ju.distanceTo(t.center);return bi.radius=.7071067811865476+e,bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Ur.x=i.normal.x>0?t.max.x:t.min.x,Ur.y=i.normal.y>0?t.max.y:t.min.y,Ur.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var li=class extends sn{constructor(t,e,n,i,s,o,a,c,l){super(t,e,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Vs=class extends sn{constructor(t,e,n=ui,i,s,o,a=hn,c=hn,l,h=ns,u=1){if(h!==ns&&h!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new rs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}};var An=class r extends ai{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,p=[],g=[],y=[],m=[];for(let f=0;f<h;f++){let w=f*d-o;for(let S=0;S<l;S++){let x=S*u-s;g.push(x,-w,0),y.push(0,0,1),m.push(S/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let w=0;w<a;w++){let S=w+l*f,x=w+l*(f+1),C=w+1+l*(f+1),A=w+1+l*f;p.push(S,x,A),p.push(x,C,A)}this.setIndex(p),this.setAttribute("position",new wn(g,3)),this.setAttribute("normal",new wn(y,3)),this.setAttribute("uv",new wn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}};var Jr=class extends en{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},jr=class extends en{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Br(r,t){return!r||r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function ju(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var Pi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Qr=class extends Pi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Na,endingEnd:Na}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ua:s=t,a=2*e-n;break;case Ba:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ua:o=t,c=2*n-e;break;case Ba:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(i-e),y=g*g,m=y*g,f=-d*m+2*d*y-d*g,w=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*g+1,S=(-1-p)*m+(1.5+p)*y+.5*g,x=p*m-p*y;for(let C=0;C!==a;++C)s[C]=f*o[h+C]+w*o[l+C]+S*o[c+C]+x*o[u+C];return s}},to=class extends Pi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}},eo=class extends Pi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},nn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Br(e,this.TimeBufferType),this.values=Br(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Br(t.times,Array),values:Br(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new eo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new to(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Qr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Os:e=this.InterpolantFactoryMethodDiscrete;break;case Xr:e=this.InterpolantFactoryMethodLinear;break;case Hr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Os;case this.InterpolantFactoryMethodLinear:return Xr;case this.InterpolantFactoryMethodSmooth:return Hr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&ju(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Hr,s=t.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let y=e[u+g];if(y!==e[d+g]||y!==e[p+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};nn.prototype.ValueTypeName="";nn.prototype.TimeBufferType=Float32Array;nn.prototype.ValueBufferType=Float32Array;nn.prototype.DefaultInterpolation=Xr;var ci=class extends nn{constructor(t,e,n){super(t,e,n)}};ci.prototype.ValueTypeName="bool";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=Os;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends nn{constructor(t,e,n,i){super(t,e,n,i)}};no.prototype.ValueTypeName="color";var io=class extends nn{constructor(t,e,n,i){super(t,e,n,i)}};io.prototype.ValueTypeName="number";var so=class extends Pi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e),l=t*a;for(let h=l+a;l!==h;l+=4)qn.slerpFlat(s,0,o,l-a,o,l,c);return s}},Gs=class extends nn{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new so(this.times,this.values,this.getValueSize(),t)}};Gs.prototype.ValueTypeName="quaternion";Gs.prototype.InterpolantFactoryMethodSmooth=void 0;var hi=class extends nn{constructor(t,e,n){super(t,e,n)}};hi.prototype.ValueTypeName="string";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=Os;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends nn{constructor(t,e,n,i){super(t,e,n,i)}};ro.prototype.ValueTypeName="vector";var kr={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},oo=class{constructor(t,e,n){let i=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},xh=new oo,ll=(()=>{class r{constructor(e){this.manager=e!==void 0?e:xh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let i=this;return new Promise(function(s,o){i.load(e,s,n,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}return r.DEFAULT_MATERIAL_NAME="__DEFAULT",r})();var Qi=new WeakMap,ao=class extends ll{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let s=this,o=kr.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0);else{let u=Qi.get(o);u===void 0&&(u=[],Qi.set(o,u)),u.push({onLoad:e,onError:i})}return o}let a=ss("img");function c(){h(),e&&e(this);let u=Qi.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}Qi.delete(this),s.manager.itemEnd(t)}function l(u){h(),i&&i(u),kr.remove(`image:${t}`);let d=Qi.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u)}Qi.delete(this),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),kr.add(`image:${t}`,a),s.manager.itemStart(t),a.src=t,a}};var Ws=class extends ll{constructor(t){super(t)}load(t,e,n,i){let s=new sn,o=new ao(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}},lo=class extends di{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var co=class extends Hs{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Xs=class extends lo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var ho=class extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Ys=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var cl="\\[\\]\\.:\\/",Qu=new RegExp("["+cl+"]","g"),hl="[^"+cl+"]",td="[^"+cl.replace("\\.","")+"]",ed=/((?:WC+[\/:])*)/.source.replace("WC",hl),nd=/(WCOD+)?/.source.replace("WCOD",td),id=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",hl),sd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",hl),rd=new RegExp("^"+ed+nd+id+sd+"$"),od=["material","materials","bones","map"],za=class{constructor(t,e,n){let i=n||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ve=(()=>{class r{constructor(e,n,i){this.path=n,this.parsedPath=i||r.parseTrackName(n),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new r.Composite(e,n,i):new r(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Qu,"")}static parseTrackName(e){let n=rd.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=i.nodeName.substring(s+1);od.indexOf(o)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=o)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){let i=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===n||c.uuid===n)return c;let l=i(c.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let i=this.resolvedProperty;for(let s=0,o=i.length;s!==o;++s)e[n++]=i[s]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let i=this.resolvedProperty;for(let s=0,o=i.length;s!==o;++s)i[s]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let s=0,o=i.length;s!==o;++s)i[s]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let s=0,o=i.length;s!==o;++s)i[s]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,o=n.propertyIndex;if(e||(e=r.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(h!==void 0){if(e[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let a=e[s];if(a===void 0){let h=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",e);return}let c=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?c=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return r.Composite=za,r})();ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sv=new Float32Array(1);var Ec=new _e,qs=class{constructor(t,e,n=0,i=1/0){this.ray=new Ns(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new as,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ec.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ec),this}intersectObject(t,e=!0,n=[]){return Va(t,this,n,e),n.sort(Cc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Va(t[i],this,n,e);return n.sort(Cc),n}};function Cc(r,t){return r.distance-t.distance}function Va(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let o=0,a=s.length;o<a;o++)Va(s[o],t,e,!0)}}function ul(r,t,e,n){let i=ad(n);switch(e){case ja:return r*t;case tl:return r*t/i.components*i.byteLength;case Eo:return r*t/i.components*i.byteLength;case el:return r*t*2/i.components*i.byteLength;case Co:return r*t*2/i.components*i.byteLength;case Qa:return r*t*3/i.components*i.byteLength;case dn:return r*t*4/i.components*i.byteLength;case Ao:return r*t*4/i.components*i.byteLength;case Ks:case Js:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case js:case Qs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ro:case Oo:return Math.max(r,16)*Math.max(t,8)/4;case Po:case Io:return Math.max(r,8)*Math.max(t,8)/2;case Lo:case Do:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Fo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case No:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Uo:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case ko:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case zo:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Go:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Wo:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case qo:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Zo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case $o:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case tr:case Ko:case Jo:return Math.ceil(r/4)*Math.ceil(t/4)*16;case nl:case jo:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Qo:case ta:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ad(r){switch(r){case On:case $a:return{byteLength:1,components:1};case hs:case Ka:case us:return{byteLength:2,components:1};case To:case wo:return{byteLength:2,components:4};case ui:case So:case Ln:return{byteLength:4,components:1};case Ja:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uo);function Wh(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function ld(r){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=r.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=r.SHORT;else if(l instanceof Uint32Array)p=r.UNSIGNED_INT;else if(l instanceof Int32Array)p=r.INT;else if(l instanceof Int8Array)p=r.BYTE;else if(l instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(r.bindBuffer(l,a),u.length===0)r.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,u[d]=y)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let y=u[p];r.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}var cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hd=`#ifdef USE_ALPHAHASH
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
#endif`,ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,md=`#ifdef USE_AOMAP
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
#endif`,gd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yd=`#ifdef USE_BATCHING
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
#endif`,vd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_d=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Md=`#ifdef USE_IRIDESCENCE
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
#endif`,Sd=`#ifdef USE_BUMPMAP
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
#endif`,Td=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Id=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Od=`#define PI 3.141592653589793
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
} // validated`,Ld=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dd=`vec3 transformedNormal = objectNormal;
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
#endif`,Fd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ud=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hd="gl_FragColor = linearToOutputTexel( gl_FragColor );",kd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zd=`#ifdef USE_ENVMAP
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
#endif`,Vd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gd=`#ifdef USE_ENVMAP
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
#endif`,Wd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xd=`#ifdef USE_ENVMAP
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
#endif`,Yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kd=`#ifdef USE_GRADIENTMAP
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
}`,Jd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tf=`uniform bool receiveShadow;
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
#endif`,ef=`#ifdef USE_ENVMAP
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
#endif`,nf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,af=`PhysicalMaterial material;
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
#endif`,lf=`struct PhysicalMaterial {
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
}`,cf=`
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
#endif`,hf=`#if defined( RE_IndirectDiffuse )
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
#endif`,uf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,df=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ff=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_f=`#if defined( USE_POINTS_UV )
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
#endif`,xf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wf=`#ifdef USE_MORPHTARGETS
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
#endif`,Ef=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Af=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,If=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Of=`#ifdef USE_NORMALMAP
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
#endif`,Lf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Df=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zf=`float getShadowMask() {
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
}`,$f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kf=`#ifdef USE_SKINNING
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
#endif`,Jf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jf=`#ifdef USE_SKINNING
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
#endif`,Qf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,np=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ip=`#ifdef USE_TRANSMISSION
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
#endif`,sp=`#ifdef USE_TRANSMISSION
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
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,cp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hp=`uniform sampler2D t2D;
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
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mp=`#include <common>
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
}`,gp=`#if DEPTH_PACKING == 3200
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
}`,yp=`#define DISTANCE
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
}`,vp=`#define DISTANCE
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
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`uniform float scale;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,Sp=`#include <common>
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
}`,Tp=`uniform vec3 diffuse;
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
}`,wp=`#define LAMBERT
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
}`,Ep=`#define LAMBERT
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
}`,Cp=`#define MATCAP
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
}`,Ap=`#define MATCAP
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
}`,Pp=`#define NORMAL
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
}`,Rp=`#define NORMAL
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
}`,Ip=`#define PHONG
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
}`,Op=`#define PHONG
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
}`,Lp=`#define STANDARD
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
}`,Dp=`#define STANDARD
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
}`,Fp=`#define TOON
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
}`,Np=`#define TOON
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
}`,Up=`uniform float size;
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
}`,Bp=`uniform vec3 diffuse;
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
}`,Hp=`#include <common>
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
}`,kp=`uniform vec3 color;
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
}`,zp=`uniform float rotation;
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
}`,Vp=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:cd,alphahash_pars_fragment:hd,alphamap_fragment:ud,alphamap_pars_fragment:dd,alphatest_fragment:fd,alphatest_pars_fragment:pd,aomap_fragment:md,aomap_pars_fragment:gd,batching_pars_vertex:yd,batching_vertex:vd,begin_vertex:_d,beginnormal_vertex:xd,bsdfs:bd,iridescence_fragment:Md,bumpmap_pars_fragment:Sd,clipping_planes_fragment:Td,clipping_planes_pars_fragment:wd,clipping_planes_pars_vertex:Ed,clipping_planes_vertex:Cd,color_fragment:Ad,color_pars_fragment:Pd,color_pars_vertex:Rd,color_vertex:Id,common:Od,cube_uv_reflection_fragment:Ld,defaultnormal_vertex:Dd,displacementmap_pars_vertex:Fd,displacementmap_vertex:Nd,emissivemap_fragment:Ud,emissivemap_pars_fragment:Bd,colorspace_fragment:Hd,colorspace_pars_fragment:kd,envmap_fragment:zd,envmap_common_pars_fragment:Vd,envmap_pars_fragment:Gd,envmap_pars_vertex:Wd,envmap_physical_pars_fragment:ef,envmap_vertex:Xd,fog_vertex:Yd,fog_pars_vertex:qd,fog_fragment:Zd,fog_pars_fragment:$d,gradientmap_pars_fragment:Kd,lightmap_pars_fragment:Jd,lights_lambert_fragment:jd,lights_lambert_pars_fragment:Qd,lights_pars_begin:tf,lights_toon_fragment:nf,lights_toon_pars_fragment:sf,lights_phong_fragment:rf,lights_phong_pars_fragment:of,lights_physical_fragment:af,lights_physical_pars_fragment:lf,lights_fragment_begin:cf,lights_fragment_maps:hf,lights_fragment_end:uf,logdepthbuf_fragment:df,logdepthbuf_pars_fragment:ff,logdepthbuf_pars_vertex:pf,logdepthbuf_vertex:mf,map_fragment:gf,map_pars_fragment:yf,map_particle_fragment:vf,map_particle_pars_fragment:_f,metalnessmap_fragment:xf,metalnessmap_pars_fragment:bf,morphinstance_vertex:Mf,morphcolor_vertex:Sf,morphnormal_vertex:Tf,morphtarget_pars_vertex:wf,morphtarget_vertex:Ef,normal_fragment_begin:Cf,normal_fragment_maps:Af,normal_pars_fragment:Pf,normal_pars_vertex:Rf,normal_vertex:If,normalmap_pars_fragment:Of,clearcoat_normal_fragment_begin:Lf,clearcoat_normal_fragment_maps:Df,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:Nf,opaque_fragment:Uf,packing:Bf,premultiplied_alpha_fragment:Hf,project_vertex:kf,dithering_fragment:zf,dithering_pars_fragment:Vf,roughnessmap_fragment:Gf,roughnessmap_pars_fragment:Wf,shadowmap_pars_fragment:Xf,shadowmap_pars_vertex:Yf,shadowmap_vertex:qf,shadowmask_pars_fragment:Zf,skinbase_vertex:$f,skinning_pars_vertex:Kf,skinning_vertex:Jf,skinnormal_vertex:jf,specularmap_fragment:Qf,specularmap_pars_fragment:tp,tonemapping_fragment:ep,tonemapping_pars_fragment:np,transmission_fragment:ip,transmission_pars_fragment:sp,uv_pars_fragment:rp,uv_pars_vertex:op,uv_vertex:ap,worldpos_vertex:lp,background_vert:cp,background_frag:hp,backgroundCube_vert:up,backgroundCube_frag:dp,cube_vert:fp,cube_frag:pp,depth_vert:mp,depth_frag:gp,distanceRGBA_vert:yp,distanceRGBA_frag:vp,equirect_vert:_p,equirect_frag:xp,linedashed_vert:bp,linedashed_frag:Mp,meshbasic_vert:Sp,meshbasic_frag:Tp,meshlambert_vert:wp,meshlambert_frag:Ep,meshmatcap_vert:Cp,meshmatcap_frag:Ap,meshnormal_vert:Pp,meshnormal_frag:Rp,meshphong_vert:Ip,meshphong_frag:Op,meshphysical_vert:Lp,meshphysical_frag:Dp,meshtoon_vert:Fp,meshtoon_frag:Np,points_vert:Up,points_frag:Bp,shadow_vert:Hp,shadow_frag:kp,sprite_vert:zp,sprite_frag:Vp},rt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},Dn={basic:{uniforms:ke([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:ke([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:ke([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:ke([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:ke([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:ke([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:ke([rt.points,rt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:ke([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:ke([rt.common,rt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:ke([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:ke([rt.sprite,rt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:ke([rt.common,rt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:ke([rt.lights,rt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Dn.physical={uniforms:ke([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var ea={r:0,b:0,g:0},Li=new Ci,Gp=new _e;function Wp(r,t,e,n,i,s,o){let a=new Qt(0),c=s===!0?0:1,l,h,u=null,d=0,p=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function y(S){let x=!1,C=g(S);C===null?f(a,c):C&&C.isColor&&(f(C,1),x=!0);let A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,x){let C=g(x);C&&(C.isCubeTexture||C.mapping===Zs)?(h===void 0&&(h=new Fe(new ls(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Oi(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Li.copy(x.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gp.makeRotationFromEuler(Li)),h.material.toneMapped=Jt.getTransfer(C.colorSpace)!==se,(u!==C||d!==C.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,p=r.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Fe(new An(2,2),new _n({name:"BackgroundMaterial",uniforms:Oi(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(C.colorSpace)!==se,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||p!==r.toneMapping)&&(l.material.needsUpdate=!0,u=C,d=C.version,p=r.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,x){S.getRGB(ea,al(r)),n.buffers.color.setClear(ea.r,ea.g,ea.b,x,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),c=x,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(a,c)},render:y,addToRenderList:m,dispose:w}}function Xp(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null),s=i,o=!1;function a(b,E,V,H,X){let Z=!1,Y=u(H,V,E);s!==Y&&(s=Y,l(s.object)),Z=p(b,H,V,X),Z&&g(b,H,V,X),X!==null&&t.update(X,r.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(b,E,V,H),X!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return r.createVertexArray()}function l(b){return r.bindVertexArray(b)}function h(b){return r.deleteVertexArray(b)}function u(b,E,V){let H=V.wireframe===!0,X=n[b.id];X===void 0&&(X={},n[b.id]=X);let Z=X[E.id];Z===void 0&&(Z={},X[E.id]=Z);let Y=Z[H];return Y===void 0&&(Y=d(c()),Z[H]=Y),Y}function d(b){let E=[],V=[],H=[];for(let X=0;X<e;X++)E[X]=0,V[X]=0,H[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:V,attributeDivisors:H,object:b,attributes:{},index:null}}function p(b,E,V,H){let X=s.attributes,Z=E.attributes,Y=0,$=V.getAttributes();for(let k in $)if($[k].location>=0){let ut=X[k],St=Z[k];if(St===void 0&&(k==="instanceMatrix"&&b.instanceMatrix&&(St=b.instanceMatrix),k==="instanceColor"&&b.instanceColor&&(St=b.instanceColor)),ut===void 0||ut.attribute!==St||St&&ut.data!==St.data)return!0;Y++}return s.attributesNum!==Y||s.index!==H}function g(b,E,V,H){let X={},Z=E.attributes,Y=0,$=V.getAttributes();for(let k in $)if($[k].location>=0){let ut=Z[k];ut===void 0&&(k==="instanceMatrix"&&b.instanceMatrix&&(ut=b.instanceMatrix),k==="instanceColor"&&b.instanceColor&&(ut=b.instanceColor));let St={};St.attribute=ut,ut&&ut.data&&(St.data=ut.data),X[k]=St,Y++}s.attributes=X,s.attributesNum=Y,s.index=H}function y(){let b=s.newAttributes;for(let E=0,V=b.length;E<V;E++)b[E]=0}function m(b){f(b,0)}function f(b,E){let V=s.newAttributes,H=s.enabledAttributes,X=s.attributeDivisors;V[b]=1,H[b]===0&&(r.enableVertexAttribArray(b),H[b]=1),X[b]!==E&&(r.vertexAttribDivisor(b,E),X[b]=E)}function w(){let b=s.newAttributes,E=s.enabledAttributes;for(let V=0,H=E.length;V<H;V++)E[V]!==b[V]&&(r.disableVertexAttribArray(V),E[V]=0)}function S(b,E,V,H,X,Z,Y){Y===!0?r.vertexAttribIPointer(b,E,V,X,Z):r.vertexAttribPointer(b,E,V,H,X,Z)}function x(b,E,V,H){y();let X=H.attributes,Z=V.getAttributes(),Y=E.defaultAttributeValues;for(let $ in Z){let k=Z[$];if(k.location>=0){let ot=X[$];if(ot===void 0&&($==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),$==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor)),ot!==void 0){let ut=ot.normalized,St=ot.itemSize,kt=t.get(ot);if(kt===void 0)continue;let de=kt.buffer,oe=kt.type,W=kt.bytesPerElement,at=oe===r.INT||oe===r.UNSIGNED_INT||ot.gpuType===So;if(ot.isInterleavedBufferAttribute){let it=ot.data,Ct=it.stride,At=ot.offset;if(it.isInstancedInterleavedBuffer){for(let Dt=0;Dt<k.locationSize;Dt++)f(k.location+Dt,it.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let Dt=0;Dt<k.locationSize;Dt++)m(k.location+Dt);r.bindBuffer(r.ARRAY_BUFFER,de);for(let Dt=0;Dt<k.locationSize;Dt++)S(k.location+Dt,St/k.locationSize,oe,ut,Ct*W,(At+St/k.locationSize*Dt)*W,at)}else{if(ot.isInstancedBufferAttribute){for(let it=0;it<k.locationSize;it++)f(k.location+it,ot.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let it=0;it<k.locationSize;it++)m(k.location+it);r.bindBuffer(r.ARRAY_BUFFER,de);for(let it=0;it<k.locationSize;it++)S(k.location+it,St/k.locationSize,oe,ut,St*W,St/k.locationSize*it*W,at)}}else if(Y!==void 0){let ut=Y[$];if(ut!==void 0)switch(ut.length){case 2:r.vertexAttrib2fv(k.location,ut);break;case 3:r.vertexAttrib3fv(k.location,ut);break;case 4:r.vertexAttrib4fv(k.location,ut);break;default:r.vertexAttrib1fv(k.location,ut)}}}}w()}function C(){D();for(let b in n){let E=n[b];for(let V in E){let H=E[V];for(let X in H)h(H[X].object),delete H[X];delete E[V]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;let E=n[b.id];for(let V in E){let H=E[V];for(let X in H)h(H[X].object),delete H[X];delete E[V]}delete n[b.id]}function R(b){for(let E in n){let V=n[E];if(V[b.id]===void 0)continue;let H=V[b.id];for(let X in H)h(H[X].object),delete H[X];delete V[b.id]}}function D(){M(),o=!0,s!==i&&(s=i,l(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:m,disableUnusedAttributes:w}}function Yp(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function c(l,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*d[y];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function qp(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==dn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let D=R===us&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==On&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ln&&!D)}function c(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),w=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:C,maxSamples:A}}function Zp(r){let t=this,e=null,n=0,i=!1,s=!1,o=new cn,a=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):l();else{let w=s?0:n,S=w*4,x=f.clippingState||null;c.value=x,x=h(g,d,S,p);for(let C=0;C!==S;++C)x[C]=e[C];f.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let f=p+y*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,x=p;S!==y;++S,x+=4)o.copy(u[S]).applyMatrix4(w,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function $p(r){let t=new WeakMap;function e(o,a){return a===xo?o.mapping=Ri:a===bo&&(o.mapping=Ii),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===xo||a===bo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Kr(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var gs=4,bh=[.125,.215,.35,.446,.526,.582],Ni=20,dl=new co,Mh=new Qt,fl=null,pl=0,ml=0,gl=!1,Fi=(1+Math.sqrt(5))/2,ms=1/Fi,Sh=[new N(-Fi,ms,0),new N(Fi,ms,0),new N(-ms,0,Fi),new N(ms,0,Fi),new N(0,Fi,-ms),new N(0,Fi,ms),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],Kp=new N,sa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,s={}){let{size:o=256,position:a=Kp}=s;fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,pl,ml),this._renderer.xr.enabled=gl,t.scissorTest=!1,na(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ri||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:us,format:dn,colorSpace:wi,depthBuffer:!1},i=Th(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Th(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jp(s)),this._blurMaterial=jp(s,t,e)}return i}_compileMaterial(t){let e=new Fe(this._lodPlanes[0],t);this._renderer.compile(e,dl)}_sceneToCubeUV(t,e,n,i,s){let c=new He(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Mh),u.toneMapping=$n,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let y=new un({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),m=new Fe(new ls,y),f=!1,w=t.background;w?w.isColor&&(y.color.copy(w),t.background=null,f=!0):(y.color.copy(Mh),f=!0);for(let S=0;S<6;S++){let x=S%3;x===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[S],s.y,s.z)):x===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[S]));let C=this._cubeSize;na(i,x*C,S>2?C:0,C,C),u.setRenderTarget(i),f&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Ri||t.mapping===Ii;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wh());let s=i?this._cubemapMaterial:this._equirectMaterial,o=new Fe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let c=this._cubeSize;na(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,dl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Sh[(i-s-1)%Sh.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Fe(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ni-1),y=s/g,m=isFinite(s)?1+Math.floor(h*y):Ni;m>Ni&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ni}`);let f=[],w=0;for(let R=0;R<Ni;++R){let D=R/y,M=Math.exp(-D*D/2);f.push(M),R===0?w+=M:R<m&&(w+=2*M)}for(let R=0;R<f.length;R++)f[R]=f[R]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;let x=this._sizeLods[i],C=3*x*(i>S-gs?i-S+gs:0),A=4*(this._cubeSize-x);na(e,C,A,3*x,2*x),c.setRenderTarget(e),c.render(u,dl)}};function Jp(r){let t=[],e=[],n=[],i=r,s=r-gs+1+bh.length;for(let o=0;o<s;o++){let a=Math.pow(2,i);e.push(a);let c=1/a;o>r-gs?c=bh[o-r+gs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,f=1,w=new Float32Array(y*g*p),S=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let A=0;A<p;A++){let R=A%3*2/3-1,D=A>2?0:-1,M=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];w.set(M,y*g*A),S.set(d,m*g*A);let b=[A,A,A,A,A,A];x.set(b,f*g*A)}let C=new ai;C.setAttribute("position",new tn(w,y)),C.setAttribute("uv",new tn(S,m)),C.setAttribute("faceIndex",new tn(x,f)),t.push(C),i>gs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Th(r,t,e){let n=new En(r,t,e);return n.texture.mapping=Zs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function na(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function jp(r,t,e){let n=new Float32Array(Ni),i=new N(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:El(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function wh(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:El(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Eh(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function El(){return`

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
	`}function Qp(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===xo||c===bo,h=c===Ri||c===Ii;if(l||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new sa(r)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return l&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new sa(r)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function tm(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Ei("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function em(r,t,e,n){let i={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let p in d)t.update(d[p],r.ARRAY_BUFFER)}function l(u){let d=[],p=u.index,g=u.attributes.position,y=0;if(p!==null){let w=p.array;y=p.version;for(let S=0,x=w.length;S<x;S+=3){let C=w[S+0],A=w[S+1],R=w[S+2];d.push(C,A,A,R,R,C)}}else if(g!==void 0){let w=g.array;y=g.version;for(let S=0,x=w.length/3-1;S<x;S+=3){let C=S+0,A=S+1,R=S+2;d.push(C,A,A,R,R,C)}}else return;let m=new(ol(d)?Bs:Us)(d,1);m.version=y;let f=s.get(u);f&&t.remove(f),s.set(u,m)}function h(u){let d=s.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function nm(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,p){r.drawElements(n,p,s,d*o),e.update(p,n,1)}function l(d,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,d*o,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,y){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],y[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,d,0,y,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*y[w];e.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function im(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function sm(r,t,e){let n=new WeakMap,i=new xe;function s(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var p=b;d!==void 0&&d.texture.dispose();let g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],x=0;g===!0&&(x=1),y===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,A=1;C>t.maxTextureSize&&(A=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);let R=new Float32Array(C*A*4*u),D=new Fs(R,C,A,u);D.type=Ln,D.needsUpdate=!0;let M=x*4;for(let E=0;E<u;E++){let V=f[E],H=w[E],X=S[E],Z=C*A*4*E;for(let Y=0;Y<V.count;Y++){let $=Y*M;g===!0&&(i.fromBufferAttribute(V,Y),R[Z+$+0]=i.x,R[Z+$+1]=i.y,R[Z+$+2]=i.z,R[Z+$+3]=0),y===!0&&(i.fromBufferAttribute(H,Y),R[Z+$+4]=i.x,R[Z+$+5]=i.y,R[Z+$+6]=i.z,R[Z+$+7]=0),m===!0&&(i.fromBufferAttribute(X,Y),R[Z+$+8]=i.x,R[Z+$+9]=i.y,R[Z+$+10]=i.z,R[Z+$+11]=X.itemSize===4?i.w:1)}}d={count:u,texture:D,size:new $t(C,A)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];let y=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",y),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function rm(r,t,e,n){let i=new WeakMap;function s(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}var Xh=new sn,Ch=new Vs(1,1),Yh=new Fs,qh=new Zr,Zh=new ks,Ah=[],Ph=[],Rh=new Float32Array(16),Ih=new Float32Array(9),Oh=new Float32Array(4);function vs(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=Ah[i];if(s===void 0&&(s=new Float32Array(i),Ah[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ce(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ae(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function oa(r,t){let e=Ph[t];e===void 0&&(e=new Int32Array(t),Ph[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function om(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function am(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;r.uniform2fv(this.addr,t),Ae(e,t)}}function lm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;r.uniform3fv(this.addr,t),Ae(e,t)}}function cm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;r.uniform4fv(this.addr,t),Ae(e,t)}}function hm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Ce(e,n))return;Oh.set(n),r.uniformMatrix2fv(this.addr,!1,Oh),Ae(e,n)}}function um(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Ce(e,n))return;Ih.set(n),r.uniformMatrix3fv(this.addr,!1,Ih),Ae(e,n)}}function dm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Ce(e,n))return;Rh.set(n),r.uniformMatrix4fv(this.addr,!1,Rh),Ae(e,n)}}function fm(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function pm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;r.uniform2iv(this.addr,t),Ae(e,t)}}function mm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;r.uniform3iv(this.addr,t),Ae(e,t)}}function gm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;r.uniform4iv(this.addr,t),Ae(e,t)}}function ym(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function vm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;r.uniform2uiv(this.addr,t),Ae(e,t)}}function _m(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;r.uniform3uiv(this.addr,t),Ae(e,t)}}function xm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;r.uniform4uiv(this.addr,t),Ae(e,t)}}function bm(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ch.compareFunction=il,s=Ch):s=Xh,e.setTexture2D(t||s,i)}function Mm(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||qh,i)}function Sm(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Zh,i)}function Tm(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Yh,i)}function wm(r){switch(r){case 5126:return om;case 35664:return am;case 35665:return lm;case 35666:return cm;case 35674:return hm;case 35675:return um;case 35676:return dm;case 5124:case 35670:return fm;case 35667:case 35671:return pm;case 35668:case 35672:return mm;case 35669:case 35673:return gm;case 5125:return ym;case 36294:return vm;case 36295:return _m;case 36296:return xm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return Tm}}function Em(r,t){r.uniform1fv(this.addr,t)}function Cm(r,t){let e=vs(t,this.size,2);r.uniform2fv(this.addr,e)}function Am(r,t){let e=vs(t,this.size,3);r.uniform3fv(this.addr,e)}function Pm(r,t){let e=vs(t,this.size,4);r.uniform4fv(this.addr,e)}function Rm(r,t){let e=vs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Im(r,t){let e=vs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Om(r,t){let e=vs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Lm(r,t){r.uniform1iv(this.addr,t)}function Dm(r,t){r.uniform2iv(this.addr,t)}function Fm(r,t){r.uniform3iv(this.addr,t)}function Nm(r,t){r.uniform4iv(this.addr,t)}function Um(r,t){r.uniform1uiv(this.addr,t)}function Bm(r,t){r.uniform2uiv(this.addr,t)}function Hm(r,t){r.uniform3uiv(this.addr,t)}function km(r,t){r.uniform4uiv(this.addr,t)}function zm(r,t,e){let n=this.cache,i=t.length,s=oa(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Xh,s[o])}function Vm(r,t,e){let n=this.cache,i=t.length,s=oa(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||qh,s[o])}function Gm(r,t,e){let n=this.cache,i=t.length,s=oa(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Zh,s[o])}function Wm(r,t,e){let n=this.cache,i=t.length,s=oa(e,i);Ce(n,s)||(r.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Yh,s[o])}function Xm(r){switch(r){case 5126:return Em;case 35664:return Cm;case 35665:return Am;case 35666:return Pm;case 35674:return Rm;case 35675:return Im;case 35676:return Om;case 5124:case 35670:return Lm;case 35667:case 35671:return Dm;case 35668:case 35672:return Fm;case 35669:case 35673:return Nm;case 5125:return Um;case 36294:return Bm;case 36295:return Hm;case 36296:return km;case 35678:case 36198:case 36298:case 36306:case 35682:return zm;case 35679:case 36299:case 36307:return Vm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return Wm}}var vl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wm(e.type)}},_l=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Xm(e.type)}},xl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,o=i.length;s!==o;++s){let a=i[s];a.setValue(t,e[a.id],n)}}},yl=/(\w+)(\])?(\[|\.)?/g;function Lh(r,t){r.seq.push(t),r.map[t.id]=t}function Ym(r,t,e){let n=r.name,i=n.length;for(yl.lastIndex=0;;){let s=yl.exec(n),o=yl.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Lh(e,l===void 0?new vl(a,r,t):new _l(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new xl(a),Lh(e,u)),e=u}}}var ys=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);Ym(s,o,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){let a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Dh(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var qm=37297,Zm=0;function $m(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Fh=new Ut;function Km(r){Jt._getMatrix(Fh,Jt.workingColorSpace,r);let t=`mat3( ${Fh.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(r)){case Ls:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Nh(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+$m(r.getShaderSource(t),a)}else return s}function Jm(r,t){let e=Km(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function jm(r,t){let e;switch(t){case Jc:e="Linear";break;case jc:e="Reinhard";break;case Qc:e="Cineon";break;case th:e="ACESFilmic";break;case nh:e="AgX";break;case ih:e="Neutral";break;case eh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ia=new N;function Qm(){Jt.getLuminanceCoefficients(ia);let r=ia.x.toFixed(4),t=ia.y.toFixed(4),e=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function eg(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ng(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),o=s.name,a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function er(r){return r!==""}function Uh(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ig=/^[ \t]*#include +<([\w\d./]+)>/gm;function bl(r){return r.replace(ig,rg)}var sg=new Map;function rg(r,t){let e=Ht[t];if(e===void 0){let n=sg.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return bl(e)}var og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(r){return r.replace(og,ag)}function ag(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function kh(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function lg(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Wa?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Rc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function cg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ri:case Ii:t="ENVMAP_TYPE_CUBE";break;case Zs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function hg(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ii:t="ENVMAP_MODE_REFRACTION";break}return t}function ug(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Za:t="ENVMAP_BLENDING_MULTIPLY";break;case $c:t="ENVMAP_BLENDING_MIX";break;case Kc:t="ENVMAP_BLENDING_ADD";break}return t}function dg(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function fg(r,t,e,n){let i=r.getContext(),s=e.defines,o=e.vertexShader,a=e.fragmentShader,c=lg(e),l=cg(e),h=hg(e),u=ug(e),d=dg(e),p=tg(e),g=eg(s),y=i.createProgram(),m,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(er).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(er).join(`
`),f.length>0&&(f+=`
`)):(m=[kh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),f=[kh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Ht.tonemapping_pars_fragment:"",e.toneMapping!==$n?jm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,Jm("linearToOutputTexel",e.outputColorSpace),Qm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(er).join(`
`)),o=bl(o),o=Uh(o,e),o=Bh(o,e),a=bl(a),a=Uh(a,e),a=Bh(a,e),o=Hh(o),a=Hh(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=w+m+o,x=w+f+a,C=Dh(i,i.VERTEX_SHADER,S),A=Dh(i,i.FRAGMENT_SHADER,x);i.attachShader(y,C),i.attachShader(y,A),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function R(E){if(r.debug.checkShaderErrors){let V=i.getProgramInfoLog(y)||"",H=i.getShaderInfoLog(C)||"",X=i.getShaderInfoLog(A)||"",Z=V.trim(),Y=H.trim(),$=X.trim(),k=!0,ot=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,C,A);else{let ut=Nh(i,C,"vertex"),St=Nh(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+Z+`
`+ut+`
`+St)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(Y===""||$==="")&&(ot=!1);ot&&(E.diagnostics={runnable:k,programLog:Z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:$,prefix:f}})}i.deleteShader(C),i.deleteShader(A),D=new ys(i,y),M=ng(i,y)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(y,qm)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Zm++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=A,this}var pg=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Sl(t),e.set(t,n)),n}},Sl=class{constructor(t){this.id=pg++,this.code=t,this.usedTimes=0}};function mg(r,t,e,n,i,s,o){let a=new as,c=new Ml,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,b,E,V,H){let X=V.fog,Z=H.geometry,Y=M.isMeshStandardMaterial?V.environment:null,$=(M.isMeshStandardMaterial?e:t).get(M.envMap||Y),k=$&&$.mapping===Zs?$.image.height:null,ot=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let ut=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,St=ut!==void 0?ut.length:0,kt=0;Z.morphAttributes.position!==void 0&&(kt=1),Z.morphAttributes.normal!==void 0&&(kt=2),Z.morphAttributes.color!==void 0&&(kt=3);let de,oe,W,at;if(ot){let ee=Dn[ot];de=ee.vertexShader,oe=ee.fragmentShader}else de=M.vertexShader,oe=M.fragmentShader,c.update(M),W=c.getVertexShaderID(M),at=c.getFragmentShaderID(M);let it=r.getRenderTarget(),Ct=r.state.buffers.depth.getReversed(),At=H.isInstancedMesh===!0,Dt=H.isBatchedMesh===!0,be=!!M.map,Kt=!!M.matcap,P=!!$,le=!!M.aoMap,wt=!!M.lightMap,te=!!M.bumpMap,Mt=!!M.normalMap,fe=!!M.displacementMap,mt=!!M.emissiveMap,zt=!!M.metalnessMap,Pe=!!M.roughnessMap,Me=M.anisotropy>0,T=M.clearcoat>0,v=M.dispersion>0,F=M.iridescence>0,G=M.sheen>0,K=M.transmission>0,z=Me&&!!M.anisotropyMap,bt=T&&!!M.clearcoatMap,nt=T&&!!M.clearcoatNormalMap,vt=T&&!!M.clearcoatRoughnessMap,_t=F&&!!M.iridescenceMap,Q=F&&!!M.iridescenceThicknessMap,ht=G&&!!M.sheenColorMap,Rt=G&&!!M.sheenRoughnessMap,xt=!!M.specularMap,lt=!!M.specularColorMap,Bt=!!M.specularIntensityMap,I=K&&!!M.transmissionMap,tt=K&&!!M.thicknessMap,st=!!M.gradientMap,ft=!!M.alphaMap,J=M.alphaTest>0,q=!!M.alphaHash,yt=!!M.extensions,Ft=$n;M.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ft=r.toneMapping);let ce={shaderID:ot,shaderType:M.type,shaderName:M.name,vertexShader:de,fragmentShader:oe,defines:M.defines,customVertexShaderID:W,customFragmentShaderID:at,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Dt,batchingColor:Dt&&H._colorsTexture!==null,instancing:At,instancingColor:At&&H.instanceColor!==null,instancingMorph:At&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:it===null?r.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:wi,alphaToCoverage:!!M.alphaToCoverage,map:be,matcap:Kt,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:k,aoMap:le,lightMap:wt,bumpMap:te,normalMap:Mt,displacementMap:d&&fe,emissiveMap:mt,normalMapObjectSpace:Mt&&M.normalMapType===lh,normalMapTangentSpace:Mt&&M.normalMapType===ah,metalnessMap:zt,roughnessMap:Pe,anisotropy:Me,anisotropyMap:z,clearcoat:T,clearcoatMap:bt,clearcoatNormalMap:nt,clearcoatRoughnessMap:vt,dispersion:v,iridescence:F,iridescenceMap:_t,iridescenceThicknessMap:Q,sheen:G,sheenColorMap:ht,sheenRoughnessMap:Rt,specularMap:xt,specularColorMap:lt,specularIntensityMap:Bt,transmission:K,transmissionMap:I,thicknessMap:tt,gradientMap:st,opaque:M.transparent===!1&&M.blending===Si&&M.alphaToCoverage===!1,alphaMap:ft,alphaTest:J,alphaHash:q,combine:M.combine,mapUv:be&&y(M.map.channel),aoMapUv:le&&y(M.aoMap.channel),lightMapUv:wt&&y(M.lightMap.channel),bumpMapUv:te&&y(M.bumpMap.channel),normalMapUv:Mt&&y(M.normalMap.channel),displacementMapUv:fe&&y(M.displacementMap.channel),emissiveMapUv:mt&&y(M.emissiveMap.channel),metalnessMapUv:zt&&y(M.metalnessMap.channel),roughnessMapUv:Pe&&y(M.roughnessMap.channel),anisotropyMapUv:z&&y(M.anisotropyMap.channel),clearcoatMapUv:bt&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:nt&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&y(M.sheenRoughnessMap.channel),specularMapUv:xt&&y(M.specularMap.channel),specularColorMapUv:lt&&y(M.specularColorMap.channel),specularIntensityMapUv:Bt&&y(M.specularIntensityMap.channel),transmissionMapUv:I&&y(M.transmissionMap.channel),thicknessMapUv:tt&&y(M.thicknessMap.channel),alphaMapUv:ft&&y(M.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Mt||Me),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(be||ft),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ct,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:kt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&E.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ft,decodeVideoTexture:be&&M.map.isVideoTexture===!0&&Jt.getTransfer(M.map.colorSpace)===se,decodeVideoTextureEmissive:mt&&M.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(M.emissiveMap.colorSpace)===se,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Rn,flipSided:M.side===Ye,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:yt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(yt&&M.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ce.vertexUv1s=l.has(1),ce.vertexUv2s=l.has(2),ce.vertexUv3s=l.has(3),l.clear(),ce}function f(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let E in M.defines)b.push(E),b.push(M.defines[E]);return M.isRawShaderMaterial===!1&&(w(b,M),S(b,M),b.push(r.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function w(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function S(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){let b=g[M.type],E;if(b){let V=Dn[b];E=_h.clone(V.uniforms)}else E=M.uniforms;return E}function C(M,b){let E;for(let V=0,H=h.length;V<H;V++){let X=h[V];if(X.cacheKey===b){E=X,++E.usedTimes;break}}return E===void 0&&(E=new fg(r,b,M,s),h.push(E)),E}function A(M){if(--M.usedTimes===0){let b=h.indexOf(M);h[b]=h[h.length-1],h.pop(),M.destroy()}}function R(M){c.remove(M)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:D}}function gg(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function yg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function zh(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Vh(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,p,g,y,m){let f=r[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},r[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=y,f.group=m),t++,f}function a(u,d,p,g,y,m){let f=o(u,d,p,g,y,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function c(u,d,p,g,y,m){let f=o(u,d,p,g,y,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||yg),n.length>1&&n.sort(d||zh),i.length>1&&i.sort(d||zh)}function h(){for(let u=t,d=r.length;u<d;u++){let p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function vg(){let r=new WeakMap;function t(n,i){let s=r.get(n),o;return s===void 0?(o=new Vh,r.set(n,[o])):i>=s.length?(o=new Vh,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function _g(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Qt};break;case"SpotLight":e={position:new N,direction:new N,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new N,halfWidth:new N,halfHeight:new N};break}return r[t.id]=e,e}}}function xg(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var bg=0;function Mg(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Sg(r){let t=new _g,e=xg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);let i=new N,s=new _e,o=new _e;function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,y=0,m=0,f=0,w=0,S=0,x=0,C=0,A=0,R=0;l.sort(Mg);for(let M=0,b=l.length;M<b;M++){let E=l[M],V=E.color,H=E.intensity,X=E.distance,Z=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=V.r*H,u+=V.g*H,d+=V.b*H;else if(E.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(E.sh.coefficients[Y],H);R++}else if(E.isDirectionalLight){let Y=t.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){let $=E.shadow,k=e.get(E);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.directionalShadow[p]=k,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=E.shadow.matrix,w++}n.directional[p]=Y,p++}else if(E.isSpotLight){let Y=t.get(E);Y.position.setFromMatrixPosition(E.matrixWorld),Y.color.copy(V).multiplyScalar(H),Y.distance=X,Y.coneCos=Math.cos(E.angle),Y.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),Y.decay=E.decay,n.spot[y]=Y;let $=E.shadow;if(E.map&&(n.spotLightMap[C]=E.map,C++,$.updateMatrices(E),E.castShadow&&A++),n.spotLightMatrix[y]=$.matrix,E.castShadow){let k=e.get(E);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.spotShadow[y]=k,n.spotShadowMap[y]=Z,x++}y++}else if(E.isRectAreaLight){let Y=t.get(E);Y.color.copy(V).multiplyScalar(H),Y.halfWidth.set(E.width*.5,0,0),Y.halfHeight.set(0,E.height*.5,0),n.rectArea[m]=Y,m++}else if(E.isPointLight){let Y=t.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),Y.distance=E.distance,Y.decay=E.decay,E.castShadow){let $=E.shadow,k=e.get(E);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,k.shadowCameraNear=$.camera.near,k.shadowCameraFar=$.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=E.shadow.matrix,S++}n.point[g]=Y,g++}else if(E.isHemisphereLight){let Y=t.get(E);Y.skyColor.copy(E.color).multiplyScalar(H),Y.groundColor.copy(E.groundColor).multiplyScalar(H),n.hemi[f]=Y,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let D=n.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==y||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==w||D.numPointShadows!==S||D.numSpotShadows!==x||D.numSpotMaps!==C||D.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,D.directionalLength=p,D.pointLength=g,D.spotLength=y,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=w,D.numPointShadows=S,D.numSpotShadows=x,D.numSpotMaps=C,D.numLightProbes=R,n.version=bg++)}function c(l,h){let u=0,d=0,p=0,g=0,y=0,m=h.matrixWorldInverse;for(let f=0,w=l.length;f<w;f++){let S=l[f];if(S.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(S.isSpotLight){let x=n.spot[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(S.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:a,setupView:c,state:n}}function Gh(r){let t=new Sg(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Tg(r){let t=new WeakMap;function e(i,s=0){let o=t.get(i),a;return o===void 0?(a=new Gh(r),t.set(i,[a])):s>=o.length?(a=new Gh(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Eg=`uniform sampler2D shadow_pass;
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
}`;function Cg(r,t,e){let n=new Ai,i=new $t,s=new $t,o=new xe,a=new Jr({depthPacking:oh}),c=new jr,l={},h=e.maxTextureSize,u={[Xn]:Ye,[Ye]:Xn,[Rn]:Rn},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:wg,fragmentShader:Eg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new ai;g.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Fe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wa;let f=this.type;this.render=function(A,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=r.getRenderTarget(),b=r.getActiveCubeFace(),E=r.getActiveMipmapLevel(),V=r.state;V.setBlending(Zn),V.buffers.depth.getReversed()?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let H=f!==Pn&&this.type===Pn,X=f===Pn&&this.type!==Pn;for(let Z=0,Y=A.length;Z<Y;Z++){let $=A[Z],k=$.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);let ot=k.getFrameExtents();if(i.multiply(ot),s.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ot.x),i.x=s.x*ot.x,k.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ot.y),i.y=s.y*ot.y,k.mapSize.y=s.y)),k.map===null||H===!0||X===!0){let St=this.type!==Pn?{minFilter:hn,magFilter:hn}:{};k.map!==null&&k.map.dispose(),k.map=new En(i.x,i.y,St),k.map.texture.name=$.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();let ut=k.getViewportCount();for(let St=0;St<ut;St++){let kt=k.getViewport(St);o.set(s.x*kt.x,s.y*kt.y,s.x*kt.z,s.y*kt.w),V.viewport(o),k.updateMatrices($,St),n=k.getFrustum(),x(R,D,k.camera,$,this.type)}k.isPointLightShadow!==!0&&this.type===Pn&&w(k,D),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(M,b,E)};function w(A,R){let D=t.update(y);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new En(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(R,null,D,d,y,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(R,null,D,p,y,null)}function S(A,R,D,M){let b=null,E=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(E!==void 0)b=E;else if(b=D.isPointLight===!0?c:a,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let V=b.uuid,H=R.uuid,X=l[V];X===void 0&&(X={},l[V]=X);let Z=X[H];Z===void 0&&(Z=b.clone(),X[H]=Z,R.addEventListener("dispose",C)),b=Z}if(b.visible=R.visible,b.wireframe=R.wireframe,M===Pn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,D.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let V=r.properties.get(b);V.light=D}return b}function x(A,R,D,M,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);let H=t.update(A),X=A.material;if(Array.isArray(X)){let Z=H.groups;for(let Y=0,$=Z.length;Y<$;Y++){let k=Z[Y],ot=X[k.materialIndex];if(ot&&ot.visible){let ut=S(A,ot,M,b);A.onBeforeShadow(r,A,R,D,H,ut,k),r.renderBufferDirect(D,null,H,ut,A,k),A.onAfterShadow(r,A,R,D,H,ut,k)}}}else if(X.visible){let Z=S(A,X,M,b);A.onBeforeShadow(r,A,R,D,H,Z,null),r.renderBufferDirect(D,null,H,Z,A,null),A.onAfterShadow(r,A,R,D,H,Z,null)}}let V=A.children;for(let H=0,X=V.length;H<X;H++)x(V[H],R,D,M,b)}function C(A){A.target.removeEventListener("dispose",C);for(let D in l){let M=l[D],b=A.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}var Ag={[fo]:po,[mo]:vo,[go]:_o,[Ti]:yo,[po]:fo,[vo]:mo,[_o]:go,[yo]:Ti};function Pg(r,t){function e(){let I=!1,tt=new xe,st=null,ft=new xe(0,0,0,0);return{setMask:function(J){st!==J&&!I&&(r.colorMask(J,J,J,J),st=J)},setLocked:function(J){I=J},setClear:function(J,q,yt,Ft,ce){ce===!0&&(J*=Ft,q*=Ft,yt*=Ft),tt.set(J,q,yt,Ft),ft.equals(tt)===!1&&(r.clearColor(J,q,yt,Ft),ft.copy(tt))},reset:function(){I=!1,st=null,ft.set(-1,0,0,0)}}}function n(){let I=!1,tt=!1,st=null,ft=null,J=null;return{setReversed:function(q){if(tt!==q){let yt=t.get("EXT_clip_control");q?yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.ZERO_TO_ONE_EXT):yt.clipControlEXT(yt.LOWER_LEFT_EXT,yt.NEGATIVE_ONE_TO_ONE_EXT),tt=q;let Ft=J;J=null,this.setClear(Ft)}},getReversed:function(){return tt},setTest:function(q){q?it(r.DEPTH_TEST):Ct(r.DEPTH_TEST)},setMask:function(q){st!==q&&!I&&(r.depthMask(q),st=q)},setFunc:function(q){if(tt&&(q=Ag[q]),ft!==q){switch(q){case fo:r.depthFunc(r.NEVER);break;case po:r.depthFunc(r.ALWAYS);break;case mo:r.depthFunc(r.LESS);break;case Ti:r.depthFunc(r.LEQUAL);break;case go:r.depthFunc(r.EQUAL);break;case yo:r.depthFunc(r.GEQUAL);break;case vo:r.depthFunc(r.GREATER);break;case _o:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ft=q}},setLocked:function(q){I=q},setClear:function(q){J!==q&&(tt&&(q=1-q),r.clearDepth(q),J=q)},reset:function(){I=!1,st=null,ft=null,J=null,tt=!1}}}function i(){let I=!1,tt=null,st=null,ft=null,J=null,q=null,yt=null,Ft=null,ce=null;return{setTest:function(ee){I||(ee?it(r.STENCIL_TEST):Ct(r.STENCIL_TEST))},setMask:function(ee){tt!==ee&&!I&&(r.stencilMask(ee),tt=ee)},setFunc:function(ee,Fn,xn){(st!==ee||ft!==Fn||J!==xn)&&(r.stencilFunc(ee,Fn,xn),st=ee,ft=Fn,J=xn)},setOp:function(ee,Fn,xn){(q!==ee||yt!==Fn||Ft!==xn)&&(r.stencilOp(ee,Fn,xn),q=ee,yt=Fn,Ft=xn)},setLocked:function(ee){I=ee},setClear:function(ee){ce!==ee&&(r.clearStencil(ee),ce=ee)},reset:function(){I=!1,tt=null,st=null,ft=null,J=null,q=null,yt=null,Ft=null,ce=null}}}let s=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,y=!1,m=null,f=null,w=null,S=null,x=null,C=null,A=null,R=new Qt(0,0,0),D=0,M=!1,b=null,E=null,V=null,H=null,X=null,Z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,$=0,k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(k)[1]),Y=$>=1):k.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),Y=$>=2);let ot=null,ut={},St=r.getParameter(r.SCISSOR_BOX),kt=r.getParameter(r.VIEWPORT),de=new xe().fromArray(St),oe=new xe().fromArray(kt);function W(I,tt,st,ft){let J=new Uint8Array(4),q=r.createTexture();r.bindTexture(I,q),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let yt=0;yt<st;yt++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(tt,0,r.RGBA,1,1,ft,0,r.RGBA,r.UNSIGNED_BYTE,J):r.texImage2D(tt+yt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,J);return q}let at={};at[r.TEXTURE_2D]=W(r.TEXTURE_2D,r.TEXTURE_2D,1),at[r.TEXTURE_CUBE_MAP]=W(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[r.TEXTURE_2D_ARRAY]=W(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),at[r.TEXTURE_3D]=W(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(r.DEPTH_TEST),o.setFunc(Ti),te(!1),Mt(Ga),it(r.CULL_FACE),le(Zn);function it(I){h[I]!==!0&&(r.enable(I),h[I]=!0)}function Ct(I){h[I]!==!1&&(r.disable(I),h[I]=!1)}function At(I,tt){return u[I]!==tt?(r.bindFramebuffer(I,tt),u[I]=tt,I===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=tt),I===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=tt),!0):!1}function Dt(I,tt){let st=p,ft=!1;if(I){st=d.get(tt),st===void 0&&(st=[],d.set(tt,st));let J=I.textures;if(st.length!==J.length||st[0]!==r.COLOR_ATTACHMENT0){for(let q=0,yt=J.length;q<yt;q++)st[q]=r.COLOR_ATTACHMENT0+q;st.length=J.length,ft=!0}}else st[0]!==r.BACK&&(st[0]=r.BACK,ft=!0);ft&&r.drawBuffers(st)}function be(I){return g!==I?(r.useProgram(I),g=I,!0):!1}let Kt={[oi]:r.FUNC_ADD,[Oc]:r.FUNC_SUBTRACT,[Lc]:r.FUNC_REVERSE_SUBTRACT};Kt[Dc]=r.MIN,Kt[Fc]=r.MAX;let P={[Nc]:r.ZERO,[Uc]:r.ONE,[Bc]:r.SRC_COLOR,[zr]:r.SRC_ALPHA,[Wc]:r.SRC_ALPHA_SATURATE,[Vc]:r.DST_COLOR,[kc]:r.DST_ALPHA,[Hc]:r.ONE_MINUS_SRC_COLOR,[Vr]:r.ONE_MINUS_SRC_ALPHA,[Gc]:r.ONE_MINUS_DST_COLOR,[zc]:r.ONE_MINUS_DST_ALPHA,[Xc]:r.CONSTANT_COLOR,[Yc]:r.ONE_MINUS_CONSTANT_COLOR,[qc]:r.CONSTANT_ALPHA,[Zc]:r.ONE_MINUS_CONSTANT_ALPHA};function le(I,tt,st,ft,J,q,yt,Ft,ce,ee){if(I===Zn){y===!0&&(Ct(r.BLEND),y=!1);return}if(y===!1&&(it(r.BLEND),y=!0),I!==Ic){if(I!==m||ee!==M){if((f!==oi||x!==oi)&&(r.blendEquation(r.FUNC_ADD),f=oi,x=oi),ee)switch(I){case Si:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Xa:r.blendFunc(r.ONE,r.ONE);break;case Ya:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case qa:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Si:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Xa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Ya:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}w=null,S=null,C=null,A=null,R.set(0,0,0),D=0,m=I,M=ee}return}J=J||tt,q=q||st,yt=yt||ft,(tt!==f||J!==x)&&(r.blendEquationSeparate(Kt[tt],Kt[J]),f=tt,x=J),(st!==w||ft!==S||q!==C||yt!==A)&&(r.blendFuncSeparate(P[st],P[ft],P[q],P[yt]),w=st,S=ft,C=q,A=yt),(Ft.equals(R)===!1||ce!==D)&&(r.blendColor(Ft.r,Ft.g,Ft.b,ce),R.copy(Ft),D=ce),m=I,M=!1}function wt(I,tt){I.side===Rn?Ct(r.CULL_FACE):it(r.CULL_FACE);let st=I.side===Ye;tt&&(st=!st),te(st),I.blending===Si&&I.transparent===!1?le(Zn):le(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);let ft=I.stencilWrite;a.setTest(ft),ft&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),mt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?it(r.SAMPLE_ALPHA_TO_COVERAGE):Ct(r.SAMPLE_ALPHA_TO_COVERAGE)}function te(I){b!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),b=I)}function Mt(I){I!==Ac?(it(r.CULL_FACE),I!==E&&(I===Ga?r.cullFace(r.BACK):I===Pc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ct(r.CULL_FACE),E=I}function fe(I){I!==V&&(Y&&r.lineWidth(I),V=I)}function mt(I,tt,st){I?(it(r.POLYGON_OFFSET_FILL),(H!==tt||X!==st)&&(r.polygonOffset(tt,st),H=tt,X=st)):Ct(r.POLYGON_OFFSET_FILL)}function zt(I){I?it(r.SCISSOR_TEST):Ct(r.SCISSOR_TEST)}function Pe(I){I===void 0&&(I=r.TEXTURE0+Z-1),ot!==I&&(r.activeTexture(I),ot=I)}function Me(I,tt,st){st===void 0&&(ot===null?st=r.TEXTURE0+Z-1:st=ot);let ft=ut[st];ft===void 0&&(ft={type:void 0,texture:void 0},ut[st]=ft),(ft.type!==I||ft.texture!==tt)&&(ot!==st&&(r.activeTexture(st),ot=st),r.bindTexture(I,tt||at[I]),ft.type=I,ft.texture=tt)}function T(){let I=ut[ot];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function v(){try{r.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function F(){try{r.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function G(){try{r.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{r.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function z(){try{r.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function bt(){try{r.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{r.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function vt(){try{r.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(){try{r.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{r.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(I){de.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),de.copy(I))}function Rt(I){oe.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),oe.copy(I))}function xt(I,tt){let st=l.get(tt);st===void 0&&(st=new WeakMap,l.set(tt,st));let ft=st.get(I);ft===void 0&&(ft=r.getUniformBlockIndex(tt,I.name),st.set(I,ft))}function lt(I,tt){let ft=l.get(tt).get(I);c.get(tt)!==ft&&(r.uniformBlockBinding(tt,ft,I.__bindingPointIndex),c.set(tt,ft))}function Bt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ot=null,ut={},u={},d=new WeakMap,p=[],g=null,y=!1,m=null,f=null,w=null,S=null,x=null,C=null,A=null,R=new Qt(0,0,0),D=0,M=!1,b=null,E=null,V=null,H=null,X=null,de.set(0,0,r.canvas.width,r.canvas.height),oe.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:it,disable:Ct,bindFramebuffer:At,drawBuffers:Dt,useProgram:be,setBlending:le,setMaterial:wt,setFlipSided:te,setCullFace:Mt,setLineWidth:fe,setPolygonOffset:mt,setScissorTest:zt,activeTexture:Pe,bindTexture:Me,unbindTexture:T,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:_t,texImage3D:Q,updateUBOMapping:xt,uniformBlockBinding:lt,texStorage2D:nt,texStorage3D:vt,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:z,compressedTexSubImage3D:bt,scissor:ht,viewport:Rt,reset:Bt}}function Rg(r,t,e,n,i,s,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $t,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return p?new OffscreenCanvas(T,v):ss("canvas")}function y(T,v,F){let G=1,K=Me(T);if((K.width>F||K.height>F)&&(G=F/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let z=Math.floor(G*K.width),bt=Math.floor(G*K.height);u===void 0&&(u=g(z,bt));let nt=v?g(z,bt):u;return nt.width=z,nt.height=bt,nt.getContext("2d").drawImage(T,0,0,z,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+z+"x"+bt+")."),nt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){r.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?r.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(T,v,F,G,K=!1){if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let z=v;if(v===r.RED&&(F===r.FLOAT&&(z=r.R32F),F===r.HALF_FLOAT&&(z=r.R16F),F===r.UNSIGNED_BYTE&&(z=r.R8)),v===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(z=r.R8UI),F===r.UNSIGNED_SHORT&&(z=r.R16UI),F===r.UNSIGNED_INT&&(z=r.R32UI),F===r.BYTE&&(z=r.R8I),F===r.SHORT&&(z=r.R16I),F===r.INT&&(z=r.R32I)),v===r.RG&&(F===r.FLOAT&&(z=r.RG32F),F===r.HALF_FLOAT&&(z=r.RG16F),F===r.UNSIGNED_BYTE&&(z=r.RG8)),v===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(z=r.RG8UI),F===r.UNSIGNED_SHORT&&(z=r.RG16UI),F===r.UNSIGNED_INT&&(z=r.RG32UI),F===r.BYTE&&(z=r.RG8I),F===r.SHORT&&(z=r.RG16I),F===r.INT&&(z=r.RG32I)),v===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(z=r.RGB8UI),F===r.UNSIGNED_SHORT&&(z=r.RGB16UI),F===r.UNSIGNED_INT&&(z=r.RGB32UI),F===r.BYTE&&(z=r.RGB8I),F===r.SHORT&&(z=r.RGB16I),F===r.INT&&(z=r.RGB32I)),v===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(z=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(z=r.RGBA16UI),F===r.UNSIGNED_INT&&(z=r.RGBA32UI),F===r.BYTE&&(z=r.RGBA8I),F===r.SHORT&&(z=r.RGBA16I),F===r.INT&&(z=r.RGBA32I)),v===r.RGB&&F===r.UNSIGNED_INT_5_9_9_9_REV&&(z=r.RGB9_E5),v===r.RGBA){let bt=K?Ls:Jt.getTransfer(G);F===r.FLOAT&&(z=r.RGBA32F),F===r.HALF_FLOAT&&(z=r.RGBA16F),F===r.UNSIGNED_BYTE&&(z=bt===se?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(z=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(z=r.RGB5_A1)}return(z===r.R16F||z===r.R32F||z===r.RG16F||z===r.RG32F||z===r.RGBA16F||z===r.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function x(T,v){let F;return T?v===null||v===ui||v===ds?F=r.DEPTH24_STENCIL8:v===Ln?F=r.DEPTH32F_STENCIL8:v===hs&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ui||v===ds?F=r.DEPTH_COMPONENT24:v===Ln?F=r.DEPTH_COMPONENT32F:v===hs&&(F=r.DEPTH_COMPONENT16),F}function C(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==hn&&T.minFilter!==Xe?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function A(T){let v=T.target;v.removeEventListener("dispose",A),D(v),v.isVideoTexture&&h.delete(v)}function R(T){let v=T.target;v.removeEventListener("dispose",R),b(v)}function D(T){let v=n.get(T);if(v.__webglInit===void 0)return;let F=T.source,G=d.get(F);if(G){let K=G[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&M(T),Object.keys(G).length===0&&d.delete(F)}n.remove(T)}function M(T){let v=n.get(T);r.deleteTexture(v.__webglTexture);let F=T.source,G=d.get(F);delete G[v.__cacheKey],o.memory.textures--}function b(T){let v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let K=0;K<v.__webglFramebuffer[G].length;K++)r.deleteFramebuffer(v.__webglFramebuffer[G][K]);else r.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)r.deleteFramebuffer(v.__webglFramebuffer[G]);else r.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&r.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&r.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&r.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let F=T.textures;for(let G=0,K=F.length;G<K;G++){let z=n.get(F[G]);z.__webglTexture&&(r.deleteTexture(z.__webglTexture),o.memory.textures--),n.remove(F[G])}n.remove(T)}let E=0;function V(){E=0}function H(){let T=E;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),E+=1,T}function X(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function Z(T,v){let F=n.get(T);if(T.isVideoTexture&&zt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){let G=T.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(F,T,v);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+v)}function Y(T,v){let F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){at(F,T,v);return}e.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+v)}function $(T,v){let F=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){at(F,T,v);return}e.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+v)}function k(T,v){let F=n.get(T);if(T.version>0&&F.__version!==T.version){it(F,T,v);return}e.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+v)}let ot={[Gr]:r.REPEAT,[Tn]:r.CLAMP_TO_EDGE,[Wr]:r.MIRRORED_REPEAT},ut={[hn]:r.NEAREST,[sh]:r.NEAREST_MIPMAP_NEAREST,[$s]:r.NEAREST_MIPMAP_LINEAR,[Xe]:r.LINEAR,[Mo]:r.LINEAR_MIPMAP_NEAREST,[In]:r.LINEAR_MIPMAP_LINEAR},St={[ch]:r.NEVER,[mh]:r.ALWAYS,[hh]:r.LESS,[il]:r.LEQUAL,[uh]:r.EQUAL,[ph]:r.GEQUAL,[dh]:r.GREATER,[fh]:r.NOTEQUAL};function kt(T,v){if(v.type===Ln&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Xe||v.magFilter===Mo||v.magFilter===$s||v.magFilter===In||v.minFilter===Xe||v.minFilter===Mo||v.minFilter===$s||v.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(T,r.TEXTURE_WRAP_S,ot[v.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,ot[v.wrapT]),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,ot[v.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,ut[v.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,ut[v.minFilter]),v.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,St[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===hn||v.minFilter!==$s&&v.minFilter!==In||v.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");r.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function de(T,v){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",A));let G=v.source,K=d.get(G);K===void 0&&(K={},d.set(G,K));let z=X(v);if(z!==T.__cacheKey){K[z]===void 0&&(K[z]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[z].usedTimes++;let bt=K[T.__cacheKey];bt!==void 0&&(K[T.__cacheKey].usedTimes--,bt.usedTimes===0&&M(v)),T.__cacheKey=z,T.__webglTexture=K[z].texture}return F}function oe(T,v,F){return Math.floor(Math.floor(T/F)/v)}function W(T,v,F,G){let z=T.updateRanges;if(z.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,v.width,v.height,F,G,v.data);else{z.sort((Q,ht)=>Q.start-ht.start);let bt=0;for(let Q=1;Q<z.length;Q++){let ht=z[bt],Rt=z[Q],xt=ht.start+ht.count,lt=oe(Rt.start,v.width,4),Bt=oe(ht.start,v.width,4);Rt.start<=xt+1&&lt===Bt&&oe(Rt.start+Rt.count-1,v.width,4)===lt?ht.count=Math.max(ht.count,Rt.start+Rt.count-ht.start):(++bt,z[bt]=Rt)}z.length=bt+1;let nt=r.getParameter(r.UNPACK_ROW_LENGTH),vt=r.getParameter(r.UNPACK_SKIP_PIXELS),_t=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,v.width);for(let Q=0,ht=z.length;Q<ht;Q++){let Rt=z[Q],xt=Math.floor(Rt.start/4),lt=Math.ceil(Rt.count/4),Bt=xt%v.width,I=Math.floor(xt/v.width),tt=lt,st=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Bt),r.pixelStorei(r.UNPACK_SKIP_ROWS,I),e.texSubImage2D(r.TEXTURE_2D,0,Bt,I,tt,st,F,G,v.data)}T.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,nt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,vt),r.pixelStorei(r.UNPACK_SKIP_ROWS,_t)}}function at(T,v,F){let G=r.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=r.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=r.TEXTURE_3D);let K=de(T,v),z=v.source;e.bindTexture(G,T.__webglTexture,r.TEXTURE0+F);let bt=n.get(z);if(z.version!==bt.__version||K===!0){e.activeTexture(r.TEXTURE0+F);let nt=Jt.getPrimaries(Jt.workingColorSpace),vt=v.colorSpace===Kn?null:Jt.getPrimaries(v.colorSpace),_t=v.colorSpace===Kn||nt===vt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let Q=y(v.image,!1,i.maxTextureSize);Q=Pe(v,Q);let ht=s.convert(v.format,v.colorSpace),Rt=s.convert(v.type),xt=S(v.internalFormat,ht,Rt,v.colorSpace,v.isVideoTexture);kt(G,v);let lt,Bt=v.mipmaps,I=v.isVideoTexture!==!0,tt=bt.__version===void 0||K===!0,st=z.dataReady,ft=C(v,Q);if(v.isDepthTexture)xt=x(v.format===fs,v.type),tt&&(I?e.texStorage2D(r.TEXTURE_2D,1,xt,Q.width,Q.height):e.texImage2D(r.TEXTURE_2D,0,xt,Q.width,Q.height,0,ht,Rt,null));else if(v.isDataTexture)if(Bt.length>0){I&&tt&&e.texStorage2D(r.TEXTURE_2D,ft,xt,Bt[0].width,Bt[0].height);for(let J=0,q=Bt.length;J<q;J++)lt=Bt[J],I?st&&e.texSubImage2D(r.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,Rt,lt.data):e.texImage2D(r.TEXTURE_2D,J,xt,lt.width,lt.height,0,ht,Rt,lt.data);v.generateMipmaps=!1}else I?(tt&&e.texStorage2D(r.TEXTURE_2D,ft,xt,Q.width,Q.height),st&&W(v,Q,ht,Rt)):e.texImage2D(r.TEXTURE_2D,0,xt,Q.width,Q.height,0,ht,Rt,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){I&&tt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,xt,Bt[0].width,Bt[0].height,Q.depth);for(let J=0,q=Bt.length;J<q;J++)if(lt=Bt[J],v.format!==dn)if(ht!==null)if(I){if(st)if(v.layerUpdates.size>0){let yt=ul(lt.width,lt.height,v.format,v.type);for(let Ft of v.layerUpdates){let ce=lt.data.subarray(Ft*yt/lt.data.BYTES_PER_ELEMENT,(Ft+1)*yt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Ft,lt.width,lt.height,1,ht,ce)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,Q.depth,ht,lt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,xt,lt.width,lt.height,Q.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?st&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,Q.depth,ht,Rt,lt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,J,xt,lt.width,lt.height,Q.depth,0,ht,Rt,lt.data)}else{I&&tt&&e.texStorage2D(r.TEXTURE_2D,ft,xt,Bt[0].width,Bt[0].height);for(let J=0,q=Bt.length;J<q;J++)lt=Bt[J],v.format!==dn?ht!==null?I?st&&e.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,lt.data):e.compressedTexImage2D(r.TEXTURE_2D,J,xt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?st&&e.texSubImage2D(r.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,Rt,lt.data):e.texImage2D(r.TEXTURE_2D,J,xt,lt.width,lt.height,0,ht,Rt,lt.data)}else if(v.isDataArrayTexture)if(I){if(tt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ft,xt,Q.width,Q.height,Q.depth),st)if(v.layerUpdates.size>0){let J=ul(Q.width,Q.height,v.format,v.type);for(let q of v.layerUpdates){let yt=Q.data.subarray(q*J/Q.data.BYTES_PER_ELEMENT,(q+1)*J/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,ht,Rt,yt)}v.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,Rt,Q.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,xt,Q.width,Q.height,Q.depth,0,ht,Rt,Q.data);else if(v.isData3DTexture)I?(tt&&e.texStorage3D(r.TEXTURE_3D,ft,xt,Q.width,Q.height,Q.depth),st&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,Rt,Q.data)):e.texImage3D(r.TEXTURE_3D,0,xt,Q.width,Q.height,Q.depth,0,ht,Rt,Q.data);else if(v.isFramebufferTexture){if(tt)if(I)e.texStorage2D(r.TEXTURE_2D,ft,xt,Q.width,Q.height);else{let J=Q.width,q=Q.height;for(let yt=0;yt<ft;yt++)e.texImage2D(r.TEXTURE_2D,yt,xt,J,q,0,ht,Rt,null),J>>=1,q>>=1}}else if(Bt.length>0){if(I&&tt){let J=Me(Bt[0]);e.texStorage2D(r.TEXTURE_2D,ft,xt,J.width,J.height)}for(let J=0,q=Bt.length;J<q;J++)lt=Bt[J],I?st&&e.texSubImage2D(r.TEXTURE_2D,J,0,0,ht,Rt,lt):e.texImage2D(r.TEXTURE_2D,J,xt,ht,Rt,lt);v.generateMipmaps=!1}else if(I){if(tt){let J=Me(Q);e.texStorage2D(r.TEXTURE_2D,ft,xt,J.width,J.height)}st&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ht,Rt,Q)}else e.texImage2D(r.TEXTURE_2D,0,xt,ht,Rt,Q);m(v)&&f(G),bt.__version=z.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function it(T,v,F){if(v.image.length!==6)return;let G=de(T,v),K=v.source;e.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+F);let z=n.get(K);if(K.version!==z.__version||G===!0){e.activeTexture(r.TEXTURE0+F);let bt=Jt.getPrimaries(Jt.workingColorSpace),nt=v.colorSpace===Kn?null:Jt.getPrimaries(v.colorSpace),vt=v.colorSpace===Kn||bt===nt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let _t=v.isCompressedTexture||v.image[0].isCompressedTexture,Q=v.image[0]&&v.image[0].isDataTexture,ht=[];for(let q=0;q<6;q++)!_t&&!Q?ht[q]=y(v.image[q],!0,i.maxCubemapSize):ht[q]=Q?v.image[q].image:v.image[q],ht[q]=Pe(v,ht[q]);let Rt=ht[0],xt=s.convert(v.format,v.colorSpace),lt=s.convert(v.type),Bt=S(v.internalFormat,xt,lt,v.colorSpace),I=v.isVideoTexture!==!0,tt=z.__version===void 0||G===!0,st=K.dataReady,ft=C(v,Rt);kt(r.TEXTURE_CUBE_MAP,v);let J;if(_t){I&&tt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Bt,Rt.width,Rt.height);for(let q=0;q<6;q++){J=ht[q].mipmaps;for(let yt=0;yt<J.length;yt++){let Ft=J[yt];v.format!==dn?xt!==null?I?st&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt,0,0,Ft.width,Ft.height,xt,Ft.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt,Bt,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt,0,0,Ft.width,Ft.height,xt,lt,Ft.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt,Bt,Ft.width,Ft.height,0,xt,lt,Ft.data)}}}else{if(J=v.mipmaps,I&&tt){J.length>0&&ft++;let q=Me(ht[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ft,Bt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ht[q].width,ht[q].height,xt,lt,ht[q].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Bt,ht[q].width,ht[q].height,0,xt,lt,ht[q].data);for(let yt=0;yt<J.length;yt++){let ce=J[yt].image[q].image;I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt+1,0,0,ce.width,ce.height,xt,lt,ce.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt+1,Bt,ce.width,ce.height,0,xt,lt,ce.data)}}else{I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,xt,lt,ht[q]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Bt,xt,lt,ht[q]);for(let yt=0;yt<J.length;yt++){let Ft=J[yt];I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt+1,0,0,xt,lt,Ft.image[q]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+q,yt+1,Bt,xt,lt,Ft.image[q])}}}m(v)&&f(r.TEXTURE_CUBE_MAP),z.__version=K.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Ct(T,v,F,G,K,z){let bt=s.convert(F.format,F.colorSpace),nt=s.convert(F.type),vt=S(F.internalFormat,bt,nt,F.colorSpace),_t=n.get(v),Q=n.get(F);if(Q.__renderTarget=v,!_t.__hasExternalTextures){let ht=Math.max(1,v.width>>z),Rt=Math.max(1,v.height>>z);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?e.texImage3D(K,z,vt,ht,Rt,v.depth,0,bt,nt,null):e.texImage2D(K,z,vt,ht,Rt,0,bt,nt,null)}e.bindFramebuffer(r.FRAMEBUFFER,T),mt(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,G,K,Q.__webglTexture,0,fe(v)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,G,K,Q.__webglTexture,z),e.bindFramebuffer(r.FRAMEBUFFER,null)}function At(T,v,F){if(r.bindRenderbuffer(r.RENDERBUFFER,T),v.depthBuffer){let G=v.depthTexture,K=G&&G.isDepthTexture?G.type:null,z=x(v.stencilBuffer,K),bt=v.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,nt=fe(v);mt(v)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt,z,v.width,v.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt,z,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,z,v.width,v.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,bt,r.RENDERBUFFER,T)}else{let G=v.textures;for(let K=0;K<G.length;K++){let z=G[K],bt=s.convert(z.format,z.colorSpace),nt=s.convert(z.type),vt=S(z.internalFormat,bt,nt,z.colorSpace),_t=fe(v);F&&mt(v)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_t,vt,v.width,v.height):mt(v)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_t,vt,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,vt,v.width,v.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Dt(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=n.get(v.depthTexture);G.__renderTarget=v,(!G.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z(v.depthTexture,0);let K=G.__webglTexture,z=fe(v);if(v.depthTexture.format===ns)mt(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0,z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,K,0);else if(v.depthTexture.format===fs)mt(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0,z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function be(T){let v=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let G=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){let K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=G}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let G=T.texture.mipmaps;G&&G.length>0?Dt(v.__webglFramebuffer[0],T):Dt(v.__webglFramebuffer,T)}else if(F){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=r.createRenderbuffer(),At(v.__webglDepthbuffer[G],T,!1);else{let K=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=v.__webglDepthbuffer[G];r.bindRenderbuffer(r.RENDERBUFFER,z),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,z)}}else{let G=T.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=r.createRenderbuffer(),At(v.__webglDepthbuffer,T,!1);else{let K=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=v.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,z),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,z)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Kt(T,v,F){let G=n.get(T);v!==void 0&&Ct(G.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&be(T)}function P(T){let v=T.texture,F=n.get(T),G=n.get(v);T.addEventListener("dispose",R);let K=T.textures,z=T.isWebGLCubeRenderTarget===!0,bt=K.length>1;if(bt||(G.__webglTexture===void 0&&(G.__webglTexture=r.createTexture()),G.__version=v.version,o.memory.textures++),z){F.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[nt]=[];for(let vt=0;vt<v.mipmaps.length;vt++)F.__webglFramebuffer[nt][vt]=r.createFramebuffer()}else F.__webglFramebuffer[nt]=r.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let nt=0;nt<v.mipmaps.length;nt++)F.__webglFramebuffer[nt]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(bt)for(let nt=0,vt=K.length;nt<vt;nt++){let _t=n.get(K[nt]);_t.__webglTexture===void 0&&(_t.__webglTexture=r.createTexture(),o.memory.textures++)}if(T.samples>0&&mt(T)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let nt=0;nt<K.length;nt++){let vt=K[nt];F.__webglColorRenderbuffer[nt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[nt]);let _t=s.convert(vt.format,vt.colorSpace),Q=s.convert(vt.type),ht=S(vt.internalFormat,_t,Q,vt.colorSpace,T.isXRRenderTarget===!0),Rt=fe(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,Rt,ht,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+nt,r.RENDERBUFFER,F.__webglColorRenderbuffer[nt])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),At(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(z){e.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture),kt(r.TEXTURE_CUBE_MAP,v);for(let nt=0;nt<6;nt++)if(v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)Ct(F.__webglFramebuffer[nt][vt],T,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt);else Ct(F.__webglFramebuffer[nt],T,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(v)&&f(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let nt=0,vt=K.length;nt<vt;nt++){let _t=K[nt],Q=n.get(_t),ht=r.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ht,Q.__webglTexture),kt(ht,_t),Ct(F.__webglFramebuffer,T,_t,r.COLOR_ATTACHMENT0+nt,ht,0),m(_t)&&f(ht)}e.unbindTexture()}else{let nt=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(nt=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(nt,G.__webglTexture),kt(nt,v),v.mipmaps&&v.mipmaps.length>0)for(let vt=0;vt<v.mipmaps.length;vt++)Ct(F.__webglFramebuffer[vt],T,v,r.COLOR_ATTACHMENT0,nt,vt);else Ct(F.__webglFramebuffer,T,v,r.COLOR_ATTACHMENT0,nt,0);m(v)&&f(nt),e.unbindTexture()}T.depthBuffer&&be(T)}function le(T){let v=T.textures;for(let F=0,G=v.length;F<G;F++){let K=v[F];if(m(K)){let z=w(T),bt=n.get(K).__webglTexture;e.bindTexture(z,bt),f(z),e.unbindTexture()}}}let wt=[],te=[];function Mt(T){if(T.samples>0){if(mt(T)===!1){let v=T.textures,F=T.width,G=T.height,K=r.COLOR_BUFFER_BIT,z=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=n.get(T),nt=v.length>1;if(nt)for(let _t=0;_t<v.length;_t++)e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);let vt=T.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let _t=0;_t<v.length;_t++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=r.STENCIL_BUFFER_BIT)),nt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,bt.__webglColorRenderbuffer[_t]);let Q=n.get(v[_t]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,F,G,0,0,F,G,K,r.NEAREST),c===!0&&(wt.length=0,te.length=0,wt.push(r.COLOR_ATTACHMENT0+_t),T.depthBuffer&&T.resolveDepthBuffer===!1&&(wt.push(z),te.push(z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,te)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,wt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),nt)for(let _t=0;_t<v.length;_t++){e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,bt.__webglColorRenderbuffer[_t]);let Q=n.get(v[_t]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,Q,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){let v=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[v])}}}function fe(T){return Math.min(i.maxSamples,T.samples)}function mt(T){let v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function zt(T){let v=o.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Pe(T,v){let F=T.colorSpace,G=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==wi&&F!==Kn&&(Jt.getTransfer(F)===se?(G!==dn||K!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Me(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=V,this.setTexture2D=Z,this.setTexture2DArray=Y,this.setTexture3D=$,this.setTextureCube=k,this.rebindTextures=Kt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=mt}function Ig(r,t){function e(n,i=Kn){let s,o=Jt.getTransfer(i);if(n===On)return r.UNSIGNED_BYTE;if(n===To)return r.UNSIGNED_SHORT_4_4_4_4;if(n===wo)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ja)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===$a)return r.BYTE;if(n===Ka)return r.SHORT;if(n===hs)return r.UNSIGNED_SHORT;if(n===So)return r.INT;if(n===ui)return r.UNSIGNED_INT;if(n===Ln)return r.FLOAT;if(n===us)return r.HALF_FLOAT;if(n===ja)return r.ALPHA;if(n===Qa)return r.RGB;if(n===dn)return r.RGBA;if(n===ns)return r.DEPTH_COMPONENT;if(n===fs)return r.DEPTH_STENCIL;if(n===tl)return r.RED;if(n===Eo)return r.RED_INTEGER;if(n===el)return r.RG;if(n===Co)return r.RG_INTEGER;if(n===Ao)return r.RGBA_INTEGER;if(n===Ks||n===Js||n===js||n===Qs)if(o===se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ks)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Js)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===js)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ks)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Js)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===js)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Po||n===Ro||n===Io||n===Oo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ro)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Io)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lo||n===Do||n===Fo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lo||n===Do)return o===se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Fo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===No||n===Uo||n===Bo||n===Ho||n===ko||n===zo||n===Vo||n===Go||n===Wo||n===Xo||n===Yo||n===qo||n===Zo||n===$o)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===No)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Uo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ho)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ko)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Go)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Yo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===qo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$o)return o===se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===tr||n===Ko||n===Jo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===tr)return o===se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ko)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Jo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nl||n===jo||n===Qo||n===ta)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===tr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===jo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ta)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var ra=class extends sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}},Og=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lg=`
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

}`,Tl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ra(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new _n({vertexShader:Og,fragmentShader:Lg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Fe(new An(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wl=class extends Yn{constructor(t,e){super();let n=this,i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,y=new Tl,m={},f=e.getContextAttributes(),w=null,S=null,x=[],C=[],A=new $t,R=null,D=new He;D.viewport=new xe;let M=new He;M.viewport=new xe;let b=[D,M],E=new ho,V=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let at=x[W];return at===void 0&&(at=new cs,x[W]=at),at.getTargetRaySpace()},this.getControllerGrip=function(W){let at=x[W];return at===void 0&&(at=new cs,x[W]=at),at.getGripSpace()},this.getHand=function(W){let at=x[W];return at===void 0&&(at=new cs,x[W]=at),at.getHandSpace()};function X(W){let at=C.indexOf(W.inputSource);if(at===-1)return;let it=x[at];it!==void 0&&(it.update(W.inputSource,W.frame,l||o),it.dispatchEvent({type:W.type,data:W.inputSource}))}function Z(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",Y);for(let W=0;W<x.length;W++){let at=C[W];at!==null&&(C[W]=null,x[W].disconnect(at))}V=null,H=null,y.reset();for(let W in m)delete m[W];t.setRenderTarget(w),p=null,d=null,u=null,i=null,S=null,oe.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=function(W){return et(this,null,function*(){if(i=W,i!==null){if(w=t.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&(yield e.makeXRCompatible()),R=t.getPixelRatio(),t.getSize(A),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(i,e)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let it=null,Ct=null,At=null;f.depth&&(At=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=f.stencil?fs:ns,Ct=f.stencil?ds:ui);let Dt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:s};d=u.createProjectionLayer(Dt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new En(d.textureWidth,d.textureHeight,{format:dn,type:On,depthTexture:new Vs(d.textureWidth,d.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let it={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,e,it),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new En(p.framebufferWidth,p.framebufferHeight,{format:dn,type:On,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=yield i.requestReferenceSpace(a),oe.setContext(i),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Y(W){for(let at=0;at<W.removed.length;at++){let it=W.removed[at],Ct=C.indexOf(it);Ct>=0&&(C[Ct]=null,x[Ct].disconnect(it))}for(let at=0;at<W.added.length;at++){let it=W.added[at],Ct=C.indexOf(it);if(Ct===-1){for(let Dt=0;Dt<x.length;Dt++)if(Dt>=C.length){C.push(it),Ct=Dt;break}else if(C[Dt]===null){C[Dt]=it,Ct=Dt;break}if(Ct===-1)break}let At=x[Ct];At&&At.connect(it)}}let $=new N,k=new N;function ot(W,at,it){$.setFromMatrixPosition(at.matrixWorld),k.setFromMatrixPosition(it.matrixWorld);let Ct=$.distanceTo(k),At=at.projectionMatrix.elements,Dt=it.projectionMatrix.elements,be=At[14]/(At[10]-1),Kt=At[14]/(At[10]+1),P=(At[9]+1)/At[5],le=(At[9]-1)/At[5],wt=(At[8]-1)/At[0],te=(Dt[8]+1)/Dt[0],Mt=be*wt,fe=be*te,mt=Ct/(-wt+te),zt=mt*-wt;if(at.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(zt),W.translateZ(mt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),At[10]===-1)W.projectionMatrix.copy(at.projectionMatrix),W.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let Pe=be+mt,Me=Kt+mt,T=Mt-zt,v=fe+(Ct-zt),F=P*Kt/Me*Pe,G=le*Kt/Me*Pe;W.projectionMatrix.makePerspective(T,v,F,G,Pe,Me),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ut(W,at){at===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(at.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let at=W.near,it=W.far;y.texture!==null&&(y.depthNear>0&&(at=y.depthNear),y.depthFar>0&&(it=y.depthFar)),E.near=M.near=D.near=at,E.far=M.far=D.far=it,(V!==E.near||H!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),V=E.near,H=E.far),E.layers.mask=W.layers.mask|6,D.layers.mask=E.layers.mask&3,M.layers.mask=E.layers.mask&5;let Ct=W.parent,At=E.cameras;ut(E,Ct);for(let Dt=0;Dt<At.length;Dt++)ut(At[Dt],Ct);At.length===2?ot(E,D,M):E.projectionMatrix.copy(D.projectionMatrix),St(W,E,Ct)};function St(W,at,it){it===null?W.matrix.copy(at.matrixWorld):(W.matrix.copy(it.matrixWorld),W.matrix.invert(),W.matrix.multiply(at.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(at.projectionMatrix),W.projectionMatrixInverse.copy(at.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=is*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(E)},this.getCameraTexture=function(W){return m[W]};let kt=null;function de(W,at){if(h=at.getViewerPose(l||o),g=at,h!==null){let it=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Ct=!1;it.length!==E.cameras.length&&(E.cameras.length=0,Ct=!0);for(let Kt=0;Kt<it.length;Kt++){let P=it[Kt],le=null;if(p!==null)le=p.getViewport(P);else{let te=u.getViewSubImage(d,P);le=te.viewport,Kt===0&&(t.setRenderTargetTextures(S,te.colorTexture,te.depthStencilTexture),t.setRenderTarget(S))}let wt=b[Kt];wt===void 0&&(wt=new He,wt.layers.enable(Kt),wt.viewport=new xe,b[Kt]=wt),wt.matrix.fromArray(P.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(P.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(le.x,le.y,le.width,le.height),Kt===0&&(E.matrix.copy(wt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Ct===!0&&E.cameras.push(wt)}let At=i.enabledFeatures;if(At&&At.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){let Kt=u.getDepthInformation(it[0]);Kt&&Kt.isValid&&Kt.texture&&y.init(Kt,i.renderState)}if(At&&At.includes("camera-access")&&(t.state.unbindTexture(),u))for(let Kt=0;Kt<it.length;Kt++){let P=it[Kt].camera;if(P){let le=m[P];le||(le=new ra,m[P]=le);let wt=u.getCameraImage(P);le.sourceTexture=wt}}}for(let it=0;it<x.length;it++){let Ct=C[it],At=x[it];Ct!==null&&At!==void 0&&At.update(Ct,at,l||o)}kt&&kt(W,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null}let oe=new Wh;oe.setAnimationLoop(de),this.setAnimationLoop=function(W){kt=W},this.dispose=function(){}}},Di=new Ci,Dg=new _e;function Fg(r,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,al(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,w,S,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,w,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ye&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ye&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let w=t.get(f),S=w.envMap,x=w.envMapRotation;S&&(m.envMap.value=S,Di.copy(x),Di.x*=-1,Di.y*=-1,Di.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),m.envMapRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(Di)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,w,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ye&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){let w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ng(r,t,e,n){let i={},s={},o=[],a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,S){let x=S.program;n.uniformBlockBinding(w,x)}function l(w,S){let x=i[w.id];x===void 0&&(g(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",m));let C=S.program;n.updateUBOMapping(w,C);let A=t.render.frame;s[w.id]!==A&&(d(w),s[w.id]=A)}function h(w){let S=u();w.__bindingPointIndex=S;let x=r.createBuffer(),C=w.__size,A=w.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,C,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,x),x}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let S=i[w.id],x=w.uniforms,C=w.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let A=0,R=x.length;A<R;A++){let D=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,b=D.length;M<b;M++){let E=D[M];if(p(E,A,M,C)===!0){let V=E.__offset,H=Array.isArray(E.value)?E.value:[E.value],X=0;for(let Z=0;Z<H.length;Z++){let Y=H[Z],$=y(Y);typeof Y=="number"||typeof Y=="boolean"?(E.__data[0]=Y,r.bufferSubData(r.UNIFORM_BUFFER,V+X,E.__data)):Y.isMatrix3?(E.__data[0]=Y.elements[0],E.__data[1]=Y.elements[1],E.__data[2]=Y.elements[2],E.__data[3]=0,E.__data[4]=Y.elements[3],E.__data[5]=Y.elements[4],E.__data[6]=Y.elements[5],E.__data[7]=0,E.__data[8]=Y.elements[6],E.__data[9]=Y.elements[7],E.__data[10]=Y.elements[8],E.__data[11]=0):(Y.toArray(E.__data,X),X+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,E.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(w,S,x,C){let A=w.value,R=S+"_"+x;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{let D=C[R];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return C[R]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(w){let S=w.uniforms,x=0,C=16;for(let R=0,D=S.length;R<D;R++){let M=Array.isArray(S[R])?S[R]:[S[R]];for(let b=0,E=M.length;b<E;b++){let V=M[b],H=Array.isArray(V.value)?V.value:[V.value];for(let X=0,Z=H.length;X<Z;X++){let Y=H[X],$=y(Y),k=x%C,ot=k%$.boundary,ut=k+ot;x+=ot,ut!==0&&C-ut<$.storage&&(x+=C-ut),V.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=$.storage}}}let A=x%C;return A>0&&(x+=C-A),w.__size=x,w.__cache={},this}function y(w){let S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),S}function m(w){let S=w.target;S.removeEventListener("dispose",m);let x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function f(){for(let w in i)r.deleteBuffer(i[w]);o=[],i={},s={}}return{bind:c,update:l,dispose:f}}var nr=class{constructor(t={}){let{canvas:e=gh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,f=null,w=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,C=!1;this._outputColorSpace=Ee;let A=0,R=0,D=null,M=-1,b=null,E=new xe,V=new xe,H=null,X=new Qt(0),Z=0,Y=e.width,$=e.height,k=1,ot=null,ut=null,St=new xe(0,0,Y,$),kt=new xe(0,0,Y,$),de=!1,oe=new Ai,W=!1,at=!1,it=new _e,Ct=new N,At=new xe,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function Kt(){return D===null?k:1}let P=n;function le(_,O){return e.getContext(_,O)}try{let _={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${uo}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",J,!1),P===null){let O="webgl2";if(P=le(O,_),P===null)throw le(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let wt,te,Mt,fe,mt,zt,Pe,Me,T,v,F,G,K,z,bt,nt,vt,_t,Q,ht,Rt,xt,lt,Bt;function I(){wt=new tm(P),wt.init(),xt=new Ig(P,wt),te=new qp(P,wt,t,xt),Mt=new Pg(P,wt),te.reversedDepthBuffer&&d&&Mt.buffers.depth.setReversed(!0),fe=new im(P),mt=new gg,zt=new Rg(P,wt,Mt,mt,te,xt,fe),Pe=new $p(x),Me=new Qp(x),T=new ld(P),lt=new Xp(P,T),v=new em(P,T,fe,lt),F=new rm(P,v,T,fe),Q=new sm(P,te,zt),nt=new Zp(mt),G=new mg(x,Pe,Me,wt,te,lt,nt),K=new Fg(x,mt),z=new vg,bt=new Tg(wt),_t=new Wp(x,Pe,Me,Mt,F,p,c),vt=new Cg(x,F,te),Bt=new Ng(P,fe,te,Mt),ht=new Yp(P,wt,fe),Rt=new nm(P,wt,fe),fe.programs=G.programs,x.capabilities=te,x.extensions=wt,x.properties=mt,x.renderLists=z,x.shadowMap=vt,x.state=Mt,x.info=fe}I();let tt=new wl(x,P);this.xr=tt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let _=wt.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=wt.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(_){_!==void 0&&(k=_,this.setSize(Y,$,!1))},this.getSize=function(_){return _.set(Y,$)},this.setSize=function(_,O,U=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=_,$=O,e.width=Math.floor(_*k),e.height=Math.floor(O*k),U===!0&&(e.style.width=_+"px",e.style.height=O+"px"),this.setViewport(0,0,_,O)},this.getDrawingBufferSize=function(_){return _.set(Y*k,$*k).floor()},this.setDrawingBufferSize=function(_,O,U){Y=_,$=O,k=U,e.width=Math.floor(_*U),e.height=Math.floor(O*U),this.setViewport(0,0,_,O)},this.getCurrentViewport=function(_){return _.copy(E)},this.getViewport=function(_){return _.copy(St)},this.setViewport=function(_,O,U,B){_.isVector4?St.set(_.x,_.y,_.z,_.w):St.set(_,O,U,B),Mt.viewport(E.copy(St).multiplyScalar(k).round())},this.getScissor=function(_){return _.copy(kt)},this.setScissor=function(_,O,U,B){_.isVector4?kt.set(_.x,_.y,_.z,_.w):kt.set(_,O,U,B),Mt.scissor(V.copy(kt).multiplyScalar(k).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(_){Mt.setScissorTest(de=_)},this.setOpaqueSort=function(_){ot=_},this.setTransparentSort=function(_){ut=_},this.getClearColor=function(_){return _.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor(...arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha(...arguments)},this.clear=function(_=!0,O=!0,U=!0){let B=0;if(_){let L=!1;if(D!==null){let j=D.texture.format;L=j===Ao||j===Co||j===Eo}if(L){let j=D.texture.type,ct=j===On||j===ui||j===hs||j===ds||j===To||j===wo,gt=_t.getClearColor(),dt=_t.getClearAlpha(),Pt=gt.r,Ot=gt.g,Tt=gt.b;ct?(g[0]=Pt,g[1]=Ot,g[2]=Tt,g[3]=dt,P.clearBufferuiv(P.COLOR,0,g)):(y[0]=Pt,y[1]=Ot,y[2]=Tt,y[3]=dt,P.clearBufferiv(P.COLOR,0,y))}else B|=P.COLOR_BUFFER_BIT}O&&(B|=P.DEPTH_BUFFER_BIT),U&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",J,!1),_t.dispose(),z.dispose(),bt.dispose(),mt.dispose(),Pe.dispose(),Me.dispose(),F.dispose(),lt.dispose(),Bt.dispose(),G.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",xn),tt.removeEventListener("sessionend",Cl),pi.stop()};function st(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let _=fe.autoReset,O=vt.enabled,U=vt.autoUpdate,B=vt.needsUpdate,L=vt.type;I(),fe.autoReset=_,vt.enabled=O,vt.autoUpdate=U,vt.needsUpdate=B,vt.type=L}function J(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function q(_){let O=_.target;O.removeEventListener("dispose",q),yt(O)}function yt(_){Ft(_),mt.remove(_)}function Ft(_){let O=mt.get(_).programs;O!==void 0&&(O.forEach(function(U){G.releaseProgram(U)}),_.isShaderMaterial&&G.releaseShaderCache(_))}this.renderBufferDirect=function(_,O,U,B,L,j){O===null&&(O=Dt);let ct=L.isMesh&&L.matrixWorld.determinant()<0,gt=Jh(_,O,U,B,L);Mt.setMaterial(B,ct);let dt=U.index,Pt=1;if(B.wireframe===!0){if(dt=v.getWireframeAttribute(U),dt===void 0)return;Pt=2}let Ot=U.drawRange,Tt=U.attributes.position,Xt=Ot.start*Pt,re=(Ot.start+Ot.count)*Pt;j!==null&&(Xt=Math.max(Xt,j.start*Pt),re=Math.min(re,(j.start+j.count)*Pt)),dt!==null?(Xt=Math.max(Xt,0),re=Math.min(re,dt.count)):Tt!=null&&(Xt=Math.max(Xt,0),re=Math.min(re,Tt.count));let ye=re-Xt;if(ye<0||ye===1/0)return;lt.setup(L,B,gt,U,dt);let he,ae=ht;if(dt!==null&&(he=T.get(dt),ae=Rt,ae.setIndex(he)),L.isMesh)B.wireframe===!0?(Mt.setLineWidth(B.wireframeLinewidth*Kt()),ae.setMode(P.LINES)):ae.setMode(P.TRIANGLES);else if(L.isLine){let Et=B.linewidth;Et===void 0&&(Et=1),Mt.setLineWidth(Et*Kt()),L.isLineSegments?ae.setMode(P.LINES):L.isLineLoop?ae.setMode(P.LINE_LOOP):ae.setMode(P.LINE_STRIP)}else L.isPoints?ae.setMode(P.POINTS):L.isSprite&&ae.setMode(P.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Ei("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))ae.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let Et=L._multiDrawStarts,me=L._multiDrawCounts,jt=L._multiDrawCount,$e=dt?T.get(dt).bytesPerElement:1,Ui=mt.get(B).currentProgram.getUniforms();for(let Ke=0;Ke<jt;Ke++)Ui.setValue(P,"_gl_DrawID",Ke),ae.render(Et[Ke]/$e,me[Ke])}else if(L.isInstancedMesh)ae.renderInstances(Xt,ye,L.count);else if(U.isInstancedBufferGeometry){let Et=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,me=Math.min(U.instanceCount,Et);ae.renderInstances(Xt,ye,me)}else ae.render(Xt,ye)};function ce(_,O,U){_.transparent===!0&&_.side===Rn&&_.forceSinglePass===!1?(_.side=Ye,_.needsUpdate=!0,sr(_,O,U),_.side=Xn,_.needsUpdate=!0,sr(_,O,U),_.side=Rn):sr(_,O,U)}this.compile=function(_,O,U=null){U===null&&(U=_),f=bt.get(U),f.init(O),S.push(f),U.traverseVisible(function(L){L.isLight&&L.layers.test(O.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),_!==U&&_.traverseVisible(function(L){L.isLight&&L.layers.test(O.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),f.setupLights();let B=new Set;return _.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let j=L.material;if(j)if(Array.isArray(j))for(let ct=0;ct<j.length;ct++){let gt=j[ct];ce(gt,U,L),B.add(gt)}else ce(j,U,L),B.add(j)}),f=S.pop(),B},this.compileAsync=function(_,O,U=null){let B=this.compile(_,O,U);return new Promise(L=>{function j(){if(B.forEach(function(ct){mt.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){L(_);return}setTimeout(j,10)}wt.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let ee=null;function Fn(_){ee&&ee(_)}function xn(){pi.stop()}function Cl(){pi.start()}let pi=new Wh;pi.setAnimationLoop(Fn),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(_){ee=_,tt.setAnimationLoop(_),_===null?pi.stop():pi.start()},tt.addEventListener("sessionstart",xn),tt.addEventListener("sessionend",Cl),this.render=function(_,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(O),O=tt.getCamera()),_.isScene===!0&&_.onBeforeRender(x,_,O,D),f=bt.get(_,S.length),f.init(O),S.push(f),it.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),oe.setFromProjectionMatrix(it,vn,O.reversedDepth),at=this.localClippingEnabled,W=nt.init(this.clippingPlanes,at),m=z.get(_,w.length),m.init(),w.push(m),tt.enabled===!0&&tt.isPresenting===!0){let j=x.xr.getDepthSensingMesh();j!==null&&ha(j,O,-1/0,x.sortObjects)}ha(_,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ot,ut),be=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,be&&_t.addToRenderList(m,_),this.info.render.frame++,W===!0&&nt.beginShadows();let U=f.state.shadowsArray;vt.render(U,_,O),W===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=m.opaque,L=m.transmissive;if(f.setupLights(),O.isArrayCamera){let j=O.cameras;if(L.length>0)for(let ct=0,gt=j.length;ct<gt;ct++){let dt=j[ct];Pl(B,L,_,dt)}be&&_t.render(_);for(let ct=0,gt=j.length;ct<gt;ct++){let dt=j[ct];Al(m,_,dt,dt.viewport)}}else L.length>0&&Pl(B,L,_,O),be&&_t.render(_),Al(m,_,O);D!==null&&R===0&&(zt.updateMultisampleRenderTarget(D),zt.updateRenderTargetMipmap(D)),_.isScene===!0&&_.onAfterRender(x,_,O),lt.resetDefaultState(),M=-1,b=null,S.pop(),S.length>0?(f=S[S.length-1],W===!0&&nt.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function ha(_,O,U,B){if(_.visible===!1)return;if(_.layers.test(O.layers)){if(_.isGroup)U=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(O);else if(_.isLight)f.pushLight(_),_.castShadow&&f.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||oe.intersectsSprite(_)){B&&At.setFromMatrixPosition(_.matrixWorld).applyMatrix4(it);let ct=F.update(_),gt=_.material;gt.visible&&m.push(_,ct,gt,U,At.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||oe.intersectsObject(_))){let ct=F.update(_),gt=_.material;if(B&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),At.copy(_.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),At.copy(ct.boundingSphere.center)),At.applyMatrix4(_.matrixWorld).applyMatrix4(it)),Array.isArray(gt)){let dt=ct.groups;for(let Pt=0,Ot=dt.length;Pt<Ot;Pt++){let Tt=dt[Pt],Xt=gt[Tt.materialIndex];Xt&&Xt.visible&&m.push(_,ct,Xt,U,At.z,Tt)}}else gt.visible&&m.push(_,ct,gt,U,At.z,null)}}let j=_.children;for(let ct=0,gt=j.length;ct<gt;ct++)ha(j[ct],O,U,B)}function Al(_,O,U,B){let L=_.opaque,j=_.transmissive,ct=_.transparent;f.setupLightsView(U),W===!0&&nt.setGlobalState(x.clippingPlanes,U),B&&Mt.viewport(E.copy(B)),L.length>0&&ir(L,O,U),j.length>0&&ir(j,O,U),ct.length>0&&ir(ct,O,U),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Pl(_,O,U,B){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[B.id]===void 0&&(f.state.transmissionRenderTarget[B.id]=new En(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?us:On,minFilter:In,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let j=f.state.transmissionRenderTarget[B.id],ct=B.viewport||E;j.setSize(ct.z*x.transmissionResolutionScale,ct.w*x.transmissionResolutionScale);let gt=x.getRenderTarget(),dt=x.getActiveCubeFace(),Pt=x.getActiveMipmapLevel();x.setRenderTarget(j),x.getClearColor(X),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),be&&_t.render(U);let Ot=x.toneMapping;x.toneMapping=$n;let Tt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),f.setupLightsView(B),W===!0&&nt.setGlobalState(x.clippingPlanes,B),ir(_,U,B),zt.updateMultisampleRenderTarget(j),zt.updateRenderTargetMipmap(j),wt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let re=0,ye=O.length;re<ye;re++){let he=O[re],ae=he.object,Et=he.geometry,me=he.material,jt=he.group;if(me.side===Rn&&ae.layers.test(B.layers)){let $e=me.side;me.side=Ye,me.needsUpdate=!0,Rl(ae,U,B,Et,me,jt),me.side=$e,me.needsUpdate=!0,Xt=!0}}Xt===!0&&(zt.updateMultisampleRenderTarget(j),zt.updateRenderTargetMipmap(j))}x.setRenderTarget(gt,dt,Pt),x.setClearColor(X,Z),Tt!==void 0&&(B.viewport=Tt),x.toneMapping=Ot}function ir(_,O,U){let B=O.isScene===!0?O.overrideMaterial:null;for(let L=0,j=_.length;L<j;L++){let ct=_[L],gt=ct.object,dt=ct.geometry,Pt=ct.group,Ot=ct.material;Ot.allowOverride===!0&&B!==null&&(Ot=B),gt.layers.test(U.layers)&&Rl(gt,O,U,dt,Ot,Pt)}}function Rl(_,O,U,B,L,j){_.onBeforeRender(x,O,U,B,L,j),_.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),L.onBeforeRender(x,O,U,B,_,j),L.transparent===!0&&L.side===Rn&&L.forceSinglePass===!1?(L.side=Ye,L.needsUpdate=!0,x.renderBufferDirect(U,O,B,L,_,j),L.side=Xn,L.needsUpdate=!0,x.renderBufferDirect(U,O,B,L,_,j),L.side=Rn):x.renderBufferDirect(U,O,B,L,_,j),_.onAfterRender(x,O,U,B,L,j)}function sr(_,O,U){O.isScene!==!0&&(O=Dt);let B=mt.get(_),L=f.state.lights,j=f.state.shadowsArray,ct=L.state.version,gt=G.getParameters(_,L.state,j,O,U),dt=G.getProgramCacheKey(gt),Pt=B.programs;B.environment=_.isMeshStandardMaterial?O.environment:null,B.fog=O.fog,B.envMap=(_.isMeshStandardMaterial?Me:Pe).get(_.envMap||B.environment),B.envMapRotation=B.environment!==null&&_.envMap===null?O.environmentRotation:_.envMapRotation,Pt===void 0&&(_.addEventListener("dispose",q),Pt=new Map,B.programs=Pt);let Ot=Pt.get(dt);if(Ot!==void 0){if(B.currentProgram===Ot&&B.lightsStateVersion===ct)return Ol(_,gt),Ot}else gt.uniforms=G.getUniforms(_),_.onBeforeCompile(gt,x),Ot=G.acquireProgram(gt,dt),Pt.set(dt,Ot),B.uniforms=gt.uniforms;let Tt=B.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Tt.clippingPlanes=nt.uniform),Ol(_,gt),B.needsLights=Qh(_),B.lightsStateVersion=ct,B.needsLights&&(Tt.ambientLightColor.value=L.state.ambient,Tt.lightProbe.value=L.state.probe,Tt.directionalLights.value=L.state.directional,Tt.directionalLightShadows.value=L.state.directionalShadow,Tt.spotLights.value=L.state.spot,Tt.spotLightShadows.value=L.state.spotShadow,Tt.rectAreaLights.value=L.state.rectArea,Tt.ltc_1.value=L.state.rectAreaLTC1,Tt.ltc_2.value=L.state.rectAreaLTC2,Tt.pointLights.value=L.state.point,Tt.pointLightShadows.value=L.state.pointShadow,Tt.hemisphereLights.value=L.state.hemi,Tt.directionalShadowMap.value=L.state.directionalShadowMap,Tt.directionalShadowMatrix.value=L.state.directionalShadowMatrix,Tt.spotShadowMap.value=L.state.spotShadowMap,Tt.spotLightMatrix.value=L.state.spotLightMatrix,Tt.spotLightMap.value=L.state.spotLightMap,Tt.pointShadowMap.value=L.state.pointShadowMap,Tt.pointShadowMatrix.value=L.state.pointShadowMatrix),B.currentProgram=Ot,B.uniformsList=null,Ot}function Il(_){if(_.uniformsList===null){let O=_.currentProgram.getUniforms();_.uniformsList=ys.seqWithValue(O.seq,_.uniforms)}return _.uniformsList}function Ol(_,O){let U=mt.get(_);U.outputColorSpace=O.outputColorSpace,U.batching=O.batching,U.batchingColor=O.batchingColor,U.instancing=O.instancing,U.instancingColor=O.instancingColor,U.instancingMorph=O.instancingMorph,U.skinning=O.skinning,U.morphTargets=O.morphTargets,U.morphNormals=O.morphNormals,U.morphColors=O.morphColors,U.morphTargetsCount=O.morphTargetsCount,U.numClippingPlanes=O.numClippingPlanes,U.numIntersection=O.numClipIntersection,U.vertexAlphas=O.vertexAlphas,U.vertexTangents=O.vertexTangents,U.toneMapping=O.toneMapping}function Jh(_,O,U,B,L){O.isScene!==!0&&(O=Dt),zt.resetTextureUnits();let j=O.fog,ct=B.isMeshStandardMaterial?O.environment:null,gt=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:wi,dt=(B.isMeshStandardMaterial?Me:Pe).get(B.envMap||ct),Pt=B.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,Ot=!!U.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Tt=!!U.morphAttributes.position,Xt=!!U.morphAttributes.normal,re=!!U.morphAttributes.color,ye=$n;B.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ye=x.toneMapping);let he=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ae=he!==void 0?he.length:0,Et=mt.get(B),me=f.state.lights;if(W===!0&&(at===!0||_!==b)){let ze=_===b&&B.id===M;nt.setState(B,_,ze)}let jt=!1;B.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==me.state.version||Et.outputColorSpace!==gt||L.isBatchedMesh&&Et.batching===!1||!L.isBatchedMesh&&Et.batching===!0||L.isBatchedMesh&&Et.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Et.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Et.instancing===!1||!L.isInstancedMesh&&Et.instancing===!0||L.isSkinnedMesh&&Et.skinning===!1||!L.isSkinnedMesh&&Et.skinning===!0||L.isInstancedMesh&&Et.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Et.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Et.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Et.instancingMorph===!1&&L.morphTexture!==null||Et.envMap!==dt||B.fog===!0&&Et.fog!==j||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==nt.numPlanes||Et.numIntersection!==nt.numIntersection)||Et.vertexAlphas!==Pt||Et.vertexTangents!==Ot||Et.morphTargets!==Tt||Et.morphNormals!==Xt||Et.morphColors!==re||Et.toneMapping!==ye||Et.morphTargetsCount!==ae)&&(jt=!0):(jt=!0,Et.__version=B.version);let $e=Et.currentProgram;jt===!0&&($e=sr(B,O,L));let Ui=!1,Ke=!1,_s=!1,ge=$e.getUniforms(),rn=Et.uniforms;if(Mt.useProgram($e.program)&&(Ui=!0,Ke=!0,_s=!0),B.id!==M&&(M=B.id,Ke=!0),Ui||b!==_){Mt.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),ge.setValue(P,"projectionMatrix",_.projectionMatrix),ge.setValue(P,"viewMatrix",_.matrixWorldInverse);let qe=ge.map.cameraPosition;qe!==void 0&&qe.setValue(P,Ct.setFromMatrixPosition(_.matrixWorld)),te.logarithmicDepthBuffer&&ge.setValue(P,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ge.setValue(P,"isOrthographic",_.isOrthographicCamera===!0),b!==_&&(b=_,Ke=!0,_s=!0)}if(L.isSkinnedMesh){ge.setOptional(P,L,"bindMatrix"),ge.setOptional(P,L,"bindMatrixInverse");let ze=L.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),ge.setValue(P,"boneTexture",ze.boneTexture,zt))}L.isBatchedMesh&&(ge.setOptional(P,L,"batchingTexture"),ge.setValue(P,"batchingTexture",L._matricesTexture,zt),ge.setOptional(P,L,"batchingIdTexture"),ge.setValue(P,"batchingIdTexture",L._indirectTexture,zt),ge.setOptional(P,L,"batchingColorTexture"),L._colorsTexture!==null&&ge.setValue(P,"batchingColorTexture",L._colorsTexture,zt));let on=U.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&Q.update(L,U,$e),(Ke||Et.receiveShadow!==L.receiveShadow)&&(Et.receiveShadow=L.receiveShadow,ge.setValue(P,"receiveShadow",L.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(rn.envMap.value=dt,rn.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&O.environment!==null&&(rn.envMapIntensity.value=O.environmentIntensity),Ke&&(ge.setValue(P,"toneMappingExposure",x.toneMappingExposure),Et.needsLights&&jh(rn,_s),j&&B.fog===!0&&K.refreshFogUniforms(rn,j),K.refreshMaterialUniforms(rn,B,k,$,f.state.transmissionRenderTarget[_.id]),ys.upload(P,Il(Et),rn,zt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ys.upload(P,Il(Et),rn,zt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ge.setValue(P,"center",L.center),ge.setValue(P,"modelViewMatrix",L.modelViewMatrix),ge.setValue(P,"normalMatrix",L.normalMatrix),ge.setValue(P,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let ze=B.uniformsGroups;for(let qe=0,ua=ze.length;qe<ua;qe++){let mi=ze[qe];Bt.update(mi,$e),Bt.bind(mi,$e)}}return $e}function jh(_,O){_.ambientLightColor.needsUpdate=O,_.lightProbe.needsUpdate=O,_.directionalLights.needsUpdate=O,_.directionalLightShadows.needsUpdate=O,_.pointLights.needsUpdate=O,_.pointLightShadows.needsUpdate=O,_.spotLights.needsUpdate=O,_.spotLightShadows.needsUpdate=O,_.rectAreaLights.needsUpdate=O,_.hemisphereLights.needsUpdate=O}function Qh(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(_,O,U){let B=mt.get(_);B.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),mt.get(_.texture).__webglTexture=O,mt.get(_.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:U,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,O){let U=mt.get(_);U.__webglFramebuffer=O,U.__useDefaultFramebuffer=O===void 0};let tu=P.createFramebuffer();this.setRenderTarget=function(_,O=0,U=0){D=_,A=O,R=U;let B=!0,L=null,j=!1,ct=!1;if(_){let dt=mt.get(_);if(dt.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(P.FRAMEBUFFER,null),B=!1;else if(dt.__webglFramebuffer===void 0)zt.setupRenderTarget(_);else if(dt.__hasExternalTextures)zt.rebindTextures(_,mt.get(_.texture).__webglTexture,mt.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Tt=_.depthTexture;if(dt.__boundDepthTexture!==Tt){if(Tt!==null&&mt.has(Tt)&&(_.width!==Tt.image.width||_.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");zt.setupDepthRenderbuffer(_)}}let Pt=_.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ct=!0);let Ot=mt.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(Ot[O])?L=Ot[O][U]:L=Ot[O],j=!0):_.samples>0&&zt.useMultisampledRTT(_)===!1?L=mt.get(_).__webglMultisampledFramebuffer:Array.isArray(Ot)?L=Ot[U]:L=Ot,E.copy(_.viewport),V.copy(_.scissor),H=_.scissorTest}else E.copy(St).multiplyScalar(k).floor(),V.copy(kt).multiplyScalar(k).floor(),H=de;if(U!==0&&(L=tu),Mt.bindFramebuffer(P.FRAMEBUFFER,L)&&B&&Mt.drawBuffers(_,L),Mt.viewport(E),Mt.scissor(V),Mt.setScissorTest(H),j){let dt=mt.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,dt.__webglTexture,U)}else if(ct){let dt=O;for(let Pt=0;Pt<_.textures.length;Pt++){let Ot=mt.get(_.textures[Pt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Pt,Ot.__webglTexture,U,dt)}}else if(_!==null&&U!==0){let dt=mt.get(_.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,dt.__webglTexture,U)}M=-1},this.readRenderTargetPixels=function(_,O,U,B,L,j,ct,gt=0){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=mt.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt){Mt.bindFramebuffer(P.FRAMEBUFFER,dt);try{let Pt=_.textures[gt],Ot=Pt.format,Tt=Pt.type;if(!te.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=_.width-B&&U>=0&&U<=_.height-L&&(_.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(O,U,B,L,xt.convert(Ot),xt.convert(Tt),j))}finally{let Pt=D!==null?mt.get(D).__webglFramebuffer:null;Mt.bindFramebuffer(P.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=function(_,O,U,B,L,j,ct,gt=0){return et(this,null,function*(){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=mt.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt)if(O>=0&&O<=_.width-B&&U>=0&&U<=_.height-L){Mt.bindFramebuffer(P.FRAMEBUFFER,dt);let Pt=_.textures[gt],Ot=Pt.format,Tt=Pt.type;if(!te.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Xt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.bufferData(P.PIXEL_PACK_BUFFER,j.byteLength,P.STREAM_READ),_.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(O,U,B,L,xt.convert(Ot),xt.convert(Tt),0);let re=D!==null?mt.get(D).__webglFramebuffer:null;Mt.bindFramebuffer(P.FRAMEBUFFER,re);let ye=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),yield yh(P,ye,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,j),P.deleteBuffer(Xt),P.deleteSync(ye),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")})},this.copyFramebufferToTexture=function(_,O=null,U=0){let B=Math.pow(2,-U),L=Math.floor(_.image.width*B),j=Math.floor(_.image.height*B),ct=O!==null?O.x:0,gt=O!==null?O.y:0;zt.setTexture2D(_,0),P.copyTexSubImage2D(P.TEXTURE_2D,U,0,0,ct,gt,L,j),Mt.unbindTexture()};let eu=P.createFramebuffer(),nu=P.createFramebuffer();this.copyTextureToTexture=function(_,O,U=null,B=null,L=0,j=null){j===null&&(L!==0?(Ei("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=L,L=0):j=0);let ct,gt,dt,Pt,Ot,Tt,Xt,re,ye,he=_.isCompressedTexture?_.mipmaps[j]:_.image;if(U!==null)ct=U.max.x-U.min.x,gt=U.max.y-U.min.y,dt=U.isBox3?U.max.z-U.min.z:1,Pt=U.min.x,Ot=U.min.y,Tt=U.isBox3?U.min.z:0;else{let on=Math.pow(2,-L);ct=Math.floor(he.width*on),gt=Math.floor(he.height*on),_.isDataArrayTexture?dt=he.depth:_.isData3DTexture?dt=Math.floor(he.depth*on):dt=1,Pt=0,Ot=0,Tt=0}B!==null?(Xt=B.x,re=B.y,ye=B.z):(Xt=0,re=0,ye=0);let ae=xt.convert(O.format),Et=xt.convert(O.type),me;O.isData3DTexture?(zt.setTexture3D(O,0),me=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(zt.setTexture2DArray(O,0),me=P.TEXTURE_2D_ARRAY):(zt.setTexture2D(O,0),me=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);let jt=P.getParameter(P.UNPACK_ROW_LENGTH),$e=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ui=P.getParameter(P.UNPACK_SKIP_PIXELS),Ke=P.getParameter(P.UNPACK_SKIP_ROWS),_s=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,he.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Tt);let ge=_.isDataArrayTexture||_.isData3DTexture,rn=O.isDataArrayTexture||O.isData3DTexture;if(_.isDepthTexture){let on=mt.get(_),ze=mt.get(O),qe=mt.get(on.__renderTarget),ua=mt.get(ze.__renderTarget);Mt.bindFramebuffer(P.READ_FRAMEBUFFER,qe.__webglFramebuffer),Mt.bindFramebuffer(P.DRAW_FRAMEBUFFER,ua.__webglFramebuffer);for(let mi=0;mi<dt;mi++)ge&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,mt.get(_).__webglTexture,L,Tt+mi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,mt.get(O).__webglTexture,j,ye+mi)),P.blitFramebuffer(Pt,Ot,ct,gt,Xt,re,ct,gt,P.DEPTH_BUFFER_BIT,P.NEAREST);Mt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(L!==0||_.isRenderTargetTexture||mt.has(_)){let on=mt.get(_),ze=mt.get(O);Mt.bindFramebuffer(P.READ_FRAMEBUFFER,eu),Mt.bindFramebuffer(P.DRAW_FRAMEBUFFER,nu);for(let qe=0;qe<dt;qe++)ge?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,on.__webglTexture,L,Tt+qe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,on.__webglTexture,L),rn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ze.__webglTexture,j,ye+qe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ze.__webglTexture,j),L!==0?P.blitFramebuffer(Pt,Ot,ct,gt,Xt,re,ct,gt,P.COLOR_BUFFER_BIT,P.NEAREST):rn?P.copyTexSubImage3D(me,j,Xt,re,ye+qe,Pt,Ot,ct,gt):P.copyTexSubImage2D(me,j,Xt,re,Pt,Ot,ct,gt);Mt.bindFramebuffer(P.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else rn?_.isDataTexture||_.isData3DTexture?P.texSubImage3D(me,j,Xt,re,ye,ct,gt,dt,ae,Et,he.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(me,j,Xt,re,ye,ct,gt,dt,ae,he.data):P.texSubImage3D(me,j,Xt,re,ye,ct,gt,dt,ae,Et,he):_.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,j,Xt,re,ct,gt,ae,Et,he.data):_.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,j,Xt,re,he.width,he.height,ae,he.data):P.texSubImage2D(P.TEXTURE_2D,j,Xt,re,ct,gt,ae,Et,he);P.pixelStorei(P.UNPACK_ROW_LENGTH,jt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,$e),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ui),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ke),P.pixelStorei(P.UNPACK_SKIP_IMAGES,_s),j===0&&O.generateMipmaps&&P.generateMipmap(me),Mt.unbindTexture()},this.copyTextureToTexture3D=function(_,O,U=null,B=null,L=0){return Ei('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(_,O,U,B,L)},this.initRenderTarget=function(_){mt.get(_).__webglFramebuffer===void 0&&zt.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?zt.setTextureCube(_,0):_.isData3DTexture?zt.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?zt.setTexture2DArray(_,0):zt.setTexture2D(_,0),Mt.unbindTexture()},this.resetState=function(){A=0,R=0,D=null,Mt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}};var aa=class r{config={radius:800,magnification:2,distortion:.3};constructor(){}setConfig(t){this.config=Wt(Wt({},this.config),t)}getConfig(){return Wt({},this.config)}calculateEffect(t,e,n=1e3,i=1080){let s=t.x-e.x,o=t.y-e.y,a=Math.sqrt(s*s+o*o);if(a>this.config.radius)return null;let c=a/this.config.radius,l=1-Math.pow(c,3),h=1;if(this.config.maxHeight!==void 0&&this.config.cameraZ!==void 0&&this.config.fov!==void 0){let f=this.config.maxHeight/100*i,w=this.config.fov*Math.PI/180,S=2*Math.tan(w/2)*this.config.cameraZ,x=i/S,C=n*x;h=1+(f/C-1)*l}else h=1+(this.config.magnification-1)*l;let u=this.config.distortion*l,d=Math.atan2(o,s),p=a*u,g=new $t(Math.cos(d)*p,Math.sin(d)*p),y=Math.floor(l*1e3)+1e3;return{scale:h,positionOffset:g,renderOrder:y}}static \u0275fac=function(e){return new(e||r)};static \u0275prov=Hi({token:r,factory:r.\u0275fac,providedIn:"root"})};var fi=class r{PHOTO_W;PHOTO_H;FOV_DEG;CAM_MARGIN;DEFAULT_COMPOSITION_MARGIN_RATIO=.1;MAX_COMPOSITION_MARGIN_RATIO=.3;CAM_DAMP;ANISO;BG;FISHEYE_SCALE_DAMPING=5;FISHEYE_RENDER_ORDER_BASE=1e6;static SVG_TARGET_RESOLUTION=4e3;static SVG_HOVER_OVERLAY_RESOLUTION=1024;container=null;renderer;overlayRenderer=null;scene;camera;root;clock;texLoader;rafRunning=!1;activeTweens=[];contentBounds={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};bounds={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};targetCamZ=1200;zSpawn=700;isInitialized=!1;destroy$=new Nn;textureCache=new Map;loadingTextures=new Map;highResTextureCache=new Map;loadingHighResTextures=new Map;maxTextureSize=4096;svgBackgroundPlane;svgBackgroundTexture;svgBackgroundOptions;raycaster=new qs;mouse=new $t;hasUserInteracted=!1;isDragging=!1;draggedMesh=null;dragPlane=new cn;dragOffset=new N;dragCallbacks=new Map;hoverOnlyMeshes=new Set;meshToPhotoId=new Map;photoIdToMesh=new Map;meshToPhotoData=new Map;currentLayoutStrategy=null;layoutStrategyRef=null;lastTouchDistance=0;touchStartDistance=0;touchPanStart={x:0,y:0};isTwoFingerGesture=!1;svgContainer=null;svgHoverOverlayElement=null;svgHoverOverlayGroups=new Map;svgHoverOverlayCanvas=null;svgHoverOverlayContext=null;svgHoverOverlayTexture;svgHoverOverlayPlane;activeHoverGroupId=null;hoverOverlayRenderToken=0;svgHoverOverlayCachedImages=new Map;svgHoverOverlayPendingImage=null;onDragCompleteCallback;onPhotoClickCallback;onBackgroundClickCallback;mouseDownPosition=new $t;clickThreshold=5;FALLBACK_MOUSE_MOVEMENT=1e3;hoveredMesh=null;wasFisheyeEnabled=!1;userControlEnabled=!0;targetCamX=0;targetCamY=0;computedMinCamZ=300;computedMaxCamZ=5e4;isPanning=!1;panStartMouse=new $t;panStartCameraPos=new N;cameraMode="auto-fit";lastMousePos=new $t;lastClientX=null;lastClientY=null;meshToUrl=new Map;meshToEnhancedUrl=new Map;highResActive=new Set;lodAccumTime=0;fisheyeService;fisheyeEnabled=!1;fisheyeEnabledSignal=!1;fisheyeResumeOnPointer=!1;frustum=new Ai;frustumMatrix=new _e;lastRenderTime=0;isSceneIdle=!1;idleCheckInterval=0;IDLE_THRESHOLD=.001;IDLE_CHECK_INTERVAL=.1;visibleMeshCount=0;totalMeshCount=0;cullingLogCounter=0;performanceMonitoring=!1;frameCount=0;lastFpsUpdate=0;currentFps=0;renderCount=0;skippedFrames=0;frameCallbacks=new Set;fisheyeAnimationLock=!1;fisheyeAffectedMeshes=new Set;topFisheyeMesh=null;thematicFisheyeEffectsEnabled=!1;layoutRotationOverrideEnabled=!1;fisheyeLastDeltaTime=1/60;fisheyePointerActive=!1;taxonomyEffectBaseOpacity=new Map;taxonomyHoverFocus=null;fisheyeFocusPoint=new N;permalinkTargetId=null;meshOriginalStates=new Map;hoveredItemSignal=Nt(!1);INTERACTIVE_OPACITY_THRESHOLD=.99;rotationSpeedMultiplier=1;panSensitivityMultiplier=1;dofStrength=0;dofPass=null;platformService=Le(Jn);constructor(){this.fisheyeService=new aa;let t={};this.PHOTO_W=t.photoWidth??Lt.PHOTO_WIDTH,this.PHOTO_H=t.photoHeight??Lt.PHOTO_HEIGHT,this.FOV_DEG=t.fovDeg??45,this.CAM_MARGIN=t.cameraMargin??300,this.CAM_DAMP=t.cameraDamp??.1*1e4,this.ANISO=t.anisotropy??(this.platformService.isMobile?2:4),this.BG=t.background??16776694}initialize(t,e){return et(this,null,function*(){if(this.isInitialized)throw new Error("ThreeRendererService is already initialized");this.container=t,e&&e.svgBackground&&(this.svgBackgroundOptions=e.svgBackground),yield this.initializeThreeJS(),this.isInitialized=!0})}createPhotoMesh(t){return et(this,null,function*(){if(!this.isInitialized)throw new Error("ThreeRendererService not initialized");let e=yield this.loadTexture(t.url),n=new un({map:e,transparent:!0,opacity:1}),i=new An(this.PHOTO_W,this.PHOTO_H),s=new Fe(i,n),o=t.currentPosition;s.position.set(o.x,o.y,o.z);let a=t.metadata.renderOrder;s.renderOrder=a!==void 0?a:0;let c=this.calculatePhotoRotation(t);return s.rotation.z=c,this.root.add(s),t.setMesh(s),this.meshToPhotoData.set(s,t),this.meshToUrl.set(s,t.url),this.meshToEnhancedUrl.set(s,t.enhancedUrl),s})}updatePhotoMesh(t){if(!t.mesh)return;let e=t.currentPosition;t.mesh.position.set(e.x,e.y,e.z);let n=t.metadata.renderOrder;t.mesh.renderOrder=n!==void 0?n:0;let i=this.calculatePhotoRotation(t);t.mesh.rotation.z=i}removePhotoMesh(t){if(!t.mesh)return;this.root.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material instanceof en&&t.mesh.material.dispose(),this.meshToPhotoData.delete(t.mesh),this.meshToUrl.delete(t.mesh),this.meshToEnhancedUrl.delete(t.mesh);let e=this.meshToPhotoId.get(t.mesh);e&&this.photoIdToMesh.delete(e),this.meshToPhotoId.delete(t.mesh),this.dragCallbacks.delete(t.mesh),this.highResActive.delete(t.mesh),this.topFisheyeMesh===t.mesh&&(this.topFisheyeMesh=null),this.fisheyeAffectedMeshes.delete(t.mesh),this.taxonomyEffectBaseOpacity.delete(t.mesh),t.setMesh(null)}updateMeshPosition(t,e){t.position.set(e.x,e.y,e.z)}upgradeToHighResTexture(t,e){return et(this,null,function*(){try{let n=yield this.loadHighResTexture(e);if(t.material instanceof un){let i=t.material.map;i&&!this.highResTextureCache.has(e)&&i.dispose(),t.material.map=n,t.material.needsUpdate=!0}}catch(n){console.warn("Failed to upgrade to high-res texture, keeping low-res:",n)}})}downgradeToLowResTexture(t,e){return et(this,null,function*(){try{let n=yield this.loadTexture(e);t.material instanceof un&&(t.material.map=n,t.material.needsUpdate=!0)}catch(n){console.warn("Failed to downgrade to low-res texture:",n)}})}removeMesh(t){this.root.remove(t),this.meshToUrl.delete(t),this.highResActive.delete(t),this.dragCallbacks.delete(t),this.hoverOnlyMeshes.delete(t),t.geometry.dispose(),t.material instanceof en&&t.material.dispose()}animateToPosition(t,e,n,i){return new Promise(s=>{let o=this.makeTween(i,a=>{let c=this.easeOutCubic(a),l=this.easeInOutCubic(a),h=this.lerp(e.x,n.x,c),u=this.lerp(e.y,n.y,c),d=this.lerp(e.z,n.z,l);t.position.set(h,u,d),a>=1&&(t.position.set(n.x,n.y,n.z),s())});this.addTween(o)})}animateOpacity(t,e,n,i){return new Promise(s=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let o=this.makeTween(i,a=>{let c=this.easeOutCubic(a),l=this.lerp(e,n,c);t.material&&"opacity"in t.material&&(t.material.opacity=l),a>=1&&(t.material&&"opacity"in t.material&&(t.material.opacity=n),s())});this.addTween(o)})}animatePositionAndOpacity(t,e,n,i,s,o){return new Promise(a=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let c=this.makeTween(o,l=>{let h=this.easeOutCubic(l),u=this.easeInOutCubic(l),d=this.lerp(e.x,n.x,h),p=this.lerp(e.y,n.y,h),g=this.lerp(e.z,n.z,u);t.position.set(d,p,g);let y=this.lerp(i,s,h);t.material&&"opacity"in t.material&&(t.material.opacity=y),l>=1&&(t.position.set(n.x,n.y,n.z),t.material&&"opacity"in t.material&&(t.material.opacity=s),a())});this.addTween(c)})}setSceneBounds(t,e){if(this.contentBounds=Wt({},t),this.bounds=this.expandBoundsForCompositionMargin(t,this.MAX_COMPOSITION_MARGIN_RATIO),this.recomputeZoomLimits(),!(this.cameraMode==="auto-fit"||e?.force))return this.clampCameraToBounds(),Promise.resolve();this.cameraMode="auto-fit";let i=(t.minX+t.maxX)*.5,s=(t.minY+t.maxY)*.5,o=this.expandBoundsForCompositionMargin(t,this.DEFAULT_COMPOSITION_MARGIN_RATIO),a=this.computeFitZWithMargin(o,ie.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN);if(e?.animate){let c=this.targetCamX,l=this.targetCamY,h=this.targetCamZ,u=e.duration??2.4;return Math.abs(a-h)<.01&&Math.abs(i-c)<.01&&Math.abs(s-l)<.01?Promise.resolve():new Promise(d=>{let p=this.makeTween(u,g=>{let y=this.easeOutCubic(g);this.targetCamX=this.lerp(c,i,y),this.targetCamY=this.lerp(l,s,y),this.targetCamZ=this.lerp(h,a,y),g>=1&&(this.targetCamX=i,this.targetCamY=s,this.targetCamZ=a,d())});this.addTween(p)})}else return this.targetCamX=i,this.targetCamY=s,this.targetCamZ=a,Promise.resolve()}expandBoundsForCompositionMargin(t,e){let n=Math.max(1,t.maxX-t.minX),i=Math.max(1,t.maxY-t.minY),s=n*e,o=i*e;return{minX:t.minX-s,maxX:t.maxX+s,minY:t.minY-o,maxY:t.maxY+o}}recomputeZoomLimits(){if(!this.camera||!this.container||this.container.clientWidth===0||this.container.clientHeight===0)return;let t=ie.degToRad(this.camera.fov),e=this.container.clientWidth/this.container.clientHeight;this.computedMaxCamZ=this.computeFitZWithMargin(this.bounds,t,e,this.CAM_MARGIN);let n={minX:-this.PHOTO_W/2,maxX:this.PHOTO_W/2,minY:-this.PHOTO_H/2,maxY:this.PHOTO_H/2};this.computedMinCamZ=this.computeFitZWithMargin(n,t,e,0),this.computedMinCamZ>this.computedMaxCamZ&&(this.computedMinCamZ=this.computedMaxCamZ);let i=this.computedMaxCamZ*2;this.camera.far<i&&(this.camera.far=i,this.camera.updateProjectionMatrix())}setUserControlEnabled(t){this.userControlEnabled=t}setCameraMode(t){this.cameraMode=t,t==="auto-fit"&&this.setSceneBounds(this.contentBounds,{force:!0})}resetCameraView(t=!0){this.setSceneBounds(this.contentBounds,{animate:t,force:!0,duration:.5})}zoomAtPoint(t,e,n){if(!this.userControlEnabled)return;this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let i=this.container.getBoundingClientRect(),s=(e-i.left)/i.width*2-1,o=-((n-i.top)/i.height)*2+1,a=this.projectScreenToWorld(s,o,this.targetCamX,this.targetCamY,this.targetCamZ),c=ie.clamp(this.targetCamZ*t,this.computedMinCamZ,this.computedMaxCamZ);this.targetCamZ=c;let l=this.projectScreenToWorld(s,o,this.targetCamX,this.targetCamY,this.targetCamZ);this.targetCamX+=a.x-l.x,this.targetCamY+=a.y-l.y,this.clampCameraToBounds(),this.wakeUpRenderLoop()}wakeUpRenderLoop(){this.isSceneIdle=!1}calculatePhotoRotation(t){let e=t.metadata;if(this.layoutRotationOverrideEnabled){let g=e._tsneRotateDeg;if(typeof g=="number")return ie.degToRad(g)}let n=e.plausibility,i=e._svgZoneFavorableFuture||e.favorable_future;if(n==null||!i)return this.getStableRandomRotation(t.id);let s=n/100,a=ie.degToRad(32),c=(1-s)*a,l=i.toLowerCase().trim(),h=l==="favor"||l==="favorable"||l==="prefer"||l==="preferred"||l==="mostly prefer"||l==="prefer-ish"||l==="yes",u=l==="prevent"||l==="prevented"||l==="unfavorable"||l==="mostly prevent"||l==="prevent-ish"||l==="no";return l==="uncertain"||l==="unsure"?0:!h&&!u?(console.warn("[ROTATION] Unknown favorable_future value:",i,"for photo:",t.id),this.getStableRandomRotation(t.id)):h?c:-c}calculateEvaluationRotation(t){let e=t.metadata,n=e.plausibility,i=e._svgZoneFavorableFuture||e.favorable_future;if(n==null||!i)return this.getStableRandomRotation(t.id);let s=n/100,a=ie.degToRad(32),c=(1-s)*a,l=i.toLowerCase().trim(),h=l==="favor"||l==="favorable"||l==="prefer"||l==="preferred"||l==="mostly prefer"||l==="prefer-ish";return!h&&!(l==="prevent"||l==="prevented"||l==="unfavorable"||l==="mostly prevent"||l==="prevent-ish")?this.getStableRandomRotation(t.id):h?c:-c}getStableRandomRotation(t){let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e=e&e;let n=Math.abs(e)%3-1;return ie.degToRad(n)}projectScreenToWorld(t,e,n,i,s){let o=ie.degToRad(this.camera.fov),a=2*Math.tan(o/2)*s,c=a*this.camera.aspect,l=n+t*c/2,h=i+e*a/2;return new N(l,h,0)}panCamera(t,e){if(!this.userControlEnabled)return;this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let n=this.container.getBoundingClientRect(),i=t/n.width*2*this.getVisibleWidth(),s=e/n.height*2*this.getVisibleHeight(),o=this.panSensitivityMultiplier;this.targetCamX-=i*o,this.targetCamY+=s*o,this.clampCameraToBounds()}getVisibleWidth(){let t=ie.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ*this.camera.aspect/2}getVisibleWidthAtDepth(t){let e=ie.degToRad(this.camera.fov);return 2*Math.tan(e/2)*t*this.camera.aspect/2}getVisibleHeight(){let t=ie.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ/2}clampCameraToBounds(){if(!Number.isFinite(this.bounds.minX)||!Number.isFinite(this.bounds.maxX)||!Number.isFinite(this.bounds.minY)||!Number.isFinite(this.bounds.maxY))return;this.targetCamZ=ie.clamp(this.targetCamZ,this.computedMinCamZ,this.computedMaxCamZ);let t=this.getVisibleWidth(),e=this.getVisibleHeight(),n=this.CAM_MARGIN*.5,i=this.bounds.minX-this.CAM_MARGIN+t,s=this.bounds.maxX+this.CAM_MARGIN-t,o=this.bounds.minY-this.CAM_MARGIN+e,a=this.bounds.maxY+this.CAM_MARGIN-e,c=i>s?(this.bounds.minX+this.bounds.maxX)*.5:ie.clamp(this.targetCamX,i,s),l=o>a?(this.bounds.minY+this.bounds.maxY)*.5:ie.clamp(this.targetCamY,o,a),h=i-n,u=s+n,d=o-n,p=a+n,g=this.targetCamX<h||this.targetCamX>u,y=this.targetCamY<d||this.targetCamY>p,m=.25;g&&(this.targetCamX=this.lerp(this.targetCamX,c,m)),y&&(this.targetCamY=this.lerp(this.targetCamY,l,m))}screenToWorld(t,e,n){let i=new N(t,e,.5);i.unproject(this.camera);let s=i.sub(this.camera.position).normalize(),o=(n-this.camera.position.z)/s.z;return this.camera.position.clone().add(s.multiplyScalar(o))}getCameraSpawnZ(){return this.camera.position.z-this.zSpawn}getTargetCameraZ(){return this.targetCamZ}worldToScreen(t,e){if(!this.camera||!this.container||!this.isInitialized)return null;let n=new N(t,e,0);n.project(this.camera);let i=this.container.getBoundingClientRect();return{x:(n.x*.5+.5)*i.width,y:(-n.y*.5+.5)*i.height}}addFrameCallback(t){return this.frameCallbacks.add(t),()=>this.frameCallbacks.delete(t)}focusOnItemFromShowOnMap(t,e,n){return et(this,null,function*(){this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=!1;let i=this.targetCamZ*.25;if(n&&n.mesh){let s=new Cn().setFromObject(n.mesh),o=s.max.x-s.min.x,a=s.max.y-s.min.y,c=ie.degToRad(this.FOV_DEG);i=a/Math.tan(c/2)}i=ie.clamp(i,this.computedMinCamZ,this.computedMaxCamZ),yield this.animateCameraToZoomLevel(t,e,i,1.25)})}animateCameraToZoomLevel(t,e,n,i){return new Promise(s=>{let o=this.targetCamX,a=this.targetCamY,c=this.targetCamZ,l=ie.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);if(i<=.01){this.targetCamX=t,this.targetCamY=e,this.targetCamZ=l,s();return}let h=this.makeTween(i,u=>{let d=this.easeInOutCubic(u);this.targetCamX=this.lerp(o,t,d),this.targetCamY=this.lerp(a,e,d),this.targetCamZ=this.lerp(c,l,d),u>=1&&(this.targetCamX=t,this.targetCamY=e,this.targetCamZ=l,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal,s())});this.addTween(h)})}getCurrentBounds(){return Wt({},this.bounds)}enableFisheyeEffect(t){this.fisheyeEnabled=t,this.fisheyeEnabledSignal=t,t||this.resetAllFisheyeEffects()}setThematicFisheyeEffectsEnabled(t){this.thematicFisheyeEffectsEnabled=t,t||this.resetFisheyeTaxonomyOpacityDimming()}setLayoutRotationOverrideEnabled(t){this.layoutRotationOverrideEnabled!==t&&(this.layoutRotationOverrideEnabled=t,this.meshToPhotoData.forEach((e,n)=>{n.rotation.z=this.calculatePhotoRotation(e),n.userData.originalRotation!==void 0&&(n.userData.originalRotation=n.rotation.z)}),this.wakeUpRenderLoop())}enablePerformanceMonitoring(t){this.performanceMonitoring=t,t&&(this.frameCount=0,this.renderCount=0,this.skippedFrames=0,this.lastFpsUpdate=performance.now())}getPerformanceMetrics(){return{fps:this.currentFps,visibleMeshes:this.visibleMeshCount,totalMeshes:this.totalMeshCount,isIdle:this.isSceneIdle,isMonitoring:this.performanceMonitoring}}isFisheyeEnabled(){return this.fisheyeEnabled}isFisheyeAffectingAnyMesh(){return this.fisheyeEnabled&&this.hasUserInteracted&&this.fisheyeAffectedMeshes.size>0}isDraggingItem(){return this.isDragging}isHoveringItem(){return this.hoveredItemSignal}setFisheyeConfig(t){this.fisheyeService.setConfig(Je(Wt({},t),{cameraZ:t.cameraZ??this.targetCamZ,fov:t.fov??this.FOV_DEG}))}getFisheyeConfig(){return this.fisheyeService.getConfig()}addTween(t){this.activeTweens.push(t),this.isSceneIdle=!1}runTween(t){return new Promise(e=>{this.activeTweens.push(n=>t(n)?(e(),!0):!1)})}makeTween(t,e){let n=0;return i=>{n+=i;let s=this.clamp01(n/t);return e(s),s>=1}}expandBounds(t,e,n,i){let s=n*.5,o=i*.5;this.bounds.minX=Math.min(this.bounds.minX,t-s),this.bounds.maxX=Math.max(this.bounds.maxX,t+s),this.bounds.minY=Math.min(this.bounds.minY,e-o),this.bounds.maxY=Math.max(this.bounds.maxY,e+o)}easeOutCubic(t){return t=this.clamp01(t),1-Math.pow(1-t,2)}easeInOutCubic(t){return t=this.clamp01(t),t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}easeOutBack(t,e=1.70158){return t=this.clamp01(t),1+(e+1)*Math.pow(t-1,3)+e*Math.pow(t-1,2)}lerp(t,e,n){return ie.lerp(t,e,n)}damp(t,e,n,i){return ie.lerp(t,e,1-Math.exp(-n*i))}disableFisheyeForZoom(){this.fisheyeEnabled&&(this.fisheyeEnabled=!1,this.resetAllFisheyeEffects())}reEnableFisheyeAfterZoom(){this.fisheyeEnabledSignal&&(this.fisheyeEnabled=!0,this.fisheyeResumeOnPointer=!1)}applyFisheyeEffect(){let t=this.container?.clientHeight??window.innerHeight;if(this.fisheyeService.setConfig({cameraZ:this.targetCamZ,fov:this.FOV_DEG,viewportHeight:t}),!this.fisheyeEnabled){this.topFisheyeMesh=null,this.resetFisheyeTaxonomyOpacityDimming();return}let e=this.screenToWorld(this.mouse.x,this.mouse.y,0);this.fisheyeFocusPoint.set(e.x,e.y,0);let n=new Set(this.fisheyeAffectedMeshes);this.fisheyeAffectedMeshes.clear();let i=this.fisheyeService.getConfig();if(i.maxHeight!==void 0&&t>0){let c=this.FOV_DEG*Math.PI/180,l=2*Math.tan(c/2)*this.targetCamZ,h=t/Math.max(1,l);if(this.PHOTO_H*h/t*100>=i.maxHeight){for(let p of n){let g=this.meshToPhotoData.get(p);if(g&&g.currentPosition)p.position.set(g.currentPosition.x,g.currentPosition.y,g.currentPosition.z);else if(this.meshOriginalStates.has(p)){let y=this.meshOriginalStates.get(p);p.position.copy(y.position)}p.scale.set(1,1,1),this.restoreBaseRenderOrder(p,g),p.userData.originalRotation!==void 0&&(p.rotation.z=p.userData.originalRotation,p.userData.originalRotation=void 0),p.userData.shadowMesh&&(this.scene.remove(p.userData.shadowMesh),p.userData.shadowMesh=null)}this.topFisheyeMesh=null,this.resetFisheyeTaxonomyOpacityDimming();return}}let s=i.radius*i.radius,o=null,a=-1/0;this.root.children.forEach(c=>{let l=c;if(!l.isMesh)return;if(!this.isMeshInteractive(l)){if(n.has(l)){let f=this.meshToPhotoData.get(l);f&&f.currentPosition?l.position.set(f.currentPosition.x,f.currentPosition.y,f.currentPosition.z):this.meshOriginalStates.has(l)&&l.position.copy(this.meshOriginalStates.get(l).position),l.scale.set(1,1,1),this.restoreBaseRenderOrder(l,f),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null)}return}let h=this.meshToPhotoData.get(l);if(h&&h.animationState==="hidden"){n.has(l)&&(l.position.set(h.currentPosition.x,h.currentPosition.y,h.currentPosition.z),l.scale.set(1,1,1),this.restoreBaseRenderOrder(l,h),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null));return}let u=l.position.clone(),d=this.PHOTO_H;h?(u=new N(h.currentPosition.x,h.currentPosition.y,h.currentPosition.z),h.height&&(d=h.height)):(this.meshOriginalStates.has(l)||this.meshOriginalStates.set(l,{position:l.position.clone(),scale:l.scale.clone(),renderOrder:l.renderOrder}),u=this.meshOriginalStates.get(l).position.clone());let p=u.x-this.fisheyeFocusPoint.x,g=u.y-this.fisheyeFocusPoint.y;if(p*p+g*g>s){n.has(l)&&(l.scale.set(1,1,1),l.position.copy(u),this.restoreBaseRenderOrder(l,h),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),this.draggedMesh===l&&l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null));return}let m=this.fisheyeService.calculateEffect(u,this.fisheyeFocusPoint,d,t);if(m){if(this.fisheyeAffectedMeshes.add(l),l.userData.originalRotation||(l.userData.originalRotation=l.rotation.z),h){let x=this.calculateEvaluationRotation(h);l.rotation.z=x}let f=m.scale;if(this.isDragging&&this.draggedMesh===l)if(f=1,l.userData.shadowMesh){let x=l.userData.shadowMesh;x.position.set(u.x+m.positionOffset.x+20,u.y+m.positionOffset.y-30,u.z-1),x.scale.set(f,f,1),x.renderOrder=this.FISHEYE_RENDER_ORDER_BASE+m.renderOrder-1}else{let x=new An(1,1),C=new un({color:0,transparent:!0,opacity:.3,depthWrite:!1}),A=new Fe(x,C);A.scale.set(l.scale.x,l.scale.y,1),A.position.set(l.position.x+20,l.position.y-30,l.position.z-1),A.renderOrder=this.FISHEYE_RENDER_ORDER_BASE+m.renderOrder-1,this.scene.add(A),l.userData.shadowMesh=A}else l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null);let w=l.scale.x,S=this.damp(w,f,this.FISHEYE_SCALE_DAMPING,this.fisheyeLastDeltaTime);l.scale.set(S,S,1),l.position.set(u.x+m.positionOffset.x,u.y+m.positionOffset.y,u.z),m.renderOrder>a&&(a=m.renderOrder,o=l),l.renderOrder=this.FISHEYE_RENDER_ORDER_BASE+m.renderOrder}else n.has(l)&&(l.scale.set(1,1,1),l.position.copy(u),this.restoreBaseRenderOrder(l,h),l.userData.originalRotation!==void 0&&(l.rotation.z=l.userData.originalRotation,l.userData.originalRotation=void 0),l.userData.shadowMesh&&(this.scene.remove(l.userData.shadowMesh),l.userData.shadowMesh=null))}),this.topFisheyeMesh=o,this.applyFisheyeTaxonomyOpacityDimming(o)}getMeshOpacity(t){let e=t.material;if(Array.isArray(e)){for(let n of e)if(n.opacity!==void 0)return n.opacity;return 1}return e.opacity!==void 0?e.opacity:1}setMeshOpacity(t,e){let n=ie.clamp(e,0,1),i=t.material;if(Array.isArray(i)){for(let s of i)s.opacity!==void 0&&(s.opacity=n,s.transparent=n<1,s.needsUpdate=!0);return}i.opacity!==void 0&&(i.opacity=n,i.transparent=n<1,i.needsUpdate=!0)}getMeshTaxonomy(t){let n=this.meshToPhotoData.get(t)?.metadata?.topics??[],i=Array.isArray(n)?n.filter(a=>typeof a=="string"&&a.trim().length>0):[],s=new Set(i),o=new Set;for(let a of i){let c=a.split("/")[0];c&&o.add(c)}return{topics:s,themes:o,orderedTopics:i}}setsIntersect(t,e){if(t.size===0||e.size===0)return!1;for(let n of t)if(e.has(n))return!0;return!1}getTaxonomyAnchorMesh(t){if(!t)return null;let e=this.getMeshTaxonomy(t);if(e.topics.size>0||e.themes.size>0)return t;let n=null,i=-1/0;for(let s of this.fisheyeAffectedMeshes){let o=this.getMeshTaxonomy(s);o.topics.size===0&&o.themes.size===0||s.renderOrder>i&&(i=s.renderOrder,n=s)}return n}getActiveFisheyeTaxonomyFocus(){if(!this.thematicFisheyeEffectsEnabled||!this.fisheyeEnabled||!this.topFisheyeMesh)return null;let t=this.getTaxonomyAnchorMesh(this.topFisheyeMesh);if(!t)return null;let n=this.getMeshTaxonomy(t).orderedTopics[0]??null,i=n&&n.split("/")[0]||null;return!n&&!i?null:{topMesh:this.topFisheyeMesh,topicId:n,themeId:i}}getTaxonomyHoverDimFactor(t,e){let n=this.getMeshTaxonomy(t),i=!!e.topicId&&n.topics.has(e.topicId),s=!!e.themeId&&n.themes.has(e.themeId);return e.topicId?i?1:s?.4:.1:e.themeId?s?1:.1:1}getFisheyeTaxonomyDimFactor(t,e){if(t===e.topMesh)return 1;let n=this.getMeshTaxonomy(t),i=!!e.topicId&&n.topics.has(e.topicId),s=!!e.themeId&&n.themes.has(e.themeId);return i?1:s?.4:.1}refreshTaxonomyOpacityEffects(){let t=this.taxonomyHoverFocus,e=this.getActiveFisheyeTaxonomyFocus();if(!(!!t||!!e)){for(let[i,s]of this.taxonomyEffectBaseOpacity.entries())this.setMeshOpacity(i,s);this.taxonomyEffectBaseOpacity.clear();return}if(this.taxonomyEffectBaseOpacity.size===0)for(let i of this.root.children){let s=i;s.isMesh&&this.taxonomyEffectBaseOpacity.set(s,this.getMeshOpacity(s))}for(let i of this.root.children){let s=i;if(!s.isMesh)continue;let o=this.taxonomyEffectBaseOpacity.get(s)??this.getMeshOpacity(s);this.taxonomyEffectBaseOpacity.set(s,o);let a=1;t&&(a=Math.min(a,this.getTaxonomyHoverDimFactor(s,t))),e&&(a=Math.min(a,this.getFisheyeTaxonomyDimFactor(s,e))),this.setMeshOpacity(s,o*a)}}applyFisheyeTaxonomyOpacityDimming(t){this.topFisheyeMesh=t,this.refreshTaxonomyOpacityEffects()}resetFisheyeTaxonomyOpacityDimming(){this.refreshTaxonomyOpacityEffects()}getTopFisheyeTaxonomyIds(){if(!this.thematicFisheyeEffectsEnabled||!this.fisheyeEnabled||!this.topFisheyeMesh)return null;let t=this.getTaxonomyAnchorMesh(this.topFisheyeMesh);if(!t)return null;let n=this.getMeshTaxonomy(t).orderedTopics[0]??null;return n?{themeId:n.split("/")[0]||null,topicId:n}:null}setTaxonomyHoverOpacityFocus(t){if(!t||!t.topicId&&!t.themeId){this.resetTaxonomyHoverOpacityFocus();return}let e=t.topicId??null,n=t.themeId??(e&&e.split("/")[0]||null);this.taxonomyHoverFocus={topicId:e,themeId:n},this.refreshTaxonomyOpacityEffects()}resetTaxonomyHoverOpacityFocus(){this.taxonomyHoverFocus=null,this.refreshTaxonomyOpacityEffects()}isMeshInteractive(t){return this.getMeshOpacity(t)>=this.INTERACTIVE_OPACITY_THRESHOLD}getFirstInteractiveIntersection(t){return t.find(n=>this.isMeshInteractive(n.object))??null}resetAllFisheyeEffects(){this.fisheyeAffectedMeshes.forEach(t=>{let e=this.meshToPhotoData.get(t);if(e&&e.currentPosition)t.position.set(e.currentPosition.x,e.currentPosition.y,e.currentPosition.z);else if(this.meshOriginalStates.has(t)){let n=this.meshOriginalStates.get(t);t.position.copy(n.position)}t.scale.set(1,1,1),this.restoreBaseRenderOrder(t,e),t.userData.originalRotation!==void 0&&(t.rotation.z=t.userData.originalRotation,t.userData.originalRotation=void 0)}),this.fisheyeAffectedMeshes.clear(),this.topFisheyeMesh=null,this.resetFisheyeTaxonomyOpacityDimming(),this.clearOverlayRenderer()}resetInteractionVisualState(){this.setSvgHoverOverlayHotspot(null),this.resetTaxonomyHoverOpacityFocus(),(this.fisheyeAffectedMeshes.size>0||this.topFisheyeMesh)&&this.resetAllFisheyeEffects()}restoreBaseRenderOrder(t,e){if(e){let n=e.metadata.renderOrder;t.renderOrder=n!==void 0?n:0;return}if(this.meshOriginalStates.has(t)){t.renderOrder=this.meshOriginalStates.get(t).renderOrder;return}t.renderOrder=0}renderScene(){let t=this.topFisheyeMesh;if(!!!(this.fisheyeEnabled&&t&&t.visible&&this.fisheyeAffectedMeshes.has(t))){this.renderer.render(this.scene,this.camera),this.clearOverlayRenderer();return}if(this.ensureOverlayRenderer(),!this.overlayRenderer||!t){this.renderer.render(this.scene,this.camera);return}let n=t.visible;t.visible=!1,this.renderer.render(this.scene,this.camera),t.visible=n;let i=this.root.children,s=i.map(o=>o.visible);for(let o=0;o<i.length;o++)i[o].visible=i[o]===t;this.overlayRenderer.clear(),this.overlayRenderer.render(this.scene,this.camera);for(let o=0;o<i.length;o++)i[o].visible=s[o]}ensureOverlayRenderer(){if(this.overlayRenderer||!this.container)return;this.overlayRenderer=new nr({antialias:!1,alpha:!0}),this.overlayRenderer.outputColorSpace=Ee,this.overlayRenderer.setPixelRatio(this.renderer.getPixelRatio()),this.overlayRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.overlayRenderer.setClearColor(0,0);let t=this.overlayRenderer.domElement;t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.pointerEvents="none",t.style.touchAction="none",t.style.zIndex="60",(this.container.parentElement??this.container).appendChild(t)}clearOverlayRenderer(){this.overlayRenderer&&this.overlayRenderer.clear()}disposeOverlayRenderer(){if(!this.overlayRenderer)return;let t=this.overlayRenderer.domElement;t.parentElement?.removeChild(t),this.overlayRenderer.dispose(),this.overlayRenderer=null}setSvgBackground(t,e){this.svgBackgroundPlane&&(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof en&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0),this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&this.svgContainer.remove(),this.svgBackgroundOptions={enabled:!0,svgElement:t,scale:e?.scale??1,offsetX:e?.offsetX??0,offsetY:e?.offsetY??0,radius:e?.radius,desiredOpacity:e?.desiredOpacity??1},this.createSvgDomContainer(t),this.setupSvgBackground(this.svgBackgroundOptions)}cleanupDragState(){this.isDragging&&this.draggedMesh&&(this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.setSvgHoverOverlayHotspot(null),this.setCanvasCursor("default"))}setCanvasCursor(t){this.container&&(this.container.style.cursor=t),this.renderer?.domElement&&(this.renderer.domElement.style.cursor=t)}enableDragForMesh(t,e){this.dragCallbacks.set(t,e),this.hoverOnlyMeshes.delete(t)}restoreDragForMesh(t){return this.dragCallbacks.has(t)?(this.hoverOnlyMeshes.delete(t),!0):!1}enableHoverForMesh(t){this.hoverOnlyMeshes.add(t)}disableDragForMesh(t){this.hoverOnlyMeshes.add(t)}setMeshPhotoId(t,e){this.meshToPhotoId.set(t,e),this.photoIdToMesh.set(e,t)}setPermalinkTarget(t){this.permalinkTargetId=t}setLayoutStrategy(t){this.currentLayoutStrategy=t}setDragCompleteCallback(t){this.onDragCompleteCallback=t}setPhotoClickCallback(t){this.onPhotoClickCallback=t}setBackgroundClickCallback(t){this.onBackgroundClickCallback=t}setLayoutStrategyReference(t){this.layoutStrategyRef=t}setMeshPhotoData(t,e){this.meshToPhotoData.set(t,e)}findPhotoIdForMesh(t){return this.meshToPhotoId.get(t)||null}isInteractiveLayout(){return this.svgBackgroundOptions?.enabled||!1}createSvgDomContainer(t){if(!this.container)return;this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.top="0",this.svgContainer.style.left="0",this.svgContainer.style.width="100%",this.svgContainer.style.height="100%",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.zIndex="1",this.svgContainer.style.opacity="0";let e=t.cloneNode(!0);e.style.width="100%",e.style.height="100%",e.style.position="absolute",this.svgContainer.appendChild(e),this.container.appendChild(this.svgContainer),this.createSvgHoverOverlay()}getSvgDimensions(t){let e=parseInt(t.getAttribute("width")||"",10),n=parseInt(t.getAttribute("height")||"",10);return{width:Number.isFinite(e)&&e>0?e:this.container?.clientWidth??0,height:Number.isFinite(n)&&n>0?n:this.container?.clientHeight??0}}createSvgHoverOverlay(){return et(this,null,function*(){if(!(!this.container||!this.scene)){this.disposeSvgHoverOverlay();try{let t=yield fetch("/showcase-bg-hover.svg");if(!t.ok)return;let e=yield t.text(),s=new DOMParser().parseFromString(e,"image/svg+xml").documentElement;s.querySelectorAll('[id^="s-"]').forEach(f=>{let w=f;w.style.visibility="hidden",this.svgHoverOverlayGroups.set(w.id,w)}),this.svgHoverOverlayElement=s;let{width:a,height:c}=this.getSvgDimensions(s),l=r.SVG_HOVER_OVERLAY_RESOLUTION,h=document.createElement("canvas");h.width=l,h.height=l;let u=h.getContext("2d");if(!u)return;this.svgHoverOverlayCanvas=h,this.svgHoverOverlayContext=u,this.svgHoverOverlayTexture=new li(h),this.svgHoverOverlayTexture.colorSpace=Ee,this.svgHoverOverlayTexture.needsUpdate=!0;let d=this.svgBackgroundOptions?.radius||2e4,p=new An(d*2,d*2),g=new un({map:this.svgHoverOverlayTexture,transparent:!0,opacity:0,depthWrite:!1});this.svgHoverOverlayPlane=new Fe(p,g),this.svgHoverOverlayPlane.position.set(0,0,-.95),this.svgHoverOverlayPlane.renderOrder=-999,this.svgBackgroundOptions?.offsetX&&(this.svgHoverOverlayPlane.position.x+=this.svgBackgroundOptions.offsetX),this.svgBackgroundOptions?.offsetY&&(this.svgHoverOverlayPlane.position.y+=this.svgBackgroundOptions.offsetY),this.svgBackgroundOptions?.scale&&this.svgHoverOverlayPlane.scale.setScalar(this.svgBackgroundOptions.scale),this.scene.add(this.svgHoverOverlayPlane);let y=l/a,m=l/c;u.setTransform(1,0,0,1,0,0),u.clearRect(0,0,h.width,h.height),u.setTransform(y,0,0,m,0,0),this.svgHoverOverlayCachedImages.set(null,u.getImageData(0,0,h.width,h.height)),this.svgHoverOverlayTexture.needsUpdate=!0}catch{}}})}disposeSvgHoverOverlay(){this.svgHoverOverlayPlane&&(this.scene.remove(this.svgHoverOverlayPlane),this.svgHoverOverlayPlane.geometry.dispose(),this.svgHoverOverlayPlane.material instanceof en&&this.svgHoverOverlayPlane.material.dispose(),this.svgHoverOverlayPlane=void 0),this.svgHoverOverlayTexture&&(this.svgHoverOverlayTexture.dispose(),this.svgHoverOverlayTexture=void 0),this.svgHoverOverlayCanvas=null,this.svgHoverOverlayContext=null,this.svgHoverOverlayElement=null,this.svgHoverOverlayGroups.clear(),this.activeHoverGroupId=null,this.hoverOverlayRenderToken++,this.svgHoverOverlayCachedImages.clear(),this.svgHoverOverlayPendingImage&&(this.svgHoverOverlayPendingImage.onload=null,this.svgHoverOverlayPendingImage.onerror=null,this.svgHoverOverlayPendingImage=null)}renderSvgHoverOverlayTexture(t){return et(this,null,function*(){if(!this.svgHoverOverlayElement||!this.svgHoverOverlayCanvas||!this.svgHoverOverlayContext||!this.svgHoverOverlayTexture)return;let e=this.svgHoverOverlayCachedImages.get(t);if(e){this.svgHoverOverlayContext.putImageData(e,0,0),this.svgHoverOverlayTexture.needsUpdate=!0;return}if(!this.container)return;this.svgHoverOverlayPendingImage&&(this.svgHoverOverlayPendingImage.onload=null,this.svgHoverOverlayPendingImage.onerror=null,this.svgHoverOverlayPendingImage=null);let n=++this.hoverOverlayRenderToken,i=new XMLSerializer().serializeToString(this.svgHoverOverlayElement),s=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),o=URL.createObjectURL(s),a=new Image;this.svgHoverOverlayPendingImage=a;try{if(yield new Promise((d,p)=>{a.onload=()=>d(),a.onerror=g=>p(g),a.src=o}),n!==this.hoverOverlayRenderToken||!this.container||!this.svgHoverOverlayCanvas||!this.svgHoverOverlayContext||!this.svgHoverOverlayTexture)return;let{width:c,height:l}=this.getSvgDimensions(this.svgHoverOverlayElement),h=this.svgHoverOverlayCanvas.width/c,u=this.svgHoverOverlayCanvas.height/l;this.svgHoverOverlayContext.setTransform(1,0,0,1,0,0),this.svgHoverOverlayContext.clearRect(0,0,this.svgHoverOverlayCanvas.width,this.svgHoverOverlayCanvas.height),this.svgHoverOverlayContext.setTransform(h,0,0,u,0,0),this.svgHoverOverlayContext.drawImage(a,0,0,c,l),this.svgHoverOverlayContext.setTransform(1,0,0,1,0,0),this.svgHoverOverlayCachedImages.set(t,this.svgHoverOverlayContext.getImageData(0,0,this.svgHoverOverlayCanvas.width,this.svgHoverOverlayCanvas.height)),this.svgHoverOverlayTexture.needsUpdate=!0}catch{}finally{URL.revokeObjectURL(o),this.svgHoverOverlayPendingImage===a&&(this.svgHoverOverlayPendingImage=null)}})}setSvgHoverOverlayHotspot(t){if(!this.svgHoverOverlayElement||!this.svgHoverOverlayPlane)return;let e=this.svgHoverOverlayPlane.material;if(t===this.activeHoverGroupId)return;if(!t){if(this.activeHoverGroupId){let i=this.svgHoverOverlayGroups.get(this.activeHoverGroupId);i&&(i.style.visibility="hidden")}this.activeHoverGroupId=null,e.opacity=0,e.needsUpdate=!0,this.renderSvgHoverOverlayTexture(null);return}let n=this.svgHoverOverlayGroups.get(t);if(!n){this.setSvgHoverOverlayHotspot(null);return}if(this.activeHoverGroupId&&this.activeHoverGroupId!==t){let i=this.svgHoverOverlayGroups.get(this.activeHoverGroupId);i&&(i.style.visibility="hidden")}n.style.visibility="visible",this.activeHoverGroupId=t,e.opacity=1,e.needsUpdate=!0,this.renderSvgHoverOverlayTexture(t)}animateMaterialOpacity(t,e,n=600){let i=t.opacity??1,s=performance.now(),o=a=>{let c=Math.min(1,(a-s)/n),l=c*(2-c);t.opacity=i+(e-i)*l,t.needsUpdate=!0,c<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}calculatePreviewRotation(t,e){let n=e.plausibility,i=e.favorable_future;if(n===void 0||!i)return this.draggedMesh?.userData.previewOriginalRotation||0;let o=(1-n/100)*32,a=i.toLowerCase().trim(),l=a==="favor"||a==="favorable"||a==="prefer"||a==="preferred"?o:-o;return ie.degToRad(l)}parseHotspotGroupId(t){if(!t||!t.startsWith("s-"))return null;try{let n=t.substring(2).split(","),i={};for(let s of n){let[o,a]=s.split("=");if(o&&a){let c=a.trim(),l=parseInt(c,10),h=!isNaN(l)&&l.toString()===c?l:c;i[o.trim()]=h}}return Object.keys(i).length>0?i:null}catch(e){return console.warn("Failed to parse hotspot group ID:",t,e),null}}findHotspotMatchAtMeshPosition(t,e){let n=new N;return t.getWorldPosition(n),this.findHotspotMatchAtWorldPosition(n.x,n.y)}findHotspotMatchAtWorldPosition(t,e){if(!this.svgContainer)return null;let n=this.svgContainer.querySelector("svg");if(!n)return null;let i=this.svgBackgroundOptions?.offsetX||0,s=this.svgBackgroundOptions?.offsetY||0,o=this.svgBackgroundOptions?.radius||15e3,a=(t-i+o)/(2*o),c=(o-(e-s))/(2*o),l=n.viewBox.baseVal;if(!l||l.width===0||l.height===0)return null;let h=l.x+a*l.width,u=l.y+c*l.height;return!isFinite(h)||!isFinite(u)?null:this.findHotspotMatchAtSvgCoordinates(n,h,u)}findHotspotMatchAtSvgCoordinates(t,e,n){let i=t.querySelectorAll('[id^="hit"]');for(let s of i){let o=s,a=t.createSVGPoint();a.x=e,a.y=n;let c=!1;if("isPointInFill"in s&&typeof s.isPointInFill=="function")try{c=s.isPointInFill(a)}catch{let h=o.getBBox();c=e>=h.x&&e<=h.x+h.width&&n>=h.y&&n<=h.y+h.height}else{let l=o.getBBox();c=e>=l.x&&e<=l.x+l.width&&n>=l.y&&n<=l.y+l.height}if(c){let l=s.parentElement?.closest('g[id^="s-"]')||s.parentElement?.closest("g");if(l&&l.id){let h=this.parseHotspotGroupId(l.id);return h?{groupId:l.id,hotspotData:h}:{groupId:l.id,hotspotData:{hotspot:l.id}}}}}return null}findHotspotAtMeshPosition(t,e){let n=this.findHotspotMatchAtMeshPosition(t,e);return n?n.hotspotData:null}isPositionOutOfCanvas(t){if(!this.svgBackgroundOptions?.radius)return!1;let e=this.svgBackgroundOptions.offsetX??0,n=this.svgBackgroundOptions.offsetY??0,i=this.svgBackgroundOptions.radius,s=t.x-e,o=t.y-n;return Math.sqrt(s*s+o*o)>i}disableAllDragging(){this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null}setupDragAndDrop(){if(!this.container){console.warn("Container not available for drag setup");return}let t=this.renderer.domElement;t.addEventListener("mousedown",e=>{this.updateMousePosition(e),this.onMouseDown(e)}),t.addEventListener("mousemove",e=>{this.updateMousePosition(e),this.fisheyePointerActive=!0,this.onMouseMove(e)}),t.addEventListener("mouseup",e=>{this.updateMousePosition(e),this.onMouseUp()}),t.addEventListener("mouseleave",()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.resetInteractionVisualState()}),t.addEventListener("touchcancel",()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.isTwoFingerGesture=!1,this.lastTouchDistance=0,this.resetInteractionVisualState()}),t.addEventListener("wheel",e=>{this.onMouseWheel(e)},{passive:!1}),t.addEventListener("dblclick",e=>{this.onDoubleClick(e)}),t.addEventListener("touchstart",e=>{if(e.preventDefault(),this.fisheyePointerActive=!0,e.touches.length===1){this.isTwoFingerGesture=!1,this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousedown",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseDown(n)}else if(e.touches.length===2){this.isTwoFingerGesture=!0,this.isDragging&&this.cleanupDragState();let n=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(n*n+i*i),this.touchStartDistance=this.lastTouchDistance,this.touchPanStart.x=(e.touches[0].clientX+e.touches[1].clientX)/2,this.touchPanStart.y=(e.touches[0].clientY+e.touches[1].clientY)/2,this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom()}},{passive:!1}),t.addEventListener("touchmove",e=>{if(e.preventDefault(),this.fisheyePointerActive=!0,e.touches.length===1&&!this.isTwoFingerGesture){this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousemove",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseMove(n)}else if(e.touches.length===2){this.isTwoFingerGesture=!0;let n=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY,s=Math.sqrt(n*n+i*i);if(this.lastTouchDistance>0){let h=this.lastTouchDistance/s,u=(e.touches[0].clientX+e.touches[1].clientX)/2,d=(e.touches[0].clientY+e.touches[1].clientY)/2;this.zoomAtPoint(h,u,d)}let o=(e.touches[0].clientX+e.touches[1].clientX)/2,a=(e.touches[0].clientY+e.touches[1].clientY)/2,c=o-this.touchPanStart.x,l=a-this.touchPanStart.y;this.panCamera(c,l),this.lastTouchDistance=s,this.touchPanStart.x=o,this.touchPanStart.y=a}},{passive:!1}),t.addEventListener("touchend",e=>{this.fisheyePointerActive=e.touches.length>0,e.touches.length===0?(this.isTwoFingerGesture&&this.reEnableFisheyeAfterZoom(),this.isTwoFingerGesture=!1,this.lastTouchDistance=0,this.resetAllFisheyeEffects(),this.onMouseUp()):e.touches.length===1&&(this.isTwoFingerGesture=!1,this.lastTouchDistance=0)}),fn(window,"keydown").pipe(Bi(this.destroy$)).subscribe(e=>this.onKeyDown(e)),fn(window,"mouseup").pipe(Bi(this.destroy$)).subscribe(()=>{this.isDragging&&this.cleanupDragState()}),fn(window,"touchend").pipe(Bi(this.destroy$)).subscribe(()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.resetAllFisheyeEffects()}),fn(window,"blur").pipe(Bi(this.destroy$)).subscribe(()=>{this.fisheyePointerActive=!1,this.isDragging&&this.cleanupDragState(),this.resetInteractionVisualState()})}updateMousePosition(t){if(!this.container)return;this.hasUserInteracted=!0,this.fisheyePointerActive=!0;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY}updateMousePositionFromTouch(t){if(!this.container)return;this.hasUserInteracted=!0,this.fisheyePointerActive=!0;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY}onMouseDown(t){this.mouseDownPosition.set(t.clientX,t.clientY),this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1),n=this.getFirstInteractiveIntersection(e);if(n){let i=n.object;if(this.dragCallbacks.has(i)&&!this.hoverOnlyMeshes.has(i)){this.isDragging=!0,this.draggedMesh=i,this.wasFisheyeEnabled=this.fisheyeEnabled,this.fisheyeEnabled&&(this.fisheyeEnabled=!1,this.resetAllFisheyeEffects());let o=new N;this.camera.getWorldDirection(o),this.dragPlane.setFromNormalAndCoplanarPoint(o,i.position);let a=new N;if(this.raycaster.ray.intersectPlane(this.dragPlane,a),this.dragOffset.copy(a).sub(i.position),this.setCanvasCursor("grabbing"),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragStart){let c=this.meshToPhotoData.get(i);if(c){let l={x:i.position.x,y:i.position.y,z:i.position.z};this.currentLayoutStrategy.onPhotoDragStart(c,l)}}return}}this.userControlEnabled&&(this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.isPanning=!0,this.panStartMouse.set(t.clientX,t.clientY),this.panStartCameraPos.set(this.targetCamX,this.targetCamY,this.targetCamZ),this.setCanvasCursor("grabbing"))}onMouseMove(t){if(!this.fisheyeAnimationLock&&this.fisheyeResumeOnPointer&&(this.fisheyeResumeOnPointer=!1,this.fisheyeEnabledSignal&&(this.fisheyeEnabled=!0)),this.isDragging&&this.draggedMesh){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new N;if(this.raycaster.ray.intersectPlane(this.dragPlane,e)){let n=e.sub(this.dragOffset);this.draggedMesh.position.copy(n);let i=this.findPhotoIdForMesh(this.draggedMesh);if(i){let o=this.findHotspotMatchAtMeshPosition(this.draggedMesh,i);if(o&&this.draggedMesh){let a=this.meshToPhotoData.get(this.draggedMesh);a&&(this.draggedMesh.userData.previewOriginalRotation===void 0&&(this.draggedMesh.userData.previewOriginalRotation=this.draggedMesh.rotation.z),this.draggedMesh.rotation.z=this.calculatePreviewRotation(a,o.hotspotData)),this.setSvgHoverOverlayHotspot(o.groupId)}else this.draggedMesh?.userData.previewOriginalRotation!==void 0&&(this.draggedMesh.rotation.z=this.draggedMesh.userData.previewOriginalRotation,this.setSvgHoverOverlayHotspot(null))}let s=this.dragCallbacks.get(this.draggedMesh);if(s&&s({x:n.x,y:n.y,z:n.z}),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragMove){let o=this.meshToPhotoData.get(this.draggedMesh);if(o){let a={x:n.x,y:n.y,z:n.z};this.currentLayoutStrategy.onPhotoDragMove(o,a)}}}}else if(this.isPanning){let e=t.clientX-this.panStartMouse.x,n=t.clientY-this.panStartMouse.y;this.panCamera(e,n),this.panStartMouse.set(t.clientX,t.clientY)}else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1),n=this.getFirstInteractiveIntersection(e),i=!1;if(n){let s=n.object,o=this.dragCallbacks.has(s)&&!this.hoverOnlyMeshes.has(s),a=this.hoverOnlyMeshes.has(s);(o||a)&&(this.setCanvasCursor(o?"grab":"pointer"),i=!0,this.hoveredMesh!==s&&(this.hoveredMesh=s,this.hoveredItemSignal.set(!0)))}else this.hoveredMesh&&(this.hoveredMesh=null,this.hoveredItemSignal.set(!1));if(this.isInteractiveLayout()){let s=this.screenToWorld(this.mouse.x,this.mouse.y,0),o=this.findHotspotMatchAtWorldPosition(s.x,s.y);this.setSvgHoverOverlayHotspot(o?.groupId??null),!i&&o?this.setCanvasCursor("pointer"):i||this.setCanvasCursor("default")}else this.setSvgHoverOverlayHotspot(null);this.applyFisheyeEffect()}}onMouseUp(){let e=(this.lastClientX!==null&&this.lastClientY!==null?Math.sqrt((this.lastClientX-this.mouseDownPosition.x)*(this.lastClientX-this.mouseDownPosition.x)+(this.lastClientY-this.mouseDownPosition.y)*(this.lastClientY-this.mouseDownPosition.y)):this.FALLBACK_MOUSE_MOVEMENT)<this.clickThreshold;if(this.isDragging&&this.draggedMesh){let n=this.draggedMesh;if(n.userData.previewOriginalRotation!==void 0&&delete n.userData.previewOriginalRotation,this.isDragging=!1,e){let i=this.findPhotoIdForMesh(n);if(i&&this.onPhotoClickCallback){this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0),this.onPhotoClickCallback(i);return}}if(this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragEnd){let i=this.meshToPhotoData.get(n);if(i){let s={x:n.position.x,y:n.position.y,z:n.position.z};this.currentLayoutStrategy.onPhotoDragEnd(i,s)}}if(this.isInteractiveLayout()&&this.onDragCompleteCallback){let i=this.findPhotoIdForMesh(n);if(i){let s={x:n.position.x,y:n.position.y,z:n.position.z},o=this.isPositionOutOfCanvas(n.position);o&&(n.rotation.z=0);let a=o?null:this.findHotspotAtMeshPosition(n,i);this.onDragCompleteCallback(i,{position:s,isOutOfBounds:o,hotspotData:a}).catch(c=>{console.error("[DRAG] Error in drag complete callback:",c)})}}this.draggedMesh=null,this.hoveredMesh=null,this.hoveredItemSignal.set(!1),this.setSvgHoverOverlayHotspot(null),this.setCanvasCursor("default"),this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0)}else if(this.isPanning&&(this.isPanning=!1,this.setCanvasCursor("default")),e){this.raycaster.setFromCamera(this.mouse,this.camera);let n=this.raycaster.intersectObjects(this.root.children,!1),i=this.getFirstInteractiveIntersection(n);if(i){let s=i.object,o=this.findPhotoIdForMesh(s);o&&this.onPhotoClickCallback?this.onPhotoClickCallback(o):!o&&this.onBackgroundClickCallback&&this.onBackgroundClickCallback()}else this.onBackgroundClickCallback&&this.onBackgroundClickCallback()}}onMouseWheel(t){if(!this.userControlEnabled)return;t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=t.deltaMode===0,n=t.deltaY,i=e?n*.01:n,s=1.125,o=i>0?s:1/s;this.zoomAtPoint(o,t.clientX,t.clientY),this.reEnableFisheyeAfterZoom()}onDoubleClick(t){return et(this,null,function*(){if(!this.userControlEnabled)return;t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=t.shiftKey?2.2:.45;yield this.animatedZoomAtPoint(e,t.clientX,t.clientY,.4),this.reEnableFisheyeAfterZoom()})}onKeyDown(t){if(!this.userControlEnabled)return;let e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||e.isContentEditable))return;let n=50;switch(t.key){case"ArrowUp":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(0,n);break;case"ArrowDown":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(0,-n);break;case"ArrowLeft":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(n,0);break;case"ArrowRight":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(-n,0);break;case"+":case"=":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let i=this.container.clientWidth/2,s=this.container.clientHeight/2;this.zoomAtPoint(.9,i,s);break;case"-":case"_":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let o=this.container.clientWidth/2,a=this.container.clientHeight/2;this.zoomAtPoint(1.1,o,a);break;case"r":case"R":t.preventDefault(),this.resetCameraView(!0);break}}removeSvgBackground(){if(this.svgBackgroundPlane){let t=this.svgBackgroundPlane.material,e=t.opacity??1,n=performance.now(),i=400,s=o=>{let a=Math.min(1,(o-n)/i),c=1-a*(2-a);t.opacity=e*c,t.needsUpdate=!0,a<1?requestAnimationFrame(s):(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof en&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0)};requestAnimationFrame(s)}this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&(this.svgContainer.remove(),this.svgContainer=null),this.disposeSvgHoverOverlay(),this.svgBackgroundOptions=void 0}setPhotoOpacity(t,e){let n=this.photoIdToMesh.get(t);n&&n.material&&"opacity"in n.material&&(n.material.opacity=e,n.material.transparent=!0,n.material.needsUpdate=!0)}setPhotoZIndex(t,e){let n=this.photoIdToMesh.get(t);n&&(n.renderOrder=e)}dispose(){this.isInitialized&&(this.destroy$.next(),this.destroy$.complete(),this.destroy$=new Nn,this.textureCache.forEach(t=>t.dispose()),this.textureCache.clear(),this.loadingTextures.clear(),this.highResTextureCache.forEach(t=>t.dispose()),this.highResTextureCache.clear(),this.loadingHighResTextures.clear(),this.removeSvgBackground(),this.renderer&&this.container?.contains(this.renderer.domElement)&&this.container.removeChild(this.renderer.domElement),this.disposeOverlayRenderer(),this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.hoveredItemSignal.set(!1),this.renderer?.dispose(),this.scene?.clear(),this.meshToUrl.clear(),this.meshToEnhancedUrl.clear(),this.highResActive.clear(),this.rafRunning=!1,this.isInitialized=!1,this.container=null)}initializeThreeJS(){return et(this,null,function*(){let t=this.platformService.isMobile?Math.min(1.5,window.devicePixelRatio||1):Math.min(2,window.devicePixelRatio||1);this.renderer=new nr({antialias:!0,alpha:!0}),this.renderer.outputColorSpace=Ee,this.renderer.setPixelRatio(t),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight);let e=this.renderer.getContext();this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.renderer.domElement.addEventListener("webglcontextlost",s=>{console.error("[THREE_RENDERER] WebGL context lost:",s),s.preventDefault()},!1),this.renderer.domElement.style.touchAction="none",this.renderer.domElement.style.position="relative",this.renderer.domElement.style.zIndex="10",this.container.appendChild(this.renderer.domElement),this.setupDragAndDrop(),this.scene=new zs,this.scene.background=null,this.svgBackgroundOptions?.enabled&&this.setupSvgBackground(this.svgBackgroundOptions);let i=this.container.clientWidth/this.container.clientHeight;this.camera=new He(this.FOV_DEG,i,.1,1e5),this.targetCamZ=this.computeFitZWithMargin({minX:-this.PHOTO_W,maxX:this.PHOTO_W,minY:-this.PHOTO_H,maxY:this.PHOTO_H},ie.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN),this.zSpawn=this.targetCamZ/2,this.camera.position.set(0,0,this.targetCamZ),this.camera.lookAt(0,0,0),this.root=new Gn,this.scene.add(this.root),this.scene.add(new Xs(16777215,1)),this.texLoader=new Ws,this.texLoader.setCrossOrigin("anonymous"),fn(window,"resize").pipe(Bi(this.destroy$)).subscribe(()=>this.onResize()),this.clock=new Ys,this.startRenderLoop()})}startRenderLoop(){if(this.rafRunning)return;this.rafRunning=!0;let t=()=>{if(!this.rafRunning)return;let e=this.clock.getDelta();this.fisheyeLastDeltaTime=e,this.activeTweens=this.activeTweens.filter(g=>!g(e)),this.clampCameraToBounds();let n=this.camera.position.x,i=this.camera.position.y,s=this.camera.position.z;this.camera.position.x=this.damp(this.camera.position.x,this.targetCamX,this.CAM_DAMP,e),this.camera.position.y=this.damp(this.camera.position.y,this.targetCamY,this.CAM_DAMP,e),this.camera.position.z=this.damp(this.camera.position.z,this.targetCamZ,this.CAM_DAMP,e),this.camera.lookAt(this.targetCamX,this.targetCamY,0);let a=Math.abs(this.camera.position.x-n)>this.IDLE_THRESHOLD||Math.abs(this.camera.position.y-i)>this.IDLE_THRESHOLD||Math.abs(this.camera.position.z-s)>this.IDLE_THRESHOLD||this.activeTweens.length>0||this.isDragging||this.isPanning;this.idleCheckInterval+=e,a||this.idleCheckInterval>=this.IDLE_CHECK_INTERVAL?(this.updateFrustum(),this.applyFrustumCulling(),this.idleCheckInterval=0,this.isSceneIdle=!1):this.isSceneIdle||(this.isSceneIdle=!0);let c=!1,l=!1;this.fisheyeEnabled&&this.fisheyePointerActive?(this.applyFisheyeEffect(),c=!0):(this.fisheyeAffectedMeshes.size>0||this.topFisheyeMesh)&&(this.resetAllFisheyeEffects(),l=!0),this.frameCount++;let h=performance.now();if(this.performanceMonitoring&&h-this.lastFpsUpdate>=1e3){this.currentFps=this.frameCount;let g=(this.skippedFrames/this.frameCount*100).toFixed(1);this.frameCount=0,this.renderCount=0,this.skippedFrames=0,this.lastFpsUpdate=h}let u=!this.isSceneIdle||c||l;u?(this.renderScene(),this.performanceMonitoring&&this.renderCount++):this.performanceMonitoring&&this.skippedFrames++,this.lodAccumTime+=e;let p=this.platformService.isMobile?.5:this.hoveredMesh?.05:.2;this.lodAccumTime>=p&&(this.lodAccumTime=0,this.runLodPass()),u&&this.frameCallbacks.size>0&&this.frameCallbacks.forEach(g=>g()),requestAnimationFrame(t)};requestAnimationFrame(t)}onResize=()=>{if(!this.container||!this.isInitialized)return;let t=this.container.clientWidth,e=this.container.clientHeight;this.renderer.setSize(t,e),this.overlayRenderer?.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.recomputeZoomLimits(),this.cameraMode==="auto-fit"&&(this.targetCamX=(this.bounds.minX+this.bounds.maxX)*.5,this.targetCamY=(this.bounds.minY+this.bounds.maxY)*.5,this.targetCamZ=this.computedMaxCamZ)};loadTexture(t){return et(this,null,function*(){if(this.textureCache.has(t))return this.textureCache.get(t);if(this.loadingTextures.has(t))return this.loadingTextures.get(t);let e=this.loadAndDownscaleImage(t).then(n=>{try{return this.configureTexture(n),this.textureCache.set(t,n),this.loadingTextures.delete(t),n}catch(i){throw console.error("[THREE_RENDERER] Error configuring texture:",t,i),this.loadingTextures.delete(t),n.dispose(),i}}).catch(n=>{throw console.error("[THREE_RENDERER] Failed to load texture:",t,n),this.loadingTextures.delete(t),n});return this.loadingTextures.set(t,e),e})}loadHighResTexture(t){return et(this,null,function*(){if(this.highResTextureCache.has(t))return this.highResTextureCache.get(t);if(this.loadingHighResTextures.has(t))return this.loadingHighResTextures.get(t);let e=this.loadFullResolutionImage(t).then(n=>{try{return this.configureTexture(n),this.highResTextureCache.set(t,n),this.loadingHighResTextures.delete(t),n}catch(i){throw console.error("[THREE_RENDERER] Error configuring high-res texture:",t,i),this.loadingHighResTextures.delete(t),n.dispose(),i}}).catch(n=>{throw console.error("[THREE_RENDERER] Failed to load high-res texture:",t,n),this.loadingHighResTextures.delete(t),n});return this.loadingHighResTextures.set(t,e),e})}loadFullResolutionImage(t){return et(this,null,function*(){return new Promise((e,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{let{width:s,height:o}=i;if(!s||!o||s<=0||o<=0){n(new Error(`Invalid image dimensions: ${s}x${o}`));return}if(s>this.maxTextureSize||o>this.maxTextureSize||this.platformService.isMobile){let c=Math.min(this.maxTextureSize,1024),l=this.platformService.isMobile?c:this.maxTextureSize;console.warn(`[THREE_RENDERER] Processing image for high-res: ${s}x${o}, target max: ${l}`);let h=s/o,u,d;if(s>o?(u=Math.min(l,s),d=u/h):(d=Math.min(l,o),u=d*h),u=Math.max(1,Math.floor(u)),d=Math.max(1,Math.floor(d)),u>this.maxTextureSize||d>this.maxTextureSize){n(new Error(`Calculated dimensions exceed max texture size: ${u}x${d}`));return}let p=document.createElement("canvas"),g=p.getContext("2d",{willReadFrequently:!1,alpha:!0});if(!g){n(new Error("Could not get 2D context from canvas"));return}p.width=u,p.height=d,g.clearRect(0,0,p.width,p.height);try{g.drawImage(i,0,0,p.width,p.height)}catch(m){n(new Error(`Failed to draw image to canvas: ${m}`));return}try{let m=g.getImageData(0,0,1,1);if(!m||!m.data||m.data.length===0){n(new Error("Canvas has no valid image data"));return}}catch(m){n(new Error(`Cannot read canvas data: ${m}`));return}let y=new li(p);this.configureTexture(y),e(y);return}let a=new sn(i);this.configureTexture(a),e(a)}catch(s){n(s)}},i.onerror=()=>{n(new Error(`Failed to load full-res image: ${t}`))},i.src=t})})}configureTexture(t){if(!t)return;let e=t.image,n=e?.width??e?.naturalWidth??0,i=e?.height??e?.naturalHeight??0,s=n>0&&i>0&&this.isPowerOfTwo(n)&&this.isPowerOfTwo(i),o=this.platformService.isMobile;t.colorSpace=Ee,t.wrapS=t.wrapT=Tn,t.magFilter=Xe,t.anisotropy=o?1:this.ANISO,t.generateMipmaps=o?!1:s,t.minFilter=o?Xe:s?In:Xe,t.needsUpdate=!0}isPowerOfTwo(t){return(t&t-1)===0&&t!==0}loadAndDownscaleImage(t){return et(this,null,function*(){let e=this.platformService.isMobile?Lt.MAX_TEXTURE_DIMENSION_MOBILE:Lt.MAX_TEXTURE_DIMENSION;return new Promise((n,i)=>{let s=new Image;s.crossOrigin="anonymous",s.onload=()=>{try{let{width:o,height:a}=s;if(!o||!a||o<=0||a<=0){i(new Error(`Invalid image dimensions: ${o}x${a}`));return}if(o<=e&&a<=e){if(o>this.maxTextureSize||a>this.maxTextureSize){i(new Error(`Image too large even for no-downscale path: ${o}x${a}`));return}let g=new sn(s);this.configureTexture(g),n(g);return}let c=o/a,l,h;if(o>a?(l=Math.min(e,o),h=l/c):(h=Math.min(e,a),l=h*c),l=Math.max(1,Math.floor(l)),h=Math.max(1,Math.floor(h)),l>this.maxTextureSize||h>this.maxTextureSize){i(new Error(`Calculated dimensions exceed max texture size: ${l}x${h}`));return}let u=document.createElement("canvas"),d=u.getContext("2d",{willReadFrequently:!1,alpha:!0});if(!d){i(new Error("Could not get 2D context from canvas"));return}u.width=l,u.height=h,d.clearRect(0,0,u.width,u.height);try{d.drawImage(s,0,0,u.width,u.height)}catch(g){i(new Error(`Failed to draw image to canvas: ${g}`));return}let p=new li(u);this.configureTexture(p),n(p)}catch(o){i(o)}},s.onerror=()=>{i(new Error(`Failed to load image: ${t}`))},s.src=t})})}setupSvgBackground(t){if(!t.svgElement){console.warn("\u274C No SVG element provided to setupSvgBackground");return}let e=new XMLSerializer().serializeToString(t.svgElement),n=document.createElement("canvas"),i=n.getContext("2d"),{width:s,height:o}=this.getSvgDimensions(t.svgElement),a=r.SVG_TARGET_RESOLUTION,c=a/s,l=a/o;n.width=a,n.height=a;let h=new Image;h.onload=()=>{i.clearRect(0,0,n.width,n.height),i.scale(c,l),i.drawImage(h,0,0,s,o),this.svgBackgroundTexture=new li(n),this.svgBackgroundTexture.colorSpace=Ee,this.svgBackgroundTexture.needsUpdate=!0;let p=t.radius||2e4,g=new An(p*2,p*2),y=t.desiredOpacity??1,m=new un({map:this.svgBackgroundTexture,transparent:!0,opacity:0,depthWrite:!1});this.svgBackgroundPlane=new Fe(g,m),this.svgBackgroundPlane.position.set(0,0,-1),this.svgBackgroundPlane.renderOrder=-1e3,t.offsetX&&(this.svgBackgroundPlane.position.x+=t.offsetX),t.offsetY&&(this.svgBackgroundPlane.position.y+=t.offsetY),t.scale&&this.svgBackgroundPlane.scale.setScalar(t.scale),this.scene.add(this.svgBackgroundPlane),this.animateMaterialOpacity(m,y,650)},h.onerror=p=>{console.error("\u274C Failed to load SVG image:",p)};let u=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(u);h.src=d}computeFitZWithMargin(t,e,n,i){let s=t.maxX-t.minX,o=t.maxY-t.minY,a=s+2*i,l=(o+2*i)*.5/Math.tan(e*.5),h=2*Math.atan(Math.tan(e*.5)*n),u=a*.5/Math.tan(h*.5);return Math.max(l,u)*1.1}clamp01(t){return Math.max(0,Math.min(1,t))}zoomAtCenter(t){if(!this.container)return Promise.resolve();this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=this.container.getBoundingClientRect(),n=e.left+e.width/2,i=e.top+e.height/2;return this.animatedZoomAtPoint(t,n,i,.3).then(()=>{this.reEnableFisheyeAfterZoom()})}focusOnPosition(t,e,n=800){this.cameraMode="user-controlled",this.targetCamX=t,this.targetCamY=e,this.targetCamZ=ie.clamp(n,this.computedMinCamZ,this.computedMaxCamZ)}focusOnPositionAnimated(t,e,n=800,i=1){return new Promise(s=>{this.cameraMode="user-controlled";let o=this.targetCamX,a=this.targetCamY,c=this.targetCamZ,l=ie.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);if(i<=.01){this.targetCamX=t,this.targetCamY=e,this.targetCamZ=l,s();return}let h=.7,u=!1,d=this.makeTween(i,p=>{let g=this.easeOutCubic(p);this.targetCamX=this.lerp(o,t,g),this.targetCamY=this.lerp(a,e,g),this.targetCamZ=this.lerp(c,l,g),!u&&p>=h&&(u=!0,this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal),p>=1&&(this.targetCamX=t,this.targetCamY=e,this.targetCamZ=l,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal,s())});this.addTween(d)})}animatedZoomAtPoint(t,e,n,i){if(!this.userControlEnabled)return Promise.resolve();this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let s=this.targetCamZ,o=this.targetCamX,a=this.targetCamY,c=ie.clamp(s*t,this.computedMinCamZ,this.computedMaxCamZ),l=this.container.getBoundingClientRect(),h=(e-l.left)/l.width*2-1,u=-((n-l.top)/l.height)*2+1,d=this.projectScreenToWorld(h,u,o,a,s),p=this.projectScreenToWorld(h,u,o,a,c),g=o+(d.x-p.x),y=a+(d.y-p.y);return this.runTween(this.makeTween(i,m=>{this.targetCamZ=ie.lerp(s,c,m),this.targetCamX=ie.lerp(o,g,m),this.targetCamY=ie.lerp(a,y,m)}))}updateFrustum(){this.camera.updateMatrixWorld(),this.frustumMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.frustumMatrix)}applyFrustumCulling(){this.visibleMeshCount=0,this.totalMeshCount=0;for(let t of this.root.children){let e=t;if(this.totalMeshCount++,e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),e.geometry.boundingSphere){e.updateMatrixWorld();let n=e.geometry.boundingSphere.clone();n.applyMatrix4(e.matrixWorld);let i=this.frustum.intersectsSphere(n);e.visible!==i&&(e.visible=i),i&&this.visibleMeshCount++}}this.cullingLogCounter++,this.performanceMonitoring&&this.cullingLogCounter>=100&&(this.cullingLogCounter=0)}runLodPass(){if(!this.container)return;let t=1,e=0;for(let n of this.root.children){let i=n;if(!i.visible)continue;let s=this.meshToUrl.get(i);if(!s)continue;let o=this.meshToEnhancedUrl.get(i)||s,a=this.highResActive.has(i),c=Math.max(.001,Math.abs(i.position.z-this.camera.position.z)),l=this.getVisibleWidthAtDepth(c)*2,h=this.container.clientWidth/Math.max(1,l),u=this.PHOTO_W*h,d=this.PHOTO_H*h,p=this.container.clientWidth||1,g=this.container.clientHeight||1,y=u>=p*.3||d>=g*.3,m=this.findPhotoIdForMesh(i);if(!(this.permalinkTargetId!==null&&m===this.permalinkTargetId||this.fisheyeAffectedMeshes.has(i)||y)){a&&this.downgradeToLowResTexture(i,s).then(()=>this.highResActive.delete(i)).catch(()=>{});continue}!a&&u>=t?this.upgradeToHighResTexture(i,o).then(()=>{this.highResActive.add(i)}).catch(()=>{}):a&&u<=e&&this.downgradeToLowResTexture(i,s).then(()=>{this.highResActive.delete(i)}).catch(()=>{})}}updateCameraFov(t){this.camera&&this.camera.isPerspectiveCamera&&(this.camera.fov=t,this.camera.updateProjectionMatrix())}getCurrentZoomLevel(){return this.computedMaxCamZ/this.targetCamZ}updateCameraZoom(t){this.camera&&(this.camera.zoom=t,this.camera.updateProjectionMatrix?.())}setRotationSpeed(t){this.rotationSpeedMultiplier=t}setPanSensitivity(t){this.panSensitivityMultiplier=t}setDepthOfField(t){if(!this.dofPass){this.dofStrength=t;return}if(this.dofStrength=t,t>0){let n=t/100*15;this.dofPass.uniforms.focalDepth.value=5e3,this.dofPass.uniforms.bokeh.value=!0,this.dofPass.uniforms.maxblur.value=n}}disableDepthOfField(){this.dofStrength=0,this.dofPass&&(this.dofPass.uniforms.bokeh.value=!1)}static \u0275fac=function(e){return new(e||r)};static \u0275prov=Hi({token:r,factory:r.\u0275fac,providedIn:"root"})};var Bg=(r,t)=>t.id;function Hg(r,t){if(r&1){let e=Ge();pt(0,"div",2),ne("mouseenter",function(){let i=Yt(e).$implicit,s=Gt();return qt(s.onLabelEnter(i))})("mouseleave",function(){Yt(e);let i=Gt();return qt(i.onLabelLeave())})("focus",function(){let i=Yt(e).$implicit,s=Gt();return qt(s.onLabelEnter(i))})("blur",function(){Yt(e);let i=Gt();return qt(i.onLabelLeave())}),pt(1,"span",3),Te(2),It()()}if(r&2){let e=t.$implicit;ar("aria-label",e.name),Vt(2),hr(e.name)}}var la=class r{static MIN_ITEMS_FOR_LABEL=2;static CULLING_INTERVAL_MS=120;themeLabels=De([]);subThemeLabels=De([]);zoomLevel=De(1);labelHover=xs();static ZOOM_THRESHOLD=1.35;static MIN_FONT=11;static MAX_FONT=18;rendererService=Le(fi);ngZone=Le(or);el=Le(ki);unregisterFrameCb=null;cachedLabelEls=[];cachedFontSizes=[];lastCullingAt=0;constructor(){an(()=>{let t=this.getVisibleLabels();this.cachedFontSizes=this.computeFontSizes(t),Promise.resolve().then(()=>this.refreshLabelCache())})}ngOnInit(){this.ngZone.runOutsideAngular(()=>{this.unregisterFrameCb=this.rendererService.addFrameCallback(()=>{this.updateLabelPositions()})})}ngOnDestroy(){this.unregisterFrameCb?.(),this.cachedLabelEls=[]}get activeLabels(){return this.getVisibleLabels()}getVisibleLabels(){return this.subThemeLabels().filter(t=>t.itemCount>=r.MIN_ITEMS_FOR_LABEL)}onLabelEnter(t){this.labelHover.emit({id:t.id,level:"sub-theme"})}onLabelLeave(){this.labelHover.emit(null)}refreshLabelCache(){let t=this.el.nativeElement;this.cachedLabelEls=Array.from(t.querySelectorAll(".cluster-label"));for(let e=0;e<this.cachedLabelEls.length;e++){let n=this.cachedFontSizes[e];n!=null&&this.cachedLabelEls[e].style.setProperty("--label-font-size",`${n}px`)}this.lastCullingAt=0,this.updateLabelPositions()}computeFontSizes(t){if(t.length===0)return[];let e=t.map(c=>c.itemCount),n=Math.max(...e),i=Math.min(...e),s=n-i,{MIN_FONT:o,MAX_FONT:a}=r;return t.map(c=>{let l=s>0?Math.sqrt((c.itemCount-i)/s):1;return Math.round(o+l*(a-o))})}updateLabelPositions(){let t=this.activeLabels,e=this.cachedLabelEls;if(e.length===0)return;let n=[];for(let l=0;l<e.length;l++){let h=t[l];if(!h)continue;let u=this.rendererService.worldToScreen(h.worldX,h.worldY);u?n.push({el:e[l],x:u.x,y:u.y,visible:!0,itemCount:h.itemCount}):e[l].style.display="none"}n.sort((l,h)=>h.itemCount-l.itemCount);for(let l of n)l.el.style.transform=`translate(-50%, -50%) translate(${l.x}px, ${l.y}px)`,l.el.style.display="";let i=performance.now();if(i-this.lastCullingAt<r.CULLING_INTERVAL_MS)return;this.lastCullingAt=i;let s=8,o=[],a=window.innerWidth,c=window.innerHeight;for(let l of n){let h=l.el.getBoundingClientRect();if(h.width===0&&h.height===0)continue;let u=h.left-s,d=h.top-s,p=h.right+s,g=h.bottom+s,y=p<0||u>a||g<0||d>c,m=o.some(f=>!(p<f.x1||u>f.x2||g<f.y1||d>f.y2));y||m?(l.el.style.opacity="0",l.el.style.pointerEvents="none"):(l.el.style.opacity="1",l.el.style.pointerEvents="auto",o.push({x1:u,y1:d,x2:p,y2:g}))}}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=Mn({type:r,selectors:[["app-taxonomy-clusters-overlay"]],inputs:{themeLabels:[1,"themeLabels"],subThemeLabels:[1,"subThemeLabels"],zoomLevel:[1,"zoomLevel"]},outputs:{labelHover:"labelHover"},decls:3,vars:0,consts:[[1,"cluster-labels-container"],["role","button","tabindex","0",1,"cluster-label","sub-theme"],["role","button","tabindex","0",1,"cluster-label","sub-theme",3,"mouseenter","mouseleave","focus","blur"],[1,"cluster-label-text"]],template:function(e,n){e&1&&(pt(0,"div",0),lr(1,Hg,3,2,"div",1,Bg),It()),e&2&&(Vt(),cr(n.activeLabels))},styles:[`

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
}`],changeDetection:0})};var kg=(r,t)=>t.id;function zg(r,t){if(r&1&&(pt(0,"div",2),Te(1),It()),r&2){let e=t.$implicit,n=Gt();Re("prevent",n.isPrevent(e)),Vt(),hr(e.name)}}var ca=class r{labels=De([]);static MIN_FONT=8;static MAX_FONT=120;static SCALE_PROBE_WORLD_UNITS=1e3;static EM_PER_CHARACTER=.75;rendererService=Le(fi);ngZone=Le(or);el=Le(ki);unregisterFrameCb=null;cachedLabelEls=[];constructor(){an(()=>{this.labels(),Promise.resolve().then(()=>this.refreshLabelCache())})}ngOnInit(){this.ngZone.runOutsideAngular(()=>{this.unregisterFrameCb=this.rendererService.addFrameCallback(()=>{this.updateLabelPositions()})})}ngOnDestroy(){this.unregisterFrameCb?.(),this.cachedLabelEls=[]}isPrevent(t){return t.rotationDeg<=0}refreshLabelCache(){let t=this.el.nativeElement;this.cachedLabelEls=Array.from(t.querySelectorAll(".tsne-cluster-label")),this.updateLabelPositions()}updateLabelPositions(){let t=this.labels(),e=this.cachedLabelEls;if(e.length===0)return;let n=this.getWorldToScreenScale();if(n===null)return;let i=window.innerWidth,s=window.innerHeight,{MIN_FONT:o,MAX_FONT:a,EM_PER_CHARACTER:c}=r;for(let l=0;l<e.length;l++){let h=t[l],u=e[l];if(!h)continue;let d=this.rendererService.worldToScreen(h.worldX,h.worldY);if(!d||d.x<0||d.x>i||d.y<0||d.y>s){u.style.opacity="0";continue}let p=Math.max(1,h.name.length),g=Math.min(a,Math.max(o,h.worldWidth/(p*c)*n));u.style.setProperty("--label-font-size",`${g}px`),u.style.transform=`translate(-50%, -50%) translate(${d.x}px, ${d.y}px) rotate(${-h.rotationDeg*2}deg)`,u.style.opacity="1"}}getWorldToScreenScale(){let t=r.SCALE_PROBE_WORLD_UNITS,e=this.rendererService.worldToScreen(0,0),n=this.rendererService.worldToScreen(t,0);return!e||!n?null:Math.abs(n.x-e.x)/t}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=Mn({type:r,selectors:[["app-tsne-clusters-overlay"]],inputs:{labels:[1,"labels"]},decls:3,vars:0,consts:[["aria-hidden","true",1,"tsne-cluster-labels-container"],[1,"tsne-cluster-label",3,"prevent"],[1,"tsne-cluster-label"]],template:function(e,n){e&1&&(pt(0,"div",0),lr(1,zg,2,3,"div",1,kg),It()),e&2&&(Vt(),cr(n.labels()))},styles:[`

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
}`],changeDetection:0})};var Vg=["container"],Gg=["titleElement"];function Wg(r,t){r&1&&(pt(0,"div",3),pe(1,"div",56),It())}function Xg(r,t){if(r&1){let e=Ge();pt(0,"app-qrcode",57),ne("click",function(){Yt(e);let i=Gt();return qt(i.toggleQrSize())}),It()}if(r&2){let e=Gt();Un("small",e.qrSmall())("url",e.qrUrl())}}function Yg(r,t){if(r&1){let e=Ge();pt(0,"div",58)(1,"app-filters-bar",59),ne("filtersChange",function(i){Yt(e);let s=Gt();return qt(s.onFiltersChange(i))})("filtersCommit",function(i){Yt(e);let s=Gt();return qt(s.onFiltersChange(i))}),It()()}if(r&2){let e=Gt();Re("open",e.filtersBarOpen()),Vt(),Un("counts",e.filterCounts())("totalCount",e.totalPhotoCount())("filteredCount",e.totalPhotoCount())("showViewToggle",!1)("showOrderBy",!1)("initialState",e.currentFilters())("topicTree",e.taxonomyService.topicTree())}}function qg(r,t){if(r&1&&Te(0),r&2){let e=Gt(2);Ts(" \u2756 ",e.workspaceTitle(),"")}}function Zg(r,t){if(r&1&&(pt(0,"div",60,1),Te(2),Ve(3,qg,1,1),It()),r&2){let e=Gt();Re("needs-animation",e.titleNeedsAnimation()),Vt(2),Ts(" ",e.workspaceTitle(),""),Vt(),Ie(e.titleNeedsAnimation()?3:-1)}}function $g(r,t){if(r&1){let e=Ge();pt(0,"button",63),ne("click",function(){Yt(e);let i=Gt(2);return qt(i.clearSearch())}),Te(1," \xD7 "),It()}}function Kg(r,t){if(r&1){let e=Ge();pt(0,"div",19)(1,"input",61),ne("input",function(i){Yt(e);let s=Gt();return qt(s.onSearchInput(i))})("keydown.escape",function(){Yt(e);let i=Gt();return qt(i.clearSearch())}),It(),Ve(2,$g,2,0,"button",62),It()}if(r&2){let e=Gt();Vt(),Un("value",e.searchText()),Vt(),Ie(e.searchText()?2:-1)}}function Jg(r,t){if(r&1){let e=Ge();pt(0,"button",72),ne("click",function(){Yt(e);let i=Gt(2);return qt(i.enableDragAllMode())}),Ze(),pt(1,"svg",10),pe(2,"path",73),It()()}}function jg(r,t){if(r&1){let e=Ge();pt(0,"button",64),ne("click",function(){Yt(e);let i=Gt();return qt(i.toggleRandomShowcase())}),Ze(),pt(1,"svg",10),pe(2,"circle",65)(3,"circle",66)(4,"circle",67)(5,"circle",68),It()(),Ve(6,Jg,3,0,"button",69),pn(),pt(7,"button",70),ne("click",function(){Yt(e);let i=Gt();return qt(i.toggleFiltersBar())}),Ze(),pt(8,"svg",10),pe(9,"path",71),It()()}if(r&2){let e=Gt();Re("active",e.enableRandomShowcase()),Vt(6),Ie(e.dragAllActive()?-1:6),Vt(),Re("active",e.filtersBarOpen())}}function Qg(r,t){if(r&1&&(pt(0,"span",76),Te(1,"\u25B2"),It()),r&2){let e=Gt(2);Re("open",e.dragAllControlsOpen())}}function ty(r,t){if(r&1){let e=Ge();pt(0,"span",74),ne("click",function(i){Yt(e);let s=Gt();return qt(s.isAdmin()?s.toggleDragAllControls(i):null)}),Te(1),Ve(2,Qg,2,2,"span",75),It()}if(r&2){let e=Gt();Re("admin",e.isAdmin())("breathing",e.dragAllActive()),ar("aria-label","Drag mode active, "+e.dragAllRemainingFormatted()+" remaining"),Vt(),Ts(" ",e.dragAllRemainingFormatted()," "),Vt(),Ie(e.isAdmin()?2:-1)}}function ey(r,t){if(r&1){let e=Ge();pt(0,"div",77),ne("click",function(i){return Yt(e),qt(i.stopPropagation())}),pt(1,"button",78),ne("click",function(){Yt(e);let i=Gt();return qt(i.adjustDragAllTime(-1))}),Te(2,"\u22121m"),It(),pt(3,"button",79),ne("click",function(){Yt(e);let i=Gt();return qt(i.adjustDragAllTime(1))}),Te(4,"+1m"),It(),pt(5,"button",80),ne("click",function(){Yt(e);let i=Gt();return qt(i.adjustDragAllTime(5))}),Te(6,"+5m"),It(),pt(7,"button",81),ne("click",function(){Yt(e);let i=Gt();return qt(i.disableDragAllMode())}),Ze(),pt(8,"svg",39),pe(9,"path",82),It(),Te(10," Stop "),It()()}}function ny(r,t){if(r&1){let e=Ge();pt(0,"app-taxonomy-clusters-overlay",83),ne("labelHover",function(i){Yt(e);let s=Gt();return qt(s.onTaxonomyLabelHover(i))}),It()}if(r&2){let e=Gt();Un("themeLabels",e.taxonomyThemeLabels())("subThemeLabels",e.taxonomySubThemeLabels())("zoomLevel",e.currentZoomLevel())}}function iy(r,t){if(r&1&&pe(0,"app-tsne-clusters-overlay",54),r&2){let e=Gt();Un("labels",e.tsneClusterLabels())}}function sy(r,t){if(r&1&&(pt(0,"div",55),Te(1),It()),r&2){let e=Gt();Vt(),Ts(" ",e.fisheyeTaxonomyFocusLabel()," ")}}var ry=["tsne","tsne-grid","svg","circle-packing"],oy=5,ay="layout_x,layout_y,plausibility,favorable_future,transition_bar_position",Kh=class r{constructor(t,e,n,i,s,o){this.route=t;this.changeDetectorRef=e;this.apiService=n;this.http=i;this.platform=s;this.rendererService=o;this.activatedRoute=t,this.photoRepository=new xr,an(()=>{let d=this.searchText();this.photoRepository.getAllPhotos().length>0&&setTimeout(()=>this.applySearchFilter(),50)}),an(()=>{let d=this.currentFilters();this.isAdmin()&&this.photoRepository&&this.photoRepository.getAllPhotos().length>0&&setTimeout(()=>this.applyFilters(),50)}),this.loop.pipe(Bl(),we(this.destroyRef)).subscribe(d=>et(this,null,function*(){let p=d.filter(g=>this.isRejectedItem(g)).map(g=>g?._id).filter(g=>typeof g=="string");for(let g of p)this.loadedPhotoIds.has(g)&&(this.photoRepository.removePhoto(g),this.loadedPhotoIds.delete(g));if(d=d.filter(g=>!this.isRejectedItem(g)),d=d.sort((g,y)=>{let m=typeof g?.created_at=="string"?g.created_at:"",f=typeof y?.created_at=="string"?y.created_at:"";return m.localeCompare(f)}),this.lastCreatedAt==="0"&&d.length>0){let g=d.map(S=>et(this,null,function*(){let x=S._id,A=S.screenshot_url||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=";S.screenshot_url||console.warn("[SHOWCASE_WS] Missing screenshot_url for item",x,"using placeholder image");let R=this.deriveThumbnailUrl(A),D=this.deriveEnhancedUrl(A),M=S.transition_bar_position||this.getDefaultTransitionBarPosition(S),b=Je(Wt({},S),{id:x,url:R,created_at:S.created_at,screenshot_url:A,thumbnail_url:R,enhanced_url:D,layout_x:S.layout_x,layout_y:S.layout_y,plausibility:S.plausibility,favorable_future:S.favorable_future,transition_bar_position:M,item_key:S._key??S.item_key??S._key});try{yield this.photoRepository.addPhoto(b),this.loadedPhotoIds.add(x)}catch(E){console.error("Error loading photo immediately:",E)}}));yield Promise.all(g),this.searchIndex.clear(),this.resolveUserAuthorId(d),this.qrSmall.set(!0),this.isLoading.set(!1);let y=this.currentLayout()==="tsne"||this.currentLayout()==="tsne-grid";if(this.currentLayout()!=="circle-packing"&&(!this.initialLayoutPreparedBeforeLoad||y))try{switch(this.currentLayout()){case"tsne":yield this.switchToTsneLayout();break;case"tsne-grid":yield this.switchToTsneGridLayout();break;case"svg":yield this.switchToSvgLayout();break}}catch(S){console.error("Error switching initial layout:",S)}setTimeout(()=>{this.isLayoutLoading.set(!1)},2e3),this.searchText()&&this.applySearchFilter();let f=this.focusItemId();f&&(this.rendererService.setCameraMode("user-controlled"),this.focusOnItem(f,{animateFromFull:!0,fromShowOnMap:!0}));let w=d[d.length-1];this.lastCreatedAt=w.created_at,this.lastFetchedAt=this.computeMaxTimestamp(d)}else{let g=d.filter(f=>{let w=f.created_at;return w&&w>this.lastCreatedAt});if(g.length>0){this.lastActivityAt=Date.now();let f=g.map(w=>et(this,null,function*(){let S=w._id,C=w.screenshot_url||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=";w.screenshot_url||console.warn("[SHOWCASE_WS] Missing screenshot_url for item",S,"using placeholder image");let A=this.deriveThumbnailUrl(C),R=this.deriveEnhancedUrl(C),D=w.transition_bar_position||this.getDefaultTransitionBarPosition(w),M=Je(Wt({},w),{id:S,url:A,created_at:w.created_at,screenshot_url:C,thumbnail_url:A,enhanced_url:R,plausibility:w.plausibility,favorable_future:w.favorable_future,transition_bar_position:D,item_key:w._key??w.item_key??w._key});try{yield this.photoRepository.addPhoto(M),this.loadedPhotoIds.add(S),this.lastCreatedAt=w.created_at}catch(b){console.error("Error adding photo to queue:",b)}}));yield Promise.all(f),this.searchIndex.clear()}d.length>0&&(this.lastFetchedAt=this.computeMaxTimestamp(d));let y=["layout_x","layout_y","plausibility","favorable_future","transition_bar_position"],m=!1;for(let f of d){let w=f._id;if(!this.loadedPhotoIds.has(w))continue;let S=this.photoRepository.getPhoto(w);if(!S)continue;let x={},C=!1;for(let A of y){let R=f[A]??(A==="transition_bar_position"?this.getDefaultTransitionBarPosition(f):void 0);S.metadata[A]!==R&&(x[A]=R,C=!0)}C&&(S.updateMetadata(x),m=!0,(x.layout_x!==void 0||x.layout_y!==void 0)&&this.currentLayout()==="svg"&&this.repositionPhoto(S))}m&&this.searchIndex.clear()}this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase()),Date.now()-this.lastActivityAt<ue.INACTIVITY_TIMEOUT?setTimeout(()=>{this.getItems(this.lastFetchedAt||void 0).pipe(we(this.destroyRef)).subscribe(g=>{this.loop.next(g)})},ue.API_POLLING_INTERVAL):this.isPollingActive.set(!1)}));let a=this.activatedRoute.snapshot.queryParams;this.workspace.set(a.workspace||"WORKSPACE_NOT_SET"),this.api_key.set(a.api_key||"API_KEY_NOT_SET"),this.admin_key.set(a.admin_key||"ADMIN_KEY_NOT_SET"),this.lang.set(a.lang?a.lang+"/":"");let c=a.key||"";this.userItemKey.set(c);let l=this.admin_key(),h=l!==""&&l!=="ADMIN_KEY_NOT_SET";if(this.photoRepository.setDragEnabled(h),an(()=>{this.photoRepository.updateDragPermissions(this.dragAllActive(),this.userAuthorId())}),this.platform.browser()){let d=this.parseHashState();d.itemId&&this.focusItemId.set(d.itemId),typeof d.search=="string"&&(this.searchText.set(d.search),this.searchActive.set(d.search.trim().length>0)),d.view&&this.currentLayout.set(d.view)}this.focusItemId()&&this.currentLayout()==="circle-packing"&&(this.currentLayout.set("svg"),this.enableSvgAutoPositioning.set(!0)),this.workspace()!=="WORKSPACE_NOT_SET"&&this.fetchWorkspaceData(),(a.fisheye==="1"||a.fisheye==="true")&&this.fisheyeEnabled.set(!0),n.updateFromRoute(this.activatedRoute.snapshot);let u=this.resolveAuthToken();u&&n.api_key.set(u)}container;titleElement;router=Le(Yl);destroyRef=Le(Hl);taxonomyService=Le($l);photoRepository;activatedRoute;loop=new Nn;lastCreatedAt="0";lastFetchedAt="";lastActivityAt=Date.now();isPollingActive=Nt(!0);qrSmall=Nt(!1);workspace=Nt("");workspaceTitle=Nt("");api_key=Nt("");admin_key=Nt("");lang=Nt("");allowAdditionalContributions=Nt(!0);currentLayout=Nt("circle-packing");enableRandomShowcase=Nt(!1);enableSvgAutoPositioning=Nt(!0);fisheyeEnabled=Nt(!1);currentZoomLevel=Nt(1);fisheyeTaxonomyFocusLabel=Nt(null);taxonomyThemeLabels=Nt([]);taxonomySubThemeLabels=Nt([]);currentTsneStrategy=null;tsneClusterLabels=Nt([]);sidebarOpen=Nt(!1);selectedItemId=Nt(null);focusItemId=Nt(null);userItemKey=Nt("");userAuthorId=Nt(null);dragAllUntil=Nt(null);dragAllActive=Ne(()=>{let t=this.dragAllUntil();return t?t.getTime()>Date.now():!1});dragAllRemainingSeconds=Nt(0);dragAllRemainingFormatted=Ne(()=>{let t=this.dragAllRemainingSeconds(),e=Math.floor(t/60),n=t%60;return`${e}:${n.toString().padStart(2,"0")}`});dragAllControlsOpen=Nt(!1);dragModeDefaultLayoutApplied=!1;isApplyingHashState=!1;initialLayoutPreparedBeforeLoad=!1;selectedItemKey=Ne(()=>{let t=this.selectedItemId();return t&&this.photoRepository.getPhoto(t)?.metadata?.item_key||null});isAdmin=Ne(()=>this.admin_key()!==""&&this.admin_key()!=="ADMIN_KEY_NOT_SET");canEditSelectedItem=Ne(()=>this.isAdmin()||this.selectedItemKey()!==null&&this.selectedItemKey()!=="");filterCounts=Ne(()=>{if(!this.photoRepository)return{status:new Map,author:new Map,preference:new Map,potential:new Map,type:new Map,topic:new Map};let t=this.photoRepository.getAllPhotos(),e=new Map,n=new Map,i=new Map,s=new Map,o=new Map,a=new Map;return t.forEach(c=>{let l=c.metadata,h=l._private_moderation,u="pending";h===0?u="banned":h===1?u="flagged":h===3?u="not-flagged":h===4?u="approved":h===5&&(u="highlighted"),e.set(u,(e.get(u)||0)+1);let d=l.author_id||"unknown";n.set(d,(n.get(d)||0)+1);let p=l.favorable_future;p&&i.set(p,(i.get(p)||0)+1);let g=l.plausibility;if(g!=null){let f=String(g);s.set(f,(s.get(f)||0)+1)}let y=l.screenshot_type;y&&o.set(y,(o.get(y)||0)+1);let m=l.topics||[];if(m.length===0)a.set("none",(a.get("none")||0)+1);else{let f=new Set;m.forEach(w=>{a.set(w,(a.get(w)||0)+1),f.add(w.split("/")[0])}),f.forEach(w=>a.set(w,(a.get(w)||0)+1))}}),{status:e,author:n,preference:i,potential:s,type:o,topic:a}});totalPhotoCount=Ne(()=>this.photoRepository?this.photoRepository.getAllPhotos().length:0);fisheyeSettings=Nt({enabled:!0,maxMagnification:10,radius:700,maxHeight:50});searchText=Nt("");searchActive=Nt(!1);searchIndex=new Map;filtersBarOpen=Nt(!1);currentFilters=Nt({status:["new","flagged","not-flagged","approved","highlighted","rejected"],author:"all",preference:["prefer","mostly prefer","uncertain","mostly prevent","prevent","none"],potential:["100","75","50","25","0","none"],type:"all",topic:[],search:"",orderBy:"date"});topicInitEffect=an(()=>{let t=this.taxonomyService.allSubThemeIds();t.length>0&&this.currentFilters().topic.length===0&&this.currentFilters.update(e=>Je(Wt({},e),{topic:t}))});resolveAuthToken(){let t=this.admin_key();if(t&&t!=="ADMIN_KEY_NOT_SET")return t;let e=this.api_key();return e&&e!=="API_KEY_NOT_SET"?e:null}getSearchableText(t){let e=this.searchIndex.get(t.metadata.id);if(e)return e;let n=[],i=o=>{if(o==null)return;let a=typeof o;a==="string"||a==="number"||a==="boolean"?n.push(String(o)):Array.isArray(o)?o.forEach(i):a==="object"&&Object.values(o).forEach(i)};i(t.metadata);let s=n.join(" ").toLowerCase();return this.searchIndex.set(t.metadata.id,s),s}isLoading=Nt(!0);isLayoutLoading=Nt(!0);viewInitialized=Nt(!1);titleNeedsAnimation=Nt(!1);isDragging=Ne(()=>this.rendererService.isDraggingItem());isHoveringItem=Ne(()=>this.rendererService.isHoveringItem()());loadedPhotoIds=new Set;layoutChangeInProgress=!1;svgBackgroundStrategy=null;circlePackingForSvg=null;svgCircleRadius=15e3;qrUrl=Ne(()=>`https://mapfutur.es/${this.lang()}prescan?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`);isMobile=Ne(()=>this.platform.isMobile);toggleRandomShowcase(){this.enableRandomShowcase.set(!this.enableRandomShowcase()),this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase())}toggleQrSize(){this.qrSmall.set(!this.qrSmall())}enableDragAllMode(t=oy){let e=this.workspace(),n=this.admin_key();if(!e||e==="WORKSPACE_NOT_SET"||!n||n==="ADMIN_KEY_NOT_SET")return;let i=t*60;this.apiService.setTemporaryCollaboration(e,n,i,ay).pipe(we(this.destroyRef)).subscribe({next:s=>{this.dragAllUntil.set(new Date(Date.now()+s.ttl*1e3))},error:s=>console.error("[DRAG_ALL] Error enabling temporary collaboration:",s)})}disableDragAllMode(){let t=this.workspace(),e=this.admin_key();!t||t==="WORKSPACE_NOT_SET"||!e||e==="ADMIN_KEY_NOT_SET"||this.apiService.deleteTemporaryCollaboration(t,e).pipe(we(this.destroyRef)).subscribe({next:()=>{this.dragAllUntil.set(null),this.dragAllControlsOpen.set(!1)},error:n=>console.error("[DRAG_ALL] Error disabling temporary collaboration:",n)})}toggleDragAllControls(t){t&&(t.stopPropagation(),t.preventDefault()),this.dragAllControlsOpen.update(e=>!e)}closeDragAllControls(){this.dragAllControlsOpen.set(!1)}adjustDragAllTime(t){let e=this.workspace(),n=this.admin_key();if(!e||e==="WORKSPACE_NOT_SET"||!n||n==="ADMIN_KEY_NOT_SET")return;let i=t*60;this.apiService.setTemporaryCollaboration(e,n,i).pipe(we(this.destroyRef)).subscribe({next:s=>{s.ttl<=0?(this.dragAllUntil.set(null),this.dragAllControlsOpen.set(!1)):this.dragAllUntil.set(new Date(Date.now()+s.ttl*1e3))},error:s=>console.error("[DRAG_ALL] Error adjusting temporary collaboration:",s)})}toggleFisheyeEffect(){let t=!this.fisheyeEnabled();if(this.fisheyeEnabled.set(t),this.rendererService.resetTaxonomyHoverOpacityFocus(),this.rendererService.enableFisheyeEffect(t),this.syncThematicFisheyeEffects(),t){let e=this.fisheyeSettings();this.rendererService.setFisheyeConfig({magnification:e.maxMagnification,radius:e.radius,maxHeight:e.maxHeight,viewportHeight:window.innerHeight})}}toggleSvgAutoPositioning(){return et(this,null,function*(){if(this.layoutChangeInProgress){console.warn("[TOGGLE] Layout change in progress, ignoring auto-position toggle");return}let e=!this.enableSvgAutoPositioning();if(this.enableSvgAutoPositioning.set(e),this.photoRepository.setSvgAutoPositioningEnabled(e),this.currentLayout()==="svg"){this.layoutChangeInProgress=!0;try{yield this.applySvgLayoutMode(e)}finally{this.layoutChangeInProgress=!1}}})}applySvgLayoutMode(t){return et(this,null,function*(){if(!this.svgBackgroundStrategy||!this.circlePackingForSvg){console.warn("[SVG] Strategies not initialized; run switchToSvgLayout first");return}let e=t?this.svgBackgroundStrategy:this.circlePackingForSvg;yield this.photoRepository.setLayoutStrategy(e),this.rendererService.setLayoutStrategyReference(e)})}getDefaultTransitionBarPosition(t){if(t.transition_bar_position)return t.transition_bar_position;let e=["before","during","after"],n=0,i=t._id||"";for(let o=0;o<i.length;o++){let a=i.charCodeAt(o);n=(n<<5)-n+a,n=n&n}let s=Math.abs(n)%3;return e[s]}deriveThumbnailUrl(t){return t.replace(/screenshot\.jpeg$/,"screenshot.thumbnail.jpeg")}deriveEnhancedUrl(t){return t.replace(/screenshot\.jpeg$/,"screenshot.enhanced.jpeg")}repositionPhoto(t){return et(this,null,function*(){let e=this.photoRepository.getLayoutStrategy();if(!e)return;let n=this.photoRepository.getAllPhotos(),i=this.enableSvgAutoPositioning(),s=yield e.getPositionForPhoto(t,n,{enableAutoPositioning:i});if(!s||!t.mesh)return;let o={x:s.x,y:s.y,z:0};t.setTargetPosition(o);let a=t.mesh,c=a.position.x-o.x,l=a.position.y-o.y;if(Math.sqrt(c*c+l*l)>1){let h={x:a.position.x,y:a.position.y,z:a.position.z};yield this.rendererService.animateToPosition(a,h,o,.5),t.setCurrentPosition(o)}})}recalculateClusterLayout(t){return et(this,null,function*(){if(!t)return;let n=this.photoRepository.getAllPhotos().filter(i=>i.metadata.author_id===t);n.length!==0&&(yield Promise.all(n.map(i=>this.repositionPhoto(i))))})}resolveUserAuthorId(t){let e=this.userItemKey();if(!e||this.userAuthorId())return;let n=t.find(i=>i._key&&i._key===e||i.item_key&&i.item_key===e);n?.author_id&&this.userAuthorId.set(n.author_id)}fetchWorkspaceData(){let t=this.workspace();if(!t||t==="WORKSPACE_NOT_SET")return;let e=this.resolveAuthToken()??void 0;this.apiService.fetchWorkspaceRaw(t,e).pipe(we(this.destroyRef)).subscribe({next:n=>{if(!n)return;let i=n.source||n.title||"";this.workspaceTitle.set(i);let s=n.collaborate!==!1;this.allowAdditionalContributions.set(s);let o=n.temporary_collaboration_ttl;typeof o=="number"&&o>0?(this.dragAllUntil.set(new Date(Date.now()+o*1e3)),this.dragModeDefaultLayoutApplied||(this.dragModeDefaultLayoutApplied=!0,this.currentLayout()!=="svg"&&(this.isLoading()?this.currentLayout.set("svg"):this.switchToSvgLayout()))):(this.dragAllUntil.set(null),this.dragAllControlsOpen.set(!1),this.dragModeDefaultLayoutApplied=!1)}})}getItems(t){let e={},n=this.resolveAuthToken();n&&(e.headers={Authorization:n});let i=`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`;return t&&(i+=`&filters=${encodeURIComponent("updated_at>"+t)}`),this.http.get(i,e).pipe(Ul(s=>(console.error("Error loading items:",s),Dl([]))))}computeMaxTimestamp(t){let e=this.lastFetchedAt;for(let n of t){let i=n?.created_at,s=n?.updated_at;typeof i=="string"&&i>e&&(e=i),typeof s=="string"&&s>e&&(e=s)}return e}isRejectedItem(t){return!t||typeof t!="object"?!1:t._private_moderation===0?!0:(typeof t.status=="string"?t.status.toLowerCase().trim():"")==="rejected"}ngAfterViewInit(){return et(this,null,function*(){this.taxonomyService.fetch(),this.platform.browser()&&(fn(window,"message").pipe(we(this.destroyRef)).subscribe(t=>{let e=t.data;if(!(!e||typeof e!="object")&&e.type==="show-on-map"){let n=typeof e.itemId=="string"?e.itemId:null;if(!n)return;this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.focusOnItem(n,{animateFromFull:!0,fromShowOnMap:!0})}}),fn(window,"hashchange").pipe(we(this.destroyRef)).subscribe(()=>this.applyHashStateFromUrl()),fn(window,"resize").pipe(we(this.destroyRef)).subscribe(()=>this.measureTitle()),fn(window,"keydown").pipe(we(this.destroyRef)).subscribe(t=>this.onKeyDown(t)),this.measureTitle(),yield this.initialize(this.container.nativeElement),this.viewInitialized.set(!0))})}onKeyDown(t){if(t.key==="p"||t.key==="P"){let e=this.rendererService.getPerformanceMetrics();this.rendererService.enablePerformanceMonitoring(!e.isMonitoring)}}measureTitle(){this.titleElement&&setTimeout(()=>{let t=this.titleElement?.nativeElement;if(t){let e=t.scrollWidth>t.clientWidth;this.titleNeedsAnimation.set(e)}},0)}initialize(t){return et(this,null,function*(){yield this.rendererService.initialize(t,{photoWidth:Lt.PHOTO_WIDTH,photoHeight:Lt.PHOTO_HEIGHT}),this.rendererService.setPhotoClickCallback(s=>{this.onPhotoClick(s)}),this.rendererService.setBackgroundClickCallback(()=>{this.onBackgroundClick()});let e=this.fisheyeSettings();this.fisheyeEnabled.set(e.enabled),e.enabled&&(this.rendererService.enableFisheyeEffect(!0),this.syncThematicFisheyeEffects(),this.rendererService.setFisheyeConfig({magnification:e.maxMagnification,radius:e.radius,maxHeight:e.maxHeight,viewportHeight:window.innerHeight}));let n=this.activatedRoute.snapshot.queryParams;if((n.fisheye==="0"||n.fisheye==="false")&&(this.rendererService.enableFisheyeEffect(!1),this.syncThematicFisheyeEffects()),(n.perf==="1"||n.perf==="true")&&this.rendererService.enablePerformanceMonitoring(!0),n.fisheye_radius){let s=parseFloat(n.fisheye_radius);isNaN(s)||this.rendererService.setFisheyeConfig({radius:s})}if(n.fisheye_magnification){let s=parseFloat(n.fisheye_magnification);isNaN(s)||this.rendererService.setFisheyeConfig({magnification:s})}if(n.fisheye_distortion){let s=parseFloat(n.fisheye_distortion);isNaN(s)||this.rendererService.setFisheyeConfig({distortion:s})}let i=new jn({photoWidth:Lt.PHOTO_WIDTH,photoHeight:Lt.PHOTO_HEIGHT,spacingX:Lt.SPACING_X,spacingY:Lt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()});if(yield this.photoRepository.initialize(i,this.rendererService,{enableRandomShowcase:this.enableRandomShowcase(),showcaseInterval:ue.SHOWCASE_INTERVAL,newPhotoAnimationDelay:ue.NEW_PHOTO_ANIMATION_DELAY}),this.photoRepository.photoAdded$.pipe(we(this.destroyRef)).subscribe(s=>{}),this.photoRepository.photoRemoved$.pipe(we(this.destroyRef)).subscribe(s=>{}),this.photoRepository.layoutChanged$.pipe(we(this.destroyRef)).subscribe(()=>{}),rr(500).pipe(we(this.destroyRef)).subscribe(()=>{this.currentZoomLevel.set(this.rendererService.getCurrentZoomLevel()),this.syncThematicFisheyeEffects(),this.updateFisheyeTaxonomyFocusLabel()}),rr(1e3).pipe(we(this.destroyRef)).subscribe(()=>{let s=this.dragAllUntil();if(s){let o=Math.max(0,Math.ceil((s.getTime()-Date.now())/1e3));this.dragAllRemainingSeconds.set(o),o===0&&this.dragAllUntil.set(null)}}),rr(ue.API_POLLING_INTERVAL).pipe(Nl(()=>this.isPollingActive()),we(this.destroyRef)).subscribe(()=>{this.workspace()!=="WORKSPACE_NOT_SET"&&this.fetchWorkspaceData()}),this.platform.browser()){if(this.currentLayout()!=="circle-packing")try{this.currentLayout()==="tsne"?yield this.switchToTsneLayout():this.currentLayout()==="tsne-grid"?yield this.switchToTsneGridLayout():this.currentLayout()==="svg"&&(yield this.switchToSvgLayout()),this.initialLayoutPreparedBeforeLoad=!0}catch(s){console.error("Error preparing initial layout before load:",s),this.initialLayoutPreparedBeforeLoad=!1}Fl(ue.INITIAL_POLLING_DELAY).pipe(we(this.destroyRef)).subscribe(()=>{this.getItems().pipe(we(this.destroyRef)).subscribe(s=>{this.loop.next(s)})})}})}updateFisheyeTaxonomyFocusLabel(){if(this.currentLayout()!=="tsne"||!this.fisheyeEnabled()){this.fisheyeTaxonomyFocusLabel.set(null);return}let t=this.rendererService.getTopFisheyeTaxonomyIds();if(!t){this.fisheyeTaxonomyFocusLabel.set(null);return}let e=t.topicId?this.taxonomyService.resolveTopic(t.topicId):t.themeId?this.taxonomyService.resolveThemeName(t.themeId):null;this.fisheyeTaxonomyFocusLabel.set(e??null)}syncThematicFisheyeEffects(){this.rendererService.setThematicFisheyeEffectsEnabled(this.currentLayout()==="tsne"&&this.fisheyeEnabled())}switchToTsneLayout(){return et(this,null,function*(){if(!this.layoutChangeInProgress){if(!this.workspace()){console.error("Workspace not set");return}this.layoutChangeInProgress=!0;try{this.currentLayout.set("tsne"),this.updateHashState({view:"tsne"}),this.syncThematicFisheyeEffects(),this.clearTsneGridState();let t=new yr({photoWidth:Lt.PHOTO_WIDTH,photoHeight:Lt.PHOTO_HEIGHT,spacingX:Lt.SPACING_X,spacingY:Lt.SPACING_Y});yield t.initialize(),this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),yield this.photoRepository.setLayoutStrategy(t),this.currentTsneStrategy=t,this.computeTaxonomyLabels(t)}catch(t){console.error("Error switching to TSNE layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToTsneGridLayout(){return et(this,null,function*(){if(!this.layoutChangeInProgress){if(!this.workspace()){console.error("Workspace not set");return}this.layoutChangeInProgress=!0;try{this.currentLayout.set("tsne-grid"),this.updateHashState({view:"tsne-grid"}),this.syncThematicFisheyeEffects(),this.clearTaxonomyOverlayState();let t=new _r(this.workspace(),void 0,{photoWidth:Lt.PHOTO_WIDTH,photoHeight:Lt.PHOTO_HEIGHT,spacingX:Lt.SPACING_X,spacingY:Lt.SPACING_Y});yield t.initialize(),this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),this.rendererService.setLayoutRotationOverrideEnabled(!0),yield this.photoRepository.setLayoutStrategy(t),this.tsneClusterLabels.set(t.getClustersWithWorldCoords().map((e,n)=>({id:`tsne-cluster-${n}`,name:this.taxonomyService.localizeName(e.title),worldX:e.centerX,worldY:e.centerY,worldWidth:e.width,rotationDeg:e.averageRotation})))}catch(t){console.error("Error switching to TSNE layout:",t)}finally{this.layoutChangeInProgress=!1}}})}clearTsneGridState(){this.tsneClusterLabels.set([]),this.rendererService.setLayoutRotationOverrideEnabled(!1)}clearTaxonomyOverlayState(){this.currentTsneStrategy=null,this.taxonomyThemeLabels.set([]),this.taxonomySubThemeLabels.set([]),this.rendererService.resetTaxonomyHoverOpacityFocus()}computeTaxonomyLabels(t){let e=t.getSubThemeLabelNodes().map(i=>{let s=this.taxonomyService.resolveTopic(i.id),o=s.includes(">")&&s.split(">").pop()?.trim()||s;return{id:i.id,name:o,worldX:i.worldX,worldY:i.worldY,itemCount:i.itemCount}});e.length===0&&(e=t.getClustersWithWorldCoords().map((s,o)=>({id:`cluster-${o}`,name:this.taxonomyService.localizeName(s.title),worldX:s.centerX,worldY:s.centerY,itemCount:1}))),this.taxonomySubThemeLabels.set(e);let n=t.getThemeLabelNodes().map(i=>({id:i.id,name:this.taxonomyService.resolveThemeName(i.id),worldX:i.worldX,worldY:i.worldY,itemCount:i.itemCount}));this.taxonomyThemeLabels.set(n)}onTaxonomyLabelHover(t){if(!t||this.currentLayout()!=="tsne"){this.rendererService.resetTaxonomyHoverOpacityFocus();return}if(t.level==="sub-theme"){this.rendererService.setTaxonomyHoverOpacityFocus({topicId:t.id});return}this.rendererService.setTaxonomyHoverOpacityFocus({themeId:t.id})}switchToSvgLayout(){return et(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("svg"),this.updateHashState({view:"svg"}),this.syncThematicFisheyeEffects(),this.clearTaxonomyOverlayState(),this.clearTsneGridState();let e=this.activatedRoute.snapshot.queryParams.svg||"/showcase-bg.svg",n=-this.svgCircleRadius*1.6,i=0;this.svgBackgroundStrategy=new vr({svgPath:e,centerX:0,centerY:0,circleRadius:this.svgCircleRadius,radiusVariation:0,svgOffsetX:n,svgOffsetY:i}),yield this.svgBackgroundStrategy.initialize(),this.circlePackingForSvg=new jn({photoWidth:Lt.PHOTO_WIDTH,photoHeight:Lt.PHOTO_HEIGHT,spacingX:Lt.SPACING_X,spacingY:Lt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()}),this.rendererService.setDragCompleteCallback((h,u)=>et(this,[h,u],function*(o,{position:a,isOutOfBounds:c,hotspotData:l}){let d=this.photoRepository.getPhotoById(o);if(!d){console.warn("[DRAG] Photo not found:",o);return}let p=d.metadata.author_id,g={layout_x:d.metadata.layout_x,layout_y:d.metadata.layout_y};l&&Object.keys(l).forEach(E=>{g[E]=d.metadata[E]});let y={};if(c)d.updateMetadata({layout_x:void 0,layout_y:void 0}),y.layout_x=null,y.layout_y=null;else{let{layout_x:E,layout_y:V}=this.svgBackgroundStrategy.worldToNormalized(a.x,a.y);d.updateMetadata({layout_x:E,layout_y:V}),y.layout_x=E,y.layout_y=V,l&&(d.updateMetadata(l),Object.assign(y,l))}let m=this.workspace(),f=this.admin_key(),w=this.api_key(),S=d.metadata.item_key,x=this.userItemKey(),C=f&&f!=="ADMIN_KEY_NOT_SET",A=w&&w!=="API_KEY_NOT_SET",R=this.dragAllActive(),D=!C&&!R&&(S||x)||void 0,M=m&&m!=="WORKSPACE_NOT_SET"&&(C||A||!!D),b=!1;if(M)try{yield new Promise((E,V)=>{this.apiService.updateProperties(y,o,D).subscribe({next:()=>E(),error:H=>{console.error("[DRAG] Error saving to API:",H),V(H)}})}),b=!0}catch(E){console.error("[DRAG] Error saving to API:",E)}if(!b){M||console.warn("[DRAG] Skipping save due to missing authorization context",{hasAdminKey:C,hasApiKey:A,hasItemKey:!!D}),d.updateMetadata(g);let E=g.layout_x,V=g.layout_y;if(this.svgBackgroundStrategy&&typeof E=="number"&&typeof V=="number"){let H=this.svgBackgroundStrategy.normalizedToWorld(E,V),X={x:H.x,y:H.y,z:0};d.setTargetPosition(X),d.setCurrentPosition(X),d.mesh&&d.mesh.position.set(X.x,X.y,X.z)}else yield this.repositionPhoto(d);return}if(this.currentLayout()!=="svg"){yield this.recalculateClusterLayout(p);let E=d.metadata.author_id;E&&E!==p&&(yield this.recalculateClusterLayout(E))}c&&(yield this.repositionPhoto(d))}));let s=this.svgBackgroundStrategy.getSvgElement();s?(this.rendererService.setSvgBackground(s,{scale:1,offsetX:n,offsetY:0,radius:this.svgCircleRadius,desiredOpacity:1}),this.rendererService.setLayoutStrategyReference(this.svgBackgroundStrategy)):console.warn("\u274C SVG element is null, cannot set background"),this.photoRepository.setSvgVisible(!0,this.svgBackgroundStrategy),this.photoRepository.setSvgAutoPositioningEnabled(this.enableSvgAutoPositioning()),yield this.applySvgLayoutMode(this.enableSvgAutoPositioning())}catch(t){console.error("Error switching to SVG layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToCirclePackingLayout(){return et(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("circle-packing"),this.updateHashState({view:"circle-packing"}),this.syncThematicFisheyeEffects(),this.clearTaxonomyOverlayState(),this.clearTsneGridState();let t=new jn({photoWidth:Lt.PHOTO_WIDTH,photoHeight:Lt.PHOTO_HEIGHT,spacingX:Lt.SPACING_X,spacingY:Lt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()});this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),yield this.photoRepository.setLayoutStrategy(t)}catch(t){console.error("Error switching to Circle Packing layout:",t)}finally{this.layoutChangeInProgress=!1}}})}getLayoutIndicatorTransform(){return`translateX(${(this.currentLayout()==="svg"?0:1)*108}px)`}resetView(){this.rendererService.resetCameraView(!0)}zoomIn(){this.rendererService.zoomAtCenter(.65)}zoomOut(){this.rendererService.zoomAtCenter(1.5)}onSearchInput(t){let e=t.target;this.searchText.set(e.value)}clearSearch(){this.searchText.set(""),this.searchActive.set(!1)}updateSearchHash(){let t=this.searchText();this.updateHashState({search:t||null})}applySearchFilter(){let t=this.searchText().toLowerCase().trim(),e=this.photoRepository.getAllPhotos();if(this.updateSearchHash(),!t){let s=0;this.searchIndex.clear(),e.forEach(o=>{this.rendererService.setPhotoOpacity(o.metadata.id,1),this.rendererService.setPhotoZIndex(o.metadata.id,0),s++});return}let n=0,i=0;e.forEach(s=>{this.getSearchableText(s).includes(t)?(this.rendererService.setPhotoOpacity(s.metadata.id,1),this.rendererService.setPhotoZIndex(s.metadata.id,100),n++):(this.rendererService.setPhotoOpacity(s.metadata.id,.2),this.rendererService.setPhotoZIndex(s.metadata.id,-100),i++)})}goBack(){this.router.navigate(["/"],{queryParamsHandling:"preserve"})}toggleFiltersBar(){this.filtersBarOpen.set(!this.filtersBarOpen())}onFiltersChange(t){this.currentFilters.set(t)}applyFilters(){if(!this.photoRepository)return;if(!this.isAdmin()){this.photoRepository.getAllPhotos().forEach(i=>{this.rendererService.setPhotoOpacity(i.metadata.id,1),this.rendererService.setPhotoZIndex(i.metadata.id,0)});return}let t=this.currentFilters();this.photoRepository.getAllPhotos().forEach(n=>{if(!n.mesh)return;this.photoMatchesFilters(n,t)?(this.rendererService.setPhotoOpacity(n.metadata.id,1),this.rendererService.setPhotoZIndex(n.metadata.id,0)):(this.rendererService.setPhotoOpacity(n.metadata.id,.2),this.rendererService.setPhotoZIndex(n.metadata.id,-100))})}photoMatchesFilters(t,e){let n=t.metadata;if(e.status.length>0&&e.status.length<6){let i=n._private_moderation;if(!this.matchesStatusFilter(i,e.status))return!1}if(e.author!=="all"&&n.author_id!==e.author)return!1;if(e.preference.length>0&&e.preference.length<6){let i=n.favorable_future||n._svgZoneFavorableFuture;if(!this.matchesPreferenceFilter(i,e.preference))return!1}if(e.potential.length>0&&e.potential.length<6){let i=n.plausibility;if(!this.matchesPotentialFilter(i,e.potential))return!1}if(e.type!=="all"&&n.screenshot_type!==e.type)return!1;if(e.topic&&e.topic.length>0){let i=n.topics||[];if(i.length>0&&!i.some(o=>e.topic.includes(o)))return!1}return!(e.search&&!this.getSearchableText(t).includes(e.search.toLowerCase().trim()))}matchesStatusFilter(t,e){if(e.length===0)return!0;let n={new:2,flagged:1,"not-flagged":3,approved:4,highlighted:5,rejected:0};for(let i of e){let s=n[i];if(s!=null){if(i==="new"){if(t==null||t===2)return!0}else if(t===s)return!0}}return!1}matchesPreferenceFilter(t,e){if(e.length===0||e.length===6)return!0;if(!t)return e.includes("none");let n=t.toLowerCase().trim(),s={prefer:"prefer",favor:"prefer",favorable:"prefer",preferred:"prefer","mostly prefer":"mostly prefer",uncertain:"uncertain","mostly prevent":"mostly prevent",prevent:"prevent",unfavorable:"prevent"}[n];return s?e.includes(s):!1}matchesPotentialFilter(t,e){if(e.length===0||e.length===6)return!0;if(typeof t!="number"||!isFinite(t))return e.includes("none");let n;return t>=90?n="100":t>=70?n="75":t>=40?n="50":t>=10?n="25":n="0",e.includes(n)}onSettingsChange(t){this.fisheyeSettings.set(t),this.fisheyeEnabled.set(t.enabled),this.rendererService.enableFisheyeEffect(t.enabled),this.syncThematicFisheyeEffects(),this.rendererService.setFisheyeConfig({magnification:t.maxMagnification,radius:t.radius,maxHeight:t.maxHeight,viewportHeight:window.innerHeight})}onPhotoClick(t){this.updateHashState({itemId:t}),this.updateActiveItemZIndex(),this.isAdmin()?(this.selectedItemId.set(t),this.sidebarOpen.set(!0)):this.focusOnItem(t,{animateFromFull:!0,fromShowOnMap:!0})}focusOnItem(t,e){return et(this,null,function*(){this.rendererService.setPermalinkTarget(t),this.rendererService.setCameraMode("user-controlled");let n=0;for(;n<this.MAX_FOCUS_ATTEMPTS;){let i=this.photoRepository.getPhoto(t);if(i&&i.mesh&&i.animationState==="positioned"){let s=i.mesh.position,o=e?.animateFromFull===!0;if(o&&e?.fromShowOnMap)yield this.rendererService.focusOnItemFromShowOnMap(s.x,s.y,i);else if(o){this.rendererService.setCameraMode("user-controlled");let a=this.rendererService.getCurrentBounds(),c=this.rendererService.computeFitZWithMargin(a,Math.PI*45/180,window.innerWidth/window.innerHeight,300);yield this.rendererService.focusOnPositionAnimated(s.x,s.y,c,1);let l=c*.5;yield this.rendererService.focusOnPositionAnimated(s.x,s.y,l,2)}else this.rendererService.focusOnPosition(s.x,s.y,this.DEFAULT_FOCUS_ZOOM);return}yield new Promise(s=>setTimeout(s,this.FOCUS_RETRY_DELAY_MS)),n++}console.warn("[SHOWCASE_WS] Could not find photo to focus on:",t)})}updateActiveItemZIndex(){let t=this.parseHashState().itemId??null;if(t){let e=this.photoRepository.getPhoto(t);e&&e.mesh&&(e.mesh.renderOrder=100)}else this.resetAllItemsZIndex()}resetAllItemsZIndex(){let t=this.photoRepository.getAllPhotos?.();t&&t.forEach(e=>{e.mesh&&(e.mesh.renderOrder=0)})}canEdit=Ne(()=>this.isAdmin());MAX_FOCUS_ATTEMPTS=50;FOCUS_RETRY_DELAY_MS=100;DEFAULT_FOCUS_ZOOM=800;onBackgroundClick(){this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.updateHashState({itemId:null}),this.resetAllItemsZIndex()}onSidebarClose(){this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.updateHashState({itemId:null}),this.resetAllItemsZIndex()}parseHashState(){if(!this.platform.browser())return{};let t=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;if(!t)return{};if(!t.includes("=")){let a=this.normalizeLayout(t);return a?{view:a}:{itemId:t}}let e=new URLSearchParams(t),n=e.get("view")??e.get("layout"),i=this.normalizeLayout(n),s=e.get("item")??void 0,o=e.get("search")??void 0;return{view:i??void 0,itemId:s,search:o}}normalizeLayout(t){return t&&ry.includes(t)?t:null}updateHashState(t){if(!this.platform.browser()||this.isApplyingHashState)return;let e=this.parseHashState(),n=new URLSearchParams,i=t.view===void 0?e.view??this.currentLayout():t.view,s=t.itemId===void 0?e.itemId??null:t.itemId,o=t.search===void 0?e.search??null:t.search;i&&n.set("view",i),s&&s.trim().length>0&&n.set("item",s),o&&o.trim().length>0&&n.set("search",o);let a=n.toString(),c=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash;a!==c&&(this.isApplyingHashState=!0,window.location.hash=a,this.isApplyingHashState=!1)}applyHashStateFromUrl(){if(!this.platform.browser()||this.isApplyingHashState)return;let t=this.parseHashState();typeof t.search=="string"&&t.search!==this.searchText()&&(this.searchText.set(t.search),this.searchActive.set(t.search.trim().length>0));let e=t.itemId??null;e!==this.focusItemId()&&this.focusItemId.set(e),t.view&&t.view!==this.currentLayout()&&(t.view==="tsne"?this.switchToTsneLayout():t.view==="tsne-grid"?this.switchToTsneGridLayout():t.view==="svg"?this.switchToSvgLayout():this.switchToCirclePackingLayout()),this.updateActiveItemZIndex()}onMetadataUpdated(t){return et(this,null,function*(){let{itemId:e,metadata:n}=t,i=this.photoRepository.getPhoto(e);if(i&&(i.updateMetadata(n),this.currentLayout()==="svg"&&this.enableSvgAutoPositioning())){let s=i.metadata.author_id;s&&(yield this.recalculateClusterLayout(s))}})}ngOnDestroy(){this.rendererService.dispose()}static \u0275fac=function(e){return new(e||r)(bn(Xl),bn(Vl),bn(ql),bn(Gl),bn(Jn),bn(fi))};static \u0275cmp=Mn({type:r,selectors:[["app-showcase-ws"]],viewQuery:function(e,n){if(e&1&&(bs(Vg,7),bs(Gg,5)),e&2){let i;Ms(i=Ss())&&(n.container=i.first),Ms(i=Ss())&&(n.titleElement=i.first)}},decls:71,vars:34,consts:[["container",""],["titleElement",""],[1,"container"],[1,"preloader"],[1,"hide-on-mobile","qr-clickable",3,"small","url"],[3,"close","metadataUpdated","isOpen","itemId","itemKey","workspaceId","apiKey","adminKey","lang"],[1,"filters-bar-container",3,"open"],["href","/","title","Back to Home",1,"logo-link","hide-on-mobile"],["src","/futures-map-logo.svg","alt","Futures Map",1,"logo-icon"],["title","Back to Home",1,"home-button","show-on-mobile",3,"click"],["viewBox","0 0 24 24",1,"button-icon"],["d","M11 20V7.83L5.41 13 4 11.59 12 3l8 8-1.41 1.41L13 7.83V20z","fill","currentColor"],[1,"workspace-title",3,"needs-animation"],[1,"zoom-controls"],[1,"zoom-buttons"],[1,"search-section"],["title","Search",1,"zoom-button",3,"click"],["cx","11","cy","11","r","8","stroke","currentColor","stroke-width","2","fill","none"],["d","M21 21l-4.35-4.35","stroke","currentColor","stroke-width","2","stroke-linecap","round"],[1,"search-input-container"],["title","Zoom In (+)",1,"zoom-button","hide-on-mobile",3,"click"],["d","M12 5v14M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Zoom Out (-)",1,"zoom-button","hide-on-mobile",3,"click"],["d","M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Reset View (R)",1,"zoom-button",3,"click"],["d","M2 2l4 0 0 2 -2 0 0 2 -2 0 0 -4","fill","currentColor"],["d","M22 2l-4 0 0 2 2 0 0 2 2 0 0 -4","fill","currentColor"],["d","M2 22l4 0 0 -2 -2 0 0 -2 -2 0 0 4","fill","currentColor"],["d","M22 22l-4 0 0 -2 2 0 0 -2 2 0 0 4","fill","currentColor"],[1,"layout-toggle-centered"],[1,"layout-toggle"],[1,"toggle-background"],[1,"toggle-buttons"],["title","Map Layout",1,"toggle-button","map-button",3,"click"],[1,"button-content"],["src","/icon-cone.svg","alt","Map",1,"button-icon"],[1,"button-label"],["role","status","aria-live","polite",1,"map-drag-counter",3,"admin","breathing"],["title","Thematic Layout",1,"toggle-button","thematic-button",3,"click"],["viewBox","0 0 24 24","aria-hidden","true",1,"button-icon"],["points","12,3 21,8 21,16 12,21 3,16 3,8","stroke","currentColor","stroke-width","2","fill","none"],["points","12,8 16,10.5 16,15.5 12,18 8,15.5 8,10.5","fill","currentColor","opacity","0.6"],["title","TSNE Layout",1,"toggle-button","tsne-button",3,"click"],["cx","6","cy","7","r","1.8","fill","currentColor"],["cx","11","cy","4.5","r","1.8","fill","currentColor"],["cx","9","cy","12","r","1.8","fill","currentColor"],["cx","16","cy","9","r","1.8","fill","currentColor"],["cx","5","cy","17","r","1.8","fill","currentColor"],["cx","13","cy","18","r","1.8","fill","currentColor"],["cx","19","cy","15","r","1.8","fill","currentColor"],["title","Clusters Layout",1,"toggle-button","clusters-button",3,"click"],["src","/icon-clusters.svg","alt","Clusters",1,"button-icon"],["role","group","aria-label","Drag mode controls",1,"drag-all-controls-popup"],[3,"themeLabels","subThemeLabels","zoomLevel"],[3,"labels"],["aria-live","polite",1,"fisheye-taxonomy-focus-label"],[1,"spinner"],[1,"hide-on-mobile","qr-clickable",3,"click","small","url"],[1,"filters-bar-container"],[3,"filtersChange","filtersCommit","counts","totalCount","filteredCount","showViewToggle","showOrderBy","initialState","topicTree"],[1,"workspace-title"],["type","text","placeholder","Search...",1,"search-input",3,"input","keydown.escape","value"],["title","Clear search",1,"search-clear"],["title","Clear search",1,"search-clear",3,"click"],["title","Toggle Random Showcase",1,"showcase-toggle","hide-on-mobile",3,"click"],["cx","12","cy","8","r","2","fill","currentColor"],["cx","12","cy","16","r","2","fill","currentColor"],["cx","6","cy","12","r","2","fill","currentColor"],["cx","18","cy","12","r","2","fill","currentColor"],["title","Enable participant drag mode (15 min)",1,"drag-all-toggle","hide-on-mobile"],["title","Toggle Filters",1,"filter-toggle","hide-on-mobile",3,"click"],["d","M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04c-.83 0-1.3.95-.79 1.61z","fill","currentColor"],["title","Enable participant drag mode (15 min)",1,"drag-all-toggle","hide-on-mobile",3,"click"],["d","M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z","fill","currentColor"],["role","status","aria-live","polite",1,"map-drag-counter",3,"click"],["aria-hidden","true",1,"counter-caret",3,"open"],["aria-hidden","true",1,"counter-caret"],["role","group","aria-label","Drag mode controls",1,"drag-all-controls-popup",3,"click"],["title","Remove 1 minute","aria-label","Remove 1 minute",1,"drag-time-btn",3,"click"],["title","Add 1 minute","aria-label","Add 1 minute",1,"drag-time-btn",3,"click"],["title","Add 5 minutes","aria-label","Add 5 minutes",1,"drag-time-btn",3,"click"],["title","Stop drag mode","aria-label","Stop drag mode",1,"drag-stop-btn",3,"click"],["d","M6 6h12v12H6z","fill","currentColor"],[3,"labelHover","themeLabels","subThemeLabels","zoomLevel"]],template:function(e,n){if(e&1){let i=Ge();pe(0,"div",2,0),Ve(2,Wg,2,0,"div",3)(3,Xg,1,2,"app-qrcode",4),pt(4,"app-evaluation-sidebar",5),ne("close",function(){return Yt(i),qt(n.onSidebarClose())})("metadataUpdated",function(o){return Yt(i),qt(n.onMetadataUpdated(o))}),It(),Ve(5,Yg,2,9,"div",6),pt(6,"a",7),pe(7,"img",8),It(),pt(8,"button",9),ne("click",function(){return Yt(i),qt(n.goBack())}),Ze(),pt(9,"svg",10),pe(10,"path",11),It()(),Ve(11,Zg,4,4,"div",12),pn(),pt(12,"div",13)(13,"div",14)(14,"div",15)(15,"button",16),ne("click",function(){return Yt(i),qt(n.searchActive.set(!n.searchActive()))}),Ze(),pt(16,"svg",10),pe(17,"circle",17)(18,"path",18),It()(),Ve(19,Kg,3,2,"div",19),It(),pn(),pt(20,"button",20),ne("click",function(){return Yt(i),qt(n.zoomIn())}),Ze(),pt(21,"svg",10),pe(22,"path",21),It()(),pn(),pt(23,"button",22),ne("click",function(){return Yt(i),qt(n.zoomOut())}),Ze(),pt(24,"svg",10),pe(25,"path",23),It()(),pn(),pt(26,"button",24),ne("click",function(){return Yt(i),qt(n.resetView())}),Ze(),pt(27,"svg",10),pe(28,"path",25)(29,"path",26)(30,"path",27)(31,"path",28),It()()(),Ve(32,jg,10,5),It(),pn(),pt(33,"div",29)(34,"div",30),pe(35,"div",31),pt(36,"div",32)(37,"button",33),ne("click",function(){return Yt(i),qt(n.switchToSvgLayout())}),pt(38,"div",34),pe(39,"img",35),pt(40,"span",36),Te(41,"Map"),It(),Ve(42,ty,3,7,"span",37),It()(),pt(43,"button",38),ne("click",function(){return Yt(i),qt(n.switchToTsneLayout())}),pt(44,"div",34),Ze(),pt(45,"svg",39),pe(46,"polygon",40)(47,"polygon",41),It(),pn(),pt(48,"span",36),Te(49,"Thematic"),It()()(),pt(50,"button",42),ne("click",function(){return Yt(i),qt(n.switchToTsneGridLayout())}),pt(51,"div",34),Ze(),pt(52,"svg",39),pe(53,"circle",43)(54,"circle",44)(55,"circle",45)(56,"circle",46)(57,"circle",47)(58,"circle",48)(59,"circle",49),It(),pn(),pt(60,"span",36),Te(61,"TSNE"),It()()(),pt(62,"button",50),ne("click",function(){return Yt(i),qt(n.switchToCirclePackingLayout())}),pt(63,"div",34),pe(64,"img",51),pt(65,"span",36),Te(66,"Clusters"),It()()()(),Ve(67,ey,11,0,"div",52),It()(),Ve(68,ny,1,3,"app-taxonomy-clusters-overlay",53)(69,iy,1,1,"app-tsne-clusters-overlay",54)(70,sy,2,1,"div",55)}e&2&&(Re("dragging",n.isDragging())("hovering",n.isHoveringItem()),Vt(2),Ie(n.isLayoutLoading()?2:-1),Vt(),Ie(n.allowAdditionalContributions()?3:-1),Vt(),Un("isOpen",n.sidebarOpen()&&n.canEditSelectedItem())("itemId",n.selectedItemId())("itemKey",n.selectedItemKey())("workspaceId",n.workspace())("apiKey",n.api_key())("adminKey",n.admin_key())("lang",n.lang()),Vt(),Ie(n.isAdmin()&&!n.isLoading()&&n.viewInitialized()?5:-1),Vt(6),Ie(n.workspaceTitle()?11:-1),Vt(),Re("sidebar-open",n.sidebarOpen()),Vt(3),Re("active",n.searchActive()),Vt(4),Ie(n.searchActive()?19:-1),Vt(13),Ie(n.isAdmin()?32:-1),Vt(5),Re("active",n.currentLayout()==="svg"),Vt(5),Ie(n.dragAllActive()?42:-1),Vt(),Re("active",n.currentLayout()==="tsne"),Vt(7),Re("active",n.currentLayout()==="tsne-grid"),Vt(12),Re("active",n.currentLayout()==="circle-packing"),Vt(5),Ie(n.dragAllActive()&&n.isAdmin()&&n.dragAllControlsOpen()?67:-1),Vt(),Ie(n.currentLayout()==="tsne"?68:-1),Vt(),Ie(n.currentLayout()==="tsne-grid"?69:-1),Vt(),Ie(n.currentLayout()==="tsne"&&n.fisheyeEnabled()&&n.fisheyeTaxonomyFocusLabel()?70:-1))},dependencies:[ur,fr,Zl,la,ca],styles:[`

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
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.thematic-button[_ngcontent-%COMP%] {
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
}`]})};export{Kh as ShowcaseWsComponent};
/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/
