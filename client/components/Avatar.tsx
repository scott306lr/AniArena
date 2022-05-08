import React, { SVGProps } from 'react'

interface Props{
    Icon: (props: SVGProps<SVGAElement>) => JSX.Element
    title: string
}

function Avatar({Icon, title}:Props) {
  return (
        <div className="p-2 rounded-full hover:bg-gray-500">
            <Icon className="h-12 w-12"/>
        </div>
    )
}

export default Avatar
