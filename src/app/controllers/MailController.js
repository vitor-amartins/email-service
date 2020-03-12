import Queue from '../lib/Queue';
import Mail from '../lib/Mail';

export default {
  async sendAsync(req, res) {
    const { from, to, subject, content } = req.body;

    const mail = {
      from,
      to,
      subject,
      content,
    };

    await Queue.add('SendMail', { mail });

    return res.status(200).json({ success: true, data: mail });
  },
  async sendSync(req, res) {
    const { from, to, subject, content } = req.body;

    const mail = {
      from,
      to,
      subject,
      content,
    };

    try {
      await Mail.sendMail({
        from: `${mail.from.name} <${mail.from.email}>`,
        to: `${mail.to.name} <${mail.to.email}>`,
        subject: mail.subject,
        html: mail.content,
      });
    } catch (err) {
      return res.status(500).json({ success: false, data: mail });
    }
    return res.status(200).json({ success: true, data: mail });
  }
};
