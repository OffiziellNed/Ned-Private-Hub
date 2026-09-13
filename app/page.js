'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Memanggil kunci rahasia yang sudah disuntikkan Vercel secara otomatis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Data Generator berdasarkan Jadwal Angsuran Rumah NED DEAN BARUS
const generateAngsuranData = () => {
  const data = [];
  let startDate = new Date('2022-10-25');

  for (let i = 1; i <= 240; i++) {
    let amount = "0";
    if (i >= 1 && i <= 12) amount = "2,721,798.00";
    else if (i >= 13 && i <= 24) amount = "2,857,887.90";
    else if (i >= 25 && i <= 36) amount = "3,000,782.30";
    else if (i >= 37 && i <= 48) amount = "3,150,821.41";
    else if (i >= 49 && i <= 60) amount = "3,308,362.48";
    else if (i >= 61 && i <= 239) amount = "4,064,640.85";
    else if (i === 240) amount = "4,064,642.33";

    const fullDate = startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-');
    const monthYear = startDate.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-');

    data.push({
      no: i,
      tanggal: fullDate,
      monthYear: monthYear,
      totalBayar: amount
    });
    
    startDate.setMonth(startDate.getMonth() + 1);
  }
  return data;
};

const GAME_PS1_DATA = [
  {
    "no": 1,
    "nama": "Disney Pixar Toys Story",
    "link": "https://www.mediafire.com/file/irdy26d742ipsck/Disney-Pixar_Toy_Story_2_-_Buzz_Lightyear_to_the_Rescue%2521_%2528USA%2529.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 2,
    "nama": "Harvest Moon - Back to Nature",
    "link": "https://www.mediafire.com/file/v3qfdwcnttvcyhh/Harvest_Moon_-_Back_to_Nature_%2528_Indonesia_%2529_.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 3,
    "nama": "Nascar Rumble",
    "link": "https://www.mediafire.com/file/q172fhpvc8xqj8w/NASCAR_Rumble_%2528USA%2529.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 4,
    "nama": "Pepsi Man",
    "link": "https://drive.google.com/drive/folders/186fcpz7Jn4hAmVX_CcozCuCMvMAEHVuT?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "8",
    "status": "OK",
    "keterangan": "8 Files"
  },
  {
    "no": 5,
    "nama": "Metal Slug X",
    "link": "https://www.mediafire.com/file/lqv4xoci5rotuzp/Metal_Slug_X.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 6,
    "nama": "Gallop",
    "link": "https://drive.google.com/drive/folders/1ZaqbYqRo_ruw8YDKOgHA1VqvE-SLVuVv?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "2",
    "status": "OK",
    "keterangan": "2 Files"
  },
  {
    "no": 7,
    "nama": "Tony Hawk",
    "link": "https://www.mediafire.com/file/ss16373lufhxstk/Tony_Hawk%2527s_Pro_Skater.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 8,
    "nama": "Vigilante 2nd Offense",
    "link": "https://drive.google.com/drive/folders/1XGFg4pRvEbgUWvFbw6T0JpFeSLUMpKzb?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "17",
    "status": "OK",
    "keterangan": "17 Files"
  },
  {
    "no": 9,
    "nama": "Gran Turismo",
    "link": "https://www.mediafire.com/file/k4h1kjc2kgjvw8b/Gran_Turismo_%2528v1.1%2529.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 10,
    "nama": "Gran Turismo 2",
    "link": "https://www.mediafire.com/file/prv9pjy7ayslxge/Gran_Turismo_2_.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 11,
    "nama": "Jackie Chan Stuntmaster",
    "link": "https://www.mediafire.com/file/knmb2vu9bx56pcp/Jackie_Chan_Stuntmaster.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 12,
    "nama": "Super Shot Soccer",
    "link": "https://www.mediafire.com/folder/gw2nhqf157rwr/SUPER_SHOT_SOCCER",
    "platform": "Mediafire",
    "tipe": "Folder",
    "jumlah": "7",
    "status": "OK",
    "keterangan": "7 Files"
  },
  {
    "no": 13,
    "nama": "Tenchu",
    "link": "https://www.mediafire.com/file/9rzoovjtlzztdsr/Tenchu_-_Stealth_Assassins.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 14,
    "nama": "CTR",
    "link": "https://www.mediafire.com/file/5lq44sn40n2rpjr/CTR_-_Crash_Team_Racing.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 15,
    "nama": "GTA",
    "link": "https://drive.google.com/drive/folders/1CT-mRU02_tm11_BrWs8BxbIZcp2tbM5Z?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 16,
    "nama": "GTA 2",
    "link": "https://www.mediafire.com/file/y5v9fuhqipx6lzc/Grand_Theft_Auto_2.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 17,
    "nama": "Naruto - Shinobi no Sato no Jintori Gassen",
    "link": "https://www.mediafire.com/file/b81cvq9x1aw0jxf/Naruto_-_Shinobi_no_Sato_no_Jintori_Gassen_.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 18,
    "nama": "WWF SmackDown! 2",
    "link": "https://www.mediafire.com/file/exwiz57hn7mazws/WWF_SmackDown%2521_2_.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 19,
    "nama": "Celebrity Death Match MTV",
    "link": "https://www.mediafire.com/file/71tx1phikn2btca/MTV_Celebrity_Deathmatch.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 20,
    "nama": "DINO CRISIS",
    "link": "https://www.mediafire.com/folder/96lz9mr54gdgc/DINO_CRISIS",
    "platform": "Mediafire",
    "tipe": "Folder",
    "jumlah": "",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 21,
    "nama": "DIGIMON WORLD",
    "link": "https://www.mediafire.com/file/wl5y7ece4xmdyz5/Digimon_World.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 22,
    "nama": "FINAL FANTASY VII",
    "link": "https://www.mediafire.com/file/gpuzfygkznfel9t/Final_Fantasy_VII_.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 23,
    "nama": "My Disney Kitchen",
    "link": "https://www.mediafire.com/file/5h33xayp0cjyg6v/My_Disney_Kitchen.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "Duplikat",
    "keterangan": ""
  },
  {
    "no": 24,
    "nama": "Crash Bandicoot",
    "link": "https://www.mediafire.com/file/0qs8sxt0uots935/Crash_Bandicoot.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "Duplikat",
    "keterangan": ""
  },
  {
    "no": 25,
    "nama": "TARZAN",
    "link": "https://drive.google.com/drive/folders/1JOKLXBkePolMTbMcOMTPOVJ3JkVghowt?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "2",
    "status": "OK",
    "keterangan": "2 Files"
  },
  {
    "no": 26,
    "nama": "WINNING ELEVEN 2002",
    "link": "https://www.mediafire.com/file/s5z41ct7nq57awl/World_Soccer_Winning_Eleven_2002_%2528Japan%2529_%2528Track_1%2529_%255BEnglish%255D.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 27,
    "nama": "SARGES HEROE'S 2",
    "link": "https://www.mediafire.com/file/iqotdjswd3s5zk1/Army_Men_-_Sarge%2527s_Heroes.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 28,
    "nama": "SPYRO THE DRAGON",
    "link": "https://www.mediafire.com/file/vo0b95gyobdavkt/Spyro_the_Dragon.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 29,
    "nama": "SYPHON FILTER",
    "link": "https://www.mediafire.com/file/dux3r5ud0gj1a3i/Syphon_Filter.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 30,
    "nama": "FINAL FANTASY TACTICS",
    "link": "https://www.mediafire.com/file/1vn3401rrw3c05f/Final_Fantasy_Tactics.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 31,
    "nama": "SUIKODEN II",
    "link": "https://www.mediafire.com/file/4oi4heo8yud7sd5/Suikoden_II.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 32,
    "nama": "PACMAN",
    "link": "https://drive.google.com/drive/folders/1Z6J-UKfx6JYlN6tlL-Rmscbdy_8LyxtP?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "23",
    "status": "OK",
    "keterangan": "23 Files"
  },
  {
    "no": 33,
    "nama": "Yugioh Forbidden Memories",
    "link": "https://www.mediafire.com/file/xhmkn054ibowyey/Yu-Gi-Oh_Forbidden_Memories.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 34,
    "nama": "Crash Bandicoot",
    "link": "https://www.mediafire.com/file/0qs8sxt0uots935/Crash_Bandicoot.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "Duplikat",
    "keterangan": ""
  },
  {
    "no": 35,
    "nama": "Road Rash Jailbreak",
    "link": "https://www.mediafire.com/file/bozabg9b2qykav0/Road_Rash_-_Jailbreak.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 36,
    "nama": "Worms Armageddon",
    "link": "https://www.mediafire.com/file/ga2ume05yg1rm17/Worms_Armageddon.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 37,
    "nama": "Pink Panther Pinkadelic Pursuit",
    "link": "https://drive.google.com/drive/folders/1HQY722hlRDrp6e5tLuwqX40zekJv5Sps?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "23",
    "status": "OK",
    "keterangan": "23 Files"
  },
  {
    "no": 38,
    "nama": "Bomberman World",
    "link": "https://www.mediafire.com/file/xg5k0f4ihvjkexp/Bomberman_World.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 39,
    "nama": "Resident Evil 3 Nemesis",
    "link": "https://www.mediafire.com/file/mtik3vqaallx8nx/Resident_Evil_3_-_Nemesis_.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 40,
    "nama": "Inspector Gadget",
    "link": "https://drive.google.com/drive/folders/1fZ5YJjplAPH4zfsreIgKvnZ0EhCvNbpM?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "12",
    "status": "OK",
    "keterangan": "12 Files"
  },
  {
    "no": 41,
    "nama": "My Disney Kitchen",
    "link": "https://www.mediafire.com/file/kc0sz888x28cizv/My_Disney_Kitchen.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "Duplikat",
    "keterangan": ""
  },
  {
    "no": 42,
    "nama": "Monkey Magic",
    "link": "https://www.mediafire.com/file/2qphwziijdpvkww/Monkey_Magic.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 43,
    "nama": "Resident Evil",
    "link": "https://www.mediafire.com/file/rsy92xota4uehj5/Resident_Evil_%2528USA%2529.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 44,
    "nama": "Tintin",
    "link": "https://www.mediafire.com/file/m36ot3befthv88g/Tintin_-_Destination_Adventure.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 45,
    "nama": "Dark Omen",
    "link": "https://drive.google.com/file/d/1wP6XWCeC8AaylzpqsdSRkZ7PCFOaacig/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 46,
    "nama": "Lilo & Stitch",
    "link": "https://www.mediafire.com/file/spz6z3lnfpwcy4q/Disney%2527s_Lilo_%2526_Stitch.bin/file",
    "platform": "Mediafire",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 47,
    "nama": "Disney Pooh's Party Game",
    "link": "https://drive.google.com/drive/folders/1_JEPBhd_Wz-V1qrhDgGbxxIqn1y4UDHK?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "2",
    "status": "OK",
    "keterangan": "2 Files"
  },
  {
    "no": 48,
    "nama": "Dynasty Warriors",
    "link": "https://drive.google.com/file/d/1CnKKcDdd6Qmr8IgtolqUzF6TvsQRvLLP/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 49,
    "nama": "3Xtreme",
    "link": "https://drive.google.com/drive/folders/1zZiHQj-Zm2vfM_X0A9SlFvGY2Sc3L_bR?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "2",
    "status": "OK",
    "keterangan": "2 Files"
  },
  {
    "no": 50,
    "nama": "Chocoboco Racing",
    "link": "https://drive.google.com/file/d/16u_f2L_oORHKpUl_iigdYjAWAfa4XZ4-/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 51,
    "nama": "Tomba!",
    "link": "https://drive.google.com/file/d/16YIPK7XGidUPVH-ZGtrUrRmeRx46_8gY/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 52,
    "nama": "Tomba!2",
    "link": "https://drive.google.com/drive/folders/1KU_1ZEs0aRepFGc4avelkYrOqCDefAxu?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 53,
    "nama": "Hercs Adventures",
    "link": "https://drive.google.com/file/d/1ZiZNkiLWY_qwB-RS1SRYYgiDLDUA0EtS/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 54,
    "nama": "Digimon Rumble",
    "link": "https://drive.google.com/file/d/1pggNuR5yg74zYScibj3RDPtjmTOtmtIj/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 55,
    "nama": "Command & Conquer red alert",
    "link": "https://drive.google.com/drive/folders/13pT74wSJNSmIHXVTm8uoSmhMNSdTQAsO?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "2",
    "status": "OK",
    "keterangan": "2 Files"
  },
  {
    "no": 56,
    "nama": "Tenchu 2",
    "link": "https://drive.google.com/file/d/1Oy9RiltCupJtQY5FpPLb9KX5OOWifIev/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 57,
    "nama": "Hot Wheels",
    "link": "https://drive.google.com/drive/folders/18fVlHMWbQ2QlGAWGSJWvo6hb8FM25DNJ?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 58,
    "nama": "Crash Bandicoot 2",
    "link": "https://drive.google.com/file/d/1wVGF7F06rfTsTr9OYH0bl2MFOn2i7zbh/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 59,
    "nama": "Ms Pacman",
    "link": "https://drive.google.com/drive/folders/1GvBlPYW9EVLNAt-puqmKsilHDgoo8bta?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "8",
    "status": "OK",
    "keterangan": "8 Files"
  },
  {
    "no": 60,
    "nama": "Twisted Metal 4",
    "link": "https://drive.google.com/drive/folders/1OxhLNg0jVoelK8ezzOqv0WnyLyQWiopH?usp=sharing",
    "platform": "Google Drive",
    "tipe": "Folder",
    "jumlah": "24",
    "status": "OK",
    "keterangan": "24 Files"
  },
  {
    "no": 61,
    "nama": "Big Ol Bass 2",
    "link": "https://drive.google.com/file/d/1h6y9yrQ5kKSzWI2xBccWVw989fvo7PNw/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  },
  {
    "no": 62,
    "nama": "Spiderman",
    "link": "https://drive.google.com/file/d/1cTg7yS3BBt76xZdA2xQ-k5rpF7AfVSz3/view?usp=sharing",
    "platform": "Google Drive",
    "tipe": "File BIN",
    "jumlah": "-",
    "status": "OK",
    "keterangan": ""
  }
];

const GAME_APK_DATA = [
  {
    "no": 1,
    "nama": "Bully Rockstar",
    "link": "https://drive.google.com/file/d/1N4PEzgQeCdN-UVWHucC7NnptY-14x0ZH/view?usp=sharing",
    "ukuran": "1.98 GB",
    "ukuran_gb": "1.98",
    "platform": "Google Drive",
    "tipe": "APK / Game File",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 2,
    "nama": "Monopoly",
    "link": "https://drive.google.com/file/d/1nhJq4DHW6u3Z2e4bCzgFj3lnbwQuBf02/view?usp=sharing",
    "ukuran": "579 MB",
    "ukuran_gb": "0.565",
    "platform": "Google Drive",
    "tipe": "APK / Game File",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 3,
    "nama": "My Time at Portia",
    "link": "https://drive.google.com/file/d/18MBLqpZV91Zk_qHaU455ZZ5aDLAPJ8fq/view?usp=sharing",
    "ukuran": "1.07 GB",
    "ukuran_gb": "1.07",
    "platform": "Google Drive",
    "tipe": "APK / Game File",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  }
];

const GAME_PSP_DATA = [
  {
    "no": 1,
    "nama": "Silent Hill",
    "link": "https://drive.google.com/file/d/19tLzTL5Hr-9Q6-JK-a4ODxWa5wl0zJvB/view?usp=sharing",
    "ukuran": "767 MB",
    "ukuran_gb": "0.749",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 2,
    "nama": "Def Jam",
    "link": "https://drive.google.com/file/d/1Fo35ce-hzzI8h3kFOvKdZVPFryNF2o76/view?usp=sharing",
    "ukuran": "1.5 GB",
    "ukuran_gb": "1.5",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 3,
    "nama": "Asphalt - Urban GT 2",
    "link": "https://drive.google.com/file/d/1G-7S2vuzcWUIBQW7dxJQsyDTTWOPMMT2/view?usp=sharing",
    "ukuran": "843 MB",
    "ukuran_gb": "0.823",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 4,
    "nama": "Harvest Moon Boy & Girl",
    "link": "https://drive.google.com/file/d/1RUAPJwE-LlXXP9sFMIJnTLEypR4eU5JE/view?usp=sharing",
    "ukuran": "325 MB",
    "ukuran_gb": "0.317",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 5,
    "nama": "Harry Potter & The Goblet Of Fire",
    "link": "https://drive.google.com/file/d/1gGWvWAWa-gyNEqAKkflEoMzdX6vRx3f5/view?usp=sharing",
    "ukuran": "391 MB",
    "ukuran_gb": "0.382",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 6,
    "nama": "Ben10",
    "link": "https://drive.google.com/file/d/1lxCA30IqE72gTSVvqR5dWg100T7qKWiM/view?usp=sharing",
    "ukuran": "653 MB",
    "ukuran_gb": "0.638",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 7,
    "nama": "Fifa 14",
    "link": "https://drive.google.com/file/d/1W1too1tyTE5k-PyoeyeBdUjWTzTzDQqP/view?usp=sharing",
    "ukuran": "1.2 GB",
    "ukuran_gb": "1.2",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 8,
    "nama": "Dragon Ball Z Budokai",
    "link": "https://drive.google.com/file/d/10swqNiN6IE3gJpVhnc5eLzWbBvdNOp7x/view?usp=sharing",
    "ukuran": "827 MB",
    "ukuran_gb": "0.808",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 9,
    "nama": "Fifa Street 2",
    "link": "https://drive.google.com/file/d/1drk3orl6c54v5PTx3ZiBEZEjfU1_YhfS/view?usp=sharing",
    "ukuran": "861 MB",
    "ukuran_gb": "0.841",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 10,
    "nama": "Lego Batman",
    "link": "https://drive.google.com/file/d/1o981aBdXxYnIGoYRfX0DGL9sMFIry4Aq/view?usp=sharing",
    "ukuran": "1.06 GB",
    "ukuran_gb": "1.06",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 11,
    "nama": "NBA 2k12",
    "link": "https://drive.google.com/file/d/1Av9LZTte6-iWarqgr9OXdOghmbBnop-w/view?usp=sharing",
    "ukuran": "1.4 GB",
    "ukuran_gb": "1.4",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 12,
    "nama": "GTA Vice City",
    "link": "https://drive.google.com/file/d/1VVrtyOOTsAiz5rBt6Ys4yAC8QT5jBhvs/view?usp=sharing",
    "ukuran": "1.58 GB",
    "ukuran_gb": "1.58",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 13,
    "nama": "God of War Ghost of Sparta",
    "link": "https://drive.google.com/file/d/1h1tdwfvdmqJQRWHqj1jRhf2KQkNEwsHP/view?usp=sharing",
    "ukuran": "1.63 GB",
    "ukuran_gb": "1.63",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  },
  {
    "no": 14,
    "nama": "Tekken 6",
    "link": "https://drive.google.com/file/d/1JbFBurcRZxjG6Z8PP0cvIwvnQ7vy2K3u/view?usp=sharing",
    "ukuran": "816 MB",
    "ukuran_gb": "0.797",
    "platform": "Google Drive",
    "konsol": "PSP",
    "status": "OK",
    "jumlah": "",
    "keterangan": ""
  }
];



// Fungsi Pintar untuk mengubah link Google Drive menjadi Direct Image Link
const parseImageUrl = (url) => {
  if (!url) return '';
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) match = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (!match) match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
};

// --- KOMPONEN KHUSUS KARTU PROMPT (Desain Pinterest / Midjourney Clean UI) ---
function PromptCard({ p, onDelete, copyToClipboard, copySuccess }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = [p.image1, p.image2, p.image3].filter(img => img && img.trim() !== '');

  const nextSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group shadow-lg bg-slate-900 animate-fadeIn cursor-pointer">
      
      {/* Gambar Utama */}
      {images.length > 0 ? (
        <img 
          src={parseImageUrl(images[activeSlide])} 
          alt={p.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          onError={(e) => { e.target.src = `https://via.placeholder.com/600x800/1e293b/475569?text=Image+Error`; }} 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs font-mono">No Image Provided</div>
      )}

      {/* Overlay Gelap (Hanya Muncul Saat di-Hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4">
        
        {/* Bagian Atas: Judul & Tombol Hapus */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-white text-sm sm:text-base leading-snug drop-shadow-md line-clamp-2">
            {p.title}
          </h3>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(p.id); }} 
            className="p-1.5 bg-black/40 hover:bg-red-500/80 text-white/70 hover:text-white rounded-full backdrop-blur-sm transition-colors shrink-0" 
            title="Hapus"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Bagian Tengah: Panah Navigasi Gambar */}
        <div className="flex-1 flex items-center justify-between -mx-1 sm:-mx-2">
          {images.length > 1 ? (
            <>
              <button onClick={prevSlide} className="p-1.5 bg-black/30 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-transform active:scale-90 shadow-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextSlide} className="p-1.5 bg-black/30 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-transform active:scale-90 shadow-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          ) : <div></div>}
        </div>

        {/* Bagian Bawah: Indikator Gambar & Tombol Copy Prompt Ramping */}
        <div className="flex flex-col items-center gap-3">
          
          {/* Indikator Titik (Dots) Kalau ada > 1 gambar */}
          {images.length > 1 && (
            <div className="flex gap-1.5 drop-shadow-md">
              {images.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
              ))}
            </div>
          )}
          
          <button 
            onClick={(e) => { e.stopPropagation(); copyToClipboard(p.prompt_text, p.id); }}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all transform active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.3)] ${
              copySuccess === p.id 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white/95 hover:bg-white text-slate-900'
            }`}
          >
            {copySuccess === p.id ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy Prompt
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Dashboard() {
  const [view, setView] = useState('locked');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonthId, setCurrentMonthId] = useState('');
  const [proofs, setProofs] = useState({});
  const [isSyncing, setIsSyncing] = useState(true);
  const fileInputRef = useRef(null);

  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [descInput, setDescInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [typeInput, setTypeInput] = useState('pendapatan');

  const [prompts, setPrompts] = useState([]);
  const [showPromptForm, setShowPromptForm] = useState(false);
  const [promptForm, setPromptForm] = useState({ title: '', image1: '', image2: '', image3: '', text: '' });
  const [copySuccess, setCopySuccess] = useState(null);

  // === STATE BARU UNTUK GAME PS1 - TIDAK MENGGANGGU STATE LAMA ===
  const [selectedGameIds, setSelectedGameIds] = useState({});
  const [gameCopySuccess, setGameCopySuccess] = useState(false);
  const [gameSearch, setGameSearch] = useState('');

  // === STATE BARU UNTUK GAME APK - COPY KONSEP PS1 ===
  const [selectedApkIds, setSelectedApkIds] = useState({});
  const [apkCopySuccess, setApkCopySuccess] = useState(false);
  const [apkSearch, setApkSearch] = useState('');
  const [apkBoardFormat, setApkBoardFormat] = useState('email');

  // === STATE BARU UNTUK GAME PSP - COPY KONSEP PS1, DIBAWAH PS1 ===
  const [selectedPspIds, setSelectedPspIds] = useState({});
  const [pspCopySuccess, setPspCopySuccess] = useState(false);
  const [pspSearch, setPspSearch] = useState('');
  const [pspBoardFormat, setPspBoardFormat] = useState('email');

  const angsuranData = generateAngsuranData();

  useEffect(() => {
    const now = new Date();
    const today = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    setCurrentDate(today);
    setCurrentMonthId(now.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-'));

    const fetchData = async () => {
      if (!supabase) { setIsSyncing(false); return; }
      
      const { data: proofData } = await supabase.from('angsuran_rumah').select('*');
      if (proofData) {
        const loadedProofs = {};
        proofData.forEach(item => { loadedProofs[item.no_angsuran] = item.link_bukti; });
        setProofs(loadedProofs);
      }

      const { data: trxData } = await supabase.from('transaksi_keuangan').select('*').order('id', { ascending: false });
      if (trxData) setTransactions(trxData);

      const { data: promptData } = await supabase.from('prompts_gallery').select('*').order('id', { ascending: false });
      if (promptData) setPrompts(promptData);

      setIsSyncing(false);
    };

    fetchData();
  }, []);

  const handleNumClick = (num) => {
    if (pinCode.length < 6) { setPinCode(prev => prev + num); setPinError(false); }
  };

  const handleDelete = () => {
    setPinCode(prev => prev.slice(0, -1)); setPinError(false);
  };

  useEffect(() => {
    if (pinCode.length === 6) {
      if (pinCode === '010525') {
        setTimeout(() => { setView('home'); setPinCode(''); }, 150);
      } else {
        setPinError(true);
        setTimeout(() => { setPinCode(''); setPinError(false); }, 600);
      }
    }
  }, [pinCode]);

  const handleSaveProof = async (no) => {
    const currentLink = proofs[no] || '';
    const input = prompt("Masukkan URL Lightshot / Bukti Transaksi:", currentLink);
    if (input !== null) {
      const newLink = input.trim();
      setProofs({ ...proofs, [no]: newLink });
      if (supabase) await supabase.from('angsuran_rumah').upsert({ no_angsuran: no, link_bukti: newLink });
    }
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue) {
      setAmountInput(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    } else setAmountInput('');
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!descInput.trim() || !amountInput) return;
    const newTrx = { id: Date.now(), deskripsi: descInput.trim(), nominal: parseFloat(amountInput.replace(/\./g, '')), tipe: typeInput, status_lunas: false };
    setTransactions([newTrx, ...transactions]);
    setDescInput(''); setAmountInput('');
    if (supabase) await supabase.from('transaksi_keuangan').insert([newTrx]);
  };

  const handleDeleteTransaction = async (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    if (supabase) await supabase.from('transaksi_keuangan').delete().eq('id', id);
  };

  const handleToggleLunas = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setTransactions(transactions.map(t => t.id === id ? { ...t, status_lunas: newStatus } : t));
    if (supabase) await supabase.from('transaksi_keuangan').update({ status_lunas: newStatus }).eq('id', id);
  };

  const handleResetCentang = async () => {
    if (!confirm("Reset semua centang pengeluaran menjadi belum dibayar?")) return;
    setTransactions(transactions.map(t => t.tipe === 'pengeluaran' ? { ...t, status_lunas: false } : t));
    if (supabase) await supabase.from('transaksi_keuangan').update({ status_lunas: false }).eq('tipe', 'pengeluaran');
  };

  const handleClearAllTransactions = async () => {
    if (!confirm("Hapus SEMUA data transaksi untuk bulan ini? (Data tidak bisa dikembalikan)")) return;
    setTransactions([]);
    if (supabase) await supabase.from('transaksi_keuangan').delete().gt('id', 0);
  };

  const totalPendapatan = transactions.filter(t => t.tipe === 'pendapatan').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const totalPengeluaran = transactions.filter(t => t.tipe === 'pengeluaran').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const sisaSaldo = totalPendapatan - totalPengeluaran;
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleExportPDF = () => {
    const generatePDF = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16); doc.text("Laporan Pendapatan & Pengeluaran", 14, 15);
      doc.setFontSize(10); doc.setTextColor(100); doc.text(`Tanggal Cetak: ${currentDate}`, 14, 22);

      const sortedTrx = [...transactions].sort((a, b) => {
        if (a.tipe === 'pendapatan' && b.tipe === 'pengeluaran') return -1;
        if (a.tipe === 'pengeluaran' && b.tipe === 'pendapatan') return 1;
        return b.id - a.id; 
      });

      const tableData = sortedTrx.map((t, index) => [
        index + 1, t.tipe.toUpperCase(), t.deskripsi,
        t.tipe === 'pendapatan' ? `+ ${formatRupiah(t.nominal)}` : `- ${formatRupiah(t.nominal)}`,
        t.tipe === 'pengeluaran' ? (t.status_lunas ? 'Lunas' : 'Belum') : '-'
      ]);

      doc.autoTable({
        startY: 28, head: [['No', 'Tipe', 'Deskripsi', 'Nominal', 'Status']], body: tableData,
        theme: 'striped', headStyles: { fillColor: [79, 70, 229] }, styles: { fontSize: 9 }, alternateRowStyles: { fillColor: [245, 247, 250] }
      });

      const finalY = doc.lastAutoTable.finalY || 28;
      doc.setFontSize(11);
      doc.setTextColor(16, 185, 129); doc.text(`Total Pendapatan: ${formatRupiah(totalPendapatan)}`, 14, finalY + 10);
      doc.setTextColor(239, 68, 68); doc.text(`Total Pengeluaran: ${formatRupiah(totalPengeluaran)}`, 14, finalY + 16);
      doc.setTextColor(99, 102, 241); doc.text(`Sisa Saldo Bersih: ${formatRupiah(sisaSaldo)}`, 14, finalY + 22);
      doc.save(`Cashflow_Ned_${currentMonthId}.pdf`);
    };

    if (window.jspdf) generatePDF();
    else {
      const script1 = document.createElement('script'); script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      const script2 = document.createElement('script'); script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
      script1.onload = () => document.body.appendChild(script2);
      script2.onload = () => generatePDF();
      document.body.appendChild(script1);
    }
  };

  const scrollToCurrentMonth = () => {
    if (currentMonthId) {
      const element = document.getElementById(`row-${currentMonthId}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleExportData = () => {
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(proofs));
    const linkElement = document.createElement('a'); linkElement.setAttribute('href', dataUri); linkElement.setAttribute('download', 'Backup_Angsuran_Ned.json'); linkElement.click();
  };

  const handleImportData = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedProofs = JSON.parse(event.target.result); setProofs(importedProofs);
        if (supabase) {
          const upsertData = Object.keys(importedProofs).map(key => ({ no_angsuran: parseInt(key), link_bukti: importedProofs[key] }));
          await supabase.from('angsuran_rumah').upsert(upsertData);
        }
        alert("Data berhasil dipulihkan!");
      } catch (err) { alert("Gagal membaca file backup."); }
    };
    reader.readAsText(file); e.target.value = null;
  };

  const handleAddPrompt = async (e) => {
    e.preventDefault();
    if (!promptForm.title.trim() || !promptForm.text.trim()) return;

    const newPromptEntry = {
      id: Date.now(), title: promptForm.title.trim(), image1: promptForm.image1.trim(), image2: promptForm.image2.trim(), image3: promptForm.image3.trim(), prompt_text: promptForm.text.trim()
    };
    setPrompts([newPromptEntry, ...prompts]);
    setPromptForm({ title: '', image1: '', image2: '', image3: '', text: '' });
    setShowPromptForm(false);

    if (supabase) await supabase.from('prompts_gallery').insert([newPromptEntry]);
  };

  const handleDeletePrompt = async (id) => {
    if (!confirm("Hapus prompt ini dari gallery?")) return;
    setPrompts(prompts.filter(p => p.id !== id));
    if (supabase) await supabase.from('prompts_gallery').delete().eq('id', id);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(id); setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  // === LOGIC BARU GAME PS1 - TIDAK MENGGANGGU SUPABASE LAMA ===
  const filteredGames = GAME_PS1_DATA.filter(g => 
    g.nama.toLowerCase().includes(gameSearch.toLowerCase()) ||
    g.platform.toLowerCase().includes(gameSearch.toLowerCase())
  );
  const selectedGamesList = GAME_PS1_DATA.filter(g => selectedGameIds[g.no]);

  const toggleGameSelection = (no) => {
    setSelectedGameIds(prev => ({
      ...prev,
      [no]: !prev[no]
    }));
  };

  const [boardFormat, setBoardFormat] = useState('email'); // email | whatsapp

  const getJumlahFileDisplay = (g) => {
    const j = (g.jumlah || '').toString().trim();
    if (!j || j === '-' ) {
      // cek keterangan kalau ada angka
      if (g.keterangan && g.keterangan.toLowerCase().includes('file')) return g.keterangan;
      return '1';
    }
    return j;
  };

  const isMultiFile = (g) => {
    const j = getJumlahFileDisplay(g);
    const num = parseInt(j);
    if (!isNaN(num) && num > 1) return true;
    if (j.toLowerCase().includes('file')) {
      const m = j.match(/(\d+)/);
      if (m && parseInt(m[1]) > 1) return true;
    }
    return false;
  };

  const generateBoardFullText = (format = boardFormat) => {
    const isWA = format === 'whatsapp';
    // helper untuk format WA
    const bold = (t) => isWA ? `*${t}*` : t;
    const italic = (t) => isWA ? `_${t}_` : t;

    let text = '';
    text += `${italic('Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]')}

${bold('Download & Install ePSXe')}
Informasi: ini adalah emulator, sebuah aplikasi di Android yang berfungsi menjalankan game-game PS 1
Link: https://www.mediafire.com/file/y2ze58to38d6va8/ePSXe.apk/file 

${bold('Download Game PS 1')}
Informasi: ini adalah game PS1, setelah selesai proses download, langsung buka aplikasi ePSXe yang sudah di instal sebelumnya dan buka game nya dari aplikasi tersebut

`;
    if (selectedGamesList.length === 0) {
      text += `Judul: (Belum ada game dipilih - centang game di tabel bawah)
Link: -
Jumlah File: -

`;
    } else {
      selectedGamesList.forEach(g => {
        const jumlah = getJumlahFileDisplay(g);
        text += `Judul: ${g.nama}
Link: ${g.link}
Jumlah File: ${jumlah}
`;
        if (isMultiFile(g)) {
          text += `Download 1 per 1 file game ini, hasil download nya disarankan ditempatkan dalam 1 folder agar terlihat rapi.
`;
        }
        text += `
`;
      });
    }

    text += `${bold('Cara Menjalankan Game nya')}
1. Buka aplikasi ePSXe [ yang sudah di instal ]
2. Tap jalankan permainan
3. Scan game-nya atau cari file yang sudah didownload di aplikasi tersebut
4. Game auto muncul dan langsung bisa dimainkan

${bold('Tambahan informasi untuk Full Screen:')}
1. Buka aplikasi ePSXe
2. Buka menu Preferences
3. Buka Touchscreen Gamepad
4. Buka Gamepad Skin Editor Landscape
5. Silahkan edit sesuai keinginan`;

    return text;
  };

  const handleCopyBoard = () => {
    const fullText = generateBoardFullText(boardFormat);
    navigator.clipboard.writeText(fullText).then(() => {
      setGameCopySuccess(true);
      setTimeout(() => setGameCopySuccess(false), 2500);
    });
  };

  // === LOGIC BARU GAME APK - COPY KONSEP PS1 TAPI BOARD BEDA ===
  const filteredApk = GAME_APK_DATA.filter(g => 
    g.nama.toLowerCase().includes(apkSearch.toLowerCase()) ||
    g.platform.toLowerCase().includes(apkSearch.toLowerCase()) ||
    g.ukuran.toLowerCase().includes(apkSearch.toLowerCase())
  );
  const selectedApkList = GAME_APK_DATA.filter(g => selectedApkIds[g.no]);

  const toggleApkSelection = (no) => {
    setSelectedApkIds(prev => ({
      ...prev,
      [no]: !prev[no]
    }));
  };

  const generateApkBoardFullText = (format = apkBoardFormat) => {
    const isWA = format === 'whatsapp';
    const bold = (t) => isWA ? `*${t}*` : t;
    const italic = (t) => isWA ? `_${t}_` : t;

    let text = '';
    text += `${italic('Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]')}

${bold('Download Game Android')}

`;
    if (selectedApkList.length === 0) {
      text += `Judul: (Belum ada game dipilih - centang game di tabel bawah)
Link: -
Size: -

`;
    } else {
      selectedApkList.forEach(g => {
        text += `Judul: ${g.nama}
Link: ${g.link}
Size: ${g.ukuran}

`;
      });
    }

    text += `${bold('Cara Instal Game Android')}
1. Tap file apk [ hasil download game-nya ]
2. Ikuti proses instal
3. Beres, langsung main`;

    return text;
  };

  const handleCopyApkBoard = () => {
    const fullText = generateApkBoardFullText(apkBoardFormat);
    navigator.clipboard.writeText(fullText).then(() => {
      setApkCopySuccess(true);
      setTimeout(() => setApkCopySuccess(false), 2500);
    });
  };

  // === LOGIC BARU GAME PSP - COPY PS1 TAPI BOARD PPSSPP GOLD ===
  const filteredPsp = GAME_PSP_DATA.filter(g => 
    g.nama.toLowerCase().includes(pspSearch.toLowerCase()) ||
    g.platform.toLowerCase().includes(pspSearch.toLowerCase()) ||
    g.ukuran.toLowerCase().includes(pspSearch.toLowerCase())
  );
  const selectedPspList = GAME_PSP_DATA.filter(g => selectedPspIds[g.no]);

  const togglePspSelection = (no) => {
    setSelectedPspIds(prev => ({
      ...prev,
      [no]: !prev[no]
    }));
  };

  const generatePspBoardFullText = (format = pspBoardFormat) => {
    const isWA = format === 'whatsapp';
    const bold = (t) => isWA ? `*${t}*` : t;
    const italic = (t) => isWA ? `_${t}_` : t;

    let text = '';
    text += `${italic('Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]')}

${bold('Download PPSSPP Gold')}
Informasi: ini adalah emulator, sebuah aplikasi di Android yang berfungsi menjalankan game-game PSP
Link: https://drive.google.com/file/d/1nUjdFZNjMwJMJSdNEeX-FI5kCk5HEwHG/view?usp=sharing

${bold('Download Game PSP')}
Informasi: ini adalah game PSP, setelah selesai proses download, langsung buka aplikasi PPSSPP Gold yang sudah di instal sebelumnya dan buka game nya dari aplikasi tersebut

`;
    if (selectedPspList.length === 0) {
      text += `Judul: (Belum ada game dipilih - centang game di tabel bawah)
Link: -
Size: -

`;
    } else {
      selectedPspList.forEach(g => {
        text += `Judul: ${g.nama}
Link: ${g.link}
Size: ${g.ukuran}

`;
      });
    }

    text += `${bold('Cara Menjalankan Game nya')}
1. Buka aplikasi PPSSPP Gold
2. Pilih menu Games
3. Pilih Browse
4. Cari hasil download game di tempat penyimpanan Hp
5. Selesai, selamat bermain`;

    return text;
  };

  const handleCopyPspBoard = () => {
    const fullText = generatePspBoardFullText(pspBoardFormat);
    navigator.clipboard.writeText(fullText).then(() => {
      setPspCopySuccess(true);
      setTimeout(() => setPspCopySuccess(false), 2500);
    });
  };

  // 0. LOCK SCREEN
  if (view === 'locked') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full max-w-sm px-4">
          <div className="mb-2 text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-0.5 tracking-tight">Ned Private Hub</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 text-center font-medium">Your PIN contains 6 digits.</p>
          <div className="flex gap-4 mb-8 h-5 items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${pinError ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : i < pinCode.length ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'bg-slate-800'}`}></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-4 w-full max-w-[260px] sm:max-w-[290px] justify-items-center">
             {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button key={num} onClick={() => handleNumClick(num)} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-800/40 hover:bg-slate-700/60 active:bg-slate-700 active:scale-95 flex items-center justify-center transition-all border-none text-2xl sm:text-3xl font-medium text-slate-200 shadow-sm">{num}</button>
             ))}
             <button onClick={handleDelete} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-transparent active:bg-slate-800/30 text-slate-400 hover:text-slate-200 transition-all active:scale-95 border-none">
               <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" /></svg>
             </button>
             <button onClick={() => handleNumClick('0')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-800/40 hover:bg-slate-700/60 active:bg-slate-700 active:scale-95 flex items-center justify-center transition-all border-none text-2xl sm:text-3xl font-medium text-slate-200 shadow-sm">0</button>
             <button onClick={() => { setPinCode(''); setPinError(false); }} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-transparent active:bg-slate-800/30 text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-200 transition-all active:scale-95 uppercase tracking-widest border-none">Clear</button>
          </div>
        </div>
      </div>
    );
  }

  // 1. HOME
  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <span className="text-white font-bold text-3xl leading-none">N</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-12 tracking-tight">Ned Private Hub</h1>
        
        <div className="flex flex-col gap-4">
          <button onClick={() => setView('finansial')} className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group w-72 justify-start">
            <svg className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Finansial</span>
          </button>

          <button onClick={() => setView('prompt_gallery')} className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 group w-72 justify-start">
            <svg className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Prompt</span>
          </button>

          {/* MENU BARU SHOPEE - TIDAK GANGGU YANG LAMA */}
          <button onClick={() => setView('shopee')} className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 group w-72 justify-start">
            <svg className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Shopee</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. FINANSIAL MENU
  if (view === 'finansial') {
    return (
      <div className="flex flex-col items-center justify-start pt-24 sm:pt-32 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 relative px-4">
        <button onClick={() => setView('home')} className="absolute top-6 left-4 sm:top-12 sm:left-12 flex items-center text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50">
          <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="text-sm sm:text-base">Kembali</span>
        </button>

        <div className="w-16 h-16 mb-6 rounded-2xl bg-[#111827] border border-slate-700/60 flex items-center justify-center shadow-xl shadow-indigo-500/10 text-indigo-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 mb-8 sm:mb-12 tracking-tight">Finansial</h1>
        
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm">
          <button onClick={() => setView('angsuran')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group justify-start">
            <svg className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">Angsuran Rumah</span>
          </button>
          <button onClick={() => setView('transaksi')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group justify-start">
            <svg className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
            <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">Pendapatan & Pengeluaran</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. PROMPT GALLERY (Masonry-style Grid)
  if (view === 'prompt_gallery') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-purple-500/30 overflow-hidden">
        <header className="shrink-0 py-6 sm:py-8 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('home')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center">Prompt Gallery</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">Library referensi visual & AI prompt</p>
          <button onClick={() => setShowPromptForm(!showPromptForm)} className="absolute right-4 top-6 sm:right-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 transition-colors border border-purple-500/50 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span className="hidden sm:inline text-sm font-medium">Tambah Prompt</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar w-full">
          <div className="w-full max-w-[1600px] mx-auto">
            {showPromptForm && (
              <form onSubmit={handleAddPrompt} className="max-w-3xl mx-auto w-full bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-10 shadow-xl flex flex-col animate-fadeIn">
                <input type="text" placeholder="Nama / Judul Prompt" required value={promptForm.title} onChange={(e) => setPromptForm({...promptForm, title: e.target.value})} className="w-full border border-slate-700 text-sm rounded-lg px-4 py-3 outline-none focus:border-purple-500 font-bold mb-5" style={{ backgroundColor: '#0B0F19', color: '#e2e8f0' }} />
                <div className="flex flex-col gap-3 mb-5">
                  <input type="text" placeholder="Link Gambar 1 (Google Drive / URL)" value={promptForm.image1} onChange={(e) => setPromptForm({...promptForm, image1: e.target.value})} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-purple-500" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} />
                  <input type="text" placeholder="Link Gambar 2 (Google Drive / URL)" value={promptForm.image2} onChange={(e) => setPromptForm({...promptForm, image2: e.target.value})} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-purple-500" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} />
                  <input type="text" placeholder="Link Gambar 3 (Google Drive / URL)" value={promptForm.image3} onChange={(e) => setPromptForm({...promptForm, image3: e.target.value})} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-purple-500" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} />
                </div>
                <textarea placeholder="Masukkan text prompt AI di sini (bisa pakai enter / paragraf)..." required value={promptForm.text} onChange={(e) => setPromptForm({...promptForm, text: e.target.value})} className="w-full min-h-[140px] border border-slate-700 text-sm rounded-lg px-4 py-3 outline-none focus:border-purple-500 resize-none leading-relaxed mb-5" style={{ backgroundColor: '#0B0F19', color: '#cbd5e1' }}></textarea>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowPromptForm(false)} className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">Batal</button>
                  <button type="submit" className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors shadow-lg shadow-purple-500/20">Simpan Prompt</button>
                </div>
              </form>
            )}

            {prompts.length === 0 && !showPromptForm ? (
              <div className="text-center py-20 text-slate-500 flex flex-col items-center">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p>Belum ada prompt yang disimpan.</p>
              </div>
            ) : (
              // GRID OVERLAY (Card-less design)
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pb-20">
                {prompts.map((p, idx) => (
                   <PromptCard key={p.id} p={p} index={idx} onDelete={handleDeletePrompt} copyToClipboard={copyToClipboard} copySuccess={copySuccess} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. TRANSAKSI
  if (view === 'transaksi') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden">
        <header className="shrink-0 py-6 sm:py-8 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('finansial')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center">Pendapatan & Pengeluaran</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">Kalkulator cashflow bulanan otomatis</p>
        </header>
        <div className="flex-1 p-3 sm:p-8 overflow-hidden flex flex-col w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 shrink-0">
            <div className="bg-[#111827] border border-emerald-800/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#34d399' }}>Total Pendapatan</span>
              <span className="text-lg sm:text-xl font-bold font-mono mt-2" style={{ color: '#10b981' }}>{formatRupiah(totalPendapatan)}</span>
            </div>
            <div className="bg-[#111827] border border-red-800/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#f87171' }}>Total Pengeluaran</span>
              <span className="text-lg sm:text-xl font-bold font-mono mt-2" style={{ color: '#ef4444' }}>{formatRupiah(totalPengeluaran)}</span>
            </div>
            <div className="bg-[#111827] border border-indigo-800/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#818cf8' }}>Sisa Saldo Bersih</span>
              <span className="text-lg sm:text-xl font-bold font-mono mt-2" style={{ color: sisaSaldo >= 0 ? '#818cf8' : '#ef4444' }}>{formatRupiah(sisaSaldo)}</span>
            </div>
          </div>
          <form onSubmit={handleAddTransaction} className="bg-[#111827] border border-slate-800 rounded-xl p-4 mb-4 shrink-0 flex flex-col sm:flex-row gap-3">
            <select value={typeInput} onChange={(e) => setTypeInput(e.target.value)} className="border border-slate-700 text-sm font-semibold rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500" style={{ backgroundColor: '#0B0F19', color: typeInput === 'pendapatan' ? '#10b981' : '#ef4444' }}>
              <option value="pendapatan" style={{ color: '#10b981', backgroundColor: '#0B0F19', fontWeight: 'bold' }}>Pendapatan (+)</option>
              <option value="pengeluaran" style={{ color: '#ef4444', backgroundColor: '#0B0F19', fontWeight: 'bold' }}>Pengeluaran (-)</option>
            </select>
            <input type="text" placeholder="Deskripsi (contoh: Gaji / Belanja)" value={descInput} onChange={(e) => setDescInput(e.target.value)} className="flex-1 bg-[#0B0F19] border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500" required />
            <input type="text" inputMode="numeric" placeholder="Nominal (Rp)" value={amountInput} onChange={handleAmountChange} className="w-full sm:w-44 bg-[#0B0F19] border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 font-mono" required />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-md shadow-indigo-500/20">Simpan</button>
          </form>
          <div className="flex-1 bg-[#111827] rounded-xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#111827] sticky top-0 z-20 shadow-[0_1px_0_0_rgba(30,41,59,0.6)]">
                  <tr>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase bg-[#111827]">Tipe</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase bg-[#111827]">Deskripsi</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase text-right bg-[#111827]">Nominal (Rp)</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase text-center w-24 bg-[#111827]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {transactions.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-12 text-slate-500 text-sm">Belum ada data.</td></tr>
                  ) : (
                    [...transactions].sort((a, b) => {
                      if (a.tipe === 'pendapatan' && b.tipe === 'pengeluaran') return -1;
                      if (a.tipe === 'pengeluaran' && b.tipe === 'pendapatan') return 1;
                      return b.id - a.id; 
                    }).map((t) => (
                      <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 text-xs">
                          <span className={`inline-flex px-2 py-0.5 rounded font-medium text-[10px] uppercase border ${t.tipe === 'pengeluaran' && t.status_lunas ? 'opacity-50' : ''}`} style={t.tipe === 'pendapatan' ? { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' } : { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>{t.tipe}</span>
                        </td>
                        <td className={`py-3 px-4 text-sm font-medium ${t.tipe === 'pengeluaran' && t.status_lunas ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.deskripsi}</td>
                        <td className={`py-3 px-4 text-sm font-mono text-right font-semibold ${t.tipe === 'pengeluaran' && t.status_lunas ? 'opacity-50' : ''}`} style={{ color: t.tipe === 'pendapatan' ? '#34d399' : '#f87171' }}>{t.tipe === 'pendapatan' ? '+' : '-'} {formatRupiah(t.nominal)}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            {t.tipe === 'pengeluaran' && (
                              <button onClick={() => handleToggleLunas(t.id, t.status_lunas)} className={`p-1.5 rounded-lg transition-colors border ${t.status_lunas ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-800/40 text-slate-500 border-slate-700/50 hover:bg-slate-700'}`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={t.status_lunas ? 3 : 2} d="M5 13l4 4L19 7" /></svg>
                              </button>
                            )}
                            <button onClick={() => handleDeleteTransaction(t.id)} className="p-1.5 rounded-lg transition-colors border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <button onClick={handleExportPDF} className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Save as PDF
              </button>
              <div className="flex gap-2 w-full sm:w-auto justify-center">
                <button onClick={handleResetCentang} className="flex-1 sm:flex-none px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] sm:text-[11px] font-medium rounded-lg border border-slate-700 transition-colors">Reset Centang</button>
                <button onClick={handleClearAllTransactions} className="flex-1 sm:flex-none px-3 py-2 bg-red-950/30 hover:bg-red-900/50 text-red-400 text-[10px] sm:text-[11px] font-medium rounded-lg border border-red-900/50 transition-colors">Hapus Semua Data</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. ANGSURAN RUMAH
  if (view === 'angsuran') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden">
        <header className="shrink-0 py-6 sm:py-8 px-4 sm:px-0 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('finansial')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center mt-1 sm:mt-0">Jadwal Angsuran Rumah</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">Monitoring progres cicilan jangka panjang</p>
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-emerald-900/20 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-800/50">
                 <span className="text-[10px] sm:text-xs text-emerald-500/70 uppercase tracking-wider">Klien</span>
                 <div className="h-3 w-px bg-emerald-800/50"></div>
                 <span className="text-xs sm:text-sm font-semibold text-emerald-400">NED DEAN BARUS</span>
              </div>
              {currentDate && (
                <button onClick={scrollToCurrentMonth} className="flex items-center space-x-1.5 sm:space-x-2 bg-indigo-900/20 hover:bg-indigo-900/40 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-indigo-800/50 transition-colors cursor-pointer" title="Klik untuk melompat ke cicilan bulan ini">
                   <span className="text-[10px] sm:text-xs text-indigo-400/70 uppercase tracking-wider">Hari Ini</span>
                   <div className="h-3 w-px bg-indigo-800/50"></div>
                   <span className="text-xs sm:text-sm font-semibold text-indigo-300">{currentDate}</span>
                </button>
              )}
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button onClick={handleExportData} title="Backup Data (Download)" className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md sm:rounded-lg border border-slate-700 transition-colors"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></button>
              <button onClick={() => fileInputRef.current.click()} title="Restore Data (Upload)" className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md sm:rounded-lg border border-slate-700 transition-colors"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
              <input type="file" accept=".json" ref={fileInputRef} onChange={handleImportData} className="hidden" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-3 sm:p-12 overflow-hidden flex flex-col w-full">
          <div className="w-full max-w-4xl mx-auto flex-1 bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar relative">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead className="bg-[#111827] sticky top-0 z-20 shadow-[0_1px_0_0_rgba(30,41,59,0.6)]">
                  <tr>
                    <th className="py-3 sm:py-5 pl-2 sm:pl-6 pr-1 sm:pr-3 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase bg-[#111827]">No.</th>
                    <th className="px-1 sm:px-4 py-3 sm:py-5 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase bg-[#111827]">Tanggal</th>
                    <th className="px-1 sm:px-4 py-3 sm:py-5 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase text-right bg-[#111827]">Total (Rp)</th>
                    <th className="py-3 sm:py-5 px-1 sm:px-4 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase text-center bg-[#111827]">Bukti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {angsuranData.map((row) => {
                    const isCurrentMonth = row.monthYear === currentMonthId;
                    const hasProof = Boolean(proofs[row.no] && proofs[row.no].trim() !== "");
                    const isPast = row.no <= 45;
                    const pastTextStyle = isPast && !isCurrentMonth ? { color: '#475569' } : {};
                    
                    return (
                      <tr key={row.no} id={`row-${row.monthYear}`} className={`transition-colors duration-300 group ${isCurrentMonth ? 'bg-slate-800/80 shadow-inner border-l-2 sm:border-l-4 border-indigo-500' : (isPast ? 'bg-transparent' : 'hover:bg-slate-800/30')}`}>
                        <td className={`whitespace-nowrap py-3 sm:py-4 pl-2 sm:pl-6 pr-1 sm:pr-3 text-[11px] sm:text-sm font-medium ${isCurrentMonth ? 'text-indigo-400' : (!isPast ? 'text-slate-500 group-hover:text-slate-300' : '')}`} style={pastTextStyle}>{String(row.no).padStart(3, '0')}</td>
                        <td className={`whitespace-nowrap px-1 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-sm ${isCurrentMonth ? 'text-slate-100 font-semibold' : (!isPast ? 'text-slate-300 group-hover:text-slate-200' : '')}`} style={pastTextStyle}>{row.tanggal}{isCurrentMonth && <span className="ml-1 sm:ml-2 inline-flex items-center px-1 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">CUR</span>}</td>
                        <td className={`whitespace-nowrap px-1 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-sm tracking-tighter sm:tracking-normal font-mono text-right ${isCurrentMonth ? 'text-indigo-300 font-semibold' : (!isPast ? 'text-slate-200 group-hover:text-white' : '')}`} style={pastTextStyle}>{row.totalBayar}</td>
                        <td className="whitespace-nowrap py-3 sm:py-4 px-1 sm:px-4 text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <button onClick={() => handleSaveProof(row.no)} title="Input/Edit Link Bukti" className={`p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors border ${isPast && !hasProof ? 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/40' : 'bg-slate-800/50 hover:bg-slate-700 border-slate-700/50 text-slate-300'}`} style={isPast && !hasProof ? { color: '#475569' } : {}}>
                              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </button>
                            {hasProof ? (
                              <a href={proofs[row.no]} target="_blank" rel="noopener noreferrer" title="Lihat Bukti" className="p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors hover:opacity-80" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.4)', borderWidth: '1px', color: '#818cf8' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </a>
                            ) : (
                              <span className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-slate-800/20 border border-slate-700/30 cursor-not-allowed" title="Belum ada bukti" style={{ color: '#475569' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                              </span>
                            )}
                            {(hasProof || isPast) ? (
                              <div title={isPast && !hasProof ? "Lunas (Data Historis)" : "Lunas / Bukti Tersimpan"} className="p-1 sm:p-2 rounded-md sm:rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', borderWidth: '1px', color: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              </div>
                            ) : (
                              <div title="Menunggu" className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-slate-800/20 border border-slate-700/30" style={{ color: '#475569' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <span className="text-[10px] sm:text-xs text-slate-500">240 bulan angsuran</span>
                <span className="text-[10px] sm:text-xs font-medium text-blue-400 flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 mr-1.5 sm:mr-2 animate-pulse"></span>
                  {isSyncing ? "Menghubungkan Cloud..." : "Tersinkronisasi ke Cloud"}
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 1.5 SHOPEE MENU - BARU TIDAK GANGGU SUPABASE
  if (view === 'shopee') {
    return (
      <div className="flex flex-col items-center justify-start pt-24 sm:pt-32 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-orange-500/30 relative px-4">
        <button onClick={() => setView('home')} className="absolute top-6 left-4 sm:top-12 sm:left-12 flex items-center text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50">
          <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="text-sm sm:text-base">Kembali</span>
        </button>

        <div className="w-16 h-16 mb-6 rounded-2xl bg-[#111827] border border-slate-700/60 flex items-center justify-center shadow-xl shadow-orange-500/10 text-orange-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 mb-8 sm:mb-12 tracking-tight">Shopee</h1>
        
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm">
          <button onClick={() => setView('game_ps1')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 group justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shrink-0">PS1</div>
            <div className="flex flex-col items-start">
              <span className="text-base font-medium text-slate-200 group-hover:text-white transition-colors">Game PS1 for Android</span>
              <span className="text-[11px] text-slate-500">{GAME_PS1_DATA.length} game • Auto board</span>
            </div>
          </button>

          <button onClick={() => setView('game_psp')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 group justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">PSP</div>
            <div className="flex flex-col items-start">
              <span className="text-base font-medium text-slate-200 group-hover:text-white transition-colors">Game PSP for Android</span>
              <span className="text-[11px] text-slate-500">{GAME_PSP_DATA.length} game • PPSSPP Gold</span>
            </div>
          </button>

          <button onClick={() => setView('game_apk')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 group justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0">APK</div>
            <div className="flex flex-col items-start">
              <span className="text-base font-medium text-slate-200 group-hover:text-white transition-colors">Game APK</span>
              <span className="text-[11px] text-slate-500">{GAME_APK_DATA.length} game • Auto board</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // 6. GAME PS1 FOR ANDROID - BARU - TABEL MIRIP ANGSURAN + BOARD OTOMATIS
  if (view === 'game_ps1') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-orange-500/30 overflow-hidden">
        <header className="shrink-0 py-5 sm:py-7 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('shopee')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center mt-1 sm:mt-0">Game PS1 for Android</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">{GAME_PS1_DATA.length} game ready • Centang untuk masuk board</p>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-8 flex flex-col gap-4 w-full max-w-5xl mx-auto">
          
          {/* BOARD INFORMASI - KECIL + EMAIL/WA SWITCH + JUMLAH FILE */}
          <div className="bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-3 sm:px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Board Informasi Pembeli</span>
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">{selectedGamesList.length} dipilih</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center bg-[#0B0F19] border border-slate-700/60 rounded-lg p-0.5">
                  <button onClick={() => setBoardFormat('email')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${boardFormat==='email' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-300'}`}>Email</button>
                  <button onClick={() => setBoardFormat('whatsapp')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${boardFormat==='whatsapp' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>WhatsApp</button>
                </div>
                <button 
                  onClick={handleCopyBoard}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[10px] transition-all transform active:scale-95 shadow-md ml-auto sm:ml-0 ${gameCopySuccess ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                >
                  {gameCopySuccess ? (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      Tercopy!
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy {boardFormat==='whatsapp' ? 'WA' : 'Email'}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 text-[10px] sm:text-[11px] leading-[1.5] text-slate-300 bg-[#0B0F19] break-words font-sans">
              <div className="space-y-3">
                <div>
                  <p className={`${boardFormat==='email' ? 'italic text-slate-300' : 'text-slate-300'} text-[10px]`}>{boardFormat==='whatsapp' ? '_Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]_' : 'Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]'}</p>
                </div>

                <div className="border border-slate-800/60 rounded-lg p-2.5 bg-[#111827]">
                  <p className={`${boardFormat==='email' ? 'font-bold' : ''} text-orange-300 mb-0.5 text-[11px]`}>{boardFormat==='whatsapp' ? '*Download & Install ePSXe*' : 'Download & Install ePSXe'}</p>
                  <p className="text-slate-500 text-[9px] mb-1.5">Informasi: ini adalah emulator, sebuah aplikasi di Android yang berfungsi menjalankan game-game PS 1</p>
                  <p className="text-slate-300 text-[10px]">Link: <a href="https://www.mediafire.com/file/y2ze58to38d6va8/ePSXe.apk/file" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline break-all text-[10px]">https://www.mediafire.com/file/y2ze58to38d6va8/ePSXe.apk/file</a></p>
                </div>

                <div className="border border-slate-800/60 rounded-lg p-2.5 bg-[#111827]">
                  <p className={`${boardFormat==='email' ? 'font-bold' : ''} text-emerald-300 mb-0.5 text-[11px]`}>{boardFormat==='whatsapp' ? '*Download Game PS 1*' : 'Download Game PS 1'}</p>
                  <p className="text-slate-500 text-[9px] mb-2">Informasi: ini adalah game PS1, setelah selesai proses download, langsung buka aplikasi ePSXe yang sudah di instal sebelumnya dan buka game nya dari aplikasi tersebut</p>
                  
                  {selectedGamesList.length === 0 ? (
                    <div className="py-3 text-center border border-dashed border-slate-700/60 rounded-lg">
                      <p className="text-slate-500 text-[10px] italic">Belum ada game dipilih</p>
                      <p className="text-slate-600 text-[9px] mt-0.5">Centang game di tabel bawah</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedGamesList.map((g) => {
                        const jumlah = getJumlahFileDisplay(g);
                        const multi = isMultiFile(g);
                        return (
                          <div key={g.no} className="bg-[#0B0F19] border border-slate-800/40 rounded-md p-2">
                            <p className="text-slate-200 font-semibold text-[10px]">Judul: <span className="text-white font-bold">{g.nama}</span></p>
                            <p className="text-slate-400 mt-0.5 break-all text-[9px]">Link: <a href={g.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">{g.link}</a></p>
                            <p className="text-slate-400 mt-0.5 text-[9px]">Jumlah File: <span className="text-slate-200 font-medium">{jumlah}</span></p>
                            {multi && (
                              <p className="mt-1 text-[8px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded px-1.5 py-0.5">Download 1 per 1 file game ini, hasil download nya disarankan ditempatkan dalam 1 folder agar terlihat rapi.</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <p className={`${boardFormat==='email' ? 'font-bold' : ''} text-slate-100 text-[11px]`}>{boardFormat==='whatsapp' ? '*Cara Menjalankan Game nya*' : 'Cara Menjalankan Game nya'}</p>
                  <ol className="list-decimal ml-4 mt-0.5 space-y-0 text-slate-500 text-[10px]">
                    <li>Buka aplikasi ePSXe [ yang sudah di instal ]</li>
                    <li>Tap jalankan permainan</li>
                    <li>Scan game-nya atau cari file yang sudah didownload di aplikasi tersebut</li>
                    <li>Game auto muncul dan langsung bisa dimainkan</li>
                  </ol>
                </div>

                <div>
                  <p className={`${boardFormat==='email' ? 'font-bold' : ''} text-slate-100 text-[11px]`}>{boardFormat==='whatsapp' ? '*Tambahan informasi untuk Full Screen*' : 'Tambahan informasi untuk Full Screen'}</p>
                  <ol className="list-decimal ml-4 mt-0.5 space-y-0 text-slate-500 text-[10px]">
                    <li>Buka aplikasi ePSXe</li>
                    <li>Buka menu Preferences</li>
                    <li>Buka Touchscreen Gamepad</li>
                    <li>Buka Gamepad Skin Editor Landscape</li>
                    <li>Silahkan edit sesuai keinginan</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* TABEL GAME - STYLE MIRIP ANGSURAN */}
          <div className="bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 sm:px-6 py-3 bg-slate-900/50 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{filteredGames.length} game</span>
                <div className="relative flex-1 sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Cari game..." 
                    value={gameSearch} 
                    onChange={(e) => setGameSearch(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-orange-500"
                  />
                  <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedGamesList.length > 0 && (
                  <button onClick={() => setSelectedGameIds({})} className="text-[10px] px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700">Clear ({selectedGamesList.length})</button>
                )}
                <span className="text-[10px] text-slate-500 hidden sm:inline">Centang untuk kirim ke pembeli</span>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#111827] sticky top-0 z-10">
                  <tr>
                    <th className="py-3 pl-4 pr-2 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827]">No.</th>
                    <th className="py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center w-12">Pilih</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827]">Nama Game</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Link</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {filteredGames.map((g) => {
                    const isSelected = !!selectedGameIds[g.no];
                    return (
                      <tr key={g.no} className={`transition-colors ${isSelected ? 'bg-orange-500/10 border-l-2 border-orange-500' : 'hover:bg-slate-800/30'}`}>
                        <td className={`whitespace-nowrap py-3 pl-4 pr-2 text-[11px] font-medium ${isSelected ? 'text-orange-300' : 'text-slate-500'}`}>{String(g.no).padStart(2, '0')}</td>
                        <td className="whitespace-nowrap py-3 px-2 text-center">
                          <button 
                            onClick={() => toggleGameSelection(g.no)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-transparent'}`}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </button>
                        </td>
                        <td className={`px-3 py-3 text-[12px] sm:text-[13px] font-medium max-w-[200px] truncate ${isSelected ? 'text-white' : 'text-slate-200'}`} title={g.nama}>{g.nama}</td>
                        <td className="px-3 py-3 text-center">
                          <a href={g.link} target="_blank" rel="noopener noreferrer" className="inline-flex p-1.5 rounded-lg bg-slate-800/50 hover:bg-indigo-500/20 border border-slate-700/50 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 transition-colors" title="Buka Link">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${g.platform === 'Mediafire' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{g.platform}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 py-3 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">Total {GAME_PS1_DATA.length} game PS1 • Mirip jadwal angsuran</span>
              <span className="text-[10px] text-orange-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {selectedGamesList.length} terpilih siap copy
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }



  // 6.5 GAME PSP FOR ANDROID - BARU DIBAWAH PS1
  if (view === 'game_psp') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-blue-500/30 overflow-hidden">
        <header className="shrink-0 py-5 sm:py-7 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('shopee')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center mt-1 sm:mt-0">Game PSP for Android</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">{GAME_PSP_DATA.length} game ready • PPSSPP Gold</p>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-8 flex flex-col gap-4 w-full max-w-5xl mx-auto">
          
          {/* BOARD PSP - KECIL + EMAIL/WA */}
          <div className="bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-3 sm:px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Board Informasi Pembeli - PSP</span>
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">{selectedPspList.length} dipilih</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center bg-[#0B0F19] border border-slate-700/60 rounded-lg p-0.5">
                  <button onClick={() => setPspBoardFormat('email')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${pspBoardFormat==='email' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-300'}`}>Email</button>
                  <button onClick={() => setPspBoardFormat('whatsapp')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${pspBoardFormat==='whatsapp' ? 'bg-blue-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>WhatsApp</button>
                </div>
                <button 
                  onClick={handleCopyPspBoard}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[10px] transition-all transform active:scale-95 shadow-md ml-auto sm:ml-0 ${pspCopySuccess ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                >
                  {pspCopySuccess ? (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      Tercopy!
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy {pspBoardFormat==='whatsapp' ? 'WA' : 'Email'}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 text-[10px] sm:text-[11px] leading-[1.5] text-slate-300 bg-[#0B0F19] break-words font-sans">
              <div className="space-y-3">
                <div>
                  <p className={`${pspBoardFormat==='email' ? 'italic text-slate-300' : 'text-slate-300'} text-[10px]`}>{pspBoardFormat==='whatsapp' ? '_Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]_' : 'Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]'}</p>
                </div>

                <div className="border border-slate-800/60 rounded-lg p-2.5 bg-[#111827]">
                  <p className={`${pspBoardFormat==='email' ? 'font-bold' : ''} text-blue-300 mb-0.5 text-[11px]`}>{pspBoardFormat==='whatsapp' ? '*Download PPSSPP Gold*' : 'Download PPSSPP Gold'}</p>
                  <p className="text-slate-500 text-[9px] mb-1.5">Informasi: ini adalah emulator, sebuah aplikasi di Android yang berfungsi menjalankan game-game PSP</p>
                  <p className="text-slate-300 text-[10px]">Link: <a href="https://drive.google.com/file/d/1nUjdFZNjMwJMJSdNEeX-FI5kCk5HEwHG/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline break-all text-[10px]">https://drive.google.com/file/d/1nUjdFZNjMwJMJSdNEeX-FI5kCk5HEwHG/view?usp=sharing</a></p>
                </div>

                <div className="border border-slate-800/60 rounded-lg p-2.5 bg-[#111827]">
                  <p className={`${pspBoardFormat==='email' ? 'font-bold' : ''} text-emerald-300 mb-0.5 text-[11px]`}>{pspBoardFormat==='whatsapp' ? '*Download Game PSP*' : 'Download Game PSP'}</p>
                  <p className="text-slate-500 text-[9px] mb-2">Informasi: ini adalah game PSP, setelah selesai proses download, langsung buka aplikasi PPSSPP Gold yang sudah di instal sebelumnya dan buka game nya dari aplikasi tersebut</p>
                  
                  {selectedPspList.length === 0 ? (
                    <div className="py-3 text-center border border-dashed border-slate-700/60 rounded-lg">
                      <p className="text-slate-500 text-[10px] italic">Belum ada game dipilih</p>
                      <p className="text-slate-600 text-[9px] mt-0.5">Centang game di tabel bawah</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedPspList.map((g) => (
                        <div key={g.no} className="bg-[#0B0F19] border border-slate-800/40 rounded-md p-2">
                          <p className="text-slate-200 font-semibold text-[10px]">Judul: <span className="text-white font-bold">{g.nama}</span></p>
                          <p className="text-slate-400 mt-0.5 break-all text-[9px]">Link: <a href={g.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">{g.link}</a></p>
                          <p className="text-slate-400 mt-0.5 text-[9px]">Size: <span className="text-slate-200 font-medium">{g.ukuran}</span></p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className={`${pspBoardFormat==='email' ? 'font-bold' : ''} text-slate-100 text-[11px]`}>{pspBoardFormat==='whatsapp' ? '*Cara Menjalankan Game nya*' : 'Cara Menjalankan Game nya'}</p>
                  <ol className="list-decimal ml-4 mt-0.5 space-y-0 text-slate-500 text-[10px]">
                    <li>Buka aplikasi PPSSPP Gold</li>
                    <li>Pilih menu Games</li>
                    <li>Pilih Browse</li>
                    <li>Cari hasil download game di tempat penyimpanan Hp</li>
                    <li>Selesai, selamat bermain</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* TABEL PSP - STYLE MIRIP ANGSURAN */}
          <div className="bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 sm:px-6 py-3 bg-slate-900/50 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{filteredPsp.length} game</span>
                <div className="relative flex-1 sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Cari game PSP..." 
                    value={pspSearch} 
                    onChange={(e) => setPspSearch(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-blue-500"
                  />
                  <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedPspList.length > 0 && (
                  <button onClick={() => setSelectedPspIds({})} className="text-[10px] px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700">Clear ({selectedPspList.length})</button>
                )}
                <span className="text-[10px] text-slate-500 hidden sm:inline">Centang untuk kirim ke pembeli</span>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead className="bg-[#111827] sticky top-0 z-10">
                  <tr>
                    <th className="py-3 pl-4 pr-2 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827]">No.</th>
                    <th className="py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center w-12">Pilih</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827]">Nama Game</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Size</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Link</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {filteredPsp.map((g) => {
                    const isSelected = !!selectedPspIds[g.no];
                    return (
                      <tr key={g.no} className={`transition-colors ${isSelected ? 'bg-blue-500/10 border-l-2 border-blue-500' : 'hover:bg-slate-800/30'}`}>
                        <td className={`whitespace-nowrap py-3 pl-4 pr-2 text-[11px] font-medium ${isSelected ? 'text-blue-300' : 'text-slate-500'}`}>{String(g.no).padStart(2, '0')}</td>
                        <td className="whitespace-nowrap py-3 px-2 text-center">
                          <button 
                            onClick={() => togglePspSelection(g.no)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-transparent'}`}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </button>
                        </td>
                        <td className={`px-3 py-3 text-[12px] sm:text-[13px] font-medium max-w-[200px] truncate ${isSelected ? 'text-white' : 'text-slate-200'}`} title={g.nama}>{g.nama}</td>
                        <td className="px-3 py-3 text-center"><span className="text-[10px] font-mono text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">{g.ukuran}</span></td>
                        <td className="px-3 py-3 text-center">
                          <a href={g.link} target="_blank" rel="noopener noreferrer" className="inline-flex p-1.5 rounded-lg bg-slate-800/50 hover:bg-indigo-500/20 border border-slate-700/50 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 transition-colors" title="Buka Link">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase border bg-blue-500/10 text-blue-400 border-blue-500/20">{g.platform}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 py-3 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">Total {GAME_PSP_DATA.length} game PSP • PPSSPP Gold</span>
              <span className="text-[10px] text-blue-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                {selectedPspList.length} terpilih siap copy
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }



  // 7. GAME APK - BARU - COPY KONSEP PS1
  if (view === 'game_apk') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-hidden">
        <header className="shrink-0 py-5 sm:py-7 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('shopee')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center mt-1 sm:mt-0">Game APK</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">{GAME_APK_DATA.length} game ready • Centang untuk masuk board</p>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-8 flex flex-col gap-4 w-full max-w-5xl mx-auto">
          
          {/* BOARD APK - KECIL + EMAIL/WA */}
          <div className="bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-3 sm:px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Board Informasi Pembeli - APK</span>
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{selectedApkList.length} dipilih</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center bg-[#0B0F19] border border-slate-700/60 rounded-lg p-0.5">
                  <button onClick={() => setApkBoardFormat('email')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${apkBoardFormat==='email' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-300'}`}>Email</button>
                  <button onClick={() => setApkBoardFormat('whatsapp')} className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${apkBoardFormat==='whatsapp' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}>WhatsApp</button>
                </div>
                <button 
                  onClick={handleCopyApkBoard}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[10px] transition-all transform active:scale-95 shadow-md ml-auto sm:ml-0 ${apkCopySuccess ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                >
                  {apkCopySuccess ? (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      Tercopy!
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy {apkBoardFormat==='whatsapp' ? 'WA' : 'Email'}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 text-[10px] sm:text-[11px] leading-[1.5] text-slate-300 bg-[#0B0F19] break-words font-sans">
              <div className="space-y-3">
                <div>
                  <p className={`${apkBoardFormat==='email' ? 'italic text-slate-300' : 'text-slate-300'} text-[10px]`}>{apkBoardFormat==='whatsapp' ? '_Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]_' : 'Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]'}</p>
                </div>

                <div className="border border-slate-800/60 rounded-lg p-2.5 bg-[#111827]">
                  <p className={`${apkBoardFormat==='email' ? 'font-bold' : ''} text-emerald-300 mb-0.5 text-[11px]`}>{apkBoardFormat==='whatsapp' ? '*Download Game Android*' : 'Download Game Android'}</p>
                  
                  {selectedApkList.length === 0 ? (
                    <div className="py-3 text-center border border-dashed border-slate-700/60 rounded-lg mt-1.5">
                      <p className="text-slate-500 text-[10px] italic">Belum ada game dipilih</p>
                      <p className="text-slate-600 text-[9px] mt-0.5">Centang game di tabel bawah</p>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-1.5">
                      {selectedApkList.map((g) => (
                        <div key={g.no} className="bg-[#0B0F19] border border-slate-800/40 rounded-md p-2">
                          <p className="text-slate-200 font-semibold text-[10px]">Judul: <span className="text-white font-bold">{g.nama}</span></p>
                          <p className="text-slate-400 mt-0.5 break-all text-[9px]">Link: <a href={g.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">{g.link}</a></p>
                          <p className="text-slate-400 mt-0.5 text-[9px]">Size: <span className="text-slate-200 font-medium">{g.ukuran}</span></p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className={`${apkBoardFormat==='email' ? 'font-bold' : ''} text-slate-100 text-[11px]`}>{apkBoardFormat==='whatsapp' ? '*Cara Instal Game Android*' : 'Cara Instal Game Android'}</p>
                  <ol className="list-decimal ml-4 mt-0.5 space-y-0 text-slate-500 text-[10px]">
                    <li>Tap file apk [ hasil download game-nya ]</li>
                    <li>Ikuti proses instal</li>
                    <li>Beres, langsung main</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* TABEL APK - STYLE MIRIP ANGSURAN */}
          <div className="bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 sm:px-6 py-3 bg-slate-900/50 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{filteredApk.length} game</span>
                <div className="relative flex-1 sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Cari game APK..." 
                    value={apkSearch} 
                    onChange={(e) => setApkSearch(e.target.value)}
                    className="w-full bg-[#0B0F19] border border-slate-700 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-emerald-500"
                  />
                  <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedApkList.length > 0 && (
                  <button onClick={() => setSelectedApkIds({})} className="text-[10px] px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700">Clear ({selectedApkList.length})</button>
                )}
                <span className="text-[10px] text-slate-500 hidden sm:inline">Centang untuk kirim ke pembeli</span>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead className="bg-[#111827] sticky top-0 z-10">
                  <tr>
                    <th className="py-3 pl-4 pr-2 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827]">No.</th>
                    <th className="py-3 px-2 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center w-12">Pilih</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827]">Nama Game</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Size</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Link</th>
                    <th className="py-3 px-3 text-[10px] font-semibold text-slate-400 uppercase bg-[#111827] text-center">Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {filteredApk.map((g) => {
                    const isSelected = !!selectedApkIds[g.no];
                    return (
                      <tr key={g.no} className={`transition-colors ${isSelected ? 'bg-emerald-500/10 border-l-2 border-emerald-500' : 'hover:bg-slate-800/30'}`}>
                        <td className={`whitespace-nowrap py-3 pl-4 pr-2 text-[11px] font-medium ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>{String(g.no).padStart(2, '0')}</td>
                        <td className="whitespace-nowrap py-3 px-2 text-center">
                          <button 
                            onClick={() => toggleApkSelection(g.no)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-transparent'}`}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </button>
                        </td>
                        <td className={`px-3 py-3 text-[12px] sm:text-[13px] font-medium max-w-[200px] truncate ${isSelected ? 'text-white' : 'text-slate-200'}`} title={g.nama}>{g.nama}</td>
                        <td className="px-3 py-3 text-center"><span className="text-[10px] font-mono text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">{g.ukuran}</span></td>
                        <td className="px-3 py-3 text-center">
                          <a href={g.link} target="_blank" rel="noopener noreferrer" className="inline-flex p-1.5 rounded-lg bg-slate-800/50 hover:bg-indigo-500/20 border border-slate-700/50 hover:border-indigo-500/30 text-slate-400 hover:text-indigo-400 transition-colors" title="Buka Link">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{g.platform}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 py-3 flex justify-between items-center">
              <span className="text-[10px] text-slate-500">Total {GAME_APK_DATA.length} game APK • Mirip jadwal angsuran</span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {selectedApkList.length} terpilih siap copy
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }

}
