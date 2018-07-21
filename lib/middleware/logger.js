
module.exports = exports = function(){



	return function *(next){
		yield next;

	
		console.log(JSON.stringify({
			time:Date.now(),
			url : this.url,
			fresh : this.fresh,
			ip : this.ip,
			ips : this.ips,
			headers : this.headers,
			path : this.path,
			method: this.method,
			query:this.query,
			body:this.request.body,
			user : this.user || {}
		}));
		


	}
}