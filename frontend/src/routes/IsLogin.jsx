import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const IsLogin = () => {

    const token = !!localStorage.getItem('token')
  return (
    <div>
        {
            token?<Navigate to={'/home'}/>: <Outlet/>
        }
    </div>
  )
}
