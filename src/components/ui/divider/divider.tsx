import clsx, { ClassValue } from 'clsx';

export interface DividerProps {
  className?: ClassValue;
  style?: React.CSSProperties;
}
export const Divider = (props: DividerProps) => {
  return <div className={clsx('h-px bg-[var(--color-divider)]', props.className)} style={props.style} />;
};
