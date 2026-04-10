const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'gemma3:4b';

export const callOllama = async (prompt) => {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3,
        num_ctx: 8192
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama hatası: ${response.status}`);
  }

  const data = await response.json();
  return data.response;
};

export const generateFieldContent = async (fieldLabel, kbContent) => {
  const prompt = `Sen bir TÜBİTAK proje uzmanısın. Aşağıda bir proje belgesi var. Bu belgeyi dikkatlice oku ve içindeki gerçek bilgileri kullanarak "${fieldLabel}" alanını doldur.

ÖNEMLI KURALLAR:
- Belgede geçen gerçek şirket isimlerini, teknoloji isimlerini ve rakamları kullan
- Genel ve klişe ifadeler kullanma
- Sadece belgede olan bilgileri yaz, hayal etme
- Türkçe yaz, akademik ve profesyonel ol
- Maksimum 1 paragraf yaz, kısa ve öz ol

PROJE BELGESİ:
${kbContent.substring(0, 20000)}

"${fieldLabel}" alanı için içerik:`;

  return await callOllama(prompt);
};