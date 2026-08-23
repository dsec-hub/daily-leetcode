export async function postToDiscord(content: string): Promise<boolean> {
  let webhookURL = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookURL) {
    return false;
  }
  const request = await fetch(webhookURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content
    })
  });

  return request.ok;
}
