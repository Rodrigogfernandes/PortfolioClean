# 📜 Lista de Tarefas (To-Do List)

<div align="center">

![ToDoList Demo](assets/img/ToDoList.gif)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[![rodrigodev.net](https://img.shields.io/badge/rodrigodev.net-gree?style=for-the-badge&logo=rodrigodev&logoColor=white)](https://www.rodrigodev.net/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rodrigogfernandes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rodrigogfernandes/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rodrigogfernandes1/)



</div>

## 📋 Sobre o Projeto

Aplicação web moderna de gerenciamento de tarefas desenvolvida com HTML, CSS e JavaScript puro. Oferece uma interface intuitiva e responsiva com persistência de dados através do LocalStorage do navegador, garantindo que suas tarefas não sejam perdidas mesmo após fechar o navegador.

## ✨ Funcionalidades

- ✅ **Adicionar Tarefas**: Crie novas tarefas de forma rápida e intuitiva
- 🎯 **Marcar como Concluída**: Clique no checkbox para marcar/desmarcar tarefas
- 🗑️ **Excluir Tarefas**: Remova tarefas que não são mais necessárias
- 🔍 **Filtros Inteligentes**: Visualize todas, apenas ativas ou apenas concluídas
- 📊 **Estatísticas em Tempo Real**: Acompanhe o total de tarefas, ativas e concluídas
- 💾 **Persistência de Dados**: Todas as tarefas são salvas automaticamente no LocalStorage
- 🎨 **Interface Moderna**: Design com efeito glassmorphism e animações suaves
- 📱 **Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com gradientes, glassmorphism e animações
- **JavaScript (Vanilla)**: Lógica da aplicação sem dependências externas
- **LocalStorage API**: Persistência de dados no navegador

## 🚀 Como Usar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (opcional, mas recomendado)

### Instalação

1. Clone o repositório ou baixe os arquivos:
```bash
git clone <url-do-repositorio>
cd to_do_list
```

2. Abra o arquivo `index.html` em seu navegador ou use um servidor local:

**Com Python:**
```bash
python -m http.server 8000
```

**Com Node.js (http-server):**
```bash
npx http-server
```

**Com PHP:**
```bash
php -S localhost:8000
```

3. Acesse `http://localhost:8000` no seu navegador

### Uso Básico

1. **Adicionar Tarefa**: Digite sua tarefa no campo de entrada e pressione Enter ou clique em "Adicionar"
2. **Limpar Campo**: Use o botão "Limpar" para limpar o campo de entrada
3. **Marcar como Concluída**: Clique no círculo ao lado da tarefa
4. **Filtrar Tarefas**: Use os botões "Todas", "Ativas" ou "Finalizadas"
5. **Excluir Tarefa**: Clique no botão "Excluir" na tarefa desejada

## 📁 Estrutura do Projeto

```
to_do_list/
│
├── index.html              # Estrutura principal da aplicação
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos e animações
│   ├── js/
│   │   └── script.js      # Lógica da aplicação
│   └── img/
│       └── ToDoList.gif   # Demonstração visual
└── README.md              # Documentação do projeto
```

## 🎯 Características Técnicas

### Arquitetura

- **Vanilla JavaScript**: Sem frameworks ou bibliotecas externas
- **Modular**: Código organizado em funções específicas
- **Event-Driven**: Utiliza event listeners para interatividade
- **State Management**: Gerencia estado através de arrays e LocalStorage

### Funcionalidades Implementadas

- **CRUD Completo**: Create, Read, Update, Delete de tarefas
- **Filtragem Dinâmica**: Filtros que atualizam a visualização em tempo real
- **Ordenação Inteligente**: Tarefas ativas aparecem primeiro, seguidas pelas concluídas
- **Validação de Entrada**: Previne adição de tarefas vazias
- **Feedback Visual**: Animações e transições para melhor UX

### Persistência

- Utiliza `localStorage` do navegador
- Dados são salvos automaticamente após cada operação
- Estrutura de dados: Array de objetos com `id`, `text` e `completed`

## 🎨 Design

O projeto utiliza um design moderno com:

- **Glassmorphism**: Efeito de vidro fosco com `backdrop-filter`
- **Gradientes**: Paleta de cores roxa/azul moderna
- **Animações**: Transições suaves e animações de entrada
- **Responsividade**: Layout adaptável a diferentes tamanhos de tela
- **Acessibilidade**: Contraste adequado e elementos interativos bem definidos

## 🔮 Melhorias Futuras

- [ ] Edição inline de tarefas
- [ ] Drag and drop para reordenar tarefas
- [ ] Categorias/etiquetas para tarefas
- [ ] Data de vencimento e lembretes
- [ ] Exportar/importar tarefas (JSON)
- [ ] Modo escuro/claro
- [ ] Busca de tarefas
- [ ] Sincronização com backend (opcional)
- [ ] Suporte a múltiplas listas
- [ ] Notificações do navegador

## 📝 Notas de Desenvolvimento

### Decisões Técnicas

- **LocalStorage**: Escolhido por simplicidade e para funcionar offline
- **Vanilla JS**: Sem dependências para facilitar manutenção e performance
- **CSS Puro**: Sem pré-processadores para manter o projeto simples
- **IDs únicos**: Uso de `Date.now()` para gerar IDs únicos

### Performance

- Renderização eficiente com `innerHTML` e template strings
- Filtragem e ordenação otimizadas
- Operações de LocalStorage são síncronas mas rápidas para este caso de uso

## 👨‍💻 Autor

<div align="center">

**Rodrigo Guedes Fernandes**

[![rodrigodev.net](https://img.shields.io/badge/rodrigodev.net-gree?style=for-the-badge&logo=rodrigodev&logoColor=white)](https://www.rodrigodev.net/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rodrigogfernandes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rodrigogfernandes/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rodrigogfernandes1/)


Desenvolvedor Full Stack especializado em tecnologias web modernas.

</div>

---


## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript**

