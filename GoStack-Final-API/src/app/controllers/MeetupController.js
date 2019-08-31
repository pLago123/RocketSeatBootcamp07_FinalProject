import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO, subHours } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

import Notification from '../schemas/Notification';

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    // Send back error if data is invalid.
    if (!req.query.page || !req.query.date) {
      return res.status(400).json({ error: 'Invalid data.' });
    }

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      include: [{ model: User, attributes: ['id'] }],
      limit: 10,
      offset: 10 * (page - 1),
    });

    return res.json(meetups);
  }

  async store(req, res) {
    // Body validation.
    const schema = Yup.object().shape({
      file_id: Yup.number().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation failed.' });
    }

    // Check if the date is already past.
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date already past.' });
    }

    // Check if user is logged in.
    const user = await User.findByPk(req.userId);

    if (req.userId !== user.id) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Put the user ID into the body.
    req.body.user_id = req.userId;

    // Create Meetup.
    const meetup = await Meetup.create(req.body);

    return res.json(meetup);
  }

  async update(req, res) {
    // Body validation
    const schema = Yup.object().shape({
      file_id: Yup.number(),
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    // Check if user is logged in.
    const user = await User.findByPk(req.userId);

    if (req.userId !== user.id) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Get the meetup to be delted.
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== user.id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    // Check if the date is already past.
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date already past.' });
    }

    // Check if meetup is already due.
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Cannot update past meetups.' });
    }

    /*
     * Notify user about meetup update.
     */

    // Get Subscriptions related to this meetup.
    const subscriptions = await Subscription.findAll({
      where: { meetup_id: meetup.id },
    });

    // Add a notification to each registered user.
    subscriptions.map(async subscription => {
      await Notification.create({
        content: `Meetup ${meetup.title} created by ${user.name} was updated!`,
        user: subscription.user_id,
      });
    });

    // Update meetup.
    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    // Check if user is logged in.
    const user = await User.findByPk(req.userId);

    if (req.userId !== user.id) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Get the meetup id from the route.
    const meetup = await Meetup.findByPk(req.params.id);

    // Check if user is the meetup's owner.
    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    // Check if the date is already past.
    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Date already past' });
    }

    // Check if it is still time to cancel.
    const dateSub = subHours(meetup.date, 2);

    if (isBefore(dateSub, new Date())) {
      return res
        .status(401)
        .json({ error: 'Too late! Your guests are waiting for you!' });
    }

    /*
     * Notify user about meetup cancelation.
     */

    // Get Subscriptions related to this meetup.
    const subscriptions = await Subscription.findAll({
      where: { meetup_id: meetup.id },
    });

    // Add a notification to each registered user.
    subscriptions.map(async subscription => {
      await Notification.create({
        content: `Meetup ${meetup.title} created by ${user.name} was canceled!`,
        user: subscription.user_id,
      });
    });

    // Delete it.
    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
