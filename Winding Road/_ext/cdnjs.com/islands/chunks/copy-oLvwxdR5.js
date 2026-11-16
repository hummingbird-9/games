import{a as e}from"_ext/cdnjs.com/islands/chunks/rolldown-runtime-BWaJ3C7D.js";import{n as t,t as n}from"_ext/cdnjs.com/islands/chunks/theme-BnZZ0YsT.js";import{a as r,i}from"_ext/cdnjs.com/islands/chunks/hydration-runtime-DdpUWM2U.js";var a=e(r(),1),o=i(),s=({className:e})=>(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,className:e,children:(0,o.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`m4.5 12.75 6 6 9-13.5`})}),c=({className:e})=>(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,className:e,children:(0,o.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5`})}),l=({className:e})=>(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,className:e,children:(0,o.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244`})}),u=({className:e})=>(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,className:e,children:(0,o.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z`})}),d={buttons:t`
        display: flex;
        align-items: center;
        gap: ${n.spacing(.5)};
        margin: 0 0 0 auto;
    `,button:t`
        background: none;
        border: none;
        cursor: pointer;
        padding: ${n.spacing(.5)};
        line-height: 0;
        color: ${n.text.primary};
        transition: color ${n.transition};

        &:hover {
            color: ${n.text.brand};
        }
    `,icon:t`
        width: ${n.spacing(2.5)};
        height: ${n.spacing(2.5)};
    `},f=({text:e,label:t,icon:n})=>{let[r,i]=(0,a.useState)(!1),c=(0,a.useRef)(null);return(0,a.useEffect)(()=>()=>{c.current&&clearTimeout(c.current)},[]),(0,o.jsx)(`button`,{onClick:()=>{navigator.clipboard.writeText(e),i(!0),c.current&&clearTimeout(c.current),c.current=setTimeout(()=>i(!1),2e3)},title:t,className:d.button,children:r?(0,o.jsx)(s,{className:d.icon}):(0,o.jsx)(n,{className:d.icon})})},p=({name:e,version:t,file:n,sri:r})=>{let i=r?` integrity="${r}" crossorigin="anonymous"`:``;return(0,o.jsxs)(`div`,{className:d.buttons,children:[(0,o.jsx)(f,{text:`https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(e)}/${encodeURIComponent(t)}/${n}`,label:`Copy URL`,icon:l}),n.endsWith(`.js`)&&(0,o.jsx)(f,{text:`<script src="https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(e)}/${encodeURIComponent(t)}/${n}"${i} referrerpolicy="no-referrer"><\/script>`,label:`Copy <script> HTML`,icon:c}),n.endsWith(`.mjs`)&&(0,o.jsx)(f,{text:`<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(e)}/${encodeURIComponent(t)}/${n}"${i} referrerpolicy="no-referrer"><\/script>`,label:`Copy <script type='module'> HTML`,icon:c}),n.endsWith(`.css`)&&(0,o.jsx)(f,{text:`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/${encodeURIComponent(e)}/${encodeURIComponent(t)}/${n}"${i} referrerpolicy="no-referrer">`,label:`Copy <link> HTML`,icon:c}),r&&(0,o.jsx)(f,{text:r,label:`Copy SRI hash`,icon:u})]})};export{p as t};
//# sourceMappingURL=copy-oLvwxdR5.js.map