<script lang="ts">
  import type { Site } from '../schemas/bookmark';
  import BookmarkTile from './BookmarkTile.svelte';

  export let site: Site;
</script>

<a href={site.url}>
  <BookmarkTile>
    {site.label}
    <svelte:fragment slot="subtitle">
      {#if site.hotkey}
        ({site.hotkey})
      {/if}
      {site.url}
    </svelte:fragment>
  </BookmarkTile>
</a>

<style>
  a {
    font-size: 1em;
    display: block;
    width: 100%;
    box-sizing: border-box;
    text-decoration: none;
    padding: 1em;
    text-align: center;
  }
</style>
