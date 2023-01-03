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
  
    result.push(`Update as of ${month}/${day}/${year} at ${hour}:${minute} ${timezone}:`)
  
    for (let i = 0; i < oldArray.length; i++) {
      const oldPlayer = oldArray[i];
      const newPlayer = newArray[i];
  
      if (oldPlayer.name !== newPlayer.name) {
        const oldPerformance = Number(oldPlayer.performance.replaceAll(',', ''));
        const newPerformance = Number(newPlayer.performance.replaceAll(',', ''));
        console.log(oldPerformance)
        console.log(newPerformance)

        const oldRank = oldArray.findIndex(p => p.name === newPlayer.name) + 1;
        const newRank = i + 1;
        result.push(`${newPlayer.name} has now changed from rank #${oldRank} to #${newRank}. Gain of ${newPerformance - oldPerformance} PP`);
      }
    }
  
    if (result.length === 1) {
      return false;
    } else {
      return result.join('\n');
    }
}

module.exports = detectChange;