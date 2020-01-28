Event.observe(window, 'load', function(){
       BlocoNotas = new Blocao();
});	


var idTabela=0;
var nCorretos=0;
var vetorSexo = new Array();
var vetorCalcado = new Array();
var vetorAltura = new Array();
var iniciou_sl = false;
var iniciou_tela = false;


Event.observe(document, 'flash:SalvaLocal', function(ev) {
	iniciou_sl = true;
	iniciaPrograma();
});


Event.observe(window, 'load', function(){

	iniciou_tela = true;	
	iniciaPrograma();

	// Define o funcionamento dos botoes 	
	
	Event.observe('add5row', 'click', function(evento){
		adicionarLinhas(5);
	});		
	

	
});

function ggbOnInit(){
	switch (PosicaoAtual.Parte) {


	case 0:
		
		break;
	case 1:
		montaVetoresDados();
		break;
	}
	
}

function iniciaPrograma(){
	
	if (iniciou_sl && iniciou_tela) {
	
 // Seta a atividade (se possível) para "visitada"
	if (getResp('atividade_1') < 3) {
		setResp('atividade_1', 2);
	}	
		var existeTabela = eval(getRespSoft("tabela_principal", "estat-dados"));
		if (existeTabela != null) {
			$('msg_alerta_tabela').update("<strong>Atenção: </strong> A tabela já está preenchida com dados digitados anteriormente. Você pode aproveitá-los ou então clicar o “limpar dados” para preencher com novas informações. Lembre de registrar seus próprios dados.<br><br>");
			carregarDadosTabela();
			verificaRestricoesTabela();
			permiteContinuar(true);
			setResp('atividade_1', 3);
			setResp('atividade_2', 1);
			setResp('atividade_3', 1);
			setResp('transicao_1', 1);
			
		} else {
			idTabela = 0;
			adicionarLinhas(10);
			permiteContinuar(false);
		}
		
		var tbody = document.getElementById("tabelaDados").getElementsByTagName("TBODY")[0];
		adicionaInputListener(tbody.rows.length);	
	}
}
/* Verifica se 
	1:  Há mais de 10 dados
	2:	Há ao menos 1 dado por sexo
*/
function verificaRestricoesTabela() {
	
	var array_dados = criaArrayDados();
	
	if (array_dados.length == 0) {
		var err_msg = "";
		
		err_msg = "O seu conjunto de dados não contém dez linhas válidas. Preencha a tabela até atingir esse valor mínimo.<br>";
		$('confirma_gravacao').update(err_msg);		
		return false;
	} else {
		//Busca ao menos 1 elemento por sexo
		var contM=0;
		var contF=0;
		var sexoOK = false;
		
		for (var i=0; ((i<array_dados.length) && !sexoOK); i++) {
			if (array_dados[i].sexo == "M") {
				contM++;
			}else {
				contF++;
			}
			
			sexoOK = ((contM!=0) && (contF!=0));
		}
		
		var maisQueDez=false;
		if ( array_dados.length >= 10) maisQueDez=true;
		
		var err = sexoOK && maisQueDez;
		var err_msg = "";
		
		if (!maisQueDez) err_msg = "O seu conjunto de dados não contém dez linhas válidas. Preencha a tabela até atingir esse valor mínimo.<br>";
		if (!sexoOK) err_msg = err_msg + "A tabela deve conter pelo menos um indivíduo de cada gênero. Preencha, no mínimo, mais uma linha com o gênero que ainda não apareceu.<br>";			
		
		$('confirma_gravacao').update(err_msg);		
		permiteContinuar(err);		
			
		return err;
	}
}

function cb_limpar_tabela(){
	if (this.resultado == 'sim'){
		var tabela = $('tabelaDados');
		
		limparTabela();
		adicionarLinhas(10);
		$('confirma_gravacao').update('');		
	}
}

function cb_salvar_tabela(){
	if (this.resultado == 'sim') {
		salvaTabela();	
	}
}

function salvaTabela() {
	var array_dados = criaArrayDados();			
	var oldTabela = getRespSoft("tabela_principal", "estat-dados");					
	
	// Verifica se há dados a serem gravados
	if (array_dados.length  != 0) {
		// Como se fosse uma alteração de valor inicial
		
		var tabelaOK = verificaRestricoesTabela();
		
		if (tabelaOK) {
			if (oldTabela.toJSON() != array_dados.toJSON()) {
				$('SalvaLocal').ApagaTudo('estat');						
			}	
			
			setResp('tabela_principal', array_dados.toJSON());	
			setRespSoft("tabela_principal", array_dados.toJSON(), "estat-dados");	
			
			setResp('tabela_num_elementos', array_dados.length);
			setResp('tabela_principal', array_dados.toJSON());	
			montaVetoresDados();
		
			$('msg_ok').update("Seus dados foram salvos com sucesso.");
			setResp('atividade_1', 3);
			setResp('atividade_2', 1);
			setResp('atividade_3', 1);
			setResp('transicao_1', 1);
			setRespSoft('tabela_definida', 1, 'estat-dados');				
		} else {
			$('msg_ok').update(" ");
			setResp('atividade_1', 2);
			setResp('atividade_2', 0);
			setResp('atividade_3', 0);
			setResp('transicao_1', 0);
			setRespSoft('tabela_definida', 0, 'estat-dados');							
		}
	} else {
		//$('confirma_gravacao').update("Verifique se os dados digitados estão corretos.");
		verificaRestricoesTabela();
		
		setResp('tabela_principal', "");					
		setRespSoft("tabela_principal", "", 'estat-dados');	
		setRespSoft('tabela_definida', 0, 'estat-dados');				
		
		setResp('atividade_2', 0);
		setResp('atividade_3', 0);
		setResp('transicao_1', 0);
	}
}


function adicionaInputListener(nListeners) {
	
	for (i=0; i < nListeners; i++) {
		
		// Inputs de sexo
		Event.observe('sexo_'+ i, 'change', function(evento) {
			validaInput_linha(this);
		});

		// Inputs de altura
		Event.observe('altura_'+ i, 'change', function(evento) {
			validaInput_linha(this);
		});
		
		// Inputs de calcado
		Event.observe('calcado_'+ i, 'change', function(evento) {
			validaInput_linha(this);
		});		
		
	}
}



function validaInput_linha(obj) {
	var nome = obj.id;
	var idLinha;
	
	idLinha = nome.split("_")[1];
	
	var aux_sexo = $('sexo_' + idLinha);
	var aux_calcado = $('calcado_' + idLinha);
	var aux_altura = $('altura_' + idLinha);

	// estado = ["0","1","2"] -> [ vazio, correto, incorreto  ]
	//var estado = $('status_'+idLinha).innerHTML;
	var estado = $('linha_'+idLinha).readAttribute("status");
	
	if ((aux_calcado.value.length == 0) || (aux_sexo.value.length == 0) || (aux_altura.value.length == 0)) {		
		$('valida_'+idLinha).update(' ');
		$('linha_'+idLinha).writeAttribute("status", "0");
		//$('status_'+idLinha).update("0");
	} else if ( validaInput_sexo(aux_sexo.value) && validaInput_altura(aux_altura.value) && validaInput_calcado(aux_calcado.value)) {
		
		if (estado != "1") {
			nCorretos++;
		}
		
		$('valida_'+idLinha).update('<img src="img_layout/certinho.gif"/>');
		$('linha_'+idLinha).writeAttribute("status", "1");
		//$('status_'+idLinha).update("1");
		
	} else {
		if (estado == "1") {
			nCorretos--;
		}	
	
		$('valida_'+idLinha).update('<img src="img_layout/erradinho.gif"/>');
		$('linha_'+idLinha).writeAttribute("status", "2");
		//$('status_'+idLinha).update("2");
	}
	
	$('nDadosValidos').update(nCorretos);	
	setResp('num_dados', nCorretos);
}

function validaInput_sexo (valor) {
	
	if ((valor.toUpperCase() == "M") || (valor.toUpperCase() == "F")) {
		return true;
	} else {
		return false;
	}
	
}

function validaInput_altura (valor) {

	if (valor.length == 0) {
		return false;
	} else { 
		var k = valor.replace(/[0-9]/g, "");
		if (k.length == 0)  {
			return true;
		} else {
			return false;
		}		
	}	
}


// Metodo velho para validar a altura (em metros)
function validaInput_altura_old (valor) {

	//valor = trim(valor);
	if (valor.length == 0) {
		return false;
	} else if (valor.length == 1){
		var k = valor.replace(/[0-9]/g, "");
		if (k.length == 0)  {
			return true;
		} else {
			return false;
		}		
	} else {	
		var k = valor.replace(/[0-9]/g, "");
		if (k.length == 1)  {
			return true;
		} else {
			return false;
		}
	}	
}

function validaInput_calcado (valor) {

	if (valor.length == 0) {
		return false;
	} else {
		var k = valor.replace(/[0-9]/g, "");
		if (k.length == 0)  {
			return true;
		} else {
			return false;
		}
	}		
}

/*
function formatoAltura (obj) {
	
	var valor = obj.value;
	
	if (valor.length == 1) {
		obj.value == obj.value + ",00";
	} else {
		var a,b, k, aux ;
		
		a = valor.search(",");
		b = valor.search(".");
		
		if (a != -1) {
			k = a+1;
			
		}
	}
	
}
*/



// a:item do vetor, b: parametro de comparacao
function compara_dados(a,b) {
	return (a.dado == b);
}

function ordenaDados(a,b) {
	var i,j;
	
	i = Number(a.dado);
	j = Number(b.dado);
	
	return (i-j);
}


function montaVetoresDados() {
	var vetorDados = getResp('tabela_principal');
	var applet = document.ggbApplet;

	vetorSexo = new Array();
	vetorCalcado = new Array();
	vetorAltura = new Array();

	//Um vetor de dados;
	vetorDados = eval(vetorDados);

	for (var i=0; i < vetorDados.length; i++) {
		
		//Para sexo
		var j=encontraElementoArray(vetorDados[i].sexo, vetorSexo, compara_dados);
		if (j == -1) {
			vetorSexo.push({dado:vetorDados[i].sexo, freq:1});
		} else {
			vetorSexo[j].freq++;
		}
				
		//Para numero de calcados
		var j=encontraElementoArray(vetorDados[i].calcado, vetorCalcado, compara_dados);
		if (j == -1) {
			vetorCalcado.push({dado:vetorDados[i].calcado, freq:1});
		} else {
			vetorCalcado[j].freq++;
		}
		
		
		//Para altura
		var j=encontraElementoArray(vetorDados[i].altura, vetorAltura, compara_dados);
		if (j == -1) {
			vetorAltura.push({dado:vetorDados[i].altura, freq:1});
		} else {
			vetorAltura[j].freq++;
		}

	}	
	
	if (vetorSexo[0].freq == vetorDados.length) {
		var sex="M";
		if (vetorSexo[0].dado == "M"){
			sex = "F";
		}		
		vetorSexo.push({dado:sex, freq:0});
	}
	
	
	// Cria as barras que nao apresentaram dados
	vetorCalcado.sort(ordenaDados);
	var min_calcado = vetorCalcado[0].dado;
	var max_calcado = vetorCalcado[vetorCalcado.length-1].dado;
	
	var k = min_calcado;
	for (var k=min_calcado; k <=max_calcado; k++) {
		if (encontraElementoArray(k, vetorCalcado, compara_dados) == -1) {
			vetorCalcado.push({dado:k, freq:0});
		}
	}	
	
	vetorCalcado.sort(ordenaDados);
	vetorAltura.sort(ordenaDados);
	
	//Salva os vetores de forma crua
	setResp('vetorCalcado', vetorCalcado.toJSON());
	setResp('vetorAltura', vetorAltura.toJSON());
	setResp('vetorSexo', vetorSexo.toJSON());
	
	//Salva os vetores de forma a se inserir nos graficos
	montaDadosParaGrafico(vetorSexo, vetorCalcado, vetorAltura);
}

// Cria um vetor bi-dimensional com titulos em array[0] e frequencias em array[1]
function montaDadosParaGrafico(vetorS, vetorC, vetorA) {
	var dadosSexo = new Array();
	var freqSexo = new Array();
	
	var dadosAltura = new Array();
	var freqAltura = new Array();
	
	var dadosCalcado = new Array();
	var freqCalcado = new Array();
	
	for (var i=0; i < vetorS.length; i++) {
		dadosSexo.push(vetorS[i].dado);
		freqSexo.push(vetorS[i].freq);
	}
	
	for (var i=0; i < vetorA.length; i++) {
		dadosAltura.push(vetorA[i].dado);
		freqAltura.push(vetorA[i].freq);
	}
	
	for (var i=0; i < vetorC.length; i++) {
		dadosCalcado.push(vetorC[i].dado);
		freqCalcado.push(vetorC[i].freq);
	}
	
	var aux = new Array();
	
	aux = [ dadosSexo, freqSexo ];	
	setResp('dados_sexo_grafico', aux.toJSON());

	aux = [ dadosAltura, freqAltura ];	
	setResp('dados_altura_grafico', aux.toJSON());

	aux = [ dadosCalcado, freqCalcado ];	
	setResp('dados_calcado_grafico', aux.toJSON());
	
}



function alterarGrafico(tipo, valor ) {
	//1: genero, 2: calcado
	var aux = new Array();

	switch (tipo) {
	case 1:
		if (valor == "genero - pizza") {
			$('change_genero').value = "genero - barras";
			aux = eval(getResp('dados_sexo_grafico'));			
			pizza(aux[0], aux[1]);
		} else {
			aux = eval(getResp('dados_sexo_grafico'));
			barras(aux[0], aux[1]);	
		}
		break;
	case 2:
		if (valor == "calcado - pizza") {
			$('change_calcado').value = "calcado - barras";
			aux = eval(getResp('dados_calcado_grafico'));			
			pizza(aux[0], aux[1]);
		} else {
			$('change_calcado').value = "calcado - pizza";
			aux = eval(getResp('dados_calcado_grafico'));
			barras(aux[0], aux[1]);			
		}	
		break;
	case 3:
		aux = eval(getResp('dados_calcado_grafico'));			
		
		histograma(aux[0], aux[1]);
		
		//console.log(pos);
		break;
	}
}


function salvar_tabela_dados(resp) {

	var array_dados = criaArrayDados();
	
	setResp('tabela_principal', array_dados.toJSON());
	setResp('atividade_1', 3);
	
	montaVetoresDados();

}
