---
sidebar_position: 1
---

# Pengenalan

## Perangkat

- **Router**
  - Router adalah perangkat jaringan yang bertindak sebagai gerbang atau penghubung antara dua atau lebih jaringan yang berbeda. Router berfungsi untuk mengarahkan paket data antara jaringan dan memutuskan jalur terbaik untuk pengiriman data. Router bekerja pada **Layer 3**.
- **Switch**
  - Switch adalah perangkat jaringan yang menghubungkan beberapa perangkat dalam satu jaringan lokal (LAN). Switch bekerja di **Layer 2** dalam model referensi OSI dan mampu mengarahkan lalu lintas data ke perangkat yang terhubung langsung padanya.
- **PC, Laptop**

## OSI Layer

1. **Physical Layer** (Layer 1)
   - Berfungsi untuk mendefinisikan media transmisi jaringan, sinkronisasi bit, metode pensinyalan, serta membangun arsitektur jaringan seperti Ethernet, pengkabelan, dan topologi jaringan.
   - Contoh: **Fiber, Coax, Wireless, HUB, Repeaters**

2. **Data Link Layer** (Layer 2)
   - Bertugas menentukan setiap bit data dikelompokkan menjadi format yang disebut frame. 
   - Melakukan koreksi kesalahan, flow control, pengalamatan MAC Address.
   - Membuat ARP Table (Address Resolution Protocol).
   - Contoh: **MAC Address, ARP**
   - Perangkat: **Router, Switch**

3. **Network Layer** (Layer 3)
   - Bertugas mendefinisikan alamat IP sehingga setiap komputer dapat saling terkoneksi.
   - Melaksanakan proses routing dan membuat header untuk setiap paket data.
   - Contoh: **IP, ICMP, IPSec, IGMP**
   - Perangkat: **Router**

4. **Transport Layer** (Layer 4)
   - Memecah data menjadi paket-paket data dan memberikan nomor urut untuk setiap paket.
   - Memastikan paket diterima dengan sukses serta menangani transmisi ulang paket yang hilang.
   - Contoh: **TCP, UDP**

5. **Session Layer** (Layer 5)
   - Mengendalikan dialog serta koneksi antar komputer.
   - Dapat melakukan pemutusan koneksi internet.
   - Contoh: **API Sockets, NFS, RTP, SMB**

6. **Presentation Layer** (Layer 6)
   - Mengidentifikasi sintaks komunikasi antar host.
   - Memberi enkripsi serta dekripsi data.
   - Contoh: **SSH, MIME, TLS, SSL**

7. **Application Layer** (Layer 7)
   - Interaksi antara user dengan aplikasi jaringan.
   - Contoh: **HTTP, FTP, SMTP, IRC, DNS**

## Protokol

- **TCP (Transmission Control Protocol)** 
  - Memberikan nomor urut dan tanda pengenal unik untuk setiap paket data.
  - Mengirim ulang paket yang hilang atau dikirim dalam urutan salah.
  - Contoh: **HTTP, FTP, SSH, DNS**

- **UDP (User Datagram Protocol)**
  - Tidak menggunakan nomor urut atau tanda pengenal.
  - Mengirimkan data dalam aliran tanpa koreksi kesalahan.
  - Contoh: **DNS, VoIP**

## Port

- **HTTP** (80, 443) → Web server
- **DNS** (53)
- **FTP** (21)
- **SSH** (22)
- **SMTP** (25, 465 SSL) → Mengirim email
- **POP3** (110, 995 SSL) → Menerima email, tidak menyimpan di server
- **IMAP** (143, 993 SSL) → Menerima email, menyimpan di server

## Kabel

- **UTP (Unshielded Twisted Pair)**
  - **Straight (Perangkat Berbeda)**: PO - O - PH - B - PB - H - PC - C
  - **Cross (Perangkat Sama)**: PH - H - PO - B - PB - O - PC - C
- **Coaxial**
- **Fiber Optic**

---
# more
# format dns
```
A - Alamat IPv4 perangkat akhir
NS - Server nama otoritatif
AAAA - Alamat IPv6 perangkat akhir (diucapkan quad-A)
MX - Catatan pertukaran email
```

# tcp protokol
- jabat tangan tiga arah
```
syn => synchron ke server
sync ack => server synchronus dan acknowledge
ack => client acknowledge
```

- jabat tangan dua arah tapi 4 proses
```
fin ack => client finsih/terminate server
ack => server menerima permintaan finish

fin
ack
fin
ack
```

- Enkapsulasi data adalah proses di mana beberapa informasi tambahan ditambahkan ke item data untuk menambahkan beberapa fitur ke dalamnya.
    - Kita menggunakan model OSI atau TCP/IP di jaringan, dan transmisi data terjadi melalui berbagai lapisan dalam model ini.
    - Enkapsulasi data menambahkan informasi protokol ke data sehingga transmisi data dapat berlangsung dengan cara yang benar. Informasi ini dapat ditambahkan di header atau footer data.
    - Data dienkapsulasi di sisi pengirim, mulai dari lapisan application layer hingga physical layer. Setiap lapisan mengambil data yang dienkapsulasi dari lapisan sebelumnya dan menambahkan beberapa informasi lagi untuk merangkumnya dan beberapa fungsi lagi dengan data.

- arp(address resolution protocol) => ARP digunakan untuk memetakan alamat IP ke alamat fisik (MAC).
    - Fungsionalitas: 
        - Ketika pengirim mengetahui alamat IP dari perangkat jaringan tetapi tidak mengetahui alamat MAC-nya, pengirim melakukan siaran IP dan meminta alamat MAC yang sesuai 
        - Server merespons dengan memberikan alamat MAC yang tepat.
    - Penggunaan Umum:
        - ARP banyak digunakan dalam jaringan modern untuk mengonversi alamat IP menjadi alamat MAC.
    - Alur Protokol:
        - Pengirim melakukan siaran alamat IP.
        - Server merespons dengan memberikan alamat MAC yang sesuai.
    - Manajemen Tabel:
        - Tabel ARP dikelola oleh host lokal.

- rarp(reverse address resolution protocol) => RARP digunakan untuk memetakan alamat fisik (MAC) ke alamat IP.
    - Fungsionalitas:
        - Ketika pengirim mengetahui alamat MAC dari perangkat jaringan tetapi tidak mengetahui alamat IP-nya, pengirim melakukan siaran alamat MAC dan meminta alamat IP yang sesuai.
        - Server merespons dengan memberikan alamat IP yang tepat.
    - Penggunaan Umum:
        - RARP jarang digunakan dalam jaringan modern, terutama karena sebagian besar perangkat sekarang memiliki alamat IP yang telah ditetapkan sebelumnya.
    - Alur Protokol:
        - Pengirim melakukan siaran alamat MAC.
        - Server merespons dengan memberikan alamat IP yang sesuai.
    - Manajemen Tabel:
        - Tabel RARP dikelola oleh server RARP.


- Ringkasan:
    - ARP memetakan alamat IP ke alamat MAC.
    - RARP memetakan alamat MAC ke alamat IP.
    - ARP menggunakan alamat MAC siaran, sedangkan RARP menggunakan alamat IP siaran.
    - ARP lebih umum digunakan dalam jaringan modern, sementara RARP terutama digunakan oleh pengguna dengan fasilitas terbatas.
    - Ingatlah bahwa ARP membantu perangkat berkomunikasi dalam jaringan dengan menerjemahkan alamat IP logis menjadi alamat MAC fisik, sedangkan RARP membantu komputer tanpa disk yang boot tanpa alamat IP.