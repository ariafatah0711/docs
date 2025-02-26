---
sidebar_position: 1
---

# Daftar Perintah Dasar Linux

## 📂 Manajemen File dan Direktori
- **ls**: Menampilkan daftar file dan direktori.
- **cd**: Mengubah direktori.
- **pwd**: Menampilkan direktori saat ini.
- **mkdir**: Membuat direktori baru.
- **rm**: Menghapus file atau direktori.
- **cp**: Menyalin file atau direktori.
- **mv**: Memindahkan atau mengganti nama file.
- **touch**: Membuat file kosong.
- **tree**: Menampilkan struktur direktori.
- **rmdir**: Menghapus direktori kosong.
- **stat**: Menampilkan detail informasi file atau direktori.
- **basename**: Menampilkan nama file dari path.
- **dirname**: Menampilkan nama direktori dari path.
- **ln**: Membuat link simbolik atau hard link.
- **chattr**: Mengubah atribut file.
- **lsattr**: Menampilkan atribut file.

## 📝 Melihat dan Mengedit File
- **cat**: Menampilkan isi file.
- **less / more**: Melihat file halaman per halaman.
- **head**: Menampilkan 10 baris pertama file.
- **tail**: Menampilkan 10 baris terakhir file.
- **nano**: Editor teks sederhana.
- **vi / vim**: Editor teks tingkat lanjut.
- **sed**: Mengedit teks dalam file secara langsung.
- **awk**: Pemrosesan teks berbasis pola.
- **diff**: Membandingkan dua file.
- **cmp**: Membandingkan isi dua file secara biner.
- **cut**: Memotong teks dari file.
- **sort**: Mengurutkan isi file.
- **uniq**: Menampilkan baris unik dari file.
- **tee**: Menyimpan output perintah ke file sambil tetap menampilkan ke layar.
- **wc**: Menghitung jumlah baris, kata, dan byte dalam file.
- **xxd**: Menampilkan isi file dalam format heksadesimal.

## 🔎 Operasi Pencarian
- **find**: Mencari file dan direktori.
- **grep**: Mencari teks dalam file.
- **locate**: Mencari file dengan basis data.
- **which**: Menampilkan lokasi perintah.
- **whereis**: Menampilkan lokasi biner, source, dan manual suatu perintah.
- **updatedb**: Memperbarui basis data `locate`.
- **ack**: Alat pencarian teks yang lebih cepat dari `grep`.
- **ag (The Silver Searcher)**: Alat pencarian teks yang cepat.

## 💾 Manajemen Disk dan Sistem Berkas
- **df**: Menampilkan penggunaan ruang disk.
- **du**: Menampilkan ukuran direktori atau file.
- **mount / umount**: Memasang atau melepas sistem berkas.
- **lsblk**: Menampilkan daftar perangkat blok.
- **fsck**: Memeriksa dan memperbaiki sistem berkas.
- **mkfs**: Membuat sistem berkas baru.
- **blkid**: Menampilkan UUID dan tipe sistem file dari partisi.
- **tune2fs**: Mengubah parameter sistem file ext2/3/4.
- **parted**: Alat untuk mempartisi disk.
- **fdisk**: Alat untuk mempartisi disk (lebih tua).
- **e2fsck**: Memeriksa dan memperbaiki sistem file ext2/3/4.

## 🖥️ Monitoring Proses dan Sistem
- **ps**: Menampilkan proses yang berjalan.
- **top**: Memantau proses sistem.
- **htop**: Pengelola proses interaktif.
- **kill**: Menghentikan proses.
- **pkill**: Menghentikan proses berdasarkan nama.
- **uptime**: Menampilkan waktu aktif sistem.
- **free**: Menampilkan penggunaan memori.
- **vmstat**: Menampilkan statistik penggunaan memori dan CPU.
- **iostat**: Menampilkan statistik performa disk.
- **sar**: Menganalisis performa sistem secara historis.
- **lsof**: Menampilkan daftar file yang sedang digunakan oleh proses.
- **strace**: Melacak panggilan sistem dan sinyal.
- **ltrace**: Melacak panggilan library.

## 🌐 Perintah Jaringan
- **ping**: Mengecek konektivitas.
- **curl**: Transfer data ke/dari server.
- **wget**: Mengunduh file dari internet.
- **ifconfig / ip**: Melihat atau mengonfigurasi antarmuka jaringan.
- **netstat**: Menampilkan statistik jaringan.
- **ss**: Menampilkan informasi koneksi jaringan.
- **traceroute**: Menampilkan rute paket ke host tujuan.
- **mtr**: Kombinasi `ping` dan `traceroute`.
- **nslookup / dig**: Mengecek informasi DNS.
- **whois**: Mendapatkan informasi domain atau IP.
- **scp**: Menyalin file dengan aman antar sistem.
- **rsync**: Menyalin file dan direktori dengan sinkronisasi.
- **ssh**: Menghubungkan ke sistem remote secara aman.
- **nc (netcat)**: Alat jaringan serbaguna.
- **tcpdump**: Menganalisis lalu lintas jaringan.

## 🔐 Izin dan Kepemilikan
- **chmod**: Mengubah izin file.
- **chown**: Mengubah pemilik atau grup file.
- **chgrp**: Mengubah grup file.
- **umask**: Mengatur izin file default.
- **getfacl / setfacl**: Mengelola izin akses tingkat lanjut (ACL).
- **passwd**: Mengubah kata sandi pengguna.
- **su**: Beralih ke pengguna lain.
- **sudo**: Menjalankan perintah sebagai superuser.

## 📦 Arsip dan Kompresi
- **tar**: Mengarsipkan dan mengompresi file.
- **gzip/gunzip**: Mengompresi dan mengekstrak file.
- **bzip2/bunzip2**: Menggunakan kompresi berbasis bzip.
- **xz/unxz**: Menggunakan kompresi berbasis xz.
- **zip/unzip**: Menangani file ZIP.
- **7z**: Mengompresi file menggunakan 7-Zip.
- **rar/unrar**: Menangani file RAR.
- **zcat/zmore/zless**: Melihat file yang dikompresi dengan gzip.

## 🛠️ Informasi Sistem
- **uname -a**: Menampilkan informasi sistem.
- **hostname**: Menampilkan nama host sistem.
- **whoami**: Menampilkan pengguna saat ini.
- **id**: Menampilkan ID pengguna dan grup.
- **dmesg**: Menampilkan log kernel.
- **lscpu**: Menampilkan informasi arsitektur CPU.
- **lsusb**: Menampilkan perangkat USB.
- **lspci**: Menampilkan perangkat PCI.
- **uptime**: Menampilkan lama waktu sistem berjalan.
- **history**: Menampilkan riwayat perintah yang telah digunakan.
- **alias**: Membuat alias perintah.
- **unalias**: Menghapus alias perintah.
- **date**: Menampilkan atau mengatur tanggal dan waktu sistem.
- **cal**: Menampilkan kalender.
- **timedatectl**: Mengelola waktu dan tanggal sistem.

## 🛠️ Manajemen Paket
- **apt / apt-get**: Manajemen paket untuk Debian/Ubuntu.
- **yum / dnf**: Manajemen paket untuk RedHat/CentOS.
- **pacman**: Manajemen paket untuk Arch Linux.
- **zypper**: Manajemen paket untuk openSUSE.
- **snap**: Manajemen paket berbasis snap.
- **flatpak**: Manajemen paket berbasis Flatpak.
- **dpkg**: Manajemen paket tingkat rendah untuk Debian/Ubuntu.
- **rpm**: Manajemen paket tingkat rendah untuk RedHat/CentOS.

## 🛠️ Lain-lain
- **man**: Menampilkan manual perintah.
- **info**: Menampilkan informasi perintah (lebih detail dari `man`).
- **whatis**: Menampilkan deskripsi singkat perintah.
- **apropos**: Mencari perintah berdasarkan kata kunci.
- **cron**: Menjadwalkan tugas secara berkala.
- **at**: Menjadwalkan tugas satu kali.
- **watch**: Menjalankan perintah secara berkala dan menampilkan output.
- **screen**: Membuat sesi terminal yang dapat dipisahkan.
- **tmux**: Terminal multiplexer yang lebih canggih dari `screen`.

Dokumentasi ini mencakup berbagai aspek perintah dasar Linux yang penting untuk pengguna sehari-hari maupun administrator sistem. Jika ada perintah lain yang ingin ditambahkan, silakan beri tahu!