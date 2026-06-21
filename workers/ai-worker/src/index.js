export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }

    const { model, input } = body
    if (!model || !input) {
      return new Response('Missing model or input', { status: 400 })
    }

    try {
      let result = await env.AI.run(model, input)

      // Normalize: the -fast variants return OpenAI-compatible format
      // where response may be an object. Extract raw text from choices.
      if (result && result.response && typeof result.response !== 'string') {
        result.response = result.choices?.[0]?.message?.content ?? JSON.stringify(result.response)
      } else if (result && !result.response && result.choices?.[0]?.message?.content) {
        result.response = result.choices[0].message.content
      }

      return new Response(JSON.stringify({ success: true, result }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
}
