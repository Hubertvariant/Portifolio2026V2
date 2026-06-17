import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API do Portfólio de Hubert
  
  // 1. Obter informações de Temas (Replicando o dicionário TEMAS do código base)
  app.get("/api/themes", (req, res) => {
    const TEMAS = {
      "JavaScript": {
        "bg": "linear-gradient(135deg, #111111 0%, #323330 100%)",
        "header": "#f7df1e", 
        "text_h": "#000000", 
        "card": "rgba(247, 223, 30, 0.1)",
        "content_bg": "#ffffff", 
        "content_text": "#f7df1e", 
        "lang": "javascript",
        "pasta": "JS", 
        "desc": "✨ Interatividade e Front-end moderno"
      },
      "Python": {
        "bg": "linear-gradient(135deg, #021d33 0%, #033a63 100%)",
        "header": "linear-gradient(to right, #3776ab, #ffde57)", 
        "text_h": "#021d33", 
        "card": "rgba(255, 255, 255, 0.05)", 
        "content_bg": "#1e1e26", 
        "content_text": "#ffffff", 
        "lang": "python", 
        "pasta": "PY", 
        "desc": "🐍 Automação e Inteligência de Dados"
      },
      "Games": {
        "bg": "linear-gradient(135deg, #0f0524 0%, #3b0a66 100%)",
        "header": "linear-gradient(to right, #00ffcc, #0088ff)", 
        "text_h": "#000000", 
        "card": "rgba(0, 255, 204, 0.1)", 
        "content_bg": "#0a0a0a", 
        "content_text": "#00ffcc", 
        "lang": "python", 
        "pasta": "GAMES", 
        "desc": "🎮 Experiências Imersivas e Jogos"
      },
      "Mobile": {
        "bg": "linear-gradient(135deg, #0d0221 0%, #240b36 100%)",
        "header": "#e91e63", 
        "text_h": "#ffffff", 
        "card": "rgba(233, 30, 99, 0.1)", 
        "content_bg": "#ffffff", 
        "content_text": "#ffffff", 
        "lang": "markdown",
        "pasta": "QRcode", 
        "desc": "📱 Soluções Mobile e QR Codes"
      },
      "Analise": {
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
    };
    res.json(TEMAS);
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
        
        if (estatistica.isFile()) {
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
