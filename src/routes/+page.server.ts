import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

type Article = {
  title: string;
  body: string;
};

export const load: PageServerLoad = async () => {
  return { articles: await prisma.article.findMany() };
};

export const actions: Actions = {
  createArticle: async ({ request }: { request: Request }) => {
    const { title, body } = Object.fromEntries(await request.formData()) as Article;

    try {
      await prisma.article.create({ data: { title, body } });
    } catch (error) {
      console.error(error);
      return fail(500, { message: 'Could not create article.' });
    }

    return { status: 201 };
  },
  deleteArticle: async ({ url }: { url: URL }) => {
    const id = url.searchParams.get('id');

    if (!id) {
      return fail(400, { message: 'Missing id' });
    }

    try {
      await prisma.article.delete({ where: { id: Number(id) } });
    } catch (error) {
      console.error(error);
      return fail(500, { message: 'Could not delete article.' });
    }

    return { status: 200 };
  }
};
