const nodeMailer = require('nodemailer')

class MailService {

  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }

    })
  }

  async sendActivationLink(to, link) {

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject : 'Активация аккаунта на escposel.ru',
      text: '',
      html: `
        <div>
        <h1>Для активации аккаунта перейдите по <a href="${link}">ссылке</a> </h1>
</div>
      `
    })

  }
}

module.exports = new MailService()