export function Line({
    roleId,
    role,
    line
}: {
    roleId: number,
    role: string,
    line: Array<{
        s: string,
        action: boolean
    }>
}) {
    return (
        <div className='play-line flex flex-row w-full p-2'>
            <div className={'w-64'} role-id={roleId}>
                <span>{role}</span>
            </div>
            <div className={'flex flex-col basis-4/5'} role-id={roleId}>
                {line.filter(text => text.s).map( (text, index) => {
                    return <span key={index} className={'play-line-text ' + (text.action? 'italic ': ' ')}>{text.s}<br/></span>
                })}
            </div>
        </div>
    );
}
