# Serverless-GForm-to-Notion-API-Integration

## Perkenalan Project

Project ini adalah sebuah sistem otomasi aliran data (*data pipeline*) sederhana berbasis *serverless* yang dirancang untuk menghubungkan **Google Forms** dan **Google Sheets** langsung ke **Notion Database** secara *real-time*.

<div align="center">
  <img src="assets/demo.gif" width="750" alt="Demo Real-Time Pipeline">
  <p><i>Demo alur data: Google Form (Kiri) ➡️ Google Sheets (Kanan Atas) ➡️ Notion (Kanan Bawah).</i></p>
</div>

## Tech Stack

* **Bahasa Pemrograman:** JavaScript 
* **Environment:** Google Apps Script (GAS)
* **API / Protokol:** Notion API (RESTful HTTP POST), JSON
* **Frontend / Input:** Google Forms
* **Data Landing:** Google Sheets

## Fitur Utama

1.  **Zero-Cost Automation:** Berjalan penuh di atas infrastruktur *cloud* Google Workspace tanpa biaya *server* tambahan.
2.  **Real-Time Trigger:** Memanfaatkan *Event-driven Architecture* (`onFormSubmit`) sehingga data langsung terkirim saat responden menekan tombol *Submit* pada Google Form.
3.  **Custom Primary Key Generator:** Dilengkapi dengan algoritma manipulasi *string* di JavaScript untuk menghasilkan ID Responden yang unik dan rapi.
4.  **Strict Data Mapping:** Mampu mem- *parsing* dan memetakan struktur JSON *payload* yang kompleks ke dalam *Strict Typing properties* milik Notion (seperti `Title`, `Select`, `Date`, dll).

## Cara Kerja Sistem

1.  **Input:** Responden mengisi kuesioner melalui antarmuka Google Forms.
2.  **Landing:** Data mentah mendarat sebagai baris baru (*array*) di Google Sheets.
3.  **Trigger:** Google Sheets mendeteksi baris baru dan secara otomatis memicu skrip JS di latar belakang.
4.  **Processing:** Google Apps Script mengekstraksi *array*, memformat *timestamp*, membuat *Unique ID*, dan menyusun *JSON Payload*.
5.  **Execution:** Skrip mengirimkan *HTTP POST Request* dengan *header Authorization Bearer* ke *endpoint* API Notion (`https://api.notion.com/v1/pages`).
6.  **Storage:** Halaman (*Page*) baru tercipta di dalam *Database* Notion secara terstruktur.

---

## Panduan Instalasi

### 1. Persiapan Notion
* Buat Integrasi Internal di [Notion Developers](https://www.notion.so/my-integrations) dan dapatkan **Internal Integration Token**.
* Buat tabel *Database* di Notion dengan kolom yang sesuai dengan skema JSON pada kode.
* Klik `...` di kanan atas *Database*, pilih **Connect to**, dan hubungkan integrasi Anda.
* Salin **Database ID** (32 karakter acak pada URL *database* Anda).

### 2. Persiapan Google Apps Script
* Buka file Google Sheets yang terhubung ke Google Form Anda.
* Klik **Ekstensi > Apps Script**.
* *Paste* kode dari file `NotionIntegration.js` di repositori ini.
* Ganti variabel `NOTION_TOKEN` dan `DATABASE_ID` dengan kredensial milik Anda.
* Klik **Simpan**.

### 3. Mengatur Pemicu (Trigger)
* Di menu kiri Apps Script, klik ikon jam weker (**Pemicu / Triggers**).
* Buat pemicu baru dengan pengaturan: 
  * *Pilih fungsi:* `kirimSurveyKeNotion`
  * *Pilih sumber acara:* `Dari spreadsheet`
  * *Pilih jenis acara:* `Saat formulir dikirim`
* Simpan dan berikan izin keamanan akun Google Anda.
