import ProgressBar from './modules/ProgressBar.js';


const container = document.getElementById('container');
const progressBar = new ProgressBar({
    parent: container,
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
        },
        {
            id: '3',
            innerText: '3',
            outerText: 'third',
            isActive: false,
            parent: '2'
        },
        {
            id: '4',
            innerText: '4',
            isCompleted: true,
            outerText: 'fourth',
            parent: '1'
        },
        {
            id: '5',
            innerText: '4',
            outerText: 'fourth',
            parent: '1'
        },
        {
            id: '6',
            innerText: '4',
            isCompleted: true,
            outerText: 'fourth',
            parent: '1'
        },
        {
            id: '7',
            innerText: '4',
            outerText: 'fourth',
            parent: '6'
        },
        {
            id: '8',
            innerText: '4',
            outerText: 'fourth',
            parent: '6'
        }
    ]
});


