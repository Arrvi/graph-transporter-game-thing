define(function () {
	function Node(opts) {
		this.position = opts.position;
		this.items = [];
		this.connectors = [];
	}

	return Node;
});