module main

import vweb
import vweb.sse
import net
import time
import rand

struct App {
	vweb.Context
mut:
	sse_connections []sse.SSEConnection
}

@['/sse'; get]
fn (mut app App) sse() vweb.Result {
    println("sse")
	mut conn := sse.new_connection(app.conn)

    conn.headers['Access-Control-Allow-Origin'] = "*"

	conn.start() or {
		println("err: ${err}")
		return app.server_error(501) // REVIEW
	}

	app.sse_connections << conn

    // This not work
	conn.send_message(sse.SSEMessage{
		id: rand.uuid_v4()
		event: 'ping' // 'statusUpdate'
		data: 'SSE client conected'
		retry: 3000
	}) or {
		println("err: ${err}")
		return app.server_error(501)
	}

	return app.ok('ok') // keep as `text/event-stream`
}

// This not work (there are not connection)
@['/notification'; post]
fn (mut app App) notification(message string) vweb.Result {

	for mut conn in app.sse_connections {
		conn.send_message(sse.SSEMessage{
			id: rand.uuid_v4()
			event: 'ping' // 'statusUpdate'
			data: message
			retry: 3000
		}) or { eprintln(err) }
	}
	return app.text('Notification received')
}

fn main() {
	vweb.run(&App{}, 3001)
}
