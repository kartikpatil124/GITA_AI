// mockResponses.js - Structured Gita Verse Data Model

export const verses = [
  {
    id: "bg-2-47",
    chapter: 2,
    verse: 47,
    theme: "Purpose & Action",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmani",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
    explanation: "This verse teaches detached action (Karma Yoga). Anxiety arises when we obsess over results we cannot control. By focusing entirely on the effort and the process, you find peace and efficiency.",
    practicalStep: "Identify one task you are avoiding due to fear of failure, and do it today focusing only on the quality of your effort, not the outcome."
  },
  {
    id: "bg-6-5",
    chapter: 6,
    verse: 5,
    theme: "Self-Mastery",
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ",
    translation: "Elevate yourself through the power of your mind, and not degrade yourself, for the mind can be the friend and also the enemy of the self.",
    explanation: "Your internal dialogue shapes your reality. When the mind is trained through discipline and positive reinforcement, it becomes your greatest ally. When left uncontrolled, it becomes your worst enemy.",
    practicalStep: "When you notice a negative thought today, pause, acknowledge it, and deliberately replace it with a constructive, empowering thought."
  },
  {
    id: "bg-2-14",
    chapter: 2,
    verse: 14,
    theme: "Resilience",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    transliteration: "mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ\nāgamāpāyino ’nityās tāns titikṣhasva bhārata",
    translation: "O son of Kunti, the nonpermanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons. They arise from sense perception, O scion of Bharata, and one must learn to tolerate them without being disturbed.",
    explanation: "Life consists of dualities—joy and sorrow, success and failure. Just as seasons change, emotional states are temporary. Recognizing their fleeting nature helps us endure difficult times with grace.",
    practicalStep: "When you feel overwhelmed by a negative emotion, remind yourself 'This too shall pass' and simply observe the feeling without identifying with it."
  },
  {
    id: "bg-4-38",
    chapter: 4,
    verse: 38,
    theme: "Clarity & Wisdom",
    sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
    transliteration: "na hi jñānena sadṛiśhaṁ pavitram iha vidyate\ntat svayaṁ yoga-sansiddhaḥ kālenātmani vindati",
    translation: "In this world, there is nothing so sublime and pure as transcendental knowledge. Such knowledge is the mature fruit of all mysticism. And one who has become accomplished in the practice of yoga enjoys this knowledge within himself in due course of time.",
    explanation: "True clarity and peace come from inner wisdom, not external achievements. Cultivating self-awareness over time leads to an unshakeable inner purity and understanding of your true nature.",
    practicalStep: "Dedicate 10 minutes today to silent reflection or meditation. Seek to understand your own motivations and values without judgment."
  },
  {
    id: "bg-2-62",
    chapter: 2,
    verse: 62,
    theme: "Conflict & Desire",
    sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥",
    transliteration: "dhyāyato viṣhayān punsaḥ saṅgas teṣhūpajāyate\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho ’bhijāyate",
    translation: "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
    explanation: "This maps the anatomy of emotional turmoil. Overthinking about things we desire leads to attachment. When those desires are thwarted, anger naturally follows. The root of conflict is often unchecked desire.",
    practicalStep: "Identify a source of anger or frustration today. Trace it back to an underlying desire or expectation that was unmet, and practice letting go of that expectation."
  }
];

export function getResponse(query, intent = null) {
  const q = query.toLowerCase();
  
  // Basic semantic mapping for MVP
  let matchedVerse = verses[0]; // Default to Karma Yoga
  let responseText = "";

  if (q.includes("lost") || q.includes("purpose") || q.includes("career") || intent === "purpose") {
    matchedVerse = verses.find(v => v.id === "bg-2-47");
    responseText = "It is natural to feel lost when we focus too much on the destination and not the journey. The Gita advises us to shift our focus back to our immediate duties. By grounding yourself in your present actions without obsessing over the future, clarity will slowly return.";
  } 
  else if (q.includes("stress") || q.includes("calm") || q.includes("mind") || intent === "peace") {
    matchedVerse = verses.find(v => v.id === "bg-6-5");
    responseText = "Stress often comes from a mind that feels out of control. Your mind is a powerful tool; it can drag you down or lift you up. Take a step back and become an observer of your thoughts rather than a victim of them. You have the power to elevate yourself.";
  }
  else if (q.includes("sad") || q.includes("pain") || q.includes("hard") || intent === "stress") {
    matchedVerse = verses.find(v => v.id === "bg-2-14");
    responseText = "Pain and sorrow are inevitable parts of the human experience, but they are also temporary. Just as winter turns to spring, this difficult period will pass. Try to find a space of inner stillness where you can simply observe these passing seasons of life.";
  }
  else if (q.includes("confused") || q.includes("decision") || q.includes("clarity") || intent === "clarity") {
    matchedVerse = verses.find(v => v.id === "bg-4-38");
    responseText = "When faced with difficult decisions, external advice can only go so far. True clarity comes from cultivating inner wisdom. Take time to quiet the external noise so you can connect with your own deep, internal knowing.";
  }
  else if (q.includes("angry") || q.includes("fight") || q.includes("conflict") || intent === "conflict") {
    matchedVerse = verses.find(v => v.id === "bg-2-62");
    responseText = "Anger usually stems from an unfulfilled desire or blocked expectation. When we become deeply attached to how we want things to be, conflict is the result. To resolve this, examine what underlying expectation you are holding onto tightly.";
  }
  else {
    matchedVerse = verses[0];
    responseText = "The complexities of life can often overwhelm us. Whenever you are in doubt, the Gita advises focusing purely on the action in front of you, performed with integrity and without attachment to the outcome. This brings stability to an anxious heart.";
  }

  return {
    summary: responseText,
    verse: matchedVerse
  };
}
