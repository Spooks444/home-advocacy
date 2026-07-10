module.exports = {
  auth: {
    headerName: 'x-household-token',
    headerProfile: 'x-profile-id',
    tokenSecret: process.env.HOUSEHOLD_TOKEN_SECRET || 'change-me',
  },
};
