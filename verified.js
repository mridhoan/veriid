<!-- Data dipisah (mock). Di produksi, pindahkan ke /data/verified.js dan muat sebelum app.js -->
<script>
window.VERIFIED_DATA = [
{ id:"@toko_bagus", status:"verified", type:"username", lastChecked:"2025-08-18", proof:"KTP + Selfie", views:1245 },
{ id:"081234567890", status:"pending", type:"phone", lastChecked:"2025-08-19", proof:"Dokumen diterima", views:78 },
{ id:"namaid", status:"none", type:"name", lastChecked:"2025-08-10", proof:"—", views:0 }
];
</script>
<script>
const q = document.getElementById('q');
const btn = document.getElementById('cekBtn');
const result = document.getElementById('result');
const idShown = document.getElementById('idShown');
const statusBadge = document.getElementById('statusBadge');
const meta = document.getElementById('meta');

function norm(v){ return (v||'').trim().toLowerCase(); }
function badge(status){
  if(status==='verified') return ['Terverifikasi','ok'];
  if(status==='pending') return ['Menunggu verifikasi','pend'];
  return ['Tidak terdaftar','no'];
}

function findId(v){
  const n = norm(v);
  let item = window.VERIFIED_DATA.find(x=> norm(x.id)===n);
  if(!item){ item = window.VERIFIED_DATA.find(x=> norm(x.id).includes(n)); }
  return item;
}

function render(item, query){
  result.style.display = 'block';
  idShown.textContent = query || '—';
  if(!item){
    statusBadge.className = 'badge no';
    statusBadge.textContent = 'Tidak terdaftar';
    meta.innerHTML = 'ID tidak ditemukan dalam basis data kami. <a href="#" onclick="alert(\'Daftar verifikasi\')">Daftarkan ID Anda?</a>';
    return;
  }
  const [txt, cls] = badge(item.status);
  statusBadge.className = `badge ${cls}`;
  statusBadge.textContent = txt;
  const typeLabel = item.type==='phone' ? 'Nomor telepon' : (item.type==='username' ? 'Username' : 'Nama');
  meta.innerHTML = `Jenis: <b>${typeLabel}</b> · Terakhir dicek: <b>${item.lastChecked}</b> · Bukti: <b>${item.proof}</b> · Total pengecekan: <b>${item.views.toLocaleString('id-ID')}</b>`;
}

function cek(){
  const v = q.value;
  if(!v){ alert('Masukkan ID/username/no. telp terlebih dahulu.'); return; }
  render(findId(v), v);
}

btn.addEventListener('click', cek);
q.addEventListener('keydown', e=>{ if(e.key==='Enter') cek(); });
</script>
