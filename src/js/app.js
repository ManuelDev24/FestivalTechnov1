document.addEventListener('DOMContentLoaded', function () {
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
});

function navegacionFija(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    document.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    const CANTIDAD_IMAGENES = 16;

    if (!galeria) {
        console.error('Elemento .galeria-imagenes no encontrado');
        return;
    }
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galeria';

        // Event Handler
        imagen.onclick = function () {
            mostrarImagen(i);
        };
        fragment.appendChild(imagen);
    }
    galeria.appendChild(fragment);
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria';

    // General modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    // Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(cerrarModalBtn);
    modal.appendChild(imagen);

    // Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    if (!modal) return;

    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            let actual = "";
            sections.forEach( section => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.clientHeight
                if(window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                    actual = section.id
                } 
            })

            navLinks.forEach(link => {
                link.classList.remove('active')
                if(link.getAttribute('href') === '#' + actual) {
                    link.classList.add('active')
                }
            })
        });
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}