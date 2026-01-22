# Hasil Backend Bootcamp - Day 3 (Expense Tracker)

Ini adalah contoh hasil akhir dari materi Backend dan Database (Hari ke-3). Proyek ini menggunakan **Node.js**, **Express**, dan **PostgreSQL**.

## 🛠️ Persiapan

1.  Pastikan sudah menginstall [Node.js](https://nodejs.org/).
2.  Pastikan sudah menginstall [PostgreSQL](https://www.postgresql.org/).

## 🗄️ Persiapan Database

Buat database baru bernama `latihan_db` dan jalankan perintah SQL berikut untuk membuat tabel pengeluaran:

```sql
CREATE TABLE pengeluaran (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nominal INTEGER NOT NULL
);

-- Tambahkan contoh data
INSERT INTO pengeluaran (nama, nominal) VALUES 
('Beli Kopi', 15000),
('Bensin', 50000);
```

## 🚀 Cara Menjalankan

1.  Buka terminal di folder ini.
2.  Install library yang dibutuhkan:
    ```bash
    npm install
    ```
3.  Buat file `.env` di folder utama dan isi dengan `DATABASE_URL` kamu.
4.  Jalankan server:
    ```bash
    node server.js
    ```
5.  API siap diakses di `http://localhost:3000/pengeluaran`.

## 📌 Endpoint API

| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/pengeluaran` | Melihat semua data pengeluaran |
| GET | `/pengeluaran/:id` | Melihat satu data sesuai ID |
| POST | `/pengeluaran` | Menambah data pengeluaran baru |
| PUT | `/pengeluaran/:id` | Mengubah data pengeluaran |
| DELETE | `/pengeluaran/:id` | Menghapus data pengeluaran |