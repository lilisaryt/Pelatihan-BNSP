// Tulis kode ini di src/components/SkillList.jsx
function SkillList() {
    // Data array sederhana
    const skills = ['HTML & CSS', 'JavaScript Modern', 'React JS', 'Node.js'];

    return (
        <div className="card">
            <h3>Daftar Materi Keahlian</h3>
            <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                {/* Iterasi dengan map: */}
                {skills.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default SkillList;