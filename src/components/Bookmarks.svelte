<script lang="ts">
  import type { Bookmark } from '../schemas/bookmark';

  export let bookmarks: Bookmark[] = [];
</script>

{#if bookmarks}
  <div class="sites">
    {#each bookmarks as site}
      <div class="site">
        <a href={site.url} data-hotkey={site.hotkey}>
          <h2 class="site-label">{site.label}</h2>
          <p class="site-url">
            {#if site.hotkey}
              ({site.hotkey})
            {/if}
            {site.url}
          </p>
        </a>
      </div>
    {/each}
  </div>
{/if}

<style>
  .sites {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 2em;
    gap: 1em;
  }

  .site {
    border: 1px solid var(--color-link-decoration);
    border-radius: 0.25em;
  }

  .site a {
    display: block;
    text-decoration: none;
    padding: 1em;
    text-align: center;
  }

  .site a:hover {
    text-shadow: 0 0 0.5em currentColor;
  }

  .site-label {
    margin: 0;
  }

  .site-url {
    font-size: 0.875em;
    font-style: italic;
  }
</style>
