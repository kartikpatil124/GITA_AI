const mockResponses = [
  {
    id: 1,
    keywords: ['lost', 'confused', 'direction', 'purpose', 'meaning', 'what should i do'],
    summary: "When you feel lost, remember that every soul has a unique purpose. The Bhagavad Gita teaches us that confusion is a doorway to clarity — it means you are ready to seek a deeper truth.",
    shloka: {
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      reference: "Bhagavad Gita 2.47",
      meaning: "You have the right to perform your duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, and never be attached to inaction."
    },
    guidance: [
      "Focus on what you can do right now, not what the outcome will be.",
      "Take one small step today — action dissolves confusion.",
      "Trust the process. Your dharma (purpose) reveals itself when you act with sincerity.",
      "Stop comparing your path to others. Your journey is uniquely yours."
    ],
    closing: "🙏 Remember, even Arjuna felt lost before Krishna illuminated his path. Your moment of clarity is coming. Keep walking with faith."
  },
  {
    id: 2,
    keywords: ['stress', 'anxious', 'anxiety', 'worried', 'tension', 'overwhelmed', 'pressure'],
    summary: "Stress arises when the mind races between the past and the future. Lord Krishna teaches us to anchor ourselves in the present moment, for that is where true peace resides.",
    shloka: {
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
      reference: "Bhagavad Gita 4.7",
      meaning: "Whenever there is a decline in righteousness and rise in unrighteousness, O Arjuna, I manifest Myself. Know that in your moments of greatest stress, divine grace is nearest."
    },
    guidance: [
      "Practice slow, deep breathing for 5 minutes — it calms the mind instantly.",
      "Write down what's worrying you. Seeing it on paper makes it manageable.",
      "Do your best and surrender the rest. You cannot control everything.",
      "Spend a few minutes in silence every day — even 5 minutes of stillness heals."
    ],
    closing: "🙏 The storm in your mind will pass. Be still, breathe, and trust that the universe has a plan for you. You are stronger than you feel right now."
  },
  {
    id: 3,
    keywords: ['calm', 'peace', 'peaceful', 'inner peace', 'tranquil', 'meditation', 'serene'],
    summary: "Inner peace is not the absence of challenges but the mastery of your response to them. The Gita reveals that a calm mind is the greatest treasure one can possess.",
    shloka: {
      sanskrit: "प्रशान्तमनसं ह्येनं योगिनं सुखमुत्तमम् ।\nउपैति शान्तरजसं ब्रह्मभूतमकल्मषम् ॥",
      reference: "Bhagavad Gita 6.27",
      meaning: "Supreme bliss comes to the yogi whose mind is peaceful, whose passions are calmed, who is free from sin, and who has become one with the Divine."
    },
    guidance: [
      "Start each morning with 10 minutes of silent meditation or prayer.",
      "Reduce time on social media — it agitates the mind without you realizing.",
      "Practice gratitude: list 3 things you are thankful for each night.",
      "Spend time in nature — it is the fastest healer of a restless mind."
    ],
    closing: "🙏 Peace is already within you, buried under layers of noise. Peel them away gently, one day at a time. You deserve stillness."
  },
  {
    id: 4,
    keywords: ['motivation', 'lazy', 'unmotivated', 'energy', 'procrastinate', 'effort', 'lack motivation'],
    summary: "Lack of motivation often comes from focusing too much on results. Krishna reminds us that action itself is the reward — when you do your duty with devotion, energy naturally follows.",
    shloka: {
      sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः ।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥",
      reference: "Bhagavad Gita 2.23",
      meaning: "The soul can never be cut by weapons, nor burned by fire, nor moistened by water, nor dried by the wind. You are indestructible — nothing can truly defeat you."
    },
    guidance: [
      "Start incredibly small — even 5 minutes of effort breaks the cycle of inaction.",
      "Remember your 'why'. Reconnect with what made you passionate in the first place.",
      "Discipline beats motivation. Create a daily routine and stick to it for 21 days.",
      "Surround yourself with people who inspire and uplift you."
    ],
    closing: "🙏 You are a divine spark with infinite potential. The fire within you is not gone — it just needs a gentle breeze. Start today, even if it's just one step."
  },
  {
    id: 5,
    keywords: ['fear', 'scared', 'afraid', 'future', 'uncertain', 'unknown', 'worry about future'],
    summary: "Fear is the mind's projection of an imagined future. The Gita teaches us that the soul is eternal — there is nothing truly to fear when you rest in the awareness of your divine nature.",
    shloka: {
      sanskrit: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः ।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥",
      reference: "Bhagavad Gita 16.1",
      meaning: "Fearlessness, purity of heart, steadfastness in knowledge and yoga, charity, self-restraint, sacrifice, study of scriptures, austerity, and honesty — these are the divine qualities."
    },
    guidance: [
      "Ask yourself: 'Is this fear real, or is it a story my mind is telling me?'",
      "Take things one day at a time. The future is built by today's actions.",
      "Build faith through small acts of courage every day.",
      "Read or listen to wisdom teachings — they replace fear with understanding."
    ],
    closing: "🙏 Fear cannot survive in the light of awareness. Face it gently, breathe through it, and watch it dissolve. You are held by a power far greater than your fears."
  },
  {
    id: 6,
    keywords: ['failure', 'failed', 'defeat', 'unsuccessful', 'mistake', 'losing', 'setback'],
    summary: "Failure is not the opposite of success — it is a stepping stone toward it. Lord Krishna teaches that the wise person does not grieve over what is lost but focuses on what can be done next.",
    shloka: {
      sanskrit: "नासतो विद्यते भावो नाभावो विद्यते सतः ।\nउभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः ॥",
      reference: "Bhagavad Gita 2.16",
      meaning: "The unreal has no existence, and the real never ceases to be. The seers of truth have concluded this by studying the nature of both."
    },
    guidance: [
      "Reframe failure as feedback — every fall teaches you something valuable.",
      "List what you learned from this experience. Growth hides in every setback.",
      "Don't identify with failure. You failed at something; you are NOT a failure.",
      "Every great person in history failed many times. It's part of the journey."
    ],
    closing: "🙏 A setback is just a setup for a comeback. The river doesn't stop flowing because of a rock — it flows around it. Keep going. Your story isn't over."
  },
  {
    id: 7,
    keywords: ['angry', 'anger', 'frustrated', 'furious', 'rage', 'irritated', 'temper'],
    summary: "Anger is a fire that first burns the one who carries it. The Gita warns us that uncontrolled anger leads to delusion and the destruction of wisdom. Mastering anger is mastering yourself.",
    shloka: {
      sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
      reference: "Bhagavad Gita 2.63",
      meaning: "From anger comes delusion; from delusion, loss of memory; from loss of memory, destruction of intelligence; and from destruction of intelligence, one is ruined."
    },
    guidance: [
      "When anger rises, pause. Take 10 deep breaths before responding.",
      "Ask: 'Will this matter in 5 years?' Most anger is about temporary situations.",
      "Channel anger into constructive action — exercise, writing, or creating something.",
      "Practice forgiveness — not for others, but to free yourself from the poison of resentment."
    ],
    closing: "🙏 Anger is a temporary visitor, not your permanent identity. Let it come, observe it, and let it go. Your peace is worth more than any reaction."
  },
  {
    id: 8,
    keywords: ['lonely', 'alone', 'sad', 'depressed', 'unhappy', 'isolated', 'sadness'],
    summary: "Loneliness is the soul's way of calling you inward. The Gita teaches that you are never truly alone — the Divine resides within every heart, always present, always listening.",
    shloka: {
      sanskrit: "ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति ।\nभ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया ॥",
      reference: "Bhagavad Gita 18.61",
      meaning: "The Supreme Lord dwells in the hearts of all living beings, O Arjuna, directing the movements of all through His divine energy."
    },
    guidance: [
      "Reach out to someone you trust — sharing your feelings lightens the burden.",
      "Engage in acts of kindness — helping others heals your own loneliness.",
      "Develop a personal practice: meditation, journaling, or prayer can be your anchor.",
      "Remember: being alone is not the same as being lonely. Solitude can become your strength."
    ],
    closing: "🙏 You are deeply loved by the universe, even when you can't feel it. This sadness will pass. Hold on, reach out, and let light find you. You matter more than you know."
  },
  {
    id: 9,
    keywords: ['relationship', 'love', 'heartbreak', 'breakup', 'partner', 'marriage'],
    summary: "Relationships teach us the deepest lessons about love, attachment, and letting go. The Gita shows us that true love is selfless — it gives without expecting, and it lets go without clinging.",
    shloka: {
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
      reference: "Bhagavad Gita 18.66",
      meaning: "Abandon all varieties of duties and simply surrender unto Me. I shall free you from all sinful reactions. Do not grieve."
    },
    guidance: [
      "Love yourself first. You cannot pour from an empty cup.",
      "Accept that people change and grow — sometimes in different directions.",
      "Forgive, not because they deserve it, but because you deserve peace.",
      "Trust that what is meant for you will never miss you."
    ],
    closing: "🙏 Your heart is resilient. It has loved before and it will love again. Let time heal, let wisdom guide, and let faith carry you forward."
  },
  {
    id: 10,
    keywords: ['career', 'job', 'work', 'professional', 'business', 'money', 'success'],
    summary: "Work becomes worship when done with dedication and without attachment to results. The Gita's greatest lesson on career is: perform your duty excellently, and let the universe handle the rest.",
    shloka: {
      sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय ।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥",
      reference: "Bhagavad Gita 2.48",
      meaning: "Perform your duty established in yoga, O Arjuna, abandoning attachment and being equal in success and failure. Such equanimity of mind is called yoga."
    },
    guidance: [
      "Focus on mastering your craft — excellence attracts opportunity.",
      "Don't chase money, chase meaning. Wealth follows those who add value.",
      "Network genuinely. Help others succeed and doors will open for you.",
      "Invest in learning. Skills compound over time just like interest."
    ],
    closing: "🙏 Your work is your offering to the world. Do it with love, with skill, and without anxiety about the outcome. Success is a byproduct of sincerity."
  }
];

/**
 * Finds the best matching response based on user input keywords.
 * Returns a default response if no match is found.
 */
export function getResponse(userInput) {
  const input = userInput.toLowerCase();
  
  let bestMatch = null;
  let bestScore = 0;

  for (const response of mockResponses) {
    let score = 0;
    for (const keyword of response.keywords) {
      if (input.includes(keyword)) {
        score += keyword.length; // longer matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = response;
    }
  }

  if (bestMatch) {
    return { ...bestMatch };
  }

  // Default response for unmatched queries
  return {
    id: 0,
    summary: "Every question you ask is a step toward wisdom. The Bhagavad Gita holds timeless answers for all of life's challenges. Let me share some guidance that may illuminate your path.",
    shloka: {
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
      reference: "Bhagavad Gita 6.5",
      meaning: "Elevate yourself through the power of your own mind, and do not degrade yourself. The mind can be the friend of the soul, or its enemy."
    },
    guidance: [
      "Take a moment to reflect on what truly matters to you.",
      "Practice being present — most suffering exists only in our thoughts.",
      "Trust your inner voice. Your soul knows the way, even when your mind is confused.",
      "Be patient with yourself. Growth takes time, like a seed becoming a tree."
    ],
    closing: "🙏 Whatever you are going through, know that it is temporary. You have the strength within you to overcome it. The Gita says: 'You are the Self, beyond destruction.' Hold on to that truth."
  };
}

export default mockResponses;
