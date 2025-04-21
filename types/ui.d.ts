// Type declarations for UI components
declare module '@/components/ui/card' {
  import { ReactNode } from 'react';
  
  interface CardProps {
    className?: string;
    children?: ReactNode;
  }
  
  interface CardHeaderProps extends CardProps {}
  interface CardTitleProps extends CardProps {}
  interface CardDescriptionProps extends CardProps {}
  interface CardContentProps extends CardProps {}
  interface CardFooterProps extends CardProps {}
  
  export function Card(props: CardProps): JSX.Element;
  export function CardHeader(props: CardHeaderProps): JSX.Element;
  export function CardTitle(props: CardTitleProps): JSX.Element;
  export function CardDescription(props: CardDescriptionProps): JSX.Element;
  export function CardContent(props: CardContentProps): JSX.Element;
  export function CardFooter(props: CardFooterProps): JSX.Element;
}

declare module '@/components/ui/table' {
  import { ReactNode } from 'react';
  
  interface TableProps {
    className?: string;
    children?: ReactNode;
  }
  
  interface TableHeaderProps extends TableProps {}
  interface TableBodyProps extends TableProps {}
  interface TableRowProps extends TableProps {}
  interface TableHeadProps extends TableProps {}
  interface TableCellProps extends TableProps {}
  
  export function Table(props: TableProps): JSX.Element;
  export function TableHeader(props: TableHeaderProps): JSX.Element;
  export function TableBody(props: TableBodyProps): JSX.Element;
  export function TableRow(props: TableRowProps): JSX.Element;
  export function TableHead(props: TableHeadProps): JSX.Element;
  export function TableCell(props: TableCellProps): JSX.Element;
}

declare module '@/components/ui/badge' {
  import { ReactNode } from 'react';
  
  interface BadgeProps {
    className?: string;
    children?: ReactNode;
    variant?: 'default' | 'outline' | 'secondary';
  }
  
  export function Badge(props: BadgeProps): JSX.Element;
}

declare module '@/components/ui/button' {
  import { ReactNode, ButtonHTMLAttributes } from 'react';
  
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }
  
  export function Button(props: ButtonProps): JSX.Element;
}

declare module '@/components/ui/textarea' {
  import { TextareaHTMLAttributes } from 'react';
  
  interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
  }
  
  export function Textarea(props: TextareaProps): JSX.Element;
}

declare module '@/components/ui/select' {
  import { ReactNode } from 'react';
  
  interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    children?: ReactNode;
  }
  
  interface SelectTriggerProps {
    className?: string;
    children?: ReactNode;
  }
  
  interface SelectValueProps {
    placeholder?: string;
  }
  
  interface SelectContentProps {
    children?: ReactNode;
  }
  
  interface SelectItemProps {
    value: string;
    children?: ReactNode;
  }
  
  export function Select(props: SelectProps): JSX.Element;
  export function SelectTrigger(props: SelectTriggerProps): JSX.Element;
  export function SelectValue(props: SelectValueProps): JSX.Element;
  export function SelectContent(props: SelectContentProps): JSX.Element;
  export function SelectItem(props: SelectItemProps): JSX.Element;
}

declare module '@/components/ui/input' {
  import { InputHTMLAttributes } from 'react';
  
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }
  
  export function Input(props: InputProps): JSX.Element;
} 