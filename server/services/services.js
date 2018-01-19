const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/puppies.json');

module.exports = {
  determineStartingId: () => {
    let MAX = -Infinity;
    let puppies = fs.readFileSync(filePath, 'utf8');
    puppies = JSON.parse(puppies);

    if (!puppies.length) {
      return 1;
    }

    puppies.forEach(puppy => {
      if (puppy.id >= MAX) {
        MAX = puppy.id;
      }
    });

    return MAX + 1;
  }
};
