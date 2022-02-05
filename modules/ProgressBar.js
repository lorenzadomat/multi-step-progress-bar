import { DefaultNode } from "./Nodes.js";


export default class ProgressBar {

    /**
     * @param {{parent: Element, style: object, initialNodes: {innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, number: number}[]}} props
     */
    constructor(props) {

        this.parent = props.parent;
        this.initialNodes = props.initialNodes;
        this.style = props.style;



        this.container = document.createElement('div');
        this.container.className = 'progress-bar-container';
        this.parent.appendChild(this.container);

        this.nodes = []
        this.nodeMap = new Map();
        this.beginningNodes = []

        for (let nodeDefinition of this.initialNodes) {
            this.addNode(nodeDefinition);
        }

    }

    /**
     *
     * @param {{id: string, innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, number: number, isBeginningNode: boolean, parent: string}} nodeDefinition
     */
    addNode(nodeDefinition){
        const {top, left} = this.calculatePosition(nodeDefinition)
        const node = new DefaultNode({
            id: nodeDefinition.id,
            innerText: nodeDefinition.innerText,
            outerText: nodeDefinition.outerText,
            parent: nodeDefinition.parent,
            progressBar: this,
            isActive: nodeDefinition.isActive || false,
            isCompleted: nodeDefinition.isCompleted || false,
            number: nodeDefinition.number || 0,
            position: {
                top,
                left
            }
        })
        this.nodes.push(node);
        this.nodeMap.set(nodeDefinition.id, node);

        if (nodeDefinition.isBeginningNode){
            this.beginningNodes.push(node)
        }
        this.container.append(node.getNode());
    }


    /**
     *
     * @param {{id: string, innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, number: number, isBeginningNode: boolean, parent: string}} nodeDefinition
     */
    calculatePosition(nodeDefinition){
        let top = 0;
        let left = 0;
        if(nodeDefinition.isBeginningNode){
            const beginningNodeLength = this.beginningNodes.length;
            top = beginningNodeLength * 100;
        }else if(nodeDefinition.parent){
            const parentNode = this.nodeMap.get(nodeDefinition.parent);
            if(parentNode){
                top = parentNode.position.top + (parentNode.childNodes.length * 100);
                left = parentNode.position.left + 100;
                parentNode.addChildNode(nodeDefinition.id);
            }else{
                const beginningNodeLength = this.beginningNodes.length;
                top = beginningNodeLength * 100;
                nodeDefinition.isBeginningNode = true;
            }
        }else{
            const beginningNodeLength = this.beginningNodes.length;
            top = beginningNodeLength * 100;
            nodeDefinition.isBeginningNode = true;
        }

        return {
            top,
            left
        }
    }
}
