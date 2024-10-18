'use client';
import {Play} from "../ui/play";
import {useSearchParams} from "next/navigation";
import {useEffect, useState, Suspense} from "react";

function GetData() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [isHydrated, setIsHydrated] = useState(false);
    const searchParams = useSearchParams();
    let play = searchParams.get('name')
    const regex = new RegExp('^[a-z]+$');
    if (typeof play !== "string" || !regex.test(play)) {
        play = "error"; //TODO
    }
    useEffect(() => {
        setIsHydrated(true);
        if (isHydrated) { //loading once
            fetch('/plays/' + play + '.json').then(r => r.json()).then(data => {
                    setData(data)
                    setLoading(false)
                }
            ).catch(() => {
                setData(null)
                setLoading(false)
            })
        }
    }, [play, isHydrated]);
    if (isLoading) return <div>Загрузка...</div>
    if (!data) return <div>Нет данных</div>
    return <div>
             <a className={'font-medium text-blue-600 dark:text-blue-500'} href={'/'}>НАЗАД</a>
            <Play play={data}/>
        </div>
}

export default function Page() {


    return <Suspense fallback={<div>Загрузка...</div>}>
        <GetData></GetData>
    </Suspense>;
}