// src/components/ui/Textarea.js
import React, { forwardRef, useCallback } from 'react';

const Textarea = forwardRef(({ value, onChange, onKeyDown, placeholder, className, rows = 4, style }, ref) => {
  const adjustTextareaHeight = useCallback(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => {
        adjustTextareaHeight();
        onChange(e);
      }}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-[#1E1E1E] border-0 resize-none rounded-2xl text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12 text-xl p-4 ${className}`}
      style={{ overflow: 'hidden', fontFamily: 'Poppins', ...style }}
    />
  );
});

export default Textarea;
