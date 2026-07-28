import qrcode

# Le contenu du QR code (lien, texte, numéro, etc.)
data = "https://aziziaxel82456.github.io/DBCard/fadhlo"


# Génération directe (méthode simple)
img = qrcode.make(data)

# Sauvegarde
img.save("Fadhlo.png")
