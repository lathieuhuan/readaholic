'use client';
import * as React from 'react';
import { ClassValue } from 'clsx';

import { cn } from '@/lib/utils';
import styles from './input.module.css';

type InputSize = 'small' | 'medium';

const sizeMap: Record<InputSize, string> = {
  small: 'h-8 text-sm',
  medium: 'h-9 text-base',
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  wrapperCls?: string;
  className?: ClassValue;
  /** Default to 'medium' */
  size?: InputSize;
  suffix?: React.ReactNode;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ wrapperCls, suffix, className, size = 'medium', ...inputProps }, ref) => {
    const onclickWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
      if ('tagName' in e.target && e.target.tagName !== 'INPUT') {
        e.currentTarget.querySelector('input')?.focus();
      }
    };

    return (
      <div
        className={cn(
          'rounded border border-border/80 focus-within:border-border flex items-center relative',
          sizeMap[size],
          styles.input,
          wrapperCls,
        )}
        onClick={onclickWrapper}
      >
        <input
          ref={ref}
          {...inputProps}
          className={cn('px-2 py-1 w-full h-full bg-transparent outline-none', className)}
        />
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>
    );
  },
);
