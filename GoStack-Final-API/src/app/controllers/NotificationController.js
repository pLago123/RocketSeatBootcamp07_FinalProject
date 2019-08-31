import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    // Check if user is logged in.
    const user = await User.findByPk(req.userId);

    if (req.userId !== user.id) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const notifications = await Notification.find({
      user: user.id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
