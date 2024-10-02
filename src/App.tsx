import React from "react";
import Form from "./components/Form";
import formSchema from "./schema.json"; 

const App: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log("Form data submitted:", data);
   
  };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-5 rounded-sm max-w-lg w-full">
        <h1 className="text-center text-2xl font-bold mb-8">User Profile From</h1>
        <Form schema={formSchema.userProfileForm} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default App;
