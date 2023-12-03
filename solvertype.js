
/**
/* Classe para o editor de texto Solvertype  
/* Autor: Maurício Garcia, novembro/2023
/* Utiliza o KaTeX para renderizar o LaTeX em HTML (https://katex.org/)
/* Utiliza o Codecogs para renderizar o LaTeX em PNG (https://latex.codecogs.com/)
/* Utiliza o MathquillBasedEditor para o editor de LaTeX (https://github.com/karan101292/MathquillBasedEditor)
*/



class Solvertype {

    constructor(options) {
        this.id = options.div; // id do elemento pai (div)
        this.content = options.content; // conteúdo do editor
        this.changing = false; // flag para saber se o conteúdo está sendo alterado
        this.changed = false; // flag para saber se o conteúdo foi alterado
        this.callback = options.callback; // função de callback para salvar o conteúdo
        this.renderMethod = options.renderMethod; // opção para renderizar o LaTeX (HTML ou PNG)
        this.mathEditor = null; // editor de LaTeX
        this.buttons = options.buttons; // botões do editor
        this.load(); // carrega o conteúdo do editor no elemento pai (div)
    }

    // carrega o conteúdo do editor no elemento pai (div)
    load() {
        let renderedContent = this.render(this.content);
        let tx = `

        <div class="solvertype-text" id="solvertype-text-${this.id}">
            <div class="solvertype-text-buttons">
                <button class="solvertype-text-button" id="solvertype-text-edit-${this.id}" title="Editar"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </div>
            <div id="solvertype-text-body-${this.id}">${renderedContent}</div>
         </div>
 
         <div class="solvertype-input" id="solvertype-input-${this.id}">
             <div class="solvertype-input-buttons">
                <div class="solvertype-input-buttons-left">
                    <div><select class="solvertype-input-paragraph" id="solvertype-input-paragraph-${this.id}">
                        <option>Paragraph</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                        <option>Heading 3</option>
                    </select></div>
                    <button class="solvertype-input-button" id="solvertype-input-bold-${this.id}" title="Negrito"><i class="fa fa-bold" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-italic-${this.id}" title="Itálico"><i class="fa fa-italic" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-underline-${this.id}" title="Itálico"><i class="fa fa-underline" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-strikethrough-${this.id}" title="Tachado"><i class="fa fa-strikethrough" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-superscript-${this.id}" title="Superescrito"><i class="fa fa-superscript" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-subscript-${this.id}" title="Subescrito"><i class="fa fa-subscript" aria-hidden="true"></i></button>
                    <div class="solvertype-input-button-separator"></div>                   
                    <button class="solvertype-input-button" id="solvertype-input-justify-left-${this.id}" title="Esquerda"><i class="fa fa-align-left" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-justify-center-${this.id}" title="Centro"><i class="fa fa-align-center" aria-hidden="true"></i></button>
                    <button class="solvertype-input-button" id="solvertype-input-justify-right-${this.id}" title="Direita"><i class="fa fa-align-right" aria-hidden="true"></i></button>
                    <div class="solvertype-input-button-separator"></div>                   
                    <button class="solvertype-input-button" id="solvertype-input-clear-${this.id}" title="Remove formatações"><i class="fa fa-eraser" aria-hidden="true"></i></button>
                    <div class="solvertype-input-button-separator"></div>
                    <div>
                        <button class="solvertype-input-button" id="solvertype-input-color-${this.id}" title="Cores"><i class="fa fa-paint-brush" aria-hidden="true"></i> <i class="fa fa-angle-down" aria-hidden="true"></i></button>
                        <div class="solvertype-input-colors" id="solvertype-input-colors-${this.id}"></div>
                    </div>
                    <div>
                        <button class="solvertype-input-button" id="solvertype-input-symbol-${this.id}" title="Símbolos">&Omega; <i class="fa fa-angle-down" aria-hidden="true"></i></button>
                        <div class="solvertype-input-symbols" id="solvertype-input-symbols-${this.id}"></div>
                    </div>
                    <div>
                        <button class="solvertype-input-button" id="solvertype-input-latex-${this.id}" title="LaTeX">L <i class="fa fa-angle-down" aria-hidden="true"></i></button>
                        <div class="solvertype-input-latexs" id="solvertype-input-latexs-${this.id}"></div>
                    </div>
					<div>
		                <button class="solvertype-input-button" id="solvertype-input-image-${this.id}" title="Imagens"><i class="fa fa-file-image-o" aria-hidden="true"></i></button>
		                <input type="file" id="solvertype-upload-${this.id}" accept="image/*" style="display: none;" />
					</div>
                    <button class="solvertype-input-button" id="solvertype-input-link-${this.id}" title="Link"><i class="fa fa-link" aria-hidden="true"></i></button>

                </div>
                <div class="solvertype-input-buttons-right">
                    <button class="solvertype-input-button" id="solvertype-input-close-${this.id}" title="Fechar"><i class="fa fa-times" aria-hidden="true"></i></button>
                </div>
             </div>
             <div class="solvertype-input-body" id="solvertype-input-body-${this.id}" contenteditable="true">${this.content}</div>
         </div>
         `;

        // carrega o conteúdo no elemento pai (div)
        document.getElementById(this.id).innerHTML = tx;

        // esconde o input do editor, para exibir apenas o texto com o botão de editar
        document.getElementById(`solvertype-input-${this.id}`).style.display = 'none';

        // esconde os botões que não foram selecionados
        if (!this.buttons.paragraph) document.getElementById(`solvertype-input-paragraph-${this.id}`).style.display = 'none';
        if (!this.buttons.bold) document.getElementById(`solvertype-input-bold-${this.id}`).style.display = 'none';
        if (!this.buttons.italic) document.getElementById(`solvertype-input-italic-${this.id}`).style.display = 'none';
        if (!this.buttons.underline) document.getElementById(`solvertype-input-underline-${this.id}`).style.display = 'none';
        if (!this.buttons.strikethrough) document.getElementById(`solvertype-input-strikethrough-${this.id}`).style.display = 'none';
        if (!this.buttons.superscript) document.getElementById(`solvertype-input-superscript-${this.id}`).style.display = 'none';
        if (!this.buttons.subscript) document.getElementById(`solvertype-input-subscript-${this.id}`).style.display = 'none';
        if (!this.buttons.justifyLeft) document.getElementById(`solvertype-input-justify-left-${this.id}`).style.display = 'none';
        if (!this.buttons.justifyCenter) document.getElementById(`solvertype-input-justify-center-${this.id}`).style.display = 'none';
        if (!this.buttons.justifyRight) document.getElementById(`solvertype-input-justify-right-${this.id}`).style.display = 'none';
        if (!this.buttons.clear) document.getElementById(`solvertype-input-clear-${this.id}`).style.display = 'none';
        if (!this.buttons.color) document.getElementById(`solvertype-input-color-${this.id}`).style.display = 'none';
        if (!this.buttons.symbol) document.getElementById(`solvertype-input-symbol-${this.id}`).style.display = 'none';
        if (!this.buttons.latex) document.getElementById(`solvertype-input-latex-${this.id}`).style.display = 'none';
        if (!this.buttons.image) document.getElementById(`solvertype-input-image-${this.id}`).style.display = 'none';
        if (!this.buttons.link) document.getElementById(`solvertype-input-link-${this.id}`).style.display = 'none';

        // muda o status de "changed" quando o conteúdo é alterado
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('keyup', () => this.change());

        // não permite que o usuário cole um texto formatado
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('paste', (e) => this.paste(e));

        // fecha o menu se clicar
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('mousedown', (e) => this.closeMenus());

        // editar o texto
        document.getElementById(`solvertype-text-edit-${this.id}`).addEventListener('click', () => this.edit());

        // selecionar o parágrafo (p, h1, h2, h3)
        document.getElementById(`solvertype-input-paragraph-${this.id}`).addEventListener('change', () => this.paragraphSet());

        // sinaliza a opção do parágrafo selecionado (p, h1, h2, h3)
        document.getElementById(`solvertype-input-body-${this.id}`).addEventListener('mouseup', (e) => this.paragraphGet());

        // botões de formatação
        document.getElementById(`solvertype-input-bold-${this.id}`).addEventListener('click', () => this.format('B'));
        document.getElementById(`solvertype-input-italic-${this.id}`).addEventListener('click', () => this.format('I'));
        document.getElementById(`solvertype-input-underline-${this.id}`).addEventListener('click', () => this.format('U'));
        document.getElementById(`solvertype-input-strikethrough-${this.id}`).addEventListener('click', () => this.format('T'));
        document.getElementById(`solvertype-input-superscript-${this.id}`).addEventListener('click', () => this.format('P'));
        document.getElementById(`solvertype-input-subscript-${this.id}`).addEventListener('click', () => this.format('S'));
        document.getElementById(`solvertype-input-clear-${this.id}`).addEventListener('click', () => this.format('X'));
        document.getElementById(`solvertype-input-justify-left-${this.id}`).addEventListener('click', () => this.format('L'));
        document.getElementById(`solvertype-input-justify-center-${this.id}`).addEventListener('click', () => this.format('C'));
        document.getElementById(`solvertype-input-justify-right-${this.id}`).addEventListener('click', () => this.format('R'));

        // cores, símbolos, LaTex, imagens e links
        document.getElementById(`solvertype-input-color-${this.id}`).addEventListener('click', () => this.color());
        document.getElementById(`solvertype-input-symbol-${this.id}`).addEventListener('click', () => this.symbol());
        document.getElementById(`solvertype-input-latex-${this.id}`).addEventListener('click', () => this.latex());
        document.getElementById(`solvertype-input-image-${this.id}`).addEventListener('click', () => this.image());
        document.getElementById(`solvertype-input-link-${this.id}`).addEventListener('click', () => this.link());

        // fechar
        document.getElementById(`solvertype-input-close-${this.id}`).addEventListener('click', () => this.close());

        // flag para saber se o conteúdo está sendo alterado
        this.changing = false;
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

        // coloca o cursor no final do texto
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(document.getElementById(`solvertype-input-body-${this.id}`));
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        document.getElementById(`solvertype-input-body-${this.id}`).focus();

        // flag para saber se o conteúdo está sendo alterado
        this.changing = true;

        // para ativar redimensionamento das imagens
        this.imageResize();

    }

    // remove formatações ao colar um texto
    paste(e) {
        this.closeMenus();
        e.preventDefault();
        let text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
        this.changed = true;
    }

    // selecionar o parágrafo (p, h1, h2, h3)
    paragraphSet() {
        this.closeMenus();
        const p = document.getElementById(`solvertype-input-paragraph-${this.id}`).value;
        if (p == 'Paragraph') {
            document.execCommand('formatBlock', false, 'p');
        } else if (p == 'Heading 1') {
            document.execCommand('formatBlock', false, 'h1');
        } else if (p == 'Heading 2') {
            document.execCommand('formatBlock', false, 'h2');
        } else if (p == 'Heading 3') {
            document.execCommand('formatBlock', false, 'h3');
        }
        this.changed = true;
    }

    // sinaliza a opção do parágrafo selecionado (p, h1, h2, h3)
    paragraphGet() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const paragraph = range.commonAncestorContainer.parentNode.nodeName;
        if (paragraph == 'H1') {
            document.getElementById(`solvertype-input-paragraph-${this.id}`).value = 'Heading 1';
        } else if (paragraph == 'H2') {
            document.getElementById(`solvertype-input-paragraph-${this.id}`).value = 'Heading 2';
        } else if (paragraph == 'H3') {
            document.getElementById(`solvertype-input-paragraph-${this.id}`).value = 'Heading 3';
        } else {
            document.getElementById(`solvertype-input-paragraph-${this.id}`).value = 'Paragraph';
        }
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
        } else if (op == 'T') {
            document.execCommand('strikeThrough');
        } else if (op == 'P') {
            document.execCommand('superscript');
        } else if (op == 'S') {
            document.execCommand('subscript');
        } else if (op == 'X') {
            document.execCommand('removeFormat');
        } else if (op == 'L') {
            document.execCommand('justifyLeft');
        } else if (op == 'C') {
            document.execCommand('justifyCenter');
        } else if (op == 'R') {
            document.execCommand('justifyRight');
        }
        this.changed = true;
    }


    // cores
    color() {
        if (document.getElementById(`solvertype-input-colors-${this.id}`).style.display == 'block') {
            this.closeMenus();
            return;
        }
        this.closeMenus();
        const colors = ["black", "white", "gray", "silver", "maroon", "red", "purple", "fushsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"];
        let tx_colors = '';
        let r = 0
        for (let i = 0; i < colors.length; i++) {
            tx_colors += `<button class="solvertype-input-color" value="${colors[i]}" style="background-color:${colors[i]}">&nbsp;</button>`;
            if (r < 9) {
                r = r + 1;
            }
            else {
                tx_colors += '<br>';
                r = 0;
            }
        }
        document.getElementById(`solvertype-input-colors-${this.id}`).innerHTML = tx_colors;
        document.getElementById(`solvertype-input-colors-${this.id}`).style.display = 'block';
        const cbox = document.querySelectorAll('.solvertype-input-color');
        for (let i = 0; i < cbox.length; i++) {
            cbox[i].addEventListener("click", e => {
                document.execCommand('foreColor', false, e.target.value);
                this.changed = true;
                document.getElementById(`solvertype-input-colors-${this.id}`).style.display = 'none';
            });
        }
    }



    // símbolos
    symbol() {
        if (document.getElementById(`solvertype-input-symbols-${this.id}`).style.display == 'block') {
            this.closeMenus();
            return;
        }
        this.closeMenus();
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

        // Salvando a posição do cursor (caret)
        let savedCaretPosition = null;
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            savedCaretPosition = range.cloneRange();
        }

        this.closeMenus();
        let tx_latexs = `
            <div class="solvertype-input-latexs-box" id="solvertype-input-latexs-box-${this.id}"></div>
            <div class="solvertype-input-latexs-buttons"></div>
                <button class="solvertype-input-latexs-button" id="solvertype-input-latexs-button-save-${this.id}"><i class="fa fa-check" aria-hidden="true"></i></button>
                <button class="solvertype-input-latexs-button" id="solvertype-input-latexs-button-close-${this.id}"><i class="fa fa-times" aria-hidden="true"></i></button>
            <div class="solvertype-input-latex-buttons"></div>
       `;
        document.getElementById(`solvertype-input-latexs-${this.id}`).innerHTML = tx_latexs;
        document.getElementById(`solvertype-input-latexs-${this.id}`).style.display = 'block';

        // Abre o editor de LaTeX        
        this.mathEditor = new MathEditor(`solvertype-input-latexs-box-${this.id}`); // https://github.com/karan101292/MathquillBasedEditor

        // Se tiver um [latex]...[/latex] selecionado, carrega no editor (não são todas fórmlas que funcionam)
        if (selection.toString().startsWith('[latex]') && selection.toString().endsWith('[\/latex]')) {
            let latex = selection.toString().replace(/\[latex\]/g, '').replace(/\[\/latex\]/g, '');
            this.mathEditor.setLatex(latex);
        }

        // Botão para salvar o LaTeX
        document.getElementById(`solvertype-input-latexs-button-save-${this.id}`).addEventListener('click', () => {

            // obtendo o LaTeX do editor
            let latex = this.mathEditor.getLatex();
            latex = `[latex]${latex}[/latex]`;

            // restaurando a posição do cursor (caret)
            document.getElementById(`solvertype-input-body-${this.id}`).focus();
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(savedCaretPosition);

            // inserindo o LaTeX
            document.execCommand('insertText', false, latex);
            this.changed = true;
            this.closeMenus();

        });

        // Botão para fechar o menu (X)
        document.getElementById(`solvertype-input-latexs-button-close-${this.id}`).addEventListener('click', () => {
            this.closeMenus();
        });

    }

    // renderiza o LaTeX de acordo com o método escolhido
    render(str) {
        if (this.renderMethod == 'html') {
            return this.renderHtml(str);
        } else if (this.renderMethod == 'png') {
            return this.renderPng(str);
        } else if (this.renderMethod == 'mathml') {
            return this.renderMathml(str);
        }
    }

    // renderiza o LaTeX em HTML usando o KaTeX (https://katex.org/)
    renderHtml(str) {
        return str.replace(/\[latex\](.*?)\[\/latex\]/g, (match, latex) => {
            let ret = latex;
            ret = ret.replace(/&amp;/g, '&'); // para evitar problemas com o & do KaTeX
            ret = katex.renderToString(ret, { throwOnError: false });
            return ret
        });
    }

    // renderiza o LaTeX em PNG usando o Codecogs (https://latex.codecogs.com/)
    renderPng(str) {
        return str.replace(/\[latex\](.*?)\[\/latex\]/g, (match, latex) => {
            let ret = latex;
            ret = `<img src="https://latex.codecogs.com/png.image?${latex}" />`;
            return ret
        });
    }

    // renderiza o LaTeX em MathML usando o KaTeX (https://katex.org/)
    renderMathml(str) {
        return str.replace(/\[latex\](.*?)\[\/latex\]/g, (match, latex) => {
            let ret = latex;
            ret = ret.replace(/&amp;/g, '&'); // para evitar problemas com o & do KaTeX
            ret = katex.renderToString(ret, { throwOnError: false });
            // extraindo o MathML do HTML
            const regexPattern = /<span class="katex-mathml">(.*?)<\/span>/; // Regular expression pattern
            const matches = regexPattern.exec(ret);
            if (matches && matches.length > 1) {
                return matches[1];
            } else {
                return '';
            }
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
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;
                    let src = img.src;
                    if (width > 700) {
                        height = height * 700 / width;
                        width = 700;
                    }
                    let imgHTML = `<div class="solvertype-input-image-container"><img class="solvertype-input-image" src="${src}" width="${width}" width="${height}"></div>`;
                    document.execCommand('insertHTML', false, imgHTML);
                    this.changed = true;
                    this.imageResize(); // para ativar redimensionamento das imagens
                };
            };
            reader.readAsDataURL(file);
        });
    }

    imageResize() {
        const imgs = document.querySelectorAll('.solvertype-input-image');
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener("click", e => {
                if (this.changing) {
                    let width = e.target.width;
                    let height = e.target.height;
                    let src = e.target.src;
                    let newWidth = prompt('Largura (em pixels):', width);
                    if (newWidth == null) return;
                    if (newWidth > 700) newWidth = 700;
                    let newHeight = height * newWidth / width;
                    e.target.width = newWidth;
                    e.target.height = newHeight;
                    this.changed = true;
                }
            });
        }
    }

    // insere links
    link() {
        const selection = window.getSelection();
        if (selection.toString() == '') {
            alert('Selecione o texto que deseja transformar em link.');
            return;
        }
        const link = prompt('Digite a URL do link:');
        if (link == null) return;
        document.execCommand('insertHTML', false, `<a href="${link}" target="_blank">${selection.toString()}</a>`);
        this.changed = true;
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
        document.getElementById(`solvertype-input-colors-${this.id}`).style.display = 'none';
        document.getElementById(`solvertype-input-symbols-${this.id}`).style.display = 'none';
        document.getElementById(`solvertype-input-latexs-${this.id}`).style.display = 'none';
    }

    // altera o status de "changed" quando o conteúdo é alterado
    change() {
        this.closeMenus();
        this.changed = true;
    }
    
}



export default Solvertype;