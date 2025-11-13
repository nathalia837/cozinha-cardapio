import{mostrarMsg}from"./util.js";
import{cadastrarCozinheira}from"./api.js";
document.getElementById('formCadastro').addEventListener('submit',async(event)=>{
   event.preventDefault;
    const email=document.getElementById('email').Value.trim();
    const senha=document.getElementById('senha').value.trim();
    const nome=document.getElementById('nome').value.trim();
    const confirmarSenha=document.getElementById('confirmarSenha').value.trim();
    if(!nome||!nome||!senha||!confirmarSenha){
        mostrarMsg('Por favor,preencha todos os campos','red');
        return
    }
    if(senha!=confirmarSenha){
        mostrarMsg('As senhas não conferem','red')
        return
    }
    const botao=document.getElementById('cadastrar');
    botao.disabled=true;
    botao.textContent='Cadastrando...';
    const{sucesso,msg}=await cadastrarCozinheira(nome,senha);
    botao.disabled=false;
    botao.textContent='cadastrar'
    if(sucesso){
        mostrarMsg("cadastro realizado com sucesso","green");
        setTimeout(()=>{
            window.location.href="login.html";
        },1500);


    }else{
        mostrarMsg(msg,"red")
    }
});

