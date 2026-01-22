const express = require("express");
const db = require("./db.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware untuk membaca body JSON

// 1. WELCOME ROUTE
app.get("/", (req, res) => {
    res.send("Selamat datang di API Berita!");
});

// 2. READ: Melihat semua berita dari database
app.get("/berita", async (req, res) => {
    try {
        const hasil = await db.query("SELECT * FROM berita ORDER BY id ASC");
        res.json(hasil.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat mengambil data");
    }
});

// 3. READ ONE: Melihat satu berita berdasarkan ID
app.get("/berita/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const hasil = await db.query("SELECT * FROM berita WHERE id = $1", [id]);
        if (hasil.rows.length > 0) {
            res.json(hasil.rows[0]);
        } else {
            res.status(404).send("Berita tidak ditemukan");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat mengambil data");
    }
});

// 4. CREATE: Menambah berita baru ke database
app.post("/berita", async (req, res) => {
    const { judul, isi } = req.body; // Mengambil judul dan isi dari body
    try {
        await db.query("INSERT INTO berita (judul, isi) VALUES ($1, $2)", [judul, isi]);
        res.status(201).send("Berita berhasil ditambahkan!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menambah berita");
    }
});

// 5. UPDATE: Mengubah berita berdasarkan ID
app.put("/berita/:id", async (req, res) => {
    const id = req.params.id;
    const { judul, isi } = req.body;
    try {
        const hasil = await db.query(
            "UPDATE berita SET judul = $1, isi = $2 WHERE id = $3",
            [judul, isi, id]
        );

        if (hasil.rowCount > 0) {
            res.send(`Berita ID ${id} berhasil diupdate!`);
        } else {
            res.status(404).send("Berita tidak ditemukan");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal mengupdate berita");
    }
});

// 6. DELETE: Menghapus berita berdasarkan ID
app.delete("/berita/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const hasil = await db.query("DELETE FROM berita WHERE id = $1", [id]);
        if (hasil.rowCount > 0) {
            res.send(`Berita ID ${id} berhasil dihapus!`);
        } else {
            res.status(404).send("Berita tidak ditemukan");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menghapus berita");
    }
});

// Jalankan server jika tidak dideploy ke Vercel (serverless)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server jalan di http://localhost:${port}`);
    });
}

module.exports = app;
