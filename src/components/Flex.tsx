interface Props {
    flexWrap?: 'wrap' | 'nowrap';
    alignItems?: 'center' | 'space-between' | 'space-around';
    justifyContent?: 'center' | 'space-between' | 'space-around';
    flexDirection?: 'column' | 'row';
    className?: string;
    children: any;
}
export const Flex: React.FC<Props> = ({ flexWrap, flexDirection, alignItems, justifyContent, className, children }) => {
    const styles = {
        flexWrap,
        flexDirection,
        alignItems,
        justifyContent
    }
    const fullClassName = 'flex' + (className ? ` ${className}` : '');

    return(
        <div className={fullClassName} style={styles}>
            {children}
        </div>
    )
}