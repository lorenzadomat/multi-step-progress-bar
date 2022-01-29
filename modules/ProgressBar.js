import { DefaultNode } from "./Nodes.js";


export default class ProgressBar {

    /**
     * @param {{parent: Element, initialNodes: {innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, number: number}[]}} props
     */
    constructor(props) {

        this.parent = props.parent;
        this.initialNodes = props.initialNodes;


        this.container = document.createElement('div');
        this.container.className = 'progress-bar-container';
        this.parent.appendChild(this.container);

        this.nodes = []

        for (let nodeDefinition of this.initialNodes) {
            this.addNode(nodeDefinition);
        }

    }

    /**
     *
     * @param {{innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, number: number}} nodeDefinition
     */
    addNode(nodeDefinition){
        const node = new DefaultNode({
            innerText: nodeDefinition.innerText,
            outerText: nodeDefinition.outerText,
            parent: this.container,
            isActive: nodeDefinition.isActive || false,
            isCompleted: nodeDefinition.isCompleted || false,
            number: nodeDefinition.number || 0
        })
        this.nodes.push(node);
        this.container.append(node.getNode());
    }
}
