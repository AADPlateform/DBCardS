import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Phone, Mail, MapPin, Globe, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix for default marker icon in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import logo from '../assets/LogoAAD.jpg';
import profileImg from '../assets/AyoubDelileche.jpg';
import snapchatImg from '../assets/Snapchat.png';
// import portfolioPdf from '../assets/Portfolio.pdf';

const orangeIcon = L.divIcon({
  html: `<svg viewBox="0 0 24 24" width="42" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#F97316" />
    <circle cx="12" cy="9" r="3" fill="white"/>
  </svg>`,
  className: 'custom-orange-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const CardOne = () => {
  const position = [36.193923443217955, 5.445426896383672]; // Coordinates for Sétif area

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Ayoub Delileche
ORG:Ayoub Delileche
TITLE:Ayoub Delileche .
TEL;TYPE=WORK,VOICE:+213774979960
EMAIL;TYPE=PREF,INTERNET:Delilecheayoub@gmail.com
URL:
ADR;TYPE=WORK:;;Cité 200 logts 1014;Sétif,Algerie
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ayoub-delileche.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat']  px-6 flex flex-col items-start max-w-md mx-auto">
      {/* Header Logo */}
      {/* <Link to="/" className="w-full">
        <div className="w-full pb-6 flex justify-center pr-8">
          <img src={logo} alt="Paroxysme Architecture" className="max-w-[250px] object-contain" />
        </div>
      </Link> */}

      {/* Profile Section */}
      <div className="relative mb-10 mt-5 w-full">
        <div className=" aspect-4/5 w-full relative overflow-hidden ">
          <img
            src={profileImg}
            alt="Ayoub Delileche"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-auto   object-cover"
          />
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-left w-full mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-black mb-1">AYOUB DELILECHE</h1>
        <p className="text-xl font-medium text-black">Délégué commercial</p>
      </div>

      {/* Contact List */}
      <div className="w-full space-y-6 mb-10">
        <a href="https://wa.me/213774979960" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Phone size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Whatsapp: +213 774 979 960</span>
        </a>
        <a href="tel:+213774979960" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Phone size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Appel :+213 774 979 960</span>
        </a>
        <a href="mailto:Delilecheayoub@gmail.com" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Mail size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium break-all">Delilecheayoub@gmail.com</span>
        </a>
        <div className="flex items-start gap-5 text-base text-gray-800 group">
          <MapPin size={22} className="text-black mt-1 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Cité 200 logts 1014<br /> Sétif,Algerie</span>
        </div>
        {/* <a href="http://www.paroxysme-architecture.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Globe size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">www.paroxysme-architecture.com</span>
        </a> */}
      </div>

      {/* Social Links */}
      <div className="flex justify-start items-center gap-6 w-full mb-6">
        <a href="https://web.facebook.com/people/Ay-Oub-Delileche/pfbid02haW2VfqfY2QN8Jd9VACqAL2XUmfvsQDbQRPUH54UxsYU3WRPqgHk8S32ve9kox7hl/?mibextid=wwXIfr&rdid=JWcf1umsgSc5eFog&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1RyyjHfPhJ%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr" target="_blank" rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#1877F2] transition-colors">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/dl.ayoub?igsh=MXY0cGNseW43Mjdsaw==" target="_blank" rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#E4405F] transition-colors">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        {/* <a href="https://www.linkedin.com/in/axel-azizi-690840217/" target="_blank" rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#0A66C2] transition-colors">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a> */}
        <a href="https://www.snapchat.com/@ayoub_delileche?sender_web_id=743b8896-3661-49c1-a7c9-ae69115052cc&device_type=desktop&is_copy_url=true" target="_blank" rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70">
          <img src={snapchatImg} alt="Snapchat" width="24" height="24" className="object-contain" />
        </a>
        <a href="https://www.tiktok.com/@dl..ayoub?_r=1&_t=ZS-97NJjjeFrXQ" target="_blank" rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </a>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 mb-10">
        <a
          href="https://wa.me/213774979960" target="_blank" rel="noopener noreferrer"
          className="block w-full py-4 border border-black text-black font-bold text-sm tracking-widest text-center uppercase rounded hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-sm"
        >
          ENVOYER UN MESSAGE
        </a>
        <button
          onClick={downloadVCard}
          className="w-full py-4 bg-black text-white font-bold text-sm tracking-widest uppercase rounded hover:bg-orange-500 transition-all shadow-md cursor-pointer"
        >
          ENREGISTRER CONTACT
        </button>

      </div>

      {/* Map Section */}
      <div className="w-full mb-4">
        <div className="h-[250px] w-full border border-gray-200  hover:grayscale-0 transition-all duration-500 overflow-hidden rounded-sm">
          <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={orangeIcon}>
              <Popup>
                Ayoub Delileche <br /> Cité 200 logts 1014, Sétif
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Itinerary Button */}
      <div className="w-full mb-12">
        <button
          onClick={() => window.open(`https://www.google.com/maps/place/5CWV%2B464,+19000+cit%C3%A9,+S%C3%A9tif/@36.1949716,5.4427731,19.31z/data=!4m6!3m5!1s0x12f3144e47f7a033:0x945a87c6531518d0!8m2!3d36.1951769!4d5.4429371!16s%2Fg%2F11fsjw6x8k?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D`, '_blank')}
          className="w-full mt-4   py-4 bg-white text-black font-bold text-sm border border-black tracking-widest uppercase rounded hover:bg-orange-500 transition-all shadow-md cursor-pointer"
        >
          ITINÉRAIRE
        </button>
        {/* <a
          href={portfolioPdf}
          download="Portfolio-Axel-Azizi.pdf"
          className="mt-3 flex items-center bg-black text-white justify-center gap-2 w-full py-4 font-bold text-sm tracking-widest uppercase rounded hover:bg-orange-500 transition-all shadow-sm"
        >
          <Download size={18} />
          TÉLÉCHARGER PORTFOLIO
        </a> */}
      </div>

      {/* Subtle Footer */}
      <footer className="mt-auto pt-8 pb-4 text-[10px] text-gray-400 uppercase tracking-[0.2em] mx-auto">
        &copy; 2026 Axel Azizi Design
      </footer>
    </div>
  );
};

export default CardOne;
