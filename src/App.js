import React, { useEffect } from "react"
import { APP, CALENDAR, CENTER, CHALLENGE, DASHBOARD, EACHCHALLENGE, EACHPROFILE, HEALTHCARE, LOGIN, MEDITATION, PLANNER, PROFILE, REGISTER, ROOT, SETTING, router } from "./routes/routes.js"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, RouterProvider, Routes,Outlet, useParams } from "react-router-dom"
import Sidebar from "./components/Sidebar.js"
import Dashboard from "./pages/Dashboard.js"
import HealthCare from "./pages/HealthCare.js"
import Meditation from "./pages/Meditation.js"
import HealthCareChallenge from "./pages/HealthCareChallenge.js"
import Setting from "./pages/Setting.js"
import FullPageCalendar from "./pages/Calendar.js"
import IndexPage from "./pages/IndexPage.js"
import TopBar from "./components/TopBar.js"
import LoadingApp from "./components/webpage/LoadingApp.js"
import Profile from "./pages/Profile.js"
import Planner from "./pages/Planner.js"
import Login from "./components/auth/Login.js"
import Register from "./components/auth/Register.js"
import "./components/sidebar.css"
import './config/firebase-config.js';

export default function App() 
{
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Sidebar />
        <TopBar />
        <Routes>
          
            <Route path={ROOT} element={<IndexPage/>}/>
            <Route path={LOGIN} element={<Login/>}/>
            <Route path={REGISTER} element={<Register/>}/>
            <Route path={APP} element={<Outlet/>}>
              <Route path={DASHBOARD} element={<Dashboard/>}/>
              <Route path={HEALTHCARE} element={<HealthCare/>}/>
              <Route path={MEDITATION} element={<Meditation/>}/>
              <Route path={CHALLENGE} element={<Outlet/>}>
                  <Route path={EACHCHALLENGE} element={<HealthCareChallenge/>}></Route>
                </Route>
              <Route path={PLANNER} element={<Planner/>}/>
              <Route path={SETTING} element={<Setting/>}/>
              <Route path={PROFILE} element={<Outlet/>}>
                <Route path={EACHPROFILE} element={<Profile/>}/>
              </Route>
              <Route path={CALENDAR} element={<FullPageCalendar/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}