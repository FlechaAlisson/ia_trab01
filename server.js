const fs = require('fs')
const http = require('http')
const port = 80
const getExt = (path) => {
	return path.replace(/^(.|\s)*\.(\w+)$/, '$2')
}
const mimeMap = {
	css: 'text/css',
	txt: 'text/plain',
	js: 'application/javascript',
	svg: 'text/plain',
	html: 'text/html',
}
const getMime = (path) => {
	const ext = getExt(path)
	return mimeMap[ext] || 'application/octet-stream'
}
const server = http.createServer((req, res) => {
	const path = '.' + req.url.replace(/[?#].*$/, '')
	try {
		const buffer = fs.readFileSync(path)
		res.writeHead(200, {
			'content-type': getMime(path),
			'content-length': buffer.length
		})
		res.write(buffer)
		res.end()
	} catch(err) {
		res.writeHead(404)
		res.end()
	}
})
server.listen(port, () => console.log({ port }))
