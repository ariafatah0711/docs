**Penyimpanan pada Docker**

Container pada Docker bersifat volatile, artinya data akan hilang saat container dihentikan atau dihapus. Secara default, data tersimpan di writable layer yang tidak bersifat persisten. Jika aplikasi bersifat stateless, ini tidak menjadi masalah. Namun, untuk aplikasi stateful yang memerlukan penyimpanan persisten, Docker menyediakan tiga metode:

1. **Volume**
   - Disimpan di `/var/lib/docker/volumes/`.
   - Dikelola oleh Docker, tidak dapat dimodifikasi oleh proses lain.
   - Bisa di-mount ke beberapa container sekaligus.
   - Mendukung external storage seperti Amazon S3.
   
   **Contoh penggunaan:**
   ```sh
   docker volume create my-volume
   docker run -d --name docker-volume --mount type=volume,source=my-volume,target=/app nginx:latest
   docker inspect docker-volume
   ```
   Untuk menghapus:
   ```sh
   docker container stop docker-volume && docker container rm docker-volume && docker volume rm my-volume
   ```

2. **Bind Mount**
   - Menggunakan path absolut di host.
   - Dapat dimodifikasi oleh proses lain.
   - Memungkinkan berbagi file konfigurasi, source code, atau artifact build antara host dan container.

   **Contoh penggunaan:**
   ```sh
   docker run -d -it --name docker-bindmount --mount type=bind,source="$(pwd)"/target,target=/app nginx:latest
   docker inspect docker-bindmount
   ```
   Untuk menghapus:
   ```sh
   docker container stop docker-bindmount && docker container rm docker-bindmount
   ```

3. **Tmpfs Mount** (In-Memory Storage)
   - Data hanya disimpan sementara di RAM.
   - Hilang saat container dihentikan.
   - Cocok untuk penyimpanan sementara atau cache.

   **Contoh penggunaan:**
   ```sh
   docker run -d -it --name docker-tmpfs --mount type=tmpfs,destination=/app nginx:latest
   docker exec -it docker-tmpfs bash
   cd app/ && echo "Dicoding" > dicoding.txt && ls
   ```
   Setelah container dihentikan dan dijalankan kembali, file dalam `/app` akan hilang.
   
   Untuk menghapus:
   ```sh
   docker container stop docker-tmpfs && docker container rm docker-tmpfs && docker image rm nginx:latest
   ```