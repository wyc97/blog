const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 检查参数
const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('❌ 请提供源目录路径。');
  console.log('用法: node scripts/import-md.js "<你的markdown文件目录>"');
  process.exit(1);
}

const targetPostsDir = path.join(process.cwd(), 'src/content/posts');
const targetImagesBaseDir = path.join(process.cwd(), 'public/images/posts');

// 确保目标目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}


ensureDir(targetPostsDir);
ensureDir(targetImagesBaseDir);

function processFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 递归处理子目录，但图片查找逻辑主要基于当前 MD 文件所在的上下文
      processFiles(fullPath);
      return;
    }

    if (!file.endsWith('.md') && !file.endsWith('.mdx')) {
      return;
    }

    console.log(`\n📄 处理文件: ${file}`);

    // 读取文件内容
    let content;
    try {
      content = fs.readFileSync(fullPath, 'utf8');
    } catch (e) {
      console.error(`❌ 无法读取文件: ${fullPath}`);
      return;
    }

    // 解析 Frontmatter
    let parsed;
    try {
      parsed = matter(content);
    } catch (e) {
      console.warn(`⚠️ 无法解析 Frontmatter: ${file}, 将作为纯文本处理`);
      parsed = { data: {}, content: content };
    }

    let { data, content: markdownBody } = parsed;

    // 生成 Slug
    const slug = path.basename(file, path.extname(file))
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // ---------------------------------------------------------
    // 图片处理逻辑
    // ---------------------------------------------------------
    const postImageDir = path.join(targetImagesBaseDir, slug);
    let hasImages = false;

    // 1. 处理 Obsidian wiki-link 格式: ![[image.png]]
    markdownBody = markdownBody.replace(/!\[\[(.*?)\]\]/g, (match, imageName) => {
      return processImage(imageName, dir, postImageDir, slug, match);
    });

    // 2. 处理标准 Markdown 格式: ![alt](image.png)
    markdownBody = markdownBody.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, imagePath) => {
      // 忽略网络图片
      if (imagePath.startsWith('http')) return match;
      return processImage(imagePath, dir, postImageDir, slug, match, alt);
    });

    function processImage(imagePath, sourceDir, targetImageDir, slug, originalMatch, alt = '') {
      const imageName = path.basename(imagePath);
      // 尝试在当前目录查找图片
      const sourceImagePath = path.join(sourceDir, imageName);

      // 如果文件存在，则复制
      if (fs.existsSync(sourceImagePath)) {
        if (!hasImages) {
          ensureDir(targetImageDir);
          hasImages = true;
        }
        // Sanitize filename: replace spaces with dashes
        const safeImageName = imageName.replace(/\s+/g, '-');
        const targetImagePath = path.join(targetImageDir, safeImageName);

        fs.copyFileSync(sourceImagePath, targetImagePath);
        console.log(`  🖼️  复制图片: ${safeImageName}`);

        // 返回新的 Markdown 图片语法
        return `![${alt}](/images/posts/${slug}/${safeImageName})`;
      } else {
        // 尝试在 assets 子目录查找 (常见 Obsidian 设置)
        const assetsPath = path.join(sourceDir, 'assets', imageName);
        if (fs.existsSync(assetsPath)) {
          if (!hasImages) {
            ensureDir(targetImageDir);
            hasImages = true;
          }
          // Sanitize filename
          const safeImageName = imageName.replace(/\s+/g, '-');
          const targetImagePath = path.join(targetImageDir, safeImageName);

          fs.copyFileSync(assetsPath, targetImagePath);
          console.log(`  🖼️  复制图片 (from assets): ${safeImageName}`);
          return `![${alt}](/images/posts/${slug}/${safeImageName})`;
        }

        console.warn(`  ⚠️  图片未找到: ${imageName}`);
        return originalMatch; // 保持原样
      }
    }
    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // 自定义替换：防止 MDX 解析错误
    // ---------------------------------------------------------
    markdownBody = markdownBody.replace(/<\/>/g, '`</>`');

    const newFrontmatter = {
      title: data.title || path.basename(file, path.extname(file)),
      date: data.date ? new Date(data.date).toISOString() : stat.birthtime.toISOString(),
      excerpt: data.excerpt || (markdownBody ? markdownBody.slice(0, 100).replace(/\n/g, ' ') + '...' : ''),
      tags: data.tags || ['Imported'],
      category: data.category || 'Notes',
      ...data
    };

    const newContent = matter.stringify(markdownBody || '', newFrontmatter);

    // 写入目标文件
    const targetFile = path.join(targetPostsDir, `${slug}.mdx`);
    fs.writeFileSync(targetFile, newContent);
    console.log(`✅ 已导入: ${slug}.mdx`);
  });
}

console.log(`🚀 开始从 ${sourceDir} 导入文章 (含图片)...`);
try {
  processFiles(sourceDir);
  console.log(`🎉 导入完成！`);
} catch (error) {
  console.error(`❌ 导入出错: ${error.message}`);
}
