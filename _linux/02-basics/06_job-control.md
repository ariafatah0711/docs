---
sidebar_position: 6
---

# Job Control

## 1. Konsep Dasar Job Control
### Apa Itu Job Control?
Job control adalah fitur dalam sistem operasi Unix/Linux yang memungkinkan pengguna untuk mengelola proses yang sedang berjalan di shell. Dengan job control, pengguna dapat menghentikan, melanjutkan, atau memindahkan proses antara foreground dan background.

### Foreground dan Background Processes
- **Foreground Process**: Proses yang berjalan di terminal dan memblokir input sampai proses selesai.
- **Background Process**: Proses yang berjalan di belakang layar tanpa mengganggu terminal aktif.

### Interaksi dengan Job Control melalui Shell
Shell memungkinkan pengguna untuk mengontrol proses menggunakan berbagai perintah seperti `jobs`, `fg`, `bg`, `kill`, dan shortcut keyboard seperti `Ctrl+Z` dan `Ctrl+C`.

---

## 2. Perintah-Perintah Job Control
| Perintah | Deskripsi |
|----------|------------|
| `jobs` | Menampilkan daftar jobs yang sedang berjalan. |
| `fg` | Memindahkan job ke foreground. |
| `bg` | Memindahkan job ke background. |
| `Ctrl+Z` | Menghentikan sementara job yang sedang berjalan. |
| `Ctrl+C` | Menghentikan job secara paksa. |
| `kill` | Mengirim sinyal ke proses untuk menghentikan atau memodifikasinya. |

Contoh:
```bash
sleep 100 &      # Menjalankan perintah di background
jobs             # Melihat daftar job yang berjalan
fg %1            # Memindahkan job pertama ke foreground
kill %1          # Menghentikan job dengan ID 1
```

---

## 3. Memantau Proses
| Perintah | Deskripsi |
|----------|------------|
| `ps` | Menampilkan daftar proses. |
| `top` | Menampilkan proses secara real-time. |
| `htop` | Alternatif dari top dengan tampilan lebih user-friendly. |

Contoh:
```bash
ps aux          # Menampilkan semua proses
htop            # Monitoring interaktif dengan htop
```

---

## 4. Informasi User Aktif
| Perintah | Deskripsi |
|----------|------------|
| `w` | Menampilkan user yang sedang login dan aktivitas mereka. |
| `who` | Menampilkan daftar user yang login. |
| `users` | Menampilkan nama user yang sedang login. |
| `last` | Menampilkan riwayat login user. |

---

## 5. Memfilter Proses
| Perintah | Deskripsi |
|----------|------------|
| `ps aux \| grep nama_proses` | Mencari proses berdasarkan nama. |
| `ps -u username` | Menampilkan proses dari user tertentu. |
| `ps -p PID` | Menampilkan informasi proses dengan PID tertentu. |
| `pgrep nama_proses` | Mencari proses berdasarkan nama dan hanya menampilkan PID-nya. |
| `pkill nama_proses` | Menghentikan proses berdasarkan nama. |

Contoh:
```bash
ps aux | grep firefox  # Mencari proses Firefox
top -u username        # Menampilkan proses milik user tertentu
pgrep -l nginx         # Menampilkan PID dari proses nginx
pgrep -a nginx         # Menampilkan PID dari proses nginx secara lengkap
pkill -9 nginx         # Menghentikan semua proses nginx secara paksa
```

---

## 6. Mengelola Proses
| Perintah | Deskripsi |
|----------|------------|
| `kill -9 PID` | Menghentikan proses secara paksa. |
| `nice -n 10 command` | Menjalankan perintah dengan prioritas lebih rendah. |
| `renice -n 5 -p PID` | Mengubah prioritas proses yang sudah berjalan. |
| `pkill -u username` | Menghentikan semua proses dari user tertentu. |
| `pkill -t tty` | Menghentikan semua proses yang berjalan di terminal tertentu. |
| `kill -SIGKILL PID` | Menghentikan proses dengan sinyal KILL. |

---

## 7. Contoh Studi Kasus
### Menjalankan Program di Background
```bash
gcc -o program program.c &   # Kompilasi di background
```

### Mematikan Proses yang Tidak Responsif
```bash
ps aux | grep aplikasi
kill -9 PID
```

### Memantau Penggunaan Sumber Daya
```bash
top    # Monitoring real-time
htop   # Monitoring lebih interaktif
```

### Mengelola User yang Aktif
```bash
w       # Melihat user yang sedang login
who     # Menampilkan daftar user
users   # Menampilkan daftar user dalam satu baris
```

### Menghentikan User Secara Paksa
```bash
pkill -u username     # Menghentikan semua proses milik user
pkill -t pts/1       # Menghentikan proses di terminal tertentu
kill -SIGKILL PID    # Menghentikan proses user berdasarkan PID
```

---

## Poin Penting Tambahan
### Sinyal dalam Proses
| Sinyal | Deskripsi |
|--------|------------|
| `SIGTERM (15)` | Menghentikan proses dengan aman. |
| `SIGKILL (9)` | Mematikan proses secara paksa. |
| `SIGHUP (1)` | Restart proses setelah terminal logout. |

### PID (Process ID)
Setiap proses di Linux memiliki **Process ID (PID)** sebagai identifikator unik.

### Parent dan Child Process
- **Parent Process**: Proses yang menjalankan proses lain.
- **Child Process**: Proses yang dibuat oleh parent process.

### Zombie Process
Zombie process terjadi ketika child process selesai tetapi masih memiliki entry di tabel proses karena parent belum mengambil status keluarannya.

---

Dokumen ini memberikan panduan lengkap untuk memahami dan menggunakan job control serta manajemen proses dalam sistem operasi Linux/Unix.