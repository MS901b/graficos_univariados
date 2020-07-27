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
var Partes = ['1', '2', '3'];

/*
	Questoes
	
	Aqui ficam concentrados todos os conteudos das questões da atividade!
	Veja que está separado por Parte/Questão/Item
	
	ATENÇÃO: Cada tipo possui um formato de entrada característico.
*/

var Questoes = [{ //Parte 1

        parte1_q1: //Questão 1
        {
            enunciadoGeral: 'No quadro ao lado, há um gráfico de barras e um gráfico de setor.',
            itens: [

                { //A
                    tipo: 'instrucao',
                    corrigir: corrige_q_1_a,
                    enunciado: 'Movendo o ponto destacado no <a id="pontoCirc">círculo</a>, altere os ângulos do gráfico de setor para que ele represente os dados da tabela acima.',
                    msgErro: 'A proporção entre os ângulos deve ser igual à proporção entre as frequências relativas.',
                    msgAjuda: 'O setor vermelho representa o gênero feminino, "F", e o setor azul representa o masculino, "M".'
                },

                { //B
                    tipo: 'instrucao',
                    corrigir: corrige_q_1_b,
                    enunciado: 'No gráfico de barras, mova <a id="pontoRet">o ponto destacado</a> em cada uma delas, alterando suas alturas até que elas representem corretamente os valores da tabela.',
                    msgErro: 'A altura relativa das barras deve manter a relação entre as frequências relativas de cada categoria. Além disso, a frequência relativa total não deve ser maior que 1.',
                    msgAjuda: 'Observe que a barra da direita representa o gênero feminino, "F", e a da esquerda representa o masculino, "M". No eixo vertical, os valores estão em decimal.'
                }
            ]
        }
    },
    { //Parte 2
        parte2_q2: //Questão 2
        {
            itens: [{ //A
                    tipo: 'input',
                    corrigir: corrige_q_2_a,
                    enunciado: 'Qual é o menor número de sapato da classe?',
                    msgErro: 'Você pode obter essa informação a partir de qualquer um dos gráficos.'
                },
                { //B
                    tipo: 'input',
                    corrigir: corrige_q_2_b,
                    enunciado: 'Qual é a frequência absoluta desse valor?',
                    msgErro: 'Você pode obter essa informação a partir do gráfico de barras.',
                    msgAjuda: 'A frequência absoluta é o valor exibido acima das barras.'
                },
                { //C
                    tipo: 'input',
                    corrigir: corrige_q_2_c,
                    enunciado: 'Qual é a frequência relativa desse valor?',
                    msgErro: 'A frequência relativa pode ser obtida em qualquer um dos dois gráficos.',
                    msgAjuda: 'Você pode dar a reposta em fração, usando "/", ou em porcentagem, com o símbolo "%", ou, ainda, em números decimais, mas, neste caso, sempre com duas casas depois da vírgula. Para obter a frequência relativa, você deve dividir a frequência absoluta (de um valor selecionado) pela quantidade total de pessoas da amostra.'
                }
            ]
        },
        parte2_q3: //Questão 3
        {
            itens: [{ //A
                tipo: 'input',
                corrigir: corrige_q_3_a,
                enunciado: 'Qual é a proporção de indivíduos da sala que têm calçado maior que 38?',
                msgErro: 'Para obter a proporção, você deve dividir o número de indivíduos que têm o calçado maior que 38 pelo total de pessoas da amostra.',
                msgAjuda: 'Você pode dar a reposta em fração, usando "/", ou em porcentagem, com o símbolo "%", ou, ainda, em números decimais, mas, neste caso, sempre com duas casas depois da vírgula.'
            }]
        },
        parte2_q4: //Questão 4
        {
            itens: [{ //A
                tipo: 'input',
                corrigir: corrige_q_4_a,
                enunciado: 'Qual é a proporção de indivíduos da sala que têm calçado menor que 36?',
                msgErro: 'Para obter a proporção, você deve dividir o número de pessoas que têm o calçado menor que 36 pelo total de pessoas da amostra.',
                msgAjuda: 'Você pode dar a reposta em fração, usando "/", ou em porcentagem, com o símbolo "%", ou, ainda, em números decimais, mas, neste caso, sempre com duas casas depois da vírgula.'
            }]
        }
    },
    { //Parte 3
        parte3_q5: //Questão 5
        {
            enunciadoGeral: '',
            itens: [

                { //A
                    tipo: 'generico',
                    corrigir: corrige_q_5_a,
                    enunciado: 'Escolha 2 intervalos quaisquer para representar as categorias sugeridas acima.',
                    dados: '<div><table style="width: 200px"><tr><td>Pé pequeno</td><td style="width: 100px"><span class="a_esquerda">[</span><div id="corretor_q5_g_1"><input id="parte3_q5_g_1" style="width:20px; margin: 0 5px;  background-color: rgb(223,223, 223);!important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_q5_g_2"><input id="parte3_q5_g_2" style="width:20px; margin: 0 5px !important;"/></div><span class="a_esquerda">]</span></div></td></tr><tr><td>Pé grande</td><td style="width: 100px"><span class="a_esquerda">[</span><div id="corretor_q5_g_5"><input id="parte3_q5_g_5" style="width:20px; margin: 0 5px !important;"/></div><span class="a_esquerda antes_depois depois">;</span><div id="corretor_q5_g_6"><input id="parte3_q5_g_6" style="width:20px; margin: 0 5px;background-color: rgb(223,223, 223); !important;"/></div><span class="a_esquerda">]</span></div></td></tr></table><br class="limpador" /><br>',
                    msgErro: 'Todos os valores da amostra devem estar em algum intervalo. E os intervalos não podem ter intersecções.'
                },
                { //B
                    tipo: 'generico',
                    corrigir: corrige_q_5_b,
                    dados: '<div><table style="width: 200px"><tr><td>Pé pequeno</td><td style="width: 100px"><div id="corretor_q5_b_1"><input id="parte3_q5_b_1" style="width:40px; margin: 0 5px !important;"/></div></td></tr><tr><td>Pé grande</td><td style="width: 100px"><div id="corretor_q5_b_2"><input id="parte3_q5_b_2" style="width:40px; margin: 0 5px !important;"/></div></td></tr></table><br class="limpador" /><br>',
                    enunciado: 'Quantos dados estão em cada uma das categorias?',
                    msgErro: 'O número em cima de cada barra indica a frequência absoluta daquele valor.'
                },
                { //C
                    tipo: 'generico',
                    corrigir: corrige_q_5_c,
                    dados: '<div><table style="width: 200px"><tr><td>Pé pequeno</td><td style="width: 100px"><div id="corretor_q5_g_7"><input id="parte3_q5_g_7" style="width:40px; margin: 0 5px !important;"/></div></td></tr><tr><td>Pé grande</td><td style="width: 100px"><div id="corretor_q5_g_9"><input id="parte3_q5_g_9" style="width:40px; margin: 0 5px !important;"/></div></td></tr></table><br class="limpador" /><br>',
                    enunciado: 'Calcule a frequência relativa de cada categoria.',
                    msgErro: 'Para calcular a frequência obtenha quantos dados existem em uma categoria e divida pelo total de dados.',
                    msgAjuda: 'Você pode dar a reposta em fração, usando "/", ou em porcentagem, com o símbolo "%", ou, ainda, em números decimais, mas, neste caso, sempre com duas casas depois da vírgula.'
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