import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

export const useTooltip = <T extends HTMLElement>(
  options: Partial<Tooltip.Options> | undefined
) => {
  const ref = useRef<T>(null);
  const tooltip = useRef<Tooltip | null>(null);

  useEffect(() => {
    if (ref.current === null || tooltip.current !== null) return;
    tooltip.current = new Tooltip(ref.current as Element, options);
  }, [ref, tooltip, options]);

  return ref;
};
