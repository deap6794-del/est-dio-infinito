export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();
    
    if (data.data && data.data[0].url) {
      res.status(200).json({ imageUrl: data.data[0].url });
    } else {
      res.status(500).json({ error: 'Erro ao gerar imagem' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro de conexão' });
  }
}
