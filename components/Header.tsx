interface HeaderProps {
  headline: string;
  subheadline?: string;
}

const Header = ({ headline, subheadline }: HeaderProps) => (
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
      {headline}
    </h2>
    {subheadline && <p className="mt-2 text-center text-sm">{subheadline}</p>}
  </div>
);

export default Header;
