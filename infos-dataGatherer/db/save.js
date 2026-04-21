import db from './index';

export default async function (providerResponse) {
  // TODO pseudocode
  const message = await db.query(
    "insert into messages (infoProviderId, text) values ?",
    { infoProviderId: providerResponse.providerId, text: providerResponse.text }
  );
  const userIds = await db.query("select userId from userInfoProviders where infoProviderId = ?", providerResponse.providerId);
  db.query(
    "insert into userMessages (userId, infoproviderId, messageId, isDelivered) values ?",
    userIds.map((userId) => ({
      userId,
      infoProviderId: providerResponse.providerId,
      messageId: message.id,
      isDelivered: false,
    }))
  );
  // ---------------
}
