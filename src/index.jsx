import { render } from "solid-js/web";

import { createStore } from 'solid-js/store'

const type = (value) => data.State.Types.find(Type => Type.test(value))

// ['Scenarios', 'Types', 'Data', 'Functions', 'Tests', 'Events', 'Effects', 'Components', 'Style', 'Meta']

const [data, setState] = createStore({
    State: {
        Scenarios: [{
            title: 'Self-modifying development environment',
            description: '',
            given: ['the user opens the app'],
            when: ['it starts'],
            then: ['the user can see the current state of the app', 'can modify it']
        }],
        Types: [{
            name: 'List',
            test: (value) => Array.isArray(value),
            zero: [],
            render: (value) => <ol>
                <For each={value}>
                    {JSON.stringify(value, undefined, 4)}
                </For>
            </ol>
        }, {
            name: 'Object',
            test: (value) => typeof value === 'object',
            zero: {},
            render: (value) => <ul>
                <For each={Object.keys(value)}>
                    {key => <li key={key}>{key}: {JSON.stringify(value[key], undefined, 4)}</li>}
                </For>
            </ul>
        }, {
            name: 'Any',
            test: () => true,
            zero: undefined,
            render: (value) => <span>{JSON.stringify(value, undefined, 4)}</span>
        }],
        Data: {
            Text: {
                AppTitle: 'Momentum - A self modifying IBDDE'
            }
        },
        Components: {
            App: () => <div>

                <h1>
                    {data.State.Data.Text.AppTitle}
                </h1>

                <data.State.Components.State />
            </div>,
            State: () => {
                const Type = type(data.State);
                return <div id='State'>
                    {Type.render(data.State)}
                </div>
            } 
        }
    }
});

render(data.State.Components.App, document.getElementById("root"));