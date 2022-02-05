

export class DefaultNode {
    /**
     * @param props information about the node
     * @param props.innerText Nodes innerText
     * @param props.outerText Nodes outerText
     * @param props.parent Nodes parent element
     * @param props.isCompleted
     * @param props.isActive
     * @param props.number
     * @param props.progressBar
     * @param props.position
     * @param props.position.left
     * @param props.position.top
     */
    constructor(props) {
        this.progressBar = props.progressBar;
        this.innerText = props.innerText;
        this.outerText = this.progressBar.style.showOuterText ? props.outerText : '';
        this.parent = props.parent;
        this.isCompleted = props.isCompleted;
        this.isActive = props.isActive;
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

        this.circle.appendChild(this.nodeCircleInfo);

        this.node.appendChild(this.circle);
        this.node.appendChild(this.text);
    }

    getNode(){
        return this.node;
    }

    setActive(){
        this.node.classList.add('active');
        this.circle.innerHTML = '<i class="fa fa-clock" aria-hidden="true"></i>';
    }

    setInactive(){
        this.node.classList.remove('active');
        this.circle.innerHTML = '';

    }

    setCompleted(){
        this.node.classList.add('completed');
        this.circle.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    }

    setInCompleted(){
        this.node.classList.remove('completed');
        this.circle.innerHTML = '';
    }

    drawConnectingLine(){
        const parentNode = this.progressBar.nodeMap.get(this.parent);
        if(parentNode) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const topDifference = this.position.top - parentNode.position.top;
            if(topDifference === 0) {
                svg.style.cssText = `
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    top: 20px;
                    left: -80px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: 'M0,0 L100,0',
                    class: 'dtc-canvas-path'
                }));
            }else{
                svg.style.cssText = `
                    position: absolute;
                    width: 100px;
                    height: ${topDifference + 100}px;
                    top: ${20 - topDifference}px;
                    left: -80px;
                `;
                svg.appendChild(createSVGElement('path', {
                    d: `M 0 0 Q 50 0 50 15 L 50 ${topDifference - 15} Q 50 ${topDifference} ${topDifference} ${topDifference}`,
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
