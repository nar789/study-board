/* Desgined by leejunghun */
;(function() {
	module.exports = function(_g) {

		const app = _g.app;
		const mysql = _g.mysql;
		const config = require('../config');

		function getConn() {
			return mysql.createConnection(config);
		}

		function route() {
			app.get('/', function(req, res) {
				const conn = getConn();
				conn.connect();
				conn.query(`select * from board order by updated desc`, (err,list) => {
					if(err) {
						res.send('fail'); 
					} else {
						res.render('index.html', {list : list});
					}
				});
				conn.end();
			});

			app.get('/detail', function(req, res) {
				if(req.query.id) {
					console.log("detail id = " + req.query.id);
					const conn = getConn(); 
					conn.connect();
					conn.query(`select * from board where id=${req.query.id}`, (err,list) => {
						if(err){
							console.log(err);
							res.send('fail'); 
						} else {
							if(list && list.length == 1) {
								res.render('detail.html', {data:list[0]});
							} else {
								res.send('fail'); 
							}
						}
					});
					conn.end();
				} else {
					res.render('detail.html', {data:null});
				}			
				
			});

			app.post('/api/write', function(req, res) {
				console.log(req.body);
				const title = req.body.title; 
				const name = req.body.name; 
				const content = req.body.content;
				const conn = getConn();
				conn.connect(); 
				conn.query(`insert board values(null, '${title}','${name}','${content}',now())`,(err, result) => {
					if(err) {
						console.log(err);
						res.send('fail'); 
					} else {
						res.send('success');
					}
				});
				conn.end();
			});

			app.post('/api/update',(req,res)=> {
				const id = req.body.id;
				const title = req.body.title; 
				const name = req.body.name; 
				const content = req.body.content;
				conn = getConn();
				conn.connect(); 
				conn.query(`update board set title = '${title}', name = '${name}', content = '${content}', updated = now() where id = ${id}`,(err, result) => {
					if(err) {
						console.log(err);
						res.send('fail'); 
					} else {
						res.send('success');
					}
				});
				conn.end();
			});

			app.post('/api/delete',(req,res)=> {
				const id = req.body.id;
				conn = getConn();
				conn.connect(); 
				conn.query(`delete from board where id = ${id}`,(err, result) => {
					if(err) {
						console.log(err);
						res.send('fail'); 
					} else {
						res.send('success');
					}
				});
				conn.end();
			});

			// entry point
			app.listen(3325, function() {
			  preLoad();
			  console.log('studyboard   Server listen on *:3325');
			});
		}

		function preLoad() {
		}

		return {
			route:route,
		};
	}

})();



