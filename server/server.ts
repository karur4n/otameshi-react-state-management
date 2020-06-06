import { serve } from 'https://deno.land/std@0.55.0/http/server.ts'

const server = serve({ port: 8081 })

console.log('server started!')

let users = [
  {
    name: 'karur4n',
  },
]

for await (const req of server) {
  console.log(req.url, req.method)

  if (req.method === 'GET' && req.url === '/users') {
    await req.respond({
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(users),
    })
  } else if (req.method === 'GET' && req.url === '/users-info') {
    const d = new Date()

    await req.respond({
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify([
        {
          label: `${d.getFullYear()}/${d.getMonth() + 1}`,
          value: users.length,
        },
        // WARNING: 年またぎに対応してないけどまあ
        {
          label: `${d.getFullYear()}/${d.getMonth()}`,
          value: 9,
        },
        // WARNING: 年またぎに対応してないけどまあ
        {
          label: `${d.getFullYear()}/${d.getMonth()}`,
          value: 4,
        },
      ]),
    })
  } else if (req.method === 'POST' && req.url === '/users') {
    const rawBody = await Deno.readAll(req.body)
    const decoded = new TextDecoder().decode(rawBody)
    const body = JSON.parse(decoded)

    if (!body.name) {
      await req.respond({ status: 400 })
      break
    }

    users.push({ name: body.name })
    await req.respond({
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
      status: 201,
    })
  } else {
    await req.respond({ status: 400 })
  }
}
