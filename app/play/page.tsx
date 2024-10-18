'use client';
import {Play} from "../ui/play";
import {useSearchParams} from "next/navigation";
import {useEffect, useState, Suspense} from "react";

export default function Page() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    let play = searchParams.get('name')
    const regex = new RegExp('^[a-z]+$');
    if (typeof play !== "string" || !regex.test(play)) {
       play = "error";
    }
    useEffect(() => {
        fetch('/plays/' + play + '.json').then(r => r.json()).then(data => {
                setData(data)
                setLoading(false)
            }
        ).catch(() => {
            setData(null)
            setLoading(false)
        })
    }, ['play']);
    if (isLoading) return <div>Загрузка...</div>
    if (!data) return <div>Нет данных</div>

    return <Suspense fallback={<div>Загрузка...</div>}>
        <div>
        <a className={'font-medium text-blue-600 dark:text-blue-500'} href={'/'}>НАЗАД</a>
        <Play play={data}/>
        </div>
    </Suspense>;
}