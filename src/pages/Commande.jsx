import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LogoAAD.jpg';

const today = () => new Date().toISOString().split('T')[0];

const PRODUCTS = [
  { label: 'Carte Standard', fournisseur: 1500 },
];

const Commande = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: today(),
    commercial: '',
    clientName: '',
    clientTitle: '',
    clientPhone1: '',
    clientPhone2: '',
    clientPhone3: '',
    clientEmail: '',
    clientWebsite: '',
    clientSocialFb: '',
    clientSocialIg: '',
    clientSocialSnap: '',
    clientSocialLi: '',
    clientSocialTt: '',
    clientSocialYt: '',
    clientAddress: '',
    clientLocation: '',
    clientPhoto: null,
    clientLogo: null,
    produit: 'Carte Standard',
    prixVente: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (name) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const selectedProduct = PRODUCTS.find((p) => p.label === form.produit) || PRODUCTS[0];
  const prixFournisseur = selectedProduct.fournisseur;
  const prixVente = parseFloat(form.prixVente) || 0;
  const benefice = prixVente - prixFournisseur;

  const phones = [form.clientPhone1, form.clientPhone2, form.clientPhone3].filter(Boolean);

  const getImgDims = (dataUrl) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve(null);
      img.src = dataUrl;
    });

  const addImageProp = async (doc, dataUrl, x, y, maxW, maxH) => {
    try {
      const dims = await getImgDims(dataUrl);
      if (!dims) return null;
      const scale = Math.min(maxW / dims.w, maxH / dims.h, 1);
      const fw = dims.w * scale;
      const fh = dims.h * scale;
      doc.addImage(dataUrl, 'JPEG', x, y, fw, fh);
      return { fw, fh };
    } catch (_) {
      return null;
    }
  };

  const generatePDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const pageW = 190;
    let y = 20;

    // Logo
    await addImageProp(doc, logo, 14, y, 30, 12);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('BON DE COMMANDE', pageW / 2, y + 8, { align: 'center' });

    y += 20;
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 8;

    // Date + Commercial
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date : ${form.date || today()}`, 14, y);
    doc.text(`Commercial : ${form.commercial || '—'}`, 105, y);
    y += 8;

    // Client section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CLIENT', 14, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const socialLinks = [
      form.clientSocialFb && `FB : ${form.clientSocialFb}`,
      form.clientSocialIg && `IG : ${form.clientSocialIg}`,
      form.clientSocialSnap && `Snap : ${form.clientSocialSnap}`,
      form.clientSocialLi && `LinkedIn : ${form.clientSocialLi}`,
      form.clientSocialTt && `TikTok : ${form.clientSocialTt}`,
      form.clientSocialYt && `YT : ${form.clientSocialYt}`,
    ].filter(Boolean);

    const ci = [
      `Nom : ${form.clientName || '—'}`,
      form.clientTitle && `Titre : ${form.clientTitle}`,
      ...phones.map((p, i) => `Tél ${i + 1} : ${p}`),
      form.clientEmail && `Email : ${form.clientEmail}`,
      form.clientWebsite && `Site : ${form.clientWebsite}`,
      ...socialLinks,
      form.clientAddress && `Adresse : ${form.clientAddress}`,
      form.clientLocation && `Localisation : ${form.clientLocation}`,
    ].filter(Boolean);

    ci.forEach((line) => {
      const split = doc.splitTextToSize(line, 130);
      doc.text(split, 14, y);
      y += 5 * split.length;
    });

    // Client photo & logo — preserves original aspect ratio
    const imgX = 155;
    if (form.clientPhoto) {
      const r = await addImageProp(doc, form.clientPhoto, imgX, 48, 25, 30);
      if (r) doc.setFontSize(7).text('Photo client', imgX + r.fw / 2, 80, { align: 'center' });
    }
    if (form.clientLogo) {
      const r = await addImageProp(doc, form.clientLogo, imgX, 85, 25, 15);
      if (r) doc.setFontSize(7).text('Logo client', imgX + r.fw / 2, 102, { align: 'center' });
    }

    y += 4;
    doc.line(10, y, 200, y);
    y += 6;

    // Order table
    const colX = [14, 84, 114, 144, 170];
    const headers = ['Produit', 'Qté', 'Px Fourn.', 'Px Vente', 'Bénéf.'];

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    headers.forEach((h, i) => doc.text(h, colX[i] + 2, y + 4));

    y += 6;
    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(10, y, 200, y);
    y += 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(form.produit || '—', colX[0] + 2, y + 4);
    doc.text('1', colX[1] + 2, y + 4);
    doc.text(`${prixFournisseur.toFixed(0)} DA`, colX[2] + 2, y + 4);
    doc.text(`${prixVente.toFixed(0)} DA`, colX[3] + 2, y + 4);
    doc.text(`${benefice.toFixed(0)} DA`, colX[4] + 2, y + 4);

    y += 10;
    doc.line(10, y, 200, y);
    y += 8;

    // Totals
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Total Fournisseur : ${prixFournisseur.toFixed(0)} DA`, 14, y);
    doc.text(`Total Vente : ${prixVente.toFixed(0)} DA`, 105, y);
    y += 7;
    doc.setFontSize(12);
    doc.setTextColor(0, 150, 0);
    doc.text(`Bénéfice Commercial : ${benefice.toFixed(0)} DA`, 14, y);
    doc.setTextColor(0);

    // Notes
    if (form.notes) {
      y += 12;
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.setFont('helvetica', 'normal');
      doc.text('Notes :', 14, y);
      y += 5;
      doc.text(form.notes, 14, y);
    }

    const filename = `commande_${form.clientName || 'client'}_${(form.date || today()).replace(/-/g, '')}.pdf`;
    doc.save(filename);
    return filename;
  };

  const handleSubmit = async () => {
    const filename = await generatePDF();

    const lines = [
      '*NOUVELLE COMMANDE*',
      `Date : ${form.date || today()}`,
      `Commercial : ${form.commercial || '—'}`,
      '',
      '— CLIENT —',
      `Nom : ${form.clientName || '—'}`,
      form.clientTitle && `Titre : ${form.clientTitle}`,
      ...phones.map((p, i) => `Tél ${i + 1} : ${p}`),
      form.clientEmail && `Email : ${form.clientEmail}`,
      form.clientWebsite && `Site : ${form.clientWebsite}`,
      form.clientSocialFb && `Facebook : ${form.clientSocialFb}`,
      form.clientSocialIg && `Instagram : ${form.clientSocialIg}`,
      form.clientSocialSnap && `Snapchat : ${form.clientSocialSnap}`,
      form.clientSocialLi && `LinkedIn : ${form.clientSocialLi}`,
      form.clientSocialTt && `TikTok : ${form.clientSocialTt}`,
      form.clientSocialYt && `YouTube : ${form.clientSocialYt}`,
      form.clientAddress && `Adresse : ${form.clientAddress}`,
      form.clientLocation && `Localisation : ${form.clientLocation}`,
      '',
      '— COMMANDE —',
      `Produit : ${form.produit}`,
      `Prix Fournisseur : ${prixFournisseur.toFixed(0)} DA`,
      `Prix de vente : ${prixVente.toFixed(0)} DA`,
      `Bénéfice Commercial : ${benefice.toFixed(0)} DA`,
      form.notes && `Notes : ${form.notes}`,
      '',
      `📎 PDF téléchargé : ${filename}`,
    ];

    const text = lines.filter(Boolean).join('\n');

    window.open(
      `https://wa.me/213556577950?text=${encodeURIComponent(text)}`,
      '_blank',
    );
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat'] px-4 py-6 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Nouvelle Commande</h1>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-4">
        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        {/* Commercial */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Commercial
          </label>
          <input
            type="text"
            name="commercial"
            value={form.commercial}
            onChange={handleChange}
            placeholder="Nom du commercial"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        {/* ─── Client ─── */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-1">
            Client
          </h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Nom & Prénom
          </label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            placeholder="Nom & Prénom"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Titre / Fonction
          </label>
          <input
            type="text"
            name="clientTitle"
            value={form.clientTitle}
            onChange={handleChange}
            placeholder="PDG, Gérant, Indépendant…"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Téléphone 1
          </label>
          <input
            type="tel"
            name="clientPhone1"
            value={form.clientPhone1}
            onChange={handleChange}
            placeholder="+213 6XX XX XX XX"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Téléphone 2 <span className="text-gray-300 font-normal">(optionnel)</span>
          </label>
          <input
            type="tel"
            name="clientPhone2"
            value={form.clientPhone2}
            onChange={handleChange}
            placeholder="+213 6XX XX XX XX"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Téléphone 3 <span className="text-gray-300 font-normal">(optionnel)</span>
          </label>
          <input
            type="tel"
            name="clientPhone3"
            value={form.clientPhone3}
            onChange={handleChange}
            placeholder="+213 6XX XX XX XX"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Email
          </label>
          <input
            type="email"
            name="clientEmail"
            value={form.clientEmail}
            onChange={handleChange}
            placeholder="client@email.com"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Site web
          </label>
          <input
            type="url"
            name="clientWebsite"
            value={form.clientWebsite}
            onChange={handleChange}
            placeholder="https://"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Réseaux sociaux
          </label>
          <div className="space-y-2">
            <input type="url" name="clientSocialFb" value={form.clientSocialFb} onChange={handleChange} placeholder="Facebook — lien" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
            <input type="url" name="clientSocialIg" value={form.clientSocialIg} onChange={handleChange} placeholder="Instagram — lien" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
            <input type="url" name="clientSocialSnap" value={form.clientSocialSnap} onChange={handleChange} placeholder="Snapchat — lien" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
            <input type="url" name="clientSocialLi" value={form.clientSocialLi} onChange={handleChange} placeholder="LinkedIn — lien" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
            <input type="url" name="clientSocialTt" value={form.clientSocialTt} onChange={handleChange} placeholder="TikTok — lien" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
            <input type="url" name="clientSocialYt" value={form.clientSocialYt} onChange={handleChange} placeholder="YouTube — lien" className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Adresse
          </label>
          <textarea
            name="clientAddress"
            value={form.clientAddress}
            onChange={handleChange}
            placeholder="Adresse complète"
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Localisation — lien Google Maps
          </label>
          <input
            type="url"
            name="clientLocation"
            value={form.clientLocation}
            onChange={handleChange}
            placeholder="https://maps.google.com/?q=..."
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Photo de profil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile('clientPhoto')}
              className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Logo client
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile('clientLogo')}
              className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
        </div>

        {/* ─── Commande ─── */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-1">
            Commande
          </h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Produit
          </label>
          <select
            name="produit"
            value={form.produit}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
          >
            {PRODUCTS.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Prix Fournisseur (DA)
            </label>
            <input
              type="number"
              value={prixFournisseur}
              disabled
              className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2.5 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Prix Vente Client (DA)
            </label>
            <input
              type="number"
              name="prixVente"
              value={form.prixVente}
              onChange={handleChange}
              min="0"
              placeholder="0"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Benefice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
            Bénéfice Commercial
          </div>
          <div className="text-xl font-bold text-orange-600">
            {benefice.toFixed(0)} DA
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Informations complémentaires..."
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-4 bg-black text-white font-bold text-sm tracking-widest uppercase rounded hover:bg-orange-500 transition-all shadow-md flex items-center justify-center gap-3"
      >
        <Send size={18} />
        ENVOYER À L'ADMINISTRATION
      </button>
    </div>
  );
};

export default Commande;
