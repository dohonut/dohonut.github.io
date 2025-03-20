// 모바일 메뉴 기능
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.querySelector('.close-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// 컨택트 폼 제출
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        // 여기에 실제 API 엔드포인트를 추가해야 합니다
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('문의가 성공적으로 전송되었습니다.');
            e.target.reset();
        } else {
            throw new Error('전송에 실패했습니다.');
        }
    } catch (error) {
        alert('문의 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
}); 