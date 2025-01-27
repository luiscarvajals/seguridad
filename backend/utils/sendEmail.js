import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  // creando cuenta de test
  let testAccount = await nodemailer.createTestAccount();

  // Usando Ethereal para pruebas de email
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", 
    port: 587, 
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let info = await transporter.sendMail({
    from: '"UCB Admin" <no-reply@ucb.com>', 
    to, 
    subject,
    text,
    html
  });

  console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  // test link generado en consola para ver el email enviado
}
