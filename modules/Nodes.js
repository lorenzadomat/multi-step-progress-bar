

export class DefaultNode {
    /**
     * @param props information about the node
     * @param props.innerText Nodes innerText
     * @param props.outerText Nodes outerText
     * @param props.parentNode Nodes parent element
     * @param props.isCompleted
     * @param props.isActive
     * @param props.isFailed
     * @param props.number
     * @param props.progressBar ProgressBar
     * @param props.position
     * @param props.position.left
     * @param props.position.top
     */
    constructor(props) {
        this.progressBar = props.progressBar;
        this.innerText = props.innerText;
        this.outerText = this.progressBar.style.showOuterText ? props.outerText : '';
        this.parentNode = props.parentNode;
        this.isCompleted = props.isCompleted;
        this.isActive = props.isActive;
        this.isFailed = props.isFailed;
        this.number = props.number || 0;
        this.position = props.position;
        this.currentColor = this.progressBar.style.nodeColor;

        this.childNodes = [];

        this.node = document.createElement('div');
        this.node.className = 'default-node';
        this.node.style.cssText = `
            --i:${this.number};
            top: ${this.position.top}px;
            left: ${this.position.left}px;
        `

        this.circle = document.createElement('div');
        switch (this.progressBar.style.nodeStyle){
            case 0:
                this.circle.className = 'node-circle node-style-0';
                break;
            case 1:
                this.circle.className = 'node-circle node-style-1';
                break;
            default:
                this.circle.className = 'node-circle node-filled-ß';
                break;
        }

        this.circle.style.width = this.progressBar.style.nodeSize + 'px';
        this.circle.style.height = this.progressBar.style.nodeSize + 'px';

        if(this.isCompleted){
            this.circle.style.backgroundColor = this.progressBar.style.nodeCompletedColor
        }else if(this.isActive){
            this.circle.style.backgroundColor = this.progressBar.style.nodeActiveColor
        }else{
            this.circle.style.backgroundColor = this.progressBar.style.nodeColor
        }

        //this.circle.innerText = this.innerText || '';

        this.text = document.createElement('div');
        this.text.className = 'node-text';
        this.text.innerText = this.outerText || '';

        this.nodeCircleInfo = document.createElement('div');
        //this.nodeCircleInfo.className = 'node-circle-info';

        if(this.parentNode instanceof Array){
            for (let node of this.parentNode){
                this.drawConnectingLine(node);
            }
        }else {
            this.drawConnectingLine(this.parentNode);
        }


        if (this.isActive === true){
            this.setActive()
        }
        if (this.isCompleted === true){
            this.setCompleted()
        }
        if (this.isFailed === true){
            this.setFailed();
        }

        this.circle.appendChild(this.nodeCircleInfo);

        this.node.appendChild(this.circle);
        this.node.appendChild(this.text);
    }

    getNode(){
        return this.node;
    }

    updateNodeStyle(color, innerHtml){
        this.currentColor = color;
        switch (this.progressBar.style.nodeStyle){
            case 0:
                this.circle.style.backgroundColor = color;
                this.circle.style.border = `2px solid ${color}`;
                this.circle.style.color = '#000000';
                break;
            case 1:
                this.circle.style.backgroundColor = '#ffffff';
                this.circle.style.border = `2px solid ${color}`;
                this.circle.style.color = color;
                break;
            default:
                this.circle.style.backgroundColor = color;
                this.circle.style.border = `2px solid ${color}`;
                this.circle.style.color = '#000000';
                break;
        }
        this.circle.innerHTML = innerHtml;
    }

    setActive(){
        this.updateNodeStyle(this.progressBar.style.nodeActiveColor, '<i class="fas fa-spinner" aria-hidden="true"></i>')
        if(this.progressBar.style.animate) {
            this.circle.classList.add('rotate-icon');
        }
    }

    setInactive(){
        this.updateNodeStyle(this.progressBar.style.nodeColor, '');

    }

    setCompleted(){
        this.updateNodeStyle(this.progressBar.style.nodeCompletedColor, '<i class="fa fa-check" aria-hidden="true"></i>');
    }

    setInCompleted(){
        this.updateNodeStyle(this.progressBar.style.nodeColor, '');
    }

    setFailed(){
        this.updateNodeStyle(this.progressBar.style.nodeFailedColor, '<i class="fa fa-times" aria-hidden="true"></i>');
    }

    setUnfailed(){
        this.updateNodeStyle(this.progressBar.style.nodeColor, '');
    }

    getConnectingLine(parentNodeId){
        const parentNode = this.progressBar.nodeMap.get(parentNodeId);
        if(parentNode) {
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const topDifference = this.position.top - parentNode.position.top;
            const leftDifference = this.position.left - parentNode.position.left;
            if (topDifference === 0) {
                svg.style.cssText = `
                    position: absolute;
                    width: ${leftDifference}px;
                    height: ${this.progressBar.style.nodeDistanceY}px;
                    top: ${this.progressBar.style.nodeSize / 2}px;
                    left: ${-leftDifference + 20}px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: `M1,1 L${this.progressBar.style.nodeDistanceX},1`,
                    class: 'dtc-canvas-path',
                    style: 'stroke: #000000'
                }));
            } else if (topDifference > 0) {
                svg.style.cssText = `
                    position: absolute;
                    width: ${leftDifference}px;
                    height: ${topDifference + 1}px;
                    top: ${this.progressBar.style.nodeSize / 2 - topDifference + 1}px;
                    left: ${-leftDifference + this.progressBar.style.nodeSize / 2}px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: `M 1 1 L ${leftDifference - this.progressBar.style.nodeDistanceX + 35} 1 Q ${leftDifference - this.progressBar.style.nodeDistanceX / 2} 1 ${leftDifference - this.progressBar.style.nodeDistanceX / 2} 15 L ${leftDifference - this.progressBar.style.nodeDistanceX / 2} ${topDifference - 15} L ${leftDifference - this.progressBar.style.nodeDistanceX / 2} ${topDifference - 15} Q ${leftDifference - this.progressBar.style.nodeDistanceX / 2} ${topDifference} ${leftDifference - 35} ${topDifference} H ${leftDifference}`,
                    class: 'dtc-canvas-path',
                    style: 'stroke: #000000'
                }));
            } else {
                svg.style.cssText = `
                    position: absolute;
                    width: ${leftDifference}px;
                    height: ${Math.abs(topDifference) + 1}px;
                    top: ${this.progressBar.style.nodeSize / 2}px;
                    left: ${-leftDifference + this.progressBar.style.nodeSize / 2}px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: `M 1 ${Math.abs(topDifference)} L ${leftDifference - this.progressBar.style.nodeDistanceX + 35} ${Math.abs(topDifference)} Q ${leftDifference - this.progressBar.style.nodeDistanceX / 2} ${Math.abs(topDifference)} ${leftDifference - this.progressBar.style.nodeDistanceX / 2} ${Math.abs(topDifference) - 15} L ${leftDifference - this.progressBar.style.nodeDistanceX / 2} 15 Q ${leftDifference - this.progressBar.style.nodeDistanceX / 2} 1 ${leftDifference - 35} 1 H ${leftDifference}`,
                    class: 'dtc-canvas-path',
                    style: 'stroke: #000000'
                }));

            }
            return svg;
        }
    }

    drawConnectingLine(parentNodeId){
        const connectingLine = this.getConnectingLine(parentNodeId)
        if(connectingLine) {
            this.node.appendChild(connectingLine);
        }
    }

    addChildNode(nodeId){
        this.childNodes.push(nodeId);
    }


    triggerAnimation(){
        if(this.isActive || this.isFailed || this.isCompleted)
        if(this.parentNode instanceof Array){
            for(let parentNode of this.parentNode){
                const animationLine = this.getConnectingLine(parentNode);
                const animationPath = animationLine.getElementsByTagName('path')[0]
                const pathLength = animationPath.getTotalLength();
                animationLine.style.setProperty('--strokeLength', pathLength + 'px');
                animationLine.style.strokeDasharray = pathLength;
                animationLine.style.strokeDashoffset = '100%';
                animationLine.style.animationPlayState = 'running';
                animationPath.style.stroke = this.currentColor;
                this.node.appendChild(animationLine);
            }
        }else{
            const animationLine = this.getConnectingLine(this.parentNode);
            const animationPath = animationLine.getElementsByTagName('path')[0]
            const pathLength = animationPath.getTotalLength();
            animationLine.style.setProperty('--strokeLength', pathLength + 'px');
            animationLine.style.strokeDasharray = pathLength;
            animationLine.style.strokeDashoffset = '100%';
            animationLine.style.animationPlayState = 'running';
            animationPath.style.stroke = this.currentColor;
            this.node.appendChild(animationLine);
        }
    }



}

function createSVGElement(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (let p in v)
        n.setAttributeNS(null, p, v[p]);
    return n
}
