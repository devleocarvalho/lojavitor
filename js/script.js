// Array de produtos com URLs de imagem locais
const products = [
  { id: 1, name: "Base Líquida HD", price: 69.90, category: "cosmeticos", imageUrl: "./images/p-1.jpg" },
  { id: 2, name: "Máscara Facial Hidratante de Argila", price: 45.00, category: "beleza", imageUrl: "./images/p-2.jpg" },
  { id: 3, name: "Perfume Floral Elegance 100ml", price: 180.00, category: "perfumes", imageUrl: "./images/p-3.jpg" },
  { id: 4, name: "Kit de Pincéis Profissionais (12un)", price: 99.50, category: "cosmeticos", imageUrl: "./images/p-4.jpg" },
  { id: 5, name: "Sérum Facial com Vitamina C", price: 75.00, category: "beleza", imageUrl: "./images/p-5.jpg" },
  { id: 6, name: "Eau de Parfum Intense 50ml", price: 150.00, category: "perfumes", imageUrl: "./images/p-6.jpg" },
  { id: 7, name: "Protetor Solar Facial FPS 50", price: 55.00, category: "beleza", imageUrl: "/images/p-7.png" },
  { id: 8, name: "Kit Batons Líquidos Matte (3 cores)", price: 79.90, category: "cosmeticos", imageUrl: "/images/p-8.png" },
];

let cart = [];

// Número de WhatsApp para contato
const WHATSAPP_NUMBER = "(71) 99133-xxxx"; // SEU NÚMERO DE WHATSAPP AQUI

// Seleção de elementos do DOM
const cartCount = document.getElementById('cart-count');
const floatingCartCount = document.getElementById('floating-cart-count');
const cartIcon = document.getElementById('cart-icon');
const floatingCart = document.getElementById('floating-cart');
const cartModal = document.getElementById('cart-modal');
const closeCartModalBtn = document.getElementById('close-cart-modal');
const cartItemsList = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutWhatsappBtn = document.getElementById('checkout-whatsapp');
const productListDiv = document.getElementById('product-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-icon');
const searchOverlay = document.getElementById('search-overlay');
const closeSearchBtn = document.getElementById('close-search-btn');
const noProductsMessage = document.getElementById('no-products-message');

// Elementos do Chatbox
const chatBubbleBtn = document.getElementById('chat-bubble-btn');
const chatboxContainer = document.getElementById('chatbox-container');
const closeChatboxBtn = document.getElementById('close-chatbox-btn');
const chatboxMessages = document.getElementById('chatbox-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');


// --- Funções do Carrinho ---
function updateCartDisplay() {
  cartItemsList.innerHTML = ''; // Limpa a lista de itens do carrinho
  let total = 0;

  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block'; // Mostra mensagem de carrinho vazio
    checkoutWhatsappBtn.style.display = 'none'; // Esconde botão de checkout
  } else {
    emptyCartMessage.style.display = 'none'; // Esconde mensagem de carrinho vazio
    checkoutWhatsappBtn.style.display = 'flex'; // Mostra botão de checkout (flex para ícone e texto)
    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('cart-item');
      listItem.innerHTML = `
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
        </div>
        <div>
          <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
        </div>
      `;
      cartItemsList.appendChild(listItem);
      total += item.price * item.quantity;
    });
  }

  cartTotalValue.textContent = `R$ ${total.toFixed(2)}`; // Atualiza o valor total
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems; // Atualiza a contagem no cabeçalho
  floatingCartCount.textContent = totalItems; // Atualiza a contagem no botão flutuante
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    showNotification(`${product.name} adicionado ao carrinho!`, 'success');
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
  showNotification('Item removido do carrinho.', 'info');
}

function generateWhatsAppLink() {
  if (cart.length === 0) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Vitor%20Cosméticos.`;
  }

  let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
  message += "Aguardo seu contato para finalizar a compra!";

  // O link gerado abrirá o WhatsApp (aplicativo ou web) com a mensagem pré-preenchida.
  // Não é possível abrir diretamente no Facebook Messenger com este tipo de link.
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// --- Event Listeners do Carrinho ---
productListDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

cartIcon.addEventListener('click', () => {
  cartModal.classList.add('active');
});

floatingCart.addEventListener('click', () => {
  cartModal.classList.add('active');
});

closeCartModalBtn.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.classList.remove('active');
  }
});

cartItemsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item-btn') || event.target.closest('.remove-item-btn')) {
    const productId = parseInt(event.target.dataset.id || event.target.closest('.remove-item-btn').dataset.id);
    removeFromCart(productId);
  }
});

checkoutWhatsappBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Impede o comportamento padrão do link
  const whatsappUrl = generateWhatsAppLink(); // Obtém a URL gerada
  window.open(whatsappUrl, '_blank'); // Abre em uma nova aba
  showNotification('Redirecionando para o WhatsApp...', 'info');
  // Opcional: fechar o modal do carrinho após redirecionar
  // cartModal.classList.remove('active');
});

// --- Funções de Filtro e Busca ---
function displayProducts(filteredProducts) {
  productListDiv.innerHTML = '';
  if (filteredProducts.length === 0) {
    noProductsMessage.style.display = 'block';
  } else {
    noProductsMessage.style.display = 'none';
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.dataset.category = product.category;
      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <span class="category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          <span class="product-price">R$ ${product.price.toFixed(2)}</span>
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
        </div>
      `;
      productListDiv.appendChild(productCard);
    });
  }
}

function filterProducts(category) {
  const filtered = (category === 'todos') ? products : products.filter(p => p.category === category);
  displayProducts(filtered);

  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.value === category) {
      btn.classList.add('active');
    }
  });

  searchInput.value = '';
  searchOverlay.classList.remove('active');
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterProducts(button.dataset.value);
  });
});

function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);

  filterButtons.forEach(btn => btn.classList.remove('active'));
  searchOverlay.classList.remove('active');
}

// --- Event Listeners da Busca ---
searchIcon.addEventListener('click', () => {
  searchOverlay.classList.add('active');
  searchInput.focus();
});

closeSearchBtn.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  searchInput.value = '';
  displayProducts(products);
  filterButtons[0].classList.add('active');
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchProducts();
  }
});

// --- Notificações Flutuantes (Simulação de Vendas) ---
const notificationContainer = document.getElementById('notification-container');
const liveMensagensVariadas = [
  "🥳 Alguém acabou de comprar um Perfume Floral Elegance!",
  "🤩 Máscara Facial Hidratante de Argila acabou de ser vendida!",
  "🚀 Um kit de Pincéis Profissionais saiu agora!",
  "✨ Protetor Solar Facial FPS 50 foi comprado por um cliente!",
  "💖 Base Líquida HD vendida neste instante!",
  "🎉 Sérum Facial com Vitamina C acabou de ser adicionado ao carrinho e comprado!",
  "🛍️ Cliente finalizou a compra de um Kit Batons Líquidos Matte!",
];

function showNotification(message, type = 'default', duration = 3000) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    notification.addEventListener('transitionend', () => {
      notification.remove();
    }, { once: true });
  }, duration);
}

let primeiraInteracaoFeita = false;
function liberarNotificacoes() {
  if (!primeiraInteracaoFeita) {
    primeiraInteracaoFeita = true;
    showNotification("🙋‍♀️ Bem-vindo(a) à nossa loja Vitor Cosméticos!");

    setTimeout(() => {
      iniciarLoopDeLives();
    }, 90000);

    window.removeEventListener('click', liberarNotificacoes);
    window.removeEventListener('scroll', liberarNotificacoes);
    window.removeEventListener('touchstart', liberarNotificacoes);
  }
}

window.addEventListener('click', liberarNotificacoes);
window.addEventListener('scroll', liberarNotificacoes);
window.addEventListener('touchstart', liberarNotificacoes);

function iniciarLoopDeLives() {
  function exibirLive() {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 21 || hora < 1) return;

    const msg = liveMensagensVariadas[Math.floor(Math.random() * liveMensagensVariadas.length)];
    showNotification(msg);
  }

  function loop() {
    const agora = new Date();
    const hora = agora.getHours();
    let intervalo = 90000;

    if (hora >= 1 && hora < 6) {
      intervalo = 600000;
    } else if (hora >= 6 && hora < 9) {
      intervalo = 300000;
    } else if (hora >= 9 && hora < 18) {
      intervalo = 90000;
    } else if (hora >= 18 && hora < 21) {
      intervalo = 45000;
    }

    exibirLive();
    setTimeout(loop, intervalo);
  }

  loop();
}

// --- Funções do Chatbox ---
function addChatMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatboxMessages.appendChild(messageElement);
    // Rola para o final das mensagens
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("olá") || lowerCaseMessage.includes("oi")) {
        return "Olá! Como posso te ajudar hoje? Posso falar sobre produtos, entrega ou pagamentos.";
    } else if (lowerCaseMessage.includes("entrega")) {
        return "Nossas entregas são feitas em até 5 dias úteis após a confirmação do pagamento. Você receberá um código de rastreio por e-mail.";
    } else if (lowerCaseMessage.includes("pagamento") || lowerCaseMessage.includes("formas de pagamento")) {
        return "Aceitamos PIX, cartão de crédito (parcelamento em até 3x sem juros) e boleto bancário.";
    } else if (lowerCaseMessage.includes("produtos") || lowerCaseMessage.includes("catálogo")) {
        return "Você pode navegar por todos os nossos produtos na seção 'Nosso Catálogo Exclusivo' acima. Temos cosméticos, beleza e perfumes!";
    } else if (lowerCaseMessage.includes("contato") || lowerCaseMessage.includes("falar com atendente")) {
        return "Para um atendimento mais personalizado, por favor, entre em contato via WhatsApp: " + WHATSAPP_NUMBER + ".";
    } else if (lowerCaseMessage.includes("obrigado") || lowerCaseMessage.includes("obrigada")) {
        return "De nada! Se precisar de mais alguma coisa, é só perguntar.";
    } else {
        return "Desculpe, não entendi sua pergunta. Poderia reformular ou tentar algo como 'entrega', 'pagamento' ou 'contato'?";
    }
}

// --- Event Listeners do Chatbox ---
chatBubbleBtn.addEventListener('click', () => {
    chatboxContainer.classList.toggle('active'); // Abre/fecha o chatbox
});

closeChatboxBtn.addEventListener('click', () => {
    chatboxContainer.classList.remove('active'); // Fecha o chatbox
});

sendChatBtn.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        addChatMessage(userMessage, 'user');
        chatInput.value = ''; // Limpa o input

        // Simula a resposta do bot após um pequeno atraso
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addChatMessage(botResponse, 'bot');
        }, 500);
    }
});

chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendChatBtn.click(); // Simula o clique no botão de enviar
    }
});


// --- Inicialização da Página ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay(); // Atualiza a exibição do carrinho ao carregar
  displayProducts(products); // Exibe todos os produtos inicialmente

  // Abre o chatbox automaticamente após 3 segundos
  setTimeout(() => {
    chatboxContainer.classList.add('active');
  }, 3000); // 3000 milissegundos = 3 segundos
});
