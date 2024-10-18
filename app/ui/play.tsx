"use client";
import {Line} from './line';
import {LineInterface} from "../interfaces/LineInterface";
import {RoleInterface} from "../interfaces/RoleInterface";

function highlightRole(roleId:number):void {
    const lines = document.querySelectorAll('[role-id]');
    lines.forEach((elem) => {
        if (elem.getAttribute('role-id') === roleId.toString()) {
            elem.classList.toggle('highlight-role');
        }
    })
}

function resetHighlightRole() {
    const lines = document.querySelectorAll('[role-id]');
    lines.forEach((elem) => {
        if (elem.getAttribute('role-id')) {
            elem.classList.remove('highlight-role');
        }
    })
}

export function Play({
    play
}: {
    play:{title: string, roles:Array<RoleInterface>, lines:Array<LineInterface>}
}) {
    const roles:{[k: string]: string} = {};
    if (play && play.roles) {
        play.roles.map((role) => {
            roles[role.id] = role.name;
        })
    }

    return  <div className={'flex flex-col justify-center w-9/10'}>
        <h1 className={'flex justify-center p-1 mb-3 mt-3'}>{play.title}:</h1>
        <div className={'inline-block roles'}>
            {play.roles.filter(role => role.name).map((role) => {
                return <div role-id={role.id} className={"role inline-block cursor-pointer hover:opacity-75"} key={role.id}>
                    <div onClick={() => highlightRole(role.id)}>
                        [{role.name}]
                    </div>
                </div>
            })}
            <div className={"role inline-block cursor-pointer hover:opacity-75"}
                onClick={() => resetHighlightRole()}>[X]</div>
        </div>
        <div className={'flex flex-col justify-center'}>
            {play.lines?.map( (line, index) =>
                <Line roleId={line.roleId} role={roles[line.roleId]} line={line.line} key={'line_' + index} />
            )}
        </div>
    </div>;
}