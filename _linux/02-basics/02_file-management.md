---
sidebar_position: 2
---

# Manajemen File dan Direktori

Manajemen file dan direktori adalah salah satu tugas dasar yang sering dilakukan di Linux. Berikut adalah daftar perintah yang umum digunakan untuk mengelola file dan direktori.

## 📂 Daftar Perintah Manajemen File dan Direktori

### **Menampilkan Daftar File dan Direktori**
- **`ls`**: Menampilkan daftar file dan direktori dalam direktori saat ini.
  ```bash
  ls
  ```
  **Opsi umum:**
  - `-l` : Menampilkan dalam format panjang (detail).
  - `-a` : Menampilkan file tersembunyi.
  - `-h` : Menampilkan ukuran file dalam format yang mudah dibaca (contoh: 1K, 234M).
  
- **`tree`**: Menampilkan struktur direktori dalam bentuk pohon.
  ```bash
  tree
  ```

### **Navigasi Direktori**
- **`cd`**: Mengubah direktori.
  ```bash
  cd /path/ke/direktori
  ```
  **Contoh:**
  - `cd ..` : Pindah ke direktori parent.
  - `cd ~` : Pindah ke direktori home.
  - `cd -` : Kembali ke direktori sebelumnya.

- **`pwd`**: Menampilkan direktori saat ini.
  ```bash
  pwd
  ```

### **Membuat File dan Direktori**
- **`touch`**: Membuat file kosong atau memperbarui timestamp file.
  ```bash
  touch nama_file.txt
  ```
- **`mkdir`**: Membuat direktori baru.
  ```bash
  mkdir nama_direktori
  ```
  **Opsi:**
  - `-p` : Membuat direktori beserta parent-nya (jika belum ada).
  ```bash
  mkdir -p parent/child
  ```

### **Menyalin File dan Direktori**
- **`cp`**: Menyalin file atau direktori.
  ```bash
  cp file_sumber file_tujuan
  ```
  **Opsi:**
  - `-r` : Menyalin direktori secara rekursif.
  ```bash
  cp -r direktori_sumber direktori_tujuan
  ```

### **Memindahkan atau Mengganti Nama File**
- **`mv`**: Memindahkan atau mengganti nama file/direktori.
  ```bash
  mv file_sumber file_tujuan
  ```
  **Contoh mengganti nama:**
  ```bash
  mv nama_lama.txt nama_baru.txt
  ```

### **Menghapus File dan Direktori**
- **`rm`**: Menghapus file atau direktori.
  ```bash
  rm nama_file.txt
  ```
  **Opsi:**
  - `-r` : Menghapus direktori dan isinya secara rekursif.
  - `-f` : Memaksa penghapusan tanpa konfirmasi.
  ```bash
  rm -rf nama_direktori
  ```
- **`rmdir`**: Menghapus direktori kosong.
  ```bash
  rmdir nama_direktori
  ```

### **Melihat Informasi File dan Direktori**
- **`stat`**: Menampilkan detail informasi file atau direktori.
  ```bash
  stat nama_file.txt
  ```
- **`file`**: Menentukan tipe file.
  ```bash
  file nama_file.txt
  ```
- **`du`**: Menampilkan ukuran file atau direktori.
  ```bash
  du -sh nama_direktori
  ```
  **Opsi:**
  - `-s` : Menampilkan total ukuran.
  - `-h` : Menampilkan dalam format yang mudah dibaca.
- **`df`**: Menampilkan penggunaan ruang disk.
  ```bash
  df -h
  ```

### **Mengelola Link**
- **`ln`**: Membuat link simbolik (symlink) atau hard link.
  - **Symlink:**
    ```bash
    ln -s target link_name
    ```
  - **Hard link:**
    ```bash
    ln target link_name
    ```

### **Mengubah Atribut File**
- **`chattr`**: Mengubah atribut file (contoh: membuat file tidak bisa dihapus).
  ```bash
  chattr +i nama_file.txt
  ```
  **Opsi:**
  - `+i` : Membuat file tidak bisa diubah atau dihapus.
  - `-i` : Menghapus atribut i.
- **`lsattr`**: Menampilkan atribut file.
  ```bash
  lsattr nama_file.txt
  ```

### **Mengelola Path**
- **`basename`**: Menampilkan nama file dari path.
  ```bash
  basename /path/ke/file.txt
  ```
  **Output:**
  ```
  file.txt
  ```
- **`dirname`**: Menampilkan direktori dari path.
  ```bash
  dirname /path/ke/file.txt
  ```
  **Output:**
  ```
  /path/ke
  ```

### **Mencari File dan Direktori**
- **`find`**: Mencari file atau direktori berdasarkan kriteria tertentu.
  ```bash
  find /path/ke/direktori -name "*.txt"
  ```
  **Opsi:**
  - `-name` : Mencari berdasarkan nama.
  - `-type` : Mencari berdasarkan tipe (contoh: `f` untuk file, `d` untuk direktori).

### **Mengelola Izin File**
- **`chmod`**: Mengubah izin file.
  ```bash
  chmod 755 nama_file.txt
  ```
  **Contoh:**
  ```bash
  chmod +x nama_file.txt   # Menambahkan izin eksekusi.
  chmod u=rw,g=r,o=r nama_file.txt  # Mengatur izin untuk user, group, dan others.
  ```
- **`chown`**: Mengubah pemilik file.
  ```bash
  chown user:group nama_file.txt
  ```
- **`chgrp`**: Mengubah grup file.
  ```bash
  chgrp group_name nama_file.txt
  ```

## 🎯 Tips Tambahan
- Gunakan **tab** untuk autocomplete nama file atau direktori.
- Gunakan `*` sebagai wildcard untuk mencocokkan banyak file (contoh: `*.txt`).
- Gunakan `man` untuk melihat manual perintah (contoh: `man ls`).

Dengan memahami perintah-perintah di atas, Anda dapat dengan mudah mengelola file dan direktori di Linux. Selamat mencoba!