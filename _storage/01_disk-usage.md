---
sidebar_position: 1
slug: /
---

# Manajemen Disk

## Pengenalan Disk di Linux
Linux memperlakukan disk drive sebagai perangkat blok yang direpresentasikan dengan nama seperti:
- `/dev/sda` - Disk pertama
- `/dev/sdb` - Disk kedua
- `/dev/sda1` - Partisi pertama pada disk pertama
- `/dev/sdb2` - Partisi kedua pada disk kedua

### Block Storage vs Attach Storage
- **Block Storage**: Menyediakan akses tingkat blok langsung ke perangkat penyimpanan (contoh: HDD, SSD yang langsung terhubung ke sistem).
- **Attach Storage**: Penyimpanan eksternal atau jaringan seperti NAS atau SAN.

### Jenis File System di Linux
- **ext2**: Tidak mendukung journaling, cocok untuk media penyimpanan kecil.
- **ext3**: Mendukung journaling, lebih stabil dibandingkan ext2.
- **ext4**: Lebih cepat, mendukung file besar dan partisi besar.
- **XFS**: Optimal untuk kinerja tinggi dan file berukuran besar.
- **btrfs**: Mendukung snapshot dan checksumming.
- **vfat/fat32**: Kompatibel dengan Windows, tapi tidak mendukung permission Unix.
- **ntfs**: Digunakan oleh Windows, dukungan di Linux terbatas.
- **NFS (Network File System)**: Digunakan untuk berbagi file melalui jaringan.
- **SMB (Samba)**: Protokol berbagi file antara sistem Windows dan Linux.

### Apa itu Journaling?
Journaling adalah mekanisme yang digunakan oleh sistem berkas seperti ext3, ext4, XFS, dan btrfs untuk mencatat perubahan sebelum diterapkan ke sistem berkas utama. Ini membantu mengurangi kemungkinan korupsi data akibat pemadaman listrik atau kegagalan sistem.

### Swap di Linux
Swap adalah ruang penyimpanan yang digunakan untuk memperluas kapasitas RAM secara virtual.

## MBR vs GPT
- **MBR (Master Boot Record)**:
  - Maksimum 4 partisi primer atau 3 partisi primer + 1 extended (12 logical).
  - Ukuran maksimal per partisi 2TB.
- **GPT (GUID Partition Table)**:
  - Mendukung hingga 128 partisi.
  - Ukuran partisi lebih dari 2TB, atau bisa mencapai 8Zib
  
## Perintah-Perintah Manajemen Disk
### Menampilkan Informasi Disk
- `lsblk` - Menampilkan daftar perangkat blok.
- `df -h` - Menampilkan penggunaan ruang disk.
- `du -sh /path` - Menampilkan ukuran direktori.
- `ncdu` - Tampilan interaktif penggunaan disk.
- `blkid` - Menampilkan informasi UUID dan tipe file system.
- `ls -l /dev/disk/by-uuid/` - Menampilkan UUID semua partisi.
- `findmnt` - Menampilkan informasi tentang mount point.

### Partisi Disk
- `fdisk /dev/sdX` - Membuat partisi (untuk MBR).
- `gdisk /dev/sdX` - Membuat partisi (untuk GPT).
- `parted /dev/sdX` - Alat manajemen partisi yang lebih fleksibel.
- `mkfs.ext4 /dev/sdX1` - Membuat file system ext4 pada partisi pertama.
- `mkswap /dev/sdX2` - Membuat partisi swap.
- `tune2fs -l /dev/sdX1` - Melihat informasi sistem berkas ext.

### Mounting dan Unmounting
- `mount /dev/sdX1 /mnt/data` - Me-mount partisi ke direktori `/mnt/data`.
- `umount /mnt/data` - Melepaskan partisi dari sistem.
- `mount -t nfs server:/path /mnt/nfs` - Mount NFS.
- `mount -t cifs //server/share /mnt/smb -o username=user` - Mount SMB/CIFS.

### Pemeriksaan dan Perbaikan
- `fsck /dev/sdX1` - Memeriksa dan memperbaiki sistem berkas.
- `e2fsck -f /dev/sdX1` - Memeriksa sistem berkas ext secara paksa.
- `badblocks -v /dev/sdX` - Memeriksa bad sector pada disk.

### Swap Management
- `swapon /dev/sdX2` - Mengaktifkan partisi swap.
- `swapoff /dev/sdX2` - Menonaktifkan partisi swap.
- `swapon -s` - Menampilkan informasi swap yang sedang aktif.

### Network File System (NFS) & SMB
- `exportfs -v` - Menampilkan daftar ekspor NFS.
- `showmount -e server` - Menampilkan shared directory dari server NFS.
- `smbclient -L //server -U user` - Melihat daftar share pada server SMB.

### Monitoring Disk
- `iotop` - Melihat proses yang paling banyak menggunakan disk I/O.
- `iostat -x 1` - Menampilkan statistik performa disk secara real-time.
- `df -Th` - Menampilkan tipe file system dan penggunaan disk.

## Studi Kasus Sederhana
1. **Membuat Partisi dan Memformatnya**
   ```bash
   fdisk /dev/sdb
   mkfs.ext4 /dev/sdb1
   mount /dev/sdb1 /mnt/data
   ```
2. **Menganalisis Penggunaan Disk**
   ```bash
   du -sh /home/user
   ncdu
   ```
3. **Menggunakan NFS untuk Berbagi File**
   ```bash
   mount -t nfs 192.168.1.100:/shared /mnt/nfs
   ```

## Catatan Tambahan
- Selalu backup data sebelum melakukan perubahan partisi.
- Gunakan `lsblk` sebelum memodifikasi disk untuk menghindari kesalahan.
- Gunakan `fsck` dengan hati-hati untuk mencegah kerusakan data.
- Gunakan `iotop` atau `iostat` untuk memantau aktivitas disk secara real-time.

Dokumentasi ini memberikan pengenalan dasar tentang manajemen disk di Linux beserta contoh penggunaan perintah utama.