'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const generateAngsuranData = () => {
  const data = []; let startDate = new Date('2022-10-25');
  for (let i = 1; i <= 240; i++) {
    let amount = "0";
    if (i >= 1 && i <= 12) amount = "2,721,798.00"; else if (i >= 13 && i <= 24) amount = "2,857,887.90"; else if (i >= 25 && i <= 36) amount = "3,000,782.30"; else if (i >= 37 && i <= 48) amount = "3,150,821.41"; else if (i >= 49 && i <= 60) amount = "3,308,362.48"; else if (i >= 61 && i <= 239) amount = "4,064,640.85"; else if (i === 240) amount = "4,064,642.33";
    const fullDate = startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-'); const monthYear = startDate.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-'); data.push({ no: i, tanggal: fullDate, monthYear, totalBayar: amount }); startDate.setMonth(startDate.getMonth() + 1);
  } return data;
};

const GAME_PS1_DATA = [
{"no":1,"nama":" 【entity-Disney¦canonical_name=Disney】 Pixar Toys Story","link":"https://www.mediafire.[STRIPPED 80 bytes]%2521_%2528USA%2529.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":2,"nama":"Harvest Moon - Back to Nature","link":"https://www.mediafire.com/file/v3qfdwcnttvcyhh/Harvest_Moon_-_Back_to_Nature_%2528_Indonesia_%2529_.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":3,"nama":" Nascar Rumble","link":"https://www.mediafire.com/file/q172fhpvc8xqj8w/NASCAR_Rumble_%2528USA%2529.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":4,"nama":"Pepsi Man","link":"https://drive.google.com/drive/folders/186fcpz7Jn4hAmVX_CcozCuCMvMAEHVuT?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"8","status":"OK","keterangan":"8 Files"},
{"no":5,"nama":"Metal Slug X","link":"https://www.mediafire.com/file/lqv4xoci5rotuzp/Metal_Slug_X.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":6,"nama":"Gallop","link":"https://drive.google.com/drive/folders/1ZaqbYqRo_ruw8YDKOgHA1VqvE-SLVuVv?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"2","status":"OK","keterangan":"2 Files"},
{"no":7,"nama":" 【entity-Tony Hawk¦canonical_name=Tony Hawk】","link":"https://www.mediafire.com/file/ss16373lufhxstk/Tony_Hawk%2527s_Pro_Skater.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":8,"nama":"Vigilante 2nd Offense","link":"https://drive.google.com/drive/folders/1XGFg4pRvEbgUWvFbw6T0JpFeSLUMpKzb?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"17","status":"OK","keterangan":"17 Files"},
{"no":9,"nama":"Gran Turismo","link":"https://www.mediafire.com/file/k4h1kjc2kgjvw8b/Gran_Turismo_%2528v1.1%2529.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":10,"nama":"Gran Turismo 2","link":"https://www.mediafire.com/file/prv9pjy7ayslxge/Gran_Turismo_2_.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":11,"nama":" 【entity-Jackie Chan¦canonical_name=Jackie Chan】 Stuntmaster","link":"https://www.mediafire.com/file/knmb2vu9bx56pcp/Jackie_Chan_Stuntmaster.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":12,"nama":"Super Shot Soccer","link":"https://www.mediafire.com/folder/gw2nhqf157rwr/SUPER_SHOT_SOCCER","platform":"Mediafire","tipe":"Folder","jumlah":"7","status":"OK","keterangan":"7 Files"},
{"no":13,"nama":"Tenchu","link":"https://www.mediafire.com/file/9rzoovjtlzztdsr/Tenchu_-_Stealth_Assassins.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":14,"nama":"CTR","link":"https://www.mediafire.com/file/5lq44sn40n2rpjr/CTR_-_Crash_Team_Racing.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":15,"nama":"GTA","link":"https://drive.google.com/drive/folders/1CT-mRU02_tm11_BrWs8BxbIZcp2tbM5Z?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"","status":"OK","keterangan":""},
{"no":16,"nama":"GTA 2","link":"https://www.mediafire.com/file/y5v9fuhqipx6lzc/Grand_Theft_Auto_2.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":17,"nama":"Naruto - Shinobi no Sato no Jintori Gassen","link":"https://www.mediafire.[STRIPPED 68 bytes].bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":18,"nama":"WWF SmackDown! 2","link":"https://www.mediafire.com/file/exwiz57hn7mazws/WWF_SmackDown%2521_2_.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":19,"nama":"Celebrity Death Match MTV","link":"https://www.mediafire.com/file/71tx1phikn2btca/MTV_Celebrity_Deathmatch.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":20,"nama":"DINO CRISIS","link":"https://www.mediafire.com/folder/96lz9mr54gdgc/DINO_CRISIS","platform":"Mediafire","tipe":"Folder","jumlah":"","status":"OK","keterangan":""},
{"no":21,"nama":"DIGIMON WORLD","link":"https://www.mediafire.com/file/wl5y7ece4xmdyz5/Digimon_World.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":22,"nama":" 【entity-FINAL FANTASY VII¦canonical_name=FINAL FANTASY VII】","link":"https://www.mediafire.com/file/gpuzfygkznfel9t/Final_Fantasy_VII_.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":23,"nama":"My 【entity-Disney¦canonical_name=Disney】 Kitchen","link":"https://www.mediafire.com/file/5h33xayp0cjyg6v/My_Disney_Kitchen.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"Duplikat","keterangan":""},
{"no":24,"nama":" 【entity-Crash Bandicoot¦canonical_name=Crash Bandicoot】","link":"https://www.mediafire.com/file/0qs8sxt0uots935/Crash_Bandicoot.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"Duplikat","keterangan":""},
{"no":25,"nama":"TARZAN","link":"https://drive.google.com/drive/folders/1JOKLXBkePolMTbMcOMTPOVJ3JkVghowt?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"2","status":"OK","keterangan":"2 Files"},
{"no":26,"nama":"WINNING ELEVEN 2002","link":"https://www.mediafire.com/file/s5z41ct7nq57awl/World_Soccer_Winning_Eleven_2002_%2528Japan%2529_%2528Track_1%2529_%255BEnglish%255D.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":27,"nama":"SARGES HEROE'S 2","link":"https://www.mediafire.com/file/iqotdjswd3s5zk1/Army_Men_-_Sarge%2527s_Heroes.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":28,"nama":"SPYRO THE DRAGON","link":"https://www.mediafire.com/file/vo0b95gyobdavkt/Spyro_the_Dragon.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":29,"nama":"SYPHON FILTER","link":"https://www.mediafire.com/file/dux3r5ud0gj1a3i/Syphon_Filter.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":30,"nama":" 【entity-FINAL FANTASY TACTICS¦canonical_name=FINAL FANTASY VII】","link":"https://www.mediafire.com/file/1vn3401rrw3c05f/Final_Fantasy_Tactics.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":31,"nama":"SUIKODEN II","link":"https://www.mediafire.com/file/4oi4heo8yud7sd5/Suikoden_II.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":32,"nama":" 【entity-PACMAN¦canonical_name=PACMAN】","link":"https://drive.google.com/drive/folders/1Z6J-UKfx6JYlN6tlL-Rmscbdy_8LyxtP?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"23","status":"OK","keterangan":"23 Files"},
{"no":33,"nama":"Yugioh Forbidden Memories","link":"https://www.mediafire.com/file/xhmkn054ibowyey/Yu-Gi-Oh_Forbidden_Memories.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":34,"nama":" 【entity-Crash Bandicoot¦canonical_name=Crash Bandicoot】","link":"https://www.mediafire.com/file/0qs8sxt0uots935/Crash_Bandicoot.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"Duplikat","keterangan":""},
{"no":35,"nama":"Road Rash Jailbreak","link":"https://www.mediafire.com/file/bozabg9b2qykav0/Road_Rash_-_Jailbreak.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":36,"nama":"Worms Armageddon","link":"https://www.mediafire.com/file/ga2ume05yg1rm17/Worms_Armageddon.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":37,"nama":" 【entity-Pink Panther¦canonical_name=Pink Panther】 Pinkadelic Pursuit","link":"https://drive.google.com/drive/folders/1HQY722hlRDrp6e5tLuwqX40zekJv5Sps?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"23","status":"OK","keterangan":"23 Files"},
{"no":38,"nama":"Bomberman World","link":"https://www.mediafire.com/file/xg5k0f4ihvjkexp/Bomberman_World.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":39,"nama":"Resident Evil 3 Nemesis","link":"https://www.mediafire.com/file/mtik3vqaallx8nx/Resident_Evil_3_-_Nemesis_.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":40,"nama":"Inspector Gadget","link":"https://drive.google.com/drive/folders/1fZ5YJjplAPH4zfsreIgKvnZ0EhCvNbpM?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"12","status":"OK","keterangan":"12 Files"},
{"no":41,"nama":"My Disney Kitchen","link":"https://www.mediafire.com/file/kc0sz888x28cizv/My_Disney_Kitchen.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"Duplikat","keterangan":""},
{"no":42,"nama":"Monkey Magic","link":"https://www.mediafire.com/file/2qphwziijdpvkww/Monkey_Magic.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":43,"nama":"Resident Evil","link":"https://www.mediafire.com/file/rsy92xota4uehj5/Resident_Evil_%2528USA%2529.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":44,"nama":"Tintin","link":"https://www.mediafire.com/file/m36ot3befthv88g/Tintin_-_Destination_Adventure.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":45,"nama":"Dark Omen","link":"https://drive.google.com/file/d/1wP6XWCeC8AaylzpqsdSRkZ7PCFOaacig/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":46,"nama":"Lilo & Stitch","link":"https://www.mediafire.com/file/spz6z3lnfpwcy4q/Disney%2527s_Lilo_%2526_Stitch.bin/file","platform":"Mediafire","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":47,"nama":" 【entity-Disney Pooh's Party Game¦canonical_name=Disney】","link":"https://drive.google.com/drive/folders/1_JEPBhd_Wz-V1qrhDgGbxxIqn1y4UDHK?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"2","status":"OK","keterangan":"2 Files"},
{"no":48,"nama":"Dynasty Warriors","link":"https://drive.google.com/file/d/1CnKKcDdd6Qmr8IgtolqUzF6TvsQRvLLP/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":49,"nama":"3Xtreme","link":"https://drive.google.com/drive/folders/1zZiHQj-Zm2vfM_X0A9SlFvGY2Sc3L_bR?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"2","status":"OK","keterangan":"2 Files"},
{"no":50,"nama":"Chocoboco Racing","link":"https://drive.google.com/file/d/16u_f2L_oORHKpUl_iigdYjAWAfa4XZ4-/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":51,"nama":"Tomba!","link":"https://drive.google.com/file/d/16YIPK7XGidUPVH-ZGtrUrRmeRx46_8gY/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":52,"nama":"Tomba!2","link":"https://drive.google.com/drive/folders/1KU_1ZEs0aRepFGc4avelkYrOqCDefAxu?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"","status":"OK","keterangan":""},
{"no":53,"nama":"Hercs Adventures","link":"https://drive.google.com/file/d/1ZiZNkiLWY_qwB-RS1SRYYgiDLDUA0EtS/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":54,"nama":"Digimon Rumble","link":"https://drive.google.com/file/d/1pggNuR5yg74zYScibj3RDPtjmTOtmtIj/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":55,"nama":"Command & Conquer red alert","link":"https://drive.google.com/drive/folders/13pT74wSJNSmIHXVTm8uoSmhMNSdTQAsO?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"2","status":"OK","keterangan":"2 Files"},
{"no":56,"nama":"Tenchu 2","link":"https://drive.google.com/file/d/1Oy9RiltCupJtQY5FpPLb9KX5OOWifIev/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":57,"nama":" 【entity-Hot Wheels¦canonical_name=Hot Wheels】","link":"https://drive.google.com/drive/folders/18fVlHMWbQ2QlGAWGSJWvo6hb8FM25DNJ?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"","status":"OK","keterangan":""},
{"no":58,"nama":" 【entity-Crash Bandicoot¦canonical_name=Crash Bandicoot】 2","link":"https://drive.google.com/file/d/1wVGF7F06rfTsTr9OYH0bl2MFOn2i7zbh/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":59,"nama":"Ms 【entity-Pacman¦canonical_name=PACMAN】","link":"https://drive.google.com/drive/folders/1GvBlPYW9EVLNAt-puqmKsilHDgoo8bta?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"8","status":"OK","keterangan":"8 Files"},
{"no":60,"nama":"Twisted Metal 4","link":"https://drive.google.com/drive/folders/1OxhLNg0jVoelK8ezzOqv0WnyLyQWiopH?usp=sharing","platform":"Google Drive","tipe":"Folder","jumlah":"24","status":"OK","keterangan":"24 Files"},
{"no":61,"nama":"Big Ol Bass 2","link":"https://drive.google.com/file/d/1h6y9yrQ5kKSzWI2xBccWVw989fvo7PNw/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""},
{"no":62,"nama":"Spiderman","link":"https://drive.google.com/file/d/1cTg7yS3BBt76xZdA2xQ-k5rpF7AfVSz3/view?usp=sharing","platform":"Google Drive","tipe":"File BIN","jumlah":"-","status":"OK","keterangan":""}
];
const GAME_APK_DATA = [
{"no":1,"nama":"Bully 【entity-Rockstar¦canonical_name=Rockstar】","link":"https://drive.google.com/file/d/1N4PEzgQeCdN-UVWHucC7NnptY-14x0ZH/view?usp=sharing","ukuran":"1.98 GB","platform":"Google Drive","tipe":"APK","status":"OK"},
{"no":2,"nama":" 【entity-Monopoly¦canonical_name=Monopoly】","link":"https://drive.google.com/file/d/1nhJq4DHW6u3Z2e4bCzgFj3lnbwQuBf02/view?usp=sharing","ukuran":"579 MB","platform":"Google Drive","tipe":"APK","status":"OK"},
{"no":3,"nama":"My Time at Portia","link":"https://drive.google.com/file/d/18MBLqpZV91Zk_qHaU455ZZ5aDLAPJ8fq/view?usp=sharing","ukuran":"1.07 GB","platform":"Google Drive","tipe":"APK","status":"OK"}
];
const GAME_PSP_DATA = [
{"no":1,"nama":"Silent Hill","link":"https://drive.google.com/file/d/19tLzTL5Hr-9Q6-JK-a4ODxWa5wl0zJvB/view?usp=sharing","ukuran":"767 MB","platform":"Google Drive","konsol":"PSP"},
{"no":2,"nama":"Def Jam","link":"https://drive.google.com/file/d/1Fo35ce-hzzI8h3kFOvKdZVPFryNF2o76/view?usp=sharing","ukuran":"1.5 GB","platform":"Google Drive","konsol":"PSP"},
{"no":3,"nama":"Asphalt - Urban GT 2","link":"https://drive.google.com/file/d/1G-7S2vuzcWUIBQW7dxJQsyDTTWOPMMT2/view?usp=sharing","ukuran":"843 MB","platform":"Google Drive","konsol":"PSP"},
{"no":4,"nama":"Harvest Moon Boy & Girl","link":"https://drive.google.com/file/d/1RUAPJwE-LlXXP9sFMIJnTLEypR4eU5JE/view?usp=sharing","ukuran":"325 MB","platform":"Google Drive","konsol":"PSP"},
{"no":5,"nama":" 【entity-Harry Potter¦canonical_name=Harry Potter】 & The Goblet Of Fire","link":"https://drive.google.com/file/d/1gGWvWAWa-gyNEqAKkflEoMzdX6vRx3f5/view?usp=sharing","ukuran":"391 MB","platform":"Google Drive","konsol":"PSP"},
{"no":6,"nama":"Ben10","link":"https://drive.google.com/file/d/1lxCA30IqE72gTSVvqR5dWg100T7qKWiM/view?usp=sharing","ukuran":"653 MB","platform":"Google Drive","konsol":"PSP"},
{"no":7,"nama":"【entity-Fifa¦canonical_name=Fifa】 14","link":"https://drive.google.com/file/d/1W1too1tyTE5k-PyoeyeBdUjWTzTzDQqP/view?usp=sharing","ukuran":"1.2 GB","platform":"Google Drive","konsol":"PSP"},
{"no":8,"nama":"Dragon Ball Z Budokai","link":"https://drive.google.com/file/d/10swqNiN6IE3gJpVhnc5eLzWbBvdNOp7x/view?usp=sharing","ukuran":"827 MB","platform":"Google Drive","konsol":"PSP"},
{"no":9,"nama":"【entity-Fifa¦canonical_name=Fifa】 Street 2","link":"https://drive.google.com/file/d/1drk3orl6c54v5PTx3ZiBEZEjfU1_YhfS/view?usp=sharing","ukuran":"861 MB","platform":"Google Drive","konsol":"PSP"},
{"no":10,"nama":" 【entity-Lego Batman¦canonical_name=Lego Batman】","link":"https://drive.google.com/file/d/1o981aBdXxYnIGoYRfX0DGL9sMFIry4Aq/view?usp=sharing","ukuran":"1.06 GB","platform":"Google Drive","konsol":"PSP"},
{"no":11,"nama":"【entity-NBA¦canonical_name=NBA】 2k12","link":"https://drive.google.com/file/d/1Av9LZTte6-iWarqgr9OXdOghmbBnop-w/view?usp=sharing","ukuran":"1.4 GB","platform":"Google Drive","konsol":"PSP"},
{"no":12,"nama":"GTA Vice City","link":"https://drive.google.com/file/d/1VVrtyOOTsAiz5rBt6Ys4yAC8QT5jBhvs/view?usp=sharing","ukuran":"1.58 GB","platform":"Google Drive","konsol":"PSP"},
{"no":13,"nama":"【entity-God of War¦canonical_name=God of War】 Ghost of Sparta","link":"https://drive.google.com/file/d/1h1tdwfvdmqJQRWHqj1jRhf2KQkNEwsHP/view?usp=sharing","ukuran":"1.63 GB","platform":"Google Drive","konsol":"PSP"},
{"no":14,"nama":"【entity-Tekken¦canonical_name=Tekken】 6","link":"https://drive.google.com/file/d/1JbFBurcRZxjG6Z8PP0cvIwvnQ7vy2K3u/view?usp=sharing","ukuran":"816 MB","platform":"Google Drive","konsol":"PSP"},
{"no":15,"nama":"Metal Slug Anthology","link":"https://drive.google.com/file/d/1V2thXFfHyXiM_TU_PMc31WRNdP_WKV24/view?usp=sharing","ukuran":"1.24 GB","platform":"Google Drive","konsol":"PSP"}
];

const parseImageUrl = (url) => {
  if (!url) return '';
  let m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/); if (!m) m = url.match(/id=([a-zA-Z0-9_-]+)/); if (!m) m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m && m[1]) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  return url;
};

// FIXED PROMPT CARD - TANPA SVG DI BUTTON HAPUS, ANTI ERROR TURBOPACK
function PromptCard({ p, onDelete, copyToClipboard, copySuccess }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = [p.image1, p.image2, p.image3].filter(i => i && i.trim() !== '');
  const next = (e) => { e.stopPropagation(); setActiveSlide(s => s === images.length - 1 ? 0 : s + 1); };
  const prev = (e) => { e.stopPropagation(); setActiveSlide(s => s === 0 ? images.length - 1 : s - 1); };
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group shadow-lg bg-slate-900 animate-fadeIn cursor-pointer">
      {images.length > 0 ? <img src={parseImageUrl(images[activeSlide])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">{p.title}</h3>
          <button onClick={(e) => { e.stopPropagation(); onDelete(p.id); }} className="w-6 h-6 rounded-full bg-black/60 hover:bg-red-500 text-white flex items-center justify-center text-xs shrink-0">X</button>
        </div>
        <div className="flex-1 flex items-center justify-between">
          {images.length > 1 ? <><button onClick={prev} className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center">‹</button><button onClick={next} className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center">›</button></> : <div></div>}
        </div>
        <div className="flex flex-col items-center gap-2">
          {images.length > 1 && <div className="flex gap-1">{images.map((_, i) => <div key={i} className={i === activeSlide ? "w-1.5 h-1.5 rounded-full bg-white" : "w-1.5 h-1.5 rounded-full bg-white/40"} />)}</div>}
          <button onClick={(e) => { e.stopPropagation(); copyToClipboard(p.prompt_text || p.text, p.id); }} className={copySuccess === p.id ? "px-3 py-1 rounded-full text-xs bg-emerald-500 text-white" : "px-3 py-1 rounded-full text-xs bg-white/20 text-white"}>{copySuccess === p.id ? "Copied!" : "Copy Prompt"}</button>
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
  const [nominalHarianInput, setNominalHarianInput] = useState('');
  const [nominalHarianValue, setNominalHarianValue] = useState(0);
  const [prompts, setPrompts] = useState([]);
  const [showPromptForm, setShowPromptForm] = useState(false);
  const [promptForm, setPromptForm] = useState({ title: '', image1: '', image2: '', image3: '', text: '', category: 'gemini' });
  const [copySuccess, setCopySuccess] = useState(null);
  const [promptTab, setPromptTab] = useState('gemini');
  const [selectedGameIds, setSelectedGameIds] = useState({});
  const [gameCopySuccess, setGameCopySuccess] = useState(false);
  const [gameSearch, setGameSearch] = useState('');
  const [selectedApkIds, setSelectedApkIds] = useState({});
  const [apkCopySuccess, setApkCopySuccess] = useState(false);
  const [apkSearch, setApkSearch] = useState('');
  const [apkBoardFormat, setApkBoardFormat] = useState('email');
  const [selectedPspIds, setSelectedPspIds] = useState({});
  const [pspCopySuccess, setPspCopySuccess] = useState(false);
  const [pspSearch, setPspSearch] = useState('');
  const [pspBoardFormat, setPspBoardFormat] = useState('email');
  const angsuranData = generateAngsuranData();

  useEffect(() => {
    const now = new Date(); setCurrentDate(now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })); setCurrentMonthId(now.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-'));
    const fetchData = async () => {
      if (!supabase) { setIsSyncing(false); return; }
      const { data: proofData } = await supabase.from('angsuran_rumah').select('*'); if (proofData) { const lp = {}; proofData.forEach(i => lp[i.no_angsuran] = i.link_bukti); setProofs(lp); }
      const { data: trxData } = await supabase.from('transaksi_keuangan').select('*').order('id', { ascending: false }); if (trxData) setTransactions(trxData);
      const { data: promptData } = await supabase.from('prompts_gallery').select('*').order('id', { ascending: false }); if (promptData) { const mig = promptData.map(p => ({ ...p, category: p.category || 'gemini' })); setPrompts(mig); }
      setIsSyncing(false);
    }; fetchData();
  }, []);

  const handleNumClick = (num) => { if (pinCode.length < 6) { setPinCode(prev => prev + num); setPinError(false); } };
  const handleDeletePin = () => { setPinCode(prev => prev.slice(0, -1)); setPinError(false); };
  useEffect(() => { if (pinCode.length === 6) { if (pinCode === '010525') { setTimeout(() => { setView('home'); setPinCode(''); }, 150); } else { setPinError(true); setTimeout(() => { setPinCode(''); setPinError(false); }, 600); } } }, [pinCode]);
  const handleAmountChange = (e) => { const raw = e.target.value.replace(/[^0-9]/g, ''); setAmountInput(raw ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ''); };
  const handleHarianAmountChange = (e) => { const raw = e.target.value.replace(/[^0-9]/g, ''); if (raw) { setNominalHarianInput(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".")); setNominalHarianValue(parseFloat(raw)); } else { setNominalHarianInput(''); setNominalHarianValue(0); } };
  const calculateSisaHariKe25 = () => { const now = new Date(); const d = now.getDate(); const m = now.getMonth(); const y = now.getFullYear(); let sisa; let target; if (d <= 25) { sisa = 25 - d; target = new Date(y, m, 25); } else { const dim = new Date(y, m + 1, 0).getDate(); sisa = (dim - d) + 25; target = new Date(y, m + 1, 25); } return { sisaHari: sisa, targetDate: target }; };
  const { sisaHari: sisaHariKe25, targetDate: targetTanggal25 } = calculateSisaHariKe25();
  const batasPerHari = sisaHariKe25 > 0 ? nominalHarianValue / sisaHariKe25 : nominalHarianValue;
  const handleAddTransaction = async (e) => { e.preventDefault(); if (!descInput.trim() || !amountInput) return; const nt = { id: Date.now(), deskripsi: descInput.trim(), nominal: parseFloat(amountInput.replace(/\./g, '')), tipe: typeInput, status_lunas: false }; setTransactions([nt, ...transactions]); setDescInput(''); setAmountInput(''); if (supabase) await supabase.from('transaksi_keuangan').insert([nt]); };
  const handleDeleteTransaction = async (id) => { setTransactions(transactions.filter(t => t.id !== id)); if (supabase) await supabase.from('transaksi_keuangan').delete().eq('id', id); };
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  const handleAddPrompt = async (e) => { e.preventDefault(); if (!promptForm.title.trim() || !promptForm.text.trim()) return; const ne = { id: Date.now(), title: promptForm.title.trim(), image1: promptForm.image1.trim(), image2: promptForm.image2.trim(), image3: promptForm.image3.trim(), prompt_text: promptForm.text.trim(), category: promptForm.category || 'gemini' }; setPrompts([ne, ...prompts]); setPromptForm({ title: '', image1: '', image2: '', image3: '', text: '', category: promptTab }); setShowPromptForm(false); if (supabase) await supabase.from('prompts_gallery').insert([ne]); };
  const handleDeletePrompt = async (id) => { if (!confirm("Hapus prompt ini?")) return; setPrompts(prompts.filter(p => p.id !== id)); if (supabase) await supabase.from('prompts_gallery').delete().eq('id', id); };
  const copyToClipboard = (text, id) => { navigator.clipboard.writeText(text).then(() => { setCopySuccess(id); setTimeout(() => setCopySuccess(null), 2000); }); };

  // GAME LOGIC
  const filteredGames = GAME_PS1_DATA.filter(g => g.nama.toLowerCase().includes(gameSearch.toLowerCase()));
  const selectedGamesList = GAME_PS1_DATA.filter(g => selectedGameIds[g.no]);
  const toggleGameSelection = (no) => setSelectedGameIds(p => ({ ...p, [no]: !p[no] }));
  const [boardFormat, setBoardFormat] = useState('email');
  const getJumlahFileDisplay = (g) => { const j = (g.jumlah || '').toString().trim(); if (!j || j === '-') { if (g.keterangan && g.keterangan.toLowerCase().includes('file')) return g.keterangan; return '1'; } return j; };
  const isMultiFile = (g) => { const j = getJumlahFileDisplay(g); const num = parseInt(j); if (!isNaN(num) && num > 1) return true; if (j.toLowerCase().includes('file')) { const m = j.match(/(\d+)/); if (m && parseInt(m[1]) > 1) return true; } return false; };
  const generateBoardFullText = (format = boardFormat) => { const isWA = format === 'whatsapp'; const b = (t) => isWA ? `*${t}*` : t; const it = (t) => isWA ? `_${t}_` : t; let txt = `${it('Instruksi: Copy link yang kami kirim ke web browser yang bukan bawaan HP [ dihimbau untuk tidak tap langsung ya ]')}\n\n${b('Download & Install ePSXe')}\nLink: https://www.mediafire.com/file/y2ze58to38d6va8/ePSXe.apk/file\n\n${b('Download Game PS 1')}\n`; if (selectedGamesList.length === 0) txt += `Judul: (Belum ada game dipilih)\n`; else selectedGamesList.forEach(g => { txt += `Judul: ${g.nama}\nLink: ${g.link}\nJumlah File: ${getJumlahFileDisplay(g)}\n\n`; }); txt += `${b('Cara Menjalankan')}\n1. Buka ePSXe\n2. Tap jalankan permainan\n3. Scan game\n`; return txt; };
  const handleCopyBoard = () => { navigator.clipboard.writeText(generateBoardFullText()).then(() => { setGameCopySuccess(true); setTimeout(() => setGameCopySuccess(false), 2000); }); };

  const filteredApk = GAME_APK_DATA.filter(g => g.nama.toLowerCase().includes(apkSearch.toLowerCase()));
  const selectedApkList = GAME_APK_DATA.filter(g => selectedApkIds[g.no]);
  const toggleApkSelection = (no) => setSelectedApkIds(p => ({ ...p, [no]: !p[no] }));
  const generateApkBoardFullText = (f = apkBoardFormat) => { const isWA = f === 'whatsapp'; const b = (t) => isWA ? `*${t}*` : t; let txt = `${b('Download Game APK')}\n`; if (selectedApkList.length === 0) txt += `Belum ada game dipilih\n`; else selectedApkList.forEach(g => { txt += `Judul: ${g.nama}\nLink: ${g.link}\nSize: ${g.ukuran}\n\n`; }); return txt; };
  const handleCopyApkBoard = () => { navigator.clipboard.writeText(generateApkBoardFullText()).then(() => { setApkCopySuccess(true); setTimeout(() => setApkCopySuccess(false), 2000); }); };

  const filteredPsp = GAME_PSP_DATA.filter(g => g.nama.toLowerCase().includes(pspSearch.toLowerCase()));
  const selectedPspList = GAME_PSP_DATA.filter(g => selectedPspIds[g.no]);
  const togglePspSelection = (no) => setSelectedPspIds(p => ({ ...p, [no]: !p[no] }));
  const generatePspBoardFullText = (f = pspBoardFormat) => { const isWA = f === 'whatsapp'; const b = (t) => isWA ? `*${t}*` : t; let txt = `${b('Download Game PSP')}\n`; if (selectedPspList.length === 0) txt += `Belum ada game dipilih\n`; else selectedPspList.forEach(g => { txt += `Judul: ${g.nama}\nLink: ${g.link}\nSize: ${g.ukuran}\n\n`; }); return txt; };
  const handleCopyPspBoard = () => { navigator.clipboard.writeText(generatePspBoardFullText()).then(() => { setPspCopySuccess(true); setTimeout(() => setPspCopySuccess(false), 2000); }); };

  if (view === 'locked') return <div className="flex flex-col items-center justify-center min-h- bg-[#0B0F19] text-slate-300 p-4"><div className="w-full max-w-sm bg-[#111827] border border-slate-800 rounded-2xl p-8 shadow-2xl"><h1 className="text-2xl font-bold text-center text-white mb-6">Ned Private Hub</h1><div className="flex justify-center gap-2 mb-8">{[0,1,2,3,4,5].map(i => <div key={i} className={`w-3 h-3 rounded-full ${pinCode.length > i ? 'bg-indigo-500' : 'bg-slate-700'} ${pinError ? 'bg-red-500' : ''}`} />)}</div><div className="grid grid-cols-3 gap-3">{[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => handleNumClick(n.toString())} className="py-4 bg-slate-800 rounded-xl text-white">{n}</button>)}<button onClick={handleDeletePin} className="py-4 bg-slate-800 rounded-xl text-slate-400">Del</button><button onClick={() => handleNumClick('0')} className="py-4 bg-slate-800 rounded-xl text-white">0</button><div></div></div></div></div>;
  if (view === 'home') return <div className="flex flex-col items-center justify-start pt-24 min-h- bg-[#0B0F19] text-slate-300 px-4"><div className="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">N</div><h1 className="text-3xl font-bold text-white mb-2">Ned Private Hub</h1><p className="text-sm text-slate-500 mb-10">{currentDate}</p><div className="flex flex-col gap-4 w-full max-w-xs"><button onClick={() => setView('finansial')} className="px-8 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Finansial</button><button onClick={() => setView('prompt_gallery')} className="px-8 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Prompt</button><button onClick={() => setView('shopee')} className="px-8 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Shopee</button></div></div>;
  if (view === 'finansial') return <div className="flex flex-col items-center justify-start pt-24 min-h- bg-[#0B0F19] text-slate-300 px-4"><button onClick={() => setView('home')} className="absolute top-6 left-4 px-4 py-2 bg-slate-800 rounded-lg">Kembali</button><h1 className="text-3xl font-bold text-white mb-8">Finansial</h1><div className="flex flex-col gap-4 w-full max-w-xs"><button onClick={() => setView('angsuran')} className="px-6 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Angsuran Rumah</button><button onClick={() => setView('transaksi')} className="px-6 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Pendapatan & Pengeluaran</button></div></div>;

  if (view === 'prompt_gallery') {
    const filteredPrompts = prompts.filter(p => (p.category || 'gemini') === promptTab);
    const geminiCount = prompts.filter(p => (p.category || 'gemini') === 'gemini').length;
    const gptCount = prompts.filter(p => p.category === 'chatgpt').length;
    return (
      <div className="flex flex-col h- bg-[#0B0F19] text-slate-300 overflow-hidden">
        <header className="shrink-0 py-5 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative">
          <button onClick={() => setView('home')} className="absolute left-4 top-5 p-2 rounded-full bg-slate-800 text-slate-400">←</button>
          <h2 className="text-xl font-bold text-white">Prompt Gallery</h2>
          <p className="text-xs text-slate-500">1 table • {prompts.length} total</p>
          <button onClick={() => { setPromptForm({ ...promptForm, category: promptTab }); setShowPromptForm(!showPromptForm); }} className="absolute right-4 top-5 px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/50 text-sm">Tambah</button>
        </header>
        <div className="shrink-0 bg-[#0B0F19] border-b border-slate-800/60 px-4 py-3 flex justify-center">
          <div className="flex items-center bg-[#111827] border border-slate-800 rounded-xl p-1">
            <button onClick={() => setPromptTab('gemini')} className={promptTab === 'gemini' ? "px-5 py-2 rounded-lg text-sm font-medium bg-white text-slate-900 shadow flex items-center gap-2" : "px-5 py-2 rounded-lg text-sm font-medium text-slate-500 flex items-center gap-2"}>G Gemini <span className="px-1.5 py-0.5 rounded-full text- bg-slate-900 text-white">{geminiCount}</span></button>
            <button onClick={() => setPromptTab('chatgpt')} className={promptTab === 'chatgpt' ? "px-5 py-2 rounded-lg text-sm font-medium bg-white text-slate-900 shadow flex items-center gap-2" : "px-5 py-2 rounded-lg text-sm font-medium text-slate-500 flex items-center gap-2"}>GPT Chat GPT <span className="px-1.5 py-0.5 rounded-full text- bg-slate-800 text-slate-500">{gptCount}</span></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="w-full max-w- mx-auto">
            {showPromptForm && (
              <form onSubmit={handleAddPrompt} className="max-w-3xl mx-auto w-full bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-10 flex flex-col">
                <input type="text" placeholder="Nama / Judul Prompt" required value={promptForm.title} onChange={(e) => setPromptForm({ ...promptForm, title: e.target.value })} className="w-full border border-slate-700 text-sm rounded-lg px-4 py-3 outline-none focus:border-purple-500 font-bold mb-4" style={{ backgroundColor: '#0B0F19', color: '#e2e8f0' }} />
                <div className="flex items-center gap-2 mb-5"><span className="text- text-slate-500">Simpan di:</span><div className="flex items-center bg-[#0B0F19] border border-slate-700 rounded-lg p-0.5"><button type="button" onClick={() => setPromptForm({ ...promptForm, category: 'gemini' })} className={promptForm.category === 'gemini' ? "px-3 py-1 rounded-md text-xs font-bold bg-indigo-500 text-white" : "px-3 py-1 rounded-md text-xs text-slate-500"}>Gemini</button><button type="button" onClick={() => setPromptForm({ ...promptForm, category: 'chatgpt' })} className={promptForm.category === 'chatgpt' ? "px-3 py-1 rounded-md text-xs font-bold bg-emerald-500 text-white" : "px-3 py-1 rounded-md text-xs text-slate-500"}>Chat GPT</button></div></div>
                <div className="flex flex-col gap-3 mb-5"><input type="text" placeholder="Link Gambar 1" value={promptForm.image1} onChange={(e) => setPromptForm({ ...promptForm, image1: e.target.value })} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} /><input type="text" placeholder="Link Gambar 2" value={promptForm.image2} onChange={(e) => setPromptForm({ ...promptForm, image2: e.target.value })} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} /><input type="text" placeholder="Link Gambar 3" value={promptForm.image3} onChange={(e) => setPromptForm({ ...promptForm, image3: e.target.value })} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} /></div>
                <textarea placeholder="Masukkan text prompt..." required value={promptForm.text} onChange={(e) => setPromptForm({ ...promptForm, text: e.target.value })} className="w-full min-h- border border-slate-700 text-sm rounded-lg px-4 py-3 outline-none resize-none mb-5" style={{ backgroundColor: '#0B0F19', color: '#cbd5e1' }}></textarea>
                <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowPromptForm(false)} className="px-6 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm">Batal</button><button type="submit" className={promptForm.category === 'chatgpt' ? "px-6 py-2.5 rounded-lg bg-emerald-600 text-white text-sm" : "px-6 py-2.5 rounded-lg bg-purple-600 text-white text-sm"}>Simpan ke {promptForm.category === 'chatgpt' ? 'Chat GPT' : 'Gemini'}</button></div>
              </form>
            )}
            {filteredPrompts.length === 0 && !showPromptForm ? <div className="text-center py-20 text-slate-500"><p>Belum ada prompt di {promptTab === 'chatgpt' ? 'Chat GPT' : 'Gemini'}.</p><p className="text-xs mt-2">File lama otomatis jadi Gemini</p></div> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">{filteredPrompts.map((p, idx) => <PromptCard key={p.id} p={p} index={idx} onDelete={handleDeletePrompt} copyToClipboard={copyToClipboard} copySuccess={copySuccess} />)}</div>}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'transaksi') {
    return (
      <div className="flex flex-col h- bg-[#0B0F19] text-slate-300 overflow-hidden">
        <header className="shrink-0 py-6 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative"><button onClick={() => setView('finansial')} className="absolute left-4 top-6 p-2 rounded-full bg-slate-800 text-slate-400">←</button><h2 className="text-xl font-bold text-white">Pendapatan & Pengeluaran</h2></header>
        <div className="flex-1 p-3 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-3 gap-3 mb-4"><div className="bg-[#111827] border border-emerald-800/40 rounded-xl p-4"><span className="text-xs text-emerald-400">Total Pendapatan</span><div className="text-lg font-bold font-mono text-emerald-400">{formatRupiah(transactions.filter(t => t.tipe === 'pendapatan').reduce((a, c) => a + Number(c.nominal), 0))}</div></div><div className="bg-[#111827] border border-red-800/40 rounded-xl p-4"><span className="text-xs text-red-400">Total Pengeluaran</span><div className="text-lg font-bold font-mono text-red-400">{formatRupiah(transactions.filter(t => t.tipe === 'pengeluaran').reduce((a, c) => a + Number(c.nominal), 0))}</div></div><div className="bg-[#111827] border border-indigo-800/40 rounded-xl p-4"><span className="text-xs text-indigo-400">Sisa</span><div className="text-lg font-bold font-mono text-indigo-400">{formatRupiah(transactions.filter(t => t.tipe === 'pendapatan').reduce((a, c) => a + Number(c.nominal), 0) - transactions.filter(t => t.tipe === 'pengeluaran').reduce((a, c) => a + Number(c.nominal), 0))}</div></div></div>
          <div className="bg-[#111827] border border-slate-800 rounded-lg p-2.5 mb-3"><div className="grid grid-cols-3 gap-2"><div className="bg-[#0B0F19] border border-slate-800 rounded-md p-2"><label className="text- text-slate-500">Nominal Hari ini</label><div className="relative flex items-center"><span className="absolute left-2.5 text- text-slate-400">Rp</span><input type="text" inputMode="numeric" value={nominalHarianInput} onChange={handleHarianAmountChange} className="w-full bg-[#111827] border border-slate-700 text- font-mono rounded-md pl-7 pr-2 py-1.5" /></div></div><div className="bg-[#0B0F19] border border-slate-800 rounded-md p-2"><label className="text- text-slate-500">Sisa Hari ke 25</label><div className="text- font-mono text-indigo-300">{sisaHariKe25} hari</div></div><div className="bg-[#0B0F19] border border-indigo-500/20 rounded-md p-2"><label className="text- text-indigo-300">Batas / Hari</label><div className="text- font-mono text-white">{nominalHarianValue > 0 ? formatRupiah(Math.floor(batasPerHari)) : 'Rp 0'}</div></div></div></div>
          <form onSubmit={handleAddTransaction} className="bg-[#111827] border border-slate-800 rounded-xl p-4 mb-4 flex gap-3"><select value={typeInput} onChange={(e) => setTypeInput(e.target.value)} className="bg-[#0B0F19] border border-slate-700 text-sm rounded-lg px-3 py-2.5"><option value="pendapatan">Pendapatan</option><option value="pengeluaran">Pengeluaran</option></select><input type="text" placeholder="Deskripsi" value={descInput} onChange={(e) => setDescInput(e.target.value)} className="flex-1 bg-[#0B0F19] border border-slate-700 text-sm rounded-lg px-3 py-2.5" /><input type="text" placeholder="Nominal" value={amountInput} onChange={handleAmountChange} className="w-32 bg-[#0B0F19] border border-slate-700 text-sm rounded-lg px-3 py-2.5" /><button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm">Simpan</button></form>
          <div className="flex-1 overflow-auto bg-[#111827] rounded-xl border border-slate-800"><table className="w-full text-left"><thead className="sticky top-0 bg-[#111827]"><tr className="border-b border-slate-800"><th className="py-3 px-4 text-xs text-slate-500">Tipe</th><th className="py-3 px-4 text-xs text-slate-500">Deskripsi</th><th className="py-3 px-4 text-xs text-slate-500">Nominal</th><th className="py-3 px-4 text-xs text-slate-500">Aksi</th></tr></thead><tbody className="divide-y divide-slate-800/40">{transactions.map(t => <tr key={t.id}><td className="py-3 px-4 text-xs">{t.tipe}</td><td className="py-3 px-4 text-sm">{t.deskripsi}</td><td className="py-3 px-4 text-sm font-mono">{formatRupiah(t.nominal)}</td><td className="py-3 px-4"><button onClick={() => handleDeleteTransaction(t.id)} className="text-xs px-2 py-1 rounded bg-red-900/20 text-red-400">Hapus</button></td></tr>)}</tbody></table></div>
        </div>
      </div>
    );
  }

  if (view === 'angsuran') return <div className="flex flex-col h- bg-[#0B0F19] text-slate-300 p-4"><button onClick={() => setView('finansial')} className="mb-4 px-4 py-2 bg-slate-800 rounded-lg">Kembali</button><div className="max-w-4xl mx-auto w-full bg-[#111827] rounded-xl border border-slate-800 overflow-hidden"><div className="h- overflow-auto"><table className="w-full text-left"><thead className="sticky top-0 bg-[#111827]"><tr><th className="py-3 px-4 text-xs text-slate-500">No</th><th className="py-3 px-4 text-xs text-slate-500">Tanggal</th><th className="py-3 px-4 text-xs text-slate-500">Total</th></tr></thead><tbody>{angsuranData.map(r => <tr key={r.no} className="border-b border-slate-800/40"><td className="py-3 px-4 text-sm">{r.no}</td><td className="py-3 px-4 text-sm">{r.tanggal}</td><td className="py-3 px-4 text-sm font-mono">{r.totalBayar}</td></tr>)}</tbody></table></div></div></div>;

  if (view === 'shopee') return <div className="flex flex-col items-center justify-start pt-24 min-h- bg-[#0B0F19] text-slate-300 px-4"><button onClick={() => setView('home')} className="absolute top-6 left-4 px-4 py-2 bg-slate-800 rounded-lg">Kembali</button><h1 className="text-3xl font-bold text-white mb-8">Shopee</h1><div className="flex flex-col gap-4 w-full max-w-xs"><button onClick={() => setView('game_ps1')} className="px-6 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Game PS1 for Android • {GAME_PS1_DATA.length} game</button><button onClick={() => setView('game_psp')} className="px-6 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Game PSP for Android • {GAME_PSP_DATA.length} game • 1.24GB Metal Slug</button><button onClick={() => setView('game_apk')} className="px-6 py-5 bg-[#111827] border border-slate-700 rounded-2xl text-white">Game APK • {GAME_APK_DATA.length} game</button></div></div>;

  if (view === 'game_ps1') return <div className="flex flex-col h- bg-[#0B0F19] text-slate-300 overflow-hidden"><header className="shrink-0 py-5 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative"><button onClick={() => setView('shopee')} className="absolute left-4 top-5 p-2 rounded-full bg-slate-800 text-slate-400">←</button><h2 className="text-xl font-bold text-white">Game PS1 for Android</h2><p className="text-xs text-slate-500">{GAME_PS1_DATA.length} game • Centang untuk board</p></header><div className="flex-1 overflow-auto p-4 flex flex-col gap-4 max-w-5xl mx-auto w-full"><div className="bg-[#111827] rounded-xl border border-slate-800 p-4"><div className="flex justify-between items-center mb-3"><span className="text-xs text-slate-400">{selectedGamesList.length} dipilih</span><div className="flex gap-2"><button onClick={() => setBoardFormat('email')} className={boardFormat === 'email' ? "px-3 py-1 rounded bg-white text-black text-xs" : "px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs"}>Email</button><button onClick={() => setBoardFormat('whatsapp')} className={boardFormat === 'whatsapp' ? "px-3 py-1 rounded bg-emerald-500 text-white text-xs" : "px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs"}>WhatsApp</button><button onClick={handleCopyBoard} className="px-3 py-1 rounded bg-white text-black text-xs">{gameCopySuccess ? 'Tercopy!' : 'Copy'}</button></div></div><div className="text- leading-relaxed text-slate-300 whitespace-pre-wrap bg-[#0B0F19] p-3 rounded border border-slate-800">{generateBoardFullText()}</div></div><div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden"><div className="p-3 flex gap-3"><input type="text" placeholder="Cari game..." value={gameSearch} onChange={(e) => setGameSearch(e.target.value)} className="flex-1 bg-[#0B0F19] border border-slate-700 text-xs rounded-lg px-3 py-1.5" />{selectedGamesList.length > 0 && <button onClick={() => setSelectedGameIds({})} className="text-xs px-3 py-1 rounded bg-slate-800">Clear {selectedGamesList.length}</button>}</div><div className="overflow-auto max-h-"><table className="w-full text-left"><thead className="sticky top-0 bg-[#111827]"><tr><th className="py-2 px-3 text- text-slate-500">No</th><th className="py-2 px-3 text- text-slate-500">Pilih</th><th className="py-2 px-3 text- text-slate-500">Nama Game</th><th className="py-2 px-3 text- text-slate-500">Link</th></tr></thead><tbody className="divide-y divide-slate-800/40">{filteredGames.map(g => { const sel = !!selectedGameIds[g.no]; return <tr key={g.no} className={sel ? "bg-orange-500/10" : ""}><td className="py-2 px-3 text-xs">{g.no}</td><td className="py-2 px-3"><button onClick={() => toggleGameSelection(g.no)} className={sel ? "w-5 h-5 rounded bg-orange-500 text-white flex items-center justify-center text-xs" : "w-5 h-5 rounded border border-slate-700 bg-slate-800"}>{sel ? '✓' : ''}</button></td><td className="py-2 px-3 text-xs">{g.nama}</td><td className="py-2 px-3"><a href={g.link} target="_blank" className="text-xs text-indigo-400">Link</a></td></tr>; })}</tbody></table></div></div></div></div>;

  if (view === 'game_psp') return <div className="flex flex-col h- bg-[#0B0F19] text-slate-300 overflow-hidden"><header className="shrink-0 py-5 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative"><button onClick={() => setView('shopee')} className="absolute left-4 top-5 p-2 rounded-full bg-slate-800 text-slate-400">←</button><h2 className="text-xl font-bold text-white">Game PSP for Android</h2><p className="text-xs text-slate-500">{GAME_PSP_DATA.length} game • Metal Slug 1.24GB</p></header><div className="flex-1 overflow-auto p-4 flex flex-col gap-4 max-w-5xl mx-auto w-full"><div className="bg-[#111827] rounded-xl border border-slate-800 p-4"><div className="flex justify-between items-center mb-3"><span className="text-xs text-slate-400">{selectedPspList.length} dipilih</span><div className="flex gap-2"><button onClick={() => setPspBoardFormat('email')} className={pspBoardFormat === 'email' ? "px-3 py-1 rounded bg-white text-black text-xs" : "px-3 py-1 rounded bg-slate-800 text-xs"}>Email</button><button onClick={() => setPspBoardFormat('whatsapp')} className={pspBoardFormat === 'whatsapp' ? "px-3 py-1 rounded bg-emerald-500 text-white text-xs" : "px-3 py-1 rounded bg-slate-800 text-xs"}>WA</button><button onClick={handleCopyPspBoard} className="px-3 py-1 rounded bg-white text-black text-xs">{pspCopySuccess ? 'Tercopy!' : 'Copy'}</button></div></div><div className="text- text-slate-300 whitespace-pre-wrap bg-[#0B0F19] p-3 rounded border border-slate-800">{generatePspBoardFullText()}</div></div><div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden"><div className="p-3 flex gap-3"><input type="text" placeholder="Cari game PSP..." value={pspSearch} onChange={(e) => setPspSearch(e.target.value)} className="flex-1 bg-[#0B0F19] border border-slate-700 text-xs rounded-lg px-3 py-1.5" />{selectedPspList.length > 0 && <button onClick={() => setSelectedPspIds({})} className="text-xs px-3 py-1 rounded bg-slate-800">Clear {selectedPspList.length}</button>}</div><div className="overflow-auto max-h-"><table className="w-full text-left"><thead className="sticky top-0 bg-[#111827]"><tr><th className="py-2 px-3 text- text-slate-500">No</th><th className="py-2 px-3 text- text-slate-500">Pilih</th><th className="py-2 px-3 text- text-slate-500">Nama</th><th className="py-2 px-3 text- text-slate-500">Size</th><th className="py-2 px-3 text- text-slate-500">Link</th></tr></thead><tbody className="divide-y divide-slate-800/40">{filteredPsp.map(g => { const sel = !!selectedPspIds[g.no]; return <tr key={g.no} className={sel ? "bg-blue-500/10" : ""}><td className="py-2 px-3 text-xs">{g.no}</td><td className="py-2 px-3"><button onClick={() => togglePspSelection(g.no)} className={sel ? "w-5 h-5 rounded bg-blue-500 text-white text-xs" : "w-5 h-5 rounded border border-slate-700 bg-slate-800"}>{sel ? '✓' : ''}</button></td><td className="py-2 px-3 text-xs">{g.nama}</td><td className="py-2 px-3 text-xs"><span className="text- bg-slate-800 px-2 py-0.5 rounded">{g.ukuran}</span></td><td className="py-2 px-3"><a href={g.link} target="_blank" className="text-xs text-indigo-400">Link</a></td></tr>; })}</tbody></table></div></div></div></div>;

  if (view === 'game_apk') return <div className="flex flex-col h- bg-[#0B0F19] text-slate-300 overflow-hidden"><header className="shrink-0 py-5 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative"><button onClick={() => setView('shopee')} className="absolute left-4 top-5 p-2 rounded-full bg-slate-800 text-slate-400">←</button><h2 className="text-xl font-bold text-white">Game APK</h2><p className="text-xs text-slate-500">{GAME_APK_DATA.length} game</p></header><div className="flex-1 overflow-auto p-4 flex flex-col gap-4 max-w-5xl mx-auto w-full"><div className="bg-[#111827] rounded-xl border border-slate-800 p-4"><div className="flex justify-between items-center mb-3"><span className="text-xs text-slate-400">{selectedApkList.length} dipilih</span><div className="flex gap-2"><button onClick={() => setApkBoardFormat('email')} className={apkBoardFormat === 'email' ? "px-3 py-1 rounded bg-white text-black text-xs" : "px-3 py-1 rounded bg-slate-800 text-xs"}>Email</button><button onClick={() => setApkBoardFormat('whatsapp')} className={apkBoardFormat === 'whatsapp' ? "px-3 py-1 rounded bg-emerald-500 text-white text-xs" : "px-3 py-1 rounded bg-slate-800 text-xs"}>WA</button><button onClick={handleCopyApkBoard} className="px-3 py-1 rounded bg-white text-black text-xs">{apkCopySuccess ? 'Tercopy!' : 'Copy'}</button></div></div><div className="text- text-slate-300 whitespace-pre-wrap bg-[#0B0F19] p-3 rounded border border-slate-800">{generateApkBoardFullText()}</div></div><div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden"><div className="p-3 flex gap-3"><input type="text" placeholder="Cari APK..." value={apkSearch} onChange={(e) => setApkSearch(e.target.value)} className="flex-1 bg-[#0B0F19] border border-slate-700 text-xs rounded-lg px-3 py-1.5" />{selectedApkList.length > 0 && <button onClick={() => setSelectedApkIds({})} className="text-xs px-3 py-1 rounded bg-slate-800">Clear {selectedApkList.length}</button>}</div><div className="overflow-auto max-h-"><table className="w-full text-left"><thead className="sticky top-0 bg-[#111827]"><tr><th className="py-2 px-3 text- text-slate-500">No</th><th className="py-2 px-3 text- text-slate-500">Pilih</th><th className="py-2 px-3 text- text-slate-500">Nama</th><th className="py-2 px-3 text- text-slate-500">Size</th><th className="py-2 px-3 text- text-slate-500">Link</th></tr></thead><tbody className="divide-y divide-slate-800/40">{filteredApk.map(g => { const sel = !!selectedApkIds[g.no]; return <tr key={g.no} className={sel ? "bg-emerald-500/10" : ""}><td className="py-2 px-3 text-xs">{g.no}</td><td className="py-2 px-3"><button onClick={() => toggleApkSelection(g.no)} className={sel ? "w-5 h-5 rounded bg-emerald-500 text-white text-xs" : "w-5 h-5 rounded border border-slate-700 bg-slate-800"}>{sel ? '✓' : ''}</button></td><td className="py-2 px-3 text-xs">{g.nama}</td><td className="py-2 px-3 text-xs"><span className="text- bg-slate-800 px-2 py-0.5 rounded">{g.ukuran}</span></td><td className="py-2 px-3"><a href={g.link} target="_blank" className="text-xs text-indigo-400">Link</a></td></tr>; })}</tbody></table></div></div></div></div>;

  return null;
}
