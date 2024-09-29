import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ENDPOINT_URL = 'https://app.hubform.com.br/f/dciPUSaeE98gY1LJ';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(ENDPOINT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) throw new Error('Falha na requisição');

      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p>Recebemos sua mensagem, obrigado por entrar em contato!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Digite seu email"
      />
      <FormField
        label="Mensagem"
        id="message"
        as="textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        placeholder="Digite sua mensagem"
      />
      {status === 'error' && <p>Erro ao enviar. Tente novamente.</p>}
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

const FormField = ({ label, id, as: Component = 'input', ...props }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Component id={id} name={id} {...props} />
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};