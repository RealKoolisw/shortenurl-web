const express = require('express');
const parser = require('body-parser');
const app = express();
var http = require('http'),
	httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
app.use(parser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});
app.get('/status', (req, res) => {
	res.sendFile(`${__dirname}/status.html`);
});
app.get('/arc-sw.js', (req, res) => {
	res.redirect(301, 'https://arc.io/arc-sw.js');
});
app.post('/shortenurl', (req, res) => {
	if (req.body && req.body.url.match('http')) {
		let shortenedurl = (Date.now() + ~~(Math.random() * 1000)).toString(36);
		listen(shortenedurl, req.body.url);
		res.send(
			`Success Shorten links! Shorten URL: https://l.koolisw.tk/${shortenedurl}`
		);
	} else if (!req.body || !req.body.url || !req.body.url.match('http')) {
		res.sendFile(`${__dirname}/invalid.html`);
	}
});
const listen = (s, u) => {
	app.get(`/${s}`, (req, res) => {
		res.redirect(301, u);
	});
};
app.listen(3000, () => {
	console.log('ready');
});
