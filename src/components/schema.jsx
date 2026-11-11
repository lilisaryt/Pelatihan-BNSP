// 1. Impor objek 'z' dari library zod
import { z } from 'zod';

// 2. Definisikan skema aturan bentuk data anggota tim
const memberSchema = z.object({
    // Kolom nama: tipe string, minimal 3 karakter
    name: z
        .string()
        .min(3, 'Nama Lengkap minimal 3 karakter'),

    // Kolom email: tipe string, format email valid (@ dan domain)
    email: z
        .string()
        .email('Format email tidak valid'),

    // Kolom role: wajib memilih opsi (bukan string kosong)
    role: z
        .string()
        .min(1, 'Wajib memilih salah satu peran tim')
});