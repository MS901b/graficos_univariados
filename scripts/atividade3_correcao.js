/**************************************
		VARIAVEIS GLOBAIS
**************************************/
var vetorAlturaGlobal = new Array();
var vetorAlturaDiscreta = new Array();

var histogramaLabels = new Array();
var histogramaFreq = new Array();
var totalNumElementos = 0;
var numDivisoes = 0;
var amplitudeGrupo = 0;

var iniciou_applet = false;
var iniciou_applet_primeira_vez = false;
var iniciou_sl = false;
var inicio_doc = false;
// Variaveis usadas para gerar os dados continuos na barrinha do histograma
var _tamanho_barra;
var _min_valor;
var _max_valor;
var passo;
var passo_metade;

/**************************************
		INICIALIZACAO
**************************************/
Event.observe(window, 'load', function() {

    iniciou_doc = true;
    carregaTudo();
});

Event.observe(document, 'flash:SalvaLocal', function(ev) {
    iniciou_sl = true;
    carregaTudo();
});

function trataFloat(id) {
    var valor = $(id).value;
    if (valor != '') {
        valor = valor.replace(",", ".");
        if (!(isNaN(valor))) {
            valor = parseFloat(valor);
            valor = valor.toFixed(2);
            $(id).value = valor;
        }
    }
}

function ggbOnInit() {
    // Carrega os dados globais de altura

    iniciou_applet = true;

    if (iniciou_applet_primeira_vez == false) {
        iniciou_applet_primeira_vez = true;
        carregaTudo();
    }
}

function carregaTudo() {
    iniciou_sl = true;
    iniicou_doc = true;
    if (iniciou_applet && iniciou_sl && iniciou_doc) {

        // carrega ggb
        vetorAlturaGlobal = eval(getResp('vetorAltura'));
        totalNumElementos = getResp('tabela_num_elementos');
        // ----

        // Carrega doc
        // Carrega os dados globais de altura
        vetorAlturaGlobal = eval(getResp('vetorAltura'));
        totalNumElementos = getResp('tabela_num_elementos');

        // Monta as configuracoes de tela, as respostas  e tudo que NAO depende do applet carregado	
        switch (PosicaoAtual.Parte) {

            case 0:
                montaParte1();
                break;

            case 1:
                if (getResp('atividade3_parte2_input_valor_inicial') != '') {
                    removeEsperando({ Parte: 1, Questao: 'parte2_q6', Item: 0 }, '');
                    removeEsperando({ Parte: 1, Questao: 'parte2_q7', Item: 0 }, '');
                    removeEsperando({ Parte: 1, Questao: 'parte2_q8', Item: 0 }, '');

                    $('valor_inicial').addClassName('desabilitada');
                    $('input_valor_inicial').trava()
                    $('link_valor_inicial').hide();
                    $('unset_inicial').show();

                }
                break;

            case 2:
                montaTelaParte2();
                break;
            case 3:
                montaParte3();
                break;
        }

        if (getResp('atividade_3') < 3) {
            setResp('atividade_3', 2);
        }

        //carregaRespostasPreenchidas();
        // -----

        // Bloco
        BlocoNotas = new Blocao();
        MeuBloco = new Array();

        var i = 1;
        var tabela = eval(getResp('tabela_principal'));

        var num_pag = Math.ceil(tabela.length / 9);
        var total = tabela.length;

        var indice = 0;
        for (i = 0; i < num_pag; i++) {
            if (i > 0) MeuBloco.push('Tabela da Atividade 1 (continuação)');
            else MeuBloco.push('Tabela da Atividade 1');
            var dados = new Array();

            // cabecalho
            dados.push([{ value: 'Gênero', largura: 3 }, { value: 'Calçado', largura: 4 }, { value: 'Altura (cm)', largura: 4 }]);

            var j = 0;
            for (j = 0;
                ((j < 9) && (j + i * 9 < total)); j++) {
                indice = 9 * i + j;
                dados.push([{ value: tabela[indice].sexo, tipo: 'texto' }, { value: tabela[indice].calcado, tipo: 'texto' }, { value: tabela[indice].altura, tipo: 'texto' }]);
            }

            MeuBloco.push(dados);
            MeuBloco.push("Total de dados: " + total);
        }


        // -------------
        //console.log("switch --- ");

        switch (PosicaoAtual.Parte) {
            case 0:
                //console.log("case 0");
                numDivisoes = 4;
                exibeValorDadosHistograma = true;
                divideDadosHistograma(numDivisoes);
                montaHistograma(numDivisoes);
                break;
            case 1:
                //console.log("case 1");
                numDivisoes = Number(getResp('atividade3_divisoes_p2'));
                exibeValorDadosHistograma = true;
                if (numDivisoes != '') {
                    divideDadosHistograma(numDivisoes);
                    montaHistograma(numDivisoes);
                }
                break;
            case 2:
                //console.log("case 2");
                numDivisoes = Number(getResp('atividade3_divisoes_p2'));
                exibeValorDadosHistograma = true;
                montaHistograma(numDivisoes);
                break;
            case 3:
                //console.log("case 3");
                numDivisoes = Number(getResp('atividade3_divisoes_p2'));
                exibeValorDadosHistograma = true;
                montaHistograma(numDivisoes);

                //criar e esconder as retas necessarias
                //console.log("antes do applet 3");
                configuraAppletParte3();
                //console.log("depois do applet 3");

                break;
        }
    }

    carregaRespostasPreenchidas();

}

function carregaRespostasPreenchidas() {
    switch (PosicaoAtual.Parte) {
        case 0:
            $('parte1_q1_g_1').value = getResp('atividade3_parte1_q1_g_1');

            Event.observe('parte1_q1_g_1', 'change', function(evento) {
                setResp('atividade3_parte1_q1_g_1', $('parte1_q1_g_1').value);
            });

            $('parte1_q1_g_2').value = getResp('atividade3_parte1_q1_g_2');

            Event.observe('parte1_q1_g_2', 'change', function(evento) {
                setResp('atividade3_parte1_q1_g_2', $('parte1_q1_g_2').value);
            });

            $('parte1_q1_g_3').value = getResp('atividade3_parte1_q1_g_3');

            Event.observe('parte1_q1_g_3', 'change', function(evento) {
                setResp('atividade3_parte1_q1_g_3', $('parte1_q1_g_3').value);
            });

            $('parte1_q1_g_4').value = getResp('atividade3_parte1_q1_g_4');

            Event.observe('parte1_q1_g_4', 'change', function(evento) {
                setResp('atividade3_parte1_q1_g_4', $('parte1_q1_g_4').value);
            });

            $('parte1_q2_a').value = getResp('atividade3_parte1_q2_a');

            Event.observe('parte1_q2_a', 'change', function(evento) {
                setResp('atividade3_parte1_q2_a', $('parte1_q2_a').value);
            });

            $('parte1_q5_a').value = getResp('atividade3_parte1_q5_a');

            Event.observe('parte1_q5_a', 'change', function(evento) {
                trataFloat('parte1_q5_a')
                setResp('atividade3_parte1_q5_a', $('parte1_q5_a').value);
            });

            var radioQ3 = getResp('atividade_3_q_3_valor');
            if (radioQ3 != '') {
                $(radioQ3).checked = true;
            }

            break;
        case 1:

            $('input_valor_inicial').value = getResp('atividade3_parte2_input_valor_inicial');

            Event.observe('input_valor_inicial', 'change', function(evento) {
                setResp('atividade3_parte2_input_valor_inicial', $('input_valor_inicial').value);
            });

            $('parte2_q6_g_1').value = getResp('atividade3_parte2_q6_g_1');

            Event.observe('parte2_q6_g_1', 'change', function(evento) {
                setResp('atividade3_parte2_q6_g_1', $('parte2_q6_g_1').value);
            });

            $('parte2_q6_g_2').value = getResp('atividade3_parte2_q6_g_2');

            Event.observe('parte2_q6_g_2', 'change', function(evento) {
                setResp('atividade3_parte2_q6_g_2', $('parte2_q6_g_2').value);
            });

            $('parte2_q7_a').value = getResp('atividade3_parte2_q7_a');

            Event.observe('parte2_q7_a', 'change', function(evento) {
                trataFloat('parte2_q7_a')
                setResp('atividade3_parte2_q7_a', $('parte2_q7_a').value);
            });

            $('parte2_q8_a').value = getResp('atividade3_parte2_q8_a');

            Event.observe('parte2_q8_a', 'change', function(evento) {
                trataFloat('parte2_q8_a')
                setResp('atividade3_parte2_q8_a', $('parte2_q8_a').value);
            });

            break;
        case 2:

            $('parte3_q9_a').value = getResp('atividade3_parte3_q9_a');

            Event.observe('parte3_q9_a', 'change', function(evento) {
                setResp('atividade3_parte3_q9_a', $('parte3_q9_a').value);
            });

            $('parte3_q10_a').value = getResp('atividade3_parte3_q10_a');

            Event.observe('parte3_q10_a', 'change', function(evento) {
                setResp('atividade3_parte3_q10_a', $('parte3_q10_a').value);
            });

            $('parte3_q11_a').value = getResp('atividade3_parte3_q11_a');

            Event.observe('parte3_q11_a', 'change', function(evento) {
                setResp('atividade3_parte3_q11_a', $('parte3_q11_a').value);
            });

            $('parte3_q12_a').value = getResp('atividade3_parte3_q12_a');

            Event.observe('parte3_q12_a', 'change', function(evento) {
                setResp('atividade3_parte3_q12_a', $('parte3_q12_a').value);
            });

            $('parte3_q12_c').value = getResp('atividade3_parte3_q12_c');

            Event.observe('parte3_q12_c', 'change', function(evento) {
                trataFloat('parte3_q12_c')
                setResp('atividade3_parte3_q12_c', $('parte3_q12_c').value);
            });

            break;
        case 3:
            $('parte4_q13_a').value = getResp('atividade3_parte4_q13_a');

            Event.observe('parte4_q13_a', 'change', function(evento) {
                trataFloat('parte4_q13_a')
                setResp('atividade3_parte4_q13_a', $('parte4_q13_a').value);
            });

            $('parte4_q14_g_1').value = getResp('atividade3_parte4_q14_g_1');

            Event.observe('parte4_q14_g_1', 'change', function(evento) {
                setResp('atividade3_parte4_q14_g_1', $('parte4_q14_g_1').value);
            });

            $('parte4_q14_g_2').value = getResp('atividade3_parte4_q14_g_2');

            Event.observe('parte4_q14_g_2', 'change', function(evento) {
                setResp('atividade3_parte4_q14_g_2', $('parte4_q14_g_2').value);
            });

            $('parte4_q15_g_1').value = getResp('atividade3_parte4_q15_g_1');

            Event.observe('parte4_q15_g_1', 'change', function(evento) {
                setResp('atividade3_parte4_q15_g_1', $('parte4_q15_g_1').value);
            });

            $('parte4_q15_g_2').value = getResp('atividade3_parte4_q15_g_2');

            Event.observe('parte4_q15_g_2', 'change', function(evento) {
                setResp('atividade3_parte4_q15_g_2', $('parte4_q15_g_2').value);
            });

            $('parte4_q15_g_3').value = getResp('atividade3_parte4_q15_g_3');

            Event.observe('parte4_q15_g_3', 'change', function(evento) {
                setResp('atividade3_parte4_q15_g_3', $('parte4_q15_g_3').value);
            });
            break;
    }
}

var somador = 0;

function montaParte1() {
    /* Divide os dados em n intervalos e plota o histograma 
    	SUPONDO que existam no minimo n elementos
    */
    var valorNaoRepetido = totalNumElementos;

    if (totalNumElementos == 10) valorNaoRepetido = 11;
    $('q3_total_dados').update(valorNaoRepetido);

    numDivisoes = 4;

    amplitudeGrupo = (vetorAlturaGlobal[vetorAlturaGlobal.length - 1].dado - vetorAlturaGlobal[0].dado) / numDivisoes;
    amplitudeGrupo = Math.round(amplitudeGrupo * 100) / 100;

    // Intervalo de valor inicial e final do grupo
    var valorInicial = vetorAlturaGlobal[0].dado;
    var valorFinal = valorInicial + amplitudeGrupo;

    //console.log("aaaaa");

    // Inicializa o vetor discreto
    for (var i = 0; i < numDivisoes; i++) {
        vetorAlturaDiscreta.push({ valorInicial: 0, valorFinal: 0, freqAcAnt: 0, freqAcPos: 0, numElementos: 0 });
    }

    var indiceAux = 0;

    for (var i = 0; i < vetorAlturaGlobal.length; i++) {

        // Intervalo fechado em inicial e aberto em final		
        if (vetorAlturaGlobal[i].dado > valorFinal) {
            vetorAlturaDiscreta[indiceAux].valorInicial = valorInicial;
            vetorAlturaDiscreta[indiceAux].valorFinal = valorFinal;

            valorInicial = valorFinal;
            valorFinal += amplitudeGrupo;
            indiceAux++;

            vetorAlturaDiscreta[indiceAux].valorInicial = valorInicial;
            vetorAlturaDiscreta[indiceAux].valorFinal = valorFinal;
        }

        vetorAlturaDiscreta[indiceAux].numElementos += vetorAlturaGlobal[i].freq;
    }

    var somadorElementos = 0;
    for (var i = 0; i < vetorAlturaDiscreta.length; i++) {
        somadorElementos += vetorAlturaDiscreta[i].numElementos;
        vetorAlturaDiscreta[i].freqAcAnt = (somadorElementos - vetorAlturaDiscreta[i].numElementos) / totalNumElementos;
        vetorAlturaDiscreta[i].freqAcPos = somadorElementos / totalNumElementos;
    }



    /*
    console.log(vetorAlturaDiscreta.toSource());
    console.log(vetorAlturaGlobal.toSource());
    */
}


function montaHistogramaParte1() {
    /*
	var nElementos = 4;
	for (var i=0; i < nElementos; i++) {
		//histogramaLabels.push(String(vetorAlturaDiscreta[i].valorInicial) + " - " + String(vetorAlturaDiscreta[i].valorFinal));
		histogramaLabels.push(" ");
		histogramaFreq.push(vetorAlturaDiscreta[i].numElementos);
	}
	
	//console.log(histogramaLabels, histogramaFreq);
	histograma(histogramaLabels, histogramaFreq);
*/

}

function montaParte2(nDiv) {
    numDivisoes = Number(getResp('atividade3_divisoes_p2'));
    exibeValorDadosHistograma = true;
    divideDadosHistograma(nDiv);
    montaHistograma(nDiv);


}

function montaTelaParte2(nDiv) {
    numDivisoes = Number(getResp('atividade3_divisoes_p2'));
    divideDadosHistograma(numDivisoes);

}

function montaParte3(nDiv) {
    numDivisoes = Number(getResp('atividade3_divisoes_p2'));
    divideDadosHistograma(numDivisoes);

}

function configuraAppletParte3() {
    var applet = document.ggbApplet;

    var media = (mediaVetor(vetorAlturaGlobal));
    var mediana = (dadoDoQuantil(0.5));
    var moda = (modaVetor(vetorAlturaDiscreta));

    //tamanho de cada bloco
    var k = 10 / numDivisoes;

    //cria as 3 retas correspondentes
    var a = 10 * Math.abs(media - _min_valor) / (_max_valor - _min_valor);
    var b = 10 * Math.abs(mediana - _min_valor) / (_max_valor - _min_valor);
    var c = 10 * Math.abs(moda - _min_valor) / (_max_valor - _min_valor);

    applet.evalCommand('reta_media: x=' + a);
    applet.evalCommand('reta_mediana: x=' + b);
    applet.evalCommand('reta_moda: x=' + c);

    //console.log("definição das retas");

    applet.evalCommand('mediaLabel=Text["Média",(' + a + ',1.05)]');
    applet.evalCommand('medianaLabel=Text["Mediana",(' + b + ',0.95)]');
    applet.evalCommand('modaLabel=Text["Moda",(' + c + ',0.85)]');

    applet.setLineStyle('reta_media', 1);
    applet.setLineStyle('reta_mediana', 1);
    applet.setLineStyle('reta_moda', 1);

    applet.setFixed('reta_media', true);
    applet.setFixed('reta_mediana', true);
    applet.setFixed('reta_moda', true);

    applet.setFixed('mediaLabel', true);
    applet.setFixed('medianaLabel', true);
    applet.setFixed('modaLabel', true);

    applet.setVisible('reta_media', false);
    applet.setVisible('reta_mediana', false);
    applet.setVisible('reta_moda', false);

    applet.setVisible('mediaLabel', false);
    applet.setVisible('medianaLabel', false);
    applet.setVisible('modaLabel', false);

}

function divideDadosHistograma(nDiv) {
    numDivisoes = nDiv;

    var a = (vetorAlturaGlobal[vetorAlturaGlobal.length - 1].dado - vetorAlturaGlobal[0].dado) / numDivisoes;
    var b = Math.floor((vetorAlturaGlobal[vetorAlturaGlobal.length - 1].dado - vetorAlturaGlobal[0].dado) / numDivisoes);

    var quantoFalta = (vetorAlturaGlobal[vetorAlturaGlobal.length - 1].dado - vetorAlturaGlobal[0].dado) % numDivisoes;

    if (quantoFalta == 0) amplitudeGrupo = (vetorAlturaGlobal[vetorAlturaGlobal.length - 1].dado - vetorAlturaGlobal[0].dado) / numDivisoes;
    else amplitudeGrupo = Math.ceil(a);


    //amplitudeGrupo = Math.round(amplitudeGrupo * 1000)/1000;

    // Remove os elementos que já foram inseridos anteriormente: MUDANCA DE VALOR INICAL
    while (vetorAlturaDiscreta.length != 0) {
        vetorAlturaDiscreta.pop();
    }

    // Inicializa o vetor discreto
    for (var i = 0; i < numDivisoes; i++) {
        vetorAlturaDiscreta.push({ valorInicial: 0, valorFinal: 0, freqAcAnt: 0, freqAcPos: 0, numElementos: 0 });
    }

    // Intervalo de valor inicial e final do grupo
    var valorInicial = vetorAlturaGlobal[0].dado;
    var valorFinal = valorInicial + amplitudeGrupo;

    vetorAlturaDiscreta[0].valorInicial = valorInicial;
    vetorAlturaDiscreta[0].valorFinal = valorFinal;

    var indiceAux = 0;
    for (var i = 0; i < vetorAlturaGlobal.length; i++) {
        // Intervalo fechado em inicial e fechado no final
        if (indiceAux == (nDiv - 1)) {
            if (((vetorAlturaGlobal[i].dado >= valorInicial) && (vetorAlturaGlobal[i].dado <= valorFinal))) {
                vetorAlturaDiscreta[indiceAux].numElementos += vetorAlturaGlobal[i].freq;
            } else {
                valorInicial = valorFinal;
                valorFinal += amplitudeGrupo;
                i--;
            }

        } else {

            // Intervalo fechado em inicial e aberto em final	

            if (((vetorAlturaGlobal[i].dado >= valorInicial) && (vetorAlturaGlobal[i].dado < valorFinal))) {
                vetorAlturaDiscreta[indiceAux].numElementos += vetorAlturaGlobal[i].freq;
            } else {
                valorInicial = valorFinal;
                valorFinal += amplitudeGrupo;
                indiceAux++;
                i--;

                vetorAlturaDiscreta[indiceAux].valorInicial = valorInicial;
                vetorAlturaDiscreta[indiceAux].valorFinal = valorFinal;
            }
        }
    }

    var somadorElementos = 0;
    for (var i = 0; i < vetorAlturaDiscreta.length; i++) {
        somadorElementos += vetorAlturaDiscreta[i].numElementos;
        vetorAlturaDiscreta[i].freqAcAnt = (somadorElementos - vetorAlturaDiscreta[i].numElementos) / totalNumElementos;
        vetorAlturaDiscreta[i].freqAcPos = somadorElementos / totalNumElementos;
    }

    // Definicoes de constantes para o histograma
    _tamanho_barra = 10 / 7;
    _min_valor = vetorAlturaGlobal[0].dado;
    //_max_valor = vetorAlturaGlobal[vetorAlturaGlobal.length-1].dado;
    _max_valor = _min_valor + numDivisoes * amplitudeGrupo;

    passo = 10 / (_max_valor - _min_valor);
    passoMetade = passo / 2;

    //console.log(vetorAlturaGlobal[0]);
}

function montaHistograma(nDiv) {
    var nElementos = nDiv;

    // Remove os labels anteriores
    while (histogramaLabels.length != 0) {
        histogramaLabels.pop();
    }

    while (histogramaFreq.length != 0) {
        histogramaFreq.pop();
    }

    var delta = (vetorAlturaDiscreta[vetorAlturaDiscreta.length - 1].valorFinal - vetorAlturaDiscreta[0].valorInicial) / nDiv;
    //delta = Math.round(delta*100)/100;
    var a = vetorAlturaDiscreta[0].valorInicial;
    //a = Math.round(vetorAlturaDiscreta[0].valorInicial*100)/100;

    for (var i = 0; i < nElementos; i++) {

        var vinicial = a + delta * i;
        var vfinal = a + delta * (i + 1);

        vinicial = Math.round(vinicial * 10) / 10;
        vfinal = Math.round(vfinal * 10) / 10;

        /*CENTIMETROS
        	vinicial = Math.floor(Math.round(vinicial*100)/100);		
        	vfinal = Math.floor(Math.round(vfinal*100)/100);
        */

        histogramaLabels.push("[" + String(vinicial) + " ; " + String(vfinal) + ")");
        histogramaFreq.push(vetorAlturaDiscreta[i].numElementos);
    }

    //console.log(histogramaLabels, histogramaFreq);
    histograma(histogramaLabels, histogramaFreq);

}


/**************************************
		FUNCOES DE USO GERAL
**************************************/
function tudoCerto() {
    if (PosicaoAtual.Parte == 3) {
        setResp('atividade_3', 3);
    }
}

function dadoDoQuantil(nQuantil) {

    var i = 0;
    var continua = true;
    while ((i < vetorAlturaDiscreta.length) && continua) {
        if (vetorAlturaDiscreta[i].freqAcPos > nQuantil) {
            continua = false;
        }
        i++;
    }
    i--;

    var resultado = vetorAlturaDiscreta[i].valorFinal - amplitudeGrupo * (vetorAlturaDiscreta[i].freqAcPos - nQuantil) / (vetorAlturaDiscreta[i].freqAcPos - vetorAlturaDiscreta[i].freqAcAnt);

    return Math.round(resultado * 100) / 100;
}

// Dado um valor retorna o quantil de inicio e fim 
function quantilDoDado_intervalo(nDado) {
    var resultado = new Array();

    var inicio = Math.floor(nDado);

    var q_inicial = quantilDoDado(inicio);
    var q_final = quantilDoDado(inicio + 0.9);

    resultado.push(q_inicial);
    resultado.push(q_final);

    return resultado;
}

function quantilDoDado2(nDado) {
    var i = 0;
    var continua = true;

    var saida = new Array();

    while ((i < vetorAlturaDiscreta.length) && continua) {
        if ((nDado >= vetorAlturaDiscreta[i].valorInicial) && (nDado <= vetorAlturaDiscreta[i].valorFinal)) {
            continua = false;
        } else {
            i++;
        }
    }

    var freqBloco = vetorAlturaDiscreta[i].numElementos / Number(totalNumElementos);
    var freqElementoBloco = freqBloco / amplitudeGrupo;



    var posicaoDado = (nDado - vetorAlturaDiscreta[i].valorInicial) / amplitudeGrupo;

    //console.log( posicaoDado,freqElementoBloco, " = ", Math.floor(posicaoDado*10));

    var quantil_inicial = vetorAlturaDiscreta[i].freqAcAnt + posicaoDado * freqElementoBloco;

    saida.push(quantil_inicial);
    saida.push(quantil_inicial + freqElementoBloco);

    return saida;




}


function quantilDoDado(nDado) {
    var i = 0;
    var continua = true;

    if (nDado < _min_valor) {
        return 0;
    } else if (nDado > _max_valor) {
        return 1;
    } else {

        while ((i < vetorAlturaDiscreta.length) && continua) {
            if ((nDado >= vetorAlturaDiscreta[i].valorInicial) && (nDado <= vetorAlturaDiscreta[i].valorFinal)) {
                continua = false;
            } else {
                i++;
            }
        }

        var resultado = vetorAlturaDiscreta[i].freqAcAnt + (nDado - vetorAlturaDiscreta[i].valorInicial) * (vetorAlturaDiscreta[i].freqAcPos - vetorAlturaDiscreta[i].freqAcAnt) / amplitudeGrupo;

        return Math.round(resultado * 100) / 100;
    }
}

// Dado um valor ele retorna o quantil dele
function encontraQuantil(dado, vetor) {
    var i = 0;
    var continua = true;
    var soma = 0;
    for (i = 0;
        ((i < vetor.length) && continua); i++) {

        if (vetor[i].dado > dado) {
            continua = false;
        } else {
            soma = soma + vetor[i].freq;
        }

        /*
        if (vetor[i].dado == dado) {
        	continua = false;
        }
        */
    }

    var numElementos = getResp('tabela_num_elementos');
    var qInicial = (soma) / numElementos;

    return qInicial;

}

// Dado um quantil ele retorna o valor
function encontraDadoDoQuantil(quantil, vetor) {
    var soma = 0;
    var continua = true;
    var dado;

    var numElementos = getResp('tabela_num_elementos');

    for (var i = 0;
        ((i < vetor.length) && continua); i++) {
        soma = soma + vetor[i].freq;
        if ((soma / numElementos) >= quantil) {
            continua = false;
            dado = vetor[i].dado;
        }
    }


    return dado;
}


function set_inicial_p2() {
    if (($('input_valor_inicial').value != "") &&
        Number($('input_valor_inicial').value > 0) &&
        Number($('input_valor_inicial').value <= 30)) {
        removeEsperando({ Parte: 1, Questao: 'parte2_q6', Item: 0 }, '');
        removeEsperando({ Parte: 1, Questao: 'parte2_q7', Item: 0 }, '');
        removeEsperando({ Parte: 1, Questao: 'parte2_q8', Item: 0 }, '');

        $('valor_inicial').addClassName('desabilitada');
        $('input_valor_inicial').trava()
        $('link_valor_inicial').hide();
        $('unset_inicial').show();

        montaParte2(Number($('input_valor_inicial').value));
        setResp('atividade3_divisoes_p2', Number($('input_valor_inicial').value));
    } else {
        // Aparece POPUP
        var Perg = {
            conteudo: 'O valor digitado deve um número natural maior do que 0 e menor do que 31.',
            layout: ['seta_baixo', 'direita'],
            largura: 15,
            callback: function() {},
            // se o usuário clicar em 'Sim', o popup chamará a funcao funcao_pede na qual this.resultado será 'sim'
            // Veja que essa função deve estar definida, ou ser definida nesse exato momento (como no exemplo "pede2")
            respostas: [{ sim: 'Ok' }]
        };

        var tmp = new PopupCallback($('link_valor_inicial'), Perg.conteudo, Perg.layout, Perg.largura, Perg.callback, Perg.respostas);
        tmp.abre();
        Event.stopObserving($('link_valor_inicial'), 'click');
        Event.observe($('link_valor_inicial'), 'click', set_inicial_p2);
    }
}

function unset_inicial_p2() {
    if (this.resultado == 'sim') {
        adicionaEsperando({ Parte: 1, Questao: 'parte2_q6', Item: 0 });
        adicionaEsperando({ Parte: 1, Questao: 'parte2_q7', Item: 0 });
        adicionaEsperando({ Parte: 1, Questao: 'parte2_q8', Item: 0 });
        $('valor_inicial').removeClassName('desabilitada');
        $('input_valor_inicial').destrava();
        $('link_valor_inicial').show();
        $('unset_inicial').hide();
    }
}

/**************************************
		FUNCOES DE CORRECAO
**************************************/

function corrige_q_1_a() {
    var valorInicial = processaNumero($('parte1_q1_g_1').value);
    var valorFinal = processaNumero($('parte1_q1_g_2').value);

    var indice = -1;

    // Encontra o maior elemento e o indice do valor dado
    var maior = 0;
    for (i = 0; i < vetorAlturaDiscreta.length; i++) {
        if (vetorAlturaDiscreta[i].numElementos > maior) {
            maior = vetorAlturaDiscreta[i].numElementos;
        }

        if ((Math.abs(vetorAlturaDiscreta[i].valorInicial - valorInicial) <= 0.011) && (Math.abs(vetorAlturaDiscreta[i].valorFinal - valorFinal) <= 0.01)) {
            indice = i;
        }
    }

    $('corretor_q1_g_1').removeClassName('correto');
    $('corretor_q1_g_1').removeClassName('incorreto');

    $('corretor_q1_g_2').removeClassName('correto');
    $('corretor_q1_g_2').removeClassName('incorreto');


    if (indice == -1) {
        $('corretor_q1_g_1').addClassName('incorreto');
        $('corretor_q1_g_2').addClassName('incorreto');

        return [false];
    }

    var retorno = vetorAlturaDiscreta[indice].numElementos == maior;

    if (retorno == false) {
        $('corretor_q1_g_1').addClassName('incorreto');
        $('corretor_q1_g_2').addClassName('incorreto');
        return [false];
    } else {
        $('corretor_q1_g_1').addClassName('correto');
        $('corretor_q1_g_2').addClassName('correto');

        return [true];
    }

}

function corrige_q_1_b() {
    var valorInicial = processaNumero($('parte1_q1_g_3').value);
    var valorFinal = processaNumero($('parte1_q1_g_4').value);

    var indice = -1;

    // Encontra o menor elemento e o indice do valor dado
    var menor = 9999999999999;
    for (i = 0; i < vetorAlturaDiscreta.length; i++) {
        if (vetorAlturaDiscreta[i].numElementos < menor) {
            menor = vetorAlturaDiscreta[i].numElementos;
        }

        if ((Math.abs(vetorAlturaDiscreta[i].valorInicial - valorInicial) <= 0.011) && (Math.abs(vetorAlturaDiscreta[i].valorFinal - valorFinal) <= 0.011)) {
            indice = i;
        }

    }

    $('corretor_q1_g_3').removeClassName('correto');
    $('corretor_q1_g_3').removeClassName('incorreto');

    $('corretor_q1_g_4').removeClassName('correto');
    $('corretor_q1_g_4').removeClassName('incorreto');

    if (indice == -1) {
        $('corretor_q1_g_3').addClassName('incorreto');
        $('corretor_q1_g_4').addClassName('incorreto');
        return [false];
    }


    var retorno = vetorAlturaDiscreta[indice].numElementos == menor;


    if (retorno == false) {
        $('corretor_q1_g_3').addClassName('incorreto');
        $('corretor_q1_g_4').addClassName('incorreto');
        return [false];
    } else {
        $('corretor_q1_g_3').addClassName('correto');
        $('corretor_q1_g_4').addClassName('correto');

        return [true];
    }

}

function corrige_q_2(valor) {
    return [(Math.abs(processaNumero(valor[0]) - amplitudeGrupo) <= 0.01)];
}

function corrige_q_3(valor) {
    for (var i = 0; i < valor.length; i++) {
        if (valor[i]) {
            setResp('atividade_3_q_3_valor', 'parte1_q3_a_' + String(i + 1));
        }
    }

    return [valor[0] ? false : null, valor[1] ? true : null, valor[2] ? false : null, valor[3] ? false : null];
}

function corrige_q_4() {
    var applet = document.ggbApplet;

    //cria a variavel polyCoverLabel
    //eval('var ' +  applet.getValueString('polyCoverLabel'));
    var polyCoverLabel = Number(applet.getValue('polyCoverLabelValue')).toFixed(2);

    if (polyCoverLabel == 0.5) {
        return [true];
    } else {
        return [false];
    }
}

function corrige_q_5(valor) {
    //**CENTIMETROS var resultado = 1 - quantilDoDado(1.6);
    var a = Math.round(quantilDoDado(160) * 100000) / 100000;
    var b = Math.round(quantilDoDado(160.9) * 100000) / 100000;

    var entrada = Math.round(Number(processaNumero(valor[0])) * 100000) / 100000;

    var menor = Number(1 - b).toFixed(5);
    var maior = Number(1 - a).toFixed(5);

    var retorno = (entrada >= menor) && (entrada <= maior);

    return [retorno];

}

function corrige_q_6() {
    var valorInicial = processaNumero($('parte2_q6_g_1').value);
    var valorFinal = processaNumero($('parte2_q6_g_2').value);

    var indice = -1;

    // Encontra o maior elemento e o indice do valor dado
    var maior = 0;
    for (i = 0; i < vetorAlturaDiscreta.length; i++) {
        if (vetorAlturaDiscreta[i].numElementos > maior) {
            maior = vetorAlturaDiscreta[i].numElementos;
        }

        if ((Math.abs(vetorAlturaDiscreta[i].valorInicial - valorInicial) <= 0.011) && (Math.abs(vetorAlturaDiscreta[i].valorFinal - valorFinal) <= 0.01)) {
            indice = i;
        }
    }

    $('corretor_q6_g_1').removeClassName('correto');
    $('corretor_q6_g_1').removeClassName('incorreto');

    $('corretor_q6_g_2').removeClassName('correto');
    $('corretor_q6_g_2').removeClassName('incorreto');


    if (indice == -1) {
        $('corretor_q6_g_1').addClassName('incorreto');
        $('corretor_q6_g_2').addClassName('incorreto');

        return [false];
    }

    var retorno = vetorAlturaDiscreta[indice].numElementos == maior;

    if (retorno == false) {
        $('corretor_q6_g_1').addClassName('incorreto');
        $('corretor_q6_g_2').addClassName('incorreto');
        return [false];
    } else {
        $('corretor_q6_g_1').addClassName('correto');
        $('corretor_q6_g_2').addClassName('correto');

        return [true];
    }
    /*
    var definido = getResp('atividade3_divisoes_p2');
    if (definido != "") {
    	var valorInicial = processaNumero( $('parte2_q6_g_1').value);
    	var valorFinal = processaNumero ($('parte2_q6_g_2').value);
    	
    	var indice=-1;
    	
    	// Encontra o maior elemento e o indice do valor dado
    	var maior = 0;
    	var indmaior=-1;
    	for (i=0; i < vetorAlturaDiscreta.length; i++) {
    		if (vetorAlturaDiscreta[i].numElementos > maior) {
    			maior = vetorAlturaDiscreta[i].numElementos;
    			
    			if ((Math.abs(vetorAlturaDiscreta[i].valorInicial - valorInicial)<=0.01) && (Math.abs(vetorAlturaDiscreta[i].valorFinal - valorFinal)<= 0.01)) {
    				indmaior = i;
    			}	
    			//indmaior = i;
    		}
    	}	
    	
    	$('corretor_q6_g_1').removeClassName('correto');
    	$('corretor_q6_g_1').removeClassName('incorreto');
    	
    	$('corretor_q6_g_2').removeClassName('correto');
    	$('corretor_q6_g_2').removeClassName('incorreto');
    	var e1 = Math.abs(vetorAlturaDiscreta[indmaior].valorInicial-valorInicial)<=0.01;
    	var e2 = Math.abs(vetorAlturaDiscreta[indmaior].valorFinal-valorFinal)<=0.01;
    	
    	e1 ? $('corretor_q6_g_1').addClassName('correto') : $('corretor_q6_g_1').addClassName('incorreto');	
    	e2 ? $('corretor_q6_g_2').addClassName('correto') : $('corretor_q6_g_2').addClassName('incorreto');		
    	
    	return [e1 && e2];
    } else {
    	return [false];
    }
    */
}

function corrige_q_7(valor) {
    var definido = getResp('atividade3_divisoes_p2');
    if (definido != "") {
        //**CENTIMETROS var resposta = 1 - quantilDoDado(1.60);
        var entrada = Number(processaNumero(valor[0]));

        var a = quantilDoDado(160);
        var b = quantilDoDado(160.9);

        var menor = 1 - b;
        var maior = 1 - a;

        menor = Math.round(menor * 1000) / 1000;
        maior = Math.round(maior * 1000) / 1000;
        var retorno = (entrada >= menor) && (entrada <= maior);

        return [retorno];
    } else {
        return [false];
    }

}

function corrige_q_8(valor) {
    var definido = getResp('atividade3_divisoes_p2');
    if (definido != "") {
        //*CENTIMETROS var resposta = quantilDoDado(1.75) - quantilDoDado(1.65);
        var entrada = Number(processaNumero(valor[0]));

        var intervalo1 = quantilDoDado_intervalo(165);
        var intervalo2 = quantilDoDado_intervalo(175);

        var menor1 = intervalo1[0];
        var maior1 = intervalo2[1];

        var menor2 = intervalo1[1];
        var maior2 = intervalo2[0];

        var resposta1 = maior1 - menor1;
        var resposta2 = maior2 - menor2;

        resposta1 = Math.round(resposta1 * 1000) / 1000;
        resposta2 = Math.round(resposta2 * 1000) / 1000;
        var retorno = (entrada >= resposta2) && (entrada <= resposta1);

        return [retorno];
    } else {
        return [false];
    }
}

function corrige_q_9(valor) {

    var applet = document.ggbApplet;

    var dado = Number(processaNumero(valor[0]));
    var dado2 = dado + 0.9;

    var retorno = (quantilDoDado(dado) <= 0.5) && (quantilDoDado(dado2) >= 0.5);

    return [retorno];
}

function corrige_q_10(valor) {
    //var resposta = dadoDoQuantil(0.1);
    var dado = processaNumero(valor[0]);
    var resposta = quantilDoDado(dado);

    var retorno = (resposta == 0.1);

    return [retorno];
}

function corrige_q_11(valor) {
    var dado = processaNumero(valor[0]);
    var resposta = quantilDoDado(dado);

    var retorno = (resposta == 0.7);

    return [retorno];
}

function corrige_q_12_a(valor) {
    var dado = processaNumero(valor[0]);
    var retorno = (encontraElementoArray(dado, vetorAlturaGlobal));
    var saida = (retorno != -1);

    setResp('atividade3_q_12_correta', 1);
    return [retorno != -1];

}

function corrige_q_12_b(valor) {
    var applet = document.ggbApplet;
    var altura_escolhida = processaNumero($('parte3_q12_a').value);

    if (altura_escolhida == null) {
        return [false];
    } else {

        //var dadosLabel = _dadosLabelValue;

        //dadosLabel = Math.floor(_dadosLabelValue);
        if (Math.abs(_dadosLabelValue - altura_escolhida) <= 0.4) {
            return [true];
        } else {
            return [false];
        }
    }
}

function corrige_q_12_c(valor) {
    var a = processaNumero($('parte3_q12_a').value);


    if (a == null) {
        return [false];
    } else {
        var intervalo = quantilDoDado_intervalo(a);
        var entrada = Number(processaNumero(valor[0]));

        var maior = intervalo[1];
        var menor = intervalo[0];

        maior = Math.round(maior * 1000) / 1000;
        menor = Math.round(menor * 1000) / 1000;

        var retorno = (entrada >= menor) && (entrada <= maior);

        return [retorno];
    }
}

function corrige_q_13(valor) {
    //**CENTIMETROS var resultado = quantilDoDado(1.7);
    var intervalo = quantilDoDado_intervalo(170);
    var entrada = Number(processaNumero(valor[0]));

    var maior = intervalo[1];
    var menor = intervalo[0];

    maior = Math.round(maior * 1000) / 1000;
    menor = Math.round(menor * 1000) / 1000;


    var retorno = (entrada >= menor) && (entrada <= maior);

    return [retorno];


}

function corrige_q_14(valor) {
    //var a = dadoDoQuantil(0.25);
    //var b = dadoDoQuantil(0.75);

    var valorInicial = Math.floor(Number(processaNumero($('parte4_q14_g_1').value)));
    var valorFinal = Math.floor(Number(processaNumero($('parte4_q14_g_2').value)));


    var a = quantilDoDado(valorInicial);
    var a2 = quantilDoDado(valorInicial + 0.9);

    var b = quantilDoDado(valorFinal);
    var b2 = quantilDoDado(valorFinal + 0.9);

    $('corretor_q14_g_1').removeClassName('correto');
    $('corretor_q14_g_1').removeClassName('incorreto');

    $('corretor_q14_g_2').removeClassName('correto');
    $('corretor_q14_g_2').removeClassName('incorreto');

    ((0.25 >= a) && (0.25 <= a2)) ? $('corretor_q14_g_1').addClassName('correto'): $('corretor_q14_g_1').addClassName('incorreto');
    ((0.75 >= b) && (0.75 <= b2)) ? $('corretor_q14_g_2').addClassName('correto'): $('corretor_q14_g_2').addClassName('incorreto');

    if (((0.25 >= a) && (0.25 <= a2)) && ((0.75 >= b) && (0.75 <= b2))) {
        return [true];
    } else {
        return [false];
    }



}

function corrige_q_15(valor) {
    var media = (mediaVetor(vetorAlturaGlobal));
    var mediana = (dadoDoQuantil(0.5));
    var moda = (modaVetor(vetorAlturaDiscreta));

    $('corretor_q15_g_1').removeClassName('correto');
    $('corretor_q15_g_1').removeClassName('incorreto');

    $('corretor_q15_g_2').removeClassName('correto');
    $('corretor_q15_g_2').removeClassName('incorreto');

    $('corretor_q15_g_3').removeClassName('correto');
    $('corretor_q15_g_3').removeClassName('incorreto');

    var a = Number(processaNumero($('parte4_q15_g_1').value));
    var b = Number(processaNumero($('parte4_q15_g_2').value));
    var c = Number(processaNumero($('parte4_q15_g_3').value));

    //console.log(media, mediana, moda);

    var resp1 = Math.abs(a - moda) <= 0.5;
    var resp2 = Math.abs(b - media) <= 0.5;
    var resp3 = Math.abs(c - mediana) <= 0.5;

    (resp1) ? $('corretor_q15_g_1').addClassName('correto'): $('corretor_q15_g_1').addClassName('incorreto');
    (resp2) ? $('corretor_q15_g_2').addClassName('correto'): $('corretor_q15_g_2').addClassName('incorreto');
    (resp3) ? $('corretor_q15_g_3').addClassName('correto'): $('corretor_q15_g_3').addClassName('incorreto');

    // Acerta os erros dinamicos
    var q = PegaQuestao({ Parte: 3, Questao: 'parte4_q15', Item: 0 });
    var r = q.MsgErro.divCont;
    var p = r.firstDescendant();

    var msgErro = 'Mova o segmento até a reta que representa cada medida resumo e preencha respectivamente com o valor indicado no eixo horizontal.';

    if (!resp1) msgErro = msgErro + '';
    if (!resp2) msgErro = msgErro + '';
    if (!resp3) msgErro = msgErro + '';

    p.update(msgErro);
    return [(resp1 && resp2 && resp3)];

}

function seleciona_q15() {
    var applet = document.ggbApplet;

    applet.setVisible('reta_media', true);
    applet.setVisible('reta_mediana', true);
    applet.setVisible('reta_moda', true);

    applet.setVisible('mediaLabel', true);
    applet.setVisible('medianaLabel', true);
    applet.setVisible('modaLabel', true);
}

function apaga_selecao_q15() {
    var applet = document.ggbApplet;

    applet.setVisible('reta_media', false);
    applet.setVisible('reta_mediana', false);
    applet.setVisible('reta_moda', false);

    applet.setVisible('mediaLabel', false);
    applet.setVisible('medianaLabel', false);
    applet.setVisible('modaLabel', false);
}



function medianaVetor(vetor) {
    var a = Math.floor(vetor.length / 2);

    if ((vetor.length % 2) == 0) {
        return (vetor[a].dado + vetor[a + 1].dado) / 2;
    } else {
        return vetor[a].dado;
    }
}

function modaVetor(vetor) {
    var moda = -1;
    var freqmax = -1;

    for (var i = 0; i < vetor.length; i++) {
        if (vetor[i].numElementos > freqmax) {
            freqmax = vetor[i].numElementos;
            moda = i;
        }
    }

    return (vetor[moda].valorInicial + vetor[moda].valorFinal) / 2;

}

/*
function modaVetor(vetor) {
	var moda = -1;
	var freqmax = -1;
	
	for (var i=0; i < vetor.length; i++) {
		if (vetor[i].freq > freqmax) {
			freqmax = vetor[i].freq;
			moda = i;
		}
	}
	
	return vetor[moda].dado;
}
*/

function mediaVetor(vetor) {
    var soma = 0;
    var numEl = 0;

    for (var i = 0; i < vetor.length; i++) {
        soma += vetor[i].freq * vetor[i].dado;
        numEl += vetor[i].freq;
    }

    var media = soma / numEl;

    return media;
}