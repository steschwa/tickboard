import { Haupthalle } from "./components/hallen/bloc-huette/Haupthalle"
import { Header } from "./components/header/Header"
import { Toolbar } from "./components/toolbar/Toolbar"

export function App() {
    return (
        <div className="h-dvh flex flex-col">
            <Header />
            <Toolbar />

            <div className="flex-1 p-2 flex justify-center items-center">
                <Haupthalle />
            </div>
        </div>
    )
}
