$(".pesquisacep").click(consultaCEP);

function consultaCEP(e) {
	e.preventDefault();
	let cep = $("input[name='cep']").val();
	let url = 'https://viacep.com.br/ws/' + cep + '/json';
	$.get(url,tratarjson)
	 .fail(exibeErro);
}

function tratarjson(data) {
	if(data.hasOwnProperty('erro')) {
		exibeErro();
	} else {
		let endereco = data.logradouro;
		let bairro = data.bairro;
		let cidade = data.localidade;
		let estado = data.uf;
		let complemento = data.complemento;
		atualizarForm(endereco, bairro, cidade, estado);
	}
}

function exibeErro() {
	atualizarForm("Não encontrado", "Não encontrado", "Não encontrado", "Não encontrado");
	$(".alert").fadeIn(400);
	setTimeout(function(){
		$(".alert").fadeOut(400)
	}, 4000)
}

function atualizarForm(endereco, bairro, cidade, estado, complemento) {
	$("input[name='endereco']").val(endereco);
	$("input[name='bairro']").val(bairro);
	$("input[name='cidade']").val(cidade);
	$("input[name='estado']").val(estado);
	$("input[name='complemento']").val(complemento);
}