import React, { SVGProps } from 'react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

interface Props{
    Icon: HeroIcon
    title: string
}

function NavItem({Icon, title}:Props) {
    return (
        <div className="p-2 rounded-lg hover:bg-gray-500 hover:ease-in-out duration-200">
            <Icon className="h-12 w-12"/>
        </div>
    )
}

export default NavItem
