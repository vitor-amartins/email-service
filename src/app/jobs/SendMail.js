import Mail from '../lib/Mail';

export default {
  key: 'SendMail',
  options: {
    attempts: 3,
  },
  async handle({ data }) {
    const { mail } = data;

    await Mail.sendMail({
      from: `${mail.from.name} <${mail.from.email}>`,
      to: `${mail.to.name} <${mail.to.email}>`,
      subject: mail.subject,
      html: mail.content,
    });
  },
};
