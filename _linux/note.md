# HAProxy

HAProxy adalah singkatan dari **High Availability Proxy**, yaitu perangkat lunak open-source yang berfungsi sebagai **load balancer** dan **reverse proxy** untuk protokol HTTP dan TCP. Tujuannya adalah untuk memastikan bahwa sebuah layanan atau aplikasi tetap tersedia dan dapat diakses meskipun terjadi lonjakan trafik atau kegagalan pada salah satu server.

### Fungsi Utama:
- Mendistribusikan trafik ke beberapa server/backend (load balancing).
- Meningkatkan ketersediaan (high availability) layanan.
- Menjadi proxy antara klien dan server.
- Redirect trafik jika ada server yang gagal (failover).
- Mendukung protokol HTTP, HTTPS, TCP.

### Skema Umum:
```
Client
  ↓
HAProxy (Load Balancer)
  ↓
[Server 1] [Server 2] [Server 3]
```

---

# Podman

## Container
Container adalah teknologi virtualisasi ringan yang digunakan untuk menjalankan aplikasi secara terisolasi dalam satu sistem.

### Ciri Khas:
- Lebih ringan daripada Virtual Machine.
- Setiap container berisi aplikasi + dependensinya.
- Umumnya digunakan Docker atau Podman.

### Kelebihan:
- Portabel & konsisten antar lingkungan (dev, staging, production).
- Cepat dalam proses build dan deploy.
- Cocok untuk penggunaan microservices.

## Image
Image adalah **template read-only** yang berisi semua yang dibutuhkan untuk menjalankan aplikasi:
- Sistem file (berisi file biner, dependensi, konfigurasi)
- OS base (seperti Ubuntu, Alpine)
- Aplikasi utama (misalnya: Nginx, Node.js, MySQL)
- Metadata (ENV, CMD, ENTRYPOINT, dll)

### Fungsi Utama:
- Sebagai "cetakan" atau blueprint untuk membuat container.
- Bisa dibagikan lewat registry (Docker Hub, Quay, GitHub Container Registry, dll).
- Bisa dibuat sendiri dari Dockerfile atau Containerfile.

### Hubungan Image dan Container:
| Image                           | Container                            |
|----------------------------------|----------------------------------------|
| Seperti **resep masakan**       | Seperti **masakan jadi** dari resep   |
| Bersifat **read-only**          | Bersifat **read-write** (saat runtime)|
| Digunakan untuk **membuat container** | Digunakan untuk **menjalankan aplikasi** |
| Bisa disimpan dan didistribusikan | Dijalankan di sistem host              |

---

# DNS Record

DNS Record adalah catatan yang digunakan oleh sistem DNS untuk menentukan ke mana domain akan diarahkan.

## Jenis-Jenis Record:
| Tipe | Fungsi Utama                             |
|------|-------------------------------------------|
| A    | Mengarah ke IP address (IPv4)             |
| AAAA | Mengarah ke IP address (IPv6)             |
| CNAME| Alias ke domain lain                      |
| MX   | Menentukan server email                   |
| TXT  | Catatan teks, biasa untuk verifikasi (SPF, DKIM) |
| NS   | Menentukan name server domain             |

## Contoh:
```
example.com    A      192.168.1.1
www            CNAME  example.com
mail           MX     mail.example.com
```

