# **📋 CRUD Completo com Processos Trabalhistas + Campos Financeiros**

## **🎯 Objetivo do Projeto**

Este projeto tem como objetivo construir uma interface moderna e interativa para cadastro, listagem, edição e exclusão de processos trabalhistas. A aplicação demonstra boas práticas com React, TypeScript, gerenciamento de estado com Hooks, estilização com TailwindCSS, consumo de API local com JSON Server, e feedback visual com Toasts personalizados.

## **🌐 Consumo da API**

A aplicação consome uma API local simulada com JSON Server (`http://localhost:3001/processos`) utilizando Axios.:

```typescript
const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getProcessos = () => api.get<Processo[]>("/processos");
export const createProcesso = (novo: Processo) => api.post("/processos", novo);
export const updateProcesso = (id: number, atualizado: Processo) =>
  api.put(`/processos/${id}`, atualizado);
export const deleteProcesso = (id: number) => api.delete(`/processos/${id}`);
```

## **Fluxo de carregamento:**

- Requisição: Feita com axios.get() dentro de useEffect

- Armazenamento: Dados salvos com useState

- Atualização: Ações de adicionar/editar/deletar com atualização automática

- Feedback: Toasts personalizados para sucesso ou erro

## **🛠 Tecnologias Utilizadas**

| **Tecnologia** | **Finalidade**             | **Aplicação no Projeto**                        |
| -------------- | -------------------------- | ----------------------------------------------- |
| React          | Construção da interface    | Componentização da UI                           |
| TypeScript     | Tipagem estática           | Interfaces para processos e segurança nos dados |
| TailwindCSS    | Estilização utilitária     | Tabelas, modais e responsividade                |
| Axios          | Cliente HTTP               | Consumo da API local (JSON Server)              |
| JSON Server    | Fake API REST              | Simulação do backend com dados persistentes     |
| React Toastify | Notificações visuais       | Feedback ao usuário nas ações                   |
| React Hooks    | Lógica de estado e efeitos | `useState`, `useEffect`, `useRef`, etc.         |

# 🏗 Estrutura do Projeto

```
C:.
│   db.json                 # Base de dados simulada usada pelo JSON Server
│   tailwind.config.js     # Configuração do TailwindCSS
│   tsconfig.json          # Configuração do TypeScript
│   vite.config.ts         # Configuração do Vite
│   package.json           # Dependências e scripts
│
└───src
    │   App.tsx             # Componente raiz da aplicação
    │   main.tsx            # Ponto de entrada que renderiza App
    │   index.css           # Estilos globais com Tailwind
    │
    ├───components          # Componentes reutilizáveis
    │   ├── CardTotais.tsx       # Card com totais financeiros
    │   ├── ModalProcesso.tsx    # Modal de cadastro/edição
    │   └── TabelaProcessos.tsx  # Tabela de exibição dos processos
    │
    ├───services
    │   └── api.ts          # Arquivo com funções Axios para consumir a API
    │
    └───types
        └── Processo.ts     # Interface que define o tipo Processo


```

# **✨ Funcionalidades Implementadas**

**📋Tabela de Processos**

- Exibe informações completas sobre cada processo.

- Botões para editar e excluir.

- Estilizada com Tailwind e responsiva.

**🔍 Modal de Cadastro/Edição**

- Modal controlado via estado.

- Formulário validado com campos obrigatórios.

- Utiliza onChange e useState para inputs controlados.

**💰 Cards de Totais Financeiros**

- Soma e exibe:
  - Total de Depósitos (Judicial + Recursal)
  - Total de Valores Levantados
- Formatados como moeda brasileira com .toLocaleString("pt-BR")

**📢 Toasts Personalizados com React Toastify**

- Toasts de sucesso, erro e feedback.
- Estilizados com ícones visuais.
- Exibidos ao cadastrar, editar, excluir ou em caso de erro.

**🎨 Estilização com TailwindCSS**

**Tabela:**
rounded-lg shadow-md para bordas arredondadas e sombra

**bg-gray-700** para cabeçalho escuro

**hover:** bg-gray-600 para feedback visual nas linhas

**Modal:**
bg-gray-800 para fundo escuro

**backdrop-blur-sm** para efeito de desfoque

**border border-gray-700** para bordas sutis

## 🧠 Tecnologias e Conceitos Utilizados

| 🛠 **Tecnologia**   | 📌 **O que faz?**                          | 🚀 **Como usamos no projeto?**        |
| ------------------ | ------------------------------------------ | ------------------------------------- |
| **ReactJS**        | Cria interfaces dinâmicas e reativas       | Tabela, modal, cards, estados         |
| **TypeScript**     | Garante tipos nos dados e funções          | Interface `Processo`                  |
| **TailwindCSS**    | Estilização rápida com classes utilitárias | Tabela, modal, responsividade         |
| **Axios**          | Cliente HTTP para requisições              | CRUD com a API JSON Server            |
| **React Toastify** | Feedback visual com notificações           | Notificações de sucesso/erro          |
| **useState**       | Armazena dados e controles locais          | Lista de processos, modal, formulário |
| **useEffect**      | Efeito ao montar componentes               | Carrega dados da API ao iniciar       |
| **useRef**         | Referência para elementos do DOM           | Foco automático no input do modal     |

## **🚀 Como Executar**

**1️⃣ Clone o repositório e instale as dependências:**

```
npm install
```

**2️⃣ Rode o JSON Server para simular a API:**

```
npx json-server --watch db.json --port 3001

```

**3️⃣ Inicie o servidor de desenvolvimento:**

```
npm run dev

```

**4️⃣ Acesse no navegador:**

```
http://localhost:5173

```

**5️⃣ Deixe os dois servidores rodando em terminais separados:**

```
- JSON Server: http://localhost:3001

- React App: http://localhost:5173

```

📦 Instalação:

```
npm install axios

```

## **📌 Componentes Principais**

**TabelaProcessos.tsx**

- Recebe os dados como props

- Renderiza uma tabela com botões de ação

- Chama as funções de editar e excluir

**ModalProcesso.tsx**

- Controla abertura e fechamento

- Formulário de criação/edição

- Faz submit com validação

**CardTotais.tsx**

- Recebe a lista de processos

- Calcula os totais financeiros

- Exibe os valores com formatação

## 📊 Estrutura dos Dados

Os usuários seguem esta estrutura:

```
export interface Processo {
  id: number;
  numero: string;
  reclamante: string;
  reclamada: string;
  status: "Em andamento" | "Encerrado";
  valorCausa: number;
  depositoJudicial: number;
  depositoRecursal: number;
  valorLevantado: number;
  dataAjuizamento: string;
  cidade: string;
  uf: string;
  vara: string;
}

```

## **✅ Conclusão**

Este projeto demonstra como construir um CRUD completo com React + TypeScript, integrando:

✅ Consumo de API REST com Axios

✅ Estrutura tipada com segurança (TypeScript)

✅ Interface moderna com TailwindCSS

✅ Notificações com Toastify

✅ Componentização e reutilização de lógica com Hooks

# 🚀 Guia Rápido de React Hooks

Este documento apresenta um resumo prático dos principais **React Hooks**, com explicações simples e exemplos comuns de uso.

---

## 🔧 O que são Hooks?

Hooks são funções do React que permitem usar **estado**, **efeitos colaterais**, **referências**, **contexto** e muito mais em componentes funcionais — sem precisar de classes.

---

## 📋 Tabela Resumo dos Principais Hooks

| Hook          | Para que serve                                  | Exemplo comum                                                             |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| `useState`    | Armazenar e atualizar valores de estado         | Abrir/fechar modal, armazenar dados de formulários                        |
| `useEffect`   | Executar efeitos colaterais após a renderização | Fazer requisições HTTP, configurar timers, sincronizar com o localStorage |
| `useRef`      | Criar uma referência para elementos ou valores  | Focar automaticamente em um input ao renderizar                           |
| `useContext`  | Compartilhar dados entre vários componentes     | Controlar tema da aplicação, idioma, ou dados do usuário logado           |
| `useMemo`     | Memorizar valores computados                    | Evitar recalcular listas ou valores pesados toda renderização             |
| `useCallback` | Memorizar funções para evitar recriação         | Otimizar performance ao passar funções para componentes filhos            |

---

## 📌 Dica

Utilize os Hooks para:

✅ Separar lógica da interface  
✅ Reutilizar comportamentos em diferentes componentes  
✅ Melhorar performance e previsibilidade  
✅ Trabalhar de forma moderna com componentes funcionais no React

---

# 🚀 Guia Rápido de axios

🔗 O que é o Axios?
Axios é uma biblioteca que facilita fazer requisições HTTP (GET, POST, PUT, DELETE, etc.) em aplicações web — geralmente para consumir APIs ou enviar dados para o backend.

## 🚀 Por que usar o Axios?

| ✅ Vantagem                 | 📌 Descrição                                                                  |
| --------------------------- | ----------------------------------------------------------------------------- |
| Sintaxe mais limpa          | Requisições com menos código e mais legibilidade                              |
| JSON automático             | Converte a resposta para JSON automaticamente (não precisa `res.json()`)      |
| Tratamento de erros         | Mais fácil de capturar e entender os erros com `.catch()`                     |
| Suporte a `baseURL`         | Permite configurar uma URL base para todas as requisições                     |
| Interceptadores             | Possibilidade de interceptar requisições e respostas (útil para autenticação) |
| Cancelamento de requisições | Nativo com `CancelToken`, útil em componentes desmontados                     |
| Compatível com o backend    | Envia cabeçalhos e dados no formato correto, como `Content-Type` automático   |

> 💡 **Dica Rápida:** Prefira usar `axios` com `baseURL` configurada para evitar repetição de URLs e deixar o código mais limpo.

> ✅ **Bônus:** Crie um arquivo separado (ex: `api.ts`) para configurar o `axios`. Isso centraliza as requisições e facilita a manutenção do projeto.

Feito com 💙 por Ayumi Muraki
