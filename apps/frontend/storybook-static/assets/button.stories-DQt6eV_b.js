import{j as e}from"./jsx-runtime-B8N95uZw.js";import{B as s}from"./button-D2GPaab7.js";import"./iframe-BFWdh4Ed.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-BEHD0UYf.js";const c={title:"Components/Button",component:s,args:{children:"Primary Button"}},a={render:r=>e.jsxs("div",{className:"space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm",children:[e.jsx(s,{...r}),e.jsx(s,{...r,className:"hover:translate-y-0 hover:brightness-105",children:"Hover Preview"}),e.jsx(s,{...r,disabled:!0,children:"Disabled"})]})},o={render:r=>e.jsx("div",{className:"dark rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-inner",children:e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{...r}),e.jsx(s,{...r,className:"hover:translate-y-0 hover:brightness-125",children:"Hover Preview"}),e.jsx(s,{...r,disabled:!0,children:"Disabled"})]})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Button {...args} />
      <Button {...args} className="hover:translate-y-0 hover:brightness-105">
        Hover Preview
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div className="dark rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-inner">
      <div className="space-y-3">
        <Button {...args} />
        <Button {...args} className="hover:translate-y-0 hover:brightness-125">
          Hover Preview
        </Button>
        <Button {...args} disabled>
          Disabled
        </Button>
      </div>
    </div>
}`,...o.parameters?.docs?.source}}};const m=["LightMode","DarkMode"];export{o as DarkMode,a as LightMode,m as __namedExportsOrder,c as default};
