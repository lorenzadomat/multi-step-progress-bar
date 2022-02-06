import ProgressBar from './modules/ProgressBar.js';

const testNodes = [
    {
        id: '1',
        innerText: '1',
        outerText: '1',
        isCompleted: true,
        isBeginningNode: true
    },
    {
        id: '2',
        innerText: '2',
        outerText: '2',
        isCompleted: true,
        isBeginningNode: false,
        parentNode: '1'
    },
    {
        id: '3',
        innerText: '3',
        outerText: '3',
        isCompleted: true,
        parentNode: '2'
    },
    {
        id: '4',
        innerText: '4',
        outerText: '4',
        parentNode: '1',
        isCompleted: true
    },
    {
        id: '5',
        innerText: '4',
        outerText: '5',
        parentNode: '1',
        isCompleted: true
    },
    {
        id: '6',
        innerText: '4',
        isCompleted: true,
        outerText: '6',
        parentNode: '1'
    },
    {
        id: '7',
        innerText: '4',
        outerText: '7',
        parentNode: '6',
        isCompleted: true
    },
    {
        id: '8',
        innerText: '4',
        outerText: '8',
        parentNode: '6',
        isCompleted: true
    },
    {
        id: '9',
        innerText: '4',
        outerText: '9',
        parentNode: '4',
        isActive: true
    },
    {
        id: '10',
        innerText: '4',
        outerText: '10',
        parentNode: '5',
        isCompleted: true
    },
    {
        id: '11',
        innerText: '4',
        outerText: '11',
        parentNode: ['10', '7'],
        isCompleted: true
    },
    {
        id: '12',
        innerText: '4',
        outerText: '12',
        parentNode: ['11', '8', '3'],
        isFailed: true
    },
    {
        id: '13',
        innerText: '4',
        outerText: '13',
        parentNode: '12',
    },
    {
        id: '14',
        innerText: '14',
        outerText: '14',
        isBeginningNode: true,
        rowNumber: 5
    },
    {
        id: '15',
        innerText: '15',
        outerText: '15',
        parentNode: '14'
    }
];

const hubInitialNodes = [
    {
        id: '1',
        innerText: '1',
        outerText: 'Vehicle from UCM',
        isCompleted: true,
        isBeginningNode: true
    },
    {
        id: '2',
        innerText: '1',
        outerText: 'Vehicle from VDA',
        isCompleted: true,
        parentNode: '1',
    },
    {
        id: '3',
        innerText: '1',
        outerText: 'Vehicle recommendation',
        isCompleted: true,
        parentNode: '1',
    },
    {
        id: '4',
        innerText: '1',
        outerText: 'Vehicle enrichment',
        isCompleted: true,
        parentNode: ['2', '3'],
    },
    {
        id: '5',
        innerText: '1',
        outerText: 'Offer created',
        isActive: true,
        parentNode: '4',
    },
    {
        id: '6',
        innerText: '1',
        outerText: 'Offer approved',
        parentNode: '5',
    },
    {
        id: '7',
        innerText: '1',
        outerText: 'Offer send',
        parentNode: '6',
    },
    {
        id: '8',
        innerText: '1',
        outerText: 'Offer sold',
        parentNode: '7',
    }
]

new ProgressBar({
    parent: document.getElementById('container'),
    style: {
        showOuterText: true,
        nodeSize: 40,
        nodeDistanceX: 100,
        nodeDistanceY: 100,
        nodeColor: '#cccccc',
        nodeCompletedColor: '#4bb543',
        nodeActiveColor: '#ffa743',
        nodeFailedColor: '#c05556',
        nodeStyle: 1,
        animate: false
    },
    initialNodes: testNodes
});





