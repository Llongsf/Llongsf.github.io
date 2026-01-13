// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 导航栏平滑滚动与高亮
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, .hero-section');
    
    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标区域ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                // 更新活动导航链接
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // 平滑滚动到目标区域
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 2. 滚动时自动高亮当前区域
    function highlightNavOnScroll() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // 更新导航栏高亮
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // 如果没找到，默认高亮首页
        if(!currentSection && scrollPosition < sections[1].offsetTop) {
            navLinks[0].classList.add('active');
        }
    }
    
    // 监听滚动事件
    // 方法一
    // window.addEventListener('scroll', highlightNavOnScroll);

    // 简单优化：每 100ms 只执行一次
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(highlightNavOnScroll);
    });
    
    // 3. 为项目卡片和照片项添加悬停效果
    // const projectCards = document.querySelectorAll('.project-card');
    // const photoItems = document.querySelectorAll('.photo-item');
    
    
    // projectCards.forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-5px)';
    //     });
        
    //     card.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0)';
    //     });
    // });
    
    // 4. 动态生成十六进制编号（为照片）
    const hexCodes = document.querySelectorAll('.hex-code');
    let hexCounter = 1;
    
    hexCodes.forEach(code => {
        // 生成两位十六进制数
        const hexValue = hexCounter.toString(16).toUpperCase().padStart(2, '0');
        code.textContent = `0x${hexValue}`;
        hexCounter++;
    });
    
    // 5. 设置页面"编译时间"
    const compileTimeElement = document.getElementById('compile-time');
    if(compileTimeElement) {
        const now = new Date();
        const formattedTime = now.toISOString().replace('T', ' ').substring(0, 16);
        compileTimeElement.textContent = formattedTime + ' UTC';
    }
    
    // 6. 控制台欢迎信息（汇编风格）
    console.log('%c[SYSTEM]%c 个人主页已加载完毕。', 
        'color: #6A7062; font-weight: bold;', 
        'color: #1A1A1A;');
    console.log('%c> CALL USER_INTERFACE_SUCCESS', 'color: #6A7062; font-family: monospace;');
    
    // 初始高亮
    highlightNavOnScroll();
});