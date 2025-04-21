export const emailTemplate = (body, surveyId, subject) => {
  return `
    <html>
      <body>
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <h2>We'd love your feedback! for ${subject}</h2>
          <h2>${body}</h2>
          <div style="margin-top: 20px;">
            <a href="http://localhost:3000/${surveyId}/yes" style="margin-right: 20px; text-decoration: none; background: #28a745; color: white; padding: 10px 20px; border-radius: 5px;">Yes</a>
            <a href="http://localhost:3000/${surveyId}/no" style="text-decoration: none; background: #dc3545; color: white; padding: 10px 20px; border-radius: 5px;">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
