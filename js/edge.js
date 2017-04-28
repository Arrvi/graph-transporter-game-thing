define(['js/pod'], function (Pod) {
	function Edge(opts) {
		this.opts = opts;
		this.startNode = opts.start;
		this.endNode = opts.end;
		this.length = opts.length;
		this.pods = [new Pod({
			length : opts.length,
			speed : 30,
			noWait : true
		})];
	}

	Edge.prototype.iterate = function(event) {
		this.pods.forEach(p=>p.iterate(event));
	};

	return Edge;
})