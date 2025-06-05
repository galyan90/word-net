// utils/wordGenerator.js - יצירת לוח ורמזי AI

const WORDS = [
  'חתול', 'כלב', 'בית', 'מכונית', 'ספר', 'טלפון', 'שולחן', 'כיסא', 'עץ', 'פרח',
  'מים', 'שמש', 'הר', 'ים', 'לחם', 'חלב', 'תפוח', 'כדור', 'משחק', 'מוזיקה',
  'פיצה', 'קפה', 'גן', 'רכבת', 'ספורט'
];

const AI_CLUES = {
  'חיות': {
    positive: ['חתול', 'כלב'],
    negative: ['גן', 'יער'],
    safe: true
  },
  'אוכל': {
    positive: ['לחם', 'חלב', 'תפוח', 'פיצה', 'קפה'],
    negative: ['שולחן'],
    safe: true
  },
  'בית': {
    positive: ['בית', 'שולחן', 'כיסא'],
    negative: ['גן', 'רכבת'],
    safe: true
  },
  'טבע': {
    positive: ['עץ', 'פרח', 'מים', 'שמש', 'הר', 'ים'],
    negative: ['חתול', 'כלב', 'גן'],
    safe: true
  },
  'ספורט': {
    positive: ['כדור', 'משחק', 'ספורט'],
    negative: ['מוזיקה'],
    safe: true
  },
  'תחבורה': {
    positive: ['מכונית', 'רכבת'],
    negative: ['כיסא', 'שולחן'],
    safe: true
  },
  'ישיר': {
    positive: ['עץ', 'רכבת'],
    negative: ['ענן', 'מים'],
    safe: false
  },
  'עגול': {
    positive: ['כדור', 'תפוח', 'שמש'],
    negative: ['שולחן', 'רכבת'],
    safe: false
  },
  'חי': {
    positive: ['חתול', 'כלב', 'עץ', 'פרח'],
    negative: ['שולחן', 'מכונית'],
    safe: false
  }
};

const SPECIFIC_CLUES = {
  'חתול': ['יונק', 'לטף', 'רך'],
  'כלב': ['נאמן', 'שמח', 'נובח'],
  'בית': ['מקום', 'מבנה', 'מגורים'],
  'מכונית': ['נוסע', 'מנוע', 'כלי'],
  'ספר': ['קורא', 'מידע', 'עמודים'],
  'טלפון': ['צלצול', 'קשר', 'נייד'],
  'שולחן': ['רהיט', 'עץ', 'משטח'],
  'כיסא': ['ישיבה', 'רהיט', 'נוח'],
  'עץ': ['ירוק', 'גזע', 'עלים'],
  'פרח': ['יפה', 'ריח', 'צבע'],
  'מים': ['נוזל', 'כחול', 'זורם'],
  'שמש': ['זוהר', 'צהוב', 'חם'],
  'הר': ['גבוה', 'סלע', 'טיפוס'],
  'ים': ['כחול', 'מלח', 'גלים'],
  'לחם': ['תנור', 'חום', 'קמח'],
  'חלב': ['לבן', 'פרה', 'בקבוק'],
  'תפוח': ['אדום', 'מתוק', 'פרי'],
  'כדור': ['עגול', 'גומי', 'זורק'],
  'משחק': ['כיף', 'שעשוע', 'חוקים'],
  'מוזיקה': ['שיר', 'צלילים', 'נגינה'],
  'פיצה': ['חם', 'גבינה', 'עגול'],
  'קפה': ['חם', 'שחור', 'בוקר'],
  'גן': ['ירוק', 'פרחים', 'יפה'],
  'רכבת': ['ארוך', 'פסים', 'נוסעים'],
  'ספורט': ['ריצה', 'בריאות', 'תחרות']
};

// יצירת לוח משחק חדש
export const initializeGame = () => {
  const shuffledWords = [...WORDS].sort(() => Math.random() - 0.5).slice(0, 25);
  const types = [
    ...Array(9).fill('red'),
    ...Array(8).fill('blue'),
    ...Array(7).fill('neutral'),
    ...Array(1).fill('assassin')
  ].sort(() => Math.random() - 0.5);

  return {
    board: shuffledWords.map((word, i) => ({
      id: i,
      word: word,
      type: types[i]
    })),
    currentTeam: 'red',
    phase: 'spymaster',
    score: { red: 9, blue: 8 },
    clue: { word: '', number: 0 },
    guessesLeft: 0,
    revealed: new Set(),
    winner: null
  };
};

// יצירת רמז AI
export const generateAIClue = (board, currentTeam, revealed) => {
  const teamCards = board.filter(c => 
    c.type === currentTeam && !revealed.has(c.id)
  );

  const opponentCards = board.filter(c => 
    (c.type === 'red' || c.type === 'blue') && c.type !== currentTeam && !revealed.has(c.id)
  );

  const neutralCards = board.filter(c => 
    c.type === 'neutral' && !revealed.has(c.id)
  );

  const assassinCards = board.filter(c => 
    c.type === 'assassin' && !revealed.has(c.id)
  );

  if (teamCards.length === 0) return null;

  const allBoardWords = board.map(c => c.word.toLowerCase());

  let bestClue = null;
  let maxScore = -100;

  for (const [category, clueData] of Object.entries(AI_CLUES)) {
    // בדיקה שהרמז לא מופיע על הלוח
    if (allBoardWords.includes(category.toLowerCase())) {
      continue;
    }

    // בדיקת דמיון
    const similarWords = allBoardWords.filter(word => 
      word.includes(category.toLowerCase()) || category.toLowerCase().includes(word)
    );
    
    if (similarWords.length > 0) {
      continue;
    }

    const myMatches = teamCards.filter(card => clueData.positive.includes(card.word));
    
    if (myMatches.length === 0) continue;

    const opponentMatches = opponentCards.filter(card => clueData.positive.includes(card.word));
    const neutralMatches = neutralCards.filter(card => clueData.positive.includes(card.word));
    const assassinMatches = assassinCards.filter(card => clueData.positive.includes(card.word));

    const confusingOpponent = opponentCards.filter(card => clueData.negative && clueData.negative.includes(card.word));
    const confusingNeutral = neutralCards.filter(card => clueData.negative && clueData.negative.includes(card.word));
    const confusingAssassin = assassinCards.filter(card => clueData.negative && clueData.negative.includes(card.word));

    // חישוב ציון
    let score = myMatches.length * 10;
    score -= opponentMatches.length * 20;
    score -= neutralMatches.length * 8;
    score -= assassinMatches.length * 100;
    score -= confusingOpponent.length * 10;
    score -= confusingNeutral.length * 5;
    score -= confusingAssassin.length * 100;

    if (clueData.safe) {
      score += 3;
    }

    if (score > maxScore && (score > 8 || (myMatches.length === 1 && score > 0))) {
      maxScore = score;
      bestClue = { 
        word: category, 
        number: Math.min(myMatches.length, 3),
        myWords: myMatches.map(m => m.word)
      };
    }
  }

  // אם לא מצא רמז טוב, תן רמז ספציפי
  if (!bestClue) {
    const safeCard = teamCards[Math.floor(Math.random() * teamCards.length)];
    
    let specificClue = null;
    
    if (SPECIFIC_CLUES[safeCard.word]) {
      for (const clue of SPECIFIC_CLUES[safeCard.word]) {
        const isOnBoard = allBoardWords.includes(clue.toLowerCase());
        const isSimilar = allBoardWords.some(word => 
          word.includes(clue.toLowerCase()) || clue.toLowerCase().includes(word)
        );
        
        if (!isOnBoard && !isSimilar) {
          specificClue = clue;
          break;
        }
      }
    }

    if (!specificClue) {
      const generalClues = [
        'גדול', 'קטן', 'יפה', 'חזק', 'מהיר', 'איטי',
        'חם', 'קר', 'רך', 'קשה', 'חדש', 'ישן', 'טוב',
        'עגול', 'ארוך', 'קצר', 'רחב', 'צר', 'גבוה', 'נמוך',
        'בהיר', 'כהה', 'שקט', 'רועש', 'מתוק'
      ];
      
      for (const clue of generalClues) {
        const isOnBoard = allBoardWords.includes(clue.toLowerCase());
        const isSimilar = allBoardWords.some(word => 
          word.includes(clue.toLowerCase()) || clue.toLowerCase().includes(word)
        );
        
        if (!isOnBoard && !isSimilar) {
          specificClue = clue;
          break;
        }
      }
    }

    if (!specificClue) {
      specificClue = 'אחד';
    }
    
    bestClue = { 
      word: specificClue, 
      number: 1,
      myWords: [safeCard.word]
    };
  }

  return bestClue;
};
