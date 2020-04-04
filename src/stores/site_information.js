import { readable } from 'svelte/store';

export const site_information = readable({
	site_name: "Chouette Institut de Français",
	homepage: {
		header: {
			title_p1: "Escola de francês",
			title_p2: "em Porto Alegre, RS",
			intro_p1: "Na Chouette você aprende francês com um método exclusivo e atual, concebido pelos próprios professores que possuem uma grande vivência na França e experiência no ensino do idioma no Brasil.",
			intro_p2: "Venha conhecer nosso espaço no Bom Fim !",
			courses_p1: "Cursos",
			courses_p2: "de francês",
			courses_text_lines: [
				"Aulas em grupo de até 6 pessoas (presencial ou online)",
				"Aulas particulares (presencial ou online)",
				"Turmas especiais com ritmo e metodologia adaptados para todas as idades",
				"Conversação para níveis avançado e intermediário",
				"Aulas de improvisação teatral, estudo de textos literários e culinária em francês",
				"Material didático próprio e exclusivo"
			]
		}
	}
});
