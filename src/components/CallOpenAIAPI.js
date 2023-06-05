import { Configuration, OpenAIApi } from "openai";

export const callOpenAIAPI = async (messages, model) => {
    const configuration = new Configuration({ apiKey: "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" });
    const openai = new OpenAIApi(configuration);
    try {
        const completion = await openai.createChatCompletion({ model: model, messages });
        console.log(completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content;
    } catch (err) {
        console.log(err);
    }
};