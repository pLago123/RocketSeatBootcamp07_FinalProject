import Meetup from '../models/Meetup';
import File from '../models/File';

class Host {
  async index(req, res) {
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);
    const banner = await File.findByPk(meetup.file_id);

    if (req.userId !== meetup.user_id) {
      return res
        .status(400)
        .json({ error: 'You do not have permission to read this data.' });
    }

    return res.json({ meetup, banner });
  }
}

export default new Host();
