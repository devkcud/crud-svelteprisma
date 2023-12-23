import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

type Article = {
  title: string;
  body: string;
};

export const load = async ({ params }: { params: { id: string } }) => {
  return { article: await prisma.article.findUnique({ where: { id: Number(params.id) } }) };
};

export const actions: Actions = {
  save: async ({ request, url }: { request: Request; url: URL }) => {
    const { title, body } = Object.fromEntries(await request.formData()) as Article;

    try {
      await prisma.article.update({
        where: {
          id: Number(url.searchParams.get('id'))
        },
        data: {
          title,
          body
        }
      });
    } catch (error) {
      console.error(error);
      return fail(500, { message: 'Could not update article.' });
    }

    return { status: 200 };
  }
};
