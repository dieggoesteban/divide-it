
const Footer = () => {
  return (
    <footer className="p-4 border-t mt-auto bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Divide It
      </div>
    </footer>
  );
};

export default Footer;
