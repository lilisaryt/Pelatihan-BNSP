// Tulis kode ini di src/components/ProfileCard.jsx
import { useState } from 'react';

function ProfileCard() {
    // State untuk menyimpan profesi
    const [profesi, setProfesi] = useState('');

    // State untuk menghitung jumlah suka
    const [likes, setLikes] = useState(0);

    return (
        <div className="card">
            <h2>Kartu Profil Saya</h2>

            <p>Masukkan Profesi / Pekerjaan:</p>

            <input
                type="text"
                placeholder="Contoh: Mahasiswa"
                value={profesi}
                onChange={(e) => setProfesi(e.target.value)}
                className="input-teks"
            />

            <h3>Profesi: {profesi || 'Belum diisi'}</h3>

            <button
                className="btn-utama"
                onClick={() => setLikes(likes + 1)}
            >
                Suka ({likes})
            </button>
        </div>
    );
}

export default ProfileCard;