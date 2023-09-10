import Link from "next/link";
import cx from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={cx.header}>
      <h1 className={cx.title}>Sistema Interno</h1>

      <nav className={cx.navbar}>
        <ul className={cx.navbarList}>
          <li className={cx.navbarListItem}>
            <Link href="/">Salas</Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link href="/students">Alunos</Link>
          </li>
          <li className={cx.navbarListItem}>
            <Link href="/inventory">Inventário</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
