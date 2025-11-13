const API_CARDAPIO ="https://cozinha-system-bx08.onrender.com"


async function tratarErroResponse(res, msgPadrao) {
    const textErro = await res.text();
    let msgErro;
    try {
        const errorData = JSON.parse(textErro);
        msgErro = errorData.msg || errorData.error || errorData.message || textErro;
    } catch {
        msgErro = textErro;
    }
    return { sucesso: false, msg: msgErro || msgPadrao || "Erro desconhecido na API", }
}
async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ nome, email, senha }),
        });


        if (!res.ok) return await tratarErroResponse(res, "Erro ao fazer login");
        const data = await res.json();


        if (data.usuario) {
           localStorage.setItem("usuarioId:",data.usuario.id);
           localStorage.setItem("usuarioNome:",data.usuario.nome);
           localStorage.setItem("token:",data.token);


            return { sucesso: true, user: data.usuario };
        } else {
            return { sucesso: false, msg: "Usuário ou senha incorretos", }
        }


    } catch (error) {
        console.error("Erro ao fazer login", error);
        return { Sucesso: false, mensagem: "Erro de conexão a API" }
    }


}


async function cadastrarCozinheira(email, nome, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });


        if (!res.ok) if (!res.ok) return await tratarErroResponse(res, "Erro ao cadastrar usuario");
        const data = await res.json();
        return { sucesso: true, user: data.usuario || null, }


    } catch (error) {
        console.error("Erro ao fazer cadastro", error);
        return { Sucesso: false, mensagem: "Erro de conexão a API" }
    }
}


async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recuperar senha", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email }),
        });


        if (!res.ok) if (!res.ok) if (!res.ok) return await tratarErroResponse(res, "Erro ao recuperar senha");
        const data = await res.json();
        return { sucesso: true, msg: data.msg || "Instruções enviadas ao seu email" }


    } catch (error) {
        console.error("Erro ao fazer recuperar senha", error);
        return { Sucesso: false, mensagem: "Erro de conexão a API" }
    }
}


export async function listarCardapio(){
    try {
        const res = await fetch(API_USUARIOS);
        const cardapios = await res.json();
        return cardapios;
       
    } catch (error) {
        console.error("Erro ao listar cardápio",error);
        alert("Ocorreu um erro ao carregar cardápio");
       
    }


}


export async function cadastrarCardapio(cardapio){
    try {
        cardapio.usuarioId=Number(localStorage.getItem("usuarioId"));
        const res = await fetch(API_USUARIOS,{
            method:"Post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(cardapio)
        });
        if (res.ok) {
            alert("Refeição cadastrar com sucesso!");
           
        } else {
            alert("Error ao cadastrar refeição!");
        }
       
    } catch (error) {
        console.error("Erro ao cadastrar cardápio",error);
        alert("Ocorreu um erro ao cadastrar cardápio");
    }


}


export async function alterarCardapio(id,atualizarCardapio){
    try {
        const res = await fetch(`API_USUARIOS/${id}`);
        const cardapio=await res.json();
        document.querySelector("#date").value=cardapio.data.split("T")[0];
        document.querySelector("Select#turnos").value=cardapio.turno;
        document.querySelector("input[name='refeicao']").value=cardapio.refeicao.titulo;
        document.querySelector("textarea[name='itens']").value=cardapio.refeicao.itens.join(",");
        document.querySelector("input[name='bebida']").value=cardapio.refeicao.bebida.join(",");
        if(cardapio.lanche){
           
        }
       
    } catch (error) {
        console.error("Erro ao alterar cardápio",error);
        alert("Ocorreu um erro ao alterar cardápio");
       
    }


}


export async function excluirCardapio(id){
    try {
        const res = await fetch(API_USUARIOS);
       
    } catch (error) {
        console.error("Erro ao excluir cardápio",error);
        alert("Ocorreu um erro ao excluir cardápio");
       
    }
   
}


export async function buscarCardapio(id){
    try {
        const res = await fetch(API_USUARIOS);
       
    } catch (error) {
        console.error("Error ao buscar cardápio ",error);
        alert("Ocorreu um erro ao buscar cardápio");
       
    }
   
}





