import{a as e}from"_ext/cdnjs.com/islands/chunks/rolldown-runtime-BWaJ3C7D.js";import{n as t,r as n,t as r}from"_ext/cdnjs.com/islands/chunks/theme-BnZZ0YsT.js";import{a as i,i as a}from"_ext/cdnjs.com/islands/chunks/hydration-runtime-DdpUWM2U.js";import{a as o,n as s,o as c}from"_ext/cdnjs.com/islands/chunks/schemas-BApWQQ8I.js";var l=e(i()),u=a(),d=s([`none`,`minor`,`major`,`critical`]),f=o({status:o({indicator:d,description:c()})}),p=async()=>{let e=await fetch(`_ext/status.cdnjs.com/api/v2/status.json`);if(!e.ok)throw Error(`Failed to fetch status: ${e.status} ${e.statusText}`);let t=await e.json();return f.parse(t).status},m={dot:t`
        width: ${r.spacing(1.25)};
        height: ${r.spacing(1.25)};
        border-radius: 50%;
        background-color: ${r.background.primary};
        transition: background-color ${r.transition};
    `,none:t`
        background-color: ${r.status.none};
    `,minor:t`
        background-color: ${r.status.minor};
    `,major:t`
        background-color: ${r.status.major};
    `,critical:t`
        background-color: ${r.status.critical};
    `},h=()=>{let[e,t]=(0,l.useState)(null),[r,i]=(0,l.useState)(!1),a=(0,l.useCallback)(e=>{let t=new IntersectionObserver(([e])=>i(e?.isIntersecting??!1));return t.observe(e),()=>t.disconnect()},[]);return(0,l.useEffect)(()=>{if(!r)return;let e=()=>p().then(t).catch(e=>{console.error(`Error fetching status:`,e)});e();let n=setInterval(e,3e5);return()=>clearInterval(n)},[r]),(0,u.jsx)(`div`,{className:n(m.dot,e?.indicator&&m[e.indicator]),title:e?.description,ref:a})};export{h as default};
//# sourceMappingURL=status-DCY9dutY.js.map