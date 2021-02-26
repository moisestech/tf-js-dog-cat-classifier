# HOW-TO

## **1.** Install dependencies

## **2.** Layout the state machine

- App/index.js
- **States:**
  - 6 stages that our app can be in, each of which can have specific characteristics: (e.g. showing and image). Our app, at any given moment, can only occupy one state.

  ```javascript
  // after our library imports
  const stateMachine = {
    initial: {},
    loadingModel: {},
    awaitingUpload: {},
    ready: {},
    classifying: {},
    complete: {}
  }
  ```

- **Transitions:**
  - Events that can trigger our app to move from one state to another. Our simple app only needs one type of event, `next`.
  - Each state’s `on.next` value is the name of the state that the app will transition to whenever the `next` event is fired while the app is in that state.
  - Every time an event is fired, it will go through the reducer, causing a new state to be returned based on the rules determined by the mapping.
  - Having a stateMachine will allow the app to deligate the state of the app to this object instead of having boolean logic inside of the app.

```javascript
// after imports
const stateMachine = {
    states: {
      initial: { on: { next: "loadingModel"},
      loadingModel: { on: { next: "modelReady" },
      modelReady: { on: { next: "imageReady" },
      imageReady: { on: { next: "identifying" },
      identifying: { on: { next: "complete" },
      complete: { on: { next: "modelReady" }
    }
  }
};
```

## **3.** Init useReducer Hook

- Next write a **React.useReducer** Hook that will wire the states of our App together.
- This reducer will take the current state, and it will take the event and return the current state based on what the event was.

```javascript
// before App() component
const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;
```

- Refactor statemachine to include **initial** and **states** objects.

```javascript
// after imports
const stateMachine = {
    initial: 'initial',
    states: {
      initial: { on: { next: 'loadingModel'},
      loadingModel: { on: { next: 'modelReady' },
      modelReady: { on: { next: 'imageReady' },
      imageReady: { on: { next: 'identifying' },
      identifying: { on: { next: 'complete' },
      complete: { on: { next: 'modelReady' }
    }
  }
};
```

## **4.** Connect useReducer to App component

- App/index.js
- **`useReducer`** returns a touple, the initial state and a dispatch parameter.
- The **`useReducer`** functions takes in our **`reducer`** function and our intial state **`stateMachine.initial`**
- **`state`** is going to be a string representing, what state the app is in.
- **`dispatch`** is a function that is going to fire an event, into the **`reducer`** which is going to fire a new state.

```javascript
// in App() body
const [state, dispatch] = useReducer(reducer, stateMachine.initial);
```

## **5.** Dispatch "next" event on **appState**

- App/index.js **component body**

```javascript
// in App() body
const [appState, dispatch] = useReducer(reducer, stateMachine.initial);
```

- **`appState`** will be a string representing the current app state, and **`dispatch`** is a function that sends an event into our reducer, in order to trigger a transition and return a new state.

## **6.** Create re-usable Dispatch Function

- The named arrow function const **`next`** will hold the **`dispatch`** function since this function will be called multiple times.

```javascript
// in App() after useReducer declaration
const next = () => dispatch('next');
```

## **7.** Create Button with StateMachine Logic

- A **`<button />`** element will take in **`buttonProps = {}`**.
- **`buttonProps`** object will specify what the **`<button />`** will show at any given state and what the it has to do at any given state.

```javascript
// after next arrow function declaration
const buttonProps = {
  initial: {},
  loadingModel: {},
  awaitingModel: {},
  ready: {},
  classifying: {},
  complete: {}
};

return (
  <div>
    <button onClick=()>{appState}</button>
  </div>
)
```

## **7.** Add Functionality

---

## NPM

1. **Run App** `npm start`
2. Webpack Hot Reloading and ./dist directory bundling.

### npm start

- **scripts**: `npm start` runs scripts: `{ "start": "webpack serve"}`,
  - webpack commmands are stored in package.json#scripts
  - alternatively run `npx webpack` or `node_modules/./bin/webpack`

---

## Package.JSON

### Packaging App

- **scripts**: `npm start` runs scripts: { "start": "webpack serve"},
- **main**: `webpack.config.js` is where webpack starts bundling from.

---

## WEBPACK HOW-TO

- **Webpack**: Module bundler.
- **webpack-cli**: is the interface we use to communicate with webpack.
- **webpack-dev-server**: info coming soon.

### Plugins

- **CopyWebpackPlugin**: info coming soon.
- **HtmlWebpackPlugin**: info coming soon.
- **CleanWebpackPlugin**: info coming soon.
- **UglifyPlugin**: info coming soon.

---

## BABEL HOW-TO

### Babel Loader

### Babel Presets

- **@babel/preset-env**: info coming soon.
- **@babel/preset-react**: info coming soon.

### Babel Plugins

- **@babel/plugin-transform-runtime**: info coming soon.
- **@babel/plugin-proposal-pipeline-operator**: info coming soon.
- **@babel/plugin-syntax-dynamic-import**: info coming soon.

---

## TREE

- Install Tree with Homebrew using `brew install tree`
- To create dir structure `tree -I 'node_modules|package-lock.json|dist'`
