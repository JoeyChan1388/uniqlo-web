import "./header.css";

// ------------------------------------------------------------------

interface HeaderProps {
  slots?: {
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    centerSlot?: React.ReactNode;
  };
}

// ------------------------------------------------------------------

export default function Header({ slots }: HeaderProps) {
  return (
    <header>
      <div className="navContainer">
        <div>{slots?.leftSlot}</div>
        <div>{slots?.centerSlot}</div>
        <div>{slots?.rightSlot}</div>
      </div>
    </header>
  );
}
