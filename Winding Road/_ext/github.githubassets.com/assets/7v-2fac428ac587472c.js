performance.mark("js-parse-end:7v-2fac428ac587472c.js");
export const __rspack_esm_ids=["7v"];export const __webpack_modules__={jGq(t,e,i){class s extends Event{name;filter;value;description;inlineDescription=!1;action;priority;icon;avatar;constructor({filter:t,value:e,name:i="",description:s="",inlineDescription:r=!1,priority:a=1/0,icon:n,avatar:l,action:o}){super("filter-item"),this.filter=t,this.value=e,this.name=i,this.description=s,this.inlineDescription=r,this.priority=a,this.icon=n,this.avatar=l,this.action=o}}class r extends Event{id;priority;value;action;description;icon;scope;prefixText;prefixColor;isFallbackSuggestion;constructor({id:t,priority:e,value:i,action:s,description:r="",icon:a,scope:n="DEFAULT",prefixText:l,prefixColor:o,isFallbackSuggestion:u,isUpdate:c}){super(c?"update-item":"search-item"),this.id=t,this.priority=e,this.value=i,this.prefixText=l,this.prefixColor=o,this.action=s,this.description=r,this.icon=a,this.scope=n,this.isFallbackSuggestion=u||!1}}class a extends Event{fetchPromise;constructor(t){super("fetch-data"),this.fetchPromise=t}}class n extends Event{parsedQuery;rawQuery;parsedMetadata;constructor(t,e,i){super("query"),this.parsedQuery=t,this.rawQuery=e,this.parsedMetadata=i}toString(){return this.rawQuery}}Event,i.d(e,{},{CN:r,P$:n,VJ:{Normal:"normal",Entity:"entity",Constant:"constant",FilterValue:"filter-value"},dS:a,k8:"Autocomplete",m4:{Apps:"apps",Archived:"archived",Book:"book",Bookmark:"bookmark",Branch:"branch",Calendar:"calendar",Circle:"circle",Code:"code",CodeReview:"code-review",CodeSquare:"code-square",Comment:"comment",CommentDiscussion:"comment-discussion",Copilot:"copilot",CopilotError:"copilot-error",Codespaces:"codespaces",CreditCard:"credit-card",Default:"default",DeviceDesktop:"device-desktop",DeviceMobile:"device-mobile",Discussion:"discussion",Draft:"draft",FileCode:"file-code",Filter:"filter",Forbidden:"forbidden",Gift:"gift",Globe:"globe",Heart:"heart",History:"history",Issue:"issue",IssueOpened:"issue-opened",IssueClosed:"issueClosed",Iterations:"iterations",Mention:"mention",Merged:"merged",Milestone:"milestone",No:"no",Not:"not",Organization:"organization",Package:"package",Pencil:"pencil",Person:"person",Play:"play",PlusCircle:"plus-circle",Project:"project",PullRequest:"pullRequest",Question:"question",Reaction:"reaction",Repo:"repo",Rocket:"rocket",Search:"search",Server:"server",ShieldCheck:"shield-check",SingleSelect:"single-select",Sort:"sort",Stack:"stack",Tag:"tag",Team:"team",Telescope:"telescope",Trash:"trash",Workflow:"workflow"},nM:function(t){return t instanceof Object},o7:{DIRECTORY:"Search in this directory",ORG:"Search in this organization",OWNER:"Search in this owner",REPO:"Search in this repository",ENTERPRISE:"Search in this enterprise",GITHUB:"Search all of GitHub",GENERAL:"Submit search",COMMAND:"Run command",COPILOT_CHAT:"Start a new Copilot thread",COPILOT_SEARCH:"Search with Copilot",AI_RESOURCES:"Search AI resources",EXPLORE:"Learn More",DEFAULT:"Jump to"},qi:s,yk:{Entity:"--color-prettylights-syntax-entity",Constant:"--color-prettylights-syntax-constant",Keyword:"--color-prettylights-syntax-keyword",Variable:"--color-prettylights-syntax-variable",String:"--color-prettylights-syntax-string"}})},lQo(t,e,i){i.d(e,{dS:()=>o.dS,qi:()=>o.qi,m4:()=>o.m4,MK:()=>h,CN:()=>o.CN});var s=i("Vd"),r=i("b"),a=i("Q1"),n=i("D"),l=i("sh"),o=i("jGq");class u{#t;#e;constructor(t){this.#t=t}resetSignature(){this.#e=void 0}render(t,{usingCustomParser:e,filterKey:i}){this.#i(this.#t.input.value);let s=this.#s(t,e,i);if(s!==this.#e){let r=document.createDocumentFragment();for(let s of t){let t=document.createElement("span"),a=document.createElement("span");a.textContent=" ";let n=!e;if("filter"===s.type){let{filter:e,value:r}=s,l=document.createElement("span");t.setAttribute("data-type","filter-expression"),l.setAttribute("data-type","filter"),l.textContent=e;let o=document.createElement("span");o.textContent=i;let u=document.createElement("span");u.setAttribute("data-type","filter-value"),u.textContent=r,t.appendChild(l),t.appendChild(o),t.appendChild(u),n&&t.appendChild(a)}else n?t.textContent=`${s.value} `:t.textContent=s.value,s.style===o.VJ.Constant?t.classList.add("qb-constant"):s.style===o.VJ.Entity?t.classList.add("qb-entity"):s.style===o.VJ.FilterValue&&t.classList.add("qb-filter-value");r.append(t)}this.#t.styledInputContent.replaceChildren(r),this.#e=s}t.length>0&&this.#r()}#s(t,e,i){return JSON.stringify([e,i,t.map(t=>"filter"===t.type?["f",t.filter,t.value]:["t",t.style??"",t.value])])}#i(t){let{input:e,sizer:i}=this.#t;if(i.textContent="",null!==e.selectionStart&&e.selectionStart===e.selectionEnd){let s=e.selectionStart,r=document.createElement("span");i.append(t.substring(0,s),r,t.substring(s))}else i.textContent=t}#r(){let{input:t,sizer:e,styledInputContainer:i,minWidth:s}=this.#t;requestAnimationFrame(()=>{let r=e.querySelector("span");r&&(r.offsetLeft<i.scrollLeft?i.scrollLeft=r.offsetLeft-s:r.offsetLeft>i.scrollLeft+i.clientWidth&&(i.scrollLeft=r.offsetLeft-i.clientWidth+s));let a=Math.max(e.scrollWidth+2,2*(""===t.value),s);t.style.width=`${a}px`})}}class c extends Event{key;text;data;constructor(t,e,i){super("query-builder-feedback",{bubbles:!0,cancelable:!0}),this.key=t,this.text=e,this.data=i}}let d=(t,e)=>t.priority-e.priority;class h extends HTMLElement{#a;#n=!1;#l=!1;#o={};#u=new Set;#c=null;#d=null;#h=new Map;#p=new Map;#m=new Set;#f=new Set;#y=new Map;#v;#g="QueryBuilder-focus";#b=new Map;#I=new u(this);#A=new Map;#C=0;#L=150;#$=3e3;#E=!1;#q=!1;#S=!1;parser={parse:this.#w.bind(this),flatten:t=>t};parsedMetadata=void 0;renderSingularItemNames=!1;#x=!1;lastParsedQuery=void 0;FOCUS_TIMEOUT_VALUE=100;minWidth=300;get input(){return(0,r.FB)(this,"input")}get styledInputContent(){return(0,r.FB)(this,"styledInputContent")}get styledInputContainer(){return(0,r.FB)(this,"styledInputContainer")}get styledInput(){return(0,r.FB)(this,"styledInput")}get overlay(){return(0,r.FB)(this,"overlay")}get sizer(){return(0,r.FB)(this,"sizer")}get clearButton(){return(0,r.FB)(this,"clearButton")}get resultsList(){return(0,r.FB)(this,"resultsList")}get screenReaderFeedback(){return(0,r.FB)(this,"screenReaderFeedback")}get query(){return this.input.value}get i18n(){return{suggestion:"suggestion",suggestions:"suggestions",clear_search:"Input cleared."}}#k(t){return t.ctrlKey||t.metaKey}#F(t,e){this.dispatchEvent(new CustomEvent("query-builder:navigate",{bubbles:!0,detail:{url:t}})),e&&this.#k(e)?window.open(t):window.location.href=t}navigate(t){let e=t?.target?.closest("li"),i=this.#R(e);i&&((0,n.BI)("query-builder-element.click",{url:i}),this.#F(i,t instanceof MouseEvent?t:void 0))}#R(t){if(!t)return;let e=t.getAttribute("id");if(e)return this.#A.get(e)}get closed(){return this.overlay&&this.overlay.hasAttribute("hidden")}set closed(t){if(t)this.closed||(this.overlay&&(this.overlay.hidden=!0),this.input.setAttribute("aria-expanded","false"),this.#a?.clearSelection(),this.screenReaderFeedback.hidden=!0);else{if(!this.closed)return;this.overlay&&(this.overlay.hidden=!1),this.input.setAttribute("aria-expanded","true"),this.screenReaderFeedback.hidden=!1}}show(){this.closed=!1,this.overlay?.scrollIntoView?.({behavior:"smooth",block:"nearest"})}hide(){"false"===this.resultsList.getAttribute("data-persist-list")&&(this.closed=!0)}initialize(t,e){for(let i of(this.parser=t,this.#x=!0,this.#q=!0,e))this.attachProvider(i);this.#q=!1,this.#o=e.reduce((t,e)=>({...t,[e.value]:e}),{})}elementDefinitionReadyForProviders=t=>{t.detail.id===this.#v&&(this.readyForRequestProviders(),t.stopImmediatePropagation())};detachElementDefinitionReadyForProviders(){this.removeEventListener("query-builder:ready-to-request-provider",this.elementDefinitionReadyForProviders)}connectedCallback(){this.#c?.abort();let{signal:t}=this.#c=new AbortController;t.addEventListener("abort",()=>{this.#o={}}),this.#v=this.input.getAttribute("id"),this.hasAttribute("defer-request-providers")||(document.addEventListener("query-builder:ready-to-request-provider",this.elementDefinitionReadyForProviders,!0),this.readyForRequestProviders())}readyForRequestProviders(){this.#P()>0&&this.#S||(this.#a||=new a.A(this.input,this.resultsList,{tabInsertsSuggestions:!1}),this.requestProviders())}async requestProviders(){this.#S=!0,await Promise.resolve(),this.#q=!0,this.dispatchEvent(new Event("query-builder:request-provider",{bubbles:!0})),this.#q=!1,this.#b=new Map,this.#I.resetSignature();let t=this.parseInputValue();this.styleInputText(t),this.toggleClearButtonVisibility()}parseInputValue(){return this.parsedMetadata=this.parser.parse(this.input.value,this.input.selectionStart||0),this.parser.flatten(this.parsedMetadata)}attachProvider(t){if(!this.#c)return;let{signal:e}=this.#c;if(!this.#q)throw Error("Can't attach providers after the query builder has been connected");if(!this.#o[t.value])if(this.#o[t.value]=t,"filter"===t.type)this.#u.add(t.value),t.addEventListener("filter-item",e=>{this.#B(this.#y,t),this.#y.get(t)?.push(e),this.#O()},{signal:e}),t.addEventListener("show",()=>{this.#f.add(t),this.#O()},{signal:e}),t.addEventListener("fetch-data",async t=>{let e=new Promise(t=>setTimeout(t,this.#$));this.#E=Promise.race([Promise.all([this.#E,t.fetchPromise]),e]);let i=this.#E;try{await i}catch(t){if("AbortError"!==t.name)throw this.#E=!1,t}i===this.#E&&(this.#E=!1,this.#O(),this.updateVisibility())},{signal:e});else{let i=0;t.addEventListener("fetch-data",async e=>{let s=++i;this.#m.delete(t),await e.fetchPromise,s===i&&(this.#h.set(t,this.#p.get(t)||[]),this.#p.delete(t),this.#O())}),t.addEventListener("search-item",e=>{this.#B(this.#h,t),this.#p.has(t)?this.#p.get(t)?.push(e):(this.#m.has(t)&&(this.#h.set(t,[]),this.#m.delete(t)),this.#h.get(t)?.push(e),this.#O())},{signal:e}),t.addEventListener("update-item",e=>{let i=this.#h.get(t);if(!i)return;let s=i.findIndex(t=>t.id===e.id);s<0||(i[s]=e,this.#O())},{signal:e})}}disconnectedCallback(){this.#c?.abort()}comboboxCommit(t){let e=t.target,i=e?.getAttribute("data-type"),s=e?.getAttribute("data-value")||"",r=e?.getAttribute("data-replace-query-with")||"",a=parseInt(e?.getAttribute("data-move-caret-to")||"0")||0,n=this.parseInputValue();if("url-result"===i);else if("filter-result"===i)n.pop(),n.push({type:"filter",filter:s,value:""});else if("command-result"===i){let t=e.getAttribute("data-command-name")||"",i=JSON.parse(e.getAttribute("data-command-payload")||"{}");this.dispatchEvent(new CustomEvent(t,{detail:i}))}else if("query-result"===i)if(r)this.input.value=r,this.input.focus(),n=void 0;else{let t=this.parser.flatten(this.parser.parse(s,0));n.push(...t),n.push({type:"text",value:""})}else"filter-item"===i&&(r?(this.input.value=r,this.input.focus(),n=void 0):this.addSelectedItemToFilter(s,n));if(this.parseQuery(n),r){let t=-1===a?this.input.value.length:a;this.input.setSelectionRange(t,t)}this.input.removeAttribute("aria-activedescendant")}addSelectedItemToFilter(t,e){let i=/\s/.test(t),s=e.pop();if(s?.type==="filter"){let r=s.value.split(",");r.pop(),r.push(i?`"${t}"`:t),e.push({type:"filter",filter:s?.filter,value:r.join(",")}),e.push({type:"text",value:""})}else s&&e.push(s)}async inputChange(){await this.parseQuery()}inputBlur(){if(clearTimeout(this.focusTimeout),this.#n){this.#n=!1;return}this.styledInput.classList.remove(this.#g),this.input.removeAttribute("aria-activedescendant"),this.hide()}resultsMousedown(){this.#n=!0}async inputFocus(){this.styledInput.classList.add(this.#g),this.readyForRequestProviders(),this.#a.start();let t=this.input.value;this.lastParsedQuery&&this.lastParsedQuery===this.input.value||await this.parseQuery(),this.closed&&this.input.value===t&&this.input.setSelectionRange(0,this.input.value.length),this.focusTimeout?clearTimeout(this.focusTimeout):this.focusTimeout=setTimeout(()=>{this.input.focus()},this.FOCUS_TIMEOUT_VALUE)}moveCaretToEndOfInput(){this.input.setSelectionRange(this.input.value.length,this.input.value.length)}hasFocus(){return this.styledInput.classList.contains(this.#g)}inputKeydown(t){let e=t.key;if("Escape"===e)this.hide();else if("Enter"===e){let e=this.resultsList.querySelector('[aria-selected="true"], [data-combobox-option-default="true"]');if(!e||"true"===e.getAttribute("aria-disabled"))return;let i=this.#R(e);if(!i)return;this.#F(i,t)}}inputSubmit(){this.hide()}clearButtonFocus(t){let e=t.relatedTarget;e&&e===this.input&&this.show()}clearButtonBlur(){this.hide()}toggleClearButtonVisibility(){if(this.clearButton)if(""!==this.input.value){if(!1===this.clearButton.hidden)return;this.clearButton.hidden=!1}else this.clearButton.hidden=!0}updateVisibility(){this.hasFocus()&&(this.#y.size>0||this.#h.size>0||this.#f.size>0?this.show():this.#E||this.hide())}#B=(t,e)=>{t.has(e)||t.set(e,[])};#T=!1;#O(){this.#T||(this.#T=!0,this.toggleClearButtonVisibility(),this.#T=!1,this.#M())}#D(){if(0!==this.#f.size)return(0,l.qy)`<li role="presentation" class="ActionList-sectionDivider">
      <h3 role="presentation" class="ActionList-sectionDivider-title p-2 text-left" aria-hidden="true">
        Suggested filters
      </h3>
      <ul role="presentation">
        ${[...this.#f].sort(d).map(t=>this.#V(t))}
      </ul>
    </li>`}#Q(t,e,i=!1){let s=[];if("filter"===t.type?t.manuallyDetermineFilterEligibility?s=this.#y.get(t)?.sort(d).map(t=>this.#N(t))||[]:e?.type==="filter"&&(s=this.#y.get(t)?.filter(t=>t.filter===e.filter).sort(d).map(t=>this.#N(t))||[]):s=[...this.#h.get(t)||[]].filter(t=>t.isFallbackSuggestion===i).sort(d).map(t=>this.#W(t)),s.length)if(""===t.name)return(0,l.qy)`<li role="presentation" class="ActionList-sectionDivider">
        <ul role="presentation">
          ${s}
        </ul>
      </li>`;else return(0,l.qy)`<li role="presentation" class="ActionList-sectionDivider">
        <h3
          role="presentation"
          class="ActionList-sectionDivider-title QueryBuilder-sectionTitle p-2 text-left"
          aria-hidden="true"
        >
          ${t.name}
        </h3>
        <ul role="presentation">
          ${s}
        </ul>
      </li>`}#H(){this.#A.clear(),this.#C=0}#M(){let t;this.#H();let e=this.parseInputValue().at(-1),i=Object.values(this.#o).sort((t,e)=>t.priority-e.priority).map(t=>this.#Q(t,e)).filter(t=>void 0!==t);this.#E||0!==i.length||(i=Object.values(this.#o).sort((t,e)=>t.priority-e.priority).map(t=>this.#Q(t,e,!0)).filter(t=>void 0!==t));let s=this.#D();s&&i.push(s),0===i.length?this.#E||(this.resultsList.textContent="",(0,l.XX)((0,l.qy)``,this.resultsList)):(0,l.XX)((0,l.qy)`${i.map((t,e)=>e===i.length-1?t:(0,l.qy)`${t}
                <li aria-hidden="true" class="ActionList-sectionDivider"></li>`)}`,this.resultsList);let r=this.resultsList.querySelectorAll('[role="option"]').length,a=1===r?this.i18n.suggestion:this.i18n.suggestions;t=`${r} ${a}.`,this.#l&&(t=`${this.i18n.clear_search} ${t}`,this.#l=!1),this.screenReaderFeedback.textContent===t&&(t+="\xa0"),setTimeout(()=>this.updateScreenReaderFeedback(t),this.#L)}#_(t){if(t)return t.replace(/\s/g,"-").toLowerCase()}getLeadingVisual(t,e){if(e){let t="org"===e.type?"avatar avatar-1 avatar-small":"avatar avatar-1 avatar-small circle";return(0,l.qy)`<img src="${e.url}" alt="" role="presentation" class="${t}" />`}if(t&&(0,o.nM)(t))return(0,l.qy)([t.html]);let i=document.getElementById(`${t}-icon`);return(0,l.qy)([i?.innerHTML])}#W({value:t,prefixText:e,prefixColor:i,target:s,action:r,description:a,icon:n,scope:u}){let c=`${this.#v||"search-item"}-result-${this.#C++}`;if("url"in r){let d="GENERAL"===u?`${o.o7[u]}`:`jump to this ${s.singularItemName}`,h=a?`, ${a}`:"",p=`${e?`${e} `:""}${t}${h}, ${d}`;this.#A.set(c,r.url);let m=null;return e&&(m=(0,l.qy)`
          <span>
            <div class="d-inline-flex position-relative">
              <div
                class="position-absolute rounded-1 flex-items-stretch height-full width-full"
                style="opacity: 0.1; background-color: var(${i})"
              ></div>
              <div class="px-1" style="color: var(${i})">${e}</div>
            </div>
            ${this.#U(t)}
          </span>
        `),(0,l.qy)`<li
        role="option"
        class="ActionListItem"
        data-type="url-result"
        id="${c}"
        data-value="${t}"
        aria-label="${p}"
        data-href="${r.url}"
        data-action="click:query-builder#navigate"
      >
        <span class="QueryBuilder-ListItem-link ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
          ${n?(0,l.qy)`<span id="${c}--leading" class="ActionListItem-visual ActionListItem-visual--leading">
                ${this.getLeadingVisual(n)}
              </span>`:null}
          <span class="ActionListItem-descriptionWrap">
            <span class="ActionListItem-label text-normal"> ${m||this.#U(t)} </span>
            ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
          </span>

          <span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
            >${o.o7[u]}</span
          >
        </span>
      </li>`}if("commandName"in r){let e=o.o7[u]||o.o7.COMMAND,i=a?`, ${a}`:"",s=`${t}${i}, ${e}`;return(0,l.qy)`<li
        role="option"
        class="ActionListItem"
        data-type="command-result"
        id="${c}"
        data-value="${t}"
        data-command-name="${r.commandName}"
        data-command-payload="${JSON.stringify(r.data)}"
        aria-label="${s}"
      >
        <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
          ${n?(0,l.qy)`<span id="${c}--leading" class="ActionListItem-visual ActionListItem-visual--leading">
                ${this.getLeadingVisual(n)}
              </span>`:null}
          <span class="ActionListItem-descriptionWrap">
            <span class="ActionListItem-label text-normal"> ${this.#U(t)} </span>
            ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
          </span>

          <span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
            >${e}</span
          >
        </span>
      </li>`}{let e="",i=0;"replaceQueryWith"in r&&(e=r.replaceQueryWith,i=r.moveCaretTo);let s="query"in r?o.o7[u]:o.k8;return(0,l.qy)` <li
        role="option"
        class="ActionListItem"
        data-type="query-result"
        data-value="${t}"
        aria-label="${t}${a?`, ${a}`:""}"
        data-replace-query-with="${e}"
        data-move-caret-to="${i}"
        id="${c}"
      >
        <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
          ${n?(0,l.qy)`<span id="${c}--leading" class="ActionListItem-visual ActionListItem-visual--leading">
                ${this.getLeadingVisual(n)}
              </span>`:null}
          <span class="ActionListItem-descriptionWrap">
            <span class="ActionListItem-label text-normal">${this.#U(t)}</span>
            ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
          </span>

          ${this.#h.size>0?(0,l.qy)`<span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
                >${s}</span
              >`:(0,l.qy)``}
        </span>
      </li>`}}#U(t){let e=this.parser.flatten(this.parser.parse(t,0)),i=!this.#x,s=[];for(let t of e)if("filter"===t.type)s.push((0,l.qy)`<span>${t.filter}:</span
            ><span data-type="filter-value">${t.value}${i?" ":""}</span>`);else{let e="";t.style===o.VJ.Constant?e="qb-constant":t.style===o.VJ.Entity?e="qb-entity":t.style===o.VJ.FilterValue&&(e="qb-filter-value"),s.push((0,l.qy)`<span class="${e}">${t.value}${i?" ":""}</span>`)}return s}#V({singularItemName:t,icon:e,description:i,value:s}){let r=i?`, ${i}`:"",a=`${this.renderSingularItemNames?t:s}${r}`;return(0,l.qy)` <li
      role="option"
      class="ActionListItem"
      data-type="filter-result"
      data-value="${s}"
      id="${this.#v||"filter"}-result-${this.#_(s)}"
      aria-label="${a}, filter"
    >
      <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
        ${e?(0,l.qy)`<span
              id="${this.#v||"filter"}-result-${this.#_(s)}--leading"
              class="ActionListItem-visual ActionListItem-visual--leading"
            >
              ${this.getLeadingVisual(e)}
            </span>`:null}
        <span class="ActionListItem-descriptionWrap">
          <span class="ActionListItem-label text-normal">
            ${this.renderSingularItemNames?t:`${s}:`}
          </span>
          ${i?(0,l.qy)`<span class="ActionListItem-description">${i}</span>`:null}
        </span>

        ${this.#h.size>0?(0,l.qy)`<span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
              >${o.k8}</span
            >`:(0,l.qy)``}
      </span>
    </li>`}#N({name:t,value:e,target:i,icon:s,avatar:r,description:a,inlineDescription:n,action:u}){let c=t&&t.length>0?t:e,d=a?`, ${a}`:"",h=i.singularItemName?`${c}${d}, autocomplete this ${i.singularItemName}`:`${c}${d}, ${i.name}`,p="",m=0;return u&&"replaceQueryWith"in u&&(p=u.replaceQueryWith,m=u.moveCaretTo),(0,l.qy)` <li
      role="option"
      class="ActionListItem"
      data-type="filter-item"
      data-replace-query-with="${p}"
      data-move-caret-to="${m}"
      data-value="${e}"
      id="${this.#v||"filter-item"}-result-${this.#_(e)}"
      aria-label="${h}"
    >
      <span class="ActionListContent ActionListContent--visual16 QueryBuilder-ListItem">
        ${s?(0,l.qy)`<span
              id="${this.#v||"filter-item"}-result-${this.#_(e)}--leading"
              class="ActionListItem-visual ActionListItem-visual--leading"
            >
              ${this.getLeadingVisual(s,r)}
            </span>`:null}
        <span class="${n?"ActionListItem-descriptionWrap-inline":"ActionListItem-descriptionWrap"}">
          <span class="ActionListItem-label text-normal">${c}</span>
          ${a?(0,l.qy)`<span class="ActionListItem-description">${a}</span>`:null}
        </span>

        ${this.#h.size>0?(0,l.qy)`<span aria-hidden="true" class="ActionListItem-description QueryBuilder-ListItem-trailing"
              >${o.k8}</span
            >`:(0,l.qy)``}
      </span>
    </li>`}updateScreenReaderFeedback(t){let e=new c("NEW_RESULTS",t,{});this.dispatchEvent(e),this.screenReaderFeedback.textContent=e.text}async clear(){this.dispatchEvent(new CustomEvent("query-builder:clear",{bubbles:!0,cancelable:!0}))&&await this.clearInput()}async clearInput({focusInput:t=!0}={}){await this.parseQuery([],t),this.#l=!0}async parseQuery(t,e=!0){this.#d?.abort();let{signal:i}=this.#d=new AbortController;if(t){let e=t.map(t=>"filter"===t.type?`${t.filter}:${t.value}`:t.value).join(this.#x?"":" "),i=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.input),"value")?.set;i?i?.call(this.input,e):this.input.value=e,this.input.dispatchEvent(new Event("change",{bubbles:!0}))}else t=this.parseInputValue();if(this.lastParsedQuery=this.input.value,await new Promise(t=>requestAnimationFrame(t)),i.aborted||(this.styleInputText(t),e&&this.input.focus(),await new Promise(t=>setTimeout(t,100)),i.aborted))return;for(let t of this.#h.keys())this.#m.add(t);this.#y.clear(),this.#f.clear();let s=new o.P$(t,this.input.value,this.parsedMetadata);this.dispatchEvent(s);let r=!1;for(let t of this.#m.keys())this.#h.delete(t),this.#m.delete(t),r=!0;r&&this.#O(),this.updateVisibility()}#w(t){let e=this.#b.get(t);if(e)return e.slice();{let e=[];for(let i of t.split(/\s(?=(?:[^"]*"[^"]*")*[^"]*$)/g)){let t=i.indexOf(this.filterKey);if(t>0){let s=i.substring(0,t),r=i.substring(t+1);e.push(this.#u.has(s)?{type:"filter",filter:s,value:r}:{type:"text",value:i})}else e.push({type:"text",value:i})}return this.#b.set(t,[...e]),e}}styleInputText(t){this.#I.render(t,{usingCustomParser:this.#x,filterKey:this.filterKey})}#P(){return Object.keys(this.#o).length}}(0,s.Cg)([r.CF],h.prototype,"filterKey",void 0),(0,s.Cg)([r.CF],h.prototype,"minWidth",void 0),h=(0,s.Cg)([(0,r.p_)("query-builder")],h)},Q1(t,e,i){function s(t){var e,i;if(!(t.target instanceof Element))return;let s=t.target.closest('[role="option"]');s&&"true"!==s.getAttribute("aria-disabled")&&(e=s,i={event:t},e.dispatchEvent(new CustomEvent("combobox-commit",{bubbles:!0,detail:i})))}function r(t,e){let i=e.querySelector('[aria-selected="true"], [data-combobox-option-default="true"]');return!!i&&("true"===i.getAttribute("aria-disabled")||(i.click(),!0))}function a(t){return!t.hidden&&!(t instanceof HTMLInputElement&&"hidden"===t.type)&&(t.offsetWidth>0||t.offsetHeight>0)}i.d(e,{},{A:class{constructor(t,e,{tabInsertsSuggestions:i,firstOptionSelectionMode:s,scrollIntoViewOptions:a}={}){this.input=t,this.list=e,this.tabInsertsSuggestions=null==i||i,this.firstOptionSelectionMode=null!=s?s:"none",this.scrollIntoViewOptions=null!=a?a:{block:"nearest",inline:"nearest"},this.isComposing=!1,e.id||(e.id=`combobox-${Math.random().toString().slice(2,6)}`),this.ctrlBindings=!!navigator.userAgent.match(/Macintosh/),this.keyboardEventHandler=t=>(function(t,e){if(!t.shiftKey&&!t.metaKey&&!t.altKey&&(e.ctrlBindings||!t.ctrlKey)&&!e.isComposing)switch(t.key){case"Enter":r(e.input,e.list)&&t.preventDefault();break;case"Tab":e.tabInsertsSuggestions&&r(e.input,e.list)&&t.preventDefault();break;case"Escape":e.clearSelection();break;case"ArrowDown":e.navigate(1),t.preventDefault();break;case"ArrowUp":e.navigate(-1),t.preventDefault();break;case"n":e.ctrlBindings&&t.ctrlKey&&(e.navigate(1),t.preventDefault());break;case"p":e.ctrlBindings&&t.ctrlKey&&(e.navigate(-1),t.preventDefault());break;default:if(t.ctrlKey)break;e.resetSelection()}})(t,this),this.compositionEventHandler=t=>{var e,i;return e=t,i=this,void(i.isComposing="compositionstart"===e.type,document.getElementById(i.input.getAttribute("aria-controls")||"")&&i.clearSelection())},this.inputHandler=this.clearSelection.bind(this),t.setAttribute("role","combobox"),t.setAttribute("aria-controls",e.id),t.setAttribute("aria-expanded","false"),t.setAttribute("aria-autocomplete","list"),t.setAttribute("aria-haspopup","listbox")}destroy(){this.clearSelection(),this.stop(),this.input.removeAttribute("role"),this.input.removeAttribute("aria-controls"),this.input.removeAttribute("aria-expanded"),this.input.removeAttribute("aria-autocomplete"),this.input.removeAttribute("aria-haspopup")}start(){this.input.setAttribute("aria-expanded","true"),this.input.addEventListener("compositionstart",this.compositionEventHandler),this.input.addEventListener("compositionend",this.compositionEventHandler),this.input.addEventListener("input",this.inputHandler),this.input.addEventListener("keydown",this.keyboardEventHandler),this.list.addEventListener("click",s),this.resetSelection()}stop(){this.clearSelection(),this.input.setAttribute("aria-expanded","false"),this.input.removeEventListener("compositionstart",this.compositionEventHandler),this.input.removeEventListener("compositionend",this.compositionEventHandler),this.input.removeEventListener("input",this.inputHandler),this.input.removeEventListener("keydown",this.keyboardEventHandler),this.list.removeEventListener("click",s)}indicateDefaultOption(){var t;"active"===this.firstOptionSelectionMode?null==(t=Array.from(this.list.querySelectorAll('[role="option"]:not([aria-disabled="true"])')).filter(a)[0])||t.setAttribute("data-combobox-option-default","true"):"selected"===this.firstOptionSelectionMode&&this.navigate(1)}navigate(t=1){let e=Array.from(this.list.querySelectorAll('[aria-selected="true"]')).filter(a)[0],i=Array.from(this.list.querySelectorAll('[role="option"]')).filter(a),s=i.indexOf(e);if(s===i.length-1&&1===t||0===s&&-1===t){this.clearSelection(),this.input.focus();return}let r=1===t?0:i.length-1;if(e&&s>=0){let e=s+t;e>=0&&e<i.length&&(r=e)}let n=i[r];if(n)for(let t of i)t.removeAttribute("data-combobox-option-default"),n===t?(this.input.setAttribute("aria-activedescendant",n.id),n.setAttribute("aria-selected","true"),n.dispatchEvent(new Event("combobox-select",{bubbles:!0})),n.scrollIntoView(this.scrollIntoViewOptions)):t.removeAttribute("aria-selected")}clearSelection(){for(let t of(this.input.removeAttribute("aria-activedescendant"),this.list.querySelectorAll('[aria-selected="true"], [data-combobox-option-default="true"]')))t.removeAttribute("aria-selected"),t.removeAttribute("data-combobox-option-default")}resetSelection(){this.clearSelection(),this.indicateDefaultOption()}}})}};
//# sourceMappingURL=7v-2fac428ac587472c-5633d410ec0be6d3.js.map