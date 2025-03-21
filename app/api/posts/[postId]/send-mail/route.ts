import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Nodemailer yapılandırması
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-posta içeriği
    const mailOptions = {
      from: `"Dr Gulf Panel" <${process.env.EMAIL_USER}>`,
      to: "resdfg32@gmail.com", // Bu adresi kendinize göre güncelleyin
      subject: "New Application Form Submission",
      text: `
        📋 New Application Form Submission:

        📝 Full Name: ${data.fullName}
        📧 Email: ${data.email}
        📱 Phone: ${data.phone}
        🏥 Department: ${data.department}
        🏢 Hospital: ${data.hospital}
        🎓 Graduation Year: ${data.graduationYear}
        🌐 English Proficiency: ${data.englishLevel}
      `,
    };

    // E-posta gönderme işlemi
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Message sent: %s", info.messageId);

    // Başarılı yanıt
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Terminale detaylı hata mesajını yazdır
    console.error("❌ Error sending email:", error);

    // Hata yanıtı döndür
    return NextResponse.json(
      { message: "An error occurred while sending the email." },
      { status: 500 }
    );
  }
}
