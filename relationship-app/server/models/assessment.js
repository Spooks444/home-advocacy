module.exports = {
  create: async (params) => ({ id: 'assessment_' + Date.now(), type: params.type, responses: params.responses, createdAt: new Date().toISOString() })
};
