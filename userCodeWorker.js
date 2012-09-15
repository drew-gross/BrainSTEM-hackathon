self.addEventListener('message', function (e) {
	var outputs = {};
	var memory = e.data['memory'];
	var inputs = e.data['inputs'];
	eval(e.data['code']);
	postMessage(outputs);
	self.close();
}, false);