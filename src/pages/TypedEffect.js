import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedEffect = () => {
  const typedElementRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Hello',
        'నమస్తే',
        'नमस्ते',
        'வணக்கம்',
        'ಹಲೋ',
        'ഹലോ',
        'Bonjour',
        'Hola',
        'こんにちは',
        '你好'
      ],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true
    };

    const typed = new Typed(typedElementRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span className="auto-type" ref={typedElementRef} />;
};

export default TypedEffect;
