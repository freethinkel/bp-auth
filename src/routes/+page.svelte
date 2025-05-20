<script>
	import { MOCK_USERS } from '@/shared/helpers/mock-fetch';
</script>

<div class="container">
	<h1>Welcome to AuthPage</h1>
	<p>The login page made using best bractices</p>
	<p>You can any of the users to do mock login:</p>

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
	<a href="/login">Go to Login page</a>
</div>
