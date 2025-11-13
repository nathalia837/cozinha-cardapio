import{mostrarMsg}from"./util.js";
import{recuperarSenha}from"./api.js";
document.getElementById('formRecuperar').addEventListener('submit',async(event)=>{
    event.preventDefault;
     const email=document.getElementById('email').Value.trim();
    if(!email){
        mostrarMsg('Por favor,verifique email',"red");
        return
    }
    const botao=document.getElementById('Recuperar');
    botao.disabled=true;
    botao.textContent='Enviando';
    const{sucesso,msg,}=await recuperarSenha(email);
    botao.disabled=false;
    botao.textContent='Recuperar Senha'
    if(sucesso){
        mostrarMsg(msg||`Instrução de recuperação enviada para seu email`,"green");
    }else{
        mostrarMsg(msg||"Não foi possivel enviar email de recuperação","red")
    }
});
 

