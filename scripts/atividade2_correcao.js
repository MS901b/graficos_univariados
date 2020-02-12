/**************************************
		VARIAVEIS GLOBAIS
**************************************/
var relF=0, relM=0;
var vetorCalcadoGlobal = new Array();
var totalNumElementos=0;
/*
* 1: barras; 0: pizza;
*/

var tipo_grafico = 1;

var iniciou_applet=false;
var iniciou_sl =true;
var iniicou_doc=true;
/**************************************
		INICIALIZACAO
**************************************/

Event.observe(window, 'load', function(){
		
	iniciou_doc=true;
	carregaTudo();
});

Event.observe(document, 'flash:SalvaLocal', function(ev) {
	iniciou_sl = true;
	carregaTudo();

});

function carregaRespostasPreenchidas(){
	switch(PosicaoAtual.Parte){
		case 0:
		
			break;
		case 1:
			$('parte2_q2_a').value = getResp('atividade2_parte2_q2_a');			
			
			Event.observe('parte2_q2_a', 'change', function(evento){
				setResp('atividade2_parte2_q2_a',$('parte2_q2_a').value);
			});		
			
			$('parte2_q2_b').value = getResp('atividade2_parte2_q2_b');			
			
			Event.observe('parte2_q2_b', 'change', function(evento){
				setResp('atividade2_parte2_q2_b',$('parte2_q2_b').value);
			});	

			$('parte2_q2_c').value = getResp('atividade2_parte2_q2_c');			
			
			Event.observe('parte2_q2_c', 'change', function(evento){
				setResp('atividade2_parte2_q2_c',$('parte2_q2_c').value);
			});			

			$('parte2_q3_a').value = getResp('atividade2_parte2_q3_a');			
			
			Event.observe('parte2_q3_a', 'change', function(evento){
				setResp('atividade2_parte2_q3_a',$('parte2_q3_a').value);
			});				

			$('parte2_q4_a').value = getResp('atividade2_parte2_q4_a');			
			
			Event.observe('parte2_q4_a', 'change', function(evento){
				setResp('atividade2_parte2_q4_a',$('parte2_q4_a').value);
			});				
				
			break;
			
		case 2:
			
					
			$('parte3_q5_g_2').value = getResp('atividade2_parte3_q5_g_2');			
			
			Event.observe('parte3_q5_g_2', 'change', function(evento){
				setResp('atividade2_parte3_q5_g_2',$('parte3_q5_g_2').value);
			});							

			
			$('parte3_q5_g_5').value = getResp('atividade2_parte3_q5_g_5');			
			
			Event.observe('parte3_q5_g_5', 'change', function(evento){
				setResp('atividade2_parte3_q5_g_5',$('parte3_q5_g_5').value);
			});				
	

			$('parte3_q5_b_1').value = getResp('atividade2_parte3_q5_b_1');			
			
			Event.observe('parte3_q5_b_1', 'change', function(evento){
				setResp('atividade2_parte3_q5_b_1',$('parte3_q5_b_1').value);
			});	

			$('parte3_q5_b_2').value = getResp('atividade2_parte3_q5_b_2');			
			
			Event.observe('parte3_q5_b_2', 'change', function(evento){
				setResp('atividade2_parte3_q5_b_2',$('parte3_q5_b_2').value);
			});				
			
			$('parte3_q5_g_7').value = getResp('atividade2_parte3_q5_g_7');			
			
			Event.observe('parte3_q5_g_7', 'change', function(evento){
				setResp('atividade2_parte3_q5_g_7',$('parte3_q5_g_7').value);
			});				


			$('parte3_q5_g_9').value = getResp('atividade2_parte3_q5_g_9');			
			
			Event.observe('parte3_q5_g_9', 'change', function(evento){
				setResp('atividade2_parte3_q5_g_9',$('parte3_q5_g_9').value);
			});				

					
			break;
	}
}

function carregaTudo() {
	if (iniciou_applet && iniciou_sl && iniciou_doc) {
		
		// Bloco de notas ---------------
		
		BlocoNotas = new Blocao();
		MeuBloco = new Array();
		
		
		var i=1;
		var tabela = eval(getResp('tabela_principal'));	
		
		var num_pag = Math.ceil(tabela.length/9);
		var total = tabela.length;
		
		var indice=0;
		for (i = 0; i < num_pag; i++) {
			if (i > 0) MeuBloco.push('Tabela da Atividade 1 (continuação)');
			else MeuBloco.push('Tabela da Atividade 1');
			var dados = new Array();
		
			// cabecalho
			dados.push([{value: 'Gênero', largura: 3},	{value: 'Calçado', largura: 4},	{value: 'Altura (cm)', largura: 4}]);		
			
			var j=0;		
			for (j=0; ((j < 9) && (j+i*9 < total)) ;j++) {
				indice = 9*i + j;
				dados.push([{value: tabela[indice].sexo, tipo: 'texto'}, {value: tabela[indice].calcado, tipo: 'texto'}, {value: tabela[indice].altura, tipo: 'texto'}]);
			}

			MeuBloco.push(dados);		
			MeuBloco.push("Total de dados: " + total);
		}		  
		// ---------------
		
		// Parte do load do doc
	// Monta as configuracoes de tela, as respostas  e tudo que NAO depende do applet *JAVA* carregado

	vetorCalcadoGlobal = eval(getResp('vetorCalcado'));
	totalNumElementos = Number(getResp('tabela_num_elementos'));
	
	if (PosicaoAtual.Parte != 0) {
		Event.observe('muda_grafico', 'click', function(evento){
			var vetorCalcado = eval(getResp('dados_calcado_grafico'));
			
			if (tipo_grafico == 1) {
				tipo_grafico = 0;
				pizza(vetorCalcado[0], vetorCalcado[1], totalNumElementos);
			} else {
				tipo_grafico = 1;
				
				for (var i=0; i < vetorCalcado[0].length; i++){
					vetorCalcado[0][i] = "" + String(vetorCalcado[0][i]);
				}
				
				barras(vetorCalcado[0], vetorCalcado[1]);
				
				//if (PosicaoAtual.Parte==2) constroiPontoMovel();
			}
			

		});		
	}

	switch (PosicaoAtual.Parte) {
	
	case 0:
		montaParte1();
		break;
		
	case 1:
		montaParte2();
		break;
		
	case 2:
		var aux = vetorCalcadoGlobal[0].dado;
		$('parte3_q5_g_1').value = aux;
		$('parte3_q5_g_1').readOnly = true;
		
		var aux = vetorCalcadoGlobal[vetorCalcadoGlobal.length-1].dado;
		$('parte3_q5_g_6').value = aux;
		$('parte3_q5_g_6').readOnly = true;
		
		montaParte3();
		break;		
	}
	
	// Seta a atividade (se possível) para "visitada"
	if (getResp('atividade_2') < 3) {
		setResp('atividade_2', 2);
	}
	
	carregaRespostasPreenchidas();

	// -----------
		
		
		
		
		
		
		
		switch (PosicaoAtual.Parte) {
			case 1:
				var vetorCalcado = eval(getResp('dados_calcado_grafico'));
				
				for (var i=0; i < vetorCalcado[0].length; i++){
					vetorCalcado[0][i] = "" + String(vetorCalcado[0][i]);
				}		
				
				barras(vetorCalcado[0], vetorCalcado[1]);
				break;
			case 2:
				var vetorCalcado = eval(getResp('dados_calcado_grafico'));
				
				for (var i=0; i < vetorCalcado[0].length; i++){
					vetorCalcado[0][i] = "" + String(vetorCalcado[0][i]);
				}			
				barras(vetorCalcado[0], vetorCalcado[1]);
				//constroiPontoMovel();
				break;
		}
	}
}

function ggbOnInit() {
	iniciou_applet = true;
	
	carregaTudo();	
	
}

/**************************************
		FUNCOES DE USO GERAL
**************************************/
function tudoCerto() {
	if (PosicaoAtual.Parte == 2) {
		setResp('atividade_2', 3);
	}
}

function montaParte1(){
	var dadosSexo = eval(getResp('vetorSexo'));
	
	var totalE = dadosSexo[0].freq + dadosSexo[1].freq;
	var nM, nF;
	
	if (dadosSexo[0].dado == 'M') {
		nM = dadosSexo[0].freq;
		nF = dadosSexo[1].freq;
	} else {
		nM = dadosSexo[1].freq;
		nF = dadosSexo[0].freq;	
	}
	
	var relauxF, relauxM;
	relF = (nF / totalE) * 100;
	relauxF = Math.round( relF);
	
	relM = (nM / totalE) * 100;
	relauxM = Math.round( relM);


	$('relativo_f').update(relauxF/100);
	$('relativo_m').update(relauxM/100);
}

function montaParte2() {	
}

function montaParte3() {
	
	
}

function constroiPontoMovel() {
	var applet = document.ggbApplet;

	applet.evalCommand("PontoLaDeCima = (0, 1)");
	applet.evalCommand("OutroPonto = (10,1)");
	applet.evalCommand("minharetaFixa = Segment[PontoLaDeCima, OutroPonto]");
	
	applet.evalCommand("PontoBarrinha = Point[minharetaFixa]");
	//applet.evalCommand("PontoBarrinha2 = Point[minharetaFixa]");
		
	applet.evalCommand("retaPerpendicularMovel: PerpendicularLine[PontoBarrinha, minharetaFixa]");
	//applet.evalCommand("retaPerpendicularMovel2: PerpendicularLine[PontoBarrinha2, minharetaFixa]");
	
	
	
	applet.setCoords("PontoBarrinha", 0,1);
	//applet.setCoords("PontoBarrinha", 10,1);
	
	applet.setVisible("PontoLaDeCima",false);
	applet.setVisible("OutroPonto" ,false);
	applet.setVisible("minharetaFixa",false);
}

function comparaBarraQuantil(posicaoBarra, quantil_desejado) {
	/* CONSTANTES */
	var xmax = 11;
	var xmin = -1;
	var numCategorias = vetorCalcadoGlobal.length;
	var larguraMaxima = 1;
	
	/*
	var deltaX = (xmax - xmin -2)/ numCategorias;	
	var largura = Math.min(larguraMaxima, deltaX);
	
	var tamanho = deltaX + largura;	
	
	*/
	
	var applet = document.ggbApplet;	
	
	//var tamanhoBarra = (xmax - xmin -2)/ numCategorias;
	var tamanhoBarra = 10 / numCategorias;

	var barraSelecionada = Math.floor(posicaoBarra / tamanhoBarra);
		
	//console.log(barraSelecionada);
	
	var soma=0;

	for (i=0; i <= barraSelecionada; i++) {
		soma = soma + (vetorCalcadoGlobal[i].freq) ;
	}	
	
	var numElementos = getResp('tabela_num_elementos');		
	var relativo = soma / numElementos;
	
	var relativoAnterior  = (soma - vetorCalcadoGlobal[barraSelecionada].freq) / numElementos;
	

	if ( (quantil_desejado >= relativoAnterior) && (quantil_desejado <= relativo)) {
		//alert("vamos la! " + relativoAnterior + " // " + relativo );
		return true;
	} else {
		//alert("oh no! " + relativoAnterior + " // " + relativo );
		return false;
	}
}

// Dado um valor ele retorna o quantil dele
function encontraQuantil(dado, vetor) {
	var i=0;
	var continua=true;
	var soma=0;
	for (i=0; ((i < vetor.length) && continua); i++) {
		soma = soma + vetor[i].freq;
		
		if (vetor[i].dado == dado) {
			continua = false;
		}
	}
	
	var numElementos = getResp('tabela_num_elementos');			
	var qInicial = (soma)/numElementos;
	
	return qInicial;
	
}

// Dado um quantil ele retorna o valor
function encontraDadoDoQuantil(quantil, vetor) {
	var soma = 0;
	var continua=  true;
	var dado;

	var numElementos = getResp('tabela_num_elementos');			
	
	for (var i=0; ( (i < vetor.length) && continua); i++) {
		soma = soma + vetor[i].freq;
		if ( (soma/numElementos) >= quantil) {
			continua = false;
			dado = vetor[i].dado;
		}
	}
	

	return dado;
}

/**************************************
		FUNCOES DE CORRECAO
**************************************/

function corrige_q_1_a() {
	var applet = document.ggbApplet;
	
	var angM = applet.getValue('angM');
	var angF = applet.getValue('angF');
	
	angM = angM * 180 / Math.PI;
	angF = angF * 180 / Math.PI;
	
	/*
	angM = Math.round(angM);
	angF = Math.round(angF);
	*/
	
	var a, b;
	a = Math.round(relM)/100 * 360;
	b = Math.round(relF)/100 * 360;
	
	/*
	a = Math.round(a);
	b = Math.round(b);
	*/
	
	if ( (Math.abs( angM -  a) <= 2) && (Math.abs( angF - b) <= 2)) {
		return [true];
	} else {
		return [false];
	}	
}

function corrige_q_1_b() {
	var applet = document.ggbApplet;
	var a, b;
	
	// Respostas da tabela
	a = Math.round(relM)/100;
	b = Math.round(relF)/100;
	
	var graphM, graphF;
	
	graphM = Math.round(applet.getValue('b') * 100)/100;
	graphF = Math.round(applet.getValue('j') * 100)/100;
	
	/*
	console.log(a,b);
	console.log(graphM, graphF);
	*/
	
	if ( (a == graphM) && (b == graphF)) {
		return [true];
	} else {
		return [false];
	}
}

function corrige_q_2_a(valor) {
	var a = vetorCalcadoGlobal[0].dado;
	
	return [ a == processaNumero(valor[0])];
}

function corrige_q_2_b(valor) {
	var a = vetorCalcadoGlobal[0].freq;
	
	return [ a == processaNumero(valor[0])];
}

function corrige_q_2_c(valor) {
	var a = vetorCalcadoGlobal[0].freq;
	var b = getResp('tabela_num_elementos');
	
	var arredondado = Math.round(a*10000/b)/10000;
	
	var entrada = processaNumero(valor[0]);
	
	return [ Math.abs (arredondado - entrada) <= 0.001];
}

function corrige_q_3_a(valor) {
	var contador = 0;
	var numE = getResp('tabela_num_elementos');
	
	var i;
	for (i=0; i< vetorCalcadoGlobal.length; i++) {
		if (vetorCalcadoGlobal[i].dado > 38) {
			contador = vetorCalcadoGlobal[i].freq + contador;
		}
	}
	var arredondado = Math.round(contador*10000/numE)/10000;
	var entrada = processaNumero(valor[0]);
	
	return [ Math.abs (arredondado - entrada) <= 0.001];	
}

function corrige_q_4_a(valor) {
	var contador = 0;
	var continua = true;
	var numE = getResp('tabela_num_elementos');
	
	for (var i=0; ( (i < vetorCalcadoGlobal.length) && continua); i++) {
		if (vetorCalcadoGlobal[i].dado < 36) {
			contador = vetorCalcadoGlobal[i].freq + contador;
		} else {
			continua = false;
		}
	}	

	var arredondado = Math.round(contador*10000/numE)/10000;	
	var entrada = processaNumero(valor[0]);
	
	return [ Math.abs (arredondado - entrada) <= 0.001];	
}

function corrige_q_5_a() {
	var pequeno_inicio, pequeno_fim, medio_inicio, medio_fim, grande_inicio, grande_fim;
	
	var min_vetor = vetorCalcadoGlobal[0].dado;
	var max_vetor = vetorCalcadoGlobal[vetorCalcadoGlobal.length-1].dado; 
	
	pequeno_inicio = Number(processaNumero($('parte3_q5_g_1').value));
	pequeno_fim = Number(processaNumero($('parte3_q5_g_2').value));

	grande_inicio = Number(processaNumero($('parte3_q5_g_5').value));
	grande_fim = Number(processaNumero($('parte3_q5_g_6').value));
	
	$('corretor_q5_g_1').removeClassName('correto');
	$('corretor_q5_g_1').removeClassName('incorreto');
	
	$('corretor_q5_g_2').removeClassName('correto');
	$('corretor_q5_g_2').removeClassName('incorreto');
	
	
	$('corretor_q5_g_5').removeClassName('correto');
	$('corretor_q5_g_5').removeClassName('incorreto');

	$('corretor_q5_g_6').removeClassName('correto');
	$('corretor_q5_g_6').removeClassName('incorreto');	
	
	
	var e1=false, e2=false, e3=false, e4=false, e5=false, e6=false;
	var ind1, ind2, ind5, ind6;
	
	/*
	e1=((ind1 = encontraElementoArray(pequeno_inicio, vetorCalcadoGlobal)) == -1);
	e2=((ind2 = encontraElementoArray(pequeno_fim, vetorCalcadoGlobal)) == -1);
	e5=((ind5 = encontraElementoArray(grande_inicio, vetorCalcadoGlobal)) == -1);
	e6=((ind6 = encontraElementoArray(grande_fim, vetorCalcadoGlobal)) == -1);
	*/
	
	e1= !((pequeno_inicio >= min_vetor) && (pequeno_inicio <= max_vetor));
	e2= !((pequeno_fim >= min_vetor) && (pequeno_fim <= max_vetor));
	e5= !((grande_inicio >= min_vetor) && (grande_inicio <= max_vetor));
	e6= !((grande_fim >= min_vetor) && (grande_fim <= max_vetor));
	
	// Se nao encontrar algum elemento nao pode prosseguir
	if ( e1 || e2 ||  e5 || e6 ) {
		 
		(e1) ? $('corretor_q5_g_1').addClassName('incorreto') : $('corretor_q5_g_1').addClassName('correto');
		(e2) ? $('corretor_q5_g_2').addClassName('incorreto') : $('corretor_q5_g_2').addClassName('correto');
		(e5) ? $('corretor_q5_g_5').addClassName('incorreto') : $('corretor_q5_g_5').addClassName('correto');
		(e6) ? $('corretor_q5_g_6').addClassName('incorreto') : $('corretor_q5_g_6').addClassName('correto');
		 
		 setResp('q_5_a_correta', 0);
		 return [false];
	} else {

		if (  (pequeno_inicio <= pequeno_fim) && (pequeno_fim < grande_inicio) && (grande_inicio <= grande_fim)) {
			
			//console.log(pequeno_fim, grande_inicio, (pequeno_fim+1));
			if ( (pequeno_fim+1) != grande_inicio ) {
				$('corretor_q5_g_1').addClassName('correto');
				$('corretor_q5_g_2').addClassName('incorreto');
				$('corretor_q5_g_5').addClassName('incorreto');
				$('corretor_q5_g_6').addClassName('correto');
				
				setResp('q_5_a_correta', 0);
				return [false];
			} else {
				$('corretor_q5_g_1').addClassName('correto');
				$('corretor_q5_g_2').addClassName('correto');
				$('corretor_q5_g_5').addClassName('correto');
				$('corretor_q5_g_6').addClassName('correto');
				
				setResp('q_5_a_correta', 1);
				return [true];
			}
			
			/*
			var resultado1 = 0;
			var resultado3 = 0;
			
			for (var i=0; i < vetorCalcadoGlobal.length; i++) {
				
				if ((vetorCalcadoGlobal[i].dado >= pequeno_inicio) && (vetorCalcadoGlobal[i].dado <= pequeno_fim)){
					
					resultado1 += vetorCalcadoGlobal[i].freq;
				}
				
				if ((vetorCalcadoGlobal[i].dado >= grande_inicio) && (vetorCalcadoGlobal[i].dado <= grande_fim)){
					
					resultado3 += vetorCalcadoGlobal[i].freq;
				}			

				
			}				
				
			
			
			if ((resultado1 + resultado3)==totalNumElementos) {
				return [true];
			} else {
				return [false];
			}
			*/
			
			
		} else {
			var cond1 = (pequeno_inicio <= pequeno_fim);
			var cond2 = (medio_inicio < medio_fim);
			var cond3 = (grande_inicio <= grande_fim);
			
			e1 = ((pequeno_inicio <= pequeno_fim) && (pequeno_inicio < grande_inicio) && (pequeno_inicio < grande_fim)); 
			e2 = ((pequeno_fim > pequeno_inicio) && (pequeno_fim < grande_inicio) && (pequeno_fim <= grande_fim)); 			
			e5 = ((grande_inicio >= pequeno_inicio) && (grande_inicio > pequeno_fim) && (grande_inicio < grande_fim)); 
			e6 = ((grande_fim > pequeno_inicio) && (grande_fim > pequeno_fim) && (grande_fim >= grande_inicio)); 
			
			(!e1) ? $('corretor_q5_g_1').addClassName('incorreto') : $('corretor_q5_g_1').addClassName('correto');
			(!e2) ? $('corretor_q5_g_2').addClassName('incorreto') : $('corretor_q5_g_2').addClassName('correto');
			(!e5) ? $('corretor_q5_g_5').addClassName('incorreto') : $('corretor_q5_g_5').addClassName('correto');
			(!e6) ? $('corretor_q5_g_6').addClassName('incorreto') : $('corretor_q5_g_6').addClassName('correto');	
			
			setResp('q_5_a_correta', 0);
			return [false];
		}
	}
	
}

function corrige_q_5_b() {
	var inicia = Number(getResp('q_5_a_correta'));
	
	$('corretor_q5_b_1').removeClassName('correto');
	$('corretor_q5_b_1').removeClassName('incorreto');	

	$('corretor_q5_b_2').removeClassName('correto');
	$('corretor_q5_b_2').removeClassName('incorreto');	
	
	if (inicia == 1) {
		var ind1, ind2, ind3, ind4, ind5, ind6;

		var pequeno_inicio, pequeno_fim, grande_inicio, grande_fim;
		var min_vetor = vetorCalcadoGlobal[0].dado;
		var max_vetor = vetorCalcadoGlobal[vetorCalcadoGlobal.length-1].dado; 
		
		pequeno_inicio = Number(processaNumero($('parte3_q5_g_1').value));
		pequeno_fim = Number(processaNumero($('parte3_q5_g_2').value));

		grande_inicio = Number(processaNumero($('parte3_q5_g_5').value));
		grande_fim = Number(processaNumero($('parte3_q5_g_6').value));
		
		var e1= !((pequeno_inicio >= min_vetor) && (pequeno_inicio <= max_vetor));
		var e2= !((pequeno_fim >= min_vetor) && (pequeno_fim <= max_vetor));
		var e5= !((grande_inicio >= min_vetor) && (grande_inicio <= max_vetor));
		var e6= !((grande_fim >= min_vetor) && (grande_fim <= max_vetor));
		
		// Se nao encontrar algum elemento nao pode prosseguir
		if ( e1 || e2 ||  e5 || e6 ) {	
			 
			$('corretor_q5_b_1').addClassName('incorreto');
			$('corretor_q5_b_2').addClassName('incorreto');		 
			 return [false];
		} else {
		
			var resultado1 = 0;
			var resultado3 = 0;
			
			for (var i=0; i < vetorCalcadoGlobal.length; i++) {
				
				if ((vetorCalcadoGlobal[i].dado >= pequeno_inicio) && (vetorCalcadoGlobal[i].dado <= pequeno_fim)){
					resultado1 += vetorCalcadoGlobal[i].freq;
				}
				
				if ((vetorCalcadoGlobal[i].dado >= grande_inicio) && (vetorCalcadoGlobal[i].dado <= grande_fim)){
					resultado3 += vetorCalcadoGlobal[i].freq;
				}				
			}						
			

			var a = Number(processaNumero($('parte3_q5_b_1').value));
			var c = Number(processaNumero($('parte3_q5_b_2').value));
			
			var resp1 = (resultado1 == a);
			var resp3 = (resultado3 == c);
			
			

			(!resp1) ? $('corretor_q5_b_1').addClassName('incorreto') : $('corretor_q5_b_1').addClassName('correto');
			(!resp3) ? $('corretor_q5_b_2').addClassName('incorreto') : $('corretor_q5_b_2').addClassName('correto');		
			
			if ( resp1 && resp3)  {
				return [true];
			} else {
				return [false];
			}

		}
	} else {
		$('corretor_q5_b_1').addClassName('incorreto');
		$('corretor_q5_b_2').addClassName('incorreto');
		return [false];
	}
}

function corrige_q_5_c() {
	var inicia = Number(getResp('q_5_a_correta'));
		
	$('corretor_q5_g_7').removeClassName('correto');
	$('corretor_q5_g_7').removeClassName('incorreto');
	

	$('corretor_q5_g_9').removeClassName('correto');
	$('corretor_q5_g_9').removeClassName('incorreto');	
	
	if (inicia == 1 ) {
		var ind1, ind2, ind3, ind4, ind5, ind6;

		var pequeno_inicio, pequeno_fim, grande_inicio, grande_fim;
		var min_vetor = vetorCalcadoGlobal[0].dado;
		var max_vetor = vetorCalcadoGlobal[vetorCalcadoGlobal.length-1].dado; 	
		
		pequeno_inicio = Number(processaNumero($('parte3_q5_g_1').value));
		pequeno_fim = Number(processaNumero($('parte3_q5_g_2').value));

		grande_inicio = Number(processaNumero($('parte3_q5_g_5').value));
		grande_fim = Number(processaNumero($('parte3_q5_g_6').value));
		
		var e1= !((pequeno_inicio >= min_vetor) && (pequeno_inicio <= max_vetor));
		var e2= !((pequeno_fim >= min_vetor) && (pequeno_fim <= max_vetor));
		var e5= !((grande_inicio >= min_vetor) && (grande_inicio <= max_vetor));
		var e6= !((grande_fim >= min_vetor) && (grande_fim <= max_vetor));
		
		// Se nao encontrar algum elemento nao pode prosseguir
		if ( e1 || e2 ||  e5 || e6 ) {	
			 
			$('corretor_q5_g_7').addClassName('incorreto');
			$('corretor_q5_g_9').addClassName('incorreto');		 
			 return [false];
		} else {
		
			var resultado1 = 0;
			var resultado3 = 0;
			
			for (var i=0; i < vetorCalcadoGlobal.length; i++) {
				
				if ((vetorCalcadoGlobal[i].dado >= pequeno_inicio) && (vetorCalcadoGlobal[i].dado <= pequeno_fim)){
					resultado1 += vetorCalcadoGlobal[i].freq;
				}
				
				if ((vetorCalcadoGlobal[i].dado >= grande_inicio) && (vetorCalcadoGlobal[i].dado <= grande_fim)){
					resultado3 += vetorCalcadoGlobal[i].freq;
				}				
			}		

			resultado1 = resultado1/totalNumElementos;
			resultado1 = Math.round(resultado1 * 10000)/10000;
			
			resultado3 = resultado3/totalNumElementos;				
			resultado3 = Math.round(resultado3 * 10000)/10000;
			

			var a = Math.round(Number(processaNumero($('parte3_q5_g_7').value))*10000)/10000;
			var c = Math.round(Number(processaNumero($('parte3_q5_g_9').value))*10000)/10000;		
			
			var resp1 = (Math.abs(resultado1 - a) <= 0.001);
			var resp3 = (Math.abs(resultado3 - c) <= 0.001);

			(!resp1) ? $('corretor_q5_g_7').addClassName('incorreto') : $('corretor_q5_g_7').addClassName('correto');
			(!resp3) ? $('corretor_q5_g_9').addClassName('incorreto') : $('corretor_q5_g_9').addClassName('correto');		
			
			if ( resp1 && resp3)  {
				return [true];
			} else {
				return [false];
			}

		}
	} else {
		$('corretor_q5_g_7').addClassName('incorreto');
		$('corretor_q5_g_9').addClassName('incorreto');
		return [false];
	}

}

