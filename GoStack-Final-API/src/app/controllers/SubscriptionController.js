import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const list = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: { [Op.gt]: new Date() },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(list);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    if (meetup.user_id === user.id) {
      return res
        .status(400)
        .json({ error: 'Cannot subscribe to your own meetups.' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'Cannot subscribe to past meetups.' });
    }

    const subscription = await Subscription.findOne({
      where: { user_id: user.id },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (subscription) {
      return res
        .status(400)
        .json({ error: 'Cannot subscribe to two meetups at the same time.' });
    }

    const enroll = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    // SEND E-MAIL
    await Queue.add(SubscriptionMail.key, { meetup, user });

    return res.json(enroll);
  }
}

export default new SubscriptionController();
