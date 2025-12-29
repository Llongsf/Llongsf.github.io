// 等待页面完全加载后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 导航菜单切换功能
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标区域的ID
            const targetId = this.getAttribute('data-target');
            
            // 更新活动导航链接
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的内容区域
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // 在移动端点击后关闭菜单
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // 滚动到页面顶部（针对移动设备）
            window.scrollTo(0, 0);
        });
    });
    
    // 移动端汉堡菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击页面其他地方关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // 照片区域的悬停效果增强
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 简单控制台欢迎信息
    console.log('欢迎来到我的个人主页！代码已加载完成。');
    
    // 页面加载时的简单动画效果
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    });
});