import nodemailer from 'nodemailer'
interface SendEmailProps {
  from: string | undefined
  to: string | undefined
  subject: string | undefined
  html: string | undefined
}

function sendEmail(message: SendEmailProps) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    })
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err)
        rej(err)
      } else {
        console.log(info)
        res(info)
      }
    })
  })
}

export const sendConfirmationEmail = (username: string, email: string, password: string, confirmLink: string) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: email,
    subject: 'Подтверждение почты на сайте Impossible-Possible',
    html: `
      <h3> Здравствуйте ${username} </h3>
      <p>Чтобы подтвердить ваш email, перейдите <a target="_" href="${process.env.DOMAIN_NAME}/api/users/activate/${confirmLink}">по этой ссылке</a></p>
      <p>Ваш логин: ${email}</p>
      <p>Ваш пароль: ${password}</p>
    `,
  }

  return sendEmail(message)
}
