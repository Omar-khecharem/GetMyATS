const apiBase = (accountId) =>
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run`;

const run = async (model, input) => {
  const response = await fetch(
    `${apiBase(process.env.CLOUDFLARE_ACCOUNT_ID)}/${model}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }
  );

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.errors?.[0]?.message || 'Cloudflare AI request failed');
  }
  return data.result;
};

module.exports = { run };
