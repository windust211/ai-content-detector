# Copilot 开发规范

## 自动识别规则

Copilot 会根据以下规则自动判断当前代码环境，并优先应用对应部分的规范：

| 文件路径/模式 | 应用规范 |
|--------------|---------|
| `src/frontend/**/*`、`*.tsx`、`*.jsx`、`*.css`、`*.scss` | **前端规范** |
| `src/backend/**/*`、`*.py`、`requirements.txt`、`Dockerfile` | **后端规范** |
| `src/shared/**/*`、`*.d.ts` | **共享规范**（前后端通用部分） |

> **重要**：当你在非标准路径下编写代码时，请在对话中主动说明是"前端"还是"后端"，Copilot 将按对应规范生成代码。

---

# 第一部分：前端规范

## 项目概述

- **技术栈**：React 18 + TypeScript 5 + Vite 5 + TailwindCSS 3
- **状态管理**：Zustand（全局）/ React Context（主题/用户）
- **HTTP 客户端**：Axios（封装拦截器）

### 目录结构

```
src/frontend/
├── pages/          # 页面组件
├── components/     # 可复用 UI 组件
│   ├── ui/         # 基础 UI 组件（Button、Input、Card）
│   └── business/   # 业务组件
├── hooks/          # 自定义 Hooks
├── services/       # API 调用封装
├── stores/         # Zustand 状态
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
└── styles/         # 全局样式（TailwindCSS）
```

## 代码风格

- **TypeScript**：严格模式 (`strict: true`)，禁止使用 `any`，优先使用 `interface` 定义对象类型。
- **格式化**：ESLint + Prettier，缩进 **2 空格**，行宽 **100 字符**。
- **命名规范**：
  - 组件文件：`PascalCase.tsx`
  - Hook 文件：`camelCase.ts`，以 `use` 开头
  - 工具函数文件：`camelCase.ts`
  - 常量文件：`UPPER_SNAKE_CASE.ts`
- **组件结构顺序**（必须遵守）：
  1. 导入语句（第三方库 → 本地组件 → 本地工具 → 样式）
  2. Props 类型定义 (`interface ComponentNameProps`)
  3. 组件函数声明
  4. Hooks（useState、useEffect、自定义 Hooks）
  5. 事件处理函数（以 `handle` 开头）
  6. 渲染辅助函数（如有）
  7. JSX 返回值

## 组件规范

- **Props 命名**：布尔值用 `is/has` 前缀，回调用 `on` 前缀。
- **状态管理**：组件内部状态用 `useState`，跨组件共享用 **Zustand**。
- **性能优化**：
  - 列表渲染必须使用唯一 `key`（禁止使用索引）。
  - 大组件使用 `React.memo()`。
  - 复杂计算用 `useMemo`，回调函数用 `useCallback`。

## API 调用规范

- 所有 API 请求统一封装在 `src/frontend/services/` 下，使用 Axios 实例。
- 请求状态必须包含 `loading`、`error`、`data` 三种状态。
- 错误处理：网络错误和业务错误需分别处理，提示信息对用户友好。

## 样式规范

- **优先使用 TailwindCSS 工具类**，禁止硬编码颜色值。
- **响应式**：移动优先，断点使用 `sm`、`md`、`lg`、`xl`、`2xl`。
- **触摸优化**：点击区域不小于 `44px`。
---

# 第二部分：后端规范

## 项目概述

- **技术栈**：Python 3.11+ / FastAPI + Uvicorn
- **数据库**：PostgreSQL（主库）+ Redis（缓存/任务队列）
- **部署环境**：Docker + Nginx

### 目录结构

```
src/backend/
├── app/
│   ├── api/               # 路由层（Controller）
│   │   ├── v1/            # API 版本 v1
│   │   │   ├── endpoints/ # 具体接口
│   │   │   └── dependencies.py
│   ├── core/              # 核心配置
│   │   ├── config.py      # 环境变量配置
│   │   ├── database.py    # 数据库连接
│   │   └── security.py    # 认证/加密
│   ├── models/            # 数据模型（SQLAlchemy ORM）
│   ├── schemas/           # Pydantic 模式（请求/响应验证）
│   ├── services/          # 业务逻辑层
│   ├── utils/             # 工具函数
│   └── main.py            # FastAPI 应用入口
├── tests/                 # 单元测试
├── requirements.txt       # 依赖清单
└── Dockerfile             # 容器配置
```

## 代码风格

- **Python 版本**：3.11+，使用类型注解（Type Hints）。
- **格式化**：Black（缩进 4 空格）+ isort（导入排序）+ flake8（代码检查）。
- **命名规范**：
  - 类名：`PascalCase`
  - 函数/变量：`snake_case`
  - 常量：`UPPER_SNAKE_CASE`
  - 私有方法：`_snake_case`（以下划线开头）

## API 设计规范

- **RESTful 风格**：资源名使用复数名词。
- **统一响应格式**：

```python
# 成功响应
{
  "code": 0,
  "message": "success",
  "data": { ... }
}

# 错误响应
{
  "code": 40001,
  "message": "错误描述",
  "data": null
}
```

- **HTTP 状态码**：正确使用 200/201/400/401/403/404/500。
- **接口版本控制**：URL 路径包含版本号（如 `/api/v1/`）。

## 业务逻辑规范

- **Service 层**：所有业务逻辑封装在 `services/` 中，Controller 层只负责参数校验和调用 Service。
- **异步处理**：耗时任务（如文件处理、AI 推理）使用 Celery 任务队列异步执行。
- **缓存策略**：高频查询数据使用 Redis 缓存，设置合理的 TTL。

## 数据库规范

- **ORM**：SQLAlchemy（异步模式）。
- **迁移工具**：Alembic（所有表结构变更必须通过迁移文件）。
- **表命名**：使用复数名词（如 `users`、`orders`）。
- **字段命名**：`snake_case`，主键统一为 `id`，时间字段为 `created_at`、`updated_at`。
- **索引**：对高频查询字段添加索引。

## 安全规范

- **环境变量**：所有敏感信息（密钥、数据库连接串）通过 `.env` 管理，禁止硬编码。
- **认证授权**：JWT（Access Token + Refresh Token）。
- **输入校验**：所有用户输入使用 Pydantic 模型验证（长度、格式、类型）。
- **文件上传安全**：
  - 限制文件类型（MIME 类型白名单）。
  - 限制文件大小。
  - 上传文件存储在对象存储或本地临时目录，定期清理。

## 测试规范

- **框架**：pytest + pytest-asyncio。
- **覆盖率目标**：核心业务逻辑 ≥ 85%，工具函数 ≥ 95%。
- **测试分类**：
  - 单元测试（`tests/unit/`）
  - 集成测试（`tests/integration/`）
  - 端到端测试（`tests/e2e/`）

## 性能与日志

- **日志**：使用 `loguru`，日志级别：开发环境 DEBUG，生产环境 INFO。
- **性能监控**：集成 `prometheus_client` 暴露指标（请求数、响应时间、错误率）。
- **接口超时**：耗时接口设置合理超时时间，超时后返回 408 状态码。

---

# 第三部分：共享规范（前后端通用）

## Git 提交规范

- **Commit Message 格式**：`<type>(<scope>): <subject>`
- **Type 类型**：`feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`chore`
- **示例**：`feat(api): 新增用户登录接口`

## 环境变量规范

- **前端环境变量**：以 `VITE_` 开头（如 `VITE_API_BASE_URL`）。
- **后端环境变量**：直接命名（如 `DATABASE_URL`、`REDIS_URL`）。
- **`.env.example`** 文件必须提交到仓库，实际 `.env` 加入 `.gitignore`。

## 文档规范

- **API 文档**：使用 OpenAPI/Swagger（后端自动生成），前端通过 `openapi-generator` 生成 TypeScript 类型。
- **README.md**：项目简介、技术栈、本地启动步骤、部署说明。
- **代码注释**：复杂逻辑（超过 5 行）必须添加注释说明意图。

---

## 辅助指令（Copilot 行为准则）

### 修改原则

1. **最小化修改**：只改动必要的代码，不重构无关部分，不"顺便优化"未提及的代码。
2. **保持功能完整**：修改后不能破坏现有功能，不能引入新的 Bug 或回归问题。
3. **风险提示**：如果修改涉及核心逻辑或可能影响其他模块，需在回复中主动说明潜在影响。

### 变更通知

**每次生成或修改代码后，必须在回复开头（代码块之前）输出变更摘要，格式如下：**

```
📋 变更摘要：
- 修改了 [文件路径] 中的 [函数/组件/模块]
- 具体变更内容：[新增/修改/删除] 了什么功能或逻辑
- 影响范围：[是否影响现有功能 / 是否向后兼容]
```

### 代码生成原则

1. **自动识别上下文**：根据文件路径或文件扩展名自动应用对应的规范（见开头的自动识别规则）。
2. **生成代码时**：
   - 前端：优先使用函数式组件，保持单一职责，单个组件不超过 300 行。
   - 后端：遵循 SOLID 原则，Service 层与 API 层分离。
3. **修改现有代码**：保持与周边代码风格一致，不引入新的依赖（除非必要并说明理由）。
4. **新功能开发**：同步生成对应的单元测试和 API 文档注释。
5. **安全审查**：自动检查代码中的硬编码密钥、未验证的用户输入、SQL 注入风险。