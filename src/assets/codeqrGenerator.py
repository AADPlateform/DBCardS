import qrcode

# Le contenu du QR code (lien, texte, numéro, etc.)
data = "https://aadplateform.vercel.app/aissaoui-moncef"


# Génération directe (méthode simple)
img = qrcode.make(data)

# Sauvegarde
img.save("QRMonceff.png")
