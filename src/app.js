/**
 * DexxDigital - Pure Vanilla JavaScript Engine with Firebase Firestore Integration
 * Bahasa Indonesia & Hidden CMS Admin Panel
 * 
 * Features:
 * 1. 100% Pure Vanilla JS, HTML5, CSS3 (No TSX, No React, No Build Bundling)
 * 2. Upload Portfolio Photos via Local Device Files with Client-side Canvas Optimization
 * 3. Dynamic Category Filtering: Only displays categories that actually have projects
 * 4. Fully Optional & Editable Services Section ("Solusi Komprehensif Siap Skala Besar")
 * 5. Fully Optional & Individually Editable/Removable Contact Channels ("Kanal Komunikasi Langsung")
 * 6. Dual-Persistence: Real-time Firebase Firestore (`web-wedding-4d4ce`) + localStorage cache
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyDmLSvUrOw0U_aLNkctFMKKo5AavJCHYc4",
  authDomain: "web-wedding-4d4ce.firebaseapp.com",
  projectId: "web-wedding-4d4ce",
  storageBucket: "web-wedding-4d4ce.firebasestorage.app",
  messagingSenderId: "904409888717",
  appId: "1:904409888717:web:56dd2c94996bacbd067684",
  measurementId: "G-HVRMD0LY2H"
};

let db = null;
let firebaseConnected = false;

try {
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  firebaseConnected = true;
  console.log("Firebase initialized successfully for DexxDigital.");
} catch (err) {
  console.warn("Firebase initialization warning (using local fallback cache):", err);
}

// --- DATA INITIAL (BAHASA INDONESIA & TANPA IKON GEMINI/EMOJI) ---
const INITIAL_DATA = {
  agency: {
    brandName: "DexxDigital",
    tagline: "Rekayasa Perangkat Lunak Berkecepatan Tinggi & Desain Produk Digital Mutakhir",
    logoUrl: null, // null = gunakan monogram vektor Dexx
    hero: {
      kicker: "Studio Rekayasa Produk Digital · Jakarta / Singapore",
      kickerIcon: "none", // Pilihan: "none" (tanpa icon/bersih), "dot", "pulse", "slash"
      headline: "Merancang Produk Digital dengan Presisi & Kecepatan Tinggi.",
      subheadline: "DexxDigital menjembatani rekayasa perangkat lunak mutakhir, estetika obsidian modern, dan akselerasi brand. Kami mengubah visi ambisius menjadi produk digital kelas dunia.",
      ctaPrimary: "Jelajahi Portofolio",
      ctaSecondary: "Konsultasi Proyek",
      heroImage: "./src/assets/images/hero_digital_agency_1794229794726.jpg",
      badgeText: "Siap Kolaborasi Q1 2026"
    },
    about: {
      headline: "Kami merancang pengalaman digital di mana kesempurnaan estetika bertemu dengan skala komputasi.",
      story: "Didirikan dengan prinsip dasar yang murni: mengeliminasi produk digital yang biasa-biasa saja. DexxDigital adalah kolektif insinyur sistem, direktur kreatif, dan perancang interaksi kelas atas. Kami membangun sistem web kustom, platform SaaS, dan aplikasi mobile yang tangkas, elegan, dan siap bertumbuh cepat.",
      statement: "Setiap piksel memiliki tujuan nyata. Setiap milidetik latensi dioptimasi. Kami tidak sekadar membangun website biasa—kami menciptakan aset digital yang disegani di industri Anda."
    },
    servicesSection: {
      show: true,
      kicker: "Kapabilitas Digital · End-to-End Solutions",
      headline: "Solusi Komprehensif Siap Skala Besar.",
      subheadline: "Kami bertindak sebagai perpanjangan dari tim produk Anda—mengubah tantangan teknis kompleks menjadi pengalaman digital berkonversi tinggi."
    },
    contactSection: {
      show: true,
      kicker: "Mulai Kolaborasi · Intake Proyek Aktif",
      headline: "Mari Bangun Sesuatu yang Luar Biasa.",
      subheadline: "Punya ide proyek, membutuhkan desain ulang skala penuh, atau mencari partner teknis jangka panjang? Sampaikan kebutuhan Anda dan kami akan merespons dalam waktu 24 jam.",
      showForm: true,
      developerWhatsApp: "6281289003344"
    },
    contactChannels: {
      show: true,
      title: "Kanal Komunikasi Langsung",
      email: "halo@dexxdigital.agency",
      phone: "+62 812-8900-3344",
      whatsapp: "6281289003344",
      address: "SCBD District 8, Lantai 29, Jakarta & Singapore Hub",
      hours: "Senin – Jumat: 09:00 – 18:00 WIB",
      showWhatsAppButton: true
    },
    contact: {
      email: "halo@dexxdigital.agency",
      phone: "+62 812-8900-3344",
      whatsapp: "6281289003344",
      address: "SCBD District 8, Lantai 29, Jakarta & Singapore Hub",
      hours: "Senin – Jumat: 09:00 – 18:00 WIB"
    },
    adminPin: "2026"
  },
  stats: [
    { id: "stat-1", label: "Proyek Selesai", value: "140+" },
    { id: "stat-2", label: "Tingkat Kepuasan Klien", value: "99.4%" },
    { id: "stat-3", label: "Penghargaan Desain & Web", value: "15 Awards" },
    { id: "stat-4", label: "Nilai Klien Tercipta", value: "$48M+" }
  ],
  services: [
    {
      id: "srv-1",
      number: "01",
      title: "Pengembangan Web & SaaS Full-Stack",
      description: "Aplikasi web berkinerja tinggi, arsitektur cloud-native, dan microservices headless yang dirancang untuk transisi halaman instan serta keandalan uptime maksimal.",
      features: [
        "Arsitektur Enterprise Modern & Next.js",
        "Komputasi Edge & Real-time WebSockets",
        "Microservices & Database Latensi Rendah",
        "Otomasi CI/CD & Pengamanan Sistem"
      ]
    },
    {
      id: "srv-2",
      number: "02",
      title: "Desain UI/UX & Interaksi Produk",
      description: "Desain interaksi bertema obsidian, sistem desain komprehensif, dan animasi mikro responsif yang meningkatkan kepuasan pengguna serta metrik konversi.",
      features: [
        "Design System Multi-Brand Lengkap",
        "Koreografi Gerak & Interaksi Halus",
        "Clickable Prototype & Riset Pengguna",
        "Aksesibilitas WCAG AA & Desain Responsif"
      ]
    },
    {
      id: "srv-3",
      number: "03",
      title: "Aplikasi Mobile iOS & Android",
      description: "Aplikasi mobile lintas platform dengan performa native, sinkronisasi offline-first, notifikasi push andal, dan integrasi otentikasi biometrik.",
      features: [
        "Pengembangan React Native & Flutter",
        "Sinkronisasi Cache & Status Offline",
        "Optimalisasi App Store & Release Pipeline",
        "Integrasi Gateway Pembayaran & Sensor"
      ]
    },
    {
      id: "srv-4",
      number: "04",
      title: "Integrasi AI & Otomasi Sistem",
      description: "Penerapan model kecerdasan buatan, pipeline agen cerdas, dan pencarian semantik langsung ke dalam infrastruktur aplikasi bisnis Anda.",
      features: [
        "Arsitektur RAG & Indeks Vektor",
        "Asisten AI Pelanggan & Internal",
        "Pemrosesan Data & Dokumen Otomatis",
        "Pipeline Output Terstruktur Tanpa Jeda"
      ]
    },
    {
      id: "srv-5",
      number: "05",
      title: "Identitas Brand & Visual Direction",
      description: "Hierarki tipografi eksklusif, lambang logo vektor dinamis, buku panduan gaya digital, dan aset visual yang memperkuat reputasi industri.",
      features: [
        "Identitas Visual & Desain Logo Dinamis",
        "Arah Tipografi & Tata Letak Editorial",
        "Visual Storytelling & Panduan Brand Komprehensif"
      ]
    },
    {
      id: "srv-6",
      number: "06",
      title: "Infrastruktur Cloud & Skalabilitas",
      description: "Skalabilitas cloud serverless, CDN edge caching global, optimasi SEO teknis, dan telemetri analitik yang siap menangani lonjakan trafik tinggi.",
      features: [
        "Deployment Edge & Serverless Global",
        "Keamanan Zero-Trust & Rate Limiting",
        "SEO Teknis Tingkat Lanjut & Meta Sosial",
        "Pelacakan Konversi & Telemetri Acara"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Nexus Prime: Telemetri Fintech Generasi Baru",
      category: "Aplikasi Web",
      client: "Nexus Global Capital",
      year: "2026",
      metric: "+310% Volume Transaksi",
      image: "./src/assets/images/project_fintech_platform_1794229795467.jpg",
      summary: "Platform manajemen aset algoritmik berkecepatan tinggi yang menyajikan telemetri pasar real-time dan otomasi portofolio institusional.",
      challenge: "Klien membutuhkan streaming ribuan event data pasar per detik tanpa jeda tampilan, dengan enkripsi setara perbankan.",
      solution: "Membangun sistem visualisasi data terakselerasi GPU dan pipeline WebSocket bidirectional dengan tema gelap obsidian untuk kenyamanan analisis jangka panjang.",
      deliverables: ["Aplikasi Web", "Sistem Desain", "Mesin Telemetri", "Infrastruktur WebSocket"],
      technologies: ["JavaScript ES6+", "HTML5 Canvas", "Tailwind CSS", "WebSockets"],
      liveUrl: "https://nexuscapital.dexxdigital.example"
    },
    {
      id: "proj-2",
      title: "AetherFlow AI: Kanvas Alur Kerja Neural Otonom",
      category: "Sistem AI",
      client: "Aether Cognitive Labs",
      year: "2026",
      metric: "4.8M Node Diproses Harian",
      image: "./src/assets/images/project_ai_workflow_1794229796570.jpg",
      summary: "Kanvas interaktif berbasis node untuk mengorkestrasi pipeline model AI multi-agen secara visual dan memantau status secara langsung.",
      challenge: "Peneliti memerlukan kanvas tak terbatas untuk merangkai workflow model AI yang rumit secara intuitif.",
      solution: "Merancang visualizer grafik vektor responsif dengan fitur docking node instan dan eksekusi pipeline paralel.",
      deliverables: ["Kanvas Alur Kerja", "Desain UI/UX", "Mesin Orkestrasi", "Pustaka Komponen"],
      technologies: ["JavaScript", "HTML5", "Tailwind CSS", "REST APIs"],
      liveUrl: "https://aetherflow.dexxdigital.example"
    },
    {
      id: "proj-3",
      title: "Studio Nova & ARX: Flagship Arsitektural Modern",
      category: "Identitas Brand",
      client: "Nova Architectural Collective",
      year: "2025",
      metric: "Pemenang Penghargaan Desain",
      image: "./src/assets/images/project_luxury_brand_1794229795686.jpg",
      summary: "Showcase web editorial arsitektur yang mengusung kesederhanaan Skandinavia, tipografi berkelas, dan transisi halaman halus.",
      challenge: "Menampilkan kemegahan karya arsitektur fisik melalui layar digital dengan kecepatan muat halaman yang tetap prima.",
      solution: "Memadukan tipografi arsitektural yang kuat dengan pemuatan gambar progresif dan kontras monokrom elegan.",
      deliverables: ["Identitas Brand", "Desain Editorial", "Showcase Interaktif"],
      technologies: ["HTML5", "CSS3 Modern", "Vanilla JS", "Tailwind CSS"],
      liveUrl: "https://studionova.dexxdigital.example"
    },
    {
      id: "proj-4",
      title: "Veloce: Manajemen Armada Kendaraan Listrik",
      category: "Aplikasi Mobile",
      client: "Veloce Mobility AG",
      year: "2025",
      metric: "99.98% Telemetry Uptime",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
      summary: "Aplikasi pendamping operasional untuk memantau status baterai, efisiensi rute, dan telemetri armada kendaraan secara real-time.",
      challenge: "Operator membutuhkan pembaruan data akurat bahkan di wilayah dengan sinyal seluler terbatas.",
      solution: "Menerapkan sinkronisasi database lokal dengan patch status diferensial dan antarmuka sentuh yang intuitif.",
      deliverables: ["Aplikasi iOS & Android", "Protokol Pairing", "Design Tokens"],
      technologies: ["Mobile Web", "Service Worker", "IndexedDB", "Tailwind CSS"],
      liveUrl: "https://veloce.dexxdigital.example"
    },
    {
      id: "proj-5",
      title: "Kroma Studio: Suite Kreatif Seni Generatif",
      category: "Desain UI/UX",
      client: "Kroma Visual Arts",
      year: "2025",
      metric: "+180% Retensi Pengguna",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      summary: "Antarmuka studio kreatif minimalis untuk memanipulasi parameter seni generatif dengan visualisasi warna kolaboratif.",
      challenge: "Menghadirkan kenyamanan penuh bagi kreator tanpa gangguan elemen antarmuka yang berlebihan.",
      solution: "Menciptakan antarmuka yang dapat disembunyikan dengan palet gelap netral dan pratinjau shader berkecepatan tinggi.",
      deliverables: ["Sistem UI/UX", "Riset Interaksi", "Spesifikasi Komponen"],
      technologies: ["HTML5 Canvas", "WebGL", "Tailwind CSS", "Vanilla JS"],
      liveUrl: "https://kroma.dexxdigital.example"
    }
  ],
  pillars: [
    {
      id: "pil-1",
      title: "Estetika Obsidian Minimalis",
      description: "Kami menghindari ornamen visual berlebihan. Desain kami berakar pada presisi arsitektural, ruang negatif yang terencana, dan ketegasan tipografi."
    },
    {
      id: "pil-2",
      title: "Arsitektur Tanpa Jeda Latensi",
      description: "Keindahan visual harus didukung oleh performa nyata. Kami mengoptimasi setiap baris kode agar transisi halaman terasa seketika dan stabil."
    },
    {
      id: "pil-3",
      title: "Kualitas Kode Berdaulat",
      description: "Tanpa ketergantungan rapuh. Kode yang kami bangun bersih, modular, mudah dirawat, dan siap dikembangkan dalam jangka panjang."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Jonathan Sterling",
      role: "Chief Technology Officer",
      company: "Nexus Global Capital",
      quote: "DexxDigital mengubah produk awal kami menjadi standar institusional baru. Ketelitian rekayasa dan kualitas antarmuka mereka benar-benar luar biasa."
    },
    {
      id: "test-2",
      author: "Elena Rostova",
      role: "VP of Product",
      company: "Aether Cognitive Labs",
      quote: "Bekerja sama dengan DexxDigital seperti memiliki tim insinyur dan desainer kelas dunia di samping kita. Mereka mengirimkan proyek melampaui ekspektasi."
    },
    {
      id: "test-3",
      author: "Marcus Chen",
      role: "Managing Partner",
      company: "Nova Architectural Collective",
      quote: "Trafik website meningkat tiga kali lipat dan rasio konversi kami naik signifikan setelah peluncuran ulang. Estetika yang mereka bangun menghadirkan otoritas seketika."
    }
  ]
};

// --- STORAGE & SYNC ENGINE ---
const STORAGE_KEY = "dexxdigital_cms_v2_id";

function loadLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(INITIAL_DATA));
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_DATA,
      ...parsed,
      agency: {
        ...INITIAL_DATA.agency,
        ...(parsed.agency || {}),
        hero: { ...INITIAL_DATA.agency.hero, ...(parsed.agency?.hero || {}) },
        about: { ...INITIAL_DATA.agency.about, ...(parsed.agency?.about || {}) },
        servicesSection: { ...INITIAL_DATA.agency.servicesSection, ...(parsed.agency?.servicesSection || {}) },
        contactChannels: { ...INITIAL_DATA.agency.contactChannels, ...(parsed.agency?.contactChannels || {}) }
      }
    };
  } catch (e) {
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }
}

function saveLocalData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Local save error:", e);
  }
}

// Current active state
let appState = loadLocalData();
let activeCategory = "Semua";

// State image buffer for portfolio upload
let selectedProjectImageData = null;

// Helper: Kompresi dan optimasi gambar dari file lokal menggunakan HTML5 Canvas
function optimizeImageFile(file, maxWidth = 1200, maxHeight = 800, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/webp", quality) || canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- FIREBASE SYNC FUNCTIONS ---
async function syncToFirebase(data) {
  if (!db) return false;
  try {
    const docRef = doc(db, "dexxdigital_cms", "main_content");
    await setDoc(docRef, data, { merge: true });
    console.log("Synchronized to Firebase Firestore successfully.");
    return true;
  } catch (err) {
    console.warn("Firebase sync error (using local cache):", err);
    return false;
  }
}

async function fetchFromFirebase() {
  if (!db) return null;
  try {
    const docRef = doc(db, "dexxdigital_cms", "main_content");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (err) {
    console.warn("Firebase fetch error:", err);
  }
  return null;
}

// Subscribe to real-time updates from Firebase
if (db) {
  try {
    const docRef = doc(db, "dexxdigital_cms", "main_content");
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const remoteData = docSnap.data();
        if (remoteData && remoteData.agency) {
          appState = {
            ...INITIAL_DATA,
            ...remoteData,
            agency: {
              ...INITIAL_DATA.agency,
              ...remoteData.agency,
              servicesSection: { ...INITIAL_DATA.agency.servicesSection, ...(remoteData.agency?.servicesSection || {}) },
              contactChannels: { ...INITIAL_DATA.agency.contactChannels, ...(remoteData.agency?.contactChannels || {}) }
            }
          };
          saveLocalData(appState);
          renderAll();
        }
      }
    }, (error) => {
      console.warn("Firestore snapshot listener notification:", error.message);
    });
  } catch (e) {
    console.warn("Could not attach firestore listener:", e);
  }
}

// --- RENDER FUNCTIONS (SUPPORT OPSIONAL / TIDAK ERROR JIKA KOSONG) ---

function renderNavbar() {
  const brandEl = document.getElementById("nav-brand");
  const agency = appState.agency || {};
  const brandName = agency.brandName || "DexxDigital";
  
  if (brandEl) {
    if (agency.logoUrl) {
      brandEl.innerHTML = `
        <div class="flex items-center gap-2.5">
          <img src="${agency.logoUrl}" alt="${brandName}" class="h-8 w-auto max-w-[140px] object-contain rounded" />
          <span class="font-bold tracking-tight text-white text-lg">${brandName}</span>
        </div>
      `;
    } else {
      brandEl.innerHTML = `
        <div class="flex items-center gap-2.5 select-none">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[1px] shadow-sm shadow-cyan-500/20">
            <div class="w-full h-full bg-[#0B0D13] rounded-[7px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" class="w-4.5 h-4.5 text-cyan-400" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4H12C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20H4V4Z" />
                <path d="M10 9L14 12L10 15" stroke="#38bdf8" stroke-width="2" />
              </svg>
            </div>
          </div>
          <span class="font-bold tracking-tight text-white text-lg">
            Dexx<span class="text-cyan-400 font-extrabold">${brandName.replace(/^Dexx/i, '') || 'Digital'}</span>
          </span>
        </div>
      `;
    }
  }
}

function renderHero() {
  const hero = appState.agency?.hero || {};
  
  // Hero Kicker (Opsional, BEBAS DARI IKON GEMINI / BINTANG!)
  const kickerEl = document.getElementById("hero-kicker-container");
  if (kickerEl) {
    if (hero.kicker && hero.kicker.trim()) {
      kickerEl.style.display = "flex";
      let iconHtml = '';
      const iconType = hero.kickerIcon || 'none';
      if (iconType === 'dot') {
        iconHtml = '<span class="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>';
      } else if (iconType === 'pulse') {
        iconHtml = '<span class="relative flex h-2 w-2 shrink-0"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span></span>';
      } else if (iconType === 'slash') {
        iconHtml = '<span class="text-cyan-400 font-mono font-bold tracking-tighter">//</span>';
      }
      kickerEl.innerHTML = `
        ${iconHtml}
        <span class="text-xs font-semibold tracking-wider uppercase text-cyan-400">${hero.kicker}</span>
      `;
    } else {
      kickerEl.style.display = "none";
    }
  }

  // Hero Headline
  const headlineEl = document.getElementById("hero-headline");
  if (headlineEl) {
    headlineEl.textContent = hero.headline || "Merancang Produk Digital Berkualitas Tinggi.";
  }

  // Hero Subheadline (Opsional)
  const subheadlineEl = document.getElementById("hero-subheadline");
  if (subheadlineEl) {
    if (hero.subheadline && hero.subheadline.trim()) {
      subheadlineEl.style.display = "block";
      subheadlineEl.textContent = hero.subheadline;
    } else {
      subheadlineEl.style.display = "none";
    }
  }

  // CTA Buttons (Opsional)
  const ctaPrimaryEl = document.getElementById("hero-cta-primary");
  if (ctaPrimaryEl) {
    if (hero.ctaPrimary && hero.ctaPrimary.trim()) {
      ctaPrimaryEl.style.display = "inline-flex";
      ctaPrimaryEl.querySelector("span").textContent = hero.ctaPrimary;
    } else {
      ctaPrimaryEl.style.display = "none";
    }
  }

  const ctaSecondaryEl = document.getElementById("hero-cta-secondary");
  if (ctaSecondaryEl) {
    if (hero.ctaSecondary && hero.ctaSecondary.trim()) {
      ctaSecondaryEl.style.display = "inline-flex";
      ctaSecondaryEl.querySelector("span").textContent = hero.ctaSecondary;
    } else {
      ctaSecondaryEl.style.display = "none";
    }
  }

  // Hero Image (Opsional)
  const heroImgEl = document.getElementById("hero-image");
  const heroBadgeEl = document.getElementById("hero-badge-text");
  if (heroImgEl) {
    if (hero.heroImage) {
      heroImgEl.src = hero.heroImage;
      heroImgEl.style.display = "block";
    } else {
      heroImgEl.style.display = "none";
    }
  }
  if (heroBadgeEl) {
    heroBadgeEl.textContent = hero.badgeText || "Siap Kolaborasi 2026";
  }
}

function renderStats() {
  const container = document.getElementById("stats-container");
  if (!container) return;
  const statsList = appState.stats || [];

  if (statsList.length === 0) {
    container.parentElement.style.display = "none";
    return;
  }

  container.parentElement.style.display = "block";
  container.innerHTML = statsList.map((st, idx) => `
    <div>
      <div class="text-2xl sm:text-3xl font-bold font-mono tracking-tight ${idx % 2 === 1 ? 'text-cyan-400' : 'text-white'}">
        ${st.value || '-'}
      </div>
      <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">
        ${st.label || ''}
      </div>
    </div>
  `).join("");
}

// Portfolio: Dinamis, Hanya Menampilkan Kategori yang Benar-Benar Ada Proyeknya
function renderPortfolio() {
  const filterContainer = document.getElementById("portfolio-filters");
  const gridContainer = document.getElementById("portfolio-grid");
  const projects = appState.projects || [];

  // Hitung kategori unik yang HANYA ADA pada proyek yang diisi user
  const existingCategories = [];
  projects.forEach((p) => {
    const cat = (p.category || "").trim();
    if (cat && !existingCategories.includes(cat)) {
      existingCategories.push(cat);
    }
  });

  // Susun tab: Jika ada kategori, sediakan "Semua" + kategori-kategori yang ada
  const categories = existingCategories.length > 0 ? ["Semua", ...existingCategories] : ["Semua"];

  // Jika activeCategory yang dipilih sebelumnya sudah tidak ada pada daftar kategori, reset ke "Semua"
  if (!categories.includes(activeCategory)) {
    activeCategory = "Semua";
  }

  // Render Filter Tabs
  if (filterContainer) {
    // Jika hanya ada 1 kategori proyek atau tidak ada proyek sama sekali, jangan buat banyak tombol kosong
    if (existingCategories.length <= 1) {
      if (existingCategories.length === 0) {
        filterContainer.innerHTML = "";
      } else {
        filterContainer.innerHTML = `
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Kategori Karya: <strong>${existingCategories[0]}</strong> (${projects.length} Proyek)</span>
          </div>
        `;
      }
    } else {
      filterContainer.innerHTML = categories.map((cat) => {
        const count = cat === "Semua" ? projects.length : projects.filter(p => p.category === cat).length;
        const isActive = activeCategory === cat;
        return `
          <button
            type="button"
            data-cat="${cat}"
            class="portfolio-filter-btn px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
              isActive
                ? 'bg-cyan-400 text-black font-semibold shadow-sm shadow-cyan-500/20'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
            }"
          >
            <span>${cat}</span>
            <span class="ml-1 font-mono text-[10px] ${isActive ? 'text-black/70' : 'text-slate-500'}">(${count})</span>
          </button>
        `;
      }).join("");

      // Pasang listener filter
      filterContainer.querySelectorAll(".portfolio-filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeCategory = btn.getAttribute("data-cat");
          renderPortfolio();
        });
      });
    }
  }

  // Filter proyek aktif
  const filtered = activeCategory === "Semua" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (!gridContainer) return;

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
        <p class="text-slate-400 text-sm">Belum ada karya portofolio yang ditambahkan.</p>
        <button type="button" class="mt-4 px-4 py-2 text-xs font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-colors cursor-pointer" onclick="document.getElementById('secret-admin-trigger').click()">
          Buka Panel Admin untuk Tambah Karya
        </button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map((proj, idx) => {
    const isHeroCard = idx === 0 && filtered.length > 2;
    return `
      <div
        data-project-id="${proj.id}"
        class="project-card group relative flex flex-col bg-[#0D1017] rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg shadow-black/40 ${
          isHeroCard ? 'lg:col-span-2' : 'col-span-1'
        }"
      >
        <div class="relative w-full overflow-hidden bg-slate-900 ${isHeroCard ? 'aspect-[16/9]' : 'aspect-[4/3]'}">
          <img
            src="${proj.image || '/src/assets/images/project_fintech_platform_1794229795467.jpg'}"
            alt="${proj.title || 'Proyek'}"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onerror="this.src='/src/assets/images/project_fintech_platform_1794229795467.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity"></div>
          
          <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-cyan-400 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </div>

          ${proj.metric && proj.metric.trim() ? `
            <div class="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
              ${proj.metric}
            </div>
          ` : ''}
        </div>

        <div class="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <span class="text-cyan-400 font-medium">${proj.category || 'Karya'}</span>
              ${proj.client ? `<span aria-hidden="true" class="text-slate-600">·</span><span>${proj.client}</span>` : ''}
              ${proj.year ? `<span aria-hidden="true" class="text-slate-600">·</span><span class="font-mono">${proj.year}</span>` : ''}
            </div>

            <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
              ${proj.title || 'Judul Proyek'}
            </h3>

            ${proj.summary ? `
              <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">
                ${proj.summary}
              </p>
            ` : ''}
          </div>

          ${proj.technologies && proj.technologies.length ? `
            <div class="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
              ${proj.technologies.slice(0, 4).map(t => `
                <span class="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  ${t}
                </span>
              `).join("")}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join("");

  // Pasang listener klik kartu proyek untuk buka modal
  gridContainer.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const pid = card.getAttribute("data-project-id");
      const found = projects.find(p => p.id === pid);
      if (found) openProjectModal(found);
    });
  });
}

window.resetPortfolioFilter = function() {
  activeCategory = "Semua";
  renderPortfolio();
};

// Layanan: Fleksibel, Opsional, Bebas Mengganti & Menghapus
function renderServices() {
  const sectionEl = document.getElementById("services");
  const kickerEl = document.getElementById("services-kicker");
  const kickerContainer = document.getElementById("services-kicker-container");
  const headlineEl = document.getElementById("services-headline");
  const subheadlineEl = document.getElementById("services-subheadline");
  const container = document.getElementById("services-grid");
  const navLink = document.getElementById("nav-services-link");
  const mobileLink = document.getElementById("mobile-services-link");
  const footerLink = document.getElementById("footer-services-link");

  const srvSec = appState.agency?.servicesSection || { show: true };
  const servicesList = appState.services || [];

  // Jika bagian layanan dinonaktifkan (show = false)
  if (srvSec.show === false) {
    if (sectionEl) sectionEl.style.display = "none";
    if (navLink) navLink.style.display = "none";
    if (mobileLink) mobileLink.style.display = "none";
    if (footerLink) footerLink.style.display = "none";
    return;
  }

  // Tampilkan kembali elemen layanan
  if (sectionEl) sectionEl.style.display = "block";
  if (navLink) navLink.style.display = "inline-block";
  if (mobileLink) mobileLink.style.display = "block";
  if (footerLink) footerLink.style.display = "inline-block";

  // Kicker
  if (kickerEl && kickerContainer) {
    if (srvSec.kicker && srvSec.kicker.trim()) {
      kickerContainer.style.display = "flex";
      kickerEl.textContent = srvSec.kicker;
    } else {
      kickerContainer.style.display = "none";
    }
  }

  // Headline
  if (headlineEl) {
    headlineEl.textContent = srvSec.headline || "Solusi Komprehensif Siap Skala Besar.";
  }

  // Subheadline
  if (subheadlineEl) {
    if (srvSec.subheadline && srvSec.subheadline.trim()) {
      subheadlineEl.style.display = "block";
      subheadlineEl.textContent = srvSec.subheadline;
    } else {
      subheadlineEl.style.display = "none";
    }
  }

  if (!container) return;

  if (servicesList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
        <p class="text-slate-400 text-sm">Belum ada layanan yang ditambahkan. Gunakan panel admin untuk menambah layanan atau menyembunyikan bagian ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = servicesList.map((srv, idx) => `
    <div class="group relative flex flex-col justify-between p-8 bg-[#0D1017] rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-cyan-500/5">
      <div class="space-y-5">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
          </div>
          <span class="font-mono text-sm text-slate-500 group-hover:text-cyan-400 transition-colors">
            ${srv.number || String(idx + 1).padStart(2, '0')}.
          </span>
        </div>

        <div class="space-y-2">
          <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            ${srv.title}
          </h3>
          ${srv.description ? `
            <p class="text-sm text-slate-400 leading-relaxed">
              ${srv.description}
            </p>
          ` : ''}
        </div>

        ${srv.features && srv.features.length ? `
          <div class="pt-4 border-t border-white/5 space-y-2">
            ${srv.features.map(f => `
              <div class="flex items-start gap-2.5 text-xs text-slate-300">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                <span>${f}</span>
              </div>
            `).join("")}
          </div>
        ` : ''}
      </div>

      <div class="pt-6 mt-6 border-t border-white/5">
        <button
          type="button"
          onclick="window.selectServiceInquiry('${encodeURIComponent(srv.title)}')"
          class="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors py-1 cursor-pointer"
        >
          <span>Konsultasikan Layanan Ini</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </button>
      </div>
    </div>
  `).join("");
}

window.selectServiceInquiry = function(encodedTitle) {
  const title = decodeURIComponent(encodedTitle);
  const select = document.getElementById("inquiry-service");
  if (select) {
    let found = false;
    for (let opt of select.options) {
      if (opt.value === title) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      const newOpt = new Option(title, title, true, true);
      select.add(newOpt);
    }
  }
  const contactSec = document.getElementById("contact");
  if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
};

function renderAbout() {
  const about = appState.agency?.about || {};
  const headlineEl = document.getElementById("about-headline");
  const storyEl = document.getElementById("about-story");
  const statementEl = document.getElementById("about-statement");

  if (headlineEl) headlineEl.textContent = about.headline || "Membangun Produk Digital Berkualitas Tinggi.";
  if (storyEl) storyEl.textContent = about.story || "";
  if (statementEl) {
    if (about.statement && about.statement.trim()) {
      statementEl.style.display = "block";
      statementEl.textContent = `"${about.statement}"`;
    } else {
      statementEl.style.display = "none";
    }
  }

  // Pillars
  const pillarsContainer = document.getElementById("pillars-container");
  const pillarsList = appState.pillars || [];
  if (pillarsContainer) {
    if (pillarsList.length === 0) {
      pillarsContainer.style.display = "none";
    } else {
      pillarsContainer.style.display = "grid";
      pillarsContainer.innerHTML = pillarsList.map((p) => `
        <div class="p-8 bg-[#0D1017] rounded-2xl border border-white/10 space-y-4 hover:border-white/20 transition-all">
          <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
          </div>
          <h3 class="text-lg font-bold text-white tracking-tight">${p.title}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">${p.description}</p>
        </div>
      `).join("");
    }
  }

  // Testimonials
  const testContainer = document.getElementById("testimonials-container");
  const testList = appState.testimonials || [];
  if (testContainer) {
    if (testList.length === 0) {
      testContainer.parentElement.style.display = "none";
    } else {
      testContainer.parentElement.style.display = "block";
      testContainer.innerHTML = testList.map((t) => `
        <div class="flex flex-col justify-between p-6 bg-[#0B0D13] rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all space-y-4">
          <div class="space-y-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-cyan-400/50"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 7 4 10 7 10zm14 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 7 4 10 7 10z"/></svg>
            <p class="text-sm text-slate-300 leading-relaxed italic">"${t.quote}"</p>
          </div>
          <div class="pt-4 border-t border-white/5">
            <div class="font-semibold text-sm text-white">${t.author}</div>
            <div class="text-xs text-slate-400">${t.role} · <span class="text-cyan-400">${t.company}</span></div>
          </div>
        </div>
      `).join("");
    }
  }
}

// Kontak & Bagian Kolaborasi ("Mari Bangun Sesuatu yang Luar Biasa"): Opsional, Bebas Diedit & Dihapus
function renderContact() {
  const contactSectionEl = document.getElementById("contact");
  const contactSec = appState.agency?.contactSection || { show: true };
  const navContactLink = document.getElementById("nav-contact-link");
  const mobileContactLink = document.getElementById("mobile-contact-link");
  const footerContactLink = document.getElementById("footer-contact-link");

  // Jika seluruh section kontak dinonaktifkan:
  if (contactSec.show === false) {
    if (contactSectionEl) contactSectionEl.style.display = "none";
    if (navContactLink) navContactLink.style.display = "none";
    if (mobileContactLink) mobileContactLink.style.display = "none";
    if (footerContactLink) footerContactLink.style.display = "none";
    return;
  }

  // Tampilkan section kontak
  if (contactSectionEl) contactSectionEl.style.display = "block";
  if (navContactLink) navContactLink.style.display = "inline-block";
  if (mobileContactLink) mobileContactLink.style.display = "block";
  if (footerContactLink) footerContactLink.style.display = "inline-block";

  // Header Kontak ("Mari Bangun Sesuatu yang Luar Biasa")
  const headerContainer = document.getElementById("contact-header-container");
  const kickerContainer = document.getElementById("contact-kicker-container");
  const kickerEl = document.getElementById("contact-kicker");
  const headlineEl = document.getElementById("contact-headline");
  const subheadlineEl = document.getElementById("contact-subheadline");

  const kicker = contactSec.kicker !== undefined ? contactSec.kicker : "Mulai Kolaborasi · Intake Proyek Aktif";
  const headline = contactSec.headline !== undefined ? contactSec.headline : "Mari Bangun Sesuatu yang Luar Biasa.";
  const subheadline = contactSec.subheadline !== undefined ? contactSec.subheadline : "Punya ide proyek, membutuhkan desain ulang skala penuh, atau mencari partner teknis jangka panjang? Sampaikan kebutuhan Anda dan kami akan merespons dalam waktu 24 jam.";

  if (kickerContainer && kickerEl) {
    if (kicker && kicker.trim()) {
      kickerContainer.style.display = "flex";
      kickerEl.textContent = kicker;
    } else {
      kickerContainer.style.display = "none";
    }
  }

  if (headlineEl) {
    if (headline && headline.trim()) {
      headlineEl.style.display = "block";
      headlineEl.textContent = headline;
    } else {
      headlineEl.style.display = "none";
    }
  }

  if (subheadlineEl) {
    if (subheadline && subheadline.trim()) {
      subheadlineEl.style.display = "block";
      subheadlineEl.textContent = subheadline;
    } else {
      subheadlineEl.style.display = "none";
    }
  }

  if (headerContainer) {
    const hasAnyHeader = (kicker && kicker.trim()) || (headline && headline.trim()) || (subheadline && subheadline.trim());
    headerContainer.style.display = hasAnyHeader ? "block" : "none";
  }

  const channelsContainer = document.getElementById("contact-channels-container");
  const titleEl = document.getElementById("contact-channels-title");
  const emailItem = document.getElementById("contact-email-item");
  const emailEl = document.getElementById("contact-email");
  const emailLink = document.getElementById("contact-email-link");
  const phoneItem = document.getElementById("contact-phone-item");
  const phoneEl = document.getElementById("contact-phone");
  const phoneBtn = document.getElementById("contact-wa-btn");
  const addressItem = document.getElementById("contact-address-item");
  const addressEl = document.getElementById("contact-address");
  const hoursItem = document.getElementById("contact-hours-item");
  const hoursEl = document.getElementById("contact-hours");
  const waDirectContainer = document.getElementById("contact-wa-direct-container");
  const waDirectBtn = document.getElementById("contact-wa-direct");
  const formColumn = document.getElementById("contact-form-column");

  const channels = appState.agency?.contactChannels || { show: true };
  const contactLegacy = appState.agency?.contact || {};
  const email = channels.email !== undefined ? channels.email : contactLegacy.email;
  const phone = channels.phone !== undefined ? channels.phone : contactLegacy.phone;
  const address = channels.address !== undefined ? channels.address : contactLegacy.address;
  const hours = channels.hours !== undefined ? channels.hours : contactLegacy.hours;
  const title = channels.title || "Kanal Komunikasi Langsung";
  const showCard = channels.show !== false;
  const showWaBtn = channels.showWhatsAppButton !== false;
  const showForm = contactSec.showForm !== false;

  const hasAnyChannel = (email && email.trim()) || (phone && phone.trim()) || (address && address.trim()) || (hours && hours.trim());

  // Pengaturan Tampilan Kolom Form
  if (formColumn) {
    if (showForm) {
      formColumn.style.display = "block";
      if (!showCard || !hasAnyChannel) {
        formColumn.className = "col-span-12 max-w-2xl mx-auto w-full";
      } else {
        formColumn.className = "lg:col-span-7 w-full";
      }
    } else {
      formColumn.style.display = "none";
    }
  }

  // Pengaturan Tampilan Kartu Kanal Komunikasi
  if (!showCard || !hasAnyChannel) {
    if (channelsContainer) channelsContainer.style.display = "none";
  } else {
    if (channelsContainer) {
      channelsContainer.style.display = "block";
      if (!showForm) {
        channelsContainer.className = "col-span-12 max-w-xl mx-auto w-full space-y-8";
      } else {
        channelsContainer.className = "lg:col-span-5 space-y-8 w-full";
      }
    }
  }

  if (titleEl) titleEl.textContent = title;

  // Email Resmi (Opsional)
  if (emailItem && emailEl) {
    if (email && email.trim()) {
      emailItem.style.display = "block";
      emailEl.textContent = email;
      if (emailLink) emailLink.href = `mailto:${email}`;
    } else {
      emailItem.style.display = "none";
    }
  }

  // WhatsApp / Telepon (Opsional)
  const cleanWa = (phone || "").replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${cleanWa}?text=${encodeURIComponent("Halo DexxDigital, saya tertarik mendiskusikan proyek digital.")}`;

  if (phoneItem && phoneEl) {
    if (phone && phone.trim()) {
      phoneItem.style.display = "block";
      phoneEl.textContent = `${phone} (Chat Aktif)`;
      if (phoneBtn) phoneBtn.href = waLink;
    } else {
      phoneItem.style.display = "none";
    }
  }

  // Lokasi Studio (Opsional)
  if (addressItem && addressEl) {
    if (address && address.trim()) {
      addressItem.style.display = "flex";
      addressEl.textContent = address;
    } else {
      addressItem.style.display = "none";
    }
  }

  // Jam Operasional (Opsional)
  if (hoursItem && hoursEl) {
    if (hours && hours.trim()) {
      hoursItem.style.display = "flex";
      hoursEl.textContent = hours;
    } else {
      hoursItem.style.display = "none";
    }
  }

  // Tombol Chat Langsung WhatsApp (Opsional)
  if (waDirectContainer && waDirectBtn) {
    if (showWaBtn && cleanWa) {
      waDirectContainer.style.display = "block";
      waDirectBtn.href = waLink;
    } else {
      waDirectContainer.style.display = "none";
    }
  }
}

function renderFooter() {
  const agency = appState.agency || {};
  const brandName = agency.brandName || "DexxDigital";
  const brandEl = document.getElementById("footer-brand-name");
  const copyEl = document.getElementById("footer-copy-text");

  if (brandEl) brandEl.textContent = brandName;
  if (copyEl) copyEl.textContent = `2026 ${brandName}. Hak cipta dilindungi undang-undang.`;
}

function renderAll() {
  renderNavbar();
  renderHero();
  renderStats();
  renderPortfolio();
  renderServices();
  renderAbout();
  renderContact();
  renderFooter();
}

// --- PROJECT MODAL CONTROLLER ---
function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  document.getElementById("modal-title").textContent = project.title || "";
  document.getElementById("modal-category").textContent = project.category || "Karya";
  document.getElementById("modal-client").textContent = project.client || "-";
  document.getElementById("modal-year").textContent = project.year || "2026";
  document.getElementById("modal-summary").textContent = project.summary || "";
  document.getElementById("modal-challenge").textContent = project.challenge || "Menghadirkan arsitektur performa tinggi.";
  document.getElementById("modal-solution").textContent = project.solution || "Solusi rekayasa perangkat lunak modern DexxDigital.";

  const imgEl = document.getElementById("modal-image");
  if (imgEl) {
    imgEl.src = project.image || "/src/assets/images/project_fintech_platform_1794229795467.jpg";
  }

  const metricEl = document.getElementById("modal-metric");
  if (metricEl) {
    if (project.metric && project.metric.trim()) {
      metricEl.style.display = "flex";
      metricEl.querySelector("span").textContent = project.metric;
    } else {
      metricEl.style.display = "none";
    }
  }

  const liveLink = document.getElementById("modal-live-link");
  if (liveLink) {
    if (project.liveUrl && project.liveUrl.trim()) {
      liveLink.style.display = "inline-flex";
      liveLink.href = project.liveUrl;
    } else {
      liveLink.style.display = "none";
    }
  }

  // Deliverables
  const delivList = document.getElementById("modal-deliverables");
  if (delivList) {
    delivList.innerHTML = (project.deliverables || ["Web Application"]).map(d => `
      <li class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        <span>${d}</span>
      </li>
    `).join("");
  }

  // Tech stack
  const techList = document.getElementById("modal-technologies");
  if (techList) {
    techList.innerHTML = (project.technologies || ["Vanilla JS", "Tailwind CSS"]).map(t => `
      <span class="px-2.5 py-1 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 rounded-md">
        ${t}
      </span>
    `).join("");
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// --- HIDDEN ADMIN PANEL (SECRET TRIGGER) ---
let secretClickCount = 0;
let secretClickTimer = null;

function handleSecretClick() {
  secretClickCount++;
  const countBadge = document.getElementById("secret-click-count");
  if (countBadge) {
    countBadge.textContent = `${secretClickCount}/3`;
    countBadge.classList.remove("hidden");
  }

  if (secretClickCount >= 3) {
    clearTimeout(secretClickTimer);
    secretClickCount = 0;
    if (countBadge) countBadge.classList.add("hidden");
    openPinModal();
    return;
  }

  clearTimeout(secretClickTimer);
  secretClickTimer = setTimeout(() => {
    secretClickCount = 0;
    if (countBadge) countBadge.classList.add("hidden");
  }, 2200);
}

// Shortcut keyboard: Ctrl + Shift + A atau Cmd + Shift + A
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
    e.preventDefault();
    openPinModal();
  }
  if (e.key === "Escape") {
    closeProjectModal();
    closePinModal();
    closeAdminDashboard();
  }
});

function openPinModal() {
  const modal = document.getElementById("pin-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    const input = document.getElementById("pin-input");
    if (input) {
      input.value = "";
      input.focus();
    }
    const err = document.getElementById("pin-error");
    if (err) err.classList.add("hidden");
  }
}

function closePinModal() {
  const modal = document.getElementById("pin-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function openAdminDashboard() {
  closePinModal();
  const dashboard = document.getElementById("admin-dashboard");
  if (!dashboard) return;
  dashboard.classList.remove("hidden");
  dashboard.classList.add("flex");
  populateAdminForms();
}

function closeAdminDashboard() {
  const dashboard = document.getElementById("admin-dashboard");
  if (!dashboard) return;
  dashboard.classList.add("hidden");
  dashboard.classList.remove("flex");
}

// --- POPULATE ADMIN CMS FORMS ---
function populateAdminForms() {
  const agency = appState.agency || {};
  const hero = agency.hero || {};
  const about = agency.about || {};
  const channels = agency.contactChannels || {};
  const servicesSec = agency.servicesSection || {};

  // Logo Preview
  const logoPreview = document.getElementById("admin-logo-preview");
  if (logoPreview) {
    if (agency.logoUrl) {
      logoPreview.innerHTML = `<img src="${agency.logoUrl}" class="h-10 w-auto rounded border border-white/10" alt="Logo" />`;
    } else {
      logoPreview.innerHTML = `<span class="text-xs text-cyan-400 font-mono">Monogram Vektor DexxDigital (Bawaan)</span>`;
    }
  }

  // Brand Name
  const brandInput = document.getElementById("admin-brand-name");
  if (brandInput) brandInput.value = agency.brandName || "DexxDigital";

  // Hero Fields
  const kickerInput = document.getElementById("admin-hero-kicker");
  if (kickerInput) kickerInput.value = hero.kicker || "";

  const kickerIconSelect = document.getElementById("admin-hero-kicker-icon");
  if (kickerIconSelect) kickerIconSelect.value = hero.kickerIcon || "none";

  const headlineInput = document.getElementById("admin-hero-headline");
  if (headlineInput) headlineInput.value = hero.headline || "";

  const subheadlineInput = document.getElementById("admin-hero-subheadline");
  if (subheadlineInput) subheadlineInput.value = hero.subheadline || "";

  const ctaPrimaryInput = document.getElementById("admin-hero-cta1");
  if (ctaPrimaryInput) ctaPrimaryInput.value = hero.ctaPrimary || "";

  const ctaSecondaryInput = document.getElementById("admin-hero-cta2");
  if (ctaSecondaryInput) ctaSecondaryInput.value = hero.ctaSecondary || "";

  // About Fields
  const aboutHeadlineInput = document.getElementById("admin-about-headline");
  if (aboutHeadlineInput) aboutHeadlineInput.value = about.headline || "";

  const aboutStoryInput = document.getElementById("admin-about-story");
  if (aboutStoryInput) aboutStoryInput.value = about.story || "";

  const aboutStatementInput = document.getElementById("admin-about-statement");
  if (aboutStatementInput) aboutStatementInput.value = about.statement || "";

  // Contact Channels Fields
  const contactShowToggle = document.getElementById("admin-contact-show");
  if (contactShowToggle) contactShowToggle.checked = channels.show !== false;

  const contactTitleInput = document.getElementById("admin-contact-title");
  if (contactTitleInput) contactTitleInput.value = channels.title || "Kanal Komunikasi Langsung";

  const contactEmailInput = document.getElementById("admin-contact-email");
  if (contactEmailInput) contactEmailInput.value = channels.email || "";

  const contactPhoneInput = document.getElementById("admin-contact-phone");
  if (contactPhoneInput) contactPhoneInput.value = channels.phone || "";

  const contactAddressInput = document.getElementById("admin-contact-address");
  if (contactAddressInput) contactAddressInput.value = channels.address || "";

  const contactHoursInput = document.getElementById("admin-contact-hours");
  if (contactHoursInput) contactHoursInput.value = channels.hours || "";

  const contactWaBtnToggle = document.getElementById("admin-contact-wa-btn-toggle");
  if (contactWaBtnToggle) contactWaBtnToggle.checked = channels.showWhatsAppButton !== false;

  // Contact Section & Developer WhatsApp Fields
  const contactSec = agency.contactSection || {};
  const contactSecShow = document.getElementById("admin-contact-section-show");
  if (contactSecShow) contactSecShow.checked = contactSec.show !== false;

  const contactSecKicker = document.getElementById("admin-contact-section-kicker");
  if (contactSecKicker) contactSecKicker.value = contactSec.kicker || "";

  const contactDevWa = document.getElementById("admin-contact-dev-wa");
  if (contactDevWa) contactDevWa.value = contactSec.developerWhatsApp || channels.whatsapp || "6281289003344";

  const contactSecHeadline = document.getElementById("admin-contact-section-headline");
  if (contactSecHeadline) contactSecHeadline.value = contactSec.headline || "Mari Bangun Sesuatu yang Luar Biasa.";

  const contactSecSubheadline = document.getElementById("admin-contact-section-subheadline");
  if (contactSecSubheadline) contactSecSubheadline.value = contactSec.subheadline || "";

  const contactShowForm = document.getElementById("admin-contact-show-form");
  if (contactShowForm) contactShowForm.checked = contactSec.showForm !== false;

  // Services Section Header Settings
  const srvShowToggle = document.getElementById("admin-services-show");
  if (srvShowToggle) srvShowToggle.checked = servicesSec.show !== false;

  const srvKickerInput = document.getElementById("admin-services-kicker");
  if (srvKickerInput) srvKickerInput.value = servicesSec.kicker || "";

  const srvHeadlineInput = document.getElementById("admin-services-headline");
  if (srvHeadlineInput) srvHeadlineInput.value = servicesSec.headline || "Solusi Komprehensif Siap Skala Besar.";

  const srvSubheadlineInput = document.getElementById("admin-services-subheadline");
  if (srvSubheadlineInput) srvSubheadlineInput.value = servicesSec.subheadline || "";

  // PIN Field
  const pinInput = document.getElementById("admin-new-pin");
  if (pinInput) pinInput.value = agency.adminPin || "2026";

  // Reset Edit states & populate tables
  resetProjectForm();
  resetServiceForm();
  renderAdminProjectsTable();
  renderAdminServicesTable();
}

function showAdminToast(msg, isError = false) {
  const toast = document.getElementById("admin-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `px-6 py-2.5 text-xs font-medium flex items-center gap-2 ${
    isError 
      ? 'bg-rose-500/20 text-rose-300 border-b border-rose-500/30' 
      : 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30'
  }`;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
}

// Reset form proyek
function resetProjectForm() {
  const form = document.getElementById("admin-add-project-form");
  if (form) form.reset();
  const editId = document.getElementById("edit-proj-id");
  if (editId) editId.value = "";
  const heading = document.getElementById("proj-form-heading");
  if (heading) heading.textContent = "+ Tambah Proyek Portofolio Baru";
  const cancelBtn = document.getElementById("btn-cancel-edit-proj");
  if (cancelBtn) cancelBtn.classList.add("hidden");
  const submitBtn = document.getElementById("btn-submit-project");
  if (submitBtn) submitBtn.textContent = "Simpan Proyek";
  
  selectedProjectImageData = null;
  const previewBox = document.getElementById("new-proj-preview-box");
  if (previewBox) {
    previewBox.classList.add("hidden");
    previewBox.classList.remove("flex");
  }
  const customCat = document.getElementById("new-proj-custom-category");
  if (customCat) customCat.classList.add("hidden");
}

// Render Admin Projects Table
function renderAdminProjectsTable() {
  const tbody = document.getElementById("admin-projects-tbody");
  if (!tbody) return;
  const list = appState.projects || [];

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-6 text-center text-slate-500">
          Belum ada proyek dalam daftar. Tambahkan melalui form di atas.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map((p) => `
    <tr class="hover:bg-white/[0.02] border-b border-white/5">
      <td class="py-3 px-4 flex items-center gap-3">
        <img src="${p.image || '/src/assets/images/project_fintech_platform_1794229795467.jpg'}" class="w-10 h-10 object-cover rounded border border-white/10 shrink-0" onerror="this.src='/src/assets/images/project_fintech_platform_1794229795467.jpg'"/>
        <div>
          <div class="font-semibold text-white">${p.title}</div>
          <div class="text-[11px] text-cyan-400 font-mono">${p.metric || ''}</div>
        </div>
      </td>
      <td class="py-3 px-4 text-slate-400">
        <span class="px-2 py-0.5 rounded bg-white/5 border border-white/5">${p.category || '-'}</span>
      </td>
      <td class="py-3 px-4 text-slate-300">${p.client || '-'}</td>
      <td class="py-3 px-4 font-mono text-slate-400">${p.year || '2026'}</td>
      <td class="py-3 px-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button type="button" class="px-2.5 py-1 text-xs text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 rounded cursor-pointer" onclick="window.adminEditProject('${p.id}')">
            Edit
          </button>
          <button type="button" class="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded cursor-pointer" onclick="window.adminDeleteProject('${p.id}')">
            Hapus
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

window.adminEditProject = function(pid) {
  const p = (appState.projects || []).find(x => x.id === pid);
  if (!p) return;

  document.getElementById("edit-proj-id").value = p.id;
  document.getElementById("proj-form-heading").textContent = `Edit Proyek: "${p.title}"`;
  document.getElementById("btn-cancel-edit-proj").classList.remove("hidden");
  document.getElementById("btn-submit-project").textContent = "Perbarui Proyek";

  document.getElementById("new-proj-title").value = p.title || "";
  document.getElementById("new-proj-client").value = p.client || "";
  document.getElementById("new-proj-year").value = p.year || "2026";
  document.getElementById("new-proj-metric").value = p.metric || "";
  document.getElementById("new-proj-summary").value = p.summary || "";
  document.getElementById("new-proj-tech").value = (p.technologies || []).join(", ");
  document.getElementById("new-proj-link").value = p.liveUrl || "";
  document.getElementById("new-proj-img").value = p.image || "";

  // Category
  const catSelect = document.getElementById("new-proj-category");
  const customCatInput = document.getElementById("new-proj-custom-category");
  let found = false;
  for (let opt of catSelect.options) {
    if (opt.value === p.category) {
      opt.selected = true;
      found = true;
      break;
    }
  }
  if (!found && p.category) {
    catSelect.value = "__custom__";
    customCatInput.value = p.category;
    customCatInput.classList.remove("hidden");
  } else {
    customCatInput.classList.add("hidden");
  }

  // Foto preview
  if (p.image) {
    selectedProjectImageData = p.image;
    const previewBox = document.getElementById("new-proj-preview-box");
    const previewImg = document.getElementById("new-proj-preview-img");
    if (previewBox && previewImg) {
      previewImg.src = p.image;
      previewBox.classList.remove("hidden");
      previewBox.classList.add("flex");
    }
  }

  document.getElementById("admin-add-project-form")?.scrollIntoView({ behavior: "smooth" });
};

window.adminDeleteProject = function(pid) {
  if (confirm("Yakin ingin menghapus proyek ini?")) {
    appState.projects = (appState.projects || []).filter(p => p.id !== pid);
    saveLocalData(appState);
    syncToFirebase(appState);
    renderPortfolio();
    renderAdminProjectsTable();
    showAdminToast("Proyek berhasil dihapus.");
  }
};

// Reset form layanan
function resetServiceForm() {
  const form = document.getElementById("admin-add-service-form");
  if (form) form.reset();
  const editId = document.getElementById("edit-srv-id");
  if (editId) editId.value = "";
  const heading = document.getElementById("srv-form-heading");
  if (heading) heading.textContent = "+ Tambah Layanan Baru";
  const cancelBtn = document.getElementById("btn-cancel-edit-srv");
  if (cancelBtn) cancelBtn.classList.add("hidden");
  const submitBtn = document.getElementById("btn-submit-service");
  if (submitBtn) submitBtn.textContent = "Simpan Layanan";
}

// Render Admin Services Table
function renderAdminServicesTable() {
  const container = document.getElementById("admin-services-list");
  if (!container) return;
  const list = appState.services || [];

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-500 border border-dashed border-white/5 rounded-lg">
        Belum ada layanan yang terdaftar. Tambahkan melalui form di atas.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((s, idx) => `
    <div class="p-4 bg-[#08090C] rounded-lg border border-white/5 flex items-center justify-between gap-4">
      <div>
        <div class="text-xs font-mono text-cyan-400">${s.number || String(idx + 1).padStart(2, '0')}.</div>
        <div class="font-bold text-white text-sm">${s.title}</div>
        <div class="text-xs text-slate-400 line-clamp-1">${s.description || ''}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button type="button" class="px-2.5 py-1 text-xs text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 rounded cursor-pointer" onclick="window.adminEditService('${s.id}')">
          Edit
        </button>
        <button type="button" class="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded cursor-pointer" onclick="window.adminDeleteService('${s.id}')">
          Hapus
        </button>
      </div>
    </div>
  `).join("");
}

window.adminEditService = function(sid) {
  const s = (appState.services || []).find(x => x.id === sid);
  if (!s) return;

  document.getElementById("edit-srv-id").value = s.id;
  document.getElementById("srv-form-heading").textContent = `Edit Layanan: "${s.title}"`;
  document.getElementById("btn-cancel-edit-srv").classList.remove("hidden");
  document.getElementById("btn-submit-service").textContent = "Perbarui Layanan";

  document.getElementById("new-srv-title").value = s.title || "";
  document.getElementById("new-srv-number").value = s.number || "01";
  document.getElementById("new-srv-desc").value = s.description || "";
  document.getElementById("new-srv-features").value = (s.features || []).join(", ");

  document.getElementById("admin-add-service-form")?.scrollIntoView({ behavior: "smooth" });
};

window.adminDeleteService = function(sid) {
  if (confirm("Yakin ingin menghapus layanan ini?")) {
    appState.services = (appState.services || []).filter(s => s.id !== sid);
    saveLocalData(appState);
    syncToFirebase(appState);
    renderServices();
    renderAdminServicesTable();
    showAdminToast("Layanan berhasil dihapus.");
  }
};

// --- INITIALIZE EVENT LISTENERS ON DOM LOAD ---
document.addEventListener("DOMContentLoaded", async () => {
  // Render awal instan dari cache lokal
  renderAll();

  // Ambil data remote dari Firebase Firestore jika ada
  if (firebaseConnected) {
    const remote = await fetchFromFirebase();
    if (remote && remote.agency) {
      appState = {
        ...INITIAL_DATA,
        ...remote,
        agency: {
          ...INITIAL_DATA.agency,
          ...remote.agency,
          servicesSection: { ...INITIAL_DATA.agency.servicesSection, ...(remote.agency?.servicesSection || {}) },
          contactChannels: { ...INITIAL_DATA.agency.contactChannels, ...(remote.agency?.contactChannels || {}) }
        }
      };
      saveLocalData(appState);
      renderAll();
    }
  }

  // Secret trigger di footer (klik 3x)
  const secretTrigger = document.getElementById("secret-admin-trigger");
  if (secretTrigger) {
    secretTrigger.addEventListener("click", handleSecretClick);
  }

  // PIN Form Submit
  const pinForm = document.getElementById("pin-form");
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = (document.getElementById("pin-input")?.value || "").trim();
      const actual = (appState.agency?.adminPin || "2026").trim();
      if (entered === actual) {
        openAdminDashboard();
      } else {
        const err = document.getElementById("pin-error");
        if (err) err.classList.remove("hidden");
      }
    });
  }

  // Close buttons
  document.getElementById("btn-close-pin")?.addEventListener("click", closePinModal);
  document.getElementById("btn-close-admin")?.addEventListener("click", closeAdminDashboard);
  document.getElementById("btn-close-modal")?.addEventListener("click", closeProjectModal);

  // Tab switching in Admin
  const adminTabs = document.querySelectorAll(".admin-tab-btn");
  adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      adminTabs.forEach(t => {
        t.classList.remove("bg-cyan-400", "text-black", "font-semibold");
        t.classList.add("text-slate-400");
      });
      tab.classList.add("bg-cyan-400", "text-black", "font-semibold");
      tab.classList.remove("text-slate-400");

      const target = tab.getAttribute("data-tab");
      document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.add("hidden"));
      const activeContent = document.getElementById(`tab-content-${target}`);
      if (activeContent) activeContent.classList.remove("hidden");
    });
  });

  // Logo Upload Handler
  const logoInput = document.getElementById("admin-logo-file");
  if (logoInput) {
    logoInput.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const optimized = await optimizeImageFile(file, 600, 300, 0.9);
        appState.agency.logoUrl = optimized;
        saveLocalData(appState);
        await syncToFirebase(appState);
        renderNavbar();
        populateAdminForms();
        showAdminToast("Logo baru berhasil diunggah dan disimpan ke Firebase!");
      } catch (err) {
        console.error("Logo upload error:", err);
        showAdminToast("Gagal memproses gambar logo", true);
      }
    });
  }

  // Reset Logo
  document.getElementById("btn-reset-logo")?.addEventListener("click", async () => {
    appState.agency.logoUrl = null;
    saveLocalData(appState);
    await syncToFirebase(appState);
    renderNavbar();
    populateAdminForms();
    showAdminToast("Logo dikembalikan ke monogram vektor bawaan.");
  });

  // Save Content & Contact Channels Form
  document.getElementById("admin-save-content")?.addEventListener("click", async () => {
    const brandName = document.getElementById("admin-brand-name")?.value.trim() || "DexxDigital";
    const kicker = document.getElementById("admin-hero-kicker")?.value.trim();
    const kickerIcon = document.getElementById("admin-hero-kicker-icon")?.value || "none";
    const headline = document.getElementById("admin-hero-headline")?.value.trim();
    const subheadline = document.getElementById("admin-hero-subheadline")?.value.trim();
    const cta1 = document.getElementById("admin-hero-cta1")?.value.trim();
    const cta2 = document.getElementById("admin-hero-cta2")?.value.trim();

    const aboutHeadline = document.getElementById("admin-about-headline")?.value.trim();
    const aboutStory = document.getElementById("admin-about-story")?.value.trim();
    const aboutStatement = document.getElementById("admin-about-statement")?.value.trim();

    // Contact channels fields
    const contactShow = document.getElementById("admin-contact-show")?.checked ?? true;
    const contactTitle = document.getElementById("admin-contact-title")?.value.trim() || "Kanal Komunikasi Langsung";
    const contactEmail = document.getElementById("admin-contact-email")?.value.trim();
    const contactPhone = document.getElementById("admin-contact-phone")?.value.trim();
    const contactAddress = document.getElementById("admin-contact-address")?.value.trim();
    const contactHours = document.getElementById("admin-contact-hours")?.value.trim();
    const contactWaBtnToggle = document.getElementById("admin-contact-wa-btn-toggle")?.checked ?? true;

    appState.agency.brandName = brandName;
    appState.agency.hero.kicker = kicker;
    appState.agency.hero.kickerIcon = kickerIcon;
    appState.agency.hero.headline = headline;
    appState.agency.hero.subheadline = subheadline;
    appState.agency.hero.ctaPrimary = cta1;
    appState.agency.hero.ctaSecondary = cta2;

    appState.agency.about.headline = aboutHeadline;
    appState.agency.about.story = aboutStory;
    appState.agency.about.statement = aboutStatement;

    appState.agency.contactChannels = {
      show: contactShow,
      title: contactTitle,
      email: contactEmail,
      phone: contactPhone,
      whatsapp: contactPhone ? contactPhone.replace(/[^0-9]/g, "") : "",
      address: contactAddress,
      hours: contactHours,
      showWhatsAppButton: contactWaBtnToggle
    };

    // Bagian Kolaborasi ("Mari Bangun Sesuatu yang Luar Biasa") & WhatsApp Developer
    const contactSecShow = document.getElementById("admin-contact-section-show")?.checked ?? true;
    const contactSecKicker = document.getElementById("admin-contact-section-kicker")?.value.trim() || "";
    const contactDevWa = document.getElementById("admin-contact-dev-wa")?.value.trim() || "6281289003344";
    const contactSecHeadline = document.getElementById("admin-contact-section-headline")?.value.trim() || "Mari Bangun Sesuatu yang Luar Biasa.";
    const contactSecSubheadline = document.getElementById("admin-contact-section-subheadline")?.value.trim() || "";
    const contactShowForm = document.getElementById("admin-contact-show-form")?.checked ?? true;

    appState.agency.contactSection = {
      show: contactSecShow,
      kicker: contactSecKicker,
      headline: contactSecHeadline,
      subheadline: contactSecSubheadline,
      showForm: contactShowForm,
      developerWhatsApp: contactDevWa
    };

    // Sinkronkan ke contact legacy juga
    appState.agency.contact.email = contactEmail;
    appState.agency.contact.phone = contactPhone;
    appState.agency.contact.whatsapp = contactPhone ? contactPhone.replace(/[^0-9]/g, "") : "";
    appState.agency.contact.address = contactAddress;
    appState.agency.contact.hours = contactHours;

    saveLocalData(appState);
    const synced = await syncToFirebase(appState);
    renderAll();
    showAdminToast(synced ? "Konten & Kanal Komunikasi berhasil disimpan ke Firebase!" : "Konten tersimpan di cache lokal!");
  });

  // Services Header Save Button
  document.getElementById("btn-save-services-header")?.addEventListener("click", async () => {
    const show = document.getElementById("admin-services-show")?.checked ?? true;
    const kicker = document.getElementById("admin-services-kicker")?.value.trim();
    const headline = document.getElementById("admin-services-headline")?.value.trim();
    const subheadline = document.getElementById("admin-services-subheadline")?.value.trim();

    appState.agency.servicesSection = {
      show,
      kicker,
      headline: headline || "Solusi Komprehensif Siap Skala Besar.",
      subheadline
    };

    saveLocalData(appState);
    await syncToFirebase(appState);
    renderServices();
    showAdminToast("Pengaturan Bagian Layanan berhasil disimpan ke Firebase!");
  });

  // Project Category selector toggle custom
  const projCatSelect = document.getElementById("new-proj-category");
  const projCustomCat = document.getElementById("new-proj-custom-category");
  if (projCatSelect && projCustomCat) {
    projCatSelect.addEventListener("change", () => {
      if (projCatSelect.value === "__custom__") {
        projCustomCat.classList.remove("hidden");
        projCustomCat.focus();
      } else {
        projCustomCat.classList.add("hidden");
      }
    });
  }

  // Project Image File Selection
  const projFileInput = document.getElementById("new-proj-file");
  if (projFileInput) {
    projFileInput.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        selectedProjectImageData = await optimizeImageFile(file, 1200, 800, 0.82);
        const previewBox = document.getElementById("new-proj-preview-box");
        const previewImg = document.getElementById("new-proj-preview-img");
        if (previewBox && previewImg) {
          previewImg.src = selectedProjectImageData;
          previewBox.classList.remove("hidden");
          previewBox.classList.add("flex");
        }
        showAdminToast("Foto proyek siap disimpan!");
      } catch (err) {
        console.error("Gagal membaca foto proyek:", err);
        showAdminToast("Gagal memproses file foto", true);
      }
    });
  }

  // Clear Project File Button
  document.getElementById("btn-clear-proj-file")?.addEventListener("click", () => {
    selectedProjectImageData = null;
    if (projFileInput) projFileInput.value = "";
    const previewBox = document.getElementById("new-proj-preview-box");
    if (previewBox) {
      previewBox.classList.add("hidden");
      previewBox.classList.remove("flex");
    }
  });

  // Cancel Edit Project
  document.getElementById("btn-cancel-edit-proj")?.addEventListener("click", () => {
    resetProjectForm();
  });

  // Add / Edit Project Form Submit
  document.getElementById("admin-add-project-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editId = document.getElementById("edit-proj-id")?.value;
    const title = document.getElementById("new-proj-title")?.value.trim();
    let category = document.getElementById("new-proj-category")?.value;
    if (category === "__custom__") {
      category = document.getElementById("new-proj-custom-category")?.value.trim() || "Aplikasi Web";
    }

    const client = document.getElementById("new-proj-client")?.value.trim();
    const year = document.getElementById("new-proj-year")?.value.trim() || "2026";
    const metric = document.getElementById("new-proj-metric")?.value.trim();
    const summary = document.getElementById("new-proj-summary")?.value.trim();
    const techStr = document.getElementById("new-proj-tech")?.value.trim();
    const liveLink = document.getElementById("new-proj-link")?.value.trim();
    const externalImg = document.getElementById("new-proj-img")?.value.trim();

    if (!title) return;

    // Foto: prioritaskan file lokal yang baru dipilih, lalu fallback ke URL, lalu bawaan
    const finalImage = selectedProjectImageData || externalImg || "/src/assets/images/project_fintech_platform_1794229795467.jpg";

    if (editId) {
      // Mode Edit: Update proyek yang ada
      appState.projects = (appState.projects || []).map(p => {
        if (p.id === editId) {
          return {
            ...p,
            title,
            category,
            client: client || "",
            year,
            metric: metric || "",
            summary: summary || "",
            image: finalImage,
            liveUrl: liveLink || "",
            technologies: techStr ? techStr.split(",").map(s => s.trim()).filter(Boolean) : p.technologies
          };
        }
        return p;
      });
      showAdminToast(`Proyek "${title}" berhasil diperbarui!`);
    } else {
      // Mode Tambah Baru
      const newProject = {
        id: "proj-" + Date.now(),
        title,
        category,
        client: client || "",
        year,
        metric: metric || "",
        summary: summary || "",
        image: finalImage,
        challenge: "Kebutuhan transformasi digital modern dengan reliabilitas tinggi.",
        solution: "Pembangunan arsitektur sistem berbasis web dan performa maksimal.",
        deliverables: [category, "Desain UI/UX"],
        technologies: techStr ? techStr.split(",").map(s => s.trim()).filter(Boolean) : ["JavaScript", "Tailwind CSS"],
        liveUrl: liveLink || ""
      };
      appState.projects = [newProject, ...(appState.projects || [])];
      showAdminToast(`Proyek "${title}" berhasil ditambahkan & disimpan!`);
    }

    saveLocalData(appState);
    await syncToFirebase(appState);
    resetProjectForm();
    renderPortfolio();
    renderAdminProjectsTable();
  });

  // Cancel Edit Service
  document.getElementById("btn-cancel-edit-srv")?.addEventListener("click", () => {
    resetServiceForm();
  });

  // Add / Edit Service Form Submit
  document.getElementById("admin-add-service-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editId = document.getElementById("edit-srv-id")?.value;
    const title = document.getElementById("new-srv-title")?.value.trim();
    const number = document.getElementById("new-srv-number")?.value.trim();
    const desc = document.getElementById("new-srv-desc")?.value.trim();
    const featStr = document.getElementById("new-srv-features")?.value.trim();

    if (!title) return;

    if (editId) {
      // Mode Edit Service
      appState.services = (appState.services || []).map(s => {
        if (s.id === editId) {
          return {
            ...s,
            title,
            number: number || s.number,
            description: desc || "",
            features: featStr ? featStr.split(",").map(f => f.trim()).filter(Boolean) : s.features
          };
        }
        return s;
      });
      showAdminToast(`Layanan "${title}" berhasil diperbarui!`);
    } else {
      // Mode Add Service
      const newService = {
        id: "srv-" + Date.now(),
        number: number || String((appState.services || []).length + 1).padStart(2, '0'),
        title,
        description: desc || "",
        features: featStr ? featStr.split(",").map(f => f.trim()).filter(Boolean) : ["Kualitas Unggul", "Pengiriman Tepat Waktu"]
      };
      appState.services = [...(appState.services || []), newService];
      showAdminToast(`Layanan "${title}" berhasil ditambahkan!`);
    }

    saveLocalData(appState);
    await syncToFirebase(appState);
    resetServiceForm();
    renderServices();
    renderAdminServicesTable();
  });

  // Change PIN
  document.getElementById("btn-save-pin")?.addEventListener("click", async () => {
    const newPin = (document.getElementById("admin-new-pin")?.value || "").trim();
    if (newPin.length < 4) {
      showAdminToast("PIN minimal 4 karakter", true);
      return;
    }
    appState.agency.adminPin = newPin;
    saveLocalData(appState);
    await syncToFirebase(appState);
    showAdminToast("PIN Admin berhasil diubah!");
  });

  // Manual Firebase Sync Button
  document.getElementById("btn-manual-sync")?.addEventListener("click", async () => {
    const success = await syncToFirebase(appState);
    if (success) {
      showAdminToast("Database Firebase tersinkronisasi 100%!");
    } else {
      showAdminToast("Gagal sinkronisasi Firebase, periksa koneksi.", true);
    }
  });

  // Export JSON Backup
  document.getElementById("btn-export-backup")?.addEventListener("click", () => {
    const jsonStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dexxdigital_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showAdminToast("File backup JSON berhasil diunduh.");
  });

  // Reset Factory Defaults
  document.getElementById("btn-factory-reset")?.addEventListener("click", async () => {
    if (confirm("Kembalikan seluruh data dan logo ke setelan pabrik awal?")) {
      appState = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveLocalData(appState);
      await syncToFirebase(appState);
      renderAll();
      populateAdminForms();
      showAdminToast("Data telah dikembalikan ke setelan pabrik.");
    }
  });

  // Contact Form Submission (Otomatis ke WhatsApp Developer)
  const contactForm = document.getElementById("public-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("inquiry-name")?.value.trim();
      const email = document.getElementById("inquiry-email")?.value.trim();
      const service = document.getElementById("inquiry-service")?.value || "Pengembangan Web & SaaS Full-Stack";
      const budget = document.getElementById("inquiry-budget")?.value || "Rp 25 Juta – Rp 50 Juta";
      const message = document.getElementById("inquiry-message")?.value.trim();

      if (!name || !email || !message) {
        alert("Harap lengkapi nama, email, dan deskripsi kebutuhan proyek Anda.");
        return;
      }

      // Ambil nomor WhatsApp Developer tujuan
      let devPhone = appState.agency?.contactSection?.developerWhatsApp || appState.agency?.contactChannels?.whatsapp || "6281289003344";
      let cleanPhone = devPhone.replace(/\D/g, "");
      if (cleanPhone.startsWith("0")) {
        cleanPhone = "62" + cleanPhone.slice(1);
      }
      if (!cleanPhone) cleanPhone = "6281289003344";

      // Susun pesan WhatsApp korporat yang rapi
      const waText = 
`*KONSULTASI PROYEK BARU - DEXXDIGITAL*

Halo Developer DexxDigital, ada formulir konsultasi masuk dari website:

* Nama / Perusahaan: ${name}
* Email Bisnis: ${email}
* Layanan yang Dipilih: ${service}
* Estimasi Anggaran: ${budget}

* Deskripsi Kebutuhan Proyek:
"${message}"

------------------------------------
Waktu: ${new Date().toLocaleString("id-ID")}
Dikirim otomatis melalui website portofolio DexxDigital.`;

      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

      // Buka otomatis WhatsApp di tab baru
      try {
        window.open(waUrl, "_blank");
      } catch (err) {
        console.warn("Popup blocked, fallback button available:", err);
      }

      // Sembunyikan form dan tampilkan kartu konfirmasi interaktif
      document.getElementById("contact-form-container")?.classList.add("hidden");
      const successBox = document.getElementById("contact-success-container");
      if (successBox) {
        successBox.classList.remove("hidden");
        const clientNameEl = document.getElementById("success-client-name");
        if (clientNameEl) clientNameEl.textContent = name;
        const openChatBtn = document.getElementById("btn-wa-open-chat");
        if (openChatBtn) {
          openChatBtn.href = waUrl;
        }
      }

      // Simpan backup inquiry ke Firebase Firestore (jika terhubung)
      if (db && firebaseConnected) {
        try {
          const inquiryRef = doc(db, "dexxdigital_inquiries", "inq_" + Date.now());
          setDoc(inquiryRef, {
            name,
            email,
            service,
            budget,
            message,
            developerTarget: cleanPhone,
            createdAt: new Date().toISOString()
          }).catch(err => console.warn("Inquiry sync warning:", err));
        } catch (err) {
          console.warn("Inquiry firestore error:", err);
        }
      }
    });
  }

  // Reset inquiry form
  document.getElementById("btn-new-inquiry")?.addEventListener("click", () => {
    document.getElementById("contact-form-container").classList.remove("hidden");
    document.getElementById("contact-success-container").classList.add("hidden");
    contactForm.reset();
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("hidden");
    });
    mobileDrawer.querySelectorAll("a, button").forEach(item => {
      item.addEventListener("click", () => {
        mobileDrawer.classList.add("hidden");
      });
    });
  }
});
