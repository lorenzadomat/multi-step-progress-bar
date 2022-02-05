
<p align="center" style="font-size: 2em">A javascript library for creating a</p> 
<p align="center" style="font-size: 2em">Multi Step Progress Bar</p>
<p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

The multi-step-progess-bar Library can be easily integrated into every frontend project, to create a progress bar with multiple steps.

Going a step further it is also possible to create sub-processes. 

<p>Under the hood, the library works with simple html and svg elements to create the progress bar</p>

## Getting started

First create a ```div``` element in your HTML, which will be the parent of the progress bar.
```html
<body>
  <div id="container" class="container"></div>
</body>
```

Initialize the progress bar, by adding the following code to your JavaScript File.
```javascript
import ProgressBar from './modules/ProgressBar.js';

const progressBar = new ProgressBar({
    parent: document.getElementById('container'),
    style: {
        showOuterText: false
    },
    initialNodes: [
        {
            id: '1',
            innerText: '1',
            outerText: 'first',
            isCompleted: true,
            isBeginningNode: true
        },
        {
            id: '2',
            innerText: '2',
            outerText: 'second',
            isCompleted: true,
            isBeginningNode: false,
            parent: '1'
        }
    ]
});
```

## Sub-Processes

## Style
