---
sidebar_position: 1
---

# config terminal cisco

## Mode Cisco
### 1. User EXEC Mode
- Ditandai dengan prompt:
  ```
  router>
  ```
- Mode standar saat login dengan hak akses terbatas.

### 2. Privileged EXEC Mode
- Ditandai dengan prompt:
  ```
  router#
  ```
- Mode dengan hak akses lebih tinggi setelah memasukkan kata sandi.

### 3. Global Configuration Mode
- Ditandai dengan prompt:
  ```
  router(config)#
  ```
- Mode untuk konfigurasi perangkat secara keseluruhan.

## Cara Berpindah Mode di Cisco
Untuk masuk ke mode Privileged EXEC dan Global Configuration, gunakan perintah berikut:
```
router> enable
router# configure terminal
router(config)#
```
Atau dengan singkatan:
```
router> en
router# conf t
router(config)#
```

---

## Privileged EXEC Mode
- Digunakan untuk menjalankan perintah monitoring seperti `show`.
- Jika sedang berada di Global Configuration Mode, gunakan `do show`.

### Running-Config
- Merupakan konfigurasi yang sedang berjalan pada perangkat.
- Konfigurasi ini hanya bertahan selama perangkat menyala.
- Perintah untuk melihatnya:
  ```
  router# show running-config
  router# sh run
  router# sh r
  ```

### Startup-Config
- Merupakan konfigurasi yang disimpan di NVRAM dan dimuat saat perangkat dinyalakan.
- Perintah untuk melihatnya:
  ```
  router# show startup-config
  router# sh start
  router# sh s
  ```

### Menyimpan dan Menghapus Konfigurasi
#### Menyimpan Konfigurasi
```
router# write memory
router# copy running-config startup-config
router# cp run start
```

#### Menghapus Konfigurasi
```
router# write erase
```

---

## Global Configuration Mode
### Mengubah Hostname
```
router(config)# hostname <nama_perangkat>
```

### Membuat Password pada User Console
```
router(config)# line console 0
router(config)# password <password_console_0>
router(config)# login
```

### Membuat Password pada Privileged EXEC Mode
```
router(config)# enable password <password>
router(config)# enable secret <password_terenkripsi>
```

### Membuat MOTD (Message of The Day)
Pesan yang ditampilkan saat login:
```
router(config)# banner motd &<teks_yang_akan_ditampilkan>&
```
Atau:
```
router(config)# banner motd !
<teks yang akan ditampilkan>
<teks yang akan ditampilkan>
!
```
- Gunakan karakter pembatas (`&`, `!`, `~`, dll.) yang tidak muncul dalam teks pesan.