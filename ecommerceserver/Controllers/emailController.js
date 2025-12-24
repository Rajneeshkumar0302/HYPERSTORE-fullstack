// controllers/emailController.js
import { transporter } from "../config/emailConfig.js";

export const sendWelcomeEmail = async (toEmail, fullName) => {
  try {
    const mailOptions = {
      from: `"Hyper Store" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "🎉 Welcome to Hyper Store!",
      html: `

      <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; padding:5px;">
  <tr>
    <td align="center" style="padding: 20px; background: #ffffff; font-family: Arial, sans-serif; color: rgb(244, 120, 25);">

      <!-- IMAGE WRAPPED IN TABLE FOR PERFECT CENTERING + CIRCLE -->
      <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
        <tr>
          <td 
            style="
              width: 230px;
              height: 230px;
              border-radius: 50%;
              overflow: hidden;
              border:3px solid rgb(210,110,35);
              text-align: center;
            ">
            <img 
              src="https://res.cloudinary.com/dcx4sk4cm/image/upload/v1763465700/hyperstorecanvas_tuvy7l.png"
              alt="Hyperstore"
              width="230"
              height="230"
              style="display: block;"
            />
          </td>
        </tr>
      </table>

      <h2 style="margin-top: 20px; color: rgb(244, 120, 25);">
        Hello ! ${fullName},
      </h2>

      <p style="font-size: 16px; color: rgb(244, 120, 25);">
        Thank you for signing up at 
        <b style="color:rgb(60,105,5)">Hyper Store</b>!
      </p>

      <p style="font-size: 16px; color: rgb(244, 120, 25);">
        We're excited to have you with us.
      </p>

      <p style="
        font-size: 18px; 
        font-weight: bold; 
        margin-top: 25px; 
        color: rgb(244, 120, 25); ">
        Happy shopping! 🛒
      </p>

    </td>
  </tr>
</table>

      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Welcome email sent to:", toEmail);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};
