import React, { useEffect, useState } from 'react';
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
import { auth } from '../config/firebase';

function TalkToPDF() {
    // State to store extracted text from PDFs and user-pasted text
    const [pdfTexts, setPdfTexts] = useState([]);
    const [userPastedText, setUserPastedText] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        console.log(file);
    }, [file]);



    async function handleFileUpload(event) {
        const fileInput = event.target;
        setFile(fileInput.files[0]);
    }

      
    

    async function handleAnalyze() {
        try {
        
            if (!file) {
              console.error('No file selected');
              return;
            }
        
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('file', file);
            console.log("asdf" + file.text());
        
            // Make the HTTP POST request to your Google Cloud Function
            const response = await fetch('https://us-central1-personal-teacher-gpt.cloudfunctions.net/on_request_example', {
              method: 'POST',
              body: formData,
            });
        
            if (response.ok) {
              // Handle a successful response from the server
              const text = await response.text();
              console.log('Text extracted from PDF:', text);
            } else {
              // Handle errors
              console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
        console.error('An error occurred:', error);
        }
    }
    

      
    const handleAskQuestion = async () => {
        try {
            if (!question) {
              console.error('No question provided');
              return;
            }
        
            // Create a FormData object to send the question
            const requestData = { question };
            console.log(requestData)

            // Make the HTTP POST request to your Google Cloud Function
            const response = await fetch('https://us-central1-personal-teacher-gpt.cloudfunctions.net/answer_question', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Specify JSON content type
              },
              body: JSON.stringify(requestData),
            });
        
            if (response.ok) {
              // Handle a successful response from the server
              const text = await response.text();
              console.log('Response from the server:', text);
            } else {
              // Handle errors
              console.error('Error:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('An error occurred:', error);
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
