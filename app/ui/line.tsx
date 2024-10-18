export function Line({
    role,
    line
}: {
    role: string,
    line: Array<unknown>
}) {
    return (
        <div className='play-line flex flex-row w-full p-2'>
            <div className={'w-64'}>
                <span>{role}</span>
            </div>
            <div className={'flex flex-col basis-4/5'}>
                {line.filter(text => text.s).map( (text, index) => {
                    return <span key={index} className={'play-line-text ' + (text.action? 'italic ': ' ')}>{text.s}<br/></span>
                })}
            </div>
        </div>
    );
}
