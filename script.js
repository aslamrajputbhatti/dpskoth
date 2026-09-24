document.addEventListener('DOMContentLoaded', () => {
    // Robust image fallback for external Google/Unsplash assets
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
        img.addEventListener('error', () => {
            if (!img.dataset.loadedFallback && img.dataset.fallback) {
                img.dataset.loadedFallback = 'true';
                img.src = img.dataset.fallback;
            }
        });
    });

    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // Reveal Animations on Scroll
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    window.addEventListener("load", reveal);

    // Admission Form Handling
    const admissionForm = document.getElementById('admission-form');
    const formSuccess = document.getElementById('form-success');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            admissionForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        });
    }

    // FAQ Accordion Logic
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('i');

            if (content) {
                document.querySelectorAll('.faq-content').forEach(item => {
                    if (item !== content) {
                        item.classList.add('hidden');
                        const otherIcon = item.previousElementSibling.querySelector('i');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                content.classList.toggle('hidden');
                if (icon) {
                    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            }
        });
    });

    // Gallery Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentImgIndex = 0;

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImgIndex = index;
            updateLightbox();
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    function updateLightbox() {
        if (lightboxImg && galleryItems[currentImgIndex]) {
            lightboxImg.src = galleryItems[currentImgIndex].src;
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    document.getElementById('prev-lightbox')?.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });

    document.getElementById('next-lightbox')?.addEventListener('click', () => {
        currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    // Gallery Filtering (Simple implementation)
    const filters = document.querySelectorAll('.gallery-filter');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('bg-navy', 'text-white'));
            filters.forEach(f => f.classList.add('bg-white', 'text-navy'));
            filter.classList.remove('bg-white', 'text-navy');
            filter.classList.add('bg-navy', 'text-white');
        });
    });
});
