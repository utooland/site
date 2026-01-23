export const translations = {
  en: {
    // Hero
    hero: {
      badge: "Written in Rust, Native & WASM Supported",
      title: "Utoo",
      subtitle: "An Unified Frontend Toolchain",
      description:
        "A complete suite of tools for modern frontend development. Lightning fast package management, bundling, and browser-native builds.",
      explorePackages: "Explore Packages",
      docs: "Doc",
      wiki: "Wiki",
      github: "GitHub",
    },
    // Packages
    packages: {
      utoo: {
        tagline: "Package Manager",
        description:
          "A high-performance npm package manager built with Rust. Drop-in replacement for npm with native lockfile compatibility.",
        highlight: {
          title: "Native npm Lockfile",
          description:
            "Reads and writes standard package-lock.json (v3). No migration needed—works with your existing projects.",
        },
        features: {
          smartInstall: {
            title: "Smart Install",
            description: "Parallel downloads with intelligent caching",
          },
          packageExplorer: {
            title: "Package Explorer",
            description: "View package info, dependencies, and versions",
          },
          scriptRunner: {
            title: "Script Runner",
            description: "Interactive workspace and script selection",
          },
          lockGeneration: {
            title: "Lock Generation",
            description: "Generate package-lock.json with ut deps",
          },
        },
        commands: {
          install: "Install from lockfile",
          deps: "Generate package-lock.json",
          list: "Show dependency tree",
          view: "View package info",
          utx: "Execute remote CLI",
        },
      },
      pack: {
        tagline: "Next-Gen Bundler",
        description:
          "Next-generation bundler powered by Turbopack and SWC. Minimal config, instant HMR, and optimized production builds.",
        highlight: {
          title: "Turbopack & SWC Powered Engine",
          description:
            "High-performance incremental builds with built-in persistent caching for maximum speed.",
        },
        features: {
          faster: {
            title: "Native Speed",
            description: "Ultra-fast compilation and bundling powered by SWC and Turbopack",
          },
          hmr: {
            title: "Instant HMR",
            description: "Sub-millisecond hot module replacement for rapid iteration",
          },
          codeSplitting: {
            title: "Modular Assets",
            description: "Automatic code splitting and optimized loading strategies",
          },
          css: {
            title: "Lightning CSS",
            description: "Next-gen CSS parsing and transformation via lightningcss",
          },
          webpack: {
            title: "Loader Compatibility",
            description: "Supports most mainstream Webpack loaders and features for seamless migration",
          },
          caching: {
            title: "Persistent Caching",
            description: "Advanced persistent disk storage for near-instant restarts",
          },
          nodePolyfill: {
            title: "Node Bridge",
            description: "Automatic polyfills for running Node.js modules in browsers",
          },
          analysis: {
            title: "Visual Insights",
            description: "Built-in bundle analyzer for deep performance optimization",
          },
          optimization: {
            title: "Code Optimization",
            description: "Advanced tree shaking, scope hoisting, and dead code elimination for smaller bundles",
          },
          images: {
            title: "Image Optimization",
            description: "Automated image optimization and blur placeholder support",
          },
          modernStyles: {
            title: "Modern Styling",
            description: "Native integration for Emotion and Styled Components",
          },
          devServer: {
            title: "Integrated Dev Server",
            description: "Feature-rich development proxy and static file serving",
          },
        },
        commands: {
          dev: "Start dev server",
          build: "Production build",
          webpack: "Webpack compat mode",
        },
        config: {
          builtInto: "Built into",
          addConfig: "— just add config to enable",
        },
        api: {
          description: "Integrate programmatically with Node.js API",
        },
      },
      web: {
        tagline: "In-browser Development Environment",
        description:
          "A high-performance web development environment running entirely in the browser. Features native-speed multi-threaded builds, seamless Webpack loader support, and instant HMR without Node.js emulation.",
        highlight: {
          title: "Native Browser Environment",
          description:
            "Install npm packages, execute WASM-native TypeScript compilation, and bundle assets with full HMR support—all natively via OPFS.",
        },
        features: {
          browserInstall: {
            title: "Browser npm Install",
            description: "Install packages directly from npm registry",
          },
          opfs: {
            title: "Multi-threaded Build",
            description: "Tokio-powered parallel bundling and compilation in WASM",
          },
          wasmEngine: {
            title: "Webpack Loader Support",
            description: "Seamlessly execute loaders with built-in Node.js polyfills",
          },
          serviceWorker: {
            title: "In-browser HMR",
            description: "Instant hot module replacement without a backend server",
          },
        },
        commands: {
          newProject: "Create project",
          install: "Install deps",
          build: "Build project",
          readFile: "Read files",
        },
      },
    },
    // Playground
    playground: {
      title: "Playground",
      description:
        "Experience browser-native builds. This playground runs entirely in your browser—no server required. Dependencies are installed from npm, TypeScript is compiled, and assets are bundled using WebAssembly.",
      tryButton: "Try Playground",
      buildButton: "Build Project",
      building: "Building...",
      panels: {
        projectFiles: "Project Files",
        editor: "Editor",
        preview: "Preview",
      },
    },
    // Footer
    footer: {
      builtWith: "Built with",
      by: "by",
    },
    // Common
    common: {
      quickReference: "Quick Reference",
      cli: "CLI",
    },
  },
  zh: {
    // Hero
    hero: {
      badge: "Rust 语言编写，支持 Native & WASM",
      title: "Utoo",
      subtitle: "通用前端工具链",
      description:
        "现代前端开发的完整工具套件。极速包管理、打包构建，以及浏览器原生构建能力。",
      explorePackages: "探索功能",
      docs: "Doc",
      wiki: "维基",
      github: "GitHub",
    },
    // Packages
    packages: {
      utoo: {
        tagline: "包管理器",
        description:
          "基于 Rust 构建的高性能 npm 包管理器。可直接替代 npm，原生兼容 lockfile 和目录结构",
        highlight: {
          title: "原生 npm Lockfile",
          description:
            "读写标准 package-lock.json (v3)。无需迁移，直接用于现有项目。",
        },
        features: {
          smartInstall: {
            title: "极速安装",
            description: "并行下载，智能缓存",
          },
          packageExplorer: {
            title: "查看依赖",
            description: "查看包信息、依赖和版本",
          },
          scriptRunner: {
            title: "执行脚本",
            description: "交互式选择",
          },
          lockGeneration: {
            title: "依赖解析",
            description: "使用 ut deps 生成 package-lock.json",
          },
        },
        commands: {
          install: "从 lockfile 安装",
          deps: "生成 package-lock.json",
          list: "显示依赖树",
          view: "查看包信息",
          utx: "执行远程 CLI",
        },
      },
      pack: {
        tagline: "新一代打包器",
        description:
          "基于 Turbopack 与 SWC 的新一代打包器。极简配置、即时 HMR、优化的生产构建。",
        highlight: {
          title: "Turbopack 与 SWC 强力驱动",
          description:
            "基于 Turbopack 的增量构建引擎，支持持久化构建缓存。",
        },
        features: {
          faster: {
            title: "原生速度",
            description: "基于 SWC 与 Turbopack 的 Rust 内核，提供极速编译与打包体验",
          },
          hmr: {
            title: "即时 HMR",
            description: "亚毫秒级热更新，极大提升本地开发效率",
          },
          codeSplitting: {
            title: "智能拆包",
            description: "自动代码分割与按需加载策略，优化运行性能",
          },
          css: {
            title: "Lightning CSS",
            description: "基于 Rust 的高性能 CSS 解析、转换与压缩引擎",
          },
          webpack: {
            title: "Loader 兼容",
            description: "支持大多数主流 Webpack Loader 与配置，实现平滑迁移",
          },
          caching: {
            title: "持久化缓存",
            description: "基于磁盘的高级持久化缓存，实现秒级增量构建",
          },
          nodePolyfill: {
            title: "Node.js 兼容",
            description: "内置浏览器端 Node.js 核心模块 Polyfill 支持",
          },
          analysis: {
            title: "产物分析",
            description: "可视化分析工具，辅助优化产物大小与依赖关系",
          },
          optimization: {
            title: "代码优化",
            description: "先进的 Tree Shaking、模块合并与产物压缩",
          },
          images: {
            title: "图片优化",
            description: "自动图片内联、多格式转换与模糊占位图生成",
          },
          modernStyles: {
            title: "现代样式",
            description: "原生支持 Emotion、Styled Components 等 CSS-in-JS",
          },
          devServer: {
            title: "集成式开发服务器",
            description: "内置高性能代理、静态文件服务与调试工具",
          },
        },
        commands: {
          dev: "启动开发服务器",
          build: "生产构建",
          webpack: "Webpack 兼容模式",
        },
        config: {
          builtInto: "已内置于",
          addConfig: "— 添加配置即可启用",
        },
        api: {
          description: "通过 Node.js API 集成调用",
        },
      },
      web: {
        tagline: "浏览器原生开发环境",
        description:
          "完全运行在浏览器中的高性能 Web 开发环境。支持原生级多线程构建、无缝 Webpack Loader 兼容以及即时 HMR，无需 Node.js 模拟环境。",
        highlight: {
          title: "真正的浏览器原生环境",
          description:
            "安装 npm 包、使用多线程 WASM 引擎编译 tsx、打包资源——全部在浏览器中原生运行，支持 HMR。",
        },
        features: {
          browserInstall: {
            title: "浏览器 npm 安装",
            description: "直接从 npm 注册表安装包",
          },
          opfs: {
            title: "多线程构建",
            description: "基于 Tokio 移植的 WASM 运行时，实现并行编译与打包",
          },
          wasmEngine: {
            title: "Loader 无缝兼容",
            description: "内置 Node.js Polyfill，无缝执行主流 Webpack Loader",
          },
          serviceWorker: {
            title: "浏览器原生 HMR",
            description: "无需后端服务器，在浏览器环境内实现即时模块热替换",
          },
        },
        commands: {
          newProject: "创建项目",
          install: "安装依赖",
          build: "构建项目",
          readFile: "读取文件",
        },
      },
    },
    // Playground
    playground: {
      title: "Playground",
      description:
        "体验浏览器原生构建。此演练场完全在浏览器中运行，无需服务器。依赖从 npm 安装，TypeScript 被编译，资源使用 WebAssembly 打包。",
      tryButton: "体验 Playground",
      buildButton: "构建项目",
      building: "构建中...",
      panels: {
        projectFiles: "项目文件",
        editor: "编辑器",
        preview: "预览",
      },
    },
    // Footer
    footer: {
      builtWith: "使用",
      by: "构建，由",
    },
    // Common
    common: {
      quickReference: "快速参考",
      cli: "CLI",
    },
  },
} as const;

export type Locale = keyof typeof translations;

// Use a looser type for translations to allow switching between locales
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};

export type Translations = DeepStringify<typeof translations.en>;
