const WORKER_URL = 'https://ats-ai-worker.khcharem-omar.workers.dev'

const run = async (model, input) => {
  const body = { model, input: { ...input, max_tokens: 2048 } }
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (!data.success) {
    console.error('[CLOUDFLARE ERROR]', data.error)
    throw new Error(data.error || 'Cloudflare AI worker request failed')
  }
  return data.result
}

module.exports = { run }
