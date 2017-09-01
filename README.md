# Redux Chains
Nested reducers made easy.

This is just a small helper function that allows you to call several reducers in chain and keep the state object 
reference intact if the state is not modified by any of them. 

# Usage

In order to keep app components self-contained and nicely nested, we could use the following folder structure:

```
App/
|
| Sidebar/
|   |
|   | LanguageSelector/
|   |   | index.js
|   |   | actions.js
|   |   | reducers.js
|   |   | styles.css
|   |   | ...
|   |
|   | ItemList/
|   |   | index.js
|   |   | actions.js
|   |   | reducers.js
|   |   | styles.css
|   |   | ...
|   |
|   | index.js
|   | actions.js
|   | reducers.js
|   | styles.css
|   | ...
| ...
```

Each component contains its own set of actions and reduces the state for them. 

In order to enforce a parent-child structure, parents must call their direct child reducers in order to give them the chance to reduce the state. 

In this example:

__App/Sidebar/actions.js__
```
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';

export const closeSidebar = (payload = null) => ({type: CLOSE_SIDEBAR, payload});
export const openSidebar = (payload = null) => ({type: OPEN_SIDEBAR, payload});
```

__App/Sidebar/reducers.js__
```
import chainReducers from "redux-chains"
import * as actions from './actions'
import itemListReducer from "./ItemList/reducers"
import languageSelectorReducer from "./LanguageSelector/reducers"

function sidebarReducer(state, action) {

    switch (action.type) {

        case actions.CLOSE_SIDEBAR:
            return {
                ...state,
                sidebarOpened: false,
            };

        case actions.OPEN_SIDEBAR:
            return {
                ...state,
                sidebarOpened: true,
            };

        default:
            return state;
    }
}

export default function reducers(state, action) {
    return chainReducers(
        sidebarReducer,
        itemListReducer,
        languageSelectorReducer,
    )(state, action);
}
```

In turn, each child component must call its own child reducers following the same method. 