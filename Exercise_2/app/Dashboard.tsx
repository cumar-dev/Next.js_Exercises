import React from 'react'
import Products from "./Products/page"
import { Suspense } from 'react';
const Dashboard = () => {
  return (
    <div>
        <Suspense fallback={<p>Loading....</p>}>
            <Products />
        </Suspense>
    </div>
  )
}

export default Dashboard;