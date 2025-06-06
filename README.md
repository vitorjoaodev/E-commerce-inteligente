# ✈️ Aviator Outfitters  
*Roupas para exploradores dos céus*  
**Design UI/UX com estética cinematográfica — estilo Jurassic Park e Indiana Jones**

![Capa do site]([qhttps://cdn.midjourney.com/30f33d1b-aviator-cover.jpg](https://github.com/vitorjoaodev/E-commerce-inteligente/blob/main/site.jpg?raw=true)](https://github.com/vitorjoaodev/E-commerce-inteligente/blob/main/site.jpg?raw=true))  Site: https://e-commerce-inteligente.onrender.com/
> “Aviadores não seguem mapas. Eles seguem estrelas.”  

---

## Visão Geral

**Aviator Outfitters** é uma loja online de roupas inspiradas no mundo da aviação: desde o visual dos pilotos da Segunda Guerra até o estilo civil da era de ouro da aviação comercial. Construído com tecnologias modernas e um visual marcante, o projeto une:

- **UI/UX com tema cinematográfico**
- **Componentes Radix UI**
- **Autenticação com Passport.js**
- **Banco de dados com Drizzle ORM**
- **Pagamentos com Stripe**
- **Frontend interativo com React + Tailwind**

---

## Design Cinematográfico

O design do site traz uma experiência **imersiva**, como se o usuário estivesse explorando uma loja escondida entre hangares antigos e pistas abandonadas.  
Imagine:

- **Tipografia vintage** e **paletas terrosas**  
- **Imagens granulosas** de pilotos e aeronaves  
- **Botões com textura de couro, metais e madeira**  
- **Efeitos de animação inspirados em aventuras e mapas secretos**

![Mockup Produto](https://cdn.midjourney.com/mockup-aviator-jacket.jpg)

---

## Tecnologias Principais

| Tecnologia | Descrição |
|-----------|-----------|
| **React + TailwindCSS** | SPA moderna com estilização rápida e adaptável |
| **Radix UI** | Componentes acessíveis e altamente customizáveis |
| **Express + Drizzle ORM** | Backend robusto com tipagem completa |
| **Stripe** | Checkout seguro e integrado |
| **Passport.js** | Autenticação local com sessões seguras |
| **Zod + Drizzle-Zod** | Validações de dados rigorosas e reutilizáveis |
| **Embla Carousel** | Slides de produtos com interação suave |

---

## Funcionalidades

- Cadastro e login com autenticação de sessão
- Carrinho e checkout com Stripe
- Listagem dinâmica de produtos
- Painel administrativo com React-Query e gráficos (Recharts)
- Dark/light mode automático via `next-themes`
- Animações suaves com Framer Motion
- UI completamente responsiva e acessível
- Exit Popup ativo para cadastro e descontos exclusivos do site


---

## Scripts Principais

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start

# Push no banco de dados
npm run db:push

# Checagem de tipos
npm run check

Estrutura de Pastas
.
├── server/            # Backend Express
├── src/               # Frontend React
├── components/        # UI components (Radix, custom, etc)
├── styles/            # Tailwind + custom CSS
├── db/                # Migrations, schemas (Drizzle ORM)
├── public/            # Assets públicos (imagens, fontes)
├── dist/              # Build final do projeto

Design Preview (Figma + Sketchbook)
Wireframe da landing page inspirado nos mapas de expedição de Indiana Jones.

⸻

Imagens Inspiradoras
  •	Hangar rústico com vitrine de roupas
  •	Close em jaquetas de couro desgastado
  •	Capas com textura de mapa antigo
  •	Ícones inspirados em bússolas, turbinas e painéis de cockpit

⸻

Contribuindo

Esse projeto ainda está em desenvolvimento, mas você pode abrir issues e sugestões para:
  •	Novos modelos de roupas temáticas
  •	Melhorias na UX em mobile
  •	Novas integrações com provedores de pagamento

⸻

Licença

MIT — sinta-se livre para usar e adaptar.

⸻

Desenvolvido por João Vitor Belasque
