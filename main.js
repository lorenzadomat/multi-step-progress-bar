import ProgressBar from './modules/ProgressBar.js';


const container = document.getElementById('container');
const progressBar = new ProgressBar({
    parent: container,
    initialNodes: [
        {
            innerText: '1',
            outerText: 'first',
            isCompleted: true,
            number: 0
        },
        {
            innerText: '2',
            outerText: 'second',
            isCompleted: true,
            number: 1
        },
        {
            innerText: '3',
            outerText: 'third',
            isActive: false,
            number: 2
        },
        {
            innerText: '4',
            outerText: 'fourth',
            number: 3
        }
    ]
});


