<script>
	export let text = "Demo";
	export let variant = "u-dropcap";
	// export let variant = "u-dropcap--l";

	const id = Math.random()
		.toString(36)
		.substr(2, 9);
	const first_letter = text.substr(0, 1);
	const remaining_text = text.substr(1);
</script>

<span aria-labelledby="dropcap-{id}">
	<span aria-hidden="true">
		<span class="{variant}">{first_letter}</span>
		{remaining_text}
	</span>
	<span id="dropcap-{id}" class="u-sr-only">{text}</span>
</span>
