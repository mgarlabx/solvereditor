
/**
/* Classe para o editor de texto Solvertype  
/* Autor: Maurício Garcia, novembro/2023
/* Utiliza o KaTeX para renderizar o LaTeX (https://katex.org/)
*/

class Solvertype {

    constructor(options) {
        this.id = options.div; // id do elemento pai (div)
        this.content = options.content; // conteúdo do editor
        this.changed = false; // flag para saber se o conteúdo foi alterado
        this.callback = options.callback; // função de callback para salvar o conteúdo
        this.load();

    }

    // carrega o conteúdo do editor no elemento pai (div)
    load() {
        let renderedContent = this.render(this.content);
        let tx = `

        <div class="solvertype-text" id="solvertype-text-${this.id}">
            <div class="solvertype-text-buttons">
                <button class="solvertype-text-button" id="solvertype-text-edit-${this.id}" title="Editar">&#9998;</button>
            </div>
            <div id="solvertype-text-body-${this.id}">${renderedContent}</div>
         </div>
 
         <div class="solvertype-input" id="solvertype-input-${this.id}">
             <div class="solvertype-input-buttons">
                <div class="solvertype-input-buttons-left">
                    <button class="solvertype-input-button" id="solvertype-input-bold-${this.id}" title="Negrito"><b>B</b></button>
                    <button class="solvertype-input-button" id="solvertype-input-italic-${this.id}" title="Itálico"><i>I</i></button>
                    <button class="solvertype-input-button" id="solvertype-input-underline-${this.id}" title="Itálico"><u>U</u></button>
                    <button class="solvertype-input-button" id="solvertype-input-superscript-${this.id}" title="Superescrito"><sup>x</sup></button>
                    <button class="solvertype-input-button" id="solvertype-input-subscript-${this.id}" title="Subescrito"><sub>x</sub></button>
                    <div class="solvertype-input-button-separator"></div>                   
                    <button class="solvertype-input-button" id="solvertype-input-clear-${this.id}" title="Remove formatações">&#9938;</button>
                    <div class="solvertype-input-button-separator"></div>
                    <div>
                        <button class="solvertype-input-button" id="solvertype-input-symbol-${this.id}" title="Símbolos">&beta;</button>
                        <div class="solvertype-input-symbols" id="solvertype-input-symbols-${this.id}"></div>
                    </div>
                    <div>
                        <button class="solvertype-input-button" id="solvertype-input-latex-${this.id}" title="LaTeX">&Sqrt;</button>
                        <div class="solvertype-input-latexs" id="solvertype-input-latexs-${this.id}"></div>
                    </div>
                    <button class="solvertype-input-button" id="solvertype-input-image-${this.id}" title="Imagens">&#9824;</button>
                    <input type="file" id="solvertype-upload-${this.id}" accept="image/*" style="display: none;" />

                </div>
                <div class="solvertype-input-buttons-right">
                    <button class="solvertype-input-button" id="solvertype-input-close-${this.id}" title="Fechar">X</button>
                </div>
             </div>
             <div class="solvertype-input-body" id="solvertype-input-body-${this.id}" contenteditable="true">${this.content}</div>
         </div>
         `;

        // Carrega o conteúdo no elemento pai (div)
        document.getElementById(this.id).innerHTML = tx;

        // Esconde o input do editor, para exibir apenas o texto com o botão de editar
        document.getElementById(`solvertype-input-${this.id}`).style.display = 'none';

        // Muda o status de "changed" quando o conteúdo é alterado
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('keyup', () => this.change());

        // Não permite que o usuário cole um texto formatado
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('paste', (e) => this.paste(e));

        // Fecha o menu se clicar
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('mousedown', (e) => this.closeMenus());

        // Botões do editor
        document.getElementById(`solvertype-text-edit-${this.id}`).addEventListener('click', () => this.edit());
        document.getElementById(`solvertype-input-bold-${this.id}`).addEventListener('click', () => this.format('B'));
        document.getElementById(`solvertype-input-italic-${this.id}`).addEventListener('click', () => this.format('I'));
        document.getElementById(`solvertype-input-underline-${this.id}`).addEventListener('click', () => this.format('U'));
        document.getElementById(`solvertype-input-superscript-${this.id}`).addEventListener('click', () => this.format('P'));
        document.getElementById(`solvertype-input-subscript-${this.id}`).addEventListener('click', () => this.format('S'));
        document.getElementById(`solvertype-input-clear-${this.id}`).addEventListener('click', () => this.format('X'));
        document.getElementById(`solvertype-input-symbol-${this.id}`).addEventListener('click', () => this.symbol());
        document.getElementById(`solvertype-input-latex-${this.id}`).addEventListener('click', () => this.latex());
        document.getElementById(`solvertype-input-image-${this.id}`).addEventListener('click', () => this.image());
        document.getElementById(`solvertype-input-close-${this.id}`).addEventListener('click', () => this.close());

    }


    // edita o texto, abre o editor
    edit() {
        // fecha todos os editores e abre todos os textos
        this.closeMenus();
        const tbox = document.querySelectorAll('.solvertype-text');
        const ibox = document.querySelectorAll('.solvertype-input');
        for (let i = 0; i < ibox.length; i++) {
            tbox[i].style.display = 'block';
            ibox[i].style.display = 'none';
        }
        // fecha o texto selecionado
        document.getElementById(`solvertype-text-${this.id}`).style.display = 'none';
        // abre o editor selecionado
        document.getElementById(`solvertype-input-${this.id}`).style.display = 'block';
    }

    // remove formatações ao colar um texto
    paste(e) {
        this.closeMenus();
        e.preventDefault();
        let text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
        this.changed = true;
    }

    //formatações do texto
    format(op) {
        this.closeMenus();
        if (op == 'B') {
            document.execCommand('bold');
        } else if (op == 'I') {
            document.execCommand('italic');
        } else if (op == 'U') {
            document.execCommand('underline');
        } else if (op == 'P') {
            document.execCommand('superscript');
        } else if (op == 'S') {
            document.execCommand('subscript');
        } else if (op == 'X') {
            document.execCommand('removeFormat');
        }
        this.changed = true;
    }

    // símbolos
    symbol() {
        if (document.getElementById(`solvertype-input-symbols-${this.id}`).style.display == 'block') {
            this.closeMenus();
            return;
        }
        const symbols = ['&alpha;', '&beta;', '&gamma;', '&Gamma;', '&delta;', '&Delta;', '&epsilon;', '&theta;', '&Theta;', '&lambda;', '&Lambda;', '&mu;', '&nu;', '&xi;', '&pi;', '&sigma;', '&Sigma;', '&tau;', '&phi;', '&Phi;', '&psi;', '&Psi;', '&omega;', '&Omega;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&rArr;', '&hArr;', '&#8596;', '&#8629;', '&forall;', '&part;', '&exist;', '&nabla;', '&isin;', '&ni;', '&sum;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&ne;', '&#8804;', '&#8805;', '&equiv;', '&lt;', '&gt;', '&#8773;', '&#8776;', '&plusmn;', '&times;', '&divide;', '&amp;', '&sub;', '&sup;', '&sube;', '&supe;', '&perp;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&#171;', '&#187;', '&dagger;', '&Dagger;', '&permil;', '&lsaquo;', '&rsaquo;', '&not;', '&pound;', '&sect;', '&copy;', '&reg;', '&#8482;', '&micro;', '&para;', '&Oslash;', '&oslash;', '&#185;', '&sup2;', '&sup3;', '&frac14;', '&frac12;', '&frac34;', '&deg;', '&#186;', '&#170;', '&#191;', '&#161;', '&#8709;', '&#8713;', '&#8836;', '&#8853;', '&#8855;', '&#338;', '&#339;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'];
        let tx_symbols = '';
        let r = 0
        for (let i = 0; i < symbols.length; i++) {
            tx_symbols += `<button class="solvertype-input-symbol" value="${symbols[i]}">${symbols[i]}</button>`;
            if (r < 9) {
                r = r + 1;
            }
            else {
                tx_symbols += '<br>';
                r = 0;
            }
        }
        document.getElementById(`solvertype-input-symbols-${this.id}`).innerHTML = tx_symbols;
        document.getElementById(`solvertype-input-symbols-${this.id}`).style.display = 'block';
        document.getElementById(`solvertype-input-latexs-${this.id}`).style.display = 'none';
        const cbox = document.querySelectorAll('.solvertype-input-symbol');
        for (let i = 0; i < cbox.length; i++) {
            cbox[i].addEventListener("click", e => {
                document.execCommand('insertText', false, e.target.value);
                this.changed = true;
                document.getElementById(`solvertype-input-symbols-${this.id}`).style.display = 'none';
            });
        }
    }

    // LaTeX
    latex() {
        if (document.getElementById(`solvertype-input-latexs-${this.id}`).style.display == 'block') {
            this.closeMenus();
            return;
        }
        const latexs = ['L', '&#189;', '&plusmn;', '&radic;', '&#8731;', '&#775;', '&#803;', '&plusb;'];
        const latexs_values = ['[latex][/latex]', '\\frac{1}{2}', '\\pm', '\\sqrt{x}', '\\sqrt[3]{x}', '^', '_', '\\begin{bmatrix}a&b\\\\c&d\\\\e&f\\end{bmatrix}'];
        const latexs_titles = ['[latex][/latex]', 'Fração', 'Mais ou menos', 'Raiz quadrada', 'Raiz cúbica', 'Superescrito', 'Subescrito', 'Matriz'];
        let tx_latexs = '';
        let r = 0
        for (let i = 0; i < latexs.length; i++) {
            tx_latexs += `<button class="solvertype-input-latex" value="${latexs_values[i]}" title="${latexs_titles[i]}">${latexs[i]}</button>`;
            if (r < 9) {
                r = r + 1;
            }
            else {
                tx_latexs += '<br>';
                r = 0;
            }
        }
        document.getElementById(`solvertype-input-latexs-${this.id}`).innerHTML = tx_latexs;
        document.getElementById(`solvertype-input-latexs-${this.id}`).style.display = 'block';
        document.getElementById(`solvertype-input-symbols-${this.id}`).style.display = 'none';
        const cbox = document.querySelectorAll('.solvertype-input-latex');
        for (let i = 0; i < cbox.length; i++) {
            cbox[i].addEventListener("click", e => {
                document.execCommand('insertText', false, e.target.value);
                this.changed = true;
                document.getElementById(`solvertype-input-latexs-${this.id}`).style.display = 'none';
            });
        }
    }

    // renderiza o LaTeX usando o KaTeX
    render(str) {
        return str.replace(/\[latex\](.*?)\[\/latex\]/g, (match, latex) => {
            let ret = latex;
            ret = ret.replace(/&amp;/g, '&'); // para evitar problemas com o & do KaTeX
            ret = katex.renderToString(ret, { throwOnError: false });
            return ret
        });
    }


    // carrega imagens
    image() {
        const fileInput = document.getElementById(`solvertype-upload-${this.id}`);
        fileInput.click();
        fileInput.addEventListener('change', event => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                const img = document.createElement('img');
                img.src = e.target.result;
                let imgOuterHTML = img.outerHTML;
                imgOuterHTML = imgOuterHTML.replace(/<img /g, '<img class="solvertype-input-image" ');
                let div = `<div class="solvertype-input-image-container">${imgOuterHTML}</div>`;
                document.execCommand('insertHTML', false, div);
                this.changed = true;
            };
            reader.readAsDataURL(file);
        });
    }

    // fecha o editor
    close() {
        if (this.changed) {
            if (confirm('Deseja salvar as alterações?')) {
                this.content = document.getElementById(`solvertype-input-body-${this.id}`).innerHTML;
                this.callback(this.id, this.content);
            }
            this.changed = false;
        }
        this.load();
    }

    // fecha os menus abertos
    closeMenus() {
        document.getElementById(`solvertype-input-symbols-${this.id}`).style.display = 'none';
        document.getElementById(`solvertype-input-latexs-${this.id}`).style.display = 'none';
    }

    change() {
        this.closeMenus();
        this.changed = true;
    }
}



export default Solvertype;