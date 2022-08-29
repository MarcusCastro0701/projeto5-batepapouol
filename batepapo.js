let nick = prompt('Diga seu nome!!')
let nome = {name:nick}


function enviandoNome(){
    const envio = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);
    envio.catch(deuErro)
}
enviandoNome()

function deuErro(){
    alert('Este nome já está em uso, insira outro por favor!');
    nick = prompt('Diga seu nome!')
}


let inputobj;
function atualizamsg(){
    inputobj = {
        from: nome.name,
        to: "Todos",
        text: document.querySelector('#mensagem-baixo').value,
        type: "message"
    }
}
setInterval(atualizamsg, 300)


let a;
let b;
let e;
function publico(){
    a = document.querySelector('.checkp');
    a.classList.remove('none');
    b = document.querySelector('.checkr');
    b.classList.add('none')
    const atributo = document.querySelector('.botao-enviar');
    atributo.setAttribute('onClick', 'enviandoMensagem()')
}


let nomeprivado;
let c;
let d;
function reservadamente(){
    c = document.querySelector('.checkr');
    c.classList.remove('none');
    d = document.querySelector('.checkp');
    d.classList.add('none')
    nomeprivado = prompt('Para quem vc deseja enviar uma mensagem privada?')
    const atributo = document.querySelector('.botao-enviar');
    atributo.setAttribute('onClick', 'enviandoMensagemPv()') 
}
let inputobjpv;
function atualizamsgpv(){
    inputobjpv = {
        from: nome.name,
        to: nomeprivado,
        text: document.querySelector('#mensagem-baixo').value,
        type: "private_message"
    }
}
setInterval(atualizamsgpv, 300)

function enviandoMensagemPv(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', inputobjpv);
    document.querySelector('#mensagem-baixo').value = "";
}

function enviandoMensagem(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', inputobj);
    document.querySelector('#mensagem-baixo').value = "";
}



function verificandoStatus(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
}
setInterval(verificandoStatus, 5000)

let mensagens = []; 



function pegandoOsDados(){ 

    let promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(dadosChegaram); 

}
setInterval(pegandoOsDados, 2000)

let receba;
function dadosChegaram(resposta){ 

    receba = resposta.status;
    
    console.log(resposta);
    
    console.log(resposta.data);
    
    mensagens = resposta.data;

    carregarMensagens()
}

let meio;


function carregarMensagens (){
    meio = document.querySelector('.meio');
    meio.innerHTML = "";
    for(let i = 0; i < 100; i++){
        if(mensagens[i].type === 'status' ){
            meio.innerHTML += `
            <div class = "mensagem cinza">

              <p><b>${mensagens[i].from}</b> ${mensagens[i].text}</p>

            </div>
            `
        }else if (mensagens[i].type === 'private_message' ){
            `<div class = "mensagem rosa">

            <p>(${mensagens[i].time}) <b>${mensagens[i].from}</b> para <b>${mensagens[i].to}</b>: ${mensagens[i].text}</p>

            </div>`
            
        }else{
            meio.innerHTML += `
            <div class = "mensagem">

              <p>(${mensagens[i].time}) <b>${mensagens[i].from}</b> para <b>${mensagens[i].to}</b>: ${mensagens[i].text}</p>

            </div>
            `
        }
        
    }
}

let x;
let y;

function sidebar(){
    x = document.querySelector('.engloba-sidebar');
    x.classList.toggle('none');
    y = document.querySelector('.div-mae');
    y.classList.toggle('none');
}






