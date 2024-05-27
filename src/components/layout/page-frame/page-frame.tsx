import clsx from 'clsx';
import styles from './page-frame.module.css';

interface PageFrameProps {
  children: React.ReactNode;
}
export const PageFrame = (props: PageFrameProps) => {
  return <div className={clsx('mt-3 mx-auto relative', styles['page-frame'])}>{props.children}</div>;
};
