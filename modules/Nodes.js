

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

        this.childNodes = [];

        this.node = document.createElement('div');
        this.node.className = 'default-node';
        this.node.style.cssText = `
            --i:${this.number};
            top: ${this.position.top}px;
            left: ${this.position.left}px;
        `

        this.circle = document.createElement('div');
        this.circle.className = 'node-circle';
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

        this.drawConnectingLine();


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

    setActive(){
        this.circle.style.backgroundColor = this.progressBar.style.nodeActiveColor;
        this.circle.innerHTML = '<i class="fa fa-clock" aria-hidden="true"></i>';
    }

    setInactive(){
        this.circle.style.backgroundColor = this.progressBar.style.nodeColor;
        this.circle.innerHTML = '';

    }

    setCompleted(){
        this.circle.style.backgroundColor = this.progressBar.style.nodeCompletedColor;
        this.circle.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    }

    setInCompleted(){
        this.circle.style.backgroundColor = this.progressBar.style.nodeColor;
        this.circle.innerHTML = '';
    }

    setFailed(){
        this.circle.style.backgroundColor = this.progressBar.style.nodeFailedColor;
        this.circle.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    }

    setUnfailed(){
        this.circle.style.backgroundColor = this.progressBar.style.nodeColor;
        this.circle.innerHTML = '';
    }

    drawConnectingLine(){
        const parentNode = this.progressBar.nodeMap.get(this.parentNode);
        if(parentNode) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const topDifference = this.position.top - parentNode.position.top;
            if(topDifference === 0) {
                svg.style.cssText = `
                    position: absolute;
                    width: ${this.progressBar.style.nodeDistanceX}px;
                    height: ${this.progressBar.style.nodeDistanceY}px;
                    top: 20px;
                    left: ${-this.progressBar.style.nodeDistanceX + 20}px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: `M0,1 L${this.progressBar.style.nodeDistanceX},1`,
                    class: 'dtc-canvas-path'
                }));
            }else{
                svg.style.cssText = `
                    position: absolute;
                    width: ${this.progressBar.style.nodeDistanceX}px;
                    height: ${topDifference + 100}px;
                    top: ${20 - topDifference}px;
                    left: ${-this.progressBar.style.nodeDistanceX + 20}px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: `M 0 0 Q ${this.progressBar.style.nodeDistanceX / 2} 0 ${this.progressBar.style.nodeDistanceX / 2} 15 L ${this.progressBar.style.nodeDistanceX / 2} ${topDifference - 15} Q ${this.progressBar.style.nodeDistanceX / 2} ${topDifference} ${this.progressBar.style.nodeDistanceX} ${topDifference}`,
                    class: 'dtc-canvas-path'
                }));
            }

            this.node.appendChild(svg);
        }
    }

    addChildNode(nodeId){
        this.childNodes.push(nodeId);
    }



}

function createSVGElement(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (let p in v)
        n.setAttributeNS(null, p, v[p]);
    return n
}
