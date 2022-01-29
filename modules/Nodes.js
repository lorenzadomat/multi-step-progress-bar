

export class DefaultNode {
    /**
     * @param props information about the node
     * @param props.innerText Nodes innerText
     * @param props.outerText Nodes outerText
     * @param props.parent Nodes parent element
     * @param props.isCompleted
     * @param props.isActive
     * @param props.number
     */
    constructor(props) {
        this.innerText = props.innerText;
        this.outerText = props.outerText;
        this.parent = props.parent;
        this.isCompleted = props.isCompleted;
        this.isActive = props.isActive;
        this.number = props.number || 0;

        this.node = document.createElement('div');
        this.node.className = 'default-node';
        this.node.style.cssText = `--i:${this.number};`

        this.circle = document.createElement('div');
        this.circle.className = 'node-circle';
        //this.circle.innerText = this.innerText || '';

        this.text = document.createElement('div');
        this.text.className = 'node-text';
        this.text.innerText = this.outerText || '';

        this.nodeCircleInfo = document.createElement('div');
        this.nodeCircleInfo.className = 'node-circle-info';


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

}
