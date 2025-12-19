import React, { useState } from 'react';
import { InputFloat } from '../inputFloat/InputFloat';


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
     <form onSubmit={handleSubmit} className="md:w-1/2 flex flex-col gap-4">
          <InputFloat
            type="text"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            label="Nome"
          />
          <InputFloat
            type="email"
            name="email"
            placeholder="Email"
            label = "E-mail"
            value={form.email}
            onChange={handleChange}
          />
          <h2></h2>
          <InputFloat
            name="message"
            placeholder="Sua mensagem"
            label = "Mensagem"
            value={form.message}
            onChange={handleChange}
          />
          {error && <span className="text-red-600">{error}</span>}
          {submitted && (
            <span className="text-green-700">Mensagem enviada com sucesso! Entraremos em contato.</span>
          )}
          <button
            type="submit"
            className="bg-green-700 text-white font-semibold py-2 px-4 rounded hover:bg-green-800 duration-200"
          >
            Enviar mensagem
          </button>
        </form>
  );
};