import React, { useState } from 'react';
import './App.css';

const moods = ['Feliz', 'Triste', 'Creativo', 'Ansioso', 'Enamorado'];

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [images, setImages] = useState([]);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    // Aquí se podría conectar con una API de imágenes
    // Por ahora usamos imágenes simuladas de ejemplo
    const dummyImages = [
      `https://source.unsplash.com/600x400/?${mood},art`,
      `https://source.unsplash.com/600x400/?${mood},nature`,
      `https://source.unsplash.com/600x400/?${mood},colors`
    ];
    setImages(dummyImages);
  };

  return (
    <div className="App">
      <h1>MoodBoard IA 🧠🎨</h1>
      <p>Selecciona tu estado de ánimo:</p>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <button key={mood} onClick={() => handleMoodClick(mood)}>
            {mood}
          </button>
        ))}
      </div>

      {selectedMood && (
        <>
          <h2>Imágenes para: {selectedMood}</h2>
          <div className="image-grid">
            {images.map((imgUrl, idx) => (
              <img key={idx} src={imgUrl} alt={`Mood ${selectedMood}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
