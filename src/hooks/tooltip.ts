import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

export const useTooltip = <T extends HTMLElement>(
  options: Partial<Tooltip.Options> | undefined
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current === null) return;
    const tooltip = new Tooltip(ref.current as Element, options);
    return () => tooltip.dispose();
  }, [ref, options]);

  return ref;
};
