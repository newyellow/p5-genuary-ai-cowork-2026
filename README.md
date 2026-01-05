# Genuary 2026 - Creative Coding Challenge

這是一個參與 [Genuary 2026](https://genuary.art/) 的創作專案。Genuary 是一個為期一個月的生成藝術挑戰，每天有一個創作題目。

## 專案結構

```
.
├── lib/                    # 共用的 JavaScript 函式庫
│   ├── p5.js              # p5.js 主要函式庫
│   ├── p5.min.js          # p5.js 壓縮版
│   └── p5.flex.js         # p5.flex 擴充
├── days/                   # 每日創作作品
│   ├── day01/             # 第一天的作品
│   ├── day02/             # 第二天的作品
│   └── ...                # 其他日期
├── prompts.md             # Genuary 2026 所有題目列表
├── core-idea.md           # 專案核心創作理念
└── index.html             # 作品集首頁
```

## 每日作品結構

每個日期的資料夾包含：
- `index.html` - 作品的 HTML 頁面
- `sketch.js` - 主要的 p5.js 程式碼
- 其他輔助檔案（如 `helpers.js`, `colors.js`, `objects.js` 等）

## 如何瀏覽

1. 訪問主頁面: `index.html`
2. 或直接瀏覽個別日期: `days/day01/index.html`

## 使用技術

- [p5.js](https://p5js.org/) - JavaScript 創意編程函式庫
- p5.flex.js - p5.js 的擴充功能

## GitHub Pages

本專案已設定 GitHub Pages，可以直接在網頁上瀏覽所有作品。

---

**Genuary 2026** - 31 天，31 個創意編程挑戰
