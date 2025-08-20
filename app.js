// app.js
function checkID() {
  const input = document.getElementById("idInput").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!input) {
    resultDiv.innerHTML = `<p style="color:red;">Silakan masukkan ID</p>`;
    return;
  }

  const data = VERIFIED_DATA[input];

  if (data) {
    let badgeClass = "";
    if (data.status === "Terverifikasi") badgeClass = "badge-success";
    else if (data.status === "Menunggu Verifikasi") badgeClass = "badge-pending";
    else badgeClass = "badge-fail";

    resultDiv.innerHTML = `
      <div class="result-card">
        <h3>${data.name}</h3>
        <span class="badge ${badgeClass}">${data.status}</span>
        <p>${data.info}</p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="result-card">
        <span class="badge badge-fail">Tidak Terdaftar</span>
        <p>ID tidak ditemukan.</p>
      </div>
    `;
  }
}
