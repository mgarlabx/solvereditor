/**
 * Esse arquivo é um exemplo de como usar o editor Solvertype.
 * Ele cria 6 editores Solvertype com dados diferentes.
 * Devem ser usados pela aplicação para exibir e editar os dados.
 * O componente Solvertype se ajusta ao tamanho (width e height) do elemento pai (div).
 * O componente Solvertype está nos arquivos solvertype.js e solvertype.css.
 */

import Solvertype from './solvertype.js';

// Exemplo de dados para serem exibidos 
let data = [
    `
        [latex]\\begin{pmatrix} a \& b \\\\ c \& d \\end{pmatrix}[/latex]

        <p>
        Essa é a equação de Bhaskara: [latex]x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}[/latex]. Ela é usada para resolver as equações de segundo grau, também conhecidas como equações quadráticas.<p>
        Aqui temos uma fórmula que envolve binomiais e frações: [latex]\\binom{n}{k} = \\frac{n!}{k!(n-k)!}[/latex]. Tem suas particularidades.<p>
        Essa é uma equação complexa:<p> [latex]S(\\omega) \\frac{\\alpha g^2}{\\omega^5} e^{[ -0.74\\bigl\\{\\frac{\\omega U_\\omega 19.5}{g}\\bigr\\}^{\\!-4}\\,]}\\frac{\\alpha g^2}{\\omega^5} \\exp\\Bigl[ -0.74\\Bigl\\{\\frac{\\omega U_\\omega 19.5}{g}\\Bigr\\}^{\\!-4}\\,\\Bigr][/latex].<p>
    `,

    `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,

    `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>
    `,

    `
        Iabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,

    `
        Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,

    `
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
];

// Cria objetos Solvertype com os dados acima
// O objeto Solvertype se ajusta ao tamanho (width e height) do elemento pai (div)
let texts = [6];
for (let i = 0; i < 6; i++) {
    let options = {
        div: 'main-text-' + i, // id do elemento pai (div)
        content: data[i], // dados a serem exibidos
        callback: saveContent, // função de callback para salvar o conteúdo
    }
    texts[i] = new Solvertype(options);
}

// Essa função é chamada quando o usuário altera e salva o conteúdo do editor
// Deve ser usada pela aplicação para salvar o conteúdo do editor no banco de dados
function saveContent(id, content) {
    //console.log('id: ' + id); // id do elemento pai (div)
    //console.log('content: ' + content); // conteúdo do editor
}
