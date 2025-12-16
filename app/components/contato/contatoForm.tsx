import React, { useState } from 'react';


type FormState = { name: string; email: string; message: string; };
const initialState = { name: "", email: "", message: "" };

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("");
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-1/2 flex flex-col gap-4 text-gray-900 dark:text-white">
      <h2 className="font-semibold">Nome</h2>
      <input 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        className="border p-3 rounded dark:bg-gray-800" 
        placeholder="Seu nome"
      />
      
      {error && <span className="text-red-600">{error}</span>}
      {submitted && <span className="text-green-600">Enviado com sucesso!</span>}
      
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Enviar
      </button>
    </form>
  );
};