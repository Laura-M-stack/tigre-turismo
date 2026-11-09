import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";

import { buttonClasses, type ButtonStyleProps as StyleProps } from "./buttonStyles";

export default function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

/** Link interno con estilo de botón (evita anidar <button> dentro de <a>). */
export function ButtonLink({ variant, size, className, ...props }: LinkProps & StyleProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}

/** Enlace externo con estilo de botón; abre en pestaña nueva de forma segura. */
export function ButtonAnchor({
  variant,
  size,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {children}
      <span className="sr-only"> (se abre en otra pestaña)</span>
    </a>
  );
}
