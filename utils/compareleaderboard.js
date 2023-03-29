function detectChange(oldArray, newArray) {
  const result = [];

  const date = new Date();
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().substr(-2);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timezone = 'UTC';

  result.push(`Update as of ${month}/${day}/${year} at ${hour}:${minute} ${timezone}:`);

  for (let i = 0; i < oldArray.length; i++) {
    const oldPlayer = oldArray[i];
    const newPlayer = newArray[i];

    if (oldPlayer.user.username !== newPlayer.user.username) {
      const oldPerformance = Number(oldPlayer.pp.toFixed(1));
      const newPerformance = Number(newPlayer.pp.toFixed(1));

      // find player's old rank by finding their username
      const oldRank = oldArray.findIndex(player => player.user.username === newPlayer.user.username) + 1;
      const newRank = i + 1;

      result.push(`${newPlayer.user.username} has now changed from rank #${oldRank} to #${newRank}. ${oldRank > newRank ? `Gain of ${Math.round(newPerformance - oldPerformance)} PP` : ''}`);
    }
  }

  return result.length === 1 ? false : result.join("\n");
}

module.exports = detectChange;