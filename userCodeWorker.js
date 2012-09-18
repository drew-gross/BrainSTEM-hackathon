self.addEventListener('message', function (e) {
	try {
		var outputs = {};
		var memory = e.data['memory'];
		var inputs = e.data['inputs'];
		eval(e.data['code']);
		postMessage(outputs);
	} catch (err) {
		postMessage(err.toString());
	}
}, false);