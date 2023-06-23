import React from 'react';
import {useState, useEffect} from 'react';
import {Grid} from '@mui/material';
import AddCourse from './AddCourse';
import ChatWindow from '../ChatWindow';
import CourseMarkdownViewer from '../CourseMarkdownViewer';

const CourseCreator = () => {
  const [courseContent, setCourseContent] = useState(`# Course Markdown

Courses will be shown in a markdown renderer. Ask GPT to generate the course in markdown

Here are some markdown basics if you're editing it by hand:

Use the hash symbol (\`#\`) to create headers of different sizes.

Emphasize text by using asterisks (\`*\`) & understores(\`_\`) for **bold** and _italic_ styles.

To use the strikethrough effect, use two tildes (\`~~\`) before and after the text like ~~this~~.

You can create an unordered list by starting a line with \`*\`, a hyphen \`-\`, or a plus \`+\`.

- Apple
* Banana
+ Orange

For ordered lists, number the lines as desired:

1. First item
2. Second item

Create a link by enclosing the link text in brackets \`[ ]\` followed by the URL in parenthesis \`(\`).  
[GPTeach](https://www.personalteachergpt.com)

Use double space at the end of the line for a new line.  
Like this

Code can be highlighted by using backticks or backquotes. Here, we escape the backquotes.

Example:   
\`\`\` 
print("Hello world")
\`\`\`

For block quotes, use the greater than (\`>\`) symbol at the start of the line.

Insert images using the following syntax:  
    
![Alt text](https://img.freepik.com/free-photo/blossom-floral-bouquet-decoration-colorful-beautiful-flowers-background-garden-flowers-plant-pattern-wallpapers-greeting-cards-postcards-design-wedding-invites_90220-1103.jpg)

You can create tables using \`|\` to create columns and \`-\` to create rows.

Example:

| Column 1 | Column 2 |
| -------- | -------- |
| Data 1   | Data 2   |`);
  useEffect(() => {
    console.log(courseContent);
  }, [courseContent]);
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12} lg={6}>
        <CourseMarkdownViewer courseContent={courseContent}/>
      </Grid>
      <Grid item xs={12} lg={6}>
        <AddCourse lesson={courseContent} setLesson={setCourseContent} />
      </Grid>
      
      {/* <Grid item xs={12} lg={3.5}>
        <ChatWindow lesson={"a"}/>
      </Grid> */}
    </Grid>
  );
};

export default CourseCreator;
