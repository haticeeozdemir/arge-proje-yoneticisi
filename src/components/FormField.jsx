import { useState } from 'react';
import { generateFieldContent } from '../services/ollamaService';

function FormField({ label, value, onChange, kbContent }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!kbContent) {
      alert('Önce PDF yükleyin!');
      return;
    }
    setLoading(true);
    try {
      const result = await generateFieldContent(label, kbContent);
      onChange(result);
    } catch (e) {
      alert('Hata: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="field-container">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? '⏳ Oluşturuluyor...' : '✨ Oluştur'}
      </button>
    </div>
  );
}

export default FormField;