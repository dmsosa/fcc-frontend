// 1. Import the library.
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { mockTodos } from './todos'

// 2. Describe network behavior with request handlers.
const worker = setupWorker(
  http.get('https://fakeapi.com/todos', ({ request, params, cookies }) => {
    console.log(request, params, cookies);
    return HttpResponse.json(
      {
        message: 'Mocked response',
        todos: mockTodos
      },
      {
        status: 200,
        statusText: 'Todo fetched',
      },
    )
  }),
)

// 3. Start mocking by starting the Service Worker.
await worker.start()