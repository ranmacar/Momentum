// import { createEffect, createMemo, createSignal, For } from 'solid-js';
// import { render } from "solid-js/web";

// import h from "solid-js/h";

// import data from './data.json';
// import { tags, events } from './html-spec';

// import './js-html';

import M from './momentum';

const IDE = M()

// const State = {

//     Scenarios: [{
//         title: 'Self-modifying development environment',
//         description: ['something', 'something'],
//         given: ['the app starts'],
//         when: [],
//         then: ['the user can see the current state', 'can modify it']
//     }, {
//         title: 'integrated BDD',
//         description: ['scenario -> tests -> code'],
//         given: ['the app starts'],
//         when: [],
//         then: ['the user can see the current state', 'can modify it']
//     }, {
//         title: 'Add scenario',
//         description: ['something', 'something'],
//         given: ['the app starts'],
//         when: [],
//         then: ['the user can see the current state', 'can modify it']
//     }],

//     Types: [{
//         name: 'List',
//         test: (value) => Array.isArray(value),
//         zero: [],
//         render: (value) => <ol>
//             <For each={value}>
//                 {Value => {
//                     const Type = App.Functions.type(Value);
//                     return <li tabindex={1} onFocusin={() => console.log(Value)}>{Type.render(Value)}</li>
//                 }}
//             </For>
//         </ol>,
//         serialize: (value) => '[' + value.map(App.Functions.serialize).join(' ') + ']'
//     }, {
//         name: 'Function',
//         test: (value) => typeof value === 'function',
//         zero: (x) => x,
//         render: (value) => value.toString(),
//         serialize: (value) => '>CODE' /*value.toString() /*value.map(State.Functions.serialize).join(' ') */ + ']'
//     }, {
//         name: 'Object',
//         test: (value) => typeof value === 'object',
//         zero: {},
//         render: (value) => <ul>
//             <For each={Object.keys(value)}>
//                 {key => {
//                     const Value = value[key];
//                     const Type = App.Functions.type(Value);
//                     return <li key={key}>{key}: {Type.render(Value)}</li>
//                 }}
//             </For>
//         </ul>,
//         serialize: (value) => '{' + Object.entries(value).map(([name, value]) => '\n=' + name + ' ' + State.Functions.serialize(value) + ']').join(' ') + ']\n'
//     }, {
//         name: 'Any',
//         test: () => true,
//         zero: undefined,
//         render: (value) => <span>{JSON.stringify(value, undefined, 4)}</span>,
//         serialize: (value) => '_' + JSON.stringify(value) + ']'
//     }],

//     Data: {
//         Log: [],
//         Text: {
//             AppTitle: 'Momentum - A self modifying IBDDE',
//             NewTextLine: 'Add note..',
//             Literal: [
//                 "This is an experiment in literal and test / behaviour driven programming.",
//                 "The goal is to develop a self modifying environment, that forces BDD principles by default",
//                 "Eventually, the output should sync with Github, enable realtime collaboration and also work offline.",
//                 "Programming in this system will be a concatetative style of JS, probably serialized as its own language (Athtp)",
//                 "Debugging is also driven by tests - execution can only be paused on failed tests, and should work backwards in time to determine what caused the failure.",
//                 "Starting from an empty Solid.js / Vite environment and working in VS Code, how soon can I start developing this in itself?",
//                 "Everything should be contained in a global State object.",
//                 "This object is a proxy, and is used to initialize the App, and handle reactivity.",
//                 "window.App = new Proxy(render, State.handlers) App(App.main, '#root') \nIf handlers change, the whole App needs to be reinitialized.",
//                 "So, according with BDD, we need to first collect requirements. These will live in State.features",
//                 "We wont bother with the full Gherkin syntax yet (or ever? :), just store our given/when/then requirements in a hierarchy where givens are inherited",
//                 "We will also store our actual tests in the same hierarchy, because as we are building a live environment it doesnt make much sense separating them.",
//                 "Writing these by hand would be tedious, and we need to be able to display them nicely to keep track of what we are doing.",
//                 "So we'll build a Solid component that can display all our example scenarios and test results",
//                 "The main problem is entering hierarchicaly structured information. UX for this is crucial not just for these scenarios, but for the whole system.",
//                 "We see that this could be handled by a generic tree component that is aware of data types. Let's create scenarios for this and refactor this later",
//                 "We need to be able to traverse the tree easily, with the keyboard, and also add / edit its components.",
//             ]
//         },
//         activeTab: 'App'
//     },

//     nested: (value) => {
//         const [getter, setter] = createSignal(value)
//         return new Proxy(getter, App.Handlers.nested)
//     },

//     Handlers: {
//         get: (target, prop) => State[prop],
//         // set: (target, prop, value) => console.log('set', target, prop, value),
//         apply: (target, _, args) => target(args[0], State.$(args[1]))
//     },

//     Functions: {
//         init: () => {
//             App = new Proxy(render, State.Handlers);
//             App(App.Components.main, '#root')
//         },
//         type: (value) => App.Types.find(Type => Type.test(value)),
//         save: () => {
//             localStorage.setItem('Momentum', App.Functions.serialize(State))
//         },
//         load: () => {
//             App.Functions.deserialize(localStorage.getItem('Momentum'))
//         },
//         render: (object) => App.Functions.type(object).render(object),
//         serialize: (object) => App.Functions.type(object).serialize(object),
//         deserialize: (code) => {
//             // .:=<[{('"#@|\/]

//         },

//     },

//     Events: {
//         Text: {
//             Change: (e) => console.log(e)
//         }
//     },

//     Effects: {

//     },

//     Style: {

//     },

//     Components: {
//         // ...Tags.reduce((all, next) => Object.assign(all, { [next]: (props) => <Dynamic component={next} {...props}>{props.children}</Dynamic> }), {}),

//         main: () => <div>

//             <div id='tabs'>
//                 <button>App</button>
//                 <button>AST</button>
//                 <button>Code</button>
//                 <button>Tests</button>
//                 <button>Log</button>

//                 <Show when={State.Data.activeTab === 'App'}>
//                     <h1>{State.Data.Text.AppTitle}</h1>

//                     <button onClick={() => document.documentElement.requestFullscreen()}>fullscreen</button>

//                     <State.Components.Text />

//                     <div id='scenarios'>
//                         <For each={State.features}>
//                             {item => State.Components.Scenario(item)}
//                         </For>
//                     </div>
//                 </Show>

//                 <Show when={State.Data.activeTab === 'AST'}>
//                     AST
//                 </Show>

//                 <Show when={State.Data.activeTab === 'Code'}>
//                     Code
//                 </Show>

//             </div>

//             <div id='tree'>
//                 {State.Components.Node(State)}
//             </div>

//             <pre>Serialized:
//                 {
//                     State.Functions.serialize(State)
//                 }</pre>

//         </div>,

//         Log: () => <div id='log'>Log: <ol>{
//             App.Data.Log.map(line => <li>{line}</li>)
//         }</ol></div>,

//         State: () => {
//             const Type = State.Functions.type(State);

//             return <div id='State'>
//                 {Type.render(proxy)}
//             </div>
//         },

//         Text: () => <div id='log'>
//             {State.Data.Text.Literal.map(line => <p>{line}</p>)}

//             <textarea placeholder={App.Data.Text.NewTextLine} onKeyPress={App.Events.Text.Change}></textarea>
//         </div>,

//         Node: (data) => State.Functions.render(data),

//         Scenario: (data) => <div>
//             <h3>{data.title}</h3>
//             <For each={data.description}>
//                 {item => <p>{item}</p>}
//             </For>
//             <ul>Given:
//                 <For each={data.given}>
//                     {item => <li>{item}</li>}
//                 </For>

//                 <For each={data.sub}>
//                     {item => State.Components.Scenario(item)}
//                 </For>
//             </ul>

//             {data?.when?.length && <ul>When:
//                 <For each={data.when}>
//                     {item => <li>{item}</li>}
//                 </For>
//             </ul>}

//             {data?.then?.length && <ul>Then:
//                 <For each={data.then}>

//                     {item => <li>{item}</li>}
//                 </For>
//             </ul>}
//         </div>,
//     },

//     $: (query, el) => (document || el).querySelector(query),
//     print: (o) => JSON.stringify(o, null, 4),
// };

// const [a, setA] = createSignal(5)
// const [b, setB] = createSignal(2)

// const memo = createMemo(() => a() + b())

// console.log(a, b, memo)

// setB(6)

// let App = new Proxy(render, State.Handlers)
// App.Functions.init()
