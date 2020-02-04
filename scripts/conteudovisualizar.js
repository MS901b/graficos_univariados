	var codigo_do_software = "estat01";
	var nome_do_software = "Medidas do Corpo - Gráficos Univariados";
	var tipo = "software";
	
	
	var Impressao = $H({
		software: {
			titulo: 'O software',
			id: 'software',
			arquivo: 'index.html',
			conteudo: 'Essa é o material para ser utilizado diretamente pelos alunos.'
		},
		guia_professor_tela: {
			titulo: 'Guia do Professor - Visualização em Tela',
			id: 'guia1',
			arquivo: 'guia/tela.pdf',
			conteudo: 'Essa é a versão do Guia do Professor para visualiação em tela (formato PDF).'
		},
		guia_professor_caseiro: {
			titulo: 'Guia do Professor - Impressão Caseira',
			id: 'guia2',
			arquivo: 'guia/impressao.pdf',
			conteudo: 'Essa é a versão do Guia do Professor adequada para impressão caseira (formato PDF).'
		}
	});
	var Visualizacao = $H({
	});
	var FichaTecnica = $H({
	
		tema: {
			titulo: 'Tema',
			conteudo: 'Análise de Dados e Probabilidade'
		},
		sinopse: {
			titulo: 'Sinopse',
			conteudo: 'Neste software, o aluno irá estudar um pouco de estatística descritiva utilizando dados de três variáveis: gênero, altura e número do calçado. Vamos explorar vários tipos diferentes de gráﬁcos de frequências para uma variável e suas características, bem como introduzir a noção de quantil. Este software faz parte de uma sequência de softwares de estatística que utilizam o mesmo conjunto de dados.'
		},
		conteudos: {
			titulo: 'Conteúdo',
			conteudo: 'Estatística, Interpretação de Gráﬁcos e Dados; Gráﬁcos de Barras, Setores e Histograma; Quantis.'
		},
		objetivos: {
			titulo: 'Objetivos',
			conteudo: 'Analisar representação gráﬁca de dados estatísticos; Familiarizar o aluno com gráﬁcos de barras, setores e histograma; Introduzir o conceito de quantil.'
		},
		duracao: {
			titulo: 'Duração',
			conteudo: 'Uma aula dupla.'
		},
		requisitos: {
			titulo: 'Requisitos de software',
			conteudo: 'Navegador moderno (Internet Explorer 7.0+ ou Firefox 3.0+), Java 1.6+ e Adobe Flash Player 9.0+.'
		},
		acessibilidade: {
			titulo: 'Restrições de acessibilidade',
			conteudo: 'Não há suporte para navegação exclusiva via teclado e recurso nativo de alto contraste.'
		}
/*,
		recursos: {
			titulo: 'Recursos relacionados',
			conteudo: 'Vídeo: O Crime da Rua do Gasômetro;<br />Áudio: Fraude 171;<br/>Software: Probabilidade com Urnas'
		}*/
	});
	
	var como_usar = 'Aqui você encontra três arquivos: O Software, O Guia do Professor para visualização em Tela e o Guia do Professor para impressão caseira. O Software é o material que deve ser utilizado diretamente pelos seus alunos, enquanto que o Guia do Professor traz alguns aprofundamentos teóricos e recomendações metodológicas para o uso deste material.';
	var sobre_projeto = 'M³ &ndash; Matemática MultiMídia é uma coleção de materiais didáticos disponíveis em mídias digitais para o uso do professor de matemática do ensino médio no Brasil e facilitar o ensino-aprendizagem. Composta por áudios, experimentos, softwares e vídeos, a coleção foi desenvolvida, entre 2008 e 2010, por uma grande equipe de professores e estudantes da Unicamp e vários colaboradores, tendo contado com recursos do FNDE, do MEC e do MCT. Para maiores detalhes sobre a utilização da coleção M³&nbsp;&ndash;&nbsp;Matemática Multimídia, consulte o Guia do Professor.';
	var sobre_licensas = 'O Guia do Professor está licenciado sob uma licença Creative Commons, e o Software está licenciado sob uma licença GPL v. 2.';
	var link_fnde    = 'http://www.fnde.gov.br/';
	var link_seed    = 'http://portal.mec.gov.br/seed';
	var link_mct     = 'http://www.mct.gov.br/';
	var link_mec     = 'http://www.mec.gov.br/';
	var link_governo = 'http://www.brasil.gov.br/';
	var site_projeto = 'http://m3.ime.unicamp.br/portal/';
	