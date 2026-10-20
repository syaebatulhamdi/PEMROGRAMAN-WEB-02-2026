function Other() {
  return (
    <section className="other">
      <h2>Other Component</h2>
      <p>This is the Other component.</p>
    </section>
  );
}

export default Other;
function Navbar() {

 const menu = ["Home", "Gallery", "Music", "Contact"];

  return (
    <nav className="navbar">
      <h2>MyPortfolio</h2>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </nav>
  );
}



function Footer() {
  return (
    <footer>
      <p>© 2026 MyPortfolio. All rights reserved.</p>
    </footer>
  );
}

export {Navbar, Footer};