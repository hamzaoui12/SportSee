import styles from "@/styles/components/NavBar.module.scss";

const NavBar = () => {
  return (
    <>
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="SportSee logo" />
          <h1>SportSee</h1>
        </div>
        <nav className={styles.links}>
          <ul>
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <a href="#">Profil</a>
            </li>
            <li>
              <a href="#">Réglage</a>
            </li>
            <li>
              <a href="#">Communauté</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.sideNav}>
        <div>
          <img src="/images/rest.png" alt="Rest" />
          <img src="/images/swim.png" alt="Swim" />
          <img src="/images/bike.png" alt="Bike" />
          <img src="/images/workout.png" alt="Workout" />
        </div>
        <span>Copyright, SportSee 2020</span>
      </div>
    </>
  );
};

export default NavBar;
