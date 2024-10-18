import {Line} from './line';

export function Play({
    play
}: {
    play: object
}) {
    const roles = {};
    if (play && play.roles) {
        play.roles.map((role) => {
            roles[role.id] = role.name;
        })
    }

    return  <div className={'flex flex-col justify-center w-9/10'}>
        <h1 className={'flex justify-center'}>{play.title}:</h1>
        <div className={'flex flex-col justify-center'}>
            {play.lines?.map( (line, index) =>
                <Line role={roles[line.roleId]} line={line.line} key={'line_' + index} />
            )}
        </div>
    </div>;
}