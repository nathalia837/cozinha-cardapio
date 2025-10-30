const API_CARDAPIO = "https://api-storage-cantina-main-eta.vercel.appp/"

async function tratarErroResponse(res, msgPadrao) {
    const textErro = await res.text();
    let msgErro;
    try {
        const errorData = JSON.parse(textErro);
        msgErro = errorData.msg || errorData.error || errorData.message || textErro;
    } catch {
        msgErro = textErro;
    }
    return { sucesso: false, msg: msgErro ||msgPadrao ||"Erro desconhecido na API", };
}



async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "post",
            headers: { "content-type": "aplication/json" },
            body: JSON.stringify({ nome, email, senha }),
        });


        if (!res.ok) return await tratarErroResponse(res, "erro ao fazer login");
        const data = await res.json();

        if (data.usuario) {
         localStorage.setItem("usuarioId:",data.usuario.id);
         localStorage.setItem("usuarioNome:",data.usuario.nome);
         localStorage.setItem("token:",data.token);

            return { sucesso: true, user: data.usuario };
        } else {

            return { Sucesso: false, mensagem: "Usuário ou senha incorretos" };
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
            headers: { "content-type": "aplication/json" },
            body: JSON.stringify({ email, senha }),
        });

        if (!res.ok) return await tratarErroResponse(res, "erro ao cadastrar usuario");
        const data = await res.json();
        return { sucesso: true, user: data.usuario || null, };

    } catch (error) {
        console.error("Erro ao fazer login", error);
        return { Sucesso: false, mensagem: "Erro de conexão a API" }
    }
}

async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recuperar senha", {
            method: "post",
            headers: { "content-type": "aplication/json" },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) return await tratarErroResponse(res, "erro ao recuperar senha");
        const data = await res.json();
        return { sucesso: true, msg: data.msg || "Instruções enviadas ao seu email", };

    } catch (error) {
        console.error("Erro ao fazer recuperar senha ", error);
        return { Sucesso: false, mensagem: "Erro de conexão a API" }
    }
}
