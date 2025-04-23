**Jaringan pada Docker**

Docker menyediakan beberapa jenis jaringan (networking) yang memungkinkan container berkomunikasi satu sama lain atau dengan jaringan eksternal. Berikut adalah beberapa jenis jaringan yang tersedia dalam Docker:

### 1. **Bridge Network**
Bridge network adalah jenis jaringan default pada Docker jika tidak ditentukan driver jaringan saat menjalankan container. Jenis jaringan ini digunakan untuk membuat jaringan internal dalam satu Docker host.

#### **Karakteristik Bridge Network:**
- Setiap container memiliki IP address unik dalam jaringan bridge yang sama.
- Container dalam bridge network dapat saling berkomunikasi secara langsung melalui IP address.
- Jaringan ini terisolasi dari jaringan host.
- Agar container dapat diakses dari luar, port harus dipublikasikan menggunakan opsi `-p` atau `--publish`.

#### **Contoh Penggunaan:**
```sh
# Menjalankan container dengan bridge network (default)
docker run -d --name python-web-app python:3

docker network inspect bridge
```

Untuk menguji konektivitas antar-container:
```sh
# Mengecek koneksi dari satu container ke container lain
docker exec python-web-app curl 172.17.0.3:8080
```

---

### 2. **Host Network**
Host network menghilangkan isolasi antara container dan jaringan Docker host. Dengan mode ini, container tidak memiliki IP address sendiri dan menggunakan jaringan host secara langsung.

#### **Karakteristik Host Network:**
- Container berbagi jaringan dengan host.
- Tidak ada IP address terpisah untuk container.
- Tidak perlu melakukan port mapping.
- Hanya didukung pada Linux host, tidak tersedia di Docker Desktop untuk Windows/Mac.

#### **Contoh Penggunaan:**
```sh
# Menjalankan container menggunakan host network
docker run --rm -d --network host --name my_nginx nginx
```

Dengan mode ini, aplikasi di dalam container bisa langsung diakses melalui IP host tanpa perlu melakukan port mapping.

---

### 3. **None Network**
None network sepenuhnya mengisolasi container dari jaringan. Container tidak dapat berkomunikasi dengan host maupun container lain.

#### **Karakteristik None Network:**
- Container tidak memiliki koneksi jaringan.
- Tidak ada interface jaringan seperti eth0.
- Digunakan untuk keamanan atau testing tanpa koneksi internet.

#### **Contoh Penggunaan:**
```sh
# Menjalankan container tanpa jaringan
docker run -it --name none-network --network none alpine sh
```
Untuk menguji, jalankan perintah berikut di dalam container:
```sh
ping google.com  # Tidak akan berhasil
ip addr          # Tidak akan menemukan interface eth0
```

---

### 4. **Overlay Network**
Overlay network digunakan untuk menghubungkan beberapa Docker daemon dalam lingkungan yang terdistribusi, seperti dalam cluster Swarm.

#### **Karakteristik Overlay Network:**
- Digunakan untuk komunikasi antar-container di host yang berbeda.
- Memerlukan Docker Swarm.

---

### 5. **Macvlan & IPvlan Network**
- **Macvlan** memungkinkan container mendapatkan alamat MAC unik, membuatnya terlihat sebagai perangkat fisik di jaringan.
- **IPvlan** memberikan kontrol penuh atas alamat IP container di jaringan fisik.

---

### **Tabel Ringkasan Jenis Jaringan Docker**
| Driver  | Deskripsi |
|---------|------------|
| **bridge** | Default network driver, membuat jaringan internal antar-container. |
| **host** | Menghapus isolasi jaringan antara container dan host. |
| **none** | Mengisolasi container sepenuhnya dari jaringan. |
| **overlay** | Menghubungkan beberapa Docker daemon dalam cluster. |
| **ipvlan** | Memberikan kontrol penuh atas alamat IP. |
| **macvlan** | Memberikan alamat MAC unik untuk container. |

Dengan memahami jenis jaringan ini, Anda dapat memilih opsi yang paling sesuai untuk kebutuhan pengelolaan container Docker Anda.

