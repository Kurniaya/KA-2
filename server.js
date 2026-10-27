
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const db = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "db_pohon"
});

app.get("/api/pohon", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM pohon ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data pohon" });
  }
});

app.post("/api/pohon", async (req, res) => {
  try {
    const { nama } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({ error: "Nama pohon wajib diisi" });
    }

    await db.query(
      "INSERT INTO pohon (nama) VALUES (?)",
      [nama.trim()]
    );

    res.status(201).json({ message: "Pohon berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menyimpan data pohon" });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "OK", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", database: "disconnected" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Aplikasi berjalan di port ${PORT}`);
});
