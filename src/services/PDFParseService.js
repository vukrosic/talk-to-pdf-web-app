const pdf = require('pdf-parse');


const PDFParseService = {
    async extractTextFromPDF(file) {
        const buffer = await file.arrayBuffer();
        const data = new Uint8Array(buffer);
        const pdfText = await pdf(data);

        return pdfText.text;
    },
};

export default PDFParseService;
