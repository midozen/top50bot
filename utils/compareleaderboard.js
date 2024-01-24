function detectChange(oldArray, newArray) {
  const result = [];

  for (let i = 0; i < oldArray.length; i++) {
    const oldPlayer = oldArray[i];
    const newPlayer = newArray[i];

    if (oldPlayer.user.username !== newPlayer.user.username) {
      const oldPerformance = Number(oldPlayer.pp.toFixed(1));
      const newPerformance = Number(newPlayer.pp.toFixed(1));

      // find player's old rank by finding their username
      const oldRank = oldArray.findIndex(player => player.user.username === newPlayer.user.username) + 1;
      const newRank = i + 1;

      result.push(`**${newPlayer.user.username}** has now changed from rank **#${oldRank}** to **#${newRank}**. ${oldRank > newRank ? `Gain of **${Math.round(newPerformance - oldPerformance)}** PP` : ''}`);
    }
  }

  return result.length === 1 ? false : result.join("\n");
}

module.exports = detectChange;