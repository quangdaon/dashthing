<script lang="ts">
  import type { Bookmark, Folder, SearchSite } from '../schemas/bookmark';
  import BookmarkTileFolder from './BookmarkTileFolder.svelte';
  import BookmarkTileSearch from './BookmarkTileSearch.svelte';
  import BookmarkTileSite from './BookmarkTileSite.svelte';
  import Searchbar from './Searchbar.svelte';

  export let bookmarks: Bookmark[] = [];

  let history: Bookmark[][] = [];
  let searchbar: Searchbar;
  let searchSite: SearchSite | undefined;

  const openFolder = (folder: Folder) => {
    history = [...history, bookmarks];
    bookmarks = folder.children;
  };

  const closeFolder = () => {
    if (!history.length) return;
    bookmarks = history.pop() as Bookmark[];
    history = history;
  };

  const openSearch = (search: SearchSite) => {
    searchbar.open();
    searchSite = search;
  };

  const handleSearchClose = () => {
    searchSite = undefined;
  };

  const handleSearchSubmit = ({ detail }: CustomEvent<string>) => {
    const query = encodeURIComponent(detail);
    const url = query
      ? searchSite?.url.replace('%s', query)
      : searchSite?.fallback;

    if (url) window.location.href = url;
  };

  const handleSearchClick = (event: MouseEvent, search: SearchSite) => {
    event.preventDefault();
    openSearch(search);
  };

  const handleBookmarkHotkey = (bookmark: Bookmark) => {
    switch (bookmark.type) {
      case 'site':
        window.location.href = bookmark.url;
        break;
      case 'search':
        openSearch(bookmark);
        break;
      case 'folder':
        openFolder(bookmark as Folder);
        break;
    }
  };

  const handleKeydown = (evt: KeyboardEvent) => {
    const hotkeyed = bookmarks.filter((e) => e.hotkey);

    if (searchbar.isOpen()) {
      if (evt.key === 'Escape') searchbar.close();
      return true;
    }

    if (evt.key === 'Backspace' && history.length > 0) {
      evt.preventDefault();
      closeFolder();
    }

    for (const bookmark of hotkeyed) {
      if (evt.key.toLowerCase() === bookmark.hotkey?.toLowerCase()) {
        evt.preventDefault();
        handleBookmarkHotkey(bookmark);
      }
    }
  };
</script>

<svelte:document on:keydown={handleKeydown} />

{#if bookmarks}
  <div class="bookmarks">
    {#each bookmarks as bookmark (bookmark)}
      <div class="bookmark">
        {#if bookmark.type === 'folder'}
          <BookmarkTileFolder
            folder={bookmark}
            on:click={() => openFolder(bookmark)}
          />
        {/if}
        {#if bookmark.type === 'site'}
          <BookmarkTileSite site={bookmark} />
        {/if}
        {#if bookmark.type === 'search'}
          <BookmarkTileSearch
            site={bookmark}
            on:click={() => openSearch(bookmark)}
          />
        {/if}
      </div>
    {/each}
  </div>
{/if}

{#if history.length}
  <button on:click={() => closeFolder()}>←</button>
{/if}

<Searchbar
  site={searchSite}
  bind:this={searchbar}
  on:closed={handleSearchClose}
  on:submitted={handleSearchSubmit}
/>

<style>
  .bookmarks {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 2em;
    gap: 1em;
  }

  .bookmark {
    position: relative;
    border: 1px solid var(--color-link-decoration);
    border-radius: 0.25em;
  }

  .bookmark:hover {
    text-shadow: 0 0 0.5em var(--color-link-decoration);
  }

  button {
    background: none;
    margin-top: 1rem;
    font-size: 2em;
    border: none;
    color: var(--color-link-decoration);
  }
</style>
