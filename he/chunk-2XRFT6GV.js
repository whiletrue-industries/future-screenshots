import{$a as Pt,Aa as nt,Ba as St,Da as M,Ea as un,Fb as wn,Ga as et,Ha as ot,Ia as l,Ja as c,Ka as dt,La as _t,Ma as Kt,Mb as hn,Na as Xt,Oa as f,Pa as kt,Q as vt,Qa as Wt,Ra as $,Sa as w,Tb as Sn,X as k,Y as W,Z as gn,Za as C,_ as pn,_a as H,a as Dt,ab as Cn,b as Ut,g as A,ia as P,ma as ht,pa as d,sa as mn,ub as Mt,wa as T,ya as Rt,za as E}from"./chunk-IL7K2TLE.js";var $t=(r,t)=>t.id,Nn=(r,t)=>t.round,Gn=(r,t)=>t.participantId;function Fn(r,t){if(r&1&&(l(0,"p",28),C(1),c()),r&2){let n=w();d(),H(n.workshopName());}}function Ln(r,t){r&1&&(l(0,"div",29),f(1,1),c());}function Bn(r,t){if(r&1&&(l(0,"div",30),C(1),c()),r&2){let n=w();d(),H(n.errorMsg());}}function zn(r,t){r&1&&(l(0,"p",39),f(1,4),c());}function Hn(r,t){r&1&&(l(0,"span"),f(1,5),c());}function Dn(r,t){r&1&&(l(0,"span"),f(1,6),c());}function Un(r,t){if(r&1){let n=_t();l(0,"li",43),dt(1,"span",44),l(2,"span",45),C(3),c(),l(4,"button",46),$("click",function(){let o=k(n).$implicit,i=w(3);return W(i.copyParticipantLink(o));}),T(5,Hn,2,0,"span")(6,Dn,2,0,"span"),c()();}if(r&2){let n=t.$implicit,e=w(3);nt("border-left-color",n.color||"#607D8B"),d(),nt("background",n.color||"#607D8B"),d(2),H(n.name),d(),St("copied",e.copiedGroupId()===n.id),Rt("aria-label","Copy participant link for "+n.name),d(),M(e.copiedGroupId()===n.id?5:6);}}function Kn(r,t){if(r&1&&(l(0,"li",49)(1,"span",50),C(2),c(),l(3,"span",51),C(4),c()()),r&2){let n=t.$implicit,e=t.$index;d(2),H(e+1),d(2),H(n);}}function Xn(r,t){if(r&1&&(l(0,"section",42)(1,"h2",47),f(2,7),c(),l(3,"ol",48),et(4,Kn,5,2,"li",49,un),c()()),r&2){let n=w(3);d(4),ot(n.wsRoundPrompts());}}function Jn(r,t){if(r&1&&(l(0,"section",36)(1,"h2",37),f(2,2),c(),l(3,"p",38),f(4,3),c(),T(5,zn,2,0,"p",39),l(6,"ul",40),et(7,Un,7,9,"li",41,$t),c()(),T(9,Xn,6,0,"section",42)),r&2){let n=w(2);d(4),kt(n.wsTotalRounds()),Wt(4),d(),M(n.wsGroups().length===0?5:-1),d(2),ot(n.wsGroups()),d(2),M(n.wsRoundPrompts().length>0?9:-1);}}function Vn(r,t){if(r&1&&(l(0,"p",54),C(1),c()),r&2){let n=w(3);d(),Pt("Last export: ",n.formatExportTimestamp(n.lastExportAt()),"");}}function Yn(r,t){r&1&&(l(0,"p",39),f(1,16),c());}function jn(r,t){r&1&&C(0," \u25B8 ");}function qn(r,t){r&1&&C(0," \u25BE ");}function Qn(r,t){r&1&&C(0," \u25B8 ");}function Zn(r,t){r&1&&C(0," \u25BE ");}function te(r,t){if(r&1&&dt(0,"img",86),r&2){let n=w().$implicit;E("src",n.imageUrl,ht)("alt",n.title);}}function ne(r,t){r&1&&(l(0,"span",87),C(1,"No image"),c());}function ee(r,t){r&1&&C(0," n/a ");}function oe(r,t){r&1&&C(0," yes ");}function ie(r,t){r&1&&C(0," no ");}function re(r,t){if(r&1){let n=_t();l(0,"tr",85)(1,"td"),T(2,te,1,2,"img",86)(3,ne,2,0,"span",87),c(),l(4,"td")(5,"label",63)(6,"input",83),$("change",function(o){let i=k(n).$implicit,a=w(8);return W(a.toggleItemIncluded(i.exportKey,o.target.checked));}),c()()(),l(7,"td",88),C(8),c(),l(9,"td")(10,"span",89),C(11),c()(),l(12,"td"),C(13),c(),l(14,"td"),T(15,ee,1,0)(16,oe,1,0)(17,ie,1,0),c(),l(18,"td")(19,"span",90),C(20),c()()();}if(r&2){let n=t.$implicit,e=w().$implicit,o=w(2).$implicit,i=w(2).$implicit,a=w(3);nt("--group-color",i.color),St("ws-item-excluded",!a.isExportPathIncluded(i.id,o.round,n.exportKey)),d(2),M(n.hasImage?2:3),d(4),E("checked",a.isItemIncluded(n.exportKey))("disabled",!a.isGroupIncluded(i.id)||!a.isRoundIncluded(i.id,o.round)),d(2),H(n.title),d(2),St("ws-item-state-new",n.changeStatus==="new")("ws-item-state-updated",n.changeStatus==="updated")("ws-item-state-unchanged",n.changeStatus==="unchanged"),d(),Pt(" ",n.changeStatus," "),d(2),H(n.lastExportLabel),d(2),M(n.updatedSinceExport===null?15:n.updatedSinceExport?16:17),d(4),E("title",e.participantId||e.participantName),d(),Pt("\u2026",a.participantIdLast4(e.participantId),"");}}function se(r,t){if(r&1&&et(0,re,21,19,"tr",84,$t),r&2){let n=t.$implicit;ot(n.items);}}function ae(r,t){if(r&1&&et(0,se,2,0,null,null,Gn),r&2){let n=w().$implicit;ot(n.participants);}}function ce(r,t){if(r&1){let n=_t();l(0,"tr",82)(1,"td")(2,"button",79),$("click",function(){let o=k(n).$implicit,i=w(2).$implicit,a=w(3);return W(a.toggleRoundCollapsed(i.id,o.round));}),T(3,Qn,1,0)(4,Zn,1,0),c()(),l(5,"td")(6,"label",63)(7,"input",83),$("change",function(o){let i=k(n).$implicit,a=w(2).$implicit,s=w(3);return W(s.toggleRoundIncluded(a.id,i.round,o.target.checked));}),c()()(),l(8,"td",80)(9,"strong"),C(10),c(),l(11,"span",81),C(12),c()()(),T(13,ae,2,0);}if(r&2){let n=t.$implicit,e=w(2).$implicit,o=w(3);nt("--group-color",e.color),d(2),Rt("aria-label",(o.isRoundCollapsed(e.id,n.round)?"Expand round ":"Collapse round ")+n.round),d(),M(o.isRoundCollapsed(e.id,n.round)?3:4),d(4),E("checked",o.isRoundIncluded(e.id,n.round))("disabled",!o.isGroupIncluded(e.id)),d(2),nt("color",e.color),d(),Pt("Round ",n.round,""),d(2),H(n.prompt),d(),M(o.isRoundCollapsed(e.id,n.round)?-1:13);}}function le(r,t){if(r&1&&et(0,ce,14,11,null,null,Nn),r&2){let n=w().$implicit;ot(n.rounds);}}function de(r,t){if(r&1&&(l(0,"li"),C(1),c()),r&2){let n=t.$implicit;d(),Cn("",n.id," \u2014 ",n.reason,"");}}function _e(r,t){if(r&1&&(l(0,"tr")(1,"td",91)(2,"div",92)(3,"strong"),f(4,17),c(),l(5,"ul"),et(6,de,2,2,"li",null,$t),c()()()()),r&2){let n=w().$implicit;d(6),ot(n.unplaced);}}function ge(r,t){if(r&1){let n=_t();l(0,"tbody")(1,"tr",78)(2,"td")(3,"button",79),$("click",function(){let o=k(n).$implicit,i=w(3);return W(i.toggleGroupCollapsed(o.id));}),T(4,jn,1,0)(5,qn,1,0),c()(),l(6,"td")(7,"label",63)(8,"input",64),$("change",function(o){let i=k(n).$implicit,a=w(3);return W(a.toggleGroupIncluded(i.id,o.target.checked));}),c()()(),l(9,"td",80)(10,"strong"),C(11),c(),l(12,"span",81),C(13),c()()(),T(14,le,2,0)(15,_e,8,0,"tr"),c();}if(r&2){let n=t.$implicit,e=w(3);d(),nt("--group-color",n.color),d(2),Rt("aria-label",(e.isGroupCollapsed(n.id)?"Expand ":"Collapse ")+n.name),d(),M(e.isGroupCollapsed(n.id)?4:5),d(4),E("checked",e.isGroupIncluded(n.id)),d(2),nt("color",n.color),d(),H(n.name),d(2),Pt("",n.totalItems," items"),d(),M(e.isGroupCollapsed(n.id)?-1:14),d(),M(n.unplaced.length>0?15:-1);}}function pe(r,t){r&1&&(l(0,"p",54),f(1,18),c());}function me(r,t){r&1&&(l(0,"p",54),f(1,19),c());}function ue(r,t){r&1&&(l(0,"p"),f(1,21),c());}function Ce(r,t){if(r&1&&(l(0,"div",70),T(1,ue,2,0,"p"),l(2,"a",93),f(3,20),c()()),r&2){let n=w(3);d(),M(n.miroExporting()?1:-1),d(),E("href",n.miroBoardLink().boardUrl,ht),d(),kt(n.miroBoardLink().boardName),Wt(3);}}function we(r,t){if(r&1&&(l(0,"p",71),C(1),c()),r&2){let n=w(3);d(),H(n.miroError());}}function he(r,t){r&1&&(l(0,"span"),f(1,23),c());}function Se(r,t){r&1&&(l(0,"span"),f(1,24),c());}function Pe(r,t){r&1&&(l(0,"p"),f(1,25),c());}function Me(r,t){if(r&1&&(l(0,"div",70)(1,"p"),T(2,he,2,0,"span")(3,Se,2,0,"span"),c(),T(4,Pe,2,0,"p"),l(5,"a",93),f(6,22),c()()),r&2){let n=w(3);d(2),M(n.miroResult().boardMode==="add"?2:3),d(2),M(n.miroResult().boardMode==="add"?4:-1),d(),E("href",n.miroResult().boardUrl,ht),d(),kt(n.miroResult().boardName),Wt(6);}}function fe(r,t){r&1&&f(0,15,1);}function Oe(r,t){r&1&&f(0,15,2);}function be(r,t){if(r&1&&(l(0,"span",76),C(1),c()),r&2){let n=w(3);d(),H(n.miroProgress());}}function Te(r,t){if(r&1&&(l(0,"span",77),C(1),c()),r&2){let n=w(3);d(),H(n.miroError());}}function xe(r,t){if(r&1){let n=_t();l(0,"section",52)(1,"h2",53),f(2,8),c(),l(3,"p",38),f(4,9),c(),T(5,Vn,2,1,"p",54)(6,Yn,2,0,"p",39),l(7,"div",55)(8,"table",56)(9,"thead")(10,"tr"),dt(11,"th"),l(12,"th"),C(13,"Include"),c(),l(14,"th"),C(15,"Item"),c(),l(16,"th"),C(17,"Status"),c(),l(18,"th"),C(19,"Exported"),c(),l(20,"th"),C(21,"Updated"),c(),l(22,"th"),C(23,"User"),c()()(),et(24,ge,16,11,"tbody",null,$t),c()()(),l(26,"section",57)(27,"h2",58),gn(),l(28,"svg",59),dt(29,"rect",60),l(30,"text",61),C(31,"M"),c()(),pn(),l(32,"span"),f(33,10),c()(),l(34,"p",38),f(35,11),c(),l(36,"fieldset",62)(37,"legend"),C(38,"Tag types"),c(),l(39,"label",63)(40,"input",64),$("change",function(o){k(n);let i=w(2);return W(i.setIncludeTagGroup(o.target.checked));}),c(),l(41,"span"),C(42,"group"),c()(),l(43,"label",63)(44,"input",64),$("change",function(o){k(n);let i=w(2);return W(i.setIncludeTagRound(o.target.checked));}),c(),l(45,"span"),C(46,"round"),c()(),l(47,"label",63)(48,"input",64),$("change",function(o){k(n);let i=w(2);return W(i.setIncludeTagContentTitle(o.target.checked));}),c(),l(49,"span"),C(50,"content_title"),c()(),l(51,"label",63)(52,"input",64),$("change",function(o){k(n);let i=w(2);return W(i.setIncludeTagItemId(o.target.checked));}),c(),l(53,"span"),C(54,"item_id"),c()()(),l(55,"p",54),Kt(56,12),dt(57,"a",65),Xt(),c(),l(58,"fieldset",66)(59,"legend"),f(60,13),c(),l(61,"label",67)(62,"input",68),$("change",function(o){k(n);let i=w(2);return W(i.onBoardModeToggle(o.target.checked));}),c(),dt(63,"span",69),l(64,"span"),f(65,14),c()(),T(66,pe,2,0,"p",54)(67,me,2,0,"p",54),c(),T(68,Ce,4,3,"div",70)(69,we,2,1,"p",71)(70,Me,7,4,"div",70),c(),l(71,"div",72)(72,"input",73),$("input",function(o){k(n);let i=w(2);return W(i.onMiroTokenInput(o.target.value));}),c(),l(73,"button",74),$("click",function(){k(n);let o=w(2);return W(o.sendToMiro());}),Kt(74,15),T(75,fe,1,0)(76,Oe,1,0),Xt(),c(),l(77,"div",75),T(78,be,2,1,"span",76)(79,Te,2,1,"span",77),c()();}if(r&2){let n=w(2);d(5),M(n.lastExportAt()?5:-1),d(),M(n.previewComposition().length===0?6:-1),d(18),ot(n.previewComposition()),d(12),E("disabled",n.miroExporting()),d(4),E("checked",n.includeTagGroup()),d(4),E("checked",n.includeTagRound()),d(4),E("checked",n.includeTagContentTitle()),d(4),E("checked",n.includeTagItemId()),d(6),E("disabled",n.miroExporting()),d(4),E("checked",n.boardMode()==="add")("disabled",n.miroExporting()),d(4),M(n.miroBoardId()?66:67),d(2),M(n.miroBoardLink()?68:-1),d(),M(n.miroError()?69:-1),d(),M(n.miroResult()?70:-1),d(2),E("value",n.miroToken())("disabled",n.miroExporting()),d(),E("disabled",!n.miroToken().trim()||n.miroExporting()),d(2),M(n.miroExporting()?75:76),d(3),M(n.miroProgress()?78:-1),d(),M(n.miroError()?79:-1);}}function Ee(r,t){if(r&1){let n=_t();l(0,"nav",31)(1,"div",32)(2,"button",33),$("click",function(){k(n);let o=w();return W(o.setActiveTab("export"));}),C(3,"Export"),c(),l(4,"a",34),C(5,"#"),c()(),l(6,"div",32)(7,"button",33),$("click",function(){k(n);let o=w();return W(o.setActiveTab("settings"));}),C(8,"Settings"),c(),l(9,"a",35),C(10,"#"),c()()(),T(11,Jn,10,3)(12,xe,80,20);}if(r&2){let n=w();d(2),St("active",n.activeTab()==="export"),d(2),E("href",n.getTabPermalink("export"),ht),d(3),St("active",n.activeTab()==="settings"),d(2),E("href",n.getTabPermalink("settings"),ht),d(2),M(n.activeTab()==="settings"?11:-1),d(),M(n.activeTab()==="export"?12:-1);}}var Pn=class r{route=vt(hn);http=vt(wn);api=vt(Sn);CHRONOMAPS_API_URL=this.api.CHRONOMAPS_API_URL;workspace=P("");apiKey=P("");adminKey=P("");workspaceMeta=P(null);items=P([]);isLoading=P(!0);errorMsg=P(null);activeTab=P("export");miroToken=P("");miroExporting=P(!1);miroBoardLink=P(null);miroResult=P(null);miroError=P(null);miroProgress=P("");miroBoardId=P(null);boardMode=P("add");MIRO_REQUEST_TIMEOUT_MS=3e4;MIRO_TAG_TITLE_MAX_LENGTH=120;MIRO_TAG_RETRY_ATTEMPTS=6;excludedGroupIds=P(new Set());excludedRoundKeys=P(new Set());excludedItemKeys=P(new Set());includeTagGroup=P(!0);includeTagRound=P(!0);includeTagContentTitle=P(!0);includeTagItemId=P(!0);collapsedGroupIds=P(new Set());collapsedRoundKeys=P(new Set());lastExportState=P(new Map());lastExportAt=P(null);copiedGroupId=P(null);previewComposition=Mt(()=>{try{return this.buildCompositionPreview();}catch(t){return console.error("[Miro Preview] Error building composition preview:",t),[];}});wsGroups=Mt(()=>{let t=this.workspaceMeta(),n=t?.ws_groups||t?.metadata?.ws_groups||[],e=new Map();for(let o of n)o?.id&&e.set(o.id,o);for(let o of this.items()){let i=this.getWsGroupId(o);!i||e.has(i)||e.set(i,{id:i,name:this.getWsGroupName(o)||i,color:this.deriveGroupColor(i)});}return Array.from(e.values());});wsTotalRounds=Mt(()=>{let t=this.workspaceMeta();return t?.ws_rounds||t?.metadata?.ws_rounds||5;});wsRoundPrompts=Mt(()=>{let t=this.workspaceMeta();return t?.ws_round_prompts||t?.metadata?.ws_round_prompts||[];});workshopName=Mt(()=>{let t=this.workspaceMeta();return t?.event_name||t?.metadata?.event_name||"Strategic Workshop";});ngOnInit(){let t=this.route.snapshot.queryParams;this.workspace.set(t.workspace||""),this.apiKey.set(t.api_key||""),this.adminKey.set(t.admin_key||t.api_key||""),this.miroToken.set(this.getStoredMiroToken());let n=this.getStoredMiroBoardId();this.miroBoardId.set(n),this.boardMode.set(this.getStoredBoardMode(n)),this.loadStoredLastExportState(),this.initActiveTabFromUrl(),this.workspace()?this.loadWorkspace():(this.isLoading.set(!1),this.errorMsg.set("No workspace specified."));}loadWorkspace(){let t=this.adminKey()||this.apiKey();this.http.get(`${this.CHRONOMAPS_API_URL}/${this.workspace()}`,{headers:{Authorization:t}}).subscribe({next:n=>{this.workspaceMeta.set(n),this.isLoading.set(!1),this.loadAllItems();},error:()=>{this.errorMsg.set("Failed to load workspace."),this.isLoading.set(!1);}});}loadAllItems(){let t=this.adminKey()||this.apiKey(),n=500,e=[],o=i=>{this.http.get(`${this.CHRONOMAPS_API_URL}/${this.workspace()}/items`,{params:{page:i,page_size:n},headers:{Authorization:t}}).subscribe({next:a=>{let s=a?.items||a||[];if(e.push(...s),s.length>=n){o(i+1);return;}let _=e.filter(g=>{let p=this.getWsGroupId(g);return typeof p=="string"&&p.trim().length>0;}).map(g=>{let p=this.getScreenshotUrl(g),u=this.getThumbnailUrl(g)||this.deriveThumbnailUrl(p);return Ut(Dt({},g),{screenshot_url:p,thumbnail_url:u});});this.items.set(_);},error:()=>{}});};o(0);}buildParticipantLink(t){let n=window.location.origin,e=new URLSearchParams({workspace:this.workspace(),api_key:this.apiKey(),ws:"true",ws_strategic:"true",ws_group:t.id});return`${n}/canvas-creator?${e.toString()}`;}copyParticipantLink(t){let n=this.buildParticipantLink(t);navigator.clipboard.writeText(n).then(()=>{this.copiedGroupId.set(t.id),setTimeout(()=>this.copiedGroupId.set(null),2e3);}).catch(()=>{window.prompt("Copy this link:",n);});}onMiroTokenInput(t){let n=this.normalizeMiroToken(t);this.miroToken.set(n),this.storeMiroToken(n);}onBoardModeToggle(t){let n=t?"add":"create";this.boardMode.set(n),this.storeBoardMode(n);}setActiveTab(t){this.activeTab.set(t),this.updateTabPermalink(t);}getTabPermalink(t){return typeof window>"u"?`#${t}`:`${window.location.origin}${window.location.pathname}${window.location.search}#${t}`;}initActiveTabFromUrl(){if(typeof window>"u")return;let t=(window.location.hash||"").replace("#","").toLowerCase();if(t==="export"||t==="settings"){this.activeTab.set(t);return;}this.updateTabPermalink(this.activeTab());}updateTabPermalink(t){if(typeof window>"u")return;let n=`${window.location.pathname}${window.location.search}#${t}`;window.history.replaceState(window.history.state,"",n);}isGroupIncluded(t){return!this.excludedGroupIds().has(t);}toggleGroupIncluded(t,n){this.excludedGroupIds.update(e=>{let o=new Set(e);return n?o.delete(t):o.add(t),o;});}isRoundIncluded(t,n){return!this.excludedRoundKeys().has(this.roundSelectionKey(t,n));}toggleRoundIncluded(t,n,e){let o=this.roundSelectionKey(t,n);this.excludedRoundKeys.update(i=>{let a=new Set(i);return e?a.delete(o):a.add(o),a;});}isGroupCollapsed(t){return this.collapsedGroupIds().has(t);}toggleGroupCollapsed(t){this.collapsedGroupIds.update(n=>{let e=new Set(n);return e.has(t)?e.delete(t):e.add(t),e;});}isRoundCollapsed(t,n){return this.collapsedRoundKeys().has(this.roundSelectionKey(t,n));}toggleRoundCollapsed(t,n){let e=this.roundSelectionKey(t,n);this.collapsedRoundKeys.update(o=>{let i=new Set(o);return i.has(e)?i.delete(e):i.add(e),i;});}participantIdLast4(t){let n=(t||"").trim();return n?n.length<=4?n:n.slice(-4):"----";}isItemIncluded(t){return!this.excludedItemKeys().has(t);}toggleItemIncluded(t,n){this.excludedItemKeys.update(e=>{let o=new Set(e);return n?o.delete(t):o.add(t),o;});}setIncludeTagGroup(t){this.includeTagGroup.set(t);}setIncludeTagRound(t){this.includeTagRound.set(t);}setIncludeTagContentTitle(t){this.includeTagContentTitle.set(t);}setIncludeTagItemId(t){this.includeTagItemId.set(t);}isExportPathIncluded(t,n,e){return this.isGroupIncluded(t)&&this.isRoundIncluded(t,n)&&this.isItemIncluded(e);}roundSelectionKey(t,n){return`${t}:${n}`;}itemSelectionKey(t){let n=this.getItemId(t);if(n)return`id:${n}`;let e=this.getWsGroupId(t)||"nogroup",o=Number(this.getWsRound(t))||0,i=this.getAuthorId(t)||this.getParticipantName(t)||"unknown",a=this.getContentTitle(t)||"untitled";return`${e}|${o}|${i}|${a}`;}exportBaselineKey(t){return this.itemSelectionKey(t);}buildDatapointTags(t,n,e,o){let i=[];return this.includeTagGroup()&&i.push({tagTitle:this.sanitizeMiroTagTitle(`group:${t}`)}),this.includeTagRound()&&i.push({tagTitle:this.sanitizeMiroTagTitle(`round:${n}`)}),this.includeTagContentTitle()&&i.push({tagTitle:this.sanitizeMiroTagTitle(`content_title:${e}`)}),this.includeTagItemId()&&o&&i.push({tagTitle:this.sanitizeMiroTagTitle(`item_id:${o}`)}),i.filter(a=>a.tagTitle.length>0);}sendToMiro(){return A(this,null,function*(){let t=this.normalizeMiroToken(this.miroToken());if(this.miroToken.set(t),!t){this.miroError.set("Please enter a Miro personal access token.");return;}this.miroExporting.set(!0),this.miroError.set(null),this.miroBoardLink.set(null),this.miroResult.set(null);let n=this.wsGroups(),e=this.wsTotalRounds(),o=this.items().filter(s=>!this.isItemArchived(s)),i=o.filter(s=>{let _=this.getWsGroupId(s),g=Number(this.getWsRound(s)),p=this.itemSelectionKey(s);return!_||!Number.isFinite(g)?!1:this.isExportPathIncluded(_,g,p);});if(i.length===0){this.miroError.set("No items selected for export. Enable at least one group/round/item and try again."),this.miroExporting.set(!1);return;}let a=this.workshopName();try{this.miroProgress.set("Preparing Miro board\u2026");let s=" \u2014 Strategic Workshop",_=60,p=`${a.length+s.length>_?a.slice(0,_-s.length):a}${s}`,u=null,R="",V=this.getStoredMiroBoardId(),F=this.boardMode()==="add"&&!!V;if(F&&V)try{let S=yield this.miroGet(t,`https://api.miro.com/v2/boards/${V}`);u=V,R=S.viewLink||"",R&&this.miroBoardLink.set({boardUrl:R,boardName:p,boardMode:"add"}),this.miroProgress.set("Updating existing Miro board\u2026");}catch{this.miroError.set("Could not access existing board. Creating a new board instead."),u=null;}if(!u){this.miroProgress.set("Creating Miro board\u2026");let S=yield this.miroPost(t,"https://api.miro.com/v2/boards",{name:p,description:"Auto-generated by mapfutur.es strategic workshop export"});u=S.id,R=S.viewLink,this.miroBoardId.set(u),this.storeMiroBoardId(u),R&&this.miroBoardLink.set({boardUrl:R,boardName:p,boardMode:"create"});}let b=u,y=F,O=F?yield this.getAllBoardItems(t,b):[],L=y?this.indexExistingGroupFramesByTitle(O):new Map(),N=yield this.computeExistingBoardStartY(t,b,F&&!y),it=new Map();yield this.preloadBoardTags(t,b,it);let q=130,B=240,U=84,gt=10,rt=(B-gt*2)/3,I=28,Q=16,h=70,Et=90,pt=220,ft=70,Ot=28,mt=100,K=40,bt=150,Mn=70,Jt=N,fn=this.wsRoundPrompts(),Vt=0,Yt=new Map(),D={new:new Set(),updated:new Set(),all:new Set()};y&&(D=this.calculateItemDelta(o),console.log(`[Miro Export] Delta mode: ${D.new.size} new items, ${D.updated.size} updated items, ${D.all.size} total`));for(let S of n){if(!this.isGroupIncluded(S.id))continue;let st=i.filter(m=>this.getWsGroupId(m)===S.id),yt=st;if(y){let m=st.length;yt=st.filter(G=>{let j=this.exportBaselineKey(G);return D.new.has(j)||D.updated.has(j);}),console.log(`[Miro Export] Group "${S.name}": ${m} total \u2192 ${yt.length} changed items (delta mode)`);}else console.log(`[Miro Export] Group "${S.name}": ${st.length} total items`);let jt=new Set();if(y&&yt.length===0)continue;let Nt=new Map();st.forEach(m=>{let G=this.getAuthorId(m)||this.getParticipantName(m)||"unknown",j=this.getParticipantName(m)||G;Nt.has(G)||Nt.set(G,j);});let at=Array.from(Nt.entries());console.log(`[Miro Export] Unique participants: ${at.length}`,at.map(m=>m[1]));let On=this.canonicalizeTagTitle(S.name),x=y&&L.get(On)||null;if(y&&!x){console.warn(`[Miro Export] Delta mode: skipping group "${S.name}" because no matching frame exists on board.`);continue;}this.miroProgress.set(`${x?"Updating":"Creating"} frame for group: ${S.name}\u2026`);let Gt=0;for(let m=1;m<=e;m++)for(let[G]of at){let j=st.filter(ct=>(this.getAuthorId(ct)||this.getParticipantName(ct)||"unknown")===G&&Number(this.getWsRound(ct))===m);Gt=Math.max(Gt,j.length);}let Ft=U+Q+q,qt=Math.max(220,Math.max(1,Gt)*(Ft+I)-I+20),Qt=at.length,z=Math.max(mt,K*2+Qt*qt+Math.max(0,Qt-1)*h),Zt=ft+Ot+B,Z=Math.max(mt,bt+e*Zt+Math.max(0,e-1)*Et+Mn),Y=z/2,Tt=Jt,ut=[];if(x){let m=x.x-x.width/2,G=x.y-x.height/2;z=Math.max(x.width,z),Z=Math.max(x.height,Z),Y=m+z/2,Tt=G+Z/2,ut=this.getItemsInsideFrame(O,x),(z!==x.width||Z!==x.height)&&(this.miroProgress.set(`Resizing frame for group: ${S.name}\u2026`),yield this.miroPatch(t,`https://api.miro.com/v2/boards/${b}/frames/${x.id}`,{geometry:{width:z,height:Z},position:{x:Y,y:Tt,origin:"center"}}),yield this.updateFrameTextItems(t,b,ut,Y,z,K));}else yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/frames`,{data:{title:S.name,format:"custom",type:"freeform"},style:{fillColor:S.color?this.lightenHex(S.color,.13):"#f5f5f5"},geometry:{height:Z,width:z},position:{x:Y,y:Tt,origin:"center"}});this.miroProgress.set(`Adding headers for group: ${S.name}\u2026`),at.length===0&&!x&&(yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/sticky_notes`,{data:{content:"No submissions yet",shape:"rectangle"},style:{fillColor:"gray"},geometry:{width:220},position:{x:Y,y:Tt+60,origin:"center"}}));let tn=Tt-Z/2,nn=tn+48,bn=tn+bt,Tn=ut.filter(m=>m?.type==="text");if(!x){let m=`<strong>${S.name}</strong>`;try{yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/texts`,{data:{content:m},style:{fontSize:"40"},geometry:{width:Math.max(360,z-K*2)},position:{x:Y,y:nn,origin:"center"}});}catch{yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/sticky_notes`,{data:{content:m,shape:"rectangle"},style:{fillColor:this.toMiroStickyColor(S.color)},geometry:{width:Math.max(360,z-K*2)},position:{x:Y,y:nn,origin:"center"}});}}for(let m=1;m<=e;m++){if(!this.isRoundIncluded(S.id,m))continue;this.miroProgress.set(`Placing round ${m} for group: ${S.name}\u2026`);let G=m-1,j=bn+G*(Zt+Et),ct=j+ft/2,Ct=j+ft+Ot,en=Ct+B/2,xn=x&&Tn.some(tt=>Math.abs(Number(tt?.position?.y)-ct)<40);if(!x||!xn){let tt=fn[m-1]||`Round ${m}`,xt=`<span style="color:${S.color||"#050038"}"><strong>Round ${m}:</strong> ${tt}</span>`;try{yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/texts`,{data:{content:xt},style:{fontSize:"24"},geometry:{width:Math.max(300,z-K*2)},position:{x:Y,y:ct,origin:"center"}});}catch{yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/sticky_notes`,{data:{content:xt,shape:"rectangle"},style:{fillColor:this.toMiroStickyColor(S.color)},geometry:{width:Math.max(300,z-K*2)},position:{x:Y,y:ct,origin:"center"}});}}let En=Y-z/2+K;for(let tt=0;tt<at.length;tt++){let[on,xt]=at[tt],yn=En+tt*(qt+h),Bt=st.filter(X=>(this.getAuthorId(X)||this.getParticipantName(X)||"unknown")===on&&Number(this.getWsRound(X))===m),An=y?Bt.filter(X=>{let J=this.exportBaselineKey(X);return!D.new.has(J)&&!D.updated.has(J);}).length:0,rn=0;for(let X=0;X<Bt.length;X++){let J=Bt[X],In=this.getItemId(J),At=this.exportBaselineKey(J),vn=this.itemSelectionKey(J);if(!(!y||D.new.has(At)||D.updated.has(At))||!this.isItemIncluded(vn))continue;Vt++;let sn=y?An+rn:X;rn++;let It=yn+sn*(Ft+I),zt=It+U/2,an=It+U+Q+q/2,cn=this.getContentTitle(J)||`Item ${sn+1}`,Rn=zt-U/2-8,kn=zt+U/2+8,ln=x?ut.filter(v=>v?.type==="sticky_note"&&Number(v?.position?.x)>=Rn&&Number(v?.position?.x)<=kn&&Number(v?.position?.y)>=Ct-8&&Number(v?.position?.y)<=Ct+B+8):[],Wn=!(ln.length>0);x&&!y&&(ut=yield this.clearExistingItemsInBlock(t,b,ut,{left:It-8,right:It+Ft+8,top:Ct-8,bottom:Ct+B+8}));let $n=this.buildDatapointTags(S.name,m,cn,In||""),Ht=[];if(Wn)for(let v=0;v<3;v++){let lt=Ct+rt/2+v*(rt+gt),wt=yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/sticky_notes`,{data:{content:"HMW... ",shape:"square"},style:{fillColor:this.toMiroStickyColor(S.color)},geometry:{width:U},position:{x:zt,y:lt,origin:"center"}}),_n=typeof wt?.id=="string"?wt.id:"";_n&&Ht.push(_n);}else for(let v of ln){let lt=typeof v?.id=="string"?v.id:"";lt&&Ht.push(lt);}let dn=this.getScreenshotUrl(J)||this.getThumbnailUrl(J);if(dn){this.miroProgress.set(`Placing image: ${xt} / Round ${m} / Item ${X+1}\u2026`);let v=`${S.name} \u2013 Round ${m} \u2013 ${xt} \u2013 ${cn}`;yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/images`,{data:{url:dn,title:v},geometry:{width:q},position:{x:an,y:en,origin:"center"}});}else yield this.miroPost(t,`https://api.miro.com/v2/boards/${b}/sticky_notes`,{data:{content:"(no image)",shape:"rectangle"},style:{fillColor:"gray"},geometry:{width:q},position:{x:an,y:en,origin:"center"}});for(let v of Ht)for(let lt of $n)try{let wt=yield this.getOrCreateBoardTag(t,b,it,lt.tagTitle,this.toMiroTagColor(S.color));yield this.attachTagToItem(t,b,v,wt);}catch(wt){console.warn(`[Miro Export] Failed tag pipeline for sticky ${v} and tag "${lt.tagTitle}". Continuing export.`,wt);}jt.add(At),Yt.set(At,this.getScreenshotUrl(J)||this.getThumbnailUrl(J)||"");}}}let Lt=yt.filter(m=>{let G=this.exportBaselineKey(m);return y&&!D.new.has(G)&&!D.updated.has(G)?!1:!jt.has(G);});Lt.length>0&&(console.log(`[Miro Export] Unplaced items in group "${S.name}": ${Lt.length}`),Lt.forEach(m=>{console.log("[Miro Export] Unplaced item",{id:this.getItemId(m),reason:this.getItemSkipReason(m,e),ws_group_id:this.getWsGroupId(m),ws_round:this.getWsRound(m),author_id:this.getAuthorId(m),participant_name:this.getParticipantName(m),screenshot:!!this.getScreenshotUrl(m),thumbnail:!!this.getThumbnailUrl(m)});})),x||(Jt+=Z+pt);}if(Vt===0){let S=F?"No changes were exported. In update mode, only newly added or updated items are sent.":"No items were exported. Check your include toggles and try again.";this.miroError.set(S),this.miroProgress.set("");return;}this.miroResult.set({boardUrl:R,boardName:p,boardMode:F?"add":"create"}),this.storeLastExportState(Yt),this.miroProgress.set("");}catch(s){this.miroError.set(s?.message||"Miro export failed. Check your token and try again."),this.miroProgress.set("");}finally{this.miroExporting.set(!1);}});}lightenHex(t,n){let e=t.replace("#",""),o=parseInt(e.substring(0,2),16),i=parseInt(e.substring(2,4),16),a=parseInt(e.substring(4,6),16),s=_=>Math.round(_*n+255*(1-n)).toString(16).padStart(2,"0");return`#${s(o)}${s(i)}${s(a)}`;}normalizeImageUrl(t){return!t||typeof t!="string"?"":t.replace("https://storage.googleapis.com/chronomaps3.firebasestorage.app/","https://storage.googleapis.com/chronomaps3-eu/");}normalizeMiroToken(t){return(typeof t=="string"?t:"").replace(/^Bearer\s+/i,"").trim();}deriveThumbnailUrl(t){return t?t.replace(/screenshot\.jpeg$/,"screenshot.thumbnail.jpeg"):"";}toMiroStickyColor(t){if(!t)return"dark_blue";let n=t.replace("#","").toLowerCase();if(n.length!==6)return"dark_blue";let e=parseInt(n.slice(0,2),16),o=parseInt(n.slice(2,4),16),i=parseInt(n.slice(4,6),16),a=Math.max(e,o,i),s=Math.min(e,o,i),_=a-s,g=(a+s)/2;if(_<15)return g<45?"black":g<100?"gray":"light_yellow";let p=0;a===e?p=(o-i)/_%6:a===o?p=(i-e)/_+2:p=(e-o)/_+4;let u=(p*60+360)%360;return u<20||u>=340?"red":u<45?"orange":u<70?"yellow":u<95?"light_green":u<130?"green":u<150?"dark_green":u<190?"cyan":u<220?"light_blue":u<265?"blue":u<300?"violet":g>170?"light_pink":"pink";}toMiroTagColor(t){let n=this.toMiroStickyColor(t);switch(n){case"light_blue":return"blue";case"light_pink":case"pink":return"magenta";case"orange":case"light_yellow":return"yellow";default:return n;}}getWsGroupId(t){return t?.ws_group_id||t?.metadata?.ws_group_id||"";}getWsGroupName(t){return t?.ws_group_name||t?.metadata?.ws_group_name||"";}deriveGroupColor(t){let n=["#607D8B","#4E02B2","#698CFF","#2A9D8F","#FF6B35","#C44569","#8E44AD"],e=0;for(let o=0;o<t.length;o++)e=(e<<5)-e+t.charCodeAt(o),e|=0;return n[Math.abs(e)%n.length];}getWsRound(t){return t?.ws_round??t?.metadata?.ws_round??"";}getParticipantName(t){return t?.participant_name||t?.metadata?.participant_name||"";}getAuthorId(t){return t?.author_id||t?.metadata?.author_id||"";}getItemId(t){return t?._id||t?.id||"";}getContentTitle(t){return t?.content_title||t?.metadata?.content_title||"";}isItemArchived(t){return t?._private_moderation===0;}getItemSkipReason(t,n){if(!this.getWsGroupId(t))return"missing_ws_group_id";if(!(this.getAuthorId(t)||this.getParticipantName(t)))return"missing_author_and_participant_name";let i=Number(this.getWsRound(t));return Number.isFinite(i)?i<1||i>n?"round_out_of_range":"not_matched_by_group_round_participant":"round_not_numeric";}buildCompositionPreview(){let t=this.wsGroups(),n=this.wsTotalRounds(),e=this.wsRoundPrompts(),o=this.items().filter(g=>!this.isItemArchived(g)),i=this.lastExportState(),a=this.lastExportAt(),s=this.boardMode()==="add"&&this.miroBoardId()?"update":"new",_=s==="update"?this.calculateItemDelta(o):{new:new Set(o.map(g=>this.exportBaselineKey(g))),updated:new Set(),all:new Set(o.map(g=>this.exportBaselineKey(g)))};return t.map(g=>{let p=o.filter(O=>this.getWsGroupId(O)===g.id),u=new Map();p.forEach(O=>{let L=this.getAuthorId(O)||this.getParticipantName(O)||"",N=this.getParticipantName(O)||L||"Unknown participant";L&&!u.has(L)&&u.set(L,N);});let R=Array.from(u.entries()),V=Array.from({length:n},(O,L)=>{let N=L+1,it=e[L]||`Round ${N}`,q=R.map(([B,U])=>{let rt=p.filter(I=>(this.getAuthorId(I)||this.getParticipantName(I)||"")===B&&Number(this.getWsRound(I))===N).map((I,Q)=>{let h=this.getScreenshotUrl(I)||this.getThumbnailUrl(I)||"",Et=this.getItemId(I)||`${B}-${N}-${Q}`,pt=this.exportBaselineKey(I),ft=this.itemSelectionKey(I),Ot=s==="update"?_.new.has(pt)?"new":_.updated.has(pt)?"updated":"unchanged":"new",mt=i.get(pt),K=i.has(pt),bt=mt&&mt!==null?mt.exportedAt:a;return{id:Et,exportKey:ft,title:this.getContentTitle(I)||`Item ${Q+1}`,imageUrl:h,hasImage:!!h,changeStatus:Ot,hasBeenExported:K,lastExportAt:bt,lastExportLabel:K?this.formatExportTimestamp(bt):"never",updatedSinceExport:K?Ot==="updated":null};});return{participantId:B,participantName:U,items:rt};}).filter(B=>B.items.length>0);return{round:N,prompt:it,participants:q};}).filter(O=>O.participants.length>0),F=p.filter(O=>{let L=this.getAuthorId(O)||this.getParticipantName(O),N=Number(this.getWsRound(O));return!L||!Number.isFinite(N)||N<1||N>n;}).map(O=>({id:this.getItemId(O)||"(no id)",reason:this.getItemSkipReason(O,n)})),b=p.filter(O=>_.new.has(this.exportBaselineKey(O))).length,y=p.filter(O=>_.updated.has(this.exportBaselineKey(O))).length;return{id:g.id,name:g.name,color:g.color||"#607D8B",totalItems:p.length,rounds:V,unplaced:F,newCount:b,updatedCount:y,deltaInfo:{mode:s,newCount:b,updatedCount:y}};});}getScreenshotUrl(t){return this.normalizeImageUrl(t?.screenshot_url||t?.metadata?.screenshot_url||"");}getThumbnailUrl(t){return this.normalizeImageUrl(t?.thumbnail_url||t?.metadata?.thumbnail_url||"");}calculateItemDelta(t){let n=this.lastExportState(),e=new Set(),o=new Set(),i=new Set();for(let a of t){let s=this.exportBaselineKey(a);if(s)if(i.add(s),!n.has(s))e.add(s);else{let _=n.get(s);_&&_!==null&&(this.getScreenshotUrl(a)||this.getThumbnailUrl(a)||"")!==_.screenshotUrl&&o.add(s);}}return{new:e,updated:o,all:i};}miroBoardStorageKey(){return`ws_miro_board_id_${this.workspace()}`;}boardModeStorageKey(){return`ws_miro_board_mode_${this.workspace()}`;}miroTokenStorageKey(){return`ws_miro_token_${this.workspace()}`;}hasLocalStorage(){return typeof globalThis<"u"&&typeof globalThis.localStorage<"u";}getStoredMiroBoardId(){if(!this.workspace()||!this.hasLocalStorage())return null;try{return localStorage.getItem(this.miroBoardStorageKey());}catch{return null;}}getStoredMiroToken(){if(!this.workspace()||!this.hasLocalStorage())return"";try{return this.normalizeMiroToken(localStorage.getItem(this.miroTokenStorageKey())||"");}catch{return"";}}storeMiroToken(t){if(!(!this.workspace()||!this.hasLocalStorage()))try{localStorage.setItem(this.miroTokenStorageKey(),t);}catch{}}storeMiroBoardId(t){if(!(!this.workspace()||!this.hasLocalStorage()))try{localStorage.setItem(this.miroBoardStorageKey(),t);}catch{}}getStoredBoardMode(t=this.getStoredMiroBoardId()){if(!this.workspace()||!this.hasLocalStorage())return"create";try{let e=localStorage.getItem(this.boardModeStorageKey())==="add"?"add":"create";return t?e:"create";}catch{return"create";}}storeBoardMode(t){if(!(!this.workspace()||!this.hasLocalStorage()))try{localStorage.setItem(this.boardModeStorageKey(),t);}catch{}}miroLastExportItemIdsStorageKey(){return`ws_miro_last_export_ids_${this.workspace()}`;}loadStoredLastExportState(){let{state:t,lastExportAt:n}=this.readStoredLastExportState();this.lastExportState.set(t),this.lastExportAt.set(n);}readStoredLastExportState(){if(!this.workspace()||!this.hasLocalStorage())return{state:new Map(),lastExportAt:null};try{let n=localStorage.getItem(this.miroLastExportItemIdsStorageKey());if(!n)return{state:new Map(),lastExportAt:null};let e=JSON.parse(n);if(Array.isArray(e))return{state:new Map(e.map(i=>[i,null])),lastExportAt:null};if(e&&typeof e=="object"&&"items"in e){let i=e,a=new Map(),s=i.items||{};for(let[g,p]of Object.entries(s)){if(!p||typeof p!="object"){a.set(g,null);continue;}let u=typeof p.screenshotUrl=="string"?p.screenshotUrl:"",R=Number(p.exportedAt);a.set(g,{screenshotUrl:u,exportedAt:Number.isFinite(R)?R:Number(i.lastExportAt)||0});}let _=Number(i.lastExportAt);return{state:a,lastExportAt:Number.isFinite(_)?_:null};}let o=new Map();for(let[i,a]of Object.entries(e))o.set(i,{screenshotUrl:typeof a=="string"?a:"",exportedAt:0});return{state:o,lastExportAt:null};}catch{return{state:new Map(),lastExportAt:null};}}storeLastExportState(t){if(!(!this.workspace()||!this.hasLocalStorage()))try{let e=Date.now(),o=new Map(this.lastExportState());for(let[a,s]of t.entries())o.set(a,{screenshotUrl:s,exportedAt:e});this.lastExportState.set(o),this.lastExportAt.set(e);let i={};for(let[a,s]of o.entries())i[a]=s;localStorage.setItem(this.miroLastExportItemIdsStorageKey(),JSON.stringify({lastExportAt:e,items:i}));}catch{}}formatExportTimestamp(t){if(!t||!Number.isFinite(t)||t<=0)return"unknown";try{return new Date(t).toLocaleString();}catch{return"unknown";}}computeExistingBoardStartY(t,n,e){return A(this,null,function*(){if(!e)return 0;try{let o=yield this.getAllBoardItems(t,n);if(o.length===0)return 0;let i=0;for(let a of o){let s=Number(a?.position?.y??0),_=Number(a?.geometry?.height??0),g=s+(Number.isFinite(_)?_/2:0);Number.isFinite(g)&&(i=Math.max(i,g));}return i+800;}catch(o){return console.warn("[Miro Export] Could not inspect existing board items. Using fallback append offset.",o),3e3;}});}getAllBoardItems(t,n){return A(this,null,function*(){let e=[],o=`https://api.miro.com/v2/boards/${n}/items?limit=50`,i=0,a=30;for(;o&&i<a;){let s=yield this.miroGet(t,o),_=Array.isArray(s?.data)?s.data:[];e.push(..._),o=s?.links?.next||"",i+=1;}return e;});}indexExistingGroupFramesByTitle(t){let n=new Map();for(let e of t){if(e?.type!=="frame")continue;let o=typeof e?.data?.title=="string"?e.data.title:"",i=this.decodeHtmlEntities(o).replace(/<[^>]+>/g,"").trim();if(!i)continue;let a=Number(e?.position?.x),s=Number(e?.position?.y),_=Number(e?.geometry?.width),g=Number(e?.geometry?.height);if(!Number.isFinite(a)||!Number.isFinite(s)||!Number.isFinite(_)||!Number.isFinite(g))continue;let p=typeof e?.id=="string"?e.id:"";p&&n.set(this.canonicalizeTagTitle(i),{id:p,title:i,x:a,y:s,width:_,height:g});}return n;}getItemsInsideFrame(t,n){let e=n.x-n.width/2,o=n.x+n.width/2,i=n.y-n.height/2,a=n.y+n.height/2;return t.filter(s=>{if(s?.type==="frame")return!1;let _=Number(s?.position?.x),g=Number(s?.position?.y);return!Number.isFinite(_)||!Number.isFinite(g)?!1:_>=e&&_<=o&&g>=i&&g<=a;});}clearExistingItemsInBlock(t,n,e,o){return A(this,null,function*(){let i=e.filter(s=>{if((typeof s?.type=="string"?s.type:"")!=="image")return!1;let g=Number(s?.position?.x),p=Number(s?.position?.y);return!Number.isFinite(g)||!Number.isFinite(p)?!1:g>=o.left&&g<=o.right&&p>=o.top&&p<=o.bottom;});if(i.length===0)return e;let a=new Set();for(let s of i){let _=typeof s?.id=="string"?s.id:"";_&&(yield this.miroDelete(t,`https://api.miro.com/v2/boards/${n}/items/${encodeURIComponent(_)}`),a.add(_));}return e.filter(s=>{let _=typeof s?.id=="string"?s.id:"";return!a.has(_);});});}getOrCreateBoardTag(t,n,e,o,i){return A(this,null,function*(){let a=this.canonicalizeTagTitle(o),s=`${n}:${a}`,_=e.get(s);if(_)return _;for(let g=0;g<this.MIRO_TAG_RETRY_ATTEMPTS;g++)try{let u=(yield this.miroPost(t,`https://api.miro.com/v2/boards/${n}/tags`,{title:o,fillColor:i})).id;return e.set(s,u),u;}catch(p){let u=(p instanceof Error?p.message:String(p)).toLowerCase();if(u.includes("already exists")||u.includes("already_exist")||u.includes("duplicate")){let F=yield this.findBoardTagIdByTitle(t,n,a,e);if(F)return F;}if(!this.isRetriableMiroError(p)||g===this.MIRO_TAG_RETRY_ATTEMPTS-1)throw p;yield this.delay(this.retryDelayMs(g));}throw new Error("Failed to create or resolve Miro tag after retries.");});}preloadBoardTags(t,n,e){return A(this,null,function*(){let o=yield this.getAllBoardTags(t,n);for(let i of o){let a=typeof i?.title=="string"?i.title:"",s=typeof i?.id=="string"?i.id:"";if(!a||!s)continue;let _=this.canonicalizeTagTitle(a);e.set(`${n}:${_}`,s);}});}findBoardTagIdByTitle(t,n,e,o){return A(this,null,function*(){let i=`${n}:${e}`,a=o.get(i);if(a)return a;let s=yield this.getAllBoardTags(t,n);for(let _ of s){let g=typeof _?.title=="string"?_.title:"",p=typeof _?.id=="string"?_.id:"",u=this.canonicalizeTagTitle(g);if(g&&p&&o.set(`${n}:${u}`,p),u===e&&p)return p;}return null;});}canonicalizeTagTitle(t){return this.decodeHtmlEntities(t||"").trim().replace(/\s+/g," ").toLowerCase();}decodeHtmlEntities(t){return t.replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");}sanitizeMiroTagTitle(t){return this.decodeHtmlEntities(String(t||"")).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim().slice(0,this.MIRO_TAG_TITLE_MAX_LENGTH);}getAllBoardTags(t,n){return A(this,null,function*(){let e=[],o=`https://api.miro.com/v2/boards/${n}/tags?limit=50`,i=0,a=30;for(;o&&i<a;){let s=yield this.miroGet(t,o),_=Array.isArray(s?.data)?s.data:[];e.push(..._),o=s?.links?.next||"",i+=1;}return e;});}attachTagToItem(t,n,e,o){return A(this,null,function*(){let i=encodeURIComponent(e),a=`https://api.miro.com/v2/boards/${n}/items/${i}?tag_id=${encodeURIComponent(o)}`;for(let s=0;s<this.MIRO_TAG_RETRY_ATTEMPTS;s++)try{return yield this.miroPostNoContent(t,a),!0;}catch(_){let g=(_ instanceof Error?_.message:String(_)).toLowerCase();if(g.includes("409")&&(g.includes("already")||g.includes("duplicate")||g.includes("exist")))return!0;if(!this.isRetriableMiroError(_)||s===this.MIRO_TAG_RETRY_ATTEMPTS-1)return console.warn(`[Miro Export] Failed to attach tag ${o} to item ${e}. Continuing export.`,_),!1;yield this.delay(this.retryDelayMs(s));}return!1;});}isRetriableMiroError(t){let n=(t instanceof Error?t.message:String(t)).toLowerCase();return n.includes("429")||n.includes(" 500")||n.includes(" 502")||n.includes(" 503")||n.includes(" 504")||n.includes("timed out")||n.includes("networkerror")||n.includes("failed to fetch");}retryDelayMs(t){return Math.min(5e3,450*Math.pow(2,t));}delay(t){return new Promise(n=>setTimeout(n,t));}itemHasTag(t,n,e,o){return A(this,null,function*(){try{let i=encodeURIComponent(e),a=`https://api.miro.com/v2/boards/${n}/items/${i}/tags?limit=50`,s=0,_=40;for(;a&&s<_;){let g=yield this.miroGet(t,a);if((Array.isArray(g?.data)?g.data:[]).some(u=>String(u?.id||"")===o))return!0;a=g?.links?.next||"",s+=1;}return!1;}catch{return!1;}});}miroGet(t,n){return A(this,null,function*(){if(!t)throw new Error("Miro token is missing. Paste a personal access token and try again.");let e=yield this.miroFetch(n,{method:"GET",headers:{Authorization:`Bearer ${t}`}});if(!e.ok){let o=yield e.text();throw new Error(`Miro API error ${e.status}: ${o}`);}return e.json();});}miroPost(t,n,e){return A(this,null,function*(){if(!t)throw new Error("Miro token is missing. Paste a personal access token and try again.");let o=yield this.miroFetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!o.ok){let i=yield o.text();throw new Error(`Miro API error ${o.status}: ${i}`);}return o.json();});}miroPostNoContent(t,n){return A(this,null,function*(){if(!t)throw new Error("Miro token is missing. Paste a personal access token and try again.");let e=yield this.miroFetch(n,{method:"POST",headers:{Authorization:`Bearer ${t}`,accept:"application/json"}});if(!e.ok){let o=yield e.text();throw new Error(`Miro API error ${e.status}: ${o}`);}});}miroDelete(t,n){return A(this,null,function*(){if(!t)throw new Error("Miro token is missing. Paste a personal access token and try again.");let e=yield this.miroFetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${t}`,accept:"application/json"}});if(!e.ok){let o=yield e.text();throw new Error(`Miro API error ${e.status}: ${o}`);}});}miroPatch(t,n,e){return A(this,null,function*(){if(!t)throw new Error("Miro token is missing. Paste a personal access token and try again.");let o=yield this.miroFetch(n,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!o.ok){let i=yield o.text();throw new Error(`Miro API error ${o.status}: ${i}`);}return o.json();});}miroFetch(t,n){return A(this,null,function*(){let e=new AbortController(),o=setTimeout(()=>e.abort(),this.MIRO_REQUEST_TIMEOUT_MS);try{return yield fetch(t,Ut(Dt({},n),{signal:e.signal}));}catch(i){throw i instanceof Error&&i.name==="AbortError"?new Error(`Miro API request timed out after ${this.MIRO_REQUEST_TIMEOUT_MS/1e3} seconds.`):i;}finally{clearTimeout(o);}});}updateFrameTextItems(t,n,e,o,i,a){return A(this,null,function*(){let s=e.filter(g=>g?.type==="text"),_=Math.max(300,i-a*2);for(let g of s){let p=typeof g?.id=="string"?g.id:"";if(p)try{yield this.miroPatch(t,`https://api.miro.com/v2/boards/${n}/texts/${p}`,{geometry:{width:_},position:{x:o,y:Number(g?.position?.y),origin:"center"}});}catch{}}});}static ɵfac=function(n){return new(n||r)();};static ɵcmp=mn({type:r,selectors:[["app-showcase-ws-strategic"]],decls:8,vars:4,consts:()=>{let t;t="Strategic Workshop Hub";let n;n="Loading\u2026";let e;e="Groups & Participant Links";let o;o="Share each group's link with its members. They'll be guided through all "+"\uFFFD0\uFFFD"+" rounds.";let i;i="No groups configured. Go to Settings \u2192 Strategic Workshop to add groups.";let a;a="\u2713 Copied!";let s;s="Copy link";let _;_="Round Prompts";let g;g="Miro access token";let p;p="Composition Preview";let u;u=" Group \u2192 round \u2192 participant \u2192 item hierarchy with export state for each item. ";let R;R="Export to Miro";let V;V=" Select what to include using the checkboxes above, then export. ";let F;F=" Generate your token at "+"\uFFFD#57\uFFFD"+" miro.com \u2192 Profile \u2192 Apps \u2192 Token "+"\uFFFD/#57\uFFFD"+". The token is stored locally in this browser for this workspace. Boards created on Miro's free plan count against your 3-board limit. ";let b;b="Board Option";let y;y="Update existing board";let O;O=""+"\uFFFD*75:1\uFFFD"+" Exporting\u2026 "+"\uFFFD/*75:1\uFFFD"+""+"\uFFFD*76:2\uFFFD"+" Send to Miro "+"\uFFFD/*76:2\uFFFD"+"";let L;L="No composition data to preview.";let N;N="Unplaced items:";let it;it=" When enabled, export reuses existing frames and updates changed slots. ";let q;q=" No existing board yet. First export will create a board; then you can enable this toggle. ";let B;B=" Open \""+"\uFFFD0\uFFFD"+"\" in Miro \u2192 ";let U;U="Board is ready. You can open it while export continues.";let gt;gt=" Open \""+"\uFFFD0\uFFFD"+"\" in Miro \u2192 ";let rt;rt="Content added to existing board successfully!";let I;I="Board created successfully!";let Q;return Q=" If this board is already open in Miro, refresh the tab to see newly attached tags. ",[t,n,e,o,i,a,s,_,p,u,R,V,F,b,y,O,L,N,it,q,B,U,gt,rt,I,Q,[1,"ws-hub"],[1,"ws-hub-header"],[1,"ws-hub-name"],[1,"ws-loading"],["role","alert",1,"ws-error"],["aria-label","Page sections",1,"ws-tabs"],[1,"ws-tab-wrap"],["type","button",1,"ws-tab",3,"click"],["title","Permalink to export tab","aria-label","Permalink to export tab",1,"ws-tab-permalink",3,"href"],["title","Permalink to settings tab","aria-label","Permalink to settings tab",1,"ws-tab-permalink",3,"href"],["aria-labelledby","groups-heading",1,"ws-section"],["id","groups-heading"],[1,"ws-hint"],[1,"ws-empty"],["role","list",1,"ws-groups-list"],[1,"ws-group-card",3,"border-left-color"],["aria-labelledby","rounds-heading",1,"ws-section"],[1,"ws-group-card"],["aria-hidden","true",1,"ws-group-dot"],[1,"ws-group-name"],["type","button",1,"ws-copy-btn",3,"click"],["id","rounds-heading"],[1,"ws-rounds-list"],[1,"ws-round-item"],[1,"ws-round-badge"],[1,"ws-round-prompt"],["aria-labelledby","preview-heading",1,"ws-section","ws-preview-section","ws-preview-section-full"],["id","preview-heading"],[1,"ws-hint","ws-hint--small"],[1,"ws-preview-table-wrap"],[1,"ws-preview-table"],["aria-labelledby","miro-heading",1,"ws-section","ws-miro-section"],["id","miro-heading"],["viewBox","0 0 48 48","fill","none","xmlns","http://www.w3.org/2000/svg","aria-hidden","true",1,"ws-miro-logo"],["width","48","height","48","rx","8","fill","#FFD02F"],["x","8","y","36","font-size","28","font-family","Arial, sans-serif","font-weight","900","fill","#050038"],[1,"ws-tag-type-controls",3,"disabled"],[1,"ws-include-toggle"],["type","checkbox",3,"change","checked"],["href","https://miro.com/app/settings/user-profile/apps","target","_blank","rel","noopener noreferrer"],[1,"ws-board-mode",3,"disabled"],[1,"ws-mode-option","ws-mode-option--switch"],["type","checkbox","aria-label","Toggle update existing board",3,"change","checked","disabled"],["aria-hidden","true",1,"ws-switch"],[1,"ws-miro-result"],["role","alert",1,"ws-miro-error"],[1,"ws-export-bottom-bar"],["type","password","placeholder",g,"autocomplete","off","aria-label","Miro personal access token",1,"ws-token-input","ws-token-input-minimal",3,"input","value","disabled"],["type","button",1,"ws-miro-btn",3,"click","disabled"],["role","status","aria-live","polite",1,"ws-export-status"],[1,"ws-miro-progress"],[1,"ws-miro-error"],[1,"ws-preview-row-group"],["type","button",1,"ws-collapse-carrot",3,"click"],["colspan","5"],[1,"ws-preview-meta"],[1,"ws-preview-row-round"],["type","checkbox",3,"change","checked","disabled"],[1,"ws-preview-row-item",3,"--group-color","ws-item-excluded"],[1,"ws-preview-row-item"],["loading","lazy",1,"ws-preview-thumb",3,"src","alt"],[1,"ws-thumb-empty"],[1,"ws-preview-item-name"],[1,"ws-item-state"],[1,"ws-user-id",3,"title"],["colspan","7"],["role","status",1,"ws-preview-unplaced"],["target","_blank","rel","noopener noreferrer",1,"ws-miro-board-link",3,"href"]];},template:function(n,e){n&1&&(l(0,"div",26)(1,"header",27)(2,"h1"),f(3,0),c(),T(4,Fn,2,1,"p",28),c(),T(5,Ln,2,0,"div",29)(6,Bn,2,1,"div",30)(7,Ee,13,8),c()),n&2&&(d(4),M(e.workspaceMeta()?4:-1),d(),M(e.isLoading()?5:-1),d(),M(e.errorMsg()?6:-1),d(),M(!e.isLoading()&&!e.errorMsg()?7:-1));},styles:[`

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
.ws-hub[_ngcontent-%COMP%] {
  height: 100vh;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: #FFFDF6;
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
  padding-bottom: 108px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-tabs[_ngcontent-%COMP%] {
  max-width: 1100px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;
  display: flex;
  gap: 0.5rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-tabs[_ngcontent-%COMP%]   .ws-tab-wrap[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-tabs[_ngcontent-%COMP%]   .ws-tab[_ngcontent-%COMP%] {
  border: 1px solid rgba(78, 2, 178, 0.28);
  background: #fff;
  color: #4E02B2;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.ws-hub[_ngcontent-%COMP%]   .ws-tabs[_ngcontent-%COMP%]   .ws-tab.active[_ngcontent-%COMP%] {
  background: #4E02B2;
  color: #fff;
}
.ws-hub[_ngcontent-%COMP%]   .ws-tabs[_ngcontent-%COMP%]   .ws-tab-permalink[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(78, 2, 178, 0.28);
  background: #fff;
  color: #4E02B2;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
}
.ws-hub[_ngcontent-%COMP%]   .ws-tabs[_ngcontent-%COMP%]   .ws-tab-permalink[_ngcontent-%COMP%]:hover {
  background: rgba(78, 2, 178, 0.08);
}
.ws-hub[_ngcontent-%COMP%]   .ws-hub-header[_ngcontent-%COMP%] {
  background: #4E02B2;
  color: white;
  padding: 2rem 2rem 1.5rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-hub-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  margin: 0 0 0.25rem;
  font-size: 1.6rem;
  font-weight: 700;
}
.ws-hub[_ngcontent-%COMP%]   .ws-hub-header[_ngcontent-%COMP%]   .ws-hub-name[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%] {
  max-width: 100%;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-table-wrap[_ngcontent-%COMP%] {
  width: 100%;
  overflow: auto;
  max-height: 68vh;
  border: 1px solid #ddd7ea;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  min-width: 1040px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], 
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 0.48rem 0.55rem;
  border-bottom: 1px solid #f0edf8;
  vertical-align: middle;
  text-align: left;
  font-size: 0.82rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f7f4fc;
  color: #4f2b82;
  font-weight: 700;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-group[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  position: sticky;
  top: 2.15rem;
  z-index: 3;
  background: #f6f2ff;
  border-top: 1px solid #e2d7fb;
  font-weight: 600;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-round[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  position: sticky;
  top: 4.3rem;
  z-index: 2;
  background: #fbf9ff;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-group[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child, 
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-round[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child, 
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-item[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
  border-left: 4px solid var(--group-color, #607D8B);
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-group[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:not(:first-child), 
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-round[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:not(:first-child) {
  border-top: 1px solid rgba(78, 2, 178, 0.14);
  border-bottom: 1px solid rgba(78, 2, 178, 0.14);
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-participant[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  background: #fff;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-collapsed[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  color: #666;
  font-style: italic;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-parent-disabled[_ngcontent-%COMP%] {
  opacity: 0.6;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-thumb[_ngcontent-%COMP%] {
  width: 56px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid #dfd8ef;
  object-fit: contain;
  display: block;
  background: #f1edf8;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-collapse-carrot[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  color: #4E02B2;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-thumb-empty[_ngcontent-%COMP%] {
  font-size: 0.74rem;
  color: #777;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-include-toggle[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #5f4d81;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-include-toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  accent-color: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-include-toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  display: none;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-user-id[_ngcontent-%COMP%] {
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace;
  letter-spacing: 0.02em;
  color: #3f2b63;
}
@media (max-width: 900px) {
  .ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-table-wrap[_ngcontent-%COMP%] {
    max-height: 56vh;
  }
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-tree[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-tree[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0.4rem 0 0.8rem;
  padding-left: 1rem;
  border-left: 1px dashed #ddd7ea;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-node[_ngcontent-%COMP%] {
  margin-bottom: 0.35rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-node-group[_ngcontent-%COMP%] {
  background: #fff;
  border-left: 5px solid #607D8B;
  border-radius: 10px;
  padding: 0.7rem 0.8rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  margin-bottom: 0.9rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-node-round[_ngcontent-%COMP%], 
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-node-participant[_ngcontent-%COMP%], 
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-node-item[_ngcontent-%COMP%] {
  padding: 0.3rem 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.86rem;
  color: #333;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-row-item[_ngcontent-%COMP%] {
  gap: 0.45rem 0.65rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-item-name[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #1f1f1f;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-meta[_ngcontent-%COMP%] {
  color: #666;
  font-size: 0.79rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-item-state[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
  font-size: 0.73rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.25;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-item-state.ws-item-state-new[_ngcontent-%COMP%] {
  background: rgba(76, 175, 80, 0.12);
  color: #2e7d32;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-item-state.ws-item-state-updated[_ngcontent-%COMP%] {
  background: rgba(255, 152, 0, 0.14);
  color: #b45309;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-item-state.ws-item-state-unchanged[_ngcontent-%COMP%] {
  background: rgba(120, 120, 120, 0.12);
  color: #5f6368;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-group[_ngcontent-%COMP%] {
  background: #fff;
  border-left: 6px solid #607D8B;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 2.5rem;
  line-height: 1.05;
  color: #222;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-round[_ngcontent-%COMP%] {
  border: 1px solid #ececf5;
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background:
    linear-gradient(
      180deg,
      #fafafd 0%,
      #ffffff 100%);
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-round[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  margin: 0 0 1.3rem;
  font-size: 1rem;
  color: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-participant[_ngcontent-%COMP%] {
  margin-bottom: 0.65rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-participant-name[_ngcontent-%COMP%] {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e1e1e;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-empty[_ngcontent-%COMP%] {
  margin: 0.1rem 0 0.5rem;
  color: #888;
  font-size: 0.85rem;
  font-style: italic;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-items-row[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: flex-start;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-item-block[_ngcontent-%COMP%] {
  width: 230px;
  border: 1px solid #e5e5ee;
  border-radius: 10px;
  padding: 0.5rem;
  background: #fff;
  display: grid;
  grid-template-columns: 98px 1fr;
  grid-template-rows: 150px auto;
  gap: 0.45rem 0.5rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-tag-stack[_ngcontent-%COMP%] {
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 0.35rem;
  width: 88px;
  height: 150px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-tag-card[_ngcontent-%COMP%] {
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 6px;
  padding: 0.25rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-tag-line[_ngcontent-%COMP%] {
  font-size: 0.62rem;
  line-height: 1.2;
  font-weight: 700;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-image-box[_ngcontent-%COMP%] {
  grid-column: 2;
  grid-row: 1;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-image-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-image-missing[_ngcontent-%COMP%] {
  font-size: 0.78rem;
  color: #777;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-item-title[_ngcontent-%COMP%] {
  grid-column: 1 / span 2;
  grid-row: 2;
  margin: 0;
  font-size: 0.78rem;
  color: #333;
  line-height: 1.35;
  max-height: 2.7em;
  overflow: hidden;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-unplaced[_ngcontent-%COMP%] {
  margin-top: 0.4rem;
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  background: #fff5f5;
  border: 1px solid #ffd7d7;
  color: #8a2525;
  font-size: 0.84rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section[_ngcontent-%COMP%]   .ws-preview-unplaced[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  margin: 0.35rem 0 0;
  padding-left: 1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-preview-section-full[_ngcontent-%COMP%] {
  max-width: 100%;
  width: 100%;
  padding-left: 0.85rem;
  padding-right: 0.85rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-loading[_ngcontent-%COMP%] {
  padding: 3rem;
  text-align: center;
  color: #666;
}
.ws-hub[_ngcontent-%COMP%]   .ws-error[_ngcontent-%COMP%] {
  margin: 1.5rem;
  padding: 1rem 1.25rem;
  background: #ffeaea;
  border: 1.5px solid #e53935;
  border-radius: 8px;
  color: #b71c1c;
}
.ws-hub[_ngcontent-%COMP%]   .ws-section[_ngcontent-%COMP%] {
  max-width: none;
  width: 100%;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4E02B2;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-section[_ngcontent-%COMP%]   .ws-hint[_ngcontent-%COMP%] {
  font-size: 0.92rem;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.5;
}
.ws-hub[_ngcontent-%COMP%]   .ws-section[_ngcontent-%COMP%]   .ws-hint.ws-hint--small[_ngcontent-%COMP%] {
  font-size: 0.82rem;
  color: #777;
}
.ws-hub[_ngcontent-%COMP%]   .ws-section[_ngcontent-%COMP%]   .ws-hint.ws-hint--small[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-section[_ngcontent-%COMP%]   .ws-empty[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%]   .ws-group-card[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  border-left: 4px solid #607D8B;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%]   .ws-group-card[_ngcontent-%COMP%]   .ws-group-dot[_ngcontent-%COMP%] {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%]   .ws-group-card[_ngcontent-%COMP%]   .ws-group-name[_ngcontent-%COMP%] {
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%]   .ws-group-card[_ngcontent-%COMP%]   .ws-copy-btn[_ngcontent-%COMP%] {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  border: 1.5px solid #4E02B2;
  background: transparent;
  color: #4E02B2;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%]   .ws-group-card[_ngcontent-%COMP%]   .ws-copy-btn[_ngcontent-%COMP%]:hover {
  background: #4E02B2;
  color: white;
}
.ws-hub[_ngcontent-%COMP%]   .ws-groups-list[_ngcontent-%COMP%]   .ws-group-card[_ngcontent-%COMP%]   .ws-copy-btn.copied[_ngcontent-%COMP%] {
  background: #4CAF50;
  border-color: #4CAF50;
  color: white;
}
.ws-hub[_ngcontent-%COMP%]   .ws-rounds-list[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-rounds-list[_ngcontent-%COMP%]   .ws-round-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-rounds-list[_ngcontent-%COMP%]   .ws-round-item[_ngcontent-%COMP%]   .ws-round-badge[_ngcontent-%COMP%] {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4E02B2;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ws-hub[_ngcontent-%COMP%]   .ws-rounds-list[_ngcontent-%COMP%]   .ws-round-item[_ngcontent-%COMP%]   .ws-round-prompt[_ngcontent-%COMP%] {
  font-size: 0.92rem;
  color: #333;
  line-height: 1.5;
  padding-top: 4px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-logo[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
  border-radius: 4px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%] {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  background: #fafafa;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {
  font-size: 0.85rem;
  font-weight: 700;
  color: #4E02B2;
  margin-bottom: 0.5rem;
  padding: 0 0.25rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.4rem;
  cursor: pointer;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%] {
  cursor: pointer;
  margin: 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option[_ngcontent-%COMP%]:hover   input[type=radio][_ngcontent-%COMP%] {
  accent-color: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option.ws-mode-option--switch[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option.ws-mode-option--switch[_ngcontent-%COMP%]   .ws-switch[_ngcontent-%COMP%] {
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: #cdd1d6;
  position: relative;
  transition: background 0.2s ease;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option.ws-mode-option--switch[_ngcontent-%COMP%]   .ws-switch[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option.ws-mode-option--switch[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:checked    + .ws-switch[_ngcontent-%COMP%] {
  background: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option.ws-mode-option--switch[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:checked    + .ws-switch[_ngcontent-%COMP%]::after {
  transform: translateX(18px);
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]   .ws-mode-option.ws-mode-option--switch[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%]:disabled    + .ws-switch[_ngcontent-%COMP%] {
  opacity: 0.6;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-board-mode[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-tag-type-controls[_ngcontent-%COMP%] {
  margin: 0 0 1rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-tag-type-controls[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  font-weight: 700;
  color: #4E02B2;
  padding: 0 0.25rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-tag-type-controls[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%]   .ws-token-input[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 240px;
  padding: 0.65rem 1rem;
  border-radius: 10px;
  border: 1.5px solid #ccc;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%]   .ws-token-input[_ngcontent-%COMP%]:focus {
  border-color: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%]   .ws-token-input[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%]   .ws-miro-btn[_ngcontent-%COMP%] {
  padding: 0.65rem 1.4rem;
  border-radius: 10px;
  border: none;
  background: #FFD02F;
  color: #050038;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s;
  white-space: nowrap;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%]   .ws-miro-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  filter: brightness(0.95);
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-form[_ngcontent-%COMP%]   .ws-miro-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-include-toggle[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #5f4d81;
  text-transform: uppercase;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-include-toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  accent-color: #4E02B2;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-include-toggle-round[_ngcontent-%COMP%] {
  margin: -0.7rem 0 0.75rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-include-toggle-item[_ngcontent-%COMP%] {
  position: absolute;
  left: 0.35rem;
  top: 0.35rem;
  z-index: 11;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 6px;
  padding: 0.18rem 0.35rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-item-excluded[_ngcontent-%COMP%] {
  opacity: 0.42;
  filter: grayscale(0.25);
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-progress[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #555;
  font-style: italic;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-error[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #c62828;
  background: #ffeaea;
  padding: 0.6rem 1rem;
  border-radius: 8px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-result[_ngcontent-%COMP%] {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 1rem 1.25rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0 0 0.5rem;
  font-weight: 600;
  color: #2e7d32;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-miro-result[_ngcontent-%COMP%]   .ws-miro-board-link[_ngcontent-%COMP%] {
  color: #4E02B2;
  font-weight: 600;
  font-size: 0.95rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-info[_ngcontent-%COMP%] {
  background: #f0f4ff;
  border: 1px solid #c5d9ff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #4a5568;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0 0 0.75rem;
  font-weight: 600;
  color: #2c3e50;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-info[_ngcontent-%COMP%]   .ws-delta-legend[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-info[_ngcontent-%COMP%]   .ws-delta-legend[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge[_ngcontent-%COMP%] {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge.ws-delta-new[_ngcontent-%COMP%] {
  background: #4caf50;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge.ws-delta-updated[_ngcontent-%COMP%] {
  background: #ff9800;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge.ws-delta-unchanged[_ngcontent-%COMP%] {
  background: #bdbdbd;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-item-status-badge[_ngcontent-%COMP%] {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-item-status-badge.ws-item-status-new[_ngcontent-%COMP%] {
  background: #4caf50;
  color: white;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-item-status-badge.ws-item-status-updated[_ngcontent-%COMP%] {
  background: #ff9800;
  color: white;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-item-status-badge.ws-item-status-unchanged[_ngcontent-%COMP%] {
  background: #bdbdbd;
  color: white;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-item-block[_ngcontent-%COMP%] {
  position: relative;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-item-block.ws-item-new[_ngcontent-%COMP%] {
  border-color: #4caf50;
  border-width: 2px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-item-block.ws-item-updated[_ngcontent-%COMP%] {
  border-color: #ff9800;
  border-width: 2px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-item-block.ws-item-unchanged[_ngcontent-%COMP%] {
  opacity: 0.6;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%]   .ws-preview-group-title[_ngcontent-%COMP%] {
  flex: 1;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%]   .ws-preview-group-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%]   .ws-preview-group-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-preview-group-header[_ngcontent-%COMP%]   .ws-preview-group-delta[_ngcontent-%COMP%] {
  display: flex;
  gap: 1rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-stat[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-stat.ws-delta-stat-new[_ngcontent-%COMP%] {
  background: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-stat.ws-delta-stat-updated[_ngcontent-%COMP%] {
  background: rgba(255, 152, 0, 0.1);
  color: #e65100;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge-small[_ngcontent-%COMP%] {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge-small.ws-delta-new[_ngcontent-%COMP%] {
  background: #4caf50;
}
.ws-hub[_ngcontent-%COMP%]   .ws-miro-section[_ngcontent-%COMP%]   .ws-delta-badge-small.ws-delta-updated[_ngcontent-%COMP%] {
  background: #ff9800;
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%] {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background: rgba(250, 247, 241, 0.97);
  border-top: 1px solid rgba(78, 2, 178, 0.22);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  display: grid;
  grid-template-columns: minmax(180px, 360px) auto 1fr;
  gap: 0.6rem;
  align-items: center;
  padding: 0.55rem 1rem calc(0.55rem + env(safe-area-inset-bottom));
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%]   .ws-token-input-minimal[_ngcontent-%COMP%] {
  min-width: 0;
  width: 100%;
  padding: 0.48rem 0.7rem;
  border-radius: 8px;
  border: 1px solid #d7d3e4;
  background: #fff;
  font-size: 0.84rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%]   .ws-miro-btn[_ngcontent-%COMP%] {
  padding: 0.5rem 0.95rem;
  border-radius: 8px;
  border: none;
  background: #FFD02F;
  color: #050038;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%]   .ws-miro-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: default;
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%]   .ws-export-status[_ngcontent-%COMP%] {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%]   .ws-export-status[_ngcontent-%COMP%]   .ws-miro-progress[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.82rem;
}
.ws-hub[_ngcontent-%COMP%]   .ws-export-bottom-bar[_ngcontent-%COMP%]   .ws-export-status[_ngcontent-%COMP%]   .ws-miro-error[_ngcontent-%COMP%] {
  margin: 0;
  padding: 0.25rem 0.5rem;
  font-size: 0.78rem;
}`],changeDetection:0});};export{Pn as ShowcaseWsStrategicComponent};/**i18n:8dff8178f621bcc69192725557201a809317b399ed00a24037a7b59a2f24ea18*/