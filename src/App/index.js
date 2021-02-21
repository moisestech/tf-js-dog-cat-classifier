import React, { useState } from "react";

import mobilenet from '@tensorflow-models/mobilenet';

export default function App({project_name = "Tensorflow.js React Dog Cat Classifier"}) {

  return (  
    <h1>{project_name}</h1>
  )
}

// video: https://www.youtube.com/watch?v=nxAsWjSc-94
// blog: https://levelup.gitconnected.com/build-ad-dog-classifier-with-react-and-tensorflow-js-in-minutes-f08e98608a65
// code: https://github.com/jonnyk20/dogscope-react