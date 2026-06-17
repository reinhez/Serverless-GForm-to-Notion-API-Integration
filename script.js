function kirimSurveyKeNotion(e) {
  // Mengambil data dari baris baru Google Sheets
  const timestamp = e.values[0];               // Kolom A
  const kemudahanPenggunaan = e.values[1];     // Kolom B
  const kemudahanPencarian = e.values[2];      // Kolom C
  const performaKecepatan = e.values[3];       // Kolom D
  const relevansiKonten = e.values[4];         // Kolom E
  const pengalamanIklan = e.values[5];         // Kolom F
  const pengalamanInteraksi = e.values[6];     // Kolom G
  const privasiKeamanan = e.values[7];         // Kolom H

  // Manipulasi string timestamp
  const pecahSpasi = timestamp.split(" ");
  const bagianTanggal = pecahSpasi[0].split("/");
  const bagianWaktu = pecahSpasi[1].split(":");

  const tanggal = bagianTanggal[0]; 
  const bulan = bagianTanggal[1];   
  const menit = bagianWaktu[1];     
  const detik = bagianWaktu[2];    

  // Membuat ID Unik
  const randomID = Math.random().toString(36).substring(2, 6).toUpperCase();
  const idResponden = "RSP" + randomID + tanggal + bulan + detik + menit;

  // Kredensial API Notion
  const NOTION_TOKEN = "MASUKKAN_NOTION_INTEGRATION_TOKEN";
  const DATABASE_ID = "MASUKKAN_ID_DATABASE_NOTION";

  // Menyusun JSON Payload
  const payload = {
    "parent": { "database_id": DATABASE_ID },
    "properties": {
      "ID": {
        "title": [{ "text": { "content": idResponden } }]
      },
      "Kemudahan Penggunaan": {
        "select": { "name": kemudahanPenggunaan }
      },
      "Kemudahan Pencarian": {
        "select": { "name": kemudahanPencarian }
      },
      "Performa dan Kecepatan": {
        "select": { "name": performaKecepatan }
      },
      "Relevansi Konten": {
        "select": { "name": relevansiKonten }
      },
      "Pengalaman Iklan": {
        "select": { "name": pengalamanIklan }
      },
      "Pengalaman Berinteraksi": {
        "select": { "name": pengalamanInteraksi }
      },
      "Privasi dan Keamanan": {
        "select": { "name": privasiKeamanan }
      }
    }
  };

  // Konfigurasi permintaan HTTP
  const options = {
    "method": "post",
    "headers": {
      "Authorization": "Bearer " + NOTION_TOKEN,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  // Mengeksekusi pengiriman ke API Notion
  try {
    const response = UrlFetchApp.fetch("https://api.notion.com/v1/pages", options);
    Logger.log("Response Notion: " + response.getContentText());
  } catch (error) {
    Logger.log("Terjadi Error: " + error);
  }
}