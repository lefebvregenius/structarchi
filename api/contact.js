export default async function handler(req, res) {
  // Autoriser seulement POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Méthode non autorisée" });
  }

  try {
    const { name, email, message } = req.body;

    // Vérification simple
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Tous les champs sont requis"
      });
    }

    // Simulation (tu peux remplacer plus tard par email, DB, etc.)
    console.log("📩 Nouveau message StructArchi:");
    console.log("Nom:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    return res.status(200).json({
      success: true,
      message: "Message envoyé avec succès"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Erreur serveur"
    });
  }
}