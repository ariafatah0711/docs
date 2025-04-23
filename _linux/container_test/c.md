## Penjelasan Docker Commit

Perintah `docker commit` digunakan untuk membuat image baru dari sebuah container yang sedang berjalan. Perintah ini memungkinkan kita menyimpan perubahan yang telah dilakukan dalam container agar dapat digunakan kembali sebagai image baru.

### Sintaks Dasar
```sh
docker commit [OPTIONS] CONTAINER IMAGE[:TAG]
```

### Contoh Penggunaan
Misalnya, kita memiliki sebuah container yang sedang berjalan dengan nama `python-web-app`, dan kita ingin menyimpan perubahan dalam container tersebut sebagai image baru dengan nama `hello-world` dan tag `v1`. Kita dapat menggunakan perintah berikut:
```sh
docker commit python-web-app hello-world:v1
```

### Penjelasan
- `python-web-app`: Nama atau ID container yang ingin dikonversi menjadi image.
- `hello-world:v1`: Nama image baru dengan tag `v1` yang akan dibuat dari container tersebut.

Setelah perintah ini dijalankan, image baru dengan nama `hello-world:v1` akan tersedia di daftar image lokal dan dapat digunakan untuk membuat container baru dengan perintah `docker run`:
```sh
docker run -d hello-world:v1
```

### Opsi Tambahan
Perintah `docker commit` memiliki beberapa opsi yang dapat digunakan, seperti:
- `-a` atau `--author`: Menentukan nama pembuat image.
- `-m` atau `--message`: Menambahkan pesan commit seperti pada Git.
- `--change`: Mengubah konfigurasi container saat membuat image.

Contoh dengan opsi tambahan:
```sh
docker commit -a "User" -m "Menambahkan konfigurasi baru" python-web-app hello-world:v1
```

### Kesimpulan
Perintah `docker commit` berguna untuk menyimpan perubahan dalam container sebagai image baru, memungkinkan kita untuk mendistribusikan dan menggunakan kembali konfigurasi yang telah dimodifikasi tanpa perlu membuat ulang dari awal.