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

  $: ({ articles } = data as { articles: Article[] });
</script>

<form action="?/createArticle" method="POST">
  <h3>Create Article</h3>

  <input type="text" name="title" placeholder="Title" required />
  <textarea name="body" placeholder="Body" required />

  <button type="submit">Create</button>
</form>

<article>
  <h2>Hey! <span>(69 May 420)</span></h2>
  <p>You can create, view and delete posts as you want, not this one tho, this one is special</p>

  <button disabled>Delete</button>
  <span>View</span>
  <span>Edit</span>
</article>

{#each articles as article}
  <article>
    <h2>{article.title} <span>({formatDate(article.publishDate)})</span></h2>
    <p>{article.body}</p>

    <form action="?/deleteArticle&id={article.id}" method="POST">
      <button type="submit">Delete</button>
    </form>

    <a href="/{article.id}">View</a>
    <a href="/edit/{article.id}">Edit</a>
  </article>
{/each}
