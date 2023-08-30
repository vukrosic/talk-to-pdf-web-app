import React, { useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    TextareaAutosize,
    TextField,
    Typography,
} from '@mui/material';
import PDFParseService from '../services/PDFParseService'; // Import your PDFParseService
import PineconeService from '../services/PineconeService'; // Import your PineconeService

function TalkToPDF() {
    // State to store extracted text from PDFs and user-pasted text
    const [pdfTexts, setPdfTexts] = useState([]);
    const [userPastedText, setUserPastedText] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleFileUpload = async (e) => {
        const files = e.target.files;
        if (files) {
            const uploadedTexts = [];

            // Process and extract text from each uploaded PDF
            for (const file of files) {
                try {
                    const textFromPDF = await PDFParseService.extractTextFromPDF(file);
                    uploadedTexts.push(textFromPDF);
                } catch (error) {
                    console.error('Error extracting text from PDF:', error);
                }
            }

            // Append the extracted PDF text to the existing text
            setPdfTexts((prevTexts) => [...prevTexts, ...uploadedTexts]);
        }
    };

    const handleAnalyze = async () => {
        // Combine PDF text, user-pasted text, and question
        const combinedText = `${pdfTexts.join('\n\n')}\n\n${userPastedText}\n\n${question}`;

        // Chunk the data into 1000 character chunks
        const chunkSize = 1000;
        const chunks = [];
        for (let i = 0; i < combinedText.length; i += chunkSize) {
            chunks.push(combinedText.slice(i, i + chunkSize));
        }

        // Generate OpenAI embeddings and send them to Pinecone
        try {
            for (const chunk of chunks) {
                const embeddings = await PineconeService.generateEmbeddings(chunk);
                await PineconeService.sendEmbeddingsToIndex(embeddings);
            }

            // Signal that the analysis is complete
            setAnswer('Analysis complete. Data sent to Pinecone.');
        } catch (error) {
            console.error('Error during analysis:', error);
        }
    };

    const handleAskQuestion = async () => {
        // Send the user's question to Pinecone
        try {
            const response = await PineconeService.askQuestion(question);
            setAnswer(response);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        PDF Text Extractor and Question Answering
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <input type="file" accept=".pdf" multiple onChange={handleFileUpload} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Typography variant="h6">Or Paste Text Here:</Typography>
                        <TextareaAutosize
                            value={userPastedText}
                            onChange={(e) => setUserPastedText(e.target.value)}
                            placeholder="Paste or type text here..."
                            minRows={5}
                            style={{ width: '100%', padding: '10px' }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <TextField
                            fullWidth
                            label="Ask a Question"
                            variant="outlined"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAnalyze}
                        style={{ marginTop: '10px' }}
                    >
                        Analyze
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAskQuestion}
                        style={{ marginTop: '10px' }}
                    >
                        Ask Question
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        {answer && (
                            <>
                                <Typography variant="h6">Status:</Typography>
                                <Typography>{answer}</Typography>
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default TalkToPDF;
