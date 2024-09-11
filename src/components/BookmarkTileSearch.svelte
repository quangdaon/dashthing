<script lang="ts">
  import type { SearchSite } from '../schemas/bookmark';
  import BookmarkTile from './BookmarkTile.svelte';

  export let site: SearchSite;
</script>

<button on:click>
  <BookmarkTile>
    {site.label}
    <svelte:fragment slot="subtitle">
      {#if site.hotkey}
        ({site.hotkey})
      {/if}
      {site.fallback ?? site.url}
    </svelte:fragment>
  </BookmarkTile>
</button>

<style>
  button {
    background: none;
    color: currentColor;
    font-size: 1em;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: none;
    font-weight: unset;
    text-decoration: none;
    padding: 1em;
  }

  button:hover {
    text-shadow: inherit;
  }
</style>
