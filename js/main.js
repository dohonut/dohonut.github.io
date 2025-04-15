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

// 성능 최적화를 위한 디바운스 함수 추가
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
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
const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    
    // 모든 에러 클래스 초기화
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // 이름 길이 검사
    const nameInput = form.querySelector('input[name="name"]');
    if (nameInput.value.length < 2) {
        nameInput.classList.add('error');
        alert('이름을 2자 이상 입력해주세요.');
        nameInput.focus();
        return false;
    }
    
    // 이메일 유효성 검사
    const emailInput = form.querySelector('input[name="email"]');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('error');
        alert('올바른 이메일 주소를 입력해주세요.');
        emailInput.focus();
        return false;
    }
    
    // 전화번호 유효성 검사
    const phoneInput = form.querySelector('input[name="phone"]');
    const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add('error');
        alert('올바른 전화번호 형식으로 입력해주세요.\n예: 010-1234-5678');
        phoneInput.focus();
        return false;
    }
    
    // 메시지 길이 검사
    const messageInput = form.querySelector('textarea[name="message"]');
    if (messageInput.value.length < 10) {
        messageInput.classList.add('error');
        alert('문의 내용을 10자 이상 입력해주세요.');
        messageInput.focus();
        return false;
    }
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = '전송 중...';
        
        const formData = new FormData(form);
        await fetch('https://script.google.com/macros/s/AKfycbyBsNUQI1L4K2WjDusozs4Yd_V8EdGN_8LNSHsUXO8W8hL1fcxZxqMP-XXRmNlYdEiS5Q/exec', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        
        alert('문의가 성공적으로 전송되었습니다.');
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = '문의하기';
    }
    
    return false;
};

// 전화번호 자동 하이픈 추가
document.querySelector('input[name="phone"]').addEventListener('input', 
    debounce(function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 3 && value.length <= 7) {
            value = value.slice(0,3) + "-" + value.slice(3);
        } else if (value.length > 7) {
            value = value.slice(0,3) + "-" + value.slice(3,7) + "-" + value.slice(7);
        }
        e.target.value = value;
    }, 100)
);

// 페이지 로드 성능 최적화
document.addEventListener('DOMContentLoaded', () => {
    // 이미지 지연 로딩
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 로고 클릭 이벤트 리스너 추가
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', (event) => {
            event.preventDefault(); // 기본 링크 동작 방지
            scrollToTopAndReload();
        });
    }
});

// 로고 클릭 시 최상단으로 스크롤 후 새로고침
function scrollToTopAndReload() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        window.location.reload(true);
    }, 500); // 스크롤 애니메이션이 완료된 후 새로고침
} 