import styles from '../../styles/modules/spinner.module.css';

type SpinnerProps = {
    size?: number;
    color?: string;
    strokeWidth?: number;
    speed?: number;
};

export function Spinner({ size = 24, color = 'currentColor', strokeWidth = 3, speed = 1 }: SpinnerProps) {
    return (
        <svg
            className={styles.spinner}
            width={size}
            height={size}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            style={
                {
                    '--spinner-speed': `${speed}s`,
                } as React.CSSProperties
            }
        >
            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
    );
}
