import React, { SVGProps } from 'react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface Props{
    Icon: HeroIcon
    title: string
}

function NavItem({Icon, title}:Props) {
    return (
        <div className="px-2 rounded-lg hover:bg-gray-500 hover:ease-in-out duration-200">
            <Icon className="h-6 w-6"/>
            <div className='text-[12px]'>{title}</div>
        </div>
    )
}

export default NavItem
