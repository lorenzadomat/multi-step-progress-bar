import { DefaultNode } from "./Nodes.js";
import { DefaultStyle } from "./DefaultStyle.js";


export default class ProgressBar {

    /**
     * @param {{parent: Element, style: object, initialNodes: {id: string, innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, isFailed: boolean, number: number, isBeginningNode: true, parentNode: string, rowNumber: number}[]}} props
     */
    constructor(props) {

        this.parent = props.parent;
        this.initialNodes = props.initialNodes;
        this.style = Object.assign(DefaultStyle, props.style);



        this.container = document.createElement('div');
        this.container.className = 'progress-bar-container';
        this.parent.appendChild(this.container);

        this.nodes = []
        this.nodeMap = new Map();
        this.beginningNodes = []

        for (let nodeDefinition of this.initialNodes) {
            this.addNode(nodeDefinition);
        }
        this.container.style.setProperty('--animationDuration', this.style.animate ? 1750 + 'ms' : 0 + 'ms')
        this.runAnimation(this.style.animate ? 1750 : 0);
    }

    /**
     *
     * @param {{id: string, innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, isFailed: boolean, number: number, isBeginningNode: boolean, parentNode: string, rowNumber: number}} nodeDefinition
     */
    addNode(nodeDefinition){
        const {top, left} = this.calculatePosition(nodeDefinition)
        const node = new DefaultNode({
            id: nodeDefinition.id,
            innerText: nodeDefinition.innerText,
            outerText: nodeDefinition.outerText,
            parentNode: nodeDefinition.parentNode,
            progressBar: this,
            isActive: nodeDefinition.isActive || false,
            isCompleted: nodeDefinition.isCompleted || false,
            isFailed: nodeDefinition.isFailed || false,
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

    getNode(nodeId){
        return this.nodeMap.get(nodeId);
    }


    /**
     *
     * @param {{id: string, innerText: string, outerText: string, isActive: boolean, isCompleted: boolean, number: number, isBeginningNode: boolean, parentNode: string, rowNumber: number}} nodeDefinition
     */
    calculatePosition(nodeDefinition){
        let top = 0;
        let left = 0;
        if(nodeDefinition.parentNode){
            let parentNode;
            if(nodeDefinition.parentNode instanceof Array){
                parentNode = this.nodeMap.get(nodeDefinition.parentNode[0]);
            }else {
                parentNode = this.nodeMap.get(nodeDefinition.parentNode);
            }
            if(parentNode){
                top = parentNode.position.top + (parentNode.childNodes.length * this.style.nodeDistanceY);
                left = parentNode.position.left + this.style.nodeDistanceX;
                parentNode.addChildNode(nodeDefinition.id);
            }
        }

        if(nodeDefinition.isBeginningNode && nodeDefinition.rowNumber){
            top = nodeDefinition.rowNumber * this.style.nodeDistanceY;
        }

        if(top === 0 && left === 0){
            const beginningNodeLength = this.beginningNodes.length;
            top = beginningNodeLength * this.style.nodeDistanceY;
            nodeDefinition.isBeginningNode = true;
        }

        return {
            top,
            left
        }
    }

    runAnimation(delay){
        for(let node of this.beginningNodes){
            this.runAnimationForNode(node, delay);
        }

    }

    runAnimationForNode(node, delay){
        let children;
        if(typeof node === 'string'){
            children = this.getNode(node).childNodes;
        }else {
            children = node.childNodes;
        }
        if(children) {
            for (let childId of children) {
                const child = this.getNode(childId);
                child.triggerAnimation();
                animationDelay(delay).then(() => {
                    this.runAnimationForNode(childId);
                })
            }
        }

    }
}

function animationDelay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
