<script lang="ts">
  let { name = "", size = 20 } = $props();

  let svgContent = $state("");

  const loadIcon = async (name: string) => {
    const module = await import(`./icons/${name}.svg?raw`);
    svgContent = module.default;
  };

  $effect(() => {
    loadIcon(name);
  });
</script>

<div class="icon" style:--size="{size}px">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html svgContent}
</div>

<style>
  .icon {
    display: flex;

    & :global(svg) {
      height: var(--size);
      width: var(--size);

      & :global(path) {
        fill: var(--color-title);
      }
    }
  }
</style>
