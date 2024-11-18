// src/components/ChatComponent.js
import React, { useState, useRef, useCallback } from 'react';
import { Search, Calculator, Hammer, Compass, Loader } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import Card from "./ui/Card";
import axios from 'axios';
import PredefinedButton from "./ui/PredefinedButton";

function ChatComponent() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const textareaRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setLoading(true);
      setTypedText(input);
      setShowTypewriter(true);
      setShowResponse(false); // Cacher la réponse précédente
      try {
        const res = await axios.post('https://hook.eu2.make.com/b013stkkhf4yti53u4lffrhblwzvn45r', {
          question: input,
        });
        setResponse(res.data?.response?.replace(/\[\d+\]/g, '') || 'Aucune réponse reçue.');
        setShowResponse(true); // Montrer la nouvelle réponse après récupération
      } catch (error) {
        console.error('Erreur:', error);
        setResponse('Une erreur est survenue. Veuillez réessayer.');
        setShowResponse(true);
      }
      setLoading(false);
      setInput('');
    }
  }, [input]);

  const handlePredefinedQuestion = useCallback((question) => {
    setInput(question);
  }, []);

  const formatResponse = useCallback((text) => {
    return text.split(/(##.*?(\n|$))/g).map((part, index) => {
      if (part.startsWith('##')) {
        return <strong key={index}>{part.slice(2).trim()}</strong>; // Supprime les "##" et applique <strong>
      }
      return part; // Retourne le texte inchangé
    });
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-6">
      <div className="flex flex-col items-center justify-center w-full max-w-full space-y-12">
        {/* Remplacement du titre par l'animation de typewriter si une question est posée */}
        {!showTypewriter ? (
          <h1 className="text-5xl font-bold text-center" style={{ color: '#FFFFFF', fontFamily: 'SF Rounded Heavy', marginBottom: '24px' }}>
            Comment mieux comprendre la prime PPV ?
          </h1>
        ) : (
          <h1 className="text-5xl font-bold text-center" style={{ color: '#FFFFFF', fontFamily: 'SF Rounded Heavy', marginBottom: '24px' }}>
            <Typewriter
              words={[typedText]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={() => setShowTypewriter(false)}
            />
          </h1>
        )}

        {/* Boutons prédéfinis cachés si une réponse est en cours d'affichage */}
        {!showResponse && (
          <div className="flex flex-wrap gap-6 justify-center w-full max-w-2xl mb-12">
            <PredefinedButton label="Simuler" icon={Calculator} onClick={() => handlePredefinedQuestion("Comment simuler une prime de partage de valeur ?")} />
            <PredefinedButton label="Légal" icon={Hammer} onClick={() => handlePredefinedQuestion("Quels sont les textes de lois concernant la prime de partage de valeur ?")} />
            <PredefinedButton label="Mise en place" icon={Compass} onClick={() => handlePredefinedQuestion("Comment mettre en place la prime partage de valeur en 2025 ?")} />
          </div>
        )}
      </div>

      {/* Affichage de la réponse avec animation d'apparition */}
      {showResponse && (
        <motion.div
          className="mt-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <Card>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="whitespace-pre-line leading-relaxed text-lg"
              style={{ lineHeight: '1.8', fontSize: '19px' }}
            >
              {formatResponse(response)}
            </motion.p>
          </Card>
        </motion.div>
      )}

      {/* Zone de texte déplacée en bas une fois la réponse affichée */}
      <form onSubmit={handleSubmit} className="w-full max-w-full mt-12 self-end">
        <div className="relative flex items-center justify-center w-full">
          <Textarea
            ref={textareaRef}
            placeholder="Message PPV-assistant"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="text-lg"
            style={{ fontSize: '19px', lineHeight: '1.8', padding: '16px' }}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-3 rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Rechercher"
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-8 h-8 text-white/70 animate-spin" />
            ) : (
              <Search className="w-8 h-8 text-white/70 flex-shrink-0" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatComponent;
