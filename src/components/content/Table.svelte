<script>
  /**
   * @file
   * Basic table component.
   */
  export let meta = {};
  export let rows = [];
</script>

<table>
  {#if meta.caption}
    <caption>
      {@html meta.caption }
    </caption>
  {/if}

	{#if meta.thead}
		<thead>
			<tr>
				{#each meta.thead as th}
					<th>{@html th }</th>
				{/each}
			</tr>
		</thead>
  {/if}

  <tbody>
    {#each rows as tr}
      <tr>
        {#each tr as td}
          <td>{@html td }</td>
        {/each}
      </tr>
    {/each}
  </tbody>

</table>
