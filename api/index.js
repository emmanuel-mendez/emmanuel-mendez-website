export default async (req, res) => {
  const { reqHandler } = await import('../dist/emmanuel-mendez-website/server/server.mjs');
  return reqHandler(req, res);
};