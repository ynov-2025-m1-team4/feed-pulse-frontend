import Link from 'next/link';
import styles from './index.module.scss';

const Index = ({ item }) => {
    return (
        <li className={styles.wrapper}>
            <Link href={item.path}>
                <img src={item.icon} alt={item.label} />
                <span>{item.label}</span>
            </Link>
        </li>
    )
}

export default Index;