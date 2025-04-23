Jika kamu ingin menjalankan platform mirip GitHub dan Docker Hub secara lokal, berikut adalah beberapa solusi yang bisa kamu gunakan:

---

## 1. GitHub Lokal (Self-Hosted Git Service)
Untuk menjalankan platform mirip GitHub di lokal, kamu bisa menggunakan Gitea atau GitLab.

### a) Gitea (Ringan & Mudah Dikembangkan)
Gitea adalah alternatif ringan untuk GitHub yang bisa dijalankan dengan mudah menggunakan Docker.

```sh
docker run -d --name=gitea -p 3000:3000 -p 22:22 gitea/gitea
```
Akses melalui: `http://localhost:3000`

**Konfigurasi tambahan:**
- Jika ingin menyimpan data secara persisten, tambahkan volume:
  ```sh
  docker run -d --name=gitea -p 3000:3000 -p 22:22 \
    -v /my/gitea/data:/data gitea/gitea
  ```
- Untuk integrasi dengan PostgreSQL:
  ```sh
  docker network create gitea-net
  docker run -d --name pgsql -e POSTGRES_USER=gitea -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=gitea --network gitea-net postgres:13
  docker run -d --name gitea -p 3000:3000 -p 22:22 --network gitea-net \
    -e GITEA__DATABASE__DB_TYPE=postgres \
    -e GITEA__DATABASE__HOST=pgsql:5432 \
    -e GITEA__DATABASE__NAME=gitea \
    -e GITEA__DATABASE__USER=gitea \
    -e GITEA__DATABASE__PASSWD=password gitea/gitea
  ```

### b) GitLab CE (Komplit tapi Berat)
GitLab CE menyediakan fitur lebih lengkap, tetapi lebih berat dibanding Gitea.

```sh
docker run -d --name gitlab --hostname gitlab.local -p 80:80 -p 443:443 -p 22:22 gitlab/gitlab-ce
```
Akses melalui: `http://localhost`

**Konfigurasi tambahan:**
- Menyimpan data secara persisten:
  ```sh
  docker run -d --name gitlab --hostname gitlab.local \
    -p 80:80 -p 443:443 -p 22:22 \
    -v /srv/gitlab/config:/etc/gitlab \
    -v /srv/gitlab/logs:/var/log/gitlab \
    -v /srv/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
  ```
- Konfigurasi SMTP untuk email notifikasi:
  ```sh
  GITLAB_OMNIBUS_CONFIG="gitlab_rails['smtp_enable'] = true;
  gitlab_rails['smtp_address'] = 'smtp.example.com';
  gitlab_rails['smtp_port'] = 587;
  gitlab_rails['smtp_user_name'] = 'user@example.com';
  gitlab_rails['smtp_password'] = 'password';
  gitlab_rails['smtp_domain'] = 'example.com';"
  docker run -d --name gitlab --hostname gitlab.local \
    -p 80:80 -p 443:443 -p 22:22 \
    -e "$GITLAB_OMNIBUS_CONFIG" gitlab/gitlab-ce
  ```

---

## 2. Docker Hub Lokal (Private Docker Registry)
Untuk membuat Docker Hub versi lokal, gunakan Docker Registry.

```sh
docker run -d -p 5000:5000 --name registry registry:2
```

### a) Push Image ke Registry Lokal
```sh
docker tag my-image localhost:5000/my-image
docker push localhost:5000/my-image
```

### b) Menarik Image dari Registry Lokal
```sh
docker pull localhost:5000/my-image
```

### c) Menjalankan Registry dengan Penyimpanan Persisten
```sh
docker run -d -p 5000:5000 --name registry \
  -v /my/registry/data:/var/lib/registry registry:2
```

### d) Menggunakan Registry dengan Autentikasi
1. Buat file `.htpasswd` untuk user:
   ```sh
   docker run --rm --entrypoint htpasswd registry:2 -Bbn user password > auth/htpasswd
   ```
2. Jalankan Registry dengan autentikasi:
   ```sh
   docker run -d -p 5000:5000 --name registry \
     -v /my/registry/data:/var/lib/registry \
     -v /my/registry/auth:/auth \
     -e "REGISTRY_AUTH=htpasswd" \
     -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
     -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" registry:2
   ```

### e) Menggunakan Registry dengan TLS (HTTPS)
1. Buat sertifikat TLS:
   ```sh
   mkdir -p certs
   openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key \
     -x509 -days 365 -out certs/domain.crt
   ```
2. Jalankan Registry dengan TLS:
   ```sh
   docker run -d -p 5000:5000 --name registry \
     -v $(pwd)/certs:/certs \
     -e "REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt" \
     -e "REGISTRY_HTTP_TLS_KEY=/certs/domain.key" registry:2
   ```

---

Dengan solusi ini, kamu bisa menjalankan platform pengelolaan kode seperti GitHub dan manajemen container seperti Docker Hub secara lokal di servermu sendiri.

