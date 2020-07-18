<script>
  /**
   * @file
   * Basic table component.
   */
  export let rows = [];
  export let thead = [];
  export let caption = '';
</script>

<table>
  {#if caption}
    <caption>
      {@html caption }
    </caption>
  {/if}

	{#if thead.length}
		<thead>
			<tr>
				{#each thead as th}
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
