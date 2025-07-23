document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const adminDashboard = document.getElementById('admin-dashboard');
    const adminTitle = document.getElementById('admin-title');
    const logoutBtn = document.getElementById('logout-btn');

    // Elementos do Dashboard
    const totalSalesSpan = document.getElementById('total-sales');
    const latestOrdersList = document.getElementById('latest-orders');
    const stockList = document.getElementById('stock-list');
    const refreshStockBtn = document.getElementById('refresh-stock-btn');
    const addProductForm = document.getElementById('add-product-form');
    const newProductNameInput = document.getElementById('new-product-name');
    const newProductPriceInput = document.getElementById('new-product-price');
    const newProductCategoryInput = document.getElementById('new-product-category');
    const newProductStockInput = document.getElementById('new-product-stock');
    const addProductMessage = document.getElementById('add-product-message');

    // Verifica o status de login (em um ambiente real, isso viria de um cookie/localStorage seguro)
    // Para este exemplo, vamos simular:
    let isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

    function showAdminDashboard() {
        loginForm.style.display = 'none';
        adminTitle.textContent = 'Painel Administrativo';
        adminDashboard.style.display = 'block';
        fetchDashboardData(); // Carrega os dados do dashboard
    }

    function showLoginForm() {
        loginForm.style.display = 'flex'; // Usando flex para o form
        adminTitle.textContent = 'Login Administrativo';
        adminDashboard.style.display = 'none';
        localStorage.removeItem('adminLoggedIn');
    }

    // Lógica de Login (Front-end)
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        // **IMPORTANTE**: Em um site real, esta requisição seria para um BACK-END
        // que verificaria o usuário e a senha no banco de dados.
        // Aqui, é apenas uma simulação no front-end.
        if (username === 'admin' && password === 'admin123') { // Credenciais de exemplo
            loginError.textContent = '';
            localStorage.setItem('adminLoggedIn', 'true');
            isLoggedIn = true;
            showAdminDashboard();
        } else {
            loginError.textContent = 'Usuário ou senha inválidos.';
        }
    });

    // Lógica de Logout
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        showLoginForm();
    });

    // Função para carregar dados do dashboard (simulado)
    async function fetchDashboardData() {
        // **IMPORTANTE**: Em um site real, estas requisições seriam para um BACK-END
        // que buscaria dados reais do banco de dados (vendas, estoque, etc.).

        // Simulação de Vendas
        totalSalesSpan.textContent = `R$ ${ (Math.random() * 5000 + 1000).toFixed(2) }`; // Valor aleatório
        latestOrdersList.innerHTML = `
            <li>Pedido #12345 - Produto A (R$ 150,00) - 22/07/2025</li>
            <li>Pedido #12344 - Produto B (R$ 75,50) - 22/07/2025</li>
            <li>Pedido #12343 - Produto C (R$ 230,00) - 21/07/2025</li>
        `;

        // Simulação de Estoque
        stockList.innerHTML = `
            <li>Base Líquida HD: <span>${Math.floor(Math.random() * 100)} em estoque</span></li>
            <li>Máscara Facial Hidratante: <span>${Math.floor(Math.random() * 50)} em estoque</span></li>
            <li>Perfume Floral Elegance: <span>${Math.floor(Math.random() * 30)} em estoque</span></li>
            <li>Kit Pincéis Profissionais: <span>${Math.floor(Math.random() * 20)} em estoque</span></li>
        `;
    }

    refreshStockBtn.addEventListener('click', fetchDashboardData); // Recarregar dados ao clicar

    // Adicionar Novo Produto (Front-end - envia para o back-end)
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newProduct = {
            name: newProductNameInput.value,
            price: parseFloat(newProductPriceInput.value),
            category: newProductCategoryInput.value,
            stock: parseInt(newProductStockInput.value)
        };

        addProductMessage.textContent = 'Adicionando produto...';
        addProductMessage.style.color = '#FFA500'; // Laranja

        // **IMPORTANTE**: Esta requisição seria para um BACK-END que adicionaria o produto ao banco de dados.
        // A simulação abaixo é apenas para fins de demonstração no front-end.
        try {
            // Simular uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5 segundos

            // Em um sistema real, você enviaria com fetch()
            /*
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) throw new Error('Falha ao adicionar produto');
            const result = await response.json();
            */

            addProductMessage.textContent = `Produto "${newProduct.name}" adicionado com sucesso!`;
            addProductMessage.style.color = '#28a745'; // Verde
            addProductForm.reset(); // Limpa o formulário
            fetchDashboardData(); // Atualiza o dashboard

        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            addProductMessage.textContent = 'Erro ao adicionar produto.';
            addProductMessage.style.color = '#ff0000'; // Vermelho
        }
    });


    // Inicialização: exibe o dashboard se já estiver logado, caso contrário, o formulário de login
    if (isLoggedIn) {
        showAdminDashboard();
    } else {
        showLoginForm();
    }
});