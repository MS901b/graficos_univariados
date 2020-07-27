//Adiciona uma linha na tabela utilizada pela parte1, parte2 e desafio.
function addRow(idTabela) {

    var tbody = document.getElementById("tabelaDados").getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR");

    row.setAttribute("id", "linha_" + idTabela);
    row.setAttribute("status", "0");

    //Icone da lixeira
    var td = document.createElement("TD");
    td.id = "apaga_" + idTabela;
    var doc = document.createElement('div');
    doc.innerHTML = '<a href="javascript:removeRow(' + idTabela + ');"><img src="imgs/lixeira.jpg"/></a>';
    td.appendChild(doc);
    row.appendChild(td);

    //Adiciona os campos de Genero
    //doc = document.createTextNode(valorDado1);td.appendChild(doc);
    td = document.createElement("TD");
    doc = document.createElement("input");
    doc.setAttribute("id", "sexo_" + idTabela);
    td.appendChild(doc);
    row.appendChild(td);

    //Adiciona os campos NUMERO CALCADO
    td = document.createElement("TD");
    doc = document.createElement("input");
    doc.setAttribute("id", "calcado_" + idTabela);
    //doc.setAttribute("style", "width:200px");	
    td.appendChild(doc);
    row.appendChild(td);

    //Adiciona os campos de ALTURA
    td = document.createElement("TD");
    doc = document.createElement("input");
    doc.setAttribute("id", "altura_" + idTabela);
    doc.setAttribute("style", "width:30px");
    td.appendChild(doc);
    row.appendChild(td);


    //Icone de entrada valida
    td = document.createElement("TD");
    td.id = "valida_" + idTabela;
    doc = document.createTextNode(" ");
    td.appendChild(doc);
    row.appendChild(td);

    /*
    //Controle de estado (valido, invalido, vazio)
    td = document.createElement("TD");	
    td.id = "status_" + idTabela;	
    doc = document.createTextNode("0");	
    td.appendChild(doc);
    row.appendChild(td);		
    */
    // Adiciona a row no tbody.
    tbody.appendChild(row);

    // Atualiza o camp que informa o total de jogadas.
    /*var td = document.getElementById( 'nDadosValidos' );
    td.innerHTML = (tbody.rows.length);
    */
}

function limparTabela() {
    while ($('tabelaDados').rows.length > 1) {
        $('tabelaDados').deleteRow(1);
    }
    idTabela = 0;
    //adicionarLinhas(15);

    $('nDadosValidos').update("0");
    nCorretos = 0;

    vetorSexo = new Array();
    vetorCalcado = new Array();
    vetorAltura = new Array();

    permiteContinuar(false);
}

function removeRow(idLinha) {

    var arrayDados = criaArrayDados();
    //setResp('tabela_principal', arrayDados.toJSON(), 'estat-dados');

    var dados = eval(criaArrayDados().toJSON());
    dados.splice(idLinha, 1);
    //setRespSoft('tabela_principal', dados.toJSON(), 'estat-dados');

    limparTabela();
    carregarDadosTabela(true, dados);

    // Se por um acaso tenha alterado os dados 
    if (arrayDados.toJSON() != dados.toJSON()) {
        //$('SalvaLocal').ApagaTudo('estat');						

        var tabelaOK = verificaRestricoesTabela();
        /*
        if (tabelaOK) {
        	setResp('atividade_1', 3);
        	setResp('atividade_2', 1);
        	setResp('atividade_3', 1);
        	setResp('transicao_1', 1);
        	setRespSoft('tabela_definida', 1, 'estat-dados');				
        } else {
        	setResp('atividade_1', 2);
        	setResp('atividade_2', 0);
        	setResp('atividade_3', 0);
        	setResp('transicao_1', 0);
        	setRespSoft('tabela_definida', 0, 'estat-dados');							
        }
        */
    }



}

function validacaoRespostaNumericaSimples(id, casas) {

    valor = $(id).value;
    if (isNaN(valor) || (valor == null)) {
        $(id).value = '';
        return false;
    } else {
        $(id).value = roundNumber(valor, casas);
    }

}

function validacaoRespostaNumerica(id, casas) {
    valor = $(id).value;
    valor = processaNumero(valor);

    if (isNaN(valor) || (valor == null)) {
        $(id).value = '';
        return false;
    } else {
        if ($(id).value.indexOf('%') > -1) {
            $(id).value = roundNumber(valor * 100, 0) + '%';
        } else
        if ($(id).value.indexOf('/') > -1) {
            //Formato de fração
        } else {
            $(id).value = roundNumber(valor, casas);
        }
        return true;
    }

}



function roundNumber(num, dec) {
    var result = Math.round(Math.round(num * Math.pow(10, dec + 1)) / Math.pow(10, 1)) / Math.pow(10, dec);
    return result;
}


function processaNumero(respStr) {
    var respStrSplited = respStr.split('/');

    var respostaValida = true;
    if (respStrSplited.length > 1) {

        for (var i = 0; i < respStrSplited.length; i++) {
            respStrSplited[i] = processaNumero(respStrSplited[i]);
            if (respStrSplited[i] == null) respostaValida = false;
            if (respostaValida) {
                if (i == 0) {
                    var resp = respStrSplited[i];
                } else {
                    resp = resp / respStrSplited[i];
                }

            }
        }
        if (respostaValida) return resp;
        else return null;
    } else {
        if (respStr.indexOf('%') > -1) {
            respStr = respStr.replace(/%/, '');
            var porcento = true;
        } else var procento = false;

        respStr = respStr.replace(/,/g, '.');
        if (!isNaN(respStr) && (respStr.length > 0)) {
            if (porcento) respStr = respStr / 100;
        } else respStr = null;
        return respStr;
    }

}

function carregarDadosTabela(carregaDoVetor, Vetor) {
    //var dados = getResp('tabela_principal');
    if (carregaDoVetor) {
        var dados = Vetor;
    } else {
        var dados = getRespSoft('tabela_principal', 'estat-dados');
        dados = eval(dados);
    }

    for (i = 0; i < dados.length; i++) {
        addRow(i);
        $('sexo_' + i).value = dados[i].sexo;
        $('calcado_' + i).value = dados[i].calcado;
        $('altura_' + i).value = dados[i].altura;
        $('valida_' + i).update('<img src="img_layout/certinho.gif"/>');
        $('linha_' + i).writeAttribute("status", 1);
    }

    idTabela = i;
    $('nDadosValidos').update(i);
    nCorretos = i;

    var k = 10 - dados.length;
    if (k > 0) {
        adicionarLinhas(k);
    }
}


function adicionarLinhas(num) {
    //alert("ooi" + num);

    for (i = 1; i <= num; i++) {
        addRow(idTabela);
        idTabela++;
    }

    var tbody = document.getElementById("tabelaDados").getElementsByTagName("TBODY")[0];
    adicionaInputListener(tbody.rows.length);


}

function criaArrayDados() {
    var tbody = document.getElementById("tabelaDados").getElementsByTagName("TBODY")[0];
    var nLinhas = tbody.rows.length;
    var dados = new Array();

    var sexo, calcado, altura;
    for (i = 0; i < nLinhas; i++) {
        // Somente inclui os dados validos

        if ($('linha_' + i).readAttribute("status") == "1") {
            //if ($('status_'+i).innerHTML == "1") {
            sexo = $('sexo_' + i).value.toUpperCase();
            calcado = Number($('calcado_' + i).value);
            altura = Number(processaNumero($('altura_' + i).value));
            dados.push({ sexo: sexo, calcado: calcado, altura: altura });
        }
    }


    setResp('tabela_num_elementos', dados.length);
    setResp('tabela_num_elementos', dados.length, "estat-dados");
    return dados;
}