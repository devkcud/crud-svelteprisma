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

<h1>{article.title}</h1>

<p>{article.body}</p>

<p>{formatDate(article.publishDate)}</p>
