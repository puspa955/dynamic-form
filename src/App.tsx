import React from 'react';
import Form from './components/Form';
import formSchema from './schema.json';

const App: React.FC = () => {
  return (
    <div>
      <h1>Contact Form</h1>
      <Form schema={formSchema.jobApplicationForm} />
    </div>
  );
}

export default App;
