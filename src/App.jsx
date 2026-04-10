import { useState } from 'react';
import KnowledgeBase from './components/KnowledgeBase';
import FormField from './components/FormField';
import './App.css';

const FORM_FIELDS = [
  'Kuruluş Kısa Tanıtımı ve Projenin Başlatılma Gerekçesi',
  'Projenin Amacı',
  'Anahtar Kelimeler',
  'Projenin Özgün Değeri ve Yenilikçi Yönleri',
  'Hedef Kitle ve Beklenen Etkiler',
  'Proje Metodolojisi',
  'İş Paketleri ve Zaman Planı',
  'Bütçe Gerekçesi',
];

function App() {
  const [kbFiles, setKbFiles] = useState([]);
  const [formValues, setFormValues] = useState({});

  const kbContent = kbFiles.map(f => f.content).join('\n\n');

  const handleFieldChange = (label, value) => {
    setFormValues(prev => ({ ...prev, [label]: value }));
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span style={{ fontSize: '24px' }}></span>
          <h2>R&D PROJECT<br />MANAGER</h2>
        </div>
        <h3>Menü</h3>
        <ul>
          <li>📚 Knowledge Base</li>
          <li>📋 Başvuru Formu</li>
        </ul>
      </div>

      {/* ANA İÇERİK */}
      <div className="main-content">
        <h1 className="page-title">Başvuru Formu</h1>
        <p className="page-subtitle">Yapay zeka asistanı ile formun her alanını profesyonelce doldurun.</p>

        <KnowledgeBase onKbChange={setKbFiles} />

        {kbFiles.length > 0 && (
          <button className="generate-all">
            ⚡ Boş Alanları Otomatik Doldur
          </button>
        )}

        <div className="form-container">
          <div className="form-section-title">
            📋 Genel Bilgiler
          </div>
          {FORM_FIELDS.map(field => (
            <FormField
              key={field}
              label={field}
              value={formValues[field] || ''}
              onChange={(val) => handleFieldChange(field, val)}
              kbContent={kbContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;