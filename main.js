import ProgressBar from './modules/ProgressBar.js';


const progressBar = new ProgressBar({
    parent: document.getElementById('container'),
    style: {
        showOuterText: false,
        nodeSize: 20,
        nodeDistanceX: 140,
        nodeDistanceY: 75,
        nodeColor: '#cccccc',
        nodeCompletedColor: '#4bb543',
        nodeActiveColor: '#ffa743',
        nodeFailedColor: '#c05556'
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
            parentNode: '1'
        },
        {
            id: '3',
            innerText: '3',
            outerText: 'third',
            isCompleted: true,
            parentNode: '2'
        },
        {
            id: '4',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '1',
            isCompleted: true
        },
        {
            id: '5',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '1',
            isCompleted: true
        },
        {
            id: '6',
            innerText: '4',
            isCompleted: true,
            outerText: 'fourth',
            parentNode: '1'
        },
        {
            id: '7',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '6'
        },
        {
            id: '8',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '6'
        },
        {
            id: '9',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '4',
            isActive: true
        },
        {
            id: '10',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '5',
            isCompleted: true
        },
        {
            id: '11',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '10',
            isCompleted: true
        },
        {
            id: '12',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '11',
            isFailed: true
        },
        {
            id: '13',
            innerText: '4',
            outerText: 'fourth',
            parentNode: '12',
        }
    ]
});


