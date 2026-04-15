import faviconUrl from '../../assets/icons/favicon.svg?url';

type LogoMarkProps = {
    size?: number;
    className?: string;
    title?: string;
};

const LogoMark = ({ size = 40, className, title = 'CodeWithBotina' }: LogoMarkProps) => {
    return (
        <div
            style={{ width: size, height: size }}
            className={className}
            role="img"
            aria-label={title}
        >
            <img src={faviconUrl} width={size} height={size} alt={title} />
        </div>
    );
};

export default LogoMark;