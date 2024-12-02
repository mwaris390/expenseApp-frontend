export function Button({
  title,
  type,
  className,
  isDisable = false,
  onClick
}: {
  title: string;
  type: "submit" | "reset" | "button";
  className: "btn-primary" | "btn-secondary";
  isDisable?: boolean;
  onClick?:any
}) {
  return (
    <button type={type} className={className} onClick={onClick} disabled={isDisable}>
      {title}
    </button>
  );
}
