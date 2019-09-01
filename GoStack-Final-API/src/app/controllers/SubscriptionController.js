import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import File from '../models/File';
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

    const data = list.map(async item => {
      const { id } = item;
      const { title, date, location } = item.Meetup;
      const file = await File.findByPk(item.Meetup.file_id);
      const user = await User.findByPk(item.Meetup.user_id);

      return { id, title, location, date, File: file, User: user };
    });

    const payload = await Promise.all(data);

    return res.json(payload);
    // return res.json(list);
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

  async delete(req, res) {
    // Check if user is logged in.
    const user = await User.findByPk(req.userId);

    if (req.userId !== user.id) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const subscription = await Subscription.findByPk(req.params.id);

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
