<h2 class="bookmark-label">
  <slot />
</h2>

<p class="bookmark-sub">
  <slot name="subtitle" />
</p>

<style>
  .bookmark-label {
    margin: 0;
  }

  .bookmark-sub {
    margin: auto;
    font-size: 0.875em;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
  }
</style>
