

var nodeSymbol = new SymbolDefinition((function(){
    var nodeOuter = new Path.Circle([0,0], 10);
    nodeOuter.strokeColor = '#999';
    nodeOuter.strokeWidth = 3;
    var nodeInner = new Path.Circle([0,0], 5);
    nodeInner.fillColor = '#999';
    
    var node = new Group();
    node.addChild(nodeOuter);
    node.addChild(nodeInner);
    return node;
})());

function Node(args) {
    this.item = nodeSymbol.place(args.position);
}

function Edge(args) {
    this.startNode = args.startNode;
    this.endNode = args.endNode;
    var start = this.startNode.item.position;
    var end = this.endNode.item.position;
    this.progress = 0;
    this.speed = 70 / (start - end).length;
    this.track = new Path.Line(start, end);
    this.track.strokeColor = '#79a';
    this.track.strokeWidth = 6;
    this.pod = new Path.Circle([0,0], 3);
    this.pod.fillColor = '#fff';
}

Node.prototype.iterate = function(event) {
    this.item.scaling = 1+Math.sin(event.time)*0.2;
}

Edge.prototype.iterate = function(event) {
    var start = this.startNode.item.position;
    var end = this.endNode.item.position;
    var margin = ((start-end)/(start-end).length)*20;
    start = start - margin;
    end = end + margin;
    this.pod.position = start+(end-start)*this.progress;
    
    this.progress += event.delta*this.speed;
    if (this.progress > 1) {
        this.progress = 1;
        this.speed = -this.speed;
    }
    if (this.progress < 0) {
        this.progress = 0;
        this.speed = -this.speed;
    }
}

var nodes = [
    new Node({position: [100, 100]}), 
    new Node({position:[250,150]}),
    new Node({position: [300, 60]}),
    new Node({position: [400, 260]}),
    new Node({position: [130, 200]}),
    new Node({position: [600, 220]})
];
var edges = [
    new Edge({startNode: nodes[0], endNode: nodes[1]}),
    new Edge({startNode: nodes[1], endNode: nodes[2]}),
    new Edge({startNode: nodes[0], endNode: nodes[2]}),
    new Edge({startNode: nodes[0], endNode: nodes[4]}),
    new Edge({startNode: nodes[1], endNode: nodes[4]}),
    new Edge({startNode: nodes[4], endNode: nodes[3]}),
    new Edge({startNode: nodes[3], endNode: nodes[5]})
];

function onFrame(event) {
    for (var i=0; i<nodes.length; i++) {
        nodes[i].iterate(event);
    }
    for (var i=0; i<edges.length; i++) {
        edges[i].iterate(event);
    }
}