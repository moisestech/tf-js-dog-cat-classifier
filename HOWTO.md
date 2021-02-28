# HOW-TO

## **1.** Install dependencies

```javascript
// head of file
import * mobilenet from '@tensorflow-models/mobilenet';
```

## **2.** Layout the state machine

- App/index.js
- **States:**
  i. 6 stages that our app can be in, each of which can have specific characteristics: (e.g. showing and image). Our app, at any given moment, can only occupy one state.

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
  i. Events that can trigger our app to move from one state to another. Our simple app only needs one type of event, `next`.

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

  i. Next write a **React.useReducer** Hook that will wire the states of our App together.

  ii. This reducer will take the current state, and it will take the event and return the current state based on what the event was.

  ```javascript
  // before App() component
  const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;
  ```

  iii. Refactor statemachine to include **initial** and **states** objects.

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
  i.  **`useReducer`** returns a touple, the initial state and a dispatch parameter.

  ii. The **`useReducer`** functions takes in our **`reducer`** function and our intial state **`stateMachine.initial`**

  iii. **`state`** is going to be a string representing, what state the app is in.

  iv. **`dispatch`** is a function that is going to fire an event, into the **`reducer`** which is going to fire a new state.

  ```javascript
  // in App() body
  const [state, dispatch] = useReducer(reducer, stateMachine.initial);
  ```

## **5.** Dispatch "next" event on **appState**

  i. App/index.js **component body**

  ```javascript
  // in App() body
  const [appState, dispatch] = useReducer(reducer, stateMachine.initial);
  ```

  ii. **`appState`** will be a string representing the current app state, and **`dispatch`** is a function that sends an event into our reducer, in order to trigger a transition and return a new state.

## **6.** Create re-usable Dispatch Function

  i. The named arrow function const **`next`** will hold the **`dispatch`** function since this function will be called multiple times.

  ```javascript
  // in App() after useReducer declaration
  const next = () => dispatch('next');
  ```

## **7.** Create Button with StateMachine Logic

  i. A **`<button />`** element will take in **`buttonProps = {}`**.

  ii. **`buttonProps`** object will specify what the **`<button />`** will show at any given state and what the it has to do at any given state.

  ```javascript
  // after next arrow function declaration
  const buttonProps = {
    initial: { text: 'Load Model', action: () => {}},
    loadingModel: { text: 'Loading Model...', action: () => {}},
    awaitingModel: { text: '', action: () => {}},
    ready: { text: 'Identify', action: () => {}},
    classifying: { text: 'Identifying', action: () => {}},
    complete: { text: 'Reset', action: () => {}}
  };

  return (
    <div>
      <button onClick=()>{appState}</button>
    </div>
  )
  ```

## **8.** Connect Button to useReducer and State

  i. **`buttonProps[appState]`** determines the functionality and text displayed.

  ```javascript
  // App() return
  <button onClick={buttonProps[appState].action}>
    {buttonProps[appState].text}
  </button>
  ```

## **9.** Load, Store Model, and update StateMachine

  i. **`loadModel`** async function will load the model as per the [MobileNet Tensorflow.js docs](https://www.npmjs.com/package/@tensorflow-models/mobilenet).

  ii. **`loadModel`** stores the loaded model in **`mobilenetModel`** and sets it to component useState Hook.
  
  iii. **`next();`** is invoked **before** await **`mobilenet.load();`** to update the state machine and **after** **`setModel(mobilenetModel);`**

  ```javascript
  // above buttonProps
  const loadModel = async () => {
    next(); // loadingModel
    const mobilenetModel = await mobilenet.load();
    setModel(mobilenetModel);
    next(); // modelReady
  }
  ```

  iv. **React.useState** will contain the model to access and set state on.

  ```javascript
  // below userReducer initialization
  const [model, setModel] = useState(null);
  ```

  v. **`buttonProps[initial].action`** is updated to store the async **`loadModel`** returned value.

  ```javascript
  // after loadModel async function
    const buttonProps = {
      initial: { text: 'Load Model', action: loadModel },
      //...
    }
  ```

## **10.** Trigger the Upload of the Image

  i. **React.useRef** is initialized and used to access the new **`<input />`** component.

  ```javascript
  const inputRef = useRef();
  ```

  ii. The **`<input/>`** file-upload component will be triggered via javascript and access the users camera on mobile.

  ```javascript
  // App() return (
    <input type="file" accept="image/*" capture="camera/*" onChange={handleUpload} />
  // )
  ```

  iii. Initialize **React.useState** with **`imageURL`** stored from **`<input />`**

  ```javascript
  // after setModel useState
  const [imageURL, setImageURL] = useState(null);
  ```

  iv. function **`handleUpload`** checks if there is image data in **`{ files } = e.target;`** variable.
  
  v. Image data in **`files[0]`** is turned into **`URL.createObjectURL(files[0]);`** and stored in **useState** **`imageURL`** with **`setImageURL(url)`**.
  
  vi. Finally **`next();`** is steps up to indicate **imageReady** **`appState`** to infer from model.

  ```javascript
  // after hook initializatoins
  const handleUpload = e => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObject(files[0]);
      setImageURL(url);
      next(); // imageReady
    }
  };
  ```

## **11.** Set Image URL

- **`<img url={imageURL} />`** tag will display the binary image file store in **`useState`** **`setImageURL`**.

## **12.** Init and Set useRef on Image

  i. Initialize **React.useRef** to **`<img src={imageURL}`** to trigger model inference.

  ```javascript
  // after inputRef
  const imageRef = useRef();

  // App() return (
  <img alt="upload-preview" src={imageURL} ref={useRef} />
  // )
  ```

## **13.** Sync stateMachine to Image component

  i. Store **`stateMachine.states.[appState]`** boolean **`showImage`** as a **`false`** default state.

  ```javascript
  // after buttonProps
  const { showImage = false } = stateMachine.states[appState];
  ```

  ii. In App component **`return()`**  create a **ternary** that shows or hides the image if its uploaded or not.

  ```javascript
  // in App() return (
  {showImage && <img alt="upload-preview" src={imageURL} ref={useRef}/>}
  // )
  ```

  iii. **`buttonProps["awaitingUpload"].action`** object stores the **`inputRef.current.click()`**

  ```javascript
  // after handleUpload initiation
  const buttonProps = {
    awaitingUpload: { text: "Upload Photo", action: () => inputRef.current.click()}
  }
  ```

## **13.** Create and connect identify mobilenet function

  i. The new async function **`identify`** will compute **`model.classify(imageRef.current)`** and store in variable **`results`**.

  ii. Async function **`identify`** also transition our **`stateMachine`**.

  ```javascript
  // after handleUpload
  const identify = async () => {
    next(); // identifying
    const results = await model.classify(imageRef.current);
    next(); // complete
  }
  ```

  iii. Connect **`identify`** function by invoking it in **`buttonProps.ready.action`**.

  ```javascript
  const buttonProps = {
    // prev states...
    ready: { text: "Identify", action: identify }
    // next states...
  }
  ```

## **14.** Display Mobilenet Model Results

  i. **useState** **`[results, setResults]`** will hold the models classification.

  ```javascript
  // after imageURL useState init
  const [results, setResults] = useState([]);
  ```

## **15.** Format Results function

  i. **`formatResults`** will pull **`{classname, probability}`** and **return list items** as a string with the classname and probability.

  ii. Insite the function the **`probability`** will be multiplied by 100 and fix the result at two decimal places.

  ```javascript
  // above App() initiation, can be imported in utils?
  const formatResults = ({classname, probability}) => (
    <li key={className}>
      {`${className}: %${(probability * 100).toFixed(2)}`}
    </li>
  )
  ```

## **16.** Connect formatResults to DOM element

  i. Pull **`showResults`** from **`stateMachine`** to execture **ternary** in **return** function.

  ```javascript
  // after buttonProps
  const { showImage = false, showResults = false} = stateMachine.states[appState];
  ```

  ii. Add dom element that **`maps`** over result arrays.

  ```javascript
  // return (
    {showResults && <ul> 
      {results.map(formatResult)}
    </ul>}
  // )
  ```

## **17.** Reset App to start again

i. Reset all **useStates** to original states.

```javascript
// after handleResults
const reset = () => {
   setResults([]);
   setImageURL(null);
   next();
}
```

ii. Connect Reset App to **stateMachine**.

```javascript
const buttonProps = {
// prev button states
complete: { text: 'Reset', action: reset }
}
```

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
