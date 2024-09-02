import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EventDetail from './pages/EventDetail.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/event/:eventId",
                element: <EventDetail />,
            }
        ],
        errorElement: <div className="">Opps</div>
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <RouterProvider router={router} />
  </StrictMode>,
)
