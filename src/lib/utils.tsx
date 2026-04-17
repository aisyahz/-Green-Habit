import React from 'react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function IconRenderer({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Icon = (Icons as any)[name] as LucideIcon;
  if (!Icon) return <Icons.HelpCircle className={className} style={style} />;
  return <Icon className={className} style={style} />;
}
