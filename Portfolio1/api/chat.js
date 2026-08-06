export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  //(System Prompt)
  const systemPrompt = `
    You are an AI Assistant for Omor Ali Mahim's portfolio website.
    Your goal is to converse naturally like ChatGPT/Gemini, but ONLY answer questions related to Omor Ali Mahim.

    Omor's Profile:
    - Name: Omor Ali Mahim
    - Role: Web Designer, UX Enthusiast & Frontend Developer
    - Services: Web Design, UI/UX Redesign, Frontend Web Development
    - Contact Phone: +8801735599849
    - Social Links: GitHub (OmorAliMahim), Facebook, Instagram
    - Direct Contact: Visitors can fill out the contact form on this site.

    Rules:
    1. Be extremely polite, professional, and friendly.
    2. Respond in the exact language the user speaks (Bangla, English, or Banglish).
    3. If asked about unrelated topics (e.g., general knowledge, recipes, news), politely explain that you can only answer questions related to Omor Ali Mahim and his web design services.
  `;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Vercel Environment Variable থেকে কি নিবে
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (response.ok && data.choices && data.choices[0]) {
      return res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'AI response failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}