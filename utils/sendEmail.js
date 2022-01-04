const sgMail = require('@sendgrid/mail')

const sendEmail = async ({ email, subject, html }) => {
  await sgMail.setApiKey(process.env.EMAIL_API_KEY)

  const msg = {
    to: email,
    from: '2oldisc3@gmail.com',
    subject,
    html,
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail
