import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Show } from "./components/Show"
import { Create } from "./components/Create"
import { Edit } from "./components/Edit"
import { Nav } from "./components/Nav"

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
            <Nav/>
                <Routes>
                    <Route path="/" element={<Show />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}