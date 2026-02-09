export  const getRecommendationByScore = (percentage) => {
    if (percentage <= 10) return "You’re at the starting line. Begin with basics in training mode and focus on concept clarity.";
    if (percentage <= 25) return "A long way to go. Focus on understanding concepts one by one. Consistent practice is key.";
    if (percentage <= 40) return "You’ve started making progress. Concentrate on weak topics and revise daily to improve further.";
    if (percentage <= 59) return "Not quite there yet. You’re building your base — now increase your speed and accuracy with more focused practice.";
    if (percentage <= 69) return "So close! You could’ve passed with just a few more correct answers. Revise your mistakes and attempt more tests to cross the line next time.";
    if (percentage <= 75) return "You’ve passed, but just barely. This is not the time to relax — reinforce your weak areas and practice more for consistency.";
    if (percentage <= 85) return "Solid score! Keep it up. Maintain this momentum and try solving mixed tests to boost overall preparation.";
    return "Excellent performance! You're exam-ready. Just maintain your speed and accuracy through regular revision and mock tests.";
};
