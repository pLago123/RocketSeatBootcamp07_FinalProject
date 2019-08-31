import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'New subscription',
      template: 'subscription',
      context: {
        owner: meetup.User.name,
        user: user.name,
        userEmail: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
