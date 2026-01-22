
const express = require("express");
const db = require("./db.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware untuk membaca body JSON

// 1. WELCOME ROUTE
app.get("/", (req, res) => {
    res.send("Selamat datang di API Expense Tracker!");
});

// 2. READ: Melihat semua pengeluaran dari database
app.get("/pengeluaran", async (req, res) => {
    try {
        const hasil = await db.query("SELECT * FROM pengeluaran ORDER BY id ASC");
        res.json(hasil.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat mengambil data");
    }
});

// 3. READ ONE: Melihat satu pengeluaran berdasarkan ID
app.get("/pengeluaran/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const hasil = await db.query("SELECT * FROM pengeluaran WHERE id = $1", [id]);
        if (hasil.rows.length > 0) {
            res.json(hasil.rows[0]);
        } else {
            res.status(404).send("Data tidak ditemukan");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat mengambil data");
    }
});

// 4. CREATE: Menambah pengeluaran baru ke database
app.post("/pengeluaran", async (req, res) => {
    const { nama, nominal } = req.body;
    try {
        await db.query("INSERT INTO pengeluaran (nama, nominal) VALUES ($1, $2)", [nama, nominal]);
        res.status(201).send("Data pengeluaran berhasil ditambahkan!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menambah data");
    }
});

// 5. UPDATE: Mengubah pengeluaran berdasarkan ID
app.put("/pengeluaran/:id", async (req, res) => {
    const id = req.params.id;
    const { nama, nominal } = req.body;
    try {
        const hasil = await db.query(
            "UPDATE pengeluaran SET nama = $1, nominal = $2 WHERE id = $3",
            [nama, nominal, id]
        );

        if (hasil.rowCount > 0) {
            res.send(`Data ID ${id} berhasil diupdate!`);
        } else {
            res.status(404).send("Data tidak ditemukan");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal mengupdate data");
    }
});

// 6. DELETE: Menghapus pengeluaran berdasarkan ID
app.delete("/pengeluaran/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const hasil = await db.query("DELETE FROM pengeluaran WHERE id = $1", [id]);
        if (hasil.rowCount > 0) {
            res.send(`Data ID ${id} berhasil dihapus!`);
        } else {
            res.status(404).send("Data tidak ditemukan");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menghapus data");
    }
});

// Jalankan server jika tidak dideploy ke Vercel (serverless)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server jalan di http://localhost:${port}`);
    });
}

module.exports = app;
