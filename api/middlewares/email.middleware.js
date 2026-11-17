// Importe Nodemailer pour envoyer des emails depuis Node.js
import nodemailer from "nodemailer";

// Charge les variables du fichier .env
import "dotenv/config";

// Crée le transporteur qui va envoyer les emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// Fonction qui envoie un email de confirmation au client
export async function sendReservationEmail(user, reservation, ticket) {

  // Définit les informations de l'email
  const mailOptions = {
    from: `"ZombieLand" <${process.env.EMAIL_USER}>`, // Nom et adresse de l'expéditeur

    to: user.mail, // Adresse email du client

    subject: "Confirmation de votre réservation - ZombieLand", // Objet de l'email

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

        <h1 style="color: #ff0000;">Bienvenue à ZombieLand !</h1>

        <p>Bonjour ${user.first_name} ${user.last_name},</p>

        <p>Votre réservation a bien été enregistrée.</p>

        <h3>Détails de votre réservation :</h3>

        <ul>
          <li><strong>Référence :</strong> ${reservation.reference}</li>
          <li><strong>Billet :</strong> ${ticket.name}</li>
          <li><strong>Quantité :</strong> ${reservation.quantity}</li>
          <li><strong>Date de visite :</strong> ${new Date(reservation.date_entrance).toLocaleDateString("fr-FR")}</li>
        </ul>

        <p>Merci d'avoir choisi ZombieLand !</p>

        <p>L'équipe ZombieLand</p>

      </div>
    `,
  };

  // Envoie l'email et retourne le résultat de l'envoi
  try {
  const info = await transporter.sendMail(mailOptions);

  console.log("Email envoyé avec succès !");
  console.log("Message ID :", info.messageId);
  console.log("Aperçu Ethereal :", nodemailer.getTestMessageUrl(info));

  return info;

} catch (error) {
  console.error("Erreur d'envoi de l'email :", error);
  throw error;
}
}