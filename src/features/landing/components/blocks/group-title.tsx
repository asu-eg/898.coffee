interface GroupTitleProps {
  children: React.ReactNode;
}

export function GroupTitle({ children }: GroupTitleProps) {
  return (
    <h2 className="px-1 text-small font-bold text-charcoal">{children}</h2>
  );
}
