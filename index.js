
function adicionarItem() {
    console.log("Função adicionarItem foi chamada!");
  
    let novoItem = document.getElementById("novo-item");
    let texto = novoItem.value.trim();
  
    if (texto !== "") {
      let lista = document.getElementById("lista-de-compras");
    
      let novoLi = document.createElement("li");
      novoLi.id = "opção";
    
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
    
      // Atualiza o contador ao marcar/desmarcar
      checkbox.addEventListener("change", atualizarContador);
    
      let span = document.createElement("span");
      span.textContent = texto;
    
      let botao = document.createElement("button");
      botao.textContent = "🗑️";
    
      // Evento para deletar o item
      botao.addEventListener("click", function () {
        lista.removeChild(novoLi);
        salvarLista();
        atualizarContador();
      });
    
      novoLi.appendChild(checkbox);
      novoLi.appendChild(span);
      novoLi.appendChild(botao);
      lista.appendChild(novoLi);
    
      novoItem.value = "";
    
      salvarLista();
      atualizarContador(); 
    }
  }
  
  function salvarLista() {
    let listaItems = document.querySelectorAll("#lista-de-compras li");
    let itens = [];
  
    listaItems.forEach(item => {
      // Verificar se o item contém o <span>
      let span = item.querySelector("span");
      if (span) {
        let texto = span.textContent;
        let checkbox = item.querySelector("input[type='checkbox']").checked;
        itens.push({ texto, checkbox }); // Adiciona um objeto com o texto e o estado do checkbox
      }
    });
  
    // Salva os itens no localStorage
    console.log("Itens sendo salvos no localStorage:", itens); // Verifica os itens antes de salvar
    localStorage.setItem("itens", JSON.stringify(itens));
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    // Carrega os itens do localStorage
    const itensSalvos = JSON.parse(localStorage.getItem("itens"));
    
    // Se existir algum item salvo, cria as listas
    if (itensSalvos) {
      const lista = document.getElementById("lista-de-compras");
      itensSalvos.forEach(item => {
        // Cria o li
        const novoLi = document.createElement("li");
        novoLi.id = "opção";
      
        // Cria o checkbox e ajusta o estado
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.checkbox;
       

      
        // Cria o span com o texto
        const span = document.createElement("span");
        span.textContent = item.texto;
      
        // Cria o botão de deletar
        const botao = document.createElement("button");
        botao.textContent = "🗑️";
      
        // Junta tudo dentro do li
        novoLi.appendChild(checkbox);
        novoLi.appendChild(span);
        novoLi.appendChild(botao);
      
        // Adiciona o li à lista
        lista.appendChild(novoLi);
      
        // Adiciona o evento para o botão de deletar
        botao.addEventListener("click", function() {
          lista.removeChild(novoLi); // Remove o item da lista
          salvarLista(); // Atualiza o localStorage
        });
      });
    }
  });

// Função para atualizar o contador
function atualizarContador() {
  const listaItems = document.querySelectorAll("#lista-de-compras li");
  const itensConcluidos = document.querySelectorAll("#lista-de-compras input[type='checkbox']:checked").length;
  
  // Filtra o li do input
  const listaFiltrada = Array.from(listaItems).filter(item => item.id !== "novo-item-container");
  
  const itensRestantes = listaFiltrada.length - itensConcluidos;

  // Atualiza o contador de itens restantes
  document.getElementById("contador").textContent = `Itens restantes: ${itensRestantes}`;
}

// Atualizar o contador toda vez que um checkbox for marcado/desmarcado
document.getElementById("lista-de-compras").addEventListener("change", atualizarContador);

// Chama a função para atualizar o contador quando a página carrega
document.addEventListener("DOMContentLoaded", atualizarContador);
