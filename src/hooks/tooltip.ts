import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

export const useTooltip = <T extends HTMLElement>(
  options: Partial<Tooltip.Options> | undefined
) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current === null) return;
    const tooltip = new Tooltip(elementRef.current as HTMLElement, options);

    return () => tooltip.dispose();
  }, [elementRef, options]);

  return elementRef;
};
