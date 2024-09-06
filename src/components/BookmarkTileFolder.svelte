<script lang="ts">
  import type { Folder } from '../schemas/bookmark';

  import BookmarkTile from './BookmarkTile.svelte';

  export let folder: Folder;

  const previewChildren = folder.children.map((e) => e.label).slice(0, 3);
</script>

<button on:click>
  <BookmarkTile>
    {folder.label}
    <svelte:fragment slot="subtitle">
      {#if folder.hotkey}
        ({folder.hotkey})
      {/if}
      {previewChildren.join(', ')}
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

  button::before {
    content: '';
    position: absolute;
    top: 0.75em;
    left: 0.75em;
    width: 0.5em;
    aspect-ratio: 1;
    background: var(--color-link-decoration);
    border-radius: 50px;
  }
</style>
