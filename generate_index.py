import os
import json
import time

# 配置图片文件夹路径
IMAGE_DIR = 'images/gallery'
# 输出的 JSON 文件路径
OUTPUT_FILE = 'photos.json'

def generate_json():
    photos = []
    # 获取目录下所有文件
    files = os.listdir(IMAGE_DIR)
    
    # 按照修改时间排序（可选，这样新照片在前面）
    files.sort(key=lambda x: os.path.getmtime(os.path.join(IMAGE_DIR, x)), reverse=True)
    
    id_counter = 1
    
    for filename in files:
        # 过滤非图片文件
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            continue
            
        # 自动生成数据结构
        photo_data = {
            "id": id_counter,
            "src": f"{IMAGE_DIR}/{filename}",
            # 如果文件名包含特定信息，也可以在这里解析，否则用默认值
            "title": filename.split('.')[0], # 用文件名做默认标题
            "desc": "Waiting for data stream...", # 默认描述
            "category": "life", # 默认分类，你可以后续手动微调json，或者根据文件名规则自动归类
            "hex": hex(id_counter) # 自动生成你的十六进制编号
        }
        photos.append(photo_data)
        id_counter += 1

    # 写入 JSON 文件
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(photos, f, ensure_ascii=False, indent=4)
    
    print(f"[SUCCESS] 已扫描 {len(photos)} 张照片，索引已生成至 {OUTPUT_FILE}")

if __name__ == '__main__':
    generate_json()