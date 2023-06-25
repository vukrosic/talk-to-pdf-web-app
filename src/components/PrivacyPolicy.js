import React from 'react';
import { Typography, Box, Container, Link } from '@mui/material';
import Markdown from 'markdown-to-jsx';

const PrivacyPolicy = () => {
  const privacyPolicyText = `
Privacy Policy for Personal Teacher GPT

At Personal Teacher GPT, we are committed to safeguarding the privacy and security of your personal information. This policy outlines how we collect, use, disclose, and protect the information you provide to us when accessing and using our website.

Collection and Use of Personal Information
We may collect personal information from you when you register, create an account, purchase or enroll in a course, or interact with our website in any other fashion. This may include your name, email address, billing information if you purchase premium, and other pertinent information necessary for course enrollment and completion.

We use this personal information to support your course enrollment, manage your account, facilitate course communications, and to notify you of any changes to our website, policies, or services. We may also use your personal information to improve our website offerings, provide customer service, and to comply with legal obligations.

Security and Privacy of Personal Information
We take appropriate measures, including physical, technical, and administrative safeguards, to protect and secure your personal information from unauthorized access, use, disclosure, alteration, or destruction. Access to your personal information is strictly limited to authorized personnel or third-party agents who require access for business or legal purposes.

We will not sell, rent, or lease your personal information to any third-party entities. However, we will share your payment information with our payment processor to facilitate transactions.

Your Rights and Choices
You have the right to access, correct, or delete your personal information at any time by contacting us using the information provided below.

Changes to this Policy
We reserve the right to update or change this Privacy Policy at any time. We will post any updated or modified policies on our website with the effective date.

Contact Information
If you have any questions, concerns, or requests regarding your personal information, you can contact us at:

Personal Teacher GPT
Email: vukrosic1@gmail.com

Effective Date
This Privacy Policy is effective as of the date of publication.
  `;

  return (
    <div>
      <Container maxWidth="md">
        <br />
        <Typography variant="h4" component="h1">
          Privacy Policy
        </Typography>
        <Box>
          <br />
          <Markdown
            options={{
              overrides: {
                p: { component: Typography, props: { paragraph: true } },
                a: { component: Link },
              },
            }}
          >
            {privacyPolicyText}
          </Markdown>
        </Box>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;