# Day 01 - One color, one shape

**Prompt:** One color, one shape

**Concept Twist:** "One color **PER** one shape" — 每個形狀類型對應一個特定顏色

## 核心概念

### 社會分類系統
這個作品扭曲了原始題目的意義：不是「只用一種顏色和一種形狀」，而是**「每個形狀類型擁有專屬的顏色」**。

120 個人形散布在畫面上，每個人的頭部形狀決定了他們的顏色系統：
- **圓形（40%）** → 藍色 — 多數派，「正常人」
- **方形（25%）** → 橙色 — 建設者
- **三角形（17%）** → 紅色 — 反叛者
- **六角形（10%）** → 青色 — 分析者
- **五角形（5%）** → 紫色 — 稀有種
- **星形（3%）** → 黃色 — 夢想家

### Meta 敘事：齒輪中的人

**系統與個體**
- 你的「形狀」（身份）決定了你的「顏色」（社會標籤）
- 大量個體形成可見的分類系統
- 每個人都在緩慢向上移動——努力的象徵
- 到達頂端後重新出現在底部——西西弗斯式的徒勞

**湧現與隨機性**
- 120 個人形，每個都有微小的差異（位置、姿勢、尺寸）
- 使用 noise 產生有機的分布和群聚
- 加權隨機分配形狀類型，模擬真實社會的多樣性分布
- 個體的微小差異湧現出整體的視覺圖案

**技術與哲學的對話**
- Code as system: 程式定義了分類規則
- Human in the gears: 個體被系統分類，卻仍保持獨特性
- Constraint as creativity: 「一色一形」的限制被重新詮釋為社會隱喻

## 互動

- **點擊滑鼠**：在滑鼠位置新增一個隨機類型的人
- **按 'R' 鍵**：重新生成整個系統
- **按 'S' 鍵**：儲存當前畫面為 PNG

## 技術細節

### Human Class
開發了可重用的 `Human` class（位於 `lib/human.js`）：
- 支持 6 種頭部形狀（circle, square, triangle, pentagon, hexagon, star）
- 可設定各關節旋轉角度（頭、身體、左右手臂、左右腿）
- 內建動畫方法（bounce, swayArms, walk）
- 完整參數化（尺寸、顏色、姿勢等）

### Generative System
- 使用 HSB 色彩模式
- 加權隨機分配形狀類型
- Perlin noise 產生有機位置分布
- 同一形狀的色相固定，但亮度和飽和度有變化
- 持續向上移動 + 呼吸動畫 + 手臂擺動

### Visual Language
- 深色背景（nearly black）
- 克制的色彩（6 種 hue，每種有亮度變化）
- 簡潔的人形設計
- 軌跡效果增加時間感

---

## 反思

這件作品探討：
- **身份政治**：你的「類型」如何被系統定義？
- **分類的暴力**：社會如何將人簡化為類別？
- **集體與個體**：在系統中保持獨特性的可能
- **努力與徒勞**：向上攀爬，卻永遠回到原點

"We are all gears in the machine, yet we dance."

---

*Genuary 2026 - Day 01*
*Core Concept: Life Within Constraints — When Rules Meet Poetry*
*Personal Theme: The Human in the Gears*
