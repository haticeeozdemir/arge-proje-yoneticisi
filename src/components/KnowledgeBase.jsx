import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

function KnowledgeBase({ onKbChange }) {
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    
    const newFiles = await Promise.all(uploadedFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      }
      
      return { name: file.name, content: text };
    }));

    const updated = [...files, ...newFiles];
    setFiles(updated);
    onKbChange(updated);
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onKbChange(updated);
  };

  return (
    <div className="kb-container">
      <h3>📚 Knowledge Base</h3>
      <label className="kb-file-label">
        📎 PDF dosyası seç veya sürükle
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileUpload}
        />
      </label>
      <ul>
        {files.map((f, i) => (
          <li key={i}>
            📄 {f.name}
            <button onClick={() => removeFile(i)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KnowledgeBase;