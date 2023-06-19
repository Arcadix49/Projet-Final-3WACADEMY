import Team from "../models/teamsModel.js";

export const joinTeam = async (req, res) => {
  const { code } = req.params;
  const userID = req.userID;

  try {
    const team = await Team.findOne({ code });
    if (!team) {
      return res.status(400).json({ message: 'Aucune Équipe trouvée avec ce code' });
    }
    if (team.players.includes(userID)) {
      return res.status(400).json({ message: 'Utilisateur déjà dans  une équipe' });
    }
    team.players.push(userID);
    await team.save();
    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};