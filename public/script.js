
const form = document.getElementById("formPohon");
const inputNama = document.getElementById("nama");
const daftarPohon = document.getElementById("daftarPohon");

async function tampilkanPohon() {
  const response = await fetch("/api/pohon");
  const pohon = await response.json();

  daftarPohon.innerHTML = "";

  pohon.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.nama;
    daftarPohon.appendChild(li);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nama = inputNama.value.trim();
  if (!nama) return;

  await fetch("/api/pohon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nama })
  });

  inputNama.value = "";
  tampilkanPohon();
});

tampilkanPohon();