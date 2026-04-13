import { selectIsLoggedIn } from "@/app/app-slice"
import { Main } from "@/app/Main"
import { FAQ, PageNotFound, ProtectedRoutes } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "/login",
  FAQ: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <Routes>
      <Route element={<ProtectedRoutes redirectPath={Path.Login} isAllowed={!isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.FAQ} element={<FAQ />} />
      </Route>

      <Route element={<ProtectedRoutes redirectPath={Path.Main} isAllowed={isLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
