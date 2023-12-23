<script lang="ts">
  import type { PageData } from './$types';

  function formatDate(date: Date): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  type Article = {
    id: number;
    title: string;
    body: string;
    publishDate: Date;
  };

  export let data: PageData;

  $: ({ article } = data as { article: Article });
</script>

<a href="/">&larr; Back</a>

<form action="?/save&id={article.id}" method="POST">
  <input name="title" type="text" value={article.title} required />
  <input name="body" type="text" value={article.body} required />

  <p>{formatDate(article.publishDate)}</p>

  <button type="submit">Save</button>
</form>
