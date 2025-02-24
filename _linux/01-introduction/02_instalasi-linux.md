---
sidebar_position: 2
---

# Instalasi Linux

Linux dapat diinstal di berbagai lingkungan, termasuk **bare metal** (langsung ke hardware), **virtual machine (VM)**, dan **Windows Subsystem for Linux (WSL)**. Berikut adalah panduan lengkap untuk masing-masing metode.

---
## 1. Instalasi Linux di Bare Metal
Instalasi **bare metal** berarti menginstal Linux langsung ke perangkat keras tanpa perantara seperti VM atau sistem operasi lain.

### 1.1 Persiapan Instalasi
- **Unduh ISO Linux**: Kunjungi situs resmi distro yang diinginkan, misalnya:
  - Ubuntu: [https://ubuntu.com/download](https://ubuntu.com/download)
  - Debian: [https://www.debian.org/download](https://www.debian.org/download)
  - Arch Linux: [https://archlinux.org/download](https://archlinux.org/download)
- **Buat Bootable USB**:
  - Windows: Gunakan [Rufus](https://rufus.ie/)
  - Linux: Gunakan `dd` atau `balenaEtcher`
  - macOS: Gunakan `dd` atau `Etcher`
- **Persiapkan Partisi (Opsional)**:
  - Jika ingin dual-boot dengan Windows, siapkan partisi kosong melalui **Disk Management** di Windows.
  
### 1.2 Proses Instalasi
1. **Boot dari USB**: Masuk ke BIOS/UEFI dan ubah boot order agar USB menjadi prioritas pertama.
2. **Jalankan Installer**: Pilih opsi **Install Linux**.
3. **Pilih Bahasa dan Zona Waktu**.
4. **Partisi Disk**:
   - **Otomatis**: Biarkan sistem membuat partisi sendiri.
   - **Manual**: Buat partisi seperti berikut:
     - `/boot` (512MB)
     - `/` (20GB atau lebih)
     - `swap` (sesuai kebutuhan, biasanya 2x RAM)
     - `/home` (sisanya)
5. **Buat User dan Password**.
6. **Tunggu Instalasi Selesai**, lalu reboot.

> **Referensi tambahan**: 
> - [Panduan Instalasi Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-desktop)
> - [Instalasi Arch Linux (Lengkap)](https://wiki.archlinux.org/title/installation_guide)

---
## 2. Instalasi Linux di Virtual Machine (VM)
Jika tidak ingin menginstal langsung di perangkat keras, Linux dapat dijalankan di VM menggunakan **VirtualBox**, **VMware**, atau **QEMU/KVM**. Berikut panduan lengkap untuk pembuatan dan konfigurasi VM menggunakan VirtualBox sebagai contoh.

### 2.1 Persiapan
- **Download VirtualBox**: [https://www.virtualbox.org/](https://www.virtualbox.org/)
- **Download VMware Workstation Player** (opsional): [https://www.vmware.com/products/workstation-player.html](https://www.vmware.com/products/workstation-player.html)
- **Unduh ISO Linux** dari situs resmi distro yang diinginkan.

### 2.2 Pembuatan Mesin Virtual dengan VirtualBox
1. **Buka VirtualBox** dan klik tombol **New**.
2. **Beri Nama VM dan Pilih Tipe OS**:
   - Beri nama VM (misalnya, "Ubuntu VM").
   - Pilih **Type: Linux** dan **Version: Ubuntu (64-bit)** (atau sesuai distro yang dipilih).
3. **Atur Ukuran Memori**:
   - Direkomendasikan minimal 2048 MB (2GB) untuk penggunaan dasar, 4096 MB (4GB) atau lebih untuk performa yang lebih baik.
4. **Buat Virtual Hard Disk**:
   - Pilih **VDI (VirtualBox Disk Image)**.
   - Pilih **Dynamically Allocated** agar ukuran disk dapat berkembang sesuai kebutuhan.
   - Tentukan ukuran disk minimal 20GB (disarankan lebih besar untuk penggunaan desktop).
5. **Konfigurasi VM**:
   - Setelah VM dibuat, klik **Settings** → **Storage**.
   - Di bawah **Controller: IDE**, klik **Empty**. Klik ikon disk di sebelah kanan dan pilih **Choose a disk file...** untuk memilih file ISO Linux yang telah diunduh.
6. **Atur Jaringan (Opsional)**:
   - Di tab **Network**, pilih mode **NAT** untuk koneksi internet standar atau **Bridged Adapter** jika ingin VM berada di jaringan yang sama dengan host.
7. **Mulai VM**:
   - Klik **Start** untuk boot VM.
   - Ikuti wizard instalasi Linux yang muncul dalam VM.
8. **Pasang Guest Additions**:
   - Setelah instalasi selesai dan sistem telah booting, di menu VirtualBox pilih **Devices > Insert Guest Additions CD image**.
   - Ikuti instruksi untuk menginstal Guest Additions agar performa dan integrasi dengan host menjadi lebih baik.

> **Referensi tambahan**: 
> - [Panduan VirtualBox](https://docs.oracle.com/en/virtualization/virtualbox/)
> - [Panduan VMware Workstation](https://www.vmware.com/support.html)

---
## 3. Instalasi Linux di Windows Subsystem for Linux (WSL)
WSL memungkinkan pengguna menjalankan Linux di dalam Windows tanpa perlu VM.

### 3.1 Mengaktifkan WSL
1. **Aktifkan Fitur WSL dan Virtual Machine Platform**:
   - Buka **Control Panel** → **Programs** → **Turn Windows features on or off**.
   - Centang **Windows Subsystem for Linux** dan **Virtual Machine Platform**.
   - Klik **OK** dan restart komputer Anda.
2. **Instalasi Distro Linux melalui PowerShell**:
   - Buka **PowerShell** sebagai Administrator.
   - Jalankan perintah berikut untuk menginstal distro default (biasanya Ubuntu):
     ```powershell
     wsl --install
     ```
   - Jika ingin menginstal distro lain, gunakan perintah:
     ```powershell
     wsl --install -d <nama_distro>
     ```
     Contoh, untuk Debian:
     ```powershell
     wsl --install -d Debian
     ```
3. **Restart Komputer** (jika belum dilakukan setelah mengaktifkan fitur).
4. **Set Up Distro Linux**:
   - Buka aplikasi Linux (misalnya, Ubuntu) dari Start Menu.
   - Ikuti wizard setup untuk membuat user dan password.
5. **Update & Upgrade**:
   - Buka terminal Linux dan jalankan:
     ```bash
     sudo apt update && sudo apt upgrade
     ```

### 3.2 Mengelola WSL
- **Cek distro yang terinstal**:
  ```powershell
  wsl --list --verbose
  ```
- **Menghapus Distro**:
  ```powershell
  wsl --unregister <nama_distro>
  ```
- **Mengatur WSL2 sebagai default**:
  ```powershell
  wsl --set-default-version 2
  ```

> **Referensi tambahan**: 
> - [Dokumentasi Resmi WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

---
## Kesimpulan
Anda sekarang memiliki beberapa metode untuk menginstal Linux:
- **Bare Metal** untuk pengalaman penuh Linux.
- **Virtual Machine (VM)** untuk menjalankan Linux tanpa mengubah sistem utama.
- **WSL** untuk menjalankan Linux di dalam Windows tanpa VM.

Sesuaikan pilihan Anda dengan kebutuhan dan eksplorasi lebih lanjut melalui referensi yang diberikan! 🚀