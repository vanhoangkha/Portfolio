import { useState, useEffect } from 'react';

interface TypeAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypeAnimation = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypeAnimationProps) => {
  const [text, setText] = useState('');
  const [phraseIndex, setphraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentPhrase.length) {
            setText(currentPhrase.substring(0, text.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (text.length > 0) {
            setText(currentPhrase.substring(0, text.length - 1));
          } else {
            setIsDeleting(false);
            setphraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span>
      {text}
      <span className="cursor">|</span>
    </span>
  );
};
