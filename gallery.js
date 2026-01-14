// gallery.js - 独立照片墙页面交互
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 照片数据
    // 请将以下数组内容替换为你自己的照片信息
    const photos = [
        {
            id: 1,
            src: 'images/gallery/photo01.jpg',
            title: '山间黎明',
            desc: '拍摄于2023年夏季，黄山之巅',
            category: 'landscape',
            hex: '0x01'
        },
        {
            id: 2,
            src: 'images/gallery/photo02.jpg',
            title: '都市脉络',
            desc: '城市夜景，长时间曝光',
            category: 'city',
            hex: '0x02'
        },
        {
            id: 3,
            src: 'images/gallery/photo03.jpg',
            title: '露珠世界',
            desc: '微距镜头下的清晨',
            category: 'life',
            hex: '0x03'
        },
        // 你可以继续添加更多照片，格式如下：
        // {
        //     id: 4,
        //     src: 'images/gallery/photo04.jpg',
        //     title: '你的标题',
        //     desc: '你的描述',
        //     category: 'landscape', // 类别：landscape/city/life
        //     hex: '0x04'
        // },
    ];

    const photoWall = document.getElementById('photoWall');
    
    // 动态获取照片数据
    fetch('photos.json')
        .then(response => response.json())
        .then(data => {
            // 拿到数据后，调用渲染函数
            // 注意：这里 data 就是你的 photos 数组
            renderPhotos(data, 'all'); 
            
            // 初始化其他逻辑（比如更新计数器）
            document.getElementById('photoCount').textContent = data.length;
        })
        .catch(error => console.error('Error loading gallery index:', error));

    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoCountElement = document.getElementById('photoCount');
    
    // 2. 初始化：渲染所有照片并更新计数
    function renderPhotos(photos, filter) {
        photoWall.innerHTML = '';
        let filteredPhotos = photos;
        
        if (filter !== 'all') {
            filteredPhotos = photos.filter(photo => photo.category === filter);
        }
        
        // 更新照片计数
        photoCountElement.textContent = filteredPhotos.length;
        
        // 生成照片HTML
        filteredPhotos.forEach(photo => {
            const photoElement = document.createElement('div');
            photoElement.className = 'wall-photo';
            photoElement.setAttribute('data-category', photo.category);
            photoElement.setAttribute('data-id', photo.id);
            
            photoElement.innerHTML = `
                <img src="${photo.src}" alt="${photo.title}" loading="lazy">
                <div class="wall-photo-info">
                    <h4>MOV [${photo.hex}], ${photo.title}</h4>
                    <p>${photo.desc}</p>
                    <div class="wall-hex">${photo.hex}</div>
                </div>
            `;
            
            photoWall.appendChild(photoElement);
        });
        
        // 如果无照片，显示提示
        if (filteredPhotos.length === 0) {
            photoWall.innerHTML = `
                <div class="no-photos" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-accent);">
                    <p>; 该分类下暂无照片。</p>
                    <p>; 请尝试其他分类或 <a href="javascript:location.reload()" style="color: var(--color-text);">显示全部</a>。</p>
                </div>
            `;
        }
    }
    
    // 3. 照片筛选功能
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 获取筛选类别并重新渲染
            const filter = this.getAttribute('data-filter');
            renderPhotos(filter);
        });
    });
    
    // 4. 图片点击放大查看（简单实现）
    photoWall.addEventListener('click', function(e) {
        const photoImg = e.target.closest('.wall-photo img');
        if (photoImg) {
            // 这里可以实现模态框放大显示
            // 简单实现：在新标签页打开大图
            window.open(photoImg.src, '_blank');
        }
    });
    
    // 5. 控制台信息
    console.log(`%c[GALLERY]%c 已加载 ${photos.length} 张照片数据。`, 
        'color: #6A7062; font-weight: bold;', 
        'color: #1A1A1A;');
    
    // 初始渲染
    renderPhotos();
});