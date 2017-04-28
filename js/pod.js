define(function () {
	function Pod(opts) {
		this.opts = opts;
		this.length = opts.length;
		this.speed = opts.speed;
		this.position = opts.position || 0;
		this.items = [];
		this.eventListeners = {
			reachedStart : [],
			reachedEnd : []
		};

		this.waitingState = (function (event) {
			
		}).bind(this);

		this.toStartState = (function (event) {
			if (this.position < 0) {
				this.position = 0;
				this.atStart = true;
				this.fireEvent('reachedStart');
				return this.waitingState;
			}
			this.position -= this.speed*event.delta;
		}).bind(this);

		this.toEndState = (function (event) {
			if (this.position > this.length) {
				this.position = this.length;
				this.atEnd = true;
				this.fireEvent('reachedEnd');
				return waitingState;
			}
			this.position += this.speed*event.delta;
		}).bind(this);

		this.depart = (function () {
			if (this.atStart) {
				this.atStart = false;
				this.state = this.toEndState;
			}
			if (this.atEnd) {
				this.atEnd = false;
				this.state = this.toStartState;
			}
		}).bind(this);

		this.state = toEndState;

		if (opts.noWait) {
			this.eventListeners.reachedStart.push(depart);
			this.eventListeners.reachedEnd.push(depart);
		}
	}

	Pod.prototype.iterate = function(event) {
		let newState = this.state(event);
		if (newState) {
			this.state = newState;
		}
	};

	Pod.prototype.addEventListener = function(eventType, listener) {
		this.eventListeners[eventType].push(listener);
	};

	Pod.prototype.fireEvent = function(eventType) {
		let that = this;
		this.eventListeners[eventType].forEach(listener => listener(that));
	};

	return Pod;

})