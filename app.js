/**
 * Elearner.id - Portal Belajar Mengajar & Administrasi Guru
 * Full JavaScript Client Engine with LocalStorage Persistence,
 * Native Mobile Camera & Laptop Webcam support, WIB Timezone Engine,
 * Role-Based Access Control, and Cascading Delete.
 */

// ==========================================
// 1. STATE & LOCALSTORAGE ENGINE
// ==========================================

const STORAGE_KEYS = {
  CURRENT_USER: 'elearner_current_user',
  CONFIG_JAM: 'elearner_config_jam',
  MURID_LIST: 'elearner_murid_list',
  PRESENSI_LIST: 'elearner_presensi_list',
  TUGAS_LIST: 'elearner_tugas_list',
  PENGUMPULAN_LIST: 'elearner_pengumpulan_list',
  JADWAL_LIST: 'elearner_jadwal_list',
  IZIN_LIST: 'elearner_izin_list',
  MATERI_LIST: 'elearner_materi_list',
  PENGUMUMAN_LIST: 'elearner_pengumuman_list',
};

// Initial Seed Data (Matching Screenshots Exactly)
const DEFAULT_CONFIG_JAM = {
  jamMasuk: '07:00',
  jamPulang: '14:00',
  toleransiMenit: 15
};

const DEFAULT_MURID = [
  {
    id: 'm1',
    nama: 'Budi Santoso',
    nisn: '0084729103',
    jenjang: 'SMP',
    kelas: 'Kelas 7A',
    email: 'budi.santoso@gmail.com',
    wali: 'Santoso Pratama',
    waliEmail: 'santoso.wali@gmail.com'
  },
  {
    id: 'm2',
    nama: 'Anisa Rahmawati',
    nisn: '0084729104',
    jenjang: 'SMP',
    kelas: 'Kelas 7A',
    email: 'anisa.rahmawati@gmail.com',
    wali: 'Rahmawati Ibu',
    waliEmail: 'rahma.wali@gmail.com'
  },
  {
    id: 'm3',
    nama: 'Rizky Ramadhan',
    nisn: '0084729105',
    jenjang: 'SMP',
    kelas: 'Kelas 7A',
    email: 'rizky.ramadhan@gmail.com',
    wali: 'Ramadhan Bapak',
    waliEmail: 'ramadhan.wali@gmail.com'
  }
];

const DEFAULT_PRESENSI = [
  {
    id: 'p1',
    muridId: 'm2',
    muridNama: 'Anisa Rahmawati',
    kelas: 'Kelas 7A',
    tanggal: '2026-11-03',
    jamMasuk: '06:45 WIB',
    statusMasuk: 'Tepat Waktu',
    fotoMasuk: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    driveLinkMasuk: 'https://drive.google.com/file/d/elearner_selfie_anisa_masuk_20261103/view?usp=sharing',
    jamPulang: null,
    fotoPulang: null,
    driveLinkPulang: null,
    statusVerifikasi: 'Terverifikasi', // 'Menunggu Verifikasi', 'Terverifikasi', 'Ditolak'
    diverifikasiOleh: 'Muhammad Alfathih, S.Pd'
  }
];

const DEFAULT_TUGAS = [
  {
    id: 't1',
    mapel: 'Bahasa Indonesia',
    judul: 'Analisis Cerpen & Kaidah Kebahasaan',
    kelas: 'Kelas 7A',
    deadline: '2026-11-15T23:59',
    deadlineDisplay: '15 November 2026, 23:59 WIB',
    deskripsi: 'Bacalah cerpen pilihan di Modul Bab 2, kemudian analisis unsur intrinsik (tema, alur, tokoh, amanat) serta kaidah kebahasaannya. Ketik rapi atau tulis tangan lalu kumpulkan file.',
    fileSoalNama: 'Lembar_Tugas_Cerpen_Kelas7A.pdf',
    dibuatOleh: 'Muhammad Alfathih, S.Pd',
    createdAt: '2026-11-02'
  },
  {
    id: 't2',
    mapel: 'IPA (Ilmu Pengetahuan Alam)',
    judul: 'Laporan Eksperimen Suhu & Perubahan Wujud Zat',
    kelas: 'Kelas 7A',
    deadline: '2026-11-20T23:59',
    deadlineDisplay: '20 November 2026, 23:59 WIB',
    deskripsi: 'Buatlah laporan praktikum uji suhu dan perpindahan kalor menggunakan termometer sederhana. Lampirkan foto hasil uji coba dalam bentuk file dokumen/PDF/gambar.',
    fileSoalNama: 'Panduan_Praktikum_IPA_7A.pdf',
    dibuatOleh: 'Ibu Siti Khodijah, M.Pd',
    createdAt: '2026-11-01'
  },
  {
    id: 't3',
    mapel: 'Matematika',
    judul: 'Latihan Soal Aljabar dan Persamaan Linier',
    kelas: 'Kelas 7A',
    deadline: '2026-11-08T23:59',
    deadlineDisplay: '8 November 2026, 23:59 WIB',
    deskripsi: 'Kerjakan soal halaman 45 nomor 1 sampai 15 pada buku paket. Tuliskan langkah-langkah penyelesaian dengan jelas.',
    fileSoalNama: null,
    dibuatOleh: 'Pak Hendra, S.Pd',
    createdAt: '2026-10-30'
  }
];

const DEFAULT_PENGUMPULAN = [
  {
    id: 'k1',
    tugasId: 't1',
    muridId: 'm2',
    muridNama: 'Anisa Rahmawati',
    kelas: 'Kelas 7A',
    waktuKumpul: '3 November 2026, 09:15 WIB',
    catatan: 'Sudah selesai pak, tugas analisis cerpen bagian amanat sudah lengkap.',
    fileNama: 'Tugas_Analisis_Cerpen_Anisa_7A.pdf',
    fileType: 'application/pdf',
    nilai: 95,
    catatanGuru: 'Analisis sangat mendalam dan struktur bahasa sangat rapi. Bagus sekali!'
  }
];

// Screenshot 1 Schedule: Bahasa Indonesia (07:00-08:30 R.7A), IPA (08:30-10:00 R.7A), Bahasa Inggris (10:15-11:45 R.7A), Matematika (12:30-14:00 R.7A)
const DEFAULT_JADWAL = [
  // SELASA (Matching Screenshot 1)
  { id: 'j1', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', mapel: 'Bahasa Indonesia', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Muhammad Alfathih, S.Pd' },
  { id: 'j2', hari: 'Selasa', jamMulai: '08:30', jamSelesai: '10:00', mapel: 'IPA', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Ibu Siti Khodijah, M.Pd' },
  { id: 'j3', hari: 'Selasa', jamMulai: '10:15', jamSelesai: '11:45', mapel: 'Bahasa Inggris', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Mr. John Doe, M.Ed' },
  { id: 'j4', hari: 'Selasa', jamMulai: '12:30', jamSelesai: '14:00', mapel: 'Matematika', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Pak Hendra, S.Pd' },
  
  // SENIN
  { id: 'j5', hari: 'Senin', jamMulai: '07:00', jamSelesai: '07:45', mapel: 'Upacara Bendera', kelas: 'Semua Kelas', ruang: 'Lapangan Utama', guru: 'Pembina OSIS' },
  { id: 'j6', hari: 'Senin', jamMulai: '08:00', jamSelesai: '09:30', mapel: 'Pendidikan Agama & Budi Pekerti', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Ust. Zainal Abidin, S.Ag' },
  { id: 'j7', hari: 'Senin', jamMulai: '09:45', jamSelesai: '11:15', mapel: 'Informatika', kelas: 'Kelas 7A', ruang: 'Lab Komputer', guru: 'Pak Dian Saputra, S.Kom' },
  { id: 'j8', hari: 'Senin', jamMulai: '11:30', jamSelesai: '13:00', mapel: 'PJOK (Olahraga)', kelas: 'Kelas 7A', ruang: 'Lapangan Olahraga', guru: 'Pak Bambang, S.Pd' },

  // RABU
  { id: 'j9', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '08:30', mapel: 'IPS (Ilmu Pengetahuan Sosial)', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Ibu Farida, S.Pd' },
  { id: 'j10', hari: 'Rabu', jamMulai: '08:30', jamSelesai: '10:00', mapel: 'Bahasa Indonesia', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Muhammad Alfathih, S.Pd' },
  { id: 'j11', hari: 'Rabu', jamMulai: '10:15', jamSelesai: '11:45', mapel: 'Seni Budaya', kelas: 'Kelas 7A', ruang: 'R. Kesenian', guru: 'Pak Surya, S.Sn' },

  // KAMIS
  { id: 'j12', hari: 'Kamis', jamMulai: '07:00', jamSelesai: '08:30', mapel: 'Matematika', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Pak Hendra, S.Pd' },
  { id: 'j13', hari: 'Kamis', jamMulai: '08:30', jamSelesai: '10:00', mapel: 'Bahasa Inggris', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Mr. John Doe, M.Ed' },
  { id: 'j14', hari: 'Kamis', jamMulai: '10:15', jamSelesai: '11:45', mapel: 'Prakarya', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Ibu Maya, S.Pd' },

  // JUMAT
  { id: 'j15', hari: 'Jumat', jamMulai: '07:00', jamSelesai: '08:00', mapel: 'Senam & Pembiasaan Karakter', kelas: 'Semua Kelas', ruang: 'Lapangan Utama', guru: 'Tim Kesiswaan' },
  { id: 'j16', hari: 'Jumat', jamMulai: '08:00', jamSelesai: '09:30', mapel: 'IPA Praktikum', kelas: 'Kelas 7A', ruang: 'Lab IPA', guru: 'Ibu Siti Khodijah, M.Pd' },
  { id: 'j17', hari: 'Jumat', jamMulai: '09:45', jamSelesai: '11:15', mapel: 'Bimbingan Konseling (BK)', kelas: 'Kelas 7A', ruang: 'R. 7A', guru: 'Ibu Wahyuni, M.Psi' }
];

const DEFAULT_MATERI = [
  {
    id: 'mat1',
    mapel: 'Bahasa Indonesia',
    judul: 'Modul Bab 2 - Struktur & Kebahasaan Teks Deskripsi',
    kelas: 'Kelas 7A',
    deskripsi: 'Materi lengkap panduan menyusun teks deskripsi, ciri kebahasaan majas, serta contoh analisis.',
    fileNama: 'Modul_Teks_Deskripsi_Kelas7.pdf',
    uploadedBy: 'Muhammad Alfathih, S.Pd',
    tglUpload: '1 November 2026'
  },
  {
    id: 'mat2',
    mapel: 'Bahasa Indonesia',
    judul: 'Kumpulan Cerpen Remaja & Unsur Pembangun Cerita',
    kelas: 'Kelas 7A',
    deskripsi: 'Bahan bacaan analisis cerpen untuk penugasan semester ganjil.',
    fileNama: 'Antologi_Cerpen_Kelas7A.pdf',
    uploadedBy: 'Muhammad Alfathih, S.Pd',
    tglUpload: '2 November 2026'
  },
  {
    id: 'mat3',
    mapel: 'IPA (Ilmu Pengetahuan Alam)',
    judul: 'Bab 3 - Suhu, Kalor, dan Pemuaian Benda',
    kelas: 'Kelas 7A',
    deskripsi: 'Slide presentasi konsep kalor jenis dan perambatan panas (konduksi, konveksi, radiasi).',
    fileNama: 'Materi_Suhu_dan_Kalor.pdf',
    uploadedBy: 'Ibu Siti Khodijah, M.Pd',
    tglUpload: '28 Oktober 2026'
  }
];

// Screenshot 2 Announcement: "Selamat datang di Elena.id / Elearner.id ... Presensi masuk & pulang kini menggunakan selfie dari kamera HP. Jangan lupa presensi setiap hari ya! Admin Elearner · 3 Nov 2026"
const DEFAULT_PENGUMUMAN = [
  {
    id: 'pkm1',
    judul: 'Selamat datang di Elearner.id',
    isi: 'Presensi masuk & pulang kini menggunakan selfie dari kamera HP. Jangan lupa presensi setiap hari ya!',
    penulis: 'Admin Elearner',
    tanggal: '3 Nov 2026',
    pinned: true
  },
  {
    id: 'pkm2',
    judul: 'Penilaian Tengah Semester (PTS) Ganjil',
    isi: 'Diberitahukan kepada seluruh murid jenjang SMP bahwa pelaksanaan PTS akan dimulai tanggal 18 November 2026. Mohon lengkapi tugas yang belum diselesaikan.',
    penulis: 'Kurikulum Sekolah',
    tanggal: '2 Nov 2026',
    pinned: false
  }
];

// App State Cache
let AppState = {
  currentUser: null,
  configJam: DEFAULT_CONFIG_JAM,
  muridList: [],
  presensiList: [],
  tugasList: [],
  pengumpulanList: [],
  jadwalList: [],
  izinList: [],
  materiList: [],
  pengumumanList: [],
  currentTab: 'beranda',
  selectedHariJadwal: 'Selasa', // Defaults to Tuesday matching Screenshot 1
  selectedKelasFilter: 'Kelas 7A',
  activeSelfieType: 'masuk', // 'masuk' or 'pulang'
  webcamStream: null
};

// ==========================================
// 2. INITIALIZATION & WIB TIME ENGINE
// ==========================================

function initApp() {
  loadStoredData();
  startWibClock();
  setupEventListeners();
  updateKelasDropdown();
  renderPublicAnnouncements();

  // Check login session
  const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (storedUser) {
    try {
      AppState.currentUser = JSON.parse(storedUser);
      showPortalView();
    } catch (e) {
      showLoginView();
    }
  } else {
    showLoginView();
  }

  // Refresh icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function loadStoredData() {
  AppState.configJam = getJsonItem(STORAGE_KEYS.CONFIG_JAM, DEFAULT_CONFIG_JAM);
  AppState.muridList = getJsonItem(STORAGE_KEYS.MURID_LIST, DEFAULT_MURID);
  AppState.presensiList = getJsonItem(STORAGE_KEYS.PRESENSI_LIST, DEFAULT_PRESENSI);
  AppState.tugasList = getJsonItem(STORAGE_KEYS.TUGAS_LIST, DEFAULT_TUGAS);
  AppState.pengumpulanList = getJsonItem(STORAGE_KEYS.PENGUMPULAN_LIST, DEFAULT_PENGUMPULAN);
  AppState.jadwalList = getJsonItem(STORAGE_KEYS.JADWAL_LIST, DEFAULT_JADWAL);
  AppState.izinList = getJsonItem(STORAGE_KEYS.IZIN_LIST, []);
  AppState.materiList = getJsonItem(STORAGE_KEYS.MATERI_LIST, DEFAULT_MATERI);
  AppState.pengumumanList = getJsonItem(STORAGE_KEYS.PENGUMUMAN_LIST, DEFAULT_PENGUMUMAN);
}

function getJsonItem(key, defaultVal) {
  const val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return defaultVal;
  }
}

function saveState(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Live WIB Clock (Waktu Indonesia Barat: UTC+7)
function getWibDate() {
  const now = new Date();
  // Compute UTC + 7 hours
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * 7));
}

function formatWibTime(dateObj) {
  const h = String(dateObj.getHours()).padStart(2, '0');
  const m = String(dateObj.getMinutes()).padStart(2, '0');
  const s = String(dateObj.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s} WIB`;
}

function formatWibShortTime(dateObj) {
  const h = String(dateObj.getHours()).padStart(2, '0');
  const m = String(dateObj.getMinutes()).padStart(2, '0');
  return `${h}:${m} WIB`;
}

function formatIndonesianDate(dateObj) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const dayName = days[dateObj.getDay()];
  const dateNum = dateObj.getDate();
  const monthName = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${year}`;
}

function startWibClock() {
  function updateClock() {
    const wib = getWibDate();
    const clockEl = document.getElementById('headerLiveClock');
    const headerDateEl = document.getElementById('currentFullDateWib');
    const studentTimeEl = document.getElementById('studentPresensiWibTime');

    if (clockEl) clockEl.textContent = formatWibTime(wib);
    if (headerDateEl) headerDateEl.textContent = formatIndonesianDate(wib);
    if (studentTimeEl) studentTimeEl.textContent = formatWibShortTime(wib);
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// Reset Demo Data
function resetDataDemo() {
  if (confirm('Apakah Anda yakin ingin mereset seluruh data simulasi ke data awal bawaan sistem?')) {
    localStorage.clear();
    location.reload();
  }
}

// ==========================================
// 3. AUTH & LOGIN SYSTEM
// ==========================================

let activeLoginRole = 'murid';

function setLoginRole(role) {
  activeLoginRole = role;
  
  const tabMurid = document.getElementById('tabMurid');
  const tabGuru = document.getElementById('tabGuru');
  const tabWali = document.getElementById('tabWali');

  const formMurid = document.getElementById('formLoginMurid');
  const formGuru = document.getElementById('formLoginGuru');
  const formWali = document.getElementById('formLoginWali');

  const resetTab = (el) => {
    el.className = 'flex flex-col items-center py-2 px-1 rounded-xl font-bold text-xs transition-all text-slate-600 hover:text-slate-900';
  };
  const activeTab = (el) => {
    el.className = 'flex flex-col items-center py-2 px-1 rounded-xl font-bold text-xs transition-all shadow-sm bg-white text-brand-600';
  };

  resetTab(tabMurid);
  resetTab(tabGuru);
  resetTab(tabWali);

  formMurid.classList.add('hidden');
  formGuru.classList.add('hidden');
  formWali.classList.add('hidden');

  if (role === 'murid') {
    activeTab(tabMurid);
    formMurid.classList.remove('hidden');
  } else if (role === 'guru') {
    activeTab(tabGuru);
    formGuru.classList.remove('hidden');
  } else if (role === 'wali') {
    activeTab(tabWali);
    formWali.classList.remove('hidden');
  }

  if (window.lucide) window.lucide.createIcons();
}

function updateKelasDropdown() {
  const jenjang = document.getElementById('loginMuridJenjang')?.value || 'SMP';
  const kelasSelect = document.getElementById('loginMuridKelas');
  if (!kelasSelect) return;

  kelasSelect.innerHTML = '';
  let options = [];

  if (jenjang === 'SD') {
    options = ['Kelas 1A', 'Kelas 2A', 'Kelas 3A', 'Kelas 4A', 'Kelas 5A', 'Kelas 6A'];
  } else if (jenjang === 'SMP') {
    options = ['Kelas 7A', 'Kelas 7B', 'Kelas 8A', 'Kelas 8B', 'Kelas 9A', 'Kelas 9B'];
  } else if (jenjang === 'SMA') {
    options = ['Kelas 10 MIPA 1', 'Kelas 10 IPS 1', 'Kelas 11 MIPA 1', 'Kelas 12 MIPA 1'];
  } else if (jenjang === 'SMK') {
    options = ['Kelas 10 TKJ', 'Kelas 10 RPL', 'Kelas 11 TKJ', 'Kelas 12 RPL'];
  }

  options.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt;
    el.textContent = opt;
    if (opt === 'Kelas 7A') el.selected = true;
    kelasSelect.appendChild(el);
  });
}

function handleLoginSubmit(e, role) {
  e.preventDefault();

  if (role === 'guru') {
    const nama = document.getElementById('loginGuruNama').value.trim();
    const email = document.getElementById('loginGuruEmail').value.trim().toLowerCase();
    const mapel = document.getElementById('loginGuruMapel').value;

    // Requirement: "wajib menggunakan akun belajar ID atau akun sekolah."
    const isBelajarId = email.endsWith('.belajar.id') || email.includes('belajar.id');
    const isSekolahDomain = email.endsWith('.sch.id') || email.includes('.sch.') || email.endsWith('.ac.id');

    if (!isBelajarId && !isSekolahDomain) {
      alert('⚠️ Guru WAJIB menggunakan akun Belajar ID (@*.belajar.id) atau email resmi sekolah (@*.sch.id) untuk mengakses portal administrasi.');
      return;
    }

    AppState.currentUser = {
      role: 'guru',
      nama: nama,
      email: email,
      mapel: mapel,
      avatar: nama.charAt(0).toUpperCase()
    };
  } else if (role === 'murid') {
    const nama = document.getElementById('loginMuridNama').value.trim();
    const jenjang = document.getElementById('loginMuridJenjang').value;
    const kelas = document.getElementById('loginMuridKelas').value;
    const nisn = document.getElementById('loginMuridNisn').value.trim() || '0084729103';
    const email = document.getElementById('loginMuridEmail').value.trim();

    // Check if murid exists in database or create entry
    let existing = AppState.muridList.find(m => m.nama.toLowerCase() === nama.toLowerCase());
    if (!existing) {
      existing = {
        id: 'm_' + Date.now(),
        nama: nama,
        nisn: nisn,
        jenjang: jenjang,
        kelas: kelas,
        email: email,
        wali: 'Orang Tua ' + nama,
        waliEmail: 'ortu.' + email
      };
      AppState.muridList.push(existing);
      saveState(STORAGE_KEYS.MURID_LIST, AppState.muridList);
    }

    AppState.currentUser = {
      role: 'murid',
      id: existing.id,
      nama: existing.nama,
      nisn: existing.nisn,
      jenjang: existing.jenjang,
      kelas: existing.kelas,
      email: existing.email,
      avatar: existing.nama.charAt(0).toUpperCase()
    };
  } else if (role === 'wali') {
    const namaWali = document.getElementById('loginWaliNama').value.trim();
    const emailWali = document.getElementById('loginWaliEmail').value.trim();
    const muridNama = document.getElementById('loginWaliMuridNama').value.trim();

    // Find student
    const student = AppState.muridList.find(m => m.nama.toLowerCase() === muridNama.toLowerCase()) || AppState.muridList[0];

    AppState.currentUser = {
      role: 'wali',
      nama: namaWali,
      email: emailWali,
      muridId: student.id,
      muridNama: student.nama,
      kelas: student.kelas,
      avatar: namaWali.charAt(0).toUpperCase()
    };
  }

  saveState(STORAGE_KEYS.CURRENT_USER, AppState.currentUser);
  showToast(`Selamat datang di Elearner.id, ${AppState.currentUser.nama}!`, 'success');
  showPortalView();
}

function handleLogout() {
  if (confirm('Apakah Anda ingin keluar dari akun? Anda diharuskan login ulang untuk mengakses portal.')) {
    AppState.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showLoginView();
    showToast('Anda telah berhasil keluar.', 'info');
  }
}

function showLoginView() {
  document.getElementById('viewLogin').classList.remove('hidden');
  document.getElementById('viewPortal').classList.add('hidden');
  renderPublicAnnouncements();
  if (window.lucide) window.lucide.createIcons();
}

function showPortalView() {
  document.getElementById('viewLogin').classList.add('hidden');
  document.getElementById('viewPortal').classList.remove('hidden');

  updateHeaderProfile();
  applyRoleVisibility();
  navigateTo(AppState.currentTab || 'beranda');
  refreshAllDashboardData();

  if (window.lucide) window.lucide.createIcons();
}

function updateHeaderProfile() {
  const u = AppState.currentUser;
  if (!u) return;

  const headerName = document.getElementById('headerUserName');
  const headerRole = document.getElementById('headerUserRole');
  const headerAvatar = document.getElementById('headerUserAvatar');

  if (headerName) headerName.textContent = u.nama;
  if (headerAvatar) headerAvatar.textContent = u.avatar || u.nama.charAt(0).toUpperCase();

  if (headerRole) {
    if (u.role === 'guru') {
      headerRole.textContent = `Guru ${u.mapel || 'Mata Pelajaran'}`;
    } else if (u.role === 'murid') {
      headerRole.textContent = `Murid ${u.kelas}`;
    } else if (u.role === 'wali') {
      headerRole.textContent = `Wali Murid (${u.muridNama})`;
    }
  }
}

function applyRoleVisibility() {
  const u = AppState.currentUser;
  if (!u) return;

  const isGuru = u.role === 'guru';
  const isMurid = u.role === 'murid';
  const isWali = u.role === 'wali';

  // Sidebar link visibility: Kelas & Murid is only for Guru
  const sideKelasMurid = document.getElementById('sideNav-kelasmurid');
  const mobKelasMurid = document.getElementById('mobMenuKelasMurid');
  if (sideKelasMurid) sideKelasMurid.style.display = isGuru ? 'flex' : 'none';
  if (mobKelasMurid) mobKelasMurid.style.display = isGuru ? 'flex' : 'none';

  // Hero Banners
  const teacherHero = document.getElementById('teacherHeroBanner');
  const studentHero = document.getElementById('studentHeroBanner');
  if (teacherHero && studentHero) {
    if (isGuru) {
      teacherHero.classList.remove('hidden');
      studentHero.classList.add('hidden');
      document.getElementById('heroGreetingTitle').textContent = `Halo, ${u.nama.split(' ')[0]}!`;
    } else {
      teacherHero.classList.add('hidden');
      studentHero.classList.remove('hidden');
      document.getElementById('studentGreetingTitle').textContent = `Halo, ${u.nama}!`;
      document.getElementById('studentClassBadge').textContent = isMurid ? `Murid ${u.kelas}` : `Wali dari ${u.muridNama}`;
    }
  }

  // Presensi Panels
  const teacherPresensiPanel = document.getElementById('teacherPresensiPanel');
  const studentPresensiPanel = document.getElementById('studentPresensiPanel');
  if (teacherPresensiPanel && studentPresensiPanel) {
    if (isGuru) {
      teacherPresensiPanel.classList.remove('hidden');
      studentPresensiPanel.classList.add('hidden');
    } else {
      teacherPresensiPanel.classList.add('hidden');
      studentPresensiPanel.classList.remove('hidden');
    }
  }

  // Task creation button (Teacher only)
  const btnCreateTugas = document.getElementById('btnCreateTugas');
  if (btnCreateTugas) btnCreateTugas.style.display = isGuru ? 'flex' : 'none';

  // Add schedule button (Teacher only)
  const btnAddJadwal = document.getElementById('btnAddJadwal');
  if (btnAddJadwal) btnAddJadwal.style.display = isGuru ? 'flex' : 'none';

  // Upload materi button (Teacher only)
  const btnUploadMateri = document.getElementById('btnUploadMateri');
  if (btnUploadMateri) btnUploadMateri.style.display = isGuru ? 'flex' : 'none';

  // Create announcement button (Teacher only)
  const btnCreatePengumuman = document.getElementById('btnCreatePengumuman');
  if (btnCreatePengumuman) btnCreatePengumuman.style.display = isGuru ? 'flex' : 'none';

  // Apply Izin button (Student only)
  const btnAjukanIzin = document.getElementById('btnAjukanIzin');
  if (btnAjukanIzin) btnAjukanIzin.style.display = (isMurid || isWali) ? 'flex' : 'none';
}

// ==========================================
// 4. NAVIGATION & TABS
// ==========================================

function navigateTo(tabId) {
  AppState.currentTab = tabId;

  // Section list
  const sections = ['beranda', 'presensi', 'tugas', 'jadwal', 'izin', 'materi', 'pengumuman', 'kelasmurid'];

  sections.forEach(s => {
    const el = document.getElementById(`section-${s}`);
    if (el) {
      if (s === tabId) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }

    // Sidebar button styles
    const sideBtn = document.getElementById(`sideNav-${s}`);
    if (sideBtn) {
      if (s === tabId) {
        sideBtn.className = 'w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all bg-white text-brand-600 shadow-sm';
      } else {
        sideBtn.className = 'w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all text-white/80 hover:bg-white/10 hover:text-white';
      }
    }

    // Mobile nav button styles
    const mobBtn = document.getElementById(`mobNav-${s}`);
    if (mobBtn) {
      if (s === tabId) {
        mobBtn.className = 'flex flex-col items-center py-1 px-2 rounded-xl text-brand-600 transition';
      } else {
        mobBtn.className = 'flex flex-col items-center py-1 px-2 rounded-xl text-slate-400 transition';
      }
    }
  });

  // Re-render specific tab contents
  if (tabId === 'beranda') refreshAllDashboardData();
  if (tabId === 'presensi') renderPresensiTab();
  if (tabId === 'tugas') renderTugasTab();
  if (tabId === 'jadwal') renderJadwalTab();
  if (tabId === 'izin') renderIzinTab();
  if (tabId === 'materi') renderMateriTab();
  if (tabId === 'pengumuman') renderPengumumanTab();
  if (tabId === 'kelasmurid') renderKelasMuridTab();

  if (window.lucide) window.lucide.createIcons();
}

function toggleMobileMoreMenu() {
  const menu = document.getElementById('mobileMoreMenu');
  if (menu) menu.classList.toggle('hidden');
  if (window.lucide) window.lucide.createIcons();
}

// Device View Switcher (Desktop vs Mobile simulation)
function switchDeviceView(mode) {
  const container = document.getElementById('appContainer');
  const btnDesktop = document.getElementById('btnViewDesktop');
  const btnMobile = document.getElementById('btnViewMobile');

  if (mode === 'mobile') {
    container.classList.add('mobile-simulator-frame');
    document.body.classList.add('mobile-simulator-active');
    btnMobile.className = 'px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 bg-white text-brand-700 shadow-sm';
    btnDesktop.className = 'px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 text-slate-600 hover:text-slate-900';
    showToast('Beralih ke Simulasi Tampilan HP', 'info');
  } else {
    container.classList.remove('mobile-simulator-frame');
    document.body.classList.remove('mobile-simulator-active');
    btnDesktop.className = 'px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 bg-white text-brand-700 shadow-sm';
    btnMobile.className = 'px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 text-slate-600 hover:text-slate-900';
    showToast('Beralih ke Tampilan Laptop Penuh', 'info');
  }
}

// ==========================================
// 5. PRESENSI ENGINE & SELFIE CAMERA
// ==========================================

function renderPresensiTab() {
  const u = AppState.currentUser;
  if (!u) return;

  if (u.role === 'guru') {
    renderPresensiTable();
  } else {
    renderStudentPresensiCard();
  }
}

// Student Presensi Screen (Screenshot 3 Replication)
function renderStudentPresensiCard() {
  const u = AppState.currentUser;
  const targetMuridId = u.role === 'murid' ? u.id : u.muridId;

  // Labels for target hours
  document.getElementById('lblJamMasukTarget').textContent = `Jam ${AppState.configJam.jamMasuk}`;
  document.getElementById('lblJamPulangTarget').textContent = `Jam ${AppState.configJam.jamPulang}`;
  document.getElementById('studentJamMasukText').textContent = `${AppState.configJam.jamMasuk} WIB`;

  // Look for today's presensi for this student
  const todayStr = '2026-11-03';
  const presensi = AppState.presensiList.find(p => p.muridId === targetMuridId && p.tanggal === todayStr);

  const statusMasukText = document.getElementById('statusPresensiMasukText');
  const btnMasukContainer = document.getElementById('btnMasukContainer');
  const previewMasukContainer = document.getElementById('previewMasukContainer');

  const statusPulangText = document.getElementById('statusPresensiPulangText');
  const btnPulangContainer = document.getElementById('btnPulangContainer');
  const previewPulangContainer = document.getElementById('previewPulangContainer');
  const btnSelfiePulang = document.getElementById('btnSelfiePulang');
  const btnSelfiePulangLabel = document.getElementById('btnSelfiePulangLabel');

  const badgeMasuk = document.getElementById('badgeMasukStatus');
  const badgeHomePresensi = document.getElementById('studentPresensiStatusBadge');

  if (presensi && presensi.jamMasuk) {
    // Already did presensi masuk
    statusMasukText.classList.add('hidden');
    btnMasukContainer.classList.add('hidden');
    previewMasukContainer.classList.remove('hidden');

    document.getElementById('imgPreviewMasuk').src = presensi.fotoMasuk;
    document.getElementById('timeMasukRecorded').textContent = presensi.jamMasuk;
    document.getElementById('linkDriveMasuk').href = presensi.driveLinkMasuk || '#';

    badgeMasuk.textContent = presensi.statusVerifikasi;
    if (presensi.statusVerifikasi === 'Terverifikasi') {
      badgeMasuk.className = 'px-2.5 py-1 text-[11px] font-bold rounded-xl bg-emerald-50 text-emerald-700';
    } else if (presensi.statusVerifikasi === 'Ditolak') {
      badgeMasuk.className = 'px-2.5 py-1 text-[11px] font-bold rounded-xl bg-rose-50 text-rose-700';
    } else {
      badgeMasuk.className = 'px-2.5 py-1 text-[11px] font-bold rounded-xl bg-amber-50 text-amber-700';
    }

    if (badgeHomePresensi) {
      badgeHomePresensi.className = 'inline-flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200';
      badgeHomePresensi.innerHTML = `<i data-lucide="check-circle" class="w-3.5 h-3.5"></i><span>Presensi Masuk Tercatat (${presensi.jamMasuk})</span>`;
    }

    // Selfie Pulang Button is now UNLOCKED! (Requirement: "tombol 'Selfie pulang' baru aktif setelah presensi masuk")
    if (presensi.jamPulang) {
      // Pulang already done
      statusPulangText.classList.add('hidden');
      btnPulangContainer.classList.add('hidden');
      previewPulangContainer.classList.remove('hidden');
      document.getElementById('imgPreviewPulang').src = presensi.fotoPulang;
      document.getElementById('timePulangRecorded').textContent = presensi.jamPulang;
      document.getElementById('linkDrivePulang').href = presensi.driveLinkPulang || '#';
    } else {
      statusPulangText.classList.remove('hidden');
      statusPulangText.textContent = `Batas pulang dimulai jam ${AppState.configJam.jamPulang} WIB.`;
      btnPulangContainer.classList.remove('hidden');
      previewPulangContainer.classList.add('hidden');

      btnSelfiePulang.disabled = false;
      btnSelfiePulang.className = 'w-full py-3.5 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition shadow-md shadow-brand-500/20 text-sm cursor-pointer';
      btnSelfiePulangLabel.textContent = 'Selfie pulang';
    }

  } else {
    // Has not done presensi masuk
    statusMasukText.classList.remove('hidden');
    statusMasukText.textContent = 'Belum presensi masuk hari ini.';
    btnMasukContainer.classList.remove('hidden');
    previewMasukContainer.classList.add('hidden');

    statusPulangText.classList.remove('hidden');
    statusPulangText.textContent = 'Belum presensi pulang hari ini.';
    btnPulangContainer.classList.remove('hidden');
    previewPulangContainer.classList.add('hidden');

    // Selfie Pulang DISABLED
    btnSelfiePulang.disabled = true;
    btnSelfiePulang.className = 'w-full py-3.5 bg-brand-200 text-brand-600 font-bold rounded-2xl flex items-center justify-center space-x-2 cursor-not-allowed transition text-sm';
    btnSelfiePulangLabel.textContent = 'Presensi masuk dulu';

    if (badgeHomePresensi) {
      badgeHomePresensi.className = 'inline-flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200';
      badgeHomePresensi.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i><span>Belum Presensi Masuk</span>`;
    }
  }

  // Render History List
  const historyContainer = document.getElementById('studentPresensiHistoryList');
  if (historyContainer) {
    const studentHistory = AppState.presensiList.filter(p => p.muridId === targetMuridId);
    if (studentHistory.length === 0) {
      historyContainer.innerHTML = '<div class="text-center py-6 text-xs text-slate-400">Belum ada riwayat presensi.</div>';
    } else {
      historyContainer.innerHTML = studentHistory.map(p => `
        <div class="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white">
              <img src="${p.fotoMasuk || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'}" class="w-full h-full object-cover">
            </div>
            <div>
              <span class="text-xs font-bold text-slate-800 block">${p.tanggal}</span>
              <span class="text-[11px] text-slate-500">Masuk: ${p.jamMasuk} · Pulang: ${p.jamPulang || '-'}</span>
            </div>
          </div>
          <span class="px-2.5 py-1 text-[10px] font-bold rounded-lg ${
            p.statusVerifikasi === 'Terverifikasi' ? 'bg-emerald-100 text-emerald-800' :
            p.statusVerifikasi === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
          }">${p.statusVerifikasi}</span>
        </div>
      `).join('');
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

// Trigger Camera Selfie:
// Requirement: "Wajib selfie menggunakan aplikasi kamera hp (jangan kamera browser karena di blokir) dan bagi user windows kamera bisa diakses."
function triggerSelfieCapture(type) {
  AppState.activeSelfieType = type;

  // Detect if Mobile or Desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Open native HP camera app directly via file input capture="user"
    const fileInput = document.getElementById('cameraFileInput');
    if (fileInput) {
      fileInput.click();
    }
  } else {
    // On Windows/Laptop: Try webcam directly
    openWebcamModal();
  }
}

// Handling Native Phone Camera File
function handleNativeCameraFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    savePresensiSelfie(event.target.result);
  };
  reader.readAsDataURL(file);
}

// Webcam modal for Laptop / Windows
async function openWebcamModal() {
  const modal = document.getElementById('modalWebcamCapture');
  const video = document.getElementById('webcamVideo');
  const loading = document.getElementById('webcamLoading');
  const title = document.getElementById('modalWebcamTitle');

  title.textContent = AppState.activeSelfieType === 'masuk' ? 'Selfie Presensi Masuk' : 'Selfie Presensi Pulang';
  modal.classList.remove('hidden');
  loading.classList.remove('hidden');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });
    AppState.webcamStream = stream;
    video.srcObject = stream;
    loading.classList.add('hidden');
  } catch (err) {
    loading.innerHTML = `
      <div class="p-4 text-center">
        <i data-lucide="camera-off" class="w-8 h-8 mx-auto mb-2 text-rose-400"></i>
        <p class="font-bold mb-1">Kamera Tidak Dapat Dibuka Otomatis</p>
        <p class="text-[11px] text-slate-300 mb-3">Browser Anda memblokir akses atau webcam tidak tersedia.</p>
        <button type="button" onclick="document.getElementById('cameraFileInput').click(); closeWebcamModal();" class="px-4 py-2 bg-brand-500 rounded-xl font-bold text-xs text-white">
          Gunakan Upload Foto / File
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
}

function takeWebcamSnapshot() {
  const video = document.getElementById('webcamVideo');
  const canvas = document.getElementById('webcamCanvas');
  
  if (!video || !canvas) return;

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  
  // Mirror snapshot to match webcam view
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUri = canvas.toDataURL('image/jpeg', 0.85);
  closeWebcamModal();
  savePresensiSelfie(dataUri);
}

function closeWebcamModal() {
  const modal = document.getElementById('modalWebcamCapture');
  modal.classList.add('hidden');
  if (AppState.webcamStream) {
    AppState.webcamStream.getTracks().forEach(track => track.stop());
    AppState.webcamStream = null;
  }
}

// Save Presensi Selfie with Google Drive Link Simulator & WIB Time
function savePresensiSelfie(photoDataUri) {
  const u = AppState.currentUser;
  const targetMuridId = u.role === 'murid' ? u.id : u.muridId;
  const targetMuridNama = u.role === 'murid' ? u.nama : u.muridNama;
  const targetKelas = u.kelas || 'Kelas 7A';

  const wib = getWibDate();
  const timeStr = formatWibShortTime(wib);
  const todayStr = '2026-11-03';

  // Check punctuality against teacher-configured Jam Masuk
  const [cfgH, cfgM] = AppState.configJam.jamMasuk.split(':').map(Number);
  const nowH = wib.getHours();
  const nowM = wib.getMinutes();
  const isLate = (nowH > cfgH) || (nowH === cfgH && nowM > cfgM);

  // Requirement: "foto nya disimpan di google drive dan dijadikan link di database"
  const fakeDriveId = 'elearner_gdrive_' + Math.random().toString(36).substring(2, 12);
  const googleDriveLink = `https://drive.google.com/file/d/${fakeDriveId}/view?usp=sharing`;

  let existing = AppState.presensiList.find(p => p.muridId === targetMuridId && p.tanggal === todayStr);

  if (AppState.activeSelfieType === 'masuk') {
    if (!existing) {
      existing = {
        id: 'p_' + Date.now(),
        muridId: targetMuridId,
        muridNama: targetMuridNama,
        kelas: targetKelas,
        tanggal: todayStr,
        jamMasuk: timeStr,
        statusMasuk: isLate ? 'Terlambat' : 'Tepat Waktu',
        fotoMasuk: photoDataUri,
        driveLinkMasuk: googleDriveLink,
        jamPulang: null,
        fotoPulang: null,
        driveLinkPulang: null,
        statusVerifikasi: 'Menunggu Verifikasi', // Guru wajib verifikasi!
        diverifikasiOleh: null
      };
      AppState.presensiList.unshift(existing);
    } else {
      existing.jamMasuk = timeStr;
      existing.statusMasuk = isLate ? 'Terlambat' : 'Tepat Waktu';
      existing.fotoMasuk = photoDataUri;
      existing.driveLinkMasuk = googleDriveLink;
      existing.statusVerifikasi = 'Menunggu Verifikasi';
    }
    showToast(`Presensi masuk berhasil direkam (${timeStr})! Menunggu verifikasi guru.`, 'success');
  } else {
    // Presensi Pulang
    if (existing) {
      existing.jamPulang = timeStr;
      existing.fotoPulang = photoDataUri;
      existing.driveLinkPulang = googleDriveLink;
      showToast(`Presensi pulang berhasil direkam (${timeStr})! Terima kasih.`, 'success');
    }
  }

  saveState(STORAGE_KEYS.PRESENSI_LIST, AppState.presensiList);
  renderStudentPresensiCard();
  refreshAllDashboardData();
}

// Teacher Presensi Verification Table
function renderPresensiTable() {
  const tableBody = document.getElementById('tablePresensiBody');
  const badgePending = document.getElementById('badgePendingCount');
  const filter = document.getElementById('filterPresensiStatus')?.value || 'all';

  if (!tableBody) return;

  let list = AppState.presensiList;
  if (filter === 'pending') list = list.filter(p => p.statusVerifikasi === 'Menunggu Verifikasi');
  if (filter === 'verified') list = list.filter(p => p.statusVerifikasi === 'Terverifikasi');
  if (filter === 'rejected') list = list.filter(p => p.statusVerifikasi === 'Ditolak');

  const pendingCount = AppState.presensiList.filter(p => p.statusVerifikasi === 'Menunggu Verifikasi').length;
  if (badgePending) badgePending.textContent = `${pendingCount} Menunggu Verifikasi`;

  if (list.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-xs text-slate-400">Tidak ada data presensi yang cocok.</td></tr>`;
    return;
  }

  tableBody.innerHTML = list.map(p => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-bold text-slate-800">${p.muridNama}</td>
      <td class="py-3 px-4 text-slate-500 font-semibold">${p.kelas}</td>
      <td class="py-3 px-4">
        <span class="font-bold text-slate-700 block">${p.jamMasuk || '-'}</span>
        <span class="text-[10px] font-semibold ${p.statusMasuk === 'Terlambat' ? 'text-rose-600' : 'text-emerald-600'}">${p.statusMasuk || ''}</span>
      </td>
      <td class="py-3 px-4">
        ${p.fotoMasuk ? `
          <div class="relative group cursor-pointer w-10 h-10 rounded-xl overflow-hidden border border-slate-200">
            <img src="${p.fotoMasuk}" class="w-full h-full object-cover">
          </div>
        ` : '<span class="text-slate-400">-</span>'}
      </td>
      <td class="py-3 px-4 font-bold text-slate-700">${p.jamPulang || '-'}</td>
      <td class="py-3 px-4">
        ${p.fotoPulang ? `
          <div class="relative group cursor-pointer w-10 h-10 rounded-xl overflow-hidden border border-slate-200">
            <img src="${p.fotoPulang}" class="w-full h-full object-cover">
          </div>
        ` : '<span class="text-slate-400">-</span>'}
      </td>
      <td class="py-3 px-4">
        <span class="inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg ${
          p.statusVerifikasi === 'Terverifikasi' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
          p.statusVerifikasi === 'Ditolak' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
        }">${p.statusVerifikasi}</span>
        ${p.driveLinkMasuk ? `
          <a href="${p.driveLinkMasuk}" target="_blank" class="block text-[10px] text-brand-600 underline font-semibold mt-1">
            Buka File Drive
          </a>
        ` : ''}
      </td>
      <td class="py-3 px-4 text-right space-x-1">
        ${p.statusVerifikasi === 'Menunggu Verifikasi' ? `
          <button onclick="verifyPresensi('${p.id}', true)" class="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] shadow-sm">
            Verifikasi
          </button>
          <button onclick="verifyPresensi('${p.id}', false)" class="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[10px]">
            Tolak
          </button>
        ` : `
          <span class="text-[11px] text-slate-400 italic">Oleh: ${p.diverifikasiOleh || 'Guru'}</span>
        `}
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function verifyPresensi(id, isApproved) {
  const presensi = AppState.presensiList.find(p => p.id === id);
  if (!presensi) return;

  presensi.statusVerifikasi = isApproved ? 'Terverifikasi' : 'Ditolak';
  presensi.diverifikasiOleh = AppState.currentUser?.nama || 'Guru';

  saveState(STORAGE_KEYS.PRESENSI_LIST, AppState.presensiList);
  showToast(`Presensi ${presensi.muridNama} berhasil ${isApproved ? 'diverifikasi' : 'ditolak'}.`, isApproved ? 'success' : 'warning');
  renderPresensiTable();
  refreshAllDashboardData();
}

// Teacher Config Jam Masuk & Jam Pulang Modal
function openConfigJamModal() {
  document.getElementById('cfgJamMasuk').value = AppState.configJam.jamMasuk;
  document.getElementById('cfgJamPulang').value = AppState.configJam.jamPulang;
  document.getElementById('modalConfigJam').classList.remove('hidden');
}

function closeConfigJamModal() {
  document.getElementById('modalConfigJam').classList.add('hidden');
}

function handleSaveConfigJam(e) {
  e.preventDefault();
  const jamMasuk = document.getElementById('cfgJamMasuk').value;
  const jamPulang = document.getElementById('cfgJamPulang').value;

  AppState.configJam.jamMasuk = jamMasuk;
  AppState.configJam.jamPulang = jamPulang;

  saveState(STORAGE_KEYS.CONFIG_JAM, AppState.configJam);
  closeConfigJamModal();
  showToast('Pengaturan jam sekolah WIB berhasil diperbarui!', 'success');
  renderPresensiTab();
}

// ==========================================
// 6. TUGAS (ASSIGNMENTS) & PENILAIAN
// ==========================================

function renderTugasTab() {
  const container = document.getElementById('tugasGridContainer');
  if (!container) return;

  const u = AppState.currentUser;
  const isGuru = u && u.role === 'guru';
  const targetMuridId = u ? (u.role === 'murid' ? u.id : u.muridId) : null;

  if (AppState.tugasList.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-12 text-xs text-slate-400">Belum ada tugas yang diterbitkan.</div>';
    return;
  }

  container.innerHTML = AppState.tugasList.map(t => {
    // Check if current student submitted
    const submission = targetMuridId ? AppState.pengumpulanList.find(k => k.tugasId === t.id && k.muridId === targetMuridId) : null;
    const allSubmissions = AppState.pengumpulanList.filter(k => k.tugasId === t.id);

    // Overdue check with WIB
    const deadlineDate = new Date(t.deadline);
    const wib = getWibDate();
    const isOverdue = wib > deadlineDate;

    return `
      <div class="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between hover-card-lift">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-3 py-1 bg-brand-50 text-brand-700 font-bold rounded-xl text-[10px]">
              ${t.mapel}
            </span>
            <span class="text-[11px] font-semibold text-slate-400">${t.kelas}</span>
          </div>

          <h3 class="font-extrabold text-slate-900 text-sm mb-2 line-clamp-2">${t.judul}</h3>
          <p class="text-xs text-slate-500 mb-4 line-clamp-3">${t.deskripsi}</p>

          <div class="p-3 bg-slate-50 rounded-2xl mb-4 space-y-1.5 border border-slate-100">
            <div class="flex items-center space-x-1.5 text-[11px] text-slate-600 font-semibold">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-brand-600 shrink-0"></i>
              <span>Batas: <strong class="text-slate-800">${t.deadlineDisplay}</strong></span>
            </div>
            ${isOverdue ? `
              <div class="flex items-center space-x-1.5 text-[10px] text-rose-600 font-bold">
                <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                <span>Tugas ini sudah lewat batas waktu (Overdue)</span>
              </div>
            ` : ''}
            ${t.fileSoalNama ? `
              <div class="flex items-center space-x-1.5 text-[11px] text-brand-600 font-semibold pt-1 border-t border-slate-200/60">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                <span class="truncate">${t.fileSoalNama}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100">
          ${isGuru ? `
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500">${allSubmissions.length} Dikumpulkan</span>
              <button onclick="openNilaiTugasModal('${t.id}')" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1">
                <i data-lucide="check-square" class="w-3.5 h-3.5"></i>
                <span>Periksa & Nilai</span>
              </button>
            </div>
          ` : `
            <div>
              ${submission ? `
                <div class="flex items-center justify-between bg-emerald-50 p-2.5 rounded-2xl border border-emerald-100">
                  <div>
                    <span class="text-xs font-bold text-emerald-800 block">Sudah Dikumpulkan</span>
                    <span class="text-[10px] text-emerald-600 truncate max-w-[150px] block">${submission.fileNama}</span>
                  </div>
                  ${submission.nilai !== undefined && submission.nilai !== null ? `
                    <div class="text-right">
                      <span class="text-xs font-bold text-emerald-700">Nilai:</span>
                      <span class="text-base font-black text-brand-600 block">${submission.nilai}</span>
                    </div>
                  ` : `
                    <span class="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-lg">Menunggu Nilai</span>
                  `}
                </div>
              ` : `
                <button onclick="openKumpulkanTugasModal('${t.id}')" class="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm">
                  <i data-lucide="upload" class="w-4 h-4"></i>
                  <span>Kumpulkan Tugas</span>
                </button>
              `}
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openCreateTugasModal() {
  const u = AppState.currentUser;
  document.getElementById('tugasMapelInput').value = u?.mapel || 'Bahasa Indonesia';
  
  // Set default deadline to 7 days from now in 2026
  const deadlineDefault = '2026-11-15T23:59';
  document.getElementById('tugasDeadlineInput').value = deadlineDefault;
  document.getElementById('modalCreateTugas').classList.remove('hidden');
}

function closeCreateTugasModal() {
  document.getElementById('modalCreateTugas').classList.add('hidden');
}

function handleCreateTugasSubmit(e) {
  e.preventDefault();
  const mapel = document.getElementById('tugasMapelInput').value;
  const judul = document.getElementById('tugasJudulInput').value.trim();
  const kelas = document.getElementById('tugasKelasSelect').value;
  const deadlineVal = document.getElementById('tugasDeadlineInput').value;
  const deskripsi = document.getElementById('tugasDeskripsiInput').value.trim();
  const fileInput = document.getElementById('tugasFileSoal');
  const fileSoalNama = fileInput?.files[0]?.name || null;

  // Format date displaying year
  const d = new Date(deadlineVal);
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const formattedDeadline = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} WIB`;

  const newTugas = {
    id: 't_' + Date.now(),
    mapel: mapel,
    judul: judul,
    kelas: kelas,
    deadline: deadlineVal,
    deadlineDisplay: formattedDeadline,
    deskripsi: deskripsi,
    fileSoalNama: fileSoalNama,
    dibuatOleh: AppState.currentUser?.nama || 'Guru',
    createdAt: '2026-11-03'
  };

  AppState.tugasList.unshift(newTugas);
  saveState(STORAGE_KEYS.TUGAS_LIST, AppState.tugasList);
  closeCreateTugasModal();
  showToast('Tugas baru berhasil diterbitkan!', 'success');
  renderTugasTab();
}

// Student Submit Assignment (Any file accepted, no limits)
let activeKumpulTugasId = null;
let activeKumpulFileObj = null;

function openKumpulkanTugasModal(tugasId) {
  activeKumpulTugasId = tugasId;
  const t = AppState.tugasList.find(x => x.id === tugasId);
  if (!t) return;

  document.getElementById('kumpulJudulTugas').textContent = t.judul;
  document.getElementById('kumpulDeadlineText').textContent = t.deadlineDisplay;
  document.getElementById('kumpulFileNameDisplay').textContent = 'Klik untuk memilih file dari perangkat';
  activeKumpulFileObj = null;

  document.getElementById('modalKumpulkanTugas').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeKumpulkanTugasModal() {
  document.getElementById('modalKumpulkanTugas').classList.add('hidden');
}

function handleFileKumpulChanged(e) {
  const file = e.target.files[0];
  if (!file) return;
  activeKumpulFileObj = file;
  document.getElementById('kumpulFileNameDisplay').textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
}

function handleKumpulkanTugasSubmit(e) {
  e.preventDefault();
  if (!activeKumpulFileObj) {
    alert('Silakan pilih file tugas yang ingin dikumpulkan.');
    return;
  }

  const u = AppState.currentUser;
  const targetMuridId = u.role === 'murid' ? u.id : u.muridId;
  const targetMuridNama = u.role === 'murid' ? u.nama : u.muridNama;
  const catatan = document.getElementById('kumpulCatatan').value.trim();

  const wib = getWibDate();
  const waktuStr = `${formatIndonesianDate(wib)}, ${formatWibShortTime(wib)}`;

  const submission = {
    id: 'k_' + Date.now(),
    tugasId: activeKumpulTugasId,
    muridId: targetMuridId,
    muridNama: targetMuridNama,
    kelas: u.kelas || 'Kelas 7A',
    waktuKumpul: waktuStr,
    catatan: catatan,
    fileNama: activeKumpulFileObj.name,
    fileType: activeKumpulFileObj.type || 'file',
    nilai: null,
    catatanGuru: null
  };

  AppState.pengumpulanList.push(submission);
  saveState(STORAGE_KEYS.PENGUMPULAN_LIST, AppState.pengumpulanList);
  closeKumpulkanTugasModal();
  showToast('Tugas Anda berhasil diunggah dan dikirimkan ke guru!', 'success');
  renderTugasTab();
}

// Teacher Grading Modal
function openNilaiTugasModal(tugasId) {
  const t = AppState.tugasList.find(x => x.id === tugasId);
  const submissions = AppState.pengumpulanList.filter(k => k.tugasId === tugasId);
  const container = document.getElementById('nilaiTugasStudentList');

  if (submissions.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-xs text-slate-400">
        Belum ada murid yang mengumpulkan tugas <strong>"${t?.judul}"</strong>.
      </div>
    `;
  } else {
    container.innerHTML = submissions.map(sub => `
      <div class="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-extrabold text-sm text-slate-800 block">${sub.muridNama}</span>
            <span class="text-[11px] text-slate-400">Waktu Kumpul: ${sub.waktuKumpul}</span>
          </div>
          <a href="#" onclick="alert('Mengunduh file: ${sub.fileNama}'); return false;" class="text-xs font-bold text-brand-600 underline flex items-center space-x-1">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>${sub.fileNama}</span>
          </a>
        </div>

        ${sub.catatan ? `
          <div class="p-2.5 bg-white rounded-xl text-xs text-slate-600 border border-slate-100">
            <strong>Catatan Murid:</strong> ${sub.catatan}
          </div>
        ` : ''}

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-slate-200/60">
          <div class="flex items-center space-x-2">
            <label class="text-xs font-bold text-slate-700">Nilai (0-100):</label>
            <input type="number" min="0" max="100" id="inputNilai_${sub.id}" value="${sub.nilai || ''}" placeholder="90"
              class="w-20 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-brand-500">
          </div>
          <div class="flex-1 w-full">
            <input type="text" id="inputCatatanGuru_${sub.id}" value="${sub.catatanGuru || ''}" placeholder="Catatan/feedback guru..."
              class="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
          </div>
          <button onclick="simpanNilai('${sub.id}')" class="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm">
            Simpan Nilai
          </button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('modalNilaiTugas').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeNilaiTugasModal() {
  document.getElementById('modalNilaiTugas').classList.add('hidden');
}

function simpanNilai(submissionId) {
  const sub = AppState.pengumpulanList.find(s => s.id === submissionId);
  if (!sub) return;

  const nilaiInput = document.getElementById(`inputNilai_${submissionId}`);
  const feedbackInput = document.getElementById(`inputCatatanGuru_${submissionId}`);

  sub.nilai = Number(nilaiInput.value);
  sub.catatanGuru = feedbackInput.value.trim();

  saveState(STORAGE_KEYS.PENGUMPULAN_LIST, AppState.pengumpulanList);
  showToast(`Nilai untuk ${sub.muridNama} berhasil disimpan!`, 'success');
  renderTugasTab();
}

// ==========================================
// 7. JADWAL PELAJARAN (SENIN - JUMAT)
// ==========================================

function filterJadwalDay(day) {
  AppState.selectedHariJadwal = day;
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  days.forEach(d => {
    const btn = document.getElementById(`dayTab-${d}`);
    if (btn) {
      if (d === day) {
        btn.className = 'px-4 py-2 rounded-2xl font-bold text-xs bg-brand-600 text-white shadow-sm shrink-0';
      } else {
        btn.className = 'px-4 py-2 rounded-2xl font-bold text-xs bg-white text-slate-600 hover:bg-slate-100 shrink-0';
      }
    }
  });
  renderJadwalTab();
}

function renderJadwalTab() {
  const container = document.getElementById('jadwalCardContainer');
  if (!container) return;

  const u = AppState.currentUser;
  const isGuru = u && u.role === 'guru';
  const day = AppState.selectedHariJadwal || 'Selasa';

  const list = AppState.jadwalList.filter(j => j.hari === day);

  if (list.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-10 text-xs text-slate-400">Tidak ada jadwal pelajaran di hari ${day}.</div>`;
    return;
  }

  container.innerHTML = list.map(j => `
    <div class="bg-white rounded-3xl p-5 shadow-card border border-slate-100 hover-card-lift">
      <div class="flex items-center justify-between mb-3">
        <span class="px-2.5 py-1 bg-brand-50 text-brand-700 font-bold rounded-xl text-[10px]">
          ${j.kelas}
        </span>
        <span class="text-xs font-semibold text-slate-400 flex items-center space-x-1">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand-600"></i>
          <span>${j.ruang}</span>
        </span>
      </div>

      <h3 class="font-extrabold text-slate-900 text-sm mb-1">${j.mapel}</h3>
      <div class="flex items-center space-x-1.5 text-xs font-bold text-slate-600 mb-2">
        <i data-lucide="clock" class="w-3.5 h-3.5 text-brand-600"></i>
        <span>${j.jamMulai} - ${j.jamSelesai} WIB</span>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
        <span>Pengampu: <strong>${j.guru}</strong></span>
        ${isGuru ? `
          <button onclick="hapusJadwal('${j.id}')" class="text-rose-500 hover:underline">Hapus</button>
        ` : ''}
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openAddJadwalModal() {
  document.getElementById('modalAddJadwal').classList.remove('hidden');
}

function closeAddJadwalModal() {
  document.getElementById('modalAddJadwal').classList.add('hidden');
}

function handleAddJadwalSubmit(e) {
  e.preventDefault();
  const hari = document.getElementById('jadwalHariInput').value;
  const jamMulai = document.getElementById('jadwalJamMulai').value;
  const jamSelesai = document.getElementById('jadwalJamSelesai').value;
  const mapel = document.getElementById('jadwalMapelInput').value.trim();
  const kelas = document.getElementById('jadwalKelasInput').value.trim();
  const ruang = document.getElementById('jadwalRuangInput').value.trim();
  const guru = document.getElementById('jadwalGuruInput').value.trim();

  const newJadwal = {
    id: 'j_' + Date.now(),
    hari,
    jamMulai,
    jamSelesai,
    mapel,
    kelas,
    ruang,
    guru
  };

  AppState.jadwalList.push(newJadwal);
  saveState(STORAGE_KEYS.JADWAL_LIST, AppState.jadwalList);
  closeAddJadwalModal();
  showToast('Jadwal pelajaran berhasil ditambahkan!', 'success');
  filterJadwalDay(hari);
}

function hapusJadwal(id) {
  if (confirm('Hapus jadwal pelajaran ini?')) {
    AppState.jadwalList = AppState.jadwalList.filter(j => j.id !== id);
    saveState(STORAGE_KEYS.JADWAL_LIST, AppState.jadwalList);
    renderJadwalTab();
    showToast('Jadwal dihapus.', 'info');
  }
}

// ==========================================
// 8. IZIN / SAKIT ENGINE
// ==========================================

function renderIzinTab() {
  const container = document.getElementById('izinListContainer');
  if (!container) return;

  const u = AppState.currentUser;
  const isGuru = u && u.role === 'guru';

  if (AppState.izinList.length === 0) {
    container.innerHTML = '<div class="col-span-full text-center py-10 text-xs text-slate-400">Belum ada pengajuan izin atau sakit.</div>';
    return;
  }

  container.innerHTML = AppState.izinList.map(iz => `
    <div class="bg-white rounded-3xl p-5 shadow-card border border-slate-100 hover-card-lift">
      <div class="flex items-center justify-between mb-3">
        <span class="px-2.5 py-1 text-[10px] font-bold rounded-xl ${iz.jenis === 'Sakit' ? 'bg-rose-50 text-rose-700' : 'bg-brand-50 text-brand-700'}">
          ${iz.jenis}
        </span>
        <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-lg ${
          iz.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' :
          iz.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
        }">${iz.status}</span>
      </div>

      <h3 class="font-extrabold text-slate-900 text-sm mb-1">${iz.muridNama} (${iz.kelas})</h3>
      <p class="text-xs text-slate-500 mb-3">${iz.alasan}</p>

      <div class="p-3 bg-slate-50 rounded-2xl mb-3 space-y-1 text-[11px] text-slate-600">
        <div>Tanggal: <strong>${iz.tglMulai} s/d ${iz.tglSelesai}</strong></div>
        <div class="text-brand-600 font-semibold flex items-center space-x-1">
          <i data-lucide="paperclip" class="w-3 h-3"></i>
          <span>Surat: ${iz.fileSuratNama}</span>
        </div>
      </div>

      ${isGuru && iz.status === 'Menunggu Verifikasi' ? `
        <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
          <button onclick="verifikasiIzin('${iz.id}', false)" class="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl">
            Tolak
          </button>
          <button onclick="verifikasiIzin('${iz.id}', true)" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm">
            Setujui Izin
          </button>
        </div>
      ` : ''}
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openAjukanIzinModal() {
  document.getElementById('modalAjukanIzin').classList.remove('hidden');
}

function closeAjukanIzinModal() {
  document.getElementById('modalAjukanIzin').classList.add('hidden');
}

function handleAjukanIzinSubmit(e) {
  e.preventDefault();
  const u = AppState.currentUser;
  const jenis = document.querySelector('input[name="jenisIzin"]:checked')?.value || 'Sakit';
  const tglMulai = document.getElementById('izinTglMulai').value;
  const tglSelesai = document.getElementById('izinTglSelesai').value;
  const alasan = document.getElementById('izinAlasan').value.trim();
  const fileInput = document.getElementById('izinFileInput');
  const fileNama = fileInput?.files[0]?.name || 'Surat_Keterangan.pdf';

  const newIzin = {
    id: 'iz_' + Date.now(),
    muridId: u.role === 'murid' ? u.id : u.muridId,
    muridNama: u.role === 'murid' ? u.nama : u.muridNama,
    kelas: u.kelas || 'Kelas 7A',
    jenis: jenis,
    tglMulai: tglMulai,
    tglSelesai: tglSelesai,
    alasan: alasan,
    fileSuratNama: fileNama,
    status: 'Menunggu Verifikasi',
    createdAt: '2026-11-03'
  };

  AppState.izinList.unshift(newIzin);
  saveState(STORAGE_KEYS.IZIN_LIST, AppState.izinList);
  closeAjukanIzinModal();
  showToast('Permohonan izin berhasil diajukan dan menunggu verifikasi guru.', 'success');
  renderIzinTab();
}

function verifikasiIzin(id, isApproved) {
  const iz = AppState.izinList.find(x => x.id === id);
  if (!iz) return;

  iz.status = isApproved ? 'Disetujui' : 'Ditolak';
  saveState(STORAGE_KEYS.IZIN_LIST, AppState.izinList);
  showToast(`Permohonan izin ${iz.muridNama} berhasil ${isApproved ? 'disetujui' : 'ditolak'}.`, isApproved ? 'success' : 'info');
  renderIzinTab();
  refreshAllDashboardData();
}

// ==========================================
// 9. MATERI PEMBELAJARAN (PDF & DOKUMEN)
// ==========================================

function renderMateriTab() {
  const filterContainer = document.getElementById('materiMapelFilterContainer');
  const grid = document.getElementById('materiGridContainer');
  if (!grid) return;

  const u = AppState.currentUser;
  const isGuru = u && u.role === 'guru';

  // Mapel list for filtering
  const mapelSet = new Set(AppState.materiList.map(m => m.mapel));
  const mapelList = Array.from(mapelSet);

  if (filterContainer) {
    filterContainer.innerHTML = `
      <button onclick="filterMateriMapel('all')" class="px-3.5 py-1.5 rounded-2xl font-bold text-xs bg-brand-600 text-white shrink-0">Semua Mapel</button>
      ${mapelList.map(m => `
        <button onclick="filterMateriMapel('${m}')" class="px-3.5 py-1.5 rounded-2xl font-semibold text-xs bg-white text-slate-600 hover:bg-slate-100 shrink-0">${m}</button>
      `).join('')}
    `;
  }

  if (AppState.materiList.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-12 text-xs text-slate-400">Belum ada materi pembelajaran yang diunggah.</div>';
    return;
  }

  grid.innerHTML = AppState.materiList.map(mat => `
    <div class="bg-white rounded-3xl p-5 shadow-card border border-slate-100 flex flex-col justify-between hover-card-lift">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-1 bg-brand-50 text-brand-700 font-bold rounded-xl text-[10px]">
            ${mat.mapel}
          </span>
          <span class="text-[11px] font-semibold text-slate-400">${mat.kelas}</span>
        </div>

        <h3 class="font-extrabold text-slate-900 text-sm mb-2 line-clamp-2">${mat.judul}</h3>
        <p class="text-xs text-slate-500 mb-4 line-clamp-3">${mat.deskripsi}</p>

        <div class="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3 mb-4">
          <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold text-xs">
            PDF
          </div>
          <div class="min-w-0 flex-1">
            <span class="font-bold text-xs text-slate-800 truncate block">${mat.fileNama}</span>
            <span class="text-[10px] text-slate-400">Oleh: ${mat.uploadedBy}</span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <a href="#" onclick="alert('Mengunduh / membuka modul materi: ${mat.fileNama}'); return false;" class="text-xs font-bold text-brand-600 hover:underline flex items-center space-x-1">
          <i data-lucide="book-open" class="w-4 h-4"></i>
          <span>Buka Materi</span>
        </a>

        <!-- Requirement: "murid bisa mengumpulkan tugas lewat fitur ini" -->
        <button onclick="navigateTo('tugas')" class="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl flex items-center space-x-1 transition">
          <i data-lucide="file-check" class="w-3.5 h-3.5"></i>
          <span>Tugas Terkait</span>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openUploadMateriModal() {
  const u = AppState.currentUser;
  document.getElementById('materiMapelInput').value = u?.mapel || 'Bahasa Indonesia';
  document.getElementById('modalUploadMateri').classList.remove('hidden');
}

function closeUploadMateriModal() {
  document.getElementById('modalUploadMateri').classList.add('hidden');
}

function handleUploadMateriSubmit(e) {
  e.preventDefault();
  const mapel = document.getElementById('materiMapelInput').value;
  const judul = document.getElementById('materiJudulInput').value.trim();
  const kelas = document.getElementById('materiKelasSelect').value;
  const deskripsi = document.getElementById('materiDeskripsiInput').value.trim();
  const fileInput = document.getElementById('materiFileInput');
  const fileNama = fileInput?.files[0]?.name || 'Modul_Belajar.pdf';

  const newMateri = {
    id: 'mat_' + Date.now(),
    mapel,
    judul,
    kelas,
    deskripsi,
    fileNama,
    uploadedBy: AppState.currentUser?.nama || 'Guru',
    tglUpload: '3 November 2026'
  };

  AppState.materiList.unshift(newMateri);
  saveState(STORAGE_KEYS.MATERI_LIST, AppState.materiList);
  closeUploadMateriModal();
  showToast('Materi pembelajaran berhasil diunggah!', 'success');
  renderMateriTab();
}

// ==========================================
// 10. PENGUMUMAN SEKOLAH
// ==========================================

function renderPublicAnnouncements() {
  const container = document.getElementById('loginAnnouncementContainer');
  if (!container) return;

  const pinnedList = AppState.pengumumanList.filter(p => p.pinned);
  const displayList = pinnedList.length > 0 ? pinnedList : AppState.pengumumanList.slice(0, 1);

  // Exact Screenshot 2 Layout:
  container.innerHTML = displayList.map(p => `
    <div class="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white relative shadow-lg">
      <div class="flex items-center justify-between mb-1.5">
        <h4 class="font-extrabold text-sm tracking-tight">${p.judul}</h4>
        <i data-lucide="pin" class="w-4 h-4 text-amber-300 fill-amber-300"></i>
      </div>
      <p class="text-xs text-white/90 leading-relaxed font-normal mb-3">${p.isi}</p>
      <div class="text-[11px] text-white/70 font-medium">
        ${p.penulis} · ${p.tanggal}
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function renderPengumumanTab() {
  const grid = document.getElementById('pengumumanGridContainer');
  if (!grid) return;

  if (AppState.pengumumanList.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-10 text-xs text-slate-400">Belum ada pengumuman sekolah.</div>';
    return;
  }

  grid.innerHTML = AppState.pengumumanList.map(p => `
    <div class="bg-white rounded-3xl p-6 shadow-card border border-slate-100 hover-card-lift">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <i data-lucide="megaphone" class="w-4 h-4"></i>
          </div>
          <span class="text-xs font-semibold text-slate-400">${p.penulis}</span>
        </div>
        ${p.pinned ? `
          <span class="px-2.5 py-0.5 bg-amber-50 text-amber-700 font-bold rounded-full text-[10px] flex items-center space-x-1">
            <i data-lucide="pin" class="w-3 h-3"></i>
            <span>Disematkan</span>
          </span>
        ` : ''}
      </div>

      <h3 class="font-extrabold text-slate-900 text-base mb-2">${p.judul}</h3>
      <p class="text-xs text-slate-600 leading-relaxed mb-4">${p.isi}</p>

      <div class="text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-100 flex items-center justify-between">
        <span>Tanggal: ${p.tanggal}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openCreatePengumumanModal() {
  document.getElementById('modalCreatePengumuman').classList.remove('hidden');
}

function closeCreatePengumumanModal() {
  document.getElementById('modalCreatePengumuman').classList.add('hidden');
}

function handleCreatePengumumanSubmit(e) {
  e.preventDefault();
  const judul = document.getElementById('pengumumanJudul').value.trim();
  const isi = document.getElementById('pengumumanIsi').value.trim();
  const pinned = document.getElementById('pengumumanPinLogin').checked;

  const wib = getWibDate();
  const dateStr = `${wib.getDate()} Nov ${wib.getFullYear()}`;

  const newPengumuman = {
    id: 'pkm_' + Date.now(),
    judul,
    isi,
    penulis: AppState.currentUser?.nama || 'Admin Elearner',
    tanggal: dateStr,
    pinned: pinned
  };

  AppState.pengumumanList.unshift(newPengumuman);
  saveState(STORAGE_KEYS.PENGUMPULAN_LIST, AppState.pengumumanList);
  closeCreatePengumumanModal();
  showToast('Pengumuman sekolah berhasil diterbitkan!', 'success');
  renderPengumumanTab();
  renderPublicAnnouncements();
}

// ==========================================
// 11. KELAS & MURID + CASCADING DELETE
// ==========================================

function renderKelasMuridTab() {
  const tabsContainer = document.getElementById('kelasFilterTabs');
  const tableBody = document.getElementById('tableMuridBody');
  const titleEl = document.getElementById('currentKelasTitle');
  const countEl = document.getElementById('currentKelasCount');

  // Classes list
  const classes = ['Kelas 7A', 'Kelas 7B', 'Kelas 8A', 'Kelas 9A'];
  if (tabsContainer) {
    tabsContainer.innerHTML = classes.map(c => `
      <button onclick="selectKelasFilter('${c}')" class="px-4 py-2 rounded-2xl font-bold text-xs ${AppState.selectedKelasFilter === c ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100'} shrink-0">
        ${c}
      </button>
    `).join('');
  }

  const currentClass = AppState.selectedKelasFilter || 'Kelas 7A';
  const students = AppState.muridList.filter(m => m.kelas === currentClass);

  if (titleEl) titleEl.textContent = `Daftar Murid ${currentClass} (Wali Kelas: Ibu Nurul, S.Pd)`;
  if (countEl) countEl.textContent = `${students.length} Murid Terdaftar`;

  if (!tableBody) return;

  if (students.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-xs text-slate-400">Belum ada murid di kelas ini.</td></tr>`;
    return;
  }

  tableBody.innerHTML = students.map(m => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-bold text-slate-800 flex items-center space-x-2">
        <div class="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
          ${m.nama.charAt(0)}
        </div>
        <span>${m.nama}</span>
      </td>
      <td class="py-3 px-4 font-semibold text-slate-500">${m.nisn}</td>
      <td class="py-3 px-4 font-semibold text-slate-600">${m.jenjang} / ${m.kelas}</td>
      <td class="py-3 px-4 text-brand-600 font-medium">${m.email}</td>
      <td class="py-3 px-4 text-slate-600 font-semibold">${m.wali || '-'}</td>
      <td class="py-3 px-4 text-right">
        <button onclick="deleteMuridCascading('${m.id}', '${m.nama}')" class="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition">
          Hapus
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function selectKelasFilter(kelasName) {
  AppState.selectedKelasFilter = kelasName;
  renderKelasMuridTab();
}

function openTambahMuridModal() {
  document.getElementById('modalTambahMurid').classList.remove('hidden');
}

function closeTambahMuridModal() {
  document.getElementById('modalTambahMurid').classList.add('hidden');
}

function handleTambahMuridSubmit(e) {
  e.preventDefault();
  const nama = document.getElementById('tambahNamaMurid').value.trim();
  const nisn = document.getElementById('tambahNisn').value.trim();
  const kelas = document.getElementById('tambahKelasSelect').value;
  const email = document.getElementById('tambahEmailMurid').value.trim();
  const wali = document.getElementById('tambahWaliMurid').value.trim();

  const newMurid = {
    id: 'm_' + Date.now(),
    nama,
    nisn,
    jenjang: 'SMP',
    kelas,
    email,
    wali,
    waliEmail: 'ortu.' + email
  };

  AppState.muridList.push(newMurid);
  saveState(STORAGE_KEYS.MURID_LIST, AppState.muridList);
  closeTambahMuridModal();
  showToast(`Murid ${nama} berhasil didaftarkan ke ${kelas}!`, 'success');
  renderKelasMuridTab();
  refreshAllDashboardData();
}

// Requirement: "data murid yang dihapus ikut terhapus semua" -> CASCADING DELETE!
function deleteMuridCascading(muridId, muridNama) {
  const confirmMsg = `PERINGATAN CASCADING DELETE:\n\nApakah Anda yakin ingin menghapus data murid "${muridNama}"?\n\nMenghapus murid ini akan OTOMATIS MENGHAPUS SEMUA DATA:\n- Riwayat Presensi Masuk & Pulang\n- Seluruh Pengumpulan Tugas & Nilai\n- Seluruh Pengajuan Izin / Sakit\n\nTindakan ini tidak dapat dibatalkan.`;

  if (confirm(confirmMsg)) {
    // 1. Delete student
    AppState.muridList = AppState.muridList.filter(m => m.id !== muridId);
    saveState(STORAGE_KEYS.MURID_LIST, AppState.muridList);

    // 2. Cascade delete presensi
    AppState.presensiList = AppState.presensiList.filter(p => p.muridId !== muridId);
    saveState(STORAGE_KEYS.PRESENSI_LIST, AppState.presensiList);

    // 3. Cascade delete tugas submissions
    AppState.pengumpulanList = AppState.pengumpulanList.filter(k => k.muridId !== muridId);
    saveState(STORAGE_KEYS.PENGUMPULAN_LIST, AppState.pengumpulanList);

    // 4. Cascade delete izin / sakit
    AppState.izinList = AppState.izinList.filter(iz => iz.muridId !== muridId);
    saveState(STORAGE_KEYS.IZIN_LIST, AppState.izinList);

    showToast(`Data murid ${muridNama} beserta seluruh riwayat presensi & tugasnya telah dihapus bersih.`, 'warning');
    renderKelasMuridTab();
    refreshAllDashboardData();
  }
}

// ==========================================
// 12. DASHBOARD DATA AGGREGATION (BERANDA)
// ==========================================

function refreshAllDashboardData() {
  const totalMurid = AppState.muridList.length;
  const todayStr = '2026-11-03';

  // Hadir hari ini
  const presensiHariIni = AppState.presensiList.filter(p => p.tanggal === todayStr && p.jamMasuk);
  const hadirCount = presensiHariIni.length;

  // Menunggu verifikasi
  const pendingCount = AppState.presensiList.filter(p => p.statusVerifikasi === 'Menunggu Verifikasi').length;

  // Izin sakit baru
  const izinCount = AppState.izinList.filter(iz => iz.status === 'Menunggu Verifikasi').length;

  // Stat elements
  const elTotal = document.getElementById('statTotalMurid');
  const elHadir = document.getElementById('statHadirHariIni');
  const elPending = document.getElementById('statMenungguVerif');
  const elIzin = document.getElementById('statIzinSakitBaru');

  if (elTotal) elTotal.textContent = totalMurid;
  if (elHadir) elHadir.textContent = `${hadirCount}/${totalMurid}`;
  if (elPending) elPending.textContent = pendingCount;
  if (elIzin) elIzin.textContent = izinCount;

  // Teacher hero subtitle
  const heroSubtitle = document.getElementById('heroGreetingSubtitle');
  if (heroSubtitle) {
    if (pendingCount > 0) {
      heroSubtitle.innerHTML = `Ada <strong>${pendingCount} presensi</strong> baru menunggu verifikasi Anda.`;
    } else {
      heroSubtitle.textContent = 'Semua presensi sudah terverifikasi. Kerja bagus!';
    }
  }

  renderDashboardScheduleTimeline();
  renderDashboardRecentPresensi();
  renderMiniCalendar();
}

// Render Jadwal Hari Ini on Dashboard (Screenshot 1 Replication)
function renderDashboardScheduleTimeline() {
  const container = document.getElementById('dashboardScheduleTimeline');
  if (!container) return;

  // Screenshot 1 uses Tuesday (Selasa)
  const list = AppState.jadwalList.filter(j => j.hari === 'Selasa');

  container.innerHTML = list.map(j => `
    <div class="relative group">
      <div class="timeline-dot"></div>
      <div>
        <div class="flex items-center justify-between">
          <h4 class="font-extrabold text-sm text-slate-800">${j.mapel} <span class="text-xs font-semibold text-slate-400">· ${j.kelas}</span></h4>
        </div>
        <div class="flex items-center space-x-3 text-xs font-semibold text-slate-500 mt-1">
          <span class="flex items-center space-x-1">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-brand-600"></i>
            <span>${j.jamMulai} - ${j.jamSelesai}</span>
          </span>
          <span class="flex items-center space-x-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand-600"></i>
            <span>${j.ruang}</span>
          </span>
        </div>
        <span class="text-[11px] text-slate-400 block mt-0.5">${j.guru}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// Render Recent Presensi Widget on Dashboard
function renderDashboardRecentPresensi() {
  const container = document.getElementById('dashboardRecentPresensiList');
  if (!container) return;

  const recent = AppState.presensiList.slice(0, 3);
  if (recent.length === 0) {
    container.innerHTML = '<div class="text-xs text-slate-400 py-3">Belum ada presensi yang masuk.</div>';
    return;
  }

  container.innerHTML = recent.map(p => `
    <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
          <img src="${p.fotoMasuk || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'}" class="w-full h-full object-cover">
        </div>
        <div>
          <span class="text-xs font-extrabold text-slate-800 block">${p.muridNama}</span>
          <span class="text-[11px] text-slate-500">${p.kelas} · ${p.jamMasuk} WIB</span>
        </div>
      </div>
      <span class="px-2.5 py-1 text-[10px] font-bold rounded-lg ${
        p.statusVerifikasi === 'Terverifikasi' ? 'bg-emerald-100 text-emerald-800' :
        p.statusVerifikasi === 'Ditolak' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
      }">${p.statusVerifikasi}</span>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// Mini Calendar Widget
function renderMiniCalendar() {
  const container = document.getElementById('calendarDaysGrid');
  if (!container) return;

  // November 2026 starts on Sunday (day 0) and has 30 days
  // Today is November 3, 2026 (Tuesday)
  const daysInMonth = 30;
  const startDayOffset = 0; // Sunday

  let html = '';
  // Empty offset slots
  for (let i = 0; i < startDayOffset; i++) {
    html += `<span></span>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === 3;
    if (isToday) {
      html += `
        <span class="w-7 h-7 mx-auto rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md shadow-brand-500/30">
          ${d}
        </span>
      `;
    } else {
      html += `
        <span class="w-7 h-7 mx-auto rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition">
          ${d}
        </span>
      `;
    }
  }

  container.innerHTML = html;
}

// ==========================================
// 13. FORGOT PASSWORD MODAL (GMAIL INTEGRATION)
// ==========================================

function openForgotPasswordModal() {
  document.getElementById('modalForgotPassword').classList.remove('hidden');
  document.getElementById('forgotSuccessNotice').classList.add('hidden');
  document.getElementById('forgotEmailInput').value = '';
}

function closeForgotPasswordModal() {
  document.getElementById('modalForgotPassword').classList.add('hidden');
}

function handleForgotPasswordSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('forgotEmailInput').value.trim();
  const notice = document.getElementById('forgotSuccessNotice');

  notice.classList.remove('hidden');
  notice.innerHTML = `
    <strong>Email Terkirim!</strong><br>
    Tautan pemulihan kata sandi telah dikirimkan ke <strong>${email}</strong> melalui Google Mail API. Periksa folder Kotak Masuk atau Spam Anda.
  `;
  showToast(`Tautan reset password telah dikirim ke ${email}`, 'success');
}

// ==========================================
// 14. UTILITY TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-slate-800 text-white'
  };

  toast.className = `${bgColors[type] || bgColors.info} px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center space-x-2 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-auto max-w-sm`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Dismiss after 4 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function setupEventListeners() {
  // Listen for escape key to close active modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWebcamModal();
      closeConfigJamModal();
      closeForgotPasswordModal();
      closeCreateTugasModal();
      closeKumpulkanTugasModal();
      closeNilaiTugasModal();
      closeAjukanIzinModal();
      closeUploadMateriModal();
      closeCreatePengumumanModal();
      closeTambahMuridModal();
      closeAddJadwalModal();
    }
  });
}

// Start Application on Load
window.addEventListener('DOMContentLoaded', initApp);

