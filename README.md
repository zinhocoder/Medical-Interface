# Sistema de Prontuário Médico - Futurisaude

![Futurisaude Logo](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Futurisaude%201-pP7JOFFUOk01nQAzAy95n6XV2VFGEQ.svg)

Um sistema moderno de prontuário médico desenvolvido com Next.js, React e Tailwind CSS. Esta aplicação permite aos profissionais de saúde gerenciar consultas, prescrições médicas, documentação e histórico de pacientes em uma interface intuitiva e responsiva.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Desenvolvimento](#desenvolvimento)
- [Testes](#testes)
- [Build e Deploy](#build-e-deploy)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Solução de Problemas](#solução-de-problemas)
- [Licença](#licença)

## Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior (ou yarn/pnpm)
- Git

## Instalação

1. Clone o repositório:

\`\`\`bash
git clone https://github.com/zinhocoder/Medical-Interface.git
cd medical-interface
\`\`\`

2. Instale as dependências:

\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`


## Execução

Para executar o projeto em ambiente de desenvolvimento:

\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

# ou
Diretamente pelo deploy [https://medical-interface-1je9.vercel.app/]

## Desenvolvimento

### Padrões de Código

- Utilize ESLint para manter a consistência do código:

\`\`\`bash
npm run lint
\`\`\`

- Formate o código com Prettier:

\`\`\`bash
npm run format
\`\`\`

### Fluxo de Trabalho Git

1. Crie uma branch para sua feature:

\`\`\`bash
git checkout -b feature/nome-da-feature
\`\`\`

2. Faça commits frequentes e descritivos:

\`\`\`bash
git commit -m "Adiciona funcionalidade X"
\`\`\`

3. Faça push da sua branch e crie um Pull Request.

## Testes

Execute os testes unitários:

\`\`\`bash
npm run test
\`\`\`

Para testes de integração:

\`\`\`bash
npm run test:integration
\`\`\`

Para cobertura de testes:

\`\`\`bash
npm run test:coverage
\`\`\`

## Build e Deploy

Para construir o projeto para produção:

\`\`\`bash
npm run build
\`\`\`

Para iniciar a versão de produção:

\`\`\`bash
npm start
\`\`\`


## Estrutura do Projeto

\`\`\`
medicalinterface2121/
├── app/                  # Diretório principal do Next.js App Router
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal da aplicação
│   └── page.tsx          # Importa o componente com carregamento dinâmico para evitar problemas de SSR
├── components/           # Componentes React reutilizáveis
│   ├── medical-interface.tsx
│   ├── DocumentationModal.tsx
│   ├── MainContent.jsx
│   ├── PatientSummary.jsx
│   ├── PrescriptionModal.tsx
│   ├── ProntuarioSection.jsx
│   ├── Sidebar.jsx
│   ├── theme-provider.tsx
│   ├── Timeline.jsx
│   └── TimelineEntry.jsx
├── css/                  # Estilos CSS específicos de componentes
├── App.jsx               # Componente Principal do App (para uso sem Next.js)
├── tailwind.config.js    # Configuração do Tailwind CSS
└── README.md             # Este arquivo
\`\`\`

## Funcionalidades

- **Gerenciamento de Prontuários**: Visualização e edição de prontuários médicos
- **Cronômetro de Consulta**: Controle do tempo de atendimento
- **Prescrições Médicas**: Criação e impressão de prescrições
- **Documentação Médica**: Geração de atestados e outros documentos
- **Timeline de Atendimentos**: Histórico de consultas do paciente
- **Impressão de Documentos**: Exportação de prontuários e documentos para impressão

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **React**: Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Biblioteca de ícones
- **shadcn/ui**: Componentes de UI reutilizáveis
- **Jest**: Framework de testes
- **ESLint**: Ferramenta de linting para JavaScript
- **Prettier**: Formatador de código

## Solução de Problemas

- **Problema de instalação de dependências**: Tente limpar o cache do npm (\`npm cache clean --force\`) e reinstale as dependências.
- **Erros de compilação**: Verifique se todas as dependências estão atualizadas e se as versões são compatíveis.
- **Problemas de renderização**: Limpe o cache do navegador e reinicie o servidor de desenvolvimento.

Para mais informações, consulte a [documentação oficial do Next.js](https://nextjs.org/docs).
