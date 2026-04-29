import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateId } from '../utils/helpers';

export function useSavedAnswers() {
  const { state, saveAnswer, removeSavedAnswer, isSaved } = useAppContext();

  const save = useCallback((response, question) => {
    const savedItem = {
      id: response.id || generateId(),
      question: question,
      response: response,
      savedAt: new Date().toISOString(),
    };
    saveAnswer(savedItem);
  }, [saveAnswer]);

  const remove = useCallback((id) => {
    removeSavedAnswer(id);
  }, [removeSavedAnswer]);

  return {
    savedAnswers: state.savedAnswers,
    save,
    remove,
    isSaved,
  };
}

export default useSavedAnswers;
