import{j as e}from"./jsx-runtime-B8N95uZw.js";import{r as c}from"./iframe-BFWdh4Ed.js";import{c as i}from"./utils-BEHD0UYf.js";import"./preload-helper-PPVm8Dsz.js";const a=c.forwardRef(({className:s,type:t="text",...d},n)=>e.jsx("input",{type:t,className:i("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50",s),ref:n,...d}));a.displayName="Input";a.__docgenInfo={description:"",methods:[],displayName:"Input",props:{type:{defaultValue:{value:"'text'",computed:!1},required:!1}}};const u={title:"Components/Input",component:a,args:{placeholder:"Enter text…"}},r={render:s=>e.jsxs("div",{className:"grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs uppercase tracking-[0.28em] text-slate-400",children:"Default"}),e.jsx(a,{...s})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs uppercase tracking-[0.28em] text-slate-400",children:"Focus"}),e.jsx(a,{...s,className:"ring-2 ring-brand-400"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs uppercase tracking-[0.28em] text-slate-400",children:"Disabled"}),e.jsx(a,{...s,disabled:!0,value:"Disabled value"})]})]})},l={render:s=>e.jsxs("div",{className:"dark grid gap-4 rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-inner",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs uppercase tracking-[0.28em] text-slate-500",children:"Default"}),e.jsx(a,{...s})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs uppercase tracking-[0.28em] text-slate-500",children:"Focus"}),e.jsx(a,{...s,className:"ring-2 ring-emerald-400"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("label",{className:"text-xs uppercase tracking-[0.28em] text-slate-500",children:"Disabled"}),e.jsx(a,{...s,disabled:!0,value:"Disabled value"})]})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Default</label>
        <Input {...args} />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Focus</label>
        <Input {...args} className="ring-2 ring-brand-400" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-400">Disabled</label>
        <Input {...args} disabled value="Disabled value" />
      </div>
    </div>
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="dark grid gap-4 rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-inner">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Default</label>
        <Input {...args} />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Focus</label>
        <Input {...args} className="ring-2 ring-emerald-400" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.28em] text-slate-500">Disabled</label>
        <Input {...args} disabled value="Disabled value" />
      </div>
    </div>
}`,...l.parameters?.docs?.source}}};const b=["LightMode","DarkMode"];export{l as DarkMode,r as LightMode,b as __namedExportsOrder,u as default};
