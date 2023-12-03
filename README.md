# Solvertype

Solvertype é um componente que permite criar um editor WYSIWYG, com formatações básicas, imagens e equações.

É feito em Javascript puro e fácil de implementar. Seu uso é livre, sem direitos autorais.

O componente está contido em dois arquivos apenas:  
`solvertype.css`  
`solvertype.js`  

mas precisa dessas dependências para equações LaTeX:

- KaTeX para renderizar o LaTeX em HTML (https://katex.org/)  
- Codecogs para renderizar o LaTeX em PNG (https://latex.codecogs.com/)  
- MathquillBasedEditor para o editor de LaTeX (https://github.com/karan101292/MathquillBasedEditor)  

Para implementar basta:

No HTML:

```
<div id="text-to-be-edited"></div>
```

No JS:

```
import Solvertype from './solvertype.js';

let content = 'Hello World <p> [latex]x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}[/latex]';

let options = {
    div: 'text-to-be-edited', // id do elemento pai (div)
    content: content, // dados a serem exibidos
    renderMethod: 'html', // método de renderização do latex (html, png ou mathml)
    callback: saveContent, // função de callback para salvar o conteúdo
    buttons: {
        paragraph: true,
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
        superscript: true,
        subscript: true,
        justifyLeft: true,
        justifyCenter: true,
        justifyRight: true,
        clear: true,
        color: true,
        symbol: true,
        latex: true,
        image: true,
        link: true,
    }
}

// Cria a nova instância
new Solvertype(options);

// Essa função é chamada quando o usuário altera e salva o conteúdo do editor
// Deve ser usada pela aplicação para salvar o conteúdo do editor no banco de dados
function saveContent(id, content) {
    console.log('id: ' + id); // id do elemento pai (div)
    console.log('content: ' + content); // conteúdo do editor
}

```
