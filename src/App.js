import React, { useState } from 'react';

const moods = ['Feliz', 'Triste', 'Creativo', 'Ansioso', 'Enamorado'];

// Sistema de IA usando APIs gratuitas
const freeAI = {
  generateQuote: async (mood) => {
    try {
      // Usando API gratuita de Hugging Face para generar texto
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `Genera una frase inspiradora para alguien que se siente ${mood}:`,
          parameters: {
            max_length: 100,
            temperature: 0.8
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data[0]?.generated_text || generateLocalQuote(mood);
      } else {
        return generateLocalQuote(mood);
      }
    } catch (error) {
      console.log('Usando generador local para frases');
      return generateLocalQuote(mood);
    }
  },
  
  generateImage: async (mood) => {
    try {
      // Usando Pollinations AI (gratuito) para generar imágenes
      const prompts = {
        'Feliz': 'happy joyful vibrant colors sunshine flowers smiling positive energy uplifting digital art',
        'Triste': 'gentle comforting soft light hope peaceful nature healing calming digital art',
        'Creativo': 'creative inspiring art supplies colorful paint imagination artistic vibrant digital art',
        'Ansioso': 'calm peaceful meditation zen nature tranquil soothing mindful digital art',
        'Enamorado': 'romantic dreamy soft pink golden hearts love warm feelings digital art'
      };

      const prompt = prompts[mood] || prompts['Feliz'];
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.floor(Math.random() * 10000)}`;
      
      return imageUrl;
    } catch (error) {
      console.log('Error generando imagen, usando Picsum');
      return `https://picsum.photos/512/512?random=${Math.floor(Math.random() * 1000)}`;
    }
  }
};

// Generador inteligente local usando algoritmos
const generateLocalQuote = (mood) => {
  const templates = {
    'Feliz': [
      "La felicidad es {adjective} y se encuentra en {location}. {action} con {emotion} ✨",
      "Hoy es un día {adjective} para {action} y sentir {emotion} en tu corazón 🌈",
      "Tu sonrisa {adjective} puede {action} y llenar de {emotion} cada momento 🌞"
    ],
    'Triste': [
      "Aunque te sientes {adjective}, recuerda que puedes {action} y encontrar {emotion} 🌅",
      "Este momento {adjective} también pasará. Es tiempo de {action} y buscar {emotion} 💪",
      "Permítete ser {adjective}, pero no olvides {action} para recuperar tu {emotion} 🌦️"
    ],
    'Creativo': [
      "Tu mente {adjective} está lista para {action} y crear {emotion} increíble 🎨",
      "La creatividad {adjective} te invita a {action} y expresar tu {emotion} único 🚀",
      "Hoy tu espíritu {adjective} puede {action} y manifestar {emotion} extraordinario 🖌️"
    ],
    'Ansioso': [
      "Respira {adjective}, es momento de {action} y encontrar {emotion} interior 💪",
      "Tu corazón {adjective} necesita {action} para recuperar la {emotion} natural 🧘",
      "Aunque te sientes {adjective}, puedes {action} y reconectar con tu {emotion} 👣"
    ],
    'Enamorado': [
      "Tu corazón {adjective} está listo para {action} y compartir {emotion} puro 💖",
      "El amor {adjective} te permite {action} y crear {emotion} maravilloso 🌹",
      "Este sentimiento {adjective} te invita a {action} y vivir {emotion} auténtico 💑"
    ]
  };

  const variables = {
    'Feliz': {
      adjective: ['brillante', 'radiante', 'luminoso', 'vibrante', 'espléndido'],
      location: ['cada momento', 'las pequeñas cosas', 'tu interior', 'el presente', 'cada respiro'],
      action: ['sonríe sin límites', 'abraza la vida', 'celebra tu existencia', 'disfruta plenamente', 'comparte tu luz'],
      emotion: ['alegría pura', 'felicidad genuina', 'paz interior', 'gratitud infinita', 'amor propio']
    },
    'Triste': {
      adjective: ['difícil', 'oscuro', 'pesado', 'nublado', 'desafiante'],
      action: ['buscar la luz', 'abrazar la esperanza', 'confiar en ti', 'mirar hacia adelante', 'valorar tu fuerza'],
      emotion: ['esperanza', 'fortaleza', 'sanación', 'renacimiento', 'nueva perspectiva']
    },
    'Creativo': {
      adjective: ['innovadora', 'imaginativa', 'libre', 'expansiva', 'ilimitada'],
      action: ['explorar nuevos caminos', 'crear sin miedo', 'experimentar libremente', 'expresarte auténticamente', 'innovar constantemente'],
      emotion: ['arte sublime', 'belleza única', 'magia creativa', 'inspiración pura', 'genialidad natural']
    },
    'Ansioso': {
      adjective: ['profundamente', 'conscientemente', 'serenamente', 'pausadamente', 'calmadamente'],
      action: ['encontrar tu centro', 'conectar contigo', 'buscar equilibrio', 'practicar mindfulness', 'cultivar paciencia'],
      emotion: ['tranquilidad', 'serenidad', 'estabilidad', 'confianza', 'paz mental']
    },
    'Enamorado': {
      adjective: ['apasionado', 'tierno', 'radiante', 'entregado', 'pleno'],
      action: ['amar intensamente', 'entregarte completamente', 'valorar cada momento', 'crear memorias', 'construir sueños'],
      emotion: ['amor verdadero', 'conexión profunda', 'felicidad compartida', 'complicidad única', 'unión perfecta']
    }
  };

  const moodTemplates = templates[mood] || templates['Feliz'];
  const moodVars = variables[mood] || variables['Feliz'];
  
  const template = moodTemplates[Math.floor(Math.random() * moodTemplates.length)];
  
  let quote = template;
  Object.keys(moodVars).forEach(key => {
    const values = moodVars[key];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    quote = quote.replace(`{${key}}`, randomValue);
  });
  
  return quote;
};

// Generador de imágenes artísticas usando Canvas
const generateCanvasArt = (mood) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const colors = {
    'Feliz': ['#FFD700', '#FF6B35', '#F7931E', '#FFE135', '#FF9500'],
    'Triste': ['#4A90E2', '#7B68EE', '#6495ED', '#87CEEB', '#B0C4DE'],
    'Creativo': ['#FF6B9D', '#A855F7', '#EC4899', '#F59E0B', '#EF4444'],
    'Ansioso': ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
    'Enamorado': ['#F472B6', '#EC4899', '#BE185D', '#9D174D', '#831843']
  };

  const moodColors = colors[mood] || colors['Feliz'];
  
  // Fondo degradado
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, moodColors[0]);
  gradient.addColorStop(1, moodColors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Formas geométricas abstractas
  for (let i = 0; i < 20; i++) {
    ctx.globalAlpha = Math.random() * 0.7 + 0.3;
    ctx.fillStyle = moodColors[Math.floor(Math.random() * moodColors.length)];
    
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = Math.random() * 100 + 20;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Partículas brillantes
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#FFFFFF';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const size = Math.random() * 3 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }

  return canvas.toDataURL();
};

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [moodClickCount, setMoodClickCount] = useState({});
  const [error, setError] = useState(null);
  const [generationInfo, setGenerationInfo] = useState('');

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    setLoading(true);
    setError(null);
    setImageUrl('');
    setQuote('');
    setGenerationInfo('');

    try {
      // Actualizar contador
      const currentCount = moodClickCount[mood] || 0;
      const newCount = currentCount + 1;
      setMoodClickCount(prev => ({ ...prev, [mood]: newCount }));

      // Intentar usar IA gratuita primero, luego fallback a generación local inteligente
      const startTime = Date.now();
      
      const [generatedQuote, generatedImage] = await Promise.all([
        freeAI.generateQuote(mood).catch(() => generateLocalQuote(mood)),
        freeAI.generateImage(mood).catch(() => generateCanvasArt(mood))
      ]);

      const endTime = Date.now();
      const generationTime = ((endTime - startTime) / 1000).toFixed(1);

      setQuote(generatedQuote);
      setImageUrl(generatedImage);
      setGenerationInfo(`⚡ Generado en ${generationTime}s usando IA híbrida`);
      
    } catch (error) {
      console.error('Error:', error);
      setError("Error en la generación. Usando contenido local inteligente.");
      
      // Fallback completo a generación local
      setQuote(generateLocalQuote(mood));
      setImageUrl(generateCanvasArt(mood));
      setGenerationInfo('🎨 Generado localmente con algoritmos inteligentes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🌈 MoodBoard IA
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#666',
            margin: '0'
          }}>
            Selecciona tu estado de ánimo:
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px'
          }}>
            <div style={{
              fontSize: '0.9rem',
              color: '#4caf50',
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: '15px',
              background: '#e8f5e8'
            }}>
              🤖 IA Híbrida Activa
            </div>
          </div>
          <p style={{ 
            fontSize: '0.8rem', 
            color: '#888',
            margin: '5px 0 0 0',
            fontStyle: 'italic'
          }}>
            💡 Usando IA gratuita + algoritmos inteligentes locales
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fff3cd',
            color: '#856404',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            borderLeft: '4px solid #ffc107'
          }}>
            <strong>⚠️ Info:</strong> {error}
          </div>
        )}

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodClick(mood)}
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '25px',
                background: selectedMood === mood 
                  ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                  : '#f0f0f0',
                color: selectedMood === mood ? 'white' : '#333',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.6 : 1,
                transform: selectedMood === mood ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selectedMood === mood ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
                position: 'relative'
              }}
            >
              {mood}
              {moodClickCount[mood] && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#ff4757',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {moodClickCount[mood]}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }} />
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#667eea',
              margin: '0 0 10px 0',
              fontWeight: '500'
            }}>
              🤖 Generando con IA híbrida...
            </p>
            <p style={{ 
              fontSize: '0.9rem', 
              color: '#999',
              margin: 0,
              fontStyle: 'italic'
            }}>
              ✨ Intentando IA gratuita + algoritmos locales
            </p>
          </div>
        )}

        {!loading && selectedMood && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '15px',
            marginTop: '20px',
            animation: 'fadeIn 0.5s ease-in'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#333',
              marginBottom: '10px'
            }}>
              ✨ Inspiración para: {selectedMood}
              {moodClickCount[selectedMood] && (
                <span style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  marginLeft: '10px'
                }}>
                  (Generación #{moodClickCount[selectedMood]})
                </span>
              )}
            </h2>
            
            {generationInfo && (
              <p style={{
                fontSize: '0.8rem',
                color: '#4caf50',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>
                {generationInfo}
              </p>
            )}
            
            {imageUrl && (
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={imageUrl} 
                  alt={`Imagen generada para ${selectedMood}`}
                  style={{
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    maxWidth: '100%',
                    transition: 'transform 0.3s ease',
                    border: '3px solid #667eea'
                  }}
                  onError={(e) => {
                    e.target.src = generateCanvasArt(selectedMood);
                  }}
                />
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  marginTop: '10px',
                  fontStyle: 'italic'
                }}>
                  🎨 Imagen única generada por IA
                </p>
              </div>
            )}
            
            {quote && (
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                borderLeft: '4px solid #667eea',
                marginTop: '15px'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  💬 "{quote}"
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  marginTop: '10px',
                  textAlign: 'right'
                }}>
                  🧠 Frase generada por IA híbrida
                </p>
              </div>
            )}

            <button
              onClick={() => handleMoodClick(selectedMood)}
              disabled={loading}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '20px',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 10px rgba(255, 107, 107, 0.3)'
              }}
            >
              🔄 Generar nuevo contenido IA
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;