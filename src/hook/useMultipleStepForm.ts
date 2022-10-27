import { ReactElement, useState } from "react";

export function useMultipleStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function prev() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }
  function goTo(index: number) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    setCurrentStepIndex,
    step: steps[currentStepIndex],
    prev,
    next,
    isFirstStep: currentStepIndex === 0,
    goTo,
    steps,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
