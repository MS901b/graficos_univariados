/*
var MeuBloco;
Event.observe(window, 'load', function(){
       BlocoNotas = new Blocao();
});	
*/

/*
	Padronização do ID: 
		- [['p/parte','q/questao','/item'],'_'] vai gerar um id do tipo p1_q2_1
		- [['p/parte','q/questao','/itemletra'],'_'] vai gerar um id do tipo p1_q2_a
	Palavras-chave: questao, parte, item, itemletra, subitem
	Devem ser precedidas de uma barra '/'.
	A palavra-chave subitem será usada somente em questões com mais de um campo
*/

var IdPadrao = [
    ['parte/parte', 'q/questao', '/itemletra', '/subitem'], '_'
];
var nomeSoft = 'estat';
var Partes = ['1', '2', '3', '4'];

/*
	Questoes
	
	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item
	
	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/

var Questoes = [{ //Parte 1

        parte1_q1: //Questão 1
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'generico',
                    corrigir: corrige_q_1_a,
                    enunciado: 'Qual intervalo contém o maior número de alunos?',
                    dados: '<div><span class="a_esquerda">[</span><div id="corretor_q1_g_1"><input id="parte1_q1_g_1" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_q1_g_2"><input id="parte1_q1_g_2" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda">)</span></div><br class="limpador" />',
                    msgErro: 'Você pode obter essas informações no histograma, de acordo com o número acima de cada intervalo.',
                    msgAjuda: 'Se existirem dois ou mais intervalos com uma mesma quantidade de dados, escolha um deles para responder a questão.'
                },

                { //B
                    tipo: 'generico',
                    corrigir: corrige_q_1_b,
                    enunciado: 'Qual intervalo contém o menor número de alunos?',
                    dados: '<div><span class="a_esquerda">[</span><div id="corretor_q1_g_3"><input id="parte1_q1_g_3" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_q1_g_4"><input id="parte1_q1_g_4" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda">)</span></div><br class="limpador" />',
                    msgErro: 'Você pode obter essas informações no histograma, de acordo com o número acima de cada intervalo.',
                    msgAjuda: 'Se existirem dois ou mais intervalos com a mesma quantidade de dados, escolha qualquer um deles para responder a questão.'
                }
            ]
        },
        parte1_q2: //Questão 2
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_2,
                    enunciado: 'Qual é a amplitude de cada intervalo?',
                    msgErro: 'Escolha um intervalo, identifique seus extremos e faça a subtração dos valores (indicados abaixo de cada barra).',
                    msgAjuda: '"Amplitude" é um sinônimo de "tamanho".'
                }
            ]
        },
        parte1_q3: //Questão 3
        {
            enunciadoGeral: 'O <a id="pontoMove">segmento de reta</a> no quadro divide o histograma em duas partes. A área da parte esquerda do gráfico é indicada pelo valor ao lado do segmento',
            itens: [

                { //A
                    tipo: 'multipla_escolha',
                    corrigir: corrige_q_3,
                    enunciado: 'Qual é a área total do histograma?',
                    dados: [
                        { value: '1', label: '0,1' },
                        { value: '2', label: '1' },
                        { value: '3', label: '<span id="q3_total_dados">#NUM#</span>' },
                        { value: '4', label: '10' }
                    ],
                    msgErro: 'Posicione o segmento no maior valor possível e observe o valor fornecido (extremo do gráfico).',
                    msgAjuda: 'Para mover o segmento, clique e arraste o ponto horizontalmente.'
                }
            ]
        },
        parte1_q4: //Questão 4
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'instrucao',
                    corrigir: corrige_q_4,
                    enunciado: 'Posicione o segmento sobre o valor que deve representar a mediana.',
                    msgErro: 'A mediana é um valor m que satisfaz os seguintes critérios: pelo menos metade da amostra assume valores maiores ou iguais a m, e pelo menos metade da amostra assume valores menores ou iguais a m.'
                }
            ]
        },
        parte1_q5: //Questão 4
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_5,
                    //** CENTIMETROS enunciado: 'Que proporção da sala tem altura maior que 1,60m?',
                    enunciado: 'Que proporção da sala tem altura maior que 160 cm?',
                    msgErro: 'Posicione o segmento no valor 160 cm e observe o complementar do valor fornecido.',
                    msgAjuda: 'Você pode dar a reposta em porcentagem, com o símbolo "%", ou, ainda, em números decimais, mas, neste caso, sempre com duas casas depois da vírgula.'
                }
            ]
        }

    },
    { //Parte 2

        parte2_q6: //Questão 6
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'generico',
                    esperando: true,
                    corrigir: corrige_q_6,
                    enunciado: 'Qual intervalo contém o maior número de alunos?',
                    dados: '<div><span class="a_esquerda">[</span><div id="corretor_q6_g_1"><input id="parte2_q6_g_1" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_q6_g_2"><input id="parte2_q6_g_2" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda">)</span></div><br class="limpador" />',
                    msgErro: 'Você pode obter essa informação no histograma.',
                    msgAjuda: 'Se existirem dois ou mais intervalos com a mesma quantidade de dados, escolha qualquer um deles para responder a questão.'
                }
            ]
        },
        parte2_q7: //Questão 7
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    esperando: true,
                    corrigir: corrige_q_7,
                    //**CENTIMETROS enunciado: 'Que proporção da sala tem altura maior que 1,60m?',
                    enunciado: 'Que proporção da sala tem altura maior que 160 cm?',
                    msgErro: 'Use o segmento de reta para obter o valor procurado. Lembre-se que ele fornece a área à esquerda de sua posição, ou seja, a resposta será o complementar',
                    msgAjuda: 'Dê a reposta em porcentagem, usando o símbolo "%", ou com números decimais, neste caso, sempre com duas casas depois da vírgula.'
                }
            ]
        },
        parte2_q8: //Questão 8
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    esperando: true,
                    corrigir: corrige_q_8,
                    enunciado: 'Que proporção da sala tem altura entre 165 cm e 175 cm?',
                    msgErro: 'Obtenha a proporção para 165 cm e, em seguida, a proporção para 175 cm (posicionando a reta em cada coordenada). A subtração desses valores é a proporção da sala. Mas este resultado fornece a área de que região do gráfico?',
                    msgAjuda: 'Dê a reposta em porcentagem, usando o símbolo "%", ou com números decimais, neste caso, sempre com duas casas depois da vírgula.'
                }
            ]
        }
    },
    { //Parte 3

        parte3_q9: //Questão 9
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_9,
                    enunciado: 'Qual é a altura mediana do conjunto de dados?Para obter esse resultado você pode posicionar o segmento sobre o valor desejado. Use o <a id="pontoMove">ponto destacado</a> para mover o segmento.',
                    msgErro: 'Verifique a área do gráfico à esquerda da barra. Ela deve ser de 50%.'
                }
            ]
        },
        parte3_q10: //Questão 10
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_10,
                    enunciado: 'Qual é o valor de altura que deixa 10% dos indivíduos abaixo dela?',
                    msgErro: 'Como a área total é igual a 1, então 10%, corresponde a 0,1.',
                    msgAjuda: 'Use a barra, pois é correspondente à área.'
                }
            ]
        },
        parte3_q11: //Questão 11
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_11,
                    enunciado: 'Encontre o 70º quantil, isto é, o valor abaixo do qual estão os 70% mais baixos da sua turma.',
                    msgErro: 'Como a área total é igual 1, então 70% corresponde a 0,7.',
                    msgAjuda: 'Para mover a barra, clique sobre o ponto e arraste-o. Observe a área.'
                }
            ]
        },
        parte3_q12: //Questão 12
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_12_a,
                    enunciado: 'Escolha um valor de altura que tenha sido observado em <a href="#" onclick="BlocoNotas.abre(); event.returnValue = false; return false;">sua amostra</a> e digite na caixa de texto abaixo.',
                    msgErro: 'Veja a tabela no bloco de notas.'
                },
                { //B
                    tipo: 'instrucao',
                    corrigir: corrige_q_12_b,
                    depende: true,
                    enunciado: 'No histograma ao lado, posicione o segmento de reta sobre o valor que você escolheu no item anterior.',
                    msgErro: 'Observe o valor no eixo horizontal.'
                },
                { //C
                    tipo: 'input',
                    depende: true,
                    corrigir: corrige_q_12_c,
                    enunciado: 'O valor que você escolheu corresponde a que quantil?',
                    msgErro: 'Você precisa saber quantos indivíduos têm altura menor ou igual ao valor que você escolheu. Lembre-se que você tem a área do gráfico.',
                    msgAjuda: 'Dê a reposta em porcentagem, usando o símbolo "%", ou com números decimais, neste caso, sempre com duas casas depois da vírgula.'
                }
            ]
        }
    },
    { //Parte 4

        parte4_q13: //Questão 13
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'input',
                    corrigir: corrige_q_13,
                    selecionada: apaga_selecao_q15,
                    enunciado: 'Qual é o quantil associado à altura 170 cm?',
                    msgErro: 'Use o segmento de reta que fornece a área do histograma até aquele ponto para obter a resposta.',
                    msgAjuda: 'Dê a reposta em porcentagem, usando o símbolo "%", ou com números decimais, neste caso, sempre com duas casas depois da vírgula.'
                }
            ]
        },
        parte4_q14: //Questão 14
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'generico',
                    corrigir: corrige_q_14,
                    selecionada: apaga_selecao_q15,
                    enunciado: 'Qual é o intervalo que contém 50% dos dados centrais, que é o intervalo entre o 1º e o 3º <a id="quartil">quartil</a>?',
                    dados: '<div><span class="a_esquerda">[</span><div id="corretor_q14_g_1"><input id="parte4_q14_g_1" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_q14_g_2"><input id="parte4_q14_g_2" style="width:30px; margin: 0 5px !important;"/></div><span class="a_esquerda">)</span></div><br class="limpador" />',
                    msgErro: 'Obtenha o valor que deixa 25% dos dados abaixo dele, este será o limitante inferior do intervalo procurado. Para obter o outro extremo encontre o valor que deixa 75% dos dados abaixo dele. Após encontrá-los, preencha as coordenadas de acordo com os valores encontrados.',
                    //msgAjuda: 'O quartil é qualquer um dos três valores que divide o conjunto ordenado de dados em quatro partes iguais. Por exemplo, 1º quartil corresponde ao 25% quantil.'
                }
            ]
        },
        parte4_q15: //Questão 15
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'generico',
                    corrigir: corrige_q_15,
                    selecionada: seleciona_q15,
                    enunciado: 'Observe as medidas de tendência central representadas no gráfico. Faça a correspondência entre cada segmento e a medida referente. Você pode usar a barra para verificar sua resposta.',
                    dados: '<table><tr><td style="width:70px;"><a id="moda">Moda</a>: </td><td><div id="corretor_q15_g_1"><input id="parte4_q15_g_1" style="margin: 0pt 5px ! important; width: 45px;"/></div></td></tr><tr><td><a id="media">Média</a>: </td><td><div id="corretor_q15_g_2" ><input id="parte4_q15_g_2" style="margin: 0pt 5px ! important; width: 45px;"/></div></td></tr><tr><td><a id="mediana">Mediana</a>: </td><td><div id="corretor_q15_g_3" ><input id="parte4_q15_g_3" style="margin: 0pt 5px ! important; width: 45px;"/></div></td></tr></table>',
                    msgErro: ' ',
                    msgAjuda: 'Preencha cada caixa de texto com valores correspondentes aos segmentos.'

                }
            ]
        }
    }
]

/*
	Bloco de Notas
	
	Nesse Array ficam os dados que aparecem no Bloquinho de notas.
	Se você for na linha 35 do exemplo_correcao.js verá que está sendo criada uma instância
	de "Blocao", uma classe de bloco de notas que permite tabelas no conteúdo. Se não for
	usar tabelas no Software, altere para "Bloco". Ambas classes utilizam a variavel global
	MeuBloco para preencher o seu conteúdo.
*/

var MeuBloco = new Array();