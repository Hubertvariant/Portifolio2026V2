import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API do Portfólio de Hubert
  
  // Paletas de cores elegantes para novos temas autogerados
  const PALETTES = [
    { bg: "linear-gradient(135deg, #09090b 0%, #18181b 100%)", header: "#a1a1aa", card: "rgba(161, 161, 170, 0.08)", text_h: "#09090b", content_bg: "#09090b", content_text: "#a1a1aa", desc: "📂 Módulo de projeto genérico detectado automaticamente" },
    { bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", header: "#818cf8", card: "rgba(129, 140, 248, 0.08)", text_h: "#0f172a", content_bg: "#090d16", content_text: "#818cf8", desc: "⚡ Integrações dinâmicas e APIs estruturadas" },
    { bg: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)", header: "#34d399", card: "rgba(52, 211, 153, 0.08)", text_h: "#022c22", content_bg: "#021e17", content_text: "#34d399", desc: "🌿 Ativos e rotinas carregados de forma dinâmica" },
    { bg: "linear-gradient(135deg, #1c1917 0%, #44403c 100%)", header: "#fb923c", card: "rgba(251, 146, 60, 0.08)", text_h: "#1c1917", content_bg: "#12100e", content_text: "#fb923c", desc: "⚙️ Fluxo e scripts de automação robustos" },
    { bg: "linear-gradient(135deg, #172554 0%, #1e3a8a 100%)", header: "#60a5fa", card: "rgba(96, 165, 250, 0.08)", text_h: "#172554", content_bg: "#0f172a", content_text: "#60a5fa", desc: "⚡ Serviços integrados no portfólio" },
    { bg: "linear-gradient(135deg, #311042 0%, #4c1d95 100%)", header: "#c084fc", card: "rgba(192, 132, 252, 0.08)", text_h: "#311042", content_bg: "#1e112a", content_text: "#c084fc", desc: "🔮 Scripts e rotinas do banco de projetos" },
    { bg: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)", header: "#f87171", card: "rgba(248, 113, 113, 0.08)", text_h: "#450a0a", content_bg: "#2d0808", content_text: "#f87171", desc: "🔥 Processamento de alto rendimento e utilitários" },
    { bg: "linear-gradient(135deg, #062f4f 0%, #000000 100%)", header: "#00ffcc", card: "rgba(0, 255, 204, 0.08)", text_h: "#000000", content_bg: "#010811", content_text: "#00ffcc", desc: "💎 Recursos de última geração carregados da pasta" }
  ];

  function getPaletteForName(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % PALETTES.length;
    return PALETTES[index];
  }

  function scanProjectFolders() {
    const rootPath = process.cwd();
    const items = fs.readdirSync(rootPath, { withFileTypes: true });
    
    const EXCLUDED_FOLDERS = new Set([
      "node_modules", "src", "assets", "dist", "public", ".git", ".github", ".vscode", "tmp", "coverage", ".cursor"
    ]);

    const folders = items
      .filter(item => item.isDirectory() && !EXCLUDED_FOLDERS.has(item.name))
      .map(item => item.name);

    // Presets clássicos do Hubert para garantir estilo impecável das pastas existentes
    const presets: { [key: string]: { name: string; config: any } } = {
      "JS": {
        name: "JavaScript",
        config: {
          "bg": "linear-gradient(135deg, #111111 0%, #323330 100%)",
          "header": "#f7df1e", 
          "text_h": "#000000", 
          "card": "rgba(247, 223, 30, 0.1)",
          "content_bg": "#ffffff", 
          "content_text": "#f7df1e", 
          "lang": "javascript",
          "pasta": "JS", 
          "desc": "✨ Interatividade e Front-end moderno"
        }
      },
      "PY": {
        name: "Python",
        config: {
          "bg": "linear-gradient(135deg, #021d33 0%, #033a63 100%)",
          "header": "linear-gradient(to right, #3776ab, #ffde57)", 
          "text_h": "#021d33", 
          "card": "rgba(255, 255, 255, 0.05)", 
          "content_bg": "#1e1e26", 
          "content_text": "#ffffff", 
          "lang": "python", 
          "pasta": "PY", 
          "desc": "🐍 Automação e Inteligência de Dados"
        }
      },
      "GAMES": {
        name: "Games",
        config: {
          "bg": "linear-gradient(135deg, #0f0524 0%, #3b0a66 100%)",
          "header": "linear-gradient(to right, #00ffcc, #0088ff)", 
          "text_h": "#000000", 
          "card": "rgba(0, 255, 204, 0.1)", 
          "content_bg": "#0a0a0a", 
          "content_text": "#00ffcc", 
          "lang": "python", 
          "pasta": "GAMES", 
          "desc": "🎮 Experiências Imersivas e Jogos"
        }
      },
      "QRcode": {
        name: "Mobile",
        config: {
          "bg": "linear-gradient(135deg, #0d0221 0%, #240b36 100%)",
          "header": "#e91e63", 
          "text_h": "#ffffff", 
          "card": "rgba(233, 30, 99, 0.1)", 
          "content_bg": "#ffffff", 
          "content_text": "#ffffff", 
          "lang": "markdown",
          "pasta": "QRcode", 
          "desc": "📱 Soluções Mobile e QR Codes"
        }
      },
      "AP": {
        name: "Analise",
        config: {
          "bg": "linear-gradient(135deg, #000428 0%, #004e92 100%)",
          "header": "#ffffff", 
          "text_h": "#000428", 
          "card": "rgba(255, 255, 255, 0.1)", 
          "content_bg": "rgba(255, 255, 255, 0.05)", 
          "content_text": "#ffffff", 
          "lang": "markdown",
          "pasta": "AP", 
          "desc": "📊 Transformando dados em decisões"
        }
      }
    };

    const dynamicThemes: { [key: string]: any } = {};

    for (const folder of folders) {
      // 1. Tentar encontrar preset direto
      const preset = presets[folder];
      if (preset) {
        dynamicThemes[preset.name] = preset.config;
        continue;
      }

      // 2. Tentar encontrar preset case-insensitive
      const folderUpper = folder.toUpperCase();
      const matchedPresetKey = Object.keys(presets).find(k => k.toUpperCase() === folderUpper);
      if (matchedPresetKey) {
        const p = presets[matchedPresetKey];
        dynamicThemes[p.name] = { ...p.config, pasta: folder };
        continue;
      }

      // 3. Procurar customização por arquivo theme.json ou .theme.json na pasta do projeto
      const folderPath = path.join(rootPath, folder);
      let customConfig: any = null;
      const configFiles = [".theme.json", "theme.json", "config.json"];
      for (const file of configFiles) {
        const filePath = path.join(folderPath, file);
        if (fs.existsSync(filePath)) {
          try {
            customConfig = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            break;
          } catch (e) {
            console.error(`Erro ao decodificar config ${file} em ${folder}:`, e);
          }
        }
      }

      // Se customConfig tiver propriedades, mesclar com gerado
      const displayName = customConfig?.nome || customConfig?.name || folder
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      const palette = getPaletteForName(folder);

      // Tenta inferir linguagem padrão baseada nos arquivos
      let defaultLang = "markdown";
      try {
        if (fs.existsSync(folderPath)) {
          const files = fs.readdirSync(folderPath);
          const extCount: { [key: string]: number } = {};
          for (const file of files) {
            const ext = path.extname(file).toLowerCase().replace(".", "");
            if (ext) {
              extCount[ext] = (extCount[ext] || 0) + 1;
            }
          }
          let maxCount = 0;
          let maxExt = "";
          for (const [ext, count] of Object.entries(extCount)) {
            if (count > maxCount) {
              maxCount = count;
              maxExt = ext;
            }
          }
          if (["py"].includes(maxExt)) defaultLang = "python";
          else if (["js", "jsx"].includes(maxExt)) defaultLang = "javascript";
          else if (["ts", "tsx"].includes(maxExt)) defaultLang = "typescript";
          else if (["html"].includes(maxExt)) defaultLang = "html";
          else if (["css"].includes(maxExt)) defaultLang = "css";
          else if (["json"].includes(maxExt)) defaultLang = "json";
          else if (["sql"].includes(maxExt)) defaultLang = "sql";
        }
      } catch (e) {
        // Ignora erros de leitura de arquivos
      }

      dynamicThemes[displayName] = {
        "bg": customConfig?.bg || palette.bg,
        "header": customConfig?.header || palette.header,
        "text_h": customConfig?.text_h || palette.text_h,
        "card": customConfig?.card || palette.card,
        "content_bg": customConfig?.content_bg || palette.content_bg,
        "content_text": customConfig?.content_text || palette.content_text,
        "lang": customConfig?.lang || defaultLang,
        "pasta": folder,
        "desc": customConfig?.desc || customConfig?.description || palette.desc
      };
    }

    return dynamicThemes;
  }

  // 1. Obter informações de Temas dinamicamente mapeados a partir das pastas do sistema
  app.get("/api/themes", (req, res) => {
    try {
      const themes = scanProjectFolders();
      res.json(themes);
    } catch (err: any) {
      res.status(500).json({ error: "Erro ao varrer pastas de projetos: " + err.message });
    }
  });

  // 2. Listar arquivos de uma determinada pasta com suporte a classificação inteligente
  // Replicando exatamente a lógica de Streamlit "listar_arquivos_inteligente(pasta)"
  app.get("/api/projects", (req, res) => {
    const { folder } = req.query;
    if (!folder || typeof folder !== "string") {
      return res.status(400).json({ error: "Parâmetro 'folder' é obrigatório." });
    }

    const pastaAlvo = path.join(process.cwd(), folder);
    
    if (!fs.existsSync(pastaAlvo)) {
      return res.json([]);
    }

    try {
      const items = fs.readdirSync(pastaAlvo);
      const output = [];

      for (const item of items) {
        const caminhoCompleto = path.join(pastaAlvo, item);
        const estatistica = fs.statSync(caminhoCompleto);
        
        const isHiddenOrConfig = item.startsWith(".") || ["theme.json", "config.json"].includes(item.toLowerCase());
        if (estatistica.isFile() && !isHiddenOrConfig) {
          const ext = path.extname(item).toLowerCase().replace(".", "");
          
          let tipo = "texto";
          if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
            tipo = "imagem";
          } else if (["py", "js", "html", "css", "sql", "json", "ts", "tsx"].includes(ext)) {
            tipo = "codigo";
          }

          let conteudo = "";
          if (tipo !== "imagem") {
            conteudo = fs.readFileSync(caminhoCompleto, "utf-8");
          }

          // Identificar se o conteúdo começa com link web para botões de ação dinâmicos
          if (tipo === "texto" && conteudo.trim().startsWith("http")) {
            tipo = "link";
          }

          output.push({
            nome: item,
            caminho_relativo: `${folder}/${item}`,
            tipo,
            ext,
            conteudo: conteudo
          });
        }
      }

      // Ordenar alfabeticamente
      output.sort((a, b) => a.nome.localeCompare(b.nome));
      res.json(output);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Serve arquivos de imagem do projeto dinamicamente
  app.get("/api/file", (req, res) => {
    const { path: filePath } = req.query;
    if (!filePath || typeof filePath !== "string") {
      return res.status(400).send("Caminho do arquivo é obrigatório");
    }

    // Segurança contra Directory Traversal
    const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\))+/, '');
    const fullPath = path.join(process.cwd(), safePath);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).send("Arquivo não encontrado");
    }

    const ext = path.extname(fullPath).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp"
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    fs.createReadStream(fullPath).pipe(res);
  });

  // Configuração do Vite middleware (desenvolvimento) ou arquivos estáticos (produção)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Hubert Server] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer();
