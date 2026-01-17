import{A as dl,Aa as Ze,Ca as _l,Db as xl,E as fl,G as Us,Ha as re,Ia as Ee,Ja as Ge,Ka as ko,Kb as Vs,L as Ns,Lb as bl,Ma as hn,Mb as yh,Na as Vo,Qa as zs,Ra as Hs,Sa as ks,Ua as Qi,W as on,X as an,Y as ln,Z as Un,a as kt,b as bn,e as _h,f as rn,fa as Ho,g as st,ga as pl,ha as Ve,i as Qn,mb as yl,oa as Ie,pb as ts,q as cl,qa as cn,r as hl,ra as Fs,va as ml,w as ul,wb as vl,ya as gl,za as Bs}from"./chunk-2TBGZYMS.js";var Ml=_h(yh());var bh=["qrcode"],Gs=class s{constructor(t,e){this.el=t;this.platform=e}url=Ho("");small=Ho(!1);codeSize=Ve(0);transform=ts(()=>{let t=this.small(),e=this.codeSize(),n=this.scale();return`translate(${t?0:n*e/2}px, ${t?0:-n*e/2}px) scale(${n})`});scale=ts(()=>{let t=this.mainEl();if(!t)return 1;let e=t.clientHeight/2/this.codeSize();return this.small()?e/5:e});mainEl=Ve(null);qrCodeEl;ngAfterViewInit(){return st(this,null,function*(){if(this.platform.browser()){this.mainEl.set(this.el.nativeElement);try{yield Ml.default.toCanvas(this.qrCodeEl.nativeElement,this.url(),{scale:16,color:{light:"#FFFDF6",dark:"#4E02B2"}}),this.codeSize.set(this.qrCodeEl.nativeElement.height)}catch(t){console.error("Error generating QR code:",t)}}})}static \u0275fac=function(e){return new(e||s)(cn(pl),cn(Vs))};static \u0275cmp=Fs({type:s,selectors:[["app-qrcode"]],viewQuery:function(e,n){if(e&1&&zs(bh,7),e&2){let i;Hs(i=ks())&&(n.qrCodeEl=i.first)}},inputs:{url:[1,"url"],small:[1,"small"]},decls:3,vars:4,consts:[["qrcode",""],[1,"qr-container"],[1,"qrcode"]],template:function(e,n){e&1&&(re(0,"div",1),Ge(1,"canvas",2,0),Ee()),e&2&&(Ze("small",n.small()),Ie(),Bs("transform",n.transform()))},styles:[`

[_nghost-%COMP%] {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
[_nghost-%COMP%]   .qr-container[_ngcontent-%COMP%] {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;
}
[_nghost-%COMP%]   .qr-container[_ngcontent-%COMP%]   .qrcode[_ngcontent-%COMP%] {
  transition: all 0.5s ease-in-out;
  transform-origin: bottom left;
}
[_nghost-%COMP%]   .qr-container.small[_ngcontent-%COMP%] {
  top: auto;
  bottom: 20px;
  left: 20px;
  transform: none;
}
[_nghost-%COMP%]   .qr-container.small[_ngcontent-%COMP%]   .qrcode[_ngcontent-%COMP%] {
  transform: scale(2);
}`]})};var un=class{isInitialized=!1;photos=[];initialize(t){return st(this,null,function*(){this.isInitialized=!0})}dispose(){return st(this,null,function*(){this.photos=[],this.isInitialized=!1})}addPhoto(t){this.photos.push(t)}removePhoto(t){let e=this.photos.findIndex(n=>n.id===t);return e>=0?(this.photos.splice(e,1),!0):!1}getPhotos(){return[...this.photos]}getPhoto(t){return this.photos.find(e=>e.id===t)}requiresFullRecalculationOnAdd(){return!1}calculateLayoutBounds(t,e,n){let i=t.filter(u=>u!==null);if(i.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let r=e*.5,o=n*.5,a=1/0,l=-1/0,c=1/0,h=-1/0;for(let u of i)a=Math.min(a,u.x-r),l=Math.max(l,u.x+r),c=Math.min(c,u.y-o),h=Math.max(h,u.y+o);return{minX:a,maxX:l,minY:c,maxY:h}}validateInitialized(){if(!this.isInitialized)throw new Error(`${this.getConfiguration().name} layout strategy is not initialized`)}};function Ws(s){return"getDropZones"in s}var Ut={PHOTO_WIDTH:530,PHOTO_HEIGHT:1e3,SPACING_X:250,SPACING_Y:30,MAX_TEXTURE_DIMENSION:200};var Qt={LAYOUT_TRANSITION_DURATION:.8,LAYOUT_STAGGER_DELAY:.02,NEW_PHOTO_ANIMATION_DURATION:3,SHOWCASE_FORWARD_DURATION:.6,SHOWCASE_RETURN_DURATION:.6,NEW_PHOTO_ANIMATION_DELAY:5e3,SHOWCASE_INTERVAL:500,MAX_NEW_PHOTO_DELAY:1500,MAX_SHOWCASE_DURATION:5e3,CAMERA_BOUNDS_UPDATE_DEBOUNCE:100,GRID_SPIRAL_ANIMATION_DURATION:1100,NEW_PHOTO_STAGGER_DELAY:6500,API_POLLING_INTERVAL:3e4,QR_SHRINK_DELAY:1e4,INITIAL_POLLING_DELAY:1e3,OPACITY_FADE_DURATION:.4,INVISIBLE_POSITION_TRANSITION_DURATION:.6,CAMERA_BOUNDS_ANIMATION_DURATION:3};var es=class s extends un{constructor(e={}){super();this.options=e;this.photoWidth=e.photoWidth??Ut.PHOTO_WIDTH,this.photoHeight=e.photoHeight??Ut.PHOTO_HEIGHT,this.spacingX=e.spacingX??Ut.SPACING_X,this.spacingY=e.spacingY??Ut.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY,this.useRandomPositioning=e.useRandomPositioning??!0,this.hexagonalOffset=e.hexagonalOffset??!0,this.initialRadius=e.initialRadius??1}gridOccupancy={};minM=0;photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;useRandomPositioning;hexagonalOffset;initialRadius;getConfiguration(){return{name:"grid",displayName:"Grid Layout",description:"Arranges photos in a grid pattern with optional random distribution",supportsInteraction:!1,requiresWebService:!1,settings:{photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY,cellW:this.cellW,cellH:this.cellH,useRandomPositioning:this.useRandomPositioning,hexagonalOffset:this.hexagonalOffset}}}initialize(e){return st(this,null,function*(){yield rn(s.prototype,this,"initialize").call(this),e&&(this.photoWidth=e.photoWidth??this.photoWidth,this.photoHeight=e.photoHeight??this.photoHeight,this.spacingX=e.spacingX??this.spacingX,this.spacingY=e.spacingY??this.spacingY,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY,this.useRandomPositioning=e.useRandomPositioning??this.useRandomPositioning,this.hexagonalOffset=e.hexagonalOffset??this.hexagonalOffset,this.initialRadius=e.initialRadius??this.initialRadius),this.gridOccupancy={},this.minM=0})}dispose(){return st(this,null,function*(){this.gridOccupancy={},this.minM=0,yield rn(s.prototype,this,"dispose").call(this)})}getPositionForPhoto(e,n){return st(this,null,function*(){this.validateInitialized();let[i,r]=this.useRandomPositioning?this.getRandomEmptyPosition():this.getNextEmptyPosition(),o=i*this.cellW,a=r*this.cellH;return{x:o,y:a,gridKey:`${i},${r}`,metadata:{gridX:i,gridY:r,spacing:{x:this.spacingX,y:this.spacingY}}}})}calculateAllPositions(e){return st(this,null,function*(){this.validateInitialized();let n=kt({},this.gridOccupancy);this.gridOccupancy={},this.minM=0;let i=[];try{for(let r of e){let o=r.getProperty("gridKey");if(o&&!o.startsWith("tsne-")){this.gridOccupancy[o]=!0;let[a,l]=o.split(","),c=parseFloat(a),h=parseFloat(l),u=c*this.cellW,d=h*this.cellH;i.push({x:u,y:d,gridKey:o,metadata:{gridX:c,gridY:h,spacing:{x:this.spacingX,y:this.spacingY}}})}else i.push(null)}for(let r=0;r<e.length;r++)if(i[r]===null){let o=yield this.getPositionForPhoto(e[r],e);i[r]=o}}catch(r){throw this.gridOccupancy=n,r}return i})}getNextEmptyPosition(){for(;;){for(let e=0;e<=this.minM;e++)for(let[n,i]of[[e,this.minM],[e,-this.minM],[-e,this.minM],[-e,-this.minM],[this.minM,e],[this.minM,-e],[-this.minM,e],[-this.minM,-e]]){let r=`${n},${i}`;if(this.gridOccupancy[r])continue;this.gridOccupancy[r]=!0;let o=this.hexagonalOffset&&i%2===0?.25:this.hexagonalOffset&&i%2!==0?-.25:0;return[n+o,i]}this.minM++}}getRandomEmptyPosition(){let n=Object.keys(this.gridOccupancy).length||1,i=Math.max(this.initialRadius,Math.ceil(Math.sqrt(2*.53*n/Math.PI)+1)),r=0,o=100;for(;r<o;){let a=1-Math.sqrt(Math.random());a=Math.round(a*i/.53)*Math.sign(Math.random()-.5);let l=1-Math.sqrt(Math.random());l=Math.round(l*i)*Math.sign(Math.random()-.5);let c=`${a},${l}`;if(!this.gridOccupancy[c]){if(this.gridOccupancy[c]=!0,Math.random()<.5){r++;continue}let h=this.hexagonalOffset&&l%2===0?.25:this.hexagonalOffset&&l%2!==0?-.25:0;return[a+h,l]}r++}return this.getNextEmptyPosition()}getTransitionOptions(){return{duration:Qt.GRID_SPIRAL_ANIMATION_DURATION,easing:"easeOut",staggerDelay:50}}getOccupiedPositions(){return Object.keys(this.gridOccupancy)}isPositionOccupied(e,n){return this.gridOccupancy[`${e},${n}`]??!1}clearPosition(e,n){delete this.gridOccupancy[`${e},${n}`]}removePhoto(e){let n=this.getPhoto(e);if(n){let i=n.getProperty("gridKey");i&&delete this.gridOccupancy[i]}return super.removePhoto(e)}getGridState(){return{occupancy:kt({},this.gridOccupancy),minM:this.minM,totalPhotos:this.photos.length,settings:{photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY,cellW:this.cellW,cellH:this.cellH,useRandomPositioning:this.useRandomPositioning,hexagonalOffset:this.hexagonalOffset,initialRadius:this.initialRadius}}}updateSettings(e){e.photoWidth!==void 0&&(this.photoWidth=e.photoWidth),e.photoHeight!==void 0&&(this.photoHeight=e.photoHeight),e.spacingX!==void 0&&(this.spacingX=e.spacingX),e.spacingY!==void 0&&(this.spacingY=e.spacingY),e.useRandomPositioning!==void 0&&(this.useRandomPositioning=e.useRandomPositioning),e.hexagonalOffset!==void 0&&(this.hexagonalOffset=e.hexagonalOffset),e.initialRadius!==void 0&&(this.initialRadius=e.initialRadius),this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY}};var Xs=class s extends un{constructor(e,n="https://storage.googleapis.com/chronomaps3-eu",i={}){super();this.workspaceId=e;this.baseUrl=n;this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.photoWidth=i.photoWidth??Ut.PHOTO_WIDTH,this.photoHeight=i.photoHeight??Ut.PHOTO_HEIGHT,this.spacingX=i.spacingX??Ut.SPACING_X,this.spacingY=i.spacingY??Ut.SPACING_Y,this.cellW=this.photoWidth+this.spacingX,this.cellH=this.photoHeight+this.spacingY}workspaceConfigUrl;tsneConfigUrl=null;tsneData=null;currentStateHash=null;currentSetId=null;isLoading=!1;loadPromise=null;photoWidth;photoHeight;spacingX;spacingY;cellW;cellH;initialize(){return st(this,null,function*(){yield rn(s.prototype,this,"initialize").call(this),yield this.forceRefresh()})}getConfiguration(){return{name:"tsne",displayName:"TSNE Layout",description:"Positions photos using TSNE coordinates from a web service with proper spacing",supportsInteraction:!1,requiresWebService:!0,settings:{workspaceId:this.workspaceId,baseUrl:this.baseUrl,photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY}}}forceRefresh(){return st(this,null,function*(){this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData()})}fetchWorkspaceConfig(){return st(this,null,function*(){try{let e=yield fetch(this.workspaceConfigUrl);if(!e.ok)throw new Error(`Failed to fetch workspace config: ${e.status} ${e.statusText}`);let n=yield e.json();if(typeof n.set_id!="number")throw new Error("Invalid workspace config: missing or invalid set_id: "+n.set_id+" "+typeof n.set_id);if(!n.state_hash||typeof n.state_hash!="string")throw new Error("Invalid workspace config: missing or invalid state_hash: "+n.state_hash);return{set_id:n.set_id,state_hash:n.state_hash}}catch(e){throw console.error("Error fetching workspace configuration:",e),e}})}fetchTsneData(){return st(this,null,function*(){if(this.tsneData||this.isLoading)return this.loadPromise||Promise.resolve();this.isLoading=!0,this.loadPromise=this.doFetchTsneData();try{yield this.loadPromise}finally{this.isLoading=!1}})}doFetchTsneData(){return st(this,null,function*(){try{let e=yield this.fetchWorkspaceConfig();if(this.currentStateHash===e.state_hash&&this.tsneData)return;this.currentStateHash=e.state_hash,this.currentSetId=e.set_id,this.tsneConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/${e.set_id}/config.json`;let n=yield fetch(this.tsneConfigUrl);if(!n.ok)throw new Error(`Failed to fetch TSNE config: ${n.status} ${n.statusText}`);let i=yield n.json();this.tsneData=this.validateTsneConfig(i)}catch(e){throw console.error("Error fetching TSNE configuration:",e),e}})}validateTsneConfig(e){if(!e||typeof e!="object")throw new Error("Invalid TSNE config: not an object");if(!Array.isArray(e.dim)||e.dim.length!==2)throw new Error("Invalid TSNE config: dim must be an array of 2 numbers");if(!Array.isArray(e.grid))throw new Error("Invalid TSNE config: grid must be an array");for(let n=0;n<e.grid.length;n++){let i=e.grid[n];if(!i||typeof i!="object")throw new Error(`Invalid TSNE config: grid item ${n} is not an object`);if(!Array.isArray(i.pos)||i.pos.length!==2)throw new Error(`Invalid TSNE config: grid item ${n} pos must be an array of 2 numbers`);if(typeof i.id!="string")throw new Error(`Invalid TSNE config: grid item ${n} id must be a string`)}return{dim:e.dim,grid:e.grid,padding_ratio:e.padding_ratio||.5,conversion_ratio:e.conversion_ratio||[1,1],cell_ratios:e.cell_ratios||[1,1]}}getPositionForPhoto(e,n){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let i=this.tsneData.grid.find(o=>o.id===e.id);if(!i)return null;let r=this.convertTsneToWorldCoordinates(i.pos,this.tsneData.dim);return{x:r.x,y:r.y,gridKey:`tsne-${i.pos[0]}-${i.pos[1]}`,metadata:{tsnePosition:i.pos,originalMetadata:i.metadata}}})}calculateAllPositions(e){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n=[];for(let i of e){let r=yield this.getPositionForPhoto(i,e);n.push(r)}return n})}fetchLayoutData(e){return cl(this.getAllPositionsAsMap(e))}convertTsneToWorldCoordinates(e,n){let[i,r]=e,[o,a]=n,l=(o-1)*this.cellW/2,c=(a-1)*this.cellH/2,h=i*this.cellW-l,u=c-r*this.cellH;return{x:h,y:u}}getAllPositionsAsMap(e){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)throw new Error("TSNE data not available");let n={};for(let i of e){let r=yield this.getPositionForPhoto(i,e);n[i.id]=r}return n})}getLayoutBounds(){return st(this,null,function*(){if(yield this.fetchTsneData(),!this.tsneData)return{width:this.cellW*10,height:this.cellH*10};let[e,n]=this.tsneData.dim,i=e*this.cellW,r=n*this.cellH;return{width:i,height:r}})}setWorkspaceId(e){return st(this,null,function*(){this.workspaceId!==e&&(this.workspaceId=e,this.workspaceConfigUrl=`${this.baseUrl}/tiles/${this.workspaceId}/config.json`,this.tsneData=null,this.currentStateHash=null,this.currentSetId=null,this.tsneConfigUrl=null,this.isLoading=!1,this.loadPromise=null,yield this.fetchTsneData())})}getWorkspaceId(){return this.workspaceId}getTsneInfo(){return this.tsneData?{workspaceId:this.workspaceId,gridSize:this.tsneData.dim,itemCount:this.tsneData.grid.length,workspaceConfigUrl:this.workspaceConfigUrl,tsneConfigUrl:this.tsneConfigUrl||"not set",setId:this.currentSetId||-1,stateHash:this.currentStateHash||"not set"}:null}};var Ys=class s extends un{svgElement=null;hotspots=[];photoPositions=new Map;draggedPhoto=null;isDragging=!1;hotspotPhotoCount=new Map;photoHotspotMap=new Map;debugOverlay=null;photoSizes=new Map;MAX_OVERLAP_PERCENT=10;PHOTO_WIDTH=120;PHOTO_HEIGHT=120;options={svgPath:"/showcase-bg.svg",centerX:0,centerY:0,circleRadius:2e4,radiusVariation:4e3,useProportionalLayout:!0,onHotspotDrop:()=>st(null,null,function*(){})};constructor(t){super(),t&&(this.options=kt(kt({},this.options),t))}getConfiguration(){return{name:"svg-background",displayName:"SVG Background",description:"Interactive layout with SVG background and proportional group-based circle slicing",supportsInteraction:!0,requiresWebService:!1,settings:{svgPath:this.options.svgPath,centerX:this.options.centerX,centerY:this.options.centerY,circleRadius:this.options.circleRadius,radiusVariation:this.options.radiusVariation,useProportionalLayout:this.options.useProportionalLayout}}}initialize(t){return st(this,null,function*(){yield rn(s.prototype,this,"initialize").call(this,t),t&&(this.options=kt(kt({},this.options),t)),yield this.loadSvgBackground(),this.extractHotspots()})}dispose(){return st(this,null,function*(){yield rn(s.prototype,this,"dispose").call(this),this.svgElement=null,this.hotspots=[],this.photoPositions.clear(),this.draggedPhoto=null,this.isDragging=!1,this.hotspotPhotoCount.clear(),this.photoHotspotMap.clear(),this.photoSizes.clear(),this.removeDebugOverlay()})}loadSvgBackground(){return st(this,null,function*(){if(typeof fetch>"u"||typeof document>"u"){console.log("[SVG-LOAD] Skipping SVG load on server-side rendering");return}try{let t=yield fetch(this.options.svgPath);if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);let e=yield t.text(),i=new DOMParser().parseFromString(e,"image/svg+xml");this.svgElement=i.documentElement}catch(t){throw console.error("\u274C Failed to load SVG background:",t),new Error(`Failed to load SVG background from ${this.options.svgPath}`)}})}extractHotspots(){if(typeof document>"u"){console.log("[SVG-HOTSPOT] Skipping hotspot extraction on server-side rendering");return}if(!this.svgElement){console.warn("SVG element not loaded, cannot extract hotspots");return}this.hotspots=[];let t=document.createElement("div");t.style.position="absolute",t.style.visibility="hidden",t.style.pointerEvents="none",t.appendChild(this.svgElement),document.body.appendChild(t);try{this.svgElement.querySelectorAll('[id^="s-"]').forEach(n=>{let i=n,r=i.id,o=this.parseGroupIdMetadata(r);if(!o)return;let a=i.querySelector('[id^="hit"]');if(!a){console.warn(`No hit element found in group ${r}`);return}let l=Array.from(a.querySelectorAll("path")).find(u=>u.id.startsWith(o.transition_bar_position));if(!l){console.warn(`No path element found starting with '${o.transition_bar_position}' in hit element of group ${r}`);return}let c=l.getBBox();console.log(`[HOTSPOT-EXTRACT] Group: ${r}, favorable_future=${o.favorable_future}, path=${l.id}, bbox=(${c.x.toFixed(1)},${c.y.toFixed(1)})`),(c.width===0||c.height===0)&&console.error(`[SVG-HOTSPOT] ZERO-SIZE bbox at initialization for ${r}:`,{elementId:l.id,elementTag:l.tagName,bbox:{x:c.x,y:c.y,width:c.width,height:c.height},inDOM:document.contains(l),parentId:l.parentElement?.id,svg:this.svgElement?"exists":"null"});let h={id:a.id,bounds:{x:c.x,y:c.y,width:c.width,height:c.height},parentGroupId:r,transitionBarPosition:o.transition_bar_position,element:l};console.log(`[SVG-HOTSPOT] ${r} -> bounds: (${c.x.toFixed(1)}, ${c.y.toFixed(1)}, ${c.width.toFixed(1)}x${c.height.toFixed(1)})`),this.hotspots.push(h)})}finally{document.body.removeChild(t)}}getPositionForPhoto(t,e,n=!1){return st(this,null,function*(){this.validateInitialized();let i=t.metadata.width||this.PHOTO_WIDTH,r=t.metadata.height||this.PHOTO_HEIGHT;this.photoSizes.set(t.id,{width:i,height:r});let o=this.photoPositions.get(t.id);if(o)return o;let a=t.metadata.layout_x,l=t.metadata.layout_y;if(typeof a=="number"&&typeof l=="number"){let p=a*this.options.circleRadius,g=l*this.options.circleRadius,y={x:p,y:g,metadata:{layoutType:"restored-normalized",layout_x:a,layout_y:l,circleRadius:this.options.circleRadius}};return this.photoPositions.set(t.id,y),t.setProperty("svgLayoutPosition",y),y}if(t.metadata._private_moderation===0){let p=this.getPositionForRejectedPhoto(t,e);if(p)return this.photoPositions.set(t.id,p),t.setProperty("svgLayoutPosition",p),console.log(`[REJECTED] Photo ${t.id} placed in rejected area at (${p.x.toFixed(1)}, ${p.y.toFixed(1)})`),p}if(n){let p=this.getAutoPositionFromMetadata(t);if(p){let g=p.auto_x*this.options.circleRadius,y=p.auto_y*this.options.circleRadius,m={x:g,y,metadata:{layoutType:"auto-positioned",auto_x:p.auto_x,auto_y:p.auto_y,circleRadius:this.options.circleRadius}};return this.photoPositions.set(t.id,m),t.setProperty("svgLayoutPosition",m),m}}let h=t.getProperty("svgLayoutPosition");if(h&&h.metadata?.layoutType==="proportional-circular")return this.photoPositions.set(t.id,h),h;let u=this.options.useProportionalLayout?this.generateProportionalCircularPosition(t,e):this.generateRandomCircularPosition(),d=this.options.useProportionalLayout?"proportional":"random";return this.photoPositions.set(t.id,u),t.setProperty("svgLayoutPosition",u),u})}calculateAllPositions(t,e=!1){return st(this,null,function*(){this.validateInitialized(),this.hotspotPhotoCount.clear();let n=new Map;for(let[r,o]of this.photoPositions.entries())(o.metadata?.layoutType==="free-dragged"||o.metadata?.layoutType==="dragging")&&n.set(r,o);this.photoPositions.clear();for(let[r,o]of n.entries())this.photoPositions.set(r,o);let i=[];for(let r of t){let o=yield this.getPositionForPhoto(r,t,e);i.push(o)}return i})}generateRandomCircularPosition(){let t=Math.random()*2*Math.PI,e=(Math.random()-.5)*2*this.options.radiusVariation,n=this.options.circleRadius+e,i=this.options.centerX+Math.cos(t)*n,r=this.options.centerY+Math.sin(t)*n;return{x:i,y:r,metadata:{angle:t,radius:n,layoutType:"circular"}}}generateProportionalCircularPosition(t,e){let n=this.getPhotoGroupId(t),i=this.groupPhotosByGroupId(e),o=this.calculateGroupSlices(i).get(n);if(!o)return this.generateRandomCircularPosition();let a=i.get(n)||[],l=a.findIndex(C=>C.id===t.id),c=a.length,u=(o.endAngle-o.startAngle)*(1-.5),d=(o.startAngle+o.endAngle)/2,p;if(c===1)p=d;else{let C=u/c;p=d-u/2+(l+.5)*C}let g=this.hashCode(t.id)/2147483647,y=this.options.radiusVariation*.8,m=g*y,f=Math.min(c/10,.5),w=(l/c-.5)*f*this.options.radiusVariation*.3,T=this.options.circleRadius+m+w,x=this.options.centerX+Math.cos(p)*T,R=this.options.centerY+Math.sin(p)*T;return x=x*.5+Math.sign(x)*T,{x,y:R,metadata:{angle:p,radius:T,groupId:n,groupSlice:o,photoIndex:l,totalInGroup:c,radiusVariation:m,packingVariation:w,layoutType:"proportional-circular"}}}getPhotoGroupId(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_svg_background_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_svg_background_group_id",n)),`random:${n}`}groupPhotosByGroupId(t){let e=new Map;for(let n of t){let i=this.getPhotoGroupId(n);e.has(i)||e.set(i,[]),e.get(i).push(n)}return e}calculateGroupSlices(t){let e=Array.from(t.values()).reduce((a,l)=>a+l.length,0),n=new Map;if(e===0)return n;let i=Array.from(t.entries()).sort(([a,l],[c,h])=>h.length!==l.length?h.length-l.length:a.localeCompare(c)),r=0,o=2*Math.PI;for(let[a,l]of i){let c=l.length,h=c/e*o,u=r+h;n.set(a,{startAngle:r,endAngle:u,size:c}),r=u}return n}hashCode(t){let e=0;if(t.length===0)return e;for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);e=(e<<5)-e+i,e=e&e}return e}getDropZones(){return this.hotspots.map(t=>({id:t.id,bounds:t.bounds,hotspot:t,acceptsPhoto:()=>!0,onPhotoDrop:e=>st(this,null,function*(){})}))}onPhotoDragStart(t,e){return this.draggedPhoto=t,this.isDragging=!0,!0}onPhotoDragMove(t,e){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return;let n=Math.max(-1,Math.min(1,e.x/this.options.circleRadius)),i=Math.max(-1,Math.min(1,e.y/this.options.circleRadius)),r={x:e.x,y:e.y,metadata:{layoutType:"dragging",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};this.photoPositions.set(t.id,r),t.setProperty("svgLayoutPosition",r)}onPhotoDragEnd(t,e){return st(this,null,function*(){if(!this.isDragging||this.draggedPhoto?.id!==t.id)return!1;this.isDragging=!1,this.draggedPhoto=null;let n=Math.max(-1,Math.min(1,e.x/this.options.circleRadius)),i=Math.max(-1,Math.min(1,e.y/this.options.circleRadius)),r={x:e.x,y:e.y,metadata:{layoutType:"free-dragged",layout_x:n,layout_y:i,circleRadius:this.options.circleRadius}};return this.photoPositions.set(t.id,r),t.setProperty("svgLayoutPosition",r),t.updateMetadata({layout_x:n,layout_y:i}),!0})}getSvgElement(){return this.svgElement}getHotspots(){return[...this.hotspots]}getPhotoPosition(t){return this.photoPositions.get(t)||null}setPhotoPosition(t,e){this.photoPositions.set(t,e)}getAutoPositionFromMetadata(t){let e=t.metadata,n=e.plausibility,i=e.favorable_future,r=e.transition_bar_position;if(n===void 0||!i||!r)return console.log(`[AUTO-POS] Photo ${t.id}: missing metadata - plausibility=${n}, favorable_future=${i}, transition_bar_position=${r}`),null;console.log(`[AUTO-POS] Matching photo ${t.id}: plausibility=${n}, favorable_future=${i}, transition_bar_position=${r}`);for(let o of this.hotspots){let a=o.parentGroupId;if(!a.startsWith("s-"))continue;let l=this.parseGroupIdMetadata(a);if(l&&l.plausibility===n&&l.favorable_future===i&&l.transition_bar_position===r){console.log(`[AUTO-POS] MATCH FOUND for photo ${t.id} (favorable_future=${i}) in hotspot ${a}`),this.photoHotspotMap.set(t.id,o);let c=this.hotspotPhotoCount.get(a)||0;return this.hotspotPhotoCount.set(a,c+1),this.distributePhotoInHotspot(o,c)}}return console.log(`[AUTO-POS] NO MATCH for photo ${t.id} - no hotspot found with plausibility=${n}, favorable_future=${i}, transition_bar_position=${r}`),null}distributePhotoInHotspot(t,e){let n=this.getSvgViewBox();if(!n)return console.warn("No SVG viewBox found, using default distribution"),{auto_x:0,auto_y:0};let i=Math.min(t.bounds.width,t.bounds.height)*.05,r=t.bounds.width-2*i,o=t.bounds.height-2*i;console.log(`[DIST-DEBUG] Hotspot ${t.parentGroupId}: bounds=(${t.bounds.x.toFixed(1)},${t.bounds.y.toFixed(1)}) size=(${t.bounds.width.toFixed(1)}x${t.bounds.height.toFixed(1)}), padding=${i.toFixed(1)}, usable=(${r.toFixed(1)}x${o.toFixed(1)})`);let a=[],l=8,c=8;for(let w=0;w<c;w++)for(let T=0;T<l;T++){let x=(T+.5)/l,R=(w+.5)/c,C=t.bounds.x+i+r*x,A=t.bounds.y+i+o*R,O=this.isPointInPathWithBounds(t.bounds,C,A);if(w===0&&T===0&&console.log(`[DIST-DEBUG] Testing sample (0,0): svg=(${C.toFixed(1)},${A.toFixed(1)}), isInPath=${O}`),O){let M=t.bounds.x+t.bounds.width/2,b=t.bounds.y+t.bounds.height/2,E=Math.sqrt(Math.pow(C-M,2)+Math.pow(A-b,2));a.push({svgX:C,svgY:A,distance:E})}}if(console.log(`[DIST-DEBUG] Generated ${a.length} valid candidates out of ${l*c} samples for hotspot ${t.parentGroupId}`),a.length===0){console.warn(`[AUTO-POS] No valid positions found in path for ${t.parentGroupId}, using center`);let w=t.bounds.x+t.bounds.width/2,T=t.bounds.y+t.bounds.height/2,x=(w-n.width/2)/(n.width/2),R=-((T-n.height/2)/(n.height/2));return console.log(`[DIST-DEBUG] Fallback to center: normalized=(${x.toFixed(3)}, ${R.toFixed(3)})`),{auto_x:x,auto_y:R}}for(let w of a){let T=(w.svgX-n.width/2)/(n.width/2),x=(w.svgY-n.height/2)/(n.height/2),R=this.getMinDistanceToExistingPhotos(T,x,t);w.minDistanceToExisting=R}a.sort((w,T)=>T.minDistanceToExisting-w.minDistanceToExisting),console.log(`[DIST-DEBUG] Sorted candidates by spacing. Top 5 candidates for ${t.parentGroupId}:`);for(let w=0;w<Math.min(5,a.length);w++)console.log(`  [${w}] svg=(${a[w].svgX.toFixed(1)},${a[w].svgY.toFixed(1)}) minDist=${a[w].minDistanceToExisting.toFixed(1)}px`);let h=a.filter(w=>!this.overlapsHeaderElement(w.svgX,w.svgY,n)),u=h.length>0?h:a;console.log(`[DIST-DEBUG] Filtered ${a.length} -> ${h.length} candidates (removed header overlaps)`);let d=u[e%u.length],p=100,g=-1;console.log(`[DIST-DEBUG] Starting evaluation loop for photo index ${e} (will check up to ${Math.min(u.length,15)} candidates)`);let y=u.slice(0,Math.min(u.length,15));for(let w=0;w<y.length;w++){let T=y[w],x=(T.svgX-n.width/2)/(n.width/2),R=(T.svgY-n.height/2)/(n.height/2),C=this.calculateOverlapWithExistingPhotos(x,R,t),A=T.minDistanceToExisting;w<3&&console.log(`[DIST-DEBUG] Candidate ${w}: normalized=(${x.toFixed(3)},${R.toFixed(3)}), overlap=${C.toFixed(1)}%, spacing=${A.toFixed(1)}px`),C<=this.MAX_OVERLAP_PERCENT?A>g&&(g=A,p=C,d=T,console.log(`[DIST-DEBUG] New best candidate ${w}: spacing=${A.toFixed(1)}px, overlap=${C.toFixed(1)}%`)):C<p&&g<0&&(p=C,d=T)}let m=(d.svgX-n.width/2)/(n.width/2),f=-((d.svgY-n.height/2)/(n.height/2));return console.log(`[AUTO-POS] Photo index=${e} in hotspot ${t.parentGroupId}: FINAL position svg=(${d.svgX.toFixed(1)},${d.svgY.toFixed(1)}), normalized=(${m.toFixed(3)},${f.toFixed(3)}), minOverlap=${p.toFixed(1)}%`),{auto_x:m,auto_y:f}}isPointInPath(t,e,n){if(!t)return console.log("[PATH-CHECK] No path element provided"),!1;try{let i=document.contains(t),r=t.getBBox();if(r.width===0||r.height===0)return console.warn("[PATH-CHECK] ZERO-SIZE bbox detected:",{elementId:t.id,elementTag:t.tagName,bbox:{x:r.x,y:r.y,width:r.width,height:r.height},inDOM:i,parentId:t.parentElement?.id}),!1;let o=e>=r.x&&e<=r.x+r.width&&n>=r.y&&n<=r.y+r.height;return!o&&e<450&&n<300&&console.log(`[PATH-CHECK] Point (${e.toFixed(1)},${n.toFixed(1)}) OUTSIDE bbox (${r.x.toFixed(1)},${r.y.toFixed(1)},${r.width.toFixed(1)}x${r.height.toFixed(1)})`),o}catch(i){return console.error("[PATH-CHECK] Error checking point in path:",i),!1}}isPointInPathWithBounds(t,e,n){try{return!t||t.width===0||t.height===0?(console.warn("[PATH-CHECK] Invalid bounds:",t),!1):e>=t.x&&e<=t.x+t.width&&n>=t.y&&n<=t.y+t.height}catch(i){return console.error("[PATH-CHECK] Error checking point with bounds:",i),!1}}getPositionForRejectedPhoto(t,e){if(!this.svgElement)return null;let n=this.getSvgViewBox();if(!n)return null;let i=Math.min(n.width,n.height)*.2,r=-n.width/2+i/2,o=n.height/2-i/2,a=[];for(let u of e)if(u.metadata._private_moderation===0){let p=this.photoPositions.get(u.id);if(p){let g=this.photoSizes.get(u.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},y=Math.max(g.width,g.height)/2;a.push({x:p.x,y:p.y,radius:y})}}let l=this.photoSizes.get(t.id)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},c=Math.max(l.width,l.height)/2,h;return a.length===0?h={x:r,y:o}:h=this.findCirclePackPosition(c,a,r,o,i/2),{x:h.x,y:h.y,metadata:{layoutType:"rejected-packed",circleRadius:this.options.circleRadius,isRejected:!0}}}getMinDistanceToExistingPhotos(t,e,n){let i=this.options.circleRadius,r=t*i,o=e*i,a=Number.MAX_VALUE;for(let[l,c]of this.photoHotspotMap.entries())if(c.parentGroupId===n.parentGroupId){let h=this.photoPositions.get(l);if(h){let u=h.x,d=h.y,p=Math.sqrt(Math.pow(r-u,2)+Math.pow(o-d,2));a=Math.min(a,p)}}return a}overlapsHeaderElement(t,e,n){if(typeof document>"u"||!this.svgElement)return!1;let i=this.PHOTO_WIDTH/this.options.circleRadius*(n.width/2),r=this.PHOTO_HEIGHT/this.options.circleRadius*(n.height/2),o=t-i/2,a=t+i/2,l=e-r/2,c=e+r/2,h=Array.from(this.svgElement.querySelectorAll('[id^="header"]'));for(let u of h)if(u instanceof SVGGraphicsElement)try{let d=u.getBBox(),p=30;if(!(a<d.x-p||o>d.x+d.width+p||c<d.y-p||l>d.y+d.height+p))return!0;let y=u.querySelectorAll("*");for(let m of y)if(m instanceof SVGGraphicsElement)try{let f=m.getBBox();if(!(a<f.x-p||o>f.x+f.width+p||c<f.y-p||l>f.y+f.height+p))return!0}catch{continue}}catch{continue}return!1}findCirclePackPosition(t,e,n,i,r){let a={x:n,y:i},l=1/0;for(let c of e){let h=[0,Math.PI/4,Math.PI/2,Math.PI*3/4,Math.PI,Math.PI*5/4,Math.PI*3/2,Math.PI*7/4];for(let u of h){let d=c.radius+t+50,p=c.x+Math.cos(u)*d,g=c.y+Math.sin(u)*d;if(!e.some(m=>{let f=p-m.x,w=g-m.y;return Math.sqrt(f*f+w*w)<t+m.radius+50})){let m=Math.sqrt(Math.pow(p-n,2)+Math.pow(g-i,2));m<r&&m<l&&(l=m,a={x:p,y:g})}}}return a}calculateOverlapWithExistingPhotos(t,e,n){let i=[];for(let[a,l]of this.photoPositions.entries())if(this.photoHotspotMap.get(a)===n){let c=this.photoSizes.get(a)||{width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT};i.push({x:l.x,y:l.y,width:c.width,height:c.height})}if(i.length===0)return console.log("[OVERLAP-DEBUG] No existing photos in hotspot, overlap=0%"),0;console.log(`[OVERLAP-DEBUG] Checking ${i.length} existing photos in hotspot for candidate at (${t.toFixed(3)},${e.toFixed(3)})`);let r={width:this.PHOTO_WIDTH,height:this.PHOTO_HEIGHT},o=0;for(let a=0;a<i.length;a++){let l=i[a],c=this.calculateRectangleOverlapPercent(t*this.options.circleRadius,e*this.options.circleRadius,r.width,r.height,l.x,l.y,l.width,l.height);a===0&&console.log(`[OVERLAP-DEBUG] Existing photo ${a}: pos=(${l.x.toFixed(1)},${l.y.toFixed(1)}) size=(${l.width},${l.height}), overlap=${c.toFixed(1)}%`),o=Math.max(o,c)}return console.log(`[OVERLAP-DEBUG] Max overlap for this candidate: ${o.toFixed(1)}%`),o}calculateRectangleOverlapPercent(t,e,n,i,r,o,a,l){let c=t-n/2,h=t+n/2,u=e-i/2,d=e+i/2,p=r-a/2,g=r+a/2,y=o-l/2,m=o+l/2,f=Math.max(c,p),w=Math.min(h,g),T=Math.max(u,y),x=Math.min(d,m);if(w<=f||x<=T)return console.log("[RECT-MATH] No intersection: right<=left or bottom<=top"),0;let R=w-f,C=x-T,A=R*C,O=n*i,M=A/O*100;return console.log("[RECT-MATH] New rect:",{newLeft:c,newTop:u,newRight:h,newBottom:d,newWidth:n,newHeight:i,newArea:O},"Existing rect:",{existingLeft:p,existingTop:y,existingRight:g,existingBottom:m,existingWidth:a,existingHeight:l},"Intersection:",{intersectLeft:f,intersectTop:T,intersectRight:w,intersectBottom:x,overlapWidth:R,overlapHeight:C,overlapArea:A},"Result:",M),M}parseGroupIdMetadata(t){try{let n=t.substring(2).split(","),i,r,o;for(let a of n){let[l,c]=a.split("=");l==="plausibility"?i=parseInt(c,10):l==="favorable_future"?r=c:l==="transition_bar_position"&&(o=c)}if(i!==void 0&&r!==void 0&&o!==void 0)return{plausibility:i,favorable_future:r,transition_bar_position:o}}catch(e){console.warn(`Failed to parse group ID metadata: ${t}`,e)}return null}getSvgViewBox(){if(typeof document>"u"||!this.svgElement)return null;let t=this.svgElement.getAttribute("viewBox");if(!t){let n=parseFloat(this.svgElement.getAttribute("width")||"800"),i=parseFloat(this.svgElement.getAttribute("height")||"800");return{x:0,y:0,width:n,height:i}}let e=t.split(/\s+/);return e.length===4?{x:parseFloat(e[0]),y:parseFloat(e[1]),width:parseFloat(e[2]),height:parseFloat(e[3])}:null}updatePhotoAfterHotspotDrop(t,e,n){let i=(this.photoPositions.has(t),null),r=Math.max(-1,Math.min(1,e.x/this.options.circleRadius)),o=Math.max(-1,Math.min(1,e.y/this.options.circleRadius)),a={x:e.x,y:e.y,metadata:{layoutType:"hotspot-drop",layout_x:r,layout_y:o,circleRadius:this.options.circleRadius,hotspotData:n}};this.photoPositions.set(t,a)}showAllHotspotsDebug(){console.log("[DEBUG] Showing all hotspots, count:",this.hotspots.length),this.removeDebugOverlay(),this.createDebugOverlayForAllHotspots()}createDebugOverlayForAllHotspots(){if(this.hotspots.length===0){console.warn("[DEBUG] No hotspots to display");return}let t=document.createElement("div");if(t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.pointerEvents="none",t.style.zIndex="9999",t.id="svg-hotspot-debug-overlay",!this.svgElement){console.warn("[DEBUG] SVG element not found");return}let e=this.svgElement.getBoundingClientRect(),n=this.getSvgViewBox();if(!n){console.warn("[DEBUG] Could not get SVG viewBox");return}console.log("[DEBUG] SVG on screen:",{top:e.top,left:e.left,width:e.width,height:e.height,viewBox:n}),this.hotspots.forEach((i,r)=>{let o=e.left+i.bounds.x/n.width*e.width,a=e.top+i.bounds.y/n.height*e.height,l=i.bounds.width/n.width*e.width,c=i.bounds.height/n.height*e.height,h=document.createElement("div");h.style.position="fixed",h.style.left=o+"px",h.style.top=a+"px",h.style.width=l+"px",h.style.height=c+"px",h.style.border=`2px solid hsl(${r*60%360}, 100%, 50%)`,h.style.backgroundColor=`rgba(${r%2===0?255:0}, ${r%3===0?255:0}, ${r%4===0?255:0}, 0.05)`,h.style.boxSizing="border-box",h.style.pointerEvents="none",h.style.zIndex="9999";let u=document.createElement("div");u.style.position="absolute",u.style.top="2px",u.style.left="2px",u.style.color="#ffffff",u.style.backgroundColor=`hsl(${r*60%360}, 100%, 40%)`,u.style.padding="2px 4px",u.style.fontSize="10px",u.style.fontWeight="bold",u.style.borderRadius="2px",u.textContent=i.parentGroupId.substring(2),u.style.maxWidth="90%",u.style.overflow="hidden",u.style.textOverflow="ellipsis",u.style.whiteSpace="nowrap",h.appendChild(u),t.appendChild(h)}),document.body.appendChild(t),this.debugOverlay=t,console.log(`[DEBUG] Created debug overlay with ${this.hotspots.length} hotspots at z-index 9999`)}removeDebugOverlay(){this.debugOverlay&&this.debugOverlay.parentNode&&(this.debugOverlay.parentNode.removeChild(this.debugOverlay),this.debugOverlay=null)}};var qs=class s extends un{photoWidth;photoHeight;spacingX;spacingY;photoRadius;groupBuffer;photoBuffer;photoGroups=new Map;groupPositions=new Map;constructor(t={}){super(),this.photoWidth=t.photoWidth??Ut.PHOTO_WIDTH,this.photoHeight=t.photoHeight??Ut.PHOTO_HEIGHT,this.spacingX=t.spacingX??Ut.SPACING_X,this.spacingY=t.spacingY??Ut.SPACING_Y,this.groupBuffer=t.groupBuffer??2e3,this.photoBuffer=t.photoBuffer??50,this.photoRadius=Math.sqrt(this.photoWidth**2+this.photoHeight**2)/2+this.photoBuffer}getConfiguration(){return{name:"circle-packing",displayName:"Circle Packing Layout",description:"Groups photos by author in hierarchical circle packing arrangement",supportsInteraction:!1,requiresWebService:!1,settings:{photoWidth:this.photoWidth,photoHeight:this.photoHeight,spacingX:this.spacingX,spacingY:this.spacingY,groupBuffer:this.groupBuffer,photoBuffer:this.photoBuffer}}}addPhoto(t){let e=this.getGroupId(t);this.photoGroups.has(e)||this.photoGroups.set(e,[]),this.photoGroups.get(e).push(t),this.recalculateLayout()}removePhoto(t){for(let[e,n]of this.photoGroups.entries()){let i=n.findIndex(r=>r.id===t);if(i!==-1)return n.splice(i,1),n.length===0&&this.photoGroups.delete(e),this.recalculateLayout(),!0}return!1}getPositionForPhoto(t,e){return st(this,null,function*(){return this.regroupAllPhotos(e),this.getPositionForPhotoOptimized(t)})}getPositionForPhotoOptimized(t){return st(this,null,function*(){let e=this.getGroupId(t),n=this.groupPositions.get(e);if(!n)return console.warn(`No group position found for photo ${t.id} in group ${e}`),null;let i=this.photoGroups.get(e)||[],r=i.findIndex(h=>h.id===t.id);if(r===-1)return console.warn(`Photo ${t.id} not found in group ${e}`),null;let a=this.packPhotosInGroup(i)[r];if(!a)return null;let l=n.x+a.x,c=n.y+a.y;return{x:l,y:c,metadata:{groupId:e,groupSize:i.length,photoIndex:r,groupPosition:{x:n.x,y:n.y,radius:n.radius},circlePackKey:`circle-pack-${e}-${r}`}}})}calculateAllPositions(t){return st(this,null,function*(){this.photoGroups.clear();for(let n of t){let i=this.getGroupId(n);this.photoGroups.has(i)||this.photoGroups.set(i,[]),this.photoGroups.get(i).push(n)}this.recalculateLayout();let e=[];for(let n of t){let i=yield this.getPositionForPhotoOptimized(n);e.push(i)}return e})}getGroupId(t){let e=t.metadata.author_id;if(e)return`author:${e}`;let n=t.getProperty("_circle_pack_group_id");return n||(n=Math.random().toString(36).substring(2,15),t.setProperty("_circle_pack_group_id",n)),`random:${n}`}regroupAllPhotos(t){this.photoGroups.clear();for(let e of t){let n=this.getGroupId(e);this.photoGroups.has(n)||this.photoGroups.set(n,[]),this.photoGroups.get(n).push(e)}this.recalculateLayout()}recalculateLayout(){let e=Array.from(this.photoGroups.entries()).sort(([i,r],[o,a])=>a.length!==r.length?a.length-r.length:i.localeCompare(o)).map(([i,r])=>{let o=this.calculateGroupRadius(r.length);return{id:i,radius:o,x:0,y:0}}),n=this.packCircles(e,this.groupBuffer);this.groupPositions.clear();for(let i of n)this.groupPositions.set(i.id,{x:i.x,y:i.y,radius:i.radius})}calculateGroupRadius(t){if(t===1)return this.photoRadius+this.photoBuffer;let e=t*Math.PI*this.photoRadius*this.photoRadius,n=Math.sqrt(e/Math.PI)+this.photoRadius+this.photoBuffer;return Math.max(n,this.photoRadius*2)}packPhotosInGroup(t){if(t.length===0)return[];if(t.length===1)return[{x:0,y:0}];let e=t.map((i,r)=>({id:i.id,radius:this.photoRadius,x:0,y:0}));return this.packCircles(e,this.photoBuffer).map(i=>({x:i.x,y:i.y}))}packCircles(t,e=0){if(t.length===0)return[];let n=[];n.push(bn(kt({},t[0]),{x:0,y:0}));for(let i=1;i<t.length;i++){let r=t[i],o=this.findBestPosition(r,n,e);n.push(bn(kt({},r),{x:o.x,y:o.y}))}return n}findBestPosition(t,e,n){if(e.length===0)return{x:0,y:0};let i={x:0,y:0},r=1/0;for(let o of e){let a=[0,Math.PI*5/7,Math.PI*10/7,Math.PI*1/7,Math.PI*6/7,Math.PI*11/7,Math.PI*2/7,Math.PI*7/7,Math.PI*12/7,Math.PI*3/7,Math.PI*8/7,Math.PI*13/7,Math.PI*4/7,Math.PI*9/7];for(let l of a){let c=o.radius+t.radius+n,h=o.x+Math.cos(l)*c,u=o.y+Math.sin(l)*c;if(!e.some(p=>{let g=h-p.x,y=u-p.y,m=t.radius+p.radius+n;return Math.sqrt(g*g+y*y)<m})){let p=Math.sqrt(h*h+u*u);p<r&&(r=p,i={x:h,y:u})}}}return i}getLayoutBounds(){return st(this,null,function*(){if(this.groupPositions.size===0)return{width:this.photoWidth*2,height:this.photoHeight*2};let t=1/0,e=-1/0,n=1/0,i=-1/0;for(let r of this.groupPositions.values()){let o=r.x-r.radius,a=r.x+r.radius,l=r.y-r.radius,c=r.y+r.radius;t=Math.min(t,o),e=Math.max(e,a),n=Math.min(n,l),i=Math.max(i,c)}return{width:e-t+this.groupBuffer*2,height:i-n+this.groupBuffer*2}})}dispose(){return st(this,null,function*(){for(let t of this.photoGroups.values())for(let e of t)e.setProperty("_circle_pack_group_id",void 0);this.photoGroups.clear(),this.groupPositions.clear(),yield rn(s.prototype,this,"dispose").call(this)})}requiresFullRecalculationOnAdd(){return!0}getPackingInfo(){let t=Array.from(this.photoGroups.entries()).map(([e,n])=>({groupId:e,photoCount:n.length,position:this.groupPositions.get(e)||{x:0,y:0,radius:0}}));return{totalGroups:this.photoGroups.size,totalPhotos:Array.from(this.photoGroups.values()).reduce((e,n)=>e+n.length,0),groups:t}}};var $s=class s{_metadata;_currentPosition;_targetPosition;_mesh=null;_animationState;_animationStartTime=0;_properties=new Map;constructor(t,e={x:0,y:0,z:0}){this._metadata=kt({},t),this._currentPosition=kt({},e),this._targetPosition=kt({},e),this._animationState="spawning"}get id(){return this._metadata.id}get url(){return this._metadata.url}get metadata(){return kt({},this._metadata)}get currentPosition(){return kt({},this._currentPosition)}get targetPosition(){return kt({},this._targetPosition)}get mesh(){return this._mesh}get animationState(){return this._animationState}get animationStartTime(){return this._animationStartTime}setCurrentPosition(t){this._currentPosition=kt({},t)}setTargetPosition(t){this._targetPosition=kt({},t)}setMesh(t){this._mesh=t}setAnimationState(t){this._animationState=t,this._animationStartTime=performance.now()}isAtTarget(t=.1){let e=this._currentPosition.x-this._targetPosition.x,n=this._currentPosition.y-this._targetPosition.y,i=this._currentPosition.z-this._targetPosition.z;return Math.sqrt(e*e+n*n+i*i)<=t}getAnimationProgress(t){let e=performance.now()-this._animationStartTime;return Math.min(1,Math.max(0,e/t))}lerpToTarget(t){let e=this._currentPosition,n=this._targetPosition;return{x:e.x+(n.x-e.x)*t,y:e.y+(n.y-e.y)*t,z:e.z+(n.z-e.z)*t}}setProperty(t,e){this._properties.set(t,e)}getProperty(t){return this._properties.get(t)}hasProperty(t){return this._properties.has(t)}removeProperty(t){return this._properties.delete(t)}updateMetadata(t){this._metadata=kt(kt({},this._metadata),t)}distanceTo(t){let e=this._currentPosition.x-t._currentPosition.x,n=this._currentPosition.y-t._currentPosition.y,i=this._currentPosition.z-t._currentPosition.z;return Math.sqrt(e*e+n*n+i*i)}clone(){let t=new s(this._metadata,this._currentPosition);return t._targetPosition=kt({},this._targetPosition),t._animationState=this._animationState,t._animationStartTime=this._animationStartTime,t._mesh=this._mesh,this._properties.forEach((e,n)=>{t._properties.set(n,e)}),t}dispose(){this._mesh=null,this._properties.clear()}toString(){return`PhotoData(id: ${this.id}, pos: (${this._currentPosition.x.toFixed(1)}, ${this._currentPosition.y.toFixed(1)}, ${this._currentPosition.z.toFixed(1)}), state: ${this._animationState})`}};var Zs=class s{photos=new Map;layoutStrategy=null;renderer=null;enableRandomShowcase=!1;enableSvgAutoPositioning=!1;showcaseInterval=Qt.SHOWCASE_INTERVAL;newPhotoAnimationDelay=Qt.NEW_PHOTO_ANIMATION_DELAY;showcaseTimer=null;isShowcasing=!1;cameraBoundsUpdateTimer=null;photoQueue=[];photoAddedSubject=new Qn;photoRemovedSubject=new Qn;layoutChangedSubject=new Qn;photoAdded$=this.photoAddedSubject.asObservable();photoRemoved$=this.photoRemovedSubject.asObservable();layoutChanged$=this.layoutChangedSubject.asObservable();constructor(){}initialize(i,r){return st(this,arguments,function*(t,e,n={}){this.layoutStrategy=t,this.renderer=e,this.enableRandomShowcase=n.enableRandomShowcase??!1,this.showcaseInterval=n.showcaseInterval??Qt.SHOWCASE_INTERVAL,this.newPhotoAnimationDelay=n.newPhotoAnimationDelay??Qt.NEW_PHOTO_ANIMATION_DELAY,yield this.layoutStrategy.initialize(),this.updateShowcaseLoop()})}addPhoto(t){return st(this,null,function*(){if(this.photos.has(t.id))return this.photos.get(t.id);if(!this.layoutStrategy||!this.renderer)throw new Error("Repository not initialized");let e=new $s(t,{x:0,y:0,z:0});this.photos.set(t.id,e),this.layoutStrategy.addPhoto(e);let n=!1;if(this.layoutStrategy.requiresFullRecalculationOnAdd()){let r=Array.from(this.photos.values()),o=yield this.layoutStrategy.calculateAllPositions(r),a=[];r.forEach((l,c)=>{let h=o[c];if(h&&h.x!==void 0&&h.y!==void 0){let u={x:h.x,y:h.y,z:0};if(l.setProperty("opacity",1),l.setTargetPosition(u),l.mesh&&l.id!==e.id){let d=l.currentPosition,p=l.getProperty("opacity")||1;a.push(this.animateToPositionWithOpacityUpdate(l,d,u,p,1,Qt.LAYOUT_TRANSITION_DURATION))}h.metadata&&l.updateMetadata(h.metadata),h.gridKey&&l.setProperty("gridKey",h.gridKey),l.id===e.id&&(n=!0)}else{let u={x:0,y:0,z:0};if(l.setProperty("opacity",0),l.setTargetPosition(u),l.mesh&&l.id!==e.id){let d=l.currentPosition,p=l.getProperty("opacity")||1;a.push(this.animateToPositionWithOpacityUpdate(l,d,u,p,0,Qt.LAYOUT_TRANSITION_DURATION))}}}),a.length>0&&(yield Promise.all(a))}else{let r=yield this.layoutStrategy.getPositionForPhoto(e,Array.from(this.photos.values()));n=!!(r&&r.x!==void 0&&r.y!==void 0),n&&r?(e.setProperty("opacity",1),e.setTargetPosition({x:r.x,y:r.y,z:0}),r.metadata&&e.updateMetadata(r.metadata),r.gridKey&&e.setProperty("gridKey",r.gridKey)):(e.setProperty("opacity",0),e.setTargetPosition({x:0,y:0,z:0}))}let i=yield this.renderer.createPhotoMesh(e);return e.setMesh(i),this.renderer.setMeshPhotoId(i,e.id),this.layoutStrategy&&Ws(this.layoutStrategy)&&this.setupInteractiveDragForPhoto(e),n?(e.setCurrentPosition(e.targetPosition),this.renderer.updateMeshPosition(i,e.targetPosition),e.setAnimationState("positioned"),i.material&&"opacity"in i.material&&(i.material.opacity=e.getProperty("opacity")??1,i.material.transparent=!0)):i.material&&"opacity"in i.material&&(i.material.opacity=0,i.material.transparent=!0),n&&(this.photoQueue.push(t.id),console.log("Added photo to queue:",t.id,"Queue length:",this.photoQueue.length)),n&&this.updateCameraBounds(),this.photoAddedSubject.next(e),e})}removePhoto(t){let e=this.photos.get(t);return e?(e.mesh&&this.renderer&&this.renderer.removeMesh(e.mesh),this.layoutStrategy&&this.layoutStrategy.removePhoto(t),e.dispose(),this.photos.delete(t),this.updateCameraBounds(),this.photoRemovedSubject.next(t),!0):!1}getPhoto(t){return this.photos.get(t)}getAllPhotos(){return Array.from(this.photos.values())}getLayoutStrategy(){return this.layoutStrategy}getVisiblePhotos(){return this.getAllPhotos().filter(t=>(t.getProperty("opacity")??1)>0)}setLayoutStrategy(t){return st(this,null,function*(){if(!this.layoutStrategy||!this.renderer)throw new Error("PhotoDataRepository not initialized");let e=this.layoutStrategy.getConfiguration().name,n=t.getConfiguration().name;yield t.initialize();let i=Array.from(this.photos.values());for(let l of i)t.addPhoto(l);let r=yield t.calculateAllPositions(i);this.layoutStrategy=t;let o=i.map((l,c)=>st(this,null,function*(){let h=r[c],u=c*Qt.LAYOUT_STAGGER_DELAY;u>0&&(yield new Promise(g=>setTimeout(g,u*1e3)));let d=h!==null,p=l.mesh?.material&&"opacity"in l.mesh.material?l.mesh.material.opacity:1;if(d){if(l.setProperty("opacity",1),l.setTargetPosition({x:h.x,y:h.y,z:l.targetPosition.z}),h.metadata&&l.updateMetadata(h.metadata),h.gridKey&&l.setProperty("gridKey",h.gridKey),l.mesh){let g={x:l.mesh.position.x,y:l.mesh.position.y,z:l.mesh.position.z};return this.animateToPositionWithOpacityUpdate(l,g,l.targetPosition,p,1,Qt.LAYOUT_TRANSITION_DURATION)}}else if(l.setProperty("opacity",0),l.setTargetPosition({x:0,y:0,z:0}),l.mesh){let g={x:l.mesh.position.x,y:l.mesh.position.y,z:l.mesh.position.z};return this.animateToPositionWithOpacityUpdate(l,g,{x:0,y:0,z:0},p,0,Qt.INVISIBLE_POSITION_TRANSITION_DURATION)}})),a=this.updateCameraBoundsAnimated(!0);if(yield Promise.all([Promise.all(o.filter(Boolean)),a]),Ws(this.layoutStrategy))for(let l of i)l.mesh&&(this.renderer.setMeshPhotoId(l.mesh,l.id),this.setupInteractiveDragForPhoto(l));else this.renderer.disableAllDragging();this.layoutChangedSubject.next()})}setRandomShowcaseEnabled(t){this.enableRandomShowcase=t,this.updateShowcaseLoop()}setSvgAutoPositioningEnabled(t){this.enableSvgAutoPositioning=t}refreshLayout(){return st(this,null,function*(){if(!this.layoutStrategy){console.warn("Layout strategy not initialized");return}let t=Array.from(this.photos.values()),e=[];this.layoutStrategy.getConfiguration().name==="svg-background"&&"calculateAllPositions"in this.layoutStrategy?e=yield this.layoutStrategy.calculateAllPositions(t,this.enableSvgAutoPositioning):e=yield this.layoutStrategy.calculateAllPositions(t);let n=t.map((r,o)=>st(this,null,function*(){let a=e[o],l=o*Qt.LAYOUT_STAGGER_DELAY;l>0&&(yield new Promise(u=>setTimeout(u,l*1e3)));let c=a!==null,h=r.mesh?.material&&"opacity"in r.mesh.material?r.mesh.material.opacity:1;if(c){if(r.setProperty("opacity",1),r.setTargetPosition({x:a.x,y:a.y,z:r.targetPosition.z}),a.metadata&&r.updateMetadata(a.metadata),a.gridKey&&r.setProperty("gridKey",a.gridKey),r.mesh){let u={x:r.mesh.position.x,y:r.mesh.position.y,z:r.mesh.position.z};return this.animateToPositionWithOpacityUpdate(r,u,r.targetPosition,h,1,Qt.LAYOUT_TRANSITION_DURATION)}}else if(r.setProperty("opacity",0),r.setTargetPosition({x:0,y:0,z:0}),r.mesh){let u={x:r.mesh.position.x,y:r.mesh.position.y,z:r.mesh.position.z};return this.animateToPositionWithOpacityUpdate(r,u,{x:0,y:0,z:0},h,0,Qt.INVISIBLE_POSITION_TRANSITION_DURATION)}})),i=this.updateCameraBoundsAnimated(!0);yield Promise.all([Promise.all(n.filter(Boolean)),i]),this.layoutChangedSubject.next()})}isRandomShowcaseEnabled(){return this.enableRandomShowcase}getQueueLength(){return this.photoQueue.length}clearQueue(){this.photoQueue=[]}getQueue(){return[...this.photoQueue]}showcasePhoto(t){return st(this,null,function*(){let e=this.photos.get(t);if(!(!e||!e.mesh||!this.renderer)&&!this.isShowcasing){this.isShowcasing=!0;try{yield this.renderer.upgradeToHighResTexture(e.mesh,e.url);let n=e.currentPosition.z,r={x:0,y:0,z:this.renderer.getCameraSpawnZ()-100},o={x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z};yield this.animateToPositionWithUpdate(e,o,r,Qt.SHOWCASE_FORWARD_DURATION),yield new Promise(c=>setTimeout(c,Math.min(this.newPhotoAnimationDelay,Qt.MAX_SHOWCASE_DURATION)));let a=bn(kt({},e.targetPosition),{z:n}),l={x:e.mesh.position.x,y:e.mesh.position.y,z:e.mesh.position.z};yield this.animateToPositionWithUpdate(e,l,a,Qt.SHOWCASE_RETURN_DURATION),e.setAnimationState("positioned"),yield this.renderer.downgradeToLowResTexture(e.mesh,e.url)}finally{this.isShowcasing=!1}}})}get photoAdded(){return this.photoAdded$}get photoRemoved(){return this.photoRemoved$}get layoutChanged(){return this.layoutChanged$}dispose(){this.showcaseTimer&&(clearTimeout(this.showcaseTimer),this.showcaseTimer=null),this.cameraBoundsUpdateTimer&&(clearTimeout(this.cameraBoundsUpdateTimer),this.cameraBoundsUpdateTimer=null),this.photos.forEach(t=>{t.mesh&&this.renderer&&this.renderer.removeMesh(t.mesh),t.dispose()}),this.photos.clear(),this.layoutStrategy&&this.layoutStrategy.dispose(),this.photoAddedSubject.complete(),this.photoRemovedSubject.complete(),this.layoutChangedSubject.complete()}animateNewPhoto(t){return st(this,null,function*(){if(!t.mesh||!this.renderer)return;t.setAnimationState("spawning");let n={x:0,y:0,z:this.renderer.getCameraSpawnZ()-100};t.setCurrentPosition(n),this.renderer.updateMeshPosition(t.mesh,n),yield new Promise(i=>setTimeout(i,Math.min(this.newPhotoAnimationDelay,Qt.NEW_PHOTO_ANIMATION_DELAY))),t.setAnimationState("floating_back"),yield this.animateToPositionWithOpacityUpdate(t,n,t.targetPosition,0,1,Qt.NEW_PHOTO_ANIMATION_DURATION),t.setAnimationState("positioned"),yield this.updateCameraBoundsAnimated(!0)})}updateShowcaseLoop(){this.showcaseTimer&&(clearTimeout(this.showcaseTimer),this.showcaseTimer=null),this.enableRandomShowcase&&this.scheduleRandomShowcase()}scheduleRandomShowcase(){this.enableRandomShowcase&&(this.showcaseTimer=setTimeout(()=>st(this,null,function*(){if(this.isShowcasing){this.scheduleRandomShowcase();return}let t;if(this.photoQueue.length>0)t=this.photoQueue.shift();else{let e=this.getVisiblePhotos();e.length>0&&(t=e[Math.floor(Math.random()*e.length)].id)}t&&(yield this.showcasePhoto(t)),this.scheduleRandomShowcase()}),this.showcaseInterval))}updateCameraBounds(){this.cameraBoundsUpdateTimer&&clearTimeout(this.cameraBoundsUpdateTimer),this.cameraBoundsUpdateTimer=setTimeout(()=>{this.performCameraBoundsUpdate()},Qt.CAMERA_BOUNDS_UPDATE_DEBOUNCE)}performCameraBoundsUpdate(){if(!this.renderer)return;let t=this.getVisiblePhotos();if(t.length===0)return;let e=t.map(i=>({x:i.targetPosition.x,y:i.targetPosition.y})),n=this.calculateBounds(e);this.renderer.updateCameraTarget(n)}updateCameraBoundsAnimated(t=!0){return st(this,null,function*(){if(!this.renderer)return;let e=this.getVisiblePhotos();if(e.length===0)return;let n=e.map(r=>({x:r.targetPosition.x,y:r.targetPosition.y})),i=this.calculateBounds(n);t?yield this.renderer.animateCameraTarget(i,Qt.CAMERA_BOUNDS_ANIMATION_DURATION):this.renderer.updateCameraTarget(i)})}animateToPositionWithUpdate(t,e,n,i){return st(this,null,function*(){t.mesh&&(yield this.renderer.animateToPosition(t.mesh,e,n,i),t.setCurrentPosition(n))})}animateToPositionWithOpacityUpdate(t,e,n,i,r,o){return st(this,null,function*(){t.mesh&&(yield this.renderer.animatePositionAndOpacity(t.mesh,e,n,i,r,o),t.setCurrentPosition(n),t.setProperty("opacity",r))})}setupInteractiveDragForPhoto(t){if(!t.mesh||!this.renderer||!this.layoutStrategy||!Ws(this.layoutStrategy))return;let e=this.layoutStrategy;this.renderer.setLayoutStrategy(e),this.renderer.setMeshPhotoData(t.mesh,t),this.renderer.enableDragForMesh(t.mesh,n=>{t.setCurrentPosition(n),t.setTargetPosition(n)})}calculateBounds(t){if(t.length===0)return{minX:0,maxX:0,minY:0,maxY:0};let e=Ut.PHOTO_WIDTH/2,n=Ut.PHOTO_HEIGHT/2,i=t[0].x-e,r=t[0].x+e,o=t[0].y-n,a=t[0].y+n;for(let l of t)i=Math.min(i,l.x-e),r=Math.max(r,l.x+e),o=Math.min(o,l.y-n),a=Math.max(a,l.y+n);return{minX:i,maxX:r,minY:o,maxY:a}}static \u0275fac=function(e){return new(e||s)};static \u0275prov=Ns({token:s,factory:s.\u0275fac,providedIn:"root"})};var Hr="179";var Gl=0,va=1,Wl=2;var xa=1,Xl=2,mn=3,Cn=0,Ce=1,gn=2,Dn=0,ri=1,ba=2,Ma=3,Sa=4,Yl=5,Gn=100,ql=101,$l=102,Zl=103,Jl=104,Kl=200,jl=201,Ql=202,tc=203,gr=204,_r=205,ec=206,nc=207,ic=208,sc=209,rc=210,oc=211,ac=212,lc=213,cc=214,kr=0,Vr=1,Gr=2,oi=3,Wr=4,Xr=5,Yr=6,qr=7,Ta=0,hc=1,uc=2,Ln=0,dc=1,fc=2,pc=3,mc=4,gc=5,_c=6,yc=7;var ua=300,ui=301,di=302,$r=303,Zr=304,ws=306,yr=1e3,Qe=1001,vr=1002,Ye=1003,vc=1004;var Es=1005;var De=1006,Jr=1007;var nn=1008;var _n=1009,wa=1010,Ea=1011,Gi=1012,Kr=1013,Zn=1014,yn=1015,Wi=1016,jr=1017,Qr=1018,Xi=1020,Aa=35902,Pa=1021,Ca=1022,$e=1023,Oi=1026,Yi=1027,Ra=1028,to=1029,Ia=1030,eo=1031;var no=1033,As=33776,Ps=33777,Cs=33778,Rs=33779,io=35840,so=35841,ro=35842,oo=35843,ao=36196,lo=37492,co=37496,ho=37808,uo=37809,fo=37810,po=37811,mo=37812,go=37813,_o=37814,yo=37815,vo=37816,xo=37817,bo=37818,Mo=37819,So=37820,To=37821,Is=36492,wo=36494,Eo=36495,Da=36283,Ao=36284,Po=36285,Co=36286;var ls=2300,xr=2301,pr=2302,da=2400,fa=2401,pa=2402;var xc=3200,bc=3201;var Mc=0,Sc=1,On="",xe="srgb",ai="srgb-linear",cs="linear",Zt="srgb";var si=7680;var ma=519,Tc=512,wc=513,Ec=514,La=515,Ac=516,Pc=517,Cc=518,Rc=519,ga=35044;var Oa="300 es",tn=2e3,hs=2001;var Rn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sl=1234567,os=Math.PI/180,Ui=180/Math.PI;function qi(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[s&255]+be[s>>8&255]+be[s>>16&255]+be[s>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function Ht(s,t,e){return Math.max(t,Math.min(e,s))}function Ua(s,t){return(s%t+t)%t}function Mh(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Sh(s,t,e){return s!==t?(e-s)/(t-s):0}function as(s,t,e){return(1-e)*s+e*t}function Th(s,t,e,n){return as(s,t,1-Math.exp(-e*n))}function wh(s,t=1){return t-Math.abs(Ua(s,t*2)-t)}function Eh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Ah(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Ph(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Ch(s,t){return s+Math.random()*(t-s)}function Rh(s){return s*(.5-Math.random())}function Ih(s){s!==void 0&&(Sl=s);let t=Sl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Dh(s){return s*os}function Lh(s){return s*Ui}function Oh(s){return(s&s-1)===0&&s!==0}function Uh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Nh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Fh(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*p,a*c);break;case"YXY":s.set(l*p,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Di(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var fe={DEG2RAD:os,RAD2DEG:Ui,generateUUID:qi,clamp:Ht,euclideanModulo:Ua,mapLinear:Mh,inverseLerp:Sh,lerp:as,damp:Th,pingpong:wh,smoothstep:Eh,smootherstep:Ah,randInt:Ph,randFloat:Ch,randFloatSpread:Rh,seededRandom:Ih,degToRad:Dh,radToDeg:Lh,isPowerOfTwo:Oh,ceilPowerOfTwo:Uh,floorPowerOfTwo:Nh,setQuaternionFromProperEuler:Fh,normalize:Ae,denormalize:Di},Xt=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},In=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],p=r[o+1],g=r[o+2],y=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=y;return}if(u!==y||l!==d||c!==p||h!==g){let m=1-a,f=l*d+c*p+h*g+u*y,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){let R=Math.sqrt(T),C=Math.atan2(R,f*w);m=Math.sin(m*C)/R,a=Math.sin(a*C)/R}let x=a*w;if(l=l*m+d*x,c=c*m+p*x,h=h*m+g*x,u=u*m+y*x,m===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),p=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-i)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+c)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Tl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Tl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Wo.copy(this).projectOnVector(t),this.sub(Wo)}reflect(t){return this.sub(Wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Wo=new N,Tl=new In,Lt=class s{constructor(t,e,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],y=i[0],m=i[3],f=i[6],w=i[1],T=i[4],x=i[7],R=i[2],C=i[5],A=i[8];return r[0]=o*y+a*w+l*R,r[3]=o*m+a*T+l*C,r[6]=o*f+a*x+l*A,r[1]=c*y+h*w+u*R,r[4]=c*m+h*T+u*C,r[7]=c*f+h*x+u*A,r[2]=d*y+p*w+g*R,r[5]=d*m+p*T+g*C,r[8]=d*f+p*x+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=u*y,t[1]=(i*c-h*n)*y,t[2]=(a*n-i*o)*y,t[3]=d*y,t[4]=(h*e-i*l)*y,t[5]=(i*r-a*e)*y,t[6]=p*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xo.makeScale(t,e)),this}rotate(t){return this.premultiply(Xo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Xo=new Lt;function Na(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ni(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ic(){let s=Ni("canvas");return s.style.display="block",s}var wl={};function li(s){s in wl||(wl[s]=!0,console.warn(s))}function Dc(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var El=new Lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Al=new Lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bh(){let s={enabled:!0,workingColorSpace:ai,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Zt&&(i.r=Pn(i.r),i.g=Pn(i.g),i.b=Pn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Zt&&(i.r=Li(i.r),i.g=Li(i.g),i.b=Li(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===On?cs:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return li("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return li("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[ai]:{primaries:t,whitePoint:n,transfer:cs,toXYZ:El,fromXYZ:Al,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:xe},outputColorSpaceConfig:{drawingBufferColorSpace:xe}},[xe]:{primaries:t,whitePoint:n,transfer:Zt,toXYZ:El,fromXYZ:Al,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:xe}}}),s}var Wt=Bh();function Pn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Li(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var vi,br=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{vi===void 0&&(vi=Ni("canvas")),vi.width=t.width,vi.height=t.height;let i=vi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ni("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Pn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},zh=0,Fi=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=qi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Yo(i[o].image)):r.push(Yo(i[o]))}else r=Yo(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Yo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?br.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Hh=0,qo=new N,ze=(()=>{class s extends Rn{constructor(e=s.DEFAULT_IMAGE,n=s.DEFAULT_MAPPING,i=Qe,r=Qe,o=De,a=nn,l=$e,c=_n,h=s.DEFAULT_ANISOTROPY,u=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=qi(),this.name="",this.source=new Fi(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=a,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qo).x}get height(){return this.source.getSize(qo).y}get depth(){return this.source.getSize(qo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let n in e){let i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let r=this[n];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){let n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ua)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yr:e.x=e.x-Math.floor(e.x);break;case Qe:e.x=e.x<0?0:1;break;case vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yr:e.y=e.y-Math.floor(e.y);break;case Qe:e.y=e.y<0?0:1;break;case vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}return s.DEFAULT_IMAGE=null,s.DEFAULT_MAPPING=ua,s.DEFAULT_ANISOTROPY=1,s})(),he=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,x=(p+1)/2,R=(f+1)/2,C=(h+d)/4,A=(u+y)/4,O=(g+m)/4;return T>x&&T>R?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=C/n,r=A/n):x>R?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=C/i,r=O/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=A/r,i=O/r),this.set(n,i,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-y)/w,this.z=(d-h)/w,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Mr=class extends Rn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);let i={width:t,height:e,depth:n.depth},r=new ze(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Fi(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},fn=class extends Mr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},us=class extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Sr=class extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Wn=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Je):Je.fromBufferAttribute(r,o),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Js.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Js.copy(n.boundingBox)),Js.applyMatrix4(t.matrixWorld),this.union(Js)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),Ks.subVectors(this.max,ns),xi.subVectors(t.a,ns),bi.subVectors(t.b,ns),Mi.subVectors(t.c,ns),Nn.subVectors(bi,xi),Fn.subVectors(Mi,bi),ti.subVectors(xi,Mi);let e=[0,-Nn.z,Nn.y,0,-Fn.z,Fn.y,0,-ti.z,ti.y,Nn.z,0,-Nn.x,Fn.z,0,-Fn.x,ti.z,0,-ti.x,-Nn.y,Nn.x,0,-Fn.y,Fn.x,0,-ti.y,ti.x,0];return!$o(e,xi,bi,Mi,Ks)||(e=[1,0,0,0,1,0,0,0,1],!$o(e,xi,bi,Mi,Ks))?!1:(js.crossVectors(Nn,Fn),e=[js.x,js.y,js.z],$o(e,xi,bi,Mi,Ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Mn=[new N,new N,new N,new N,new N,new N,new N,new N],Je=new N,Js=new Wn,xi=new N,bi=new N,Mi=new N,Nn=new N,Fn=new N,ti=new N,ns=new N,Ks=new N,js=new N,ei=new N;function $o(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ei.fromArray(s,r);let a=i.x*Math.abs(ei.x)+i.y*Math.abs(ei.y)+i.z*Math.abs(ei.z),l=t.dot(ei),c=e.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var kh=new Wn,is=new N,Zo=new N,Bi=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):kh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);let e=is.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add(Zo)),this.expandByPoint(is.copy(t.center).sub(Zo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Sn=new N,Jo=new N,Qs=new N,Bn=new N,Ko=new N,tr=new N,jo=new N,ds=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Sn.copy(this.origin).addScaledVector(this.direction,e),Sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Jo.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(Jo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Qs),a=Bn.dot(this.direction),l=-Bn.dot(Qs),c=Bn.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let y=1/h;u*=y,d*=y,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Jo).addScaledVector(Qs,d),p}intersectSphere(t,e){Sn.subVectors(t.center,this.origin);let n=Sn.dot(this.direction),i=Sn.dot(Sn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Sn)!==null}intersectTriangle(t,e,n,i,r){Ko.subVectors(e,t),tr.subVectors(n,t),jo.crossVectors(Ko,tr);let o=this.direction.dot(jo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,t);let l=a*this.direction.dot(tr.crossVectors(Bn,tr));if(l<0)return null;let c=a*this.direction.dot(Ko.cross(Bn));if(c<0||l+c>o)return null;let h=-a*Bn.dot(jo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},me=class s{constructor(t,e,n,i,r,o,a,l,c,h,u,d,p,g,y,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,p,g,y,m)}set(t,e,n,i,r,o,a,l,c,h,u,d,p,g,y,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),o=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,g=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-y*c,e[9]=-a*l,e[2]=y-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,y=c*u;e[0]=d+y*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=y+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,y=c*u;e[0]=d-y*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,p=o*u,g=a*h,y=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,p=o*c,g=a*l,y=a*c;e[0]=l*h,e[4]=y-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*l,p=o*c,g=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vh,t,Gh)}lookAt(t,e,n){let i=this.elements;return Ue.subVectors(t,e),Ue.lengthSq()===0&&(Ue.z=1),Ue.normalize(),zn.crossVectors(n,Ue),zn.lengthSq()===0&&(Math.abs(n.z)===1?Ue.x+=1e-4:Ue.z+=1e-4,Ue.normalize(),zn.crossVectors(n,Ue)),zn.normalize(),er.crossVectors(Ue,zn),i[0]=zn.x,i[4]=er.x,i[8]=Ue.x,i[1]=zn.y,i[5]=er.y,i[9]=Ue.y,i[2]=zn.z,i[6]=er.z,i[10]=Ue.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],y=n[6],m=n[10],f=n[14],w=n[3],T=n[7],x=n[11],R=n[15],C=i[0],A=i[4],O=i[8],M=i[12],b=i[1],E=i[5],W=i[9],k=i[13],X=i[2],$=i[6],Y=i[10],Z=i[14],z=i[3],ot=i[7],ut=i[11],Mt=i[15];return r[0]=o*C+a*b+l*X+c*z,r[4]=o*A+a*E+l*$+c*ot,r[8]=o*O+a*W+l*Y+c*ut,r[12]=o*M+a*k+l*Z+c*Mt,r[1]=h*C+u*b+d*X+p*z,r[5]=h*A+u*E+d*$+p*ot,r[9]=h*O+u*W+d*Y+p*ut,r[13]=h*M+u*k+d*Z+p*Mt,r[2]=g*C+y*b+m*X+f*z,r[6]=g*A+y*E+m*$+f*ot,r[10]=g*O+y*W+m*Y+f*ut,r[14]=g*M+y*k+m*Z+f*Mt,r[3]=w*C+T*b+x*X+R*z,r[7]=w*A+T*E+x*$+R*ot,r[11]=w*O+T*W+x*Y+R*ut,r[15]=w*M+T*k+x*Z+R*Mt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],y=t[7],m=t[11],f=t[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*p-n*l*p)+y*(+e*l*p-e*c*d+r*o*d-i*o*p+i*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+f*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],y=t[13],m=t[14],f=t[15],w=u*m*c-y*d*c+y*l*p-a*m*p-u*l*f+a*d*f,T=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,x=h*y*c-g*u*c+g*a*p-o*y*p-h*a*f+o*u*f,R=g*u*l-h*y*l-g*a*d+o*y*d+h*a*m-o*u*m,C=e*w+n*T+i*x+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/C;return t[0]=w*A,t[1]=(y*d*r-u*m*r-y*i*p+n*m*p+u*i*f-n*d*f)*A,t[2]=(a*m*r-y*l*r+y*i*c-n*m*c-a*i*f+n*l*f)*A,t[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*p-n*l*p)*A,t[4]=T*A,t[5]=(h*m*r-g*d*r+g*i*p-e*m*p-h*i*f+e*d*f)*A,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*f-e*l*f)*A,t[7]=(o*d*r-h*l*r+h*i*c-e*d*c-o*i*p+e*l*p)*A,t[8]=x*A,t[9]=(g*u*r-h*y*r-g*n*p+e*y*p+h*n*f-e*u*f)*A,t[10]=(o*y*r-g*a*r+g*n*c-e*y*c-o*n*f+e*a*f)*A,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*p-e*a*p)*A,t[12]=R*A,t[13]=(h*y*i-g*u*i+g*n*d-e*y*d-h*n*m+e*u*m)*A,t[14]=(g*a*i-o*y*i-g*n*l+e*y*l+o*n*m-e*a*m)*A,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*A,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,y=o*h,m=o*u,f=a*u,w=l*c,T=l*h,x=l*u,R=n.x,C=n.y,A=n.z;return i[0]=(1-(y+f))*R,i[1]=(p+x)*R,i[2]=(g-T)*R,i[3]=0,i[4]=(p-x)*C,i[5]=(1-(d+f))*C,i[6]=(m+w)*C,i[7]=0,i[8]=(g+T)*A,i[9]=(m-w)*A,i[10]=(1-(d+y))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Si.set(i[0],i[1],i[2]).length(),o=Si.set(i[4],i[5],i[6]).length(),a=Si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Ke.copy(this);let c=1/r,h=1/o,u=1/a;return Ke.elements[0]*=c,Ke.elements[1]*=c,Ke.elements[2]*=c,Ke.elements[4]*=h,Ke.elements[5]*=h,Ke.elements[6]*=h,Ke.elements[8]*=u,Ke.elements[9]*=u,Ke.elements[10]*=u,e.setFromRotationMatrix(Ke),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=tn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),p=(n+i)/(n-i),g,y;if(l)g=r/(o-r),y=o*r/(o-r);else if(a===tn)g=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===hs)g=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=tn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),p=-(n+i)/(n-i),g,y;if(l)g=1/(o-r),y=o/(o-r);else if(a===tn)g=-2/(o-r),y=-(o+r)/(o-r);else if(a===hs)g=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Si=new N,Ke=new me,Vh=new N(0,0,0),Gh=new N(1,1,1),zn=new N,er=new N,Ue=new N,Pl=new me,Cl=new In,ci=(()=>{class s{constructor(e=0,n=0,i=0,r=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){let r=e.elements,o=r[0],a=r[4],l=r[8],c=r[1],h=r[5],u=r[9],d=r[2],p=r[6],g=r[10];switch(n){case"XYZ":this._y=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(p,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,h),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-u,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Pl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pl,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Cl.setFromEuler(this),this.setFromQuaternion(Cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return s.DEFAULT_ORDER="XYZ",s})(),zi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Wh=0,Rl=new N,Ti=new In,Tn=new me,nr=new N,ss=new N,Xh=new N,Yh=new In,Il=new N(1,0,0),Dl=new N(0,1,0),Ll=new N(0,0,1),Ol={type:"added"},qh={type:"removed"},wi={type:"childadded",child:null},Qo={type:"childremoved",child:null},Jn=(()=>{class s extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=qi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new N,n=new ci,i=new In,r=new N(1,1,1);function o(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new me},normalMatrix:{value:new Lt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ti.setFromAxisAngle(e,n),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(e,n){return Ti.setFromAxisAngle(e,n),this.quaternion.premultiply(Ti),this}rotateX(e){return this.rotateOnAxis(Il,e)}rotateY(e){return this.rotateOnAxis(Dl,e)}rotateZ(e){return this.rotateOnAxis(Ll,e)}translateOnAxis(e,n){return Rl.copy(e).applyQuaternion(this.quaternion),this.position.add(Rl.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Il,e)}translateY(e){return this.translateOnAxis(Dl,e)}translateZ(e){return this.translateOnAxis(Ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?nr.copy(e):nr.set(e,n,i);let r=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(ss,nr,this.up):Tn.lookAt(nr,ss,this.up),this.quaternion.setFromRotationMatrix(Tn),r&&(Tn.extractRotation(r.matrixWorld),Ti.setFromRotationMatrix(Tn),this.quaternion.premultiply(Ti.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ol),wi.child=e,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(qh),Qo.child=e,this.dispatchEvent(Qo),Qo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ol),wi.child=e,this.dispatchEvent(wi),wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,e,Xh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,Yh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){let n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(e){let n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>bn(kt({},l),{boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>kt({},l)),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function o(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let c=l.shapes;if(Array.isArray(c))for(let h=0,u=c.length;h<u;h++){let d=c[h];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let c=0,h=this.material.length;c<h;c++)l.push(o(e.materials,this.material[c]));r.material=l}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){let c=this.animations[l];r.animations.push(o(e.animations,c))}}if(n){let l=a(e.geometries),c=a(e.materials),h=a(e.textures),u=a(e.images),d=a(e.shapes),p=a(e.skeletons),g=a(e.animations),y=a(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),y.length>0&&(i.nodes=y)}return i.object=r,i;function a(l){let c=[];for(let h in l){let u=l[h];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}}return s.DEFAULT_UP=new N(0,1,0),s.DEFAULT_MATRIX_AUTO_UPDATE=!0,s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,s})(),je=new N,wn=new N,ta=new N,En=new N,Ei=new N,Ai=new N,Ul=new N,ea=new N,na=new N,ia=new N,sa=new he,ra=new he,oa=new he,Vn=class s{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),je.subVectors(t,e),i.cross(je);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){je.subVectors(i,e),wn.subVectors(n,e),ta.subVectors(t,e);let o=je.dot(je),a=je.dot(wn),l=je.dot(ta),c=wn.dot(wn),h=wn.dot(ta),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(o,En.y),l.addScaledVector(a,En.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return sa.setScalar(0),ra.setScalar(0),oa.setScalar(0),sa.fromBufferAttribute(t,e),ra.fromBufferAttribute(t,n),oa.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(sa,r.x),o.addScaledVector(ra,r.y),o.addScaledVector(oa,r.z),o}static isFrontFacing(t,e,n,i){return je.subVectors(n,e),wn.subVectors(t,e),je.cross(wn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return je.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),je.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Ei.subVectors(i,n),Ai.subVectors(r,n),ea.subVectors(t,n);let l=Ei.dot(ea),c=Ai.dot(ea);if(l<=0&&c<=0)return e.copy(n);na.subVectors(t,i);let h=Ei.dot(na),u=Ai.dot(na);if(h>=0&&u<=h)return e.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ei,o);ia.subVectors(t,r);let p=Ei.dot(ia),g=Ai.dot(ia);if(g>=0&&p<=g)return e.copy(r);let y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ai,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ul.subVectors(r,i),a=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Ul,a);let f=1/(m+y+d);return o=y*f,a=d*f,e.copy(n).addScaledVector(Ei,o).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Lc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},ir={h:0,s:0,l:0};function aa(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Vt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Wt.workingColorSpace){if(t=Ua(t,1),e=Ht(e,0,1),n=Ht(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=aa(o,r,t+1/3),this.g=aa(o,r,t),this.b=aa(o,r,t-1/3)}return Wt.colorSpaceToWorking(this,i),this}setStyle(t,e=xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xe){let n=Lc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=Li(t.r),this.g=Li(t.g),this.b=Li(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xe){return Wt.workingToColorSpace(Me.copy(this),t),Math.round(Ht(Me.r*255,0,255))*65536+Math.round(Ht(Me.g*255,0,255))*256+Math.round(Ht(Me.b*255,0,255))}getHexString(t=xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.workingToColorSpace(Me.copy(this),e);let n=Me.r,i=Me.g,r=Me.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.workingToColorSpace(Me.copy(this),e),t.r=Me.r,t.g=Me.g,t.b=Me.b,t}getStyle(t=xe){Wt.workingToColorSpace(Me.copy(this),t);let e=Me.r,n=Me.g,i=Me.b;return t!==xe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(ir);let n=as(Hn.h,ir.h,e),i=as(Hn.s,ir.s,e),r=as(Hn.l,ir.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Me=new Vt;Vt.NAMES=Lc;var $h=0,qe=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=qi(),this.name="",this.type="Material",this.blending=ri,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gr,this.blendDst=_r,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=si,this.stencilZFail=si,this.stencilZPass=si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ri&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==gr&&(n.blendSrc=this.blendSrc),this.blendDst!==_r&&(n.blendDst=this.blendDst),this.blendEquation!==Gn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},pn=class extends qe{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var pe=new N,sr=new Xt,Zh=0,Fe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ga,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)sr.fromBufferAttribute(this,e),sr.applyMatrix3(t),this.setXY(e,sr.x,sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ae(e,this.array),n=Ae(n,this.array),i=Ae(i,this.array),r=Ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ga&&(t.usage=this.usage),t}};var fs=class extends Fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ps=class extends Fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var dn=class extends Fe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Jh=0,We=new me,la=new Jn,Pi=new N,Ne=new Wn,rs=new Wn,ve=new N,Xn=class s extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=qi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Na(t)?ps:fs)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Lt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return We.makeRotationFromQuaternion(t),this.applyMatrix4(We),this}rotateX(t){return We.makeRotationX(t),this.applyMatrix4(We),this}rotateY(t){return We.makeRotationY(t),this.applyMatrix4(We),this}rotateZ(t){return We.makeRotationZ(t),this.applyMatrix4(We),this}translate(t,e,n){return We.makeTranslation(t,e,n),this.applyMatrix4(We),this}scale(t,e,n){return We.makeScale(t,e,n),this.applyMatrix4(We),this}lookAt(t){return la.lookAt(t),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dn(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ne.setFromBufferAttribute(r),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,Ne.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,Ne.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(Ne.min),this.boundingBox.expandByPoint(Ne.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(Ne.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];rs.setFromBufferAttribute(a),this.morphTargetsRelative?(ve.addVectors(Ne.min,rs.min),Ne.expandByPoint(ve),ve.addVectors(Ne.max,rs.max),Ne.expandByPoint(ve)):(Ne.expandByPoint(rs.min),Ne.expandByPoint(rs.max))}Ne.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)ve.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(ve));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ve.fromBufferAttribute(a,c),l&&(Pi.fromBufferAttribute(t,c),ve.add(Pi)),i=Math.max(i,n.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let O=0;O<n.count;O++)a[O]=new N,l[O]=new N;let c=new N,h=new N,u=new N,d=new Xt,p=new Xt,g=new Xt,y=new N,m=new N;function f(O,M,b){c.fromBufferAttribute(n,O),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,O),p.fromBufferAttribute(r,M),g.fromBufferAttribute(r,b),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let E=1/(p.x*g.y-g.x*p.y);isFinite(E)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(E),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(E),a[O].add(y),a[M].add(y),a[b].add(y),l[O].add(m),l[M].add(m),l[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let O=0,M=w.length;O<M;++O){let b=w[O],E=b.start,W=b.count;for(let k=E,X=E+W;k<X;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let T=new N,x=new N,R=new N,C=new N;function A(O){R.fromBufferAttribute(i,O),C.copy(R);let M=a[O];T.copy(M),T.sub(R.multiplyScalar(R.dot(M))).normalize(),x.crossVectors(C,M);let E=x.dot(l[O])<0?-1:1;o.setXYZW(O,T.x,T.y,T.z,E)}for(let O=0,M=w.length;O<M;++O){let b=w[O],E=b.start,W=b.count;for(let k=E,X=E+W;k<X;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),y=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Fe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nl=new me,ni=new ds,rr=new Bi,Fl=new N,or=new N,ar=new N,lr=new N,ca=new N,cr=new N,Bl=new N,hr=new N,Pe=class extends Jn{constructor(t=new Xn,e=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ca.fromBufferAttribute(u,t),o?cr.addScaledVector(ca,h):cr.addScaledVector(ca.sub(e),h))}e.add(cr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),ni.copy(t.ray).recast(t.near),!(rr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(rr,Fl)===null||ni.origin.distanceToSquared(Fl)>(t.far-t.near)**2))&&(Nl.copy(r).invert(),ni.copy(t.ray).applyMatrix4(Nl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ni)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=w,R=T;x<R;x+=3){let C=a.getX(x),A=a.getX(x+1),O=a.getX(x+2);i=ur(this,f,t,n,c,h,u,C,A,O),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){let w=a.getX(m),T=a.getX(m+1),x=a.getX(m+2);i=ur(this,o,t,n,c,h,u,w,T,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let m=d[g],f=o[m.materialIndex],w=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=w,R=T;x<R;x+=3){let C=x,A=x+1,O=x+2;i=ur(this,f,t,n,c,h,u,C,A,O),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){let w=m,T=m+1,x=m+2;i=ur(this,o,t,n,c,h,u,w,T,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Kh(s,t,e,n,i,r,o,a){let l;if(t.side===Ce?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Cn,a),l===null)return null;hr.copy(a),hr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(hr);return c<e.near||c>e.far?null:{distance:c,point:hr.clone(),object:s}}function ur(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,or),s.getVertexPosition(l,ar),s.getVertexPosition(c,lr);let h=Kh(s,t,e,n,or,ar,lr,Bl);if(h){let u=new N;Vn.getBarycoord(Bl,or,ar,lr,u),i&&(h.uv=Vn.getInterpolatedAttribute(i,a,l,c,u,new Xt)),r&&(h.uv1=Vn.getInterpolatedAttribute(r,a,l,c,u,new Xt)),o&&(h.normal=Vn.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new N,materialIndex:0};Vn.getNormal(or,ar,lr,d.normal),h.face=d,h.barycoord=u}return h}var Hi=class s extends Xn{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new dn(c,3)),this.setAttribute("normal",new dn(h,3)),this.setAttribute("uv",new dn(u,2));function g(y,m,f,w,T,x,R,C,A,O,M){let b=x/A,E=R/O,W=x/2,k=R/2,X=C/2,$=A+1,Y=O+1,Z=0,z=0,ot=new N;for(let ut=0;ut<Y;ut++){let Mt=ut*E-k;for(let Ft=0;Ft<$;Ft++){let ie=Ft*b-W;ot[y]=ie*w,ot[m]=Mt*T,ot[f]=X,c.push(ot.x,ot.y,ot.z),ot[y]=0,ot[m]=0,ot[f]=C>0?1:-1,h.push(ot.x,ot.y,ot.z),u.push(Ft/A),u.push(1-ut/O),Z+=1}}for(let ut=0;ut<O;ut++)for(let Mt=0;Mt<A;Mt++){let Ft=d+Mt+$*ut,ie=d+Mt+$*(ut+1),Kt=d+(Mt+1)+$*(ut+1),G=d+(Mt+1)+$*ut;l.push(Ft,ie,G),l.push(ie,Kt,G),z+=6}a.addGroup(p,z,M),p+=z,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function fi(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Te(s){let t={};for(let e=0;e<s.length;e++){let n=fi(s[e]);for(let i in n)t[i]=n[i]}return t}function jh(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Fa(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}var Oc={clone:fi,merge:Te},Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends qe{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qh,this.fragmentShader=tu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fi(t.uniforms),this.uniformsGroups=jh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ms=class extends Jn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},kn=new N,zl=new Xt,Hl=new Xt,Se=class extends ms{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ui*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(os*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ui*2*Math.atan(Math.tan(os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,zl,Hl),e.subVectors(Hl,zl)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(os*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ci=-90,Ri=1,Tr=class extends Jn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Se(Ci,Ri,t,e);i.layers=this.layers,this.add(i);let r=new Se(Ci,Ri,t,e);r.layers=this.layers,this.add(r);let o=new Se(Ci,Ri,t,e);o.layers=this.layers,this.add(o);let a=new Se(Ci,Ri,t,e);a.layers=this.layers,this.add(a);let l=new Se(Ci,Ri,t,e);l.layers=this.layers,this.add(l);let c=new Se(Ci,Ri,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===tn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},gs=class extends ze{constructor(t=[],e=ui,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},wr=class extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new gs(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Hi(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:fi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:Dn});r.uniforms.tEquirect.value=e;let o=new Pe(i,r),a=e.minFilter;return e.minFilter===nn&&(e.minFilter=De),new Tr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},An=class extends Jn{constructor(){super(),this.isGroup=!0,this.type="Group"}},eu={type:"move"},ki=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let m=e.getJointPose(y,n),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(eu)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new An;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var _s=class extends Jn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var ha=new N,nu=new N,iu=new Lt,Xe=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=ha.subVectors(n,e).cross(nu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ha),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||iu.getNormalMatrix(t),i=this.coplanarPoint(ha).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ii=new Bi,su=new Xt(.5,.5),dr=new N,ys=class{constructor(t=new Xe,e=new Xe,n=new Xe,i=new Xe,r=new Xe,o=new Xe){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=tn,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],y=r[9],m=r[10],f=r[11],w=r[12],T=r[13],x=r[14],R=r[15];if(i[0].setComponents(c-o,p-h,f-g,R-w).normalize(),i[1].setComponents(c+o,p+h,f+g,R+w).normalize(),i[2].setComponents(c+a,p+u,f+y,R+T).normalize(),i[3].setComponents(c-a,p-u,f-y,R-T).normalize(),n)i[4].setComponents(l,d,m,x).normalize(),i[5].setComponents(c-l,p-d,f-m,R-x).normalize();else if(i[4].setComponents(c-l,p-d,f-m,R-x).normalize(),e===tn)i[5].setComponents(c+l,p+d,f+m,R+x).normalize();else if(e===hs)i[5].setComponents(l,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(t){ii.center.set(0,0,0);let e=su.distanceTo(t.center);return ii.radius=.7071067811865476+e,ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(dr.x=i.normal.x>0?t.max.x:t.min.x,dr.y=i.normal.y>0?t.max.y:t.min.y,dr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Vi=class extends ze{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},vs=class extends ze{constructor(t,e,n=Zn,i,r,o,a=Ye,l=Ye,c,h=Oi,u=1){if(h!==Oi&&h!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Fi(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}};var Yn=class s extends Xn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],y=[],m=[];for(let f=0;f<h;f++){let w=f*d-o;for(let T=0;T<c;T++){let x=T*u-r;g.push(x,-w,0),y.push(0,0,1),m.push(T/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<a;w++){let T=w+c*f,x=w+c*(f+1),R=w+1+c*(f+1),C=w+1+c*f;p.push(T,x,C),p.push(x,R,C)}this.setIndex(p),this.setAttribute("position",new dn(g,3)),this.setAttribute("normal",new dn(y,3)),this.setAttribute("uv",new dn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var Er=class extends qe{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ar=class extends qe{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function fr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function ru(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var hi=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Pr=class extends hi{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:da,endingEnd:da}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case fa:r=t,a=2*e-n;break;case pa:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case fa:o=t,l=2*n-e;break;case pa:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(i-e),y=g*g,m=y*g,f=-d*m+2*d*y-d*g,w=(1+d)*m+(-1.5-2*d)*y+(-.5+d)*g+1,T=(-1-p)*m+(1.5+p)*y+.5*g,x=p*m-p*y;for(let R=0;R!==a;++R)r[R]=f*o[h+R]+w*o[c+R]+T*o[l+R]+x*o[u+R];return r}},Cr=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Rr=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Be=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=fr(e,this.TimeBufferType),this.values=fr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:fr(t.times,Array),values:fr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Rr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Cr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Pr(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ls:e=this.InterpolantFactoryMethodDiscrete;break;case xr:e=this.InterpolantFactoryMethodLinear;break;case pr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ls;case this.InterpolantFactoryMethodLinear:return xr;case this.InterpolantFactoryMethodSmooth:return pr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&ru(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===pr,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let y=e[u+g];if(y!==e[d+g]||y!==e[p+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Be.prototype.ValueTypeName="";Be.prototype.TimeBufferType=Float32Array;Be.prototype.ValueBufferType=Float32Array;Be.prototype.DefaultInterpolation=xr;var qn=class extends Be{constructor(t,e,n){super(t,e,n)}};qn.prototype.ValueTypeName="bool";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=ls;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ir=class extends Be{constructor(t,e,n,i){super(t,e,n,i)}};Ir.prototype.ValueTypeName="color";var Dr=class extends Be{constructor(t,e,n,i){super(t,e,n,i)}};Dr.prototype.ValueTypeName="number";var Lr=class extends hi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)In.slerpFlat(r,0,o,c-a,o,c,l);return r}},xs=class extends Be{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Lr(this.times,this.values,this.getValueSize(),t)}};xs.prototype.ValueTypeName="quaternion";xs.prototype.InterpolantFactoryMethodSmooth=void 0;var $n=class extends Be{constructor(t,e,n){super(t,e,n)}};$n.prototype.ValueTypeName="string";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=ls;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends Be{constructor(t,e,n,i){super(t,e,n,i)}};Or.prototype.ValueTypeName="vector";var mr={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Ur=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Uc=new Ur,Ba=(()=>{class s{constructor(e){this.manager=e!==void 0?e:Uc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){let i=this;return new Promise(function(r,o){i.load(e,r,n,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}return s.DEFAULT_MATERIAL_NAME="__DEFAULT",s})();var Ii=new WeakMap,Nr=class extends Ba{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=mr.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let u=Ii.get(o);u===void 0&&(u=[],Ii.set(o,u)),u.push({onLoad:e,onError:i})}return o}let a=Ni("img");function l(){h(),e&&e(this);let u=Ii.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}Ii.delete(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),mr.remove(`image:${t}`);let d=Ii.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u)}Ii.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),mr.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}};var bs=class extends Ba{constructor(t){super(t)}load(t,e,n,i){let r=new ze,o=new Nr(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}},Fr=class extends Jn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Br=class extends ms{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Ms=class extends Fr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var zr=class extends Se{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Ss=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var za="\\[\\]\\.:\\/",ou=new RegExp("["+za+"]","g"),Ha="[^"+za+"]",au="[^"+za.replace("\\.","")+"]",lu=/((?:WC+[\/:])*)/.source.replace("WC",Ha),cu=/(WCOD+)?/.source.replace("WCOD",au),hu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ha),uu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ha),du=new RegExp("^"+lu+cu+hu+uu+"$"),fu=["material","materials","bones","map"],_a=class{constructor(t,e,n){let i=n||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ce=(()=>{class s{constructor(e,n,i){this.path=n,this.parsedPath=i||s.parseTrackName(n),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,n,i){return e&&e.isAnimationObjectGroup?new s.Composite(e,n,i):new s(e,n,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ou,"")}static parseTrackName(e){let n=du.exec(e);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=i.nodeName.substring(r+1);fu.indexOf(o)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=o)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,n){if(n===void 0||n===""||n==="."||n===-1||n===e.name||n===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(n);if(i!==void 0)return i}if(e.children){let i=function(o){for(let a=0;a<o.length;a++){let l=o[a];if(l.name===n||l.uuid===n)return l;let c=i(l.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,n){e[n]=this.targetObject[this.propertyName]}_getValue_array(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)e[n++]=i[r]}_getValue_arrayElement(e,n){e[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,n){this.resolvedProperty.toArray(e,n)}_setValue_direct(e,n){this.targetObject[this.propertyName]=e[n]}_setValue_direct_setNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,n){this.targetObject[this.propertyName]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++]}_setValue_array_setNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,n){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,n){this.resolvedProperty[this.propertyIndex]=e[n]}_setValue_arrayElement_setNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty[this.propertyIndex]=e[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,n){this.resolvedProperty.fromArray(e,n)}_setValue_fromArray_setNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,n){this.resolvedProperty.fromArray(e,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,n){this.bind(),this.getValue(e,n)}_setValue_unbound(e,n){this.bind(),this.setValue(e,n)}bind(){let e=this.node,n=this.parsedPath,i=n.objectName,r=n.propertyName,o=n.propertyIndex;if(e||(e=s.findNode(this.rootNode,n.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let h=n.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===h){h=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(h!==void 0){if(e[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[h]}}let a=e[r];if(a===void 0){let h=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return s.Composite=_a,s})();ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kg=new Float32Array(1);var kl=new me,Ts=class{constructor(t,e,n=0,i=1/0){this.ray=new ds(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new zi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return kl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kl),this}intersectObject(t,e=!0,n=[]){return ya(t,this,n,e),n.sort(Vl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)ya(t[i],this,n,e);return n.sort(Vl),n}};function Vl(s,t){return s.distance-t.distance}function ya(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)ya(r[o],t,e,!0)}}function ka(s,t,e,n){let i=pu(n);switch(e){case Pa:return s*t;case Ra:return s*t/i.components*i.byteLength;case to:return s*t/i.components*i.byteLength;case Ia:return s*t*2/i.components*i.byteLength;case eo:return s*t*2/i.components*i.byteLength;case Ca:return s*t*3/i.components*i.byteLength;case $e:return s*t*4/i.components*i.byteLength;case no:return s*t*4/i.components*i.byteLength;case As:case Ps:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Cs:case Rs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case so:case oo:return Math.max(s,16)*Math.max(t,8)/4;case io:case ro:return Math.max(s,8)*Math.max(t,8)/2;case ao:case lo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ho:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case fo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case po:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case mo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case go:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case _o:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case yo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case vo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case xo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case bo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case So:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case To:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Is:case wo:case Eo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Da:case Ao:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Po:case Co:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pu(s){switch(s){case _n:case wa:return{byteLength:1,components:1};case Gi:case Ea:case Wi:return{byteLength:2,components:1};case jr:case Qr:return{byteLength:2,components:4};case Zn:case Kr:case yn:return{byteLength:4,components:1};case Aa:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hr);function rh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function mu(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],y=u[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,u[d]=y)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let y=u[p];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var gu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_u=`#ifdef USE_ALPHAHASH
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
#endif`,yu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mu=`#ifdef USE_AOMAP
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
#endif`,Su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tu=`#ifdef USE_BATCHING
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
#endif`,wu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Au=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cu=`#ifdef USE_IRIDESCENCE
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
#endif`,Ru=`#ifdef USE_BUMPMAP
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zu=`#define PI 3.141592653589793
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
} // validated`,Hu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ku=`vec3 transformedNormal = objectNormal;
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
#endif`,Vu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",qu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$u=`#ifdef USE_ENVMAP
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
#endif`,Zu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ju=`#ifdef USE_ENVMAP
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
#endif`,Ku=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
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
#endif`,Qu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,id=`#ifdef USE_GRADIENTMAP
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
}`,sd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ad=`uniform bool receiveShadow;
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
#endif`,ld=`#ifdef USE_ENVMAP
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
#endif`,cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fd=`PhysicalMaterial material;
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
#endif`,pd=`struct PhysicalMaterial {
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
}`,md=`
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
#endif`,gd=`#if defined( RE_IndirectDiffuse )
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
#endif`,_d=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Md=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Td=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wd=`#if defined( USE_POINTS_UV )
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
#endif`,Ed=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ad=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Id=`#ifdef USE_MORPHTARGETS
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
#endif`,Dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Od=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bd=`#ifdef USE_NORMALMAP
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
#endif`,zd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$d=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tf=`float getShadowMask() {
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
}`,ef=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nf=`#ifdef USE_SKINNING
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
#endif`,sf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rf=`#ifdef USE_SKINNING
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
#endif`,of=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,af=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hf=`#ifdef USE_TRANSMISSION
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
#endif`,uf=`#ifdef USE_TRANSMISSION
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
#endif`,df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_f=`uniform sampler2D t2D;
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
}`,yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mf=`#include <common>
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
}`,Sf=`#if DEPTH_PACKING == 3200
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
}`,Tf=`#define DISTANCE
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
}`,wf=`#define DISTANCE
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Af=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`uniform float scale;
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
}`,Cf=`uniform vec3 diffuse;
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
}`,Rf=`#include <common>
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
}`,If=`uniform vec3 diffuse;
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
}`,Df=`#define LAMBERT
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
}`,Lf=`#define LAMBERT
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
}`,Of=`#define MATCAP
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
}`,Uf=`#define MATCAP
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
}`,Nf=`#define NORMAL
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
}`,Ff=`#define NORMAL
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
}`,Bf=`#define PHONG
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
}`,zf=`#define PHONG
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
}`,Hf=`#define STANDARD
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
}`,kf=`#define STANDARD
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
}`,Vf=`#define TOON
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
}`,Gf=`#define TOON
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
}`,Wf=`uniform float size;
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
}`,Xf=`uniform vec3 diffuse;
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
}`,Yf=`#include <common>
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
}`,qf=`uniform vec3 color;
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
}`,$f=`uniform float rotation;
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
}`,Zf=`uniform vec3 diffuse;
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
}`,Nt={alphahash_fragment:gu,alphahash_pars_fragment:_u,alphamap_fragment:yu,alphamap_pars_fragment:vu,alphatest_fragment:xu,alphatest_pars_fragment:bu,aomap_fragment:Mu,aomap_pars_fragment:Su,batching_pars_vertex:Tu,batching_vertex:wu,begin_vertex:Eu,beginnormal_vertex:Au,bsdfs:Pu,iridescence_fragment:Cu,bumpmap_pars_fragment:Ru,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Du,clipping_planes_pars_vertex:Lu,clipping_planes_vertex:Ou,color_fragment:Uu,color_pars_fragment:Nu,color_pars_vertex:Fu,color_vertex:Bu,common:zu,cube_uv_reflection_fragment:Hu,defaultnormal_vertex:ku,displacementmap_pars_vertex:Vu,displacementmap_vertex:Gu,emissivemap_fragment:Wu,emissivemap_pars_fragment:Xu,colorspace_fragment:Yu,colorspace_pars_fragment:qu,envmap_fragment:$u,envmap_common_pars_fragment:Zu,envmap_pars_fragment:Ju,envmap_pars_vertex:Ku,envmap_physical_pars_fragment:ld,envmap_vertex:ju,fog_vertex:Qu,fog_pars_vertex:td,fog_fragment:ed,fog_pars_fragment:nd,gradientmap_pars_fragment:id,lightmap_pars_fragment:sd,lights_lambert_fragment:rd,lights_lambert_pars_fragment:od,lights_pars_begin:ad,lights_toon_fragment:cd,lights_toon_pars_fragment:hd,lights_phong_fragment:ud,lights_phong_pars_fragment:dd,lights_physical_fragment:fd,lights_physical_pars_fragment:pd,lights_fragment_begin:md,lights_fragment_maps:gd,lights_fragment_end:_d,logdepthbuf_fragment:yd,logdepthbuf_pars_fragment:vd,logdepthbuf_pars_vertex:xd,logdepthbuf_vertex:bd,map_fragment:Md,map_pars_fragment:Sd,map_particle_fragment:Td,map_particle_pars_fragment:wd,metalnessmap_fragment:Ed,metalnessmap_pars_fragment:Ad,morphinstance_vertex:Pd,morphcolor_vertex:Cd,morphnormal_vertex:Rd,morphtarget_pars_vertex:Id,morphtarget_vertex:Dd,normal_fragment_begin:Ld,normal_fragment_maps:Od,normal_pars_fragment:Ud,normal_pars_vertex:Nd,normal_vertex:Fd,normalmap_pars_fragment:Bd,clearcoat_normal_fragment_begin:zd,clearcoat_normal_fragment_maps:Hd,clearcoat_pars_fragment:kd,iridescence_pars_fragment:Vd,opaque_fragment:Gd,packing:Wd,premultiplied_alpha_fragment:Xd,project_vertex:Yd,dithering_fragment:qd,dithering_pars_fragment:$d,roughnessmap_fragment:Zd,roughnessmap_pars_fragment:Jd,shadowmap_pars_fragment:Kd,shadowmap_pars_vertex:jd,shadowmap_vertex:Qd,shadowmask_pars_fragment:tf,skinbase_vertex:ef,skinning_pars_vertex:nf,skinning_vertex:sf,skinnormal_vertex:rf,specularmap_fragment:of,specularmap_pars_fragment:af,tonemapping_fragment:lf,tonemapping_pars_fragment:cf,transmission_fragment:hf,transmission_pars_fragment:uf,uv_pars_fragment:df,uv_pars_vertex:ff,uv_vertex:pf,worldpos_vertex:mf,background_vert:gf,background_frag:_f,backgroundCube_vert:yf,backgroundCube_frag:vf,cube_vert:xf,cube_frag:bf,depth_vert:Mf,depth_frag:Sf,distanceRGBA_vert:Tf,distanceRGBA_frag:wf,equirect_vert:Ef,equirect_frag:Af,linedashed_vert:Pf,linedashed_frag:Cf,meshbasic_vert:Rf,meshbasic_frag:If,meshlambert_vert:Df,meshlambert_frag:Lf,meshmatcap_vert:Of,meshmatcap_frag:Uf,meshnormal_vert:Nf,meshnormal_frag:Ff,meshphong_vert:Bf,meshphong_frag:zf,meshphysical_vert:Hf,meshphysical_frag:kf,meshtoon_vert:Vf,meshtoon_frag:Gf,points_vert:Wf,points_frag:Xf,shadow_vert:Yf,shadow_frag:qf,sprite_vert:$f,sprite_frag:Zf},rt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},vn={basic:{uniforms:Te([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:Te([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:Te([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:Te([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:Te([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:Te([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:Te([rt.points,rt.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:Te([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:Te([rt.common,rt.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:Te([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:Te([rt.sprite,rt.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:Te([rt.common,rt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:Te([rt.lights,rt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};vn.physical={uniforms:Te([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};var Ro={r:0,b:0,g:0},pi=new ci,Jf=new me;function Kf(s,t,e,n,i,r,o){let a=new Vt(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?e:t).get(x)),x}function y(T){let x=!1,R=g(T);R===null?f(a,l):R&&R.isColor&&(f(R,1),x=!0);let C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(T,x){let R=g(x);R&&(R.isCubeTexture||R.mapping===ws)?(h===void 0&&(h=new Pe(new Hi(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:fi(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),pi.copy(x.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jf.makeRotationFromEuler(pi)),h.material.toneMapped=Wt.getTransfer(R.colorSpace)!==Zt,(u!==R||d!==R.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,p=s.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Pe(new Yn(2,2),new en({name:"BackgroundMaterial",uniforms:fi(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Wt.getTransfer(R.colorSpace)!==Zt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,p=s.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function f(T,x){T.getRGB(Ro,Fa(s)),n.buffers.color.setClear(Ro.r,Ro.g,Ro.b,x,o)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,x=1){a.set(T),l=x,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,f(a,l)},render:y,addToRenderList:m,dispose:w}}function jf(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(b,E,W,k,X){let $=!1,Y=u(k,W,E);r!==Y&&(r=Y,c(r.object)),$=p(b,k,W,X),$&&g(b,k,W,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,x(b,E,W,k),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return s.createVertexArray()}function c(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function u(b,E,W){let k=W.wireframe===!0,X=n[b.id];X===void 0&&(X={},n[b.id]=X);let $=X[E.id];$===void 0&&($={},X[E.id]=$);let Y=$[k];return Y===void 0&&(Y=d(l()),$[k]=Y),Y}function d(b){let E=[],W=[],k=[];for(let X=0;X<e;X++)E[X]=0,W[X]=0,k[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:W,attributeDivisors:k,object:b,attributes:{},index:null}}function p(b,E,W,k){let X=r.attributes,$=E.attributes,Y=0,Z=W.getAttributes();for(let z in Z)if(Z[z].location>=0){let ut=X[z],Mt=$[z];if(Mt===void 0&&(z==="instanceMatrix"&&b.instanceMatrix&&(Mt=b.instanceMatrix),z==="instanceColor"&&b.instanceColor&&(Mt=b.instanceColor)),ut===void 0||ut.attribute!==Mt||Mt&&ut.data!==Mt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==k}function g(b,E,W,k){let X={},$=E.attributes,Y=0,Z=W.getAttributes();for(let z in Z)if(Z[z].location>=0){let ut=$[z];ut===void 0&&(z==="instanceMatrix"&&b.instanceMatrix&&(ut=b.instanceMatrix),z==="instanceColor"&&b.instanceColor&&(ut=b.instanceColor));let Mt={};Mt.attribute=ut,ut&&ut.data&&(Mt.data=ut.data),X[z]=Mt,Y++}r.attributes=X,r.attributesNum=Y,r.index=k}function y(){let b=r.newAttributes;for(let E=0,W=b.length;E<W;E++)b[E]=0}function m(b){f(b,0)}function f(b,E){let W=r.newAttributes,k=r.enabledAttributes,X=r.attributeDivisors;W[b]=1,k[b]===0&&(s.enableVertexAttribArray(b),k[b]=1),X[b]!==E&&(s.vertexAttribDivisor(b,E),X[b]=E)}function w(){let b=r.newAttributes,E=r.enabledAttributes;for(let W=0,k=E.length;W<k;W++)E[W]!==b[W]&&(s.disableVertexAttribArray(W),E[W]=0)}function T(b,E,W,k,X,$,Y){Y===!0?s.vertexAttribIPointer(b,E,W,X,$):s.vertexAttribPointer(b,E,W,k,X,$)}function x(b,E,W,k){y();let X=k.attributes,$=W.getAttributes(),Y=E.defaultAttributeValues;for(let Z in $){let z=$[Z];if(z.location>=0){let ot=X[Z];if(ot===void 0&&(Z==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),Z==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor)),ot!==void 0){let ut=ot.normalized,Mt=ot.itemSize,Ft=t.get(ot);if(Ft===void 0)continue;let ie=Ft.buffer,Kt=Ft.type,G=Ft.bytesPerElement,at=Kt===s.INT||Kt===s.UNSIGNED_INT||ot.gpuType===Kr;if(ot.isInterleavedBufferAttribute){let nt=ot.data,Et=nt.stride,At=ot.offset;if(nt.isInstancedInterleavedBuffer){for(let It=0;It<z.locationSize;It++)f(z.location+It,nt.meshPerAttribute);b.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let It=0;It<z.locationSize;It++)m(z.location+It);s.bindBuffer(s.ARRAY_BUFFER,ie);for(let It=0;It<z.locationSize;It++)T(z.location+It,Mt/z.locationSize,Kt,ut,Et*G,(At+Mt/z.locationSize*It)*G,at)}else{if(ot.isInstancedBufferAttribute){for(let nt=0;nt<z.locationSize;nt++)f(z.location+nt,ot.meshPerAttribute);b.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let nt=0;nt<z.locationSize;nt++)m(z.location+nt);s.bindBuffer(s.ARRAY_BUFFER,ie);for(let nt=0;nt<z.locationSize;nt++)T(z.location+nt,Mt/z.locationSize,Kt,ut,Mt*G,Mt/z.locationSize*nt*G,at)}}else if(Y!==void 0){let ut=Y[Z];if(ut!==void 0)switch(ut.length){case 2:s.vertexAttrib2fv(z.location,ut);break;case 3:s.vertexAttrib3fv(z.location,ut);break;case 4:s.vertexAttrib4fv(z.location,ut);break;default:s.vertexAttrib1fv(z.location,ut)}}}}w()}function R(){O();for(let b in n){let E=n[b];for(let W in E){let k=E[W];for(let X in k)h(k[X].object),delete k[X];delete E[W]}delete n[b]}}function C(b){if(n[b.id]===void 0)return;let E=n[b.id];for(let W in E){let k=E[W];for(let X in k)h(k[X].object),delete k[X];delete E[W]}delete n[b.id]}function A(b){for(let E in n){let W=n[E];if(W[b.id]===void 0)continue;let k=W[b.id];for(let X in k)h(k[X].object),delete k[X];delete W[b.id]}}function O(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:O,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:w}}function Qf(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y]*d[y];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function tp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==$e&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let O=A===Wi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==_n&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==yn&&!O)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:R,maxSamples:C}}function ep(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Xe,a=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{let w=r?0:n,T=w*4,x=f.clippingState||null;l.value=x,x=h(g,d,T,p);for(let R=0;R!==T;++R)x[R]=e[R];f.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){let y=u!==null?u.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let f=p+y*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,x=p;T!==y;++T,x+=4)o.copy(u[T]).applyMatrix4(w,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function np(s){let t=new WeakMap;function e(o,a){return a===$r?o.mapping=ui:a===Zr&&(o.mapping=di),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===$r||a===Zr)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new wr(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Zi=4,Nc=[.125,.215,.35,.446,.526,.582],_i=20,Va=new Br,Fc=new Vt,Ga=null,Wa=0,Xa=0,Ya=!1,gi=(1+Math.sqrt(5))/2,$i=1/gi,Bc=[new N(-gi,$i,0),new N(gi,$i,0),new N(-$i,0,gi),new N($i,0,gi),new N(0,gi,-$i),new N(0,gi,$i),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],ip=new N,Lo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=ip}=r;Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),Xa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ga,Wa,Xa),this._renderer.xr.enabled=Ya,t.scissorTest=!1,Io(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ui||t.mapping===di?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),Xa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:Wi,format:$e,colorSpace:ai,depthBuffer:!1},i=zc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sp(r)),this._blurMaterial=rp(r,t,e)}return i}_compileMaterial(t){let e=new Pe(this._lodPlanes[0],t);this._renderer.compile(e,Va)}_sceneToCubeUV(t,e,n,i,r){let l=new Se(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Fc),u.toneMapping=Ln,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let y=new pn({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),m=new Pe(new Hi,y),f=!1,w=t.background;w?w.isColor&&(y.color.copy(w),t.background=null,f=!0):(y.color.copy(Fc),f=!0);for(let T=0;T<6;T++){let x=T%3;x===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):x===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let R=this._cubeSize;Io(i,x*R,T>2?R:0,R,R),u.setRenderTarget(i),f&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===ui||t.mapping===di;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hc());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Pe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Io(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Va)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Bc[(i-r-1)%Bc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Pe(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*_i-1),y=r/g,m=isFinite(r)?1+Math.floor(h*y):_i;m>_i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${_i}`);let f=[],w=0;for(let A=0;A<_i;++A){let O=A/y,M=Math.exp(-O*O/2);f.push(M),A===0?w+=M:A<m&&(w+=2*M)}for(let A=0;A<f.length;A++)f[A]=f[A]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-n;let x=this._sizeLods[i],R=3*x*(i>T-Zi?i-T+Zi:0),C=4*(this._cubeSize-x);Io(e,R,C,3*x,2*x),l.setRenderTarget(e),l.render(u,Va)}};function sp(s){let t=[],e=[],n=[],i=s,r=s-Zi+1+Nc.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Zi?l=Nc[o-s+Zi-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,y=3,m=2,f=1,w=new Float32Array(y*g*p),T=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let C=0;C<p;C++){let A=C%3*2/3-1,O=C>2?0:-1,M=[A,O,0,A+2/3,O,0,A+2/3,O+1,0,A,O,0,A+2/3,O+1,0,A,O+1,0];w.set(M,y*g*C),T.set(d,m*g*C);let b=[C,C,C,C,C,C];x.set(b,f*g*C)}let R=new Xn;R.setAttribute("position",new Fe(w,y)),R.setAttribute("uv",new Fe(T,m)),R.setAttribute("faceIndex",new Fe(x,f)),t.push(R),i>Zi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function zc(s,t,e){let n=new fn(s,t,e);return n.texture.mapping=ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Io(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function rp(s,t,e){let n=new Float32Array(_i),i=new N(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:nl(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Hc(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nl(),fragmentShader:`

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
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function kc(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function nl(){return`

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
	`}function op(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===$r||l===Zr,h=l===ui||l===di;if(c||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Lo(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Lo(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ap(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&li("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function lp(s,t,e,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let p in d)t.update(d[p],s.ARRAY_BUFFER)}function c(u){let d=[],p=u.index,g=u.attributes.position,y=0;if(p!==null){let w=p.array;y=p.version;for(let T=0,x=w.length;T<x;T+=3){let R=w[T+0],C=w[T+1],A=w[T+2];d.push(R,C,C,A,A,R)}}else if(g!==void 0){let w=g.array;y=g.version;for(let T=0,x=w.length/3-1;T<x;T+=3){let R=T+0,C=T+1,A=T+2;d.push(R,C,C,A,A,R)}}else return;let m=new(Na(d)?ps:fs)(d,1);m.version=y;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function cp(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){s.drawElements(n,p,r,d*o),e.update(p,n,1)}function c(d,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,d*o,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,y){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],y[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,y,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*y[w];e.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hp(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function up(s,t,e){let n=new WeakMap,i=new he;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){O.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var p=b;d!==void 0&&d.texture.dispose();let g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],x=0;g===!0&&(x=1),y===!0&&(x=2),m===!0&&(x=3);let R=a.attributes.position.count*x,C=1;R>t.maxTextureSize&&(C=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);let A=new Float32Array(R*C*4*u),O=new us(A,R,C,u);O.type=yn,O.needsUpdate=!0;let M=x*4;for(let E=0;E<u;E++){let W=f[E],k=w[E],X=T[E],$=R*C*4*E;for(let Y=0;Y<W.count;Y++){let Z=Y*M;g===!0&&(i.fromBufferAttribute(W,Y),A[$+Z+0]=i.x,A[$+Z+1]=i.y,A[$+Z+2]=i.z,A[$+Z+3]=0),y===!0&&(i.fromBufferAttribute(k,Y),A[$+Z+4]=i.x,A[$+Z+5]=i.y,A[$+Z+6]=i.z,A[$+Z+7]=0),m===!0&&(i.fromBufferAttribute(X,Y),A[$+Z+8]=i.x,A[$+Z+9]=i.y,A[$+Z+10]=i.z,A[$+Z+11]=X.itemSize===4?i.w:1)}}d={count:u,texture:O,size:new Xt(R,C)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];let y=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",y),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function dp(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var oh=new ze,Vc=new vs(1,1),ah=new us,lh=new Sr,ch=new gs,Gc=[],Wc=[],Xc=new Float32Array(16),Yc=new Float32Array(9),qc=new Float32Array(4);function Ki(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Gc[i];if(r===void 0&&(r=new Float32Array(i),Gc[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function ge(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function _e(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function No(s,t){let e=Wc[t];e===void 0&&(e=new Int32Array(t),Wc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function fp(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function pp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2fv(this.addr,t),_e(e,t)}}function mp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;s.uniform3fv(this.addr,t),_e(e,t)}}function gp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4fv(this.addr,t),_e(e,t)}}function _p(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;qc.set(n),s.uniformMatrix2fv(this.addr,!1,qc),_e(e,n)}}function yp(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;Yc.set(n),s.uniformMatrix3fv(this.addr,!1,Yc),_e(e,n)}}function vp(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;Xc.set(n),s.uniformMatrix4fv(this.addr,!1,Xc),_e(e,n)}}function xp(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function bp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2iv(this.addr,t),_e(e,t)}}function Mp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3iv(this.addr,t),_e(e,t)}}function Sp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4iv(this.addr,t),_e(e,t)}}function Tp(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function wp(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;s.uniform2uiv(this.addr,t),_e(e,t)}}function Ep(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;s.uniform3uiv(this.addr,t),_e(e,t)}}function Ap(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;s.uniform4uiv(this.addr,t),_e(e,t)}}function Pp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Vc.compareFunction=La,r=Vc):r=oh,e.setTexture2D(t||r,i)}function Cp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||lh,i)}function Rp(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ch,i)}function Ip(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||ah,i)}function Dp(s){switch(s){case 5126:return fp;case 35664:return pp;case 35665:return mp;case 35666:return gp;case 35674:return _p;case 35675:return yp;case 35676:return vp;case 5124:case 35670:return xp;case 35667:case 35671:return bp;case 35668:case 35672:return Mp;case 35669:case 35673:return Sp;case 5125:return Tp;case 36294:return wp;case 36295:return Ep;case 36296:return Ap;case 35678:case 36198:case 36298:case 36306:case 35682:return Pp;case 35679:case 36299:case 36307:return Cp;case 35680:case 36300:case 36308:case 36293:return Rp;case 36289:case 36303:case 36311:case 36292:return Ip}}function Lp(s,t){s.uniform1fv(this.addr,t)}function Op(s,t){let e=Ki(t,this.size,2);s.uniform2fv(this.addr,e)}function Up(s,t){let e=Ki(t,this.size,3);s.uniform3fv(this.addr,e)}function Np(s,t){let e=Ki(t,this.size,4);s.uniform4fv(this.addr,e)}function Fp(s,t){let e=Ki(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Bp(s,t){let e=Ki(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function zp(s,t){let e=Ki(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Hp(s,t){s.uniform1iv(this.addr,t)}function kp(s,t){s.uniform2iv(this.addr,t)}function Vp(s,t){s.uniform3iv(this.addr,t)}function Gp(s,t){s.uniform4iv(this.addr,t)}function Wp(s,t){s.uniform1uiv(this.addr,t)}function Xp(s,t){s.uniform2uiv(this.addr,t)}function Yp(s,t){s.uniform3uiv(this.addr,t)}function qp(s,t){s.uniform4uiv(this.addr,t)}function $p(s,t,e){let n=this.cache,i=t.length,r=No(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||oh,r[o])}function Zp(s,t,e){let n=this.cache,i=t.length,r=No(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||lh,r[o])}function Jp(s,t,e){let n=this.cache,i=t.length,r=No(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||ch,r[o])}function Kp(s,t,e){let n=this.cache,i=t.length,r=No(e,i);ge(n,r)||(s.uniform1iv(this.addr,r),_e(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||ah,r[o])}function jp(s){switch(s){case 5126:return Lp;case 35664:return Op;case 35665:return Up;case 35666:return Np;case 35674:return Fp;case 35675:return Bp;case 35676:return zp;case 5124:case 35670:return Hp;case 35667:case 35671:return kp;case 35668:case 35672:return Vp;case 35669:case 35673:return Gp;case 5125:return Wp;case 36294:return Xp;case 36295:return Yp;case 36296:return qp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Kp}}var $a=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Dp(e.type)}},Za=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jp(e.type)}},Ja=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},qa=/(\w+)(\])?(\[|\.)?/g;function $c(s,t){s.seq.push(t),s.map[t.id]=t}function Qp(s,t,e){let n=s.name,i=n.length;for(qa.lastIndex=0;;){let r=qa.exec(n),o=qa.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){$c(e,c===void 0?new $a(a,s,t):new Za(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Ja(a),$c(e,u)),e=u}}}var Ji=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Qp(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Zc(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var tm=37297,em=0;function nm(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Jc=new Lt;function im(s){Wt._getMatrix(Jc,Wt.workingColorSpace,s);let t=`mat3( ${Jc.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(s)){case cs:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Kc(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+nm(s.getShaderSource(t),a)}else return r}function sm(s,t){let e=im(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rm(s,t){let e;switch(t){case dc:e="Linear";break;case fc:e="Reinhard";break;case pc:e="Cineon";break;case mc:e="ACESFilmic";break;case _c:e="AgX";break;case yc:e="Neutral";break;case gc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Do=new N;function om(){Wt.getLuminanceCoefficients(Do);let s=Do.x.toFixed(4),t=Do.y.toFixed(4),e=Do.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function am(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function lm(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cm(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ds(s){return s!==""}function jc(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var hm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(s){return s.replace(hm,dm)}var um=new Map;function dm(s,t){let e=Nt[t];if(e===void 0){let n=um.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ka(e)}var fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function th(s){return s.replace(fm,pm)}function pm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function eh(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function mm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===xa?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===mn&&(t="SHADOWMAP_TYPE_VSM"),t}function gm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ui:case di:t="ENVMAP_TYPE_CUBE";break;case ws:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _m(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case di:t="ENVMAP_MODE_REFRACTION";break}return t}function ym(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ta:t="ENVMAP_BLENDING_MULTIPLY";break;case hc:t="ENVMAP_BLENDING_MIX";break;case uc:t="ENVMAP_BLENDING_ADD";break}return t}function vm(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function xm(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=mm(e),c=gm(e),h=_m(e),u=ym(e),d=vm(e),p=am(e),g=lm(r),y=i.createProgram(),m,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),f.length>0&&(f+=`
`)):(m=[eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),f=[eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?Nt.tonemapping_pars_fragment:"",e.toneMapping!==Ln?rm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,sm("linearToOutputTexel",e.outputColorSpace),om(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),o=Ka(o),o=jc(o,e),o=Qc(o,e),a=Ka(a),a=jc(a,e),a=Qc(a,e),o=th(o),a=th(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Oa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Oa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let T=w+m+o,x=w+f+a,R=Zc(i,i.VERTEX_SHADER,T),C=Zc(i,i.FRAGMENT_SHADER,x);i.attachShader(y,R),i.attachShader(y,C),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function A(E){if(s.debug.checkShaderErrors){let W=i.getProgramInfoLog(y)||"",k=i.getShaderInfoLog(R)||"",X=i.getShaderInfoLog(C)||"",$=W.trim(),Y=k.trim(),Z=X.trim(),z=!0,ot=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,R,C);else{let ut=Kc(i,R,"vertex"),Mt=Kc(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+$+`
`+ut+`
`+Mt)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(Y===""||Z==="")&&(ot=!1);ot&&(E.diagnostics={runnable:z,programLog:$,vertexShader:{log:Y,prefix:m},fragmentShader:{log:Z,prefix:f}})}i.deleteShader(R),i.deleteShader(C),O=new Ji(i,y),M=cm(i,y)}let O;this.getUniforms=function(){return O===void 0&&A(this),O};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(y,tm)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=em++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=C,this}var bm=0,ja=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Qa(t),e.set(t,n)),n}},Qa=class{constructor(t){this.id=bm++,this.code=t,this.usedTimes=0}};function Mm(s,t,e,n,i,r,o){let a=new zi,l=new ja,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,b,E,W,k){let X=W.fog,$=k.geometry,Y=M.isMeshStandardMaterial?W.environment:null,Z=(M.isMeshStandardMaterial?e:t).get(M.envMap||Y),z=Z&&Z.mapping===ws?Z.image.height:null,ot=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));let ut=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Mt=ut!==void 0?ut.length:0,Ft=0;$.morphAttributes.position!==void 0&&(Ft=1),$.morphAttributes.normal!==void 0&&(Ft=2),$.morphAttributes.color!==void 0&&(Ft=3);let ie,Kt,G,at;if(ot){let $t=vn[ot];ie=$t.vertexShader,Kt=$t.fragmentShader}else ie=M.vertexShader,Kt=M.fragmentShader,l.update(M),G=l.getVertexShaderID(M),at=l.getFragmentShaderID(M);let nt=s.getRenderTarget(),Et=s.state.buffers.depth.getReversed(),At=k.isInstancedMesh===!0,It=k.isBatchedMesh===!0,ue=!!M.map,Gt=!!M.matcap,P=!!Z,te=!!M.aoMap,Tt=!!M.lightMap,qt=!!M.bumpMap,bt=!!M.normalMap,se=!!M.displacementMap,pt=!!M.emissiveMap,Bt=!!M.metalnessMap,ye=!!M.roughnessMap,de=M.anisotropy>0,S=M.clearcoat>0,_=M.dispersion>0,U=M.iridescence>0,V=M.sheen>0,J=M.transmission>0,H=de&&!!M.anisotropyMap,xt=S&&!!M.clearcoatMap,et=S&&!!M.clearcoatNormalMap,_t=S&&!!M.clearcoatRoughnessMap,yt=U&&!!M.iridescenceMap,Q=U&&!!M.iridescenceThicknessMap,ht=V&&!!M.sheenColorMap,Ct=V&&!!M.sheenRoughnessMap,vt=!!M.specularMap,lt=!!M.specularColorMap,Ot=!!M.specularIntensityMap,I=J&&!!M.transmissionMap,tt=J&&!!M.thicknessMap,it=!!M.gradientMap,ft=!!M.alphaMap,K=M.alphaTest>0,q=!!M.alphaHash,gt=!!M.extensions,Dt=Ln;M.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Dt=s.toneMapping);let ee={shaderID:ot,shaderType:M.type,shaderName:M.name,vertexShader:ie,fragmentShader:Kt,defines:M.defines,customVertexShaderID:G,customFragmentShaderID:at,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:It,batchingColor:It&&k._colorsTexture!==null,instancing:At,instancingColor:At&&k.instanceColor!==null,instancingMorph:At&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:nt===null?s.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:ai,alphaToCoverage:!!M.alphaToCoverage,map:ue,matcap:Gt,envMap:P,envMapMode:P&&Z.mapping,envMapCubeUVHeight:z,aoMap:te,lightMap:Tt,bumpMap:qt,normalMap:bt,displacementMap:d&&se,emissiveMap:pt,normalMapObjectSpace:bt&&M.normalMapType===Sc,normalMapTangentSpace:bt&&M.normalMapType===Mc,metalnessMap:Bt,roughnessMap:ye,anisotropy:de,anisotropyMap:H,clearcoat:S,clearcoatMap:xt,clearcoatNormalMap:et,clearcoatRoughnessMap:_t,dispersion:_,iridescence:U,iridescenceMap:yt,iridescenceThicknessMap:Q,sheen:V,sheenColorMap:ht,sheenRoughnessMap:Ct,specularMap:vt,specularColorMap:lt,specularIntensityMap:Ot,transmission:J,transmissionMap:I,thicknessMap:tt,gradientMap:it,opaque:M.transparent===!1&&M.blending===ri&&M.alphaToCoverage===!1,alphaMap:ft,alphaTest:K,alphaHash:q,combine:M.combine,mapUv:ue&&y(M.map.channel),aoMapUv:te&&y(M.aoMap.channel),lightMapUv:Tt&&y(M.lightMap.channel),bumpMapUv:qt&&y(M.bumpMap.channel),normalMapUv:bt&&y(M.normalMap.channel),displacementMapUv:se&&y(M.displacementMap.channel),emissiveMapUv:pt&&y(M.emissiveMap.channel),metalnessMapUv:Bt&&y(M.metalnessMap.channel),roughnessMapUv:ye&&y(M.roughnessMap.channel),anisotropyMapUv:H&&y(M.anisotropyMap.channel),clearcoatMapUv:xt&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:et&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&y(M.sheenRoughnessMap.channel),specularMapUv:vt&&y(M.specularMap.channel),specularColorMapUv:lt&&y(M.specularColorMap.channel),specularIntensityMapUv:Ot&&y(M.specularIntensityMap.channel),transmissionMapUv:I&&y(M.transmissionMap.channel),thicknessMapUv:tt&&y(M.thicknessMap.channel),alphaMapUv:ft&&y(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(bt||de),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!$.attributes.uv&&(ue||ft),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Et,skinning:k.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:Ft,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&E.length>0,shadowMapType:s.shadowMap.type,toneMapping:Dt,decodeVideoTexture:ue&&M.map.isVideoTexture===!0&&Wt.getTransfer(M.map.colorSpace)===Zt,decodeVideoTextureEmissive:pt&&M.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(M.emissiveMap.colorSpace)===Zt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===gn,flipSided:M.side===Ce,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:gt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&M.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ee.vertexUv1s=c.has(1),ee.vertexUv2s=c.has(2),ee.vertexUv3s=c.has(3),c.clear(),ee}function f(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let E in M.defines)b.push(E),b.push(M.defines[E]);return M.isRawShaderMaterial===!1&&(w(b,M),T(b,M),b.push(s.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function w(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function T(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){let b=g[M.type],E;if(b){let W=vn[b];E=Oc.clone(W.uniforms)}else E=M.uniforms;return E}function R(M,b){let E;for(let W=0,k=h.length;W<k;W++){let X=h[W];if(X.cacheKey===b){E=X,++E.usedTimes;break}}return E===void 0&&(E=new xm(s,b,M,r),h.push(E)),E}function C(M){if(--M.usedTimes===0){let b=h.indexOf(M);h[b]=h[h.length-1],h.pop(),M.destroy()}}function A(M){l.remove(M)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:R,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:O}}function Sm(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Tm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function nh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ih(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,p,g,y,m){let f=s[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},s[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=y,f.group=m),t++,f}function a(u,d,p,g,y,m){let f=o(u,d,p,g,y,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(u,d,p,g,y,m){let f=o(u,d,p,g,y,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||Tm),n.length>1&&n.sort(d||nh),i.length>1&&i.sort(d||nh)}function h(){for(let u=t,d=s.length;u<d;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function wm(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new ih,s.set(n,[o])):i>=r.length?(o=new ih,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Em(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Vt};break;case"SpotLight":e={position:new N,direction:new N,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new N,halfWidth:new N,halfHeight:new N};break}return s[t.id]=e,e}}}function Am(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Pm=0;function Cm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Rm(s){let t=new Em,e=Am(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let i=new N,r=new me,o=new me;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let p=0,g=0,y=0,m=0,f=0,w=0,T=0,x=0,R=0,C=0,A=0;c.sort(Cm);for(let M=0,b=c.length;M<b;M++){let E=c[M],W=E.color,k=E.intensity,X=E.distance,$=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=W.r*k,u+=W.g*k,d+=W.b*k;else if(E.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(E.sh.coefficients[Y],k);A++}else if(E.isDirectionalLight){let Y=t.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){let Z=E.shadow,z=e.get(E);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,n.directionalShadow[p]=z,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=E.shadow.matrix,w++}n.directional[p]=Y,p++}else if(E.isSpotLight){let Y=t.get(E);Y.position.setFromMatrixPosition(E.matrixWorld),Y.color.copy(W).multiplyScalar(k),Y.distance=X,Y.coneCos=Math.cos(E.angle),Y.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),Y.decay=E.decay,n.spot[y]=Y;let Z=E.shadow;if(E.map&&(n.spotLightMap[R]=E.map,R++,Z.updateMatrices(E),E.castShadow&&C++),n.spotLightMatrix[y]=Z.matrix,E.castShadow){let z=e.get(E);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,n.spotShadow[y]=z,n.spotShadowMap[y]=$,x++}y++}else if(E.isRectAreaLight){let Y=t.get(E);Y.color.copy(W).multiplyScalar(k),Y.halfWidth.set(E.width*.5,0,0),Y.halfHeight.set(0,E.height*.5,0),n.rectArea[m]=Y,m++}else if(E.isPointLight){let Y=t.get(E);if(Y.color.copy(E.color).multiplyScalar(E.intensity),Y.distance=E.distance,Y.decay=E.decay,E.castShadow){let Z=E.shadow,z=e.get(E);z.shadowIntensity=Z.intensity,z.shadowBias=Z.bias,z.shadowNormalBias=Z.normalBias,z.shadowRadius=Z.radius,z.shadowMapSize=Z.mapSize,z.shadowCameraNear=Z.camera.near,z.shadowCameraFar=Z.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=E.shadow.matrix,T++}n.point[g]=Y,g++}else if(E.isHemisphereLight){let Y=t.get(E);Y.skyColor.copy(E.color).multiplyScalar(k),Y.groundColor.copy(E.groundColor).multiplyScalar(k),n.hemi[f]=Y,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let O=n.hash;(O.directionalLength!==p||O.pointLength!==g||O.spotLength!==y||O.rectAreaLength!==m||O.hemiLength!==f||O.numDirectionalShadows!==w||O.numPointShadows!==T||O.numSpotShadows!==x||O.numSpotMaps!==R||O.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,O.directionalLength=p,O.pointLength=g,O.spotLength=y,O.rectAreaLength=m,O.hemiLength=f,O.numDirectionalShadows=w,O.numPointShadows=T,O.numSpotShadows=x,O.numSpotMaps=R,O.numLightProbes=A,n.version=Pm++)}function l(c,h){let u=0,d=0,p=0,g=0,y=0,m=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){let T=c[f];if(T.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(T.isSpotLight){let x=n.spot[p];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(T.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:n}}function sh(s){let t=new Rm(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Im(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new sh(s),t.set(i,[a])):r>=o.length?(a=new sh(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Dm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lm=`uniform sampler2D shadow_pass;
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
}`;function Om(s,t,e){let n=new ys,i=new Xt,r=new Xt,o=new he,a=new Er({depthPacking:bc}),l=new Ar,c={},h=e.maxTextureSize,u={[Cn]:Ce,[Ce]:Cn,[gn]:gn},d=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:Dm,fragmentShader:Lm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Xn;g.setAttribute("position",new Fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Pe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xa;let f=this.type;this.render=function(C,A,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let M=s.getRenderTarget(),b=s.getActiveCubeFace(),E=s.getActiveMipmapLevel(),W=s.state;W.setBlending(Dn),W.buffers.depth.getReversed()?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);let k=f!==mn&&this.type===mn,X=f===mn&&this.type!==mn;for(let $=0,Y=C.length;$<Y;$++){let Z=C[$],z=Z.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);let ot=z.getFrameExtents();if(i.multiply(ot),r.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ot.x),i.x=r.x*ot.x,z.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ot.y),i.y=r.y*ot.y,z.mapSize.y=r.y)),z.map===null||k===!0||X===!0){let Mt=this.type!==mn?{minFilter:Ye,magFilter:Ye}:{};z.map!==null&&z.map.dispose(),z.map=new fn(i.x,i.y,Mt),z.map.texture.name=Z.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();let ut=z.getViewportCount();for(let Mt=0;Mt<ut;Mt++){let Ft=z.getViewport(Mt);o.set(r.x*Ft.x,r.y*Ft.y,r.x*Ft.z,r.y*Ft.w),W.viewport(o),z.updateMatrices(Z,Mt),n=z.getFrustum(),x(A,O,z.camera,Z,this.type)}z.isPointLightShadow!==!0&&this.type===mn&&w(z,O),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,b,E)};function w(C,A){let O=t.update(y);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new fn(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(A,null,O,d,y,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(A,null,O,p,y,null)}function T(C,A,O,M){let b=null,E=O.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(E!==void 0)b=E;else if(b=O.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let W=b.uuid,k=A.uuid,X=c[W];X===void 0&&(X={},c[W]=X);let $=X[k];$===void 0&&($=b.clone(),X[k]=$,A.addEventListener("dispose",R)),b=$}if(b.visible=A.visible,b.wireframe=A.wireframe,M===mn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,O.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let W=s.properties.get(b);W.light=O}return b}function x(C,A,O,M,b){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&b===mn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,C.matrixWorld);let k=t.update(C),X=C.material;if(Array.isArray(X)){let $=k.groups;for(let Y=0,Z=$.length;Y<Z;Y++){let z=$[Y],ot=X[z.materialIndex];if(ot&&ot.visible){let ut=T(C,ot,M,b);C.onBeforeShadow(s,C,A,O,k,ut,z),s.renderBufferDirect(O,null,k,ut,C,z),C.onAfterShadow(s,C,A,O,k,ut,z)}}}else if(X.visible){let $=T(C,X,M,b);C.onBeforeShadow(s,C,A,O,k,$,null),s.renderBufferDirect(O,null,k,$,C,null),C.onAfterShadow(s,C,A,O,k,$,null)}}let W=C.children;for(let k=0,X=W.length;k<X;k++)x(W[k],A,O,M,b)}function R(C){C.target.removeEventListener("dispose",R);for(let O in c){let M=c[O],b=C.target.uuid;b in M&&(M[b].dispose(),delete M[b])}}}var Um={[kr]:Vr,[Gr]:Yr,[Wr]:qr,[oi]:Xr,[Vr]:kr,[Yr]:Gr,[qr]:Wr,[Xr]:oi};function Nm(s,t){function e(){let I=!1,tt=new he,it=null,ft=new he(0,0,0,0);return{setMask:function(K){it!==K&&!I&&(s.colorMask(K,K,K,K),it=K)},setLocked:function(K){I=K},setClear:function(K,q,gt,Dt,ee){ee===!0&&(K*=Dt,q*=Dt,gt*=Dt),tt.set(K,q,gt,Dt),ft.equals(tt)===!1&&(s.clearColor(K,q,gt,Dt),ft.copy(tt))},reset:function(){I=!1,it=null,ft.set(-1,0,0,0)}}}function n(){let I=!1,tt=!1,it=null,ft=null,K=null;return{setReversed:function(q){if(tt!==q){let gt=t.get("EXT_clip_control");q?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),tt=q;let Dt=K;K=null,this.setClear(Dt)}},getReversed:function(){return tt},setTest:function(q){q?nt(s.DEPTH_TEST):Et(s.DEPTH_TEST)},setMask:function(q){it!==q&&!I&&(s.depthMask(q),it=q)},setFunc:function(q){if(tt&&(q=Um[q]),ft!==q){switch(q){case kr:s.depthFunc(s.NEVER);break;case Vr:s.depthFunc(s.ALWAYS);break;case Gr:s.depthFunc(s.LESS);break;case oi:s.depthFunc(s.LEQUAL);break;case Wr:s.depthFunc(s.EQUAL);break;case Xr:s.depthFunc(s.GEQUAL);break;case Yr:s.depthFunc(s.GREATER);break;case qr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ft=q}},setLocked:function(q){I=q},setClear:function(q){K!==q&&(tt&&(q=1-q),s.clearDepth(q),K=q)},reset:function(){I=!1,it=null,ft=null,K=null,tt=!1}}}function i(){let I=!1,tt=null,it=null,ft=null,K=null,q=null,gt=null,Dt=null,ee=null;return{setTest:function($t){I||($t?nt(s.STENCIL_TEST):Et(s.STENCIL_TEST))},setMask:function($t){tt!==$t&&!I&&(s.stencilMask($t),tt=$t)},setFunc:function($t,xn,sn){(it!==$t||ft!==xn||K!==sn)&&(s.stencilFunc($t,xn,sn),it=$t,ft=xn,K=sn)},setOp:function($t,xn,sn){(q!==$t||gt!==xn||Dt!==sn)&&(s.stencilOp($t,xn,sn),q=$t,gt=xn,Dt=sn)},setLocked:function($t){I=$t},setClear:function($t){ee!==$t&&(s.clearStencil($t),ee=$t)},reset:function(){I=!1,tt=null,it=null,ft=null,K=null,q=null,gt=null,Dt=null,ee=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,y=!1,m=null,f=null,w=null,T=null,x=null,R=null,C=null,A=new Vt(0,0,0),O=0,M=!1,b=null,E=null,W=null,k=null,X=null,$=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,Z=0,z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(z)[1]),Y=Z>=1):z.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),Y=Z>=2);let ot=null,ut={},Mt=s.getParameter(s.SCISSOR_BOX),Ft=s.getParameter(s.VIEWPORT),ie=new he().fromArray(Mt),Kt=new he().fromArray(Ft);function G(I,tt,it,ft){let K=new Uint8Array(4),q=s.createTexture();s.bindTexture(I,q),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let gt=0;gt<it;gt++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(tt,0,s.RGBA,1,1,ft,0,s.RGBA,s.UNSIGNED_BYTE,K):s.texImage2D(tt+gt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,K);return q}let at={};at[s.TEXTURE_2D]=G(s.TEXTURE_2D,s.TEXTURE_2D,1),at[s.TEXTURE_CUBE_MAP]=G(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),at[s.TEXTURE_2D_ARRAY]=G(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),at[s.TEXTURE_3D]=G(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(s.DEPTH_TEST),o.setFunc(oi),qt(!1),bt(va),nt(s.CULL_FACE),te(Dn);function nt(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Et(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function At(I,tt){return u[I]!==tt?(s.bindFramebuffer(I,tt),u[I]=tt,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=tt),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=tt),!0):!1}function It(I,tt){let it=p,ft=!1;if(I){it=d.get(tt),it===void 0&&(it=[],d.set(tt,it));let K=I.textures;if(it.length!==K.length||it[0]!==s.COLOR_ATTACHMENT0){for(let q=0,gt=K.length;q<gt;q++)it[q]=s.COLOR_ATTACHMENT0+q;it.length=K.length,ft=!0}}else it[0]!==s.BACK&&(it[0]=s.BACK,ft=!0);ft&&s.drawBuffers(it)}function ue(I){return g!==I?(s.useProgram(I),g=I,!0):!1}let Gt={[Gn]:s.FUNC_ADD,[ql]:s.FUNC_SUBTRACT,[$l]:s.FUNC_REVERSE_SUBTRACT};Gt[Zl]=s.MIN,Gt[Jl]=s.MAX;let P={[Kl]:s.ZERO,[jl]:s.ONE,[Ql]:s.SRC_COLOR,[gr]:s.SRC_ALPHA,[rc]:s.SRC_ALPHA_SATURATE,[ic]:s.DST_COLOR,[ec]:s.DST_ALPHA,[tc]:s.ONE_MINUS_SRC_COLOR,[_r]:s.ONE_MINUS_SRC_ALPHA,[sc]:s.ONE_MINUS_DST_COLOR,[nc]:s.ONE_MINUS_DST_ALPHA,[oc]:s.CONSTANT_COLOR,[ac]:s.ONE_MINUS_CONSTANT_COLOR,[lc]:s.CONSTANT_ALPHA,[cc]:s.ONE_MINUS_CONSTANT_ALPHA};function te(I,tt,it,ft,K,q,gt,Dt,ee,$t){if(I===Dn){y===!0&&(Et(s.BLEND),y=!1);return}if(y===!1&&(nt(s.BLEND),y=!0),I!==Yl){if(I!==m||$t!==M){if((f!==Gn||x!==Gn)&&(s.blendEquation(s.FUNC_ADD),f=Gn,x=Gn),$t)switch(I){case ri:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ba:s.blendFunc(s.ONE,s.ONE);break;case Ma:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sa:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case ri:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ba:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ma:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}w=null,T=null,R=null,C=null,A.set(0,0,0),O=0,m=I,M=$t}return}K=K||tt,q=q||it,gt=gt||ft,(tt!==f||K!==x)&&(s.blendEquationSeparate(Gt[tt],Gt[K]),f=tt,x=K),(it!==w||ft!==T||q!==R||gt!==C)&&(s.blendFuncSeparate(P[it],P[ft],P[q],P[gt]),w=it,T=ft,R=q,C=gt),(Dt.equals(A)===!1||ee!==O)&&(s.blendColor(Dt.r,Dt.g,Dt.b,ee),A.copy(Dt),O=ee),m=I,M=!1}function Tt(I,tt){I.side===gn?Et(s.CULL_FACE):nt(s.CULL_FACE);let it=I.side===Ce;tt&&(it=!it),qt(it),I.blending===ri&&I.transparent===!1?te(Dn):te(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);let ft=I.stencilWrite;a.setTest(ft),ft&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?nt(s.SAMPLE_ALPHA_TO_COVERAGE):Et(s.SAMPLE_ALPHA_TO_COVERAGE)}function qt(I){b!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),b=I)}function bt(I){I!==Gl?(nt(s.CULL_FACE),I!==E&&(I===va?s.cullFace(s.BACK):I===Wl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Et(s.CULL_FACE),E=I}function se(I){I!==W&&(Y&&s.lineWidth(I),W=I)}function pt(I,tt,it){I?(nt(s.POLYGON_OFFSET_FILL),(k!==tt||X!==it)&&(s.polygonOffset(tt,it),k=tt,X=it)):Et(s.POLYGON_OFFSET_FILL)}function Bt(I){I?nt(s.SCISSOR_TEST):Et(s.SCISSOR_TEST)}function ye(I){I===void 0&&(I=s.TEXTURE0+$-1),ot!==I&&(s.activeTexture(I),ot=I)}function de(I,tt,it){it===void 0&&(ot===null?it=s.TEXTURE0+$-1:it=ot);let ft=ut[it];ft===void 0&&(ft={type:void 0,texture:void 0},ut[it]=ft),(ft.type!==I||ft.texture!==tt)&&(ot!==it&&(s.activeTexture(it),ot=it),s.bindTexture(I,tt||at[I]),ft.type=I,ft.texture=tt)}function S(){let I=ut[ot];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function U(){try{s.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function V(){try{s.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{s.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{s.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _t(){try{s.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(){try{s.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{s.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ht(I){ie.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),ie.copy(I))}function Ct(I){Kt.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),Kt.copy(I))}function vt(I,tt){let it=c.get(tt);it===void 0&&(it=new WeakMap,c.set(tt,it));let ft=it.get(I);ft===void 0&&(ft=s.getUniformBlockIndex(tt,I.name),it.set(I,ft))}function lt(I,tt){let ft=c.get(tt).get(I);l.get(tt)!==ft&&(s.uniformBlockBinding(tt,ft,I.__bindingPointIndex),l.set(tt,ft))}function Ot(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ot=null,ut={},u={},d=new WeakMap,p=[],g=null,y=!1,m=null,f=null,w=null,T=null,x=null,R=null,C=null,A=new Vt(0,0,0),O=0,M=!1,b=null,E=null,W=null,k=null,X=null,ie.set(0,0,s.canvas.width,s.canvas.height),Kt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:Et,bindFramebuffer:At,drawBuffers:It,useProgram:ue,setBlending:te,setMaterial:Tt,setFlipSided:qt,setCullFace:bt,setLineWidth:se,setPolygonOffset:pt,setScissorTest:Bt,activeTexture:ye,bindTexture:de,unbindTexture:S,compressedTexImage2D:_,compressedTexImage3D:U,texImage2D:yt,texImage3D:Q,updateUBOMapping:vt,uniformBlockBinding:lt,texStorage2D:et,texStorage3D:_t,texSubImage2D:V,texSubImage3D:J,compressedTexSubImage2D:H,compressedTexSubImage3D:xt,scissor:ht,viewport:Ct,reset:Ot}}function Fm(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xt,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,_){return p?new OffscreenCanvas(S,_):Ni("canvas")}function y(S,_,U){let V=1,J=de(S);if((J.width>U||J.height>U)&&(V=U/Math.max(J.width,J.height)),V<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let H=Math.floor(V*J.width),xt=Math.floor(V*J.height);u===void 0&&(u=g(H,xt));let et=_?g(H,xt):u;return et.width=H,et.height=xt,et.getContext("2d").drawImage(S,0,0,H,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+H+"x"+xt+")."),et}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),S;return S}function m(S){return S.generateMipmaps}function f(S){s.generateMipmap(S)}function w(S){return S.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?s.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(S,_,U,V,J=!1){if(S!==null){if(s[S]!==void 0)return s[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let H=_;if(_===s.RED&&(U===s.FLOAT&&(H=s.R32F),U===s.HALF_FLOAT&&(H=s.R16F),U===s.UNSIGNED_BYTE&&(H=s.R8)),_===s.RED_INTEGER&&(U===s.UNSIGNED_BYTE&&(H=s.R8UI),U===s.UNSIGNED_SHORT&&(H=s.R16UI),U===s.UNSIGNED_INT&&(H=s.R32UI),U===s.BYTE&&(H=s.R8I),U===s.SHORT&&(H=s.R16I),U===s.INT&&(H=s.R32I)),_===s.RG&&(U===s.FLOAT&&(H=s.RG32F),U===s.HALF_FLOAT&&(H=s.RG16F),U===s.UNSIGNED_BYTE&&(H=s.RG8)),_===s.RG_INTEGER&&(U===s.UNSIGNED_BYTE&&(H=s.RG8UI),U===s.UNSIGNED_SHORT&&(H=s.RG16UI),U===s.UNSIGNED_INT&&(H=s.RG32UI),U===s.BYTE&&(H=s.RG8I),U===s.SHORT&&(H=s.RG16I),U===s.INT&&(H=s.RG32I)),_===s.RGB_INTEGER&&(U===s.UNSIGNED_BYTE&&(H=s.RGB8UI),U===s.UNSIGNED_SHORT&&(H=s.RGB16UI),U===s.UNSIGNED_INT&&(H=s.RGB32UI),U===s.BYTE&&(H=s.RGB8I),U===s.SHORT&&(H=s.RGB16I),U===s.INT&&(H=s.RGB32I)),_===s.RGBA_INTEGER&&(U===s.UNSIGNED_BYTE&&(H=s.RGBA8UI),U===s.UNSIGNED_SHORT&&(H=s.RGBA16UI),U===s.UNSIGNED_INT&&(H=s.RGBA32UI),U===s.BYTE&&(H=s.RGBA8I),U===s.SHORT&&(H=s.RGBA16I),U===s.INT&&(H=s.RGBA32I)),_===s.RGB&&U===s.UNSIGNED_INT_5_9_9_9_REV&&(H=s.RGB9_E5),_===s.RGBA){let xt=J?cs:Wt.getTransfer(V);U===s.FLOAT&&(H=s.RGBA32F),U===s.HALF_FLOAT&&(H=s.RGBA16F),U===s.UNSIGNED_BYTE&&(H=xt===Zt?s.SRGB8_ALPHA8:s.RGBA8),U===s.UNSIGNED_SHORT_4_4_4_4&&(H=s.RGBA4),U===s.UNSIGNED_SHORT_5_5_5_1&&(H=s.RGB5_A1)}return(H===s.R16F||H===s.R32F||H===s.RG16F||H===s.RG32F||H===s.RGBA16F||H===s.RGBA32F)&&t.get("EXT_color_buffer_float"),H}function x(S,_){let U;return S?_===null||_===Zn||_===Xi?U=s.DEPTH24_STENCIL8:_===yn?U=s.DEPTH32F_STENCIL8:_===Gi&&(U=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Zn||_===Xi?U=s.DEPTH_COMPONENT24:_===yn?U=s.DEPTH_COMPONENT32F:_===Gi&&(U=s.DEPTH_COMPONENT16),U}function R(S,_){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==Ye&&S.minFilter!==De?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function C(S){let _=S.target;_.removeEventListener("dispose",C),O(_),_.isVideoTexture&&h.delete(_)}function A(S){let _=S.target;_.removeEventListener("dispose",A),b(_)}function O(S){let _=n.get(S);if(_.__webglInit===void 0)return;let U=S.source,V=d.get(U);if(V){let J=V[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&M(S),Object.keys(V).length===0&&d.delete(U)}n.remove(S)}function M(S){let _=n.get(S);s.deleteTexture(_.__webglTexture);let U=S.source,V=d.get(U);delete V[_.__cacheKey],o.memory.textures--}function b(S){let _=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let J=0;J<_.__webglFramebuffer[V].length;J++)s.deleteFramebuffer(_.__webglFramebuffer[V][J]);else s.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)s.deleteFramebuffer(_.__webglFramebuffer[V]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let U=S.textures;for(let V=0,J=U.length;V<J;V++){let H=n.get(U[V]);H.__webglTexture&&(s.deleteTexture(H.__webglTexture),o.memory.textures--),n.remove(U[V])}n.remove(S)}let E=0;function W(){E=0}function k(){let S=E;return S>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+i.maxTextures),E+=1,S}function X(S){let _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function $(S,_){let U=n.get(S);if(S.isVideoTexture&&Bt(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&U.__version!==S.version){let V=S.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(U,S,_);return}}else S.isExternalTexture&&(U.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,U.__webglTexture,s.TEXTURE0+_)}function Y(S,_){let U=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&U.__version!==S.version){at(U,S,_);return}e.bindTexture(s.TEXTURE_2D_ARRAY,U.__webglTexture,s.TEXTURE0+_)}function Z(S,_){let U=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&U.__version!==S.version){at(U,S,_);return}e.bindTexture(s.TEXTURE_3D,U.__webglTexture,s.TEXTURE0+_)}function z(S,_){let U=n.get(S);if(S.version>0&&U.__version!==S.version){nt(U,S,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+_)}let ot={[yr]:s.REPEAT,[Qe]:s.CLAMP_TO_EDGE,[vr]:s.MIRRORED_REPEAT},ut={[Ye]:s.NEAREST,[vc]:s.NEAREST_MIPMAP_NEAREST,[Es]:s.NEAREST_MIPMAP_LINEAR,[De]:s.LINEAR,[Jr]:s.LINEAR_MIPMAP_NEAREST,[nn]:s.LINEAR_MIPMAP_LINEAR},Mt={[Tc]:s.NEVER,[Rc]:s.ALWAYS,[wc]:s.LESS,[La]:s.LEQUAL,[Ec]:s.EQUAL,[Cc]:s.GEQUAL,[Ac]:s.GREATER,[Pc]:s.NOTEQUAL};function Ft(S,_){if(_.type===yn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===De||_.magFilter===Jr||_.magFilter===Es||_.magFilter===nn||_.minFilter===De||_.minFilter===Jr||_.minFilter===Es||_.minFilter===nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(S,s.TEXTURE_WRAP_S,ot[_.wrapS]),s.texParameteri(S,s.TEXTURE_WRAP_T,ot[_.wrapT]),(S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY)&&s.texParameteri(S,s.TEXTURE_WRAP_R,ot[_.wrapR]),s.texParameteri(S,s.TEXTURE_MAG_FILTER,ut[_.magFilter]),s.texParameteri(S,s.TEXTURE_MIN_FILTER,ut[_.minFilter]),_.compareFunction&&(s.texParameteri(S,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(S,s.TEXTURE_COMPARE_FUNC,Mt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ye||_.minFilter!==Es&&_.minFilter!==nn||_.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");s.texParameterf(S,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ie(S,_){let U=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",C));let V=_.source,J=d.get(V);J===void 0&&(J={},d.set(V,J));let H=X(_);if(H!==S.__cacheKey){J[H]===void 0&&(J[H]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,U=!0),J[H].usedTimes++;let xt=J[S.__cacheKey];xt!==void 0&&(J[S.__cacheKey].usedTimes--,xt.usedTimes===0&&M(_)),S.__cacheKey=H,S.__webglTexture=J[H].texture}return U}function Kt(S,_,U){return Math.floor(Math.floor(S/U)/_)}function G(S,_,U,V){let H=S.updateRanges;if(H.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,U,V,_.data);else{H.sort((Q,ht)=>Q.start-ht.start);let xt=0;for(let Q=1;Q<H.length;Q++){let ht=H[xt],Ct=H[Q],vt=ht.start+ht.count,lt=Kt(Ct.start,_.width,4),Ot=Kt(ht.start,_.width,4);Ct.start<=vt+1&&lt===Ot&&Kt(Ct.start+Ct.count-1,_.width,4)===lt?ht.count=Math.max(ht.count,Ct.start+Ct.count-ht.start):(++xt,H[xt]=Ct)}H.length=xt+1;let et=s.getParameter(s.UNPACK_ROW_LENGTH),_t=s.getParameter(s.UNPACK_SKIP_PIXELS),yt=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Q=0,ht=H.length;Q<ht;Q++){let Ct=H[Q],vt=Math.floor(Ct.start/4),lt=Math.ceil(Ct.count/4),Ot=vt%_.width,I=Math.floor(vt/_.width),tt=lt,it=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ot),s.pixelStorei(s.UNPACK_SKIP_ROWS,I),e.texSubImage2D(s.TEXTURE_2D,0,Ot,I,tt,it,U,V,_.data)}S.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,et),s.pixelStorei(s.UNPACK_SKIP_PIXELS,_t),s.pixelStorei(s.UNPACK_SKIP_ROWS,yt)}}function at(S,_,U){let V=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=s.TEXTURE_3D);let J=ie(S,_),H=_.source;e.bindTexture(V,S.__webglTexture,s.TEXTURE0+U);let xt=n.get(H);if(H.version!==xt.__version||J===!0){e.activeTexture(s.TEXTURE0+U);let et=Wt.getPrimaries(Wt.workingColorSpace),_t=_.colorSpace===On?null:Wt.getPrimaries(_.colorSpace),yt=_.colorSpace===On||et===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let Q=y(_.image,!1,i.maxTextureSize);Q=ye(_,Q);let ht=r.convert(_.format,_.colorSpace),Ct=r.convert(_.type),vt=T(_.internalFormat,ht,Ct,_.colorSpace,_.isVideoTexture);Ft(V,_);let lt,Ot=_.mipmaps,I=_.isVideoTexture!==!0,tt=xt.__version===void 0||J===!0,it=H.dataReady,ft=R(_,Q);if(_.isDepthTexture)vt=x(_.format===Yi,_.type),tt&&(I?e.texStorage2D(s.TEXTURE_2D,1,vt,Q.width,Q.height):e.texImage2D(s.TEXTURE_2D,0,vt,Q.width,Q.height,0,ht,Ct,null));else if(_.isDataTexture)if(Ot.length>0){I&&tt&&e.texStorage2D(s.TEXTURE_2D,ft,vt,Ot[0].width,Ot[0].height);for(let K=0,q=Ot.length;K<q;K++)lt=Ot[K],I?it&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,lt.width,lt.height,ht,Ct,lt.data):e.texImage2D(s.TEXTURE_2D,K,vt,lt.width,lt.height,0,ht,Ct,lt.data);_.generateMipmaps=!1}else I?(tt&&e.texStorage2D(s.TEXTURE_2D,ft,vt,Q.width,Q.height),it&&G(_,Q,ht,Ct)):e.texImage2D(s.TEXTURE_2D,0,vt,Q.width,Q.height,0,ht,Ct,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&tt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,vt,Ot[0].width,Ot[0].height,Q.depth);for(let K=0,q=Ot.length;K<q;K++)if(lt=Ot[K],_.format!==$e)if(ht!==null)if(I){if(it)if(_.layerUpdates.size>0){let gt=ka(lt.width,lt.height,_.format,_.type);for(let Dt of _.layerUpdates){let ee=lt.data.subarray(Dt*gt/lt.data.BYTES_PER_ELEMENT,(Dt+1)*gt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,Dt,lt.width,lt.height,1,ht,ee)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,lt.width,lt.height,Q.depth,ht,lt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,vt,lt.width,lt.height,Q.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?it&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,lt.width,lt.height,Q.depth,ht,Ct,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,K,vt,lt.width,lt.height,Q.depth,0,ht,Ct,lt.data)}else{I&&tt&&e.texStorage2D(s.TEXTURE_2D,ft,vt,Ot[0].width,Ot[0].height);for(let K=0,q=Ot.length;K<q;K++)lt=Ot[K],_.format!==$e?ht!==null?I?it&&e.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,lt.width,lt.height,ht,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,K,vt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?it&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,lt.width,lt.height,ht,Ct,lt.data):e.texImage2D(s.TEXTURE_2D,K,vt,lt.width,lt.height,0,ht,Ct,lt.data)}else if(_.isDataArrayTexture)if(I){if(tt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,vt,Q.width,Q.height,Q.depth),it)if(_.layerUpdates.size>0){let K=ka(Q.width,Q.height,_.format,_.type);for(let q of _.layerUpdates){let gt=Q.data.subarray(q*K/Q.data.BYTES_PER_ELEMENT,(q+1)*K/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,ht,Ct,gt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ht,Ct,Q.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,vt,Q.width,Q.height,Q.depth,0,ht,Ct,Q.data);else if(_.isData3DTexture)I?(tt&&e.texStorage3D(s.TEXTURE_3D,ft,vt,Q.width,Q.height,Q.depth),it&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ht,Ct,Q.data)):e.texImage3D(s.TEXTURE_3D,0,vt,Q.width,Q.height,Q.depth,0,ht,Ct,Q.data);else if(_.isFramebufferTexture){if(tt)if(I)e.texStorage2D(s.TEXTURE_2D,ft,vt,Q.width,Q.height);else{let K=Q.width,q=Q.height;for(let gt=0;gt<ft;gt++)e.texImage2D(s.TEXTURE_2D,gt,vt,K,q,0,ht,Ct,null),K>>=1,q>>=1}}else if(Ot.length>0){if(I&&tt){let K=de(Ot[0]);e.texStorage2D(s.TEXTURE_2D,ft,vt,K.width,K.height)}for(let K=0,q=Ot.length;K<q;K++)lt=Ot[K],I?it&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,ht,Ct,lt):e.texImage2D(s.TEXTURE_2D,K,vt,ht,Ct,lt);_.generateMipmaps=!1}else if(I){if(tt){let K=de(Q);e.texStorage2D(s.TEXTURE_2D,ft,vt,K.width,K.height)}it&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ht,Ct,Q)}else e.texImage2D(s.TEXTURE_2D,0,vt,ht,Ct,Q);m(_)&&f(V),xt.__version=H.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function nt(S,_,U){if(_.image.length!==6)return;let V=ie(S,_),J=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,S.__webglTexture,s.TEXTURE0+U);let H=n.get(J);if(J.version!==H.__version||V===!0){e.activeTexture(s.TEXTURE0+U);let xt=Wt.getPrimaries(Wt.workingColorSpace),et=_.colorSpace===On?null:Wt.getPrimaries(_.colorSpace),_t=_.colorSpace===On||xt===et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let yt=_.isCompressedTexture||_.image[0].isCompressedTexture,Q=_.image[0]&&_.image[0].isDataTexture,ht=[];for(let q=0;q<6;q++)!yt&&!Q?ht[q]=y(_.image[q],!0,i.maxCubemapSize):ht[q]=Q?_.image[q].image:_.image[q],ht[q]=ye(_,ht[q]);let Ct=ht[0],vt=r.convert(_.format,_.colorSpace),lt=r.convert(_.type),Ot=T(_.internalFormat,vt,lt,_.colorSpace),I=_.isVideoTexture!==!0,tt=H.__version===void 0||V===!0,it=J.dataReady,ft=R(_,Ct);Ft(s.TEXTURE_CUBE_MAP,_);let K;if(yt){I&&tt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Ot,Ct.width,Ct.height);for(let q=0;q<6;q++){K=ht[q].mipmaps;for(let gt=0;gt<K.length;gt++){let Dt=K[gt];_.format!==$e?vt!==null?I?it&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,0,0,Dt.width,Dt.height,vt,Dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,Ot,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,0,0,Dt.width,Dt.height,vt,lt,Dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt,Ot,Dt.width,Dt.height,0,vt,lt,Dt.data)}}}else{if(K=_.mipmaps,I&&tt){K.length>0&&ft++;let q=de(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,Ot,q.width,q.height)}for(let q=0;q<6;q++)if(Q){I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ht[q].width,ht[q].height,vt,lt,ht[q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ot,ht[q].width,ht[q].height,0,vt,lt,ht[q].data);for(let gt=0;gt<K.length;gt++){let ee=K[gt].image[q].image;I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,0,0,ee.width,ee.height,vt,lt,ee.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,Ot,ee.width,ee.height,0,vt,lt,ee.data)}}else{I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,vt,lt,ht[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ot,vt,lt,ht[q]);for(let gt=0;gt<K.length;gt++){let Dt=K[gt];I?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,0,0,vt,lt,Dt.image[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,gt+1,Ot,vt,lt,Dt.image[q])}}}m(_)&&f(s.TEXTURE_CUBE_MAP),H.__version=J.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Et(S,_,U,V,J,H){let xt=r.convert(U.format,U.colorSpace),et=r.convert(U.type),_t=T(U.internalFormat,xt,et,U.colorSpace),yt=n.get(_),Q=n.get(U);if(Q.__renderTarget=_,!yt.__hasExternalTextures){let ht=Math.max(1,_.width>>H),Ct=Math.max(1,_.height>>H);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,H,_t,ht,Ct,_.depth,0,xt,et,null):e.texImage2D(J,H,_t,ht,Ct,0,xt,et,null)}e.bindFramebuffer(s.FRAMEBUFFER,S),pt(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,V,J,Q.__webglTexture,0,se(_)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,V,J,Q.__webglTexture,H),e.bindFramebuffer(s.FRAMEBUFFER,null)}function At(S,_,U){if(s.bindRenderbuffer(s.RENDERBUFFER,S),_.depthBuffer){let V=_.depthTexture,J=V&&V.isDepthTexture?V.type:null,H=x(_.stencilBuffer,J),xt=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=se(_);pt(_)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,et,H,_.width,_.height):U?s.renderbufferStorageMultisample(s.RENDERBUFFER,et,H,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,H,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xt,s.RENDERBUFFER,S)}else{let V=_.textures;for(let J=0;J<V.length;J++){let H=V[J],xt=r.convert(H.format,H.colorSpace),et=r.convert(H.type),_t=T(H.internalFormat,xt,et,H.colorSpace),yt=se(_);U&&pt(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,yt,_t,_.width,_.height):pt(_)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,yt,_t,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,_t,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function It(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let V=n.get(_.depthTexture);V.__renderTarget=_,(!V.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$(_.depthTexture,0);let J=V.__webglTexture,H=se(_);if(_.depthTexture.format===Oi)pt(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(_.depthTexture.format===Yi)pt(_)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,H):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function ue(S){let _=n.get(S),U=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){let V=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){let J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",J)};V.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=V}if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");let V=S.texture.mipmaps;V&&V.length>0?It(_.__webglFramebuffer[0],S):It(_.__webglFramebuffer,S)}else if(U){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=s.createRenderbuffer(),At(_.__webglDepthbuffer[V],S,!1);else{let J=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer[V];s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,H)}}else{let V=S.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),At(_.__webglDepthbuffer,S,!1);else{let J=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,H),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,H)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Gt(S,_,U){let V=n.get(S);_!==void 0&&Et(V.__webglFramebuffer,S,S.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),U!==void 0&&ue(S)}function P(S){let _=S.texture,U=n.get(S),V=n.get(_);S.addEventListener("dispose",A);let J=S.textures,H=S.isWebGLCubeRenderTarget===!0,xt=J.length>1;if(xt||(V.__webglTexture===void 0&&(V.__webglTexture=s.createTexture()),V.__version=_.version,o.memory.textures++),H){U.__webglFramebuffer=[];for(let et=0;et<6;et++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[et]=[];for(let _t=0;_t<_.mipmaps.length;_t++)U.__webglFramebuffer[et][_t]=s.createFramebuffer()}else U.__webglFramebuffer[et]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let et=0;et<_.mipmaps.length;et++)U.__webglFramebuffer[et]=s.createFramebuffer()}else U.__webglFramebuffer=s.createFramebuffer();if(xt)for(let et=0,_t=J.length;et<_t;et++){let yt=n.get(J[et]);yt.__webglTexture===void 0&&(yt.__webglTexture=s.createTexture(),o.memory.textures++)}if(S.samples>0&&pt(S)===!1){U.__webglMultisampledFramebuffer=s.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let et=0;et<J.length;et++){let _t=J[et];U.__webglColorRenderbuffer[et]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,U.__webglColorRenderbuffer[et]);let yt=r.convert(_t.format,_t.colorSpace),Q=r.convert(_t.type),ht=T(_t.internalFormat,yt,Q,_t.colorSpace,S.isXRRenderTarget===!0),Ct=se(S);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,ht,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.RENDERBUFFER,U.__webglColorRenderbuffer[et])}s.bindRenderbuffer(s.RENDERBUFFER,null),S.depthBuffer&&(U.__webglDepthRenderbuffer=s.createRenderbuffer(),At(U.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(H){e.bindTexture(s.TEXTURE_CUBE_MAP,V.__webglTexture),Ft(s.TEXTURE_CUBE_MAP,_);for(let et=0;et<6;et++)if(_.mipmaps&&_.mipmaps.length>0)for(let _t=0;_t<_.mipmaps.length;_t++)Et(U.__webglFramebuffer[et][_t],S,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+et,_t);else Et(U.__webglFramebuffer[et],S,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+et,0);m(_)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let et=0,_t=J.length;et<_t;et++){let yt=J[et],Q=n.get(yt),ht=s.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ht=S.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,Q.__webglTexture),Ft(ht,yt),Et(U.__webglFramebuffer,S,yt,s.COLOR_ATTACHMENT0+et,ht,0),m(yt)&&f(ht)}e.unbindTexture()}else{let et=s.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(et=S.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(et,V.__webglTexture),Ft(et,_),_.mipmaps&&_.mipmaps.length>0)for(let _t=0;_t<_.mipmaps.length;_t++)Et(U.__webglFramebuffer[_t],S,_,s.COLOR_ATTACHMENT0,et,_t);else Et(U.__webglFramebuffer,S,_,s.COLOR_ATTACHMENT0,et,0);m(_)&&f(et),e.unbindTexture()}S.depthBuffer&&ue(S)}function te(S){let _=S.textures;for(let U=0,V=_.length;U<V;U++){let J=_[U];if(m(J)){let H=w(S),xt=n.get(J).__webglTexture;e.bindTexture(H,xt),f(H),e.unbindTexture()}}}let Tt=[],qt=[];function bt(S){if(S.samples>0){if(pt(S)===!1){let _=S.textures,U=S.width,V=S.height,J=s.COLOR_BUFFER_BIT,H=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=n.get(S),et=_.length>1;if(et)for(let yt=0;yt<_.length;yt++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer);let _t=S.texture.mipmaps;_t&&_t.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let yt=0;yt<_.length;yt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),et){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[yt]);let Q=n.get(_[yt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Q,0)}s.blitFramebuffer(0,0,U,V,0,0,U,V,J,s.NEAREST),l===!0&&(Tt.length=0,qt.length=0,Tt.push(s.COLOR_ATTACHMENT0+yt),S.depthBuffer&&S.resolveDepthBuffer===!1&&(Tt.push(H),qt.push(H),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,qt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Tt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),et)for(let yt=0;yt<_.length;yt++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,xt.__webglColorRenderbuffer[yt]);let Q=n.get(_[yt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,Q,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){let _=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function se(S){return Math.min(i.maxSamples,S.samples)}function pt(S){let _=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Bt(S){let _=o.render.frame;h.get(S)!==_&&(h.set(S,_),S.update())}function ye(S,_){let U=S.colorSpace,V=S.format,J=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||U!==ai&&U!==On&&(Wt.getTransfer(U)===Zt?(V!==$e||J!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),_}function de(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=W,this.setTexture2D=$,this.setTexture2DArray=Y,this.setTexture3D=Z,this.setTextureCube=z,this.rebindTextures=Gt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=pt}function Bm(s,t){function e(n,i=On){let r,o=Wt.getTransfer(i);if(n===_n)return s.UNSIGNED_BYTE;if(n===jr)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Qr)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Aa)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===wa)return s.BYTE;if(n===Ea)return s.SHORT;if(n===Gi)return s.UNSIGNED_SHORT;if(n===Kr)return s.INT;if(n===Zn)return s.UNSIGNED_INT;if(n===yn)return s.FLOAT;if(n===Wi)return s.HALF_FLOAT;if(n===Pa)return s.ALPHA;if(n===Ca)return s.RGB;if(n===$e)return s.RGBA;if(n===Oi)return s.DEPTH_COMPONENT;if(n===Yi)return s.DEPTH_STENCIL;if(n===Ra)return s.RED;if(n===to)return s.RED_INTEGER;if(n===Ia)return s.RG;if(n===eo)return s.RG_INTEGER;if(n===no)return s.RGBA_INTEGER;if(n===As||n===Ps||n===Cs||n===Rs)if(o===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===As)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===As)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===io||n===so||n===ro||n===oo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===so)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ao||n===lo||n===co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ao||n===lo)return o===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===co)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===yo||n===vo||n===xo||n===bo||n===Mo||n===So||n===To)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ho)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===po)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===go)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_o)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===So)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===To)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Is||n===wo||n===Eo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Is)return o===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Eo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Da||n===Ao||n===Po||n===Co)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Is)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Po)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Oo=class extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}},zm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hm=`
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

}`,tl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Oo(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new en({vertexShader:zm,fragmentShader:Hm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Pe(new Yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},el=class extends Rn{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,y=new tl,m={},f=e.getContextAttributes(),w=null,T=null,x=[],R=[],C=new Xt,A=null,O=new Se;O.viewport=new he;let M=new Se;M.viewport=new he;let b=[O,M],E=new zr,W=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let at=x[G];return at===void 0&&(at=new ki,x[G]=at),at.getTargetRaySpace()},this.getControllerGrip=function(G){let at=x[G];return at===void 0&&(at=new ki,x[G]=at),at.getGripSpace()},this.getHand=function(G){let at=x[G];return at===void 0&&(at=new ki,x[G]=at),at.getHandSpace()};function X(G){let at=R.indexOf(G.inputSource);if(at===-1)return;let nt=x[at];nt!==void 0&&(nt.update(G.inputSource,G.frame,c||o),nt.dispatchEvent({type:G.type,data:G.inputSource}))}function $(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",Y);for(let G=0;G<x.length;G++){let at=R[G];at!==null&&(R[G]=null,x[G].disconnect(at))}W=null,k=null,y.reset();for(let G in m)delete m[G];t.setRenderTarget(w),p=null,d=null,u=null,i=null,T=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=function(G){return st(this,null,function*(){if(i=G,i!==null){if(w=t.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",$),i.addEventListener("inputsourceschange",Y),f.xrCompatible!==!0&&(yield e.makeXRCompatible()),A=t.getPixelRatio(),t.getSize(C),typeof XRWebGLBinding<"u"&&(u=new XRWebGLBinding(i,e)),u!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,Et=null,At=null;f.depth&&(At=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=f.stencil?Yi:Oi,Et=f.stencil?Xi:Zn);let It={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=u.createProjectionLayer(It),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new fn(d.textureWidth,d.textureHeight,{format:$e,type:_n,depthTexture:new vs(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let nt={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new fn(p.framebufferWidth,p.framebufferHeight,{format:$e,type:_n,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=yield i.requestReferenceSpace(a),Kt.setContext(i),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}})},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Y(G){for(let at=0;at<G.removed.length;at++){let nt=G.removed[at],Et=R.indexOf(nt);Et>=0&&(R[Et]=null,x[Et].disconnect(nt))}for(let at=0;at<G.added.length;at++){let nt=G.added[at],Et=R.indexOf(nt);if(Et===-1){for(let It=0;It<x.length;It++)if(It>=R.length){R.push(nt),Et=It;break}else if(R[It]===null){R[It]=nt,Et=It;break}if(Et===-1)break}let At=x[Et];At&&At.connect(nt)}}let Z=new N,z=new N;function ot(G,at,nt){Z.setFromMatrixPosition(at.matrixWorld),z.setFromMatrixPosition(nt.matrixWorld);let Et=Z.distanceTo(z),At=at.projectionMatrix.elements,It=nt.projectionMatrix.elements,ue=At[14]/(At[10]-1),Gt=At[14]/(At[10]+1),P=(At[9]+1)/At[5],te=(At[9]-1)/At[5],Tt=(At[8]-1)/At[0],qt=(It[8]+1)/It[0],bt=ue*Tt,se=ue*qt,pt=Et/(-Tt+qt),Bt=pt*-Tt;if(at.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Bt),G.translateZ(pt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),At[10]===-1)G.projectionMatrix.copy(at.projectionMatrix),G.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let ye=ue+pt,de=Gt+pt,S=bt-Bt,_=se+(Et-Bt),U=P*Gt/de*ye,V=te*Gt/de*ye;G.projectionMatrix.makePerspective(S,_,U,V,ye,de),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function ut(G,at){at===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(at.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;let at=G.near,nt=G.far;y.texture!==null&&(y.depthNear>0&&(at=y.depthNear),y.depthFar>0&&(nt=y.depthFar)),E.near=M.near=O.near=at,E.far=M.far=O.far=nt,(W!==E.near||k!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),W=E.near,k=E.far),E.layers.mask=G.layers.mask|6,O.layers.mask=E.layers.mask&3,M.layers.mask=E.layers.mask&5;let Et=G.parent,At=E.cameras;ut(E,Et);for(let It=0;It<At.length;It++)ut(At[It],Et);At.length===2?ot(E,O,M):E.projectionMatrix.copy(O.projectionMatrix),Mt(G,E,Et)};function Mt(G,at,nt){nt===null?G.matrix.copy(at.matrixWorld):(G.matrix.copy(nt.matrixWorld),G.matrix.invert(),G.matrix.multiply(at.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(at.projectionMatrix),G.projectionMatrixInverse.copy(at.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Ui*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(E)},this.getCameraTexture=function(G){return m[G]};let Ft=null;function ie(G,at){if(h=at.getViewerPose(c||o),g=at,h!==null){let nt=h.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let Et=!1;nt.length!==E.cameras.length&&(E.cameras.length=0,Et=!0);for(let Gt=0;Gt<nt.length;Gt++){let P=nt[Gt],te=null;if(p!==null)te=p.getViewport(P);else{let qt=u.getViewSubImage(d,P);te=qt.viewport,Gt===0&&(t.setRenderTargetTextures(T,qt.colorTexture,qt.depthStencilTexture),t.setRenderTarget(T))}let Tt=b[Gt];Tt===void 0&&(Tt=new Se,Tt.layers.enable(Gt),Tt.viewport=new he,b[Gt]=Tt),Tt.matrix.fromArray(P.transform.matrix),Tt.matrix.decompose(Tt.position,Tt.quaternion,Tt.scale),Tt.projectionMatrix.fromArray(P.projectionMatrix),Tt.projectionMatrixInverse.copy(Tt.projectionMatrix).invert(),Tt.viewport.set(te.x,te.y,te.width,te.height),Gt===0&&(E.matrix.copy(Tt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Et===!0&&E.cameras.push(Tt)}let At=i.enabledFeatures;if(At&&At.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){let Gt=u.getDepthInformation(nt[0]);Gt&&Gt.isValid&&Gt.texture&&y.init(Gt,i.renderState)}if(At&&At.includes("camera-access")&&(t.state.unbindTexture(),u))for(let Gt=0;Gt<nt.length;Gt++){let P=nt[Gt].camera;if(P){let te=m[P];te||(te=new Oo,m[P]=te);let Tt=u.getCameraImage(P);te.sourceTexture=Tt}}}for(let nt=0;nt<x.length;nt++){let Et=R[nt],At=x[nt];Et!==null&&At!==void 0&&At.update(Et,at,c||o)}Ft&&Ft(G,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null}let Kt=new rh;Kt.setAnimationLoop(ie),this.setAnimationLoop=function(G){Ft=G},this.dispose=function(){}}},mi=new ci,km=new me;function Vm(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Fa(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,w,T,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),y(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,w,T):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ce&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ce&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let w=t.get(f),T=w.envMap,x=w.envMapRotation;T&&(m.envMap.value=T,mi.copy(x),mi.x*=-1,mi.y*=-1,mi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),m.envMapRotation.value.setFromMatrix4(km.makeRotationFromEuler(mi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=T*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ce&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){let w=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Gm(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){let x=T.program;n.uniformBlockBinding(w,x)}function c(w,T){let x=i[w.id];x===void 0&&(g(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",m));let R=T.program;n.updateUBOMapping(w,R);let C=t.render.frame;r[w.id]!==C&&(d(w),r[w.id]=C)}function h(w){let T=u();w.__bindingPointIndex=T;let x=s.createBuffer(),R=w.__size,C=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,R,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,x),x}function u(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let T=i[w.id],x=w.uniforms,R=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let C=0,A=x.length;C<A;C++){let O=Array.isArray(x[C])?x[C]:[x[C]];for(let M=0,b=O.length;M<b;M++){let E=O[M];if(p(E,C,M,R)===!0){let W=E.__offset,k=Array.isArray(E.value)?E.value:[E.value],X=0;for(let $=0;$<k.length;$++){let Y=k[$],Z=y(Y);typeof Y=="number"||typeof Y=="boolean"?(E.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,W+X,E.__data)):Y.isMatrix3?(E.__data[0]=Y.elements[0],E.__data[1]=Y.elements[1],E.__data[2]=Y.elements[2],E.__data[3]=0,E.__data[4]=Y.elements[3],E.__data[5]=Y.elements[4],E.__data[6]=Y.elements[5],E.__data[7]=0,E.__data[8]=Y.elements[6],E.__data[9]=Y.elements[7],E.__data[10]=Y.elements[8],E.__data[11]=0):(Y.toArray(E.__data,X),X+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,W,E.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(w,T,x,R){let C=w.value,A=T+"_"+x;if(R[A]===void 0)return typeof C=="number"||typeof C=="boolean"?R[A]=C:R[A]=C.clone(),!0;{let O=R[A];if(typeof C=="number"||typeof C=="boolean"){if(O!==C)return R[A]=C,!0}else if(O.equals(C)===!1)return O.copy(C),!0}return!1}function g(w){let T=w.uniforms,x=0,R=16;for(let A=0,O=T.length;A<O;A++){let M=Array.isArray(T[A])?T[A]:[T[A]];for(let b=0,E=M.length;b<E;b++){let W=M[b],k=Array.isArray(W.value)?W.value:[W.value];for(let X=0,$=k.length;X<$;X++){let Y=k[X],Z=y(Y),z=x%R,ot=z%Z.boundary,ut=z+ot;x+=ot,ut!==0&&R-ut<Z.storage&&(x+=R-ut),W.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=Z.storage}}}let C=x%R;return C>0&&(x+=R-C),w.__size=x,w.__cache={},this}function y(w){let T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function m(w){let T=w.target;T.removeEventListener("dispose",m);let x=o.indexOf(T.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function f(){for(let w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:l,update:c,dispose:f}}var Uo=class{constructor(t={}){let{canvas:e=Ic(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let g=new Uint32Array(4),y=new Int32Array(4),m=null,f=null,w=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,R=!1;this._outputColorSpace=xe;let C=0,A=0,O=null,M=-1,b=null,E=new he,W=new he,k=null,X=new Vt(0),$=0,Y=e.width,Z=e.height,z=1,ot=null,ut=null,Mt=new he(0,0,Y,Z),Ft=new he(0,0,Y,Z),ie=!1,Kt=new ys,G=!1,at=!1,nt=new me,Et=new N,At=new he,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ue=!1;function Gt(){return O===null?z:1}let P=n;function te(v,D){return e.getContext(v,D)}try{let v={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Hr}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",K,!1),P===null){let D="webgl2";if(P=te(D,v),P===null)throw te(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Tt,qt,bt,se,pt,Bt,ye,de,S,_,U,V,J,H,xt,et,_t,yt,Q,ht,Ct,vt,lt,Ot;function I(){Tt=new ap(P),Tt.init(),vt=new Bm(P,Tt),qt=new tp(P,Tt,t,vt),bt=new Nm(P,Tt),qt.reversedDepthBuffer&&d&&bt.buffers.depth.setReversed(!0),se=new hp(P),pt=new Sm,Bt=new Fm(P,Tt,bt,pt,qt,vt,se),ye=new np(x),de=new op(x),S=new mu(P),lt=new jf(P,S),_=new lp(P,S,se,lt),U=new dp(P,_,S,se),Q=new up(P,qt,Bt),et=new ep(pt),V=new Mm(x,ye,de,Tt,qt,lt,et),J=new Vm(x,pt),H=new wm,xt=new Im(Tt),yt=new Kf(x,ye,de,bt,U,p,l),_t=new Om(x,U,qt),Ot=new Gm(P,se,qt,bt),ht=new Qf(P,Tt,se),Ct=new cp(P,Tt,se),se.programs=V.programs,x.capabilities=qt,x.extensions=Tt,x.properties=pt,x.renderLists=H,x.shadowMap=_t,x.state=bt,x.info=se}I();let tt=new el(x,P);this.xr=tt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let v=Tt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Tt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(v){v!==void 0&&(z=v,this.setSize(Y,Z,!1))},this.getSize=function(v){return v.set(Y,Z)},this.setSize=function(v,D,F=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=v,Z=D,e.width=Math.floor(v*z),e.height=Math.floor(D*z),F===!0&&(e.style.width=v+"px",e.style.height=D+"px"),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(Y*z,Z*z).floor()},this.setDrawingBufferSize=function(v,D,F){Y=v,Z=D,z=F,e.width=Math.floor(v*F),e.height=Math.floor(D*F),this.setViewport(0,0,v,D)},this.getCurrentViewport=function(v){return v.copy(E)},this.getViewport=function(v){return v.copy(Mt)},this.setViewport=function(v,D,F,B){v.isVector4?Mt.set(v.x,v.y,v.z,v.w):Mt.set(v,D,F,B),bt.viewport(E.copy(Mt).multiplyScalar(z).round())},this.getScissor=function(v){return v.copy(Ft)},this.setScissor=function(v,D,F,B){v.isVector4?Ft.set(v.x,v.y,v.z,v.w):Ft.set(v,D,F,B),bt.scissor(W.copy(Ft).multiplyScalar(z).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(v){bt.setScissorTest(ie=v)},this.setOpaqueSort=function(v){ot=v},this.setTransparentSort=function(v){ut=v},this.getClearColor=function(v){return v.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,F=!0){let B=0;if(v){let L=!1;if(O!==null){let j=O.texture.format;L=j===no||j===eo||j===to}if(L){let j=O.texture.type,ct=j===_n||j===Zn||j===Gi||j===Xi||j===jr||j===Qr,mt=yt.getClearColor(),dt=yt.getClearAlpha(),Pt=mt.r,Rt=mt.g,St=mt.b;ct?(g[0]=Pt,g[1]=Rt,g[2]=St,g[3]=dt,P.clearBufferuiv(P.COLOR,0,g)):(y[0]=Pt,y[1]=Rt,y[2]=St,y[3]=dt,P.clearBufferiv(P.COLOR,0,y))}else B|=P.COLOR_BUFFER_BIT}D&&(B|=P.DEPTH_BUFFER_BIT),F&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",K,!1),yt.dispose(),H.dispose(),xt.dispose(),pt.dispose(),ye.dispose(),de.dispose(),U.dispose(),lt.dispose(),Ot.dispose(),V.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",sn),tt.removeEventListener("sessionend",il),Kn.stop()};function it(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let v=se.autoReset,D=_t.enabled,F=_t.autoUpdate,B=_t.needsUpdate,L=_t.type;I(),se.autoReset=v,_t.enabled=D,_t.autoUpdate=F,_t.needsUpdate=B,_t.type=L}function K(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function q(v){let D=v.target;D.removeEventListener("dispose",q),gt(D)}function gt(v){Dt(v),pt.remove(v)}function Dt(v){let D=pt.get(v).programs;D!==void 0&&(D.forEach(function(F){V.releaseProgram(F)}),v.isShaderMaterial&&V.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,F,B,L,j){D===null&&(D=It);let ct=L.isMesh&&L.matrixWorld.determinant()<0,mt=uh(v,D,F,B,L);bt.setMaterial(B,ct);let dt=F.index,Pt=1;if(B.wireframe===!0){if(dt=_.getWireframeAttribute(F),dt===void 0)return;Pt=2}let Rt=F.drawRange,St=F.attributes.position,zt=Rt.start*Pt,Jt=(Rt.start+Rt.count)*Pt;j!==null&&(zt=Math.max(zt,j.start*Pt),Jt=Math.min(Jt,(j.start+j.count)*Pt)),dt!==null?(zt=Math.max(zt,0),Jt=Math.min(Jt,dt.count)):St!=null&&(zt=Math.max(zt,0),Jt=Math.min(Jt,St.count));let le=Jt-zt;if(le<0||le===1/0)return;lt.setup(L,B,mt,F,dt);let ne,jt=ht;if(dt!==null&&(ne=S.get(dt),jt=Ct,jt.setIndex(ne)),L.isMesh)B.wireframe===!0?(bt.setLineWidth(B.wireframeLinewidth*Gt()),jt.setMode(P.LINES)):jt.setMode(P.TRIANGLES);else if(L.isLine){let wt=B.linewidth;wt===void 0&&(wt=1),bt.setLineWidth(wt*Gt()),L.isLineSegments?jt.setMode(P.LINES):L.isLineLoop?jt.setMode(P.LINE_LOOP):jt.setMode(P.LINE_STRIP)}else L.isPoints?jt.setMode(P.POINTS):L.isSprite&&jt.setMode(P.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)li("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),jt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Tt.get("WEBGL_multi_draw"))jt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let wt=L._multiDrawStarts,oe=L._multiDrawCounts,Yt=L._multiDrawCount,Le=dt?S.get(dt).bytesPerElement:1,yi=pt.get(B).currentProgram.getUniforms();for(let Oe=0;Oe<Yt;Oe++)yi.setValue(P,"_gl_DrawID",Oe),jt.render(wt[Oe]/Le,oe[Oe])}else if(L.isInstancedMesh)jt.renderInstances(zt,le,L.count);else if(F.isInstancedBufferGeometry){let wt=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,oe=Math.min(F.instanceCount,wt);jt.renderInstances(zt,le,oe)}else jt.render(zt,le)};function ee(v,D,F){v.transparent===!0&&v.side===gn&&v.forceSinglePass===!1?(v.side=Ce,v.needsUpdate=!0,Os(v,D,F),v.side=Cn,v.needsUpdate=!0,Os(v,D,F),v.side=gn):Os(v,D,F)}this.compile=function(v,D,F=null){F===null&&(F=v),f=xt.get(F),f.init(D),T.push(f),F.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),v!==F&&v.traverseVisible(function(L){L.isLight&&L.layers.test(D.layers)&&(f.pushLight(L),L.castShadow&&f.pushShadow(L))}),f.setupLights();let B=new Set;return v.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let j=L.material;if(j)if(Array.isArray(j))for(let ct=0;ct<j.length;ct++){let mt=j[ct];ee(mt,F,L),B.add(mt)}else ee(j,F,L),B.add(j)}),f=T.pop(),B},this.compileAsync=function(v,D,F=null){let B=this.compile(v,D,F);return new Promise(L=>{function j(){if(B.forEach(function(ct){pt.get(ct).currentProgram.isReady()&&B.delete(ct)}),B.size===0){L(v);return}setTimeout(j,10)}Tt.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let $t=null;function xn(v){$t&&$t(v)}function sn(){Kn.stop()}function il(){Kn.start()}let Kn=new rh;Kn.setAnimationLoop(xn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(v){$t=v,tt.setAnimationLoop(v),v===null?Kn.stop():Kn.start()},tt.addEventListener("sessionstart",sn),tt.addEventListener("sessionend",il),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(D),D=tt.getCamera()),v.isScene===!0&&v.onBeforeRender(x,v,D,O),f=xt.get(v,T.length),f.init(D),T.push(f),nt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Kt.setFromProjectionMatrix(nt,tn,D.reversedDepth),at=this.localClippingEnabled,G=et.init(this.clippingPlanes,at),m=H.get(v,w.length),m.init(),w.push(m),tt.enabled===!0&&tt.isPresenting===!0){let j=x.xr.getDepthSensingMesh();j!==null&&Bo(j,D,-1/0,x.sortObjects)}Bo(v,D,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ot,ut),ue=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,ue&&yt.addToRenderList(m,v),this.info.render.frame++,G===!0&&et.beginShadows();let F=f.state.shadowsArray;_t.render(F,v,D),G===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=m.opaque,L=m.transmissive;if(f.setupLights(),D.isArrayCamera){let j=D.cameras;if(L.length>0)for(let ct=0,mt=j.length;ct<mt;ct++){let dt=j[ct];rl(B,L,v,dt)}ue&&yt.render(v);for(let ct=0,mt=j.length;ct<mt;ct++){let dt=j[ct];sl(m,v,dt,dt.viewport)}}else L.length>0&&rl(B,L,v,D),ue&&yt.render(v),sl(m,v,D);O!==null&&A===0&&(Bt.updateMultisampleRenderTarget(O),Bt.updateRenderTargetMipmap(O)),v.isScene===!0&&v.onAfterRender(x,v,D),lt.resetDefaultState(),M=-1,b=null,T.pop(),T.length>0?(f=T[T.length-1],G===!0&&et.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Bo(v,D,F,B){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)F=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)f.pushLight(v),v.castShadow&&f.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Kt.intersectsSprite(v)){B&&At.setFromMatrixPosition(v.matrixWorld).applyMatrix4(nt);let ct=U.update(v),mt=v.material;mt.visible&&m.push(v,ct,mt,F,At.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Kt.intersectsObject(v))){let ct=U.update(v),mt=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),At.copy(v.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),At.copy(ct.boundingSphere.center)),At.applyMatrix4(v.matrixWorld).applyMatrix4(nt)),Array.isArray(mt)){let dt=ct.groups;for(let Pt=0,Rt=dt.length;Pt<Rt;Pt++){let St=dt[Pt],zt=mt[St.materialIndex];zt&&zt.visible&&m.push(v,ct,zt,F,At.z,St)}}else mt.visible&&m.push(v,ct,mt,F,At.z,null)}}let j=v.children;for(let ct=0,mt=j.length;ct<mt;ct++)Bo(j[ct],D,F,B)}function sl(v,D,F,B){let L=v.opaque,j=v.transmissive,ct=v.transparent;f.setupLightsView(F),G===!0&&et.setGlobalState(x.clippingPlanes,F),B&&bt.viewport(E.copy(B)),L.length>0&&Ls(L,D,F),j.length>0&&Ls(j,D,F),ct.length>0&&Ls(ct,D,F),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function rl(v,D,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[B.id]===void 0&&(f.state.transmissionRenderTarget[B.id]=new fn(1,1,{generateMipmaps:!0,type:Tt.has("EXT_color_buffer_half_float")||Tt.has("EXT_color_buffer_float")?Wi:_n,minFilter:nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));let j=f.state.transmissionRenderTarget[B.id],ct=B.viewport||E;j.setSize(ct.z*x.transmissionResolutionScale,ct.w*x.transmissionResolutionScale);let mt=x.getRenderTarget(),dt=x.getActiveCubeFace(),Pt=x.getActiveMipmapLevel();x.setRenderTarget(j),x.getClearColor(X),$=x.getClearAlpha(),$<1&&x.setClearColor(16777215,.5),x.clear(),ue&&yt.render(F);let Rt=x.toneMapping;x.toneMapping=Ln;let St=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),f.setupLightsView(B),G===!0&&et.setGlobalState(x.clippingPlanes,B),Ls(v,F,B),Bt.updateMultisampleRenderTarget(j),Bt.updateRenderTargetMipmap(j),Tt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let Jt=0,le=D.length;Jt<le;Jt++){let ne=D[Jt],jt=ne.object,wt=ne.geometry,oe=ne.material,Yt=ne.group;if(oe.side===gn&&jt.layers.test(B.layers)){let Le=oe.side;oe.side=Ce,oe.needsUpdate=!0,ol(jt,F,B,wt,oe,Yt),oe.side=Le,oe.needsUpdate=!0,zt=!0}}zt===!0&&(Bt.updateMultisampleRenderTarget(j),Bt.updateRenderTargetMipmap(j))}x.setRenderTarget(mt,dt,Pt),x.setClearColor(X,$),St!==void 0&&(B.viewport=St),x.toneMapping=Rt}function Ls(v,D,F){let B=D.isScene===!0?D.overrideMaterial:null;for(let L=0,j=v.length;L<j;L++){let ct=v[L],mt=ct.object,dt=ct.geometry,Pt=ct.group,Rt=ct.material;Rt.allowOverride===!0&&B!==null&&(Rt=B),mt.layers.test(F.layers)&&ol(mt,D,F,dt,Rt,Pt)}}function ol(v,D,F,B,L,j){v.onBeforeRender(x,D,F,B,L,j),v.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),L.onBeforeRender(x,D,F,B,v,j),L.transparent===!0&&L.side===gn&&L.forceSinglePass===!1?(L.side=Ce,L.needsUpdate=!0,x.renderBufferDirect(F,D,B,L,v,j),L.side=Cn,L.needsUpdate=!0,x.renderBufferDirect(F,D,B,L,v,j),L.side=gn):x.renderBufferDirect(F,D,B,L,v,j),v.onAfterRender(x,D,F,B,L,j)}function Os(v,D,F){D.isScene!==!0&&(D=It);let B=pt.get(v),L=f.state.lights,j=f.state.shadowsArray,ct=L.state.version,mt=V.getParameters(v,L.state,j,D,F),dt=V.getProgramCacheKey(mt),Pt=B.programs;B.environment=v.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(v.isMeshStandardMaterial?de:ye).get(v.envMap||B.environment),B.envMapRotation=B.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Pt===void 0&&(v.addEventListener("dispose",q),Pt=new Map,B.programs=Pt);let Rt=Pt.get(dt);if(Rt!==void 0){if(B.currentProgram===Rt&&B.lightsStateVersion===ct)return ll(v,mt),Rt}else mt.uniforms=V.getUniforms(v),v.onBeforeCompile(mt,x),Rt=V.acquireProgram(mt,dt),Pt.set(dt,Rt),B.uniforms=mt.uniforms;let St=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(St.clippingPlanes=et.uniform),ll(v,mt),B.needsLights=fh(v),B.lightsStateVersion=ct,B.needsLights&&(St.ambientLightColor.value=L.state.ambient,St.lightProbe.value=L.state.probe,St.directionalLights.value=L.state.directional,St.directionalLightShadows.value=L.state.directionalShadow,St.spotLights.value=L.state.spot,St.spotLightShadows.value=L.state.spotShadow,St.rectAreaLights.value=L.state.rectArea,St.ltc_1.value=L.state.rectAreaLTC1,St.ltc_2.value=L.state.rectAreaLTC2,St.pointLights.value=L.state.point,St.pointLightShadows.value=L.state.pointShadow,St.hemisphereLights.value=L.state.hemi,St.directionalShadowMap.value=L.state.directionalShadowMap,St.directionalShadowMatrix.value=L.state.directionalShadowMatrix,St.spotShadowMap.value=L.state.spotShadowMap,St.spotLightMatrix.value=L.state.spotLightMatrix,St.spotLightMap.value=L.state.spotLightMap,St.pointShadowMap.value=L.state.pointShadowMap,St.pointShadowMatrix.value=L.state.pointShadowMatrix),B.currentProgram=Rt,B.uniformsList=null,Rt}function al(v){if(v.uniformsList===null){let D=v.currentProgram.getUniforms();v.uniformsList=Ji.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function ll(v,D){let F=pt.get(v);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function uh(v,D,F,B,L){D.isScene!==!0&&(D=It),Bt.resetTextureUnits();let j=D.fog,ct=B.isMeshStandardMaterial?D.environment:null,mt=O===null?x.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ai,dt=(B.isMeshStandardMaterial?de:ye).get(B.envMap||ct),Pt=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Rt=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),St=!!F.morphAttributes.position,zt=!!F.morphAttributes.normal,Jt=!!F.morphAttributes.color,le=Ln;B.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(le=x.toneMapping);let ne=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,jt=ne!==void 0?ne.length:0,wt=pt.get(B),oe=f.state.lights;if(G===!0&&(at===!0||v!==b)){let we=v===b&&B.id===M;et.setState(B,v,we)}let Yt=!1;B.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==oe.state.version||wt.outputColorSpace!==mt||L.isBatchedMesh&&wt.batching===!1||!L.isBatchedMesh&&wt.batching===!0||L.isBatchedMesh&&wt.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&wt.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&wt.instancing===!1||!L.isInstancedMesh&&wt.instancing===!0||L.isSkinnedMesh&&wt.skinning===!1||!L.isSkinnedMesh&&wt.skinning===!0||L.isInstancedMesh&&wt.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&wt.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&wt.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&wt.instancingMorph===!1&&L.morphTexture!==null||wt.envMap!==dt||B.fog===!0&&wt.fog!==j||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==et.numPlanes||wt.numIntersection!==et.numIntersection)||wt.vertexAlphas!==Pt||wt.vertexTangents!==Rt||wt.morphTargets!==St||wt.morphNormals!==zt||wt.morphColors!==Jt||wt.toneMapping!==le||wt.morphTargetsCount!==jt)&&(Yt=!0):(Yt=!0,wt.__version=B.version);let Le=wt.currentProgram;Yt===!0&&(Le=Os(B,D,L));let yi=!1,Oe=!1,ji=!1,ae=Le.getUniforms(),He=wt.uniforms;if(bt.useProgram(Le.program)&&(yi=!0,Oe=!0,ji=!0),B.id!==M&&(M=B.id,Oe=!0),yi||b!==v){bt.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ae.setValue(P,"projectionMatrix",v.projectionMatrix),ae.setValue(P,"viewMatrix",v.matrixWorldInverse);let Re=ae.map.cameraPosition;Re!==void 0&&Re.setValue(P,Et.setFromMatrixPosition(v.matrixWorld)),qt.logarithmicDepthBuffer&&ae.setValue(P,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ae.setValue(P,"isOrthographic",v.isOrthographicCamera===!0),b!==v&&(b=v,Oe=!0,ji=!0)}if(L.isSkinnedMesh){ae.setOptional(P,L,"bindMatrix"),ae.setOptional(P,L,"bindMatrixInverse");let we=L.skeleton;we&&(we.boneTexture===null&&we.computeBoneTexture(),ae.setValue(P,"boneTexture",we.boneTexture,Bt))}L.isBatchedMesh&&(ae.setOptional(P,L,"batchingTexture"),ae.setValue(P,"batchingTexture",L._matricesTexture,Bt),ae.setOptional(P,L,"batchingIdTexture"),ae.setValue(P,"batchingIdTexture",L._indirectTexture,Bt),ae.setOptional(P,L,"batchingColorTexture"),L._colorsTexture!==null&&ae.setValue(P,"batchingColorTexture",L._colorsTexture,Bt));let ke=F.morphAttributes;if((ke.position!==void 0||ke.normal!==void 0||ke.color!==void 0)&&Q.update(L,F,Le),(Oe||wt.receiveShadow!==L.receiveShadow)&&(wt.receiveShadow=L.receiveShadow,ae.setValue(P,"receiveShadow",L.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(He.envMap.value=dt,He.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&D.environment!==null&&(He.envMapIntensity.value=D.environmentIntensity),Oe&&(ae.setValue(P,"toneMappingExposure",x.toneMappingExposure),wt.needsLights&&dh(He,ji),j&&B.fog===!0&&J.refreshFogUniforms(He,j),J.refreshMaterialUniforms(He,B,z,Z,f.state.transmissionRenderTarget[v.id]),Ji.upload(P,al(wt),He,Bt)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Ji.upload(P,al(wt),He,Bt),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ae.setValue(P,"center",L.center),ae.setValue(P,"modelViewMatrix",L.modelViewMatrix),ae.setValue(P,"normalMatrix",L.normalMatrix),ae.setValue(P,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let we=B.uniformsGroups;for(let Re=0,zo=we.length;Re<zo;Re++){let jn=we[Re];Ot.update(jn,Le),Ot.bind(jn,Le)}}return Le}function dh(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function fh(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(v,D,F){let B=pt.get(v);B.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),pt.get(v.texture).__webglTexture=D,pt.get(v.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:F,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){let F=pt.get(v);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0};let ph=P.createFramebuffer();this.setRenderTarget=function(v,D=0,F=0){O=v,C=D,A=F;let B=!0,L=null,j=!1,ct=!1;if(v){let dt=pt.get(v);if(dt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(P.FRAMEBUFFER,null),B=!1;else if(dt.__webglFramebuffer===void 0)Bt.setupRenderTarget(v);else if(dt.__hasExternalTextures)Bt.rebindTextures(v,pt.get(v.texture).__webglTexture,pt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let St=v.depthTexture;if(dt.__boundDepthTexture!==St){if(St!==null&&pt.has(St)&&(v.width!==St.image.width||v.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(v)}}let Pt=v.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ct=!0);let Rt=pt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Rt[D])?L=Rt[D][F]:L=Rt[D],j=!0):v.samples>0&&Bt.useMultisampledRTT(v)===!1?L=pt.get(v).__webglMultisampledFramebuffer:Array.isArray(Rt)?L=Rt[F]:L=Rt,E.copy(v.viewport),W.copy(v.scissor),k=v.scissorTest}else E.copy(Mt).multiplyScalar(z).floor(),W.copy(Ft).multiplyScalar(z).floor(),k=ie;if(F!==0&&(L=ph),bt.bindFramebuffer(P.FRAMEBUFFER,L)&&B&&bt.drawBuffers(v,L),bt.viewport(E),bt.scissor(W),bt.setScissorTest(k),j){let dt=pt.get(v.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,dt.__webglTexture,F)}else if(ct){let dt=D;for(let Pt=0;Pt<v.textures.length;Pt++){let Rt=pt.get(v.textures[Pt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Pt,Rt.__webglTexture,F,dt)}}else if(v!==null&&F!==0){let dt=pt.get(v.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,dt.__webglTexture,F)}M=-1},this.readRenderTargetPixels=function(v,D,F,B,L,j,ct,mt=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=pt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt){bt.bindFramebuffer(P.FRAMEBUFFER,dt);try{let Pt=v.textures[mt],Rt=Pt.format,St=Pt.type;if(!qt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(St)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-B&&F>=0&&F<=v.height-L&&(v.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+mt),P.readPixels(D,F,B,L,vt.convert(Rt),vt.convert(St),j))}finally{let Pt=O!==null?pt.get(O).__webglFramebuffer:null;bt.bindFramebuffer(P.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=function(v,D,F,B,L,j,ct,mt=0){return st(this,null,function*(){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=pt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ct!==void 0&&(dt=dt[ct]),dt)if(D>=0&&D<=v.width-B&&F>=0&&F<=v.height-L){bt.bindFramebuffer(P.FRAMEBUFFER,dt);let Pt=v.textures[mt],Rt=Pt.format,St=Pt.type;if(!qt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let zt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,zt),P.bufferData(P.PIXEL_PACK_BUFFER,j.byteLength,P.STREAM_READ),v.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+mt),P.readPixels(D,F,B,L,vt.convert(Rt),vt.convert(St),0);let Jt=O!==null?pt.get(O).__webglFramebuffer:null;bt.bindFramebuffer(P.FRAMEBUFFER,Jt);let le=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),yield Dc(P,le,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,zt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,j),P.deleteBuffer(zt),P.deleteSync(le),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")})},this.copyFramebufferToTexture=function(v,D=null,F=0){let B=Math.pow(2,-F),L=Math.floor(v.image.width*B),j=Math.floor(v.image.height*B),ct=D!==null?D.x:0,mt=D!==null?D.y:0;Bt.setTexture2D(v,0),P.copyTexSubImage2D(P.TEXTURE_2D,F,0,0,ct,mt,L,j),bt.unbindTexture()};let mh=P.createFramebuffer(),gh=P.createFramebuffer();this.copyTextureToTexture=function(v,D,F=null,B=null,L=0,j=null){j===null&&(L!==0?(li("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=L,L=0):j=0);let ct,mt,dt,Pt,Rt,St,zt,Jt,le,ne=v.isCompressedTexture?v.mipmaps[j]:v.image;if(F!==null)ct=F.max.x-F.min.x,mt=F.max.y-F.min.y,dt=F.isBox3?F.max.z-F.min.z:1,Pt=F.min.x,Rt=F.min.y,St=F.isBox3?F.min.z:0;else{let ke=Math.pow(2,-L);ct=Math.floor(ne.width*ke),mt=Math.floor(ne.height*ke),v.isDataArrayTexture?dt=ne.depth:v.isData3DTexture?dt=Math.floor(ne.depth*ke):dt=1,Pt=0,Rt=0,St=0}B!==null?(zt=B.x,Jt=B.y,le=B.z):(zt=0,Jt=0,le=0);let jt=vt.convert(D.format),wt=vt.convert(D.type),oe;D.isData3DTexture?(Bt.setTexture3D(D,0),oe=P.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Bt.setTexture2DArray(D,0),oe=P.TEXTURE_2D_ARRAY):(Bt.setTexture2D(D,0),oe=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);let Yt=P.getParameter(P.UNPACK_ROW_LENGTH),Le=P.getParameter(P.UNPACK_IMAGE_HEIGHT),yi=P.getParameter(P.UNPACK_SKIP_PIXELS),Oe=P.getParameter(P.UNPACK_SKIP_ROWS),ji=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ne.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ne.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Rt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,St);let ae=v.isDataArrayTexture||v.isData3DTexture,He=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){let ke=pt.get(v),we=pt.get(D),Re=pt.get(ke.__renderTarget),zo=pt.get(we.__renderTarget);bt.bindFramebuffer(P.READ_FRAMEBUFFER,Re.__webglFramebuffer),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,zo.__webglFramebuffer);for(let jn=0;jn<dt;jn++)ae&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,pt.get(v).__webglTexture,L,St+jn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,pt.get(D).__webglTexture,j,le+jn)),P.blitFramebuffer(Pt,Rt,ct,mt,zt,Jt,ct,mt,P.DEPTH_BUFFER_BIT,P.NEAREST);bt.bindFramebuffer(P.READ_FRAMEBUFFER,null),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(L!==0||v.isRenderTargetTexture||pt.has(v)){let ke=pt.get(v),we=pt.get(D);bt.bindFramebuffer(P.READ_FRAMEBUFFER,mh),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,gh);for(let Re=0;Re<dt;Re++)ae?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ke.__webglTexture,L,St+Re):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ke.__webglTexture,L),He?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,we.__webglTexture,j,le+Re):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,we.__webglTexture,j),L!==0?P.blitFramebuffer(Pt,Rt,ct,mt,zt,Jt,ct,mt,P.COLOR_BUFFER_BIT,P.NEAREST):He?P.copyTexSubImage3D(oe,j,zt,Jt,le+Re,Pt,Rt,ct,mt):P.copyTexSubImage2D(oe,j,zt,Jt,Pt,Rt,ct,mt);bt.bindFramebuffer(P.READ_FRAMEBUFFER,null),bt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else He?v.isDataTexture||v.isData3DTexture?P.texSubImage3D(oe,j,zt,Jt,le,ct,mt,dt,jt,wt,ne.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(oe,j,zt,Jt,le,ct,mt,dt,jt,ne.data):P.texSubImage3D(oe,j,zt,Jt,le,ct,mt,dt,jt,wt,ne):v.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,j,zt,Jt,ct,mt,jt,wt,ne.data):v.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,j,zt,Jt,ne.width,ne.height,jt,ne.data):P.texSubImage2D(P.TEXTURE_2D,j,zt,Jt,ct,mt,jt,wt,ne);P.pixelStorei(P.UNPACK_ROW_LENGTH,Yt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Le),P.pixelStorei(P.UNPACK_SKIP_PIXELS,yi),P.pixelStorei(P.UNPACK_SKIP_ROWS,Oe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ji),j===0&&D.generateMipmaps&&P.generateMipmap(oe),bt.unbindTexture()},this.copyTextureToTexture3D=function(v,D,F=null,B=null,L=0){return li('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,D,F,B,L)},this.initRenderTarget=function(v){pt.get(v).__webglFramebuffer===void 0&&Bt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Bt.setTextureCube(v,0):v.isData3DTexture?Bt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Bt.setTexture2DArray(v,0):Bt.setTexture2D(v,0),bt.unbindTexture()},this.resetState=function(){C=0,A=0,O=null,bt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}};var Fo=class s{PHOTO_W;PHOTO_H;FOV_DEG;CAM_MARGIN;CAM_DAMP;ANISO;BG;container=null;renderer;scene;camera;root;clock;texLoader;rafRunning=!1;activeTweens=[];bounds={minX:1/0,maxX:-1/0,minY:1/0,maxY:-1/0};targetCamZ=1200;zSpawn=700;isInitialized=!1;textureCache=new Map;loadingTextures=new Map;highResTextureCache=new Map;loadingHighResTextures=new Map;svgBackgroundPlane;svgBackgroundTexture;svgBackgroundOptions;raycaster=new Ts;mouse=new Xt;isDragging=!1;draggedMesh=null;dragPlane=new Xe;dragOffset=new N;dragCallbacks=new Map;meshToPhotoId=new Map;meshToPhotoData=new Map;currentLayoutStrategy=null;layoutStrategyRef=null;svgContainer=null;onHotspotDropCallback;previewWidget=null;previewImage=null;previewHotspotInfo=null;hoveredMesh=null;currentMatchedHotspot=null;userControlEnabled=!0;targetCamX=0;targetCamY=0;minCamZ=300;maxCamZ=5e4;isPanning=!1;panStartMouse=new Xt;panStartCameraPos=new N;autoFitEnabled=!0;lastMousePos=new Xt;lastClientX=null;lastClientY=null;meshToUrl=new Map;highResActive=new Set;lodAccumTime=0;constructor(){let t={};this.PHOTO_W=t.photoWidth??Ut.PHOTO_WIDTH,this.PHOTO_H=t.photoHeight??Ut.PHOTO_HEIGHT,this.FOV_DEG=t.fovDeg??45,this.CAM_MARGIN=t.cameraMargin??300,this.CAM_DAMP=t.cameraDamp??.1*1e4,this.ANISO=t.anisotropy??4,this.BG=t.background??16776694}initialize(t,e){return st(this,null,function*(){if(this.isInitialized)throw new Error("ThreeRendererService is already initialized");this.container=t,e&&e.svgBackground&&(this.svgBackgroundOptions=e.svgBackground),yield this.initializeThreeJS(),this.isInitialized=!0})}createPhotoMesh(t){return st(this,null,function*(){if(!this.isInitialized)throw new Error("ThreeRendererService not initialized");let e=yield this.loadTexture(t.url),n=new pn({map:e,transparent:!0,opacity:1}),i=new Yn(this.PHOTO_W,this.PHOTO_H),r=new Pe(i,n),o=t.currentPosition;r.position.set(o.x,o.y,o.z),r.renderOrder=0;let a=this.calculatePhotoRotation(t);return r.rotation.z=a,console.log("[CREATE_MESH] Photo:",t.id,"mesh.rotation.z =",r.rotation.z,"radians (",fe.radToDeg(r.rotation.z).toFixed(1),"\xB0)"),this.root.add(r),t.setMesh(r),this.meshToUrl.set(r,t.url),r})}updatePhotoMesh(t){if(!t.mesh)return;let e=t.currentPosition;t.mesh.position.set(e.x,e.y,e.z);let n=this.calculatePhotoRotation(t);t.mesh.rotation.z=n,console.log("[UPDATE_MESH] Photo:",t.id,"mesh.rotation.z updated to",t.mesh.rotation.z,"radians (",fe.radToDeg(t.mesh.rotation.z).toFixed(1),"\xB0)")}removePhotoMesh(t){t.mesh&&(this.root.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material instanceof qe&&t.mesh.material.dispose(),t.setMesh(null))}updateMeshPosition(t,e){t.position.set(e.x,e.y,e.z)}upgradeToHighResTexture(t,e){return st(this,null,function*(){try{let n=yield this.loadHighResTexture(e);if(t.material instanceof pn){let i=t.material.map;i&&!this.highResTextureCache.has(e)&&i.dispose(),t.material.map=n,t.material.needsUpdate=!0}}catch(n){console.warn("Failed to upgrade to high-res texture, keeping low-res:",n)}})}downgradeToLowResTexture(t,e){return st(this,null,function*(){try{let n=yield this.loadTexture(e);t.material instanceof pn&&(t.material.map=n,t.material.needsUpdate=!0)}catch(n){console.warn("Failed to downgrade to low-res texture:",n)}})}removeMesh(t){this.root.remove(t),this.meshToUrl.delete(t),this.highResActive.delete(t),this.disableDragForMesh(t),t.geometry.dispose(),t.material instanceof qe&&t.material.dispose()}animateToPosition(t,e,n,i){return new Promise(r=>{let o=this.makeTween(i,a=>{let l=this.easeOutCubic(a),c=this.easeInOutCubic(a),h=this.lerp(e.x,n.x,l),u=this.lerp(e.y,n.y,l),d=this.lerp(e.z,n.z,c);t.position.set(h,u,d),a>=1&&(t.position.set(n.x,n.y,n.z),r())});this.addTween(o)})}animateOpacity(t,e,n,i){return new Promise(r=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let o=this.makeTween(i,a=>{let l=this.easeOutCubic(a),c=this.lerp(e,n,l);t.material&&"opacity"in t.material&&(t.material.opacity=c),a>=1&&(t.material&&"opacity"in t.material&&(t.material.opacity=n),r())});this.addTween(o)})}animatePositionAndOpacity(t,e,n,i,r,o){return new Promise(a=>{t.material&&"transparent"in t.material&&(t.material.transparent=!0);let l=this.makeTween(o,c=>{let h=this.easeOutCubic(c),u=this.easeInOutCubic(c),d=this.lerp(e.x,n.x,h),p=this.lerp(e.y,n.y,h),g=this.lerp(e.z,n.z,u);t.position.set(d,p,g);let y=this.lerp(i,r,h);t.material&&"opacity"in t.material&&(t.material.opacity=y),c>=1&&(t.position.set(n.x,n.y,n.z),t.material&&"opacity"in t.material&&(t.material.opacity=r),a())});this.addTween(l)})}updateCameraTarget(t){if(this.bounds=kt({},t),this.autoFitEnabled){let e=this.computeFitZWithMargin(this.bounds,fe.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN);this.targetCamZ=e}}animateCameraTarget(t,e){return new Promise(n=>{if(this.bounds=kt({},t),!this.autoFitEnabled){n();return}let i=this.computeFitZWithMargin(this.bounds,fe.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN),r=this.targetCamZ,o=i;if(Math.abs(o-r)<.01){n();return}let a=this.makeTween(e,l=>{let c=this.easeOutCubic(l);this.targetCamZ=this.lerp(r,o,c),l>=1&&(this.targetCamZ=o,n())});this.addTween(a)})}setUserControlEnabled(t){this.userControlEnabled=t}setAutoFit(t){this.autoFitEnabled=t,t&&this.updateCameraTarget(this.bounds)}resetCameraView(t=!0){this.autoFitEnabled=!0,this.targetCamX=0,this.targetCamY=0,t?this.animateCameraTarget(this.bounds,.5):this.updateCameraTarget(this.bounds)}zoomAtPoint(t,e,n){if(!this.userControlEnabled||this.autoFitEnabled)return;let i=this.container.getBoundingClientRect(),r=(e-i.left)/i.width*2-1,o=-((n-i.top)/i.height)*2+1,a=this.projectScreenToWorld(r,o,this.targetCamX,this.targetCamY,this.targetCamZ),l=fe.clamp(this.targetCamZ*t,this.minCamZ,this.maxCamZ);this.targetCamZ=l;let c=this.projectScreenToWorld(r,o,this.targetCamX,this.targetCamY,this.targetCamZ);this.targetCamX+=a.x-c.x,this.targetCamY+=a.y-c.y}calculatePhotoRotation(t){let e=t.metadata,n=e.plausibility,i=e.favorable_future;if(n==null||!i)return console.warn("[ROTATION] Missing data for photo:",t.id,"- plausibility:",n,"favorable_future:",i),this.getStableRandomRotation(t.id);let r=n/100,a=fe.degToRad(32),l=(1-r)*a,c=i.toLowerCase().trim(),h=c==="favor"||c==="favorable"||c==="prefer"||c==="preferred";if(!h&&!(c==="prevent"||c==="prevented"||c==="unfavorable"))return console.warn("[ROTATION] Unknown favorable_future value:",i,"for photo:",t.id),this.getStableRandomRotation(t.id);let d=h?l:-l,p=this.getStableRandomRotation(t.id),g=d+p;return console.log("[ROTATION] Photo:",t.id,"plausibility:",n,"favorable_future:",i,"-> rotation:",fe.radToDeg(g).toFixed(1),"\xB0"),g}getStableRandomRotation(t){let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e=e&e;let n=Math.abs(e)%3-1;return fe.degToRad(n)}projectScreenToWorld(t,e,n,i,r){let o=fe.degToRad(this.camera.fov),a=2*Math.tan(o/2)*r,l=a*this.camera.aspect,c=n+t*l/2,h=i+e*a/2;return new N(c,h,0)}panCamera(t,e){if(!this.userControlEnabled||this.autoFitEnabled)return;let n=this.container.getBoundingClientRect(),i=t/n.width*2*this.getVisibleWidth(),r=e/n.height*2*this.getVisibleHeight();this.targetCamX-=i,this.targetCamY+=r}getVisibleWidth(){let t=fe.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ*this.camera.aspect/2}getVisibleWidthAtDepth(t){let e=fe.degToRad(this.camera.fov);return 2*Math.tan(e/2)*t*this.camera.aspect/2}getVisibleHeight(){let t=fe.degToRad(this.camera.fov);return 2*Math.tan(t/2)*this.targetCamZ/2}screenToWorld(t,e,n){let i=new N(t,e,.5);i.unproject(this.camera);let r=i.sub(this.camera.position).normalize(),o=(n-this.camera.position.z)/r.z;return this.camera.position.clone().add(r.multiplyScalar(o))}getCameraSpawnZ(){return this.camera.position.z-this.zSpawn}getCurrentBounds(){return kt({},this.bounds)}addTween(t){this.activeTweens.push(t)}runTween(t){return new Promise(e=>{this.activeTweens.push(n=>t(n)?(e(),!0):!1)})}makeTween(t,e){let n=0;return i=>{n+=i;let r=this.clamp01(n/t);return e(r),r>=1}}expandBounds(t,e,n,i){let r=n*.5,o=i*.5;this.bounds.minX=Math.min(this.bounds.minX,t-r),this.bounds.maxX=Math.max(this.bounds.maxX,t+r),this.bounds.minY=Math.min(this.bounds.minY,e-o),this.bounds.maxY=Math.max(this.bounds.maxY,e+o)}easeOutCubic(t){return t=this.clamp01(t),1-Math.pow(1-t,2)}easeInOutCubic(t){return t=this.clamp01(t),t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}easeOutBack(t,e=1.70158){return t=this.clamp01(t),1+(e+1)*Math.pow(t-1,3)+e*Math.pow(t-1,2)}lerp(t,e,n){return fe.lerp(t,e,n)}damp(t,e,n,i){return fe.lerp(t,e,1-Math.exp(-n*i))}setSvgBackground(t,e){this.svgBackgroundPlane&&(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof qe&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0),this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&this.svgContainer.remove(),this.svgBackgroundOptions={enabled:!0,svgElement:t,scale:e?.scale??1,offsetX:e?.offsetX??0,offsetY:e?.offsetY??0,radius:e?.radius},this.createSvgDomContainer(t),this.setupSvgBackground(this.svgBackgroundOptions)}enableDragForMesh(t,e){this.dragCallbacks.set(t,e)}setMeshPhotoId(t,e){this.meshToPhotoId.set(t,e)}setLayoutStrategy(t){this.currentLayoutStrategy=t}setHotspotDropCallback(t){this.onHotspotDropCallback=t}setLayoutStrategyReference(t){this.layoutStrategyRef=t}setMeshPhotoData(t,e){this.meshToPhotoData.set(t,e)}findPhotoIdForMesh(t){return this.meshToPhotoId.get(t)||null}isInteractiveLayout(){return this.svgBackgroundOptions?.enabled||!1}createSvgDomContainer(t){if(!this.container)return;this.svgContainer=document.createElement("div"),this.svgContainer.style.position="absolute",this.svgContainer.style.top="0",this.svgContainer.style.left="0",this.svgContainer.style.width="100%",this.svgContainer.style.height="100%",this.svgContainer.style.pointerEvents="none",this.svgContainer.style.zIndex="1",this.svgContainer.style.opacity="0";let e=t.cloneNode(!0);e.style.width="100%",e.style.height="100%",e.style.position="absolute",this.svgContainer.appendChild(e),this.container.appendChild(this.svgContainer)}createPreviewWidget(){this.container&&(this.previewWidget=document.createElement("div"),this.previewWidget.style.position="absolute",this.previewWidget.style.top="50%",this.previewWidget.style.transform="translateY(-50%)",this.previewWidget.style.height="50vh",this.previewWidget.style.width="auto",this.previewWidget.style.aspectRatio="530/1000",this.previewWidget.style.backgroundColor="transparent",this.previewWidget.style.borderRadius="12px",this.previewWidget.style.padding="0",this.previewWidget.style.pointerEvents="none",this.previewWidget.style.zIndex="1000",this.previewWidget.style.display="none",this.previewWidget.style.transition="opacity 0.2s ease-in-out, left 0.3s ease-in-out",this.previewWidget.style.fontFamily="Arial, sans-serif",this.previewWidget.style.fontSize="14px",this.previewWidget.style.color="white",this.previewWidget.style.filter="drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))",this.previewImage=document.createElement("img"),this.previewImage.style.width="100%",this.previewImage.style.height="100%",this.previewImage.style.objectFit="contain",this.previewImage.style.borderRadius="12px",this.previewImage.style.display="block",this.previewHotspotInfo=document.createElement("div"),this.previewHotspotInfo.style.display="none",this.previewHotspotInfo.style.position="absolute",this.previewHotspotInfo.style.bottom="10px",this.previewHotspotInfo.style.left="50%",this.previewHotspotInfo.style.transform="translateX(-50%)",this.previewHotspotInfo.style.padding="8px 12px",this.previewHotspotInfo.style.backgroundColor="rgba(0, 0, 0, 0.8)",this.previewHotspotInfo.style.borderRadius="20px",this.previewHotspotInfo.style.fontWeight="bold",this.previewHotspotInfo.style.fontSize="12px",this.previewHotspotInfo.style.whiteSpace="nowrap",this.previewHotspotInfo.style.maxWidth="90%",this.previewHotspotInfo.style.textAlign="center",this.previewHotspotInfo.style.overflow="hidden",this.previewHotspotInfo.style.textOverflow="ellipsis",this.previewWidget.appendChild(this.previewImage),this.previewWidget.appendChild(this.previewHotspotInfo),this.container.appendChild(this.previewWidget))}updatePreviewWidgetPosition(t,e){if(!this.previewWidget||!this.container)return;let n=this.container.getBoundingClientRect(),r=n.height*.5*(530/1e3),o=30,a;t<n.width/2?a=n.width-r-o:a=o,this.previewWidget.style.left=`${a}px`}showPreviewWidget(t){if(!this.previewWidget||!this.previewImage||!this.previewHotspotInfo)return;let e=this.meshToPhotoData.get(t);e&&(this.previewHotspotInfo.style.display="none",this.previewHotspotInfo.style.backgroundColor="rgba(0, 0, 0, 0.8)",this.previewHotspotInfo.style.fontSize="12px",this.previewImage.style.opacity="1",this.previewImage.style.transition="",this.currentMatchedHotspot=null,this.previewImage.src=e.url,this.previewWidget.style.display="block",this.previewWidget.style.opacity="1")}updatePreviewWidgetHotspot(t){if(this.previewHotspotInfo){if(t){let e=this.formatHotspotDisplay(t);this.previewHotspotInfo.innerHTML=e,this.previewHotspotInfo.style.display="block"}else this.previewHotspotInfo.style.display="none";this.currentMatchedHotspot=t}}hidePreviewWidget(){this.previewWidget&&(this.previewWidget.style.opacity="0",setTimeout(()=>{this.previewWidget&&(this.previewWidget.style.display="none")},200))}animatePreviewWidgetDrop(t){if(!(!this.previewWidget||!this.previewImage||!this.previewHotspotInfo))if(t){this.previewImage.style.transition="opacity 0.3s ease-out",this.previewImage.style.opacity="0",this.previewHotspotInfo.style.display="block",this.previewHotspotInfo.style.backgroundColor="rgba(34, 197, 94, 0.9)",this.previewHotspotInfo.style.fontSize="14px";let e=this.formatHotspotDisplay(t);this.previewHotspotInfo.innerHTML=`\u2705 ${e}`,setTimeout(()=>{this.hidePreviewWidget(),setTimeout(()=>{this.previewImage&&(this.previewImage.style.opacity="1",this.previewImage.style.transition=""),this.previewHotspotInfo&&(this.previewHotspotInfo.style.display="none",this.previewHotspotInfo.style.backgroundColor="rgba(0, 0, 0, 0.8)",this.previewHotspotInfo.style.fontSize="12px",this.previewHotspotInfo.innerHTML=""),this.currentMatchedHotspot=null},300)},2e3)}else this.hidePreviewWidget()}parseHotspotGroupId(t){if(!t||!t.startsWith("s-"))return null;try{let n=t.substring(2).split(","),i={};for(let r of n){let[o,a]=r.split("=");if(o&&a){let l=a.trim(),c=parseInt(l,10),h=!isNaN(c)&&c.toString()===l?c:l;i[o.trim()]=h}}return Object.keys(i).length>0?i:null}catch(e){return console.warn("Failed to parse hotspot group ID:",t,e),null}}formatHotspotDisplay(t){let e=Object.entries(t);return e.length===0?"":e.map(([n,i])=>{let r;n==="plausibility"?r="Potential":r=n.replace(/_/g," ").split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ");let o=i;return n==="plausibility"&&typeof i=="number"?o={0:"Preposterous",25:"Possible",50:"Plausible",75:"Probable",100:"Projected"}[i]||i:typeof i=="string"&&(o=i.replace(/_/g," ").split(" ").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ")),`${r}: ${o}`}).join("<br>")}findHotspotAtMeshPosition(t,e){if(!this.svgContainer)return null;let n=new N;t.getWorldPosition(n);let i=n.clone();i.project(this.camera);let r=this.renderer.domElement,o=(i.x*.5+.5)*r.clientWidth,a=(i.y*-.5+.5)*r.clientHeight,l=this.svgContainer.querySelector("svg");if(!l)return null;let c=r.getBoundingClientRect(),h=c.left+o,u=c.top+a,d=this.svgContainer.getBoundingClientRect(),p=h-d.left,g=u-d.top,y,m;try{let w=l.createSVGPoint();w.x=h,w.y=u;let T=l.getScreenCTM();if(T){let x=w.matrixTransform(T.inverse());y=x.x,m=x.y}else throw new Error("No screenCTM available")}catch{if(l.viewBox.baseVal.width>0&&l.viewBox.baseVal.height>0){let T=l.getBoundingClientRect();y=p/T.width*l.viewBox.baseVal.width,m=g/T.height*l.viewBox.baseVal.height}else y=p,m=g}let f=l.querySelectorAll('[id^="hit"]');for(let w of f){let T=w,x=l.createSVGPoint();x.x=y,x.y=m;let R=!1;if("isPointInFill"in w&&typeof w.isPointInFill=="function")try{R=w.isPointInFill(x)}catch{let A=T.getBBox();R=y>=A.x&&y<=A.x+A.width&&m>=A.y&&m<=A.y+A.height}else{let C=T.getBBox();R=y>=C.x&&y<=C.x+C.width&&m>=C.y&&m<=C.y+C.height}if(R){let C=w.parentElement?.closest("g");if(C&&C.id){let A=this.parseHotspotGroupId(C.id);return A||{hotspot:C.id}}}}return null}checkHotspotCollision(t,e){return st(this,null,function*(){let n=this.findHotspotAtMeshPosition(t,e);if(n&&this.onHotspotDropCallback)try{let i={x:t.position.x,y:t.position.y,z:t.position.z};yield this.onHotspotDropCallback(e,n,i)}catch(i){console.error("Error in hotspot drop callback:",i)}})}disableDragForMesh(t){this.dragCallbacks.delete(t)}disableAllDragging(){this.dragCallbacks.clear(),this.meshToPhotoId.clear(),this.isDragging=!1,this.draggedMesh=null,this.renderer?.domElement&&(this.renderer.domElement.style.cursor="default")}setupDragAndDrop(){if(!this.container){console.warn("Container not available for drag setup");return}let t=this.renderer.domElement;t.addEventListener("mousedown",e=>{this.updateMousePosition(e),this.onMouseDown(e)}),t.addEventListener("mousemove",e=>{this.updateMousePosition(e),this.onMouseMove(e)}),t.addEventListener("mouseup",()=>{this.onMouseUp()}),t.addEventListener("wheel",e=>{this.onMouseWheel(e)},{passive:!1}),t.addEventListener("dblclick",e=>{this.onDoubleClick(e)}),t.addEventListener("touchstart",e=>{if(e.touches.length===1){this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousedown",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseDown(n)}else e.touches.length===2&&e.preventDefault()}),t.addEventListener("touchmove",e=>{if(e.touches.length===1){e.preventDefault(),this.updateMousePositionFromTouch(e.touches[0]);let n=new MouseEvent("mousemove",{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY});this.onMouseMove(n)}}),t.addEventListener("touchend",()=>{this.onMouseUp()}),window.addEventListener("keydown",e=>{this.onKeyDown(e)})}updateMousePosition(t){if(!this.container)return;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updatePreviewWidgetPosition(t.clientX-e.left,t.clientY-e.top)}updateMousePositionFromTouch(t){if(!this.container)return;let e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updatePreviewWidgetPosition(t.clientX-e.left,t.clientY-e.top)}onMouseDown(t){this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1);if(e.length>0){let n=e[0].object;if(this.dragCallbacks.has(n)){this.isDragging=!0,this.draggedMesh=n;let i=new N;this.camera.getWorldDirection(i),this.dragPlane.setFromNormalAndCoplanarPoint(i,n.position);let r=new N;if(this.raycaster.ray.intersectPlane(this.dragPlane,r),this.dragOffset.copy(r).sub(n.position),this.renderer.domElement.style.cursor="grabbing",this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragStart){let o=this.meshToPhotoData.get(n);if(o){let a={x:n.position.x,y:n.position.y,z:n.position.z};this.currentLayoutStrategy.onPhotoDragStart(o,a)}}return}}this.userControlEnabled&&!this.autoFitEnabled&&(this.isPanning=!0,this.panStartMouse.set(t.clientX,t.clientY),this.panStartCameraPos.set(this.targetCamX,this.targetCamY,this.targetCamZ),this.renderer.domElement.style.cursor="grabbing")}onMouseMove(t){if(this.isDragging&&this.draggedMesh){this.raycaster.setFromCamera(this.mouse,this.camera);let e=new N;if(this.raycaster.ray.intersectPlane(this.dragPlane,e)){let n=e.sub(this.dragOffset);this.draggedMesh.position.copy(n);let i=this.findPhotoIdForMesh(this.draggedMesh);if(i){let o=this.findHotspotAtMeshPosition(this.draggedMesh,i);this.updatePreviewWidgetHotspot(o)}let r=this.dragCallbacks.get(this.draggedMesh);if(r&&r({x:n.x,y:n.y,z:n.z}),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragMove){let o=this.meshToPhotoData.get(this.draggedMesh);if(o){let a={x:n.x,y:n.y,z:n.z};this.currentLayoutStrategy.onPhotoDragMove(o,a)}}}}else if(this.isPanning){let e=t.clientX-this.panStartMouse.x,n=t.clientY-this.panStartMouse.y;this.panCamera(e,n),this.panStartMouse.set(t.clientX,t.clientY)}else{this.raycaster.setFromCamera(this.mouse,this.camera);let e=this.raycaster.intersectObjects(this.root.children,!1);if(e.length>0&&this.dragCallbacks.has(e[0].object)){let n=e[0].object;this.renderer.domElement.style.cursor="grab",this.hoveredMesh!==n&&(this.hoveredMesh=n,this.showPreviewWidget(n))}else this.renderer.domElement.style.cursor="default",this.hoveredMesh&&(this.hoveredMesh=null,this.hidePreviewWidget())}}onMouseUp(){if(this.isDragging&&this.draggedMesh){let t=this.draggedMesh;if(this.isDragging=!1,this.animatePreviewWidgetDrop(this.currentMatchedHotspot),this.currentLayoutStrategy&&this.currentLayoutStrategy.onPhotoDragEnd){let e=this.meshToPhotoData.get(t);if(e){let n={x:t.position.x,y:t.position.y,z:t.position.z};this.currentLayoutStrategy.onPhotoDragEnd(e,n)}}if(this.isInteractiveLayout()){let e=this.findPhotoIdForMesh(t);e&&this.checkHotspotCollision(t,e)}this.draggedMesh=null,this.hoveredMesh=null,this.currentMatchedHotspot=null,this.renderer.domElement.style.cursor="default"}else this.isPanning&&(this.isPanning=!1,this.renderer.domElement.style.cursor="default")}onMouseWheel(t){if(!this.userControlEnabled)return;t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1);let e=t.deltaMode===0,n=t.deltaY,r=(e?n*.01:n)>0?1.05:.95;this.zoomAtPoint(r,t.clientX,t.clientY)}onDoubleClick(t){if(!this.userControlEnabled)return;t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1);let e=t.shiftKey?1.6:.6;this.animatedZoomAtPoint(e,t.clientX,t.clientY,.4)}onKeyDown(t){if(!this.userControlEnabled)return;let e=50;switch(t.key){case"ArrowUp":t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1),this.panCamera(0,e);break;case"ArrowDown":t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1),this.panCamera(0,-e);break;case"ArrowLeft":t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1),this.panCamera(e,0);break;case"ArrowRight":t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1),this.panCamera(-e,0);break;case"+":case"=":t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1);let n=this.container.clientWidth/2,i=this.container.clientHeight/2;this.zoomAtPoint(.9,n,i);break;case"-":case"_":t.preventDefault(),this.autoFitEnabled&&(this.autoFitEnabled=!1);let r=this.container.clientWidth/2,o=this.container.clientHeight/2;this.zoomAtPoint(1.1,r,o);break;case"r":case"R":t.preventDefault(),this.resetCameraView(!0);break}}removeSvgBackground(){this.svgBackgroundPlane&&(this.scene.remove(this.svgBackgroundPlane),this.svgBackgroundPlane.geometry.dispose(),this.svgBackgroundPlane.material instanceof qe&&this.svgBackgroundPlane.material.dispose(),this.svgBackgroundPlane=void 0),this.svgBackgroundTexture&&(this.svgBackgroundTexture.dispose(),this.svgBackgroundTexture=void 0),this.svgContainer&&(this.svgContainer.remove(),this.svgContainer=null),this.svgBackgroundOptions=void 0}dispose(){this.isInitialized&&(window.removeEventListener("resize",this.onResize),this.textureCache.forEach(t=>t.dispose()),this.textureCache.clear(),this.loadingTextures.clear(),this.highResTextureCache.forEach(t=>t.dispose()),this.highResTextureCache.clear(),this.loadingHighResTextures.clear(),this.removeSvgBackground(),this.previewWidget&&(this.previewWidget.remove(),this.previewWidget=null,this.previewImage=null,this.previewHotspotInfo=null),this.dragCallbacks.clear(),this.isDragging=!1,this.draggedMesh=null,this.hoveredMesh=null,this.currentMatchedHotspot=null,this.renderer?.dispose(),this.scene?.clear(),this.meshToUrl.clear(),this.highResActive.clear(),this.rafRunning=!1,this.isInitialized=!1)}initializeThreeJS(){return st(this,null,function*(){this.renderer=new Uo({antialias:!0,alpha:!1}),this.renderer.outputColorSpace=xe,this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.container.appendChild(this.renderer.domElement),this.setupDragAndDrop(),this.createPreviewWidget(),this.scene=new _s,this.scene.background=new Vt(this.BG),this.svgBackgroundOptions?.enabled&&this.setupSvgBackground(this.svgBackgroundOptions);let t=this.container.clientWidth/this.container.clientHeight;this.camera=new Se(this.FOV_DEG,t,.1,1e5),this.targetCamZ=this.computeFitZWithMargin({minX:-this.PHOTO_W,maxX:this.PHOTO_W,minY:-this.PHOTO_H,maxY:this.PHOTO_H},fe.degToRad(this.camera.fov),this.container.clientWidth/this.container.clientHeight,this.CAM_MARGIN),this.zSpawn=this.targetCamZ/2,this.camera.position.set(0,0,this.targetCamZ),this.camera.lookAt(0,0,0),this.root=new An,this.scene.add(this.root),this.scene.add(new Ms(16777215,1)),this.texLoader=new bs,this.texLoader.setCrossOrigin("anonymous"),window.addEventListener("resize",this.onResize),this.clock=new Ss,this.startRenderLoop()})}startRenderLoop(){if(this.rafRunning)return;this.rafRunning=!0;let t=()=>{if(!this.rafRunning)return;let e=this.clock.getDelta();this.activeTweens=this.activeTweens.filter(n=>!n(e)),this.camera.position.x=this.damp(this.camera.position.x,this.targetCamX,this.CAM_DAMP,e),this.camera.position.y=this.damp(this.camera.position.y,this.targetCamY,this.CAM_DAMP,e),this.camera.position.z=this.damp(this.camera.position.z,this.targetCamZ,this.CAM_DAMP,e),this.camera.lookAt(this.targetCamX,this.targetCamY,0),this.renderer.render(this.scene,this.camera),this.lodAccumTime+=e,this.lodAccumTime>=.2&&(this.lodAccumTime=0,this.runLodPass()),requestAnimationFrame(t)};requestAnimationFrame(t)}onResize=()=>{if(!this.container||!this.isInitialized)return;let t=this.container.clientWidth,e=this.container.clientHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()};loadTexture(t){return st(this,null,function*(){if(this.textureCache.has(t))return this.textureCache.get(t);if(this.loadingTextures.has(t))return this.loadingTextures.get(t);let e=this.loadAndDownscaleImage(t).then(n=>(n.colorSpace=xe,n.minFilter=nn,n.magFilter=De,n.anisotropy=this.ANISO,n.generateMipmaps=!0,n.wrapS=n.wrapT=Qe,this.textureCache.set(t,n),this.loadingTextures.delete(t),n)).catch(n=>{throw this.loadingTextures.delete(t),n});return this.loadingTextures.set(t,e),e})}loadHighResTexture(t){return st(this,null,function*(){if(this.highResTextureCache.has(t))return this.highResTextureCache.get(t);if(this.loadingHighResTextures.has(t))return this.loadingHighResTextures.get(t);let e=this.loadFullResolutionImage(t).then(n=>(n.colorSpace=xe,n.minFilter=nn,n.magFilter=De,n.anisotropy=this.ANISO,n.generateMipmaps=!0,n.wrapS=n.wrapT=Qe,this.highResTextureCache.set(t,n),this.loadingHighResTextures.delete(t),n)).catch(n=>{throw console.error("Failed to load high-res texture:",t,n),this.loadingHighResTextures.delete(t),n});return this.loadingHighResTextures.set(t,e),e})}loadFullResolutionImage(t){return st(this,null,function*(){return new Promise((e,n)=>{let i=new Image;i.crossOrigin="anonymous",i.onload=()=>{try{let r=new ze(i);r.needsUpdate=!0,e(r)}catch(r){n(r)}},i.onerror=()=>{n(new Error(`Failed to load full-res image: ${t}`))},i.src=t})})}loadAndDownscaleImage(t){return st(this,null,function*(){let e=Ut.MAX_TEXTURE_DIMENSION;return new Promise((n,i)=>{let r=new Image;r.crossOrigin="anonymous",r.onload=()=>{try{let{width:o,height:a}=r;if(o<=e&&a<=e){let g=new ze(r);g.needsUpdate=!0,n(g);return}let l=o/a,c,h;o>a?(c=Math.min(e,o),h=c/l):(h=Math.min(e,a),c=h*l);let u=document.createElement("canvas"),d=u.getContext("2d");if(!d){i(new Error("Could not get 2D context from canvas"));return}u.width=Math.round(c),u.height=Math.round(h),d.drawImage(r,0,0,o,a,0,0,u.width,u.height);let p=new Vi(u);p.needsUpdate=!0,n(p)}catch(o){i(o)}},r.onerror=()=>{i(new Error(`Failed to load image: ${t}`))},r.src=t})})}setupSvgBackground(t){if(!t.svgElement){console.warn("\u274C No SVG element provided to setupSvgBackground");return}let e=new XMLSerializer().serializeToString(t.svgElement),n=document.createElement("canvas"),i=n.getContext("2d"),r=t.svgElement.getAttribute("width"),o=t.svgElement.getAttribute("height"),a=parseInt(r||"0")||this.container.clientWidth,l=parseInt(o||"0")||this.container.clientHeight;n.width=a,n.height=l;let c=new Image;c.onload=()=>{i.clearRect(0,0,n.width,n.height),i.drawImage(c,0,0,n.width,n.height),this.svgBackgroundTexture=new Vi(n),this.svgBackgroundTexture.needsUpdate=!0;let d=t.radius||2e4,p=new Yn(d*2,d*2),g=new pn({map:this.svgBackgroundTexture,transparent:!0,opacity:.8});this.svgBackgroundPlane=new Pe(p,g),this.svgBackgroundPlane.position.set(0,0,-1),this.svgBackgroundPlane.renderOrder=-1e3,t.offsetX&&(this.svgBackgroundPlane.position.x+=t.offsetX),t.offsetY&&(this.svgBackgroundPlane.position.y+=t.offsetY),t.scale&&this.svgBackgroundPlane.scale.setScalar(t.scale),this.scene.add(this.svgBackgroundPlane)},c.onerror=d=>{console.error("\u274C Failed to load SVG image:",d)};let h=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(h);c.src=u}computeFitZWithMargin(t,e,n,i){let r=t.maxX-t.minX,o=t.maxY-t.minY,a=r+2*i,c=(o+2*i)*.5/Math.tan(e*.5),h=2*Math.atan(Math.tan(e*.5)*n),u=a*.5/Math.tan(h*.5);return Math.max(c,u)*1.1}clamp01(t){return Math.max(0,Math.min(1,t))}zoomAtCursor(t){if(!this.container)return;this.autoFitEnabled&&(this.autoFitEnabled=!1);let e=this.container.getBoundingClientRect(),n=this.lastClientX??e.left+e.width/2,i=this.lastClientY??e.top+e.height/2;this.animatedZoomAtPoint(t,n,i,.3)}animatedZoomAtPoint(t,e,n,i){if(!this.userControlEnabled||this.autoFitEnabled)return;let r=this.targetCamZ,o=this.targetCamX,a=this.targetCamY,l=fe.clamp(r*t,this.minCamZ,this.maxCamZ),c=this.container.getBoundingClientRect(),h=(e-c.left)/c.width*2-1,u=-((n-c.top)/c.height)*2+1,d=this.projectScreenToWorld(h,u,o,a,r),p=this.projectScreenToWorld(h,u,o,a,l),g=o+(d.x-p.x),y=a+(d.y-p.y);this.runTween(this.makeTween(i,m=>{this.targetCamZ=fe.lerp(r,l,m),this.targetCamX=fe.lerp(o,g,m),this.targetCamY=fe.lerp(a,y,m)}))}runLodPass(){if(!this.container)return;let t=240,e=160;for(let n of this.root.children){let i=n,r=this.meshToUrl.get(i);if(!r)continue;let o=this.highResActive.has(i),a=Math.max(.001,Math.abs(i.position.z-this.camera.position.z)),l=this.getVisibleWidthAtDepth(a)*2,c=this.container.clientWidth/Math.max(1,l),h=this.PHOTO_W*c;!o&&h>=t?this.upgradeToHighResTexture(i,r).then(()=>{this.highResActive.add(i)}).catch(()=>{}):o&&h<=e&&this.downgradeToLowResTexture(i,r).then(()=>{this.highResActive.delete(i)}).catch(()=>{})}}static \u0275fac=function(e){return new(e||s)};static \u0275prov=Ns({token:s,factory:s.\u0275fac,providedIn:"root"})};var Ym=["container"];function qm(s,t){if(s&1){let e=ko();re(0,"div",22)(1,"div",6),Ge(2,"div",30),Ee(),re(3,"div",8)(4,"button",31),hn("click",function(){on(e);let i=Vo();return an(i.toggleSvgAutoPositioning())}),ln(),re(5,"svg",10),Ge(6,"path",32),Ee()()()()}if(s&2){let e=Vo();Ie(2),Ze("active",e.enableSvgAutoPositioning()),Ie(2),Ze("active",e.enableSvgAutoPositioning())}}var hh=class s{constructor(t,e,n,i,r,o){this.route=t;this.changeDetectorRef=e;this.apiService=n;this.http=i;this.platform=r;this.rendererService=o;this.activatedRoute=t,this.photoRepository=new Zs,this.loop.pipe(fl()).subscribe(l=>st(this,null,function*(){if(l=l.sort((c,h)=>c.created_at.localeCompare(h.created_at)),this.lastCreatedAt==="0"&&l.length>0){let c=l.map(u=>st(this,null,function*(){let d=u._id,p=u.screenshot_url,g=u.transition_bar_position||this.getDefaultTransitionBarPosition(u),y={id:d,url:p,created_at:u.created_at,screenshot_url:p,author_id:u.author_id,layout_x:u.layout_x,layout_y:u.layout_y,plausibility:u.plausibility,favorable_future:u.favorable_future,transition_bar_position:g};console.log("[METADATA] Initial load:",d,"-> plausibility:",u.plausibility,"favorable_future:",u.favorable_future,"transition_bar_position:",g);try{yield this.photoRepository.addPhoto(y),this.loadedPhotoIds.add(d)}catch(m){console.error("Error loading photo immediately:",m)}}));yield Promise.all(c),this.qrSmall.set(!0);let h=l[l.length-1];this.lastCreatedAt=h.created_at}else{console.log("lastCreatedAt:",this.lastCreatedAt);let c=l.filter(h=>{let u=h.created_at;return u&&u>this.lastCreatedAt});if(console.log("num new items:",c.length),c.length>0){let h=c.map(u=>st(this,null,function*(){let d=u._id,p=u.screenshot_url,g=u.transition_bar_position||this.getDefaultTransitionBarPosition(u),y={id:d,url:p,created_at:u.created_at,screenshot_url:p,author_id:u.author_id,plausibility:u.plausibility,favorable_future:u.favorable_future,transition_bar_position:g};console.log("[METADATA] New photo:",d,"-> plausibility:",u.plausibility,"favorable_future:",u.favorable_future,"transition_bar_position:",g);try{yield this.photoRepository.addPhoto(y),this.loadedPhotoIds.add(d),this.lastCreatedAt=u.created_at}catch(m){console.error("Error adding photo to queue:",m)}}));yield Promise.all(h)}}this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase()),setTimeout(()=>{this.destroy$.closed||this.getItems().subscribe(c=>{this.loop.next(c)})},Qt.API_POLLING_INTERVAL)}));let a=this.activatedRoute.snapshot.queryParams;this.workspace.set(a.workspace||"WORKSPACE_NOT_SET"),this.api_key.set(a.api_key||"API_KEY_NOT_SET"),this.admin_key.set(a.admin_key||"ADMIN_KEY_NOT_SET"),this.lang.set(a.lang?a.lang+"/":""),n.updateFromRoute(this.activatedRoute.snapshot),n.api_key.set(this.admin_key())}container;photoRepository;activatedRoute;destroy$=new Qn;loop=new Qn;lastCreatedAt="0";qrSmall=Ve(!1);workspace=Ve("");api_key=Ve("");admin_key=Ve("");lang=Ve("");currentLayout=Ve("circle-packing");enableRandomShowcase=Ve(!1);enableSvgAutoPositioning=Ve(!1);loadedPhotoIds=new Set;layoutChangeInProgress=!1;qrUrl=ts(()=>`https://mapfutur.es/${this.lang()}prescan?workspace=${this.workspace()}&api_key=${this.api_key()}&ws=true`);toggleRandomShowcase(){this.enableRandomShowcase.set(!this.enableRandomShowcase()),this.photoRepository.setRandomShowcaseEnabled(this.enableRandomShowcase())}toggleSvgAutoPositioning(){let t=this.enableSvgAutoPositioning(),e=!t;console.log("[TOGGLE] SVG Auto-Positioning button clicked"),console.log("[TOGGLE] Current state:",{wasEnabled:t,willBeEnabled:e,currentLayout:this.currentLayout()}),this.enableSvgAutoPositioning.set(e),this.photoRepository.setSvgAutoPositioningEnabled(e),this.currentLayout()==="svg"?(console.log("[TOGGLE] On SVG layout, refreshing layout..."),this.photoRepository.refreshLayout(),setTimeout(()=>{e&&(console.log("[TOGGLE] Auto-positioning now enabled, showing debug visualization"),this.showSvgHotspotDebugVisualization())},100)):console.log("[TOGGLE] Not on SVG layout, skipping visualization")}showSvgHotspotDebugVisualization(){try{let t=this.photoRepository.getLayoutStrategy();if(console.log("[HOTSPOT-VIZ] Got strategy:",t?.constructor.name),!t){console.warn("[HOTSPOT-VIZ] No layout strategy available");return}let e=t.showAllHotspotsDebug;typeof e=="function"?(console.log("[HOTSPOT-VIZ] Calling showAllHotspotsDebug()..."),e.call(t),console.log("[HOTSPOT-VIZ] Successfully called showAllHotspotsDebug()")):console.warn("[HOTSPOT-VIZ] showAllHotspotsDebug is not a function:",typeof e)}catch(t){console.error("[HOTSPOT-VIZ] Error showing visualization:",t)}}getDefaultTransitionBarPosition(t){if(t.transition_bar_position)return t.transition_bar_position;let e=["before","during","after"],n=0,i=t._id||"";for(let o=0;o<i.length;o++){let a=i.charCodeAt(o);n=(n<<5)-n+a,n=n&n}let r=Math.abs(n)%3;return e[r]}getItems(){let t={};return this.api_key()&&(t.headers={Authorization:this.api_key()}),this.http.get(`https://chronomaps-api-qjzuw7ypfq-ez.a.run.app/${this.workspace()}/items?page_size=10000`,t).pipe(dl(e=>(console.error("Error loading items:",e),hl([]))))}ngAfterViewInit(){return st(this,null,function*(){this.platform.browser()&&(yield this.initialize(this.container.nativeElement))})}initialize(t){return st(this,null,function*(){yield this.rendererService.initialize(t,{photoWidth:Ut.PHOTO_WIDTH,photoHeight:Ut.PHOTO_HEIGHT});let e=new es({photoWidth:Ut.PHOTO_WIDTH,photoHeight:Ut.PHOTO_HEIGHT,spacingX:Ut.SPACING_X,spacingY:Ut.SPACING_Y,useRandomPositioning:!0});if(yield this.photoRepository.initialize(e,this.rendererService,{enableRandomShowcase:this.enableRandomShowcase(),showcaseInterval:Qt.SHOWCASE_INTERVAL,newPhotoAnimationDelay:Qt.NEW_PHOTO_ANIMATION_DELAY}),this.currentLayout()!=="grid")switch(this.currentLayout()){case"circle-packing":yield this.switchToCirclePackingLayout();break;case"tsne":yield this.switchToTsneLayout();break;case"svg":yield this.switchToSvgLayout();break}this.photoRepository.photoAdded$.pipe(Us(this.destroy$)).subscribe(n=>{}),this.photoRepository.photoRemoved$.pipe(Us(this.destroy$)).subscribe(n=>{}),this.photoRepository.layoutChanged$.pipe(Us(this.destroy$)).subscribe(()=>{}),this.platform.browser()&&ul(Qt.INITIAL_POLLING_DELAY).subscribe(()=>{this.getItems().subscribe(n=>{this.loop.next(n)})})})}switchToTsneLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){if(!this.workspace()){console.error("Workspace not set");return}this.layoutChangeInProgress=!0;try{this.currentLayout.set("tsne");let t=new Xs(this.workspace(),void 0,{photoWidth:Ut.PHOTO_WIDTH,photoHeight:Ut.PHOTO_HEIGHT,spacingX:Ut.SPACING_X,spacingY:Ut.SPACING_Y});yield t.initialize(),this.rendererService.removeSvgBackground(),this.rendererService.disableAllDragging(),yield this.photoRepository.setLayoutStrategy(t)}catch(t){console.error("Error switching to TSNE layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToGridLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("grid");let t=new es({photoWidth:Ut.PHOTO_WIDTH,photoHeight:Ut.PHOTO_HEIGHT,spacingX:Ut.SPACING_X,spacingY:Ut.SPACING_Y,useRandomPositioning:!0});yield t.initialize(),this.rendererService.removeSvgBackground(),this.rendererService.disableAllDragging(),yield this.photoRepository.setLayoutStrategy(t)}catch(t){console.error("Error switching to Grid layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToSvgLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("svg");let t=new Ys({svgPath:"/showcase-bg.svg",centerX:0,centerY:0,circleRadius:2e4,radiusVariation:2e3}),e=2e4;this.rendererService.setHotspotDropCallback((i,r,o)=>st(this,null,function*(){return new Promise((a,l)=>{try{if(this.photoRepository.getPhoto(i)){let h=Math.max(-1,Math.min(1,o.x/e)),u=Math.max(-1,Math.min(1,o.y/e)),d=bn(kt({},r),{layout_x:h,layout_y:u});console.log("\u{1F680} SHOWCASE: Calling updateItem API",{hotspotData:d,photoId:i,normalizedPosition:{layout_x:h,layout_y:u},originalPosition:o}),this.apiService.updateProperties(d,i).subscribe({next:p=>{console.log("Successfully updated item with hotspot data:",p),a()},error:p=>{console.error("Failed to update item with hotspot data:",p),l(p)}})}else console.warn("Photo not found for hotspot drop:",i),a()}catch(c){console.error("Error processing hotspot drop:",c),l(c)}})})),yield this.photoRepository.setLayoutStrategy(t),this.rendererService.setLayoutStrategyReference(t);let n=t.getSvgElement();n?this.rendererService.setSvgBackground(n,{scale:1,offsetX:0,offsetY:0,radius:2e4}):console.warn("\u274C SVG element is null, cannot set background")}catch(t){console.error("Error switching to SVG layout:",t)}finally{this.layoutChangeInProgress=!1}}})}switchToCirclePackingLayout(){return st(this,null,function*(){if(!this.layoutChangeInProgress){this.layoutChangeInProgress=!0;try{this.currentLayout.set("circle-packing");let t=new qs({photoWidth:Ut.PHOTO_WIDTH,photoHeight:Ut.PHOTO_HEIGHT,spacingX:Ut.SPACING_X,spacingY:Ut.SPACING_Y,groupBuffer:1500,photoBuffer:0});this.rendererService.removeSvgBackground(),this.rendererService.disableAllDragging(),yield this.photoRepository.setLayoutStrategy(t)}catch(t){console.error("Error switching to Circle Packing layout:",t)}finally{this.layoutChangeInProgress=!1}}})}getLayoutIndicatorTransform(){return`translateX(${(this.currentLayout()==="grid"?0:this.currentLayout()==="tsne"?1:this.currentLayout()==="svg"?2:3)*48}px)`}resetView(){this.rendererService.resetCameraView(!0)}zoomIn(){this.rendererService.zoomAtCursor(.65)}zoomOut(){this.rendererService.zoomAtCursor(1.5)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static \u0275fac=function(e){return new(e||s)(cn(xl),cn(yl),cn(bl),cn(vl),cn(Vs),cn(Fo))};static \u0275cmp=Fs({type:s,selectors:[["app-showcase-ws"]],viewQuery:function(e,n){if(e&1&&zs(Ym,7),e&2){let i;Hs(i=ks())&&(n.container=i.first)}},decls:47,vars:17,consts:[["container",""],[1,"container"],[3,"small","url"],[1,"logo"],[1,"controls-container"],[1,"control-tab","layout-tab"],[1,"tab-background"],[1,"selection-indicator"],[1,"tab-buttons"],["title","Grid Layout",1,"tab-button","layout-button",3,"click"],["viewBox","0 0 24 24",1,"button-icon"],["x","12","y","16","text-anchor","middle","font-family","Arial, sans-serif","font-weight","bold","font-size","14"],["title","TSNE Layout",1,"tab-button","layout-button",3,"click"],["title","SVG Layout",1,"tab-button","layout-button",3,"click"],["title","Circle Packing Layout",1,"tab-button","layout-button",3,"click"],[1,"control-tab","showcase-tab"],[1,"showcase-indicator"],["title","Toggle Random Showcase",1,"tab-button","showcase-button",3,"click"],["cx","12","cy","8","r","2","fill","currentColor"],["cx","12","cy","16","r","2","fill","currentColor"],["cx","6","cy","12","r","2","fill","currentColor"],["cx","18","cy","12","r","2","fill","currentColor"],[1,"control-tab","svg-auto-tab"],[1,"control-tab","camera-tab"],["title","Zoom In (+)",1,"tab-button","camera-button",3,"click"],["d","M12 5v14M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Zoom Out (-)",1,"tab-button","camera-button",3,"click"],["d","M5 12h14","stroke","currentColor","stroke-width","2","stroke-linecap","round"],["title","Reset View (R)",1,"tab-button","camera-button",3,"click"],["d","M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z","fill","currentColor"],[1,"svg-auto-indicator"],["title","Toggle SVG Auto-Positioning",1,"tab-button","svg-auto-button",3,"click"],["d","M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z","fill","currentColor"]],template:function(e,n){if(e&1){let i=ko();Ge(0,"div",1,0)(2,"app-qrcode",2)(3,"div",3),re(4,"div",4)(5,"div",5)(6,"div",6),Ge(7,"div",7),Ee(),re(8,"div",8)(9,"button",9),hn("click",function(){return on(i),an(n.switchToGridLayout())}),ln(),re(10,"svg",10)(11,"text",11),Qi(12,"G"),Ee()()(),Un(),re(13,"button",12),hn("click",function(){return on(i),an(n.switchToTsneLayout())}),ln(),re(14,"svg",10)(15,"text",11),Qi(16,"T"),Ee()()(),Un(),re(17,"button",13),hn("click",function(){return on(i),an(n.switchToSvgLayout())}),ln(),re(18,"svg",10)(19,"text",11),Qi(20,"S"),Ee()()(),Un(),re(21,"button",14),hn("click",function(){return on(i),an(n.switchToCirclePackingLayout())}),ln(),re(22,"svg",10)(23,"text",11),Qi(24,"C"),Ee()()()()(),Un(),re(25,"div",15)(26,"div",6),Ge(27,"div",16),Ee(),re(28,"div",8)(29,"button",17),hn("click",function(){return on(i),an(n.toggleRandomShowcase())}),ln(),re(30,"svg",10),Ge(31,"circle",18)(32,"circle",19)(33,"circle",20)(34,"circle",21),Ee()()()(),ml(35,qm,7,4,"div",22),Un(),re(36,"div",23)(37,"div",8)(38,"button",24),hn("click",function(){return on(i),an(n.zoomIn())}),ln(),re(39,"svg",10),Ge(40,"path",25),Ee()(),Un(),re(41,"button",26),hn("click",function(){return on(i),an(n.zoomOut())}),ln(),re(42,"svg",10),Ge(43,"path",27),Ee()(),Un(),re(44,"button",28),hn("click",function(){return on(i),an(n.resetView())}),ln(),re(45,"svg",10),Ge(46,"path",29),Ee()()()()()}e&2&&(Ie(2),gl("small",n.qrSmall())("url",n.qrUrl()),Ie(5),Bs("transform",n.getLayoutIndicatorTransform()),Ie(2),Ze("active",n.currentLayout()==="grid"),Ie(4),Ze("active",n.currentLayout()==="tsne"),Ie(4),Ze("active",n.currentLayout()==="svg"),Ie(4),Ze("active",n.currentLayout()==="circle-packing"),Ie(6),Ze("active",n.enableRandomShowcase()),Ie(2),Ze("active",n.enableRandomShowcase()),Ie(6),_l(n.currentLayout()==="svg"?35:-1))},dependencies:[Gs],styles:[`

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
[_nghost-%COMP%] {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
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
  z-index: 10;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  z-index: 1000;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%] {
  position: relative;
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%]   .tab-background[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%]   .tab-buttons[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  display: flex;
  padding: 8px;
  gap: 4px;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%] {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #666;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%]:hover {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%]   .tab-button.active[_ngcontent-%COMP%] {
  color: white;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .control-tab[_ngcontent-%COMP%]   .tab-button[_ngcontent-%COMP%]   .button-icon[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  pointer-events: none;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .layout-tab[_ngcontent-%COMP%]   .selection-indicator[_ngcontent-%COMP%] {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 44px;
  height: 44px;
  background: #ccc;
  border-radius: 8px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .showcase-tab[_ngcontent-%COMP%]   .showcase-indicator[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  transition: background-color 0.3s ease;
  border-radius: 12px 12px 0 0;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .showcase-tab[_ngcontent-%COMP%]   .showcase-indicator.active[_ngcontent-%COMP%] {
  background: #4CAF50;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .showcase-tab[_ngcontent-%COMP%]   .showcase-button.active[_ngcontent-%COMP%] {
  color: white;
}
[_nghost-%COMP%]   .controls-container[_ngcontent-%COMP%]   .camera-tab[_ngcontent-%COMP%]   .camera-button[_ngcontent-%COMP%]:hover {
  color: #2196F3;
  background: rgba(33, 150, 243, 0.1);
}`]})};export{hh as ShowcaseWsComponent};
/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/
