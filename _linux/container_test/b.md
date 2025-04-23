**Cara Menghubungkan Docker Client (Windows) ke Docker Daemon (WSL/Linux)**

### Jalankan Docker Daemon di WSL/Linux
Pastikan Docker sudah terinstall di WSL/Linux, lalu jalankan daemon:

```sh
dockerd -H tcp://0.0.0.0:2375
```

Atau jika ingin lebih aman, gunakan socket file:

```sh
dockerd -H unix:///var/run/docker.sock
```

### Konfigurasi Docker Client di Windows
Atur `DOCKER_HOST` agar CLI di Windows menggunakan Docker Daemon di WSL/Linux:

```powershell
$env:DOCKER_HOST="tcp://<IP_WSL>:2375"
```

Gantilah `<IP_WSL>` dengan IP dari WSL.

### Coba Jalankan Perintah Docker dari Windows
Jalankan perintah di Command Prompt/Powershell Windows:

```powershell
docker ps
```

Jika berhasil, berarti Docker CLI di Windows sudah terhubung ke Docker Daemon di WSL/Linux.

Dengan cara ini, Windows hanya memiliki Docker Client tanpa perlu menjalankan Docker Daemon sendiri.