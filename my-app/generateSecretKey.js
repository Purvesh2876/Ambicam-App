const crypto = require('crypto');

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

console.log(generateSecretKey());
58a155b1eab820305e911e22f41d4abba3a1f8dc39dd0148d878a14bec415355f34ebde2eed34e25ebb277f1d3fe60ea60ffd70d2fe92f2160121a51bde42c43