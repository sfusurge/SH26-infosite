<script lang="ts">
    import './layout.css';
    let { children } = $props();
</script>

<div class="font-exposure">
    {@render children()}
</div>