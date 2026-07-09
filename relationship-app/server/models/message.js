module.exports = {
  create: async (params) => ({ id: 'msg_' + Date.now(), threadId: params.threadId, sender: params.sender, body: params.body, createdAt: new Date().toISOString() }),
  listByThread: async (threadId) => ([{ id: 'msg_demo_1', threadId, body: 'Demo message', createdAt: new Date().toISOString() }])
};
