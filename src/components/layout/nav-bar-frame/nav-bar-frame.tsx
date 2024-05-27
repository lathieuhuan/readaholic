import styles from './nav-bar-frame.module.css';

interface NavBarFrameProps {
  children: React.ReactNode;
}
export const NavBarFrame = (props: NavBarFrameProps) => {
  return (
    <div className={`fixed top-0 w-full z-50 ${styles['nav-bar-frame']}`}>
      <div>{props.children}</div>
    </div>
  );
};
