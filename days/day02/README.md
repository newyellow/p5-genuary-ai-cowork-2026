# Day 02 - Twelve Principles of Animation

**Prompt:** Twelve principles of animation

**Concept:** Learning & Mastery — 每個人演示一個動畫原則，象徵學習的旅程

## 核心概念

### 學習的系統
12 個人形，每個專精一個動畫原則，共同組成完整的動畫知識體系。這呼應了 coding challenge 的本質：**透過持續練習和學習，逐步掌握技藝**。

### 12 個動畫原則

1. **Squash & Stretch** （壓縮與伸展）— 身體高度和寬度的變化
2. **Anticipation** （預備動作）— 動作前的蓄力
3. **Staging** （演出布局）— 清晰的輪廓姿態
4. **Straight Ahead** （連續運動）— 流暢的行走動畫
5. **Follow Through** （跟隨動作）— 手臂在落地後的延續擺動
6. **Slow In/Out** （緩入緩出）— 使用 easing 函數的平滑運動
7. **Arc** （弧線運動）— 沿著弧形路徑移動
8. **Secondary Action** （次要動作）— 邊走邊揮手
9. **Timing** （時間控制）— 快慢節奏的對比
10. **Exaggeration** （誇張）— 誇大的擺動和旋轉
11. **Solid Drawing** （立體感）— 3D 旋轉展現立體感
12. **Appeal** （吸引力）— 優雅、討喜的姿態

### Meta 敘事：掌握技藝的旅程

**系統化學習**
- 12 個原則形成完整的知識體系
- 每個人專精一項技能，共同構成整體
- 格子狀布局象徵系統化的學習過程

**自我提升的隱喻**
- Genuary challenge 本身就是一個學習過程
- 每天掌握一個新概念，31 天後掌握整體
- 從生疏到熟練，從模仿到創造

**個體與集體知識**
- 每個人代表一個知識點
- 個體的專精貢獻於集體的完整
- 學習是個人的，但知識是共享的

## 技術實作

### 動畫原則的具體實現

使用 `Human` class 的關節系統和動畫方法：
- `scale`、`bodyHeight`、`bodyWidth` 控制 Squash & Stretch
- `bodyRotation` 控制預備動作和姿態
- `walk()` 方法實現行走循環
- `swayArms()` 實現手臂擺動
- `bounce()` 實現上下浮動
- easing 函數實現緩入緩出

### 視覺設計
- 4x3 網格布局，清晰展示所有原則
- 每個人用不同色相（hue），從 0° 到 300°
- 深色背景 + 淡網格線
- 底部標註原則名稱

### 系統與湧現
- 12 個獨立的動畫循環
- 每個人有自己的相位（phase）避免同步
- 整體呈現出豐富的動態變化

## 互動

- **按 'S' 鍵**：儲存當前畫面為 PNG

## 反思

這件作品探討：
- **學習的結構化**：將複雜技能分解為基本原則
- **專精與通才**：每個人精通一項 vs. 整體掌握全部
- **持續練習**：動畫的循環象徵持續的學習過程
- **知識的可視化**：抽象的動畫原則具象化為人的動作

動畫原則不只是技術，更是理解運動、時間、生命的方式。通過學習這些原則，我們學習如何賦予靜態的程式碼以生命和詩意。

> "Mastery is not a destination, but a continuous journey of practice and refinement."

---

*Genuary 2026 - Day 02*
*Core Concept: Learning systems & the journey of mastery*
*Personal Theme: Self-improvement through systematic practice*
