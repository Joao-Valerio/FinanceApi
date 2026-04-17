import React, { useState } from "react";
import { InputFloat } from "../inputFloat/InputFloat";

export type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", message: "" };

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputFloat
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        label="Nome"
      />
      <InputFloat
        type="email"
        name="email"
        label="E-mail"
        value={form.email}
        onChange={handleChange}
      />
      <InputFloat
        name="message"
        label="Mensagem"
        value={form.message}
        onChange={handleChange}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {submitted && (
        <span className="text-sm text-green-600 dark:text-green-400">
          Mensagem enviada com sucesso! Entraremos em contato.
        </span>
      )}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
      >
        Enviar mensagem
      </button>
    </form>
  );
};
