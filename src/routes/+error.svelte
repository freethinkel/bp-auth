<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { Button } from '@/shared/components/button';
</script>

<div class="container">
	<h1>{page.status} {page.error?.message}</h1>
	<Button type="button" onClick={() => history.back()}>Back</Button>
	<a href="{base}/">Go home</a>
</div>

<style>
	.container {
		padding-top: 50px;
		padding-bottom: 50px;
	}
</style>
