<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SearchSite } from '../schemas/bookmark';

  export let site: SearchSite | undefined;

  const dispatch = createEventDispatcher();

  let dialog: HTMLDialogElement;
  let input: HTMLInputElement;

  let term = '';

  export const open = () => {
    dialog.showModal();
    input.focus();
  };

  export const close = () => {
    dialog.close();
    term = '';
    dispatch('closed', term);
  };

  export const isOpen = () => dialog.open;

  const handleSubmit = () => {
    dispatch('submitted', term);
  };
</script>

<dialog class="search" bind:this={dialog}>
  <h2>Searching {site?.label}</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:this={input} bind:value={term} required={site && !site?.fallback} />
  </form>
</dialog>

<style>
  dialog {
    font-size: 2em;
    padding: 0;
    border: none;
    background: none;
    border-radius: 1em;
    margin-top: 20vh;
  }

  dialog::backdrop {
    backdrop-filter: blur(0.25em);
    background: var(--color-gray-900-op-8);
  }

  h2 {
    margin-left: 0.5em;
    margin-bottom: 0.125em;
  }

  input {
    color: var(--color-foreground);
    border: none;
    padding: 0.25em 0.75em;
    border-radius: 1em;
  }
</style>
