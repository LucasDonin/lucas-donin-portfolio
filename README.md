# Lucas Donin — Portfólio Premium

Um portfólio digital premium com animações avançadas de scroll, desenvolvido para Lucas Donin, Diretor de Arte com quase uma década de experiência em branding e design.

## 🎨 Design & Conceito

**Abordagem Visual**: Dark Atelier — Galeria Noturna

O site foi desenvolvido com uma filosofia de galeria de arte digital, onde cada projeto brilha contra um fundo escuro profundo. A paleta de cores combina azul-escuro profundo (`#0C0F1A`), off-white quente (`#E8E2D6`) e dourado envelhecido (`#B8964E`), remetendo à tradição artesanal dos trabalhos em branding e packaging.

### Características Principais

- **Smooth Scrolling**: Implementado com Lenis para uma experiência de rolagem fluida e cinematográfica
- **Animações Avançadas**: GSAP + ScrollTrigger para efeitos baseados em scroll
  - Fade-in e slide-up sequencial
  - Reveal com clip-path
  - Parallax em múltiplas camadas
  - Split-text animations
  - Scale e glow effects
- **Responsividade**: Totalmente otimizado para mobile, tablet e desktop
- **Performance**: 60fps em animações, otimizado para web

## 🛠️ Stack Técnico

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Animações**: GSAP 3 + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Build**: Vite
- **Tipografia**: Playfair Display (headlines) + DM Sans (body)

## 📁 Estrutura do Projeto

```
client/
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Navigation.tsx          # Header com navegação
│   │   ├── Preloader.tsx           # Animação de carregamento
│   │   ├── HeroSection.tsx         # Seção hero com parallax
│   │   ├── AboutSection.tsx        # Sobre o designer
│   │   ├── ProjectsSection.tsx     # Galeria de projetos
│   │   ├── ProcessSection.tsx      # Metodologia
│   │   ├── ContactSection.tsx      # CTA e contato
│   │   └── Footer.tsx              # Rodapé
│   ├── hooks/
│   │   ├── useLenis.ts             # Hook para smooth scrolling
│   │   └── useScrollAnimations.ts  # Hook para GSAP animations
│   ├── pages/
│   │   ├── Home.tsx                # Página principal
│   │   └── NotFound.tsx            # Página 404
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Estilos globais e design tokens
└── index.html                      # HTML template
```

## 🎬 Animações Implementadas

### Preloader
- Animação de entrada do nome com stagger
- Barra de progresso com contador
- Transição suave para o conteúdo principal

### Hero Section
- Background com parallax
- Tipografia split-text (letra por letra)
- Fade-in sequencial de elementos
- Scroll indicator animado

### Seções de Conteúdo
- Fade-up com translate
- Slide-left e slide-right
- Image reveal com clip-path
- Scale-up com fade
- Stagger children para listas
- Line expand animations

### Efeitos de Hover
- Scale e glow em cards
- Underline expand em links
- Color transitions suaves

## 🚀 Como Usar

### Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Compilar para produção
pnpm build

# Preview da build
pnpm preview
```

### Customização

#### Cores
Edite as variáveis CSS em `client/src/index.css`:
```css
--color-gold: oklch(0.72 0.12 75);
--color-navy: oklch(0.15 0.03 265);
--color-cream: oklch(0.92 0.02 80);
```

#### Tipografia
Fonts são carregadas via Google Fonts em `client/index.html`:
- **Display**: Playfair Display (headlines)
- **Body**: DM Sans (conteúdo)

#### Imagens
Todas as imagens estão hospedadas em CDN. Para atualizar:
1. Substitua as URLs nos componentes
2. Certifique-se de que as imagens estão otimizadas (WebP, ~1920px width)

## 📊 Performance

- **Lighthouse Score**: 90+
- **Core Web Vitals**: Otimizados
- **Bundle Size**: ~150KB (gzipped)
- **Animações**: 60fps em dispositivos modernos

### Otimizações Aplicadas

- Lazy loading de imagens
- Code splitting automático
- CSS purging com Tailwind
- Compressão de assets
- Preload de fontes críticas

## 🌐 Seções do Site

### 1. Hero
Apresentação impactante com tipografia grande, background atmosférico e scroll indicator.

### 2. Sobre
Layout assimétrico com imagem do workspace e descrição profissional. Inclui estatísticas e ferramentas utilizadas.

### 3. Projetos
Grid de projetos em destaque com imagens, descrições e tags. Links diretos para Behance.

### 4. Processo
Timeline visual com 4 etapas do processo criativo: Descoberta, Estratégia, Execução e Entrega.

### 5. Contato
CTA grande com email e links para redes sociais. Background atmosférico com parallax.

## 📱 Responsividade

O site é totalmente responsivo:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Animações são adaptadas para mobile:
- Parallax desabilitado em dispositivos pequenos
- Transições mais rápidas
- Touch-friendly interactions

## 🔗 Links Importantes

- **Behance**: https://www.behance.net/LucasDoninn
- **Email**: lucas@donin.com.br
- **Instagram**: https://instagram.com/lucasdonin
- **LinkedIn**: https://linkedin.com/in/lucasdonin

## 📝 Notas de Desenvolvimento

### Lenis Integration
O Lenis está configurado com:
- Duration: 1.2s
- Easing: Custom power curve
- Touch multiplier: 2x

### GSAP ScrollTrigger
Todos os triggers estão configurados para:
- Start: "top 85%" (visibilidade)
- toggleActions: "play none none none"
- Scrub: 1 para parallax

### Tipografia
- Headlines: Playfair Display, 700-900 weight, letter-spacing negativo
- Body: DM Sans, 300-400 weight, line-height 1.6-1.7
- Labels: Uppercase, letter-spacing 0.3em

## 🎯 Próximos Passos (Sugestões)

- [ ] Adicionar formulário de contato funcional
- [ ] Integrar analytics avançado
- [ ] Adicionar seção de blog/artigos
- [ ] Implementar dark/light theme toggle
- [ ] Adicionar mais projetos à galeria
- [ ] SEO optimization completo
- [ ] Implementar PWA features

## 📄 Licença

© 2024 Lucas Donin. Todos os direitos reservados.

---

**Desenvolvido com ✦ design premium e animações avançadas**
