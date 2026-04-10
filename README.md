# ArGe Proje Yöneticisi

TÜBİTAK proje başvuru formlarını otomatik dolduran, yerel AI destekli uygulama.

## Ne Yapıyor?
- PDF belgesi (FPP) yüklersin
- Her form alanı için "Oluştur" butonuna basarsın
- Yerel AI modeli belgeyi okuyup alanı Türkçe doldurur
- İnternet bağlantısı gerekmez, her şey bilgisayarında çalışır

## Kurulum

### 1. Ollama Kur
https://ollama.com adresinden indir ve kur.

### 2. Modeli İndir
```bash
ollama pull gemma3:4b
```

### 3. Ollama'yı Başlat
```bash
OLLAMA_ORIGINS=* ollama serve
```

### 4. Projeyi Klonla
```bash
git clone https://github.com/haticeeozdemir/arge-proje-yoneticisi.git
cd arge-proje-yoneticisi
npm install
npm run dev
```

### 5. Tarayıcıda Aç
http://localhost:5173

## Kullanım
1. Knowledge Base bölümünden PDF yükle
2. Her alanın altındaki "Oluştur" butonuna bas
3. AI alanı otomatik doldurur