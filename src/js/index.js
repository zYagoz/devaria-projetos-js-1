const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');


const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $containerBtnFormThree = $('#containerBtnFormThree');
const $btnFormThree = $('#btnFormThree');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $inputPontos = $('#pontosForte');
const $inputHabildiades = $('#habilidades');

const minLegthText = 2;
const minLengthTextArea = 10;
const cepRegex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/
const cepMax = 13;
const cepMin = 8;

let nomeValido = false;
let sobrenomeValido = false;
let emailValido = false;
let dataNascimentoValido = false;
let enderecoValido = false;
let complementoValido = false;
let cidadeValido = false;
let cepValido = false;
let HabilidadeValido = false;
let PontosValido = false;

function validaInput(element, minLength, maxLength) {
    const closest = $(element).closest('.input-data');
    if (!element.value
        || (minLength && element.value.trim().length < minLength)
        || (maxLength && element.value.trim().length > maxLength)) {
        closest.addClass('error');
        return false;
    }
    closest.removeClass('error');
    return true;
}

function validaEmail(element) {
    const closest = $(element).closest('.input-data');
    if (!element.value || !element.value.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        closest.addClass('error');
        return false;
    }
    closest.removeClass('error');
    return true;
};

function validarFormuUm() {
    if (nomeValido && sobrenomeValido && emailValido && dataNascimentoValido) {
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
        $btnFormOne.off('click').on('click', initFormTwo);
    } else {
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click');
        }}


function initFormTwo(){
    $stepText.text('Passo 2 de 3 : Dados de correspondência');
    $stepDescription.text('Informe seus dados para prosseguir - Entraremos em contato se necessário');
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function(){
        enderecoValido = validaInput(this, minLengthTextArea);
        validarFormDois();
    });
    
    $inputCidade.keyup(function(){
        cidadeValido = validaInput(this, minLegthText);
        validarFormDois();
    });

    $inputComplemento.keyup(function(){
    });

    $inputCep.keyup(function(){
        this.value = this.value.replace(/\D/g, '', );
        cepValido = validaInput(this, cepMin, null , cepRegex)
        if(cepValido){
            this.value = this.value.replace(cepRegex ,"$1.$2-$3")
        }
        validarFormDois();
    })
    
};

function validarFormDois() {
    if(enderecoValido && cepValido && cidadeValido)  {
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click', initFormThree);
    } else {
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        $btnFormTwo.off('click');
        }}

function validarFormThree() {
    if(enderecoValido && cepValido && cidadeValido)  {
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
        $btnFormThree.off('click').on('click', initFormThree);
    } else {
        $containerBtnFormThree.addClass('disabled');
        $btnFormThree.addClass('disabled');
        $btnFormThree.off('click');
        }}

function initFormThree(){
    $stepText.text('Passo 3 de 3 : Sobre você');
    $stepDescription.text('Descreva sobre você para podermos te conhecer');
    $stepTwo.hide();
    $stepThree.show();

    $inputHabildiades.keyup(function(){
        enderecoValido = validaInput(this, minLengthTextArea);
        validarFormThree();
    });

    $inputPontos.keyup(function(){
        enderecoValido = validaInput(this, minLengthTextArea);
        validarFormThree();
    });

}

function init() {
    $stepText.text('Passo 1 de 3 : Dados Pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor');
    $stepTwo.hide();
    $stepThree.hide();


    $inputEmail.keyup(function(){
        emailValido = validaEmail(this);
        validarFormuUm()
    });

    $inputNome.keyup(function(){
        nomeValido = validaInput(this, minLegthText);
        validarFormuUm()
    });

    $inputSobrenome.keyup(function(){
        sobrenomeValido = validaInput(this, minLegthText);
        validarFormuUm()
    });

    $inputNascimento.change(function(){
        dataNascimentoValido = validaInput(this, minLegthText);
        validarFormuUm()
    });

    $inputNascimento.keyup(function(){
        dataNascimentoValido = validaInput(this, minLegthText);
        validarFormuUm()
    });


    $inputMinibio.keyup(function(){
        validarFormuUm()
    });

    $inputNascimento.on('focus', function(){
        this.type = 'date'

    });

    $inputNascimento.on('blur', function(){
        if(!this.value){
            this.type = 'text'
        }   
    })

}

init();