# Elearner.id - Portal Belajar Mengajar & Administrasi Guru

Aplikasi web modern, responsif (Mobile HP & Laptop), dan ramah pengguna yang dirancang khusus untuk memenuhi kebutuhan belajar mengajar serta administrasi Guru di sekolah untuk semua jenjang (SD, SMP, SMA, SMK).

---

## 📸 Desain & Tampilan (Sesuai Screenshot Referensi)

1. **Dashboard Laptop Guru (Screenshot 1)**:
   - Sidebar navigasi melengkung warna biru khas Elearner.id (Beranda, Presensi, Tugas, Jadwal, Izin/Sakit, Materi Belajar, Pengumuman, Kelas & Murid, Keluar).
   - Banner sambutan guru *"Halo, Muhammad! Semua presensi sudah terverifikasi. Kerja bagus!"* lengkap dengan maskot visual 3D dan tautan cepat *Verifikasi presensi*.
   - 4 Kartu Statistik Ringkasan: **Total murid (3)**, **Hadir hari ini (1/3)**, **Menunggu verifikasi (0)**, dan **Izin/sakit baru (0)**.
   - Grafik Kehadiran 7 Hari Terakhir & Widget Presensi Terbaru.
   - Timeline **Jadwal Hari Ini** (Bahasa Indonesia, IPA, Bahasa Inggris, Matematika Kelas 7A).

2. **Halaman Login Mobile (Screenshot 2)**:
   - Header bertuliskan: *"Selamat datang di Elearner.id"*, *"silahkan masuk sesuai peran anda"*.
   - Segmented Role Selector: **Murid** | **Guru** | **Wali Murid**.
   - Input Nama lengkap, pilihan jenjang & kelas fleksibel, NISN, serta akun Gmail.
   - Kartu Pengumuman Sekolah tersemat (pinned) di bagian bawah.

3. **Halaman Presensi Mobile (Screenshot 3)**:
   - Header profil murid (Budi Santoso - Kelas 7A).
   - Kartu **Presensi Masuk** (Target Jam 07:00 WIB) dengan tombol *"📷 Selfie masuk"*.
   - Kartu **Presensi Pulang** (Target Jam 14:00 WIB) dengan tombol terkunci *"📷 Presensi masuk dulu"*, yang baru aktif setelah presensi masuk disubmit.
   - Catatan panduan kamera HP dan riwayat presensi harian.
   - **Bottom Navigation Bar** di HP: Beranda, Presensi, Tugas, Jadwal, Lainnya.

---

## ✨ Fitur Lengkap Sesuai Permintaan

### 👨‍🏫 Fitur untuk Guru:
1. **Login Guru Terverifikasi**:
   - Wajib menggunakan akun **Belajar ID** (`@guru.smp.belajar.id`, dll) atau email resmi sekolah (`@*.sch.id`).
   - Fitur **Lupa Password** terintegrasi kirim link reset ke Gmail.
   - Guru wajib memilih mata pelajaran yang diampu (misal: *Bahasa Indonesia, Matematika, IPA, dll*), yang otomatis terhubung ke materi & tugas murid.
2. **Presensi Masuk & Pulang**:
   - Berbasis **Zona Waktu WIB (UTC+7)** secara real-time.
   - **Verifikasi Guru**: Guru wajib memeriksa dan memverifikasi selfie murid agar tidak ada kecurangan (status: *Menunggu Verifikasi* ➔ *Terverifikasi* / *Ditolak*).
   - **Pengaturan Jam Masuk & Pulang**: Hanya guru yang dapat mengakses dan mengatur jam masuk (default 07:00 WIB) dan jam pulang (default 14:00 WIB).
3. **Manajemen Tugas**:
   - Guru dapat menerbitkan tugas dengan deskripsi dan lampiran.
   - Batas pengumpulan tugas (**deadline**) menampilkan tahun (misal: *15 November 2026, 23:59 WIB*).
   - Guru dapat memeriksa kiriman tugas dan memberikan nilai langsung (0-100) serta feedback yang langsung muncul di akun murid.
4. **Jadwal Pelajaran**:
   - Guru dapat mengatur dan menambah jadwal Senin hingga Jumat.
5. **Verifikasi Izin / Sakit**:
   - Memverifikasi surat keterangan izin atau sakit yang diajukan murid.
6. **Pengumuman Sekolah**:
   - Guru dapat membuat pengumuman yang otomatis muncul di halaman login publik dan di beranda murid.
7. **Halaman Kelas & Murid (Cascading Delete)**:
   - Mengelola kelas, wali kelas, dan murid.
   - **Cascading Delete**: Jika data murid dihapus oleh guru, seluruh riwayat presensi, tugas, nilai, dan izin murid tersebut akan otomatis terhapus bersih dari sistem.
8. **Materi Pembelajaran (PDF)**:
   - Guru mengunggah modul materi PDF per mata pelajaran.
9. **Dashboard Guru per Mata Pelajaran**:
   - Menampilkan total murid, kehadiran, jumlah terlambat, dan menu cepat kelola materi/tugas mapel tersebut.

---

### 👨‍🎓 Fitur untuk Murid & Wali Murid:
1. **Login Murid & Wali**:
   - Murid login dengan akun Gmail & NISN / Nama.
   - Pilihan jenjang sekolah: **SD, SMP, SMA, SMK** beserta pemilihan kelas.
   - Wali Murid login menggunakan Gmail dan nama peserta didik yang terdaftar.
   - Fitur Lupa Password ke Gmail terdaftar.
2. **Presensi Selfie Kamera HP & Laptop**:
   - Pada HP: Otomatis membuka aplikasi kamera native HP (`capture="user"`), sehingga tidak akan terblokir oleh browser.
   - Pada Laptop Windows: Tersedia akses kamera webcam langsung atau upload foto.
   - Foto selfie disimpan dan otomatis dibuatkan link Google Drive di database.
   - Tombol *"Selfie Pulang"* otomatis terkunci sampai presensi masuk dilakukan.
3. **Pengumpulan Tugas Tanpa Batas**:
   - Murid dapat mengumpulkan tugas dengan upload file apapun (**tanpa batasan ekstensi & ukuran file**: PDF, DOCX, ZIP, JPG, PNG, XLS, MP4, dll).
4. **Jadwal Pelajaran**:
   - Tampilan jadwal Senin sampai Jumat.
5. **Pengajuan Sakit / Izin**:
   - Mengajukan sakit/izin wajib dengan melampirkan file surat dokter / surat orang tua.
6. **Dashboard Murid**:
   - Timeline tugas aktif dan indikator overdue dengan tahun.
   - Kalender akademik bulan berjalan.
   - Akses materi pelajaran PDF dan tugas terkait.

---

## 🚀 Cara Menjalankan Aplikasi

1. **Buka Langsung di Browser**:
   - Cukup klik dua kali file **`buka_elearner.bat`**, atau
   - Buka langsung file **`index.html`** di Google Chrome, Microsoft Edge, atau browser smartphone Anda.
2. **Beralih Tampilan Laptop & HP**:
   - Di pojok kanan atas terdapat tombol **"💻 Tampilan Laptop"** dan **"📱 Simulasi HP"** untuk mempermudah guru dan pengguna laptop menguji tampilan dalam wujud smartphone nyata (frame iPhone/Android).
3. **Akun Uji Coba Cepat (Pre-loaded Demo)**:
   - **Guru**:
     - Nama: `Muhammad Alfathih, S.Pd`
     - Email: `alfathih@guru.smp.belajar.id`
     - Mapel: `Bahasa Indonesia`
   - **Murid**:
     - Nama: `Budi Santoso`
     - Jenjang/Kelas: `SMP` / `Kelas 7A`
     - NISN: `0084729103`
     - Email: `budi.santoso@gmail.com`
   - **Wali Murid**:
     - Nama: `Santoso Pratama`
     - Nama Murid: `Budi Santoso`
     - Email: `santoso.wali@gmail.com`

