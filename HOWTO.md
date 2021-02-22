# HOW-TO

## **1.** Install dependencies

## **2.** Layout the state machine

- **States:**
  - 6 stages that our app can be in, each of which can have specific characteristics: (e.g. showing and image). Our app, at any given moment, can only occupy one state.

- **Transitions:**
  - Events that can trigger our app to move from one state to another. Thankfully, our simple app only needs one event, `next`.
  - Each state’s `on.next` value is the name of the state that the app will transition to whenever the `next` event is fired while the app is in that state.
  - Every time an event is fired, it will go through the reducer, causing a new state to be returned based on the rules determined by the mapping.

## **3.** Init Redux

## **4.** Return a new state machine on event

- file directory?

```javascript
const reducer = (currentState, event) =>
  stateMachine.states[currrentState].on[event] || stateMachine.initial;
```

## **3.** Add Functionality

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
