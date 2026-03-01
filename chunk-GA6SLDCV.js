import{A as yl,Aa as Qt,Ab as Pl,Ba as Me,Ca as mn,E as xl,Ea as Se,Fa as xe,G as ps,Ia as ms,J as Ri,Ja as gs,Ka as _s,M as ai,Ma as Di,Oa as $o,Pb as Rl,Qb as Ph,T as fe,U as pe,V as sn,W as An,a as Ht,aa as Zo,b as Ke,ba as rn,ca as Ml,da as Zt,db as wl,e as Ch,eb as ze,f as ri,fb as Oi,g as st,i as oi,ia as bl,ka as le,la as pn,lb as Tl,ma as Ii,oa as on,ob as El,q as ml,qa as li,r as gl,ra as Sl,sa as Ve,sb as Al,ua as Je,ub as Cl,w as _l,x as vl,za as Bt,zb as Vn}from"./chunk-NWR7T6GD.js";var Dl=Ch(Ph());var Ih=["qrcode"],Js=class s{constructor(t,e){this.el=t;this.platform=e}url=rn("");small=rn(!1);codeSize=Zt(0);transform=ze(()=>`scale(${this.scale()})`);scale=ze(()=>{let t=this.mainEl();if(!t)return 1;let e=t.clientHeight/2/this.codeSize();return this.small()?e/5:e});mainEl=Zt(null);qrCodeEl;ngAfterViewInit(){return st(this,null,function*(){if(this.platform.browser()){this.mainEl.set(this.el.nativeElement);try{yield Dl.default.toCanvas(this.qrCodeEl.nativeElement,this.url(),{scale:16,color:{light:"#FFFDF6",dark:"#4E02B2"}}),this.codeSize.set(this.qrCodeEl.nativeElement.height)}catch(t){console.error("Error generating QR code:",t)}}})}static \u0275fac=function(e){return new(e||s)(pn(Ml),pn(Vn))};static \u0275cmp=Ii({type:s,selectors:[["app-qrcode"]],viewQuery:function(e,n){if(e&1&&ms(Ih,7),e&2){let i;gs(i=_s())&&(n.qrCodeEl=i.first)}},inputs:{url:[1,"url"],small:[1,"small"]},decls:3,vars:4,consts:[["qrcode",""],[1,"qr-container"],[1,"qrcode"]],template:function(e,n){e&1&&(Bt(0,"div",1),Me(1,"canvas",2,0),Qt()),e&2&&(Ve("small",n.small()),le(),Sl("transform",n.transform()))},styles:[`

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
}`]})};function Dh(s,t){if(s&1){let e=mn();Bt(0,"div",1),Se("click",function(i){fe(e);let r=xe();return pe(r.onOverlayClick(i))}),Bt(1,"div",2)(2,"button",3),Se("click",function(){fe(e);let i=xe();return pe(i.onClose())}),sn(),Bt(3,"svg",4),Me(4,"path",5),Qt()(),An(),Me(5,"iframe",6),Qt()()}if(s&2){let e=xe();le(5),li("src",e.iframeUrl(),bl)}}var js=class s{isOpen=rn(!1);itemId=rn(null);itemKey=rn(null);workspaceId=rn("");apiKey=rn("");adminKey=rn("");lang=rn("");close=Zo();metadataUpdated=Zo();iframeUrl=Zt(null);platform=ai(Vn);sanitizer=ai(El);pollInterval;lastMetadata=new Map;constructor(){Oi(()=>{let t=this.itemId(),e=this.itemKey(),n=this.workspaceId(),i=this.apiKey(),r=this.adminKey(),o=this.lang();if(t&&n){let a=r&&r!=="ADMIN_KEY_NOT_SET",l=e&&e!=="";if(!a&&!l){console.log("[SIDEBAR] No edit authorization (no admin_key or item_key), not loading iframe"),this.iframeUrl.set(null),this.stopPolling();return}let c=new URLSearchParams({workspace:n,"item-id":t,sidebar:"true"});a&&c.set("api_key",r),l&&c.set("key",e);let h=o?`${o}/`:"",u=window.location.host.startsWith("localhost")?`http://${window.location.host}/props?${c.toString()}`:`https://mapfutur.es/${h}props?${c.toString()}`,d=this.sanitizer.bypassSecurityTrustResourceUrl(u);this.iframeUrl.set(d),console.log("[SIDEBAR] Loading iframe with URL:",u),this.startPolling()}else this.iframeUrl.set(null),this.stopPolling()}),Oi(()=>{this.isOpen()||this.stopPolling()})}startPolling(){}stopPolling(){this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}checkMetadataUpdates(){return st(this,null,function*(){let t=this.itemId(),e=this.workspaceId(),n=this.adminKey();if(!(!t||!e||!n))try{let i=new URLSearchParams({workspace:e,api_key:n}),r=yield fetch(`https://api-qjzuw7ypfq-ez.a.run.app/items?${i.toString()}`);if(!r.ok){console.error("Failed to fetch items:",r.statusText);return}let a=(yield r.json()).find(l=>l._id===t);if(a){let l={favorable_future:a.favorable_future,plausibility:a.plausibility},c=this.lastMetadata.get(t);c&&(c.favorable_future!==l.favorable_future||c.plausibility!==l.plausibility)&&(console.log("[SIDEBAR] Metadata changed for item",t,l),this.metadataUpdated.emit({itemId:t,metadata:l})),this.lastMetadata.set(t,l)}}catch(i){console.error("Error checking metadata updates:",i)}})}onClose(){this.close.emit()}onOverlayClick(t){t.target===t.currentTarget&&this.onClose()}ngOnDestroy(){this.stopPolling()}static \u0275fac=function(e){return new(e||s)};static \u0275cmp=Ii({type:s,selectors:[["app-evaluation-sidebar"]],inputs:{isOpen:[1,"isOpen"],itemId:[1,"itemId"],itemKey:[1,"itemKey"],workspaceId:[1,"workspaceId"],apiKey:[1,"apiKey"],adminKey:[1,"adminKey"],lang:[1,"lang"]},outputs:{close:"close",metadataUpdated:"metadataUpdated"},decls:1,vars:1,consts:[[1,"sidebar-overlay"],[1,"sidebar-overlay",3,"click"],[1,"sidebar-container"],["title","Close (Esc)",1,"close-button",3,"click"],["viewBox","0 0 24 24",1,"close-icon"],["d","M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z","fill","currentColor"],["title","Item Evaluation","sandbox","allow-scripts allow-forms allow-popups allow-same-origin",1,"evaluation-iframe",3,"src"]],template:function(e,n){e&1&&on(0,Dh,6,1,"div",0),e&2&&Je(n.isOpen()&&n.iframeUrl()?0:-1)},styles:[`

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
}`]})};var Qs=class s{_metadata;_currentPosition;_targetPosition;_mesh=null;_animationState;_animationStartTime=0;_properties=new Map;constructor(t,e={x:0,y:0,z:0}){this._metadata=Ht({},t),this._currentPosition=Ht({},e),this._targetPosition=Ht({},e),this._animationState="spawning"}get id(){return this._metadata.id}get url(){return this._metadata.url}get metadata(){return Ht({},this._metadata)}get currentPosition(){return Ht({},this._currentPosition)}get targetPosition(){return Ht({},this._targetPosition)}get mesh(){return this._mesh}get animationState(){return this._animationState}get animationStartTime(){return this._animationStartTime}setCurrentPosition(t){this._currentPosition=Ht({},t)}setTargetPosition(t){this._targetPosition=Ht({},t)}setMesh(t){this._mesh=t}setAnimationState(t){this._animationState=t,this._animationStartTime=performance.now()}isAtTarget(t=.1){let e=this._currentPosition.x-this._targetPosition.x,n=this._currentPosition.y-this._targetPosition.y,i=this._currentPosition.z-this._targetPosition.z;return Math.sqrt(e*e+n*n+i*i)<=t}getAnimationProgress(t){let e=performance.now()-this._animationStartTime;return Math.min(1,Math.max(0,e/t))}lerpToTarget(t){let e=this._currentPosition,n=this._targetPosition;return{x:e.x+(n.x-e.x)*t,y:e.y+(n.y-e.y)*t,z:e.z+(n.z-e.z)*t}}setProperty(t,e){this._properties.set(t,e)}getProperty(t){return this._properties.get(t)}hasProperty(t){return this._properties.has(t)}removeProperty(t){return this._properties.delete(t)}updateMetadata(t){this._metadata=Ht(Ht({},this._metadata),t)}distanceTo(t){let e=this._currentPosition.x-t._currentPosition.x,n=this._currentPosition.y-t._currentPosition.y,i=this._currentPosition.z-t._currentPosition.z;return Math.sqrt(e*e+n*n+i*i)}clone(){let t=new s(this._metadata,this._currentPosition);return t._targetPosition=Ht({},this._targetPosition),t._animationState=this._animationState,t._animationStartTime=this._animationStartTime,t._mesh=this._mesh,this._properties.forEach((e,n)=>{t._properties.set(n,e)}),t}dispose(){this._mesh=null,this._properties.clear()}toString(){return`PhotoData(id: ${this.id}, pos: (${this._currentPosition.x.toFixed(1)}, ${this._currentPosition.y.toFixed(1)}, ${this._currentPosition.z.toFixed(1)}), state: ${this._animationState})`}};var Gn=class{isInitialized=!1;photos=[];initialize(t){return st(this,null,function*(){this.isInitialized=!0})}dispose(){return st(this,null,function*(){this.photos=[],this.isInitialized=!1})}addPhoto(t){this.photos.push(t)}removePhoto(t){let e=this.photos.findIndex(n=>n.id===t);return e>=0?(this.photos.splice(e,1),!0):!1}getPhotos(){return[...this.photos]}getPhoto(t){return this.photos.find(e=>e.id===t)}requiresFullRecalculationOnAdd(){return!1}calculateLayoutBounds(t,e,n){let i=t.filter(u=>u!==null);if(i.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let r=e*.5,o=n*.5,a=1/0,l=-1/0,c=1/0,h=-1/0;for(let u of i)a=Math.min(a,u.x-r),l=Math.max(l,u.x+r),c=Math.min(c,u.y-o),h=Math.max(h,u.y+o);return{minX:a,maxX:l,minY:c,maxY:h}}validateInitialized(){if(!this.isInitialized)throw new Error(`${this.getConfiguration().name} layout strategy is not initialized`)}};var zt={PHOTO_WIDTH:530,PHOTO_HEIGHT:1e3,SPACING_X:250,SPACING_Y:30,MAX_TEXTURE_DIMENSION:200,MAX_TEXTURE_DIMENSION_MOBILE:150};var tr=class s extends Gn{constructor(e,n="https://storage.googleapis.com/chronomaps3-eu",i={}){super();this.workspaceId=e;this.baseUrl=n;this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.photoWidth=i.photoWidth??zt.PHOTO_WIDTH,this.photoHeight=i.photoHeight??zt.PHOTO_HEIGHT,this.spacingX=i.spacingX??zt.SPACING_X,this.spacingY=i.spacingY??zt.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY}workspaceConfigUrl;tsneConfigUrl=null;tsneData=null;currentStateHash=null;currentSetId=null;isLoading=!1;loadPromise=null;photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;initialize(){return st(this,null,function*(){yield ri(s.prototype,this,"initialize").call(this),yield this.forceRefresh()})}getConfiguration(){return{name:"tsne",displayName:"TSNE Layout",description:"Positions photos using TSNE coordinates from a web service with proper spacing",supportsInteraction:!1,requiresWebService:!0,settings:{workspaceId:this.workspaceId,baseUrl:this.baseUrl,photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY}}}forceRefresh(){return st(this,null,function*(){this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData()})}fetchWorkspaceConfig(){return st(this,null,function*(){try{let e=yield fetch(this.workspaceConfigUrl);if(!e.ok)throw new Error(`Failed to fetch workspace config: ${e.status} ${e.statusText}`);let n=yield e.json();if(typeof n.set_id!="number")throw new Error("Invalid workspace config: missing or invalid set_id: "+n.set_id+" "+typeof n.set_id);if(!n.state_hash||typeof n.state_hash!="string")throw new Error("Invalid workspace config: missing or invalid state_hash: "+n.state_hash);return{set_id:n.set_id,state_hash:n.state_hash}}catch(e){throw console.error("Error fetching workspace configuration:",e),e}})}fetchTsneData(){return st(this,null,function*(){if(this.tsneData||this.isLoading)return this.loadPromise||Promise.resolve();this.isLoading=!0,this.loadPromise=this.doFetchTsneData();try{yield this.loadPromise}finally{this.isLoading=!1}})}doFetchTsneData(){return st(this,null,function*(){try{let e=yield this.fetchWorkspaceConfig();if(this.currentStateHash===e.state_hash&&this.tsneData)return;this.currentStateHash=e.state_hash,this.currentSetId=e.set_id,this.tsneConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/${e.set_id}/config.json`;let n=yield fetch(this.tsneConfigUrl);if(!n.ok)throw new Error(`Failed to fetch TSNE config: ${n.status} ${n.statusText}`);let i=yield n.json();this.tsneData=this.validateTsneConfig(i)}catch(e){throw console.error("Error fetching TSNE configuration:",e),e}})}validateTsneConfig(e){if(!e||typeof e!="object")throw new Error("Invalid TSNE config: not an object");if(!Array.isArray(e.dim)||e.dim.length!==2)throw new Error("Invalid TSNE config: dim must be an array of 2 numbers");if(!Array.isArray(e.grid))throw new Error("Invalid TSNE config: grid must be an array");for(let n=0;n<e.grid.length;n++){let i=e.grid[n];if(!i||typeof i!="object")throw new Error(`Invalid TSNE config: grid item ${n} is not an object`);if(!Array.isArray(i.pos)||i.pos.length!==2)throw new Error(`Invalid TSNE config: grid item ${n} pos must be an array of 2 numbers`);if(typeof i.id!="string")throw new Error(`Invalid TSNE config: grid item ${n} id must be a string`)}return{dim:e.dim,grid:e.grid,padding_ratio:e.padding_ratio||.5,conversion_ratio:e.conversion_ratio||[1,1],cell_ratios:e.cell_ratios||[1,1]}}getPositionForPhoto(e,n){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let i=this.tsneData.grid.find(o=>o.id===e.id);if(!i)return null;let r=this.convertTsneToWorldCoordinates(i.pos,this.tsneData.dim);return{x:r.x,y:r.y,gridKey:`tsne-${i.pos[0]}-${i.pos[1]}`,metadata:{tsnePosition:i.pos,originalMetadata:i.metadata}}})}calculateAllPositions(e){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n=[];for(let i of e){let r=yield this.getPositionForPhoto(i,e);n.push(r)}return n})}fetchLayoutData(e){return ml(this.getAllPositionsAsMap(e))}convertTsneToWorldCoordinates(e,n){let[i,r]=e,[o,a]=n,l=(o-1)*this.cellW/2,c=(a-1)*this.cellH/2,h=i*this.cellW-l,u=c-r*this.cellH;return{x:h,y:u}}getAllPositionsAsMap(e){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n={};for(let i of e){let r=yield this.getPositionForPhoto(i,e);n[i.id]=r}return n})}getLayoutBounds(){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)return{width:this.cellW*10,height:this.cellH*10};let[e,n]=this.tsneData.dim,i=e*this.cellW,r=n*this.cellH;return{width:i,height:r}})}setWorkspaceId(e){return st(this,null,function*(){this.workspaceId!==e&&(this.workspaceId=e,this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData())})}getWorkspaceId(){return this.workspaceId}getTsneInfo(){return this.tsneData?{workspaceId:this.workspaceId,gridSize:this.tsneData.dim,itemCount:this.tsneData.grid.length,workspaceConfigUrl:this.workspaceConfigUrl,tsneConfigUrl:this.tsneConfigUrl||"not set",setId:this.currentSetId||-1,stateHash:this.currentStateHash||"not set"}:null}};var er=class s extends Gn{svgElement=null;svgContainer=null;hotspots=[];photoPositions=new Map;draggedPhoto=null;isDragging=!1;hotspotPhotoCount=new Map;photoHotspotMap=new Map;photoSizes=new Map;batchPositionedPhotos=new Map;MAX_OVERLAP_PERCENT=10;PHOTO_WIDTH=120;PHOTO_HEIGHT=120;hotspotSlots=new Map;options={svgPath:"/showcase-bg.svg",centerX:0,centerY:0,circleRadius:2e4,radiusVariation:4e3,useProportionalLayout:!0,svgOffsetX:0,svgOffsetY:0,onHotspotDrop:()=>st(null,null,function*(){})};constructor(t){super(),t&&(this.options=Ht(Ht({},this.options),t))}calculateEvaluationRotationDeg(t){let e=t.metadata.plausibility,n=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future;if(typeof e!="number"||!isFinite(e)||!n||typeof n!="string")return 0;let r=(1-e/100)*32,o=n.toLowerCase().trim(),l=o==="favor"||o==="favorable"||o==="prefer"||o==="preferred"?r:-r;return isFinite(l)?l:0}calculateEvaluationScore(t){return this.calculateEvaluationRotationDeg(t)/32}getConfiguration(){return{name:"svg-background",displayName:"SVG Background",description:"Interactive layout with SVG background and proportional group-based circle slicing",supportsInteraction:!0,requiresWebService:!1,settings:{svgPath:this.options.svgPath,centerX:this.options.centerX,centerY:this.options.centerY,circleRadius:this.options.circleRadius,radiusVariation:this.options.radiusVariation,useProportionalLayout:this.options.useProportionalLayout}}}getSvgBounds(){return{minX:this.options.svgOffsetX-this.options.circleRadius,maxX:this.options.svgOffsetX+this.options.circleRadius,minY:this.options.svgOffsetY-this.options.circleRadius,maxY:this.options.svgOffsetY+this.options.circleRadius}}initialize(t){return st(this,null,function*(){yield ri(s.prototype,this,"initialize").call(this,t),t&&(this.options=Ht(Ht({},this.options),t)),yield this.loadSvgBackground(),this.extractHotspots()})}dispose(){return st(this,null,function*(){yield ri(s.prototype,this,"dispose").call(this),this.svgContainer&&this.svgContainer.parentNode&&this.svgContainer.parentNode.removeChild(this.svgContainer),this.svgContainer=null,this.svgElement=null,this.hotspots=[],this.photoPositions.clear(),this.draggedPhoto=null,this.isDragging=!1,this.hotspotPhotoCount.clear(),this.photoHotspotMap.clear(),this.photoSizes.clear()})}loadSvgBackground(){return st(this,null,function*(){if(!(typeof fetch>"u"||typeof document>"u"))try{let t=yield fetch(this.options.svgPath);if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);let e=yield t.text(),i=new DOMParser().parseFromString(e,"image/svg+xml");this.svgElement=i.documentElement}catch(t){throw console.error("\u274C Failed to load SVG background:",t),new Error(`Failed to load SVG background from ${this.options.svgPath}`)}})}extractHotspots(){if(!(typeof document>"u")){if(!this.svgElement){console.warn("SVG element not loaded, cannot extract hotspots");return}this.hotspots=[],this.svgContainer||(this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.visibility="hidden",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.top="-9999px",this.svgContainer.style.left="-9999px",document.body.appendChild(this.svgContainer)),this.svgContainer.appendChild(this.svgElement);try{this.svgElement.querySelectorAll('[id^="s-"]').forEach(e=>{let n=e,i=n.id,r=this.parseGroupIdMetadata(i);if(!r)return;let o=n.querySelector('[id^="hit"]');if(!o){console.warn(`No hit element found in group ${i}`);return}let a=Array.from(o.querySelectorAll("path")).find(h=>h.id.startsWith(r.transition_bar_position));if(!a){console.warn(`No path element found starting with '${r.transition_bar_position}' in hit element of group ${i}`);return}let l=a.getBBox();(l.width===0||l.height===0)&&console.error(`[SVG-HOTSPOT] ZERO-SIZE bbox at initialization for ${i}:`,{elementId:a.id,elementTag:a.tagName,bbox:{x:l.x,y:l.y,width:l.width,height:l.height},inDOM:document.contains(a),parentId:a.parentElement?.id,svg:this.svgElement?"exists":"null"});let c={id:o.id,bounds:{x:l.x,y:l.y,width:l.width,height:l.height},parentGroupId:i,transitionBarPosition:r.transition_bar_position,element:a};this.hotspots.push(c)})}catch(t){console.error("[HOTSPOT-EXTRACT] Error extracting hotspots:",t)}}}getPositionForPhoto(t,e,n){return st(this,null,function*(){let i=n?.enableAutoPositioning??!1;this.validateInitialized();let r=t.metadata.width||this.PHOTO_WIDTH,o=t.metadata.height||this.PHOTO_HEIGHT;this.photoSizes.set(t.id,{width:r,height:o});let a=this.photoPositions.get(t.id);if(a)return a;let l,c=t.metadata.layout_x,h=t.metadata.layout_y;if(typeof c=="number"&&typeof h=="number"){let{x:u,y:d}=this.normalizedToWorld(c,h);l={x:u,y:d,metadata:{layoutType:"restored-normalized",layout_x:c,layout_y:h,circleRadius:this.options.circleRadius}}}else if(i){let u=this.getAutoPositionFromMetadata(t);if(u){let d=u.auto_x*this.options.circleRadius+this.options.svgOffsetX,p=u.auto_y*this.options.circleRadius+this.options.svgOffsetY;l={x:d,y:p,metadata:{layoutType:"auto-positioned",auto_x:u.auto_x,auto_y:u.auto_y,circleRadius:this.options.circleRadius,svgOffsetX:this.options.svgOffsetX,svgOffsetY:this.options.svgOffsetY}}}else l=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition()}else l=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition();return this.photoPositions.set(t.id,l),l})}calculateAllPositions(t,e){return st(this,null,function*(){let n=e?.enableAutoPositioning??!1;this.validateInitialized(),this.hotspotPhotoCount.clear(),this.batchPositionedPhotos.clear();let i=new Map;for(let[o,a]of this.photoPositions.entries())(a.metadata?.layoutType==="free-dragged"||a.metadata?.layoutType==="dragging")&&i.set(o,a);this.photoPositions.clear();for(let[o,a]of i.entries())this.photoPositions.set(o,a);let r=[];for(let o of t){let a=yield this.getPositionForPhoto(o,t,{enableAutoPositioning:n});r.push(a)}return r})}generateRandomCircularPosition(){let t=Math.random()*2*Math.PI,e=(Math.random()-.5)*2*this.options.radiusVariation,n=this.options.circleRadius+e,i=this.options.centerX+Math.cos(t)*n,r=this.options.centerY+Math.sin(t)*n;return{x:i,y:r,metadata:{angle:t,radius:n,layoutType:"circular"}}}generateProportionalCircularPosition(t,e){let n=this.getPhotoGroupId(t),i=this.groupPhotosByGroupId(e),o=this.calculateGroupSlices(i).get(n);if(!o)return this.generateRandomCircularPosition();let a=i.get(n)||[],l=a.findIndex(I=>I.id===t.id),c=a.length,u=(o.endAngle-o.startAngle)*(1-.5),d=(o.startAngle+o.endAngle)/2,p;if(c===1)p=d;else{let I=u/c;p=d-u/2+(l+.5)*I}let g=this.hashCode(t.id)/2147483647,_=this.options.radiusVariation*.8,m=g*_,f=Math.min(c/10,.5),T=(l/c-.5)*f*this.options.radiusVariation*.3,w=this.options.circleRadius+m+T,x=this.options.centerX+Math.cos(p)*w*.75,C=this.options.centerY+Math.sin(p)*w;if(x<this.options.centerX){let I=this.options.centerX-x;x=this.options.centerX+I-.4*this.options.circleRadius}else x=x-this.options.circleRadius+.4*this.options.circleRadius;return{x,y:C,metadata:{angle:p,radius:w,groupId:n,groupSlice:o,photoIndex:l,totalInGroup:c,radiusVariation:m,packingVariation:T,layoutType:"proportional-circular"}}}getPhotoGroupId(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_svg_background_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_svg_background_group_id",n)),`random:${n}`}groupPhotosByGroupId(t){let e=new Map;for(let n of t){let i=this.getPhotoGroupId(n);e.has(i)||e.set(i,[]),e.get(i).push(n)}return e}calculateGroupSlices(t){let e=Array.from(t.values()).reduce((a,l)=>a+l.length,0),n=new Map;if(e===0)return n;let i=Array.from(t.entries()).sort(([a,l],[c,h])=>h.length!==l.length?h.length-l.length:a.localeCompare(c)),r=0,o=2*Math.PI;for(let[a,l]of i){let c=l.length,h=c/e,u=c/e*o,d=r+u;n.set(a,{startAngle:r,endAngle:d,size:c}),r=d}return n}hashCode(t){let e=0;if(t.length===0)return e;for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);e=(e<<5)-e+i,e=e&e}return e}getDropZones(){return this.hotspots.map(t=>({id:t.id,bounds:t.bounds,hotspot:t,acceptsPhoto:()=>!0,onPhotoDrop:e=>st(this,null,function*(){})}))}onPhotoDragStart(t,e){return this.draggedPhoto=t,this.isDragging=!0,!0}onPhotoDragMove(t,e){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return;let{layout_x:n,layout_y:i}=this.worldToNormalized(e.x,e.y),r={x:e.x,y:e.y,metadata:{layoutType:"dragging",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};this.photoPositions.set(t.id,r)}onPhotoDragEnd(t,e){return st(this,null,function*(){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return!1;if(this.isDragging=!1,this.draggedPhoto=null,this.isOutOfBounds(e))return this.photoPositions.delete(t.id),!1;let{layout_x:n,layout_y:i}=this.worldToNormalized(e.x,e.y),r={x:e.x,y:e.y,metadata:{layoutType:"free-dragged",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};return this.photoPositions.set(t.id,r),t.updateMetadata({layout_x:n,layout_y:i}),!0})}isOutOfBounds(t){let e=t.x-this.options.svgOffsetX,n=t.y-this.options.svgOffsetY;return Math.sqrt(e*e+n*n)>this.options.circleRadius}getSvgElement(){return this.svgElement}getHotspots(){return[...this.hotspots]}getPhotoPosition(t){return this.photoPositions.get(t)||null}setPhotoPosition(t,e){this.photoPositions.set(t,e)}getAutoPositionFromMetadata(t){let e=t.metadata,n=e.plausibility,i=this.normalizeFavorableFuture(e._svgZoneFavorableFuture||e.favorable_future),r=this.normalizeTransitionBar(e.transition_bar_position),o=this.normalizePlausibility(n);if(!r&&o!==null&&i&&(r="during"),o===null||!i||!r)return null;for(let a of this.hotspots){let l=a.parentGroupId;if(!l.startsWith("s-"))continue;let c=this.parseGroupIdMetadata(l);if(!c)continue;let h=this.normalizeFavorableFuture(c.favorable_future),u=this.normalizeTransitionBar(c.transition_bar_position),d=this.normalizePlausibility(c.plausibility);if(d!==null&&d===o&&h===i&&u===r){this.photoHotspotMap.set(t.id,a);let p=a.element?.id||"path",g=`${l}:${u}:${p}`,_=this.hotspotPhotoCount.get(g)||0;return this.hotspotPhotoCount.set(g,_+1),this.distributePhotoInHotspot(a,_)}}return null}distributePhotoInHotspot(t,e){let n=this.getSvgViewBox();if(!n)return console.warn("No SVG viewBox found, using default distribution"),{auto_x:0,auto_y:0};let i=this.getSlotsForHotspot(t,n);if(i.length===0){console.warn(`[AUTO-POS] No valid positions found in path for ${t.parentGroupId} (bounds=${t.bounds.width.toFixed(1)}x${t.bounds.height.toFixed(1)}), using center`);let d=t.bounds.x+t.bounds.width/2,p=t.bounds.y+t.bounds.height/2,g=(d-n.width/2)/(n.width/2),_=-((p-n.height/2)/(n.height/2));return{auto_x:g,auto_y:_}}let r=i,o=t.element?.id||"path",a=`${t.parentGroupId}:${t.transitionBarPosition}:${o}`;this.batchPositionedPhotos.has(a)||this.batchPositionedPhotos.set(a,[]);let l=this.batchPositionedPhotos.get(a),c=12,h=d=>l.some(p=>Math.sqrt(Math.pow(d.svgX-p.svgX,2)+Math.pow(d.svgY-p.svgY,2))<c),u={normalizedX:0,normalizedY:0,overlap:Number.POSITIVE_INFINITY,displacement:Number.POSITIVE_INFINITY,spacing:-1,svgX:0,svgY:0};for(let d=0;d<r.length;d++){let p=r[d];if(h(p))continue;let g=(p.svgX-n.width/2)/(n.width/2),_=-((p.svgY-n.height/2)/(n.height/2)),m=this.resolveOverlapByNudging(g,_,t,n),f=this.getMinDistanceToExistingPhotos(m.normalizedX,m.normalizedY,t),T=this.normalizedToSvg(m.normalizedX,m.normalizedY,n);if((m.overlap<u.overlap||m.overlap===u.overlap&&m.displacement<u.displacement||m.overlap===u.overlap&&m.displacement===u.displacement&&f>u.spacing)&&(u={normalizedX:m.normalizedX,normalizedY:m.normalizedY,overlap:m.overlap,displacement:m.displacement,spacing:f,svgX:T.svgX,svgY:T.svgY},u.overlap===0&&u.displacement<=Math.max(2,Math.min(n.width,n.height)*.01)))break}if(!isFinite(u.overlap)){let d=l.length%r.length,p=r[d],g=(p.svgX-n.width/2)/(n.width/2),_=-((p.svgY-n.height/2)/(n.height/2)),m=this.resolveOverlapByNudging(g,_,t,n),f=this.normalizedToSvg(m.normalizedX,m.normalizedY,n);u={normalizedX:m.normalizedX,normalizedY:m.normalizedY,overlap:m.overlap,displacement:m.displacement,spacing:this.getMinDistanceToExistingPhotos(m.normalizedX,m.normalizedY,t),svgX:f.svgX,svgY:f.svgY}}return l.push({svgX:u.svgX,svgY:u.svgY}),{auto_x:u.normalizedX,auto_y:u.normalizedY}}isPointInHotspot(t,e,n){try{let i=t.bounds;if(!i||i.width===0||i.height===0||!(e>=i.x&&e<=i.x+i.width&&n>=i.y&&n<=i.y+i.height))return!1;let o=t.element;if(o&&typeof o.isPointInFill=="function"){let a=(o.ownerSVGElement||this.svgElement)?.createSVGPoint();if(a)return a.x=e,a.y=n,o.isPointInFill(a)}return!0}catch(i){return console.error("[PATH-CHECK] Error checking point with bounds:",i),!1}}getPositionForRejectedPhoto(t,e){if(!this.svgElement)return null;let n=this.getSvgViewBox();if(!n)return null;let i=Math.min(n.width,n.height)*.2,r=-n.width/2+i/2,o=n.height/2-i/2,a=[];for(let u of e)if(u.metadata._private_moderation===0){let p=this.photoPositions.get(u.id);if(p){let g=this.photoSizes.get(u.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},_=Math.max(g.width,g.height)/2;a.push({x:p.x,y:p.y,radius:_})}}let l=this.photoSizes.get(t.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},c=Math.max(l.width,l.height)/2,h;return a.length===0?h={x:r,y:o}:h=this.findCirclePackPosition(c,a,r,o,i/2),{x:h.x,y:h.y,metadata:{layoutType:"rejected-packed",circleRadius:this.options.circleRadius,isRejected:!0}}}getMinDistanceToExistingPhotos(t,e,n){let i=this.options.circleRadius,r=t*i,o=e*i,a=Number.MAX_VALUE;for(let[l,c]of this.photoHotspotMap.entries())if(c.parentGroupId===n.parentGroupId){let h=this.photoPositions.get(l);if(h){let u=h.x,d=h.y,p=Math.sqrt(Math.pow(r-u,2)+Math.pow(o-d,2));a=Math.min(a,p)}}return a}getPhotoSizeInSvg(t){let e=this.PHOTO_WIDTH/this.options.circleRadius*(t.width/2),n=this.PHOTO_HEIGHT/this.options.circleRadius*(t.height/2);return{w:e,h:n}}seededShuffle(t,e){let n=e>>>0,i=()=>(n=n*1664525+1013904223>>>0,n/4294967296),r=t.slice();for(let o=r.length-1;o>0;o--){let a=Math.floor(i()*(o+1));[r[o],r[a]]=[r[a],r[o]]}return r}getSlotsForHotspot(t,e){let n=t.element?.id||"path",i=`${t.parentGroupId}:${t.transitionBarPosition}:${n}`,r=this.hotspotSlots.get(i);if(r&&r.length>0)return r;let o=Math.min(t.bounds.width,t.bounds.height)*.02,a=15,l=15,c=[],h=0;for(let p=t.bounds.y+o;p<=t.bounds.y+t.bounds.height-o;p+=l){let g=h%2===1?a*.5:0;for(let _=t.bounds.x+o+g;_<=t.bounds.x+t.bounds.width-o;_+=a)this.isPointInHotspot(t,_,p)&&c.push({svgX:_,svgY:p});h++}let u=Math.abs(this.hashCode(i)),d=this.seededShuffle(c,u);return this.hotspotSlots.set(i,d),d}overlapsHeaderElement(t,e,n){if(typeof document>"u"||!this.svgElement)return!1;let i=this.PHOTO_WIDTH/this.options.circleRadius*(n.width/2),r=this.PHOTO_HEIGHT/this.options.circleRadius*(n.height/2),o=t-i/2,a=t+i/2,l=e-r/2,c=e+r/2,h=Array.from(this.svgElement.querySelectorAll('[id^="header"]'));for(let u of h)if(u instanceof SVGGraphicsElement)try{let d=u.getBBox(),p=15;if(!(a<d.x-p||o>d.x+d.width+p||c<d.y-p||l>d.y+d.height+p))return!0;let _=u.querySelectorAll("*");for(let m of _)if(m instanceof SVGGraphicsElement)try{let f=m.getBBox();if(!(a<f.x-p||o>f.x+f.width+p||c<f.y-p||l>f.y+f.height+p))return!0}catch{continue}}catch{continue}return!1}normalizedToSvg(t,e,n){let i=n.width/2+t*(n.width/2),r=n.height/2-e*(n.height/2);return{svgX:i,svgY:r}}resolveOverlapByNudging(t,e,n,i){let r=this.calculateOverlapWithExistingPhotos(t,e,n);if(r===0)return{normalizedX:t,normalizedY:e,overlap:0,displacement:0};let o=this.normalizedToSvg(t,e,i),a=Math.max(Math.min(i.width,i.height)*.01,2),l=Math.min(i.width,i.height)*.2,c={normalizedX:t,normalizedY:e,overlap:r,displacement:0};for(let h=a;h<=l;h+=a)for(let d=0;d<16;d++){let p=d/16*2*Math.PI,g=o.svgX+Math.cos(p)*h,_=o.svgY+Math.sin(p)*h;if(!this.isPointInHotspot(n,g,_)||this.overlapsHeaderElement(g,_,i))continue;let m=(g-i.width/2)/(i.width/2),f=-((_-i.height/2)/(i.height/2)),T=this.calculateOverlapWithExistingPhotos(m,f,n);if(T===0)return{normalizedX:m,normalizedY:f,overlap:0,displacement:h};(T<c.overlap||T===c.overlap&&h<c.displacement)&&(c={normalizedX:m,normalizedY:f,overlap:T,displacement:h})}return c}findCirclePackPosition(t,e,n,i,r){let a={x:n,y:i},l=1/0;for(let c of e){let h=[0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI,Math.PI*5/4,Math.PI*3/2,Math.PI*7/4];for(let u of h){let d=c.radius+t+50,p=c.x+Math.cos(u)*d,g=c.y+Math.sin(u)*d;if(!e.some(m=>{let f=p-m.x,T=g-m.y;return Math.sqrt(f*f+T*T)<t+m.radius+50})){let m=Math.sqrt(Math.pow(p-n,2)+Math.pow(g-i,2));m<r&&m<l&&(l=m,a={x:p,y:g})}}}return a}calculateOverlapWithExistingPhotos(t,e,n){let i=[];for(let[a,l]of this.photoPositions.entries())if(this.photoHotspotMap.get(a)===n){let c=this.photoSizes.get(a)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT};i.push({x:l.x,y:l.y,width:c.width,height:c.height})}if(i.length===0)return 0;let r={width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},o=0;for(let a=0;a<i.length;a++){let l=i[a],c=this.calculateRectangleOverlapPercent(t*this.options.circleRadius,e*this.options.circleRadius,r.width,r.height,l.x,l.y,l.width,l.height);o=Math.max(o,c)}return o}calculateRectangleOverlapPercent(t,e,n,i,r,o,a,l){let c=t-n/2,h=t+n/2,u=e-i/2,d=e+i/2,p=r-a/2,g=r+a/2,_=o-l/2,m=o+l/2,f=Math.max(c,p),T=Math.min(h,g),w=Math.max(u,_),x=Math.min(d,m);if(T<=f||x<=w)return 0;let C=T-f,I=x-w,P=C*I,L=n*i;return P/L*100}worldToNormalized(t,e){return{layout_x:Math.max(-1,Math.min(1,(t-(this.options.svgOffsetX||0))/this.options.circleRadius)),layout_y:Math.max(-1,Math.min(1,(e-(this.options.svgOffsetY||0))/this.options.circleRadius))}}normalizedToWorld(t,e){return{x:t*this.options.circleRadius+(this.options.svgOffsetX||0),y:e*this.options.circleRadius+(this.options.svgOffsetY||0)}}parseGroupIdMetadata(t){try{let n=t.substring(2).split(","),i,r,o;for(let a of n){let[l,c]=a.split("=");l==="plausibility"?i=parseInt(c,10):l==="favorable_future"?r=c:l==="transition_bar_position"&&(o=c)}if(i!==void 0&&r!==void 0&&o!==void 0)return{plausibility:i,favorable_future:r,transition_bar_position:o}}catch(e){console.warn(`Failed to parse group ID metadata: ${t}`,e)}return null}normalizeFavorableFuture(t){if(!t)return"";let e=t.toLowerCase().trim();return e.includes("prevent")?"prevent":e.includes("prefer")?"prefer":e.includes("uncertain")?"uncertain":e}normalizeTransitionBar(t){if(!t)return"";let e=t.toLowerCase().trim();return e.startsWith("bef")?"before":e.startsWith("dur")?"during":e.startsWith("aft")||e.startsWith("acher")?"after":e.includes("unclear")?"during":e}normalizePlausibility(t){if(t==null)return null;let e=typeof t=="number"?t:parseFloat(String(t));if(Number.isNaN(e))return null;let n=[0,25,50,75,100],i=n[0],r=Math.abs(e-n[0]);for(let o=1;o<n.length;o++){let a=Math.abs(e-n[o]);a<r&&(r=a,i=n[o])}return i}getSvgViewBox(){if(typeof document>"u"||!this.svgElement)return null;let t=this.svgElement.getAttribute("viewBox");if(!t){let n=parseFloat(this.svgElement.getAttribute("width")||"800"),i=parseFloat(this.svgElement.getAttribute("height")||"800");return{x:0,y:0,width:n,height:i}}let e=t.split(/\s+/);return e.length===4?{x:parseFloat(e[0]),y:parseFloat(e[1]),width:parseFloat(e[2]),height:parseFloat(e[3])}:null}updatePhotoAfterHotspotDrop(t,e,n){let{layout_x:i,layout_y:r}=this.worldToNormalized(e.x,e.y),o={x:e.x,y:e.y,metadata:{layoutType:"hotspot-drop",layout_x:i,layout_y:r,circleRadius:this.options.circleRadius,hotspotData:n}};this.photoPositions.set(t,o)}};var Li=class s extends Gn{photoWidth;photoHeight;spacingX;spacingY;photoRadius;groupBuffer;photoBuffer;useFanLayout;photoGroups=new Map;groupPositions=new Map;constructor(t={}){super(),this.photoWidth=t.photoWidth??zt.PHOTO_WIDTH,this.photoHeight=t.photoHeight??zt.PHOTO_HEIGHT,this.spacingX=t.spacingX??zt.SPACING_X,this.spacingY=t.spacingY??zt.SPACING_Y,this.groupBuffer=t.groupBuffer??2e3,this.photoBuffer=t.photoBuffer??50,this.useFanLayout=t.useFanLayout??!0,this.photoRadius=Math.sqrt(this.photoWidth**2+this.photoHeight**2)/2+this.photoBuffer}calculateEvaluationScore(t){let e=t.metadata.plausibility,n=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future;if(typeof e!="number"||!isFinite(e)||!n||typeof n!="string")return 0;let i=e/100,r=n.toLowerCase().trim(),o=r==="favor"||r==="favorable"||r==="prefer"||r==="preferred",a=1-i,l=o?a:-a;return isFinite(l)?l:0}getConfiguration(){return{name:"circle-packing",displayName:"Circle Packing Layout",description:"Groups photos by author in hierarchical circle packing arrangement",supportsInteraction:!1,requiresWebService:!1,settings:{photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY,groupBuffer:this.groupBuffer,photoBuffer:this.photoBuffer}}}addPhoto(t){let e=this.getGroupId(t);this.photoGroups.has(e)||this.photoGroups.set(e,[]),this.photoGroups.get(e).push(t),this.recalculateLayout()}removePhoto(t){for(let[e,n]of this.photoGroups.entries()){let i=n.findIndex(r=>r.id===t);if(i!==-1)return n.splice(i,1),n.length===0&&this.photoGroups.delete(e),this.recalculateLayout(),!0}return!1}getPositionForPhoto(t,e){return st(this,null,function*(){return this.regroupAllPhotos(e),this.getPositionForPhotoOptimized(t)})}getPositionForPhotoOptimized(t){return st(this,null,function*(){let e=this.getGroupId(t),n=this.groupPositions.get(e);if(!n)return console.warn(`No group position found for photo ${t.id} in group ${e}`),null;let i=this.photoGroups.get(e)||[],r=i.findIndex(E=>E.id===t.id);if(r===-1)return console.warn(`Photo ${t.id} not found in group ${e}`),null;if(!this.useFanLayout){let W=this.packPhotosInGroup(i)[r]||{x:0,y:0};return{x:n.x+W.x,y:n.y+W.y,metadata:{groupId:e,groupSize:i.length,photoIndex:r,groupPosition:{x:n.x,y:n.y,radius:n.radius},circlePackKey:`circle-pack-${e}-${r}`,renderOrder:r}}}let o=i.length,a=8,l=32,h=Math.min(o/10,1),u=a+(l-a)*h,d=t.metadata.plausibility,p=t.metadata._svgZoneFavorableFuture||t.metadata.favorable_future,g=0;if(typeof d=="number"&&isFinite(d)&&p&&typeof p=="string"){let W=(1-d/100)*32,k=p.toLowerCase().trim();g=k==="favor"||k==="favorable"||k==="prefer"||k==="preferred"?W:-W}isFinite(g)||(g=0);let m=this.photoWidth*.75,T=-((o-1)*m)/2,w=n.x+T+r*m,x=g*Math.PI/180,C=Math.abs(g)/32,I=-C*C*200,P=n.y+I,L=(32-g)*1.5625,b=r*.01,M=Math.round((L+b)*10)/10;return!isFinite(w)||!isFinite(P)?{x:0,y:0,metadata:{groupId:e,groupSize:i.length,photoIndex:r,groupPosition:{x:n.x,y:n.y,radius:n.radius},circlePackKey:`circle-pack-${e}-${r}`,renderOrder:M}}:{x:w,y:P,metadata:{groupId:e,groupSize:i.length,photoIndex:r,groupPosition:{x:n.x,y:n.y,radius:n.radius},circlePackKey:`circle-pack-${e}-${r}`,renderOrder:M}}})}calculateAllPositions(t){return st(this,null,function*(){this.photoGroups.clear();for(let n of t){let i=this.getGroupId(n);this.photoGroups.has(i)||this.photoGroups.set(i,[]),this.photoGroups.get(i).push(n)}for(let n of this.photoGroups.values())n.sort((i,r)=>{let o=this.calculateEvaluationScore(i);return this.calculateEvaluationScore(r)-o});this.recalculateLayout();let e=[];for(let n of t){let i=yield this.getPositionForPhotoOptimized(n);e.push(i)}return e})}getGroupId(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_circle_pack_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_circle_pack_group_id",n)),`random:${n}`}regroupAllPhotos(t){this.photoGroups.clear();for(let e of t){let n=this.getGroupId(e);this.photoGroups.has(n)||this.photoGroups.set(n,[]),this.photoGroups.get(n).push(e)}for(let[e,n]of this.photoGroups.entries())n.sort((i,r)=>{let o=this.calculateEvaluationScore(i);return this.calculateEvaluationScore(r)-o});this.recalculateLayout()}recalculateLayout(){let e=Array.from(this.photoGroups.entries()).sort(([i,r],[o,a])=>a.length!==r.length?a.length-r.length:i.localeCompare(o)).map(([i,r])=>{let o=this.calculateGroupRadius(r.length);return{id:i,radius:o,x:0,y:0}}),n=this.packCircles(e,this.groupBuffer);this.groupPositions.clear();for(let i of n){if(!isFinite(i.x)||!isFinite(i.y)||!isFinite(i.radius)){this.groupPositions.set(i.id,{x:0,y:0,radius:i.radius||1e3});continue}this.groupPositions.set(i.id,{x:i.x,y:i.y,radius:i.radius})}}calculateGroupRadius(t){if(t===1)return this.photoRadius+this.photoBuffer;let e=t*Math.PI*this.photoRadius*this.photoRadius,n=Math.sqrt(e/Math.PI)+this.photoRadius+this.photoBuffer;return Math.max(n,this.photoRadius*2)}packPhotosInGroup(t){if(t.length===0)return[];if(t.length===1)return[{x:0,y:0}];let e=t.map((i,r)=>({id:i.id,radius:this.photoRadius,x:0,y:0}));return this.packCircles(e,this.photoBuffer).map(i=>({x:i.x,y:i.y}))}packCircles(t,e=0){if(t.length===0)return[];let n=[];n.push(Ke(Ht({},t[0]),{x:0,y:0}));for(let i=1;i<t.length;i++){let r=t[i],o=this.findBestPosition(r,n,e);n.push(Ke(Ht({},r),{x:o.x,y:o.y}))}return n}findBestPosition(t,e,n){if(!isFinite(t.radius)||!isFinite(n))return{x:0,y:0};if(e.length===0)return{x:0,y:0};let i=null,r=1/0;for(let o of e){let a=[0,Math.PI*5/7,Math.PI*10/7,Math.PI*1/7,Math.PI*6/7,Math.PI*11/7,Math.PI*2/7,Math.PI*7/7,Math.PI*12/7,Math.PI*3/7,Math.PI*8/7,Math.PI*13/7,Math.PI*4/7,Math.PI*9/7];for(let l of a){let c=o.radius+t.radius+n,h=o.x+Math.cos(l)*c,u=o.y+Math.sin(l)*c;if(!e.some(p=>{let g=h-p.x,_=u-p.y,m=t.radius+p.radius+n;return Math.sqrt(g*g+_*_)<m})){let p=Math.sqrt(h*h+u*u);p<r&&(r=p,i={x:h,y:u})}}}if(i===null){let o=e.length*2.3999632297286535%(2*Math.PI),a=(e.length+1)*(t.radius+n)*1.5;i={x:Math.cos(o)*a,y:Math.sin(o)*a}}return i}getLayoutBounds(){return st(this,null,function*(){if(this.groupPositions.size===0)return{width:this.photoWidth*2,height:this.photoHeight*2};let t=1/0,e=-1/0,n=1/0,i=-1/0;for(let r of this.groupPositions.values()){let o=r.x-r.radius,a=r.x+r.radius,l=r.y-r.radius,c=r.y+r.radius;t=Math.min(t,o),e=Math.max(e,a),n=Math.min(n,l),i=Math.max(i,c)}return{width:e-t+this.groupBuffer*2,height:i-n+this.groupBuffer*2}})}dispose(){return st(this,null,function*(){for(let t of this.photoGroups.values())for(let e of t)e.setProperty("_circle_pack_group_id",void 0);this.photoGroups.clear(),this.groupPositions.clear(),yield ri(s.prototype,this,"dispose").call(this)})}requiresFullRecalculationOnAdd(){return!0}getPackingInfo(){let t=Array.from(this.photoGroups.entries()).map(([e,n])=>({groupId:e,photoCount:n.length,position:this.groupPositions.get(e)||{x:0,y:0,radius:0}}));return{totalGroups:this.photoGroups.size,totalPhotos:Array.from(this.photoGroups.values()).reduce((e,n)=>e+n.length,0),groups:t}}};var ue={LAYOUT_TRANSITION_DURATION:.8,LAYOUT_STAGGER_DELAY:.02,NEW_PHOTO_ANIMATION_DURATION:3,SHOWCASE_FORWARD_DURATION:.6,SHOWCASE_RETURN_DURATION:.6,NEW_PHOTO_ANIMATION_DELAY:5e3,SHOWCASE_INTERVAL:500,MAX_NEW_PHOTO_DELAY:1500,MAX_SHOWCASE_DURATION:5e3,CAMERA_BOUNDS_UPDATE_DEBOUNCE:100,GRID_SPIRAL_ANIMATION_DURATION:1100,NEW_PHOTO_STAGGER_DELAY:6500,API_POLLING_INTERVAL:3e4,QR_SHRINK_DELAY:1e4,INITIAL_POLLING_DELAY:1e3,OPACITY_FADE_DURATION:.4,INVISIBLE_POSITION_TRANSITION_DURATION:.6,CAMERA_BOUNDS_ANIMATION_DURATION:3};var nr=class s{photos=new Map;layoutStrategy=null;renderer=null;enableRandomShowcase=!1;enableSvgAutoPositioning=!1;isDragEnabled=!0;svgVisible=!1;svgStrategy=null;showcaseInterval=ue.SHOWCASE_INTERVAL;newPhotoAnimationDelay=ue.NEW_PHOTO_ANIMATION_DELAY;showcaseTimer=null;isShowcasing=!1;photoQueue=[];photoAddedSubject=new oi;photoRemovedSubject=new oi;layoutChangedSubject=new oi;photoAdded$=this.photoAddedSubject.asObservable();photoRemoved$=this.photoRemovedSubject.asObservable();layoutChanged$=this.layoutChangedSubject.asObservable();constructor(){}initialize(i,r){return st(this,arguments,function*(t,e,n={}){this.layoutStrategy=t,this.renderer=e,this.enableRandomShowcase=n.enableRandomShowcase??!1,this.showcaseInterval=n.showcaseInterval??ue.SHOWCASE_INTERVAL,this.newPhotoAnimationDelay=n.newPhotoAnimationDelay??ue.NEW_PHOTO_ANIMATION_DELAY,yield this.layoutStrategy.initialize(),this.updateShowcaseLoop()})}addPhoto(t){return st(this,null,function*(){if(this.photos.has(t.id))return this.photos.get(t.id);if(!this.layoutStrategy||!this.renderer)throw new Error("Repository not initialized");let e=new Qs(t,{x:0,y:0,z:0});this.photos.set(t.id,e),this.layoutStrategy.addPhoto(e);let n=!1;if(this.layoutStrategy.requiresFullRecalculationOnAdd()){let r=Array.from(this.photos.values()),o=yield this.layoutStrategy.calculateAllPositions(r);r.forEach((l,c)=>{let h=this.getDragPositionOverride(l);h&&(o[c]=h)});let a=[];r.forEach((l,c)=>{let h=o[c];if(h&&h.x!==void 0&&h.y!==void 0){let u={x:h.x,y:h.y,z:0};if(l.setProperty("opacity",1),l.setTargetPosition(u),l.mesh&&l.id!==e.id){let d=l.currentPosition,p=l.getProperty("opacity")||1;a.push(this.animateToPositionWithOpacityUpdate(l,d,u,p,1,ue.LAYOUT_TRANSITION_DURATION))}h.metadata&&l.updateMetadata(h.metadata),h.gridKey&&l.setProperty("gridKey",h.gridKey),l.id===e.id&&(n=!0)}else{let u={x:0,y:0,z:0};if(l.setProperty("opacity",0),l.setTargetPosition(u),l.mesh&&l.id!==e.id){let d=l.currentPosition,p=l.getProperty("opacity")||1;a.push(this.animateToPositionWithOpacityUpdate(l,d,u,p,0,ue.LAYOUT_TRANSITION_DURATION))}}}),a.length>0&&(yield Promise.all(a))}else{let r=this.getDragPositionOverride(e);r||(r=yield this.layoutStrategy.getPositionForPhoto(e,Array.from(this.photos.values()))),n=!!(r&&r.x!==void 0&&r.y!==void 0),n&&r?(e.setProperty("opacity",1),e.setTargetPosition({x:r.x,y:r.y,z:0}),r.metadata&&e.updateMetadata(r.metadata),r.gridKey&&e.setProperty("gridKey",r.gridKey)):(e.setProperty("opacity",0),e.setTargetPosition({x:0,y:0,z:0}))}let i=yield this.renderer.createPhotoMesh(e);return e.setMesh(i),this.renderer.setMeshPhotoId(i,e.id),this.setupHoverDetectionForPhoto(e),this.svgVisible&&this.setupDragForPhoto(e),n?(e.setCurrentPosition(e.targetPosition),this.renderer.updateMeshPosition(i,e.targetPosition),e.setAnimationState("positioned"),i.material&&"opacity"in i.material&&(i.material.opacity=e.getProperty("opacity")??1,i.material.transparent=!0)):i.material&&"opacity"in i.material&&(i.material.opacity=0,i.material.transparent=!0),n&&this.photoQueue.push(t.id),n&&this.updateCamera(),this.photoAddedSubject.next(e),e})}removePhoto(t){let e=this.photos.get(t);return e?(e.mesh&&this.renderer&&this.renderer.removeMesh(e.mesh),this.layoutStrategy&&this.layoutStrategy.removePhoto(t),e.dispose(),this.photos.delete(t),this.updateCamera(),this.photoRemovedSubject.next(t),!0):!1}getPhoto(t){return this.photos.get(t)}getAllPhotos(){return Array.from(this.photos.values())}getPhotoById(t){return this.photos.get(t)}getLayoutStrategy(){return this.layoutStrategy}getVisiblePhotos(){return this.getAllPhotos().filter(t=>(t.getProperty("opacity")??1)>0)}setLayoutStrategy(t){return st(this,null,function*(){if(!this.layoutStrategy||!this.renderer)throw new Error("PhotoDataRepository not initialized");let e=this.layoutStrategy.getConfiguration().name,n=t.getConfiguration().name;yield t.initialize();let i=Array.from(this.photos.values());for(let l of i)t.addPhoto(l);let r=yield t.calculateAllPositions(i,{enableAutoPositioning:this.enableSvgAutoPositioning});i.forEach((l,c)=>{let h=this.getDragPositionOverride(l);h&&(r[c]=h)}),this.layoutStrategy=t,i.forEach((l,c)=>{let h=r[c];h!==null?(l.setProperty("opacity",1),l.setTargetPosition({x:h.x,y:h.y,z:l.targetPosition.z}),h.metadata&&l.updateMetadata(h.metadata),h.gridKey&&l.setProperty("gridKey",h.gridKey)):n==="svg-background"?l.setProperty("opacity",1):(l.setProperty("opacity",0),l.setTargetPosition({x:0,y:0,z:0}))});let o=i.map((l,c)=>st(this,null,function*(){let u=r[c]!==null,d=c*ue.LAYOUT_STAGGER_DELAY;d>0&&(yield new Promise(g=>setTimeout(g,d*1e3)));let p=l.mesh?.material&&"opacity"in l.mesh.material?l.mesh.material.opacity:1;if(u){if(l.mesh){let g={x:l.mesh.position.x,y:l.mesh.position.y,z:l.mesh.position.z};return this.animateToPositionWithOpacityUpdate(l,g,l.targetPosition,p,1,ue.LAYOUT_TRANSITION_DURATION)}}else{if(n==="svg-background")return Promise.resolve();if(l.mesh){let g={x:l.mesh.position.x,y:l.mesh.position.y,z:l.mesh.position.z};return this.animateToPositionWithOpacityUpdate(l,g,{x:0,y:0,z:0},p,0,ue.INVISIBLE_POSITION_TRANSITION_DURATION)}}})),a=this.updateCamera({animate:!0,force:!0});if(yield Promise.all([Promise.all(o.filter(Boolean)),a]),this.svgVisible)for(let l of i)l.mesh&&(this.renderer.setMeshPhotoId(l.mesh,l.id),this.setupDragForPhoto(l));else this.renderer.disableAllDragging();this.layoutChangedSubject.next()})}setRandomShowcaseEnabled(t){this.enableRandomShowcase=t,this.updateShowcaseLoop()}setSvgAutoPositioningEnabled(t){this.enableSvgAutoPositioning=t}setDragEnabled(t){this.isDragEnabled=t}setSvgVisible(t,e){this.svgVisible=t,this.svgStrategy=t&&e?e:null}refreshLayout(){return st(this,null,function*(){if(!this.layoutStrategy){console.warn("Layout strategy not initialized");return}let t=Array.from(this.photos.values()),e=yield this.layoutStrategy.calculateAllPositions(t,{enableAutoPositioning:this.enableSvgAutoPositioning});t.forEach((r,o)=>{let a=this.getDragPositionOverride(r);a&&(e[o]=a)}),t.forEach((r,o)=>{let a=e[o];a!==null?(r.setProperty("opacity",1),r.setTargetPosition({x:a.x,y:a.y,z:r.targetPosition.z}),a.metadata&&r.updateMetadata(a.metadata),a.gridKey&&r.setProperty("gridKey",a.gridKey)):(r.setProperty("opacity",0),r.setTargetPosition({x:0,y:0,z:0}))});let n=t.map((r,o)=>st(this,null,function*(){let a=e[o],l=o*ue.LAYOUT_STAGGER_DELAY;l>0&&(yield new Promise(u=>setTimeout(u,l*1e3)));let c=a!==null,h=r.mesh?.material&&"opacity"in r.mesh.material?r.mesh.material.opacity:1;if(c){if(r.mesh){let u={x:r.mesh.position.x,y:r.mesh.position.y,z:r.mesh.position.z};return this.animateToPositionWithOpacityUpdate(r,u,r.targetPosition,h,1,ue.LAYOUT_TRANSITION_DURATION)}}else if(r.mesh){let u={x:r.mesh.position.x,y:r.mesh.position.y,z:r.mesh.position.z};return this.animateToPositionWithOpacityUpdate(r,u,{x:0,y:0,z:0},h,0,ue.INVISIBLE_POSITION_TRANSITION_DURATION)}})),i=this.updateCamera({animate:!0,force:!0});yield Promise.all([Promise.all(n.filter(Boolean)),i]),this.layoutChangedSubject.next()})}isRandomShowcaseEnabled(){return this.enableRandomShowcase}getQueueLength(){return this.photoQueue.length}clearQueue(){this.photoQueue=[]}getQueue(){return[...this.photoQueue]}showcasePhoto(t){return st(this,null,function*(){let e=this.photos.get(t);if(!(!e||!e.mesh||!this.renderer)&&!this.isShowcasing){this.isShowcasing=!0;try{yield this.renderer.upgradeToHighResTexture(e.mesh,e.url);let n=e.currentPosition.z,r={x:0,y:0,z:this.renderer.getCameraSpawnZ()-100},o={x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z};yield this.animateToPositionWithUpdate(e,o,r,ue.SHOWCASE_FORWARD_DURATION),yield new Promise(c=>setTimeout(c,Math.min(this.newPhotoAnimationDelay,ue.MAX_SHOWCASE_DURATION)));let a=Ke(Ht({},e.targetPosition),{z:n}),l={x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z};yield this.animateToPositionWithUpdate(e,l,a,ue.SHOWCASE_RETURN_DURATION),e.setAnimationState("positioned"),yield this.renderer.downgradeToLowResTexture(e.mesh,e.url)}finally{this.isShowcasing=!1}}})}get photoAdded(){return this.photoAdded$}get photoRemoved(){return this.photoRemoved$}get layoutChanged(){return this.layoutChanged$}dispose(){this.showcaseTimer&&(clearTimeout(this.showcaseTimer),this.showcaseTimer=null),this.photos.forEach(t=>{t.mesh&&this.renderer&&this.renderer.removeMesh(t.mesh),t.dispose()}),this.photos.clear(),this.layoutStrategy&&this.layoutStrategy.dispose(),this.photoAddedSubject.complete(),this.photoRemovedSubject.complete(),this.layoutChangedSubject.complete()}animateNewPhoto(t){return st(this,null,function*(){if(!t.mesh||!this.renderer)return;t.setAnimationState("spawning");let n={x:0,y:0,z:this.renderer.getCameraSpawnZ()-100};t.setCurrentPosition(n),this.renderer.updateMeshPosition(t.mesh,n),yield new Promise(i=>setTimeout(i,Math.min(this.newPhotoAnimationDelay,ue.NEW_PHOTO_ANIMATION_DELAY))),t.setAnimationState("floating_back"),yield this.animateToPositionWithOpacityUpdate(t,n,t.targetPosition,0,1,ue.NEW_PHOTO_ANIMATION_DURATION),t.setAnimationState("positioned"),yield this.updateCamera({animate:!0})})}updateShowcaseLoop(){this.showcaseTimer&&(clearTimeout(this.showcaseTimer),this.showcaseTimer=null),this.enableRandomShowcase&&this.scheduleRandomShowcase()}scheduleRandomShowcase(){this.enableRandomShowcase&&(this.showcaseTimer=setTimeout(()=>st(this,null,function*(){if(this.isShowcasing){this.scheduleRandomShowcase();return}let t;if(this.photoQueue.length>0)t=this.photoQueue.shift();else{let e=this.getVisiblePhotos();e.length>0&&(t=e[Math.floor(Math.random()*e.length)].id)}t&&(yield this.showcasePhoto(t)),this.scheduleRandomShowcase()}),this.showcaseInterval))}computeSceneBounds(){let e=this.getVisiblePhotos().map(i=>({x:i.targetPosition.x,y:i.targetPosition.y})),n=this.calculateBounds(e);if(this.svgVisible&&this.svgStrategy){let i=this.svgStrategy.getSvgBounds();n={minX:Math.min(n.minX,i.minX),maxX:Math.max(n.maxX,i.maxX),minY:Math.min(n.minY,i.minY),maxY:Math.max(n.maxY,i.maxY)}}return n}updateCamera(t){if(!this.renderer)return Promise.resolve();let e=this.computeSceneBounds();return this.renderer.setSceneBounds(e,{animate:t?.animate??!1,force:t?.force??!1})}animateToPositionWithUpdate(t,e,n,i){return st(this,null,function*(){t.mesh&&(yield this.renderer.animateToPosition(t.mesh,e,n,i),t.setCurrentPosition(n))})}animateToPositionWithOpacityUpdate(t,e,n,i,r,o){return st(this,null,function*(){t.mesh&&(yield this.renderer.animatePositionAndOpacity(t.mesh,e,n,i,r,o),t.setCurrentPosition(n),t.setProperty("opacity",r))})}setupDragForPhoto(t){if(!(!t.mesh||!this.renderer||!this.layoutStrategy)){if(!this.isDragEnabled){this.setupHoverDetectionForPhoto(t);return}this.renderer.setLayoutStrategy(this.svgStrategy||this.layoutStrategy),this.renderer.setMeshPhotoData(t.mesh,t),this.renderer.enableDragForMesh(t.mesh,e=>{t.setCurrentPosition(e),t.setTargetPosition(e)})}}getDragPositionOverride(t){if(!this.svgVisible||!this.svgStrategy)return null;let e=t.metadata.layout_x,n=t.metadata.layout_y;if(typeof e=="number"&&typeof n=="number"){let{x:i,y:r}=this.svgStrategy.normalizedToWorld(e,n);return{x:i,y:r,metadata:{layoutType:"restored-normalized",layout_x:e,layout_y:n}}}return null}setupHoverDetectionForPhoto(t){!t.mesh||!this.renderer||this.renderer.enableHoverForMesh(t.mesh)}calculateBounds(t){if(t.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let e=zt.PHOTO_WIDTH/2,n=zt.PHOTO_HEIGHT/2,i=t[0].x-e,r=t[0].x+e,o=t[0].y-n,a=t[0].y+n;for(let l of t)i=Math.min(i,l.x-e),r=Math.max(r,l.x+e),o=Math.min(o,l.y-n),a=Math.max(a,l.y+n);return{minX:i,maxX:r,minY:o,maxY:a}}static \u0275fac=function(e){return new(e||s)};static \u0275prov=Ri({token:s,factory:s.\u0275fac,providedIn:"root"})};var qr="179";var Ql=0,Ta=1,tc=2;var Ea=1,ec=2,xn=3,Fn=0,Ne=1,Mn=2,zn=0,pi=1,Aa=2,Ca=3,Pa=4,nc=5,Jn=100,ic=101,sc=102,rc=103,oc=104,ac=200,lc=201,cc=202,hc=203,Sr=204,wr=205,uc=206,dc=207,fc=208,pc=209,mc=210,gc=211,_c=212,vc=213,yc=214,Zr=0,$r=1,Kr=2,mi=3,Jr=4,jr=5,Qr=6,to=7,Ra=0,xc=1,Mc=2,kn=0,bc=1,Sc=2,wc=3,Tc=4,Ec=5,Ac=6,Cc=7;var _a=300,bi=301,Si=302,eo=303,no=304,Hs=306,Tr=1e3,gn=1001,Er=1002,tn=1003,Pc=1004;var Vs=1005;var Ue=1006,io=1007;var bn=1008;var Sn=1009,Ia=1010,Da=1011,ss=1012,so=1013,ei=1014,wn=1015,rs=1016,ro=1017,oo=1018,os=1020,Oa=35902,La=1021,Fa=1022,nn=1023,Ki=1026,as=1027,Ua=1028,ao=1029,Na=1030,lo=1031;var co=1033,Gs=33776,Ws=33777,Xs=33778,Ys=33779,ho=35840,uo=35841,fo=35842,po=35843,mo=36196,go=37492,_o=37496,vo=37808,yo=37809,xo=37810,Mo=37811,bo=37812,So=37813,wo=37814,To=37815,Eo=37816,Ao=37817,Co=37818,Po=37819,Ro=37820,Io=37821,qs=36492,Do=36494,Oo=36495,Ba=36283,Lo=36284,Fo=36285,Uo=36286;var Ts=2300,Ar=2301,Mr=2302,va=2400,ya=2401,xa=2402;var Rc=3200,Ic=3201;var Dc=0,Oc=1,Hn="",Re="srgb",gi="srgb-linear",Es="linear",Jt="srgb";var fi=7680;var Ma=519,Lc=512,Fc=513,Uc=514,za=515,Nc=516,Bc=517,zc=518,kc=519,ba=35044;var ka="300 es",hn=2e3,As=2001;var Un=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ol=1234567,Ss=Math.PI/180,Ji=180/Math.PI;function ls(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[s&255]+Ce[s>>8&255]+Ce[s>>16&255]+Ce[s>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Vt(s,t,e){return Math.max(t,Math.min(e,s))}function Ha(s,t){return(s%t+t)%t}function Lh(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Fh(s,t,e){return s!==t?(e-s)/(t-s):0}function ws(s,t,e){return(1-e)*s+e*t}function Uh(s,t,e,n){return ws(s,t,1-Math.exp(-e*n))}function Nh(s,t=1){return t-Math.abs(Ha(s,t*2)-t)}function Bh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function zh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function kh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Hh(s,t){return s+Math.random()*(t-s)}function Vh(s){return s*(.5-Math.random())}function Gh(s){s!==void 0&&(Ol=s);let t=Ol+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Wh(s){return s*Ss}function Xh(s){return s*Ji}function Yh(s){return(s&s-1)===0&&s!==0}function qh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Zh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function $h(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*p,a*c);break;case"YXY":s.set(l*p,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Zi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Fe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var ne={DEG2RAD:Ss,RAD2DEG:Ji,generateUUID:ls,clamp:Vt,euclideanModulo:Ha,mapLinear:Lh,inverseLerp:Fh,lerp:ws,damp:Uh,pingpong:Nh,smoothstep:Bh,smootherstep:zh,randInt:kh,randFloat:Hh,randFloatSpread:Vh,seededRandom:Gh,degToRad:Wh,radToDeg:Xh,isPowerOfTwo:Yh,ceilPowerOfTwo:qh,floorPowerOfTwo:Zh,setQuaternionFromProperEuler:$h,normalize:Fe,denormalize:Zi},Gt=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nn=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*_,T=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){let C=Math.sqrt(w),I=Math.atan2(C,f*T);m=Math.sin(m*I)/C,a=Math.sin(a*I)/C}let x=a*T;if(l=l*m+d*x,c=c*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),p=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ll.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ko.copy(this).projectOnVector(t),this.sub(Ko)}reflect(t){return this.sub(Ko.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ko=new U,Ll=new Nn,Ot=class s{constructor(t,e,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],T=i[1],w=i[4],x=i[7],C=i[2],I=i[5],P=i[8];return r[0]=o*_+a*T+l*C,r[3]=o*m+a*w+l*I,r[6]=o*f+a*x+l*P,r[1]=c*_+h*T+u*C,r[4]=c*m+h*w+u*I,r[7]=c*f+h*x+u*P,r[2]=d*_+p*T+g*C,r[5]=d*m+p*w+g*I,r[8]=d*f+p*x+g*P,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Jo.makeScale(t,e)),this}rotate(t){return this.premultiply(Jo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Jo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Jo=new Ot;function Va(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ji(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Hc(){let s=ji("canvas");return s.style.display="block",s}var Fl={};function _i(s){s in Fl||(Fl[s]=!0,console.warn(s))}function Vc(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Ul=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Kh(){let s={enabled:!0,workingColorSpace:gi,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Jt&&(i.r=Ln(i.r),i.g=Ln(i.g),i.b=Ln(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Jt&&(i.r=$i(i.r),i.g=$i(i.g),i.b=$i(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Hn?Es:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return _i("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return _i("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[gi]:{primaries:t,whitePoint:n,transfer:Es,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:n,transfer:Jt,toXYZ:Ul,fromXYZ:Nl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),s}var Yt=Kh();function Ln(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function $i(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Fi,Cr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Fi===void 0&&(Fi=ji("canvas")),Fi.width=t.width,Fi.height=t.height;let i=Fi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Fi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ji("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ln(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ln(e[n]/255)*255):e[n]=Ln(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Jh=0,Qi=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(jo(i[o].image)):r.push(jo(i[o]))}else r=jo(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function jo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Cr.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var jh=0,Qo=new U,qe=(()=>{class s extends Un{constructor(e=s.DEFAULT_IMAGE,n=s.DEFAULT_MAPPING,i=gn,r=gn,o=Ue,a=bn,l=nn,c=Sn,h=s.DEFAULT_ANISOTROPY,u=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=ls(),this.name="",this.source=new Qi(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=a,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qo).x}get height(){return this.source.getSize(Qo).y}get depth(){return this.source.getSize(Qo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let r=this[n];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_a)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Tr:e.x=e.x-Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case Er:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Tr:e.y=e.y-Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case Er:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}return s.DEFAULT_IMAGE=null,s.DEFAULT_MAPPING=_a,s.DEFAULT_ANISOTROPY=1,s})(),_e=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,x=(p+1)/2,C=(f+1)/2,I=(h+d)/4,P=(u+_)/4,L=(g+m)/4;return w>x&&w>C?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=I/n,r=P/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=I/i,r=L/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=P/r,i=L/r),this.set(n,i,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-_)/T,this.z=(d-h)/T,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Pr=class extends Un{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ue,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let i={width:t,height:e,depth:n.depth},r=new qe(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:Ue,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Qi(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends Pr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Cs=class extends qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Rr=class extends qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yn=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ir.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox)),ir.applyMatrix4(t.matrixWorld),this.union(ir)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ys),sr.subVectors(this.max,ys),Ui.subVectors(t.a,ys),Ni.subVectors(t.b,ys),Bi.subVectors(t.c,ys),Wn.subVectors(Ni,Ui),Xn.subVectors(Bi,Ni),ci.subVectors(Ui,Bi);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ci.z,ci.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ci.z,0,-ci.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ci.y,ci.x,0];return!ta(e,Ui,Ni,Bi,sr)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,Ui,Ni,Bi,sr))?!1:(rr.crossVectors(Wn,Xn),e=[rr.x,rr.y,rr.z],ta(e,Ui,Ni,Bi,sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Cn=[new U,new U,new U,new U,new U,new U,new U,new U],an=new U,ir=new yn,Ui=new U,Ni=new U,Bi=new U,Wn=new U,Xn=new U,ci=new U,ys=new U,sr=new U,rr=new U,hi=new U;function ta(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){hi.fromArray(s,r);let a=i.x*Math.abs(hi.x)+i.y*Math.abs(hi.y)+i.z*Math.abs(hi.z),l=t.dot(hi),c=e.dot(hi),h=n.dot(hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Qh=new yn,xs=new U,ea=new U,ts=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Qh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;xs.subVectors(t,this.center);let e=xs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(xs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(xs.copy(t.center).add(ea)),this.expandByPoint(xs.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Pn=new U,na=new U,or=new U,Yn=new U,ia=new U,ar=new U,sa=new U,Ps=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){na.copy(t).add(e).multiplyScalar(.5),or.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(na);let r=t.distanceTo(e)*.5,o=-this.direction.dot(or),a=Yn.dot(this.direction),l=-Yn.dot(or),c=Yn.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(na).addScaledVector(or,d),p}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);let n=Pn.dot(this.direction),i=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,i,r){ia.subVectors(e,t),ar.subVectors(n,t),sa.crossVectors(ia,ar);let o=this.direction.dot(sa),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yn.subVectors(this.origin,t);let l=a*this.direction.dot(ar.crossVectors(Yn,ar));if(l<0)return null;let c=a*this.direction.dot(ia.cross(Yn));if(c<0||l+c>o)return null;let h=-a*Yn.dot(sa);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ge=class s{constructor(t,e,n,i,r,o,a,l,c,h,u,d,p,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,p,g,_,m)}set(t,e,n,i,r,o,a,l,c,h,u,d,p,g,_,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/zi.setFromMatrixColumn(t,0).length(),r=1/zi.setFromMatrixColumn(t,1).length(),o=1/zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tu,t,eu)}lookAt(t,e,n){let i=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),qn.crossVectors(n,Ge),qn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),qn.crossVectors(n,Ge)),qn.normalize(),lr.crossVectors(Ge,qn),i[0]=qn.x,i[4]=lr.x,i[8]=Ge.x,i[1]=qn.y,i[5]=lr.y,i[9]=Ge.y,i[2]=qn.z,i[6]=lr.z,i[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],T=n[3],w=n[7],x=n[11],C=n[15],I=i[0],P=i[4],L=i[8],b=i[12],M=i[1],E=i[5],W=i[9],k=i[13],X=i[2],Z=i[6],Y=i[10],$=i[14],z=i[3],ot=i[7],ut=i[11],bt=i[15];return r[0]=o*I+a*M+l*X+c*z,r[4]=o*P+a*E+l*Z+c*ot,r[8]=o*L+a*W+l*Y+c*ut,r[12]=o*b+a*k+l*$+c*bt,r[1]=h*I+u*M+d*X+p*z,r[5]=h*P+u*E+d*Z+p*ot,r[9]=h*L+u*W+d*Y+p*ut,r[13]=h*b+u*k+d*$+p*bt,r[2]=g*I+_*M+m*X+f*z,r[6]=g*P+_*E+m*Z+f*ot,r[10]=g*L+_*W+m*Y+f*ut,r[14]=g*b+_*k+m*$+f*bt,r[3]=T*I+w*M+x*X+C*z,r[7]=T*P+w*E+x*Z+C*ot,r[11]=T*L+w*W+x*Y+C*ut,r[15]=T*b+w*k+x*$+C*bt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*p-n*l*p)+_*(+e*l*p-e*c*d+r*o*d-i*o*p+i*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+f*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],T=u*m*c-_*d*c+_*l*p-a*m*p-u*l*f+a*d*f,w=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,x=h*_*c-g*u*c+g*a*p-o*_*p-h*a*f+o*u*f,C=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,I=e*T+n*w+i*x+r*C;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/I;return t[0]=T*P,t[1]=(_*d*r-u*m*r-_*i*p+n*m*p+u*i*f-n*d*f)*P,t[2]=(a*m*r-_*l*r+_*i*c-n*m*c-a*i*f+n*l*f)*P,t[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*p-n*l*p)*P,t[4]=w*P,t[5]=(h*m*r-g*d*r+g*i*p-e*m*p-h*i*f+e*d*f)*P,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*f-e*l*f)*P,t[7]=(o*d*r-h*l*r+h*i*c-e*d*c-o*i*p+e*l*p)*P,t[8]=x*P,t[9]=(g*u*r-h*_*r-g*n*p+e*_*p+h*n*f-e*u*f)*P,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*f+e*a*f)*P,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*p-e*a*p)*P,t[12]=C*P,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*m+e*u*m)*P,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*m-e*a*m)*P,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*P,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,T=l*c,w=l*h,x=l*u,C=n.x,I=n.y,P=n.z;return i[0]=(1-(_+f))*C,i[1]=(p+x)*C,i[2]=(g-w)*C,i[3]=0,i[4]=(p-x)*I,i[5]=(1-(d+f))*I,i[6]=(m+T)*I,i[7]=0,i[8]=(g+w)*P,i[9]=(m-T)*P,i[10]=(1-(d+_))*P,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=zi.set(i[0],i[1],i[2]).length(),o=zi.set(i[4],i[5],i[6]).length(),a=zi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],ln.copy(this);let c=1/r,h=1/o,u=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=hn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),p=(n+i)/(n-i),g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===hn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===As)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=hn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),p=-(n+i)/(n-i),g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===hn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===As)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},zi=new U,ln=new ge,tu=new U(0,0,0),eu=new U(1,1,1),qn=new U,lr=new U,Ge=new U,Bl=new ge,zl=new Nn,vi=(()=>{class s{constructor(e=0,n=0,i=0,r=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){let r=e.elements,o=r[0],a=r[4],l=r[8],c=r[1],h=r[5],u=r[9],d=r[2],p=r[6],g=r[10];switch(n){case"XYZ":this._y=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Bl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bl,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return zl.setFromEuler(this),this.setFromQuaternion(zl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return s.DEFAULT_ORDER="XYZ",s})(),es=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},nu=0,kl=new U,ki=new Nn,Rn=new ge,cr=new U,Ms=new U,iu=new U,su=new Nn,Hl=new U(1,0,0),Vl=new U(0,1,0),Gl=new U(0,0,1),Wl={type:"added"},ru={type:"removed"},Hi={type:"childadded",child:null},ra={type:"childremoved",child:null},ni=(()=>{class s extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new U,n=new vi,i=new Nn,r=new U(1,1,1);function o(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ge},normalMatrix:{value:new Ot}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new es,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ki.setFromAxisAngle(e,n),this.quaternion.multiply(ki),this}rotateOnWorldAxis(e,n){return ki.setFromAxisAngle(e,n),this.quaternion.premultiply(ki),this}rotateX(e){return this.rotateOnAxis(Hl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(Gl,e)}translateOnAxis(e,n){return kl.copy(e).applyQuaternion(this.quaternion),this.position.add(kl.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Hl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(Gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?cr.copy(e):cr.set(e,n,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Ms,cr,this.up):Rn.lookAt(cr,Ms,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),ki.setFromRotationMatrix(Rn),this.quaternion.premultiply(ki.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wl),Hi.child=e,this.dispatchEvent(Hi),Hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(ru),ra.child=e,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wl),Hi.child=e,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,iu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,su,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>Ke(Ht({},l),{boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>Ht({},l)),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function o(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let c=l.shapes;if(Array.isArray(c))for(let h=0,u=c.length;h<u;h++){let d=c[h];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let c=0,h=this.material.length;c<h;c++)l.push(o(e.materials,this.material[c]));r.material=l}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){let c=this.animations[l];r.animations.push(o(e.animations,c))}}if(n){let l=a(e.geometries),c=a(e.materials),h=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),g=a(e.animations),_=a(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(l){let c=[];for(let h in l){let u=l[h];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}}return s.DEFAULT_UP=new U(0,1,0),s.DEFAULT_MATRIX_AUTO_UPDATE=!0,s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,s})(),cn=new U,In=new U,oa=new U,Dn=new U,Vi=new U,Gi=new U,Xl=new U,aa=new U,la=new U,ca=new U,ha=new _e,ua=new _e,da=new _e,Kn=class s{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),cn.subVectors(t,e),i.cross(cn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){cn.subVectors(i,e),In.subVectors(n,e),oa.subVectors(t,e);let o=cn.dot(cn),a=cn.dot(In),l=cn.dot(oa),c=In.dot(In),h=In.dot(oa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(o,Dn.y),l.addScaledVector(a,Dn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return ha.setScalar(0),ua.setScalar(0),da.setScalar(0),ha.fromBufferAttribute(t,e),ua.fromBufferAttribute(t,n),da.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ha,r.x),o.addScaledVector(ua,r.y),o.addScaledVector(da,r.z),o}static isFrontFacing(t,e,n,i){return cn.subVectors(n,e),In.subVectors(t,e),cn.cross(In).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),cn.cross(In).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Vi.subVectors(i,n),Gi.subVectors(r,n),aa.subVectors(t,n);let l=Vi.dot(aa),c=Gi.dot(aa);if(l<=0&&c<=0)return e.copy(n);la.subVectors(t,i);let h=Vi.dot(la),u=Gi.dot(la);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Vi,o);ca.subVectors(t,r);let p=Vi.dot(ca),g=Gi.dot(ca);if(g>=0&&p<=g)return e.copy(r);let _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Gi,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Xl.subVectors(r,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Xl,a);let f=1/(m+_+d);return o=_*f,a=d*f,e.copy(n).addScaledVector(Vi,o).addScaledVector(Gi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},hr={h:0,s:0,l:0};function fa(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Yt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Yt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Yt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Yt.workingColorSpace){if(t=Ha(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fa(o,r,t+1/3),this.g=fa(o,r,t),this.b=fa(o,r,t-1/3)}return Yt.colorSpaceToWorking(this,i),this}setStyle(t,e=Re){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){let n=Gc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=$i(t.r),this.g=$i(t.g),this.b=$i(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return Yt.workingToColorSpace(Pe.copy(this),t),Math.round(Vt(Pe.r*255,0,255))*65536+Math.round(Vt(Pe.g*255,0,255))*256+Math.round(Vt(Pe.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Yt.workingColorSpace){Yt.workingToColorSpace(Pe.copy(this),e);let n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Yt.workingColorSpace){return Yt.workingToColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Re){Yt.workingToColorSpace(Pe.copy(this),t);let e=Pe.r,n=Pe.g,i=Pe.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(hr);let n=ws(Zn.h,hr.h,e),i=ws(Zn.s,hr.s,e),r=ws(Zn.l,hr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pe=new Wt;Wt.NAMES=Gc;var ou=0,en=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=ls(),this.name="",this.type="Material",this.blending=pi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sr,this.blendDst=wr,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fi,this.stencilZFail=fi,this.stencilZPass=fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Sr&&(n.blendSrc=this.blendSrc),this.blendDst!==wr&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},un=class extends en{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var be=new U,ur=new Gt,au=0,Xe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:au++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ba,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ur.fromBufferAttribute(this,e),ur.applyMatrix3(t),this.setXY(e,ur.x,ur.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Zi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Zi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Zi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Zi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Zi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),i=Fe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),i=Fe(i,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ba&&(t.usage=this.usage),t}};var Rs=class extends Xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Is=class extends Xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var _n=class extends Xe{constructor(t,e,n){super(new Float32Array(t),e,n)}},lu=0,je=new ge,pa=new ni,Wi=new U,We=new yn,bs=new yn,Ae=new U,jn=class s extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Va(t)?Is:Rs)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return pa.lookAt(t),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _n(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(We.min,bs.min),We.expandByPoint(Ae),Ae.addVectors(We.max,bs.max),We.expandByPoint(Ae)):(We.expandByPoint(bs.min),We.expandByPoint(bs.max))}We.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ae.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ae));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ae.fromBufferAttribute(a,c),l&&(Wi.fromBufferAttribute(t,c),Ae.add(Wi)),i=Math.max(i,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new U,l[L]=new U;let c=new U,h=new U,u=new U,d=new Gt,p=new Gt,g=new Gt,_=new U,m=new U;function f(L,b,M){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,L),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let E=1/(p.x*g.y-g.x*p.y);isFinite(E)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(E),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(E),a[L].add(_),a[b].add(_),a[M].add(_),l[L].add(m),l[b].add(m),l[M].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let L=0,b=T.length;L<b;++L){let M=T[L],E=M.start,W=M.count;for(let k=E,X=E+W;k<X;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let w=new U,x=new U,C=new U,I=new U;function P(L){C.fromBufferAttribute(i,L),I.copy(C);let b=a[L];w.copy(b),w.sub(C.multiplyScalar(C.dot(b))).normalize(),x.crossVectors(I,b);let E=x.dot(l[L])<0?-1:1;o.setXYZW(L,w.x,w.y,w.z,E)}for(let L=0,b=T.length;L<b;++L){let M=T[L],E=M.start,W=M.count;for(let k=E,X=E+W;k<X;k+=3)P(t.getX(k+0)),P(t.getX(k+1)),P(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,u=new U;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Xe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yl=new ge,ui=new Ps,dr=new ts,ql=new U,fr=new U,pr=new U,mr=new U,ma=new U,gr=new U,Zl=new U,_r=new U,De=class extends ni{constructor(t=new jn,e=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ma.fromBufferAttribute(u,t),o?gr.addScaledVector(ma,h):gr.addScaledVector(ma.sub(e),h))}e.add(gr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(r),ui.copy(t.ray).recast(t.near),!(dr.containsPoint(ui.origin)===!1&&(ui.intersectSphere(dr,ql)===null||ui.origin.distanceToSquared(ql)>(t.far-t.near)**2))&&(Yl.copy(r).invert(),ui.copy(t.ray).applyMatrix4(Yl),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),w=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,C=w;x<C;x+=3){let I=a.getX(x),P=a.getX(x+1),L=a.getX(x+2);i=vr(this,f,t,n,c,h,u,I,P,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let T=a.getX(m),w=a.getX(m+1),x=a.getX(m+2);i=vr(this,o,t,n,c,h,u,T,w,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],f=o[m.materialIndex],T=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=T,C=w;x<C;x+=3){let I=x,P=x+1,L=x+2;i=vr(this,f,t,n,c,h,u,I,P,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){let T=m,w=m+1,x=m+2;i=vr(this,o,t,n,c,h,u,T,w,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function cu(s,t,e,n,i,r,o,a){let l;if(t.side===Ne?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Fn,a),l===null)return null;_r.copy(a),_r.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(_r);return c<e.near||c>e.far?null:{distance:c,point:_r.clone(),object:s}}function vr(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,fr),s.getVertexPosition(l,pr),s.getVertexPosition(c,mr);let h=cu(s,t,e,n,fr,pr,mr,Zl);if(h){let u=new U;Kn.getBarycoord(Zl,fr,pr,mr,u),i&&(h.uv=Kn.getInterpolatedAttribute(i,a,l,c,u,new Gt)),r&&(h.uv1=Kn.getInterpolatedAttribute(r,a,l,c,u,new Gt)),o&&(h.normal=Kn.getInterpolatedAttribute(o,a,l,c,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new U,materialIndex:0};Kn.getNormal(fr,pr,mr,d.normal),h.face=d,h.barycoord=u}return h}var ns=class s extends jn{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new _n(c,3)),this.setAttribute("normal",new _n(h,3)),this.setAttribute("uv",new _n(u,2));function g(_,m,f,T,w,x,C,I,P,L,b){let M=x/P,E=C/L,W=x/2,k=C/2,X=I/2,Z=P+1,Y=L+1,$=0,z=0,ot=new U;for(let ut=0;ut<Y;ut++){let bt=ut*E-k;for(let Ut=0;Ut<Z;Ut++){let oe=Ut*M-W;ot[_]=oe*T,ot[m]=bt*w,ot[f]=X,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[f]=I>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(Ut/P),u.push(1-ut/L),$+=1}}for(let ut=0;ut<L;ut++)for(let bt=0;bt<P;bt++){let Ut=d+bt+Z*ut,oe=d+bt+Z*(ut+1),te=d+(bt+1)+Z*(ut+1),G=d+(bt+1)+Z*ut;l.push(Ut,oe,G),l.push(oe,te,G),z+=6}a.addGroup(p,z,b),p+=z,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function wi(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Oe(s){let t={};for(let e=0;e<s.length;e++){let n=wi(s[e]);for(let i in n)t[i]=n[i]}return t}function hu(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Ga(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Yt.workingColorSpace}var Wc={clone:wi,merge:Oe},uu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends en{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uu,this.fragmentShader=du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wi(t.uniforms),this.uniformsGroups=hu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ds=class extends ni{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=hn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$n=new U,$l=new Gt,Kl=new Gt,Ie=class extends Ds{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ji*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,$l,Kl),e.subVectors(Kl,$l)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ss*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Xi=-90,Yi=1,Ir=class extends ni{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ie(Xi,Yi,t,e);i.layers=this.layers,this.add(i);let r=new Ie(Xi,Yi,t,e);r.layers=this.layers,this.add(r);let o=new Ie(Xi,Yi,t,e);o.layers=this.layers,this.add(o);let a=new Ie(Xi,Yi,t,e);a.layers=this.layers,this.add(a);let l=new Ie(Xi,Yi,t,e);l.layers=this.layers,this.add(l);let c=new Ie(Xi,Yi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===hn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===As)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Os=class extends qe{constructor(t=[],e=bi,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Dr=class extends vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Os(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ns(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:zn});r.uniforms.tEquirect.value=e;let o=new De(i,r),a=e.minFilter;return e.minFilter===bn&&(e.minFilter=Ue),new Ir(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},On=class extends ni{constructor(){super(),this.isGroup=!0,this.type="Group"}},fu={type:"move"},is=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fu)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new On;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var Ls=class extends ni{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var ga=new U,pu=new U,mu=new Ot,Qe=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=ga.subVectors(n,e).cross(pu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ga),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||mu.getNormalMatrix(t),i=this.coplanarPoint(ga).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},di=new ts,gu=new Gt(.5,.5),yr=new U,yi=class{constructor(t=new Qe,e=new Qe,n=new Qe,i=new Qe,r=new Qe,o=new Qe){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],_=r[9],m=r[10],f=r[11],T=r[12],w=r[13],x=r[14],C=r[15];if(i[0].setComponents(c-o,p-h,f-g,C-T).normalize(),i[1].setComponents(c+o,p+h,f+g,C+T).normalize(),i[2].setComponents(c+a,p+u,f+_,C+w).normalize(),i[3].setComponents(c-a,p-u,f-_,C-w).normalize(),n)i[4].setComponents(l,d,m,x).normalize(),i[5].setComponents(c-l,p-d,f-m,C-x).normalize();else if(i[4].setComponents(c-l,p-d,f-m,C-x).normalize(),e===hn)i[5].setComponents(c+l,p+d,f+m,C+x).normalize();else if(e===As)i[5].setComponents(l,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){di.center.set(0,0,0);let e=gu.distanceTo(t.center);return di.radius=.7071067811865476+e,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(yr.x=i.normal.x>0?t.max.x:t.min.x,yr.y=i.normal.y>0?t.max.y:t.min.y,yr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xi=class extends qe{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Fs=class extends qe{constructor(t,e,n=ei,i,r,o,a=tn,l=tn,c,h=Ki,u=1){if(h!==Ki&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Qi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}};var Bn=class s extends jn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){let T=f*d-o;for(let w=0;w<c;w++){let x=w*u-r;g.push(x,-T,0),_.push(0,0,1),m.push(w/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<a;T++){let w=T+c*f,x=T+c*(f+1),C=T+1+c*(f+1),I=T+1+c*f;p.push(w,x,I),p.push(x,C,I)}this.setIndex(p),this.setAttribute("position",new _n(g,3)),this.setAttribute("normal",new _n(_,3)),this.setAttribute("uv",new _n(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Or=class extends en{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Lr=class extends en{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function xr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function _u(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Mi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Fr=class extends Mi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:va,endingEnd:va}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ya:r=t,a=2*e-n;break;case xa:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ya:o=t,l=2*n-e;break;case xa:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(i-e),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,T=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,w=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let C=0;C!==a;++C)r[C]=f*o[h+C]+T*o[c+C]+w*o[l+C]+x*o[u+C];return r}},Ur=class extends Mi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Nr=class extends Mi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Ye=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=xr(e,this.TimeBufferType),this.values=xr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:xr(t.times,Array),values:xr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Nr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ur(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Fr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ts:e=this.InterpolantFactoryMethodDiscrete;break;case Ar:e=this.InterpolantFactoryMethodLinear;break;case Mr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ts;case this.InterpolantFactoryMethodLinear:return Ar;case this.InterpolantFactoryMethodSmooth:return Mr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&_u(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Mr,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[d+g]||_!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Ye.prototype.ValueTypeName="";Ye.prototype.TimeBufferType=Float32Array;Ye.prototype.ValueBufferType=Float32Array;Ye.prototype.DefaultInterpolation=Ar;var Qn=class extends Ye{constructor(t,e,n){super(t,e,n)}};Qn.prototype.ValueTypeName="bool";Qn.prototype.ValueBufferType=Array;Qn.prototype.DefaultInterpolation=Ts;Qn.prototype.InterpolantFactoryMethodLinear=void 0;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Br=class extends Ye{constructor(t,e,n,i){super(t,e,n,i)}};Br.prototype.ValueTypeName="color";var zr=class extends Ye{constructor(t,e,n,i){super(t,e,n,i)}};zr.prototype.ValueTypeName="number";var kr=class extends Mi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Nn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Us=class extends Ye{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new kr(this.times,this.values,this.getValueSize(),t)}};Us.prototype.ValueTypeName="quaternion";Us.prototype.InterpolantFactoryMethodSmooth=void 0;var ti=class extends Ye{constructor(t,e,n){super(t,e,n)}};ti.prototype.ValueTypeName="string";ti.prototype.ValueBufferType=Array;ti.prototype.DefaultInterpolation=Ts;ti.prototype.InterpolantFactoryMethodLinear=void 0;ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Hr=class extends Ye{constructor(t,e,n,i){super(t,e,n,i)}};Hr.prototype.ValueTypeName="vector";var br={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Vr=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Xc=new Vr,Wa=(()=>{class s{constructor(e){this.manager=e!==void 0?e:Xc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let i=this;return new Promise(function(r,o){i.load(e,r,n,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}return s.DEFAULT_MATERIAL_NAME="__DEFAULT",s})();var qi=new WeakMap,Gr=class extends Wa{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=br.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=qi.get(o);u===void 0&&(u=[],qi.set(o,u)),u.push({onLoad:e,onError:i})}return o}let a=ji("img");function l(){h(),e&&e(this);let u=qi.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}qi.delete(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),br.remove(`image:${t}`);let d=qi.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u)}qi.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),br.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}};var Ns=class extends Wa{constructor(t){super(t)}load(t,e,n,i){let r=new qe,o=new Gr(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}},Wr=class extends ni{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Xr=class extends Ds{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Bs=class extends Wr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Yr=class extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},zs=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var Xa="\\[\\]\\.:\\/",vu=new RegExp("["+Xa+"]","g"),Ya="[^"+Xa+"]",yu="[^"+Xa.replace("\\.","")+"]",xu=/((?:WC+[\/:])*)/.source.replace("WC",Ya),Mu=/(WCOD+)?/.source.replace("WCOD",yu),bu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ya),Su=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ya),wu=new RegExp("^"+xu+Mu+bu+Su+"$"),Tu=["material","materials","bones","map"],Sa=class{constructor(t,e,n){let i=n||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},me=(()=>{class s{constructor(e,n,i){this.path=n,this.parsedPath=i||s.parseTrackName(n),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new s.Composite(e,n,i):new s(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vu,"")}static parseTrackName(e){let n=wu.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=i.nodeName.substring(r+1);Tu.indexOf(o)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=o)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){let i=function(o){for(let a=0;a<o.length;a++){let l=o[a];if(l.name===n||l.uuid===n)return l;let c=i(l.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)e[n++]=i[r]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,r=n.propertyName,o=n.propertyIndex;if(e||(e=s.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(h!==void 0){if(e[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let a=e[r];if(a===void 0){let h=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return s.Composite=Sa,s})();me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var u_=new Float32Array(1);var Jl=new ge,ks=class{constructor(t,e,n=0,i=1/0){this.ray=new Ps(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new es,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Jl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jl),this}intersectObject(t,e=!0,n=[]){return wa(t,this,n,e),n.sort(jl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)wa(t[i],this,n,e);return n.sort(jl),n}};function jl(s,t){return s.distance-t.distance}function wa(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)wa(r[o],t,e,!0)}}function qa(s,t,e,n){let i=Eu(n);switch(e){case La:return s*t;case Ua:return s*t/i.components*i.byteLength;case ao:return s*t/i.components*i.byteLength;case Na:return s*t*2/i.components*i.byteLength;case lo:return s*t*2/i.components*i.byteLength;case Fa:return s*t*3/i.components*i.byteLength;case nn:return s*t*4/i.components*i.byteLength;case co:return s*t*4/i.components*i.byteLength;case Gs:case Ws:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Xs:case Ys:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case uo:case po:return Math.max(s,16)*Math.max(t,8)/4;case ho:case fo:return Math.max(s,8)*Math.max(t,8)/2;case mo:case go:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _o:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case xo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Mo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case bo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case So:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case wo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case To:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Eo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Co:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Po:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ro:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case qs:case Do:case Oo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Ba:case Lo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Fo:case Uo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Eu(s){switch(s){case Sn:case Ia:return{byteLength:1,components:1};case ss:case Da:case rs:return{byteLength:2,components:1};case ro:case oo:return{byteLength:2,components:4};case ei:case so:case wn:return{byteLength:4,components:1};case Oa:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qr);function mh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Au(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let _=u[p];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Cu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pu=`#ifdef USE_ALPHAHASH
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
#endif`,Ru=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Iu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Du=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ou=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lu=`#ifdef USE_AOMAP
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
#endif`,Fu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uu=`#ifdef USE_BATCHING
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
#endif`,Nu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ku=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hu=`#ifdef USE_IRIDESCENCE
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
#endif`,Vu=`#ifdef USE_BUMPMAP
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
#endif`,Gu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ku=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ju=`#define PI 3.141592653589793
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
} // validated`,ju=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qu=`vec3 transformedNormal = objectNormal;
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
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sd="gl_FragColor = linearToOutputTexel( gl_FragColor );",rd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,od=`#ifdef USE_ENVMAP
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
#endif`,ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ld=`#ifdef USE_ENVMAP
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
#endif`,cd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hd=`#ifdef USE_ENVMAP
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
#endif`,ud=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,md=`#ifdef USE_GRADIENTMAP
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
}`,gd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_d=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yd=`uniform bool receiveShadow;
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
#endif`,xd=`#ifdef USE_ENVMAP
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
#endif`,Md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Td=`PhysicalMaterial material;
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
#endif`,Ed=`struct PhysicalMaterial {
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
}`,Ad=`
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
#endif`,Cd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Id=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Od=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Nd=`#if defined( USE_POINTS_UV )
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
#endif`,Bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gd=`#ifdef USE_MORPHTARGETS
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
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Yd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kd=`#ifdef USE_NORMALMAP
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
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ef=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,of=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,af=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ff=`float getShadowMask() {
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
}`,pf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mf=`#ifdef USE_SKINNING
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
#endif`,gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_f=`#ifdef USE_SKINNING
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
#endif`,vf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bf=`#ifdef USE_TRANSMISSION
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
#endif`,Sf=`#ifdef USE_TRANSMISSION
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
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pf=`uniform sampler2D t2D;
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
}`,Rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Of=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`#include <common>
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
}`,Ff=`#if DEPTH_PACKING == 3200
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
}`,Uf=`#define DISTANCE
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
}`,Nf=`#define DISTANCE
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
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`uniform float scale;
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
}`,Hf=`uniform vec3 diffuse;
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
}`,Vf=`#include <common>
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
}`,Gf=`uniform vec3 diffuse;
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
}`,Wf=`#define LAMBERT
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
}`,Xf=`#define LAMBERT
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
}`,Yf=`#define MATCAP
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
}`,qf=`#define MATCAP
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
}`,Zf=`#define NORMAL
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
}`,$f=`#define NORMAL
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
}`,Kf=`#define PHONG
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
}`,Jf=`#define PHONG
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
}`,jf=`#define STANDARD
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
}`,Qf=`#define STANDARD
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
}`,tp=`#define TOON
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
}`,ep=`#define TOON
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
}`,np=`uniform float size;
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
}`,ip=`uniform vec3 diffuse;
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
}`,sp=`#include <common>
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
}`,rp=`uniform vec3 color;
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
}`,op=`uniform float rotation;
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
}`,ap=`uniform vec3 diffuse;
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
}`,Ft={alphahash_fragment:Cu,alphahash_pars_fragment:Pu,alphamap_fragment:Ru,alphamap_pars_fragment:Iu,alphatest_fragment:Du,alphatest_pars_fragment:Ou,aomap_fragment:Lu,aomap_pars_fragment:Fu,batching_pars_vertex:Uu,batching_vertex:Nu,begin_vertex:Bu,beginnormal_vertex:zu,bsdfs:ku,iridescence_fragment:Hu,bumpmap_pars_fragment:Vu,clipping_planes_fragment:Gu,clipping_planes_pars_fragment:Wu,clipping_planes_pars_vertex:Xu,clipping_planes_vertex:Yu,color_fragment:qu,color_pars_fragment:Zu,color_pars_vertex:$u,color_vertex:Ku,common:Ju,cube_uv_reflection_fragment:ju,defaultnormal_vertex:Qu,displacementmap_pars_vertex:td,displacementmap_vertex:ed,emissivemap_fragment:nd,emissivemap_pars_fragment:id,colorspace_fragment:sd,colorspace_pars_fragment:rd,envmap_fragment:od,envmap_common_pars_fragment:ad,envmap_pars_fragment:ld,envmap_pars_vertex:cd,envmap_physical_pars_fragment:xd,envmap_vertex:hd,fog_vertex:ud,fog_pars_vertex:dd,fog_fragment:fd,fog_pars_fragment:pd,gradientmap_pars_fragment:md,lightmap_pars_fragment:gd,lights_lambert_fragment:_d,lights_lambert_pars_fragment:vd,lights_pars_begin:yd,lights_toon_fragment:Md,lights_toon_pars_fragment:bd,lights_phong_fragment:Sd,lights_phong_pars_fragment:wd,lights_physical_fragment:Td,lights_physical_pars_fragment:Ed,lights_fragment_begin:Ad,lights_fragment_maps:Cd,lights_fragment_end:Pd,logdepthbuf_fragment:Rd,logdepthbuf_pars_fragment:Id,logdepthbuf_pars_vertex:Dd,logdepthbuf_vertex:Od,map_fragment:Ld,map_pars_fragment:Fd,map_particle_fragment:Ud,map_particle_pars_fragment:Nd,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:zd,morphinstance_vertex:kd,morphcolor_vertex:Hd,morphnormal_vertex:Vd,morphtarget_pars_vertex:Gd,morphtarget_vertex:Wd,normal_fragment_begin:Xd,normal_fragment_maps:Yd,normal_pars_fragment:qd,normal_pars_vertex:Zd,normal_vertex:$d,normalmap_pars_fragment:Kd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:jd,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:tf,opaque_fragment:ef,packing:nf,premultiplied_alpha_fragment:sf,project_vertex:rf,dithering_fragment:of,dithering_pars_fragment:af,roughnessmap_fragment:lf,roughnessmap_pars_fragment:cf,shadowmap_pars_fragment:hf,shadowmap_pars_vertex:uf,shadowmap_vertex:df,shadowmask_pars_fragment:ff,skinbase_vertex:pf,skinning_pars_vertex:mf,skinning_vertex:gf,skinnormal_vertex:_f,specularmap_fragment:vf,specularmap_pars_fragment:yf,tonemapping_fragment:xf,tonemapping_pars_fragment:Mf,transmission_fragment:bf,transmission_pars_fragment:Sf,uv_pars_fragment:wf,uv_pars_vertex:Tf,uv_vertex:Ef,worldpos_vertex:Af,background_vert:Cf,background_frag:Pf,backgroundCube_vert:Rf,backgroundCube_frag:If,cube_vert:Df,cube_frag:Of,depth_vert:Lf,depth_frag:Ff,distanceRGBA_vert:Uf,distanceRGBA_frag:Nf,equirect_vert:Bf,equirect_frag:zf,linedashed_vert:kf,linedashed_frag:Hf,meshbasic_vert:Vf,meshbasic_frag:Gf,meshlambert_vert:Wf,meshlambert_frag:Xf,meshmatcap_vert:Yf,meshmatcap_frag:qf,meshnormal_vert:Zf,meshnormal_frag:$f,meshphong_vert:Kf,meshphong_frag:Jf,meshphysical_vert:jf,meshphysical_frag:Qf,meshtoon_vert:tp,meshtoon_frag:ep,points_vert:np,points_frag:ip,shadow_vert:sp,shadow_frag:rp,sprite_vert:op,sprite_frag:ap},rt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Tn={basic:{uniforms:Oe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Oe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Oe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Oe([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Oe([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Oe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Oe([rt.points,rt.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Oe([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Oe([rt.common,rt.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Oe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Oe([rt.sprite,rt.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Oe([rt.common,rt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Oe([rt.lights,rt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};Tn.physical={uniforms:Oe([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};var No={r:0,b:0,g:0},Ti=new vi,lp=new ge;function cp(s,t,e,n,i,r,o){let a=new Wt(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(w){let x=w.isScene===!0?w.background:null;return x&&x.isTexture&&(x=(w.backgroundBlurriness>0?e:t).get(x)),x}function _(w){let x=!1,C=g(w);C===null?f(a,l):C&&C.isColor&&(f(C,1),x=!0);let I=s.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(w,x){let C=g(x);C&&(C.isCubeTexture||C.mapping===Hs)?(h===void 0&&(h=new De(new ns(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:wi(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ti.copy(x.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(lp.makeRotationFromEuler(Ti)),h.material.toneMapped=Yt.getTransfer(C.colorSpace)!==Jt,(u!==C||d!==C.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,p=s.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new De(new Bn(2,2),new dn({name:"BackgroundMaterial",uniforms:wi(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Yt.getTransfer(C.colorSpace)!==Jt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=C,d=C.version,p=s.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,x){w.getRGB(No,Ga(s)),n.buffers.color.setClear(No.r,No.g,No.b,x,o)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,x=1){a.set(w),l=x,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(a,l)},render:_,addToRenderList:m,dispose:T}}function hp(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(M,E,W,k,X){let Z=!1,Y=u(k,W,E);r!==Y&&(r=Y,c(r.object)),Z=p(M,k,W,X),Z&&g(M,k,W,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(M,E,W,k),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,E,W){let k=W.wireframe===!0,X=n[M.id];X===void 0&&(X={},n[M.id]=X);let Z=X[E.id];Z===void 0&&(Z={},X[E.id]=Z);let Y=Z[k];return Y===void 0&&(Y=d(l()),Z[k]=Y),Y}function d(M){let E=[],W=[],k=[];for(let X=0;X<e;X++)E[X]=0,W[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:W,attributeDivisors:k,object:M,attributes:{},index:null}}function p(M,E,W,k){let X=r.attributes,Z=E.attributes,Y=0,$=W.getAttributes();for(let z in $)if($[z].location>=0){let ut=X[z],bt=Z[z];if(bt===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(bt=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(bt=M.instanceColor)),ut===void 0||ut.attribute!==bt||bt&&ut.data!==bt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==k}function g(M,E,W,k){let X={},Z=E.attributes,Y=0,$=W.getAttributes();for(let z in $)if($[z].location>=0){let ut=Z[z];ut===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(ut=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(ut=M.instanceColor));let bt={};bt.attribute=ut,ut&&ut.data&&(bt.data=ut.data),X[z]=bt,Y++}r.attributes=X,r.attributesNum=Y,r.index=k}function _(){let M=r.newAttributes;for(let E=0,W=M.length;E<W;E++)M[E]=0}function m(M){f(M,0)}function f(M,E){let W=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;W[M]=1,k[M]===0&&(s.enableVertexAttribArray(M),k[M]=1),X[M]!==E&&(s.vertexAttribDivisor(M,E),X[M]=E)}function T(){let M=r.newAttributes,E=r.enabledAttributes;for(let W=0,k=E.length;W<k;W++)E[W]!==M[W]&&(s.disableVertexAttribArray(W),E[W]=0)}function w(M,E,W,k,X,Z,Y){Y===!0?s.vertexAttribIPointer(M,E,W,X,Z):s.vertexAttribPointer(M,E,W,k,X,Z)}function x(M,E,W,k){_();let X=k.attributes,Z=W.getAttributes(),Y=E.defaultAttributeValues;for(let $ in Z){let z=Z[$];if(z.location>=0){let ot=X[$];if(ot===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor)),ot!==void 0){let ut=ot.normalized,bt=ot.itemSize,Ut=t.get(ot);if(Ut===void 0)continue;let oe=Ut.buffer,te=Ut.type,G=Ut.bytesPerElement,at=te===s.INT||te===s.UNSIGNED_INT||ot.gpuType===so;if(ot.isInterleavedBufferAttribute){let nt=ot.data,Et=nt.stride,At=ot.offset;if(nt.isInstancedInterleavedBuffer){for(let It=0;It<z.locationSize;It++)f(z.location+It,nt.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let It=0;It<z.locationSize;It++)m(z.location+It);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let It=0;It<z.locationSize;It++)w(z.location+It,bt/z.locationSize,te,ut,Et*G,(At+bt/z.locationSize*It)*G,at)}else{if(ot.isInstancedBufferAttribute){for(let nt=0;nt<z.locationSize;nt++)f(z.location+nt,ot.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let nt=0;nt<z.locationSize;nt++)m(z.location+nt);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let nt=0;nt<z.locationSize;nt++)w(z.location+nt,bt/z.locationSize,te,ut,bt*G,bt/z.locationSize*nt*G,at)}}else if(Y!==void 0){let ut=Y[$];if(ut!==void 0)switch(ut.length){case 2:s.vertexAttrib2fv(z.location,ut);break;case 3:s.vertexAttrib3fv(z.location,ut);break;case 4:s.vertexAttrib4fv(z.location,ut);break;default:s.vertexAttrib1fv(z.location,ut)}}}}T()}function C(){L();for(let M in n){let E=n[M];for(let W in E){let k=E[W];for(let X in k)h(k[X].object),delete k[X];delete E[W]}delete n[M]}}function I(M){if(n[M.id]===void 0)return;let E=n[M.id];for(let W in E){let k=E[W];for(let X in k)h(k[X].object),delete k[X];delete E[W]}delete n[M.id]}function P(M){for(let E in n){let W=n[E];if(W[M.id]===void 0)continue;let k=W[M.id];for(let X in k)h(k[X].object),delete k[X];delete W[M.id]}}function L(){b(),o=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:I,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T}}function up(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let P=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(P){return!(P!==nn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){let L=P===rs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Sn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==wn&&!L)}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),T=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,I=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:w,maxFragmentUniforms:x,vertexTextures:C,maxSamples:I}}function fp(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Qe,a=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{let T=r?0:n,w=T*4,x=f.clippingState||null;l.value=x,x=h(g,d,w,p);for(let C=0;C!==w;++C)x[C]=e[C];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let f=p+_*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,x=p;w!==_;++w,x+=4)o.copy(u[w]).applyMatrix4(T,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function pp(s){let t=new WeakMap;function e(o,a){return a===eo?o.mapping=bi:a===no&&(o.mapping=Si),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===eo||a===no)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Dr(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var hs=4,Yc=[.125,.215,.35,.446,.526,.582],Ci=20,Za=new Xr,qc=new Wt,$a=null,Ka=0,Ja=0,ja=!1,Ai=(1+Math.sqrt(5))/2,cs=1/Ai,Zc=[new U(-Ai,cs,0),new U(Ai,cs,0),new U(-cs,0,Ai),new U(cs,0,Ai),new U(0,Ai,-cs),new U(0,Ai,cs),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],mp=new U,ko=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=mp}=r;$a=this._renderer.getRenderTarget(),Ka=this._renderer.getActiveCubeFace(),Ja=this._renderer.getActiveMipmapLevel(),ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($a,Ka,Ja),this._renderer.xr.enabled=ja,t.scissorTest=!1,Bo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===bi||t.mapping===Si?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$a=this._renderer.getRenderTarget(),Ka=this._renderer.getActiveCubeFace(),Ja=this._renderer.getActiveMipmapLevel(),ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ue,minFilter:Ue,generateMipmaps:!1,type:rs,format:nn,colorSpace:gi,depthBuffer:!1},i=$c(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$c(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gp(r)),this._blurMaterial=_p(r,t,e)}return i}_compileMaterial(t){let e=new De(this._lodPlanes[0],t);this._renderer.compile(e,Za)}_sceneToCubeUV(t,e,n,i,r){let l=new Ie(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(qc),u.toneMapping=kn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let _=new un({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),m=new De(new ns,_),f=!1,T=t.background;T?T.isColor&&(_.color.copy(T),t.background=null,f=!0):(_.color.copy(qc),f=!0);for(let w=0;w<6;w++){let x=w%3;x===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):x===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let C=this._cubeSize;Bo(i,x*C,w>2?C:0,C,C),u.setRenderTarget(i),f&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=T}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===bi||t.mapping===Si;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kc());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new De(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Bo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Za)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Zc[(i-r-1)%Zc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new De(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ci-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ci;m>Ci&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ci}`);let f=[],T=0;for(let P=0;P<Ci;++P){let L=P/_,b=Math.exp(-L*L/2);f.push(b),P===0?T+=b:P<m&&(T+=2*b)}for(let P=0;P<f.length;P++)f[P]=f[P]/T;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:w}=this;d.dTheta.value=g,d.mipInt.value=w-n;let x=this._sizeLods[i],C=3*x*(i>w-hs?i-w+hs:0),I=4*(this._cubeSize-x);Bo(e,C,I,3*x,2*x),l.setRenderTarget(e),l.render(u,Za)}};function gp(s){let t=[],e=[],n=[],i=s,r=s-hs+1+Yc.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>s-hs?l=Yc[o-s+hs-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,T=new Float32Array(_*g*p),w=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let I=0;I<p;I++){let P=I%3*2/3-1,L=I>2?0:-1,b=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];T.set(b,_*g*I),w.set(d,m*g*I);let M=[I,I,I,I,I,I];x.set(M,f*g*I)}let C=new jn;C.setAttribute("position",new Xe(T,_)),C.setAttribute("uv",new Xe(w,m)),C.setAttribute("faceIndex",new Xe(x,f)),t.push(C),i>hs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $c(s,t,e){let n=new vn(s,t,e);return n.texture.mapping=Hs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bo(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function _p(s,t,e){let n=new Float32Array(Ci),i=new U(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ll(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Kc(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Jc(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function ll(){return`

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
	`}function vp(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===eo||l===no,h=l===bi||l===Si;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new ko(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new ko(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function yp(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&_i("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function xp(s,t,e,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let p in d)t.update(d[p],s.ARRAY_BUFFER)}function c(u){let d=[],p=u.index,g=u.attributes.position,_=0;if(p!==null){let T=p.array;_=p.version;for(let w=0,x=T.length;w<x;w+=3){let C=T[w+0],I=T[w+1],P=T[w+2];d.push(C,I,I,P,P,C)}}else if(g!==void 0){let T=g.array;_=g.version;for(let w=0,x=T.length/3-1;w<x;w+=3){let C=w+0,I=w+1,P=w+2;d.push(C,I,I,P,P,C)}}else return;let m=new(Va(d)?Is:Rs)(d,1);m.version=_;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Mp(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){s.drawElements(n,p,r,d*o),e.update(p,n,1)}function c(d,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,d*o,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let T=0;T<g;T++)f+=p[T]*_[T];e.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bp(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Sp(s,t,e){let n=new WeakMap,i=new _e;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let M=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();let g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,I=1;C>t.maxTextureSize&&(I=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);let P=new Float32Array(C*I*4*u),L=new Cs(P,C,I,u);L.type=wn,L.needsUpdate=!0;let b=x*4;for(let E=0;E<u;E++){let W=f[E],k=T[E],X=w[E],Z=C*I*4*E;for(let Y=0;Y<W.count;Y++){let $=Y*b;g===!0&&(i.fromBufferAttribute(W,Y),P[Z+$+0]=i.x,P[Z+$+1]=i.y,P[Z+$+2]=i.z,P[Z+$+3]=0),_===!0&&(i.fromBufferAttribute(k,Y),P[Z+$+4]=i.x,P[Z+$+5]=i.y,P[Z+$+6]=i.z,P[Z+$+7]=0),m===!0&&(i.fromBufferAttribute(X,Y),P[Z+$+8]=i.x,P[Z+$+9]=i.y,P[Z+$+10]=i.z,P[Z+$+11]=X.itemSize===4?i.w:1)}}d={count:u,texture:L,size:new Gt(C,I)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];let _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function wp(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var gh=new qe,jc=new Fs(1,1),_h=new Cs,vh=new Rr,yh=new Os,Qc=[],th=[],eh=new Float32Array(16),nh=new Float32Array(9),ih=new Float32Array(4);function ds(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Qc[i];if(r===void 0&&(r=new Float32Array(i),Qc[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function we(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Te(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Go(s,t){let e=th[t];e===void 0&&(e=new Int32Array(t),th[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Tp(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Ep(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2fv(this.addr,t),Te(e,t)}}function Ap(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;s.uniform3fv(this.addr,t),Te(e,t)}}function Cp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4fv(this.addr,t),Te(e,t)}}function Pp(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;ih.set(n),s.uniformMatrix2fv(this.addr,!1,ih),Te(e,n)}}function Rp(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;nh.set(n),s.uniformMatrix3fv(this.addr,!1,nh),Te(e,n)}}function Ip(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(we(e,n))return;eh.set(n),s.uniformMatrix4fv(this.addr,!1,eh),Te(e,n)}}function Dp(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Op(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2iv(this.addr,t),Te(e,t)}}function Lp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3iv(this.addr,t),Te(e,t)}}function Fp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4iv(this.addr,t),Te(e,t)}}function Up(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Np(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2uiv(this.addr,t),Te(e,t)}}function Bp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3uiv(this.addr,t),Te(e,t)}}function zp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4uiv(this.addr,t),Te(e,t)}}function kp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(jc.compareFunction=za,r=jc):r=gh,e.setTexture2D(t||r,i)}function Hp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||vh,i)}function Vp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||yh,i)}function Gp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||_h,i)}function Wp(s){switch(s){case 5126:return Tp;case 35664:return Ep;case 35665:return Ap;case 35666:return Cp;case 35674:return Pp;case 35675:return Rp;case 35676:return Ip;case 5124:case 35670:return Dp;case 35667:case 35671:return Op;case 35668:case 35672:return Lp;case 35669:case 35673:return Fp;case 5125:return Up;case 36294:return Np;case 36295:return Bp;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Hp;case 35680:case 36300:case 36308:case 36293:return Vp;case 36289:case 36303:case 36311:case 36292:return Gp}}function Xp(s,t){s.uniform1fv(this.addr,t)}function Yp(s,t){let e=ds(t,this.size,2);s.uniform2fv(this.addr,e)}function qp(s,t){let e=ds(t,this.size,3);s.uniform3fv(this.addr,e)}function Zp(s,t){let e=ds(t,this.size,4);s.uniform4fv(this.addr,e)}function $p(s,t){let e=ds(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Kp(s,t){let e=ds(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Jp(s,t){let e=ds(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function jp(s,t){s.uniform1iv(this.addr,t)}function Qp(s,t){s.uniform2iv(this.addr,t)}function tm(s,t){s.uniform3iv(this.addr,t)}function em(s,t){s.uniform4iv(this.addr,t)}function nm(s,t){s.uniform1uiv(this.addr,t)}function im(s,t){s.uniform2uiv(this.addr,t)}function sm(s,t){s.uniform3uiv(this.addr,t)}function rm(s,t){s.uniform4uiv(this.addr,t)}function om(s,t,e){let n=this.cache,i=t.length,r=Go(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||gh,r[o])}function am(s,t,e){let n=this.cache,i=t.length,r=Go(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||vh,r[o])}function lm(s,t,e){let n=this.cache,i=t.length,r=Go(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||yh,r[o])}function cm(s,t,e){let n=this.cache,i=t.length,r=Go(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||_h,r[o])}function hm(s){switch(s){case 5126:return Xp;case 35664:return Yp;case 35665:return qp;case 35666:return Zp;case 35674:return $p;case 35675:return Kp;case 35676:return Jp;case 5124:case 35670:return jp;case 35667:case 35671:return Qp;case 35668:case 35672:return tm;case 35669:case 35673:return em;case 5125:return nm;case 36294:return im;case 36295:return sm;case 36296:return rm;case 35678:case 36198:case 36298:case 36306:case 35682:return om;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return lm;case 36289:case 36303:case 36311:case 36292:return cm}}var tl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wp(e.type)}},el=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hm(e.type)}},nl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Qa=/(\w+)(\])?(\[|\.)?/g;function sh(s,t){s.seq.push(t),s.map[t.id]=t}function um(s,t,e){let n=s.name,i=n.length;for(Qa.lastIndex=0;;){let r=Qa.exec(n),o=Qa.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){sh(e,c===void 0?new tl(a,s,t):new el(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new nl(a),sh(e,u)),e=u}}}var us=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);um(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function rh(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var dm=37297,fm=0;function pm(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var oh=new Ot;function mm(s){Yt._getMatrix(oh,Yt.workingColorSpace,s);let t=`mat3( ${oh.elements.map(e=>e.toFixed(4))} )`;switch(Yt.getTransfer(s)){case Es:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function ah(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+pm(s.getShaderSource(t),a)}else return r}function gm(s,t){let e=mm(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function _m(s,t){let e;switch(t){case bc:e="Linear";break;case Sc:e="Reinhard";break;case wc:e="Cineon";break;case Tc:e="ACESFilmic";break;case Ac:e="AgX";break;case Cc:e="Neutral";break;case Ec:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var zo=new U;function vm(){Yt.getLuminanceCoefficients(zo);let s=zo.x.toFixed(4),t=zo.y.toFixed(4),e=zo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ym(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function xm(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Mm(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Zs(s){return s!==""}function lh(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ch(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bm=/^[ \t]*#include +<([\w\d./]+)>/gm;function il(s){return s.replace(bm,wm)}var Sm=new Map;function wm(s,t){let e=Ft[t];if(e===void 0){let n=Sm.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return il(e)}var Tm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hh(s){return s.replace(Tm,Em)}function Em(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function uh(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function Am(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ea?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ec?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function Cm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case bi:case Si:t="ENVMAP_TYPE_CUBE";break;case Hs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Pm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Si:t="ENVMAP_MODE_REFRACTION";break}return t}function Rm(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ra:t="ENVMAP_BLENDING_MULTIPLY";break;case xc:t="ENVMAP_BLENDING_MIX";break;case Mc:t="ENVMAP_BLENDING_ADD";break}return t}function Im(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Dm(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Am(e),c=Cm(e),h=Pm(e),u=Rm(e),d=Im(e),p=ym(e),g=xm(r),_=i.createProgram(),m,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),f.length>0&&(f+=`
`)):(m=[uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),f=[uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==kn?"#define TONE_MAPPING":"",e.toneMapping!==kn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==kn?_m("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,gm("linearToOutputTexel",e.outputColorSpace),vm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zs).join(`
`)),o=il(o),o=lh(o,e),o=ch(o,e),a=il(a),a=lh(a,e),a=ch(a,e),o=hh(o),a=hh(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let w=T+m+o,x=T+f+a,C=rh(i,i.VERTEX_SHADER,w),I=rh(i,i.FRAGMENT_SHADER,x);i.attachShader(_,C),i.attachShader(_,I),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(E){if(s.debug.checkShaderErrors){let W=i.getProgramInfoLog(_)||"",k=i.getShaderInfoLog(C)||"",X=i.getShaderInfoLog(I)||"",Z=W.trim(),Y=k.trim(),$=X.trim(),z=!0,ot=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,I);else{let ut=ah(i,C,"vertex"),bt=ah(i,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+Z+`
`+ut+`
`+bt)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(Y===""||$==="")&&(ot=!1);ot&&(E.diagnostics={runnable:z,programLog:Z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:$,prefix:f}})}i.deleteShader(C),i.deleteShader(I),L=new us(i,_),b=Mm(i,_)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,dm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=I,this}var Om=0,sl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new rl(t),e.set(t,n)),n}},rl=class{constructor(t){this.id=Om++,this.code=t,this.usedTimes=0}};function Lm(s,t,e,n,i,r,o){let a=new es,l=new sl,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,E,W,k){let X=W.fog,Z=k.geometry,Y=b.isMeshStandardMaterial?W.environment:null,$=(b.isMeshStandardMaterial?e:t).get(b.envMap||Y),z=$&&$.mapping===Hs?$.image.height:null,ot=g[b.type];b.precision!==null&&(p=i.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let ut=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,bt=ut!==void 0?ut.length:0,Ut=0;Z.morphAttributes.position!==void 0&&(Ut=1),Z.morphAttributes.normal!==void 0&&(Ut=2),Z.morphAttributes.color!==void 0&&(Ut=3);let oe,te,G,at;if(ot){let Kt=Tn[ot];oe=Kt.vertexShader,te=Kt.fragmentShader}else oe=b.vertexShader,te=b.fragmentShader,l.update(b),G=l.getVertexShaderID(b),at=l.getFragmentShaderID(b);let nt=s.getRenderTarget(),Et=s.state.buffers.depth.getReversed(),At=k.isInstancedMesh===!0,It=k.isBatchedMesh===!0,ve=!!b.map,Xt=!!b.matcap,A=!!$,ie=!!b.aoMap,wt=!!b.lightMap,$t=!!b.bumpMap,Mt=!!b.normalMap,ae=!!b.displacementMap,pt=!!b.emissiveMap,Nt=!!b.metalnessMap,Ee=!!b.roughnessMap,ye=b.anisotropy>0,S=b.clearcoat>0,v=b.dispersion>0,F=b.iridescence>0,V=b.sheen>0,K=b.transmission>0,H=ye&&!!b.anisotropyMap,xt=S&&!!b.clearcoatMap,et=S&&!!b.clearcoatNormalMap,_t=S&&!!b.clearcoatRoughnessMap,vt=F&&!!b.iridescenceMap,Q=F&&!!b.iridescenceThicknessMap,ht=V&&!!b.sheenColorMap,Pt=V&&!!b.sheenRoughnessMap,yt=!!b.specularMap,lt=!!b.specularColorMap,Lt=!!b.specularIntensityMap,R=K&&!!b.transmissionMap,tt=K&&!!b.thicknessMap,it=!!b.gradientMap,ft=!!b.alphaMap,J=b.alphaTest>0,q=!!b.alphaHash,gt=!!b.extensions,Dt=kn;b.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Dt=s.toneMapping);let se={shaderID:ot,shaderType:b.type,shaderName:b.name,vertexShader:oe,fragmentShader:te,defines:b.defines,customVertexShaderID:G,customFragmentShaderID:at,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:It,batchingColor:It&&k._colorsTexture!==null,instancing:At,instancingColor:At&&k.instanceColor!==null,instancingMorph:At&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:nt===null?s.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:gi,alphaToCoverage:!!b.alphaToCoverage,map:ve,matcap:Xt,envMap:A,envMapMode:A&&$.mapping,envMapCubeUVHeight:z,aoMap:ie,lightMap:wt,bumpMap:$t,normalMap:Mt,displacementMap:d&&ae,emissiveMap:pt,normalMapObjectSpace:Mt&&b.normalMapType===Oc,normalMapTangentSpace:Mt&&b.normalMapType===Dc,metalnessMap:Nt,roughnessMap:Ee,anisotropy:ye,anisotropyMap:H,clearcoat:S,clearcoatMap:xt,clearcoatNormalMap:et,clearcoatRoughnessMap:_t,dispersion:v,iridescence:F,iridescenceMap:vt,iridescenceThicknessMap:Q,sheen:V,sheenColorMap:ht,sheenRoughnessMap:Pt,specularMap:yt,specularColorMap:lt,specularIntensityMap:Lt,transmission:K,transmissionMap:R,thicknessMap:tt,gradientMap:it,opaque:b.transparent===!1&&b.blending===pi&&b.alphaToCoverage===!1,alphaMap:ft,alphaTest:J,alphaHash:q,combine:b.combine,mapUv:ve&&_(b.map.channel),aoMapUv:ie&&_(b.aoMap.channel),lightMapUv:wt&&_(b.lightMap.channel),bumpMapUv:$t&&_(b.bumpMap.channel),normalMapUv:Mt&&_(b.normalMap.channel),displacementMapUv:ae&&_(b.displacementMap.channel),emissiveMapUv:pt&&_(b.emissiveMap.channel),metalnessMapUv:Nt&&_(b.metalnessMap.channel),roughnessMapUv:Ee&&_(b.roughnessMap.channel),anisotropyMapUv:H&&_(b.anisotropyMap.channel),clearcoatMapUv:xt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:et&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&_(b.sheenRoughnessMap.channel),specularMapUv:yt&&_(b.specularMap.channel),specularColorMapUv:lt&&_(b.specularColorMap.channel),specularIntensityMapUv:Lt&&_(b.specularIntensityMap.channel),transmissionMapUv:R&&_(b.transmissionMap.channel),thicknessMapUv:tt&&_(b.thicknessMap.channel),alphaMapUv:ft&&_(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Mt||ye),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Z.attributes.uv&&(ve||ft),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Et,skinning:k.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ut,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&E.length>0,shadowMapType:s.shadowMap.type,toneMapping:Dt,decodeVideoTexture:ve&&b.map.isVideoTexture===!0&&Yt.getTransfer(b.map.colorSpace)===Jt,decodeVideoTextureEmissive:pt&&b.emissiveMap.isVideoTexture===!0&&Yt.getTransfer(b.emissiveMap.colorSpace)===Jt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Mn,flipSided:b.side===Ne,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:gt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&b.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return se.vertexUv1s=c.has(1),se.vertexUv2s=c.has(2),se.vertexUv3s=c.has(3),c.clear(),se}function f(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let E in b.defines)M.push(E),M.push(b.defines[E]);return b.isRawShaderMaterial===!1&&(T(M,b),w(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function T(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function w(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){let M=g[b.type],E;if(M){let W=Tn[M];E=Wc.clone(W.uniforms)}else E=b.uniforms;return E}function C(b,M){let E;for(let W=0,k=h.length;W<k;W++){let X=h[W];if(X.cacheKey===M){E=X,++E.usedTimes;break}}return E===void 0&&(E=new Dm(s,M,b,r),h.push(E)),E}function I(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function P(b){l.remove(b)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:C,releaseProgram:I,releaseShaderCache:P,programs:h,dispose:L}}function Fm(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Um(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function dh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function fh(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,p,g,_,m){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function a(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(u,d,p,g,_,m){let f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||Um),n.length>1&&n.sort(d||dh),i.length>1&&i.sort(d||dh)}function h(){for(let u=t,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Nm(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new fh,s.set(n,[o])):i>=r.length?(o=new fh,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Bm(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Wt};break;case"SpotLight":e={position:new U,direction:new U,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new U,halfWidth:new U,halfHeight:new U};break}return s[t.id]=e,e}}}function zm(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var km=0;function Hm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Vm(s){let t=new Bm,e=zm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let i=new U,r=new ge,o=new ge;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,T=0,w=0,x=0,C=0,I=0,P=0;c.sort(Hm);for(let b=0,M=c.length;b<M;b++){let E=c[b],W=E.color,k=E.intensity,X=E.distance,Z=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=W.r*k,u+=W.g*k,d+=W.b*k;else if(E.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(E.sh.coefficients[Y],k);P++}else if(E.isDirectionalLight){let Y=t.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){let $=E.shadow,z=e.get(E);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=E.shadow.matrix,T++}n.directional[p]=Y,p++}else if(E.isSpotLight){let Y=t.get(E);Y.position.setFromMatrixPosition(E.matrixWorld),Y.color.copy(W).multiplyScalar(k),Y.distance=X,Y.coneCos=Math.cos(E.angle),Y.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),Y.decay=E.decay,n.spot[_]=Y;let $=E.shadow;if(E.map&&(n.spotLightMap[C]=E.map,C++,$.updateMatrices(E),E.castShadow&&I++),n.spotLightMatrix[_]=$.matrix,E.castShadow){let z=e.get(E);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=Z,x++}_++}else if(E.isRectAreaLight){let Y=t.get(E);Y.color.copy(W).multiplyScalar(k),Y.halfWidth.set(E.width*.5,0,0),Y.halfHeight.set(0,E.height*.5,0),n.rectArea[m]=Y,m++}else if(E.isPointLight){let Y=t.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),Y.distance=E.distance,Y.decay=E.decay,E.castShadow){let $=E.shadow,z=e.get(E);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,z.shadowCameraNear=$.camera.near,z.shadowCameraFar=$.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=E.shadow.matrix,w++}n.point[g]=Y,g++}else if(E.isHemisphereLight){let Y=t.get(E);Y.skyColor.copy(E.color).multiplyScalar(k),Y.groundColor.copy(E.groundColor).multiplyScalar(k),n.hemi[f]=Y,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==f||L.numDirectionalShadows!==T||L.numPointShadows!==w||L.numSpotShadows!==x||L.numSpotMaps!==C||L.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=x+C-I,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=P,L.directionalLength=p,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=f,L.numDirectionalShadows=T,L.numPointShadows=w,L.numSpotShadows=x,L.numSpotMaps=C,L.numLightProbes=P,n.version=km++)}function l(c,h){let u=0,d=0,p=0,g=0,_=0,m=h.matrixWorldInverse;for(let f=0,T=c.length;f<T;f++){let w=c[f];if(w.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(w.isSpotLight){let x=n.spot[p];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(w.matrixWorld),i.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(w.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(w.width*.5,0,0),x.halfHeight.set(0,w.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(w.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function ph(s){let t=new Vm(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Gm(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new ph(s),t.set(i,[a])):r>=o.length?(a=new ph(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xm=`uniform sampler2D shadow_pass;
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
}`;function Ym(s,t,e){let n=new yi,i=new Gt,r=new Gt,o=new _e,a=new Or({depthPacking:Ic}),l=new Lr,c={},h=e.maxTextureSize,u={[Fn]:Ne,[Ne]:Fn,[Mn]:Mn},d=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:Wm,fragmentShader:Xm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new jn;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new De(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ea;let f=this.type;this.render=function(I,P,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;let b=s.getRenderTarget(),M=s.getActiveCubeFace(),E=s.getActiveMipmapLevel(),W=s.state;W.setBlending(zn),W.buffers.depth.getReversed()?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let k=f!==xn&&this.type===xn,X=f===xn&&this.type!==xn;for(let Z=0,Y=I.length;Z<Y;Z++){let $=I[Z],z=$.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);let ot=z.getFrameExtents();if(i.multiply(ot),r.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ot.x),i.x=r.x*ot.x,z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ot.y),i.y=r.y*ot.y,z.mapSize.y=r.y)),z.map===null||k===!0||X===!0){let bt=this.type!==xn?{minFilter:tn,magFilter:tn}:{};z.map!==null&&z.map.dispose(),z.map=new vn(i.x,i.y,bt),z.map.texture.name=$.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();let ut=z.getViewportCount();for(let bt=0;bt<ut;bt++){let Ut=z.getViewport(bt);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),W.viewport(o),z.updateMatrices($,bt),n=z.getFrustum(),x(P,L,z.camera,$,this.type)}z.isPointLightShadow!==!0&&this.type===xn&&T(z,L),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(b,M,E)};function T(I,P){let L=t.update(_);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new vn(i.x,i.y)),d.uniforms.shadow_pass.value=I.map.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(P,null,L,d,_,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(P,null,L,p,_,null)}function w(I,P,L,b){let M=null,E=L.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(E!==void 0)M=E;else if(M=L.isPointLight===!0?l:a,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let W=M.uuid,k=P.uuid,X=c[W];X===void 0&&(X={},c[W]=X);let Z=X[k];Z===void 0&&(Z=M.clone(),X[k]=Z,P.addEventListener("dispose",C)),M=Z}if(M.visible=P.visible,M.wireframe=P.wireframe,b===xn?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:u[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let W=s.properties.get(M);W.light=L}return M}function x(I,P,L,b,M){if(I.visible===!1)return;if(I.layers.test(P.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&M===xn)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,I.matrixWorld);let k=t.update(I),X=I.material;if(Array.isArray(X)){let Z=k.groups;for(let Y=0,$=Z.length;Y<$;Y++){let z=Z[Y],ot=X[z.materialIndex];if(ot&&ot.visible){let ut=w(I,ot,b,M);I.onBeforeShadow(s,I,P,L,k,ut,z),s.renderBufferDirect(L,null,k,ut,I,z),I.onAfterShadow(s,I,P,L,k,ut,z)}}}else if(X.visible){let Z=w(I,X,b,M);I.onBeforeShadow(s,I,P,L,k,Z,null),s.renderBufferDirect(L,null,k,Z,I,null),I.onAfterShadow(s,I,P,L,k,Z,null)}}let W=I.children;for(let k=0,X=W.length;k<X;k++)x(W[k],P,L,b,M)}function C(I){I.target.removeEventListener("dispose",C);for(let L in c){let b=c[L],M=I.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var qm={[Zr]:$r,[Kr]:Qr,[Jr]:to,[mi]:jr,[$r]:Zr,[Qr]:Kr,[to]:Jr,[jr]:mi};function Zm(s,t){function e(){let R=!1,tt=new _e,it=null,ft=new _e(0,0,0,0);return{setMask:function(J){it!==J&&!R&&(s.colorMask(J,J,J,J),it=J)},setLocked:function(J){R=J},setClear:function(J,q,gt,Dt,se){se===!0&&(J*=Dt,q*=Dt,gt*=Dt),tt.set(J,q,gt,Dt),ft.equals(tt)===!1&&(s.clearColor(J,q,gt,Dt),ft.copy(tt))},reset:function(){R=!1,it=null,ft.set(-1,0,0,0)}}}function n(){let R=!1,tt=!1,it=null,ft=null,J=null;return{setReversed:function(q){if(tt!==q){let gt=t.get("EXT_clip_control");q?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),tt=q;let Dt=J;J=null,this.setClear(Dt)}},getReversed:function(){return tt},setTest:function(q){q?nt(s.DEPTH_TEST):Et(s.DEPTH_TEST)},setMask:function(q){it!==q&&!R&&(s.depthMask(q),it=q)},setFunc:function(q){if(tt&&(q=qm[q]),ft!==q){switch(q){case Zr:s.depthFunc(s.NEVER);break;case $r:s.depthFunc(s.ALWAYS);break;case Kr:s.depthFunc(s.LESS);break;case mi:s.depthFunc(s.LEQUAL);break;case Jr:s.depthFunc(s.EQUAL);break;case jr:s.depthFunc(s.GEQUAL);break;case Qr:s.depthFunc(s.GREATER);break;case to:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ft=q}},setLocked:function(q){R=q},setClear:function(q){J!==q&&(tt&&(q=1-q),s.clearDepth(q),J=q)},reset:function(){R=!1,it=null,ft=null,J=null,tt=!1}}}function i(){let R=!1,tt=null,it=null,ft=null,J=null,q=null,gt=null,Dt=null,se=null;return{setTest:function(Kt){R||(Kt?nt(s.STENCIL_TEST):Et(s.STENCIL_TEST))},setMask:function(Kt){tt!==Kt&&!R&&(s.stencilMask(Kt),tt=Kt)},setFunc:function(Kt,En,fn){(it!==Kt||ft!==En||J!==fn)&&(s.stencilFunc(Kt,En,fn),it=Kt,ft=En,J=fn)},setOp:function(Kt,En,fn){(q!==Kt||gt!==En||Dt!==fn)&&(s.stencilOp(Kt,En,fn),q=Kt,gt=En,Dt=fn)},setLocked:function(Kt){R=Kt},setClear:function(Kt){se!==Kt&&(s.clearStencil(Kt),se=Kt)},reset:function(){R=!1,tt=null,it=null,ft=null,J=null,q=null,gt=null,Dt=null,se=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,T=null,w=null,x=null,C=null,I=null,P=new Wt(0,0,0),L=0,b=!1,M=null,E=null,W=null,k=null,X=null,Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,$=0,z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(z)[1]),Y=$>=1):z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),Y=$>=2);let ot=null,ut={},bt=s.getParameter(s.SCISSOR_BOX),Ut=s.getParameter(s.VIEWPORT),oe=new _e().fromArray(bt),te=new _e().fromArray(Ut);function G(R,tt,it,ft){let J=new Uint8Array(4),q=s.createTexture();s.bindTexture(R,q),s.texParameteri(R,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(R,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let gt=0;gt<it;gt++)R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY?s.texImage3D(tt,0,s.RGBA,1,1,ft,0,s.RGBA,s.UNSIGNED_BYTE,J):s.texImage2D(tt+gt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,J);return q}let at={};at[s.TEXTURE_2D]=G(s.TEXTURE_2D,s.TEXTURE_2D,1),at[s.TEXTURE_CUBE_MAP]=G(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[s.TEXTURE_2D_ARRAY]=G(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),at[s.TEXTURE_3D]=G(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(s.DEPTH_TEST),o.setFunc(mi),$t(!1),Mt(Ta),nt(s.CULL_FACE),ie(zn);function nt(R){h[R]!==!0&&(s.enable(R),h[R]=!0)}function Et(R){h[R]!==!1&&(s.disable(R),h[R]=!1)}function At(R,tt){return u[R]!==tt?(s.bindFramebuffer(R,tt),u[R]=tt,R===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=tt),R===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=tt),!0):!1}function It(R,tt){let it=p,ft=!1;if(R){it=d.get(tt),it===void 0&&(it=[],d.set(tt,it));let J=R.textures;if(it.length!==J.length||it[0]!==s.COLOR_ATTACHMENT0){for(let q=0,gt=J.length;q<gt;q++)it[q]=s.COLOR_ATTACHMENT0+q;it.length=J.length,ft=!0}}else it[0]!==s.BACK&&(it[0]=s.BACK,ft=!0);ft&&s.drawBuffers(it)}function ve(R){return g!==R?(s.useProgram(R),g=R,!0):!1}let Xt={[Jn]:s.FUNC_ADD,[ic]:s.FUNC_SUBTRACT,[sc]:s.FUNC_REVERSE_SUBTRACT};Xt[rc]=s.MIN,Xt[oc]=s.MAX;let A={[ac]:s.ZERO,[lc]:s.ONE,[cc]:s.SRC_COLOR,[Sr]:s.SRC_ALPHA,[mc]:s.SRC_ALPHA_SATURATE,[fc]:s.DST_COLOR,[uc]:s.DST_ALPHA,[hc]:s.ONE_MINUS_SRC_COLOR,[wr]:s.ONE_MINUS_SRC_ALPHA,[pc]:s.ONE_MINUS_DST_COLOR,[dc]:s.ONE_MINUS_DST_ALPHA,[gc]:s.CONSTANT_COLOR,[_c]:s.ONE_MINUS_CONSTANT_COLOR,[vc]:s.CONSTANT_ALPHA,[yc]:s.ONE_MINUS_CONSTANT_ALPHA};function ie(R,tt,it,ft,J,q,gt,Dt,se,Kt){if(R===zn){_===!0&&(Et(s.BLEND),_=!1);return}if(_===!1&&(nt(s.BLEND),_=!0),R!==nc){if(R!==m||Kt!==b){if((f!==Jn||x!==Jn)&&(s.blendEquation(s.FUNC_ADD),f=Jn,x=Jn),Kt)switch(R){case pi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Aa:s.blendFunc(s.ONE,s.ONE);break;case Ca:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pa:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case pi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Aa:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ca:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,w=null,C=null,I=null,P.set(0,0,0),L=0,m=R,b=Kt}return}J=J||tt,q=q||it,gt=gt||ft,(tt!==f||J!==x)&&(s.blendEquationSeparate(Xt[tt],Xt[J]),f=tt,x=J),(it!==T||ft!==w||q!==C||gt!==I)&&(s.blendFuncSeparate(A[it],A[ft],A[q],A[gt]),T=it,w=ft,C=q,I=gt),(Dt.equals(P)===!1||se!==L)&&(s.blendColor(Dt.r,Dt.g,Dt.b,se),P.copy(Dt),L=se),m=R,b=!1}function wt(R,tt){R.side===Mn?Et(s.CULL_FACE):nt(s.CULL_FACE);let it=R.side===Ne;tt&&(it=!it),$t(it),R.blending===pi&&R.transparent===!1?ie(zn):ie(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),r.setMask(R.colorWrite);let ft=R.stencilWrite;a.setTest(ft),ft&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),pt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?nt(s.SAMPLE_ALPHA_TO_COVERAGE):Et(s.SAMPLE_ALPHA_TO_COVERAGE)}function $t(R){M!==R&&(R?s.frontFace(s.CW):s.frontFace(s.CCW),M=R)}function Mt(R){R!==Ql?(nt(s.CULL_FACE),R!==E&&(R===Ta?s.cullFace(s.BACK):R===tc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Et(s.CULL_FACE),E=R}function ae(R){R!==W&&(Y&&s.lineWidth(R),W=R)}function pt(R,tt,it){R?(nt(s.POLYGON_OFFSET_FILL),(k!==tt||X!==it)&&(s.polygonOffset(tt,it),k=tt,X=it)):Et(s.POLYGON_OFFSET_FILL)}function Nt(R){R?nt(s.SCISSOR_TEST):Et(s.SCISSOR_TEST)}function Ee(R){R===void 0&&(R=s.TEXTURE0+Z-1),ot!==R&&(s.activeTexture(R),ot=R)}function ye(R,tt,it){it===void 0&&(ot===null?it=s.TEXTURE0+Z-1:it=ot);let ft=ut[it];ft===void 0&&(ft={type:void 0,texture:void 0},ut[it]=ft),(ft.type!==R||ft.texture!==tt)&&(ot!==it&&(s.activeTexture(it),ot=it),s.bindTexture(R,tt||at[R]),ft.type=R,ft.texture=tt)}function S(){let R=ut[ot];R!==void 0&&R.type!==void 0&&(s.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function v(){try{s.compressedTexImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function F(){try{s.compressedTexImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function V(){try{s.texSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function K(){try{s.texSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xt(){try{s.compressedTexSubImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function et(){try{s.texStorage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function _t(){try{s.texStorage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function vt(){try{s.texImage2D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{s.texImage3D(...arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ht(R){oe.equals(R)===!1&&(s.scissor(R.x,R.y,R.z,R.w),oe.copy(R))}function Pt(R){te.equals(R)===!1&&(s.viewport(R.x,R.y,R.z,R.w),te.copy(R))}function yt(R,tt){let it=c.get(tt);it===void 0&&(it=new WeakMap,c.set(tt,it));let ft=it.get(R);ft===void 0&&(ft=s.getUniformBlockIndex(tt,R.name),it.set(R,ft))}function lt(R,tt){let ft=c.get(tt).get(R);l.get(tt)!==ft&&(s.uniformBlockBinding(tt,ft,R.__bindingPointIndex),l.set(tt,ft))}function Lt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ot=null,ut={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,T=null,w=null,x=null,C=null,I=null,P=new Wt(0,0,0),L=0,b=!1,M=null,E=null,W=null,k=null,X=null,oe.set(0,0,s.canvas.width,s.canvas.height),te.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:Et,bindFramebuffer:At,drawBuffers:It,useProgram:ve,setBlending:ie,setMaterial:wt,setFlipSided:$t,setCullFace:Mt,setLineWidth:ae,setPolygonOffset:pt,setScissorTest:Nt,activeTexture:Ee,bindTexture:ye,unbindTexture:S,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:vt,texImage3D:Q,updateUBOMapping:yt,uniformBlockBinding:lt,texStorage2D:et,texStorage3D:_t,texSubImage2D:V,texSubImage3D:K,compressedTexSubImage2D:H,compressedTexSubImage3D:xt,scissor:ht,viewport:Pt,reset:Lt}}function $m(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,v){return p?new OffscreenCanvas(S,v):ji("canvas")}function _(S,v,F){let V=1,K=ye(S);if((K.width>F||K.height>F)&&(V=F/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let H=Math.floor(V*K.width),xt=Math.floor(V*K.height);u===void 0&&(u=g(H,xt));let et=v?g(H,xt):u;return et.width=H,et.height=xt,et.getContext("2d").drawImage(S,0,0,H,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+H+"x"+xt+")."),et}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),S;return S}function m(S){return S.generateMipmaps}function f(S){s.generateMipmap(S)}function T(S){return S.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?s.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(S,v,F,V,K=!1){if(S!==null){if(s[S]!==void 0)return s[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let H=v;if(v===s.RED&&(F===s.FLOAT&&(H=s.R32F),F===s.HALF_FLOAT&&(H=s.R16F),F===s.UNSIGNED_BYTE&&(H=s.R8)),v===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(H=s.R8UI),F===s.UNSIGNED_SHORT&&(H=s.R16UI),F===s.UNSIGNED_INT&&(H=s.R32UI),F===s.BYTE&&(H=s.R8I),F===s.SHORT&&(H=s.R16I),F===s.INT&&(H=s.R32I)),v===s.RG&&(F===s.FLOAT&&(H=s.RG32F),F===s.HALF_FLOAT&&(H=s.RG16F),F===s.UNSIGNED_BYTE&&(H=s.RG8)),v===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(H=s.RG8UI),F===s.UNSIGNED_SHORT&&(H=s.RG16UI),F===s.UNSIGNED_INT&&(H=s.RG32UI),F===s.BYTE&&(H=s.RG8I),F===s.SHORT&&(H=s.RG16I),F===s.INT&&(H=s.RG32I)),v===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(H=s.RGB8UI),F===s.UNSIGNED_SHORT&&(H=s.RGB16UI),F===s.UNSIGNED_INT&&(H=s.RGB32UI),F===s.BYTE&&(H=s.RGB8I),F===s.SHORT&&(H=s.RGB16I),F===s.INT&&(H=s.RGB32I)),v===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(H=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(H=s.RGBA16UI),F===s.UNSIGNED_INT&&(H=s.RGBA32UI),F===s.BYTE&&(H=s.RGBA8I),F===s.SHORT&&(H=s.RGBA16I),F===s.INT&&(H=s.RGBA32I)),v===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(H=s.RGB9_E5),v===s.RGBA){let xt=K?Es:Yt.getTransfer(V);F===s.FLOAT&&(H=s.RGBA32F),F===s.HALF_FLOAT&&(H=s.RGBA16F),F===s.UNSIGNED_BYTE&&(H=xt===Jt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(H=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(H=s.RGB5_A1)}return(H===s.R16F||H===s.R32F||H===s.RG16F||H===s.RG32F||H===s.RGBA16F||H===s.RGBA32F)&&t.get("EXT_color_buffer_float"),H}function x(S,v){let F;return S?v===null||v===ei||v===os?F=s.DEPTH24_STENCIL8:v===wn?F=s.DEPTH32F_STENCIL8:v===ss&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ei||v===os?F=s.DEPTH_COMPONENT24:v===wn?F=s.DEPTH_COMPONENT32F:v===ss&&(F=s.DEPTH_COMPONENT16),F}function C(S,v){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==tn&&S.minFilter!==Ue?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function I(S){let v=S.target;v.removeEventListener("dispose",I),L(v),v.isVideoTexture&&h.delete(v)}function P(S){let v=S.target;v.removeEventListener("dispose",P),M(v)}function L(S){let v=n.get(S);if(v.__webglInit===void 0)return;let F=S.source,V=d.get(F);if(V){let K=V[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(S),Object.keys(V).length===0&&d.delete(F)}n.remove(S)}function b(S){let v=n.get(S);s.deleteTexture(v.__webglTexture);let F=S.source,V=d.get(F);delete V[v.__cacheKey],o.memory.textures--}function M(S){let v=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let K=0;K<v.__webglFramebuffer[V].length;K++)s.deleteFramebuffer(v.__webglFramebuffer[V][K]);else s.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)s.deleteFramebuffer(v.__webglFramebuffer[V]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let F=S.textures;for(let V=0,K=F.length;V<K;V++){let H=n.get(F[V]);H.__webglTexture&&(s.deleteTexture(H.__webglTexture),o.memory.textures--),n.remove(F[V])}n.remove(S)}let E=0;function W(){E=0}function k(){let S=E;return S>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+i.maxTextures),E+=1,S}function X(S){let v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function Z(S,v){let F=n.get(S);if(S.isVideoTexture&&Nt(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&F.__version!==S.version){let V=S.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(F,S,v);return}}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+v)}function Y(S,v){let F=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){at(F,S,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+v)}function $(S,v){let F=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){at(F,S,v);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+v)}function z(S,v){let F=n.get(S);if(S.version>0&&F.__version!==S.version){nt(F,S,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+v)}let ot={[Tr]:s.REPEAT,[gn]:s.CLAMP_TO_EDGE,[Er]:s.MIRRORED_REPEAT},ut={[tn]:s.NEAREST,[Pc]:s.NEAREST_MIPMAP_NEAREST,[Vs]:s.NEAREST_MIPMAP_LINEAR,[Ue]:s.LINEAR,[io]:s.LINEAR_MIPMAP_NEAREST,[bn]:s.LINEAR_MIPMAP_LINEAR},bt={[Lc]:s.NEVER,[kc]:s.ALWAYS,[Fc]:s.LESS,[za]:s.LEQUAL,[Uc]:s.EQUAL,[zc]:s.GEQUAL,[Nc]:s.GREATER,[Bc]:s.NOTEQUAL};function Ut(S,v){if(v.type===wn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Ue||v.magFilter===io||v.magFilter===Vs||v.magFilter===bn||v.minFilter===Ue||v.minFilter===io||v.minFilter===Vs||v.minFilter===bn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(S,s.TEXTURE_WRAP_S,ot[v.wrapS]),s.texParameteri(S,s.TEXTURE_WRAP_T,ot[v.wrapT]),(S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY)&&s.texParameteri(S,s.TEXTURE_WRAP_R,ot[v.wrapR]),s.texParameteri(S,s.TEXTURE_MAG_FILTER,ut[v.magFilter]),s.texParameteri(S,s.TEXTURE_MIN_FILTER,ut[v.minFilter]),v.compareFunction&&(s.texParameteri(S,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(S,s.TEXTURE_COMPARE_FUNC,bt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===tn||v.minFilter!==Vs&&v.minFilter!==bn||v.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(S,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function oe(S,v){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",I));let V=v.source,K=d.get(V);K===void 0&&(K={},d.set(V,K));let H=X(v);if(H!==S.__cacheKey){K[H]===void 0&&(K[H]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[H].usedTimes++;let xt=K[S.__cacheKey];xt!==void 0&&(K[S.__cacheKey].usedTimes--,xt.usedTimes===0&&b(v)),S.__cacheKey=H,S.__webglTexture=K[H].texture}return F}function te(S,v,F){return Math.floor(Math.floor(S/F)/v)}function G(S,v,F,V){let H=S.updateRanges;if(H.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,F,V,v.data);else{H.sort((Q,ht)=>Q.start-ht.start);let xt=0;for(let Q=1;Q<H.length;Q++){let ht=H[xt],Pt=H[Q],yt=ht.start+ht.count,lt=te(Pt.start,v.width,4),Lt=te(ht.start,v.width,4);Pt.start<=yt+1&&lt===Lt&&te(Pt.start+Pt.count-1,v.width,4)===lt?ht.count=Math.max(ht.count,Pt.start+Pt.count-ht.start):(++xt,H[xt]=Pt)}H.length=xt+1;let et=s.getParameter(s.UNPACK_ROW_LENGTH),_t=s.getParameter(s.UNPACK_SKIP_PIXELS),vt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let Q=0,ht=H.length;Q<ht;Q++){let Pt=H[Q],yt=Math.floor(Pt.start/4),lt=Math.ceil(Pt.count/4),Lt=yt%v.width,R=Math.floor(yt/v.width),tt=lt,it=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Lt),s.pixelStorei(s.UNPACK_SKIP_ROWS,R),e.texSubImage2D(s.TEXTURE_2D,0,Lt,R,tt,it,F,V,v.data)}S.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,et),s.pixelStorei(s.UNPACK_SKIP_PIXELS,_t),s.pixelStorei(s.UNPACK_SKIP_ROWS,vt)}}function at(S,v,F){let V=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=s.TEXTURE_3D);let K=oe(S,v),H=v.source;e.bindTexture(V,S.__webglTexture,s.TEXTURE0+F);let xt=n.get(H);if(H.version!==xt.__version||K===!0){e.activeTexture(s.TEXTURE0+F);let et=Yt.getPrimaries(Yt.workingColorSpace),_t=v.colorSpace===Hn?null:Yt.getPrimaries(v.colorSpace),vt=v.colorSpace===Hn||et===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Q=_(v.image,!1,i.maxTextureSize);Q=Ee(v,Q);let ht=r.convert(v.format,v.colorSpace),Pt=r.convert(v.type),yt=w(v.internalFormat,ht,Pt,v.colorSpace,v.isVideoTexture);Ut(V,v);let lt,Lt=v.mipmaps,R=v.isVideoTexture!==!0,tt=xt.__version===void 0||K===!0,it=H.dataReady,ft=C(v,Q);if(v.isDepthTexture)yt=x(v.format===as,v.type),tt&&(R?e.texStorage2D(s.TEXTURE_2D,1,yt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,yt,Q.width,Q.height,0,ht,Pt,null));else if(v.isDataTexture)if(Lt.length>0){R&&tt&&e.texStorage2D(s.TEXTURE_2D,ft,yt,Lt[0].width,Lt[0].height);for(let J=0,q=Lt.length;J<q;J++)lt=Lt[J],R?it&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,Pt,lt.data):e.texImage2D(s.TEXTURE_2D,J,yt,lt.width,lt.height,0,ht,Pt,lt.data);v.generateMipmaps=!1}else R?(tt&&e.texStorage2D(s.TEXTURE_2D,ft,yt,Q.width,Q.height),it&&G(v,Q,ht,Pt)):e.texImage2D(s.TEXTURE_2D,0,yt,Q.width,Q.height,0,ht,Pt,Q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){R&&tt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,yt,Lt[0].width,Lt[0].height,Q.depth);for(let J=0,q=Lt.length;J<q;J++)if(lt=Lt[J],v.format!==nn)if(ht!==null)if(R){if(it)if(v.layerUpdates.size>0){let gt=qa(lt.width,lt.height,v.format,v.type);for(let Dt of v.layerUpdates){let se=lt.data.subarray(Dt*gt/lt.data.BYTES_PER_ELEMENT,(Dt+1)*gt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,Dt,lt.width,lt.height,1,ht,se)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,Q.depth,ht,lt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,yt,lt.width,lt.height,Q.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?it&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,Q.depth,ht,Pt,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,J,yt,lt.width,lt.height,Q.depth,0,ht,Pt,lt.data)}else{R&&tt&&e.texStorage2D(s.TEXTURE_2D,ft,yt,Lt[0].width,Lt[0].height);for(let J=0,q=Lt.length;J<q;J++)lt=Lt[J],v.format!==nn?ht!==null?R?it&&e.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,J,yt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?it&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,lt.width,lt.height,ht,Pt,lt.data):e.texImage2D(s.TEXTURE_2D,J,yt,lt.width,lt.height,0,ht,Pt,lt.data)}else if(v.isDataArrayTexture)if(R){if(tt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,yt,Q.width,Q.height,Q.depth),it)if(v.layerUpdates.size>0){let J=qa(Q.width,Q.height,v.format,v.type);for(let q of v.layerUpdates){let gt=Q.data.subarray(q*J/Q.data.BYTES_PER_ELEMENT,(q+1)*J/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,ht,Pt,gt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,Pt,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,yt,Q.width,Q.height,Q.depth,0,ht,Pt,Q.data);else if(v.isData3DTexture)R?(tt&&e.texStorage3D(s.TEXTURE_3D,ft,yt,Q.width,Q.height,Q.depth),it&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,Pt,Q.data)):e.texImage3D(s.TEXTURE_3D,0,yt,Q.width,Q.height,Q.depth,0,ht,Pt,Q.data);else if(v.isFramebufferTexture){if(tt)if(R)e.texStorage2D(s.TEXTURE_2D,ft,yt,Q.width,Q.height);else{let J=Q.width,q=Q.height;for(let gt=0;gt<ft;gt++)e.texImage2D(s.TEXTURE_2D,gt,yt,J,q,0,ht,Pt,null),J>>=1,q>>=1}}else if(Lt.length>0){if(R&&tt){let J=ye(Lt[0]);e.texStorage2D(s.TEXTURE_2D,ft,yt,J.width,J.height)}for(let J=0,q=Lt.length;J<q;J++)lt=Lt[J],R?it&&e.texSubImage2D(s.TEXTURE_2D,J,0,0,ht,Pt,lt):e.texImage2D(s.TEXTURE_2D,J,yt,ht,Pt,lt);v.generateMipmaps=!1}else if(R){if(tt){let J=ye(Q);e.texStorage2D(s.TEXTURE_2D,ft,yt,J.width,J.height)}it&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ht,Pt,Q)}else e.texImage2D(s.TEXTURE_2D,0,yt,ht,Pt,Q);m(v)&&f(V),xt.__version=H.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function nt(S,v,F){if(v.image.length!==6)return;let V=oe(S,v),K=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,S.__webglTexture,s.TEXTURE0+F);let H=n.get(K);if(K.version!==H.__version||V===!0){e.activeTexture(s.TEXTURE0+F);let xt=Yt.getPrimaries(Yt.workingColorSpace),et=v.colorSpace===Hn?null:Yt.getPrimaries(v.colorSpace),_t=v.colorSpace===Hn||xt===et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let vt=v.isCompressedTexture||v.image[0].isCompressedTexture,Q=v.image[0]&&v.image[0].isDataTexture,ht=[];for(let q=0;q<6;q++)!vt&&!Q?ht[q]=_(v.image[q],!0,i.maxCubemapSize):ht[q]=Q?v.image[q].image:v.image[q],ht[q]=Ee(v,ht[q]);let Pt=ht[0],yt=r.convert(v.format,v.colorSpace),lt=r.convert(v.type),Lt=w(v.internalFormat,yt,lt,v.colorSpace),R=v.isVideoTexture!==!0,tt=H.__version===void 0||V===!0,it=K.dataReady,ft=C(v,Pt);Ut(s.TEXTURE_CUBE_MAP,v);let J;if(vt){R&&tt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Lt,Pt.width,Pt.height);for(let q=0;q<6;q++){J=ht[q].mipmaps;for(let gt=0;gt<J.length;gt++){let Dt=J[gt];v.format!==nn?yt!==null?R?it&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,0,0,Dt.width,Dt.height,yt,Dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,Lt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,0,0,Dt.width,Dt.height,yt,lt,Dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,Lt,Dt.width,Dt.height,0,yt,lt,Dt.data)}}}else{if(J=v.mipmaps,R&&tt){J.length>0&&ft++;let q=ye(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Lt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){R?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ht[q].width,ht[q].height,yt,lt,ht[q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Lt,ht[q].width,ht[q].height,0,yt,lt,ht[q].data);for(let gt=0;gt<J.length;gt++){let se=J[gt].image[q].image;R?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,0,0,se.width,se.height,yt,lt,se.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,Lt,se.width,se.height,0,yt,lt,se.data)}}else{R?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,yt,lt,ht[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Lt,yt,lt,ht[q]);for(let gt=0;gt<J.length;gt++){let Dt=J[gt];R?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,0,0,yt,lt,Dt.image[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,Lt,yt,lt,Dt.image[q])}}}m(v)&&f(s.TEXTURE_CUBE_MAP),H.__version=K.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Et(S,v,F,V,K,H){let xt=r.convert(F.format,F.colorSpace),et=r.convert(F.type),_t=w(F.internalFormat,xt,et,F.colorSpace),vt=n.get(v),Q=n.get(F);if(Q.__renderTarget=v,!vt.__hasExternalTextures){let ht=Math.max(1,v.width>>H),Pt=Math.max(1,v.height>>H);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?e.texImage3D(K,H,_t,ht,Pt,v.depth,0,xt,et,null):e.texImage2D(K,H,_t,ht,Pt,0,xt,et,null)}e.bindFramebuffer(s.FRAMEBUFFER,S),pt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,K,Q.__webglTexture,0,ae(v)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,K,Q.__webglTexture,H),e.bindFramebuffer(s.FRAMEBUFFER,null)}function At(S,v,F){if(s.bindRenderbuffer(s.RENDERBUFFER,S),v.depthBuffer){let V=v.depthTexture,K=V&&V.isDepthTexture?V.type:null,H=x(v.stencilBuffer,K),xt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=ae(v);pt(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,et,H,v.width,v.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,et,H,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,H,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xt,s.RENDERBUFFER,S)}else{let V=v.textures;for(let K=0;K<V.length;K++){let H=V[K],xt=r.convert(H.format,H.colorSpace),et=r.convert(H.type),_t=w(H.internalFormat,xt,et,H.colorSpace),vt=ae(v);F&&pt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,_t,v.width,v.height):pt(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt,_t,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,_t,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function It(S,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let V=n.get(v.depthTexture);V.__renderTarget=v,(!V.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z(v.depthTexture,0);let K=V.__webglTexture,H=ae(v);if(v.depthTexture.format===Ki)pt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,K,0);else if(v.depthTexture.format===as)pt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function ve(S){let v=n.get(S),F=S.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==S.depthTexture){let V=S.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){let K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=V}if(S.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let V=S.texture.mipmaps;V&&V.length>0?It(v.__webglFramebuffer[0],S):It(v.__webglFramebuffer,S)}else if(F){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=s.createRenderbuffer(),At(v.__webglDepthbuffer[V],S,!1);else{let K=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,H)}}else{let V=S.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),At(v.__webglDepthbuffer,S,!1);else{let K=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,H)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Xt(S,v,F){let V=n.get(S);v!==void 0&&Et(V.__webglFramebuffer,S,S.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&ve(S)}function A(S){let v=S.texture,F=n.get(S),V=n.get(v);S.addEventListener("dispose",P);let K=S.textures,H=S.isWebGLCubeRenderTarget===!0,xt=K.length>1;if(xt||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=v.version,o.memory.textures++),H){F.__webglFramebuffer=[];for(let et=0;et<6;et++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[et]=[];for(let _t=0;_t<v.mipmaps.length;_t++)F.__webglFramebuffer[et][_t]=s.createFramebuffer()}else F.__webglFramebuffer[et]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let et=0;et<v.mipmaps.length;et++)F.__webglFramebuffer[et]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(xt)for(let et=0,_t=K.length;et<_t;et++){let vt=n.get(K[et]);vt.__webglTexture===void 0&&(vt.__webglTexture=s.createTexture(),o.memory.textures++)}if(S.samples>0&&pt(S)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let et=0;et<K.length;et++){let _t=K[et];F.__webglColorRenderbuffer[et]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[et]);let vt=r.convert(_t.format,_t.colorSpace),Q=r.convert(_t.type),ht=w(_t.internalFormat,vt,Q,_t.colorSpace,S.isXRRenderTarget===!0),Pt=ae(S);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,ht,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.RENDERBUFFER,F.__webglColorRenderbuffer[et])}s.bindRenderbuffer(s.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),At(F.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(H){e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),Ut(s.TEXTURE_CUBE_MAP,v);for(let et=0;et<6;et++)if(v.mipmaps&&v.mipmaps.length>0)for(let _t=0;_t<v.mipmaps.length;_t++)Et(F.__webglFramebuffer[et][_t],S,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+et,_t);else Et(F.__webglFramebuffer[et],S,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0);m(v)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let et=0,_t=K.length;et<_t;et++){let vt=K[et],Q=n.get(vt),ht=s.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ht=S.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,Q.__webglTexture),Ut(ht,vt),Et(F.__webglFramebuffer,S,vt,s.COLOR_ATTACHMENT0+et,ht,0),m(vt)&&f(ht)}e.unbindTexture()}else{let et=s.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(et=S.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(et,V.__webglTexture),Ut(et,v),v.mipmaps&&v.mipmaps.length>0)for(let _t=0;_t<v.mipmaps.length;_t++)Et(F.__webglFramebuffer[_t],S,v,s.COLOR_ATTACHMENT0,et,_t);else Et(F.__webglFramebuffer,S,v,s.COLOR_ATTACHMENT0,et,0);m(v)&&f(et),e.unbindTexture()}S.depthBuffer&&ve(S)}function ie(S){let v=S.textures;for(let F=0,V=v.length;F<V;F++){let K=v[F];if(m(K)){let H=T(S),xt=n.get(K).__webglTexture;e.bindTexture(H,xt),f(H),e.unbindTexture()}}}let wt=[],$t=[];function Mt(S){if(S.samples>0){if(pt(S)===!1){let v=S.textures,F=S.width,V=S.height,K=s.COLOR_BUFFER_BIT,H=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=n.get(S),et=v.length>1;if(et)for(let vt=0;vt<v.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);let _t=S.texture.mipmaps;_t&&_t.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let vt=0;vt<v.length;vt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),et){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[vt]);let Q=n.get(v[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Q,0)}s.blitFramebuffer(0,0,F,V,0,0,F,V,K,s.NEAREST),l===!0&&(wt.length=0,$t.length=0,wt.push(s.COLOR_ATTACHMENT0+vt),S.depthBuffer&&S.resolveDepthBuffer===!1&&(wt.push(H),$t.push(H),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,$t)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,wt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),et)for(let vt=0;vt<v.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,xt.__webglColorRenderbuffer[vt]);let Q=n.get(v[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,Q,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){let v=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function ae(S){return Math.min(i.maxSamples,S.samples)}function pt(S){let v=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Nt(S){let v=o.render.frame;h.get(S)!==v&&(h.set(S,v),S.update())}function Ee(S,v){let F=S.colorSpace,V=S.format,K=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||F!==gi&&F!==Hn&&(Yt.getTransfer(F)===Jt?(V!==nn||K!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function ye(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=W,this.setTexture2D=Z,this.setTexture2DArray=Y,this.setTexture3D=$,this.setTextureCube=z,this.rebindTextures=Xt,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=pt}function Km(s,t){function e(n,i=Hn){let r,o=Yt.getTransfer(i);if(n===Sn)return s.UNSIGNED_BYTE;if(n===ro)return s.UNSIGNED_SHORT_4_4_4_4;if(n===oo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Oa)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ia)return s.BYTE;if(n===Da)return s.SHORT;if(n===ss)return s.UNSIGNED_SHORT;if(n===so)return s.INT;if(n===ei)return s.UNSIGNED_INT;if(n===wn)return s.FLOAT;if(n===rs)return s.HALF_FLOAT;if(n===La)return s.ALPHA;if(n===Fa)return s.RGB;if(n===nn)return s.RGBA;if(n===Ki)return s.DEPTH_COMPONENT;if(n===as)return s.DEPTH_STENCIL;if(n===Ua)return s.RED;if(n===ao)return s.RED_INTEGER;if(n===Na)return s.RG;if(n===lo)return s.RG_INTEGER;if(n===co)return s.RGBA_INTEGER;if(n===Gs||n===Ws||n===Xs||n===Ys)if(o===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Gs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Gs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ho||n===uo||n===fo||n===po)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mo||n===go||n===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===mo||n===go)return o===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_o)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vo||n===yo||n===xo||n===Mo||n===bo||n===So||n===wo||n===To||n===Eo||n===Ao||n===Co||n===Po||n===Ro||n===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Mo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===So)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===To)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ao)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Co)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Po)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ro)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Io)return o===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qs||n===Do||n===Oo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===qs)return o===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Do)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ba||n===Lo||n===Fo||n===Uo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===qs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===os?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Ho=class extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}},Jm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jm=`
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

}`,ol=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ho(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new dn({vertexShader:Jm,fragmentShader:jm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new De(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},al=class extends Un{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,_=new ol,m={},f=e.getContextAttributes(),T=null,w=null,x=[],C=[],I=new Gt,P=null,L=new Ie;L.viewport=new _e;let b=new Ie;b.viewport=new _e;let M=[L,b],E=new Yr,W=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let at=x[G];return at===void 0&&(at=new is,x[G]=at),at.getTargetRaySpace()},this.getControllerGrip=function(G){let at=x[G];return at===void 0&&(at=new is,x[G]=at),at.getGripSpace()},this.getHand=function(G){let at=x[G];return at===void 0&&(at=new is,x[G]=at),at.getHandSpace()};function X(G){let at=C.indexOf(G.inputSource);if(at===-1)return;let nt=x[at];nt!==void 0&&(nt.update(G.inputSource,G.frame,c||o),nt.dispatchEvent({type:G.type,data:G.inputSource}))}function Z(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",Y);for(let G=0;G<x.length;G++){let at=C[G];at!==null&&(C[G]=null,x[G].disconnect(at))}W=null,k=null,_.reset();for(let G in m)delete m[G];t.setRenderTarget(T),p=null,d=null,u=null,i=null,w=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=function(G){return st(this,null,function*(){if(i=G,i!==null){if(T=t.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&(yield e.makeXRCompatible()),P=t.getPixelRatio(),t.getSize(I),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(i,e)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,Et=null,At=null;f.depth&&(At=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=f.stencil?as:Ki,Et=f.stencil?os:ei);let It={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=u.createProjectionLayer(It),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),w=new vn(d.textureWidth,d.textureHeight,{format:nn,type:Sn,depthTexture:new Fs(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let nt={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new vn(p.framebufferWidth,p.framebufferHeight,{format:nn,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=yield i.requestReferenceSpace(a),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(G){for(let at=0;at<G.removed.length;at++){let nt=G.removed[at],Et=C.indexOf(nt);Et>=0&&(C[Et]=null,x[Et].disconnect(nt))}for(let at=0;at<G.added.length;at++){let nt=G.added[at],Et=C.indexOf(nt);if(Et===-1){for(let It=0;It<x.length;It++)if(It>=C.length){C.push(nt),Et=It;break}else if(C[It]===null){C[It]=nt,Et=It;break}if(Et===-1)break}let At=x[Et];At&&At.connect(nt)}}let $=new U,z=new U;function ot(G,at,nt){$.setFromMatrixPosition(at.matrixWorld),z.setFromMatrixPosition(nt.matrixWorld);let Et=$.distanceTo(z),At=at.projectionMatrix.elements,It=nt.projectionMatrix.elements,ve=At[14]/(At[10]-1),Xt=At[14]/(At[10]+1),A=(At[9]+1)/At[5],ie=(At[9]-1)/At[5],wt=(At[8]-1)/At[0],$t=(It[8]+1)/It[0],Mt=ve*wt,ae=ve*$t,pt=Et/(-wt+$t),Nt=pt*-wt;if(at.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Nt),G.translateZ(pt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),At[10]===-1)G.projectionMatrix.copy(at.projectionMatrix),G.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let Ee=ve+pt,ye=Xt+pt,S=Mt-Nt,v=ae+(Et-Nt),F=A*Xt/ye*Ee,V=ie*Xt/ye*Ee;G.projectionMatrix.makePerspective(S,v,F,V,Ee,ye),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function ut(G,at){at===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(at.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;let at=G.near,nt=G.far;_.texture!==null&&(_.depthNear>0&&(at=_.depthNear),_.depthFar>0&&(nt=_.depthFar)),E.near=b.near=L.near=at,E.far=b.far=L.far=nt,(W!==E.near||k!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),W=E.near,k=E.far),E.layers.mask=G.layers.mask|6,L.layers.mask=E.layers.mask&3,b.layers.mask=E.layers.mask&5;let Et=G.parent,At=E.cameras;ut(E,Et);for(let It=0;It<At.length;It++)ut(At[It],Et);At.length===2?ot(E,L,b):E.projectionMatrix.copy(L.projectionMatrix),bt(G,E,Et)};function bt(G,at,nt){nt===null?G.matrix.copy(at.matrixWorld):(G.matrix.copy(nt.matrixWorld),G.matrix.invert(),G.matrix.multiply(at.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(at.projectionMatrix),G.projectionMatrixInverse.copy(at.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Ji*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)},this.getCameraTexture=function(G){return m[G]};let Ut=null;function oe(G,at){if(h=at.getViewerPose(c||o),g=at,h!==null){let nt=h.views;p!==null&&(t.setRenderTargetFramebuffer(w,p.framebuffer),t.setRenderTarget(w));let Et=!1;nt.length!==E.cameras.length&&(E.cameras.length=0,Et=!0);for(let Xt=0;Xt<nt.length;Xt++){let A=nt[Xt],ie=null;if(p!==null)ie=p.getViewport(A);else{let $t=u.getViewSubImage(d,A);ie=$t.viewport,Xt===0&&(t.setRenderTargetTextures(w,$t.colorTexture,$t.depthStencilTexture),t.setRenderTarget(w))}let wt=M[Xt];wt===void 0&&(wt=new Ie,wt.layers.enable(Xt),wt.viewport=new _e,M[Xt]=wt),wt.matrix.fromArray(A.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(A.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(ie.x,ie.y,ie.width,ie.height),Xt===0&&(E.matrix.copy(wt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Et===!0&&E.cameras.push(wt)}let At=i.enabledFeatures;if(At&&At.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){let Xt=u.getDepthInformation(nt[0]);Xt&&Xt.isValid&&Xt.texture&&_.init(Xt,i.renderState)}if(At&&At.includes("camera-access")&&(t.state.unbindTexture(),u))for(let Xt=0;Xt<nt.length;Xt++){let A=nt[Xt].camera;if(A){let ie=m[A];ie||(ie=new Ho,m[A]=ie);let wt=u.getCameraImage(A);ie.sourceTexture=wt}}}for(let nt=0;nt<x.length;nt++){let Et=C[nt],At=x[nt];Et!==null&&At!==void 0&&At.update(Et,at,c||o)}Ut&&Ut(G,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null}let te=new mh;te.setAnimationLoop(oe),this.setAnimationLoop=function(G){Ut=G},this.dispose=function(){}}},Ei=new vi,Qm=new ge;function tg(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Ga(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,T,w,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,T,w):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ne&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ne&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let T=t.get(f),w=T.envMap,x=T.envMapRotation;w&&(m.envMap.value=w,Ei.copy(x),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),m.envMapRotation.value.setFromMatrix4(Qm.makeRotationFromEuler(Ei)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=w*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ne&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let T=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function eg(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,w){let x=w.program;n.uniformBlockBinding(T,x)}function c(T,w){let x=i[T.id];x===void 0&&(g(T),x=h(T),i[T.id]=x,T.addEventListener("dispose",m));let C=w.program;n.updateUBOMapping(T,C);let I=t.render.frame;r[T.id]!==I&&(d(T),r[T.id]=I)}function h(T){let w=u();T.__bindingPointIndex=w;let x=s.createBuffer(),C=T.__size,I=T.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,x),x}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){let w=i[T.id],x=T.uniforms,C=T.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let I=0,P=x.length;I<P;I++){let L=Array.isArray(x[I])?x[I]:[x[I]];for(let b=0,M=L.length;b<M;b++){let E=L[b];if(p(E,I,b,C)===!0){let W=E.__offset,k=Array.isArray(E.value)?E.value:[E.value],X=0;for(let Z=0;Z<k.length;Z++){let Y=k[Z],$=_(Y);typeof Y=="number"||typeof Y=="boolean"?(E.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,W+X,E.__data)):Y.isMatrix3?(E.__data[0]=Y.elements[0],E.__data[1]=Y.elements[1],E.__data[2]=Y.elements[2],E.__data[3]=0,E.__data[4]=Y.elements[3],E.__data[5]=Y.elements[4],E.__data[6]=Y.elements[5],E.__data[7]=0,E.__data[8]=Y.elements[6],E.__data[9]=Y.elements[7],E.__data[10]=Y.elements[8],E.__data[11]=0):(Y.toArray(E.__data,X),X+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,W,E.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(T,w,x,C){let I=T.value,P=w+"_"+x;if(C[P]===void 0)return typeof I=="number"||typeof I=="boolean"?C[P]=I:C[P]=I.clone(),!0;{let L=C[P];if(typeof I=="number"||typeof I=="boolean"){if(L!==I)return C[P]=I,!0}else if(L.equals(I)===!1)return L.copy(I),!0}return!1}function g(T){let w=T.uniforms,x=0,C=16;for(let P=0,L=w.length;P<L;P++){let b=Array.isArray(w[P])?w[P]:[w[P]];for(let M=0,E=b.length;M<E;M++){let W=b[M],k=Array.isArray(W.value)?W.value:[W.value];for(let X=0,Z=k.length;X<Z;X++){let Y=k[X],$=_(Y),z=x%C,ot=z%$.boundary,ut=z+ot;x+=ot,ut!==0&&C-ut<$.storage&&(x+=C-ut),W.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=$.storage}}}let I=x%C;return I>0&&(x+=C-I),T.__size=x,T.__cache={},this}function _(T){let w={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(w.boundary=4,w.storage=4):T.isVector2?(w.boundary=8,w.storage=8):T.isVector3||T.isColor?(w.boundary=16,w.storage=12):T.isVector4?(w.boundary=16,w.storage=16):T.isMatrix3?(w.boundary=48,w.storage=48):T.isMatrix4?(w.boundary=64,w.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),w}function m(T){let w=T.target;w.removeEventListener("dispose",m);let x=o.indexOf(w.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function f(){for(let T in i)s.deleteBuffer(i[T]);o=[],i={},r={}}return{bind:l,update:c,dispose:f}}var Vo=class{constructor(t={}){let{canvas:e=Hc(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),_=new Int32Array(4),m=null,f=null,T=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,C=!1;this._outputColorSpace=Re;let I=0,P=0,L=null,b=-1,M=null,E=new _e,W=new _e,k=null,X=new Wt(0),Z=0,Y=e.width,$=e.height,z=1,ot=null,ut=null,bt=new _e(0,0,Y,$),Ut=new _e(0,0,Y,$),oe=!1,te=new yi,G=!1,at=!1,nt=new ge,Et=new U,At=new _e,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function Xt(){return L===null?z:1}let A=n;function ie(y,D){return e.getContext(y,D)}try{let y={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qr}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",J,!1),A===null){let D="webgl2";if(A=ie(D,y),A===null)throw ie(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let wt,$t,Mt,ae,pt,Nt,Ee,ye,S,v,F,V,K,H,xt,et,_t,vt,Q,ht,Pt,yt,lt,Lt;function R(){wt=new yp(A),wt.init(),yt=new Km(A,wt),$t=new dp(A,wt,t,yt),Mt=new Zm(A,wt),$t.reversedDepthBuffer&&d&&Mt.buffers.depth.setReversed(!0),ae=new bp(A),pt=new Fm,Nt=new $m(A,wt,Mt,pt,$t,yt,ae),Ee=new pp(x),ye=new vp(x),S=new Au(A),lt=new hp(A,S),v=new xp(A,S,ae,lt),F=new wp(A,v,S,ae),Q=new Sp(A,$t,Nt),et=new fp(pt),V=new Lm(x,Ee,ye,wt,$t,lt,et),K=new tg(x,pt),H=new Nm,xt=new Gm(wt),vt=new cp(x,Ee,ye,Mt,F,p,l),_t=new Ym(x,F,$t),Lt=new eg(A,ae,$t,Mt),ht=new up(A,wt,ae),Pt=new Mp(A,wt,ae),ae.programs=V.programs,x.capabilities=$t,x.extensions=wt,x.properties=pt,x.renderLists=H,x.shadowMap=_t,x.state=Mt,x.info=ae}R();let tt=new al(x,A);this.xr=tt,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){let y=wt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=wt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(y){y!==void 0&&(z=y,this.setSize(Y,$,!1))},this.getSize=function(y){return y.set(Y,$)},this.setSize=function(y,D,N=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=y,$=D,e.width=Math.floor(y*z),e.height=Math.floor(D*z),N===!0&&(e.style.width=y+"px",e.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(Y*z,$*z).floor()},this.setDrawingBufferSize=function(y,D,N){Y=y,$=D,z=N,e.width=Math.floor(y*N),e.height=Math.floor(D*N),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(E)},this.getViewport=function(y){return y.copy(bt)},this.setViewport=function(y,D,N,B){y.isVector4?bt.set(y.x,y.y,y.z,y.w):bt.set(y,D,N,B),Mt.viewport(E.copy(bt).multiplyScalar(z).round())},this.getScissor=function(y){return y.copy(Ut)},this.setScissor=function(y,D,N,B){y.isVector4?Ut.set(y.x,y.y,y.z,y.w):Ut.set(y,D,N,B),Mt.scissor(W.copy(Ut).multiplyScalar(z).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(y){Mt.setScissorTest(oe=y)},this.setOpaqueSort=function(y){ot=y},this.setTransparentSort=function(y){ut=y},this.getClearColor=function(y){return y.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor(...arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,N=!0){let B=0;if(y){let O=!1;if(L!==null){let j=L.texture.format;O=j===co||j===lo||j===ao}if(O){let j=L.texture.type,ct=j===Sn||j===ei||j===ss||j===os||j===ro||j===oo,mt=vt.getClearColor(),dt=vt.getClearAlpha(),Ct=mt.r,Rt=mt.g,St=mt.b;ct?(g[0]=Ct,g[1]=Rt,g[2]=St,g[3]=dt,A.clearBufferuiv(A.COLOR,0,g)):(_[0]=Ct,_[1]=Rt,_[2]=St,_[3]=dt,A.clearBufferiv(A.COLOR,0,_))}else B|=A.COLOR_BUFFER_BIT}D&&(B|=A.DEPTH_BUFFER_BIT),N&&(B|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",J,!1),vt.dispose(),H.dispose(),xt.dispose(),pt.dispose(),Ee.dispose(),ye.dispose(),F.dispose(),lt.dispose(),Lt.dispose(),V.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",fn),tt.removeEventListener("sessionend",cl),ii.stop()};function it(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let y=ae.autoReset,D=_t.enabled,N=_t.autoUpdate,B=_t.needsUpdate,O=_t.type;R(),ae.autoReset=y,_t.enabled=D,_t.autoUpdate=N,_t.needsUpdate=B,_t.type=O}function J(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function q(y){let D=y.target;D.removeEventListener("dispose",q),gt(D)}function gt(y){Dt(y),pt.remove(y)}function Dt(y){let D=pt.get(y).programs;D!==void 0&&(D.forEach(function(N){V.releaseProgram(N)}),y.isShaderMaterial&&V.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,N,B,O,j){D===null&&(D=It);let ct=O.isMesh&&O.matrixWorld.determinant()<0,mt=bh(y,D,N,B,O);Mt.setMaterial(B,ct);let dt=N.index,Ct=1;if(B.wireframe===!0){if(dt=v.getWireframeAttribute(N),dt===void 0)return;Ct=2}let Rt=N.drawRange,St=N.attributes.position,kt=Rt.start*Ct,jt=(Rt.start+Rt.count)*Ct;j!==null&&(kt=Math.max(kt,j.start*Ct),jt=Math.min(jt,(j.start+j.count)*Ct)),dt!==null?(kt=Math.max(kt,0),jt=Math.min(jt,dt.count)):St!=null&&(kt=Math.max(kt,0),jt=Math.min(jt,St.count));let de=jt-kt;if(de<0||de===1/0)return;lt.setup(O,B,mt,N,dt);let re,ee=ht;if(dt!==null&&(re=S.get(dt),ee=Pt,ee.setIndex(re)),O.isMesh)B.wireframe===!0?(Mt.setLineWidth(B.wireframeLinewidth*Xt()),ee.setMode(A.LINES)):ee.setMode(A.TRIANGLES);else if(O.isLine){let Tt=B.linewidth;Tt===void 0&&(Tt=1),Mt.setLineWidth(Tt*Xt()),O.isLineSegments?ee.setMode(A.LINES):O.isLineLoop?ee.setMode(A.LINE_LOOP):ee.setMode(A.LINE_STRIP)}else O.isPoints?ee.setMode(A.POINTS):O.isSprite&&ee.setMode(A.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)_i("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ee.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))ee.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Tt=O._multiDrawStarts,ce=O._multiDrawCounts,qt=O._multiDrawCount,ke=dt?S.get(dt).bytesPerElement:1,Pi=pt.get(B).currentProgram.getUniforms();for(let He=0;He<qt;He++)Pi.setValue(A,"_gl_DrawID",He),ee.render(Tt[He]/ke,ce[He])}else if(O.isInstancedMesh)ee.renderInstances(kt,de,O.count);else if(N.isInstancedBufferGeometry){let Tt=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,ce=Math.min(N.instanceCount,Tt);ee.renderInstances(kt,de,ce)}else ee.render(kt,de)};function se(y,D,N){y.transparent===!0&&y.side===Mn&&y.forceSinglePass===!1?(y.side=Ne,y.needsUpdate=!0,Ks(y,D,N),y.side=Fn,y.needsUpdate=!0,Ks(y,D,N),y.side=Mn):Ks(y,D,N)}this.compile=function(y,D,N=null){N===null&&(N=y),f=xt.get(N),f.init(D),w.push(f),N.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),y!==N&&y.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();let B=new Set;return y.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let j=O.material;if(j)if(Array.isArray(j))for(let ct=0;ct<j.length;ct++){let mt=j[ct];se(mt,N,O),B.add(mt)}else se(j,N,O),B.add(j)}),f=w.pop(),B},this.compileAsync=function(y,D,N=null){let B=this.compile(y,D,N);return new Promise(O=>{function j(){if(B.forEach(function(ct){pt.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){O(y);return}setTimeout(j,10)}wt.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Kt=null;function En(y){Kt&&Kt(y)}function fn(){ii.stop()}function cl(){ii.start()}let ii=new mh;ii.setAnimationLoop(En),typeof self<"u"&&ii.setContext(self),this.setAnimationLoop=function(y){Kt=y,tt.setAnimationLoop(y),y===null?ii.stop():ii.start()},tt.addEventListener("sessionstart",fn),tt.addEventListener("sessionend",cl),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(D),D=tt.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,D,L),f=xt.get(y,w.length),f.init(D),w.push(f),nt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),te.setFromProjectionMatrix(nt,hn,D.reversedDepth),at=this.localClippingEnabled,G=et.init(this.clippingPlanes,at),m=H.get(y,T.length),m.init(),T.push(m),tt.enabled===!0&&tt.isPresenting===!0){let j=x.xr.getDepthSensingMesh();j!==null&&Yo(j,D,-1/0,x.sortObjects)}Yo(y,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ot,ut),ve=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,ve&&vt.addToRenderList(m,y),this.info.render.frame++,G===!0&&et.beginShadows();let N=f.state.shadowsArray;_t.render(N,y,D),G===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=m.opaque,O=m.transmissive;if(f.setupLights(),D.isArrayCamera){let j=D.cameras;if(O.length>0)for(let ct=0,mt=j.length;ct<mt;ct++){let dt=j[ct];ul(B,O,y,dt)}ve&&vt.render(y);for(let ct=0,mt=j.length;ct<mt;ct++){let dt=j[ct];hl(m,y,dt,dt.viewport)}}else O.length>0&&ul(B,O,y,D),ve&&vt.render(y),hl(m,y,D);L!==null&&P===0&&(Nt.updateMultisampleRenderTarget(L),Nt.updateRenderTargetMipmap(L)),y.isScene===!0&&y.onAfterRender(x,y,D),lt.resetDefaultState(),b=-1,M=null,w.pop(),w.length>0?(f=w[w.length-1],G===!0&&et.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Yo(y,D,N,B){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)N=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||te.intersectsSprite(y)){B&&At.setFromMatrixPosition(y.matrixWorld).applyMatrix4(nt);let ct=F.update(y),mt=y.material;mt.visible&&m.push(y,ct,mt,N,At.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||te.intersectsObject(y))){let ct=F.update(y),mt=y.material;if(B&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),At.copy(y.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),At.copy(ct.boundingSphere.center)),At.applyMatrix4(y.matrixWorld).applyMatrix4(nt)),Array.isArray(mt)){let dt=ct.groups;for(let Ct=0,Rt=dt.length;Ct<Rt;Ct++){let St=dt[Ct],kt=mt[St.materialIndex];kt&&kt.visible&&m.push(y,ct,kt,N,At.z,St)}}else mt.visible&&m.push(y,ct,mt,N,At.z,null)}}let j=y.children;for(let ct=0,mt=j.length;ct<mt;ct++)Yo(j[ct],D,N,B)}function hl(y,D,N,B){let O=y.opaque,j=y.transmissive,ct=y.transparent;f.setupLightsView(N),G===!0&&et.setGlobalState(x.clippingPlanes,N),B&&Mt.viewport(E.copy(B)),O.length>0&&$s(O,D,N),j.length>0&&$s(j,D,N),ct.length>0&&$s(ct,D,N),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function ul(y,D,N,B){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[B.id]===void 0&&(f.state.transmissionRenderTarget[B.id]=new vn(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?rs:Sn,minFilter:bn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Yt.workingColorSpace}));let j=f.state.transmissionRenderTarget[B.id],ct=B.viewport||E;j.setSize(ct.z*x.transmissionResolutionScale,ct.w*x.transmissionResolutionScale);let mt=x.getRenderTarget(),dt=x.getActiveCubeFace(),Ct=x.getActiveMipmapLevel();x.setRenderTarget(j),x.getClearColor(X),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),ve&&vt.render(N);let Rt=x.toneMapping;x.toneMapping=kn;let St=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),f.setupLightsView(B),G===!0&&et.setGlobalState(x.clippingPlanes,B),$s(y,N,B),Nt.updateMultisampleRenderTarget(j),Nt.updateRenderTargetMipmap(j),wt.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let jt=0,de=D.length;jt<de;jt++){let re=D[jt],ee=re.object,Tt=re.geometry,ce=re.material,qt=re.group;if(ce.side===Mn&&ee.layers.test(B.layers)){let ke=ce.side;ce.side=Ne,ce.needsUpdate=!0,dl(ee,N,B,Tt,ce,qt),ce.side=ke,ce.needsUpdate=!0,kt=!0}}kt===!0&&(Nt.updateMultisampleRenderTarget(j),Nt.updateRenderTargetMipmap(j))}x.setRenderTarget(mt,dt,Ct),x.setClearColor(X,Z),St!==void 0&&(B.viewport=St),x.toneMapping=Rt}function $s(y,D,N){let B=D.isScene===!0?D.overrideMaterial:null;for(let O=0,j=y.length;O<j;O++){let ct=y[O],mt=ct.object,dt=ct.geometry,Ct=ct.group,Rt=ct.material;Rt.allowOverride===!0&&B!==null&&(Rt=B),mt.layers.test(N.layers)&&dl(mt,D,N,dt,Rt,Ct)}}function dl(y,D,N,B,O,j){y.onBeforeRender(x,D,N,B,O,j),y.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),O.onBeforeRender(x,D,N,B,y,j),O.transparent===!0&&O.side===Mn&&O.forceSinglePass===!1?(O.side=Ne,O.needsUpdate=!0,x.renderBufferDirect(N,D,B,O,y,j),O.side=Fn,O.needsUpdate=!0,x.renderBufferDirect(N,D,B,O,y,j),O.side=Mn):x.renderBufferDirect(N,D,B,O,y,j),y.onAfterRender(x,D,N,B,O,j)}function Ks(y,D,N){D.isScene!==!0&&(D=It);let B=pt.get(y),O=f.state.lights,j=f.state.shadowsArray,ct=O.state.version,mt=V.getParameters(y,O.state,j,D,N),dt=V.getProgramCacheKey(mt),Ct=B.programs;B.environment=y.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(y.isMeshStandardMaterial?ye:Ee).get(y.envMap||B.environment),B.envMapRotation=B.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Ct===void 0&&(y.addEventListener("dispose",q),Ct=new Map,B.programs=Ct);let Rt=Ct.get(dt);if(Rt!==void 0){if(B.currentProgram===Rt&&B.lightsStateVersion===ct)return pl(y,mt),Rt}else mt.uniforms=V.getUniforms(y),y.onBeforeCompile(mt,x),Rt=V.acquireProgram(mt,dt),Ct.set(dt,Rt),B.uniforms=mt.uniforms;let St=B.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(St.clippingPlanes=et.uniform),pl(y,mt),B.needsLights=wh(y),B.lightsStateVersion=ct,B.needsLights&&(St.ambientLightColor.value=O.state.ambient,St.lightProbe.value=O.state.probe,St.directionalLights.value=O.state.directional,St.directionalLightShadows.value=O.state.directionalShadow,St.spotLights.value=O.state.spot,St.spotLightShadows.value=O.state.spotShadow,St.rectAreaLights.value=O.state.rectArea,St.ltc_1.value=O.state.rectAreaLTC1,St.ltc_2.value=O.state.rectAreaLTC2,St.pointLights.value=O.state.point,St.pointLightShadows.value=O.state.pointShadow,St.hemisphereLights.value=O.state.hemi,St.directionalShadowMap.value=O.state.directionalShadowMap,St.directionalShadowMatrix.value=O.state.directionalShadowMatrix,St.spotShadowMap.value=O.state.spotShadowMap,St.spotLightMatrix.value=O.state.spotLightMatrix,St.spotLightMap.value=O.state.spotLightMap,St.pointShadowMap.value=O.state.pointShadowMap,St.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Rt,B.uniformsList=null,Rt}function fl(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=us.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function pl(y,D){let N=pt.get(y);N.outputColorSpace=D.outputColorSpace,N.batching=D.batching,N.batchingColor=D.batchingColor,N.instancing=D.instancing,N.instancingColor=D.instancingColor,N.instancingMorph=D.instancingMorph,N.skinning=D.skinning,N.morphTargets=D.morphTargets,N.morphNormals=D.morphNormals,N.morphColors=D.morphColors,N.morphTargetsCount=D.morphTargetsCount,N.numClippingPlanes=D.numClippingPlanes,N.numIntersection=D.numClipIntersection,N.vertexAlphas=D.vertexAlphas,N.vertexTangents=D.vertexTangents,N.toneMapping=D.toneMapping}function bh(y,D,N,B,O){D.isScene!==!0&&(D=It),Nt.resetTextureUnits();let j=D.fog,ct=B.isMeshStandardMaterial?D.environment:null,mt=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:gi,dt=(B.isMeshStandardMaterial?ye:Ee).get(B.envMap||ct),Ct=B.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Rt=!!N.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),St=!!N.morphAttributes.position,kt=!!N.morphAttributes.normal,jt=!!N.morphAttributes.color,de=kn;B.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(de=x.toneMapping);let re=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ee=re!==void 0?re.length:0,Tt=pt.get(B),ce=f.state.lights;if(G===!0&&(at===!0||y!==M)){let Le=y===M&&B.id===b;et.setState(B,y,Le)}let qt=!1;B.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==ce.state.version||Tt.outputColorSpace!==mt||O.isBatchedMesh&&Tt.batching===!1||!O.isBatchedMesh&&Tt.batching===!0||O.isBatchedMesh&&Tt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Tt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Tt.instancing===!1||!O.isInstancedMesh&&Tt.instancing===!0||O.isSkinnedMesh&&Tt.skinning===!1||!O.isSkinnedMesh&&Tt.skinning===!0||O.isInstancedMesh&&Tt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Tt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Tt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Tt.instancingMorph===!1&&O.morphTexture!==null||Tt.envMap!==dt||B.fog===!0&&Tt.fog!==j||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==et.numPlanes||Tt.numIntersection!==et.numIntersection)||Tt.vertexAlphas!==Ct||Tt.vertexTangents!==Rt||Tt.morphTargets!==St||Tt.morphNormals!==kt||Tt.morphColors!==jt||Tt.toneMapping!==de||Tt.morphTargetsCount!==ee)&&(qt=!0):(qt=!0,Tt.__version=B.version);let ke=Tt.currentProgram;qt===!0&&(ke=Ks(B,D,O));let Pi=!1,He=!1,fs=!1,he=ke.getUniforms(),Ze=Tt.uniforms;if(Mt.useProgram(ke.program)&&(Pi=!0,He=!0,fs=!0),B.id!==b&&(b=B.id,He=!0),Pi||M!==y){Mt.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),he.setValue(A,"projectionMatrix",y.projectionMatrix),he.setValue(A,"viewMatrix",y.matrixWorldInverse);let Be=he.map.cameraPosition;Be!==void 0&&Be.setValue(A,Et.setFromMatrixPosition(y.matrixWorld)),$t.logarithmicDepthBuffer&&he.setValue(A,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&he.setValue(A,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,He=!0,fs=!0)}if(O.isSkinnedMesh){he.setOptional(A,O,"bindMatrix"),he.setOptional(A,O,"bindMatrixInverse");let Le=O.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),he.setValue(A,"boneTexture",Le.boneTexture,Nt))}O.isBatchedMesh&&(he.setOptional(A,O,"batchingTexture"),he.setValue(A,"batchingTexture",O._matricesTexture,Nt),he.setOptional(A,O,"batchingIdTexture"),he.setValue(A,"batchingIdTexture",O._indirectTexture,Nt),he.setOptional(A,O,"batchingColorTexture"),O._colorsTexture!==null&&he.setValue(A,"batchingColorTexture",O._colorsTexture,Nt));let $e=N.morphAttributes;if(($e.position!==void 0||$e.normal!==void 0||$e.color!==void 0)&&Q.update(O,N,ke),(He||Tt.receiveShadow!==O.receiveShadow)&&(Tt.receiveShadow=O.receiveShadow,he.setValue(A,"receiveShadow",O.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Ze.envMap.value=dt,Ze.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(Ze.envMapIntensity.value=D.environmentIntensity),He&&(he.setValue(A,"toneMappingExposure",x.toneMappingExposure),Tt.needsLights&&Sh(Ze,fs),j&&B.fog===!0&&K.refreshFogUniforms(Ze,j),K.refreshMaterialUniforms(Ze,B,z,$,f.state.transmissionRenderTarget[y.id]),us.upload(A,fl(Tt),Ze,Nt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(us.upload(A,fl(Tt),Ze,Nt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&he.setValue(A,"center",O.center),he.setValue(A,"modelViewMatrix",O.modelViewMatrix),he.setValue(A,"normalMatrix",O.normalMatrix),he.setValue(A,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let Le=B.uniformsGroups;for(let Be=0,qo=Le.length;Be<qo;Be++){let si=Le[Be];Lt.update(si,ke),Lt.bind(si,ke)}}return ke}function Sh(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function wh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(y,D,N){let B=pt.get(y);B.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),pt.get(y.texture).__webglTexture=D,pt.get(y.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:N,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let N=pt.get(y);N.__webglFramebuffer=D,N.__useDefaultFramebuffer=D===void 0};let Th=A.createFramebuffer();this.setRenderTarget=function(y,D=0,N=0){L=y,I=D,P=N;let B=!0,O=null,j=!1,ct=!1;if(y){let dt=pt.get(y);if(dt.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(A.FRAMEBUFFER,null),B=!1;else if(dt.__webglFramebuffer===void 0)Nt.setupRenderTarget(y);else if(dt.__hasExternalTextures)Nt.rebindTextures(y,pt.get(y.texture).__webglTexture,pt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let St=y.depthTexture;if(dt.__boundDepthTexture!==St){if(St!==null&&pt.has(St)&&(y.width!==St.image.width||y.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(y)}}let Ct=y.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ct=!0);let Rt=pt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Rt[D])?O=Rt[D][N]:O=Rt[D],j=!0):y.samples>0&&Nt.useMultisampledRTT(y)===!1?O=pt.get(y).__webglMultisampledFramebuffer:Array.isArray(Rt)?O=Rt[N]:O=Rt,E.copy(y.viewport),W.copy(y.scissor),k=y.scissorTest}else E.copy(bt).multiplyScalar(z).floor(),W.copy(Ut).multiplyScalar(z).floor(),k=oe;if(N!==0&&(O=Th),Mt.bindFramebuffer(A.FRAMEBUFFER,O)&&B&&Mt.drawBuffers(y,O),Mt.viewport(E),Mt.scissor(W),Mt.setScissorTest(k),j){let dt=pt.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+D,dt.__webglTexture,N)}else if(ct){let dt=D;for(let Ct=0;Ct<y.textures.length;Ct++){let Rt=pt.get(y.textures[Ct]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Ct,Rt.__webglTexture,N,dt)}}else if(y!==null&&N!==0){let dt=pt.get(y.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,dt.__webglTexture,N)}b=-1},this.readRenderTargetPixels=function(y,D,N,B,O,j,ct,mt=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=pt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt){Mt.bindFramebuffer(A.FRAMEBUFFER,dt);try{let Ct=y.textures[mt],Rt=Ct.format,St=Ct.type;if(!$t.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(St)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-B&&N>=0&&N<=y.height-O&&(y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+mt),A.readPixels(D,N,B,O,yt.convert(Rt),yt.convert(St),j))}finally{let Ct=L!==null?pt.get(L).__webglFramebuffer:null;Mt.bindFramebuffer(A.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=function(y,D,N,B,O,j,ct,mt=0){return st(this,null,function*(){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=pt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt)if(D>=0&&D<=y.width-B&&N>=0&&N<=y.height-O){Mt.bindFramebuffer(A.FRAMEBUFFER,dt);let Ct=y.textures[mt],Rt=Ct.format,St=Ct.type;if(!$t.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let kt=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,kt),A.bufferData(A.PIXEL_PACK_BUFFER,j.byteLength,A.STREAM_READ),y.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+mt),A.readPixels(D,N,B,O,yt.convert(Rt),yt.convert(St),0);let jt=L!==null?pt.get(L).__webglFramebuffer:null;Mt.bindFramebuffer(A.FRAMEBUFFER,jt);let de=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),yield Vc(A,de,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,kt),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,j),A.deleteBuffer(kt),A.deleteSync(de),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")})},this.copyFramebufferToTexture=function(y,D=null,N=0){let B=Math.pow(2,-N),O=Math.floor(y.image.width*B),j=Math.floor(y.image.height*B),ct=D!==null?D.x:0,mt=D!==null?D.y:0;Nt.setTexture2D(y,0),A.copyTexSubImage2D(A.TEXTURE_2D,N,0,0,ct,mt,O,j),Mt.unbindTexture()};let Eh=A.createFramebuffer(),Ah=A.createFramebuffer();this.copyTextureToTexture=function(y,D,N=null,B=null,O=0,j=null){j===null&&(O!==0?(_i("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=O,O=0):j=0);let ct,mt,dt,Ct,Rt,St,kt,jt,de,re=y.isCompressedTexture?y.mipmaps[j]:y.image;if(N!==null)ct=N.max.x-N.min.x,mt=N.max.y-N.min.y,dt=N.isBox3?N.max.z-N.min.z:1,Ct=N.min.x,Rt=N.min.y,St=N.isBox3?N.min.z:0;else{let $e=Math.pow(2,-O);ct=Math.floor(re.width*$e),mt=Math.floor(re.height*$e),y.isDataArrayTexture?dt=re.depth:y.isData3DTexture?dt=Math.floor(re.depth*$e):dt=1,Ct=0,Rt=0,St=0}B!==null?(kt=B.x,jt=B.y,de=B.z):(kt=0,jt=0,de=0);let ee=yt.convert(D.format),Tt=yt.convert(D.type),ce;D.isData3DTexture?(Nt.setTexture3D(D,0),ce=A.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Nt.setTexture2DArray(D,0),ce=A.TEXTURE_2D_ARRAY):(Nt.setTexture2D(D,0),ce=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,D.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,D.unpackAlignment);let qt=A.getParameter(A.UNPACK_ROW_LENGTH),ke=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Pi=A.getParameter(A.UNPACK_SKIP_PIXELS),He=A.getParameter(A.UNPACK_SKIP_ROWS),fs=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,re.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,re.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ct),A.pixelStorei(A.UNPACK_SKIP_ROWS,Rt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,St);let he=y.isDataArrayTexture||y.isData3DTexture,Ze=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let $e=pt.get(y),Le=pt.get(D),Be=pt.get($e.__renderTarget),qo=pt.get(Le.__renderTarget);Mt.bindFramebuffer(A.READ_FRAMEBUFFER,Be.__webglFramebuffer),Mt.bindFramebuffer(A.DRAW_FRAMEBUFFER,qo.__webglFramebuffer);for(let si=0;si<dt;si++)he&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,pt.get(y).__webglTexture,O,St+si),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,pt.get(D).__webglTexture,j,de+si)),A.blitFramebuffer(Ct,Rt,ct,mt,kt,jt,ct,mt,A.DEPTH_BUFFER_BIT,A.NEAREST);Mt.bindFramebuffer(A.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(O!==0||y.isRenderTargetTexture||pt.has(y)){let $e=pt.get(y),Le=pt.get(D);Mt.bindFramebuffer(A.READ_FRAMEBUFFER,Eh),Mt.bindFramebuffer(A.DRAW_FRAMEBUFFER,Ah);for(let Be=0;Be<dt;Be++)he?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,$e.__webglTexture,O,St+Be):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,$e.__webglTexture,O),Ze?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Le.__webglTexture,j,de+Be):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Le.__webglTexture,j),O!==0?A.blitFramebuffer(Ct,Rt,ct,mt,kt,jt,ct,mt,A.COLOR_BUFFER_BIT,A.NEAREST):Ze?A.copyTexSubImage3D(ce,j,kt,jt,de+Be,Ct,Rt,ct,mt):A.copyTexSubImage2D(ce,j,kt,jt,Ct,Rt,ct,mt);Mt.bindFramebuffer(A.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Ze?y.isDataTexture||y.isData3DTexture?A.texSubImage3D(ce,j,kt,jt,de,ct,mt,dt,ee,Tt,re.data):D.isCompressedArrayTexture?A.compressedTexSubImage3D(ce,j,kt,jt,de,ct,mt,dt,ee,re.data):A.texSubImage3D(ce,j,kt,jt,de,ct,mt,dt,ee,Tt,re):y.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,j,kt,jt,ct,mt,ee,Tt,re.data):y.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,j,kt,jt,re.width,re.height,ee,re.data):A.texSubImage2D(A.TEXTURE_2D,j,kt,jt,ct,mt,ee,Tt,re);A.pixelStorei(A.UNPACK_ROW_LENGTH,qt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ke),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Pi),A.pixelStorei(A.UNPACK_SKIP_ROWS,He),A.pixelStorei(A.UNPACK_SKIP_IMAGES,fs),j===0&&D.generateMipmaps&&A.generateMipmap(ce),Mt.unbindTexture()},this.copyTextureToTexture3D=function(y,D,N=null,B=null,O=0){return _i('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,D,N,B,O)},this.initRenderTarget=function(y){pt.get(y).__webglFramebuffer===void 0&&Nt.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Nt.setTextureCube(y,0):y.isData3DTexture?Nt.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Nt.setTexture2DArray(y,0):Nt.setTexture2D(y,0),Mt.unbindTexture()},this.resetState=function(){I=0,P=0,L=null,Mt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Yt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Yt._getUnpackColorSpace()}};var Wo=class s{config={radius:800,magnification:2,distortion:.3};constructor(){}setConfig(t){this.config=Ht(Ht({},this.config),t)}getConfig(){return Ht({},this.config)}calculateEffect(t,e,n=1e3,i=1080){let r=t.x-e.x,o=t.y-e.y,a=Math.sqrt(r*r+o*o);if(a>this.config.radius)return null;let l=a/this.config.radius,c=1-Math.pow(l,3),h=1;if(this.config.maxHeight!==void 0&&this.config.cameraZ!==void 0&&this.config.fov!==void 0){let f=this.config.maxHeight/100*i,T=this.config.fov*Math.PI/180,w=2*Math.tan(T/2)*this.config.cameraZ,x=i/w,C=n*x;h=1+(f/C-1)*c}else h=1+(this.config.magnification-1)*c;let u=this.config.distortion*c,d=Math.atan2(o,r),p=a*u,g=new Gt(Math.cos(d)*p,Math.sin(d)*p),_=Math.floor(c*1e3)+1e3;return{scale:h,positionOffset:g,renderOrder:_}}static \u0275fac=function(e){return new(e||s)};static \u0275prov=Ri({token:s,factory:s.\u0275fac,providedIn:"root"})};var Xo=class s{PHOTO_W;PHOTO_H;FOV_DEG;CAM_MARGIN;CAM_DAMP;ANISO;BG;FISHEYE_SCALE_DAMPING=5;container=null;renderer;scene;camera;root;clock;texLoader;rafRunning=!1;activeTweens=[];bounds={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};targetCamZ=1200;zSpawn=700;isInitialized=!1;textureCache=new Map;loadingTextures=new Map;highResTextureCache=new Map;loadingHighResTextures=new Map;maxTextureSize=4096;svgBackgroundPlane;svgBackgroundTexture;svgBackgroundOptions;raycaster=new ks;mouse=new Gt;hasUserInteracted=!1;isDragging=!1;draggedMesh=null;dragPlane=new Qe;dragOffset=new U;dragCallbacks=new Map;hoverOnlyMeshes=new Set;meshToPhotoId=new Map;photoIdToMesh=new Map;meshToPhotoData=new Map;currentLayoutStrategy=null;layoutStrategyRef=null;lastTouchDistance=0;touchStartDistance=0;touchPanStart={x:0,y:0};isTwoFingerGesture=!1;svgContainer=null;onDragCompleteCallback;onPhotoClickCallback;onBackgroundClickCallback;mouseDownPosition=new Gt;clickThreshold=5;FALLBACK_MOUSE_MOVEMENT=1e3;hoveredMesh=null;wasFisheyeEnabled=!1;userControlEnabled=!0;targetCamX=0;targetCamY=0;computedMinCamZ=300;computedMaxCamZ=5e4;isPanning=!1;panStartMouse=new Gt;panStartCameraPos=new U;cameraMode="auto-fit";lastMousePos=new Gt;lastClientX=null;lastClientY=null;meshToUrl=new Map;highResActive=new Set;lodAccumTime=0;fisheyeService;fisheyeEnabled=!1;fisheyeEnabledSignal=!1;fisheyeResumeOnPointer=!1;frustum=new yi;frustumMatrix=new ge;lastRenderTime=0;isSceneIdle=!1;idleCheckInterval=0;IDLE_THRESHOLD=.001;IDLE_CHECK_INTERVAL=.1;visibleMeshCount=0;totalMeshCount=0;cullingLogCounter=0;performanceMonitoring=!1;frameCount=0;lastFpsUpdate=0;currentFps=0;renderCount=0;skippedFrames=0;fisheyeAnimationLock=!1;fisheyeAffectedMeshes=new Set;fisheyeFocusPoint=new U;permalinkTargetId=null;meshOriginalStates=new Map;hoveredItemSignal=Zt(!1);rotationSpeedMultiplier=1;panSensitivityMultiplier=1;dofStrength=0;dofPass=null;platformService=ai(Vn);constructor(){this.fisheyeService=new Wo;let t={};this.PHOTO_W=t.photoWidth??zt.PHOTO_WIDTH,this.PHOTO_H=t.photoHeight??zt.PHOTO_HEIGHT,this.FOV_DEG=t.fovDeg??45,this.CAM_MARGIN=t.cameraMargin??300,this.CAM_DAMP=t.cameraDamp??.1*1e4,this.ANISO=t.anisotropy??(this.platformService.isMobile?2:4),this.BG=t.background??16776694}initialize(t,e){return st(this,null,function*(){if(this.isInitialized)throw new Error("ThreeRendererService is already initialized");this.container=t,e&&e.svgBackground&&(this.svgBackgroundOptions=e.svgBackground),yield this.initializeThreeJS(),this.isInitialized=!0})}createPhotoMesh(t){return st(this,null,function*(){if(!this.isInitialized)throw new Error("ThreeRendererService not initialized");let e=yield this.loadTexture(t.url),n=new un({map:e,transparent:!0,opacity:1}),i=new Bn(this.PHOTO_W,this.PHOTO_H),r=new De(i,n),o=t.currentPosition;r.position.set(o.x,o.y,o.z);let a=t.metadata.renderOrder;r.renderOrder=a!==void 0?a:0;let l=this.calculatePhotoRotation(t);return r.rotation.z=l,this.root.add(r),t.setMesh(r),this.meshToPhotoData.set(r,t),this.meshToUrl.set(r,t.url),r})}updatePhotoMesh(t){if(!t.mesh)return;let e=t.currentPosition;t.mesh.position.set(e.x,e.y,e.z);let n=t.metadata.renderOrder;t.mesh.renderOrder=n!==void 0?n:0;let i=this.calculatePhotoRotation(t);t.mesh.rotation.z=i}removePhotoMesh(t){if(!t.mesh)return;this.root.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material instanceof en&&t.mesh.material.dispose(),this.meshToPhotoData.delete(t.mesh),this.meshToUrl.delete(t.mesh);let e=this.meshToPhotoId.get(t.mesh);e&&this.photoIdToMesh.delete(e),this.meshToPhotoId.delete(t.mesh),this.dragCallbacks.delete(t.mesh),this.highResActive.delete(t.mesh),this.fisheyeAffectedMeshes.delete(t.mesh),t.setMesh(null)}updateMeshPosition(t,e){t.position.set(e.x,e.y,e.z)}upgradeToHighResTexture(t,e){return st(this,null,function*(){try{let n=yield this.loadHighResTexture(e);if(t.material instanceof un){let i=t.material.map;i&&!this.highResTextureCache.has(e)&&i.dispose(),t.material.map=n,t.material.needsUpdate=!0}}catch(n){console.warn("Failed to upgrade to high-res texture, keeping low-res:",n)}})}downgradeToLowResTexture(t,e){return st(this,null,function*(){try{let n=yield this.loadTexture(e);t.material instanceof un&&(t.material.map=n,t.material.needsUpdate=!0)}catch(n){console.warn("Failed to downgrade to low-res texture:",n)}})}removeMesh(t){this.root.remove(t),this.meshToUrl.delete(t),this.highResActive.delete(t),this.disableDragForMesh(t),t.geometry.dispose(),t.material instanceof en&&t.material.dispose()}animateToPosition(t,e,n,i){return new Promise(r=>{let o=this.makeTween(i,a=>{let l=this.easeOutCubic(a),c=this.easeInOutCubic(a),h=this.lerp(e.x,n.x,l),u=this.lerp(e.y,n.y,l),d=this.lerp(e.z,n.z,c);t.position.set(h,u,d),a>=1&&(t.position.set(n.x,n.y,n.z),r())});this.addTween(o)})}animateOpacity(t,e,n,i){return new Promise(r=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let o=this.makeTween(i,a=>{let l=this.easeOutCubic(a),c=this.lerp(e,n,l);t.material&&"opacity"in t.material&&(t.material.opacity=c),a>=1&&(t.material&&"opacity"in t.material&&(t.material.opacity=n),r())});this.addTween(o)})}animatePositionAndOpacity(t,e,n,i,r,o){return new Promise(a=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let l=this.makeTween(o,c=>{let h=this.easeOutCubic(c),u=this.easeInOutCubic(c),d=this.lerp(e.x,n.x,h),p=this.lerp(e.y,n.y,h),g=this.lerp(e.z,n.z,u);t.position.set(d,p,g);let _=this.lerp(i,r,h);t.material&&"opacity"in t.material&&(t.material.opacity=_),c>=1&&(t.position.set(n.x,n.y,n.z),t.material&&"opacity"in t.material&&(t.material.opacity=r),a())});this.addTween(l)})}setSceneBounds(t,e){if(this.bounds=Ht({},t),this.recomputeZoomLimits(),!(this.cameraMode==="auto-fit"||e?.force))return this.clampCameraToBounds(),Promise.resolve();this.cameraMode="auto-fit";let i=(t.minX+t.maxX)*.5,r=(t.minY+t.maxY)*.5,o=this.computedMaxCamZ;if(e?.animate){let a=this.targetCamX,l=this.targetCamY,c=this.targetCamZ,h=e.duration??2.4;return Math.abs(o-c)<.01&&Math.abs(i-a)<.01&&Math.abs(r-l)<.01?Promise.resolve():new Promise(u=>{let d=this.makeTween(h,p=>{let g=this.easeOutCubic(p);this.targetCamX=this.lerp(a,i,g),this.targetCamY=this.lerp(l,r,g),this.targetCamZ=this.lerp(c,o,g),p>=1&&(this.targetCamX=i,this.targetCamY=r,this.targetCamZ=o,u())});this.addTween(d)})}else return this.targetCamX=i,this.targetCamY=r,this.targetCamZ=o,Promise.resolve()}recomputeZoomLimits(){if(!this.camera||!this.container||this.container.clientWidth===0||this.container.clientHeight===0)return;let t=ne.degToRad(this.camera.fov),e=this.container.clientWidth/this.container.clientHeight;this.computedMaxCamZ=this.computeFitZWithMargin(this.bounds,t,e,this.CAM_MARGIN);let n={minX:-this.PHOTO_W/2,maxX:this.PHOTO_W/2,minY:-this.PHOTO_H/2,maxY:this.PHOTO_H/2};this.computedMinCamZ=this.computeFitZWithMargin(n,t,e,0),this.computedMinCamZ>this.computedMaxCamZ&&(this.computedMinCamZ=this.computedMaxCamZ)}setUserControlEnabled(t){this.userControlEnabled=t}setCameraMode(t){this.cameraMode=t,t==="auto-fit"&&this.setSceneBounds(this.bounds,{force:!0})}resetCameraView(t=!0){this.setSceneBounds(this.bounds,{animate:t,force:!0,duration:.5})}zoomAtPoint(t,e,n){if(!this.userControlEnabled)return;this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let i=this.container.getBoundingClientRect(),r=(e-i.left)/i.width*2-1,o=-((n-i.top)/i.height)*2+1,a=this.projectScreenToWorld(r,o,this.targetCamX,this.targetCamY,this.targetCamZ),l=ne.clamp(this.targetCamZ*t,this.computedMinCamZ,this.computedMaxCamZ);this.targetCamZ=l;let c=this.projectScreenToWorld(r,o,this.targetCamX,this.targetCamY,this.targetCamZ);this.targetCamX+=a.x-c.x,this.targetCamY+=a.y-c.y,this.clampCameraToBounds(),this.wakeUpRenderLoop()}wakeUpRenderLoop(){this.isSceneIdle=!1}calculatePhotoRotation(t){let e=t.metadata,n=e.plausibility,i=e._svgZoneFavorableFuture||e.favorable_future;if(n==null||!i)return this.getStableRandomRotation(t.id);let r=n/100,a=ne.degToRad(32),l=(1-r)*a,c=i.toLowerCase().trim(),h=c==="favor"||c==="favorable"||c==="prefer"||c==="preferred"||c==="mostly prefer"||c==="prefer-ish",u=c==="prevent"||c==="prevented"||c==="unfavorable"||c==="mostly prevent"||c==="prevent-ish";return c==="uncertain"||c==="unsure"?0:!h&&!u?(console.warn("[ROTATION] Unknown favorable_future value:",i,"for photo:",t.id),this.getStableRandomRotation(t.id)):h?l:-l}calculateEvaluationRotation(t){let e=t.metadata,n=e.plausibility,i=e._svgZoneFavorableFuture||e.favorable_future;if(n==null||!i)return this.getStableRandomRotation(t.id);let r=n/100,a=ne.degToRad(32),l=(1-r)*a,c=i.toLowerCase().trim(),h=c==="favor"||c==="favorable"||c==="prefer"||c==="preferred"||c==="mostly prefer"||c==="prefer-ish";return!h&&!(c==="prevent"||c==="prevented"||c==="unfavorable"||c==="mostly prevent"||c==="prevent-ish")?this.getStableRandomRotation(t.id):h?l:-l}getStableRandomRotation(t){let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e=e&e;let n=Math.abs(e)%3-1;return ne.degToRad(n)}projectScreenToWorld(t,e,n,i,r){let o=ne.degToRad(this.camera.fov),a=2*Math.tan(o/2)*r,l=a*this.camera.aspect,c=n+t*l/2,h=i+e*a/2;return new U(c,h,0)}panCamera(t,e){if(!this.userControlEnabled)return;this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let n=this.container.getBoundingClientRect(),i=t/n.width*2*this.getVisibleWidth(),r=e/n.height*2*this.getVisibleHeight(),o=this.panSensitivityMultiplier;this.targetCamX-=i*o,this.targetCamY+=r*o,this.clampCameraToBounds()}getVisibleWidth(){let t=ne.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ*this.camera.aspect/2}getVisibleWidthAtDepth(t){let e=ne.degToRad(this.camera.fov);return 2*Math.tan(e/2)*t*this.camera.aspect/2}getVisibleHeight(){let t=ne.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ/2}clampCameraToBounds(){if(!Number.isFinite(this.bounds.minX)||!Number.isFinite(this.bounds.maxX)||!Number.isFinite(this.bounds.minY)||!Number.isFinite(this.bounds.maxY))return;this.targetCamZ=ne.clamp(this.targetCamZ,this.computedMinCamZ,this.computedMaxCamZ);let t=this.getVisibleWidth(),e=this.getVisibleHeight(),n=this.CAM_MARGIN*.5,i=this.bounds.minX-this.CAM_MARGIN+t,r=this.bounds.maxX+this.CAM_MARGIN-t,o=this.bounds.minY-this.CAM_MARGIN+e,a=this.bounds.maxY+this.CAM_MARGIN-e,l=i>r?(this.bounds.minX+this.bounds.maxX)*.5:ne.clamp(this.targetCamX,i,r),c=o>a?(this.bounds.minY+this.bounds.maxY)*.5:ne.clamp(this.targetCamY,o,a),h=i-n,u=r+n,d=o-n,p=a+n,g=this.targetCamX<h||this.targetCamX>u,_=this.targetCamY<d||this.targetCamY>p,m=.25;g&&(this.targetCamX=this.lerp(this.targetCamX,l,m)),_&&(this.targetCamY=this.lerp(this.targetCamY,c,m))}screenToWorld(t,e,n){let i=new U(t,e,.5);i.unproject(this.camera);let r=i.sub(this.camera.position).normalize(),o=(n-this.camera.position.z)/r.z;return this.camera.position.clone().add(r.multiplyScalar(o))}getCameraSpawnZ(){return this.camera.position.z-this.zSpawn}getTargetCameraZ(){return this.targetCamZ}focusOnItemFromShowOnMap(t,e,n){return st(this,null,function*(){this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=!1;let i=this.targetCamZ*.25;if(n&&n.mesh){let r=new yn().setFromObject(n.mesh),o=r.max.x-r.min.x,a=r.max.y-r.min.y,l=ne.degToRad(this.FOV_DEG);i=a/Math.tan(l/2)}i=ne.clamp(i,this.computedMinCamZ,this.computedMaxCamZ),yield this.animateCameraToZoomLevel(t,e,i,1.25)})}animateCameraToZoomLevel(t,e,n,i){return new Promise(r=>{let o=this.targetCamX,a=this.targetCamY,l=this.targetCamZ,c=ne.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);if(i<=.01){this.targetCamX=t,this.targetCamY=e,this.targetCamZ=c,r();return}let h=this.makeTween(i,u=>{let d=this.easeInOutCubic(u);this.targetCamX=this.lerp(o,t,d),this.targetCamY=this.lerp(a,e,d),this.targetCamZ=this.lerp(l,c,d),u>=1&&(this.targetCamX=t,this.targetCamY=e,this.targetCamZ=c,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal,r())});this.addTween(h)})}getCurrentBounds(){return Ht({},this.bounds)}enableFisheyeEffect(t){this.fisheyeEnabled=t,this.fisheyeEnabledSignal=t,t||this.resetAllFisheyeEffects()}enablePerformanceMonitoring(t){this.performanceMonitoring=t,t&&(this.frameCount=0,this.renderCount=0,this.skippedFrames=0,this.lastFpsUpdate=performance.now())}getPerformanceMetrics(){return{fps:this.currentFps,visibleMeshes:this.visibleMeshCount,totalMeshes:this.totalMeshCount,isIdle:this.isSceneIdle,isMonitoring:this.performanceMonitoring}}isFisheyeEnabled(){return this.fisheyeEnabled}isDraggingItem(){return this.isDragging}isHoveringItem(){return this.hoveredItemSignal}setFisheyeConfig(t){this.fisheyeService.setConfig(Ke(Ht({},t),{cameraZ:t.cameraZ??this.targetCamZ,fov:t.fov??this.FOV_DEG}))}getFisheyeConfig(){return this.fisheyeService.getConfig()}addTween(t){this.activeTweens.push(t),this.isSceneIdle=!1}runTween(t){return new Promise(e=>{this.activeTweens.push(n=>t(n)?(e(),!0):!1)})}makeTween(t,e){let n=0;return i=>{n+=i;let r=this.clamp01(n/t);return e(r),r>=1}}expandBounds(t,e,n,i){let r=n*.5,o=i*.5;this.bounds.minX=Math.min(this.bounds.minX,t-r),this.bounds.maxX=Math.max(this.bounds.maxX,t+r),this.bounds.minY=Math.min(this.bounds.minY,e-o),this.bounds.maxY=Math.max(this.bounds.maxY,e+o)}easeOutCubic(t){return t=this.clamp01(t),1-Math.pow(1-t,2)}easeInOutCubic(t){return t=this.clamp01(t),t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}easeOutBack(t,e=1.70158){return t=this.clamp01(t),1+(e+1)*Math.pow(t-1,3)+e*Math.pow(t-1,2)}lerp(t,e,n){return ne.lerp(t,e,n)}damp(t,e,n,i){return ne.lerp(t,e,1-Math.exp(-n*i))}disableFisheyeForZoom(){this.fisheyeEnabled&&(this.fisheyeEnabled=!1,this.resetAllFisheyeEffects())}reEnableFisheyeAfterZoom(){this.fisheyeEnabledSignal&&(this.fisheyeEnabled=!0,this.fisheyeResumeOnPointer=!1)}applyFisheyeEffect(){let t=this.container?.clientHeight??window.innerHeight;if(this.fisheyeService.setConfig({cameraZ:this.targetCamZ,fov:this.FOV_DEG,viewportHeight:t}),!this.fisheyeEnabled||!this.hasUserInteracted)return;let e=this.screenToWorld(this.mouse.x,this.mouse.y,0);this.fisheyeFocusPoint.set(e.x,e.y,0);let n=new Set(this.fisheyeAffectedMeshes);this.fisheyeAffectedMeshes.clear();let i=this.fisheyeService.getConfig();if(i.maxHeight!==void 0&&t>0){let o=this.FOV_DEG*Math.PI/180,a=2*Math.tan(o/2)*this.targetCamZ,l=t/Math.max(1,a);if(this.PHOTO_H*l/t*100>=i.maxHeight)return}let r=i.radius*i.radius;this.root.children.forEach(o=>{let a=o;if(!a.isMesh)return;let l=this.meshToPhotoData.get(a);if(l&&l.animationState==="hidden")return;let c=a.position.clone(),h=this.PHOTO_H;l?(c=new U(l.currentPosition.x,l.currentPosition.y,l.currentPosition.z),l.height&&(h=l.height)):(this.meshOriginalStates.has(a)||this.meshOriginalStates.set(a,{position:a.position.clone(),scale:a.scale.clone(),renderOrder:a.renderOrder}),c=this.meshOriginalStates.get(a).position.clone());let u=c.x-this.fisheyeFocusPoint.x,d=c.y-this.fisheyeFocusPoint.y;if(u*u+d*d>r){if(n.has(a)){if(a.scale.set(1,1,1),a.position.copy(c),l){let _=l.metadata.renderOrder;a.renderOrder=_!==void 0?_:0}else a.renderOrder=0;a.userData.originalRotation!==void 0&&(a.rotation.z=a.userData.originalRotation,a.userData.originalRotation=void 0),this.draggedMesh===a&&a.userData.shadowMesh&&(this.scene.remove(a.userData.shadowMesh),a.userData.shadowMesh=null)}return}let g=this.fisheyeService.calculateEffect(c,this.fisheyeFocusPoint,h,t);if(g){if(this.fisheyeAffectedMeshes.add(a),a.userData.originalRotation||(a.userData.originalRotation=a.rotation.z),l){let T=this.calculateEvaluationRotation(l);a.rotation.z=T}let _=g.scale;if(this.isDragging&&this.draggedMesh===a)if(_=1,a.userData.shadowMesh){let T=a.userData.shadowMesh;T.position.set(c.x+g.positionOffset.x+20,c.y+g.positionOffset.y-30,c.z-1),T.scale.set(_,_,1),T.renderOrder=g.renderOrder-1}else{let T=new Bn(1,1),w=new un({color:0,transparent:!0,opacity:.3,depthWrite:!1}),x=new De(T,w);x.scale.set(a.scale.x,a.scale.y,1),x.position.set(a.position.x+20,a.position.y-30,a.position.z-1),x.renderOrder=g.renderOrder-1,this.scene.add(x),a.userData.shadowMesh=x}else a.userData.shadowMesh&&(this.scene.remove(a.userData.shadowMesh),a.userData.shadowMesh=null);let m=a.scale.x,f=this.damp(m,_,this.FISHEYE_SCALE_DAMPING,.016);a.scale.set(f,f,1),a.position.set(c.x+g.positionOffset.x,c.y+g.positionOffset.y,c.z),a.renderOrder=g.renderOrder}else if(n.has(a)){if(a.scale.set(1,1,1),a.position.copy(c),l){let _=l.metadata.renderOrder;a.renderOrder=_!==void 0?_:0}else a.renderOrder=0;a.userData.originalRotation!==void 0&&(a.rotation.z=a.userData.originalRotation,a.userData.originalRotation=void 0),a.userData.shadowMesh&&(this.scene.remove(a.userData.shadowMesh),a.userData.shadowMesh=null)}})}resetAllFisheyeEffects(){this.fisheyeAffectedMeshes.forEach(t=>{let e=this.meshToPhotoData.get(t);if(e&&e.currentPosition)t.position.set(e.currentPosition.x,e.currentPosition.y,e.currentPosition.z);else if(this.meshOriginalStates.has(t)){let n=this.meshOriginalStates.get(t);t.position.copy(n.position)}t.scale.set(1,1,1),t.renderOrder=0,t.userData.originalRotation!==void 0&&(t.rotation.z=t.userData.originalRotation,t.userData.originalRotation=void 0)}),this.fisheyeAffectedMeshes.clear()}setSvgBackground(t,e){this.svgBackgroundPlane&&(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof en&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0),this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&this.svgContainer.remove(),this.svgBackgroundOptions={enabled:!0,svgElement:t,scale:e?.scale??1,offsetX:e?.offsetX??0,offsetY:e?.offsetY??0,radius:e?.radius,desiredOpacity:e?.desiredOpacity??1},this.createSvgDomContainer(t),this.setupSvgBackground(this.svgBackgroundOptions)}cleanupDragState(){this.isDragging&&this.draggedMesh&&(this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.container&&(this.container.style.cursor="default"))}enableDragForMesh(t,e){this.dragCallbacks.set(t,e),this.hoverOnlyMeshes.delete(t)}enableHoverForMesh(t){this.hoverOnlyMeshes.add(t)}setMeshPhotoId(t,e){this.meshToPhotoId.set(t,e),this.photoIdToMesh.set(e,t)}setPermalinkTarget(t){this.permalinkTargetId=t}setLayoutStrategy(t){this.currentLayoutStrategy=t}setDragCompleteCallback(t){this.onDragCompleteCallback=t}setPhotoClickCallback(t){this.onPhotoClickCallback=t}setBackgroundClickCallback(t){this.onBackgroundClickCallback=t}setLayoutStrategyReference(t){this.layoutStrategyRef=t}setMeshPhotoData(t,e){this.meshToPhotoData.set(t,e)}findPhotoIdForMesh(t){return this.meshToPhotoId.get(t)||null}isInteractiveLayout(){return this.svgBackgroundOptions?.enabled||!1}createSvgDomContainer(t){if(!this.container)return;this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.top="0",this.svgContainer.style.left="0",this.svgContainer.style.width="100%",this.svgContainer.style.height="100%",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.zIndex="1",this.svgContainer.style.opacity="0";let e=t.cloneNode(!0);e.style.width="100%",e.style.height="100%",e.style.position="absolute",this.svgContainer.appendChild(e),this.container.appendChild(this.svgContainer)}animateMaterialOpacity(t,e,n=600){let i=t.opacity??1,r=performance.now(),o=a=>{let l=Math.min(1,(a-r)/n),c=l*(2-l);t.opacity=i+(e-i)*c,t.needsUpdate=!0,l<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}calculatePreviewRotation(t,e){let n=e.plausibility,i=e.favorable_future;if(n===void 0||!i)return this.draggedMesh?.userData.previewOriginalRotation||0;let o=(1-n/100)*32,a=i.toLowerCase().trim(),c=a==="favor"||a==="favorable"||a==="prefer"||a==="preferred"?o:-o;return ne.degToRad(c)}parseHotspotGroupId(t){if(!t||!t.startsWith("s-"))return null;try{let n=t.substring(2).split(","),i={};for(let r of n){let[o,a]=r.split("=");if(o&&a){let l=a.trim(),c=parseInt(l,10),h=!isNaN(c)&&c.toString()===l?c:l;i[o.trim()]=h}}return Object.keys(i).length>0?i:null}catch(e){return console.warn("Failed to parse hotspot group ID:",t,e),null}}findHotspotAtMeshPosition(t,e){if(!this.svgContainer)return null;let n=this.svgContainer.querySelector("svg");if(!n)return null;let i=new U;t.getWorldPosition(i);let r=this.svgBackgroundOptions?.offsetX||0,o=this.svgBackgroundOptions?.offsetY||0,a=this.svgBackgroundOptions?.radius||15e3,l=(i.x-r+a)/(2*a),c=(a-(i.y-o))/(2*a),h=n.viewBox.baseVal;if(!h||h.width===0||h.height===0)return null;let u=h.x+l*h.width,d=h.y+c*h.height,p=n.querySelectorAll('[id^="hit"]');for(let g of p){let _=g,m=n.createSVGPoint();m.x=u,m.y=d;let f=!1;if("isPointInFill"in g&&typeof g.isPointInFill=="function")try{f=g.isPointInFill(m)}catch{let w=_.getBBox();f=u>=w.x&&u<=w.x+w.width&&d>=w.y&&d<=w.y+w.height}else{let T=_.getBBox();f=u>=T.x&&u<=T.x+T.width&&d>=T.y&&d<=T.y+T.height}if(f){let T=g.parentElement?.closest("g");if(T&&T.id){let w=this.parseHotspotGroupId(T.id);return w||{hotspot:T.id}}}}return null}isPositionOutOfCanvas(t){if(!this.svgBackgroundOptions?.radius)return!1;let e=this.svgBackgroundOptions.offsetX??0,n=this.svgBackgroundOptions.offsetY??0,i=this.svgBackgroundOptions.radius,r=t.x-e,o=t.y-n;return Math.sqrt(r*r+o*o)>i}disableDragForMesh(t){this.dragCallbacks.delete(t)}disableAllDragging(){this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null}setupDragAndDrop(){if(!this.container){console.warn("Container not available for drag setup");return}let t=this.renderer.domElement;t.addEventListener("mousedown",e=>{this.updateMousePosition(e),this.onMouseDown(e)}),t.addEventListener("mousemove",e=>{this.updateMousePosition(e),this.onMouseMove(e)}),t.addEventListener("mouseup",e=>{this.updateMousePosition(e),this.onMouseUp()}),t.addEventListener("mouseleave",()=>{this.isDragging&&this.cleanupDragState(),this.fisheyeEnabled&&this.fisheyeAffectedMeshes.size>0&&this.resetAllFisheyeEffects()}),t.addEventListener("wheel",e=>{this.onMouseWheel(e)},{passive:!1}),t.addEventListener("dblclick",e=>{this.onDoubleClick(e)}),t.addEventListener("touchstart",e=>{if(e.preventDefault(),e.touches.length===1){this.isTwoFingerGesture=!1,this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousedown",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseDown(n)}else if(e.touches.length===2){this.isTwoFingerGesture=!0,this.isDragging&&this.cleanupDragState();let n=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(n*n+i*i),this.touchStartDistance=this.lastTouchDistance,this.touchPanStart.x=(e.touches[0].clientX+e.touches[1].clientX)/2,this.touchPanStart.y=(e.touches[0].clientY+e.touches[1].clientY)/2,this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom()}},{passive:!1}),t.addEventListener("touchmove",e=>{if(e.preventDefault(),e.touches.length===1&&!this.isTwoFingerGesture){this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousemove",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseMove(n)}else if(e.touches.length===2){this.isTwoFingerGesture=!0;let n=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY,r=Math.sqrt(n*n+i*i);if(this.lastTouchDistance>0){let h=this.lastTouchDistance/r,u=(e.touches[0].clientX+e.touches[1].clientX)/2,d=(e.touches[0].clientY+e.touches[1].clientY)/2;this.zoomAtPoint(h,u,d)}let o=(e.touches[0].clientX+e.touches[1].clientX)/2,a=(e.touches[0].clientY+e.touches[1].clientY)/2,l=o-this.touchPanStart.x,c=a-this.touchPanStart.y;this.panCamera(l,c),this.lastTouchDistance=r,this.touchPanStart.x=o,this.touchPanStart.y=a}},{passive:!1}),t.addEventListener("touchend",e=>{e.touches.length===0?(this.isTwoFingerGesture&&this.reEnableFisheyeAfterZoom(),this.isTwoFingerGesture=!1,this.lastTouchDistance=0,this.onMouseUp()):e.touches.length===1&&(this.isTwoFingerGesture=!1,this.lastTouchDistance=0)}),window.addEventListener("keydown",e=>{this.onKeyDown(e)}),window.addEventListener("mouseup",()=>{this.isDragging&&this.cleanupDragState()}),window.addEventListener("touchend",()=>{this.isDragging&&this.cleanupDragState()})}updateMousePosition(t){if(!this.container)return;this.hasUserInteracted=!0;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY}updateMousePositionFromTouch(t){if(!this.container)return;this.hasUserInteracted=!0;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY}onMouseDown(t){this.mouseDownPosition.set(t.clientX,t.clientY),this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1);if(e.length>0){let n=e[0].object;if(this.dragCallbacks.has(n)&&!this.hoverOnlyMeshes.has(n)){this.isDragging=!0,this.draggedMesh=n,this.wasFisheyeEnabled=this.fisheyeEnabled,this.fisheyeEnabled&&(this.fisheyeEnabled=!1,this.resetAllFisheyeEffects());let r=new U;this.camera.getWorldDirection(r),this.dragPlane.setFromNormalAndCoplanarPoint(r,n.position);let o=new U;if(this.raycaster.ray.intersectPlane(this.dragPlane,o),this.dragOffset.copy(o).sub(n.position),this.renderer.domElement.style.cursor="grabbing",this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragStart){let a=this.meshToPhotoData.get(n);if(a){let l={x:n.position.x,y:n.position.y,z:n.position.z};this.currentLayoutStrategy.onPhotoDragStart(a,l)}}return}}this.userControlEnabled&&(this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.isPanning=!0,this.panStartMouse.set(t.clientX,t.clientY),this.panStartCameraPos.set(this.targetCamX,this.targetCamY,this.targetCamZ),this.renderer.domElement.style.cursor="grabbing")}onMouseMove(t){if(!this.fisheyeAnimationLock&&this.fisheyeResumeOnPointer&&(this.fisheyeResumeOnPointer=!1,this.fisheyeEnabledSignal&&(this.fisheyeEnabled=!0)),this.isDragging&&this.draggedMesh){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new U;if(this.raycaster.ray.intersectPlane(this.dragPlane,e)){let n=e.sub(this.dragOffset);this.draggedMesh.position.copy(n);let i=this.findPhotoIdForMesh(this.draggedMesh);if(i){let o=this.findHotspotAtMeshPosition(this.draggedMesh,i);if(o&&this.draggedMesh){let a=this.meshToPhotoData.get(this.draggedMesh);a&&(this.draggedMesh.userData.previewOriginalRotation===void 0&&(this.draggedMesh.userData.previewOriginalRotation=this.draggedMesh.rotation.z),this.draggedMesh.rotation.z=this.calculatePreviewRotation(a,o))}else this.draggedMesh?.userData.previewOriginalRotation!==void 0&&(this.draggedMesh.rotation.z=this.draggedMesh.userData.previewOriginalRotation)}let r=this.dragCallbacks.get(this.draggedMesh);if(r&&r({x:n.x,y:n.y,z:n.z}),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragMove){let o=this.meshToPhotoData.get(this.draggedMesh);if(o){let a={x:n.x,y:n.y,z:n.z};this.currentLayoutStrategy.onPhotoDragMove(o,a)}}}}else if(this.isPanning){let e=t.clientX-this.panStartMouse.x,n=t.clientY-this.panStartMouse.y;this.panCamera(e,n),this.panStartMouse.set(t.clientX,t.clientY)}else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1);if(e.length>0){let n=e[0].object,i=this.dragCallbacks.has(n)&&!this.hoverOnlyMeshes.has(n),r=this.hoverOnlyMeshes.has(n);(i||r)&&(this.container&&(this.container.style.cursor=i?"grab":"pointer"),this.hoveredMesh!==n&&(this.hoveredMesh=n,this.hoveredItemSignal.set(!0)))}else this.hoveredMesh&&(this.hoveredMesh=null,this.hoveredItemSignal.set(!1));this.applyFisheyeEffect()}}onMouseUp(){let e=(this.lastClientX!==null&&this.lastClientY!==null?Math.sqrt((this.lastClientX-this.mouseDownPosition.x)*(this.lastClientX-this.mouseDownPosition.x)+(this.lastClientY-this.mouseDownPosition.y)*(this.lastClientY-this.mouseDownPosition.y)):this.FALLBACK_MOUSE_MOVEMENT)<this.clickThreshold;if(this.isDragging&&this.draggedMesh){let n=this.draggedMesh;if(n.userData.previewOriginalRotation!==void 0&&delete n.userData.previewOriginalRotation,this.isDragging=!1,e){let i=this.findPhotoIdForMesh(n);if(i&&this.onPhotoClickCallback){this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0),this.onPhotoClickCallback(i);return}}if(this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragEnd){let i=this.meshToPhotoData.get(n);if(i){let r={x:n.position.x,y:n.position.y,z:n.position.z};this.currentLayoutStrategy.onPhotoDragEnd(i,r)}}if(this.isInteractiveLayout()&&this.onDragCompleteCallback){let i=this.findPhotoIdForMesh(n);if(i){let r={x:n.position.x,y:n.position.y,z:n.position.z},o=this.isPositionOutOfCanvas(n.position);o&&(n.rotation.z=0);let a=o?null:this.findHotspotAtMeshPosition(n,i);this.onDragCompleteCallback(i,{position:r,isOutOfBounds:o,hotspotData:a}).catch(l=>{console.error("[DRAG] Error in drag complete callback:",l)})}}this.draggedMesh=null,this.hoveredMesh=null,this.hoveredItemSignal.set(!1),this.wasFisheyeEnabled&&(this.fisheyeEnabled=!0)}else if(this.isPanning&&(this.isPanning=!1),e){this.raycaster.setFromCamera(this.mouse,this.camera);let n=this.raycaster.intersectObjects(this.root.children,!1);if(n.length>0){let i=n[0].object,r=this.findPhotoIdForMesh(i);r&&this.onPhotoClickCallback?this.onPhotoClickCallback(r):!r&&this.onBackgroundClickCallback&&this.onBackgroundClickCallback()}else this.onBackgroundClickCallback&&this.onBackgroundClickCallback()}}onMouseWheel(t){if(!this.userControlEnabled)return;t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=t.deltaMode===0,n=t.deltaY,i=e?n*.01:n,r=1.125,o=i>0?r:1/r;this.zoomAtPoint(o,t.clientX,t.clientY),this.reEnableFisheyeAfterZoom()}onDoubleClick(t){return st(this,null,function*(){if(!this.userControlEnabled)return;t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=t.shiftKey?2.2:.45;yield this.animatedZoomAtPoint(e,t.clientX,t.clientY,.4),this.reEnableFisheyeAfterZoom()})}onKeyDown(t){if(!this.userControlEnabled)return;let e=t.target;if(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.tagName==="SELECT"||e.isContentEditable))return;let n=50;switch(t.key){case"ArrowUp":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(0,n);break;case"ArrowDown":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(0,-n);break;case"ArrowLeft":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(n,0);break;case"ArrowRight":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.panCamera(-n,0);break;case"+":case"=":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let i=this.container.clientWidth/2,r=this.container.clientHeight/2;this.zoomAtPoint(.9,i,r);break;case"-":case"_":t.preventDefault(),this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let o=this.container.clientWidth/2,a=this.container.clientHeight/2;this.zoomAtPoint(1.1,o,a);break;case"r":case"R":t.preventDefault(),this.resetCameraView(!0);break}}removeSvgBackground(){if(this.svgBackgroundPlane){let t=this.svgBackgroundPlane.material,e=t.opacity??1,n=performance.now(),i=400,r=o=>{let a=Math.min(1,(o-n)/i),l=1-a*(2-a);t.opacity=e*l,t.needsUpdate=!0,a<1?requestAnimationFrame(r):(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof en&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0)};requestAnimationFrame(r)}this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&(this.svgContainer.remove(),this.svgContainer=null),this.svgBackgroundOptions=void 0}setPhotoOpacity(t,e){let n=this.photoIdToMesh.get(t);n&&n.material&&"opacity"in n.material&&(n.material.opacity=e,n.material.transparent=!0,n.material.needsUpdate=!0)}setPhotoZIndex(t,e){let n=this.photoIdToMesh.get(t);n&&(n.renderOrder=e)}dispose(){this.isInitialized&&(window.removeEventListener("resize",this.onResize),this.textureCache.forEach(t=>t.dispose()),this.textureCache.clear(),this.loadingTextures.clear(),this.highResTextureCache.forEach(t=>t.dispose()),this.highResTextureCache.clear(),this.loadingHighResTextures.clear(),this.removeSvgBackground(),this.renderer&&this.container?.contains(this.renderer.domElement)&&this.container.removeChild(this.renderer.domElement),this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.hoveredItemSignal.set(!1),this.renderer?.dispose(),this.scene?.clear(),this.meshToUrl.clear(),this.highResActive.clear(),this.rafRunning=!1,this.isInitialized=!1,this.container=null)}initializeThreeJS(){return st(this,null,function*(){let t=this.platformService.isMobile?Math.min(1.5,window.devicePixelRatio||1):Math.min(2,window.devicePixelRatio||1);this.renderer=new Vo({antialias:!0,alpha:!1}),this.renderer.outputColorSpace=Re,this.renderer.setPixelRatio(t),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight);let e=this.renderer.getContext();this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.renderer.domElement.addEventListener("webglcontextlost",r=>{console.error("[THREE_RENDERER] WebGL context lost:",r),r.preventDefault()},!1),this.renderer.domElement.style.touchAction="none",this.container.appendChild(this.renderer.domElement),this.setupDragAndDrop(),this.scene=new Ls,this.scene.background=new Wt(this.BG),this.svgBackgroundOptions?.enabled&&this.setupSvgBackground(this.svgBackgroundOptions);let i=this.container.clientWidth/this.container.clientHeight;this.camera=new Ie(this.FOV_DEG,i,.1,1e5),this.targetCamZ=this.computeFitZWithMargin({minX:-this.PHOTO_W,maxX:this.PHOTO_W,minY:-this.PHOTO_H,maxY:this.PHOTO_H},ne.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN),this.zSpawn=this.targetCamZ/2,this.camera.position.set(0,0,this.targetCamZ),this.camera.lookAt(0,0,0),this.root=new On,this.scene.add(this.root),this.scene.add(new Bs(16777215,1)),this.texLoader=new Ns,this.texLoader.setCrossOrigin("anonymous"),window.addEventListener("resize",this.onResize),this.clock=new zs,this.startRenderLoop()})}startRenderLoop(){if(this.rafRunning)return;this.rafRunning=!0;let t=()=>{if(!this.rafRunning)return;let e=this.clock.getDelta();this.activeTweens=this.activeTweens.filter(u=>!u(e)),this.clampCameraToBounds();let n=this.camera.position.x,i=this.camera.position.y,r=this.camera.position.z;this.camera.position.x=this.damp(this.camera.position.x,this.targetCamX,this.CAM_DAMP,e),this.camera.position.y=this.damp(this.camera.position.y,this.targetCamY,this.CAM_DAMP,e),this.camera.position.z=this.damp(this.camera.position.z,this.targetCamZ,this.CAM_DAMP,e),this.camera.lookAt(this.targetCamX,this.targetCamY,0);let a=Math.abs(this.camera.position.x-n)>this.IDLE_THRESHOLD||Math.abs(this.camera.position.y-i)>this.IDLE_THRESHOLD||Math.abs(this.camera.position.z-r)>this.IDLE_THRESHOLD||this.activeTweens.length>0||this.isDragging||this.isPanning;this.idleCheckInterval+=e,a||this.idleCheckInterval>=this.IDLE_CHECK_INTERVAL?(this.updateFrustum(),this.applyFrustumCulling(),this.idleCheckInterval=0,this.isSceneIdle=!1):this.isSceneIdle||(this.isSceneIdle=!0),this.fisheyeEnabled&&this.applyFisheyeEffect(),this.frameCount++;let l=performance.now();if(this.performanceMonitoring&&l-this.lastFpsUpdate>=1e3){this.currentFps=this.frameCount;let u=(this.skippedFrames/this.frameCount*100).toFixed(1);this.frameCount=0,this.renderCount=0,this.skippedFrames=0,this.lastFpsUpdate=l}!this.isSceneIdle||this.fisheyeEnabled?(this.renderer.render(this.scene,this.camera),this.performanceMonitoring&&this.renderCount++):this.performanceMonitoring&&this.skippedFrames++,this.lodAccumTime+=e;let h=this.platformService.isMobile?.5:this.hoveredMesh?.05:.2;this.lodAccumTime>=h&&(this.lodAccumTime=0,this.runLodPass()),requestAnimationFrame(t)};requestAnimationFrame(t)}onResize=()=>{if(!this.container||!this.isInitialized)return;let t=this.container.clientWidth,e=this.container.clientHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.recomputeZoomLimits(),this.cameraMode==="auto-fit"&&(this.targetCamX=(this.bounds.minX+this.bounds.maxX)*.5,this.targetCamY=(this.bounds.minY+this.bounds.maxY)*.5,this.targetCamZ=this.computedMaxCamZ)};loadTexture(t){return st(this,null,function*(){if(this.textureCache.has(t))return this.textureCache.get(t);if(this.loadingTextures.has(t))return this.loadingTextures.get(t);let e=this.loadAndDownscaleImage(t).then(n=>{try{return this.configureTexture(n),this.textureCache.set(t,n),this.loadingTextures.delete(t),n}catch(i){throw console.error("[THREE_RENDERER] Error configuring texture:",t,i),this.loadingTextures.delete(t),n.dispose(),i}}).catch(n=>{throw console.error("[THREE_RENDERER] Failed to load texture:",t,n),this.loadingTextures.delete(t),n});return this.loadingTextures.set(t,e),e})}loadHighResTexture(t){return st(this,null,function*(){if(this.highResTextureCache.has(t))return this.highResTextureCache.get(t);if(this.loadingHighResTextures.has(t))return this.loadingHighResTextures.get(t);let e=this.loadFullResolutionImage(t).then(n=>{try{return this.configureTexture(n),this.highResTextureCache.set(t,n),this.loadingHighResTextures.delete(t),n}catch(i){throw console.error("[THREE_RENDERER] Error configuring high-res texture:",t,i),this.loadingHighResTextures.delete(t),n.dispose(),i}}).catch(n=>{throw console.error("[THREE_RENDERER] Failed to load high-res texture:",t,n),this.loadingHighResTextures.delete(t),n});return this.loadingHighResTextures.set(t,e),e})}loadFullResolutionImage(t){return st(this,null,function*(){return new Promise((e,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{let{width:r,height:o}=i;if(!r||!o||r<=0||o<=0){n(new Error(`Invalid image dimensions: ${r}x${o}`));return}if(r>this.maxTextureSize||o>this.maxTextureSize||this.platformService.isMobile){let l=Math.min(this.maxTextureSize,1024),c=this.platformService.isMobile?l:this.maxTextureSize;console.warn(`[THREE_RENDERER] Processing image for high-res: ${r}x${o}, target max: ${c}`);let h=r/o,u,d;if(r>o?(u=Math.min(c,r),d=u/h):(d=Math.min(c,o),u=d*h),u=Math.max(1,Math.floor(u)),d=Math.max(1,Math.floor(d)),u>this.maxTextureSize||d>this.maxTextureSize){n(new Error(`Calculated dimensions exceed max texture size: ${u}x${d}`));return}let p=document.createElement("canvas"),g=p.getContext("2d",{willReadFrequently:!1,alpha:!0});if(!g){n(new Error("Could not get 2D context from canvas"));return}p.width=u,p.height=d,g.clearRect(0,0,p.width,p.height);try{g.drawImage(i,0,0,p.width,p.height)}catch(m){n(new Error(`Failed to draw image to canvas: ${m}`));return}try{let m=g.getImageData(0,0,1,1);if(!m||!m.data||m.data.length===0){n(new Error("Canvas has no valid image data"));return}}catch(m){n(new Error(`Cannot read canvas data: ${m}`));return}let _=new xi(p);this.configureTexture(_),e(_);return}let a=new qe(i);this.configureTexture(a),e(a)}catch(r){n(r)}},i.onerror=()=>{n(new Error(`Failed to load full-res image: ${t}`))},i.src=t})})}configureTexture(t){if(!t)return;let e=t.image,n=e?.width??e?.naturalWidth??0,i=e?.height??e?.naturalHeight??0,r=n>0&&i>0&&this.isPowerOfTwo(n)&&this.isPowerOfTwo(i),o=this.platformService.isMobile;t.colorSpace=Re,t.wrapS=t.wrapT=gn,t.magFilter=Ue,t.anisotropy=o?1:this.ANISO,t.generateMipmaps=o?!1:r,t.minFilter=o?Ue:r?bn:Ue,t.needsUpdate=!0}isPowerOfTwo(t){return(t&t-1)===0&&t!==0}loadAndDownscaleImage(t){return st(this,null,function*(){let e=this.platformService.isMobile?zt.MAX_TEXTURE_DIMENSION_MOBILE:zt.MAX_TEXTURE_DIMENSION;return new Promise((n,i)=>{let r=new Image;r.crossOrigin="anonymous",r.onload=()=>{try{let{width:o,height:a}=r;if(!o||!a||o<=0||a<=0){i(new Error(`Invalid image dimensions: ${o}x${a}`));return}if(o<=e&&a<=e){if(o>this.maxTextureSize||a>this.maxTextureSize){i(new Error(`Image too large even for no-downscale path: ${o}x${a}`));return}let g=new qe(r);this.configureTexture(g),n(g);return}let l=o/a,c,h;if(o>a?(c=Math.min(e,o),h=c/l):(h=Math.min(e,a),c=h*l),c=Math.max(1,Math.floor(c)),h=Math.max(1,Math.floor(h)),c>this.maxTextureSize||h>this.maxTextureSize){i(new Error(`Calculated dimensions exceed max texture size: ${c}x${h}`));return}let u=document.createElement("canvas"),d=u.getContext("2d",{willReadFrequently:!1,alpha:!0});if(!d){i(new Error("Could not get 2D context from canvas"));return}u.width=c,u.height=h,d.clearRect(0,0,u.width,u.height);try{d.drawImage(r,0,0,u.width,u.height)}catch(g){i(new Error(`Failed to draw image to canvas: ${g}`));return}let p=new xi(u);this.configureTexture(p),n(p)}catch(o){i(o)}},r.onerror=()=>{i(new Error(`Failed to load image: ${t}`))},r.src=t})})}setupSvgBackground(t){if(!t.svgElement){console.warn("\u274C No SVG element provided to setupSvgBackground");return}let e=new XMLSerializer().serializeToString(t.svgElement),n=document.createElement("canvas"),i=n.getContext("2d"),r=t.svgElement.getAttribute("width"),o=t.svgElement.getAttribute("height"),a=parseInt(r||"0")||this.container.clientWidth,l=parseInt(o||"0")||this.container.clientHeight,c=4e3,h=c/a,u=c/l;n.width=c,n.height=c;let d=new Image;d.onload=()=>{i.clearRect(0,0,n.width,n.height),i.scale(h,u),i.drawImage(d,0,0,a,l),this.svgBackgroundTexture=new xi(n),this.svgBackgroundTexture.needsUpdate=!0;let _=t.radius||2e4,m=new Bn(_*2,_*2),f=t.desiredOpacity??1,T=new un({map:this.svgBackgroundTexture,transparent:!0,opacity:0,depthWrite:!1});this.svgBackgroundPlane=new De(m,T),this.svgBackgroundPlane.position.set(0,0,-1),this.svgBackgroundPlane.renderOrder=-1e3,t.offsetX&&(this.svgBackgroundPlane.position.x+=t.offsetX),t.offsetY&&(this.svgBackgroundPlane.position.y+=t.offsetY),t.scale&&this.svgBackgroundPlane.scale.setScalar(t.scale),this.scene.add(this.svgBackgroundPlane),this.animateMaterialOpacity(T,f,650)},d.onerror=_=>{console.error("\u274C Failed to load SVG image:",_)};let p=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),g=URL.createObjectURL(p);d.src=g}computeFitZWithMargin(t,e,n,i){let r=t.maxX-t.minX,o=t.maxY-t.minY,a=r+2*i,c=(o+2*i)*.5/Math.tan(e*.5),h=2*Math.atan(Math.tan(e*.5)*n),u=a*.5/Math.tan(h*.5);return Math.max(c,u)*1.1}clamp01(t){return Math.max(0,Math.min(1,t))}zoomAtCenter(t){if(!this.container)return Promise.resolve();this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled"),this.disableFisheyeForZoom();let e=this.container.getBoundingClientRect(),n=e.left+e.width/2,i=e.top+e.height/2;return this.animatedZoomAtPoint(t,n,i,.3).then(()=>{this.reEnableFisheyeAfterZoom()})}focusOnPosition(t,e,n=800){this.cameraMode="user-controlled",this.targetCamX=t,this.targetCamY=e,this.targetCamZ=ne.clamp(n,this.computedMinCamZ,this.computedMaxCamZ)}focusOnPositionAnimated(t,e,n=800,i=1){return new Promise(r=>{this.cameraMode="user-controlled";let o=this.targetCamX,a=this.targetCamY,l=this.targetCamZ,c=ne.clamp(n,this.computedMinCamZ,this.computedMaxCamZ);if(i<=.01){this.targetCamX=t,this.targetCamY=e,this.targetCamZ=c,r();return}let h=.7,u=!1,d=this.makeTween(i,p=>{let g=this.easeOutCubic(p);this.targetCamX=this.lerp(o,t,g),this.targetCamY=this.lerp(a,e,g),this.targetCamZ=this.lerp(l,c,g),!u&&p>=h&&(u=!0,this.disableFisheyeForZoom(),this.fisheyeAnimationLock=!0,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal),p>=1&&(this.targetCamX=t,this.targetCamY=e,this.targetCamZ=c,this.fisheyeResumeOnPointer=this.fisheyeEnabledSignal,r())});this.addTween(d)})}animatedZoomAtPoint(t,e,n,i){if(!this.userControlEnabled)return Promise.resolve();this.cameraMode==="auto-fit"&&(this.cameraMode="user-controlled");let r=this.targetCamZ,o=this.targetCamX,a=this.targetCamY,l=ne.clamp(r*t,this.computedMinCamZ,this.computedMaxCamZ),c=this.container.getBoundingClientRect(),h=(e-c.left)/c.width*2-1,u=-((n-c.top)/c.height)*2+1,d=this.projectScreenToWorld(h,u,o,a,r),p=this.projectScreenToWorld(h,u,o,a,l),g=o+(d.x-p.x),_=a+(d.y-p.y);return this.runTween(this.makeTween(i,m=>{this.targetCamZ=ne.lerp(r,l,m),this.targetCamX=ne.lerp(o,g,m),this.targetCamY=ne.lerp(a,_,m)}))}updateFrustum(){this.camera.updateMatrixWorld(),this.frustumMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.frustumMatrix)}applyFrustumCulling(){this.visibleMeshCount=0,this.totalMeshCount=0;for(let t of this.root.children){let e=t;if(this.totalMeshCount++,e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),e.geometry.boundingSphere){e.updateMatrixWorld();let n=e.geometry.boundingSphere.clone();n.applyMatrix4(e.matrixWorld);let i=this.frustum.intersectsSphere(n);e.visible!==i&&(e.visible=i),i&&this.visibleMeshCount++}}this.cullingLogCounter++,this.performanceMonitoring&&this.cullingLogCounter>=100&&(this.cullingLogCounter=0)}runLodPass(){if(!this.container)return;let t=1,e=0;for(let n of this.root.children){let i=n;if(!i.visible)continue;let r=this.meshToUrl.get(i);if(!r)continue;let o=this.highResActive.has(i),a=Math.max(.001,Math.abs(i.position.z-this.camera.position.z)),l=this.getVisibleWidthAtDepth(a)*2,c=this.container.clientWidth/Math.max(1,l),h=this.PHOTO_W*c,u=this.PHOTO_H*c,d=this.container.clientWidth||1,p=this.container.clientHeight||1,g=h>=d*.3||u>=p*.3,_=this.findPhotoIdForMesh(i);if(!(this.permalinkTargetId!==null&&_===this.permalinkTargetId||this.fisheyeAffectedMeshes.has(i)||g)){o&&this.downgradeToLowResTexture(i,r).then(()=>this.highResActive.delete(i)).catch(()=>{});continue}!o&&h>=t?this.upgradeToHighResTexture(i,r).then(()=>{this.highResActive.add(i)}).catch(()=>{}):o&&h<=e&&this.downgradeToLowResTexture(i,r).then(()=>{this.highResActive.delete(i)}).catch(()=>{})}}updateCameraFov(t){this.camera&&this.camera.isPerspectiveCamera&&(this.camera.fov=t,this.camera.updateProjectionMatrix())}getCurrentZoomLevel(){return this.computedMaxCamZ/this.targetCamZ}updateCameraZoom(t){this.camera&&(this.camera.zoom=t,this.camera.updateProjectionMatrix?.())}setRotationSpeed(t){this.rotationSpeedMultiplier=t}setPanSensitivity(t){this.panSensitivityMultiplier=t}setDepthOfField(t){if(!this.dofPass){this.dofStrength=t;return}if(this.dofStrength=t,t>0){let n=t/100*15;this.dofPass.uniforms.focalDepth.value=5e3,this.dofPass.uniforms.bokeh.value=!0,this.dofPass.uniforms.maxblur.value=n}}disableDepthOfField(){this.dofStrength=0,this.dofPass&&(this.dofPass.uniforms.bokeh.value=!1)}static \u0275fac=function(e){return new(e||s)};static \u0275prov=Ri({token:s,factory:s.\u0275fac,providedIn:"root"})};var ig=["container"],sg=["titleElement"];function rg(s,t){s&1&&(Bt(0,"div",3),Me(1,"div",40),Qt())}function og(s,t){if(s&1){let e=mn();Bt(0,"app-qrcode",41),Se("click",function(){fe(e);let i=xe();return pe(i.toggleQrSize())}),Qt()}if(s&2){let e=xe();li("small",e.qrSmall())("url",e.qrUrl())}}function ag(s,t){if(s&1){let e=mn();Bt(0,"div",42)(1,"app-filters-bar",43),Se("filtersChange",function(i){fe(e);let r=xe();return pe(r.onFiltersChange(i))})("filtersCommit",function(i){fe(e);let r=xe();return pe(r.onFiltersChange(i))}),Qt()()}if(s&2){let e=xe();Ve("open",e.filtersBarOpen()),le(),li("counts",e.filterCounts())("totalCount",e.totalPhotoCount())("filteredCount",e.totalPhotoCount())("showViewToggle",!1)("showOrderBy",!1)("initialState",e.currentFilters())}}function lg(s,t){if(s&1&&Di(0),s&2){let e=xe(2);$o(" \u2756 ",e.workspaceTitle(),"")}}function cg(s,t){if(s&1&&(Bt(0,"div",44,1),Di(2),on(3,lg,1,1),Qt()),s&2){let e=xe();Ve("needs-animation",e.titleNeedsAnimation()),le(2),$o(" ",e.workspaceTitle(),""),le(),Je(e.titleNeedsAnimation()?3:-1)}}function hg(s,t){if(s&1){let e=mn();Bt(0,"button",47),Se("click",function(){fe(e);let i=xe(2);return pe(i.clearSearch())}),Di(1," \xD7 "),Qt()}}function ug(s,t){if(s&1){let e=mn();Bt(0,"div",19)(1,"input",45),Se("input",function(i){fe(e);let r=xe();return pe(r.onSearchInput(i))})("keydown.escape",function(){fe(e);let i=xe();return pe(i.clearSearch())}),Qt(),on(2,hg,2,0,"button",46),Qt()}if(s&2){let e=xe();le(),li("value",e.searchText()),le(),Je(e.searchText()?2:-1)}}function dg(s,t){if(s&1){let e=mn();Bt(0,"button",48),Se("click",function(){fe(e);let i=xe();return pe(i.toggleRandomShowcase())}),sn(),Bt(1,"svg",10),Me(2,"circle",49)(3,"circle",50)(4,"circle",51)(5,"circle",52),Qt()(),An(),Bt(6,"button",53),Se("click",function(){fe(e);let i=xe();return pe(i.toggleFiltersBar())}),sn(),Bt(7,"svg",10),Me(8,"path",54),Qt()()}if(s&2){let e=xe();Ve("active",e.enableRandomShowcase()),le(6),Ve("active",e.filtersBarOpen())}}function fg(s,t){if(s&1){let e=mn();Bt(0,"div",39)(1,"button",55),Se("click",function(){fe(e);let i=xe();return pe(i.toggleSvgAutoPositioning())}),sn(),Bt(2,"svg",10),Me(3,"path",56),Qt()()()}if(s&2){let e=xe();le(),Ve("active",e.enableSvgAutoPositioning())}}var Mh=class s{constructor(t,e,n,i,r,o){this.route=t;this.changeDetectorRef=e;this.apiService=n;this.http=i;this.platform=r;this.rendererService=o;this.activatedRoute=t,this.photoRepository=new nr,Oi(()=>{let u=this.searchText();this.photoRepository.getAllPhotos().length>0&&setTimeout(()=>this.applySearchFilter(),50)}),Oi(()=>{let u=this.currentFilters();this.isAdmin()&&this.photoRepository&&this.photoRepository.getAllPhotos().length>0&&setTimeout(()=>this.applyFilters(),50)}),this.loop.pipe(xl()).subscribe(u=>st(this,null,function*(){if(u=u.sort((d,p)=>d.created_at.localeCompare(p.created_at)),this.lastCreatedAt==="0"&&u.length>0){let d=u.map(_=>st(this,null,function*(){let m=_._id,T=_.screenshot_url||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=";_.screenshot_url||console.warn("[SHOWCASE_WS] Missing screenshot_url for item",m,"using placeholder image");let w=_.transition_bar_position||this.getDefaultTransitionBarPosition(_),x=Ke(Ht({},_),{id:m,url:T,created_at:_.created_at,screenshot_url:T,layout_x:_.layout_x,layout_y:_.layout_y,plausibility:_.plausibility,favorable_future:_.favorable_future,transition_bar_position:w,item_key:_._key??_.item_key??_._key});try{yield this.photoRepository.addPhoto(x),this.loadedPhotoIds.add(m)}catch(C){console.error("Error loading photo immediately:",C)}}));if(yield Promise.all(d),this.searchIndex.clear(),this.qrSmall.set(!0),this.isLoading.set(!1),this.currentLayout()!=="circle-packing")try{switch(this.currentLayout()){case"tsne":yield this.switchToTsneLayout();break;case"svg":yield this.switchToSvgLayout();break}}catch(_){console.error("Error switching initial layout:",_)}setTimeout(()=>{this.isLayoutLoading.set(!1)},2e3),this.searchText()&&this.applySearchFilter();let p=this.focusItemId();p&&(this.rendererService.setCameraMode("user-controlled"),this.focusOnItem(p,{animateFromFull:!0,fromShowOnMap:!0}));let g=u[u.length-1];this.lastCreatedAt=g.created_at}else{let d=u.filter(p=>{let g=p.created_at;return g&&g>this.lastCreatedAt});if(d.length>0){let p=d.map(g=>st(this,null,function*(){let _=g._id,f=g.screenshot_url||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y21DLsAAAAASUVORK5CYII=";g.screenshot_url||console.warn("[SHOWCASE_WS] Missing screenshot_url for item",_,"using placeholder image");let T=g.transition_bar_position||this.getDefaultTransitionBarPosition(g),w=Ke(Ht({},g),{id:_,url:f,created_at:g.created_at,screenshot_url:f,plausibility:g.plausibility,favorable_future:g.favorable_future,transition_bar_position:T,item_key:g._key??g.item_key??g._key});try{yield this.photoRepository.addPhoto(w),this.loadedPhotoIds.add(_),this.lastCreatedAt=g.created_at}catch(x){console.error("Error adding photo to queue:",x)}}));yield Promise.all(p),this.searchIndex.clear()}}this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase()),setTimeout(()=>{this.destroy$.closed||this.getItems().subscribe(d=>{this.loop.next(d)})},ue.API_POLLING_INTERVAL)}));let a=this.activatedRoute.snapshot.queryParams;this.workspace.set(a.workspace||"WORKSPACE_NOT_SET"),this.api_key.set(a.api_key||"API_KEY_NOT_SET"),this.admin_key.set(a.admin_key||"ADMIN_KEY_NOT_SET"),this.lang.set(a.lang?a.lang+"/":"");let l=this.admin_key(),c=l!==""&&l!=="ADMIN_KEY_NOT_SET";if(this.photoRepository.setDragEnabled(c),this.platform.browser()){let u=window.location.hash.slice(1).split("?")[0];u&&!u.includes("search=")&&this.focusItemId.set(u)}this.focusItemId()&&(this.currentLayout.set("svg"),this.enableSvgAutoPositioning.set(!0)),this.workspace()!=="WORKSPACE_NOT_SET"&&this.fetchWorkspaceData(),(a.fisheye==="1"||a.fisheye==="true")&&this.fisheyeEnabled.set(!0),n.updateFromRoute(this.activatedRoute.snapshot);let h=this.resolveAuthToken();h&&n.api_key.set(h)}container;titleElement;router=ai(Cl);photoRepository;activatedRoute;destroy$=new oi;loop=new oi;lastCreatedAt="0";qrSmall=Zt(!1);workspace=Zt("");workspaceTitle=Zt("");api_key=Zt("");admin_key=Zt("");lang=Zt("");allowAdditionalContributions=Zt(!0);currentLayout=Zt("circle-packing");enableRandomShowcase=Zt(!1);enableSvgAutoPositioning=Zt(!0);fisheyeEnabled=Zt(!1);currentZoomLevel=Zt(1);sidebarOpen=Zt(!1);selectedItemId=Zt(null);focusItemId=Zt(null);selectedItemKey=ze(()=>{let t=this.selectedItemId();return t&&this.photoRepository.getPhoto(t)?.metadata?.item_key||null});isAdmin=ze(()=>this.admin_key()!==""&&this.admin_key()!=="ADMIN_KEY_NOT_SET");canEditSelectedItem=ze(()=>this.isAdmin()||this.selectedItemKey()!==null&&this.selectedItemKey()!=="");filterCounts=ze(()=>{if(!this.photoRepository)return{status:new Map,author:new Map,preference:new Map,potential:new Map,type:new Map};let t=this.photoRepository.getAllPhotos(),e=new Map,n=new Map,i=new Map,r=new Map,o=new Map;return t.forEach(a=>{let l=a.metadata,c=l._private_moderation,h="pending";c===0?h="banned":c===1?h="flagged":c===3?h="not-flagged":c===4?h="approved":c===5&&(h="highlighted"),e.set(h,(e.get(h)||0)+1);let u=l.author_id||"unknown";n.set(u,(n.get(u)||0)+1);let d=l.favorable_future;d&&i.set(d,(i.get(d)||0)+1);let p=l.plausibility;if(p!=null){let _=String(p);r.set(_,(r.get(_)||0)+1)}let g=l.screenshot_type;g&&o.set(g,(o.get(g)||0)+1)}),{status:e,author:n,preference:i,potential:r,type:o}});totalPhotoCount=ze(()=>this.photoRepository?this.photoRepository.getAllPhotos().length:0);fisheyeSettings=Zt({enabled:!0,maxMagnification:10,radius:700,maxHeight:50});searchText=Zt("");searchActive=Zt(!1);searchIndex=new Map;filtersBarOpen=Zt(!1);currentFilters=Zt({status:["new","flagged","not-flagged","approved","highlighted","rejected"],author:"all",preference:["prefer","mostly prefer","uncertain","mostly prevent","prevent","none"],potential:["100","75","50","25","0","none"],type:"all",search:"",orderBy:"date"});resolveAuthToken(){let t=this.admin_key();if(t&&t!=="ADMIN_KEY_NOT_SET")return t;let e=this.api_key();return e&&e!=="API_KEY_NOT_SET"?e:null}getSearchableText(t){let e=this.searchIndex.get(t.metadata.id);if(e)return e;let n=[],i=o=>{if(o==null)return;let a=typeof o;a==="string"||a==="number"||a==="boolean"?n.push(String(o)):Array.isArray(o)?o.forEach(i):a==="object"&&Object.values(o).forEach(i)};i(t.metadata);let r=n.join(" ").toLowerCase();return this.searchIndex.set(t.metadata.id,r),r}isLoading=Zt(!0);isLayoutLoading=Zt(!0);viewInitialized=Zt(!1);titleNeedsAnimation=Zt(!1);isDragging=ze(()=>this.rendererService.isDraggingItem());isHoveringItem=ze(()=>this.rendererService.isHoveringItem()());loadedPhotoIds=new Set;layoutChangeInProgress=!1;svgBackgroundStrategy=null;circlePackingForSvg=null;svgCircleRadius=15e3;qrUrl=ze(()=>`https://mapfutur.es/${this.lang()}prescan?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`);isMobile=ze(()=>this.platform.isMobile);onMessageFromChild=t=>{let e=t.data;if(!(!e||typeof e!="object")&&e.type==="show-on-map"){let n=typeof e.itemId=="string"?e.itemId:null;if(!n)return;this.sidebarOpen.set(!1),this.selectedItemId.set(null),this.focusOnItem(n,{animateFromFull:!0,fromShowOnMap:!0})}};toggleRandomShowcase(){this.enableRandomShowcase.set(!this.enableRandomShowcase()),this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase())}toggleQrSize(){this.qrSmall.set(!this.qrSmall())}toggleFisheyeEffect(){let t=!this.fisheyeEnabled();if(this.fisheyeEnabled.set(t),this.rendererService.enableFisheyeEffect(t),t){let e=this.fisheyeSettings();this.rendererService.setFisheyeConfig({magnification:e.maxMagnification,radius:e.radius,maxHeight:e.maxHeight,viewportHeight:window.innerHeight})}}toggleSvgAutoPositioning(){return st(this,null,function*(){if(this.layoutChangeInProgress){console.warn("[TOGGLE] Layout change in progress, ignoring auto-position toggle");return}let e=!this.enableSvgAutoPositioning();if(this.enableSvgAutoPositioning.set(e),this.photoRepository.setSvgAutoPositioningEnabled(e),this.currentLayout()==="svg"){this.layoutChangeInProgress=!0;try{yield this.applySvgLayoutMode(e)}finally{this.layoutChangeInProgress=!1}}})}applySvgLayoutMode(t){return st(this,null,function*(){if(!this.svgBackgroundStrategy||!this.circlePackingForSvg){console.warn("[SVG] Strategies not initialized; run switchToSvgLayout first");return}let e=t?this.svgBackgroundStrategy:this.circlePackingForSvg;yield this.photoRepository.setLayoutStrategy(e),this.rendererService.setLayoutStrategyReference(e)})}getDefaultTransitionBarPosition(t){if(t.transition_bar_position)return t.transition_bar_position;let e=["before","during","after"],n=0,i=t._id||"";for(let o=0;o<i.length;o++){let a=i.charCodeAt(o);n=(n<<5)-n+a,n=n&n}let r=Math.abs(n)%3;return e[r]}repositionPhoto(t){return st(this,null,function*(){let e=this.photoRepository.getLayoutStrategy();if(!e)return;let n=this.photoRepository.getAllPhotos(),i=this.enableSvgAutoPositioning(),r=yield e.getPositionForPhoto(t,n,{enableAutoPositioning:i});if(!r||!t.mesh)return;let o={x:r.x,y:r.y,z:0};t.setTargetPosition(o);let a=t.mesh,l=a.position.x-o.x,c=a.position.y-o.y;if(Math.sqrt(l*l+c*c)>1){let h={x:a.position.x,y:a.position.y,z:a.position.z};yield this.rendererService.animateToPosition(a,h,o,.5),t.setCurrentPosition(o)}})}recalculateClusterLayout(t){return st(this,null,function*(){if(!t)return;let n=this.photoRepository.getAllPhotos().filter(i=>i.metadata.author_id===t);n.length!==0&&(yield Promise.all(n.map(i=>this.repositionPhoto(i))))})}fetchWorkspaceData(){let t=this.workspace(),e=this.resolveAuthToken();if(!t||t==="WORKSPACE_NOT_SET"||!e)return;let n={headers:{Authorization:e}};this.http.get(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${t}`,n).subscribe({next:i=>{if(i){let r=i.source||i.title||"";this.workspaceTitle.set(r);let o=i.collaborate!==!1;this.allowAdditionalContributions.set(o)}},error:i=>{console.error("Error fetching workspace data:",i)}})}getItems(){let t={},e=this.resolveAuthToken();return e&&(t.headers={Authorization:e}),this.http.get(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`,t).pipe(yl(n=>(console.error("Error loading items:",n),gl([]))))}ngAfterViewInit(){return st(this,null,function*(){this.platform.browser()&&(window.addEventListener("message",this.onMessageFromChild),window.addEventListener("hashchange",()=>this.updateActiveItemZIndex()),window.addEventListener("resize",()=>this.measureTitle()),window.addEventListener("keydown",this.onKeyDown.bind(this)),this.measureTitle(),yield this.initialize(this.container.nativeElement),this.viewInitialized.set(!0))})}onKeyDown(t){if(t.key==="p"||t.key==="P"){let e=this.rendererService.getPerformanceMetrics();this.rendererService.enablePerformanceMonitoring(!e.isMonitoring)}}measureTitle(){this.titleElement&&setTimeout(()=>{let t=this.titleElement?.nativeElement;if(t){let e=t.scrollWidth>t.clientWidth;this.titleNeedsAnimation.set(e)}},0)}initialize(t){return st(this,null,function*(){yield this.rendererService.initialize(t,{photoWidth:zt.PHOTO_WIDTH,photoHeight:zt.PHOTO_HEIGHT}),this.rendererService.setPhotoClickCallback(r=>{this.onPhotoClick(r)}),this.rendererService.setBackgroundClickCallback(()=>{this.onBackgroundClick()});let e=this.fisheyeSettings();e.enabled&&(this.rendererService.enableFisheyeEffect(!0),this.rendererService.setFisheyeConfig({magnification:e.maxMagnification,radius:e.radius,maxHeight:e.maxHeight,viewportHeight:window.innerHeight}));let n=this.activatedRoute.snapshot.queryParams;if((n.fisheye==="0"||n.fisheye==="false")&&this.rendererService.enableFisheyeEffect(!1),(n.perf==="1"||n.perf==="true")&&this.rendererService.enablePerformanceMonitoring(!0),n.fisheye_radius){let r=parseFloat(n.fisheye_radius);isNaN(r)||this.rendererService.setFisheyeConfig({radius:r})}if(n.fisheye_magnification){let r=parseFloat(n.fisheye_magnification);isNaN(r)||this.rendererService.setFisheyeConfig({magnification:r})}if(n.fisheye_distortion){let r=parseFloat(n.fisheye_distortion);isNaN(r)||this.rendererService.setFisheyeConfig({distortion:r})}let i=new Li({photoWidth:zt.PHOTO_WIDTH,photoHeight:zt.PHOTO_HEIGHT,spacingX:zt.SPACING_X,spacingY:zt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()});if(yield this.photoRepository.initialize(i,this.rendererService,{enableRandomShowcase:this.enableRandomShowcase(),showcaseInterval:ue.SHOWCASE_INTERVAL,newPhotoAnimationDelay:ue.NEW_PHOTO_ANIMATION_DELAY}),this.photoRepository.photoAdded$.pipe(ps(this.destroy$)).subscribe(r=>{}),this.photoRepository.photoRemoved$.pipe(ps(this.destroy$)).subscribe(r=>{}),this.photoRepository.layoutChanged$.pipe(ps(this.destroy$)).subscribe(()=>{}),vl(500).pipe(ps(this.destroy$)).subscribe(()=>{this.currentZoomLevel.set(this.rendererService.getCurrentZoomLevel())}),this.platform.browser()){let r=window.location.hash.substring(1),a=new URLSearchParams(r).get("search");if(a){let l=a.replace(/\+/g," ");this.searchText.set(l),l&&this.searchActive.set(!0)}_l(ue.INITIAL_POLLING_DELAY).subscribe(()=>{this.getItems().subscribe(l=>{this.loop.next(l)})})}})}switchToTsneLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){if(!this.workspace()){console.error("Workspace not set");return}this.layoutChangeInProgress=!0;try{this.currentLayout.set("tsne");let t=new tr(this.workspace(),void 0,{photoWidth:zt.PHOTO_WIDTH,photoHeight:zt.PHOTO_HEIGHT,spacingX:zt.SPACING_X,spacingY:zt.SPACING_Y});yield t.initialize(),this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),yield this.photoRepository.setLayoutStrategy(t)}catch(t){console.error("Error switching to TSNE layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToSvgLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("svg");let e=this.activatedRoute.snapshot.queryParams.svg||"/showcase-bg.svg",n=-this.svgCircleRadius*1.6,i=0;this.svgBackgroundStrategy=new er({svgPath:e,centerX:0,centerY:0,circleRadius:this.svgCircleRadius,radiusVariation:0,svgOffsetX:n,svgOffsetY:i}),yield this.svgBackgroundStrategy.initialize(),this.circlePackingForSvg=new Li({photoWidth:zt.PHOTO_WIDTH,photoHeight:zt.PHOTO_HEIGHT,spacingX:zt.SPACING_X,spacingY:zt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()}),this.rendererService.setDragCompleteCallback((h,u)=>st(this,[h,u],function*(o,{position:a,isOutOfBounds:l,hotspotData:c}){let d=this.photoRepository.getPhotoById(o);if(!d){console.warn("[DRAG] Photo not found:",o);return}let p=d.metadata.author_id,g={};if(l)d.updateMetadata({layout_x:void 0,layout_y:void 0}),g.layout_x=null,g.layout_y=null;else{let{layout_x:T,layout_y:w}=this.svgBackgroundStrategy.worldToNormalized(a.x,a.y);d.updateMetadata({layout_x:T,layout_y:w}),g.layout_x=T,g.layout_y=w,c&&(d.updateMetadata(c),Object.assign(g,c))}let _=this.workspace(),m=this.admin_key();if(_&&m&&_!=="WORKSPACE_NOT_SET"&&m!=="ADMIN_KEY_NOT_SET")try{yield new Promise((T,w)=>{this.apiService.updateProperties(g,o).subscribe({next:()=>T(),error:x=>{console.error("[DRAG] Error saving to API:",x),w(x)}})})}catch(T){console.error("[DRAG] Error saving to API:",T)}yield this.recalculateClusterLayout(p);let f=d.metadata.author_id;f&&f!==p&&(yield this.recalculateClusterLayout(f)),l&&(yield this.repositionPhoto(d))}));let r=this.svgBackgroundStrategy.getSvgElement();r?(this.rendererService.setSvgBackground(r,{scale:1,offsetX:n,offsetY:0,radius:this.svgCircleRadius,desiredOpacity:1}),this.rendererService.setLayoutStrategyReference(this.svgBackgroundStrategy)):console.warn("\u274C SVG element is null, cannot set background"),this.photoRepository.setSvgVisible(!0,this.svgBackgroundStrategy),this.photoRepository.setSvgAutoPositioningEnabled(this.enableSvgAutoPositioning()),yield this.applySvgLayoutMode(this.enableSvgAutoPositioning())}catch(t){console.error("Error switching to SVG layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToCirclePackingLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("circle-packing");let t=new Li({photoWidth:zt.PHOTO_WIDTH,photoHeight:zt.PHOTO_HEIGHT,spacingX:zt.SPACING_X,spacingY:zt.SPACING_Y,groupBuffer:1500,photoBuffer:0,useFanLayout:!this.isMobile()});this.rendererService.removeSvgBackground(),this.photoRepository.setSvgVisible(!1),yield this.photoRepository.setLayoutStrategy(t)}catch(t){console.error("Error switching to Circle Packing layout:",t)}finally{this.layoutChangeInProgress=!1}}})}getLayoutIndicatorTransform(){return`translateX(${(this.currentLayout()==="svg"?0:1)*108}px)`}resetView(){this.rendererService.resetCameraView(!0)}zoomIn(){this.rendererService.zoomAtCenter(.65)}zoomOut(){this.rendererService.zoomAtCenter(1.5)}onSearchInput(t){let e=t.target;this.searchText.set(e.value)}clearSearch(){this.searchText.set(""),this.searchActive.set(!1)}updateSearchHash(){let t=this.searchText(),e=new URLSearchParams(window.location.hash.substring(1));t?e.set("search",t.replace(/ /g,"+")):e.delete("search");let n=e.toString();n?window.location.hash=n:window.location.hash=""}applySearchFilter(){let t=this.searchText().toLowerCase().trim(),e=this.photoRepository.getAllPhotos();if(this.updateSearchHash(),!t){let r=0;this.searchIndex.clear(),e.forEach(o=>{this.rendererService.setPhotoOpacity(o.metadata.id,1),this.rendererService.setPhotoZIndex(o.metadata.id,0),r++});return}let n=0,i=0;e.forEach(r=>{this.getSearchableText(r).includes(t)?(this.rendererService.setPhotoOpacity(r.metadata.id,1),this.rendererService.setPhotoZIndex(r.metadata.id,100),n++):(this.rendererService.setPhotoOpacity(r.metadata.id,.2),this.rendererService.setPhotoZIndex(r.metadata.id,-100),i++)})}goBack(){this.router.navigate(["/"],{queryParamsHandling:"preserve"})}toggleFiltersBar(){this.filtersBarOpen.set(!this.filtersBarOpen())}onFiltersChange(t){this.currentFilters.set(t)}applyFilters(){if(!this.photoRepository)return;if(!this.isAdmin()){this.photoRepository.getAllPhotos().forEach(i=>{this.rendererService.setPhotoOpacity(i.metadata.id,1),this.rendererService.setPhotoZIndex(i.metadata.id,0)});return}let t=this.currentFilters();this.photoRepository.getAllPhotos().forEach(n=>{if(!n.mesh)return;this.photoMatchesFilters(n,t)?(this.rendererService.setPhotoOpacity(n.metadata.id,1),this.rendererService.setPhotoZIndex(n.metadata.id,0)):(this.rendererService.setPhotoOpacity(n.metadata.id,.2),this.rendererService.setPhotoZIndex(n.metadata.id,-100))})}photoMatchesFilters(t,e){let n=t.metadata;if(e.status.length>0&&e.status.length<6){let i=n._private_moderation;if(!this.matchesStatusFilter(i,e.status))return!1}if(e.author!=="all"&&n.author_id!==e.author)return!1;if(e.preference.length>0&&e.preference.length<6){let i=n.favorable_future||n._svgZoneFavorableFuture;if(!this.matchesPreferenceFilter(i,e.preference))return!1}if(e.potential.length>0&&e.potential.length<6){let i=n.plausibility;if(!this.matchesPotentialFilter(i,e.potential))return!1}return!(e.type!=="all"&&n.screenshot_type!==e.type||e.search&&!this.getSearchableText(t).includes(e.search.toLowerCase().trim()))}matchesStatusFilter(t,e){if(e.length===0)return!0;let n={new:2,flagged:1,"not-flagged":3,approved:4,highlighted:5,rejected:0};for(let i of e){let r=n[i];if(r!=null){if(i==="new"){if(t==null||t===2)return!0}else if(t===r)return!0}}return!1}matchesPreferenceFilter(t,e){if(e.length===0||e.length===6)return!0;if(!t)return e.includes("none");let n=t.toLowerCase().trim(),r={prefer:"prefer",favor:"prefer",favorable:"prefer",preferred:"prefer","mostly prefer":"mostly prefer",uncertain:"uncertain","mostly prevent":"mostly prevent",prevent:"prevent",unfavorable:"prevent"}[n];return r?e.includes(r):!1}matchesPotentialFilter(t,e){if(e.length===0||e.length===6)return!0;if(typeof t!="number"||!isFinite(t))return e.includes("none");let n;return t>=90?n="100":t>=70?n="75":t>=40?n="50":t>=10?n="25":n="0",e.includes(n)}onSettingsChange(t){this.fisheyeSettings.set(t),this.rendererService.enableFisheyeEffect(t.enabled),this.rendererService.setFisheyeConfig({magnification:t.maxMagnification,radius:t.radius,maxHeight:t.maxHeight,viewportHeight:window.innerHeight})}onPhotoClick(t){window.location.hash=t,this.updateActiveItemZIndex(),this.isAdmin()?(this.selectedItemId.set(t),this.sidebarOpen.set(!0)):this.focusOnItem(t,{animateFromFull:!0,fromShowOnMap:!0})}focusOnItem(t,e){return st(this,null,function*(){this.rendererService.setPermalinkTarget(t),this.rendererService.setCameraMode("user-controlled");let n=0;for(;n<this.MAX_FOCUS_ATTEMPTS;){let i=this.photoRepository.getPhoto(t);if(i&&i.mesh&&i.animationState==="positioned"){let r=i.mesh.position,o=e?.animateFromFull===!0;if(o&&e?.fromShowOnMap)yield this.rendererService.focusOnItemFromShowOnMap(r.x,r.y,i);else if(o){this.rendererService.setCameraMode("user-controlled");let a=this.rendererService.getCurrentBounds(),l=this.rendererService.computeFitZWithMargin(a,Math.PI*45/180,window.innerWidth/window.innerHeight,300);yield this.rendererService.focusOnPositionAnimated(r.x,r.y,l,1);let c=l*.5;yield this.rendererService.focusOnPositionAnimated(r.x,r.y,c,2)}else this.rendererService.focusOnPosition(r.x,r.y,this.DEFAULT_FOCUS_ZOOM);return}yield new Promise(r=>setTimeout(r,this.FOCUS_RETRY_DELAY_MS)),n++}console.warn("[SHOWCASE_WS] Could not find photo to focus on:",t)})}updateActiveItemZIndex(){let t=window.location.hash.slice(1);if(t){let e=this.photoRepository.getPhoto(t);e&&e.mesh&&(e.mesh.renderOrder=100)}else this.resetAllItemsZIndex()}resetAllItemsZIndex(){let t=this.photoRepository.getAllPhotos?.();t&&t.forEach(e=>{e.mesh&&(e.mesh.renderOrder=0)})}canEdit=ze(()=>this.isAdmin());MAX_FOCUS_ATTEMPTS=50;FOCUS_RETRY_DELAY_MS=100;DEFAULT_FOCUS_ZOOM=800;onBackgroundClick(){this.sidebarOpen.set(!1),this.selectedItemId.set(null),window.location.hash="",this.resetAllItemsZIndex()}onSidebarClose(){this.sidebarOpen.set(!1),this.selectedItemId.set(null),window.location.hash="",this.resetAllItemsZIndex()}onMetadataUpdated(t){return st(this,null,function*(){let{itemId:e,metadata:n}=t,i=this.photoRepository.getPhoto(e);if(i&&(i.updateMetadata(n),this.currentLayout()==="svg"&&this.enableSvgAutoPositioning())){let r=i.metadata.author_id;r&&(yield this.recalculateClusterLayout(r))}})}ngOnDestroy(){this.platform.browser()&&window.removeEventListener("message",this.onMessageFromChild),this.rendererService.dispose(),this.destroy$.next(),this.destroy$.complete()}static \u0275fac=function(e){return new(e||s)(pn(Al),pn(wl),pn(Pl),pn(Tl),pn(Vn),pn(Xo))};static \u0275cmp=Ii({type:s,selectors:[["app-showcase-ws"]],viewQuery:function(e,n){if(e&1&&(ms(ig,7),ms(sg,5)),e&2){let i;gs(i=_s())&&(n.container=i.first),gs(i=_s())&&(n.titleElement=i.first)}},decls:48,vars:26,consts:[["container",""],["titleElement",""],[1,"container"],[1,"preloader"],[1,"hide-on-mobile","qr-clickable",3,"small","url"],[3,"close","metadataUpdated","isOpen","itemId","itemKey","workspaceId","apiKey","adminKey","lang"],[1,"filters-bar-container",3,"open"],["href","/","title","Back to Home",1,"logo-link","hide-on-mobile"],["src","/futures-map-logo.svg","alt","Futures Map",1,"logo-icon"],["title","Back to Home",1,"home-button","show-on-mobile",3,"click"],["viewBox","0 0 24 24",1,"button-icon"],["d","M11 20V7.83L5.41 13 4 11.59 12 3l8 8-1.41 1.41L13 7.83V20z","fill","currentColor"],[1,"workspace-title",3,"needs-animation"],[1,"zoom-controls"],[1,"zoom-buttons"],[1,"search-section"],["title","Search",1,"zoom-button",3,"click"],["cx","11","cy","11","r","8","stroke","currentColor","stroke-width","2","fill","none"],["d","M21 21l-4.35-4.35","stroke","currentColor","stroke-width","2","stroke-linecap","round"],[1,"search-input-container"],["title","Zoom In (+)",1,"zoom-button","hide-on-mobile",3,"click"],["d","M12 5v14M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Zoom Out (-)",1,"zoom-button","hide-on-mobile",3,"click"],["d","M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Reset View (R)",1,"zoom-button",3,"click"],["d","M2 2l4 0 0 2 -2 0 0 2 -2 0 0 -4","fill","currentColor"],["d","M22 2l-4 0 0 2 2 0 0 2 2 0 0 -4","fill","currentColor"],["d","M2 22l4 0 0 -2 -2 0 0 -2 -2 0 0 4","fill","currentColor"],["d","M22 22l-4 0 0 -2 2 0 0 -2 2 0 0 4","fill","currentColor"],[1,"layout-toggle-centered"],[1,"layout-toggle"],[1,"toggle-background"],[1,"toggle-buttons"],["title","Map Layout",1,"toggle-button","map-button",3,"click"],[1,"button-content"],["src","/icon-cone.svg","alt","Map",1,"button-icon"],[1,"button-label"],["title","Clusters Layout",1,"toggle-button","clusters-button",3,"click"],["src","/icon-clusters.svg","alt","Clusters",1,"button-icon"],[1,"svg-auto-toggle"],[1,"spinner"],[1,"hide-on-mobile","qr-clickable",3,"click","small","url"],[1,"filters-bar-container"],[3,"filtersChange","filtersCommit","counts","totalCount","filteredCount","showViewToggle","showOrderBy","initialState"],[1,"workspace-title"],["type","text","placeholder","Search...",1,"search-input",3,"input","keydown.escape","value"],["title","Clear search",1,"search-clear"],["title","Clear search",1,"search-clear",3,"click"],["title","Toggle Random Showcase",1,"showcase-toggle","hide-on-mobile",3,"click"],["cx","12","cy","8","r","2","fill","currentColor"],["cx","12","cy","16","r","2","fill","currentColor"],["cx","6","cy","12","r","2","fill","currentColor"],["cx","18","cy","12","r","2","fill","currentColor"],["title","Toggle Filters",1,"filter-toggle","hide-on-mobile",3,"click"],["d","M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0 0 18.95 4H5.04c-.83 0-1.3.95-.79 1.61z","fill","currentColor"],["title","Toggle SVG Auto-Positioning",1,"svg-auto-button",3,"click"],["d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z","fill","currentColor"]],template:function(e,n){if(e&1){let i=mn();Me(0,"div",2,0),on(2,rg,2,0,"div",3)(3,og,1,2,"app-qrcode",4),Bt(4,"app-evaluation-sidebar",5),Se("close",function(){return fe(i),pe(n.onSidebarClose())})("metadataUpdated",function(o){return fe(i),pe(n.onMetadataUpdated(o))}),Qt(),on(5,ag,2,8,"div",6),Bt(6,"a",7),Me(7,"img",8),Qt(),Bt(8,"button",9),Se("click",function(){return fe(i),pe(n.goBack())}),sn(),Bt(9,"svg",10),Me(10,"path",11),Qt()(),on(11,cg,4,4,"div",12),An(),Bt(12,"div",13)(13,"div",14)(14,"div",15)(15,"button",16),Se("click",function(){return fe(i),pe(n.searchActive.set(!n.searchActive()))}),sn(),Bt(16,"svg",10),Me(17,"circle",17)(18,"path",18),Qt()(),on(19,ug,3,2,"div",19),Qt(),An(),Bt(20,"button",20),Se("click",function(){return fe(i),pe(n.zoomIn())}),sn(),Bt(21,"svg",10),Me(22,"path",21),Qt()(),An(),Bt(23,"button",22),Se("click",function(){return fe(i),pe(n.zoomOut())}),sn(),Bt(24,"svg",10),Me(25,"path",23),Qt()(),An(),Bt(26,"button",24),Se("click",function(){return fe(i),pe(n.resetView())}),sn(),Bt(27,"svg",10),Me(28,"path",25)(29,"path",26)(30,"path",27)(31,"path",28),Qt()()(),on(32,dg,9,4),Qt(),An(),Bt(33,"div",29)(34,"div",30),Me(35,"div",31),Bt(36,"div",32)(37,"button",33),Se("click",function(){return fe(i),pe(n.switchToSvgLayout())}),Bt(38,"div",34),Me(39,"img",35),Bt(40,"span",36),Di(41,"Map"),Qt()()(),Bt(42,"button",37),Se("click",function(){return fe(i),pe(n.switchToCirclePackingLayout())}),Bt(43,"div",34),Me(44,"img",38),Bt(45,"span",36),Di(46,"Clusters"),Qt()()()()(),on(47,fg,4,2,"div",39),Qt()}e&2&&(Ve("dragging",n.isDragging())("hovering",n.isHoveringItem()),le(2),Je(n.isLayoutLoading()?2:-1),le(),Je(n.allowAdditionalContributions()?3:-1),le(),li("isOpen",n.sidebarOpen()&&n.canEditSelectedItem())("itemId",n.selectedItemId())("itemKey",n.selectedItemKey())("workspaceId",n.workspace())("apiKey",n.api_key())("adminKey",n.admin_key())("lang",n.lang()),le(),Je(n.isAdmin()&&!n.isLoading()&&n.viewInitialized()?5:-1),le(6),Je(n.workspaceTitle()?11:-1),le(),Ve("sidebar-open",n.sidebarOpen()),le(3),Ve("active",n.searchActive()),le(4),Je(n.searchActive()?19:-1),le(13),Je(n.isAdmin()?32:-1),le(5),Ve("active",n.currentLayout()==="svg"),le(5),Ve("active",n.currentLayout()==="circle-packing"),le(5),Je(n.currentLayout()==="svg"&&n.isAdmin()?47:-1))},dependencies:[Js,js,Rl],styles:[`

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
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: auto;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
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
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
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
  flex-direction: row;
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
    min-width: 90px;
    height: 40px;
    padding: 0 12px;
    font-size: 12px;
    border-radius: 18px;
  }
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  white-space: nowrap;
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
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.map-button[_ngcontent-%COMP%] {
  border-radius: 23.5px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .layout-toggle[_ngcontent-%COMP%]   .toggle-button.clusters-button[_ngcontent-%COMP%] {
  border-radius: 23.5px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .svg-auto-toggle[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  left: -180px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .svg-auto-toggle[_ngcontent-%COMP%]   .svg-auto-button[_ngcontent-%COMP%] {
  width: 52px;
  height: 52px;
  border: none;
  background: white;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .svg-auto-toggle[_ngcontent-%COMP%]   .svg-auto-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .svg-auto-toggle[_ngcontent-%COMP%]   .svg-auto-button[_ngcontent-%COMP%]:hover {
  color: #333;
  transform: scale(1.05);
}
[_nghost-%COMP%]   .layout-toggle-centered[_ngcontent-%COMP%]   .svg-auto-toggle[_ngcontent-%COMP%]   .svg-auto-button.active[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  color: white;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
}`]})};export{Mh as ShowcaseWsComponent};
/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/
