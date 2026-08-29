import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Logika ini disiapkan untuk menyambung ke api_agora_vada.py 
    // jika nanti lo ingin memakai kembali fitur penyedot berita.
    return NextResponse.json({ 
      status: "success", 
      message: "Endpoint API Tarik Berita Aktif" 
    });

  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Gagal memproses permintaan" }, 
      { status: 500 }
    );
  }
}
