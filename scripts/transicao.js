// Transicao

var iniciou_sl=false;
var iniciou_tela=false;

Event.observe(window, 'load', function(){
	iniciou_tela=true;
	
	alteraQuadradinhos();
});

Event.observe(document, 'flash:SalvaLocal', function(ev) {
	iniciou_sl = true;
	
	alteraQuadradinhos();
});

function alteraQuadradinhos(){

	if (iniciou_sl && iniciou_tela) {
		
		$('atividade2').removeClassName('ja_feita');
		$('atividade2').removeClassName('aberta');
		$('atividade2').removeClassName('comecada');	

		$('atividade3').removeClassName('ja_feita');
		$('atividade3').removeClassName('aberta');
		$('atividade3').removeClassName('comecada');				
		
		var a = Number(getResp('atividade_2'));
		var b = Number(getResp('atividade_3'));
		
		if (a==1){
			$('atividade2').addClassName('aberta');
		} else if (a==2) {
			$('atividade2').addClassName('comecada');
		} else if (a==3) {
			$('atividade2').addClassName('ja_feita');
			
			var concluida = new Element('div', {className: 'concluida'}).insert('Atividade já concluída.');
			$('pai_atividade2').insert(concluida);			
		}
		
		if (b==1){
			$('atividade3').addClassName('aberta');
		} else if (b==2) {
			$('atividade3').addClassName('comecada');
		} else if (a==3) {
			$('atividade3').addClassName('ja_feita');
			
			var concluida = new Element('div', {className: 'concluida'}).insert('Atividade já concluída.');
			$('pai_atividade3').insert(concluida);			
		}		
		
	}
}