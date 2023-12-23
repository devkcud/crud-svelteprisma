import { prisma } from '$lib/server/prisma';

export const load = async ({ params }: { params: { id: string } }) => {
  return { article: await prisma.article.findUnique({ where: { id: Number(params.id) } }) };
};
