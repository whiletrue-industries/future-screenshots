import{a as yo,b as Po,c as Ui,d as Hi,h as ji}from"./chunk-TPHK2LQT.js";import{a as be,b as $c,c as Gc,f as Uc,g as Hc,i as jc}from"./chunk-UAD4KZV2.js";import{A as pi,Aa as nn,Ab as Vc,B as Ce,Ba as D,Bb as jt,C as de,Ca as G,D as fi,Da as Y,E as oe,Ea as Dt,F as Pc,Fa as ct,G as Ft,Ga as St,H as Cc,Ha as Et,Ia as Tc,J as Sn,Ja as na,Ka as Wt,La as qt,M as tn,Ma as Yt,Na as xr,Oa as Pe,Pa as ui,Qa as vo,Sa as di,T as xc,Ta as mi,U as Tt,Ua as gi,V as wt,W as Ot,X as Gt,Za as Jt,_ as Xn,a as $,aa as Jn,b as vt,ba as bc,bb as ia,c as mc,ca as Ec,cb as wc,d as gc,da as mo,db as Gi,e as _c,ea as X,g as hi,ga as go,h as fo,ha as De,i as Be,ia as j,ib as It,j as $i,jb as se,ka as et,la as _t,lb as Oc,m as vc,mb as kc,na as Sc,nb as Ac,ob as rn,pa as Nt,pb as Ic,q as Dn,qb as Lc,ra as ve,rb as Rc,s as re,sa as dt,sb as Fc,t as yc,ta as ye,tb as Nc,u as Cr,ua as yt,ub as Bc,v as je,va as _o,vb as me,w as Yn,wa as kt,wb as Dc,x as ea,xa as Mn,xb as xe,y as Ze,ya as Mc,yb as on,z as uo,za as en,zb as zc}from"./chunk-OGAAX4ED.js";var dl=gc((exports,module)=>{"use strict";typeof navigator<"u"&&function(t,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self,t.lottie=e());}(exports,function(){"use strict";var svgNS="http://www.w3.org/2000/svg",locationHref="",_useWebWorker=!1,initialDefaultFrame=-999999,setWebWorker=function(e){_useWebWorker=!!e;},getWebWorker=function(){return _useWebWorker;},setLocationHref=function(e){locationHref=e;},getLocationHref=function(){return locationHref;};function createTag(t){return document.createElement(t);}function extendPrototype(t,e){var n,i=t.length,o;for(n=0;n<i;n+=1){o=t[n].prototype;for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e.prototype[s]=o[s]);}}function getDescriptor(t,e){return Object.getOwnPropertyDescriptor(t,e);}function createProxyFunction(t){function e(){}return e.prototype=t,e;}var audioControllerFactory=function(){function t(e){this.audios=[],this.audioFactory=e,this._volume=1,this._isMuted=!1;}return t.prototype={addAudio:function(n){this.audios.push(n);},pause:function(){var n,i=this.audios.length;for(n=0;n<i;n+=1)this.audios[n].pause();},resume:function(){var n,i=this.audios.length;for(n=0;n<i;n+=1)this.audios[n].resume();},setRate:function(n){var i,o=this.audios.length;for(i=0;i<o;i+=1)this.audios[i].setRate(n);},createAudio:function(n){return this.audioFactory?this.audioFactory(n):window.Howl?new window.Howl({src:[n]}):{isPlaying:!1,play:function(){this.isPlaying=!0;},seek:function(){this.isPlaying=!1;},playing:function(){},rate:function(){},setVolume:function(){}};},setAudioFactory:function(n){this.audioFactory=n;},setVolume:function(n){this._volume=n,this._updateVolume();},mute:function(){this._isMuted=!0,this._updateVolume();},unmute:function(){this._isMuted=!1,this._updateVolume();},getVolume:function(){return this._volume;},_updateVolume:function(){var n,i=this.audios.length;for(n=0;n<i;n+=1)this.audios[n].volume(this._volume*(this._isMuted?0:1));}},function(){return new t();};}(),createTypedArray=function(){function t(n,i){var o=0,s=[],l;switch(n){case"int16":case"uint8c":l=1;break;default:l=1.1;break;}for(o=0;o<i;o+=1)s.push(l);return s;}function e(n,i){return n==="float32"?new Float32Array(i):n==="int16"?new Int16Array(i):n==="uint8c"?new Uint8ClampedArray(i):t(n,i);}return typeof Uint8ClampedArray=="function"&&typeof Float32Array=="function"?e:t;}();function createSizedArray(t){return Array.apply(null,{length:t});}function _typeof$6(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof$6=function(n){return typeof n;}:_typeof$6=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof$6(t);}var subframeEnabled=!0,expressionsPlugin=null,expressionsInterfaces=null,idPrefix$1="",isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),_shouldRoundValues=!1,bmPow=Math.pow,bmSqrt=Math.sqrt,bmFloor=Math.floor,bmMax=Math.max,bmMin=Math.min,BMMath={};(function(){var t=["abs","acos","acosh","asin","asinh","atan","atanh","atan2","ceil","cbrt","expm1","clz32","cos","cosh","exp","floor","fround","hypot","imul","log","log1p","log2","log10","max","min","pow","random","round","sign","sin","sinh","sqrt","tan","tanh","trunc","E","LN10","LN2","LOG10E","LOG2E","PI","SQRT1_2","SQRT2"],e,n=t.length;for(e=0;e<n;e+=1)BMMath[t[e]]=Math[t[e]];})();function ProjectInterface$1(){return{};}BMMath.random=Math.random,BMMath.abs=function(t){var e=_typeof$6(t);if(e==="object"&&t.length){var n=createSizedArray(t.length),i,o=t.length;for(i=0;i<o;i+=1)n[i]=Math.abs(t[i]);return n;}return Math.abs(t);};var defaultCurveSegments=150,degToRads=Math.PI/180,roundCorner=.5519;function roundValues(t){_shouldRoundValues=!!t;}function bmRnd(t){return _shouldRoundValues?Math.round(t):t;}function styleDiv(t){t.style.position="absolute",t.style.top=0,t.style.left=0,t.style.display="block",t.style.transformOrigin="0 0",t.style.webkitTransformOrigin="0 0",t.style.backfaceVisibility="visible",t.style.webkitBackfaceVisibility="visible",t.style.transformStyle="preserve-3d",t.style.webkitTransformStyle="preserve-3d",t.style.mozTransformStyle="preserve-3d";}function BMEnterFrameEvent(t,e,n,i){this.type=t,this.currentTime=e,this.totalTime=n,this.direction=i<0?-1:1;}function BMCompleteEvent(t,e){this.type=t,this.direction=e<0?-1:1;}function BMCompleteLoopEvent(t,e,n,i){this.type=t,this.currentLoop=n,this.totalLoops=e,this.direction=i<0?-1:1;}function BMSegmentStartEvent(t,e,n){this.type=t,this.firstFrame=e,this.totalFrames=n;}function BMDestroyEvent(t,e){this.type=t,this.target=e;}function BMRenderFrameErrorEvent(t,e){this.type="renderFrameError",this.nativeError=t,this.currentTime=e;}function BMConfigErrorEvent(t){this.type="configError",this.nativeError=t;}function BMAnimationConfigErrorEvent(t,e){this.type=t,this.nativeError=e;}var createElementID=function(){var t=0;return function(){return t+=1,idPrefix$1+"__lottie_element_"+t;};}();function HSVtoRGB(t,e,n){var i,o,s,l,h,p,u,m;switch(l=Math.floor(t*6),h=t*6-l,p=n*(1-e),u=n*(1-h*e),m=n*(1-(1-h)*e),l%6){case 0:i=n,o=m,s=p;break;case 1:i=u,o=n,s=p;break;case 2:i=p,o=n,s=m;break;case 3:i=p,o=u,s=n;break;case 4:i=m,o=p,s=n;break;case 5:i=n,o=p,s=u;break;default:break;}return[i,o,s];}function RGBtoHSV(t,e,n){var i=Math.max(t,e,n),o=Math.min(t,e,n),s=i-o,l,h=i===0?0:s/i,p=i/255;switch(i){case o:l=0;break;case t:l=e-n+s*(e<n?6:0),l/=6*s;break;case e:l=n-t+s*2,l/=6*s;break;case n:l=t-e+s*4,l/=6*s;break;default:break;}return[l,h,p];}function addSaturationToRGB(t,e){var n=RGBtoHSV(t[0]*255,t[1]*255,t[2]*255);return n[1]+=e,n[1]>1?n[1]=1:n[1]<=0&&(n[1]=0),HSVtoRGB(n[0],n[1],n[2]);}function addBrightnessToRGB(t,e){var n=RGBtoHSV(t[0]*255,t[1]*255,t[2]*255);return n[2]+=e,n[2]>1?n[2]=1:n[2]<0&&(n[2]=0),HSVtoRGB(n[0],n[1],n[2]);}function addHueToRGB(t,e){var n=RGBtoHSV(t[0]*255,t[1]*255,t[2]*255);return n[0]+=e/360,n[0]>1?n[0]-=1:n[0]<0&&(n[0]+=1),HSVtoRGB(n[0],n[1],n[2]);}var rgbToHex=function(){var t=[],e,n;for(e=0;e<256;e+=1)n=e.toString(16),t[e]=n.length===1?"0"+n:n;return function(i,o,s){return i<0&&(i=0),o<0&&(o=0),s<0&&(s=0),"#"+t[i]+t[o]+t[s];};}(),setSubframeEnabled=function(e){subframeEnabled=!!e;},getSubframeEnabled=function(){return subframeEnabled;},setExpressionsPlugin=function(e){expressionsPlugin=e;},getExpressionsPlugin=function(){return expressionsPlugin;},setExpressionInterfaces=function(e){expressionsInterfaces=e;},getExpressionInterfaces=function(){return expressionsInterfaces;},setDefaultCurveSegments=function(e){defaultCurveSegments=e;},getDefaultCurveSegments=function(){return defaultCurveSegments;},setIdPrefix=function(e){idPrefix$1=e;},getIdPrefix=function(){return idPrefix$1;};function createNS(t){return document.createElementNS(svgNS,t);}function _typeof$5(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof$5=function(n){return typeof n;}:_typeof$5=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof$5(t);}var dataManager=function(){var t=1,e=[],n,i,o={onmessage:function(){},postMessage:function(g){n({data:g});}},s={postMessage:function(g){o.onmessage({data:g});}};function l(d){if(window.Worker&&window.Blob&&getWebWorker()){var g=new Blob(["var _workerSelf = self; self.onmessage = ",d.toString()],{type:"text/javascript"}),E=URL.createObjectURL(g);return new Worker(E);}return n=d,o;}function h(){i||(i=l(function(g){function E(){function k(W,w){var F,x,M=W.length,z,B,J,tt;for(x=0;x<M;x+=1)if(F=W[x],"ks"in F&&!F.completed){if(F.completed=!0,F.hasMask){var K=F.masksProperties;for(B=K.length,z=0;z<B;z+=1)if(K[z].pt.k.i)O(K[z].pt.k);else for(tt=K[z].pt.k.length,J=0;J<tt;J+=1)K[z].pt.k[J].s&&O(K[z].pt.k[J].s[0]),K[z].pt.k[J].e&&O(K[z].pt.k[J].e[0]);}F.ty===0?(F.layers=y(F.refId,w),k(F.layers,w)):F.ty===4?S(F.shapes):F.ty===5&&rt(F);}}function v(W,w){if(W){var F=0,x=W.length;for(F=0;F<x;F+=1)W[F].t===1&&(W[F].data.layers=y(W[F].data.refId,w),k(W[F].data.layers,w));}}function C(W,w){for(var F=0,x=w.length;F<x;){if(w[F].id===W)return w[F];F+=1;}return null;}function y(W,w){var F=C(W,w);return F?F.layers.__used?JSON.parse(JSON.stringify(F.layers)):(F.layers.__used=!0,F.layers):null;}function S(W){var w,F=W.length,x,M;for(w=F-1;w>=0;w-=1)if(W[w].ty==="sh"){if(W[w].ks.k.i)O(W[w].ks.k);else for(M=W[w].ks.k.length,x=0;x<M;x+=1)W[w].ks.k[x].s&&O(W[w].ks.k[x].s[0]),W[w].ks.k[x].e&&O(W[w].ks.k[x].e[0]);}else W[w].ty==="gr"&&S(W[w].it);}function O(W){var w,F=W.i.length;for(w=0;w<F;w+=1)W.i[w][0]+=W.v[w][0],W.i[w][1]+=W.v[w][1],W.o[w][0]+=W.v[w][0],W.o[w][1]+=W.v[w][1];}function A(W,w){var F=w?w.split("."):[100,100,100];return W[0]>F[0]?!0:F[0]>W[0]?!1:W[1]>F[1]?!0:F[1]>W[1]?!1:W[2]>F[2]?!0:F[2]>W[2]?!1:null;}var R=function(){var W=[4,4,14];function w(x){var M=x.t.d;x.t.d={k:[{s:M,t:0}]};}function F(x){var M,z=x.length;for(M=0;M<z;M+=1)x[M].ty===5&&w(x[M]);}return function(x){if(A(W,x.v)&&(F(x.layers),x.assets)){var M,z=x.assets.length;for(M=0;M<z;M+=1)x.assets[M].layers&&F(x.assets[M].layers);}};}(),N=function(){var W=[4,7,99];return function(w){if(w.chars&&!A(W,w.v)){var F,x=w.chars.length;for(F=0;F<x;F+=1){var M=w.chars[F];M.data&&M.data.shapes&&(S(M.data.shapes),M.data.ip=0,M.data.op=99999,M.data.st=0,M.data.sr=1,M.data.ks={p:{k:[0,0],a:0},s:{k:[100,100],a:0},a:{k:[0,0],a:0},r:{k:0,a:0},o:{k:100,a:0}},w.chars[F].t||(M.data.shapes.push({ty:"no"}),M.data.shapes[0].it.push({p:{k:[0,0],a:0},s:{k:[100,100],a:0},a:{k:[0,0],a:0},r:{k:0,a:0},o:{k:100,a:0},sk:{k:0,a:0},sa:{k:0,a:0},ty:"tr"})));}}};}(),H=function(){var W=[5,7,15];function w(x){var M=x.t.p;typeof M.a=="number"&&(M.a={a:0,k:M.a}),typeof M.p=="number"&&(M.p={a:0,k:M.p}),typeof M.r=="number"&&(M.r={a:0,k:M.r});}function F(x){var M,z=x.length;for(M=0;M<z;M+=1)x[M].ty===5&&w(x[M]);}return function(x){if(A(W,x.v)&&(F(x.layers),x.assets)){var M,z=x.assets.length;for(M=0;M<z;M+=1)x.assets[M].layers&&F(x.assets[M].layers);}};}(),it=function(){var W=[4,1,9];function w(x){var M,z=x.length,B,J;for(M=0;M<z;M+=1)if(x[M].ty==="gr")w(x[M].it);else if(x[M].ty==="fl"||x[M].ty==="st")if(x[M].c.k&&x[M].c.k[0].i)for(J=x[M].c.k.length,B=0;B<J;B+=1)x[M].c.k[B].s&&(x[M].c.k[B].s[0]/=255,x[M].c.k[B].s[1]/=255,x[M].c.k[B].s[2]/=255,x[M].c.k[B].s[3]/=255),x[M].c.k[B].e&&(x[M].c.k[B].e[0]/=255,x[M].c.k[B].e[1]/=255,x[M].c.k[B].e[2]/=255,x[M].c.k[B].e[3]/=255);else x[M].c.k[0]/=255,x[M].c.k[1]/=255,x[M].c.k[2]/=255,x[M].c.k[3]/=255;}function F(x){var M,z=x.length;for(M=0;M<z;M+=1)x[M].ty===4&&w(x[M].shapes);}return function(x){if(A(W,x.v)&&(F(x.layers),x.assets)){var M,z=x.assets.length;for(M=0;M<z;M+=1)x.assets[M].layers&&F(x.assets[M].layers);}};}(),nt=function(){var W=[4,4,18];function w(x){var M,z=x.length,B,J;for(M=z-1;M>=0;M-=1)if(x[M].ty==="sh"){if(x[M].ks.k.i)x[M].ks.k.c=x[M].closed;else for(J=x[M].ks.k.length,B=0;B<J;B+=1)x[M].ks.k[B].s&&(x[M].ks.k[B].s[0].c=x[M].closed),x[M].ks.k[B].e&&(x[M].ks.k[B].e[0].c=x[M].closed);}else x[M].ty==="gr"&&w(x[M].it);}function F(x){var M,z,B=x.length,J,tt,K,Pt;for(z=0;z<B;z+=1){if(M=x[z],M.hasMask){var xt=M.masksProperties;for(tt=xt.length,J=0;J<tt;J+=1)if(xt[J].pt.k.i)xt[J].pt.k.c=xt[J].cl;else for(Pt=xt[J].pt.k.length,K=0;K<Pt;K+=1)xt[J].pt.k[K].s&&(xt[J].pt.k[K].s[0].c=xt[J].cl),xt[J].pt.k[K].e&&(xt[J].pt.k[K].e[0].c=xt[J].cl);}M.ty===4&&w(M.shapes);}}return function(x){if(A(W,x.v)&&(F(x.layers),x.assets)){var M,z=x.assets.length;for(M=0;M<z;M+=1)x.assets[M].layers&&F(x.assets[M].layers);}};}();function Z(W){W.__complete||(it(W),R(W),N(W),H(W),nt(W),k(W.layers,W.assets),v(W.chars,W.assets),W.__complete=!0);}function rt(W){W.t.a.length===0&&"m"in W.t.p;}var Q={};return Q.completeData=Z,Q.checkColors=it,Q.checkChars=N,Q.checkPathProperties=H,Q.checkShapes=nt,Q.completeLayers=k,Q;}if(s.dataManager||(s.dataManager=E()),s.assetLoader||(s.assetLoader=function(){function k(C){var y=C.getResponseHeader("content-type");return y&&C.responseType==="json"&&y.indexOf("json")!==-1||C.response&&_typeof$5(C.response)==="object"?C.response:C.response&&typeof C.response=="string"?JSON.parse(C.response):C.responseText?JSON.parse(C.responseText):null;}function v(C,y,S,O){var A,R=new XMLHttpRequest();try{R.responseType="json";}catch{}R.onreadystatechange=function(){if(R.readyState===4)if(R.status===200)A=k(R),S(A);else try{A=k(R),S(A);}catch(N){O&&O(N);}};try{R.open(["G","E","T"].join(""),C,!0);}catch{R.open(["G","E","T"].join(""),y+"/"+C,!0);}R.send();}return{load:v};}()),g.data.type==="loadAnimation")s.assetLoader.load(g.data.path,g.data.fullPath,function(k){s.dataManager.completeData(k),s.postMessage({id:g.data.id,payload:k,status:"success"});},function(){s.postMessage({id:g.data.id,status:"error"});});else if(g.data.type==="complete"){var P=g.data.animation;s.dataManager.completeData(P),s.postMessage({id:g.data.id,payload:P,status:"success"});}else g.data.type==="loadData"&&s.assetLoader.load(g.data.path,g.data.fullPath,function(k){s.postMessage({id:g.data.id,payload:k,status:"success"});},function(){s.postMessage({id:g.data.id,status:"error"});});}),i.onmessage=function(d){var g=d.data,E=g.id,P=e[E];e[E]=null,g.status==="success"?P.onComplete(g.payload):P.onError&&P.onError();});}function p(d,g){t+=1;var E="processId_"+t;return e[E]={onComplete:d,onError:g},E;}function u(d,g,E){h();var P=p(g,E);i.postMessage({type:"loadAnimation",path:d,fullPath:window.location.origin+window.location.pathname,id:P});}function m(d,g,E){h();var P=p(g,E);i.postMessage({type:"loadData",path:d,fullPath:window.location.origin+window.location.pathname,id:P});}function b(d,g,E){h();var P=p(g,E);i.postMessage({type:"complete",animation:d,id:P});}return{loadAnimation:u,loadData:m,completeAnimation:b};}(),ImagePreloader=function(){var t=function(){var v=createTag("canvas");v.width=1,v.height=1;var C=v.getContext("2d");return C.fillStyle="rgba(0,0,0,0)",C.fillRect(0,0,1,1),v;}();function e(){this.loadedAssets+=1,this.loadedAssets===this.totalImages&&this.loadedFootagesCount===this.totalFootages&&this.imagesLoadedCb&&this.imagesLoadedCb(null);}function n(){this.loadedFootagesCount+=1,this.loadedAssets===this.totalImages&&this.loadedFootagesCount===this.totalFootages&&this.imagesLoadedCb&&this.imagesLoadedCb(null);}function i(v,C,y){var S="";if(v.e)S=v.p;else if(C){var O=v.p;O.indexOf("images/")!==-1&&(O=O.split("/")[1]),S=C+O;}else S=y,S+=v.u?v.u:"",S+=v.p;return S;}function o(v){var C=0,y=setInterval(function(){var S=v.getBBox();(S.width||C>500)&&(this._imageLoaded(),clearInterval(y)),C+=1;}.bind(this),50);}function s(v){var C=i(v,this.assetsPath,this.path),y=createNS("image");isSafari?this.testImageLoaded(y):y.addEventListener("load",this._imageLoaded,!1),y.addEventListener("error",function(){S.img=t,this._imageLoaded();}.bind(this),!1),y.setAttributeNS("http://www.w3.org/1999/xlink","href",C),this._elementHelper.append?this._elementHelper.append(y):this._elementHelper.appendChild(y);var S={img:y,assetData:v};return S;}function l(v){var C=i(v,this.assetsPath,this.path),y=createTag("img");y.crossOrigin="anonymous",y.addEventListener("load",this._imageLoaded,!1),y.addEventListener("error",function(){S.img=t,this._imageLoaded();}.bind(this),!1),y.src=C;var S={img:y,assetData:v};return S;}function h(v){var C={assetData:v},y=i(v,this.assetsPath,this.path);return dataManager.loadData(y,function(S){C.img=S,this._footageLoaded();}.bind(this),function(){C.img={},this._footageLoaded();}.bind(this)),C;}function p(v,C){this.imagesLoadedCb=C;var y,S=v.length;for(y=0;y<S;y+=1)v[y].layers||(!v[y].t||v[y].t==="seq"?(this.totalImages+=1,this.images.push(this._createImageData(v[y]))):v[y].t===3&&(this.totalFootages+=1,this.images.push(this.createFootageData(v[y]))));}function u(v){this.path=v||"";}function m(v){this.assetsPath=v||"";}function b(v){for(var C=0,y=this.images.length;C<y;){if(this.images[C].assetData===v)return this.images[C].img;C+=1;}return null;}function d(){this.imagesLoadedCb=null,this.images.length=0;}function g(){return this.totalImages===this.loadedAssets;}function E(){return this.totalFootages===this.loadedFootagesCount;}function P(v,C){v==="svg"?(this._elementHelper=C,this._createImageData=this.createImageData.bind(this)):this._createImageData=this.createImgData.bind(this);}function k(){this._imageLoaded=e.bind(this),this._footageLoaded=n.bind(this),this.testImageLoaded=o.bind(this),this.createFootageData=h.bind(this),this.assetsPath="",this.path="",this.totalImages=0,this.totalFootages=0,this.loadedAssets=0,this.loadedFootagesCount=0,this.imagesLoadedCb=null,this.images=[];}return k.prototype={loadAssets:p,setAssetsPath:m,setPath:u,loadedImages:g,loadedFootages:E,destroy:d,getAsset:b,createImgData:l,createImageData:s,imageLoaded:e,footageLoaded:n,setCacheType:P},k;}();function BaseEvent(){}BaseEvent.prototype={triggerEvent:function(e,n){if(this._cbs[e])for(var i=this._cbs[e],o=0;o<i.length;o+=1)i[o](n);},addEventListener:function(e,n){return this._cbs[e]||(this._cbs[e]=[]),this._cbs[e].push(n),function(){this.removeEventListener(e,n);}.bind(this);},removeEventListener:function(e,n){if(!n)this._cbs[e]=null;else if(this._cbs[e]){for(var i=0,o=this._cbs[e].length;i<o;)this._cbs[e][i]===n&&(this._cbs[e].splice(i,1),i-=1,o-=1),i+=1;this._cbs[e].length||(this._cbs[e]=null);}}};var markerParser=function(){function t(e){for(var n=e.split(`\r
`),i={},o,s=0,l=0;l<n.length;l+=1)o=n[l].split(":"),o.length===2&&(i[o[0]]=o[1].trim(),s+=1);if(s===0)throw new Error();return i;}return function(e){for(var n=[],i=0;i<e.length;i+=1){var o=e[i],s={time:o.tm,duration:o.dr};try{s.payload=JSON.parse(e[i].cm);}catch{try{s.payload=t(e[i].cm);}catch{s.payload={name:e[i].cm};}}n.push(s);}return n;};}(),ProjectInterface=function(){function t(e){this.compositions.push(e);}return function(){function e(n){for(var i=0,o=this.compositions.length;i<o;){if(this.compositions[i].data&&this.compositions[i].data.nm===n)return this.compositions[i].prepareFrame&&this.compositions[i].data.xt&&this.compositions[i].prepareFrame(this.currentFrame),this.compositions[i].compInterface;i+=1;}return null;}return e.compositions=[],e.currentFrame=0,e.registerComposition=t,e;};}(),renderers={},registerRenderer=function(e,n){renderers[e]=n;};function getRenderer(t){return renderers[t];}function getRegisteredRenderer(){if(renderers.canvas)return"canvas";for(var t in renderers)if(renderers[t])return t;return"";}function _typeof$4(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof$4=function(n){return typeof n;}:_typeof$4=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof$4(t);}var AnimationItem=function(){this._cbs=[],this.name="",this.path="",this.isLoaded=!1,this.currentFrame=0,this.currentRawFrame=0,this.firstFrame=0,this.totalFrames=0,this.frameRate=0,this.frameMult=0,this.playSpeed=1,this.playDirection=1,this.playCount=0,this.animationData={},this.assets=[],this.isPaused=!0,this.autoplay=!1,this.loop=!0,this.renderer=null,this.animationID=createElementID(),this.assetsPath="",this.timeCompleted=0,this.segmentPos=0,this.isSubframeEnabled=getSubframeEnabled(),this.segments=[],this._idle=!0,this._completedLoop=!1,this.projectInterface=ProjectInterface(),this.imagePreloader=new ImagePreloader(),this.audioController=audioControllerFactory(),this.markers=[],this.configAnimation=this.configAnimation.bind(this),this.onSetupError=this.onSetupError.bind(this),this.onSegmentComplete=this.onSegmentComplete.bind(this),this.drawnFrameEvent=new BMEnterFrameEvent("drawnFrame",0,0,0),this.expressionsPlugin=getExpressionsPlugin();};extendPrototype([BaseEvent],AnimationItem),AnimationItem.prototype.setParams=function(t){(t.wrapper||t.container)&&(this.wrapper=t.wrapper||t.container);var e="svg";t.animType?e=t.animType:t.renderer&&(e=t.renderer);var n=getRenderer(e);this.renderer=new n(this,t.rendererSettings),this.imagePreloader.setCacheType(e,this.renderer.globalData.defs),this.renderer.setProjectInterface(this.projectInterface),this.animType=e,t.loop===""||t.loop===null||t.loop===void 0||t.loop===!0?this.loop=!0:t.loop===!1?this.loop=!1:this.loop=parseInt(t.loop,10),this.autoplay="autoplay"in t?t.autoplay:!0,this.name=t.name?t.name:"",this.autoloadSegments=Object.prototype.hasOwnProperty.call(t,"autoloadSegments")?t.autoloadSegments:!0,this.assetsPath=t.assetsPath,this.initialSegment=t.initialSegment,t.audioFactory&&this.audioController.setAudioFactory(t.audioFactory),t.animationData?this.setupAnimation(t.animationData):t.path&&(t.path.lastIndexOf("\\")!==-1?this.path=t.path.substr(0,t.path.lastIndexOf("\\")+1):this.path=t.path.substr(0,t.path.lastIndexOf("/")+1),this.fileName=t.path.substr(t.path.lastIndexOf("/")+1),this.fileName=this.fileName.substr(0,this.fileName.lastIndexOf(".json")),dataManager.loadAnimation(t.path,this.configAnimation,this.onSetupError));},AnimationItem.prototype.onSetupError=function(){this.trigger("data_failed");},AnimationItem.prototype.setupAnimation=function(t){dataManager.completeAnimation(t,this.configAnimation);},AnimationItem.prototype.setData=function(t,e){e&&_typeof$4(e)!=="object"&&(e=JSON.parse(e));var n={wrapper:t,animationData:e},i=t.attributes;n.path=i.getNamedItem("data-animation-path")?i.getNamedItem("data-animation-path").value:i.getNamedItem("data-bm-path")?i.getNamedItem("data-bm-path").value:i.getNamedItem("bm-path")?i.getNamedItem("bm-path").value:"",n.animType=i.getNamedItem("data-anim-type")?i.getNamedItem("data-anim-type").value:i.getNamedItem("data-bm-type")?i.getNamedItem("data-bm-type").value:i.getNamedItem("bm-type")?i.getNamedItem("bm-type").value:i.getNamedItem("data-bm-renderer")?i.getNamedItem("data-bm-renderer").value:i.getNamedItem("bm-renderer")?i.getNamedItem("bm-renderer").value:getRegisteredRenderer()||"canvas";var o=i.getNamedItem("data-anim-loop")?i.getNamedItem("data-anim-loop").value:i.getNamedItem("data-bm-loop")?i.getNamedItem("data-bm-loop").value:i.getNamedItem("bm-loop")?i.getNamedItem("bm-loop").value:"";o==="false"?n.loop=!1:o==="true"?n.loop=!0:o!==""&&(n.loop=parseInt(o,10));var s=i.getNamedItem("data-anim-autoplay")?i.getNamedItem("data-anim-autoplay").value:i.getNamedItem("data-bm-autoplay")?i.getNamedItem("data-bm-autoplay").value:i.getNamedItem("bm-autoplay")?i.getNamedItem("bm-autoplay").value:!0;n.autoplay=s!=="false",n.name=i.getNamedItem("data-name")?i.getNamedItem("data-name").value:i.getNamedItem("data-bm-name")?i.getNamedItem("data-bm-name").value:i.getNamedItem("bm-name")?i.getNamedItem("bm-name").value:"";var l=i.getNamedItem("data-anim-prerender")?i.getNamedItem("data-anim-prerender").value:i.getNamedItem("data-bm-prerender")?i.getNamedItem("data-bm-prerender").value:i.getNamedItem("bm-prerender")?i.getNamedItem("bm-prerender").value:"";l==="false"&&(n.prerender=!1),n.path?this.setParams(n):this.trigger("destroy");},AnimationItem.prototype.includeLayers=function(t){t.op>this.animationData.op&&(this.animationData.op=t.op,this.totalFrames=Math.floor(t.op-this.animationData.ip));var e=this.animationData.layers,n,i=e.length,o=t.layers,s,l=o.length;for(s=0;s<l;s+=1)for(n=0;n<i;){if(e[n].id===o[s].id){e[n]=o[s];break;}n+=1;}if((t.chars||t.fonts)&&(this.renderer.globalData.fontManager.addChars(t.chars),this.renderer.globalData.fontManager.addFonts(t.fonts,this.renderer.globalData.defs)),t.assets)for(i=t.assets.length,n=0;n<i;n+=1)this.animationData.assets.push(t.assets[n]);this.animationData.__complete=!1,dataManager.completeAnimation(this.animationData,this.onSegmentComplete);},AnimationItem.prototype.onSegmentComplete=function(t){this.animationData=t;var e=getExpressionsPlugin();e&&e.initExpressions(this),this.loadNextSegment();},AnimationItem.prototype.loadNextSegment=function(){var t=this.animationData.segments;if(!t||t.length===0||!this.autoloadSegments){this.trigger("data_ready"),this.timeCompleted=this.totalFrames;return;}var e=t.shift();this.timeCompleted=e.time*this.frameRate;var n=this.path+this.fileName+"_"+this.segmentPos+".json";this.segmentPos+=1,dataManager.loadData(n,this.includeLayers.bind(this),function(){this.trigger("data_failed");}.bind(this));},AnimationItem.prototype.loadSegments=function(){var t=this.animationData.segments;t||(this.timeCompleted=this.totalFrames),this.loadNextSegment();},AnimationItem.prototype.imagesLoaded=function(){this.trigger("loaded_images"),this.checkLoaded();},AnimationItem.prototype.preloadImages=function(){this.imagePreloader.setAssetsPath(this.assetsPath),this.imagePreloader.setPath(this.path),this.imagePreloader.loadAssets(this.animationData.assets,this.imagesLoaded.bind(this));},AnimationItem.prototype.configAnimation=function(t){if(this.renderer)try{this.animationData=t,this.initialSegment?(this.totalFrames=Math.floor(this.initialSegment[1]-this.initialSegment[0]),this.firstFrame=Math.round(this.initialSegment[0])):(this.totalFrames=Math.floor(this.animationData.op-this.animationData.ip),this.firstFrame=Math.round(this.animationData.ip)),this.renderer.configAnimation(t),t.assets||(t.assets=[]),this.assets=this.animationData.assets,this.frameRate=this.animationData.fr,this.frameMult=this.animationData.fr/1e3,this.renderer.searchExtraCompositions(t.assets),this.markers=markerParser(t.markers||[]),this.trigger("config_ready"),this.preloadImages(),this.loadSegments(),this.updaFrameModifier(),this.waitForFontsLoaded(),this.isPaused&&this.audioController.pause();}catch(e){this.triggerConfigError(e);}},AnimationItem.prototype.waitForFontsLoaded=function(){this.renderer&&(this.renderer.globalData.fontManager.isLoaded?this.checkLoaded():setTimeout(this.waitForFontsLoaded.bind(this),20));},AnimationItem.prototype.checkLoaded=function(){if(!this.isLoaded&&this.renderer.globalData.fontManager.isLoaded&&(this.imagePreloader.loadedImages()||this.renderer.rendererType!=="canvas")&&this.imagePreloader.loadedFootages()){this.isLoaded=!0;var t=getExpressionsPlugin();t&&t.initExpressions(this),this.renderer.initItems(),setTimeout(function(){this.trigger("DOMLoaded");}.bind(this),0),this.gotoFrame(),this.autoplay&&this.play();}},AnimationItem.prototype.resize=function(t,e){var n=typeof t=="number"?t:void 0,i=typeof e=="number"?e:void 0;this.renderer.updateContainerSize(n,i);},AnimationItem.prototype.setSubframe=function(t){this.isSubframeEnabled=!!t;},AnimationItem.prototype.gotoFrame=function(){this.currentFrame=this.isSubframeEnabled?this.currentRawFrame:~~this.currentRawFrame,this.timeCompleted!==this.totalFrames&&this.currentFrame>this.timeCompleted&&(this.currentFrame=this.timeCompleted),this.trigger("enterFrame"),this.renderFrame(),this.trigger("drawnFrame");},AnimationItem.prototype.renderFrame=function(){if(!(this.isLoaded===!1||!this.renderer))try{this.expressionsPlugin&&this.expressionsPlugin.resetFrame(),this.renderer.renderFrame(this.currentFrame+this.firstFrame);}catch(t){this.triggerRenderFrameError(t);}},AnimationItem.prototype.play=function(t){t&&this.name!==t||this.isPaused===!0&&(this.isPaused=!1,this.trigger("_play"),this.audioController.resume(),this._idle&&(this._idle=!1,this.trigger("_active")));},AnimationItem.prototype.pause=function(t){t&&this.name!==t||this.isPaused===!1&&(this.isPaused=!0,this.trigger("_pause"),this._idle=!0,this.trigger("_idle"),this.audioController.pause());},AnimationItem.prototype.togglePause=function(t){t&&this.name!==t||(this.isPaused===!0?this.play():this.pause());},AnimationItem.prototype.stop=function(t){t&&this.name!==t||(this.pause(),this.playCount=0,this._completedLoop=!1,this.setCurrentRawFrameValue(0));},AnimationItem.prototype.getMarkerData=function(t){for(var e,n=0;n<this.markers.length;n+=1)if(e=this.markers[n],e.payload&&e.payload.name===t)return e;return null;},AnimationItem.prototype.goToAndStop=function(t,e,n){if(!(n&&this.name!==n)){var i=Number(t);if(isNaN(i)){var o=this.getMarkerData(t);o&&this.goToAndStop(o.time,!0);}else e?this.setCurrentRawFrameValue(t):this.setCurrentRawFrameValue(t*this.frameModifier);this.pause();}},AnimationItem.prototype.goToAndPlay=function(t,e,n){if(!(n&&this.name!==n)){var i=Number(t);if(isNaN(i)){var o=this.getMarkerData(t);o&&(o.duration?this.playSegments([o.time,o.time+o.duration],!0):this.goToAndStop(o.time,!0));}else this.goToAndStop(i,e,n);this.play();}},AnimationItem.prototype.advanceTime=function(t){if(!(this.isPaused===!0||this.isLoaded===!1)){var e=this.currentRawFrame+t*this.frameModifier,n=!1;e>=this.totalFrames-1&&this.frameModifier>0?!this.loop||this.playCount===this.loop?this.checkSegments(e>this.totalFrames?e%this.totalFrames:0)||(n=!0,e=this.totalFrames-1):e>=this.totalFrames?(this.playCount+=1,this.checkSegments(e%this.totalFrames)||(this.setCurrentRawFrameValue(e%this.totalFrames),this._completedLoop=!0,this.trigger("loopComplete"))):this.setCurrentRawFrameValue(e):e<0?this.checkSegments(e%this.totalFrames)||(this.loop&&!(this.playCount--<=0&&this.loop!==!0)?(this.setCurrentRawFrameValue(this.totalFrames+e%this.totalFrames),this._completedLoop?this.trigger("loopComplete"):this._completedLoop=!0):(n=!0,e=0)):this.setCurrentRawFrameValue(e),n&&(this.setCurrentRawFrameValue(e),this.pause(),this.trigger("complete"));}},AnimationItem.prototype.adjustSegment=function(t,e){this.playCount=0,t[1]<t[0]?(this.frameModifier>0&&(this.playSpeed<0?this.setSpeed(-this.playSpeed):this.setDirection(-1)),this.totalFrames=t[0]-t[1],this.timeCompleted=this.totalFrames,this.firstFrame=t[1],this.setCurrentRawFrameValue(this.totalFrames-.001-e)):t[1]>t[0]&&(this.frameModifier<0&&(this.playSpeed<0?this.setSpeed(-this.playSpeed):this.setDirection(1)),this.totalFrames=t[1]-t[0],this.timeCompleted=this.totalFrames,this.firstFrame=t[0],this.setCurrentRawFrameValue(.001+e)),this.trigger("segmentStart");},AnimationItem.prototype.setSegment=function(t,e){var n=-1;this.isPaused&&(this.currentRawFrame+this.firstFrame<t?n=t:this.currentRawFrame+this.firstFrame>e&&(n=e-t)),this.firstFrame=t,this.totalFrames=e-t,this.timeCompleted=this.totalFrames,n!==-1&&this.goToAndStop(n,!0);},AnimationItem.prototype.playSegments=function(t,e){if(e&&(this.segments.length=0),_typeof$4(t[0])==="object"){var n,i=t.length;for(n=0;n<i;n+=1)this.segments.push(t[n]);}else this.segments.push(t);this.segments.length&&e&&this.adjustSegment(this.segments.shift(),0),this.isPaused&&this.play();},AnimationItem.prototype.resetSegments=function(t){this.segments.length=0,this.segments.push([this.animationData.ip,this.animationData.op]),t&&this.checkSegments(0);},AnimationItem.prototype.checkSegments=function(t){return this.segments.length?(this.adjustSegment(this.segments.shift(),t),!0):!1;},AnimationItem.prototype.destroy=function(t){t&&this.name!==t||!this.renderer||(this.renderer.destroy(),this.imagePreloader.destroy(),this.trigger("destroy"),this._cbs=null,this.onEnterFrame=null,this.onLoopComplete=null,this.onComplete=null,this.onSegmentStart=null,this.onDestroy=null,this.renderer=null,this.expressionsPlugin=null,this.imagePreloader=null,this.projectInterface=null);},AnimationItem.prototype.setCurrentRawFrameValue=function(t){this.currentRawFrame=t,this.gotoFrame();},AnimationItem.prototype.setSpeed=function(t){this.playSpeed=t,this.updaFrameModifier();},AnimationItem.prototype.setDirection=function(t){this.playDirection=t<0?-1:1,this.updaFrameModifier();},AnimationItem.prototype.setLoop=function(t){this.loop=t;},AnimationItem.prototype.setVolume=function(t,e){e&&this.name!==e||this.audioController.setVolume(t);},AnimationItem.prototype.getVolume=function(){return this.audioController.getVolume();},AnimationItem.prototype.mute=function(t){t&&this.name!==t||this.audioController.mute();},AnimationItem.prototype.unmute=function(t){t&&this.name!==t||this.audioController.unmute();},AnimationItem.prototype.updaFrameModifier=function(){this.frameModifier=this.frameMult*this.playSpeed*this.playDirection,this.audioController.setRate(this.playSpeed*this.playDirection);},AnimationItem.prototype.getPath=function(){return this.path;},AnimationItem.prototype.getAssetsPath=function(t){var e="";if(t.e)e=t.p;else if(this.assetsPath){var n=t.p;n.indexOf("images/")!==-1&&(n=n.split("/")[1]),e=this.assetsPath+n;}else e=this.path,e+=t.u?t.u:"",e+=t.p;return e;},AnimationItem.prototype.getAssetData=function(t){for(var e=0,n=this.assets.length;e<n;){if(t===this.assets[e].id)return this.assets[e];e+=1;}return null;},AnimationItem.prototype.hide=function(){this.renderer.hide();},AnimationItem.prototype.show=function(){this.renderer.show();},AnimationItem.prototype.getDuration=function(t){return t?this.totalFrames:this.totalFrames/this.frameRate;},AnimationItem.prototype.updateDocumentData=function(t,e,n){try{var i=this.renderer.getElementByPath(t);i.updateDocumentData(e,n);}catch{}},AnimationItem.prototype.trigger=function(t){if(this._cbs&&this._cbs[t])switch(t){case"enterFrame":this.triggerEvent(t,new BMEnterFrameEvent(t,this.currentFrame,this.totalFrames,this.frameModifier));break;case"drawnFrame":this.drawnFrameEvent.currentTime=this.currentFrame,this.drawnFrameEvent.totalTime=this.totalFrames,this.drawnFrameEvent.direction=this.frameModifier,this.triggerEvent(t,this.drawnFrameEvent);break;case"loopComplete":this.triggerEvent(t,new BMCompleteLoopEvent(t,this.loop,this.playCount,this.frameMult));break;case"complete":this.triggerEvent(t,new BMCompleteEvent(t,this.frameMult));break;case"segmentStart":this.triggerEvent(t,new BMSegmentStartEvent(t,this.firstFrame,this.totalFrames));break;case"destroy":this.triggerEvent(t,new BMDestroyEvent(t,this));break;default:this.triggerEvent(t);}t==="enterFrame"&&this.onEnterFrame&&this.onEnterFrame.call(this,new BMEnterFrameEvent(t,this.currentFrame,this.totalFrames,this.frameMult)),t==="loopComplete"&&this.onLoopComplete&&this.onLoopComplete.call(this,new BMCompleteLoopEvent(t,this.loop,this.playCount,this.frameMult)),t==="complete"&&this.onComplete&&this.onComplete.call(this,new BMCompleteEvent(t,this.frameMult)),t==="segmentStart"&&this.onSegmentStart&&this.onSegmentStart.call(this,new BMSegmentStartEvent(t,this.firstFrame,this.totalFrames)),t==="destroy"&&this.onDestroy&&this.onDestroy.call(this,new BMDestroyEvent(t,this));},AnimationItem.prototype.triggerRenderFrameError=function(t){var e=new BMRenderFrameErrorEvent(t,this.currentFrame);this.triggerEvent("error",e),this.onError&&this.onError.call(this,e);},AnimationItem.prototype.triggerConfigError=function(t){var e=new BMConfigErrorEvent(t,this.currentFrame);this.triggerEvent("error",e),this.onError&&this.onError.call(this,e);};var animationManager=function(){var t={},e=[],n=0,i=0,o=0,s=!0,l=!1;function h(w){for(var F=0,x=w.target;F<i;)e[F].animation===x&&(e.splice(F,1),F-=1,i-=1,x.isPaused||b()),F+=1;}function p(w,F){if(!w)return null;for(var x=0;x<i;){if(e[x].elem===w&&e[x].elem!==null)return e[x].animation;x+=1;}var M=new AnimationItem();return d(M,w),M.setData(w,F),M;}function u(){var w,F=e.length,x=[];for(w=0;w<F;w+=1)x.push(e[w].animation);return x;}function m(){o+=1,it();}function b(){o-=1;}function d(w,F){w.addEventListener("destroy",h),w.addEventListener("_active",m),w.addEventListener("_idle",b),e.push({elem:F,animation:w}),i+=1;}function g(w){var F=new AnimationItem();return d(F,null),F.setParams(w),F;}function E(w,F){var x;for(x=0;x<i;x+=1)e[x].animation.setSpeed(w,F);}function P(w,F){var x;for(x=0;x<i;x+=1)e[x].animation.setDirection(w,F);}function k(w){var F;for(F=0;F<i;F+=1)e[F].animation.play(w);}function v(w){var F=w-n,x;for(x=0;x<i;x+=1)e[x].animation.advanceTime(F);n=w,o&&!l?window.requestAnimationFrame(v):s=!0;}function C(w){n=w,window.requestAnimationFrame(v);}function y(w){var F;for(F=0;F<i;F+=1)e[F].animation.pause(w);}function S(w,F,x){var M;for(M=0;M<i;M+=1)e[M].animation.goToAndStop(w,F,x);}function O(w){var F;for(F=0;F<i;F+=1)e[F].animation.stop(w);}function A(w){var F;for(F=0;F<i;F+=1)e[F].animation.togglePause(w);}function R(w){var F;for(F=i-1;F>=0;F-=1)e[F].animation.destroy(w);}function N(w,F,x){var M=[].concat([].slice.call(document.getElementsByClassName("lottie")),[].slice.call(document.getElementsByClassName("bodymovin"))),z,B=M.length;for(z=0;z<B;z+=1)x&&M[z].setAttribute("data-bm-type",x),p(M[z],w);if(F&&B===0){x||(x="svg");var J=document.getElementsByTagName("body")[0];J.innerText="";var tt=createTag("div");tt.style.width="100%",tt.style.height="100%",tt.setAttribute("data-bm-type",x),J.appendChild(tt),p(tt,w);}}function H(){var w;for(w=0;w<i;w+=1)e[w].animation.resize();}function it(){!l&&o&&s&&(window.requestAnimationFrame(C),s=!1);}function nt(){l=!0;}function Z(){l=!1,it();}function rt(w,F){var x;for(x=0;x<i;x+=1)e[x].animation.setVolume(w,F);}function Q(w){var F;for(F=0;F<i;F+=1)e[F].animation.mute(w);}function W(w){var F;for(F=0;F<i;F+=1)e[F].animation.unmute(w);}return t.registerAnimation=p,t.loadAnimation=g,t.setSpeed=E,t.setDirection=P,t.play=k,t.pause=y,t.stop=O,t.togglePause=A,t.searchAnimations=N,t.resize=H,t.goToAndStop=S,t.destroy=R,t.freeze=nt,t.unfreeze=Z,t.setVolume=rt,t.mute=Q,t.unmute=W,t.getRegisteredAnimations=u,t;}(),BezierFactory=function(){var t={};t.getBezierEasing=n;var e={};function n(C,y,S,O,A){var R=A||("bez_"+C+"_"+y+"_"+S+"_"+O).replace(/\./g,"p");if(e[R])return e[R];var N=new v([C,y,S,O]);return e[R]=N,N;}var i=4,o=.001,s=1e-7,l=10,h=11,p=1/(h-1),u=typeof Float32Array=="function";function m(C,y){return 1-3*y+3*C;}function b(C,y){return 3*y-6*C;}function d(C){return 3*C;}function g(C,y,S){return((m(y,S)*C+b(y,S))*C+d(y))*C;}function E(C,y,S){return 3*m(y,S)*C*C+2*b(y,S)*C+d(y);}function P(C,y,S,O,A){var R,N,H=0;do N=y+(S-y)/2,R=g(N,O,A)-C,R>0?S=N:y=N;while(Math.abs(R)>s&&++H<l);return N;}function k(C,y,S,O){for(var A=0;A<i;++A){var R=E(y,S,O);if(R===0)return y;var N=g(y,S,O)-C;y-=N/R;}return y;}function v(C){this._p=C,this._mSampleValues=u?new Float32Array(h):new Array(h),this._precomputed=!1,this.get=this.get.bind(this);}return v.prototype={get:function(y){var S=this._p[0],O=this._p[1],A=this._p[2],R=this._p[3];return this._precomputed||this._precompute(),S===O&&A===R?y:y===0?0:y===1?1:g(this._getTForX(y),O,R);},_precompute:function(){var y=this._p[0],S=this._p[1],O=this._p[2],A=this._p[3];this._precomputed=!0,(y!==S||O!==A)&&this._calcSampleValues();},_calcSampleValues:function(){for(var y=this._p[0],S=this._p[2],O=0;O<h;++O)this._mSampleValues[O]=g(O*p,y,S);},_getTForX:function(y){for(var S=this._p[0],O=this._p[2],A=this._mSampleValues,R=0,N=1,H=h-1;N!==H&&A[N]<=y;++N)R+=p;--N;var it=(y-A[N])/(A[N+1]-A[N]),nt=R+it*p,Z=E(nt,S,O);return Z>=o?k(y,nt,S,O):Z===0?nt:P(y,R,R+p,S,O);}},t;}(),pooling=function(){function t(e){return e.concat(createSizedArray(e.length));}return{double:t};}(),poolFactory=function(){return function(t,e,n){var i=0,o=t,s=createSizedArray(o),l={newElement:h,release:p};function h(){var u;return i?(i-=1,u=s[i]):u=e(),u;}function p(u){i===o&&(s=pooling.double(s),o*=2),n&&n(u),s[i]=u,i+=1;}return l;};}(),bezierLengthPool=function(){function t(){return{addedLength:0,percents:createTypedArray("float32",getDefaultCurveSegments()),lengths:createTypedArray("float32",getDefaultCurveSegments())};}return poolFactory(8,t);}(),segmentsLengthPool=function(){function t(){return{lengths:[],totalLength:0};}function e(n){var i,o=n.lengths.length;for(i=0;i<o;i+=1)bezierLengthPool.release(n.lengths[i]);n.lengths.length=0;}return poolFactory(8,t,e);}();function bezFunction(){var t=Math;function e(d,g,E,P,k,v){var C=d*P+g*k+E*v-k*P-v*d-E*g;return C>-.001&&C<.001;}function n(d,g,E,P,k,v,C,y,S){if(E===0&&v===0&&S===0)return e(d,g,P,k,C,y);var O=t.sqrt(t.pow(P-d,2)+t.pow(k-g,2)+t.pow(v-E,2)),A=t.sqrt(t.pow(C-d,2)+t.pow(y-g,2)+t.pow(S-E,2)),R=t.sqrt(t.pow(C-P,2)+t.pow(y-k,2)+t.pow(S-v,2)),N;return O>A?O>R?N=O-A-R:N=R-A-O:R>A?N=R-A-O:N=A-O-R,N>-1e-4&&N<1e-4;}var i=function(){return function(d,g,E,P){var k=getDefaultCurveSegments(),v,C,y,S,O,A=0,R,N=[],H=[],it=bezierLengthPool.newElement();for(y=E.length,v=0;v<k;v+=1){for(O=v/(k-1),R=0,C=0;C<y;C+=1)S=bmPow(1-O,3)*d[C]+3*bmPow(1-O,2)*O*E[C]+3*(1-O)*bmPow(O,2)*P[C]+bmPow(O,3)*g[C],N[C]=S,H[C]!==null&&(R+=bmPow(N[C]-H[C],2)),H[C]=N[C];R&&(R=bmSqrt(R),A+=R),it.percents[v]=O,it.lengths[v]=A;}return it.addedLength=A,it;};}();function o(d){var g=segmentsLengthPool.newElement(),E=d.c,P=d.v,k=d.o,v=d.i,C,y=d._length,S=g.lengths,O=0;for(C=0;C<y-1;C+=1)S[C]=i(P[C],P[C+1],k[C],v[C+1]),O+=S[C].addedLength;return E&&y&&(S[C]=i(P[C],P[0],k[C],v[0]),O+=S[C].addedLength),g.totalLength=O,g;}function s(d){this.segmentLength=0,this.points=new Array(d);}function l(d,g){this.partialLength=d,this.point=g;}var h=function(){var d={};return function(g,E,P,k){var v=(g[0]+"_"+g[1]+"_"+E[0]+"_"+E[1]+"_"+P[0]+"_"+P[1]+"_"+k[0]+"_"+k[1]).replace(/\./g,"p");if(!d[v]){var C=getDefaultCurveSegments(),y,S,O,A,R,N=0,H,it,nt=null;g.length===2&&(g[0]!==E[0]||g[1]!==E[1])&&e(g[0],g[1],E[0],E[1],g[0]+P[0],g[1]+P[1])&&e(g[0],g[1],E[0],E[1],E[0]+k[0],E[1]+k[1])&&(C=2);var Z=new s(C);for(O=P.length,y=0;y<C;y+=1){for(it=createSizedArray(O),R=y/(C-1),H=0,S=0;S<O;S+=1)A=bmPow(1-R,3)*g[S]+3*bmPow(1-R,2)*R*(g[S]+P[S])+3*(1-R)*bmPow(R,2)*(E[S]+k[S])+bmPow(R,3)*E[S],it[S]=A,nt!==null&&(H+=bmPow(it[S]-nt[S],2));H=bmSqrt(H),N+=H,Z.points[y]=new l(H,it),nt=it;}Z.segmentLength=N,d[v]=Z;}return d[v];};}();function p(d,g){var E=g.percents,P=g.lengths,k=E.length,v=bmFloor((k-1)*d),C=d*g.addedLength,y=0;if(v===k-1||v===0||C===P[v])return E[v];for(var S=P[v]>C?-1:1,O=!0;O;)if(P[v]<=C&&P[v+1]>C?(y=(C-P[v])/(P[v+1]-P[v]),O=!1):v+=S,v<0||v>=k-1){if(v===k-1)return E[v];O=!1;}return E[v]+(E[v+1]-E[v])*y;}function u(d,g,E,P,k,v){var C=p(k,v),y=1-C,S=t.round((y*y*y*d[0]+(C*y*y+y*C*y+y*y*C)*E[0]+(C*C*y+y*C*C+C*y*C)*P[0]+C*C*C*g[0])*1e3)/1e3,O=t.round((y*y*y*d[1]+(C*y*y+y*C*y+y*y*C)*E[1]+(C*C*y+y*C*C+C*y*C)*P[1]+C*C*C*g[1])*1e3)/1e3;return[S,O];}var m=createTypedArray("float32",8);function b(d,g,E,P,k,v,C){k<0?k=0:k>1&&(k=1);var y=p(k,C);v=v>1?1:v;var S=p(v,C),O,A=d.length,R=1-y,N=1-S,H=R*R*R,it=y*R*R*3,nt=y*y*R*3,Z=y*y*y,rt=R*R*N,Q=y*R*N+R*y*N+R*R*S,W=y*y*N+R*y*S+y*R*S,w=y*y*S,F=R*N*N,x=y*N*N+R*S*N+R*N*S,M=y*S*N+R*S*S+y*N*S,z=y*S*S,B=N*N*N,J=S*N*N+N*S*N+N*N*S,tt=S*S*N+N*S*S+S*N*S,K=S*S*S;for(O=0;O<A;O+=1)m[O*4]=t.round((H*d[O]+it*E[O]+nt*P[O]+Z*g[O])*1e3)/1e3,m[O*4+1]=t.round((rt*d[O]+Q*E[O]+W*P[O]+w*g[O])*1e3)/1e3,m[O*4+2]=t.round((F*d[O]+x*E[O]+M*P[O]+z*g[O])*1e3)/1e3,m[O*4+3]=t.round((B*d[O]+J*E[O]+tt*P[O]+K*g[O])*1e3)/1e3;return m;}return{getSegmentsLength:o,getNewSegment:b,getPointInSegment:u,buildBezierData:h,pointOnLine2D:e,pointOnLine3D:n};}var bez=bezFunction(),initFrame=initialDefaultFrame,mathAbs=Math.abs;function interpolateValue(t,e){var n=this.offsetTime,i;this.propType==="multidimensional"&&(i=createTypedArray("float32",this.pv.length));for(var o=e.lastIndex,s=o,l=this.keyframes.length-1,h=!0,p,u,m;h;){if(p=this.keyframes[s],u=this.keyframes[s+1],s===l-1&&t>=u.t-n){p.h&&(p=u),o=0;break;}if(u.t-n>t){o=s;break;}s<l-1?s+=1:(o=0,h=!1);}m=this.keyframesMetadata[s]||{};var b,d,g,E,P,k,v=u.t-n,C=p.t-n,y;if(p.to){m.bezierData||(m.bezierData=bez.buildBezierData(p.s,u.s||p.e,p.to,p.ti));var S=m.bezierData;if(t>=v||t<C){var O=t>=v?S.points.length-1:0;for(d=S.points[O].point.length,b=0;b<d;b+=1)i[b]=S.points[O].point[b];}else{m.__fnct?k=m.__fnct:(k=BezierFactory.getBezierEasing(p.o.x,p.o.y,p.i.x,p.i.y,p.n).get,m.__fnct=k),g=k((t-C)/(v-C));var A=S.segmentLength*g,R,N=e.lastFrame<t&&e._lastKeyframeIndex===s?e._lastAddedLength:0;for(P=e.lastFrame<t&&e._lastKeyframeIndex===s?e._lastPoint:0,h=!0,E=S.points.length;h;){if(N+=S.points[P].partialLength,A===0||g===0||P===S.points.length-1){for(d=S.points[P].point.length,b=0;b<d;b+=1)i[b]=S.points[P].point[b];break;}else if(A>=N&&A<N+S.points[P+1].partialLength){for(R=(A-N)/S.points[P+1].partialLength,d=S.points[P].point.length,b=0;b<d;b+=1)i[b]=S.points[P].point[b]+(S.points[P+1].point[b]-S.points[P].point[b])*R;break;}P<E-1?P+=1:h=!1;}e._lastPoint=P,e._lastAddedLength=N-S.points[P].partialLength,e._lastKeyframeIndex=s;}}else{var H,it,nt,Z,rt;if(l=p.s.length,y=u.s||p.e,this.sh&&p.h!==1){if(t>=v)i[0]=y[0],i[1]=y[1],i[2]=y[2];else if(t<=C)i[0]=p.s[0],i[1]=p.s[1],i[2]=p.s[2];else{var Q=createQuaternion(p.s),W=createQuaternion(y),w=(t-C)/(v-C);quaternionToEuler(i,slerp(Q,W,w));}}else for(s=0;s<l;s+=1)p.h!==1&&(t>=v?g=1:t<C?g=0:(p.o.x.constructor===Array?(m.__fnct||(m.__fnct=[]),m.__fnct[s]?k=m.__fnct[s]:(H=p.o.x[s]===void 0?p.o.x[0]:p.o.x[s],it=p.o.y[s]===void 0?p.o.y[0]:p.o.y[s],nt=p.i.x[s]===void 0?p.i.x[0]:p.i.x[s],Z=p.i.y[s]===void 0?p.i.y[0]:p.i.y[s],k=BezierFactory.getBezierEasing(H,it,nt,Z).get,m.__fnct[s]=k)):m.__fnct?k=m.__fnct:(H=p.o.x,it=p.o.y,nt=p.i.x,Z=p.i.y,k=BezierFactory.getBezierEasing(H,it,nt,Z).get,p.keyframeMetadata=k),g=k((t-C)/(v-C)))),y=u.s||p.e,rt=p.h===1?p.s[s]:p.s[s]+(y[s]-p.s[s])*g,this.propType==="multidimensional"?i[s]=rt:i=rt;}return e.lastIndex=o,i;}function slerp(t,e,n){var i=[],o=t[0],s=t[1],l=t[2],h=t[3],p=e[0],u=e[1],m=e[2],b=e[3],d,g,E,P,k;return g=o*p+s*u+l*m+h*b,g<0&&(g=-g,p=-p,u=-u,m=-m,b=-b),1-g>1e-6?(d=Math.acos(g),E=Math.sin(d),P=Math.sin((1-n)*d)/E,k=Math.sin(n*d)/E):(P=1-n,k=n),i[0]=P*o+k*p,i[1]=P*s+k*u,i[2]=P*l+k*m,i[3]=P*h+k*b,i;}function quaternionToEuler(t,e){var n=e[0],i=e[1],o=e[2],s=e[3],l=Math.atan2(2*i*s-2*n*o,1-2*i*i-2*o*o),h=Math.asin(2*n*i+2*o*s),p=Math.atan2(2*n*s-2*i*o,1-2*n*n-2*o*o);t[0]=l/degToRads,t[1]=h/degToRads,t[2]=p/degToRads;}function createQuaternion(t){var e=t[0]*degToRads,n=t[1]*degToRads,i=t[2]*degToRads,o=Math.cos(e/2),s=Math.cos(n/2),l=Math.cos(i/2),h=Math.sin(e/2),p=Math.sin(n/2),u=Math.sin(i/2),m=o*s*l-h*p*u,b=h*p*l+o*s*u,d=h*s*l+o*p*u,g=o*p*l-h*s*u;return[b,d,g,m];}function getValueAtCurrentTime(){var t=this.comp.renderedFrame-this.offsetTime,e=this.keyframes[0].t-this.offsetTime,n=this.keyframes[this.keyframes.length-1].t-this.offsetTime;if(!(t===this._caching.lastFrame||this._caching.lastFrame!==initFrame&&(this._caching.lastFrame>=n&&t>=n||this._caching.lastFrame<e&&t<e))){this._caching.lastFrame>=t&&(this._caching._lastKeyframeIndex=-1,this._caching.lastIndex=0);var i=this.interpolateValue(t,this._caching);this.pv=i;}return this._caching.lastFrame=t,this.pv;}function setVValue(t){var e;if(this.propType==="unidimensional")e=t*this.mult,mathAbs(this.v-e)>1e-5&&(this.v=e,this._mdf=!0);else for(var n=0,i=this.v.length;n<i;)e=t[n]*this.mult,mathAbs(this.v[n]-e)>1e-5&&(this.v[n]=e,this._mdf=!0),n+=1;}function processEffectsSequence(){if(!(this.elem.globalData.frameId===this.frameId||!this.effectsSequence.length)){if(this.lock){this.setVValue(this.pv);return;}this.lock=!0,this._mdf=this._isFirstFrame;var t,e=this.effectsSequence.length,n=this.kf?this.pv:this.data.k;for(t=0;t<e;t+=1)n=this.effectsSequence[t](n);this.setVValue(n),this._isFirstFrame=!1,this.lock=!1,this.frameId=this.elem.globalData.frameId;}}function addEffect(t){this.effectsSequence.push(t),this.container.addDynamicProperty(this);}function ValueProperty(t,e,n,i){this.propType="unidimensional",this.mult=n||1,this.data=e,this.v=n?e.k*n:e.k,this.pv=e.k,this._mdf=!1,this.elem=t,this.container=i,this.comp=t.comp,this.k=!1,this.kf=!1,this.vel=0,this.effectsSequence=[],this._isFirstFrame=!0,this.getValue=processEffectsSequence,this.setVValue=setVValue,this.addEffect=addEffect;}function MultiDimensionalProperty(t,e,n,i){this.propType="multidimensional",this.mult=n||1,this.data=e,this._mdf=!1,this.elem=t,this.container=i,this.comp=t.comp,this.k=!1,this.kf=!1,this.frameId=-1;var o,s=e.k.length;for(this.v=createTypedArray("float32",s),this.pv=createTypedArray("float32",s),this.vel=createTypedArray("float32",s),o=0;o<s;o+=1)this.v[o]=e.k[o]*this.mult,this.pv[o]=e.k[o];this._isFirstFrame=!0,this.effectsSequence=[],this.getValue=processEffectsSequence,this.setVValue=setVValue,this.addEffect=addEffect;}function KeyframedValueProperty(t,e,n,i){this.propType="unidimensional",this.keyframes=e.k,this.keyframesMetadata=[],this.offsetTime=t.data.st,this.frameId=-1,this._caching={lastFrame:initFrame,lastIndex:0,value:0,_lastKeyframeIndex:-1},this.k=!0,this.kf=!0,this.data=e,this.mult=n||1,this.elem=t,this.container=i,this.comp=t.comp,this.v=initFrame,this.pv=initFrame,this._isFirstFrame=!0,this.getValue=processEffectsSequence,this.setVValue=setVValue,this.interpolateValue=interpolateValue,this.effectsSequence=[getValueAtCurrentTime.bind(this)],this.addEffect=addEffect;}function KeyframedMultidimensionalProperty(t,e,n,i){this.propType="multidimensional";var o,s=e.k.length,l,h,p,u;for(o=0;o<s-1;o+=1)e.k[o].to&&e.k[o].s&&e.k[o+1]&&e.k[o+1].s&&(l=e.k[o].s,h=e.k[o+1].s,p=e.k[o].to,u=e.k[o].ti,(l.length===2&&!(l[0]===h[0]&&l[1]===h[1])&&bez.pointOnLine2D(l[0],l[1],h[0],h[1],l[0]+p[0],l[1]+p[1])&&bez.pointOnLine2D(l[0],l[1],h[0],h[1],h[0]+u[0],h[1]+u[1])||l.length===3&&!(l[0]===h[0]&&l[1]===h[1]&&l[2]===h[2])&&bez.pointOnLine3D(l[0],l[1],l[2],h[0],h[1],h[2],l[0]+p[0],l[1]+p[1],l[2]+p[2])&&bez.pointOnLine3D(l[0],l[1],l[2],h[0],h[1],h[2],h[0]+u[0],h[1]+u[1],h[2]+u[2]))&&(e.k[o].to=null,e.k[o].ti=null),l[0]===h[0]&&l[1]===h[1]&&p[0]===0&&p[1]===0&&u[0]===0&&u[1]===0&&(l.length===2||l[2]===h[2]&&p[2]===0&&u[2]===0)&&(e.k[o].to=null,e.k[o].ti=null));this.effectsSequence=[getValueAtCurrentTime.bind(this)],this.data=e,this.keyframes=e.k,this.keyframesMetadata=[],this.offsetTime=t.data.st,this.k=!0,this.kf=!0,this._isFirstFrame=!0,this.mult=n||1,this.elem=t,this.container=i,this.comp=t.comp,this.getValue=processEffectsSequence,this.setVValue=setVValue,this.interpolateValue=interpolateValue,this.frameId=-1;var m=e.k[0].s.length;for(this.v=createTypedArray("float32",m),this.pv=createTypedArray("float32",m),o=0;o<m;o+=1)this.v[o]=initFrame,this.pv[o]=initFrame;this._caching={lastFrame:initFrame,lastIndex:0,value:createTypedArray("float32",m)},this.addEffect=addEffect;}var PropertyFactory=function(){function t(n,i,o,s,l){i.sid&&(i=n.globalData.slotManager.getProp(i));var h;if(!i.k.length)h=new ValueProperty(n,i,s,l);else if(typeof i.k[0]=="number")h=new MultiDimensionalProperty(n,i,s,l);else switch(o){case 0:h=new KeyframedValueProperty(n,i,s,l);break;case 1:h=new KeyframedMultidimensionalProperty(n,i,s,l);break;default:break;}return h.effectsSequence.length&&l.addDynamicProperty(h),h;}var e={getProp:t};return e;}();function DynamicPropertyContainer(){}DynamicPropertyContainer.prototype={addDynamicProperty:function(e){this.dynamicProperties.indexOf(e)===-1&&(this.dynamicProperties.push(e),this.container.addDynamicProperty(this),this._isAnimated=!0);},iterateDynamicProperties:function(){this._mdf=!1;var e,n=this.dynamicProperties.length;for(e=0;e<n;e+=1)this.dynamicProperties[e].getValue(),this.dynamicProperties[e]._mdf&&(this._mdf=!0);},initDynamicPropertyContainer:function(e){this.container=e,this.dynamicProperties=[],this._mdf=!1,this._isAnimated=!1;}};var pointPool=function(){function t(){return createTypedArray("float32",2);}return poolFactory(8,t);}();function ShapePath(){this.c=!1,this._length=0,this._maxLength=8,this.v=createSizedArray(this._maxLength),this.o=createSizedArray(this._maxLength),this.i=createSizedArray(this._maxLength);}ShapePath.prototype.setPathData=function(t,e){this.c=t,this.setLength(e);for(var n=0;n<e;)this.v[n]=pointPool.newElement(),this.o[n]=pointPool.newElement(),this.i[n]=pointPool.newElement(),n+=1;},ShapePath.prototype.setLength=function(t){for(;this._maxLength<t;)this.doubleArrayLength();this._length=t;},ShapePath.prototype.doubleArrayLength=function(){this.v=this.v.concat(createSizedArray(this._maxLength)),this.i=this.i.concat(createSizedArray(this._maxLength)),this.o=this.o.concat(createSizedArray(this._maxLength)),this._maxLength*=2;},ShapePath.prototype.setXYAt=function(t,e,n,i,o){var s;switch(this._length=Math.max(this._length,i+1),this._length>=this._maxLength&&this.doubleArrayLength(),n){case"v":s=this.v;break;case"i":s=this.i;break;case"o":s=this.o;break;default:s=[];break;}(!s[i]||s[i]&&!o)&&(s[i]=pointPool.newElement()),s[i][0]=t,s[i][1]=e;},ShapePath.prototype.setTripleAt=function(t,e,n,i,o,s,l,h){this.setXYAt(t,e,"v",l,h),this.setXYAt(n,i,"o",l,h),this.setXYAt(o,s,"i",l,h);},ShapePath.prototype.reverse=function(){var t=new ShapePath();t.setPathData(this.c,this._length);var e=this.v,n=this.o,i=this.i,o=0;this.c&&(t.setTripleAt(e[0][0],e[0][1],i[0][0],i[0][1],n[0][0],n[0][1],0,!1),o=1);var s=this._length-1,l=this._length,h;for(h=o;h<l;h+=1)t.setTripleAt(e[s][0],e[s][1],i[s][0],i[s][1],n[s][0],n[s][1],h,!1),s-=1;return t;},ShapePath.prototype.length=function(){return this._length;};var shapePool=function(){function t(){return new ShapePath();}function e(o){var s=o._length,l;for(l=0;l<s;l+=1)pointPool.release(o.v[l]),pointPool.release(o.i[l]),pointPool.release(o.o[l]),o.v[l]=null,o.i[l]=null,o.o[l]=null;o._length=0,o.c=!1;}function n(o){var s=i.newElement(),l,h=o._length===void 0?o.v.length:o._length;for(s.setLength(h),s.c=o.c,l=0;l<h;l+=1)s.setTripleAt(o.v[l][0],o.v[l][1],o.o[l][0],o.o[l][1],o.i[l][0],o.i[l][1],l);return s;}var i=poolFactory(4,t,e);return i.clone=n,i;}();function ShapeCollection(){this._length=0,this._maxLength=4,this.shapes=createSizedArray(this._maxLength);}ShapeCollection.prototype.addShape=function(t){this._length===this._maxLength&&(this.shapes=this.shapes.concat(createSizedArray(this._maxLength)),this._maxLength*=2),this.shapes[this._length]=t,this._length+=1;},ShapeCollection.prototype.releaseShapes=function(){var t;for(t=0;t<this._length;t+=1)shapePool.release(this.shapes[t]);this._length=0;};var shapeCollectionPool=function(){var t={newShapeCollection:o,release:s},e=0,n=4,i=createSizedArray(n);function o(){var l;return e?(e-=1,l=i[e]):l=new ShapeCollection(),l;}function s(l){var h,p=l._length;for(h=0;h<p;h+=1)shapePool.release(l.shapes[h]);l._length=0,e===n&&(i=pooling.double(i),n*=2),i[e]=l,e+=1;}return t;}(),ShapePropertyFactory=function(){var t=-999999;function e(v,C,y){var S=y.lastIndex,O,A,R,N,H,it,nt,Z,rt,Q=this.keyframes;if(v<Q[0].t-this.offsetTime)O=Q[0].s[0],R=!0,S=0;else if(v>=Q[Q.length-1].t-this.offsetTime)O=Q[Q.length-1].s?Q[Q.length-1].s[0]:Q[Q.length-2].e[0],R=!0;else{for(var W=S,w=Q.length-1,F=!0,x,M,z;F&&(x=Q[W],M=Q[W+1],!(M.t-this.offsetTime>v));)W<w-1?W+=1:F=!1;if(z=this.keyframesMetadata[W]||{},R=x.h===1,S=W,!R){if(v>=M.t-this.offsetTime)Z=1;else if(v<x.t-this.offsetTime)Z=0;else{var B;z.__fnct?B=z.__fnct:(B=BezierFactory.getBezierEasing(x.o.x,x.o.y,x.i.x,x.i.y).get,z.__fnct=B),Z=B((v-(x.t-this.offsetTime))/(M.t-this.offsetTime-(x.t-this.offsetTime)));}A=M.s?M.s[0]:x.e[0];}O=x.s[0];}for(it=C._length,nt=O.i[0].length,y.lastIndex=S,N=0;N<it;N+=1)for(H=0;H<nt;H+=1)rt=R?O.i[N][H]:O.i[N][H]+(A.i[N][H]-O.i[N][H])*Z,C.i[N][H]=rt,rt=R?O.o[N][H]:O.o[N][H]+(A.o[N][H]-O.o[N][H])*Z,C.o[N][H]=rt,rt=R?O.v[N][H]:O.v[N][H]+(A.v[N][H]-O.v[N][H])*Z,C.v[N][H]=rt;}function n(){var v=this.comp.renderedFrame-this.offsetTime,C=this.keyframes[0].t-this.offsetTime,y=this.keyframes[this.keyframes.length-1].t-this.offsetTime,S=this._caching.lastFrame;return S!==t&&(S<C&&v<C||S>y&&v>y)||(this._caching.lastIndex=S<v?this._caching.lastIndex:0,this.interpolateShape(v,this.pv,this._caching)),this._caching.lastFrame=v,this.pv;}function i(){this.paths=this.localShapeCollection;}function o(v,C){if(v._length!==C._length||v.c!==C.c)return!1;var y,S=v._length;for(y=0;y<S;y+=1)if(v.v[y][0]!==C.v[y][0]||v.v[y][1]!==C.v[y][1]||v.o[y][0]!==C.o[y][0]||v.o[y][1]!==C.o[y][1]||v.i[y][0]!==C.i[y][0]||v.i[y][1]!==C.i[y][1])return!1;return!0;}function s(v){o(this.v,v)||(this.v=shapePool.clone(v),this.localShapeCollection.releaseShapes(),this.localShapeCollection.addShape(this.v),this._mdf=!0,this.paths=this.localShapeCollection);}function l(){if(this.elem.globalData.frameId!==this.frameId){if(!this.effectsSequence.length){this._mdf=!1;return;}if(this.lock){this.setVValue(this.pv);return;}this.lock=!0,this._mdf=!1;var v;this.kf?v=this.pv:this.data.ks?v=this.data.ks.k:v=this.data.pt.k;var C,y=this.effectsSequence.length;for(C=0;C<y;C+=1)v=this.effectsSequence[C](v);this.setVValue(v),this.lock=!1,this.frameId=this.elem.globalData.frameId;}}function h(v,C,y){this.propType="shape",this.comp=v.comp,this.container=v,this.elem=v,this.data=C,this.k=!1,this.kf=!1,this._mdf=!1;var S=y===3?C.pt.k:C.ks.k;this.v=shapePool.clone(S),this.pv=shapePool.clone(this.v),this.localShapeCollection=shapeCollectionPool.newShapeCollection(),this.paths=this.localShapeCollection,this.paths.addShape(this.v),this.reset=i,this.effectsSequence=[];}function p(v){this.effectsSequence.push(v),this.container.addDynamicProperty(this);}h.prototype.interpolateShape=e,h.prototype.getValue=l,h.prototype.setVValue=s,h.prototype.addEffect=p;function u(v,C,y){this.propType="shape",this.comp=v.comp,this.elem=v,this.container=v,this.offsetTime=v.data.st,this.keyframes=y===3?C.pt.k:C.ks.k,this.keyframesMetadata=[],this.k=!0,this.kf=!0;var S=this.keyframes[0].s[0].i.length;this.v=shapePool.newElement(),this.v.setPathData(this.keyframes[0].s[0].c,S),this.pv=shapePool.clone(this.v),this.localShapeCollection=shapeCollectionPool.newShapeCollection(),this.paths=this.localShapeCollection,this.paths.addShape(this.v),this.lastFrame=t,this.reset=i,this._caching={lastFrame:t,lastIndex:0},this.effectsSequence=[n.bind(this)];}u.prototype.getValue=l,u.prototype.interpolateShape=e,u.prototype.setVValue=s,u.prototype.addEffect=p;var m=function(){var v=roundCorner;function C(y,S){this.v=shapePool.newElement(),this.v.setPathData(!0,4),this.localShapeCollection=shapeCollectionPool.newShapeCollection(),this.paths=this.localShapeCollection,this.localShapeCollection.addShape(this.v),this.d=S.d,this.elem=y,this.comp=y.comp,this.frameId=-1,this.initDynamicPropertyContainer(y),this.p=PropertyFactory.getProp(y,S.p,1,0,this),this.s=PropertyFactory.getProp(y,S.s,1,0,this),this.dynamicProperties.length?this.k=!0:(this.k=!1,this.convertEllToPath());}return C.prototype={reset:i,getValue:function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf&&this.convertEllToPath());},convertEllToPath:function(){var S=this.p.v[0],O=this.p.v[1],A=this.s.v[0]/2,R=this.s.v[1]/2,N=this.d!==3,H=this.v;H.v[0][0]=S,H.v[0][1]=O-R,H.v[1][0]=N?S+A:S-A,H.v[1][1]=O,H.v[2][0]=S,H.v[2][1]=O+R,H.v[3][0]=N?S-A:S+A,H.v[3][1]=O,H.i[0][0]=N?S-A*v:S+A*v,H.i[0][1]=O-R,H.i[1][0]=N?S+A:S-A,H.i[1][1]=O-R*v,H.i[2][0]=N?S+A*v:S-A*v,H.i[2][1]=O+R,H.i[3][0]=N?S-A:S+A,H.i[3][1]=O+R*v,H.o[0][0]=N?S+A*v:S-A*v,H.o[0][1]=O-R,H.o[1][0]=N?S+A:S-A,H.o[1][1]=O+R*v,H.o[2][0]=N?S-A*v:S+A*v,H.o[2][1]=O+R,H.o[3][0]=N?S-A:S+A,H.o[3][1]=O-R*v;}},extendPrototype([DynamicPropertyContainer],C),C;}(),b=function(){function v(C,y){this.v=shapePool.newElement(),this.v.setPathData(!0,0),this.elem=C,this.comp=C.comp,this.data=y,this.frameId=-1,this.d=y.d,this.initDynamicPropertyContainer(C),y.sy===1?(this.ir=PropertyFactory.getProp(C,y.ir,0,0,this),this.is=PropertyFactory.getProp(C,y.is,0,.01,this),this.convertToPath=this.convertStarToPath):this.convertToPath=this.convertPolygonToPath,this.pt=PropertyFactory.getProp(C,y.pt,0,0,this),this.p=PropertyFactory.getProp(C,y.p,1,0,this),this.r=PropertyFactory.getProp(C,y.r,0,degToRads,this),this.or=PropertyFactory.getProp(C,y.or,0,0,this),this.os=PropertyFactory.getProp(C,y.os,0,.01,this),this.localShapeCollection=shapeCollectionPool.newShapeCollection(),this.localShapeCollection.addShape(this.v),this.paths=this.localShapeCollection,this.dynamicProperties.length?this.k=!0:(this.k=!1,this.convertToPath());}return v.prototype={reset:i,getValue:function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf&&this.convertToPath());},convertStarToPath:function(){var y=Math.floor(this.pt.v)*2,S=Math.PI*2/y,O=!0,A=this.or.v,R=this.ir.v,N=this.os.v,H=this.is.v,it=2*Math.PI*A/(y*2),nt=2*Math.PI*R/(y*2),Z,rt,Q,W,w=-Math.PI/2;w+=this.r.v;var F=this.data.d===3?-1:1;for(this.v._length=0,Z=0;Z<y;Z+=1){rt=O?A:R,Q=O?N:H,W=O?it:nt;var x=rt*Math.cos(w),M=rt*Math.sin(w),z=x===0&&M===0?0:M/Math.sqrt(x*x+M*M),B=x===0&&M===0?0:-x/Math.sqrt(x*x+M*M);x+=+this.p.v[0],M+=+this.p.v[1],this.v.setTripleAt(x,M,x-z*W*Q*F,M-B*W*Q*F,x+z*W*Q*F,M+B*W*Q*F,Z,!0),O=!O,w+=S*F;}},convertPolygonToPath:function(){var y=Math.floor(this.pt.v),S=Math.PI*2/y,O=this.or.v,A=this.os.v,R=2*Math.PI*O/(y*4),N,H=-Math.PI*.5,it=this.data.d===3?-1:1;for(H+=this.r.v,this.v._length=0,N=0;N<y;N+=1){var nt=O*Math.cos(H),Z=O*Math.sin(H),rt=nt===0&&Z===0?0:Z/Math.sqrt(nt*nt+Z*Z),Q=nt===0&&Z===0?0:-nt/Math.sqrt(nt*nt+Z*Z);nt+=+this.p.v[0],Z+=+this.p.v[1],this.v.setTripleAt(nt,Z,nt-rt*R*A*it,Z-Q*R*A*it,nt+rt*R*A*it,Z+Q*R*A*it,N,!0),H+=S*it;}this.paths.length=0,this.paths[0]=this.v;}},extendPrototype([DynamicPropertyContainer],v),v;}(),d=function(){function v(C,y){this.v=shapePool.newElement(),this.v.c=!0,this.localShapeCollection=shapeCollectionPool.newShapeCollection(),this.localShapeCollection.addShape(this.v),this.paths=this.localShapeCollection,this.elem=C,this.comp=C.comp,this.frameId=-1,this.d=y.d,this.initDynamicPropertyContainer(C),this.p=PropertyFactory.getProp(C,y.p,1,0,this),this.s=PropertyFactory.getProp(C,y.s,1,0,this),this.r=PropertyFactory.getProp(C,y.r,0,0,this),this.dynamicProperties.length?this.k=!0:(this.k=!1,this.convertRectToPath());}return v.prototype={convertRectToPath:function(){var y=this.p.v[0],S=this.p.v[1],O=this.s.v[0]/2,A=this.s.v[1]/2,R=bmMin(O,A,this.r.v),N=R*(1-roundCorner);this.v._length=0,this.d===2||this.d===1?(this.v.setTripleAt(y+O,S-A+R,y+O,S-A+R,y+O,S-A+N,0,!0),this.v.setTripleAt(y+O,S+A-R,y+O,S+A-N,y+O,S+A-R,1,!0),R!==0?(this.v.setTripleAt(y+O-R,S+A,y+O-R,S+A,y+O-N,S+A,2,!0),this.v.setTripleAt(y-O+R,S+A,y-O+N,S+A,y-O+R,S+A,3,!0),this.v.setTripleAt(y-O,S+A-R,y-O,S+A-R,y-O,S+A-N,4,!0),this.v.setTripleAt(y-O,S-A+R,y-O,S-A+N,y-O,S-A+R,5,!0),this.v.setTripleAt(y-O+R,S-A,y-O+R,S-A,y-O+N,S-A,6,!0),this.v.setTripleAt(y+O-R,S-A,y+O-N,S-A,y+O-R,S-A,7,!0)):(this.v.setTripleAt(y-O,S+A,y-O+N,S+A,y-O,S+A,2),this.v.setTripleAt(y-O,S-A,y-O,S-A+N,y-O,S-A,3))):(this.v.setTripleAt(y+O,S-A+R,y+O,S-A+N,y+O,S-A+R,0,!0),R!==0?(this.v.setTripleAt(y+O-R,S-A,y+O-R,S-A,y+O-N,S-A,1,!0),this.v.setTripleAt(y-O+R,S-A,y-O+N,S-A,y-O+R,S-A,2,!0),this.v.setTripleAt(y-O,S-A+R,y-O,S-A+R,y-O,S-A+N,3,!0),this.v.setTripleAt(y-O,S+A-R,y-O,S+A-N,y-O,S+A-R,4,!0),this.v.setTripleAt(y-O+R,S+A,y-O+R,S+A,y-O+N,S+A,5,!0),this.v.setTripleAt(y+O-R,S+A,y+O-N,S+A,y+O-R,S+A,6,!0),this.v.setTripleAt(y+O,S+A-R,y+O,S+A-R,y+O,S+A-N,7,!0)):(this.v.setTripleAt(y-O,S-A,y-O+N,S-A,y-O,S-A,1,!0),this.v.setTripleAt(y-O,S+A,y-O,S+A-N,y-O,S+A,2,!0),this.v.setTripleAt(y+O,S+A,y+O-N,S+A,y+O,S+A,3,!0)));},getValue:function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf&&this.convertRectToPath());},reset:i},extendPrototype([DynamicPropertyContainer],v),v;}();function g(v,C,y){var S;if(y===3||y===4){var O=y===3?C.pt:C.ks,A=O.k;A.length?S=new u(v,C,y):S=new h(v,C,y);}else y===5?S=new d(v,C):y===6?S=new m(v,C):y===7&&(S=new b(v,C));return S.k&&v.addDynamicProperty(S),S;}function E(){return h;}function P(){return u;}var k={};return k.getShapeProp=g,k.getConstructorFunction=E,k.getKeyframedConstructorFunction=P,k;}();var Matrix=function(){var t=Math.cos,e=Math.sin,n=Math.tan,i=Math.round;function o(){return this.props[0]=1,this.props[1]=0,this.props[2]=0,this.props[3]=0,this.props[4]=0,this.props[5]=1,this.props[6]=0,this.props[7]=0,this.props[8]=0,this.props[9]=0,this.props[10]=1,this.props[11]=0,this.props[12]=0,this.props[13]=0,this.props[14]=0,this.props[15]=1,this;}function s(x){if(x===0)return this;var M=t(x),z=e(x);return this._t(M,-z,0,0,z,M,0,0,0,0,1,0,0,0,0,1);}function l(x){if(x===0)return this;var M=t(x),z=e(x);return this._t(1,0,0,0,0,M,-z,0,0,z,M,0,0,0,0,1);}function h(x){if(x===0)return this;var M=t(x),z=e(x);return this._t(M,0,z,0,0,1,0,0,-z,0,M,0,0,0,0,1);}function p(x){if(x===0)return this;var M=t(x),z=e(x);return this._t(M,-z,0,0,z,M,0,0,0,0,1,0,0,0,0,1);}function u(x,M){return this._t(1,M,x,1,0,0);}function m(x,M){return this.shear(n(x),n(M));}function b(x,M){var z=t(M),B=e(M);return this._t(z,B,0,0,-B,z,0,0,0,0,1,0,0,0,0,1)._t(1,0,0,0,n(x),1,0,0,0,0,1,0,0,0,0,1)._t(z,-B,0,0,B,z,0,0,0,0,1,0,0,0,0,1);}function d(x,M,z){return!z&&z!==0&&(z=1),x===1&&M===1&&z===1?this:this._t(x,0,0,0,0,M,0,0,0,0,z,0,0,0,0,1);}function g(x,M,z,B,J,tt,K,Pt,xt,Xt,fe,Re,ee,Qt,Te,Rt){return this.props[0]=x,this.props[1]=M,this.props[2]=z,this.props[3]=B,this.props[4]=J,this.props[5]=tt,this.props[6]=K,this.props[7]=Pt,this.props[8]=xt,this.props[9]=Xt,this.props[10]=fe,this.props[11]=Re,this.props[12]=ee,this.props[13]=Qt,this.props[14]=Te,this.props[15]=Rt,this;}function E(x,M,z){return z=z||0,x!==0||M!==0||z!==0?this._t(1,0,0,0,0,1,0,0,0,0,1,0,x,M,z,1):this;}function P(x,M,z,B,J,tt,K,Pt,xt,Xt,fe,Re,ee,Qt,Te,Rt){var lt=this.props;if(x===1&&M===0&&z===0&&B===0&&J===0&&tt===1&&K===0&&Pt===0&&xt===0&&Xt===0&&fe===1&&Re===0)return lt[12]=lt[12]*x+lt[15]*ee,lt[13]=lt[13]*tt+lt[15]*Qt,lt[14]=lt[14]*fe+lt[15]*Te,lt[15]*=Rt,this._identityCalculated=!1,this;var $e=lt[0],Ge=lt[1],hn=lt[2],Ue=lt[3],He=lt[4],Xe=lt[5],ge=lt[6],yn=lt[7],Pn=lt[8],we=lt[9],pn=lt[10],Fe=lt[11],Ln=lt[12],ii=lt[13],ri=lt[14],Ai=lt[15];return lt[0]=$e*x+Ge*J+hn*xt+Ue*ee,lt[1]=$e*M+Ge*tt+hn*Xt+Ue*Qt,lt[2]=$e*z+Ge*K+hn*fe+Ue*Te,lt[3]=$e*B+Ge*Pt+hn*Re+Ue*Rt,lt[4]=He*x+Xe*J+ge*xt+yn*ee,lt[5]=He*M+Xe*tt+ge*Xt+yn*Qt,lt[6]=He*z+Xe*K+ge*fe+yn*Te,lt[7]=He*B+Xe*Pt+ge*Re+yn*Rt,lt[8]=Pn*x+we*J+pn*xt+Fe*ee,lt[9]=Pn*M+we*tt+pn*Xt+Fe*Qt,lt[10]=Pn*z+we*K+pn*fe+Fe*Te,lt[11]=Pn*B+we*Pt+pn*Re+Fe*Rt,lt[12]=Ln*x+ii*J+ri*xt+Ai*ee,lt[13]=Ln*M+ii*tt+ri*Xt+Ai*Qt,lt[14]=Ln*z+ii*K+ri*fe+Ai*Te,lt[15]=Ln*B+ii*Pt+ri*Re+Ai*Rt,this._identityCalculated=!1,this;}function k(x){var M=x.props;return this.transform(M[0],M[1],M[2],M[3],M[4],M[5],M[6],M[7],M[8],M[9],M[10],M[11],M[12],M[13],M[14],M[15]);}function v(){return this._identityCalculated||(this._identity=!(this.props[0]!==1||this.props[1]!==0||this.props[2]!==0||this.props[3]!==0||this.props[4]!==0||this.props[5]!==1||this.props[6]!==0||this.props[7]!==0||this.props[8]!==0||this.props[9]!==0||this.props[10]!==1||this.props[11]!==0||this.props[12]!==0||this.props[13]!==0||this.props[14]!==0||this.props[15]!==1),this._identityCalculated=!0),this._identity;}function C(x){for(var M=0;M<16;){if(x.props[M]!==this.props[M])return!1;M+=1;}return!0;}function y(x){var M;for(M=0;M<16;M+=1)x.props[M]=this.props[M];return x;}function S(x){var M;for(M=0;M<16;M+=1)this.props[M]=x[M];}function O(x,M,z){return{x:x*this.props[0]+M*this.props[4]+z*this.props[8]+this.props[12],y:x*this.props[1]+M*this.props[5]+z*this.props[9]+this.props[13],z:x*this.props[2]+M*this.props[6]+z*this.props[10]+this.props[14]};}function A(x,M,z){return x*this.props[0]+M*this.props[4]+z*this.props[8]+this.props[12];}function R(x,M,z){return x*this.props[1]+M*this.props[5]+z*this.props[9]+this.props[13];}function N(x,M,z){return x*this.props[2]+M*this.props[6]+z*this.props[10]+this.props[14];}function H(){var x=this.props[0]*this.props[5]-this.props[1]*this.props[4],M=this.props[5]/x,z=-this.props[1]/x,B=-this.props[4]/x,J=this.props[0]/x,tt=(this.props[4]*this.props[13]-this.props[5]*this.props[12])/x,K=-(this.props[0]*this.props[13]-this.props[1]*this.props[12])/x,Pt=new Matrix();return Pt.props[0]=M,Pt.props[1]=z,Pt.props[4]=B,Pt.props[5]=J,Pt.props[12]=tt,Pt.props[13]=K,Pt;}function it(x){var M=this.getInverseMatrix();return M.applyToPointArray(x[0],x[1],x[2]||0);}function nt(x){var M,z=x.length,B=[];for(M=0;M<z;M+=1)B[M]=it(x[M]);return B;}function Z(x,M,z){var B=createTypedArray("float32",6);if(this.isIdentity())B[0]=x[0],B[1]=x[1],B[2]=M[0],B[3]=M[1],B[4]=z[0],B[5]=z[1];else{var J=this.props[0],tt=this.props[1],K=this.props[4],Pt=this.props[5],xt=this.props[12],Xt=this.props[13];B[0]=x[0]*J+x[1]*K+xt,B[1]=x[0]*tt+x[1]*Pt+Xt,B[2]=M[0]*J+M[1]*K+xt,B[3]=M[0]*tt+M[1]*Pt+Xt,B[4]=z[0]*J+z[1]*K+xt,B[5]=z[0]*tt+z[1]*Pt+Xt;}return B;}function rt(x,M,z){var B;return this.isIdentity()?B=[x,M,z]:B=[x*this.props[0]+M*this.props[4]+z*this.props[8]+this.props[12],x*this.props[1]+M*this.props[5]+z*this.props[9]+this.props[13],x*this.props[2]+M*this.props[6]+z*this.props[10]+this.props[14]],B;}function Q(x,M){if(this.isIdentity())return x+","+M;var z=this.props;return Math.round((x*z[0]+M*z[4]+z[12])*100)/100+","+Math.round((x*z[1]+M*z[5]+z[13])*100)/100;}function W(){for(var x=0,M=this.props,z="matrix3d(",B=1e4;x<16;)z+=i(M[x]*B)/B,z+=x===15?")":",",x+=1;return z;}function w(x){var M=1e4;return x<1e-6&&x>0||x>-1e-6&&x<0?i(x*M)/M:x;}function F(){var x=this.props,M=w(x[0]),z=w(x[1]),B=w(x[4]),J=w(x[5]),tt=w(x[12]),K=w(x[13]);return"matrix("+M+","+z+","+B+","+J+","+tt+","+K+")";}return function(){this.reset=o,this.rotate=s,this.rotateX=l,this.rotateY=h,this.rotateZ=p,this.skew=m,this.skewFromAxis=b,this.shear=u,this.scale=d,this.setTransform=g,this.translate=E,this.transform=P,this.multiply=k,this.applyToPoint=O,this.applyToX=A,this.applyToY=R,this.applyToZ=N,this.applyToPointArray=rt,this.applyToTriplePoints=Z,this.applyToPointStringified=Q,this.toCSS=W,this.to2dCSS=F,this.clone=y,this.cloneFromProps=S,this.equals=C,this.inversePoints=nt,this.inversePoint=it,this.getInverseMatrix=H,this._t=this.transform,this.isIdentity=v,this._identity=!0,this._identityCalculated=!1,this.props=createTypedArray("float32",16),this.reset();};}();function _typeof$3(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof$3=function(n){return typeof n;}:_typeof$3=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof$3(t);}var lottie={},standalone="__[STANDALONE]__",animationData="__[ANIMATIONDATA]__",renderer="";function setLocation(t){setLocationHref(t);}function searchAnimations(){standalone===!0?animationManager.searchAnimations(animationData,standalone,renderer):animationManager.searchAnimations();}function setSubframeRendering(t){setSubframeEnabled(t);}function setPrefix(t){setIdPrefix(t);}function loadAnimation(t){return standalone===!0&&(t.animationData=JSON.parse(animationData)),animationManager.loadAnimation(t);}function setQuality(t){if(typeof t=="string")switch(t){case"high":setDefaultCurveSegments(200);break;default:case"medium":setDefaultCurveSegments(50);break;case"low":setDefaultCurveSegments(10);break;}else!isNaN(t)&&t>1&&setDefaultCurveSegments(t);getDefaultCurveSegments()>=50?roundValues(!1):roundValues(!0);}function inBrowser(){return typeof navigator<"u";}function installPlugin(t,e){t==="expressions"&&setExpressionsPlugin(e);}function getFactory(t){switch(t){case"propertyFactory":return PropertyFactory;case"shapePropertyFactory":return ShapePropertyFactory;case"matrix":return Matrix;default:return null;}}lottie.play=animationManager.play,lottie.pause=animationManager.pause,lottie.setLocationHref=setLocation,lottie.togglePause=animationManager.togglePause,lottie.setSpeed=animationManager.setSpeed,lottie.setDirection=animationManager.setDirection,lottie.stop=animationManager.stop,lottie.searchAnimations=searchAnimations,lottie.registerAnimation=animationManager.registerAnimation,lottie.loadAnimation=loadAnimation,lottie.setSubframeRendering=setSubframeRendering,lottie.resize=animationManager.resize,lottie.goToAndStop=animationManager.goToAndStop,lottie.destroy=animationManager.destroy,lottie.setQuality=setQuality,lottie.inBrowser=inBrowser,lottie.installPlugin=installPlugin,lottie.freeze=animationManager.freeze,lottie.unfreeze=animationManager.unfreeze,lottie.setVolume=animationManager.setVolume,lottie.mute=animationManager.mute,lottie.unmute=animationManager.unmute,lottie.getRegisteredAnimations=animationManager.getRegisteredAnimations,lottie.useWebWorker=setWebWorker,lottie.setIDPrefix=setPrefix,lottie.__getFactory=getFactory,lottie.version="5.12.2";function checkReady(){document.readyState==="complete"&&(clearInterval(readyStateCheckInterval),searchAnimations());}function getQueryVariable(t){for(var e=queryString.split("&"),n=0;n<e.length;n+=1){var i=e[n].split("=");if(decodeURIComponent(i[0])==t)return decodeURIComponent(i[1]);}return null;}var queryString="";if(standalone){var scripts=document.getElementsByTagName("script"),index=scripts.length-1,myScript=scripts[index]||{src:""};queryString=myScript.src?myScript.src.replace(/^[^\?]+\??/,""):"",renderer=getQueryVariable("renderer");}var readyStateCheckInterval=setInterval(checkReady,100);try{!((typeof exports>"u"?"undefined":_typeof$3(exports))==="object"&&typeof module<"u")&&!(typeof define=="function"&&define.amd)&&(window.bodymovin=lottie);}catch(t){}var ShapeModifiers=function(){var t={},e={};t.registerModifier=n,t.getModifier=i;function n(o,s){e[o]||(e[o]=s);}function i(o,s,l){return new e[o](s,l);}return t;}();function ShapeModifier(){}ShapeModifier.prototype.initModifierProperties=function(){},ShapeModifier.prototype.addShapeToModifier=function(){},ShapeModifier.prototype.addShape=function(t){if(!this.closed){t.sh.container.addDynamicProperty(t.sh);var e={shape:t.sh,data:t,localShapeCollection:shapeCollectionPool.newShapeCollection()};this.shapes.push(e),this.addShapeToModifier(e),this._isAnimated&&t.setAsAnimated();}},ShapeModifier.prototype.init=function(t,e){this.shapes=[],this.elem=t,this.initDynamicPropertyContainer(t),this.initModifierProperties(t,e),this.frameId=initialDefaultFrame,this.closed=!1,this.k=!1,this.dynamicProperties.length?this.k=!0:this.getValue(!0);},ShapeModifier.prototype.processKeys=function(){this.elem.globalData.frameId!==this.frameId&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties());},extendPrototype([DynamicPropertyContainer],ShapeModifier);function TrimModifier(){}extendPrototype([ShapeModifier],TrimModifier),TrimModifier.prototype.initModifierProperties=function(t,e){this.s=PropertyFactory.getProp(t,e.s,0,.01,this),this.e=PropertyFactory.getProp(t,e.e,0,.01,this),this.o=PropertyFactory.getProp(t,e.o,0,0,this),this.sValue=0,this.eValue=0,this.getValue=this.processKeys,this.m=e.m,this._isAnimated=!!this.s.effectsSequence.length||!!this.e.effectsSequence.length||!!this.o.effectsSequence.length;},TrimModifier.prototype.addShapeToModifier=function(t){t.pathsData=[];},TrimModifier.prototype.calculateShapeEdges=function(t,e,n,i,o){var s=[];e<=1?s.push({s:t,e}):t>=1?s.push({s:t-1,e:e-1}):(s.push({s:t,e:1}),s.push({s:0,e:e-1}));var l=[],h,p=s.length,u;for(h=0;h<p;h+=1)if(u=s[h],!(u.e*o<i||u.s*o>i+n)){var m,b;u.s*o<=i?m=0:m=(u.s*o-i)/n,u.e*o>=i+n?b=1:b=(u.e*o-i)/n,l.push([m,b]);}return l.length||l.push([0,0]),l;},TrimModifier.prototype.releasePathsData=function(t){var e,n=t.length;for(e=0;e<n;e+=1)segmentsLengthPool.release(t[e]);return t.length=0,t;},TrimModifier.prototype.processShapes=function(t){var e,n;if(this._mdf||t){var i=this.o.v%360/360;if(i<0&&(i+=1),this.s.v>1?e=1+i:this.s.v<0?e=0+i:e=this.s.v+i,this.e.v>1?n=1+i:this.e.v<0?n=0+i:n=this.e.v+i,e>n){var o=e;e=n,n=o;}e=Math.round(e*1e4)*1e-4,n=Math.round(n*1e4)*1e-4,this.sValue=e,this.eValue=n;}else e=this.sValue,n=this.eValue;var s,l,h=this.shapes.length,p,u,m,b,d,g=0;if(n===e)for(l=0;l<h;l+=1)this.shapes[l].localShapeCollection.releaseShapes(),this.shapes[l].shape._mdf=!0,this.shapes[l].shape.paths=this.shapes[l].localShapeCollection,this._mdf&&(this.shapes[l].pathsData.length=0);else if(n===1&&e===0||n===0&&e===1){if(this._mdf)for(l=0;l<h;l+=1)this.shapes[l].pathsData.length=0,this.shapes[l].shape._mdf=!0;}else{var E=[],P,k;for(l=0;l<h;l+=1)if(P=this.shapes[l],!P.shape._mdf&&!this._mdf&&!t&&this.m!==2)P.shape.paths=P.localShapeCollection;else{if(s=P.shape.paths,u=s._length,d=0,!P.shape._mdf&&P.pathsData.length)d=P.totalShapeLength;else{for(m=this.releasePathsData(P.pathsData),p=0;p<u;p+=1)b=bez.getSegmentsLength(s.shapes[p]),m.push(b),d+=b.totalLength;P.totalShapeLength=d,P.pathsData=m;}g+=d,P.shape._mdf=!0;}var v=e,C=n,y=0,S;for(l=h-1;l>=0;l-=1)if(P=this.shapes[l],P.shape._mdf){for(k=P.localShapeCollection,k.releaseShapes(),this.m===2&&h>1?(S=this.calculateShapeEdges(e,n,P.totalShapeLength,y,g),y+=P.totalShapeLength):S=[[v,C]],u=S.length,p=0;p<u;p+=1){v=S[p][0],C=S[p][1],E.length=0,C<=1?E.push({s:P.totalShapeLength*v,e:P.totalShapeLength*C}):v>=1?E.push({s:P.totalShapeLength*(v-1),e:P.totalShapeLength*(C-1)}):(E.push({s:P.totalShapeLength*v,e:P.totalShapeLength}),E.push({s:0,e:P.totalShapeLength*(C-1)}));var O=this.addShapes(P,E[0]);if(E[0].s!==E[0].e){if(E.length>1){var A=P.shape.paths.shapes[P.shape.paths._length-1];if(A.c){var R=O.pop();this.addPaths(O,k),O=this.addShapes(P,E[1],R);}else this.addPaths(O,k),O=this.addShapes(P,E[1]);}this.addPaths(O,k);}}P.shape.paths=k;}}},TrimModifier.prototype.addPaths=function(t,e){var n,i=t.length;for(n=0;n<i;n+=1)e.addShape(t[n]);},TrimModifier.prototype.addSegment=function(t,e,n,i,o,s,l){o.setXYAt(e[0],e[1],"o",s),o.setXYAt(n[0],n[1],"i",s+1),l&&o.setXYAt(t[0],t[1],"v",s),o.setXYAt(i[0],i[1],"v",s+1);},TrimModifier.prototype.addSegmentFromArray=function(t,e,n,i){e.setXYAt(t[1],t[5],"o",n),e.setXYAt(t[2],t[6],"i",n+1),i&&e.setXYAt(t[0],t[4],"v",n),e.setXYAt(t[3],t[7],"v",n+1);},TrimModifier.prototype.addShapes=function(t,e,n){var i=t.pathsData,o=t.shape.paths.shapes,s,l=t.shape.paths._length,h,p,u=0,m,b,d,g,E=[],P,k=!0;for(n?(b=n._length,P=n._length):(n=shapePool.newElement(),b=0,P=0),E.push(n),s=0;s<l;s+=1){for(d=i[s].lengths,n.c=o[s].c,p=o[s].c?d.length:d.length+1,h=1;h<p;h+=1)if(m=d[h-1],u+m.addedLength<e.s)u+=m.addedLength,n.c=!1;else if(u>e.e){n.c=!1;break;}else e.s<=u&&e.e>=u+m.addedLength?(this.addSegment(o[s].v[h-1],o[s].o[h-1],o[s].i[h],o[s].v[h],n,b,k),k=!1):(g=bez.getNewSegment(o[s].v[h-1],o[s].v[h],o[s].o[h-1],o[s].i[h],(e.s-u)/m.addedLength,(e.e-u)/m.addedLength,d[h-1]),this.addSegmentFromArray(g,n,b,k),k=!1,n.c=!1),u+=m.addedLength,b+=1;if(o[s].c&&d.length){if(m=d[h-1],u<=e.e){var v=d[h-1].addedLength;e.s<=u&&e.e>=u+v?(this.addSegment(o[s].v[h-1],o[s].o[h-1],o[s].i[0],o[s].v[0],n,b,k),k=!1):(g=bez.getNewSegment(o[s].v[h-1],o[s].v[0],o[s].o[h-1],o[s].i[0],(e.s-u)/v,(e.e-u)/v,d[h-1]),this.addSegmentFromArray(g,n,b,k),k=!1,n.c=!1);}else n.c=!1;u+=m.addedLength,b+=1;}if(n._length&&(n.setXYAt(n.v[P][0],n.v[P][1],"i",P),n.setXYAt(n.v[n._length-1][0],n.v[n._length-1][1],"o",n._length-1)),u>e.e)break;s<l-1&&(n=shapePool.newElement(),k=!0,E.push(n),b=0);}return E;};function PuckerAndBloatModifier(){}extendPrototype([ShapeModifier],PuckerAndBloatModifier),PuckerAndBloatModifier.prototype.initModifierProperties=function(t,e){this.getValue=this.processKeys,this.amount=PropertyFactory.getProp(t,e.a,0,null,this),this._isAnimated=!!this.amount.effectsSequence.length;},PuckerAndBloatModifier.prototype.processPath=function(t,e){var n=e/100,i=[0,0],o=t._length,s=0;for(s=0;s<o;s+=1)i[0]+=t.v[s][0],i[1]+=t.v[s][1];i[0]/=o,i[1]/=o;var l=shapePool.newElement();l.c=t.c;var h,p,u,m,b,d;for(s=0;s<o;s+=1)h=t.v[s][0]+(i[0]-t.v[s][0])*n,p=t.v[s][1]+(i[1]-t.v[s][1])*n,u=t.o[s][0]+(i[0]-t.o[s][0])*-n,m=t.o[s][1]+(i[1]-t.o[s][1])*-n,b=t.i[s][0]+(i[0]-t.i[s][0])*-n,d=t.i[s][1]+(i[1]-t.i[s][1])*-n,l.setTripleAt(h,p,u,m,b,d,s);return l;},PuckerAndBloatModifier.prototype.processShapes=function(t){var e,n,i=this.shapes.length,o,s,l=this.amount.v;if(l!==0){var h,p;for(n=0;n<i;n+=1){if(h=this.shapes[n],p=h.localShapeCollection,!(!h.shape._mdf&&!this._mdf&&!t))for(p.releaseShapes(),h.shape._mdf=!0,e=h.shape.paths.shapes,s=h.shape.paths._length,o=0;o<s;o+=1)p.addShape(this.processPath(e[o],l));h.shape.paths=h.localShapeCollection;}}this.dynamicProperties.length||(this._mdf=!1);};var TransformPropertyFactory=function(){var t=[0,0];function e(p){var u=this._mdf;this.iterateDynamicProperties(),this._mdf=this._mdf||u,this.a&&p.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]),this.s&&p.scale(this.s.v[0],this.s.v[1],this.s.v[2]),this.sk&&p.skewFromAxis(-this.sk.v,this.sa.v),this.r?p.rotate(-this.r.v):p.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),this.data.p.s?this.data.p.z?p.translate(this.px.v,this.py.v,-this.pz.v):p.translate(this.px.v,this.py.v,0):p.translate(this.p.v[0],this.p.v[1],-this.p.v[2]);}function n(p){if(this.elem.globalData.frameId!==this.frameId){if(this._isDirty&&(this.precalculateMatrix(),this._isDirty=!1),this.iterateDynamicProperties(),this._mdf||p){var u;if(this.v.cloneFromProps(this.pre.props),this.appliedTransformations<1&&this.v.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]),this.appliedTransformations<2&&this.v.scale(this.s.v[0],this.s.v[1],this.s.v[2]),this.sk&&this.appliedTransformations<3&&this.v.skewFromAxis(-this.sk.v,this.sa.v),this.r&&this.appliedTransformations<4?this.v.rotate(-this.r.v):!this.r&&this.appliedTransformations<4&&this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),this.autoOriented){var m,b;if(u=this.elem.globalData.frameRate,this.p&&this.p.keyframes&&this.p.getValueAtTime)this.p._caching.lastFrame+this.p.offsetTime<=this.p.keyframes[0].t?(m=this.p.getValueAtTime((this.p.keyframes[0].t+.01)/u,0),b=this.p.getValueAtTime(this.p.keyframes[0].t/u,0)):this.p._caching.lastFrame+this.p.offsetTime>=this.p.keyframes[this.p.keyframes.length-1].t?(m=this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length-1].t/u,0),b=this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length-1].t-.05)/u,0)):(m=this.p.pv,b=this.p.getValueAtTime((this.p._caching.lastFrame+this.p.offsetTime-.01)/u,this.p.offsetTime));else if(this.px&&this.px.keyframes&&this.py.keyframes&&this.px.getValueAtTime&&this.py.getValueAtTime){m=[],b=[];var d=this.px,g=this.py;d._caching.lastFrame+d.offsetTime<=d.keyframes[0].t?(m[0]=d.getValueAtTime((d.keyframes[0].t+.01)/u,0),m[1]=g.getValueAtTime((g.keyframes[0].t+.01)/u,0),b[0]=d.getValueAtTime(d.keyframes[0].t/u,0),b[1]=g.getValueAtTime(g.keyframes[0].t/u,0)):d._caching.lastFrame+d.offsetTime>=d.keyframes[d.keyframes.length-1].t?(m[0]=d.getValueAtTime(d.keyframes[d.keyframes.length-1].t/u,0),m[1]=g.getValueAtTime(g.keyframes[g.keyframes.length-1].t/u,0),b[0]=d.getValueAtTime((d.keyframes[d.keyframes.length-1].t-.01)/u,0),b[1]=g.getValueAtTime((g.keyframes[g.keyframes.length-1].t-.01)/u,0)):(m=[d.pv,g.pv],b[0]=d.getValueAtTime((d._caching.lastFrame+d.offsetTime-.01)/u,d.offsetTime),b[1]=g.getValueAtTime((g._caching.lastFrame+g.offsetTime-.01)/u,g.offsetTime));}else b=t,m=b;this.v.rotate(-Math.atan2(m[1]-b[1],m[0]-b[0]));}this.data.p&&this.data.p.s?this.data.p.z?this.v.translate(this.px.v,this.py.v,-this.pz.v):this.v.translate(this.px.v,this.py.v,0):this.v.translate(this.p.v[0],this.p.v[1],-this.p.v[2]);}this.frameId=this.elem.globalData.frameId;}}function i(){if(this.appliedTransformations=0,this.pre.reset(),!this.a.effectsSequence.length)this.pre.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]),this.appliedTransformations=1;else return;if(!this.s.effectsSequence.length)this.pre.scale(this.s.v[0],this.s.v[1],this.s.v[2]),this.appliedTransformations=2;else return;if(this.sk)if(!this.sk.effectsSequence.length&&!this.sa.effectsSequence.length)this.pre.skewFromAxis(-this.sk.v,this.sa.v),this.appliedTransformations=3;else return;this.r?this.r.effectsSequence.length||(this.pre.rotate(-this.r.v),this.appliedTransformations=4):!this.rz.effectsSequence.length&&!this.ry.effectsSequence.length&&!this.rx.effectsSequence.length&&!this.or.effectsSequence.length&&(this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]),this.appliedTransformations=4);}function o(){}function s(p){this._addDynamicProperty(p),this.elem.addDynamicProperty(p),this._isDirty=!0;}function l(p,u,m){if(this.elem=p,this.frameId=-1,this.propType="transform",this.data=u,this.v=new Matrix(),this.pre=new Matrix(),this.appliedTransformations=0,this.initDynamicPropertyContainer(m||p),u.p&&u.p.s?(this.px=PropertyFactory.getProp(p,u.p.x,0,0,this),this.py=PropertyFactory.getProp(p,u.p.y,0,0,this),u.p.z&&(this.pz=PropertyFactory.getProp(p,u.p.z,0,0,this))):this.p=PropertyFactory.getProp(p,u.p||{k:[0,0,0]},1,0,this),u.rx){if(this.rx=PropertyFactory.getProp(p,u.rx,0,degToRads,this),this.ry=PropertyFactory.getProp(p,u.ry,0,degToRads,this),this.rz=PropertyFactory.getProp(p,u.rz,0,degToRads,this),u.or.k[0].ti){var b,d=u.or.k.length;for(b=0;b<d;b+=1)u.or.k[b].to=null,u.or.k[b].ti=null;}this.or=PropertyFactory.getProp(p,u.or,1,degToRads,this),this.or.sh=!0;}else this.r=PropertyFactory.getProp(p,u.r||{k:0},0,degToRads,this);u.sk&&(this.sk=PropertyFactory.getProp(p,u.sk,0,degToRads,this),this.sa=PropertyFactory.getProp(p,u.sa,0,degToRads,this)),this.a=PropertyFactory.getProp(p,u.a||{k:[0,0,0]},1,0,this),this.s=PropertyFactory.getProp(p,u.s||{k:[100,100,100]},1,.01,this),u.o?this.o=PropertyFactory.getProp(p,u.o,0,.01,p):this.o={_mdf:!1,v:1},this._isDirty=!0,this.dynamicProperties.length||this.getValue(!0);}l.prototype={applyToMatrix:e,getValue:n,precalculateMatrix:i,autoOrient:o},extendPrototype([DynamicPropertyContainer],l),l.prototype.addDynamicProperty=s,l.prototype._addDynamicProperty=DynamicPropertyContainer.prototype.addDynamicProperty;function h(p,u,m){return new l(p,u,m);}return{getTransformProperty:h};}();function RepeaterModifier(){}extendPrototype([ShapeModifier],RepeaterModifier),RepeaterModifier.prototype.initModifierProperties=function(t,e){this.getValue=this.processKeys,this.c=PropertyFactory.getProp(t,e.c,0,null,this),this.o=PropertyFactory.getProp(t,e.o,0,null,this),this.tr=TransformPropertyFactory.getTransformProperty(t,e.tr,this),this.so=PropertyFactory.getProp(t,e.tr.so,0,.01,this),this.eo=PropertyFactory.getProp(t,e.tr.eo,0,.01,this),this.data=e,this.dynamicProperties.length||this.getValue(!0),this._isAnimated=!!this.dynamicProperties.length,this.pMatrix=new Matrix(),this.rMatrix=new Matrix(),this.sMatrix=new Matrix(),this.tMatrix=new Matrix(),this.matrix=new Matrix();},RepeaterModifier.prototype.applyTransforms=function(t,e,n,i,o,s){var l=s?-1:1,h=i.s.v[0]+(1-i.s.v[0])*(1-o),p=i.s.v[1]+(1-i.s.v[1])*(1-o);t.translate(i.p.v[0]*l*o,i.p.v[1]*l*o,i.p.v[2]),e.translate(-i.a.v[0],-i.a.v[1],i.a.v[2]),e.rotate(-i.r.v*l*o),e.translate(i.a.v[0],i.a.v[1],i.a.v[2]),n.translate(-i.a.v[0],-i.a.v[1],i.a.v[2]),n.scale(s?1/h:h,s?1/p:p),n.translate(i.a.v[0],i.a.v[1],i.a.v[2]);},RepeaterModifier.prototype.init=function(t,e,n,i){for(this.elem=t,this.arr=e,this.pos=n,this.elemsData=i,this._currentCopies=0,this._elements=[],this._groups=[],this.frameId=-1,this.initDynamicPropertyContainer(t),this.initModifierProperties(t,e[n]);n>0;)n-=1,this._elements.unshift(e[n]);this.dynamicProperties.length?this.k=!0:this.getValue(!0);},RepeaterModifier.prototype.resetElements=function(t){var e,n=t.length;for(e=0;e<n;e+=1)t[e]._processed=!1,t[e].ty==="gr"&&this.resetElements(t[e].it);},RepeaterModifier.prototype.cloneElements=function(t){var e=JSON.parse(JSON.stringify(t));return this.resetElements(e),e;},RepeaterModifier.prototype.changeGroupRender=function(t,e){var n,i=t.length;for(n=0;n<i;n+=1)t[n]._render=e,t[n].ty==="gr"&&this.changeGroupRender(t[n].it,e);},RepeaterModifier.prototype.processShapes=function(t){var e,n,i,o,s,l=!1;if(this._mdf||t){var h=Math.ceil(this.c.v);if(this._groups.length<h){for(;this._groups.length<h;){var p={it:this.cloneElements(this._elements),ty:"gr"};p.it.push({a:{a:0,ix:1,k:[0,0]},nm:"Transform",o:{a:0,ix:7,k:100},p:{a:0,ix:2,k:[0,0]},r:{a:1,ix:6,k:[{s:0,e:0,t:0},{s:0,e:0,t:1}]},s:{a:0,ix:3,k:[100,100]},sa:{a:0,ix:5,k:0},sk:{a:0,ix:4,k:0},ty:"tr"}),this.arr.splice(0,0,p),this._groups.splice(0,0,p),this._currentCopies+=1;}this.elem.reloadShapes(),l=!0;}s=0;var u;for(i=0;i<=this._groups.length-1;i+=1){if(u=s<h,this._groups[i]._render=u,this.changeGroupRender(this._groups[i].it,u),!u){var m=this.elemsData[i].it,b=m[m.length-1];b.transform.op.v!==0?(b.transform.op._mdf=!0,b.transform.op.v=0):b.transform.op._mdf=!1;}s+=1;}this._currentCopies=h;var d=this.o.v,g=d%1,E=d>0?Math.floor(d):Math.ceil(d),P=this.pMatrix.props,k=this.rMatrix.props,v=this.sMatrix.props;this.pMatrix.reset(),this.rMatrix.reset(),this.sMatrix.reset(),this.tMatrix.reset(),this.matrix.reset();var C=0;if(d>0){for(;C<E;)this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,!1),C+=1;g&&(this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,g,!1),C+=g);}else if(d<0){for(;C>E;)this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,!0),C-=1;g&&(this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,-g,!0),C-=g);}i=this.data.m===1?0:this._currentCopies-1,o=this.data.m===1?1:-1,s=this._currentCopies;for(var y,S;s;){if(e=this.elemsData[i].it,n=e[e.length-1].transform.mProps.v.props,S=n.length,e[e.length-1].transform.mProps._mdf=!0,e[e.length-1].transform.op._mdf=!0,e[e.length-1].transform.op.v=this._currentCopies===1?this.so.v:this.so.v+(this.eo.v-this.so.v)*(i/(this._currentCopies-1)),C!==0){for((i!==0&&o===1||i!==this._currentCopies-1&&o===-1)&&this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,!1),this.matrix.transform(k[0],k[1],k[2],k[3],k[4],k[5],k[6],k[7],k[8],k[9],k[10],k[11],k[12],k[13],k[14],k[15]),this.matrix.transform(v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12],v[13],v[14],v[15]),this.matrix.transform(P[0],P[1],P[2],P[3],P[4],P[5],P[6],P[7],P[8],P[9],P[10],P[11],P[12],P[13],P[14],P[15]),y=0;y<S;y+=1)n[y]=this.matrix.props[y];this.matrix.reset();}else for(this.matrix.reset(),y=0;y<S;y+=1)n[y]=this.matrix.props[y];C+=1,s-=1,i+=o;}}else for(s=this._currentCopies,i=0,o=1;s;)e=this.elemsData[i].it,n=e[e.length-1].transform.mProps.v.props,e[e.length-1].transform.mProps._mdf=!1,e[e.length-1].transform.op._mdf=!1,s-=1,i+=o;return l;},RepeaterModifier.prototype.addShape=function(){};function RoundCornersModifier(){}extendPrototype([ShapeModifier],RoundCornersModifier),RoundCornersModifier.prototype.initModifierProperties=function(t,e){this.getValue=this.processKeys,this.rd=PropertyFactory.getProp(t,e.r,0,null,this),this._isAnimated=!!this.rd.effectsSequence.length;},RoundCornersModifier.prototype.processPath=function(t,e){var n=shapePool.newElement();n.c=t.c;var i,o=t._length,s,l,h,p,u,m,b=0,d,g,E,P,k,v;for(i=0;i<o;i+=1)s=t.v[i],h=t.o[i],l=t.i[i],s[0]===h[0]&&s[1]===h[1]&&s[0]===l[0]&&s[1]===l[1]?(i===0||i===o-1)&&!t.c?(n.setTripleAt(s[0],s[1],h[0],h[1],l[0],l[1],b),b+=1):(i===0?p=t.v[o-1]:p=t.v[i-1],u=Math.sqrt(Math.pow(s[0]-p[0],2)+Math.pow(s[1]-p[1],2)),m=u?Math.min(u/2,e)/u:0,k=s[0]+(p[0]-s[0])*m,d=k,v=s[1]-(s[1]-p[1])*m,g=v,E=d-(d-s[0])*roundCorner,P=g-(g-s[1])*roundCorner,n.setTripleAt(d,g,E,P,k,v,b),b+=1,i===o-1?p=t.v[0]:p=t.v[i+1],u=Math.sqrt(Math.pow(s[0]-p[0],2)+Math.pow(s[1]-p[1],2)),m=u?Math.min(u/2,e)/u:0,E=s[0]+(p[0]-s[0])*m,d=E,P=s[1]+(p[1]-s[1])*m,g=P,k=d-(d-s[0])*roundCorner,v=g-(g-s[1])*roundCorner,n.setTripleAt(d,g,E,P,k,v,b),b+=1):(n.setTripleAt(t.v[i][0],t.v[i][1],t.o[i][0],t.o[i][1],t.i[i][0],t.i[i][1],b),b+=1);return n;},RoundCornersModifier.prototype.processShapes=function(t){var e,n,i=this.shapes.length,o,s,l=this.rd.v;if(l!==0){var h,p;for(n=0;n<i;n+=1){if(h=this.shapes[n],p=h.localShapeCollection,!(!h.shape._mdf&&!this._mdf&&!t))for(p.releaseShapes(),h.shape._mdf=!0,e=h.shape.paths.shapes,s=h.shape.paths._length,o=0;o<s;o+=1)p.addShape(this.processPath(e[o],l));h.shape.paths=h.localShapeCollection;}}this.dynamicProperties.length||(this._mdf=!1);};function floatEqual(t,e){return Math.abs(t-e)*1e5<=Math.min(Math.abs(t),Math.abs(e));}function floatZero(t){return Math.abs(t)<=1e-5;}function lerp(t,e,n){return t*(1-n)+e*n;}function lerpPoint(t,e,n){return[lerp(t[0],e[0],n),lerp(t[1],e[1],n)];}function quadRoots(t,e,n){if(t===0)return[];var i=e*e-4*t*n;if(i<0)return[];var o=-e/(2*t);if(i===0)return[o];var s=Math.sqrt(i)/(2*t);return[o-s,o+s];}function polynomialCoefficients(t,e,n,i){return[-t+3*e-3*n+i,3*t-6*e+3*n,-3*t+3*e,t];}function singlePoint(t){return new PolynomialBezier(t,t,t,t,!1);}function PolynomialBezier(t,e,n,i,o){o&&pointEqual(t,e)&&(e=lerpPoint(t,i,1/3)),o&&pointEqual(n,i)&&(n=lerpPoint(t,i,2/3));var s=polynomialCoefficients(t[0],e[0],n[0],i[0]),l=polynomialCoefficients(t[1],e[1],n[1],i[1]);this.a=[s[0],l[0]],this.b=[s[1],l[1]],this.c=[s[2],l[2]],this.d=[s[3],l[3]],this.points=[t,e,n,i];}PolynomialBezier.prototype.point=function(t){return[((this.a[0]*t+this.b[0])*t+this.c[0])*t+this.d[0],((this.a[1]*t+this.b[1])*t+this.c[1])*t+this.d[1]];},PolynomialBezier.prototype.derivative=function(t){return[(3*t*this.a[0]+2*this.b[0])*t+this.c[0],(3*t*this.a[1]+2*this.b[1])*t+this.c[1]];},PolynomialBezier.prototype.tangentAngle=function(t){var e=this.derivative(t);return Math.atan2(e[1],e[0]);},PolynomialBezier.prototype.normalAngle=function(t){var e=this.derivative(t);return Math.atan2(e[0],e[1]);},PolynomialBezier.prototype.inflectionPoints=function(){var t=this.a[1]*this.b[0]-this.a[0]*this.b[1];if(floatZero(t))return[];var e=-.5*(this.a[1]*this.c[0]-this.a[0]*this.c[1])/t,n=e*e-1/3*(this.b[1]*this.c[0]-this.b[0]*this.c[1])/t;if(n<0)return[];var i=Math.sqrt(n);return floatZero(i)?i>0&&i<1?[e]:[]:[e-i,e+i].filter(function(o){return o>0&&o<1;});},PolynomialBezier.prototype.split=function(t){if(t<=0)return[singlePoint(this.points[0]),this];if(t>=1)return[this,singlePoint(this.points[this.points.length-1])];var e=lerpPoint(this.points[0],this.points[1],t),n=lerpPoint(this.points[1],this.points[2],t),i=lerpPoint(this.points[2],this.points[3],t),o=lerpPoint(e,n,t),s=lerpPoint(n,i,t),l=lerpPoint(o,s,t);return[new PolynomialBezier(this.points[0],e,o,l,!0),new PolynomialBezier(l,s,i,this.points[3],!0)];};function extrema(t,e){var n=t.points[0][e],i=t.points[t.points.length-1][e];if(n>i){var o=i;i=n,n=o;}for(var s=quadRoots(3*t.a[e],2*t.b[e],t.c[e]),l=0;l<s.length;l+=1)if(s[l]>0&&s[l]<1){var h=t.point(s[l])[e];h<n?n=h:h>i&&(i=h);}return{min:n,max:i};}PolynomialBezier.prototype.bounds=function(){return{x:extrema(this,0),y:extrema(this,1)};},PolynomialBezier.prototype.boundingBox=function(){var t=this.bounds();return{left:t.x.min,right:t.x.max,top:t.y.min,bottom:t.y.max,width:t.x.max-t.x.min,height:t.y.max-t.y.min,cx:(t.x.max+t.x.min)/2,cy:(t.y.max+t.y.min)/2};};function intersectData(t,e,n){var i=t.boundingBox();return{cx:i.cx,cy:i.cy,width:i.width,height:i.height,bez:t,t:(e+n)/2,t1:e,t2:n};}function splitData(t){var e=t.bez.split(.5);return[intersectData(e[0],t.t1,t.t),intersectData(e[1],t.t,t.t2)];}function boxIntersect(t,e){return Math.abs(t.cx-e.cx)*2<t.width+e.width&&Math.abs(t.cy-e.cy)*2<t.height+e.height;}function intersectsImpl(t,e,n,i,o,s){if(boxIntersect(t,e)){if(n>=s||t.width<=i&&t.height<=i&&e.width<=i&&e.height<=i){o.push([t.t,e.t]);return;}var l=splitData(t),h=splitData(e);intersectsImpl(l[0],h[0],n+1,i,o,s),intersectsImpl(l[0],h[1],n+1,i,o,s),intersectsImpl(l[1],h[0],n+1,i,o,s),intersectsImpl(l[1],h[1],n+1,i,o,s);}}PolynomialBezier.prototype.intersections=function(t,e,n){e===void 0&&(e=2),n===void 0&&(n=7);var i=[];return intersectsImpl(intersectData(this,0,1),intersectData(t,0,1),0,e,i,n),i;},PolynomialBezier.shapeSegment=function(t,e){var n=(e+1)%t.length();return new PolynomialBezier(t.v[e],t.o[e],t.i[n],t.v[n],!0);},PolynomialBezier.shapeSegmentInverted=function(t,e){var n=(e+1)%t.length();return new PolynomialBezier(t.v[n],t.i[n],t.o[e],t.v[e],!0);};function crossProduct(t,e){return[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]];}function lineIntersection(t,e,n,i){var o=[t[0],t[1],1],s=[e[0],e[1],1],l=[n[0],n[1],1],h=[i[0],i[1],1],p=crossProduct(crossProduct(o,s),crossProduct(l,h));return floatZero(p[2])?null:[p[0]/p[2],p[1]/p[2]];}function polarOffset(t,e,n){return[t[0]+Math.cos(e)*n,t[1]-Math.sin(e)*n];}function pointDistance(t,e){return Math.hypot(t[0]-e[0],t[1]-e[1]);}function pointEqual(t,e){return floatEqual(t[0],e[0])&&floatEqual(t[1],e[1]);}function ZigZagModifier(){}extendPrototype([ShapeModifier],ZigZagModifier),ZigZagModifier.prototype.initModifierProperties=function(t,e){this.getValue=this.processKeys,this.amplitude=PropertyFactory.getProp(t,e.s,0,null,this),this.frequency=PropertyFactory.getProp(t,e.r,0,null,this),this.pointsType=PropertyFactory.getProp(t,e.pt,0,null,this),this._isAnimated=this.amplitude.effectsSequence.length!==0||this.frequency.effectsSequence.length!==0||this.pointsType.effectsSequence.length!==0;};function setPoint(t,e,n,i,o,s,l){var h=n-Math.PI/2,p=n+Math.PI/2,u=e[0]+Math.cos(n)*i*o,m=e[1]-Math.sin(n)*i*o;t.setTripleAt(u,m,u+Math.cos(h)*s,m-Math.sin(h)*s,u+Math.cos(p)*l,m-Math.sin(p)*l,t.length());}function getPerpendicularVector(t,e){var n=[e[0]-t[0],e[1]-t[1]],i=-Math.PI*.5,o=[Math.cos(i)*n[0]-Math.sin(i)*n[1],Math.sin(i)*n[0]+Math.cos(i)*n[1]];return o;}function getProjectingAngle(t,e){var n=e===0?t.length()-1:e-1,i=(e+1)%t.length(),o=t.v[n],s=t.v[i],l=getPerpendicularVector(o,s);return Math.atan2(0,1)-Math.atan2(l[1],l[0]);}function zigZagCorner(t,e,n,i,o,s,l){var h=getProjectingAngle(e,n),p=e.v[n%e._length],u=e.v[n===0?e._length-1:n-1],m=e.v[(n+1)%e._length],b=s===2?Math.sqrt(Math.pow(p[0]-u[0],2)+Math.pow(p[1]-u[1],2)):0,d=s===2?Math.sqrt(Math.pow(p[0]-m[0],2)+Math.pow(p[1]-m[1],2)):0;setPoint(t,e.v[n%e._length],h,l,i,d/((o+1)*2),b/((o+1)*2),s);}function zigZagSegment(t,e,n,i,o,s){for(var l=0;l<i;l+=1){var h=(l+1)/(i+1),p=o===2?Math.sqrt(Math.pow(e.points[3][0]-e.points[0][0],2)+Math.pow(e.points[3][1]-e.points[0][1],2)):0,u=e.normalAngle(h),m=e.point(h);setPoint(t,m,u,s,n,p/((i+1)*2),p/((i+1)*2),o),s=-s;}return s;}ZigZagModifier.prototype.processPath=function(t,e,n,i){var o=t._length,s=shapePool.newElement();if(s.c=t.c,t.c||(o-=1),o===0)return s;var l=-1,h=PolynomialBezier.shapeSegment(t,0);zigZagCorner(s,t,0,e,n,i,l);for(var p=0;p<o;p+=1)l=zigZagSegment(s,h,e,n,i,-l),p===o-1&&!t.c?h=null:h=PolynomialBezier.shapeSegment(t,(p+1)%o),zigZagCorner(s,t,p+1,e,n,i,l);return s;},ZigZagModifier.prototype.processShapes=function(t){var e,n,i=this.shapes.length,o,s,l=this.amplitude.v,h=Math.max(0,Math.round(this.frequency.v)),p=this.pointsType.v;if(l!==0){var u,m;for(n=0;n<i;n+=1){if(u=this.shapes[n],m=u.localShapeCollection,!(!u.shape._mdf&&!this._mdf&&!t))for(m.releaseShapes(),u.shape._mdf=!0,e=u.shape.paths.shapes,s=u.shape.paths._length,o=0;o<s;o+=1)m.addShape(this.processPath(e[o],l,h,p));u.shape.paths=u.localShapeCollection;}}this.dynamicProperties.length||(this._mdf=!1);};function linearOffset(t,e,n){var i=Math.atan2(e[0]-t[0],e[1]-t[1]);return[polarOffset(t,i,n),polarOffset(e,i,n)];}function offsetSegment(t,e){var n,i,o,s,l,h,p;p=linearOffset(t.points[0],t.points[1],e),n=p[0],i=p[1],p=linearOffset(t.points[1],t.points[2],e),o=p[0],s=p[1],p=linearOffset(t.points[2],t.points[3],e),l=p[0],h=p[1];var u=lineIntersection(n,i,o,s);u===null&&(u=i);var m=lineIntersection(l,h,o,s);return m===null&&(m=l),new PolynomialBezier(n,u,m,h);}function joinLines(t,e,n,i,o){var s=e.points[3],l=n.points[0];if(i===3||pointEqual(s,l))return s;if(i===2){var h=-e.tangentAngle(1),p=-n.tangentAngle(0)+Math.PI,u=lineIntersection(s,polarOffset(s,h+Math.PI/2,100),l,polarOffset(l,h+Math.PI/2,100)),m=u?pointDistance(u,s):pointDistance(s,l)/2,b=polarOffset(s,h,2*m*roundCorner);return t.setXYAt(b[0],b[1],"o",t.length()-1),b=polarOffset(l,p,2*m*roundCorner),t.setTripleAt(l[0],l[1],l[0],l[1],b[0],b[1],t.length()),l;}var d=pointEqual(s,e.points[2])?e.points[0]:e.points[2],g=pointEqual(l,n.points[1])?n.points[3]:n.points[1],E=lineIntersection(d,s,l,g);return E&&pointDistance(E,s)<o?(t.setTripleAt(E[0],E[1],E[0],E[1],E[0],E[1],t.length()),E):s;}function getIntersection(t,e){var n=t.intersections(e);return n.length&&floatEqual(n[0][0],1)&&n.shift(),n.length?n[0]:null;}function pruneSegmentIntersection(t,e){var n=t.slice(),i=e.slice(),o=getIntersection(t[t.length-1],e[0]);return o&&(n[t.length-1]=t[t.length-1].split(o[0])[0],i[0]=e[0].split(o[1])[1]),t.length>1&&e.length>1&&(o=getIntersection(t[0],e[e.length-1]),o)?[[t[0].split(o[0])[0]],[e[e.length-1].split(o[1])[1]]]:[n,i];}function pruneIntersections(t){for(var e,n=1;n<t.length;n+=1)e=pruneSegmentIntersection(t[n-1],t[n]),t[n-1]=e[0],t[n]=e[1];return t.length>1&&(e=pruneSegmentIntersection(t[t.length-1],t[0]),t[t.length-1]=e[0],t[0]=e[1]),t;}function offsetSegmentSplit(t,e){var n=t.inflectionPoints(),i,o,s,l;if(n.length===0)return[offsetSegment(t,e)];if(n.length===1||floatEqual(n[1],1))return s=t.split(n[0]),i=s[0],o=s[1],[offsetSegment(i,e),offsetSegment(o,e)];s=t.split(n[0]),i=s[0];var h=(n[1]-n[0])/(1-n[0]);return s=s[1].split(h),l=s[0],o=s[1],[offsetSegment(i,e),offsetSegment(l,e),offsetSegment(o,e)];}function OffsetPathModifier(){}extendPrototype([ShapeModifier],OffsetPathModifier),OffsetPathModifier.prototype.initModifierProperties=function(t,e){this.getValue=this.processKeys,this.amount=PropertyFactory.getProp(t,e.a,0,null,this),this.miterLimit=PropertyFactory.getProp(t,e.ml,0,null,this),this.lineJoin=e.lj,this._isAnimated=this.amount.effectsSequence.length!==0;},OffsetPathModifier.prototype.processPath=function(t,e,n,i){var o=shapePool.newElement();o.c=t.c;var s=t.length();t.c||(s-=1);var l,h,p,u=[];for(l=0;l<s;l+=1)p=PolynomialBezier.shapeSegment(t,l),u.push(offsetSegmentSplit(p,e));if(!t.c)for(l=s-1;l>=0;l-=1)p=PolynomialBezier.shapeSegmentInverted(t,l),u.push(offsetSegmentSplit(p,e));u=pruneIntersections(u);var m=null,b=null;for(l=0;l<u.length;l+=1){var d=u[l];for(b&&(m=joinLines(o,b,d[0],n,i)),b=d[d.length-1],h=0;h<d.length;h+=1)p=d[h],m&&pointEqual(p.points[0],m)?o.setXYAt(p.points[1][0],p.points[1][1],"o",o.length()-1):o.setTripleAt(p.points[0][0],p.points[0][1],p.points[1][0],p.points[1][1],p.points[0][0],p.points[0][1],o.length()),o.setTripleAt(p.points[3][0],p.points[3][1],p.points[3][0],p.points[3][1],p.points[2][0],p.points[2][1],o.length()),m=p.points[3];}return u.length&&joinLines(o,b,u[0][0],n,i),o;},OffsetPathModifier.prototype.processShapes=function(t){var e,n,i=this.shapes.length,o,s,l=this.amount.v,h=this.miterLimit.v,p=this.lineJoin;if(l!==0){var u,m;for(n=0;n<i;n+=1){if(u=this.shapes[n],m=u.localShapeCollection,!(!u.shape._mdf&&!this._mdf&&!t))for(m.releaseShapes(),u.shape._mdf=!0,e=u.shape.paths.shapes,s=u.shape.paths._length,o=0;o<s;o+=1)m.addShape(this.processPath(e[o],l,p,h));u.shape.paths=u.localShapeCollection;}}this.dynamicProperties.length||(this._mdf=!1);};function getFontProperties(t){for(var e=t.fStyle?t.fStyle.split(" "):[],n="normal",i="normal",o=e.length,s,l=0;l<o;l+=1)switch(s=e[l].toLowerCase(),s){case"italic":i="italic";break;case"bold":n="700";break;case"black":n="900";break;case"medium":n="500";break;case"regular":case"normal":n="400";break;case"light":case"thin":n="200";break;default:break;}return{style:i,weight:t.fWeight||n};}var FontManager=function(){var t=5e3,e={w:0,size:0,shapes:[],data:{shapes:[]}},n=[];n=n.concat([2304,2305,2306,2307,2362,2363,2364,2364,2366,2367,2368,2369,2370,2371,2372,2373,2374,2375,2376,2377,2378,2379,2380,2381,2382,2383,2387,2388,2389,2390,2391,2402,2403]);var i=127988,o=917631,s=917601,l=917626,h=65039,p=8205,u=127462,m=127487,b=["d83cdffb","d83cdffc","d83cdffd","d83cdffe","d83cdfff"];function d(w){var F=w.split(","),x,M=F.length,z=[];for(x=0;x<M;x+=1)F[x]!=="sans-serif"&&F[x]!=="monospace"&&z.push(F[x]);return z.join(",");}function g(w,F){var x=createTag("span");x.setAttribute("aria-hidden",!0),x.style.fontFamily=F;var M=createTag("span");M.innerText="giItT1WQy@!-/#",x.style.position="absolute",x.style.left="-10000px",x.style.top="-10000px",x.style.fontSize="300px",x.style.fontVariant="normal",x.style.fontStyle="normal",x.style.fontWeight="normal",x.style.letterSpacing="0",x.appendChild(M),document.body.appendChild(x);var z=M.offsetWidth;return M.style.fontFamily=d(w)+", "+F,{node:M,w:z,parent:x};}function E(){var w,F=this.fonts.length,x,M,z=F;for(w=0;w<F;w+=1)this.fonts[w].loaded?z-=1:this.fonts[w].fOrigin==="n"||this.fonts[w].origin===0?this.fonts[w].loaded=!0:(x=this.fonts[w].monoCase.node,M=this.fonts[w].monoCase.w,x.offsetWidth!==M?(z-=1,this.fonts[w].loaded=!0):(x=this.fonts[w].sansCase.node,M=this.fonts[w].sansCase.w,x.offsetWidth!==M&&(z-=1,this.fonts[w].loaded=!0)),this.fonts[w].loaded&&(this.fonts[w].sansCase.parent.parentNode.removeChild(this.fonts[w].sansCase.parent),this.fonts[w].monoCase.parent.parentNode.removeChild(this.fonts[w].monoCase.parent)));z!==0&&Date.now()-this.initTime<t?setTimeout(this.checkLoadedFontsBinded,20):setTimeout(this.setIsLoadedBinded,10);}function P(w,F){var x=document.body&&F?"svg":"canvas",M,z=getFontProperties(w);if(x==="svg"){var B=createNS("text");B.style.fontSize="100px",B.setAttribute("font-family",w.fFamily),B.setAttribute("font-style",z.style),B.setAttribute("font-weight",z.weight),B.textContent="1",w.fClass?(B.style.fontFamily="inherit",B.setAttribute("class",w.fClass)):B.style.fontFamily=w.fFamily,F.appendChild(B),M=B;}else{var J=new OffscreenCanvas(500,500).getContext("2d");J.font=z.style+" "+z.weight+" 100px "+w.fFamily,M=J;}function tt(K){return x==="svg"?(M.textContent=K,M.getComputedTextLength()):M.measureText(K).width;}return{measureText:tt};}function k(w,F){if(!w){this.isLoaded=!0;return;}if(this.chars){this.isLoaded=!0,this.fonts=w.list;return;}if(!document.body){this.isLoaded=!0,w.list.forEach(function(fe){fe.helper=P(fe),fe.cache={};}),this.fonts=w.list;return;}var x=w.list,M,z=x.length,B=z;for(M=0;M<z;M+=1){var J=!0,tt,K;if(x[M].loaded=!1,x[M].monoCase=g(x[M].fFamily,"monospace"),x[M].sansCase=g(x[M].fFamily,"sans-serif"),!x[M].fPath)x[M].loaded=!0,B-=1;else if(x[M].fOrigin==="p"||x[M].origin===3){if(tt=document.querySelectorAll('style[f-forigin="p"][f-family="'+x[M].fFamily+'"], style[f-origin="3"][f-family="'+x[M].fFamily+'"]'),tt.length>0&&(J=!1),J){var Pt=createTag("style");Pt.setAttribute("f-forigin",x[M].fOrigin),Pt.setAttribute("f-origin",x[M].origin),Pt.setAttribute("f-family",x[M].fFamily),Pt.type="text/css",Pt.innerText="@font-face {font-family: "+x[M].fFamily+"; font-style: normal; src: url('"+x[M].fPath+"');}",F.appendChild(Pt);}}else if(x[M].fOrigin==="g"||x[M].origin===1){for(tt=document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'),K=0;K<tt.length;K+=1)tt[K].href.indexOf(x[M].fPath)!==-1&&(J=!1);if(J){var xt=createTag("link");xt.setAttribute("f-forigin",x[M].fOrigin),xt.setAttribute("f-origin",x[M].origin),xt.type="text/css",xt.rel="stylesheet",xt.href=x[M].fPath,document.body.appendChild(xt);}}else if(x[M].fOrigin==="t"||x[M].origin===2){for(tt=document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'),K=0;K<tt.length;K+=1)x[M].fPath===tt[K].src&&(J=!1);if(J){var Xt=createTag("link");Xt.setAttribute("f-forigin",x[M].fOrigin),Xt.setAttribute("f-origin",x[M].origin),Xt.setAttribute("rel","stylesheet"),Xt.setAttribute("href",x[M].fPath),F.appendChild(Xt);}}x[M].helper=P(x[M],F),x[M].cache={},this.fonts.push(x[M]);}B===0?this.isLoaded=!0:setTimeout(this.checkLoadedFonts.bind(this),100);}function v(w){if(w){this.chars||(this.chars=[]);var F,x=w.length,M,z=this.chars.length,B;for(F=0;F<x;F+=1){for(M=0,B=!1;M<z;)this.chars[M].style===w[F].style&&this.chars[M].fFamily===w[F].fFamily&&this.chars[M].ch===w[F].ch&&(B=!0),M+=1;B||(this.chars.push(w[F]),z+=1);}}}function C(w,F,x){for(var M=0,z=this.chars.length;M<z;){if(this.chars[M].ch===w&&this.chars[M].style===F&&this.chars[M].fFamily===x)return this.chars[M];M+=1;}return(typeof w=="string"&&w.charCodeAt(0)!==13||!w)&&console&&console.warn&&!this._warned&&(this._warned=!0,console.warn("Missing character from exported characters list: ",w,F,x)),e;}function y(w,F,x){var M=this.getFontByName(F),z=w;if(!M.cache[z]){var B=M.helper;if(w===" "){var J=B.measureText("|"+w+"|"),tt=B.measureText("||");M.cache[z]=(J-tt)/100;}else M.cache[z]=B.measureText(w)/100;}return M.cache[z]*x;}function S(w){for(var F=0,x=this.fonts.length;F<x;){if(this.fonts[F].fName===w)return this.fonts[F];F+=1;}return this.fonts[0];}function O(w){var F=0,x=w.charCodeAt(0);if(x>=55296&&x<=56319){var M=w.charCodeAt(1);M>=56320&&M<=57343&&(F=(x-55296)*1024+M-56320+65536);}return F;}function A(w,F){var x=w.toString(16)+F.toString(16);return b.indexOf(x)!==-1;}function R(w){return w===p;}function N(w){return w===h;}function H(w){var F=O(w);return F>=u&&F<=m;}function it(w){return H(w.substr(0,2))&&H(w.substr(2,2));}function nt(w){return n.indexOf(w)!==-1;}function Z(w,F){var x=O(w.substr(F,2));if(x!==i)return!1;var M=0;for(F+=2;M<5;){if(x=O(w.substr(F,2)),x<s||x>l)return!1;M+=1,F+=2;}return O(w.substr(F,2))===o;}function rt(){this.isLoaded=!0;}var Q=function(){this.fonts=[],this.chars=null,this.typekitLoaded=0,this.isLoaded=!1,this._warned=!1,this.initTime=Date.now(),this.setIsLoadedBinded=this.setIsLoaded.bind(this),this.checkLoadedFontsBinded=this.checkLoadedFonts.bind(this);};Q.isModifier=A,Q.isZeroWidthJoiner=R,Q.isFlagEmoji=it,Q.isRegionalCode=H,Q.isCombinedCharacter=nt,Q.isRegionalFlag=Z,Q.isVariationSelector=N,Q.BLACK_FLAG_CODE_POINT=i;var W={addChars:v,addFonts:k,getCharData:C,getFontByName:S,measureText:y,checkLoadedFonts:E,setIsLoaded:rt};return Q.prototype=W,Q;}();function SlotManager(t){this.animationData=t;}SlotManager.prototype.getProp=function(t){return this.animationData.slots&&this.animationData.slots[t.sid]?Object.assign(t,this.animationData.slots[t.sid].p):t;};function slotFactory(t){return new SlotManager(t);}function RenderableElement(){}RenderableElement.prototype={initRenderable:function(){this.isInRange=!1,this.hidden=!1,this.isTransparent=!1,this.renderableComponents=[];},addRenderableComponent:function(e){this.renderableComponents.indexOf(e)===-1&&this.renderableComponents.push(e);},removeRenderableComponent:function(e){this.renderableComponents.indexOf(e)!==-1&&this.renderableComponents.splice(this.renderableComponents.indexOf(e),1);},prepareRenderableFrame:function(e){this.checkLayerLimits(e);},checkTransparency:function(){this.finalTransform.mProp.o.v<=0?!this.isTransparent&&this.globalData.renderConfig.hideOnTransparent&&(this.isTransparent=!0,this.hide()):this.isTransparent&&(this.isTransparent=!1,this.show());},checkLayerLimits:function(e){this.data.ip-this.data.st<=e&&this.data.op-this.data.st>e?this.isInRange!==!0&&(this.globalData._mdf=!0,this._mdf=!0,this.isInRange=!0,this.show()):this.isInRange!==!1&&(this.globalData._mdf=!0,this.isInRange=!1,this.hide());},renderRenderable:function(){var e,n=this.renderableComponents.length;for(e=0;e<n;e+=1)this.renderableComponents[e].renderFrame(this._isFirstFrame);},sourceRectAtTime:function(){return{top:0,left:0,width:100,height:100};},getLayerSize:function(){return this.data.ty===5?{w:this.data.textData.width,h:this.data.textData.height}:{w:this.data.width,h:this.data.height};}};var getBlendMode=function(){var t={0:"source-over",1:"multiply",2:"screen",3:"overlay",4:"darken",5:"lighten",6:"color-dodge",7:"color-burn",8:"hard-light",9:"soft-light",10:"difference",11:"exclusion",12:"hue",13:"saturation",14:"color",15:"luminosity"};return function(e){return t[e]||"";};}();function SliderEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,0,0,n);}function AngleEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,0,0,n);}function ColorEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,1,0,n);}function PointEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,1,0,n);}function LayerIndexEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,0,0,n);}function MaskIndexEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,0,0,n);}function CheckboxEffect(t,e,n){this.p=PropertyFactory.getProp(e,t.v,0,0,n);}function NoValueEffect(){this.p={};}function EffectsManager(t,e){var n=t.ef||[];this.effectElements=[];var i,o=n.length,s;for(i=0;i<o;i+=1)s=new GroupEffect(n[i],e),this.effectElements.push(s);}function GroupEffect(t,e){this.init(t,e);}extendPrototype([DynamicPropertyContainer],GroupEffect),GroupEffect.prototype.getValue=GroupEffect.prototype.iterateDynamicProperties,GroupEffect.prototype.init=function(t,e){this.data=t,this.effectElements=[],this.initDynamicPropertyContainer(e);var n,i=this.data.ef.length,o,s=this.data.ef;for(n=0;n<i;n+=1){switch(o=null,s[n].ty){case 0:o=new SliderEffect(s[n],e,this);break;case 1:o=new AngleEffect(s[n],e,this);break;case 2:o=new ColorEffect(s[n],e,this);break;case 3:o=new PointEffect(s[n],e,this);break;case 4:case 7:o=new CheckboxEffect(s[n],e,this);break;case 10:o=new LayerIndexEffect(s[n],e,this);break;case 11:o=new MaskIndexEffect(s[n],e,this);break;case 5:o=new EffectsManager(s[n],e,this);break;default:o=new NoValueEffect(s[n],e,this);break;}o&&this.effectElements.push(o);}};function BaseElement(){}BaseElement.prototype={checkMasks:function(){if(!this.data.hasMask)return!1;for(var e=0,n=this.data.masksProperties.length;e<n;){if(this.data.masksProperties[e].mode!=="n"&&this.data.masksProperties[e].cl!==!1)return!0;e+=1;}return!1;},initExpressions:function(){var e=getExpressionInterfaces();if(e){var n=e("layer"),i=e("effects"),o=e("shape"),s=e("text"),l=e("comp");this.layerInterface=n(this),this.data.hasMask&&this.maskManager&&this.layerInterface.registerMaskInterface(this.maskManager);var h=i.createEffectsInterface(this,this.layerInterface);this.layerInterface.registerEffectsInterface(h),this.data.ty===0||this.data.xt?this.compInterface=l(this):this.data.ty===4?(this.layerInterface.shapeInterface=o(this.shapesData,this.itemsData,this.layerInterface),this.layerInterface.content=this.layerInterface.shapeInterface):this.data.ty===5&&(this.layerInterface.textInterface=s(this),this.layerInterface.text=this.layerInterface.textInterface);}},setBlendMode:function(){var e=getBlendMode(this.data.bm),n=this.baseElement||this.layerElement;n.style["mix-blend-mode"]=e;},initBaseData:function(e,n,i){this.globalData=n,this.comp=i,this.data=e,this.layerId=createElementID(),this.data.sr||(this.data.sr=1),this.effectsManager=new EffectsManager(this.data,this,this.dynamicProperties);},getType:function(){return this.type;},sourceRectAtTime:function(){}};function FrameElement(){}FrameElement.prototype={initFrame:function(){this._isFirstFrame=!1,this.dynamicProperties=[],this._mdf=!1;},prepareProperties:function(e,n){var i,o=this.dynamicProperties.length;for(i=0;i<o;i+=1)(n||this._isParent&&this.dynamicProperties[i].propType==="transform")&&(this.dynamicProperties[i].getValue(),this.dynamicProperties[i]._mdf&&(this.globalData._mdf=!0,this._mdf=!0));},addDynamicProperty:function(e){this.dynamicProperties.indexOf(e)===-1&&this.dynamicProperties.push(e);}};function FootageElement(t,e,n){this.initFrame(),this.initRenderable(),this.assetData=e.getAssetData(t.refId),this.footageData=e.imageLoader.getAsset(this.assetData),this.initBaseData(t,e,n);}FootageElement.prototype.prepareFrame=function(){},extendPrototype([RenderableElement,BaseElement,FrameElement],FootageElement),FootageElement.prototype.getBaseElement=function(){return null;},FootageElement.prototype.renderFrame=function(){},FootageElement.prototype.destroy=function(){},FootageElement.prototype.initExpressions=function(){var t=getExpressionInterfaces();if(t){var e=t("footage");this.layerInterface=e(this);}},FootageElement.prototype.getFootageData=function(){return this.footageData;};function AudioElement(t,e,n){this.initFrame(),this.initRenderable(),this.assetData=e.getAssetData(t.refId),this.initBaseData(t,e,n),this._isPlaying=!1,this._canPlay=!1;var i=this.globalData.getAssetsPath(this.assetData);this.audio=this.globalData.audioController.createAudio(i),this._currentTime=0,this.globalData.audioController.addAudio(this),this._volumeMultiplier=1,this._volume=1,this._previousVolume=null,this.tm=t.tm?PropertyFactory.getProp(this,t.tm,0,e.frameRate,this):{_placeholder:!0},this.lv=PropertyFactory.getProp(this,t.au&&t.au.lv?t.au.lv:{k:[100]},1,.01,this);}AudioElement.prototype.prepareFrame=function(t){if(this.prepareRenderableFrame(t,!0),this.prepareProperties(t,!0),this.tm._placeholder)this._currentTime=t/this.data.sr;else{var e=this.tm.v;this._currentTime=e;}this._volume=this.lv.v[0];var n=this._volume*this._volumeMultiplier;this._previousVolume!==n&&(this._previousVolume=n,this.audio.volume(n));},extendPrototype([RenderableElement,BaseElement,FrameElement],AudioElement),AudioElement.prototype.renderFrame=function(){this.isInRange&&this._canPlay&&(this._isPlaying?(!this.audio.playing()||Math.abs(this._currentTime/this.globalData.frameRate-this.audio.seek())>.1)&&this.audio.seek(this._currentTime/this.globalData.frameRate):(this.audio.play(),this.audio.seek(this._currentTime/this.globalData.frameRate),this._isPlaying=!0));},AudioElement.prototype.show=function(){},AudioElement.prototype.hide=function(){this.audio.pause(),this._isPlaying=!1;},AudioElement.prototype.pause=function(){this.audio.pause(),this._isPlaying=!1,this._canPlay=!1;},AudioElement.prototype.resume=function(){this._canPlay=!0;},AudioElement.prototype.setRate=function(t){this.audio.rate(t);},AudioElement.prototype.volume=function(t){this._volumeMultiplier=t,this._previousVolume=t*this._volume,this.audio.volume(this._previousVolume);},AudioElement.prototype.getBaseElement=function(){return null;},AudioElement.prototype.destroy=function(){},AudioElement.prototype.sourceRectAtTime=function(){},AudioElement.prototype.initExpressions=function(){};function BaseRenderer(){}BaseRenderer.prototype.checkLayers=function(t){var e,n=this.layers.length,i;for(this.completeLayers=!0,e=n-1;e>=0;e-=1)this.elements[e]||(i=this.layers[e],i.ip-i.st<=t-this.layers[e].st&&i.op-i.st>t-this.layers[e].st&&this.buildItem(e)),this.completeLayers=this.elements[e]?this.completeLayers:!1;this.checkPendingElements();},BaseRenderer.prototype.createItem=function(t){switch(t.ty){case 2:return this.createImage(t);case 0:return this.createComp(t);case 1:return this.createSolid(t);case 3:return this.createNull(t);case 4:return this.createShape(t);case 5:return this.createText(t);case 6:return this.createAudio(t);case 13:return this.createCamera(t);case 15:return this.createFootage(t);default:return this.createNull(t);}},BaseRenderer.prototype.createCamera=function(){throw new Error("You're using a 3d camera. Try the html renderer.");},BaseRenderer.prototype.createAudio=function(t){return new AudioElement(t,this.globalData,this);},BaseRenderer.prototype.createFootage=function(t){return new FootageElement(t,this.globalData,this);},BaseRenderer.prototype.buildAllItems=function(){var t,e=this.layers.length;for(t=0;t<e;t+=1)this.buildItem(t);this.checkPendingElements();},BaseRenderer.prototype.includeLayers=function(t){this.completeLayers=!1;var e,n=t.length,i,o=this.layers.length;for(e=0;e<n;e+=1)for(i=0;i<o;){if(this.layers[i].id===t[e].id){this.layers[i]=t[e];break;}i+=1;}},BaseRenderer.prototype.setProjectInterface=function(t){this.globalData.projectInterface=t;},BaseRenderer.prototype.initItems=function(){this.globalData.progressiveLoad||this.buildAllItems();},BaseRenderer.prototype.buildElementParenting=function(t,e,n){for(var i=this.elements,o=this.layers,s=0,l=o.length;s<l;)o[s].ind==e&&(!i[s]||i[s]===!0?(this.buildItem(s),this.addPendingElement(t)):(n.push(i[s]),i[s].setAsParent(),o[s].parent!==void 0?this.buildElementParenting(t,o[s].parent,n):t.setHierarchy(n))),s+=1;},BaseRenderer.prototype.addPendingElement=function(t){this.pendingElements.push(t);},BaseRenderer.prototype.searchExtraCompositions=function(t){var e,n=t.length;for(e=0;e<n;e+=1)if(t[e].xt){var i=this.createComp(t[e]);i.initExpressions(),this.globalData.projectInterface.registerComposition(i);}},BaseRenderer.prototype.getElementById=function(t){var e,n=this.elements.length;for(e=0;e<n;e+=1)if(this.elements[e].data.ind===t)return this.elements[e];return null;},BaseRenderer.prototype.getElementByPath=function(t){var e=t.shift(),n;if(typeof e=="number")n=this.elements[e];else{var i,o=this.elements.length;for(i=0;i<o;i+=1)if(this.elements[i].data.nm===e){n=this.elements[i];break;}}return t.length===0?n:n.getElementByPath(t);},BaseRenderer.prototype.setupGlobalData=function(t,e){this.globalData.fontManager=new FontManager(),this.globalData.slotManager=slotFactory(t),this.globalData.fontManager.addChars(t.chars),this.globalData.fontManager.addFonts(t.fonts,e),this.globalData.getAssetData=this.animationItem.getAssetData.bind(this.animationItem),this.globalData.getAssetsPath=this.animationItem.getAssetsPath.bind(this.animationItem),this.globalData.imageLoader=this.animationItem.imagePreloader,this.globalData.audioController=this.animationItem.audioController,this.globalData.frameId=0,this.globalData.frameRate=t.fr,this.globalData.nm=t.nm,this.globalData.compSize={w:t.w,h:t.h};};var effectTypes={TRANSFORM_EFFECT:"transformEFfect"};function TransformElement(){}TransformElement.prototype={initTransform:function(){var e=new Matrix();this.finalTransform={mProp:this.data.ks?TransformPropertyFactory.getTransformProperty(this,this.data.ks,this):{o:0},_matMdf:!1,_localMatMdf:!1,_opMdf:!1,mat:e,localMat:e,localOpacity:1},this.data.ao&&(this.finalTransform.mProp.autoOriented=!0),this.data.ty;},renderTransform:function(){if(this.finalTransform._opMdf=this.finalTransform.mProp.o._mdf||this._isFirstFrame,this.finalTransform._matMdf=this.finalTransform.mProp._mdf||this._isFirstFrame,this.hierarchy){var e,n=this.finalTransform.mat,i=0,o=this.hierarchy.length;if(!this.finalTransform._matMdf)for(;i<o;){if(this.hierarchy[i].finalTransform.mProp._mdf){this.finalTransform._matMdf=!0;break;}i+=1;}if(this.finalTransform._matMdf)for(e=this.finalTransform.mProp.v.props,n.cloneFromProps(e),i=0;i<o;i+=1)n.multiply(this.hierarchy[i].finalTransform.mProp.v);}this.finalTransform._matMdf&&(this.finalTransform._localMatMdf=this.finalTransform._matMdf),this.finalTransform._opMdf&&(this.finalTransform.localOpacity=this.finalTransform.mProp.o.v);},renderLocalTransform:function(){if(this.localTransforms){var e=0,n=this.localTransforms.length;if(this.finalTransform._localMatMdf=this.finalTransform._matMdf,!this.finalTransform._localMatMdf||!this.finalTransform._opMdf)for(;e<n;)this.localTransforms[e]._mdf&&(this.finalTransform._localMatMdf=!0),this.localTransforms[e]._opMdf&&!this.finalTransform._opMdf&&(this.finalTransform.localOpacity=this.finalTransform.mProp.o.v,this.finalTransform._opMdf=!0),e+=1;if(this.finalTransform._localMatMdf){var i=this.finalTransform.localMat;for(this.localTransforms[0].matrix.clone(i),e=1;e<n;e+=1){var o=this.localTransforms[e].matrix;i.multiply(o);}i.multiply(this.finalTransform.mat);}if(this.finalTransform._opMdf){var s=this.finalTransform.localOpacity;for(e=0;e<n;e+=1)s*=this.localTransforms[e].opacity*.01;this.finalTransform.localOpacity=s;}}},searchEffectTransforms:function(){if(this.renderableEffectsManager){var e=this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT);if(e.length){this.localTransforms=[],this.finalTransform.localMat=new Matrix();var n=0,i=e.length;for(n=0;n<i;n+=1)this.localTransforms.push(e[n]);}}},globalToLocal:function(e){var n=[];n.push(this.finalTransform);for(var i=!0,o=this.comp;i;)o.finalTransform?(o.data.hasMask&&n.splice(0,0,o.finalTransform),o=o.comp):i=!1;var s,l=n.length,h;for(s=0;s<l;s+=1)h=n[s].mat.applyToPointArray(0,0,0),e=[e[0]-h[0],e[1]-h[1],0];return e;},mHelper:new Matrix()};function MaskElement(t,e,n){this.data=t,this.element=e,this.globalData=n,this.storedData=[],this.masksProperties=this.data.masksProperties||[],this.maskElement=null;var i=this.globalData.defs,o,s=this.masksProperties?this.masksProperties.length:0;this.viewData=createSizedArray(s),this.solidPath="";var l,h=this.masksProperties,p=0,u=[],m,b,d=createElementID(),g,E,P,k,v="clipPath",C="clip-path";for(o=0;o<s;o+=1)if((h[o].mode!=="a"&&h[o].mode!=="n"||h[o].inv||h[o].o.k!==100||h[o].o.x)&&(v="mask",C="mask"),(h[o].mode==="s"||h[o].mode==="i")&&p===0?(g=createNS("rect"),g.setAttribute("fill","#ffffff"),g.setAttribute("width",this.element.comp.data.w||0),g.setAttribute("height",this.element.comp.data.h||0),u.push(g)):g=null,l=createNS("path"),h[o].mode==="n")this.viewData[o]={op:PropertyFactory.getProp(this.element,h[o].o,0,.01,this.element),prop:ShapePropertyFactory.getShapeProp(this.element,h[o],3),elem:l,lastPath:""},i.appendChild(l);else{p+=1,l.setAttribute("fill",h[o].mode==="s"?"#000000":"#ffffff"),l.setAttribute("clip-rule","nonzero");var y;if(h[o].x.k!==0?(v="mask",C="mask",k=PropertyFactory.getProp(this.element,h[o].x,0,null,this.element),y=createElementID(),E=createNS("filter"),E.setAttribute("id",y),P=createNS("feMorphology"),P.setAttribute("operator","erode"),P.setAttribute("in","SourceGraphic"),P.setAttribute("radius","0"),E.appendChild(P),i.appendChild(E),l.setAttribute("stroke",h[o].mode==="s"?"#000000":"#ffffff")):(P=null,k=null),this.storedData[o]={elem:l,x:k,expan:P,lastPath:"",lastOperator:"",filterId:y,lastRadius:0},h[o].mode==="i"){b=u.length;var S=createNS("g");for(m=0;m<b;m+=1)S.appendChild(u[m]);var O=createNS("mask");O.setAttribute("mask-type","alpha"),O.setAttribute("id",d+"_"+p),O.appendChild(l),i.appendChild(O),S.setAttribute("mask","url("+getLocationHref()+"#"+d+"_"+p+")"),u.length=0,u.push(S);}else u.push(l);h[o].inv&&!this.solidPath&&(this.solidPath=this.createLayerSolidPath()),this.viewData[o]={elem:l,lastPath:"",op:PropertyFactory.getProp(this.element,h[o].o,0,.01,this.element),prop:ShapePropertyFactory.getShapeProp(this.element,h[o],3),invRect:g},this.viewData[o].prop.k||this.drawPath(h[o],this.viewData[o].prop.v,this.viewData[o]);}for(this.maskElement=createNS(v),s=u.length,o=0;o<s;o+=1)this.maskElement.appendChild(u[o]);p>0&&(this.maskElement.setAttribute("id",d),this.element.maskedElement.setAttribute(C,"url("+getLocationHref()+"#"+d+")"),i.appendChild(this.maskElement)),this.viewData.length&&this.element.addRenderableComponent(this);}MaskElement.prototype.getMaskProperty=function(t){return this.viewData[t].prop;},MaskElement.prototype.renderFrame=function(t){var e=this.element.finalTransform.mat,n,i=this.masksProperties.length;for(n=0;n<i;n+=1)if((this.viewData[n].prop._mdf||t)&&this.drawPath(this.masksProperties[n],this.viewData[n].prop.v,this.viewData[n]),(this.viewData[n].op._mdf||t)&&this.viewData[n].elem.setAttribute("fill-opacity",this.viewData[n].op.v),this.masksProperties[n].mode!=="n"&&(this.viewData[n].invRect&&(this.element.finalTransform.mProp._mdf||t)&&this.viewData[n].invRect.setAttribute("transform",e.getInverseMatrix().to2dCSS()),this.storedData[n].x&&(this.storedData[n].x._mdf||t))){var o=this.storedData[n].expan;this.storedData[n].x.v<0?(this.storedData[n].lastOperator!=="erode"&&(this.storedData[n].lastOperator="erode",this.storedData[n].elem.setAttribute("filter","url("+getLocationHref()+"#"+this.storedData[n].filterId+")")),o.setAttribute("radius",-this.storedData[n].x.v)):(this.storedData[n].lastOperator!=="dilate"&&(this.storedData[n].lastOperator="dilate",this.storedData[n].elem.setAttribute("filter",null)),this.storedData[n].elem.setAttribute("stroke-width",this.storedData[n].x.v*2));}},MaskElement.prototype.getMaskelement=function(){return this.maskElement;},MaskElement.prototype.createLayerSolidPath=function(){var t="M0,0 ";return t+=" h"+this.globalData.compSize.w,t+=" v"+this.globalData.compSize.h,t+=" h-"+this.globalData.compSize.w,t+=" v-"+this.globalData.compSize.h+" ",t;},MaskElement.prototype.drawPath=function(t,e,n){var i=" M"+e.v[0][0]+","+e.v[0][1],o,s;for(s=e._length,o=1;o<s;o+=1)i+=" C"+e.o[o-1][0]+","+e.o[o-1][1]+" "+e.i[o][0]+","+e.i[o][1]+" "+e.v[o][0]+","+e.v[o][1];if(e.c&&s>1&&(i+=" C"+e.o[o-1][0]+","+e.o[o-1][1]+" "+e.i[0][0]+","+e.i[0][1]+" "+e.v[0][0]+","+e.v[0][1]),n.lastPath!==i){var l="";n.elem&&(e.c&&(l=t.inv?this.solidPath+i:i),n.elem.setAttribute("d",l)),n.lastPath=i;}},MaskElement.prototype.destroy=function(){this.element=null,this.globalData=null,this.maskElement=null,this.data=null,this.masksProperties=null;};var filtersFactory=function(){var t={};t.createFilter=e,t.createAlphaToLuminanceFilter=n;function e(i,o){var s=createNS("filter");return s.setAttribute("id",i),o!==!0&&(s.setAttribute("filterUnits","objectBoundingBox"),s.setAttribute("x","0%"),s.setAttribute("y","0%"),s.setAttribute("width","100%"),s.setAttribute("height","100%")),s;}function n(){var i=createNS("feColorMatrix");return i.setAttribute("type","matrix"),i.setAttribute("color-interpolation-filters","sRGB"),i.setAttribute("values","0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"),i;}return t;}(),featureSupport=function(){var t={maskType:!0,svgLumaHidden:!0,offscreenCanvas:typeof OffscreenCanvas<"u"};return(/MSIE 10/i.test(navigator.userAgent)||/MSIE 9/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent))&&(t.maskType=!1),/firefox/i.test(navigator.userAgent)&&(t.svgLumaHidden=!1),t;}(),registeredEffects$1={},idPrefix="filter_result_";function SVGEffects(t){var e,n="SourceGraphic",i=t.data.ef?t.data.ef.length:0,o=createElementID(),s=filtersFactory.createFilter(o,!0),l=0;this.filters=[];var h;for(e=0;e<i;e+=1){h=null;var p=t.data.ef[e].ty;if(registeredEffects$1[p]){var u=registeredEffects$1[p].effect;h=new u(s,t.effectsManager.effectElements[e],t,idPrefix+l,n),n=idPrefix+l,registeredEffects$1[p].countsAsEffect&&(l+=1);}h&&this.filters.push(h);}l&&(t.globalData.defs.appendChild(s),t.layerElement.setAttribute("filter","url("+getLocationHref()+"#"+o+")")),this.filters.length&&t.addRenderableComponent(this);}SVGEffects.prototype.renderFrame=function(t){var e,n=this.filters.length;for(e=0;e<n;e+=1)this.filters[e].renderFrame(t);},SVGEffects.prototype.getEffects=function(t){var e,n=this.filters.length,i=[];for(e=0;e<n;e+=1)this.filters[e].type===t&&i.push(this.filters[e]);return i;};function registerEffect$1(t,e,n){registeredEffects$1[t]={effect:e,countsAsEffect:n};}function SVGBaseElement(){}SVGBaseElement.prototype={initRendererElement:function(){this.layerElement=createNS("g");},createContainerElements:function(){this.matteElement=createNS("g"),this.transformedElement=this.layerElement,this.maskedElement=this.layerElement,this._sizeChanged=!1;var e=null;if(this.data.td){this.matteMasks={};var n=createNS("g");n.setAttribute("id",this.layerId),n.appendChild(this.layerElement),e=n,this.globalData.defs.appendChild(n);}else this.data.tt?(this.matteElement.appendChild(this.layerElement),e=this.matteElement,this.baseElement=this.matteElement):this.baseElement=this.layerElement;if(this.data.ln&&this.layerElement.setAttribute("id",this.data.ln),this.data.cl&&this.layerElement.setAttribute("class",this.data.cl),this.data.ty===0&&!this.data.hd){var i=createNS("clipPath"),o=createNS("path");o.setAttribute("d","M0,0 L"+this.data.w+",0 L"+this.data.w+","+this.data.h+" L0,"+this.data.h+"z");var s=createElementID();if(i.setAttribute("id",s),i.appendChild(o),this.globalData.defs.appendChild(i),this.checkMasks()){var l=createNS("g");l.setAttribute("clip-path","url("+getLocationHref()+"#"+s+")"),l.appendChild(this.layerElement),this.transformedElement=l,e?e.appendChild(this.transformedElement):this.baseElement=this.transformedElement;}else this.layerElement.setAttribute("clip-path","url("+getLocationHref()+"#"+s+")");}this.data.bm!==0&&this.setBlendMode();},renderElement:function(){this.finalTransform._localMatMdf&&this.transformedElement.setAttribute("transform",this.finalTransform.localMat.to2dCSS()),this.finalTransform._opMdf&&this.transformedElement.setAttribute("opacity",this.finalTransform.localOpacity);},destroyBaseElement:function(){this.layerElement=null,this.matteElement=null,this.maskManager.destroy();},getBaseElement:function(){return this.data.hd?null:this.baseElement;},createRenderableComponents:function(){this.maskManager=new MaskElement(this.data,this,this.globalData),this.renderableEffectsManager=new SVGEffects(this),this.searchEffectTransforms();},getMatte:function(e){if(this.matteMasks||(this.matteMasks={}),!this.matteMasks[e]){var n=this.layerId+"_"+e,i,o,s,l;if(e===1||e===3){var h=createNS("mask");h.setAttribute("id",n),h.setAttribute("mask-type",e===3?"luminance":"alpha"),s=createNS("use"),s.setAttributeNS("http://www.w3.org/1999/xlink","href","#"+this.layerId),h.appendChild(s),this.globalData.defs.appendChild(h),!featureSupport.maskType&&e===1&&(h.setAttribute("mask-type","luminance"),i=createElementID(),o=filtersFactory.createFilter(i),this.globalData.defs.appendChild(o),o.appendChild(filtersFactory.createAlphaToLuminanceFilter()),l=createNS("g"),l.appendChild(s),h.appendChild(l),l.setAttribute("filter","url("+getLocationHref()+"#"+i+")"));}else if(e===2){var p=createNS("mask");p.setAttribute("id",n),p.setAttribute("mask-type","alpha");var u=createNS("g");p.appendChild(u),i=createElementID(),o=filtersFactory.createFilter(i);var m=createNS("feComponentTransfer");m.setAttribute("in","SourceGraphic"),o.appendChild(m);var b=createNS("feFuncA");b.setAttribute("type","table"),b.setAttribute("tableValues","1.0 0.0"),m.appendChild(b),this.globalData.defs.appendChild(o);var d=createNS("rect");d.setAttribute("width",this.comp.data.w),d.setAttribute("height",this.comp.data.h),d.setAttribute("x","0"),d.setAttribute("y","0"),d.setAttribute("fill","#ffffff"),d.setAttribute("opacity","0"),u.setAttribute("filter","url("+getLocationHref()+"#"+i+")"),u.appendChild(d),s=createNS("use"),s.setAttributeNS("http://www.w3.org/1999/xlink","href","#"+this.layerId),u.appendChild(s),featureSupport.maskType||(p.setAttribute("mask-type","luminance"),o.appendChild(filtersFactory.createAlphaToLuminanceFilter()),l=createNS("g"),u.appendChild(d),l.appendChild(this.layerElement),u.appendChild(l)),this.globalData.defs.appendChild(p);}this.matteMasks[e]=n;}return this.matteMasks[e];},setMatte:function(e){this.matteElement&&this.matteElement.setAttribute("mask","url("+getLocationHref()+"#"+e+")");}};function HierarchyElement(){}HierarchyElement.prototype={initHierarchy:function(){this.hierarchy=[],this._isParent=!1,this.checkParenting();},setHierarchy:function(e){this.hierarchy=e;},setAsParent:function(){this._isParent=!0;},checkParenting:function(){this.data.parent!==void 0&&this.comp.buildElementParenting(this,this.data.parent,[]);}};function RenderableDOMElement(){}(function(){var t={initElement:function(n,i,o){this.initFrame(),this.initBaseData(n,i,o),this.initTransform(n,i,o),this.initHierarchy(),this.initRenderable(),this.initRendererElement(),this.createContainerElements(),this.createRenderableComponents(),this.createContent(),this.hide();},hide:function(){if(!this.hidden&&(!this.isInRange||this.isTransparent)){var n=this.baseElement||this.layerElement;n.style.display="none",this.hidden=!0;}},show:function(){if(this.isInRange&&!this.isTransparent){if(!this.data.hd){var n=this.baseElement||this.layerElement;n.style.display="block";}this.hidden=!1,this._isFirstFrame=!0;}},renderFrame:function(){this.data.hd||this.hidden||(this.renderTransform(),this.renderRenderable(),this.renderLocalTransform(),this.renderElement(),this.renderInnerContent(),this._isFirstFrame&&(this._isFirstFrame=!1));},renderInnerContent:function(){},prepareFrame:function(n){this._mdf=!1,this.prepareRenderableFrame(n),this.prepareProperties(n,this.isInRange),this.checkTransparency();},destroy:function(){this.innerElem=null,this.destroyBaseElement();}};extendPrototype([RenderableElement,createProxyFunction(t)],RenderableDOMElement);})();function IImageElement(t,e,n){this.assetData=e.getAssetData(t.refId),this.assetData&&this.assetData.sid&&(this.assetData=e.slotManager.getProp(this.assetData)),this.initElement(t,e,n),this.sourceRect={top:0,left:0,width:this.assetData.w,height:this.assetData.h};}extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement],IImageElement),IImageElement.prototype.createContent=function(){var t=this.globalData.getAssetsPath(this.assetData);this.innerElem=createNS("image"),this.innerElem.setAttribute("width",this.assetData.w+"px"),this.innerElem.setAttribute("height",this.assetData.h+"px"),this.innerElem.setAttribute("preserveAspectRatio",this.assetData.pr||this.globalData.renderConfig.imagePreserveAspectRatio),this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink","href",t),this.layerElement.appendChild(this.innerElem);},IImageElement.prototype.sourceRectAtTime=function(){return this.sourceRect;};function ProcessedElement(t,e){this.elem=t,this.pos=e;}function IShapeElement(){}IShapeElement.prototype={addShapeToModifiers:function(e){var n,i=this.shapeModifiers.length;for(n=0;n<i;n+=1)this.shapeModifiers[n].addShape(e);},isShapeInAnimatedModifiers:function(e){for(var n=0,i=this.shapeModifiers.length;n<i;)if(this.shapeModifiers[n].isAnimatedWithShape(e))return!0;return!1;},renderModifiers:function(){if(this.shapeModifiers.length){var e,n=this.shapes.length;for(e=0;e<n;e+=1)this.shapes[e].sh.reset();n=this.shapeModifiers.length;var i;for(e=n-1;e>=0&&(i=this.shapeModifiers[e].processShapes(this._isFirstFrame),!i);e-=1);}},searchProcessedElement:function(e){for(var n=this.processedElements,i=0,o=n.length;i<o;){if(n[i].elem===e)return n[i].pos;i+=1;}return 0;},addProcessedElement:function(e,n){for(var i=this.processedElements,o=i.length;o;)if(o-=1,i[o].elem===e){i[o].pos=n;return;}i.push(new ProcessedElement(e,n));},prepareFrame:function(e){this.prepareRenderableFrame(e),this.prepareProperties(e,this.isInRange);}};var lineCapEnum={1:"butt",2:"round",3:"square"},lineJoinEnum={1:"miter",2:"round",3:"bevel"};function SVGShapeData(t,e,n){this.caches=[],this.styles=[],this.transformers=t,this.lStr="",this.sh=n,this.lvl=e,this._isAnimated=!!n.k;for(var i=0,o=t.length;i<o;){if(t[i].mProps.dynamicProperties.length){this._isAnimated=!0;break;}i+=1;}}SVGShapeData.prototype.setAsAnimated=function(){this._isAnimated=!0;};function SVGStyleData(t,e){this.data=t,this.type=t.ty,this.d="",this.lvl=e,this._mdf=!1,this.closed=t.hd===!0,this.pElem=createNS("path"),this.msElem=null;}SVGStyleData.prototype.reset=function(){this.d="",this._mdf=!1;};function DashProperty(t,e,n,i){this.elem=t,this.frameId=-1,this.dataProps=createSizedArray(e.length),this.renderer=n,this.k=!1,this.dashStr="",this.dashArray=createTypedArray("float32",e.length?e.length-1:0),this.dashoffset=createTypedArray("float32",1),this.initDynamicPropertyContainer(i);var o,s=e.length||0,l;for(o=0;o<s;o+=1)l=PropertyFactory.getProp(t,e[o].v,0,0,this),this.k=l.k||this.k,this.dataProps[o]={n:e[o].n,p:l};this.k||this.getValue(!0),this._isAnimated=this.k;}DashProperty.prototype.getValue=function(t){if(!(this.elem.globalData.frameId===this.frameId&&!t)&&(this.frameId=this.elem.globalData.frameId,this.iterateDynamicProperties(),this._mdf=this._mdf||t,this._mdf)){var e=0,n=this.dataProps.length;for(this.renderer==="svg"&&(this.dashStr=""),e=0;e<n;e+=1)this.dataProps[e].n!=="o"?this.renderer==="svg"?this.dashStr+=" "+this.dataProps[e].p.v:this.dashArray[e]=this.dataProps[e].p.v:this.dashoffset[0]=this.dataProps[e].p.v;}},extendPrototype([DynamicPropertyContainer],DashProperty);function SVGStrokeStyleData(t,e,n){this.initDynamicPropertyContainer(t),this.getValue=this.iterateDynamicProperties,this.o=PropertyFactory.getProp(t,e.o,0,.01,this),this.w=PropertyFactory.getProp(t,e.w,0,null,this),this.d=new DashProperty(t,e.d||{},"svg",this),this.c=PropertyFactory.getProp(t,e.c,1,255,this),this.style=n,this._isAnimated=!!this._isAnimated;}extendPrototype([DynamicPropertyContainer],SVGStrokeStyleData);function SVGFillStyleData(t,e,n){this.initDynamicPropertyContainer(t),this.getValue=this.iterateDynamicProperties,this.o=PropertyFactory.getProp(t,e.o,0,.01,this),this.c=PropertyFactory.getProp(t,e.c,1,255,this),this.style=n;}extendPrototype([DynamicPropertyContainer],SVGFillStyleData);function SVGNoStyleData(t,e,n){this.initDynamicPropertyContainer(t),this.getValue=this.iterateDynamicProperties,this.style=n;}extendPrototype([DynamicPropertyContainer],SVGNoStyleData);function GradientProperty(t,e,n){this.data=e,this.c=createTypedArray("uint8c",e.p*4);var i=e.k.k[0].s?e.k.k[0].s.length-e.p*4:e.k.k.length-e.p*4;this.o=createTypedArray("float32",i),this._cmdf=!1,this._omdf=!1,this._collapsable=this.checkCollapsable(),this._hasOpacity=i,this.initDynamicPropertyContainer(n),this.prop=PropertyFactory.getProp(t,e.k,1,null,this),this.k=this.prop.k,this.getValue(!0);}GradientProperty.prototype.comparePoints=function(t,e){for(var n=0,i=this.o.length/2,o;n<i;){if(o=Math.abs(t[n*4]-t[e*4+n*2]),o>.01)return!1;n+=1;}return!0;},GradientProperty.prototype.checkCollapsable=function(){if(this.o.length/2!==this.c.length/4)return!1;if(this.data.k.k[0].s)for(var t=0,e=this.data.k.k.length;t<e;){if(!this.comparePoints(this.data.k.k[t].s,this.data.p))return!1;t+=1;}else if(!this.comparePoints(this.data.k.k,this.data.p))return!1;return!0;},GradientProperty.prototype.getValue=function(t){if(this.prop.getValue(),this._mdf=!1,this._cmdf=!1,this._omdf=!1,this.prop._mdf||t){var e,n=this.data.p*4,i,o;for(e=0;e<n;e+=1)i=e%4===0?100:255,o=Math.round(this.prop.v[e]*i),this.c[e]!==o&&(this.c[e]=o,this._cmdf=!t);if(this.o.length)for(n=this.prop.v.length,e=this.data.p*4;e<n;e+=1)i=e%2===0?100:1,o=e%2===0?Math.round(this.prop.v[e]*100):this.prop.v[e],this.o[e-this.data.p*4]!==o&&(this.o[e-this.data.p*4]=o,this._omdf=!t);this._mdf=!t;}},extendPrototype([DynamicPropertyContainer],GradientProperty);function SVGGradientFillStyleData(t,e,n){this.initDynamicPropertyContainer(t),this.getValue=this.iterateDynamicProperties,this.initGradientData(t,e,n);}SVGGradientFillStyleData.prototype.initGradientData=function(t,e,n){this.o=PropertyFactory.getProp(t,e.o,0,.01,this),this.s=PropertyFactory.getProp(t,e.s,1,null,this),this.e=PropertyFactory.getProp(t,e.e,1,null,this),this.h=PropertyFactory.getProp(t,e.h||{k:0},0,.01,this),this.a=PropertyFactory.getProp(t,e.a||{k:0},0,degToRads,this),this.g=new GradientProperty(t,e.g,this),this.style=n,this.stops=[],this.setGradientData(n.pElem,e),this.setGradientOpacity(e,n),this._isAnimated=!!this._isAnimated;},SVGGradientFillStyleData.prototype.setGradientData=function(t,e){var n=createElementID(),i=createNS(e.t===1?"linearGradient":"radialGradient");i.setAttribute("id",n),i.setAttribute("spreadMethod","pad"),i.setAttribute("gradientUnits","userSpaceOnUse");var o=[],s,l,h;for(h=e.g.p*4,l=0;l<h;l+=4)s=createNS("stop"),i.appendChild(s),o.push(s);t.setAttribute(e.ty==="gf"?"fill":"stroke","url("+getLocationHref()+"#"+n+")"),this.gf=i,this.cst=o;},SVGGradientFillStyleData.prototype.setGradientOpacity=function(t,e){if(this.g._hasOpacity&&!this.g._collapsable){var n,i,o,s=createNS("mask"),l=createNS("path");s.appendChild(l);var h=createElementID(),p=createElementID();s.setAttribute("id",p);var u=createNS(t.t===1?"linearGradient":"radialGradient");u.setAttribute("id",h),u.setAttribute("spreadMethod","pad"),u.setAttribute("gradientUnits","userSpaceOnUse"),o=t.g.k.k[0].s?t.g.k.k[0].s.length:t.g.k.k.length;var m=this.stops;for(i=t.g.p*4;i<o;i+=2)n=createNS("stop"),n.setAttribute("stop-color","rgb(255,255,255)"),u.appendChild(n),m.push(n);l.setAttribute(t.ty==="gf"?"fill":"stroke","url("+getLocationHref()+"#"+h+")"),t.ty==="gs"&&(l.setAttribute("stroke-linecap",lineCapEnum[t.lc||2]),l.setAttribute("stroke-linejoin",lineJoinEnum[t.lj||2]),t.lj===1&&l.setAttribute("stroke-miterlimit",t.ml)),this.of=u,this.ms=s,this.ost=m,this.maskId=p,e.msElem=l;}},extendPrototype([DynamicPropertyContainer],SVGGradientFillStyleData);function SVGGradientStrokeStyleData(t,e,n){this.initDynamicPropertyContainer(t),this.getValue=this.iterateDynamicProperties,this.w=PropertyFactory.getProp(t,e.w,0,null,this),this.d=new DashProperty(t,e.d||{},"svg",this),this.initGradientData(t,e,n),this._isAnimated=!!this._isAnimated;}extendPrototype([SVGGradientFillStyleData,DynamicPropertyContainer],SVGGradientStrokeStyleData);function ShapeGroupData(){this.it=[],this.prevViewData=[],this.gr=createNS("g");}function SVGTransformData(t,e,n){this.transform={mProps:t,op:e,container:n},this.elements=[],this._isAnimated=this.transform.mProps.dynamicProperties.length||this.transform.op.effectsSequence.length;}var buildShapeString=function(e,n,i,o){if(n===0)return"";var s=e.o,l=e.i,h=e.v,p,u=" M"+o.applyToPointStringified(h[0][0],h[0][1]);for(p=1;p<n;p+=1)u+=" C"+o.applyToPointStringified(s[p-1][0],s[p-1][1])+" "+o.applyToPointStringified(l[p][0],l[p][1])+" "+o.applyToPointStringified(h[p][0],h[p][1]);return i&&n&&(u+=" C"+o.applyToPointStringified(s[p-1][0],s[p-1][1])+" "+o.applyToPointStringified(l[0][0],l[0][1])+" "+o.applyToPointStringified(h[0][0],h[0][1]),u+="z"),u;},SVGElementsRenderer=function(){var t=new Matrix(),e=new Matrix(),n={createRenderFunction:i};function i(b){switch(b.ty){case"fl":return h;case"gf":return u;case"gs":return p;case"st":return m;case"sh":case"el":case"rc":case"sr":return l;case"tr":return o;case"no":return s;default:return null;}}function o(b,d,g){(g||d.transform.op._mdf)&&d.transform.container.setAttribute("opacity",d.transform.op.v),(g||d.transform.mProps._mdf)&&d.transform.container.setAttribute("transform",d.transform.mProps.v.to2dCSS());}function s(){}function l(b,d,g){var E,P,k,v,C,y,S=d.styles.length,O=d.lvl,A,R,N,H;for(y=0;y<S;y+=1){if(v=d.sh._mdf||g,d.styles[y].lvl<O){for(R=e.reset(),N=O-d.styles[y].lvl,H=d.transformers.length-1;!v&&N>0;)v=d.transformers[H].mProps._mdf||v,N-=1,H-=1;if(v)for(N=O-d.styles[y].lvl,H=d.transformers.length-1;N>0;)R.multiply(d.transformers[H].mProps.v),N-=1,H-=1;}else R=t;if(A=d.sh.paths,P=A._length,v){for(k="",E=0;E<P;E+=1)C=A.shapes[E],C&&C._length&&(k+=buildShapeString(C,C._length,C.c,R));d.caches[y]=k;}else k=d.caches[y];d.styles[y].d+=b.hd===!0?"":k,d.styles[y]._mdf=v||d.styles[y]._mdf;}}function h(b,d,g){var E=d.style;(d.c._mdf||g)&&E.pElem.setAttribute("fill","rgb("+bmFloor(d.c.v[0])+","+bmFloor(d.c.v[1])+","+bmFloor(d.c.v[2])+")"),(d.o._mdf||g)&&E.pElem.setAttribute("fill-opacity",d.o.v);}function p(b,d,g){u(b,d,g),m(b,d,g);}function u(b,d,g){var E=d.gf,P=d.g._hasOpacity,k=d.s.v,v=d.e.v;if(d.o._mdf||g){var C=b.ty==="gf"?"fill-opacity":"stroke-opacity";d.style.pElem.setAttribute(C,d.o.v);}if(d.s._mdf||g){var y=b.t===1?"x1":"cx",S=y==="x1"?"y1":"cy";E.setAttribute(y,k[0]),E.setAttribute(S,k[1]),P&&!d.g._collapsable&&(d.of.setAttribute(y,k[0]),d.of.setAttribute(S,k[1]));}var O,A,R,N;if(d.g._cmdf||g){O=d.cst;var H=d.g.c;for(R=O.length,A=0;A<R;A+=1)N=O[A],N.setAttribute("offset",H[A*4]+"%"),N.setAttribute("stop-color","rgb("+H[A*4+1]+","+H[A*4+2]+","+H[A*4+3]+")");}if(P&&(d.g._omdf||g)){var it=d.g.o;for(d.g._collapsable?O=d.cst:O=d.ost,R=O.length,A=0;A<R;A+=1)N=O[A],d.g._collapsable||N.setAttribute("offset",it[A*2]+"%"),N.setAttribute("stop-opacity",it[A*2+1]);}if(b.t===1)(d.e._mdf||g)&&(E.setAttribute("x2",v[0]),E.setAttribute("y2",v[1]),P&&!d.g._collapsable&&(d.of.setAttribute("x2",v[0]),d.of.setAttribute("y2",v[1])));else{var nt;if((d.s._mdf||d.e._mdf||g)&&(nt=Math.sqrt(Math.pow(k[0]-v[0],2)+Math.pow(k[1]-v[1],2)),E.setAttribute("r",nt),P&&!d.g._collapsable&&d.of.setAttribute("r",nt)),d.e._mdf||d.h._mdf||d.a._mdf||g){nt||(nt=Math.sqrt(Math.pow(k[0]-v[0],2)+Math.pow(k[1]-v[1],2)));var Z=Math.atan2(v[1]-k[1],v[0]-k[0]),rt=d.h.v;rt>=1?rt=.99:rt<=-1&&(rt=-.99);var Q=nt*rt,W=Math.cos(Z+d.a.v)*Q+k[0],w=Math.sin(Z+d.a.v)*Q+k[1];E.setAttribute("fx",W),E.setAttribute("fy",w),P&&!d.g._collapsable&&(d.of.setAttribute("fx",W),d.of.setAttribute("fy",w));}}}function m(b,d,g){var E=d.style,P=d.d;P&&(P._mdf||g)&&P.dashStr&&(E.pElem.setAttribute("stroke-dasharray",P.dashStr),E.pElem.setAttribute("stroke-dashoffset",P.dashoffset[0])),d.c&&(d.c._mdf||g)&&E.pElem.setAttribute("stroke","rgb("+bmFloor(d.c.v[0])+","+bmFloor(d.c.v[1])+","+bmFloor(d.c.v[2])+")"),(d.o._mdf||g)&&E.pElem.setAttribute("stroke-opacity",d.o.v),(d.w._mdf||g)&&(E.pElem.setAttribute("stroke-width",d.w.v),E.msElem&&E.msElem.setAttribute("stroke-width",d.w.v));}return n;}();function SVGShapeElement(t,e,n){this.shapes=[],this.shapesData=t.shapes,this.stylesList=[],this.shapeModifiers=[],this.itemsData=[],this.processedElements=[],this.animatedContents=[],this.initElement(t,e,n),this.prevViewData=[];}extendPrototype([BaseElement,TransformElement,SVGBaseElement,IShapeElement,HierarchyElement,FrameElement,RenderableDOMElement],SVGShapeElement),SVGShapeElement.prototype.initSecondaryElement=function(){},SVGShapeElement.prototype.identityMatrix=new Matrix(),SVGShapeElement.prototype.buildExpressionInterface=function(){},SVGShapeElement.prototype.createContent=function(){this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.layerElement,0,[],!0),this.filterUniqueShapes();},SVGShapeElement.prototype.filterUniqueShapes=function(){var t,e=this.shapes.length,n,i,o=this.stylesList.length,s,l=[],h=!1;for(i=0;i<o;i+=1){for(s=this.stylesList[i],h=!1,l.length=0,t=0;t<e;t+=1)n=this.shapes[t],n.styles.indexOf(s)!==-1&&(l.push(n),h=n._isAnimated||h);l.length>1&&h&&this.setShapesAsAnimated(l);}},SVGShapeElement.prototype.setShapesAsAnimated=function(t){var e,n=t.length;for(e=0;e<n;e+=1)t[e].setAsAnimated();},SVGShapeElement.prototype.createStyleElement=function(t,e){var n,i=new SVGStyleData(t,e),o=i.pElem;if(t.ty==="st")n=new SVGStrokeStyleData(this,t,i);else if(t.ty==="fl")n=new SVGFillStyleData(this,t,i);else if(t.ty==="gf"||t.ty==="gs"){var s=t.ty==="gf"?SVGGradientFillStyleData:SVGGradientStrokeStyleData;n=new s(this,t,i),this.globalData.defs.appendChild(n.gf),n.maskId&&(this.globalData.defs.appendChild(n.ms),this.globalData.defs.appendChild(n.of),o.setAttribute("mask","url("+getLocationHref()+"#"+n.maskId+")"));}else t.ty==="no"&&(n=new SVGNoStyleData(this,t,i));return(t.ty==="st"||t.ty==="gs")&&(o.setAttribute("stroke-linecap",lineCapEnum[t.lc||2]),o.setAttribute("stroke-linejoin",lineJoinEnum[t.lj||2]),o.setAttribute("fill-opacity","0"),t.lj===1&&o.setAttribute("stroke-miterlimit",t.ml)),t.r===2&&o.setAttribute("fill-rule","evenodd"),t.ln&&o.setAttribute("id",t.ln),t.cl&&o.setAttribute("class",t.cl),t.bm&&(o.style["mix-blend-mode"]=getBlendMode(t.bm)),this.stylesList.push(i),this.addToAnimatedContents(t,n),n;},SVGShapeElement.prototype.createGroupElement=function(t){var e=new ShapeGroupData();return t.ln&&e.gr.setAttribute("id",t.ln),t.cl&&e.gr.setAttribute("class",t.cl),t.bm&&(e.gr.style["mix-blend-mode"]=getBlendMode(t.bm)),e;},SVGShapeElement.prototype.createTransformElement=function(t,e){var n=TransformPropertyFactory.getTransformProperty(this,t,this),i=new SVGTransformData(n,n.o,e);return this.addToAnimatedContents(t,i),i;},SVGShapeElement.prototype.createShapeElement=function(t,e,n){var i=4;t.ty==="rc"?i=5:t.ty==="el"?i=6:t.ty==="sr"&&(i=7);var o=ShapePropertyFactory.getShapeProp(this,t,i,this),s=new SVGShapeData(e,n,o);return this.shapes.push(s),this.addShapeToModifiers(s),this.addToAnimatedContents(t,s),s;},SVGShapeElement.prototype.addToAnimatedContents=function(t,e){for(var n=0,i=this.animatedContents.length;n<i;){if(this.animatedContents[n].element===e)return;n+=1;}this.animatedContents.push({fn:SVGElementsRenderer.createRenderFunction(t),element:e,data:t});},SVGShapeElement.prototype.setElementStyles=function(t){var e=t.styles,n,i=this.stylesList.length;for(n=0;n<i;n+=1)this.stylesList[n].closed||e.push(this.stylesList[n]);},SVGShapeElement.prototype.reloadShapes=function(){this._isFirstFrame=!0;var t,e=this.itemsData.length;for(t=0;t<e;t+=1)this.prevViewData[t]=this.itemsData[t];for(this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.layerElement,0,[],!0),this.filterUniqueShapes(),e=this.dynamicProperties.length,t=0;t<e;t+=1)this.dynamicProperties[t].getValue();this.renderModifiers();},SVGShapeElement.prototype.searchShapes=function(t,e,n,i,o,s,l){var h=[].concat(s),p,u=t.length-1,m,b,d=[],g=[],E,P,k;for(p=u;p>=0;p-=1){if(k=this.searchProcessedElement(t[p]),k?e[p]=n[k-1]:t[p]._render=l,t[p].ty==="fl"||t[p].ty==="st"||t[p].ty==="gf"||t[p].ty==="gs"||t[p].ty==="no")k?e[p].style.closed=!1:e[p]=this.createStyleElement(t[p],o),t[p]._render&&e[p].style.pElem.parentNode!==i&&i.appendChild(e[p].style.pElem),d.push(e[p].style);else if(t[p].ty==="gr"){if(!k)e[p]=this.createGroupElement(t[p]);else for(b=e[p].it.length,m=0;m<b;m+=1)e[p].prevViewData[m]=e[p].it[m];this.searchShapes(t[p].it,e[p].it,e[p].prevViewData,e[p].gr,o+1,h,l),t[p]._render&&e[p].gr.parentNode!==i&&i.appendChild(e[p].gr);}else t[p].ty==="tr"?(k||(e[p]=this.createTransformElement(t[p],i)),E=e[p].transform,h.push(E)):t[p].ty==="sh"||t[p].ty==="rc"||t[p].ty==="el"||t[p].ty==="sr"?(k||(e[p]=this.createShapeElement(t[p],h,o)),this.setElementStyles(e[p])):t[p].ty==="tm"||t[p].ty==="rd"||t[p].ty==="ms"||t[p].ty==="pb"||t[p].ty==="zz"||t[p].ty==="op"?(k?(P=e[p],P.closed=!1):(P=ShapeModifiers.getModifier(t[p].ty),P.init(this,t[p]),e[p]=P,this.shapeModifiers.push(P)),g.push(P)):t[p].ty==="rp"&&(k?(P=e[p],P.closed=!0):(P=ShapeModifiers.getModifier(t[p].ty),e[p]=P,P.init(this,t,p,e),this.shapeModifiers.push(P),l=!1),g.push(P));this.addProcessedElement(t[p],p+1);}for(u=d.length,p=0;p<u;p+=1)d[p].closed=!0;for(u=g.length,p=0;p<u;p+=1)g[p].closed=!0;},SVGShapeElement.prototype.renderInnerContent=function(){this.renderModifiers();var t,e=this.stylesList.length;for(t=0;t<e;t+=1)this.stylesList[t].reset();for(this.renderShape(),t=0;t<e;t+=1)(this.stylesList[t]._mdf||this._isFirstFrame)&&(this.stylesList[t].msElem&&(this.stylesList[t].msElem.setAttribute("d",this.stylesList[t].d),this.stylesList[t].d="M0 0"+this.stylesList[t].d),this.stylesList[t].pElem.setAttribute("d",this.stylesList[t].d||"M0 0"));},SVGShapeElement.prototype.renderShape=function(){var t,e=this.animatedContents.length,n;for(t=0;t<e;t+=1)n=this.animatedContents[t],(this._isFirstFrame||n.element._isAnimated)&&n.data!==!0&&n.fn(n.data,n.element,this._isFirstFrame);},SVGShapeElement.prototype.destroy=function(){this.destroyBaseElement(),this.shapesData=null,this.itemsData=null;};function LetterProps(t,e,n,i,o,s){this.o=t,this.sw=e,this.sc=n,this.fc=i,this.m=o,this.p=s,this._mdf={o:!0,sw:!!e,sc:!!n,fc:!!i,m:!0,p:!0};}LetterProps.prototype.update=function(t,e,n,i,o,s){this._mdf.o=!1,this._mdf.sw=!1,this._mdf.sc=!1,this._mdf.fc=!1,this._mdf.m=!1,this._mdf.p=!1;var l=!1;return this.o!==t&&(this.o=t,this._mdf.o=!0,l=!0),this.sw!==e&&(this.sw=e,this._mdf.sw=!0,l=!0),this.sc!==n&&(this.sc=n,this._mdf.sc=!0,l=!0),this.fc!==i&&(this.fc=i,this._mdf.fc=!0,l=!0),this.m!==o&&(this.m=o,this._mdf.m=!0,l=!0),s.length&&(this.p[0]!==s[0]||this.p[1]!==s[1]||this.p[4]!==s[4]||this.p[5]!==s[5]||this.p[12]!==s[12]||this.p[13]!==s[13])&&(this.p=s,this._mdf.p=!0,l=!0),l;};function TextProperty(t,e){this._frameId=initialDefaultFrame,this.pv="",this.v="",this.kf=!1,this._isFirstFrame=!0,this._mdf=!1,e.d&&e.d.sid&&(e.d=t.globalData.slotManager.getProp(e.d)),this.data=e,this.elem=t,this.comp=this.elem.comp,this.keysIndex=0,this.canResize=!1,this.minimumFontSize=1,this.effectsSequence=[],this.currentData={ascent:0,boxWidth:this.defaultBoxWidth,f:"",fStyle:"",fWeight:"",fc:"",j:"",justifyOffset:"",l:[],lh:0,lineWidths:[],ls:"",of:"",s:"",sc:"",sw:0,t:0,tr:0,sz:0,ps:null,fillColorAnim:!1,strokeColorAnim:!1,strokeWidthAnim:!1,yOffset:0,finalSize:0,finalText:[],finalLineHeight:0,__complete:!1},this.copyData(this.currentData,this.data.d.k[0].s),this.searchProperty()||this.completeTextData(this.currentData);}TextProperty.prototype.defaultBoxWidth=[0,0],TextProperty.prototype.copyData=function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t;},TextProperty.prototype.setCurrentData=function(t){t.__complete||this.completeTextData(t),this.currentData=t,this.currentData.boxWidth=this.currentData.boxWidth||this.defaultBoxWidth,this._mdf=!0;},TextProperty.prototype.searchProperty=function(){return this.searchKeyframes();},TextProperty.prototype.searchKeyframes=function(){return this.kf=this.data.d.k.length>1,this.kf&&this.addEffect(this.getKeyframeValue.bind(this)),this.kf;},TextProperty.prototype.addEffect=function(t){this.effectsSequence.push(t),this.elem.addDynamicProperty(this);},TextProperty.prototype.getValue=function(t){if(!((this.elem.globalData.frameId===this.frameId||!this.effectsSequence.length)&&!t)){this.currentData.t=this.data.d.k[this.keysIndex].s.t;var e=this.currentData,n=this.keysIndex;if(this.lock){this.setCurrentData(this.currentData);return;}this.lock=!0,this._mdf=!1;var i,o=this.effectsSequence.length,s=t||this.data.d.k[this.keysIndex].s;for(i=0;i<o;i+=1)n!==this.keysIndex?s=this.effectsSequence[i](s,s.t):s=this.effectsSequence[i](this.currentData,s.t);e!==s&&this.setCurrentData(s),this.v=this.currentData,this.pv=this.v,this.lock=!1,this.frameId=this.elem.globalData.frameId;}},TextProperty.prototype.getKeyframeValue=function(){for(var t=this.data.d.k,e=this.elem.comp.renderedFrame,n=0,i=t.length;n<=i-1&&!(n===i-1||t[n+1].t>e);)n+=1;return this.keysIndex!==n&&(this.keysIndex=n),this.data.d.k[this.keysIndex].s;},TextProperty.prototype.buildFinalText=function(t){for(var e=[],n=0,i=t.length,o,s,l=!1,h=!1,p="";n<i;)l=h,h=!1,o=t.charCodeAt(n),p=t.charAt(n),FontManager.isCombinedCharacter(o)?l=!0:o>=55296&&o<=56319?FontManager.isRegionalFlag(t,n)?p=t.substr(n,14):(s=t.charCodeAt(n+1),s>=56320&&s<=57343&&(FontManager.isModifier(o,s)?(p=t.substr(n,2),l=!0):FontManager.isFlagEmoji(t.substr(n,4))?p=t.substr(n,4):p=t.substr(n,2))):o>56319?(s=t.charCodeAt(n+1),FontManager.isVariationSelector(o)&&(l=!0)):FontManager.isZeroWidthJoiner(o)&&(l=!0,h=!0),l?(e[e.length-1]+=p,l=!1):e.push(p),n+=p.length;return e;},TextProperty.prototype.completeTextData=function(t){t.__complete=!0;var e=this.elem.globalData.fontManager,n=this.data,i=[],o,s,l,h=0,p,u=n.m.g,m=0,b=0,d=0,g=[],E=0,P=0,k,v,C=e.getFontByName(t.f),y,S=0,O=getFontProperties(C);t.fWeight=O.weight,t.fStyle=O.style,t.finalSize=t.s,t.finalText=this.buildFinalText(t.t),s=t.finalText.length,t.finalLineHeight=t.lh;var A=t.tr/1e3*t.finalSize,R;if(t.sz)for(var N=!0,H=t.sz[0],it=t.sz[1],nt,Z;N;){Z=this.buildFinalText(t.t),nt=0,E=0,s=Z.length,A=t.tr/1e3*t.finalSize;var rt=-1;for(o=0;o<s;o+=1)R=Z[o].charCodeAt(0),l=!1,Z[o]===" "?rt=o:(R===13||R===3)&&(E=0,l=!0,nt+=t.finalLineHeight||t.finalSize*1.2),e.chars?(y=e.getCharData(Z[o],C.fStyle,C.fFamily),S=l?0:y.w*t.finalSize/100):S=e.measureText(Z[o],t.f,t.finalSize),E+S>H&&Z[o]!==" "?(rt===-1?s+=1:o=rt,nt+=t.finalLineHeight||t.finalSize*1.2,Z.splice(o,rt===o?1:0,"\r"),rt=-1,E=0):(E+=S,E+=A);nt+=C.ascent*t.finalSize/100,this.canResize&&t.finalSize>this.minimumFontSize&&it<nt?(t.finalSize-=1,t.finalLineHeight=t.finalSize*t.lh/t.s):(t.finalText=Z,s=t.finalText.length,N=!1);}E=-A,S=0;var Q=0,W;for(o=0;o<s;o+=1)if(l=!1,W=t.finalText[o],R=W.charCodeAt(0),R===13||R===3?(Q=0,g.push(E),P=E>P?E:P,E=-2*A,p="",l=!0,d+=1):p=W,e.chars?(y=e.getCharData(W,C.fStyle,e.getFontByName(t.f).fFamily),S=l?0:y.w*t.finalSize/100):S=e.measureText(p,t.f,t.finalSize),W===" "?Q+=S+A:(E+=S+A+Q,Q=0),i.push({l:S,an:S,add:m,n:l,anIndexes:[],val:p,line:d,animatorJustifyOffset:0}),u==2){if(m+=S,p===""||p===" "||o===s-1){for((p===""||p===" ")&&(m-=S);b<=o;)i[b].an=m,i[b].ind=h,i[b].extra=S,b+=1;h+=1,m=0;}}else if(u==3){if(m+=S,p===""||o===s-1){for(p===""&&(m-=S);b<=o;)i[b].an=m,i[b].ind=h,i[b].extra=S,b+=1;m=0,h+=1;}}else i[h].ind=h,i[h].extra=0,h+=1;if(t.l=i,P=E>P?E:P,g.push(E),t.sz)t.boxWidth=t.sz[0],t.justifyOffset=0;else switch(t.boxWidth=P,t.j){case 1:t.justifyOffset=-t.boxWidth;break;case 2:t.justifyOffset=-t.boxWidth/2;break;default:t.justifyOffset=0;}t.lineWidths=g;var w=n.a,F,x;v=w.length;var M,z,B=[];for(k=0;k<v;k+=1){for(F=w[k],F.a.sc&&(t.strokeColorAnim=!0),F.a.sw&&(t.strokeWidthAnim=!0),(F.a.fc||F.a.fh||F.a.fs||F.a.fb)&&(t.fillColorAnim=!0),z=0,M=F.s.b,o=0;o<s;o+=1)x=i[o],x.anIndexes[k]=z,(M==1&&x.val!==""||M==2&&x.val!==""&&x.val!==" "||M==3&&(x.n||x.val==" "||o==s-1)||M==4&&(x.n||o==s-1))&&(F.s.rn===1&&B.push(z),z+=1);n.a[k].s.totalChars=z;var J=-1,tt;if(F.s.rn===1)for(o=0;o<s;o+=1)x=i[o],J!=x.anIndexes[k]&&(J=x.anIndexes[k],tt=B.splice(Math.floor(Math.random()*B.length),1)[0]),x.anIndexes[k]=tt;}t.yOffset=t.finalLineHeight||t.finalSize*1.2,t.ls=t.ls||0,t.ascent=C.ascent*t.finalSize/100;},TextProperty.prototype.updateDocumentData=function(t,e){e=e===void 0?this.keysIndex:e;var n=this.copyData({},this.data.d.k[e].s);n=this.copyData(n,t),this.data.d.k[e].s=n,this.recalculate(e),this.setCurrentData(n),this.elem.addDynamicProperty(this);},TextProperty.prototype.recalculate=function(t){var e=this.data.d.k[t].s;e.__complete=!1,this.keysIndex=0,this._isFirstFrame=!0,this.getValue(e);},TextProperty.prototype.canResizeFont=function(t){this.canResize=t,this.recalculate(this.keysIndex),this.elem.addDynamicProperty(this);},TextProperty.prototype.setMinimumFontSize=function(t){this.minimumFontSize=Math.floor(t)||1,this.recalculate(this.keysIndex),this.elem.addDynamicProperty(this);};var TextSelectorProp=function(){var t=Math.max,e=Math.min,n=Math.floor;function i(s,l){this._currentTextLength=-1,this.k=!1,this.data=l,this.elem=s,this.comp=s.comp,this.finalS=0,this.finalE=0,this.initDynamicPropertyContainer(s),this.s=PropertyFactory.getProp(s,l.s||{k:0},0,0,this),"e"in l?this.e=PropertyFactory.getProp(s,l.e,0,0,this):this.e={v:100},this.o=PropertyFactory.getProp(s,l.o||{k:0},0,0,this),this.xe=PropertyFactory.getProp(s,l.xe||{k:0},0,0,this),this.ne=PropertyFactory.getProp(s,l.ne||{k:0},0,0,this),this.sm=PropertyFactory.getProp(s,l.sm||{k:100},0,0,this),this.a=PropertyFactory.getProp(s,l.a,0,.01,this),this.dynamicProperties.length||this.getValue();}i.prototype={getMult:function(l){this._currentTextLength!==this.elem.textProperty.currentData.l.length&&this.getValue();var h=0,p=0,u=1,m=1;this.ne.v>0?h=this.ne.v/100:p=-this.ne.v/100,this.xe.v>0?u=1-this.xe.v/100:m=1+this.xe.v/100;var b=BezierFactory.getBezierEasing(h,p,u,m).get,d=0,g=this.finalS,E=this.finalE,P=this.data.sh;if(P===2)E===g?d=l>=E?1:0:d=t(0,e(.5/(E-g)+(l-g)/(E-g),1)),d=b(d);else if(P===3)E===g?d=l>=E?0:1:d=1-t(0,e(.5/(E-g)+(l-g)/(E-g),1)),d=b(d);else if(P===4)E===g?d=0:(d=t(0,e(.5/(E-g)+(l-g)/(E-g),1)),d<.5?d*=2:d=1-2*(d-.5)),d=b(d);else if(P===5){if(E===g)d=0;else{var k=E-g;l=e(t(0,l+.5-g),E-g);var v=-k/2+l,C=k/2;d=Math.sqrt(1-v*v/(C*C));}d=b(d);}else P===6?(E===g?d=0:(l=e(t(0,l+.5-g),E-g),d=(1+Math.cos(Math.PI+Math.PI*2*l/(E-g)))/2),d=b(d)):(l>=n(g)&&(l-g<0?d=t(0,e(e(E,1)-(g-l),1)):d=t(0,e(E-l,1))),d=b(d));if(this.sm.v!==100){var y=this.sm.v*.01;y===0&&(y=1e-8);var S=.5-y*.5;d<S?d=0:(d=(d-S)/y,d>1&&(d=1));}return d*this.a.v;},getValue:function(l){this.iterateDynamicProperties(),this._mdf=l||this._mdf,this._currentTextLength=this.elem.textProperty.currentData.l.length||0,l&&this.data.r===2&&(this.e.v=this._currentTextLength);var h=this.data.r===2?1:100/this.data.totalChars,p=this.o.v/h,u=this.s.v/h+p,m=this.e.v/h+p;if(u>m){var b=u;u=m,m=b;}this.finalS=u,this.finalE=m;}},extendPrototype([DynamicPropertyContainer],i);function o(s,l,h){return new i(s,l,h);}return{getTextSelectorProp:o};}();function TextAnimatorDataProperty(t,e,n){var i={propType:!1},o=PropertyFactory.getProp,s=e.a;this.a={r:s.r?o(t,s.r,0,degToRads,n):i,rx:s.rx?o(t,s.rx,0,degToRads,n):i,ry:s.ry?o(t,s.ry,0,degToRads,n):i,sk:s.sk?o(t,s.sk,0,degToRads,n):i,sa:s.sa?o(t,s.sa,0,degToRads,n):i,s:s.s?o(t,s.s,1,.01,n):i,a:s.a?o(t,s.a,1,0,n):i,o:s.o?o(t,s.o,0,.01,n):i,p:s.p?o(t,s.p,1,0,n):i,sw:s.sw?o(t,s.sw,0,0,n):i,sc:s.sc?o(t,s.sc,1,0,n):i,fc:s.fc?o(t,s.fc,1,0,n):i,fh:s.fh?o(t,s.fh,0,0,n):i,fs:s.fs?o(t,s.fs,0,.01,n):i,fb:s.fb?o(t,s.fb,0,.01,n):i,t:s.t?o(t,s.t,0,0,n):i},this.s=TextSelectorProp.getTextSelectorProp(t,e.s,n),this.s.t=e.s.t;}function TextAnimatorProperty(t,e,n){this._isFirstFrame=!0,this._hasMaskedPath=!1,this._frameId=-1,this._textData=t,this._renderType=e,this._elem=n,this._animatorsData=createSizedArray(this._textData.a.length),this._pathData={},this._moreOptions={alignment:{}},this.renderedLetters=[],this.lettersChangedFlag=!1,this.initDynamicPropertyContainer(n);}TextAnimatorProperty.prototype.searchProperties=function(){var t,e=this._textData.a.length,n,i=PropertyFactory.getProp;for(t=0;t<e;t+=1)n=this._textData.a[t],this._animatorsData[t]=new TextAnimatorDataProperty(this._elem,n,this);this._textData.p&&"m"in this._textData.p?(this._pathData={a:i(this._elem,this._textData.p.a,0,0,this),f:i(this._elem,this._textData.p.f,0,0,this),l:i(this._elem,this._textData.p.l,0,0,this),r:i(this._elem,this._textData.p.r,0,0,this),p:i(this._elem,this._textData.p.p,0,0,this),m:this._elem.maskManager.getMaskProperty(this._textData.p.m)},this._hasMaskedPath=!0):this._hasMaskedPath=!1,this._moreOptions.alignment=i(this._elem,this._textData.m.a,1,0,this);},TextAnimatorProperty.prototype.getMeasures=function(t,e){if(this.lettersChangedFlag=e,!(!this._mdf&&!this._isFirstFrame&&!e&&(!this._hasMaskedPath||!this._pathData.m._mdf))){this._isFirstFrame=!1;var n=this._moreOptions.alignment.v,i=this._animatorsData,o=this._textData,s=this.mHelper,l=this._renderType,h=this.renderedLetters.length,p,u,m,b,d=t.l,g,E,P,k,v,C,y,S,O,A,R,N,H,it,nt;if(this._hasMaskedPath){if(nt=this._pathData.m,!this._pathData.n||this._pathData._mdf){var Z=nt.v;this._pathData.r.v&&(Z=Z.reverse()),g={tLength:0,segments:[]},b=Z._length-1;var rt;for(N=0,m=0;m<b;m+=1)rt=bez.buildBezierData(Z.v[m],Z.v[m+1],[Z.o[m][0]-Z.v[m][0],Z.o[m][1]-Z.v[m][1]],[Z.i[m+1][0]-Z.v[m+1][0],Z.i[m+1][1]-Z.v[m+1][1]]),g.tLength+=rt.segmentLength,g.segments.push(rt),N+=rt.segmentLength;m=b,nt.v.c&&(rt=bez.buildBezierData(Z.v[m],Z.v[0],[Z.o[m][0]-Z.v[m][0],Z.o[m][1]-Z.v[m][1]],[Z.i[0][0]-Z.v[0][0],Z.i[0][1]-Z.v[0][1]]),g.tLength+=rt.segmentLength,g.segments.push(rt),N+=rt.segmentLength),this._pathData.pi=g;}if(g=this._pathData.pi,E=this._pathData.f.v,y=0,C=1,k=0,v=!0,A=g.segments,E<0&&nt.v.c)for(g.tLength<Math.abs(E)&&(E=-Math.abs(E)%g.tLength),y=A.length-1,O=A[y].points,C=O.length-1;E<0;)E+=O[C].partialLength,C-=1,C<0&&(y-=1,O=A[y].points,C=O.length-1);O=A[y].points,S=O[C-1],P=O[C],R=P.partialLength;}b=d.length,p=0,u=0;var Q=t.finalSize*1.2*.714,W=!0,w,F,x,M,z;M=i.length;var B,J=-1,tt,K,Pt,xt=E,Xt=y,fe=C,Re=-1,ee,Qt,Te,Rt,lt,$e,Ge,hn,Ue="",He=this.defaultPropsArray,Xe;if(t.j===2||t.j===1){var ge=0,yn=0,Pn=t.j===2?-.5:-1,we=0,pn=!0;for(m=0;m<b;m+=1)if(d[m].n){for(ge&&(ge+=yn);we<m;)d[we].animatorJustifyOffset=ge,we+=1;ge=0,pn=!0;}else{for(x=0;x<M;x+=1)w=i[x].a,w.t.propType&&(pn&&t.j===2&&(yn+=w.t.v*Pn),F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),B.length?ge+=w.t.v*B[0]*Pn:ge+=w.t.v*B*Pn);pn=!1;}for(ge&&(ge+=yn);we<m;)d[we].animatorJustifyOffset=ge,we+=1;}for(m=0;m<b;m+=1){if(s.reset(),ee=1,d[m].n)p=0,u+=t.yOffset,u+=W?1:0,E=xt,W=!1,this._hasMaskedPath&&(y=Xt,C=fe,O=A[y].points,S=O[C-1],P=O[C],R=P.partialLength,k=0),Ue="",hn="",$e="",Xe="",He=this.defaultPropsArray;else{if(this._hasMaskedPath){if(Re!==d[m].line){switch(t.j){case 1:E+=N-t.lineWidths[d[m].line];break;case 2:E+=(N-t.lineWidths[d[m].line])/2;break;default:break;}Re=d[m].line;}J!==d[m].ind&&(d[J]&&(E+=d[J].extra),E+=d[m].an/2,J=d[m].ind),E+=n[0]*d[m].an*.005;var Fe=0;for(x=0;x<M;x+=1)w=i[x].a,w.p.propType&&(F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),B.length?Fe+=w.p.v[0]*B[0]:Fe+=w.p.v[0]*B),w.a.propType&&(F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),B.length?Fe+=w.a.v[0]*B[0]:Fe+=w.a.v[0]*B);for(v=!0,this._pathData.a.v&&(E=d[0].an*.5+(N-this._pathData.f.v-d[0].an*.5-d[d.length-1].an*.5)*J/(b-1),E+=this._pathData.f.v);v;)k+R>=E+Fe||!O?(H=(E+Fe-k)/P.partialLength,K=S.point[0]+(P.point[0]-S.point[0])*H,Pt=S.point[1]+(P.point[1]-S.point[1])*H,s.translate(-n[0]*d[m].an*.005,-(n[1]*Q)*.01),v=!1):O&&(k+=P.partialLength,C+=1,C>=O.length&&(C=0,y+=1,A[y]?O=A[y].points:nt.v.c?(C=0,y=0,O=A[y].points):(k-=P.partialLength,O=null)),O&&(S=P,P=O[C],R=P.partialLength));tt=d[m].an/2-d[m].add,s.translate(-tt,0,0);}else tt=d[m].an/2-d[m].add,s.translate(-tt,0,0),s.translate(-n[0]*d[m].an*.005,-n[1]*Q*.01,0);for(x=0;x<M;x+=1)w=i[x].a,w.t.propType&&(F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),(p!==0||t.j!==0)&&(this._hasMaskedPath?B.length?E+=w.t.v*B[0]:E+=w.t.v*B:B.length?p+=w.t.v*B[0]:p+=w.t.v*B));for(t.strokeWidthAnim&&(Te=t.sw||0),t.strokeColorAnim&&(t.sc?Qt=[t.sc[0],t.sc[1],t.sc[2]]:Qt=[0,0,0]),t.fillColorAnim&&t.fc&&(Rt=[t.fc[0],t.fc[1],t.fc[2]]),x=0;x<M;x+=1)w=i[x].a,w.a.propType&&(F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),B.length?s.translate(-w.a.v[0]*B[0],-w.a.v[1]*B[1],w.a.v[2]*B[2]):s.translate(-w.a.v[0]*B,-w.a.v[1]*B,w.a.v[2]*B));for(x=0;x<M;x+=1)w=i[x].a,w.s.propType&&(F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),B.length?s.scale(1+(w.s.v[0]-1)*B[0],1+(w.s.v[1]-1)*B[1],1):s.scale(1+(w.s.v[0]-1)*B,1+(w.s.v[1]-1)*B,1));for(x=0;x<M;x+=1){if(w=i[x].a,F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),w.sk.propType&&(B.length?s.skewFromAxis(-w.sk.v*B[0],w.sa.v*B[1]):s.skewFromAxis(-w.sk.v*B,w.sa.v*B)),w.r.propType&&(B.length?s.rotateZ(-w.r.v*B[2]):s.rotateZ(-w.r.v*B)),w.ry.propType&&(B.length?s.rotateY(w.ry.v*B[1]):s.rotateY(w.ry.v*B)),w.rx.propType&&(B.length?s.rotateX(w.rx.v*B[0]):s.rotateX(w.rx.v*B)),w.o.propType&&(B.length?ee+=(w.o.v*B[0]-ee)*B[0]:ee+=(w.o.v*B-ee)*B),t.strokeWidthAnim&&w.sw.propType&&(B.length?Te+=w.sw.v*B[0]:Te+=w.sw.v*B),t.strokeColorAnim&&w.sc.propType)for(lt=0;lt<3;lt+=1)B.length?Qt[lt]+=(w.sc.v[lt]-Qt[lt])*B[0]:Qt[lt]+=(w.sc.v[lt]-Qt[lt])*B;if(t.fillColorAnim&&t.fc){if(w.fc.propType)for(lt=0;lt<3;lt+=1)B.length?Rt[lt]+=(w.fc.v[lt]-Rt[lt])*B[0]:Rt[lt]+=(w.fc.v[lt]-Rt[lt])*B;w.fh.propType&&(B.length?Rt=addHueToRGB(Rt,w.fh.v*B[0]):Rt=addHueToRGB(Rt,w.fh.v*B)),w.fs.propType&&(B.length?Rt=addSaturationToRGB(Rt,w.fs.v*B[0]):Rt=addSaturationToRGB(Rt,w.fs.v*B)),w.fb.propType&&(B.length?Rt=addBrightnessToRGB(Rt,w.fb.v*B[0]):Rt=addBrightnessToRGB(Rt,w.fb.v*B));}}for(x=0;x<M;x+=1)w=i[x].a,w.p.propType&&(F=i[x].s,B=F.getMult(d[m].anIndexes[x],o.a[x].s.totalChars),this._hasMaskedPath?B.length?s.translate(0,w.p.v[1]*B[0],-w.p.v[2]*B[1]):s.translate(0,w.p.v[1]*B,-w.p.v[2]*B):B.length?s.translate(w.p.v[0]*B[0],w.p.v[1]*B[1],-w.p.v[2]*B[2]):s.translate(w.p.v[0]*B,w.p.v[1]*B,-w.p.v[2]*B));if(t.strokeWidthAnim&&($e=Te<0?0:Te),t.strokeColorAnim&&(Ge="rgb("+Math.round(Qt[0]*255)+","+Math.round(Qt[1]*255)+","+Math.round(Qt[2]*255)+")"),t.fillColorAnim&&t.fc&&(hn="rgb("+Math.round(Rt[0]*255)+","+Math.round(Rt[1]*255)+","+Math.round(Rt[2]*255)+")"),this._hasMaskedPath){if(s.translate(0,-t.ls),s.translate(0,n[1]*Q*.01+u,0),this._pathData.p.v){it=(P.point[1]-S.point[1])/(P.point[0]-S.point[0]);var Ln=Math.atan(it)*180/Math.PI;P.point[0]<S.point[0]&&(Ln+=180),s.rotate(-Ln*Math.PI/180);}s.translate(K,Pt,0),E-=n[0]*d[m].an*.005,d[m+1]&&J!==d[m+1].ind&&(E+=d[m].an/2,E+=t.tr*.001*t.finalSize);}else{switch(s.translate(p,u,0),t.ps&&s.translate(t.ps[0],t.ps[1]+t.ascent,0),t.j){case 1:s.translate(d[m].animatorJustifyOffset+t.justifyOffset+(t.boxWidth-t.lineWidths[d[m].line]),0,0);break;case 2:s.translate(d[m].animatorJustifyOffset+t.justifyOffset+(t.boxWidth-t.lineWidths[d[m].line])/2,0,0);break;default:break;}s.translate(0,-t.ls),s.translate(tt,0,0),s.translate(n[0]*d[m].an*.005,n[1]*Q*.01,0),p+=d[m].l+t.tr*.001*t.finalSize;}l==="html"?Ue=s.toCSS():l==="svg"?Ue=s.to2dCSS():He=[s.props[0],s.props[1],s.props[2],s.props[3],s.props[4],s.props[5],s.props[6],s.props[7],s.props[8],s.props[9],s.props[10],s.props[11],s.props[12],s.props[13],s.props[14],s.props[15]],Xe=ee;}h<=m?(z=new LetterProps(Xe,$e,Ge,hn,Ue,He),this.renderedLetters.push(z),h+=1,this.lettersChangedFlag=!0):(z=this.renderedLetters[m],this.lettersChangedFlag=z.update(Xe,$e,Ge,hn,Ue,He)||this.lettersChangedFlag);}}},TextAnimatorProperty.prototype.getValue=function(){this._elem.globalData.frameId!==this._frameId&&(this._frameId=this._elem.globalData.frameId,this.iterateDynamicProperties());},TextAnimatorProperty.prototype.mHelper=new Matrix(),TextAnimatorProperty.prototype.defaultPropsArray=[],extendPrototype([DynamicPropertyContainer],TextAnimatorProperty);function ITextElement(){}ITextElement.prototype.initElement=function(t,e,n){this.lettersChangedFlag=!0,this.initFrame(),this.initBaseData(t,e,n),this.textProperty=new TextProperty(this,t.t,this.dynamicProperties),this.textAnimator=new TextAnimatorProperty(t.t,this.renderType,this),this.initTransform(t,e,n),this.initHierarchy(),this.initRenderable(),this.initRendererElement(),this.createContainerElements(),this.createRenderableComponents(),this.createContent(),this.hide(),this.textAnimator.searchProperties(this.dynamicProperties);},ITextElement.prototype.prepareFrame=function(t){this._mdf=!1,this.prepareRenderableFrame(t),this.prepareProperties(t,this.isInRange);},ITextElement.prototype.createPathShape=function(t,e){var n,i=e.length,o,s="";for(n=0;n<i;n+=1)e[n].ty==="sh"&&(o=e[n].ks.k,s+=buildShapeString(o,o.i.length,!0,t));return s;},ITextElement.prototype.updateDocumentData=function(t,e){this.textProperty.updateDocumentData(t,e);},ITextElement.prototype.canResizeFont=function(t){this.textProperty.canResizeFont(t);},ITextElement.prototype.setMinimumFontSize=function(t){this.textProperty.setMinimumFontSize(t);},ITextElement.prototype.applyTextPropertiesToMatrix=function(t,e,n,i,o){switch(t.ps&&e.translate(t.ps[0],t.ps[1]+t.ascent,0),e.translate(0,-t.ls,0),t.j){case 1:e.translate(t.justifyOffset+(t.boxWidth-t.lineWidths[n]),0,0);break;case 2:e.translate(t.justifyOffset+(t.boxWidth-t.lineWidths[n])/2,0,0);break;default:break;}e.translate(i,o,0);},ITextElement.prototype.buildColor=function(t){return"rgb("+Math.round(t[0]*255)+","+Math.round(t[1]*255)+","+Math.round(t[2]*255)+")";},ITextElement.prototype.emptyProp=new LetterProps(),ITextElement.prototype.destroy=function(){},ITextElement.prototype.validateText=function(){(this.textProperty._mdf||this.textProperty._isFirstFrame)&&(this.buildNewText(),this.textProperty._isFirstFrame=!1,this.textProperty._mdf=!1);};var emptyShapeData={shapes:[]};function SVGTextLottieElement(t,e,n){this.textSpans=[],this.renderType="svg",this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement,ITextElement],SVGTextLottieElement),SVGTextLottieElement.prototype.createContent=function(){this.data.singleShape&&!this.globalData.fontManager.chars&&(this.textContainer=createNS("text"));},SVGTextLottieElement.prototype.buildTextContents=function(t){for(var e=0,n=t.length,i=[],o="";e<n;)t[e]==="\r"||t[e]===""?(i.push(o),o=""):o+=t[e],e+=1;return i.push(o),i;},SVGTextLottieElement.prototype.buildShapeData=function(t,e){if(t.shapes&&t.shapes.length){var n=t.shapes[0];if(n.it){var i=n.it[n.it.length-1];i.s&&(i.s.k[0]=e,i.s.k[1]=e);}}return t;},SVGTextLottieElement.prototype.buildNewText=function(){this.addDynamicProperty(this);var t,e,n=this.textProperty.currentData;this.renderedLetters=createSizedArray(n?n.l.length:0),n.fc?this.layerElement.setAttribute("fill",this.buildColor(n.fc)):this.layerElement.setAttribute("fill","rgba(0,0,0,0)"),n.sc&&(this.layerElement.setAttribute("stroke",this.buildColor(n.sc)),this.layerElement.setAttribute("stroke-width",n.sw)),this.layerElement.setAttribute("font-size",n.finalSize);var i=this.globalData.fontManager.getFontByName(n.f);if(i.fClass)this.layerElement.setAttribute("class",i.fClass);else{this.layerElement.setAttribute("font-family",i.fFamily);var o=n.fWeight,s=n.fStyle;this.layerElement.setAttribute("font-style",s),this.layerElement.setAttribute("font-weight",o);}this.layerElement.setAttribute("aria-label",n.t);var l=n.l||[],h=!!this.globalData.fontManager.chars;e=l.length;var p,u=this.mHelper,m="",b=this.data.singleShape,d=0,g=0,E=!0,P=n.tr*.001*n.finalSize;if(b&&!h&&!n.sz){var k=this.textContainer,v="start";switch(n.j){case 1:v="end";break;case 2:v="middle";break;default:v="start";break;}k.setAttribute("text-anchor",v),k.setAttribute("letter-spacing",P);var C=this.buildTextContents(n.finalText);for(e=C.length,g=n.ps?n.ps[1]+n.ascent:0,t=0;t<e;t+=1)p=this.textSpans[t].span||createNS("tspan"),p.textContent=C[t],p.setAttribute("x",0),p.setAttribute("y",g),p.style.display="inherit",k.appendChild(p),this.textSpans[t]||(this.textSpans[t]={span:null,glyph:null}),this.textSpans[t].span=p,g+=n.finalLineHeight;this.layerElement.appendChild(k);}else{var y=this.textSpans.length,S;for(t=0;t<e;t+=1){if(this.textSpans[t]||(this.textSpans[t]={span:null,childSpan:null,glyph:null}),!h||!b||t===0){if(p=y>t?this.textSpans[t].span:createNS(h?"g":"text"),y<=t){if(p.setAttribute("stroke-linecap","butt"),p.setAttribute("stroke-linejoin","round"),p.setAttribute("stroke-miterlimit","4"),this.textSpans[t].span=p,h){var O=createNS("g");p.appendChild(O),this.textSpans[t].childSpan=O;}this.textSpans[t].span=p,this.layerElement.appendChild(p);}p.style.display="inherit";}if(u.reset(),b&&(l[t].n&&(d=-P,g+=n.yOffset,g+=E?1:0,E=!1),this.applyTextPropertiesToMatrix(n,u,l[t].line,d,g),d+=l[t].l||0,d+=P),h){S=this.globalData.fontManager.getCharData(n.finalText[t],i.fStyle,this.globalData.fontManager.getFontByName(n.f).fFamily);var A;if(S.t===1)A=new SVGCompElement(S.data,this.globalData,this);else{var R=emptyShapeData;S.data&&S.data.shapes&&(R=this.buildShapeData(S.data,n.finalSize)),A=new SVGShapeElement(R,this.globalData,this);}if(this.textSpans[t].glyph){var N=this.textSpans[t].glyph;this.textSpans[t].childSpan.removeChild(N.layerElement),N.destroy();}this.textSpans[t].glyph=A,A._debug=!0,A.prepareFrame(0),A.renderFrame(),this.textSpans[t].childSpan.appendChild(A.layerElement),S.t===1&&this.textSpans[t].childSpan.setAttribute("transform","scale("+n.finalSize/100+","+n.finalSize/100+")");}else b&&p.setAttribute("transform","translate("+u.props[12]+","+u.props[13]+")"),p.textContent=l[t].val,p.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve");}b&&p&&p.setAttribute("d",m);}for(;t<this.textSpans.length;)this.textSpans[t].span.style.display="none",t+=1;this._sizeChanged=!0;},SVGTextLottieElement.prototype.sourceRectAtTime=function(){if(this.prepareFrame(this.comp.renderedFrame-this.data.st),this.renderInnerContent(),this._sizeChanged){this._sizeChanged=!1;var t=this.layerElement.getBBox();this.bbox={top:t.y,left:t.x,width:t.width,height:t.height};}return this.bbox;},SVGTextLottieElement.prototype.getValue=function(){var t,e=this.textSpans.length,n;for(this.renderedFrame=this.comp.renderedFrame,t=0;t<e;t+=1)n=this.textSpans[t].glyph,n&&(n.prepareFrame(this.comp.renderedFrame-this.data.st),n._mdf&&(this._mdf=!0));},SVGTextLottieElement.prototype.renderInnerContent=function(){if(this.validateText(),(!this.data.singleShape||this._mdf)&&(this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag),this.lettersChangedFlag||this.textAnimator.lettersChangedFlag)){this._sizeChanged=!0;var t,e,n=this.textAnimator.renderedLetters,i=this.textProperty.currentData.l;e=i.length;var o,s,l;for(t=0;t<e;t+=1)i[t].n||(o=n[t],s=this.textSpans[t].span,l=this.textSpans[t].glyph,l&&l.renderFrame(),o._mdf.m&&s.setAttribute("transform",o.m),o._mdf.o&&s.setAttribute("opacity",o.o),o._mdf.sw&&s.setAttribute("stroke-width",o.sw),o._mdf.sc&&s.setAttribute("stroke",o.sc),o._mdf.fc&&s.setAttribute("fill",o.fc));}};function ISolidElement(t,e,n){this.initElement(t,e,n);}extendPrototype([IImageElement],ISolidElement),ISolidElement.prototype.createContent=function(){var t=createNS("rect");t.setAttribute("width",this.data.sw),t.setAttribute("height",this.data.sh),t.setAttribute("fill",this.data.sc),this.layerElement.appendChild(t);};function NullElement(t,e,n){this.initFrame(),this.initBaseData(t,e,n),this.initFrame(),this.initTransform(t,e,n),this.initHierarchy();}NullElement.prototype.prepareFrame=function(t){this.prepareProperties(t,!0);},NullElement.prototype.renderFrame=function(){},NullElement.prototype.getBaseElement=function(){return null;},NullElement.prototype.destroy=function(){},NullElement.prototype.sourceRectAtTime=function(){},NullElement.prototype.hide=function(){},extendPrototype([BaseElement,TransformElement,HierarchyElement,FrameElement],NullElement);function SVGRendererBase(){}extendPrototype([BaseRenderer],SVGRendererBase),SVGRendererBase.prototype.createNull=function(t){return new NullElement(t,this.globalData,this);},SVGRendererBase.prototype.createShape=function(t){return new SVGShapeElement(t,this.globalData,this);},SVGRendererBase.prototype.createText=function(t){return new SVGTextLottieElement(t,this.globalData,this);},SVGRendererBase.prototype.createImage=function(t){return new IImageElement(t,this.globalData,this);},SVGRendererBase.prototype.createSolid=function(t){return new ISolidElement(t,this.globalData,this);},SVGRendererBase.prototype.configAnimation=function(t){this.svgElement.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.svgElement.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),this.renderConfig.viewBoxSize?this.svgElement.setAttribute("viewBox",this.renderConfig.viewBoxSize):this.svgElement.setAttribute("viewBox","0 0 "+t.w+" "+t.h),this.renderConfig.viewBoxOnly||(this.svgElement.setAttribute("width",t.w),this.svgElement.setAttribute("height",t.h),this.svgElement.style.width="100%",this.svgElement.style.height="100%",this.svgElement.style.transform="translate3d(0,0,0)",this.svgElement.style.contentVisibility=this.renderConfig.contentVisibility),this.renderConfig.width&&this.svgElement.setAttribute("width",this.renderConfig.width),this.renderConfig.height&&this.svgElement.setAttribute("height",this.renderConfig.height),this.renderConfig.className&&this.svgElement.setAttribute("class",this.renderConfig.className),this.renderConfig.id&&this.svgElement.setAttribute("id",this.renderConfig.id),this.renderConfig.focusable!==void 0&&this.svgElement.setAttribute("focusable",this.renderConfig.focusable),this.svgElement.setAttribute("preserveAspectRatio",this.renderConfig.preserveAspectRatio),this.animationItem.wrapper.appendChild(this.svgElement);var e=this.globalData.defs;this.setupGlobalData(t,e),this.globalData.progressiveLoad=this.renderConfig.progressiveLoad,this.data=t;var n=createNS("clipPath"),i=createNS("rect");i.setAttribute("width",t.w),i.setAttribute("height",t.h),i.setAttribute("x",0),i.setAttribute("y",0);var o=createElementID();n.setAttribute("id",o),n.appendChild(i),this.layerElement.setAttribute("clip-path","url("+getLocationHref()+"#"+o+")"),e.appendChild(n),this.layers=t.layers,this.elements=createSizedArray(t.layers.length);},SVGRendererBase.prototype.destroy=function(){this.animationItem.wrapper&&(this.animationItem.wrapper.innerText=""),this.layerElement=null,this.globalData.defs=null;var t,e=this.layers?this.layers.length:0;for(t=0;t<e;t+=1)this.elements[t]&&this.elements[t].destroy&&this.elements[t].destroy();this.elements.length=0,this.destroyed=!0,this.animationItem=null;},SVGRendererBase.prototype.updateContainerSize=function(){},SVGRendererBase.prototype.findIndexByInd=function(t){var e=0,n=this.layers.length;for(e=0;e<n;e+=1)if(this.layers[e].ind===t)return e;return-1;},SVGRendererBase.prototype.buildItem=function(t){var e=this.elements;if(!(e[t]||this.layers[t].ty===99)){e[t]=!0;var n=this.createItem(this.layers[t]);if(e[t]=n,getExpressionsPlugin()&&(this.layers[t].ty===0&&this.globalData.projectInterface.registerComposition(n),n.initExpressions()),this.appendElementInPos(n,t),this.layers[t].tt){var i="tp"in this.layers[t]?this.findIndexByInd(this.layers[t].tp):t-1;if(i===-1)return;if(!this.elements[i]||this.elements[i]===!0)this.buildItem(i),this.addPendingElement(n);else{var o=e[i],s=o.getMatte(this.layers[t].tt);n.setMatte(s);}}}},SVGRendererBase.prototype.checkPendingElements=function(){for(;this.pendingElements.length;){var t=this.pendingElements.pop();if(t.checkParenting(),t.data.tt)for(var e=0,n=this.elements.length;e<n;){if(this.elements[e]===t){var i="tp"in t.data?this.findIndexByInd(t.data.tp):e-1,o=this.elements[i],s=o.getMatte(this.layers[e].tt);t.setMatte(s);break;}e+=1;}}},SVGRendererBase.prototype.renderFrame=function(t){if(!(this.renderedFrame===t||this.destroyed)){t===null?t=this.renderedFrame:this.renderedFrame=t,this.globalData.frameNum=t,this.globalData.frameId+=1,this.globalData.projectInterface.currentFrame=t,this.globalData._mdf=!1;var e,n=this.layers.length;for(this.completeLayers||this.checkLayers(t),e=n-1;e>=0;e-=1)(this.completeLayers||this.elements[e])&&this.elements[e].prepareFrame(t-this.layers[e].st);if(this.globalData._mdf)for(e=0;e<n;e+=1)(this.completeLayers||this.elements[e])&&this.elements[e].renderFrame();}},SVGRendererBase.prototype.appendElementInPos=function(t,e){var n=t.getBaseElement();if(n){for(var i=0,o;i<e;)this.elements[i]&&this.elements[i]!==!0&&this.elements[i].getBaseElement()&&(o=this.elements[i].getBaseElement()),i+=1;o?this.layerElement.insertBefore(n,o):this.layerElement.appendChild(n);}},SVGRendererBase.prototype.hide=function(){this.layerElement.style.display="none";},SVGRendererBase.prototype.show=function(){this.layerElement.style.display="block";};function ICompElement(){}extendPrototype([BaseElement,TransformElement,HierarchyElement,FrameElement,RenderableDOMElement],ICompElement),ICompElement.prototype.initElement=function(t,e,n){this.initFrame(),this.initBaseData(t,e,n),this.initTransform(t,e,n),this.initRenderable(),this.initHierarchy(),this.initRendererElement(),this.createContainerElements(),this.createRenderableComponents(),(this.data.xt||!e.progressiveLoad)&&this.buildAllItems(),this.hide();},ICompElement.prototype.prepareFrame=function(t){if(this._mdf=!1,this.prepareRenderableFrame(t),this.prepareProperties(t,this.isInRange),!(!this.isInRange&&!this.data.xt)){if(this.tm._placeholder)this.renderedFrame=t/this.data.sr;else{var e=this.tm.v;e===this.data.op&&(e=this.data.op-1),this.renderedFrame=e;}var n,i=this.elements.length;for(this.completeLayers||this.checkLayers(this.renderedFrame),n=i-1;n>=0;n-=1)(this.completeLayers||this.elements[n])&&(this.elements[n].prepareFrame(this.renderedFrame-this.layers[n].st),this.elements[n]._mdf&&(this._mdf=!0));}},ICompElement.prototype.renderInnerContent=function(){var t,e=this.layers.length;for(t=0;t<e;t+=1)(this.completeLayers||this.elements[t])&&this.elements[t].renderFrame();},ICompElement.prototype.setElements=function(t){this.elements=t;},ICompElement.prototype.getElements=function(){return this.elements;},ICompElement.prototype.destroyElements=function(){var t,e=this.layers.length;for(t=0;t<e;t+=1)this.elements[t]&&this.elements[t].destroy();},ICompElement.prototype.destroy=function(){this.destroyElements(),this.destroyBaseElement();};function SVGCompElement(t,e,n){this.layers=t.layers,this.supports3d=!0,this.completeLayers=!1,this.pendingElements=[],this.elements=this.layers?createSizedArray(this.layers.length):[],this.initElement(t,e,n),this.tm=t.tm?PropertyFactory.getProp(this,t.tm,0,e.frameRate,this):{_placeholder:!0};}extendPrototype([SVGRendererBase,ICompElement,SVGBaseElement],SVGCompElement),SVGCompElement.prototype.createComp=function(t){return new SVGCompElement(t,this.globalData,this);};function SVGRenderer(t,e){this.animationItem=t,this.layers=null,this.renderedFrame=-1,this.svgElement=createNS("svg");var n="";if(e&&e.title){var i=createNS("title"),o=createElementID();i.setAttribute("id",o),i.textContent=e.title,this.svgElement.appendChild(i),n+=o;}if(e&&e.description){var s=createNS("desc"),l=createElementID();s.setAttribute("id",l),s.textContent=e.description,this.svgElement.appendChild(s),n+=" "+l;}n&&this.svgElement.setAttribute("aria-labelledby",n);var h=createNS("defs");this.svgElement.appendChild(h);var p=createNS("g");this.svgElement.appendChild(p),this.layerElement=p,this.renderConfig={preserveAspectRatio:e&&e.preserveAspectRatio||"xMidYMid meet",imagePreserveAspectRatio:e&&e.imagePreserveAspectRatio||"xMidYMid slice",contentVisibility:e&&e.contentVisibility||"visible",progressiveLoad:e&&e.progressiveLoad||!1,hideOnTransparent:!(e&&e.hideOnTransparent===!1),viewBoxOnly:e&&e.viewBoxOnly||!1,viewBoxSize:e&&e.viewBoxSize||!1,className:e&&e.className||"",id:e&&e.id||"",focusable:e&&e.focusable,filterSize:{width:e&&e.filterSize&&e.filterSize.width||"100%",height:e&&e.filterSize&&e.filterSize.height||"100%",x:e&&e.filterSize&&e.filterSize.x||"0%",y:e&&e.filterSize&&e.filterSize.y||"0%"},width:e&&e.width,height:e&&e.height,runExpressions:!e||e.runExpressions===void 0||e.runExpressions},this.globalData={_mdf:!1,frameNum:-1,defs:h,renderConfig:this.renderConfig},this.elements=[],this.pendingElements=[],this.destroyed=!1,this.rendererType="svg";}extendPrototype([SVGRendererBase],SVGRenderer),SVGRenderer.prototype.createComp=function(t){return new SVGCompElement(t,this.globalData,this);};function ShapeTransformManager(){this.sequences={},this.sequenceList=[],this.transform_key_count=0;}ShapeTransformManager.prototype={addTransformSequence:function(e){var n,i=e.length,o="_";for(n=0;n<i;n+=1)o+=e[n].transform.key+"_";var s=this.sequences[o];return s||(s={transforms:[].concat(e),finalTransform:new Matrix(),_mdf:!1},this.sequences[o]=s,this.sequenceList.push(s)),s;},processSequence:function(e,n){for(var i=0,o=e.transforms.length,s=n;i<o&&!n;){if(e.transforms[i].transform.mProps._mdf){s=!0;break;}i+=1;}if(s)for(e.finalTransform.reset(),i=o-1;i>=0;i-=1)e.finalTransform.multiply(e.transforms[i].transform.mProps.v);e._mdf=s;},processSequences:function(e){var n,i=this.sequenceList.length;for(n=0;n<i;n+=1)this.processSequence(this.sequenceList[n],e);},getNewKey:function(){return this.transform_key_count+=1,"_"+this.transform_key_count;}};var lumaLoader=function(){var e="__lottie_element_luma_buffer",n=null,i=null,o=null;function s(){var p=createNS("svg"),u=createNS("filter"),m=createNS("feColorMatrix");return u.setAttribute("id",e),m.setAttribute("type","matrix"),m.setAttribute("color-interpolation-filters","sRGB"),m.setAttribute("values","0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0"),u.appendChild(m),p.appendChild(u),p.setAttribute("id",e+"_svg"),featureSupport.svgLumaHidden&&(p.style.display="none"),p;}function l(){n||(o=s(),document.body.appendChild(o),n=createTag("canvas"),i=n.getContext("2d"),i.filter="url(#"+e+")",i.fillStyle="rgba(0,0,0,0)",i.fillRect(0,0,1,1));}function h(p){return n||l(),n.width=p.width,n.height=p.height,i.filter="url(#"+e+")",n;}return{load:l,get:h};};function createCanvas(t,e){if(featureSupport.offscreenCanvas)return new OffscreenCanvas(t,e);var n=createTag("canvas");return n.width=t,n.height=e,n;}var assetLoader=function(){return{loadLumaCanvas:lumaLoader.load,getLumaCanvas:lumaLoader.get,createCanvas};}(),registeredEffects={};function CVEffects(t){var e,n=t.data.ef?t.data.ef.length:0;this.filters=[];var i;for(e=0;e<n;e+=1){i=null;var o=t.data.ef[e].ty;if(registeredEffects[o]){var s=registeredEffects[o].effect;i=new s(t.effectsManager.effectElements[e],t);}i&&this.filters.push(i);}this.filters.length&&t.addRenderableComponent(this);}CVEffects.prototype.renderFrame=function(t){var e,n=this.filters.length;for(e=0;e<n;e+=1)this.filters[e].renderFrame(t);},CVEffects.prototype.getEffects=function(t){var e,n=this.filters.length,i=[];for(e=0;e<n;e+=1)this.filters[e].type===t&&i.push(this.filters[e]);return i;};function registerEffect(t,e){registeredEffects[t]={effect:e};}function CVMaskElement(t,e){this.data=t,this.element=e,this.masksProperties=this.data.masksProperties||[],this.viewData=createSizedArray(this.masksProperties.length);var n,i=this.masksProperties.length,o=!1;for(n=0;n<i;n+=1)this.masksProperties[n].mode!=="n"&&(o=!0),this.viewData[n]=ShapePropertyFactory.getShapeProp(this.element,this.masksProperties[n],3);this.hasMasks=o,o&&this.element.addRenderableComponent(this);}CVMaskElement.prototype.renderFrame=function(){if(this.hasMasks){var t=this.element.finalTransform.mat,e=this.element.canvasContext,n,i=this.masksProperties.length,o,s,l;for(e.beginPath(),n=0;n<i;n+=1)if(this.masksProperties[n].mode!=="n"){this.masksProperties[n].inv&&(e.moveTo(0,0),e.lineTo(this.element.globalData.compSize.w,0),e.lineTo(this.element.globalData.compSize.w,this.element.globalData.compSize.h),e.lineTo(0,this.element.globalData.compSize.h),e.lineTo(0,0)),l=this.viewData[n].v,o=t.applyToPointArray(l.v[0][0],l.v[0][1],0),e.moveTo(o[0],o[1]);var h,p=l._length;for(h=1;h<p;h+=1)s=t.applyToTriplePoints(l.o[h-1],l.i[h],l.v[h]),e.bezierCurveTo(s[0],s[1],s[2],s[3],s[4],s[5]);s=t.applyToTriplePoints(l.o[h-1],l.i[0],l.v[0]),e.bezierCurveTo(s[0],s[1],s[2],s[3],s[4],s[5]);}this.element.globalData.renderer.save(!0),e.clip();}},CVMaskElement.prototype.getMaskProperty=MaskElement.prototype.getMaskProperty,CVMaskElement.prototype.destroy=function(){this.element=null;};function CVBaseElement(){}var operationsMap={1:"source-in",2:"source-out",3:"source-in",4:"source-out"};CVBaseElement.prototype={createElements:function(){},initRendererElement:function(){},createContainerElements:function(){if(this.data.tt>=1){this.buffers=[];var e=this.globalData.canvasContext,n=assetLoader.createCanvas(e.canvas.width,e.canvas.height);this.buffers.push(n);var i=assetLoader.createCanvas(e.canvas.width,e.canvas.height);this.buffers.push(i),this.data.tt>=3&&!document._isProxy&&assetLoader.loadLumaCanvas();}this.canvasContext=this.globalData.canvasContext,this.transformCanvas=this.globalData.transformCanvas,this.renderableEffectsManager=new CVEffects(this),this.searchEffectTransforms();},createContent:function(){},setBlendMode:function(){var e=this.globalData;if(e.blendMode!==this.data.bm){e.blendMode=this.data.bm;var n=getBlendMode(this.data.bm);e.canvasContext.globalCompositeOperation=n;}},createRenderableComponents:function(){this.maskManager=new CVMaskElement(this.data,this),this.transformEffects=this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT);},hideElement:function(){!this.hidden&&(!this.isInRange||this.isTransparent)&&(this.hidden=!0);},showElement:function(){this.isInRange&&!this.isTransparent&&(this.hidden=!1,this._isFirstFrame=!0,this.maskManager._isFirstFrame=!0);},clearCanvas:function(e){e.clearRect(this.transformCanvas.tx,this.transformCanvas.ty,this.transformCanvas.w*this.transformCanvas.sx,this.transformCanvas.h*this.transformCanvas.sy);},prepareLayer:function(){if(this.data.tt>=1){var e=this.buffers[0],n=e.getContext("2d");this.clearCanvas(n),n.drawImage(this.canvasContext.canvas,0,0),this.currentTransform=this.canvasContext.getTransform(),this.canvasContext.setTransform(1,0,0,1,0,0),this.clearCanvas(this.canvasContext),this.canvasContext.setTransform(this.currentTransform);}},exitLayer:function(){if(this.data.tt>=1){var e=this.buffers[1],n=e.getContext("2d");this.clearCanvas(n),n.drawImage(this.canvasContext.canvas,0,0),this.canvasContext.setTransform(1,0,0,1,0,0),this.clearCanvas(this.canvasContext),this.canvasContext.setTransform(this.currentTransform);var i=this.comp.getElementById("tp"in this.data?this.data.tp:this.data.ind-1);if(i.renderFrame(!0),this.canvasContext.setTransform(1,0,0,1,0,0),this.data.tt>=3&&!document._isProxy){var o=assetLoader.getLumaCanvas(this.canvasContext.canvas),s=o.getContext("2d");s.drawImage(this.canvasContext.canvas,0,0),this.clearCanvas(this.canvasContext),this.canvasContext.drawImage(o,0,0);}this.canvasContext.globalCompositeOperation=operationsMap[this.data.tt],this.canvasContext.drawImage(e,0,0),this.canvasContext.globalCompositeOperation="destination-over",this.canvasContext.drawImage(this.buffers[0],0,0),this.canvasContext.setTransform(this.currentTransform),this.canvasContext.globalCompositeOperation="source-over";}},renderFrame:function(e){if(!(this.hidden||this.data.hd)&&!(this.data.td===1&&!e)){this.renderTransform(),this.renderRenderable(),this.renderLocalTransform(),this.setBlendMode();var n=this.data.ty===0;this.prepareLayer(),this.globalData.renderer.save(n),this.globalData.renderer.ctxTransform(this.finalTransform.localMat.props),this.globalData.renderer.ctxOpacity(this.finalTransform.localOpacity),this.renderInnerContent(),this.globalData.renderer.restore(n),this.exitLayer(),this.maskManager.hasMasks&&this.globalData.renderer.restore(!0),this._isFirstFrame&&(this._isFirstFrame=!1);}},destroy:function(){this.canvasContext=null,this.data=null,this.globalData=null,this.maskManager.destroy();},mHelper:new Matrix()},CVBaseElement.prototype.hide=CVBaseElement.prototype.hideElement,CVBaseElement.prototype.show=CVBaseElement.prototype.showElement;function CVShapeData(t,e,n,i){this.styledShapes=[],this.tr=[0,0,0,0,0,0];var o=4;e.ty==="rc"?o=5:e.ty==="el"?o=6:e.ty==="sr"&&(o=7),this.sh=ShapePropertyFactory.getShapeProp(t,e,o,t);var s,l=n.length,h;for(s=0;s<l;s+=1)n[s].closed||(h={transforms:i.addTransformSequence(n[s].transforms),trNodes:[]},this.styledShapes.push(h),n[s].elements.push(h));}CVShapeData.prototype.setAsAnimated=SVGShapeData.prototype.setAsAnimated;function CVShapeElement(t,e,n){this.shapes=[],this.shapesData=t.shapes,this.stylesList=[],this.itemsData=[],this.prevViewData=[],this.shapeModifiers=[],this.processedElements=[],this.transformsManager=new ShapeTransformManager(),this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,CVBaseElement,IShapeElement,HierarchyElement,FrameElement,RenderableElement],CVShapeElement),CVShapeElement.prototype.initElement=RenderableDOMElement.prototype.initElement,CVShapeElement.prototype.transformHelper={opacity:1,_opMdf:!1},CVShapeElement.prototype.dashResetter=[],CVShapeElement.prototype.createContent=function(){this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,!0,[]);},CVShapeElement.prototype.createStyleElement=function(t,e){var n={data:t,type:t.ty,preTransforms:this.transformsManager.addTransformSequence(e),transforms:[],elements:[],closed:t.hd===!0},i={};if(t.ty==="fl"||t.ty==="st"?(i.c=PropertyFactory.getProp(this,t.c,1,255,this),i.c.k||(n.co="rgb("+bmFloor(i.c.v[0])+","+bmFloor(i.c.v[1])+","+bmFloor(i.c.v[2])+")")):(t.ty==="gf"||t.ty==="gs")&&(i.s=PropertyFactory.getProp(this,t.s,1,null,this),i.e=PropertyFactory.getProp(this,t.e,1,null,this),i.h=PropertyFactory.getProp(this,t.h||{k:0},0,.01,this),i.a=PropertyFactory.getProp(this,t.a||{k:0},0,degToRads,this),i.g=new GradientProperty(this,t.g,this)),i.o=PropertyFactory.getProp(this,t.o,0,.01,this),t.ty==="st"||t.ty==="gs"){if(n.lc=lineCapEnum[t.lc||2],n.lj=lineJoinEnum[t.lj||2],t.lj==1&&(n.ml=t.ml),i.w=PropertyFactory.getProp(this,t.w,0,null,this),i.w.k||(n.wi=i.w.v),t.d){var o=new DashProperty(this,t.d,"canvas",this);i.d=o,i.d.k||(n.da=i.d.dashArray,n.do=i.d.dashoffset[0]);}}else n.r=t.r===2?"evenodd":"nonzero";return this.stylesList.push(n),i.style=n,i;},CVShapeElement.prototype.createGroupElement=function(){var t={it:[],prevViewData:[]};return t;},CVShapeElement.prototype.createTransformElement=function(t){var e={transform:{opacity:1,_opMdf:!1,key:this.transformsManager.getNewKey(),op:PropertyFactory.getProp(this,t.o,0,.01,this),mProps:TransformPropertyFactory.getTransformProperty(this,t,this)}};return e;},CVShapeElement.prototype.createShapeElement=function(t){var e=new CVShapeData(this,t,this.stylesList,this.transformsManager);return this.shapes.push(e),this.addShapeToModifiers(e),e;},CVShapeElement.prototype.reloadShapes=function(){this._isFirstFrame=!0;var t,e=this.itemsData.length;for(t=0;t<e;t+=1)this.prevViewData[t]=this.itemsData[t];for(this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,!0,[]),e=this.dynamicProperties.length,t=0;t<e;t+=1)this.dynamicProperties[t].getValue();this.renderModifiers(),this.transformsManager.processSequences(this._isFirstFrame);},CVShapeElement.prototype.addTransformToStyleList=function(t){var e,n=this.stylesList.length;for(e=0;e<n;e+=1)this.stylesList[e].closed||this.stylesList[e].transforms.push(t);},CVShapeElement.prototype.removeTransformFromStyleList=function(){var t,e=this.stylesList.length;for(t=0;t<e;t+=1)this.stylesList[t].closed||this.stylesList[t].transforms.pop();},CVShapeElement.prototype.closeStyles=function(t){var e,n=t.length;for(e=0;e<n;e+=1)t[e].closed=!0;},CVShapeElement.prototype.searchShapes=function(t,e,n,i,o){var s,l=t.length-1,h,p,u=[],m=[],b,d,g,E=[].concat(o);for(s=l;s>=0;s-=1){if(b=this.searchProcessedElement(t[s]),b?e[s]=n[b-1]:t[s]._shouldRender=i,t[s].ty==="fl"||t[s].ty==="st"||t[s].ty==="gf"||t[s].ty==="gs")b?e[s].style.closed=!1:e[s]=this.createStyleElement(t[s],E),u.push(e[s].style);else if(t[s].ty==="gr"){if(!b)e[s]=this.createGroupElement(t[s]);else for(p=e[s].it.length,h=0;h<p;h+=1)e[s].prevViewData[h]=e[s].it[h];this.searchShapes(t[s].it,e[s].it,e[s].prevViewData,i,E);}else t[s].ty==="tr"?(b||(g=this.createTransformElement(t[s]),e[s]=g),E.push(e[s]),this.addTransformToStyleList(e[s])):t[s].ty==="sh"||t[s].ty==="rc"||t[s].ty==="el"||t[s].ty==="sr"?b||(e[s]=this.createShapeElement(t[s])):t[s].ty==="tm"||t[s].ty==="rd"||t[s].ty==="pb"||t[s].ty==="zz"||t[s].ty==="op"?(b?(d=e[s],d.closed=!1):(d=ShapeModifiers.getModifier(t[s].ty),d.init(this,t[s]),e[s]=d,this.shapeModifiers.push(d)),m.push(d)):t[s].ty==="rp"&&(b?(d=e[s],d.closed=!0):(d=ShapeModifiers.getModifier(t[s].ty),e[s]=d,d.init(this,t,s,e),this.shapeModifiers.push(d),i=!1),m.push(d));this.addProcessedElement(t[s],s+1);}for(this.removeTransformFromStyleList(),this.closeStyles(u),l=m.length,s=0;s<l;s+=1)m[s].closed=!0;},CVShapeElement.prototype.renderInnerContent=function(){this.transformHelper.opacity=1,this.transformHelper._opMdf=!1,this.renderModifiers(),this.transformsManager.processSequences(this._isFirstFrame),this.renderShape(this.transformHelper,this.shapesData,this.itemsData,!0);},CVShapeElement.prototype.renderShapeTransform=function(t,e){(t._opMdf||e.op._mdf||this._isFirstFrame)&&(e.opacity=t.opacity,e.opacity*=e.op.v,e._opMdf=!0);},CVShapeElement.prototype.drawLayer=function(){var t,e=this.stylesList.length,n,i,o,s,l,h,p=this.globalData.renderer,u=this.globalData.canvasContext,m,b;for(t=0;t<e;t+=1)if(b=this.stylesList[t],m=b.type,!((m==="st"||m==="gs")&&b.wi===0||!b.data._shouldRender||b.coOp===0||this.globalData.currentGlobalAlpha===0)){for(p.save(),l=b.elements,m==="st"||m==="gs"?(p.ctxStrokeStyle(m==="st"?b.co:b.grd),p.ctxLineWidth(b.wi),p.ctxLineCap(b.lc),p.ctxLineJoin(b.lj),p.ctxMiterLimit(b.ml||0)):p.ctxFillStyle(m==="fl"?b.co:b.grd),p.ctxOpacity(b.coOp),m!=="st"&&m!=="gs"&&u.beginPath(),p.ctxTransform(b.preTransforms.finalTransform.props),i=l.length,n=0;n<i;n+=1){for((m==="st"||m==="gs")&&(u.beginPath(),b.da&&(u.setLineDash(b.da),u.lineDashOffset=b.do)),h=l[n].trNodes,s=h.length,o=0;o<s;o+=1)h[o].t==="m"?u.moveTo(h[o].p[0],h[o].p[1]):h[o].t==="c"?u.bezierCurveTo(h[o].pts[0],h[o].pts[1],h[o].pts[2],h[o].pts[3],h[o].pts[4],h[o].pts[5]):u.closePath();(m==="st"||m==="gs")&&(p.ctxStroke(),b.da&&u.setLineDash(this.dashResetter));}m!=="st"&&m!=="gs"&&this.globalData.renderer.ctxFill(b.r),p.restore();}},CVShapeElement.prototype.renderShape=function(t,e,n,i){var o,s=e.length-1,l;for(l=t,o=s;o>=0;o-=1)e[o].ty==="tr"?(l=n[o].transform,this.renderShapeTransform(t,l)):e[o].ty==="sh"||e[o].ty==="el"||e[o].ty==="rc"||e[o].ty==="sr"?this.renderPath(e[o],n[o]):e[o].ty==="fl"?this.renderFill(e[o],n[o],l):e[o].ty==="st"?this.renderStroke(e[o],n[o],l):e[o].ty==="gf"||e[o].ty==="gs"?this.renderGradientFill(e[o],n[o],l):e[o].ty==="gr"?this.renderShape(l,e[o].it,n[o].it):e[o].ty;i&&this.drawLayer();},CVShapeElement.prototype.renderStyledShape=function(t,e){if(this._isFirstFrame||e._mdf||t.transforms._mdf){var n=t.trNodes,i=e.paths,o,s,l,h=i._length;n.length=0;var p=t.transforms.finalTransform;for(l=0;l<h;l+=1){var u=i.shapes[l];if(u&&u.v){for(s=u._length,o=1;o<s;o+=1)o===1&&n.push({t:"m",p:p.applyToPointArray(u.v[0][0],u.v[0][1],0)}),n.push({t:"c",pts:p.applyToTriplePoints(u.o[o-1],u.i[o],u.v[o])});s===1&&n.push({t:"m",p:p.applyToPointArray(u.v[0][0],u.v[0][1],0)}),u.c&&s&&(n.push({t:"c",pts:p.applyToTriplePoints(u.o[o-1],u.i[0],u.v[0])}),n.push({t:"z"}));}}t.trNodes=n;}},CVShapeElement.prototype.renderPath=function(t,e){if(t.hd!==!0&&t._shouldRender){var n,i=e.styledShapes.length;for(n=0;n<i;n+=1)this.renderStyledShape(e.styledShapes[n],e.sh);}},CVShapeElement.prototype.renderFill=function(t,e,n){var i=e.style;(e.c._mdf||this._isFirstFrame)&&(i.co="rgb("+bmFloor(e.c.v[0])+","+bmFloor(e.c.v[1])+","+bmFloor(e.c.v[2])+")"),(e.o._mdf||n._opMdf||this._isFirstFrame)&&(i.coOp=e.o.v*n.opacity);},CVShapeElement.prototype.renderGradientFill=function(t,e,n){var i=e.style,o;if(!i.grd||e.g._mdf||e.s._mdf||e.e._mdf||t.t!==1&&(e.h._mdf||e.a._mdf)){var s=this.globalData.canvasContext,l=e.s.v,h=e.e.v;if(t.t===1)o=s.createLinearGradient(l[0],l[1],h[0],h[1]);else{var p=Math.sqrt(Math.pow(l[0]-h[0],2)+Math.pow(l[1]-h[1],2)),u=Math.atan2(h[1]-l[1],h[0]-l[0]),m=e.h.v;m>=1?m=.99:m<=-1&&(m=-.99);var b=p*m,d=Math.cos(u+e.a.v)*b+l[0],g=Math.sin(u+e.a.v)*b+l[1];o=s.createRadialGradient(d,g,0,l[0],l[1],p);}var E,P=t.g.p,k=e.g.c,v=1;for(E=0;E<P;E+=1)e.g._hasOpacity&&e.g._collapsable&&(v=e.g.o[E*2+1]),o.addColorStop(k[E*4]/100,"rgba("+k[E*4+1]+","+k[E*4+2]+","+k[E*4+3]+","+v+")");i.grd=o;}i.coOp=e.o.v*n.opacity;},CVShapeElement.prototype.renderStroke=function(t,e,n){var i=e.style,o=e.d;o&&(o._mdf||this._isFirstFrame)&&(i.da=o.dashArray,i.do=o.dashoffset[0]),(e.c._mdf||this._isFirstFrame)&&(i.co="rgb("+bmFloor(e.c.v[0])+","+bmFloor(e.c.v[1])+","+bmFloor(e.c.v[2])+")"),(e.o._mdf||n._opMdf||this._isFirstFrame)&&(i.coOp=e.o.v*n.opacity),(e.w._mdf||this._isFirstFrame)&&(i.wi=e.w.v);},CVShapeElement.prototype.destroy=function(){this.shapesData=null,this.globalData=null,this.canvasContext=null,this.stylesList.length=0,this.itemsData.length=0;};function CVTextElement(t,e,n){this.textSpans=[],this.yOffset=0,this.fillColorAnim=!1,this.strokeColorAnim=!1,this.strokeWidthAnim=!1,this.stroke=!1,this.fill=!1,this.justifyOffset=0,this.currentRender=null,this.renderType="canvas",this.values={fill:"rgba(0,0,0,0)",stroke:"rgba(0,0,0,0)",sWidth:0,fValue:""},this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,CVBaseElement,HierarchyElement,FrameElement,RenderableElement,ITextElement],CVTextElement),CVTextElement.prototype.tHelper=createTag("canvas").getContext("2d"),CVTextElement.prototype.buildNewText=function(){var t=this.textProperty.currentData;this.renderedLetters=createSizedArray(t.l?t.l.length:0);var e=!1;t.fc?(e=!0,this.values.fill=this.buildColor(t.fc)):this.values.fill="rgba(0,0,0,0)",this.fill=e;var n=!1;t.sc&&(n=!0,this.values.stroke=this.buildColor(t.sc),this.values.sWidth=t.sw);var i=this.globalData.fontManager.getFontByName(t.f),o,s,l=t.l,h=this.mHelper;this.stroke=n,this.values.fValue=t.finalSize+"px "+this.globalData.fontManager.getFontByName(t.f).fFamily,s=t.finalText.length;var p,u,m,b,d,g,E,P,k,v,C=this.data.singleShape,y=t.tr*.001*t.finalSize,S=0,O=0,A=!0,R=0;for(o=0;o<s;o+=1){p=this.globalData.fontManager.getCharData(t.finalText[o],i.fStyle,this.globalData.fontManager.getFontByName(t.f).fFamily),u=p&&p.data||{},h.reset(),C&&l[o].n&&(S=-y,O+=t.yOffset,O+=A?1:0,A=!1),d=u.shapes?u.shapes[0].it:[],E=d.length,h.scale(t.finalSize/100,t.finalSize/100),C&&this.applyTextPropertiesToMatrix(t,h,l[o].line,S,O),k=createSizedArray(E-1);var N=0;for(g=0;g<E;g+=1)if(d[g].ty==="sh"){for(b=d[g].ks.k.i.length,P=d[g].ks.k,v=[],m=1;m<b;m+=1)m===1&&v.push(h.applyToX(P.v[0][0],P.v[0][1],0),h.applyToY(P.v[0][0],P.v[0][1],0)),v.push(h.applyToX(P.o[m-1][0],P.o[m-1][1],0),h.applyToY(P.o[m-1][0],P.o[m-1][1],0),h.applyToX(P.i[m][0],P.i[m][1],0),h.applyToY(P.i[m][0],P.i[m][1],0),h.applyToX(P.v[m][0],P.v[m][1],0),h.applyToY(P.v[m][0],P.v[m][1],0));v.push(h.applyToX(P.o[m-1][0],P.o[m-1][1],0),h.applyToY(P.o[m-1][0],P.o[m-1][1],0),h.applyToX(P.i[0][0],P.i[0][1],0),h.applyToY(P.i[0][0],P.i[0][1],0),h.applyToX(P.v[0][0],P.v[0][1],0),h.applyToY(P.v[0][0],P.v[0][1],0)),k[N]=v,N+=1;}C&&(S+=l[o].l,S+=y),this.textSpans[R]?this.textSpans[R].elem=k:this.textSpans[R]={elem:k},R+=1;}},CVTextElement.prototype.renderInnerContent=function(){this.validateText();var t=this.canvasContext;t.font=this.values.fValue,this.globalData.renderer.ctxLineCap("butt"),this.globalData.renderer.ctxLineJoin("miter"),this.globalData.renderer.ctxMiterLimit(4),this.data.singleShape||this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag);var e,n,i,o,s,l,h=this.textAnimator.renderedLetters,p=this.textProperty.currentData.l;n=p.length;var u,m=null,b=null,d=null,g,E,P=this.globalData.renderer;for(e=0;e<n;e+=1)if(!p[e].n){if(u=h[e],u&&(P.save(),P.ctxTransform(u.p),P.ctxOpacity(u.o)),this.fill){for(u&&u.fc?m!==u.fc&&(P.ctxFillStyle(u.fc),m=u.fc):m!==this.values.fill&&(m=this.values.fill,P.ctxFillStyle(this.values.fill)),g=this.textSpans[e].elem,o=g.length,this.globalData.canvasContext.beginPath(),i=0;i<o;i+=1)for(E=g[i],l=E.length,this.globalData.canvasContext.moveTo(E[0],E[1]),s=2;s<l;s+=6)this.globalData.canvasContext.bezierCurveTo(E[s],E[s+1],E[s+2],E[s+3],E[s+4],E[s+5]);this.globalData.canvasContext.closePath(),P.ctxFill();}if(this.stroke){for(u&&u.sw?d!==u.sw&&(d=u.sw,P.ctxLineWidth(u.sw)):d!==this.values.sWidth&&(d=this.values.sWidth,P.ctxLineWidth(this.values.sWidth)),u&&u.sc?b!==u.sc&&(b=u.sc,P.ctxStrokeStyle(u.sc)):b!==this.values.stroke&&(b=this.values.stroke,P.ctxStrokeStyle(this.values.stroke)),g=this.textSpans[e].elem,o=g.length,this.globalData.canvasContext.beginPath(),i=0;i<o;i+=1)for(E=g[i],l=E.length,this.globalData.canvasContext.moveTo(E[0],E[1]),s=2;s<l;s+=6)this.globalData.canvasContext.bezierCurveTo(E[s],E[s+1],E[s+2],E[s+3],E[s+4],E[s+5]);this.globalData.canvasContext.closePath(),P.ctxStroke();}u&&this.globalData.renderer.restore();}};function CVImageElement(t,e,n){this.assetData=e.getAssetData(t.refId),this.img=e.imageLoader.getAsset(this.assetData),this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,CVBaseElement,HierarchyElement,FrameElement,RenderableElement],CVImageElement),CVImageElement.prototype.initElement=SVGShapeElement.prototype.initElement,CVImageElement.prototype.prepareFrame=IImageElement.prototype.prepareFrame,CVImageElement.prototype.createContent=function(){if(this.img.width&&(this.assetData.w!==this.img.width||this.assetData.h!==this.img.height)){var t=createTag("canvas");t.width=this.assetData.w,t.height=this.assetData.h;var e=t.getContext("2d"),n=this.img.width,i=this.img.height,o=n/i,s=this.assetData.w/this.assetData.h,l,h,p=this.assetData.pr||this.globalData.renderConfig.imagePreserveAspectRatio;o>s&&p==="xMidYMid slice"||o<s&&p!=="xMidYMid slice"?(h=i,l=h*s):(l=n,h=l/s),e.drawImage(this.img,(n-l)/2,(i-h)/2,l,h,0,0,this.assetData.w,this.assetData.h),this.img=t;}},CVImageElement.prototype.renderInnerContent=function(){this.canvasContext.drawImage(this.img,0,0);},CVImageElement.prototype.destroy=function(){this.img=null;};function CVSolidElement(t,e,n){this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,CVBaseElement,HierarchyElement,FrameElement,RenderableElement],CVSolidElement),CVSolidElement.prototype.initElement=SVGShapeElement.prototype.initElement,CVSolidElement.prototype.prepareFrame=IImageElement.prototype.prepareFrame,CVSolidElement.prototype.renderInnerContent=function(){this.globalData.renderer.ctxFillStyle(this.data.sc),this.globalData.renderer.ctxFillRect(0,0,this.data.sw,this.data.sh);};function CanvasRendererBase(){}extendPrototype([BaseRenderer],CanvasRendererBase),CanvasRendererBase.prototype.createShape=function(t){return new CVShapeElement(t,this.globalData,this);},CanvasRendererBase.prototype.createText=function(t){return new CVTextElement(t,this.globalData,this);},CanvasRendererBase.prototype.createImage=function(t){return new CVImageElement(t,this.globalData,this);},CanvasRendererBase.prototype.createSolid=function(t){return new CVSolidElement(t,this.globalData,this);},CanvasRendererBase.prototype.createNull=SVGRenderer.prototype.createNull,CanvasRendererBase.prototype.ctxTransform=function(t){t[0]===1&&t[1]===0&&t[4]===0&&t[5]===1&&t[12]===0&&t[13]===0||this.canvasContext.transform(t[0],t[1],t[4],t[5],t[12],t[13]);},CanvasRendererBase.prototype.ctxOpacity=function(t){this.canvasContext.globalAlpha*=t<0?0:t;},CanvasRendererBase.prototype.ctxFillStyle=function(t){this.canvasContext.fillStyle=t;},CanvasRendererBase.prototype.ctxStrokeStyle=function(t){this.canvasContext.strokeStyle=t;},CanvasRendererBase.prototype.ctxLineWidth=function(t){this.canvasContext.lineWidth=t;},CanvasRendererBase.prototype.ctxLineCap=function(t){this.canvasContext.lineCap=t;},CanvasRendererBase.prototype.ctxLineJoin=function(t){this.canvasContext.lineJoin=t;},CanvasRendererBase.prototype.ctxMiterLimit=function(t){this.canvasContext.miterLimit=t;},CanvasRendererBase.prototype.ctxFill=function(t){this.canvasContext.fill(t);},CanvasRendererBase.prototype.ctxFillRect=function(t,e,n,i){this.canvasContext.fillRect(t,e,n,i);},CanvasRendererBase.prototype.ctxStroke=function(){this.canvasContext.stroke();},CanvasRendererBase.prototype.reset=function(){if(!this.renderConfig.clearCanvas){this.canvasContext.restore();return;}this.contextData.reset();},CanvasRendererBase.prototype.save=function(){this.canvasContext.save();},CanvasRendererBase.prototype.restore=function(t){if(!this.renderConfig.clearCanvas){this.canvasContext.restore();return;}t&&(this.globalData.blendMode="source-over"),this.contextData.restore(t);},CanvasRendererBase.prototype.configAnimation=function(t){if(this.animationItem.wrapper){this.animationItem.container=createTag("canvas");var e=this.animationItem.container.style;e.width="100%",e.height="100%";var n="0px 0px 0px";e.transformOrigin=n,e.mozTransformOrigin=n,e.webkitTransformOrigin=n,e["-webkit-transform"]=n,e.contentVisibility=this.renderConfig.contentVisibility,this.animationItem.wrapper.appendChild(this.animationItem.container),this.canvasContext=this.animationItem.container.getContext("2d"),this.renderConfig.className&&this.animationItem.container.setAttribute("class",this.renderConfig.className),this.renderConfig.id&&this.animationItem.container.setAttribute("id",this.renderConfig.id);}else this.canvasContext=this.renderConfig.context;this.contextData.setContext(this.canvasContext),this.data=t,this.layers=t.layers,this.transformCanvas={w:t.w,h:t.h,sx:0,sy:0,tx:0,ty:0},this.setupGlobalData(t,document.body),this.globalData.canvasContext=this.canvasContext,this.globalData.renderer=this,this.globalData.isDashed=!1,this.globalData.progressiveLoad=this.renderConfig.progressiveLoad,this.globalData.transformCanvas=this.transformCanvas,this.elements=createSizedArray(t.layers.length),this.updateContainerSize();},CanvasRendererBase.prototype.updateContainerSize=function(t,e){this.reset();var n,i;t?(n=t,i=e,this.canvasContext.canvas.width=n,this.canvasContext.canvas.height=i):(this.animationItem.wrapper&&this.animationItem.container?(n=this.animationItem.wrapper.offsetWidth,i=this.animationItem.wrapper.offsetHeight):(n=this.canvasContext.canvas.width,i=this.canvasContext.canvas.height),this.canvasContext.canvas.width=n*this.renderConfig.dpr,this.canvasContext.canvas.height=i*this.renderConfig.dpr);var o,s;if(this.renderConfig.preserveAspectRatio.indexOf("meet")!==-1||this.renderConfig.preserveAspectRatio.indexOf("slice")!==-1){var l=this.renderConfig.preserveAspectRatio.split(" "),h=l[1]||"meet",p=l[0]||"xMidYMid",u=p.substr(0,4),m=p.substr(4);o=n/i,s=this.transformCanvas.w/this.transformCanvas.h,s>o&&h==="meet"||s<o&&h==="slice"?(this.transformCanvas.sx=n/(this.transformCanvas.w/this.renderConfig.dpr),this.transformCanvas.sy=n/(this.transformCanvas.w/this.renderConfig.dpr)):(this.transformCanvas.sx=i/(this.transformCanvas.h/this.renderConfig.dpr),this.transformCanvas.sy=i/(this.transformCanvas.h/this.renderConfig.dpr)),u==="xMid"&&(s<o&&h==="meet"||s>o&&h==="slice")?this.transformCanvas.tx=(n-this.transformCanvas.w*(i/this.transformCanvas.h))/2*this.renderConfig.dpr:u==="xMax"&&(s<o&&h==="meet"||s>o&&h==="slice")?this.transformCanvas.tx=(n-this.transformCanvas.w*(i/this.transformCanvas.h))*this.renderConfig.dpr:this.transformCanvas.tx=0,m==="YMid"&&(s>o&&h==="meet"||s<o&&h==="slice")?this.transformCanvas.ty=(i-this.transformCanvas.h*(n/this.transformCanvas.w))/2*this.renderConfig.dpr:m==="YMax"&&(s>o&&h==="meet"||s<o&&h==="slice")?this.transformCanvas.ty=(i-this.transformCanvas.h*(n/this.transformCanvas.w))*this.renderConfig.dpr:this.transformCanvas.ty=0;}else this.renderConfig.preserveAspectRatio==="none"?(this.transformCanvas.sx=n/(this.transformCanvas.w/this.renderConfig.dpr),this.transformCanvas.sy=i/(this.transformCanvas.h/this.renderConfig.dpr),this.transformCanvas.tx=0,this.transformCanvas.ty=0):(this.transformCanvas.sx=this.renderConfig.dpr,this.transformCanvas.sy=this.renderConfig.dpr,this.transformCanvas.tx=0,this.transformCanvas.ty=0);this.transformCanvas.props=[this.transformCanvas.sx,0,0,0,0,this.transformCanvas.sy,0,0,0,0,1,0,this.transformCanvas.tx,this.transformCanvas.ty,0,1],this.ctxTransform(this.transformCanvas.props),this.canvasContext.beginPath(),this.canvasContext.rect(0,0,this.transformCanvas.w,this.transformCanvas.h),this.canvasContext.closePath(),this.canvasContext.clip(),this.renderFrame(this.renderedFrame,!0);},CanvasRendererBase.prototype.destroy=function(){this.renderConfig.clearCanvas&&this.animationItem.wrapper&&(this.animationItem.wrapper.innerText="");var t,e=this.layers?this.layers.length:0;for(t=e-1;t>=0;t-=1)this.elements[t]&&this.elements[t].destroy&&this.elements[t].destroy();this.elements.length=0,this.globalData.canvasContext=null,this.animationItem.container=null,this.destroyed=!0;},CanvasRendererBase.prototype.renderFrame=function(t,e){if(!(this.renderedFrame===t&&this.renderConfig.clearCanvas===!0&&!e||this.destroyed||t===-1)){this.renderedFrame=t,this.globalData.frameNum=t-this.animationItem._isFirstFrame,this.globalData.frameId+=1,this.globalData._mdf=!this.renderConfig.clearCanvas||e,this.globalData.projectInterface.currentFrame=t;var n,i=this.layers.length;for(this.completeLayers||this.checkLayers(t),n=i-1;n>=0;n-=1)(this.completeLayers||this.elements[n])&&this.elements[n].prepareFrame(t-this.layers[n].st);if(this.globalData._mdf){for(this.renderConfig.clearCanvas===!0?this.canvasContext.clearRect(0,0,this.transformCanvas.w,this.transformCanvas.h):this.save(),n=i-1;n>=0;n-=1)(this.completeLayers||this.elements[n])&&this.elements[n].renderFrame();this.renderConfig.clearCanvas!==!0&&this.restore();}}},CanvasRendererBase.prototype.buildItem=function(t){var e=this.elements;if(!(e[t]||this.layers[t].ty===99)){var n=this.createItem(this.layers[t],this,this.globalData);e[t]=n,n.initExpressions();}},CanvasRendererBase.prototype.checkPendingElements=function(){for(;this.pendingElements.length;){var t=this.pendingElements.pop();t.checkParenting();}},CanvasRendererBase.prototype.hide=function(){this.animationItem.container.style.display="none";},CanvasRendererBase.prototype.show=function(){this.animationItem.container.style.display="block";};function CanvasContext(){this.opacity=-1,this.transform=createTypedArray("float32",16),this.fillStyle="",this.strokeStyle="",this.lineWidth="",this.lineCap="",this.lineJoin="",this.miterLimit="",this.id=Math.random();}function CVContextData(){this.stack=[],this.cArrPos=0,this.cTr=new Matrix();var t,e=15;for(t=0;t<e;t+=1){var n=new CanvasContext();this.stack[t]=n;}this._length=e,this.nativeContext=null,this.transformMat=new Matrix(),this.currentOpacity=1,this.currentFillStyle="",this.appliedFillStyle="",this.currentStrokeStyle="",this.appliedStrokeStyle="",this.currentLineWidth="",this.appliedLineWidth="",this.currentLineCap="",this.appliedLineCap="",this.currentLineJoin="",this.appliedLineJoin="",this.appliedMiterLimit="",this.currentMiterLimit="";}CVContextData.prototype.duplicate=function(){var t=this._length*2,e=0;for(e=this._length;e<t;e+=1)this.stack[e]=new CanvasContext();this._length=t;},CVContextData.prototype.reset=function(){this.cArrPos=0,this.cTr.reset(),this.stack[this.cArrPos].opacity=1;},CVContextData.prototype.restore=function(t){this.cArrPos-=1;var e=this.stack[this.cArrPos],n=e.transform,i,o=this.cTr.props;for(i=0;i<16;i+=1)o[i]=n[i];if(t){this.nativeContext.restore();var s=this.stack[this.cArrPos+1];this.appliedFillStyle=s.fillStyle,this.appliedStrokeStyle=s.strokeStyle,this.appliedLineWidth=s.lineWidth,this.appliedLineCap=s.lineCap,this.appliedLineJoin=s.lineJoin,this.appliedMiterLimit=s.miterLimit;}this.nativeContext.setTransform(n[0],n[1],n[4],n[5],n[12],n[13]),(t||e.opacity!==-1&&this.currentOpacity!==e.opacity)&&(this.nativeContext.globalAlpha=e.opacity,this.currentOpacity=e.opacity),this.currentFillStyle=e.fillStyle,this.currentStrokeStyle=e.strokeStyle,this.currentLineWidth=e.lineWidth,this.currentLineCap=e.lineCap,this.currentLineJoin=e.lineJoin,this.currentMiterLimit=e.miterLimit;},CVContextData.prototype.save=function(t){t&&this.nativeContext.save();var e=this.cTr.props;this._length<=this.cArrPos&&this.duplicate();var n=this.stack[this.cArrPos],i;for(i=0;i<16;i+=1)n.transform[i]=e[i];this.cArrPos+=1;var o=this.stack[this.cArrPos];o.opacity=n.opacity,o.fillStyle=n.fillStyle,o.strokeStyle=n.strokeStyle,o.lineWidth=n.lineWidth,o.lineCap=n.lineCap,o.lineJoin=n.lineJoin,o.miterLimit=n.miterLimit;},CVContextData.prototype.setOpacity=function(t){this.stack[this.cArrPos].opacity=t;},CVContextData.prototype.setContext=function(t){this.nativeContext=t;},CVContextData.prototype.fillStyle=function(t){this.stack[this.cArrPos].fillStyle!==t&&(this.currentFillStyle=t,this.stack[this.cArrPos].fillStyle=t);},CVContextData.prototype.strokeStyle=function(t){this.stack[this.cArrPos].strokeStyle!==t&&(this.currentStrokeStyle=t,this.stack[this.cArrPos].strokeStyle=t);},CVContextData.prototype.lineWidth=function(t){this.stack[this.cArrPos].lineWidth!==t&&(this.currentLineWidth=t,this.stack[this.cArrPos].lineWidth=t);},CVContextData.prototype.lineCap=function(t){this.stack[this.cArrPos].lineCap!==t&&(this.currentLineCap=t,this.stack[this.cArrPos].lineCap=t);},CVContextData.prototype.lineJoin=function(t){this.stack[this.cArrPos].lineJoin!==t&&(this.currentLineJoin=t,this.stack[this.cArrPos].lineJoin=t);},CVContextData.prototype.miterLimit=function(t){this.stack[this.cArrPos].miterLimit!==t&&(this.currentMiterLimit=t,this.stack[this.cArrPos].miterLimit=t);},CVContextData.prototype.transform=function(t){this.transformMat.cloneFromProps(t);var e=this.cTr;this.transformMat.multiply(e),e.cloneFromProps(this.transformMat.props);var n=e.props;this.nativeContext.setTransform(n[0],n[1],n[4],n[5],n[12],n[13]);},CVContextData.prototype.opacity=function(t){var e=this.stack[this.cArrPos].opacity;e*=t<0?0:t,this.stack[this.cArrPos].opacity!==e&&(this.currentOpacity!==t&&(this.nativeContext.globalAlpha=t,this.currentOpacity=t),this.stack[this.cArrPos].opacity=e);},CVContextData.prototype.fill=function(t){this.appliedFillStyle!==this.currentFillStyle&&(this.appliedFillStyle=this.currentFillStyle,this.nativeContext.fillStyle=this.appliedFillStyle),this.nativeContext.fill(t);},CVContextData.prototype.fillRect=function(t,e,n,i){this.appliedFillStyle!==this.currentFillStyle&&(this.appliedFillStyle=this.currentFillStyle,this.nativeContext.fillStyle=this.appliedFillStyle),this.nativeContext.fillRect(t,e,n,i);},CVContextData.prototype.stroke=function(){this.appliedStrokeStyle!==this.currentStrokeStyle&&(this.appliedStrokeStyle=this.currentStrokeStyle,this.nativeContext.strokeStyle=this.appliedStrokeStyle),this.appliedLineWidth!==this.currentLineWidth&&(this.appliedLineWidth=this.currentLineWidth,this.nativeContext.lineWidth=this.appliedLineWidth),this.appliedLineCap!==this.currentLineCap&&(this.appliedLineCap=this.currentLineCap,this.nativeContext.lineCap=this.appliedLineCap),this.appliedLineJoin!==this.currentLineJoin&&(this.appliedLineJoin=this.currentLineJoin,this.nativeContext.lineJoin=this.appliedLineJoin),this.appliedMiterLimit!==this.currentMiterLimit&&(this.appliedMiterLimit=this.currentMiterLimit,this.nativeContext.miterLimit=this.appliedMiterLimit),this.nativeContext.stroke();};function CVCompElement(t,e,n){this.completeLayers=!1,this.layers=t.layers,this.pendingElements=[],this.elements=createSizedArray(this.layers.length),this.initElement(t,e,n),this.tm=t.tm?PropertyFactory.getProp(this,t.tm,0,e.frameRate,this):{_placeholder:!0};}extendPrototype([CanvasRendererBase,ICompElement,CVBaseElement],CVCompElement),CVCompElement.prototype.renderInnerContent=function(){var t=this.canvasContext;t.beginPath(),t.moveTo(0,0),t.lineTo(this.data.w,0),t.lineTo(this.data.w,this.data.h),t.lineTo(0,this.data.h),t.lineTo(0,0),t.clip();var e,n=this.layers.length;for(e=n-1;e>=0;e-=1)(this.completeLayers||this.elements[e])&&this.elements[e].renderFrame();},CVCompElement.prototype.destroy=function(){var t,e=this.layers.length;for(t=e-1;t>=0;t-=1)this.elements[t]&&this.elements[t].destroy();this.layers=null,this.elements=null;},CVCompElement.prototype.createComp=function(t){return new CVCompElement(t,this.globalData,this);};function CanvasRenderer(t,e){this.animationItem=t,this.renderConfig={clearCanvas:e&&e.clearCanvas!==void 0?e.clearCanvas:!0,context:e&&e.context||null,progressiveLoad:e&&e.progressiveLoad||!1,preserveAspectRatio:e&&e.preserveAspectRatio||"xMidYMid meet",imagePreserveAspectRatio:e&&e.imagePreserveAspectRatio||"xMidYMid slice",contentVisibility:e&&e.contentVisibility||"visible",className:e&&e.className||"",id:e&&e.id||"",runExpressions:!e||e.runExpressions===void 0||e.runExpressions},this.renderConfig.dpr=e&&e.dpr||1,this.animationItem.wrapper&&(this.renderConfig.dpr=e&&e.dpr||window.devicePixelRatio||1),this.renderedFrame=-1,this.globalData={frameNum:-1,_mdf:!1,renderConfig:this.renderConfig,currentGlobalAlpha:-1},this.contextData=new CVContextData(),this.elements=[],this.pendingElements=[],this.transformMat=new Matrix(),this.completeLayers=!1,this.rendererType="canvas",this.renderConfig.clearCanvas&&(this.ctxTransform=this.contextData.transform.bind(this.contextData),this.ctxOpacity=this.contextData.opacity.bind(this.contextData),this.ctxFillStyle=this.contextData.fillStyle.bind(this.contextData),this.ctxStrokeStyle=this.contextData.strokeStyle.bind(this.contextData),this.ctxLineWidth=this.contextData.lineWidth.bind(this.contextData),this.ctxLineCap=this.contextData.lineCap.bind(this.contextData),this.ctxLineJoin=this.contextData.lineJoin.bind(this.contextData),this.ctxMiterLimit=this.contextData.miterLimit.bind(this.contextData),this.ctxFill=this.contextData.fill.bind(this.contextData),this.ctxFillRect=this.contextData.fillRect.bind(this.contextData),this.ctxStroke=this.contextData.stroke.bind(this.contextData),this.save=this.contextData.save.bind(this.contextData));}extendPrototype([CanvasRendererBase],CanvasRenderer),CanvasRenderer.prototype.createComp=function(t){return new CVCompElement(t,this.globalData,this);};function HBaseElement(){}HBaseElement.prototype={checkBlendMode:function(){},initRendererElement:function(){this.baseElement=createTag(this.data.tg||"div"),this.data.hasMask?(this.svgElement=createNS("svg"),this.layerElement=createNS("g"),this.maskedElement=this.layerElement,this.svgElement.appendChild(this.layerElement),this.baseElement.appendChild(this.svgElement)):this.layerElement=this.baseElement,styleDiv(this.baseElement);},createContainerElements:function(){this.renderableEffectsManager=new CVEffects(this),this.transformedElement=this.baseElement,this.maskedElement=this.layerElement,this.data.ln&&this.layerElement.setAttribute("id",this.data.ln),this.data.cl&&this.layerElement.setAttribute("class",this.data.cl),this.data.bm!==0&&this.setBlendMode();},renderElement:function(){var e=this.transformedElement?this.transformedElement.style:{};if(this.finalTransform._matMdf){var n=this.finalTransform.mat.toCSS();e.transform=n,e.webkitTransform=n;}this.finalTransform._opMdf&&(e.opacity=this.finalTransform.mProp.o.v);},renderFrame:function(){this.data.hd||this.hidden||(this.renderTransform(),this.renderRenderable(),this.renderElement(),this.renderInnerContent(),this._isFirstFrame&&(this._isFirstFrame=!1));},destroy:function(){this.layerElement=null,this.transformedElement=null,this.matteElement&&(this.matteElement=null),this.maskManager&&(this.maskManager.destroy(),this.maskManager=null);},createRenderableComponents:function(){this.maskManager=new MaskElement(this.data,this,this.globalData);},addEffects:function(){},setMatte:function(){}},HBaseElement.prototype.getBaseElement=SVGBaseElement.prototype.getBaseElement,HBaseElement.prototype.destroyBaseElement=HBaseElement.prototype.destroy,HBaseElement.prototype.buildElementParenting=BaseRenderer.prototype.buildElementParenting;function HSolidElement(t,e,n){this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,HBaseElement,HierarchyElement,FrameElement,RenderableDOMElement],HSolidElement),HSolidElement.prototype.createContent=function(){var t;this.data.hasMask?(t=createNS("rect"),t.setAttribute("width",this.data.sw),t.setAttribute("height",this.data.sh),t.setAttribute("fill",this.data.sc),this.svgElement.setAttribute("width",this.data.sw),this.svgElement.setAttribute("height",this.data.sh)):(t=createTag("div"),t.style.width=this.data.sw+"px",t.style.height=this.data.sh+"px",t.style.backgroundColor=this.data.sc),this.layerElement.appendChild(t);};function HShapeElement(t,e,n){this.shapes=[],this.shapesData=t.shapes,this.stylesList=[],this.shapeModifiers=[],this.itemsData=[],this.processedElements=[],this.animatedContents=[],this.shapesContainer=createNS("g"),this.initElement(t,e,n),this.prevViewData=[],this.currentBBox={x:999999,y:-999999,h:0,w:0};}extendPrototype([BaseElement,TransformElement,HSolidElement,SVGShapeElement,HBaseElement,HierarchyElement,FrameElement,RenderableElement],HShapeElement),HShapeElement.prototype._renderShapeFrame=HShapeElement.prototype.renderInnerContent,HShapeElement.prototype.createContent=function(){var t;if(this.baseElement.style.fontSize=0,this.data.hasMask)this.layerElement.appendChild(this.shapesContainer),t=this.svgElement;else{t=createNS("svg");var e=this.comp.data?this.comp.data:this.globalData.compSize;t.setAttribute("width",e.w),t.setAttribute("height",e.h),t.appendChild(this.shapesContainer),this.layerElement.appendChild(t);}this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.shapesContainer,0,[],!0),this.filterUniqueShapes(),this.shapeCont=t;},HShapeElement.prototype.getTransformedPoint=function(t,e){var n,i=t.length;for(n=0;n<i;n+=1)e=t[n].mProps.v.applyToPointArray(e[0],e[1],0);return e;},HShapeElement.prototype.calculateShapeBoundingBox=function(t,e){var n=t.sh.v,i=t.transformers,o,s=n._length,l,h,p,u;if(!(s<=1)){for(o=0;o<s-1;o+=1)l=this.getTransformedPoint(i,n.v[o]),h=this.getTransformedPoint(i,n.o[o]),p=this.getTransformedPoint(i,n.i[o+1]),u=this.getTransformedPoint(i,n.v[o+1]),this.checkBounds(l,h,p,u,e);n.c&&(l=this.getTransformedPoint(i,n.v[o]),h=this.getTransformedPoint(i,n.o[o]),p=this.getTransformedPoint(i,n.i[0]),u=this.getTransformedPoint(i,n.v[0]),this.checkBounds(l,h,p,u,e));}},HShapeElement.prototype.checkBounds=function(t,e,n,i,o){this.getBoundsOfCurve(t,e,n,i);var s=this.shapeBoundingBox;o.x=bmMin(s.left,o.x),o.xMax=bmMax(s.right,o.xMax),o.y=bmMin(s.top,o.y),o.yMax=bmMax(s.bottom,o.yMax);},HShapeElement.prototype.shapeBoundingBox={left:0,right:0,top:0,bottom:0},HShapeElement.prototype.tempBoundingBox={x:0,xMax:0,y:0,yMax:0,width:0,height:0},HShapeElement.prototype.getBoundsOfCurve=function(t,e,n,i){for(var o=[[t[0],i[0]],[t[1],i[1]]],s,l,h,p,u,m,b,d=0;d<2;++d)l=6*t[d]-12*e[d]+6*n[d],s=-3*t[d]+9*e[d]-9*n[d]+3*i[d],h=3*e[d]-3*t[d],l|=0,s|=0,h|=0,s===0&&l===0||(s===0?(p=-h/l,p>0&&p<1&&o[d].push(this.calculateF(p,t,e,n,i,d))):(u=l*l-4*h*s,u>=0&&(m=(-l+bmSqrt(u))/(2*s),m>0&&m<1&&o[d].push(this.calculateF(m,t,e,n,i,d)),b=(-l-bmSqrt(u))/(2*s),b>0&&b<1&&o[d].push(this.calculateF(b,t,e,n,i,d)))));this.shapeBoundingBox.left=bmMin.apply(null,o[0]),this.shapeBoundingBox.top=bmMin.apply(null,o[1]),this.shapeBoundingBox.right=bmMax.apply(null,o[0]),this.shapeBoundingBox.bottom=bmMax.apply(null,o[1]);},HShapeElement.prototype.calculateF=function(t,e,n,i,o,s){return bmPow(1-t,3)*e[s]+3*bmPow(1-t,2)*t*n[s]+3*(1-t)*bmPow(t,2)*i[s]+bmPow(t,3)*o[s];},HShapeElement.prototype.calculateBoundingBox=function(t,e){var n,i=t.length;for(n=0;n<i;n+=1)t[n]&&t[n].sh?this.calculateShapeBoundingBox(t[n],e):t[n]&&t[n].it?this.calculateBoundingBox(t[n].it,e):t[n]&&t[n].style&&t[n].w&&this.expandStrokeBoundingBox(t[n].w,e);},HShapeElement.prototype.expandStrokeBoundingBox=function(t,e){var n=0;if(t.keyframes){for(var i=0;i<t.keyframes.length;i+=1){var o=t.keyframes[i].s;o>n&&(n=o);}n*=t.mult;}else n=t.v*t.mult;e.x-=n,e.xMax+=n,e.y-=n,e.yMax+=n;},HShapeElement.prototype.currentBoxContains=function(t){return this.currentBBox.x<=t.x&&this.currentBBox.y<=t.y&&this.currentBBox.width+this.currentBBox.x>=t.x+t.width&&this.currentBBox.height+this.currentBBox.y>=t.y+t.height;},HShapeElement.prototype.renderInnerContent=function(){if(this._renderShapeFrame(),!this.hidden&&(this._isFirstFrame||this._mdf)){var t=this.tempBoundingBox,e=999999;if(t.x=e,t.xMax=-e,t.y=e,t.yMax=-e,this.calculateBoundingBox(this.itemsData,t),t.width=t.xMax<t.x?0:t.xMax-t.x,t.height=t.yMax<t.y?0:t.yMax-t.y,this.currentBoxContains(t))return;var n=!1;if(this.currentBBox.w!==t.width&&(this.currentBBox.w=t.width,this.shapeCont.setAttribute("width",t.width),n=!0),this.currentBBox.h!==t.height&&(this.currentBBox.h=t.height,this.shapeCont.setAttribute("height",t.height),n=!0),n||this.currentBBox.x!==t.x||this.currentBBox.y!==t.y){this.currentBBox.w=t.width,this.currentBBox.h=t.height,this.currentBBox.x=t.x,this.currentBBox.y=t.y,this.shapeCont.setAttribute("viewBox",this.currentBBox.x+" "+this.currentBBox.y+" "+this.currentBBox.w+" "+this.currentBBox.h);var i=this.shapeCont.style,o="translate("+this.currentBBox.x+"px,"+this.currentBBox.y+"px)";i.transform=o,i.webkitTransform=o;}}};function HTextElement(t,e,n){this.textSpans=[],this.textPaths=[],this.currentBBox={x:999999,y:-999999,h:0,w:0},this.renderType="svg",this.isMasked=!1,this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,HBaseElement,HierarchyElement,FrameElement,RenderableDOMElement,ITextElement],HTextElement),HTextElement.prototype.createContent=function(){if(this.isMasked=this.checkMasks(),this.isMasked){this.renderType="svg",this.compW=this.comp.data.w,this.compH=this.comp.data.h,this.svgElement.setAttribute("width",this.compW),this.svgElement.setAttribute("height",this.compH);var t=createNS("g");this.maskedElement.appendChild(t),this.innerElem=t;}else this.renderType="html",this.innerElem=this.layerElement;this.checkParenting();},HTextElement.prototype.buildNewText=function(){var t=this.textProperty.currentData;this.renderedLetters=createSizedArray(t.l?t.l.length:0);var e=this.innerElem.style,n=t.fc?this.buildColor(t.fc):"rgba(0,0,0,0)";e.fill=n,e.color=n,t.sc&&(e.stroke=this.buildColor(t.sc),e.strokeWidth=t.sw+"px");var i=this.globalData.fontManager.getFontByName(t.f);if(!this.globalData.fontManager.chars)if(e.fontSize=t.finalSize+"px",e.lineHeight=t.finalSize+"px",i.fClass)this.innerElem.className=i.fClass;else{e.fontFamily=i.fFamily;var o=t.fWeight,s=t.fStyle;e.fontStyle=s,e.fontWeight=o;}var l,h,p=t.l;h=p.length;var u,m,b,d=this.mHelper,g,E="",P=0;for(l=0;l<h;l+=1){if(this.globalData.fontManager.chars?(this.textPaths[P]?u=this.textPaths[P]:(u=createNS("path"),u.setAttribute("stroke-linecap",lineCapEnum[1]),u.setAttribute("stroke-linejoin",lineJoinEnum[2]),u.setAttribute("stroke-miterlimit","4")),this.isMasked||(this.textSpans[P]?(m=this.textSpans[P],b=m.children[0]):(m=createTag("div"),m.style.lineHeight=0,b=createNS("svg"),b.appendChild(u),styleDiv(m)))):this.isMasked?u=this.textPaths[P]?this.textPaths[P]:createNS("text"):this.textSpans[P]?(m=this.textSpans[P],u=this.textPaths[P]):(m=createTag("span"),styleDiv(m),u=createTag("span"),styleDiv(u),m.appendChild(u)),this.globalData.fontManager.chars){var k=this.globalData.fontManager.getCharData(t.finalText[l],i.fStyle,this.globalData.fontManager.getFontByName(t.f).fFamily),v;if(k?v=k.data:v=null,d.reset(),v&&v.shapes&&v.shapes.length&&(g=v.shapes[0].it,d.scale(t.finalSize/100,t.finalSize/100),E=this.createPathShape(d,g),u.setAttribute("d",E)),this.isMasked)this.innerElem.appendChild(u);else{if(this.innerElem.appendChild(m),v&&v.shapes){document.body.appendChild(b);var C=b.getBBox();b.setAttribute("width",C.width+2),b.setAttribute("height",C.height+2),b.setAttribute("viewBox",C.x-1+" "+(C.y-1)+" "+(C.width+2)+" "+(C.height+2));var y=b.style,S="translate("+(C.x-1)+"px,"+(C.y-1)+"px)";y.transform=S,y.webkitTransform=S,p[l].yOffset=C.y-1;}else b.setAttribute("width",1),b.setAttribute("height",1);m.appendChild(b);}}else if(u.textContent=p[l].val,u.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),this.isMasked)this.innerElem.appendChild(u);else{this.innerElem.appendChild(m);var O=u.style,A="translate3d(0,"+-t.finalSize/1.2+"px,0)";O.transform=A,O.webkitTransform=A;}this.isMasked?this.textSpans[P]=u:this.textSpans[P]=m,this.textSpans[P].style.display="block",this.textPaths[P]=u,P+=1;}for(;P<this.textSpans.length;)this.textSpans[P].style.display="none",P+=1;},HTextElement.prototype.renderInnerContent=function(){this.validateText();var t;if(this.data.singleShape){if(!this._isFirstFrame&&!this.lettersChangedFlag)return;if(this.isMasked&&this.finalTransform._matMdf){this.svgElement.setAttribute("viewBox",-this.finalTransform.mProp.p.v[0]+" "+-this.finalTransform.mProp.p.v[1]+" "+this.compW+" "+this.compH),t=this.svgElement.style;var e="translate("+-this.finalTransform.mProp.p.v[0]+"px,"+-this.finalTransform.mProp.p.v[1]+"px)";t.transform=e,t.webkitTransform=e;}}if(this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag),!(!this.lettersChangedFlag&&!this.textAnimator.lettersChangedFlag)){var n,i,o=0,s=this.textAnimator.renderedLetters,l=this.textProperty.currentData.l;i=l.length;var h,p,u;for(n=0;n<i;n+=1)l[n].n?o+=1:(p=this.textSpans[n],u=this.textPaths[n],h=s[o],o+=1,h._mdf.m&&(this.isMasked?p.setAttribute("transform",h.m):(p.style.webkitTransform=h.m,p.style.transform=h.m)),p.style.opacity=h.o,h.sw&&h._mdf.sw&&u.setAttribute("stroke-width",h.sw),h.sc&&h._mdf.sc&&u.setAttribute("stroke",h.sc),h.fc&&h._mdf.fc&&(u.setAttribute("fill",h.fc),u.style.color=h.fc));if(this.innerElem.getBBox&&!this.hidden&&(this._isFirstFrame||this._mdf)){var m=this.innerElem.getBBox();this.currentBBox.w!==m.width&&(this.currentBBox.w=m.width,this.svgElement.setAttribute("width",m.width)),this.currentBBox.h!==m.height&&(this.currentBBox.h=m.height,this.svgElement.setAttribute("height",m.height));var b=1;if(this.currentBBox.w!==m.width+b*2||this.currentBBox.h!==m.height+b*2||this.currentBBox.x!==m.x-b||this.currentBBox.y!==m.y-b){this.currentBBox.w=m.width+b*2,this.currentBBox.h=m.height+b*2,this.currentBBox.x=m.x-b,this.currentBBox.y=m.y-b,this.svgElement.setAttribute("viewBox",this.currentBBox.x+" "+this.currentBBox.y+" "+this.currentBBox.w+" "+this.currentBBox.h),t=this.svgElement.style;var d="translate("+this.currentBBox.x+"px,"+this.currentBBox.y+"px)";t.transform=d,t.webkitTransform=d;}}}};function HCameraElement(t,e,n){this.initFrame(),this.initBaseData(t,e,n),this.initHierarchy();var i=PropertyFactory.getProp;if(this.pe=i(this,t.pe,0,0,this),t.ks.p.s?(this.px=i(this,t.ks.p.x,1,0,this),this.py=i(this,t.ks.p.y,1,0,this),this.pz=i(this,t.ks.p.z,1,0,this)):this.p=i(this,t.ks.p,1,0,this),t.ks.a&&(this.a=i(this,t.ks.a,1,0,this)),t.ks.or.k.length&&t.ks.or.k[0].to){var o,s=t.ks.or.k.length;for(o=0;o<s;o+=1)t.ks.or.k[o].to=null,t.ks.or.k[o].ti=null;}this.or=i(this,t.ks.or,1,degToRads,this),this.or.sh=!0,this.rx=i(this,t.ks.rx,0,degToRads,this),this.ry=i(this,t.ks.ry,0,degToRads,this),this.rz=i(this,t.ks.rz,0,degToRads,this),this.mat=new Matrix(),this._prevMat=new Matrix(),this._isFirstFrame=!0,this.finalTransform={mProp:this};}extendPrototype([BaseElement,FrameElement,HierarchyElement],HCameraElement),HCameraElement.prototype.setup=function(){var t,e=this.comp.threeDElements.length,n,i,o;for(t=0;t<e;t+=1)if(n=this.comp.threeDElements[t],n.type==="3d"){i=n.perspectiveElem.style,o=n.container.style;var s=this.pe.v+"px",l="0px 0px 0px",h="matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";i.perspective=s,i.webkitPerspective=s,o.transformOrigin=l,o.mozTransformOrigin=l,o.webkitTransformOrigin=l,i.transform=h,i.webkitTransform=h;}},HCameraElement.prototype.createElements=function(){},HCameraElement.prototype.hide=function(){},HCameraElement.prototype.renderFrame=function(){var t=this._isFirstFrame,e,n;if(this.hierarchy)for(n=this.hierarchy.length,e=0;e<n;e+=1)t=this.hierarchy[e].finalTransform.mProp._mdf||t;if(t||this.pe._mdf||this.p&&this.p._mdf||this.px&&(this.px._mdf||this.py._mdf||this.pz._mdf)||this.rx._mdf||this.ry._mdf||this.rz._mdf||this.or._mdf||this.a&&this.a._mdf){if(this.mat.reset(),this.hierarchy)for(n=this.hierarchy.length-1,e=n;e>=0;e-=1){var i=this.hierarchy[e].finalTransform.mProp;this.mat.translate(-i.p.v[0],-i.p.v[1],i.p.v[2]),this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]),this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v),this.mat.scale(1/i.s.v[0],1/i.s.v[1],1/i.s.v[2]),this.mat.translate(i.a.v[0],i.a.v[1],i.a.v[2]);}if(this.p?this.mat.translate(-this.p.v[0],-this.p.v[1],this.p.v[2]):this.mat.translate(-this.px.v,-this.py.v,this.pz.v),this.a){var o;this.p?o=[this.p.v[0]-this.a.v[0],this.p.v[1]-this.a.v[1],this.p.v[2]-this.a.v[2]]:o=[this.px.v-this.a.v[0],this.py.v-this.a.v[1],this.pz.v-this.a.v[2]];var s=Math.sqrt(Math.pow(o[0],2)+Math.pow(o[1],2)+Math.pow(o[2],2)),l=[o[0]/s,o[1]/s,o[2]/s],h=Math.sqrt(l[2]*l[2]+l[0]*l[0]),p=Math.atan2(l[1],h),u=Math.atan2(l[0],-l[2]);this.mat.rotateY(u).rotateX(-p);}this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]),this.mat.translate(this.globalData.compSize.w/2,this.globalData.compSize.h/2,0),this.mat.translate(0,0,this.pe.v);var m=!this._prevMat.equals(this.mat);if((m||this.pe._mdf)&&this.comp.threeDElements){n=this.comp.threeDElements.length;var b,d,g;for(e=0;e<n;e+=1)if(b=this.comp.threeDElements[e],b.type==="3d"){if(m){var E=this.mat.toCSS();g=b.container.style,g.transform=E,g.webkitTransform=E;}this.pe._mdf&&(d=b.perspectiveElem.style,d.perspective=this.pe.v+"px",d.webkitPerspective=this.pe.v+"px");}this.mat.clone(this._prevMat);}}this._isFirstFrame=!1;},HCameraElement.prototype.prepareFrame=function(t){this.prepareProperties(t,!0);},HCameraElement.prototype.destroy=function(){},HCameraElement.prototype.getBaseElement=function(){return null;};function HImageElement(t,e,n){this.assetData=e.getAssetData(t.refId),this.initElement(t,e,n);}extendPrototype([BaseElement,TransformElement,HBaseElement,HSolidElement,HierarchyElement,FrameElement,RenderableElement],HImageElement),HImageElement.prototype.createContent=function(){var t=this.globalData.getAssetsPath(this.assetData),e=new Image();this.data.hasMask?(this.imageElem=createNS("image"),this.imageElem.setAttribute("width",this.assetData.w+"px"),this.imageElem.setAttribute("height",this.assetData.h+"px"),this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink","href",t),this.layerElement.appendChild(this.imageElem),this.baseElement.setAttribute("width",this.assetData.w),this.baseElement.setAttribute("height",this.assetData.h)):this.layerElement.appendChild(e),e.crossOrigin="anonymous",e.src=t,this.data.ln&&this.baseElement.setAttribute("id",this.data.ln);};function HybridRendererBase(t,e){this.animationItem=t,this.layers=null,this.renderedFrame=-1,this.renderConfig={className:e&&e.className||"",imagePreserveAspectRatio:e&&e.imagePreserveAspectRatio||"xMidYMid slice",hideOnTransparent:!(e&&e.hideOnTransparent===!1),filterSize:{width:e&&e.filterSize&&e.filterSize.width||"400%",height:e&&e.filterSize&&e.filterSize.height||"400%",x:e&&e.filterSize&&e.filterSize.x||"-100%",y:e&&e.filterSize&&e.filterSize.y||"-100%"}},this.globalData={_mdf:!1,frameNum:-1,renderConfig:this.renderConfig},this.pendingElements=[],this.elements=[],this.threeDElements=[],this.destroyed=!1,this.camera=null,this.supports3d=!0,this.rendererType="html";}extendPrototype([BaseRenderer],HybridRendererBase),HybridRendererBase.prototype.buildItem=SVGRenderer.prototype.buildItem,HybridRendererBase.prototype.checkPendingElements=function(){for(;this.pendingElements.length;){var t=this.pendingElements.pop();t.checkParenting();}},HybridRendererBase.prototype.appendElementInPos=function(t,e){var n=t.getBaseElement();if(n){var i=this.layers[e];if(!i.ddd||!this.supports3d){if(this.threeDElements)this.addTo3dContainer(n,e);else{for(var o=0,s,l,h;o<e;)this.elements[o]&&this.elements[o]!==!0&&this.elements[o].getBaseElement&&(l=this.elements[o],h=this.layers[o].ddd?this.getThreeDContainerByPos(o):l.getBaseElement(),s=h||s),o+=1;s?(!i.ddd||!this.supports3d)&&this.layerElement.insertBefore(n,s):(!i.ddd||!this.supports3d)&&this.layerElement.appendChild(n);}}else this.addTo3dContainer(n,e);}},HybridRendererBase.prototype.createShape=function(t){return this.supports3d?new HShapeElement(t,this.globalData,this):new SVGShapeElement(t,this.globalData,this);},HybridRendererBase.prototype.createText=function(t){return this.supports3d?new HTextElement(t,this.globalData,this):new SVGTextLottieElement(t,this.globalData,this);},HybridRendererBase.prototype.createCamera=function(t){return this.camera=new HCameraElement(t,this.globalData,this),this.camera;},HybridRendererBase.prototype.createImage=function(t){return this.supports3d?new HImageElement(t,this.globalData,this):new IImageElement(t,this.globalData,this);},HybridRendererBase.prototype.createSolid=function(t){return this.supports3d?new HSolidElement(t,this.globalData,this):new ISolidElement(t,this.globalData,this);},HybridRendererBase.prototype.createNull=SVGRenderer.prototype.createNull,HybridRendererBase.prototype.getThreeDContainerByPos=function(t){for(var e=0,n=this.threeDElements.length;e<n;){if(this.threeDElements[e].startPos<=t&&this.threeDElements[e].endPos>=t)return this.threeDElements[e].perspectiveElem;e+=1;}return null;},HybridRendererBase.prototype.createThreeDContainer=function(t,e){var n=createTag("div"),i,o;styleDiv(n);var s=createTag("div");if(styleDiv(s),e==="3d"){i=n.style,i.width=this.globalData.compSize.w+"px",i.height=this.globalData.compSize.h+"px";var l="50% 50%";i.webkitTransformOrigin=l,i.mozTransformOrigin=l,i.transformOrigin=l,o=s.style;var h="matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";o.transform=h,o.webkitTransform=h;}n.appendChild(s);var p={container:s,perspectiveElem:n,startPos:t,endPos:t,type:e};return this.threeDElements.push(p),p;},HybridRendererBase.prototype.build3dContainers=function(){var t,e=this.layers.length,n,i="";for(t=0;t<e;t+=1)this.layers[t].ddd&&this.layers[t].ty!==3?(i!=="3d"&&(i="3d",n=this.createThreeDContainer(t,"3d")),n.endPos=Math.max(n.endPos,t)):(i!=="2d"&&(i="2d",n=this.createThreeDContainer(t,"2d")),n.endPos=Math.max(n.endPos,t));for(e=this.threeDElements.length,t=e-1;t>=0;t-=1)this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);},HybridRendererBase.prototype.addTo3dContainer=function(t,e){for(var n=0,i=this.threeDElements.length;n<i;){if(e<=this.threeDElements[n].endPos){for(var o=this.threeDElements[n].startPos,s;o<e;)this.elements[o]&&this.elements[o].getBaseElement&&(s=this.elements[o].getBaseElement()),o+=1;s?this.threeDElements[n].container.insertBefore(t,s):this.threeDElements[n].container.appendChild(t);break;}n+=1;}},HybridRendererBase.prototype.configAnimation=function(t){var e=createTag("div"),n=this.animationItem.wrapper,i=e.style;i.width=t.w+"px",i.height=t.h+"px",this.resizerElem=e,styleDiv(e),i.transformStyle="flat",i.mozTransformStyle="flat",i.webkitTransformStyle="flat",this.renderConfig.className&&e.setAttribute("class",this.renderConfig.className),n.appendChild(e),i.overflow="hidden";var o=createNS("svg");o.setAttribute("width","1"),o.setAttribute("height","1"),styleDiv(o),this.resizerElem.appendChild(o);var s=createNS("defs");o.appendChild(s),this.data=t,this.setupGlobalData(t,o),this.globalData.defs=s,this.layers=t.layers,this.layerElement=this.resizerElem,this.build3dContainers(),this.updateContainerSize();},HybridRendererBase.prototype.destroy=function(){this.animationItem.wrapper&&(this.animationItem.wrapper.innerText=""),this.animationItem.container=null,this.globalData.defs=null;var t,e=this.layers?this.layers.length:0;for(t=0;t<e;t+=1)this.elements[t]&&this.elements[t].destroy&&this.elements[t].destroy();this.elements.length=0,this.destroyed=!0,this.animationItem=null;},HybridRendererBase.prototype.updateContainerSize=function(){var t=this.animationItem.wrapper.offsetWidth,e=this.animationItem.wrapper.offsetHeight,n=t/e,i=this.globalData.compSize.w/this.globalData.compSize.h,o,s,l,h;i>n?(o=t/this.globalData.compSize.w,s=t/this.globalData.compSize.w,l=0,h=(e-this.globalData.compSize.h*(t/this.globalData.compSize.w))/2):(o=e/this.globalData.compSize.h,s=e/this.globalData.compSize.h,l=(t-this.globalData.compSize.w*(e/this.globalData.compSize.h))/2,h=0);var p=this.resizerElem.style;p.webkitTransform="matrix3d("+o+",0,0,0,0,"+s+",0,0,0,0,1,0,"+l+","+h+",0,1)",p.transform=p.webkitTransform;},HybridRendererBase.prototype.renderFrame=SVGRenderer.prototype.renderFrame,HybridRendererBase.prototype.hide=function(){this.resizerElem.style.display="none";},HybridRendererBase.prototype.show=function(){this.resizerElem.style.display="block";},HybridRendererBase.prototype.initItems=function(){if(this.buildAllItems(),this.camera)this.camera.setup();else{var t=this.globalData.compSize.w,e=this.globalData.compSize.h,n,i=this.threeDElements.length;for(n=0;n<i;n+=1){var o=this.threeDElements[n].perspectiveElem.style;o.webkitPerspective=Math.sqrt(Math.pow(t,2)+Math.pow(e,2))+"px",o.perspective=o.webkitPerspective;}}},HybridRendererBase.prototype.searchExtraCompositions=function(t){var e,n=t.length,i=createTag("div");for(e=0;e<n;e+=1)if(t[e].xt){var o=this.createComp(t[e],i,this.globalData.comp,null);o.initExpressions(),this.globalData.projectInterface.registerComposition(o);}};function HCompElement(t,e,n){this.layers=t.layers,this.supports3d=!t.hasMask,this.completeLayers=!1,this.pendingElements=[],this.elements=this.layers?createSizedArray(this.layers.length):[],this.initElement(t,e,n),this.tm=t.tm?PropertyFactory.getProp(this,t.tm,0,e.frameRate,this):{_placeholder:!0};}extendPrototype([HybridRendererBase,ICompElement,HBaseElement],HCompElement),HCompElement.prototype._createBaseContainerElements=HCompElement.prototype.createContainerElements,HCompElement.prototype.createContainerElements=function(){this._createBaseContainerElements(),this.data.hasMask?(this.svgElement.setAttribute("width",this.data.w),this.svgElement.setAttribute("height",this.data.h),this.transformedElement=this.baseElement):this.transformedElement=this.layerElement;},HCompElement.prototype.addTo3dContainer=function(t,e){for(var n=0,i;n<e;)this.elements[n]&&this.elements[n].getBaseElement&&(i=this.elements[n].getBaseElement()),n+=1;i?this.layerElement.insertBefore(t,i):this.layerElement.appendChild(t);},HCompElement.prototype.createComp=function(t){return this.supports3d?new HCompElement(t,this.globalData,this):new SVGCompElement(t,this.globalData,this);};function HybridRenderer(t,e){this.animationItem=t,this.layers=null,this.renderedFrame=-1,this.renderConfig={className:e&&e.className||"",imagePreserveAspectRatio:e&&e.imagePreserveAspectRatio||"xMidYMid slice",hideOnTransparent:!(e&&e.hideOnTransparent===!1),filterSize:{width:e&&e.filterSize&&e.filterSize.width||"400%",height:e&&e.filterSize&&e.filterSize.height||"400%",x:e&&e.filterSize&&e.filterSize.x||"-100%",y:e&&e.filterSize&&e.filterSize.y||"-100%"},runExpressions:!e||e.runExpressions===void 0||e.runExpressions},this.globalData={_mdf:!1,frameNum:-1,renderConfig:this.renderConfig},this.pendingElements=[],this.elements=[],this.threeDElements=[],this.destroyed=!1,this.camera=null,this.supports3d=!0,this.rendererType="html";}extendPrototype([HybridRendererBase],HybridRenderer),HybridRenderer.prototype.createComp=function(t){return this.supports3d?new HCompElement(t,this.globalData,this):new SVGCompElement(t,this.globalData,this);};var CompExpressionInterface=function(){return function(t){function e(n){for(var i=0,o=t.layers.length;i<o;){if(t.layers[i].nm===n||t.layers[i].ind===n)return t.elements[i].layerInterface;i+=1;}return null;}return Object.defineProperty(e,"_name",{value:t.data.nm}),e.layer=e,e.pixelAspect=1,e.height=t.data.h||t.globalData.compSize.h,e.width=t.data.w||t.globalData.compSize.w,e.pixelAspect=1,e.frameDuration=1/t.globalData.frameRate,e.displayStartTime=0,e.numLayers=t.layers.length,e;};}();function _typeof$2(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof$2=function(n){return typeof n;}:_typeof$2=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof$2(t);}function seedRandom(t,e){var n=this,i=256,o=6,s=52,l="random",h=e.pow(i,o),p=e.pow(2,s),u=p*2,m=i-1,b;function d(y,S,O){var A=[];S=S===!0?{entropy:!0}:S||{};var R=k(P(S.entropy?[y,C(t)]:y===null?v():y,3),A),N=new g(A),H=function(){for(var nt=N.g(o),Z=h,rt=0;nt<p;)nt=(nt+rt)*i,Z*=i,rt=N.g(1);for(;nt>=u;)nt/=2,Z/=2,rt>>>=1;return(nt+rt)/Z;};return H.int32=function(){return N.g(4)|0;},H.quick=function(){return N.g(4)/4294967296;},H.double=H,k(C(N.S),t),(S.pass||O||function(it,nt,Z,rt){return rt&&(rt.S&&E(rt,N),it.state=function(){return E(N,{});}),Z?(e[l]=it,nt):it;})(H,R,"global"in S?S.global:this==e,S.state);}e["seed"+l]=d;function g(y){var S,O=y.length,A=this,R=0,N=A.i=A.j=0,H=A.S=[];for(O||(y=[O++]);R<i;)H[R]=R++;for(R=0;R<i;R++)H[R]=H[N=m&N+y[R%O]+(S=H[R])],H[N]=S;A.g=function(it){for(var nt,Z=0,rt=A.i,Q=A.j,W=A.S;it--;)nt=W[rt=m&rt+1],Z=Z*i+W[m&(W[rt]=W[Q=m&Q+nt])+(W[Q]=nt)];return A.i=rt,A.j=Q,Z;};}function E(y,S){return S.i=y.i,S.j=y.j,S.S=y.S.slice(),S;}function P(y,S){var O=[],A=_typeof$2(y),R;if(S&&A=="object")for(R in y)try{O.push(P(y[R],S-1));}catch{}return O.length?O:A=="string"?y:y+"\0";}function k(y,S){for(var O=y+"",A,R=0;R<O.length;)S[m&R]=m&(A^=S[m&R]*19)+O.charCodeAt(R++);return C(S);}function v(){try{if(b)return C(b.randomBytes(i));var y=new Uint8Array(i);return(n.crypto||n.msCrypto).getRandomValues(y),C(y);}catch{var S=n.navigator,O=S&&S.plugins;return[+new Date(),n,O,n.screen,C(t)];}}function C(y){return String.fromCharCode.apply(0,y);}k(e.random(),t);}function initialize$2(t){seedRandom([],t);}var propTypes={SHAPE:"shape"};function _typeof$1(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof$1=function(n){return typeof n;}:_typeof$1=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof$1(t);}var ExpressionManager=function(){"use strict";var ob={},Math=BMMath,window=null,document=null,XMLHttpRequest=null,fetch=null,frames=null,_lottieGlobal={};initialize$2(BMMath);function resetFrame(){_lottieGlobal={};}function $bm_isInstanceOfArray(t){return t.constructor===Array||t.constructor===Float32Array;}function isNumerable(t,e){return t==="number"||e instanceof Number||t==="boolean"||t==="string";}function $bm_neg(t){var e=_typeof$1(t);if(e==="number"||t instanceof Number||e==="boolean")return-t;if($bm_isInstanceOfArray(t)){var n,i=t.length,o=[];for(n=0;n<i;n+=1)o[n]=-t[n];return o;}return t.propType?t.v:-t;}var easeInBez=BezierFactory.getBezierEasing(.333,0,.833,.833,"easeIn").get,easeOutBez=BezierFactory.getBezierEasing(.167,.167,.667,1,"easeOut").get,easeInOutBez=BezierFactory.getBezierEasing(.33,0,.667,1,"easeInOut").get;function sum(t,e){var n=_typeof$1(t),i=_typeof$1(e);if(isNumerable(n,t)&&isNumerable(i,e)||n==="string"||i==="string")return t+e;if($bm_isInstanceOfArray(t)&&isNumerable(i,e))return t=t.slice(0),t[0]+=e,t;if(isNumerable(n,t)&&$bm_isInstanceOfArray(e))return e=e.slice(0),e[0]=t+e[0],e;if($bm_isInstanceOfArray(t)&&$bm_isInstanceOfArray(e)){for(var o=0,s=t.length,l=e.length,h=[];o<s||o<l;)(typeof t[o]=="number"||t[o]instanceof Number)&&(typeof e[o]=="number"||e[o]instanceof Number)?h[o]=t[o]+e[o]:h[o]=e[o]===void 0?t[o]:t[o]||e[o],o+=1;return h;}return 0;}var add=sum;function sub(t,e){var n=_typeof$1(t),i=_typeof$1(e);if(isNumerable(n,t)&&isNumerable(i,e))return n==="string"&&(t=parseInt(t,10)),i==="string"&&(e=parseInt(e,10)),t-e;if($bm_isInstanceOfArray(t)&&isNumerable(i,e))return t=t.slice(0),t[0]-=e,t;if(isNumerable(n,t)&&$bm_isInstanceOfArray(e))return e=e.slice(0),e[0]=t-e[0],e;if($bm_isInstanceOfArray(t)&&$bm_isInstanceOfArray(e)){for(var o=0,s=t.length,l=e.length,h=[];o<s||o<l;)(typeof t[o]=="number"||t[o]instanceof Number)&&(typeof e[o]=="number"||e[o]instanceof Number)?h[o]=t[o]-e[o]:h[o]=e[o]===void 0?t[o]:t[o]||e[o],o+=1;return h;}return 0;}function mul(t,e){var n=_typeof$1(t),i=_typeof$1(e),o;if(isNumerable(n,t)&&isNumerable(i,e))return t*e;var s,l;if($bm_isInstanceOfArray(t)&&isNumerable(i,e)){for(l=t.length,o=createTypedArray("float32",l),s=0;s<l;s+=1)o[s]=t[s]*e;return o;}if(isNumerable(n,t)&&$bm_isInstanceOfArray(e)){for(l=e.length,o=createTypedArray("float32",l),s=0;s<l;s+=1)o[s]=t*e[s];return o;}return 0;}function div(t,e){var n=_typeof$1(t),i=_typeof$1(e),o;if(isNumerable(n,t)&&isNumerable(i,e))return t/e;var s,l;if($bm_isInstanceOfArray(t)&&isNumerable(i,e)){for(l=t.length,o=createTypedArray("float32",l),s=0;s<l;s+=1)o[s]=t[s]/e;return o;}if(isNumerable(n,t)&&$bm_isInstanceOfArray(e)){for(l=e.length,o=createTypedArray("float32",l),s=0;s<l;s+=1)o[s]=t/e[s];return o;}return 0;}function mod(t,e){return typeof t=="string"&&(t=parseInt(t,10)),typeof e=="string"&&(e=parseInt(e,10)),t%e;}var $bm_sum=sum,$bm_sub=sub,$bm_mul=mul,$bm_div=div,$bm_mod=mod;function clamp(t,e,n){if(e>n){var i=n;n=e,e=i;}return Math.min(Math.max(t,e),n);}function radiansToDegrees(t){return t/degToRads;}var radians_to_degrees=radiansToDegrees;function degreesToRadians(t){return t*degToRads;}var degrees_to_radians=radiansToDegrees,helperLengthArray=[0,0,0,0,0,0];function length(t,e){if(typeof t=="number"||t instanceof Number)return e=e||0,Math.abs(t-e);e||(e=helperLengthArray);var n,i=Math.min(t.length,e.length),o=0;for(n=0;n<i;n+=1)o+=Math.pow(e[n]-t[n],2);return Math.sqrt(o);}function normalize(t){return div(t,length(t));}function rgbToHsl(t){var e=t[0],n=t[1],i=t[2],o=Math.max(e,n,i),s=Math.min(e,n,i),l,h,p=(o+s)/2;if(o===s)l=0,h=0;else{var u=o-s;switch(h=p>.5?u/(2-o-s):u/(o+s),o){case e:l=(n-i)/u+(n<i?6:0);break;case n:l=(i-e)/u+2;break;case i:l=(e-n)/u+4;break;default:break;}l/=6;}return[l,h,p,t[3]];}function hue2rgb(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t;}function hslToRgb(t){var e=t[0],n=t[1],i=t[2],o,s,l;if(n===0)o=i,l=i,s=i;else{var h=i<.5?i*(1+n):i+n-i*n,p=2*i-h;o=hue2rgb(p,h,e+1/3),s=hue2rgb(p,h,e),l=hue2rgb(p,h,e-1/3);}return[o,s,l,t[3]];}function linear(t,e,n,i,o){if((i===void 0||o===void 0)&&(i=e,o=n,e=0,n=1),n<e){var s=n;n=e,e=s;}if(t<=e)return i;if(t>=n)return o;var l=n===e?0:(t-e)/(n-e);if(!i.length)return i+(o-i)*l;var h,p=i.length,u=createTypedArray("float32",p);for(h=0;h<p;h+=1)u[h]=i[h]+(o[h]-i[h])*l;return u;}function random(t,e){if(e===void 0&&(t===void 0?(t=0,e=1):(e=t,t=void 0)),e.length){var n,i=e.length;t||(t=createTypedArray("float32",i));var o=createTypedArray("float32",i),s=BMMath.random();for(n=0;n<i;n+=1)o[n]=t[n]+s*(e[n]-t[n]);return o;}t===void 0&&(t=0);var l=BMMath.random();return t+l*(e-t);}function createPath(t,e,n,i){var o,s=t.length,l=shapePool.newElement();l.setPathData(!!i,s);var h=[0,0],p,u;for(o=0;o<s;o+=1)p=e&&e[o]?e[o]:h,u=n&&n[o]?n[o]:h,l.setTripleAt(t[o][0],t[o][1],u[0]+t[o][0],u[1]+t[o][1],p[0]+t[o][0],p[1]+t[o][1],o,!0);return l;}function initiateExpression(elem,data,property){function noOp(t){return t;}if(!elem.globalData.renderConfig.runExpressions)return noOp;var val=data.x,needsVelocity=/velocity(?![\w\d])/.test(val),_needsRandom=val.indexOf("random")!==-1,elemType=elem.data.ty,transform,$bm_transform,content,effect,thisProperty=property;thisProperty.valueAtTime=thisProperty.getValueAtTime,Object.defineProperty(thisProperty,"value",{get:function(){return thisProperty.v;}}),elem.comp.frameDuration=1/elem.comp.globalData.frameRate,elem.comp.displayStartTime=0;var inPoint=elem.data.ip/elem.comp.globalData.frameRate,outPoint=elem.data.op/elem.comp.globalData.frameRate,width=elem.data.sw?elem.data.sw:0,height=elem.data.sh?elem.data.sh:0,name=elem.data.nm,loopIn,loop_in,loopOut,loop_out,smooth,toWorld,fromWorld,fromComp,toComp,fromCompToSurface,position,rotation,anchorPoint,scale,thisLayer,thisComp,mask,valueAtTime,velocityAtTime,scoped_bm_rt,expression_function=eval("[function _expression_function(){"+val+";scoped_bm_rt=$bm_rt}]")[0],numKeys=property.kf?data.k.length:0,active=!this.data||this.data.hd!==!0,wiggle=function t(e,n){var i,o,s=this.pv.length?this.pv.length:1,l=createTypedArray("float32",s);e=5;var h=Math.floor(time*e);for(i=0,o=0;i<h;){for(o=0;o<s;o+=1)l[o]+=-n+n*2*BMMath.random();i+=1;}var p=time*e,u=p-Math.floor(p),m=createTypedArray("float32",s);if(s>1){for(o=0;o<s;o+=1)m[o]=this.pv[o]+l[o]+(-n+n*2*BMMath.random())*u;return m;}return this.pv+l[0]+(-n+n*2*BMMath.random())*u;}.bind(this);thisProperty.loopIn&&(loopIn=thisProperty.loopIn.bind(thisProperty),loop_in=loopIn),thisProperty.loopOut&&(loopOut=thisProperty.loopOut.bind(thisProperty),loop_out=loopOut),thisProperty.smooth&&(smooth=thisProperty.smooth.bind(thisProperty));function loopInDuration(t,e){return loopIn(t,e,!0);}function loopOutDuration(t,e){return loopOut(t,e,!0);}this.getValueAtTime&&(valueAtTime=this.getValueAtTime.bind(this)),this.getVelocityAtTime&&(velocityAtTime=this.getVelocityAtTime.bind(this));var comp=elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);function lookAt(t,e){var n=[e[0]-t[0],e[1]-t[1],e[2]-t[2]],i=Math.atan2(n[0],Math.sqrt(n[1]*n[1]+n[2]*n[2]))/degToRads,o=-Math.atan2(n[1],n[2])/degToRads;return[o,i,0];}function easeOut(t,e,n,i,o){return applyEase(easeOutBez,t,e,n,i,o);}function easeIn(t,e,n,i,o){return applyEase(easeInBez,t,e,n,i,o);}function ease(t,e,n,i,o){return applyEase(easeInOutBez,t,e,n,i,o);}function applyEase(t,e,n,i,o,s){o===void 0?(o=n,s=i):e=(e-n)/(i-n),e>1?e=1:e<0&&(e=0);var l=t(e);if($bm_isInstanceOfArray(o)){var h,p=o.length,u=createTypedArray("float32",p);for(h=0;h<p;h+=1)u[h]=(s[h]-o[h])*l+o[h];return u;}return(s-o)*l+o;}function nearestKey(t){var e,n=data.k.length,i,o;if(!data.k.length||typeof data.k[0]=="number")i=0,o=0;else if(i=-1,t*=elem.comp.globalData.frameRate,t<data.k[0].t)i=1,o=data.k[0].t;else{for(e=0;e<n-1;e+=1)if(t===data.k[e].t){i=e+1,o=data.k[e].t;break;}else if(t>data.k[e].t&&t<data.k[e+1].t){t-data.k[e].t>data.k[e+1].t-t?(i=e+2,o=data.k[e+1].t):(i=e+1,o=data.k[e].t);break;}i===-1&&(i=e+1,o=data.k[e].t);}var s={};return s.index=i,s.time=o/elem.comp.globalData.frameRate,s;}function key(t){var e,n,i;if(!data.k.length||typeof data.k[0]=="number")throw new Error("The property has no keyframe at index "+t);t-=1,e={time:data.k[t].t/elem.comp.globalData.frameRate,value:[]};var o=Object.prototype.hasOwnProperty.call(data.k[t],"s")?data.k[t].s:data.k[t-1].e;for(i=o.length,n=0;n<i;n+=1)e[n]=o[n],e.value[n]=o[n];return e;}function framesToTime(t,e){return e||(e=elem.comp.globalData.frameRate),t/e;}function timeToFrames(t,e){return!t&&t!==0&&(t=time),e||(e=elem.comp.globalData.frameRate),t*e;}function seedRandom(t){BMMath.seedrandom(randSeed+t);}function sourceRectAtTime(){return elem.sourceRectAtTime();}function substring(t,e){return typeof value=="string"?e===void 0?value.substring(t):value.substring(t,e):"";}function substr(t,e){return typeof value=="string"?e===void 0?value.substr(t):value.substr(t,e):"";}function posterizeTime(t){time=t===0?0:Math.floor(time*t)/t,value=valueAtTime(time);}var time,velocity,value,text,textIndex,textTotal,selectorValue,index=elem.data.ind,hasParent=!!(elem.hierarchy&&elem.hierarchy.length),parent,randSeed=Math.floor(Math.random()*1e6),globalData=elem.globalData;function executeExpression(t){return value=t,this.frameExpressionId===elem.globalData.frameId&&this.propType!=="textSelector"?value:(this.propType==="textSelector"&&(textIndex=this.textIndex,textTotal=this.textTotal,selectorValue=this.selectorValue),thisLayer||(text=elem.layerInterface.text,thisLayer=elem.layerInterface,thisComp=elem.comp.compInterface,toWorld=thisLayer.toWorld.bind(thisLayer),fromWorld=thisLayer.fromWorld.bind(thisLayer),fromComp=thisLayer.fromComp.bind(thisLayer),toComp=thisLayer.toComp.bind(thisLayer),mask=thisLayer.mask?thisLayer.mask.bind(thisLayer):null,fromCompToSurface=fromComp),transform||(transform=elem.layerInterface("ADBE Transform Group"),$bm_transform=transform,transform&&(anchorPoint=transform.anchorPoint)),elemType===4&&!content&&(content=thisLayer("ADBE Root Vectors Group")),effect||(effect=thisLayer(4)),hasParent=!!(elem.hierarchy&&elem.hierarchy.length),hasParent&&!parent&&(parent=elem.hierarchy[0].layerInterface),time=this.comp.renderedFrame/this.comp.globalData.frameRate,_needsRandom&&seedRandom(randSeed+time),needsVelocity&&(velocity=velocityAtTime(time)),expression_function(),this.frameExpressionId=elem.globalData.frameId,scoped_bm_rt=scoped_bm_rt.propType===propTypes.SHAPE?scoped_bm_rt.v:scoped_bm_rt,scoped_bm_rt);}return executeExpression.__preventDeadCodeRemoval=[$bm_transform,anchorPoint,time,velocity,inPoint,outPoint,width,height,name,loop_in,loop_out,smooth,toComp,fromCompToSurface,toWorld,fromWorld,mask,position,rotation,scale,thisComp,numKeys,active,wiggle,loopInDuration,loopOutDuration,comp,lookAt,easeOut,easeIn,ease,nearestKey,key,text,textIndex,textTotal,selectorValue,framesToTime,timeToFrames,sourceRectAtTime,substring,substr,posterizeTime,index,globalData],executeExpression;}return ob.initiateExpression=initiateExpression,ob.__preventDeadCodeRemoval=[window,document,XMLHttpRequest,fetch,frames,$bm_neg,add,$bm_sum,$bm_sub,$bm_mul,$bm_div,$bm_mod,clamp,radians_to_degrees,degreesToRadians,degrees_to_radians,normalize,rgbToHsl,hslToRgb,linear,random,createPath,_lottieGlobal],ob.resetFrame=resetFrame,ob;}(),Expressions=function(){var t={};t.initExpressions=e,t.resetFrame=ExpressionManager.resetFrame;function e(n){var i=0,o=[];function s(){i+=1;}function l(){i-=1,i===0&&p();}function h(u){o.indexOf(u)===-1&&o.push(u);}function p(){var u,m=o.length;for(u=0;u<m;u+=1)o[u].release();o.length=0;}n.renderer.compInterface=CompExpressionInterface(n.renderer),n.renderer.globalData.projectInterface.registerComposition(n.renderer),n.renderer.globalData.pushExpression=s,n.renderer.globalData.popExpression=l,n.renderer.globalData.registerExpressionProperty=h;}return t;}(),MaskManagerInterface=function(){function t(n,i){this._mask=n,this._data=i;}Object.defineProperty(t.prototype,"maskPath",{get:function(){return this._mask.prop.k&&this._mask.prop.getValue(),this._mask.prop;}}),Object.defineProperty(t.prototype,"maskOpacity",{get:function(){return this._mask.op.k&&this._mask.op.getValue(),this._mask.op.v*100;}});var e=function(i){var o=createSizedArray(i.viewData.length),s,l=i.viewData.length;for(s=0;s<l;s+=1)o[s]=new t(i.viewData[s],i.masksProperties[s]);var h=function(u){for(s=0;s<l;){if(i.masksProperties[s].nm===u)return o[s];s+=1;}return null;};return h;};return e;}(),ExpressionPropertyInterface=function(){var t={pv:0,v:0,mult:1},e={pv:[0,0,0],v:[0,0,0],mult:1};function n(l,h,p){Object.defineProperty(l,"velocity",{get:function(){return h.getVelocityAtTime(h.comp.currentFrame);}}),l.numKeys=h.keyframes?h.keyframes.length:0,l.key=function(u){if(!l.numKeys)return 0;var m="";"s"in h.keyframes[u-1]?m=h.keyframes[u-1].s:"e"in h.keyframes[u-2]?m=h.keyframes[u-2].e:m=h.keyframes[u-2].s;var b=p==="unidimensional"?new Number(m):Object.assign({},m);return b.time=h.keyframes[u-1].t/h.elem.comp.globalData.frameRate,b.value=p==="unidimensional"?m[0]:m,b;},l.valueAtTime=h.getValueAtTime,l.speedAtTime=h.getSpeedAtTime,l.velocityAtTime=h.getVelocityAtTime,l.propertyGroup=h.propertyGroup;}function i(l){(!l||!("pv"in l))&&(l=t);var h=1/l.mult,p=l.pv*h,u=new Number(p);return u.value=p,n(u,l,"unidimensional"),function(){return l.k&&l.getValue(),p=l.v*h,u.value!==p&&(u=new Number(p),u.value=p,n(u,l,"unidimensional")),u;};}function o(l){(!l||!("pv"in l))&&(l=e);var h=1/l.mult,p=l.data&&l.data.l||l.pv.length,u=createTypedArray("float32",p),m=createTypedArray("float32",p);return u.value=m,n(u,l,"multidimensional"),function(){l.k&&l.getValue();for(var b=0;b<p;b+=1)m[b]=l.v[b]*h,u[b]=m[b];return u;};}function s(){return t;}return function(l){return l?l.propType==="unidimensional"?i(l):o(l):s;};}(),TransformExpressionInterface=function(){return function(t){function e(l){switch(l){case"scale":case"Scale":case"ADBE Scale":case 6:return e.scale;case"rotation":case"Rotation":case"ADBE Rotation":case"ADBE Rotate Z":case 10:return e.rotation;case"ADBE Rotate X":return e.xRotation;case"ADBE Rotate Y":return e.yRotation;case"position":case"Position":case"ADBE Position":case 2:return e.position;case"ADBE Position_0":return e.xPosition;case"ADBE Position_1":return e.yPosition;case"ADBE Position_2":return e.zPosition;case"anchorPoint":case"AnchorPoint":case"Anchor Point":case"ADBE AnchorPoint":case 1:return e.anchorPoint;case"opacity":case"Opacity":case 11:return e.opacity;default:return null;}}Object.defineProperty(e,"rotation",{get:ExpressionPropertyInterface(t.r||t.rz)}),Object.defineProperty(e,"zRotation",{get:ExpressionPropertyInterface(t.rz||t.r)}),Object.defineProperty(e,"xRotation",{get:ExpressionPropertyInterface(t.rx)}),Object.defineProperty(e,"yRotation",{get:ExpressionPropertyInterface(t.ry)}),Object.defineProperty(e,"scale",{get:ExpressionPropertyInterface(t.s)});var n,i,o,s;return t.p?s=ExpressionPropertyInterface(t.p):(n=ExpressionPropertyInterface(t.px),i=ExpressionPropertyInterface(t.py),t.pz&&(o=ExpressionPropertyInterface(t.pz))),Object.defineProperty(e,"position",{get:function(){return t.p?s():[n(),i(),o?o():0];}}),Object.defineProperty(e,"xPosition",{get:ExpressionPropertyInterface(t.px)}),Object.defineProperty(e,"yPosition",{get:ExpressionPropertyInterface(t.py)}),Object.defineProperty(e,"zPosition",{get:ExpressionPropertyInterface(t.pz)}),Object.defineProperty(e,"anchorPoint",{get:ExpressionPropertyInterface(t.a)}),Object.defineProperty(e,"opacity",{get:ExpressionPropertyInterface(t.o)}),Object.defineProperty(e,"skew",{get:ExpressionPropertyInterface(t.sk)}),Object.defineProperty(e,"skewAxis",{get:ExpressionPropertyInterface(t.sa)}),Object.defineProperty(e,"orientation",{get:ExpressionPropertyInterface(t.or)}),e;};}(),LayerExpressionInterface=function(){function t(u){var m=new Matrix();if(u!==void 0){var b=this._elem.finalTransform.mProp.getValueAtTime(u);b.clone(m);}else{var d=this._elem.finalTransform.mProp;d.applyToMatrix(m);}return m;}function e(u,m){var b=this.getMatrix(m);return b.props[12]=0,b.props[13]=0,b.props[14]=0,this.applyPoint(b,u);}function n(u,m){var b=this.getMatrix(m);return this.applyPoint(b,u);}function i(u,m){var b=this.getMatrix(m);return b.props[12]=0,b.props[13]=0,b.props[14]=0,this.invertPoint(b,u);}function o(u,m){var b=this.getMatrix(m);return this.invertPoint(b,u);}function s(u,m){if(this._elem.hierarchy&&this._elem.hierarchy.length){var b,d=this._elem.hierarchy.length;for(b=0;b<d;b+=1)this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(u);}return u.applyToPointArray(m[0],m[1],m[2]||0);}function l(u,m){if(this._elem.hierarchy&&this._elem.hierarchy.length){var b,d=this._elem.hierarchy.length;for(b=0;b<d;b+=1)this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(u);}return u.inversePoint(m);}function h(u){var m=new Matrix();if(m.reset(),this._elem.finalTransform.mProp.applyToMatrix(m),this._elem.hierarchy&&this._elem.hierarchy.length){var b,d=this._elem.hierarchy.length;for(b=0;b<d;b+=1)this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(m);return m.inversePoint(u);}return m.inversePoint(u);}function p(){return[1,1,1,1];}return function(u){var m;function b(P){g.mask=new MaskManagerInterface(P,u);}function d(P){g.effect=P;}function g(P){switch(P){case"ADBE Root Vectors Group":case"Contents":case 2:return g.shapeInterface;case 1:case 6:case"Transform":case"transform":case"ADBE Transform Group":return m;case 4:case"ADBE Effect Parade":case"effects":case"Effects":return g.effect;case"ADBE Text Properties":return g.textInterface;default:return null;}}g.getMatrix=t,g.invertPoint=l,g.applyPoint=s,g.toWorld=n,g.toWorldVec=e,g.fromWorld=o,g.fromWorldVec=i,g.toComp=n,g.fromComp=h,g.sampleImage=p,g.sourceRectAtTime=u.sourceRectAtTime.bind(u),g._elem=u,m=TransformExpressionInterface(u.finalTransform.mProp);var E=getDescriptor(m,"anchorPoint");return Object.defineProperties(g,{hasParent:{get:function(){return u.hierarchy.length;}},parent:{get:function(){return u.hierarchy[0].layerInterface;}},rotation:getDescriptor(m,"rotation"),scale:getDescriptor(m,"scale"),position:getDescriptor(m,"position"),opacity:getDescriptor(m,"opacity"),anchorPoint:E,anchor_point:E,transform:{get:function(){return m;}},active:{get:function(){return u.isInRange;}}}),g.startTime=u.data.st,g.index=u.data.ind,g.source=u.data.refId,g.height=u.data.ty===0?u.data.h:100,g.width=u.data.ty===0?u.data.w:100,g.inPoint=u.data.ip/u.comp.globalData.frameRate,g.outPoint=u.data.op/u.comp.globalData.frameRate,g._name=u.data.nm,g.registerMaskInterface=b,g.registerEffectsInterface=d,g;};}(),propertyGroupFactory=function(){return function(t,e){return function(n){return n=n===void 0?1:n,n<=0?t:e(n-1);};};}(),PropertyInterface=function(){return function(t,e){var n={_name:t};function i(o){return o=o===void 0?1:o,o<=0?n:e(o-1);}return i;};}(),EffectsExpressionInterface=function(){var t={createEffectsInterface:e};function e(o,s){if(o.effectsManager){var l=[],h=o.data.ef,p,u=o.effectsManager.effectElements.length;for(p=0;p<u;p+=1)l.push(n(h[p],o.effectsManager.effectElements[p],s,o));var m=o.data.ef||[],b=function(g){for(p=0,u=m.length;p<u;){if(g===m[p].nm||g===m[p].mn||g===m[p].ix)return l[p];p+=1;}return null;};return Object.defineProperty(b,"numProperties",{get:function(){return m.length;}}),b;}return null;}function n(o,s,l,h){function p(g){for(var E=o.ef,P=0,k=E.length;P<k;){if(g===E[P].nm||g===E[P].mn||g===E[P].ix)return E[P].ty===5?m[P]:m[P]();P+=1;}throw new Error();}var u=propertyGroupFactory(p,l),m=[],b,d=o.ef.length;for(b=0;b<d;b+=1)o.ef[b].ty===5?m.push(n(o.ef[b],s.effectElements[b],s.effectElements[b].propertyGroup,h)):m.push(i(s.effectElements[b],o.ef[b].ty,h,u));return o.mn==="ADBE Color Control"&&Object.defineProperty(p,"color",{get:function(){return m[0]();}}),Object.defineProperties(p,{numProperties:{get:function(){return o.np;}},_name:{value:o.nm},propertyGroup:{value:u}}),p.enabled=o.en!==0,p.active=p.enabled,p;}function i(o,s,l,h){var p=ExpressionPropertyInterface(o.p);function u(){return s===10?l.comp.compInterface(o.p.v):p();}return o.p.setGroupProperty&&o.p.setGroupProperty(PropertyInterface("",h)),u;}return t;}(),ShapePathInterface=function(){return function(e,n,i){var o=n.sh;function s(h){return h==="Shape"||h==="shape"||h==="Path"||h==="path"||h==="ADBE Vector Shape"||h===2?s.path:null;}var l=propertyGroupFactory(s,i);return o.setGroupProperty(PropertyInterface("Path",l)),Object.defineProperties(s,{path:{get:function(){return o.k&&o.getValue(),o;}},shape:{get:function(){return o.k&&o.getValue(),o;}},_name:{value:e.nm},ix:{value:e.ix},propertyIndex:{value:e.ix},mn:{value:e.mn},propertyGroup:{value:i}}),s;};}(),ShapeExpressionInterface=function(){function t(E,P,k){var v=[],C,y=E?E.length:0;for(C=0;C<y;C+=1)E[C].ty==="gr"?v.push(n(E[C],P[C],k)):E[C].ty==="fl"?v.push(i(E[C],P[C],k)):E[C].ty==="st"?v.push(l(E[C],P[C],k)):E[C].ty==="tm"?v.push(h(E[C],P[C],k)):E[C].ty==="tr"||(E[C].ty==="el"?v.push(u(E[C],P[C],k)):E[C].ty==="sr"?v.push(m(E[C],P[C],k)):E[C].ty==="sh"?v.push(ShapePathInterface(E[C],P[C],k)):E[C].ty==="rc"?v.push(b(E[C],P[C],k)):E[C].ty==="rd"?v.push(d(E[C],P[C],k)):E[C].ty==="rp"?v.push(g(E[C],P[C],k)):E[C].ty==="gf"?v.push(o(E[C],P[C],k)):v.push(s(E[C],P[C],k)));return v;}function e(E,P,k){var v,C=function(O){for(var A=0,R=v.length;A<R;){if(v[A]._name===O||v[A].mn===O||v[A].propertyIndex===O||v[A].ix===O||v[A].ind===O)return v[A];A+=1;}return typeof O=="number"?v[O-1]:null;};C.propertyGroup=propertyGroupFactory(C,k),v=t(E.it,P.it,C.propertyGroup),C.numProperties=v.length;var y=p(E.it[E.it.length-1],P.it[P.it.length-1],C.propertyGroup);return C.transform=y,C.propertyIndex=E.cix,C._name=E.nm,C;}function n(E,P,k){var v=function(O){switch(O){case"ADBE Vectors Group":case"Contents":case 2:return v.content;default:return v.transform;}};v.propertyGroup=propertyGroupFactory(v,k);var C=e(E,P,v.propertyGroup),y=p(E.it[E.it.length-1],P.it[P.it.length-1],v.propertyGroup);return v.content=C,v.transform=y,Object.defineProperty(v,"_name",{get:function(){return E.nm;}}),v.numProperties=E.np,v.propertyIndex=E.ix,v.nm=E.nm,v.mn=E.mn,v;}function i(E,P,k){function v(C){return C==="Color"||C==="color"?v.color:C==="Opacity"||C==="opacity"?v.opacity:null;}return Object.defineProperties(v,{color:{get:ExpressionPropertyInterface(P.c)},opacity:{get:ExpressionPropertyInterface(P.o)},_name:{value:E.nm},mn:{value:E.mn}}),P.c.setGroupProperty(PropertyInterface("Color",k)),P.o.setGroupProperty(PropertyInterface("Opacity",k)),v;}function o(E,P,k){function v(C){return C==="Start Point"||C==="start point"?v.startPoint:C==="End Point"||C==="end point"?v.endPoint:C==="Opacity"||C==="opacity"?v.opacity:null;}return Object.defineProperties(v,{startPoint:{get:ExpressionPropertyInterface(P.s)},endPoint:{get:ExpressionPropertyInterface(P.e)},opacity:{get:ExpressionPropertyInterface(P.o)},type:{get:function(){return"a";}},_name:{value:E.nm},mn:{value:E.mn}}),P.s.setGroupProperty(PropertyInterface("Start Point",k)),P.e.setGroupProperty(PropertyInterface("End Point",k)),P.o.setGroupProperty(PropertyInterface("Opacity",k)),v;}function s(){function E(){return null;}return E;}function l(E,P,k){var v=propertyGroupFactory(R,k),C=propertyGroupFactory(A,v);function y(N){Object.defineProperty(A,E.d[N].nm,{get:ExpressionPropertyInterface(P.d.dataProps[N].p)});}var S,O=E.d?E.d.length:0,A={};for(S=0;S<O;S+=1)y(S),P.d.dataProps[S].p.setGroupProperty(C);function R(N){return N==="Color"||N==="color"?R.color:N==="Opacity"||N==="opacity"?R.opacity:N==="Stroke Width"||N==="stroke width"?R.strokeWidth:null;}return Object.defineProperties(R,{color:{get:ExpressionPropertyInterface(P.c)},opacity:{get:ExpressionPropertyInterface(P.o)},strokeWidth:{get:ExpressionPropertyInterface(P.w)},dash:{get:function(){return A;}},_name:{value:E.nm},mn:{value:E.mn}}),P.c.setGroupProperty(PropertyInterface("Color",v)),P.o.setGroupProperty(PropertyInterface("Opacity",v)),P.w.setGroupProperty(PropertyInterface("Stroke Width",v)),R;}function h(E,P,k){function v(y){return y===E.e.ix||y==="End"||y==="end"?v.end:y===E.s.ix?v.start:y===E.o.ix?v.offset:null;}var C=propertyGroupFactory(v,k);return v.propertyIndex=E.ix,P.s.setGroupProperty(PropertyInterface("Start",C)),P.e.setGroupProperty(PropertyInterface("End",C)),P.o.setGroupProperty(PropertyInterface("Offset",C)),v.propertyIndex=E.ix,v.propertyGroup=k,Object.defineProperties(v,{start:{get:ExpressionPropertyInterface(P.s)},end:{get:ExpressionPropertyInterface(P.e)},offset:{get:ExpressionPropertyInterface(P.o)},_name:{value:E.nm}}),v.mn=E.mn,v;}function p(E,P,k){function v(y){return E.a.ix===y||y==="Anchor Point"?v.anchorPoint:E.o.ix===y||y==="Opacity"?v.opacity:E.p.ix===y||y==="Position"?v.position:E.r.ix===y||y==="Rotation"||y==="ADBE Vector Rotation"?v.rotation:E.s.ix===y||y==="Scale"?v.scale:E.sk&&E.sk.ix===y||y==="Skew"?v.skew:E.sa&&E.sa.ix===y||y==="Skew Axis"?v.skewAxis:null;}var C=propertyGroupFactory(v,k);return P.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity",C)),P.transform.mProps.p.setGroupProperty(PropertyInterface("Position",C)),P.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point",C)),P.transform.mProps.s.setGroupProperty(PropertyInterface("Scale",C)),P.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation",C)),P.transform.mProps.sk&&(P.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew",C)),P.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle",C))),P.transform.op.setGroupProperty(PropertyInterface("Opacity",C)),Object.defineProperties(v,{opacity:{get:ExpressionPropertyInterface(P.transform.mProps.o)},position:{get:ExpressionPropertyInterface(P.transform.mProps.p)},anchorPoint:{get:ExpressionPropertyInterface(P.transform.mProps.a)},scale:{get:ExpressionPropertyInterface(P.transform.mProps.s)},rotation:{get:ExpressionPropertyInterface(P.transform.mProps.r)},skew:{get:ExpressionPropertyInterface(P.transform.mProps.sk)},skewAxis:{get:ExpressionPropertyInterface(P.transform.mProps.sa)},_name:{value:E.nm}}),v.ty="tr",v.mn=E.mn,v.propertyGroup=k,v;}function u(E,P,k){function v(S){return E.p.ix===S?v.position:E.s.ix===S?v.size:null;}var C=propertyGroupFactory(v,k);v.propertyIndex=E.ix;var y=P.sh.ty==="tm"?P.sh.prop:P.sh;return y.s.setGroupProperty(PropertyInterface("Size",C)),y.p.setGroupProperty(PropertyInterface("Position",C)),Object.defineProperties(v,{size:{get:ExpressionPropertyInterface(y.s)},position:{get:ExpressionPropertyInterface(y.p)},_name:{value:E.nm}}),v.mn=E.mn,v;}function m(E,P,k){function v(S){return E.p.ix===S?v.position:E.r.ix===S?v.rotation:E.pt.ix===S?v.points:E.or.ix===S||S==="ADBE Vector Star Outer Radius"?v.outerRadius:E.os.ix===S?v.outerRoundness:E.ir&&(E.ir.ix===S||S==="ADBE Vector Star Inner Radius")?v.innerRadius:E.is&&E.is.ix===S?v.innerRoundness:null;}var C=propertyGroupFactory(v,k),y=P.sh.ty==="tm"?P.sh.prop:P.sh;return v.propertyIndex=E.ix,y.or.setGroupProperty(PropertyInterface("Outer Radius",C)),y.os.setGroupProperty(PropertyInterface("Outer Roundness",C)),y.pt.setGroupProperty(PropertyInterface("Points",C)),y.p.setGroupProperty(PropertyInterface("Position",C)),y.r.setGroupProperty(PropertyInterface("Rotation",C)),E.ir&&(y.ir.setGroupProperty(PropertyInterface("Inner Radius",C)),y.is.setGroupProperty(PropertyInterface("Inner Roundness",C))),Object.defineProperties(v,{position:{get:ExpressionPropertyInterface(y.p)},rotation:{get:ExpressionPropertyInterface(y.r)},points:{get:ExpressionPropertyInterface(y.pt)},outerRadius:{get:ExpressionPropertyInterface(y.or)},outerRoundness:{get:ExpressionPropertyInterface(y.os)},innerRadius:{get:ExpressionPropertyInterface(y.ir)},innerRoundness:{get:ExpressionPropertyInterface(y.is)},_name:{value:E.nm}}),v.mn=E.mn,v;}function b(E,P,k){function v(S){return E.p.ix===S?v.position:E.r.ix===S?v.roundness:E.s.ix===S||S==="Size"||S==="ADBE Vector Rect Size"?v.size:null;}var C=propertyGroupFactory(v,k),y=P.sh.ty==="tm"?P.sh.prop:P.sh;return v.propertyIndex=E.ix,y.p.setGroupProperty(PropertyInterface("Position",C)),y.s.setGroupProperty(PropertyInterface("Size",C)),y.r.setGroupProperty(PropertyInterface("Rotation",C)),Object.defineProperties(v,{position:{get:ExpressionPropertyInterface(y.p)},roundness:{get:ExpressionPropertyInterface(y.r)},size:{get:ExpressionPropertyInterface(y.s)},_name:{value:E.nm}}),v.mn=E.mn,v;}function d(E,P,k){function v(S){return E.r.ix===S||S==="Round Corners 1"?v.radius:null;}var C=propertyGroupFactory(v,k),y=P;return v.propertyIndex=E.ix,y.rd.setGroupProperty(PropertyInterface("Radius",C)),Object.defineProperties(v,{radius:{get:ExpressionPropertyInterface(y.rd)},_name:{value:E.nm}}),v.mn=E.mn,v;}function g(E,P,k){function v(S){return E.c.ix===S||S==="Copies"?v.copies:E.o.ix===S||S==="Offset"?v.offset:null;}var C=propertyGroupFactory(v,k),y=P;return v.propertyIndex=E.ix,y.c.setGroupProperty(PropertyInterface("Copies",C)),y.o.setGroupProperty(PropertyInterface("Offset",C)),Object.defineProperties(v,{copies:{get:ExpressionPropertyInterface(y.c)},offset:{get:ExpressionPropertyInterface(y.o)},_name:{value:E.nm}}),v.mn=E.mn,v;}return function(E,P,k){var v;function C(S){if(typeof S=="number")return S=S===void 0?1:S,S===0?k:v[S-1];for(var O=0,A=v.length;O<A;){if(v[O]._name===S)return v[O];O+=1;}return null;}function y(){return k;}return C.propertyGroup=propertyGroupFactory(C,y),v=t(E,P,C.propertyGroup),C.numProperties=v.length,C._name="Contents",C;};}(),TextExpressionInterface=function(){return function(t){var e;function n(i){switch(i){case"ADBE Text Document":return n.sourceText;default:return null;}}return Object.defineProperty(n,"sourceText",{get:function(){t.textProperty.getValue();var o=t.textProperty.currentData.t;return(!e||o!==e.value)&&(e=new String(o),e.value=o||new String(o),Object.defineProperty(e,"style",{get:function(){return{fillColor:t.textProperty.currentData.fc};}})),e;}}),n;};}();function _typeof(t){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_typeof=function(n){return typeof n;}:_typeof=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n;},_typeof(t);}var FootageInterface=function(){var t=function(i){var o="",s=i.getFootageData();function l(){return o="",s=i.getFootageData(),h;}function h(p){if(s[p])return o=p,s=s[p],_typeof(s)==="object"?h:s;var u=p.indexOf(o);if(u!==-1){var m=parseInt(p.substr(u+o.length),10);return s=s[m],_typeof(s)==="object"?h:s;}return"";}return l;},e=function(i){function o(s){return s==="Outline"?o.outlineInterface():null;}return o._name="Outline",o.outlineInterface=t(i),o;};return function(n){function i(o){return o==="Data"?i.dataInterface:null;}return i._name="Data",i.dataInterface=e(n),i;};}(),interfaces={layer:LayerExpressionInterface,effects:EffectsExpressionInterface,comp:CompExpressionInterface,shape:ShapeExpressionInterface,text:TextExpressionInterface,footage:FootageInterface};function getInterface(t){return interfaces[t]||null;}var expressionHelpers=function(){function t(l,h,p){h.x&&(p.k=!0,p.x=!0,p.initiateExpression=ExpressionManager.initiateExpression,p.effectsSequence.push(p.initiateExpression(l,h,p).bind(p)));}function e(l){return l*=this.elem.globalData.frameRate,l-=this.offsetTime,l!==this._cachingAtTime.lastFrame&&(this._cachingAtTime.lastIndex=this._cachingAtTime.lastFrame<l?this._cachingAtTime.lastIndex:0,this._cachingAtTime.value=this.interpolateValue(l,this._cachingAtTime),this._cachingAtTime.lastFrame=l),this._cachingAtTime.value;}function n(l){var h=-.01,p=this.getValueAtTime(l),u=this.getValueAtTime(l+h),m=0;if(p.length){var b;for(b=0;b<p.length;b+=1)m+=Math.pow(u[b]-p[b],2);m=Math.sqrt(m)*100;}else m=0;return m;}function i(l){if(this.vel!==void 0)return this.vel;var h=-.001,p=this.getValueAtTime(l),u=this.getValueAtTime(l+h),m;if(p.length){m=createTypedArray("float32",p.length);var b;for(b=0;b<p.length;b+=1)m[b]=(u[b]-p[b])/h;}else m=(u-p)/h;return m;}function o(){return this.pv;}function s(l){this.propertyGroup=l;}return{searchExpressions:t,getSpeedAtTime:n,getVelocityAtTime:i,getValueAtTime:e,getStaticValueAtTime:o,setGroupProperty:s};}();function addPropertyDecorator(){function t(d,g,E){if(!this.k||!this.keyframes)return this.pv;d=d?d.toLowerCase():"";var P=this.comp.renderedFrame,k=this.keyframes,v=k[k.length-1].t;if(P<=v)return this.pv;var C,y;E?(g?C=Math.abs(v-this.elem.comp.globalData.frameRate*g):C=Math.max(0,v-this.elem.data.ip),y=v-C):((!g||g>k.length-1)&&(g=k.length-1),y=k[k.length-1-g].t,C=v-y);var S,O,A;if(d==="pingpong"){var R=Math.floor((P-y)/C);if(R%2!==0)return this.getValueAtTime((C-(P-y)%C+y)/this.comp.globalData.frameRate,0);}else if(d==="offset"){var N=this.getValueAtTime(y/this.comp.globalData.frameRate,0),H=this.getValueAtTime(v/this.comp.globalData.frameRate,0),it=this.getValueAtTime(((P-y)%C+y)/this.comp.globalData.frameRate,0),nt=Math.floor((P-y)/C);if(this.pv.length){for(A=new Array(N.length),O=A.length,S=0;S<O;S+=1)A[S]=(H[S]-N[S])*nt+it[S];return A;}return(H-N)*nt+it;}else if(d==="continue"){var Z=this.getValueAtTime(v/this.comp.globalData.frameRate,0),rt=this.getValueAtTime((v-.001)/this.comp.globalData.frameRate,0);if(this.pv.length){for(A=new Array(Z.length),O=A.length,S=0;S<O;S+=1)A[S]=Z[S]+(Z[S]-rt[S])*((P-v)/this.comp.globalData.frameRate)/5e-4;return A;}return Z+(Z-rt)*((P-v)/.001);}return this.getValueAtTime(((P-y)%C+y)/this.comp.globalData.frameRate,0);}function e(d,g,E){if(!this.k)return this.pv;d=d?d.toLowerCase():"";var P=this.comp.renderedFrame,k=this.keyframes,v=k[0].t;if(P>=v)return this.pv;var C,y;E?(g?C=Math.abs(this.elem.comp.globalData.frameRate*g):C=Math.max(0,this.elem.data.op-v),y=v+C):((!g||g>k.length-1)&&(g=k.length-1),y=k[g].t,C=y-v);var S,O,A;if(d==="pingpong"){var R=Math.floor((v-P)/C);if(R%2===0)return this.getValueAtTime(((v-P)%C+v)/this.comp.globalData.frameRate,0);}else if(d==="offset"){var N=this.getValueAtTime(v/this.comp.globalData.frameRate,0),H=this.getValueAtTime(y/this.comp.globalData.frameRate,0),it=this.getValueAtTime((C-(v-P)%C+v)/this.comp.globalData.frameRate,0),nt=Math.floor((v-P)/C)+1;if(this.pv.length){for(A=new Array(N.length),O=A.length,S=0;S<O;S+=1)A[S]=it[S]-(H[S]-N[S])*nt;return A;}return it-(H-N)*nt;}else if(d==="continue"){var Z=this.getValueAtTime(v/this.comp.globalData.frameRate,0),rt=this.getValueAtTime((v+.001)/this.comp.globalData.frameRate,0);if(this.pv.length){for(A=new Array(Z.length),O=A.length,S=0;S<O;S+=1)A[S]=Z[S]+(Z[S]-rt[S])*(v-P)/.001;return A;}return Z+(Z-rt)*(v-P)/.001;}return this.getValueAtTime((C-((v-P)%C+v))/this.comp.globalData.frameRate,0);}function n(d,g){if(!this.k)return this.pv;if(d=(d||.4)*.5,g=Math.floor(g||5),g<=1)return this.pv;var E=this.comp.renderedFrame/this.comp.globalData.frameRate,P=E-d,k=E+d,v=g>1?(k-P)/(g-1):1,C=0,y=0,S;this.pv.length?S=createTypedArray("float32",this.pv.length):S=0;for(var O;C<g;){if(O=this.getValueAtTime(P+C*v),this.pv.length)for(y=0;y<this.pv.length;y+=1)S[y]+=O[y];else S+=O;C+=1;}if(this.pv.length)for(y=0;y<this.pv.length;y+=1)S[y]/=g;else S/=g;return S;}function i(d){this._transformCachingAtTime||(this._transformCachingAtTime={v:new Matrix()});var g=this._transformCachingAtTime.v;if(g.cloneFromProps(this.pre.props),this.appliedTransformations<1){var E=this.a.getValueAtTime(d);g.translate(-E[0]*this.a.mult,-E[1]*this.a.mult,E[2]*this.a.mult);}if(this.appliedTransformations<2){var P=this.s.getValueAtTime(d);g.scale(P[0]*this.s.mult,P[1]*this.s.mult,P[2]*this.s.mult);}if(this.sk&&this.appliedTransformations<3){var k=this.sk.getValueAtTime(d),v=this.sa.getValueAtTime(d);g.skewFromAxis(-k*this.sk.mult,v*this.sa.mult);}if(this.r&&this.appliedTransformations<4){var C=this.r.getValueAtTime(d);g.rotate(-C*this.r.mult);}else if(!this.r&&this.appliedTransformations<4){var y=this.rz.getValueAtTime(d),S=this.ry.getValueAtTime(d),O=this.rx.getValueAtTime(d),A=this.or.getValueAtTime(d);g.rotateZ(-y*this.rz.mult).rotateY(S*this.ry.mult).rotateX(O*this.rx.mult).rotateZ(-A[2]*this.or.mult).rotateY(A[1]*this.or.mult).rotateX(A[0]*this.or.mult);}if(this.data.p&&this.data.p.s){var R=this.px.getValueAtTime(d),N=this.py.getValueAtTime(d);if(this.data.p.z){var H=this.pz.getValueAtTime(d);g.translate(R*this.px.mult,N*this.py.mult,-H*this.pz.mult);}else g.translate(R*this.px.mult,N*this.py.mult,0);}else{var it=this.p.getValueAtTime(d);g.translate(it[0]*this.p.mult,it[1]*this.p.mult,-it[2]*this.p.mult);}return g;}function o(){return this.v.clone(new Matrix());}var s=TransformPropertyFactory.getTransformProperty;TransformPropertyFactory.getTransformProperty=function(d,g,E){var P=s(d,g,E);return P.dynamicProperties.length?P.getValueAtTime=i.bind(P):P.getValueAtTime=o.bind(P),P.setGroupProperty=expressionHelpers.setGroupProperty,P;};var l=PropertyFactory.getProp;PropertyFactory.getProp=function(d,g,E,P,k){var v=l(d,g,E,P,k);v.kf?v.getValueAtTime=expressionHelpers.getValueAtTime.bind(v):v.getValueAtTime=expressionHelpers.getStaticValueAtTime.bind(v),v.setGroupProperty=expressionHelpers.setGroupProperty,v.loopOut=t,v.loopIn=e,v.smooth=n,v.getVelocityAtTime=expressionHelpers.getVelocityAtTime.bind(v),v.getSpeedAtTime=expressionHelpers.getSpeedAtTime.bind(v),v.numKeys=g.a===1?g.k.length:0,v.propertyIndex=g.ix;var C=0;return E!==0&&(C=createTypedArray("float32",g.a===1?g.k[0].s.length:g.k.length)),v._cachingAtTime={lastFrame:initialDefaultFrame,lastIndex:0,value:C},expressionHelpers.searchExpressions(d,g,v),v.k&&k.addDynamicProperty(v),v;};function h(d){return this._cachingAtTime||(this._cachingAtTime={shapeValue:shapePool.clone(this.pv),lastIndex:0,lastTime:initialDefaultFrame}),d*=this.elem.globalData.frameRate,d-=this.offsetTime,d!==this._cachingAtTime.lastTime&&(this._cachingAtTime.lastIndex=this._cachingAtTime.lastTime<d?this._caching.lastIndex:0,this._cachingAtTime.lastTime=d,this.interpolateShape(d,this._cachingAtTime.shapeValue,this._cachingAtTime)),this._cachingAtTime.shapeValue;}var p=ShapePropertyFactory.getConstructorFunction(),u=ShapePropertyFactory.getKeyframedConstructorFunction();function m(){}m.prototype={vertices:function(g,E){this.k&&this.getValue();var P=this.v;E!==void 0&&(P=this.getValueAtTime(E,0));var k,v=P._length,C=P[g],y=P.v,S=createSizedArray(v);for(k=0;k<v;k+=1)g==="i"||g==="o"?S[k]=[C[k][0]-y[k][0],C[k][1]-y[k][1]]:S[k]=[C[k][0],C[k][1]];return S;},points:function(g){return this.vertices("v",g);},inTangents:function(g){return this.vertices("i",g);},outTangents:function(g){return this.vertices("o",g);},isClosed:function(){return this.v.c;},pointOnPath:function(g,E){var P=this.v;E!==void 0&&(P=this.getValueAtTime(E,0)),this._segmentsLength||(this._segmentsLength=bez.getSegmentsLength(P));for(var k=this._segmentsLength,v=k.lengths,C=k.totalLength*g,y=0,S=v.length,O=0,A;y<S;){if(O+v[y].addedLength>C){var R=y,N=P.c&&y===S-1?0:y+1,H=(C-O)/v[y].addedLength;A=bez.getPointInSegment(P.v[R],P.v[N],P.o[R],P.i[N],H,v[y]);break;}else O+=v[y].addedLength;y+=1;}return A||(A=P.c?[P.v[0][0],P.v[0][1]]:[P.v[P._length-1][0],P.v[P._length-1][1]]),A;},vectorOnPath:function(g,E,P){g==1?g=this.v.c:g==0&&(g=.999);var k=this.pointOnPath(g,E),v=this.pointOnPath(g+.001,E),C=v[0]-k[0],y=v[1]-k[1],S=Math.sqrt(Math.pow(C,2)+Math.pow(y,2));if(S===0)return[0,0];var O=P==="tangent"?[C/S,y/S]:[-y/S,C/S];return O;},tangentOnPath:function(g,E){return this.vectorOnPath(g,E,"tangent");},normalOnPath:function(g,E){return this.vectorOnPath(g,E,"normal");},setGroupProperty:expressionHelpers.setGroupProperty,getValueAtTime:expressionHelpers.getStaticValueAtTime},extendPrototype([m],p),extendPrototype([m],u),u.prototype.getValueAtTime=h,u.prototype.initiateExpression=ExpressionManager.initiateExpression;var b=ShapePropertyFactory.getShapeProp;ShapePropertyFactory.getShapeProp=function(d,g,E,P,k){var v=b(d,g,E,P,k);return v.propertyIndex=g.ix,v.lock=!1,E===3?expressionHelpers.searchExpressions(d,g.pt,v):E===4&&expressionHelpers.searchExpressions(d,g.ks,v),v.k&&d.addDynamicProperty(v),v;};}function initialize$1(){addPropertyDecorator();}function addDecorator(){function t(){return this.data.d.x?(this.calculateExpression=ExpressionManager.initiateExpression.bind(this)(this.elem,this.data.d,this),this.addEffect(this.getExpressionValue.bind(this)),!0):null;}TextProperty.prototype.getExpressionValue=function(e,n){var i=this.calculateExpression(n);if(e.t!==i){var o={};return this.copyData(o,e),o.t=i.toString(),o.__complete=!1,o;}return e;},TextProperty.prototype.searchProperty=function(){var e=this.searchKeyframes(),n=this.searchExpressions();return this.kf=e||n,this.kf;},TextProperty.prototype.searchExpressions=t;}function initialize(){addDecorator();}function SVGComposableEffect(){}SVGComposableEffect.prototype={createMergeNode:function t(e,n){var i=createNS("feMerge");i.setAttribute("result",e);var o,s;for(s=0;s<n.length;s+=1)o=createNS("feMergeNode"),o.setAttribute("in",n[s]),i.appendChild(o),i.appendChild(o);return i;}};var linearFilterValue="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";function SVGTintFilter(t,e,n,i,o){this.filterManager=e;var s=createNS("feColorMatrix");s.setAttribute("type","matrix"),s.setAttribute("color-interpolation-filters","linearRGB"),s.setAttribute("values",linearFilterValue+" 1 0"),this.linearFilter=s,s.setAttribute("result",i+"_tint_1"),t.appendChild(s),s=createNS("feColorMatrix"),s.setAttribute("type","matrix"),s.setAttribute("color-interpolation-filters","sRGB"),s.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),s.setAttribute("result",i+"_tint_2"),t.appendChild(s),this.matrixFilter=s;var l=this.createMergeNode(i,[o,i+"_tint_1",i+"_tint_2"]);t.appendChild(l);}extendPrototype([SVGComposableEffect],SVGTintFilter),SVGTintFilter.prototype.renderFrame=function(t){if(t||this.filterManager._mdf){var e=this.filterManager.effectElements[0].p.v,n=this.filterManager.effectElements[1].p.v,i=this.filterManager.effectElements[2].p.v/100;this.linearFilter.setAttribute("values",linearFilterValue+" "+i+" 0"),this.matrixFilter.setAttribute("values",n[0]-e[0]+" 0 0 0 "+e[0]+" "+(n[1]-e[1])+" 0 0 0 "+e[1]+" "+(n[2]-e[2])+" 0 0 0 "+e[2]+" 0 0 0 1 0");}};function SVGFillFilter(t,e,n,i){this.filterManager=e;var o=createNS("feColorMatrix");o.setAttribute("type","matrix"),o.setAttribute("color-interpolation-filters","sRGB"),o.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),o.setAttribute("result",i),t.appendChild(o),this.matrixFilter=o;}SVGFillFilter.prototype.renderFrame=function(t){if(t||this.filterManager._mdf){var e=this.filterManager.effectElements[2].p.v,n=this.filterManager.effectElements[6].p.v;this.matrixFilter.setAttribute("values","0 0 0 0 "+e[0]+" 0 0 0 0 "+e[1]+" 0 0 0 0 "+e[2]+" 0 0 0 "+n+" 0");}};function SVGStrokeEffect(t,e,n){this.initialized=!1,this.filterManager=e,this.elem=n,this.paths=[];}SVGStrokeEffect.prototype.initialize=function(){var t=this.elem.layerElement.children||this.elem.layerElement.childNodes,e,n,i,o;for(this.filterManager.effectElements[1].p.v===1?(o=this.elem.maskManager.masksProperties.length,i=0):(i=this.filterManager.effectElements[0].p.v-1,o=i+1),n=createNS("g"),n.setAttribute("fill","none"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-dashoffset",1),i;i<o;i+=1)e=createNS("path"),n.appendChild(e),this.paths.push({p:e,m:i});if(this.filterManager.effectElements[10].p.v===3){var s=createNS("mask"),l=createElementID();s.setAttribute("id",l),s.setAttribute("mask-type","alpha"),s.appendChild(n),this.elem.globalData.defs.appendChild(s);var h=createNS("g");for(h.setAttribute("mask","url("+getLocationHref()+"#"+l+")");t[0];)h.appendChild(t[0]);this.elem.layerElement.appendChild(h),this.masker=s,n.setAttribute("stroke","#fff");}else if(this.filterManager.effectElements[10].p.v===1||this.filterManager.effectElements[10].p.v===2){if(this.filterManager.effectElements[10].p.v===2)for(t=this.elem.layerElement.children||this.elem.layerElement.childNodes;t.length;)this.elem.layerElement.removeChild(t[0]);this.elem.layerElement.appendChild(n),this.elem.layerElement.removeAttribute("mask"),n.setAttribute("stroke","#fff");}this.initialized=!0,this.pathMasker=n;},SVGStrokeEffect.prototype.renderFrame=function(t){this.initialized||this.initialize();var e,n=this.paths.length,i,o;for(e=0;e<n;e+=1)if(this.paths[e].m!==-1&&(i=this.elem.maskManager.viewData[this.paths[e].m],o=this.paths[e].p,(t||this.filterManager._mdf||i.prop._mdf)&&o.setAttribute("d",i.lastPath),t||this.filterManager.effectElements[9].p._mdf||this.filterManager.effectElements[4].p._mdf||this.filterManager.effectElements[7].p._mdf||this.filterManager.effectElements[8].p._mdf||i.prop._mdf)){var s;if(this.filterManager.effectElements[7].p.v!==0||this.filterManager.effectElements[8].p.v!==100){var l=Math.min(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)*.01,h=Math.max(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)*.01,p=o.getTotalLength();s="0 0 0 "+p*l+" ";var u=p*(h-l),m=1+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v*.01,b=Math.floor(u/m),d;for(d=0;d<b;d+=1)s+="1 "+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v*.01+" ";s+="0 "+p*10+" 0 0";}else s="1 "+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v*.01;o.setAttribute("stroke-dasharray",s);}if((t||this.filterManager.effectElements[4].p._mdf)&&this.pathMasker.setAttribute("stroke-width",this.filterManager.effectElements[4].p.v*2),(t||this.filterManager.effectElements[6].p._mdf)&&this.pathMasker.setAttribute("opacity",this.filterManager.effectElements[6].p.v),(this.filterManager.effectElements[10].p.v===1||this.filterManager.effectElements[10].p.v===2)&&(t||this.filterManager.effectElements[3].p._mdf)){var g=this.filterManager.effectElements[3].p.v;this.pathMasker.setAttribute("stroke","rgb("+bmFloor(g[0]*255)+","+bmFloor(g[1]*255)+","+bmFloor(g[2]*255)+")");}};function SVGTritoneFilter(t,e,n,i){this.filterManager=e;var o=createNS("feColorMatrix");o.setAttribute("type","matrix"),o.setAttribute("color-interpolation-filters","linearRGB"),o.setAttribute("values","0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"),t.appendChild(o);var s=createNS("feComponentTransfer");s.setAttribute("color-interpolation-filters","sRGB"),s.setAttribute("result",i),this.matrixFilter=s;var l=createNS("feFuncR");l.setAttribute("type","table"),s.appendChild(l),this.feFuncR=l;var h=createNS("feFuncG");h.setAttribute("type","table"),s.appendChild(h),this.feFuncG=h;var p=createNS("feFuncB");p.setAttribute("type","table"),s.appendChild(p),this.feFuncB=p,t.appendChild(s);}SVGTritoneFilter.prototype.renderFrame=function(t){if(t||this.filterManager._mdf){var e=this.filterManager.effectElements[0].p.v,n=this.filterManager.effectElements[1].p.v,i=this.filterManager.effectElements[2].p.v,o=i[0]+" "+n[0]+" "+e[0],s=i[1]+" "+n[1]+" "+e[1],l=i[2]+" "+n[2]+" "+e[2];this.feFuncR.setAttribute("tableValues",o),this.feFuncG.setAttribute("tableValues",s),this.feFuncB.setAttribute("tableValues",l);}};function SVGProLevelsFilter(t,e,n,i){this.filterManager=e;var o=this.filterManager.effectElements,s=createNS("feComponentTransfer");(o[10].p.k||o[10].p.v!==0||o[11].p.k||o[11].p.v!==1||o[12].p.k||o[12].p.v!==1||o[13].p.k||o[13].p.v!==0||o[14].p.k||o[14].p.v!==1)&&(this.feFuncR=this.createFeFunc("feFuncR",s)),(o[17].p.k||o[17].p.v!==0||o[18].p.k||o[18].p.v!==1||o[19].p.k||o[19].p.v!==1||o[20].p.k||o[20].p.v!==0||o[21].p.k||o[21].p.v!==1)&&(this.feFuncG=this.createFeFunc("feFuncG",s)),(o[24].p.k||o[24].p.v!==0||o[25].p.k||o[25].p.v!==1||o[26].p.k||o[26].p.v!==1||o[27].p.k||o[27].p.v!==0||o[28].p.k||o[28].p.v!==1)&&(this.feFuncB=this.createFeFunc("feFuncB",s)),(o[31].p.k||o[31].p.v!==0||o[32].p.k||o[32].p.v!==1||o[33].p.k||o[33].p.v!==1||o[34].p.k||o[34].p.v!==0||o[35].p.k||o[35].p.v!==1)&&(this.feFuncA=this.createFeFunc("feFuncA",s)),(this.feFuncR||this.feFuncG||this.feFuncB||this.feFuncA)&&(s.setAttribute("color-interpolation-filters","sRGB"),t.appendChild(s)),(o[3].p.k||o[3].p.v!==0||o[4].p.k||o[4].p.v!==1||o[5].p.k||o[5].p.v!==1||o[6].p.k||o[6].p.v!==0||o[7].p.k||o[7].p.v!==1)&&(s=createNS("feComponentTransfer"),s.setAttribute("color-interpolation-filters","sRGB"),s.setAttribute("result",i),t.appendChild(s),this.feFuncRComposed=this.createFeFunc("feFuncR",s),this.feFuncGComposed=this.createFeFunc("feFuncG",s),this.feFuncBComposed=this.createFeFunc("feFuncB",s));}SVGProLevelsFilter.prototype.createFeFunc=function(t,e){var n=createNS(t);return n.setAttribute("type","table"),e.appendChild(n),n;},SVGProLevelsFilter.prototype.getTableValue=function(t,e,n,i,o){for(var s=0,l=256,h,p=Math.min(t,e),u=Math.max(t,e),m=Array.call(null,{length:l}),b,d=0,g=o-i,E=e-t;s<=256;)h=s/256,h<=p?b=E<0?o:i:h>=u?b=E<0?i:o:b=i+g*Math.pow((h-t)/E,1/n),m[d]=b,d+=1,s+=256/(l-1);return m.join(" ");},SVGProLevelsFilter.prototype.renderFrame=function(t){if(t||this.filterManager._mdf){var e,n=this.filterManager.effectElements;this.feFuncRComposed&&(t||n[3].p._mdf||n[4].p._mdf||n[5].p._mdf||n[6].p._mdf||n[7].p._mdf)&&(e=this.getTableValue(n[3].p.v,n[4].p.v,n[5].p.v,n[6].p.v,n[7].p.v),this.feFuncRComposed.setAttribute("tableValues",e),this.feFuncGComposed.setAttribute("tableValues",e),this.feFuncBComposed.setAttribute("tableValues",e)),this.feFuncR&&(t||n[10].p._mdf||n[11].p._mdf||n[12].p._mdf||n[13].p._mdf||n[14].p._mdf)&&(e=this.getTableValue(n[10].p.v,n[11].p.v,n[12].p.v,n[13].p.v,n[14].p.v),this.feFuncR.setAttribute("tableValues",e)),this.feFuncG&&(t||n[17].p._mdf||n[18].p._mdf||n[19].p._mdf||n[20].p._mdf||n[21].p._mdf)&&(e=this.getTableValue(n[17].p.v,n[18].p.v,n[19].p.v,n[20].p.v,n[21].p.v),this.feFuncG.setAttribute("tableValues",e)),this.feFuncB&&(t||n[24].p._mdf||n[25].p._mdf||n[26].p._mdf||n[27].p._mdf||n[28].p._mdf)&&(e=this.getTableValue(n[24].p.v,n[25].p.v,n[26].p.v,n[27].p.v,n[28].p.v),this.feFuncB.setAttribute("tableValues",e)),this.feFuncA&&(t||n[31].p._mdf||n[32].p._mdf||n[33].p._mdf||n[34].p._mdf||n[35].p._mdf)&&(e=this.getTableValue(n[31].p.v,n[32].p.v,n[33].p.v,n[34].p.v,n[35].p.v),this.feFuncA.setAttribute("tableValues",e));}};function SVGDropShadowEffect(t,e,n,i,o){var s=e.container.globalData.renderConfig.filterSize,l=e.data.fs||s;t.setAttribute("x",l.x||s.x),t.setAttribute("y",l.y||s.y),t.setAttribute("width",l.width||s.width),t.setAttribute("height",l.height||s.height),this.filterManager=e;var h=createNS("feGaussianBlur");h.setAttribute("in","SourceAlpha"),h.setAttribute("result",i+"_drop_shadow_1"),h.setAttribute("stdDeviation","0"),this.feGaussianBlur=h,t.appendChild(h);var p=createNS("feOffset");p.setAttribute("dx","25"),p.setAttribute("dy","0"),p.setAttribute("in",i+"_drop_shadow_1"),p.setAttribute("result",i+"_drop_shadow_2"),this.feOffset=p,t.appendChild(p);var u=createNS("feFlood");u.setAttribute("flood-color","#00ff00"),u.setAttribute("flood-opacity","1"),u.setAttribute("result",i+"_drop_shadow_3"),this.feFlood=u,t.appendChild(u);var m=createNS("feComposite");m.setAttribute("in",i+"_drop_shadow_3"),m.setAttribute("in2",i+"_drop_shadow_2"),m.setAttribute("operator","in"),m.setAttribute("result",i+"_drop_shadow_4"),t.appendChild(m);var b=this.createMergeNode(i,[i+"_drop_shadow_4",o]);t.appendChild(b);}extendPrototype([SVGComposableEffect],SVGDropShadowEffect),SVGDropShadowEffect.prototype.renderFrame=function(t){if(t||this.filterManager._mdf){if((t||this.filterManager.effectElements[4].p._mdf)&&this.feGaussianBlur.setAttribute("stdDeviation",this.filterManager.effectElements[4].p.v/4),t||this.filterManager.effectElements[0].p._mdf){var e=this.filterManager.effectElements[0].p.v;this.feFlood.setAttribute("flood-color",rgbToHex(Math.round(e[0]*255),Math.round(e[1]*255),Math.round(e[2]*255)));}if((t||this.filterManager.effectElements[1].p._mdf)&&this.feFlood.setAttribute("flood-opacity",this.filterManager.effectElements[1].p.v/255),t||this.filterManager.effectElements[2].p._mdf||this.filterManager.effectElements[3].p._mdf){var n=this.filterManager.effectElements[3].p.v,i=(this.filterManager.effectElements[2].p.v-90)*degToRads,o=n*Math.cos(i),s=n*Math.sin(i);this.feOffset.setAttribute("dx",o),this.feOffset.setAttribute("dy",s);}}};var _svgMatteSymbols=[];function SVGMatte3Effect(t,e,n){this.initialized=!1,this.filterManager=e,this.filterElem=t,this.elem=n,n.matteElement=createNS("g"),n.matteElement.appendChild(n.layerElement),n.matteElement.appendChild(n.transformedElement),n.baseElement=n.matteElement;}SVGMatte3Effect.prototype.findSymbol=function(t){for(var e=0,n=_svgMatteSymbols.length;e<n;){if(_svgMatteSymbols[e]===t)return _svgMatteSymbols[e];e+=1;}return null;},SVGMatte3Effect.prototype.replaceInParent=function(t,e){var n=t.layerElement.parentNode;if(n){for(var i=n.children,o=0,s=i.length;o<s&&i[o]!==t.layerElement;)o+=1;var l;o<=s-2&&(l=i[o+1]);var h=createNS("use");h.setAttribute("href","#"+e),l?n.insertBefore(h,l):n.appendChild(h);}},SVGMatte3Effect.prototype.setElementAsMask=function(t,e){if(!this.findSymbol(e)){var n=createElementID(),i=createNS("mask");i.setAttribute("id",e.layerId),i.setAttribute("mask-type","alpha"),_svgMatteSymbols.push(e);var o=t.globalData.defs;o.appendChild(i);var s=createNS("symbol");s.setAttribute("id",n),this.replaceInParent(e,n),s.appendChild(e.layerElement),o.appendChild(s);var l=createNS("use");l.setAttribute("href","#"+n),i.appendChild(l),e.data.hd=!1,e.show();}t.setMatte(e.layerId);},SVGMatte3Effect.prototype.initialize=function(){for(var t=this.filterManager.effectElements[0].p.v,e=this.elem.comp.elements,n=0,i=e.length;n<i;)e[n]&&e[n].data.ind===t&&this.setElementAsMask(this.elem,e[n]),n+=1;this.initialized=!0;},SVGMatte3Effect.prototype.renderFrame=function(){this.initialized||this.initialize();};function SVGGaussianBlurEffect(t,e,n,i){t.setAttribute("x","-100%"),t.setAttribute("y","-100%"),t.setAttribute("width","300%"),t.setAttribute("height","300%"),this.filterManager=e;var o=createNS("feGaussianBlur");o.setAttribute("result",i),t.appendChild(o),this.feGaussianBlur=o;}SVGGaussianBlurEffect.prototype.renderFrame=function(t){if(t||this.filterManager._mdf){var e=.3,n=this.filterManager.effectElements[0].p.v*e,i=this.filterManager.effectElements[1].p.v,o=i==3?0:n,s=i==2?0:n;this.feGaussianBlur.setAttribute("stdDeviation",o+" "+s);var l=this.filterManager.effectElements[2].p.v==1?"wrap":"duplicate";this.feGaussianBlur.setAttribute("edgeMode",l);}};function TransformEffect(){}TransformEffect.prototype.init=function(t){this.effectsManager=t,this.type=effectTypes.TRANSFORM_EFFECT,this.matrix=new Matrix(),this.opacity=-1,this._mdf=!1,this._opMdf=!1;},TransformEffect.prototype.renderFrame=function(t){if(this._opMdf=!1,this._mdf=!1,t||this.effectsManager._mdf){var e=this.effectsManager.effectElements,n=e[0].p.v,i=e[1].p.v,o=e[2].p.v===1,s=e[3].p.v,l=o?s:e[4].p.v,h=e[5].p.v,p=e[6].p.v,u=e[7].p.v;this.matrix.reset(),this.matrix.translate(-n[0],-n[1],n[2]),this.matrix.scale(l*.01,s*.01,1),this.matrix.rotate(-u*degToRads),this.matrix.skewFromAxis(-h*degToRads,(p+90)*degToRads),this.matrix.translate(i[0],i[1],0),this._mdf=!0,this.opacity!==e[8].p.v&&(this.opacity=e[8].p.v,this._opMdf=!0);}};function SVGTransformEffect(t,e){this.init(e);}extendPrototype([TransformEffect],SVGTransformEffect);function CVTransformEffect(t){this.init(t);}return extendPrototype([TransformEffect],CVTransformEffect),registerRenderer("canvas",CanvasRenderer),registerRenderer("html",HybridRenderer),registerRenderer("svg",SVGRenderer),ShapeModifiers.registerModifier("tm",TrimModifier),ShapeModifiers.registerModifier("pb",PuckerAndBloatModifier),ShapeModifiers.registerModifier("rp",RepeaterModifier),ShapeModifiers.registerModifier("rd",RoundCornersModifier),ShapeModifiers.registerModifier("zz",ZigZagModifier),ShapeModifiers.registerModifier("op",OffsetPathModifier),setExpressionsPlugin(Expressions),setExpressionInterfaces(getInterface),initialize$1(),initialize(),registerEffect$1(20,SVGTintFilter,!0),registerEffect$1(21,SVGFillFilter,!0),registerEffect$1(22,SVGStrokeEffect,!1),registerEffect$1(23,SVGTritoneFilter,!0),registerEffect$1(24,SVGProLevelsFilter,!0),registerEffect$1(25,SVGDropShadowEffect,!0),registerEffect$1(28,SVGMatte3Effect,!1),registerEffect$1(29,SVGGaussianBlurEffect,!0),registerEffect$1(35,SVGTransformEffect,!1),registerEffect(35,CVTransformEffect),lottie;});});var Wp=gc((ds,Zp)=>{"use strict";(function(t,e){typeof ds=="object"&&typeof Zp<"u"?e(ds):typeof define=="function"&&define.amd?define(["exports"],e):(t=typeof globalThis<"u"?globalThis:t||self,e(t.leaflet={}));})(ds,function(t){"use strict";var e="1.9.4";function n(r){var a,c,f,_;for(c=1,f=arguments.length;c<f;c++){_=arguments[c];for(a in _)r[a]=_[a];}return r;}var i=Object.create||function(){function r(){}return function(a){return r.prototype=a,new r();};}();function o(r,a){var c=Array.prototype.slice;if(r.bind)return r.bind.apply(r,c.call(arguments,1));var f=c.call(arguments,2);return function(){return r.apply(a,f.length?f.concat(c.call(arguments)):arguments);};}var s=0;function l(r){return"_leaflet_id"in r||(r._leaflet_id=++s),r._leaflet_id;}function h(r,a,c){var f,_,T,I;return I=function(){f=!1,_&&(T.apply(c,_),_=!1);},T=function(){f?_=arguments:(r.apply(c,arguments),setTimeout(I,a),f=!0);},T;}function p(r,a,c){var f=a[1],_=a[0],T=f-_;return r===f&&c?r:((r-_)%T+T)%T+_;}function u(){return!1;}function m(r,a){if(a===!1)return r;var c=Math.pow(10,a===void 0?6:a);return Math.round(r*c)/c;}function b(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"");}function d(r){return b(r).split(/\s+/);}function g(r,a){Object.prototype.hasOwnProperty.call(r,"options")||(r.options=r.options?i(r.options):{});for(var c in a)r.options[c]=a[c];return r.options;}function E(r,a,c){var f=[];for(var _ in r)f.push(encodeURIComponent(c?_.toUpperCase():_)+"="+encodeURIComponent(r[_]));return(!a||a.indexOf("?")===-1?"?":"&")+f.join("&");}var P=/\{ *([\w_ -]+) *\}/g;function k(r,a){return r.replace(P,function(c,f){var _=a[f];if(_===void 0)throw new Error("No value provided for variable "+c);return typeof _=="function"&&(_=_(a)),_;});}var v=Array.isArray||function(r){return Object.prototype.toString.call(r)==="[object Array]";};function C(r,a){for(var c=0;c<r.length;c++)if(r[c]===a)return c;return-1;}var y="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function S(r){return window["webkit"+r]||window["moz"+r]||window["ms"+r];}var O=0;function A(r){var a=+new Date(),c=Math.max(0,16-(a-O));return O=a+c,window.setTimeout(r,c);}var R=window.requestAnimationFrame||S("RequestAnimationFrame")||A,N=window.cancelAnimationFrame||S("CancelAnimationFrame")||S("CancelRequestAnimationFrame")||function(r){window.clearTimeout(r);};function H(r,a,c){if(c&&R===A)r.call(a);else return R.call(window,o(r,a));}function it(r){r&&N.call(window,r);}var nt={__proto__:null,extend:n,create:i,bind:o,get lastId(){return s;},stamp:l,throttle:h,wrapNum:p,falseFn:u,formatNum:m,trim:b,splitWords:d,setOptions:g,getParamString:E,template:k,isArray:v,indexOf:C,emptyImageUrl:y,requestFn:R,cancelFn:N,requestAnimFrame:H,cancelAnimFrame:it};function Z(){}Z.extend=function(r){var a=function(){g(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks();},c=a.__super__=this.prototype,f=i(c);f.constructor=a,a.prototype=f;for(var _ in this)Object.prototype.hasOwnProperty.call(this,_)&&_!=="prototype"&&_!=="__super__"&&(a[_]=this[_]);return r.statics&&n(a,r.statics),r.includes&&(rt(r.includes),n.apply(null,[f].concat(r.includes))),n(f,r),delete f.statics,delete f.includes,f.options&&(f.options=c.options?i(c.options):{},n(f.options,r.options)),f._initHooks=[],f.callInitHooks=function(){if(!this._initHooksCalled){c.callInitHooks&&c.callInitHooks.call(this),this._initHooksCalled=!0;for(var T=0,I=f._initHooks.length;T<I;T++)f._initHooks[T].call(this);}},a;},Z.include=function(r){var a=this.prototype.options;return n(this.prototype,r),r.options&&(this.prototype.options=a,this.mergeOptions(r.options)),this;},Z.mergeOptions=function(r){return n(this.prototype.options,r),this;},Z.addInitHook=function(r){var a=Array.prototype.slice.call(arguments,1),c=typeof r=="function"?r:function(){this[r].apply(this,a);};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(c),this;};function rt(r){if(!(typeof L>"u"||!L||!L.Mixin)){r=v(r)?r:[r];for(var a=0;a<r.length;a++)r[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack);}}var Q={on:function(r,a,c){if(typeof r=="object")for(var f in r)this._on(f,r[f],a);else{r=d(r);for(var _=0,T=r.length;_<T;_++)this._on(r[_],a,c);}return this;},off:function(r,a,c){if(!arguments.length)delete this._events;else if(typeof r=="object")for(var f in r)this._off(f,r[f],a);else{r=d(r);for(var _=arguments.length===1,T=0,I=r.length;T<I;T++)_?this._off(r[T]):this._off(r[T],a,c);}return this;},_on:function(r,a,c,f){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return;}if(this._listens(r,a,c)===!1){c===this&&(c=void 0);var _={fn:a,ctx:c};f&&(_.once=!0),this._events=this._events||{},this._events[r]=this._events[r]||[],this._events[r].push(_);}},_off:function(r,a,c){var f,_,T;if(this._events&&(f=this._events[r],!!f)){if(arguments.length===1){if(this._firingCount)for(_=0,T=f.length;_<T;_++)f[_].fn=u;delete this._events[r];return;}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return;}var I=this._listens(r,a,c);if(I!==!1){var V=f[I];this._firingCount&&(V.fn=u,this._events[r]=f=f.slice()),f.splice(I,1);}}},fire:function(r,a,c){if(!this.listens(r,c))return this;var f=n({},a,{type:r,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var _=this._events[r];if(_){this._firingCount=this._firingCount+1||1;for(var T=0,I=_.length;T<I;T++){var V=_[T],U=V.fn;V.once&&this.off(r,U,V.ctx),U.call(V.ctx||this,f);}this._firingCount--;}}return c&&this._propagateEvent(f),this;},listens:function(r,a,c,f){typeof r!="string"&&console.warn('"string" type argument expected');var _=a;typeof a!="function"&&(f=!!a,_=void 0,c=void 0);var T=this._events&&this._events[r];if(T&&T.length&&this._listens(r,_,c)!==!1)return!0;if(f){for(var I in this._eventParents)if(this._eventParents[I].listens(r,a,c,f))return!0;}return!1;},_listens:function(r,a,c){if(!this._events)return!1;var f=this._events[r]||[];if(!a)return!!f.length;c===this&&(c=void 0);for(var _=0,T=f.length;_<T;_++)if(f[_].fn===a&&f[_].ctx===c)return _;return!1;},once:function(r,a,c){if(typeof r=="object")for(var f in r)this._on(f,r[f],a,!0);else{r=d(r);for(var _=0,T=r.length;_<T;_++)this._on(r[_],a,c,!0);}return this;},addEventParent:function(r){return this._eventParents=this._eventParents||{},this._eventParents[l(r)]=r,this;},removeEventParent:function(r){return this._eventParents&&delete this._eventParents[l(r)],this;},_propagateEvent:function(r){for(var a in this._eventParents)this._eventParents[a].fire(r.type,n({layer:r.target,propagatedFrom:r.target},r),!0);}};Q.addEventListener=Q.on,Q.removeEventListener=Q.clearAllEventListeners=Q.off,Q.addOneTimeEventListener=Q.once,Q.fireEvent=Q.fire,Q.hasEventListeners=Q.listens;var W=Z.extend(Q);function w(r,a,c){this.x=c?Math.round(r):r,this.y=c?Math.round(a):a;}var F=Math.trunc||function(r){return r>0?Math.floor(r):Math.ceil(r);};w.prototype={clone:function(){return new w(this.x,this.y);},add:function(r){return this.clone()._add(x(r));},_add:function(r){return this.x+=r.x,this.y+=r.y,this;},subtract:function(r){return this.clone()._subtract(x(r));},_subtract:function(r){return this.x-=r.x,this.y-=r.y,this;},divideBy:function(r){return this.clone()._divideBy(r);},_divideBy:function(r){return this.x/=r,this.y/=r,this;},multiplyBy:function(r){return this.clone()._multiplyBy(r);},_multiplyBy:function(r){return this.x*=r,this.y*=r,this;},scaleBy:function(r){return new w(this.x*r.x,this.y*r.y);},unscaleBy:function(r){return new w(this.x/r.x,this.y/r.y);},round:function(){return this.clone()._round();},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this;},floor:function(){return this.clone()._floor();},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this;},ceil:function(){return this.clone()._ceil();},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this;},trunc:function(){return this.clone()._trunc();},_trunc:function(){return this.x=F(this.x),this.y=F(this.y),this;},distanceTo:function(r){r=x(r);var a=r.x-this.x,c=r.y-this.y;return Math.sqrt(a*a+c*c);},equals:function(r){return r=x(r),r.x===this.x&&r.y===this.y;},contains:function(r){return r=x(r),Math.abs(r.x)<=Math.abs(this.x)&&Math.abs(r.y)<=Math.abs(this.y);},toString:function(){return"Point("+m(this.x)+", "+m(this.y)+")";}};function x(r,a,c){return r instanceof w?r:v(r)?new w(r[0],r[1]):r==null?r:typeof r=="object"&&"x"in r&&"y"in r?new w(r.x,r.y):new w(r,a,c);}function M(r,a){if(r)for(var c=a?[r,a]:r,f=0,_=c.length;f<_;f++)this.extend(c[f]);}M.prototype={extend:function(r){var a,c;if(!r)return this;if(r instanceof w||typeof r[0]=="number"||"x"in r)a=c=x(r);else if(r=z(r),a=r.min,c=r.max,!a||!c)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=c.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(c.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(c.y,this.max.y)),this;},getCenter:function(r){return x((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,r);},getBottomLeft:function(){return x(this.min.x,this.max.y);},getTopRight:function(){return x(this.max.x,this.min.y);},getTopLeft:function(){return this.min;},getBottomRight:function(){return this.max;},getSize:function(){return this.max.subtract(this.min);},contains:function(r){var a,c;return typeof r[0]=="number"||r instanceof w?r=x(r):r=z(r),r instanceof M?(a=r.min,c=r.max):a=c=r,a.x>=this.min.x&&c.x<=this.max.x&&a.y>=this.min.y&&c.y<=this.max.y;},intersects:function(r){r=z(r);var a=this.min,c=this.max,f=r.min,_=r.max,T=_.x>=a.x&&f.x<=c.x,I=_.y>=a.y&&f.y<=c.y;return T&&I;},overlaps:function(r){r=z(r);var a=this.min,c=this.max,f=r.min,_=r.max,T=_.x>a.x&&f.x<c.x,I=_.y>a.y&&f.y<c.y;return T&&I;},isValid:function(){return!!(this.min&&this.max);},pad:function(r){var a=this.min,c=this.max,f=Math.abs(a.x-c.x)*r,_=Math.abs(a.y-c.y)*r;return z(x(a.x-f,a.y-_),x(c.x+f,c.y+_));},equals:function(r){return r?(r=z(r),this.min.equals(r.getTopLeft())&&this.max.equals(r.getBottomRight())):!1;}};function z(r,a){return!r||r instanceof M?r:new M(r,a);}function B(r,a){if(r)for(var c=a?[r,a]:r,f=0,_=c.length;f<_;f++)this.extend(c[f]);}B.prototype={extend:function(r){var a=this._southWest,c=this._northEast,f,_;if(r instanceof tt)f=r,_=r;else if(r instanceof B){if(f=r._southWest,_=r._northEast,!f||!_)return this;}else return r?this.extend(K(r)||J(r)):this;return!a&&!c?(this._southWest=new tt(f.lat,f.lng),this._northEast=new tt(_.lat,_.lng)):(a.lat=Math.min(f.lat,a.lat),a.lng=Math.min(f.lng,a.lng),c.lat=Math.max(_.lat,c.lat),c.lng=Math.max(_.lng,c.lng)),this;},pad:function(r){var a=this._southWest,c=this._northEast,f=Math.abs(a.lat-c.lat)*r,_=Math.abs(a.lng-c.lng)*r;return new B(new tt(a.lat-f,a.lng-_),new tt(c.lat+f,c.lng+_));},getCenter:function(){return new tt((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2);},getSouthWest:function(){return this._southWest;},getNorthEast:function(){return this._northEast;},getNorthWest:function(){return new tt(this.getNorth(),this.getWest());},getSouthEast:function(){return new tt(this.getSouth(),this.getEast());},getWest:function(){return this._southWest.lng;},getSouth:function(){return this._southWest.lat;},getEast:function(){return this._northEast.lng;},getNorth:function(){return this._northEast.lat;},contains:function(r){typeof r[0]=="number"||r instanceof tt||"lat"in r?r=K(r):r=J(r);var a=this._southWest,c=this._northEast,f,_;return r instanceof B?(f=r.getSouthWest(),_=r.getNorthEast()):f=_=r,f.lat>=a.lat&&_.lat<=c.lat&&f.lng>=a.lng&&_.lng<=c.lng;},intersects:function(r){r=J(r);var a=this._southWest,c=this._northEast,f=r.getSouthWest(),_=r.getNorthEast(),T=_.lat>=a.lat&&f.lat<=c.lat,I=_.lng>=a.lng&&f.lng<=c.lng;return T&&I;},overlaps:function(r){r=J(r);var a=this._southWest,c=this._northEast,f=r.getSouthWest(),_=r.getNorthEast(),T=_.lat>a.lat&&f.lat<c.lat,I=_.lng>a.lng&&f.lng<c.lng;return T&&I;},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",");},equals:function(r,a){return r?(r=J(r),this._southWest.equals(r.getSouthWest(),a)&&this._northEast.equals(r.getNorthEast(),a)):!1;},isValid:function(){return!!(this._southWest&&this._northEast);}};function J(r,a){return r instanceof B?r:new B(r,a);}function tt(r,a,c){if(isNaN(r)||isNaN(a))throw new Error("Invalid LatLng object: ("+r+", "+a+")");this.lat=+r,this.lng=+a,c!==void 0&&(this.alt=+c);}tt.prototype={equals:function(r,a){if(!r)return!1;r=K(r);var c=Math.max(Math.abs(this.lat-r.lat),Math.abs(this.lng-r.lng));return c<=(a===void 0?1e-9:a);},toString:function(r){return"LatLng("+m(this.lat,r)+", "+m(this.lng,r)+")";},distanceTo:function(r){return xt.distance(this,K(r));},wrap:function(){return xt.wrapLatLng(this);},toBounds:function(r){var a=180*r/40075017,c=a/Math.cos(Math.PI/180*this.lat);return J([this.lat-a,this.lng-c],[this.lat+a,this.lng+c]);},clone:function(){return new tt(this.lat,this.lng,this.alt);}};function K(r,a,c){return r instanceof tt?r:v(r)&&typeof r[0]!="object"?r.length===3?new tt(r[0],r[1],r[2]):r.length===2?new tt(r[0],r[1]):null:r==null?r:typeof r=="object"&&"lat"in r?new tt(r.lat,"lng"in r?r.lng:r.lon,r.alt):a===void 0?null:new tt(r,a,c);}var Pt={latLngToPoint:function(r,a){var c=this.projection.project(r),f=this.scale(a);return this.transformation._transform(c,f);},pointToLatLng:function(r,a){var c=this.scale(a),f=this.transformation.untransform(r,c);return this.projection.unproject(f);},project:function(r){return this.projection.project(r);},unproject:function(r){return this.projection.unproject(r);},scale:function(r){return 256*Math.pow(2,r);},zoom:function(r){return Math.log(r/256)/Math.LN2;},getProjectedBounds:function(r){if(this.infinite)return null;var a=this.projection.bounds,c=this.scale(r),f=this.transformation.transform(a.min,c),_=this.transformation.transform(a.max,c);return new M(f,_);},infinite:!1,wrapLatLng:function(r){var a=this.wrapLng?p(r.lng,this.wrapLng,!0):r.lng,c=this.wrapLat?p(r.lat,this.wrapLat,!0):r.lat,f=r.alt;return new tt(c,a,f);},wrapLatLngBounds:function(r){var a=r.getCenter(),c=this.wrapLatLng(a),f=a.lat-c.lat,_=a.lng-c.lng;if(f===0&&_===0)return r;var T=r.getSouthWest(),I=r.getNorthEast(),V=new tt(T.lat-f,T.lng-_),U=new tt(I.lat-f,I.lng-_);return new B(V,U);}},xt=n({},Pt,{wrapLng:[-180,180],R:6371e3,distance:function(r,a){var c=Math.PI/180,f=r.lat*c,_=a.lat*c,T=Math.sin((a.lat-r.lat)*c/2),I=Math.sin((a.lng-r.lng)*c/2),V=T*T+Math.cos(f)*Math.cos(_)*I*I,U=2*Math.atan2(Math.sqrt(V),Math.sqrt(1-V));return this.R*U;}}),Xt=6378137,fe={R:Xt,MAX_LATITUDE:85.0511287798,project:function(r){var a=Math.PI/180,c=this.MAX_LATITUDE,f=Math.max(Math.min(c,r.lat),-c),_=Math.sin(f*a);return new w(this.R*r.lng*a,this.R*Math.log((1+_)/(1-_))/2);},unproject:function(r){var a=180/Math.PI;return new tt((2*Math.atan(Math.exp(r.y/this.R))-Math.PI/2)*a,r.x*a/this.R);},bounds:function(){var r=Xt*Math.PI;return new M([-r,-r],[r,r]);}()};function Re(r,a,c,f){if(v(r)){this._a=r[0],this._b=r[1],this._c=r[2],this._d=r[3];return;}this._a=r,this._b=a,this._c=c,this._d=f;}Re.prototype={transform:function(r,a){return this._transform(r.clone(),a);},_transform:function(r,a){return a=a||1,r.x=a*(this._a*r.x+this._b),r.y=a*(this._c*r.y+this._d),r;},untransform:function(r,a){return a=a||1,new w((r.x/a-this._b)/this._a,(r.y/a-this._d)/this._c);}};function ee(r,a,c,f){return new Re(r,a,c,f);}var Qt=n({},xt,{code:"EPSG:3857",projection:fe,transformation:function(){var r=.5/(Math.PI*fe.R);return ee(r,.5,-r,.5);}()}),Te=n({},Qt,{code:"EPSG:900913"});function Rt(r){return document.createElementNS("http://www.w3.org/2000/svg",r);}function lt(r,a){var c="",f,_,T,I,V,U;for(f=0,T=r.length;f<T;f++){for(V=r[f],_=0,I=V.length;_<I;_++)U=V[_],c+=(_?"L":"M")+U.x+" "+U.y;c+=a?pt.svg?"z":"x":"";}return c||"M0 0";}var $e=document.documentElement.style,Ge="ActiveXObject"in window,hn=Ge&&!document.addEventListener,Ue="msLaunchUri"in navigator&&!("documentMode"in document),He=Cn("webkit"),Xe=Cn("android"),ge=Cn("android 2")||Cn("android 3"),yn=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Pn=Xe&&Cn("Google")&&yn<537&&!("AudioNode"in window),we=!!window.opera,pn=!Ue&&Cn("chrome"),Fe=Cn("gecko")&&!He&&!we&&!Ge,Ln=!pn&&Cn("safari"),ii=Cn("phantom"),ri="OTransition"in $e,Ai=navigator.platform.indexOf("Win")===0,ml=Ge&&"transition"in $e,Ts="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix()&&!ge,gl="MozPerspective"in $e,Xp=!window.L_DISABLE_3D&&(ml||Ts||gl)&&!ri&&!ii,lr=typeof orientation<"u"||Cn("mobile"),Jp=lr&&He,Kp=lr&&Ts,_l=!window.PointerEvent&&window.MSPointerEvent,vl=!!(window.PointerEvent||_l),yl="ontouchstart"in window||!!window.TouchEvent,Qp=!window.L_NO_TOUCH&&(yl||vl),tf=lr&&we,ef=lr&&Fe,nf=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,rf=function(){var r=!1;try{var a=Object.defineProperty({},"passive",{get:function(){r=!0;}});window.addEventListener("testPassiveEventSupport",u,a),window.removeEventListener("testPassiveEventSupport",u,a);}catch{}return r;}(),of=function(){return!!document.createElement("canvas").getContext;}(),ws=!!(document.createElementNS&&Rt("svg").createSVGRect),sf=!!ws&&function(){var r=document.createElement("div");return r.innerHTML="<svg/>",(r.firstChild&&r.firstChild.namespaceURI)==="http://www.w3.org/2000/svg";}(),af=!ws&&function(){try{var r=document.createElement("div");r.innerHTML='<v:shape adj="1"/>';var a=r.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object";}catch{return!1;}}(),lf=navigator.platform.indexOf("Mac")===0,cf=navigator.platform.indexOf("Linux")===0;function Cn(r){return navigator.userAgent.toLowerCase().indexOf(r)>=0;}var pt={ie:Ge,ielt9:hn,edge:Ue,webkit:He,android:Xe,android23:ge,androidStock:Pn,opera:we,chrome:pn,gecko:Fe,safari:Ln,phantom:ii,opera12:ri,win:Ai,ie3d:ml,webkit3d:Ts,gecko3d:gl,any3d:Xp,mobile:lr,mobileWebkit:Jp,mobileWebkit3d:Kp,msPointer:_l,pointer:vl,touch:Qp,touchNative:yl,mobileOpera:tf,mobileGecko:ef,retina:nf,passiveEvents:rf,canvas:of,svg:ws,vml:af,inlineSvg:sf,mac:lf,linux:cf},Pl=pt.msPointer?"MSPointerDown":"pointerdown",Cl=pt.msPointer?"MSPointerMove":"pointermove",xl=pt.msPointer?"MSPointerUp":"pointerup",bl=pt.msPointer?"MSPointerCancel":"pointercancel",Os={touchstart:Pl,touchmove:Cl,touchend:xl,touchcancel:bl},El={touchstart:mf,touchmove:qr,touchend:qr,touchcancel:qr},Ii={},Sl=!1;function hf(r,a,c){return a==="touchstart"&&df(),El[a]?(c=El[a].bind(this,c),r.addEventListener(Os[a],c,!1),c):(console.warn("wrong event specified:",a),u);}function pf(r,a,c){if(!Os[a]){console.warn("wrong event specified:",a);return;}r.removeEventListener(Os[a],c,!1);}function ff(r){Ii[r.pointerId]=r;}function uf(r){Ii[r.pointerId]&&(Ii[r.pointerId]=r);}function Ml(r){delete Ii[r.pointerId];}function df(){Sl||(document.addEventListener(Pl,ff,!0),document.addEventListener(Cl,uf,!0),document.addEventListener(xl,Ml,!0),document.addEventListener(bl,Ml,!0),Sl=!0);}function qr(r,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var c in Ii)a.touches.push(Ii[c]);a.changedTouches=[a],r(a);}}function mf(r,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&_e(a),qr(r,a);}function gf(r){var a={},c,f;for(f in r)c=r[f],a[f]=c&&c.bind?c.bind(r):c;return r=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a;}var _f=200;function vf(r,a){r.addEventListener("dblclick",a);var c=0,f;function _(T){if(T.detail!==1){f=T.detail;return;}if(!(T.pointerType==="mouse"||T.sourceCapabilities&&!T.sourceCapabilities.firesTouchEvents)){var I=Al(T);if(!(I.some(function(U){return U instanceof HTMLLabelElement&&U.attributes.for;})&&!I.some(function(U){return U instanceof HTMLInputElement||U instanceof HTMLSelectElement;}))){var V=Date.now();V-c<=_f?(f++,f===2&&a(gf(T))):f=1,c=V;}}}return r.addEventListener("click",_),{dblclick:a,simDblclick:_};}function yf(r,a){r.removeEventListener("dblclick",a.dblclick),r.removeEventListener("click",a.simDblclick);}var ks=Jr(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),cr=Jr(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),Tl=cr==="webkitTransition"||cr==="OTransition"?cr+"End":"transitionend";function wl(r){return typeof r=="string"?document.getElementById(r):r;}function hr(r,a){var c=r.style[a]||r.currentStyle&&r.currentStyle[a];if((!c||c==="auto")&&document.defaultView){var f=document.defaultView.getComputedStyle(r,null);c=f?f[a]:null;}return c==="auto"?null:c;}function Lt(r,a,c){var f=document.createElement(r);return f.className=a||"",c&&c.appendChild(f),f;}function Zt(r){var a=r.parentNode;a&&a.removeChild(r);}function Yr(r){for(;r.firstChild;)r.removeChild(r.firstChild);}function Li(r){var a=r.parentNode;a&&a.lastChild!==r&&a.appendChild(r);}function Ri(r){var a=r.parentNode;a&&a.firstChild!==r&&a.insertBefore(r,a.firstChild);}function As(r,a){if(r.classList!==void 0)return r.classList.contains(a);var c=Xr(r);return c.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(c);}function bt(r,a){if(r.classList!==void 0)for(var c=d(a),f=0,_=c.length;f<_;f++)r.classList.add(c[f]);else if(!As(r,a)){var T=Xr(r);Is(r,(T?T+" ":"")+a);}}function te(r,a){r.classList!==void 0?r.classList.remove(a):Is(r,b((" "+Xr(r)+" ").replace(" "+a+" "," ")));}function Is(r,a){r.className.baseVal===void 0?r.className=a:r.className.baseVal=a;}function Xr(r){return r.correspondingElement&&(r=r.correspondingElement),r.className.baseVal===void 0?r.className:r.className.baseVal;}function Je(r,a){"opacity"in r.style?r.style.opacity=a:"filter"in r.style&&Pf(r,a);}function Pf(r,a){var c=!1,f="DXImageTransform.Microsoft.Alpha";try{c=r.filters.item(f);}catch{if(a===1)return;}a=Math.round(a*100),c?(c.Enabled=a!==100,c.Opacity=a):r.style.filter+=" progid:"+f+"(opacity="+a+")";}function Jr(r){for(var a=document.documentElement.style,c=0;c<r.length;c++)if(r[c]in a)return r[c];return!1;}function oi(r,a,c){var f=a||new w(0,0);r.style[ks]=(pt.ie3d?"translate("+f.x+"px,"+f.y+"px)":"translate3d("+f.x+"px,"+f.y+"px,0)")+(c?" scale("+c+")":"");}function ne(r,a){r._leaflet_pos=a,pt.any3d?oi(r,a):(r.style.left=a.x+"px",r.style.top=a.y+"px");}function si(r){return r._leaflet_pos||new w(0,0);}var pr,fr,Ls;if("onselectstart"in document)pr=function(){Ct(window,"selectstart",_e);},fr=function(){$t(window,"selectstart",_e);};else{var ur=Jr(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);pr=function(){if(ur){var r=document.documentElement.style;Ls=r[ur],r[ur]="none";}},fr=function(){ur&&(document.documentElement.style[ur]=Ls,Ls=void 0);};}function Rs(){Ct(window,"dragstart",_e);}function Fs(){$t(window,"dragstart",_e);}var Kr,Ns;function Bs(r){for(;r.tabIndex===-1;)r=r.parentNode;r.style&&(Qr(),Kr=r,Ns=r.style.outlineStyle,r.style.outlineStyle="none",Ct(window,"keydown",Qr));}function Qr(){Kr&&(Kr.style.outlineStyle=Ns,Kr=void 0,Ns=void 0,$t(window,"keydown",Qr));}function Ol(r){do r=r.parentNode;while((!r.offsetWidth||!r.offsetHeight)&&r!==document.body);return r;}function Ds(r){var a=r.getBoundingClientRect();return{x:a.width/r.offsetWidth||1,y:a.height/r.offsetHeight||1,boundingClientRect:a};}var Cf={__proto__:null,TRANSFORM:ks,TRANSITION:cr,TRANSITION_END:Tl,get:wl,getStyle:hr,create:Lt,remove:Zt,empty:Yr,toFront:Li,toBack:Ri,hasClass:As,addClass:bt,removeClass:te,setClass:Is,getClass:Xr,setOpacity:Je,testProp:Jr,setTransform:oi,setPosition:ne,getPosition:si,get disableTextSelection(){return pr;},get enableTextSelection(){return fr;},disableImageDrag:Rs,enableImageDrag:Fs,preventOutline:Bs,restoreOutline:Qr,getSizedParentNode:Ol,getScale:Ds};function Ct(r,a,c,f){if(a&&typeof a=="object")for(var _ in a)Vs(r,_,a[_],c);else{a=d(a);for(var T=0,I=a.length;T<I;T++)Vs(r,a[T],c,f);}return this;}var xn="_leaflet_events";function $t(r,a,c,f){if(arguments.length===1)kl(r),delete r[xn];else if(a&&typeof a=="object")for(var _ in a)$s(r,_,a[_],c);else if(a=d(a),arguments.length===2)kl(r,function(V){return C(a,V)!==-1;});else for(var T=0,I=a.length;T<I;T++)$s(r,a[T],c,f);return this;}function kl(r,a){for(var c in r[xn]){var f=c.split(/\d/)[0];(!a||a(f))&&$s(r,f,null,null,c);}}var zs={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Vs(r,a,c,f){var _=a+l(c)+(f?"_"+l(f):"");if(r[xn]&&r[xn][_])return this;var T=function(V){return c.call(f||r,V||window.event);},I=T;!pt.touchNative&&pt.pointer&&a.indexOf("touch")===0?T=hf(r,a,T):pt.touch&&a==="dblclick"?T=vf(r,T):"addEventListener"in r?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?r.addEventListener(zs[a]||a,T,pt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(T=function(V){V=V||window.event,Us(r,V)&&I(V);},r.addEventListener(zs[a],T,!1)):r.addEventListener(a,I,!1):r.attachEvent("on"+a,T),r[xn]=r[xn]||{},r[xn][_]=T;}function $s(r,a,c,f,_){_=_||a+l(c)+(f?"_"+l(f):"");var T=r[xn]&&r[xn][_];if(!T)return this;!pt.touchNative&&pt.pointer&&a.indexOf("touch")===0?pf(r,a,T):pt.touch&&a==="dblclick"?yf(r,T):"removeEventListener"in r?r.removeEventListener(zs[a]||a,T,!1):r.detachEvent("on"+a,T),r[xn][_]=null;}function ai(r){return r.stopPropagation?r.stopPropagation():r.originalEvent?r.originalEvent._stopped=!0:r.cancelBubble=!0,this;}function Gs(r){return Vs(r,"wheel",ai),this;}function dr(r){return Ct(r,"mousedown touchstart dblclick contextmenu",ai),r._leaflet_disable_click=!0,this;}function _e(r){return r.preventDefault?r.preventDefault():r.returnValue=!1,this;}function li(r){return _e(r),ai(r),this;}function Al(r){if(r.composedPath)return r.composedPath();for(var a=[],c=r.target;c;)a.push(c),c=c.parentNode;return a;}function Il(r,a){if(!a)return new w(r.clientX,r.clientY);var c=Ds(a),f=c.boundingClientRect;return new w((r.clientX-f.left)/c.x-a.clientLeft,(r.clientY-f.top)/c.y-a.clientTop);}var xf=pt.linux&&pt.chrome?window.devicePixelRatio:pt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Ll(r){return pt.edge?r.wheelDeltaY/2:r.deltaY&&r.deltaMode===0?-r.deltaY/xf:r.deltaY&&r.deltaMode===1?-r.deltaY*20:r.deltaY&&r.deltaMode===2?-r.deltaY*60:r.deltaX||r.deltaZ?0:r.wheelDelta?(r.wheelDeltaY||r.wheelDelta)/2:r.detail&&Math.abs(r.detail)<32765?-r.detail*20:r.detail?r.detail/-32765*60:0;}function Us(r,a){var c=a.relatedTarget;if(!c)return!0;try{for(;c&&c!==r;)c=c.parentNode;}catch{return!1;}return c!==r;}var bf={__proto__:null,on:Ct,off:$t,stopPropagation:ai,disableScrollPropagation:Gs,disableClickPropagation:dr,preventDefault:_e,stop:li,getPropagationPath:Al,getMousePosition:Il,getWheelDelta:Ll,isExternalTarget:Us,addListener:Ct,removeListener:$t},Rl=W.extend({run:function(r,a,c,f){this.stop(),this._el=r,this._inProgress=!0,this._duration=c||.25,this._easeOutPower=1/Math.max(f||.5,.2),this._startPos=si(r),this._offset=a.subtract(this._startPos),this._startTime=+new Date(),this.fire("start"),this._animate();},stop:function(){this._inProgress&&(this._step(!0),this._complete());},_animate:function(){this._animId=H(this._animate,this),this._step();},_step:function(r){var a=+new Date()-this._startTime,c=this._duration*1e3;a<c?this._runFrame(this._easeOut(a/c),r):(this._runFrame(1),this._complete());},_runFrame:function(r,a){var c=this._startPos.add(this._offset.multiplyBy(r));a&&c._round(),ne(this._el,c),this.fire("step");},_complete:function(){it(this._animId),this._inProgress=!1,this.fire("end");},_easeOut:function(r){return 1-Math.pow(1-r,this._easeOutPower);}}),At=W.extend({options:{crs:Qt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(r,a){a=g(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(r),this._initLayout(),this._onResize=o(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(K(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=cr&&pt.any3d&&!pt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),Ct(this._proxy,Tl,this._catchTransitionEnd,this)),this._addLayers(this.options.layers);},setView:function(r,a,c){if(a=a===void 0?this._zoom:this._limitZoom(a),r=this._limitCenter(K(r),a,this.options.maxBounds),c=c||{},this._stop(),this._loaded&&!c.reset&&c!==!0){c.animate!==void 0&&(c.zoom=n({animate:c.animate},c.zoom),c.pan=n({animate:c.animate,duration:c.duration},c.pan));var f=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(r,a,c.zoom):this._tryAnimatedPan(r,c.pan);if(f)return clearTimeout(this._sizeTimer),this;}return this._resetView(r,a,c.pan&&c.pan.noMoveStart),this;},setZoom:function(r,a){return this._loaded?this.setView(this.getCenter(),r,{zoom:a}):(this._zoom=r,this);},zoomIn:function(r,a){return r=r||(pt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+r,a);},zoomOut:function(r,a){return r=r||(pt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-r,a);},setZoomAround:function(r,a,c){var f=this.getZoomScale(a),_=this.getSize().divideBy(2),T=r instanceof w?r:this.latLngToContainerPoint(r),I=T.subtract(_).multiplyBy(1-1/f),V=this.containerPointToLatLng(_.add(I));return this.setView(V,a,{zoom:c});},_getBoundsCenterZoom:function(r,a){a=a||{},r=r.getBounds?r.getBounds():J(r);var c=x(a.paddingTopLeft||a.padding||[0,0]),f=x(a.paddingBottomRight||a.padding||[0,0]),_=this.getBoundsZoom(r,!1,c.add(f));if(_=typeof a.maxZoom=="number"?Math.min(a.maxZoom,_):_,_===1/0)return{center:r.getCenter(),zoom:_};var T=f.subtract(c).divideBy(2),I=this.project(r.getSouthWest(),_),V=this.project(r.getNorthEast(),_),U=this.unproject(I.add(V).divideBy(2).add(T),_);return{center:U,zoom:_};},fitBounds:function(r,a){if(r=J(r),!r.isValid())throw new Error("Bounds are not valid.");var c=this._getBoundsCenterZoom(r,a);return this.setView(c.center,c.zoom,a);},fitWorld:function(r){return this.fitBounds([[-90,-180],[90,180]],r);},panTo:function(r,a){return this.setView(r,this._zoom,{pan:a});},panBy:function(r,a){if(r=x(r).round(),a=a||{},!r.x&&!r.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(r))return this._resetView(this.unproject(this.project(this.getCenter()).add(r)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Rl(),this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){bt(this._mapPane,"leaflet-pan-anim");var c=this._getMapPanePos().subtract(r).round();this._panAnim.run(this._mapPane,c,a.duration||.25,a.easeLinearity);}else this._rawPanBy(r),this.fire("move").fire("moveend");return this;},flyTo:function(r,a,c){if(c=c||{},c.animate===!1||!pt.any3d)return this.setView(r,a,c);this._stop();var f=this.project(this.getCenter()),_=this.project(r),T=this.getSize(),I=this._zoom;r=K(r),a=a===void 0?I:a;var V=Math.max(T.x,T.y),U=V*this.getZoomScale(I,a),q=_.distanceTo(f)||1,ot=1.42,ut=ot*ot;function Mt(ie){var po=ie?-1:1,pu=ie?U:V,fu=U*U-V*V+po*ut*ut*q*q,uu=2*pu*ut*q,ta=fu/uu,dc=Math.sqrt(ta*ta+1)-ta,du=dc<1e-9?-18:Math.log(dc);return du;}function Oe(ie){return(Math.exp(ie)-Math.exp(-ie))/2;}function ue(ie){return(Math.exp(ie)+Math.exp(-ie))/2;}function Qe(ie){return Oe(ie)/ue(ie);}var Ne=Mt(0);function Vi(ie){return V*(ue(Ne)/ue(Ne+ot*ie));}function au(ie){return V*(ue(Ne)*Qe(Ne+ot*ie)-Oe(Ne))/ut;}function lu(ie){return 1-Math.pow(1-ie,1.5);}var cu=Date.now(),fc=(Mt(1)-Ne)/ot,hu=c.duration?1e3*c.duration:1e3*fc*.8;function uc(){var ie=(Date.now()-cu)/hu,po=lu(ie)*fc;ie<=1?(this._flyToFrame=H(uc,this),this._move(this.unproject(f.add(_.subtract(f).multiplyBy(au(po)/q)),I),this.getScaleZoom(V/Vi(po),I),{flyTo:!0})):this._move(r,a)._moveEnd(!0);}return this._moveStart(!0,c.noMoveStart),uc.call(this),this;},flyToBounds:function(r,a){var c=this._getBoundsCenterZoom(r,a);return this.flyTo(c.center,c.zoom,a);},setMaxBounds:function(r){return r=J(r),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),r.isValid()?(this.options.maxBounds=r,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this);},setMinZoom:function(r){var a=this.options.minZoom;return this.options.minZoom=r,this._loaded&&a!==r&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(r):this;},setMaxZoom:function(r){var a=this.options.maxZoom;return this.options.maxZoom=r,this._loaded&&a!==r&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(r):this;},panInsideBounds:function(r,a){this._enforcingBounds=!0;var c=this.getCenter(),f=this._limitCenter(c,this._zoom,J(r));return c.equals(f)||this.panTo(f,a),this._enforcingBounds=!1,this;},panInside:function(r,a){a=a||{};var c=x(a.paddingTopLeft||a.padding||[0,0]),f=x(a.paddingBottomRight||a.padding||[0,0]),_=this.project(this.getCenter()),T=this.project(r),I=this.getPixelBounds(),V=z([I.min.add(c),I.max.subtract(f)]),U=V.getSize();if(!V.contains(T)){this._enforcingBounds=!0;var q=T.subtract(V.getCenter()),ot=V.extend(T).getSize().subtract(U);_.x+=q.x<0?-ot.x:ot.x,_.y+=q.y<0?-ot.y:ot.y,this.panTo(this.unproject(_),a),this._enforcingBounds=!1;}return this;},invalidateSize:function(r){if(!this._loaded)return this;r=n({animate:!1,pan:!0},r===!0?{animate:!0}:r);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var c=this.getSize(),f=a.divideBy(2).round(),_=c.divideBy(2).round(),T=f.subtract(_);return!T.x&&!T.y?this:(r.animate&&r.pan?this.panBy(T):(r.pan&&this._rawPanBy(T),this.fire("move"),r.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:c}));},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop();},locate:function(r){if(r=this._locateOptions=n({timeout:1e4,watch:!1},r),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=o(this._handleGeolocationResponse,this),c=o(this._handleGeolocationError,this);return r.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,c,r):navigator.geolocation.getCurrentPosition(a,c,r),this;},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this;},_handleGeolocationError:function(r){if(this._container._leaflet_id){var a=r.code,c=r.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+c+"."});}},_handleGeolocationResponse:function(r){if(this._container._leaflet_id){var a=r.coords.latitude,c=r.coords.longitude,f=new tt(a,c),_=f.toBounds(r.coords.accuracy*2),T=this._locateOptions;if(T.setView){var I=this.getBoundsZoom(_);this.setView(f,T.maxZoom?Math.min(I,T.maxZoom):I);}var V={latlng:f,bounds:_,timestamp:r.timestamp};for(var U in r.coords)typeof r.coords[U]=="number"&&(V[U]=r.coords[U]);this.fire("locationfound",V);}},addHandler:function(r,a){if(!a)return this;var c=this[r]=new a(this);return this._handlers.push(c),this.options[r]&&c.enable(),this;},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId;}catch{this._container._leaflet_id=void 0,this._containerId=void 0;}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),Zt(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(it(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var r;for(r in this._layers)this._layers[r].remove();for(r in this._panes)Zt(this._panes[r]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this;},createPane:function(r,a){var c="leaflet-pane"+(r?" leaflet-"+r.replace("Pane","")+"-pane":""),f=Lt("div",c,a||this._mapPane);return r&&(this._panes[r]=f),f;},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint());},getZoom:function(){return this._zoom;},getBounds:function(){var r=this.getPixelBounds(),a=this.unproject(r.getBottomLeft()),c=this.unproject(r.getTopRight());return new B(a,c);},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom;},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom;},getBoundsZoom:function(r,a,c){r=J(r),c=x(c||[0,0]);var f=this.getZoom()||0,_=this.getMinZoom(),T=this.getMaxZoom(),I=r.getNorthWest(),V=r.getSouthEast(),U=this.getSize().subtract(c),q=z(this.project(V,f),this.project(I,f)).getSize(),ot=pt.any3d?this.options.zoomSnap:1,ut=U.x/q.x,Mt=U.y/q.y,Oe=a?Math.max(ut,Mt):Math.min(ut,Mt);return f=this.getScaleZoom(Oe,f),ot&&(f=Math.round(f/(ot/100))*(ot/100),f=a?Math.ceil(f/ot)*ot:Math.floor(f/ot)*ot),Math.max(_,Math.min(T,f));},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new w(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone();},getPixelBounds:function(r,a){var c=this._getTopLeftPoint(r,a);return new M(c,c.add(this.getSize()));},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin;},getPixelWorldBounds:function(r){return this.options.crs.getProjectedBounds(r===void 0?this.getZoom():r);},getPane:function(r){return typeof r=="string"?this._panes[r]:r;},getPanes:function(){return this._panes;},getContainer:function(){return this._container;},getZoomScale:function(r,a){var c=this.options.crs;return a=a===void 0?this._zoom:a,c.scale(r)/c.scale(a);},getScaleZoom:function(r,a){var c=this.options.crs;a=a===void 0?this._zoom:a;var f=c.zoom(r*c.scale(a));return isNaN(f)?1/0:f;},project:function(r,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(K(r),a);},unproject:function(r,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(x(r),a);},layerPointToLatLng:function(r){var a=x(r).add(this.getPixelOrigin());return this.unproject(a);},latLngToLayerPoint:function(r){var a=this.project(K(r))._round();return a._subtract(this.getPixelOrigin());},wrapLatLng:function(r){return this.options.crs.wrapLatLng(K(r));},wrapLatLngBounds:function(r){return this.options.crs.wrapLatLngBounds(J(r));},distance:function(r,a){return this.options.crs.distance(K(r),K(a));},containerPointToLayerPoint:function(r){return x(r).subtract(this._getMapPanePos());},layerPointToContainerPoint:function(r){return x(r).add(this._getMapPanePos());},containerPointToLatLng:function(r){var a=this.containerPointToLayerPoint(x(r));return this.layerPointToLatLng(a);},latLngToContainerPoint:function(r){return this.layerPointToContainerPoint(this.latLngToLayerPoint(K(r)));},mouseEventToContainerPoint:function(r){return Il(r,this._container);},mouseEventToLayerPoint:function(r){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(r));},mouseEventToLatLng:function(r){return this.layerPointToLatLng(this.mouseEventToLayerPoint(r));},_initContainer:function(r){var a=this._container=wl(r);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.");}else throw new Error("Map container not found.");Ct(a,"scroll",this._onScroll,this),this._containerId=l(a);},_initLayout:function(){var r=this._container;this._fadeAnimated=this.options.fadeAnimation&&pt.any3d,bt(r,"leaflet-container"+(pt.touch?" leaflet-touch":"")+(pt.retina?" leaflet-retina":"")+(pt.ielt9?" leaflet-oldie":"")+(pt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=hr(r,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(r.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos();},_initPanes:function(){var r=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),ne(this._mapPane,new w(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(bt(r.markerPane,"leaflet-zoom-hide"),bt(r.shadowPane,"leaflet-zoom-hide"));},_resetView:function(r,a,c){ne(this._mapPane,new w(0,0));var f=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var _=this._zoom!==a;this._moveStart(_,c)._move(r,a)._moveEnd(_),this.fire("viewreset"),f&&this.fire("load");},_moveStart:function(r,a){return r&&this.fire("zoomstart"),a||this.fire("movestart"),this;},_move:function(r,a,c,f){a===void 0&&(a=this._zoom);var _=this._zoom!==a;return this._zoom=a,this._lastCenter=r,this._pixelOrigin=this._getNewPixelOrigin(r),f?c&&c.pinch&&this.fire("zoom",c):((_||c&&c.pinch)&&this.fire("zoom",c),this.fire("move",c)),this;},_moveEnd:function(r){return r&&this.fire("zoomend"),this.fire("moveend");},_stop:function(){return it(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this;},_rawPanBy:function(r){ne(this._mapPane,this._getMapPanePos().subtract(r));},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom();},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds);},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.");},_initEvents:function(r){this._targets={},this._targets[l(this._container)]=this;var a=r?$t:Ct;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),pt.any3d&&this.options.transform3DLimit&&(r?this.off:this.on).call(this,"moveend",this._onMoveEnd);},_onResize:function(){it(this._resizeRequest),this._resizeRequest=H(function(){this.invalidateSize({debounceMoveend:!0});},this);},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0;},_onMoveEnd:function(){var r=this._getMapPanePos();Math.max(Math.abs(r.x),Math.abs(r.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom());},_findEventTargets:function(r,a){for(var c=[],f,_=a==="mouseout"||a==="mouseover",T=r.target||r.srcElement,I=!1;T;){if(f=this._targets[l(T)],f&&(a==="click"||a==="preclick")&&this._draggableMoved(f)){I=!0;break;}if(f&&f.listens(a,!0)&&(_&&!Us(T,r)||(c.push(f),_))||T===this._container)break;T=T.parentNode;}return!c.length&&!I&&!_&&this.listens(a,!0)&&(c=[this]),c;},_isClickDisabled:function(r){for(;r&&r!==this._container;){if(r._leaflet_disable_click)return!0;r=r.parentNode;}},_handleDOMEvent:function(r){var a=r.target||r.srcElement;if(!(!this._loaded||a._leaflet_disable_events||r.type==="click"&&this._isClickDisabled(a))){var c=r.type;c==="mousedown"&&Bs(a),this._fireDOMEvent(r,c);}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(r,a,c){if(r.type==="click"){var f=n({},r);f.type="preclick",this._fireDOMEvent(f,f.type,c);}var _=this._findEventTargets(r,a);if(c){for(var T=[],I=0;I<c.length;I++)c[I].listens(a,!0)&&T.push(c[I]);_=T.concat(_);}if(_.length){a==="contextmenu"&&_e(r);var V=_[0],U={originalEvent:r};if(r.type!=="keypress"&&r.type!=="keydown"&&r.type!=="keyup"){var q=V.getLatLng&&(!V._radius||V._radius<=10);U.containerPoint=q?this.latLngToContainerPoint(V.getLatLng()):this.mouseEventToContainerPoint(r),U.layerPoint=this.containerPointToLayerPoint(U.containerPoint),U.latlng=q?V.getLatLng():this.layerPointToLatLng(U.layerPoint);}for(I=0;I<_.length;I++)if(_[I].fire(a,U,!0),U.originalEvent._stopped||_[I].options.bubblingMouseEvents===!1&&C(this._mouseEvents,a)!==-1)return;}},_draggableMoved:function(r){return r=r.dragging&&r.dragging.enabled()?r:this,r.dragging&&r.dragging.moved()||this.boxZoom&&this.boxZoom.moved();},_clearHandlers:function(){for(var r=0,a=this._handlers.length;r<a;r++)this._handlers[r].disable();},whenReady:function(r,a){return this._loaded?r.call(a||this,{target:this}):this.on("load",r,a),this;},_getMapPanePos:function(){return si(this._mapPane)||new w(0,0);},_moved:function(){var r=this._getMapPanePos();return r&&!r.equals([0,0]);},_getTopLeftPoint:function(r,a){var c=r&&a!==void 0?this._getNewPixelOrigin(r,a):this.getPixelOrigin();return c.subtract(this._getMapPanePos());},_getNewPixelOrigin:function(r,a){var c=this.getSize()._divideBy(2);return this.project(r,a)._subtract(c)._add(this._getMapPanePos())._round();},_latLngToNewLayerPoint:function(r,a,c){var f=this._getNewPixelOrigin(c,a);return this.project(r,a)._subtract(f);},_latLngBoundsToNewLayerBounds:function(r,a,c){var f=this._getNewPixelOrigin(c,a);return z([this.project(r.getSouthWest(),a)._subtract(f),this.project(r.getNorthWest(),a)._subtract(f),this.project(r.getSouthEast(),a)._subtract(f),this.project(r.getNorthEast(),a)._subtract(f)]);},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2));},_getCenterOffset:function(r){return this.latLngToLayerPoint(r).subtract(this._getCenterLayerPoint());},_limitCenter:function(r,a,c){if(!c)return r;var f=this.project(r,a),_=this.getSize().divideBy(2),T=new M(f.subtract(_),f.add(_)),I=this._getBoundsOffset(T,c,a);return Math.abs(I.x)<=1&&Math.abs(I.y)<=1?r:this.unproject(f.add(I),a);},_limitOffset:function(r,a){if(!a)return r;var c=this.getPixelBounds(),f=new M(c.min.add(r),c.max.add(r));return r.add(this._getBoundsOffset(f,a));},_getBoundsOffset:function(r,a,c){var f=z(this.project(a.getNorthEast(),c),this.project(a.getSouthWest(),c)),_=f.min.subtract(r.min),T=f.max.subtract(r.max),I=this._rebound(_.x,-T.x),V=this._rebound(_.y,-T.y);return new w(I,V);},_rebound:function(r,a){return r+a>0?Math.round(r-a)/2:Math.max(0,Math.ceil(r))-Math.max(0,Math.floor(a));},_limitZoom:function(r){var a=this.getMinZoom(),c=this.getMaxZoom(),f=pt.any3d?this.options.zoomSnap:1;return f&&(r=Math.round(r/f)*f),Math.max(a,Math.min(c,r));},_onPanTransitionStep:function(){this.fire("move");},_onPanTransitionEnd:function(){te(this._mapPane,"leaflet-pan-anim"),this.fire("moveend");},_tryAnimatedPan:function(r,a){var c=this._getCenterOffset(r)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(c)?!1:(this.panBy(c,a),!0);},_createAnimProxy:function(){var r=this._proxy=Lt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(r),this.on("zoomanim",function(a){var c=ks,f=this._proxy.style[c];oi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),f===this._proxy.style[c]&&this._animatingZoom&&this._onZoomTransitionEnd();},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this);},_destroyAnimProxy:function(){Zt(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy;},_animMoveEnd:function(){var r=this.getCenter(),a=this.getZoom();oi(this._proxy,this.project(r,a),this.getZoomScale(a,1));},_catchTransitionEnd:function(r){this._animatingZoom&&r.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd();},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length;},_tryAnimatedZoom:function(r,a,c){if(this._animatingZoom)return!0;if(c=c||{},!this._zoomAnimated||c.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var f=this.getZoomScale(a),_=this._getCenterOffset(r)._divideBy(1-1/f);return c.animate!==!0&&!this.getSize().contains(_)?!1:(H(function(){this._moveStart(!0,c.noMoveStart||!1)._animateZoom(r,a,!0);},this),!0);},_animateZoom:function(r,a,c,f){this._mapPane&&(c&&(this._animatingZoom=!0,this._animateToCenter=r,this._animateToZoom=a,bt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:r,zoom:a,noUpdate:f}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(o(this._onZoomTransitionEnd,this),250));},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&te(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0));}});function Ef(r,a){return new At(r,a);}var fn=Z.extend({options:{position:"topright"},initialize:function(r){g(this,r);},getPosition:function(){return this.options.position;},setPosition:function(r){var a=this._map;return a&&a.removeControl(this),this.options.position=r,a&&a.addControl(this),this;},getContainer:function(){return this._container;},addTo:function(r){this.remove(),this._map=r;var a=this._container=this.onAdd(r),c=this.getPosition(),f=r._controlCorners[c];return bt(a,"leaflet-control"),c.indexOf("bottom")!==-1?f.insertBefore(a,f.firstChild):f.appendChild(a),this._map.on("unload",this.remove,this),this;},remove:function(){return this._map?(Zt(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this;},_refocusOnMap:function(r){this._map&&r&&r.screenX>0&&r.screenY>0&&this._map.getContainer().focus();}}),mr=function(r){return new fn(r);};At.include({addControl:function(r){return r.addTo(this),this;},removeControl:function(r){return r.remove(),this;},_initControlPos:function(){var r=this._controlCorners={},a="leaflet-",c=this._controlContainer=Lt("div",a+"control-container",this._container);function f(_,T){var I=a+_+" "+a+T;r[_+T]=Lt("div",I,c);}f("top","left"),f("top","right"),f("bottom","left"),f("bottom","right");},_clearControlPos:function(){for(var r in this._controlCorners)Zt(this._controlCorners[r]);Zt(this._controlContainer),delete this._controlCorners,delete this._controlContainer;}});var Fl=fn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(r,a,c,f){return c<f?-1:f<c?1:0;}},initialize:function(r,a,c){g(this,c),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var f in r)this._addLayer(r[f],f);for(f in a)this._addLayer(a[f],f,!0);},onAdd:function(r){this._initLayout(),this._update(),this._map=r,r.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container;},addTo:function(r){return fn.prototype.addTo.call(this,r),this._expandIfNotCollapsed();},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var r=0;r<this._layers.length;r++)this._layers[r].layer.off("add remove",this._onLayerChange,this);},addBaseLayer:function(r,a){return this._addLayer(r,a),this._map?this._update():this;},addOverlay:function(r,a){return this._addLayer(r,a,!0),this._map?this._update():this;},removeLayer:function(r){r.off("add remove",this._onLayerChange,this);var a=this._getLayer(l(r));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this;},expand:function(){bt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var r=this._map.getSize().y-(this._container.offsetTop+50);return r<this._section.clientHeight?(bt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=r+"px"):te(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this;},collapse:function(){return te(this._container,"leaflet-control-layers-expanded"),this;},_initLayout:function(){var r="leaflet-control-layers",a=this._container=Lt("div",r),c=this.options.collapsed;a.setAttribute("aria-haspopup",!0),dr(a),Gs(a);var f=this._section=Lt("section",r+"-list");c&&(this._map.on("click",this.collapse,this),Ct(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var _=this._layersLink=Lt("a",r+"-toggle",a);_.href="#",_.title="Layers",_.setAttribute("role","button"),Ct(_,{keydown:function(T){T.keyCode===13&&this._expandSafely();},click:function(T){_e(T),this._expandSafely();}},this),c||this.expand(),this._baseLayersList=Lt("div",r+"-base",f),this._separator=Lt("div",r+"-separator",f),this._overlaysList=Lt("div",r+"-overlays",f),a.appendChild(f);},_getLayer:function(r){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&l(this._layers[a].layer)===r)return this._layers[a];},_addLayer:function(r,a,c){this._map&&r.on("add remove",this._onLayerChange,this),this._layers.push({layer:r,name:a,overlay:c}),this.options.sortLayers&&this._layers.sort(o(function(f,_){return this.options.sortFunction(f.layer,_.layer,f.name,_.name);},this)),this.options.autoZIndex&&r.setZIndex&&(this._lastZIndex++,r.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed();},_update:function(){if(!this._container)return this;Yr(this._baseLayersList),Yr(this._overlaysList),this._layerControlInputs=[];var r,a,c,f,_=0;for(c=0;c<this._layers.length;c++)f=this._layers[c],this._addItem(f),a=a||f.overlay,r=r||!f.overlay,_+=f.overlay?0:1;return this.options.hideSingleBase&&(r=r&&_>1,this._baseLayersList.style.display=r?"":"none"),this._separator.style.display=a&&r?"":"none",this;},_onLayerChange:function(r){this._handlingClick||this._update();var a=this._getLayer(l(r.target)),c=a.overlay?r.type==="add"?"overlayadd":"overlayremove":r.type==="add"?"baselayerchange":null;c&&this._map.fire(c,a);},_createRadioElement:function(r,a){var c='<input type="radio" class="leaflet-control-layers-selector" name="'+r+'"'+(a?' checked="checked"':"")+"/>",f=document.createElement("div");return f.innerHTML=c,f.firstChild;},_addItem:function(r){var a=document.createElement("label"),c=this._map.hasLayer(r.layer),f;r.overlay?(f=document.createElement("input"),f.type="checkbox",f.className="leaflet-control-layers-selector",f.defaultChecked=c):f=this._createRadioElement("leaflet-base-layers_"+l(this),c),this._layerControlInputs.push(f),f.layerId=l(r.layer),Ct(f,"click",this._onInputClick,this);var _=document.createElement("span");_.innerHTML=" "+r.name;var T=document.createElement("span");a.appendChild(T),T.appendChild(f),T.appendChild(_);var I=r.overlay?this._overlaysList:this._baseLayersList;return I.appendChild(a),this._checkDisabledLayers(),a;},_onInputClick:function(){if(!this._preventClick){var r=this._layerControlInputs,a,c,f=[],_=[];this._handlingClick=!0;for(var T=r.length-1;T>=0;T--)a=r[T],c=this._getLayer(a.layerId).layer,a.checked?f.push(c):a.checked||_.push(c);for(T=0;T<_.length;T++)this._map.hasLayer(_[T])&&this._map.removeLayer(_[T]);for(T=0;T<f.length;T++)this._map.hasLayer(f[T])||this._map.addLayer(f[T]);this._handlingClick=!1,this._refocusOnMap();}},_checkDisabledLayers:function(){for(var r=this._layerControlInputs,a,c,f=this._map.getZoom(),_=r.length-1;_>=0;_--)a=r[_],c=this._getLayer(a.layerId).layer,a.disabled=c.options.minZoom!==void 0&&f<c.options.minZoom||c.options.maxZoom!==void 0&&f>c.options.maxZoom;},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this;},_expandSafely:function(){var r=this._section;this._preventClick=!0,Ct(r,"click",_e),this.expand();var a=this;setTimeout(function(){$t(r,"click",_e),a._preventClick=!1;});}}),Sf=function(r,a,c){return new Fl(r,a,c);},Hs=fn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(r){var a="leaflet-control-zoom",c=Lt("div",a+" leaflet-bar"),f=this.options;return this._zoomInButton=this._createButton(f.zoomInText,f.zoomInTitle,a+"-in",c,this._zoomIn),this._zoomOutButton=this._createButton(f.zoomOutText,f.zoomOutTitle,a+"-out",c,this._zoomOut),this._updateDisabled(),r.on("zoomend zoomlevelschange",this._updateDisabled,this),c;},onRemove:function(r){r.off("zoomend zoomlevelschange",this._updateDisabled,this);},disable:function(){return this._disabled=!0,this._updateDisabled(),this;},enable:function(){return this._disabled=!1,this._updateDisabled(),this;},_zoomIn:function(r){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(r.shiftKey?3:1));},_zoomOut:function(r){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(r.shiftKey?3:1));},_createButton:function(r,a,c,f,_){var T=Lt("a",c,f);return T.innerHTML=r,T.href="#",T.title=a,T.setAttribute("role","button"),T.setAttribute("aria-label",a),dr(T),Ct(T,"click",li),Ct(T,"click",_,this),Ct(T,"click",this._refocusOnMap,this),T;},_updateDisabled:function(){var r=this._map,a="leaflet-disabled";te(this._zoomInButton,a),te(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||r._zoom===r.getMinZoom())&&(bt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||r._zoom===r.getMaxZoom())&&(bt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"));}});At.mergeOptions({zoomControl:!0}),At.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Hs(),this.addControl(this.zoomControl));});var Mf=function(r){return new Hs(r);},Nl=fn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(r){var a="leaflet-control-scale",c=Lt("div",a),f=this.options;return this._addScales(f,a+"-line",c),r.on(f.updateWhenIdle?"moveend":"move",this._update,this),r.whenReady(this._update,this),c;},onRemove:function(r){r.off(this.options.updateWhenIdle?"moveend":"move",this._update,this);},_addScales:function(r,a,c){r.metric&&(this._mScale=Lt("div",a,c)),r.imperial&&(this._iScale=Lt("div",a,c));},_update:function(){var r=this._map,a=r.getSize().y/2,c=r.distance(r.containerPointToLatLng([0,a]),r.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(c);},_updateScales:function(r){this.options.metric&&r&&this._updateMetric(r),this.options.imperial&&r&&this._updateImperial(r);},_updateMetric:function(r){var a=this._getRoundNum(r),c=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,c,a/r);},_updateImperial:function(r){var a=r*3.2808399,c,f,_;a>5280?(c=a/5280,f=this._getRoundNum(c),this._updateScale(this._iScale,f+" mi",f/c)):(_=this._getRoundNum(a),this._updateScale(this._iScale,_+" ft",_/a));},_updateScale:function(r,a,c){r.style.width=Math.round(this.options.maxWidth*c)+"px",r.innerHTML=a;},_getRoundNum:function(r){var a=Math.pow(10,(Math.floor(r)+"").length-1),c=r/a;return c=c>=10?10:c>=5?5:c>=3?3:c>=2?2:1,a*c;}}),Tf=function(r){return new Nl(r);},wf='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',js=fn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(pt.inlineSvg?wf+" ":"")+"Leaflet</a>"},initialize:function(r){g(this,r),this._attributions={};},onAdd:function(r){r.attributionControl=this,this._container=Lt("div","leaflet-control-attribution"),dr(this._container);for(var a in r._layers)r._layers[a].getAttribution&&this.addAttribution(r._layers[a].getAttribution());return this._update(),r.on("layeradd",this._addAttribution,this),this._container;},onRemove:function(r){r.off("layeradd",this._addAttribution,this);},_addAttribution:function(r){r.layer.getAttribution&&(this.addAttribution(r.layer.getAttribution()),r.layer.once("remove",function(){this.removeAttribution(r.layer.getAttribution());},this));},setPrefix:function(r){return this.options.prefix=r,this._update(),this;},addAttribution:function(r){return r?(this._attributions[r]||(this._attributions[r]=0),this._attributions[r]++,this._update(),this):this;},removeAttribution:function(r){return r?(this._attributions[r]&&(this._attributions[r]--,this._update()),this):this;},_update:function(){if(this._map){var r=[];for(var a in this._attributions)this._attributions[a]&&r.push(a);var c=[];this.options.prefix&&c.push(this.options.prefix),r.length&&c.push(r.join(", ")),this._container.innerHTML=c.join(' <span aria-hidden="true">|</span> ');}}});At.mergeOptions({attributionControl:!0}),At.addInitHook(function(){this.options.attributionControl&&new js().addTo(this);});var Of=function(r){return new js(r);};fn.Layers=Fl,fn.Zoom=Hs,fn.Scale=Nl,fn.Attribution=js,mr.layers=Sf,mr.zoom=Mf,mr.scale=Tf,mr.attribution=Of;var bn=Z.extend({initialize:function(r){this._map=r;},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this);},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this;},enabled:function(){return!!this._enabled;}});bn.addTo=function(r,a){return r.addHandler(a,this),this;};var kf={Events:Q},Bl=pt.touch?"touchstart mousedown":"mousedown",Wn=W.extend({options:{clickTolerance:3},initialize:function(r,a,c,f){g(this,f),this._element=r,this._dragStartTarget=a||r,this._preventOutline=c;},enable:function(){this._enabled||(Ct(this._dragStartTarget,Bl,this._onDown,this),this._enabled=!0);},disable:function(){this._enabled&&(Wn._dragging===this&&this.finishDrag(!0),$t(this._dragStartTarget,Bl,this._onDown,this),this._enabled=!1,this._moved=!1);},_onDown:function(r){if(this._enabled&&(this._moved=!1,!As(this._element,"leaflet-zoom-anim"))){if(r.touches&&r.touches.length!==1){Wn._dragging===this&&this.finishDrag();return;}if(!(Wn._dragging||r.shiftKey||r.which!==1&&r.button!==1&&!r.touches)&&(Wn._dragging=this,this._preventOutline&&Bs(this._element),Rs(),pr(),!this._moving)){this.fire("down");var a=r.touches?r.touches[0]:r,c=Ol(this._element);this._startPoint=new w(a.clientX,a.clientY),this._startPos=si(this._element),this._parentScale=Ds(c);var f=r.type==="mousedown";Ct(document,f?"mousemove":"touchmove",this._onMove,this),Ct(document,f?"mouseup":"touchend touchcancel",this._onUp,this);}}},_onMove:function(r){if(this._enabled){if(r.touches&&r.touches.length>1){this._moved=!0;return;}var a=r.touches&&r.touches.length===1?r.touches[0]:r,c=new w(a.clientX,a.clientY)._subtract(this._startPoint);!c.x&&!c.y||Math.abs(c.x)+Math.abs(c.y)<this.options.clickTolerance||(c.x/=this._parentScale.x,c.y/=this._parentScale.y,_e(r),this._moved||(this.fire("dragstart"),this._moved=!0,bt(document.body,"leaflet-dragging"),this._lastTarget=r.target||r.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),bt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(c),this._moving=!0,this._lastEvent=r,this._updatePosition());}},_updatePosition:function(){var r={originalEvent:this._lastEvent};this.fire("predrag",r),ne(this._element,this._newPos),this.fire("drag",r);},_onUp:function(){this._enabled&&this.finishDrag();},finishDrag:function(r){te(document.body,"leaflet-dragging"),this._lastTarget&&(te(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),$t(document,"mousemove touchmove",this._onMove,this),$t(document,"mouseup touchend touchcancel",this._onUp,this),Fs(),fr();var a=this._moved&&this._moving;this._moving=!1,Wn._dragging=!1,a&&this.fire("dragend",{noInertia:r,distance:this._newPos.distanceTo(this._startPos)});}});function Dl(r,a,c){var f,_=[1,4,2,8],T,I,V,U,q,ot,ut,Mt;for(T=0,ot=r.length;T<ot;T++)r[T]._code=ci(r[T],a);for(V=0;V<4;V++){for(ut=_[V],f=[],T=0,ot=r.length,I=ot-1;T<ot;I=T++)U=r[T],q=r[I],U._code&ut?q._code&ut||(Mt=to(q,U,ut,a,c),Mt._code=ci(Mt,a),f.push(Mt)):(q._code&ut&&(Mt=to(q,U,ut,a,c),Mt._code=ci(Mt,a),f.push(Mt)),f.push(U));r=f;}return r;}function zl(r,a){var c,f,_,T,I,V,U,q,ot;if(!r||r.length===0)throw new Error("latlngs not passed");Ke(r)||(console.warn("latlngs are not flat! Only the first ring will be used"),r=r[0]);var ut=K([0,0]),Mt=J(r),Oe=Mt.getNorthWest().distanceTo(Mt.getSouthWest())*Mt.getNorthEast().distanceTo(Mt.getNorthWest());Oe<1700&&(ut=Zs(r));var ue=r.length,Qe=[];for(c=0;c<ue;c++){var Ne=K(r[c]);Qe.push(a.project(K([Ne.lat-ut.lat,Ne.lng-ut.lng])));}for(V=U=q=0,c=0,f=ue-1;c<ue;f=c++)_=Qe[c],T=Qe[f],I=_.y*T.x-T.y*_.x,U+=(_.x+T.x)*I,q+=(_.y+T.y)*I,V+=I*3;V===0?ot=Qe[0]:ot=[U/V,q/V];var Vi=a.unproject(x(ot));return K([Vi.lat+ut.lat,Vi.lng+ut.lng]);}function Zs(r){for(var a=0,c=0,f=0,_=0;_<r.length;_++){var T=K(r[_]);a+=T.lat,c+=T.lng,f++;}return K([a/f,c/f]);}var Af={__proto__:null,clipPolygon:Dl,polygonCenter:zl,centroid:Zs};function Vl(r,a){if(!a||!r.length)return r.slice();var c=a*a;return r=Rf(r,c),r=Lf(r,c),r;}function $l(r,a,c){return Math.sqrt(gr(r,a,c,!0));}function If(r,a,c){return gr(r,a,c);}function Lf(r,a){var c=r.length,f=typeof Uint8Array<"u"?Uint8Array:Array,_=new f(c);_[0]=_[c-1]=1,Ws(r,_,a,0,c-1);var T,I=[];for(T=0;T<c;T++)_[T]&&I.push(r[T]);return I;}function Ws(r,a,c,f,_){var T=0,I,V,U;for(V=f+1;V<=_-1;V++)U=gr(r[V],r[f],r[_],!0),U>T&&(I=V,T=U);T>c&&(a[I]=1,Ws(r,a,c,f,I),Ws(r,a,c,I,_));}function Rf(r,a){for(var c=[r[0]],f=1,_=0,T=r.length;f<T;f++)Ff(r[f],r[_])>a&&(c.push(r[f]),_=f);return _<T-1&&c.push(r[T-1]),c;}var Gl;function Ul(r,a,c,f,_){var T=f?Gl:ci(r,c),I=ci(a,c),V,U,q;for(Gl=I;;){if(!(T|I))return[r,a];if(T&I)return!1;V=T||I,U=to(r,a,V,c,_),q=ci(U,c),V===T?(r=U,T=q):(a=U,I=q);}}function to(r,a,c,f,_){var T=a.x-r.x,I=a.y-r.y,V=f.min,U=f.max,q,ot;return c&8?(q=r.x+T*(U.y-r.y)/I,ot=U.y):c&4?(q=r.x+T*(V.y-r.y)/I,ot=V.y):c&2?(q=U.x,ot=r.y+I*(U.x-r.x)/T):c&1&&(q=V.x,ot=r.y+I*(V.x-r.x)/T),new w(q,ot,_);}function ci(r,a){var c=0;return r.x<a.min.x?c|=1:r.x>a.max.x&&(c|=2),r.y<a.min.y?c|=4:r.y>a.max.y&&(c|=8),c;}function Ff(r,a){var c=a.x-r.x,f=a.y-r.y;return c*c+f*f;}function gr(r,a,c,f){var _=a.x,T=a.y,I=c.x-_,V=c.y-T,U=I*I+V*V,q;return U>0&&(q=((r.x-_)*I+(r.y-T)*V)/U,q>1?(_=c.x,T=c.y):q>0&&(_+=I*q,T+=V*q)),I=r.x-_,V=r.y-T,f?I*I+V*V:new w(_,T);}function Ke(r){return!v(r[0])||typeof r[0][0]!="object"&&typeof r[0][0]<"u";}function Hl(r){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Ke(r);}function jl(r,a){var c,f,_,T,I,V,U,q;if(!r||r.length===0)throw new Error("latlngs not passed");Ke(r)||(console.warn("latlngs are not flat! Only the first ring will be used"),r=r[0]);var ot=K([0,0]),ut=J(r),Mt=ut.getNorthWest().distanceTo(ut.getSouthWest())*ut.getNorthEast().distanceTo(ut.getNorthWest());Mt<1700&&(ot=Zs(r));var Oe=r.length,ue=[];for(c=0;c<Oe;c++){var Qe=K(r[c]);ue.push(a.project(K([Qe.lat-ot.lat,Qe.lng-ot.lng])));}for(c=0,f=0;c<Oe-1;c++)f+=ue[c].distanceTo(ue[c+1])/2;if(f===0)q=ue[0];else for(c=0,T=0;c<Oe-1;c++)if(I=ue[c],V=ue[c+1],_=I.distanceTo(V),T+=_,T>f){U=(T-f)/_,q=[V.x-U*(V.x-I.x),V.y-U*(V.y-I.y)];break;}var Ne=a.unproject(x(q));return K([Ne.lat+ot.lat,Ne.lng+ot.lng]);}var Nf={__proto__:null,simplify:Vl,pointToSegmentDistance:$l,closestPointOnSegment:If,clipSegment:Ul,_getEdgeIntersection:to,_getBitCode:ci,_sqClosestPointOnSegment:gr,isFlat:Ke,_flat:Hl,polylineCenter:jl},qs={project:function(r){return new w(r.lng,r.lat);},unproject:function(r){return new tt(r.y,r.x);},bounds:new M([-180,-90],[180,90])},Ys={R:6378137,R_MINOR:6356752314245179e-9,bounds:new M([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(r){var a=Math.PI/180,c=this.R,f=r.lat*a,_=this.R_MINOR/c,T=Math.sqrt(1-_*_),I=T*Math.sin(f),V=Math.tan(Math.PI/4-f/2)/Math.pow((1-I)/(1+I),T/2);return f=-c*Math.log(Math.max(V,1e-10)),new w(r.lng*a*c,f);},unproject:function(r){for(var a=180/Math.PI,c=this.R,f=this.R_MINOR/c,_=Math.sqrt(1-f*f),T=Math.exp(-r.y/c),I=Math.PI/2-2*Math.atan(T),V=0,U=.1,q;V<15&&Math.abs(U)>1e-7;V++)q=_*Math.sin(I),q=Math.pow((1-q)/(1+q),_/2),U=Math.PI/2-2*Math.atan(T*q)-I,I+=U;return new tt(I*a,r.x*a/c);}},Bf={__proto__:null,LonLat:qs,Mercator:Ys,SphericalMercator:fe},Df=n({},xt,{code:"EPSG:3395",projection:Ys,transformation:function(){var r=.5/(Math.PI*Ys.R);return ee(r,.5,-r,.5);}()}),Zl=n({},xt,{code:"EPSG:4326",projection:qs,transformation:ee(1/180,1,-1/180,.5)}),zf=n({},Pt,{projection:qs,transformation:ee(1,0,-1,0),scale:function(r){return Math.pow(2,r);},zoom:function(r){return Math.log(r)/Math.LN2;},distance:function(r,a){var c=a.lng-r.lng,f=a.lat-r.lat;return Math.sqrt(c*c+f*f);},infinite:!0});Pt.Earth=xt,Pt.EPSG3395=Df,Pt.EPSG3857=Qt,Pt.EPSG900913=Te,Pt.EPSG4326=Zl,Pt.Simple=zf;var un=W.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(r){return r.addLayer(this),this;},remove:function(){return this.removeFrom(this._map||this._mapToAdd);},removeFrom:function(r){return r&&r.removeLayer(this),this;},getPane:function(r){return this._map.getPane(r?this.options[r]||r:this.options.pane);},addInteractiveTarget:function(r){return this._map._targets[l(r)]=this,this;},removeInteractiveTarget:function(r){return delete this._map._targets[l(r)],this;},getAttribution:function(){return this.options.attribution;},_layerAdd:function(r){var a=r.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var c=this.getEvents();a.on(c,this),this.once("remove",function(){a.off(c,this);},this);}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this});}}});At.include({addLayer:function(r){if(!r._layerAdd)throw new Error("The provided object is not a Layer.");var a=l(r);return this._layers[a]?this:(this._layers[a]=r,r._mapToAdd=this,r.beforeAdd&&r.beforeAdd(this),this.whenReady(r._layerAdd,r),this);},removeLayer:function(r){var a=l(r);return this._layers[a]?(this._loaded&&r.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:r}),r.fire("remove")),r._map=r._mapToAdd=null,this):this;},hasLayer:function(r){return l(r)in this._layers;},eachLayer:function(r,a){for(var c in this._layers)r.call(a,this._layers[c]);return this;},_addLayers:function(r){r=r?v(r)?r:[r]:[];for(var a=0,c=r.length;a<c;a++)this.addLayer(r[a]);},_addZoomLimit:function(r){(!isNaN(r.options.maxZoom)||!isNaN(r.options.minZoom))&&(this._zoomBoundLayers[l(r)]=r,this._updateZoomLevels());},_removeZoomLimit:function(r){var a=l(r);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels());},_updateZoomLevels:function(){var r=1/0,a=-1/0,c=this._getZoomSpan();for(var f in this._zoomBoundLayers){var _=this._zoomBoundLayers[f].options;r=_.minZoom===void 0?r:Math.min(r,_.minZoom),a=_.maxZoom===void 0?a:Math.max(a,_.maxZoom);}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=r===1/0?void 0:r,c!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom);}});var Fi=un.extend({initialize:function(r,a){g(this,a),this._layers={};var c,f;if(r)for(c=0,f=r.length;c<f;c++)this.addLayer(r[c]);},addLayer:function(r){var a=this.getLayerId(r);return this._layers[a]=r,this._map&&this._map.addLayer(r),this;},removeLayer:function(r){var a=r in this._layers?r:this.getLayerId(r);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this;},hasLayer:function(r){var a=typeof r=="number"?r:this.getLayerId(r);return a in this._layers;},clearLayers:function(){return this.eachLayer(this.removeLayer,this);},invoke:function(r){var a=Array.prototype.slice.call(arguments,1),c,f;for(c in this._layers)f=this._layers[c],f[r]&&f[r].apply(f,a);return this;},onAdd:function(r){this.eachLayer(r.addLayer,r);},onRemove:function(r){this.eachLayer(r.removeLayer,r);},eachLayer:function(r,a){for(var c in this._layers)r.call(a,this._layers[c]);return this;},getLayer:function(r){return this._layers[r];},getLayers:function(){var r=[];return this.eachLayer(r.push,r),r;},setZIndex:function(r){return this.invoke("setZIndex",r);},getLayerId:function(r){return l(r);}}),Vf=function(r,a){return new Fi(r,a);},Rn=Fi.extend({addLayer:function(r){return this.hasLayer(r)?this:(r.addEventParent(this),Fi.prototype.addLayer.call(this,r),this.fire("layeradd",{layer:r}));},removeLayer:function(r){return this.hasLayer(r)?(r in this._layers&&(r=this._layers[r]),r.removeEventParent(this),Fi.prototype.removeLayer.call(this,r),this.fire("layerremove",{layer:r})):this;},setStyle:function(r){return this.invoke("setStyle",r);},bringToFront:function(){return this.invoke("bringToFront");},bringToBack:function(){return this.invoke("bringToBack");},getBounds:function(){var r=new B();for(var a in this._layers){var c=this._layers[a];r.extend(c.getBounds?c.getBounds():c.getLatLng());}return r;}}),$f=function(r,a){return new Rn(r,a);},Ni=Z.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(r){g(this,r);},createIcon:function(r){return this._createIcon("icon",r);},createShadow:function(r){return this._createIcon("shadow",r);},_createIcon:function(r,a){var c=this._getIconUrl(r);if(!c){if(r==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null;}var f=this._createImg(c,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(f,r),(this.options.crossOrigin||this.options.crossOrigin==="")&&(f.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),f;},_setIconStyles:function(r,a){var c=this.options,f=c[a+"Size"];typeof f=="number"&&(f=[f,f]);var _=x(f),T=x(a==="shadow"&&c.shadowAnchor||c.iconAnchor||_&&_.divideBy(2,!0));r.className="leaflet-marker-"+a+" "+(c.className||""),T&&(r.style.marginLeft=-T.x+"px",r.style.marginTop=-T.y+"px"),_&&(r.style.width=_.x+"px",r.style.height=_.y+"px");},_createImg:function(r,a){return a=a||document.createElement("img"),a.src=r,a;},_getIconUrl:function(r){return pt.retina&&this.options[r+"RetinaUrl"]||this.options[r+"Url"];}});function Gf(r){return new Ni(r);}var _r=Ni.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(r){return typeof _r.imagePath!="string"&&(_r.imagePath=this._detectIconPath()),(this.options.imagePath||_r.imagePath)+Ni.prototype._getIconUrl.call(this,r);},_stripUrl:function(r){var a=function(c,f,_){var T=f.exec(c);return T&&T[_];};return r=a(r,/^url\((['"])?(.+)\1\)$/,2),r&&a(r,/^(.*)marker-icon\.png$/,1);},_detectIconPath:function(){var r=Lt("div","leaflet-default-icon-path",document.body),a=hr(r,"background-image")||hr(r,"backgroundImage");if(document.body.removeChild(r),a=this._stripUrl(a),a)return a;var c=document.querySelector('link[href$="leaflet.css"]');return c?c.href.substring(0,c.href.length-11-1):"";}}),Wl=bn.extend({initialize:function(r){this._marker=r;},addHooks:function(){var r=this._marker._icon;this._draggable||(this._draggable=new Wn(r,r,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),bt(r,"leaflet-marker-draggable");},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&te(this._marker._icon,"leaflet-marker-draggable");},moved:function(){return this._draggable&&this._draggable._moved;},_adjustPan:function(r){var a=this._marker,c=a._map,f=this._marker.options.autoPanSpeed,_=this._marker.options.autoPanPadding,T=si(a._icon),I=c.getPixelBounds(),V=c.getPixelOrigin(),U=z(I.min._subtract(V).add(_),I.max._subtract(V).subtract(_));if(!U.contains(T)){var q=x((Math.max(U.max.x,T.x)-U.max.x)/(I.max.x-U.max.x)-(Math.min(U.min.x,T.x)-U.min.x)/(I.min.x-U.min.x),(Math.max(U.max.y,T.y)-U.max.y)/(I.max.y-U.max.y)-(Math.min(U.min.y,T.y)-U.min.y)/(I.min.y-U.min.y)).multiplyBy(f);c.panBy(q,{animate:!1}),this._draggable._newPos._add(q),this._draggable._startPos._add(q),ne(a._icon,this._draggable._newPos),this._onDrag(r),this._panRequest=H(this._adjustPan.bind(this,r));}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart");},_onPreDrag:function(r){this._marker.options.autoPan&&(it(this._panRequest),this._panRequest=H(this._adjustPan.bind(this,r)));},_onDrag:function(r){var a=this._marker,c=a._shadow,f=si(a._icon),_=a._map.layerPointToLatLng(f);c&&ne(c,f),a._latlng=_,r.latlng=_,r.oldLatLng=this._oldLatLng,a.fire("move",r).fire("drag",r);},_onDragEnd:function(r){it(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",r);}}),eo=un.extend({options:{icon:new _r(),interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(r,a){g(this,a),this._latlng=K(r);},onAdd:function(r){this._zoomAnimated=this._zoomAnimated&&r.options.markerZoomAnimation,this._zoomAnimated&&r.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update();},onRemove:function(r){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&r.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow();},getEvents:function(){return{zoom:this.update,viewreset:this.update};},getLatLng:function(){return this._latlng;},setLatLng:function(r){var a=this._latlng;return this._latlng=K(r),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng});},setZIndexOffset:function(r){return this.options.zIndexOffset=r,this.update();},getIcon:function(){return this.options.icon;},setIcon:function(r){return this.options.icon=r,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this;},getElement:function(){return this._icon;},update:function(){if(this._icon&&this._map){var r=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(r);}return this;},_initIcon:function(){var r=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),c=r.icon.createIcon(this._icon),f=!1;c!==this._icon&&(this._icon&&this._removeIcon(),f=!0,r.title&&(c.title=r.title),c.tagName==="IMG"&&(c.alt=r.alt||"")),bt(c,a),r.keyboard&&(c.tabIndex="0",c.setAttribute("role","button")),this._icon=c,r.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Ct(c,"focus",this._panOnFocus,this);var _=r.icon.createShadow(this._shadow),T=!1;_!==this._shadow&&(this._removeShadow(),T=!0),_&&(bt(_,a),_.alt=""),this._shadow=_,r.opacity<1&&this._updateOpacity(),f&&this.getPane().appendChild(this._icon),this._initInteraction(),_&&T&&this.getPane(r.shadowPane).appendChild(this._shadow);},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&$t(this._icon,"focus",this._panOnFocus,this),Zt(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null;},_removeShadow:function(){this._shadow&&Zt(this._shadow),this._shadow=null;},_setPos:function(r){this._icon&&ne(this._icon,r),this._shadow&&ne(this._shadow,r),this._zIndex=r.y+this.options.zIndexOffset,this._resetZIndex();},_updateZIndex:function(r){this._icon&&(this._icon.style.zIndex=this._zIndex+r);},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center).round();this._setPos(a);},_initInteraction:function(){if(this.options.interactive&&(bt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Wl)){var r=this.options.draggable;this.dragging&&(r=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Wl(this),r&&this.dragging.enable();}},setOpacity:function(r){return this.options.opacity=r,this._map&&this._updateOpacity(),this;},_updateOpacity:function(){var r=this.options.opacity;this._icon&&Je(this._icon,r),this._shadow&&Je(this._shadow,r);},_bringToFront:function(){this._updateZIndex(this.options.riseOffset);},_resetZIndex:function(){this._updateZIndex(0);},_panOnFocus:function(){var r=this._map;if(r){var a=this.options.icon.options,c=a.iconSize?x(a.iconSize):x(0,0),f=a.iconAnchor?x(a.iconAnchor):x(0,0);r.panInside(this._latlng,{paddingTopLeft:f,paddingBottomRight:c.subtract(f)});}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor;},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor;}});function Uf(r,a){return new eo(r,a);}var qn=un.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(r){this._renderer=r.getRenderer(this);},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this);},onRemove:function(){this._renderer._removePath(this);},redraw:function(){return this._map&&this._renderer._updatePath(this),this;},setStyle:function(r){return g(this,r),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&r&&Object.prototype.hasOwnProperty.call(r,"weight")&&this._updateBounds()),this;},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this;},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this;},getElement:function(){return this._path;},_reset:function(){this._project(),this._update();},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0);}}),no=qn.extend({options:{fill:!0,radius:10},initialize:function(r,a){g(this,a),this._latlng=K(r),this._radius=this.options.radius;},setLatLng:function(r){var a=this._latlng;return this._latlng=K(r),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng});},getLatLng:function(){return this._latlng;},setRadius:function(r){return this.options.radius=this._radius=r,this.redraw();},getRadius:function(){return this._radius;},setStyle:function(r){var a=r&&r.radius||this._radius;return qn.prototype.setStyle.call(this,r),this.setRadius(a),this;},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds();},_updateBounds:function(){var r=this._radius,a=this._radiusY||r,c=this._clickTolerance(),f=[r+c,a+c];this._pxBounds=new M(this._point.subtract(f),this._point.add(f));},_update:function(){this._map&&this._updatePath();},_updatePath:function(){this._renderer._updateCircle(this);},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds);},_containsPoint:function(r){return r.distanceTo(this._point)<=this._radius+this._clickTolerance();}});function Hf(r,a){return new no(r,a);}var Xs=no.extend({initialize:function(r,a,c){if(typeof a=="number"&&(a=n({},c,{radius:a})),g(this,a),this._latlng=K(r),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius;},setRadius:function(r){return this._mRadius=r,this.redraw();},getRadius:function(){return this._mRadius;},getBounds:function(){var r=[this._radius,this._radiusY||this._radius];return new B(this._map.layerPointToLatLng(this._point.subtract(r)),this._map.layerPointToLatLng(this._point.add(r)));},setStyle:qn.prototype.setStyle,_project:function(){var r=this._latlng.lng,a=this._latlng.lat,c=this._map,f=c.options.crs;if(f.distance===xt.distance){var _=Math.PI/180,T=this._mRadius/xt.R/_,I=c.project([a+T,r]),V=c.project([a-T,r]),U=I.add(V).divideBy(2),q=c.unproject(U).lat,ot=Math.acos((Math.cos(T*_)-Math.sin(a*_)*Math.sin(q*_))/(Math.cos(a*_)*Math.cos(q*_)))/_;(isNaN(ot)||ot===0)&&(ot=T/Math.cos(Math.PI/180*a)),this._point=U.subtract(c.getPixelOrigin()),this._radius=isNaN(ot)?0:U.x-c.project([q,r-ot]).x,this._radiusY=U.y-I.y;}else{var ut=f.unproject(f.project(this._latlng).subtract([this._mRadius,0]));this._point=c.latLngToLayerPoint(this._latlng),this._radius=this._point.x-c.latLngToLayerPoint(ut).x;}this._updateBounds();}});function jf(r,a,c){return new Xs(r,a,c);}var Fn=qn.extend({options:{smoothFactor:1,noClip:!1},initialize:function(r,a){g(this,a),this._setLatLngs(r);},getLatLngs:function(){return this._latlngs;},setLatLngs:function(r){return this._setLatLngs(r),this.redraw();},isEmpty:function(){return!this._latlngs.length;},closestLayerPoint:function(r){for(var a=1/0,c=null,f=gr,_,T,I=0,V=this._parts.length;I<V;I++)for(var U=this._parts[I],q=1,ot=U.length;q<ot;q++){_=U[q-1],T=U[q];var ut=f(r,_,T,!0);ut<a&&(a=ut,c=f(r,_,T));}return c&&(c.distance=Math.sqrt(a)),c;},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return jl(this._defaultShape(),this._map.options.crs);},getBounds:function(){return this._bounds;},addLatLng:function(r,a){return a=a||this._defaultShape(),r=K(r),a.push(r),this._bounds.extend(r),this.redraw();},_setLatLngs:function(r){this._bounds=new B(),this._latlngs=this._convertLatLngs(r);},_defaultShape:function(){return Ke(this._latlngs)?this._latlngs:this._latlngs[0];},_convertLatLngs:function(r){for(var a=[],c=Ke(r),f=0,_=r.length;f<_;f++)c?(a[f]=K(r[f]),this._bounds.extend(a[f])):a[f]=this._convertLatLngs(r[f]);return a;},_project:function(){var r=new M();this._rings=[],this._projectLatlngs(this._latlngs,this._rings,r),this._bounds.isValid()&&r.isValid()&&(this._rawPxBounds=r,this._updateBounds());},_updateBounds:function(){var r=this._clickTolerance(),a=new w(r,r);this._rawPxBounds&&(this._pxBounds=new M([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]));},_projectLatlngs:function(r,a,c){var f=r[0]instanceof tt,_=r.length,T,I;if(f){for(I=[],T=0;T<_;T++)I[T]=this._map.latLngToLayerPoint(r[T]),c.extend(I[T]);a.push(I);}else for(T=0;T<_;T++)this._projectLatlngs(r[T],a,c);},_clipPoints:function(){var r=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(r))){if(this.options.noClip){this._parts=this._rings;return;}var a=this._parts,c,f,_,T,I,V,U;for(c=0,_=0,T=this._rings.length;c<T;c++)for(U=this._rings[c],f=0,I=U.length;f<I-1;f++)V=Ul(U[f],U[f+1],r,f,!0),V&&(a[_]=a[_]||[],a[_].push(V[0]),(V[1]!==U[f+1]||f===I-2)&&(a[_].push(V[1]),_++));}},_simplifyPoints:function(){for(var r=this._parts,a=this.options.smoothFactor,c=0,f=r.length;c<f;c++)r[c]=Vl(r[c],a);},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath());},_updatePath:function(){this._renderer._updatePoly(this);},_containsPoint:function(r,a){var c,f,_,T,I,V,U=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(r))return!1;for(c=0,T=this._parts.length;c<T;c++)for(V=this._parts[c],f=0,I=V.length,_=I-1;f<I;_=f++)if(!(!a&&f===0)&&$l(r,V[_],V[f])<=U)return!0;return!1;}});function Zf(r,a){return new Fn(r,a);}Fn._flat=Hl;var Bi=Fn.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length;},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return zl(this._defaultShape(),this._map.options.crs);},_convertLatLngs:function(r){var a=Fn.prototype._convertLatLngs.call(this,r),c=a.length;return c>=2&&a[0]instanceof tt&&a[0].equals(a[c-1])&&a.pop(),a;},_setLatLngs:function(r){Fn.prototype._setLatLngs.call(this,r),Ke(this._latlngs)&&(this._latlngs=[this._latlngs]);},_defaultShape:function(){return Ke(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0];},_clipPoints:function(){var r=this._renderer._bounds,a=this.options.weight,c=new w(a,a);if(r=new M(r.min.subtract(c),r.max.add(c)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(r))){if(this.options.noClip){this._parts=this._rings;return;}for(var f=0,_=this._rings.length,T;f<_;f++)T=Dl(this._rings[f],r,!0),T.length&&this._parts.push(T);}},_updatePath:function(){this._renderer._updatePoly(this,!0);},_containsPoint:function(r){var a=!1,c,f,_,T,I,V,U,q;if(!this._pxBounds||!this._pxBounds.contains(r))return!1;for(T=0,U=this._parts.length;T<U;T++)for(c=this._parts[T],I=0,q=c.length,V=q-1;I<q;V=I++)f=c[I],_=c[V],f.y>r.y!=_.y>r.y&&r.x<(_.x-f.x)*(r.y-f.y)/(_.y-f.y)+f.x&&(a=!a);return a||Fn.prototype._containsPoint.call(this,r,!0);}});function Wf(r,a){return new Bi(r,a);}var Nn=Rn.extend({initialize:function(r,a){g(this,a),this._layers={},r&&this.addData(r);},addData:function(r){var a=v(r)?r:r.features,c,f,_;if(a){for(c=0,f=a.length;c<f;c++)_=a[c],(_.geometries||_.geometry||_.features||_.coordinates)&&this.addData(_);return this;}var T=this.options;if(T.filter&&!T.filter(r))return this;var I=io(r,T);return I?(I.feature=so(r),I.defaultOptions=I.options,this.resetStyle(I),T.onEachFeature&&T.onEachFeature(r,I),this.addLayer(I)):this;},resetStyle:function(r){return r===void 0?this.eachLayer(this.resetStyle,this):(r.options=n({},r.defaultOptions),this._setLayerStyle(r,this.options.style),this);},setStyle:function(r){return this.eachLayer(function(a){this._setLayerStyle(a,r);},this);},_setLayerStyle:function(r,a){r.setStyle&&(typeof a=="function"&&(a=a(r.feature)),r.setStyle(a));}});function io(r,a){var c=r.type==="Feature"?r.geometry:r,f=c?c.coordinates:null,_=[],T=a&&a.pointToLayer,I=a&&a.coordsToLatLng||Js,V,U,q,ot;if(!f&&!c)return null;switch(c.type){case"Point":return V=I(f),ql(T,r,V,a);case"MultiPoint":for(q=0,ot=f.length;q<ot;q++)V=I(f[q]),_.push(ql(T,r,V,a));return new Rn(_);case"LineString":case"MultiLineString":return U=ro(f,c.type==="LineString"?0:1,I),new Fn(U,a);case"Polygon":case"MultiPolygon":return U=ro(f,c.type==="Polygon"?1:2,I),new Bi(U,a);case"GeometryCollection":for(q=0,ot=c.geometries.length;q<ot;q++){var ut=io({geometry:c.geometries[q],type:"Feature",properties:r.properties},a);ut&&_.push(ut);}return new Rn(_);case"FeatureCollection":for(q=0,ot=c.features.length;q<ot;q++){var Mt=io(c.features[q],a);Mt&&_.push(Mt);}return new Rn(_);default:throw new Error("Invalid GeoJSON object.");}}function ql(r,a,c,f){return r?r(a,c):new eo(c,f&&f.markersInheritOptions&&f);}function Js(r){return new tt(r[1],r[0],r[2]);}function ro(r,a,c){for(var f=[],_=0,T=r.length,I;_<T;_++)I=a?ro(r[_],a-1,c):(c||Js)(r[_]),f.push(I);return f;}function Ks(r,a){return r=K(r),r.alt!==void 0?[m(r.lng,a),m(r.lat,a),m(r.alt,a)]:[m(r.lng,a),m(r.lat,a)];}function oo(r,a,c,f){for(var _=[],T=0,I=r.length;T<I;T++)_.push(a?oo(r[T],Ke(r[T])?0:a-1,c,f):Ks(r[T],f));return!a&&c&&_.length>0&&_.push(_[0].slice()),_;}function Di(r,a){return r.feature?n({},r.feature,{geometry:a}):so(a);}function so(r){return r.type==="Feature"||r.type==="FeatureCollection"?r:{type:"Feature",properties:{},geometry:r};}var Qs={toGeoJSON:function(r){return Di(this,{type:"Point",coordinates:Ks(this.getLatLng(),r)});}};eo.include(Qs),Xs.include(Qs),no.include(Qs),Fn.include({toGeoJSON:function(r){var a=!Ke(this._latlngs),c=oo(this._latlngs,a?1:0,!1,r);return Di(this,{type:(a?"Multi":"")+"LineString",coordinates:c});}}),Bi.include({toGeoJSON:function(r){var a=!Ke(this._latlngs),c=a&&!Ke(this._latlngs[0]),f=oo(this._latlngs,c?2:a?1:0,!0,r);return a||(f=[f]),Di(this,{type:(c?"Multi":"")+"Polygon",coordinates:f});}}),Fi.include({toMultiPoint:function(r){var a=[];return this.eachLayer(function(c){a.push(c.toGeoJSON(r).geometry.coordinates);}),Di(this,{type:"MultiPoint",coordinates:a});},toGeoJSON:function(r){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(r);var c=a==="GeometryCollection",f=[];return this.eachLayer(function(_){if(_.toGeoJSON){var T=_.toGeoJSON(r);if(c)f.push(T.geometry);else{var I=so(T);I.type==="FeatureCollection"?f.push.apply(f,I.features):f.push(I);}}}),c?Di(this,{geometries:f,type:"GeometryCollection"}):{type:"FeatureCollection",features:f};}});function Yl(r,a){return new Nn(r,a);}var qf=Yl,ao=un.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(r,a,c){this._url=r,this._bounds=J(a),g(this,c);},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(bt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset();},onRemove:function(){Zt(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image);},setOpacity:function(r){return this.options.opacity=r,this._image&&this._updateOpacity(),this;},setStyle:function(r){return r.opacity&&this.setOpacity(r.opacity),this;},bringToFront:function(){return this._map&&Li(this._image),this;},bringToBack:function(){return this._map&&Ri(this._image),this;},setUrl:function(r){return this._url=r,this._image&&(this._image.src=r),this;},setBounds:function(r){return this._bounds=J(r),this._map&&this._reset(),this;},getEvents:function(){var r={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(r.zoomanim=this._animateZoom),r;},setZIndex:function(r){return this.options.zIndex=r,this._updateZIndex(),this;},getBounds:function(){return this._bounds;},getElement:function(){return this._image;},_initImage:function(){var r=this._url.tagName==="IMG",a=this._image=r?this._url:Lt("img");if(bt(a,"leaflet-image-layer"),this._zoomAnimated&&bt(a,"leaflet-zoom-animated"),this.options.className&&bt(a,this.options.className),a.onselectstart=u,a.onmousemove=u,a.onload=o(this.fire,this,"load"),a.onerror=o(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),r){this._url=a.src;return;}a.src=this._url,a.alt=this.options.alt;},_animateZoom:function(r){var a=this._map.getZoomScale(r.zoom),c=this._map._latLngBoundsToNewLayerBounds(this._bounds,r.zoom,r.center).min;oi(this._image,c,a);},_reset:function(){var r=this._image,a=new M(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),c=a.getSize();ne(r,a.min),r.style.width=c.x+"px",r.style.height=c.y+"px";},_updateOpacity:function(){Je(this._image,this.options.opacity);},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex);},_overlayOnError:function(){this.fire("error");var r=this.options.errorOverlayUrl;r&&this._url!==r&&(this._url=r,this._image.src=r);},getCenter:function(){return this._bounds.getCenter();}}),Yf=function(r,a,c){return new ao(r,a,c);},Xl=ao.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var r=this._url.tagName==="VIDEO",a=this._image=r?this._url:Lt("video");if(bt(a,"leaflet-image-layer"),this._zoomAnimated&&bt(a,"leaflet-zoom-animated"),this.options.className&&bt(a,this.options.className),a.onselectstart=u,a.onmousemove=u,a.onloadeddata=o(this.fire,this,"load"),r){for(var c=a.getElementsByTagName("source"),f=[],_=0;_<c.length;_++)f.push(c[_].src);this._url=c.length>0?f:[a.src];return;}v(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var T=0;T<this._url.length;T++){var I=Lt("source");I.src=this._url[T],a.appendChild(I);}}});function Xf(r,a,c){return new Xl(r,a,c);}var Jl=ao.extend({_initImage:function(){var r=this._image=this._url;bt(r,"leaflet-image-layer"),this._zoomAnimated&&bt(r,"leaflet-zoom-animated"),this.options.className&&bt(r,this.options.className),r.onselectstart=u,r.onmousemove=u;}});function Jf(r,a,c){return new Jl(r,a,c);}var En=un.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(r,a){r&&(r instanceof tt||v(r))?(this._latlng=K(r),g(this,a)):(g(this,r),this._source=a),this.options.content&&(this._content=this.options.content);},openOn:function(r){return r=arguments.length?r:this._source._map,r.hasLayer(this)||r.addLayer(this),this;},close:function(){return this._map&&this._map.removeLayer(this),this;},toggle:function(r){return this._map?this.close():(arguments.length?this._source=r:r=this._source,this._prepareOpen(),this.openOn(r._map)),this;},onAdd:function(r){this._zoomAnimated=r._zoomAnimated,this._container||this._initLayout(),r._fadeAnimated&&Je(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),r._fadeAnimated&&Je(this._container,1),this.bringToFront(),this.options.interactive&&(bt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container));},onRemove:function(r){r._fadeAnimated?(Je(this._container,0),this._removeTimeout=setTimeout(o(Zt,void 0,this._container),200)):Zt(this._container),this.options.interactive&&(te(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container));},getLatLng:function(){return this._latlng;},setLatLng:function(r){return this._latlng=K(r),this._map&&(this._updatePosition(),this._adjustPan()),this;},getContent:function(){return this._content;},setContent:function(r){return this._content=r,this.update(),this;},getElement:function(){return this._container;},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan());},getEvents:function(){var r={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(r.zoomanim=this._animateZoom),r;},isOpen:function(){return!!this._map&&this._map.hasLayer(this);},bringToFront:function(){return this._map&&Li(this._container),this;},bringToBack:function(){return this._map&&Ri(this._container),this;},_prepareOpen:function(r){var a=this._source;if(!a._map)return!1;if(a instanceof Rn){a=null;var c=this._source._layers;for(var f in c)if(c[f]._map){a=c[f];break;}if(!a)return!1;this._source=a;}if(!r)if(a.getCenter)r=a.getCenter();else if(a.getLatLng)r=a.getLatLng();else if(a.getBounds)r=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(r),this._map&&this.update(),!0;},_updateContent:function(){if(this._content){var r=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")r.innerHTML=a;else{for(;r.hasChildNodes();)r.removeChild(r.firstChild);r.appendChild(a);}this.fire("contentupdate");}},_updatePosition:function(){if(this._map){var r=this._map.latLngToLayerPoint(this._latlng),a=x(this.options.offset),c=this._getAnchor();this._zoomAnimated?ne(this._container,r.add(c)):a=a.add(r).add(c);var f=this._containerBottom=-a.y,_=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=f+"px",this._container.style.left=_+"px";}},_getAnchor:function(){return[0,0];}});At.include({_initOverlay:function(r,a,c,f){var _=a;return _ instanceof r||(_=new r(f).setContent(a)),c&&_.setLatLng(c),_;}}),un.include({_initOverlay:function(r,a,c,f){var _=c;return _ instanceof r?(g(_,f),_._source=this):(_=a&&!f?a:new r(f,this),_.setContent(c)),_;}});var lo=En.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(r){return r=arguments.length?r:this._source._map,!r.hasLayer(this)&&r._popup&&r._popup.options.autoClose&&r.removeLayer(r._popup),r._popup=this,En.prototype.openOn.call(this,r);},onAdd:function(r){En.prototype.onAdd.call(this,r),r.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof qn||this._source.on("preclick",ai));},onRemove:function(r){En.prototype.onRemove.call(this,r),r.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof qn||this._source.off("preclick",ai));},getEvents:function(){var r=En.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(r.preclick=this.close),this.options.keepInView&&(r.moveend=this._adjustPan),r;},_initLayout:function(){var r="leaflet-popup",a=this._container=Lt("div",r+" "+(this.options.className||"")+" leaflet-zoom-animated"),c=this._wrapper=Lt("div",r+"-content-wrapper",a);if(this._contentNode=Lt("div",r+"-content",c),dr(a),Gs(this._contentNode),Ct(a,"contextmenu",ai),this._tipContainer=Lt("div",r+"-tip-container",a),this._tip=Lt("div",r+"-tip",this._tipContainer),this.options.closeButton){var f=this._closeButton=Lt("a",r+"-close-button",a);f.setAttribute("role","button"),f.setAttribute("aria-label","Close popup"),f.href="#close",f.innerHTML='<span aria-hidden="true">&#215;</span>',Ct(f,"click",function(_){_e(_),this.close();},this);}},_updateLayout:function(){var r=this._contentNode,a=r.style;a.width="",a.whiteSpace="nowrap";var c=r.offsetWidth;c=Math.min(c,this.options.maxWidth),c=Math.max(c,this.options.minWidth),a.width=c+1+"px",a.whiteSpace="",a.height="";var f=r.offsetHeight,_=this.options.maxHeight,T="leaflet-popup-scrolled";_&&f>_?(a.height=_+"px",bt(r,T)):te(r,T),this._containerWidth=this._container.offsetWidth;},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center),c=this._getAnchor();ne(this._container,a.add(c));},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return;}var r=this._map,a=parseInt(hr(this._container,"marginBottom"),10)||0,c=this._container.offsetHeight+a,f=this._containerWidth,_=new w(this._containerLeft,-c-this._containerBottom);_._add(si(this._container));var T=r.layerPointToContainerPoint(_),I=x(this.options.autoPanPadding),V=x(this.options.autoPanPaddingTopLeft||I),U=x(this.options.autoPanPaddingBottomRight||I),q=r.getSize(),ot=0,ut=0;T.x+f+U.x>q.x&&(ot=T.x+f-q.x+U.x),T.x-ot-V.x<0&&(ot=T.x-V.x),T.y+c+U.y>q.y&&(ut=T.y+c-q.y+U.y),T.y-ut-V.y<0&&(ut=T.y-V.y),(ot||ut)&&(this.options.keepInView&&(this._autopanning=!0),r.fire("autopanstart").panBy([ot,ut]));}},_getAnchor:function(){return x(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0]);}}),Kf=function(r,a){return new lo(r,a);};At.mergeOptions({closePopupOnClick:!0}),At.include({openPopup:function(r,a,c){return this._initOverlay(lo,r,a,c).openOn(this),this;},closePopup:function(r){return r=arguments.length?r:this._popup,r&&r.close(),this;}}),un.include({bindPopup:function(r,a){return this._popup=this._initOverlay(lo,this._popup,r,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this;},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this;},openPopup:function(r){return this._popup&&(this instanceof Rn||(this._popup._source=this),this._popup._prepareOpen(r||this._latlng)&&this._popup.openOn(this._map)),this;},closePopup:function(){return this._popup&&this._popup.close(),this;},togglePopup:function(){return this._popup&&this._popup.toggle(this),this;},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1;},setPopupContent:function(r){return this._popup&&this._popup.setContent(r),this;},getPopup:function(){return this._popup;},_openPopup:function(r){if(!(!this._popup||!this._map)){li(r);var a=r.layer||r.target;if(this._popup._source===a&&!(a instanceof qn)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(r.latlng);return;}this._popup._source=a,this.openPopup(r.latlng);}},_movePopup:function(r){this._popup.setLatLng(r.latlng);},_onKeyPress:function(r){r.originalEvent.keyCode===13&&this._openPopup(r);}});var co=En.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(r){En.prototype.onAdd.call(this,r),this.setOpacity(this.options.opacity),r.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0));},onRemove:function(r){En.prototype.onRemove.call(this,r),r.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0));},getEvents:function(){var r=En.prototype.getEvents.call(this);return this.options.permanent||(r.preclick=this.close),r;},_initLayout:function(){var r="leaflet-tooltip",a=r+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Lt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+l(this));},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(r){var a,c,f=this._map,_=this._container,T=f.latLngToContainerPoint(f.getCenter()),I=f.layerPointToContainerPoint(r),V=this.options.direction,U=_.offsetWidth,q=_.offsetHeight,ot=x(this.options.offset),ut=this._getAnchor();V==="top"?(a=U/2,c=q):V==="bottom"?(a=U/2,c=0):V==="center"?(a=U/2,c=q/2):V==="right"?(a=0,c=q/2):V==="left"?(a=U,c=q/2):I.x<T.x?(V="right",a=0,c=q/2):(V="left",a=U+(ot.x+ut.x)*2,c=q/2),r=r.subtract(x(a,c,!0)).add(ot).add(ut),te(_,"leaflet-tooltip-right"),te(_,"leaflet-tooltip-left"),te(_,"leaflet-tooltip-top"),te(_,"leaflet-tooltip-bottom"),bt(_,"leaflet-tooltip-"+V),ne(_,r);},_updatePosition:function(){var r=this._map.latLngToLayerPoint(this._latlng);this._setPosition(r);},setOpacity:function(r){this.options.opacity=r,this._container&&Je(this._container,r);},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center);this._setPosition(a);},_getAnchor:function(){return x(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0]);}}),Qf=function(r,a){return new co(r,a);};At.include({openTooltip:function(r,a,c){return this._initOverlay(co,r,a,c).openOn(this),this;},closeTooltip:function(r){return r.close(),this;}}),un.include({bindTooltip:function(r,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(co,this._tooltip,r,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this;},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this;},_initTooltipInteractions:function(r){if(!(!r&&this._tooltipHandlersAdded)){var a=r?"off":"on",c={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?c.add=this._openTooltip:(c.mouseover=this._openTooltip,c.mouseout=this.closeTooltip,c.click=this._openTooltip,this._map?this._addFocusListeners():c.add=this._addFocusListeners),this._tooltip.options.sticky&&(c.mousemove=this._moveTooltip),this[a](c),this._tooltipHandlersAdded=!r;}},openTooltip:function(r){return this._tooltip&&(this instanceof Rn||(this._tooltip._source=this),this._tooltip._prepareOpen(r)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this;},closeTooltip:function(){if(this._tooltip)return this._tooltip.close();},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this;},isTooltipOpen:function(){return this._tooltip.isOpen();},setTooltipContent:function(r){return this._tooltip&&this._tooltip.setContent(r),this;},getTooltip:function(){return this._tooltip;},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this);},_addFocusListenersOnLayer:function(r){var a=typeof r.getElement=="function"&&r.getElement();a&&(Ct(a,"focus",function(){this._tooltip._source=r,this.openTooltip();},this),Ct(a,"blur",this.closeTooltip,this));},_setAriaDescribedByOnLayer:function(r){var a=typeof r.getElement=="function"&&r.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id);},_openTooltip:function(r){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(r);});return;}this._tooltip._source=r.layer||r.target,this.openTooltip(this._tooltip.options.sticky?r.latlng:void 0);}},_moveTooltip:function(r){var a=r.latlng,c,f;this._tooltip.options.sticky&&r.originalEvent&&(c=this._map.mouseEventToContainerPoint(r.originalEvent),f=this._map.containerPointToLayerPoint(c),a=this._map.layerPointToLatLng(f)),this._tooltip.setLatLng(a);}});var Kl=Ni.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(r){var a=r&&r.tagName==="DIV"?r:document.createElement("div"),c=this.options;if(c.html instanceof Element?(Yr(a),a.appendChild(c.html)):a.innerHTML=c.html!==!1?c.html:"",c.bgPos){var f=x(c.bgPos);a.style.backgroundPosition=-f.x+"px "+-f.y+"px";}return this._setIconStyles(a,"icon"),a;},createShadow:function(){return null;}});function tu(r){return new Kl(r);}Ni.Default=_r;var vr=un.extend({options:{tileSize:256,opacity:1,updateWhenIdle:pt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(r){g(this,r);},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView();},beforeAdd:function(r){r._addZoomLimit(this);},onRemove:function(r){this._removeAllTiles(),Zt(this._container),r._removeZoomLimit(this),this._container=null,this._tileZoom=void 0;},bringToFront:function(){return this._map&&(Li(this._container),this._setAutoZIndex(Math.max)),this;},bringToBack:function(){return this._map&&(Ri(this._container),this._setAutoZIndex(Math.min)),this;},getContainer:function(){return this._container;},setOpacity:function(r){return this.options.opacity=r,this._updateOpacity(),this;},setZIndex:function(r){return this.options.zIndex=r,this._updateZIndex(),this;},isLoading:function(){return this._loading;},redraw:function(){if(this._map){this._removeAllTiles();var r=this._clampZoom(this._map.getZoom());r!==this._tileZoom&&(this._tileZoom=r,this._updateLevels()),this._update();}return this;},getEvents:function(){var r={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=h(this._onMoveEnd,this.options.updateInterval,this)),r.move=this._onMove),this._zoomAnimated&&(r.zoomanim=this._animateZoom),r;},createTile:function(){return document.createElement("div");},getTileSize:function(){var r=this.options.tileSize;return r instanceof w?r:new w(r,r);},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex);},_setAutoZIndex:function(r){for(var a=this.getPane().children,c=-r(-1/0,1/0),f=0,_=a.length,T;f<_;f++)T=a[f].style.zIndex,a[f]!==this._container&&T&&(c=r(c,+T));isFinite(c)&&(this.options.zIndex=c+r(-1,1),this._updateZIndex());},_updateOpacity:function(){if(this._map&&!pt.ielt9){Je(this._container,this.options.opacity);var r=+new Date(),a=!1,c=!1;for(var f in this._tiles){var _=this._tiles[f];if(!(!_.current||!_.loaded)){var T=Math.min(1,(r-_.loaded)/200);Je(_.el,T),T<1?a=!0:(_.active?c=!0:this._onOpaqueTile(_),_.active=!0);}}c&&!this._noPrune&&this._pruneTiles(),a&&(it(this._fadeFrame),this._fadeFrame=H(this._updateOpacity,this));}},_onOpaqueTile:u,_initContainer:function(){this._container||(this._container=Lt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container));},_updateLevels:function(){var r=this._tileZoom,a=this.options.maxZoom;if(r!==void 0){for(var c in this._levels)c=Number(c),this._levels[c].el.children.length||c===r?(this._levels[c].el.style.zIndex=a-Math.abs(r-c),this._onUpdateLevel(c)):(Zt(this._levels[c].el),this._removeTilesAtZoom(c),this._onRemoveLevel(c),delete this._levels[c]);var f=this._levels[r],_=this._map;return f||(f=this._levels[r]={},f.el=Lt("div","leaflet-tile-container leaflet-zoom-animated",this._container),f.el.style.zIndex=a,f.origin=_.project(_.unproject(_.getPixelOrigin()),r).round(),f.zoom=r,this._setZoomTransform(f,_.getCenter(),_.getZoom()),u(f.el.offsetWidth),this._onCreateLevel(f)),this._level=f,f;}},_onUpdateLevel:u,_onRemoveLevel:u,_onCreateLevel:u,_pruneTiles:function(){if(this._map){var r,a,c=this._map.getZoom();if(c>this.options.maxZoom||c<this.options.minZoom){this._removeAllTiles();return;}for(r in this._tiles)a=this._tiles[r],a.retain=a.current;for(r in this._tiles)if(a=this._tiles[r],a.current&&!a.active){var f=a.coords;this._retainParent(f.x,f.y,f.z,f.z-5)||this._retainChildren(f.x,f.y,f.z,f.z+2);}for(r in this._tiles)this._tiles[r].retain||this._removeTile(r);}},_removeTilesAtZoom:function(r){for(var a in this._tiles)this._tiles[a].coords.z===r&&this._removeTile(a);},_removeAllTiles:function(){for(var r in this._tiles)this._removeTile(r);},_invalidateAll:function(){for(var r in this._levels)Zt(this._levels[r].el),this._onRemoveLevel(Number(r)),delete this._levels[r];this._removeAllTiles(),this._tileZoom=void 0;},_retainParent:function(r,a,c,f){var _=Math.floor(r/2),T=Math.floor(a/2),I=c-1,V=new w(+_,+T);V.z=+I;var U=this._tileCoordsToKey(V),q=this._tiles[U];return q&&q.active?(q.retain=!0,!0):(q&&q.loaded&&(q.retain=!0),I>f?this._retainParent(_,T,I,f):!1);},_retainChildren:function(r,a,c,f){for(var _=2*r;_<2*r+2;_++)for(var T=2*a;T<2*a+2;T++){var I=new w(_,T);I.z=c+1;var V=this._tileCoordsToKey(I),U=this._tiles[V];if(U&&U.active){U.retain=!0;continue;}else U&&U.loaded&&(U.retain=!0);c+1<f&&this._retainChildren(_,T,c+1,f);}},_resetView:function(r){var a=r&&(r.pinch||r.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a);},_animateZoom:function(r){this._setView(r.center,r.zoom,!0,r.noUpdate);},_clampZoom:function(r){var a=this.options;return a.minNativeZoom!==void 0&&r<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<r?a.maxNativeZoom:r;},_setView:function(r,a,c,f){var _=Math.round(a);this.options.maxZoom!==void 0&&_>this.options.maxZoom||this.options.minZoom!==void 0&&_<this.options.minZoom?_=void 0:_=this._clampZoom(_);var T=this.options.updateWhenZooming&&_!==this._tileZoom;(!f||T)&&(this._tileZoom=_,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),_!==void 0&&this._update(r),c||this._pruneTiles(),this._noPrune=!!c),this._setZoomTransforms(r,a);},_setZoomTransforms:function(r,a){for(var c in this._levels)this._setZoomTransform(this._levels[c],r,a);},_setZoomTransform:function(r,a,c){var f=this._map.getZoomScale(c,r.zoom),_=r.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(a,c)).round();pt.any3d?oi(r.el,_,f):ne(r.el,_);},_resetGrid:function(){var r=this._map,a=r.options.crs,c=this._tileSize=this.getTileSize(),f=this._tileZoom,_=this._map.getPixelWorldBounds(this._tileZoom);_&&(this._globalTileRange=this._pxBoundsToTileRange(_)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(r.project([0,a.wrapLng[0]],f).x/c.x),Math.ceil(r.project([0,a.wrapLng[1]],f).x/c.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(r.project([a.wrapLat[0],0],f).y/c.x),Math.ceil(r.project([a.wrapLat[1],0],f).y/c.y)];},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update();},_getTiledPixelBounds:function(r){var a=this._map,c=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),f=a.getZoomScale(c,this._tileZoom),_=a.project(r,this._tileZoom).floor(),T=a.getSize().divideBy(f*2);return new M(_.subtract(T),_.add(T));},_update:function(r){var a=this._map;if(a){var c=this._clampZoom(a.getZoom());if(r===void 0&&(r=a.getCenter()),this._tileZoom!==void 0){var f=this._getTiledPixelBounds(r),_=this._pxBoundsToTileRange(f),T=_.getCenter(),I=[],V=this.options.keepBuffer,U=new M(_.getBottomLeft().subtract([V,-V]),_.getTopRight().add([V,-V]));if(!(isFinite(_.min.x)&&isFinite(_.min.y)&&isFinite(_.max.x)&&isFinite(_.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var q in this._tiles){var ot=this._tiles[q].coords;(ot.z!==this._tileZoom||!U.contains(new w(ot.x,ot.y)))&&(this._tiles[q].current=!1);}if(Math.abs(c-this._tileZoom)>1){this._setView(r,c);return;}for(var ut=_.min.y;ut<=_.max.y;ut++)for(var Mt=_.min.x;Mt<=_.max.x;Mt++){var Oe=new w(Mt,ut);if(Oe.z=this._tileZoom,!!this._isValidTile(Oe)){var ue=this._tiles[this._tileCoordsToKey(Oe)];ue?ue.current=!0:I.push(Oe);}}if(I.sort(function(Ne,Vi){return Ne.distanceTo(T)-Vi.distanceTo(T);}),I.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Qe=document.createDocumentFragment();for(Mt=0;Mt<I.length;Mt++)this._addTile(I[Mt],Qe);this._level.el.appendChild(Qe);}}}},_isValidTile:function(r){var a=this._map.options.crs;if(!a.infinite){var c=this._globalTileRange;if(!a.wrapLng&&(r.x<c.min.x||r.x>c.max.x)||!a.wrapLat&&(r.y<c.min.y||r.y>c.max.y))return!1;}if(!this.options.bounds)return!0;var f=this._tileCoordsToBounds(r);return J(this.options.bounds).overlaps(f);},_keyToBounds:function(r){return this._tileCoordsToBounds(this._keyToTileCoords(r));},_tileCoordsToNwSe:function(r){var a=this._map,c=this.getTileSize(),f=r.scaleBy(c),_=f.add(c),T=a.unproject(f,r.z),I=a.unproject(_,r.z);return[T,I];},_tileCoordsToBounds:function(r){var a=this._tileCoordsToNwSe(r),c=new B(a[0],a[1]);return this.options.noWrap||(c=this._map.wrapLatLngBounds(c)),c;},_tileCoordsToKey:function(r){return r.x+":"+r.y+":"+r.z;},_keyToTileCoords:function(r){var a=r.split(":"),c=new w(+a[0],+a[1]);return c.z=+a[2],c;},_removeTile:function(r){var a=this._tiles[r];a&&(Zt(a.el),delete this._tiles[r],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(r)}));},_initTile:function(r){bt(r,"leaflet-tile");var a=this.getTileSize();r.style.width=a.x+"px",r.style.height=a.y+"px",r.onselectstart=u,r.onmousemove=u,pt.ielt9&&this.options.opacity<1&&Je(r,this.options.opacity);},_addTile:function(r,a){var c=this._getTilePos(r),f=this._tileCoordsToKey(r),_=this.createTile(this._wrapCoords(r),o(this._tileReady,this,r));this._initTile(_),this.createTile.length<2&&H(o(this._tileReady,this,r,null,_)),ne(_,c),this._tiles[f]={el:_,coords:r,current:!0},a.appendChild(_),this.fire("tileloadstart",{tile:_,coords:r});},_tileReady:function(r,a,c){a&&this.fire("tileerror",{error:a,tile:c,coords:r});var f=this._tileCoordsToKey(r);c=this._tiles[f],c&&(c.loaded=+new Date(),this._map._fadeAnimated?(Je(c.el,0),it(this._fadeFrame),this._fadeFrame=H(this._updateOpacity,this)):(c.active=!0,this._pruneTiles()),a||(bt(c.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:c.el,coords:r})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),pt.ielt9||!this._map._fadeAnimated?H(this._pruneTiles,this):setTimeout(o(this._pruneTiles,this),250)));},_getTilePos:function(r){return r.scaleBy(this.getTileSize()).subtract(this._level.origin);},_wrapCoords:function(r){var a=new w(this._wrapX?p(r.x,this._wrapX):r.x,this._wrapY?p(r.y,this._wrapY):r.y);return a.z=r.z,a;},_pxBoundsToTileRange:function(r){var a=this.getTileSize();return new M(r.min.unscaleBy(a).floor(),r.max.unscaleBy(a).ceil().subtract([1,1]));},_noTilesToLoad:function(){for(var r in this._tiles)if(!this._tiles[r].loaded)return!1;return!0;}});function eu(r){return new vr(r);}var zi=vr.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(r,a){this._url=r,a=g(this,a),a.detectRetina&&pt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove);},setUrl:function(r,a){return this._url===r&&a===void 0&&(a=!0),this._url=r,a||this.redraw(),this;},createTile:function(r,a){var c=document.createElement("img");return Ct(c,"load",o(this._tileOnLoad,this,a,c)),Ct(c,"error",o(this._tileOnError,this,a,c)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(c.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(c.referrerPolicy=this.options.referrerPolicy),c.alt="",c.src=this.getTileUrl(r),c;},getTileUrl:function(r){var a={r:pt.retina?"@2x":"",s:this._getSubdomain(r),x:r.x,y:r.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var c=this._globalTileRange.max.y-r.y;this.options.tms&&(a.y=c),a["-y"]=c;}return k(this._url,n(a,this.options));},_tileOnLoad:function(r,a){pt.ielt9?setTimeout(o(r,this,null,a),0):r(null,a);},_tileOnError:function(r,a,c){var f=this.options.errorTileUrl;f&&a.getAttribute("src")!==f&&(a.src=f),r(c,a);},_onTileRemove:function(r){r.tile.onload=null;},_getZoomForUrl:function(){var r=this._tileZoom,a=this.options.maxZoom,c=this.options.zoomReverse,f=this.options.zoomOffset;return c&&(r=a-r),r+f;},_getSubdomain:function(r){var a=Math.abs(r.x+r.y)%this.options.subdomains.length;return this.options.subdomains[a];},_abortLoading:function(){var r,a;for(r in this._tiles)if(this._tiles[r].coords.z!==this._tileZoom&&(a=this._tiles[r].el,a.onload=u,a.onerror=u,!a.complete)){a.src=y;var c=this._tiles[r].coords;Zt(a),delete this._tiles[r],this.fire("tileabort",{tile:a,coords:c});}},_removeTile:function(r){var a=this._tiles[r];if(a)return a.el.setAttribute("src",y),vr.prototype._removeTile.call(this,r);},_tileReady:function(r,a,c){if(!(!this._map||c&&c.getAttribute("src")===y))return vr.prototype._tileReady.call(this,r,a,c);}});function Ql(r,a){return new zi(r,a);}var tc=zi.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(r,a){this._url=r;var c=n({},this.defaultWmsParams);for(var f in a)f in this.options||(c[f]=a[f]);a=g(this,a);var _=a.detectRetina&&pt.retina?2:1,T=this.getTileSize();c.width=T.x*_,c.height=T.y*_,this.wmsParams=c;},onAdd:function(r){this._crs=this.options.crs||r.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,zi.prototype.onAdd.call(this,r);},getTileUrl:function(r){var a=this._tileCoordsToNwSe(r),c=this._crs,f=z(c.project(a[0]),c.project(a[1])),_=f.min,T=f.max,I=(this._wmsVersion>=1.3&&this._crs===Zl?[_.y,_.x,T.y,T.x]:[_.x,_.y,T.x,T.y]).join(","),V=zi.prototype.getTileUrl.call(this,r);return V+E(this.wmsParams,V,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+I;},setParams:function(r,a){return n(this.wmsParams,r),a||this.redraw(),this;}});function nu(r,a){return new tc(r,a);}zi.WMS=tc,Ql.wms=nu;var Bn=un.extend({options:{padding:.1},initialize:function(r){g(this,r),l(this),this._layers=this._layers||{};},onAdd:function(){this._container||(this._initContainer(),bt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this);},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer();},getEvents:function(){var r={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(r.zoomanim=this._onAnimZoom),r;},_onAnimZoom:function(r){this._updateTransform(r.center,r.zoom);},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom());},_updateTransform:function(r,a){var c=this._map.getZoomScale(a,this._zoom),f=this._map.getSize().multiplyBy(.5+this.options.padding),_=this._map.project(this._center,a),T=f.multiplyBy(-c).add(_).subtract(this._map._getNewPixelOrigin(r,a));pt.any3d?oi(this._container,T,c):ne(this._container,T);},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var r in this._layers)this._layers[r]._reset();},_onZoomEnd:function(){for(var r in this._layers)this._layers[r]._project();},_updatePaths:function(){for(var r in this._layers)this._layers[r]._update();},_update:function(){var r=this.options.padding,a=this._map.getSize(),c=this._map.containerPointToLayerPoint(a.multiplyBy(-r)).round();this._bounds=new M(c,c.add(a.multiplyBy(1+r*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom();}}),ec=Bn.extend({options:{tolerance:0},getEvents:function(){var r=Bn.prototype.getEvents.call(this);return r.viewprereset=this._onViewPreReset,r;},_onViewPreReset:function(){this._postponeUpdatePaths=!0;},onAdd:function(){Bn.prototype.onAdd.call(this),this._draw();},_initContainer:function(){var r=this._container=document.createElement("canvas");Ct(r,"mousemove",this._onMouseMove,this),Ct(r,"click dblclick mousedown mouseup contextmenu",this._onClick,this),Ct(r,"mouseout",this._handleMouseOut,this),r._leaflet_disable_events=!0,this._ctx=r.getContext("2d");},_destroyContainer:function(){it(this._redrawRequest),delete this._ctx,Zt(this._container),$t(this._container),delete this._container;},_updatePaths:function(){if(!this._postponeUpdatePaths){var r;this._redrawBounds=null;for(var a in this._layers)r=this._layers[a],r._update();this._redraw();}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Bn.prototype._update.call(this);var r=this._bounds,a=this._container,c=r.getSize(),f=pt.retina?2:1;ne(a,r.min),a.width=f*c.x,a.height=f*c.y,a.style.width=c.x+"px",a.style.height=c.y+"px",pt.retina&&this._ctx.scale(2,2),this._ctx.translate(-r.min.x,-r.min.y),this.fire("update");}},_reset:function(){Bn.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths());},_initPath:function(r){this._updateDashArray(r),this._layers[l(r)]=r;var a=r._order={layer:r,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast;},_addPath:function(r){this._requestRedraw(r);},_removePath:function(r){var a=r._order,c=a.next,f=a.prev;c?c.prev=f:this._drawLast=f,f?f.next=c:this._drawFirst=c,delete r._order,delete this._layers[l(r)],this._requestRedraw(r);},_updatePath:function(r){this._extendRedrawBounds(r),r._project(),r._update(),this._requestRedraw(r);},_updateStyle:function(r){this._updateDashArray(r),this._requestRedraw(r);},_updateDashArray:function(r){if(typeof r.options.dashArray=="string"){var a=r.options.dashArray.split(/[, ]+/),c=[],f,_;for(_=0;_<a.length;_++){if(f=Number(a[_]),isNaN(f))return;c.push(f);}r.options._dashArray=c;}else r.options._dashArray=r.options.dashArray;},_requestRedraw:function(r){this._map&&(this._extendRedrawBounds(r),this._redrawRequest=this._redrawRequest||H(this._redraw,this));},_extendRedrawBounds:function(r){if(r._pxBounds){var a=(r.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new M(),this._redrawBounds.extend(r._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(r._pxBounds.max.add([a,a]));}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null;},_clear:function(){var r=this._redrawBounds;if(r){var a=r.getSize();this._ctx.clearRect(r.min.x,r.min.y,a.x,a.y);}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore();},_draw:function(){var r,a=this._redrawBounds;if(this._ctx.save(),a){var c=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,c.x,c.y),this._ctx.clip();}this._drawing=!0;for(var f=this._drawFirst;f;f=f.next)r=f.layer,(!a||r._pxBounds&&r._pxBounds.intersects(a))&&r._updatePath();this._drawing=!1,this._ctx.restore();},_updatePoly:function(r,a){if(this._drawing){var c,f,_,T,I=r._parts,V=I.length,U=this._ctx;if(V){for(U.beginPath(),c=0;c<V;c++){for(f=0,_=I[c].length;f<_;f++)T=I[c][f],U[f?"lineTo":"moveTo"](T.x,T.y);a&&U.closePath();}this._fillStroke(U,r);}}},_updateCircle:function(r){if(!(!this._drawing||r._empty())){var a=r._point,c=this._ctx,f=Math.max(Math.round(r._radius),1),_=(Math.max(Math.round(r._radiusY),1)||f)/f;_!==1&&(c.save(),c.scale(1,_)),c.beginPath(),c.arc(a.x,a.y/_,f,0,Math.PI*2,!1),_!==1&&c.restore(),this._fillStroke(c,r);}},_fillStroke:function(r,a){var c=a.options;c.fill&&(r.globalAlpha=c.fillOpacity,r.fillStyle=c.fillColor||c.color,r.fill(c.fillRule||"evenodd")),c.stroke&&c.weight!==0&&(r.setLineDash&&r.setLineDash(a.options&&a.options._dashArray||[]),r.globalAlpha=c.opacity,r.lineWidth=c.weight,r.strokeStyle=c.color,r.lineCap=c.lineCap,r.lineJoin=c.lineJoin,r.stroke());},_onClick:function(r){for(var a=this._map.mouseEventToLayerPoint(r),c,f,_=this._drawFirst;_;_=_.next)c=_.layer,c.options.interactive&&c._containsPoint(a)&&(!(r.type==="click"||r.type==="preclick")||!this._map._draggableMoved(c))&&(f=c);this._fireEvent(f?[f]:!1,r);},_onMouseMove:function(r){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(r);this._handleMouseHover(r,a);}},_handleMouseOut:function(r){var a=this._hoveredLayer;a&&(te(this._container,"leaflet-interactive"),this._fireEvent([a],r,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1);},_handleMouseHover:function(r,a){if(!this._mouseHoverThrottled){for(var c,f,_=this._drawFirst;_;_=_.next)c=_.layer,c.options.interactive&&c._containsPoint(a)&&(f=c);f!==this._hoveredLayer&&(this._handleMouseOut(r),f&&(bt(this._container,"leaflet-interactive"),this._fireEvent([f],r,"mouseover"),this._hoveredLayer=f)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,r),this._mouseHoverThrottled=!0,setTimeout(o(function(){this._mouseHoverThrottled=!1;},this),32);}},_fireEvent:function(r,a,c){this._map._fireDOMEvent(a,c||a.type,r);},_bringToFront:function(r){var a=r._order;if(a){var c=a.next,f=a.prev;if(c)c.prev=f;else return;f?f.next=c:c&&(this._drawFirst=c),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(r);}},_bringToBack:function(r){var a=r._order;if(a){var c=a.next,f=a.prev;if(f)f.next=c;else return;c?c.prev=f:f&&(this._drawLast=f),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(r);}}});function nc(r){return pt.canvas?new ec(r):null;}var yr=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(r){return document.createElement("<lvml:"+r+' class="lvml">');};}catch{}return function(r){return document.createElement("<"+r+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');};}(),iu={_initContainer:function(){this._container=Lt("div","leaflet-vml-container");},_update:function(){this._map._animatingZoom||(Bn.prototype._update.call(this),this.fire("update"));},_initPath:function(r){var a=r._container=yr("shape");bt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",r._path=yr("path"),a.appendChild(r._path),this._updateStyle(r),this._layers[l(r)]=r;},_addPath:function(r){var a=r._container;this._container.appendChild(a),r.options.interactive&&r.addInteractiveTarget(a);},_removePath:function(r){var a=r._container;Zt(a),r.removeInteractiveTarget(a),delete this._layers[l(r)];},_updateStyle:function(r){var a=r._stroke,c=r._fill,f=r.options,_=r._container;_.stroked=!!f.stroke,_.filled=!!f.fill,f.stroke?(a||(a=r._stroke=yr("stroke")),_.appendChild(a),a.weight=f.weight+"px",a.color=f.color,a.opacity=f.opacity,f.dashArray?a.dashStyle=v(f.dashArray)?f.dashArray.join(" "):f.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=f.lineCap.replace("butt","flat"),a.joinstyle=f.lineJoin):a&&(_.removeChild(a),r._stroke=null),f.fill?(c||(c=r._fill=yr("fill")),_.appendChild(c),c.color=f.fillColor||f.color,c.opacity=f.fillOpacity):c&&(_.removeChild(c),r._fill=null);},_updateCircle:function(r){var a=r._point.round(),c=Math.round(r._radius),f=Math.round(r._radiusY||c);this._setPath(r,r._empty()?"M0 0":"AL "+a.x+","+a.y+" "+c+","+f+" 0,"+65535*360);},_setPath:function(r,a){r._path.v=a;},_bringToFront:function(r){Li(r._container);},_bringToBack:function(r){Ri(r._container);}},ho=pt.vml?yr:Rt,Pr=Bn.extend({_initContainer:function(){this._container=ho("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=ho("g"),this._container.appendChild(this._rootGroup);},_destroyContainer:function(){Zt(this._container),$t(this._container),delete this._container,delete this._rootGroup,delete this._svgSize;},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Bn.prototype._update.call(this);var r=this._bounds,a=r.getSize(),c=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,c.setAttribute("width",a.x),c.setAttribute("height",a.y)),ne(c,r.min),c.setAttribute("viewBox",[r.min.x,r.min.y,a.x,a.y].join(" ")),this.fire("update");}},_initPath:function(r){var a=r._path=ho("path");r.options.className&&bt(a,r.options.className),r.options.interactive&&bt(a,"leaflet-interactive"),this._updateStyle(r),this._layers[l(r)]=r;},_addPath:function(r){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(r._path),r.addInteractiveTarget(r._path);},_removePath:function(r){Zt(r._path),r.removeInteractiveTarget(r._path),delete this._layers[l(r)];},_updatePath:function(r){r._project(),r._update();},_updateStyle:function(r){var a=r._path,c=r.options;a&&(c.stroke?(a.setAttribute("stroke",c.color),a.setAttribute("stroke-opacity",c.opacity),a.setAttribute("stroke-width",c.weight),a.setAttribute("stroke-linecap",c.lineCap),a.setAttribute("stroke-linejoin",c.lineJoin),c.dashArray?a.setAttribute("stroke-dasharray",c.dashArray):a.removeAttribute("stroke-dasharray"),c.dashOffset?a.setAttribute("stroke-dashoffset",c.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),c.fill?(a.setAttribute("fill",c.fillColor||c.color),a.setAttribute("fill-opacity",c.fillOpacity),a.setAttribute("fill-rule",c.fillRule||"evenodd")):a.setAttribute("fill","none"));},_updatePoly:function(r,a){this._setPath(r,lt(r._parts,a));},_updateCircle:function(r){var a=r._point,c=Math.max(Math.round(r._radius),1),f=Math.max(Math.round(r._radiusY),1)||c,_="a"+c+","+f+" 0 1,0 ",T=r._empty()?"M0 0":"M"+(a.x-c)+","+a.y+_+c*2+",0 "+_+-c*2+",0 ";this._setPath(r,T);},_setPath:function(r,a){r._path.setAttribute("d",a);},_bringToFront:function(r){Li(r._path);},_bringToBack:function(r){Ri(r._path);}});pt.vml&&Pr.include(iu);function ic(r){return pt.svg||pt.vml?new Pr(r):null;}At.include({getRenderer:function(r){var a=r.options.renderer||this._getPaneRenderer(r.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a;},_getPaneRenderer:function(r){if(r==="overlayPane"||r===void 0)return!1;var a=this._paneRenderers[r];return a===void 0&&(a=this._createRenderer({pane:r}),this._paneRenderers[r]=a),a;},_createRenderer:function(r){return this.options.preferCanvas&&nc(r)||ic(r);}});var rc=Bi.extend({initialize:function(r,a){Bi.prototype.initialize.call(this,this._boundsToLatLngs(r),a);},setBounds:function(r){return this.setLatLngs(this._boundsToLatLngs(r));},_boundsToLatLngs:function(r){return r=J(r),[r.getSouthWest(),r.getNorthWest(),r.getNorthEast(),r.getSouthEast()];}});function ru(r,a){return new rc(r,a);}Pr.create=ho,Pr.pointsToPath=lt,Nn.geometryToLayer=io,Nn.coordsToLatLng=Js,Nn.coordsToLatLngs=ro,Nn.latLngToCoords=Ks,Nn.latLngsToCoords=oo,Nn.getFeature=Di,Nn.asFeature=so,At.mergeOptions({boxZoom:!0});var oc=bn.extend({initialize:function(r){this._map=r,this._container=r._container,this._pane=r._panes.overlayPane,this._resetStateTimeout=0,r.on("unload",this._destroy,this);},addHooks:function(){Ct(this._container,"mousedown",this._onMouseDown,this);},removeHooks:function(){$t(this._container,"mousedown",this._onMouseDown,this);},moved:function(){return this._moved;},_destroy:function(){Zt(this._pane),delete this._pane;},_resetState:function(){this._resetStateTimeout=0,this._moved=!1;},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0);},_onMouseDown:function(r){if(!r.shiftKey||r.which!==1&&r.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),pr(),Rs(),this._startPoint=this._map.mouseEventToContainerPoint(r),Ct(document,{contextmenu:li,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this);},_onMouseMove:function(r){this._moved||(this._moved=!0,this._box=Lt("div","leaflet-zoom-box",this._container),bt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(r);var a=new M(this._point,this._startPoint),c=a.getSize();ne(this._box,a.min),this._box.style.width=c.x+"px",this._box.style.height=c.y+"px";},_finish:function(){this._moved&&(Zt(this._box),te(this._container,"leaflet-crosshair")),fr(),Fs(),$t(document,{contextmenu:li,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this);},_onMouseUp:function(r){if(!(r.which!==1&&r.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(o(this._resetState,this),0);var a=new B(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a});}},_onKeyDown:function(r){r.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState());}});At.addInitHook("addHandler","boxZoom",oc),At.mergeOptions({doubleClickZoom:!0});var sc=bn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this);},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this);},_onDoubleClick:function(r){var a=this._map,c=a.getZoom(),f=a.options.zoomDelta,_=r.originalEvent.shiftKey?c-f:c+f;a.options.doubleClickZoom==="center"?a.setZoom(_):a.setZoomAround(r.containerPoint,_);}});At.addInitHook("addHandler","doubleClickZoom",sc),At.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var ac=bn.extend({addHooks:function(){if(!this._draggable){var r=this._map;this._draggable=new Wn(r._mapPane,r._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),r.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),r.on("zoomend",this._onZoomEnd,this),r.whenReady(this._onZoomEnd,this));}bt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[];},removeHooks:function(){te(this._map._container,"leaflet-grab"),te(this._map._container,"leaflet-touch-drag"),this._draggable.disable();},moved:function(){return this._draggable&&this._draggable._moved;},moving:function(){return this._draggable&&this._draggable._moving;},_onDragStart:function(){var r=this._map;if(r._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=J(this._map.options.maxBounds);this._offsetLimit=z(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity));}else this._offsetLimit=null;r.fire("movestart").fire("dragstart"),r.options.inertia&&(this._positions=[],this._times=[]);},_onDrag:function(r){if(this._map.options.inertia){var a=this._lastTime=+new Date(),c=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(c),this._times.push(a),this._prunePositions(a);}this._map.fire("move",r).fire("drag",r);},_prunePositions:function(r){for(;this._positions.length>1&&r-this._times[0]>50;)this._positions.shift(),this._times.shift();},_onZoomEnd:function(){var r=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(r).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x;},_viscousLimit:function(r,a){return r-(r-a)*this._viscosity;},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var r=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;r.x<a.min.x&&(r.x=this._viscousLimit(r.x,a.min.x)),r.y<a.min.y&&(r.y=this._viscousLimit(r.y,a.min.y)),r.x>a.max.x&&(r.x=this._viscousLimit(r.x,a.max.x)),r.y>a.max.y&&(r.y=this._viscousLimit(r.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(r);}},_onPreDragWrap:function(){var r=this._worldWidth,a=Math.round(r/2),c=this._initialWorldOffset,f=this._draggable._newPos.x,_=(f-a+c)%r+a-c,T=(f+a+c)%r-a-c,I=Math.abs(_+c)<Math.abs(T+c)?_:T;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=I;},_onDragEnd:function(r){var a=this._map,c=a.options,f=!c.inertia||r.noInertia||this._times.length<2;if(a.fire("dragend",r),f)a.fire("moveend");else{this._prunePositions(+new Date());var _=this._lastPos.subtract(this._positions[0]),T=(this._lastTime-this._times[0])/1e3,I=c.easeLinearity,V=_.multiplyBy(I/T),U=V.distanceTo([0,0]),q=Math.min(c.inertiaMaxSpeed,U),ot=V.multiplyBy(q/U),ut=q/(c.inertiaDeceleration*I),Mt=ot.multiplyBy(-ut/2).round();!Mt.x&&!Mt.y?a.fire("moveend"):(Mt=a._limitOffset(Mt,a.options.maxBounds),H(function(){a.panBy(Mt,{duration:ut,easeLinearity:I,noMoveStart:!0,animate:!0});}));}}});At.addInitHook("addHandler","dragging",ac),At.mergeOptions({keyboard:!0,keyboardPanDelta:80});var lc=bn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(r){this._map=r,this._setPanDelta(r.options.keyboardPanDelta),this._setZoomDelta(r.options.zoomDelta);},addHooks:function(){var r=this._map._container;r.tabIndex<=0&&(r.tabIndex="0"),Ct(r,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this);},removeHooks:function(){this._removeHooks(),$t(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this);},_onMouseDown:function(){if(!this._focused){var r=document.body,a=document.documentElement,c=r.scrollTop||a.scrollTop,f=r.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(f,c);}},_onFocus:function(){this._focused=!0,this._map.fire("focus");},_onBlur:function(){this._focused=!1,this._map.fire("blur");},_setPanDelta:function(r){var a=this._panKeys={},c=this.keyCodes,f,_;for(f=0,_=c.left.length;f<_;f++)a[c.left[f]]=[-1*r,0];for(f=0,_=c.right.length;f<_;f++)a[c.right[f]]=[r,0];for(f=0,_=c.down.length;f<_;f++)a[c.down[f]]=[0,r];for(f=0,_=c.up.length;f<_;f++)a[c.up[f]]=[0,-1*r];},_setZoomDelta:function(r){var a=this._zoomKeys={},c=this.keyCodes,f,_;for(f=0,_=c.zoomIn.length;f<_;f++)a[c.zoomIn[f]]=r;for(f=0,_=c.zoomOut.length;f<_;f++)a[c.zoomOut[f]]=-r;},_addHooks:function(){Ct(document,"keydown",this._onKeyDown,this);},_removeHooks:function(){$t(document,"keydown",this._onKeyDown,this);},_onKeyDown:function(r){if(!(r.altKey||r.ctrlKey||r.metaKey)){var a=r.keyCode,c=this._map,f;if(a in this._panKeys){if(!c._panAnim||!c._panAnim._inProgress)if(f=this._panKeys[a],r.shiftKey&&(f=x(f).multiplyBy(3)),c.options.maxBounds&&(f=c._limitOffset(x(f),c.options.maxBounds)),c.options.worldCopyJump){var _=c.wrapLatLng(c.unproject(c.project(c.getCenter()).add(f)));c.panTo(_);}else c.panBy(f);}else if(a in this._zoomKeys)c.setZoom(c.getZoom()+(r.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&c._popup&&c._popup.options.closeOnEscapeKey)c.closePopup();else return;li(r);}}});At.addInitHook("addHandler","keyboard",lc),At.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var cc=bn.extend({addHooks:function(){Ct(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0;},removeHooks:function(){$t(this._map._container,"wheel",this._onWheelScroll,this);},_onWheelScroll:function(r){var a=Ll(r),c=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(r),this._startTime||(this._startTime=+new Date());var f=Math.max(c-(+new Date()-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o(this._performZoom,this),f),li(r);},_performZoom:function(){var r=this._map,a=r.getZoom(),c=this._map.options.zoomSnap||0;r._stop();var f=this._delta/(this._map.options.wheelPxPerZoomLevel*4),_=4*Math.log(2/(1+Math.exp(-Math.abs(f))))/Math.LN2,T=c?Math.ceil(_/c)*c:_,I=r._limitZoom(a+(this._delta>0?T:-T))-a;this._delta=0,this._startTime=null,I&&(r.options.scrollWheelZoom==="center"?r.setZoom(a+I):r.setZoomAround(this._lastMousePos,a+I));}});At.addInitHook("addHandler","scrollWheelZoom",cc);var ou=600;At.mergeOptions({tapHold:pt.touchNative&&pt.safari&&pt.mobile,tapTolerance:15});var hc=bn.extend({addHooks:function(){Ct(this._map._container,"touchstart",this._onDown,this);},removeHooks:function(){$t(this._map._container,"touchstart",this._onDown,this);},_onDown:function(r){if(clearTimeout(this._holdTimeout),r.touches.length===1){var a=r.touches[0];this._startPos=this._newPos=new w(a.clientX,a.clientY),this._holdTimeout=setTimeout(o(function(){this._cancel(),this._isTapValid()&&(Ct(document,"touchend",_e),Ct(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a));},this),ou),Ct(document,"touchend touchcancel contextmenu",this._cancel,this),Ct(document,"touchmove",this._onMove,this);}},_cancelClickPrevent:function r(){$t(document,"touchend",_e),$t(document,"touchend touchcancel",r);},_cancel:function(){clearTimeout(this._holdTimeout),$t(document,"touchend touchcancel contextmenu",this._cancel,this),$t(document,"touchmove",this._onMove,this);},_onMove:function(r){var a=r.touches[0];this._newPos=new w(a.clientX,a.clientY);},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance;},_simulateEvent:function(r,a){var c=new MouseEvent(r,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});c._simulated=!0,a.target.dispatchEvent(c);}});At.addInitHook("addHandler","tapHold",hc),At.mergeOptions({touchZoom:pt.touch,bounceAtZoomLimits:!0});var pc=bn.extend({addHooks:function(){bt(this._map._container,"leaflet-touch-zoom"),Ct(this._map._container,"touchstart",this._onTouchStart,this);},removeHooks:function(){te(this._map._container,"leaflet-touch-zoom"),$t(this._map._container,"touchstart",this._onTouchStart,this);},_onTouchStart:function(r){var a=this._map;if(!(!r.touches||r.touches.length!==2||a._animatingZoom||this._zooming)){var c=a.mouseEventToContainerPoint(r.touches[0]),f=a.mouseEventToContainerPoint(r.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(c.add(f)._divideBy(2))),this._startDist=c.distanceTo(f),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),Ct(document,"touchmove",this._onTouchMove,this),Ct(document,"touchend touchcancel",this._onTouchEnd,this),_e(r);}},_onTouchMove:function(r){if(!(!r.touches||r.touches.length!==2||!this._zooming)){var a=this._map,c=a.mouseEventToContainerPoint(r.touches[0]),f=a.mouseEventToContainerPoint(r.touches[1]),_=c.distanceTo(f)/this._startDist;if(this._zoom=a.getScaleZoom(_,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&_<1||this._zoom>a.getMaxZoom()&&_>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,_===1)return;}else{var T=c._add(f)._divideBy(2)._subtract(this._centerPoint);if(_===1&&T.x===0&&T.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(T),this._zoom);}this._moved||(a._moveStart(!0,!1),this._moved=!0),it(this._animRequest);var I=o(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=H(I,this,!0),_e(r);}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return;}this._zooming=!1,it(this._animRequest),$t(document,"touchmove",this._onTouchMove,this),$t(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom));}});At.addInitHook("addHandler","touchZoom",pc),At.BoxZoom=oc,At.DoubleClickZoom=sc,At.Drag=ac,At.Keyboard=lc,At.ScrollWheelZoom=cc,At.TapHold=hc,At.TouchZoom=pc,t.Bounds=M,t.Browser=pt,t.CRS=Pt,t.Canvas=ec,t.Circle=Xs,t.CircleMarker=no,t.Class=Z,t.Control=fn,t.DivIcon=Kl,t.DivOverlay=En,t.DomEvent=bf,t.DomUtil=Cf,t.Draggable=Wn,t.Evented=W,t.FeatureGroup=Rn,t.GeoJSON=Nn,t.GridLayer=vr,t.Handler=bn,t.Icon=Ni,t.ImageOverlay=ao,t.LatLng=tt,t.LatLngBounds=B,t.Layer=un,t.LayerGroup=Fi,t.LineUtil=Nf,t.Map=At,t.Marker=eo,t.Mixin=kf,t.Path=qn,t.Point=w,t.PolyUtil=Af,t.Polygon=Bi,t.Polyline=Fn,t.Popup=lo,t.PosAnimation=Rl,t.Projection=Bf,t.Rectangle=rc,t.Renderer=Bn,t.SVG=Pr,t.SVGOverlay=Jl,t.TileLayer=zi,t.Tooltip=co,t.Transformation=Re,t.Util=nt,t.VideoOverlay=Xl,t.bind=o,t.bounds=z,t.canvas=nc,t.circle=jf,t.circleMarker=Hf,t.control=mr,t.divIcon=tu,t.extend=n,t.featureGroup=$f,t.geoJSON=Yl,t.geoJson=qf,t.gridLayer=eu,t.icon=Gf,t.imageOverlay=Yf,t.latLng=K,t.latLngBounds=J,t.layerGroup=Vf,t.map=Ef,t.marker=Uf,t.point=x,t.polygon=Wf,t.polyline=Zf,t.popup=Kf,t.rectangle=ru,t.setOptions=g,t.stamp=l,t.svg=ic,t.svgOverlay=Jf,t.tileLayer=Ql,t.tooltip=Qf,t.transformation=ee,t.version=e,t.videoOverlay=Xf;var su=window.L;t.noConflict=function(){return window.L=su,this;},window.L=t;});});var mt=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__;var Tn="9.30.0";var gt=globalThis;function _i(){return vi(gt),gt;}function vi(t){let e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||Tn,e[Tn]=e[Tn]||{};}function yi(t,e,n=gt){let i=n.__SENTRY__=n.__SENTRY__||{},o=i[Tn]=i[Tn]||{};return o[t]||(o[t]=e());}var Zc=Object.prototype.toString;function Pi(t){switch(Zc.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return dn(t,Error);}}function Zi(t,e){return Zc.call(t)===`[object ${e}]`;}function Co(t){return Zi(t,"ErrorEvent");}function xo(t){return Zi(t,"DOMError");}function ra(t){return Zi(t,"DOMException");}function Ee(t){return Zi(t,"String");}function Wi(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t;}function Ci(t){return t===null||Wi(t)||typeof t!="object"&&typeof t!="function";}function zn(t){return Zi(t,"Object");}function xi(t){return typeof Event<"u"&&dn(t,Event);}function oa(t){return typeof Element<"u"&&dn(t,Element);}function sa(t){return Zi(t,"RegExp");}function Vn(t){return!!(t?.then&&typeof t.then=="function");}function aa(t){return zn(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t;}function dn(t,e){try{return t instanceof e;}catch{return!1;}}function br(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue));}function Wc(t){return typeof Request<"u"&&dn(t,Request);}var la=gt,mu=80;function Er(t,e={}){if(!t)return"<unknown>";try{let n=t,i=5,o=[],s=0,l=0,h=" > ",p=h.length,u,m=Array.isArray(e)?e:e.keyAttrs,b=!Array.isArray(e)&&e.maxStringLength||mu;for(;n&&s++<i&&(u=gu(n,m),!(u==="html"||s>1&&l+o.length*p+u.length>=b));)o.push(u),l+=u.length,n=n.parentNode;return o.reverse().join(h);}catch{return"<unknown>";}}function gu(t,e){let n=t,i=[];if(!n?.tagName)return"";if(la.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement;}i.push(n.tagName.toLowerCase());let o=e?.length?e.filter(l=>n.getAttribute(l)).map(l=>[l,n.getAttribute(l)]):null;if(o?.length)o.forEach(l=>{i.push(`[${l[0]}="${l[1]}"]`);});else{n.id&&i.push(`#${n.id}`);let l=n.className;if(l&&Ee(l)){let h=l.split(/\s+/);for(let p of h)i.push(`.${p}`);}}let s=["aria-label","type","name","title","alt"];for(let l of s){let h=n.getAttribute(l);h&&i.push(`[${l}="${h}"]`);}return i.join("");}function bi(){try{return la.document.location.href;}catch{return"";}}function ca(t){if(!la.HTMLElement)return null;let e=t,n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement;}e=e.parentNode;}return null;}var _u="Sentry Logger ",Sr=["debug","info","warn","error","log","assert","trace"],qi={};function We(t){if(!("console"in gt))return t();let e=gt.console,n={},i=Object.keys(qi);i.forEach(o=>{let s=qi[o];n[o]=e[o],e[o]=s;});try{return t();}finally{i.forEach(o=>{e[o]=n[o];});}}function vu(){let t=!1,e={enable:()=>{t=!0;},disable:()=>{t=!1;},isEnabled:()=>t};return mt?Sr.forEach(n=>{e[n]=(...i)=>{t&&We(()=>{gt.console[n](`${_u}[${n}]:`,...i);});};}):Sr.forEach(n=>{e[n]=()=>{};}),e;}var at=yi("logger",vu);function Kn(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`;}function bo(t,e){if(!Array.isArray(t))return"";let n=[];for(let i=0;i<t.length;i++){let o=t[i];try{br(o)?n.push("[VueViewModel]"):n.push(String(o));}catch{n.push("[value cannot be serialized]");}}return n.join(e);}function qc(t,e,n=!1){return Ee(t)?sa(e)?e.test(t):Ee(e)?n?t===e:t.includes(e):!1:!1;}function Yi(t,e=[],n=!1){return e.some(i=>qc(t,i,n));}function le(t,e,n){if(!(e in t))return;let i=t[e];if(typeof i!="function")return;let o=n(i);typeof o=="function"&&Eo(o,i);try{t[e]=o;}catch{mt&&at.log(`Failed to replace method "${e}" in object`,t);}}function qe(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0});}catch{mt&&at.log(`Failed to add non-enumerable property "${e}" to object`,t);}}function Eo(t,e){try{let n=e.prototype||{};t.prototype=e.prototype=n,qe(t,"__sentry_original__",e);}catch{}}function Ei(t){return t.__sentry_original__;}function So(t){if(Pi(t))return $({message:t.message,name:t.name,stack:t.stack},Xc(t));if(xi(t)){let e=$({type:t.type,target:Yc(t.target),currentTarget:Yc(t.currentTarget)},Xc(t));return typeof CustomEvent<"u"&&dn(t,CustomEvent)&&(e.detail=t.detail),e;}else return t;}function Yc(t){try{return oa(t)?Er(t):Object.prototype.toString.call(t);}catch{return"<unknown>";}}function Xc(t){if(typeof t=="object"&&t!==null){let e={};for(let n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e;}else return{};}function ha(t,e=40){let n=Object.keys(So(t));n.sort();let i=n[0];if(!i)return"[object has no keys]";if(i.length>=e)return Kn(i,e);for(let o=n.length;o>0;o--){let s=n.slice(0,o).join(", ");if(!(s.length>e))return o===n.length?s:Kn(s,e);}return"";}function yu(){let t=gt;return t.crypto||t.msCrypto;}function ce(t=yu()){let e=()=>Math.random()*16;try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"");t?.getRandomValues&&(e=()=>{let n=new Uint8Array(1);return t.getRandomValues(n),n[0];});}catch{}return("10000000100040008000"+1e11).replace(/[018]/g,n=>(n^(e()&15)>>n/4).toString(16));}function Jc(t){return t.exception?.values?.[0];}function wn(t){let{message:e,event_id:n}=t;if(e)return e;let i=Jc(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>";}function Xi(t,e,n){let i=t.exception=t.exception||{},o=i.values=i.values||[],s=o[0]=o[0]||{};s.value||(s.value=e||""),s.type||(s.type=n||"Error");}function On(t,e){let n=Jc(t);if(!n)return;let i={type:"generic",handled:!0},o=n.mechanism;if(n.mechanism=$($($({},i),o),e),e&&"data"in e){let s=$($({},o?.data),e.data);n.mechanism.data=s;}}function Mo(t){if(Pu(t))return!0;try{qe(t,"__sentry_captured__",!0);}catch{}return!1;}function Pu(t){try{return t.__sentry_captured__;}catch{}}var Kc=1e3;function kn(){return Date.now()/Kc;}function Cu(){let{performance:t}=gt;if(!t?.now)return kn;let e=Date.now()-t.now(),n=t.timeOrigin==null?e:t.timeOrigin;return()=>(n+t.now())/Kc;}var ke=Cu();function Qc(t){let e=ke(),n={sid:ce(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>xu(n)};return t&&$n(n,t),n;}function $n(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||ke(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:ce()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{let n=t.timestamp-t.started;t.duration=n>=0?n:0;}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status);}function th(t,e){let n={};e?n={status:e}:t.status==="ok"&&(n={status:"exited"}),$n(t,n);}function xu(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}};}function Qn(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;let i=$({},t);for(let o in e)Object.prototype.hasOwnProperty.call(e,o)&&(i[o]=Qn(i[o],e[o],n-1));return i;}var pa="_sentrySpan";function fa(t,e){e?qe(t,pa,e):delete t[pa];}function ua(t){return t[pa];}function da(){return ce();}function To(){return ce().substring(16);}var bu=100,ze=class t{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:da(),sampleRand:Math.random()};}clone(){let e=new t();return e._breadcrumbs=[...this._breadcrumbs],e._tags=$({},this._tags),e._extra=$({},this._extra),e._contexts=$({},this._contexts),this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata=$({},this._sdkProcessingMetadata),e._propagationContext=$({},this._propagationContext),e._client=this._client,e._lastEventId=this._lastEventId,fa(e,ua(this)),e;}setClient(e){this._client=e;}setLastEventId(e){this._lastEventId=e;}getClient(){return this._client;}lastEventId(){return this._lastEventId;}addScopeListener(e){this._scopeListeners.push(e);}addEventProcessor(e){return this._eventProcessors.push(e),this;}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&$n(this._session,{user:e}),this._notifyScopeListeners(),this;}getUser(){return this._user;}setTags(e){return this._tags=$($({},this._tags),e),this._notifyScopeListeners(),this;}setTag(e,n){return this._tags=vt($({},this._tags),{[e]:n}),this._notifyScopeListeners(),this;}setExtras(e){return this._extra=$($({},this._extra),e),this._notifyScopeListeners(),this;}setExtra(e,n){return this._extra=vt($({},this._extra),{[e]:n}),this._notifyScopeListeners(),this;}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this;}setLevel(e){return this._level=e,this._notifyScopeListeners(),this;}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this;}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this;}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this;}getSession(){return this._session;}update(e){if(!e)return this;let n=typeof e=="function"?e(this):e,i=n instanceof t?n.getScopeData():zn(n)?e:void 0,{tags:o,extra:s,user:l,contexts:h,level:p,fingerprint:u=[],propagationContext:m}=i||{};return this._tags=$($({},this._tags),o),this._extra=$($({},this._extra),s),this._contexts=$($({},this._contexts),h),l&&Object.keys(l).length&&(this._user=l),p&&(this._level=p),u.length&&(this._fingerprint=u),m&&(this._propagationContext=m),this;}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,fa(this,void 0),this._attachments=[],this.setPropagationContext({traceId:da(),sampleRand:Math.random()}),this._notifyScopeListeners(),this;}addBreadcrumb(e,n){let i=typeof n=="number"?n:bu;if(i<=0)return this;let o=vt($({timestamp:kn()},e),{message:e.message?Kn(e.message,2048):e.message});return this._breadcrumbs.push(o),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this;}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1];}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this;}addAttachment(e){return this._attachments.push(e),this;}clearAttachments(){return this._attachments=[],this;}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ua(this)};}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Qn(this._sdkProcessingMetadata,e,2),this;}setPropagationContext(e){return this._propagationContext=e,this;}getPropagationContext(){return this._propagationContext;}captureException(e,n){let i=n?.event_id||ce();if(!this._client)return at.warn("No client configured on scope - will not capture exception!"),i;let o=new Error("Sentry syntheticException");return this._client.captureException(e,vt($({originalException:e,syntheticException:o},n),{event_id:i}),this),i;}captureMessage(e,n,i){let o=i?.event_id||ce();if(!this._client)return at.warn("No client configured on scope - will not capture message!"),o;let s=new Error(e);return this._client.captureMessage(e,n,vt($({originalException:e,syntheticException:s},i),{event_id:o}),this),o;}captureEvent(e,n){let i=n?.event_id||ce();return this._client?(this._client.captureEvent(e,vt($({},n),{event_id:i}),this),i):(at.warn("No client configured on scope - will not capture event!"),i);}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this);}),this._notifyingListeners=!1);}};function eh(){return yi("defaultCurrentScope",()=>new ze());}function nh(){return yi("defaultIsolationScope",()=>new ze());}var ma=class{constructor(e,n){let i;e?i=e:i=new ze();let o;n?o=n:o=new ze(),this._stack=[{scope:i}],this._isolationScope=o;}withScope(e){let n=this._pushScope(),i;try{i=e(n);}catch(o){throw this._popScope(),o;}return Vn(i)?i.then(o=>(this._popScope(),o),o=>{throw this._popScope(),o;}):(this._popScope(),i);}getClient(){return this.getStackTop().client;}getScope(){return this.getStackTop().scope;}getIsolationScope(){return this._isolationScope;}getStackTop(){return this._stack[this._stack.length-1];}_pushScope(){let e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e;}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop();}};function Ji(){let t=_i(),e=vi(t);return e.stack=e.stack||new ma(eh(),nh());}function Eu(t){return Ji().withScope(t);}function Su(t,e){let n=Ji();return n.withScope(()=>(n.getStackTop().scope=t,e(t)));}function ih(t){return Ji().withScope(()=>t(Ji().getIsolationScope()));}function rh(){return{withIsolationScope:ih,withScope:Eu,withSetScope:Su,withSetIsolationScope:(t,e)=>ih(e),getCurrentScope:()=>Ji().getScope(),getIsolationScope:()=>Ji().getIsolationScope()};}function wo(t){let e=vi(t);return e.acs?e.acs:rh();}function Ae(){let t=_i();return wo(t).getCurrentScope();}function mn(){let t=_i();return wo(t).getIsolationScope();}function Oo(){return yi("globalScope",()=>new ze());}function Mr(...t){let e=_i(),n=wo(e);if(t.length===2){let[i,o]=t;return i?n.withSetScope(i,o):n.withScope(o);}return n.withScope(t[0]);}function Ut(){return Ae().getClient();}function ga(t){let e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:o}=e,s={trace_id:n,span_id:o||To()};return i&&(s.parent_span_id=i),s;}var Tr="sentry.source",_a="sentry.sample_rate",oh="sentry.previous_trace_sample_rate",va="sentry.op",ko="sentry.origin";var ya="sentry.profile_id",Pa="sentry.exclusive_time";var Mu="_sentryScope",Tu="_sentryIsolationScope";function Ao(t){return{scope:t[Mu],isolationScope:t[Tu]};}function sh(t){if(typeof t=="boolean")return Number(t);let e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e;}var wu="sentry-",Ou=/^sentry-/;function lh(t){let e=ku(t);if(!e)return;let n=Object.entries(e).reduce((i,[o,s])=>{if(o.match(Ou)){let l=o.slice(wu.length);i[l]=s;}return i;},{});if(Object.keys(n).length>0)return n;}function ku(t){if(!(!t||!Ee(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{let i=ah(n);return Object.entries(i).forEach(([o,s])=>{e[o]=s;}),e;},{}):ah(t);}function ah(t){return t.split(",").map(e=>e.split("=").map(n=>{try{return decodeURIComponent(n.trim());}catch{return;}})).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{});}var fh=1,ch=!1;function Ca(t){let{spanId:e,traceId:n,isRemote:i}=t.spanContext(),o=i?e:Si(t).parent_span_id,s=Ao(t).scope,l=i?s?.getPropagationContext().propagationSpanId||To():e;return{parent_span_id:o,span_id:l,trace_id:n};}function Au(t){if(t&&t.length>0)return t.map(l=>{var h=l,{context:p}=h,u=p,{spanId:e,traceId:n,traceFlags:i}=u,o=mc(u,["spanId","traceId","traceFlags"]),{attributes:s}=h;return $({span_id:e,trace_id:n,sampled:i===fh,attributes:s},o);});}function hh(t){return typeof t=="number"?ph(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?ph(t.getTime()):ke();}function ph(t){return t>9999999999?t/1e3:t;}function Si(t){if(Lu(t))return t.getSpanJSON();let{spanId:e,traceId:n}=t.spanContext();if(Iu(t)){let{attributes:i,startTime:o,name:s,endTime:l,status:h,links:p}=t,u="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:s,parent_span_id:u,start_timestamp:hh(o),timestamp:hh(l)||void 0,status:Ru(h),op:i[va],origin:i[ko],links:Au(p)};}return{span_id:e,trace_id:n,start_timestamp:0,data:{}};}function Iu(t){let e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status;}function Lu(t){return typeof t.getSpanJSON=="function";}function uh(t){let{traceFlags:e}=t.spanContext();return e===fh;}function Ru(t){if(!(!t||t.code===0))return t.code===1?"ok":t.message||"unknown_error";}var Fu="_sentryRootSpan";function Ki(t){return t[Fu]||t;}function xa(){ch||(We(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly.");}),ch=!0);}var An="?",dh=/\(error: (.*)\)/,mh=/captureMessage|captureException/;function Lo(...t){let e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,o=0)=>{let s=[],l=n.split(`
`);for(let h=i;h<l.length;h++){let p=l[h];if(p.length>1024)continue;let u=dh.test(p)?p.replace(dh,"$1"):p;if(!u.match(/\S*Error: /)){for(let m of e){let b=m(u);if(b){s.push(b);break;}}if(s.length>=50+o)break;}}return gh(s.slice(o));};}function Ea(t){return Array.isArray(t)?Lo(...t):t;}function gh(t){if(!t.length)return[];let e=Array.from(t);return /sentryWrapped/.test(Io(e).function||"")&&e.pop(),e.reverse(),mh.test(Io(e).function||"")&&(e.pop(),mh.test(Io(e).function||"")&&e.pop()),e.slice(0,50).map(n=>vt($({},n),{filename:n.filename||Io(e).filename,function:n.function||An}));}function Io(t){return t[t.length-1]||{};}var ba="<anonymous>";function sn(t){try{return!t||typeof t!="function"?ba:t.name||ba;}catch{return ba;}}function Ro(t){let e=t.exception;if(e){let n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames);}),n;}catch{return;}}}var Fo={},_h={};function Ie(t,e){Fo[t]=Fo[t]||[],Fo[t].push(e);}function Le(t,e){if(!_h[t]){_h[t]=!0;try{e();}catch(n){mt&&at.error(`Error while instrumenting ${t}`,n);}}}function he(t,e){let n=t&&Fo[t];if(n)for(let i of n)try{i(e);}catch(o){mt&&at.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${sn(i)}
Error:`,o);}}var Sa=null;function Ma(t){let e="error";Ie(e,t),Le(e,Nu);}function Nu(){Sa=gt.onerror,gt.onerror=function(t,e,n,i,o){return he("error",{column:i,error:o,line:n,msg:t,url:e}),Sa?Sa.apply(this,arguments):!1;},gt.onerror.__SENTRY_INSTRUMENTED__=!0;}var Ta=null;function wa(t){let e="unhandledrejection";Ie(e,t),Le(e,Bu);}function Bu(){Ta=gt.onunhandledrejection,gt.onunhandledrejection=function(t){return he("unhandledrejection",t),Ta?Ta.apply(this,arguments):!0;},gt.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0;}function vh(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;let e=t||Ut()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler);}var Qi="production";var Du=/^o(\d+)\./,zu=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function Vu(t){return t==="http"||t==="https";}function ti(t,e=!1){let{host:n,path:i,pass:o,port:s,projectId:l,protocol:h,publicKey:p}=t;return`${h}://${p}${e&&o?`:${o}`:""}@${n}${s?`:${s}`:""}/${i&&`${i}/`}${l}`;}function $u(t){let e=zu.exec(t);if(!e){We(()=>{console.error(`Invalid Sentry Dsn: ${t}`);});return;}let[n,i,o="",s="",l="",h=""]=e.slice(1),p="",u=h,m=u.split("/");if(m.length>1&&(p=m.slice(0,-1).join("/"),u=m.pop()),u){let b=u.match(/^\d+/);b&&(u=b[0]);}return yh({host:s,pass:o,path:p,projectId:u,port:l,protocol:n,publicKey:i});}function yh(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId};}function Gu(t){if(!mt)return!0;let{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(l=>t[l]?!1:(at.error(`Invalid Sentry Dsn: ${l} missing`),!0))?!1:n.match(/^\d+$/)?Vu(i)?e&&isNaN(parseInt(e,10))?(at.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(at.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(at.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1);}function Ph(t){return t.match(Du)?.[1];}function Ch(t){let e=typeof t=="string"?$u(t):yh(t);if(!(!e||!Gu(e)))return e;}var Uu="_frozenDsc";function xh(t,e){let n=e.getOptions(),{publicKey:i,host:o}=e.getDsn()||{},s;n.orgId?s=String(n.orgId):o&&(s=Ph(o));let l={environment:n.environment||Qi,release:n.release,public_key:i,trace_id:t,org_id:s};return e.emit("createDsc",l),l;}function bh(t,e){let n=e.getPropagationContext();return n.dsc||xh(n.traceId,t);}function Oa(t){let e=Ut();if(!e)return{};let n=Ki(t),i=Si(n),o=i.data,s=n.spanContext().traceState,l=s?.get("sentry.sample_rate")??o[_a]??o[oh];function h(E){return(typeof l=="number"||typeof l=="string")&&(E.sample_rate=`${l}`),E;}let p=n[Uu];if(p)return h(p);let u=s?.get("sentry.dsc"),m=u&&lh(u);if(m)return h(m);let b=xh(t.spanContext().traceId,e),d=o[Tr],g=i.description;return d!=="url"&&g&&(b.transaction=g),vh()&&(b.sampled=String(uh(n)),b.sample_rand=s?.get("sentry.sample_rand")??Ao(n).scope?.getPropagationContext().sampleRand.toString()),h(b),e.emit("createDsc",b,n),b;}function an(t,e=100,n=1/0){try{return ka("",t,e,n);}catch(i){return{ERROR:`**non-serializable** (${i})`};}}function No(t,e=3,n=100*1024){let i=an(t,e);return Wu(i)>n?No(t,e-1,n):i;}function ka(t,e,n=1/0,i=1/0,o=qu()){let[s,l]=o;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;let h=Hu(t,e);if(!h.startsWith("[object "))return h;if(e.__sentry_skip_normalization__)return e;let p=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(p===0)return h.replace("object ","");if(s(e))return"[Circular ~]";let u=e;if(u&&typeof u.toJSON=="function")try{let g=u.toJSON();return ka("",g,p-1,i,o);}catch{}let m=Array.isArray(e)?[]:{},b=0,d=So(e);for(let g in d){if(!Object.prototype.hasOwnProperty.call(d,g))continue;if(b>=i){m[g]="[MaxProperties ~]";break;}let E=d[g];m[g]=ka(g,E,p-1,i,o),b++;}return l(e),m;}function Hu(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(br(e))return"[VueViewModel]";if(aa(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${sn(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;let n=ju(e);return /^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`;}catch(n){return`**non-serializable** (${n})`;}}function ju(t){let e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype";}function Zu(t){return~-encodeURI(t).split(/%..|./).length;}function Wu(t){return Zu(JSON.stringify(t));}function qu(){let t=new WeakSet();function e(i){return t.has(i)?!0:(t.add(i),!1);}function n(i){t.delete(i);}return[e,n];}function Gn(t,e=[]){return[t,e];}function Eh(t,e){let[n,i]=t;return[n,[...i,e]];}function Ia(t,e){let n=t[1];for(let i of n){let o=i[0].type;if(e(i,o))return!0;}return!1;}function Aa(t){let e=vi(gt);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t);}function Sh(t){let[e,n]=t,i=JSON.stringify(e);function o(s){typeof i=="string"?i=typeof s=="string"?i+s:[Aa(i),s]:i.push(typeof s=="string"?Aa(s):s);}for(let s of n){let[l,h]=s;if(o(`
${JSON.stringify(l)}
`),typeof h=="string"||h instanceof Uint8Array)o(h);else{let p;try{p=JSON.stringify(h);}catch{p=JSON.stringify(an(h));}o(p);}}return typeof i=="string"?i:Yu(i);}function Yu(t){let e=t.reduce((o,s)=>o+s.length,0),n=new Uint8Array(e),i=0;for(let o of t)n.set(o,i),i+=o.length;return n;}function Mh(t){let e=typeof t.data=="string"?Aa(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e];}var Xu={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item"};function La(t){return Xu[t];}function Ra(t){if(!t?.sdk)return;let{name:e,version:n}=t.sdk;return{name:e,version:n};}function Th(t,e,n,i){let o=t.sdkProcessingMetadata?.dynamicSamplingContext;return $($($({event_id:t.event_id,sent_at:new Date().toISOString()},e&&{sdk:e}),!!n&&i&&{dsn:ti(i)}),o&&{trace:o});}function Ju(t,e){return e&&(t.sdk=t.sdk||{},t.sdk.name=t.sdk.name||e.name,t.sdk.version=t.sdk.version||e.version,t.sdk.integrations=[...(t.sdk.integrations||[]),...(e.integrations||[])],t.sdk.packages=[...(t.sdk.packages||[]),...(e.packages||[])]),t;}function wh(t,e,n,i){let o=Ra(n),s=$($({sent_at:new Date().toISOString()},o&&{sdk:o}),!!i&&e&&{dsn:ti(e)}),l="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Gn(s,[l]);}function Oh(t,e,n,i){let o=Ra(n),s=t.type&&t.type!=="replay_event"?t.type:"event";Ju(t,n?.sdk);let l=Th(t,o,i,e);return delete t.sdkProcessingMetadata,Gn(l,[[{type:s},t]]);}var Un;(function(t){t[t.PENDING=0]="PENDING";let n=1;t[t.RESOLVED=n]="RESOLVED";let i=2;t[t.REJECTED=i]="REJECTED";})(Un||(Un={}));function ln(t){return new gn(e=>{e(t);});}function ei(t){return new gn((e,n)=>{n(t);});}var gn=class t{constructor(e){this._state=Un.PENDING,this._handlers=[],this._runExecutor(e);}then(e,n){return new t((i,o)=>{this._handlers.push([!1,s=>{if(!e)i(s);else try{i(e(s));}catch(l){o(l);}},s=>{if(!n)o(s);else try{i(n(s));}catch(l){o(l);}}]),this._executeHandlers();});}catch(e){return this.then(n=>n,e);}finally(e){return new t((n,i)=>{let o,s;return this.then(l=>{s=!1,o=l,e&&e();},l=>{s=!0,o=l,e&&e();}).then(()=>{if(s){i(o);return;}n(o);});});}_executeHandlers(){if(this._state===Un.PENDING)return;let e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Un.RESOLVED&&n[1](this._value),this._state===Un.REJECTED&&n[2](this._value),n[0]=!0);});}_runExecutor(e){let n=(s,l)=>{if(this._state===Un.PENDING){if(Vn(l)){l.then(i,o);return;}this._state=s,this._value=l,this._executeHandlers();}},i=s=>{n(Un.RESOLVED,s);},o=s=>{n(Un.REJECTED,s);};try{e(i,o);}catch(s){o(s);}}};function Bo(t,e,n,i=0){return new gn((o,s)=>{let l=t[i];if(e===null||typeof l!="function")o(e);else{let h=l($({},e),n);mt&&l.id&&h===null&&at.log(`Event processor "${l.id}" dropped event`),Vn(h)?h.then(p=>Bo(t,p,n,i+1).then(o)).then(null,s):Bo(t,h,n,i+1).then(o).then(null,s);}});}var Do,kh,zo;function Ah(t){let e=gt._sentryDebugIds;if(!e)return{};let n=Object.keys(e);return zo&&n.length===kh||(kh=n.length,zo=n.reduce((i,o)=>{Do||(Do={});let s=Do[o];if(s)i[s[0]]=s[1];else{let l=t(o);for(let h=l.length-1;h>=0;h--){let u=l[h]?.filename,m=e[o];if(u&&m){i[u]=m,Do[o]=[u,m];break;}}}return i;},{})),zo;}function Ih(t,e){let{fingerprint:n,span:i,breadcrumbs:o,sdkProcessingMetadata:s}=e;Ku(t,e),i&&ed(t,i),nd(t,n),Qu(t,o),td(t,s);}function Fa(t,e){let{extra:n,tags:i,user:o,contexts:s,level:l,sdkProcessingMetadata:h,breadcrumbs:p,fingerprint:u,eventProcessors:m,attachments:b,propagationContext:d,transactionName:g,span:E}=e;Vo(t,"extra",n),Vo(t,"tags",i),Vo(t,"user",o),Vo(t,"contexts",s),t.sdkProcessingMetadata=Qn(t.sdkProcessingMetadata,h,2),l&&(t.level=l),g&&(t.transactionName=g),E&&(t.span=E),p.length&&(t.breadcrumbs=[...t.breadcrumbs,...p]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),m.length&&(t.eventProcessors=[...t.eventProcessors,...m]),b.length&&(t.attachments=[...t.attachments,...b]),t.propagationContext=$($({},t.propagationContext),d);}function Vo(t,e,n){t[e]=Qn(t[e],n,1);}function Ku(t,e){let{extra:n,tags:i,user:o,contexts:s,level:l,transactionName:h}=e;Object.keys(n).length&&(t.extra=$($({},n),t.extra)),Object.keys(i).length&&(t.tags=$($({},i),t.tags)),Object.keys(o).length&&(t.user=$($({},o),t.user)),Object.keys(s).length&&(t.contexts=$($({},s),t.contexts)),l&&(t.level=l),h&&t.type!=="transaction"&&(t.transaction=h);}function Qu(t,e){let n=[...(t.breadcrumbs||[]),...e];t.breadcrumbs=n.length?n:void 0;}function td(t,e){t.sdkProcessingMetadata=$($({},t.sdkProcessingMetadata),e);}function ed(t,e){t.contexts=$({trace:Ca(e)},t.contexts),t.sdkProcessingMetadata=$({dynamicSamplingContext:Oa(e)},t.sdkProcessingMetadata);let n=Ki(e),i=Si(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i);}function nd(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint;}function Lh(t,e,n,i,o,s){let{normalizeDepth:l=3,normalizeMaxBreadth:h=1e3}=t,p=vt($({},e),{event_id:e.event_id||n.event_id||ce(),timestamp:e.timestamp||kn()}),u=n.integrations||t.integrations.map(k=>k.name);id(p,t),sd(p,u),o&&o.emit("applyFrameMetadata",e),e.type===void 0&&rd(p,t.stackParser);let m=ld(i,n.captureContext);n.mechanism&&On(p,n.mechanism);let b=o?o.getEventProcessors():[],d=Oo().getScopeData();if(s){let k=s.getScopeData();Fa(d,k);}if(m){let k=m.getScopeData();Fa(d,k);}let g=[...(n.attachments||[]),...d.attachments];g.length&&(n.attachments=g),Ih(p,d);let E=[...b,...d.eventProcessors];return Bo(E,p,n).then(k=>(k&&od(k),typeof l=="number"&&l>0?ad(k,l,h):k));}function id(t,e){let{environment:n,release:i,dist:o,maxValueLength:s=250}=e;t.environment=t.environment||n||Qi,!t.release&&i&&(t.release=i),!t.dist&&o&&(t.dist=o);let l=t.request;l?.url&&(l.url=Kn(l.url,s));}function rd(t,e){let n=Ah(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(o=>{o.filename&&(o.debug_id=n[o.filename]);});});}function od(t){let e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(o=>{o.debug_id&&(o.abs_path?e[o.abs_path]=o.debug_id:o.filename&&(e[o.filename]=o.debug_id),delete o.debug_id);});}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];let n=t.debug_meta.images;Object.entries(e).forEach(([i,o])=>{n.push({type:"sourcemap",code_file:i,debug_id:o});});}function sd(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...(t.sdk.integrations||[]),...e]);}function ad(t,e,n){if(!t)return null;let i=$($($($($({},t),t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(o=>$($({},o),o.data&&{data:an(o.data,e,n)}))}),t.user&&{user:an(t.user,e,n)}),t.contexts&&{contexts:an(t.contexts,e,n)}),t.extra&&{extra:an(t.extra,e,n)});return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=an(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(o=>$($({},o),o.data&&{data:an(o.data,e,n)}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=an(t.contexts.flags,3,n)),i;}function ld(t,e){if(!e)return t;let n=t?t.clone():new ze();return n.update(e),n;}function Rh(t){if(t)return cd(t)?{captureContext:t}:pd(t)?{captureContext:t}:t;}function cd(t){return t instanceof ze||typeof t=="function";}var hd=["user","level","extra","contexts","tags","fingerprint","propagationContext"];function pd(t){return Object.keys(t).some(e=>hd.includes(e));}function $o(t,e){return Ae().captureException(t,Rh(e));}function Go(t,e){let n=typeof e=="string"?e:void 0,i=typeof e!="string"?{captureContext:e}:void 0;return Ae().captureMessage(t,n,i);}function wr(t,e){return Ae().captureEvent(t,e);}function Uo(t,e){mn().setContext(t,e);}function Or(t){let e=mn(),n=Ae(),{userAgent:i}=gt.navigator||{},o=Qc($($({user:n.getUser()||e.getUser()},i&&{userAgent:i}),t)),s=e.getSession();return s?.status==="ok"&&$n(s,{status:"exited"}),Ho(),e.setSession(o),o;}function Ho(){let t=mn(),n=Ae().getSession()||t.getSession();n&&th(n),Nh(),t.setSession();}function Nh(){let t=mn(),e=Ut(),n=t.getSession();n&&e&&e.captureSession(n);}function kr(t=!1){if(t){Ho();return;}Nh();}var fd="7";function ud(t){let e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`;}function dd(t){return`${ud(t)}${t.projectId}/envelope/`;}function md(t,e){let n={sentry_version:fd};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString();}function Bh(t,e,n){return e||`${dd(t)}?${md(t,n)}`;}var Dh=[];function gd(t){let e={};return t.forEach(n=>{let{name:i}=n,o=e[i];o&&!o.isDefaultInstance&&n.isDefaultInstance||(e[i]=n);}),Object.values(e);}function Na(t){let e=t.defaultIntegrations||[],n=t.integrations;e.forEach(o=>{o.isDefaultInstance=!0;});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){let o=n(e);i=Array.isArray(o)?o:[o];}else i=e;return gd(i);}function zh(t,e){let n={};return e.forEach(i=>{i&&Da(t,i,n);}),n;}function Ba(t,e){for(let n of e)n?.afterAllSetup&&n.afterAllSetup(t);}function Da(t,e,n){if(n[e.name]){mt&&at.log(`Integration skipped because it was already installed: ${e.name}`);return;}if(n[e.name]=e,Dh.indexOf(e.name)===-1&&typeof e.setupOnce=="function"&&(e.setupOnce(),Dh.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){let i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(o,s)=>i(o,s,t));}if(typeof e.processEvent=="function"){let i=e.processEvent.bind(e),o=Object.assign((s,l)=>i(s,l,t),{id:e.name});t.addEventProcessor(o);}mt&&at.log(`Integration installed: ${e.name}`);}function jo(t){let e=[];t.message&&e.push(t.message);try{let n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`));}catch{}return e;}function Vh(t){let{trace_id:e,parent_span_id:n,span_id:i,status:o,origin:s,data:l,op:h}=t.contexts?.trace??{};return{data:l??{},description:t.transaction,op:h,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:o,timestamp:t.timestamp,trace_id:e??"",origin:s,profile_id:l?.[ya],exclusive_time:l?.[Pa],measurements:t.measurements,is_segment:!0};}function $h(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:$($($({},t.data),t.profile_id&&{[ya]:t.profile_id}),t.exclusive_time&&{[Pa]:t.exclusive_time})}},measurements:t.measurements};}function Gh(t,e,n){let i=[{type:"client_report"},{timestamp:n||kn(),discarded_events:t}];return Gn(e?{dsn:e}:{},[i]);}var Uh="Not capturing exception because it's already been captured.",Hh="Discarded session because of missing or non-string release",qh=Symbol.for("SentryInternalError"),Yh=Symbol.for("SentryDoNotSendEventError");function Zo(t){return{message:t,[qh]:!0};}function za(t){return{message:t,[Yh]:!0};}function jh(t){return!!t&&typeof t=="object"&&qh in t;}function Zh(t){return!!t&&typeof t=="object"&&Yh in t;}var Ar=class{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=Ch(e.dsn):mt&&at.warn("No DSN provided, client will not send events."),this._dsn){let n=Bh(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport(vt($({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this)},e.transportOptions),{url:n}));}}captureException(e,n,i){let o=ce();if(Mo(e))return mt&&at.log(Uh),o;let s=$({event_id:o},n);return this._process(this.eventFromException(e,s).then(l=>this._captureEvent(l,s,i))),s.event_id;}captureMessage(e,n,i,o){let s=$({event_id:ce()},i),l=Wi(e)?e:String(e),h=Ci(e)?this.eventFromMessage(l,n,s):this.eventFromException(e,s);return this._process(h.then(p=>this._captureEvent(p,s,o))),s.event_id;}captureEvent(e,n,i){let o=ce();if(n?.originalException&&Mo(n.originalException))return mt&&at.log(Uh),o;let s=$({event_id:o},n),l=e.sdkProcessingMetadata||{},h=l.capturedSpanScope,p=l.capturedSpanIsolationScope;return this._process(this._captureEvent(e,s,h||i,p)),s.event_id;}captureSession(e){this.sendSession(e),$n(e,{init:!1});}getDsn(){return this._dsn;}getOptions(){return this._options;}getSdkMetadata(){return this._options._metadata;}getTransport(){return this._transport;}flush(e){let n=this._transport;return n?(this.emit("flush"),this._isClientDoneProcessing(e).then(i=>n.flush(e).then(o=>i&&o))):ln(!0);}close(e){return this.flush(e).then(n=>(this.getOptions().enabled=!1,this.emit("close"),n));}getEventProcessors(){return this._eventProcessors;}addEventProcessor(e){this._eventProcessors.push(e);}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations();}getIntegrationByName(e){return this._integrations[e];}addIntegration(e){let n=this._integrations[e.name];Da(this,e,this._integrations),n||Ba(this,[e]);}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=Oh(e,this._dsn,this._options._metadata,this._options.tunnel);for(let s of n.attachments||[])i=Eh(i,Mh(s));let o=this.sendEnvelope(i);o&&o.then(s=>this.emit("afterSendEvent",e,s),null);}sendSession(e){let{release:n,environment:i=Qi}=this._options;if("aggregates"in e){let s=e.attrs||{};if(!s.release&&!n){mt&&at.warn(Hh);return;}s.release=s.release||n,s.environment=s.environment||i,e.attrs=s;}else{if(!e.release&&!n){mt&&at.warn(Hh);return;}e.release=e.release||n,e.environment=e.environment||i;}this.emit("beforeSendSession",e);let o=wh(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(o);}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){let o=`${e}:${n}`;mt&&at.log(`Recording outcome: "${o}"${i>1?` (${i} times)`:""}`),this._outcomes[o]=(this._outcomes[o]||0)+i;}}on(e,n){let i=this._hooks[e]=this._hooks[e]||[];return i.push(n),()=>{let o=i.indexOf(n);o>-1&&i.splice(o,1);};}emit(e,...n){let i=this._hooks[e];i&&i.forEach(o=>o(...n));}sendEnvelope(e){return this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport?this._transport.send(e).then(null,n=>(mt&&at.error("Error while sending envelope:",n),n)):(mt&&at.error("Transport disabled"),ln({}));}_setupIntegrations(){let{integrations:e}=this._options;this._integrations=zh(this,e),Ba(this,e);}_updateSessionFromEvent(e,n){let i=n.level==="fatal",o=!1,s=n.exception?.values;if(s){o=!0;for(let p of s)if(p.mechanism?.handled===!1){i=!0;break;}}let l=e.status==="ok";(l&&e.errors===0||l&&i)&&($n(e,vt($({},i&&{status:"crashed"}),{errors:e.errors||Number(o||i)})),this.captureSession(e));}_isClientDoneProcessing(e){return new gn(n=>{let i=0,o=1,s=setInterval(()=>{this._numProcessing==0?(clearInterval(s),n(!0)):(i+=o,e&&i>=e&&(clearInterval(s),n(!1)));},o);});}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0;}_prepareEvent(e,n,i,o){let s=this.getOptions(),l=Object.keys(this._integrations);return!n.integrations&&l?.length&&(n.integrations=l),this.emit("preprocessEvent",e,n),e.type||o.setLastEventId(e.event_id||n.event_id),Lh(s,e,n,i,this,o).then(h=>{if(h===null)return h;this.emit("postprocessEvent",h,n),h.contexts=$({trace:ga(i)},h.contexts);let p=bh(this,i);return h.sdkProcessingMetadata=$({dynamicSamplingContext:p},h.sdkProcessingMetadata),h;});}_captureEvent(e,n={},i=Ae(),o=mn()){return mt&&Va(e)&&at.log(`Captured error event \`${jo(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,o).then(s=>s.event_id,s=>{mt&&(Zh(s)?at.log(s.message):jh(s)?at.warn(s.message):at.warn(s));});}_processEvent(e,n,i,o){let s=this.getOptions(),{sampleRate:l}=s,h=Xh(e),p=Va(e),u=e.type||"error",m=`before send for type \`${u}\``,b=typeof l>"u"?void 0:sh(l);if(p&&typeof b=="number"&&Math.random()>b)return this.recordDroppedEvent("sample_rate","error"),ei(za(`Discarding event because it's not included in the random sample (sampling rate = ${l})`));let d=u==="replay_event"?"replay":u;return this._prepareEvent(e,n,i,o).then(g=>{if(g===null)throw this.recordDroppedEvent("event_processor",d),za("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return g;let P=vd(this,s,g,n);return _d(P,m);}).then(g=>{if(g===null){if(this.recordDroppedEvent("before_send",d),h){let v=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",v);}throw za(`${m} returned \`null\`, will not send event.`);}let E=i.getSession()||o.getSession();if(p&&E&&this._updateSessionFromEvent(E,g),h){let k=g.sdkProcessingMetadata?.spanCountBeforeProcessing||0,v=g.spans?g.spans.length:0,C=k-v;C>0&&this.recordDroppedEvent("before_send","span",C);}let P=g.transaction_info;if(h&&P&&g.transaction!==e.transaction){let k="custom";g.transaction_info=vt($({},P),{source:k});}return this.sendEvent(g,n),g;}).then(null,g=>{throw Zh(g)||jh(g)?g:(this.captureException(g,{data:{__sentry__:!0},originalException:g}),Zo(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${g}`));});}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n));}_clearOutcomes(){let e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{let[o,s]=n.split(":");return{reason:o,category:s,quantity:i};});}_flushOutcomes(){mt&&at.log("Flushing outcomes...");let e=this._clearOutcomes();if(e.length===0){mt&&at.log("No outcomes to send");return;}if(!this._dsn){mt&&at.log("No dsn provided, will not send outcomes");return;}mt&&at.log("Sending outcomes:",e);let n=Gh(e,this._options.tunnel&&ti(this._dsn));this.sendEnvelope(n);}};function _d(t,e){let n=`${e} must return \`null\` or a valid event.`;if(Vn(t))return t.then(i=>{if(!zn(i)&&i!==null)throw Zo(n);return i;},i=>{throw Zo(`${e} rejected with ${i}`);});if(!zn(t)&&t!==null)throw Zo(n);return t;}function vd(t,e,n,i){let{beforeSend:o,beforeSendTransaction:s,beforeSendSpan:l}=e,h=n;if(Va(h)&&o)return o(h,i);if(Xh(h)){if(l){let p=l(Vh(h));if(p?h=Qn(n,$h(p)):xa(),h.spans){let u=[];for(let m of h.spans){let b=l(m);b?u.push(b):(xa(),u.push(m));}h.spans=u;}}if(s){if(h.spans){let p=h.spans.length;h.sdkProcessingMetadata=vt($({},n.sdkProcessingMetadata),{spanCountBeforeProcessing:p});}return s(h,i);}}return h;}function Va(t){return t.type===void 0;}function Xh(t){return t.type==="transaction";}function yd(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}];}function Jh(t,e,n,i){let o={};return e?.sdk&&(o.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(o.dsn=ti(i)),Gn(o,[yd(t)]);}gt._sentryClientToLogBufferMap=new WeakMap();function Ir(t,e){let n=e??Pd(t)??[];if(n.length===0)return;let i=t.getOptions(),o=Jh(n,i._metadata,i.tunnel,t.getDsn());gt._sentryClientToLogBufferMap?.set(t,[]),t.emit("flushLogs"),t.sendEnvelope(o);}function Pd(t){return gt._sentryClientToLogBufferMap?.get(t);}function $a(t,e){e.debug===!0&&(mt?at.enable():We(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");})),Ae().update(e.initialScope);let i=new t(e);return Ga(i),i.init(),i;}function Ga(t){Ae().setClient(t);}var Ua=Symbol.for("SentryBufferFullError");function Kh(t){let e=[];function n(){return t===void 0||e.length<t;}function i(l){return e.splice(e.indexOf(l),1)[0]||Promise.resolve(void 0);}function o(l){if(!n())return ei(Ua);let h=l();return e.indexOf(h)===-1&&e.push(h),h.then(()=>i(h)).then(null,()=>i(h).then(null,()=>{})),h;}function s(l){return new gn((h,p)=>{let u=e.length;if(!u)return h(!0);let m=setTimeout(()=>{l&&l>0&&h(!1);},l);e.forEach(b=>{ln(b).then(()=>{--u||(clearTimeout(m),h(!0));},p);});});}return{$:e,add:o,drain:s};}function Cd(t,e=Date.now()){let n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;let i=Date.parse(`${t}`);return isNaN(i)?6e4:i-e;}function xd(t,e){return t[e]||t.all||0;}function Qh(t,e,n=Date.now()){return xd(t,e)>n;}function tp(t,{statusCode:e,headers:n},i=Date.now()){let o=$({},t),s=n?.["x-sentry-rate-limits"],l=n?.["retry-after"];if(s)for(let h of s.trim().split(",")){let[p,u,,,m]=h.split(":",5),b=parseInt(p,10),d=(isNaN(b)?60:b)*1e3;if(!u)o.all=i+d;else for(let g of u.split(";"))g==="metric_bucket"?(!m||m.split(";").includes("custom"))&&(o[g]=i+d):o[g]=i+d;}else l?o.all=i+Cd(l,i):e===429&&(o.all=i+60*1e3);return o;}var bd=64;function Wo(t,e,n=Kh(t.bufferSize||bd)){let i={},o=l=>n.drain(l);function s(l){let h=[];if(Ia(l,(b,d)=>{let g=La(d);Qh(i,g)?t.recordDroppedEvent("ratelimit_backoff",g):h.push(b);}),h.length===0)return ln({});let p=Gn(l[0],h),u=b=>{Ia(p,(d,g)=>{t.recordDroppedEvent(b,La(g));});},m=()=>e({body:Sh(p)}).then(b=>(b.statusCode!==void 0&&(b.statusCode<200||b.statusCode>=300)&&mt&&at.warn(`Sentry responded with status code ${b.statusCode} to sent event.`),i=tp(i,b),b),b=>{throw u("network_error"),mt&&at.error("Encountered error running transport request:",b),b;});return n.add(m).then(b=>b,b=>{if(b===Ua)return mt&&at.error("Skipped sending event because buffer is full."),u("queue_overflow"),ln({});throw b;});}return{send:s,flush:o};}function Ha(t){t.user?.ip_address===void 0&&(t.user=vt($({},t.user),{ip_address:"{{auto}}"}));}function ja(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs=vt($({},t.attrs),{ip_address:"{{auto}}"})):t.ipAddress===void 0&&(t.ipAddress="{{auto}}");}function Lr(t,e,n=[e],i="npm"){let o=t._metadata||{};o.sdk||(o.sdk={name:`sentry.javascript.${e}`,packages:n.map(s=>({name:`${i}:@sentry/${s}`,version:Tn})),version:Tn}),t._metadata=o;}var Ed=100;function In(t,e){let n=Ut(),i=mn();if(!n)return;let{beforeBreadcrumb:o=null,maxBreadcrumbs:s=Ed}=n.getOptions();if(s<=0)return;let l=kn(),h=$({timestamp:l},t),p=o?We(()=>o(h,e)):h;p!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",p,e),i.addBreadcrumb(p,s));}var ep,Sd="FunctionToString",np=new WeakMap(),Md=()=>({name:Sd,setupOnce(){ep=Function.prototype.toString;try{Function.prototype.toString=function(...t){let e=Ei(this),n=np.has(Ut())&&e!==void 0?e:this;return ep.apply(n,t);};}catch{}},setup(t){np.set(t,!0);}}),tr=Md;var Td=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],wd="EventFilters",Za=(t={})=>{let e;return{name:wd,setup(n){let i=n.getOptions();e=ip(t,i);},processEvent(n,i,o){if(!e){let s=o.getOptions();e=ip(t,s);}return Od(n,e)?null:n;}};},er=(t={})=>vt($({},Za(t)),{name:"InboundFilters"});function ip(t={},e={}){return{allowUrls:[...(t.allowUrls||[]),...(e.allowUrls||[])],denyUrls:[...(t.denyUrls||[]),...(e.denyUrls||[])],ignoreErrors:[...(t.ignoreErrors||[]),...(e.ignoreErrors||[]),...(t.disableErrorDefaults?[]:Td)],ignoreTransactions:[...(t.ignoreTransactions||[]),...(e.ignoreTransactions||[])]};}function Od(t,e){if(t.type){if(t.type==="transaction"&&Ad(t,e.ignoreTransactions))return mt&&at.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${wn(t)}`),!0;}else{if(kd(t,e.ignoreErrors))return mt&&at.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${wn(t)}`),!0;if(Fd(t))return mt&&at.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${wn(t)}`),!0;if(Id(t,e.denyUrls))return mt&&at.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${wn(t)}.
Url: ${qo(t)}`),!0;if(!Ld(t,e.allowUrls))return mt&&at.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${wn(t)}.
Url: ${qo(t)}`),!0;}return!1;}function kd(t,e){return e?.length?jo(t).some(n=>Yi(n,e)):!1;}function Ad(t,e){if(!e?.length)return!1;let n=t.transaction;return n?Yi(n,e):!1;}function Id(t,e){if(!e?.length)return!1;let n=qo(t);return n?Yi(n,e):!1;}function Ld(t,e){if(!e?.length)return!0;let n=qo(t);return n?Yi(n,e):!0;}function Rd(t=[]){for(let e=t.length-1;e>=0;e--){let n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null;}return null;}function qo(t){try{let n=[...(t.exception?.values??[])].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?Rd(n):null;}catch{return mt&&at.error(`Cannot extract url for event ${wn(t)}`),null;}}function Fd(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1;}function qa(t,e,n,i,o,s){if(!o.exception?.values||!s||!dn(s.originalException,Error))return;let l=o.exception.values.length>0?o.exception.values[o.exception.values.length-1]:void 0;l&&(o.exception.values=Wa(t,e,i,s.originalException,n,o.exception.values,l,0));}function Wa(t,e,n,i,o,s,l,h){if(s.length>=n+1)return s;let p=[...s];if(dn(i[o],Error)){rp(l,h);let u=t(e,i[o]),m=p.length;op(u,o,m,h),p=Wa(t,e,n,i[o],o,[u,...p],u,m);}return Array.isArray(i.errors)&&i.errors.forEach((u,m)=>{if(dn(u,Error)){rp(l,h);let b=t(e,u),d=p.length;op(b,`errors[${m}]`,d,h),p=Wa(t,e,n,u,o,[b,...p],b,d);}}),p;}function rp(t,e){t.mechanism=t.mechanism||{type:"generic",handled:!0},t.mechanism=vt($($({},t.mechanism),t.type==="AggregateError"&&{is_exception_group:!0}),{exception_id:e});}function op(t,e,n,i){t.mechanism=t.mechanism||{type:"generic",handled:!0},t.mechanism=vt($({},t.mechanism),{type:"chained",source:e,exception_id:n,parent_id:i});}function Ya(t){let e="console";Ie(e,t),Le(e,Nd);}function Nd(){"console"in gt&&Sr.forEach(function(t){t in gt.console&&le(gt.console,t,function(e){return qi[t]=e,function(...n){he("console",{args:n,level:t}),qi[t]?.apply(gt.console,n);};});});}function Xa(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log";}var Bd="Dedupe",Dd=()=>{let t;return{name:Bd,processEvent(e){if(e.type)return e;try{if(zd(e,t))return mt&&at.warn("Event dropped due to being a duplicate of previously captured event."),null;}catch{}return t=e;}};},nr=Dd;function zd(t,e){return e?!!(Vd(t,e)||$d(t,e)):!1;}function Vd(t,e){let n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!lp(t,e)||!ap(t,e));}function $d(t,e){let n=sp(e),i=sp(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!lp(t,e)||!ap(t,e));}function ap(t,e){let n=Ro(t),i=Ro(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let o=0;o<i.length;o++){let s=i[o],l=n[o];if(s.filename!==l.filename||s.lineno!==l.lineno||s.colno!==l.colno||s.function!==l.function)return!1;}return!0;}function lp(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("");}catch{return!1;}}function sp(t){return t.exception?.values&&t.exception.values[0];}function Rr(t){if(!t)return{};let e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};let n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i};}function Yo(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0;}var Fr=gt;function Ja(){return"history"in Fr&&!!Fr.history;}function Gd(){if(!("fetch"in Fr))return!1;try{return new Headers(),new Request("http://www.example.com"),new Response(),!0;}catch{return!1;}}function Nr(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString());}function Ka(){if(typeof EdgeRuntime=="string")return!0;if(!Gd())return!1;if(Nr(Fr.fetch))return!0;let t=!1,e=Fr.document;if(e&&typeof e.createElement=="function")try{let n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Nr(n.contentWindow.fetch)),e.head.removeChild(n);}catch(n){mt&&at.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n);}return t;}function tl(t,e){let n="fetch";Ie(n,t),Le(n,()=>Ud(void 0,e));}function Ud(t,e=!1){e&&!Ka()||le(gt,"fetch",function(n){return function(...i){let o=new Error(),{method:s,url:l}=Hd(i),h={args:i,fetchData:{method:s,url:l},startTimestamp:ke()*1e3,virtualError:o,headers:jd(i)};return t||he("fetch",$({},h)),n.apply(gt,i).then(p=>hi(this,null,function*(){return t?t(p):he("fetch",vt($({},h),{endTimestamp:ke()*1e3,response:p})),p;}),p=>{if(he("fetch",vt($({},h),{endTimestamp:ke()*1e3,error:p})),Pi(p)&&p.stack===void 0&&(p.stack=o.stack,qe(p,"framesToPop",1)),p instanceof TypeError&&(p.message==="Failed to fetch"||p.message==="Load failed"||p.message==="NetworkError when attempting to fetch resource."))try{let u=new URL(h.fetchData.url);p.message=`${p.message} (${u.host})`;}catch{}throw p;});};});}function Qa(t,e){return!!t&&typeof t=="object"&&!!t[e];}function cp(t){return typeof t=="string"?t:t?Qa(t,"url")?t.url:t.toString?t.toString():"":"";}function Hd(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){let[n,i]=t;return{url:cp(n),method:Qa(i,"method")?String(i.method).toUpperCase():"GET"};}let e=t[0];return{url:cp(e),method:Qa(e,"method")?String(e.method).toUpperCase():"GET"};}function jd(t){let[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Wc(e))return new Headers(e.headers);}catch{}}function el(){return"npm";}var zt=gt,nl=0;function il(){return nl>0;}function om(){nl++,setTimeout(()=>{nl--;});}function Mi(t,e={}){function n(o){return typeof o=="function";}if(!n(t))return t;try{let o=t.__sentry_wrapped__;if(o)return typeof o=="function"?o:t;if(Ei(t))return t;}catch{return t;}let i=function(...o){try{let s=o.map(l=>Mi(l,e));return t.apply(this,s);}catch(s){throw om(),Mr(l=>{l.addEventProcessor(h=>(e.mechanism&&(Xi(h,void 0,void 0),On(h,e.mechanism)),h.extra=vt($({},h.extra),{arguments:o}),h)),$o(s);}),s;}};try{for(let o in t)Object.prototype.hasOwnProperty.call(t,o)&&(i[o]=t[o]);}catch{}Eo(i,t),qe(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name;}});}catch{}return i;}function hp(){let t=bi(),{referrer:e}=zt.document||{},{userAgent:n}=zt.navigator||{},i=$($({},e&&{Referer:e}),n&&{"User-Agent":n});return{url:t,headers:i};}function Xo(t,e){let n=sl(t,e),i={type:hm(e),value:pm(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i;}function sm(t,e,n,i){let s=Ut()?.getOptions().normalizeDepth,l=dm(e),h={__serialized__:No(e,s)};if(l)return{exception:{values:[Xo(t,l)]},extra:h};let p={exception:{values:[{type:xi(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:fm(e,{isUnhandledRejection:i})}]},extra:h};if(n){let u=sl(t,n);u.length&&(p.exception.values[0].stacktrace={frames:u});}return p;}function rl(t,e){return{exception:{values:[Xo(t,e)]}};}function sl(t,e){let n=e.stacktrace||e.stack||"",i=lm(e),o=cm(e);try{return t(n,i,o);}catch{}return[];}var am=/Minified React error #\d+;/i;function lm(t){return t&&am.test(t.message)?1:0;}function cm(t){return typeof t.framesToPop=="number"?t.framesToPop:0;}function pp(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1;}function hm(t){let e=t?.name;return!e&&pp(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e;}function pm(t){let e=t?.message;return pp(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message";}function fp(t,e,n,i){let o=n?.syntheticException||void 0,s=Jo(t,e,o,i);return On(s),s.level="error",n?.event_id&&(s.event_id=n.event_id),ln(s);}function up(t,e,n="info",i,o){let s=i?.syntheticException||void 0,l=ol(t,e,s,o);return l.level=n,i?.event_id&&(l.event_id=i.event_id),ln(l);}function Jo(t,e,n,i,o){let s;if(Co(e)&&e.error)return rl(t,e.error);if(xo(e)||ra(e)){let l=e;if("stack"in e)s=rl(t,e);else{let h=l.name||(xo(l)?"DOMError":"DOMException"),p=l.message?`${h}: ${l.message}`:h;s=ol(t,p,n,i),Xi(s,p);}return"code"in l&&(s.tags=vt($({},s.tags),{"DOMException.code":`${l.code}`})),s;}return Pi(e)?rl(t,e):zn(e)||xi(e)?(s=sm(t,e,n,o),On(s,{synthetic:!0}),s):(s=ol(t,e,n,i),Xi(s,`${e}`,void 0),On(s,{synthetic:!0}),s);}function ol(t,e,n,i){let o={};if(i&&n){let s=sl(t,n);s.length&&(o.exception={values:[{value:e,stacktrace:{frames:s}}]}),On(o,{synthetic:!0});}if(Wi(e)){let{__sentry_template_string__:s,__sentry_template_values__:l}=e;return o.logentry={message:s,params:l},o;}return o.message=e,o;}function fm(t,{isUnhandledRejection:e}){let n=ha(t),i=e?"promise rejection":"exception";return Co(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:xi(t)?`Event \`${um(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`;}function um(t){try{let e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0;}catch{}}function dm(t){for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e)){let n=t[e];if(n instanceof Error)return n;}}var mm=5e3,Ko=class extends Ar{constructor(e){let n=gm(e),i=zt.SENTRY_SDK_SOURCE||el();Lr(n,"browser",["browser"],i),super(n);let{sendDefaultPii:o,sendClientReports:s,_experiments:l}=this._options,h=l?.enableLogs;zt.document&&(s||h)&&zt.document.addEventListener("visibilitychange",()=>{zt.document.visibilityState==="hidden"&&(s&&this._flushOutcomes(),h&&Ir(this));}),h&&(this.on("flush",()=>{Ir(this);}),this.on("afterCaptureLog",()=>{this._logFlushIdleTimeout&&clearTimeout(this._logFlushIdleTimeout),this._logFlushIdleTimeout=setTimeout(()=>{Ir(this);},mm);})),o&&(this.on("postprocessEvent",Ha),this.on("beforeSendSession",ja));}eventFromException(e,n){return fp(this._options.stackParser,e,n,this._options.attachStacktrace);}eventFromMessage(e,n="info",i){return up(this._options.stackParser,e,n,i,this._options.attachStacktrace);}_prepareEvent(e,n,i,o){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,o);}};function gm(t){return $({release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:zt.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0},t);}var dp=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__;var pe=gt;var _m=1e3,mp,al,ll;function cl(t){let e="dom";Ie(e,t),Le(e,vm);}function vm(){if(!pe.document)return;let t=he.bind(null,"dom"),e=gp(t,!0);pe.document.addEventListener("click",e,!1),pe.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{let o=pe[n]?.prototype;o?.hasOwnProperty?.("addEventListener")&&(le(o,"addEventListener",function(s){return function(l,h,p){if(l==="click"||l=="keypress")try{let u=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},m=u[l]=u[l]||{refCount:0};if(!m.handler){let b=gp(t);m.handler=b,s.call(this,l,b,p);}m.refCount++;}catch{}return s.call(this,l,h,p);};}),le(o,"removeEventListener",function(s){return function(l,h,p){if(l==="click"||l=="keypress")try{let u=this.__sentry_instrumentation_handlers__||{},m=u[l];m&&(m.refCount--,m.refCount<=0&&(s.call(this,l,m.handler,p),m.handler=void 0,delete u[l]),Object.keys(u).length===0&&delete this.__sentry_instrumentation_handlers__);}catch{}return s.call(this,l,h,p);};}));});}function ym(t){if(t.type!==al)return!1;try{if(!t.target||t.target._sentryId!==ll)return!1;}catch{}return!0;}function Pm(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0;}function gp(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;let i=Cm(n);if(Pm(n.type,i))return;qe(n,"_sentryCaptured",!0),i&&!i._sentryId&&qe(i,"_sentryId",ce());let o=n.type==="keypress"?"input":n.type;ym(n)||(t({event:n,name:o,global:e}),al=n.type,ll=i?i._sentryId:void 0),clearTimeout(mp),mp=pe.setTimeout(()=>{ll=void 0,al=void 0;},_m);};}function Cm(t){try{return t.target;}catch{return null;}}var Qo;function Dr(t){let e="history";Ie(e,t),Le(e,xm);}function xm(){if(pe.addEventListener("popstate",()=>{let e=pe.location.href,n=Qo;if(Qo=e,n===e)return;he("history",{from:n,to:e});}),!Ja())return;function t(e){return function(...n){let i=n.length>2?n[2]:void 0;if(i){let o=Qo,s=bm(String(i));if(Qo=s,o===s)return e.apply(this,n);he("history",{from:o,to:s});}return e.apply(this,n);};}le(pe.history,"pushState",t),le(pe.history,"replaceState",t);}function bm(t){try{return new URL(t,pe.location.origin).toString();}catch{return t;}}var ts={};function hl(t){let e=ts[t];if(e)return e;let n=pe[t];if(Nr(n))return ts[t]=n.bind(pe);let i=pe.document;if(i&&typeof i.createElement=="function")try{let o=i.createElement("iframe");o.hidden=!0,i.head.appendChild(o);let s=o.contentWindow;s?.[t]&&(n=s[t]),i.head.removeChild(o);}catch(o){dp&&at.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,o);}return n&&(ts[t]=n.bind(pe));}function es(t){ts[t]=void 0;}var Ti="__sentry_xhr_v3__";function pl(t){let e="xhr";Ie(e,t),Le(e,Em);}function Em(){if(!pe.XMLHttpRequest)return;let t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){let o=new Error(),s=ke()*1e3,l=Ee(i[0])?i[0].toUpperCase():void 0,h=Sm(i[1]);if(!l||!h)return e.apply(n,i);n[Ti]={method:l,url:h,request_headers:{}},l==="POST"&&h.match(/sentry_key/)&&(n.__sentry_own_request__=!0);let p=()=>{let u=n[Ti];if(u&&n.readyState===4){try{u.status_code=n.status;}catch{}let m={endTimestamp:ke()*1e3,startTimestamp:s,xhr:n,virtualError:o};he("xhr",m);}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(u,m,b){return p(),u.apply(m,b);}}):n.addEventListener("readystatechange",p),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(u,m,b){let[d,g]=b,E=m[Ti];return E&&Ee(d)&&Ee(g)&&(E.request_headers[d.toLowerCase()]=g),u.apply(m,b);}}),e.apply(n,i);}}),t.send=new Proxy(t.send,{apply(e,n,i){let o=n[Ti];if(!o)return e.apply(n,i);i[0]!==void 0&&(o.body=i[0]);let s={startTimestamp:ke()*1e3,xhr:n};return he("xhr",s),e.apply(n,i);}});}function Sm(t){if(Ee(t))return t;try{return t.toString();}catch{}}function _p(t,e=hl("fetch")){let n=0,i=0;function o(s){let l=s.body.length;n+=l,i++;let h=$({body:s.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15},t.fetchOptions);if(!e)return es("fetch"),ei("No fetch implementation available");try{return e(t.url,h).then(p=>(n-=l,i--,{statusCode:p.status,headers:{"x-sentry-rate-limits":p.headers.get("X-Sentry-Rate-Limits"),"retry-after":p.headers.get("Retry-After")}}));}catch(p){return es("fetch"),n-=l,i--,ei(p);}}return Wo(t,o);}var Mm=30;var Tm=50;function fl(t,e,n,i){let o={filename:t,function:e==="<anonymous>"?An:e,in_app:!0};return n!==void 0&&(o.lineno=n),i!==void 0&&(o.colno=i),o;}var wm=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,Om=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,km=/\((\S*)(?::(\d+))(?::(\d+))\)/,Am=t=>{let e=wm.exec(t);if(e){let[,i,o,s]=e;return fl(i,An,+o,+s);}let n=Om.exec(t);if(n){if(n[2]&&n[2].indexOf("eval")===0){let l=km.exec(n[2]);l&&(n[2]=l[1],n[3]=l[2],n[4]=l[3]);}let[o,s]=yp(n[1]||An,n[2]);return fl(s,o,n[3]?+n[3]:void 0,n[4]?+n[4]:void 0);}},Im=[Mm,Am],Lm=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Rm=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Fm=t=>{let e=Lm.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){let s=Rm.exec(e[3]);s&&(e[1]=e[1]||"eval",e[3]=s[1],e[4]=s[2],e[5]="");}let i=e[3],o=e[1]||An;return[o,i]=yp(o,i),fl(i,o,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0);}},Nm=[Tm,Fm];var Bm=[Im,Nm],vp=Lo(...Bm),yp=(t,e)=>{let n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:An,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e];};var ni=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__;var ns=1024,Dm="Breadcrumbs",zm=(t={})=>{let e=$({console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0},t);return{name:Dm,setup(n){e.console&&Ya(Gm(n)),e.dom&&cl($m(n,e.dom)),e.xhr&&pl(Um(n)),e.fetch&&tl(Hm(n)),e.history&&Dr(jm(n)),e.sentry&&n.on("beforeSendEvent",Vm(n));}};},zr=zm;function Vm(t){return function(n){Ut()===t&&In({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:wn(n)},{event:n});};}function $m(t,e){return function(i){if(Ut()!==t)return;let o,s,l=typeof e=="object"?e.serializeAttribute:void 0,h=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;h&&h>ns&&(ni&&at.warn(`\`dom.maxStringLength\` cannot exceed ${ns}, but a value of ${h} was configured. Sentry will use ${ns} instead.`),h=ns),typeof l=="string"&&(l=[l]);try{let u=i.event,m=Zm(u)?u.target:u;o=Er(m,{keyAttrs:l,maxStringLength:h}),s=ca(m);}catch{o="<unknown>";}if(o.length===0)return;let p={category:`ui.${i.name}`,message:o};s&&(p.data={"ui.component_name":s}),In(p,{event:i.event,name:i.name,global:i.global});};}function Gm(t){return function(n){if(Ut()!==t)return;let i={category:"console",data:{arguments:n.args,logger:"console"},level:Xa(n.level),message:bo(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${bo(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;In(i,{input:n.args,level:n.level});};}function Um(t){return function(n){if(Ut()!==t)return;let{startTimestamp:i,endTimestamp:o}=n,s=n.xhr[Ti];if(!i||!o||!s)return;let{method:l,url:h,status_code:p,body:u}=s,m={method:l,url:h,status_code:p},b={xhr:n.xhr,input:u,startTimestamp:i,endTimestamp:o},d={category:"xhr",data:m,type:"http",level:Yo(p)};t.emit("beforeOutgoingRequestBreadcrumb",d,b),In(d,b);};}function Hm(t){return function(n){if(Ut()!==t)return;let{startTimestamp:i,endTimestamp:o}=n;if(o&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){let s=n.fetchData,l={data:n.error,input:n.args,startTimestamp:i,endTimestamp:o},h={category:"fetch",data:s,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",h,l),In(h,l);}else{let s=n.response,l=vt($({},n.fetchData),{status_code:s?.status});n.fetchData.request_body_size,n.fetchData.response_body_size,s?.status;let h={input:n.args,response:s,startTimestamp:i,endTimestamp:o},p={category:"fetch",data:l,type:"http",level:Yo(l.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",p,h),In(p,h);}};}function jm(t){return function(n){if(Ut()!==t)return;let i=n.from,o=n.to,s=Rr(zt.location.href),l=i?Rr(i):void 0,h=Rr(o);l?.path||(l=s),s.protocol===h.protocol&&s.host===h.host&&(o=h.relative),s.protocol===l.protocol&&s.host===l.host&&(i=l.relative),In({category:"navigation",data:{from:i,to:o}});};}function Zm(t){return!!t&&!!t.target;}var Wm=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],qm="BrowserApiErrors",Ym=(t={})=>{let e=$({XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1},t);return{name:qm,setupOnce(){e.setTimeout&&le(zt,"setTimeout",Pp),e.setInterval&&le(zt,"setInterval",Pp),e.requestAnimationFrame&&le(zt,"requestAnimationFrame",Xm),e.XMLHttpRequest&&"XMLHttpRequest"in zt&&le(XMLHttpRequest.prototype,"send",Jm);let n=e.eventTarget;n&&(Array.isArray(n)?n:Wm).forEach(o=>Km(o,e));}};},Cp=Ym;function Pp(t){return function(...e){let n=e[0];return e[0]=Mi(n,{mechanism:{data:{function:sn(t)},handled:!1,type:"instrument"}}),t.apply(this,e);};}function Xm(t){return function(e){return t.apply(this,[Mi(e,{mechanism:{data:{function:"requestAnimationFrame",handler:sn(t)},handled:!1,type:"instrument"}})]);};}function Jm(t){return function(...e){let n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(o=>{o in n&&typeof n[o]=="function"&&le(n,o,function(s){let l={mechanism:{data:{function:o,handler:sn(s)},handled:!1,type:"instrument"}},h=Ei(s);return h&&(l.mechanism.data.handler=sn(h)),Mi(s,l);});}),t.apply(this,e);};}function Km(t,e){let i=zt[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(le(i,"addEventListener",function(o){return function(s,l,h){try{Qm(l)&&(l.handleEvent=Mi(l.handleEvent,{mechanism:{data:{function:"handleEvent",handler:sn(l),target:t},handled:!1,type:"instrument"}}));}catch{}return e.unregisterOriginalCallbacks&&tg(this,s,l),o.apply(this,[s,Mi(l,{mechanism:{data:{function:"addEventListener",handler:sn(l),target:t},handled:!1,type:"instrument"}}),h]);};}),le(i,"removeEventListener",function(o){return function(s,l,h){try{let p=l.__sentry_wrapped__;p&&o.call(this,s,p,h);}catch{}return o.call(this,s,l,h);};}));}function Qm(t){return typeof t.handleEvent=="function";}function tg(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n);}var Vr=()=>({name:"BrowserSession",setupOnce(){if(typeof zt.document>"u"){ni&&at.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return;}Or({ignoreDuration:!0}),kr(),Dr(({from:t,to:e})=>{t!==void 0&&t!==e&&(Or({ignoreDuration:!0}),kr());});}});var eg="GlobalHandlers",ng=(t={})=>{let e=$({onerror:!0,onunhandledrejection:!0},t);return{name:eg,setupOnce(){Error.stackTraceLimit=50;},setup(n){e.onerror&&(ig(n),xp("onerror")),e.onunhandledrejection&&(rg(n),xp("onunhandledrejection"));}};},$r=ng;function ig(t){Ma(e=>{let{stackParser:n,attachStacktrace:i}=bp();if(Ut()!==t||il())return;let{msg:o,url:s,line:l,column:h,error:p}=e,u=ag(Jo(n,p||o,void 0,i,!1),s,l,h);u.level="error",wr(u,{originalException:p,mechanism:{handled:!1,type:"onerror"}});});}function rg(t){wa(e=>{let{stackParser:n,attachStacktrace:i}=bp();if(Ut()!==t||il())return;let o=og(e),s=Ci(o)?sg(o):Jo(n,o,void 0,i,!0);s.level="error",wr(s,{originalException:o,mechanism:{handled:!1,type:"onunhandledrejection"}});});}function og(t){if(Ci(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason;}catch{}return t;}function sg(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}};}function ag(t,e,n,i){let o=t.exception=t.exception||{},s=o.values=o.values||[],l=s[0]=s[0]||{},h=l.stacktrace=l.stacktrace||{},p=h.frames=h.frames||[],u=i,m=n,b=Ee(e)&&e.length>0?e:bi();return p.length===0&&p.push({colno:u,filename:b,function:An,in_app:!0,lineno:m}),t;}function xp(t){ni&&at.log(`Global Handler attached: ${t}`);}function bp(){return Ut()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1};}var Gr=()=>({name:"HttpContext",preprocessEvent(t){if(!zt.navigator&&!zt.location&&!zt.document)return;let e=hp(),n=$($({},e.headers),t.request?.headers);t.request=vt($($({},e),t.request),{headers:n});}});var lg="cause",cg=5,hg="LinkedErrors",pg=(t={})=>{let e=t.limit||cg,n=t.key||lg;return{name:hg,preprocessEvent(i,o,s){let l=s.getOptions();qa(Xo,l.stackParser,n,e,i,o);}};},Ur=pg;function Ep(){return fg()?(ni&&We(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/");}),!0):!1;}function fg(){if(typeof zt.window>"u")return!1;let t=zt;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;let n=bi(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(zt===zt.top&&i.some(s=>n.startsWith(`${s}://`)));}function Sp(t){return[er(),tr(),Cp(),zr(),$r(),Ur(),nr(),Gr(),Vr()];}function ul(t={}){let e=!t.skipBrowserExtensionCheck&&Ep(),n=vt($({},t),{enabled:e?!1:t.enabled,stackParser:Ea(t.stackParser||vp),integrations:Na({integrations:t.integrations,defaultIntegrations:t.defaultIntegrations==null?Sp():t.defaultIntegrations}),transport:t.transport||_p});return $a(Ko,n);}var dg=typeof __SENTRY_DEBUG__>"u"?!0:__SENTRY_DEBUG__;function mg(t={}){return[er(),tr(),zr(),$r(),Ur(),nr(),Gr(),Vr()];}function Mp(t){let e=$({defaultIntegrations:mg()},t);return Lr(e,"angular"),gg(),ul(e);}function gg(){let e=ia?.major&&parseInt(ia.major,10);e&&(e<14&&dg&&at.warn(`This Sentry SDK does not officially support Angular ${e}.`,"This SDK only supports Angular 14 and above.","If you're using lower Angular versions, check the Angular Version Compatibility table in our docs: https://docs.sentry.io/platforms/javascript/guides/angular/#angular-version-compatibility.","Otherwise, please consider upgrading your Angular version."),Uo("angular",{version:e}));}var mE=typeof Zone<"u"&&Zone.root?.run;var Ve=class t{constructor(e){this.el=e;let n=$localize.locale||"en";Oc(n)==="rtl"&&(this.el.nativeElement.style.direction="rtl");}static ɵfac=function(n){return new(n||t)(et(mo));};static ɵdir=Sc({type:t,selectors:[["","ltr",""]]});};var ae=class t{currentImage=X(null);currentImageUrl=X(null);mainMenuHeight=X(348);aboutVisible=X(!1);constructor(){}setImage(e){this.currentImage.set(e);let n=this.currentImageUrl();n&&URL.revokeObjectURL(n),this.currentImageUrl.set(URL.createObjectURL(e));}static ɵfac=function(n){return new(n||t)();};static ɵprov=Sn({token:t,factory:t.ɵfac,providedIn:"root"});};var Ht=class t{constructor(e,n,i){this.http=e;this.zone=n;this.locale_=i;this.locale=i.split("-")[0],this.uploadImageInProgress.next(!1),se(()=>{let o=this.workspaceId();o&&this.fetchWorkspace(o).subscribe();});}CHRONOMAPS_API_URL="https://chronomaps-api-qjzuw7ypfq-ez.a.run.app";COMPLETE_FLOW_URL="https://complete-flow-qjzuw7ypfq-ez.a.run.app";SCREENSHOT_HANDLER_URL="https://screenshot-handler-qjzuw7ypfq-ez.a.run.app";ITEM_INGRES_AGENT_URL="https://item-ingress-agent-qjzuw7ypfq-ez.a.run.app";item=X(null);api_key=X(null);workspaceId=X(null);itemId=X(null);itemKey=X(null);automatic=X(!1);workspace=X({});isWorkshop=X(!1);isWorkshopFollowup=X(!1);uploadImageInProgress=new $i(1);locale="en";updateFromRoute(e){let n=e.queryParams.workspace||this.workspaceId(),i=e.queryParams.api_key||this.api_key(),o=e.queryParams.automatic||this.automatic();o&&this.automatic.set(o==="true"),i&&this.api_key.set(i),n&&this.workspaceId.set(n);let s=!!e.queryParams.ws;this.isWorkshop.set(s);let l=!!e.queryParams.wsf;this.isWorkshopFollowup.set(l);let h=e.queryParams.key,p=e.queryParams["item-id"];p&&(this.itemKey.set(h),this.itemId.set(p),this.fetchItem(p,h).subscribe());}fetchWorkspace(e){return this.http.get(`${this.CHRONOMAPS_API_URL}/${e}`).pipe(re(n=>(this.workspace.set(n),n)));}fetchItem(e,n){let i=n?{"item-key":n}:{},o=this.api_key()?{Authorization:this.api_key()}:{};return this.http.get(`${this.CHRONOMAPS_API_URL}/${this.workspaceId()}/${e}`,{params:i,headers:o}).pipe(re(s=>(s.item_id=e,s.item_key=n,this.item.set(s),s)));}createItem(e){let n={Authorization:this.api_key()};return this.http.post(`${this.CHRONOMAPS_API_URL}/${this.workspaceId()}`,e,{headers:n}).pipe(re(i=>{let o=Object.assign({},e,i);return this.item.set(o),o;}));}updateItem(e,n,i){let o={item_key:i,item_id:n,workspace:this.workspaceId(),api_key:this.api_key(),locale:this.locale,workshop:this.isWorkshop()?"true":"false"};return this.http.post(this.COMPLETE_FLOW_URL,e,{params:o}).pipe(re(()=>(this.item.update(s=>Object.assign({},s,e)),!0)));}uploadImage(e,n,i){this.uploadImageInProgress.next(!0),this.startDiscussion(e,n,i).pipe(oe(o=>(this.uploadImageInProgress.next(!1),this.sendInitMessageNoStream(n,i)))).subscribe(o=>{});}startDiscussion(e,n,i){let o=new FormData();o.append("image",e);let s={workspace:this.workspaceId(),api_key:this.api_key(),item_id:n,item_key:i};return this.automatic()&&(s.automatic="true"),this.http.post(this.SCREENSHOT_HANDLER_URL,o,{params:s}).pipe(Ft(l=>{console.log("Screenshot uploaded successfully",l.metadata),this.item.update(h=>Object.assign({},h,l.metadata));}));}sendInitMessageNoStream(e,n){let i={workspace:this.workspaceId(),api_key:this.api_key(),item_id:e,item_key:n,message:"initial",stream:"false"};return this.http.get(`${this.ITEM_INGRES_AGENT_URL}`,{params:i}).pipe(re(o=>o.status));}sendMessage(e){let n={workspace:this.workspaceId(),api_key:this.api_key(),item_id:this.item().item_id,item_key:this.item().item_key,message:e};return new fo(i=>{let o=`${this.ITEM_INGRES_AGENT_URL}?${new URLSearchParams(n).toString()}`,s=new EventSource(o);return s.onmessage=l=>{try{this.zone.run(()=>{i.next(JSON.parse(l.data));});}catch(h){console.error("PARSE ERROR",h),i.error(h);}},s.onerror=l=>{console.error("EVENTSOURCE ERROR",l),s.close(),i.complete();},()=>{s.close();};});}static ɵfac=function(n){return new(n||t)(tn(rn),tn(bc),tn(Gi));};static ɵprov=Sn({token:t,factory:t.ɵfac,providedIn:"root"});};var _g=["video"],vg=["canvas"],yg=()=>["/"];function Pg(t,e){if(t&1&&(D(0,"div",2),Pe(1),G()),t&2){let n=Et();j(),vo(" ",n.displayMsg()," ");}}function Cg(t,e){if(t&1){let n=Dt();D(0,"div",18),St("click",function(){Tt(n);let o=Et();return wt(o.cameraClicked.set(!0));}),G();}}function xg(t,e){if(t&1&&(Ot(),Y(0,"circle",13)),t&2){let n=e.$implicit;ve("cx",n.x)("cy",n.y);}}function bg(t,e){if(t&1&&(Ot(),Y(0,"circle",17)),t&2){let n=e.$implicit;ve("cx",n.x)("cy",n.y);}}var is=class t{constructor(e,n,i,o,s,l,h){this.el=e;this.platform=n;this.destroyRef=i;this.state=o;this.router=s;this.route=l;this.api=h;this.api.updateFromRoute(this.route.snapshot),this.displayMsgSubject.pipe(be(),fi(),pi(150),fi(),Ft(()=>{this.displayMsg.set("");}),de(1)).subscribe(p=>{this.displayMsg.set(p);});}videoEl;canvasEl;canvasCtx;COUNTDOWN_INITIAL=30;FRAME_COUNT_DARKER=100;countDown=this.COUNTDOWN_INITIAL;scanState=null;stream=null;stopScannerSubject=new Be();displayMsgSubject=new Be();msg=X("");displayMsg=X("");videoHeightM=X(0);videoWidthM=X(0);displayWidth=X(0);displayHeight=X(0);viewBox=It(()=>this.displayWidth()===0||this.displayHeight()===0?"0 0 480 640":`0 0 ${this.displayWidth()} ${this.displayHeight()}`);maskPath=It(()=>{let e=this.points();return e.length<4?"":`M${e[0].x} ${e[0].y} L ${e[1].x} ${e[1].y} L ${e[2].x} ${e[2].y} L ${e[3].x} ${e[3].y} Z`;});points=X([]);cameraClicked=X(!1);displayCameraButton=X(!1);ngAfterViewInit(){if(!this.platform.browser()){console.log("Not in browser, skipping scanner initialization");return;}Yn(100).pipe(be(this.destroyRef),Ze(()=>!!window.jscanify!==void 0),Ze(()=>!!window.cv!==void 0),Ze(()=>!!this.canvasEl?.nativeElement),Ce(1)).subscribe(()=>{console.log("Starting scanner...",jscanify),this.canvasCtx=this.canvasEl.nativeElement.getContext("2d"),this.startScanner();});}getVideoConstraints(){return this.platform.ios?{facingMode:"environment",width:{min:640,ideal:1920},height:{min:480,ideal:1080}}:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1080}};}startScanner(){let e={audio:!1,video:!0};e.video=this.getVideoConstraints(),this.platform.browser()&&navigator.mediaDevices.getUserMedia(e).then(n=>{this.stream=n,this.videoEl.nativeElement.srcObject=n;let i=n.getVideoTracks()[0];i.getCapabilities().torch&&i.applyConstraints({advanced:[{torch:!0}]}).catch(s=>console.error("Torch ON failed:",s));});}checkCornerPoints(e){if(!e||!e.topLeftCorner||!e.topRightCorner||!e.bottomLeftCorner||!e.bottomRightCorner)return null;let n=["topLeftCorner","topRightCorner","bottomLeftCorner","bottomRightCorner"];for(let i of n){let o=e[i];if(typeof o.x!="number"||typeof o.y!="number"||o.x<0||o.y<0)return null;}return e;}checkDimensions(e,n,i,o){if(!e)return o<this.FRAME_COUNT_DARKER?this.displayMsgSubject.next("Pas de pagina aan het frame aan"):this.displayMsgSubject.next("Probeer op een donkerder achtergrond"),{valid:!1,snap:!1};let s=Math.sqrt(Math.pow(e.topLeftCorner.x-e.topRightCorner.x,2)+Math.pow(e.topLeftCorner.y-e.topRightCorner.y,2)),l=Math.sqrt(Math.pow(e.bottomLeftCorner.x-e.bottomRightCorner.x,2)+Math.pow(e.bottomLeftCorner.y-e.bottomRightCorner.y,2)),h=Math.sqrt(Math.pow(e.topLeftCorner.x-e.bottomLeftCorner.x,2)+Math.pow(e.topLeftCorner.y-e.bottomLeftCorner.y,2)),p=Math.sqrt(Math.pow(e.topRightCorner.x-e.bottomRightCorner.x,2)+Math.pow(e.topRightCorner.y-e.bottomRightCorner.y,2)),u=(s+l)/2,m=(h+p)/2,b=u/m/.53,d=o<this.FRAME_COUNT_DARKER?.05:.1;if(b<1-d||b>1+d)return this.msg.set("averageRatio is not in range: "+b),o<this.FRAME_COUNT_DARKER?this.displayMsgSubject.next("Pas de pagina aan het frame aan"):this.displayMsgSubject.next("Probeer op een donkerder achtergrond"),{valid:!1,snap:!1};let g=Math.max(s,l)/Math.min(s,l),E=Math.max(h,p)/Math.min(h,p);if(g>1.2||g<.8)return this.msg.set("topBottomRatio is not in range: "+g),this.displayMsgSubject.next("Verander je hoek"),{valid:!1,snap:!0};if(E>1.1||E<.9)return this.msg.set("leftRightRatio is not in range: "+E),this.displayMsgSubject.next("Verander je hoek"),{valid:!1,snap:!0};let P=u>.5*n,k=m>.5*i;return!P&&!k?(this.msg.set("Neither averageWidth nor averageHeight is above 66% of video dimensions: "+u+"<0.66*"+n+" "+m+"<0.66*"+i),this.displayMsgSubject.next("Kom dichterbij met je camera"),{valid:!1,snap:!0}):(this.msg.set("Dimensions are valid: "+P+" "+k),{valid:!0,snap:!0});}checkBlurry(e){let n=new cv.Mat(),i=new cv.Mat(),o=new cv.Mat();cv.cvtColor(e,e,cv.COLOR_RGB2GRAY,0),cv.Laplacian(e,n,cv.CV_64F,1,1,0,cv.BORDER_DEFAULT),cv.meanStdDev(n,o,i);let s=i.data64F[0]<10;return this.msg.set("Blurriness is "+s+" "+i.data64F[0]),n.delete(),i.delete(),o.delete(),s;}playing(){console.log("PLAYING"),this.videoEl.nativeElement.play();let e=new jscanify(),n=this.videoEl.nativeElement.videoWidth,i=this.videoEl.nativeElement.videoHeight;this.videoHeightM.set(i),this.videoWidthM.set(n),this.canvasEl.nativeElement.width=n,this.canvasEl.nativeElement.height=i;let o=Math.min(this.el.nativeElement.clientWidth/n,this.el.nativeElement.clientHeight/i),s=Math.floor(Math.min(i/640,n/480));console.log("SAMPLE RATIO",s);let l=0;Yn(33).pipe(be(this.destroyRef),Pc(this.stopScannerSubject),Ze(()=>this.countDown>=0),re(()=>{let h=null,p=null,u={valid:!1,snap:!1},m=null;l+=1,l%100===0&&console.log("Scanning...",l);try{this.canvasCtx?.drawImage(this.videoEl.nativeElement,0,0),h=cv.imread(this.canvasEl.nativeElement),p=new cv.Mat();let b=Math.floor(h.cols/s),d=Math.floor(h.rows/s);this.displayWidth.set(b),this.displayHeight.set(d);let g=new cv.Size(b,d);cv.resize(h,p,g,0,0,cv.INTER_NEAREST);let E=e.findPaperContour(p);if(E){let P=this.checkCornerPoints(e.getCornerPoints(E,p)),{valid:k,snap:v}=this.checkDimensions(P,b,d,l);k&&(m=this.checkBlurry(p)),u={valid:k,snap:v,blurry:m,cornerPoints:P};}}catch(b){console.error("Error processing video frame",l,b),this.restartScanner();}finally{h?.delete(),p?.delete();}return u;})).subscribe(h=>{this.setPoints(h?.snap&&h?.cornerPoints||null);let p=null;h?.cornerPoints&&(h.cornerPoints.topLeftCorner.x*=s,h.cornerPoints.topLeftCorner.y*=s,h.cornerPoints.topRightCorner.x*=s,h.cornerPoints.topRightCorner.y*=s,h.cornerPoints.bottomLeftCorner.x*=s,h.cornerPoints.bottomLeftCorner.y*=s,h.cornerPoints.bottomRightCorner.x*=s,h.cornerPoints.bottomRightCorner.y*=s),h?.valid?(this.displayMsgSubject.next("Houd je camera stil..."),this.countDown>0&&(this.countDown-=1),!h.blurry&&this.countDown>5&&(this.countDown=0),this.countDown===0&&this.displayCameraButton.set(!0),this.cameraClicked()&&(this.countDown=-1,p=e.extractPaper(this.canvasEl.nativeElement,1060,2e3,h.cornerPoints),console.log("Extraction result:",p),this.stream?.getTracks().forEach(u=>{u.readyState=="live"&&u.stop();}),this.videoEl.nativeElement.pause(),this.stream=null,p.toBlob(u=>{u&&(this.state.setImage(u),this.router.navigate(["/confirm"],{queryParamsHandling:"merge"}));},"image/jpeg",.95))):this.countDown=this.COUNTDOWN_INITIAL;});}setPoints(e){let n;e?n=e:n={topLeftCorner:{x:this.displayWidth()*.15,y:this.displayHeight()*.15},topRightCorner:{x:this.displayWidth()*.85,y:this.displayHeight()*.15},bottomLeftCorner:{x:this.displayWidth()*.15,y:this.displayHeight()*.85},bottomRightCorner:{x:this.displayWidth()*.85,y:this.displayHeight()*.85}},this.points.set([{x:n.topLeftCorner.x,y:n.topLeftCorner.y},{x:n.topRightCorner.x,y:n.topRightCorner.y},{x:n.bottomRightCorner.x,y:n.bottomRightCorner.y},{x:n.bottomLeftCorner.x,y:n.bottomLeftCorner.y}]);}ngOnDestroy(){this.stopScanner();}stopScanner(){this.stopScannerSubject.next(),this.stream&&(this.stream.getTracks().forEach(e=>{e.stop();}),this.stream=null),this.platform.browser()&&this.videoEl?.nativeElement?.pause();}restartScanner(){this.stopScanner(),this.countDown=this.COUNTDOWN_INITIAL,console.log("RESTARTING SCANNER"),je(500).subscribe(()=>{this.startScanner();});}static ɵfac=function(n){return new(n||t)(et(mo),et(jt),et(Xn),et(ae),et(xe),et(me),et(Ht));};static ɵcmp=_t({type:t,selectors:[["app-scanner"]],viewQuery:function(n,i){if(n&1&&(Wt(_g,7),Wt(vg,7)),n&2){let o;qt(o=Yt())&&(i.videoEl=o.first),qt(o=Yt())&&(i.canvasEl=o.first);}},decls:22,vars:7,consts:[["canvas",""],["video",""],["ltr","",1,"message","ai"],[1,"camera-button"],["queryParamsHandling","preserve",1,"close",3,"routerLink"],["xmlns","http://www.w3.org/2000/svg","width","33","height","32","viewBox","0 0 33 32","fill","none"],["d","M9.4086 8.00799C10.1897 7.22694 11.456 7.22694 12.237 8.00799L17.4167 13.1877L22.5957 8.00868L22.7483 7.87127C23.5339 7.23087 24.692 7.27656 25.4242 8.00868C26.1561 8.74081 26.2019 9.89903 25.5616 10.6845L25.4242 10.8371L20.2452 16.0161L25.4242 21.1951L25.5616 21.3477C26.2019 22.1333 26.1563 23.2914 25.4242 24.0235C24.692 24.7555 23.5338 24.8013 22.7483 24.161L22.5957 24.0235L17.4167 18.8445L12.237 24.0242C11.456 24.8049 10.1896 24.805 9.4086 24.0242C8.62767 23.2433 8.62789 21.9769 9.4086 21.1958L14.5883 16.0161L9.4086 10.8364C8.62761 10.0554 8.62773 8.78905 9.4086 8.00799Z","fill","white"],[1,"action"],["autoplay","","playsinline","","muted","","volume","0",3,"loadeddata"],["xmlns","http://www.w3.org/2000/svg","preserveAspectRatio","false",1,"overlay-svg"],["id","mask"],["x","0","y","0","width","100%","height","100%","fill","white"],["fill","#000","stroke","white","stroke-width","4"],["stroke-width","4","r","12","fill","white","stroke","white"],["mask","url(#mask)",1,"overlay"],["x","0","y","0","width","100%","height","100%"],["stroke-width","4"],["stroke-width","4","r","12"],[1,"camera-button",3,"click"]],template:function(n,i){if(n&1){let o=Dt();Nt(0,Pg,2,1,"div",2)(1,Cg,1,0,"div",3),D(2,"a",4),Ot(),D(3,"svg",5),Y(4,"path",6),G()(),Gt(),D(5,"div",7),Y(6,"canvas",null,0),D(8,"video",8,1),St("loadeddata",function(){return Tt(o),wt(i.playing());}),G(),Ot(),D(10,"svg",9)(11,"defs")(12,"mask",10),Y(13,"rect",11)(14,"path",12),en(15,xg,1,2,":svg:circle",13,Mn),G()(),D(17,"g",14),Y(18,"rect",15)(19,"path",16),en(20,bg,1,2,":svg:circle",17,Mn),G()()();}n&2&&(kt(i.displayMsg()?0:-1),j(),kt(i.displayCameraButton()?1:-1),j(),dt("routerLink",Jt(6,yg)),j(8),ve("viewBox",i.viewBox()),j(4),ve("d",i.maskPath()),j(),nn(i.points()),j(4),ve("d",i.maskPath()),j(),nn(i.points()));},dependencies:[Ve,on],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(59, 0, 137, 0.5);
}
[_nghost-%COMP%]   .message[_ngcontent-%COMP%] {
  position: absolute;
  top: 4px;
  left: 24px;
  transform: translateY(-300%);
  z-index: 1;
  animation: _ngcontent-%COMP%_showElastic 0.8s linear forwards;
  width: max-content;
  max-width: none;
}
[_nghost-%COMP%]   .message[_ngcontent-%COMP%]   .message-text[_ngcontent-%COMP%] {
  width: max-content;
  white-space: nowrap;
}
[_nghost-%COMP%]   .camera-button[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 66px;
  height: 66px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/button-camera-XMAZB2RA.svg");
  background-size: 66px;
}
[_nghost-%COMP%]   .close[_ngcontent-%COMP%] {
  position: absolute;
  top: 12px;
  right: 24px;
  z-index: 1;
}
[_nghost-%COMP%]   .action[_ngcontent-%COMP%] {
  position: relative;
  flex: 1 1 auto;
}
[_nghost-%COMP%]   .action[_ngcontent-%COMP%]   video[_ngcontent-%COMP%], 
[_nghost-%COMP%]   .action[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%], 
[_nghost-%COMP%]   .action[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
}
[_nghost-%COMP%]   .action[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {
  fill: rgba(59, 0, 137, 0.5);
}
[_nghost-%COMP%]   .action[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {
  stroke: #B969FF;
  fill: white;
}
[_nghost-%COMP%]   .action[_ngcontent-%COMP%]   .overlay[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {
  fill: #000;
  stroke: #B969FF;
}
@keyframes _ngcontent-%COMP%_showElastic {
  0% {
    transform: translateY(-300%);
  }
  16% {
    transform: translateY(96.81%);
  }
  28% {
    transform: translateY(-39.36%);
  }
  44% {
    transform: translateY(13.89%);
  }
  59% {
    transform: translateY(-4.92%);
  }
  73% {
    transform: translateY(1.73%);
  }
  88% {
    transform: translateY(-0.6%);
  }
  100% {
    transform: translateY(0);
  }
}`]});};var Eg=()=>["/scan"],rs=class t{constructor(e,n,i,o){this.state=e;this.router=n;this.api=i;this.route=o;this.api.updateFromRoute(this.route.snapshot),this.state.currentImageUrl()||this.router.navigate(["/scan"],{queryParamsHandling:"preserve"});}upload(){let e=this.state.currentImage();e?this.api.createItem({}).subscribe(n=>{let i={"item-id":n.item_id,key:n.item_key};this.api.uploadImage(e,n.item_id,n.item_key),this.router.navigate(["/props"],{queryParams:i,queryParamsHandling:"merge"});}):this.router.navigate(["/scan"],{queryParamsHandling:"preserve"});}static ɵfac=function(n){return new(n||t)(et(ae),et(xe),et(Ht),et(me));};static ɵcmp=_t({type:t,selectors:[["app-confirm"]],decls:15,vars:3,consts:()=>{let e;e="Opnieuw scannen";let n;return n="Ziet er goed uit",[e,n,[1,"img"],[1,"inner"],["alt","Confirmation Image",3,"src"],["ltr","",1,"confirm-buttons"],["queryParamsHandling","merge",1,"again",3,"routerLink"],["xmlns","http://www.w3.org/2000/svg","width","24","height","25","viewBox","0 0 24 25","fill","none"],["d","M11 18.5H14.75C16.1424 18.5 17.4777 17.9469 18.4623 16.9623C19.4469 15.9777 20 14.6424 20 13.25C20 11.8576 19.4469 10.5223 18.4623 9.53769C17.4777 8.55312 16.1424 8 14.75 8H5M7.5 4.5L4 8L7.5 11.5","stroke","#EDECEC","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],[1,"confirm",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","25","height","25","viewBox","0 0 25 25","fill","none"],["d","M5.5 15.5V17.5C5.5 18.0304 5.71071 18.5391 6.08579 18.9142C6.46086 19.2893 6.96957 19.5 7.5 19.5H17.5C18.0304 19.5 18.5391 19.2893 18.9142 18.9142C19.2893 18.5391 19.5 18.0304 19.5 17.5V15.5","stroke","#4E02B2","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M12.5 14.4844L12.5 5.98437M12.5 5.98437L9.5 8.98437M12.5 5.98437L15.5 8.98438","stroke","#4E02B2","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"]];},template:function(n,i){n&1&&(D(0,"div",2)(1,"div",3),Y(2,"img",4),G()(),D(3,"div",5)(4,"a",6),Ot(),D(5,"svg",7),Y(6,"path",8),G(),Gt(),D(7,"span"),ct(8,0),G()(),D(9,"a",9),St("click",function(){return i.upload();}),Ot(),D(10,"svg",10),Y(11,"path",11)(12,"path",12),G(),Gt(),D(13,"span"),ct(14,1),G()()()),n&2&&(j(2),dt("src",i.state.currentImageUrl(),De),j(2),dt("routerLink",Jt(2,Eg)));},dependencies:[on,Ve],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #301A4E;
}
[_nghost-%COMP%]   .img[_ngcontent-%COMP%] {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 77px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
}
[_nghost-%COMP%]   .img[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
}
[_nghost-%COMP%]   .img[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
}
[_nghost-%COMP%]   .confirm-buttons[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  padding: 12px 16px;
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  justify-content: center;
  border-top: 1px solid #B969FF;
}
[_nghost-%COMP%]   .confirm-buttons[_ngcontent-%COMP%]   .again[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  color: #EDECEC;
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
  font-weight: 400;
  text-decoration: none;
}
[_nghost-%COMP%]   .confirm-buttons[_ngcontent-%COMP%]   .again[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}
[_nghost-%COMP%]   .confirm-buttons[_ngcontent-%COMP%]   .confirm[_ngcontent-%COMP%] {
  height: 52px;
  width: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 16px;
  border-radius: 16px;
  background: #FFFDF6;
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
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
}
[_nghost-%COMP%]   .confirm-buttons[_ngcontent-%COMP%]   .confirm[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
}`]});};function Rp(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1};}var ki=Rp();function Sg(t){ki=t;}var Fp=/[&<>"']/,Mg=new RegExp(Fp.source,"g"),Np=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Tg=new RegExp(Np.source,"g"),wg={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wp=t=>wg[t];function Se(t,e){if(e){if(Fp.test(t))return t.replace(Mg,wp);}else if(Np.test(t))return t.replace(Tg,wp);return t;}var Og=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function Bp(t){return t.replace(Og,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""));}var kg=/(^|[^\[])\^/g;function Vt(t,e){t=typeof t=="string"?t:t.source,e=e||"";let n={replace:(i,o)=>(o=o.source||o,o=o.replace(kg,"$1"),t=t.replace(i,o),n),getRegex:()=>new RegExp(t,e)};return n;}var Ag=/[^\w:]/g,Ig=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function Op(t,e,n){if(t){let i;try{i=decodeURIComponent(Bp(n)).replace(Ag,"").toLowerCase();}catch{return null;}if(i.indexOf("javascript:")===0||i.indexOf("vbscript:")===0||i.indexOf("data:")===0)return null;}e&&!Ig.test(n)&&(n=Ng(e,n));try{n=encodeURI(n).replace(/%25/g,"%");}catch{return null;}return n;}var os={},Lg=/^[^:]+:\/*[^/]*$/,Rg=/^([^:]+:)[\s\S]*$/,Fg=/^([^:]+:\/*[^/]*)[\s\S]*$/;function Ng(t,e){os[" "+t]||(Lg.test(t)?os[" "+t]=t+"/":os[" "+t]=ss(t,"/",!0)),t=os[" "+t];let n=t.indexOf(":")===-1;return e.substring(0,2)==="//"?n?e:t.replace(Rg,"$1")+e:e.charAt(0)==="/"?n?e:t.replace(Fg,"$1")+e:t+e;}var as={exec:function(){}};function kp(t,e){let n=t.replace(/\|/g,(s,l,h)=>{let p=!1,u=l;for(;--u>=0&&h[u]==="\\";)p=!p;return p?"|":" |";}),i=n.split(/ \|/),o=0;if(i[0].trim()||i.shift(),i.length>0&&!i[i.length-1].trim()&&i.pop(),i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;o<i.length;o++)i[o]=i[o].trim().replace(/\\\|/g,"|");return i;}function ss(t,e,n){let i=t.length;if(i===0)return"";let o=0;for(;o<i;){let s=t.charAt(i-o-1);if(s===e&&!n)o++;else if(s!==e&&n)o++;else break;}return t.slice(0,i-o);}function Bg(t,e){if(t.indexOf(e[1])===-1)return-1;let n=t.length,i=0,o=0;for(;o<n;o++)if(t[o]==="\\")o++;else if(t[o]===e[0])i++;else if(t[o]===e[1]&&(i--,i<0))return o;return-1;}function Dg(t){t&&t.sanitize&&!t.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");}function Ap(t,e){if(e<1)return"";let n="";for(;e>1;)e&1&&(n+=t),e>>=1,t+=t;return n+t;}function Ip(t,e,n,i){let o=e.href,s=e.title?Se(e.title):null,l=t[1].replace(/\\([\[\]])/g,"$1");if(t[0].charAt(0)!=="!"){i.state.inLink=!0;let h={type:"link",raw:n,href:o,title:s,text:l,tokens:i.inlineTokens(l)};return i.state.inLink=!1,h;}return{type:"image",raw:n,href:o,title:s,text:Se(l)};}function zg(t,e){let n=t.match(/^(\s+)(?:```)/);if(n===null)return e;let i=n[1];return e.split(`
`).map(o=>{let s=o.match(/^\s+/);if(s===null)return o;let[l]=s;return l.length>=i.length?o.slice(i.length):o;}).join(`
`);}var jr=class{constructor(e){this.options=e||ki;}space(e){let n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]};}code(e){let n=this.rules.block.code.exec(e);if(n){let i=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?i:ss(i,`
`)};}}fences(e){let n=this.rules.block.fences.exec(e);if(n){let i=n[0],o=zg(i,n[3]||"");return{type:"code",raw:i,lang:n[2]?n[2].trim().replace(this.rules.inline._escapes,"$1"):n[2],text:o};}}heading(e){let n=this.rules.block.heading.exec(e);if(n){let i=n[2].trim();if(/#$/.test(i)){let o=ss(i,"#");(this.options.pedantic||!o||/ $/.test(o))&&(i=o.trim());}return{type:"heading",raw:n[0],depth:n[1].length,text:i,tokens:this.lexer.inline(i)};}}hr(e){let n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]};}blockquote(e){let n=this.rules.block.blockquote.exec(e);if(n){let i=n[0].replace(/^ *>[ \t]?/gm,""),o=this.lexer.state.top;this.lexer.state.top=!0;let s=this.lexer.blockTokens(i);return this.lexer.state.top=o,{type:"blockquote",raw:n[0],tokens:s,text:i};}}list(e){let n=this.rules.block.list.exec(e);if(n){let i,o,s,l,h,p,u,m,b,d,g,E,P=n[1].trim(),k=P.length>1,v={type:"list",raw:"",ordered:k,start:k?+P.slice(0,-1):"",loose:!1,items:[]};P=k?`\\d{1,9}\\${P.slice(-1)}`:`\\${P}`,this.options.pedantic&&(P=k?P:"[*+-]");let C=new RegExp(`^( {0,3}${P})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(E=!1,!(!(n=C.exec(e))||this.rules.block.hr.test(e)));){if(i=n[0],e=e.substring(i.length),m=n[2].split(`
`,1)[0].replace(/^\t+/,S=>" ".repeat(3*S.length)),b=e.split(`
`,1)[0],this.options.pedantic?(l=2,g=m.trimLeft()):(l=n[2].search(/[^ ]/),l=l>4?1:l,g=m.slice(l),l+=n[1].length),p=!1,!m&&/^ *$/.test(b)&&(i+=b+`
`,e=e.substring(b.length+1),E=!0),!E){let S=new RegExp(`^ {0,${Math.min(3,l-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),O=new RegExp(`^ {0,${Math.min(3,l-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),A=new RegExp(`^ {0,${Math.min(3,l-1)}}(?:\`\`\`|~~~)`),R=new RegExp(`^ {0,${Math.min(3,l-1)}}#`);for(;e&&(d=e.split(`
`,1)[0],b=d,this.options.pedantic&&(b=b.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(A.test(b)||R.test(b)||S.test(b)||O.test(e)));){if(b.search(/[^ ]/)>=l||!b.trim())g+=`
`+b.slice(l);else{if(p||m.search(/[^ ]/)>=4||A.test(m)||R.test(m)||O.test(m))break;g+=`
`+b;}!p&&!b.trim()&&(p=!0),i+=d+`
`,e=e.substring(d.length+1),m=b.slice(l);}}v.loose||(u?v.loose=!0:/\n *\n *$/.test(i)&&(u=!0)),this.options.gfm&&(o=/^\[[ xX]\] /.exec(g),o&&(s=o[0]!=="[ ] ",g=g.replace(/^\[[ xX]\] +/,""))),v.items.push({type:"list_item",raw:i,task:!!o,checked:s,loose:!1,text:g}),v.raw+=i;}v.items[v.items.length-1].raw=i.trimRight(),v.items[v.items.length-1].text=g.trimRight(),v.raw=v.raw.trimRight();let y=v.items.length;for(h=0;h<y;h++)if(this.lexer.state.top=!1,v.items[h].tokens=this.lexer.blockTokens(v.items[h].text,[]),!v.loose){let S=v.items[h].tokens.filter(A=>A.type==="space"),O=S.length>0&&S.some(A=>/\n.*\n/.test(A.raw));v.loose=O;}if(v.loose)for(h=0;h<y;h++)v.items[h].loose=!0;return v;}}html(e){let n=this.rules.block.html.exec(e);if(n){let i={type:"html",raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};if(this.options.sanitize){let o=this.options.sanitizer?this.options.sanitizer(n[0]):Se(n[0]);i.type="paragraph",i.text=o,i.tokens=this.lexer.inline(o);}return i;}}def(e){let n=this.rules.block.def.exec(e);if(n){let i=n[1].toLowerCase().replace(/\s+/g," "),o=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",s=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline._escapes,"$1"):n[3];return{type:"def",tag:i,raw:n[0],href:o,title:s};}}table(e){let n=this.rules.block.table.exec(e);if(n){let i={type:"table",header:kp(n[1]).map(o=>({text:o})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(i.header.length===i.align.length){i.raw=n[0];let o=i.align.length,s,l,h,p;for(s=0;s<o;s++)/^ *-+: *$/.test(i.align[s])?i.align[s]="right":/^ *:-+: *$/.test(i.align[s])?i.align[s]="center":/^ *:-+ *$/.test(i.align[s])?i.align[s]="left":i.align[s]=null;for(o=i.rows.length,s=0;s<o;s++)i.rows[s]=kp(i.rows[s],i.header.length).map(u=>({text:u}));for(o=i.header.length,l=0;l<o;l++)i.header[l].tokens=this.lexer.inline(i.header[l].text);for(o=i.rows.length,l=0;l<o;l++)for(p=i.rows[l],h=0;h<p.length;h++)p[h].tokens=this.lexer.inline(p[h].text);return i;}}}lheading(e){let n=this.rules.block.lheading.exec(e);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])};}paragraph(e){let n=this.rules.block.paragraph.exec(e);if(n){let i=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:i,tokens:this.lexer.inline(i)};}}text(e){let n=this.rules.block.text.exec(e);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])};}escape(e){let n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:Se(n[1])};}tag(e){let n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):Se(n[0]):n[0]};}link(e){let n=this.rules.inline.link.exec(e);if(n){let i=n[2].trim();if(!this.options.pedantic&&/^</.test(i)){if(!/>$/.test(i))return;let l=ss(i.slice(0,-1),"\\");if((i.length-l.length)%2===0)return;}else{let l=Bg(n[2],"()");if(l>-1){let p=(n[0].indexOf("!")===0?5:4)+n[1].length+l;n[2]=n[2].substring(0,l),n[0]=n[0].substring(0,p).trim(),n[3]="";}}let o=n[2],s="";if(this.options.pedantic){let l=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);l&&(o=l[1],s=l[3]);}else s=n[3]?n[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(i)?o=o.slice(1):o=o.slice(1,-1)),Ip(n,{href:o&&o.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer);}}reflink(e,n){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){let o=(i[2]||i[1]).replace(/\s+/g," ");if(o=n[o.toLowerCase()],!o){let s=i[0].charAt(0);return{type:"text",raw:s,text:s};}return Ip(i,o,i[0],this.lexer);}}emStrong(e,n,i=""){let o=this.rules.inline.emStrong.lDelim.exec(e);if(!o||o[3]&&i.match(/[\p{L}\p{N}]/u))return;let s=o[1]||o[2]||"";if(!s||s&&(i===""||this.rules.inline.punctuation.exec(i))){let l=o[0].length-1,h,p,u=l,m=0,b=o[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(b.lastIndex=0,n=n.slice(-1*e.length+l);(o=b.exec(n))!=null;){if(h=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!h)continue;if(p=h.length,o[3]||o[4]){u+=p;continue;}else if((o[5]||o[6])&&l%3&&!((l+p)%3)){m+=p;continue;}if(u-=p,u>0)continue;p=Math.min(p,p+u+m);let d=e.slice(0,l+o.index+(o[0].length-h.length)+p);if(Math.min(l,p)%2){let E=d.slice(1,-1);return{type:"em",raw:d,text:E,tokens:this.lexer.inlineTokens(E)};}let g=d.slice(2,-2);return{type:"strong",raw:d,text:g,tokens:this.lexer.inlineTokens(g)};}}}codespan(e){let n=this.rules.inline.code.exec(e);if(n){let i=n[2].replace(/\n/g," "),o=/[^ ]/.test(i),s=/^ /.test(i)&&/ $/.test(i);return o&&s&&(i=i.substring(1,i.length-1)),i=Se(i,!0),{type:"codespan",raw:n[0],text:i};}}br(e){let n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]};}del(e){let n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])};}autolink(e,n){let i=this.rules.inline.autolink.exec(e);if(i){let o,s;return i[2]==="@"?(o=Se(this.options.mangle?n(i[1]):i[1]),s="mailto:"+o):(o=Se(i[1]),s=o),{type:"link",raw:i[0],text:o,href:s,tokens:[{type:"text",raw:o,text:o}]};}}url(e,n){let i;if(i=this.rules.inline.url.exec(e)){let o,s;if(i[2]==="@")o=Se(this.options.mangle?n(i[0]):i[0]),s="mailto:"+o;else{let l;do l=i[0],i[0]=this.rules.inline._backpedal.exec(i[0])[0];while(l!==i[0]);o=Se(i[0]),i[1]==="www."?s="http://"+i[0]:s=i[0];}return{type:"link",raw:i[0],text:o,href:s,tokens:[{type:"text",raw:o,text:o}]};}}inlineText(e,n){let i=this.rules.inline.text.exec(e);if(i){let o;return this.lexer.state.inRawBlock?o=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):Se(i[0]):i[0]:o=Se(this.options.smartypants?n(i[0]):i[0]),{type:"text",raw:i[0],text:o};}}},ft={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:as,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};ft._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;ft._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;ft.def=Vt(ft.def).replace("label",ft._label).replace("title",ft._title).getRegex();ft.bullet=/(?:[*+-]|\d{1,9}[.)])/;ft.listItemStart=Vt(/^( *)(bull) */).replace("bull",ft.bullet).getRegex();ft.list=Vt(ft.list).replace(/bull/g,ft.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+ft.def.source+")").getRegex();ft._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";ft._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;ft.html=Vt(ft.html,"i").replace("comment",ft._comment).replace("tag",ft._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();ft.paragraph=Vt(ft._paragraph).replace("hr",ft.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ft._tag).getRegex();ft.blockquote=Vt(ft.blockquote).replace("paragraph",ft.paragraph).getRegex();ft.normal=$({},ft);ft.gfm=vt($({},ft.normal),{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"});ft.gfm.table=Vt(ft.gfm.table).replace("hr",ft.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ft._tag).getRegex();ft.gfm.paragraph=Vt(ft._paragraph).replace("hr",ft.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",ft.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ft._tag).getRegex();ft.pedantic=vt($({},ft.normal),{html:Vt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ft._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:as,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Vt(ft.normal._paragraph).replace("hr",ft.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ft.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});var st={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:as,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:as,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};st._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";st.punctuation=Vt(st.punctuation).replace(/punctuation/g,st._punctuation).getRegex();st.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;st.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g;st._comment=Vt(ft._comment).replace("(?:-->|$)","-->").getRegex();st.emStrong.lDelim=Vt(st.emStrong.lDelim).replace(/punct/g,st._punctuation).getRegex();st.emStrong.rDelimAst=Vt(st.emStrong.rDelimAst,"g").replace(/punct/g,st._punctuation).getRegex();st.emStrong.rDelimUnd=Vt(st.emStrong.rDelimUnd,"g").replace(/punct/g,st._punctuation).getRegex();st._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;st._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;st._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;st.autolink=Vt(st.autolink).replace("scheme",st._scheme).replace("email",st._email).getRegex();st._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;st.tag=Vt(st.tag).replace("comment",st._comment).replace("attribute",st._attribute).getRegex();st._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;st._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;st._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;st.link=Vt(st.link).replace("label",st._label).replace("href",st._href).replace("title",st._title).getRegex();st.reflink=Vt(st.reflink).replace("label",st._label).replace("ref",ft._label).getRegex();st.nolink=Vt(st.nolink).replace("ref",ft._label).getRegex();st.reflinkSearch=Vt(st.reflinkSearch,"g").replace("reflink",st.reflink).replace("nolink",st.nolink).getRegex();st.normal=$({},st);st.pedantic=vt($({},st.normal),{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:Vt(/^!?\[(label)\]\((.*?)\)/).replace("label",st._label).getRegex(),reflink:Vt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",st._label).getRegex()});st.gfm=vt($({},st.normal),{escape:Vt(st.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/});st.gfm.url=Vt(st.gfm.url,"i").replace("email",st.gfm._extended_email).getRegex();st.breaks=vt($({},st.gfm),{br:Vt(st.br).replace("{2,}","*").getRegex(),text:Vt(st.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});function Vg(t){return t.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026");}function Lp(t){let e="",n,i,o=t.length;for(n=0;n<o;n++)i=t.charCodeAt(n),Math.random()>.5&&(i="x"+i.toString(16)),e+="&#"+i+";";return e;}var wi=class t{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ki,this.options.tokenizer=this.options.tokenizer||new jr(),this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={block:ft.normal,inline:st.normal};this.options.pedantic?(n.block=ft.pedantic,n.inline=st.pedantic):this.options.gfm&&(n.block=ft.gfm,this.options.breaks?n.inline=st.breaks:n.inline=st.gfm),this.tokenizer.rules=n;}static get rules(){return{block:ft,inline:st};}static lex(e,n){return new t(n).lex(e);}static lexInline(e,n){return new t(n).inlineTokens(e);}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens;}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(h,p,u)=>p+"    ".repeat(u.length));let i,o,s,l;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(h=>(i=h.call({lexer:this},e,n))?(e=e.substring(i.raw.length),n.push(i),!0):!1))){if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length),i.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(i);continue;}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length),o=n[n.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+i.raw,o.text+=`
`+i.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):n.push(i);continue;}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length),o=n[n.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+i.raw,o.text+=`
`+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title});continue;}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(s=e,this.options.extensions&&this.options.extensions.startBlock){let h=1/0,p=e.slice(1),u;this.options.extensions.startBlock.forEach(function(m){u=m.call({lexer:this},p),typeof u=="number"&&u>=0&&(h=Math.min(h,u));}),h<1/0&&h>=0&&(s=e.substring(0,h+1));}if(this.state.top&&(i=this.tokenizer.paragraph(s))){o=n[n.length-1],l&&o.type==="paragraph"?(o.raw+=`
`+i.raw,o.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):n.push(i),l=s.length!==e.length,e=e.substring(i.raw.length);continue;}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length),o=n[n.length-1],o&&o.type==="text"?(o.raw+=`
`+i.raw,o.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):n.push(i);continue;}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break;}else throw new Error(h);}}return this.state.top=!0,n;}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n;}inlineTokens(e,n=[]){let i,o,s,l=e,h,p,u;if(this.tokens.links){let m=Object.keys(this.tokens.links);if(m.length>0)for(;(h=this.tokenizer.rules.inline.reflinkSearch.exec(l))!=null;)m.includes(h[0].slice(h[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,h.index)+"["+Ap("a",h[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));}for(;(h=this.tokenizer.rules.inline.blockSkip.exec(l))!=null;)l=l.slice(0,h.index)+"["+Ap("a",h[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(h=this.tokenizer.rules.inline.escapedEmSt.exec(l))!=null;)l=l.slice(0,h.index+h[0].length-2)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;e;)if(p||(u=""),p=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(m=>(i=m.call({lexer:this},e,n))?(e=e.substring(i.raw.length),n.push(i),!0):!1))){if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),o=n[n.length-1],o&&i.type==="text"&&o.type==="text"?(o.raw+=i.raw,o.text+=i.text):n.push(i);continue;}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length),o=n[n.length-1],o&&i.type==="text"&&o.type==="text"?(o.raw+=i.raw,o.text+=i.text):n.push(i);continue;}if(i=this.tokenizer.emStrong(e,l,u)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),n.push(i);continue;}if(i=this.tokenizer.autolink(e,Lp)){e=e.substring(i.raw.length),n.push(i);continue;}if(!this.state.inLink&&(i=this.tokenizer.url(e,Lp))){e=e.substring(i.raw.length),n.push(i);continue;}if(s=e,this.options.extensions&&this.options.extensions.startInline){let m=1/0,b=e.slice(1),d;this.options.extensions.startInline.forEach(function(g){d=g.call({lexer:this},b),typeof d=="number"&&d>=0&&(m=Math.min(m,d));}),m<1/0&&m>=0&&(s=e.substring(0,m+1));}if(i=this.tokenizer.inlineText(s,Vg)){e=e.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(u=i.raw.slice(-1)),p=!0,o=n[n.length-1],o&&o.type==="text"?(o.raw+=i.raw,o.text+=i.text):n.push(i);continue;}if(e){let m="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(m);break;}else throw new Error(m);}}return n;}},Zr=class{constructor(e){this.options=e||ki;}code(e,n,i){let o=(n||"").match(/\S*/)[0];if(this.options.highlight){let s=this.options.highlight(e,o);s!=null&&s!==e&&(i=!0,e=s);}return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="'+this.options.langPrefix+Se(o)+'">'+(i?e:Se(e,!0))+`</code></pre>
`:"<pre><code>"+(i?e:Se(e,!0))+`</code></pre>
`;}blockquote(e){return`<blockquote>
${e}</blockquote>
`;}html(e){return e;}heading(e,n,i,o){if(this.options.headerIds){let s=this.options.headerPrefix+o.slug(i);return`<h${n} id="${s}">${e}</h${n}>
`;}return`<h${n}>${e}</h${n}>
`;}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`;}list(e,n,i){let o=n?"ol":"ul",s=n&&i!==1?' start="'+i+'"':"";return"<"+o+s+`>
`+e+"</"+o+`>
`;}listitem(e){return`<li>${e}</li>
`;}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> ";}paragraph(e){return`<p>${e}</p>
`;}table(e,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`;}tablerow(e){return`<tr>
${e}</tr>
`;}tablecell(e,n){let i=n.header?"th":"td";return(n.align?`<${i} align="${n.align}">`:`<${i}>`)+e+`</${i}>
`;}strong(e){return`<strong>${e}</strong>`;}em(e){return`<em>${e}</em>`;}codespan(e){return`<code>${e}</code>`;}br(){return this.options.xhtml?"<br/>":"<br>";}del(e){return`<del>${e}</del>`;}link(e,n,i){if(e=Op(this.options.sanitize,this.options.baseUrl,e),e===null)return i;let o='<a href="'+e+'"';return n&&(o+=' title="'+n+'"'),o+=">"+i+"</a>",o;}image(e,n,i){if(e=Op(this.options.sanitize,this.options.baseUrl,e),e===null)return i;let o=`<img src="${e}" alt="${i}"`;return n&&(o+=` title="${n}"`),o+=this.options.xhtml?"/>":">",o;}text(e){return e;}},ls=class{strong(e){return e;}em(e){return e;}codespan(e){return e;}del(e){return e;}html(e){return e;}text(e){return e;}link(e,n,i){return""+i;}image(e,n,i){return""+i;}br(){return"";}},cs=class{constructor(){this.seen={};}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");}getNextSafeSlug(e,n){let i=e,o=0;if(this.seen.hasOwnProperty(i)){o=this.seen[e];do o++,i=e+"-"+o;while(this.seen.hasOwnProperty(i));}return n||(this.seen[e]=o,this.seen[i]=0),i;}slug(e,n={}){let i=this.serialize(e);return this.getNextSafeSlug(i,n.dryrun);}},Oi=class t{constructor(e){this.options=e||ki,this.options.renderer=this.options.renderer||new Zr(),this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new ls(),this.slugger=new cs();}static parse(e,n){return new t(n).parse(e);}static parseInline(e,n){return new t(n).parseInline(e);}parse(e,n=!0){let i="",o,s,l,h,p,u,m,b,d,g,E,P,k,v,C,y,S,O,A,R=e.length;for(o=0;o<R;o++){if(g=e[o],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[g.type]&&(A=this.options.extensions.renderers[g.type].call({parser:this},g),A!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(g.type))){i+=A||"";continue;}switch(g.type){case"space":continue;case"hr":{i+=this.renderer.hr();continue;}case"heading":{i+=this.renderer.heading(this.parseInline(g.tokens),g.depth,Bp(this.parseInline(g.tokens,this.textRenderer)),this.slugger);continue;}case"code":{i+=this.renderer.code(g.text,g.lang,g.escaped);continue;}case"table":{for(b="",m="",h=g.header.length,s=0;s<h;s++)m+=this.renderer.tablecell(this.parseInline(g.header[s].tokens),{header:!0,align:g.align[s]});for(b+=this.renderer.tablerow(m),d="",h=g.rows.length,s=0;s<h;s++){for(u=g.rows[s],m="",p=u.length,l=0;l<p;l++)m+=this.renderer.tablecell(this.parseInline(u[l].tokens),{header:!1,align:g.align[l]});d+=this.renderer.tablerow(m);}i+=this.renderer.table(b,d);continue;}case"blockquote":{d=this.parse(g.tokens),i+=this.renderer.blockquote(d);continue;}case"list":{for(E=g.ordered,P=g.start,k=g.loose,h=g.items.length,d="",s=0;s<h;s++)C=g.items[s],y=C.checked,S=C.task,v="",C.task&&(O=this.renderer.checkbox(y),k?C.tokens.length>0&&C.tokens[0].type==="paragraph"?(C.tokens[0].text=O+" "+C.tokens[0].text,C.tokens[0].tokens&&C.tokens[0].tokens.length>0&&C.tokens[0].tokens[0].type==="text"&&(C.tokens[0].tokens[0].text=O+" "+C.tokens[0].tokens[0].text)):C.tokens.unshift({type:"text",text:O}):v+=O),v+=this.parse(C.tokens,k),d+=this.renderer.listitem(v,S,y);i+=this.renderer.list(d,E,P);continue;}case"html":{i+=this.renderer.html(g.text);continue;}case"paragraph":{i+=this.renderer.paragraph(this.parseInline(g.tokens));continue;}case"text":{for(d=g.tokens?this.parseInline(g.tokens):g.text;o+1<R&&e[o+1].type==="text";)g=e[++o],d+=`
`+(g.tokens?this.parseInline(g.tokens):g.text);i+=n?this.renderer.paragraph(d):d;continue;}default:{let N='Token with "'+g.type+'" type was not found.';if(this.options.silent){console.error(N);return;}else throw new Error(N);}}}return i;}parseInline(e,n){n=n||this.renderer;let i="",o,s,l,h=e.length;for(o=0;o<h;o++){if(s=e[o],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]&&(l=this.options.extensions.renderers[s.type].call({parser:this},s),l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type))){i+=l||"";continue;}switch(s.type){case"escape":{i+=n.text(s.text);break;}case"html":{i+=n.html(s.text);break;}case"link":{i+=n.link(s.href,s.title,this.parseInline(s.tokens,n));break;}case"image":{i+=n.image(s.href,s.title,s.text);break;}case"strong":{i+=n.strong(this.parseInline(s.tokens,n));break;}case"em":{i+=n.em(this.parseInline(s.tokens,n));break;}case"codespan":{i+=n.codespan(s.text);break;}case"br":{i+=n.br();break;}case"del":{i+=n.del(this.parseInline(s.tokens,n));break;}case"text":{i+=n.text(s.text);break;}default:{let p='Token with "'+s.type+'" type was not found.';if(this.options.silent){console.error(p);return;}else throw new Error(p);}}}return i;}},Wr=class{constructor(e){this.options=e||ki;}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(e){return e;}postprocess(e){return e;}};function $g(t,e,n){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let o="<p>An error occurred:</p><pre>"+Se(i.message+"",!0)+"</pre>";if(e)return Promise.resolve(o);if(n){n(null,o);return;}return o;}if(e)return Promise.reject(i);if(n){n(i);return;}throw i;};}function Dp(t,e){return(n,i,o)=>{typeof i=="function"&&(o=i,i=null);let s=$({},i);i=$($({},ht.defaults),s);let l=$g(i.silent,i.async,o);if(typeof n>"u"||n===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(Dg(i),i.hooks&&(i.hooks.options=i),o){let h=i.highlight,p;try{i.hooks&&(n=i.hooks.preprocess(n)),p=t(n,i);}catch(b){return l(b);}let u=function(b){let d;if(!b)try{i.walkTokens&&ht.walkTokens(p,i.walkTokens),d=e(p,i),i.hooks&&(d=i.hooks.postprocess(d));}catch(g){b=g;}return i.highlight=h,b?l(b):o(null,d);};if(!h||h.length<3||(delete i.highlight,!p.length))return u();let m=0;ht.walkTokens(p,function(b){b.type==="code"&&(m++,setTimeout(()=>{h(b.text,b.lang,function(d,g){if(d)return u(d);g!=null&&g!==b.text&&(b.text=g,b.escaped=!0),m--,m===0&&u();});},0));}),m===0&&u();return;}if(i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then(h=>t(h,i)).then(h=>i.walkTokens?Promise.all(ht.walkTokens(h,i.walkTokens)).then(()=>h):h).then(h=>e(h,i)).then(h=>i.hooks?i.hooks.postprocess(h):h).catch(l);try{i.hooks&&(n=i.hooks.preprocess(n));let h=t(n,i);i.walkTokens&&ht.walkTokens(h,i.walkTokens);let p=e(h,i);return i.hooks&&(p=i.hooks.postprocess(p)),p;}catch(h){return l(h);}};}function ht(t,e,n){return Dp(wi.lex,Oi.parse)(t,e,n);}ht.options=ht.setOptions=function(t){return ht.defaults=$($({},ht.defaults),t),Sg(ht.defaults),ht;};ht.getDefaults=Rp;ht.defaults=ki;ht.use=function(...t){let e=ht.defaults.extensions||{renderers:{},childTokens:{}};t.forEach(n=>{let i=$({},n);if(i.async=ht.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if(o.renderer){let s=e.renderers[o.name];s?e.renderers[o.name]=function(...l){let h=o.renderer.apply(this,l);return h===!1&&(h=s.apply(this,l)),h;}:e.renderers[o.name]=o.renderer;}if(o.tokenizer){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");e[o.level]?e[o.level].unshift(o.tokenizer):e[o.level]=[o.tokenizer],o.start&&(o.level==="block"?e.startBlock?e.startBlock.push(o.start):e.startBlock=[o.start]:o.level==="inline"&&(e.startInline?e.startInline.push(o.start):e.startInline=[o.start]));}o.childTokens&&(e.childTokens[o.name]=o.childTokens);}),i.extensions=e),n.renderer){let o=ht.defaults.renderer||new Zr();for(let s in n.renderer){let l=o[s];o[s]=(...h)=>{let p=n.renderer[s].apply(o,h);return p===!1&&(p=l.apply(o,h)),p;};}i.renderer=o;}if(n.tokenizer){let o=ht.defaults.tokenizer||new jr();for(let s in n.tokenizer){let l=o[s];o[s]=(...h)=>{let p=n.tokenizer[s].apply(o,h);return p===!1&&(p=l.apply(o,h)),p;};}i.tokenizer=o;}if(n.hooks){let o=ht.defaults.hooks||new Wr();for(let s in n.hooks){let l=o[s];Wr.passThroughHooks.has(s)?o[s]=h=>{if(ht.defaults.async)return Promise.resolve(n.hooks[s].call(o,h)).then(u=>l.call(o,u));let p=n.hooks[s].call(o,h);return l.call(o,p);}:o[s]=(...h)=>{let p=n.hooks[s].apply(o,h);return p===!1&&(p=l.apply(o,h)),p;};}i.hooks=o;}if(n.walkTokens){let o=ht.defaults.walkTokens;i.walkTokens=function(s){let l=[];return l.push(n.walkTokens.call(this,s)),o&&(l=l.concat(o.call(this,s))),l;};}ht.setOptions(i);});};ht.walkTokens=function(t,e){let n=[];for(let i of t)switch(n=n.concat(e.call(ht,i)),i.type){case"table":{for(let o of i.header)n=n.concat(ht.walkTokens(o.tokens,e));for(let o of i.rows)for(let s of o)n=n.concat(ht.walkTokens(s.tokens,e));break;}case"list":{n=n.concat(ht.walkTokens(i.items,e));break;}default:ht.defaults.extensions&&ht.defaults.extensions.childTokens&&ht.defaults.extensions.childTokens[i.type]?ht.defaults.extensions.childTokens[i.type].forEach(function(o){n=n.concat(ht.walkTokens(i[o],e));}):i.tokens&&(n=n.concat(ht.walkTokens(i.tokens,e)));}return n;};ht.parseInline=Dp(wi.lexInline,Oi.parseInline);ht.Parser=Oi;ht.parser=Oi.parse;ht.Renderer=Zr;ht.TextRenderer=ls;ht.Lexer=wi;ht.lexer=wi.lex;ht.Tokenizer=jr;ht.Slugger=cs;ht.Hooks=Wr;ht.parse=ht;var WE=ht.options,qE=ht.setOptions,YE=ht.use,XE=ht.walkTokens,JE=ht.parseInline;var KE=Oi.parse,QE=wi.lex;var zp=_c(dl());var Gg=["messagesEl"],Ug=["spacer"],Hg=["thinkingEl"],jg=[[["",8,"message"]],[["",8,"spacer"]]],Zg=[".message",".spacer"];function Wg(t,e){if(t&1&&(D(0,"div",8),Y(1,"span",9),G()),t&2){let n=e.$implicit;yt("human",n.kind==="human")("ai",n.kind==="ai")("part",n.part),j(),dt("innerHTML",n._(),go);}}var Me=class{constructor(e,n,i){this.kind=e;this.text=n;this.part=i;this._text.set(n);}_text=X("");_=It(()=>{let e=this._text();return ht(e);});setText(e){this._text.set(e);}},vn=class t{constructor(e,n){this.platform=e;this.ref=n;this.platform.browser(()=>{se(()=>{let i=this.messages();je(1).subscribe(()=>{this.setScrollParams(i);});}),Cr(window,"resize").pipe(be(),pi(100)).subscribe(()=>{let i=this.messages();this.setScrollParams(i);});}),this.scroller.pipe(pi(100)).subscribe(i=>{i();});}bg=!1;scrollOnAI=!0;paddingTop=16;messages=X([]);thinking=X(!1);messagesEl;spacerEl;scroller=new Be();spacerHeight=X(0);scrollPosition=new Be();loadingAnim;thinkingEl;_=ht;ngAfterViewInit(){this.platform.browser(()=>{this.loadingAnim=zp.default.loadAnimation({container:this.thinkingEl.nativeElement,renderer:"svg",loop:!0,autoplay:!0,path:"/thinking.json"}),Cr(this.messagesEl.nativeElement,"scroll").pipe(be(this.ref),Cc(100,void 0,{leading:!0,trailing:!0})).subscribe(()=>{let e=this.messagesEl.nativeElement;this.scrollPosition.next(e.scrollTop);});});}ngOnDestroy(){this.loadingAnim?.destroy();}clear(){this.messages.update(()=>[]),this.messagesEl.nativeElement.scrollTop=0;}addMessage(e){this.messages.update(n=>[...n,e]);}setScrollParams(e){let n=this.messagesEl.nativeElement;if(n){let i=n.querySelectorAll(".message");if(i.length>0){let o=i[e.length-1];if(!o)return;let s=o.getBoundingClientRect(),l=n.offsetHeight-s.height-8;if(l<1&&(l=1),this.spacerHeight.set(l),o.classList.contains("human")){let p=o.getBoundingClientRect().top;this.scroller.next(()=>{console.log("scrolling last message",o,o.classList),this.messagesEl.nativeElement.scrollBy({top:p-4,behavior:"smooth"});});}else this.scrollOnAI&&this.scroller.next(()=>{console.log("scrolling spacer",o,o.classList),this.spacerEl.nativeElement.scrollIntoView({behavior:"smooth",block:"end"});});}}}static ɵfac=function(n){return new(n||t)(et(jt),et(Xn));};static ɵcmp=_t({type:t,selectors:[["app-messages"]],viewQuery:function(n,i){if(n&1&&(Wt(Gg,5),Wt(Ug,5),Wt(Hg,5)),n&2){let o;qt(o=Yt())&&(i.messagesEl=o.first),qt(o=Yt())&&(i.spacerEl=o.first),qt(o=Yt())&&(i.thinkingEl=o.first);}},inputs:{bg:"bg",scrollOnAI:"scrollOnAI",paddingTop:"paddingTop"},ngContentSelectors:Zg,decls:11,vars:10,consts:[["messagesEl",""],["thinkingEl",""],["spacer",""],[1,"messages"],["ltr","",1,"message",3,"human","ai","part"],[1,"spacer"],[1,"thinking-animation"],[1,"under-spacer"],["ltr","",1,"message"],[1,"message-text",3,"innerHTML"]],template:function(n,i){n&1&&(Tc(jg),D(0,"div",3,0),en(2,Wg,2,7,"div",4,Mn),na(4),D(5,"div",5),Y(6,"div",6,1)(8,"div",7,2),na(10,1),G()()),n&2&&(ye("padding-top",i.paddingTop,"px"),yt("bg",i.bg),j(2),nn(i.messages()),j(3),ye("min-height",i.spacerHeight(),"px"),j(),yt("visible",i.thinking()),j(2),ye("height",i.spacerHeight(),"px"));},dependencies:[Ve],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  display: flex;
  width: 100%;
  height: 100%;
}
[_nghost-%COMP%]   .messages[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  gap: 4px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 16px 32px;
  padding-bottom: 0px;
}
[_nghost-%COMP%]   .messages.bg[_ngcontent-%COMP%] {
  background-color: #F5F0E7;
}
[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {
  height: 0%;
  flex: 0 0 auto;
  position: relative;
  width: calc(100% + 64px);
  left: -32px;
}
[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]   .thinking-animation[_ngcontent-%COMP%] {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  display: inline-block;
  width: 80px;
  height: 45px;
  position: absolute;
  top: 4px;
  left: 32px;
}
[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]   .thinking-animation.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .messages[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%]   .under-spacer[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  pointer-events: none;
}`]});};function qg(t,e){t&1&&(Ot(),D(0,"svg",5),Y(1,"path",6),G());}function Yg(t,e){if(t&1&&(D(0,"a",4),Nt(1,qg,2,0,":svg:svg",5),D(2,"span"),Pe(3),G()()),t&2){let n=e.$implicit;yt("primary",n.primary),dt("href",n.url||null,De),j(),kt(n.primary?1:-1),j(2),ui(n.name);}}var ir=class t{constructor(e,n){this.locale=e;this.platform=n;console.log("Current locale:",e),this.currentLanguageCode.set(e),this.platform.browser(()=>{this.host=location.host;});}LANGUAGES=It(()=>{let e=[{code:"en",name:"English",baseHref:"/"},{code:"nl",name:"Nederlands",baseHref:"/nl/"}],n=e.find(i=>i.code===this.currentLanguageCode());return n&&e.forEach(i=>{i.primary=i.code===n?.code,i.url=this.urlForLanguage(n,i);}),e;});currentLanguageCode=X("");host="mapfuture.es";urlForLanguage(e,n){if(n.code!==e.code)return this.platform.browser()?location.href.replace(`${this.host}${e?.baseHref}`,`${this.host}${n.baseHref}`):n.baseHref;}static ɵfac=function(n){return new(n||t)(et(Gi),et(jt));};static ɵcmp=_t({type:t,selectors:[["app-language-selector"]],decls:5,vars:0,consts:[[1,"container"],[1,"buttons"],[1,"button-row"],[1,"language","button",3,"primary","href"],[1,"language","button",3,"href"],["xmlns","http://www.w3.org/2000/svg","width","25","height","25","viewBox","0 0 25 25","fill","none"],["d","M18.1176 8.70358L10.7537 16.0675L6.51104 11.8249","stroke","#4E02B2","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"]],template:function(n,i){n&1&&(D(0,"div",0)(1,"div",1)(2,"div",2),en(3,Yg,4,5,"a",3,Mc),G()()()),n&2&&(j(3),nn(i.LANGUAGES()));},styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 52px;
  gap: 8px;
  padding: none;
}
.container[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {
  padding: 16px 8px;
}
.container[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%] {
  gap: 8px;
}
.container[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {
  height: 40px;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #E7CBFF;
  background: #FFFDF6;
  color: #6C707B;
  font-size: 16px;
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%]   .button-row[_ngcontent-%COMP%]   .button.primary[_ngcontent-%COMP%] {
  color: #4E02B2;
  font-weight: 700;
  background: #E7CBFF;
  pointer-events: none;
}`]});};var Vp=()=>["/"],Xg=()=>["/prescan"];function Jg(t,e){t&1&&(D(0,"a",6),Ot(),D(1,"svg",7),Y(2,"path",8),G(),Gt(),D(3,"span"),ct(4,2),G()()),t&2&&dt("routerLink",Jt(1,Xg));}var $p=348-2*56,rr=class t{constructor(e,n){this.api=e;this.state=n;se(()=>{this.api.workspaceId()&&this.api.workspace()?.source?this.state.mainMenuHeight.set($p):this.state.mainMenuHeight.set($p-56);});}explore=new Jn();static ɵfac=function(n){return new(n||t)(et(Ht),et(ae));};static ɵcmp=_t({type:t,selectors:[["app-main-menu"]],outputs:{explore:"explore"},decls:8,vars:7,consts:()=>{let e;e="Bekijk de Futures Map";let n;n="Over + Contact";let i;return i="Toevoegen aan Futures Map",[e,n,i,[1,"menu"],[1,"links"],["queryParamsHandling","preserve",1,"simple",3,"click","routerLink"],["queryParamsHandling","preserve",1,"primary",3,"routerLink"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24","fill","none"],["d","M12 4.01562C12.5523 4.01563 13 4.46334 13 5.01562V11.0078H18.9951L19.0977 11.0127C19.6017 11.0641 19.9951 11.4902 19.9951 12.0078C19.9951 12.5254 19.6017 12.9515 19.0977 13.0029L18.9951 13.0078H13V19.0029L12.9951 19.1055C12.9437 19.6095 12.5176 20.0029 12 20.0029C11.4824 20.0029 11.0563 19.6095 11.0049 19.1055L11 19.0029V13.0078H5.00781C4.45553 13.0078 4.00781 12.5601 4.00781 12.0078C4.00781 11.4555 4.45553 11.0078 5.00781 11.0078H11V5.01562C11 4.46334 11.4477 4.01562 12 4.01562Z","fill","#FFFDF6"]];},template:function(n,i){n&1&&(D(0,"div",3),Y(1,"app-language-selector"),D(2,"div",4)(3,"a",5),St("click",function(){return i.explore.next();}),ct(4,0),G(),D(5,"a",5),St("click",function(){return i.state.aboutVisible.set(!0);}),ct(6,1),G(),Nt(7,Jg,5,2,"a",6),G()()),n&2&&(ye("height",i.state.mainMenuHeight(),"px"),j(3),dt("routerLink",Jt(5,Vp)),j(2),dt("routerLink",Jt(6,Vp)),j(2),kt(i.api.workspaceId()&&i.api.workspace().source?7:-1));},dependencies:[ir,on],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.menu[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  background-color: #FBF5F6;
  align-items: stretch;
  padding: none;
  padding-bottom: 8px;
}
.menu[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 4px;
  padding: 0 24px;
  position: relative;
  top: -8px;
}
.menu[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  display: flex;
  width: 100%;
  height: 52px;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 16px;
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
  font-size: 16px;
  text-decoration: none;
}
.menu[_ngcontent-%COMP%]   .links[_ngcontent-%COMP%]   a.primary[_ngcontent-%COMP%] {
  background-color: #4E02B2;
  color: #FFFFFF;
  font-weight: 700;
}`]});};var Kg=()=>["/"],Qg=()=>["/scan"],t_=()=>({"item-id":null,key:null});function e_(t,e){if(t&1&&(D(0,"a",15),Ot(),D(1,"svg",19),Y(2,"path",20)(3,"path",21),G(),Gt(),D(4,"span"),ct(5,1),G()()),t&2){let n=Et(2);dt("href",n.api.workspace().whatsapp_group,De);}}function n_(t,e){if(t&1){let n=Dt();D(0,"div",22),St("click",function(){Tt(n);let o=Et(2);return wt(o.inputAnswer.next("yes"));}),ct(1,2),G();}}function i_(t,e){if(t&1){let n=Dt();D(0,"div",23),St("click",function(){Tt(n);let o=Et(2);return wt(o.inputAnswer.next("more"));}),ct(1,3),G();}}function r_(t,e){t&1&&(D(0,"div",18),ct(1,4),G()),t&2&&dt("routerLink",Jt(2,Qg))("queryParams",Jt(3,t_));}function o_(t,e){if(t&1&&(D(0,"div",12),Nt(1,e_,6,1,"a",15)(2,n_,2,0,"div",16)(3,i_,2,0,"div",17)(4,r_,2,4,"div",18),G()),t&2){let n=Et();j(),kt(n.showWhatsappButton()?1:-1),j(),kt(n.showScanButton()?2:-1),j(),kt(n.showMoreButton()?3:-1),j(),kt(n.showAgreeButton()?4:-1);}}function s_(t,e){if(t&1){let n=Dt();D(0,"div",24),St("click",function(){Tt(n);let o=Et();return wt(o.mainMenuOpen.set(!1));}),G();}}var hs=class t{constructor(e,n,i,o,s){this.route=e;this.api=n;this.platform=i;this.router=o;this.ref=s;this.api.updateFromRoute(this.route.snapshot),se(()=>{let l=this.api.workspace();l&&l.source&&this.initialInteraction.length===0&&this.uiInitialized()&&(this.initialInteraction=[new Me("ai","Hi"),this.api.workspace().whatsapp_group?new Me("ai","**Eerst, sluit je aan bij de chatgroep** die we hebben opgezet voor :EVENT_NAME:."):new Me("ai","Fijn dat je **:EVENT_NAME:** bezoekt!"),new Me("ai","Ik ga je helpen je schermafbeelding te **scannen** en toe te voegen aan de Futures Map.")],this.interact());});}messagesComponent;initialInteraction=[];answer=new Me("human","Ja, ik wil scannen!");tellMore=new Me("ai","Vind onze stand in de lobby tegenover de ingang. Daar vind je sjablonen en begeleiding.");secondInteraction=new Me("ai","Mooi!\n\nMaar eerst vraag ik je om akkoord te gaan met de gebruiksvoorwaarden zoals beschreven in het [Privacybeleid](/nl/privacy-policy).\n\nEn ik ga je ook vragen om **toegang tot je camera**. Dan kunnen we beginnen.");inputAnswer=new Be();showMoreButton=X(!1);showScanButton=X(!1);showAgreeButton=X(!1);showWhatsappButton=X(!1);topMenuOpen=X(!0);mainMenuOpen=X(!1);uiInitialized=X(!1);addMessage(e){e.setText(e.text.replace(/:EVENT_NAME:/g,this.api.workspace()?.event_name||"De workshop")),this.messagesComponent.addMessage(e);}ngOnInit(){this.messagesComponent?.clear(),this.showMoreButton.set(!1),this.showScanButton.set(!1),this.showAgreeButton.set(!1);}ngAfterViewInit(){this.platform.browser(()=>{this.uiInitialized.set(!0),this.messagesComponent.scrollPosition.pipe(be(this.ref),re(e=>e<10)).subscribe(e=>{this.topMenuOpen.set(e);});});}interact(){this.addMessage(this.initialInteraction[0]),Yn(1500).pipe(Ce(this.initialInteraction.length),oe(e=>{if(e+=1,e<this.initialInteraction.length){for(let n=0;n<e+1;n++)this.initialInteraction[n].part=n!==e;return this.addMessage(this.initialInteraction[e]),Dn([]);}else return this.showWhatsappButton.set(this.api.isWorkshop()&&this.api.workspace()?.whatsapp_group),this.showScanButton.set(!0),this.inputAnswer.pipe(Ft(n=>{n==="more"&&(this.addMessage(this.tellMore),this.showMoreButton.set(!1));}),Ze(n=>n==="yes"),Ft(()=>{this.addMessage(this.answer),this.showScanButton.set(!1),this.showMoreButton.set(!1);}),de(1e3),Ft(()=>{this.addMessage(this.secondInteraction),this.showAgreeButton.set(!0);}));}),oe(()=>this.inputAnswer)).subscribe(()=>{this.showAgreeButton.set(!1),this.router.navigate(["scan"],{queryParamsHandling:"preserve"}),console.log("DONE");});}static ɵfac=function(n){return new(n||t)(et(me),et(Ht),et(jt),et(xe),et(Xn));};static ɵcmp=_t({type:t,selectors:[["app-home"]],viewQuery:function(n,i){if(n&1&&Wt(vn,5),n&2){let o;qt(o=Yt())&&(i.messagesComponent=o.first);}},decls:13,vars:10,consts:()=>{let e;e="Word lid van de WhatsApp-groep";let n;n="Ja, ik wil scannen!";let i;i="Hoe maak ik er een?";let o;return o="Ja, ik ga akkoord",[["messages",""],e,n,i,o,[1,"sticky-menu"],[1,"header"],["queryParamsHandling","preserve",3,"routerLink"],[1,"back"],[1,"logo"],[1,"open-menu",3,"click"],[3,"scrollOnAI","paddingTop"],["ltr","",1,"buttons"],[1,"menu-overlay"],[1,"menu"],["target","_blank",1,"button",3,"href"],[1,"button","primary"],[1,"button"],["queryParamsHandling","merge",1,"button","primary",3,"routerLink","queryParams"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24","fill","none"],["d","M22.375 12.0195C22.375 17.5425 17.898 22.0195 12.375 22.0195C10.6195 22.022 8.89463 21.5604 7.375 20.6815L2.375 21.5195L3.207 16.0195C2.65735 14.7577 2.3741 13.3959 2.375 12.0195C2.375 6.49653 6.852 2.01953 12.375 2.01953C17.898 2.01953 22.375 6.49653 22.375 12.0195Z","stroke","#4E02B2","stroke-width","1.5","stroke-linecap","round"],["d","M13.335 13.8875L15.415 13.4815L17.375 14.2345V16.0575C17.375 16.6645 16.853 17.1275 16.265 16.9975C14.742 16.6635 11.975 15.8235 10.053 13.8875C8.223 12.0445 7.598 9.47753 7.385 8.06053C7.3 7.49353 7.749 7.01953 8.318 7.01953H10.212L10.947 8.98853L10.558 11.0895","stroke","#4E02B2","stroke-width","1.5","stroke-linecap","round"],[1,"button","primary",3,"click"],[1,"button",3,"click"],[1,"menu-overlay",3,"click"]];},template:function(n,i){if(n&1){let o=Dt();D(0,"div",5)(1,"div",6)(2,"a",7),Y(3,"div",8)(4,"div",9),G(),D(5,"div",10),St("click",function(){return Tt(o),wt(i.mainMenuOpen.set(!0));}),G()(),Y(6,"app-language-selector"),G(),Y(7,"app-messages",11,0),Nt(9,o_,5,4,"div",12)(10,s_,1,0,"div",13),D(11,"div",14),Y(12,"app-main-menu"),G();}n&2&&(yt("visible",i.topMenuOpen()),j(2),dt("routerLink",Jt(9,Kg)),j(5),dt("scrollOnAI",!1)("paddingTop",124),j(2),kt(i.showScanButton()||i.showMoreButton()||i.showAgreeButton()?9:-1),j(),kt(i.mainMenuOpen()?10:-1),j(),yt("open",i.mainMenuOpen()));},dependencies:[on,vn,Ve,rr,ir],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-flow: column;
}
[_nghost-%COMP%]   .sticky-menu[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 124px;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  gap: 8px;
  padding: 0 16px;
  transition: transform 0.3s ease-in-out;
  transform: translateY(-100%);
  background-color: #FFFDF6;
}
[_nghost-%COMP%]   .sticky-menu.visible[_ngcontent-%COMP%] {
  transform: translateY(0);
}
[_nghost-%COMP%]   .sticky-menu[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 52px;
  gap: 8px;
}
[_nghost-%COMP%]   .sticky-menu[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
}
[_nghost-%COMP%]   .sticky-menu[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  background-image: url("./media/icon-back-FAO6AZBV.svg");
}
[_nghost-%COMP%]   .sticky-menu[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {
  width: 132px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/logo-futures-VIS6UZMX.svg");
}
[_nghost-%COMP%]   .sticky-menu[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .open-menu[_ngcontent-%COMP%] {
  margin-inline-start: auto;
  width: 36px;
  height: 36px;
  background-image: url("./media/icon-caret-down-2AWNRY6E.svg");
}
[_nghost-%COMP%]   .buttons[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  padding: 8px 24px;
  animation: _ngcontent-%COMP%_slideInUp 0.3s ease-in-out;
}
[_nghost-%COMP%]   .menu-overlay[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
[_nghost-%COMP%]   .menu[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  transition: transform 0.3s ease-in-out;
  transform: translateY(105%);
  z-index: 1001;
}
[_nghost-%COMP%]   .menu.open[_ngcontent-%COMP%] {
  transform: translateY(0);
}`]});};function a_(t,e){t&1&&Y(0,"div",3);}function l_(t,e){t&1&&Y(0,"div",4);}var or=class t{constructor(e,n){this.api=e;this.state=n;}prefer=It(()=>{let e=this.api.item()?.favorable_future||"";return e.indexOf("prefer")>=0||e.indexOf("prevent")>=0&&e.indexOf("mostly")>=0;});prevent=It(()=>{let e=this.api.item()?.favorable_future||"";return e.indexOf("prevent")>=0||e.indexOf("prefer")>=0&&e.indexOf("mostly")>=0;});preferred=It(()=>(this.api.item()?.favorable_future||"").indexOf("prefer")>=0);rotate=It(()=>{let e=this.preferred()?-1:1;return(100-(this.api.item()?.plausibility||0))/100*32*e;});imageUrl=It(()=>{let e=this.api.item();return this.state.currentImageUrl()||e?.screenshot_url||null;});static ɵfac=function(n){return new(n||t)(et(Ht),et(ae));};static ɵcmp=_t({type:t,selectors:[["app-completion-image"]],decls:5,vars:11,consts:[[1,"container"],[1,"line"],["alt","Confirmation Image",3,"src"],[1,"prefer"],[1,"prevent"]],template:function(n,i){n&1&&(D(0,"div",0),Y(1,"div",1)(2,"img",2),Nt(3,a_,1,0,"div",3)(4,l_,1,0,"div",4),G()),n&2&&(ye("transform","rotate("+i.rotate()+"deg)"),yt("prefer",!!i.prefer())("prevent",!!i.prevent())("preferred",i.preferred()),j(2),dt("src",i.imageUrl(),De),j(),kt(i.prefer()?3:-1),j(),kt(i.prevent()?4:-1));},styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  padding-top: 32px;
  transform-origin: center;
}
.container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 50%;
  position: relative;
  z-index: 1;
}
.container[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {
  position: absolute;
  top: 30px;
  left: -100%;
  width: 400%;
  height: 2px;
  border-top: 4px solid;
  border-top-color: #F73C3C;
}
.container.preferred[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {
  border-top-color: #698CFF;
}
.container[_ngcontent-%COMP%]   .prefer[_ngcontent-%COMP%], 
.container[_ngcontent-%COMP%]   .prevent[_ngcontent-%COMP%] {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 40px;
  height: 106px;
  position: absolute;
  z-index: 2;
}
.container[_ngcontent-%COMP%]   .prefer[_ngcontent-%COMP%] {
  background-image: url("./media/img-pin-prefer-v-6BJXLG6S.svg");
  top: -16px;
  left: 26%;
  transform: rotate(-13deg) scale(1);
}
.container[_ngcontent-%COMP%]   .prevent[_ngcontent-%COMP%] {
  background-image: url("./media/img-pin-prevent-v-A4RVBFLH.svg");
  top: -4px;
  left: 59%;
  transform: rotate(16deg) scale(1);
}`]});};var Gp=()=>["/scan"],Up=()=>({"item-id":null,key:null}),c_=()=>["/"],h_=()=>({key:null});function p_(t,e){if(t&1){let n=Dt();D(0,"div",8)(1,"a",9),Ot(),D(2,"svg",10),Y(3,"path",11),G(),Gt(),D(4,"span"),ct(5,0),G()(),D(6,"a",9),Ot(),D(7,"svg",12),Y(8,"path",13),G(),Gt(),D(9,"span"),ct(10,1),G()()(),D(11,"a",14),St("click",function(){Tt(n);let o=Et();return wt(o.downloadImage());}),Ot(),D(12,"svg",12),Y(13,"path",15),G(),Gt(),D(14,"span"),ct(15,2),G()(),D(16,"a",16),St("click",function(){Tt(n);let o=Et();return wt(o.shareImage());}),Ot(),D(17,"svg",17),Y(18,"path",18),G(),Gt(),D(19,"span"),ct(20,3),G()();}t&2&&(j(),dt("routerLink",Jt(4,Gp))("queryParams",Jt(5,Up)),j(5),dt("routerLink",Jt(6,c_))("queryParams",Jt(7,h_)));}function f_(t,e){if(t&1){let n=Dt();D(0,"div",8)(1,"a",9),Ot(),D(2,"svg",10),Y(3,"path",11),G(),Gt(),D(4,"span"),ct(5,4),G()()(),D(6,"div",8)(7,"a",16),St("click",function(){Tt(n);let o=Et();return wt(o.downloadImage());}),Ot(),D(8,"svg",19)(9,"g",20),Y(10,"path",21)(11,"path",22),G(),D(12,"defs")(13,"clipPath",23),Y(14,"rect",24),G()()(),Gt(),D(15,"span"),ct(16,5),G()()();}t&2&&(j(),dt("routerLink",Jt(2,Gp))("queryParams",Jt(3,Up)));}var sr=class t{constructor(e,n){this.api=e;this.http=n;}thinking=Ec(!1);downloadImage(){let e=this.api.item(),n=e.screenshot_url;if(!n){console.log("No screenshot URL available",e);return;}this.http.get(n,{responseType:"blob"}).pipe(oe(i=>{let o=[new File([i],"my-screenshot.png",{type:i.type})];return navigator&&navigator.canShare&&navigator.canShare({files:o})?Dn(navigator.share({files:o})).pipe(re(()=>({native:!0,url:""}))):Dn(new Promise(s=>{let l=new FileReader();l.onload=()=>s(l.result),l.readAsDataURL(i);})).pipe(re(s=>({native:!1,url:s})));})).subscribe(({native:i,url:o})=>{if(!i){var s=document.createElement("a");s.download="my-screenshot.png",s.href=o,s.click();}});}shareImage(){let e=this.api.workspaceId(),n=this.api.itemId(),i=this.api.item();if(!e||!n){console.error("Workspace ID or Item ID is missing");return;}let o=`https://mapfutur.es/props?workspace=${e}&item-id=${n}`,s={title:"Onze toekomst?",text:i.future_scenario_tagline||"Bekijk deze afbeelding!",url:o};navigator.share(s);}static ɵfac=function(n){return new(n||t)(et(Ht),et(rn));};static ɵcmp=_t({type:t,selectors:[["app-complete-evaluation"]],inputs:{thinking:[1,"thinking"]},decls:5,vars:3,consts:()=>{let e;e="Voeg er nog een toe";let n;n="Bekijk de Futures Map";let i;i="Afbeelding downloaden";let o;o="Delen";let s;s="Voeg er nog een toe";let l;return l="Delen met groep",[e,n,i,o,s,l,[1,"container"],["ltr","",1,"buttons"],[1,"button-row"],["queryParamsHandling","merge",1,"button",3,"routerLink","queryParams"],["xmlns","http://www.w3.org/2000/svg","width","24","height","25","viewBox","0 0 24 25","fill","none"],["fill-rule","evenodd","clip-rule","evenodd","d","M12.7461 19.58L12.75 19.5038V13.26H18.9932L19.0693 13.2561C19.4477 13.2179 19.7432 12.8985 19.7432 12.51C19.7432 12.1216 19.4477 11.8021 19.0693 11.7639L18.9932 11.76H12.75V5.51648C12.75 5.10227 12.4142 4.76648 12 4.76648C11.5858 4.76648 11.25 5.10227 11.25 5.51648V11.76H5.00586C4.59165 11.76 4.25586 12.0958 4.25586 12.51C4.25586 12.9242 4.59165 13.26 5.00586 13.26H11.25V19.5038L11.2539 19.58C11.2921 19.9583 11.6115 20.2538 12 20.2538C12.3885 20.2538 12.7079 19.9583 12.7461 19.58Z","fill","#4E02B2"],["xmlns","http://www.w3.org/2000/svg","width","25","height","24","viewBox","0 0 25 24","fill","none"],["d","M16.25 6.99872V16.4987M9.25 16.9987V8.49872M4.271 6.71472L8.824 4.23171C8.95671 4.15924 9.10414 4.11781 9.25517 4.11053C9.40621 4.10326 9.55693 4.13033 9.696 4.18972L15.804 6.80772C15.9431 6.8671 16.0938 6.89417 16.2448 6.8869C16.3959 6.87962 16.5433 6.83819 16.676 6.76572L20.271 4.80572C20.4233 4.7226 20.5946 4.68055 20.7681 4.68369C20.9416 4.68684 21.1113 4.73506 21.2605 4.82364C21.4097 4.91221 21.5333 5.03808 21.6191 5.18887C21.7049 5.33967 21.75 5.5102 21.75 5.68372V16.4047C21.75 16.5844 21.7017 16.7607 21.61 16.9152C21.5183 17.0697 21.3867 17.1967 21.229 17.2827L16.676 19.7657C16.5433 19.8382 16.3959 19.8796 16.2448 19.8869C16.0938 19.8942 15.9431 19.8671 15.804 19.8077L9.696 17.1887C9.55693 17.1293 9.40621 17.1023 9.25517 17.1095C9.10414 17.1168 8.95671 17.1582 8.824 17.2307L5.229 19.1907C5.07676 19.2738 4.90554 19.3158 4.73214 19.3127C4.55874 19.3096 4.38913 19.2615 4.23996 19.1731C4.09079 19.0846 3.96718 18.9589 3.88128 18.8082C3.79538 18.6575 3.75014 18.4871 3.75 18.3137V7.59371C3.74997 7.41406 3.79833 7.23772 3.89001 7.08322C3.98169 6.92872 4.1133 6.80077 4.271 6.71472Z","stroke","#4E02B2","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],[1,"button",3,"click"],["d","M12.25 5V13.5M12.25 13.5L15.25 10.5M12.25 13.5L9.25 10.5M5.25 15V17C5.25 17.5304 5.46071 18.0391 5.83579 18.4142C6.21086 18.7893 6.71957 19 7.25 19H17.25C17.7804 19 18.2891 18.7893 18.6642 18.4142C19.0393 18.0391 19.25 17.5304 19.25 17V15","stroke","#4E02B2","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],[1,"button","primary",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","25","height","25","viewBox","0 0 25 25","fill","none"],["d","M12.25 5.5V14M15.25 7.5L12.25 4.5L9.25 7.5M5.25 12.5V17.5C5.25 18.0304 5.46071 18.5391 5.83579 18.9142C6.21086 19.2893 6.71957 19.5 7.25 19.5H17.25C17.7804 19.5 18.2891 19.2893 18.6642 18.9142C19.0393 18.5391 19.25 18.0304 19.25 17.5V12.5","stroke","#ffffff","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["width","25","height","24","viewBox","0 0 25 24","fill","none","xmlns","http://www.w3.org/2000/svg"],["clip-path","url(#clip0_1892_11452)"],["d","M12.25 11.8477V20.3477M15.25 13.8477L12.25 10.8477L9.25 13.8477","stroke","#FFFDF6","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M8.63647 18.7721L4.9375 18.7188C4.38522 18.7188 3.9375 18.271 3.9375 17.7188V11.7187C3.9375 8.40504 6.62379 5.71875 9.9375 5.71875C9.9375 5.71875 11.8003 5.71875 13.9374 5.71875C17.2511 5.71875 19.9375 8.40504 19.9375 11.7188V12.7188C19.9375 15.4316 18.137 17.724 15.6659 18.4661","stroke","#FFFDF6","stroke-width","2","stroke-linecap","round"],["id","clip0_1892_11452"],["width","24","height","24","fill","white","transform","translate(0.25)"]];},template:function(n,i){n&1&&(D(0,"div",6),Y(1,"app-completion-image"),D(2,"div",7),Nt(3,p_,21,8)(4,f_,17,4),G()()),n&2&&(j(2),yt("hide",i.thinking()),j(),kt(i.api.isWorkshop()?4:3));},dependencies:[on,or],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  position: relative;
}
.container[_ngcontent-%COMP%]   app-completion-image[_ngcontent-%COMP%] {
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  height: 100%;
}
.container[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {
  padding: 12px 16px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: #FFFDF6;
  border-top: 1px solid #EDECEC;
  display: flex;
  flex-flow: column;
  gap: 8px;
  transition: transform 0.3s ease-in-out;
  transform: translateY(0);
}
.container[_ngcontent-%COMP%]   .buttons.hide[_ngcontent-%COMP%] {
  transform: translateY(100%);
}`]});};var u_=["image"];function d_(t,e){if(t&1&&(D(0,"div",7)(1,"div",17),Pe(2),G()()),t&2){let n=Et();j(2),ui(n.reply());}}function m_(t,e){t&1&&(D(0,"div",7)(1,"div",17),Pe(2,"Something went wrong... please refresh the page or try again in a few minutes."),G()());}function g_(t,e){t&1&&Y(0,"app-complete-evaluation",8);}var ps=class t{constructor(e,n,i,o,s,l,h){this.state=e;this.router=n;this.api=i;this.route=o;this.platform=s;this.sanitizer=l;this.http=h;this.api.updateFromRoute(this.route.snapshot),this.item_id.set(this.route.snapshot.queryParams["item-id"]),se(()=>{this.completed()&&this.refreshItem();});}messages;inputMessage=X("");reply=X("");item_id=X("");item_key=X("");item=X({});imageUrl=It(()=>this.sanitizer.bypassSecurityTrustUrl(this.item().screenshot_url));thinking=X(!0);inputDisabled=X(!0);imageLoaded=X(!1);hasText=X(!1);visible=It(()=>this.hasText()&&this.imageLoaded());completed=X(!1);inputVisible=It(()=>this.visible()&&!this.completed());failed=X(!1);messagesComponent;imageEl;ngAfterViewInit(){this.messages=this.messagesComponent.messages;let e=this.item_id();if(e){this.item_key.set(this.route.snapshot.queryParams.key);let n=this.item_key();this.api.fetchItem(e,n).subscribe(i=>{i&&this.platform.browser()&&(this.submitMessage(),Cr(this.imageEl.nativeElement,"load").pipe(Ce(1)).subscribe(()=>{this.imageLoaded.set(!0);}),this.item.set(i));});}else this.router.navigate(["/"],{queryParamsHandling:"preserve"});}refreshItem(){this.api.fetchItem(this.item_id(),this.item_key()).subscribe(e=>{e&&this.item.set(e);});}addMessage(e,n){let i=new Me(e,n);this.messagesComponent.addMessage(i);}submitMessage(){this.inputDisabled.set(!0),this.thinking.set(!0),this.messagesComponent.thinking.set(!0),console.log("thinking...");let e=this.inputMessage();e&&this.addMessage("human",e),this.inputMessage.set(""),this.api.sendMessage(e||"initial").subscribe(n=>{if(n.kind==="message"){this.hasText.set(!0);let i=n.idx,o=n.content,s=n.role==="assistant"?"ai":"human";this.messages.update(l=>{let h=l.slice();return h.length>i?(h[i].setText(o),h[i].kind=s):(this.reply.set(""),h.push(new Me(s,o))),h;});}else n.kind==="status"&&n.status==="done"?this.completed.set(!0):n.kind==="status"&&n.status==="failed"?this.failed.set(!0):n.kind==="text"?(this.hasText.set(!0),this.reply.update(i=>(i+=n.value,i.slice(0,10).indexOf("DONE")>=0?(this.completed.set(!0),""):(this.messages.update(o=>o.slice()),i))),console.log("thinking done..."),this.thinking.set(!1),this.messagesComponent.thinking.set(!1)):n.kind==="status"&&n.status&&(this.thinking.set(!1),this.messagesComponent.thinking.set(!1),this.failed.set(!1),this.inputDisabled.set(!1),this.reply()&&(this.addMessage("ai",this.reply()),this.reply.set("")));});}static ɵfac=function(n){return new(n||t)(et(ae),et(xe),et(Ht),et(me),et(jt),et(Rc),et(rn));};static ɵcmp=_t({type:t,selectors:[["ng-component"]],viewQuery:function(n,i){if(n&1&&(Wt(vn,5),Wt(u_,5)),n&2){let o;qt(o=Yt())&&(i.messagesComponent=o.first),qt(o=Yt())&&(i.imageEl=o.first);}},decls:19,vars:18,consts:()=>{let e;return e="In je eigen woorden...",[["image",""],["messagesComponent",""],[1,"image-overlay"],[1,"image"],[3,"src"],[1,"discuss"],[3,"bg"],["ltr","",1,"message","ai"],[1,"spacer"],["ltr","",1,"input"],["rows","1","placeholder",e,1,"input-el",3,"ngModelChange","keyup.enter","ngModel","disabled"],["width","40","height","40","viewBox","0 0 41 41","fill","none","xmlns","http://www.w3.org/2000/svg",1,"submit",3,"click"],["x","0.75","y","0.5","width","40","height","40","rx","20"],["clip-path","url(#clip0_1016_4900)"],["d","M20.75 28.5V12.5M20.75 12.5L26.75 18.5M20.75 12.5L14.75 18.5","stroke","white","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["id","clip0_1016_4900"],["width","24","height","24","fill","white","transform","translate(8.75 8.5)"],[1,"message-text"]];},template:function(n,i){if(n&1){let o=Dt();D(0,"div",2)(1,"div",3),Y(2,"img",4,0),G()(),D(4,"div",5)(5,"app-messages",6,1),Nt(7,d_,3,1,"div",7)(8,m_,3,0,"div",7)(9,g_,1,0,"app-complete-evaluation",8),G(),D(10,"div",9)(11,"textarea",10),gi("ngModelChange",function(l){return Tt(o),mi(i.inputMessage,l)||(i.inputMessage=l),wt(l);}),St("keyup.enter",function(){return Tt(o),wt(i.submitMessage());}),G(),Ot(),D(12,"svg",11),St("click",function(){return Tt(o),wt(i.submitMessage());}),Y(13,"rect",12),D(14,"g",13),Y(15,"path",14),G(),D(16,"defs")(17,"clipPath",15),Y(18,"rect",16),G()()()()();}n&2&&(j(),yt("small",i.visible())("completed",i.completed()),j(),dt("src",i.imageUrl(),De),j(2),yt("visible",i.visible())("completed",i.completed()),j(),dt("bg",!i.completed()),j(2),kt(!i.thinking()&&i.reply()?7:-1),j(),kt(i.failed()?8:-1),j(),kt(i.completed()?9:-1),j(),yt("visible",i.inputVisible()),j(),di("ngModel",i.inputMessage),dt("disabled",i.inputDisabled()),j(2),ve("fill",i.inputDisabled()?"#ccc":"#4E02B2"));},dependencies:[ji,Po,Ui,Hi,vn,Ve,sr],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  flex-flow: column;
  align-items: stretch;
  overflow: hidden;
  background-color: #F5F0E7;
  position: relative;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 50%;
  aspect-ratio: 53 / 100;
  transition: all 0.5s ease-in-out;
  transition-property:
    transform,
    bottom,
    left,
    width,
    opacity;
  transform: translate(-50%, 50%);
  opacity: 1;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .image.small[_ngcontent-%COMP%] {
  transform: translate(0, 0) scale(0.5);
  width: 10%;
  bottom: 68px;
  left: 4px;
  pointer-events: all;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .image.completed[_ngcontent-%COMP%] {
  opacity: 0;
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  overflow: hidden;
  transition: opacity 1s ease-in-out;
  opacity: 0;
}
[_nghost-%COMP%]   .discuss.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   app-messages[_ngcontent-%COMP%] {
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  border-radius: 16px 16px 0px 0px;
  background: #FFF;
  box-shadow: 0px 0px 16px 0px rgba(78, 2, 178, 0.2);
  height: 64px;
  padding: 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 4px;
  transition: transform 0.3s ease-out;
  transform: translateY(100%);
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   .input.visible[_ngcontent-%COMP%] {
  transition-delay: 1s;
  transform: translateY(0);
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   .input-el[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  resize: none;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  appearance: none;
  border: none;
  color: #4E02B2;
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
  font-weight: 400;
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   .input-el[_ngcontent-%COMP%]:placeholder-shown {
  color: #9B90AA;
  font-weight: 400;
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {
  fill: #EDECEC;
  pointer-events: none;
}
[_nghost-%COMP%]   .discuss[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]   .input-el[_ngcontent-%COMP%]:not(:placeholder-shown)    + .submit[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {
  fill: #4E02B2;
}
[_nghost-%COMP%]   .discuss.completed[_ngcontent-%COMP%] {
  z-index: 1;
}
[_nghost-%COMP%]   .buttons[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: all;
  z-index: 1;
}
[_nghost-%COMP%]   app-complete-evaluation[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}`]});};var jp=_c(dl());var __=["animationContainer"],fs=class t{constructor(e,n,i,o,s,l){this.state=e;this.router=n;this.api=i;this.route=o;this.platform=s;this.http=l;this.api.updateFromRoute(this.route.snapshot),this.route.params.subscribe(h=>{this.state.currentImage()||this.router.navigate(["/scan"],{queryParamsHandling:"preserve"});}),se(()=>{let h=this.loaded(),p=h?.item_key,u=h?.item_id;p&&u&&this.animationComplete()&&this.router.navigate(["/discuss"],{queryParams:{"item-id":u,key:p},queryParamsHandling:"merge"});});}loaded=X(null);animationComplete=X(!1);currentMessage=X(-1);animationContainer;ngAfterViewInit(){this.platform.browser(()=>{this.animationLoop();});}getAnimation(e,n,i=null){let o=this.animationContainer.nativeElement,s=this.state.currentImageUrl();return this.http.get(e,{responseType:"json"}).pipe(oe(l=>{n?.destroy(),l.assets&&l.assets.forEach((p,u)=>{p.p&&(i===null||i.includes(u))&&(p.p=s);});let h=jp.default.loadAnimation({container:o,renderer:"svg",loop:!0,autoplay:!0,animationData:l});return h.setSpeed(.5),this.currentMessage.update(p=>p+1),Dn(new Promise(p=>{h.addEventListener("loopComplete",()=>{p(h);});}));}));}animationLoop(){je(1e3).pipe(oe(()=>this.getAnimation("loader1.json",null,[1])),oe(e=>this.getAnimation("loader2.json",e)),oe(e=>this.getAnimation("loader3.json",e)),oe(e=>this.getAnimation("loader4.json",e))).subscribe(e=>{this.animationComplete.set(!0);});}static ɵfac=function(n){return new(n||t)(et(ae),et(xe),et(Ht),et(me),et(jt),et(rn));};static ɵcmp=_t({type:t,selectors:[["app-loader"]],viewQuery:function(n,i){if(n&1&&Wt(__,5),n&2){let o;qt(o=Yt())&&(i.animationContainer=o.first);}},decls:11,vars:16,consts:()=>{let e;e="Afbeelding uploaden...";let n;n="Sjabloon analyseren...";let i;i="Handschrift ontcijferen...";let o;return o="Periode bepalen...",[["animationContainer",""],e,n,i,o,[1,"animation"],["ltr","",1,"messages"],[1,"message"]];},template:function(n,i){n&1&&(Y(0,"div",5,0),D(2,"div",6)(3,"div",7),ct(4,1),G(),D(5,"div",7),ct(6,2),G(),D(7,"div",7),ct(8,3),G(),D(9,"div",7),ct(10,4),G()()),n&2&&(j(3),yt("before",i.currentMessage()<0)("after",i.currentMessage()>0),j(2),yt("before",i.currentMessage()<1)("after",i.currentMessage()>1),j(2),yt("before",i.currentMessage()<2)("after",i.currentMessage()>2),j(2),yt("before",i.currentMessage()<3)("after",i.currentMessage()>3));},dependencies:[Ve],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #F5F0E7;
}
[_nghost-%COMP%]   .animation[_ngcontent-%COMP%] {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
}
[_nghost-%COMP%]   .messages[_ngcontent-%COMP%] {
  width: 100%;
  position: relative;
}
[_nghost-%COMP%]   .message[_ngcontent-%COMP%] {
  color: #4E02B2;
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  font-size: 18px;
  font-weight: 400;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease-in-out;
  transform: translateX(0%);
  width: 100%;
  text-align: center;
}
[_nghost-%COMP%]   .message.before[_ngcontent-%COMP%] {
  transform: translateX(100%);
}
[_nghost-%COMP%]   .message.after[_ngcontent-%COMP%] {
  transform: translateX(-100%);
}`]});};var Zn=class t{constructor(e,n,i){this.route=e;this.router=n;this.platform=i;this.platform.browser(()=>{console.log("Redirecting to:",this.route.snapshot.data);let o=this.route.snapshot.data.redirectTo;console.log("Redirecting to:",o),o?window.location.href=o:this.router.navigate(["/"]);});}static ɵfac=function(n){return new(n||t)(et(me),et(xe),et(jt));};static ɵcmp=_t({type:t,selectors:[["app-redirector"]],decls:0,vars:0,template:function(n,i){},encapsulation:2});};var us=class t{constructor(e){this.http=e;this._configs.pipe(fi((n,i)=>n?.tag===i?.tag&&n?.set_id===i?.set_id)).subscribe(n=>{this.config.next(n);});}_configs=new Be();config=new $i(1);loadConfig(e){let n=`https://storage.googleapis.com/chronomaps3-eu/tiles/${e}/config.json`;this.http.get(n).pipe(oe(i=>{let o=i.set_id||0,s=`https://storage.googleapis.com/chronomaps3-eu/tiles/${e}/${o}/config.json`;return this.http.get(s).pipe(re(l=>$($({},i),l)));}),uo(i=>(console.error("Error loading config:",i),[]))).subscribe(i=>{this._configs.next(i);});}static ɵfac=function(n){return new(n||t)(tn(rn));};static ɵprov=Sn({token:t,factory:t.ɵfac,providedIn:"root"});};var ms=class t{constructor(e){this.platform=e;this.platform.browser()&&(this.L=Wp());}L=null;static ɵfac=function(n){return new(n||t)(tn(jt));};static ɵprov=Sn({token:t,factory:t.ɵfac,providedIn:"root"});};var P_=["mapEl"],C_=["clusterLabelsEl"],x_=["maskEl"];function b_(t,e){if(t&1&&(Ot(),D(0,"g")(1,"g")(2,"text",38),Pe(3),G()()()),t&2){let n=e.$implicit,i=Et(2);yt("positive",n.average_rotation<=0)("negative",n.average_rotation>0),ve("transform","translate("+n.x+","+n.y+")"),j(),ye("transform","rotate("+-n.average_rotation*2+"deg)"),j(),ve("font-size",n.fontSize[i.lang()]),j(),vo(" ",n.title[i.lang()]," ");}}function E_(t,e){if(t&1&&(Ot(),D(0,"svg",35)(1,"g",22),Y(2,"rect",36),en(3,b_,4,9,":svg:g",37,Mn),G()()),t&2){let n=Et();yt("visible",n.clusterLabelsVisible()),ve("width",n.w())("height",n.h())("viewBox","0 0 "+n.w()+" "+n.h()),j(2),ve("x",0)("y",0)("width",n.w())("height",n.h()),j(),nn(n.config().clusters);}}function S_(t,e){if(t&1&&(Ot(),Y(0,"rect",23)),t&2){let n=e.$implicit;ve("x",n.x)("y",n.y)("width",1)("height",1);}}function M_(t,e){if(t&1&&(D(0,"div",26),Ot(),D(1,"svg",39)(2,"g")(3,"g",40)(4,"g",41),Y(5,"path",42),D(6,"text",43),ct(7,5),G()(),D(8,"g",44),Y(9,"path",42),D(10,"text",43),ct(11,6),G()(),D(12,"g",45),Y(13,"path",42),D(14,"text",43),ct(15,7),G()(),D(16,"g",46),Y(17,"path",42),D(18,"text",43),ct(19,8),G()(),D(20,"g",47),Y(21,"path",48),D(22,"text",49),ct(23,9),G()(),D(24,"g",50),Y(25,"path",48),D(26,"text",49),ct(27,10),G()(),D(28,"g",51),Y(29,"path",48),D(30,"text",49),ct(31,11),G()(),D(32,"g",52),Y(33,"path",48),D(34,"text",49),ct(35,12),G()(),D(36,"g",53),Y(37,"path",54),D(38,"text",55),ct(39,13),G(),D(40,"text",56),ct(41,14),G(),Y(42,"circle",57),G()()()()()),t&2){let n=Et();j(2),_o("expander "+n.coneExpand());}}var Ye=class t{constructor(e,n,i,o){this.api=e;this.platform=n;this.activatedRoute=i;this.leafletService=o;this.L=this.leafletService.L,i.queryParams.subscribe(s=>{this.setLanguage(),this.tag=s.tag||this.tag;}),this.api.config.pipe(be(),Ze(s=>!!s)).subscribe(s=>{s.clusters.forEach(l=>{l.x=(l.bounds[0][0]+l.bounds[1][0])/2*s.conversion_ratio[0],l.y=(l.bounds[0][1]+l.bounds[1][1])/2*s.conversion_ratio[1],l.w=(l.bounds[1][0]-l.bounds[0][0])*s.conversion_ratio[0],l.h=(l.bounds[1][1]-l.bounds[0][1])*s.conversion_ratio[1],l.fontSize={},Object.keys(l.title).forEach(h=>{let p=l.title[h];l.fontSize[h]=l.w/(p.length*.75);});}),s.grid=s.grid.sort((l,h)=>-(l.metadata.timestamp?.localeCompare(h.metadata.timestamp)||0)),this.sortCorrectly=!0,this.currentIndex=0,this.config.set(s);}),this.platform.browser(()=>{this.looped.pipe(be(),Ft(()=>{console.log("WATCHDOG RESETTING");}),pi(18e4),Ft(()=>{Go("WATCHDOG RELOADING",{extra:{tag:this.tag,config:this.config(),sortCorrectly:this.sortCorrectly,currentIndex:this.currentIndex,loopStep:this.loopStep},level:"warning"});}),de(1e3)).subscribe(()=>{console.log("WATCHDOG RELOADING - ",this.loopStep),window.location.reload();}),this.api.config.pipe(Ze(s=>!!s),Ce(1),de(2e3),Ft(()=>{this.mapChangingOpportunity.next(),this.addToQueue();}),de(2e3)).subscribe(()=>{this.doLoop&&this.loop();}),se(()=>{this.viewInit()&&this.config()&&this.L&&(console.log("LANG GETTING MAP?"),this.mapChangingOpportunity.pipe(Ce(1)).subscribe(()=>{console.log("LANG GETTING MAP!"),this.map.update(s=>s?(this.tileLayer.remove(),this.addTileLayer(s),s):this.getMap(this.config()));}));}),se(()=>{let s=this.currentZoom();!this.doLoop&&this.clusterLabelsLayer&&(s<4?(this.clusterLabelsLayer.setOpacity(1),this.clusterLabelsVisible.set(!0)):s>4.5?(this.clusterLabelsLayer.setOpacity(0),this.clusterLabelsVisible.set(!1)):(this.clusterLabelsLayer.setOpacity(1-(s-4)/.5),this.clusterLabelsVisible.set(!0)));}),Yn(6e4).pipe(be()).subscribe(()=>{this.api.loadConfig(this.tag);});});}tag="main";language="";doLoop=!1;mapElement;clusterLabelsElement;maskElement;L;map=X(null);tileLayer=null;clusterLabelsLayer=null;maskLayer=null;config=X(null);viewInit=X(!1);currentZoom=X(0);lang=X("dutch");sortCorrectly=!0;currentIndex=0;clusterLabelsVisible=X(!1);showClusters=!0;itemImg=X("");itemImgVisible=X(!1);mapTransform=X("rotate(0deg)");overlayTransform=X("rotate(0deg)");clothespinTextVisible=X("none");clothespinVisible=X("none");clothespinSelected=X(!1);coneVisible=X(!1);coneExpand=X("");selectedLabel=X(-1);maskAmount=X(20);maskBase=X({x:10,y:10});maskLayerVisible=X(!1);maskItems=It(()=>{let e=this.maskAmount(),n=this.maskBase();return this.calculateMask(e,n);});queue=new $i(1);moveEnded=new Be();mapChangingOpportunity=new Be();looped=new Be();wdim=It(()=>this.config()?this.config().dim[0]+this.config().padding_ratio:0);hdim=It(()=>this.config()?this.config().dim[1]:0);w=It(()=>this.config()?this.wdim()*this.config().conversion_ratio[0]:0);h=It(()=>this.config()?this.hdim()*this.config().conversion_ratio[1]:0);bounds=It(()=>[[-this.h(),0],[0,this.w()]]);loopStep=0;ngOnInit(){this.tag=this.tag||this.activatedRoute.snapshot.queryParams.tag,this.api.loadConfig(this.tag);}setLanguage(e){let n=[this.activatedRoute.snapshot.queryParams.lang,e,this.language,"english"],i=this.config()?.clusters?.[0]?.title;if(console.log("LANG OPTIONS",n),console.log("LANG CLUSTER",i),i){for(let o of n)if(o&&(o=o.toLowerCase(),i[o])){this.lang.set(o);return;}}this.lang.set(n[n.length-1]);}ngAfterViewInit(){this.viewInit.set(!0),this.setLanguage();}loop(){this.looped.next(),this.queue.pipe(Ft(e=>{this.loopStep=0,this.looped.next(),console.log("LANG QUEUE",e?.id);}),Ze(e=>!!e),fi(),Ft(e=>{this.loopStep=10;let n=e.metadata.url;n=n.replace("https://storage.googleapis.com/chronomaps3.firebasestorage.app/","https://storage.googleapis.com/chronomaps3-eu/"),this.itemImg.set(n);}),Ft(e=>{this.loopStep=20,this.maskBase.set({x:e.pos[0],y:e.pos[1]}),this.maskAmount.set(1);}),de(1e3),Ft(e=>{this.loopStep=30,this.maskLayerVisible.set(!0);}),de(3e3),oe(e=>{this.loopStep=40,console.log("New item in queue:",e);let n=e.geo_bounds,i=this.config().conversion_ratio,o=this.config().cell_ratios||[1,1],s=[1,0].map(l=>i[l]*(1.5/o[l]-1));return n[0][0]-=s[0],n[0][1]-=s[1],n[1][0]+=s[0],n[1][1]+=s[1],this.map().flyToBounds(n,{animate:!0,duration:5}),this.clusterLabelsVisible.set(!1),this.overlayTransform.set(`rotate(${-e.metadata.rotate}deg)`),ea(this.moveEnded,je(5e3)).pipe(Ce(1),re(()=>e));}),Ft(e=>{this.loopStep=50,this.clusterLabelsVisible.set(!1),this.mapTransform.set(`rotate(${e.metadata.rotate}deg)`),this.overlayTransform.set("rotate(0deg)"),this.itemImgVisible.set(!0);}),de(1e3),Ft(e=>{this.loopStep=60,this.clothespinTextVisible.set("both"),this.clothespinVisible.set("both");}),de(1e3),Ft(e=>{this.loopStep=70,e.metadata.sign>0?(this.clothespinTextVisible.set("prefer"),this.clothespinVisible.set("prefer")):e.metadata.sign<0&&(this.clothespinTextVisible.set("prevent"),this.clothespinVisible.set("prevent"));}),de(500),Ft(e=>{this.loopStep=80,this.clothespinSelected.set(!0);}),de(500),Ft(e=>{this.loopStep=90,this.clothespinTextVisible.set("none"),this.coneVisible.set(!0);}),de(4e3),Ft(e=>{this.loopStep=100,this.selectedLabel.set(Math.round(e.metadata.rotate/8));let n="-"+Math.abs(this.selectedLabel());e.metadata.rotate>0?n="expand-p"+n:e.metadata.rotate<0?n="expand-n"+n:n="expand-"+n,this.mapElement.nativeElement.offsetWidth>this.mapElement.nativeElement.offsetHeight?n=n+"  h":n=n+"  v",this.coneExpand.set(n),this.overlayTransform.set(`rotate(${-e.metadata.rotate}deg)`),this.mapTransform.set("rotate(0deg)"),this.mapChangingOpportunity.next();}),de(5e3),Ft(e=>{this.loopStep=110,this.itemImgVisible.set(!1);}),de(1e3),oe(e=>{this.loopStep=120,this.clothespinSelected.set(!1),this.coneVisible.set(!1),this.coneExpand.set(""),this.clusterLabelsVisible.set(!0),console.log("LANGUAGE ITEM",e.metadata),this.setLanguage(e.metadata.lang);let n=5,i=33;this.map().flyToBounds(this.bounds(),{animate:!0,duration:n,easeLinearity:1});let o=Math.ceil(n*1e3/i);return ea(je(6e3),yc([Yn(33,vc).pipe(Ce(o),Ft(s=>{let l=this.wdim()**2*3,h=((s+1)/o)**5;this.maskAmount.set(Math.ceil(h*l));})),this.moveEnded])).pipe(Ce(1),re(()=>e));}),Ft(e=>{this.loopStep=130,this.clothespinVisible.set("none"),this.maskLayerVisible.set(!1);}),de(3e3),uo(e=>Dn(["error: "+e+" "+this.loopStep]))).subscribe(e=>{this.loopStep=200,console.log("Finished with item",e),this.addToQueue();});}getMap(e){let n=this.w(),i=this.h(),o=this.bounds(),s=.333,l=[[-i*(1+s),-n*s],[i*s,n*(1+s)]];console.log("BOUNDS",e.dim,e.conversion_ratio,o,l);let h=this.L.map(this.mapElement.nativeElement,{crs:this.L.CRS.Simple,maxBounds:l,center:[o[0][0]/2,o[1][1]/2],zoom:2,maxZoom:8,minZoom:2,zoomSnap:0,zoomControl:!1,attributionControl:!1});return h.fitBounds(o),h.on("moveend",()=>{this.currentZoom.set(h.getZoom()),this.moveEnded.next();}),this.addTileLayer(h),je(0).subscribe(()=>{if(this.doLoop){let u=this.maskElement.nativeElement.querySelector("svg");this.maskLayer=this.L.svgOverlay(u,o),this.maskLayer?.addTo(h);}let p=this.clusterLabelsElement.nativeElement.querySelector("svg");this.clusterLabelsLayer=this.L.svgOverlay(p,o),this.clusterLabelsLayer?.addTo(h);}),h;}addTileLayer(e){let n=[[-this.h()*2,-this.w()],[this.h(),this.w()*2]],i=this.config();this.tileLayer=new this.L.TileLayer(`https://storage.googleapis.com/chronomaps3-eu/tiles/${this.tag}/${i.set_id}/{z}/{x}/{y}.png`,{maxZoom:8,minZoom:2,bounds:n,errorTileUrl:"empty.png"}),this.tileLayer.addTo(e);}addToQueue(){if(this.config()){let e=null,n=this.config().grid;if(n&&n.length>0){for(;!e;){let i=this.currentIndex;this.sortCorrectly||(i=Math.floor(Math.random()*n.length)),e=n[i],this.currentIndex++,this.currentIndex>=n.length&&(this.currentIndex=0,this.sortCorrectly=!1);}this.queue.next(e);}}}calculateMask(e,n){let i=[{x:1,y:-.5},{x:0,y:-1},{x:-1,y:-.5},{x:-1,y:.5},{x:0,y:1},{x:1,y:.5}],o=[n],s=1;for(;o.length<e;){let l={x:n.x+s,y:n.y};o.push(l);for(let h of i)for(let p=0;p<s;p++)l={x:l.x+h.y,y:l.y+h.x},o.push(l);s++;}return o.slice(0,e);}static ɵfac=function(n){return new(n||t)(et(us),et(jt),et(me),et(ms));};static ɵcmp=_t({type:t,selectors:[["app-output-map"]],viewQuery:function(n,i){if(n&1&&(Wt(P_,5),Wt(C_,5),Wt(x_,5)),n&2){let o;qt(o=Yt())&&(i.mapElement=o.first),qt(o=Yt())&&(i.clusterLabelsElement=o.first),qt(o=Yt())&&(i.maskElement=o.first);}},inputs:{tag:"tag",language:"language",doLoop:"doLoop"},decls:26,vars:34,consts:()=>{let e;e="Gewenst";let n;n="Gevreesd";let i;i="Waarschijnlijk";let o;o="Geloofwaardig";let s;s="Voorstelbaar";let l;l="Absurd";let h;h="Waarschijnlijk";let p;p="Geloofwaardig";let u;u="Voorstelbaar";let m;m="Absurd";let b;b="NU";let d;return d="VOORSPELBAAR",[["mapEl",""],["clusterLabelsEl",""],["maskEl",""],e,n,i,o,s,l,h,p,u,m,b,d,[1,"map"],[2,"display","none"],["xmlns","http://www.w3.org/2000/svg",1,"cluster-labels",3,"visible"],[1,"mask-overlay",2,"display","none"],["xmlns","http://www.w3.org/2000/svg","preserveAspectRatio","none",1,"mask"],["id","mask"],["fill","white"],["transform","translate(0,0)"],["fill","black"],["fill","#fffdf6","mask","url(#mask)",1,"blur"],[1,"image-overlay"],[1,"cone"],[1,"clothespin-text","prefer"],[1,"item-image"],[3,"src"],[1,"clothespin","prefer"],["src","/img-pin-prefer-v.svg"],[1,"clothespin","prevent"],["src","/img-pin-prevent-v.svg"],[1,"clothespin-text","prevent"],["xmlns","http://www.w3.org/2000/svg",1,"cluster-labels"],["fill","#fffdf6","opacity","0.5"],[3,"positive","negative"],["x","0","y","0","text-anchor","middle","alignment-baseline","middle"],["xmlns","http://www.w3.org/2000/svg","width","100","height","100","viewBox","0 0 1000 1000","fill","none"],["transform","translate(25,500)"],["transform-origin","125 0",1,"probable","preferred","cone-line"],["d","M125 0 L825 0","stroke","#698CFF","stroke-width","1",1,"line"],["x","825","y","0","dy","6","dx","16","fill","#698CFF","font-size","24",1,"label"],["transform-origin","125 0",1,"plausible","preferred","cone-line"],["transform-origin","125 0",1,"possible","preferred","cone-line"],["transform-origin","125 0",1,"preposterous","preferred","cone-line"],["transform-origin","125 0",1,"probable","prevent","cone-line"],["d","M125 0 L825 0","stroke","#F73C3C","stroke-width","1",1,"line"],["x","825","y","0","dy","6","dx","16","fill","#F73C3C","font-size","24",1,"label"],["transform-origin","125 0",1,"plausible","prevent","cone-line"],["transform-origin","125 0",1,"possible","prevent","cone-line"],["transform-origin","125 0",1,"preposterous","prevent","cone-line"],[1,"projected"],["d","M125 0 L825 0","stroke","#8F8F8F","stroke-width","1",1,"line"],["x","125","y","0","dy","6","dx","-16","fill","#8F8F8F","font-size","24","text-anchor","end",1,"now"],["x","825","y","0","dy","6","dx","16","fill","#8F8F8F","font-size","24","transform","translate(-450,0)",1,"label"],["cx","125","cy","0","r","5","fill","#8F8F8F",1,"circle"]];},template:function(n,i){n&1&&(Y(0,"div",15,0),D(2,"div",16,1),Nt(4,E_,5,9,":svg:svg",17),G(),D(5,"div",18,2),Ot(),D(7,"svg",19)(8,"mask",20),Y(9,"rect",21),D(10,"g",22),en(11,S_,1,4,":svg:rect",23,Mn),G()(),Y(13,"rect",24),G()(),Gt(),D(14,"div",25),Nt(15,M_,43,2,"div",26),D(16,"div",27),ct(17,3),G(),D(18,"div",28),Y(19,"img",29),D(20,"div",30),Y(21,"img",31),G(),D(22,"div",32),Y(23,"img",33),G()(),D(24,"div",34),ct(25,4),G()()),n&2&&(ye("transform",i.mapTransform()),j(4),kt(i.map()?4:-1),j(3),yt("visible",i.maskLayerVisible()),ve("width",i.wdim())("height",i.hdim())("viewBox","0 0 "+i.wdim()+" "+i.hdim()),j(2),ve("x",0)("y",0)("width",i.wdim())("height",i.hdim()),j(2),nn(i.maskItems()),j(2),ve("x",0)("y",0)("width",i.wdim())("height",i.hdim()),j(),yt("visible",i.itemImgVisible()),j(),kt(i.coneVisible()?15:-1),j(),yt("visible",i.clothespinTextVisible()==="prefer"||i.clothespinTextVisible()==="both"),j(2),ye("transform",i.overlayTransform()),j(),dt("src",i.itemImg(),De),j(),yt("visible",i.clothespinVisible()==="prefer"||i.clothespinVisible()==="both")("selected",i.clothespinSelected()),j(2),yt("visible",i.clothespinVisible()==="prevent"||i.clothespinVisible()==="both")("selected",i.clothespinSelected()),j(2),yt("visible",i.clothespinTextVisible()==="prevent"||i.clothespinTextVisible()==="both"));},styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: #fffdf6;
}
[_nghost-%COMP%]   .map[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 1s ease-in-out;
}
[_nghost-%COMP%]   .cluster-labels[_ngcontent-%COMP%] {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
[_nghost-%COMP%]   .cluster-labels.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .cluster-labels[_ngcontent-%COMP%]     text {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  font-weight: 400;
  font-style: italic;
  stroke: #FFFDF6;
  stroke-width: 0.5em;
  paint-order: stroke;
}
[_nghost-%COMP%]   .cluster-labels[_ngcontent-%COMP%]     .positive text {
  fill: #B50F0F;
}
[_nghost-%COMP%]   .cluster-labels[_ngcontent-%COMP%]     .negative text {
  fill: #0030CC;
}
[_nghost-%COMP%]   .mask[_ngcontent-%COMP%] {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
[_nghost-%COMP%]   .mask.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .mask[_ngcontent-%COMP%]   rect.blur[_ngcontent-%COMP%] {
  opacity: 0.85;
  -webkit-backdrop-filter: grayscale(1);
  backdrop-filter: grayscale(1);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20000;
  pointer-events: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 70px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  background-color: #FFFDF6;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%] {
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: _ngcontent-%COMP%_fadeIn 1s ease-in-out;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
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
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander[_ngcontent-%COMP%] {
  transition: transform 3s ease-in-out;
  transform-origin: center;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-p-4[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(201vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-p-3[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(137vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-p-2[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(79vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-p-1[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(26vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand--0[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-25vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-n-1[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-75vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-n-2[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-126vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-n-3[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-183vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.h.expand-n-4[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-246vh) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-p-4[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(160vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-p-3[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(103vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-p-2[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(53vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-p-1[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(5vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand--0[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-41vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-n-1[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-88vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-n-2[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-138vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-n-3[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-193vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .expander.v.expand-n-4[_ngcontent-%COMP%] {
  transform: translateX(-10%) translateY(-257vw) scale(10);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .projected[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%] {
  stroke-dasharray: 700;
  stroke-dashoffset: 450;
  animation: _ngcontent-%COMP%_projected-intro 1s ease-in-out forwards 1s;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .projected[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_no-transform 1s ease-in-out forwards 1s;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%] {
  opacity: 0;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.preferred[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {
  fill: #698CFF;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.preferred[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {
  stroke: #698CFF;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.preferred.probable[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_probable-preferred 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.preferred.plausible[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_plausible-preferred 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.preferred.possible[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_possible-preferred 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.preferred.preposterous[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_preposterous-preferred 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.prevent[_ngcontent-%COMP%]   text[_ngcontent-%COMP%] {
  fill: #F73C3C;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.prevent[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {
  stroke: #F73C3C;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.prevent.probable[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_probable-prevent 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.prevent.plausible[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_plausible-prevent 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.prevent.possible[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_possible-prevent 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .cone[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   .cone-line.prevent.preposterous[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_preposterous-prevent 1s ease-in-out 2s forwards;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%] {
  aspect-ratio: 53/100;
  height: 48%;
  position: relative;
  display: flex;
  transition: transform 1s ease-in-out;
  transition-property: transform, height;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin[_ngcontent-%COMP%] {
  width: 3.87vh;
  height: 12.84vh;
  position: absolute;
  transition: opacity 0.5s ease-in-out;
  transition-property:
    opacity,
    transform,
    top,
    left,
    right;
  opacity: 0;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], 
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin.prefer[_ngcontent-%COMP%] {
  top: 50%;
  left: 0;
  transform: translateY(-4vh) rotate(90deg) scale(0.8) translateY(2vh);
  transform-origin: top left;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin.prefer.selected[_ngcontent-%COMP%] {
  left: 2vh;
  top: -7vh;
  transform: translateY(0) rotate(-12deg) scale(1) translateY(0);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin.prevent[_ngcontent-%COMP%] {
  top: 50%;
  right: 0;
  transform-origin: top right;
  transform: translateY(-4vh) rotate(270deg) scale(0.8) translateY(2vh);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .item-image[_ngcontent-%COMP%]   .clothespin.prevent.selected[_ngcontent-%COMP%] {
  right: 2vh;
  top: -4vh;
  transform: translateY(0) rotate(16deg) scale(1) translateY(0);
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .clothespin-text[_ngcontent-%COMP%] {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  leading-trim: both;
  text-edge: cap;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  width: 150px;
  text-align: center;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .clothespin-text.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .clothespin-text.prefer[_ngcontent-%COMP%] {
  color: #698CFF;
}
[_nghost-%COMP%]   .image-overlay[_ngcontent-%COMP%]   .clothespin-text.prevent[_ngcontent-%COMP%] {
  color: #F73C3C;
}
[_nghost-%COMP%]   .image-overlay.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes _ngcontent-%COMP%_projected-intro {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes _ngcontent-%COMP%_no-transform {
  to {
    transform: translate(0, 0);
  }
}
@keyframes _ngcontent-%COMP%_probable-preferred {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(-8deg);
  }
}
@keyframes _ngcontent-%COMP%_probable-prevent {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(8deg);
  }
}
@keyframes _ngcontent-%COMP%_plausible-preferred {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(-16deg);
  }
}
@keyframes _ngcontent-%COMP%_plausible-prevent {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(16deg);
  }
}
@keyframes _ngcontent-%COMP%_possible-preferred {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(-24deg);
  }
}
@keyframes _ngcontent-%COMP%_possible-prevent {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(24deg);
  }
}
@keyframes _ngcontent-%COMP%_preposterous-preferred {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(-32deg);
  }
}
@keyframes _ngcontent-%COMP%_preposterous-prevent {
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: rotate(32deg);
  }
}`]});};var ar=class t{constructor(e,n){this.locale_=e;this.http=n;this.locale.set(e.split("-")[0]),se(()=>{let i=this.aboutUrl();console.log("About URL:",i),i&&this.http.get(i,{responseType:"text"}).subscribe(o=>{let s=ht(o);this.content.set(s);});});}prefix="";locale=X(null);aboutUrl=It(()=>{let e=this.prefix_(),n=this.locale();return!n||e===null?null:`/abouts/${e}${n}.md`;});_=ht;content=X("");prefix_=X(null);ngOnInit(){this.ngOnChanges();}ngOnChanges(){console.log("Prefix changed:",this.prefix),this.prefix_.set(this.prefix);}static ɵfac=function(n){return new(n||t)(et(Gi),et(rn));};static ɵcmp=_t({type:t,selectors:[["app-about"]],inputs:{prefix:"prefix"},features:[xc],decls:2,vars:1,consts:[[1,"container"],[1,"content",3,"innerHTML"]],template:function(n,i){n&1&&(D(0,"div",0),Y(1,"div",1),G()),n&2&&(j(),dt("innerHTML",i.content(),go));},styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #FFFDF6;
  display: flex;
}
.container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%] {
  padding: 24px;
  height: fit-content;
}
.container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]  {
  font-family:
    "Readex Pro",
    "Miriam Libre",
    "Source Sans 3",
    sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  leading-trim: both;
  text-edge: cap;
  color: #4E02B2;
  font-size: 18px;
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]  * {
  margin: 0;
  padding: 0;
}
.container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]  h1 {
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 16px;
}
.container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]  h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.container[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]  p {
  margin-bottom: 8px;
}`]});};var T_=["mapContainer"];function w_(t,e){if(t&1&&Y(0,"app-output-map",4),t&2){let n=Et();dt("tag",n.tag());}}function O_(t,e){if(t&1){let n=Dt();D(0,"div",15)(1,"div",16)(2,"a",17),St("click",function(){Tt(n);let o=Et();return wt(o.state.aboutVisible.set(!1));}),Y(3,"div",18)(4,"div",9),G()(),Y(5,"app-about"),G();}}var gs=class t{constructor(e,n,i,o,s){this.platform=e;this.destroyRef=n;this.route=i;this.api=o;this.state=s;this.api.updateFromRoute(i.snapshot),this.platform.browser(()=>{this.browser=!0;}),this.route.queryParams.subscribe(l=>{let h=l.tag||"main";this.tag.set(h);}),this.route.fragment.pipe(be(this.destroyRef),Ce(1)).subscribe(l=>{l==="about"&&(this.mainMenuOpen.set(!0),this.state.aboutVisible.set(!0));});}tag=X("main");mainMenuOpen=X(!1);browser=!1;mapContainer;outputMap;ngAfterViewInit(){this.platform.browser(()=>{new fo(e=>{let n=new ResizeObserver(o=>{e.next(o);});return n.observe(this.mapContainer.nativeElement),()=>{n.disconnect();};}).pipe(be(this.destroyRef)).subscribe(e=>{if(e[0]){let i=this.outputMap.map();if(i){let o=i.getCenter();i.invalidateSize(),i.flyTo(o);}}});});}static ɵfac=function(n){return new(n||t)(et(jt),et(Xn),et(me),et(Ht),et(ae));};static ɵcmp=_t({type:t,selectors:[["app-home"]],viewQuery:function(n,i){if(n&1&&(Wt(T_,5),Wt(Ye,5)),n&2){let o;qt(o=Yt())&&(i.mapContainer=o.first),qt(o=Yt())&&(i.outputMap=o.first);}},decls:17,vars:10,consts:()=>{let e;return e="MENU",[["mapContainer",""],e,[1,"container"],[1,"map"],[3,"tag"],[1,"borders",3,"click"],[1,"border","b1"],[1,"border","b2"],[1,"border","b3"],[1,"logo"],[1,"menu-button",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","24","height","25","viewBox","0 0 24 25","fill","none",1,"button"],["d","M7.375 9.51953L12.375 14.5195L17.375 9.51953","stroke","#6C707B","stroke-width","1.5","stroke-linecap","round"],[1,"menu-container"],[3,"explore"],[1,"about"],[1,"about-header"],[3,"click"],[1,"back"]];},template:function(n,i){if(n&1){let o=Dt();D(0,"div",2)(1,"div",3,0),Nt(3,w_,1,1,"app-output-map",4),D(4,"div",5),St("click",function(){return Tt(o),wt(i.mainMenuOpen.set(!1));}),Y(5,"div",6)(6,"div",7)(7,"div",8),G(),Y(8,"div",9),D(9,"div",10),St("click",function(){return Tt(o),wt(i.mainMenuOpen.set(!i.mainMenuOpen()));}),Ot(),D(10,"svg",11),Y(11,"path",12),G(),Gt(),D(12,"span"),ct(13,1),G()()(),D(14,"div",13)(15,"app-main-menu",14),St("explore",function(){return Tt(o),wt(i.mainMenuOpen.set(!1));}),G()(),Nt(16,O_,6,0,"div",15),G();}n&2&&(j(3),kt(i.browser?3:-1),j(),yt("fullscreen",!i.mainMenuOpen()),j(4),yt("fullscreen",!i.mainMenuOpen()),j(2),yt("open",i.mainMenuOpen()),j(4),ye("height",i.mainMenuOpen()?i.state.mainMenuHeight():0,"px"),j(2),kt(i.state.aboutVisible()?16:-1));},dependencies:[Ye,rr,ar],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: stretch;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%] {
  flex: 1 1 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .borders[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease-in-out;
  background-color: rgba(255, 253, 246, 0.75);
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .borders.fullscreen[_ngcontent-%COMP%] {
  background-color: rgba(255, 253, 246, 0);
  pointer-events: none;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .borders[_ngcontent-%COMP%]   .border[_ngcontent-%COMP%] {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .borders[_ngcontent-%COMP%]   .border.b1[_ngcontent-%COMP%] {
  z-index: 900;
  border: 3px solid #4E02B2;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .borders[_ngcontent-%COMP%]   .border.b2[_ngcontent-%COMP%] {
  z-index: 901;
  border: 2px dashed #FFFDF6;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .borders[_ngcontent-%COMP%]   .border.b3[_ngcontent-%COMP%] {
  z-index: 902;
  border: 1px solid #4E02B2;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   app-output-map[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  position: relative;
  flex: 1 1 100%;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .menu-button[_ngcontent-%COMP%] {
  position: absolute;
  z-index: 1000;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 52px;
  display: flex;
  flex-flow: row nowrap;
  gap: 4px;
  align-items: center;
  color: #6C707B;
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
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .menu-button[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .menu-button[_ngcontent-%COMP%]   .button.open[_ngcontent-%COMP%] {
  transform: rotate(0deg);
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  transition: all 0.3s ease-in-out;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 165px;
  height: 138px;
  background-image: url("./media/futures-map-logo-UYVZA7QU.svg");
}
.container[_ngcontent-%COMP%]   .map[_ngcontent-%COMP%]   .logo.fullscreen[_ngcontent-%COMP%] {
  top: 16px;
  transform: translateX(-50%) translateY(0);
}
.container[_ngcontent-%COMP%]   .menu-container[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  transition: height 0.3s ease-in-out;
}
.container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  z-index: 2000;
}
.container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about-header[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 52px;
  gap: 8px;
  animation: _ngcontent-%COMP%_slideInDown 0.3s ease-in-out;
  background-color: #FFFDF6;
  padding: 0 16px;
  border-bottom: 1px solid #F1E5F3;
}
.container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
}
.container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  background-image: url("./media/icon-back-FAO6AZBV.svg");
}
.container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .about-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {
  width: 132px;
  height: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/logo-futures-VIS6UZMX.svg");
  pointer-events: none;
}
.container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   app-about[_ngcontent-%COMP%] {
  flex: 1 1 auto;
  animation: _ngcontent-%COMP%_slideInUp 0.3s ease-in-out;
  overflow: hidden;
}`]});};var _s=class t{static ɵfac=function(n){return new(n||t)();};static ɵcmp=_t({type:t,selectors:[["app-pps25"]],decls:4,vars:2,consts:[[1,"container"],[1,"map-container"],["language","hebrew",3,"tag","doLoop"],[1,"frame"]],template:function(n,i){n&1&&(D(0,"div",0)(1,"div",1),Y(2,"app-output-map",2),G(),Y(3,"div",3),G()),n&2&&(j(2),dt("tag","its_time")("doLoop",!0));},dependencies:[Ye],styles:[`

[_nghost-%COMP%] {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #FFFDF6;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%]   .map-container[_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 252px;
  overflow: hidden;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  background-image: url("./media/pps25-screen-frame-w-YZA6GP5U.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}`]});};var vs=class t{static ɵfac=function(n){return new(n||t)();};static ɵcmp=_t({type:t,selectors:[["app-pps25v"]],decls:4,vars:2,consts:[[1,"container"],[1,"map-container"],["language","hebrew",3,"tag","doLoop"],[1,"frame"]],template:function(n,i){n&1&&(D(0,"div",0)(1,"div",1),Y(2,"app-output-map",2),G(),Y(3,"div",3),G()),n&2&&(j(2),dt("tag","its_time")("doLoop",!0));},dependencies:[Ye],styles:[`

[_nghost-%COMP%] {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #FFFDF6;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%]   .map-container[_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 252px;
  overflow: hidden;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  background-image: url("./media/pps25-screen-frame-LFMNTZKR.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}`]});};var ys=class t{static ɵfac=function(n){return new(n||t)();};static ɵcmp=_t({type:t,selectors:[["app-jma25"]],decls:4,vars:2,consts:[[1,"container"],[1,"map-container"],["language","dutch",3,"tag","doLoop"],[1,"frame"]],template:function(n,i){n&1&&(D(0,"div",0)(1,"div",1),Y(2,"app-output-map",2),G(),Y(3,"div",3),G()),n&2&&(j(2),dt("tag","jma25")("doLoop",!0));},dependencies:[Ye],styles:[`

[_nghost-%COMP%] {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #FFFDF6;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%]   .map-container[_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
[_nghost-%COMP%]   .container[_ngcontent-%COMP%]   .frame[_ngcontent-%COMP%] {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  background-image: url("./media/screen-frame-jma-5QASPRSV.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}`]});};function k_(t,e){t&1&&(D(0,"span",18),ct(1,1),G());}function A_(t,e){if(t&1&&(D(0,"span",16),ct(1,0),G(),Nt(2,k_,2,0,"span",18)),t&2){let n=Et();j(2),kt(n.secondary()?2:-1);}}function I_(t,e){t&1&&(D(0,"span",16),ct(1,3),G());}function L_(t,e){if(t&1&&(D(0,"span",18),ct(1,2),G(),Nt(2,I_,2,0,"span",16)),t&2){let n=Et();j(2),kt(n.secondary()?2:-1);}}function R_(t,e){if(t&1){let n=Dt();D(0,"div",21)(1,"div",23),St("click",function(){Tt(n);let o=Et();return wt(o.primary.set("prefer"));}),Y(2,"img",24),D(3,"span"),ct(4,4),G()(),D(5,"div",25),St("click",function(){Tt(n);let o=Et();return wt(o.primary.set("prevent"));}),Y(6,"img",26),D(7,"span"),ct(8,5),G()()();}}function F_(t,e){t&1&&(D(0,"span"),ct(1,8),G(),Pe(2,"\xA0"),D(3,"strong"),ct(4,9),G(),Pe(5,"\xA0"),D(6,"span"),ct(7,10),G());}function N_(t,e){t&1&&(D(0,"span"),ct(1,11),G(),Pe(2,"\xA0"),D(3,"strong"),ct(4,12),G(),Pe(5,"\xA0"),D(6,"span"),ct(7,13),G());}function B_(t,e){if(t&1){let n=Dt();D(0,"div",22)(1,"div"),Y(2,"div",27),D(3,"div",28)(4,"input",29),gi("ngModelChange",function(o){Tt(n);let s=Et();return mi(s.secondary,o)||(s.secondary=o),wt(o);}),G(),D(5,"span"),Nt(6,F_,8,0)(7,N_,8,0),G()()(),D(8,"div",30)(9,"div",31),St("click",function(){Tt(n);let o=Et();return wt(o.clear());}),Ot(),D(10,"svg",32),Y(11,"path",33)(12,"path",34),G(),Gt(),D(13,"span"),ct(14,6),G()(),D(15,"div",35),St("click",function(){Tt(n);let o=Et();return wt(o.submit());}),D(16,"span"),ct(17,7),G()()()();}if(t&2){let n=Et();j(),_o("ish "+n.primary()),j(),yt("visible",!n.secondary()),j(2),di("ngModel",n.secondary),j(2),kt(n.primary()==="prefer"?6:n.primary()==="prevent"?7:-1);}}var Ps=class t{constructor(e,n){this.state=e;this.api=n;}done=new Jn();primary=X(null);secondary=X(!1);primarySelected=It(()=>this.primary()!==null);imageUrl=It(()=>this.state.currentImageUrl()||this.api.item()?.screenshot_url||null);message=It(()=>{let e="",n=this.primary(),i=this.secondary();return n==="prefer"?e+="Gewenst":n==="prevent"&&(e+="Gevreesd"),i&&(e+="(deels)"),e;});clear(){this.primary.set(null),this.secondary.set(!1);}submit(){let e=this.primary();if(!e)return;let n={favorable_future:e};this.secondary()&&(n.favorable_future="mostly "+n.favorable_future);let i=this.message();this.done.emit({message:i,props:n});}static ɵfac=function(n){return new(n||t)(et(ae),et(Ht));};static ɵcmp=_t({type:t,selectors:[["app-collect-properties-favorable"]],outputs:{done:"done"},decls:11,vars:9,consts:()=>{let e;e="Gewenst";let n;n="(deels)";let i;i="Gevreesd";let o;o="(deels)";let s;s="Gewenst";let l;l="Gevreesd";let h;h="Ongedaan maken";let p;p="Doorgaan";let u;u="Maar een deel hiervan zou ik willen";let m;m="Voorkomen";let b;b="\xA0";let d;d="Maar een deel hiervan zou ik nog steeds";let g;g="Wensen";let E;return E="\xA0",[e,n,i,o,s,l,h,p,u,m,b,d,g,E,[1,"container"],[1,"pins"],[1,"prefer"],[1,"label"],[1,"prevent"],[1,"img"],["alt","Confirmation Image",3,"src"],[1,"initial"],[1,"selected"],[1,"prefer",3,"click"],["ngSrc","/img-pin-prefer-h.svg","priority","","width","105px","height","28px",1,"img"],[1,"prevent",3,"click"],["ngSrc","/img-pin-prevent-h.svg","priority","","width","105px","height","28px",1,"img"],[1,"pin"],[1,"ish-select"],["type","checkbox",3,"ngModelChange","ngModel"],[1,"controls"],[1,"undo",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","25","height","25","viewBox","0 0 25 25","fill","none"],["d","M7.14716 12.0595C7.14714 13.5462 7.71432 15.033 8.84869 16.1673C11.1174 18.436 14.7957 18.436 17.0644 16.1673C19.3331 13.8986 19.3331 10.2203 17.0644 7.95161C15.93 6.81725 14.4433 6.25007 12.9565 6.25009C12.1998 6.25008 10.4462 6.35411 10.4462 6.35411","stroke","#6C707B","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M12.1597 4.20703L10.0422 6.32452L12.1597 8.44201","stroke","#6C707B","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],[1,"submit",3,"click"]];},template:function(n,i){n&1&&(D(0,"div",14)(1,"div",15),Y(2,"div",16),D(3,"div",17),Nt(4,A_,3,1)(5,L_,3,1),G(),Y(6,"div",18),G(),D(7,"div",19),Y(8,"img",20),G(),Nt(9,R_,9,0,"div",21)(10,B_,18,6,"div",22),G()),n&2&&(j(2),yt("visible",i.primary()==="prefer"||i.primary()==="prevent"&&i.secondary()),j(),yt("visible",i.primarySelected()),j(),kt(i.primary()==="prefer"?4:i.primary()==="prevent"?5:-1),j(2),yt("visible",i.primary()==="prevent"||i.primary()==="prefer"&&i.secondary()),j(2),dt("src",i.imageUrl(),De),j(),kt(i.primarySelected()?10:9));},dependencies:[ji,yo,Ui,Hi,kc],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  gap: 15px;
  padding: 16px 0;
  padding-bottom: 0;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  height: 50px;
  display: flex;
  width: 100%;
  position: relative;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {
  transition: opacity 1s ease-in-out;
  opacity: 0;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]   .visible[_ngcontent-%COMP%] {
  opacity: 1;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
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
  font-size: 18px;
  font-weight: 700;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]   .prefer[_ngcontent-%COMP%] {
  color: #0030CC;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]   .prevent[_ngcontent-%COMP%] {
  color: #B50F0F;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]    > .prefer[_ngcontent-%COMP%], 
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]    > .prevent[_ngcontent-%COMP%] {
  position: absolute;
  top: 0px;
  left: 50%;
  width: 28px;
  height: 105px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]    > .prefer[_ngcontent-%COMP%] {
  transform: translateX(-108px) rotate(-13deg);
  background-image: url("./media/img-pin-prefer-v-6BJXLG6S.svg");
}
.container[_ngcontent-%COMP%]   .pins[_ngcontent-%COMP%]    > .prevent[_ngcontent-%COMP%] {
  transform: translateX(70px) translateY(10px) rotate(15deg);
  background-image: url("./media/img-pin-prevent-v-A4RVBFLH.svg");
}
.container[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%] {
  flex: 1 1 auto;
  overflow: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
}
.container[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  object-fit: contain;
  object-position: center;
  width: 50%;
}
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%], 
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding: 16px;
}
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  gap: 20px;
  height: fit-content;
  justify-content: center;
}
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%]   .prefer[_ngcontent-%COMP%], 
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%]   .prevent[_ngcontent-%COMP%] {
  display: flex;
  width: 145px;
  height: 145px;
  border-radius: 80px;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 25px;
  gap: 8px;
  animation: _ngcontent-%COMP%_slideInUp2 0.5s ease-out forwards;
  transform: translateY(200%);
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
  font-size: 18px;
  font-weight: 700;
  position: relative;
  background-color: rgba(255, 253, 246, 0.75);
  border: 2px solid black;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%]   .prefer[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%], 
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%]   .prevent[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 105px;
  height: 28px;
}
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%]   .prefer[_ngcontent-%COMP%] {
  border-color: rgba(105, 140, 255, 0.15);
  color: #0030CC;
}
.container[_ngcontent-%COMP%]   .initial[_ngcontent-%COMP%]   .prevent[_ngcontent-%COMP%] {
  border-color: rgba(247, 60, 60, 0.15);
  color: #B50F0F;
  animation-delay: 1s;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  display: flex;
  flex-flow: column nowrap;
  height: fit-content;
  width: 100%;
  padding: 0;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-top: 24px;
  background: rgba(255, 253, 246, 0.75);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%]   .pin[_ngcontent-%COMP%] {
  height: 14px;
  width: 52px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: opacity 1s ease-in-out;
  opacity: 0;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%]   .pin.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
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
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  font-weight: 700;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prefer[_ngcontent-%COMP%]   .pin[_ngcontent-%COMP%] {
  background-image: url("./media/img-pin-prevent-h-WLA2BAFB.svg");
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prefer[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%] {
  color: #B50F0F;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prefer[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  color: #B50F0F;
  background-color: rgba(247, 60, 60, 0.15);
  width: 24px;
  height: 24px;
  border: 2px solid #B50F0F;
  border-radius: 4px;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prefer[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:checked {
  background-color: #B50F0F;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/icon-check-white-FZEHZEKN.svg");
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prevent[_ngcontent-%COMP%]   .pin[_ngcontent-%COMP%] {
  background-image: url("./media/img-pin-prefer-h-5YUBVJU6.svg");
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prevent[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%] {
  color: #0030CC;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prevent[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  color: #0030CC;
  background-color: rgba(105, 140, 255, 0.15);
  width: 24px;
  height: 24px;
  border: 2px solid #0030CC;
  border-radius: 4px;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .ish.prevent[_ngcontent-%COMP%]   .ish-select[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:checked {
  background-color: #0030CC;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/icon-check-white-FZEHZEKN.svg");
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%] {
  padding: 12px 16px;
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  align-items: center;
  background-color: #FFFDF6;
  border-top: 1px solid #EDECEC;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   .undo[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  color: #6C707B;
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
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]   .controls[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%] {
  display: flex;
  height: 52px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  border-radius: 16px;
  background: #4E02B2;
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
  font-size: 16px;
  font-weight: 700;
}`]});};function D_(t,e){if(t&1){let n=Dt();D(0,"div",2),Y(1,"div",3),D(2,"div",4),St("click",function(){let o=Tt(n).$implicit,s=Et();return wt(s.submit(o));}),D(3,"span"),Pe(4),G(),D(5,"span"),Pe(6),G()()();}if(t&2){let n=e.$implicit,i=Et();ye("transform","rotate("+(i.prefer?-1:1)*(100-n.value)*.32+"deg)"),yt("prefer",!!i.prefer)("prevent",!i.prefer),j(),ye("animation-delay",500-n.value*5+1e3,"ms"),yt("dashed",n.dashed),j(3),ui(n.label),j(2),ui(n.description);}}var Cs=class t{constructor(e,n){this.state=e;this.api=n;}prefer=!0;done=new Jn();LABELS=[{label:"Verwacht",description:"Zal wel gebeuren",value:100},{label:"Waarschijnlijk",description:"Zou best kunnen",value:75},{label:"Geloofwaardig",description:"Kan ook nog",value:50},{label:"Voorstelbaar",description:"Niet onmogelijk",value:25},{label:"Absurd",description:"Hoogs onwaarschijnlijk",value:0,dashed:!0}];imageUrl=It(()=>this.state.currentImageUrl()||this.api.item()?.screenshot_url||null);submit(e){let n=e.label,i={plausibility:e.value};this.done.emit({message:n,props:i});}static ɵfac=function(n){return new(n||t)(et(ae),et(Ht));};static ɵcmp=_t({type:t,selectors:[["app-collect-properties-potential"]],inputs:{prefer:"prefer"},outputs:{done:"done"},decls:3,vars:0,consts:[[1,"container"],[1,"cone-line",3,"prefer","prevent","transform"],[1,"cone-line"],[1,"string"],[1,"label",3,"click"]],template:function(n,i){n&1&&(D(0,"div",0),en(1,D_,7,12,"div",1,Mn),G()),n&2&&(j(),nn(i.LABELS));},styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 15px;
  position: relative;
  padding: 16px 0;
}
.container[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%] {
  position: absolute;
  left: calc(108px - 496px);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  transform-origin: left center;
}
.container[_ngcontent-%COMP%]   .cone-line.prefer[_ngcontent-%COMP%] {
  bottom: 20px;
}
.container[_ngcontent-%COMP%]   .cone-line.prevent[_ngcontent-%COMP%] {
  top: 20px;
}
.container[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%]   .string[_ngcontent-%COMP%] {
  width: 0px;
  height: 0px;
  border-top: 2px solid currentColor;
  animation: _ngcontent-%COMP%_elongate 0.3s ease-out forwards;
}
.container[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%]   .string.dashed[_ngcontent-%COMP%] {
  border-top-style: dashed;
}
.container[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  padding: 0px 16px;
  height: 62px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
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
  font-size: 18px;
  border-radius: 0px 8px 8px 0px;
  white-space: nowrap;
  border-left: 1px solid currentColor;
}
.container[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {
  font-weight: 700;
}
.container[_ngcontent-%COMP%]   .cone-line[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .cone-line.prefer[_ngcontent-%COMP%] {
  color: #698CFF;
}
.container[_ngcontent-%COMP%]   .cone-line.prefer[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #0030CC;
  background-color: rgba(105, 140, 255, 0.15);
}
.container[_ngcontent-%COMP%]   .cone-line.prevent[_ngcontent-%COMP%] {
  color: #F73C3C;
}
.container[_ngcontent-%COMP%]   .cone-line.prevent[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {
  color: #B50F0F;
  background-color: rgba(247, 60, 60, 0.15);
}
@keyframes _ngcontent-%COMP%_elongate {
  from {
    width: 0px;
  }
  to {
    width: 496px;
  }
}`]});};var xs=class t{done=new Jn();email=X(null);emailSubscribe=X(!0);localStorage=typeof localStorage<"u"?localStorage:null;submit(){let e=this.email();e&&(this.localStorage?.setItem("mapfutures-email",e),this.localStorage?.setItem("mapfutures-email-subscribe",this.emailSubscribe()?"true":"false"),this.done.emit({message:e,props:{_private_email:e,_private_email_subscribe:this.emailSubscribe()}}));}noThanks(){this.done.emit({message:"Nee bedankt",props:{_private_refused_email:!0}});}static ɵfac=function(n){return new(n||t)();};static ɵcmp=_t({type:t,selectors:[["app-collect-email"]],outputs:{done:"done"},decls:16,vars:4,consts:()=>{let e;e="Je e-mail";let n;n="Ik ontvang graag inspiratie voor hoopvol activisme en politieke verbeelding in mijn inbox.";let i;i="Nee bedankt";let o;return o="Stuur link",[["emailEl",""],n,i,o,[1,"container"],[1,"form"],["type","email","placeholder",e,3,"ngModelChange","ngModel"],[1,"opt-in"],["type","checkbox",3,"ngModelChange","ngModel"],["for","emailSubscribe"],[1,"submit-buttons"],[1,"no-thanks",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","25","height","25","viewBox","0 0 25 25","fill","none"],["d","M13.9546 2.06738C14.5011 2.11022 15.027 2.30271 15.4741 2.625C15.985 2.99323 16.3668 3.51288 16.5659 4.11035L16.8823 5.05859H20.6616C21.2139 5.05859 21.6616 5.50631 21.6616 6.05859C21.6616 6.61088 21.2139 7.05859 20.6616 7.05859H19.5923L18.7241 19.2012C18.6881 19.7054 18.4621 20.1769 18.0923 20.5215C17.7685 20.8232 17.3555 21.0083 16.9185 21.0498L16.73 21.0586H8.59033C8.08508 21.0578 7.59852 20.866 7.229 20.5215C6.8596 20.1769 6.63415 19.705 6.59814 19.2012L5.73096 7.05859H4.66162C4.10934 7.05859 3.66162 6.61088 3.66162 6.05859C3.66162 5.50631 4.10934 5.05859 4.66162 5.05859H8.44092L8.75732 4.11035L8.84033 3.89062C9.05369 3.38591 9.40127 2.94726 9.84814 2.625C10.3588 2.25678 10.9725 2.05882 11.6021 2.05859H13.7192L13.9546 2.06738ZM8.59326 19.0586H16.729L17.5874 7.05859H7.73486L8.59326 19.0586ZM9.95459 10.3516C10.3207 9.98545 10.8997 9.96285 11.2925 10.2832L11.3687 10.3516L12.6616 11.6445L13.9546 10.3516L14.0308 10.2832C14.4235 9.96285 15.0025 9.98545 15.3687 10.3516C15.7348 10.7177 15.7574 11.2967 15.437 11.6895L15.3687 11.7656L14.0757 13.0586L15.3687 14.3516L15.437 14.4277C15.7574 14.8205 15.7348 15.3995 15.3687 15.7656C15.0025 16.1317 14.4235 16.1543 14.0308 15.834L13.9546 15.7656L12.6616 14.4727L11.3687 15.7656L11.2925 15.834C10.8997 16.1543 10.3207 16.1317 9.95459 15.7656C9.58847 15.3995 9.56588 14.8205 9.88623 14.4277L9.95459 14.3516L11.2476 13.0586L9.95459 11.7656L9.88623 11.6895C9.56588 11.2967 9.58847 10.7177 9.95459 10.3516ZM11.4468 4.07129C11.2928 4.09567 11.1457 4.15508 11.0181 4.24707C10.848 4.36973 10.7212 4.54327 10.6548 4.74219V4.74316L10.5493 5.05859H14.7739L14.6685 4.74316V4.74219C14.6021 4.54323 14.4753 4.36973 14.3052 4.24707C14.1773 4.15493 14.0297 4.09556 13.8755 4.07129L13.7202 4.05859H11.603L11.4468 4.07129Z","fill","#6C707B"],[1,"submit",3,"click"]];},template:function(n,i){if(n&1){let o=Dt();D(0,"div",4)(1,"div",5)(2,"input",6,0),gi("ngModelChange",function(l){return Tt(o),mi(i.email,l)||(i.email=l),wt(l);}),G(),D(4,"div",7)(5,"input",8),gi("ngModelChange",function(l){return Tt(o),mi(i.emailSubscribe,l)||(i.emailSubscribe=l),wt(l);}),G(),D(6,"label",9),ct(7,1),G()()(),D(8,"div",10)(9,"div",11),St("click",function(){return Tt(o),wt(i.noThanks());}),Ot(),D(10,"svg",12),Y(11,"path",13),G(),Gt(),D(12,"span"),ct(13,2),G()(),D(14,"div",14),St("click",function(){Tt(o);let l=xr(3);return wt(i.email()&&l.validity.valid?i.submit():null);}),ct(15,3),G()()();}if(n&2){let o=xr(3);j(2),di("ngModel",i.email),j(3),di("ngModel",i.emailSubscribe),j(9),yt("enabled",i.email()&&o.validity.valid);}},dependencies:[ji,Po,yo,Ui,Hi],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  gap: 14px;
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%] {
  padding: 0 32px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%] {
  height: 56px;
  width: 100%;
  padding: 8px 24px;
  border-radius: 16px;
  border: 2px solid #B969FF;
  background: #FFFFFF;
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
  font-weight: 400;
  color: #4E02B2;
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%]:placeholder-shown {
  color: #6C707B;
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .opt-in[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  gap: 8px;
  padding: 0 8px;
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .opt-in[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  flex: 0 0 auto;
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  font: inherit;
  color: #6C707B;
  background-color: rgba(108, 112, 123, 0.15);
  width: 24px;
  height: 24px;
  border: 2px solid #6C707B;
  border-radius: 4px;
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .opt-in[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:checked {
  background-color: #6C707B;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url("./media/icon-check-white-FZEHZEKN.svg");
}
.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   .opt-in[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  color: #6C707B;
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
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .submit-buttons[_ngcontent-%COMP%] {
  padding: 12px 16px;
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  justify-content: center;
  border-top: 1px solid #EDECEC;
  width: 100%;
}
.container[_ngcontent-%COMP%]   .submit-buttons[_ngcontent-%COMP%]   .no-thanks[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: row nowrap;
  white-space: nowrap;
  padding: 0px 8px;
  align-items: center;
  gap: 4px;
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
  font-weight: 400;
  color: #6C707B;
}
.container[_ngcontent-%COMP%]   .submit-buttons[_ngcontent-%COMP%]   .no-thanks[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
}
.container[_ngcontent-%COMP%]   .submit-buttons[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%] {
  display: flex;
  height: 52px;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  border-radius: 16px;
  background: #EDECEC;
  color: #6C707B;
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
  font-weight: 400;
}
.container[_ngcontent-%COMP%]   .submit-buttons[_ngcontent-%COMP%]   .submit.enabled[_ngcontent-%COMP%] {
  background: #4E02B2;
  color: #FFFFFF;
  font-weight: 700;
}`]});};var z_=()=>["/"],V_=()=>({key:null}),bs=class t{static ɵfac=function(n){return new(n||t)();};static ɵcmp=_t({type:t,selectors:[["app-direct-to-map"]],decls:8,vars:4,consts:()=>{let e;return e="Laat het me zien",[e,[1,"container"],["ltr","",1,"buttons"],["queryParamsHandling","merge",1,"button","primary",3,"routerLink","queryParams"],["xmlns","http://www.w3.org/2000/svg","width","25","height","24","viewBox","0 0 25 24","fill","none"],["d","M16.25 6.99872V16.4987M9.25 16.9987V8.49872M4.271 6.71472L8.824 4.23171C8.95671 4.15924 9.10414 4.11781 9.25517 4.11053C9.40621 4.10326 9.55693 4.13033 9.696 4.18972L15.804 6.80772C15.9431 6.8671 16.0938 6.89417 16.2448 6.8869C16.3959 6.87962 16.5433 6.83819 16.676 6.76572L20.271 4.80572C20.4233 4.7226 20.5946 4.68055 20.7681 4.68369C20.9416 4.68684 21.1113 4.73506 21.2605 4.82364C21.4097 4.91221 21.5333 5.03808 21.6191 5.18887C21.7049 5.33967 21.75 5.5102 21.75 5.68372V16.4047C21.75 16.5844 21.7017 16.7607 21.61 16.9152C21.5183 17.0697 21.3867 17.1967 21.229 17.2827L16.676 19.7657C16.5433 19.8382 16.3959 19.8796 16.2448 19.8869C16.0938 19.8942 15.9431 19.8671 15.804 19.8077L9.696 17.1887C9.55693 17.1293 9.40621 17.1023 9.25517 17.1095C9.10414 17.1168 8.95671 17.1582 8.824 17.2307L5.229 19.1907C5.07676 19.2738 4.90554 19.3158 4.73214 19.3127C4.55874 19.3096 4.38913 19.2615 4.23996 19.1731C4.09079 19.0846 3.96718 18.9589 3.88128 18.8082C3.79538 18.6575 3.75014 18.4871 3.75 18.3137V7.59371C3.74997 7.41406 3.79833 7.23772 3.89001 7.08322C3.98169 6.92872 4.1133 6.80077 4.271 6.71472Z","stroke","#ffffff","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"]];},template:function(n,i){n&1&&(D(0,"div",1),Y(1,"app-completion-image"),D(2,"div",2)(3,"a",3),Ot(),D(4,"svg",4),Y(5,"path",5),G(),Gt(),D(6,"span"),ct(7,0),G()()()()),n&2&&(j(3),dt("routerLink",Jt(2,z_))("queryParams",Jt(3,V_)));},dependencies:[on,or],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.container[_ngcontent-%COMP%] {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  position: relative;
}
.container[_ngcontent-%COMP%]   app-completion-image[_ngcontent-%COMP%] {
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  height: 100%;
}
.container[_ngcontent-%COMP%]   .buttons[_ngcontent-%COMP%] {
  padding: 12px 16px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: #FFFDF6;
  border-top: 1px solid #EDECEC;
}`]});};function $_(t,e){if(t&1){let n=Dt();D(0,"app-collect-properties-favorable",5),St("done",function(o){Tt(n);let s=Et();return wt(s.completeStep(o));}),G();}}function G_(t,e){if(t&1){let n=Dt();D(0,"app-collect-properties-potential",6),St("done",function(o){Tt(n);let s=Et();return wt(s.completeStep(o));}),G();}if(t&2){let n=Et();dt("prefer",!!n.prefer());}}function U_(t,e){if(t&1){let n=Dt();D(0,"app-collect-email",5),St("done",function(o){Tt(n);let s=Et();return wt(s.completeStep(o));}),G();}}function H_(t,e){if(t&1&&Y(0,"app-complete-evaluation",4),t&2){Et();let n=xr(1);dt("thinking",n.thinking());}}function j_(t,e){t&1&&Y(0,"app-direct-to-map");}var Es=class t{constructor(e,n,i){this.api=e;this.route=n;this.router=i;this.api.updateFromRoute(this.route.snapshot),this.fragment.set(this.route.snapshot.fragment||null),console.log("FRAGMENT",this.fragment()),se(()=>{let o=this.messages?.messages()||[],s=this.actualSteps(),l=s.length*2-1;if(o.length===l-1){let h=s[s.length-1],p=new Me("ai",h.instructions.replace(":TAGLINE:",this.api.item()?.future_scenario_tagline||"").replace(":EMAIL:",this.api.item()?._private_email||""));this.messages.addMessage(p);}}),se(()=>{let o=this.step(),s=this.api.item();!this.stepInitialized()&&this.viewInit()&&o===-1&&s&&(this.stepInitialized.set(!0),console.log("Step is -1, adding first step"),je(0).subscribe(()=>hi(this,null,function*(){yield this.addStep();})));});}messages;step=X(-1);actualSteps=X([]);steps=[{id:0,instructions:"Is dit een toekomst die je **wenst**, of **vreest**?",skip:()=>this.api.item()?.favorable_future?{}:this.api.isWorkshop()?(console.log("Skipping favorable future step, workshop mode"),{}):null},{id:1,instructions:"En kun je beoordelen hoe waarschijnlijk deze toekomst is?",skip:()=>{let e=this.api.item()?.plausibility;return e!=null&&e>=0?(console.log("Skipping potential step, already set",e),{}):this.api.isWorkshop()?(console.log("Skipping potential step, workshop mode"),{}):(console.log("Potential step not skipped, not set",e),null);}},{id:2,instructions:"Begrepen. Bedankt!\n\nWe analyseren momenteel je screenshot en voegen deze toe aan de Futures Map. Als het klaar is, sturen we je een **link** per **e-mail** zodat je je screenshot altijd kunt vinden, bewerken of verwijderen van de Futures Map.",skip:()=>{let e=this.api.item()?._private_email,n=this.api.item()?._private_refused_email;if(e||n)return{};e=this.localStorage?.getItem("mapfutures-email");let i=this.localStorage?.getItem("mapfutures-email-subscribe")==="true";return e?(this.emailFromStorage=!0,{_private_email:e,_private_email_subscribe:i}):(this.emailRequested=!0,null);}},{id:10,instructions:"",skip:()=>{let e=this.propsUpdate(),n=this.api.itemId(),i=this.api.itemKey();if(console.log("CONSIDERING IF UPDATE IS NEEDED",e),n&&i)for(let o in e){this.api.item.update(s=>Object.assign({},s,e)),console.log("Updating item with props:",e),this.messages.thinking.set(!0),this.api.uploadImageInProgress.pipe(Ze(s=>s===!1),oe(()=>this.api.updateItem(e,n,i)),Ft(()=>{this.messages.thinking.set(!1);})).subscribe();break;}return this.propsUpdate.set({}),{};}},{id:11,instructions:"Perfect! Helemaal klaar.\n\nVerwacht binnenkort een e-mail van **MapFutur.es!**",skip:()=>{let e=this.api.item();return this.emailRequested&&e&&e._private_email?null:{};}},{id:12,instructions:"Begrepen. Bedankt!\n\nWe sturen een andere **link** naar :EMAIL: zodra deze screenshot aan de Futures Map is toegevoegd.",skip:()=>this.emailFromStorage?null:{}},{id:13,instructions:"Je verliest de mogelijkheid om je screenshot te bewerken, te volgen of te verwijderen, maar we zullen er zorgvuldig mee omgaan. **Bedankt**!",skip:()=>{let e=this.api.item();return this.emailRequested&&e&&e._private_refused_email?null:{};}},{id:20,instructions:"",skip:()=>!this.api.isWorkshopFollowup()&&!this.api.isWorkshop()?(console.log("Skipping potential step, not in workshop mode"),{}):(this.router.navigate(["/discuss"],{queryParamsHandling:"preserve"}),null)},{id:21,instructions:"Mooi!\n\nWe hebben \u201C:TAGLINE:\u201D aan de Futures Map toegevoegd!\n\n**Wil je het zien?**",skip:()=>this.api.itemKey()&&this.fragment()==="publish"?null:{}},{id:22,instructions:"We hebben \u201C:TAGLINE:\u201D aan de Futures Map toegevoegd!\n\n**Wil je het zien?**",skip:()=>this.api.itemKey()&&this.fragment()==="publish"?{}:null}];propsUpdate=X({});prefer=It(()=>this.propsUpdate()?.favorable_future.indexOf("prefer")>=0);viewInit=X(!1);stepInitialized=X(!1);fragment=X(null);emailRequested=!1;emailFromStorage=!1;localStorage=typeof localStorage<"u"?localStorage:null;ngAfterViewInit(){this.viewInit.set(!0);}addStep(){return hi(this,null,function*(){let e=this.actualSteps(),n=e.length>0?e[e.length-1].id:-1;for(let i=0;i<this.steps.length;i++){let o=this.steps[i];if(o.id>n){if(o.skip){let s=yield o.skip();if(console.log("Step ID",o.id,"skipped with props?",s),s!==null){this.propsUpdate.update(l=>Object.assign({},l,s));continue;}}console.log("Adding step",o.id,"with instructions",o.instructions),this.actualSteps.update(s=>[...s,o]),this.step.set(o.id);return;}}console.log("No more steps to add, setting step to 99"),this.step.set(99);});}completeStep(e){this.messages.addMessage(new Me("human",e.message)),this.propsUpdate.update(n=>Object.assign({},n,e.props)),this.step.set(99),je(2e3).subscribe(()=>hi(this,null,function*(){yield this.addStep();}));}static ɵfac=function(n){return new(n||t)(et(Ht),et(me),et(xe));};static ɵcmp=_t({type:t,selectors:[["app-collect-properties"]],viewQuery:function(n,i){if(n&1&&Wt(vn,5),n&2){let o;qt(o=Yt())&&(i.messages=o.first);}},decls:8,vars:1,consts:[["messages",""],["ngSkipHydration",""],[1,"spacer"],[3,"prefer"],[3,"thinking"],[3,"done"],[3,"done","prefer"]],template:function(n,i){n&1&&(D(0,"app-messages",1,0)(2,"div",2),Nt(3,$_,1,0,"app-collect-properties-favorable")(4,G_,1,1,"app-collect-properties-potential",3)(5,U_,1,0,"app-collect-email")(6,H_,1,1,"app-complete-evaluation",4)(7,j_,1,0,"app-direct-to-map"),G()()),n&2&&(j(3),kt(i.step()===0?3:i.step()===1?4:i.step()===2?5:i.step()>10&&i.step()<20?6:i.step()>=20&&i.step()<30?7:-1));},dependencies:[vn,Ps,Cs,xs,sr,bs],styles:[`

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
  animation: _ngcontent-%COMP%_fadeInLeft 0.3s ease-in-out;
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
  animation: _ngcontent-%COMP%_fadeInRight 0.3s ease-in-out;
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
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes _ngcontent-%COMP%_fadeInRight {
  from {
    opacity: 0;
    transform: translateX(16px);
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
.spacer[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.spacer[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  overflow: visible;
}`]});};var Ss=class t{constructor(e,n,i){this.router=e;this.auth=n;this.platform=i;}canActivate(e,n){if((e.routeConfig?.path||"").indexOf("admin/moderate")!==-1)return!0;if(this.platform.server())return console.log("On server, skipping auth guard"),!1;let o=e.queryParams.workspace||null;return o?(console.log("Redirecting to workspace-specific admin:",o),this.router.navigate(["/admin/moderate"],{queryParams:$({},e.queryParams)}),!1):this.auth.user.pipe(Ce(1),re(s=>!!s),Ft(s=>{s||(console.log("User not logged in, redirecting to login"),this.router.navigate(["/admin/login"]));}));}static ɵfac=function(n){return new(n||t)(tn(xe),tn(jc),tn(jt));};static ɵprov=Sn({token:t,factory:t.ɵfac,providedIn:"root"});};var qp=[{path:"show/pps25w",component:_s},{path:"show/pps25",component:vs},{path:"show/jma25",component:ys},{path:"show",component:Ye},{path:"showcase-ws",loadComponent:()=>import("./chunk-PL4FG2EE.js").then(t=>t.ShowcaseWsComponent)},{path:"admin/login",loadComponent:()=>import("./chunk-KYMXFJXA.js").then(t=>t.LoginComponent)},{path:"admin/moderate",loadComponent:()=>import("./chunk-GO2TQWAZ.js").then(t=>t.ModerateComponent)},{path:"admin",loadComponent:()=>import("./chunk-WEU254YH.js").then(t=>t.AdminComponent),canActivate:[Ss]},{path:"scan",component:is},{path:"confirm",component:rs},{path:"props",component:Es},{path:"discuss",component:ps},{path:"load",component:fs},{path:"prescan",component:hs},{path:"pps25",component:Zn,data:{redirectTo:"/he/?workspace=03da8ede-395b-4fd2-b46e-bc2bc7f4035c&api_key=a356977d-219f-4d65-ae18-d8e98280bca1"}},{path:"timeisnow25",component:Zn,data:{redirectTo:"/he/?workspace=03da8ede-395b-4fd2-b46e-bc2bc7f4035c&api_key=a356977d-219f-4d65-ae18-d8e98280bca1"}},{path:"jma25",component:Zn,data:{redirectTo:"/nl/prescan?workspace=ceaed215-e28a-4988-aca4-458c20d5cf1d&api_key=2dbffec8-9175-4dc4-b553-5b8cf085b5fe&tag=jma25"}},{path:"testing",component:Zn,data:{redirectTo:"/?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2"}},{path:"testing-ws",component:Zn,data:{redirectTo:"/?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2&ws=true"}},{path:"ajeec",component:Zn,data:{redirectTo:"/he/?workspace=6043fe29-bedb-45cb-8057-b63723b1a26e&api_key=86c03c59-0502-498f-9ccd-23e6f8a17682&ws=true"}},{path:"privacy-policy",component:ar,data:{prefix:"privacy-policy-"}},{path:"",component:gs}];var Yp={providers:[wc({eventCoalescing:!0}),zc(qp,Vc()),Bc(Nc(),Fc({filter:t=>!t.url.includes("config.json")})),Ic(Lc()),$c(()=>Gc({projectId:"chronomaps3",appId:"1:815296345105:web:78e29a3b24d788c9162db0",storageBucket:"chronomaps3.firebasestorage.app",apiKey:"AIzaSyCvFFOSsL36ra0r4cCdNbGL_lAeJhmuqR0",authDomain:"chronomaps3.firebaseapp.com",messagingSenderId:"815296345105",measurementId:"G-JDGT5FJ3EB"})),Uc(()=>Hc())]};var Ms=class t{constructor(e){this.platform=e;this.platform.browser(()=>{let n=new ht.Renderer(),i=n.link;n.link=(o,s,l)=>{let h=o.startsWith(`${location.protocol}//${location.hostname}`),p=i.call(n,o,s,l);return h?p:p.replace(/^<a /,'<a target="_blank" rel="noreferrer noopener nofollow" ');},ht.use({renderer:n});try{let o=window.screen.orientation;screen&&o?.lock;}catch(o){console.error("Error locking screen orientation",o);}});}static ɵfac=function(n){return new(n||t)(et(jt));};static ɵcmp=_t({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(n,i){n&1&&Y(0,"router-outlet");},dependencies:[Dc],encapsulation:2});};Mp({dsn:"https://9d7e8aa0d51101008271d36419391e6c@o367221.ingest.us.sentry.io/4509518184579072",sendDefaultPii:!0});Ac(Ms,Yp).catch(t=>console.error(t));/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/