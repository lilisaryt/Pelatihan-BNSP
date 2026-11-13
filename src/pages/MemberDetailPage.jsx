import { useParams, useNavigate } from 'react-router-dom';

export default function MemberDetailPage({ members }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = members.find((m) => m.id === Number(id));

  const handleBackClick = () => {
    navigate('/');
  };

  if (!member) {
    return (
      <div className="not-found-container">
        <h3>Anggota Tidak Ditemukan!</h3>
        <p>Data dengan ID #{id} tidak terdaftar di direktori.</p>
        <button onClick={handleBackClick} className="btn-primary">
          &larr; Kembali ke Direktori
        </button>
      </div>
    );
  }

  const isOnline = member.status === 'Online';

  return (
    <div className="profile-detail-container">
      <button onClick={handleBackClick} className="btn-back">
        &larr; Kembali ke Direktori Tim
      </button>

      <div className="profile-card">
        <img
          src={member.avatar}
          alt={member.name}
          className="avatar-large"
        />

        <h2>{member.name}</h2>
        <p className="profile-role">{member.role}</p>

        <div style={{ marginBottom: '14px' }}>
          <span className={isOnline ? 'badge-on' : 'badge-off'}>
            {isOnline ? '● Online' : '○ Offline'}
          </span>
        </div>

        <p className="profile-email">
          📧 {member.email || `${member.name.toLowerCase().replace(' ', '.')}@perusahaan.com`}
        </p>

        <p className="profile-bio">
          {member.bio || 'Belum ada informasi profil anggota.'}
        </p>

        <span className="profile-stars">
          ⭐ {member.stars} Bintang Apresiasi
        </span>
      </div>
    </div>
  );
}