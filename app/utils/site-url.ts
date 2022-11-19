export const baseUrl = (req: Request) => new URL(req.url).origin;
