import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
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
import profileImg from '../assets/Axel-azizi.jpg';

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
  const position = [36.19518164709221, 5.442911930158505]; // Coordinates for Sétif area

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:AZIZI AXEL
ORG:Axel Azizi Design
TITLE:Design & development.
TEL;TYPE=WORK,VOICE:+213556577950 
TEL;TYPE=WORK,VOICE:+213560001659
EMAIL;TYPE=PREF,INTERNET:axelazizipro17@gmail.com
URL:
ADR;TYPE=WORK:;;Cité 127 logts EPBTP B F2 N°385;Sétif,Algerie
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'azizi-axel.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat']  px-6 flex flex-col items-start max-w-md mx-auto">
      {/* Header Logo */}
      <Link to="/" className="w-full">
        <div className="w-full pb-6 flex justify-center pr-8">
          <img src={logo} alt="Paroxysme Architecture" className="max-w-[250px] object-contain" />
        </div>
      </Link>

      {/* Profile Section */}
      <div className="relative mb-10 w-full">
        <div className=" aspect-4/5 w-full relative overflow-hidden ">
          <img
            src={profileImg}
            alt="Azizi Axel"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-auto   object-cover"
          />
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-left w-full mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-black mb-1">AZIZI AXEL</h1>
        <p className="text-xl font-medium text-black">Design & Development.</p>
      </div>

      {/* Contact List */}
      <div className="w-full space-y-6 mb-10">
        <a href="tel:+213556577950" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Phone size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Whatsapp: +213 556 577 950</span>
        </a>
        <a href="tel:+213560001659" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Phone size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Appel :+213 560 001 659</span>
        </a>
        <a href="mailto:axelazizipro17@gmail.com" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Mail size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium break-all">axelazizipro17@gmail.com</span>
        </a>
        <div className="flex items-start gap-5 text-base text-gray-800 group">
          <MapPin size={22} className="text-black mt-1 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Cité 127 logts EPBTP B F2 N°385<br /> Sétif,Algerie</span>
        </div>
        {/* <a href="http://www.paroxysme-architecture.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-base text-gray-800 hover:text-black transition-colors group">
          <Globe size={22} className="text-black shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">www.paroxysme-architecture.com</span>
        </a> */}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 mb-10">
        <a
          href="tel:+213556577950"
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
                Axel Azizi Design <br /> Cité 127 logts EPBTP B F2 N°385, Sétif
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Itinerary Button */}
      <div className="w-full mb-12">
        <button
          onClick={() => window.open(`https://www.google.com/maps/place/5CWV%2B464,+19000+cit%C3%A9,+S%C3%A9tif/@36.1949716,5.4427731,19.31z/data=!4m6!3m5!1s0x12f3144e47f7a033:0x945a87c6531518d0!8m2!3d36.1951769!4d5.4429371!16s%2Fg%2F11fsjw6x8k?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D`, '_blank')}
          className="w-full py-4 bg-black text-white font-bold text-sm tracking-widest uppercase rounded hover:bg-orange-500 transition-all shadow-md cursor-pointer"
        >
          ITINÉRAIRE
        </button>
      </div>

      {/* Subtle Footer */}
      <footer className="mt-auto pt-8 pb-4 text-[10px] text-gray-400 uppercase tracking-[0.2em] mx-auto">
        &copy; 2026 Axel Azizi Design
      </footer>
    </div>
  );
};

export default CardOne;
