import { useState, useCallback } from "react";

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setState(prev => !prev), []);

  return [state, toggle];
}

export default useToggle;