Secara teknis, di sisi Backend proses pembuatan sudah selesai. Tidak ada request lagi yang perlu dikirim.

Frontend sekarang tinggal mengambil slug yang didapat dari Step 2 (x8y9z0a1) dan merakit URL-nya untuk ditampilkan ke layar pengguna:

Link Siap Dibagikan:
https://domainkamu.com/g/x8y9z0a1

Ketika penerima mengeklik link tersebut, Frontend si penerima hanya perlu melakukan satu request GET ke:
GET /api/greetings/slug/x8y9z0a1
Dan Backend akan mengembalikan seluruh data lengkap (beserta relasi tema, musik, foto, dan setting) agar kartu ucapan bisa langsung dirender!