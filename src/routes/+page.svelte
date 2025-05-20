<script lang="ts">
	import { base } from '$app/paths';
	import { MOCK_USERS } from '@/shared/helpers/mock-fetch';
</script>

<div class="page">
	<div class="container">
		<h1>Welcome to login demo app</h1>
		<p>You can use any of these demo accounts to test the login functionality:</p>

		<table>
			<thead>
				<tr
					><th>Email</th>
					<th>Password</th>
				</tr>
			</thead>
			<tbody>
				{#each MOCK_USERS as user (user.id)}
					<tr>
						<td>{user.email}</td>
						<td>{user.password}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<br />
		<a href="{base}/login">Go to Login page</a>
	</div>
</div>
