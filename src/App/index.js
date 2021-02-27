import React, { useState, useReducer } from "react";

// model to detect inputted camera images
import * as mobilenet from '@tensorflow-models/mobilenet';

// mapping that manages the state of the app
const stateMachine = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel", text: "Load Model" } },
      loadingModel: { on: { next: "modelReady", text: "Loading Model" } },
      modelReady: { on: { next: "imageReady", text: "Upload Image"} },
      imageReady: { on: { next: "identifying" }, text: "Identify Breed", showImage: true },
      identifying: { on: { next: "complete", text: "Identifying…"} },
      complete: { on: { next: "modelReady" }, text: "Reset", showImage: true, showResults: true }
  }
};

// function triggering the stateMachine from useReducer
const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;

export default function App({project_name = "Tensorflow.js React Dog Cat Classifier"}) {
  const [appState, dispatch] = useReducer(reducer, stateMachine.initial);
  const [model, setModel] = useState(null);
  const next = () => dispatch('next');

  const loadModel = async () => {
    const mobilenetModel = await mobilenet.load();
    setModel(mobilenetModel);
  }
  
  const buttonProps = {
    initial: { text: 'Load Model', action: () => {}},
    loadingModel: { text: 'Loading Model...', action: () => {}},
    awaitingModel: { text: '', action: () => {}},
    ready: { text: 'Identify', action: () => {}},
    classifying: { text: 'Identifying', action: () => {}},
    complete: { text: 'Reset', action: () => {}}
  };

  return (
    <header>
      <button onClick={buttonProps[appState].action}>
        {buttonProps[appState].text}
      </button>
    </header>  
  )
}

// video: https://www.youtube.com/watch?v=nxAsWjSc-94
// blog: https://levelup.gitconnected.com/build-ad-dog-classifier-with-react-and-tensorflow-js-in-minutes-f08e98608a65
// code: https://github.com/jonnyk20/dogscope-react