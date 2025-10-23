import Link from "next/link";
import { useState } from "react";

export default function NeonButton() {
  return (
    <Link href="/yacht" className="flex justify-center w-full py-2 px-4">
      <style>{`
        @import url(//fonts.googleapis.com/css?family=Vibur);
        
        .neon-text {
          font-family: 'Vibur', cursive;
          font-size: 1.5rem;
          font-weight: 400;
          color: #fee;
          text-shadow: 
            0 -40px 100px,
            0 0 2px,
            0 0 1em #ff4444,
            0 0 0.5em #ff4444,
            0 0 0.1em #ff4444,
            0 10px 3px #000;
          user-select: none;
        }
        
        .neon-text span {
          animation: blink linear infinite 2s;
        }
        
        .neon-text span:nth-of-type(2) {
          animation: blink linear infinite 3s;
        }
        
        .neon-text span:nth-of-type(4) {
          animation: blink linear infinite 2.5s;
        }
        
        .neon-text span:nth-of-type(6) {
          animation: blink linear infinite 3.5s;
        }
        
        @keyframes blink {
          78% {
            color: inherit;
            text-shadow: inherit;
          }
          79% {
            color: #333;
          }
          80% {
            text-shadow: none;
          }
          81% {
            color: inherit;
            text-shadow: inherit;
          }
          82% {
            color: #333;
            text-shadow: none;
          }
          83% {
            color: inherit;
            text-shadow: inherit;
          }
          92% {
            color: #333;
            text-shadow: none;
          }
          92.5% {
            color: inherit;
            text-shadow: inherit;
          }
        }
        
        .neon-button {
          position: relative;
          padding: 1rem 2rem;
          font-size: 1.5rem;
          font-family: 'Vibur', cursive;
          color: #fee;
          background: rgba(0, 0, 0, 0.3);
          border: 3px solid #ff4444;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-shadow: 
            0 0 5px #ff4444,
            0 0 10px #ff4444,
            0 0 20px #ff4444,
            0 0 40px #ff4444;
          box-shadow: 
            0 0 10px #ff4444,
            0 0 20px #ff4444,
            0 0 30px #ff4444,
            inset 0 0 10px rgba(255, 68, 68, 0.2);
        }
        
        .neon-button:hover {
          background: rgba(255, 68, 68, 0.1);
          text-shadow: 
            0 0 10px #ff4444,
            0 0 20px #ff4444,
            0 0 30px #ff4444,
            0 0 60px #ff4444;
          box-shadow: 
            0 0 20px #ff4444,
            0 0 40px #ff4444,
            0 0 60px #ff4444,
            inset 0 0 20px rgba(255, 68, 68, 0.3);
        }
        
        .neon-button span {
          animation: blink linear infinite 2s;
        }
        
        .neon-button span:nth-of-type(3) {
          animation: blink linear infinite 2.8s;
        }
        
        .neon-button span:nth-of-type(5) {
          animation: blink linear infinite 3.2s;
        }
      `}</style>

      <p className="neon-text">
        {"THIS IS FOR".split("").map((char, index) => (
          <span key={index}>{char === " " ? "\u00A0" : char}</span>
        ))}
      </p>
    </Link>
  );
}
