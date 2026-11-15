#!/usr/bin/env bash
# Prints the text a hiring system would read from a resume (.pdf, .doc, .docx). Read-only: never writes or uploads.
# Usage: bash extrair-texto.sh <arquivo>
# Uses whatever is installed: pdftotext (poppler) or macOS PDFKit for PDF; textutil (macOS), pandoc, antiword, catdoc,
# or unzip as a last resort for Word files.
# Exits 2 when the PDF has no text layer (a scanned or image-only resume).
set -u
f=${1:?usage: extrair-texto.sh <arquivo>}
[ -f "$f" ] || { echo "arquivo não encontrado: $f" >&2; exit 1; }
has() { command -v "$1" >/dev/null 2>&1; }

ext=$(printf '%s' "${f##*.}" | tr '[:upper:]' '[:lower:]')
case "$ext" in
  pdf)
    if has pdftotext; then text=$(pdftotext -layout "$f" - 2>/dev/null)
    elif has osascript; then
      # macOS ships PDFKit; textutil does not read PDF.
      text=$(osascript -l JavaScript -e 'function run(a){ObjC.import("PDFKit");const d=$.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(a[0]));return d.isNil()?"":(d.string.js||"")}' "$f" 2>/dev/null)
    else echo "sem extrator de PDF: instale poppler (pdftotext) ou leia o PDF direto no agente" >&2; exit 1
    fi
    if [ -z "$(printf '%s' "$text" | tr -d '[:space:]')" ]; then
      echo "AVISO: o PDF não tem camada de texto (escaneado ou imagem). Sistemas de triagem não conseguem ler." >&2
      exit 2
    fi ;;
  docx)
    if has textutil; then text=$(textutil -convert txt -stdout "$f" 2>/dev/null)
    elif has pandoc; then text=$(pandoc -t plain "$f" 2>/dev/null)
    elif has unzip; then text=$(unzip -p "$f" word/document.xml 2>/dev/null | sed -e 's#</w:p>#\n#g' -e 's#<[^>]*>##g')
    else echo "sem extrator de DOCX: instale pandoc" >&2; exit 1
    fi ;;
  doc)
    if has textutil; then text=$(textutil -convert txt -stdout "$f" 2>/dev/null)
    elif has antiword; then text=$(antiword "$f" 2>/dev/null)
    elif has catdoc; then text=$(catdoc "$f" 2>/dev/null)
    else echo "sem extrator de DOC: instale antiword ou catdoc, ou salve como .docx/.pdf" >&2; exit 1
    fi ;;
  *) echo "formato não suportado: .$ext (mande .pdf, .doc ou .docx)" >&2; exit 1 ;;
esac

printf '%s\n' "$text"
words=$(printf '%s' "$text" | wc -w | tr -d ' ')
pages=""
if [ "$ext" = pdf ] && has pdfinfo; then pages=", $(pdfinfo "$f" 2>/dev/null | awk '/^Pages:/{print $2}') página(s)"; fi
size=$(( $(wc -c < "$f") / 1024 ))
echo "---" >&2
echo "arquivo: $(basename "$f"), ${size} KB${pages}, ${words} palavras extraídas" >&2
