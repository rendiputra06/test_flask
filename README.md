# Boilerplate Flask + React + Docker

Ini adalah boilerplate untuk aplikasi web yang menggunakan Flask untuk backend, React untuk frontend, dan Docker untuk containerization.

## Fitur

-   Otentikasi Pengguna (Login/Logout/Register)
-   Manajemen Pengguna (CRUD untuk admin)
-   Pengaturan Global (CRUD untuk admin)
-   Pengaturan Menu (CRUD untuk admin)
-   Manajemen Profil Pengguna

## Prasyarat

-   Docker
-   Docker Compose

## Cara Menjalankan Aplikasi

1.  **Clone Repositori**

    ```sh
    git clone <URL_REPO_ANDA>
    cd <NAMA_PROYEK>
    ```

2.  **Build dan Jalankan Container**

    Jalankan perintah berikut dari direktori root proyek. Ini akan membangun image Docker untuk backend dan frontend, menginstal dependensi, dan memulai layanan.

    ```sh
    docker-compose up --build
    ```

    -   Frontend akan tersedia di `http://localhost:3000`.
    -   Backend akan tersedia di `http://localhost:5000`.

## Inisialisasi Database (Hanya untuk Pertama Kali)

Setelah container berjalan, Anda perlu menginisialisasi database dan membuat tabel. Buka terminal baru dan jalankan perintah berikut.

1.  **Inisialisasi Folder Migrasi**

    Perintah ini hanya perlu dijalankan **satu kali** saat pertama kali Anda menyiapkan proyek.

    ```sh
    docker-compose exec backend flask db init
    ```

2.  **Buat Migrasi Awal**

    Perintah ini akan mendeteksi model (User, GlobalSetting, dll.) dan membuat skrip migrasi.

    ```sh
    docker-compose exec backend flask db migrate -m "Initial migration"
    ```

3.  **Terapkan Migrasi ke Database**

    Perintah ini akan menerapkan skrip migrasi untuk membuat tabel di database.

    ```sh
    docker-compose exec backend flask db upgrade
    ```

## Membuat Pengguna Admin Pertama

Untuk dapat login dan menguji fitur yang dilindungi (seperti manajemen pengguna), Anda perlu membuat pengguna admin.

1.  **Masuk ke Flask Shell**

    Jalankan perintah ini untuk masuk ke shell interaktif di dalam container backend.

    ```sh
    docker-compose exec backend flask shell
    ```

2.  **Buat Pengguna Admin**

    Salin dan tempel kode Python berikut ke dalam shell, lalu tekan Enter. Ganti `'admin'`, `'admin@example.com'`, dan `'password'` dengan kredensial yang Anda inginkan.

    ```python
    from app import db
    from app.models import User

    # Periksa apakah pengguna sudah ada
    if not User.query.filter_by(username='admin').first():
        admin_user = User(
            username='admin',
            email='admin@example.com',
            is_admin=True,
            is_active=True
        )
        admin_user.set_password('password')
        db.session.add(admin_user)
        db.session.commit()
        print('Admin user created successfully.')
    else:
        print('Admin user already exists.')

    # Keluar dari shell
    exit()
    ```

Sekarang Anda dapat login ke aplikasi menggunakan kredensial admin yang baru saja Anda buat.
