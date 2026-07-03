let modalActivo = null;

function configurarNavegacion() {
    document.querySelectorAll('[data-nav-shell]').forEach((navShell) => {
        const toggleButton = navShell.querySelector('.nav-toggle');
        const menu = navShell.querySelector('.nav-menu');

        if (!toggleButton || !menu) return;

        const iconoAbrir = '<i class="fa-solid fa-bars"></i>';
        const iconoCerrar = '<i class="fa-solid fa-xmark"></i>';

        const cerrarMenu = () => {
            menu.classList.add('pointer-events-none', 'opacity-0', 'max-h-0');
            menu.classList.remove('pointer-events-auto', 'opacity-100', 'max-h-96');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.innerHTML = iconoAbrir;
        };

        const abrirMenu = () => {
            menu.classList.remove('pointer-events-none', 'opacity-0', 'max-h-0');
            menu.classList.add('pointer-events-auto', 'opacity-100', 'max-h-96');
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.innerHTML = iconoCerrar;
        };

        cerrarMenu();

        toggleButton.addEventListener('click', () => {
            if (toggleButton.getAttribute('aria-expanded') === 'true') {
                cerrarMenu();
                return;
            }

            abrirMenu();
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', cerrarMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                menu.classList.remove('pointer-events-none', 'opacity-0', 'max-h-0', 'max-h-96');
                menu.classList.add('pointer-events-auto', 'opacity-100');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.innerHTML = iconoAbrir;
            } else if (toggleButton.getAttribute('aria-expanded') !== 'true') {
                cerrarMenu();
            }
        });
    });
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    if (modalActivo && modalActivo !== modal) {
        cerrarModal(modalActivo.id);
    }

    modal.classList.remove('opacity-0', 'pointer-events-none', 'bg-black/0', 'backdrop-blur-none');
    modal.classList.add('opacity-100', 'pointer-events-auto', 'bg-black/50', 'backdrop-blur-sm');

    const contenido = modal.querySelector('.modal-content');
    if (contenido) {
        contenido.classList.remove('scale-95');
        contenido.classList.add('scale-100');
    }

    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    modalActivo = modal;
}

function cerrarModal(id) {
    const modal = typeof id === 'string' ? document.getElementById(id) : id;
    if (!modal) return;

    modal.classList.add('opacity-0', 'pointer-events-none', 'bg-black/0', 'backdrop-blur-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto', 'bg-black/50', 'backdrop-blur-sm');

    const contenido = modal.querySelector('.modal-content');
    if (contenido) {
        contenido.classList.add('scale-95');
        contenido.classList.remove('scale-100');
    }

    modal.setAttribute('aria-hidden', 'true');

    if (modalActivo === modal) {
        modalActivo = null;
    }

    if (!document.querySelector('.modal-overlay.opacity-100')) {
        document.body.classList.remove('overflow-hidden');
    }
}

document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            cerrarModal(modal.id);
        }
    });
});

document.querySelectorAll('.modal-close').forEach((boton) => {
    boton.addEventListener('click', (event) => {
        event.stopPropagation();
        const modal = boton.closest('.modal-overlay');
        if (modal) {
            cerrarModal(modal.id);
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalActivo) {
        cerrarModal(modalActivo.id);
    }
});

function inicializarInterfaz() {
    configurarNavegacion();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarInterfaz);
} else {
    inicializarInterfaz();
}