export const translations = {
  en: {
    // Hero
    hero: {
      badge: "Powered by Rust & WebAssembly",
      title: "Utoo",
      subtitle: "Unified Frontend Toolchain",
      description:
        "A complete suite of tools for modern frontend development. Lightning fast package management, bundling, and browser-native builds.",
      explorePackages: "Explore Packages",
      docs: "Doc",
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
          "A modern bundler powered by Turbopack. Zero config, instant HMR, and optimized production builds.",
        highlight: {
          title: "umi Ecosystem Compatible",
          description:
            "Use as standalone CLI or integrate seamlessly with umi ecosystem. Enable with just one line of config.",
        },
        features: {
          faster: {
            title: "10x Faster",
            description: "Native-speed compilation with Rust core",
          },
          hmr: {
            title: "Instant HMR",
            description: "Sub-millisecond hot module replacement",
          },
          codeSplitting: {
            title: "Code Splitting",
            description: "Automatic chunking and tree shaking",
          },
          css: {
            title: "CSS Support",
            description: "Less, Tailwind, PostCSS out of the box",
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
        tagline: "Browser-Native Builds",
        description:
          "Run the full build pipeline in the browser. No server required—install, compile, and bundle entirely in WebAssembly.",
        highlight: {
          title: "True Browser Builds",
          description:
            "Install npm packages, compile TypeScript, and bundle assets—all running natively in the browser via WebAssembly.",
        },
        features: {
          browserInstall: {
            title: "Browser npm Install",
            description: "Install packages directly from npm registry",
          },
          opfs: {
            title: "OPFS Storage",
            description: "Persistent file system in browser storage",
          },
          wasmCompiler: {
            title: "WASM Compiler",
            description: "Full TypeScript compiler in WebAssembly",
          },
          serviceWorker: {
            title: "Service Worker",
            description: "Serve builds without a backend server",
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
      features: {
        isomorphicInstall: "Isomorphic npm Install",
        wasmCompiler: "WASM Compiler",
        opfsFileSystem: "OPFS File System",
      },
      tryButton: "Try Playground",
      buildButton: "Build Project",
      building: "Building...",
      panels: {
        projectFiles: "Project Files",
        editor: "Editor",
        preview: "Preview",
      },
      steps: {
        step1: {
          title: "Install Dependencies",
          description:
            "Reads package-lock.json and installs packages directly from npm registry into browser storage.",
        },
        step2: {
          title: "Compile & Bundle",
          description:
            "TypeScript compilation and bundling runs in WebAssembly with full Less and Tailwind CSS support.",
        },
        step3: {
          title: "Serve via Service Worker",
          description:
            "Build output is served through a Service Worker, enabling instant preview without any server.",
        },
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
      badge: "由 Rust 和 WebAssembly 驱动",
      title: "Utoo",
      subtitle: "通用前端工具链",
      description:
        "现代前端开发的完整工具套件。极速包管理、打包构建，以及浏览器原生构建能力。",
      explorePackages: "探索功能",
      docs: "Doc",
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
          "基于 Turbopack 的现代打包器。零配置、即时 HMR、优化的生产构建。",
        highlight: {
          title: "兼容 umi 生态",
          description:
            "支持独立 CLI 使用，也可无缝集成 umi 生态，一行配置即可启用。",
        },
        features: {
          faster: {
            title: "快 10 倍",
            description: "Rust 内核，原生速度编译",
          },
          hmr: {
            title: "即时 HMR",
            description: "亚毫秒级热模块替换",
          },
          codeSplitting: {
            title: "代码分割",
            description: "自动分块和 Tree Shaking",
          },
          css: {
            title: "CSS 支持",
            description: "开箱即用的 Less、Tailwind、PostCSS",
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
        tagline: "浏览器原生构建",
        description:
          "在浏览器中运行完整构建流程。无需服务器，完全在 WebAssembly 中安装、编译和打包。",
        highlight: {
          title: "真正的浏览器构建",
          description:
            "安装 npm 包、编译 tsx、打包资源——全部通过 WebAssembly 在浏览器中原生运行。",
        },
        features: {
          browserInstall: {
            title: "浏览器 npm 安装",
            description: "直接从 npm 注册表安装包",
          },
          opfs: {
            title: "OPFS 存储",
            description: "浏览器存储中的持久化文件系统",
          },
          wasmCompiler: {
            title: "WASM 编译器",
            description: "WebAssembly 中的完整 TypeScript 编译器",
          },
          serviceWorker: {
            title: "Service Worker",
            description: "无需后端服务器即可提供构建服务",
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
      features: {
        isomorphicInstall: "同构 npm 安装",
        wasmCompiler: "WASM 编译器",
        opfsFileSystem: "OPFS 文件系统",
      },
      tryButton: "体验 Playground",
      buildButton: "构建项目",
      building: "构建中...",
      panels: {
        projectFiles: "项目文件",
        editor: "编辑器",
        preview: "预览",
      },
      steps: {
        step1: {
          title: "安装依赖",
          description:
            "读取 package-lock.json 并从 npm registry 直接安装包到浏览器存储。",
        },
        step2: {
          title: "编译和打包",
          description:
            "TypeScript 编译和打包在 WebAssembly 中运行，完整支持 Less 和 Tailwind CSS。",
        },
        step3: {
          title: "通过 Service Worker 代理",
          description:
            "构建输出通过 Service Worker 提供，无需任何服务器即可即时预览。",
        },
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
