/*
 * main.js
 * Scripts JavaScript para interatividade do site Contacta Pisos e Reformas
 *
 * Conteúdo:
 * 1. Menu Responsivo (Navbar com botão hambúrguer)
 * 2. Carrossel de Imagens (Seção Hero)
 * 3. Scroll Suave para links de âncora
 * 4. Adicionar classe 'active' ao link da navbar da página atual
 * 5. Efeito de fade-in ao rolar (animação de entrada de elementos)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Responsivo (Navbar)
    const menuToggle = document.querySelector('.menu-toggle'); // Botão do menu hambúrguer
    const navList = document.querySelector('.nav-list');     // Lista de links do menu

    if (menuToggle && navList) { // Verifica se os elementos existem
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active'); // Alterna a classe 'active' para mostrar/esconder o menu
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars'); // Troca o ícone de barras para 'X'
            icon.classList.toggle('fa-times'); // e vice-versa
        });

        // Fechar menu ao clicar em um item (apenas em mobile)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Se o menu estiver ativo (visível)
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active'); // Esconde o menu
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars'); // Volta o ícone para barras
                }
            });
        });
    }

    // 2. Carrossel de Imagens (Seção Hero)
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0; // Índice do slide atual
    let autoSlideInterval; // Variável para o intervalo do slide automático

    // Cria os pontos de navegação do carrossel
    function createDots() {
        carouselDotsContainer.innerHTML = ''; // Limpa os pontos existentes
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active'); // O primeiro ponto é ativo por padrão
            dot.addEventListener('click', () => {
                goToSlide(index); // Vai para o slide clicado
                resetAutoSlide(); // Reseta o slide automático
            });
            carouselDotsContainer.appendChild(dot);
        });
    }

    // Atualiza o estado dos pontos de navegação
    function updateDots() {
        document.querySelectorAll('.carousel-dots .dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Navega para um slide específico
    function goToSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active'); // Remove a classe 'active' de todos
            if (i === index) {
                item.classList.add('active'); // Adiciona 'active' ao slide desejado
            }
        });
        currentIndex = index; // Atualiza o índice atual
        updateDots(); // Atualiza os pontos
    }

    // Mostra o próximo slide
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length; // Avança para o próximo (volta ao início se for o último)
        goToSlide(currentIndex);
    }

    // Mostra o slide anterior
    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; // Volta para o anterior (vai para o final se for o primeiro)
        goToSlide(currentIndex);
    }

    // Inicia o slide automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(showNextSlide, 7000); // Mudar a cada 7 segundos
    }

    // Reseta o temporizador do slide automático (útil após interação manual)
    function resetAutoSlide() {
        clearInterval(autoSlideInterval); // Limpa o intervalo atual
        startAutoSlide(); // Inicia um novo intervalo
    }

    // Inicialização do Carrossel (somente se houver itens)
    if (carouselItems.length > 0) {
        createDots();
        goToSlide(0); // Garante que o primeiro item esteja ativo ao carregar
        startAutoSlide(); // Inicia o slide automático

        // Event listeners para os botões de navegação
        prevButton.addEventListener('click', () => {
            showPrevSlide();
            resetAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            showNextSlide();
            resetAutoSlide();
        });

        // Pausar carrossel ao passar o mouse e reiniciar ao tirar
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // 3. Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link

            // Rola para a seção alvo de forma suave
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Adicionar classe 'active' ao link da navbar da página atual
    // Obtém o nome do arquivo da página atual (ex: "index.html", "sobre.html")
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        // Se o link da navegação corresponde à página atual
        // Ou se a página atual for vazia (root) e o link for para index.html
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active'); // Adiciona a classe 'active' para estilização
        } else {
            link.classList.remove('active'); // Remove de outros links para garantir que apenas um esteja ativo
        }
    });

    // 5. Efeito de fade-in ao rolar (animação de entrada de elementos)
    // Seleciona os elementos que terão a animação
    const fadeInElements = document.querySelectorAll('.welcome-section, .services-overview, .call-to-action, .service-item');

    const observerOptions = {
        root: null, // O viewport é o elemento raiz para observação
        rootMargin: '0px',
        threshold: 0.1 // O elemento estará 10% visível para disparar a animação
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Se o elemento estiver visível na viewport
                entry.target.style.opacity = '1';       // Torna-o opaco (visível)
                entry.target.style.transform = 'translateY(0)'; // Move para a posição original
                observer.unobserve(entry.target); // Deixa de observar depois de animar (para não animar novamente)
            }
        });
    }, observerOptions);

    // Aplica estilos iniciais e observa cada elemento
    fadeInElements.forEach(element => {
        element.style.opacity = '0';       // Inicia invisível
        element.style.transform = 'translateY(20px)'; // Inicia um pouco abaixo
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Transição suave
        observer.observe(element); // Começa a observar
    });
});