# ROX BJJ Planalto - Landing Page

Esta é a documentação do projeto da landing page para a academia **ROX BJJ Planalto**. O site foi desenvolvido com foco em conversão constante (geração de leads via WhatsApp), utilizando um design moderno, responsivo e de alta performance voltado para o universo das artes marciais.

## 🎯 Objetivo do Projeto

Criar uma página web institucional e focada em vendas para atrair novos alunos (desde iniciantes até formados e competidores) para a academia de Jiu-Jitsu, localizada no bairro Planalto, Natal/RN. Todo o design e estrutura da página reforçam os atributos da marca: excelência, disciplina, segurança e alta performance ("Really On Excellence").

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando apenas tecnologias front-end nativas (Vanilla), o que confere ao site carregamento extremamente rápido e facilidade de manutenção (sem dependências).
- **HTML5**: Estrutura limpa, padronizada e semanticamente acessível.
- **CSS3**: Estilização que explora ferramentas modernas como Variáveis (Custom Properties), Flexbox, CSS Grid, Media Queries para responsividade e animações (keyframes, transitions).
- **JavaScript**: Lógica assíncrona focada unicamente na UI: Intersection Observer (para revelar elementos dinamicamente quando entram na tela) e reatividade de scroll para a barra de navegação.
- **Google Fonts**: `Oswald` para títulos e botões (comunica impacto e robustez) e `Inter` para o corpo de texto (priorizando clareza em dispositivos móveis).
- **Boxicons**: Integração de iconografia leve em formato vetorial.

## 📂 Estrutura de Arquivos

A organização do projeto segue uma estrutura base clássica para sites focados em "Single Page":
- `index.html`: Toda a base de conteúdo texto/chamadas, separada nitidamente por tags semânticas `<section>`.
- `style.css`: A folha de estilo principal ditando as variáveis de marca, layouts modulares, utilitários, animações e regras responsivas.
- `script.js`: O motor responsável pelos micro-comportamentos (fade-in, transição da navbar bar ao rolar a página).
- `assets/images/`: O diretório onde são mantidas as as imagens do projeto baseadas nas referências do design.

## 🎨 Design System e Identidade Visual

O site utiliza uma abordagem **Dark UI** com destaques estratégicos brilhantes e fortes para transmitir agressividade controlada.

### Paleta de Cores Base (Variáveis CSS)
- **Vermelho Primário (Botões/Destaques/Diferenciais)**: `#dc2626`
- **Vermelho Secundário (Hover de Botões)**: `#b91c1c`
- **Background Primário**: `#0a0a0a`
- **Background Alternativo (Para criar intercalação de seções)**: `#050505`
- **Background de Elementos e Cards**: `#141414`
- **Texto Primário**: `#f3f4f6` (branco sutil, menos fadiga ocular)
- **Texto Secundário (Bases Informacionais)**: `#9ca3af`

### Sombras e Filtros Especiais
- Uso extensivo de **Glassmorphism** na navbar (`backdrop-filter: blur(10px)`) permitindo uma leitura luxuosa combinada ao header que se mescla à Hero section.
- **Sombras temáticas (`shadow-red`)**: Elementos visuais como fotos em destaque e os steps recebem um resplendor avermelhado em vez de uma sombra preta convencional, criando coerência de identidade.

## 🧩 Estrutura da Página

1. **Header (Navegação Fixa)**: Menu e logo flutuantes sempre acessíveis, com CTA direto para o WhatsApp.
2. **Hero Section (`#home`)**: Capa da página de conversão. Fundo mesclado com gradiente enegrecido para garantir total leitura do "Pitch" principal da academia. Animação nas opções para engajar a escolha (`pulse-anim`).
3. **Prova Social e Metodologia (`#sobre`)**: Explicação do significado do nome da academia interlaçada com ícones destacando as premissas como crescimento e excelência e acolhimento em uma estrutura "Split-Layout" e foto destacada. 
4. **Para Quem É (`#para-quem`)**: O grid quebra objeções, mostrando claramente que não há limite de idade, gênero ou biotipo para o início dos treinos.
5. **Como Funciona (`#como-funciona`)**: Infográfico dinâmico (step-by-step) explicitando quão curto é o caminho até colocar o kimono pela primeira vez.
6. **Diferenciais da Metodologia (`#diferenciais`)**: Destaque extra sobre espaço, grade de horários, didática e infraestrutura física separada por iconografias (`.diff-list`).
7. **Pacotes e Mensalidades (`#planos`)**: Interface visual no modelo "SaaS Pricing" que foca no pacote "Mais Popular" de forma destacada e flutuante, encorajando compras por valor percebido sem esconder a opção gratuita ("Experimental").
8. **Localização Geográfica (`#localizacao`)**: iFrame nativo com o polígono apontado para o Planalto via Google Maps nativo.
9. **Final CTA (`#contato`) & Footer**: Para usuários que consumiram a landing page por completo, a isca recomeça focada no pilar mestre (Atendimento agilizado).
10. **Botão Fixo de Contato Rápido (`whatsapp-float`)**: Persiste no canto inferior visual do usuário durante os 100% da navegação, independente da scrollbar.

## ✨ Comportamentos Interativos Customizados (JS + CSS)

- **Intersection Observer Engine**: Praticamente 80% do conteúdo textal e fotográfico conta com o sufixo de classe `.reveal` (e seus temporizadores modulares `delay-100/200/300/400`). Eles começam fora do viewport, em invisibilidade e ligeiramente jogados no eixo Y positivo. Conforme detectados na tela cruzando a viewport intersecção margin-bottom, ganham a classe de estado `.active`.
- **Pulsação infinita**: A classe `@keyframes pulse` usa transformações nativas focadas na GPU e um truque de manipulação Box-Shadow Opacity em spread para focar continuamente a atenção nos botões de marcação experimental.

## 📱 Web Responsividade Profunda (Media Queries)

Regras lógicas criadas progressivamente de fora para dentro (Desktop-first):
- **Telas menores ou iguais a 992px**: Layouts laterais (`split-layout`) quebram a lateralidade mudando a propriedade do Grid para 1 coluna vertical com folgas. Os grids dos cartões de pacotes perdem o lado a lado priorizando o destaque (`Mais Popular`) com margens centralizadas seguras.
- **Tablets e Smartphone Standard (<= 768px)**: Centralização estrita total da `hero header`, expansão de links (`100% width button blocks`) para atingir zonas fáceis de clique (`Thumb-friendly`). Passos horizontais (`como funciona`) viram cartões de blocos sequenciais verticais e as setas giram 90 graus simulando direcionamento decrescente.
- **Smartphones Compactos (<= 480px)**: A navbar oculta completamente o CTA lateral fixo para focar na marca gráfica em espaço apertado. Menus e botões float já substituem a ação visual que foi retraída na topbar inteligentemente.

## 🚀 Como Executar Localmente

Basta clicar duas vezes em `index.html` caso queira ver primariamente e rápido ou usar via `Live Server` em seu editor/IDE. Se python estiver ativo no Terminal: `python3 -m http.server 8000` na pasta. O projeto é de base modular zero-dependency.


